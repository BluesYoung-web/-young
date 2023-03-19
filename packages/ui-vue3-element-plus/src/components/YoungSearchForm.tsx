/*
 * @Author: zhangyang
 * @Date: 2023-03-13 17:49:07
 * @LastEditTime: 2023-03-19 11:27:49
 * @Description: 快速生成搜索部分
 */
import { defineComponent } from 'vue';
import type { SelectOptionItem } from './YoungSelect';
import type { PropType } from 'vue';
import { ElRow, ElCol, ElForm, ElFormItem, ElInput, ElButton, ElInputNumber } from 'element-plus';
import { YoungSelect, YoungDateRange, useKeyUp } from '..';
import { randomId } from '@bluesyoung/utils';

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
  attrs?: Record<string, any>;
};

export const defineYoungSearchScheme = <T extends Record<string, YoungSearchFormItem>>(args: T) =>
  args;

export default defineComponent({
  props: {
    modelValue: Object as PropType<Record<string, any>>,
    searchScheme: Object as PropType<Record<string, YoungSearchFormItem>>,
    fastSearch: {
      type: Boolean,
      default: false,
    },
    onSearch: {
      type: Function,
      default: () => console.log('---表单元素触发请求---'),
    },
  },
  emits: ['update:modelValue'],
  setup(props, { attrs, emit, slots }) {
    const update = (args: Record<string, any>) => {
      emit('update:modelValue', {
        // @ts-ignore
        ...props.modelValue,
        ...args,
      });
    };

    const search = () => {
      props.fastSearch && props.onSearch();
    };

    const renderItem = (key: string) => {
      const conf = props.searchScheme[key];

      if (!conf.attrs) {
        conf.attrs = {};
      }

      const EleMap: Record<YoungSearchFormType, (key: string) => JSX.Element> = {
        input: (key) => (
          <ElFormItem label={conf.tip}>
            <ElInput
              modelValue={props.modelValue[key]}
              onUpdate:modelValue={(v) => update({ [key]: v })}
              // @ts-ignore
              onKeyup={(e: KeyboardEvent) => useKeyUp(e, () => search())}
              style={{ width: '220px' }}
              {...conf.attrs}
            />
          </ElFormItem>
        ),
        number: (key) => (
          <ElFormItem label={conf.tip}>
            <ElInputNumber
              modelValue={props.modelValue[key]}
              onUpdate:modelValue={(e) => update({ [key]: e })}
              onChange={search}
              style={{ width: '120px' }}
              {...conf.attrs}
            />
          </ElFormItem>
        ),
        select: (key) => (
          <ElFormItem label={conf.tip}>
            <YoungSelect
              modelValue={props.modelValue[key]}
              options={conf.options || []}
              onUpdate:modelValue={(e) => update({ [key]: e })}
              onChange={search}
              {...conf.attrs}
            />
          </ElFormItem>
        ),
        datetimerange: (key) => (
          <ElFormItem label={conf.tip}>
            <YoungDateRange
              start={props.modelValue[key].start}
              end={props.modelValue[key].end}
              onUpdate:start={(v) => {
                update({ [key]: { start: v, end: props.modelValue[key].end } });
                search();
              }}
              onUpdate:end={(v) => {
                update({ [key]: { start: props.modelValue[key].start, end: v } });
                search();
              }}
              {...conf.attrs}
            />
          </ElFormItem>
        ),
      };

      const elRender = EleMap[conf.type];
      if (elRender) {
        return elRender(key);
      } else {
        throw new Error('unknown search form type');
      }
    };

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
          <ElRow gutter={20}>
            {Object.keys(props.searchScheme).map((key, index) => (
              <ElCol span={8} key={index + randomId()}>
                {renderItem(key)}
              </ElCol>
            ))}

            {/* 其他元素 */}
            {slots.custom && <ElCol span={8}>{slots.custom()}</ElCol>}
          </ElRow>

          <ElRow justify="end">
            <ElCol>
              <ElFormItem>
                <ElButton type="primary" onClick={() => props.onSearch}>
                  搜索
                </ElButton>
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
