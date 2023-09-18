/*
 * @Author: zhangyang
 * @Date: 2023-09-18 15:25:53
 * @LastEditTime: 2023-09-18 15:31:18
 * @Description: 
 */
import type { AxiosRequestConfig } from 'axios';
import type { Cbks, DefaultHttpConfig, DefaultMsg, Handlers, Prototype } from '.';
import { defaultConfig } from '.';
import { defu } from 'defu';
import axios from 'axios';
import { createUniAppAxiosAdapter } from '@uni-helper/axios-adapter'

export const useHttp = <Msg extends Record<string, any> = DefaultMsg, Fns extends Cbks = Cbks>(
  config: Partial<DefaultHttpConfig<Msg>> = {},
) => {
  const finalConfig = defu(config, defaultConfig);

  const { baseURL, lazyBaseURL, method, timeout, headers, checkFn, loading, fail } = finalConfig;

  const net = axios.create({
    method,
    timeout,
    adapter: createUniAppAxiosAdapter(),
  });

  // 全局保持一个 loading
  let loadingCount = 0;

  /**
   * 显示loading
   */
  function startLoading() {
    loadingCount++;
    loading.start();
  }

  /**
   * 隐藏loading
   */
  function endLoading() {
    if (--loadingCount === 0) {
      loading.end();
    }
  }

  net.interceptors.request.use(
    (req) => {
      !req.notLoading && startLoading();
      if (!req.baseURL) {
        req.baseURL = lazyBaseURL?.() ?? baseURL;
      }
      return req;
    },
    (error) => {
      fail(error);
      return Promise.reject(error);
    },
  );

  net.interceptors.response.use(
    (response) => {
      !response.config.notLoading && endLoading();
      const data = response.data;

      try {
        return checkFn(data);
      } catch (err) {
        // 应用逻辑异常
        fail(err);
      }
    },
    (error) => {
      if (error && error.config && !error.config.notLoading) {
        endLoading();
      }
      // http 异常
      fail(error);
    },
  );

  return {
    get: undefined,
    post: undefined,
    delete: undefined,
    put: undefined,
    patch: undefined,
    head: undefined,
    purge: undefined,
    options: undefined,
    link: undefined,
    unlink: undefined,
    __instance__: net,
    __mixin__(extentions) {
      for (const method in extentions) {
        if (Object.prototype.hasOwnProperty.call(extentions, method)) {
          const originFns = this[method] || {};
          const fns = extentions[method];
          this[method] = {
            ...originFns,
            ...fns,
          };
        }
      }

      return this;
    },

    freeReq: (args: AxiosRequestConfig) =>
      net.request({
        ...args,
        headers: {
          ...headers.getCommonHeaders(),
          ...args?.headers,
        },
      }),
    authReq: (args: AxiosRequestConfig) =>
      net.request({
        ...args,
        headers: {
          ...headers.getCommonHeaders(),
          ...headers.getAuthHeaders(args),
          ...args?.headers,
        },
      }),
  } as unknown as Handlers<Fns> & Prototype;
};
