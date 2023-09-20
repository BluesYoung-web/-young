<!--
 * @Author: zhangyang
 * @Date: 2023-09-20 14:53:43
 * @LastEditTime: 2023-09-20 16:23:14
 * @Description: 
-->
<script lang="ts" setup>
import { nextTick, onActivated, ref, watchEffect, onMounted } from 'vue';
import { deepClone, isFunction } from '@bluesyoung/utils';
import {
  ElTable,
  ElTableColumn,
  ElTooltip,
} from 'element-plus';
import { useAutoLoad } from '..';
import type { SortableEvent } from 'sortablejs';
import type { TableDataItem, TableHeadItem } from '.';

interface Props {
  tableData: TableDataItem[];
  tableHead: TableHeadItem[];
  tableHeight?: number | string;
  selectable?: boolean;
  rowDraggable?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  tableHeight: '100%',
  selectable: false,
  rowDraggable: false,
});

const emit = defineEmits<{
  (e: 'row-drag-change', v: Props['tableData']): void;
}>();

/**
 * 引用表格元素
 */
const tableRef = ref<InstanceType<typeof ElTable>>();
// 修复表格切换时，显示出现错位的 bug
onActivated(() => {
  nextTick(() => {
    tableRef.value.doLayout();
  });
});

const tableData_1 = ref<TableDataItem[]>([]);
const tableHead_1 = ref<TableHeadItem[]>([]);

const tableData_drag = ref<TableDataItem[]>([]);

watchEffect(() => {
  const t1 = props.tableData;
  const t2 = props.tableHead;
  const len = t1.length;
  nextTick(() => {
    // @ts-ignore
    tableHead_1.value = t2.filter((item) => !item.only_export);

    const step = 50;
    if (len <= step) {
      tableData_1.value = deepClone(t1);
      tableData_drag.value = deepClone(t1);
    } else {
      const { elArr, load } = useAutoLoad(tableData_1, ref(t1), step);
      const { elArr: elArr_drag, load: load_drag } = useAutoLoad(tableData_drag, ref(t1), step);

      let n = 0;
      tableData_1.value = t1.slice(n, step);
      tableData_drag.value = t1.slice(n, step);

      nextTick(() => {
        elArr.value = tableRef.value.$el.querySelector('tbody').children;
        load();
      });

      nextTick(() => {
        elArr_drag.value = tableRef.value.$el.querySelector('tbody').children;
        load_drag();
      });
    }
  });
});

onMounted(async () => {
  if (props.rowDraggable) {
    const { default: Sortable } = await import('sortablejs');
    if (props.rowDraggable) {
      const el = (tableRef.value.$el as HTMLDivElement).querySelector('tbody');
      el.style.cursor = 'move';
      new Sortable(el, {
        animation: 150,
        onEnd: ({ oldIndex, newIndex }: SortableEvent) => {
          if (oldIndex === newIndex) {
            return;
          }
          const data = tableData_drag.value;
          const row = deepClone(data[oldIndex]);
          data.splice(oldIndex, 1);
          data.splice(newIndex, 0, row);
          emit('row-drag-change', tableData_drag.value);
        },
      });
    }
  }
});
</script>

<template>
  <ElTable v-bind="$attrs" ref="tableRef" :data="tableData_1" style="width: 100%" :height="tableHeight">
    <ElTableColumn v-if="selectable" type="selection" width="55" />
    <ElTableColumn v-for="(head, index) in tableHead_1" :key="index" :prop="head.prop as string" :label="head.label"
      :width="head.width || ''" :sortable="head.sortable || false" :fixed="head.fixed || false"
      :align="head.align || 'left'" :show-overflow-tooltip="head.showOverflowTooltip ?? true">
      <template #header="scope">
        <div v-if="tableHead_1[index].tool_content" :style="{
          display: head.sortable ? 'inline-block' : 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }">
          <span class='nowarp' :title="head.label">{{ head.label }}</span>
          <ElTooltip placement="bottom">
            <template #content>
              <span>{{ tableHead_1[index].tool_content }}</span>
            </template>
            <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 256 256">
              <path fill="currentColor"
                d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24Zm0 168a12 12 0 1 1 12-12a12 12 0 0 1-12 12Zm8-48.72v.72a8 8 0 0 1-16 0v-8a8 8 0 0 1 8-8c13.23 0 24-9 24-20s-10.77-20-24-20s-24 9-24 20v4a8 8 0 0 1-16 0v-4c0-19.85 17.94-36 40-36s40 16.15 40 36c0 17.38-13.76 31.93-32 35.28Z">
              </path>
            </svg>
          </ElTooltip>
        </div>
        <span v-else>{{ scope.column.label }}</span>
      </template>
      <template #default="scope">
        <component v-if="isFunction(head.render)" :is="head.render(scope.row, scope.$index)" />
        <span v-else>{{ scope.row[head.prop] }}</span>
      </template>
    </ElTableColumn>
    <slot name="switch" />
    <slot name="operate" />
  </ElTable>
</template>