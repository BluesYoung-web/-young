import { type PropType } from 'vue';
declare const _default: import("vue").DefineComponent<{
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
}, () => false | JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("page-change" | "update:page" | "update:limit")[], "page-change" | "update:page" | "update:limit", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
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
    "onPage-change"?: ((...args: any[]) => any) | undefined;
    "onUpdate:page"?: ((...args: any[]) => any) | undefined;
    "onUpdate:limit"?: ((...args: any[]) => any) | undefined;
}, {
    background: boolean;
    hidden: boolean;
    pageSizes: number[];
    layout: string;
    autoScroll: boolean;
}>;
export default _default;
