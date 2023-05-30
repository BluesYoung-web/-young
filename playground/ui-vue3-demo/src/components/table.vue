<template>
  <div class="relative" style="position: relative;">
    <ElTable ref="tableRef" header-cell-class-name="nowarp" :data="tableData_1" style="width: 100%" :height="tableHeight"
      border @header-dragend="handleHeaderDragend">
      <ElTableColumn v-if="selectable" type='selection' width='55' />
      <ElTableColumn v-for="item in filterHeader" :prop="(item.prop as string)" :label="item.label" :width="item.width">
        <template #header>
          <!-- <ElTooltip :content="item.label" placement="top-start"> -->
          <span class="nowarp" :title="item.label">
            {{ item.label }}
          </span>
          <!-- </ElTooltip> -->
        </template>
        <template #default="{ row }">
          <!-- <ElTooltip :content="row[item.prop]" placement="top-start"> -->
          <span class="nowarp" :title="item.label">{{ row[item.prop] }}</span>
          <!-- </ElTooltip> -->
        </template>
      </ElTableColumn>
    </ElTable>
    <CustomHead :height="settingHeight + 'px'" :table-head="initData" @change="handleChange" @drag-end="handleDragend">
    </CustomHead>
  </div>
</template>

<script lang="ts" setup>
import { computed, nextTick, onActivated, ref, watchEffect } from 'vue';
import {
  ElTable,
  ElTableColumn,
  ElTooltip,
} from 'element-plus';
import type { TableHeadItem, TableDataItem } from '@bluesyoung/ui-vue3-element-plus';
import CustomHead from "./CustomHead.vue";
type Props = {
  /**
   * 表格高度
   */
  tableHeight?: number;
  /**
   * 表格数据
   */
  tableData: TableDataItem[];
  /**
   * 表头数据
   */
  tableHead: TableHeadItem[];
  /**
   * 选择框
   */
  selectable?: boolean;
  rowDraggable?: boolean;
  /**
   * 开启自定义表头
   */
  enableCustomHead?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  tableHeight: 600,
  selectable: false,
  rowDraggable: false,
  enableCustomHead: false
})
/**
  * 引用表格元素
  */
const tableRef = ref<any>(null);
// 修复表格切换时，显示出现错位的 bug
onActivated(() => {
  nextTick(() => {
    tableRef.value.doLayout();
  });
});
const tableData_1 = ref<TableDataItem[]>([]);
const tableHead_1 = ref<TableHeadItem[]>([]);
const tableHeadCheck = ref<string[]>([]);
const settingHeight = ref(0)
watchEffect(() => {
  tableData_1.value = props.tableData
  tableHead_1.value = props.tableHead
  tableHeadCheck.value = props.tableHead.map((item) => item.prop.toString());
  nextTick(() => {
    handleHeaderDragend()
  })
})

/**
 * 所有表头初始化 设置check属性 true：被勾选 false:没被勾选
 */
const initData = computed(() => {
  return tableHead_1.value.map(t => {
    if (tableHeadCheck.value.includes(t.prop as string)) {
      t.check = true
      return t
    } else {
      t.check = false
      return t
    }
  })
})

/**
 * 被勾选的表头
 */
const filterHeader = computed(() => {
  return initData.value.filter(d => d.check)
})

/**
 * 获取表头高度 给设置按钮设置高度
 */
const getHeaderHeight = () => {
  const tr = document.querySelector('.el-table__header')
  // @ts-ignore
  if (tr.offsetHeight === 0) {
    setTimeout(() => {
      getHeaderHeight()
    }, 100);
  } else {
    // @ts-ignore
    settingHeight.value = tr.offsetHeight - 1
  }
}

/**
 * 拖动表头后重新获取表头高度
 */
const handleHeaderDragend = () => {
  nextTick(() => {
    getHeaderHeight()
  })
}

const handleChange = (item: TableHeadItem, check: boolean) => {
  const index = tableHeadCheck.value.findIndex(e => e === item.prop)
  if (!check && index != -1) {
    tableHeadCheck.value.splice(index, 1)
  } else {
    tableHeadCheck.value.push(item.prop as string)
  }
}

const handleDragend = (list: TableHeadItem[]) => {
  console.log(list);
  tableHead_1.value = list
}
</script>

<style scoped>
.nowarp {
  word-break: normal;
}
</style>