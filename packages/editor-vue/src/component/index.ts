/*
 * @Author: zhangyang
 * @Date: 2022-05-29 14:36:12
 * @LastEditTime: 2022-05-29 15:25:12
 * @Description: 
 */
import type { App } from 'vue';
import Editor from './Editor.vue';

Editor.install = (app: App) => {
  app.component(Editor.name, Editor);
};

export default Editor;
export * from './types';