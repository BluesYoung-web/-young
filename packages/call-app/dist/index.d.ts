/**
 * 唤端配置
 */
declare type Config = {
    /**
     * 安卓唤端地址
     */
    android_shceme: string;
    /**
    * ios 唤端地址
    */
    ios_shceme: string;
    /**
    * 特定渠道的下载地址
    */
    download?: {
        /**
        * 安卓
        */
        android?: string;
        /**
        * ios
        */
        ios: string;
        /**
        * 应用宝
        */
        yyb?: string;
    };
    /**
    * 唤端路径
    */
    path?: string;
    /**
    * 需要传递的参数
    */
    params?: Record<string, string>;
    /**
    * 兜底的落地页
    */
    landpage: string;
};
declare type Cbk = () => void;
/**
 * 可选配置
 */
interface Options {
    /**
     * 超时时间
     * @default 2500 ms
     */
    timeout?: number;
    /**
     * 特殊环境的遮罩
     */
    mask?: {
        wechat?: Cbk;
    };
    startCall?: Cbk;
    callFail?: Cbk;
}

declare class YoungCallApp {
    scheme: string;
    download: string;
    info: string;
    options: Options;
    constructor(conf: Config, options?: Options);
    generateScheme(conf: Config): void;
    call(): void;
    copyInfo(): void;
    fallback(): void;
}

export { YoungCallApp as default };
