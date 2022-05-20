const createMask = (zIndex) => {
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
const createDialog = (zIndex) => {
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
const createItem = (zIndex = 3e3) => {
  const mask = createMask(zIndex);
  const dialog = createDialog(zIndex + 1);
  const container = document.createElement("div");
  container.appendChild(mask);
  container.appendChild(dialog);
  return container;
};
const getPosition = (selector) => {
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
const defautOptions = {
  immdiate: false,
  force: false
};
class YoungBeginnerGuid extends HTMLElement {
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
}
window.customElements.get("young-beginner-guid") || window.customElements.define("young-beginner-guid", YoungBeginnerGuid);
class YoungBeginnerGuidController {
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
}
export { YoungBeginnerGuidController, YoungBeginnerGuid as default };
//# sourceMappingURL=index.es.js.map
