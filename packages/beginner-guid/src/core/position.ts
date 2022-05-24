/*
 * @Author: zhangyang
 * @Date: 2022-05-20 17:00:04
 * @LastEditTime: 2022-05-24 15:20:26
 * @Description: 
 */
import type { Position, Selector } from './../type';
export const getPosition = (selector: Selector) => {
  const el = document.querySelector(selector);
  const { left, top, right, x: srcX, y: srcY, width, height } = el.getBoundingClientRect();

  const offset = 10;
  const dw = 400;
  const dh = 300;

  let positionX: Position = 'left';
  let positionY: Position = 'top';
  let x = right + offset;
  let y = top + offset;
  // 右侧宽度不足以方式弹框
  if (window.innerWidth - right < dw + offset) {
    // 放到左侧
    positionX = 'right';
    x = window.innerWidth - left + offset;

    // 左侧宽度也不够，放到下面
    if (srcX < dw + offset) {
      positionX = 'left';
      x = srcX;
      positionY = 'top';
      y = srcY + height + offset;
    }
  }
  // 特殊情况，放在屏幕中间
  if (window.innerHeight - y < dh) {
    positionX = 'left';
    positionY = 'top';
    x = (window.innerWidth - dw) >> 1;
    y = (window.innerHeight - dh) >> 1;
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