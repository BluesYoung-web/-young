<!--
 * @Author: zhangyang
 * @Date: 2023-09-20 14:40:02
 * @LastEditTime: 2023-11-22 14:45:31
 * @Description: 
-->
<script lang="ts" setup>
import { useMediaQuery } from '@vueuse/core';
import { ElPagination } from 'element-plus';

interface Props {
  total: number;
  page: number;
  limit: number;
  pageSizes?: number[];
  layout?: string;
  background?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  pageSizes: () => [10, 20, 30, 50],
  layout: 'total, sizes, prev, pager, next, jumper',
  background: true,
});

const emit = defineEmits<{
  (e: 'update:page', v: number): void;
  (e: 'update:limit', v: number): void;
  (e: 'page-change'): void;
  (e: 'change'): void;
}>();

const sizeChange = (val: number) => {
  emit('update:page', 1);
  emit('update:limit', val);
  emit('page-change');
  emit('change');
};
const pageChange = (val: number) => {
  emit('update:page', val);
  emit('page-change');
  emit('change');
};
const ltSm = useMediaQuery('(max-width: 639.9px)');
</script>

<template>
  <ElPagination v-if="total > 0" v-bind="$attrs"
    style="background: white; padding-top: 20px; display: flex; flex-wrap: wrap;" :background="background"
    :current-page="page" :page-size="limit" :layout="ltSm ? 'total, sizes, jumper' : props.layout" :page-sizes="pageSizes"
    :total="total" @update:current-page="pageChange" @update:page-size="sizeChange" />
</template>