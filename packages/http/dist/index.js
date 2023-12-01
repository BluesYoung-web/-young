var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  UsefulContentTypes: () => UsefulContentTypes,
  defaultConfig: () => defaultConfig,
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
  method: "post",
  timeout: 5e3,
  loading: {
    start: console.log.bind(null, "\u{1F680} ~ http loading start"),
    end: console.log.bind(null, "\u{1F680} ~ http loading end")
  },
  fail: console.error.bind(null, "\u{1F680} ~ http loading error"),
  checkFn: (res) => res,
  headers: {
    getCommonHeaders: () => ({}),
    getAuthHeaders: () => ({})
  }
};
var useHttp = (config = {}) => {
  const finalConfig = (0, import_defu.defu)(config, defaultConfig);
  const { baseURL, lazyBaseURL, method, timeout, headers, checkFn, loading, fail } = finalConfig;
  const net = import_axios.default.create({
    method,
    timeout
  });
  let loadingCount = 0;
  function startLoading() {
    loadingCount++;
    loading.start();
  }
  function endLoading() {
    if (--loadingCount === 0) {
      loading.end();
    }
  }
  net.interceptors.request.use(
    (req) => {
      !req.notLoading && startLoading();
      if (!req.baseURL) {
        req.baseURL = (lazyBaseURL == null ? void 0 : lazyBaseURL()) ?? baseURL;
      }
      return req;
    },
    (error) => {
      fail(error, error);
      return Promise.reject(error);
    }
  );
  net.interceptors.response.use(
    (response) => {
      !response.config.notLoading && endLoading();
      const data = response.data;
      try {
        return checkFn(data);
      } catch (err) {
        fail(err, response);
      }
    },
    (error) => {
      if (error && error.config && !error.config.notLoading) {
        endLoading();
      }
      fail(error, error);
    }
  );
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
      for (const method2 in extentions) {
        if (Object.prototype.hasOwnProperty.call(extentions, method2)) {
          const originFns = this[method2] || {};
          const fns = extentions[method2];
          this[method2] = {
            ...originFns,
            ...fns
          };
        }
      }
      return this;
    },
    freeReq: (args) => net.request({
      ...args,
      headers: {
        ...headers.getCommonHeaders(args),
        ...args == null ? void 0 : args.headers
      }
    }),
    authReq: (args) => net.request({
      ...args,
      headers: {
        ...headers.getCommonHeaders(args),
        ...headers.getAuthHeaders(args),
        ...args == null ? void 0 : args.headers
      }
    })
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UsefulContentTypes,
  defaultConfig,
  useHttp
});
