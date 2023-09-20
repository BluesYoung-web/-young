"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
module.exports = void 0;
var _vue = require("vue");
var _core = require("@vueuse/core");
var _elementPlus = require("element-plus");
const landscape = "https://g2021-cdn.laiyouxi.com/image/21Store/laiyouxi_guid/website/landscape.png";
var _default = (0, _vue.defineComponent)({
  props: {
    maxWidth: {
      type: Number,
      default: 768
    }
  },
  setup(props, {
    attrs
  }) {
    const element = (0, _vue.ref)();
    const showTip = (0, _vue.ref)(false);
    const show = () => showTip.value = true;
    const hide = () => showTip.value = false;
    const {
      width,
      height
    } = (0, _core.useWindowSize)();
    const isSmallDevices = (0, _vue.computed)(() => width.value < height.value || width.value < props.maxWidth);
    (0, _vue.watchEffect)(() => {
      if (isSmallDevices.value) {
        show();
      } else {
        hide();
      }
    });
    (0, _core.useEventListener)(element, "animationend", e => {
      hide();
    });
    return () => /* @__PURE__ */React.createElement(React.Fragment, null, showTip.value && /* @__PURE__ */React.createElement(_elementPlus.ElOverlay, {
      mask: true,
      style: {
        width: "100vw",
        height: "100vh"
      },
      ...attrs
    }, /* @__PURE__ */React.createElement("div", {
      style: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }
    }, /* @__PURE__ */React.createElement("style", null, `
                @keyframes rotate {
                  from {
                    transform: rotate(0);
                  }
                
                  to {
                    transform: rotate(90deg);
                  }
                }
                .rotate-tip {
                  width: 200px;
                  animation-name: rotate;
                  animation-iteration-count: 6;
                  animation-duration: 1s;
                  animation-direction: alternate;
                  animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
                }
                `), /* @__PURE__ */React.createElement("img", {
      ref: element,
      src: landscape,
      class: "rotate-tip"
    }), /* @__PURE__ */React.createElement("div", {
      style: {
        color: "white",
        marginTop: "2.5rem",
        fontSize: "1.25rem",
        lineHeight: "1.75rem"
      }
    }, "\u4E3A\u4E86\u66F4\u597D\u7684\u7528\u6237\u4F53\u9A8C\uFF0C\u8BF7\u6A2A\u5C4F\u4F7F\u7528"))));
  }
});
module.exports = _default;