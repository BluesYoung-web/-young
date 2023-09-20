"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
module.exports = void 0;
var _vue = require("vue");
var _elementPlus = require("element-plus");
var _2 = require("..");
var _utils = require("@bluesyoung/utils");
var _vueCropper = require("vue-cropper");
require("vue-cropper/dist/index.css");
var _core = require("@vueuse/core");
var _default = (0, _vue.defineComponent)({
  props: {
    modelValue: {
      type: Array,
      required: true
    },
    limit: {
      type: Number,
      default: 1
    },
    type: {
      type: String,
      default: "image"
    },
    accept: {
      type: String,
      default: ""
    },
    uploadFn: {
      type: Function,
      required: true
    },
    cropper: {
      type: Boolean,
      default: false
    },
    aspt: {
      type: Object,
      default: () => [1, 1]
    },
    cropperAttrs: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ["update:modelValue", "change"],
  setup(props, {
    emit
  }) {
    const files = (0, _vue.computed)(() => props.modelValue.map((url, index) => ({
      uid: index,
      name: url,
      status: "success",
      url
    })));
    const exceed = () => _elementPlus.ElMessage.error("\u8D85\u51FA\u6570\u91CF\u9650\u5236\uFF01\uFF01\uFF01");
    const del = (_, all) => {
      const arr = all.map(item => item.url);
      emit("update:modelValue", arr);
      emit("change", arr);
    };
    const upload = async file => {
      if (file) {
        if (props.type === "image" && props.cropper) {
          showClipPopup.value = true;
          await (0, _vue.nextTick)();
          coverFile.value = URL.createObjectURL(file.raw);
          cropper.value.startCrop();
        } else {
          const url = await props.uploadFn(file.raw);
          const arr = [...files.value.filter(item => item.status === "success").map(item => item.url), url];
          emit("update:modelValue", arr);
          emit("change", arr);
        }
      }
    };
    const preView = url => {
      const index = props.modelValue.indexOf(url);
      (0, _2.useImagePreview)({
        srcList: props.modelValue,
        index: index === -1 ? 0 : index
      });
    };
    const limitStyle = (0, _vue.computed)(() => props.modelValue.length < props.limit ? "inline-flex" : "none");
    const id = "young-upload-" + (0, _utils.randomId)();
    const cropper = (0, _vue.ref)();
    const coverFile = (0, _vue.ref)();
    const showClipPopup = (0, _vue.ref)(false);
    const sureClip = () => {
      cropper.value.getCropBlob(async blob => {
        const url = await props.uploadFn(blob);
        const arr = [...files.value.filter(item => item.status === "success").map(item => item.url), url];
        emit("update:modelValue", arr);
        emit("change", arr);
        coverFile.value = "";
      });
      showClipPopup.value = false;
    };
    const cancelClip = () => {
      coverFile.value = "";
      showClipPopup.value = false;
      const arr = [...files.value.filter(item => item.status === "success").map(item => item.url)];
      emit("update:modelValue", arr);
      emit("change", arr);
    };
    const ltLg = (0, _core.useMediaQuery)("(max-width: 1023.9px)");
    return () => /* @__PURE__ */React.createElement("div", {
      id
    }, /* @__PURE__ */React.createElement("style", null, `
          #${id} .el-upload--picture-card {
            display: ${limitStyle.value};
          }
          `), /* @__PURE__ */React.createElement(_elementPlus.ElUpload, {
      accept: props.accept ? props.accept : props.type === "image" ? "image/*" : "*",
      limit: props.limit,
      listType: props.type === "image" ? "picture-card" : void 0,
      multiple: props.limit > 1,
      fileList: files.value,
      autoUpload: false,
      onExceed: exceed,
      onChange: upload,
      onRemove: del,
      onPreview: ({
        url
      }) => props.type === "image" && preView(url),
      style: {
        maxWidth: "500px"
      }
    }, /* @__PURE__ */React.createElement("div", null, props.modelValue.length < props.limit && props.type === "image" ? /* @__PURE__ */React.createElement("div", {
      style: {
        fontSize: "1.875rem",
        lineHeight: "2.25rem"
      }
    }, /* @__PURE__ */React.createElement("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      width: "1em",
      height: "1em",
      viewBox: "0 0 24 24"
    }, /* @__PURE__ */React.createElement("path", {
      fill: "currentColor",
      d: "M18 12.998h-5v5a1 1 0 0 1-2 0v-5H6a1 1 0 0 1 0-2h5v-5a1 1 0 0 1 2 0v5h5a1 1 0 0 1 0 2z"
    }))) : props.modelValue.length < props.limit ? /* @__PURE__ */React.createElement("div", {
      style: {
        marginRight: "0.5rem"
      }
    }, /* @__PURE__ */React.createElement(_elementPlus.ElButton, {
      type: "primary"
    }, "\u4E0A\u4F20\u6587\u4EF6")) : /* @__PURE__ */React.createElement("div", {
      style: {
        cursor: "not-allowed",
        pointerEvents: "none"
      }
    }, "\u5DF2\u8FBE\u6570\u91CF\u4E0A\u9650")), /* @__PURE__ */React.createElement("div", null, "(", props.modelValue.length, " / ", props.limit, ")")), /* @__PURE__ */React.createElement(_2.YoungDialog, {
      modelValue: showClipPopup.value,
      "onUpdate:modelValue": v => showClipPopup.value = v,
      top: "0",
      width: "96%",
      realTitle: "\u56FE\u7247\u88C1\u526A",
      showCancel: false,
      showSure: false
    }, {
      body: () => /* @__PURE__ */React.createElement("div", {
        style: {
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }
      }, /* @__PURE__ */React.createElement("div", {
        style: {
          width: ltLg.value ? "90vw" : "800px",
          height: ltLg.value ? "90vh" : "72vh"
        }
      }, /* @__PURE__ */React.createElement(_vueCropper.VueCropper, {
        ref: cropper,
        autoCrop: true,
        centerBox: true,
        fixedNumber: props.aspt,
        img: coverFile.value,
        outputType: "webp",
        fixed: true,
        ...props.cropperAttrs
      })), /* @__PURE__ */React.createElement("div", {
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "80px",
          width: "96%",
          padding: "0 20px"
        }
      }, /* @__PURE__ */React.createElement(_elementPlus.ElButton, {
        style: {
          width: "48%"
        },
        onClick: cancelClip
      }, "\u53D6\u6D88"), /* @__PURE__ */React.createElement(_elementPlus.ElButton, {
        style: {
          width: "48%"
        },
        type: "primary",
        onClick: sureClip
      }, "\u88C1\u526A")))
    }));
  }
});
module.exports = _default;