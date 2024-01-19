<!--
 * @Author: zhangyang
 * @Date: 2023-09-20 15:38:19
 * @LastEditTime: 2024-01-19 10:14:25
 * @Description: 
-->
<script lang="ts" setup>
import { useMediaQuery } from '@vueuse/core';
import { ElButton, ElDialog, ElDrawer, ElMessageBox } from 'element-plus';
import { Teleport, computed, ref, watch } from 'vue';

interface Props {
  modelValue?: boolean;
  realTitle?: string;
  width?: number | string;
  sureText?: string;
  cancelText?: string;
  showSure?: boolean;
  showCancel?: boolean;
  isAdd?: boolean;
  isEdit?: boolean;
  isMore?: boolean;
  sureFn?: Function;
  /**
   * 对比 form 表单
   */
  diffForm?: any;
  as?: 'drawer' | 'dialog';
  /**
   * 点击遮罩关闭
   * @default true
   */
  closeOnClickModal?: boolean;
  /**
   * esc 键关闭
   * @default false
   */
  closeOnPressEscape?: boolean;

  /**
   * 关闭提示
   * @default '数据未保存，关闭将丢失数据，确认关闭？'
   */
  tip?: string
  /**
   * 关闭提示的标题
   * @default '提示'
   */
  tipTitle?: string
  /**
   * 操作描述词
   * @default ''
   */
  desc?: string
}

const props = withDefaults(defineProps<Props>(), {
  width: '50%',
  sureText: '确定',
  cancelText: '取消',
  showSure: true,
  showCancel: true,
  diffForm: null,
  as: 'drawer',
  closeOnClickModal: true,
  closeOnPressEscape: false,
  tip: '数据未保存，关闭将丢失数据，确认关闭？',
  tipTitle: '提示',
  desc: ''
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'sure'): void;
  (e: 'clear'): void;
}>();

const formHash_before = ref('');
const title = computed(() => {
  let str = '新建' + props.desc
  if (props.isEdit)
    str = '编辑' + props.desc

  if (props.isMore)
    str = props.desc + '详情'

  return str
});

const showDialog = computed({
  get: () => props.isAdd || props.isMore || props.isEdit,
  set: v => null,
})

if (props.diffForm) {
  watch(
    () => showDialog.value,
    (v, o) => {
      if (v && !o)
        formHash_before.value = JSON.stringify(props.diffForm)
    },
  );

  watch(
    () => props.modelValue,
    (v, o) => {
      if (v && !o)
        formHash_before.value = JSON.stringify(props.diffForm)
    },
  )
}

const sure = async () => {
  if (props.sureFn) {
    const res = await props.sureFn()
    if (res === false)
      return
  }
  if (props.isMore) {
    emit('clear')
    return
  }
  emit('update:modelValue', false)
  emit('sure')
}

const beforeClose = () => {
  const formHash_after = JSON.stringify(props.diffForm)
  if (props.isMore || !props.showCancel) {
    emit('clear')
    emit('update:modelValue', false)
    return
  }
  if (props.diffForm && formHash_before.value === formHash_after) {
    emit('clear')
    emit('update:modelValue', false)
  }
  else {
    ElMessageBox.confirm(props.tip, props.tipTitle, {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
    })
      .then(() => {
        emit('update:modelValue', false)
        emit('clear')
      })
      .catch(() => null)
  }
}

const ltLg = useMediaQuery('(max-width: 1023.9px)')
</script>

<template>
  <Teleport to="body">
    <ElDialog v-if="as === 'dialog'" v-bind="$attrs" :model-value="modelValue || showDialog" :title="realTitle || title"
      :width="ltLg ? '96%' : width" :close-on-click-modal="closeOnClickModal" :close-on-press-escape="closeOnPressEscape"
      :before-close="beforeClose">
      <template #header>
        <slot name="header" />
      </template>
      <template #default>
        <slot />
        <slot name="body" />
      </template>
      <template #footer>
        <slot name="footer" />
        <slot name="button" />
        <ElButton v-if="showCancel" @click="beforeClose">{{ cancelText }}</ElButton>
        <slot name="step1" />
        <slot name="step2" />
        <ElButton v-if="showSure" type="primary" @click="sure">{{ sureText }}</ElButton>
      </template>
    </ElDialog>
    <ElDrawer v-else v-bind="$attrs" :model-value="modelValue || showDialog" :title="realTitle || title"
      :size="ltLg ? '96%' : width" :close-on-click-modal="closeOnClickModal" :close-on-press-escape="closeOnPressEscape"
      :before-close="beforeClose">
      <template #header>
        <slot name="header" />
      </template>
      <template #default>
        <slot />
        <slot name="body" />
      </template>
      <template #footer>
        <slot name="footer" />
        <slot name="button" />
        <ElButton v-if="showCancel" @click="beforeClose">{{ cancelText }}</ElButton>
        <slot name="step1" />
        <slot name="step2" />
        <ElButton v-if="showSure" type="primary" @click="sure">{{ sureText }}</ElButton>
      </template>
    </ElDrawer>
  </Teleport>
</template>