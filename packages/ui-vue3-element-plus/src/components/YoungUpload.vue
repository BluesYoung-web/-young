<!--
 * @Author: zhangyang
 * @Date: 2023-09-20 14:09:31
 * @LastEditTime: 2023-09-21 08:51:33
 * @Description: 
-->
<script lang="ts" setup>
import { computed, ref, nextTick } from 'vue';
import { ElUpload, ElButton, ElMessage } from 'element-plus';
import type { UploadUserFile } from 'element-plus';
import { YoungDialog, useImagePreview } from '..';
import { randomId } from '@bluesyoung/utils';
import { VueCropper } from 'vue-cropper';
import 'vue-cropper/dist/index.css';
import { useMediaQuery } from '@vueuse/core';

interface Porps {
  modelValue: string[];
  limit?: number;
  type?: 'image' | 'file';
  accept?: string;
  uploadFn: (file: File) => Promise<string>;
  cropper?: boolean;
  aspt?: [number, number];
  outputType?: string;
  cropperAttrs?: Record<string, any>;
}

const props = withDefaults(defineProps<Porps>(), {
  limit: 1,
  type: 'image',
  accept: '',
  outputType: 'webp',
  cropper: false,
  aspt: () => [1, 1],
  cropperAttrs: () => ({})
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string[]): void;
  (e: 'change', value: string[]): void;
}>();

const files = computed<UploadUserFile[]>(() =>
  props.modelValue.map((url, index) => ({
    uid: index,
    name: url,
    status: 'success',
    url,
  })),
);

const exceed = () => ElMessage.error('超出数量限制！！！');
const del = (_: any, all: UploadUserFile[]) => {
  const arr = all.map((item) => item.url!);
  emit('update:modelValue', arr);
  emit('change', arr);
};

const upload = async (file: UploadUserFile) => {
  if (file) {
    if (props.type === 'image' && props.cropper) {
      showClipPopup.value = true;
      await nextTick();
      coverFile.value = URL.createObjectURL(file.raw as Blob);
      cropper.value.startCrop();
    } else {
      const url = await props.uploadFn(file.raw as unknown as File);
      const arr = [
        ...files.value.filter((item) => item.status === 'success').map((item) => item.url!),
        url,
      ];
      emit('update:modelValue', arr);
      emit('change', arr);
    }
  }
};

const preView = (url: string) => {
  const index = props.modelValue.indexOf(url);
  useImagePreview({
    srcList: props.modelValue,
    index: index === -1 ? 0 : index,
  });
};

const limitStyle = computed(() =>
  props.modelValue.length < props.limit ? 'inline-flex' : 'none',
);

const id = 'young-upload-' + randomId();

const cropper = ref();
const coverFile = ref<string>();

const showClipPopup = ref(false);

const sureClip = () => {
  cropper.value.getCropBlob(async (blob: Blob) => {
    const url = await props.uploadFn(blob as File);
    const arr = [
      ...files.value.filter((item) => item.status === 'success').map((item) => item.url!),
      url,
    ];
    emit('update:modelValue', arr);
    emit('change', arr);
    coverFile.value = '';
  });
  showClipPopup.value = false;
};

const cancelClip = () => {
  coverFile.value = '';
  showClipPopup.value = false;
  const arr = [
    ...files.value.filter((item) => item.status === 'success').map((item) => item.url!),
  ];
  emit('update:modelValue', arr);
  emit('change', arr);
};

const ltLg = useMediaQuery('(max-width: 1023.9px)');
</script>

<template>
  <ElUpload v-bind="$attrs" :accept="accept ? accept : type === 'image' ? 'image/*' : '*'" :limit="limit"
    :list-type="type === 'image' ? 'picture-card' : undefined" :multiple="limit > 1" :file-list="files"
    :auto-upload="false" style="max-width: 500px;" @exceed="exceed" @change="upload" @remove="del"
    @preview="({ url }) => type === 'image' && preView(url!)">
    <div>
      <div v-if="modelValue.length < limit && type === 'image'" style="font-size: 1.875rem; line-height: 2.25rem;">
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
          <path fill="currentColor"
            d="M18 12.998h-5v5a1 1 0 0 1-2 0v-5H6a1 1 0 0 1 0-2h5v-5a1 1 0 0 1 2 0v5h5a1 1 0 0 1 0 2z" />
        </svg>
      </div>
      <div v-else-if="modelValue.length < limit" style="margin-right: 0.5rem;">
        <ElButton type="primary">上传文件</ElButton>
      </div>
      <div v-else style="cursor: not-allowed; pointer-events: none;">
        已达数量上限
      </div>
      ({{ props.modelValue.length }} / {{ props.limit }})
    </div>
  </ElUpload>

  <YoungDialog v-model="showClipPopup" width="96%" real-title="图片裁剪" :show-cancel="false" :show-sure="false">
    <template #body>
      <div style="width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center;">
        <div :style="{
          width: ltLg ? '90vw' : '800px',
          height: ltLg ? '90vh' : '72vh',
        }">
          <VueCropper ref="cropper" auto-crop center-box :fixed-number="aspt" :img="coverFile" :output-type="outputType"
            fixed v-bind="cropperAttrs" />

        </div>

        <div
          style="display: flex; align-items: center; justify-content: space-between; height: 80px; width: 96%; padding: 0 20px;">
          <ElButton style="width: 48%;" @click="cancelClip">
            取消
          </ElButton>
          <ElButton style="width: 48%;" @click="sureClip" type="primary">
            裁剪
          </ElButton>
        </div>
      </div>
    </template>
  </YoungDialog>
</template>

<style lang="scss" scoped>
::deep(.el-upload--picture-card) {
  display: v-bind('limitStyle');
}
</style>