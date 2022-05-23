/*
 * @Author: zhangyang
 * @Date: 2022-05-20 10:42:47
 * @LastEditTime: 2022-05-23 10:48:17
 * @Description: 
 */
import { createItem, getPosition } from './core';
import type { GuidItem, GuidOptions } from './type';
import { defautOptions } from './type';

type CurrStep = {
  visible: boolean;
  index: number;
  step: GuidItem;
}

export default class YoungBeginnerGuid extends HTMLElement {
  public root: ShadowRoot;
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

  changeDialog(item: CurrStep, dialog: HTMLElement) {
    const {
      x,
      y,
      positionX,
      positionY
    } = getPosition(item.step.el);
    dialog.style[positionX] = x + 'px';
    dialog.style[positionY] = y + 'px';
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

  render(item: CurrStep) {
    // hack vitest
    if (globalThis?.process?.env?.TEST) {
      return;
    }
    this.changeVisiable(item);

    const dialog = this.root.querySelector('#dialog') as HTMLElement;
    this.changeDialog(item, dialog);
    this.changeButton(item, dialog);
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
  }

  destory() {
    this.index = 0;
    document.body.removeChild(this.el);
  }
}