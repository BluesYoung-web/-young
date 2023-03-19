/*
 * @Author: zhangyang
 * @Date: 2023-03-19 10:49:10
 * @LastEditTime: 2023-03-19 10:50:11
 * @Description:
 */
export const useKeyUp = (e: KeyboardEvent, fn: Function, key = 'enter') => {
  if (e.key.toLocaleLowerCase() === key) {
    e.preventDefault();
    fn();
  }
};
