/*
 * @Author: zhangyang
 * @Date: 2022-04-28 16:27:49
 * @LastEditTime: 2022-05-28 19:28:29
 * @Description: 
 */
/// <reference types="vitest" />
import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'YoungEditor',
      formats: [
        // 'es',
        'umd',
        // 'cjs'
      ],
      fileName: (format) => `index.${format}.js`
    },
    sourcemap: true,
  },
  test: {
    environment: 'happy-dom'
  }
})