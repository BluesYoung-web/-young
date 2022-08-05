/*
 * @Author: zhangyang
 * @Date: 2022-07-02 14:36:13
 * @LastEditTime: 2022-08-05 08:18:56
 * @Description: 
 */
type AuthConfig = {
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

const defaultConfig: Omit<Required<AuthConfig>, 'appid' | 'open_appid'> = {
  state: 'young_wechat_auth',
  redirect: location.href
};

export default class {
  public auth_url: string;
  public login_url: string;

  constructor(conf: AuthConfig) {
    conf = Object.assign(defaultConfig, conf);
    this.auth_url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${conf.appid}&redirect_uri=${encodeURIComponent(conf.redirect)}&response_type=code&scope=snsapi_base&state=${conf.state}#wechat_redirect`;
    
    const isWeChat = /MicroMessenger/img.test(navigator.userAgent);
    if (isWeChat) {
      // 微信内，执行网页授权
      this.login_url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${conf.appid}&redirect_uri=${encodeURIComponent(conf.redirect)}&response_type=code&scope=snsapi_userinfo&state=${conf.state}#wechat_redirect`;
    } else {
      // 微信外，扫码登录
      this.login_url = `https://open.weixin.qq.com/connect/qrconnect?appid=${conf.open_appid}&redirect_uri=${encodeURIComponent(conf.redirect)}&response_type=code&scope=snsapi_login&state=${conf.state}#wechat_redirect`;
    }
  }
  
  getCode(type: 'base' | 'login' = 'base') {
    const args = new URLSearchParams(location.search);
    const code = args.get('code');
    const state = args.get('state');
    if (state) {
      return code;
    } else {
      if (type === 'base') {
        location.href = this.auth_url;  
      } else {
        location.href = this.login_url;
      }
    }
  }
}