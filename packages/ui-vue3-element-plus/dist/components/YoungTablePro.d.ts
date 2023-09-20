import type { PropType } from 'vue';
import type { TableHeadItemPro, TableDataItem } from '..';
declare const _default: import("vue").DefineComponent<{
    tableData: {
        type: PropType<TableDataItem<any>[]>;
        required: true;
    };
    tableHead: {
        type: PropType<TableHeadItemPro[]>;
        required: true;
    };
    /**
     * 默认勾选表头
     */
    tableHeadCheck: {
        type: PropType<string[]>;
        required: false;
    };
    tableHeight: {
        type: (StringConstructor | NumberConstructor)[];
        default: string;
    };
    selectable: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * 是否开启保存表头格式按钮
     */
    saveTableHead: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * 使用历史保存的表头 没有历史表头使用默认勾选表头
     */
    history: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * 存储历史id
     */
    historyId: {
        type: StringConstructor;
        default: string;
    };
}, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    tableData: {
        type: PropType<TableDataItem<any>[]>;
        required: true;
    };
    tableHead: {
        type: PropType<TableHeadItemPro[]>;
        required: true;
    };
    /**
     * 默认勾选表头
     */
    tableHeadCheck: {
        type: PropType<string[]>;
        required: false;
    };
    tableHeight: {
        type: (StringConstructor | NumberConstructor)[];
        default: string;
    };
    selectable: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * 是否开启保存表头格式按钮
     */
    saveTableHead: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * 使用历史保存的表头 没有历史表头使用默认勾选表头
     */
    history: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * 存储历史id
     */
    historyId: {
        type: StringConstructor;
        default: string;
    };
}>>, {
    tableHeight: string | number;
    selectable: boolean;
    saveTableHead: boolean;
    history: boolean;
    historyId: string;
}>;
export default _default;
