<!--
 * @Author: zhangyang
 * @Date: 2023-09-20 15:21:30
 * @LastEditTime: 2023-09-20 17:44:11
 * @Description: 
-->
<script lang="ts" setup>
import { computed, nextTick, onActivated, ref, watchEffect } from 'vue';
import { ElMessage, ElTable, ElTableColumn, ElMessageBox, ElTooltip } from 'element-plus';
import type { TableHeadItemPro, TableDataItem } from '..';
import CustomHead from './sub/CustomHead.vue';
import { deepClone, isFunction, randomId } from '@bluesyoung/utils';
import { useLocalStorage } from '@vueuse/core';
import { defu } from 'defu';

interface Props {
  tableData: TableDataItem[];
  tableHead: TableHeadItemPro[];
  /**
   * 默认勾选表头
   */
  tableHeadCheck?: string[];
  tableHeight?: number | string;
  selectable?: boolean;
  /**
   * 是否开启保存表头格式按钮
   */
  saveTableHead?: boolean;
  /**
   * 使用历史保存的表头 没有历史表头使用默认勾选表头
   */
  history?: boolean;
  /**
   * 存储历史 id, 仅一个页面存在多个表格实例时需要
   */
  historyId?: string;
}

const props = withDefaults(defineProps<Props>(), {
  tableHeadCheck: () => [],
  tableHeight: '100%',
  selectable: false,
  saveTableHead: true,
  history: true,
  historyId: ''
});

/**
 * 引用表格元素
 */
const tableRef = ref<InstanceType<typeof ElTable>>();
// 修复表格切换时，显示出现错位的 bug
onActivated(() => {
  nextTick(() => {
    tableRef.value!.doLayout();
  });
});

const tableData_1 = ref<TableDataItem[]>([]);
const tableHead_1 = ref<TableHeadItemPro[]>([]);
const tableHeadCheck_1 = ref<string[]>([]);
watchEffect(() => {
  tableData_1.value = props.tableData;
  nextTick(() => {
    initHead();
  });
});

const historyHead = useLocalStorage<{
  tableHead?: TableHeadItemPro[];
  tableHeadCheck?: string[];
}>(`table_pro_tableHead_${props.historyId || location.href.replace(location.origin, '')}`, {});

const initHead = () => {
  console.log('---------------young table pro init-----------------');
  console.log(`table_pro_tableHead_${props.historyId || location.href.replace(location.origin, '')}`);
  if (props.history) {
    const heads = historyHead.value?.tableHead ?? []

    heads.forEach((head, index) => {
      const ori = props.tableHead.find((v) => v.prop === head.prop)
      heads[index] = defu(ori, head)
    });

    tableHead_1.value = heads;

    tableHeadCheck_1.value = historyHead.value?.tableHeadCheck ?? [];

    if (tableHeadCheck_1.value.length === 0) {
      initDefaultData();
    }
  } else {
    initDefaultData();
  }
};
const initDefaultData = () => {
  tableHead_1.value = deepClone(props.tableHead);
  tableHeadCheck_1.value = props.tableHeadCheck?.length
    ? deepClone(props.tableHeadCheck)
    : props.tableHead.map((t) => t.prop as string);
};
/**
 * 所有表头初始化 设置check属性 true：被勾选 false:没被勾选
 */
const initData = computed(() => {
  return tableHead_1.value.map((t) => {
    t.check = tableHeadCheck_1.value.includes(t.prop as string);
    return t;
  });
});
/**
 * 被勾选的表头
 */
const filterHeader = computed(() => {
  return initData.value.filter((d) => !d.only_export && d.check);
});

const handleChange = (item: TableHeadItemPro, check: boolean) => {
  const index = tableHeadCheck_1.value.findIndex((e) => e === item.prop);
  if (!check && index != -1) {
    tableHeadCheck_1.value.splice(index, 1);
  } else {
    tableHeadCheck_1.value.push(item.prop as string);
  }
};

const handleDragend = (list: TableHeadItemPro[]) => {
  tableHead_1.value = list;
};

const saveTableHead = () => {
  historyHead.value = {
    tableHead: initData.value,
    tableHeadCheck: tableHeadCheck_1.value,
  };
  ElMessage.success('保存成功');
};
const resetTableHead = () => {
  ElMessageBox.confirm('确定重置表头吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    historyHead.value = {};
    ElMessage.success('重置成功');
    nextTick(() => {
      initHead();
    });
  });
};

const randomKey = randomId();

defineExpose({
  saveTableHead,
  resetTableHead
});
</script>

<template>
  <div>
    <CustomHead v-if="saveTableHead" :table-head="initData.filter((th) => !th.only_export)" @drag-end="handleDragend"
      @change="handleChange" @save="saveTableHead" @reset="resetTableHead" />

    <div style='position: relative;'>
      <ElTable v-bind="$attrs" ref="tableRef" header-cell-class-name='nowarp' :data="tableData_1" style="width: 100%"
        :height="tableHeight" border>
        <ElTableColumn v-if="selectable" type="selection" width="55" />
        <ElTableColumn v-for="(head, index) in filterHeader" key="item.prop.toString() + index + randomKey"
          :prop="head.prop as string" :label="head.label" :width="head.width || ''" :sortable="head.sortable || false"
          :fixed="head.fixed || false" :align="head.align || 'left'"
          :show-overflow-tooltip="head.showOverflowTooltip ?? true">
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
            <span v-else class='nowarp' :title="head.label">{{ head.label }}</span>
          </template>
          <template #default="scope">
            <component v-if="isFunction(head.render)" :is="head.render(scope.row, scope.$index)" />
            <span v-else>{{ scope.row[head.prop] }}</span>

          </template>
        </ElTableColumn>
        <slot name="switch" />
        <slot name="operate" />
      </ElTable>
    </div>
  </div>
</template>

<style scoped>
.nowarp {
  word-break: normal;
}
</style>