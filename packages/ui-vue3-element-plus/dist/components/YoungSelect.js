"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
module.exports = void 0;
var _vue = require("vue");
var _elementPlus = require("element-plus");
var _utils = require("@bluesyoung/utils");
var _default = (0, _vue.defineComponent)({
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
  setup(props, {
    attrs,
    emit
  }) {
    const randomSeed = (0, _utils.randomId)();
    return () => /* @__PURE__ */React.createElement(_elementPlus.ElSelect, {
      modelValue: props.modelValue,
      "onUpdate:modelValue": v => {
        emit("update:modelValue", v);
        emit("change", v);
      },
      ...attrs
    }, props.options.map((op, index) => /* @__PURE__ */React.createElement(_elementPlus.ElOption, {
      ...op,
      key: index + randomSeed
    })));
  }
});
module.exports = _default;