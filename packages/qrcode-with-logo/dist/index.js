var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  default: () => src_default
});
module.exports = __toCommonJS(src_exports);

// src/draw-canvas.ts
var import_qrcode = require("qrcode");

// src/utils.ts
var promisify = (f) => {
  return function() {
    const args = Array.prototype.slice.call(arguments);
    return new Promise(function(resolve, reject) {
      args.push(function(err, result) {
        if (err)
          reject(err);
        else
          resolve(result);
      });
      f.apply(null, args);
    });
  };
};

// src/draw-logo.ts
var drawLogo = async ({ canvas, logo }) => {
  if (!logo) {
    return;
  }
  const canvasWidth = canvas.width;
  if (typeof logo === "string") {
    logo = { src: logo };
  }
  const {
    logoSize = 0.15,
    borderColor = "#ffffff",
    bgColor = borderColor || "#ffffff",
    borderSize = 0.05,
    crossOrigin,
    borderRadius = 8,
    logoRadius = 0,
    src: logoSrc
  } = logo;
  let logoWidth = canvasWidth * logoSize;
  let logoXY = canvasWidth * (1 - logoSize) / 2;
  let logoBgWidth = canvasWidth * (logoSize + borderSize);
  let logoBgXY = canvasWidth * (1 - logoSize - borderSize) / 2;
  const ctx = canvas.getContext("2d");
  canvasRoundRect(ctx)(
    logoBgXY,
    logoBgXY,
    logoBgWidth,
    logoBgWidth,
    borderRadius
  );
  ctx.fillStyle = bgColor;
  ctx.fill();
  const image = new Image();
  if (crossOrigin) {
    if (typeof crossOrigin === "string") {
      image.setAttribute("crossorigin", crossOrigin);
    } else {
      image.setAttribute("crossorigin", "anonymous");
    }
  }
  image.src = logoSrc;
  const drawLogoWithImage = (image2) => {
    ctx.drawImage(image2, logoXY, logoXY, logoWidth, logoWidth);
  };
  const drawLogoWithCanvas = (image2) => {
    const canvasImage = document.createElement("canvas");
    canvasImage.width = logoXY + logoWidth;
    canvasImage.height = logoXY + logoWidth;
    canvasImage.getContext("2d").drawImage(image2, logoXY, logoXY, logoWidth, logoWidth);
    canvasRoundRect(ctx)(logoXY, logoXY, logoWidth, logoWidth, logoRadius);
    ctx.fillStyle = ctx.createPattern(canvasImage, "no-repeat");
    ctx.fill();
  };
  return new Promise((resolve, reject) => {
    image.onload = () => {
      logoRadius ? drawLogoWithCanvas(image) : drawLogoWithImage(image);
      resolve(true);
    };
    image.onerror = reject;
  });
};
var canvasRoundRect = (ctx) => (x, y, w, h, r) => {
  const minSize = Math.min(w, h);
  if (r > minSize / 2) {
    r = minSize / 2;
  }
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
  return ctx;
};

// src/draw-canvas.ts
var _toCanvasPromise = promisify(import_qrcode.toCanvas);
var renderQrCode = ({
  canvas,
  content,
  width = 0,
  nodeQrCodeOptions = {}
}) => {
  nodeQrCodeOptions.errorCorrectionLevel = nodeQrCodeOptions.errorCorrectionLevel || getErrorCorrectionLevel(content);
  return getOriginWidth(content, nodeQrCodeOptions).then((_width) => {
    nodeQrCodeOptions.scale = width === 0 ? void 0 : width / _width * 4;
    return _toCanvasPromise(canvas, content, nodeQrCodeOptions);
  });
};
var getOriginWidth = (content, nodeQrCodeOption) => {
  const _canvas = document.createElement("canvas");
  return _toCanvasPromise(_canvas, content, nodeQrCodeOption).then(() => _canvas.width);
};
var getErrorCorrectionLevel = (content) => {
  if (content.length > 36) {
    return "M";
  } else if (content.length > 16) {
    return "Q";
  } else {
    return "H";
  }
};
var toCanvas = async (options) => {
  await renderQrCode(options);
  return drawLogo(options);
};
var toImage = async function(options) {
  const { canvas } = options;
  if (options.logo) {
    if (typeof options.logo === "string") {
      options.logo = { src: options.logo };
    }
    options.logo.crossOrigin = "Anonymous";
  }
  if (!this.ifCanvasDrawed) {
    await toCanvas(options);
  }
  const { image, downloadName = "qr-code" } = options;
  let { download } = options;
  if (canvas.toDataURL()) {
    image.src = canvas.toDataURL();
  } else {
    throw new Error("Can not get the canvas DataURL");
  }
  this.ifImageCreated = true;
  if (download !== true && !(typeof download === "function")) {
    return;
  }
  download = download === true ? (start) => start() : download;
  const startDownload = () => {
    saveImage(image, downloadName);
  };
  download && download(startDownload);
};
var saveImage = (image, name) => {
  const dataURL = image.src;
  const link = document.createElement("a");
  link.download = name;
  link.href = dataURL;
  link.dispatchEvent(new MouseEvent("click"));
};

// package.json
var version = "0.0.2";

// src/index.ts
var YoungQRCodeLogo = class {
  constructor(option) {
    this.ifCanvasDrawed = false;
    this.ifImageCreated = false;
    this.defaultOption = {
      canvas: document.createElement("canvas"),
      image: new Image(),
      content: ""
    };
    this.option = Object.assign(this.defaultOption, option);
    if (!this.option.canvas) {
      this.option.canvas = document.createElement("canvas");
    }
    if (!this.option.image) {
      this.option.image = document.createElement("img");
    }
  }
  toCanvas() {
    return toCanvas.call(this, this.option).then(() => {
      this.ifCanvasDrawed = true;
      return Promise.resolve();
    }).catch(() => {
      this.ifCanvasDrawed = false;
      return Promise.reject();
    });
  }
  toImage() {
    return toImage.call(this, this.option);
  }
  async downloadImage(name) {
    if (!this.ifImageCreated) {
      await this.toImage();
    }
    saveImage(this.option.image, name);
  }
  async getCanvas() {
    if (!this.ifCanvasDrawed) {
      await this.toCanvas();
    }
    return this.option.canvas;
  }
};
YoungQRCodeLogo.version = version;
var src_default = YoungQRCodeLogo;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
