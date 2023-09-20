<!--
 * @Author: zhangyang
 * @Date: 2023-09-20 14:33:13
 * @LastEditTime: 2023-09-20 16:48:13
 * @Description: 
-->
<script lang="ts" setup>
import { ElSelect, ElOption } from 'element-plus';
import { randomId } from '@bluesyoung/utils';
import type { SelectOptionItem } from '.';

interface Props {
  modelValue?: number | string | Array<number | string>;
  options: SelectOptionItem[];
}

defineProps<Props>();

const emit = defineEmits<{
  (e: 'update:modelValue', v: Props['modelValue']): void;
  (e: 'change', v: Props['modelValue']): void;
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