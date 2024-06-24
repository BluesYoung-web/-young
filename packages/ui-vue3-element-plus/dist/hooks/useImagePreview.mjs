import { YoungImageViewer } from "../index.mjs";
import { createVNode, render, h } from "vue";
import { ElOverlay } from "element-plus";
export function useImagePreview(conf, zIndex = 9999) {
  const appendTo = document.createElement("div");
  const vnode = createVNode(YoungImageViewer, {
    onDestroy: () => {
      document.body.removeChild(appendTo);
      conf.srcList.forEach((src) => {
        URL.revokeObjectURL(src);
      });
    },
    zIndex
  });
  render(vnode, appendTo);
  document.body.appendChild(appendTo);
  vnode.component.exposed?.show(conf);
}
;
export function useVideoPreview(src, zIndex = 9999) {
  const appendTo = document.createElement("div");
  const vnode = createVNode(ElOverlay, {
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
    default: () => h("video", {
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
  render(vnode, appendTo);
  document.body.appendChild(appendTo);
}
export function useAudioPreview(src, zIndex = 9999) {
  const appendTo = document.createElement("div");
  const vnode = createVNode(ElOverlay, {
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
    default: () => h("audio", {
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
  render(vnode, appendTo);
  document.body.appendChild(appendTo);
}
