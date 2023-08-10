/*
 * @Author: zhangyang
 * @Date: 2023-02-11 11:06:39
 * @LastEditTime: 2023-08-10 18:45:19
 * @Description:
 */
import { defineComponent, ref, watchEffect } from 'vue';
import { ElTimeSelect, ElTimePicker } from 'element-plus';

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
    /**
     * 是否精确到秒
     */
    second: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:start', 'update:end', 'change'],
  setup(props, { attrs, emit }) {
    const timePicker = ref<[Date, Date]>();
    watchEffect(() => {
      if (props.start && props.end) {
        timePicker.value = [
          new Date(`2022 02 02 ${props.start}`),
          new Date(`2022 02 02 ${props.end}${props.second ? ':59' : ''}`),
        ];
      } else {
        timePicker.value = undefined;
      }
    });

    const update = (v: [Date, Date] | null) => {
      if (!v) {
        emit('update:start', '');
        emit('update:end', '');
      } else {
        const [start, end] = v;
        emit('update:start', start.toLocaleString().match(/\d\d:\d\d:\d\d/)?.[0] ?? '');
        emit('update:end', end.toLocaleString().match(/\d\d:\d\d:\d\d/)?.[0] ?? '');
      }
      emit('change');
    };

    return () =>
      !props.second ? (
        <>
          <ElTimeSelect
            {...attrs}
            modelValue={props.start}
            class='w-120px mr-2'
            maxTime={props.end}
            placeholder='开始时间'
            start={props.startTime}
            step={props.step}
            end={props.endTime}
            onUpdate:modelValue={(v) => emit('update:start', v)}
          />
          - &nbsp;
          <ElTimeSelect
            {...attrs}
            modelValue={props.end}
            class='w-120px'
            minTime={props.start}
            placeholder='结束时间'
            start={props.startTime}
            step={props.step}
            end={props.endTime}
            onUpdate:modelValue={(v) => emit('update:end', v)}
          />
        </>
      ) : (
        <ElTimePicker
          {...attrs}
          modelValue={timePicker.value}
          isRange
          startPlaceholder='开始时间'
          endPlaceholder='结束时间'
          onUpdate:modelValue={update}
        />
      );
  },
});
