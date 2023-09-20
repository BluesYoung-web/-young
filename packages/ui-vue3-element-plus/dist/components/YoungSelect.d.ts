import type { PropType } from 'vue';
export type SelectOptionItem<T extends any = any> = {
    label: string;
    value: T;
    disabled?: boolean;
    children?: SelectOptionItem<T>[];
};
declare const _default: import("vue").DefineComponent<{
    modelValue: {
        type: (ArrayConstructor | StringConstructor | NumberConstructor)[];
        required: false;
    };
    options: {
        type: PropType<SelectOptionItem<any>[]>;
        required: true;
    };
}, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("change" | "update:modelValue")[], "change" | "update:modelValue", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelValue: {
        type: (ArrayConstructor | StringConstructor | NumberConstructor)[];
        required: false;
    };
    options: {
        type: PropType<SelectOptionItem<any>[]>;
        required: true;
    };
}>> & {
    onChange?: ((...args: any[]) => any) | undefined;
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}, {}>;
export default _default;
