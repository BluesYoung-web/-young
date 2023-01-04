/*
 * @Author: zhangyang
 * @Date: 2022-12-08 09:58:28
 * @LastEditTime: 2023-01-04 11:05:37
 * @Description:
 */
import type { AxiosInstance, AxiosRequestConfig, Method, AxiosAdapter } from 'axios';
import axios from 'axios';
import { defu } from 'defu';

type Simplify<T> = {
  [P in keyof T]: T[P];
};

type SetRequired<T, K extends keyof T> = Simplify<
  // 将要设置为可选类型的结构取出并设置为必选
  Required<Pick<T, K>> &
    // 取并集
    // 排除需要设置为可选属性的结构，其余的保持不变
    Pick<T, Exclude<keyof T, K>>
>;

export type AllMethod = Lowercase<Method>;
export type Fn<T extends any = any, R extends any = any> = (args: T) => Promise<R>;
export type Cbks = {
  [k in AllMethod]?: Record<string, Fn>;
};

type Handlers<R extends Cbks> = {
  [P in keyof R]?: R[P];
};

type Headers = Record<string, string>;

type Prototype = {
  __instance__: AxiosInstance;
  __mixin__<T extends Cbks>(
    extentions: Handlers<T>,
  ): SetRequired<Handlers<T>, keyof T> & ThisType<Handlers<T>>;

  freeReq: AxiosInstance['request'];
  authReq: AxiosInstance['request'];
};

export enum UsefulContentTypes {
  JSON = `application/json; charset=UTF-8`,
  URLEncoded = `application/x-www-form-urlencoded; charset=UTF-8`,
  FormData = `multipart/form-data; charset=UTF-8`,
}

export type DefaultMsg = {
  code: number;
  msg: string;
  data: any;
};

export interface DefaultHttpConfig<Msg extends any = DefaultMsg> {
  /**
   * 基础地址
   * @default /api
   */
  baseURL: string;
  /**
   * 默认方法
   * @default post
   */
  method: AllMethod;
  /**
   * 超时时间
   * @default 5e3 5s
   */
  timeout: number;
  /**
   * 加载函数
   */
  loading: {
    start: () => void;
    end: () => void;
  };
  /**
   * 错误处理函数，进行错误处理或继续抛出错误
   * 接受各种抛出的错误
   * @default console.error
   */
  fail: (err: string | number | Error | Msg) => void;
  /**
   * 结果校验 + 数据解析，判断此次请求是否正常，正常则返回解包数据，否则抛出异常
   * 不传则默认使用标准 http 状态码作为判断结果，并原样返回
   * @default () => any | never
   */
  checkFn: (res: Msg) => any | never;
  /**
   * 请求头
   */
  headers: {
    /**
     * 生成公共请求头
     * @default () => {}
     */
    getCommonHeaders?: () => Headers;
    /**
     * 生成鉴权请求头
     * @default () => {}
     */
    getAuthHeaders?: () => Headers;
  };
  /**
   * 自定义适配器
   * 微信小程序等其他非标准环境时传入
   */
  adapter?: AxiosAdapter;
}

const defaultConfig: DefaultHttpConfig = {
  baseURL: '/api',
  method: 'post',
  timeout: 5e3,
  loading: {
    start: console.log.bind(null, '🚀 ~ http loading start'),
    end: console.log.bind(null, '🚀 ~ http loading end'),
  },
  fail: console.error.bind(null, '🚀 ~ http loading error'),
  checkFn: (res) => res,
  headers: {
    getCommonHeaders: () => ({}),
    getAuthHeaders: () => ({}),
  },
};

export const useHttp = <Msg extends Record<string, any> = DefaultMsg, Fns extends Cbks = Cbks>(
  config: Partial<DefaultHttpConfig<Msg>> = {},
) => {
  const finalConfig = defu(config, defaultConfig);

  const { baseURL, method, timeout, headers, checkFn, adapter, loading, fail } = finalConfig;

  const net = axios.create({
    baseURL,
    method,
    timeout,
    headers: headers.getCommonHeaders(),
    adapter,
  });

  net.interceptors.request.use(
    (req) => {
      loading.start();
      return req;
    },
    (error) => {
      fail(error);
      return Promise.reject(error);
    },
  );

  net.interceptors.response.use(
    (response) => {
      loading.end();
      const data = response.data;

      return checkFn(data);
    },
    (error: Error) => {
      loading.end();
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

    freeReq: net.request,
    authReq: (args: AxiosRequestConfig) =>
      net.request({
        ...args,
        headers: {
          ...headers.getAuthHeaders(),
          ...args?.headers,
        },
      }),
  } as unknown as Handlers<Fns> & Prototype;
};
