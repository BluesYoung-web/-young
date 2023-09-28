/*
 * @Author: zhangyang
 * @Date: 2023-09-19 15:24:26
 * @LastEditTime: 2023-09-28 12:24:07
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
    'element-plus',
    '@bluesyoung/utils',
    '@vue/shared',
  ],
  declaration: true
})