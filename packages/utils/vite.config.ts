/*
 * @Author: zhangyang
 * @Date: 2022-10-19 10:48:36
 * @LastEditTime: 2023-01-06 17:23:13
 * @Description:
 */
/// <reference types="vite/client" />
/// <reference types="vitest" />
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
  test: {
    environment: 'happy-dom',
  },
});
