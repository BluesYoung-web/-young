<!--
 * @Author: zhangyang
 * @Date: 2023-03-19 14:13:46
 * @LastEditTime: 2024-06-12 16:10:52
 * @Description:
-->

<script setup lang="ts">
import { ref, h, watchEffect } from 'vue';
import 'element-plus/dist/index.css';
import { ElButton } from 'element-plus'
import { YoungSearchForm, type YoungSearchScheme, YoungTimeRange, YoungTable, YoungGaodeAreaSelect } from '../../../packages/ui-vue3-element-plus/src';
import type { TableHeadItem, TableDataItem } from '@bluesyoung/ui-vue3-element-plus';

import { YoungTab, YoungCmdPopup, YoungContextMenu, YoungSlideVerify } from '../../../packages/ui-vue3/src'
import { YoungTablePro, YoungPagination, YoungUpload } from '../../../packages/ui-vue3-element-plus/src';
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

tableHead.forEach((item, index) => {
  if (index % 2 === 0) {
    item.render = (row, index) => h('div', { style: 'color: red; font-weight: bold;' }, index)
  }
})


const imgToUpload = ref<string[]>(['https://avatars.githubusercontent.com/u/55608642?v=4']);
const uploadNames = ref<string[]>(['零零零点.txt']);
const upload = async (f: File) => {
  console.log("🚀 ~ file: App.vue:116 ~ upload ~ f:", f);
  return 'https://avatars.githubusercontent.com/u/55608642?v=4';
}

watchEffect(() => {
  console.log(imgToUpload.value);
  console.log(uploadNames.value);
})

const showContextMenu = ref(false)

const address = ref([
  "420902",
  "420981",
  "420923",
  "420984",
  "420982",
  "420921",
  "420922"
])
</script>

<template>
  <div style="width: 90vw; overflow: auto;">
    <!-- <YoungGaodeAreaSelect v-model="address" multiple sk="your amap key"
      secret="your amap secret" @change="log" /> -->
    <!-- <YoungTimeRange v-model:start="start" v-model:end="end" second />
    <YoungSearchForm v-model="query" :search-scheme="scheme" :on-search="() => log(query)">
      <template #btns>
        <ElButton>我是其他的按钮1</ElButton>
        <ElButton>我是其他的按钮2</ElButton>
      </template>
</YoungSearchForm>
<YoungRotateTip />-->

    <YoungTab :titles="['全部菜单', '门店菜单']" @contextmenu.prevent="showContextMenu = true">

      <template #index_0>
        111111
      </template>

      <template #index_1>
        2222222
      </template>
    </YoungTab>
    <YoungContextMenu v-model="showContextMenu" :menu-list="[
      {
        title: 'm1',
        handlerName: 'm1'
      },
      {
        title: 'm2',
        handlerName: 'm2'
      }
    ]" />
    <!-- <YoungTable :table-head="tableHead" :table-data="tableData" enable-custom-head /> -->

    <YoungCmdPopup>
      这是快捷面板
    </YoungCmdPopup>
    <YoungUpload v-model="imgToUpload" :upload-fn="upload" cropper :aspt="[16, 9]" />
    <YoungUpload v-model="imgToUpload" v-model:names="uploadNames" type="file" :upload-fn="upload" cropper
      :aspt="[16, 9]" />

    <YoungTablePro ref="YoungTableProRef" :table-head="tableHead" :table-data="tableData" />

    <YoungPagination :page="1" :limit="10" :total="100" />
  </div>
</template>
