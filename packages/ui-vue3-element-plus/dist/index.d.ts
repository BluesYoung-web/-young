import * as vue from 'vue';
import { VNode, PropType, Ref } from 'vue';

declare type TableHeadAligin = 'left' | 'center' | 'right' | undefined;
interface TableHeadItem<T extends any = any> {
    /**
     * 参数名
     */
    prop: keyof T;
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
declare type TableDataItem<T extends any = any> = {
    [key in keyof T]: T[key];
} & Record<string, any>;
declare const _default$6: vue.DefineComponent<{
    tableData: {
        type: PropType<TableDataItem<any>[]>;
        required: true;
    };
    tableHead: {
        type: PropType<TableDataItem<any>[]>;
        required: true;
    };
    tableHeight: {
        type: NumberConstructor;
        default: number;
    };
    selectable: {
        type: BooleanConstructor;
        default: boolean;
    };
}, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, ("sort-change" | "selection-change")[], "sort-change" | "selection-change", vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<vue.ExtractPropTypes<{
    tableData: {
        type: PropType<TableDataItem<any>[]>;
        required: true;
    };
    tableHead: {
        type: PropType<TableDataItem<any>[]>;
        required: true;
    };
    tableHeight: {
        type: NumberConstructor;
        default: number;
    };
    selectable: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & {
    "onSort-change"?: (...args: any[]) => any;
    "onSelection-change"?: (...args: any[]) => any;
}, {
    tableHeight: number;
    selectable: boolean;
}>;

declare const _default$5: vue.DefineComponent<{
    total: {
        readonly type: NumberConstructor;
        readonly required: true;
    };
    page: {
        readonly type: NumberConstructor;
        readonly required: true;
    };
    limit: {
        readonly type: NumberConstructor;
        readonly required: true;
    };
    pageSizes: {
        type: PropType<number[]>;
        default: () => number[];
    };
    layout: {
        type: StringConstructor;
        default: string;
    };
    background: {
        type: BooleanConstructor;
        default: boolean;
    };
    autoScroll: {
        type: BooleanConstructor;
        default: boolean;
    };
    hidden: {
        type: BooleanConstructor;
        default: boolean;
    };
}, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, ("page-change" | "update:page" | "update:limit")[], "page-change" | "update:page" | "update:limit", vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<vue.ExtractPropTypes<{
    total: {
        readonly type: NumberConstructor;
        readonly required: true;
    };
    page: {
        readonly type: NumberConstructor;
        readonly required: true;
    };
    limit: {
        readonly type: NumberConstructor;
        readonly required: true;
    };
    pageSizes: {
        type: PropType<number[]>;
        default: () => number[];
    };
    layout: {
        type: StringConstructor;
        default: string;
    };
    background: {
        type: BooleanConstructor;
        default: boolean;
    };
    autoScroll: {
        type: BooleanConstructor;
        default: boolean;
    };
    hidden: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & {
    "onPage-change"?: (...args: any[]) => any;
    "onUpdate:page"?: (...args: any[]) => any;
    "onUpdate:limit"?: (...args: any[]) => any;
}, {
    layout: string;
    pageSizes: number[];
    background: boolean;
    autoScroll: boolean;
    hidden: boolean;
}>;

declare const _default$4: vue.DefineComponent<{
    modelValue: BooleanConstructor;
    realTitle: StringConstructor;
    sureText: {
        type: StringConstructor;
        default: string;
    };
    cancelText: {
        type: StringConstructor;
        default: string;
    };
    showSure: {
        type: BooleanConstructor;
        default: boolean;
    };
    showCancel: {
        type: BooleanConstructor;
        default: boolean;
    };
    isAdd: BooleanConstructor;
    isEdit: BooleanConstructor;
    isMore: BooleanConstructor;
    sureFn: FunctionConstructor;
}, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, ("sure" | "clear" | "update:modelValue")[], "sure" | "clear" | "update:modelValue", vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<vue.ExtractPropTypes<{
    modelValue: BooleanConstructor;
    realTitle: StringConstructor;
    sureText: {
        type: StringConstructor;
        default: string;
    };
    cancelText: {
        type: StringConstructor;
        default: string;
    };
    showSure: {
        type: BooleanConstructor;
        default: boolean;
    };
    showCancel: {
        type: BooleanConstructor;
        default: boolean;
    };
    isAdd: BooleanConstructor;
    isEdit: BooleanConstructor;
    isMore: BooleanConstructor;
    sureFn: FunctionConstructor;
}>> & {
    onSure?: (...args: any[]) => any;
    onClear?: (...args: any[]) => any;
    "onUpdate:modelValue"?: (...args: any[]) => any;
}, {
    modelValue: boolean;
    sureText: string;
    cancelText: string;
    showSure: boolean;
    showCancel: boolean;
    isAdd: boolean;
    isEdit: boolean;
    isMore: boolean;
}>;

declare type SelectOptionItem<T extends any = any> = {
    label: string;
    value: T;
    disabled?: boolean;
    children?: SelectOptionItem<T>[];
};
declare const _default$3: vue.DefineComponent<{
    options: {
        type: PropType<SelectOptionItem<any>[]>;
        required: true;
    };
}, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<vue.ExtractPropTypes<{
    options: {
        type: PropType<SelectOptionItem<any>[]>;
        required: true;
    };
}>>, {}>;

declare const _default$2: vue.DefineComponent<{
    modelValue: {
        type: PropType<number[]>;
        required: true;
    };
}, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<vue.ExtractPropTypes<{
    modelValue: {
        type: PropType<number[]>;
        required: true;
    };
}>> & {
    "onUpdate:modelValue"?: (...args: any[]) => any;
}, {}>;

declare const _default$1: vue.DefineComponent<{
    start: {
        type: StringConstructor;
        required: true;
    };
    end: {
        type: StringConstructor;
        required: true;
    };
    startTime: {
        type: StringConstructor;
        default: string;
    };
    endTime: {
        type: StringConstructor;
        default: string;
    };
    step: {
        type: StringConstructor;
        default: string;
    };
}, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, ("update:start" | "update:end")[], "update:start" | "update:end", vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<vue.ExtractPropTypes<{
    start: {
        type: StringConstructor;
        required: true;
    };
    end: {
        type: StringConstructor;
        required: true;
    };
    startTime: {
        type: StringConstructor;
        default: string;
    };
    endTime: {
        type: StringConstructor;
        default: string;
    };
    step: {
        type: StringConstructor;
        default: string;
    };
}>> & {
    "onUpdate:start"?: (...args: any[]) => any;
    "onUpdate:end"?: (...args: any[]) => any;
}, {
    startTime: string;
    endTime: string;
    step: string;
}>;

declare const _default: vue.DefineComponent<{
    start: {
        type: (NumberConstructor | StringConstructor)[];
        default: string;
    };
    end: {
        type: (NumberConstructor | StringConstructor)[];
        default: string;
    };
    unix: {
        type: BooleanConstructor;
        default: boolean;
    };
}, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, ("update:start" | "update:end")[], "update:start" | "update:end", vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<vue.ExtractPropTypes<{
    start: {
        type: (NumberConstructor | StringConstructor)[];
        default: string;
    };
    end: {
        type: (NumberConstructor | StringConstructor)[];
        default: string;
    };
    unix: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & {
    "onUpdate:start"?: (...args: any[]) => any;
    "onUpdate:end"?: (...args: any[]) => any;
}, {
    start: string | number;
    end: string | number;
    unix: boolean;
}>;

declare const useAutoLoad: <T>(list: Ref<T[]>, allData: Ref<T[]>, pageSize?: number, pause?: Ref<boolean>) => {
    elArr: Ref<HTMLDivElement[]>;
    touchEndEl: Ref<boolean>;
    page: Ref<number>;
    load: () => void;
};

declare type Cbk<T> = {
    addCbk?: () => Promise<void | boolean>;
    modCbk?: () => Promise<void | boolean>;
    delCbk?: (row: T) => void;
    cpEffect?: (row: T) => void | Promise<void | T>;
    cgEffect?: () => void;
    clearEffect?: () => void;
    disableclear?: boolean;
};
declare type ValidFn = () => Promise<boolean>;
declare const useFormMode: <T>(FORM_TEMP: T, { addCbk, modCbk, delCbk, cpEffect, cgEffect, clearEffect, disableclear }: Cbk<T>, tip?: string) => {
    isAdd: vue.Ref<boolean>;
    isEdit: vue.Ref<boolean>;
    isMore: vue.Ref<boolean>;
    clear: () => void;
    edit: (row: any) => Promise<void>;
    more: (row: any) => Promise<void>;
    form: vue.Ref<vue.UnwrapRef<T>>;
    del: (row: any) => void;
    sure: () => Promise<void>;
    formRef: vue.Ref<any>;
    validForm: ValidFn;
};

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
declare const useExport2Excel: ({ filename, tableHead, tableData }: ExportParams) => Promise<unknown>;

export { SelectOptionItem, TableDataItem, TableHeadItem, _default as YoungDateRange, _default$4 as YoungDialog, _default$5 as YoungPagination, _default$3 as YoungSelect, _default$6 as YoungTable, _default$1 as YoungTimeRange, _default$2 as YoungWeekday, useAutoLoad, useExport2Excel, useFormMode };
