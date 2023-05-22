/*
 * @Author: zhangyang
 * @Date: 2023-02-11 11:06:39
 * @LastEditTime: 2023-05-22 15:09:11
 * @Description:
 */
import { defineComponent, ref, watchEffect } from 'vue';
import { ElDatePicker } from 'element-plus';
import { isArray, recentDay } from '@bluesyoung/utils';

/**
 * 快捷选项
 */
const shortcuts = [
  {
    text: '今天',
    value: (() => {
      const end = new Date();
      const start = new Date();
      start.setHours(0, 0, 0);
      end.setHours(23, 59, 59);
      return [start, end];
    })(),
  },
  {
    text: '昨天',
    value: (() => {
      const end = new Date();
      const start = new Date();
      end.setTime(start.getTime() - 3600 * 1000 * 24 * 1);
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 1);

      start.setHours(0, 0, 0);
      end.setHours(23, 59, 59);
      return [start, end];
    })(),
  },
  {
    text: '本周',
    value: (() => {
      const end = new Date();
      const start = new Date();
      //获取星期几,getDay()返回值是 0（周日） 到 6（周六） 之间的一个整数。0||7为7，即weekday的值为1-7
      var weekday = start.getDay() || 7;
      //往前算（weekday-1）天，年份、月份会自动变化
      start.setDate(start.getDate() - weekday + 1);

      start.setHours(0, 0, 0);
      end.setHours(23, 59, 59);
      return [start, end];
    })(),
  },
  {
    text: '上周',
    value: (() => {
      const now = new Date();

      const weekStart = new Date(now.getTime() - 7 * 24 * 3600 * 1000); // 计算开始时间用
      const weekEnd = new Date(now.getTime() - 7 * 24 * 3600 * 1000); // 计算结束时间用

      const day = weekStart.getDay();
      const time = weekStart.getDate() - day + (day === 0 ? -6 : 1);

      const start = new Date(weekStart.setDate(time));
      const end = new Date(weekEnd.setDate(time + 6));

      start.setHours(0, 0, 0);
      end.setHours(23, 59, 59);
      return [start, end];
    })(),
  },
  {
    text: '本月',
    value: (() => {
      const start = new Date();
      const end = new Date();

      start.setDate(1);
      start.setHours(0, 0, 0);
      end.setHours(23, 59, 59);
      return [start, end];
    })(),
  },
  {
    text: '上月',
    value: (() => {
      const dayMSec = 24 * 3600 * 1000;
      const today = new Date();

      const start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
      //得到本月第一天
      const nowMonthFirstDay = new Date(today.getFullYear(), today.getMonth(), 1);
      //得到上一个月的最后一天的毫秒值
      const lastMonthLastDayMSec = nowMonthFirstDay.getTime() - 1 * dayMSec;

      const end = new Date(lastMonthLastDayMSec);

      start.setHours(0, 0, 0);
      end.setHours(23, 59, 59);
      return [start, end];
    })(),
  },
  {
    text: '最近7天',
    value: (() => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 6);

      start.setHours(0, 0, 0);
      end.setHours(23, 59, 59);
      return [start, end];
    })(),
  },
  {
    text: '最近30天',
    value: (() => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);

      start.setHours(0, 0, 0);
      end.setHours(23, 59, 59);
      return [start, end];
    })(),
  },
];

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
    /**
     * 是否精确到秒
     */
    second: {
      type: Boolean,
      default: false,
    },
    /**
     * 是否展示快捷选项
     * @cond1 传入 true，使用默认的快捷选项
     * @cond2 传入数组，使用数组作为快捷选项
     */
    shortcuts: {
      type: [Boolean, Array],
      default: false
    }
  },
  emits: ['update:start', 'update:end', 'change'],
  setup(props, { attrs, emit }) {
    const datePicker = ref<[Date, Date]>();
    watchEffect(() => {
      if (props.start && props.end) {
        if (props.unix) {
          datePicker.value = [new Date(+props.start * 1000), new Date(+props.end * 1000)];
        } else {
          datePicker.value = [new Date(props.start), new Date(props.end)];
        }
      } else {
        datePicker.value = null;
      }
    });

    const update = (e: [Date, Date] | null) => {
      if (!e) {
        emit('update:start', undefined);
        emit('update:end', undefined);
        datePicker.value = null;
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
        type={props.second ? 'datetimerange' : 'daterange'}
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        default-time={recentDay()}
        shortcuts={props.shortcuts ? isArray(props.shortcuts) ? props.shortcuts : shortcuts : undefined}
        clearable
        onUpdate:modelValue={(e) => update(e)}
        // @ts-ignore
        onChange={() => emit('change')}
      />
    );
  },
});
