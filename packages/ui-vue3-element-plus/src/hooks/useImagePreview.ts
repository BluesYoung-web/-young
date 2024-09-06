/*
 * @Author: zhangyang
 * @Date: 2023-03-17 21:45:54
 * @LastEditTime: 2024-09-06 16:01:02
 * @Description:
 */
import { YoungImageViewer, type YoungImageViewerConf } from '..';
import { createVNode, render, h } from 'vue';
import { ElOverlay } from 'element-plus';
import { isString } from '@bluesyoung/utils';

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
        boxSizing: 'content-box'
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
        background: 'rgba(0,0,0)',
        boxSizing: 'content-box'
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
 * @param seek 取第几秒的
 * @returns Promise<string>
 */
export async function getVideoCover(v: string | Blob, seek = 0.1) {
  return new Promise<string>((resolve) => {
    const video = document.createElement('video')
    video.src = isString(v) ? v as string : URL.createObjectURL(v as Blob)

    video.crossOrigin = 'anonymous'
    video.currentTime = seek

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    video.oncanplay = () => {
      const videoWidth = video.videoWidth
      const videoHeight = video.videoHeight

      canvas.width = videoWidth
      canvas.height = videoHeight

      ctx?.drawImage(video, 0, 0, videoWidth, videoHeight)

      try {
        resolve(canvas.toDataURL('image/webp', 0.75))
      } catch (error) {
        console.log("🚀 ~ getVideoCover ~ error:", error)
      } finally {
        URL.revokeObjectURL(video.src)
        video.remove()
        canvas.remove()
      }
    }
  })
}

/**
 * base64 转 file
 * @param dataurl base64
 * @param filename 文件名
 * @returns File
 */
export function dataURLtoFile(dataurl: string, filename: string) {
  const arr = dataurl.split(',')
  const mime = arr[0].match(/:(.*?);/)![1]

  const bstr = window.atob(arr[arr.length - 1])

  let n = bstr.length
  const u8arr = new Uint8Array(n)

  while (n--)
    u8arr[n] = bstr.charCodeAt(n)

  return new File([u8arr], filename, { type: mime })
}
