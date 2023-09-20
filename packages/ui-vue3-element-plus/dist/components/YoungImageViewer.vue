<!--
 * @Author: zhangyang
 * @Date: 2023-09-20 14:47:20
 * @LastEditTime: 2023-09-20 14:51:37
 * @Description: 
-->
<script lang="ts" setup>
import { useEventListener } from '@vueuse/core';
import { ElImageViewer } from 'element-plus';
import { reactive, ref } from 'vue';
import { YoungImageViewerConf } from '.';

interface Props {
  onDestroy?: () => void;
  zIndex?: number;
}

const props = withDefaults(defineProps<Props>(), {
  onDestroy: () => console.log('为了节省性能，此时应该销毁dom'),
  zIndex: 9999,
});

const showViewer = ref(false);

const previewConfig = reactive({
  srcList: [],
  index: 0,
  zIndex: props.zIndex,
});

function wheelHandler(e: WheelEvent) {
  if (!e.ctrlKey) return;

  if (e.deltaY < 0) {
    e.preventDefault();
    return false;
  } else if (e.deltaY > 0) {
    e.preventDefault();
    return false;
  }
}

const stopWheelListener = useEventListener('wheel', wheelHandler, {
  passive: false,
});

let prevOverflow: string;

function show(conf: YoungImageViewerConf) {
  previewConfig.srcList = conf.srcList;
  previewConfig.index = conf.index ?? 0;

  prevOverflow = document.body.style.overflow;
  document.body.style.overflow = 'hidden';
  showViewer.value = true;
}

function close() {
  stopWheelListener();
  document.body.style.overflow = prevOverflow;
  showViewer.value = false;
  props.onDestroy();
}

defineExpose({
  show,
  close,
});
</script>

<template>
  <ElImageViewer v-if="showViewer" :z-index="zIndex" :initial-index="previewConfig.index"
    :url-list="previewConfig.srcList" hide-on-click-modal @close="close" />
</template>