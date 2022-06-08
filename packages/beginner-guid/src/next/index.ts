/*
 * @Author: zhangyang
 * @Date: 2022-06-08 15:18:14
 * @LastEditTime: 2022-06-08 18:46:16
 * @Description: 
 */
// @ts-ignore
import { LitElement, html, css, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import cssContent from '../styles/index.css?raw';
import { defautOptions, GuidItem, GuidOptions, Selector } from '../type';
import { generateClipPathStr, getPosition } from '../core';

type CurrStep = {
  index: number;
  step: GuidItem;
}

@customElement('young-beginner-guid-next')
export class YoungBeginnerGuidNext extends LitElement {
  @property()
  public curr: CurrStep;
  @property()
  public visible = false;
  @property()
  public handler: YoungBeginnerGuidControllerNext;
  @property()
  public zIndex: string;

  // 使用纯CSS为组件定义scoped样式
  static styles = css`
    ${unsafeCSS(cssContent)}
  `;

  constructor(
    handler: YoungBeginnerGuidControllerNext,
    zIndex = '3000'
  ) {
    super();
    this.handler = handler;
    this.zIndex = zIndex;
    this.curr = {
      index: 0,
      step: this.handler.guids[0]
    };
  }

  closeHandler() {
    this.handler.hide();
  }

  prevHandler() {
    this.handler.prev();
  }
  
  nextHandler() {
    if (this.handler.index === this.handler.guids.length - 1) {
      this.handler.hide();
    } else {
      this.handler.next();
    }
  }

  render() {
    // hack vitest
    if (globalThis?.process?.env?.TEST) {
      return;
    }

    const {
      x,
      y,
      positionX,
      positionY,
      srcX,
      srcY,
      width,
      height
    } = getPosition(this.curr.step.el);
    const pathStr = generateClipPathStr(srcX, srcY, width, height);

    return html`
    <style>
    :host {
      display: ${this.visible ? 'block' : 'none'};
    }
    #mask {
      z-index: ${this.zIndex};
      clip-path: path('${pathStr}');
    }
    #dialog {
      z-index: ${+this.zIndex + 1};
      ${positionX}: ${x}px !important;
      ${positionY}: ${y}px !important;
    }
    #prev {
      ${
        this.curr.index === 0 ? 
        `
          opacity: 0.5;
          cursor: not-allowed !important;
        ` : '' 
      }
    }
    </style>
    <div id="mask"></div>
    <div id="dialog">
      ${
        !this.handler.force
          ? html`<div id="dialog-close" title="关闭新手引导" @click="${this.closeHandler}">
                  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--ion" width="24" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 512 512"><path d="M331.3 308.7L278.6 256l52.7-52.7c6.2-6.2 6.2-16.4 0-22.6-6.2-6.2-16.4-6.2-22.6 0L256 233.4l-52.7-52.7c-6.2-6.2-15.6-7.1-22.6 0-7.1 7.1-6 16.6 0 22.6l52.7 52.7-52.7 52.7c-6.7 6.7-6.4 16.3 0 22.6 6.4 6.4 16.4 6.2 22.6 0l52.7-52.7 52.7 52.7c6.2 6.2 16.4 6.2 22.6 0 6.3-6.2 6.3-16.4 0-22.6z" fill="#434343"></path><path d="M256 76c48.1 0 93.3 18.7 127.3 52.7S436 207.9 436 256s-18.7 93.3-52.7 127.3S304.1 436 256 436c-48.1 0-93.3-18.7-127.3-52.7S76 304.1 76 256s18.7-93.3 52.7-127.3S207.9 76 256 76m0-28C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48z" fill="currentColor"></path></svg>
                </div>`
          : ''
      }
      <h3 class="title" style="${this.curr.step.style_title ?? ''}">${this.curr.step.title}</h3>
      <div class="content" style="${this.curr.step.style_content ?? ''}">${this.curr.step.content}</div>
      <div class="btns">
        <button
          id="prev"
          type="button"
          @click="${this.prevHandler}"
        >上一步</button>
        <button
          id="next"
          type="button"
          @click="${this.nextHandler}"
        >${this.curr.index === this.handler.guids.length - 1 ? '关闭' : '下一步'}</button>
      </div>
    </div>
    `;
  }
};


export class YoungBeginnerGuidControllerNext {
  public index = 0;
  public immdiate = false;
  public force = false;

  public guids: GuidItem[];
  public el: YoungBeginnerGuidNext;

  constructor(guids: GuidItem[], options: GuidOptions = {}) {
    if (!guids.length) {
      throw new Error('guids array can\'t be null');
    }
    this.guids = guids;
    options = Object.assign(defautOptions, options);
    this.immdiate = options.immdiate;
    this.force = options.force;

    this.el = new YoungBeginnerGuidNext(this);

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
    // 开始渲染
    this.el.curr = {
      index,
      step: this.guids[index]
    };
    this.el.visible = visible;
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