import type { PropType } from 'vue';
import type { TableHeadItemPro } from '..';
declare const _default: import("vue").DefineComponent<{
    tableHead: {
        required: true;
        type: PropType<TableHeadItemPro[]>;
    };
}, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("change" | "reset" | "drag-end" | "save")[], "change" | "reset" | "drag-end" | "save", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    tableHead: {
        required: true;
        type: PropType<TableHeadItemPro[]>;
    };
}>> & {
    onChange?: ((...args: any[]) => any) | undefined;
    onReset?: ((...args: any[]) => any) | undefined;
    "onDrag-end"?: ((...args: any[]) => any) | undefined;
    onSave?: ((...args: any[]) => any) | undefined;
}, {}>;
export default _default;
