/*
 * @Author: zhangyang
 * @Date: 2023-02-11 11:06:39
 * @LastEditTime: 2023-02-11 14:01:12
 * @Description:
 */
import { defineComponent, ref, watchEffect } from 'vue';
import { ElDatePicker } from 'element-plus';
import { recentDay } from '@bluesyoung/utils';

export default defineComponent({
  props: {
    start: {
      type: [String, Number],
      default: '',
    },
    end: {
      type: [String, Number],
      default: '',
    },
    unix: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:start', 'update:end'],
  setup(props, { attrs, emit }) {
    const datePicker = ref<[Date, Date]>();
    watchEffect(() => {
      if (props.start && props.end) {
        if (props.unix) {
          datePicker.value = [new Date(+props.start * 1000), new Date(+props.end * 1000)];
        } else {
          datePicker.value = [new Date(props.start), new Date(props.end)];
        }
      }
    });

    const update = (e: [Date, Date] | null) => {
      if (!e) {
        emit('update:start', undefined);
        emit('update:end', undefined);
      } else {
        const [start, end] = e;
        if (props.unix) {
          emit('update:start', Math.floor(start.getTime() / 1000));
          emit('update:end', Math.floor(end.getTime() / 1000));
        } else {
          emit('update:start', start.getTime());
          emit('update:end', end.getTime());
        }
      }
    };
    return () => (
      <ElDatePicker
        {...attrs}
        modelValue={datePicker.value}
        type="daterange"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        default-time={recentDay()}
        clearable
        onUpdate:modelValue={(e) => update(e)}
      />
    );
  },
});
