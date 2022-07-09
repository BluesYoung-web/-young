/*
 * @Author: ouyangyuying
 * @Date: 2022-06-22 10:34:06
 * @LastEditTime: 2022-07-09 14:35:24
 * @Description: 
 */
/// <reference types="vite/client" />
import { LitElement, html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { when } from 'lit/directives/when.js';
import after from './img/after.png';
import after_disabled from './img/after-disabled.png';

@customElement('young-preview-gallary')
export class YoungPreviewGallary extends LitElement {
  @property()
  public direction: 'x' | 'y' = 'x';

  @property({ type: Boolean })
  public 'show-icon' = true;

  @property()
  public 'after-icon' = after;

  @property()
  public 'after-icon-disabled' = after_disabled;

  @query('#base')
  public baseEl: HTMLDivElement;

  @property({ type: Number })
  public gap = 20;

  @property({ type: Number })
  public 'item-width' = this['item-width'];

  @property({ type: Number })
  public 'display-num' = 3;
  
  @property({ type: Number })
  public width = 0;

  @property({ type: Number })
  public num = 0;

  @property()
  public index = this['display-num'];

  @property()
  public disablePrev = true;

  @property()
  public disableNext = true;

  firstUpdated() {
    if (this.num > this['display-num']) {
      this.disableNext = false;
    }
    const iw = this['item-width'];
    const d = this['display-num'];
    this.width = iw * d + this.gap * (d - 1);
  }

  public prev() {
    if (this.direction === 'x') {
      this.baseEl.scrollBy({
        left: -this['item-width'],
        behavior: 'smooth'
      });
    } else {
      this.baseEl.scrollBy({
        top: -this['item-width'],
        behavior: 'smooth'
      });
    }
    this.index--;
    if (this.index === this['display-num']) {
      this.disablePrev = true;
    }
    if (this.index < this.num) {
      this.disableNext = false;
    }
  }

  public next() {
    if (this.direction === 'x') {
      this.baseEl.scrollBy({
        left: this['item-width'],
        behavior: 'smooth'
      });
    } else {
      this.baseEl.scrollBy({
        top: this['item-width'],
        behavior: 'smooth'
      });
    }
    this.index++;
    if (this.index > this['display-num']) {
      this.disablePrev = false;
    }
    if (this.index === this.num) {
      this.disableNext = true;
    }
  }

  render() {
    return html`
      <style>
      * {
        margin: 0;
        padding: 0;
      }
      .container {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      #before {
        transform: rotate(180deg);
      }
      .icon {
        width: 60px;
        height: 60px;
        cursor: pointer;
        margin: 78px;
      }
      .disabled {
        cursor: not-allowed;
      }
      #base {
        width: ${this.width}px;
        overflow-${this.direction}: auto;
        scroll-snap-type: ${this.direction} mandatory;
        display: grid;
        place-items: center;
        grid-auto-flow: column;
        grid-gap: ${this.gap}px;
        padding: 46px 0;
      }
      #base::-webkit-scrollbar {
        display: none;
      }
      </style>
      ${
        when(
          this['show-icon'],
          () => html`
          <div class="container">
            <div id="before">
              ${
                when(
                  this.disablePrev,
                  () => html`
                  <img title="上一张" class="icon disabled" src=${this['after-icon-disabled']} />
                  `,
                  () => html`
                  <img title="上一张" class="icon" src=${this['after-icon']} @click=${this.prev} />
                  `
                )
              }
            </div>
            <div id="base">
              <slot></slot>
            </div>
            <div id="after">
              ${
                when(
                  this.disableNext,
                  () => html`
                  <img title="下一张" class="icon disabled" src=${this['after-icon-disabled']} />
                  `,
                  () => html`
                  <img title="下一张" class="icon" src=${this['after-icon']} @click=${this.next} />
                  `
                )
              }
            </div>
          </div>
          `,
          () => html`
          <div id="base">
            <slot></slot>
          </div>
          `
        )
      }
    `;
  }
};

@customElement('young-preview-gallary-item')
export class YoungPreviewGallaryItem extends LitElement {
  render() {
    return html`
      <style>
      * {
        margin: 0;
        padding: 0;
      }
      :host {
        scroll-snap-align: center;
      }
      </style>
      <div>
        <slot></slot>
      </div>
    `;
  }
};