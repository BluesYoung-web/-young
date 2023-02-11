/*
 * @Author: zhangyang
 * @Date: 2023-02-11 10:57:05
 * @LastEditTime: 2023-02-11 11:01:34
 * @Description:
 */
import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import { ElCheckboxGroup, ElCheckbox } from 'element-plus';
import { randomId } from '@bluesyoung/utils';

const Weeks = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];

export default defineComponent({
  props: {
    modelValue: {
      type: Object as PropType<number[]>,
      required: true,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { attrs, emit }) {
    const randomSeed = randomId();
    return () => (
      <ElCheckboxGroup {...attrs} modelValue={props.modelValue} onChange={(v) => emit('update:modelValue', v)}>
        {
          Weeks.map((w, i) => <ElCheckbox label={i + 1} key={i + randomSeed}>{w}</ElCheckbox>)
        }
      </ElCheckboxGroup>
    );
  },
});
