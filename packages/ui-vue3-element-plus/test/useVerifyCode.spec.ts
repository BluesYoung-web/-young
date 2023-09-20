/*
 * @Author: zhangyang
 * @Date: 2023-03-10 16:55:47
 * @LastEditTime: 2023-09-19 15:31:45
 * @Description:
 */
import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';
import { useVerifyCode } from '../src';

beforeAll(() => {
  vi.useFakeTimers();
});

afterAll(() => {
  vi.useRealTimers();
});

describe('验证码倒计时', () => {
  const fn = vi.fn();
  const { getCode, tip, showSlider, pass, cancel } = useVerifyCode(fn);
  it('点击获取验证码', () => {
    expect(tip.value).toMatchInlineSnapshot('"获取验证码"');
    getCode();
    expect(showSlider.value).toEqual(true);
  });

  it('人机验证通过, 开始倒计时, 计时结束后可以重新获取', async () => {
    await pass();
    expect(fn).toBeCalled();
    expect(tip.value).toMatchInlineSnapshot('"59 秒后重试"');
    await vi.advanceTimersByTimeAsync(1e3);
    expect(tip.value).toMatchInlineSnapshot('"58 秒后重试"');
    await vi.advanceTimersByTimeAsync(58e3);
    expect(tip.value).toMatchInlineSnapshot('"0 秒后重试"');
    await vi.advanceTimersByTimeAsync(1e3);
    expect(tip.value).toMatchInlineSnapshot('"获取验证码"');
  });

  it('主动取消验证', () => {
    cancel();
    expect(showSlider.value).toEqual(false);
  });
});
