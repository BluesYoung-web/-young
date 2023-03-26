/*
 * @Author: zhangyang
 * @Date: 2023-03-25 20:14:22
 * @LastEditTime: 2023-03-25 20:17:04
 * @Description:
 */
import { describe, it, expect } from 'vitest';
import { YoungApisResolver, YoungComponentsResolver } from '../resolver';

describe('自动导入', () => {
  it('api 自动导入', () => {
    expect(YoungApisResolver()).toMatchInlineSnapshot(`
      {
        "@bluesyoung/ui-vue3-element-plus": [
          "useAutoLoad",
          "useFormMode",
          "useExport2Excel",
          "useVerifyCode",
          "useImagePreview",
          "useKeyUp",
          "useQuery",
          "useRemoteSearch",
        ],
      }
    `);
  });

  it('组件自动导入', () => {
    const resolver = YoungComponentsResolver();

    expect(resolver('YoungDialog')).toMatchInlineSnapshot(`
      {
        "from": "@bluesyoung/ui-vue3-element-plus",
        "name": "YoungDialog",
      }
    `);

    expect(resolver('ElButton')).toBeUndefined();
  });
});
