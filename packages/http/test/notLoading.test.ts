/*
 * @Author: zhangyang
 * @Date: 2023-07-17 16:26:53
 * @LastEditTime: 2023-08-31 11:52:04
 * @Description:
 */
import { describe, it, expect, vi } from 'vitest';
import { useHttp } from '../src';

describe('useHttp loading config', () => {
  it('default loading: ', async () => {
    const startLoading = vi.fn();
    const endLoading = vi.fn();

    const http = useHttp({
      baseURL: 'http://localhost:3000/api/v1',
      loading: {
        start: startLoading,
        end: endLoading,
      },
    });

    const apis = http.__mixin__({
      get: {
        '/name': async (name: string) =>
          http.__instance__.get('', {
            params: { name },
          }),
      },
    });

    await apis.get['/name']('name');

    expect(startLoading).toBeCalledTimes(1);
    expect(endLoading).toBeCalledTimes(1);
  });

  it('disable loading', async () => {
    const startLoading = vi.fn();
    const endLoading = vi.fn();

    const http = useHttp({
      baseURL: 'http://localhost:3000/api/v1',
      loading: {
        start: startLoading,
        end: endLoading,
      },
    });

    const apis = http.__mixin__({
      get: {
        '/name': async (name: string) =>
          http.__instance__.get('', {
            params: { name },
            notLoading: true,
          }),
      },
    });

    await apis.get['/name']('name');

    expect(startLoading).toBeCalledTimes(0);
    expect(endLoading).toBeCalledTimes(0);
  });

  it('end loading shold be called onece when all request are done', async () => {
    const startLoading = vi.fn();
    const endLoading = vi.fn();

    const http = useHttp({
      baseURL: 'http://localhost:3000/api/v1',
      loading: {
        start: startLoading,
        end: endLoading,
      },
    });

    const apis = http.__mixin__({
      get: {
        '/name': async (name: string) =>
          http.__instance__.get('', {
            params: { name },
          }),
      },
    });

    await Promise.all([
      apis.get['/name']('name'),
      apis.get['/name']('name'),
      apis.get['/name']('name'),
    ]);

    await apis.get['/name']('name');
    await apis.get['/name']('name');

    expect(startLoading).toBeCalledTimes(5);
    expect(endLoading).toBeCalledTimes(3);
  });
});
