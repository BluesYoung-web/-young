/*
 * @Author: zhangyang
 * @Date: 2022-05-29 07:59:43
 * @LastEditTime: 2022-05-29 11:30:54
 * @Description: 
 */
import { createBtn, createEL, Icons } from './../core/create';
import type Engine from '@aomao/engine';
import Undo from '@aomao/plugin-undo';
import Redo from '@aomao/plugin-redo';
import FormatPaint from '@aomao/plugin-paintformat';
import Eraser from '@aomao/plugin-removeformat';

export const CmdPlugins = [
  Undo,
  Redo,
  FormatPaint,
  Eraser
];

export default (engine: Engine) => {
  const card = createEL({
    class: 'children:m-1'
  });

  const btns = [
    {
      icon: Icons.undo,
      title: '撤销',
      cmd: 'undo'
    },
    {
      icon: Icons.redo,
      title: '恢复',
      cmd: 'redo'
    },
    {
      icon: Icons.paint,
      title: '格式刷',
      cmd: 'paintformat'
    },
    {
      icon: Icons.eraser,
      title: '橡皮擦',
      cmd: 'removeformat'
    }
  ];
  
  btns.forEach((btn) => {
    const b = createBtn(btn, engine);
    card.appendChild(b);
  });

  return card;
};