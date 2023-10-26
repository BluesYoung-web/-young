# 基于 Axios 封装的 http 请求库

## 安装

```bash
# 选择一个你喜欢的包管理器
# NPM
$ npm install @bluesyoung/http --save

# Yarn
$ yarn add @bluesyoung/http

# pnpm
$ pnpm add @bluesyoung/http
```

## 基础使用

```ts
import { useHttp } from '@bluesyoung/http';

const httpInstance = useHttp();

const useGetRequest = () => {
  const method = 'get';

  return {
    userInfo: async () => {
      return httpInstance.freeReq({
        url: '/user_info',
        method
      });
    }
  };
};

const usePostRequest = () => {

  return {
    pwd: async (data: {
      old_pwd: string,
      new_pwd: string,
    }) => {
      return httpInstance.authReq({
        url: '/pwd',
        data
      });
    }
  };
};

const apis = httpInstance.__mixin__({
  get: useGetRequest(),
  post: usePostRequest(),
  // ...
});

// 下面的操作会拥有智能类型提示
apis.get.userInfo();
apis.post.pwd({ old_pwd: '111111', new_pwd: '123456' });
```

## uni-app 中使用

[基于 @uni-helper/axios-adapter 的兼容层](https://github.com/uni-helper/axios-adapter)

```ts
import { useHttp } from '@bluesyoung/http/uni';
```

## 自定义配置

```ts
/**
 * useHttp 默认配置
 * 根据需要自行传入对应的值进行覆盖
 */
const defaultConfig: DefaultHttpConfig = {
  baseURL: '/api',
  method: 'post',
  timeout: 5e3,
  loading: {
    start: console.log.bind(null, '🚀 ~ http loading start'),
    end: console.log.bind(null, '🚀 ~ http loading end'),
  },
  /**
   * @param err checkFn 手动抛出错误时，为正常的 response 对象; 否则为 AxiosError 对象
   * @param rawResponse checkFn 手动抛出错误时，为正常的 response 对象; 否则为 AxiosError 对象
   */
  fail: (err, rawResponse) => {
    console.log('🚀 ~ http fail', err, rawResponse);
  },
  checkFn: (res) => res,
  headers: {
    getCommonHeaders: () => ({}),
    getAuthHeaders: () => ({}),
  },
};

// eg: 禁用 5s 自动超时
const httpInstance = useHttp({
  timeout: -1,
});
```

## 更多

[参见测试用例](./test/index.test.ts)
[参见测试用例](./test/notLoading.test.ts)