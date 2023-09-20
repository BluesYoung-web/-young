"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useImagePreview = void 0;
var _ = require("..");
var _vue = require("vue");
const useImagePreview = (conf, zIndex = 9999) => {
  const appendTo = document.createElement("div");
  const vnode = (0, _vue.createVNode)(_.YoungImageViewer, {
    onDestroy: () => {
      document.body.removeChild(appendTo);
    },
    zIndex
  });
  (0, _vue.render)(vnode, appendTo);
  document.body.appendChild(appendTo);
  vnode.component.exposed?.show(conf);
};
exports.useImagePreview = useImagePreview;