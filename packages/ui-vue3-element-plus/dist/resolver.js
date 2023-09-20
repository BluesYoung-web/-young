"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.YoungApisResolver = YoungApisResolver;
exports.YoungComponentsResolver = YoungComponentsResolver;
var _promises = require("fs/promises");
async function YoungApisResolver() {
  const file = await (0, _promises.readFile)(new URL("../package.json", require('url').pathToFileURL(__filename).toString()), {
    encoding: "utf-8"
  });
  const pkg = JSON.parse(file);
  return {
    from: pkg.name,
    imports: ["useAutoLoad", "useFormMode", "useExport2Excel", "useVerifyCode", "useImagePreview", "useKeyUp", "useQuery", "useRemoteSearch"]
  };
}
async function YoungComponentsResolver() {
  const file = await (0, _promises.readFile)(new URL("../package.json", require('url').pathToFileURL(__filename).toString()), {
    encoding: "utf-8"
  });
  const pkg = JSON.parse(file);
  return componentName => {
    if (componentName.startsWith("Young")) {
      return {
        name: componentName,
        from: pkg.name
      };
    }
  };
}