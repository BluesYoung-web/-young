import type { SelectOptionItem } from '..';
export declare const useRemoteSearch: (cbk: (key: string) => Promise<SelectOptionItem[] | void>) => {
    loading: import("vue").Ref<boolean>;
    search: (str: string) => Promise<void>;
    searchStr: import("vue").Ref<string | number | string[] | number[]>;
    options: import("vue").Ref<{
        label: string;
        value: any;
        disabled?: boolean | undefined;
        children?: any[] | undefined;
    }[]>;
    init: import("vue").Ref<boolean>;
};
