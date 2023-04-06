const r = "---young-rpc-shake-hands-message-request---";
class i {
  constructor(s = r) {
    this.shakeHandsMsg = s, this.handlersMap = {}, window.opener && window.opener !== window ? this.masterWindow = window.opener : window.parent && window.parent !== window && (this.masterWindow = window.parent), this.shakeHands();
  }
  shakeHands() {
    if (!this.masterWindow)
      throw new Error("YoungRPCSlave can only be used in sub window");
    const s = new MessageChannel();
    this.port = s.port1, this.port.onmessage = (n) => {
      const { data: e, isTrusted: t } = n;
      t && e && (e.cmd && typeof e.cmd == "string" && this.handlersMap[e.cmd] ? this.handlersMap[e.cmd](e) : console.warn("🚀unknown msg", e));
    }, this.port.onmessageerror = (n) => {
      console.error("🚀 ~ YoungRPCSlave ~ e", n);
    }, this.masterWindow.postMessage(this.shakeHandsMsg, "*", [s.port2]);
  }
  trigger(s, n = {}) {
    this.port.postMessage({ cmd: s, params: n });
  }
  setHandler(s, { success: n, fail: e } = {}) {
    return this.handlersMap[s] = async ({ ok: t, data: o }) => {
      t ? await (n == null ? void 0 : n(o)) : await (e == null ? void 0 : e(o));
    }, this.trigger.bind(this, s);
  }
}
class d {
  constructor(s = r) {
    this.handlersMap = {}, window.addEventListener("message", async (n) => {
      n.data === s && (this.port = n.ports[0], this.port.onmessage = (e) => {
        const { data: t, isTrusted: o } = e;
        o && t && (t.cmd && typeof t.cmd == "string" && this.handlersMap[t.cmd] ? this.handlersMap[t.cmd](t.params) : console.warn("🚀unknown msg", t));
      }, this.port.onmessageerror = (e) => {
        console.error("🚀 ~ YoungRPCMaster ~ ", e);
      }, console.log("🚀🚀🚀 master app is ready 🚀🚀🚀, shakeHandsMsg: ", s));
    });
  }
  setHandler(s, n) {
    this.handlersMap[s] = n;
  }
  close() {
    this.port.close();
  }
  sendMsg(s) {
    this.port.postMessage(s);
  }
}
export {
  d as YoungRPCMaster,
  i as YoungRPCSlave
};
//# sourceMappingURL=index.es.js.map
