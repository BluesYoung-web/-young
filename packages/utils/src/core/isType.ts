/*
 * @Author: zhangyang
 * @Date: 2020-11-12 10:23:05
 * @LastEditTime: 2022-02-23 19:55:28
 * @Description: 判断变量的类型
 */

const isType = <T1, T2 extends Function>(val: T1, typeFn: T2) =>
  Object.prototype.toString.call(val) === `[object ${typeFn.name}]`;

export const isArray = (arr: any): arr is Array<any> => isType(arr, Array);

export const isObject = (obj: any): obj is Object => isType(obj, Object);

export const isNumber = (num: any): num is number => isType(num, Number);

export const isString = (str: any): str is string => isType(str, String);

export const isBoolean = (bool: any): bool is boolean => isType(bool, Boolean);

export const isMap = (map: any): map is Map<any, any> => isType(map, Map);

export const isWeakMap = (map: any): map is WeakMap<any, any> => isType(map, WeakMap);

export const isSet = (s: any): s is Set<any> => isType(s, Set);

export const isWeakSet = (s: any): s is WeakSet<any> => isType(s, WeakSet);

export const isArrayBuffer = (b: any): b is ArrayBuffer => isType(b, ArrayBuffer);

export const isRegExp = (r: any): r is RegExp => isType(r, RegExp);

export const isFunction = (f: any): f is Function => isType(f, Function);

export const isSymbol = (s: any): s is Symbol => isType(s, Symbol);

export const isNull = (n: any): n is null => n === null;

export const isUndefined = (u: any): u is undefined => u === undefined;
