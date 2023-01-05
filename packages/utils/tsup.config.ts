/*
 * @Author: zhangyang
 * @Date: 2023-01-05 16:13:27
 * @LastEditTime: 2023-01-05 16:33:29
 * @Description:
 */
import { defineConfig } from 'tsup';

export default defineConfig((options) => {
  return {
    entry: ['src/index.ts'],
    dts: true,
  };
});
