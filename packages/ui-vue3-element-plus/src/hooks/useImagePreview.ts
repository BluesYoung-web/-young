/*
 * @Author: zhangyang
 * @Date: 2023-03-17 21:45:54
 * @LastEditTime: 2023-03-18 16:06:40
 * @Description:
 */
import { YoungImageViewer, type YoungImageViewerConf } from '..';
import { createVNode, render } from 'vue';

/**
 * 基于 ElImageViewer 的命令式图片预览
 * @param conf 
 * @param zIndex 
 */
export const useImagePreview = (conf: YoungImageViewerConf, zIndex = 9999) => {
  const appendTo = document.createElement('div');

  const vnode = createVNode(YoungImageViewer, {
    onDestroy: () => {
      document.body.removeChild(appendTo);
    },
    zIndex
  });
  render(vnode, appendTo);

  document.body.appendChild(appendTo);

  vnode.component.exposed?.show(conf);
};
