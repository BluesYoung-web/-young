/*
 * @Author: zhangyang
 * @Date: 2022-10-19 10:48:36
 * @LastEditTime: 2023-03-25 20:22:44
 * @Description:
 */
/// <reference types="vite/client" />
/// <reference types="vitest" />
import { resolve } from 'path';
import { defineConfig } from 'vite';
import vueJsx from '@vitejs/plugin-vue-jsx';
export default defineConfig({
  plugins: [vueJsx()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src/'),
    },
  },
  build: {
    lib:{
      entry: [
        resolve(__dirname, './src/index.ts'),
        resolve(__dirname, './src/resolver.ts'),
      ],
      formats: ['es', 'cjs'],
      fileName: (format) => `[name].${format}.js`,
    },
    sourcemap: true,
    rollupOptions: {
      external: [
        'vue',
        '@vueuse/core',
        'element-plus',
        '@bluesyoung/utils',
        '@vue/shared',
        'sortablejs',
      ],
    },
  },
  test: {
    environment: 'happy-dom',
  },
});
