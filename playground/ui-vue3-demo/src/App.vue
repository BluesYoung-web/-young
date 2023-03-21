<!--
 * @Author: zhangyang
 * @Date: 2023-03-19 14:13:46
 * @LastEditTime: 2023-03-21 16:42:41
 * @Description: 
-->
<script setup lang="ts">
import { ref, h } from 'vue';
import 'element-plus/dist/index.css';
import { ElButton } from 'element-plus'
import { YoungSearchForm, type YoungSearchScheme } from '../../../packages/ui-vue3-element-plus/src';
// import { YoungSearchForm, type YoungSearchScheme } from '@bluesyoung/ui-vue3-element-plus';

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
    tip: '创建时间'
  },
  custom2: {
    type: 'custom',
    tip: '自定义2',
    render: () => h(ElButton, { type: 'success' }, { default: () => h('div', '自定义默认2') })
  }
}

const log = console.log.bind(null, 'xxxxxxxxxxxxxx: ');

</script>

<template>
  <div>
    <YoungSearchForm v-model="query" :search-scheme="scheme" :on-search="() => log(query)">
      <template #btns>
        <ElButton>我是其他的按钮1</ElButton>
        <ElButton>我是其他的按钮2</ElButton>
      </template>
    </YoungSearchForm>
  </div>
</template>
