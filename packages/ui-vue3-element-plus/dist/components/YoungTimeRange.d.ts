declare const _default: import("vue").DefineComponent<{
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
}, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("update:start" | "update:end" | "change")[], "update:start" | "update:end" | "change", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
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
    "onUpdate:start"?: ((...args: any[]) => any) | undefined;
    "onUpdate:end"?: ((...args: any[]) => any) | undefined;
    onChange?: ((...args: any[]) => any) | undefined;
}, {
    second: boolean;
    step: string;
    startTime: string;
    endTime: string;
}>;
export default _default;
