import { Method, AxiosInstance, AxiosRequestConfig } from 'axios';

type Simplify<T> = {
    [P in keyof T]: T[P];
};
type SetRequired<T, K extends keyof T> = Simplify<Required<Pick<T, K>> & Pick<T, Exclude<keyof T, K>>>;
type AllMethod = Lowercase<Method>;
type Fn<T extends any = any, R extends any = any> = (...args: T[]) => Promise<R>;
type Cbks = {
    [k in AllMethod]?: Record<string, Fn>;
};
type Handlers<R extends Cbks> = {
    [P in keyof R]?: R[P];
};
type Headers = Record<string, string>;
type Req = <X extends any = any>(config: AxiosRequestConfig<unknown>) => Promise<X>;
type Prototype = {
    __instance__: AxiosInstance;
    __mixin__<T extends Cbks>(extentions: Handlers<T>): SetRequired<Handlers<T>, keyof T> & ThisType<Handlers<T>>;
    freeReq: Req;
    authReq: Req;
};
declare enum UsefulContentTypes {
    JSON = "application/json; charset=UTF-8",
    URLEncoded = "application/x-www-form-urlencoded; charset=UTF-8",
    FormData = "multipart/form-data; charset=UTF-8"
}
type DefaultMsg = {
    code: number;
    msg: string;
    data: any;
};
interface DefaultHttpConfig<Msg extends any = DefaultMsg> {
    /**
     * 基础地址
     * @default /api
     */
    baseURL: string;
    /**
     * 动态获取基础地址
     */
    lazyBaseURL?: () => string;
    /**
     * 默认方法
     * @default post
     */
    method: AllMethod;
    /**
     * 超时时间
     * @default 5e3 5s
     */
    timeout: number;
    /**
     * 加载函数
     */
    loading: {
        start: () => void;
        end: () => void;
    };
    /**
     * 错误处理函数，进行错误处理或继续抛出错误
     * 接受各种抛出的错误
     * @default console.error
     */
    fail: (err: string | number | Error | Msg) => void;
    /**
     * 结果校验 + 数据解析，判断此次请求是否正常，正常则返回解包数据，否则抛出异常
     * 不传则默认使用标准 http 状态码作为判断结果，并原样返回
     * @default () => any | never
     */
    checkFn: (res: Msg) => any | never;
    /**
     * 请求头
     */
    headers: {
        /**
         * 生成公共请求头
         * @default () => {}
         */
        getCommonHeaders?: () => Headers;
        /**
         * 生成鉴权请求头
         * @default () => {}
         */
        getAuthHeaders?: () => Headers;
    };
}
declare module 'axios' {
    interface AxiosRequestConfig {
        /**
         * 禁用 loading 动画
         * @default false
         */
        notLoading?: boolean;
    }
}
declare const useHttp: <Msg extends Record<string, any> = DefaultMsg, Fns extends Cbks = Cbks>(config?: Partial<DefaultHttpConfig<Msg>>) => Handlers<Fns> & Prototype;
type YoungHttp = ReturnType<typeof useHttp>;
type YoungHttpFreeReq = YoungHttp['freeReq'];
type YoungHttpAuthReq = YoungHttp['authReq'];

export { AllMethod, Cbks, DefaultHttpConfig, DefaultMsg, Fn, UsefulContentTypes, YoungHttp, YoungHttpAuthReq, YoungHttpFreeReq, useHttp };
