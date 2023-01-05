import * as vue from 'vue';
import { VNode, PropType, Ref } from 'vue';

declare type TableHeadAligin = 'left' | 'center' | 'right' | undefined;
interface TableHeadItem<T extends any = any> {
    prop: keyof T;
    label: string;
    width?: string;
    sortable?: boolean;
    fixed?: boolean;
    aligin?: TableHeadAligin;
    tool_content?: string;
    only_export?: boolean;
    only_display?: boolean;
    render?: (row: T) => VNode;
    [x: string]: any;
}
declare type TableDataItem<T extends any = any> = {
    [key in keyof T]: T[key];
} & Record<string, any>;
declare const _default$2: vue.DefineComponent<{
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
}, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, "sort-change"[], "sort-change", vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<vue.ExtractPropTypes<{
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
}>> & {
    "onSort-change"?: (...args: any[]) => any;
}, {
    tableHeight: number;
}>;

declare const _default$1: vue.DefineComponent<{
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

declare const _default: vue.DefineComponent<{
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
    cpEffect?: (row: T) => void;
    cgEffect?: () => void;
    disableclear?: boolean;
};
declare type ValidFn = () => Promise<boolean>;
declare const useFormMode: <T>(FORM_TEMP: T, { addCbk, modCbk, delCbk, cpEffect, cgEffect, disableclear }: Cbk<T>, tip?: string) => {
    isAdd: vue.Ref<boolean>;
    isEdit: vue.Ref<boolean>;
    isMore: vue.Ref<boolean>;
    clear: () => void;
    edit: (row: any) => void;
    more: (row: any) => void;
    form: vue.Ref<vue.UnwrapRef<T>>;
    del: (row: any) => void;
    sure: () => Promise<void>;
    formRef: vue.Ref<any>;
    validForm: ValidFn;
};

export { TableDataItem, TableHeadItem, _default as YoungDialog, _default$1 as YoungPagination, _default$2 as YoungTable, useAutoLoad, useFormMode };
