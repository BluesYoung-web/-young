"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
module.exports = void 0;
var _vue = require("vue");
var _elementPlus = require("element-plus");
var _sortablejs = _interopRequireDefault(require("sortablejs"));
var _utils = require("@bluesyoung/utils");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _default = (0, _vue.defineComponent)({
  props: {
    list: {
      required: true,
      type: Object
    }
  },
  emits: ["drag-end", "change"],
  setup(props, {
    emit
  }) {
    (0, _vue.onMounted)(() => {
      const el = document.querySelector(".young-drap-list");
      new _sortablejs.default(el, {
        animation: 150,
        onEnd: ({
          oldIndex,
          newIndex
        }) => {
          oldIndex--;
          newIndex--;
          console.log(oldIndex, newIndex);
          if (oldIndex === newIndex) {
            return;
          }
          const data = props.list;
          const row = (0, _utils.deepClone)(data[oldIndex]);
          data.splice(oldIndex, 1);
          data.splice(newIndex, 0, row);
          emit("drag-end", data);
        }
      });
    });
    function handleChangeCheck(item) {
      emit("change", item, !item.check);
    }
    return () => /* @__PURE__ */React.createElement("div", {
      class: "young-drap-list"
    }, /* @__PURE__ */React.createElement("style", null, `
          .young-drag-list {
            list-style: none;
          }
          
          .young-drag-list-item {
            cursor: move;
            border-radius: 4px;
            color: #333;
            height: 36px;
            line-height: 36px;
            text-align: center;
            display: flex;
            align-items: center;
          }
          
          .young-drag-list-item:hover {
            background: #eee;
          }
          
          .young-drag-list-item.active {
            color: #409eff !important;
          }
          
          .young-drag-list-item .label {
            text-align: left;
            cursor: pointer;
            flex: 1;
            padding: 0 12px 0 0;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            /* \u663E\u793A\u7701\u7565\u53F7 */
          }
          
          .young-drag-list-item .draggable {
            text-align: center;
            display: flex;
            align-items: center;
            padding: 0 12px;
            height: 100%;
          }
          `), props.list.map((item, index) => /* @__PURE__ */React.createElement("div", {
      class: `young-drag-list-item ${item.check ? "active" : ""}`,
      key: item.label
    }, /* @__PURE__ */React.createElement("div", {
      class: "draggable",
      title: "\u62D6\u52A8\u53EF\u6392\u5E8F"
    }, /* @__PURE__ */React.createElement("svg", {
      class: "icon",
      viewBox: "0 0 1024 1024",
      version: "1.1",
      xmlns: "http://www.w3.org/2000/svg",
      "p-id": "6483",
      width: "16",
      height: "16"
    }, /* @__PURE__ */React.createElement("path", {
      d: "M867.995 459.647h-711.99c-27.921 0-52.353 24.434-52.353 52.353s24.434 52.353 52.353 52.353h711.99c27.921 0 52.353-24.434 52.353-52.353s-24.434-52.353-52.353-52.353z",
      "p-id": "6484"
    }), /* @__PURE__ */React.createElement("path", {
      d: "M867.995 763.291h-711.99c-27.921 0-52.353 24.434-52.353 52.353s24.434 52.353 52.353 52.353h711.99c27.921 0 52.353-24.434 52.353-52.353s-24.434-52.353-52.353-52.353z",
      "p-id": "6485"
    }), /* @__PURE__ */React.createElement("path", {
      d: "M156.005 260.709h711.99c27.921 0 52.353-24.434 52.353-52.353s-24.434-52.353-52.353-52.353h-711.99c-27.921 0-52.353 24.434-52.353 52.353s24.434 52.353 52.353 52.353z",
      "p-id": "6486"
    }))), /* @__PURE__ */React.createElement("div", {
      class: "label",
      onClick: e => {
        e.stopPropagation();
        handleChangeCheck(item);
      },
      title: item.label,
      style: {
        display: "flex",
        justifyContent: "space-between"
      },
      draggable: false
    }, /* @__PURE__ */React.createElement("span", null, item.label), /* @__PURE__ */React.createElement(_elementPlus.ElSwitch, {
      modelValue: item.check
    })))));
  }
});
module.exports = _default;