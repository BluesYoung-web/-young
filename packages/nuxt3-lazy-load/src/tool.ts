/*
 * @Author: zhangyang
 * @Date: 2023-09-22 15:17:49
 * @LastEditTime: 2023-09-22 15:19:30
 * @Description: 
 */

import type { YoungLazyLoadOptions, YoungLazyloadType, YoungReplaceRules } from "./types"

/**
 * 不使用懒加载
 * @cond1 直接设置了 data-not-lazy
 * @cond2 对应类型禁用懒加载
 */
export function isNotLazy(match: string): string
export function isNotLazy(match: string, options: YoungLazyLoadOptions, type: YoungLazyloadType): string
export function isNotLazy(...args: any) {
  const [match, options, type] = args
  return match.includes('data-not-lazy') || (options && !options[type])
}

/**
 * 属性替换
 */
export function replaceAttrs(text: string, tag: string, attrs: string[], options: YoungLazyLoadOptions) {
  if (text.includes('devtools'))
    return text


  if (!options.directiveOnly && tag)
    text = text.replace(new RegExp(`<${tag}`), `<${tag} v-lazy-load `)


  for (const attr of attrs)
    text = text.replace(new RegExp(`${attr}=`, 'g'), `data-${attr}=`)

  return text
}

/**
 * 源码修改
 */
export function replaceSrc(text: string, replaceArr: YoungReplaceRules) {
  for (const { from, to } of replaceArr)
    text = text.replace(new RegExp(from, 'g'), to)

  return text
}