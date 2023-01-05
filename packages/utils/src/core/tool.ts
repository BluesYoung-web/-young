/*
 * @Author: zhangyang
 * @Date: 2021-07-03 15:05:07
 * @LastEditTime: 2023-01-05 16:21:30
 * @Description: 自定义工具函数
 */
import { isObject, isString } from './isType';
export const sleep = async (n: number) => {
  return new Promise((resolve) => setTimeout(resolve, n * 1000));
};

const parseDo = (str: string, sep = '%') => {
  const arr: string[] = [];
  str.split(sep).map((item) => {
    if (item) {
      const s = item.replace('u', '0x');
      if (s.length > 6) {
        arr.push(String.fromCharCode(+s.substr(0, 6)), decodeURIComponent(s.slice(6)));
      } else if (s.length === 6) {
        arr.push(String.fromCharCode(+s));
      } else {
        arr.push(decodeURIComponent(s));
      }
    }
  });
  return arr.join('');
};
/**
 * 解析转义之后的字符串
 * @param str
 */
export const encodedStrParse = (str: string) => {
  if (str.includes('%u')) {
    return parseDo(str, '%');
  } else if (str.includes('\\u')) {
    return parseDo(str, '\\');
  } else {
    return decodeURIComponent(str);
  }
};

/**
 * 安全解析 JSON 字符串
 * @param {string} str
 */
export const safeJsonParse = <T extends any = any>(str: string, exp: any = {}): T => {
  if (isString(str)) {
    try {
      const obj = JSON.parse(str);
      if (isObject(obj) || Array.isArray(obj)) {
        return obj;
      } else {
        return exp;
      }
    } catch (error) {
      return exp;
    }
  }
  return exp;
};

export const formatUrl = (url: string) => (url.indexOf('http') !== -1 ? url : `//${url}`);
