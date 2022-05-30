/*
 * @Author: zhangyang
 * @Date: 2022-05-29 08:00:33
 * @LastEditTime: 2022-05-29 11:30:56
 * @Description: 
 */
import { createBtn, createEL, Icons } from './../core/create';
import type Engine from '@aomao/engine';
import Bold from '@aomao/plugin-bold';
import Italic from '@aomao/plugin-italic';
import Strike from '@aomao/plugin-strikethrough';
import Underline from '@aomao/plugin-underline';
import Sup from '@aomao/plugin-sup';
import Sub from '@aomao/plugin-sub';

export const StylePlugins = [
  Bold,
  Italic,
  Strike,
  Underline,
  Sup,
  Sub
];

export default (engine: Engine) => {
  const card = createEL({
    class: 'children:m-1'
  });

  const btns = [
    {
      icon: Icons.bold,
      title: '加粗',
      cmd: 'bold'
    },
    {
      icon: Icons.italic,
      title: '斜体',
      cmd: 'italic'
    },
    {
      icon: Icons.strick,
      title: '删除线',
      cmd: 'strikethrough'
    },
    {
      icon: Icons.underline,
      title: '下划线',
      cmd: 'underline'
    },
    {
      icon: Icons.sup,
      title: '上标',
      cmd: 'sup'
    },
    {
      icon: Icons.sub,
      title: '下标',
      cmd: 'sub'
    }
  ];

  btns.forEach((btn) => {
    const b = createBtn(btn, engine);
    card.appendChild(b);
  });
  return card;
};