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
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};

// src/index.ts
var src_exports = {};
__export(src_exports, {
  YoungBeginnerGuid: () => YoungBeginnerGuid,
  YoungBeginnerGuidController: () => YoungBeginnerGuidController,
  YoungBeginnerGuidControllerNext: () => YoungBeginnerGuidControllerNext,
  YoungBeginnerGuidNext: () => YoungBeginnerGuidNext
});
module.exports = __toCommonJS(src_exports);

// src/styles/index.css?raw
var _default = {};

// src/styles/close-icon.svg?raw
var close_icon_default = "./close-icon-BEPSCKCA.svg?raw";

// src/core/create.ts
var createEL = (attrs = {}, tag = "div") => {
  const el = document.createElement(tag);
  Object.entries(attrs).forEach(([key, value]) => {
    el.setAttribute(key, value);
  });
  return el;
};
var createItem = (handler, zIndex = "3000") => {
  const mask = createEL({ id: "mask" });
  const dialog = document.createElement("div");
  dialog.setAttribute("id", "dialog");
  dialog.innerHTML = `
  ${!handler.force ? `<div id="dialog-close" title="\u5173\u95ED\u65B0\u624B\u5F15\u5BFC">${close_icon_default}</div>` : ""}
  <div class="btns">
    <button id="prev" type="button">\u4E0A\u4E00\u6B65</button>
    <button id="next" type="button">\u4E0B\u4E00\u6B65</button>
  </div>
  `;
  dialog.querySelector("#prev").addEventListener("click", () => handler.prev());
  dialog.querySelector("#next").addEventListener("click", () => {
    if (handler.index === handler.guids.length - 1) {
      handler.hide();
    } else {
      handler.next();
    }
  });
  !handler.force && dialog.querySelector("#dialog-close").addEventListener("click", () => handler.hide());
  const title = createEL({ class: "title" }, "h3");
  title.setAttribute("slot", "title");
  const content = createEL({ class: "content" });
  content.setAttribute("slot", "content");
  dialog.prepend(content);
  dialog.prepend(title);
  const container = createEL();
  const styles = createEL({}, "style");
  styles.innerHTML = `
  #mask {
    z-index: ${zIndex};
  }
  #dialog {
    z-index: ${+zIndex + 1};
  }
  ${_default}
  `;
  container.prepend(styles);
  container.appendChild(mask);
  container.appendChild(dialog);
  return container;
};

// src/core/position.ts
var getPosition = (selector) => {
  const el = document.querySelector(selector);
  const { left, top, right, x: srcX, y: srcY, width, height } = el.getBoundingClientRect();
  const offset = 10;
  const dw = 400;
  const dh = 300;
  let positionX = "left";
  let positionY = "top";
  let x = right + offset;
  let y = top + offset;
  if (window.innerWidth - right < dw + offset) {
    positionX = "right";
    x = window.innerWidth - left + offset;
    if (srcX < dw + offset) {
      positionX = "left";
      x = srcX;
      positionY = "top";
      y = srcY + height + offset;
    }
  }
  if (window.innerHeight - y < dh) {
    positionX = "left";
    positionY = "top";
    x = window.innerWidth - dw >> 1;
    y = window.innerHeight - dh >> 1;
  }
  return {
    x,
    y,
    srcX,
    srcY,
    width,
    height,
    positionX,
    positionY
  };
};
var generateClipPathStr = (x, y, w, h) => {
  const fullWith = window.innerWidth;
  const fullHeight = window.innerHeight;
  const wx = x + w;
  const hy = y + h;
  const line1 = `M 0 0 H 0 V ${fullHeight} H ${x} V ${fullHeight} H${x} V 0 Z`;
  const line2 = `M ${x} 0 H ${x} V ${y} H ${fullWith} V ${y} H ${fullWith} V ${hy} H ${fullWith} V 0 Z`;
  const line3 = `M ${x} ${hy} H ${x} V ${fullHeight} H ${fullWith} V ${fullHeight} H ${fullWith} V ${hy} Z`;
  const line4 = `M ${wx} ${y} H ${wx} V ${hy} H ${fullWith} V ${hy} H ${fullWith} V ${y} Z`;
  return `${line1} ${line2} ${line3} ${line4}`;
};

// src/type.ts
document.querySelector;
var defautOptions = {
  immdiate: false,
  force: false
};

// src/next/index.ts
var import_lit = require("lit");
var import_decorators = require("lit/decorators.js");
var YoungBeginnerGuidNext = class extends import_lit.LitElement {
  constructor(handler, zIndex = "3000") {
    super();
    this.visible = false;
    this.handler = handler;
    this.zIndex = zIndex;
    this.curr = {
      index: 0,
      step: this.handler.guids[0]
    };
  }
  closeHandler() {
    this.handler.hide();
  }
  prevHandler() {
    this.handler.prev();
  }
  nextHandler() {
    if (this.handler.index === this.handler.guids.length - 1) {
      this.handler.hide();
    } else {
      this.handler.next();
    }
  }
  render() {
    var _a, _b, _c, _d;
    if ((_b = (_a = globalThis == null ? void 0 : globalThis.process) == null ? void 0 : _a.env) == null ? void 0 : _b.TEST) {
      return;
    }
    const {
      x,
      y,
      positionX,
      positionY,
      srcX,
      srcY,
      width,
      height
    } = getPosition(this.curr.step.el);
    const pathStr = generateClipPathStr(srcX, srcY, width, height);
    return import_lit.html`
    <style>
    :host {
      display: ${this.visible ? "block" : "none"};
    }
    #mask {
      z-index: ${this.zIndex};
      clip-path: path('${pathStr}');
    }
    #dialog {
      z-index: ${+this.zIndex + 1};
      ${positionX}: ${x}px !important;
      ${positionY}: ${y}px !important;
    }
    #prev {
      ${this.curr.index === 0 ? `
          opacity: 0.5;
          cursor: not-allowed !important;
        ` : ""}
    }
    </style>
    <div id="mask"></div>
    <div id="dialog">
      ${!this.handler.force ? import_lit.html`<div id="dialog-close" title="关闭新手引导" @click="${this.closeHandler}">
                  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--ion" width="24" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 512 512"><path d="M331.3 308.7L278.6 256l52.7-52.7c6.2-6.2 6.2-16.4 0-22.6-6.2-6.2-16.4-6.2-22.6 0L256 233.4l-52.7-52.7c-6.2-6.2-15.6-7.1-22.6 0-7.1 7.1-6 16.6 0 22.6l52.7 52.7-52.7 52.7c-6.7 6.7-6.4 16.3 0 22.6 6.4 6.4 16.4 6.2 22.6 0l52.7-52.7 52.7 52.7c6.2 6.2 16.4 6.2 22.6 0 6.3-6.2 6.3-16.4 0-22.6z" fill="#434343"></path><path d="M256 76c48.1 0 93.3 18.7 127.3 52.7S436 207.9 436 256s-18.7 93.3-52.7 127.3S304.1 436 256 436c-48.1 0-93.3-18.7-127.3-52.7S76 304.1 76 256s18.7-93.3 52.7-127.3S207.9 76 256 76m0-28C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48z" fill="currentColor"></path></svg>
                </div>` : ""}
      <h3 class="title" style="${(_c = this.curr.step.style_title) != null ? _c : ""}">${this.curr.step.title}</h3>
      <div class="content" style="${(_d = this.curr.step.style_content) != null ? _d : ""}">${this.curr.step.content}</div>
      <div class="btns">
        <button
          id="prev"
          type="button"
          @click="${this.prevHandler}"
        >上一步</button>
        <button
          id="next"
          type="button"
          @click="${this.nextHandler}"
        >${this.curr.index === this.handler.guids.length - 1 ? "\u5173\u95ED" : "\u4E0B\u4E00\u6B65"}</button>
      </div>
    </div>
    `;
  }
};
YoungBeginnerGuidNext.styles = import_lit.css`
    ${(0, import_lit.unsafeCSS)(_default)}
  `;
__decorateClass([
  (0, import_decorators.property)()
], YoungBeginnerGuidNext.prototype, "curr", 2);
__decorateClass([
  (0, import_decorators.property)()
], YoungBeginnerGuidNext.prototype, "visible", 2);
__decorateClass([
  (0, import_decorators.property)()
], YoungBeginnerGuidNext.prototype, "handler", 2);
__decorateClass([
  (0, import_decorators.property)()
], YoungBeginnerGuidNext.prototype, "zIndex", 2);
YoungBeginnerGuidNext = __decorateClass([
  (0, import_decorators.customElement)("young-beginner-guid-next")
], YoungBeginnerGuidNext);
var YoungBeginnerGuidControllerNext = class {
  constructor(guids, options = {}) {
    this.index = 0;
    this.immdiate = false;
    this.force = false;
    if (!guids.length) {
      throw new Error("guids array can't be null");
    }
    this.guids = guids;
    options = Object.assign(defautOptions, options);
    this.immdiate = options.immdiate;
    this.force = options.force;
    this.el = new YoungBeginnerGuidNext(this);
    window.addEventListener("load", () => {
      this.immdiate && this.show();
    });
  }
  show(index = 0, visible = true) {
    var _a, _b;
    if (!this.el.isConnected) {
      document.body.appendChild(this.el);
    }
    this.index = index;
    if ((_b = (_a = globalThis == null ? void 0 : globalThis.process) == null ? void 0 : _a.env) == null ? void 0 : _b.TEST) {
      return;
    }
    this.el.curr = {
      index,
      step: this.guids[index]
    };
    this.el.visible = visible;
  }
  next() {
    if (this.index < this.guids.length - 1) {
      this.index++;
      this.show(this.index);
    }
  }
  prev() {
    if (this.index > 0) {
      this.index--;
      this.show(this.index);
    }
  }
  hide() {
    this.show(this.index, false);
  }
  destory() {
    this.index = 0;
    document.body.removeChild(this.el);
  }
};

// src/index.ts
var YoungBeginnerGuid = class extends HTMLElement {
  constructor(handler) {
    super();
    this.handler = handler;
    this.zIndex = "3000";
    const mask = createItem(handler);
    const shadowRoot = this.attachShadow({ mode: "closed" });
    shadowRoot.appendChild(mask);
    this.root = shadowRoot;
  }
  changeVisiable(item) {
    if (item.visible) {
      this.style.display = "block";
    } else {
      this.style.display = "none";
    }
  }
  changeDialog(item, dialog, mask) {
    const {
      x,
      y,
      positionX,
      positionY,
      srcX,
      srcY,
      width,
      height
    } = getPosition(item.step.el);
    dialog.style.top = null;
    dialog.style.bottom = null;
    dialog.style.left = null;
    dialog.style.right = null;
    dialog.style[positionX] = x + "px";
    dialog.style[positionY] = y + "px";
    const pathStr = generateClipPathStr(srcX, srcY, width, height);
    mask.style.clipPath = `path('${pathStr}')`;
  }
  changeContent(item, dialog) {
    const title = dialog.querySelector(".title");
    const content = dialog.querySelector(".content");
    title.innerHTML = item.step.title;
    content.innerHTML = item.step.content;
  }
  changeButton(item, dialog) {
    const prev = dialog.querySelector("#prev");
    const next = dialog.querySelector("#next");
    if (item.index === 0) {
      prev.setAttribute("disabled", "disabled");
    } else {
      prev.removeAttribute("disabled");
    }
    if (item.index === this.handler.guids.length - 1) {
      next.innerHTML = "\u5173\u95ED";
    } else {
      next.innerHTML = "\u4E0B\u4E00\u6B65";
    }
  }
  saveSnapAndChange(item) {
    const el = document.querySelector(item.step.el);
    if (el) {
      this.snap = {
        el: item.step.el,
        style: {
          border: el.style.border,
          zIndex: el.style.zIndex
        }
      };
      el.style.zIndex = `${+this.zIndex + 2}`;
      el.style.border = "2px solid red";
    }
  }
  restoreSnap() {
    var _a;
    const el = document.querySelector((_a = this.snap) == null ? void 0 : _a.el);
    if (el) {
      el.style.border = this.snap.style.border;
      el.style.zIndex = this.snap.style.zIndex;
    }
  }
  render(item) {
    this.saveSnapAndChange(item);
    this.changeVisiable(item);
    const dialog = this.root.querySelector("#dialog");
    const mask = this.root.querySelector("#mask");
    if (dialog && mask) {
      this.changeDialog(item, dialog, mask);
      this.changeContent(item, dialog);
      this.changeButton(item, dialog);
    }
  }
};
window.customElements.get("young-beginner-guid") || window.customElements.define("young-beginner-guid", YoungBeginnerGuid);
var YoungBeginnerGuidController = class {
  constructor(guids, options = {}) {
    this.index = 0;
    this.immdiate = false;
    this.force = false;
    if (!guids.length) {
      throw new Error("guids array can't be null");
    }
    this.guids = guids;
    options = Object.assign(defautOptions, options);
    this.immdiate = options.immdiate;
    this.force = options.force;
    this.el = new YoungBeginnerGuid(this);
    window.addEventListener("load", () => {
      this.immdiate && this.show();
    });
  }
  show(index = 0, visible = true) {
    var _a, _b;
    if (!this.el.isConnected) {
      document.body.appendChild(this.el);
    }
    this.index = index;
    if ((_b = (_a = globalThis == null ? void 0 : globalThis.process) == null ? void 0 : _a.env) == null ? void 0 : _b.TEST) {
      return;
    }
    this.el.restoreSnap();
    this.el.render({
      visible,
      index,
      step: this.guids[index]
    });
  }
  next() {
    if (this.index < this.guids.length - 1) {
      this.index++;
      this.show(this.index);
    }
  }
  prev() {
    if (this.index > 0) {
      this.index--;
      this.show(this.index);
    }
  }
  hide() {
    this.show(this.index, false);
    this.el.restoreSnap();
  }
  destory() {
    this.index = 0;
    document.body.removeChild(this.el);
    this.el.restoreSnap();
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  YoungBeginnerGuid,
  YoungBeginnerGuidController,
  YoungBeginnerGuidControllerNext,
  YoungBeginnerGuidNext
});
