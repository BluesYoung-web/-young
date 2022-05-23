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
  YoungBeginnerGuidController: () => YoungBeginnerGuidController,
  default: () => YoungBeginnerGuid
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
var createItem = (handler, zIndex = 3e3) => {
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
  title.innerText = `lallallalallalla`;
  const content = createEL({ class: "content" });
  content.setAttribute("slot", "content");
  content.innerText = `hhhhhhhhhhhhhhhhhhhhh`;
  dialog.prepend(content);
  dialog.prepend(title);
  const container = createEL();
  const styles = createEL({}, "style");
  styles.innerHTML = `
  #mask {
    z-index: ${zIndex};
  }
  #dialog {
    z-index: ${zIndex + 1};
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
  const { left, top, right, bottom } = el.getBoundingClientRect();
  let positionX = "left";
  let positionY = "top";
  let x = right + 50;
  let y = top;
  if (window.innerWidth - right < 400) {
    positionX = "right";
    x = left - 50;
  }
  if (window.innerHeight - top < 300) {
    positionY = "bottom";
    y = bottom;
  }
  return {
    x,
    y,
    positionX,
    positionY
  };
};

// src/type.ts
document.querySelector;
var defautOptions = {
  immdiate: false,
  force: false
};

// src/index.ts
var YoungBeginnerGuid = class extends HTMLElement {
  constructor(handler) {
    super();
    this.handler = handler;
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
  changeDialog(item, dialog) {
    const {
      x,
      y,
      positionX,
      positionY
    } = getPosition(item.step.el);
    dialog.style[positionX] = x + "px";
    dialog.style[positionY] = y + "px";
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
  render(item) {
    var _a, _b;
    if ((_b = (_a = globalThis == null ? void 0 : globalThis.process) == null ? void 0 : _a.env) == null ? void 0 : _b.TEST) {
      return;
    }
    this.changeVisiable(item);
    const dialog = this.root.querySelector("#dialog");
    this.changeDialog(item, dialog);
    this.changeButton(item, dialog);
  }
};
window.customElements.get("young-beginner-guid") || window.customElements.define("young-beginner-guid", YoungBeginnerGuid);
var YoungBeginnerGuidController = class {
  constructor(guids, options = {}) {
    this.index = 0;
    this.immdiate = false;
    this.force = false;
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
    if (!this.el.isConnected) {
      document.body.appendChild(this.el);
    }
    this.index = index;
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
  }
  destory() {
    this.index = 0;
    document.body.removeChild(this.el);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  YoungBeginnerGuidController
});
