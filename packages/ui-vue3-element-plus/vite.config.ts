/*
 * @Author: zhangyang
 * @Date: 2022-10-19 10:48:36
 * @LastEditTime: 2023-03-10 17:09:28
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
    lib: {
      entry: resolve(__dirname, './src/index.ts'),
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format}.js`,
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
