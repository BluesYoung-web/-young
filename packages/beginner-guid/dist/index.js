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

// src/core/create.ts
var createMask = (zIndex) => {
  const mask = document.createElement("div");
  mask.setAttribute("id", "mask");
  mask.setAttribute("style", `
    width: 100vw;
    height: 100vh;
    background-color: gray;
    opacity: 0.6;
    position: fixed;
    top: 0;
    z-index: ${zIndex};
  `);
  return mask;
};
var createDialog = (zIndex) => {
  const dialog = document.createElement("div");
  dialog.setAttribute("id", "dialog");
  dialog.setAttribute("style", `
    width: 400px;
    height: 300px;
    background-color: #fff;
    position: fixed;
    top: 0;
    z-index: ${zIndex};
  `);
  return dialog;
};
var createItem = (zIndex = 3e3) => {
  const mask = createMask(zIndex);
  const dialog = createDialog(zIndex + 1);
  const container = document.createElement("div");
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
  constructor(nums, force) {
    super();
    this.nums = nums;
    this.force = force;
    const mask = createItem();
    const shadowRoot = this.attachShadow({ mode: "closed" });
    shadowRoot.appendChild(mask);
    this.root = shadowRoot;
  }
  render(item) {
    if (item.visible) {
      this.style.display = "block";
    } else {
      this.style.display = "none";
    }
    const {
      x,
      y,
      positionX,
      positionY
    } = getPosition(item.step.el);
    const dialog = this.root.querySelector("#dialog");
    dialog.style[positionX] = x + "px";
    dialog.style[positionY] = y + "px";
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
    this.el = new YoungBeginnerGuid(this.guids.length, this.force);
    this.immdiate && this.show();
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
