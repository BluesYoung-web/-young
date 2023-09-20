import type { TableHeadItem, TableDataItem } from '..';
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
export declare const useExport2Excel: ({ filename, tableHead, tableData }: ExportParams) => Promise<unknown>;
export {};
