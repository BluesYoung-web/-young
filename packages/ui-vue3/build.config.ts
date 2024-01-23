/*
 * @Author: zhangyang
 * @Date: 2024-01-23 16:39:49
 * @LastEditTime: 2024-01-23 16:39:51
 * @Description: 
 */
import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  entries: [
    {
      builder: 'mkdist',
      input: './src/',
      outDir: './dist',
      format: 'esm'
    },
    {
      builder: 'mkdist',
      input: './src/',
      outDir: './dist',
      format: 'cjs'
    },
  ],
  externals: [
    'vue',
    '@vueuse/core',
  ],
  declaration: true
})