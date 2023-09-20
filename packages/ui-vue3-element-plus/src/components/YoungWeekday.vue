<!--
 * @Author: zhangyang
 * @Date: 2023-09-20 14:03:35
 * @LastEditTime: 2023-09-20 14:07:47
 * @Description: 
-->
<script lang="ts" setup>
import { ElCheckboxGroup, ElCheckbox } from 'element-plus';
import { randomId } from '@bluesyoung/utils';

const Weeks = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];

defineProps<{
  modelValue: number[];
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: number[]): void;
  (e: 'change', value: number[]): void;
}>();

const randomSeed = randomId();
const update = (v: number[]) => {
  emit('update:modelValue', v);
  emit('change', v);
};
</script>

<template>
  <ElCheckboxGroup v-bind="$attrs" :model-value="modelValue" @change="update">
    <ElCheckbox v-for="(w, i) in Weeks" :key="i + randomSeed" :label="i + 1">
      {{ w }}
    </ElCheckbox>
  </ElCheckboxGroup>
</template>