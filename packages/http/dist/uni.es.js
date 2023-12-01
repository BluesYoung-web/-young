import { a as O, s as R, b as P, c as M, d as k, e as q, f as x } from "./index-67a7e4df.mjs";
const {
  Axios: H,
  AxiosError: m,
  CanceledError: _,
  isCancel: B,
  CancelToken: G,
  VERSION: z,
  all: Q,
  Cancel: X,
  isAxiosError: Y,
  spread: Z,
  toFormData: $,
  AxiosHeaders: ee,
  HttpStatusCode: te,
  formToJSON: oe,
  getAdapter: ne,
  mergeConfig: ae
} = O;
var F = (e) => {
  let { method: v = "GET" } = e;
  switch (v.toLocaleLowerCase()) {
    case "download":
      return "download";
    case "upload":
      return "upload";
    default:
      return "request";
  }
}, U = (e) => ({ ...e }), y = (e, v) => {
  var a, o, c, d, l;
  let p = e.data, f = e.responseType === "arraybuffer" ? "arraybuffer" : "text", r = f === "text" ? "json" : void 0, s = e.headers;
  if (e.auth) {
    let E = e.auth.username || "", L = e.auth.password ? unescape(encodeURIComponent(e.auth.password)) : "";
    s.set("Authorization", "Basic " + btoa(E + ":" + L));
  }
  let u = P(e.baseURL, e.url), g = (o = (a = e == null ? void 0 : e.method) == null ? void 0 : a.toUpperCase()) != null ? o : "GET", w = M(u, e.params, e.paramsSerializer), t = e.timeout || 6e4, n = (c = e.withCredentials) != null ? c : !1, i = (d = e.sslVerify) != null ? d : !0, h = (l = e.firstIpv4) != null ? l : !1, b = {};
  if (p && typeof p == "string")
    try {
      b = JSON.parse(p);
    } catch {
    }
  let T = s.toJSON();
  return { ...e, url: w, data: p, header: T, method: g, responseType: f, dataType: r, timeout: t, withCredentials: n, sslVerify: i, firstIpv4: h, formData: b };
}, D = (e, v) => {
  let a = 0, o = k(50, 250);
  return (c) => {
    let d = c.totalBytesWritten, l = c.totalBytesExpectedToWrite, p = d - a, f = o(p), r = d <= l;
    a = d;
    let s = { loaded: d, total: l, progress: l ? d / l : void 0, bytes: p, rate: f || void 0, estimated: f && l && r ? (l - d) / f : void 0, event: c };
    s[v ? "download" : "upload"] = !0, e(s);
  };
}, C = class {
  constructor(e) {
    this.config = e;
  }
  subscribe(e, v) {
    (this.config.cancelToken || this.config.signal) && (this.onCanceled = (a) => {
      e && (v(!a || a.type ? new _(void 0, void 0, this.config, e) : a), e.abort(), e = null);
    }, this.config.cancelToken && this.config.cancelToken.subscribe(this.onCanceled), this.config.signal && this.config.signal.addEventListener && (this.config.signal.aborted ? this.onCanceled() : this.config.signal.addEventListener("abort", this.onCanceled)));
  }
  unsubscribe() {
    this.config.cancelToken && this.config.cancelToken.unsubscribe(this.onCanceled), this.config.signal && this.config.signal.removeEventListener && this.config.signal.removeEventListener("abort", this.onCanceled);
  }
}, I = (e, v) => new Promise((a, o) => {
  let { url: c, header: d, timeout: l, filePath: p } = y(e), f = new C(e), r = uni.downloadFile({ url: c, header: d, timeout: l, filePath: p, success(s) {
    var u;
    if (!r)
      return;
    let g = { config: e, data: s.tempFilePath, headers: {}, status: s.statusCode, statusText: (u = s.errMsg) != null ? u : "OK", request: r };
    R(a, o, g), r = null;
  }, fail(s) {
    let { errMsg: u = "" } = s ?? {};
    u && (u === "downloadFile:fail timeout" && o(new m(u, m.ETIMEDOUT, e, r)), u === "downloadFile:fail" && o(new m(u, m.ERR_NETWORK, e, r))), o(new m(s.errMsg, void 0, e, r)), r = null;
  }, complete() {
    f.unsubscribe();
  } });
  typeof e.onDownloadProgress == "function" && r.onProgressUpdate(D(e.onDownloadProgress, !0)), typeof e.onHeadersReceived == "function" && r.onHeadersReceived(e.onHeadersReceived), f.subscribe(r, o);
}), A = I, K = (e, v) => new Promise((a, o) => {
  let { url: c, files: d, fileType: l, file: p, filePath: f, name: r, header: s, timeout: u, formData: g } = y(e), w = new C(e), t = uni.uploadFile({ url: c, files: d, fileType: l, file: p, filePath: f, name: r, header: s, timeout: u, formData: g, success(n) {
    var i;
    if (!t)
      return;
    let h = { config: e, data: n.data, headers: {}, status: n.statusCode, statusText: (i = n.errMsg) != null ? i : "OK", request: t };
    R(a, o, h), t = null;
  }, fail(n) {
    let { errMsg: i = "" } = n ?? {};
    if (i) {
      let h = i === "uploadFile:fail timeout", b = i === "uploadFile:fail file error";
      h && o(new m(i, m.ETIMEDOUT, e, t)), b && o(new m(i, m.ERR_NETWORK, e, t));
    }
    o(new m(n.errMsg, void 0, e, t)), t = null;
  }, complete() {
    w.unsubscribe();
  } });
  typeof e.onHeadersReceived == "function" && t.onHeadersReceived(e.onHeadersReceived), w.subscribe(t, o);
}), N = K, S = (e, v) => new Promise((a, o) => {
  let { url: c, data: d, header: l, method: p, timeout: f, dataType: r, responseType: s, sslVerify: u, withCredentials: g, firstIpv4: w } = y(e), t = new C(e), n = uni.request({ url: c, data: d, header: l, method: p, timeout: f, dataType: r, responseType: s, sslVerify: u, withCredentials: g, firstIpv4: w, success(i) {
    var h;
    if (!n)
      return;
    let b = { config: e, data: i.data, headers: i.header, status: i.statusCode, statusText: (h = i.errMsg) != null ? h : "OK", request: n, cookies: i.cookies };
    R(a, o, b), n = null;
  }, fail(i) {
    let { errMsg: h = "" } = i ?? {};
    if (h) {
      let b = h === "request:fail timeout", T = h === "request:fail";
      b && o(new m(h, m.ETIMEDOUT, e, n)), T && o(new m(h, m.ERR_NETWORK, e, n));
    }
    o(new m(i.errMsg, void 0, e, n)), n = null;
  }, complete() {
    t.unsubscribe();
  } });
  typeof e.onHeadersReceived == "function" && n.onHeadersReceived(e.onHeadersReceived), t.subscribe(n, o);
}), V = S, W = (e) => {
  switch (F(e)) {
    case "download":
      return A;
    case "upload":
      return N;
    default:
      return V;
  }
}, j = (e = {}) => {
  let v = U(e);
  return H.prototype.download = function(a, o) {
    return this.request({ url: a, method: "download", ...o });
  }, H.prototype.upload = function(a, o, c) {
    return this.request({ url: a, method: "upload", data: o, ...c });
  }, (a) => W(a)(a, v);
};
const ie = (e = {}) => {
  const v = q(e, x), { baseURL: a, lazyBaseURL: o, method: c, timeout: d, headers: l, checkFn: p, loading: f, fail: r } = v, s = O.create({
    method: c,
    timeout: d,
    adapter: j()
  });
  let u = 0;
  function g() {
    u++, f.start();
  }
  function w() {
    --u === 0 && f.end();
  }
  return s.interceptors.request.use(
    (t) => (!t.notLoading && g(), t.baseURL || (t.baseURL = (o == null ? void 0 : o()) ?? a), t),
    (t) => (r(t, t), Promise.reject(t))
  ), s.interceptors.response.use(
    (t) => {
      !t.config.notLoading && w();
      const n = t.data;
      try {
        return p(n);
      } catch (i) {
        r(i, t);
      }
    },
    (t) => {
      t && t.config && !t.config.notLoading && w(), r(t, t);
    }
  ), {
    get: void 0,
    post: void 0,
    delete: void 0,
    put: void 0,
    patch: void 0,
    head: void 0,
    purge: void 0,
    options: void 0,
    link: void 0,
    unlink: void 0,
    __instance__: s,
    __mixin__(t) {
      for (const n in t)
        if (Object.prototype.hasOwnProperty.call(t, n)) {
          const i = this[n] || {}, h = t[n];
          this[n] = {
            ...i,
            ...h
          };
        }
      return this;
    },
    freeReq: (t) => s.request({
      ...t,
      headers: {
        ...l.getCommonHeaders(t),
        ...t == null ? void 0 : t.headers
      }
    }),
    authReq: (t) => s.request({
      ...t,
      headers: {
        ...l.getCommonHeaders(t),
        ...l.getAuthHeaders(t),
        ...t == null ? void 0 : t.headers
      }
    })
  };
};
export {
  ie as useHttp
};
//# sourceMappingURL=uni.es.js.map
