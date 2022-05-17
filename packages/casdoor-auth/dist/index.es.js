class Sdk {
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
}
const defaultConf = {
  serverUrl: "https://door.casdoor.com",
  clientId: "014ae4bd048734ca2dea",
  organizationName: "casbin",
  appName: "app-casnode",
  redirectPath: window.location.pathname
};
class YoungAuth {
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
    this.sdk = new Sdk(finalConf);
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
}
export { YoungAuth };
//# sourceMappingURL=index.es.js.map
