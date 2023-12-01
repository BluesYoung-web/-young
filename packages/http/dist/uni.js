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

// src/uni.ts
var uni_exports = {};
__export(uni_exports, {
  useHttp: () => useHttp
});
module.exports = __toCommonJS(uni_exports);

// src/index.ts
var import_axios = __toESM(require("axios"));
var import_defu = require("defu");
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

// src/uni.ts
var import_defu2 = require("defu");
var import_axios2 = __toESM(require("axios"));
var import_axios_adapter = require("@uni-helper/axios-adapter");
var useHttp = (config = {}) => {
  const finalConfig = (0, import_defu2.defu)(config, defaultConfig);
  const { baseURL, lazyBaseURL, method, timeout, headers, checkFn, loading, fail } = finalConfig;
  const net = import_axios2.default.create({
    method,
    timeout,
    adapter: (0, import_axios_adapter.createUniAppAxiosAdapter)()
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
  useHttp
});
