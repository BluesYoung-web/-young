import { defineComponent } from "vue";
import { ElCheckboxGroup, ElCheckbox } from "element-plus";
import { randomId } from "@bluesyoung/utils";
const Weeks = ["\u5468\u4E00", "\u5468\u4E8C", "\u5468\u4E09", "\u5468\u56DB", "\u5468\u4E94", "\u5468\u516D", "\u5468\u65E5"];
export default defineComponent({
  props: {
    modelValue: {
      type: Object,
      required: true
    }
  },
  emits: ["update:modelValue", "change"],
  setup(props, { attrs, emit }) {
    const randomSeed = randomId();
    const update = (v) => {
      emit("update:modelValue", v);
      emit("change", v);
    };
    return () => /* @__PURE__ */ React.createElement(ElCheckboxGroup, { ...attrs, modelValue: props.modelValue, onChange: update }, Weeks.map((w, i) => /* @__PURE__ */ React.createElement(ElCheckbox, { label: i + 1, key: i + randomSeed }, w)));
  }
});
