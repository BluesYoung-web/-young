# 基于 Element Plus 定制开发的组件库


## YoungTable

### Prop

- `tableData`: 表格的数据，类型为 `TableDataItem[]`，必需

- `tableHead`: 表格的表头配置，类型为 `TableHeadItem[]`，必需

- `selectable`: 是否显示选择框，类型为 `Boolean`，默认为 `false`

- `rowDraggable`: 行是否可拖动，类型为 `Boolean`，默认为 `false`

- `enableCustomHead`: 是否启用自定义表头，默认展示全部，可以勾选想要展示的

- <del>`colDraggable`: 列是否可拖动，类型为 `Boolean`，默认为 `false`（该选项因存在 `bug` 暂未放出）</del>

- **其他属性和方法会被 `<ElTable>` 自动继承**

### Event

- `row-drag-change`: 行拖动结束后发出的事件，返回当前表格数据

- <del>`col-drag-change`: 列拖动结束后发出的事件，返回当前表头配置</del>

### Slot

- `switch`: 表示切换按钮所在位置的插槽

- `operate`: 表示操作栏所在位置的插槽

### TableHeadItem

```typescript
export interface TableHeadItem<T extends any = any> {
  /**
   * 参数名
   */
  prop: keyof T;
  /**
   * 展示标题
   */
  label: string;
  /**
   * 列宽
   */
  width?: string;
  /**
   * 是否可排序
   */
  sortable?: boolean;
  /**
   * 是否固定表头
   */
  fixed?: boolean | 'left' | 'right';
  /**
   * 表格位置
   */
  aligin?: TableHeadAligin;
  /**
   * 表头提示
   */
  tool_content?: string;
  /**
   * 仅导出，不展示
   */
  only_export?: boolean;
  /**
   * 仅展示，不导出
   */
  only_display?: boolean;
  /**
   * 渲染函数
   * @param row 当前行的数据
   */
  render?: (row: T, index: number) => VNode;
  /**
   * 当内容过长时，hover 展示全部
   */
  show_overflow_tooltip?: boolean;
  [x: string]: any;
}
```

### TableDataItem

```typescript
export type TableDataItem<T extends any = any> = {
  [key in keyof T]: T[key];
} & Record<string, any>;
```

## YoungTablePro

### Prop

> **主要是扩展了表头的自定义操作**，其他基础操作同 `YoungTable`，**墙裂推荐**


## YoungPagination

**定制的分页组件**

### 使用

```html
<template>
  <YoungPagination v-model:page="query.pageNum" v-model:limit="query.pageSize" :total="query.total" @page-change="getList" />
</template>

<script lang="ts" setup>
import { YoungPagination } from '@bluesyoung/ui-vue3-element-plus';
const query = ref({ pageNum: 1, pageSize: 10, total: 0 });

const getList = async () => {
  // todo: fetch new data
};
</script>
```


## YoungDialog

**通常和 `useFormMode` 配套使用**，也可以直接使用 `v-model` 来调用

### Prop

- `modelValue`：是否显示对话框，可使用 `v-model` 双向绑定

- `realTitle`：设置对话框标题，如不传入则根据模式自动判断(新建/编辑/详情)

- `sureText`：确定按钮文本，默认值为 `'确定'`

- `cancelText`：取消按钮文本，默认值为 `'取消'`

- `showSure`：是否显示确定按钮，默认为 `true`

- `showCancel`：是否显示取消按钮，默认为 `true`

- `isAdd`：是否为新增模式，默认为 `false`

- `isEdit`：是否为编辑模式，默认为 `false`

- `isMore`：是否为详情模式，默认为 `false`

- `sureFn`：点击确定按钮时触发的回调函数

- `diffForm`：进行表单比较的表单对象，用于比较表单是否发生了修改

### Event

- `update:modelValue`：当 `modelValue` 变化时触发

- `sure`：点击确定按钮时触发

- `clear`：在详情模式下点击确定按钮时触发或者确定按钮触发完成之后触发，用于清空表单数据

### Slot

- `body`：对话框的主体部分

- `button`：在默认底部按钮之前插入的按钮

- `step1`：在确定按钮之前插入的按钮

- `step2`：在确定按钮之前插入的按钮

### 使用示例

```html
<script lang="ts" setup>
import { YoungDialog, useFormMode } from '@bluesyoung/ui-vue3-element-plus';

const FORM_TEMP = { name: '' };
const getList = async () => {
  // todo: fetch new data
};
const { isAdd, isEdit, edit, del, sure, clear, form, validForm, formRef } = useFormMode<Form>(
    FORM_TEMP,
    {
      addCbk: async () => {
        const res = (await validForm()) as boolean;
        if (res) {
          const v = deepClone(form.value);
          // todo: call add method
          ElMessage.success('新增成功！');
        }
        return res;
      },
      modCbk: async () => {
        const res = (await validForm()) as boolean;
        if (res) {
          const v = deepClone(form.value);
          // todo: call update method
          ElMessage.success('修改成功！');
        }
        return res;
      },
      cgEffect: () => getList(),
    },
  );
</script>

<template>
  <YoungDialog :is-add="isAdd" :is-edit="isEdit" :diff-form="form" width="800px" top="5vh" @sure="sure" @clear="clear">
    <template #body>
      <ElForm ref="formRef" :model="form" label-width="150px" class="max-h-600px overflow-auto">
        <ElFormItem label="名称" prop="name" :rules="{ required: true, message: '请输入名称', trigger: 'blur' }">
          <ElInput v-model.trim="form.name" class="!w-300px" maxlength="20" show-word-limit />
        </ElFormItem>
      </ElForm>
    </template>
  </YoungDialog>
</template>
```

## YoungSearchForm

### 简介

`YoungSearchForm` 是一款基于 `Element Plus` 的 `Vue3` 组件，用于快速生成搜索表单。它通过配置方案，自动化生成搜索表单，并提供了快速搜索和重置功能，让搜索变得更加便捷。

### 使用示例

```html
<script lang="ts" setup>
import { YoungSearchForm, useQuery } from '@bluesyoung/ui-vue3-element-plus';
import type { YoungSearchScheme } from '@bluesyoung/ui-vue3-element-plus';

const getList = async () => {
  // todo: fetch new data
};

interface Query extends BaseQuery {
  name?: string;
  gender?: number;
  startcreatetime?: number;
  endcreatetime?: number;
}

const { query, reset } = useQuery<Query>(
  {
    pageNum: 1,
    pageSize: 10,
    total: 0,
  },
  getList,
);

const queryScheme: YoungSearchScheme<Query> = {
  name: { type: 'input', attrs: { placeholder: '请输入姓名' }, tip: '姓名' },
  gender: {
    type: 'select',
    attrs: { placeholder: '请选择性别' },
    options: [
      { label: '男', value: 1 },
      { label: '女', value: 2 }
    ],
    tip: '性别'
  },
  startcreatetime: { type: 'datetimerange', tip: '创建时间' },
  custom: { type: 'custom', render: () => h('div', '我是通过渲染函数创建的自定义搜索项') }
}
</script>

<template>
  <YoungSearchForm
    v-model="query"
    :searchScheme="queryScheme"
    :on-search="getList"
    :on-reset="reset"
  >
    <!-- 自定义表单项 -->
    <template #custom>
      <ElFormItem label="自定义搜索项">
        通过插槽放入的自定义搜索项(仅为兼容部分之前的代码，推荐使用渲染函数的方式，更加灵活)
      </ElFormItem>
    </template>

    <!-- 添加其他按钮 -->
    <template #btns>
      <ElButton type="danger">删除</ElButton>
    </template>
  </YoungSearchForm>
</template>
```


### Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| modelValue | `Object` | `{}` | 搜索表单的数据模型，即搜索表单中各输入项的值组成的对象 |
| searchScheme | `Object` | `{}` | 搜索表单的配置方案，描述了各个搜索项的类型、选项等 |
| fastSearch | `Boolean` | `true` | 是否开启快速搜索模式 |
| onSearch | `Function` | `() => console.log('---表单元素触发请求---')` | 搜索按钮被点击时的回调函数 |
| onReset | `Function` | `() => console.log('---触发重置请求---')` | 重置按钮被点击时的回调函数 |
| dateTimeKey | `Array` | `['startAt', 'endAt']` | 用于指定时间范围选择器的起始和终止键名 |

### 插槽

| 名称 | 说明 |
| --- | --- |
| custom | 自定义搜索项 |
| btns | 添加其他按钮 |
