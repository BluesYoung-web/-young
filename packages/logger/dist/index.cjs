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
  useYoungLogger: () => useYoungLogger
});
module.exports = __toCommonJS(src_exports);
var import_consola = __toESM(require("consola"), 1);
var import_defu = require("defu");
var DEFAULT_CONFIG = {
  forceExit: {
    sync: true,
    async: false
  },
  wrapConsole: true,
  tag: "young_logger",
  reporter: ({ level, type, tag, args, date }, __log) => {
    __log(
      `${Math.floor(date.getTime() / 1e3)} ${type}  ${tag} - - - - - - - ${JSON.stringify(args)}`
    );
  }
};
var useYoungLogger = (conf = {}) => {
  const config = (0, import_defu.defu)(conf, DEFAULT_CONFIG);
  const __log = console.log;
  process.on("uncaughtException", (error) => {
    console.error("sync error: ", error.toString());
    config.forceExit.sync && process.exit(1);
  });
  process.on("unhandledRejection", (error) => {
    console.error("async error: ", error.toString());
    config.forceExit.async && process.exit(1);
  });
  const logger = import_consola.default.create({
    formatOptions: {
      compact: true
    },
    reporters: [
      {
        log: (args) => config.reporter(args, __log)
      }
    ]
  });
  logger.withTag(config.tag);
  config.wrapConsole && logger.wrapConsole();
  return {
    logger,
    consola: import_consola.default
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useYoungLogger
});
