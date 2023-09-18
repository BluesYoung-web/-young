/*
 * @Author: zhangyang
 * @Date: 2022-04-28 14:22:55
 * @LastEditTime: 2023-09-18 16:29:37
 * @Description: 仅作为 dts 生成器
 */
import { defineConfig } from 'tsup';

export default defineConfig((options) => {
  return {
    entry: [
      'src/index.ts',
      'src/uni.ts'
    ],
    dts: true,
  };
});