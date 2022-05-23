/*
 * @Author: zhangyang
 * @Date: 2022-05-20 17:00:04
 * @LastEditTime: 2022-05-23 15:09:11
 * @Description: 
 */
import type { Position, Selector } from './../type';
export const getPosition = (selector: Selector) => {
  const el = document.querySelector(selector);
  const { left, top, right, bottom } = el.getBoundingClientRect();
  // console.log("🚀 ~ file", el.getBoundingClientRect())

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
    positionX,
    positionY
  };
};