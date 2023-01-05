import { defineComponent as f, ref as c, onMounted as C, onUnmounted as j, createVNode as t, Teleport as w, nextTick as k, Fragment as _, watch as T } from "vue";
import { useMouse as M } from "@vueuse/core";
const O = f({
  props: {
    zIndex: {
      type: Number,
      default: 2e3
    }
  },
  setup(o, {
    expose: r,
    slots: a
  }) {
    const l = c(!1), u = () => l.value = !0, n = () => l.value = !1, p = (e) => {
      e.composedPath()[0] === e.currentTarget && n();
    };
    r({
      show: u,
      hide: n
    });
    const s = c(), g = (e) => {
      e.ctrlKey && e.key.toLocaleLowerCase() === "k" && (e.preventDefault(), l.value ? n() : (u(), k(() => {
        var d;
        (d = s.value) == null || d.focus();
      })));
    };
    return C(() => {
      window.addEventListener("keydown", g);
    }), j(() => {
      window.removeEventListener("keydown", g);
    }), () => t(w, {
      to: "body"
    }, {
      default: () => [t("div", {
        onClick: (e) => p(e),
        style: {
          display: l.value ? "block" : "none",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          width: "100vw",
          height: "100vh",
          position: "absolute",
          left: 0,
          top: 0,
          zIndex: o.zIndex
        }
      }, [t("div", {
        style: {
          position: "relative",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: "min(600px, 70%)",
          maxHeight: "min(520px, 60%)",
          overflow: "auto",
          borderRadius: "1rem",
          border: "1px solid rgb(219, 234, 254)",
          backgroundColor: "white",
          padding: "2rem",
          boxShadow: "rgba(0, 0, 0, 0) 0 0 0 0, rgba(0, 0, 0, 0) 0 0 0 0, 0 4px 6px -1px rgb(0 0 0/0.1), 0 2px 4px -2px rgb(0 0 0/0.1)"
        }
      }, [a.default ? a.default({
        el: s
      }) : t("input", {
        ref: s,
        type: "text"
      }, null)])])]
    });
  }
}), L = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: O
}, Symbol.toStringTag, { value: "Module" })), z = f({
  props: {
    titleStyle: {
      type: Object,
      default: () => ({})
    },
    activeStyle: {
      type: [Object, String],
      required: !0
    },
    inactiveStyle: {
      type: [Object, String],
      required: !0
    },
    titles: {
      type: Array,
      required: !0
    }
  },
  setup(o, {
    slots: r
  }) {
    const a = c(0);
    return () => {
      var l;
      return t(_, null, [t("div", {
        style: {
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          ...o.titleStyle
        }
      }, [o.titles.map((u, n) => t("div", {
        key: n + "adjhskse",
        style: n === a.value ? o.activeStyle : o.inactiveStyle,
        onClick: () => a.value = n
      }, [u]))]), (l = r[`index_${a.value}`]) == null ? void 0 : l.call(r)]);
    };
  }
}), V = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: z
}, Symbol.toStringTag, { value: "Module" })), P = f({
  props: {
    modelValue: {
      type: Boolean,
      required: !0
    },
    menuList: {
      type: Object,
      required: !0
    }
  },
  emits: ["update:modelValue", "clickItem"],
  setup(o, {
    emit: r
  }) {
    const {
      x: a,
      y: l
    } = M(), u = c(0), n = c(0), p = c();
    T(() => o.modelValue, (e, d) => {
      e && !d && k(() => {
        console.log(p.value);
        const {
          width: i,
          height: S
        } = window.getComputedStyle(p.value), {
          innerWidth: y,
          innerHeight: b
        } = window, v = a.value, m = l.value, x = parseFloat(i), h = parseFloat(S);
        u.value = y - v > x ? v : y - x, n.value = b - m > h ? m : b - h;
      });
    });
    const s = (e) => {
      r("clickItem", e);
    }, g = () => {
      r("update:modelValue", !1);
    };
    return () => t(w, {
      to: "body"
    }, {
      default: () => [o.modelValue && t("div", {
        style: {
          backgroundColor: "rgba(200, 200, 200, 0)",
          position: "absolute",
          width: "100vw",
          height: "100vh",
          top: 0,
          zIndex: 1001
        },
        onClick: () => g()
      }, [t("ul", {
        ref: p,
        style: {
          left: u.value + "px",
          top: n.value + "px",
          margin: 0,
          background: "#fff",
          zIndex: 3e3,
          position: "absolute",
          listStyleType: "none",
          padding: "5px 0",
          borderRadius: "4px",
          fontSize: "12px",
          fontWeight: 400,
          color: "#333",
          boxShadow: "2px 2px 3px 0 rgba(0, 0, 0, .3)"
        }
      }, [o.menuList.map((e, d) => t("li", {
        key: d + "fdasjhe",
        style: {
          margin: 0,
          padding: "7px 16px",
          cursor: "pointer"
        },
        onClick: (i) => {
          i.stopPropagation(), s(e.handlerName);
        },
        onMouseover: (i) => i.currentTarget.style.background = "#eee",
        onMouseleave: (i) => i.currentTarget.style.background = "#fff"
      }, [e.title]))])])]
    });
  }
}), q = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: P
}, Symbol.toStringTag, { value: "Module" }));
export {
  L as YoungCmdPopup,
  q as YoungContextMenu,
  V as YoungTab
};
//# sourceMappingURL=index.es.js.map
