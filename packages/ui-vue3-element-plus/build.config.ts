/*
 * @Author: zhangyang
 * @Date: 2023-09-19 15:24:26
 * @LastEditTime: 2024-06-26 09:12:55
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
    '@uppy/compressor',
    '@uppy/core',
    '@uppy/dashboard',
    '@uppy/image-editor',
    '@uppy/xhr-upload',
    '@uppy/locales',
  ],
  declaration: true
})