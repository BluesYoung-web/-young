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
const defaultCmd = "I want to login";
class Master {
  constructor(conf, cmd = defaultCmd) {
    const onMessage = async (e) => {
      if (e.data.cmd === cmd) {
        conf.onmsg_cbk(e);
      }
    };
    window.addEventListener("message", onMessage);
  }
}
class Slave {
  constructor(conf, cmd = defaultCmd) {
    this.cmd = cmd;
    const onMessage = async (e) => {
      if (e.origin === conf.master_url) {
        await conf.onmsg_cbk(e.data);
      }
    };
    window.addEventListener("message", onMessage);
  }
  init(fallback) {
    if (window.opener) {
      window.opener.postMessage({
        cmd: this.cmd
      }, "*");
    } else {
      fallback == null ? void 0 : fallback();
    }
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
export { Master, Slave, YoungAuth, defaultCmd };
//# sourceMappingURL=index.es.js.map
