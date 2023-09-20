"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
module.exports = void 0;
var _vue = require("vue");
var _elementPlus = require("element-plus");
var _utils = require("@bluesyoung/utils");
const Weeks = ["\u5468\u4E00", "\u5468\u4E8C", "\u5468\u4E09", "\u5468\u56DB", "\u5468\u4E94", "\u5468\u516D", "\u5468\u65E5"];
var _default = (0, _vue.defineComponent)({
  props: {
    modelValue: {
      type: Object,
      required: true
    }
  },
  emits: ["update:modelValue", "change"],
  setup(props, {
    attrs,
    emit
  }) {
    const randomSeed = (0, _utils.randomId)();
    const update = v => {
      emit("update:modelValue", v);
      emit("change", v);
    };
    return () => /* @__PURE__ */React.createElement(_elementPlus.ElCheckboxGroup, {
      ...attrs,
      modelValue: props.modelValue,
      onChange: update
    }, Weeks.map((w, i) => /* @__PURE__ */React.createElement(_elementPlus.ElCheckbox, {
      label: i + 1,
      key: i + randomSeed
    }, w)));
  }
});
module.exports = _default;