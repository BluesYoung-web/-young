<!--
 * @Author: zhangyang
 * @Date: 2023-03-19 14:13:46
 * @LastEditTime: 2023-07-31 10:29:29
 * @Description:
-->
<script setup lang="ts">
import { ref, h, watchEffect } from 'vue';
import 'element-plus/dist/index.css';
import { ElButton } from 'element-plus'
import { YoungSearchForm, type YoungSearchScheme, YoungTimeRange, YoungRotateTip, YoungTable } from '../../../packages/ui-vue3-element-plus/src';
import type { TableHeadItem, TableDataItem } from '@bluesyoung/ui-vue3-element-plus';

import { YoungTab } from '../../../packages/ui-vue3/src'
import { YoungTablePro, YoungPagination } from '../../../packages/ui-vue3-element-plus/src';
interface Query {
  name: string,
  age: number,
  op: string,
  op1?: string,
  op2?: string,
  startcreatetime?: undefined,
  endcreatetime?: undefined,

  custom1?: undefined;
  custom2?: undefined;
}

const query = ref<Query>({
  name: '',
  age: 18,
  op: '',
});

const scheme: YoungSearchScheme<Query> = {
  name: {
    type: 'input',
    tip: '名字',
    attrs: {
      placeholder: '请输入姓名'
    }
  },
  age: {
    type: 'number',
    tip: '年龄',
    attrs: {
      min: 18,
      max: 30
    },
  },
  custom1: {
    type: 'custom',
    tip: '自定义1',
    render: () => h(ElButton, { type: 'primary' }, { default: () => h('div', '自定义默认1') })
  },
  op: {
    type: 'select',
    tip: '操作',
    options: ['+', '-', '*', '/'].map((item) => ({ label: item, value: item })),
    attrs: {
      placeholder: '请选择',
      clearable: true
    }
  },
  op1: {
    type: 'select',
    tip: '操作',
    options: ['+', '-', '*', '/'].map((item) => ({ label: item, value: item })),
    attrs: {
      placeholder: '请选择',
      clearable: true
    }
  },
  op2: {
    type: 'select',
    tip: '操作',
    options: ['+', '-', '*', '/'].map((item) => ({ label: item, value: item })),
    attrs: {
      placeholder: '请选择',
      clearable: true,
      filterable: true
    }
  },
  startcreatetime: {
    type: 'datetimerange',
    tip: '创建时间',
    attrs: {
      second: true,
      shortcuts: true
    }
  },
  custom2: {
    type: 'custom',
    tip: '自定义2',
    render: () => h(ElButton, { type: 'success' }, { default: () => h('div', '自定义默认2') })
  }
}

const YoungTableProRef = ref<typeof YoungTablePro>()

const log = console.log.bind(null, 'xxxxxxxxxxxxxx: ');

const start = ref('00:00');
const end = ref('23:59');

watchEffect(() => {
  console.log(start.value, end.value);
});

const tableHead: TableHeadItem[] = new Array(20).fill(0).map((_, v) => ({ label: v.toString().repeat(10), prop: v.toString(), width: v === 19 ? '320' : undefined }));
const tableData: TableDataItem[] = new Array(20).fill(0).map((_, v) => ({ [v]: v }));

const tableHeadCheck = tableHead.map(t => t.prop as string)

</script>

<template>
  <div style="width: 90vw; overflow: auto;">
    <!-- <YoungTimeRange v-model:start="start" v-model:end="end" second />
    <YoungSearchForm v-model="query" :search-scheme="scheme" :on-search="() => log(query)">
      <template #btns>
        <ElButton>我是其他的按钮1</ElButton>
        <ElButton>我是其他的按钮2</ElButton>
      </template>
    </YoungSearchForm>
    <YoungRotateTip />

    <YoungTab :titles="['全部菜单', '门店菜单']">
      <template #index_0>
        111111
      </template>
      <template #index_1>
        2222222
      </template>
    </YoungTab> -->
    <!-- <YoungTable :table-head="tableHead" :table-data="tableData" enable-custom-head /> -->
    <YoungTablePro ref="YoungTableProRef" :table-head="tableHead" :table-head-check="tableHeadCheck"
      :table-data="tableData" />

    <YoungPagination :page="1" :limit="10" :total="100" />
  </div>
</template>
