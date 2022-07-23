/*
 * @Author: zhangyang
 * @Date: 2022-04-28 16:27:49
 * @LastEditTime: 2022-07-02 14:35:57
 * @Description: 
 */
import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'YoungWechatAuth',
      formats: ['es', 'umd', 'cjs'],
      fileName: (format) => `index.${format}.js`
    },
    sourcemap: true,
  }
});