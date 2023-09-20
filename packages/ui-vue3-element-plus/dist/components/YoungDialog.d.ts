import type { PropType } from 'vue';
declare const _default: import("vue").DefineComponent<{
    modelValue: BooleanConstructor;
    realTitle: StringConstructor;
    width: {
        type: (StringConstructor | NumberConstructor)[];
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
        default: null;
    };
    as: {
        type: PropType<"dialog" | "drawer">;
        default: string;
    };
}, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("update:modelValue" | "sure" | "clear")[], "update:modelValue" | "sure" | "clear", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelValue: BooleanConstructor;
    realTitle: StringConstructor;
    width: {
        type: (StringConstructor | NumberConstructor)[];
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
        default: null;
    };
    as: {
        type: PropType<"dialog" | "drawer">;
        default: string;
    };
}>> & {
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    onSure?: ((...args: any[]) => any) | undefined;
    onClear?: ((...args: any[]) => any) | undefined;
}, {
    modelValue: boolean;
    width: string | number;
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
export default _default;
