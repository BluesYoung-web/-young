declare type AuthConfig = {
    /**
     * 微信公众号 appid
     */
    appid: string;
    /**
     * state 标志位的内容
     * @default 'young_wechat_auth'
     */
    state?: string;
    /**
     * 授权类型
     * @default 'snsapi_base'
     */
    scope?: 'snsapi_base' | 'snsapi_userinfo';
};
declare class export_default{
    constructor(conf: AuthConfig);
}

export { export_default as default };
