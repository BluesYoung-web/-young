# 工具方法

## useFormMode

该 Hook 提供了表单操作的常用功能，并可根据具体场景进行扩展。

### 用法示例

```typescript
import { useFormMode } from '@/hooks/useFormMode';
import { ref } from 'vue';

const FORM_TEMP = {
  name: '',
  age: null,
};

const { isAdd, isEdit, isMore, clear, edit, more, form, del, sure, formRef, validForm } =
  useFormMode(
    FORM_TEMP,
    {
      // 添加操作回调函数
      addCbk: async () => {
        // TODO：请求提交数据
        return true;
      },
      // 修改操作回调函数
      modCbk: async () => {
        // TODO：请求提交数据
        return true;
      },
      // 删除操作回调函数
      delCbk: async (row) => {
        // TODO：请求删除该行数据
      },
      // 复制（更多）操作回调函数
      cpEffect: async (row) => {
        // TODO: 请求获取该行数据详情，并返回表单对象或 Promise 对象
        return {
          ...row,
          age: 20, // 可以对表单数据进行修改
        };
      },
      // 操作后更新页面回调函数
      cgEffect: () => {
        // TODO: 请求更新列表数据等
      },
      // 清空表单数据前回调函数
      clearEffect: () => {
        console.log('清空表单数据');
      },
      // 是否禁用清空表单数据（默认为 false）
      disableclear: false,
    },
  );

// 额外的表单校验方法
const validAge = async () => {
  if (form.value.age > 100) {
    return Promise.reject('年龄不能超过 100 岁');
  }
  return Promise.resolve();
};
formRef.value?.setRules({
  name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  age: [
    { required: true, message: '请输入年龄', trigger: 'blur' },
    { validator: validAge, trigger: 'blur' },
  ],
});

const handleAdd = () => {
  isAdd.value = true;
  clear();
};

const handleEdit = (row) => {
  edit(row);
};

const handleMore = (row) => {
  more(row);
};
```

### API

该 Hook 返回以下方法和状态：

#### 状态

- `isAdd`：Boolean 类型，表单是否处于添加状态。
- `isEdit`：Boolean 类型，表单是否处于编辑状态。
- `isMore`：Boolean 类型，表单是否处于更多状态。

#### 方法

- `clear()`：清空表单数据并恢复初始状态。
- `edit(row: any)`：编辑指定行数据。
- `more(row: any)`：更多当前行数据。
- `del(row: any)`：删除指定行数据。
- `sure()`：确定表单操作（添加或编辑）。
- `validForm(): Promise<boolean>`：异步校验表单数据。

#### 参数

`useFormMode(FORM_TEMP, Cbk, tip)`

- `FORM_TEMP`：Object 类型，表单数据的默认值。
- `Cbk`：Object 类型，回调函数对象，包括以下属性：
  - `addCbk: () => Promise<void | boolean>`：添加操作回调函数。
  - `modCbk: () => Promise<void | boolean>`：修改操作回调函数。
  - `delCbk: (row: T) => void`：删除操作回调函数。
  - `cpEffect: (row: T) => void | Promise<void | T>`：复制（更多）操作回调函数。
  - `cgEffect: () => void`：操作后更新页面回调函数。
  - `clearEffect: () => void`：清空表单数据前回调函数。
  - `disableclear: boolean`：是否禁用清空表单数据（默认为 false）。
- `tip`：String 类型，删除操作时的确认提示信息（默认为 `'确认删除该条数据？'`）。

## useAutoLoad 自动分页加载组合函数

该组合函数基于 `Vue3` 框架和 `@vueuse/core` 库，用于在列表滚动到底部时，根据需求逐步加载数据。该函数适用于需要对大数据进行分页显示的情况，并且可以实现节流和防抖处理。该组合函数返回一组函数和响应式变量，具体如下：

```typescript
interface UseAutoLoad<T extends any = any> {
  (list: Ref<T[]>, allData: Ref<T[]>, pageSize?: number, pause?: Ref<boolean>): {
    elArr: Ref<any[]>;
    touchEndEl: Ref<boolean>;
    page: Ref<number>;
    load: () => void;
  };
}
```

### 参数

- `list`：Ref 类型的数组列表。
- `allData`: Ref 类型的总数据。
- `pageSize`：页面大小，控制每页加载数据的数量，默认为 10。
- `pause`：控制暂停加载数据的 Ref 布尔值。

### 返回值

- `elArr`：组成列表的所有元素。
- `touchEndEl`：最后一个元素是否在可视区域内。
- `page`：当前加载页数。
- `load()`：手动加载数据的方法。

### 注意事项

- 在使用该函数时，需要将列表渲染的子组件使用 `v-for` 渲染出来，并且需要为每个子组件增加一个唯一的 `key` 属性。
- 在组件卸载时，需要释放监听器以避免内存泄漏的问题。
