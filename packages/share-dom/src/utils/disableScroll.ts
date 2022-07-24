/*
 * @Author: zhangyang
 * @Date: 2022-07-04 17:24:43
 * @LastEditTime: 2022-07-11 15:49:02
 * @Description: 
 */
function preventKeyScroll(e) {
  const keys = [
    'ArrowUp',
    'ArrowDown',
    'PageUp',
    'PageDown',
    'Home',
    'End',
    'Tab'
  ];
  if (keys.includes(e.key)) {
    e.preventDefault();
  }
}

function preventWheelScroll(e) {
  e.preventDefault();
}

export const disableScroll = () => {
  window.addEventListener('wheel', preventWheelScroll, { passive: false });
  window.addEventListener('keyup', preventKeyScroll);
  window.addEventListener('keydown', preventKeyScroll);
  window.addEventListener('keypress', preventKeyScroll);
};

export const enableScroll = () => {
  window.removeEventListener('wheel', preventWheelScroll);
  window.removeEventListener('keyup', preventKeyScroll);
  window.removeEventListener('keydown', preventKeyScroll);
  window.removeEventListener('keypress', preventKeyScroll);
};