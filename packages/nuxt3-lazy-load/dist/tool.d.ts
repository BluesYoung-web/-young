import type { YoungLazyLoadOptions, YoungLazyloadType, YoungReplaceRules } from "./types";
/**
 * 不使用懒加载
 * @cond1 直接设置了 data-not-lazy
 * @cond2 对应类型禁用懒加载
 */
export declare function isNotLazy(match: string): string;
export declare function isNotLazy(match: string, options: YoungLazyLoadOptions, type: YoungLazyloadType): string;
/**
 * 属性替换
 */
export declare function replaceAttrs(text: string, tag: string, attrs: string[], options: YoungLazyLoadOptions): string;
/**
 * 源码修改
 */
export declare function replaceSrc(text: string, replaceArr: YoungReplaceRules): string;
