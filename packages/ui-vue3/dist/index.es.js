import { defineComponent as s, ref as d, onMounted as b, onUnmounted as f, createVNode as n, Teleport as v, nextTick as g, Fragment as m } from "vue";
const w = s({
  props: {
    zIndex: {
      type: Number,
      default: 2e3
    }
  },
  setup(r, {
    expose: a,
    slots: l
  }) {
    const t = d(!1), i = () => t.value = !0, o = () => t.value = !1, y = (e) => {
      e.composedPath()[0] === e.currentTarget && o();
    };
    a({
      show: i,
      hide: o
    });
    const u = d(), p = (e) => {
      e.ctrlKey && e.key.toLocaleLowerCase() === "k" && (e.preventDefault(), t.value ? o() : (i(), g(() => {
        var c;
        (c = u.value) == null || c.focus();
      })));
    };
    return b(() => {
      window.addEventListener("keydown", p);
    }), f(() => {
      window.removeEventListener("keydown", p);
    }), () => n(v, {
      to: "body"
    }, {
      default: () => [n("div", {
        onClick: (e) => y(e),
        style: {
          display: t.value ? "block" : "none",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          width: "100vw",
          height: "100vh",
          position: "absolute",
          left: 0,
          top: 0,
          zIndex: r.zIndex
        }
      }, [n("div", {
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
      }, [l.default ? l.default({
        el: u
      }) : n("input", {
        ref: u,
        type: "text"
      }, null)])])]
    });
  }
}), S = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: w
}, Symbol.toStringTag, { value: "Module" })), x = s({
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
  setup(r, {
    slots: a
  }) {
    const l = d(0);
    return () => {
      var t;
      return n(m, null, [n("div", {
        style: {
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          ...r.titleStyle
        }
      }, [r.titles.map((i, o) => n("div", {
        key: o + "adjhskse",
        style: o === l.value ? r.activeStyle : r.inactiveStyle,
        onClick: () => l.value = o
      }, [i]))]), (t = a[`index_${l.value}`]) == null ? void 0 : t.call(a)]);
    };
  }
}), k = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: x
}, Symbol.toStringTag, { value: "Module" }));
export {
  S as YoungCmdPopup,
  k as YoungTab
};
//# sourceMappingURL=index.es.js.map
