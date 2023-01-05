/*
 * @Author: zhangyang
 * @Date: 2021-12-29 17:42:17
 * @LastEditTime: 2021-12-29 18:45:43
 * @Description: 颜色相关的工具函数
 */

/**
 * 随机 16 进制颜色
 */
export const randomHexColorCode = () => {
  const n = (Math.random() * 0xfffff * 1000000).toString(16);
  return '#' + n.slice(0, 6);
};

/**
 * RGB 转 16进制
 */
export const RGBToHex = (r: number, g: number, b: number) =>
  ((r << 16) + (g << 8) + b).toString(16).padStart(6, '0');

/**
 * 16进制 转 RGB
 */
export const hexToRGB = (hex: string) => {
  let alpha = false;
  let h: string | number = hex.slice(hex.startsWith('#') ? 1 : 0);
  if (h.length === 3) {
    h = [...h].map((x) => x + x).join('');
  } else if (h.length === 8) {
    alpha = true;
  }
  h = parseInt(h, 16);
  return (
    `rgb${alpha ? 'a' : ''}(` +
    `${h >>> (alpha ? 24 : 16)}, ` +
    `${(h & (alpha ? 0x00ff0000 : 0x00ff00)) >>> (alpha ? 16 : 8)}, ` +
    `${(h & (alpha ? 0x0000ff00 : 0x0000ff)) >>> (alpha ? 8 : 0)}` +
    `${alpha ? `, ${h & 0x000000ff}` : ''}` +
    `)`
  );
};

/**
 * 3 位 扩充为 6位
 */
export const extendHex = (shortHex: string) =>
  '#' +
  shortHex
    .slice(shortHex.length === 4 ? 1 : 0)
    .split('')
    .map((x) => x + x)
    .join('');

/**
 * RGB 转 对象
 */
export const toRGBObject = (rgbStr: string) => {
  const [red, green, blue] = rgbStr.match(/\d+/g)?.map((n) => +n) ?? [0, 0, 0];
  return { red, green, blue };
};

/**
 * RGB 转 数组
 */
export const toRGBArray = (rgbStr: string) => rgbStr.match(/\d+/g)?.map((n) => +n) ?? [0, 0, 0];

/**
 * RGB 转 HSB
 */
export const RGBToHSB = (r: number, g: number, b: number) => {
  r /= 255;
  g /= 255;
  b /= 255;
  const v = Math.max(r, g, b);
  const n = v - Math.min(r, g, b);
  const h = n === 0 ? 0 : n && v === r ? (g - b) / n : v === g ? 2 + (b - r) / n : 4 + (r - g) / n;
  return [60 * (h < 0 ? h + 6 : h), v && (n / v) * 100, v * 100];
};

/**
 * HSB 转 RGB
 */
export const HSBToRGB = (h: number, s: number, b: number) => {
  s /= 100;
  b /= 100;
  const k = (n: number) => (n + h / 60) % 6;
  const f = (n: number) => b * (1 - s * Math.max(0, Math.min(k(n), 4 - k(n), 1)));
  return [255 * f(5), 255 * f(3), 255 * f(1)];
};

/**
 * RGB 转 HSL
 */
export const RGBToHSL = (r: number, g: number, b: number) => {
  r /= 255;
  g /= 255;
  b /= 255;
  const l = Math.max(r, g, b);
  const s = l - Math.min(r, g, b);
  const h = s ? (l === r ? (g - b) / s : l === g ? 2 + (b - r) / s : 4 + (r - g) / s) : 0;
  return [
    60 * h < 0 ? 60 * h + 360 : 60 * h,
    100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
    (100 * (2 * l - s)) / 2,
  ];
};

/**
 * HLS 转 RGB
 */
export const HSLToRGB = (h: number, s: number, l: number) => {
  s /= 100;
  l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [255 * f(0), 255 * f(8), 255 * f(4)];
};
