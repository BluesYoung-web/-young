import { defineComponent, ref, watchEffect } from "vue";
import { ElTimeSelect, ElTimePicker } from "element-plus";
export default defineComponent({
  props: {
    start: {
      type: String,
      required: true
    },
    end: {
      type: String,
      required: true
    },
    startTime: {
      type: String,
      default: "00:00"
    },
    endTime: {
      type: String,
      default: "23:59"
    },
    step: {
      type: String,
      default: "00:01"
    },
    /**
     * 是否精确到秒
     */
    second: {
      type: Boolean,
      default: false
    }
  },
  emits: ["update:start", "update:end", "change"],
  setup(props, { attrs, emit }) {
    const timePicker = ref();
    watchEffect(() => {
      if (props.start && props.end) {
        timePicker.value = [
          /* @__PURE__ */ new Date(`2022 02 02 ${props.start}`),
          /* @__PURE__ */ new Date(`2022 02 02 ${props.end}${props.second ? ":59" : ""}`)
        ];
      } else {
        timePicker.value = void 0;
      }
    });
    const update = (v) => {
      if (!v) {
        emit("update:start", "");
        emit("update:end", "");
      } else {
        const [start, end] = v;
        emit("update:start", start.toLocaleString().match(/\d\d:\d\d:\d\d/)?.[0] ?? "");
        emit("update:end", end.toLocaleString().match(/\d\d:\d\d:\d\d/)?.[0] ?? "");
      }
      emit("change");
    };
    return () => !props.second ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(
      ElTimeSelect,
      {
        ...attrs,
        modelValue: props.start,
        class: "w-120px mr-2",
        maxTime: props.end,
        placeholder: "\u5F00\u59CB\u65F6\u95F4",
        start: props.startTime,
        step: props.step,
        end: props.endTime,
        "onUpdate:modelValue": (v) => emit("update:start", v)
      }
    ), "- \xA0", /* @__PURE__ */ React.createElement(
      ElTimeSelect,
      {
        ...attrs,
        modelValue: props.end,
        class: "w-120px",
        minTime: props.start,
        placeholder: "\u7ED3\u675F\u65F6\u95F4",
        start: props.startTime,
        step: props.step,
        end: props.endTime,
        "onUpdate:modelValue": (v) => emit("update:end", v)
      }
    )) : /* @__PURE__ */ React.createElement(
      ElTimePicker,
      {
        ...attrs,
        modelValue: timePicker.value,
        isRange: true,
        startPlaceholder: "\u5F00\u59CB\u65F6\u95F4",
        endPlaceholder: "\u7ED3\u675F\u65F6\u95F4",
        "onUpdate:modelValue": update
      }
    );
  }
});
