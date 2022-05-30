/*
 * @Author: zhangyang
 * @Date: 2022-05-28 16:14:03
 * @LastEditTime: 2022-05-29 09:29:41
 * @Description: 
 */

import Engine from '@aomao/engine';
import { createEL } from './core/create';
import { createToolBar, ToolBarPlugins } from './toolbar';
// import Bold from '@aomao/plugin-bold';

export default class YoungEditor {
  public engine: Engine;
  constructor(target: string) {
    const container = document.querySelector(target) as HTMLDivElement;

    const el = createEL({
      class: 'm-0 p-10'
    });
    container.appendChild(el);

    const engine = new Engine(el, {
      plugins: [...ToolBarPlugins]
    });
    
    const toolbar = createToolBar(engine);
    container.prepend(toolbar);

    engine.setValue('<h1>来了老弟</h1>')

    engine.on('change', () => {
			const value = engine.getValue();
			// setContent(value);
			console.log(`value:${value}`);
		});

    // const boldBtn = document.createElement('button');
    // boldBtn.type = 'button';
    // boldBtn.innerText = 'B';
    // boldBtn.title = '加粗';
    // boldBtn.addEventListener('click', () => engine.command.execute('bold'));

    this.engine = engine;
  }

};