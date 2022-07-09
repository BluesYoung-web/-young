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
  YoungPreviewGallary: () => YoungPreviewGallary,
  YoungPreviewGallaryItem: () => YoungPreviewGallaryItem
});
module.exports = __toCommonJS(src_exports);
var import_lit = require("lit");
var import_decorators = require("lit/decorators.js");
var import_when = require("lit/directives/when.js");

// src/img/after.png
var after_default = "./after-7PHNKQEK.png";

// src/img/after-disabled.png
var after_disabled_default = "./after-disabled-JB4BJF6N.png";

// src/index.ts
var YoungPreviewGallary = class extends import_lit.LitElement {
  constructor() {
    super(...arguments);
    this.direction = "x";
    this["show-icon"] = true;
    this["after-icon"] = after_default;
    this["after-icon-disabled"] = after_disabled_default;
    this.gap = 20;
    this["item-width"] = this["item-width"];
    this["display-num"] = 3;
    this.width = 0;
    this.num = 0;
    this.index = this["display-num"];
    this.disablePrev = true;
    this.disableNext = true;
  }
  firstUpdated() {
    if (this.num > this["display-num"]) {
      this.disableNext = false;
    }
    const iw = this["item-width"];
    const d = this["display-num"];
    this.width = iw * d + this.gap * (d - 1);
  }
  prev() {
    if (this.direction === "x") {
      this.baseEl.scrollBy({
        left: -this["item-width"],
        behavior: "smooth"
      });
    } else {
      this.baseEl.scrollBy({
        top: -this["item-width"],
        behavior: "smooth"
      });
    }
    this.index--;
    if (this.index === this["display-num"]) {
      this.disablePrev = true;
    }
    if (this.index < this.num) {
      this.disableNext = false;
    }
  }
  next() {
    if (this.direction === "x") {
      this.baseEl.scrollBy({
        left: this["item-width"],
        behavior: "smooth"
      });
    } else {
      this.baseEl.scrollBy({
        top: this["item-width"],
        behavior: "smooth"
      });
    }
    this.index++;
    if (this.index > this["display-num"]) {
      this.disablePrev = false;
    }
    if (this.index === this.num) {
      this.disableNext = true;
    }
  }
  render() {
    return import_lit.html`
      <style>
      * {
        margin: 0;
        padding: 0;
      }
      .container {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      #before {
        transform: rotate(180deg);
      }
      .icon {
        width: 60px;
        height: 60px;
        cursor: pointer;
        margin: 78px;
      }
      .disabled {
        cursor: not-allowed;
      }
      #base {
        width: ${this.width}px;
        overflow-${this.direction}: auto;
        scroll-snap-type: ${this.direction} mandatory;
        display: grid;
        place-items: center;
        grid-auto-flow: column;
        grid-gap: ${this.gap}px;
        padding: 46px 0;
      }
      #base::-webkit-scrollbar {
        display: none;
      }
      </style>
      ${(0, import_when.when)(this["show-icon"], () => import_lit.html`
          <div class="container">
            <div id="before">
              ${(0, import_when.when)(this.disablePrev, () => import_lit.html`
                  <img title="上一张" class="icon disabled" src=${this["after-icon-disabled"]} />
                  `, () => import_lit.html`
                  <img title="上一张" class="icon" src=${this["after-icon"]} @click=${this.prev} />
                  `)}
            </div>
            <div id="base">
              <slot></slot>
            </div>
            <div id="after">
              ${(0, import_when.when)(this.disableNext, () => import_lit.html`
                  <img title="下一张" class="icon disabled" src=${this["after-icon-disabled"]} />
                  `, () => import_lit.html`
                  <img title="下一张" class="icon" src=${this["after-icon"]} @click=${this.next} />
                  `)}
            </div>
          </div>
          `, () => import_lit.html`
          <div id="base">
            <slot></slot>
          </div>
          `)}
    `;
  }
};
__decorateClass([
  (0, import_decorators.property)()
], YoungPreviewGallary.prototype, "direction", 2);
__decorateClass([
  (0, import_decorators.property)({ type: Boolean })
], YoungPreviewGallary.prototype, "show-icon", 2);
__decorateClass([
  (0, import_decorators.property)()
], YoungPreviewGallary.prototype, "after-icon", 2);
__decorateClass([
  (0, import_decorators.property)()
], YoungPreviewGallary.prototype, "after-icon-disabled", 2);
__decorateClass([
  (0, import_decorators.query)("#base")
], YoungPreviewGallary.prototype, "baseEl", 2);
__decorateClass([
  (0, import_decorators.property)({ type: Number })
], YoungPreviewGallary.prototype, "gap", 2);
__decorateClass([
  (0, import_decorators.property)({ type: Number })
], YoungPreviewGallary.prototype, "item-width", 2);
__decorateClass([
  (0, import_decorators.property)({ type: Number })
], YoungPreviewGallary.prototype, "display-num", 2);
__decorateClass([
  (0, import_decorators.property)({ type: Number })
], YoungPreviewGallary.prototype, "width", 2);
__decorateClass([
  (0, import_decorators.property)({ type: Number })
], YoungPreviewGallary.prototype, "num", 2);
__decorateClass([
  (0, import_decorators.property)()
], YoungPreviewGallary.prototype, "index", 2);
__decorateClass([
  (0, import_decorators.property)()
], YoungPreviewGallary.prototype, "disablePrev", 2);
__decorateClass([
  (0, import_decorators.property)()
], YoungPreviewGallary.prototype, "disableNext", 2);
YoungPreviewGallary = __decorateClass([
  (0, import_decorators.customElement)("young-preview-gallary")
], YoungPreviewGallary);
var YoungPreviewGallaryItem = class extends import_lit.LitElement {
  render() {
    return import_lit.html`
      <style>
      * {
        margin: 0;
        padding: 0;
      }
      :host {
        scroll-snap-align: center;
      }
      </style>
      <div>
        <slot></slot>
      </div>
    `;
  }
};
YoungPreviewGallaryItem = __decorateClass([
  (0, import_decorators.customElement)("young-preview-gallary-item")
], YoungPreviewGallaryItem);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  YoungPreviewGallary,
  YoungPreviewGallaryItem
});
