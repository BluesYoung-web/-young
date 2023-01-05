import * as vue from 'vue';
import { PropType } from 'vue';

declare const _default$2: vue.DefineComponent<{
    zIndex: {
        type: NumberConstructor;
        default: number;
    };
}, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<vue.ExtractPropTypes<{
    zIndex: {
        type: NumberConstructor;
        default: number;
    };
}>>, {
    zIndex: number;
}>;

declare const _default$1: vue.DefineComponent<{
    titleStyle: {
        type: ObjectConstructor;
        default: () => {};
    };
    activeStyle: {
        type: (ObjectConstructor | StringConstructor)[];
        required: true;
    };
    inactiveStyle: {
        type: (ObjectConstructor | StringConstructor)[];
        required: true;
    };
    titles: {
        type: ArrayConstructor;
        required: true;
    };
}, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<vue.ExtractPropTypes<{
    titleStyle: {
        type: ObjectConstructor;
        default: () => {};
    };
    activeStyle: {
        type: (ObjectConstructor | StringConstructor)[];
        required: true;
    };
    inactiveStyle: {
        type: (ObjectConstructor | StringConstructor)[];
        required: true;
    };
    titles: {
        type: ArrayConstructor;
        required: true;
    };
}>>, {
    titleStyle: Record<string, any>;
}>;

interface ContextMenuItem {
    handlerName: string;
    title: string;
}
declare const _default: vue.DefineComponent<{
    modelValue: {
        type: BooleanConstructor;
        required: true;
    };
    menuList: {
        type: PropType<ContextMenuItem[]>;
        required: true;
    };
}, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, ("update:modelValue" | "clickItem")[], "update:modelValue" | "clickItem", vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<vue.ExtractPropTypes<{
    modelValue: {
        type: BooleanConstructor;
        required: true;
    };
    menuList: {
        type: PropType<ContextMenuItem[]>;
        required: true;
    };
}>> & {
    "onUpdate:modelValue"?: (...args: any[]) => any;
    onClickItem?: (...args: any[]) => any;
}, {}>;

export { _default$2 as YoungCmdPopup, _default as YoungContextMenu, _default$1 as YoungTab };
