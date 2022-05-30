/*
 * @Author: zhangyang
 * @Date: 2022-04-28 16:27:49
 * @LastEditTime: 2022-05-30 09:05:27
 * @Description: 
 */
/// <reference types="vite/client" />
/// <reference types="vitest" />
import { resolve } from 'path';
import { defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';
import VueSetupExtend from 'vite-plugin-vue-setup-extend';

export default defineConfig({
  plugins: [
    Vue(),
    // @ts-ignore
    VueSetupExtend()
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'YoungEditor',
      formats: [
        'es',
        'umd',
        'cjs'
      ],
      fileName: (format) => `index.${format}.js`
    },
    sourcemap: true,
    rollupOptions: {
      external: ['vue']
    }
  },
  test: {
    environment: 'happy-dom'
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
})