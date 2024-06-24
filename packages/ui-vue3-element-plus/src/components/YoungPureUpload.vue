<!--
 * @Author: zhangyang
 * @Date: 2024-06-19 09:33:24
 * @LastEditTime: 2024-06-24 15:14:10
 * @Description: 基于 uppy 封装的上传组件，无二次编辑的回显功能
 * @LastEditors: zhangyang
 * Copyright (c) 2024 to current by BluesYoung-web, All Rights Reserved. 
-->

<script lang="ts" setup>
import Uppy, { type UppyOptions } from '@uppy/core';
import DashboardPlugin, { type DashboardOptions } from '@uppy/dashboard';
import XHRPlugin, { type XHRUploadOptions } from '@uppy/xhr-upload';
import ImageEditorPlugin, { type ImageEditorOptions } from '@uppy/image-editor';
import CompressorPlugin, { type CompressorOptions } from '@uppy/compressor';
import zhCn from '@uppy/locales/lib/zh_CN';
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { getThumbnails } from 'video-metadata-thumbnails';

import '@uppy/core/dist/style.min.css';
import '@uppy/dashboard/dist/style.min.css';
import '@uppy/image-editor/dist/style.min.css';
import { useEventListener } from '@vueuse/core';
import { useImagePreview, useVideoPreview } from '..';

const dashboardId = 'vue:dashboard'
const xhrId = 'vue:xhr'
const imageEditorId = 'vue:image-editor'
const compressorId = 'vue:compressor'
const dashboardRef = ref()

interface Props {
  /**
   * 自动上传
   * @default false
   */
  autoProceed?: boolean;
  /**
   * 文件个数
   */
  limit?: number;
  /**
   * 单文件大小限制 M
   */
  maxFileSize?: number;
  /**
   * 全部文件总大小限制 M
   */
  maxTotalFileSize?: number;
  /**
   * 允许上传的文件类型
   */
  allowedFileTypes?: string[];

  /**
   * 是否压缩上传的图片
   * @default true
   */
  compressImage?: boolean;

  /**
   * 透传配置，会解构覆盖
   * @url https://uppy.io/docs/uppy/#options
   */
  extraConfig?: UppyOptions;

  /**
   * 透传给 dashboard 插件的配置
   * @url https://uppy.io/docs/dashboard/#options
   */
  dashboardConfig?: DashboardOptions;

  /**
   * 透传给 image-editor 插件的配置
   * @url https://uppy.io/docs/image-editor/#options
   */
  imageEditorConfig?: ImageEditorOptions;

  /**
   * 透传给 xhr 插件的配置
   * @url https://uppy.io/docs/xhr-upload/#options
   */
  xhrConfig?: XHRUploadOptions;

  /**
   * 透传给 compressor 插件的配置
   * @url https://uppy.io/docs/compressor/#options
   */
  compressorConfig?: CompressorOptions;
}

type Uploaded = {
  name: string
  uploadURL: string
}[]

const uploaded = ref<Uploaded>([])

const props = withDefaults(defineProps<Props>(), {
  autoProceed: false,
  compressImage: true
})

const emits = defineEmits<{
  /**
   * 本次操作上传的文件
   */
  (e: 'finish', arr: Uploaded): void
}>()

const ONE_MB = 1024 * 1024

const uppy = new Uppy({
  debug: true,
  autoProceed: props.autoProceed,
  locale: {
    strings: {
      ...zhCn.strings,
      uploadXNewFiles: '新增了 %{smart_count} 个文件',
    }
  },
  restrictions: {
    maxNumberOfFiles: props.limit,
    minFileSize: ONE_MB * props.maxTotalFileSize,
    maxFileSize: ONE_MB * props.maxFileSize,
    allowedFileTypes: props.allowedFileTypes
  },

  ...props.extraConfig
})

// video 抽帧，生成封面图
uppy.on('file-added', (file) => {
  if (/video\//i.test(file.type!)) {
    getThumbnails(file.data, {
      start: 0,
      end: 0,
    }).then((image) => {
      const [shot] = image
      shot.blob && uppy.setFileState(file.id, { preview: URL.createObjectURL(shot.blob) })
    }).catch(console.warn)
  }
})

// 单次上传完成
uppy.on('complete', ({ successful }) => {
  successful.forEach((item) => {
    uploaded.value.push({
      name: item.name,
      uploadURL: item.uploadURL
    })
  })
})

uppy.on('dashboard:modal-closed', () => {
  emits('finish', uploaded.value)

  // @ts-ignore
  uppy.clearUploadedFiles()
  uploaded.value = [];
})

function installPlugin() {
  uppy.use(DashboardPlugin, {
    id: dashboardId,
    inline: false,
    target: dashboardRef.value,
    proudlyDisplayPoweredByUppy: false,
    // 选择图片立即打开编辑器
    // autoOpen: 'imageEditor',
    ...props.dashboardConfig,
    doneButtonHandler: () => {
      (uppy.getPlugin(dashboardId) as DashboardPlugin).closeModal()
    }
  })

  uppy.use(ImageEditorPlugin, {
    id: imageEditorId,
    locale: {
      strings: {
        revert: '重置',
        rotate: '旋转',
        zoomIn: '放大',
        zoomOut: '缩小',
        flipHorizontal: '镜像',
        aspectRatioSquare: '正方形',
        aspectRatioLandscape: '横向 (16:9)',
        aspectRatioPortrait: '纵向 (9:16)',
      }
    },
    ...props.imageEditorConfig
  })

  props.compressImage && uppy.use(CompressorPlugin, {
    id: compressorId,
    locale: {
      strings: {
        compressingImages: '图片压缩中...',
        compressedX: '压缩图片节省了 %{size} 的大小',
      },
    },
    ...props.compressorConfig
  })

  uppy.use(XHRPlugin, {
    id: xhrId,
    ...props.xhrConfig
  })
}

function uninstallPlugin() {
  uppy.removePlugin(uppy.getPlugin(dashboardId))
  uppy.removePlugin(uppy.getPlugin(imageEditorId))
  uppy.removePlugin(uppy.getPlugin(xhrId))
  uppy.removePlugin(uppy.getPlugin(compressorId))
}

onMounted(() => {
  installPlugin()

  const dashboard = document.querySelector('.uppy-Dashboard-innerWrap')

  // 事件委派
  useEventListener(dashboard, 'click', (e) => {
    const target = e.target as HTMLElement
    const { className } = target

    const isPreviewList = target.closest('.uppy-Dashboard-files')
    if (!isPreviewList)
      return

    if (className === 'uppy-Dashboard-Item-previewImg' || className === 'uppy-Dashboard-Item-previewInnerWrap') {
      const id = target.closest('.uppy-Dashboard-Item')?.id?.replace?.('uppy_', '')
      const file = uppy.getFile(id!)

      if (/video\//i.test(file.type!)) {
        useVideoPreview(URL.createObjectURL(file.data))
      }
      else if (/image\//i.test(file.type!)) {
        const src = URL.createObjectURL(file.data)
        useImagePreview({
          srcList: [src],
        })
      }
      else {
        uppy.info('暂时不支持预览该类型的文件', 'warning')
      }
    }
  })
})

onBeforeUnmount(() => {
  uninstallPlugin()
})

defineExpose({
  uppy
})
</script>

<template>
  <div ref="dashboardRef" />
</template>

<style lang="scss">
.uppy-Dashboard-files {

  .uppy-Dashboard-Item-previewImg,
  .uppy-Dashboard-Item-previewInnerWrap {
    cursor: pointer;

    .uppy-Dashboard-Item-previewIconWrap {
      pointer-events: none;
    }
  }
}

.uppy-Dashboard-progressindicators {
  .uppy-StatusBar {
    .uppy-StatusBar-actions {
      justify-content: end;
    }
  }
}
</style>