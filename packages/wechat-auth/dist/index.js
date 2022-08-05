var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  default: () => src_default
});
module.exports = __toCommonJS(src_exports);
var defaultConfig = {
  state: "young_wechat_auth",
  redirect: location.href
};
var src_default = class {
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
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
