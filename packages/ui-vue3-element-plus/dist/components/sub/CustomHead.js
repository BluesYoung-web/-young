"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
module.exports = void 0;
var _elementPlus = require("element-plus");
var _vue = require("vue");
var _Drag = _interopRequireDefault(require("./Drag"));
var _core = require("@vueuse/core");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _default = (0, _vue.defineComponent)({
  props: {
    tableHead: {
      required: true,
      type: Object
    }
  },
  emits: ["drag-end", "change", "save", "reset"],
  setup(props, {
    emit
  }) {
    const showPopover = (0, _vue.ref)(false);
    const handleDragend = list => {
      emit("drag-end", list);
    };
    const handleChange = (item, check) => {
      emit("change", item, check);
    };
    (0, _vue.onMounted)(() => {
      (0, _core.useEventListener)("click", e => {
        showPopover.value = false;
      });
    });
    const ltSm = (0, _core.useMediaQuery)("(max-width: 639.9px)");
    return () => /* @__PURE__ */React.createElement(React.Fragment, null, /* @__PURE__ */React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "flex-end",
        paddingBottom: "10px",
        cursor: "pointer"
      },
      onClick: e => {
        e.stopPropagation();
        showPopover.value = true;
      },
      title: "\u8868\u5934\u914D\u7F6E"
    }, /* @__PURE__ */React.createElement("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      width: "1.5rem",
      height: "1.5rem",
      viewBox: "0 0 24 24"
    }, /* @__PURE__ */React.createElement("path", {
      fill: "currentColor",
      d: "M13.875 22h-3.75q-.375 0-.65-.25t-.325-.625l-.3-2.325q-.325-.125-.613-.3t-.562-.375l-2.175.9q-.35.125-.7.025t-.55-.425L2.4 15.4q-.2-.325-.125-.7t.375-.6l1.875-1.425Q4.5 12.5 4.5 12.337v-.674q0-.163.025-.338L2.65 9.9q-.3-.225-.375-.6t.125-.7l1.85-3.225q.175-.35.537-.438t.713.038l2.175.9q.275-.2.575-.375t.6-.3l.3-2.325q.05-.375.325-.625t.65-.25h3.75q.375 0 .65.25t.325.625l.3 2.325q.325.125.613.3t.562.375l2.175-.9q.35-.125.7-.025t.55.425L21.6 8.6q.2.325.125.7t-.375.6l-1.875 1.425q.025.175.025.338v.674q0 .163-.05.338l1.875 1.425q.3.225.375.6t-.125.7l-1.85 3.2q-.2.325-.563.438t-.712-.013l-2.125-.9q-.275.2-.575.375t-.6.3l-.3 2.325q-.05.375-.325.625t-.65.25Zm-1.825-6.5q1.45 0 2.475-1.025T15.55 12q0-1.45-1.025-2.475T12.05 8.5q-1.475 0-2.488 1.025T8.55 12q0 1.45 1.012 2.475T12.05 15.5Zm0-2q-.625 0-1.063-.438T10.55 12q0-.625.438-1.063t1.062-.437q.625 0 1.063.438T13.55 12q0 .625-.438 1.063t-1.062.437ZM12 12Zm-1 8h1.975l.35-2.65q.775-.2 1.438-.588t1.212-.937l2.475 1.025l.975-1.7l-2.15-1.625q.125-.35.175-.737T17.5 12q0-.4-.05-.787t-.175-.738l2.15-1.625l-.975-1.7l-2.475 1.05q-.55-.575-1.212-.962t-1.438-.588L13 4h-1.975l-.35 2.65q-.775.2-1.437.588t-1.213.937L5.55 7.15l-.975 1.7l2.15 1.6q-.125.375-.175.75t-.05.8q0 .4.05.775t.175.75l-2.15 1.625l.975 1.7l2.475-1.05q.55.575 1.213.963t1.437.587L11 20Z"
    }))), /* @__PURE__ */React.createElement(_elementPlus.ElDrawer, {
      modelValue: showPopover.value,
      withHeader: false,
      "onUpdate:modelValue": e => showPopover.value = e,
      size: ltSm.value ? "75%" : "30%"
    }, {
      default: () => /* @__PURE__ */React.createElement(React.Fragment, null, /* @__PURE__ */React.createElement("div", {
        style: {
          color: "#999",
          textAlign: "center",
          padding: "10px"
        }
      }, "\u62D6\u52A8\u53EF\u6392\u5E8F\uFF0C\u70B9\u51FB\u53EF\u4EE5\u5207\u6362\u5C55\u793A\u72B6\u6001"), /* @__PURE__ */React.createElement(_Drag.default, {
        list: props.tableHead,
        "onDrag-end": handleDragend,
        onChange: handleChange
      })),
      footer: () => /* @__PURE__ */React.createElement("div", {
        style: {
          textAlign: "left"
        }
      }, /* @__PURE__ */React.createElement(_elementPlus.ElTooltip, {
        content: "\u4FDD\u5B58\u914D\u7F6E\u5230\u672C\u5730\uFF0C\u5982\u679C\u4E0D\u4FDD\u5B58\uFF0C\u5219\u9875\u9762\u5237\u65B0\u4E4B\u540E\u4F1A\u4E22\u5931\u73B0\u6709\u7684\u4E2A\u6027\u5316\u914D\u7F6E"
      }, /* @__PURE__ */React.createElement(_elementPlus.ElButton, {
        type: "primary",
        onClick: () => emit("save")
      }, "\u4FDD\u5B58")), /* @__PURE__ */React.createElement(_elementPlus.ElTooltip, {
        content: "\u5FEB\u901F\u6062\u590D\u9ED8\u8BA4\u914D\u7F6E"
      }, /* @__PURE__ */React.createElement(_elementPlus.ElButton, {
        onClick: () => emit("reset")
      }, "\u91CD\u7F6E")))
    }));
  }
});
module.exports = _default;