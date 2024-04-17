/*
 * @Author: zhangyang
 * @Date: 2021-07-03 15:05:07
 * @LastEditTime: 2024-04-09 12:11:36
 * @Description: 自定义工具函数
 */
import { isObject, isString } from './isType';
import md5 from 'md5';

export { md5 }

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
 * @param {string | T} str
 * @cond string 解析，否则原样返回；解析出错返回 exp
 */
export const safeJsonParse = <T extends any = any>(str: string | T, exp: any = {}): T => {
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
  return str;
};

/**
 * 链接地址兼容
 */
export const formatUrl = (url: string) => (url.indexOf('http') !== -1 ? url : `//${url}`);

/**
 * 基于随机数的 uuid，极简
 */
export const randomId = () => Math.random().toString(36).slice(8);

/**
 * 生成 32 位的随机 id
 * 原生方法 crypto.randomUUID() 同样可得到
 */
export const randomUUID = () => {
  let res = ''
  const template = 'xxxxxxxx-xxxx-6xxx-yxxx-xxxxxxxxxxxx'

  for (let i = 0, len = template.length; i < len; i += 1) {
    const s = template[i]
    const r = (Math.random() * 16) | 0
    const v = s === 'x' ? r : s === 'y' ? (r & 0x3) | 0x8 : s
    res += v.toString(16)
  }

  return res
}

/**
 * 基于 canvas 生成浏览器指纹
 */
export function getFingerprint() {
  try {
    // Text with lowercase/uppercase/punctuation symbols
    const c = 'bluesyoung_web@163.com <canvas> 1.0'
    const canvas = document.createElement('canvas')
    canvas.setAttribute('width', '220')
    canvas.setAttribute('height', '30')
    const canvasContext = canvas.getContext('2d')!
    canvasContext.textBaseline = 'top'
    // The most common type
    canvasContext.font = '14px \'Arial\''
    canvasContext.textBaseline = 'alphabetic'
    canvasContext.fillStyle = '#f60'
    canvasContext.fillRect(125, 1, 62, 20)
    // Some tricks for color mixing to increase the difference in rendering
    canvasContext.fillStyle = '#069'
    canvasContext.fillText(c, 2, 15)
    canvasContext.fillStyle = 'rgba(102, 204, 0, 0.7)'
    canvasContext.fillText(c, 4, 17)

    const base64Str = canvas.toDataURL().split(',')[1]
    const askiiStr = atob(base64Str)
    let result = ''
    for (let i = 0; i < askiiStr.length; i++) {
      const askii = askiiStr.charCodeAt(i)
      if (askii <= 0x0F) {
        // 小于0x0f转为16进制后在前面补零
        result += '0'
      }
      result += askii.toString(16).toLocaleUpperCase()
    }

    return md5(result).toUpperCase()
  } catch (error) {
    console.log("🚀 ~ getFingerprint ~ error:", error)
    throw new Error('getFingerprint error, your envrionment is not support')
  }
}
