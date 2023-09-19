/*
 * @Author: zhangyang
 * @Date: 2023-09-18 18:03:24
 * @LastEditTime: 2023-09-19 08:32:51
 * @Description: 
 */
import { execa } from 'execa'

const { stdout } = await execa('ls', [
  'dist'
]).pipeStdout(execa('grep', ['.d.ts']))

const dtsFiles = stdout.split('\n')

dtsFiles.forEach(async file => {
  const filePath = `dist/${file}`
  await execa('cp', [filePath, './'])
})
