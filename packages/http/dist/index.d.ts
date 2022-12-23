import { Method, AxiosAdapter, AxiosInstance } from 'axios';

declare type Simplify<T> = {
    [P in keyof T]: T[P];
};
declare type SetRequired<T, K extends keyof T> = Simplify<Required<Pick<T, K>> & Pick<T, Exclude<keyof T, K>>>;
declare type AllMethod = Lowercase<Method>;
declare type Fn<T extends any = any, R extends any = any> = (args: T) => Promise<R>;
declare type Cbks = {
    [k in AllMethod]?: Record<string, Fn>;
};
declare type Handlers<R extends Cbks> = {
    [P in keyof R]?: R[P];
};
declare type Headers = Record<string, string>;
declare type Prototype = {
    __instance__: AxiosInstance;
    __mixin__<T extends Cbks>(extentions: Handlers<T>): SetRequired<Handlers<T>, keyof T> & ThisType<Handlers<T>>;
    freeReq: AxiosInstance['request'];
    authReq: AxiosInstance['request'];
};
declare enum UsefulContentTypes {
    JSON = "application/json; charset=UTF-8",
    URLEncoded = "application/x-www-form-urlencoded; charset=UTF-8",
    FormData = "multipart/form-data; charset=UTF-8"
}
interface DefaultHttpConfig<Msg extends any = any> {
    /**
     * 基础地址
     * @default '/api'
     */
    baseURL: string;
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
     * 错误处理函数
     * 接受各种抛出的错误
     * @default console.error
     */
    fail: (err: string | number | Error | Msg) => void;
    /**
     * 结果校验，判断此次请求是否正常
     * 不传则默认使用标准 http 状态码作为判断结果
     * @default () => true
     */
    checkFn: (res: Msg) => boolean;
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
    /**
     * 自定义适配器
     * 微信小程序等其他非标准环境时传入
     */
    adapter?: AxiosAdapter;
}
declare const useHttp: <Msg extends Record<string, any> = Record<string, any>, Fns extends Cbks = Cbks>(config?: Partial<DefaultHttpConfig<Msg>>) => Handlers<Fns> & Prototype;

export { AllMethod, Cbks, DefaultHttpConfig, Fn, UsefulContentTypes, useHttp };
