type Cbk<T> = {
    addCbk?: () => Promise<void | boolean>;
    modCbk?: () => Promise<void | boolean>;
    delCbk?: (row: T) => void;
    cpEffect?: (row: T) => void | Promise<void | T>;
    cgEffect?: () => void;
    clearEffect?: () => void;
    disableclear?: boolean;
};
type ValidFn = () => Promise<boolean>;
export declare const useFormMode: <T>(FORM_TEMP: T, { addCbk, modCbk, delCbk, cpEffect, cgEffect, clearEffect, disableclear }: Cbk<T>, tip?: string) => {
    isAdd: import("vue").Ref<boolean>;
    isEdit: import("vue").Ref<boolean>;
    isMore: import("vue").Ref<boolean>;
    clear: () => void;
    edit: (row: T) => Promise<void>;
    more: (row: T) => Promise<void>;
    form: import("vue").Ref<import("vue").UnwrapRef<T>>;
    del: (row: T) => void;
    sure: () => Promise<void>;
    formRef: import("vue").Ref<any>;
    validForm: ValidFn;
};
export {};
