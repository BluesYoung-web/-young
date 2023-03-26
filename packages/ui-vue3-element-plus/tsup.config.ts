/*
 * @Author: zhangyang
 * @Date: 2022-04-28 14:22:55
 * @LastEditTime: 2023-03-25 19:47:53
 * @Description: 仅作为 dts 生成器
 */
import { defineConfig } from 'tsup';

export default defineConfig((options) => {
  return {
    entry: ['src/index.ts', 'src/resolver.ts'],
    dts: true,
  };
});
