var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a2, b2) => {
  for (var prop in b2 || (b2 = {}))
    if (__hasOwnProp.call(b2, prop))
      __defNormalProp(a2, prop, b2[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b2)) {
      if (__propIsEnum.call(b2, prop))
        __defNormalProp(a2, prop, b2[prop]);
    }
  return a2;
};
var __spreadProps = (a2, b2) => __defProps(a2, __getOwnPropDescs(b2));
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$1 = window.ShadowRoot && (window.ShadyCSS === void 0 || window.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, e$3 = Symbol(), n$6 = /* @__PURE__ */ new Map();
class s$3 {
  constructor(t2, n2) {
    if (this._$cssResult$ = true, n2 !== e$3)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t2;
  }
  get styleSheet() {
    let e2 = n$6.get(this.cssText);
    return t$1 && e2 === void 0 && (n$6.set(this.cssText, e2 = new CSSStyleSheet()), e2.replaceSync(this.cssText)), e2;
  }
  toString() {
    return this.cssText;
  }
}
const o$4 = (t2) => new s$3(typeof t2 == "string" ? t2 : t2 + "", e$3), i$3 = (e2, n2) => {
  t$1 ? e2.adoptedStyleSheets = n2.map((t2) => t2 instanceof CSSStyleSheet ? t2 : t2.styleSheet) : n2.forEach((t2) => {
    const n3 = document.createElement("style"), s2 = window.litNonce;
    s2 !== void 0 && n3.setAttribute("nonce", s2), n3.textContent = t2.cssText, e2.appendChild(n3);
  });
}, S$1 = t$1 ? (t2) => t2 : (t2) => t2 instanceof CSSStyleSheet ? ((t3) => {
  let e2 = "";
  for (const n2 of t3.cssRules)
    e2 += n2.cssText;
  return o$4(e2);
})(t2) : t2;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var s$2;
const e$2 = window.trustedTypes, r$1 = e$2 ? e$2.emptyScript : "", h$1 = window.reactiveElementPolyfillSupport, o$3 = { toAttribute(t2, i2) {
  switch (i2) {
    case Boolean:
      t2 = t2 ? r$1 : null;
      break;
    case Object:
    case Array:
      t2 = t2 == null ? t2 : JSON.stringify(t2);
  }
  return t2;
}, fromAttribute(t2, i2) {
  let s2 = t2;
  switch (i2) {
    case Boolean:
      s2 = t2 !== null;
      break;
    case Number:
      s2 = t2 === null ? null : Number(t2);
      break;
    case Object:
    case Array:
      try {
        s2 = JSON.parse(t2);
      } catch (t3) {
        s2 = null;
      }
  }
  return s2;
} }, n$5 = (t2, i2) => i2 !== t2 && (i2 == i2 || t2 == t2), l$2 = { attribute: true, type: String, converter: o$3, reflect: false, hasChanged: n$5 };
class a$1 extends HTMLElement {
  constructor() {
    super(), this._$Et = /* @__PURE__ */ new Map(), this.isUpdatePending = false, this.hasUpdated = false, this._$Ei = null, this.o();
  }
  static addInitializer(t2) {
    var i2;
    (i2 = this.l) !== null && i2 !== void 0 || (this.l = []), this.l.push(t2);
  }
  static get observedAttributes() {
    this.finalize();
    const t2 = [];
    return this.elementProperties.forEach((i2, s2) => {
      const e2 = this._$Eh(s2, i2);
      e2 !== void 0 && (this._$Eu.set(e2, s2), t2.push(e2));
    }), t2;
  }
  static createProperty(t2, i2 = l$2) {
    if (i2.state && (i2.attribute = false), this.finalize(), this.elementProperties.set(t2, i2), !i2.noAccessor && !this.prototype.hasOwnProperty(t2)) {
      const s2 = typeof t2 == "symbol" ? Symbol() : "__" + t2, e2 = this.getPropertyDescriptor(t2, s2, i2);
      e2 !== void 0 && Object.defineProperty(this.prototype, t2, e2);
    }
  }
  static getPropertyDescriptor(t2, i2, s2) {
    return { get() {
      return this[i2];
    }, set(e2) {
      const r2 = this[t2];
      this[i2] = e2, this.requestUpdate(t2, r2, s2);
    }, configurable: true, enumerable: true };
  }
  static getPropertyOptions(t2) {
    return this.elementProperties.get(t2) || l$2;
  }
  static finalize() {
    if (this.hasOwnProperty("finalized"))
      return false;
    this.finalized = true;
    const t2 = Object.getPrototypeOf(this);
    if (t2.finalize(), this.elementProperties = new Map(t2.elementProperties), this._$Eu = /* @__PURE__ */ new Map(), this.hasOwnProperty("properties")) {
      const t3 = this.properties, i2 = [...Object.getOwnPropertyNames(t3), ...Object.getOwnPropertySymbols(t3)];
      for (const s2 of i2)
        this.createProperty(s2, t3[s2]);
    }
    return this.elementStyles = this.finalizeStyles(this.styles), true;
  }
  static finalizeStyles(i2) {
    const s2 = [];
    if (Array.isArray(i2)) {
      const e2 = new Set(i2.flat(1 / 0).reverse());
      for (const i3 of e2)
        s2.unshift(S$1(i3));
    } else
      i2 !== void 0 && s2.push(S$1(i2));
    return s2;
  }
  static _$Eh(t2, i2) {
    const s2 = i2.attribute;
    return s2 === false ? void 0 : typeof s2 == "string" ? s2 : typeof t2 == "string" ? t2.toLowerCase() : void 0;
  }
  o() {
    var t2;
    this._$Ep = new Promise((t3) => this.enableUpdating = t3), this._$AL = /* @__PURE__ */ new Map(), this._$Em(), this.requestUpdate(), (t2 = this.constructor.l) === null || t2 === void 0 || t2.forEach((t3) => t3(this));
  }
  addController(t2) {
    var i2, s2;
    ((i2 = this._$Eg) !== null && i2 !== void 0 ? i2 : this._$Eg = []).push(t2), this.renderRoot !== void 0 && this.isConnected && ((s2 = t2.hostConnected) === null || s2 === void 0 || s2.call(t2));
  }
  removeController(t2) {
    var i2;
    (i2 = this._$Eg) === null || i2 === void 0 || i2.splice(this._$Eg.indexOf(t2) >>> 0, 1);
  }
  _$Em() {
    this.constructor.elementProperties.forEach((t2, i2) => {
      this.hasOwnProperty(i2) && (this._$Et.set(i2, this[i2]), delete this[i2]);
    });
  }
  createRenderRoot() {
    var t2;
    const s2 = (t2 = this.shadowRoot) !== null && t2 !== void 0 ? t2 : this.attachShadow(this.constructor.shadowRootOptions);
    return i$3(s2, this.constructor.elementStyles), s2;
  }
  connectedCallback() {
    var t2;
    this.renderRoot === void 0 && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(true), (t2 = this._$Eg) === null || t2 === void 0 || t2.forEach((t3) => {
      var i2;
      return (i2 = t3.hostConnected) === null || i2 === void 0 ? void 0 : i2.call(t3);
    });
  }
  enableUpdating(t2) {
  }
  disconnectedCallback() {
    var t2;
    (t2 = this._$Eg) === null || t2 === void 0 || t2.forEach((t3) => {
      var i2;
      return (i2 = t3.hostDisconnected) === null || i2 === void 0 ? void 0 : i2.call(t3);
    });
  }
  attributeChangedCallback(t2, i2, s2) {
    this._$AK(t2, s2);
  }
  _$ES(t2, i2, s2 = l$2) {
    var e2, r2;
    const h2 = this.constructor._$Eh(t2, s2);
    if (h2 !== void 0 && s2.reflect === true) {
      const n2 = ((r2 = (e2 = s2.converter) === null || e2 === void 0 ? void 0 : e2.toAttribute) !== null && r2 !== void 0 ? r2 : o$3.toAttribute)(i2, s2.type);
      this._$Ei = t2, n2 == null ? this.removeAttribute(h2) : this.setAttribute(h2, n2), this._$Ei = null;
    }
  }
  _$AK(t2, i2) {
    var s2, e2, r2;
    const h2 = this.constructor, n2 = h2._$Eu.get(t2);
    if (n2 !== void 0 && this._$Ei !== n2) {
      const t3 = h2.getPropertyOptions(n2), l2 = t3.converter, a2 = (r2 = (e2 = (s2 = l2) === null || s2 === void 0 ? void 0 : s2.fromAttribute) !== null && e2 !== void 0 ? e2 : typeof l2 == "function" ? l2 : null) !== null && r2 !== void 0 ? r2 : o$3.fromAttribute;
      this._$Ei = n2, this[n2] = a2(i2, t3.type), this._$Ei = null;
    }
  }
  requestUpdate(t2, i2, s2) {
    let e2 = true;
    t2 !== void 0 && (((s2 = s2 || this.constructor.getPropertyOptions(t2)).hasChanged || n$5)(this[t2], i2) ? (this._$AL.has(t2) || this._$AL.set(t2, i2), s2.reflect === true && this._$Ei !== t2 && (this._$EC === void 0 && (this._$EC = /* @__PURE__ */ new Map()), this._$EC.set(t2, s2))) : e2 = false), !this.isUpdatePending && e2 && (this._$Ep = this._$E_());
  }
  async _$E_() {
    this.isUpdatePending = true;
    try {
      await this._$Ep;
    } catch (t3) {
      Promise.reject(t3);
    }
    const t2 = this.scheduleUpdate();
    return t2 != null && await t2, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var t2;
    if (!this.isUpdatePending)
      return;
    this.hasUpdated, this._$Et && (this._$Et.forEach((t3, i3) => this[i3] = t3), this._$Et = void 0);
    let i2 = false;
    const s2 = this._$AL;
    try {
      i2 = this.shouldUpdate(s2), i2 ? (this.willUpdate(s2), (t2 = this._$Eg) === null || t2 === void 0 || t2.forEach((t3) => {
        var i3;
        return (i3 = t3.hostUpdate) === null || i3 === void 0 ? void 0 : i3.call(t3);
      }), this.update(s2)) : this._$EU();
    } catch (t3) {
      throw i2 = false, this._$EU(), t3;
    }
    i2 && this._$AE(s2);
  }
  willUpdate(t2) {
  }
  _$AE(t2) {
    var i2;
    (i2 = this._$Eg) === null || i2 === void 0 || i2.forEach((t3) => {
      var i3;
      return (i3 = t3.hostUpdated) === null || i3 === void 0 ? void 0 : i3.call(t3);
    }), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t2)), this.updated(t2);
  }
  _$EU() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$Ep;
  }
  shouldUpdate(t2) {
    return true;
  }
  update(t2) {
    this._$EC !== void 0 && (this._$EC.forEach((t3, i2) => this._$ES(i2, this[i2], t3)), this._$EC = void 0), this._$EU();
  }
  updated(t2) {
  }
  firstUpdated(t2) {
  }
}
a$1.finalized = true, a$1.elementProperties = /* @__PURE__ */ new Map(), a$1.elementStyles = [], a$1.shadowRootOptions = { mode: "open" }, h$1 == null || h$1({ ReactiveElement: a$1 }), ((s$2 = globalThis.reactiveElementVersions) !== null && s$2 !== void 0 ? s$2 : globalThis.reactiveElementVersions = []).push("1.3.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var t;
const i$2 = globalThis.trustedTypes, s$1 = i$2 ? i$2.createPolicy("lit-html", { createHTML: (t2) => t2 }) : void 0, e$1 = `lit$${(Math.random() + "").slice(9)}$`, o$2 = "?" + e$1, n$4 = `<${o$2}>`, l$1 = document, h = (t2 = "") => l$1.createComment(t2), r = (t2) => t2 === null || typeof t2 != "object" && typeof t2 != "function", d = Array.isArray, u = (t2) => {
  var i2;
  return d(t2) || typeof ((i2 = t2) === null || i2 === void 0 ? void 0 : i2[Symbol.iterator]) == "function";
}, c = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, v = /-->/g, a = />/g, f = />|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g, _ = /'/g, m = /"/g, g = /^(?:script|style|textarea|title)$/i, p = (t2) => (i2, ...s2) => ({ _$litType$: t2, strings: i2, values: s2 }), $ = p(1), b = Symbol.for("lit-noChange"), w = Symbol.for("lit-nothing"), T = /* @__PURE__ */ new WeakMap(), x = (t2, i2, s2) => {
  var e2, o2;
  const n2 = (e2 = s2 == null ? void 0 : s2.renderBefore) !== null && e2 !== void 0 ? e2 : i2;
  let l2 = n2._$litPart$;
  if (l2 === void 0) {
    const t3 = (o2 = s2 == null ? void 0 : s2.renderBefore) !== null && o2 !== void 0 ? o2 : null;
    n2._$litPart$ = l2 = new N(i2.insertBefore(h(), t3), t3, void 0, s2 != null ? s2 : {});
  }
  return l2._$AI(t2), l2;
}, A = l$1.createTreeWalker(l$1, 129, null, false), C = (t2, i2) => {
  const o2 = t2.length - 1, l2 = [];
  let h2, r2 = i2 === 2 ? "<svg>" : "", d2 = c;
  for (let i3 = 0; i3 < o2; i3++) {
    const s2 = t2[i3];
    let o3, u3, p2 = -1, $2 = 0;
    for (; $2 < s2.length && (d2.lastIndex = $2, u3 = d2.exec(s2), u3 !== null); )
      $2 = d2.lastIndex, d2 === c ? u3[1] === "!--" ? d2 = v : u3[1] !== void 0 ? d2 = a : u3[2] !== void 0 ? (g.test(u3[2]) && (h2 = RegExp("</" + u3[2], "g")), d2 = f) : u3[3] !== void 0 && (d2 = f) : d2 === f ? u3[0] === ">" ? (d2 = h2 != null ? h2 : c, p2 = -1) : u3[1] === void 0 ? p2 = -2 : (p2 = d2.lastIndex - u3[2].length, o3 = u3[1], d2 = u3[3] === void 0 ? f : u3[3] === '"' ? m : _) : d2 === m || d2 === _ ? d2 = f : d2 === v || d2 === a ? d2 = c : (d2 = f, h2 = void 0);
    const y = d2 === f && t2[i3 + 1].startsWith("/>") ? " " : "";
    r2 += d2 === c ? s2 + n$4 : p2 >= 0 ? (l2.push(o3), s2.slice(0, p2) + "$lit$" + s2.slice(p2) + e$1 + y) : s2 + e$1 + (p2 === -2 ? (l2.push(void 0), i3) : y);
  }
  const u2 = r2 + (t2[o2] || "<?>") + (i2 === 2 ? "</svg>" : "");
  if (!Array.isArray(t2) || !t2.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return [s$1 !== void 0 ? s$1.createHTML(u2) : u2, l2];
};
class E {
  constructor({ strings: t2, _$litType$: s2 }, n2) {
    let l2;
    this.parts = [];
    let r2 = 0, d2 = 0;
    const u2 = t2.length - 1, c2 = this.parts, [v2, a2] = C(t2, s2);
    if (this.el = E.createElement(v2, n2), A.currentNode = this.el.content, s2 === 2) {
      const t3 = this.el.content, i2 = t3.firstChild;
      i2.remove(), t3.append(...i2.childNodes);
    }
    for (; (l2 = A.nextNode()) !== null && c2.length < u2; ) {
      if (l2.nodeType === 1) {
        if (l2.hasAttributes()) {
          const t3 = [];
          for (const i2 of l2.getAttributeNames())
            if (i2.endsWith("$lit$") || i2.startsWith(e$1)) {
              const s3 = a2[d2++];
              if (t3.push(i2), s3 !== void 0) {
                const t4 = l2.getAttribute(s3.toLowerCase() + "$lit$").split(e$1), i3 = /([.?@])?(.*)/.exec(s3);
                c2.push({ type: 1, index: r2, name: i3[2], strings: t4, ctor: i3[1] === "." ? M : i3[1] === "?" ? H : i3[1] === "@" ? I : S });
              } else
                c2.push({ type: 6, index: r2 });
            }
          for (const i2 of t3)
            l2.removeAttribute(i2);
        }
        if (g.test(l2.tagName)) {
          const t3 = l2.textContent.split(e$1), s3 = t3.length - 1;
          if (s3 > 0) {
            l2.textContent = i$2 ? i$2.emptyScript : "";
            for (let i2 = 0; i2 < s3; i2++)
              l2.append(t3[i2], h()), A.nextNode(), c2.push({ type: 2, index: ++r2 });
            l2.append(t3[s3], h());
          }
        }
      } else if (l2.nodeType === 8)
        if (l2.data === o$2)
          c2.push({ type: 2, index: r2 });
        else {
          let t3 = -1;
          for (; (t3 = l2.data.indexOf(e$1, t3 + 1)) !== -1; )
            c2.push({ type: 7, index: r2 }), t3 += e$1.length - 1;
        }
      r2++;
    }
  }
  static createElement(t2, i2) {
    const s2 = l$1.createElement("template");
    return s2.innerHTML = t2, s2;
  }
}
function P(t2, i2, s2 = t2, e2) {
  var o2, n2, l2, h2;
  if (i2 === b)
    return i2;
  let d2 = e2 !== void 0 ? (o2 = s2._$Cl) === null || o2 === void 0 ? void 0 : o2[e2] : s2._$Cu;
  const u2 = r(i2) ? void 0 : i2._$litDirective$;
  return (d2 == null ? void 0 : d2.constructor) !== u2 && ((n2 = d2 == null ? void 0 : d2._$AO) === null || n2 === void 0 || n2.call(d2, false), u2 === void 0 ? d2 = void 0 : (d2 = new u2(t2), d2._$AT(t2, s2, e2)), e2 !== void 0 ? ((l2 = (h2 = s2)._$Cl) !== null && l2 !== void 0 ? l2 : h2._$Cl = [])[e2] = d2 : s2._$Cu = d2), d2 !== void 0 && (i2 = P(t2, d2._$AS(t2, i2.values), d2, e2)), i2;
}
class V {
  constructor(t2, i2) {
    this.v = [], this._$AN = void 0, this._$AD = t2, this._$AM = i2;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  p(t2) {
    var i2;
    const { el: { content: s2 }, parts: e2 } = this._$AD, o2 = ((i2 = t2 == null ? void 0 : t2.creationScope) !== null && i2 !== void 0 ? i2 : l$1).importNode(s2, true);
    A.currentNode = o2;
    let n2 = A.nextNode(), h2 = 0, r2 = 0, d2 = e2[0];
    for (; d2 !== void 0; ) {
      if (h2 === d2.index) {
        let i3;
        d2.type === 2 ? i3 = new N(n2, n2.nextSibling, this, t2) : d2.type === 1 ? i3 = new d2.ctor(n2, d2.name, d2.strings, this, t2) : d2.type === 6 && (i3 = new L(n2, this, t2)), this.v.push(i3), d2 = e2[++r2];
      }
      h2 !== (d2 == null ? void 0 : d2.index) && (n2 = A.nextNode(), h2++);
    }
    return o2;
  }
  m(t2) {
    let i2 = 0;
    for (const s2 of this.v)
      s2 !== void 0 && (s2.strings !== void 0 ? (s2._$AI(t2, s2, i2), i2 += s2.strings.length - 2) : s2._$AI(t2[i2])), i2++;
  }
}
class N {
  constructor(t2, i2, s2, e2) {
    var o2;
    this.type = 2, this._$AH = w, this._$AN = void 0, this._$AA = t2, this._$AB = i2, this._$AM = s2, this.options = e2, this._$Cg = (o2 = e2 == null ? void 0 : e2.isConnected) === null || o2 === void 0 || o2;
  }
  get _$AU() {
    var t2, i2;
    return (i2 = (t2 = this._$AM) === null || t2 === void 0 ? void 0 : t2._$AU) !== null && i2 !== void 0 ? i2 : this._$Cg;
  }
  get parentNode() {
    let t2 = this._$AA.parentNode;
    const i2 = this._$AM;
    return i2 !== void 0 && t2.nodeType === 11 && (t2 = i2.parentNode), t2;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t2, i2 = this) {
    t2 = P(this, t2, i2), r(t2) ? t2 === w || t2 == null || t2 === "" ? (this._$AH !== w && this._$AR(), this._$AH = w) : t2 !== this._$AH && t2 !== b && this.$(t2) : t2._$litType$ !== void 0 ? this.T(t2) : t2.nodeType !== void 0 ? this.k(t2) : u(t2) ? this.S(t2) : this.$(t2);
  }
  M(t2, i2 = this._$AB) {
    return this._$AA.parentNode.insertBefore(t2, i2);
  }
  k(t2) {
    this._$AH !== t2 && (this._$AR(), this._$AH = this.M(t2));
  }
  $(t2) {
    this._$AH !== w && r(this._$AH) ? this._$AA.nextSibling.data = t2 : this.k(l$1.createTextNode(t2)), this._$AH = t2;
  }
  T(t2) {
    var i2;
    const { values: s2, _$litType$: e2 } = t2, o2 = typeof e2 == "number" ? this._$AC(t2) : (e2.el === void 0 && (e2.el = E.createElement(e2.h, this.options)), e2);
    if (((i2 = this._$AH) === null || i2 === void 0 ? void 0 : i2._$AD) === o2)
      this._$AH.m(s2);
    else {
      const t3 = new V(o2, this), i3 = t3.p(this.options);
      t3.m(s2), this.k(i3), this._$AH = t3;
    }
  }
  _$AC(t2) {
    let i2 = T.get(t2.strings);
    return i2 === void 0 && T.set(t2.strings, i2 = new E(t2)), i2;
  }
  S(t2) {
    d(this._$AH) || (this._$AH = [], this._$AR());
    const i2 = this._$AH;
    let s2, e2 = 0;
    for (const o2 of t2)
      e2 === i2.length ? i2.push(s2 = new N(this.M(h()), this.M(h()), this, this.options)) : s2 = i2[e2], s2._$AI(o2), e2++;
    e2 < i2.length && (this._$AR(s2 && s2._$AB.nextSibling, e2), i2.length = e2);
  }
  _$AR(t2 = this._$AA.nextSibling, i2) {
    var s2;
    for ((s2 = this._$AP) === null || s2 === void 0 || s2.call(this, false, true, i2); t2 && t2 !== this._$AB; ) {
      const i3 = t2.nextSibling;
      t2.remove(), t2 = i3;
    }
  }
  setConnected(t2) {
    var i2;
    this._$AM === void 0 && (this._$Cg = t2, (i2 = this._$AP) === null || i2 === void 0 || i2.call(this, t2));
  }
}
class S {
  constructor(t2, i2, s2, e2, o2) {
    this.type = 1, this._$AH = w, this._$AN = void 0, this.element = t2, this.name = i2, this._$AM = e2, this.options = o2, s2.length > 2 || s2[0] !== "" || s2[1] !== "" ? (this._$AH = Array(s2.length - 1).fill(new String()), this.strings = s2) : this._$AH = w;
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t2, i2 = this, s2, e2) {
    const o2 = this.strings;
    let n2 = false;
    if (o2 === void 0)
      t2 = P(this, t2, i2, 0), n2 = !r(t2) || t2 !== this._$AH && t2 !== b, n2 && (this._$AH = t2);
    else {
      const e3 = t2;
      let l2, h2;
      for (t2 = o2[0], l2 = 0; l2 < o2.length - 1; l2++)
        h2 = P(this, e3[s2 + l2], i2, l2), h2 === b && (h2 = this._$AH[l2]), n2 || (n2 = !r(h2) || h2 !== this._$AH[l2]), h2 === w ? t2 = w : t2 !== w && (t2 += (h2 != null ? h2 : "") + o2[l2 + 1]), this._$AH[l2] = h2;
    }
    n2 && !e2 && this.C(t2);
  }
  C(t2) {
    t2 === w ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t2 != null ? t2 : "");
  }
}
class M extends S {
  constructor() {
    super(...arguments), this.type = 3;
  }
  C(t2) {
    this.element[this.name] = t2 === w ? void 0 : t2;
  }
}
const k = i$2 ? i$2.emptyScript : "";
class H extends S {
  constructor() {
    super(...arguments), this.type = 4;
  }
  C(t2) {
    t2 && t2 !== w ? this.element.setAttribute(this.name, k) : this.element.removeAttribute(this.name);
  }
}
class I extends S {
  constructor(t2, i2, s2, e2, o2) {
    super(t2, i2, s2, e2, o2), this.type = 5;
  }
  _$AI(t2, i2 = this) {
    var s2;
    if ((t2 = (s2 = P(this, t2, i2, 0)) !== null && s2 !== void 0 ? s2 : w) === b)
      return;
    const e2 = this._$AH, o2 = t2 === w && e2 !== w || t2.capture !== e2.capture || t2.once !== e2.once || t2.passive !== e2.passive, n2 = t2 !== w && (e2 === w || o2);
    o2 && this.element.removeEventListener(this.name, this, e2), n2 && this.element.addEventListener(this.name, this, t2), this._$AH = t2;
  }
  handleEvent(t2) {
    var i2, s2;
    typeof this._$AH == "function" ? this._$AH.call((s2 = (i2 = this.options) === null || i2 === void 0 ? void 0 : i2.host) !== null && s2 !== void 0 ? s2 : this.element, t2) : this._$AH.handleEvent(t2);
  }
}
class L {
  constructor(t2, i2, s2) {
    this.element = t2, this.type = 6, this._$AN = void 0, this._$AM = i2, this.options = s2;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t2) {
    P(this, t2);
  }
}
const z = window.litHtmlPolyfillSupport;
z == null || z(E, N), ((t = globalThis.litHtmlVersions) !== null && t !== void 0 ? t : globalThis.litHtmlVersions = []).push("2.2.6");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var l, o$1;
class s extends a$1 {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Dt = void 0;
  }
  createRenderRoot() {
    var t2, e2;
    const i2 = super.createRenderRoot();
    return (t2 = (e2 = this.renderOptions).renderBefore) !== null && t2 !== void 0 || (e2.renderBefore = i2.firstChild), i2;
  }
  update(t2) {
    const i2 = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t2), this._$Dt = x(i2, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t2;
    super.connectedCallback(), (t2 = this._$Dt) === null || t2 === void 0 || t2.setConnected(true);
  }
  disconnectedCallback() {
    var t2;
    super.disconnectedCallback(), (t2 = this._$Dt) === null || t2 === void 0 || t2.setConnected(false);
  }
  render() {
    return b;
  }
}
s.finalized = true, s._$litElement$ = true, (l = globalThis.litElementHydrateSupport) === null || l === void 0 || l.call(globalThis, { LitElement: s });
const n$3 = globalThis.litElementPolyfillSupport;
n$3 == null || n$3({ LitElement: s });
((o$1 = globalThis.litElementVersions) !== null && o$1 !== void 0 ? o$1 : globalThis.litElementVersions = []).push("3.2.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const n$2 = (n2) => (e2) => typeof e2 == "function" ? ((n3, e3) => (window.customElements.define(n3, e3), e3))(n2, e2) : ((n3, e3) => {
  const { kind: t2, elements: i2 } = e3;
  return { kind: t2, elements: i2, finisher(e4) {
    window.customElements.define(n3, e4);
  } };
})(n2, e2);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const i$1 = (i2, e2) => e2.kind === "method" && e2.descriptor && !("value" in e2.descriptor) ? __spreadProps(__spreadValues({}, e2), { finisher(n2) {
  n2.createProperty(e2.key, i2);
} }) : { kind: "field", key: Symbol(), placement: "own", descriptor: {}, originalKey: e2.key, initializer() {
  typeof e2.initializer == "function" && (this[e2.key] = e2.initializer.call(this));
}, finisher(n2) {
  n2.createProperty(e2.key, i2);
} };
function e(e2) {
  return (n2, t2) => t2 !== void 0 ? ((i2, e3, n3) => {
    e3.constructor.createProperty(n3, i2);
  })(e2, n2, t2) : i$1(e2, n2);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const o = ({ finisher: e2, descriptor: t2 }) => (o2, n2) => {
  var r2;
  if (n2 === void 0) {
    const n3 = (r2 = o2.originalKey) !== null && r2 !== void 0 ? r2 : o2.key, i2 = t2 != null ? { kind: "method", placement: "prototype", key: n3, descriptor: t2(o2.key) } : __spreadProps(__spreadValues({}, o2), { key: n3 });
    return e2 != null && (i2.finisher = function(t3) {
      e2(t3, n3);
    }), i2;
  }
  {
    const r3 = o2.constructor;
    t2 !== void 0 && Object.defineProperty(o2, n2, t2(n2)), e2 == null || e2(r3, n2);
  }
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function i(i2, n2) {
  return o({ descriptor: (o2) => {
    const t2 = { get() {
      var o3, n3;
      return (n3 = (o3 = this.renderRoot) === null || o3 === void 0 ? void 0 : o3.querySelector(i2)) !== null && n3 !== void 0 ? n3 : null;
    }, enumerable: true, configurable: true };
    if (n2) {
      const n3 = typeof o2 == "symbol" ? Symbol() : "__" + o2;
      t2.get = function() {
        var o3, t3;
        return this[n3] === void 0 && (this[n3] = (t3 = (o3 = this.renderRoot) === null || o3 === void 0 ? void 0 : o3.querySelector(i2)) !== null && t3 !== void 0 ? t3 : null), this[n3];
      };
    }
    return t2;
  } });
}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var n$1;
((n$1 = window.HTMLSlotElement) === null || n$1 === void 0 ? void 0 : n$1.prototype.assignedElements) != null ? (o2, n2) => o2.assignedElements(n2) : (o2, n2) => o2.assignedNodes(n2).filter((o3) => o3.nodeType === Node.ELEMENT_NODE);
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function n(n2, o2, r2) {
  return n2 ? o2() : r2 == null ? void 0 : r2();
}
var after = "data:image/png;base64,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";
var after_disabled = "data:image/png;base64,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";
var __defProp2 = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
    if (decorator = decorators[i2])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp2(target, key, result);
  return result;
};
let YoungPreviewGallary = class extends s {
  constructor() {
    super(...arguments);
    this.direction = "x";
    this["show-icon"] = true;
    this["after-icon"] = after;
    this["after-icon-disabled"] = after_disabled;
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
    const d2 = this["display-num"];
    this.width = iw * d2 + this.gap * (d2 - 1);
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
    return $`
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
      ${n(this["show-icon"], () => $`
          <div class="container">
            <div id="before">
              ${n(this.disablePrev, () => $`
                  <img title="上一张" class="icon disabled" src=${this["after-icon-disabled"]} />
                  `, () => $`
                  <img title="上一张" class="icon" src=${this["after-icon"]} @click=${this.prev} />
                  `)}
            </div>
            <div id="base">
              <slot></slot>
            </div>
            <div id="after">
              ${n(this.disableNext, () => $`
                  <img title="下一张" class="icon disabled" src=${this["after-icon-disabled"]} />
                  `, () => $`
                  <img title="下一张" class="icon" src=${this["after-icon"]} @click=${this.next} />
                  `)}
            </div>
          </div>
          `, () => $`
          <div id="base">
            <slot></slot>
          </div>
          `)}
    `;
  }
};
__decorateClass([
  e()
], YoungPreviewGallary.prototype, "direction", 2);
__decorateClass([
  e({ type: Boolean })
], YoungPreviewGallary.prototype, "show-icon", 2);
__decorateClass([
  e()
], YoungPreviewGallary.prototype, "after-icon", 2);
__decorateClass([
  e()
], YoungPreviewGallary.prototype, "after-icon-disabled", 2);
__decorateClass([
  i("#base")
], YoungPreviewGallary.prototype, "baseEl", 2);
__decorateClass([
  e({ type: Number })
], YoungPreviewGallary.prototype, "gap", 2);
__decorateClass([
  e({ type: Number })
], YoungPreviewGallary.prototype, "item-width", 2);
__decorateClass([
  e({ type: Number })
], YoungPreviewGallary.prototype, "display-num", 2);
__decorateClass([
  e({ type: Number })
], YoungPreviewGallary.prototype, "width", 2);
__decorateClass([
  e({ type: Number })
], YoungPreviewGallary.prototype, "num", 2);
__decorateClass([
  e()
], YoungPreviewGallary.prototype, "index", 2);
__decorateClass([
  e()
], YoungPreviewGallary.prototype, "disablePrev", 2);
__decorateClass([
  e()
], YoungPreviewGallary.prototype, "disableNext", 2);
YoungPreviewGallary = __decorateClass([
  n$2("young-preview-gallary")
], YoungPreviewGallary);
let YoungPreviewGallaryItem = class extends s {
  render() {
    return $`
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
  n$2("young-preview-gallary-item")
], YoungPreviewGallaryItem);
export { YoungPreviewGallary, YoungPreviewGallaryItem };
//# sourceMappingURL=index.es.js.map
