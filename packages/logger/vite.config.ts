/*
 * @Author: zhangyang
 * @Date: 2022-10-19 10:48:36
 * @LastEditTime: 2023-05-08 15:47:22
 * @Description:
 */
/// <reference types="vite/client" />
import { resolve } from 'path';
import { defineConfig } from 'vite';
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, './src/'),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, './src/index.ts'),
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format}.js`,
    },
    sourcemap: true,
  },
});
