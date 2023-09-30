export declare const useVerifyCode: (cbk: () => any | Promise<any>, default_wait?: number, default_tip?: string) => {
    getCode: () => void;
    tip: import("vue").Ref<string>;
    showSlider: import("vue").Ref<boolean>;
    pass: () => Promise<void>;
    cancel: () => void;
    disabled: import("vue").ComputedRef<boolean>;
};
