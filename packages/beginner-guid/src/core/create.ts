/*
 * @Author: zhangyang
 * @Date: 2022-05-20 16:33:38
 * @LastEditTime: 2022-05-23 15:39:26
 * @Description: 
 */
/// <reference types="vite/client" />
import type { YoungBeginnerGuidController } from '../index';
import cssContent from '../styles/index.css?raw';
import closeIcon from '../styles/close-icon.svg?raw';
export const createEL = (attrs: Record<string, string> = {}, tag: keyof HTMLElementTagNameMap = 'div') => {
  const el = document.createElement(tag);
  Object.entries(attrs).forEach(([key, value]) => {
    el.setAttribute(key, value);
  });
  return el;
};

export const createItem = (handler: YoungBeginnerGuidController, zIndex: string = '3000') => {
  const mask = createEL({ id: 'mask' });
  const dialog = document.createElement('div');
  dialog.setAttribute('id', 'dialog');
  dialog.innerHTML = `
  ${!handler.force
    ? `<div id="dialog-close" title="关闭新手引导">${closeIcon}</div>`
    : ''
  }
  <div class="btns">
    <button id="prev" type="button">上一步</button>
    <button id="next" type="button">下一步</button>
  </div>
  `;
  dialog.querySelector('#prev').addEventListener('click', () => handler.prev());
  dialog.querySelector('#next').addEventListener('click', () => {
    if (handler.index === handler.guids.length - 1) {
      handler.hide();
    } else {
      handler.next();
    }
  });
  !handler.force && dialog.querySelector('#dialog-close').addEventListener('click', () => handler.hide());

  const title = createEL({ class: 'title' }, 'h3');
  title.setAttribute('slot', 'title');
  
  const content = createEL({ class: 'content' });
  content.setAttribute('slot', 'content');

  dialog.prepend(content);
  dialog.prepend(title);
  
  const container = createEL();

  const styles = createEL({}, 'style');
  styles.innerHTML = `
  #mask {
    z-index: ${zIndex};
  }
  #dialog {
    z-index: ${zIndex + 1};
  }
  ${cssContent}
  `;

  container.prepend(styles);
  container.appendChild(mask);
  container.appendChild(dialog);

  return container;
};