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
var _videoMetadataThumbnails = require("video-metadata-thumbnails");
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
async function getVideoCover(v, args = {
  start: 0,
  end: 0
}) {
  return new Promise(resolve => {
    if (!((0, _utils.isiOS)() || (0, _utils.isMacOS)()) && !(0, _utils.isString)(v)) {
      (0, _videoMetadataThumbnails.getThumbnails)(v, args).then(resolve);
    } else {
      const video = document.createElement("video");
      video.src = (0, _utils.isString)(v) ? v : URL.createObjectURL(v);
      video.src = "https://file.kiloseeds.com/dev_qianzi/2024/1adae90402d7415aa1a9e46dba78f865/1c7584752b01451ca2bdff123c81883c/6ae3e7e0c21e4215a9cff549b1744cc0.mp4";
      video.crossOrigin = "anonymous";
      video.currentTime = 1;
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      video.oncanplay = () => {
        canvas.width = video.clientWidth || 320;
        canvas.height = video.clientHeight || 240;
        ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);
        canvas.toBlob(b => {
          resolve([{
            blob: b,
            currentTime: 1
          }]);
          URL.revokeObjectURL(video.src);
          video.remove();
          canvas.remove();
        });
      };
    }
  });
}