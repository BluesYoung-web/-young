/*
 * @Author: zhangyang
 * @Date: 2022-05-29 08:00:03
 * @LastEditTime: 2022-05-29 11:06:26
 * @Description: 
 */
import { createSelect, createEL, Icons } from './../core/create';
import type Engine from '@aomao/engine';
import Heading from '@aomao/plugin-heading';
import FontFamily from '@aomao/plugin-fontfamily';
import FontSize from '@aomao/plugin-fontsize';
import { fonts, heads, sizes } from '../core/config';

export const TextPlugins = [
  Heading,
  FontFamily,
  FontSize
];

export default (engine: Engine) => {
  const card = createEL({
    class: 'children:m-1'
  });

  const heading = createSelect({
    title: '标题',
    options: heads.map(({ key, value, style }) => ({
      value: key,
      render: {
        content: value,
        style
      }
    })),
    cmd: (e) => engine.command.execute('heading', e.target.value)
  });

  const font = createSelect({
    title: '字体',
    options: fonts.map(({ key, value }) => ({
      value: key,
      render: {
        content: `${value || '默认'}`,
        style: `font-family: ${value};`
      }
    })),
    cmd: (e) => engine.command.execute('fontfamily', e.target.value)
  });

  const size = createSelect({
    title: '字号',
    options: sizes.map((value) => ({
      value,
      render: {
        content: value,
        style: `font-size: ${value};`
      }
    })),
    cmd: (e) => engine.command.execute('fontsize', e.target.value)
  })


  card.appendChild(heading);
  card.appendChild(font);
  card.appendChild(size);

  return card;
};