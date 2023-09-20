import { YoungImageViewer } from "../index.mjs";
import { createVNode, render } from "vue";
export const useImagePreview = (conf, zIndex = 9999) => {
  const appendTo = document.createElement("div");
  const vnode = createVNode(YoungImageViewer, {
    onDestroy: () => {
      document.body.removeChild(appendTo);
    },
    zIndex
  });
  render(vnode, appendTo);
  document.body.appendChild(appendTo);
  vnode.component.exposed?.show(conf);
};
