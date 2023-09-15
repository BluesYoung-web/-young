import * as vue from 'vue';
import { VNode, PropType, Ref } from 'vue';

type TableHeadAligin = 'left' | 'center' | 'right' | undefined;
interface TableHeadItem<T extends any = any> {
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
type TableDataItem<T extends any = any> = {
    [key in keyof T]: T[key];
} & Record<string, any>;
declare const _default$b: vue.DefineComponent<{
    tableData: {
        type: PropType<TableDataItem<any>[]>;
        required: true;
    };
    tableHead: {
        type: PropType<TableHeadItem<any>[]>;
        required: true;
    };
    tableHeight: {
        type: (NumberConstructor | StringConstructor)[];
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
}, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, "row-drag-change"[], "row-drag-change", vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<vue.ExtractPropTypes<{
    tableData: {
        type: PropType<TableDataItem<any>[]>;
        required: true;
    };
    tableHead: {
        type: PropType<TableHeadItem<any>[]>;
        required: true;
    };
    tableHeight: {
        type: (NumberConstructor | StringConstructor)[];
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
    "onRow-drag-change"?: (...args: any[]) => any;
}, {
    tableHeight: string | number;
    selectable: boolean;
    rowDraggable: boolean;
    enableCustomHead: boolean;
}>;

declare const _default$a: vue.DefineComponent<{
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
    hidden: boolean;
    background: boolean;
    pageSizes: number[];
    autoScroll: boolean;
}>;

declare const _default$9: vue.DefineComponent<{
    modelValue: BooleanConstructor;
    realTitle: StringConstructor;
    width: {
        type: (NumberConstructor | StringConstructor)[];
        default: string;
    };
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
    /**
     * 对比 form 表单
     */
    diffForm: {
        type: ObjectConstructor;
        default: any;
    };
    as: {
        type: PropType<"dialog" | "drawer">;
        default: string;
    };
}, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, ("clear" | "sure" | "update:modelValue")[], "clear" | "sure" | "update:modelValue", vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<vue.ExtractPropTypes<{
    modelValue: BooleanConstructor;
    realTitle: StringConstructor;
    width: {
        type: (NumberConstructor | StringConstructor)[];
        default: string;
    };
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
    /**
     * 对比 form 表单
     */
    diffForm: {
        type: ObjectConstructor;
        default: any;
    };
    as: {
        type: PropType<"dialog" | "drawer">;
        default: string;
    };
}>> & {
    "onUpdate:modelValue"?: (...args: any[]) => any;
    onClear?: (...args: any[]) => any;
    onSure?: (...args: any[]) => any;
}, {
    width: string | number;
    modelValue: boolean;
    sureText: string;
    cancelText: string;
    showSure: boolean;
    showCancel: boolean;
    isAdd: boolean;
    isEdit: boolean;
    isMore: boolean;
    diffForm: Record<string, any>;
    as: "dialog" | "drawer";
}>;

type SelectOptionItem<T extends any = any> = {
    label: string;
    value: T;
    disabled?: boolean;
    children?: SelectOptionItem<T>[];
};
declare const _default$8: vue.DefineComponent<{
    modelValue: {
        type: (NumberConstructor | StringConstructor | ArrayConstructor)[];
        required: false;
    };
    options: {
        type: PropType<SelectOptionItem<any>[]>;
        required: true;
    };
}, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, ("update:modelValue" | "change")[], "update:modelValue" | "change", vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<vue.ExtractPropTypes<{
    modelValue: {
        type: (NumberConstructor | StringConstructor | ArrayConstructor)[];
        required: false;
    };
    options: {
        type: PropType<SelectOptionItem<any>[]>;
        required: true;
    };
}>> & {
    onChange?: (...args: any[]) => any;
    "onUpdate:modelValue"?: (...args: any[]) => any;
}, {}>;

declare const _default$7: vue.DefineComponent<{
    modelValue: {
        type: PropType<number[]>;
        required: true;
    };
}, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, ("update:modelValue" | "change")[], "update:modelValue" | "change", vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<vue.ExtractPropTypes<{
    modelValue: {
        type: PropType<number[]>;
        required: true;
    };
}>> & {
    onChange?: (...args: any[]) => any;
    "onUpdate:modelValue"?: (...args: any[]) => any;
}, {}>;

declare const _default$6: vue.DefineComponent<{
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
    /**
     * 是否精确到秒
     */
    second: {
        type: BooleanConstructor;
        default: boolean;
    };
}, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, ("change" | "update:start" | "update:end")[], "change" | "update:start" | "update:end", vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<vue.ExtractPropTypes<{
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
    /**
     * 是否精确到秒
     */
    second: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & {
    onChange?: (...args: any[]) => any;
    "onUpdate:start"?: (...args: any[]) => any;
    "onUpdate:end"?: (...args: any[]) => any;
}, {
    startTime: string;
    endTime: string;
    step: string;
    second: boolean;
}>;

declare const _default$5: vue.DefineComponent<{
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
    /**
     * 是否精确到秒
     */
    second: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * 是否展示快捷选项
     * @cond1 传入 true，使用默认的快捷选项
     * @cond2 传入数组，使用数组作为快捷选项
     */
    shortcuts: {
        type: (BooleanConstructor | ArrayConstructor)[];
        default: boolean;
    };
}, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, ("change" | "update:start" | "update:end")[], "change" | "update:start" | "update:end", vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<vue.ExtractPropTypes<{
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
    /**
     * 是否精确到秒
     */
    second: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * 是否展示快捷选项
     * @cond1 传入 true，使用默认的快捷选项
     * @cond2 传入数组，使用数组作为快捷选项
     */
    shortcuts: {
        type: (BooleanConstructor | ArrayConstructor)[];
        default: boolean;
    };
}>> & {
    onChange?: (...args: any[]) => any;
    "onUpdate:start"?: (...args: any[]) => any;
    "onUpdate:end"?: (...args: any[]) => any;
}, {
    end: string | number;
    start: string | number;
    second: boolean;
    shortcuts: boolean | unknown[];
    unix: boolean;
}>;

type YoungImageViewerConf = {
    /**
     * 图片目录
     */
    srcList: string[];
    /**
     * 当前为第几张
     */
    index?: number;
};
declare const _default$4: vue.DefineComponent<{
    onDestroy: {
        type: FunctionConstructor;
        default: () => void;
    };
    zIndex: {
        type: NumberConstructor;
        default: number;
    };
}, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<vue.ExtractPropTypes<{
    onDestroy: {
        type: FunctionConstructor;
        default: () => void;
    };
    zIndex: {
        type: NumberConstructor;
        default: number;
    };
}>>, {
    zIndex: number;
    onDestroy: Function;
}>;

type YoungSearchFormType = 'input' | 'number' | 'select' | 'datetimerange' | 'custom';
type YoungSearchFormItem = {
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
type YoungSearchScheme<T extends any = any> = {
    [prop in keyof T]?: YoungSearchFormItem;
};
declare const _default$3: vue.DefineComponent<{
    modelValue: PropType<Record<string, any>>;
    searchScheme: PropType<YoungSearchScheme<any>>;
    fastSearch: {
        type: BooleanConstructor;
        default: boolean;
    };
    onSearch: {
        type: FunctionConstructor;
        default: () => void;
    };
    onReset: {
        type: FunctionConstructor;
        default: () => void;
    };
    dateTimeKey: {
        type: ArrayConstructor;
        default: () => string[];
    };
}, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<vue.ExtractPropTypes<{
    modelValue: PropType<Record<string, any>>;
    searchScheme: PropType<YoungSearchScheme<any>>;
    fastSearch: {
        type: BooleanConstructor;
        default: boolean;
    };
    onSearch: {
        type: FunctionConstructor;
        default: () => void;
    };
    onReset: {
        type: FunctionConstructor;
        default: () => void;
    };
    dateTimeKey: {
        type: ArrayConstructor;
        default: () => string[];
    };
}>> & {
    "onUpdate:modelValue"?: (...args: any[]) => any;
}, {
    onReset: Function;
    fastSearch: boolean;
    onSearch: Function;
    dateTimeKey: unknown[];
}>;

declare const _default$2: vue.DefineComponent<{
    maxWidth: {
        type: NumberConstructor;
        default: number;
    };
}, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<vue.ExtractPropTypes<{
    maxWidth: {
        type: NumberConstructor;
        default: number;
    };
}>>, {
    maxWidth: number;
}>;

type TableHeadItemPro = TableHeadItem & {
    check?: boolean;
};

declare const _default$1: vue.DefineComponent<{
    tableData: {
        type: PropType<TableDataItem<any>[]>;
        required: true;
    };
    tableHead: {
        type: PropType<TableHeadItemPro[]>;
        required: true;
    };
    /**
     * 默认勾选表头
     */
    tableHeadCheck: {
        type: PropType<string[]>;
        required: false;
    };
    tableHeight: {
        type: (NumberConstructor | StringConstructor)[];
        default: string;
    };
    selectable: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * 是否开启保存表头格式按钮
     */
    saveTableHead: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * 使用历史保存的表头 没有历史表头使用默认勾选表头
     */
    history: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * 存储历史id
     */
    historyId: {
        type: StringConstructor;
        default: string;
    };
}, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<vue.ExtractPropTypes<{
    tableData: {
        type: PropType<TableDataItem<any>[]>;
        required: true;
    };
    tableHead: {
        type: PropType<TableHeadItemPro[]>;
        required: true;
    };
    /**
     * 默认勾选表头
     */
    tableHeadCheck: {
        type: PropType<string[]>;
        required: false;
    };
    tableHeight: {
        type: (NumberConstructor | StringConstructor)[];
        default: string;
    };
    selectable: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * 是否开启保存表头格式按钮
     */
    saveTableHead: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * 使用历史保存的表头 没有历史表头使用默认勾选表头
     */
    history: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * 存储历史id
     */
    historyId: {
        type: StringConstructor;
        default: string;
    };
}>>, {
    tableHeight: string | number;
    selectable: boolean;
    saveTableHead: boolean;
    history: boolean;
    historyId: string;
}>;

type YoungUploadFn = (file: File) => string;
declare const _default: vue.DefineComponent<{
    modelValue: {
        type: PropType<string[]>;
        required: true;
    };
    limit: {
        type: NumberConstructor;
        default: number;
    };
    type: {
        type: PropType<"image" | "file">;
        default: string;
    };
    accept: {
        type: StringConstructor;
        default: string;
    };
    uploadFn: {
        type: PropType<YoungUploadFn>;
        required: true;
    };
    cropper: {
        type: BooleanConstructor;
        default: boolean;
    };
    aspt: {
        type: PropType<[number, number]>;
        default: () => number[];
    };
    cropperAttrs: {
        type: ObjectConstructor;
        default: () => {};
    };
}, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, ("update:modelValue" | "change")[], "update:modelValue" | "change", vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<vue.ExtractPropTypes<{
    modelValue: {
        type: PropType<string[]>;
        required: true;
    };
    limit: {
        type: NumberConstructor;
        default: number;
    };
    type: {
        type: PropType<"image" | "file">;
        default: string;
    };
    accept: {
        type: StringConstructor;
        default: string;
    };
    uploadFn: {
        type: PropType<YoungUploadFn>;
        required: true;
    };
    cropper: {
        type: BooleanConstructor;
        default: boolean;
    };
    aspt: {
        type: PropType<[number, number]>;
        default: () => number[];
    };
    cropperAttrs: {
        type: ObjectConstructor;
        default: () => {};
    };
}>> & {
    onChange?: (...args: any[]) => any;
    "onUpdate:modelValue"?: (...args: any[]) => any;
}, {
    type: "image" | "file";
    limit: number;
    accept: string;
    cropper: boolean;
    aspt: [number, number];
    cropperAttrs: Record<string, any>;
}>;

interface UseAutoLoad<T extends any = any> {
    (list: Ref<T[]>, allData: Ref<T[]>, pageSize?: number, pause?: Ref<boolean>): {
        elArr: Ref<any[]>;
        touchEndEl: Ref<boolean>;
        page: Ref<number>;
        load: () => void;
    };
}
declare const useAutoLoad: UseAutoLoad;

type Cbk<T> = {
    addCbk?: () => Promise<void | boolean>;
    modCbk?: () => Promise<void | boolean>;
    delCbk?: (row: T) => void;
    cpEffect?: (row: T) => void | Promise<void | T>;
    cgEffect?: () => void;
    clearEffect?: () => void;
    disableclear?: boolean;
};
type ValidFn = () => Promise<boolean>;
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

declare const useVerifyCode: (cbk: () => any | Promise<any>, default_wait?: number, default_tip?: string) => {
    getCode: () => void;
    tip: vue.Ref<string>;
    showSlider: vue.Ref<boolean>;
    pass: () => Promise<void>;
    cancel: () => void;
};

/**
 * 基于 ElImageViewer 的命令式图片预览
 * @param conf
 * @param zIndex
 */
declare const useImagePreview: (conf: YoungImageViewerConf, zIndex?: number) => void;

declare const useKeyUp: (e: KeyboardEvent, fn: Function, key?: string) => void;

declare const useQuery: <T>(QUERY_TEMP: T, cbk: Function) => {
    query: vue.Ref<vue.UnwrapRef<T>>;
    reset: () => void;
};

declare const useRemoteSearch: (cbk: (key: string) => Promise<SelectOptionItem[] | void>) => {
    loading: vue.Ref<boolean>;
    search: (str: string) => Promise<void>;
    searchStr: vue.Ref<string | number | string[] | number[]>;
    options: vue.Ref<{
        label: string;
        value: any;
        disabled?: boolean;
        children?: any[];
    }[]>;
    init: vue.Ref<boolean>;
};

export { SelectOptionItem, TableDataItem, TableHeadItem, TableHeadItemPro, _default$5 as YoungDateRange, _default$9 as YoungDialog, _default$4 as YoungImageViewer, YoungImageViewerConf, _default$a as YoungPagination, _default$2 as YoungRotateTip, _default$3 as YoungSearchForm, YoungSearchFormItem, YoungSearchScheme, _default$8 as YoungSelect, _default$b as YoungTable, _default$1 as YoungTablePro, _default$6 as YoungTimeRange, _default as YoungUpload, YoungUploadFn, _default$7 as YoungWeekday, useAutoLoad, useExport2Excel, useFormMode, useImagePreview, useKeyUp, useQuery, useRemoteSearch, useVerifyCode };
