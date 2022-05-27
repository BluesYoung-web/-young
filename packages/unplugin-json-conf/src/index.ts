/*
 * @Author: zhangyang
 * @Date: 2022-05-27 09:02:35
 * @LastEditTime: 2022-05-27 10:03:42
 * @Description: 
 */
import { readFileSync } from 'fs';
import { createUnplugin } from 'unplugin';
import type { Options } from './types';

const virtualModuleId = 'virtual:json-conf';
const resolvedVirtualModuleId = '\0' + virtualModuleId;

export default createUnplugin<Options>(options => ({
  name: 'unplugin-json-conf',
  resolveId(id) {
    if (id === virtualModuleId) {
      return resolvedVirtualModuleId;
    }
  },
  load(id) {
    if (id === resolvedVirtualModuleId) {
      let json = '{}';
      if (options?.json_path) {
        try {
          json = readFileSync(options?.json_path, { encoding: 'utf-8' }).toString();
        } catch (e) {
          console.error(e);
        }
      }
      return `
      export default ${json};
      `;
    }
  }
}));
