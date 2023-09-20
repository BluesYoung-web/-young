import type { PropType } from 'vue';
import type { TableHeadItem } from '..';
export type TableHeadItemPro = TableHeadItem & {
    check?: boolean;
};
declare const _default: import("vue").DefineComponent<{
    list: {
        required: true;
        type: PropType<TableHeadItemPro[]>;
    };
}, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("change" | "drag-end")[], "change" | "drag-end", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    list: {
        required: true;
        type: PropType<TableHeadItemPro[]>;
    };
}>> & {
    onChange?: ((...args: any[]) => any) | undefined;
    "onDrag-end"?: ((...args: any[]) => any) | undefined;
}, {}>;
export default _default;
