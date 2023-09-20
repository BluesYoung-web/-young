"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
module.exports = void 0;
var _core = require("@vueuse/core");
var _elementPlus = require("element-plus");
var _vue = require("vue");
var _default = (0, _vue.defineComponent)({
  props: {
    onDestroy: {
      type: Function,
      default: () => console.log("\u4E3A\u4E86\u8282\u7701\u6027\u80FD\uFF0C\u6B64\u65F6\u5E94\u8BE5\u9500\u6BC1dom")
    },
    zIndex: {
      type: Number,
      default: 9999
    }
  },
  setup(props, {
    expose
  }) {
    const showViewer = (0, _vue.ref)(false);
    const previewConfig = (0, _vue.reactive)({
      srcList: [],
      index: 0,
      zIndex: props.zIndex
    });
    function wheelHandler(e) {
      if (!e.ctrlKey) return;
      if (e.deltaY < 0) {
        e.preventDefault();
        return false;
      } else if (e.deltaY > 0) {
        e.preventDefault();
        return false;
      }
    }
    const stopWheelListener = (0, _core.useEventListener)("wheel", wheelHandler, {
      passive: false
    });
    let prevOverflow;
    function show(conf) {
      previewConfig.srcList = conf.srcList;
      previewConfig.index = conf.index ?? 0;
      prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      showViewer.value = true;
    }
    function close() {
      stopWheelListener();
      document.body.style.overflow = prevOverflow;
      showViewer.value = false;
      props.onDestroy();
    }
    expose({
      show,
      close
    });
    return () => showViewer.value && /* @__PURE__ */React.createElement(_elementPlus.ElImageViewer, {
      zIndex: previewConfig.zIndex,
      initialIndex: previewConfig.index,
      urlList: previewConfig.srcList,
      hideOnClickModal: true,
      onClose: close
    });
  }
});
module.exports = _default;