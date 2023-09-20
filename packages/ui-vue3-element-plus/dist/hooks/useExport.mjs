import { ElMessage } from "element-plus";
import { ElLoadingService } from "element-plus";
import { renderToString } from "vue/server-renderer";
import { export_json_to_excel } from "./tools/export2excel.mjs";
export const useExport2Excel = async ({ filename, tableHead, tableData }) => {
  const tagReplace = (htmlText) => {
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
            vnode.children.forEach((v) => {
              if (v && typeof v.children === "string") {
                v.children += "\n";
              }
            });
          }
          r = await renderToString(vnode);
        }
        r = tagReplace(r);
        row.push(r);
      }
      arr.push(row);
    }
    return arr;
  };
  const ths = tableHead.filter((item) => !item.only_display);
  const header = ths.map((item) => item.label);
  const loading = ElLoadingService({
    lock: true,
    text: "\u6570\u636E\u5BFC\u51FA\u4E2D...",
    background: "rgba(0, 0, 0, 0.7)"
  });
  return new Promise((resolve) => {
    setTimeout(async () => {
      const data = await formatJson(ths, tableData);
      await export_json_to_excel({
        header,
        data,
        filename
      });
      loading.close();
      ElMessage.success("\u5BFC\u51FA\u6210\u529F\uFF01");
      resolve(true);
    }, 500);
  });
};
