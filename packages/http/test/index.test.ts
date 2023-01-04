/*
 * @Author: zhangyang
 * @Date: 2022-12-08 14:39:52
 * @LastEditTime: 2023-01-04 11:03:42
 * @Description:
 */
import { describe, it, expect } from 'vitest';
import { useHttp } from '../src';

describe('useHttp demos', () => {
  it('demo1: ', () => {
    const http = useHttp({
      baseURL: '/api/v1',
    });

    const apis = http.__mixin__({
      get: {
        '/name': async (name: string) => http.__instance__.get(''),
      },
      post: {
        '/name': async (name: string) => {
          await http.freeReq({
            url: '/xxx',
            data: {
              a: 'b',
            },
          });
        },
      },
    });

    expect(apis.get).toMatchInlineSnapshot(`
      {
        "/name": [Function],
      }
    `);

    expect(apis.post).toMatchInlineSnapshot(`
      {
        "/name": [Function],
      }
    `);

    expect(apis).toMatchInlineSnapshot(`
      {
        "__instance__": [Function],
        "__mixin__": [Function],
        "authReq": [Function],
        "delete": undefined,
        "freeReq": [Function],
        "get": {
          "/name": [Function],
        },
        "head": undefined,
        "link": undefined,
        "options": undefined,
        "patch": undefined,
        "post": {
          "/name": [Function],
        },
        "purge": undefined,
        "put": undefined,
        "unlink": undefined,
      }
    `);
  });

  it('demo2', async () => {
    type Msg = {
      code: number;
      msg: string;
      data: any;
    };

    // 使用 apifox 模拟的假接口
    const http = useHttp<Msg>({
      baseURL: 'http://127.0.0.1:4523/m1/2053808-0-default',
      headers: {
        getCommonHeaders: () => ({
          commonheader1: "I'm the common header1",
          commonheader2: "I'm the common header2",
        }),
        getAuthHeaders: () => ({ Auth: "I'm the auth header" }),
      },
      checkFn: ({ code, msg, data }) => {
        if (code === 0) {
          return data;
        } else {
          throw new Error(msg);
        }
      },
    });

    const apis = http.__mixin__({
      get: {
        getA: async () => {
          return await http.freeReq({
            url: '/name',
            method: 'get',
          });
        },
      },
      post: {
        postB: async () => {
          await http.authReq({
            url: '/fetch',
            method: 'post',
            data: {
              123: 456,
            },
          });
        },
      },
      delete: {
        delC: async () => {
          await http.authReq({
            url: '/delete',
            method: 'delete',
            data: {
              id: 1,
            },
          });
        },
      },
    });

    expect(await apis.get.getA()).toMatchInlineSnapshot(`
      {
        "name": "张强",
      }
    `);

    try {
      await apis.post.postB();
    } catch (error) {
      expect(error).toMatchInlineSnapshot('[Error: Request failed with status code 403]');
    }

    try {
      await apis.delete.delC();
    } catch (error) {
      expect(error).toMatchInlineSnapshot('[Error: 无权限，删除失败]');
    }
  });
});
