/*
 * @Author: zhangyang
 * @Date: 2023-09-19 15:24:26
 * @LastEditTime: 2023-09-22 16:45:38
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
  ],
  externals: [
    'nuxt',
  ],
  declaration: true
})