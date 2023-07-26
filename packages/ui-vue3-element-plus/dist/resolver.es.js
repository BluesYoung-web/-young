const t = "@bluesyoung/ui-vue3-element-plus", o = "0.10.2", u = "vue3 + element-plus ui components", n = "module", i = "dist/index.cjs.js", r = "dist/index.es.js", p = "dist/index.d.ts", c = {
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
}, l = {
  test: "vitest",
  build: "vite build && tsup",
  release: "pnpm build && bumpp --commit",
  push: "pnpm publish --access public"
}, d = {
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
}, m = {
  type: "git",
  url: "git+ssh://git@github.com/BluesYoung-web/young.git",
  directory: "packages/ui-vue3-element-plus"
}, g = [
  "ui components",
  "vue3",
  "element-plus"
], a = "BluesYoung-web", v = "MIT", y = {
  url: "https://github.com/BluesYoung-web/young/issues"
}, b = "https://github.com/BluesYoung-web/young#readme", x = {
  "file-saver": "^2.0.5",
  xlsx: "^0.18.5"
}, s = {
  name: t,
  version: o,
  description: u,
  type: n,
  main: i,
  module: r,
  types: p,
  exports: c,
  scripts: l,
  devDependencies: d,
  repository: m,
  keywords: g,
  author: a,
  license: v,
  bugs: y,
  homepage: b,
  dependencies: x
};
function h() {
  return {
    [s.name]: [
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
function j() {
  return (e) => {
    if (e.startsWith("Young"))
      return {
        name: e,
        from: s.name
      };
  };
}
export {
  h as YoungApisResolver,
  j as YoungComponentsResolver
};
//# sourceMappingURL=resolver.es.js.map
