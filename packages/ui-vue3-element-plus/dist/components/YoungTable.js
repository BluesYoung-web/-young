"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
module.exports = void 0;
var _vue = require("vue");
var _utils = require("@bluesyoung/utils");
var _elementPlus = require("element-plus");
var _ = require("..");
var _default = (0, _vue.defineComponent)({
  props: {
    tableData: {
      type: Object,
      required: true
    },
    tableHead: {
      type: Object,
      required: true
    },
    tableHeight: {
      type: [Number, String],
      default: "100%"
    },
    selectable: {
      type: Boolean,
      default: false
    },
    rowDraggable: {
      type: Boolean,
      default: false
    },
    enableCustomHead: {
      type: Boolean,
      default: false
    }
  },
  emits: ["row-drag-change"],
  setup(props, {
    emit,
    attrs,
    slots
  }) {
    (0, _vue.onMounted)(async () => {
      if (props.rowDraggable) {
        const {
          default: Sortable
        } = await Promise.resolve().then(() => require("sortablejs"));
        if (props.rowDraggable) {
          const el = tableRef.value.$el.querySelector("tbody");
          el.style.cursor = "move";
          new Sortable(el, {
            animation: 150,
            onEnd: ({
              oldIndex,
              newIndex
            }) => {
              if (oldIndex === newIndex) {
                return;
              }
              const data = tableData_drag.value;
              const row = (0, _utils.deepClone)(data[oldIndex]);
              data.splice(oldIndex, 1);
              data.splice(newIndex, 0, row);
              emit("row-drag-change", tableData_drag.value);
            }
          });
        }
      }
    });
    const tableRef = (0, _vue.ref)();
    (0, _vue.onActivated)(() => {
      (0, _vue.nextTick)(() => {
        tableRef.value.doLayout();
      });
    });
    const tableData_1 = (0, _vue.ref)([]);
    const tableHead_1 = (0, _vue.ref)([]);
    const tableData_drag = (0, _vue.ref)([]);
    (0, _vue.watchEffect)(() => {
      const t1 = props.tableData;
      const t2 = props.tableHead;
      const len = t1.length;
      (0, _vue.nextTick)(() => {
        tableHead_1.value = t2.filter(item => !item.only_export);
        const step = 50;
        if (len <= step) {
          tableData_1.value = (0, _utils.deepClone)(t1);
          tableData_drag.value = (0, _utils.deepClone)(t1);
        } else {
          const {
            elArr,
            load
          } = (0, _.useAutoLoad)(tableData_1, (0, _vue.ref)(t1), step);
          const {
            elArr: elArr_drag,
            load: load_drag
          } = (0, _.useAutoLoad)(tableData_drag, (0, _vue.ref)(t1), step);
          let n = 0;
          tableData_1.value = t1.slice(n, step);
          tableData_drag.value = t1.slice(n, step);
          (0, _vue.nextTick)(() => {
            elArr.value = tableRef.value.$el.querySelector("tbody").children;
            load();
          });
          (0, _vue.nextTick)(() => {
            elArr_drag.value = tableRef.value.$el.querySelector("tbody").children;
            load_drag();
          });
        }
      });
    });
    const changeHead = heads => {
      tableHead_1.value = props.tableHead.filter(item => !item.only_export && heads.includes(item.prop));
    };
    return () => /* @__PURE__ */React.createElement("div", {
      style: {
        position: "relative"
      }
    }, /* @__PURE__ */React.createElement(_elementPlus.ElTable, {
      ...attrs,
      ref: tableRef,
      data: tableData_1.value,
      style: {
        width: "100%"
      },
      height: props.tableHeight
    }, props.selectable && /* @__PURE__ */React.createElement(_elementPlus.ElTableColumn, {
      type: "selection",
      width: "55"
    }), tableHead_1.value.map((head, index) => /* @__PURE__ */React.createElement(_elementPlus.ElTableColumn, {
      key: index,
      prop: head.prop,
      label: head.label,
      width: head.width || "",
      sortable: head.sortable || false,
      fixed: head.fixed || false,
      align: head.aligin || "left",
      showOverflowTooltip: head.show_overflow_tooltip ?? true,
      "v-slots": {
        header: scope => {
          if (tableHead_1.value[index].tool_content) {
            return /* @__PURE__ */React.createElement("div", {
              style: {
                display: head.sortable ? "inline-block" : "flex",
                justifyContent: "center",
                alignItems: "center"
              }
            }, /* @__PURE__ */React.createElement("span", null, scope.column.label), /* @__PURE__ */React.createElement(_elementPlus.ElTooltip, {
              placement: "bottom",
              "v-slots": {
                content: () => tableHead_1.value[index].tool_content
              }
            }, /* @__PURE__ */React.createElement("svg", {
              xmlns: "http://www.w3.org/2000/svg",
              width: "1.2em",
              height: "1.2em",
              viewBox: "0 0 256 256"
            }, /* @__PURE__ */React.createElement("path", {
              fill: "currentColor",
              d: "M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24Zm0 168a12 12 0 1 1 12-12a12 12 0 0 1-12 12Zm8-48.72v.72a8 8 0 0 1-16 0v-8a8 8 0 0 1 8-8c13.23 0 24-9 24-20s-10.77-20-24-20s-24 9-24 20v4a8 8 0 0 1-16 0v-4c0-19.85 17.94-36 40-36s40 16.15 40 36c0 17.38-13.76 31.93-32 35.28Z"
            }))));
          } else {
            return /* @__PURE__ */React.createElement("span", null, scope.column.label);
          }
        },
        default: scope => {
          if (head.render) {
            return head.render(scope.row, scope.$index);
          } else {
            return /* @__PURE__ */React.createElement("span", null, scope.row[head.prop]);
          }
        }
      }
    })), slots.switch?.(), slots.operate?.()), props.enableCustomHead && /* @__PURE__ */React.createElement(_elementPlus.ElPopover, {
      trigger: "click",
      placement: "bottom-end",
      width: 200
    }, {
      reference: () => /* @__PURE__ */React.createElement("div", {
        style: {
          position: "absolute",
          top: 0,
          right: 0,
          zIndex: 2,
          cursor: "pointer"
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
      }))),
      default: () => /* @__PURE__ */React.createElement(React.Fragment, null, /* @__PURE__ */React.createElement("div", {
        style: {
          marginBottom: "10px",
          textAlign: "center",
          fontWeight: "bold"
        }
      }, "\u81EA\u5B9A\u4E49\u5C55\u793A\u7684\u8868\u5934"), /* @__PURE__ */React.createElement(_elementPlus.ElCheckboxGroup, {
        style: {
          maxHeight: "350px",
          overflowY: "auto"
        },
        modelValue: tableHead_1.value.map(item => item.prop),
        "onUpdate:modelValue": changeHead
      }, props.tableHead.filter(item => !item.only_export).map((item, index) =>
      // @ts-ignore
      /* @__PURE__ */
      React.createElement(_elementPlus.ElCheckbox, {
        label: item.prop,
        key: index,
        title: item.label
      }, item.label))))
    }));
  }
});
module.exports = _default;