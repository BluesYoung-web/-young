/*
 * @Author: zhangyang
 * @Date: 2022-05-20 16:33:38
 * @LastEditTime: 2022-05-20 17:44:54
 * @Description: 
 */
export const createMask = (zIndex: number) => {
  const mask = document.createElement('div');
  mask.setAttribute('id', 'mask');
  mask.setAttribute('style', `
    width: 100vw;
    height: 100vh;
    background-color: gray;
    opacity: 0.6;
    position: fixed;
    top: 0;
    z-index: ${zIndex};
  `);
  return mask;
};

export const createDialog = (zIndex: number) => {
  const dialog = document.createElement('div');
  dialog.setAttribute('id', 'dialog');
  dialog.setAttribute('style', `
    width: 400px;
    height: 300px;
    background-color: #fff;
    position: fixed;
    top: 0;
    z-index: ${zIndex};
  `);
  return dialog;
};

export const createItem = (zIndex: number = 3000) => {
  const mask = createMask(zIndex);
  const dialog = createDialog(zIndex + 1);
  
  const container = document.createElement('div');
  container.appendChild(mask);
  container.appendChild(dialog);

  return container;
};