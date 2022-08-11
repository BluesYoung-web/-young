declare type AuthConfig = {
    /**
     * 微信公众号 appid
     */
    appid: string;
    /**
     * 微信开放平台-应用 appid，扫码登录必传
     */
    open_appid?: string;
    /**
     * state 标志位的内容
     * @default 'young_wechat_auth'
     */
    state?: string;
    /**
     * 重定向的地址
     * @default location.href
     */
    redirect?: string;
};
declare class export_default{
    auth_url: string;
    login_url: string;
    state: string;
    constructor(conf: AuthConfig);
    getCode(type?: 'base' | 'login'): string;
}

export { export_default as default };
