import type { Ref } from 'vue';
interface UseAutoLoad<T extends any = any> {
    (list: Ref<T[]>, allData: Ref<T[]>, pageSize?: number, pause?: Ref<boolean>): {
        elArr: Ref<any[]>;
        touchEndEl: Ref<boolean>;
        page: Ref<number>;
        load: () => void;
    };
}
export declare const useAutoLoad: UseAutoLoad;
export {};
