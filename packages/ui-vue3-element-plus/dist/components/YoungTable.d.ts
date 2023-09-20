import type { PropType, VNode } from 'vue';
export type TableHeadAligin = 'left' | 'center' | 'right' | undefined;
export interface TableHeadItem<T extends any = any> {
    /**
     * 参数名
     */
    prop: keyof T | 'op';
    /**
     * 展示标题
     */
    label: string;
    /**
     * 列宽
     */
    width?: string;
    /**
     * 是否可排序
     */
    sortable?: boolean;
    /**
     * 是否固定表头
     */
    fixed?: boolean | 'left' | 'right';
    /**
     * 表格位置
     */
    aligin?: TableHeadAligin;
    /**
     * 表头提示
     */
    tool_content?: string;
    /**
     * 仅导出，不展示
     */
    only_export?: boolean;
    /**
     * 仅展示，不导出
     */
    only_display?: boolean;
    /**
     * 渲染函数
     * @param row 当前行的数据
     */
    render?: (row: T, index: number) => VNode;
    /**
     * 当内容过长时，hover 展示全部
     */
    show_overflow_tooltip?: boolean;
    [x: string]: any;
}
export type TableDataItem<T extends any = any> = {
    [key in keyof T]: T[key];
} & Record<string, any>;
declare const _default: import("vue").DefineComponent<{
    tableData: {
        type: PropType<TableDataItem<any>[]>;
        required: true;
    };
    tableHead: {
        type: PropType<TableHeadItem<any>[]>;
        required: true;
    };
    tableHeight: {
        type: (StringConstructor | NumberConstructor)[];
        default: string;
    };
    selectable: {
        type: BooleanConstructor;
        default: boolean;
    };
    rowDraggable: {
        type: BooleanConstructor;
        default: boolean;
    };
    enableCustomHead: {
        type: BooleanConstructor;
        default: boolean;
    };
}, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "row-drag-change"[], "row-drag-change", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    tableData: {
        type: PropType<TableDataItem<any>[]>;
        required: true;
    };
    tableHead: {
        type: PropType<TableHeadItem<any>[]>;
        required: true;
    };
    tableHeight: {
        type: (StringConstructor | NumberConstructor)[];
        default: string;
    };
    selectable: {
        type: BooleanConstructor;
        default: boolean;
    };
    rowDraggable: {
        type: BooleanConstructor;
        default: boolean;
    };
    enableCustomHead: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & {
    "onRow-drag-change"?: ((...args: any[]) => any) | undefined;
}, {
    tableHeight: string | number;
    selectable: boolean;
    rowDraggable: boolean;
    enableCustomHead: boolean;
}>;
export default _default;
