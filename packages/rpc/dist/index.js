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
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/index.ts
var src_exports = {};
__export(src_exports, {
  YoungRPCMaster: () => YoungRPCMaster,
  YoungRPCSlave: () => YoungRPCSlave
});
module.exports = __toCommonJS(src_exports);

// src/core/share.ts
var SHAKE_HANDS_MSG = "---young-rpc-shake-hands-message-request---";

// src/core/slave.ts
var YoungRPCSlave = class {
  constructor(shakeHandsMsg = SHAKE_HANDS_MSG) {
    this.shakeHandsMsg = shakeHandsMsg;
    this.handlersMap = {};
    if (window.opener && window.opener !== window) {
      this.masterWindow = window.opener;
    } else if (window.parent && window.parent !== window) {
      this.masterWindow = window.parent;
    }
    this.shakeHands();
  }
  shakeHands() {
    if (!this.masterWindow) {
      throw new Error("YoungRPCSlave can only be used in sub window");
    }
    const channel = new MessageChannel();
    this.port = channel.port1;
    this.port.onmessage = (e) => {
      const { data, isTrusted } = e;
      if (isTrusted && data) {
        if (data.cmd && typeof data.cmd === "string" && this.handlersMap[data.cmd]) {
          this.handlersMap[data.cmd](data);
        } else {
          console.warn("\u{1F680}unknown msg", data);
        }
      }
    };
    this.port.onmessageerror = (e) => {
      console.error("\u{1F680} ~ YoungRPCSlave ~ e", e);
    };
    this.masterWindow.postMessage(this.shakeHandsMsg, "*", [channel.port2]);
  }
  trigger(cmd, params = {}) {
    this.port.postMessage({ cmd, params });
  }
  setHandler(cmd, { success, fail } = {}) {
    this.handlersMap[cmd] = (_0) => __async(this, [_0], function* ({ ok, data }) {
      if (ok) {
        yield success == null ? void 0 : success(data);
      } else {
        yield fail == null ? void 0 : fail(data);
      }
    });
    return this.trigger.bind(this, cmd);
  }
};

// src/core/master.ts
var YoungRPCMaster = class {
  constructor(shakeHandsMsg = SHAKE_HANDS_MSG) {
    this.handlersMap = {};
    window.addEventListener("message", (e) => __async(this, null, function* () {
      if (e.data === shakeHandsMsg) {
        this.port = e.ports[0];
        this.port.onmessage = (e2) => {
          const { data, isTrusted } = e2;
          if (isTrusted && data) {
            if (data.cmd && typeof data.cmd === "string" && this.handlersMap[data.cmd]) {
              this.handlersMap[data.cmd](data.params);
            } else {
              console.warn("\u{1F680}unknown msg", data);
            }
          }
        };
        this.port.onmessageerror = (e2) => {
          console.error("\u{1F680} ~ YoungRPCMaster ~ ", e2);
        };
        console.log("\u{1F680}\u{1F680}\u{1F680} master app is ready \u{1F680}\u{1F680}\u{1F680}, shakeHandsMsg: ", shakeHandsMsg);
      }
    }));
  }
  setHandler(cmd, cbk) {
    this.handlersMap[cmd] = cbk;
  }
  close() {
    this.port.close();
  }
  sendMsg(data) {
    this.port.postMessage(data);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  YoungRPCMaster,
  YoungRPCSlave
});
