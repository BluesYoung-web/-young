import { SetOptional } from '@bluesyoung/utils';

declare enum QuickCall {
    wechat = "weixin://"
}
/**
 * 快捷唤端的配置
 */
declare type QuickCallConfig = {
    quickType: QuickCall;
};
/**
 * 基本唤端配置
 */
declare type CommonCallConfig = {
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
        ios?: string;
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
    landpage?: string;
};
declare type Cbk = () => void;
declare type Options = {
    /**
     * 超时时间
     * @default 2500 ms
     */
    timeout: number;
    /**
     * 特殊环境的遮罩
     */
    mask: {
        wechat: Cbk;
    };
    startCall: Cbk;
    callFail: Cbk;
};
declare class YoungCallApp {
    static QuickCall: typeof QuickCall;
    scheme: string;
    download: string;
    info: string;
    options: Options;
    constructor(conf: QuickCallConfig, options?: SetOptional<Options, keyof Options>);
    constructor(conf: CommonCallConfig, options?: SetOptional<Options, keyof Options>);
    /**
     * 生成通用唤端地址
     */
    generateScheme(conf: CommonCallConfig): void;
    call(): void;
    copyInfo(): void;
    fallback(): void;
}

export { YoungCallApp as default };
