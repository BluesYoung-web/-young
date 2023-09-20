import type { SelectOptionItem } from './YoungSelect';
import type { PropType } from 'vue';
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
declare const _default: import("vue").DefineComponent<{
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
}, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
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
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}, {
    onReset: Function;
    fastSearch: boolean;
    onSearch: Function;
    dateTimeKey: unknown[];
}>;
export default _default;
