import * as vue from 'vue';
import { PropType } from 'vue';

declare const _default$3: vue.DefineComponent<{
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

declare const _default$2: vue.DefineComponent<{
    titleStyle: {
        type: ObjectConstructor;
        default: () => {
            fontSize: string;
            width: string;
        };
    };
    activeStyle: {
        type: (ObjectConstructor | StringConstructor)[];
        default: () => {
            color: string;
            cursor: string;
            borderBottom: string;
            marginBottom: string;
        };
    };
    inactiveStyle: {
        type: (ObjectConstructor | StringConstructor)[];
        default: () => {
            cursor: string;
            marginBottom: string;
        };
    };
    titles: {
        type: ArrayConstructor;
        required: true;
    };
}, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<vue.ExtractPropTypes<{
    titleStyle: {
        type: ObjectConstructor;
        default: () => {
            fontSize: string;
            width: string;
        };
    };
    activeStyle: {
        type: (ObjectConstructor | StringConstructor)[];
        default: () => {
            color: string;
            cursor: string;
            borderBottom: string;
            marginBottom: string;
        };
    };
    inactiveStyle: {
        type: (ObjectConstructor | StringConstructor)[];
        default: () => {
            cursor: string;
            marginBottom: string;
        };
    };
    titles: {
        type: ArrayConstructor;
        required: true;
    };
}>>, {
    titleStyle: Record<string, any>;
    activeStyle: string | Record<string, any>;
    inactiveStyle: string | Record<string, any>;
}>;

interface ContextMenuItem {
    handlerName: string;
    title: string;
}
declare const _default$1: vue.DefineComponent<{
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

declare const _default: vue.DefineComponent<{
    /**
     * 主 canvas 的宽
     */
    canvasWidth: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * 主 canvas 的高
     */
    canvasHeight: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * 是否出现，由父级控制
     */
    show: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * 拼图块的大小缩放比例
     */
    puzzleScale: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * 滑块的大小
     */
    sliderSize: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * 允许的偏差值
     */
    range: {
        type: NumberConstructor;
        default: number;
    };
    imgs: {
        type: PropType<string[]>;
        default: any;
    };
    successText: {
        type: StringConstructor;
        default: string;
    };
    failText: {
        type: StringConstructor;
        default: string;
    };
    sliderText: {
        type: StringConstructor;
        default: string;
    };
    zIndex: {
        type: NumberConstructor;
        default: number;
    };
}, () => JSX.Element, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, ("close" | "success" | "fail")[], "close" | "success" | "fail", vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<vue.ExtractPropTypes<{
    /**
     * 主 canvas 的宽
     */
    canvasWidth: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * 主 canvas 的高
     */
    canvasHeight: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * 是否出现，由父级控制
     */
    show: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * 拼图块的大小缩放比例
     */
    puzzleScale: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * 滑块的大小
     */
    sliderSize: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * 允许的偏差值
     */
    range: {
        type: NumberConstructor;
        default: number;
    };
    imgs: {
        type: PropType<string[]>;
        default: any;
    };
    successText: {
        type: StringConstructor;
        default: string;
    };
    failText: {
        type: StringConstructor;
        default: string;
    };
    sliderText: {
        type: StringConstructor;
        default: string;
    };
    zIndex: {
        type: NumberConstructor;
        default: number;
    };
}>> & {
    onClose?: (...args: any[]) => any;
    onSuccess?: (...args: any[]) => any;
    onFail?: (...args: any[]) => any;
}, {
    zIndex: number;
    show: boolean;
    range: number;
    canvasWidth: number;
    canvasHeight: number;
    puzzleScale: number;
    sliderSize: number;
    imgs: string[];
    successText: string;
    failText: string;
    sliderText: string;
}>;

export { _default$3 as YoungCmdPopup, _default$1 as YoungContextMenu, _default as YoungSlideVerify, _default$2 as YoungTab };
