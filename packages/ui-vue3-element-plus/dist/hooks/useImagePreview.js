"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getVideoCover = getVideoCover;
exports.useAudioPreview = useAudioPreview;
exports.useImagePreview = useImagePreview;
exports.useVideoPreview = useVideoPreview;
var _ = require("..");
var _vue = require("vue");
var _elementPlus = require("element-plus");
var _utils = require("@bluesyoung/utils");
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
        objectFit: "contain",
        background: "rgba(0,0,0)"
      },
      src,
      controls: true,
      autoplay: true
    })
  });
  (0, _vue.render)(vnode, appendTo);
  document.body.appendChild(appendTo);
}
function useAudioPreview(src, zIndex = 9999) {
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
    default: () => (0, _vue.h)("audio", {
      style: {
        width: "100%",
        // height: '100%',
        padding: "10rem",
        objectFit: "contain",
        background: "rgba(0,0,0)"
      },
      src,
      controls: true,
      autoplay: true
    })
  });
  (0, _vue.render)(vnode, appendTo);
  document.body.appendChild(appendTo);
}
async function getVideoCover(v, seek = 1, w = 320, h2 = 240) {
  return new Promise(resolve => {
    const video = document.createElement("video");
    video.src = (0, _utils.isString)(v) ? v : URL.createObjectURL(v);
    video.crossOrigin = "anonymous";
    video.currentTime = seek;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    video.oncanplay = () => {
      canvas.width = w;
      canvas.height = h2;
      ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);
      try {
        resolve(canvas.toDataURL("image/png", 0.75));
      } catch (error) {
        console.log("\u{1F680} ~ getVideoCover ~ error:", error);
      } finally {
        URL.revokeObjectURL(video.src);
        video.remove();
        canvas.remove();
      }
    };
  });
}