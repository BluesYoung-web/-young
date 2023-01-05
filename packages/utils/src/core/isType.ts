/*
 * @Author: zhangyang
 * @Date: 2020-11-12 10:23:05
 * @LastEditTime: 2022-02-23 19:55:28
 * @Description: 判断变量的类型
 */

const isType = <T1, T2 extends Function>(val: T1, typeFn: T2) =>
  Object.prototype.toString.call(val) === `[object ${typeFn.name}]`;

export const isArray = (arr: any) => isType(arr, Array);

export const isObject = (arr: any) => isType(arr, Object);

export const isNumber = (num: any) => isType(num, Number);

export const isString = (str: any) => isType(str, String);

export const isBoolean = (bool: any) => isType(bool, Boolean);

export const isMap = (bool: any) => isType(bool, Map);

export const isWeakMap = (bool: any) => isType(bool, WeakMap);

export const isSet = (bool: any) => isType(bool, Set);

export const isWeakSet = (bool: any) => isType(bool, WeakSet);

export const isArrayBuffer = (bool: any) => isType(bool, ArrayBuffer);

export const isRegExp = (bool: any) => isType(bool, RegExp);

export const isFunction = (bool: any) => isType(bool, Function);

export const isSymbol = (bool: any) => isType(bool, Symbol);

export const isNull = (n: any) => n === null;

export const isUndefined = (u: any) => u === undefined;
