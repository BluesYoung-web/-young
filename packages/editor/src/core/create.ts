/*
 * @Author: zhangyang
 * @Date: 2022-05-29 08:02:50
 * @LastEditTime: 2022-05-29 11:13:43
 * @Description: 
 */
import type Engine from '@aomao/engine';

export enum Icons {
  'card' = 'i-fluent-collections-24-regular',
  'undo' = 'i-simple-line-icons-action-undo',
  'redo' = 'i-simple-line-icons-action-redo',
  'paint' = 'i-ant-design-format-painter-outlined',
  'eraser' = 'i-fluent-eraser-tool-24-regular',
  'bold' = 'i-material-symbols-format-bold',
  'italic' = 'i-fluent-text-italic-24-regular',
  'strick' = 'i-fluent-text-strikethrough-24-regular',
  'underline' = 'i-icon-park-outline-text-underline',
  'sup' = 'i-ic-sharp-superscript',
  'sub' = 'i-ic-sharp-subscript'
};

type Cbk = (args?: any) => void;

interface CreateBtnConfig {
  icon: Icons;
  title: string;
  cmd: string;
  class?: string;
};

interface SelectOptions {
  value: string;
  render: {
    content: string;
    style: string;
  };
};

type CreateSelectConfig = {
  options: SelectOptions[];
  cmd: Cbk;
  title: string;
  class?: string;
};

export const createEL = (attrs: Record<string, string> = {}, tag: keyof HTMLElementTagNameMap = 'div') => {
  const el = document.createElement(tag);
  Object.entries(attrs).forEach(([key, value]) => {
    el.setAttribute(key, value);
  });
  return el;
};

export const createBtn = (conf: CreateBtnConfig, engine: Engine) => {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.setAttribute('class', `${conf?.class ?? ''} ${conf.icon} cursor-pointer`);
  btn.title = conf.title;
  btn.addEventListener('click', () => engine.command.execute(conf.cmd));
  return btn;
};

export const createSelect = (conf: CreateSelectConfig) => {
  const select = document.createElement('select');
  select.title = conf.title;
  select.setAttribute('class', `${conf?.class ?? ''} cursor-pointer`);

  const options = createEL();
  conf.options.forEach((o) => {
    const item = document.createElement('option');
    item.value = o.value;
    item.innerHTML = o.render.content;
    item.setAttribute('style', o.render.style);
    options.appendChild(item)
  });

  select.innerHTML = options.innerHTML;

  select.addEventListener('change', (e) => conf.cmd(e));
  return select;
};