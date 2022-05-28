/*
 * @Author: zhangyang
 * @Date: 2022-05-28 16:14:03
 * @LastEditTime: 2022-05-28 20:14:57
 * @Description: 
 */
// @unocss-include
import Engine from '@aomao/engine';
import Bold from '@aomao/plugin-bold';
import Undo from '@aomao/plugin-undo';
import Redo from '@aomao/plugin-redo';
import FormatPaint from '@aomao/plugin-paintformat';

export default class YoungEditor {
  public engine: Engine;
  constructor(target: string) {
    const container = document.querySelector(target) as HTMLDivElement;

    const el = document.createElement('div');
    el.setAttribute('class', 'm-0 p-10');

    const toolbar = document.createElement('div');
    toolbar.setAttribute('class', 'flex children:m-1 bg-blue-200');

    container.appendChild(toolbar);
    container.appendChild(el);

    const engine = new Engine(el, {
      plugins: [Bold, Undo, Redo, FormatPaint]
    });

    engine.setValue('<h1>来了老弟</h1>')

    engine.on('change', () => {
			const value = engine.getValue();
			// setContent(value);
			console.log(`value:${value}`);
		});

    const boldBtn = document.createElement('button');
    boldBtn.type = 'button';
    boldBtn.innerText = 'B';
    boldBtn.title = '加粗';
    boldBtn.addEventListener('click', () => engine.command.execute('bold'));

    const unDoBtn = document.createElement('button');
    unDoBtn.type = 'button';
    unDoBtn.innerText = '撤销';
    unDoBtn.title = '撤销';
    unDoBtn.addEventListener('click', () => engine.command.execute('undo'));

    const reDoBtn = document.createElement('button');
    reDoBtn.type = 'button';
    reDoBtn.innerText = '恢复';
    reDoBtn.title = '恢复';
    reDoBtn.addEventListener('click', () => engine.command.execute('redo'));


    const fmtBtn = document.createElement('button');
    fmtBtn.type = 'button';
    fmtBtn.innerText = '格式刷';
    fmtBtn.title = '格式刷';
    fmtBtn.addEventListener('click', () => engine.command.execute('paintformat'));


    toolbar.appendChild(boldBtn);
    toolbar.appendChild(unDoBtn);
    toolbar.appendChild(reDoBtn);
    toolbar.appendChild(fmtBtn);

    this.engine = engine;
  }

};