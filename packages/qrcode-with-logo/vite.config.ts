/*
 * @Author: zhangyang
 * @Date: 2022-04-28 16:27:49
 * @LastEditTime: 2022-11-15 11:31:22
 * @Description: 
 */
/// <reference types="vitest" />
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'YoungQRCodeLogo',
      formats: ['es', 'umd', 'cjs'],
      fileName: (format) => `index.${format}.js`
    },
    sourcemap: true,
  },
  test: {
    environment: 'happy-dom'
  }
})