/*
 * @Author: zhangyang
 * @Date: 2023-01-09 10:45:53
 * @LastEditTime: 2023-02-08 08:45:00
 * @Description:
 */
import { ElMessage } from 'element-plus';
import type { TableHeadItem, TableDataItem } from '..';
import { ElLoadingService } from 'element-plus';
import { renderToString } from 'vue/server-renderer';
import { export_json_to_excel } from './tools/export2excel';

interface ExportParams {
  /**
   * 导出的文件名，不需要带扩展名
   */
  filename: string;
  /**
   * 表头
   */
  tableHead: TableHeadItem[];
  /**
   * 表格数据
   */
  tableData: TableDataItem[];
}

/**
 * 表格数据导出为 Excel
 */
export const useExport2Excel = async ({ filename, tableHead, tableData }: ExportParams) => {
  /**
   * 提取HTML标签包含的文字
   * @param {string} htmlText 包含 HTML 标签的字符串
   */
  const tagReplace = (htmlText: string) => {
    let reg = /<\/?.+?\/?>/g;
    if (reg.test(htmlText)) {
      return htmlText.replace(reg, '');
    } else {
      return htmlText;
    }
  };

  /**
   * 导出数据格式化
   * @param {Array} filterVal 表头字段（用于获取对应的数据）
   * @param {Array} jsonData 表数据
   */
  const formatJson = async (
    tableHead: TableHeadItem[],
    tableData: TableDataItem[],
  ): Promise<string[][]> => {
    const arr: string[][] = [];
    for (const it of tableData) {
      const row: string[] = [];
      const len = tableHead.length;
      for (let i = 0; i < len; i++) {
        const item = tableHead[i];
        let r = it[item.prop as string];
        if (item.render) {
          const vnode = item.render(it, i);
          if (vnode && Array.isArray(vnode.children) && vnode.children.length > 1) {
            vnode.children.forEach((v: any) => {
              if (v && typeof v.children === 'string') {
                v.children += '\n';
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
    text: '数据导出中...',
    background: 'rgba(0, 0, 0, 0.7)',
  });

  return new Promise((resolve) => {
    // hack 不延迟执行的话，loading 效果展示不出来
    setTimeout(async () => {
      const data = await formatJson(ths, tableData);

      await export_json_to_excel({
        header,
        data,
        filename,
      });

      loading.close();
      ElMessage.success('导出成功！');

      resolve(true);
    }, 500);
  });
};
