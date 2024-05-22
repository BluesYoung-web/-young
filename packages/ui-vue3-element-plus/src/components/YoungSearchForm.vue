<!--
 * @Author: zhangyang
 * @Date: 2023-09-20 15:10:28
 * @LastEditTime: 2024-05-22 15:23:06
 * @Description: 
-->

<script lang="tsx" setup>
import { ref, watch } from 'vue';
import type { YoungSearchScheme } from '.';
import { ElForm, ElFormItem, ElButton, ElInputNumber, ElInput } from 'element-plus';
import { YoungSelect, YoungDateRange } from '..';
import { deepClone, randomId } from '@bluesyoung/utils';

interface Props {
  modelValue: Record<string, any>;
  searchScheme: YoungSearchScheme;
  fastSearch?: boolean;
  onSearch?: () => void;
  onReset?: () => void;
  dateTimeKey?: [string, string];
}

const props = withDefaults(defineProps<Props>(), {
  fastSearch: true,
  onSearch: () => console.log('---表单元素触发请求---'),
  onReset: () => console.log('---触发重置请求---'),
  dateTimeKey: () => ['startcreatetime', 'endcreatetime'],
});

const emit = defineEmits<{
  (e: 'update:modelValue', v: Props['modelValue']): void;
}>();

const form = ref<Record<string, any>>({});
watch(
  () => props.modelValue,
  (v) => {
    form.value = deepClone(v);
  },
  { immediate: true, deep: true },
);

const update = (up = true) => {
  emit('update:modelValue', { ...form.value });
  props.fastSearch && up && props.onSearch();
};

// !直接在界面上调用，会导致频繁刷新引起意外的 bug，比如：输入框输入一个字符之后就会失去焦点
const randomSeed = randomId();
</script>

<template>
  <div v-bind="$attrs" style="max-width: 100%; margin: auto; padding: 20px;">
    <ElForm :model="modelValue">
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, max-content)); gap: 10px 20px;">
        <div v-for="(item, index) in Object.keys(searchScheme)" :key="index + randomSeed">
          <ElFormItem :label="searchScheme[item].tip">
            <ElInput v-if="searchScheme[item].type === 'input'" v-model.trim="form[item]"
              v-bind="searchScheme[item].attrs" @change="update(false)" @keyup.enter="update()" />
            <ElInputNumber v-if="searchScheme[item].type === 'number'" v-bind="searchScheme[item].attrs"
              v-model.number="form[item]" @change="update()" />
            <YoungSelect v-if="searchScheme[item].type === 'select'" v-model="form[item]"
              v-bind="searchScheme[item].attrs" :options="searchScheme[item].options" @change="update()" />
            <YoungDateRange v-if="searchScheme[item].type === 'datetimerange'" v-model:start="form[dateTimeKey[0]]"
              v-model:end="form[dateTimeKey[1]]" v-bind="searchScheme[item].attrs" @change="update()" />
            <component v-if="searchScheme[item].type === 'custom'" :is="searchScheme[item].render?.()" />
          </ElFormItem>
        </div>
        <slot name="custom" />
      </div>
      <div style="display: flex;">
        <ElButton type="primary" @click="onSearch">
          搜索
        </ElButton>
        <ElButton @click="onReset">重置</ElButton>
        <slot name="btns" />
      </div>
    </ElForm>
  </div>
</template>