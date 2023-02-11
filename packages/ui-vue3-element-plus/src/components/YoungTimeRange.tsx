/*
 * @Author: zhangyang
 * @Date: 2023-02-11 11:06:39
 * @LastEditTime: 2023-02-11 11:13:25
 * @Description:
 */
import { defineComponent } from 'vue';
import { ElTimeSelect } from 'element-plus';

export default defineComponent({
  props: {
    start: {
      type: String,
      required: true,
    },
    end: {
      type: String,
      required: true,
    },
    startTime: {
      type: String,
      default: '00:00',
    },
    endTime: {
      type: String,
      default: '23:59',
    },
    step: {
      type: String,
      default: '00:01',
    },
  },
  emits: ['update:start', 'update:end'],
  setup(props, { attrs, emit }) {
    return () => (
      <>
        <ElTimeSelect
          {...attrs}
          modelValue={props.start}
          class="w-120px mr-2"
          maxTime={props.end}
          placeholder="开始时间"
          start={props.startTime}
          step={props.step}
          end={props.endTime}
          onUpdate:modelValue={(v) => emit('update:start', v)}
        />
        - &nbsp;
        <ElTimeSelect
          {...attrs}
          modelValue={props.end}
          class="w-120px"
          minTime={props.start}
          placeholder="结束时间"
          start={props.startTime}
          step={props.step}
          end={props.endTime}
          onUpdate:modelValue={(v) => emit('update:end', v)}
        />
      </>
    );
  },
});
