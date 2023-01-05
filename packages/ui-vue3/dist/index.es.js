import { defineComponent as f, ref as s, onMounted as C, onUnmounted as I, createVNode as t, Teleport as w, nextTick as k, Fragment as j, watch as T } from "vue";
import { useMouse as z } from "@vueuse/core";
const q = f({
  props: {
    zIndex: {
      type: Number,
      default: 2e3
    }
  },
  setup(o, {
    expose: a,
    slots: r
  }) {
    const l = s(!1), i = () => l.value = !0, n = () => l.value = !1, c = (e) => {
      e.composedPath()[0] === e.currentTarget && n();
    };
    a({
      show: i,
      hide: n
    });
    const p = s(), y = (e) => {
      e.ctrlKey && e.key.toLocaleLowerCase() === "k" && (e.preventDefault(), l.value ? n() : (i(), k(() => {
        var d;
        (d = p.value) == null || d.focus();
      })));
    };
    return C(() => {
      window.addEventListener("keydown", y);
    }), I(() => {
      window.removeEventListener("keydown", y);
    }), () => t(w, {
      to: "body"
    }, {
      default: () => [t("div", {
        onClick: (e) => c(e),
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
      }, [r.default ? r.default({
        el: p
      }) : t("input", {
        ref: p,
        type: "text"
      }, null)])])]
    });
  }
}), M = f({
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
    slots: a
  }) {
    const r = s(0);
    return () => {
      var l;
      return t(j, null, [t("div", {
        style: {
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          ...o.titleStyle
        }
      }, [o.titles.map((i, n) => t("div", {
        key: n + "adjhskse",
        style: n === r.value ? o.activeStyle : o.inactiveStyle,
        onClick: () => r.value = n
      }, [i]))]), (l = a[`index_${r.value}`]) == null ? void 0 : l.call(a)]);
    };
  }
}), H = f({
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
    emit: a
  }) {
    const {
      x: r,
      y: l
    } = z(), i = s(0), n = s(0), c = s();
    T(() => o.modelValue, (e, d) => {
      e && !d && k(() => {
        console.log(c.value);
        const {
          width: u,
          height: S
        } = window.getComputedStyle(c.value), {
          innerWidth: v,
          innerHeight: g
        } = window, x = r.value, b = l.value, m = parseFloat(u), h = parseFloat(S);
        i.value = v - x > m ? x : v - m, n.value = g - b > h ? b : g - h;
      });
    });
    const p = (e) => {
      a("clickItem", e);
    }, y = () => {
      a("update:modelValue", !1);
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
        onClick: () => y()
      }, [t("ul", {
        ref: c,
        style: {
          left: i.value + "px",
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
        onClick: (u) => {
          u.stopPropagation(), p(e.handlerName);
        },
        onMouseover: (u) => u.currentTarget.style.background = "#eee",
        onMouseleave: (u) => u.currentTarget.style.background = "#fff"
      }, [e.title]))])])]
    });
  }
});
export {
  q as YoungCmdPopup,
  H as YoungContextMenu,
  M as YoungTab
};
//# sourceMappingURL=index.es.js.map
