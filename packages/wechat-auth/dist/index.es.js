const defaultConfig = {
  state: "young_wechat_auth",
  redirect: location.href
};
class index {
  constructor(conf) {
    conf = Object.assign(defaultConfig, conf);
    this.auth_url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${conf.appid}&redirect_uri=${encodeURIComponent(conf.redirect)}&response_type=code&scope=snsapi_base&state=${conf.state}#wechat_redirect`;
    const isWeChat = /MicroMessenger/img.test(navigator.userAgent);
    if (isWeChat) {
      this.login_url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${conf.appid}&redirect_uri=${encodeURIComponent(conf.redirect)}&response_type=code&scope=snsapi_userinfo&state=${conf.state}#wechat_redirect`;
    } else {
      this.login_url = `https://open.weixin.qq.com/connect/qrconnect?appid=${conf.open_appid}&redirect_uri=${encodeURIComponent(conf.redirect)}&response_type=code&scope=snsapi_login&state=${conf.state}#wechat_redirect`;
    }
  }
  getCode(type = "base") {
    const args = new URLSearchParams(location.search);
    const code = args.get("code");
    const state = args.get("state");
    if (state) {
      return code;
    } else {
      if (type === "base") {
        location.href = this.auth_url;
      } else {
        location.href = this.login_url;
      }
    }
  }
}
export { index as default };
//# sourceMappingURL=index.es.js.map
