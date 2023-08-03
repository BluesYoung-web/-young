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

// src/resolver.ts
var resolver_exports = {};
__export(resolver_exports, {
  YoungApisResolver: () => YoungApisResolver,
  YoungComponentsResolver: () => YoungComponentsResolver
});
module.exports = __toCommonJS(resolver_exports);

// package.json
var package_default = {
  name: "@bluesyoung/ui-vue3-element-plus",
  version: "0.11.1",
  description: "vue3 + element-plus ui components",
  type: "module",
  main: "dist/index.cjs.js",
  module: "dist/index.es.js",
  types: "dist/index.d.ts",
  exports: {
    ".": {
      require: "./dist/index.cjs.js",
      import: "./dist/index.es.js",
      types: "./dist/index.d.ts"
    },
    "./resolver": {
      types: "./dist/resolver.d.ts",
      require: "./dist/resolver.cjs.js",
      import: "./dist/resolver.es.js"
    }
  },
  scripts: {
    test: "vitest",
    build: "vite build && tsup",
    release: "pnpm build && bumpp --commit",
    push: "pnpm publish --access public"
  },
  devDependencies: {
    "@bluesyoung/ui-vue3": "workspace:*",
    "@bluesyoung/utils": "workspace:*",
    "@types/sortablejs": "^1.15.0",
    "@types/xlsx": "^0.0.36",
    "@vitejs/plugin-vue-jsx": "^2.1.1",
    "@vue/shared": "^3.2.47",
    "@vueuse/core": "^9.10.0",
    "element-plus": "^2.2.28",
    sortablejs: "^1.15.0",
    vitest: "^0.29.2",
    vue: "^3.2.45"
  },
  repository: {
    type: "git",
    url: "git+ssh://git@github.com/BluesYoung-web/young.git",
    directory: "packages/ui-vue3-element-plus"
  },
  keywords: [
    "ui components",
    "vue3",
    "element-plus"
  ],
  author: "BluesYoung-web",
  license: "MIT",
  bugs: {
    url: "https://github.com/BluesYoung-web/young/issues"
  },
  homepage: "https://github.com/BluesYoung-web/young#readme",
  dependencies: {
    "file-saver": "^2.0.5",
    xlsx: "^0.18.5"
  }
};

// src/resolver.ts
function YoungApisResolver() {
  return {
    [package_default.name]: [
      "useAutoLoad",
      "useFormMode",
      "useExport2Excel",
      "useVerifyCode",
      "useImagePreview",
      "useKeyUp",
      "useQuery",
      "useRemoteSearch"
    ]
  };
}
function YoungComponentsResolver() {
  return (componentName) => {
    if (componentName.startsWith("Young")) {
      return {
        name: componentName,
        from: package_default.name
      };
    }
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  YoungApisResolver,
  YoungComponentsResolver
});
