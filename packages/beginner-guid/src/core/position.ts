/*
 * @Author: zhangyang
 * @Date: 2022-05-20 17:00:04
 * @LastEditTime: 2022-05-24 14:22:50
 * @Description: 
 */
import type { Position, Selector } from './../type';
export const getPosition = (selector: Selector) => {
  const el = document.querySelector(selector);
  const { left, top, right, bottom, x: srcX, y: srcY, width, height } = el.getBoundingClientRect();

  let positionX: Position = 'left';
  let positionY: Position = 'top';
  let x = right + 50;
  let y = top;

  if (window.innerWidth - right < 400) {
    positionX = 'right';
    x = window.innerWidth - left + 50;
  }

  if (window.innerHeight - top < 300) {
    positionY = 'bottom';
    y = bottom;
  }
  return {
    x,
    y,
    srcX,
    srcY,
    width,
    height,
    positionX,
    positionY
  };
};

export const generateClipPathStr = (x: number, y: number, w: number, h: number) => {
  const fullWith = window.innerWidth;
  const fullHeight = window.innerHeight;
  const wx = x + w;
  const hy = y + h;
  const line1 = `M 0 0 H 0 V ${fullHeight} H ${x} V ${fullHeight} H${x} V 0 Z`;
  const line2 = `M ${x} 0 H ${x} V ${y} H ${fullWith} V ${y} H ${fullWith} V ${hy} H ${fullWith} V 0 Z`;
  const line3 = `M ${x} ${hy} H ${x} V ${fullHeight} H ${fullWith} V ${fullHeight} H ${fullWith} V ${hy} Z`;
  const line4 = `M ${wx} ${y} H ${wx} V ${hy} H ${fullWith} V ${hy} H ${fullWith} V ${y} Z`;
  return `${line1} ${line2} ${line3} ${line4}`;
};