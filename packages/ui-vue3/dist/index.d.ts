import * as vue from 'vue';

declare const _default$1: vue.DefineComponent<{
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

declare namespace YoungCmdPopup {
  export {
    _default$1 as default,
  };
}

declare const _default: vue.DefineComponent<{
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

declare namespace YoungTab {
  export {
    _default as default,
  };
}

export { YoungCmdPopup, YoungTab };
