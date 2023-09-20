"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
module.exports = void 0;
var _core = require("@vueuse/core");
var _elementPlus = require("element-plus");
var _vue = require("vue");
var _default = (0, _vue.defineComponent)({
  props: {
    modelValue: Boolean,
    realTitle: String,
    width: {
      type: [String, Number],
      default: "50%"
    },
    sureText: {
      type: String,
      default: "\u786E\u5B9A"
    },
    cancelText: {
      type: String,
      default: "\u53D6\u6D88"
    },
    showSure: {
      type: Boolean,
      default: true
    },
    showCancel: {
      type: Boolean,
      default: true
    },
    isAdd: Boolean,
    isEdit: Boolean,
    isMore: Boolean,
    sureFn: Function,
    /**
     * 对比 form 表单
     */
    diffForm: {
      type: Object,
      default: null
    },
    as: {
      type: String,
      default: "drawer"
    }
  },
  emits: ["sure", "clear", "update:modelValue"],
  setup(props, {
    emit,
    attrs,
    slots
  }) {
    const formHash_before = (0, _vue.ref)("");
    const title = (0, _vue.computed)(() => {
      let str = "\u65B0\u5EFA";
      if (props.isEdit) str = "\u7F16\u8F91";
      if (props.isMore) str = "\u8BE6\u60C5";
      return str;
    });
    const showDialog = (0, _vue.computed)({
      get: () => props.isAdd || props.isMore || props.isEdit,
      set: v => null
    });
    props.diffForm && (0, _vue.watch)(() => showDialog.value, (v, o) => {
      if (v && !o) formHash_before.value = JSON.stringify(props.diffForm);
    });
    props.diffForm && (0, _vue.watch)(() => props.modelValue, (v, o) => {
      if (v && !o) formHash_before.value = JSON.stringify(props.diffForm);
    });
    const sure = async () => {
      if (props.sureFn) {
        const res = await props.sureFn();
        if (res === false) return;
      }
      if (props.isMore) {
        emit("clear");
        return;
      }
      emit("update:modelValue", false);
      emit("sure");
    };
    const beforeClose = () => {
      const formHash_after = JSON.stringify(props.diffForm);
      if (props.isMore || !props.showCancel) {
        emit("clear");
        emit("update:modelValue", false);
        return;
      }
      if (props.diffForm && formHash_before.value === formHash_after) {
        emit("clear");
        emit("update:modelValue", false);
      } else {
        _elementPlus.ElMessageBox.confirm("\u6570\u636E\u672A\u4FDD\u5B58\uFF0C\u5173\u95ED\u5C06\u4E22\u5931\u6570\u636E\uFF0C\u786E\u8BA4\u5173\u95ED\uFF1F", "\u63D0\u793A", {
          confirmButtonText: "\u786E\u8BA4",
          cancelButtonText: "\u53D6\u6D88"
        }).then(() => {
          emit("update:modelValue", false);
          emit("clear");
        }).catch(() => null);
      }
    };
    const ltLg = (0, _core.useMediaQuery)("(max-width: 1023.9px)");
    return () => /* @__PURE__ */React.createElement(_vue.Teleport, {
      to: "body"
    }, props.as === "dialog" && /* @__PURE__ */React.createElement(_elementPlus.ElDialog, {
      ...attrs,
      modelValue: props.modelValue || showDialog.value,
      title: props.realTitle || title.value,
      width: ltLg.value ? "96%" : props.width,
      closeOnClickModal: true,
      closeOnPressEscape: false,
      beforeClose,
      "v-slots": {
        default: () => /* @__PURE__ */React.createElement(React.Fragment, null, slots.default?.(), slots.body?.()),
        footer: () => {
          return /* @__PURE__ */React.createElement(React.Fragment, null, slots.button?.(), props.showCancel && /* @__PURE__ */React.createElement(_elementPlus.ElButton, {
            onClick: () => beforeClose()
          }, props.cancelText), slots.step1?.(), slots.step2?.(), props.showSure && /* @__PURE__ */React.createElement(_elementPlus.ElButton, {
            type: "primary",
            onClick: () => sure()
          }, props.sureText));
        }
      }
    }), props.as === "drawer" && /* @__PURE__ */React.createElement(_elementPlus.ElDrawer, {
      ...attrs,
      modelValue: props.modelValue || showDialog.value,
      title: props.realTitle || title.value,
      size: ltLg.value ? "96%" : props.width,
      closeOnClickModal: true,
      closeOnPressEscape: false,
      beforeClose,
      "v-slots": {
        default: () => /* @__PURE__ */React.createElement(React.Fragment, null, slots.default?.(), slots.body?.()),
        footer: () => {
          return /* @__PURE__ */React.createElement(React.Fragment, null, slots.button?.(), props.showCancel && /* @__PURE__ */React.createElement(_elementPlus.ElButton, {
            onClick: () => beforeClose()
          }, props.cancelText), slots.step1?.(), slots.step2?.(), props.showSure && /* @__PURE__ */React.createElement(_elementPlus.ElButton, {
            type: "primary",
            onClick: () => sure()
          }, props.sureText));
        }
      }
    }));
  }
});
module.exports = _default;