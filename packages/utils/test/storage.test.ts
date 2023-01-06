/*
 * @Author: zhangyang
 * @Date: 2022-06-20 16:24:14
 * @LastEditTime: 2022-10-19 19:17:29
 * @Description: 
 */
import { describe, it, expect, vi } from 'vitest';
import { YoungLocalStorage } from '../src';

const Store = new YoungLocalStorage();

describe('Store lib', () => {
  const key = 'llllllllllllllll';
  const value = {
    "platId": "UG9tNzlMdnpPdjltUnBldzJWWDY=",
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0eXBlIjoidXNlciIsInBsYXRJZCI6IlVHOXROemxNZG5wUGRqbHRVbkJsZHpKV1dEWT0iLCJ1bmlvbklkIjpudWxsLCJvcGVuSWQiOm51bGwsImlzcyI6Imh0dHBzOlwvXC93d3cubGFpeW91eGkuY29tIiwia2V5IjoiYWNjb3VudCIsImlhdCI6MTY1NTQ1NDYzNCwiZXhwIjoxNjU1NDYxODM0LCJleHRyYSI6IltdIn0.q6uDkY3lRdsOq60pJofBkR5gQBrLLxExzmTfCjUUo6k"
  };
  
  it('basic set & get', () => {
    Store.set(key, value);
    expect(Store.get<typeof value>(key)).toEqual(value);
  });

  it('del', () => {
    Store.set(key, value);
    expect(Store.get<typeof value>(key)).toEqual(value);
    Store.remove(key);
    expect(Store.get(key)).toBe(undefined);
  })

  it('default outdate', () => {
    vi.useFakeTimers();

    Store.set(key, value);

    vi.advanceTimersByTime(1000 * 3600 * 24 * 0.9);
    // 一天之内，存在
    expect(Store.get<typeof value>(key)).toEqual(value);

    vi.advanceTimersByTime(1000 * 3600 * 24 * 1);
    // 一天之后，过期
    expect(Store.get<typeof value>(key)).toBe(undefined);

    vi.useRealTimers();
  });

  it('custom outdate', () => {
    vi.useFakeTimers();

    Store.set(key, value, 1);

    vi.advanceTimersByTime(1000 * 3600 * 24 * 0.9);
    expect(Store.get<typeof value>(key)).toEqual(value);

    vi.advanceTimersByTime(1000 * 3600 * 24 * 0.1);
    expect(Store.get<typeof value>(key)).toBe(undefined);

    vi.useRealTimers();
  });
});