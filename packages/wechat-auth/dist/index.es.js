const defaultConfig = {
  state: "young_wechat_auth",
  scope: "snsapi_base"
};
class index {
  constructor(conf) {
    conf = Object.assign(defaultConfig, conf);
    this.auth_url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${conf.appid}&redirect_uri=${encodeURIComponent(location.href)}&response_type=code&scope=${conf.scope}&state=${conf.state}#wechat_redirect`;
  }
  getCode() {
    const args = new URLSearchParams(location.search);
    const code = args.get("code");
    const state = args.get("state");
    if (state) {
      return code;
    } else {
      location.href = this.auth_url;
    }
  }
}
export { index as default };
//# sourceMappingURL=index.es.js.map
