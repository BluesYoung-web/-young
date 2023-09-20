import type { VNode } from 'vue';
export type SelectOptionItem<T extends any = any> = {
    label: string;
    value: T;
    disabled?: boolean;
    children?: SelectOptionItem<T>[];
};
export type YoungImageViewerConf = {
    /**
     * 图片目录
     */
    srcList: string[];
    /**
     * 当前为第几张
     */
    index?: number;
};
export type TableHeadAligin = 'left' | 'center' | 'right' | undefined;
export type TableHeadItem<T extends any = any> = {
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
};
export type TableDataItem<T extends any = any> = {
    [key in keyof T]: T[key];
} & Record<string, any>;
export type YoungSearchFormType = 'input' | 'number' | 'select' | 'datetimerange' | 'custom';
export type YoungSearchFormItem = {
    /**
     * 表单元素的类型
     */
    type: YoungSearchFormType;
    /**
     * 是否拥有前缀提示
     */
    tip?: string;
    /**
     * 下拉专属选项
     */
    options?: SelectOptionItem[];
    /**
     * 自定义搜索项的渲染函数
     */
    render?: () => JSX.Element;
    /**
     * 透传给元素的其他属性
     */
    attrs?: {
        placeholder?: string;
        title?: string;
        class?: string;
        style?: string;
        clearable?: boolean;
        disabled?: boolean;
        [props: string]: any;
    };
};
export type YoungSearchScheme<T extends any = any> = {
    [prop in keyof T]?: YoungSearchFormItem;
};
export type TableHeadItemPro = TableHeadItem & {
    check?: boolean;
};
