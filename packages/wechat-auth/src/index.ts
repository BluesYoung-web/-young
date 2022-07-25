/*
 * @Author: zhangyang
 * @Date: 2022-07-02 14:36:13
 * @LastEditTime: 2022-07-25 09:07:04
 * @Description: 
 */
type AuthConfig = {
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

const defaultConfig: Partial<AuthConfig> = {
  state: 'young_wechat_auth',
  scope: 'snsapi_base'
};

export default class {
  public auth_url: string;

  constructor(conf: AuthConfig) {
    conf = Object.assign(defaultConfig, conf);
    this.auth_url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${conf.appid}&redirect_uri=${encodeURIComponent(location.href)}&response_type=code&scope=${conf.scope}&state=${conf.state}#wechat_redirect`;
  }
  
  getCode() {
    const args = new URLSearchParams(location.search);
    const code = args.get('code');
    const state = args.get('state');
    if (state) {
      return code;
    } else {
      location.href = this.auth_url;
    }
  }
}