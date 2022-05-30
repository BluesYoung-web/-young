/*
 * @Author: zhangyang
 * @Date: 2022-05-29 07:58:57
 * @LastEditTime: 2022-05-29 11:16:49
 * @Description: 
 */

import type Engine from '@aomao/engine';
import { createEL } from './../core/create';
import createCard from './card';
import createCmd, { CmdPlugins } from './cmd';
import createText, { TextPlugins } from './text';
import createStyle, { StylePlugins } from './style';


export const createToolBar = (engine: Engine) => {
  const toolBar = createEL({
    class: 'toolbar-el'
  });

  const tools = [
    createCard,
    createCmd,
    createText,
    createStyle
  ];

  tools.forEach((tool) => {
    toolBar.appendChild(tool(engine));
  });

  return toolBar;
};

export const ToolBarPlugins = [
  ...CmdPlugins,
  ...TextPlugins,
  ...StylePlugins
];