/*
 * @Author: zhangyang
 * @Date: 2023-02-11 10:57:05
 * @LastEditTime: 2023-08-10 18:47:21
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
  emits: ['update:modelValue', 'change'],
  setup(props, { attrs, emit }) {
    const randomSeed = randomId();
    const update = (v: number[]) => {
      emit('update:modelValue', v);
      emit('change', v);
    };
    return () => (
      <ElCheckboxGroup {...attrs} modelValue={props.modelValue} onChange={update}>
        {Weeks.map((w, i) => (
          <ElCheckbox label={i + 1} key={i + randomSeed}>
            {w}
          </ElCheckbox>
        ))}
      </ElCheckboxGroup>
    );
  },
});
