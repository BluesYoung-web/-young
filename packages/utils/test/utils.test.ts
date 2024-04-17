/*
 * @Author: zhangyang
 * @Date: 2024-04-09 11:52:16
 * @LastEditTime: 2024-04-09 12:13:46
 * @Description: 
 * @LastEditors: zhangyang
 */
import { describe, it, expect, vi } from 'vitest';
import { formatUrl, getFingerprint, md5, randomId, randomUUID, safeJsonParse } from '../src'


describe('src/core/tool.ts', () => {
  it('md5: ', () => {
    expect(md5("hello world")).toBe("5eb63bbbe01eeed093cb22bb8f5acdc3")
  })

  it('safeJsonParse: ', () => {
    it('not string', () => {
      expect(safeJsonParse(123)).toBe(1234)
      expect(safeJsonParse(null)).toBe(null)
      expect(safeJsonParse(undefined)).toBe(undefined)
      expect(safeJsonParse(true)).toBe(true)
      expect(safeJsonParse(false)).toBe(false)
      expect(safeJsonParse(Symbol('123'))).toBe(Symbol('123'))
      expect(safeJsonParse(123n)).toBe(123n)
      expect(safeJsonParse(new Date())).toBe(new Date())
      expect(safeJsonParse(new Error())).toBe(new Error())
      expect(safeJsonParse(new Map())).toBe(new Map())
      expect(safeJsonParse(new Set())).toBe(new Set())
      expect(safeJsonParse(new WeakMap())).toBe(new WeakMap())
      expect(safeJsonParse(new WeakSet())).toBe(new WeakSet())
    })

    it('valid string', () => {
      expect(safeJsonParse('{"a":1}')).toStrictEqual({ a: 1 })
      expect(safeJsonParse('{"a":1,"b":2}')).toStrictEqual({ a: 1, b: 2 })
      expect(safeJsonParse('{"a":1,"b":2,"c":3}')).toStrictEqual({ a: 1, b: 2, c: 3 })
    })

    it('invalid string', () => {
      expect(safeJsonParse('{"a":}')).toStrictEqual({})
      expect(safeJsonParse('{"a":1,"b":2,"c":}', [])).toStrictEqual([])
    })
  })

  it('formatUrl: ', () => {
    expect(formatUrl('https://www.baidu.com/s?wd=hello world')).toBe('https://www.baidu.com/s?wd=hello world')
    expect(formatUrl('http://www.baidu.com/s?wd=hello world')).toBe('http://www.baidu.com/s?wd=hello world')

    expect(formatUrl('www.baidu.com/s?wd=hello world')).toBe('//www.baidu.com/s?wd=hello world')
  })

  it('randomId: ', () => {
    expect(randomId() !== randomId()).toBe(true)
  })

  it('randomUUID: ', () => {
    const uuid = randomUUID()
    console.log("🚀 ~ it ~ uuid:", uuid)

    expect(uuid.length).toBe(36)
    expect(uuid !== randomUUID()).toBe(true)
  })

  it('getFingerprint: ', () => {
    expect(() => getFingerprint()).toThrowErrorMatchingInlineSnapshot('"getFingerprint error, your envrionment is not support"')
  })
})