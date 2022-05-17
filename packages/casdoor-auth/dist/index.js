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
  YoungAuth: () => YoungAuth
});
module.exports = __toCommonJS(src_exports);

// src/casdoor-sdk.ts
var Sdk = class {
  constructor(config) {
    this.config = config;
    if (config.redirectPath === void 0 || config.redirectPath === null) {
      this.config.redirectPath = "/callback";
    }
  }
  getSignupUrl(enablePassword = true) {
    if (enablePassword) {
      return `${this.config.serverUrl.trim()}/signup/${this.config.appName}`;
    } else {
      return this.getSigninUrl().replace("/login/oauth/authorize", "/signup/oauth/authorize");
    }
  }
  getSigninUrl() {
    const redirectUri = `${window.location.origin}${this.config.redirectPath}`;
    const scope = "read";
    const state = this.config.appName;
    return `${this.config.serverUrl.trim()}/login/oauth/authorize?client_id=${this.config.clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scope}&state=${state}`;
  }
  getUserProfileUrl(userName, account) {
    let param = "";
    if (account !== void 0 && account !== null) {
      param = `?access_token=${account.accessToken}`;
    }
    return `${this.config.serverUrl.trim()}/users/${this.config.organizationName}/${userName}${param}`;
  }
  getMyProfileUrl(account) {
    let param = "";
    if (account !== void 0 && account !== null) {
      param = `?access_token=${account.accessToken}`;
    }
    return `${this.config.serverUrl.trim()}/account${param}`;
  }
  signin(serverUrl) {
    const params = new URLSearchParams(window.location.search);
    return fetch(`${serverUrl}/api/signin?code=${params.get("code")}&state=${params.get("state")}`, {
      method: "POST",
      credentials: "include"
    }).then((res) => res.json());
  }
};
var casdoor_sdk_default = Sdk;

// src/index.ts
var defaultConf = {
  serverUrl: "https://door.casdoor.com",
  clientId: "014ae4bd048734ca2dea",
  organizationName: "casbin",
  appName: "app-casnode",
  redirectPath: window.location.pathname
};
var YoungAuth = class {
  static hasAuthed() {
    const { code, state } = Object.fromEntries(new URLSearchParams(window.location.search));
    if (code && state) {
      return true;
    } else {
      return false;
    }
  }
  constructor(conf = {}) {
    const finalConf = Object.assign(defaultConf, conf);
    this.sdk = new casdoor_sdk_default(finalConf);
  }
  init(operate = "login") {
    let url = "";
    if (operate === "register") {
      url = this.sdk.getSignupUrl();
    } else {
      url = this.sdk.getSigninUrl();
    }
    window.location.href = url;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  YoungAuth
});
