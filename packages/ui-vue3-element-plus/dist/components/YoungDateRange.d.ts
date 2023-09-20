declare const _default: import("vue").DefineComponent<{
    start: {
        type: (StringConstructor | NumberConstructor)[];
        default: string;
    };
    end: {
        type: (StringConstructor | NumberConstructor)[];
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
        type: (ArrayConstructor | BooleanConstructor)[];
        default: boolean;
    };
}, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("update:start" | "update:end" | "change")[], "update:start" | "update:end" | "change", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    start: {
        type: (StringConstructor | NumberConstructor)[];
        default: string;
    };
    end: {
        type: (StringConstructor | NumberConstructor)[];
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
        type: (ArrayConstructor | BooleanConstructor)[];
        default: boolean;
    };
}>> & {
    "onUpdate:start"?: ((...args: any[]) => any) | undefined;
    "onUpdate:end"?: ((...args: any[]) => any) | undefined;
    onChange?: ((...args: any[]) => any) | undefined;
}, {
    start: string | number;
    end: string | number;
    unix: boolean;
    second: boolean;
    shortcuts: boolean | unknown[];
}>;
export default _default;
