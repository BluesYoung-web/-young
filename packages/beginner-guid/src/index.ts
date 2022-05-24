/*
 * @Author: zhangyang
 * @Date: 2022-05-20 10:42:47
 * @LastEditTime: 2022-05-24 14:28:36
 * @Description: 
 */
import { createItem, getPosition, generateClipPathStr } from './core';
import type { GuidItem, GuidOptions, Selector } from './type';
import { defautOptions } from './type';

type CurrStep = {
  visible: boolean;
  index: number;
  step: GuidItem;
}

export class YoungBeginnerGuid extends HTMLElement {
  public root: ShadowRoot;
  public zIndex = '3000';
  public snap: {
    el: Selector;
    style: {
      border: string;
      zIndex: string;
    };
  };
  constructor(public handler: YoungBeginnerGuidController) {
    super();
    const mask = createItem(handler);
    const shadowRoot = this.attachShadow({ mode: 'closed' });
    shadowRoot.appendChild(mask);

    this.root = shadowRoot;
  }

  changeVisiable(item: CurrStep) {
    if (item.visible) {
      this.style.display = 'block';
    } else {
      this.style.display = 'none';
    }
  }

  changeDialog(item: CurrStep, dialog: HTMLElement, mask: HTMLElement) {
    const {
      x,
      y,
      positionX,
      positionY,
      srcX,
      srcY,
      width,
      height
    } = getPosition(item.step.el);
    // 清除之前残留的样式
    dialog.style.top = null;
    dialog.style.bottom = null;
    dialog.style.left = null;
    dialog.style.right = null;

    dialog.style[positionX] = x + 'px';
    dialog.style[positionY] = y + 'px';

    const pathStr = generateClipPathStr(srcX, srcY, width, height);
    mask.style.clipPath = `path('${pathStr}')`;
  }

  changeContent(item: CurrStep, dialog: HTMLElement) {
    const title = dialog.querySelector('.title');
    const content = dialog.querySelector('.content');

    title.innerHTML = item.step.title;
    content.innerHTML = item.step.content;
  }

  changeButton(item: CurrStep, dialog: HTMLElement) {
    const prev = dialog.querySelector('#prev');
    const next = dialog.querySelector('#next');
    if (item.index === 0) {
      prev.setAttribute('disabled', 'disabled');
    } else {
      prev.removeAttribute('disabled');
    }

    if (item.index === this.handler.guids.length - 1) {
      next.innerHTML = '关闭';
    } else {
      next.innerHTML = '下一步';
    }
  }

  saveSnapAndChange(item: CurrStep) {
    const el = document.querySelector(item.step.el) as HTMLElement;
    if (el) {
      this.snap = {
        el: item.step.el,
        style: {
          border: el.style.border,
          zIndex: el.style.zIndex
        }
      };
      el.style.zIndex = `${+this.zIndex + 2}`;
      el.style.border = '2px solid red';
    }
  }
  restoreSnap() {
    const el = document.querySelector(this.snap?.el) as HTMLElement;
    if (el) {
      el.style.border = this.snap.style.border;
      el.style.zIndex = this.snap.style.zIndex;
    }
  }

  render(item: CurrStep) {
    // 对 mask 使用 clip-path: polygon 效果更好，但是需要进行复杂的计算
    // 修改样式并保存现场，此处简化为给目标元素加边框
    this.saveSnapAndChange(item);

    this.changeVisiable(item);

    const dialog = this.root.querySelector('#dialog') as HTMLElement;
    const mask = this.root.querySelector('#mask') as HTMLElement;
    if (dialog && mask) {
      this.changeDialog(item, dialog, mask);
      this.changeContent(item, dialog);
      this.changeButton(item, dialog);
    }
  }
};
window.customElements.get('young-beginner-guid') ||
window.customElements.define('young-beginner-guid', YoungBeginnerGuid);

export class YoungBeginnerGuidController {
  public index = 0;
  public immdiate = false;
  public force = false;

  public guids: GuidItem[];
  public el: YoungBeginnerGuid;

  constructor(guids: GuidItem[], options: GuidOptions = {}) {
    if (!guids.length) {
      throw new Error('guids array can\'t be null');
    }
    this.guids = guids;
    options = Object.assign(defautOptions, options);
    this.immdiate = options.immdiate;
    this.force = options.force;

    this.el = new YoungBeginnerGuid(this);

    window.addEventListener('load', () => {
      this.immdiate && this.show();
    });
  }

  show(index = 0, visible = true) {
    if (!this.el.isConnected) {
      document.body.appendChild(this.el);
    }

    this.index = index;

    // hack vitest
    if (globalThis?.process?.env?.TEST) {
      return;
    }
    // 恢复现场
    this.el.restoreSnap();
    // 开始渲染
    this.el.render({
      visible,
      index,
      step: this.guids[index]
    });
  }

  next() {
    if (this.index < this.guids.length - 1) {
      this.index++;
      this.show(this.index);
    }
  }

  prev() {
    if (this.index > 0) {
      this.index--;
      this.show(this.index);
    }
  }

  hide() {
    this.show(this.index, false);
    // 恢复现场
    this.el.restoreSnap();
  }

  destory() {
    this.index = 0;
    document.body.removeChild(this.el);
    // 恢复现场
    this.el.restoreSnap();
  }
}