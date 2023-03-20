/*
 * @Author: zhangyang
 * @Date: 2023-03-13 17:49:07
 * @LastEditTime: 2023-03-20 10:00:40
 * @Description: 快速生成搜索部分
 */
import { defineComponent, ref, watch } from 'vue';
import type { SelectOptionItem } from './YoungSelect';
import type { PropType } from 'vue';
import { ElRow, ElCol, ElForm, ElFormItem, ElButton, ElInputNumber, ElInput } from 'element-plus';
import { YoungSelect, YoungDateRange, useKeyUp } from '..';
import { deepClone, randomId } from '@bluesyoung/utils';

export type YoungSearchFormType = 'input' | 'number' | 'select' | 'datetimerange';

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
   * 透传给元素的其他属性
   */
  attrs?: {
    placeholder?: string;
    title?: string;
    class?: string;
    style?: string;
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

    const update = () => {
      emit('update:modelValue', { ...form.value });
      props.fastSearch && props.onSearch();
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
        input: () =>
          wrapTip(
            <ElInput
              modelValue={form.value[key]}
              onUpdate:modelValue={(v) => (form.value[key] = v)}
              // @ts-ignore
              onKeyup={(e: KeyboardEvent) => useKeyUp(e, () => update())}
              {...conf.attrs}
            />,
            conf.tip,
          ),
        number: (key) =>
          wrapTip(
            <ElInputNumber
              modelValue={form.value[key]}
              onUpdate:modelValue={(v) => (form.value[key] = v)}
              onChange={update}
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
              onChange={update}
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
                update();
              }}
              onUpdate:end={(v) => {
                form.value[end] = v;
                update();
              }}
              {...conf.attrs}
            />,
            conf.tip,
          ),
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
          <style>
            {`
            .el-row {
              display: flex;
              flex-wrap: wrap;
              margin-right: -10px;
              margin-left: -10px;
            }

            .el-col {
              padding-right: 10px;
              padding-left: 10px;
            }
            `}
          </style>
          <ElRow>
            {Object.keys(props.searchScheme).map((key, index) => (
              <ElCol xs={24} sm={8} lg={6} key={index + randomSeed}>
                {renderItem(key)}
              </ElCol>
            ))}

            {/* 其他暂未包含的类型 */}
            <ElCol xs={24} sm={8} lg={6}>
              {slots.custom?.()}
            </ElCol>
          </ElRow>

          <ElRow justify="end">
            <ElCol>
              <ElFormItem>
                <ElButton type="primary" onClick={() => props.onSearch()}>
                  搜索
                </ElButton>
                <ElButton onClick={() => props.onReset()}>重置</ElButton>
                {/* 其他按钮 */}
                {slots.btns?.()}
              </ElFormItem>
            </ElCol>
          </ElRow>
        </ElForm>
      </div>
    );
  },
});
