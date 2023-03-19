/*
 * @Author: zhangyang
 * @Date: 2023-03-19 14:13:46
 * @LastEditTime: 2023-03-19 14:37:47
 * @Description:
 */
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import jsx from '@vitejs/plugin-vue-jsx';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [jsx(), vue()],
});
