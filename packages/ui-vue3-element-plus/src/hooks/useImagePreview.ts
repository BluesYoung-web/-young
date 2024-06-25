/*
 * @Author: zhangyang
 * @Date: 2023-03-17 21:45:54
 * @LastEditTime: 2024-06-25 20:19:01
 * @Description:
 */
import { YoungImageViewer, type YoungImageViewerConf } from '..';
import { createVNode, render, h } from 'vue';
import { ElOverlay } from 'element-plus';
import { getThumbnails } from 'video-metadata-thumbnails';
import { isString, isiOS } from '@bluesyoung/utils';
import { isMacOS } from '@bluesyoung/utils';

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

/**
 * 获取视频封面
 * @param v 视频地址 or File
 * @param args 透传
 * @returns Promise<{
    blob: Blob | null;
    currentTime: number;
}[]>
 */
export async function getVideoCover(v: string | Blob, args: Parameters<typeof getThumbnails>['1']) {
  return new Promise<{
    blob: Blob | null;
    currentTime: number;
  }[]>((resolve) => {
      if (!(isiOS() || isMacOS()) && !isString(v)) {
        getThumbnails(v, args).then(resolve)
      } else {
        const video = document.createElement('video')
        video.src = isString(v) ? v as string : URL.createObjectURL(v as Blob)
        
        video.src = 'https://file.kiloseeds.com/dev_qianzi/2024/1adae90402d7415aa1a9e46dba78f865/1c7584752b01451ca2bdff123c81883c/6ae3e7e0c21e4215a9cff549b1744cc0.mp4'
        
        video.crossOrigin = 'anonymous'
        video.currentTime = 1

        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')

        video.oncanplay = () => {
          canvas.width = video.clientWidth || 320
          canvas.height = video.clientHeight || 240

          ctx?.drawImage(video, 0, 0, canvas.width, canvas.height)

          canvas.toBlob((b) => {
            resolve([{ blob: b, currentTime: 1 }])

            URL.revokeObjectURL(video.src)
            video.remove()
            canvas.remove()
          })
        }
      }
  })
}