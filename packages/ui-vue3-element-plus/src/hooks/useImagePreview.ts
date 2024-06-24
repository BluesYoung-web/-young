/*
 * @Author: zhangyang
 * @Date: 2023-03-17 21:45:54
 * @LastEditTime: 2024-06-24 15:30:40
 * @Description:
 */
import { YoungImageViewer, type YoungImageViewerConf } from '..';
import { createVNode, render, h } from 'vue';
import { ElOverlay } from 'element-plus';

/**
 * 基于 ElImageViewer 的命令式图片预览
 * @param conf 
 * @param zIndex 
 */
export function useImagePreview(conf: YoungImageViewerConf, zIndex = 9999) {
  const appendTo = document.createElement('div');

  const vnode = createVNode(YoungImageViewer, {
    onDestroy: () => {
      document.body.removeChild(appendTo);

      conf.srcList.forEach(src => {
        // perf: 释放 blob: 反正不会报错
        URL.revokeObjectURL(src)
      })
    },
    zIndex
  });
  render(vnode, appendTo);

  document.body.appendChild(appendTo);

  vnode.component.exposed?.show(conf);
};


/**
 * 基于 ElOverlay 的命令式视频预览
 */
export function useVideoPreview(src: string, zIndex = 9999) {
  const appendTo = document.createElement('div')

  const vnode = createVNode(ElOverlay, {
    zIndex,
    style: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '0 10rem',
    },
    onClick: () => {
      document.body.removeChild(appendTo)

      // perf: 释放 blob: 反正不会报错
      URL.revokeObjectURL(src)
    },
  }, {
    default: () => h('video', {
      style: {
        width: '100%',
        height: '100%',
        objectFit: 'contain',
        background: 'rgba(0,0,0)',
      },
      src,
      controls: true,
      autoplay: true,
    }),
  })

  render(vnode, appendTo)
  document.body.appendChild(appendTo)
}

/**
 * 基于 ElOverlay 的命令式音频预览
 */
export function useAudioPreview(src: string, zIndex = 9999) {
  const appendTo = document.createElement('div')

  const vnode = createVNode(ElOverlay, {
    zIndex,
    style: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '0 10rem',
    },
    onClick: () => {
      document.body.removeChild(appendTo)

      // perf: 释放 blob: 反正不会报错
      URL.revokeObjectURL(src)
    }
  }, {
    default: () => h('audio', {
      style: {
        width: '100%',
        // height: '100%',
        padding: '10rem',
        objectFit: 'contain',
        background: 'rgba(0,0,0)',
      },
      src,
      controls: true,
      autoplay: true,
    }),
  })

  render(vnode, appendTo)
  document.body.appendChild(appendTo)
}