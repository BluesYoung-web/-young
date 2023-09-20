import { defineComponent } from "vue";
import { ElSelect, ElOption } from "element-plus";
import { randomId } from "@bluesyoung/utils";
export default defineComponent({
  props: {
    modelValue: {
      type: [String, Number, Array],
      required: false
    },
    options: {
      type: Object,
      required: true
    }
  },
  emits: ["update:modelValue", "change"],
  setup(props, { attrs, emit }) {
    const randomSeed = randomId();
    return () => /* @__PURE__ */ React.createElement(
      ElSelect,
      {
        modelValue: props.modelValue,
        "onUpdate:modelValue": (v) => {
          emit("update:modelValue", v);
          emit("change", v);
        },
        ...attrs
      },
      props.options.map((op, index) => /* @__PURE__ */ React.createElement(ElOption, { ...op, key: index + randomSeed }))
    );
  }
});
