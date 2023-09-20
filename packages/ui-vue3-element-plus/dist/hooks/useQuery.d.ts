export declare const useQuery: <T>(QUERY_TEMP: T, cbk: Function) => {
    query: import("vue").Ref<import("vue").UnwrapRef<T>>;
    reset: () => void;
};
