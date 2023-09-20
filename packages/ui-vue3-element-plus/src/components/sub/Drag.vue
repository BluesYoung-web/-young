<!--
 * @Author: zhangyang
 * @Date: 2023-09-20 16:04:54
 * @LastEditTime: 2023-09-20 18:42:28
 * @Description: 
-->
<script lang="ts" setup>
import { onMounted } from 'vue';
import type { TableHeadItemPro } from '..';
import { ElSwitch } from 'element-plus';
import Sortable from 'sortablejs';
import type { SortableEvent } from 'sortablejs';
import { deepClone } from '@bluesyoung/utils';

const props = defineProps<{
  list: TableHeadItemPro[];
}>();

const emit = defineEmits<{
  (e: 'drag-end', list: TableHeadItemPro[]): void;
  (e: 'change', t: TableHeadItemPro, check: boolean): void;
}>();

function handleChangeCheck(item: TableHeadItemPro) {
  emit('change', item, !item.check);
}

onMounted(() => {
  const el = document.querySelector('.young-drap-list') as HTMLDivElement;

  new Sortable(el, {
    animation: 150,
    onEnd: ({ oldIndex, newIndex }: SortableEvent) => {
      if (oldIndex === newIndex) {
        return;
      }
      const data = props.list;
      const row = deepClone(data[oldIndex]);
      data.splice(oldIndex, 1);
      data.splice(newIndex, 0, row);
      emit('drag-end', data);
    },
  });
});
</script>

<template>
  <div class='young-drap-list'>
    <div v-for="(item, index) in list" :key="item.label" class='young-drag-list-item' :class="{ active: item.check }">
      <div class='draggable' title='拖动可排序'>
        <svg class='icon' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='6483' width='16'
          height='16'>
          <path
            d='M867.995 459.647h-711.99c-27.921 0-52.353 24.434-52.353 52.353s24.434 52.353 52.353 52.353h711.99c27.921 0 52.353-24.434 52.353-52.353s-24.434-52.353-52.353-52.353z'
            p-id='6484'></path>
          <path
            d='M867.995 763.291h-711.99c-27.921 0-52.353 24.434-52.353 52.353s24.434 52.353 52.353 52.353h711.99c27.921 0 52.353-24.434 52.353-52.353s-24.434-52.353-52.353-52.353z'
            p-id='6485'></path>
          <path
            d='M156.005 260.709h711.99c27.921 0 52.353-24.434 52.353-52.353s-24.434-52.353-52.353-52.353h-711.99c-27.921 0-52.353 24.434-52.353 52.353s24.434 52.353 52.353 52.353z'
            p-id='6486'></path>
        </svg>
      </div>

      <div class='label' @click.stop="handleChangeCheck(item)" :title="item.label"
        style="display: flex; justify-content: space-between;" :draggable="false">
        <span>{{ item.label }}</span>
        <ElSwitch :model-value="item.check" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.young-drag-list {
  list-style: none;
}

.young-drag-list-item {
  cursor: move;
  border-radius: 4px;
  color: #333;
  height: 36px;
  line-height: 36px;
  text-align: center;
  display: flex;
  align-items: center;
}

.young-drag-list-item:hover {
  background: #eee;
}

.young-drag-list-item.active {
  color: #409eff !important;
}

.young-drag-list-item .label {
  text-align: left;
  cursor: pointer;
  flex: 1;
  padding: 0 12px 0 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  /* 显示省略号 */
}

.young-drag-list-item .draggable {
  text-align: center;
  display: flex;
  align-items: center;
  padding: 0 12px;
  height: 100%;
}
</style>