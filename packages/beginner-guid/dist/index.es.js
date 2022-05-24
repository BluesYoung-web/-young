var cssContent = "#mask {\n  width: 100vw;\n  height: 100vh;\n  background-color: gray;\n  opacity: 0.6;\n  position: fixed;\n  top: 0;\n}\n#dialog {\n  width: 400px;\n  height: 300px;\n  background-color: #fff;\n  position: fixed;\n  top: 0;\n}\n#dialog .title {\n  text-align: center;\n}\n\n#dialog .content {\n  text-align: center;\n}\n\n#dialog .btns {\n  position: absolute;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-justify-content: space-around;\n      -ms-flex-pack: distribute;\n          justify-content: space-around;\n  bottom: 0;\n  width: 100%;\n  padding: 10%;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n}\n#dialog .btns button {\n  cursor: pointer;\n}\n\n#dialog-close {\n  position: absolute;\n  right: 0;\n  top: 0;\n  padding: 0.6rem;\n  cursor: pointer;\n}";
var closeIcon = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--ion" width="24" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 512 512"><path d="M331.3 308.7L278.6 256l52.7-52.7c6.2-6.2 6.2-16.4 0-22.6-6.2-6.2-16.4-6.2-22.6 0L256 233.4l-52.7-52.7c-6.2-6.2-15.6-7.1-22.6 0-7.1 7.1-6 16.6 0 22.6l52.7 52.7-52.7 52.7c-6.7 6.7-6.4 16.3 0 22.6 6.4 6.4 16.4 6.2 22.6 0l52.7-52.7 52.7 52.7c6.2 6.2 16.4 6.2 22.6 0 6.3-6.2 6.3-16.4 0-22.6z" fill="#434343"></path><path d="M256 76c48.1 0 93.3 18.7 127.3 52.7S436 207.9 436 256s-18.7 93.3-52.7 127.3S304.1 436 256 436c-48.1 0-93.3-18.7-127.3-52.7S76 304.1 76 256s18.7-93.3 52.7-127.3S207.9 76 256 76m0-28C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48z" fill="currentColor"></path></svg>';
const createEL = (attrs = {}, tag = "div") => {
  const el = document.createElement(tag);
  Object.entries(attrs).forEach(([key, value]) => {
    el.setAttribute(key, value);
  });
  return el;
};
const createItem = (handler, zIndex = "3000") => {
  const mask = createEL({ id: "mask" });
  const dialog = document.createElement("div");
  dialog.setAttribute("id", "dialog");
  dialog.innerHTML = `
  ${!handler.force ? `<div id="dialog-close" title="\u5173\u95ED\u65B0\u624B\u5F15\u5BFC">${closeIcon}</div>` : ""}
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
  ${cssContent}
  `;
  container.prepend(styles);
  container.appendChild(mask);
  container.appendChild(dialog);
  return container;
};
const getPosition = (selector) => {
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
    if (x < dw + offset) {
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
const generateClipPathStr = (x, y, w, h) => {
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
const defautOptions = {
  immdiate: false,
  force: false
};
class YoungBeginnerGuid extends HTMLElement {
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
}
window.customElements.get("young-beginner-guid") || window.customElements.define("young-beginner-guid", YoungBeginnerGuid);
class YoungBeginnerGuidController {
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
}
export { YoungBeginnerGuid, YoungBeginnerGuidController };
//# sourceMappingURL=index.es.js.map
