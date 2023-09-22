"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
module.exports = void 0;
var _kit = require("@nuxt/kit");
var _tool = require("./tool");
const NAME = "@bluesyoung/nuxt3-lazy-load";
var _default = (0, _kit.defineNuxtModule)({
  meta: {
    name: NAME,
    configKey: NAME
  },
  defaults: {
    images: true,
    videos: true,
    audios: true,
    iframes: true,
    native: false,
    directiveOnly: false,
    loadingClass: "isLoading",
    loadedClass: "isLoaded",
    appendClass: "lazyLoad",
    observerConfig: {},
    defaultImage: ""
  },
  setup(options, nuxt) {
    (0, _kit.extendViteConfig)(config => {
      if (!config.vue.template.transfromAssetUrls) config.vue.template.transfromAssetUrls = {};
      config.vue.template.transfromAssetUrls["img"] = ["src", "data-src", "srcset", "data-srcset", "data-flickity-lazyload"];
      config.vue.template.transfromAssetUrls["video"] = ["src", "data-src", "poster", "data-poster"];
      config.vue.template.transfromAssetUrls["audio"] = ["src", "data-src"];
      config.vue.template.transfromAssetUrls["iframe"] = ["src", "data-src"];
      config.vue.template.transfromAssetUrls["source"] = ["src", "data-src", "srcset", "data-srcset"];
      const replaceArr = [];
      if (!options.native) {
        replaceArr.push({
          from: /<img[^>]*?>/g,
          to: match => (0, _tool.isNotLazy)(match, options, "images") ? match : (0, _tool.replaceAttrs)(match, "img", ["src", "srcset"], options)
        });
        replaceArr.push({
          from: /<source[^>]*?>/g,
          to: match => (0, _tool.isNotLazy)(match) ? match : (0, _tool.replaceAttrs)(match, "", ["src", "srcset"], options)
        });
        replaceArr.push({
          from: /<video[^>]*?>/g,
          to: match => (0, _tool.isNotLazy)(match, options, "videos") ? match.replace("<video", "<video v-not-lazy") : (0, _tool.replaceAttrs)(match, "video", ["src", "poster"], options)
        });
        replaceArr.push({
          from: /<picture[^>]*?>/g,
          to: match => (0, _tool.isNotLazy)(match, options, "images") ? match.replace("<picture", "<picture v-not-lazy") : (0, _tool.replaceAttrs)(match, "picture", ["src"], options)
        });
        replaceArr.push({
          from: /<audio[^>]*?>/g,
          to: match => (0, _tool.isNotLazy)(match, options, "audios") ? match.replace("<audio", "<audio v-not-lazy") : (0, _tool.replaceAttrs)(match, "audio", ["src"], options)
        });
        replaceArr.push({
          from: /<iframe[^>]*?>/g,
          to: match => (0, _tool.isNotLazy)(match, options, "iframes") ? match.replace("<iframe", "<iframe v-not-lazy") : (0, _tool.replaceAttrs)(match, "iframe", ["src"], options)
        });
      } else {
        replaceArr.push({
          from: /<img[^>]*?>/g,
          to: match => (0, _tool.isNotLazy)(match, options, "images") ? match : match.replace("<img", '<img loading="lazy"')
        });
        replaceArr.push({
          from: /<video[^>]*?>/g,
          to: match => (0, _tool.isNotLazy)(match, options, "videos") ? match : match.replace("<video", '<video loading="lazy"')
        });
        replaceArr.push({
          from: /<audio[^>]*?>/g,
          to: match => (0, _tool.isNotLazy)(match, options, "audios") ? match : match.replace("<audio", '<audio loading="lazy"')
        });
        replaceArr.push({
          from: /<iframe[^>]*?>/g,
          to: match => (0, _tool.isNotLazy)(match, options, "iframes") ? match : match.replace("<iframe", '<iframe loading="lazy"')
        });
      }
      config.plugins?.push({
        name: NAME,
        enforce: "pre",
        transform(src) {
          return {
            code: (0, _tool.replaceSrc)(src, replaceArr),
            map: null
          };
        }
      });
    });
    if (!options.native) {
      (0, _kit.addTemplate)({
        filename: "@bluesyoung/nuxt3-lazy-load.ts",
        write: true,
        getContents: () => `export const options = ${JSON.stringify(options, null, 2)}`
      });
      const resolver = (0, _kit.createResolver)(require('url').pathToFileURL(__filename).toString());
      (0, _kit.addPlugin)(resolver.resolve("./runtime/plugin"));
    }
  }
});
module.exports = _default;