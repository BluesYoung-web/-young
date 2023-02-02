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
var import_share_dom = require("@bluesyoung/share-dom");
var import_defu = require("defu");
var isIos = import_share_dom.detector.os.name === "ios";
var inWeixin = import_share_dom.detector.browser.name === "micromessenger";
var QuickCall = /* @__PURE__ */ ((QuickCall2) => {
  QuickCall2["wechat"] = "weixin://";
  return QuickCall2;
})(QuickCall || {});
var defaultOptions = {
  timeout: 2500,
  mask: {
    wechat: () => null
  },
  startCall: () => console.log("---\u5F00\u59CB\u5524\u7AEF---"),
  callFail: () => console.log("---\u5524\u8D77\u5931\u8D25\uFF0C\u8DF3\u8F6C\u4E0B\u8F7D---")
};
var YoungCallApp = class {
  constructor(conf, options = {}) {
    this.options = (0, import_defu.defu)(options, defaultOptions);
    if (conf.quickType) {
      this.scheme = conf.quickType;
    } else {
      this.generateScheme(conf);
    }
  }
  generateScheme(conf) {
    var _a, _b, _c;
    let scheme = "", download = "", info = "(\u590D\u5236\u6B64\u6D88\u606F\u6253\u5F00app)|";
    if (isIos) {
      if (conf.ios_shceme.includes("://")) {
        scheme = conf.ios_shceme;
      } else {
        scheme = `${conf.ios_shceme}://`;
      }
      download = ((_a = conf == null ? void 0 : conf.download) == null ? void 0 : _a.ios) || conf.landpage;
    } else {
      if (conf.android_shceme.includes("://")) {
        scheme = conf.android_shceme;
      } else {
        scheme = `${conf.android_shceme}://`;
      }
      download = ((_b = conf == null ? void 0 : conf.download) == null ? void 0 : _b.yyb) || conf.landpage;
      if (inWeixin && ((_c = conf == null ? void 0 : conf.download) == null ? void 0 : _c.yyb)) {
        download = conf.download.yyb;
      }
    }
    if (conf.path) {
      scheme += conf.path;
    }
    if (conf.params) {
      const query = new URLSearchParams(conf.params).toString();
      scheme += `?${query}`;
      info += query;
    }
    this.scheme = scheme;
    this.download = download;
    this.info = info;
  }
  call() {
    const { mask, startCall } = this.options;
    if (inWeixin && mask.wechat) {
      mask.wechat();
      return;
    }
    this.copyInfo();
    startCall == null ? void 0 : startCall();
    window.location.href = this.scheme;
    this.fallback();
  }
  copyInfo() {
    (0, import_share_dom.copy)(this.info);
  }
  fallback() {
    const t = setTimeout(() => {
      this.options.callFail();
      if (this.download) {
        window.location.href = this.download;
      }
    }, this.options.timeout);
    setTimeout(() => {
      window.addEventListener("blur", () => clearTimeout(t));
    }, this.options.timeout - 500);
  }
};
YoungCallApp.QuickCall = QuickCall;
var src_default = YoungCallApp;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
