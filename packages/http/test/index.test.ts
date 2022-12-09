/*
 * @Author: zhangyang
 * @Date: 2022-12-08 14:39:52
 * @LastEditTime: 2022-12-09 17:17:17
 * @Description:
 */
import { describe, it, expect } from 'vitest';
import { useHttp } from '../src';

describe('xxxxx', () => {
  it('aaa', () => {
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
});
