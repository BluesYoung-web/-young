/*
 * @Author: zhangyang
 * @Date: 2023-01-09 09:41:37
 * @LastEditTime: 2023-01-09 11:03:57
 * @Description: 
 */
import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import { ElSelect, ElOption } from 'element-plus';
import { randomId } from '@bluesyoung/utils';

export type SelectOptionItem<T extends unknown = number> = {
  label: string;
  value: T;
  children?: SelectOptionItem<T>[];
};

export default defineComponent({
  props: {
    options: {
      type: Object as PropType<SelectOptionItem[]>,
      required: true
    },
  },
  setup(props, { attrs }) {
    const randomSeed = randomId();
    return () => (
      <ElSelect {...attrs}>
        {
          props.options.map((op, index) => <ElOption {...op} key={index + randomSeed} />)
        }
      </ElSelect>
    )
  }
});