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
declare const _default: import("vue").DefineComponent<{
    onDestroy: {
        type: FunctionConstructor;
        default: () => void;
    };
    zIndex: {
        type: NumberConstructor;
        default: number;
    };
}, () => false | JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
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
export default _default;
