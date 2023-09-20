"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
module.exports = void 0;
var _vue = require("vue");
var _elementPlus = require("element-plus");
var _ = require("..");
var _utils = require("@bluesyoung/utils");
var _default = (0, _vue.defineComponent)({
  props: {
    modelValue: Object,
    searchScheme: Object,
    fastSearch: {
      type: Boolean,
      default: true
    },
    onSearch: {
      type: Function,
      default: () => console.log("---\u8868\u5355\u5143\u7D20\u89E6\u53D1\u8BF7\u6C42---")
    },
    onReset: {
      type: Function,
      default: () => console.log("---\u89E6\u53D1\u91CD\u7F6E\u8BF7\u6C42---")
    },
    dateTimeKey: {
      type: Array,
      default: () => ["startcreatetime", "endcreatetime"]
    }
  },
  emits: ["update:modelValue"],
  setup(props, {
    attrs,
    emit,
    slots
  }) {
    const form = (0, _vue.ref)({});
    (0, _vue.watch)(() => props.modelValue, v => {
      form.value = (0, _utils.deepClone)(v);
    }, {
      immediate: true,
      deep: true
    });
    const update = (up = true) => {
      emit("update:modelValue", {
        ...form.value
      });
      props.fastSearch && up && props.onSearch();
    };
    const renderItem = key => {
      const conf = props.searchScheme[key];
      if (!conf.attrs) {
        conf.attrs = {};
      }
      const wrapTip = (el, tip) => tip ? /* @__PURE__ */React.createElement(_elementPlus.ElFormItem, {
        label: conf.tip
      }, el) : el;
      const [start, end] = props.dateTimeKey;
      const EleMap = {
        input: () => {
          return wrapTip( /* @__PURE__ */React.createElement(_elementPlus.ElInput, {
            modelValue: form.value[key],
            "onUpdate:modelValue": v => form.value[key] = v?.trim?.(),
            onChange: () => update(false),
            onKeyup: e => (0, _.useKeyUp)(e, () => update()),
            ...conf.attrs
          }), conf.tip);
        },
        number: key2 => wrapTip( /* @__PURE__ */React.createElement(_elementPlus.ElInputNumber, {
          modelValue: form.value[key2],
          "onUpdate:modelValue": v => form.value[key2] = v,
          onChange: () => update(),
          style: {
            width: "120px"
          },
          ...conf.attrs
        }), conf.tip),
        select: key2 => wrapTip( /* @__PURE__ */React.createElement(_.YoungSelect, {
          modelValue: form.value[key2],
          options: conf.options || [],
          "onUpdate:modelValue": v => form.value[key2] = v,
          onChange: () => update(),
          ...conf.attrs
        }), conf.tip),
        // ! 时间范围选择，通常全局只有一个
        datetimerange: key2 => wrapTip( /* @__PURE__ */React.createElement(_.YoungDateRange, {
          start: form.value[start],
          end: form.value[end],
          "onUpdate:start": v => {
            form.value[start] = v;
          },
          "onUpdate:end": v => {
            form.value[end] = v;
          },
          onChange: update,
          ...conf.attrs
        }), conf.tip),
        custom: key2 => wrapTip(conf.render(), conf.tip)
      };
      const elRender = EleMap[conf.type];
      if (elRender) {
        return elRender(key);
      } else {
        throw new Error("unknown search form type");
      }
    };
    const randomSeed = (0, _utils.randomId)();
    return () => /* @__PURE__ */React.createElement("div", {
      style: {
        maxWidth: "100%",
        margin: "auto",
        padding: "20px"
      },
      ...attrs
    }, /* @__PURE__ */React.createElement(_elementPlus.ElForm, {
      model: props.modelValue
    }, /* @__PURE__ */React.createElement("div", {
      style: {
        display: "flex",
        flexWrap: "wrap",
        gap: "10px 20px"
      }
    }, Object.keys(props.searchScheme).map((key, index) => /* @__PURE__ */React.createElement("div", {
      key: index + randomSeed
    }, renderItem(key))), /* @__PURE__ */React.createElement("div", null, slots.custom?.())), /* @__PURE__ */React.createElement("div", {
      style: {
        display: "flex"
      }
    }, /* @__PURE__ */React.createElement(_elementPlus.ElButton, {
      type: "primary",
      onClick: () => props.onSearch()
    }, "\u641C\u7D22"), /* @__PURE__ */React.createElement(_elementPlus.ElButton, {
      onClick: () => props.onReset()
    }, "\u91CD\u7F6E"), slots.btns?.())));
  }
});
module.exports = _default;