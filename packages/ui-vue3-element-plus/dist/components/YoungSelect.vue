<!--
 * @Author: zhangyang
 * @Date: 2023-09-20 14:33:13
 * @LastEditTime: 2024-05-31 09:55:16
 * @Description: 
-->

<script lang="ts" setup generic="T">
import { ElSelect, ElOption } from 'element-plus';
import { randomId } from '@bluesyoung/utils';
import type { SelectOptionItem } from '.';

interface Props {
  modelValue?: T | T[];
  options: SelectOptionItem<T>[];
}

defineProps<Props>();

type UpdateValueType = Required<Props>['modelValue'];

const emit = defineEmits<{
  (e: 'update:modelValue', v: UpdateValueType): void;
  (e: 'change', v: UpdateValueType): void;
}>();

const randomSeed = randomId();
</script>

<template>
  <ElSelect v-bind="$attrs" :model-value="modelValue" @update:model-value="(v) => {
    emit('update:modelValue', v);
    emit('change', v);
  }">
    <ElOption v-for="(op, index) in options" :key="index + randomSeed" v-bind="op" />
  </ElSelect>
</template>