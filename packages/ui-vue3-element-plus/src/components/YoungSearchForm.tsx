/*
 * @Author: zhangyang
 * @Date: 2023-03-13 17:49:07
 * @LastEditTime: 2023-03-23 13:58:15
 * @Description: 快速生成搜索部分
 */
import { defineComponent, ref, watch } from 'vue';
import type { SelectOptionItem } from './YoungSelect';
import type { PropType } from 'vue';
import { ElForm, ElFormItem, ElButton, ElInputNumber, ElInput } from 'element-plus';
import { YoungSelect, YoungDateRange, useKeyUp } from '..';
import { deepClone, randomId } from '@bluesyoung/utils';

export type YoungSearchFormType = 'input' | 'number' | 'select' | 'datetimerange' | 'custom';

export type YoungSearchFormItem = {
  /**
   * 表单元素的类型
   */
  type: YoungSearchFormType;
  /**
   * 是否拥有前缀提示
   */
  tip?: string;
  /**
   * 下拉专属选项
   */
  options?: SelectOptionItem[];
  /**
   * 自定义搜索项的渲染函数
   */
  render?: () => JSX.Element;
  /**
   * 透传给元素的其他属性
   */
  attrs?: {
    placeholder?: string;
    title?: string;
    class?: string;
    style?: string;
    clearable?: boolean;
    disabled?: boolean;
    [props: string]: any;
  };
};

export type YoungSearchScheme<T extends any = any> = {
  [prop in keyof T]?: YoungSearchFormItem;
};

export default defineComponent({
  props: {
    modelValue: Object as PropType<Record<string, any>>,
    searchScheme: Object as PropType<YoungSearchScheme>,
    fastSearch: {
      type: Boolean,
      default: true,
    },
    onSearch: {
      type: Function,
      default: () => console.log('---表单元素触发请求---'),
    },
    onReset: {
      type: Function,
      default: () => console.log('---触发重置请求---'),
    },
    dateTimeKey: {
      type: Array,
      default: () => ['startcreatetime', 'endcreatetime'],
    },
  },
  emits: ['update:modelValue'],
  setup(props, { attrs, emit, slots }) {
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

    const renderItem = (key: string) => {
      const conf = props.searchScheme[key];

      if (!conf.attrs) {
        conf.attrs = {};
      }

      const wrapTip = (el: JSX.Element, tip?: string) =>
        tip ? <ElFormItem label={conf.tip}>{el}</ElFormItem> : el;

      const [start, end] = props.dateTimeKey as [string, string];

      const EleMap: Record<YoungSearchFormType, (key: string) => JSX.Element> = {
        input: () => {
          return wrapTip(
            <ElInput
              modelValue={form.value[key]}
              onUpdate:modelValue={(v) => (form.value[key] = v?.trim?.())}
              onChange={() => update(false)}
              // @ts-ignore
              onKeyup={(e: KeyboardEvent) => useKeyUp(e, () => update())}
              {...conf.attrs}
            />,
            conf.tip,
          );
        },
        number: (key) =>
          wrapTip(
            <ElInputNumber
              modelValue={form.value[key]}
              onUpdate:modelValue={(v) => (form.value[key] = v)}
              onChange={() => update()}
              style={{ width: '120px' }}
              {...conf.attrs}
            />,
            conf.tip,
          ),
        select: (key) =>
          wrapTip(
            <YoungSelect
              modelValue={form.value[key]}
              options={conf.options || []}
              onUpdate:modelValue={(v) => (form.value[key] = v)}
              onChange={() => update()}
              {...conf.attrs}
            />,
            conf.tip,
          ),
        // ! 时间范围选择，通常全局只有一个
        datetimerange: (key) =>
          wrapTip(
            <YoungDateRange
              start={form.value[start]}
              end={form.value[end]}
              onUpdate:start={(v) => {
                form.value[start] = v;
              }}
              onUpdate:end={(v) => {
                form.value[end] = v;
              }}
              onChange={update}
              {...conf.attrs}
            />,
            conf.tip,
          ),
        custom: (key) => wrapTip(conf.render(), conf.tip),
      };

      const elRender = EleMap[conf.type];
      if (elRender) {
        return elRender(key);
      } else {
        throw new Error('unknown search form type');
      }
    };

    // !直接在界面上调用，会导致频繁刷新引起意外的 bug，比如：输入框输入一个字符之后就会失去焦点
    const randomSeed = randomId();

    return () => (
      <div style={{ maxWidth: '100%', margin: 'auto', padding: '20px' }} {...attrs}>
        <ElForm model={props.modelValue}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px 20px' }}>
            {Object.keys(props.searchScheme).map((key, index) => (
              <div key={index + randomSeed}>{renderItem(key)}</div>
            ))}
            {/* 其他暂未包含的类型 */}
            <div>{slots.custom?.()}</div>
          </div>
          <div style={{ display: 'flex' }}>
            <ElButton type="primary" onClick={() => props.onSearch()}>
              搜索
            </ElButton>
            <ElButton onClick={() => props.onReset()}>重置</ElButton>
            {/* 其他按钮 */}
            {slots.btns?.()}
          </div>
        </ElForm>
      </div>
    );
  },
});
