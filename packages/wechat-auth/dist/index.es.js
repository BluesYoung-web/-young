const defaultConfig = {
  state: "young_wechat_auth",
  scope: "snsapi_base"
};
class index {
  constructor(conf) {
    conf = Object.assign(defaultConfig, conf);
    const args = new URLSearchParams(location.search);
    const code = args.get("code");
    const state = args.get("state");
    if (state) {
      return code;
    } else {
      location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${conf.appid}&redirect_uri=${encodeURIComponent(location.href)}&response_type=code&scope=${conf.scope}&state=${conf.state}#wechat_redirect`;
    }
  }
}
export { index as default };
//# sourceMappingURL=index.es.js.map
