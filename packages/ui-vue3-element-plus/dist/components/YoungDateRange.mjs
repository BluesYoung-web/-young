import { defineComponent, ref, watchEffect } from "vue";
import { ElDatePicker } from "element-plus";
import { isArray, recentDay } from "@bluesyoung/utils";
const shortcuts = [
  {
    text: "\u4ECA\u5929",
    value: (() => {
      const end = /* @__PURE__ */ new Date();
      const start = /* @__PURE__ */ new Date();
      start.setHours(0, 0, 0);
      end.setHours(23, 59, 59);
      return [start, end];
    })()
  },
  {
    text: "\u6628\u5929",
    value: (() => {
      const end = /* @__PURE__ */ new Date();
      const start = /* @__PURE__ */ new Date();
      end.setTime(start.getTime() - 3600 * 1e3 * 24 * 1);
      start.setTime(start.getTime() - 3600 * 1e3 * 24 * 1);
      start.setHours(0, 0, 0);
      end.setHours(23, 59, 59);
      return [start, end];
    })()
  },
  {
    text: "\u672C\u5468",
    value: (() => {
      const end = /* @__PURE__ */ new Date();
      const start = /* @__PURE__ */ new Date();
      var weekday = start.getDay() || 7;
      start.setDate(start.getDate() - weekday + 1);
      start.setHours(0, 0, 0);
      end.setHours(23, 59, 59);
      return [start, end];
    })()
  },
  {
    text: "\u4E0A\u5468",
    value: (() => {
      const now = /* @__PURE__ */ new Date();
      const weekStart = new Date(now.getTime() - 7 * 24 * 3600 * 1e3);
      const weekEnd = new Date(now.getTime() - 7 * 24 * 3600 * 1e3);
      const day = weekStart.getDay();
      const time = weekStart.getDate() - day + (day === 0 ? -6 : 1);
      const start = new Date(weekStart.setDate(time));
      const end = new Date(weekEnd.setDate(time + 6));
      start.setHours(0, 0, 0);
      end.setHours(23, 59, 59);
      return [start, end];
    })()
  },
  {
    text: "\u672C\u6708",
    value: (() => {
      const start = /* @__PURE__ */ new Date();
      const end = /* @__PURE__ */ new Date();
      start.setDate(1);
      start.setHours(0, 0, 0);
      end.setHours(23, 59, 59);
      return [start, end];
    })()
  },
  {
    text: "\u4E0A\u6708",
    value: (() => {
      const dayMSec = 24 * 3600 * 1e3;
      const today = /* @__PURE__ */ new Date();
      const start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
      const nowMonthFirstDay = new Date(today.getFullYear(), today.getMonth(), 1);
      const lastMonthLastDayMSec = nowMonthFirstDay.getTime() - 1 * dayMSec;
      const end = new Date(lastMonthLastDayMSec);
      start.setHours(0, 0, 0);
      end.setHours(23, 59, 59);
      return [start, end];
    })()
  },
  {
    text: "\u6700\u8FD17\u5929",
    value: (() => {
      const end = /* @__PURE__ */ new Date();
      const start = /* @__PURE__ */ new Date();
      start.setTime(start.getTime() - 3600 * 1e3 * 24 * 6);
      start.setHours(0, 0, 0);
      end.setHours(23, 59, 59);
      return [start, end];
    })()
  },
  {
    text: "\u6700\u8FD130\u5929",
    value: (() => {
      const end = /* @__PURE__ */ new Date();
      const start = /* @__PURE__ */ new Date();
      start.setTime(start.getTime() - 3600 * 1e3 * 24 * 30);
      start.setHours(0, 0, 0);
      end.setHours(23, 59, 59);
      return [start, end];
    })()
  }
];
export default defineComponent({
  props: {
    start: {
      type: [String, Number],
      default: ""
    },
    end: {
      type: [String, Number],
      default: ""
    },
    unix: {
      type: Boolean,
      default: false
    },
    /**
     * 是否精确到秒
     */
    second: {
      type: Boolean,
      default: false
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
  emits: ["update:start", "update:end", "change"],
  setup(props, { attrs, emit }) {
    const datePicker = ref();
    watchEffect(() => {
      if (props.start && props.end) {
        if (props.unix) {
          datePicker.value = [new Date(+props.start * 1e3), new Date(+props.end * 1e3)];
        } else {
          datePicker.value = [new Date(props.start), new Date(props.end)];
        }
      } else {
        datePicker.value = null;
      }
    });
    const update = (e) => {
      if (!e) {
        emit("update:start", void 0);
        emit("update:end", void 0);
        datePicker.value = null;
      } else {
        const [start, end] = e;
        if (props.unix) {
          emit("update:start", Math.floor(start.getTime() / 1e3));
          emit("update:end", Math.floor(end.getTime() / 1e3));
        } else {
          emit("update:start", start.getTime());
          emit("update:end", end.getTime());
        }
      }
    };
    return () => /* @__PURE__ */ React.createElement(
      ElDatePicker,
      {
        ...attrs,
        modelValue: datePicker.value,
        type: props.second ? "datetimerange" : "daterange",
        "start-placeholder": "\u5F00\u59CB\u65E5\u671F",
        "end-placeholder": "\u7ED3\u675F\u65E5\u671F",
        "default-time": recentDay(),
        shortcuts: props.shortcuts ? isArray(props.shortcuts) ? props.shortcuts : shortcuts : void 0,
        clearable: true,
        "onUpdate:modelValue": (e) => update(e),
        onChange: () => emit("change")
      }
    );
  }
});
