import { computed, nextTick, onActivated, ref, watchEffect, defineComponent } from "vue";
import { ElMessage, ElTable, ElTableColumn, ElMessageBox, ElTooltip } from "element-plus";
import CustomHead from "./sub/CustomHead.mjs";
import { deepClone, randomId } from "@bluesyoung/utils";
import { useLocalStorage } from "@vueuse/core";
import { defu } from "defu";
export default defineComponent({
  props: {
    tableData: {
      type: Object,
      required: true
    },
    tableHead: {
      type: Object,
      required: true
    },
    /**
     * 默认勾选表头
     */
    tableHeadCheck: {
      type: Object,
      required: false
    },
    tableHeight: {
      type: [Number, String],
      default: "100%"
    },
    selectable: {
      type: Boolean,
      default: false
    },
    /**
     * 是否开启保存表头格式按钮
     */
    saveTableHead: {
      type: Boolean,
      default: true
    },
    /**
     * 使用历史保存的表头 没有历史表头使用默认勾选表头
     */
    history: {
      type: Boolean,
      default: true
    },
    /**
     * 存储历史id
     */
    historyId: {
      type: String,
      default: ""
    }
  },
  setup(props, { attrs, expose, slots }) {
    const tableRef = ref();
    onActivated(() => {
      nextTick(() => {
        tableRef.value.doLayout();
      });
    });
    const tableData_1 = ref([]);
    const tableHead_1 = ref([]);
    const tableHeadCheck_1 = ref([]);
    watchEffect(() => {
      tableData_1.value = props.tableData;
      nextTick(() => {
        initHead();
      });
    });
    const historyHead = useLocalStorage(`table_pro_tableHead_${props.historyId || location.href.replace(location.origin, "")}`, {});
    const initHead = () => {
      console.log("---------------young table pro init-----------------");
      console.log(`table_pro_tableHead_${props.historyId || location.href.replace(location.origin, "")}`);
      if (props.history) {
        const heads = historyHead.value?.tableHead ?? [];
        heads.forEach((head, index) => {
          const ori = props.tableHead.find((v) => v.prop === head.prop);
          heads[index] = defu(ori, head);
        });
        tableHead_1.value = heads;
        tableHeadCheck_1.value = historyHead.value?.tableHeadCheck ?? [];
        if (tableHeadCheck_1.value.length === 0) {
          initDefaultData();
        }
      } else {
        initDefaultData();
      }
    };
    const initDefaultData = () => {
      tableHead_1.value = deepClone(props.tableHead);
      tableHeadCheck_1.value = props.tableHeadCheck?.length ? deepClone(props.tableHeadCheck) : props.tableHead.map((t) => t.prop);
    };
    const initData = computed(() => {
      return tableHead_1.value.map((t) => {
        t.check = tableHeadCheck_1.value.includes(t.prop);
        return t;
      });
    });
    const filterHeader = computed(() => {
      return initData.value.filter((d) => !d.only_export && d.check);
    });
    const handleChange = (item, check) => {
      const index = tableHeadCheck_1.value.findIndex((e) => e === item.prop);
      if (!check && index != -1) {
        tableHeadCheck_1.value.splice(index, 1);
      } else {
        tableHeadCheck_1.value.push(item.prop);
      }
    };
    const handleDragend = (list) => {
      tableHead_1.value = list;
    };
    const saveTableHead = () => {
      historyHead.value = {
        tableHead: initData.value,
        tableHeadCheck: tableHeadCheck_1.value
      };
      ElMessage.success("\u4FDD\u5B58\u6210\u529F");
    };
    const resetTableHead = () => {
      ElMessageBox.confirm("\u786E\u5B9A\u91CD\u7F6E\u8868\u5934\u5417\uFF1F", "\u63D0\u793A", {
        confirmButtonText: "\u786E\u5B9A",
        cancelButtonText: "\u53D6\u6D88",
        type: "warning"
      }).then(() => {
        historyHead.value = {};
        ElMessage.success("\u91CD\u7F6E\u6210\u529F");
        nextTick(() => {
          initHead();
        });
      });
    };
    const randomKey = randomId();
    expose({
      saveTableHead,
      resetTableHead
    });
    return () => /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("style", null, `
          .nowarp {
            word-break: normal;
          }
          `), /* @__PURE__ */ React.createElement("div", null, props.saveTableHead && /* @__PURE__ */ React.createElement(
      CustomHead,
      {
        tableHead: initData.value.filter((th) => !th.only_export),
        "onDrag-end": handleDragend,
        onChange: handleChange,
        onSave: saveTableHead,
        onReset: resetTableHead
      }
    ), /* @__PURE__ */ React.createElement("div", { style: "position: relative;" }, /* @__PURE__ */ React.createElement(
      ElTable,
      {
        ref: tableRef,
        "header-cell-class-name": "nowarp",
        data: tableData_1.value,
        style: { width: "100%" },
        height: props.tableHeight,
        border: true,
        ...attrs
      },
      props.selectable && /* @__PURE__ */ React.createElement(ElTableColumn, { type: "selection", width: "55" }),
      filterHeader.value.map((item, index) => /* @__PURE__ */ React.createElement(
        ElTableColumn,
        {
          key: item.prop.toString() + index + randomKey,
          prop: item.prop,
          label: item.label,
          width: item.width || "",
          sortable: item.sortable || false,
          fixed: item.fixed || false,
          align: item.aligin || "left",
          showOverflowTooltip: item.show_overflow_tooltip ?? true
        },
        {
          header: (scope) => {
            if (tableHead_1.value[index].tool_content) {
              return /* @__PURE__ */ React.createElement(
                "div",
                {
                  style: {
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                  }
                },
                /* @__PURE__ */ React.createElement("span", { class: "nowarp", title: item.label }, scope.column.label),
                /* @__PURE__ */ React.createElement(
                  ElTooltip,
                  {
                    placement: "bottom",
                    "v-slots": { content: () => tableHead_1.value[index].tool_content }
                  },
                  /* @__PURE__ */ React.createElement(
                    "svg",
                    {
                      xmlns: "http://www.w3.org/2000/svg",
                      width: "1.2em",
                      height: "1.2em",
                      viewBox: "0 0 256 256"
                    },
                    /* @__PURE__ */ React.createElement(
                      "path",
                      {
                        fill: "currentColor",
                        d: "M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24Zm0 168a12 12 0 1 1 12-12a12 12 0 0 1-12 12Zm8-48.72v.72a8 8 0 0 1-16 0v-8a8 8 0 0 1 8-8c13.23 0 24-9 24-20s-10.77-20-24-20s-24 9-24 20v4a8 8 0 0 1-16 0v-4c0-19.85 17.94-36 40-36s40 16.15 40 36c0 17.38-13.76 31.93-32 35.28Z"
                      }
                    )
                  )
                )
              );
            } else {
              return /* @__PURE__ */ React.createElement("span", { class: "nowarp", title: item.label }, scope.column.label);
            }
          },
          default: ({ row, $index }) => {
            if (item.render) {
              return item.render(row, $index);
            } else {
              return /* @__PURE__ */ React.createElement("span", null, row[item.prop]);
            }
          }
        }
      )),
      slots.switch?.(),
      slots.operate?.()
    ))));
  }
});
