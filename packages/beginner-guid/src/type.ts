/*
 * @Author: zhangyang
 * @Date: 2022-05-20 10:43:29
 * @LastEditTime: 2022-05-23 11:03:57
 * @Description: 
 */
export type Position = 
| 'left'
| 'right'
| 'top'
| 'bottom';

export type Selector = keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap | `.${string}` | `#${string}` | `[${string}]`;

export type GuidItem = {
  el: Selector;
  title: string;
  content: string;
};
document.querySelector
export type GuidOptions = {
  /**
   * 实例化之后立即开始
   * @default false
   */
  immdiate?: boolean;
  /**
   * 强制进行新手引导，无法直接关闭
   * @default false
   */
  force?: boolean;
};

export const defautOptions: GuidOptions = {
  immdiate: false,
  force: false
};