"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useExport2Excel = void 0;
var _elementPlus = require("element-plus");
var _serverRenderer = require("vue/server-renderer");
var _export2excel = require("./tools/export2excel");
const useExport2Excel = async ({
  filename,
  tableHead,
  tableData
}) => {
  const tagReplace = htmlText => {
    let reg = /<\/?.+?\/?>/g;
    if (reg.test(htmlText)) {
      return htmlText.replace(reg, "");
    } else {
      return htmlText;
    }
  };
  const formatJson = async (tableHead2, tableData2) => {
    const arr = [];
    for (const it of tableData2) {
      const row = [];
      const len = tableHead2.length;
      for (let i = 0; i < len; i++) {
        const item = tableHead2[i];
        let r = it[item.prop];
        if (item.render) {
          const vnode = item.render(it, i);
          if (vnode && Array.isArray(vnode.children) && vnode.children.length > 1) {
            vnode.children.forEach(v => {
              if (v && typeof v.children === "string") {
                v.children += "\n";
              }
            });
          }
          r = await (0, _serverRenderer.renderToString)(vnode);
        }
        r = tagReplace(r);
        row.push(r);
      }
      arr.push(row);
    }
    return arr;
  };
  const ths = tableHead.filter(item => !item.only_display);
  const header = ths.map(item => item.label);
  const loading = (0, _elementPlus.ElLoadingService)({
    lock: true,
    text: "\u6570\u636E\u5BFC\u51FA\u4E2D...",
    background: "rgba(0, 0, 0, 0.7)"
  });
  return new Promise(resolve => {
    setTimeout(async () => {
      const data = await formatJson(ths, tableData);
      await (0, _export2excel.export_json_to_excel)({
        header,
        data,
        filename
      });
      loading.close();
      _elementPlus.ElMessage.success("\u5BFC\u51FA\u6210\u529F\uFF01");
      resolve(true);
    }, 500);
  });
};
exports.useExport2Excel = useExport2Excel;