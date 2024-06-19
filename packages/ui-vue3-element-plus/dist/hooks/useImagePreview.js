"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useImagePreview = useImagePreview;
exports.useVideoPreview = useVideoPreview;
var _ = require("..");
var _vue = require("vue");
var _elementPlus = require("element-plus");
function useImagePreview(conf, zIndex = 9999) {
  const appendTo = document.createElement("div");
  const vnode = (0, _vue.createVNode)(_.YoungImageViewer, {
    onDestroy: () => {
      document.body.removeChild(appendTo);
      conf.srcList.forEach(src => {
        URL.revokeObjectURL(src);
      });
    },
    zIndex
  });
  (0, _vue.render)(vnode, appendTo);
  document.body.appendChild(appendTo);
  vnode.component.exposed?.show(conf);
}
;
function useVideoPreview(src, zIndex = 9999) {
  const appendTo = document.createElement("div");
  const vnode = (0, _vue.createVNode)(_elementPlus.ElOverlay, {
    zIndex,
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "0 10rem"
    },
    onClick: () => {
      document.body.removeChild(appendTo);
      URL.revokeObjectURL(src);
    }
  }, {
    default: () => (0, _vue.h)("video", {
      style: {
        width: "100%",
        height: "100%",
        objectFit: "contain"
      },
      src,
      controls: true,
      autoplay: true
    })
  });
  (0, _vue.render)(vnode, appendTo);
  document.body.appendChild(appendTo);
}