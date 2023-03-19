/*
 * @Author: zhangyang
 * @Date: 2023-01-09 09:41:37
 * @LastEditTime: 2023-03-19 10:45:37
 * @Description:
 */
import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import { ElSelect, ElOption } from 'element-plus';
import { randomId } from '@bluesyoung/utils';

export type SelectOptionItem<T extends any = any> = {
  label: string;
  value: T;
  disabled?: boolean;
  children?: SelectOptionItem<T>[];
};

export default defineComponent({
  props: {
    modelValue: {
      type: Object,
      required: false
    },
    options: {
      type: Object as PropType<SelectOptionItem[]>,
      required: true,
    },
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { attrs, emit }) {
    const randomSeed = randomId();
    return () => (
      <ElSelect
        modelValue={props.modelValue}
        onUpdate:modelValue={(v) => {
          emit('update:modelValue', v);
          emit('change', v);
        }}
        {...attrs}
      >
        {props.options.map((op, index) => (
          <ElOption {...op} key={index + randomSeed} />
        ))}
      </ElSelect>
    );
  },
});
