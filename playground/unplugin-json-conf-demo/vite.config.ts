/*
 * @Author: zhangyang
 * @Date: 2022-05-27 09:11:32
 * @LastEditTime: 2022-05-27 09:57:42
 * @Description: 
 */
import { ConfigEnv, defineConfig, loadEnv, UserConfigExport } from 'vite'
import vue from '@vitejs/plugin-vue'
import JsonConf from '@bluesyoung/unplugin-json-conf/vite';

export default ({ command, mode }: ConfigEnv): UserConfigExport => {
  const root = process.cwd();
  const viteEnv = loadEnv(mode, root);
  console.log("🚀 ~ file: vite.config.ts ~ line 13 ~ viteEnv", viteEnv)
  return defineConfig({
    plugins: [
      vue(),
      JsonConf({
        json_path: viteEnv.VITE_JSON_CONF_URL
      })
    ],
  });
}
