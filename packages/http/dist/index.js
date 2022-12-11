var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  UsefulContentTypes: () => UsefulContentTypes,
  useHttp: () => useHttp
});
module.exports = __toCommonJS(src_exports);
var import_axios = __toESM(require("axios"));
var import_defu = require("defu");
var UsefulContentTypes = /* @__PURE__ */ ((UsefulContentTypes2) => {
  UsefulContentTypes2["JSON"] = `application/json; charset=UTF-8`;
  UsefulContentTypes2["URLEncoded"] = `application/x-www-form-urlencoded; charset=UTF-8`;
  UsefulContentTypes2["FormData"] = `multipart/form-data; charset=UTF-8`;
  return UsefulContentTypes2;
})(UsefulContentTypes || {});
var defaultConfig = {
  baseURL: "/api",
  timeout: 5e3,
  loading: {
    start: console.log.bind(null, "\u{1F680} ~ http loading start"),
    end: console.log.bind(null, "\u{1F680} ~ http loading end")
  },
  fail: console.error.bind(null, "\u{1F680} ~ http loading error"),
  checkFn: () => true,
  headers: {
    getCommonHeaders: () => ({}),
    getAuthHeaders: () => ({})
  }
};
var useHttp = (config = {}) => {
  const finalConfig = (0, import_defu.defu)(config, defaultConfig);
  const { baseURL, timeout, headers, checkFn, adapter, loading, fail } = finalConfig;
  const net = import_axios.default.create({
    baseURL,
    timeout,
    headers: headers.getCommonHeaders(),
    adapter
  });
  net.interceptors.request.use((req) => {
    loading.start();
    return req;
  }, (error) => {
    fail(error);
    return Promise.reject(error);
  });
  net.interceptors.response.use((response) => {
    loading.end();
    const data = response.data;
    if (checkFn(data)) {
      return data;
    } else {
      fail(data);
      throw new Error(data);
    }
  }, (error) => {
    loading.end();
    fail(error.message);
    throw new Error(error.message);
  });
  return {
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
    __instance__: net,
    __mixin__(extentions) {
      for (const method in extentions) {
        if (Object.prototype.hasOwnProperty.call(extentions, method)) {
          const originFns = this[method] || {};
          const fns = extentions[method];
          this[method] = __spreadValues(__spreadValues({}, originFns), fns);
        }
      }
      return this;
    },
    freeReq: net.request,
    authReq: (args) => net.request(__spreadProps(__spreadValues({}, args), {
      headers: __spreadValues(__spreadValues({}, headers.getAuthHeaders()), args == null ? void 0 : args.headers)
    }))
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UsefulContentTypes,
  useHttp
});
