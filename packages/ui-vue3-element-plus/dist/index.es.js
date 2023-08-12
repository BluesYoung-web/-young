var Hs = Object.defineProperty;
var Ws = (e, t, r) => t in e ? Hs(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var Hn = (e, t, r) => (Ws(e, typeof t != "symbol" ? t + "" : t, r), r);
import { defineComponent as nr, onMounted as r0, ref as ue, onActivated as Ia, nextTick as Mr, watchEffect as _t, createVNode as W, mergeProps as Le, Fragment as Wr, createTextVNode as or, isVNode as Fn, computed as Zr, watch as qn, Teleport as Vs, reactive as Gs, initDirectivesForSSR as Xs, createApp as js, ssrContextKey as Pa, warn as fn, Static as $s, Comment as zs, Text as Ks, ssrUtils as La, render as Ys } from "vue";
import { deepClone as Qe, randomId as Gt, recentDay as qs, isArray as Js } from "@bluesyoung/utils";
import { ElTable as Ba, ElTableColumn as ln, ElTooltip as on, ElPopover as Zs, ElCheckboxGroup as Ma, ElCheckbox as ba, ElPagination as Qs, ElDialog as ef, ElButton as Qr, ElMessageBox as t0, ElSelect as rf, ElOption as tf, ElTimeSelect as U0, ElTimePicker as nf, ElDatePicker as af, ElImageViewer as sf, ElForm as ff, ElInput as lf, ElInputNumber as of, ElFormItem as cf, ElOverlay as uf, ElSwitch as hf, ElDrawer as xf, ElMessage as cn, ElUpload as df, ElLoadingService as pf } from "element-plus";
import { useMediaQuery as n0, useEventListener as a0, useWindowSize as vf, useLocalStorage as mf, useIntersectionObserver as gf } from "@vueuse/core";
import _f from "sortablejs";
import { makeMap as Tf, isPromise as i0, isFunction as Ef, NOOP as H0, isString as Tt, escapeHtmlComment as wf, escapeHtml as Hr, isVoidTag as Sf, isOn as Af, isSVGTag as yf, propsToAttrMap as Ff, isBooleanAttr as Cf, includeBooleanAttr as Of, isSSRSafeAttrName as Df, normalizeClass as Rf, normalizeStyle as kf, stringifyStyle as Nf, isArray as If } from "@vue/shared";
function Pf(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !Fn(e);
}
const od = nr({
  props: {
    tableData: {
      type: Object,
      required: !0
    },
    tableHead: {
      type: Object,
      required: !0
    },
    tableHeight: {
      type: [Number, String],
      default: "100%"
    },
    selectable: {
      type: Boolean,
      default: !1
    },
    rowDraggable: {
      type: Boolean,
      default: !1
    },
    enableCustomHead: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["row-drag-change"],
  setup(e, {
    emit: t,
    attrs: r,
    slots: n
  }) {
    r0(async () => {
      if (e.rowDraggable) {
        const {
          default: l
        } = await import("sortablejs");
        if (e.rowDraggable) {
          const o = a.value.$el.querySelector("tbody");
          o.style.cursor = "move", new l(o, {
            animation: 150,
            onEnd: ({
              oldIndex: u,
              newIndex: h
            }) => {
              if (u === h)
                return;
              const d = f.value, g = Qe(d[u]);
              d.splice(u, 1), d.splice(h, 0, g), t("row-drag-change", f.value);
            }
          });
        }
      }
    });
    const a = ue();
    Ia(() => {
      Mr(() => {
        a.value.doLayout();
      });
    });
    const i = ue([]), s = ue([]), f = ue([]);
    _t(() => {
      const l = e.tableData, o = e.tableHead, u = l.length;
      Mr(() => {
        s.value = o.filter((d) => !d.only_export);
        const h = 50;
        if (u <= h)
          i.value = Qe(l), f.value = Qe(l);
        else {
          const {
            elArr: d,
            load: g
          } = V0(i, ue(l), h), {
            elArr: x,
            load: m
          } = V0(f, ue(l), h);
          let O = 0;
          i.value = l.slice(O, h), f.value = l.slice(O, h), Mr(() => {
            d.value = a.value.$el.querySelector("tbody").children, g();
          }), Mr(() => {
            x.value = a.value.$el.querySelector("tbody").children, m();
          });
        }
      });
    });
    const c = (l) => {
      s.value = e.tableHead.filter((o) => !o.only_export && l.includes(o.prop));
    };
    return () => W("div", {
      style: {
        position: "relative"
      }
    }, [W(Ba, Le(r, {
      ref: a,
      data: i.value,
      style: {
        width: "100%"
      },
      height: e.tableHeight
    }), {
      default: () => {
        var l, o;
        return [e.selectable && W(ln, {
          type: "selection",
          width: "55"
        }, null), s.value.map((u, h) => {
          var d;
          return W(ln, {
            key: h,
            prop: u.prop,
            label: u.label,
            width: u.width || "",
            sortable: u.sortable || !1,
            fixed: u.fixed || !1,
            align: u.aligin || "left",
            showOverflowTooltip: (d = u.show_overflow_tooltip) != null ? d : !0
          }, {
            header: (g) => s.value[h].tool_content ? W("div", {
              style: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }
            }, [W("span", null, [g.column.label]), W(on, {
              placement: "bottom"
            }, {
              default: () => [W("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                width: "1.2em",
                height: "1.2em",
                viewBox: "0 0 256 256"
              }, [W("path", {
                fill: "currentColor",
                d: "M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24Zm0 168a12 12 0 1 1 12-12a12 12 0 0 1-12 12Zm8-48.72v.72a8 8 0 0 1-16 0v-8a8 8 0 0 1 8-8c13.23 0 24-9 24-20s-10.77-20-24-20s-24 9-24 20v4a8 8 0 0 1-16 0v-4c0-19.85 17.94-36 40-36s40 16.15 40 36c0 17.38-13.76 31.93-32 35.28Z"
              }, null)])],
              content: () => s.value[h].tool_content
            })]) : W("span", null, [g.column.label]),
            default: (g) => u.render ? u.render(g.row, g.$index) : W("span", null, [g.row[u.prop]])
          });
        }), (l = n.switch) == null ? void 0 : l.call(n), (o = n.operate) == null ? void 0 : o.call(n)];
      }
    }), e.enableCustomHead && W(Zs, {
      trigger: "click",
      placement: "bottom-end",
      width: 200
    }, {
      reference: () => W("div", {
        style: {
          position: "absolute",
          top: 0,
          right: 0,
          zIndex: 2,
          cursor: "pointer"
        },
        title: "\u8868\u5934\u914D\u7F6E"
      }, [W("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "1.5rem",
        height: "1.5rem",
        viewBox: "0 0 24 24"
      }, [W("path", {
        fill: "currentColor",
        d: "M13.875 22h-3.75q-.375 0-.65-.25t-.325-.625l-.3-2.325q-.325-.125-.613-.3t-.562-.375l-2.175.9q-.35.125-.7.025t-.55-.425L2.4 15.4q-.2-.325-.125-.7t.375-.6l1.875-1.425Q4.5 12.5 4.5 12.337v-.674q0-.163.025-.338L2.65 9.9q-.3-.225-.375-.6t.125-.7l1.85-3.225q.175-.35.537-.438t.713.038l2.175.9q.275-.2.575-.375t.6-.3l.3-2.325q.05-.375.325-.625t.65-.25h3.75q.375 0 .65.25t.325.625l.3 2.325q.325.125.613.3t.562.375l2.175-.9q.35-.125.7-.025t.55.425L21.6 8.6q.2.325.125.7t-.375.6l-1.875 1.425q.025.175.025.338v.674q0 .163-.05.338l1.875 1.425q.3.225.375.6t-.125.7l-1.85 3.2q-.2.325-.563.438t-.712-.013l-2.125-.9q-.275.2-.575.375t-.6.3l-.3 2.325q-.05.375-.325.625t-.65.25Zm-1.825-6.5q1.45 0 2.475-1.025T15.55 12q0-1.45-1.025-2.475T12.05 8.5q-1.475 0-2.488 1.025T8.55 12q0 1.45 1.012 2.475T12.05 15.5Zm0-2q-.625 0-1.063-.438T10.55 12q0-.625.438-1.063t1.062-.437q.625 0 1.063.438T13.55 12q0 .625-.438 1.063t-1.062.437ZM12 12Zm-1 8h1.975l.35-2.65q.775-.2 1.438-.588t1.212-.937l2.475 1.025l.975-1.7l-2.15-1.625q.125-.35.175-.737T17.5 12q0-.4-.05-.787t-.175-.738l2.15-1.625l-.975-1.7l-2.475 1.05q-.55-.575-1.212-.962t-1.438-.588L13 4h-1.975l-.35 2.65q-.775.2-1.437.588t-1.213.937L5.55 7.15l-.975 1.7l2.15 1.6q-.125.375-.175.75t-.05.8q0 .4.05.775t.175.75l-2.15 1.625l.975 1.7l2.475-1.05q.55.575 1.213.963t1.437.587L11 20Z"
      }, null)])]),
      default: () => {
        let l;
        return W(Wr, null, [W("div", {
          style: {
            marginBottom: "10px",
            textAlign: "center",
            fontWeight: "bold"
          }
        }, [or("\u81EA\u5B9A\u4E49\u5C55\u793A\u7684\u8868\u5934")]), W(Ma, {
          style: {
            maxHeight: "350px",
            overflowY: "auto"
          },
          modelValue: s.value.map((o) => o.prop),
          "onUpdate:modelValue": c
        }, Pf(l = e.tableHead.filter((o) => !o.only_export).map((o, u) => W(ba, {
          label: o.prop,
          key: u,
          title: o.label
        }, {
          default: () => [o.label]
        }))) ? l : {
          default: () => [l]
        })]);
      }
    })]);
  }
}), Wn = {
  type: Number,
  required: !0
}, cd = nr({
  props: {
    total: Wn,
    page: Wn,
    limit: Wn,
    pageSizes: {
      type: Object,
      default: () => [10, 20, 30, 50]
    },
    layout: {
      type: String,
      default: "total, sizes, prev, pager, next, jumper"
    },
    background: {
      type: Boolean,
      default: !0
    },
    autoScroll: {
      type: Boolean,
      default: !0
    },
    hidden: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["page-change", "update:page", "update:limit"],
  setup(e, {
    emit: t,
    attrs: r
  }) {
    const n = (s) => {
      t("update:page", 1), t("update:limit", s), t("page-change");
    }, a = (s) => {
      t("update:page", s), t("page-change");
    }, i = n0("(max-width: 639.9px)");
    return () => W(Qs, Le({
      style: {
        background: "white",
        paddingTop: "20px",
        display: "flex",
        flexWrap: "wrap"
      }
    }, r, {
      background: e.background,
      currentPage: e.page,
      pageSize: e.limit,
      layout: i.value ? "total, sizes, jumper" : e.layout,
      pageSizes: e.pageSizes,
      total: e.total,
      "onUpdate:page-size": (s) => n(s),
      "onUpdate:current-page": (s) => a(s)
    }), null);
  }
}), ud = nr({
  props: {
    modelValue: Boolean,
    realTitle: String,
    width: {
      type: [String, Number],
      default: "50%"
    },
    sureText: {
      type: String,
      default: "\u786E\u5B9A"
    },
    cancelText: {
      type: String,
      default: "\u53D6\u6D88"
    },
    showSure: {
      type: Boolean,
      default: !0
    },
    showCancel: {
      type: Boolean,
      default: !0
    },
    isAdd: Boolean,
    isEdit: Boolean,
    isMore: Boolean,
    sureFn: Function,
    diffForm: {
      type: Object,
      default: null
    }
  },
  emits: ["sure", "clear", "update:modelValue"],
  setup(e, {
    emit: t,
    attrs: r,
    slots: n
  }) {
    const a = ue(""), i = Zr(() => {
      let o = "\u65B0\u5EFA";
      return e.isEdit && (o = "\u7F16\u8F91"), e.isMore && (o = "\u8BE6\u60C5"), o;
    }), s = Zr({
      get: () => e.isAdd || e.isMore || e.isEdit,
      set: (o) => null
    });
    e.diffForm && qn(() => s.value, (o, u) => {
      o && !u && (a.value = JSON.stringify(e.diffForm));
    }), e.diffForm && qn(() => e.modelValue, (o, u) => {
      o && !u && (a.value = JSON.stringify(e.diffForm));
    });
    const f = async () => {
      if (!(e.sureFn && await e.sureFn() === !1)) {
        if (e.isMore) {
          t("clear");
          return;
        }
        t("update:modelValue", !1), t("sure");
      }
    }, c = () => {
      const o = JSON.stringify(e.diffForm);
      if (e.isMore || !e.showCancel) {
        t("clear"), t("update:modelValue", !1);
        return;
      }
      if (e.diffForm && a.value === o) {
        t("clear"), t("update:modelValue", !1);
        return;
      } else
        t0.confirm("\u6570\u636E\u672A\u4FDD\u5B58\uFF0C\u5173\u95ED\u5C06\u4E22\u5931\u6570\u636E\uFF0C\u786E\u8BA4\u5173\u95ED\uFF1F", "\u63D0\u793A", {
          confirmButtonText: "\u786E\u8BA4",
          cancelButtonText: "\u53D6\u6D88"
        }).then(() => {
          t("update:modelValue", !1), t("clear");
        }).catch(() => null);
    }, l = n0("(max-width: 1023.9px)");
    return () => W(Vs, {
      to: "body"
    }, {
      default: () => [W(ef, Le(r, {
        modelValue: e.modelValue || s.value,
        title: e.realTitle || i.value,
        width: l.value ? "96%" : e.width,
        closeOnClickModal: !0,
        closeOnPressEscape: !1,
        beforeClose: c
      }), {
        default: () => {
          var o;
          return (o = n.body) == null ? void 0 : o.call(n);
        },
        footer: () => {
          var o, u, h;
          return W(Wr, null, [(o = n.button) == null ? void 0 : o.call(n), e.showCancel && W(Qr, {
            onClick: () => c()
          }, {
            default: () => [e.cancelText]
          }), (u = n.step1) == null ? void 0 : u.call(n), (h = n.step2) == null ? void 0 : h.call(n), e.showSure && W(Qr, {
            type: "primary",
            onClick: () => f()
          }, {
            default: () => [e.sureText]
          })]);
        }
      })]
    });
  }
});
function Lf(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !Fn(e);
}
const Bf = nr({
  props: {
    modelValue: {
      type: [String, Number, Array],
      required: !1
    },
    options: {
      type: Object,
      required: !0
    }
  },
  emits: ["update:modelValue", "change"],
  setup(e, {
    attrs: t,
    emit: r
  }) {
    const n = Gt();
    return () => {
      let a;
      return W(rf, Le({
        modelValue: e.modelValue,
        "onUpdate:modelValue": (i) => {
          r("update:modelValue", i), r("change", i);
        }
      }, t), Lf(a = e.options.map((i, s) => W(tf, Le(i, {
        key: s + n
      }), null))) ? a : {
        default: () => [a]
      });
    };
  }
});
function W0(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !Fn(e);
}
const Mf = ["\u5468\u4E00", "\u5468\u4E8C", "\u5468\u4E09", "\u5468\u56DB", "\u5468\u4E94", "\u5468\u516D", "\u5468\u65E5"], hd = nr({
  props: {
    modelValue: {
      type: Object,
      required: !0
    }
  },
  emits: ["update:modelValue", "change"],
  setup(e, {
    attrs: t,
    emit: r
  }) {
    const n = Gt(), a = (i) => {
      r("update:modelValue", i), r("change", i);
    };
    return () => {
      let i;
      return W(Ma, Le(t, {
        modelValue: e.modelValue,
        onChange: a
      }), W0(i = Mf.map((s, f) => W(ba, {
        label: f + 1,
        key: f + n
      }, W0(s) ? s : {
        default: () => [s]
      }))) ? i : {
        default: () => [i]
      });
    };
  }
}), xd = nr({
  props: {
    start: {
      type: String,
      required: !0
    },
    end: {
      type: String,
      required: !0
    },
    startTime: {
      type: String,
      default: "00:00"
    },
    endTime: {
      type: String,
      default: "23:59"
    },
    step: {
      type: String,
      default: "00:01"
    },
    second: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["update:start", "update:end", "change"],
  setup(e, {
    attrs: t,
    emit: r
  }) {
    const n = ue();
    _t(() => {
      e.start && e.end ? n.value = [new Date(`2022 02 02 ${e.start}`), new Date(`2022 02 02 ${e.end}${e.second ? ":59" : ""}`)] : n.value = void 0;
    });
    const a = (i) => {
      var s, f, c, l;
      if (!i)
        r("update:start", ""), r("update:end", "");
      else {
        const [o, u] = i;
        r("update:start", (f = (s = o.toLocaleString().match(/\d\d:\d\d:\d\d/)) == null ? void 0 : s[0]) != null ? f : ""), r("update:end", (l = (c = u.toLocaleString().match(/\d\d:\d\d:\d\d/)) == null ? void 0 : c[0]) != null ? l : "");
      }
      r("change");
    };
    return () => e.second ? W(nf, Le(t, {
      modelValue: n.value,
      isRange: !0,
      startPlaceholder: "\u5F00\u59CB\u65F6\u95F4",
      endPlaceholder: "\u7ED3\u675F\u65F6\u95F4",
      "onUpdate:modelValue": a
    }), null) : W(Wr, null, [W(U0, Le(t, {
      modelValue: e.start,
      class: "w-120px mr-2",
      maxTime: e.end,
      placeholder: "\u5F00\u59CB\u65F6\u95F4",
      start: e.startTime,
      step: e.step,
      end: e.endTime,
      "onUpdate:modelValue": (i) => r("update:start", i)
    }), null), or("- \xA0"), W(U0, Le(t, {
      modelValue: e.end,
      class: "w-120px",
      minTime: e.start,
      placeholder: "\u7ED3\u675F\u65F6\u95F4",
      start: e.startTime,
      step: e.step,
      end: e.endTime,
      "onUpdate:modelValue": (i) => r("update:end", i)
    }), null)]);
  }
}), bf = [{
  text: "\u4ECA\u5929",
  value: (() => {
    const e = new Date(), t = new Date();
    return t.setHours(0, 0, 0), e.setHours(23, 59, 59), [t, e];
  })()
}, {
  text: "\u6628\u5929",
  value: (() => {
    const e = new Date(), t = new Date();
    return e.setTime(t.getTime() - 3600 * 1e3 * 24 * 1), t.setTime(t.getTime() - 3600 * 1e3 * 24 * 1), t.setHours(0, 0, 0), e.setHours(23, 59, 59), [t, e];
  })()
}, {
  text: "\u672C\u5468",
  value: (() => {
    const e = new Date(), t = new Date();
    var r = t.getDay() || 7;
    return t.setDate(t.getDate() - r + 1), t.setHours(0, 0, 0), e.setHours(23, 59, 59), [t, e];
  })()
}, {
  text: "\u4E0A\u5468",
  value: (() => {
    const e = new Date(), t = new Date(e.getTime() - 7 * 24 * 3600 * 1e3), r = new Date(e.getTime() - 7 * 24 * 3600 * 1e3), n = t.getDay(), a = t.getDate() - n + (n === 0 ? -6 : 1), i = new Date(t.setDate(a)), s = new Date(r.setDate(a + 6));
    return i.setHours(0, 0, 0), s.setHours(23, 59, 59), [i, s];
  })()
}, {
  text: "\u672C\u6708",
  value: (() => {
    const e = new Date(), t = new Date();
    return e.setDate(1), e.setHours(0, 0, 0), t.setHours(23, 59, 59), [e, t];
  })()
}, {
  text: "\u4E0A\u6708",
  value: (() => {
    const t = new Date(), r = new Date(t.getFullYear(), t.getMonth() - 1, 1), a = new Date(t.getFullYear(), t.getMonth(), 1).getTime() - 1 * 864e5, i = new Date(a);
    return r.setHours(0, 0, 0), i.setHours(23, 59, 59), [r, i];
  })()
}, {
  text: "\u6700\u8FD17\u5929",
  value: (() => {
    const e = new Date(), t = new Date();
    return t.setTime(t.getTime() - 3600 * 1e3 * 24 * 6), t.setHours(0, 0, 0), e.setHours(23, 59, 59), [t, e];
  })()
}, {
  text: "\u6700\u8FD130\u5929",
  value: (() => {
    const e = new Date(), t = new Date();
    return t.setTime(t.getTime() - 3600 * 1e3 * 24 * 30), t.setHours(0, 0, 0), e.setHours(23, 59, 59), [t, e];
  })()
}], Uf = nr({
  props: {
    start: {
      type: [String, Number],
      default: ""
    },
    end: {
      type: [String, Number],
      default: ""
    },
    unix: {
      type: Boolean,
      default: !1
    },
    second: {
      type: Boolean,
      default: !1
    },
    shortcuts: {
      type: [Boolean, Array],
      default: !1
    }
  },
  emits: ["update:start", "update:end", "change"],
  setup(e, {
    attrs: t,
    emit: r
  }) {
    const n = ue();
    _t(() => {
      e.start && e.end ? e.unix ? n.value = [new Date(+e.start * 1e3), new Date(+e.end * 1e3)] : n.value = [new Date(e.start), new Date(e.end)] : n.value = null;
    });
    const a = (i) => {
      if (!i)
        r("update:start", void 0), r("update:end", void 0), n.value = null;
      else {
        const [s, f] = i;
        e.unix ? (r("update:start", Math.floor(s.getTime() / 1e3)), r("update:end", Math.floor(f.getTime() / 1e3))) : (r("update:start", s.getTime()), r("update:end", f.getTime()));
      }
    };
    return () => W(af, Le(t, {
      modelValue: n.value,
      type: e.second ? "datetimerange" : "daterange",
      "start-placeholder": "\u5F00\u59CB\u65E5\u671F",
      "end-placeholder": "\u7ED3\u675F\u65E5\u671F",
      "default-time": qs(),
      shortcuts: e.shortcuts ? Js(e.shortcuts) ? e.shortcuts : bf : void 0,
      clearable: !0,
      "onUpdate:modelValue": (i) => a(i),
      onChange: () => r("change")
    }), null);
  }
}), Hf = nr({
  props: {
    onDestroy: {
      type: Function,
      default: () => console.log("\u4E3A\u4E86\u8282\u7701\u6027\u80FD\uFF0C\u6B64\u65F6\u5E94\u8BE5\u9500\u6BC1dom")
    },
    zIndex: {
      type: Number,
      default: 9999
    }
  },
  setup(e, {
    expose: t
  }) {
    const r = ue(!1), n = Gs({
      srcList: [],
      index: 0,
      zIndex: e.zIndex
    });
    function a(l) {
      if (!!l.ctrlKey) {
        if (l.deltaY < 0)
          return l.preventDefault(), !1;
        if (l.deltaY > 0)
          return l.preventDefault(), !1;
      }
    }
    const i = a0("wheel", a, {
      passive: !1
    });
    let s;
    function f(l) {
      var o;
      n.srcList = l.srcList, n.index = (o = l.index) != null ? o : 0, s = document.body.style.overflow, document.body.style.overflow = "hidden", r.value = !0;
    }
    function c() {
      i(), document.body.style.overflow = s, r.value = !1, e.onDestroy();
    }
    return t({
      show: f,
      close: c
    }), () => r.value && W(sf, {
      zIndex: n.zIndex,
      initialIndex: n.index,
      urlList: n.srcList,
      hideOnClickModal: !0,
      onClose: c
    }, null);
  }
});
function Wf(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !Fn(e);
}
const dd = nr({
  props: {
    modelValue: Object,
    searchScheme: Object,
    fastSearch: {
      type: Boolean,
      default: !0
    },
    onSearch: {
      type: Function,
      default: () => console.log("---\u8868\u5355\u5143\u7D20\u89E6\u53D1\u8BF7\u6C42---")
    },
    onReset: {
      type: Function,
      default: () => console.log("---\u89E6\u53D1\u91CD\u7F6E\u8BF7\u6C42---")
    },
    dateTimeKey: {
      type: Array,
      default: () => ["startcreatetime", "endcreatetime"]
    }
  },
  emits: ["update:modelValue"],
  setup(e, {
    attrs: t,
    emit: r,
    slots: n
  }) {
    const a = ue({});
    qn(() => e.modelValue, (c) => {
      a.value = Qe(c);
    }, {
      immediate: !0,
      deep: !0
    });
    const i = (c = !0) => {
      r("update:modelValue", {
        ...a.value
      }), e.fastSearch && c && e.onSearch();
    }, s = (c) => {
      const l = e.searchScheme[c];
      l.attrs || (l.attrs = {});
      const o = (x, m) => m ? W(cf, {
        label: l.tip
      }, Wf(x) ? x : {
        default: () => [x]
      }) : x, [u, h] = e.dateTimeKey, g = {
        input: () => o(W(lf, Le({
          modelValue: a.value[c],
          "onUpdate:modelValue": (x) => {
            var m;
            return a.value[c] = (m = x == null ? void 0 : x.trim) == null ? void 0 : m.call(x);
          },
          onChange: () => i(!1),
          onKeyup: (x) => rd(x, () => i())
        }, l.attrs), null), l.tip),
        number: (x) => o(W(of, Le({
          modelValue: a.value[x],
          "onUpdate:modelValue": (m) => a.value[x] = m,
          onChange: () => i(),
          style: {
            width: "120px"
          }
        }, l.attrs), null), l.tip),
        select: (x) => o(W(Bf, Le({
          modelValue: a.value[x],
          options: l.options || [],
          "onUpdate:modelValue": (m) => a.value[x] = m,
          onChange: () => i()
        }, l.attrs), null), l.tip),
        datetimerange: (x) => o(W(Uf, Le({
          start: a.value[u],
          end: a.value[h],
          "onUpdate:start": (m) => {
            a.value[u] = m;
          },
          "onUpdate:end": (m) => {
            a.value[h] = m;
          },
          onChange: i
        }, l.attrs), null), l.tip),
        custom: (x) => o(l.render(), l.tip)
      }[l.type];
      if (g)
        return g(c);
      throw new Error("unknown search form type");
    }, f = Gt();
    return () => W("div", Le({
      style: {
        maxWidth: "100%",
        margin: "auto",
        padding: "20px"
      }
    }, t), [W(ff, {
      model: e.modelValue
    }, {
      default: () => {
        var c, l;
        return [W("div", {
          style: {
            display: "flex",
            flexWrap: "wrap",
            gap: "10px 20px"
          }
        }, [Object.keys(e.searchScheme).map((o, u) => W("div", {
          key: u + f
        }, [s(o)])), W("div", null, [(c = n.custom) == null ? void 0 : c.call(n)])]), W("div", {
          style: {
            display: "flex"
          }
        }, [W(Qr, {
          type: "primary",
          onClick: () => e.onSearch()
        }, {
          default: () => [or("\u641C\u7D22")]
        }), W(Qr, {
          onClick: () => e.onReset()
        }, {
          default: () => [or("\u91CD\u7F6E")]
        }), (l = n.btns) == null ? void 0 : l.call(n)])];
      }
    })]);
  }
}), Vf = "https://g2021-cdn.laiyouxi.com/image/21Store/laiyouxi_guid/website/landscape.png", pd = nr({
  props: {
    maxWidth: {
      type: Number,
      default: 768
    }
  },
  setup(e, {
    attrs: t
  }) {
    const r = ue(), n = ue(!1), a = () => n.value = !0, i = () => n.value = !1, {
      width: s,
      height: f
    } = vf(), c = Zr(() => s.value < f.value || s.value < e.maxWidth);
    return _t(() => {
      c.value ? a() : i();
    }), a0(r, "animationend", (l) => {
      i();
    }), () => W(Wr, null, [n.value && W(uf, Le({
      mask: !0,
      style: {
        width: "100vw",
        height: "100vh"
      }
    }, t), {
      default: () => [W("div", {
        style: {
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }
      }, [W("style", null, [`
                @keyframes rotate {
                  from {
                    transform: rotate(0);
                  }
                
                  to {
                    transform: rotate(90deg);
                  }
                }
                .rotate-tip {
                  width: 200px;
                  animation-name: rotate;
                  animation-iteration-count: 6;
                  animation-duration: 1s;
                  animation-direction: alternate;
                  animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
                }
                `]), W("img", {
        ref: r,
        src: Vf,
        class: "rotate-tip"
      }, null), W("div", {
        style: {
          color: "white",
          marginTop: "2.5rem",
          fontSize: "1.25rem",
          lineHeight: "1.75rem"
        }
      }, [or("\u4E3A\u4E86\u66F4\u597D\u7684\u7528\u6237\u4F53\u9A8C\uFF0C\u8BF7\u6A2A\u5C4F\u4F7F\u7528")])])]
    })]);
  }
}), Gf = nr({
  props: {
    list: {
      required: !0,
      type: Object
    }
  },
  emits: ["drag-end", "change"],
  setup(e, {
    emit: t
  }) {
    r0(() => {
      const n = document.querySelector(".young-drap-list");
      new _f(n, {
        animation: 150,
        onEnd: ({
          oldIndex: a,
          newIndex: i
        }) => {
          if (a--, i--, console.log(a, i), a === i)
            return;
          const s = e.list, f = Qe(s[a]);
          s.splice(a, 1), s.splice(i, 0, f), t("drag-end", s);
        }
      });
    });
    function r(n) {
      t("change", n, !n.check);
    }
    return () => W("div", {
      class: "young-drap-list"
    }, [W("style", null, [`
          .young-drag-list {
            list-style: none;
          }
          
          .young-drag-list-item {
            cursor: move;
            border-radius: 4px;
            color: #333;
            height: 36px;
            line-height: 36px;
            text-align: center;
            display: flex;
            align-items: center;
          }
          
          .young-drag-list-item:hover {
            background: #eee;
          }
          
          .young-drag-list-item.active {
            color: #409eff !important;
          }
          
          .young-drag-list-item .label {
            text-align: left;
            cursor: pointer;
            flex: 1;
            padding: 0 12px 0 0;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            /* \u663E\u793A\u7701\u7565\u53F7 */
          }
          
          .young-drag-list-item .draggable {
            text-align: center;
            display: flex;
            align-items: center;
            padding: 0 12px;
            height: 100%;
          }
          `]), e.list.map((n, a) => W("div", {
      class: `young-drag-list-item ${n.check ? "active" : ""}`,
      key: n.label
    }, [W("div", {
      class: "draggable",
      title: "\u62D6\u52A8\u53EF\u6392\u5E8F"
    }, [W("svg", {
      class: "icon",
      viewBox: "0 0 1024 1024",
      version: "1.1",
      xmlns: "http://www.w3.org/2000/svg",
      "p-id": "6483",
      width: "16",
      height: "16"
    }, [W("path", {
      d: "M867.995 459.647h-711.99c-27.921 0-52.353 24.434-52.353 52.353s24.434 52.353 52.353 52.353h711.99c27.921 0 52.353-24.434 52.353-52.353s-24.434-52.353-52.353-52.353z",
      "p-id": "6484"
    }, null), W("path", {
      d: "M867.995 763.291h-711.99c-27.921 0-52.353 24.434-52.353 52.353s24.434 52.353 52.353 52.353h711.99c27.921 0 52.353-24.434 52.353-52.353s-24.434-52.353-52.353-52.353z",
      "p-id": "6485"
    }, null), W("path", {
      d: "M156.005 260.709h711.99c27.921 0 52.353-24.434 52.353-52.353s-24.434-52.353-52.353-52.353h-711.99c-27.921 0-52.353 24.434-52.353 52.353s24.434 52.353 52.353 52.353z",
      "p-id": "6486"
    }, null)])]), W("div", {
      class: "label",
      onClick: (i) => {
        i.stopPropagation(), r(n);
      },
      title: n.label,
      style: {
        display: "flex",
        justifyContent: "space-between"
      },
      draggable: !1
    }, [W("span", null, [n.label]), W(hf, {
      modelValue: n.check
    }, null)])]))]);
  }
}), Xf = nr({
  props: {
    tableHead: {
      required: !0,
      type: Object
    }
  },
  emits: ["drag-end", "change", "save", "reset"],
  setup(e, {
    emit: t
  }) {
    const r = ue(!1), n = (s) => {
      t("drag-end", s);
    }, a = (s, f) => {
      t("change", s, f);
    };
    r0(() => {
      a0("click", (s) => {
        r.value = !1;
      });
    });
    const i = n0("(max-width: 639.9px)");
    return () => W(Wr, null, [W("div", {
      style: {
        display: "flex",
        justifyContent: "flex-end",
        paddingBottom: "10px",
        cursor: "pointer"
      },
      onClick: (s) => {
        s.stopPropagation(), r.value = !0;
      },
      title: "\u8868\u5934\u914D\u7F6E"
    }, [W("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      width: "1.5rem",
      height: "1.5rem",
      viewBox: "0 0 24 24"
    }, [W("path", {
      fill: "currentColor",
      d: "M13.875 22h-3.75q-.375 0-.65-.25t-.325-.625l-.3-2.325q-.325-.125-.613-.3t-.562-.375l-2.175.9q-.35.125-.7.025t-.55-.425L2.4 15.4q-.2-.325-.125-.7t.375-.6l1.875-1.425Q4.5 12.5 4.5 12.337v-.674q0-.163.025-.338L2.65 9.9q-.3-.225-.375-.6t.125-.7l1.85-3.225q.175-.35.537-.438t.713.038l2.175.9q.275-.2.575-.375t.6-.3l.3-2.325q.05-.375.325-.625t.65-.25h3.75q.375 0 .65.25t.325.625l.3 2.325q.325.125.613.3t.562.375l2.175-.9q.35-.125.7-.025t.55.425L21.6 8.6q.2.325.125.7t-.375.6l-1.875 1.425q.025.175.025.338v.674q0 .163-.05.338l1.875 1.425q.3.225.375.6t-.125.7l-1.85 3.2q-.2.325-.563.438t-.712-.013l-2.125-.9q-.275.2-.575.375t-.6.3l-.3 2.325q-.05.375-.325.625t-.65.25Zm-1.825-6.5q1.45 0 2.475-1.025T15.55 12q0-1.45-1.025-2.475T12.05 8.5q-1.475 0-2.488 1.025T8.55 12q0 1.45 1.012 2.475T12.05 15.5Zm0-2q-.625 0-1.063-.438T10.55 12q0-.625.438-1.063t1.062-.437q.625 0 1.063.438T13.55 12q0 .625-.438 1.063t-1.062.437ZM12 12Zm-1 8h1.975l.35-2.65q.775-.2 1.438-.588t1.212-.937l2.475 1.025l.975-1.7l-2.15-1.625q.125-.35.175-.737T17.5 12q0-.4-.05-.787t-.175-.738l2.15-1.625l-.975-1.7l-2.475 1.05q-.55-.575-1.212-.962t-1.438-.588L13 4h-1.975l-.35 2.65q-.775.2-1.437.588t-1.213.937L5.55 7.15l-.975 1.7l2.15 1.6q-.125.375-.175.75t-.05.8q0 .4.05.775t.175.75l-2.15 1.625l.975 1.7l2.475-1.05q.55.575 1.213.963t1.437.587L11 20Z"
    }, null)])]), W(xf, {
      modelValue: r.value,
      withHeader: !1,
      "onUpdate:modelValue": (s) => r.value = s,
      size: i.value ? "75%" : "30%"
    }, {
      default: () => W(Wr, null, [W("div", {
        style: {
          color: "#999",
          textAlign: "center",
          padding: "10px"
        }
      }, [or("\u62D6\u52A8\u53EF\u6392\u5E8F\uFF0C\u70B9\u51FB\u53EF\u4EE5\u5207\u6362\u5C55\u793A\u72B6\u6001")]), W(Gf, {
        list: e.tableHead,
        "onDrag-end": n,
        onChange: a
      }, null)]),
      footer: () => W("div", {
        style: {
          textAlign: "left"
        }
      }, [W(on, {
        content: "\u4FDD\u5B58\u914D\u7F6E\u5230\u672C\u5730\uFF0C\u5982\u679C\u4E0D\u4FDD\u5B58\uFF0C\u5219\u9875\u9762\u5237\u65B0\u4E4B\u540E\u4F1A\u4E22\u5931\u73B0\u6709\u7684\u4E2A\u6027\u5316\u914D\u7F6E"
      }, {
        default: () => [W(Qr, {
          type: "primary",
          onClick: () => t("save")
        }, {
          default: () => [or("\u4FDD\u5B58")]
        })]
      }), W(on, {
        content: "\u5FEB\u901F\u6062\u590D\u9ED8\u8BA4\u914D\u7F6E"
      }, {
        default: () => [W(Qr, {
          onClick: () => t("reset")
        }, {
          default: () => [or("\u91CD\u7F6E")]
        })]
      })])
    })]);
  }
}), vd = nr({
  props: {
    tableData: {
      type: Object,
      required: !0
    },
    tableHead: {
      type: Object,
      required: !0
    },
    tableHeadCheck: {
      type: Object,
      required: !1
    },
    tableHeight: {
      type: [Number, String],
      default: "100%"
    },
    selectable: {
      type: Boolean,
      default: !1
    },
    saveTableHead: {
      type: Boolean,
      default: !0
    },
    history: {
      type: Boolean,
      default: !0
    },
    historyId: {
      type: String,
      default: location.href.replace(location.origin, "")
    }
  },
  setup(e, {
    attrs: t,
    expose: r,
    slots: n
  }) {
    const a = ue();
    Ia(() => {
      Mr(() => {
        a.value.doLayout();
      });
    });
    const i = ue([]), s = ue([]), f = ue([]);
    _t(() => {
      i.value = e.tableData, Mr(() => {
        l();
      });
    });
    const c = mf(`table_pro_tableHead_${e.historyId}`, {}), l = () => {
      var A, y, R, X;
      e.history ? (s.value = (y = (A = c.value) == null ? void 0 : A.tableHead) != null ? y : [], f.value = (X = (R = c.value) == null ? void 0 : R.tableHeadCheck) != null ? X : [], f.value.length === 0 && o()) : o();
    }, o = () => {
      var A;
      s.value = Qe(e.tableHead), f.value = (A = e.tableHeadCheck) != null && A.length ? Qe(e.tableHeadCheck) : e.tableHead.map((y) => y.prop);
    }, u = Zr(() => s.value.map((A) => (A.check = f.value.includes(A.prop), A))), h = Zr(() => u.value.filter((A) => !A.only_export && A.check)), d = (A, y) => {
      const R = f.value.findIndex((X) => X === A.prop);
      !y && R != -1 ? f.value.splice(R, 1) : f.value.push(A.prop);
    }, g = (A) => {
      s.value = A;
    }, x = () => {
      c.value = {
        tableHead: u.value,
        tableHeadCheck: f.value
      }, cn.success("\u4FDD\u5B58\u6210\u529F");
    }, m = () => {
      t0.confirm("\u786E\u5B9A\u91CD\u7F6E\u8868\u5934\u5417\uFF1F", "\u63D0\u793A", {
        confirmButtonText: "\u786E\u5B9A",
        cancelButtonText: "\u53D6\u6D88",
        type: "warning"
      }).then(() => {
        c.value = {}, cn.success("\u91CD\u7F6E\u6210\u529F"), Mr(() => {
          l();
        });
      });
    }, O = Gt();
    return r({
      saveTableHead: x,
      resetTableHead: m
    }), () => W(Wr, null, [W("style", null, [`
          .nowarp {
            word-break: normal;
          }
          `]), W("div", null, [e.saveTableHead && W(Xf, {
      tableHead: u.value.filter((A) => !A.only_export),
      "onDrag-end": g,
      onChange: d,
      onSave: x,
      onReset: m
    }, null), W("div", {
      style: "position: relative;"
    }, [W(Ba, Le({
      ref: a,
      "header-cell-class-name": "nowarp",
      data: i.value,
      style: {
        width: "100%"
      },
      height: e.tableHeight,
      border: !0
    }, t), {
      default: () => {
        var A, y;
        return [e.selectable && W(ln, {
          type: "selection",
          width: "55"
        }, null), h.value.map((R, X) => {
          var Q;
          return W(ln, {
            key: R.prop.toString() + X + O,
            prop: R.prop,
            label: R.label,
            width: R.width || "",
            sortable: R.sortable || !1,
            fixed: R.fixed || !1,
            align: R.aligin || "left",
            showOverflowTooltip: (Q = R.show_overflow_tooltip) != null ? Q : !0
          }, {
            header: (D) => s.value[X].tool_content ? W("div", {
              style: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }
            }, [W("span", {
              class: "nowarp",
              title: R.label
            }, [D.column.label]), W(on, {
              placement: "bottom"
            }, {
              default: () => [W("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                width: "1.2em",
                height: "1.2em",
                viewBox: "0 0 256 256"
              }, [W("path", {
                fill: "currentColor",
                d: "M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24Zm0 168a12 12 0 1 1 12-12a12 12 0 0 1-12 12Zm8-48.72v.72a8 8 0 0 1-16 0v-8a8 8 0 0 1 8-8c13.23 0 24-9 24-20s-10.77-20-24-20s-24 9-24 20v4a8 8 0 0 1-16 0v-4c0-19.85 17.94-36 40-36s40 16.15 40 36c0 17.38-13.76 31.93-32 35.28Z"
              }, null)])],
              content: () => s.value[X].tool_content
            })]) : W("span", {
              class: "nowarp",
              title: R.label
            }, [D.column.label]),
            default: ({
              row: D,
              $index: U
            }) => R.render ? R.render(D, U) : W("span", null, [D[R.prop]])
          });
        }), (A = n.switch) == null ? void 0 : A.call(n), (y = n.operate) == null ? void 0 : y.call(n)];
      }
    })])])]);
  }
}), md = nr({
  props: {
    modelValue: {
      type: Array,
      required: !0
    },
    limit: {
      type: Number,
      default: 1
    },
    type: {
      type: String,
      default: "image"
    },
    accept: {
      type: String,
      default: ""
    },
    uploadFn: {
      type: Function,
      required: !0
    }
  },
  emits: ["update:modelValue", "change"],
  setup(e, {
    emit: t
  }) {
    const r = Zr(() => e.modelValue.map((l, o) => ({
      uid: o,
      name: l,
      status: "success",
      url: l
    }))), n = () => cn.error("\u8D85\u51FA\u6570\u91CF\u9650\u5236\uFF01\uFF01\uFF01"), a = (l, o) => {
      const u = o.map((h) => h.url);
      t("update:modelValue", u), t("change", u);
    }, i = async (l) => {
      if (l) {
        const o = await e.uploadFn(l.raw), u = [...r.value.filter((h) => h.status === "success").map((h) => h.url), o];
        t("update:modelValue", u), t("change", u);
      }
    }, s = (l) => {
      const o = e.modelValue.indexOf(l);
      ed({
        srcList: e.modelValue,
        index: o === -1 ? 0 : o
      });
    }, f = Zr(() => e.modelValue.length < e.limit ? "inline-flex" : "none"), c = "young-upload-" + Gt();
    return () => W("div", {
      id: c
    }, [W("style", null, [`
          #${c} .el-upload--picture-card {
            display: ${f.value};
          }
          `]), W(df, {
      accept: e.accept ? e.accept : e.type === "image" ? "image/*" : "*",
      limit: e.limit,
      listType: e.type === "image" ? "picture-card" : void 0,
      multiple: e.limit > 1,
      fileList: r.value,
      autoUpload: !1,
      onExceed: n,
      onChange: i,
      onRemove: a,
      onPreview: ({
        url: l
      }) => e.type === "image" && s(l),
      style: {
        maxWidth: "500px"
      }
    }, {
      default: () => [W("div", null, [e.modelValue.length < e.limit && e.type === "image" ? W("div", {
        style: {
          fontSize: "1.875rem",
          lineHeight: "2.25rem"
        }
      }, [W("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "1em",
        height: "1em",
        viewBox: "0 0 24 24"
      }, [W("path", {
        fill: "currentColor",
        d: "M18 12.998h-5v5a1 1 0 0 1-2 0v-5H6a1 1 0 0 1 0-2h5v-5a1 1 0 0 1 2 0v5h5a1 1 0 0 1 0 2z"
      }, null)])]) : e.modelValue.length < e.limit ? W("div", {
        style: {
          marginRight: "0.5rem"
        }
      }, [W(Qr, {
        type: "primary"
      }, {
        default: () => [or("\u4E0A\u4F20\u6587\u4EF6")]
      })]) : W("div", {
        style: {
          cursor: "not-allowed",
          pointerEvents: "none"
        }
      }, [or("\u5DF2\u8FBE\u6570\u91CF\u4E0A\u9650")])]), W("div", null, [or("("), e.modelValue.length, or(" / "), e.limit, or(")")])]
    })]);
  }
}), V0 = (e, t, r = 10, n = ue(!1)) => {
  const a = ue([]), i = ue(!1), s = ue(1), f = () => {
    const { stop: c } = gf(
      a.value[e.value.length - 1],
      ([{ isIntersecting: l }]) => {
        l && (i.value = l, c());
      }
    );
  };
  return _t(async () => {
    if (!n.value && i.value) {
      if (e.value.length === t.value.length)
        return;
      s.value++;
      const c = t.value.slice(r * (s.value - 1), r * s.value);
      if (c.length === 0)
        return;
      e.value.push(...c), i.value = !1, await Mr(), f();
    }
  }), {
    elArr: a,
    touchEndEl: i,
    page: s,
    load: f
  };
}, gd = (e, { addCbk: t, modCbk: r, delCbk: n, cpEffect: a, cgEffect: i, clearEffect: s, disableclear: f }, c = "\u786E\u8BA4\u5220\u9664\u8BE5\u6761\u6570\u636E\uFF1F") => {
  const l = ue(!1), o = ue(!1), u = ue(!1), h = ue(Qe(e)), d = ue(), g = async () => await new Promise((X) => {
    var Q;
    (Q = d.value) == null || Q.validate(async (D) => {
      D && X(!0);
    }).catch((D) => {
      X(!1);
    });
  }), x = () => {
    l.value = !1, o.value = !1, u.value = !1, s == null || s(), h.value = Qe(e);
  };
  return {
    isAdd: l,
    isEdit: o,
    isMore: u,
    clear: x,
    edit: async (R) => {
      const X = await (a == null ? void 0 : a(R));
      h.value = Qe(X || R), o.value = !0;
    },
    more: async (R) => {
      const X = await (a == null ? void 0 : a(R));
      h.value = Qe(X || R), u.value = !0;
    },
    form: h,
    del: (R) => {
      t0.confirm(c, "\u63D0\u793A", {
        confirmButtonText: "\u786E\u8BA4",
        cancelButtonText: "\u53D6\u6D88",
        type: "warning"
      }).then(async () => {
        await (n == null ? void 0 : n(R)), i == null || i();
      }).catch(() => null);
    },
    sure: async () => {
      if (l.value) {
        if (await (t == null ? void 0 : t()) === !1)
          return;
      } else if (await (r == null ? void 0 : r()) === !1)
        return;
      !f && x(), i == null || i();
    },
    formRef: d,
    validForm: g
  };
}, jf = Tf(",key,ref,innerHTML,textContent,ref_key,ref_for");
function $f(e, t) {
  let r = "";
  for (const n in e) {
    if (jf(n) || Af(n) || t === "textarea" && n === "value")
      continue;
    const a = e[n];
    n === "class" ? r += ` class="${Yf(a)}"` : n === "style" ? r += ` style="${qf(a)}"` : r += zf(n, a, t);
  }
  return r;
}
function zf(e, t, r) {
  if (!Kf(t))
    return "";
  const n = r && (r.indexOf("-") > 0 || yf(r)) ? e : Ff[e] || e.toLowerCase();
  return Cf(n) ? Of(t) ? ` ${n}` : "" : Df(n) ? t === "" ? ` ${n}` : ` ${n}="${Hr(t)}"` : (console.warn(`[@vue/server-renderer] Skipped rendering unsafe attribute name: ${n}`), "");
}
function Kf(e) {
  if (e == null)
    return !1;
  const t = typeof e;
  return t === "string" || t === "number" || t === "boolean";
}
function Yf(e) {
  return Hr(Rf(e));
}
function qf(e) {
  if (!e)
    return "";
  if (Tt(e))
    return Hr(e);
  const t = kf(e);
  return Hr(Nf(t));
}
function Jf(e, t) {
  throw new Error("On-the-fly template compilation is not supported in the ESM build of @vue/server-renderer. All templates must be pre-compiled into render functions.");
}
function Zf(e, t, r, n, a) {
  e("<!--teleport start-->");
  const i = a.appContext.provides[Pa], s = i.__teleportBuffers || (i.__teleportBuffers = {}), f = s[r] || (s[r] = []), c = f.length;
  let l;
  if (n)
    t(e), l = "<!--teleport anchor-->";
  else {
    const { getBuffer: o, push: u } = Ua();
    t(u), u("<!--teleport anchor-->"), l = o();
  }
  f.splice(c, 0, l), e("<!--teleport end-->");
}
const { createComponentInstance: Qf, setCurrentRenderingInstance: G0, setupComponent: el, renderComponentRoot: X0, normalizeVNode: rl } = La;
function Ua() {
  let e = !1;
  const t = [];
  return {
    getBuffer() {
      return t;
    },
    push(r) {
      const n = Tt(r);
      e && n ? t[t.length - 1] += r : t.push(r), e = n, (i0(r) || If(r) && r.hasAsync) && (t.hasAsync = !0);
    }
  };
}
function Ha(e, t = null, r) {
  const n = Qf(e, t, null), a = el(n, !0), i = i0(a), s = n.sp;
  if (i || s) {
    let f = i ? a : Promise.resolve();
    return s && (f = f.then(() => Promise.all(s.map((c) => c.call(n.proxy)))).catch(() => {
    })), f.then(() => j0(n, r));
  } else
    return j0(n, r);
}
function j0(e, t) {
  const r = e.type, { getBuffer: n, push: a } = Ua();
  if (Ef(r)) {
    let i = X0(e);
    if (!r.props)
      for (const s in e.attrs)
        s.startsWith("data-v-") && ((i.props || (i.props = {}))[s] = "");
    un(a, e.subTree = i, e, t);
  } else {
    (!e.render || e.render === H0) && !e.ssrRender && !r.ssrRender && Tt(r.template) && (r.ssrRender = Jf(r.template));
    for (const s of e.scope.effects)
      s.computed && (s.computed._cacheable = !0);
    const i = e.ssrRender || r.ssrRender;
    if (i) {
      let s = e.inheritAttrs !== !1 ? e.attrs : void 0, f = !1, c = e;
      for (; ; ) {
        const o = c.vnode.scopeId;
        o && (f || (s = { ...s }, f = !0), s[o] = "");
        const u = c.parent;
        if (u && u.subTree && u.subTree === c.vnode)
          c = u;
        else
          break;
      }
      t && (f || (s = { ...s }), s[t.trim()] = "");
      const l = G0(e);
      try {
        i(
          e.proxy,
          a,
          e,
          s,
          e.props,
          e.setupState,
          e.data,
          e.ctx
        );
      } finally {
        G0(l);
      }
    } else if (e.render && e.render !== H0)
      un(a, e.subTree = X0(e), e, t);
    else {
      const s = r.name || r.__file || "<Anonymous>";
      fn(`Component ${s} is missing template or render function.`), a("<!---->");
    }
  }
  return n();
}
function un(e, t, r, n) {
  const { type: a, shapeFlag: i, children: s } = t;
  switch (a) {
    case Ks:
      e(Hr(s));
      break;
    case zs:
      e(s ? `<!--${wf(s)}-->` : "<!---->");
      break;
    case $s:
      e(s);
      break;
    case Wr:
      t.slotScopeIds && (n = (n ? n + " " : "") + t.slotScopeIds.join(" ")), e("<!--[-->"), s0(e, s, r, n), e("<!--]-->");
      break;
    default:
      i & 1 ? tl(e, t, r, n) : i & 6 ? e(Ha(t, r, n)) : i & 64 ? al(e, t, r, n) : i & 128 ? un(e, t.ssContent, r, n) : fn("[@vue/server-renderer] Invalid VNode type:", a, `(${typeof a})`);
  }
}
function s0(e, t, r, n) {
  for (let a = 0; a < t.length; a++)
    un(e, rl(t[a]), r, n);
}
function tl(e, t, r, n) {
  const a = t.type;
  let { props: i, children: s, shapeFlag: f, scopeId: c, dirs: l } = t, o = `<${a}`;
  l && (i = nl(t, i, l)), i && (o += $f(i, a)), c && (o += ` ${c}`);
  let u = r, h = t;
  for (; u && h === u.subTree; )
    h = u.vnode, h.scopeId && (o += ` ${h.scopeId}`), u = u.parent;
  if (n && (o += ` ${n}`), e(o + ">"), !Sf(a)) {
    let d = !1;
    i && (i.innerHTML ? (d = !0, e(i.innerHTML)) : i.textContent ? (d = !0, e(Hr(i.textContent))) : a === "textarea" && i.value && (d = !0, e(Hr(i.value)))), d || (f & 8 ? e(Hr(s)) : f & 16 && s0(e, s, r, n)), e(`</${a}>`);
  }
}
function nl(e, t, r) {
  const n = [];
  for (let a = 0; a < r.length; a++) {
    const i = r[a], { dir: { getSSRProps: s } } = i;
    if (s) {
      const f = s(i, e);
      f && n.push(f);
    }
  }
  return Le(t || {}, ...n);
}
function al(e, t, r, n) {
  const a = t.props && t.props.to, i = t.props && t.props.disabled;
  if (!a)
    return i || fn("[@vue/server-renderer] Teleport is missing target prop."), [];
  if (!Tt(a))
    return fn("[@vue/server-renderer] Teleport target must be a query selector string."), [];
  Zf(e, (s) => {
    s0(s, t.children, r, n);
  }, a, i || i === "", r);
}
const { isVNode: il } = La;
async function f0(e) {
  if (e.hasAsync) {
    let t = "";
    for (let r = 0; r < e.length; r++) {
      let n = e[r];
      i0(n) && (n = await n), Tt(n) ? t += n : t += await f0(n);
    }
    return t;
  } else
    return Wa(e);
}
function Wa(e) {
  let t = "";
  for (let r = 0; r < e.length; r++) {
    let n = e[r];
    Tt(n) ? t += n : t += Wa(n);
  }
  return t;
}
async function Va(e, t = {}) {
  if (il(e))
    return Va(js({ render: () => e }), t);
  const r = W(e._component, e._props);
  r.appContext = e._context, e.provide(Pa, t);
  const n = await Ha(r), a = await f0(n);
  if (await sl(t), t.__watcherHandles)
    for (const i of t.__watcherHandles)
      i();
  return a;
}
async function sl(e) {
  if (e.__teleportBuffers) {
    e.teleports = e.teleports || {};
    for (const t in e.__teleportBuffers)
      e.teleports[t] = await f0(await Promise.all([e.__teleportBuffers[t]]));
  }
}
Xs();
var Ot = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, Ga = { exports: {} };
(function(e, t) {
  (function(r, n) {
    n();
  })(Ot, function() {
    function r(l, o) {
      return typeof o > "u" ? o = { autoBom: !1 } : typeof o != "object" && (console.warn("Deprecated: Expected third argument to be a object"), o = { autoBom: !o }), o.autoBom && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(l.type) ? new Blob(["\uFEFF", l], { type: l.type }) : l;
    }
    function n(l, o, u) {
      var h = new XMLHttpRequest();
      h.open("GET", l), h.responseType = "blob", h.onload = function() {
        c(h.response, o, u);
      }, h.onerror = function() {
        console.error("could not download file");
      }, h.send();
    }
    function a(l) {
      var o = new XMLHttpRequest();
      o.open("HEAD", l, !1);
      try {
        o.send();
      } catch {
      }
      return 200 <= o.status && 299 >= o.status;
    }
    function i(l) {
      try {
        l.dispatchEvent(new MouseEvent("click"));
      } catch {
        var o = document.createEvent("MouseEvents");
        o.initMouseEvent("click", !0, !0, window, 0, 0, 0, 80, 20, !1, !1, !1, !1, 0, null), l.dispatchEvent(o);
      }
    }
    var s = typeof window == "object" && window.window === window ? window : typeof self == "object" && self.self === self ? self : typeof Ot == "object" && Ot.global === Ot ? Ot : void 0, f = s.navigator && /Macintosh/.test(navigator.userAgent) && /AppleWebKit/.test(navigator.userAgent) && !/Safari/.test(navigator.userAgent), c = s.saveAs || (typeof window != "object" || window !== s ? function() {
    } : "download" in HTMLAnchorElement.prototype && !f ? function(l, o, u) {
      var h = s.URL || s.webkitURL, d = document.createElement("a");
      o = o || l.name || "download", d.download = o, d.rel = "noopener", typeof l == "string" ? (d.href = l, d.origin === location.origin ? i(d) : a(d.href) ? n(l, o, u) : i(d, d.target = "_blank")) : (d.href = h.createObjectURL(l), setTimeout(function() {
        h.revokeObjectURL(d.href);
      }, 4e4), setTimeout(function() {
        i(d);
      }, 0));
    } : "msSaveOrOpenBlob" in navigator ? function(l, o, u) {
      if (o = o || l.name || "download", typeof l != "string")
        navigator.msSaveOrOpenBlob(r(l, u), o);
      else if (a(l))
        n(l, o, u);
      else {
        var h = document.createElement("a");
        h.href = l, h.target = "_blank", setTimeout(function() {
          i(h);
        });
      }
    } : function(l, o, u, h) {
      if (h = h || open("", "_blank"), h && (h.document.title = h.document.body.innerText = "downloading..."), typeof l == "string")
        return n(l, o, u);
      var d = l.type === "application/octet-stream", g = /constructor/i.test(s.HTMLElement) || s.safari, x = /CriOS\/[\d]+/.test(navigator.userAgent);
      if ((x || d && g || f) && typeof FileReader < "u") {
        var m = new FileReader();
        m.onloadend = function() {
          var y = m.result;
          y = x ? y : y.replace(/^data:[^;]*;/, "data:attachment/file;"), h ? h.location.href = y : location = y, h = null;
        }, m.readAsDataURL(l);
      } else {
        var O = s.URL || s.webkitURL, A = O.createObjectURL(l);
        h ? h.location = A : location.href = A, h = null, setTimeout(function() {
          O.revokeObjectURL(A);
        }, 4e4);
      }
    });
    s.saveAs = c.saveAs = c, e.exports = c;
  });
})(Ga);
/*! xlsx.js (C) 2013-present SheetJS -- http://sheetjs.com */
var hn = {};
hn.version = "0.18.5";
var Xa = 1252, fl = [874, 932, 936, 949, 950, 1250, 1251, 1252, 1253, 1254, 1255, 1256, 1257, 1258, 1e4], ja = function(e) {
  fl.indexOf(e) != -1 && (Xa = e);
};
function ll() {
  ja(1252);
}
var Mt = function(e) {
  ja(e);
};
function ol() {
  Mt(1200), ll();
}
function cl(e) {
  for (var t = [], r = 0; r < e.length >> 1; ++r)
    t[r] = String.fromCharCode(e.charCodeAt(2 * r + 1) + (e.charCodeAt(2 * r) << 8));
  return t.join("");
}
var Zt = function(t) {
  return String.fromCharCode(t);
}, $0 = function(t) {
  return String.fromCharCode(t);
}, Yr, br = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
function bt(e) {
  for (var t = "", r = 0, n = 0, a = 0, i = 0, s = 0, f = 0, c = 0, l = 0; l < e.length; )
    r = e.charCodeAt(l++), i = r >> 2, n = e.charCodeAt(l++), s = (r & 3) << 4 | n >> 4, a = e.charCodeAt(l++), f = (n & 15) << 2 | a >> 6, c = a & 63, isNaN(n) ? f = c = 64 : isNaN(a) && (c = 64), t += br.charAt(i) + br.charAt(s) + br.charAt(f) + br.charAt(c);
  return t;
}
function Ir(e) {
  var t = "", r = 0, n = 0, a = 0, i = 0, s = 0, f = 0, c = 0;
  e = e.replace(/[^\w\+\/\=]/g, "");
  for (var l = 0; l < e.length; )
    i = br.indexOf(e.charAt(l++)), s = br.indexOf(e.charAt(l++)), r = i << 2 | s >> 4, t += String.fromCharCode(r), f = br.indexOf(e.charAt(l++)), n = (s & 15) << 4 | f >> 2, f !== 64 && (t += String.fromCharCode(n)), c = br.indexOf(e.charAt(l++)), a = (f & 3) << 6 | c, c !== 64 && (t += String.fromCharCode(a));
  return t;
}
var de = /* @__PURE__ */ function() {
  return typeof Buffer < "u" && typeof process < "u" && typeof process.versions < "u" && !!process.versions.node;
}(), Lr = /* @__PURE__ */ function() {
  if (typeof Buffer < "u") {
    var e = !Buffer.from;
    if (!e)
      try {
        Buffer.from("foo", "utf8");
      } catch {
        e = !0;
      }
    return e ? function(t, r) {
      return r ? new Buffer(t, r) : new Buffer(t);
    } : Buffer.from.bind(Buffer);
  }
  return function() {
  };
}();
function et(e) {
  return de ? Buffer.alloc ? Buffer.alloc(e) : new Buffer(e) : typeof Uint8Array < "u" ? new Uint8Array(e) : new Array(e);
}
function z0(e) {
  return de ? Buffer.allocUnsafe ? Buffer.allocUnsafe(e) : new Buffer(e) : typeof Uint8Array < "u" ? new Uint8Array(e) : new Array(e);
}
var _r = function(t) {
  return de ? Lr(t, "binary") : t.split("").map(function(r) {
    return r.charCodeAt(0) & 255;
  });
};
function Cn(e) {
  if (typeof ArrayBuffer > "u")
    return _r(e);
  for (var t = new ArrayBuffer(e.length), r = new Uint8Array(t), n = 0; n != e.length; ++n)
    r[n] = e.charCodeAt(n) & 255;
  return t;
}
function Xt(e) {
  if (Array.isArray(e))
    return e.map(function(n) {
      return String.fromCharCode(n);
    }).join("");
  for (var t = [], r = 0; r < e.length; ++r)
    t[r] = String.fromCharCode(e[r]);
  return t.join("");
}
function ul(e) {
  if (typeof Uint8Array > "u")
    throw new Error("Unsupported");
  return new Uint8Array(e);
}
var Ve = de ? function(e) {
  return Buffer.concat(e.map(function(t) {
    return Buffer.isBuffer(t) ? t : Lr(t);
  }));
} : function(e) {
  if (typeof Uint8Array < "u") {
    var t = 0, r = 0;
    for (t = 0; t < e.length; ++t)
      r += e[t].length;
    var n = new Uint8Array(r), a = 0;
    for (t = 0, r = 0; t < e.length; r += a, ++t)
      if (a = e[t].length, e[t] instanceof Uint8Array)
        n.set(e[t], r);
      else {
        if (typeof e[t] == "string")
          throw "wtf";
        n.set(new Uint8Array(e[t]), r);
      }
    return n;
  }
  return [].concat.apply([], e.map(function(i) {
    return Array.isArray(i) ? i : [].slice.call(i);
  }));
};
function hl(e) {
  for (var t = [], r = 0, n = e.length + 250, a = et(e.length + 255), i = 0; i < e.length; ++i) {
    var s = e.charCodeAt(i);
    if (s < 128)
      a[r++] = s;
    else if (s < 2048)
      a[r++] = 192 | s >> 6 & 31, a[r++] = 128 | s & 63;
    else if (s >= 55296 && s < 57344) {
      s = (s & 1023) + 64;
      var f = e.charCodeAt(++i) & 1023;
      a[r++] = 240 | s >> 8 & 7, a[r++] = 128 | s >> 2 & 63, a[r++] = 128 | f >> 6 & 15 | (s & 3) << 4, a[r++] = 128 | f & 63;
    } else
      a[r++] = 224 | s >> 12 & 15, a[r++] = 128 | s >> 6 & 63, a[r++] = 128 | s & 63;
    r > n && (t.push(a.slice(0, r)), r = 0, a = et(65535), n = 65530);
  }
  return t.push(a.slice(0, r)), Ve(t);
}
var kt = /\u0000/g, Qt = /[\u0001-\u0006]/g;
function dt(e) {
  for (var t = "", r = e.length - 1; r >= 0; )
    t += e.charAt(r--);
  return t;
}
function Tr(e, t) {
  var r = "" + e;
  return r.length >= t ? r : Ce("0", t - r.length) + r;
}
function l0(e, t) {
  var r = "" + e;
  return r.length >= t ? r : Ce(" ", t - r.length) + r;
}
function xn(e, t) {
  var r = "" + e;
  return r.length >= t ? r : r + Ce(" ", t - r.length);
}
function xl(e, t) {
  var r = "" + Math.round(e);
  return r.length >= t ? r : Ce("0", t - r.length) + r;
}
function dl(e, t) {
  var r = "" + e;
  return r.length >= t ? r : Ce("0", t - r.length) + r;
}
var K0 = /* @__PURE__ */ Math.pow(2, 32);
function ot(e, t) {
  if (e > K0 || e < -K0)
    return xl(e, t);
  var r = Math.round(e);
  return dl(r, t);
}
function dn(e, t) {
  return t = t || 0, e.length >= 7 + t && (e.charCodeAt(t) | 32) === 103 && (e.charCodeAt(t + 1) | 32) === 101 && (e.charCodeAt(t + 2) | 32) === 110 && (e.charCodeAt(t + 3) | 32) === 101 && (e.charCodeAt(t + 4) | 32) === 114 && (e.charCodeAt(t + 5) | 32) === 97 && (e.charCodeAt(t + 6) | 32) === 108;
}
var Y0 = [
  ["Sun", "Sunday"],
  ["Mon", "Monday"],
  ["Tue", "Tuesday"],
  ["Wed", "Wednesday"],
  ["Thu", "Thursday"],
  ["Fri", "Friday"],
  ["Sat", "Saturday"]
], Vn = [
  ["J", "Jan", "January"],
  ["F", "Feb", "February"],
  ["M", "Mar", "March"],
  ["A", "Apr", "April"],
  ["M", "May", "May"],
  ["J", "Jun", "June"],
  ["J", "Jul", "July"],
  ["A", "Aug", "August"],
  ["S", "Sep", "September"],
  ["O", "Oct", "October"],
  ["N", "Nov", "November"],
  ["D", "Dec", "December"]
];
function pl(e) {
  return e || (e = {}), e[0] = "General", e[1] = "0", e[2] = "0.00", e[3] = "#,##0", e[4] = "#,##0.00", e[9] = "0%", e[10] = "0.00%", e[11] = "0.00E+00", e[12] = "# ?/?", e[13] = "# ??/??", e[14] = "m/d/yy", e[15] = "d-mmm-yy", e[16] = "d-mmm", e[17] = "mmm-yy", e[18] = "h:mm AM/PM", e[19] = "h:mm:ss AM/PM", e[20] = "h:mm", e[21] = "h:mm:ss", e[22] = "m/d/yy h:mm", e[37] = "#,##0 ;(#,##0)", e[38] = "#,##0 ;[Red](#,##0)", e[39] = "#,##0.00;(#,##0.00)", e[40] = "#,##0.00;[Red](#,##0.00)", e[45] = "mm:ss", e[46] = "[h]:mm:ss", e[47] = "mmss.0", e[48] = "##0.0E+0", e[49] = "@", e[56] = '"\u4E0A\u5348/\u4E0B\u5348 "hh"\u6642"mm"\u5206"ss"\u79D2 "', e;
}
var Oe = {
  0: "General",
  1: "0",
  2: "0.00",
  3: "#,##0",
  4: "#,##0.00",
  9: "0%",
  10: "0.00%",
  11: "0.00E+00",
  12: "# ?/?",
  13: "# ??/??",
  14: "m/d/yy",
  15: "d-mmm-yy",
  16: "d-mmm",
  17: "mmm-yy",
  18: "h:mm AM/PM",
  19: "h:mm:ss AM/PM",
  20: "h:mm",
  21: "h:mm:ss",
  22: "m/d/yy h:mm",
  37: "#,##0 ;(#,##0)",
  38: "#,##0 ;[Red](#,##0)",
  39: "#,##0.00;(#,##0.00)",
  40: "#,##0.00;[Red](#,##0.00)",
  45: "mm:ss",
  46: "[h]:mm:ss",
  47: "mmss.0",
  48: "##0.0E+0",
  49: "@",
  56: '"\u4E0A\u5348/\u4E0B\u5348 "hh"\u6642"mm"\u5206"ss"\u79D2 "'
}, q0 = {
  5: 37,
  6: 38,
  7: 39,
  8: 40,
  23: 0,
  24: 0,
  25: 0,
  26: 0,
  27: 14,
  28: 14,
  29: 14,
  30: 14,
  31: 14,
  50: 14,
  51: 14,
  52: 14,
  53: 14,
  54: 14,
  55: 14,
  56: 14,
  57: 14,
  58: 14,
  59: 1,
  60: 2,
  61: 3,
  62: 4,
  67: 9,
  68: 10,
  69: 12,
  70: 13,
  71: 14,
  72: 14,
  73: 15,
  74: 16,
  75: 17,
  76: 20,
  77: 21,
  78: 22,
  79: 45,
  80: 46,
  81: 47,
  82: 0
}, vl = {
  5: '"$"#,##0_);\\("$"#,##0\\)',
  63: '"$"#,##0_);\\("$"#,##0\\)',
  6: '"$"#,##0_);[Red]\\("$"#,##0\\)',
  64: '"$"#,##0_);[Red]\\("$"#,##0\\)',
  7: '"$"#,##0.00_);\\("$"#,##0.00\\)',
  65: '"$"#,##0.00_);\\("$"#,##0.00\\)',
  8: '"$"#,##0.00_);[Red]\\("$"#,##0.00\\)',
  66: '"$"#,##0.00_);[Red]\\("$"#,##0.00\\)',
  41: '_(* #,##0_);_(* \\(#,##0\\);_(* "-"_);_(@_)',
  42: '_("$"* #,##0_);_("$"* \\(#,##0\\);_("$"* "-"_);_(@_)',
  43: '_(* #,##0.00_);_(* \\(#,##0.00\\);_(* "-"??_);_(@_)',
  44: '_("$"* #,##0.00_);_("$"* \\(#,##0.00\\);_("$"* "-"??_);_(@_)'
};
function pn(e, t, r) {
  for (var n = e < 0 ? -1 : 1, a = e * n, i = 0, s = 1, f = 0, c = 1, l = 0, o = 0, u = Math.floor(a); l < t && (u = Math.floor(a), f = u * s + i, o = u * l + c, !(a - u < 5e-8)); )
    a = 1 / (a - u), i = s, s = f, c = l, l = o;
  if (o > t && (l > t ? (o = c, f = i) : (o = l, f = s)), !r)
    return [0, n * f, o];
  var h = Math.floor(n * f / o);
  return [h, n * f - h * o, o];
}
function en(e, t, r) {
  if (e > 2958465 || e < 0)
    return null;
  var n = e | 0, a = Math.floor(86400 * (e - n)), i = 0, s = [], f = { D: n, T: a, u: 86400 * (e - n) - a, y: 0, m: 0, d: 0, H: 0, M: 0, S: 0, q: 0 };
  if (Math.abs(f.u) < 1e-6 && (f.u = 0), t && t.date1904 && (n += 1462), f.u > 0.9999 && (f.u = 0, ++a == 86400 && (f.T = a = 0, ++n, ++f.D)), n === 60)
    s = r ? [1317, 10, 29] : [1900, 2, 29], i = 3;
  else if (n === 0)
    s = r ? [1317, 8, 29] : [1900, 1, 0], i = 6;
  else {
    n > 60 && --n;
    var c = new Date(1900, 0, 1);
    c.setDate(c.getDate() + n - 1), s = [c.getFullYear(), c.getMonth() + 1, c.getDate()], i = c.getDay(), n < 60 && (i = (i + 6) % 7), r && (i = Sl(c, s));
  }
  return f.y = s[0], f.m = s[1], f.d = s[2], f.S = a % 60, a = Math.floor(a / 60), f.M = a % 60, a = Math.floor(a / 60), f.H = a, f.q = i, f;
}
var $a = /* @__PURE__ */ new Date(1899, 11, 31, 0, 0, 0), ml = /* @__PURE__ */ $a.getTime(), gl = /* @__PURE__ */ new Date(1900, 2, 1, 0, 0, 0);
function za(e, t) {
  var r = /* @__PURE__ */ e.getTime();
  return t ? r -= 1461 * 24 * 60 * 60 * 1e3 : e >= gl && (r += 24 * 60 * 60 * 1e3), (r - (ml + (/* @__PURE__ */ e.getTimezoneOffset() - /* @__PURE__ */ $a.getTimezoneOffset()) * 6e4)) / (24 * 60 * 60 * 1e3);
}
function o0(e) {
  return e.indexOf(".") == -1 ? e : e.replace(/(?:\.0*|(\.\d*[1-9])0+)$/, "$1");
}
function _l(e) {
  return e.indexOf("E") == -1 ? e : e.replace(/(?:\.0*|(\.\d*[1-9])0+)[Ee]/, "$1E").replace(/(E[+-])(\d)$/, "$10$2");
}
function Tl(e) {
  var t = e < 0 ? 12 : 11, r = o0(e.toFixed(12));
  return r.length <= t || (r = e.toPrecision(10), r.length <= t) ? r : e.toExponential(5);
}
function El(e) {
  var t = o0(e.toFixed(11));
  return t.length > (e < 0 ? 12 : 11) || t === "0" || t === "-0" ? e.toPrecision(6) : t;
}
function wl(e) {
  var t = Math.floor(Math.log(Math.abs(e)) * Math.LOG10E), r;
  return t >= -4 && t <= -1 ? r = e.toPrecision(10 + t) : Math.abs(t) <= 9 ? r = Tl(e) : t === 10 ? r = e.toFixed(10).substr(0, 12) : r = El(e), o0(_l(r.toUpperCase()));
}
function Jn(e, t) {
  switch (typeof e) {
    case "string":
      return e;
    case "boolean":
      return e ? "TRUE" : "FALSE";
    case "number":
      return (e | 0) === e ? e.toString(10) : wl(e);
    case "undefined":
      return "";
    case "object":
      if (e == null)
        return "";
      if (e instanceof Date)
        return Vr(14, za(e, t && t.date1904), t);
  }
  throw new Error("unsupported value in General format: " + e);
}
function Sl(e, t) {
  t[0] -= 581;
  var r = e.getDay();
  return e < 60 && (r = (r + 6) % 7), r;
}
function Al(e, t, r, n) {
  var a = "", i = 0, s = 0, f = r.y, c, l = 0;
  switch (e) {
    case 98:
      f = r.y + 543;
    case 121:
      switch (t.length) {
        case 1:
        case 2:
          c = f % 100, l = 2;
          break;
        default:
          c = f % 1e4, l = 4;
          break;
      }
      break;
    case 109:
      switch (t.length) {
        case 1:
        case 2:
          c = r.m, l = t.length;
          break;
        case 3:
          return Vn[r.m - 1][1];
        case 5:
          return Vn[r.m - 1][0];
        default:
          return Vn[r.m - 1][2];
      }
      break;
    case 100:
      switch (t.length) {
        case 1:
        case 2:
          c = r.d, l = t.length;
          break;
        case 3:
          return Y0[r.q][0];
        default:
          return Y0[r.q][1];
      }
      break;
    case 104:
      switch (t.length) {
        case 1:
        case 2:
          c = 1 + (r.H + 11) % 12, l = t.length;
          break;
        default:
          throw "bad hour format: " + t;
      }
      break;
    case 72:
      switch (t.length) {
        case 1:
        case 2:
          c = r.H, l = t.length;
          break;
        default:
          throw "bad hour format: " + t;
      }
      break;
    case 77:
      switch (t.length) {
        case 1:
        case 2:
          c = r.M, l = t.length;
          break;
        default:
          throw "bad minute format: " + t;
      }
      break;
    case 115:
      if (t != "s" && t != "ss" && t != ".0" && t != ".00" && t != ".000")
        throw "bad second format: " + t;
      return r.u === 0 && (t == "s" || t == "ss") ? Tr(r.S, t.length) : (n >= 2 ? s = n === 3 ? 1e3 : 100 : s = n === 1 ? 10 : 1, i = Math.round(s * (r.S + r.u)), i >= 60 * s && (i = 0), t === "s" ? i === 0 ? "0" : "" + i / s : (a = Tr(i, 2 + n), t === "ss" ? a.substr(0, 2) : "." + a.substr(2, t.length - 1)));
    case 90:
      switch (t) {
        case "[h]":
        case "[hh]":
          c = r.D * 24 + r.H;
          break;
        case "[m]":
        case "[mm]":
          c = (r.D * 24 + r.H) * 60 + r.M;
          break;
        case "[s]":
        case "[ss]":
          c = ((r.D * 24 + r.H) * 60 + r.M) * 60 + Math.round(r.S + r.u);
          break;
        default:
          throw "bad abstime format: " + t;
      }
      l = t.length === 3 ? 1 : 2;
      break;
    case 101:
      c = f, l = 1;
      break;
  }
  var o = l > 0 ? Tr(c, l) : "";
  return o;
}
function Ur(e) {
  var t = 3;
  if (e.length <= t)
    return e;
  for (var r = e.length % t, n = e.substr(0, r); r != e.length; r += t)
    n += (n.length > 0 ? "," : "") + e.substr(r, t);
  return n;
}
var Ka = /%/g;
function yl(e, t, r) {
  var n = t.replace(Ka, ""), a = t.length - n.length;
  return Rr(e, n, r * Math.pow(10, 2 * a)) + Ce("%", a);
}
function Fl(e, t, r) {
  for (var n = t.length - 1; t.charCodeAt(n - 1) === 44; )
    --n;
  return Rr(e, t.substr(0, n), r / Math.pow(10, 3 * (t.length - n)));
}
function Ya(e, t) {
  var r, n = e.indexOf("E") - e.indexOf(".") - 1;
  if (e.match(/^#+0.0E\+0$/)) {
    if (t == 0)
      return "0.0E+0";
    if (t < 0)
      return "-" + Ya(e, -t);
    var a = e.indexOf(".");
    a === -1 && (a = e.indexOf("E"));
    var i = Math.floor(Math.log(t) * Math.LOG10E) % a;
    if (i < 0 && (i += a), r = (t / Math.pow(10, i)).toPrecision(n + 1 + (a + i) % a), r.indexOf("e") === -1) {
      var s = Math.floor(Math.log(t) * Math.LOG10E);
      for (r.indexOf(".") === -1 ? r = r.charAt(0) + "." + r.substr(1) + "E+" + (s - r.length + i) : r += "E+" + (s - i); r.substr(0, 2) === "0."; )
        r = r.charAt(0) + r.substr(2, a) + "." + r.substr(2 + a), r = r.replace(/^0+([1-9])/, "$1").replace(/^0+\./, "0.");
      r = r.replace(/\+-/, "-");
    }
    r = r.replace(/^([+-]?)(\d*)\.(\d*)[Ee]/, function(f, c, l, o) {
      return c + l + o.substr(0, (a + i) % a) + "." + o.substr(i) + "E";
    });
  } else
    r = t.toExponential(n);
  return e.match(/E\+00$/) && r.match(/e[+-]\d$/) && (r = r.substr(0, r.length - 1) + "0" + r.charAt(r.length - 1)), e.match(/E\-/) && r.match(/e\+/) && (r = r.replace(/e\+/, "e")), r.replace("e", "E");
}
var qa = /# (\?+)( ?)\/( ?)(\d+)/;
function Cl(e, t, r) {
  var n = parseInt(e[4], 10), a = Math.round(t * n), i = Math.floor(a / n), s = a - i * n, f = n;
  return r + (i === 0 ? "" : "" + i) + " " + (s === 0 ? Ce(" ", e[1].length + 1 + e[4].length) : l0(s, e[1].length) + e[2] + "/" + e[3] + Tr(f, e[4].length));
}
function Ol(e, t, r) {
  return r + (t === 0 ? "" : "" + t) + Ce(" ", e[1].length + 2 + e[4].length);
}
var Ja = /^#*0*\.([0#]+)/, Za = /\).*[0#]/, Qa = /\(###\) ###\\?-####/;
function qe(e) {
  for (var t = "", r, n = 0; n != e.length; ++n)
    switch (r = e.charCodeAt(n)) {
      case 35:
        break;
      case 63:
        t += " ";
        break;
      case 48:
        t += "0";
        break;
      default:
        t += String.fromCharCode(r);
    }
  return t;
}
function J0(e, t) {
  var r = Math.pow(10, t);
  return "" + Math.round(e * r) / r;
}
function Z0(e, t) {
  var r = e - Math.floor(e), n = Math.pow(10, t);
  return t < ("" + Math.round(r * n)).length ? 0 : Math.round(r * n);
}
function Dl(e, t) {
  return t < ("" + Math.round((e - Math.floor(e)) * Math.pow(10, t))).length ? 1 : 0;
}
function Rl(e) {
  return e < 2147483647 && e > -2147483648 ? "" + (e >= 0 ? e | 0 : e - 1 | 0) : "" + Math.floor(e);
}
function xr(e, t, r) {
  if (e.charCodeAt(0) === 40 && !t.match(Za)) {
    var n = t.replace(/\( */, "").replace(/ \)/, "").replace(/\)/, "");
    return r >= 0 ? xr("n", n, r) : "(" + xr("n", n, -r) + ")";
  }
  if (t.charCodeAt(t.length - 1) === 44)
    return Fl(e, t, r);
  if (t.indexOf("%") !== -1)
    return yl(e, t, r);
  if (t.indexOf("E") !== -1)
    return Ya(t, r);
  if (t.charCodeAt(0) === 36)
    return "$" + xr(e, t.substr(t.charAt(1) == " " ? 2 : 1), r);
  var a, i, s, f, c = Math.abs(r), l = r < 0 ? "-" : "";
  if (t.match(/^00+$/))
    return l + ot(c, t.length);
  if (t.match(/^[#?]+$/))
    return a = ot(r, 0), a === "0" && (a = ""), a.length > t.length ? a : qe(t.substr(0, t.length - a.length)) + a;
  if (i = t.match(qa))
    return Cl(i, c, l);
  if (t.match(/^#+0+$/))
    return l + ot(c, t.length - t.indexOf("0"));
  if (i = t.match(Ja))
    return a = J0(r, i[1].length).replace(/^([^\.]+)$/, "$1." + qe(i[1])).replace(/\.$/, "." + qe(i[1])).replace(/\.(\d*)$/, function(g, x) {
      return "." + x + Ce("0", qe(i[1]).length - x.length);
    }), t.indexOf("0.") !== -1 ? a : a.replace(/^0\./, ".");
  if (t = t.replace(/^#+([0.])/, "$1"), i = t.match(/^(0*)\.(#*)$/))
    return l + J0(c, i[2].length).replace(/\.(\d*[1-9])0*$/, ".$1").replace(/^(-?\d*)$/, "$1.").replace(/^0\./, i[1].length ? "0." : ".");
  if (i = t.match(/^#{1,3},##0(\.?)$/))
    return l + Ur(ot(c, 0));
  if (i = t.match(/^#,##0\.([#0]*0)$/))
    return r < 0 ? "-" + xr(e, t, -r) : Ur("" + (Math.floor(r) + Dl(r, i[1].length))) + "." + Tr(Z0(r, i[1].length), i[1].length);
  if (i = t.match(/^#,#*,#0/))
    return xr(e, t.replace(/^#,#*,/, ""), r);
  if (i = t.match(/^([0#]+)(\\?-([0#]+))+$/))
    return a = dt(xr(e, t.replace(/[\\-]/g, ""), r)), s = 0, dt(dt(t.replace(/\\/g, "")).replace(/[0#]/g, function(g) {
      return s < a.length ? a.charAt(s++) : g === "0" ? "0" : "";
    }));
  if (t.match(Qa))
    return a = xr(e, "##########", r), "(" + a.substr(0, 3) + ") " + a.substr(3, 3) + "-" + a.substr(6);
  var o = "";
  if (i = t.match(/^([#0?]+)( ?)\/( ?)([#0?]+)/))
    return s = Math.min(i[4].length, 7), f = pn(c, Math.pow(10, s) - 1, !1), a = "" + l, o = Rr("n", i[1], f[1]), o.charAt(o.length - 1) == " " && (o = o.substr(0, o.length - 1) + "0"), a += o + i[2] + "/" + i[3], o = xn(f[2], s), o.length < i[4].length && (o = qe(i[4].substr(i[4].length - o.length)) + o), a += o, a;
  if (i = t.match(/^# ([#0?]+)( ?)\/( ?)([#0?]+)/))
    return s = Math.min(Math.max(i[1].length, i[4].length), 7), f = pn(c, Math.pow(10, s) - 1, !0), l + (f[0] || (f[1] ? "" : "0")) + " " + (f[1] ? l0(f[1], s) + i[2] + "/" + i[3] + xn(f[2], s) : Ce(" ", 2 * s + 1 + i[2].length + i[3].length));
  if (i = t.match(/^[#0?]+$/))
    return a = ot(r, 0), t.length <= a.length ? a : qe(t.substr(0, t.length - a.length)) + a;
  if (i = t.match(/^([#0?]+)\.([#0]+)$/)) {
    a = "" + r.toFixed(Math.min(i[2].length, 10)).replace(/([^0])0+$/, "$1"), s = a.indexOf(".");
    var u = t.indexOf(".") - s, h = t.length - a.length - u;
    return qe(t.substr(0, u) + a + t.substr(t.length - h));
  }
  if (i = t.match(/^00,000\.([#0]*0)$/))
    return s = Z0(r, i[1].length), r < 0 ? "-" + xr(e, t, -r) : Ur(Rl(r)).replace(/^\d,\d{3}$/, "0$&").replace(/^\d*$/, function(g) {
      return "00," + (g.length < 3 ? Tr(0, 3 - g.length) : "") + g;
    }) + "." + Tr(s, i[1].length);
  switch (t) {
    case "###,##0.00":
      return xr(e, "#,##0.00", r);
    case "###,###":
    case "##,###":
    case "#,###":
      var d = Ur(ot(c, 0));
      return d !== "0" ? l + d : "";
    case "###,###.00":
      return xr(e, "###,##0.00", r).replace(/^0\./, ".");
    case "#,###.00":
      return xr(e, "#,##0.00", r).replace(/^0\./, ".");
  }
  throw new Error("unsupported format |" + t + "|");
}
function kl(e, t, r) {
  for (var n = t.length - 1; t.charCodeAt(n - 1) === 44; )
    --n;
  return Rr(e, t.substr(0, n), r / Math.pow(10, 3 * (t.length - n)));
}
function Nl(e, t, r) {
  var n = t.replace(Ka, ""), a = t.length - n.length;
  return Rr(e, n, r * Math.pow(10, 2 * a)) + Ce("%", a);
}
function ei(e, t) {
  var r, n = e.indexOf("E") - e.indexOf(".") - 1;
  if (e.match(/^#+0.0E\+0$/)) {
    if (t == 0)
      return "0.0E+0";
    if (t < 0)
      return "-" + ei(e, -t);
    var a = e.indexOf(".");
    a === -1 && (a = e.indexOf("E"));
    var i = Math.floor(Math.log(t) * Math.LOG10E) % a;
    if (i < 0 && (i += a), r = (t / Math.pow(10, i)).toPrecision(n + 1 + (a + i) % a), !r.match(/[Ee]/)) {
      var s = Math.floor(Math.log(t) * Math.LOG10E);
      r.indexOf(".") === -1 ? r = r.charAt(0) + "." + r.substr(1) + "E+" + (s - r.length + i) : r += "E+" + (s - i), r = r.replace(/\+-/, "-");
    }
    r = r.replace(/^([+-]?)(\d*)\.(\d*)[Ee]/, function(f, c, l, o) {
      return c + l + o.substr(0, (a + i) % a) + "." + o.substr(i) + "E";
    });
  } else
    r = t.toExponential(n);
  return e.match(/E\+00$/) && r.match(/e[+-]\d$/) && (r = r.substr(0, r.length - 1) + "0" + r.charAt(r.length - 1)), e.match(/E\-/) && r.match(/e\+/) && (r = r.replace(/e\+/, "e")), r.replace("e", "E");
}
function Sr(e, t, r) {
  if (e.charCodeAt(0) === 40 && !t.match(Za)) {
    var n = t.replace(/\( */, "").replace(/ \)/, "").replace(/\)/, "");
    return r >= 0 ? Sr("n", n, r) : "(" + Sr("n", n, -r) + ")";
  }
  if (t.charCodeAt(t.length - 1) === 44)
    return kl(e, t, r);
  if (t.indexOf("%") !== -1)
    return Nl(e, t, r);
  if (t.indexOf("E") !== -1)
    return ei(t, r);
  if (t.charCodeAt(0) === 36)
    return "$" + Sr(e, t.substr(t.charAt(1) == " " ? 2 : 1), r);
  var a, i, s, f, c = Math.abs(r), l = r < 0 ? "-" : "";
  if (t.match(/^00+$/))
    return l + Tr(c, t.length);
  if (t.match(/^[#?]+$/))
    return a = "" + r, r === 0 && (a = ""), a.length > t.length ? a : qe(t.substr(0, t.length - a.length)) + a;
  if (i = t.match(qa))
    return Ol(i, c, l);
  if (t.match(/^#+0+$/))
    return l + Tr(c, t.length - t.indexOf("0"));
  if (i = t.match(Ja))
    return a = ("" + r).replace(/^([^\.]+)$/, "$1." + qe(i[1])).replace(/\.$/, "." + qe(i[1])), a = a.replace(/\.(\d*)$/, function(g, x) {
      return "." + x + Ce("0", qe(i[1]).length - x.length);
    }), t.indexOf("0.") !== -1 ? a : a.replace(/^0\./, ".");
  if (t = t.replace(/^#+([0.])/, "$1"), i = t.match(/^(0*)\.(#*)$/))
    return l + ("" + c).replace(/\.(\d*[1-9])0*$/, ".$1").replace(/^(-?\d*)$/, "$1.").replace(/^0\./, i[1].length ? "0." : ".");
  if (i = t.match(/^#{1,3},##0(\.?)$/))
    return l + Ur("" + c);
  if (i = t.match(/^#,##0\.([#0]*0)$/))
    return r < 0 ? "-" + Sr(e, t, -r) : Ur("" + r) + "." + Ce("0", i[1].length);
  if (i = t.match(/^#,#*,#0/))
    return Sr(e, t.replace(/^#,#*,/, ""), r);
  if (i = t.match(/^([0#]+)(\\?-([0#]+))+$/))
    return a = dt(Sr(e, t.replace(/[\\-]/g, ""), r)), s = 0, dt(dt(t.replace(/\\/g, "")).replace(/[0#]/g, function(g) {
      return s < a.length ? a.charAt(s++) : g === "0" ? "0" : "";
    }));
  if (t.match(Qa))
    return a = Sr(e, "##########", r), "(" + a.substr(0, 3) + ") " + a.substr(3, 3) + "-" + a.substr(6);
  var o = "";
  if (i = t.match(/^([#0?]+)( ?)\/( ?)([#0?]+)/))
    return s = Math.min(i[4].length, 7), f = pn(c, Math.pow(10, s) - 1, !1), a = "" + l, o = Rr("n", i[1], f[1]), o.charAt(o.length - 1) == " " && (o = o.substr(0, o.length - 1) + "0"), a += o + i[2] + "/" + i[3], o = xn(f[2], s), o.length < i[4].length && (o = qe(i[4].substr(i[4].length - o.length)) + o), a += o, a;
  if (i = t.match(/^# ([#0?]+)( ?)\/( ?)([#0?]+)/))
    return s = Math.min(Math.max(i[1].length, i[4].length), 7), f = pn(c, Math.pow(10, s) - 1, !0), l + (f[0] || (f[1] ? "" : "0")) + " " + (f[1] ? l0(f[1], s) + i[2] + "/" + i[3] + xn(f[2], s) : Ce(" ", 2 * s + 1 + i[2].length + i[3].length));
  if (i = t.match(/^[#0?]+$/))
    return a = "" + r, t.length <= a.length ? a : qe(t.substr(0, t.length - a.length)) + a;
  if (i = t.match(/^([#0]+)\.([#0]+)$/)) {
    a = "" + r.toFixed(Math.min(i[2].length, 10)).replace(/([^0])0+$/, "$1"), s = a.indexOf(".");
    var u = t.indexOf(".") - s, h = t.length - a.length - u;
    return qe(t.substr(0, u) + a + t.substr(t.length - h));
  }
  if (i = t.match(/^00,000\.([#0]*0)$/))
    return r < 0 ? "-" + Sr(e, t, -r) : Ur("" + r).replace(/^\d,\d{3}$/, "0$&").replace(/^\d*$/, function(g) {
      return "00," + (g.length < 3 ? Tr(0, 3 - g.length) : "") + g;
    }) + "." + Tr(0, i[1].length);
  switch (t) {
    case "###,###":
    case "##,###":
    case "#,###":
      var d = Ur("" + c);
      return d !== "0" ? l + d : "";
    default:
      if (t.match(/\.[0#?]*$/))
        return Sr(e, t.slice(0, t.lastIndexOf(".")), r) + qe(t.slice(t.lastIndexOf(".")));
  }
  throw new Error("unsupported format |" + t + "|");
}
function Rr(e, t, r) {
  return (r | 0) === r ? Sr(e, t, r) : xr(e, t, r);
}
function Il(e) {
  for (var t = [], r = !1, n = 0, a = 0; n < e.length; ++n)
    switch (e.charCodeAt(n)) {
      case 34:
        r = !r;
        break;
      case 95:
      case 42:
      case 92:
        ++n;
        break;
      case 59:
        t[t.length] = e.substr(a, n - a), a = n + 1;
    }
  if (t[t.length] = e.substr(a), r === !0)
    throw new Error("Format |" + e + "| unterminated string ");
  return t;
}
var ri = /\[[HhMmSs\u0E0A\u0E19\u0E17]*\]/;
function ti(e) {
  for (var t = 0, r = "", n = ""; t < e.length; )
    switch (r = e.charAt(t)) {
      case "G":
        dn(e, t) && (t += 6), t++;
        break;
      case '"':
        for (; e.charCodeAt(++t) !== 34 && t < e.length; )
          ;
        ++t;
        break;
      case "\\":
        t += 2;
        break;
      case "_":
        t += 2;
        break;
      case "@":
        ++t;
        break;
      case "B":
      case "b":
        if (e.charAt(t + 1) === "1" || e.charAt(t + 1) === "2")
          return !0;
      case "M":
      case "D":
      case "Y":
      case "H":
      case "S":
      case "E":
      case "m":
      case "d":
      case "y":
      case "h":
      case "s":
      case "e":
      case "g":
        return !0;
      case "A":
      case "a":
      case "\u4E0A":
        if (e.substr(t, 3).toUpperCase() === "A/P" || e.substr(t, 5).toUpperCase() === "AM/PM" || e.substr(t, 5).toUpperCase() === "\u4E0A\u5348/\u4E0B\u5348")
          return !0;
        ++t;
        break;
      case "[":
        for (n = r; e.charAt(t++) !== "]" && t < e.length; )
          n += e.charAt(t);
        if (n.match(ri))
          return !0;
        break;
      case ".":
      case "0":
      case "#":
        for (; t < e.length && ("0#?.,E+-%".indexOf(r = e.charAt(++t)) > -1 || r == "\\" && e.charAt(t + 1) == "-" && "0#".indexOf(e.charAt(t + 2)) > -1); )
          ;
        break;
      case "?":
        for (; e.charAt(++t) === r; )
          ;
        break;
      case "*":
        ++t, (e.charAt(t) == " " || e.charAt(t) == "*") && ++t;
        break;
      case "(":
      case ")":
        ++t;
        break;
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        for (; t < e.length && "0123456789".indexOf(e.charAt(++t)) > -1; )
          ;
        break;
      case " ":
        ++t;
        break;
      default:
        ++t;
        break;
    }
  return !1;
}
function Pl(e, t, r, n) {
  for (var a = [], i = "", s = 0, f = "", c = "t", l, o, u, h = "H"; s < e.length; )
    switch (f = e.charAt(s)) {
      case "G":
        if (!dn(e, s))
          throw new Error("unrecognized character " + f + " in " + e);
        a[a.length] = { t: "G", v: "General" }, s += 7;
        break;
      case '"':
        for (i = ""; (u = e.charCodeAt(++s)) !== 34 && s < e.length; )
          i += String.fromCharCode(u);
        a[a.length] = { t: "t", v: i }, ++s;
        break;
      case "\\":
        var d = e.charAt(++s), g = d === "(" || d === ")" ? d : "t";
        a[a.length] = { t: g, v: d }, ++s;
        break;
      case "_":
        a[a.length] = { t: "t", v: " " }, s += 2;
        break;
      case "@":
        a[a.length] = { t: "T", v: t }, ++s;
        break;
      case "B":
      case "b":
        if (e.charAt(s + 1) === "1" || e.charAt(s + 1) === "2") {
          if (l == null && (l = en(t, r, e.charAt(s + 1) === "2"), l == null))
            return "";
          a[a.length] = { t: "X", v: e.substr(s, 2) }, c = f, s += 2;
          break;
        }
      case "M":
      case "D":
      case "Y":
      case "H":
      case "S":
      case "E":
        f = f.toLowerCase();
      case "m":
      case "d":
      case "y":
      case "h":
      case "s":
      case "e":
      case "g":
        if (t < 0 || l == null && (l = en(t, r), l == null))
          return "";
        for (i = f; ++s < e.length && e.charAt(s).toLowerCase() === f; )
          i += f;
        f === "m" && c.toLowerCase() === "h" && (f = "M"), f === "h" && (f = h), a[a.length] = { t: f, v: i }, c = f;
        break;
      case "A":
      case "a":
      case "\u4E0A":
        var x = { t: f, v: f };
        if (l == null && (l = en(t, r)), e.substr(s, 3).toUpperCase() === "A/P" ? (l != null && (x.v = l.H >= 12 ? "P" : "A"), x.t = "T", h = "h", s += 3) : e.substr(s, 5).toUpperCase() === "AM/PM" ? (l != null && (x.v = l.H >= 12 ? "PM" : "AM"), x.t = "T", s += 5, h = "h") : e.substr(s, 5).toUpperCase() === "\u4E0A\u5348/\u4E0B\u5348" ? (l != null && (x.v = l.H >= 12 ? "\u4E0B\u5348" : "\u4E0A\u5348"), x.t = "T", s += 5, h = "h") : (x.t = "t", ++s), l == null && x.t === "T")
          return "";
        a[a.length] = x, c = f;
        break;
      case "[":
        for (i = f; e.charAt(s++) !== "]" && s < e.length; )
          i += e.charAt(s);
        if (i.slice(-1) !== "]")
          throw 'unterminated "[" block: |' + i + "|";
        if (i.match(ri)) {
          if (l == null && (l = en(t, r), l == null))
            return "";
          a[a.length] = { t: "Z", v: i.toLowerCase() }, c = i.charAt(1);
        } else
          i.indexOf("$") > -1 && (i = (i.match(/\$([^-\[\]]*)/) || [])[1] || "$", ti(e) || (a[a.length] = { t: "t", v: i }));
        break;
      case ".":
        if (l != null) {
          for (i = f; ++s < e.length && (f = e.charAt(s)) === "0"; )
            i += f;
          a[a.length] = { t: "s", v: i };
          break;
        }
      case "0":
      case "#":
        for (i = f; ++s < e.length && "0#?.,E+-%".indexOf(f = e.charAt(s)) > -1; )
          i += f;
        a[a.length] = { t: "n", v: i };
        break;
      case "?":
        for (i = f; e.charAt(++s) === f; )
          i += f;
        a[a.length] = { t: f, v: i }, c = f;
        break;
      case "*":
        ++s, (e.charAt(s) == " " || e.charAt(s) == "*") && ++s;
        break;
      case "(":
      case ")":
        a[a.length] = { t: n === 1 ? "t" : f, v: f }, ++s;
        break;
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        for (i = f; s < e.length && "0123456789".indexOf(e.charAt(++s)) > -1; )
          i += e.charAt(s);
        a[a.length] = { t: "D", v: i };
        break;
      case " ":
        a[a.length] = { t: f, v: f }, ++s;
        break;
      case "$":
        a[a.length] = { t: "t", v: "$" }, ++s;
        break;
      default:
        if (",$-+/():!^&'~{}<>=\u20ACacfijklopqrtuvwxzP".indexOf(f) === -1)
          throw new Error("unrecognized character " + f + " in " + e);
        a[a.length] = { t: "t", v: f }, ++s;
        break;
    }
  var m = 0, O = 0, A;
  for (s = a.length - 1, c = "t"; s >= 0; --s)
    switch (a[s].t) {
      case "h":
      case "H":
        a[s].t = h, c = "h", m < 1 && (m = 1);
        break;
      case "s":
        (A = a[s].v.match(/\.0+$/)) && (O = Math.max(O, A[0].length - 1)), m < 3 && (m = 3);
      case "d":
      case "y":
      case "M":
      case "e":
        c = a[s].t;
        break;
      case "m":
        c === "s" && (a[s].t = "M", m < 2 && (m = 2));
        break;
      case "X":
        break;
      case "Z":
        m < 1 && a[s].v.match(/[Hh]/) && (m = 1), m < 2 && a[s].v.match(/[Mm]/) && (m = 2), m < 3 && a[s].v.match(/[Ss]/) && (m = 3);
    }
  switch (m) {
    case 0:
      break;
    case 1:
      l.u >= 0.5 && (l.u = 0, ++l.S), l.S >= 60 && (l.S = 0, ++l.M), l.M >= 60 && (l.M = 0, ++l.H);
      break;
    case 2:
      l.u >= 0.5 && (l.u = 0, ++l.S), l.S >= 60 && (l.S = 0, ++l.M);
      break;
  }
  var y = "", R;
  for (s = 0; s < a.length; ++s)
    switch (a[s].t) {
      case "t":
      case "T":
      case " ":
      case "D":
        break;
      case "X":
        a[s].v = "", a[s].t = ";";
        break;
      case "d":
      case "m":
      case "y":
      case "h":
      case "H":
      case "M":
      case "s":
      case "e":
      case "b":
      case "Z":
        a[s].v = Al(a[s].t.charCodeAt(0), a[s].v, l, O), a[s].t = "t";
        break;
      case "n":
      case "?":
        for (R = s + 1; a[R] != null && ((f = a[R].t) === "?" || f === "D" || (f === " " || f === "t") && a[R + 1] != null && (a[R + 1].t === "?" || a[R + 1].t === "t" && a[R + 1].v === "/") || a[s].t === "(" && (f === " " || f === "n" || f === ")") || f === "t" && (a[R].v === "/" || a[R].v === " " && a[R + 1] != null && a[R + 1].t == "?")); )
          a[s].v += a[R].v, a[R] = { v: "", t: ";" }, ++R;
        y += a[s].v, s = R - 1;
        break;
      case "G":
        a[s].t = "t", a[s].v = Jn(t, r);
        break;
    }
  var X = "", Q, D;
  if (y.length > 0) {
    y.charCodeAt(0) == 40 ? (Q = t < 0 && y.charCodeAt(0) === 45 ? -t : t, D = Rr("n", y, Q)) : (Q = t < 0 && n > 1 ? -t : t, D = Rr("n", y, Q), Q < 0 && a[0] && a[0].t == "t" && (D = D.substr(1), a[0].v = "-" + a[0].v)), R = D.length - 1;
    var U = a.length;
    for (s = 0; s < a.length; ++s)
      if (a[s] != null && a[s].t != "t" && a[s].v.indexOf(".") > -1) {
        U = s;
        break;
      }
    var B = a.length;
    if (U === a.length && D.indexOf("E") === -1) {
      for (s = a.length - 1; s >= 0; --s)
        a[s] == null || "n?".indexOf(a[s].t) === -1 || (R >= a[s].v.length - 1 ? (R -= a[s].v.length, a[s].v = D.substr(R + 1, a[s].v.length)) : R < 0 ? a[s].v = "" : (a[s].v = D.substr(0, R + 1), R = -1), a[s].t = "t", B = s);
      R >= 0 && B < a.length && (a[B].v = D.substr(0, R + 1) + a[B].v);
    } else if (U !== a.length && D.indexOf("E") === -1) {
      for (R = D.indexOf(".") - 1, s = U; s >= 0; --s)
        if (!(a[s] == null || "n?".indexOf(a[s].t) === -1)) {
          for (o = a[s].v.indexOf(".") > -1 && s === U ? a[s].v.indexOf(".") - 1 : a[s].v.length - 1, X = a[s].v.substr(o + 1); o >= 0; --o)
            R >= 0 && (a[s].v.charAt(o) === "0" || a[s].v.charAt(o) === "#") && (X = D.charAt(R--) + X);
          a[s].v = X, a[s].t = "t", B = s;
        }
      for (R >= 0 && B < a.length && (a[B].v = D.substr(0, R + 1) + a[B].v), R = D.indexOf(".") + 1, s = U; s < a.length; ++s)
        if (!(a[s] == null || "n?(".indexOf(a[s].t) === -1 && s !== U)) {
          for (o = a[s].v.indexOf(".") > -1 && s === U ? a[s].v.indexOf(".") + 1 : 0, X = a[s].v.substr(0, o); o < a[s].v.length; ++o)
            R < D.length && (X += D.charAt(R++));
          a[s].v = X, a[s].t = "t", B = s;
        }
    }
  }
  for (s = 0; s < a.length; ++s)
    a[s] != null && "n?".indexOf(a[s].t) > -1 && (Q = n > 1 && t < 0 && s > 0 && a[s - 1].v === "-" ? -t : t, a[s].v = Rr(a[s].t, a[s].v, Q), a[s].t = "t");
  var G = "";
  for (s = 0; s !== a.length; ++s)
    a[s] != null && (G += a[s].v);
  return G;
}
var Q0 = /\[(=|>[=]?|<[>=]?)(-?\d+(?:\.\d*)?)\]/;
function ea(e, t) {
  if (t == null)
    return !1;
  var r = parseFloat(t[2]);
  switch (t[1]) {
    case "=":
      if (e == r)
        return !0;
      break;
    case ">":
      if (e > r)
        return !0;
      break;
    case "<":
      if (e < r)
        return !0;
      break;
    case "<>":
      if (e != r)
        return !0;
      break;
    case ">=":
      if (e >= r)
        return !0;
      break;
    case "<=":
      if (e <= r)
        return !0;
      break;
  }
  return !1;
}
function Ll(e, t) {
  var r = Il(e), n = r.length, a = r[n - 1].indexOf("@");
  if (n < 4 && a > -1 && --n, r.length > 4)
    throw new Error("cannot find right format for |" + r.join("|") + "|");
  if (typeof t != "number")
    return [4, r.length === 4 || a > -1 ? r[r.length - 1] : "@"];
  switch (r.length) {
    case 1:
      r = a > -1 ? ["General", "General", "General", r[0]] : [r[0], r[0], r[0], "@"];
      break;
    case 2:
      r = a > -1 ? [r[0], r[0], r[0], r[1]] : [r[0], r[1], r[0], "@"];
      break;
    case 3:
      r = a > -1 ? [r[0], r[1], r[0], r[2]] : [r[0], r[1], r[2], "@"];
      break;
  }
  var i = t > 0 ? r[0] : t < 0 ? r[1] : r[2];
  if (r[0].indexOf("[") === -1 && r[1].indexOf("[") === -1)
    return [n, i];
  if (r[0].match(/\[[=<>]/) != null || r[1].match(/\[[=<>]/) != null) {
    var s = r[0].match(Q0), f = r[1].match(Q0);
    return ea(t, s) ? [n, r[0]] : ea(t, f) ? [n, r[1]] : [n, r[s != null && f != null ? 2 : 1]];
  }
  return [n, i];
}
function Vr(e, t, r) {
  r == null && (r = {});
  var n = "";
  switch (typeof e) {
    case "string":
      e == "m/d/yy" && r.dateNF ? n = r.dateNF : n = e;
      break;
    case "number":
      e == 14 && r.dateNF ? n = r.dateNF : n = (r.table != null ? r.table : Oe)[e], n == null && (n = r.table && r.table[q0[e]] || Oe[q0[e]]), n == null && (n = vl[e] || "General");
      break;
  }
  if (dn(n, 0))
    return Jn(t, r);
  t instanceof Date && (t = za(t, r.date1904));
  var a = Ll(n, t);
  if (dn(a[1]))
    return Jn(t, r);
  if (t === !0)
    t = "TRUE";
  else if (t === !1)
    t = "FALSE";
  else if (t === "" || t == null)
    return "";
  return Pl(a[1], t, r, a[0]);
}
function ni(e, t) {
  if (typeof t != "number") {
    t = +t || -1;
    for (var r = 0; r < 392; ++r) {
      if (Oe[r] == null) {
        t < 0 && (t = r);
        continue;
      }
      if (Oe[r] == e) {
        t = r;
        break;
      }
    }
    t < 0 && (t = 391);
  }
  return Oe[t] = e, t;
}
function On(e) {
  for (var t = 0; t != 392; ++t)
    e[t] !== void 0 && ni(e[t], t);
}
function Dn() {
  Oe = pl();
}
var ai = /[dD]+|[mM]+|[yYeE]+|[Hh]+|[Ss]+/g;
function Bl(e) {
  var t = typeof e == "number" ? Oe[e] : e;
  return t = t.replace(ai, "(\\d+)"), new RegExp("^" + t + "$");
}
function Ml(e, t, r) {
  var n = -1, a = -1, i = -1, s = -1, f = -1, c = -1;
  (t.match(ai) || []).forEach(function(u, h) {
    var d = parseInt(r[h + 1], 10);
    switch (u.toLowerCase().charAt(0)) {
      case "y":
        n = d;
        break;
      case "d":
        i = d;
        break;
      case "h":
        s = d;
        break;
      case "s":
        c = d;
        break;
      case "m":
        s >= 0 ? f = d : a = d;
        break;
    }
  }), c >= 0 && f == -1 && a >= 0 && (f = a, a = -1);
  var l = ("" + (n >= 0 ? n : new Date().getFullYear())).slice(-4) + "-" + ("00" + (a >= 1 ? a : 1)).slice(-2) + "-" + ("00" + (i >= 1 ? i : 1)).slice(-2);
  l.length == 7 && (l = "0" + l), l.length == 8 && (l = "20" + l);
  var o = ("00" + (s >= 0 ? s : 0)).slice(-2) + ":" + ("00" + (f >= 0 ? f : 0)).slice(-2) + ":" + ("00" + (c >= 0 ? c : 0)).slice(-2);
  return s == -1 && f == -1 && c == -1 ? l : n == -1 && a == -1 && i == -1 ? o : l + "T" + o;
}
var bl = /* @__PURE__ */ function() {
  var e = {};
  e.version = "1.2.0";
  function t() {
    for (var D = 0, U = new Array(256), B = 0; B != 256; ++B)
      D = B, D = D & 1 ? -306674912 ^ D >>> 1 : D >>> 1, D = D & 1 ? -306674912 ^ D >>> 1 : D >>> 1, D = D & 1 ? -306674912 ^ D >>> 1 : D >>> 1, D = D & 1 ? -306674912 ^ D >>> 1 : D >>> 1, D = D & 1 ? -306674912 ^ D >>> 1 : D >>> 1, D = D & 1 ? -306674912 ^ D >>> 1 : D >>> 1, D = D & 1 ? -306674912 ^ D >>> 1 : D >>> 1, D = D & 1 ? -306674912 ^ D >>> 1 : D >>> 1, U[B] = D;
    return typeof Int32Array < "u" ? new Int32Array(U) : U;
  }
  var r = t();
  function n(D) {
    var U = 0, B = 0, G = 0, j = typeof Int32Array < "u" ? new Int32Array(4096) : new Array(4096);
    for (G = 0; G != 256; ++G)
      j[G] = D[G];
    for (G = 0; G != 256; ++G)
      for (B = D[G], U = 256 + G; U < 4096; U += 256)
        B = j[U] = B >>> 8 ^ D[B & 255];
    var K = [];
    for (G = 1; G != 16; ++G)
      K[G - 1] = typeof Int32Array < "u" ? j.subarray(G * 256, G * 256 + 256) : j.slice(G * 256, G * 256 + 256);
    return K;
  }
  var a = n(r), i = a[0], s = a[1], f = a[2], c = a[3], l = a[4], o = a[5], u = a[6], h = a[7], d = a[8], g = a[9], x = a[10], m = a[11], O = a[12], A = a[13], y = a[14];
  function R(D, U) {
    for (var B = U ^ -1, G = 0, j = D.length; G < j; )
      B = B >>> 8 ^ r[(B ^ D.charCodeAt(G++)) & 255];
    return ~B;
  }
  function X(D, U) {
    for (var B = U ^ -1, G = D.length - 15, j = 0; j < G; )
      B = y[D[j++] ^ B & 255] ^ A[D[j++] ^ B >> 8 & 255] ^ O[D[j++] ^ B >> 16 & 255] ^ m[D[j++] ^ B >>> 24] ^ x[D[j++]] ^ g[D[j++]] ^ d[D[j++]] ^ h[D[j++]] ^ u[D[j++]] ^ o[D[j++]] ^ l[D[j++]] ^ c[D[j++]] ^ f[D[j++]] ^ s[D[j++]] ^ i[D[j++]] ^ r[D[j++]];
    for (G += 15; j < G; )
      B = B >>> 8 ^ r[(B ^ D[j++]) & 255];
    return ~B;
  }
  function Q(D, U) {
    for (var B = U ^ -1, G = 0, j = D.length, K = 0, te = 0; G < j; )
      K = D.charCodeAt(G++), K < 128 ? B = B >>> 8 ^ r[(B ^ K) & 255] : K < 2048 ? (B = B >>> 8 ^ r[(B ^ (192 | K >> 6 & 31)) & 255], B = B >>> 8 ^ r[(B ^ (128 | K & 63)) & 255]) : K >= 55296 && K < 57344 ? (K = (K & 1023) + 64, te = D.charCodeAt(G++) & 1023, B = B >>> 8 ^ r[(B ^ (240 | K >> 8 & 7)) & 255], B = B >>> 8 ^ r[(B ^ (128 | K >> 2 & 63)) & 255], B = B >>> 8 ^ r[(B ^ (128 | te >> 6 & 15 | (K & 3) << 4)) & 255], B = B >>> 8 ^ r[(B ^ (128 | te & 63)) & 255]) : (B = B >>> 8 ^ r[(B ^ (224 | K >> 12 & 15)) & 255], B = B >>> 8 ^ r[(B ^ (128 | K >> 6 & 63)) & 255], B = B >>> 8 ^ r[(B ^ (128 | K & 63)) & 255]);
    return ~B;
  }
  return e.table = r, e.bstr = R, e.buf = X, e.str = Q, e;
}(), Ee = /* @__PURE__ */ function() {
  var t = {};
  t.version = "1.2.1";
  function r(p, T) {
    for (var v = p.split("/"), _ = T.split("/"), E = 0, w = 0, N = Math.min(v.length, _.length); E < N; ++E) {
      if (w = v[E].length - _[E].length)
        return w;
      if (v[E] != _[E])
        return v[E] < _[E] ? -1 : 1;
    }
    return v.length - _.length;
  }
  function n(p) {
    if (p.charAt(p.length - 1) == "/")
      return p.slice(0, -1).indexOf("/") === -1 ? p : n(p.slice(0, -1));
    var T = p.lastIndexOf("/");
    return T === -1 ? p : p.slice(0, T + 1);
  }
  function a(p) {
    if (p.charAt(p.length - 1) == "/")
      return a(p.slice(0, -1));
    var T = p.lastIndexOf("/");
    return T === -1 ? p : p.slice(T + 1);
  }
  function i(p, T) {
    typeof T == "string" && (T = new Date(T));
    var v = T.getHours();
    v = v << 6 | T.getMinutes(), v = v << 5 | T.getSeconds() >>> 1, p.write_shift(2, v);
    var _ = T.getFullYear() - 1980;
    _ = _ << 4 | T.getMonth() + 1, _ = _ << 5 | T.getDate(), p.write_shift(2, _);
  }
  function s(p) {
    var T = p.read_shift(2) & 65535, v = p.read_shift(2) & 65535, _ = new Date(), E = v & 31;
    v >>>= 5;
    var w = v & 15;
    v >>>= 4, _.setMilliseconds(0), _.setFullYear(v + 1980), _.setMonth(w - 1), _.setDate(E);
    var N = T & 31;
    T >>>= 5;
    var b = T & 63;
    return T >>>= 6, _.setHours(T), _.setMinutes(b), _.setSeconds(N << 1), _;
  }
  function f(p) {
    sr(p, 0);
    for (var T = {}, v = 0; p.l <= p.length - 4; ) {
      var _ = p.read_shift(2), E = p.read_shift(2), w = p.l + E, N = {};
      switch (_) {
        case 21589:
          v = p.read_shift(1), v & 1 && (N.mtime = p.read_shift(4)), E > 5 && (v & 2 && (N.atime = p.read_shift(4)), v & 4 && (N.ctime = p.read_shift(4))), N.mtime && (N.mt = new Date(N.mtime * 1e3));
          break;
      }
      p.l = w, T[_] = N;
    }
    return T;
  }
  var c;
  function l() {
    return c || (c = {});
  }
  function o(p, T) {
    if (p[0] == 80 && p[1] == 75)
      return b0(p, T);
    if ((p[0] | 32) == 109 && (p[1] | 32) == 105)
      return Ps(p, T);
    if (p.length < 512)
      throw new Error("CFB file size " + p.length + " < 512");
    var v = 3, _ = 512, E = 0, w = 0, N = 0, b = 0, k = 0, I = [], P = p.slice(0, 512);
    sr(P, 0);
    var z = u(P);
    switch (v = z[0], v) {
      case 3:
        _ = 512;
        break;
      case 4:
        _ = 4096;
        break;
      case 0:
        if (z[1] == 0)
          return b0(p, T);
      default:
        throw new Error("Major Version: Expected 3 or 4 saw " + v);
    }
    _ !== 512 && (P = p.slice(0, _), sr(P, 28));
    var Z = p.slice(0, _);
    h(P, v);
    var ne = P.read_shift(4, "i");
    if (v === 3 && ne !== 0)
      throw new Error("# Directory Sectors: Expected 0 saw " + ne);
    P.l += 4, N = P.read_shift(4, "i"), P.l += 4, P.chk("00100000", "Mini Stream Cutoff Size: "), b = P.read_shift(4, "i"), E = P.read_shift(4, "i"), k = P.read_shift(4, "i"), w = P.read_shift(4, "i");
    for (var Y = -1, re = 0; re < 109 && (Y = P.read_shift(4, "i"), !(Y < 0)); ++re)
      I[re] = Y;
    var le = d(p, _);
    m(k, w, le, _, I);
    var Ae = A(le, N, I, _);
    Ae[N].name = "!Directory", E > 0 && b !== te && (Ae[b].name = "!MiniFAT"), Ae[I[0]].name = "!FAT", Ae.fat_addrs = I, Ae.ssz = _;
    var ye = {}, $e = [], yt = [], Ft = [];
    y(N, Ae, le, $e, E, ye, yt, b), g(yt, Ft, $e), $e.shift();
    var Ct = {
      FileIndex: yt,
      FullPaths: Ft
    };
    return T && T.raw && (Ct.raw = { header: Z, sectors: le }), Ct;
  }
  function u(p) {
    if (p[p.l] == 80 && p[p.l + 1] == 75)
      return [0, 0];
    p.chk(Te, "Header Signature: "), p.l += 16;
    var T = p.read_shift(2, "u");
    return [p.read_shift(2, "u"), T];
  }
  function h(p, T) {
    var v = 9;
    switch (p.l += 2, v = p.read_shift(2)) {
      case 9:
        if (T != 3)
          throw new Error("Sector Shift: Expected 9 saw " + v);
        break;
      case 12:
        if (T != 4)
          throw new Error("Sector Shift: Expected 12 saw " + v);
        break;
      default:
        throw new Error("Sector Shift: Expected 9 or 12 saw " + v);
    }
    p.chk("0600", "Mini Sector Shift: "), p.chk("000000000000", "Reserved: ");
  }
  function d(p, T) {
    for (var v = Math.ceil(p.length / T) - 1, _ = [], E = 1; E < v; ++E)
      _[E - 1] = p.slice(E * T, (E + 1) * T);
    return _[v - 1] = p.slice(v * T), _;
  }
  function g(p, T, v) {
    for (var _ = 0, E = 0, w = 0, N = 0, b = 0, k = v.length, I = [], P = []; _ < k; ++_)
      I[_] = P[_] = _, T[_] = v[_];
    for (; b < P.length; ++b)
      _ = P[b], E = p[_].L, w = p[_].R, N = p[_].C, I[_] === _ && (E !== -1 && I[E] !== E && (I[_] = I[E]), w !== -1 && I[w] !== w && (I[_] = I[w])), N !== -1 && (I[N] = _), E !== -1 && _ != I[_] && (I[E] = I[_], P.lastIndexOf(E) < b && P.push(E)), w !== -1 && _ != I[_] && (I[w] = I[_], P.lastIndexOf(w) < b && P.push(w));
    for (_ = 1; _ < k; ++_)
      I[_] === _ && (w !== -1 && I[w] !== w ? I[_] = I[w] : E !== -1 && I[E] !== E && (I[_] = I[E]));
    for (_ = 1; _ < k; ++_)
      if (p[_].type !== 0) {
        if (b = _, b != I[b])
          do
            b = I[b], T[_] = T[b] + "/" + T[_];
          while (b !== 0 && I[b] !== -1 && b != I[b]);
        I[_] = -1;
      }
    for (T[0] += "/", _ = 1; _ < k; ++_)
      p[_].type !== 2 && (T[_] += "/");
  }
  function x(p, T, v) {
    for (var _ = p.start, E = p.size, w = [], N = _; v && E > 0 && N >= 0; )
      w.push(T.slice(N * K, N * K + K)), E -= K, N = qr(v, N * 4);
    return w.length === 0 ? M(0) : Ve(w).slice(0, p.size);
  }
  function m(p, T, v, _, E) {
    var w = te;
    if (p === te) {
      if (T !== 0)
        throw new Error("DIFAT chain shorter than expected");
    } else if (p !== -1) {
      var N = v[p], b = (_ >>> 2) - 1;
      if (!N)
        return;
      for (var k = 0; k < b && (w = qr(N, k * 4)) !== te; ++k)
        E.push(w);
      m(qr(N, _ - 4), T - 1, v, _, E);
    }
  }
  function O(p, T, v, _, E) {
    var w = [], N = [];
    E || (E = []);
    var b = _ - 1, k = 0, I = 0;
    for (k = T; k >= 0; ) {
      E[k] = !0, w[w.length] = k, N.push(p[k]);
      var P = v[Math.floor(k * 4 / _)];
      if (I = k * 4 & b, _ < 4 + I)
        throw new Error("FAT boundary crossed: " + k + " 4 " + _);
      if (!p[P])
        break;
      k = qr(p[P], I);
    }
    return { nodes: w, data: la([N]) };
  }
  function A(p, T, v, _) {
    var E = p.length, w = [], N = [], b = [], k = [], I = _ - 1, P = 0, z = 0, Z = 0, ne = 0;
    for (P = 0; P < E; ++P)
      if (b = [], Z = P + T, Z >= E && (Z -= E), !N[Z]) {
        k = [];
        var Y = [];
        for (z = Z; z >= 0; ) {
          Y[z] = !0, N[z] = !0, b[b.length] = z, k.push(p[z]);
          var re = v[Math.floor(z * 4 / _)];
          if (ne = z * 4 & I, _ < 4 + ne)
            throw new Error("FAT boundary crossed: " + z + " 4 " + _);
          if (!p[re] || (z = qr(p[re], ne), Y[z]))
            break;
        }
        w[Z] = { nodes: b, data: la([k]) };
      }
    return w;
  }
  function y(p, T, v, _, E, w, N, b) {
    for (var k = 0, I = _.length ? 2 : 0, P = T[p].data, z = 0, Z = 0, ne; z < P.length; z += 128) {
      var Y = P.slice(z, z + 128);
      sr(Y, 64), Z = Y.read_shift(2), ne = d0(Y, 0, Z - I), _.push(ne);
      var re = {
        name: ne,
        type: Y.read_shift(1),
        color: Y.read_shift(1),
        L: Y.read_shift(4, "i"),
        R: Y.read_shift(4, "i"),
        C: Y.read_shift(4, "i"),
        clsid: Y.read_shift(16),
        state: Y.read_shift(4, "i"),
        start: 0,
        size: 0
      }, le = Y.read_shift(2) + Y.read_shift(2) + Y.read_shift(2) + Y.read_shift(2);
      le !== 0 && (re.ct = R(Y, Y.l - 8));
      var Ae = Y.read_shift(2) + Y.read_shift(2) + Y.read_shift(2) + Y.read_shift(2);
      Ae !== 0 && (re.mt = R(Y, Y.l - 8)), re.start = Y.read_shift(4, "i"), re.size = Y.read_shift(4, "i"), re.size < 0 && re.start < 0 && (re.size = re.type = 0, re.start = te, re.name = ""), re.type === 5 ? (k = re.start, E > 0 && k !== te && (T[k].name = "!StreamData")) : re.size >= 4096 ? (re.storage = "fat", T[re.start] === void 0 && (T[re.start] = O(v, re.start, T.fat_addrs, T.ssz)), T[re.start].name = re.name, re.content = T[re.start].data.slice(0, re.size)) : (re.storage = "minifat", re.size < 0 ? re.size = 0 : k !== te && re.start !== te && T[k] && (re.content = x(re, T[k].data, (T[b] || {}).data))), re.content && sr(re.content, 0), w[ne] = re, N.push(re);
    }
  }
  function R(p, T) {
    return new Date((lr(p, T + 4) / 1e7 * Math.pow(2, 32) + lr(p, T) / 1e7 - 11644473600) * 1e3);
  }
  function X(p, T) {
    return l(), o(c.readFileSync(p), T);
  }
  function Q(p, T) {
    var v = T && T.type;
    switch (v || de && Buffer.isBuffer(p) && (v = "buffer"), v || "base64") {
      case "file":
        return X(p, T);
      case "base64":
        return o(_r(Ir(p)), T);
      case "binary":
        return o(_r(p), T);
    }
    return o(p, T);
  }
  function D(p, T) {
    var v = T || {}, _ = v.root || "Root Entry";
    if (p.FullPaths || (p.FullPaths = []), p.FileIndex || (p.FileIndex = []), p.FullPaths.length !== p.FileIndex.length)
      throw new Error("inconsistent CFB structure");
    p.FullPaths.length === 0 && (p.FullPaths[0] = _ + "/", p.FileIndex[0] = { name: _, type: 5 }), v.CLSID && (p.FileIndex[0].clsid = v.CLSID), U(p);
  }
  function U(p) {
    var T = "Sh33tJ5";
    if (!Ee.find(p, "/" + T)) {
      var v = M(4);
      v[0] = 55, v[1] = v[3] = 50, v[2] = 54, p.FileIndex.push({ name: T, type: 2, content: v, size: 4, L: 69, R: 69, C: 69 }), p.FullPaths.push(p.FullPaths[0] + T), B(p);
    }
  }
  function B(p, T) {
    D(p);
    for (var v = !1, _ = !1, E = p.FullPaths.length - 1; E >= 0; --E) {
      var w = p.FileIndex[E];
      switch (w.type) {
        case 0:
          _ ? v = !0 : (p.FileIndex.pop(), p.FullPaths.pop());
          break;
        case 1:
        case 2:
        case 5:
          _ = !0, isNaN(w.R * w.L * w.C) && (v = !0), w.R > -1 && w.L > -1 && w.R == w.L && (v = !0);
          break;
        default:
          v = !0;
          break;
      }
    }
    if (!(!v && !T)) {
      var N = new Date(1987, 1, 19), b = 0, k = Object.create ? /* @__PURE__ */ Object.create(null) : {}, I = [];
      for (E = 0; E < p.FullPaths.length; ++E)
        k[p.FullPaths[E]] = !0, p.FileIndex[E].type !== 0 && I.push([p.FullPaths[E], p.FileIndex[E]]);
      for (E = 0; E < I.length; ++E) {
        var P = n(I[E][0]);
        _ = k[P], _ || (I.push([P, {
          name: a(P).replace("/", ""),
          type: 1,
          clsid: Ue,
          ct: N,
          mt: N,
          content: null
        }]), k[P] = !0);
      }
      for (I.sort(function(ne, Y) {
        return r(ne[0], Y[0]);
      }), p.FullPaths = [], p.FileIndex = [], E = 0; E < I.length; ++E)
        p.FullPaths[E] = I[E][0], p.FileIndex[E] = I[E][1];
      for (E = 0; E < I.length; ++E) {
        var z = p.FileIndex[E], Z = p.FullPaths[E];
        if (z.name = a(Z).replace("/", ""), z.L = z.R = z.C = -(z.color = 1), z.size = z.content ? z.content.length : 0, z.start = 0, z.clsid = z.clsid || Ue, E === 0)
          z.C = I.length > 1 ? 1 : -1, z.size = 0, z.type = 5;
        else if (Z.slice(-1) == "/") {
          for (b = E + 1; b < I.length && n(p.FullPaths[b]) != Z; ++b)
            ;
          for (z.C = b >= I.length ? -1 : b, b = E + 1; b < I.length && n(p.FullPaths[b]) != n(Z); ++b)
            ;
          z.R = b >= I.length ? -1 : b, z.type = 1;
        } else
          n(p.FullPaths[E + 1] || "") == n(Z) && (z.R = E + 1), z.type = 2;
      }
    }
  }
  function G(p, T) {
    var v = T || {};
    if (v.fileType == "mad")
      return Ls(p, v);
    switch (B(p), v.fileType) {
      case "zip":
        return Os(p, v);
    }
    var _ = function(ne) {
      for (var Y = 0, re = 0, le = 0; le < ne.FileIndex.length; ++le) {
        var Ae = ne.FileIndex[le];
        if (!!Ae.content) {
          var ye = Ae.content.length;
          ye > 0 && (ye < 4096 ? Y += ye + 63 >> 6 : re += ye + 511 >> 9);
        }
      }
      for (var $e = ne.FullPaths.length + 3 >> 2, yt = Y + 7 >> 3, Ft = Y + 127 >> 7, Ct = yt + re + $e + Ft, Kr = Ct + 127 >> 7, Un = Kr <= 109 ? 0 : Math.ceil((Kr - 109) / 127); Ct + Kr + Un + 127 >> 7 > Kr; )
        Un = ++Kr <= 109 ? 0 : Math.ceil((Kr - 109) / 127);
      var Or = [1, Un, Kr, Ft, $e, re, Y, 0];
      return ne.FileIndex[0].size = Y << 6, Or[7] = (ne.FileIndex[0].start = Or[0] + Or[1] + Or[2] + Or[3] + Or[4] + Or[5]) + (Or[6] + 7 >> 3), Or;
    }(p), E = M(_[7] << 9), w = 0, N = 0;
    {
      for (w = 0; w < 8; ++w)
        E.write_shift(1, oe[w]);
      for (w = 0; w < 8; ++w)
        E.write_shift(2, 0);
      for (E.write_shift(2, 62), E.write_shift(2, 3), E.write_shift(2, 65534), E.write_shift(2, 9), E.write_shift(2, 6), w = 0; w < 3; ++w)
        E.write_shift(2, 0);
      for (E.write_shift(4, 0), E.write_shift(4, _[2]), E.write_shift(4, _[0] + _[1] + _[2] + _[3] - 1), E.write_shift(4, 0), E.write_shift(4, 1 << 12), E.write_shift(4, _[3] ? _[0] + _[1] + _[2] - 1 : te), E.write_shift(4, _[3]), E.write_shift(-4, _[1] ? _[0] - 1 : te), E.write_shift(4, _[1]), w = 0; w < 109; ++w)
        E.write_shift(-4, w < _[2] ? _[1] + w : -1);
    }
    if (_[1])
      for (N = 0; N < _[1]; ++N) {
        for (; w < 236 + N * 127; ++w)
          E.write_shift(-4, w < _[2] ? _[1] + w : -1);
        E.write_shift(-4, N === _[1] - 1 ? te : N + 1);
      }
    var b = function(ne) {
      for (N += ne; w < N - 1; ++w)
        E.write_shift(-4, w + 1);
      ne && (++w, E.write_shift(-4, te));
    };
    for (N = w = 0, N += _[1]; w < N; ++w)
      E.write_shift(-4, De.DIFSECT);
    for (N += _[2]; w < N; ++w)
      E.write_shift(-4, De.FATSECT);
    b(_[3]), b(_[4]);
    for (var k = 0, I = 0, P = p.FileIndex[0]; k < p.FileIndex.length; ++k)
      P = p.FileIndex[k], P.content && (I = P.content.length, !(I < 4096) && (P.start = N, b(I + 511 >> 9)));
    for (b(_[6] + 7 >> 3); E.l & 511; )
      E.write_shift(-4, De.ENDOFCHAIN);
    for (N = w = 0, k = 0; k < p.FileIndex.length; ++k)
      P = p.FileIndex[k], P.content && (I = P.content.length, !(!I || I >= 4096) && (P.start = N, b(I + 63 >> 6)));
    for (; E.l & 511; )
      E.write_shift(-4, De.ENDOFCHAIN);
    for (w = 0; w < _[4] << 2; ++w) {
      var z = p.FullPaths[w];
      if (!z || z.length === 0) {
        for (k = 0; k < 17; ++k)
          E.write_shift(4, 0);
        for (k = 0; k < 3; ++k)
          E.write_shift(4, -1);
        for (k = 0; k < 12; ++k)
          E.write_shift(4, 0);
        continue;
      }
      P = p.FileIndex[w], w === 0 && (P.start = P.size ? P.start - 1 : te);
      var Z = w === 0 && v.root || P.name;
      if (I = 2 * (Z.length + 1), E.write_shift(64, Z, "utf16le"), E.write_shift(2, I), E.write_shift(1, P.type), E.write_shift(1, P.color), E.write_shift(-4, P.L), E.write_shift(-4, P.R), E.write_shift(-4, P.C), P.clsid)
        E.write_shift(16, P.clsid, "hex");
      else
        for (k = 0; k < 4; ++k)
          E.write_shift(4, 0);
      E.write_shift(4, P.state || 0), E.write_shift(4, 0), E.write_shift(4, 0), E.write_shift(4, 0), E.write_shift(4, 0), E.write_shift(4, P.start), E.write_shift(4, P.size), E.write_shift(4, 0);
    }
    for (w = 1; w < p.FileIndex.length; ++w)
      if (P = p.FileIndex[w], P.size >= 4096)
        if (E.l = P.start + 1 << 9, de && Buffer.isBuffer(P.content))
          P.content.copy(E, E.l, 0, P.size), E.l += P.size + 511 & -512;
        else {
          for (k = 0; k < P.size; ++k)
            E.write_shift(1, P.content[k]);
          for (; k & 511; ++k)
            E.write_shift(1, 0);
        }
    for (w = 1; w < p.FileIndex.length; ++w)
      if (P = p.FileIndex[w], P.size > 0 && P.size < 4096)
        if (de && Buffer.isBuffer(P.content))
          P.content.copy(E, E.l, 0, P.size), E.l += P.size + 63 & -64;
        else {
          for (k = 0; k < P.size; ++k)
            E.write_shift(1, P.content[k]);
          for (; k & 63; ++k)
            E.write_shift(1, 0);
        }
    if (de)
      E.l = E.length;
    else
      for (; E.l < E.length; )
        E.write_shift(1, 0);
    return E;
  }
  function j(p, T) {
    var v = p.FullPaths.map(function(k) {
      return k.toUpperCase();
    }), _ = v.map(function(k) {
      var I = k.split("/");
      return I[I.length - (k.slice(-1) == "/" ? 2 : 1)];
    }), E = !1;
    T.charCodeAt(0) === 47 ? (E = !0, T = v[0].slice(0, -1) + T) : E = T.indexOf("/") !== -1;
    var w = T.toUpperCase(), N = E === !0 ? v.indexOf(w) : _.indexOf(w);
    if (N !== -1)
      return p.FileIndex[N];
    var b = !w.match(Qt);
    for (w = w.replace(kt, ""), b && (w = w.replace(Qt, "!")), N = 0; N < v.length; ++N)
      if ((b ? v[N].replace(Qt, "!") : v[N]).replace(kt, "") == w || (b ? _[N].replace(Qt, "!") : _[N]).replace(kt, "") == w)
        return p.FileIndex[N];
    return null;
  }
  var K = 64, te = -2, Te = "d0cf11e0a1b11ae1", oe = [208, 207, 17, 224, 161, 177, 26, 225], Ue = "00000000000000000000000000000000", De = {
    MAXREGSECT: -6,
    DIFSECT: -4,
    FATSECT: -3,
    ENDOFCHAIN: te,
    FREESECT: -1,
    HEADER_SIGNATURE: Te,
    HEADER_MINOR_VERSION: "3e00",
    MAXREGSID: -6,
    NOSTREAM: -1,
    HEADER_CLSID: Ue,
    EntryTypes: ["unknown", "storage", "stream", "lockbytes", "property", "root"]
  };
  function vr(p, T, v) {
    l();
    var _ = G(p, v);
    c.writeFileSync(T, _);
  }
  function Pe(p) {
    for (var T = new Array(p.length), v = 0; v < p.length; ++v)
      T[v] = String.fromCharCode(p[v]);
    return T.join("");
  }
  function ur(p, T) {
    var v = G(p, T);
    switch (T && T.type || "buffer") {
      case "file":
        return l(), c.writeFileSync(T.filename, v), v;
      case "binary":
        return typeof v == "string" ? v : Pe(v);
      case "base64":
        return bt(typeof v == "string" ? v : Pe(v));
      case "buffer":
        if (de)
          return Buffer.isBuffer(v) ? v : Lr(v);
      case "array":
        return typeof v == "string" ? _r(v) : v;
    }
    return v;
  }
  var ar;
  function S(p) {
    try {
      var T = p.InflateRaw, v = new T();
      if (v._processChunk(new Uint8Array([3, 0]), v._finishFlushFlag), v.bytesRead)
        ar = p;
      else
        throw new Error("zlib does not expose bytesRead");
    } catch (_) {
      console.error("cannot use native zlib: " + (_.message || _));
    }
  }
  function L(p, T) {
    if (!ar)
      return B0(p, T);
    var v = ar.InflateRaw, _ = new v(), E = _._processChunk(p.slice(p.l), _._finishFlushFlag);
    return p.l += _.bytesRead, E;
  }
  function C(p) {
    return ar ? ar.deflateRawSync(p) : R0(p);
  }
  var F = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], V = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258], se = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577];
  function fe(p) {
    var T = (p << 1 | p << 11) & 139536 | (p << 5 | p << 15) & 558144;
    return (T >> 16 | T >> 8 | T) & 255;
  }
  for (var ie = typeof Uint8Array < "u", ee = ie ? new Uint8Array(1 << 8) : [], we = 0; we < 1 << 8; ++we)
    ee[we] = fe(we);
  function he(p, T) {
    var v = ee[p & 255];
    return T <= 8 ? v >>> 8 - T : (v = v << 8 | ee[p >> 8 & 255], T <= 16 ? v >>> 16 - T : (v = v << 8 | ee[p >> 16 & 255], v >>> 24 - T));
  }
  function Ye(p, T) {
    var v = T & 7, _ = T >>> 3;
    return (p[_] | (v <= 6 ? 0 : p[_ + 1] << 8)) >>> v & 3;
  }
  function pe(p, T) {
    var v = T & 7, _ = T >>> 3;
    return (p[_] | (v <= 5 ? 0 : p[_ + 1] << 8)) >>> v & 7;
  }
  function Fr(p, T) {
    var v = T & 7, _ = T >>> 3;
    return (p[_] | (v <= 4 ? 0 : p[_ + 1] << 8)) >>> v & 15;
  }
  function Fe(p, T) {
    var v = T & 7, _ = T >>> 3;
    return (p[_] | (v <= 3 ? 0 : p[_ + 1] << 8)) >>> v & 31;
  }
  function ae(p, T) {
    var v = T & 7, _ = T >>> 3;
    return (p[_] | (v <= 1 ? 0 : p[_ + 1] << 8)) >>> v & 127;
  }
  function hr(p, T, v) {
    var _ = T & 7, E = T >>> 3, w = (1 << v) - 1, N = p[E] >>> _;
    return v < 8 - _ || (N |= p[E + 1] << 8 - _, v < 16 - _) || (N |= p[E + 2] << 16 - _, v < 24 - _) || (N |= p[E + 3] << 24 - _), N & w;
  }
  function Cr(p, T, v) {
    var _ = T & 7, E = T >>> 3;
    return _ <= 5 ? p[E] |= (v & 7) << _ : (p[E] |= v << _ & 255, p[E + 1] = (v & 7) >> 8 - _), T + 3;
  }
  function $r(p, T, v) {
    var _ = T & 7, E = T >>> 3;
    return v = (v & 1) << _, p[E] |= v, T + 1;
  }
  function lt(p, T, v) {
    var _ = T & 7, E = T >>> 3;
    return v <<= _, p[E] |= v & 255, v >>>= 8, p[E + 1] = v, T + 8;
  }
  function D0(p, T, v) {
    var _ = T & 7, E = T >>> 3;
    return v <<= _, p[E] |= v & 255, v >>>= 8, p[E + 1] = v & 255, p[E + 2] = v >>> 8, T + 16;
  }
  function Ln(p, T) {
    var v = p.length, _ = 2 * v > T ? 2 * v : T + 5, E = 0;
    if (v >= T)
      return p;
    if (de) {
      var w = z0(_);
      if (p.copy)
        p.copy(w);
      else
        for (; E < p.length; ++E)
          w[E] = p[E];
      return w;
    } else if (ie) {
      var N = new Uint8Array(_);
      if (N.set)
        N.set(p);
      else
        for (; E < v; ++E)
          N[E] = p[E];
      return N;
    }
    return p.length = _, p;
  }
  function wr(p) {
    for (var T = new Array(p), v = 0; v < p; ++v)
      T[v] = 0;
    return T;
  }
  function qt(p, T, v) {
    var _ = 1, E = 0, w = 0, N = 0, b = 0, k = p.length, I = ie ? new Uint16Array(32) : wr(32);
    for (w = 0; w < 32; ++w)
      I[w] = 0;
    for (w = k; w < v; ++w)
      p[w] = 0;
    k = p.length;
    var P = ie ? new Uint16Array(k) : wr(k);
    for (w = 0; w < k; ++w)
      I[E = p[w]]++, _ < E && (_ = E), P[w] = 0;
    for (I[0] = 0, w = 1; w <= _; ++w)
      I[w + 16] = b = b + I[w - 1] << 1;
    for (w = 0; w < k; ++w)
      b = p[w], b != 0 && (P[w] = I[b + 16]++);
    var z = 0;
    for (w = 0; w < k; ++w)
      if (z = p[w], z != 0)
        for (b = he(P[w], _) >> _ - z, N = (1 << _ + 4 - z) - 1; N >= 0; --N)
          T[b | N << z] = z & 15 | w << 4;
    return _;
  }
  var Bn = ie ? new Uint16Array(512) : wr(512), Mn = ie ? new Uint16Array(32) : wr(32);
  if (!ie) {
    for (var zr = 0; zr < 512; ++zr)
      Bn[zr] = 0;
    for (zr = 0; zr < 32; ++zr)
      Mn[zr] = 0;
  }
  (function() {
    for (var p = [], T = 0; T < 32; T++)
      p.push(5);
    qt(p, Mn, 32);
    var v = [];
    for (T = 0; T <= 143; T++)
      v.push(8);
    for (; T <= 255; T++)
      v.push(9);
    for (; T <= 279; T++)
      v.push(7);
    for (; T <= 287; T++)
      v.push(8);
    qt(v, Bn, 288);
  })();
  var As = /* @__PURE__ */ function() {
    for (var T = ie ? new Uint8Array(32768) : [], v = 0, _ = 0; v < se.length - 1; ++v)
      for (; _ < se[v + 1]; ++_)
        T[_] = v;
    for (; _ < 32768; ++_)
      T[_] = 29;
    var E = ie ? new Uint8Array(259) : [];
    for (v = 0, _ = 0; v < V.length - 1; ++v)
      for (; _ < V[v + 1]; ++_)
        E[_] = v;
    function w(b, k) {
      for (var I = 0; I < b.length; ) {
        var P = Math.min(65535, b.length - I), z = I + P == b.length;
        for (k.write_shift(1, +z), k.write_shift(2, P), k.write_shift(2, ~P & 65535); P-- > 0; )
          k[k.l++] = b[I++];
      }
      return k.l;
    }
    function N(b, k) {
      for (var I = 0, P = 0, z = ie ? new Uint16Array(32768) : []; P < b.length; ) {
        var Z = Math.min(65535, b.length - P);
        if (Z < 10) {
          for (I = Cr(k, I, +(P + Z == b.length)), I & 7 && (I += 8 - (I & 7)), k.l = I / 8 | 0, k.write_shift(2, Z), k.write_shift(2, ~Z & 65535); Z-- > 0; )
            k[k.l++] = b[P++];
          I = k.l * 8;
          continue;
        }
        I = Cr(k, I, +(P + Z == b.length) + 2);
        for (var ne = 0; Z-- > 0; ) {
          var Y = b[P];
          ne = (ne << 5 ^ Y) & 32767;
          var re = -1, le = 0;
          if ((re = z[ne]) && (re |= P & -32768, re > P && (re -= 32768), re < P))
            for (; b[re + le] == b[P + le] && le < 250; )
              ++le;
          if (le > 2) {
            Y = E[le], Y <= 22 ? I = lt(k, I, ee[Y + 1] >> 1) - 1 : (lt(k, I, 3), I += 5, lt(k, I, ee[Y - 23] >> 5), I += 3);
            var Ae = Y < 8 ? 0 : Y - 4 >> 2;
            Ae > 0 && (D0(k, I, le - V[Y]), I += Ae), Y = T[P - re], I = lt(k, I, ee[Y] >> 3), I -= 3;
            var ye = Y < 4 ? 0 : Y - 2 >> 1;
            ye > 0 && (D0(k, I, P - re - se[Y]), I += ye);
            for (var $e = 0; $e < le; ++$e)
              z[ne] = P & 32767, ne = (ne << 5 ^ b[P]) & 32767, ++P;
            Z -= le - 1;
          } else
            Y <= 143 ? Y = Y + 48 : I = $r(k, I, 1), I = lt(k, I, ee[Y]), z[ne] = P & 32767, ++P;
        }
        I = lt(k, I, 0) - 1;
      }
      return k.l = (I + 7) / 8 | 0, k.l;
    }
    return function(k, I) {
      return k.length < 8 ? w(k, I) : N(k, I);
    };
  }();
  function R0(p) {
    var T = M(50 + Math.floor(p.length * 1.1)), v = As(p, T);
    return T.slice(0, v);
  }
  var k0 = ie ? new Uint16Array(32768) : wr(32768), N0 = ie ? new Uint16Array(32768) : wr(32768), I0 = ie ? new Uint16Array(128) : wr(128), P0 = 1, L0 = 1;
  function ys(p, T) {
    var v = Fe(p, T) + 257;
    T += 5;
    var _ = Fe(p, T) + 1;
    T += 5;
    var E = Fr(p, T) + 4;
    T += 4;
    for (var w = 0, N = ie ? new Uint8Array(19) : wr(19), b = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], k = 1, I = ie ? new Uint8Array(8) : wr(8), P = ie ? new Uint8Array(8) : wr(8), z = N.length, Z = 0; Z < E; ++Z)
      N[F[Z]] = w = pe(p, T), k < w && (k = w), I[w]++, T += 3;
    var ne = 0;
    for (I[0] = 0, Z = 1; Z <= k; ++Z)
      P[Z] = ne = ne + I[Z - 1] << 1;
    for (Z = 0; Z < z; ++Z)
      (ne = N[Z]) != 0 && (b[Z] = P[ne]++);
    var Y = 0;
    for (Z = 0; Z < z; ++Z)
      if (Y = N[Z], Y != 0) {
        ne = ee[b[Z]] >> 8 - Y;
        for (var re = (1 << 7 - Y) - 1; re >= 0; --re)
          I0[ne | re << Y] = Y & 7 | Z << 3;
      }
    var le = [];
    for (k = 1; le.length < v + _; )
      switch (ne = I0[ae(p, T)], T += ne & 7, ne >>>= 3) {
        case 16:
          for (w = 3 + Ye(p, T), T += 2, ne = le[le.length - 1]; w-- > 0; )
            le.push(ne);
          break;
        case 17:
          for (w = 3 + pe(p, T), T += 3; w-- > 0; )
            le.push(0);
          break;
        case 18:
          for (w = 11 + ae(p, T), T += 7; w-- > 0; )
            le.push(0);
          break;
        default:
          le.push(ne), k < ne && (k = ne);
          break;
      }
    var Ae = le.slice(0, v), ye = le.slice(v);
    for (Z = v; Z < 286; ++Z)
      Ae[Z] = 0;
    for (Z = _; Z < 30; ++Z)
      ye[Z] = 0;
    return P0 = qt(Ae, k0, 286), L0 = qt(ye, N0, 30), T;
  }
  function Fs(p, T) {
    if (p[0] == 3 && !(p[1] & 3))
      return [et(T), 2];
    for (var v = 0, _ = 0, E = z0(T || 1 << 18), w = 0, N = E.length >>> 0, b = 0, k = 0; (_ & 1) == 0; ) {
      if (_ = pe(p, v), v += 3, _ >>> 1 == 0) {
        v & 7 && (v += 8 - (v & 7));
        var I = p[v >>> 3] | p[(v >>> 3) + 1] << 8;
        if (v += 32, I > 0)
          for (!T && N < w + I && (E = Ln(E, w + I), N = E.length); I-- > 0; )
            E[w++] = p[v >>> 3], v += 8;
        continue;
      } else
        _ >> 1 == 1 ? (b = 9, k = 5) : (v = ys(p, v), b = P0, k = L0);
      for (; ; ) {
        !T && N < w + 32767 && (E = Ln(E, w + 32767), N = E.length);
        var P = hr(p, v, b), z = _ >>> 1 == 1 ? Bn[P] : k0[P];
        if (v += z & 15, z >>>= 4, (z >>> 8 & 255) === 0)
          E[w++] = z;
        else {
          if (z == 256)
            break;
          z -= 257;
          var Z = z < 8 ? 0 : z - 4 >> 2;
          Z > 5 && (Z = 0);
          var ne = w + V[z];
          Z > 0 && (ne += hr(p, v, Z), v += Z), P = hr(p, v, k), z = _ >>> 1 == 1 ? Mn[P] : N0[P], v += z & 15, z >>>= 4;
          var Y = z < 4 ? 0 : z - 2 >> 1, re = se[z];
          for (Y > 0 && (re += hr(p, v, Y), v += Y), !T && N < ne && (E = Ln(E, ne + 100), N = E.length); w < ne; )
            E[w] = E[w - re], ++w;
        }
      }
    }
    return T ? [E, v + 7 >>> 3] : [E.slice(0, w), v + 7 >>> 3];
  }
  function B0(p, T) {
    var v = p.slice(p.l || 0), _ = Fs(v, T);
    return p.l += _[1], _[0];
  }
  function M0(p, T) {
    if (p)
      typeof console < "u" && console.error(T);
    else
      throw new Error(T);
  }
  function b0(p, T) {
    var v = p;
    sr(v, 0);
    var _ = [], E = [], w = {
      FileIndex: _,
      FullPaths: E
    };
    D(w, { root: T.root });
    for (var N = v.length - 4; (v[N] != 80 || v[N + 1] != 75 || v[N + 2] != 5 || v[N + 3] != 6) && N >= 0; )
      --N;
    v.l = N + 4, v.l += 4;
    var b = v.read_shift(2);
    v.l += 6;
    var k = v.read_shift(4);
    for (v.l = k, N = 0; N < b; ++N) {
      v.l += 20;
      var I = v.read_shift(4), P = v.read_shift(4), z = v.read_shift(2), Z = v.read_shift(2), ne = v.read_shift(2);
      v.l += 8;
      var Y = v.read_shift(4), re = f(v.slice(v.l + z, v.l + z + Z));
      v.l += z + Z + ne;
      var le = v.l;
      v.l = Y + 4, Cs(v, I, P, w, re), v.l = le;
    }
    return w;
  }
  function Cs(p, T, v, _, E) {
    p.l += 2;
    var w = p.read_shift(2), N = p.read_shift(2), b = s(p);
    if (w & 8257)
      throw new Error("Unsupported ZIP encryption");
    for (var k = p.read_shift(4), I = p.read_shift(4), P = p.read_shift(4), z = p.read_shift(2), Z = p.read_shift(2), ne = "", Y = 0; Y < z; ++Y)
      ne += String.fromCharCode(p[p.l++]);
    if (Z) {
      var re = f(p.slice(p.l, p.l + Z));
      (re[21589] || {}).mt && (b = re[21589].mt), ((E || {})[21589] || {}).mt && (b = E[21589].mt);
    }
    p.l += Z;
    var le = p.slice(p.l, p.l + I);
    switch (N) {
      case 8:
        le = L(p, P);
        break;
      case 0:
        break;
      default:
        throw new Error("Unsupported ZIP Compression method " + N);
    }
    var Ae = !1;
    w & 8 && (k = p.read_shift(4), k == 134695760 && (k = p.read_shift(4), Ae = !0), I = p.read_shift(4), P = p.read_shift(4)), I != T && M0(Ae, "Bad compressed size: " + T + " != " + I), P != v && M0(Ae, "Bad uncompressed size: " + v + " != " + P), bn(_, ne, le, { unsafe: !0, mt: b });
  }
  function Os(p, T) {
    var v = T || {}, _ = [], E = [], w = M(1), N = v.compression ? 8 : 0, b = 0, k = 0, I = 0, P = 0, z = 0, Z = p.FullPaths[0], ne = Z, Y = p.FileIndex[0], re = [], le = 0;
    for (k = 1; k < p.FullPaths.length; ++k)
      if (ne = p.FullPaths[k].slice(Z.length), Y = p.FileIndex[k], !(!Y.size || !Y.content || ne == "Sh33tJ5")) {
        var Ae = P, ye = M(ne.length);
        for (I = 0; I < ne.length; ++I)
          ye.write_shift(1, ne.charCodeAt(I) & 127);
        ye = ye.slice(0, ye.l), re[z] = bl.buf(Y.content, 0);
        var $e = Y.content;
        N == 8 && ($e = C($e)), w = M(30), w.write_shift(4, 67324752), w.write_shift(2, 20), w.write_shift(2, b), w.write_shift(2, N), Y.mt ? i(w, Y.mt) : w.write_shift(4, 0), w.write_shift(-4, re[z]), w.write_shift(4, $e.length), w.write_shift(4, Y.content.length), w.write_shift(2, ye.length), w.write_shift(2, 0), P += w.length, _.push(w), P += ye.length, _.push(ye), P += $e.length, _.push($e), w = M(46), w.write_shift(4, 33639248), w.write_shift(2, 0), w.write_shift(2, 20), w.write_shift(2, b), w.write_shift(2, N), w.write_shift(4, 0), w.write_shift(-4, re[z]), w.write_shift(4, $e.length), w.write_shift(4, Y.content.length), w.write_shift(2, ye.length), w.write_shift(2, 0), w.write_shift(2, 0), w.write_shift(2, 0), w.write_shift(2, 0), w.write_shift(4, 0), w.write_shift(4, Ae), le += w.l, E.push(w), le += ye.length, E.push(ye), ++z;
      }
    return w = M(22), w.write_shift(4, 101010256), w.write_shift(2, 0), w.write_shift(2, 0), w.write_shift(2, z), w.write_shift(2, z), w.write_shift(4, le), w.write_shift(4, P), w.write_shift(2, 0), Ve([Ve(_), Ve(E), w]);
  }
  var Jt = {
    htm: "text/html",
    xml: "text/xml",
    gif: "image/gif",
    jpg: "image/jpeg",
    png: "image/png",
    mso: "application/x-mso",
    thmx: "application/vnd.ms-officetheme",
    sh33tj5: "application/octet-stream"
  };
  function Ds(p, T) {
    if (p.ctype)
      return p.ctype;
    var v = p.name || "", _ = v.match(/\.([^\.]+)$/);
    return _ && Jt[_[1]] || T && (_ = (v = T).match(/[\.\\]([^\.\\])+$/), _ && Jt[_[1]]) ? Jt[_[1]] : "application/octet-stream";
  }
  function Rs(p) {
    for (var T = bt(p), v = [], _ = 0; _ < T.length; _ += 76)
      v.push(T.slice(_, _ + 76));
    return v.join(`\r
`) + `\r
`;
  }
  function ks(p) {
    var T = p.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7E-\xFF=]/g, function(I) {
      var P = I.charCodeAt(0).toString(16).toUpperCase();
      return "=" + (P.length == 1 ? "0" + P : P);
    });
    T = T.replace(/ $/mg, "=20").replace(/\t$/mg, "=09"), T.charAt(0) == `
` && (T = "=0D" + T.slice(1)), T = T.replace(/\r(?!\n)/mg, "=0D").replace(/\n\n/mg, `
=0A`).replace(/([^\r\n])\n/mg, "$1=0A");
    for (var v = [], _ = T.split(`\r
`), E = 0; E < _.length; ++E) {
      var w = _[E];
      if (w.length == 0) {
        v.push("");
        continue;
      }
      for (var N = 0; N < w.length; ) {
        var b = 76, k = w.slice(N, N + b);
        k.charAt(b - 1) == "=" ? b-- : k.charAt(b - 2) == "=" ? b -= 2 : k.charAt(b - 3) == "=" && (b -= 3), k = w.slice(N, N + b), N += b, N < w.length && (k += "="), v.push(k);
      }
    }
    return v.join(`\r
`);
  }
  function Ns(p) {
    for (var T = [], v = 0; v < p.length; ++v) {
      for (var _ = p[v]; v <= p.length && _.charAt(_.length - 1) == "="; )
        _ = _.slice(0, _.length - 1) + p[++v];
      T.push(_);
    }
    for (var E = 0; E < T.length; ++E)
      T[E] = T[E].replace(/[=][0-9A-Fa-f]{2}/g, function(w) {
        return String.fromCharCode(parseInt(w.slice(1), 16));
      });
    return _r(T.join(`\r
`));
  }
  function Is(p, T, v) {
    for (var _ = "", E = "", w = "", N, b = 0; b < 10; ++b) {
      var k = T[b];
      if (!k || k.match(/^\s*$/))
        break;
      var I = k.match(/^(.*?):\s*([^\s].*)$/);
      if (I)
        switch (I[1].toLowerCase()) {
          case "content-location":
            _ = I[2].trim();
            break;
          case "content-type":
            w = I[2].trim();
            break;
          case "content-transfer-encoding":
            E = I[2].trim();
            break;
        }
    }
    switch (++b, E.toLowerCase()) {
      case "base64":
        N = _r(Ir(T.slice(b).join("")));
        break;
      case "quoted-printable":
        N = Ns(T.slice(b));
        break;
      default:
        throw new Error("Unsupported Content-Transfer-Encoding " + E);
    }
    var P = bn(p, _.slice(v.length), N, { unsafe: !0 });
    w && (P.ctype = w);
  }
  function Ps(p, T) {
    if (Pe(p.slice(0, 13)).toLowerCase() != "mime-version:")
      throw new Error("Unsupported MAD header");
    var v = T && T.root || "", _ = (de && Buffer.isBuffer(p) ? p.toString("binary") : Pe(p)).split(`\r
`), E = 0, w = "";
    for (E = 0; E < _.length; ++E)
      if (w = _[E], !!/^Content-Location:/i.test(w) && (w = w.slice(w.indexOf("file")), v || (v = w.slice(0, w.lastIndexOf("/") + 1)), w.slice(0, v.length) != v))
        for (; v.length > 0 && (v = v.slice(0, v.length - 1), v = v.slice(0, v.lastIndexOf("/") + 1), w.slice(0, v.length) != v); )
          ;
    var N = (_[1] || "").match(/boundary="(.*?)"/);
    if (!N)
      throw new Error("MAD cannot find boundary");
    var b = "--" + (N[1] || ""), k = [], I = [], P = {
      FileIndex: k,
      FullPaths: I
    };
    D(P);
    var z, Z = 0;
    for (E = 0; E < _.length; ++E) {
      var ne = _[E];
      ne !== b && ne !== b + "--" || (Z++ && Is(P, _.slice(z, E), v), z = E);
    }
    return P;
  }
  function Ls(p, T) {
    var v = T || {}, _ = v.boundary || "SheetJS";
    _ = "------=" + _;
    for (var E = [
      "MIME-Version: 1.0",
      'Content-Type: multipart/related; boundary="' + _.slice(2) + '"',
      "",
      "",
      ""
    ], w = p.FullPaths[0], N = w, b = p.FileIndex[0], k = 1; k < p.FullPaths.length; ++k)
      if (N = p.FullPaths[k].slice(w.length), b = p.FileIndex[k], !(!b.size || !b.content || N == "Sh33tJ5")) {
        N = N.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7E-\xFF]/g, function(le) {
          return "_x" + le.charCodeAt(0).toString(16) + "_";
        }).replace(/[\u0080-\uFFFF]/g, function(le) {
          return "_u" + le.charCodeAt(0).toString(16) + "_";
        });
        for (var I = b.content, P = de && Buffer.isBuffer(I) ? I.toString("binary") : Pe(I), z = 0, Z = Math.min(1024, P.length), ne = 0, Y = 0; Y <= Z; ++Y)
          (ne = P.charCodeAt(Y)) >= 32 && ne < 128 && ++z;
        var re = z >= Z * 4 / 5;
        E.push(_), E.push("Content-Location: " + (v.root || "file:///C:/SheetJS/") + N), E.push("Content-Transfer-Encoding: " + (re ? "quoted-printable" : "base64")), E.push("Content-Type: " + Ds(b, N)), E.push(""), E.push(re ? ks(P) : Rs(P));
      }
    return E.push(_ + `--\r
`), E.join(`\r
`);
  }
  function Bs(p) {
    var T = {};
    return D(T, p), T;
  }
  function bn(p, T, v, _) {
    var E = _ && _.unsafe;
    E || D(p);
    var w = !E && Ee.find(p, T);
    if (!w) {
      var N = p.FullPaths[0];
      T.slice(0, N.length) == N ? N = T : (N.slice(-1) != "/" && (N += "/"), N = (N + T).replace("//", "/")), w = { name: a(T), type: 2 }, p.FileIndex.push(w), p.FullPaths.push(N), E || Ee.utils.cfb_gc(p);
    }
    return w.content = v, w.size = v ? v.length : 0, _ && (_.CLSID && (w.clsid = _.CLSID), _.mt && (w.mt = _.mt), _.ct && (w.ct = _.ct)), w;
  }
  function Ms(p, T) {
    D(p);
    var v = Ee.find(p, T);
    if (v) {
      for (var _ = 0; _ < p.FileIndex.length; ++_)
        if (p.FileIndex[_] == v)
          return p.FileIndex.splice(_, 1), p.FullPaths.splice(_, 1), !0;
    }
    return !1;
  }
  function bs(p, T, v) {
    D(p);
    var _ = Ee.find(p, T);
    if (_) {
      for (var E = 0; E < p.FileIndex.length; ++E)
        if (p.FileIndex[E] == _)
          return p.FileIndex[E].name = a(v), p.FullPaths[E] = v, !0;
    }
    return !1;
  }
  function Us(p) {
    B(p, !0);
  }
  return t.find = j, t.read = Q, t.parse = o, t.write = ur, t.writeFile = vr, t.utils = {
    cfb_new: Bs,
    cfb_add: bn,
    cfb_del: Ms,
    cfb_mov: bs,
    cfb_gc: Us,
    ReadShift: It,
    CheckField: wi,
    prep_blob: sr,
    bconcat: Ve,
    use_zlib: S,
    _deflateRaw: R0,
    _inflateRaw: B0,
    consts: De
  }, t;
}();
function Ul(e) {
  return typeof e == "string" ? Cn(e) : Array.isArray(e) ? ul(e) : e;
}
function jt(e, t, r) {
  if (typeof Deno < "u") {
    if (r && typeof t == "string")
      switch (r) {
        case "utf8":
          t = new TextEncoder(r).encode(t);
          break;
        case "binary":
          t = Cn(t);
          break;
        default:
          throw new Error("Unsupported encoding " + r);
      }
    return Deno.writeFileSync(e, t);
  }
  var n = r == "utf8" ? Dr(t) : t;
  if (typeof IE_SaveFile < "u")
    return IE_SaveFile(n, e);
  if (typeof Blob < "u") {
    var a = new Blob([Ul(n)], { type: "application/octet-stream" });
    if (typeof navigator < "u" && navigator.msSaveBlob)
      return navigator.msSaveBlob(a, e);
    if (typeof saveAs < "u")
      return saveAs(a, e);
    if (typeof URL < "u" && typeof document < "u" && document.createElement && URL.createObjectURL) {
      var i = URL.createObjectURL(a);
      if (typeof chrome == "object" && typeof (chrome.downloads || {}).download == "function")
        return URL.revokeObjectURL && typeof setTimeout < "u" && setTimeout(function() {
          URL.revokeObjectURL(i);
        }, 6e4), chrome.downloads.download({ url: i, filename: e, saveAs: !0 });
      var s = document.createElement("a");
      if (s.download != null)
        return s.download = e, s.href = i, document.body.appendChild(s), s.click(), document.body.removeChild(s), URL.revokeObjectURL && typeof setTimeout < "u" && setTimeout(function() {
          URL.revokeObjectURL(i);
        }, 6e4), i;
    }
  }
  if (typeof $ < "u" && typeof File < "u" && typeof Folder < "u")
    try {
      var f = File(e);
      return f.open("w"), f.encoding = "binary", Array.isArray(t) && (t = Xt(t)), f.write(t), f.close(), t;
    } catch (c) {
      if (!c.message || !c.message.match(/onstruct/))
        throw c;
    }
  throw new Error("cannot save file " + e);
}
function je(e) {
  for (var t = Object.keys(e), r = [], n = 0; n < t.length; ++n)
    Object.prototype.hasOwnProperty.call(e, t[n]) && r.push(t[n]);
  return r;
}
function ra(e, t) {
  for (var r = [], n = je(e), a = 0; a !== n.length; ++a)
    r[e[n[a]][t]] == null && (r[e[n[a]][t]] = n[a]);
  return r;
}
function c0(e) {
  for (var t = [], r = je(e), n = 0; n !== r.length; ++n)
    t[e[r[n]]] = r[n];
  return t;
}
function Rn(e) {
  for (var t = [], r = je(e), n = 0; n !== r.length; ++n)
    t[e[r[n]]] = parseInt(r[n], 10);
  return t;
}
function Hl(e) {
  for (var t = [], r = je(e), n = 0; n !== r.length; ++n)
    t[e[r[n]]] == null && (t[e[r[n]]] = []), t[e[r[n]]].push(r[n]);
  return t;
}
var vn = /* @__PURE__ */ new Date(1899, 11, 30, 0, 0, 0);
function rr(e, t) {
  var r = /* @__PURE__ */ e.getTime();
  t && (r -= 1462 * 24 * 60 * 60 * 1e3);
  var n = /* @__PURE__ */ vn.getTime() + (/* @__PURE__ */ e.getTimezoneOffset() - /* @__PURE__ */ vn.getTimezoneOffset()) * 6e4;
  return (r - n) / (24 * 60 * 60 * 1e3);
}
var ii = /* @__PURE__ */ new Date(), Wl = /* @__PURE__ */ vn.getTime() + (/* @__PURE__ */ ii.getTimezoneOffset() - /* @__PURE__ */ vn.getTimezoneOffset()) * 6e4, ta = /* @__PURE__ */ ii.getTimezoneOffset();
function si(e) {
  var t = new Date();
  return t.setTime(e * 24 * 60 * 60 * 1e3 + Wl), t.getTimezoneOffset() !== ta && t.setTime(t.getTime() + (t.getTimezoneOffset() - ta) * 6e4), t;
}
var na = /* @__PURE__ */ new Date("2017-02-19T19:06:09.000Z"), fi = /* @__PURE__ */ isNaN(/* @__PURE__ */ na.getFullYear()) ? /* @__PURE__ */ new Date("2/19/17") : na, Vl = /* @__PURE__ */ fi.getFullYear() == 2017;
function Ze(e, t) {
  var r = new Date(e);
  if (Vl)
    return t > 0 ? r.setTime(r.getTime() + r.getTimezoneOffset() * 60 * 1e3) : t < 0 && r.setTime(r.getTime() - r.getTimezoneOffset() * 60 * 1e3), r;
  if (e instanceof Date)
    return e;
  if (fi.getFullYear() == 1917 && !isNaN(r.getFullYear())) {
    var n = r.getFullYear();
    return e.indexOf("" + n) > -1 || r.setFullYear(r.getFullYear() + 100), r;
  }
  var a = e.match(/\d+/g) || ["2017", "2", "19", "0", "0", "0"], i = new Date(+a[0], +a[1] - 1, +a[2], +a[3] || 0, +a[4] || 0, +a[5] || 0);
  return e.indexOf("Z") > -1 && (i = new Date(i.getTime() - i.getTimezoneOffset() * 60 * 1e3)), i;
}
function kn(e, t) {
  if (de && Buffer.isBuffer(e)) {
    if (t) {
      if (e[0] == 255 && e[1] == 254)
        return Dr(e.slice(2).toString("utf16le"));
      if (e[1] == 254 && e[2] == 255)
        return Dr(cl(e.slice(2).toString("binary")));
    }
    return e.toString("binary");
  }
  if (typeof TextDecoder < "u")
    try {
      if (t) {
        if (e[0] == 255 && e[1] == 254)
          return Dr(new TextDecoder("utf-16le").decode(e.slice(2)));
        if (e[0] == 254 && e[1] == 255)
          return Dr(new TextDecoder("utf-16be").decode(e.slice(2)));
      }
      var r = {
        "\u20AC": "\x80",
        "\u201A": "\x82",
        \u0192: "\x83",
        "\u201E": "\x84",
        "\u2026": "\x85",
        "\u2020": "\x86",
        "\u2021": "\x87",
        "\u02C6": "\x88",
        "\u2030": "\x89",
        \u0160: "\x8A",
        "\u2039": "\x8B",
        \u0152: "\x8C",
        \u017D: "\x8E",
        "\u2018": "\x91",
        "\u2019": "\x92",
        "\u201C": "\x93",
        "\u201D": "\x94",
        "\u2022": "\x95",
        "\u2013": "\x96",
        "\u2014": "\x97",
        "\u02DC": "\x98",
        "\u2122": "\x99",
        \u0161: "\x9A",
        "\u203A": "\x9B",
        \u0153: "\x9C",
        \u017E: "\x9E",
        \u0178: "\x9F"
      };
      return Array.isArray(e) && (e = new Uint8Array(e)), new TextDecoder("latin1").decode(e).replace(/[€‚ƒ„…†‡ˆ‰Š‹ŒŽ‘’“”•–—˜™š›œžŸ]/g, function(i) {
        return r[i] || i;
      });
    } catch {
    }
  for (var n = [], a = 0; a != e.length; ++a)
    n.push(String.fromCharCode(e[a]));
  return n.join("");
}
function tr(e) {
  if (typeof JSON < "u" && !Array.isArray(e))
    return JSON.parse(JSON.stringify(e));
  if (typeof e != "object" || e == null)
    return e;
  if (e instanceof Date)
    return new Date(e.getTime());
  var t = {};
  for (var r in e)
    Object.prototype.hasOwnProperty.call(e, r) && (t[r] = tr(e[r]));
  return t;
}
function Ce(e, t) {
  for (var r = ""; r.length < t; )
    r += e;
  return r;
}
function kr(e) {
  var t = Number(e);
  if (!isNaN(t))
    return isFinite(t) ? t : NaN;
  if (!/\d/.test(e))
    return t;
  var r = 1, n = e.replace(/([\d]),([\d])/g, "$1$2").replace(/[$]/g, "").replace(/[%]/g, function() {
    return r *= 100, "";
  });
  return !isNaN(t = Number(n)) || (n = n.replace(/[(](.*)[)]/, function(a, i) {
    return r = -r, i;
  }), !isNaN(t = Number(n))) ? t / r : t;
}
var Gl = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
function Ut(e) {
  var t = new Date(e), r = new Date(NaN), n = t.getYear(), a = t.getMonth(), i = t.getDate();
  if (isNaN(i))
    return r;
  var s = e.toLowerCase();
  if (s.match(/jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec/)) {
    if (s = s.replace(/[^a-z]/g, "").replace(/([^a-z]|^)[ap]m?([^a-z]|$)/, ""), s.length > 3 && Gl.indexOf(s) == -1)
      return r;
  } else if (s.match(/[a-z]/))
    return r;
  return n < 0 || n > 8099 ? r : (a > 0 || i > 1) && n != 101 ? t : e.match(/[^-0-9:,\/\\]/) ? r : t;
}
function ce(e, t, r) {
  if (e.FullPaths) {
    if (typeof r == "string") {
      var n;
      return de ? n = Lr(r) : n = hl(r), Ee.utils.cfb_add(e, t, n);
    }
    Ee.utils.cfb_add(e, t, r);
  } else
    e.file(t, r);
}
function u0() {
  return Ee.utils.cfb_new();
}
var Ne = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\r
`, Xl = {
  "&quot;": '"',
  "&apos;": "'",
  "&gt;": ">",
  "&lt;": "<",
  "&amp;": "&"
}, h0 = /* @__PURE__ */ c0(Xl), x0 = /[&<>'"]/g, jl = /[\u0000-\u0008\u000b-\u001f]/g;
function ge(e) {
  var t = e + "";
  return t.replace(x0, function(r) {
    return h0[r];
  }).replace(jl, function(r) {
    return "_x" + ("000" + r.charCodeAt(0).toString(16)).slice(-4) + "_";
  });
}
function aa(e) {
  return ge(e).replace(/ /g, "_x0020_");
}
var li = /[\u0000-\u001f]/g;
function $l(e) {
  var t = e + "";
  return t.replace(x0, function(r) {
    return h0[r];
  }).replace(/\n/g, "<br/>").replace(li, function(r) {
    return "&#x" + ("000" + r.charCodeAt(0).toString(16)).slice(-4) + ";";
  });
}
function zl(e) {
  var t = e + "";
  return t.replace(x0, function(r) {
    return h0[r];
  }).replace(li, function(r) {
    return "&#x" + r.charCodeAt(0).toString(16).toUpperCase() + ";";
  });
}
function Kl(e) {
  return e.replace(/(\r\n|[\r\n])/g, "&#10;");
}
function Yl(e) {
  switch (e) {
    case 1:
    case !0:
    case "1":
    case "true":
    case "TRUE":
      return !0;
    default:
      return !1;
  }
}
function Gn(e) {
  for (var t = "", r = 0, n = 0, a = 0, i = 0, s = 0, f = 0; r < e.length; ) {
    if (n = e.charCodeAt(r++), n < 128) {
      t += String.fromCharCode(n);
      continue;
    }
    if (a = e.charCodeAt(r++), n > 191 && n < 224) {
      s = (n & 31) << 6, s |= a & 63, t += String.fromCharCode(s);
      continue;
    }
    if (i = e.charCodeAt(r++), n < 240) {
      t += String.fromCharCode((n & 15) << 12 | (a & 63) << 6 | i & 63);
      continue;
    }
    s = e.charCodeAt(r++), f = ((n & 7) << 18 | (a & 63) << 12 | (i & 63) << 6 | s & 63) - 65536, t += String.fromCharCode(55296 + (f >>> 10 & 1023)), t += String.fromCharCode(56320 + (f & 1023));
  }
  return t;
}
function ia(e) {
  var t = et(2 * e.length), r, n, a = 1, i = 0, s = 0, f;
  for (n = 0; n < e.length; n += a)
    a = 1, (f = e.charCodeAt(n)) < 128 ? r = f : f < 224 ? (r = (f & 31) * 64 + (e.charCodeAt(n + 1) & 63), a = 2) : f < 240 ? (r = (f & 15) * 4096 + (e.charCodeAt(n + 1) & 63) * 64 + (e.charCodeAt(n + 2) & 63), a = 3) : (a = 4, r = (f & 7) * 262144 + (e.charCodeAt(n + 1) & 63) * 4096 + (e.charCodeAt(n + 2) & 63) * 64 + (e.charCodeAt(n + 3) & 63), r -= 65536, s = 55296 + (r >>> 10 & 1023), r = 56320 + (r & 1023)), s !== 0 && (t[i++] = s & 255, t[i++] = s >>> 8, s = 0), t[i++] = r % 256, t[i++] = r >>> 8;
  return t.slice(0, i).toString("ucs2");
}
function sa(e) {
  return Lr(e, "binary").toString("utf8");
}
var rn = "foo bar baz\xE2\x98\x83\xF0\x9F\x8D\xA3", Nt = de && (/* @__PURE__ */ sa(rn) == /* @__PURE__ */ Gn(rn) && sa || /* @__PURE__ */ ia(rn) == /* @__PURE__ */ Gn(rn) && ia) || Gn, Dr = de ? function(e) {
  return Lr(e, "utf8").toString("binary");
} : function(e) {
  for (var t = [], r = 0, n = 0, a = 0; r < e.length; )
    switch (n = e.charCodeAt(r++), !0) {
      case n < 128:
        t.push(String.fromCharCode(n));
        break;
      case n < 2048:
        t.push(String.fromCharCode(192 + (n >> 6))), t.push(String.fromCharCode(128 + (n & 63)));
        break;
      case (n >= 55296 && n < 57344):
        n -= 55296, a = e.charCodeAt(r++) - 56320 + (n << 10), t.push(String.fromCharCode(240 + (a >> 18 & 7))), t.push(String.fromCharCode(144 + (a >> 12 & 63))), t.push(String.fromCharCode(128 + (a >> 6 & 63))), t.push(String.fromCharCode(128 + (a & 63)));
        break;
      default:
        t.push(String.fromCharCode(224 + (n >> 12))), t.push(String.fromCharCode(128 + (n >> 6 & 63))), t.push(String.fromCharCode(128 + (n & 63)));
    }
  return t.join("");
}, ql = /* @__PURE__ */ function() {
  var e = [
    ["nbsp", " "],
    ["middot", "\xB7"],
    ["quot", '"'],
    ["apos", "'"],
    ["gt", ">"],
    ["lt", "<"],
    ["amp", "&"]
  ].map(function(t) {
    return [new RegExp("&" + t[0] + ";", "ig"), t[1]];
  });
  return function(r) {
    for (var n = r.replace(/^[\t\n\r ]+/, "").replace(/[\t\n\r ]+$/, "").replace(/>\s+/g, ">").replace(/\s+</g, "<").replace(/[\t\n\r ]+/g, " ").replace(/<\s*[bB][rR]\s*\/?>/g, `
`).replace(/<[^>]*>/g, ""), a = 0; a < e.length; ++a)
      n = n.replace(e[a][0], e[a][1]);
    return n;
  };
}(), oi = /(^\s|\s$|\n)/;
function Ge(e, t) {
  return "<" + e + (t.match(oi) ? ' xml:space="preserve"' : "") + ">" + t + "</" + e + ">";
}
function Ht(e) {
  return je(e).map(function(t) {
    return " " + t + '="' + e[t] + '"';
  }).join("");
}
function q(e, t, r) {
  return "<" + e + (r != null ? Ht(r) : "") + (t != null ? (t.match(oi) ? ' xml:space="preserve"' : "") + ">" + t + "</" + e : "/") + ">";
}
function Zn(e, t) {
  try {
    return e.toISOString().replace(/\.\d*/, "");
  } catch (r) {
    if (t)
      throw r;
  }
  return "";
}
function Jl(e, t) {
  switch (typeof e) {
    case "string":
      var r = q("vt:lpwstr", ge(e));
      return t && (r = r.replace(/&quot;/g, "_x0022_")), r;
    case "number":
      return q((e | 0) == e ? "vt:i4" : "vt:r8", ge(String(e)));
    case "boolean":
      return q("vt:bool", e ? "true" : "false");
  }
  if (e instanceof Date)
    return q("vt:filetime", Zn(e));
  throw new Error("Unable to serialize " + e);
}
var Be = {
  CORE_PROPS: "http://schemas.openxmlformats.org/package/2006/metadata/core-properties",
  CUST_PROPS: "http://schemas.openxmlformats.org/officeDocument/2006/custom-properties",
  EXT_PROPS: "http://schemas.openxmlformats.org/officeDocument/2006/extended-properties",
  CT: "http://schemas.openxmlformats.org/package/2006/content-types",
  RELS: "http://schemas.openxmlformats.org/package/2006/relationships",
  TCMNT: "http://schemas.microsoft.com/office/spreadsheetml/2018/threadedcomments",
  dc: "http://purl.org/dc/elements/1.1/",
  dcterms: "http://purl.org/dc/terms/",
  dcmitype: "http://purl.org/dc/dcmitype/",
  mx: "http://schemas.microsoft.com/office/mac/excel/2008/main",
  r: "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
  sjs: "http://schemas.openxmlformats.org/package/2006/sheetjs/core-properties",
  vt: "http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes",
  xsi: "http://www.w3.org/2001/XMLSchema-instance",
  xsd: "http://www.w3.org/2001/XMLSchema"
}, Et = [
  "http://schemas.openxmlformats.org/spreadsheetml/2006/main",
  "http://purl.oclc.org/ooxml/spreadsheetml/main",
  "http://schemas.microsoft.com/office/excel/2006/main",
  "http://schemas.microsoft.com/office/excel/2006/2"
], fr = {
  o: "urn:schemas-microsoft-com:office:office",
  x: "urn:schemas-microsoft-com:office:excel",
  ss: "urn:schemas-microsoft-com:office:spreadsheet",
  dt: "uuid:C2F41010-65B3-11d1-A29F-00AA00C14882",
  mv: "http://macVmlSchemaUri",
  v: "urn:schemas-microsoft-com:vml",
  html: "http://www.w3.org/TR/REC-html40"
};
function Zl(e, t) {
  for (var r = 1 - 2 * (e[t + 7] >>> 7), n = ((e[t + 7] & 127) << 4) + (e[t + 6] >>> 4 & 15), a = e[t + 6] & 15, i = 5; i >= 0; --i)
    a = a * 256 + e[t + i];
  return n == 2047 ? a == 0 ? r * (1 / 0) : NaN : (n == 0 ? n = -1022 : (n -= 1023, a += Math.pow(2, 52)), r * Math.pow(2, n - 52) * a);
}
function Ql(e, t, r) {
  var n = (t < 0 || 1 / t == -1 / 0 ? 1 : 0) << 7, a = 0, i = 0, s = n ? -t : t;
  isFinite(s) ? s == 0 ? a = i = 0 : (a = Math.floor(Math.log(s) / Math.LN2), i = s * Math.pow(2, 52 - a), a <= -1023 && (!isFinite(i) || i < Math.pow(2, 52)) ? a = -1022 : (i -= Math.pow(2, 52), a += 1023)) : (a = 2047, i = isNaN(t) ? 26985 : 0);
  for (var f = 0; f <= 5; ++f, i /= 256)
    e[r + f] = i & 255;
  e[r + 6] = (a & 15) << 4 | i & 15, e[r + 7] = a >> 4 | n;
}
var fa = function(e) {
  for (var t = [], r = 10240, n = 0; n < e[0].length; ++n)
    if (e[0][n])
      for (var a = 0, i = e[0][n].length; a < i; a += r)
        t.push.apply(t, e[0][n].slice(a, a + r));
  return t;
}, la = de ? function(e) {
  return e[0].length > 0 && Buffer.isBuffer(e[0][0]) ? Buffer.concat(e[0].map(function(t) {
    return Buffer.isBuffer(t) ? t : Lr(t);
  })) : fa(e);
} : fa, oa = function(e, t, r) {
  for (var n = [], a = t; a < r; a += 2)
    n.push(String.fromCharCode(Rt(e, a)));
  return n.join("").replace(kt, "");
}, d0 = de ? function(e, t, r) {
  return Buffer.isBuffer(e) ? e.toString("utf16le", t, r).replace(kt, "") : oa(e, t, r);
} : oa, ca = function(e, t, r) {
  for (var n = [], a = t; a < t + r; ++a)
    n.push(("0" + e[a].toString(16)).slice(-2));
  return n.join("");
}, ci = de ? function(e, t, r) {
  return Buffer.isBuffer(e) ? e.toString("hex", t, t + r) : ca(e, t, r);
} : ca, ua = function(e, t, r) {
  for (var n = [], a = t; a < r; a++)
    n.push(String.fromCharCode(ht(e, a)));
  return n.join("");
}, $t = de ? function(t, r, n) {
  return Buffer.isBuffer(t) ? t.toString("utf8", r, n) : ua(t, r, n);
} : ua, ui = function(e, t) {
  var r = lr(e, t);
  return r > 0 ? $t(e, t + 4, t + 4 + r - 1) : "";
}, hi = ui, xi = function(e, t) {
  var r = lr(e, t);
  return r > 0 ? $t(e, t + 4, t + 4 + r - 1) : "";
}, di = xi, pi = function(e, t) {
  var r = 2 * lr(e, t);
  return r > 0 ? $t(e, t + 4, t + 4 + r - 1) : "";
}, vi = pi, mi = function(t, r) {
  var n = lr(t, r);
  return n > 0 ? d0(t, r + 4, r + 4 + n) : "";
}, gi = mi, _i = function(e, t) {
  var r = lr(e, t);
  return r > 0 ? $t(e, t + 4, t + 4 + r) : "";
}, Ti = _i, Ei = function(e, t) {
  return Zl(e, t);
}, mn = Ei, p0 = function(t) {
  return Array.isArray(t) || typeof Uint8Array < "u" && t instanceof Uint8Array;
};
de && (hi = function(t, r) {
  if (!Buffer.isBuffer(t))
    return ui(t, r);
  var n = t.readUInt32LE(r);
  return n > 0 ? t.toString("utf8", r + 4, r + 4 + n - 1) : "";
}, di = function(t, r) {
  if (!Buffer.isBuffer(t))
    return xi(t, r);
  var n = t.readUInt32LE(r);
  return n > 0 ? t.toString("utf8", r + 4, r + 4 + n - 1) : "";
}, vi = function(t, r) {
  if (!Buffer.isBuffer(t))
    return pi(t, r);
  var n = 2 * t.readUInt32LE(r);
  return t.toString("utf16le", r + 4, r + 4 + n - 1);
}, gi = function(t, r) {
  if (!Buffer.isBuffer(t))
    return mi(t, r);
  var n = t.readUInt32LE(r);
  return t.toString("utf16le", r + 4, r + 4 + n);
}, Ti = function(t, r) {
  if (!Buffer.isBuffer(t))
    return _i(t, r);
  var n = t.readUInt32LE(r);
  return t.toString("utf8", r + 4, r + 4 + n);
}, mn = function(t, r) {
  return Buffer.isBuffer(t) ? t.readDoubleLE(r) : Ei(t, r);
}, p0 = function(t) {
  return Buffer.isBuffer(t) || Array.isArray(t) || typeof Uint8Array < "u" && t instanceof Uint8Array;
});
var ht = function(e, t) {
  return e[t];
}, Rt = function(e, t) {
  return e[t + 1] * (1 << 8) + e[t];
}, eo = function(e, t) {
  var r = e[t + 1] * 256 + e[t];
  return r < 32768 ? r : (65535 - r + 1) * -1;
}, lr = function(e, t) {
  return e[t + 3] * (1 << 24) + (e[t + 2] << 16) + (e[t + 1] << 8) + e[t];
}, qr = function(e, t) {
  return e[t + 3] << 24 | e[t + 2] << 16 | e[t + 1] << 8 | e[t];
}, ro = function(e, t) {
  return e[t] << 24 | e[t + 1] << 16 | e[t + 2] << 8 | e[t + 3];
};
function It(e, t) {
  var r = "", n, a, i = [], s, f, c, l;
  switch (t) {
    case "dbcs":
      if (l = this.l, de && Buffer.isBuffer(this))
        r = this.slice(this.l, this.l + 2 * e).toString("utf16le");
      else
        for (c = 0; c < e; ++c)
          r += String.fromCharCode(Rt(this, l)), l += 2;
      e *= 2;
      break;
    case "utf8":
      r = $t(this, this.l, this.l + e);
      break;
    case "utf16le":
      e *= 2, r = d0(this, this.l, this.l + e);
      break;
    case "wstr":
      return It.call(this, e, "dbcs");
    case "lpstr-ansi":
      r = hi(this, this.l), e = 4 + lr(this, this.l);
      break;
    case "lpstr-cp":
      r = di(this, this.l), e = 4 + lr(this, this.l);
      break;
    case "lpwstr":
      r = vi(this, this.l), e = 4 + 2 * lr(this, this.l);
      break;
    case "lpp4":
      e = 4 + lr(this, this.l), r = gi(this, this.l), e & 2 && (e += 2);
      break;
    case "8lpp4":
      e = 4 + lr(this, this.l), r = Ti(this, this.l), e & 3 && (e += 4 - (e & 3));
      break;
    case "cstr":
      for (e = 0, r = ""; (s = ht(this, this.l + e++)) !== 0; )
        i.push(Zt(s));
      r = i.join("");
      break;
    case "_wstr":
      for (e = 0, r = ""; (s = Rt(this, this.l + e)) !== 0; )
        i.push(Zt(s)), e += 2;
      e += 2, r = i.join("");
      break;
    case "dbcs-cont":
      for (r = "", l = this.l, c = 0; c < e; ++c) {
        if (this.lens && this.lens.indexOf(l) !== -1)
          return s = ht(this, l), this.l = l + 1, f = It.call(this, e - c, s ? "dbcs-cont" : "sbcs-cont"), i.join("") + f;
        i.push(Zt(Rt(this, l))), l += 2;
      }
      r = i.join(""), e *= 2;
      break;
    case "cpstr":
    case "sbcs-cont":
      for (r = "", l = this.l, c = 0; c != e; ++c) {
        if (this.lens && this.lens.indexOf(l) !== -1)
          return s = ht(this, l), this.l = l + 1, f = It.call(this, e - c, s ? "dbcs-cont" : "sbcs-cont"), i.join("") + f;
        i.push(Zt(ht(this, l))), l += 1;
      }
      r = i.join("");
      break;
    default:
      switch (e) {
        case 1:
          return n = ht(this, this.l), this.l++, n;
        case 2:
          return n = (t === "i" ? eo : Rt)(this, this.l), this.l += 2, n;
        case 4:
        case -4:
          return t === "i" || (this[this.l + 3] & 128) === 0 ? (n = (e > 0 ? qr : ro)(this, this.l), this.l += 4, n) : (a = lr(this, this.l), this.l += 4, a);
        case 8:
        case -8:
          if (t === "f")
            return e == 8 ? a = mn(this, this.l) : a = mn([this[this.l + 7], this[this.l + 6], this[this.l + 5], this[this.l + 4], this[this.l + 3], this[this.l + 2], this[this.l + 1], this[this.l + 0]], 0), this.l += 8, a;
          e = 8;
        case 16:
          r = ci(this, this.l, e);
          break;
      }
  }
  return this.l += e, r;
}
var to = function(e, t, r) {
  e[r] = t & 255, e[r + 1] = t >>> 8 & 255, e[r + 2] = t >>> 16 & 255, e[r + 3] = t >>> 24 & 255;
}, no = function(e, t, r) {
  e[r] = t & 255, e[r + 1] = t >> 8 & 255, e[r + 2] = t >> 16 & 255, e[r + 3] = t >> 24 & 255;
}, ao = function(e, t, r) {
  e[r] = t & 255, e[r + 1] = t >>> 8 & 255;
};
function io(e, t, r) {
  var n = 0, a = 0;
  if (r === "dbcs") {
    for (a = 0; a != t.length; ++a)
      ao(this, t.charCodeAt(a), this.l + 2 * a);
    n = 2 * t.length;
  } else if (r === "sbcs") {
    for (t = t.replace(/[^\x00-\x7F]/g, "_"), a = 0; a != t.length; ++a)
      this[this.l + a] = t.charCodeAt(a) & 255;
    n = t.length;
  } else if (r === "hex") {
    for (; a < e; ++a)
      this[this.l++] = parseInt(t.slice(2 * a, 2 * a + 2), 16) || 0;
    return this;
  } else if (r === "utf16le") {
    var i = Math.min(this.l + e, this.length);
    for (a = 0; a < Math.min(t.length, e); ++a) {
      var s = t.charCodeAt(a);
      this[this.l++] = s & 255, this[this.l++] = s >> 8;
    }
    for (; this.l < i; )
      this[this.l++] = 0;
    return this;
  } else
    switch (e) {
      case 1:
        n = 1, this[this.l] = t & 255;
        break;
      case 2:
        n = 2, this[this.l] = t & 255, t >>>= 8, this[this.l + 1] = t & 255;
        break;
      case 3:
        n = 3, this[this.l] = t & 255, t >>>= 8, this[this.l + 1] = t & 255, t >>>= 8, this[this.l + 2] = t & 255;
        break;
      case 4:
        n = 4, to(this, t, this.l);
        break;
      case 8:
        if (n = 8, r === "f") {
          Ql(this, t, this.l);
          break;
        }
      case 16:
        break;
      case -4:
        n = 4, no(this, t, this.l);
        break;
    }
  return this.l += n, this;
}
function wi(e, t) {
  var r = ci(this, this.l, e.length >> 1);
  if (r !== e)
    throw new Error(t + "Expected " + e + " saw " + r);
  this.l += e.length >> 1;
}
function sr(e, t) {
  e.l = t, e.read_shift = It, e.chk = wi, e.write_shift = io;
}
function yr(e, t) {
  e.l += t;
}
function M(e) {
  var t = et(e);
  return sr(t, 0), t;
}
function er() {
  var e = [], t = de ? 256 : 2048, r = function(l) {
    var o = M(l);
    return sr(o, 0), o;
  }, n = r(t), a = function() {
    !n || (n.length > n.l && (n = n.slice(0, n.l), n.l = n.length), n.length > 0 && e.push(n), n = null);
  }, i = function(l) {
    return n && l < n.length - n.l ? n : (a(), n = r(Math.max(l + 1, t)));
  }, s = function() {
    return a(), Ve(e);
  }, f = function(l) {
    a(), n = l, n.l == null && (n.l = n.length), i(t);
  };
  return { next: i, push: f, end: s, _bufs: e };
}
function H(e, t, r, n) {
  var a = +t, i;
  if (!isNaN(a)) {
    n || (n = Qx[a].p || (r || []).length || 0), i = 1 + (a >= 128 ? 1 : 0) + 1, n >= 128 && ++i, n >= 16384 && ++i, n >= 2097152 && ++i;
    var s = e.next(i);
    a <= 127 ? s.write_shift(1, a) : (s.write_shift(1, (a & 127) + 128), s.write_shift(1, a >> 7));
    for (var f = 0; f != 4; ++f)
      if (n >= 128)
        s.write_shift(1, (n & 127) + 128), n >>= 7;
      else {
        s.write_shift(1, n);
        break;
      }
    n > 0 && p0(r) && e.push(r);
  }
}
function Pt(e, t, r) {
  var n = tr(e);
  if (t.s ? (n.cRel && (n.c += t.s.c), n.rRel && (n.r += t.s.r)) : (n.cRel && (n.c += t.c), n.rRel && (n.r += t.r)), !r || r.biff < 12) {
    for (; n.c >= 256; )
      n.c -= 256;
    for (; n.r >= 65536; )
      n.r -= 65536;
  }
  return n;
}
function ha(e, t, r) {
  var n = tr(e);
  return n.s = Pt(n.s, t.s, r), n.e = Pt(n.e, t.s, r), n;
}
function Lt(e, t) {
  if (e.cRel && e.c < 0)
    for (e = tr(e); e.c < 0; )
      e.c += t > 8 ? 16384 : 256;
  if (e.rRel && e.r < 0)
    for (e = tr(e); e.r < 0; )
      e.r += t > 8 ? 1048576 : t > 5 ? 65536 : 16384;
  var r = _e(e);
  return !e.cRel && e.cRel != null && (r = lo(r)), !e.rRel && e.rRel != null && (r = so(r)), r;
}
function Xn(e, t) {
  return e.s.r == 0 && !e.s.rRel && e.e.r == (t.biff >= 12 ? 1048575 : t.biff >= 8 ? 65536 : 16384) && !e.e.rRel ? (e.s.cRel ? "" : "$") + ze(e.s.c) + ":" + (e.e.cRel ? "" : "$") + ze(e.e.c) : e.s.c == 0 && !e.s.cRel && e.e.c == (t.biff >= 12 ? 16383 : 255) && !e.e.cRel ? (e.s.rRel ? "" : "$") + Xe(e.s.r) + ":" + (e.e.rRel ? "" : "$") + Xe(e.e.r) : Lt(e.s, t.biff) + ":" + Lt(e.e, t.biff);
}
function v0(e) {
  return parseInt(fo(e), 10) - 1;
}
function Xe(e) {
  return "" + (e + 1);
}
function so(e) {
  return e.replace(/([A-Z]|^)(\d+)$/, "$1$$$2");
}
function fo(e) {
  return e.replace(/\$(\d+)$/, "$1");
}
function m0(e) {
  for (var t = oo(e), r = 0, n = 0; n !== t.length; ++n)
    r = 26 * r + t.charCodeAt(n) - 64;
  return r - 1;
}
function ze(e) {
  if (e < 0)
    throw new Error("invalid column " + e);
  var t = "";
  for (++e; e; e = Math.floor((e - 1) / 26))
    t = String.fromCharCode((e - 1) % 26 + 65) + t;
  return t;
}
function lo(e) {
  return e.replace(/^([A-Z])/, "$$$1");
}
function oo(e) {
  return e.replace(/^\$([A-Z])/, "$1");
}
function co(e) {
  return e.replace(/(\$?[A-Z]*)(\$?\d*)/, "$1,$2").split(",");
}
function Me(e) {
  for (var t = 0, r = 0, n = 0; n < e.length; ++n) {
    var a = e.charCodeAt(n);
    a >= 48 && a <= 57 ? t = 10 * t + (a - 48) : a >= 65 && a <= 90 && (r = 26 * r + (a - 64));
  }
  return { c: r - 1, r: t - 1 };
}
function _e(e) {
  for (var t = e.c + 1, r = ""; t; t = (t - 1) / 26 | 0)
    r = String.fromCharCode((t - 1) % 26 + 65) + r;
  return r + (e.r + 1);
}
function cr(e) {
  var t = e.indexOf(":");
  return t == -1 ? { s: Me(e), e: Me(e) } : { s: Me(e.slice(0, t)), e: Me(e.slice(t + 1)) };
}
function ke(e, t) {
  return typeof t > "u" || typeof t == "number" ? ke(e.s, e.e) : (typeof e != "string" && (e = _e(e)), typeof t != "string" && (t = _e(t)), e == t ? e : e + ":" + t);
}
function Se(e) {
  var t = { s: { c: 0, r: 0 }, e: { c: 0, r: 0 } }, r = 0, n = 0, a = 0, i = e.length;
  for (r = 0; n < i && !((a = e.charCodeAt(n) - 64) < 1 || a > 26); ++n)
    r = 26 * r + a;
  for (t.s.c = --r, r = 0; n < i && !((a = e.charCodeAt(n) - 48) < 0 || a > 9); ++n)
    r = 10 * r + a;
  if (t.s.r = --r, n === i || a != 10)
    return t.e.c = t.s.c, t.e.r = t.s.r, t;
  for (++n, r = 0; n != i && !((a = e.charCodeAt(n) - 64) < 1 || a > 26); ++n)
    r = 26 * r + a;
  for (t.e.c = --r, r = 0; n != i && !((a = e.charCodeAt(n) - 48) < 0 || a > 9); ++n)
    r = 10 * r + a;
  return t.e.r = --r, t;
}
function xa(e, t) {
  var r = e.t == "d" && t instanceof Date;
  if (e.z != null)
    try {
      return e.w = Vr(e.z, r ? rr(t) : t);
    } catch {
    }
  try {
    return e.w = Vr((e.XF || {}).numFmtId || (r ? 14 : 0), r ? rr(t) : t);
  } catch {
    return "" + t;
  }
}
function Pr(e, t, r) {
  return e == null || e.t == null || e.t == "z" ? "" : e.w !== void 0 ? e.w : (e.t == "d" && !e.z && r && r.dateNF && (e.z = r.dateNF), e.t == "e" ? zt[e.v] || e.v : t == null ? xa(e, e.v) : xa(e, t));
}
function nt(e, t) {
  var r = t && t.sheet ? t.sheet : "Sheet1", n = {};
  return n[r] = e, { SheetNames: [r], Sheets: n };
}
function Si(e, t, r) {
  var n = r || {}, a = e ? Array.isArray(e) : n.dense, i = e || (a ? [] : {}), s = 0, f = 0;
  if (i && n.origin != null) {
    if (typeof n.origin == "number")
      s = n.origin;
    else {
      var c = typeof n.origin == "string" ? Me(n.origin) : n.origin;
      s = c.r, f = c.c;
    }
    i["!ref"] || (i["!ref"] = "A1:A1");
  }
  var l = { s: { c: 1e7, r: 1e7 }, e: { c: 0, r: 0 } };
  if (i["!ref"]) {
    var o = Se(i["!ref"]);
    l.s.c = o.s.c, l.s.r = o.s.r, l.e.c = Math.max(l.e.c, o.e.c), l.e.r = Math.max(l.e.r, o.e.r), s == -1 && (l.e.r = s = o.e.r + 1);
  }
  for (var u = 0; u != t.length; ++u)
    if (!!t[u]) {
      if (!Array.isArray(t[u]))
        throw new Error("aoa_to_sheet expects an array of arrays");
      for (var h = 0; h != t[u].length; ++h)
        if (!(typeof t[u][h] > "u")) {
          var d = { v: t[u][h] }, g = s + u, x = f + h;
          if (l.s.r > g && (l.s.r = g), l.s.c > x && (l.s.c = x), l.e.r < g && (l.e.r = g), l.e.c < x && (l.e.c = x), t[u][h] && typeof t[u][h] == "object" && !Array.isArray(t[u][h]) && !(t[u][h] instanceof Date))
            d = t[u][h];
          else if (Array.isArray(d.v) && (d.f = t[u][h][1], d.v = d.v[0]), d.v === null)
            if (d.f)
              d.t = "n";
            else if (n.nullError)
              d.t = "e", d.v = 0;
            else if (n.sheetStubs)
              d.t = "z";
            else
              continue;
          else
            typeof d.v == "number" ? d.t = "n" : typeof d.v == "boolean" ? d.t = "b" : d.v instanceof Date ? (d.z = n.dateNF || Oe[14], n.cellDates ? (d.t = "d", d.w = Vr(d.z, rr(d.v))) : (d.t = "n", d.v = rr(d.v), d.w = Vr(d.z, d.v))) : d.t = "s";
          if (a)
            i[g] || (i[g] = []), i[g][x] && i[g][x].z && (d.z = i[g][x].z), i[g][x] = d;
          else {
            var m = _e({ c: x, r: g });
            i[m] && i[m].z && (d.z = i[m].z), i[m] = d;
          }
        }
    }
  return l.s.c < 1e7 && (i["!ref"] = ke(l)), i;
}
function wt(e, t) {
  return Si(null, e, t);
}
function uo(e) {
  return e.read_shift(4, "i");
}
function Er(e, t) {
  return t || (t = M(4)), t.write_shift(4, e), t;
}
function Ke(e) {
  var t = e.read_shift(4);
  return t === 0 ? "" : e.read_shift(t, "dbcs");
}
function be(e, t) {
  var r = !1;
  return t == null && (r = !0, t = M(4 + 2 * e.length)), t.write_shift(4, e.length), e.length > 0 && t.write_shift(0, e, "dbcs"), r ? t.slice(0, t.l) : t;
}
function ho(e) {
  return { ich: e.read_shift(2), ifnt: e.read_shift(2) };
}
function xo(e, t) {
  return t || (t = M(4)), t.write_shift(2, e.ich || 0), t.write_shift(2, e.ifnt || 0), t;
}
function g0(e, t) {
  var r = e.l, n = e.read_shift(1), a = Ke(e), i = [], s = { t: a, h: a };
  if ((n & 1) !== 0) {
    for (var f = e.read_shift(4), c = 0; c != f; ++c)
      i.push(ho(e));
    s.r = i;
  } else
    s.r = [{ ich: 0, ifnt: 0 }];
  return e.l = r + t, s;
}
function po(e, t) {
  var r = !1;
  return t == null && (r = !0, t = M(15 + 4 * e.t.length)), t.write_shift(1, 0), be(e.t, t), r ? t.slice(0, t.l) : t;
}
var vo = g0;
function mo(e, t) {
  var r = !1;
  return t == null && (r = !0, t = M(23 + 4 * e.t.length)), t.write_shift(1, 1), be(e.t, t), t.write_shift(4, 1), xo({ ich: 0, ifnt: 0 }, t), r ? t.slice(0, t.l) : t;
}
function pr(e) {
  var t = e.read_shift(4), r = e.read_shift(2);
  return r += e.read_shift(1) << 16, e.l++, { c: t, iStyleRef: r };
}
function at(e, t) {
  return t == null && (t = M(8)), t.write_shift(-4, e.c), t.write_shift(3, e.iStyleRef || e.s), t.write_shift(1, 0), t;
}
function it(e) {
  var t = e.read_shift(2);
  return t += e.read_shift(1) << 16, e.l++, { c: -1, iStyleRef: t };
}
function st(e, t) {
  return t == null && (t = M(4)), t.write_shift(3, e.iStyleRef || e.s), t.write_shift(1, 0), t;
}
var go = Ke, Ai = be;
function _0(e) {
  var t = e.read_shift(4);
  return t === 0 || t === 4294967295 ? "" : e.read_shift(t, "dbcs");
}
function gn(e, t) {
  var r = !1;
  return t == null && (r = !0, t = M(127)), t.write_shift(4, e.length > 0 ? e.length : 4294967295), e.length > 0 && t.write_shift(0, e, "dbcs"), r ? t.slice(0, t.l) : t;
}
var _o = Ke, Qn = _0, T0 = gn;
function yi(e) {
  var t = e.slice(e.l, e.l + 4), r = t[0] & 1, n = t[0] & 2;
  e.l += 4;
  var a = n === 0 ? mn([0, 0, 0, 0, t[0] & 252, t[1], t[2], t[3]], 0) : qr(t, 0) >> 2;
  return r ? a / 100 : a;
}
function Fi(e, t) {
  t == null && (t = M(4));
  var r = 0, n = 0, a = e * 100;
  if (e == (e | 0) && e >= -(1 << 29) && e < 1 << 29 ? n = 1 : a == (a | 0) && a >= -(1 << 29) && a < 1 << 29 && (n = 1, r = 1), n)
    t.write_shift(-4, ((r ? a : e) << 2) + (r + 2));
  else
    throw new Error("unsupported RkNumber " + e);
}
function Ci(e) {
  var t = { s: {}, e: {} };
  return t.s.r = e.read_shift(4), t.e.r = e.read_shift(4), t.s.c = e.read_shift(4), t.e.c = e.read_shift(4), t;
}
function To(e, t) {
  return t || (t = M(16)), t.write_shift(4, e.s.r), t.write_shift(4, e.e.r), t.write_shift(4, e.s.c), t.write_shift(4, e.e.c), t;
}
var ft = Ci, St = To;
function At(e) {
  if (e.length - e.l < 8)
    throw "XLS Xnum Buffer underflow";
  return e.read_shift(8, "f");
}
function rt(e, t) {
  return (t || M(8)).write_shift(8, e, "f");
}
function Eo(e) {
  var t = {}, r = e.read_shift(1), n = r >>> 1, a = e.read_shift(1), i = e.read_shift(2, "i"), s = e.read_shift(1), f = e.read_shift(1), c = e.read_shift(1);
  switch (e.l++, n) {
    case 0:
      t.auto = 1;
      break;
    case 1:
      t.index = a;
      var l = Ro[a];
      l && (t.rgb = Aa(l));
      break;
    case 2:
      t.rgb = Aa([s, f, c]);
      break;
    case 3:
      t.theme = a;
      break;
  }
  return i != 0 && (t.tint = i > 0 ? i / 32767 : i / 32768), t;
}
function _n(e, t) {
  if (t || (t = M(8)), !e || e.auto)
    return t.write_shift(4, 0), t.write_shift(4, 0), t;
  e.index != null ? (t.write_shift(1, 2), t.write_shift(1, e.index)) : e.theme != null ? (t.write_shift(1, 6), t.write_shift(1, e.theme)) : (t.write_shift(1, 5), t.write_shift(1, 0));
  var r = e.tint || 0;
  if (r > 0 ? r *= 32767 : r < 0 && (r *= 32768), t.write_shift(2, r), !e.rgb || e.theme != null)
    t.write_shift(2, 0), t.write_shift(1, 0), t.write_shift(1, 0);
  else {
    var n = e.rgb || "FFFFFF";
    typeof n == "number" && (n = ("000000" + n.toString(16)).slice(-6)), t.write_shift(1, parseInt(n.slice(0, 2), 16)), t.write_shift(1, parseInt(n.slice(2, 4), 16)), t.write_shift(1, parseInt(n.slice(4, 6), 16)), t.write_shift(1, 255);
  }
  return t;
}
function wo(e) {
  var t = e.read_shift(1);
  e.l++;
  var r = {
    fBold: t & 1,
    fItalic: t & 2,
    fUnderline: t & 4,
    fStrikeout: t & 8,
    fOutline: t & 16,
    fShadow: t & 32,
    fCondense: t & 64,
    fExtend: t & 128
  };
  return r;
}
function So(e, t) {
  t || (t = M(2));
  var r = (e.italic ? 2 : 0) | (e.strike ? 8 : 0) | (e.outline ? 16 : 0) | (e.shadow ? 32 : 0) | (e.condense ? 64 : 0) | (e.extend ? 128 : 0);
  return t.write_shift(1, r), t.write_shift(1, 0), t;
}
var Oi = 2, ir = 3, tn = 11, Tn = 19, nn = 64, Ao = 65, yo = 71, Fo = 4108, Co = 4126, We = 80, da = {
  1: { n: "CodePage", t: Oi },
  2: { n: "Category", t: We },
  3: { n: "PresentationFormat", t: We },
  4: { n: "ByteCount", t: ir },
  5: { n: "LineCount", t: ir },
  6: { n: "ParagraphCount", t: ir },
  7: { n: "SlideCount", t: ir },
  8: { n: "NoteCount", t: ir },
  9: { n: "HiddenCount", t: ir },
  10: { n: "MultimediaClipCount", t: ir },
  11: { n: "ScaleCrop", t: tn },
  12: { n: "HeadingPairs", t: Fo },
  13: { n: "TitlesOfParts", t: Co },
  14: { n: "Manager", t: We },
  15: { n: "Company", t: We },
  16: { n: "LinksUpToDate", t: tn },
  17: { n: "CharacterCount", t: ir },
  19: { n: "SharedDoc", t: tn },
  22: { n: "HyperlinksChanged", t: tn },
  23: { n: "AppVersion", t: ir, p: "version" },
  24: { n: "DigSig", t: Ao },
  26: { n: "ContentType", t: We },
  27: { n: "ContentStatus", t: We },
  28: { n: "Language", t: We },
  29: { n: "Version", t: We },
  255: {},
  2147483648: { n: "Locale", t: Tn },
  2147483651: { n: "Behavior", t: Tn },
  1919054434: {}
}, pa = {
  1: { n: "CodePage", t: Oi },
  2: { n: "Title", t: We },
  3: { n: "Subject", t: We },
  4: { n: "Author", t: We },
  5: { n: "Keywords", t: We },
  6: { n: "Comments", t: We },
  7: { n: "Template", t: We },
  8: { n: "LastAuthor", t: We },
  9: { n: "RevNumber", t: We },
  10: { n: "EditTime", t: nn },
  11: { n: "LastPrinted", t: nn },
  12: { n: "CreatedDate", t: nn },
  13: { n: "ModifiedDate", t: nn },
  14: { n: "PageCount", t: ir },
  15: { n: "WordCount", t: ir },
  16: { n: "CharCount", t: ir },
  17: { n: "Thumbnail", t: yo },
  18: { n: "Application", t: We },
  19: { n: "DocSecurity", t: ir },
  255: {},
  2147483648: { n: "Locale", t: Tn },
  2147483651: { n: "Behavior", t: Tn },
  1919054434: {}
};
function Oo(e) {
  return e.map(function(t) {
    return [t >> 16 & 255, t >> 8 & 255, t & 255];
  });
}
var Do = /* @__PURE__ */ Oo([
  0,
  16777215,
  16711680,
  65280,
  255,
  16776960,
  16711935,
  65535,
  0,
  16777215,
  16711680,
  65280,
  255,
  16776960,
  16711935,
  65535,
  8388608,
  32768,
  128,
  8421376,
  8388736,
  32896,
  12632256,
  8421504,
  10066431,
  10040166,
  16777164,
  13434879,
  6684774,
  16744576,
  26316,
  13421823,
  128,
  16711935,
  16776960,
  65535,
  8388736,
  8388608,
  32896,
  255,
  52479,
  13434879,
  13434828,
  16777113,
  10079487,
  16751052,
  13408767,
  16764057,
  3368703,
  3394764,
  10079232,
  16763904,
  16750848,
  16737792,
  6710937,
  9868950,
  13158,
  3381606,
  13056,
  3355392,
  10040064,
  10040166,
  3355545,
  3355443,
  16777215,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0
]), Ro = /* @__PURE__ */ tr(Do), zt = {
  0: "#NULL!",
  7: "#DIV/0!",
  15: "#VALUE!",
  23: "#REF!",
  29: "#NAME?",
  36: "#NUM!",
  42: "#N/A",
  43: "#GETTING_DATA",
  255: "#WTF?"
}, ko = {
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml": "workbooks",
  "application/vnd.ms-excel.sheet.macroEnabled.main+xml": "workbooks",
  "application/vnd.ms-excel.sheet.binary.macroEnabled.main": "workbooks",
  "application/vnd.ms-excel.addin.macroEnabled.main+xml": "workbooks",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.template.main+xml": "workbooks",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml": "sheets",
  "application/vnd.ms-excel.worksheet": "sheets",
  "application/vnd.ms-excel.binIndexWs": "TODO",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.chartsheet+xml": "charts",
  "application/vnd.ms-excel.chartsheet": "charts",
  "application/vnd.ms-excel.macrosheet+xml": "macros",
  "application/vnd.ms-excel.macrosheet": "macros",
  "application/vnd.ms-excel.intlmacrosheet": "TODO",
  "application/vnd.ms-excel.binIndexMs": "TODO",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.dialogsheet+xml": "dialogs",
  "application/vnd.ms-excel.dialogsheet": "dialogs",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml": "strs",
  "application/vnd.ms-excel.sharedStrings": "strs",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml": "styles",
  "application/vnd.ms-excel.styles": "styles",
  "application/vnd.openxmlformats-package.core-properties+xml": "coreprops",
  "application/vnd.openxmlformats-officedocument.custom-properties+xml": "custprops",
  "application/vnd.openxmlformats-officedocument.extended-properties+xml": "extprops",
  "application/vnd.openxmlformats-officedocument.customXmlProperties+xml": "TODO",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.customProperty": "TODO",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml": "comments",
  "application/vnd.ms-excel.comments": "comments",
  "application/vnd.ms-excel.threadedcomments+xml": "threadedcomments",
  "application/vnd.ms-excel.person+xml": "people",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheetMetadata+xml": "metadata",
  "application/vnd.ms-excel.sheetMetadata": "metadata",
  "application/vnd.ms-excel.pivotTable": "TODO",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotTable+xml": "TODO",
  "application/vnd.openxmlformats-officedocument.drawingml.chart+xml": "TODO",
  "application/vnd.ms-office.chartcolorstyle+xml": "TODO",
  "application/vnd.ms-office.chartstyle+xml": "TODO",
  "application/vnd.ms-office.chartex+xml": "TODO",
  "application/vnd.ms-excel.calcChain": "calcchains",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.calcChain+xml": "calcchains",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.printerSettings": "TODO",
  "application/vnd.ms-office.activeX": "TODO",
  "application/vnd.ms-office.activeX+xml": "TODO",
  "application/vnd.ms-excel.attachedToolbars": "TODO",
  "application/vnd.ms-excel.connections": "TODO",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.connections+xml": "TODO",
  "application/vnd.ms-excel.externalLink": "links",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.externalLink+xml": "links",
  "application/vnd.ms-excel.pivotCacheDefinition": "TODO",
  "application/vnd.ms-excel.pivotCacheRecords": "TODO",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotCacheDefinition+xml": "TODO",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotCacheRecords+xml": "TODO",
  "application/vnd.ms-excel.queryTable": "TODO",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.queryTable+xml": "TODO",
  "application/vnd.ms-excel.userNames": "TODO",
  "application/vnd.ms-excel.revisionHeaders": "TODO",
  "application/vnd.ms-excel.revisionLog": "TODO",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionHeaders+xml": "TODO",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionLog+xml": "TODO",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.userNames+xml": "TODO",
  "application/vnd.ms-excel.tableSingleCells": "TODO",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.tableSingleCells+xml": "TODO",
  "application/vnd.ms-excel.slicer": "TODO",
  "application/vnd.ms-excel.slicerCache": "TODO",
  "application/vnd.ms-excel.slicer+xml": "TODO",
  "application/vnd.ms-excel.slicerCache+xml": "TODO",
  "application/vnd.ms-excel.wsSortMap": "TODO",
  "application/vnd.ms-excel.table": "TODO",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml": "TODO",
  "application/vnd.openxmlformats-officedocument.theme+xml": "themes",
  "application/vnd.openxmlformats-officedocument.themeOverride+xml": "TODO",
  "application/vnd.ms-excel.Timeline+xml": "TODO",
  "application/vnd.ms-excel.TimelineCache+xml": "TODO",
  "application/vnd.ms-office.vbaProject": "vba",
  "application/vnd.ms-office.vbaProjectSignature": "TODO",
  "application/vnd.ms-office.volatileDependencies": "TODO",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.volatileDependencies+xml": "TODO",
  "application/vnd.ms-excel.controlproperties+xml": "TODO",
  "application/vnd.openxmlformats-officedocument.model+data": "TODO",
  "application/vnd.ms-excel.Survey+xml": "TODO",
  "application/vnd.openxmlformats-officedocument.drawing+xml": "drawings",
  "application/vnd.openxmlformats-officedocument.drawingml.chartshapes+xml": "TODO",
  "application/vnd.openxmlformats-officedocument.drawingml.diagramColors+xml": "TODO",
  "application/vnd.openxmlformats-officedocument.drawingml.diagramData+xml": "TODO",
  "application/vnd.openxmlformats-officedocument.drawingml.diagramLayout+xml": "TODO",
  "application/vnd.openxmlformats-officedocument.drawingml.diagramStyle+xml": "TODO",
  "application/vnd.openxmlformats-officedocument.vmlDrawing": "TODO",
  "application/vnd.openxmlformats-package.relationships+xml": "rels",
  "application/vnd.openxmlformats-officedocument.oleObject": "TODO",
  "image/png": "TODO",
  sheet: "js"
}, an = {
  workbooks: {
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml",
    xlsm: "application/vnd.ms-excel.sheet.macroEnabled.main+xml",
    xlsb: "application/vnd.ms-excel.sheet.binary.macroEnabled.main",
    xlam: "application/vnd.ms-excel.addin.macroEnabled.main+xml",
    xltx: "application/vnd.openxmlformats-officedocument.spreadsheetml.template.main+xml"
  },
  strs: {
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml",
    xlsb: "application/vnd.ms-excel.sharedStrings"
  },
  comments: {
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml",
    xlsb: "application/vnd.ms-excel.comments"
  },
  sheets: {
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml",
    xlsb: "application/vnd.ms-excel.worksheet"
  },
  charts: {
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.chartsheet+xml",
    xlsb: "application/vnd.ms-excel.chartsheet"
  },
  dialogs: {
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.dialogsheet+xml",
    xlsb: "application/vnd.ms-excel.dialogsheet"
  },
  macros: {
    xlsx: "application/vnd.ms-excel.macrosheet+xml",
    xlsb: "application/vnd.ms-excel.macrosheet"
  },
  metadata: {
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheetMetadata+xml",
    xlsb: "application/vnd.ms-excel.sheetMetadata"
  },
  styles: {
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml",
    xlsb: "application/vnd.ms-excel.styles"
  }
};
function Di() {
  return {
    workbooks: [],
    sheets: [],
    charts: [],
    dialogs: [],
    macros: [],
    rels: [],
    strs: [],
    comments: [],
    threadedcomments: [],
    links: [],
    coreprops: [],
    extprops: [],
    custprops: [],
    themes: [],
    styles: [],
    calcchains: [],
    vba: [],
    drawings: [],
    metadata: [],
    people: [],
    TODO: [],
    xmlns: ""
  };
}
function Ri(e, t) {
  var r = Hl(ko), n = [], a;
  n[n.length] = Ne, n[n.length] = q("Types", null, {
    xmlns: Be.CT,
    "xmlns:xsd": Be.xsd,
    "xmlns:xsi": Be.xsi
  }), n = n.concat([
    ["xml", "application/xml"],
    ["bin", "application/vnd.ms-excel.sheet.binary.macroEnabled.main"],
    ["vml", "application/vnd.openxmlformats-officedocument.vmlDrawing"],
    ["data", "application/vnd.openxmlformats-officedocument.model+data"],
    ["bmp", "image/bmp"],
    ["png", "image/png"],
    ["gif", "image/gif"],
    ["emf", "image/x-emf"],
    ["wmf", "image/x-wmf"],
    ["jpg", "image/jpeg"],
    ["jpeg", "image/jpeg"],
    ["tif", "image/tiff"],
    ["tiff", "image/tiff"],
    ["pdf", "application/pdf"],
    ["rels", "application/vnd.openxmlformats-package.relationships+xml"]
  ].map(function(c) {
    return q("Default", null, { Extension: c[0], ContentType: c[1] });
  }));
  var i = function(c) {
    e[c] && e[c].length > 0 && (a = e[c][0], n[n.length] = q("Override", null, {
      PartName: (a[0] == "/" ? "" : "/") + a,
      ContentType: an[c][t.bookType] || an[c].xlsx
    }));
  }, s = function(c) {
    (e[c] || []).forEach(function(l) {
      n[n.length] = q("Override", null, {
        PartName: (l[0] == "/" ? "" : "/") + l,
        ContentType: an[c][t.bookType] || an[c].xlsx
      });
    });
  }, f = function(c) {
    (e[c] || []).forEach(function(l) {
      n[n.length] = q("Override", null, {
        PartName: (l[0] == "/" ? "" : "/") + l,
        ContentType: r[c][0]
      });
    });
  };
  return i("workbooks"), s("sheets"), s("charts"), f("themes"), ["strs", "styles"].forEach(i), ["coreprops", "extprops", "custprops"].forEach(f), f("vba"), f("comments"), f("threadedcomments"), f("drawings"), s("metadata"), f("people"), n.length > 2 && (n[n.length] = "</Types>", n[1] = n[1].replace("/>", ">")), n.join("");
}
var xe = {
  WB: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument",
  SHEET: "http://sheetjs.openxmlformats.org/officeDocument/2006/relationships/officeDocument",
  HLINK: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink",
  VML: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/vmlDrawing",
  XPATH: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/externalLinkPath",
  XMISS: "http://schemas.microsoft.com/office/2006/relationships/xlExternalLinkPath/xlPathMissing",
  XLINK: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/externalLink",
  CXML: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/customXml",
  CXMLP: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/customXmlProps",
  CMNT: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/comments",
  CORE_PROPS: "http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties",
  EXT_PROPS: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties",
  CUST_PROPS: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/custom-properties",
  SST: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/sharedStrings",
  STY: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles",
  THEME: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme",
  CHART: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/chart",
  CHARTEX: "http://schemas.microsoft.com/office/2014/relationships/chartEx",
  CS: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/chartsheet",
  WS: [
    "http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet",
    "http://purl.oclc.org/ooxml/officeDocument/relationships/worksheet"
  ],
  DS: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/dialogsheet",
  MS: "http://schemas.microsoft.com/office/2006/relationships/xlMacrosheet",
  IMG: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image",
  DRAW: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/drawing",
  XLMETA: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/sheetMetadata",
  TCMNT: "http://schemas.microsoft.com/office/2017/10/relationships/threadedComment",
  PEOPLE: "http://schemas.microsoft.com/office/2017/10/relationships/person",
  VBA: "http://schemas.microsoft.com/office/2006/relationships/vbaProject"
};
function ki(e) {
  var t = e.lastIndexOf("/");
  return e.slice(0, t + 1) + "_rels/" + e.slice(t + 1) + ".rels";
}
function pt(e) {
  var t = [Ne, q("Relationships", null, {
    xmlns: Be.RELS
  })];
  return je(e["!id"]).forEach(function(r) {
    t[t.length] = q("Relationship", null, e["!id"][r]);
  }), t.length > 2 && (t[t.length] = "</Relationships>", t[1] = t[1].replace("/>", ">")), t.join("");
}
function me(e, t, r, n, a, i) {
  if (a || (a = {}), e["!id"] || (e["!id"] = {}), e["!idx"] || (e["!idx"] = 1), t < 0)
    for (t = e["!idx"]; e["!id"]["rId" + t]; ++t)
      ;
  if (e["!idx"] = t + 1, a.Id = "rId" + t, a.Type = n, a.Target = r, i ? a.TargetMode = i : [xe.HLINK, xe.XPATH, xe.XMISS].indexOf(a.Type) > -1 && (a.TargetMode = "External"), e["!id"][a.Id])
    throw new Error("Cannot rewrite rId " + t);
  return e["!id"][a.Id] = a, e[("/" + a.Target).replace("//", "/")] = a, t;
}
function No(e) {
  var t = [Ne];
  t.push(`<manifest:manifest xmlns:manifest="urn:oasis:names:tc:opendocument:xmlns:manifest:1.0" manifest:version="1.2">
`), t.push(`  <manifest:file-entry manifest:full-path="/" manifest:version="1.2" manifest:media-type="application/vnd.oasis.opendocument.spreadsheet"/>
`);
  for (var r = 0; r < e.length; ++r)
    t.push('  <manifest:file-entry manifest:full-path="' + e[r][0] + '" manifest:media-type="' + e[r][1] + `"/>
`);
  return t.push("</manifest:manifest>"), t.join("");
}
function va(e, t, r) {
  return [
    '  <rdf:Description rdf:about="' + e + `">
`,
    '    <rdf:type rdf:resource="http://docs.oasis-open.org/ns/office/1.2/meta/' + (r || "odf") + "#" + t + `"/>
`,
    `  </rdf:Description>
`
  ].join("");
}
function Io(e, t) {
  return [
    '  <rdf:Description rdf:about="' + e + `">
`,
    '    <ns0:hasPart xmlns:ns0="http://docs.oasis-open.org/ns/office/1.2/meta/pkg#" rdf:resource="' + t + `"/>
`,
    `  </rdf:Description>
`
  ].join("");
}
function Po(e) {
  var t = [Ne];
  t.push(`<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
`);
  for (var r = 0; r != e.length; ++r)
    t.push(va(e[r][0], e[r][1])), t.push(Io("", e[r][0]));
  return t.push(va("", "Document", "pkg")), t.push("</rdf:RDF>"), t.join("");
}
function Ni() {
  return '<office:document-meta xmlns:office="urn:oasis:names:tc:opendocument:xmlns:office:1.0" xmlns:meta="urn:oasis:names:tc:opendocument:xmlns:meta:1.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:xlink="http://www.w3.org/1999/xlink" office:version="1.2"><office:meta><meta:generator>SheetJS ' + hn.version + "</meta:generator></office:meta></office:document-meta>";
}
var Jr = [
  ["cp:category", "Category"],
  ["cp:contentStatus", "ContentStatus"],
  ["cp:keywords", "Keywords"],
  ["cp:lastModifiedBy", "LastAuthor"],
  ["cp:lastPrinted", "LastPrinted"],
  ["cp:revision", "RevNumber"],
  ["cp:version", "Version"],
  ["dc:creator", "Author"],
  ["dc:description", "Comments"],
  ["dc:identifier", "Identifier"],
  ["dc:language", "Language"],
  ["dc:subject", "Subject"],
  ["dc:title", "Title"],
  ["dcterms:created", "CreatedDate", "date"],
  ["dcterms:modified", "ModifiedDate", "date"]
];
function jn(e, t, r, n, a) {
  a[e] != null || t == null || t === "" || (a[e] = t, t = ge(t), n[n.length] = r ? q(e, t, r) : Ge(e, t));
}
function Ii(e, t) {
  var r = t || {}, n = [Ne, q("cp:coreProperties", null, {
    "xmlns:cp": Be.CORE_PROPS,
    "xmlns:dc": Be.dc,
    "xmlns:dcterms": Be.dcterms,
    "xmlns:dcmitype": Be.dcmitype,
    "xmlns:xsi": Be.xsi
  })], a = {};
  if (!e && !r.Props)
    return n.join("");
  e && (e.CreatedDate != null && jn("dcterms:created", typeof e.CreatedDate == "string" ? e.CreatedDate : Zn(e.CreatedDate, r.WTF), { "xsi:type": "dcterms:W3CDTF" }, n, a), e.ModifiedDate != null && jn("dcterms:modified", typeof e.ModifiedDate == "string" ? e.ModifiedDate : Zn(e.ModifiedDate, r.WTF), { "xsi:type": "dcterms:W3CDTF" }, n, a));
  for (var i = 0; i != Jr.length; ++i) {
    var s = Jr[i], f = r.Props && r.Props[s[1]] != null ? r.Props[s[1]] : e ? e[s[1]] : null;
    f === !0 ? f = "1" : f === !1 ? f = "0" : typeof f == "number" && (f = String(f)), f != null && jn(s[0], f, null, n, a);
  }
  return n.length > 2 && (n[n.length] = "</cp:coreProperties>", n[1] = n[1].replace("/>", ">")), n.join("");
}
var vt = [
  ["Application", "Application", "string"],
  ["AppVersion", "AppVersion", "string"],
  ["Company", "Company", "string"],
  ["DocSecurity", "DocSecurity", "string"],
  ["Manager", "Manager", "string"],
  ["HyperlinksChanged", "HyperlinksChanged", "bool"],
  ["SharedDoc", "SharedDoc", "bool"],
  ["LinksUpToDate", "LinksUpToDate", "bool"],
  ["ScaleCrop", "ScaleCrop", "bool"],
  ["HeadingPairs", "HeadingPairs", "raw"],
  ["TitlesOfParts", "TitlesOfParts", "raw"]
], Pi = [
  "Worksheets",
  "SheetNames",
  "NamedRanges",
  "DefinedNames",
  "Chartsheets",
  "ChartNames"
];
function Li(e) {
  var t = [], r = q;
  return e || (e = {}), e.Application = "SheetJS", t[t.length] = Ne, t[t.length] = q("Properties", null, {
    xmlns: Be.EXT_PROPS,
    "xmlns:vt": Be.vt
  }), vt.forEach(function(n) {
    if (e[n[1]] !== void 0) {
      var a;
      switch (n[2]) {
        case "string":
          a = ge(String(e[n[1]]));
          break;
        case "bool":
          a = e[n[1]] ? "true" : "false";
          break;
      }
      a !== void 0 && (t[t.length] = r(n[0], a));
    }
  }), t[t.length] = r("HeadingPairs", r("vt:vector", r("vt:variant", "<vt:lpstr>Worksheets</vt:lpstr>") + r("vt:variant", r("vt:i4", String(e.Worksheets))), { size: 2, baseType: "variant" })), t[t.length] = r("TitlesOfParts", r("vt:vector", e.SheetNames.map(function(n) {
    return "<vt:lpstr>" + ge(n) + "</vt:lpstr>";
  }).join(""), { size: e.Worksheets, baseType: "lpstr" })), t.length > 2 && (t[t.length] = "</Properties>", t[1] = t[1].replace("/>", ">")), t.join("");
}
function Bi(e) {
  var t = [Ne, q("Properties", null, {
    xmlns: Be.CUST_PROPS,
    "xmlns:vt": Be.vt
  })];
  if (!e)
    return t.join("");
  var r = 1;
  return je(e).forEach(function(a) {
    ++r, t[t.length] = q("property", Jl(e[a], !0), {
      fmtid: "{D5CDD505-2E9C-101B-9397-08002B2CF9AE}",
      pid: r,
      name: ge(a)
    });
  }), t.length > 2 && (t[t.length] = "</Properties>", t[1] = t[1].replace("/>", ">")), t.join("");
}
var ma = {
  Title: "Title",
  Subject: "Subject",
  Author: "Author",
  Keywords: "Keywords",
  Comments: "Description",
  LastAuthor: "LastAuthor",
  RevNumber: "Revision",
  Application: "AppName",
  LastPrinted: "LastPrinted",
  CreatedDate: "Created",
  ModifiedDate: "LastSaved",
  Category: "Category",
  Manager: "Manager",
  Company: "Company",
  AppVersion: "Version",
  ContentStatus: "ContentStatus",
  Identifier: "Identifier",
  Language: "Language"
};
function Lo(e, t) {
  var r = [];
  return je(ma).map(function(n) {
    for (var a = 0; a < Jr.length; ++a)
      if (Jr[a][1] == n)
        return Jr[a];
    for (a = 0; a < vt.length; ++a)
      if (vt[a][1] == n)
        return vt[a];
    throw n;
  }).forEach(function(n) {
    if (e[n[1]] != null) {
      var a = t && t.Props && t.Props[n[1]] != null ? t.Props[n[1]] : e[n[1]];
      switch (n[2]) {
        case "date":
          a = new Date(a).toISOString().replace(/\.\d*Z/, "Z");
          break;
      }
      typeof a == "number" ? a = String(a) : a === !0 || a === !1 ? a = a ? "1" : "0" : a instanceof Date && (a = new Date(a).toISOString().replace(/\.\d*Z/, "")), r.push(Ge(ma[n[1]] || n[1], a));
    }
  }), q("DocumentProperties", r.join(""), { xmlns: fr.o });
}
function Bo(e, t) {
  var r = ["Worksheets", "SheetNames"], n = "CustomDocumentProperties", a = [];
  return e && je(e).forEach(function(i) {
    if (!!Object.prototype.hasOwnProperty.call(e, i)) {
      for (var s = 0; s < Jr.length; ++s)
        if (i == Jr[s][1])
          return;
      for (s = 0; s < vt.length; ++s)
        if (i == vt[s][1])
          return;
      for (s = 0; s < r.length; ++s)
        if (i == r[s])
          return;
      var f = e[i], c = "string";
      typeof f == "number" ? (c = "float", f = String(f)) : f === !0 || f === !1 ? (c = "boolean", f = f ? "1" : "0") : f = String(f), a.push(q(aa(i), f, { "dt:dt": c }));
    }
  }), t && je(t).forEach(function(i) {
    if (!!Object.prototype.hasOwnProperty.call(t, i) && !(e && Object.prototype.hasOwnProperty.call(e, i))) {
      var s = t[i], f = "string";
      typeof s == "number" ? (f = "float", s = String(s)) : s === !0 || s === !1 ? (f = "boolean", s = s ? "1" : "0") : s instanceof Date ? (f = "dateTime.tz", s = s.toISOString()) : s = String(s), a.push(q(aa(i), s, { "dt:dt": f }));
    }
  }), "<" + n + ' xmlns="' + fr.o + '">' + a.join("") + "</" + n + ">";
}
function Mo(e) {
  var t = typeof e == "string" ? new Date(Date.parse(e)) : e, r = t.getTime() / 1e3 + 11644473600, n = r % Math.pow(2, 32), a = (r - n) / Math.pow(2, 32);
  n *= 1e7, a *= 1e7;
  var i = n / Math.pow(2, 32) | 0;
  i > 0 && (n = n % Math.pow(2, 32), a += i);
  var s = M(8);
  return s.write_shift(4, n), s.write_shift(4, a), s;
}
function ga(e, t) {
  var r = M(4), n = M(4);
  switch (r.write_shift(4, e == 80 ? 31 : e), e) {
    case 3:
      n.write_shift(-4, t);
      break;
    case 5:
      n = M(8), n.write_shift(8, t, "f");
      break;
    case 11:
      n.write_shift(4, t ? 1 : 0);
      break;
    case 64:
      n = Mo(t);
      break;
    case 31:
    case 80:
      for (n = M(4 + 2 * (t.length + 1) + (t.length % 2 ? 0 : 2)), n.write_shift(4, t.length + 1), n.write_shift(0, t, "dbcs"); n.l != n.length; )
        n.write_shift(1, 0);
      break;
    default:
      throw new Error("TypedPropertyValue unrecognized type " + e + " " + t);
  }
  return Ve([r, n]);
}
var Mi = ["CodePage", "Thumbnail", "_PID_LINKBASE", "_PID_HLINKS", "SystemIdentifier", "FMTID"];
function bo(e) {
  switch (typeof e) {
    case "boolean":
      return 11;
    case "number":
      return (e | 0) == e ? 3 : 5;
    case "string":
      return 31;
    case "object":
      if (e instanceof Date)
        return 64;
      break;
  }
  return -1;
}
function _a(e, t, r) {
  var n = M(8), a = [], i = [], s = 8, f = 0, c = M(8), l = M(8);
  if (c.write_shift(4, 2), c.write_shift(4, 1200), l.write_shift(4, 1), i.push(c), a.push(l), s += 8 + c.length, !t) {
    l = M(8), l.write_shift(4, 0), a.unshift(l);
    var o = [M(4)];
    for (o[0].write_shift(4, e.length), f = 0; f < e.length; ++f) {
      var u = e[f][0];
      for (c = M(4 + 4 + 2 * (u.length + 1) + (u.length % 2 ? 0 : 2)), c.write_shift(4, f + 2), c.write_shift(4, u.length + 1), c.write_shift(0, u, "dbcs"); c.l != c.length; )
        c.write_shift(1, 0);
      o.push(c);
    }
    c = Ve(o), i.unshift(c), s += 8 + c.length;
  }
  for (f = 0; f < e.length; ++f)
    if (!(t && !t[e[f][0]]) && !(Mi.indexOf(e[f][0]) > -1 || Pi.indexOf(e[f][0]) > -1) && e[f][1] != null) {
      var h = e[f][1], d = 0;
      if (t) {
        d = +t[e[f][0]];
        var g = r[d];
        if (g.p == "version" && typeof h == "string") {
          var x = h.split(".");
          h = (+x[0] << 16) + (+x[1] || 0);
        }
        c = ga(g.t, h);
      } else {
        var m = bo(h);
        m == -1 && (m = 31, h = String(h)), c = ga(m, h);
      }
      i.push(c), l = M(8), l.write_shift(4, t ? d : 2 + f), a.push(l), s += 8 + c.length;
    }
  var O = 8 * (i.length + 1);
  for (f = 0; f < i.length; ++f)
    a[f].write_shift(4, O), O += i[f].length;
  return n.write_shift(4, s), n.write_shift(4, i.length), Ve([n].concat(a).concat(i));
}
function Ta(e, t, r, n, a, i) {
  var s = M(a ? 68 : 48), f = [s];
  s.write_shift(2, 65534), s.write_shift(2, 0), s.write_shift(4, 842412599), s.write_shift(16, Ee.utils.consts.HEADER_CLSID, "hex"), s.write_shift(4, a ? 2 : 1), s.write_shift(16, t, "hex"), s.write_shift(4, a ? 68 : 48);
  var c = _a(e, r, n);
  if (f.push(c), a) {
    var l = _a(a, null, null);
    s.write_shift(16, i, "hex"), s.write_shift(4, 68 + c.length), f.push(l);
  }
  return Ve(f);
}
function Uo(e, t) {
  t || (t = M(e));
  for (var r = 0; r < e; ++r)
    t.write_shift(1, 0);
  return t;
}
function Ho(e, t) {
  return e.read_shift(t) === 1;
}
function Je(e, t) {
  return t || (t = M(2)), t.write_shift(2, +!!e), t;
}
function bi(e) {
  return e.read_shift(2, "u");
}
function dr(e, t) {
  return t || (t = M(2)), t.write_shift(2, e), t;
}
function Ui(e, t, r) {
  return r || (r = M(2)), r.write_shift(1, t == "e" ? +e : +!!e), r.write_shift(1, t == "e" ? 1 : 0), r;
}
function Hi(e, t, r) {
  var n = e.read_shift(r && r.biff >= 12 ? 2 : 1), a = "sbcs-cont";
  if (r && r.biff >= 8, !r || r.biff == 8) {
    var i = e.read_shift(1);
    i && (a = "dbcs-cont");
  } else
    r.biff == 12 && (a = "wstr");
  r.biff >= 2 && r.biff <= 5 && (a = "cpstr");
  var s = n ? e.read_shift(n, a) : "";
  return s;
}
function Wo(e) {
  var t = e.t || "", r = M(3 + 0);
  r.write_shift(2, t.length), r.write_shift(1, 1);
  var n = M(2 * t.length);
  n.write_shift(2 * t.length, t, "utf16le");
  var a = [r, n];
  return Ve(a);
}
function Vo(e, t, r) {
  var n;
  if (r) {
    if (r.biff >= 2 && r.biff <= 5)
      return e.read_shift(t, "cpstr");
    if (r.biff >= 12)
      return e.read_shift(t, "dbcs-cont");
  }
  var a = e.read_shift(1);
  return a === 0 ? n = e.read_shift(t, "sbcs-cont") : n = e.read_shift(t, "dbcs-cont"), n;
}
function Go(e, t, r) {
  var n = e.read_shift(r && r.biff == 2 ? 1 : 2);
  return n === 0 ? (e.l++, "") : Vo(e, n, r);
}
function Xo(e, t, r) {
  if (r.biff > 5)
    return Go(e, t, r);
  var n = e.read_shift(1);
  return n === 0 ? (e.l++, "") : e.read_shift(n, r.biff <= 4 || !e.lens ? "cpstr" : "sbcs-cont");
}
function Wi(e, t, r) {
  return r || (r = M(3 + 2 * e.length)), r.write_shift(2, e.length), r.write_shift(1, 1), r.write_shift(31, e, "utf16le"), r;
}
function Ea(e, t) {
  t || (t = M(6 + e.length * 2)), t.write_shift(4, 1 + e.length);
  for (var r = 0; r < e.length; ++r)
    t.write_shift(2, e.charCodeAt(r));
  return t.write_shift(2, 0), t;
}
function jo(e) {
  var t = M(512), r = 0, n = e.Target;
  n.slice(0, 7) == "file://" && (n = n.slice(7));
  var a = n.indexOf("#"), i = a > -1 ? 31 : 23;
  switch (n.charAt(0)) {
    case "#":
      i = 28;
      break;
    case ".":
      i &= -3;
      break;
  }
  t.write_shift(4, 2), t.write_shift(4, i);
  var s = [8, 6815827, 6619237, 4849780, 83];
  for (r = 0; r < s.length; ++r)
    t.write_shift(4, s[r]);
  if (i == 28)
    n = n.slice(1), Ea(n, t);
  else if (i & 2) {
    for (s = "e0 c9 ea 79 f9 ba ce 11 8c 82 00 aa 00 4b a9 0b".split(" "), r = 0; r < s.length; ++r)
      t.write_shift(1, parseInt(s[r], 16));
    var f = a > -1 ? n.slice(0, a) : n;
    for (t.write_shift(4, 2 * (f.length + 1)), r = 0; r < f.length; ++r)
      t.write_shift(2, f.charCodeAt(r));
    t.write_shift(2, 0), i & 8 && Ea(a > -1 ? n.slice(a + 1) : "", t);
  } else {
    for (s = "03 03 00 00 00 00 00 00 c0 00 00 00 00 00 00 46".split(" "), r = 0; r < s.length; ++r)
      t.write_shift(1, parseInt(s[r], 16));
    for (var c = 0; n.slice(c * 3, c * 3 + 3) == "../" || n.slice(c * 3, c * 3 + 3) == "..\\"; )
      ++c;
    for (t.write_shift(2, c), t.write_shift(4, n.length - 3 * c + 1), r = 0; r < n.length - 3 * c; ++r)
      t.write_shift(1, n.charCodeAt(r + 3 * c) & 255);
    for (t.write_shift(1, 0), t.write_shift(2, 65535), t.write_shift(2, 57005), r = 0; r < 6; ++r)
      t.write_shift(4, 0);
  }
  return t.slice(0, t.l);
}
function tt(e, t, r, n) {
  return n || (n = M(6)), n.write_shift(2, e), n.write_shift(2, t), n.write_shift(2, r || 0), n;
}
function $o(e, t, r) {
  var n = r.biff > 8 ? 4 : 2, a = e.read_shift(n), i = e.read_shift(n, "i"), s = e.read_shift(n, "i");
  return [a, i, s];
}
function zo(e) {
  var t = e.read_shift(2), r = e.read_shift(2), n = e.read_shift(2), a = e.read_shift(2);
  return { s: { c: n, r: t }, e: { c: a, r } };
}
function Vi(e, t) {
  return t || (t = M(8)), t.write_shift(2, e.s.r), t.write_shift(2, e.e.r), t.write_shift(2, e.s.c), t.write_shift(2, e.e.c), t;
}
function E0(e, t, r) {
  var n = 1536, a = 16;
  switch (r.bookType) {
    case "biff8":
      break;
    case "biff5":
      n = 1280, a = 8;
      break;
    case "biff4":
      n = 4, a = 6;
      break;
    case "biff3":
      n = 3, a = 6;
      break;
    case "biff2":
      n = 2, a = 4;
      break;
    case "xla":
      break;
    default:
      throw new Error("unsupported BIFF version");
  }
  var i = M(a);
  return i.write_shift(2, n), i.write_shift(2, t), a > 4 && i.write_shift(2, 29282), a > 6 && i.write_shift(2, 1997), a > 8 && (i.write_shift(2, 49161), i.write_shift(2, 1), i.write_shift(2, 1798), i.write_shift(2, 0)), i;
}
function Ko(e, t) {
  var r = !t || t.biff == 8, n = M(r ? 112 : 54);
  for (n.write_shift(t.biff == 8 ? 2 : 1, 7), r && n.write_shift(1, 0), n.write_shift(4, 859007059), n.write_shift(4, 5458548 | (r ? 0 : 536870912)); n.l < n.length; )
    n.write_shift(1, r ? 0 : 32);
  return n;
}
function Yo(e, t) {
  var r = !t || t.biff >= 8 ? 2 : 1, n = M(8 + r * e.name.length);
  n.write_shift(4, e.pos), n.write_shift(1, e.hs || 0), n.write_shift(1, e.dt), n.write_shift(1, e.name.length), t.biff >= 8 && n.write_shift(1, 1), n.write_shift(r * e.name.length, e.name, t.biff < 8 ? "sbcs" : "utf16le");
  var a = n.slice(0, n.l);
  return a.l = n.l, a;
}
function qo(e, t) {
  var r = M(8);
  r.write_shift(4, e.Count), r.write_shift(4, e.Unique);
  for (var n = [], a = 0; a < e.length; ++a)
    n[a] = Wo(e[a]);
  var i = Ve([r].concat(n));
  return i.parts = [r.length].concat(n.map(function(s) {
    return s.length;
  })), i;
}
function Jo() {
  var e = M(18);
  return e.write_shift(2, 0), e.write_shift(2, 0), e.write_shift(2, 29280), e.write_shift(2, 17600), e.write_shift(2, 56), e.write_shift(2, 0), e.write_shift(2, 0), e.write_shift(2, 1), e.write_shift(2, 500), e;
}
function Zo(e) {
  var t = M(18), r = 1718;
  return e && e.RTL && (r |= 64), t.write_shift(2, r), t.write_shift(4, 0), t.write_shift(4, 64), t.write_shift(4, 0), t.write_shift(4, 0), t;
}
function Qo(e, t) {
  var r = e.name || "Arial", n = t && t.biff == 5, a = n ? 15 + r.length : 16 + 2 * r.length, i = M(a);
  return i.write_shift(2, (e.sz || 12) * 20), i.write_shift(4, 0), i.write_shift(2, 400), i.write_shift(4, 0), i.write_shift(2, 0), i.write_shift(1, r.length), n || i.write_shift(1, 1), i.write_shift((n ? 1 : 2) * r.length, r, n ? "sbcs" : "utf16le"), i;
}
function ec(e, t, r, n) {
  var a = M(10);
  return tt(e, t, n, a), a.write_shift(4, r), a;
}
function rc(e, t, r, n, a) {
  var i = !a || a.biff == 8, s = M(6 + 2 + +i + (1 + i) * r.length);
  return tt(e, t, n, s), s.write_shift(2, r.length), i && s.write_shift(1, 1), s.write_shift((1 + i) * r.length, r, i ? "utf16le" : "sbcs"), s;
}
function tc(e, t, r, n) {
  var a = r && r.biff == 5;
  n || (n = M(a ? 3 + t.length : 5 + 2 * t.length)), n.write_shift(2, e), n.write_shift(a ? 1 : 2, t.length), a || n.write_shift(1, 1), n.write_shift((a ? 1 : 2) * t.length, t, a ? "sbcs" : "utf16le");
  var i = n.length > n.l ? n.slice(0, n.l) : n;
  return i.l == null && (i.l = i.length), i;
}
function nc(e, t) {
  var r = t.biff == 8 || !t.biff ? 4 : 2, n = M(2 * r + 6);
  return n.write_shift(r, e.s.r), n.write_shift(r, e.e.r + 1), n.write_shift(2, e.s.c), n.write_shift(2, e.e.c + 1), n.write_shift(2, 0), n;
}
function wa(e, t, r, n) {
  var a = r && r.biff == 5;
  n || (n = M(a ? 16 : 20)), n.write_shift(2, 0), e.style ? (n.write_shift(2, e.numFmtId || 0), n.write_shift(2, 65524)) : (n.write_shift(2, e.numFmtId || 0), n.write_shift(2, t << 4));
  var i = 0;
  return e.numFmtId > 0 && a && (i |= 1024), n.write_shift(4, i), n.write_shift(4, 0), a || n.write_shift(4, 0), n.write_shift(2, 0), n;
}
function ac(e) {
  var t = M(8);
  return t.write_shift(4, 0), t.write_shift(2, e[0] ? e[0] + 1 : 0), t.write_shift(2, e[1] ? e[1] + 1 : 0), t;
}
function ic(e, t, r, n, a, i) {
  var s = M(8);
  return tt(e, t, n, s), Ui(r, i, s), s;
}
function sc(e, t, r, n) {
  var a = M(14);
  return tt(e, t, n, a), rt(r, a), a;
}
function fc(e, t, r) {
  if (r.biff < 8)
    return lc(e, t, r);
  for (var n = [], a = e.l + t, i = e.read_shift(r.biff > 8 ? 4 : 2); i-- !== 0; )
    n.push($o(e, r.biff > 8 ? 12 : 6, r));
  if (e.l != a)
    throw new Error("Bad ExternSheet: " + e.l + " != " + a);
  return n;
}
function lc(e, t, r) {
  e[e.l + 1] == 3 && e[e.l]++;
  var n = Hi(e, t, r);
  return n.charCodeAt(0) == 3 ? n.slice(1) : n;
}
function oc(e) {
  var t = M(2 + e.length * 8);
  t.write_shift(2, e.length);
  for (var r = 0; r < e.length; ++r)
    Vi(e[r], t);
  return t;
}
function cc(e) {
  var t = M(24), r = Me(e[0]);
  t.write_shift(2, r.r), t.write_shift(2, r.r), t.write_shift(2, r.c), t.write_shift(2, r.c);
  for (var n = "d0 c9 ea 79 f9 ba ce 11 8c 82 00 aa 00 4b a9 0b".split(" "), a = 0; a < 16; ++a)
    t.write_shift(1, parseInt(n[a], 16));
  return Ve([t, jo(e[1])]);
}
function uc(e) {
  var t = e[1].Tooltip, r = M(10 + 2 * (t.length + 1));
  r.write_shift(2, 2048);
  var n = Me(e[0]);
  r.write_shift(2, n.r), r.write_shift(2, n.r), r.write_shift(2, n.c), r.write_shift(2, n.c);
  for (var a = 0; a < t.length; ++a)
    r.write_shift(2, t.charCodeAt(a));
  return r.write_shift(2, 0), r;
}
function hc(e) {
  return e || (e = M(4)), e.write_shift(2, 1), e.write_shift(2, 1), e;
}
function xc(e, t, r) {
  if (!r.cellStyles)
    return yr(e, t);
  var n = r && r.biff >= 12 ? 4 : 2, a = e.read_shift(n), i = e.read_shift(n), s = e.read_shift(n), f = e.read_shift(n), c = e.read_shift(2);
  n == 2 && (e.l += 2);
  var l = { s: a, e: i, w: s, ixfe: f, flags: c };
  return (r.biff >= 5 || !r.biff) && (l.level = c >> 8 & 7), l;
}
function dc(e, t) {
  var r = M(12);
  r.write_shift(2, t), r.write_shift(2, t), r.write_shift(2, e.width * 256), r.write_shift(2, 0);
  var n = 0;
  return e.hidden && (n |= 1), r.write_shift(1, n), n = e.level || 0, r.write_shift(1, n), r.write_shift(2, 0), r;
}
function pc(e) {
  for (var t = M(2 * e), r = 0; r < e; ++r)
    t.write_shift(2, r + 1);
  return t;
}
function vc(e, t, r) {
  var n = M(15);
  return Yt(n, e, t), n.write_shift(8, r, "f"), n;
}
function mc(e, t, r) {
  var n = M(9);
  return Yt(n, e, t), n.write_shift(2, r), n;
}
var gc = /* @__PURE__ */ function() {
  var e = {
    1: 437,
    2: 850,
    3: 1252,
    4: 1e4,
    100: 852,
    101: 866,
    102: 865,
    103: 861,
    104: 895,
    105: 620,
    106: 737,
    107: 857,
    120: 950,
    121: 949,
    122: 936,
    123: 932,
    124: 874,
    125: 1255,
    126: 1256,
    150: 10007,
    151: 10029,
    152: 10006,
    200: 1250,
    201: 1251,
    202: 1254,
    203: 1253,
    0: 20127,
    8: 865,
    9: 437,
    10: 850,
    11: 437,
    13: 437,
    14: 850,
    15: 437,
    16: 850,
    17: 437,
    18: 850,
    19: 932,
    20: 850,
    21: 437,
    22: 850,
    23: 865,
    24: 437,
    25: 437,
    26: 850,
    27: 437,
    28: 863,
    29: 850,
    31: 852,
    34: 852,
    35: 852,
    36: 860,
    37: 850,
    38: 866,
    55: 850,
    64: 852,
    77: 936,
    78: 949,
    79: 950,
    80: 874,
    87: 1252,
    88: 1252,
    89: 1252,
    108: 863,
    134: 737,
    135: 852,
    136: 857,
    204: 1257,
    255: 16969
  }, t = c0({
    1: 437,
    2: 850,
    3: 1252,
    4: 1e4,
    100: 852,
    101: 866,
    102: 865,
    103: 861,
    104: 895,
    105: 620,
    106: 737,
    107: 857,
    120: 950,
    121: 949,
    122: 936,
    123: 932,
    124: 874,
    125: 1255,
    126: 1256,
    150: 10007,
    151: 10029,
    152: 10006,
    200: 1250,
    201: 1251,
    202: 1254,
    203: 1253,
    0: 20127
  });
  function r(f, c) {
    var l = [], o = et(1);
    switch (c.type) {
      case "base64":
        o = _r(Ir(f));
        break;
      case "binary":
        o = _r(f);
        break;
      case "buffer":
      case "array":
        o = f;
        break;
    }
    sr(o, 0);
    var u = o.read_shift(1), h = !!(u & 136), d = !1, g = !1;
    switch (u) {
      case 2:
        break;
      case 3:
        break;
      case 48:
        d = !0, h = !0;
        break;
      case 49:
        d = !0, h = !0;
        break;
      case 131:
        break;
      case 139:
        break;
      case 140:
        g = !0;
        break;
      case 245:
        break;
      default:
        throw new Error("DBF Unsupported Version: " + u.toString(16));
    }
    var x = 0, m = 521;
    u == 2 && (x = o.read_shift(2)), o.l += 3, u != 2 && (x = o.read_shift(4)), x > 1048576 && (x = 1e6), u != 2 && (m = o.read_shift(2));
    var O = o.read_shift(2), A = c.codepage || 1252;
    u != 2 && (o.l += 16, o.read_shift(1), o[o.l] !== 0 && (A = e[o[o.l]]), o.l += 1, o.l += 2), g && (o.l += 36);
    for (var y = [], R = {}, X = Math.min(o.length, u == 2 ? 521 : m - 10 - (d ? 264 : 0)), Q = g ? 32 : 11; o.l < X && o[o.l] != 13; )
      switch (R = {}, R.name = Yr.utils.decode(A, o.slice(o.l, o.l + Q)).replace(/[\u0000\r\n].*$/g, ""), o.l += Q, R.type = String.fromCharCode(o.read_shift(1)), u != 2 && !g && (R.offset = o.read_shift(4)), R.len = o.read_shift(1), u == 2 && (R.offset = o.read_shift(2)), R.dec = o.read_shift(1), R.name.length && y.push(R), u != 2 && (o.l += g ? 13 : 14), R.type) {
        case "B":
          (!d || R.len != 8) && c.WTF && console.log("Skipping " + R.name + ":" + R.type);
          break;
        case "G":
        case "P":
          c.WTF && console.log("Skipping " + R.name + ":" + R.type);
          break;
        case "+":
        case "0":
        case "@":
        case "C":
        case "D":
        case "F":
        case "I":
        case "L":
        case "M":
        case "N":
        case "O":
        case "T":
        case "Y":
          break;
        default:
          throw new Error("Unknown Field Type: " + R.type);
      }
    if (o[o.l] !== 13 && (o.l = m - 1), o.read_shift(1) !== 13)
      throw new Error("DBF Terminator not found " + o.l + " " + o[o.l]);
    o.l = m;
    var D = 0, U = 0;
    for (l[0] = [], U = 0; U != y.length; ++U)
      l[0][U] = y[U].name;
    for (; x-- > 0; ) {
      if (o[o.l] === 42) {
        o.l += O;
        continue;
      }
      for (++o.l, l[++D] = [], U = 0, U = 0; U != y.length; ++U) {
        var B = o.slice(o.l, o.l + y[U].len);
        o.l += y[U].len, sr(B, 0);
        var G = Yr.utils.decode(A, B);
        switch (y[U].type) {
          case "C":
            G.trim().length && (l[D][U] = G.replace(/\s+$/, ""));
            break;
          case "D":
            G.length === 8 ? l[D][U] = new Date(+G.slice(0, 4), +G.slice(4, 6) - 1, +G.slice(6, 8)) : l[D][U] = G;
            break;
          case "F":
            l[D][U] = parseFloat(G.trim());
            break;
          case "+":
          case "I":
            l[D][U] = g ? B.read_shift(-4, "i") ^ 2147483648 : B.read_shift(4, "i");
            break;
          case "L":
            switch (G.trim().toUpperCase()) {
              case "Y":
              case "T":
                l[D][U] = !0;
                break;
              case "N":
              case "F":
                l[D][U] = !1;
                break;
              case "":
              case "?":
                break;
              default:
                throw new Error("DBF Unrecognized L:|" + G + "|");
            }
            break;
          case "M":
            if (!h)
              throw new Error("DBF Unexpected MEMO for type " + u.toString(16));
            l[D][U] = "##MEMO##" + (g ? parseInt(G.trim(), 10) : B.read_shift(4));
            break;
          case "N":
            G = G.replace(/\u0000/g, "").trim(), G && G != "." && (l[D][U] = +G || 0);
            break;
          case "@":
            l[D][U] = new Date(B.read_shift(-8, "f") - 621356832e5);
            break;
          case "T":
            l[D][U] = new Date((B.read_shift(4) - 2440588) * 864e5 + B.read_shift(4));
            break;
          case "Y":
            l[D][U] = B.read_shift(4, "i") / 1e4 + B.read_shift(4, "i") / 1e4 * Math.pow(2, 32);
            break;
          case "O":
            l[D][U] = -B.read_shift(-8, "f");
            break;
          case "B":
            if (d && y[U].len == 8) {
              l[D][U] = B.read_shift(8, "f");
              break;
            }
          case "G":
          case "P":
            B.l += y[U].len;
            break;
          case "0":
            if (y[U].name === "_NullFlags")
              break;
          default:
            throw new Error("DBF Unsupported data type " + y[U].type);
        }
      }
    }
    if (u != 2 && o.l < o.length && o[o.l++] != 26)
      throw new Error("DBF EOF Marker missing " + (o.l - 1) + " of " + o.length + " " + o[o.l - 1].toString(16));
    return c && c.sheetRows && (l = l.slice(0, c.sheetRows)), c.DBF = y, l;
  }
  function n(f, c) {
    var l = c || {};
    l.dateNF || (l.dateNF = "yyyymmdd");
    var o = wt(r(f, l), l);
    return o["!cols"] = l.DBF.map(function(u) {
      return {
        wch: u.len,
        DBF: u
      };
    }), delete l.DBF, o;
  }
  function a(f, c) {
    try {
      return nt(n(f, c), c);
    } catch (l) {
      if (c && c.WTF)
        throw l;
    }
    return { SheetNames: [], Sheets: {} };
  }
  var i = { B: 8, C: 250, L: 1, D: 8, "?": 0, "": 0 };
  function s(f, c) {
    var l = c || {};
    if (+l.codepage >= 0 && Mt(+l.codepage), l.type == "string")
      throw new Error("Cannot write DBF to JS string");
    var o = er(), u = yn(f, { header: 1, raw: !0, cellDates: !0 }), h = u[0], d = u.slice(1), g = f["!cols"] || [], x = 0, m = 0, O = 0, A = 1;
    for (x = 0; x < h.length; ++x) {
      if (((g[x] || {}).DBF || {}).name) {
        h[x] = g[x].DBF.name, ++O;
        continue;
      }
      if (h[x] != null) {
        if (++O, typeof h[x] == "number" && (h[x] = h[x].toString(10)), typeof h[x] != "string")
          throw new Error("DBF Invalid column name " + h[x] + " |" + typeof h[x] + "|");
        if (h.indexOf(h[x]) !== x) {
          for (m = 0; m < 1024; ++m)
            if (h.indexOf(h[x] + "_" + m) == -1) {
              h[x] += "_" + m;
              break;
            }
        }
      }
    }
    var y = Se(f["!ref"]), R = [], X = [], Q = [];
    for (x = 0; x <= y.e.c - y.s.c; ++x) {
      var D = "", U = "", B = 0, G = [];
      for (m = 0; m < d.length; ++m)
        d[m][x] != null && G.push(d[m][x]);
      if (G.length == 0 || h[x] == null) {
        R[x] = "?";
        continue;
      }
      for (m = 0; m < G.length; ++m) {
        switch (typeof G[m]) {
          case "number":
            U = "B";
            break;
          case "string":
            U = "C";
            break;
          case "boolean":
            U = "L";
            break;
          case "object":
            U = G[m] instanceof Date ? "D" : "C";
            break;
          default:
            U = "C";
        }
        B = Math.max(B, String(G[m]).length), D = D && D != U ? "C" : U;
      }
      B > 250 && (B = 250), U = ((g[x] || {}).DBF || {}).type, U == "C" && g[x].DBF.len > B && (B = g[x].DBF.len), D == "B" && U == "N" && (D = "N", Q[x] = g[x].DBF.dec, B = g[x].DBF.len), X[x] = D == "C" || U == "N" ? B : i[D] || 0, A += X[x], R[x] = D;
    }
    var j = o.next(32);
    for (j.write_shift(4, 318902576), j.write_shift(4, d.length), j.write_shift(2, 296 + 32 * O), j.write_shift(2, A), x = 0; x < 4; ++x)
      j.write_shift(4, 0);
    for (j.write_shift(4, 0 | (+t[Xa] || 3) << 8), x = 0, m = 0; x < h.length; ++x)
      if (h[x] != null) {
        var K = o.next(32), te = (h[x].slice(-10) + "\0\0\0\0\0\0\0\0\0\0\0").slice(0, 11);
        K.write_shift(1, te, "sbcs"), K.write_shift(1, R[x] == "?" ? "C" : R[x], "sbcs"), K.write_shift(4, m), K.write_shift(1, X[x] || i[R[x]] || 0), K.write_shift(1, Q[x] || 0), K.write_shift(1, 2), K.write_shift(4, 0), K.write_shift(1, 0), K.write_shift(4, 0), K.write_shift(4, 0), m += X[x] || i[R[x]] || 0;
      }
    var Te = o.next(264);
    for (Te.write_shift(4, 13), x = 0; x < 65; ++x)
      Te.write_shift(4, 0);
    for (x = 0; x < d.length; ++x) {
      var oe = o.next(A);
      for (oe.write_shift(1, 0), m = 0; m < h.length; ++m)
        if (h[m] != null)
          switch (R[m]) {
            case "L":
              oe.write_shift(1, d[x][m] == null ? 63 : d[x][m] ? 84 : 70);
              break;
            case "B":
              oe.write_shift(8, d[x][m] || 0, "f");
              break;
            case "N":
              var Ue = "0";
              for (typeof d[x][m] == "number" && (Ue = d[x][m].toFixed(Q[m] || 0)), O = 0; O < X[m] - Ue.length; ++O)
                oe.write_shift(1, 32);
              oe.write_shift(1, Ue, "sbcs");
              break;
            case "D":
              d[x][m] ? (oe.write_shift(4, ("0000" + d[x][m].getFullYear()).slice(-4), "sbcs"), oe.write_shift(2, ("00" + (d[x][m].getMonth() + 1)).slice(-2), "sbcs"), oe.write_shift(2, ("00" + d[x][m].getDate()).slice(-2), "sbcs")) : oe.write_shift(8, "00000000", "sbcs");
              break;
            case "C":
              var De = String(d[x][m] != null ? d[x][m] : "").slice(0, X[m]);
              for (oe.write_shift(1, De, "sbcs"), O = 0; O < X[m] - De.length; ++O)
                oe.write_shift(1, 32);
              break;
          }
    }
    return o.next(1).write_shift(1, 26), o.end();
  }
  return {
    to_workbook: a,
    to_sheet: n,
    from_sheet: s
  };
}(), _c = /* @__PURE__ */ function() {
  var e = {
    AA: "\xC0",
    BA: "\xC1",
    CA: "\xC2",
    DA: 195,
    HA: "\xC4",
    JA: 197,
    AE: "\xC8",
    BE: "\xC9",
    CE: "\xCA",
    HE: "\xCB",
    AI: "\xCC",
    BI: "\xCD",
    CI: "\xCE",
    HI: "\xCF",
    AO: "\xD2",
    BO: "\xD3",
    CO: "\xD4",
    DO: 213,
    HO: "\xD6",
    AU: "\xD9",
    BU: "\xDA",
    CU: "\xDB",
    HU: "\xDC",
    Aa: "\xE0",
    Ba: "\xE1",
    Ca: "\xE2",
    Da: 227,
    Ha: "\xE4",
    Ja: 229,
    Ae: "\xE8",
    Be: "\xE9",
    Ce: "\xEA",
    He: "\xEB",
    Ai: "\xEC",
    Bi: "\xED",
    Ci: "\xEE",
    Hi: "\xEF",
    Ao: "\xF2",
    Bo: "\xF3",
    Co: "\xF4",
    Do: 245,
    Ho: "\xF6",
    Au: "\xF9",
    Bu: "\xFA",
    Cu: "\xFB",
    Hu: "\xFC",
    KC: "\xC7",
    Kc: "\xE7",
    q: "\xE6",
    z: "\u0153",
    a: "\xC6",
    j: "\u0152",
    DN: 209,
    Dn: 241,
    Hy: 255,
    S: 169,
    c: 170,
    R: 174,
    "B ": 180,
    0: 176,
    1: 177,
    2: 178,
    3: 179,
    5: 181,
    6: 182,
    7: 183,
    Q: 185,
    k: 186,
    b: 208,
    i: 216,
    l: 222,
    s: 240,
    y: 248,
    "!": 161,
    '"': 162,
    "#": 163,
    "(": 164,
    "%": 165,
    "'": 167,
    "H ": 168,
    "+": 171,
    ";": 187,
    "<": 188,
    "=": 189,
    ">": 190,
    "?": 191,
    "{": 223
  }, t = new RegExp("\x1BN(" + je(e).join("|").replace(/\|\|\|/, "|\\||").replace(/([?()+])/g, "\\$1") + "|\\|)", "gm"), r = function(h, d) {
    var g = e[d];
    return typeof g == "number" ? $0(g) : g;
  }, n = function(h, d, g) {
    var x = d.charCodeAt(0) - 32 << 4 | g.charCodeAt(0) - 48;
    return x == 59 ? h : $0(x);
  };
  e["|"] = 254;
  function a(h, d) {
    switch (d.type) {
      case "base64":
        return i(Ir(h), d);
      case "binary":
        return i(h, d);
      case "buffer":
        return i(de && Buffer.isBuffer(h) ? h.toString("binary") : Xt(h), d);
      case "array":
        return i(kn(h), d);
    }
    throw new Error("Unrecognized type " + d.type);
  }
  function i(h, d) {
    var g = h.split(/[\n\r]+/), x = -1, m = -1, O = 0, A = 0, y = [], R = [], X = null, Q = {}, D = [], U = [], B = [], G = 0, j;
    for (+d.codepage >= 0 && Mt(+d.codepage); O !== g.length; ++O) {
      G = 0;
      var K = g[O].trim().replace(/\x1B([\x20-\x2F])([\x30-\x3F])/g, n).replace(t, r), te = K.replace(/;;/g, "\0").split(";").map(function(F) {
        return F.replace(/\u0000/g, ";");
      }), Te = te[0], oe;
      if (K.length > 0)
        switch (Te) {
          case "ID":
            break;
          case "E":
            break;
          case "B":
            break;
          case "O":
            break;
          case "W":
            break;
          case "P":
            te[1].charAt(0) == "P" && R.push(K.slice(3).replace(/;;/g, ";"));
            break;
          case "C":
            var Ue = !1, De = !1, vr = !1, Pe = !1, ur = -1, ar = -1;
            for (A = 1; A < te.length; ++A)
              switch (te[A].charAt(0)) {
                case "A":
                  break;
                case "X":
                  m = parseInt(te[A].slice(1)) - 1, De = !0;
                  break;
                case "Y":
                  for (x = parseInt(te[A].slice(1)) - 1, De || (m = 0), j = y.length; j <= x; ++j)
                    y[j] = [];
                  break;
                case "K":
                  oe = te[A].slice(1), oe.charAt(0) === '"' ? oe = oe.slice(1, oe.length - 1) : oe === "TRUE" ? oe = !0 : oe === "FALSE" ? oe = !1 : isNaN(kr(oe)) ? isNaN(Ut(oe).getDate()) || (oe = Ze(oe)) : (oe = kr(oe), X !== null && ti(X) && (oe = si(oe))), Ue = !0;
                  break;
                case "E":
                  Pe = !0;
                  var S = mu(te[A].slice(1), { r: x, c: m });
                  y[x][m] = [y[x][m], S];
                  break;
                case "S":
                  vr = !0, y[x][m] = [y[x][m], "S5S"];
                  break;
                case "G":
                  break;
                case "R":
                  ur = parseInt(te[A].slice(1)) - 1;
                  break;
                case "C":
                  ar = parseInt(te[A].slice(1)) - 1;
                  break;
                default:
                  if (d && d.WTF)
                    throw new Error("SYLK bad record " + K);
              }
            if (Ue && (y[x][m] && y[x][m].length == 2 ? y[x][m][0] = oe : y[x][m] = oe, X = null), vr) {
              if (Pe)
                throw new Error("SYLK shared formula cannot have own formula");
              var L = ur > -1 && y[ur][ar];
              if (!L || !L[1])
                throw new Error("SYLK shared formula cannot find base");
              y[x][m][1] = gu(L[1], { r: x - ur, c: m - ar });
            }
            break;
          case "F":
            var C = 0;
            for (A = 1; A < te.length; ++A)
              switch (te[A].charAt(0)) {
                case "X":
                  m = parseInt(te[A].slice(1)) - 1, ++C;
                  break;
                case "Y":
                  for (x = parseInt(te[A].slice(1)) - 1, j = y.length; j <= x; ++j)
                    y[j] = [];
                  break;
                case "M":
                  G = parseInt(te[A].slice(1)) / 20;
                  break;
                case "F":
                  break;
                case "G":
                  break;
                case "P":
                  X = R[parseInt(te[A].slice(1))];
                  break;
                case "S":
                  break;
                case "D":
                  break;
                case "N":
                  break;
                case "W":
                  for (B = te[A].slice(1).split(" "), j = parseInt(B[0], 10); j <= parseInt(B[1], 10); ++j)
                    G = parseInt(B[2], 10), U[j - 1] = G === 0 ? { hidden: !0 } : { wch: G }, w0(U[j - 1]);
                  break;
                case "C":
                  m = parseInt(te[A].slice(1)) - 1, U[m] || (U[m] = {});
                  break;
                case "R":
                  x = parseInt(te[A].slice(1)) - 1, D[x] || (D[x] = {}), G > 0 ? (D[x].hpt = G, D[x].hpx = zi(G)) : G === 0 && (D[x].hidden = !0);
                  break;
                default:
                  if (d && d.WTF)
                    throw new Error("SYLK bad record " + K);
              }
            C < 1 && (X = null);
            break;
          default:
            if (d && d.WTF)
              throw new Error("SYLK bad record " + K);
        }
    }
    return D.length > 0 && (Q["!rows"] = D), U.length > 0 && (Q["!cols"] = U), d && d.sheetRows && (y = y.slice(0, d.sheetRows)), [y, Q];
  }
  function s(h, d) {
    var g = a(h, d), x = g[0], m = g[1], O = wt(x, d);
    return je(m).forEach(function(A) {
      O[A] = m[A];
    }), O;
  }
  function f(h, d) {
    return nt(s(h, d), d);
  }
  function c(h, d, g, x) {
    var m = "C;Y" + (g + 1) + ";X" + (x + 1) + ";K";
    switch (h.t) {
      case "n":
        m += h.v || 0, h.f && !h.F && (m += ";E" + A0(h.f, { r: g, c: x }));
        break;
      case "b":
        m += h.v ? "TRUE" : "FALSE";
        break;
      case "e":
        m += h.w || h.v;
        break;
      case "d":
        m += '"' + (h.w || h.v) + '"';
        break;
      case "s":
        m += '"' + h.v.replace(/"/g, "").replace(/;/g, ";;") + '"';
        break;
    }
    return m;
  }
  function l(h, d) {
    d.forEach(function(g, x) {
      var m = "F;W" + (x + 1) + " " + (x + 1) + " ";
      g.hidden ? m += "0" : (typeof g.width == "number" && !g.wpx && (g.wpx = En(g.width)), typeof g.wpx == "number" && !g.wch && (g.wch = wn(g.wpx)), typeof g.wch == "number" && (m += Math.round(g.wch))), m.charAt(m.length - 1) != " " && h.push(m);
    });
  }
  function o(h, d) {
    d.forEach(function(g, x) {
      var m = "F;";
      g.hidden ? m += "M0;" : g.hpt ? m += "M" + 20 * g.hpt + ";" : g.hpx && (m += "M" + 20 * Sn(g.hpx) + ";"), m.length > 2 && h.push(m + "R" + (x + 1));
    });
  }
  function u(h, d) {
    var g = ["ID;PWXL;N;E"], x = [], m = Se(h["!ref"]), O, A = Array.isArray(h), y = `\r
`;
    g.push("P;PGeneral"), g.push("F;P0;DG0G8;M255"), h["!cols"] && l(g, h["!cols"]), h["!rows"] && o(g, h["!rows"]), g.push("B;Y" + (m.e.r - m.s.r + 1) + ";X" + (m.e.c - m.s.c + 1) + ";D" + [m.s.c, m.s.r, m.e.c, m.e.r].join(" "));
    for (var R = m.s.r; R <= m.e.r; ++R)
      for (var X = m.s.c; X <= m.e.c; ++X) {
        var Q = _e({ r: R, c: X });
        O = A ? (h[R] || [])[X] : h[Q], !(!O || O.v == null && (!O.f || O.F)) && x.push(c(O, h, R, X));
      }
    return g.join(y) + y + x.join(y) + y + "E" + y;
  }
  return {
    to_workbook: f,
    to_sheet: s,
    from_sheet: u
  };
}(), Tc = /* @__PURE__ */ function() {
  function e(i, s) {
    switch (s.type) {
      case "base64":
        return t(Ir(i), s);
      case "binary":
        return t(i, s);
      case "buffer":
        return t(de && Buffer.isBuffer(i) ? i.toString("binary") : Xt(i), s);
      case "array":
        return t(kn(i), s);
    }
    throw new Error("Unrecognized type " + s.type);
  }
  function t(i, s) {
    for (var f = i.split(`
`), c = -1, l = -1, o = 0, u = []; o !== f.length; ++o) {
      if (f[o].trim() === "BOT") {
        u[++c] = [], l = 0;
        continue;
      }
      if (!(c < 0)) {
        var h = f[o].trim().split(","), d = h[0], g = h[1];
        ++o;
        for (var x = f[o] || ""; (x.match(/["]/g) || []).length & 1 && o < f.length - 1; )
          x += `
` + f[++o];
        switch (x = x.trim(), +d) {
          case -1:
            if (x === "BOT") {
              u[++c] = [], l = 0;
              continue;
            } else if (x !== "EOD")
              throw new Error("Unrecognized DIF special command " + x);
            break;
          case 0:
            x === "TRUE" ? u[c][l] = !0 : x === "FALSE" ? u[c][l] = !1 : isNaN(kr(g)) ? isNaN(Ut(g).getDate()) ? u[c][l] = g : u[c][l] = Ze(g) : u[c][l] = kr(g), ++l;
            break;
          case 1:
            x = x.slice(1, x.length - 1), x = x.replace(/""/g, '"'), x && x.match(/^=".*"$/) && (x = x.slice(2, -1)), u[c][l++] = x !== "" ? x : null;
            break;
        }
        if (x === "EOD")
          break;
      }
    }
    return s && s.sheetRows && (u = u.slice(0, s.sheetRows)), u;
  }
  function r(i, s) {
    return wt(e(i, s), s);
  }
  function n(i, s) {
    return nt(r(i, s), s);
  }
  var a = /* @__PURE__ */ function() {
    var i = function(c, l, o, u, h) {
      c.push(l), c.push(o + "," + u), c.push('"' + h.replace(/"/g, '""') + '"');
    }, s = function(c, l, o, u) {
      c.push(l + "," + o), c.push(l == 1 ? '"' + u.replace(/"/g, '""') + '"' : u);
    };
    return function(c) {
      var l = [], o = Se(c["!ref"]), u, h = Array.isArray(c);
      i(l, "TABLE", 0, 1, "sheetjs"), i(l, "VECTORS", 0, o.e.r - o.s.r + 1, ""), i(l, "TUPLES", 0, o.e.c - o.s.c + 1, ""), i(l, "DATA", 0, 0, "");
      for (var d = o.s.r; d <= o.e.r; ++d) {
        s(l, -1, 0, "BOT");
        for (var g = o.s.c; g <= o.e.c; ++g) {
          var x = _e({ r: d, c: g });
          if (u = h ? (c[d] || [])[g] : c[x], !u) {
            s(l, 1, 0, "");
            continue;
          }
          switch (u.t) {
            case "n":
              var m = u.w;
              !m && u.v != null && (m = u.v), m == null ? u.f && !u.F ? s(l, 1, 0, "=" + u.f) : s(l, 1, 0, "") : s(l, 0, m, "V");
              break;
            case "b":
              s(l, 0, u.v ? 1 : 0, u.v ? "TRUE" : "FALSE");
              break;
            case "s":
              s(l, 1, 0, isNaN(u.v) ? u.v : '="' + u.v + '"');
              break;
            case "d":
              u.w || (u.w = Vr(u.z || Oe[14], rr(Ze(u.v)))), s(l, 0, u.w, "V");
              break;
            default:
              s(l, 1, 0, "");
          }
        }
      }
      s(l, -1, 0, "EOD");
      var O = `\r
`, A = l.join(O);
      return A;
    };
  }();
  return {
    to_workbook: n,
    to_sheet: r,
    from_sheet: a
  };
}(), Gi = /* @__PURE__ */ function() {
  function e(u) {
    return u.replace(/\\b/g, "\\").replace(/\\c/g, ":").replace(/\\n/g, `
`);
  }
  function t(u) {
    return u.replace(/\\/g, "\\b").replace(/:/g, "\\c").replace(/\n/g, "\\n");
  }
  function r(u, h) {
    for (var d = u.split(`
`), g = -1, x = -1, m = 0, O = []; m !== d.length; ++m) {
      var A = d[m].trim().split(":");
      if (A[0] === "cell") {
        var y = Me(A[1]);
        if (O.length <= y.r)
          for (g = O.length; g <= y.r; ++g)
            O[g] || (O[g] = []);
        switch (g = y.r, x = y.c, A[2]) {
          case "t":
            O[g][x] = e(A[3]);
            break;
          case "v":
            O[g][x] = +A[3];
            break;
          case "vtf":
            var R = A[A.length - 1];
          case "vtc":
            switch (A[3]) {
              case "nl":
                O[g][x] = !!+A[4];
                break;
              default:
                O[g][x] = +A[4];
                break;
            }
            A[2] == "vtf" && (O[g][x] = [O[g][x], R]);
        }
      }
    }
    return h && h.sheetRows && (O = O.slice(0, h.sheetRows)), O;
  }
  function n(u, h) {
    return wt(r(u, h), h);
  }
  function a(u, h) {
    return nt(n(u, h), h);
  }
  var i = [
    "socialcalc:version:1.5",
    "MIME-Version: 1.0",
    "Content-Type: multipart/mixed; boundary=SocialCalcSpreadsheetControlSave"
  ].join(`
`), s = [
    "--SocialCalcSpreadsheetControlSave",
    "Content-type: text/plain; charset=UTF-8"
  ].join(`
`) + `
`, f = [
    "# SocialCalc Spreadsheet Control Save",
    "part:sheet"
  ].join(`
`), c = "--SocialCalcSpreadsheetControlSave--";
  function l(u) {
    if (!u || !u["!ref"])
      return "";
    for (var h = [], d = [], g, x = "", m = cr(u["!ref"]), O = Array.isArray(u), A = m.s.r; A <= m.e.r; ++A)
      for (var y = m.s.c; y <= m.e.c; ++y)
        if (x = _e({ r: A, c: y }), g = O ? (u[A] || [])[y] : u[x], !(!g || g.v == null || g.t === "z")) {
          switch (d = ["cell", x, "t"], g.t) {
            case "s":
            case "str":
              d.push(t(g.v));
              break;
            case "n":
              g.f ? (d[2] = "vtf", d[3] = "n", d[4] = g.v, d[5] = t(g.f)) : (d[2] = "v", d[3] = g.v);
              break;
            case "b":
              d[2] = "vt" + (g.f ? "f" : "c"), d[3] = "nl", d[4] = g.v ? "1" : "0", d[5] = t(g.f || (g.v ? "TRUE" : "FALSE"));
              break;
            case "d":
              var R = rr(Ze(g.v));
              d[2] = "vtc", d[3] = "nd", d[4] = "" + R, d[5] = g.w || Vr(g.z || Oe[14], R);
              break;
            case "e":
              continue;
          }
          h.push(d.join(":"));
        }
    return h.push("sheet:c:" + (m.e.c - m.s.c + 1) + ":r:" + (m.e.r - m.s.r + 1) + ":tvf:1"), h.push("valueformat:1:text-wiki"), h.join(`
`);
  }
  function o(u) {
    return [i, s, f, s, l(u), c].join(`
`);
  }
  return {
    to_workbook: a,
    to_sheet: n,
    from_sheet: o
  };
}(), Ec = /* @__PURE__ */ function() {
  function e(o, u, h, d, g) {
    g.raw ? u[h][d] = o : o === "" || (o === "TRUE" ? u[h][d] = !0 : o === "FALSE" ? u[h][d] = !1 : isNaN(kr(o)) ? isNaN(Ut(o).getDate()) ? u[h][d] = o : u[h][d] = Ze(o) : u[h][d] = kr(o));
  }
  function t(o, u) {
    var h = u || {}, d = [];
    if (!o || o.length === 0)
      return d;
    for (var g = o.split(/[\r\n]/), x = g.length - 1; x >= 0 && g[x].length === 0; )
      --x;
    for (var m = 10, O = 0, A = 0; A <= x; ++A)
      O = g[A].indexOf(" "), O == -1 ? O = g[A].length : O++, m = Math.max(m, O);
    for (A = 0; A <= x; ++A) {
      d[A] = [];
      var y = 0;
      for (e(g[A].slice(0, m).trim(), d, A, y, h), y = 1; y <= (g[A].length - m) / 10 + 1; ++y)
        e(g[A].slice(m + (y - 1) * 10, m + y * 10).trim(), d, A, y, h);
    }
    return h.sheetRows && (d = d.slice(0, h.sheetRows)), d;
  }
  var r = {
    44: ",",
    9: "	",
    59: ";",
    124: "|"
  }, n = {
    44: 3,
    9: 2,
    59: 1,
    124: 0
  };
  function a(o) {
    for (var u = {}, h = !1, d = 0, g = 0; d < o.length; ++d)
      (g = o.charCodeAt(d)) == 34 ? h = !h : !h && g in r && (u[g] = (u[g] || 0) + 1);
    g = [];
    for (d in u)
      Object.prototype.hasOwnProperty.call(u, d) && g.push([u[d], d]);
    if (!g.length) {
      u = n;
      for (d in u)
        Object.prototype.hasOwnProperty.call(u, d) && g.push([u[d], d]);
    }
    return g.sort(function(x, m) {
      return x[0] - m[0] || n[x[1]] - n[m[1]];
    }), r[g.pop()[1]] || 44;
  }
  function i(o, u) {
    var h = u || {}, d = "", g = h.dense ? [] : {}, x = { s: { c: 0, r: 0 }, e: { c: 0, r: 0 } };
    o.slice(0, 4) == "sep=" ? o.charCodeAt(5) == 13 && o.charCodeAt(6) == 10 ? (d = o.charAt(4), o = o.slice(7)) : o.charCodeAt(5) == 13 || o.charCodeAt(5) == 10 ? (d = o.charAt(4), o = o.slice(6)) : d = a(o.slice(0, 1024)) : h && h.FS ? d = h.FS : d = a(o.slice(0, 1024));
    var m = 0, O = 0, A = 0, y = 0, R = 0, X = d.charCodeAt(0), Q = !1, D = 0, U = o.charCodeAt(0);
    o = o.replace(/\r\n/mg, `
`);
    var B = h.dateNF != null ? Bl(h.dateNF) : null;
    function G() {
      var j = o.slice(y, R), K = {};
      if (j.charAt(0) == '"' && j.charAt(j.length - 1) == '"' && (j = j.slice(1, -1).replace(/""/g, '"')), j.length === 0)
        K.t = "z";
      else if (h.raw)
        K.t = "s", K.v = j;
      else if (j.trim().length === 0)
        K.t = "s", K.v = j;
      else if (j.charCodeAt(0) == 61)
        j.charCodeAt(1) == 34 && j.charCodeAt(j.length - 1) == 34 ? (K.t = "s", K.v = j.slice(2, -1).replace(/""/g, '"')) : _u(j) ? (K.t = "n", K.f = j.slice(1)) : (K.t = "s", K.v = j);
      else if (j == "TRUE")
        K.t = "b", K.v = !0;
      else if (j == "FALSE")
        K.t = "b", K.v = !1;
      else if (!isNaN(A = kr(j)))
        K.t = "n", h.cellText !== !1 && (K.w = j), K.v = A;
      else if (!isNaN(Ut(j).getDate()) || B && j.match(B)) {
        K.z = h.dateNF || Oe[14];
        var te = 0;
        B && j.match(B) && (j = Ml(j, h.dateNF, j.match(B) || []), te = 1), h.cellDates ? (K.t = "d", K.v = Ze(j, te)) : (K.t = "n", K.v = rr(Ze(j, te))), h.cellText !== !1 && (K.w = Vr(K.z, K.v instanceof Date ? rr(K.v) : K.v)), h.cellNF || delete K.z;
      } else
        K.t = "s", K.v = j;
      if (K.t == "z" || (h.dense ? (g[m] || (g[m] = []), g[m][O] = K) : g[_e({ c: O, r: m })] = K), y = R + 1, U = o.charCodeAt(y), x.e.c < O && (x.e.c = O), x.e.r < m && (x.e.r = m), D == X)
        ++O;
      else if (O = 0, ++m, h.sheetRows && h.sheetRows <= m)
        return !0;
    }
    e:
      for (; R < o.length; ++R)
        switch (D = o.charCodeAt(R)) {
          case 34:
            U === 34 && (Q = !Q);
            break;
          case X:
          case 10:
          case 13:
            if (!Q && G())
              break e;
            break;
        }
    return R - y > 0 && G(), g["!ref"] = ke(x), g;
  }
  function s(o, u) {
    return !(u && u.PRN) || u.FS || o.slice(0, 4) == "sep=" || o.indexOf("	") >= 0 || o.indexOf(",") >= 0 || o.indexOf(";") >= 0 ? i(o, u) : wt(t(o, u), u);
  }
  function f(o, u) {
    var h = "", d = u.type == "string" ? [0, 0, 0, 0] : I2(o, u);
    switch (u.type) {
      case "base64":
        h = Ir(o);
        break;
      case "binary":
        h = o;
        break;
      case "buffer":
        u.codepage == 65001 ? h = o.toString("utf8") : u.codepage && typeof Yr < "u" ? h = Yr.utils.decode(u.codepage, o) : h = de && Buffer.isBuffer(o) ? o.toString("binary") : Xt(o);
        break;
      case "array":
        h = kn(o);
        break;
      case "string":
        h = o;
        break;
      default:
        throw new Error("Unrecognized type " + u.type);
    }
    return d[0] == 239 && d[1] == 187 && d[2] == 191 ? h = Nt(h.slice(3)) : u.type != "string" && u.type != "buffer" && u.codepage == 65001 ? h = Nt(h) : u.type == "binary" && typeof Yr < "u" && u.codepage && (h = Yr.utils.decode(u.codepage, Yr.utils.encode(28591, h))), h.slice(0, 19) == "socialcalc:version:" ? Gi.to_sheet(u.type == "string" ? h : Nt(h), u) : s(h, u);
  }
  function c(o, u) {
    return nt(f(o, u), u);
  }
  function l(o) {
    for (var u = [], h = Se(o["!ref"]), d, g = Array.isArray(o), x = h.s.r; x <= h.e.r; ++x) {
      for (var m = [], O = h.s.c; O <= h.e.c; ++O) {
        var A = _e({ r: x, c: O });
        if (d = g ? (o[x] || [])[O] : o[A], !d || d.v == null) {
          m.push("          ");
          continue;
        }
        for (var y = (d.w || (Pr(d), d.w) || "").slice(0, 10); y.length < 10; )
          y += " ";
        m.push(y + (O === 0 ? " " : ""));
      }
      u.push(m.join(""));
    }
    return u.join(`
`);
  }
  return {
    to_workbook: c,
    to_sheet: f,
    from_sheet: l
  };
}(), Sa = /* @__PURE__ */ function() {
  function e(S, L, C) {
    if (!!S) {
      sr(S, S.l || 0);
      for (var F = C.Enum || ur; S.l < S.length; ) {
        var V = S.read_shift(2), se = F[V] || F[65535], fe = S.read_shift(2), ie = S.l + fe, ee = se.f && se.f(S, fe, C);
        if (S.l = ie, L(ee, se, V))
          return;
      }
    }
  }
  function t(S, L) {
    switch (L.type) {
      case "base64":
        return r(_r(Ir(S)), L);
      case "binary":
        return r(_r(S), L);
      case "buffer":
      case "array":
        return r(S, L);
    }
    throw "Unsupported type " + L.type;
  }
  function r(S, L) {
    if (!S)
      return S;
    var C = L || {}, F = C.dense ? [] : {}, V = "Sheet1", se = "", fe = 0, ie = {}, ee = [], we = [], he = { s: { r: 0, c: 0 }, e: { r: 0, c: 0 } }, Ye = C.sheetRows || 0;
    if (S[2] == 0 && (S[3] == 8 || S[3] == 9) && S.length >= 16 && S[14] == 5 && S[15] === 108)
      throw new Error("Unsupported Works 3 for Mac file");
    if (S[2] == 2)
      C.Enum = ur, e(S, function(ae, hr, Cr) {
        switch (Cr) {
          case 0:
            C.vers = ae, ae >= 4096 && (C.qpro = !0);
            break;
          case 6:
            he = ae;
            break;
          case 204:
            ae && (se = ae);
            break;
          case 222:
            se = ae;
            break;
          case 15:
          case 51:
            C.qpro || (ae[1].v = ae[1].v.slice(1));
          case 13:
          case 14:
          case 16:
            Cr == 14 && (ae[2] & 112) == 112 && (ae[2] & 15) > 1 && (ae[2] & 15) < 15 && (ae[1].z = C.dateNF || Oe[14], C.cellDates && (ae[1].t = "d", ae[1].v = si(ae[1].v))), C.qpro && ae[3] > fe && (F["!ref"] = ke(he), ie[V] = F, ee.push(V), F = C.dense ? [] : {}, he = { s: { r: 0, c: 0 }, e: { r: 0, c: 0 } }, fe = ae[3], V = se || "Sheet" + (fe + 1), se = "");
            var $r = C.dense ? (F[ae[0].r] || [])[ae[0].c] : F[_e(ae[0])];
            if ($r) {
              $r.t = ae[1].t, $r.v = ae[1].v, ae[1].z != null && ($r.z = ae[1].z), ae[1].f != null && ($r.f = ae[1].f);
              break;
            }
            C.dense ? (F[ae[0].r] || (F[ae[0].r] = []), F[ae[0].r][ae[0].c] = ae[1]) : F[_e(ae[0])] = ae[1];
            break;
        }
      }, C);
    else if (S[2] == 26 || S[2] == 14)
      C.Enum = ar, S[2] == 14 && (C.qpro = !0, S.l = 0), e(S, function(ae, hr, Cr) {
        switch (Cr) {
          case 204:
            V = ae;
            break;
          case 22:
            ae[1].v = ae[1].v.slice(1);
          case 23:
          case 24:
          case 25:
          case 37:
          case 39:
          case 40:
            if (ae[3] > fe && (F["!ref"] = ke(he), ie[V] = F, ee.push(V), F = C.dense ? [] : {}, he = { s: { r: 0, c: 0 }, e: { r: 0, c: 0 } }, fe = ae[3], V = "Sheet" + (fe + 1)), Ye > 0 && ae[0].r >= Ye)
              break;
            C.dense ? (F[ae[0].r] || (F[ae[0].r] = []), F[ae[0].r][ae[0].c] = ae[1]) : F[_e(ae[0])] = ae[1], he.e.c < ae[0].c && (he.e.c = ae[0].c), he.e.r < ae[0].r && (he.e.r = ae[0].r);
            break;
          case 27:
            ae[14e3] && (we[ae[14e3][0]] = ae[14e3][1]);
            break;
          case 1537:
            we[ae[0]] = ae[1], ae[0] == fe && (V = ae[1]);
            break;
        }
      }, C);
    else
      throw new Error("Unrecognized LOTUS BOF " + S[2]);
    if (F["!ref"] = ke(he), ie[se || V] = F, ee.push(se || V), !we.length)
      return { SheetNames: ee, Sheets: ie };
    for (var pe = {}, Fr = [], Fe = 0; Fe < we.length; ++Fe)
      ie[ee[Fe]] ? (Fr.push(we[Fe] || ee[Fe]), pe[we[Fe]] = ie[we[Fe]] || ie[ee[Fe]]) : (Fr.push(we[Fe]), pe[we[Fe]] = { "!ref": "A1" });
    return { SheetNames: Fr, Sheets: pe };
  }
  function n(S, L) {
    var C = L || {};
    if (+C.codepage >= 0 && Mt(+C.codepage), C.type == "string")
      throw new Error("Cannot write WK1 to JS string");
    var F = er(), V = Se(S["!ref"]), se = Array.isArray(S), fe = [];
    J(F, 0, i(1030)), J(F, 6, c(V));
    for (var ie = Math.min(V.e.r, 8191), ee = V.s.r; ee <= ie; ++ee)
      for (var we = Xe(ee), he = V.s.c; he <= V.e.c; ++he) {
        ee === V.s.r && (fe[he] = ze(he));
        var Ye = fe[he] + we, pe = se ? (S[ee] || [])[he] : S[Ye];
        if (!(!pe || pe.t == "z"))
          if (pe.t == "n")
            (pe.v | 0) == pe.v && pe.v >= -32768 && pe.v <= 32767 ? J(F, 13, d(ee, he, pe.v)) : J(F, 14, x(ee, he, pe.v));
          else {
            var Fr = Pr(pe);
            J(F, 15, u(ee, he, Fr.slice(0, 239)));
          }
      }
    return J(F, 1), F.end();
  }
  function a(S, L) {
    var C = L || {};
    if (+C.codepage >= 0 && Mt(+C.codepage), C.type == "string")
      throw new Error("Cannot write WK3 to JS string");
    var F = er();
    J(F, 0, s(S));
    for (var V = 0, se = 0; V < S.SheetNames.length; ++V)
      (S.Sheets[S.SheetNames[V]] || {})["!ref"] && J(F, 27, Pe(S.SheetNames[V], se++));
    var fe = 0;
    for (V = 0; V < S.SheetNames.length; ++V) {
      var ie = S.Sheets[S.SheetNames[V]];
      if (!(!ie || !ie["!ref"])) {
        for (var ee = Se(ie["!ref"]), we = Array.isArray(ie), he = [], Ye = Math.min(ee.e.r, 8191), pe = ee.s.r; pe <= Ye; ++pe)
          for (var Fr = Xe(pe), Fe = ee.s.c; Fe <= ee.e.c; ++Fe) {
            pe === ee.s.r && (he[Fe] = ze(Fe));
            var ae = he[Fe] + Fr, hr = we ? (ie[pe] || [])[Fe] : ie[ae];
            if (!(!hr || hr.t == "z"))
              if (hr.t == "n")
                J(F, 23, G(pe, Fe, fe, hr.v));
              else {
                var Cr = Pr(hr);
                J(F, 22, D(pe, Fe, fe, Cr.slice(0, 239)));
              }
          }
        ++fe;
      }
    }
    return J(F, 1), F.end();
  }
  function i(S) {
    var L = M(2);
    return L.write_shift(2, S), L;
  }
  function s(S) {
    var L = M(26);
    L.write_shift(2, 4096), L.write_shift(2, 4), L.write_shift(4, 0);
    for (var C = 0, F = 0, V = 0, se = 0; se < S.SheetNames.length; ++se) {
      var fe = S.SheetNames[se], ie = S.Sheets[fe];
      if (!(!ie || !ie["!ref"])) {
        ++V;
        var ee = cr(ie["!ref"]);
        C < ee.e.r && (C = ee.e.r), F < ee.e.c && (F = ee.e.c);
      }
    }
    return C > 8191 && (C = 8191), L.write_shift(2, C), L.write_shift(1, V), L.write_shift(1, F), L.write_shift(2, 0), L.write_shift(2, 0), L.write_shift(1, 1), L.write_shift(1, 2), L.write_shift(4, 0), L.write_shift(4, 0), L;
  }
  function f(S, L, C) {
    var F = { s: { c: 0, r: 0 }, e: { c: 0, r: 0 } };
    return L == 8 && C.qpro ? (F.s.c = S.read_shift(1), S.l++, F.s.r = S.read_shift(2), F.e.c = S.read_shift(1), S.l++, F.e.r = S.read_shift(2), F) : (F.s.c = S.read_shift(2), F.s.r = S.read_shift(2), L == 12 && C.qpro && (S.l += 2), F.e.c = S.read_shift(2), F.e.r = S.read_shift(2), L == 12 && C.qpro && (S.l += 2), F.s.c == 65535 && (F.s.c = F.e.c = F.s.r = F.e.r = 0), F);
  }
  function c(S) {
    var L = M(8);
    return L.write_shift(2, S.s.c), L.write_shift(2, S.s.r), L.write_shift(2, S.e.c), L.write_shift(2, S.e.r), L;
  }
  function l(S, L, C) {
    var F = [{ c: 0, r: 0 }, { t: "n", v: 0 }, 0, 0];
    return C.qpro && C.vers != 20768 ? (F[0].c = S.read_shift(1), F[3] = S.read_shift(1), F[0].r = S.read_shift(2), S.l += 2) : (F[2] = S.read_shift(1), F[0].c = S.read_shift(2), F[0].r = S.read_shift(2)), F;
  }
  function o(S, L, C) {
    var F = S.l + L, V = l(S, L, C);
    if (V[1].t = "s", C.vers == 20768) {
      S.l++;
      var se = S.read_shift(1);
      return V[1].v = S.read_shift(se, "utf8"), V;
    }
    return C.qpro && S.l++, V[1].v = S.read_shift(F - S.l, "cstr"), V;
  }
  function u(S, L, C) {
    var F = M(7 + C.length);
    F.write_shift(1, 255), F.write_shift(2, L), F.write_shift(2, S), F.write_shift(1, 39);
    for (var V = 0; V < F.length; ++V) {
      var se = C.charCodeAt(V);
      F.write_shift(1, se >= 128 ? 95 : se);
    }
    return F.write_shift(1, 0), F;
  }
  function h(S, L, C) {
    var F = l(S, L, C);
    return F[1].v = S.read_shift(2, "i"), F;
  }
  function d(S, L, C) {
    var F = M(7);
    return F.write_shift(1, 255), F.write_shift(2, L), F.write_shift(2, S), F.write_shift(2, C, "i"), F;
  }
  function g(S, L, C) {
    var F = l(S, L, C);
    return F[1].v = S.read_shift(8, "f"), F;
  }
  function x(S, L, C) {
    var F = M(13);
    return F.write_shift(1, 255), F.write_shift(2, L), F.write_shift(2, S), F.write_shift(8, C, "f"), F;
  }
  function m(S, L, C) {
    var F = S.l + L, V = l(S, L, C);
    if (V[1].v = S.read_shift(8, "f"), C.qpro)
      S.l = F;
    else {
      var se = S.read_shift(2);
      R(S.slice(S.l, S.l + se), V), S.l += se;
    }
    return V;
  }
  function O(S, L, C) {
    var F = L & 32768;
    return L &= -32769, L = (F ? S : 0) + (L >= 8192 ? L - 16384 : L), (F ? "" : "$") + (C ? ze(L) : Xe(L));
  }
  var A = {
    51: ["FALSE", 0],
    52: ["TRUE", 0],
    70: ["LEN", 1],
    80: ["SUM", 69],
    81: ["AVERAGEA", 69],
    82: ["COUNTA", 69],
    83: ["MINA", 69],
    84: ["MAXA", 69],
    111: ["T", 1]
  }, y = [
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "+",
    "-",
    "*",
    "/",
    "^",
    "=",
    "<>",
    "<=",
    ">=",
    "<",
    ">",
    "",
    "",
    "",
    "",
    "&",
    "",
    "",
    "",
    "",
    "",
    "",
    ""
  ];
  function R(S, L) {
    sr(S, 0);
    for (var C = [], F = 0, V = "", se = "", fe = "", ie = ""; S.l < S.length; ) {
      var ee = S[S.l++];
      switch (ee) {
        case 0:
          C.push(S.read_shift(8, "f"));
          break;
        case 1:
          se = O(L[0].c, S.read_shift(2), !0), V = O(L[0].r, S.read_shift(2), !1), C.push(se + V);
          break;
        case 2:
          {
            var we = O(L[0].c, S.read_shift(2), !0), he = O(L[0].r, S.read_shift(2), !1);
            se = O(L[0].c, S.read_shift(2), !0), V = O(L[0].r, S.read_shift(2), !1), C.push(we + he + ":" + se + V);
          }
          break;
        case 3:
          if (S.l < S.length) {
            console.error("WK1 premature formula end");
            return;
          }
          break;
        case 4:
          C.push("(" + C.pop() + ")");
          break;
        case 5:
          C.push(S.read_shift(2));
          break;
        case 6:
          {
            for (var Ye = ""; ee = S[S.l++]; )
              Ye += String.fromCharCode(ee);
            C.push('"' + Ye.replace(/"/g, '""') + '"');
          }
          break;
        case 8:
          C.push("-" + C.pop());
          break;
        case 23:
          C.push("+" + C.pop());
          break;
        case 22:
          C.push("NOT(" + C.pop() + ")");
          break;
        case 20:
        case 21:
          ie = C.pop(), fe = C.pop(), C.push(["AND", "OR"][ee - 20] + "(" + fe + "," + ie + ")");
          break;
        default:
          if (ee < 32 && y[ee])
            ie = C.pop(), fe = C.pop(), C.push(fe + y[ee] + ie);
          else if (A[ee]) {
            if (F = A[ee][1], F == 69 && (F = S[S.l++]), F > C.length) {
              console.error("WK1 bad formula parse 0x" + ee.toString(16) + ":|" + C.join("|") + "|");
              return;
            }
            var pe = C.slice(-F);
            C.length -= F, C.push(A[ee][0] + "(" + pe.join(",") + ")");
          } else
            return ee <= 7 ? console.error("WK1 invalid opcode " + ee.toString(16)) : ee <= 24 ? console.error("WK1 unsupported op " + ee.toString(16)) : ee <= 30 ? console.error("WK1 invalid opcode " + ee.toString(16)) : ee <= 115 ? console.error("WK1 unsupported function opcode " + ee.toString(16)) : console.error("WK1 unrecognized opcode " + ee.toString(16));
      }
    }
    C.length == 1 ? L[1].f = "" + C[0] : console.error("WK1 bad formula parse |" + C.join("|") + "|");
  }
  function X(S) {
    var L = [{ c: 0, r: 0 }, { t: "n", v: 0 }, 0];
    return L[0].r = S.read_shift(2), L[3] = S[S.l++], L[0].c = S[S.l++], L;
  }
  function Q(S, L) {
    var C = X(S);
    return C[1].t = "s", C[1].v = S.read_shift(L - 4, "cstr"), C;
  }
  function D(S, L, C, F) {
    var V = M(6 + F.length);
    V.write_shift(2, S), V.write_shift(1, C), V.write_shift(1, L), V.write_shift(1, 39);
    for (var se = 0; se < F.length; ++se) {
      var fe = F.charCodeAt(se);
      V.write_shift(1, fe >= 128 ? 95 : fe);
    }
    return V.write_shift(1, 0), V;
  }
  function U(S, L) {
    var C = X(S);
    C[1].v = S.read_shift(2);
    var F = C[1].v >> 1;
    if (C[1].v & 1)
      switch (F & 7) {
        case 0:
          F = (F >> 3) * 5e3;
          break;
        case 1:
          F = (F >> 3) * 500;
          break;
        case 2:
          F = (F >> 3) / 20;
          break;
        case 3:
          F = (F >> 3) / 200;
          break;
        case 4:
          F = (F >> 3) / 2e3;
          break;
        case 5:
          F = (F >> 3) / 2e4;
          break;
        case 6:
          F = (F >> 3) / 16;
          break;
        case 7:
          F = (F >> 3) / 64;
          break;
      }
    return C[1].v = F, C;
  }
  function B(S, L) {
    var C = X(S), F = S.read_shift(4), V = S.read_shift(4), se = S.read_shift(2);
    if (se == 65535)
      return F === 0 && V === 3221225472 ? (C[1].t = "e", C[1].v = 15) : F === 0 && V === 3489660928 ? (C[1].t = "e", C[1].v = 42) : C[1].v = 0, C;
    var fe = se & 32768;
    return se = (se & 32767) - 16446, C[1].v = (1 - fe * 2) * (V * Math.pow(2, se + 32) + F * Math.pow(2, se)), C;
  }
  function G(S, L, C, F) {
    var V = M(14);
    if (V.write_shift(2, S), V.write_shift(1, C), V.write_shift(1, L), F == 0)
      return V.write_shift(4, 0), V.write_shift(4, 0), V.write_shift(2, 65535), V;
    var se = 0, fe = 0, ie = 0, ee = 0;
    return F < 0 && (se = 1, F = -F), fe = Math.log2(F) | 0, F /= Math.pow(2, fe - 31), ee = F >>> 0, (ee & 2147483648) == 0 && (F /= 2, ++fe, ee = F >>> 0), F -= ee, ee |= 2147483648, ee >>>= 0, F *= Math.pow(2, 32), ie = F >>> 0, V.write_shift(4, ie), V.write_shift(4, ee), fe += 16383 + (se ? 32768 : 0), V.write_shift(2, fe), V;
  }
  function j(S, L) {
    var C = B(S);
    return S.l += L - 14, C;
  }
  function K(S, L) {
    var C = X(S), F = S.read_shift(4);
    return C[1].v = F >> 6, C;
  }
  function te(S, L) {
    var C = X(S), F = S.read_shift(8, "f");
    return C[1].v = F, C;
  }
  function Te(S, L) {
    var C = te(S);
    return S.l += L - 10, C;
  }
  function oe(S, L) {
    return S[S.l + L - 1] == 0 ? S.read_shift(L, "cstr") : "";
  }
  function Ue(S, L) {
    var C = S[S.l++];
    C > L - 1 && (C = L - 1);
    for (var F = ""; F.length < C; )
      F += String.fromCharCode(S[S.l++]);
    return F;
  }
  function De(S, L, C) {
    if (!(!C.qpro || L < 21)) {
      var F = S.read_shift(1);
      S.l += 17, S.l += 1, S.l += 2;
      var V = S.read_shift(L - 21, "cstr");
      return [F, V];
    }
  }
  function vr(S, L) {
    for (var C = {}, F = S.l + L; S.l < F; ) {
      var V = S.read_shift(2);
      if (V == 14e3) {
        for (C[V] = [0, ""], C[V][0] = S.read_shift(2); S[S.l]; )
          C[V][1] += String.fromCharCode(S[S.l]), S.l++;
        S.l++;
      }
    }
    return C;
  }
  function Pe(S, L) {
    var C = M(5 + S.length);
    C.write_shift(2, 14e3), C.write_shift(2, L);
    for (var F = 0; F < S.length; ++F) {
      var V = S.charCodeAt(F);
      C[C.l++] = V > 127 ? 95 : V;
    }
    return C[C.l++] = 0, C;
  }
  var ur = {
    0: { n: "BOF", f: bi },
    1: { n: "EOF" },
    2: { n: "CALCMODE" },
    3: { n: "CALCORDER" },
    4: { n: "SPLIT" },
    5: { n: "SYNC" },
    6: { n: "RANGE", f },
    7: { n: "WINDOW1" },
    8: { n: "COLW1" },
    9: { n: "WINTWO" },
    10: { n: "COLW2" },
    11: { n: "NAME" },
    12: { n: "BLANK" },
    13: { n: "INTEGER", f: h },
    14: { n: "NUMBER", f: g },
    15: { n: "LABEL", f: o },
    16: { n: "FORMULA", f: m },
    24: { n: "TABLE" },
    25: { n: "ORANGE" },
    26: { n: "PRANGE" },
    27: { n: "SRANGE" },
    28: { n: "FRANGE" },
    29: { n: "KRANGE1" },
    32: { n: "HRANGE" },
    35: { n: "KRANGE2" },
    36: { n: "PROTEC" },
    37: { n: "FOOTER" },
    38: { n: "HEADER" },
    39: { n: "SETUP" },
    40: { n: "MARGINS" },
    41: { n: "LABELFMT" },
    42: { n: "TITLES" },
    43: { n: "SHEETJS" },
    45: { n: "GRAPH" },
    46: { n: "NGRAPH" },
    47: { n: "CALCCOUNT" },
    48: { n: "UNFORMATTED" },
    49: { n: "CURSORW12" },
    50: { n: "WINDOW" },
    51: { n: "STRING", f: o },
    55: { n: "PASSWORD" },
    56: { n: "LOCKED" },
    60: { n: "QUERY" },
    61: { n: "QUERYNAME" },
    62: { n: "PRINT" },
    63: { n: "PRINTNAME" },
    64: { n: "GRAPH2" },
    65: { n: "GRAPHNAME" },
    66: { n: "ZOOM" },
    67: { n: "SYMSPLIT" },
    68: { n: "NSROWS" },
    69: { n: "NSCOLS" },
    70: { n: "RULER" },
    71: { n: "NNAME" },
    72: { n: "ACOMM" },
    73: { n: "AMACRO" },
    74: { n: "PARSE" },
    102: { n: "PRANGES??" },
    103: { n: "RRANGES??" },
    104: { n: "FNAME??" },
    105: { n: "MRANGES??" },
    204: { n: "SHEETNAMECS", f: oe },
    222: { n: "SHEETNAMELP", f: Ue },
    65535: { n: "" }
  }, ar = {
    0: { n: "BOF" },
    1: { n: "EOF" },
    2: { n: "PASSWORD" },
    3: { n: "CALCSET" },
    4: { n: "WINDOWSET" },
    5: { n: "SHEETCELLPTR" },
    6: { n: "SHEETLAYOUT" },
    7: { n: "COLUMNWIDTH" },
    8: { n: "HIDDENCOLUMN" },
    9: { n: "USERRANGE" },
    10: { n: "SYSTEMRANGE" },
    11: { n: "ZEROFORCE" },
    12: { n: "SORTKEYDIR" },
    13: { n: "FILESEAL" },
    14: { n: "DATAFILLNUMS" },
    15: { n: "PRINTMAIN" },
    16: { n: "PRINTSTRING" },
    17: { n: "GRAPHMAIN" },
    18: { n: "GRAPHSTRING" },
    19: { n: "??" },
    20: { n: "ERRCELL" },
    21: { n: "NACELL" },
    22: { n: "LABEL16", f: Q },
    23: { n: "NUMBER17", f: B },
    24: { n: "NUMBER18", f: U },
    25: { n: "FORMULA19", f: j },
    26: { n: "FORMULA1A" },
    27: { n: "XFORMAT", f: vr },
    28: { n: "DTLABELMISC" },
    29: { n: "DTLABELCELL" },
    30: { n: "GRAPHWINDOW" },
    31: { n: "CPA" },
    32: { n: "LPLAUTO" },
    33: { n: "QUERY" },
    34: { n: "HIDDENSHEET" },
    35: { n: "??" },
    37: { n: "NUMBER25", f: K },
    38: { n: "??" },
    39: { n: "NUMBER27", f: te },
    40: { n: "FORMULA28", f: Te },
    142: { n: "??" },
    147: { n: "??" },
    150: { n: "??" },
    151: { n: "??" },
    152: { n: "??" },
    153: { n: "??" },
    154: { n: "??" },
    155: { n: "??" },
    156: { n: "??" },
    163: { n: "??" },
    174: { n: "??" },
    175: { n: "??" },
    176: { n: "??" },
    177: { n: "??" },
    184: { n: "??" },
    185: { n: "??" },
    186: { n: "??" },
    187: { n: "??" },
    188: { n: "??" },
    195: { n: "??" },
    201: { n: "??" },
    204: { n: "SHEETNAMECS", f: oe },
    205: { n: "??" },
    206: { n: "??" },
    207: { n: "??" },
    208: { n: "??" },
    256: { n: "??" },
    259: { n: "??" },
    260: { n: "??" },
    261: { n: "??" },
    262: { n: "??" },
    263: { n: "??" },
    265: { n: "??" },
    266: { n: "??" },
    267: { n: "??" },
    268: { n: "??" },
    270: { n: "??" },
    271: { n: "??" },
    384: { n: "??" },
    389: { n: "??" },
    390: { n: "??" },
    393: { n: "??" },
    396: { n: "??" },
    512: { n: "??" },
    514: { n: "??" },
    513: { n: "??" },
    516: { n: "??" },
    517: { n: "??" },
    640: { n: "??" },
    641: { n: "??" },
    642: { n: "??" },
    643: { n: "??" },
    644: { n: "??" },
    645: { n: "??" },
    646: { n: "??" },
    647: { n: "??" },
    648: { n: "??" },
    658: { n: "??" },
    659: { n: "??" },
    660: { n: "??" },
    661: { n: "??" },
    662: { n: "??" },
    665: { n: "??" },
    666: { n: "??" },
    768: { n: "??" },
    772: { n: "??" },
    1537: { n: "SHEETINFOQP", f: De },
    1600: { n: "??" },
    1602: { n: "??" },
    1793: { n: "??" },
    1794: { n: "??" },
    1795: { n: "??" },
    1796: { n: "??" },
    1920: { n: "??" },
    2048: { n: "??" },
    2049: { n: "??" },
    2052: { n: "??" },
    2688: { n: "??" },
    10998: { n: "??" },
    12849: { n: "??" },
    28233: { n: "??" },
    28484: { n: "??" },
    65535: { n: "" }
  };
  return {
    sheet_to_wk1: n,
    book_to_wk3: a,
    to_workbook: t
  };
}(), wc = /^\s|\s$|[\t\n\r]/;
function Xi(e, t) {
  if (!t.bookSST)
    return "";
  var r = [Ne];
  r[r.length] = q("sst", null, {
    xmlns: Et[0],
    count: e.Count,
    uniqueCount: e.Unique
  });
  for (var n = 0; n != e.length; ++n)
    if (e[n] != null) {
      var a = e[n], i = "<si>";
      a.r ? i += a.r : (i += "<t", a.t || (a.t = ""), a.t.match(wc) && (i += ' xml:space="preserve"'), i += ">" + ge(a.t) + "</t>"), i += "</si>", r[r.length] = i;
    }
  return r.length > 2 && (r[r.length] = "</sst>", r[1] = r[1].replace("/>", ">")), r.join("");
}
function Sc(e) {
  return [e.read_shift(4), e.read_shift(4)];
}
function Ac(e, t) {
  return t || (t = M(8)), t.write_shift(4, e.Count), t.write_shift(4, e.Unique), t;
}
var yc = po;
function Fc(e) {
  var t = er();
  H(t, 159, Ac(e));
  for (var r = 0; r < e.length; ++r)
    H(t, 19, yc(e[r]));
  return H(t, 160), t.end();
}
function Cc(e) {
  for (var t = [], r = e.split(""), n = 0; n < r.length; ++n)
    t[n] = r[n].charCodeAt(0);
  return t;
}
function ji(e) {
  var t = 0, r, n = Cc(e), a = n.length + 1, i, s, f, c, l;
  for (r = et(a), r[0] = n.length, i = 1; i != a; ++i)
    r[i] = n[i - 1];
  for (i = a - 1; i >= 0; --i)
    s = r[i], f = (t & 16384) === 0 ? 0 : 1, c = t << 1 & 32767, l = f | c, t = l ^ s;
  return t ^ 52811;
}
var Oc = /* @__PURE__ */ function() {
  function e(a, i) {
    switch (i.type) {
      case "base64":
        return t(Ir(a), i);
      case "binary":
        return t(a, i);
      case "buffer":
        return t(de && Buffer.isBuffer(a) ? a.toString("binary") : Xt(a), i);
      case "array":
        return t(kn(a), i);
    }
    throw new Error("Unrecognized type " + i.type);
  }
  function t(a, i) {
    var s = i || {}, f = s.dense ? [] : {}, c = a.match(/\\trowd.*?\\row\b/g);
    if (!c.length)
      throw new Error("RTF missing table");
    var l = { s: { c: 0, r: 0 }, e: { c: 0, r: c.length - 1 } };
    return c.forEach(function(o, u) {
      Array.isArray(f) && (f[u] = []);
      for (var h = /\\\w+\b/g, d = 0, g, x = -1; g = h.exec(o); ) {
        switch (g[0]) {
          case "\\cell":
            var m = o.slice(d, h.lastIndex - g[0].length);
            if (m[0] == " " && (m = m.slice(1)), ++x, m.length) {
              var O = { v: m, t: "s" };
              Array.isArray(f) ? f[u][x] = O : f[_e({ r: u, c: x })] = O;
            }
            break;
        }
        d = h.lastIndex;
      }
      x > l.e.c && (l.e.c = x);
    }), f["!ref"] = ke(l), f;
  }
  function r(a, i) {
    return nt(e(a, i), i);
  }
  function n(a) {
    for (var i = ["{\\rtf1\\ansi"], s = Se(a["!ref"]), f, c = Array.isArray(a), l = s.s.r; l <= s.e.r; ++l) {
      i.push("\\trowd\\trautofit1");
      for (var o = s.s.c; o <= s.e.c; ++o)
        i.push("\\cellx" + (o + 1));
      for (i.push("\\pard\\intbl"), o = s.s.c; o <= s.e.c; ++o) {
        var u = _e({ r: l, c: o });
        f = c ? (a[l] || [])[o] : a[u], !(!f || f.v == null && (!f.f || f.F)) && (i.push(" " + (f.w || (Pr(f), f.w))), i.push("\\cell"));
      }
      i.push("\\pard\\intbl\\row");
    }
    return i.join("") + "}";
  }
  return {
    to_workbook: r,
    to_sheet: e,
    from_sheet: n
  };
}();
function Aa(e) {
  for (var t = 0, r = 1; t != 3; ++t)
    r = r * 256 + (e[t] > 255 ? 255 : e[t] < 0 ? 0 : e[t]);
  return r.toString(16).toUpperCase().slice(1);
}
var Dc = 6, Nr = Dc;
function En(e) {
  return Math.floor((e + Math.round(128 / Nr) / 256) * Nr);
}
function wn(e) {
  return Math.floor((e - 5) / Nr * 100 + 0.5) / 100;
}
function e0(e) {
  return Math.round((e * Nr + 5) / Nr * 256) / 256;
}
function w0(e) {
  e.width ? (e.wpx = En(e.width), e.wch = wn(e.wpx), e.MDW = Nr) : e.wpx ? (e.wch = wn(e.wpx), e.width = e0(e.wch), e.MDW = Nr) : typeof e.wch == "number" && (e.width = e0(e.wch), e.wpx = En(e.width), e.MDW = Nr), e.customWidth && delete e.customWidth;
}
var Rc = 96, $i = Rc;
function Sn(e) {
  return e * 96 / $i;
}
function zi(e) {
  return e * $i / 96;
}
function kc(e) {
  var t = ["<numFmts>"];
  return [[5, 8], [23, 26], [41, 44], [50, 392]].forEach(function(r) {
    for (var n = r[0]; n <= r[1]; ++n)
      e[n] != null && (t[t.length] = q("numFmt", null, { numFmtId: n, formatCode: ge(e[n]) }));
  }), t.length === 1 ? "" : (t[t.length] = "</numFmts>", t[0] = q("numFmts", null, { count: t.length - 2 }).replace("/>", ">"), t.join(""));
}
function Nc(e) {
  var t = [];
  return t[t.length] = q("cellXfs", null), e.forEach(function(r) {
    t[t.length] = q("xf", null, r);
  }), t[t.length] = "</cellXfs>", t.length === 2 ? "" : (t[0] = q("cellXfs", null, { count: t.length - 2 }).replace("/>", ">"), t.join(""));
}
function Ki(e, t) {
  var r = [Ne, q("styleSheet", null, {
    xmlns: Et[0],
    "xmlns:vt": Be.vt
  })], n;
  return e.SSF && (n = kc(e.SSF)) != null && (r[r.length] = n), r[r.length] = '<fonts count="1"><font><sz val="12"/><color theme="1"/><name val="Calibri"/><family val="2"/><scheme val="minor"/></font></fonts>', r[r.length] = '<fills count="2"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill></fills>', r[r.length] = '<borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders>', r[r.length] = '<cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>', (n = Nc(t.cellXfs)) && (r[r.length] = n), r[r.length] = '<cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles>', r[r.length] = '<dxfs count="0"/>', r[r.length] = '<tableStyles count="0" defaultTableStyle="TableStyleMedium9" defaultPivotStyle="PivotStyleMedium4"/>', r.length > 2 && (r[r.length] = "</styleSheet>", r[1] = r[1].replace("/>", ">")), r.join("");
}
function Ic(e, t) {
  var r = e.read_shift(2), n = Ke(e);
  return [r, n];
}
function Pc(e, t, r) {
  r || (r = M(6 + 4 * t.length)), r.write_shift(2, e), be(t, r);
  var n = r.length > r.l ? r.slice(0, r.l) : r;
  return r.l == null && (r.l = r.length), n;
}
function Lc(e, t, r) {
  var n = {};
  n.sz = e.read_shift(2) / 20;
  var a = wo(e);
  a.fItalic && (n.italic = 1), a.fCondense && (n.condense = 1), a.fExtend && (n.extend = 1), a.fShadow && (n.shadow = 1), a.fOutline && (n.outline = 1), a.fStrikeout && (n.strike = 1);
  var i = e.read_shift(2);
  switch (i === 700 && (n.bold = 1), e.read_shift(2)) {
    case 1:
      n.vertAlign = "superscript";
      break;
    case 2:
      n.vertAlign = "subscript";
      break;
  }
  var s = e.read_shift(1);
  s != 0 && (n.underline = s);
  var f = e.read_shift(1);
  f > 0 && (n.family = f);
  var c = e.read_shift(1);
  switch (c > 0 && (n.charset = c), e.l++, n.color = Eo(e), e.read_shift(1)) {
    case 1:
      n.scheme = "major";
      break;
    case 2:
      n.scheme = "minor";
      break;
  }
  return n.name = Ke(e), n;
}
function Bc(e, t) {
  t || (t = M(25 + 4 * 32)), t.write_shift(2, e.sz * 20), So(e, t), t.write_shift(2, e.bold ? 700 : 400);
  var r = 0;
  e.vertAlign == "superscript" ? r = 1 : e.vertAlign == "subscript" && (r = 2), t.write_shift(2, r), t.write_shift(1, e.underline || 0), t.write_shift(1, e.family || 0), t.write_shift(1, e.charset || 0), t.write_shift(1, 0), _n(e.color, t);
  var n = 0;
  return e.scheme == "major" && (n = 1), e.scheme == "minor" && (n = 2), t.write_shift(1, n), be(e.name, t), t.length > t.l ? t.slice(0, t.l) : t;
}
var Mc = [
  "none",
  "solid",
  "mediumGray",
  "darkGray",
  "lightGray",
  "darkHorizontal",
  "darkVertical",
  "darkDown",
  "darkUp",
  "darkGrid",
  "darkTrellis",
  "lightHorizontal",
  "lightVertical",
  "lightDown",
  "lightUp",
  "lightGrid",
  "lightTrellis",
  "gray125",
  "gray0625"
], $n, bc = yr;
function ya(e, t) {
  t || (t = M(4 * 3 + 8 * 7 + 16 * 1)), $n || ($n = c0(Mc));
  var r = $n[e.patternType];
  r == null && (r = 40), t.write_shift(4, r);
  var n = 0;
  if (r != 40)
    for (_n({ auto: 1 }, t), _n({ auto: 1 }, t); n < 12; ++n)
      t.write_shift(4, 0);
  else {
    for (; n < 4; ++n)
      t.write_shift(4, 0);
    for (; n < 12; ++n)
      t.write_shift(4, 0);
  }
  return t.length > t.l ? t.slice(0, t.l) : t;
}
function Uc(e, t) {
  var r = e.l + t, n = e.read_shift(2), a = e.read_shift(2);
  return e.l = r, { ixfe: n, numFmtId: a };
}
function Yi(e, t, r) {
  r || (r = M(16)), r.write_shift(2, t || 0), r.write_shift(2, e.numFmtId || 0), r.write_shift(2, 0), r.write_shift(2, 0), r.write_shift(2, 0), r.write_shift(1, 0), r.write_shift(1, 0);
  var n = 0;
  return r.write_shift(1, n), r.write_shift(1, 0), r.write_shift(1, 0), r.write_shift(1, 0), r;
}
function Dt(e, t) {
  return t || (t = M(10)), t.write_shift(1, 0), t.write_shift(1, 0), t.write_shift(4, 0), t.write_shift(4, 0), t;
}
var Hc = yr;
function Wc(e, t) {
  return t || (t = M(51)), t.write_shift(1, 0), Dt(null, t), Dt(null, t), Dt(null, t), Dt(null, t), Dt(null, t), t.length > t.l ? t.slice(0, t.l) : t;
}
function Vc(e, t) {
  return t || (t = M(12 + 4 * 10)), t.write_shift(4, e.xfId), t.write_shift(2, 1), t.write_shift(1, +e.builtinId), t.write_shift(1, 0), gn(e.name || "", t), t.length > t.l ? t.slice(0, t.l) : t;
}
function Gc(e, t, r) {
  var n = M(2052);
  return n.write_shift(4, e), gn(t, n), gn(r, n), n.length > n.l ? n.slice(0, n.l) : n;
}
function Xc(e, t) {
  if (!!t) {
    var r = 0;
    [[5, 8], [23, 26], [41, 44], [50, 392]].forEach(function(n) {
      for (var a = n[0]; a <= n[1]; ++a)
        t[a] != null && ++r;
    }), r != 0 && (H(e, 615, Er(r)), [[5, 8], [23, 26], [41, 44], [50, 392]].forEach(function(n) {
      for (var a = n[0]; a <= n[1]; ++a)
        t[a] != null && H(e, 44, Pc(a, t[a]));
    }), H(e, 616));
  }
}
function jc(e) {
  var t = 1;
  H(e, 611, Er(t)), H(e, 43, Bc({
    sz: 12,
    color: { theme: 1 },
    name: "Calibri",
    family: 2,
    scheme: "minor"
  })), H(e, 612);
}
function $c(e) {
  var t = 2;
  H(e, 603, Er(t)), H(e, 45, ya({ patternType: "none" })), H(e, 45, ya({ patternType: "gray125" })), H(e, 604);
}
function zc(e) {
  var t = 1;
  H(e, 613, Er(t)), H(e, 46, Wc()), H(e, 614);
}
function Kc(e) {
  var t = 1;
  H(e, 626, Er(t)), H(e, 47, Yi({
    numFmtId: 0,
    fontId: 0,
    fillId: 0,
    borderId: 0
  }, 65535)), H(e, 627);
}
function Yc(e, t) {
  H(e, 617, Er(t.length)), t.forEach(function(r) {
    H(e, 47, Yi(r, 0));
  }), H(e, 618);
}
function qc(e) {
  var t = 1;
  H(e, 619, Er(t)), H(e, 48, Vc({
    xfId: 0,
    builtinId: 0,
    name: "Normal"
  })), H(e, 620);
}
function Jc(e) {
  var t = 0;
  H(e, 505, Er(t)), H(e, 506);
}
function Zc(e) {
  var t = 0;
  H(e, 508, Gc(t, "TableStyleMedium9", "PivotStyleMedium4")), H(e, 509);
}
function Qc(e, t) {
  var r = er();
  return H(r, 278), Xc(r, e.SSF), jc(r), $c(r), zc(r), Kc(r), Yc(r, t.cellXfs), qc(r), Jc(r), Zc(r), H(r, 279), r.end();
}
function qi(e, t) {
  if (t && t.themeXLSX)
    return t.themeXLSX;
  if (e && typeof e.raw == "string")
    return e.raw;
  var r = [Ne];
  return r[r.length] = '<a:theme xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" name="Office Theme">', r[r.length] = "<a:themeElements>", r[r.length] = '<a:clrScheme name="Office">', r[r.length] = '<a:dk1><a:sysClr val="windowText" lastClr="000000"/></a:dk1>', r[r.length] = '<a:lt1><a:sysClr val="window" lastClr="FFFFFF"/></a:lt1>', r[r.length] = '<a:dk2><a:srgbClr val="1F497D"/></a:dk2>', r[r.length] = '<a:lt2><a:srgbClr val="EEECE1"/></a:lt2>', r[r.length] = '<a:accent1><a:srgbClr val="4F81BD"/></a:accent1>', r[r.length] = '<a:accent2><a:srgbClr val="C0504D"/></a:accent2>', r[r.length] = '<a:accent3><a:srgbClr val="9BBB59"/></a:accent3>', r[r.length] = '<a:accent4><a:srgbClr val="8064A2"/></a:accent4>', r[r.length] = '<a:accent5><a:srgbClr val="4BACC6"/></a:accent5>', r[r.length] = '<a:accent6><a:srgbClr val="F79646"/></a:accent6>', r[r.length] = '<a:hlink><a:srgbClr val="0000FF"/></a:hlink>', r[r.length] = '<a:folHlink><a:srgbClr val="800080"/></a:folHlink>', r[r.length] = "</a:clrScheme>", r[r.length] = '<a:fontScheme name="Office">', r[r.length] = "<a:majorFont>", r[r.length] = '<a:latin typeface="Cambria"/>', r[r.length] = '<a:ea typeface=""/>', r[r.length] = '<a:cs typeface=""/>', r[r.length] = '<a:font script="Jpan" typeface="\uFF2D\uFF33 \uFF30\u30B4\u30B7\u30C3\u30AF"/>', r[r.length] = '<a:font script="Hang" typeface="\uB9D1\uC740 \uACE0\uB515"/>', r[r.length] = '<a:font script="Hans" typeface="\u5B8B\u4F53"/>', r[r.length] = '<a:font script="Hant" typeface="\u65B0\u7D30\u660E\u9AD4"/>', r[r.length] = '<a:font script="Arab" typeface="Times New Roman"/>', r[r.length] = '<a:font script="Hebr" typeface="Times New Roman"/>', r[r.length] = '<a:font script="Thai" typeface="Tahoma"/>', r[r.length] = '<a:font script="Ethi" typeface="Nyala"/>', r[r.length] = '<a:font script="Beng" typeface="Vrinda"/>', r[r.length] = '<a:font script="Gujr" typeface="Shruti"/>', r[r.length] = '<a:font script="Khmr" typeface="MoolBoran"/>', r[r.length] = '<a:font script="Knda" typeface="Tunga"/>', r[r.length] = '<a:font script="Guru" typeface="Raavi"/>', r[r.length] = '<a:font script="Cans" typeface="Euphemia"/>', r[r.length] = '<a:font script="Cher" typeface="Plantagenet Cherokee"/>', r[r.length] = '<a:font script="Yiii" typeface="Microsoft Yi Baiti"/>', r[r.length] = '<a:font script="Tibt" typeface="Microsoft Himalaya"/>', r[r.length] = '<a:font script="Thaa" typeface="MV Boli"/>', r[r.length] = '<a:font script="Deva" typeface="Mangal"/>', r[r.length] = '<a:font script="Telu" typeface="Gautami"/>', r[r.length] = '<a:font script="Taml" typeface="Latha"/>', r[r.length] = '<a:font script="Syrc" typeface="Estrangelo Edessa"/>', r[r.length] = '<a:font script="Orya" typeface="Kalinga"/>', r[r.length] = '<a:font script="Mlym" typeface="Kartika"/>', r[r.length] = '<a:font script="Laoo" typeface="DokChampa"/>', r[r.length] = '<a:font script="Sinh" typeface="Iskoola Pota"/>', r[r.length] = '<a:font script="Mong" typeface="Mongolian Baiti"/>', r[r.length] = '<a:font script="Viet" typeface="Times New Roman"/>', r[r.length] = '<a:font script="Uigh" typeface="Microsoft Uighur"/>', r[r.length] = '<a:font script="Geor" typeface="Sylfaen"/>', r[r.length] = "</a:majorFont>", r[r.length] = "<a:minorFont>", r[r.length] = '<a:latin typeface="Calibri"/>', r[r.length] = '<a:ea typeface=""/>', r[r.length] = '<a:cs typeface=""/>', r[r.length] = '<a:font script="Jpan" typeface="\uFF2D\uFF33 \uFF30\u30B4\u30B7\u30C3\u30AF"/>', r[r.length] = '<a:font script="Hang" typeface="\uB9D1\uC740 \uACE0\uB515"/>', r[r.length] = '<a:font script="Hans" typeface="\u5B8B\u4F53"/>', r[r.length] = '<a:font script="Hant" typeface="\u65B0\u7D30\u660E\u9AD4"/>', r[r.length] = '<a:font script="Arab" typeface="Arial"/>', r[r.length] = '<a:font script="Hebr" typeface="Arial"/>', r[r.length] = '<a:font script="Thai" typeface="Tahoma"/>', r[r.length] = '<a:font script="Ethi" typeface="Nyala"/>', r[r.length] = '<a:font script="Beng" typeface="Vrinda"/>', r[r.length] = '<a:font script="Gujr" typeface="Shruti"/>', r[r.length] = '<a:font script="Khmr" typeface="DaunPenh"/>', r[r.length] = '<a:font script="Knda" typeface="Tunga"/>', r[r.length] = '<a:font script="Guru" typeface="Raavi"/>', r[r.length] = '<a:font script="Cans" typeface="Euphemia"/>', r[r.length] = '<a:font script="Cher" typeface="Plantagenet Cherokee"/>', r[r.length] = '<a:font script="Yiii" typeface="Microsoft Yi Baiti"/>', r[r.length] = '<a:font script="Tibt" typeface="Microsoft Himalaya"/>', r[r.length] = '<a:font script="Thaa" typeface="MV Boli"/>', r[r.length] = '<a:font script="Deva" typeface="Mangal"/>', r[r.length] = '<a:font script="Telu" typeface="Gautami"/>', r[r.length] = '<a:font script="Taml" typeface="Latha"/>', r[r.length] = '<a:font script="Syrc" typeface="Estrangelo Edessa"/>', r[r.length] = '<a:font script="Orya" typeface="Kalinga"/>', r[r.length] = '<a:font script="Mlym" typeface="Kartika"/>', r[r.length] = '<a:font script="Laoo" typeface="DokChampa"/>', r[r.length] = '<a:font script="Sinh" typeface="Iskoola Pota"/>', r[r.length] = '<a:font script="Mong" typeface="Mongolian Baiti"/>', r[r.length] = '<a:font script="Viet" typeface="Arial"/>', r[r.length] = '<a:font script="Uigh" typeface="Microsoft Uighur"/>', r[r.length] = '<a:font script="Geor" typeface="Sylfaen"/>', r[r.length] = "</a:minorFont>", r[r.length] = "</a:fontScheme>", r[r.length] = '<a:fmtScheme name="Office">', r[r.length] = "<a:fillStyleLst>", r[r.length] = '<a:solidFill><a:schemeClr val="phClr"/></a:solidFill>', r[r.length] = '<a:gradFill rotWithShape="1">', r[r.length] = "<a:gsLst>", r[r.length] = '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="50000"/><a:satMod val="300000"/></a:schemeClr></a:gs>', r[r.length] = '<a:gs pos="35000"><a:schemeClr val="phClr"><a:tint val="37000"/><a:satMod val="300000"/></a:schemeClr></a:gs>', r[r.length] = '<a:gs pos="100000"><a:schemeClr val="phClr"><a:tint val="15000"/><a:satMod val="350000"/></a:schemeClr></a:gs>', r[r.length] = "</a:gsLst>", r[r.length] = '<a:lin ang="16200000" scaled="1"/>', r[r.length] = "</a:gradFill>", r[r.length] = '<a:gradFill rotWithShape="1">', r[r.length] = "<a:gsLst>", r[r.length] = '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="100000"/><a:shade val="100000"/><a:satMod val="130000"/></a:schemeClr></a:gs>', r[r.length] = '<a:gs pos="100000"><a:schemeClr val="phClr"><a:tint val="50000"/><a:shade val="100000"/><a:satMod val="350000"/></a:schemeClr></a:gs>', r[r.length] = "</a:gsLst>", r[r.length] = '<a:lin ang="16200000" scaled="0"/>', r[r.length] = "</a:gradFill>", r[r.length] = "</a:fillStyleLst>", r[r.length] = "<a:lnStyleLst>", r[r.length] = '<a:ln w="9525" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"><a:shade val="95000"/><a:satMod val="105000"/></a:schemeClr></a:solidFill><a:prstDash val="solid"/></a:ln>', r[r.length] = '<a:ln w="25400" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln>', r[r.length] = '<a:ln w="38100" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln>', r[r.length] = "</a:lnStyleLst>", r[r.length] = "<a:effectStyleLst>", r[r.length] = "<a:effectStyle>", r[r.length] = "<a:effectLst>", r[r.length] = '<a:outerShdw blurRad="40000" dist="20000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="38000"/></a:srgbClr></a:outerShdw>', r[r.length] = "</a:effectLst>", r[r.length] = "</a:effectStyle>", r[r.length] = "<a:effectStyle>", r[r.length] = "<a:effectLst>", r[r.length] = '<a:outerShdw blurRad="40000" dist="23000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="35000"/></a:srgbClr></a:outerShdw>', r[r.length] = "</a:effectLst>", r[r.length] = "</a:effectStyle>", r[r.length] = "<a:effectStyle>", r[r.length] = "<a:effectLst>", r[r.length] = '<a:outerShdw blurRad="40000" dist="23000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="35000"/></a:srgbClr></a:outerShdw>', r[r.length] = "</a:effectLst>", r[r.length] = '<a:scene3d><a:camera prst="orthographicFront"><a:rot lat="0" lon="0" rev="0"/></a:camera><a:lightRig rig="threePt" dir="t"><a:rot lat="0" lon="0" rev="1200000"/></a:lightRig></a:scene3d>', r[r.length] = '<a:sp3d><a:bevelT w="63500" h="25400"/></a:sp3d>', r[r.length] = "</a:effectStyle>", r[r.length] = "</a:effectStyleLst>", r[r.length] = "<a:bgFillStyleLst>", r[r.length] = '<a:solidFill><a:schemeClr val="phClr"/></a:solidFill>', r[r.length] = '<a:gradFill rotWithShape="1">', r[r.length] = "<a:gsLst>", r[r.length] = '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="40000"/><a:satMod val="350000"/></a:schemeClr></a:gs>', r[r.length] = '<a:gs pos="40000"><a:schemeClr val="phClr"><a:tint val="45000"/><a:shade val="99000"/><a:satMod val="350000"/></a:schemeClr></a:gs>', r[r.length] = '<a:gs pos="100000"><a:schemeClr val="phClr"><a:shade val="20000"/><a:satMod val="255000"/></a:schemeClr></a:gs>', r[r.length] = "</a:gsLst>", r[r.length] = '<a:path path="circle"><a:fillToRect l="50000" t="-80000" r="50000" b="180000"/></a:path>', r[r.length] = "</a:gradFill>", r[r.length] = '<a:gradFill rotWithShape="1">', r[r.length] = "<a:gsLst>", r[r.length] = '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="80000"/><a:satMod val="300000"/></a:schemeClr></a:gs>', r[r.length] = '<a:gs pos="100000"><a:schemeClr val="phClr"><a:shade val="30000"/><a:satMod val="200000"/></a:schemeClr></a:gs>', r[r.length] = "</a:gsLst>", r[r.length] = '<a:path path="circle"><a:fillToRect l="50000" t="50000" r="50000" b="50000"/></a:path>', r[r.length] = "</a:gradFill>", r[r.length] = "</a:bgFillStyleLst>", r[r.length] = "</a:fmtScheme>", r[r.length] = "</a:themeElements>", r[r.length] = "<a:objectDefaults>", r[r.length] = "<a:spDef>", r[r.length] = '<a:spPr/><a:bodyPr/><a:lstStyle/><a:style><a:lnRef idx="1"><a:schemeClr val="accent1"/></a:lnRef><a:fillRef idx="3"><a:schemeClr val="accent1"/></a:fillRef><a:effectRef idx="2"><a:schemeClr val="accent1"/></a:effectRef><a:fontRef idx="minor"><a:schemeClr val="lt1"/></a:fontRef></a:style>', r[r.length] = "</a:spDef>", r[r.length] = "<a:lnDef>", r[r.length] = '<a:spPr/><a:bodyPr/><a:lstStyle/><a:style><a:lnRef idx="2"><a:schemeClr val="accent1"/></a:lnRef><a:fillRef idx="0"><a:schemeClr val="accent1"/></a:fillRef><a:effectRef idx="1"><a:schemeClr val="accent1"/></a:effectRef><a:fontRef idx="minor"><a:schemeClr val="tx1"/></a:fontRef></a:style>', r[r.length] = "</a:lnDef>", r[r.length] = "</a:objectDefaults>", r[r.length] = "<a:extraClrSchemeLst/>", r[r.length] = "</a:theme>", r.join("");
}
function eu(e, t) {
  return {
    flags: e.read_shift(4),
    version: e.read_shift(4),
    name: Ke(e)
  };
}
function ru(e) {
  var t = M(12 + 2 * e.name.length);
  return t.write_shift(4, e.flags), t.write_shift(4, e.version), be(e.name, t), t.slice(0, t.l);
}
function tu(e) {
  for (var t = [], r = e.read_shift(4); r-- > 0; )
    t.push([e.read_shift(4), e.read_shift(4)]);
  return t;
}
function nu(e) {
  var t = M(4 + 8 * e.length);
  t.write_shift(4, e.length);
  for (var r = 0; r < e.length; ++r)
    t.write_shift(4, e[r][0]), t.write_shift(4, e[r][1]);
  return t;
}
function au(e, t) {
  var r = M(8 + 2 * t.length);
  return r.write_shift(4, e), be(t, r), r.slice(0, r.l);
}
function iu(e) {
  return e.l += 4, e.read_shift(4) != 0;
}
function su(e, t) {
  var r = M(8);
  return r.write_shift(4, e), r.write_shift(4, t ? 1 : 0), r;
}
function fu() {
  var e = er();
  return H(e, 332), H(e, 334, Er(1)), H(e, 335, ru({
    name: "XLDAPR",
    version: 12e4,
    flags: 3496657072
  })), H(e, 336), H(e, 339, au(1, "XLDAPR")), H(e, 52), H(e, 35, Er(514)), H(e, 4096, Er(0)), H(e, 4097, dr(1)), H(e, 36), H(e, 53), H(e, 340), H(e, 337, su(1, !0)), H(e, 51, nu([[1, 0]])), H(e, 338), H(e, 333), e.end();
}
function Ji() {
  var e = [Ne];
  return e.push(`<metadata xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:xlrd="http://schemas.microsoft.com/office/spreadsheetml/2017/richdata" xmlns:xda="http://schemas.microsoft.com/office/spreadsheetml/2017/dynamicarray">
  <metadataTypes count="1">
    <metadataType name="XLDAPR" minSupportedVersion="120000" copy="1" pasteAll="1" pasteValues="1" merge="1" splitFirst="1" rowColShift="1" clearFormats="1" clearComments="1" assign="1" coerce="1" cellMeta="1"/>
  </metadataTypes>
  <futureMetadata name="XLDAPR" count="1">
    <bk>
      <extLst>
        <ext uri="{bdbb8cdc-fa1e-496e-a857-3c3f30c029c3}">
          <xda:dynamicArrayProperties fDynamic="1" fCollapsed="0"/>
        </ext>
      </extLst>
    </bk>
  </futureMetadata>
  <cellMetadata count="1">
    <bk>
      <rc t="1" v="0"/>
    </bk>
  </cellMetadata>
</metadata>`), e.join("");
}
function lu(e) {
  var t = {};
  t.i = e.read_shift(4);
  var r = {};
  r.r = e.read_shift(4), r.c = e.read_shift(4), t.r = _e(r);
  var n = e.read_shift(1);
  return n & 2 && (t.l = "1"), n & 8 && (t.a = "1"), t;
}
var xt = 1024;
function Zi(e, t) {
  for (var r = [21600, 21600], n = ["m0,0l0", r[1], r[0], r[1], r[0], "0xe"].join(","), a = [
    q("xml", null, { "xmlns:v": fr.v, "xmlns:o": fr.o, "xmlns:x": fr.x, "xmlns:mv": fr.mv }).replace(/\/>/, ">"),
    q("o:shapelayout", q("o:idmap", null, { "v:ext": "edit", data: e }), { "v:ext": "edit" }),
    q("v:shapetype", [
      q("v:stroke", null, { joinstyle: "miter" }),
      q("v:path", null, { gradientshapeok: "t", "o:connecttype": "rect" })
    ].join(""), { id: "_x0000_t202", "o:spt": 202, coordsize: r.join(","), path: n })
  ]; xt < e * 1e3; )
    xt += 1e3;
  return t.forEach(function(i) {
    var s = Me(i[0]), f = { color2: "#BEFF82", type: "gradient" };
    f.type == "gradient" && (f.angle = "-180");
    var c = f.type == "gradient" ? q("o:fill", null, { type: "gradientUnscaled", "v:ext": "view" }) : null, l = q("v:fill", c, f), o = { on: "t", obscured: "t" };
    ++xt, a = a.concat([
      "<v:shape" + Ht({
        id: "_x0000_s" + xt,
        type: "#_x0000_t202",
        style: "position:absolute; margin-left:80pt;margin-top:5pt;width:104pt;height:64pt;z-index:10" + (i[1].hidden ? ";visibility:hidden" : ""),
        fillcolor: "#ECFAD4",
        strokecolor: "#edeaa1"
      }) + ">",
      l,
      q("v:shadow", null, o),
      q("v:path", null, { "o:connecttype": "none" }),
      '<v:textbox><div style="text-align:left"></div></v:textbox>',
      '<x:ClientData ObjectType="Note">',
      "<x:MoveWithCells/>",
      "<x:SizeWithCells/>",
      Ge("x:Anchor", [s.c + 1, 0, s.r + 1, 0, s.c + 3, 20, s.r + 5, 20].join(",")),
      Ge("x:AutoFill", "False"),
      Ge("x:Row", String(s.r)),
      Ge("x:Column", String(s.c)),
      i[1].hidden ? "" : "<x:Visible/>",
      "</x:ClientData>",
      "</v:shape>"
    ]);
  }), a.push("</xml>"), a.join("");
}
function Qi(e) {
  var t = [Ne, q("comments", null, { xmlns: Et[0] })], r = [];
  return t.push("<authors>"), e.forEach(function(n) {
    n[1].forEach(function(a) {
      var i = ge(a.a);
      r.indexOf(i) == -1 && (r.push(i), t.push("<author>" + i + "</author>")), a.T && a.ID && r.indexOf("tc=" + a.ID) == -1 && (r.push("tc=" + a.ID), t.push("<author>tc=" + a.ID + "</author>"));
    });
  }), r.length == 0 && (r.push("SheetJ5"), t.push("<author>SheetJ5</author>")), t.push("</authors>"), t.push("<commentList>"), e.forEach(function(n) {
    var a = 0, i = [];
    if (n[1][0] && n[1][0].T && n[1][0].ID ? a = r.indexOf("tc=" + n[1][0].ID) : n[1].forEach(function(c) {
      c.a && (a = r.indexOf(ge(c.a))), i.push(c.t || "");
    }), t.push('<comment ref="' + n[0] + '" authorId="' + a + '"><text>'), i.length <= 1)
      t.push(Ge("t", ge(i[0] || "")));
    else {
      for (var s = `Comment:
    ` + i[0] + `
`, f = 1; f < i.length; ++f)
        s += `Reply:
    ` + i[f] + `
`;
      t.push(Ge("t", ge(s)));
    }
    t.push("</text></comment>");
  }), t.push("</commentList>"), t.length > 2 && (t[t.length] = "</comments>", t[1] = t[1].replace("/>", ">")), t.join("");
}
function ou(e, t, r) {
  var n = [Ne, q("ThreadedComments", null, { xmlns: Be.TCMNT }).replace(/[\/]>/, ">")];
  return e.forEach(function(a) {
    var i = "";
    (a[1] || []).forEach(function(s, f) {
      if (!s.T) {
        delete s.ID;
        return;
      }
      s.a && t.indexOf(s.a) == -1 && t.push(s.a);
      var c = {
        ref: a[0],
        id: "{54EE7951-7262-4200-6969-" + ("000000000000" + r.tcid++).slice(-12) + "}"
      };
      f == 0 ? i = c.id : c.parentId = i, s.ID = c.id, s.a && (c.personId = "{54EE7950-7262-4200-6969-" + ("000000000000" + t.indexOf(s.a)).slice(-12) + "}"), n.push(q("threadedComment", Ge("text", s.t || ""), c));
    });
  }), n.push("</ThreadedComments>"), n.join("");
}
function cu(e) {
  var t = [Ne, q("personList", null, {
    xmlns: Be.TCMNT,
    "xmlns:x": Et[0]
  }).replace(/[\/]>/, ">")];
  return e.forEach(function(r, n) {
    t.push(q("person", null, {
      displayName: r,
      id: "{54EE7950-7262-4200-6969-" + ("000000000000" + n).slice(-12) + "}",
      userId: r,
      providerId: "None"
    }));
  }), t.push("</personList>"), t.join("");
}
function uu(e) {
  var t = {};
  t.iauthor = e.read_shift(4);
  var r = ft(e);
  return t.rfx = r.s, t.ref = _e(r.s), e.l += 16, t;
}
function hu(e, t) {
  return t == null && (t = M(36)), t.write_shift(4, e[1].iauthor), St(e[0], t), t.write_shift(4, 0), t.write_shift(4, 0), t.write_shift(4, 0), t.write_shift(4, 0), t;
}
var xu = Ke;
function du(e) {
  return be(e.slice(0, 54));
}
function pu(e) {
  var t = er(), r = [];
  return H(t, 628), H(t, 630), e.forEach(function(n) {
    n[1].forEach(function(a) {
      r.indexOf(a.a) > -1 || (r.push(a.a.slice(0, 54)), H(t, 632, du(a.a)));
    });
  }), H(t, 631), H(t, 633), e.forEach(function(n) {
    n[1].forEach(function(a) {
      a.iauthor = r.indexOf(a.a);
      var i = { s: Me(n[0]), e: Me(n[0]) };
      H(t, 635, hu([i, a])), a.t && a.t.length > 0 && H(t, 637, mo(a)), H(t, 636), delete a.iauthor;
    });
  }), H(t, 634), H(t, 629), t.end();
}
function vu(e, t) {
  t.FullPaths.forEach(function(r, n) {
    if (n != 0) {
      var a = r.replace(/[^\/]*[\/]/, "/_VBA_PROJECT_CUR/");
      a.slice(-1) !== "/" && Ee.utils.cfb_add(e, a, t.FileIndex[n].content);
    }
  });
}
var es = ["xlsb", "xlsm", "xlam", "biff8", "xla"], mu = /* @__PURE__ */ function() {
  var e = /(^|[^A-Za-z_])R(\[?-?\d+\]|[1-9]\d*|)C(\[?-?\d+\]|[1-9]\d*|)(?![A-Za-z0-9_])/g, t = { r: 0, c: 0 };
  function r(n, a, i, s) {
    var f = !1, c = !1;
    i.length == 0 ? c = !0 : i.charAt(0) == "[" && (c = !0, i = i.slice(1, -1)), s.length == 0 ? f = !0 : s.charAt(0) == "[" && (f = !0, s = s.slice(1, -1));
    var l = i.length > 0 ? parseInt(i, 10) | 0 : 0, o = s.length > 0 ? parseInt(s, 10) | 0 : 0;
    return f ? o += t.c : --o, c ? l += t.r : --l, a + (f ? "" : "$") + ze(o) + (c ? "" : "$") + Xe(l);
  }
  return function(a, i) {
    return t = i, a.replace(e, r);
  };
}(), S0 = /(^|[^._A-Z0-9])([$]?)([A-Z]{1,2}|[A-W][A-Z]{2}|X[A-E][A-Z]|XF[A-D])([$]?)(10[0-3]\d{4}|104[0-7]\d{3}|1048[0-4]\d{2}|10485[0-6]\d|104857[0-6]|[1-9]\d{0,5})(?![_.\(A-Za-z0-9])/g, A0 = /* @__PURE__ */ function() {
  return function(t, r) {
    return t.replace(S0, function(n, a, i, s, f, c) {
      var l = m0(s) - (i ? 0 : r.c), o = v0(c) - (f ? 0 : r.r), u = o == 0 ? "" : f ? o + 1 : "[" + o + "]", h = l == 0 ? "" : i ? l + 1 : "[" + l + "]";
      return a + "R" + u + "C" + h;
    });
  };
}();
function gu(e, t) {
  return e.replace(S0, function(r, n, a, i, s, f) {
    return n + (a == "$" ? a + i : ze(m0(i) + t.c)) + (s == "$" ? s + f : Xe(v0(f) + t.r));
  });
}
function _u(e) {
  return e.length != 1;
}
function Re(e) {
  e.l += 1;
}
function Gr(e, t) {
  var r = e.read_shift(t == 1 ? 1 : 2);
  return [r & 16383, r >> 14 & 1, r >> 15 & 1];
}
function rs(e, t, r) {
  var n = 2;
  if (r) {
    if (r.biff >= 2 && r.biff <= 5)
      return ts(e);
    r.biff == 12 && (n = 4);
  }
  var a = e.read_shift(n), i = e.read_shift(n), s = Gr(e, 2), f = Gr(e, 2);
  return { s: { r: a, c: s[0], cRel: s[1], rRel: s[2] }, e: { r: i, c: f[0], cRel: f[1], rRel: f[2] } };
}
function ts(e) {
  var t = Gr(e, 2), r = Gr(e, 2), n = e.read_shift(1), a = e.read_shift(1);
  return { s: { r: t[0], c: n, cRel: t[1], rRel: t[2] }, e: { r: r[0], c: a, cRel: r[1], rRel: r[2] } };
}
function Tu(e, t, r) {
  if (r.biff < 8)
    return ts(e);
  var n = e.read_shift(r.biff == 12 ? 4 : 2), a = e.read_shift(r.biff == 12 ? 4 : 2), i = Gr(e, 2), s = Gr(e, 2);
  return { s: { r: n, c: i[0], cRel: i[1], rRel: i[2] }, e: { r: a, c: s[0], cRel: s[1], rRel: s[2] } };
}
function ns(e, t, r) {
  if (r && r.biff >= 2 && r.biff <= 5)
    return Eu(e);
  var n = e.read_shift(r && r.biff == 12 ? 4 : 2), a = Gr(e, 2);
  return { r: n, c: a[0], cRel: a[1], rRel: a[2] };
}
function Eu(e) {
  var t = Gr(e, 2), r = e.read_shift(1);
  return { r: t[0], c: r, cRel: t[1], rRel: t[2] };
}
function wu(e) {
  var t = e.read_shift(2), r = e.read_shift(2);
  return { r: t, c: r & 255, fQuoted: !!(r & 16384), cRel: r >> 15, rRel: r >> 15 };
}
function Su(e, t, r) {
  var n = r && r.biff ? r.biff : 8;
  if (n >= 2 && n <= 5)
    return Au(e);
  var a = e.read_shift(n >= 12 ? 4 : 2), i = e.read_shift(2), s = (i & 16384) >> 14, f = (i & 32768) >> 15;
  if (i &= 16383, f == 1)
    for (; a > 524287; )
      a -= 1048576;
  if (s == 1)
    for (; i > 8191; )
      i = i - 16384;
  return { r: a, c: i, cRel: s, rRel: f };
}
function Au(e) {
  var t = e.read_shift(2), r = e.read_shift(1), n = (t & 32768) >> 15, a = (t & 16384) >> 14;
  return t &= 16383, n == 1 && t >= 8192 && (t = t - 16384), a == 1 && r >= 128 && (r = r - 256), { r: t, c: r, cRel: a, rRel: n };
}
function yu(e, t, r) {
  var n = (e[e.l++] & 96) >> 5, a = rs(e, r.biff >= 2 && r.biff <= 5 ? 6 : 8, r);
  return [n, a];
}
function Fu(e, t, r) {
  var n = (e[e.l++] & 96) >> 5, a = e.read_shift(2, "i"), i = 8;
  if (r)
    switch (r.biff) {
      case 5:
        e.l += 12, i = 6;
        break;
      case 12:
        i = 12;
        break;
    }
  var s = rs(e, i, r);
  return [n, a, s];
}
function Cu(e, t, r) {
  var n = (e[e.l++] & 96) >> 5;
  return e.l += r && r.biff > 8 ? 12 : r.biff < 8 ? 6 : 8, [n];
}
function Ou(e, t, r) {
  var n = (e[e.l++] & 96) >> 5, a = e.read_shift(2), i = 8;
  if (r)
    switch (r.biff) {
      case 5:
        e.l += 12, i = 6;
        break;
      case 12:
        i = 12;
        break;
    }
  return e.l += i, [n, a];
}
function Du(e, t, r) {
  var n = (e[e.l++] & 96) >> 5, a = Tu(e, t - 1, r);
  return [n, a];
}
function Ru(e, t, r) {
  var n = (e[e.l++] & 96) >> 5;
  return e.l += r.biff == 2 ? 6 : r.biff == 12 ? 14 : 7, [n];
}
function Fa(e) {
  var t = e[e.l + 1] & 1, r = 1;
  return e.l += 4, [t, r];
}
function ku(e, t, r) {
  e.l += 2;
  for (var n = e.read_shift(r && r.biff == 2 ? 1 : 2), a = [], i = 0; i <= n; ++i)
    a.push(e.read_shift(r && r.biff == 2 ? 1 : 2));
  return a;
}
function Nu(e, t, r) {
  var n = e[e.l + 1] & 255 ? 1 : 0;
  return e.l += 2, [n, e.read_shift(r && r.biff == 2 ? 1 : 2)];
}
function Iu(e, t, r) {
  var n = e[e.l + 1] & 255 ? 1 : 0;
  return e.l += 2, [n, e.read_shift(r && r.biff == 2 ? 1 : 2)];
}
function Pu(e) {
  var t = e[e.l + 1] & 255 ? 1 : 0;
  return e.l += 2, [t, e.read_shift(2)];
}
function Lu(e, t, r) {
  var n = e[e.l + 1] & 255 ? 1 : 0;
  return e.l += r && r.biff == 2 ? 3 : 4, [n];
}
function as(e) {
  var t = e.read_shift(1), r = e.read_shift(1);
  return [t, r];
}
function Bu(e) {
  return e.read_shift(2), as(e);
}
function Mu(e) {
  return e.read_shift(2), as(e);
}
function bu(e, t, r) {
  var n = (e[e.l] & 96) >> 5;
  e.l += 1;
  var a = ns(e, 0, r);
  return [n, a];
}
function Uu(e, t, r) {
  var n = (e[e.l] & 96) >> 5;
  e.l += 1;
  var a = Su(e, 0, r);
  return [n, a];
}
function Hu(e, t, r) {
  var n = (e[e.l] & 96) >> 5;
  e.l += 1;
  var a = e.read_shift(2);
  r && r.biff == 5 && (e.l += 12);
  var i = ns(e, 0, r);
  return [n, a, i];
}
function Wu(e, t, r) {
  var n = (e[e.l] & 96) >> 5;
  e.l += 1;
  var a = e.read_shift(r && r.biff <= 3 ? 1 : 2);
  return [W1[a], fs[a], n];
}
function Vu(e, t, r) {
  var n = e[e.l++], a = e.read_shift(1), i = r && r.biff <= 3 ? [n == 88 ? -1 : 0, e.read_shift(1)] : Gu(e);
  return [a, (i[0] === 0 ? fs : H1)[i[1]]];
}
function Gu(e) {
  return [e[e.l + 1] >> 7, e.read_shift(2) & 32767];
}
function Xu(e, t, r) {
  e.l += r && r.biff == 2 ? 3 : 4;
}
function ju(e, t, r) {
  if (e.l++, r && r.biff == 12)
    return [e.read_shift(4, "i"), 0];
  var n = e.read_shift(2), a = e.read_shift(r && r.biff == 2 ? 1 : 2);
  return [n, a];
}
function $u(e) {
  return e.l++, zt[e.read_shift(1)];
}
function zu(e) {
  return e.l++, e.read_shift(2);
}
function Ku(e) {
  return e.l++, e.read_shift(1) !== 0;
}
function Yu(e) {
  return e.l++, At(e);
}
function qu(e, t, r) {
  return e.l++, Hi(e, t - 1, r);
}
function Ju(e, t) {
  var r = [e.read_shift(1)];
  if (t == 12)
    switch (r[0]) {
      case 2:
        r[0] = 4;
        break;
      case 4:
        r[0] = 16;
        break;
      case 0:
        r[0] = 1;
        break;
      case 1:
        r[0] = 2;
        break;
    }
  switch (r[0]) {
    case 4:
      r[1] = Ho(e, 1) ? "TRUE" : "FALSE", t != 12 && (e.l += 7);
      break;
    case 37:
    case 16:
      r[1] = zt[e[e.l]], e.l += t == 12 ? 4 : 8;
      break;
    case 0:
      e.l += 8;
      break;
    case 1:
      r[1] = At(e);
      break;
    case 2:
      r[1] = Xo(e, 0, { biff: t > 0 && t < 8 ? 2 : t });
      break;
    default:
      throw new Error("Bad SerAr: " + r[0]);
  }
  return r;
}
function Zu(e, t, r) {
  for (var n = e.read_shift(r.biff == 12 ? 4 : 2), a = [], i = 0; i != n; ++i)
    a.push((r.biff == 12 ? ft : zo)(e));
  return a;
}
function Qu(e, t, r) {
  var n = 0, a = 0;
  r.biff == 12 ? (n = e.read_shift(4), a = e.read_shift(4)) : (a = 1 + e.read_shift(1), n = 1 + e.read_shift(2)), r.biff >= 2 && r.biff < 8 && (--n, --a == 0 && (a = 256));
  for (var i = 0, s = []; i != n && (s[i] = []); ++i)
    for (var f = 0; f != a; ++f)
      s[i][f] = Ju(e, r.biff);
  return s;
}
function e1(e, t, r) {
  var n = e.read_shift(1) >>> 5 & 3, a = !r || r.biff >= 8 ? 4 : 2, i = e.read_shift(a);
  switch (r.biff) {
    case 2:
      e.l += 5;
      break;
    case 3:
    case 4:
      e.l += 8;
      break;
    case 5:
      e.l += 12;
      break;
  }
  return [n, 0, i];
}
function r1(e, t, r) {
  if (r.biff == 5)
    return t1(e);
  var n = e.read_shift(1) >>> 5 & 3, a = e.read_shift(2), i = e.read_shift(4);
  return [n, a, i];
}
function t1(e) {
  var t = e.read_shift(1) >>> 5 & 3, r = e.read_shift(2, "i");
  e.l += 8;
  var n = e.read_shift(2);
  return e.l += 12, [t, r, n];
}
function n1(e, t, r) {
  var n = e.read_shift(1) >>> 5 & 3;
  e.l += r && r.biff == 2 ? 3 : 4;
  var a = e.read_shift(r && r.biff == 2 ? 1 : 2);
  return [n, a];
}
function a1(e, t, r) {
  var n = e.read_shift(1) >>> 5 & 3, a = e.read_shift(r && r.biff == 2 ? 1 : 2);
  return [n, a];
}
function i1(e, t, r) {
  var n = e.read_shift(1) >>> 5 & 3;
  return e.l += 4, r.biff < 8 && e.l--, r.biff == 12 && (e.l += 2), [n];
}
function s1(e, t, r) {
  var n = (e[e.l++] & 96) >> 5, a = e.read_shift(2), i = 4;
  if (r)
    switch (r.biff) {
      case 5:
        i = 15;
        break;
      case 12:
        i = 6;
        break;
    }
  return e.l += i, [n, a];
}
var f1 = yr, l1 = yr, o1 = yr;
function Kt(e, t, r) {
  return e.l += 2, [wu(e)];
}
function y0(e) {
  return e.l += 6, [];
}
var c1 = Kt, u1 = y0, h1 = y0, x1 = Kt;
function is(e) {
  return e.l += 2, [bi(e), e.read_shift(2) & 1];
}
var d1 = Kt, p1 = is, v1 = y0, m1 = Kt, g1 = Kt, _1 = [
  "Data",
  "All",
  "Headers",
  "??",
  "?Data2",
  "??",
  "?DataHeaders",
  "??",
  "Totals",
  "??",
  "??",
  "??",
  "?DataTotals",
  "??",
  "??",
  "??",
  "?Current"
];
function T1(e) {
  e.l += 2;
  var t = e.read_shift(2), r = e.read_shift(2), n = e.read_shift(4), a = e.read_shift(2), i = e.read_shift(2), s = _1[r >> 2 & 31];
  return { ixti: t, coltype: r & 3, rt: s, idx: n, c: a, C: i };
}
function E1(e) {
  return e.l += 2, [e.read_shift(4)];
}
function w1(e, t, r) {
  return e.l += 5, e.l += 2, e.l += r.biff == 2 ? 1 : 4, ["PTGSHEET"];
}
function S1(e, t, r) {
  return e.l += r.biff == 2 ? 4 : 5, ["PTGENDSHEET"];
}
function A1(e) {
  var t = e.read_shift(1) >>> 5 & 3, r = e.read_shift(2);
  return [t, r];
}
function y1(e) {
  var t = e.read_shift(1) >>> 5 & 3, r = e.read_shift(2);
  return [t, r];
}
function F1(e) {
  return e.l += 4, [0, 0];
}
var Ca = {
  1: { n: "PtgExp", f: ju },
  2: { n: "PtgTbl", f: o1 },
  3: { n: "PtgAdd", f: Re },
  4: { n: "PtgSub", f: Re },
  5: { n: "PtgMul", f: Re },
  6: { n: "PtgDiv", f: Re },
  7: { n: "PtgPower", f: Re },
  8: { n: "PtgConcat", f: Re },
  9: { n: "PtgLt", f: Re },
  10: { n: "PtgLe", f: Re },
  11: { n: "PtgEq", f: Re },
  12: { n: "PtgGe", f: Re },
  13: { n: "PtgGt", f: Re },
  14: { n: "PtgNe", f: Re },
  15: { n: "PtgIsect", f: Re },
  16: { n: "PtgUnion", f: Re },
  17: { n: "PtgRange", f: Re },
  18: { n: "PtgUplus", f: Re },
  19: { n: "PtgUminus", f: Re },
  20: { n: "PtgPercent", f: Re },
  21: { n: "PtgParen", f: Re },
  22: { n: "PtgMissArg", f: Re },
  23: { n: "PtgStr", f: qu },
  26: { n: "PtgSheet", f: w1 },
  27: { n: "PtgEndSheet", f: S1 },
  28: { n: "PtgErr", f: $u },
  29: { n: "PtgBool", f: Ku },
  30: { n: "PtgInt", f: zu },
  31: { n: "PtgNum", f: Yu },
  32: { n: "PtgArray", f: Ru },
  33: { n: "PtgFunc", f: Wu },
  34: { n: "PtgFuncVar", f: Vu },
  35: { n: "PtgName", f: e1 },
  36: { n: "PtgRef", f: bu },
  37: { n: "PtgArea", f: yu },
  38: { n: "PtgMemArea", f: n1 },
  39: { n: "PtgMemErr", f: f1 },
  40: { n: "PtgMemNoMem", f: l1 },
  41: { n: "PtgMemFunc", f: a1 },
  42: { n: "PtgRefErr", f: i1 },
  43: { n: "PtgAreaErr", f: Cu },
  44: { n: "PtgRefN", f: Uu },
  45: { n: "PtgAreaN", f: Du },
  46: { n: "PtgMemAreaN", f: A1 },
  47: { n: "PtgMemNoMemN", f: y1 },
  57: { n: "PtgNameX", f: r1 },
  58: { n: "PtgRef3d", f: Hu },
  59: { n: "PtgArea3d", f: Fu },
  60: { n: "PtgRefErr3d", f: s1 },
  61: { n: "PtgAreaErr3d", f: Ou },
  255: {}
}, C1 = {
  64: 32,
  96: 32,
  65: 33,
  97: 33,
  66: 34,
  98: 34,
  67: 35,
  99: 35,
  68: 36,
  100: 36,
  69: 37,
  101: 37,
  70: 38,
  102: 38,
  71: 39,
  103: 39,
  72: 40,
  104: 40,
  73: 41,
  105: 41,
  74: 42,
  106: 42,
  75: 43,
  107: 43,
  76: 44,
  108: 44,
  77: 45,
  109: 45,
  78: 46,
  110: 46,
  79: 47,
  111: 47,
  88: 34,
  120: 34,
  89: 57,
  121: 57,
  90: 58,
  122: 58,
  91: 59,
  123: 59,
  92: 60,
  124: 60,
  93: 61,
  125: 61
}, O1 = {
  1: { n: "PtgElfLel", f: is },
  2: { n: "PtgElfRw", f: m1 },
  3: { n: "PtgElfCol", f: c1 },
  6: { n: "PtgElfRwV", f: g1 },
  7: { n: "PtgElfColV", f: x1 },
  10: { n: "PtgElfRadical", f: d1 },
  11: { n: "PtgElfRadicalS", f: v1 },
  13: { n: "PtgElfColS", f: u1 },
  15: { n: "PtgElfColSV", f: h1 },
  16: { n: "PtgElfRadicalLel", f: p1 },
  25: { n: "PtgList", f: T1 },
  29: { n: "PtgSxName", f: E1 },
  255: {}
}, D1 = {
  0: { n: "PtgAttrNoop", f: F1 },
  1: { n: "PtgAttrSemi", f: Lu },
  2: { n: "PtgAttrIf", f: Iu },
  4: { n: "PtgAttrChoose", f: ku },
  8: { n: "PtgAttrGoto", f: Nu },
  16: { n: "PtgAttrSum", f: Xu },
  32: { n: "PtgAttrBaxcel", f: Fa },
  33: { n: "PtgAttrBaxcel", f: Fa },
  64: { n: "PtgAttrSpace", f: Bu },
  65: { n: "PtgAttrSpaceSemi", f: Mu },
  128: { n: "PtgAttrIfError", f: Pu },
  255: {}
};
function R1(e, t, r, n) {
  if (n.biff < 8)
    return yr(e, t);
  for (var a = e.l + t, i = [], s = 0; s !== r.length; ++s)
    switch (r[s][0]) {
      case "PtgArray":
        r[s][1] = Qu(e, 0, n), i.push(r[s][1]);
        break;
      case "PtgMemArea":
        r[s][2] = Zu(e, r[s][1], n), i.push(r[s][2]);
        break;
      case "PtgExp":
        n && n.biff == 12 && (r[s][1][1] = e.read_shift(4), i.push(r[s][1]));
        break;
      case "PtgList":
      case "PtgElfRadicalS":
      case "PtgElfColS":
      case "PtgElfColSV":
        throw "Unsupported " + r[s][0];
    }
  return t = a - e.l, t !== 0 && i.push(yr(e, t)), i;
}
function k1(e, t, r) {
  for (var n = e.l + t, a, i, s = []; n != e.l; )
    t = n - e.l, i = e[e.l], a = Ca[i] || Ca[C1[i]], (i === 24 || i === 25) && (a = (i === 24 ? O1 : D1)[e[e.l + 1]]), !a || !a.f ? yr(e, t) : s.push([a.n, a.f(e, t, r)]);
  return s;
}
function N1(e) {
  for (var t = [], r = 0; r < e.length; ++r) {
    for (var n = e[r], a = [], i = 0; i < n.length; ++i) {
      var s = n[i];
      if (s)
        switch (s[0]) {
          case 2:
            a.push('"' + s[1].replace(/"/g, '""') + '"');
            break;
          default:
            a.push(s[1]);
        }
      else
        a.push("");
    }
    t.push(a.join(","));
  }
  return t.join(";");
}
var I1 = {
  PtgAdd: "+",
  PtgConcat: "&",
  PtgDiv: "/",
  PtgEq: "=",
  PtgGe: ">=",
  PtgGt: ">",
  PtgLe: "<=",
  PtgLt: "<",
  PtgMul: "*",
  PtgNe: "<>",
  PtgPower: "^",
  PtgSub: "-"
};
function P1(e, t) {
  if (!e && !(t && t.biff <= 5 && t.biff >= 2))
    throw new Error("empty sheet name");
  return /[^\w\u4E00-\u9FFF\u3040-\u30FF]/.test(e) ? "'" + e + "'" : e;
}
function ss(e, t, r) {
  if (!e)
    return "SH33TJSERR0";
  if (r.biff > 8 && (!e.XTI || !e.XTI[t]))
    return e.SheetNames[t];
  if (!e.XTI)
    return "SH33TJSERR6";
  var n = e.XTI[t];
  if (r.biff < 8)
    return t > 1e4 && (t -= 65536), t < 0 && (t = -t), t == 0 ? "" : e.XTI[t - 1];
  if (!n)
    return "SH33TJSERR1";
  var a = "";
  if (r.biff > 8)
    switch (e[n[0]][0]) {
      case 357:
        return a = n[1] == -1 ? "#REF" : e.SheetNames[n[1]], n[1] == n[2] ? a : a + ":" + e.SheetNames[n[2]];
      case 358:
        return r.SID != null ? e.SheetNames[r.SID] : "SH33TJSSAME" + e[n[0]][0];
      case 355:
      default:
        return "SH33TJSSRC" + e[n[0]][0];
    }
  switch (e[n[0]][0][0]) {
    case 1025:
      return a = n[1] == -1 ? "#REF" : e.SheetNames[n[1]] || "SH33TJSERR3", n[1] == n[2] ? a : a + ":" + e.SheetNames[n[2]];
    case 14849:
      return e[n[0]].slice(1).map(function(i) {
        return i.Name;
      }).join(";;");
    default:
      return e[n[0]][0][3] ? (a = n[1] == -1 ? "#REF" : e[n[0]][0][3][n[1]] || "SH33TJSERR4", n[1] == n[2] ? a : a + ":" + e[n[0]][0][3][n[2]]) : "SH33TJSERR2";
  }
}
function Oa(e, t, r) {
  var n = ss(e, t, r);
  return n == "#REF" ? n : P1(n, r);
}
function gt(e, t, r, n, a) {
  var i = a && a.biff || 8, s = { s: { c: 0, r: 0 }, e: { c: 0, r: 0 } }, f = [], c, l, o, u = 0, h = 0, d, g = "";
  if (!e[0] || !e[0][0])
    return "";
  for (var x = -1, m = "", O = 0, A = e[0].length; O < A; ++O) {
    var y = e[0][O];
    switch (y[0]) {
      case "PtgUminus":
        f.push("-" + f.pop());
        break;
      case "PtgUplus":
        f.push("+" + f.pop());
        break;
      case "PtgPercent":
        f.push(f.pop() + "%");
        break;
      case "PtgAdd":
      case "PtgConcat":
      case "PtgDiv":
      case "PtgEq":
      case "PtgGe":
      case "PtgGt":
      case "PtgLe":
      case "PtgLt":
      case "PtgMul":
      case "PtgNe":
      case "PtgPower":
      case "PtgSub":
        if (c = f.pop(), l = f.pop(), x >= 0) {
          switch (e[0][x][1][0]) {
            case 0:
              m = Ce(" ", e[0][x][1][1]);
              break;
            case 1:
              m = Ce("\r", e[0][x][1][1]);
              break;
            default:
              if (m = "", a.WTF)
                throw new Error("Unexpected PtgAttrSpaceType " + e[0][x][1][0]);
          }
          l = l + m, x = -1;
        }
        f.push(l + I1[y[0]] + c);
        break;
      case "PtgIsect":
        c = f.pop(), l = f.pop(), f.push(l + " " + c);
        break;
      case "PtgUnion":
        c = f.pop(), l = f.pop(), f.push(l + "," + c);
        break;
      case "PtgRange":
        c = f.pop(), l = f.pop(), f.push(l + ":" + c);
        break;
      case "PtgAttrChoose":
        break;
      case "PtgAttrGoto":
        break;
      case "PtgAttrIf":
        break;
      case "PtgAttrIfError":
        break;
      case "PtgRef":
        o = Pt(y[1][1], s, a), f.push(Lt(o, i));
        break;
      case "PtgRefN":
        o = r ? Pt(y[1][1], r, a) : y[1][1], f.push(Lt(o, i));
        break;
      case "PtgRef3d":
        u = y[1][1], o = Pt(y[1][2], s, a), g = Oa(n, u, a), f.push(g + "!" + Lt(o, i));
        break;
      case "PtgFunc":
      case "PtgFuncVar":
        var R = y[1][0], X = y[1][1];
        R || (R = 0), R &= 127;
        var Q = R == 0 ? [] : f.slice(-R);
        f.length -= R, X === "User" && (X = Q.shift()), f.push(X + "(" + Q.join(",") + ")");
        break;
      case "PtgBool":
        f.push(y[1] ? "TRUE" : "FALSE");
        break;
      case "PtgInt":
        f.push(y[1]);
        break;
      case "PtgNum":
        f.push(String(y[1]));
        break;
      case "PtgStr":
        f.push('"' + y[1].replace(/"/g, '""') + '"');
        break;
      case "PtgErr":
        f.push(y[1]);
        break;
      case "PtgAreaN":
        d = ha(y[1][1], r ? { s: r } : s, a), f.push(Xn(d, a));
        break;
      case "PtgArea":
        d = ha(y[1][1], s, a), f.push(Xn(d, a));
        break;
      case "PtgArea3d":
        u = y[1][1], d = y[1][2], g = Oa(n, u, a), f.push(g + "!" + Xn(d, a));
        break;
      case "PtgAttrSum":
        f.push("SUM(" + f.pop() + ")");
        break;
      case "PtgAttrBaxcel":
      case "PtgAttrSemi":
        break;
      case "PtgName":
        h = y[1][2];
        var D = (n.names || [])[h - 1] || (n[0] || [])[h], U = D ? D.Name : "SH33TJSNAME" + String(h);
        U && U.slice(0, 6) == "_xlfn." && !a.xlfn && (U = U.slice(6)), f.push(U);
        break;
      case "PtgNameX":
        var B = y[1][1];
        h = y[1][2];
        var G;
        if (a.biff <= 5)
          B < 0 && (B = -B), n[B] && (G = n[B][h]);
        else {
          var j = "";
          if (((n[B] || [])[0] || [])[0] == 14849 || (((n[B] || [])[0] || [])[0] == 1025 ? n[B][h] && n[B][h].itab > 0 && (j = n.SheetNames[n[B][h].itab - 1] + "!") : j = n.SheetNames[h - 1] + "!"), n[B] && n[B][h])
            j += n[B][h].Name;
          else if (n[0] && n[0][h])
            j += n[0][h].Name;
          else {
            var K = (ss(n, B, a) || "").split(";;");
            K[h - 1] ? j = K[h - 1] : j += "SH33TJSERRX";
          }
          f.push(j);
          break;
        }
        G || (G = { Name: "SH33TJSERRY" }), f.push(G.Name);
        break;
      case "PtgParen":
        var te = "(", Te = ")";
        if (x >= 0) {
          switch (m = "", e[0][x][1][0]) {
            case 2:
              te = Ce(" ", e[0][x][1][1]) + te;
              break;
            case 3:
              te = Ce("\r", e[0][x][1][1]) + te;
              break;
            case 4:
              Te = Ce(" ", e[0][x][1][1]) + Te;
              break;
            case 5:
              Te = Ce("\r", e[0][x][1][1]) + Te;
              break;
            default:
              if (a.WTF)
                throw new Error("Unexpected PtgAttrSpaceType " + e[0][x][1][0]);
          }
          x = -1;
        }
        f.push(te + f.pop() + Te);
        break;
      case "PtgRefErr":
        f.push("#REF!");
        break;
      case "PtgRefErr3d":
        f.push("#REF!");
        break;
      case "PtgExp":
        o = { c: y[1][1], r: y[1][0] };
        var oe = { c: r.c, r: r.r };
        if (n.sharedf[_e(o)]) {
          var Ue = n.sharedf[_e(o)];
          f.push(gt(Ue, s, oe, n, a));
        } else {
          var De = !1;
          for (c = 0; c != n.arrayf.length; ++c)
            if (l = n.arrayf[c], !(o.c < l[0].s.c || o.c > l[0].e.c) && !(o.r < l[0].s.r || o.r > l[0].e.r)) {
              f.push(gt(l[1], s, oe, n, a)), De = !0;
              break;
            }
          De || f.push(y[1]);
        }
        break;
      case "PtgArray":
        f.push("{" + N1(y[1]) + "}");
        break;
      case "PtgMemArea":
        break;
      case "PtgAttrSpace":
      case "PtgAttrSpaceSemi":
        x = O;
        break;
      case "PtgTbl":
        break;
      case "PtgMemErr":
        break;
      case "PtgMissArg":
        f.push("");
        break;
      case "PtgAreaErr":
        f.push("#REF!");
        break;
      case "PtgAreaErr3d":
        f.push("#REF!");
        break;
      case "PtgList":
        f.push("Table" + y[1].idx + "[#" + y[1].rt + "]");
        break;
      case "PtgMemAreaN":
      case "PtgMemNoMemN":
      case "PtgAttrNoop":
      case "PtgSheet":
      case "PtgEndSheet":
        break;
      case "PtgMemFunc":
        break;
      case "PtgMemNoMem":
        break;
      case "PtgElfCol":
      case "PtgElfColS":
      case "PtgElfColSV":
      case "PtgElfColV":
      case "PtgElfLel":
      case "PtgElfRadical":
      case "PtgElfRadicalLel":
      case "PtgElfRadicalS":
      case "PtgElfRw":
      case "PtgElfRwV":
        throw new Error("Unsupported ELFs");
      case "PtgSxName":
        throw new Error("Unrecognized Formula Token: " + String(y));
      default:
        throw new Error("Unrecognized Formula Token: " + String(y));
    }
    var vr = ["PtgAttrSpace", "PtgAttrSpaceSemi", "PtgAttrGoto"];
    if (a.biff != 3 && x >= 0 && vr.indexOf(e[0][O][0]) == -1) {
      y = e[0][x];
      var Pe = !0;
      switch (y[1][0]) {
        case 4:
          Pe = !1;
        case 0:
          m = Ce(" ", y[1][1]);
          break;
        case 5:
          Pe = !1;
        case 1:
          m = Ce("\r", y[1][1]);
          break;
        default:
          if (m = "", a.WTF)
            throw new Error("Unexpected PtgAttrSpaceType " + y[1][0]);
      }
      f.push((Pe ? m : "") + f.pop() + (Pe ? "" : m)), x = -1;
    }
  }
  if (f.length > 1 && a.WTF)
    throw new Error("bad formula stack");
  return f[0];
}
function L1(e) {
  if (e == null) {
    var t = M(8);
    return t.write_shift(1, 3), t.write_shift(1, 0), t.write_shift(2, 0), t.write_shift(2, 0), t.write_shift(2, 65535), t;
  } else if (typeof e == "number")
    return rt(e);
  return rt(0);
}
function B1(e, t, r, n, a) {
  var i = tt(t, r, a), s = L1(e.v), f = M(6), c = 33;
  f.write_shift(2, c), f.write_shift(4, 0);
  for (var l = M(e.bf.length), o = 0; o < e.bf.length; ++o)
    l[o] = e.bf[o];
  var u = Ve([i, s, f, l]);
  return u;
}
function Nn(e, t, r) {
  var n = e.read_shift(4), a = k1(e, n, r), i = e.read_shift(4), s = i > 0 ? R1(e, i, a, r) : null;
  return [a, s];
}
var M1 = Nn, In = Nn, b1 = Nn, U1 = Nn, H1 = {
  0: "BEEP",
  1: "OPEN",
  2: "OPEN.LINKS",
  3: "CLOSE.ALL",
  4: "SAVE",
  5: "SAVE.AS",
  6: "FILE.DELETE",
  7: "PAGE.SETUP",
  8: "PRINT",
  9: "PRINTER.SETUP",
  10: "QUIT",
  11: "NEW.WINDOW",
  12: "ARRANGE.ALL",
  13: "WINDOW.SIZE",
  14: "WINDOW.MOVE",
  15: "FULL",
  16: "CLOSE",
  17: "RUN",
  22: "SET.PRINT.AREA",
  23: "SET.PRINT.TITLES",
  24: "SET.PAGE.BREAK",
  25: "REMOVE.PAGE.BREAK",
  26: "FONT",
  27: "DISPLAY",
  28: "PROTECT.DOCUMENT",
  29: "PRECISION",
  30: "A1.R1C1",
  31: "CALCULATE.NOW",
  32: "CALCULATION",
  34: "DATA.FIND",
  35: "EXTRACT",
  36: "DATA.DELETE",
  37: "SET.DATABASE",
  38: "SET.CRITERIA",
  39: "SORT",
  40: "DATA.SERIES",
  41: "TABLE",
  42: "FORMAT.NUMBER",
  43: "ALIGNMENT",
  44: "STYLE",
  45: "BORDER",
  46: "CELL.PROTECTION",
  47: "COLUMN.WIDTH",
  48: "UNDO",
  49: "CUT",
  50: "COPY",
  51: "PASTE",
  52: "CLEAR",
  53: "PASTE.SPECIAL",
  54: "EDIT.DELETE",
  55: "INSERT",
  56: "FILL.RIGHT",
  57: "FILL.DOWN",
  61: "DEFINE.NAME",
  62: "CREATE.NAMES",
  63: "FORMULA.GOTO",
  64: "FORMULA.FIND",
  65: "SELECT.LAST.CELL",
  66: "SHOW.ACTIVE.CELL",
  67: "GALLERY.AREA",
  68: "GALLERY.BAR",
  69: "GALLERY.COLUMN",
  70: "GALLERY.LINE",
  71: "GALLERY.PIE",
  72: "GALLERY.SCATTER",
  73: "COMBINATION",
  74: "PREFERRED",
  75: "ADD.OVERLAY",
  76: "GRIDLINES",
  77: "SET.PREFERRED",
  78: "AXES",
  79: "LEGEND",
  80: "ATTACH.TEXT",
  81: "ADD.ARROW",
  82: "SELECT.CHART",
  83: "SELECT.PLOT.AREA",
  84: "PATTERNS",
  85: "MAIN.CHART",
  86: "OVERLAY",
  87: "SCALE",
  88: "FORMAT.LEGEND",
  89: "FORMAT.TEXT",
  90: "EDIT.REPEAT",
  91: "PARSE",
  92: "JUSTIFY",
  93: "HIDE",
  94: "UNHIDE",
  95: "WORKSPACE",
  96: "FORMULA",
  97: "FORMULA.FILL",
  98: "FORMULA.ARRAY",
  99: "DATA.FIND.NEXT",
  100: "DATA.FIND.PREV",
  101: "FORMULA.FIND.NEXT",
  102: "FORMULA.FIND.PREV",
  103: "ACTIVATE",
  104: "ACTIVATE.NEXT",
  105: "ACTIVATE.PREV",
  106: "UNLOCKED.NEXT",
  107: "UNLOCKED.PREV",
  108: "COPY.PICTURE",
  109: "SELECT",
  110: "DELETE.NAME",
  111: "DELETE.FORMAT",
  112: "VLINE",
  113: "HLINE",
  114: "VPAGE",
  115: "HPAGE",
  116: "VSCROLL",
  117: "HSCROLL",
  118: "ALERT",
  119: "NEW",
  120: "CANCEL.COPY",
  121: "SHOW.CLIPBOARD",
  122: "MESSAGE",
  124: "PASTE.LINK",
  125: "APP.ACTIVATE",
  126: "DELETE.ARROW",
  127: "ROW.HEIGHT",
  128: "FORMAT.MOVE",
  129: "FORMAT.SIZE",
  130: "FORMULA.REPLACE",
  131: "SEND.KEYS",
  132: "SELECT.SPECIAL",
  133: "APPLY.NAMES",
  134: "REPLACE.FONT",
  135: "FREEZE.PANES",
  136: "SHOW.INFO",
  137: "SPLIT",
  138: "ON.WINDOW",
  139: "ON.DATA",
  140: "DISABLE.INPUT",
  142: "OUTLINE",
  143: "LIST.NAMES",
  144: "FILE.CLOSE",
  145: "SAVE.WORKBOOK",
  146: "DATA.FORM",
  147: "COPY.CHART",
  148: "ON.TIME",
  149: "WAIT",
  150: "FORMAT.FONT",
  151: "FILL.UP",
  152: "FILL.LEFT",
  153: "DELETE.OVERLAY",
  155: "SHORT.MENUS",
  159: "SET.UPDATE.STATUS",
  161: "COLOR.PALETTE",
  162: "DELETE.STYLE",
  163: "WINDOW.RESTORE",
  164: "WINDOW.MAXIMIZE",
  166: "CHANGE.LINK",
  167: "CALCULATE.DOCUMENT",
  168: "ON.KEY",
  169: "APP.RESTORE",
  170: "APP.MOVE",
  171: "APP.SIZE",
  172: "APP.MINIMIZE",
  173: "APP.MAXIMIZE",
  174: "BRING.TO.FRONT",
  175: "SEND.TO.BACK",
  185: "MAIN.CHART.TYPE",
  186: "OVERLAY.CHART.TYPE",
  187: "SELECT.END",
  188: "OPEN.MAIL",
  189: "SEND.MAIL",
  190: "STANDARD.FONT",
  191: "CONSOLIDATE",
  192: "SORT.SPECIAL",
  193: "GALLERY.3D.AREA",
  194: "GALLERY.3D.COLUMN",
  195: "GALLERY.3D.LINE",
  196: "GALLERY.3D.PIE",
  197: "VIEW.3D",
  198: "GOAL.SEEK",
  199: "WORKGROUP",
  200: "FILL.GROUP",
  201: "UPDATE.LINK",
  202: "PROMOTE",
  203: "DEMOTE",
  204: "SHOW.DETAIL",
  206: "UNGROUP",
  207: "OBJECT.PROPERTIES",
  208: "SAVE.NEW.OBJECT",
  209: "SHARE",
  210: "SHARE.NAME",
  211: "DUPLICATE",
  212: "APPLY.STYLE",
  213: "ASSIGN.TO.OBJECT",
  214: "OBJECT.PROTECTION",
  215: "HIDE.OBJECT",
  216: "SET.EXTRACT",
  217: "CREATE.PUBLISHER",
  218: "SUBSCRIBE.TO",
  219: "ATTRIBUTES",
  220: "SHOW.TOOLBAR",
  222: "PRINT.PREVIEW",
  223: "EDIT.COLOR",
  224: "SHOW.LEVELS",
  225: "FORMAT.MAIN",
  226: "FORMAT.OVERLAY",
  227: "ON.RECALC",
  228: "EDIT.SERIES",
  229: "DEFINE.STYLE",
  240: "LINE.PRINT",
  243: "ENTER.DATA",
  249: "GALLERY.RADAR",
  250: "MERGE.STYLES",
  251: "EDITION.OPTIONS",
  252: "PASTE.PICTURE",
  253: "PASTE.PICTURE.LINK",
  254: "SPELLING",
  256: "ZOOM",
  259: "INSERT.OBJECT",
  260: "WINDOW.MINIMIZE",
  265: "SOUND.NOTE",
  266: "SOUND.PLAY",
  267: "FORMAT.SHAPE",
  268: "EXTEND.POLYGON",
  269: "FORMAT.AUTO",
  272: "GALLERY.3D.BAR",
  273: "GALLERY.3D.SURFACE",
  274: "FILL.AUTO",
  276: "CUSTOMIZE.TOOLBAR",
  277: "ADD.TOOL",
  278: "EDIT.OBJECT",
  279: "ON.DOUBLECLICK",
  280: "ON.ENTRY",
  281: "WORKBOOK.ADD",
  282: "WORKBOOK.MOVE",
  283: "WORKBOOK.COPY",
  284: "WORKBOOK.OPTIONS",
  285: "SAVE.WORKSPACE",
  288: "CHART.WIZARD",
  289: "DELETE.TOOL",
  290: "MOVE.TOOL",
  291: "WORKBOOK.SELECT",
  292: "WORKBOOK.ACTIVATE",
  293: "ASSIGN.TO.TOOL",
  295: "COPY.TOOL",
  296: "RESET.TOOL",
  297: "CONSTRAIN.NUMERIC",
  298: "PASTE.TOOL",
  302: "WORKBOOK.NEW",
  305: "SCENARIO.CELLS",
  306: "SCENARIO.DELETE",
  307: "SCENARIO.ADD",
  308: "SCENARIO.EDIT",
  309: "SCENARIO.SHOW",
  310: "SCENARIO.SHOW.NEXT",
  311: "SCENARIO.SUMMARY",
  312: "PIVOT.TABLE.WIZARD",
  313: "PIVOT.FIELD.PROPERTIES",
  314: "PIVOT.FIELD",
  315: "PIVOT.ITEM",
  316: "PIVOT.ADD.FIELDS",
  318: "OPTIONS.CALCULATION",
  319: "OPTIONS.EDIT",
  320: "OPTIONS.VIEW",
  321: "ADDIN.MANAGER",
  322: "MENU.EDITOR",
  323: "ATTACH.TOOLBARS",
  324: "VBAActivate",
  325: "OPTIONS.CHART",
  328: "VBA.INSERT.FILE",
  330: "VBA.PROCEDURE.DEFINITION",
  336: "ROUTING.SLIP",
  338: "ROUTE.DOCUMENT",
  339: "MAIL.LOGON",
  342: "INSERT.PICTURE",
  343: "EDIT.TOOL",
  344: "GALLERY.DOUGHNUT",
  350: "CHART.TREND",
  352: "PIVOT.ITEM.PROPERTIES",
  354: "WORKBOOK.INSERT",
  355: "OPTIONS.TRANSITION",
  356: "OPTIONS.GENERAL",
  370: "FILTER.ADVANCED",
  373: "MAIL.ADD.MAILER",
  374: "MAIL.DELETE.MAILER",
  375: "MAIL.REPLY",
  376: "MAIL.REPLY.ALL",
  377: "MAIL.FORWARD",
  378: "MAIL.NEXT.LETTER",
  379: "DATA.LABEL",
  380: "INSERT.TITLE",
  381: "FONT.PROPERTIES",
  382: "MACRO.OPTIONS",
  383: "WORKBOOK.HIDE",
  384: "WORKBOOK.UNHIDE",
  385: "WORKBOOK.DELETE",
  386: "WORKBOOK.NAME",
  388: "GALLERY.CUSTOM",
  390: "ADD.CHART.AUTOFORMAT",
  391: "DELETE.CHART.AUTOFORMAT",
  392: "CHART.ADD.DATA",
  393: "AUTO.OUTLINE",
  394: "TAB.ORDER",
  395: "SHOW.DIALOG",
  396: "SELECT.ALL",
  397: "UNGROUP.SHEETS",
  398: "SUBTOTAL.CREATE",
  399: "SUBTOTAL.REMOVE",
  400: "RENAME.OBJECT",
  412: "WORKBOOK.SCROLL",
  413: "WORKBOOK.NEXT",
  414: "WORKBOOK.PREV",
  415: "WORKBOOK.TAB.SPLIT",
  416: "FULL.SCREEN",
  417: "WORKBOOK.PROTECT",
  420: "SCROLLBAR.PROPERTIES",
  421: "PIVOT.SHOW.PAGES",
  422: "TEXT.TO.COLUMNS",
  423: "FORMAT.CHARTTYPE",
  424: "LINK.FORMAT",
  425: "TRACER.DISPLAY",
  430: "TRACER.NAVIGATE",
  431: "TRACER.CLEAR",
  432: "TRACER.ERROR",
  433: "PIVOT.FIELD.GROUP",
  434: "PIVOT.FIELD.UNGROUP",
  435: "CHECKBOX.PROPERTIES",
  436: "LABEL.PROPERTIES",
  437: "LISTBOX.PROPERTIES",
  438: "EDITBOX.PROPERTIES",
  439: "PIVOT.REFRESH",
  440: "LINK.COMBO",
  441: "OPEN.TEXT",
  442: "HIDE.DIALOG",
  443: "SET.DIALOG.FOCUS",
  444: "ENABLE.OBJECT",
  445: "PUSHBUTTON.PROPERTIES",
  446: "SET.DIALOG.DEFAULT",
  447: "FILTER",
  448: "FILTER.SHOW.ALL",
  449: "CLEAR.OUTLINE",
  450: "FUNCTION.WIZARD",
  451: "ADD.LIST.ITEM",
  452: "SET.LIST.ITEM",
  453: "REMOVE.LIST.ITEM",
  454: "SELECT.LIST.ITEM",
  455: "SET.CONTROL.VALUE",
  456: "SAVE.COPY.AS",
  458: "OPTIONS.LISTS.ADD",
  459: "OPTIONS.LISTS.DELETE",
  460: "SERIES.AXES",
  461: "SERIES.X",
  462: "SERIES.Y",
  463: "ERRORBAR.X",
  464: "ERRORBAR.Y",
  465: "FORMAT.CHART",
  466: "SERIES.ORDER",
  467: "MAIL.LOGOFF",
  468: "CLEAR.ROUTING.SLIP",
  469: "APP.ACTIVATE.MICROSOFT",
  470: "MAIL.EDIT.MAILER",
  471: "ON.SHEET",
  472: "STANDARD.WIDTH",
  473: "SCENARIO.MERGE",
  474: "SUMMARY.INFO",
  475: "FIND.FILE",
  476: "ACTIVE.CELL.FONT",
  477: "ENABLE.TIPWIZARD",
  478: "VBA.MAKE.ADDIN",
  480: "INSERTDATATABLE",
  481: "WORKGROUP.OPTIONS",
  482: "MAIL.SEND.MAILER",
  485: "AUTOCORRECT",
  489: "POST.DOCUMENT",
  491: "PICKLIST",
  493: "VIEW.SHOW",
  494: "VIEW.DEFINE",
  495: "VIEW.DELETE",
  509: "SHEET.BACKGROUND",
  510: "INSERT.MAP.OBJECT",
  511: "OPTIONS.MENONO",
  517: "MSOCHECKS",
  518: "NORMAL",
  519: "LAYOUT",
  520: "RM.PRINT.AREA",
  521: "CLEAR.PRINT.AREA",
  522: "ADD.PRINT.AREA",
  523: "MOVE.BRK",
  545: "HIDECURR.NOTE",
  546: "HIDEALL.NOTES",
  547: "DELETE.NOTE",
  548: "TRAVERSE.NOTES",
  549: "ACTIVATE.NOTES",
  620: "PROTECT.REVISIONS",
  621: "UNPROTECT.REVISIONS",
  647: "OPTIONS.ME",
  653: "WEB.PUBLISH",
  667: "NEWWEBQUERY",
  673: "PIVOT.TABLE.CHART",
  753: "OPTIONS.SAVE",
  755: "OPTIONS.SPELL",
  808: "HIDEALL.INKANNOTS"
}, fs = {
  0: "COUNT",
  1: "IF",
  2: "ISNA",
  3: "ISERROR",
  4: "SUM",
  5: "AVERAGE",
  6: "MIN",
  7: "MAX",
  8: "ROW",
  9: "COLUMN",
  10: "NA",
  11: "NPV",
  12: "STDEV",
  13: "DOLLAR",
  14: "FIXED",
  15: "SIN",
  16: "COS",
  17: "TAN",
  18: "ATAN",
  19: "PI",
  20: "SQRT",
  21: "EXP",
  22: "LN",
  23: "LOG10",
  24: "ABS",
  25: "INT",
  26: "SIGN",
  27: "ROUND",
  28: "LOOKUP",
  29: "INDEX",
  30: "REPT",
  31: "MID",
  32: "LEN",
  33: "VALUE",
  34: "TRUE",
  35: "FALSE",
  36: "AND",
  37: "OR",
  38: "NOT",
  39: "MOD",
  40: "DCOUNT",
  41: "DSUM",
  42: "DAVERAGE",
  43: "DMIN",
  44: "DMAX",
  45: "DSTDEV",
  46: "VAR",
  47: "DVAR",
  48: "TEXT",
  49: "LINEST",
  50: "TREND",
  51: "LOGEST",
  52: "GROWTH",
  53: "GOTO",
  54: "HALT",
  55: "RETURN",
  56: "PV",
  57: "FV",
  58: "NPER",
  59: "PMT",
  60: "RATE",
  61: "MIRR",
  62: "IRR",
  63: "RAND",
  64: "MATCH",
  65: "DATE",
  66: "TIME",
  67: "DAY",
  68: "MONTH",
  69: "YEAR",
  70: "WEEKDAY",
  71: "HOUR",
  72: "MINUTE",
  73: "SECOND",
  74: "NOW",
  75: "AREAS",
  76: "ROWS",
  77: "COLUMNS",
  78: "OFFSET",
  79: "ABSREF",
  80: "RELREF",
  81: "ARGUMENT",
  82: "SEARCH",
  83: "TRANSPOSE",
  84: "ERROR",
  85: "STEP",
  86: "TYPE",
  87: "ECHO",
  88: "SET.NAME",
  89: "CALLER",
  90: "DEREF",
  91: "WINDOWS",
  92: "SERIES",
  93: "DOCUMENTS",
  94: "ACTIVE.CELL",
  95: "SELECTION",
  96: "RESULT",
  97: "ATAN2",
  98: "ASIN",
  99: "ACOS",
  100: "CHOOSE",
  101: "HLOOKUP",
  102: "VLOOKUP",
  103: "LINKS",
  104: "INPUT",
  105: "ISREF",
  106: "GET.FORMULA",
  107: "GET.NAME",
  108: "SET.VALUE",
  109: "LOG",
  110: "EXEC",
  111: "CHAR",
  112: "LOWER",
  113: "UPPER",
  114: "PROPER",
  115: "LEFT",
  116: "RIGHT",
  117: "EXACT",
  118: "TRIM",
  119: "REPLACE",
  120: "SUBSTITUTE",
  121: "CODE",
  122: "NAMES",
  123: "DIRECTORY",
  124: "FIND",
  125: "CELL",
  126: "ISERR",
  127: "ISTEXT",
  128: "ISNUMBER",
  129: "ISBLANK",
  130: "T",
  131: "N",
  132: "FOPEN",
  133: "FCLOSE",
  134: "FSIZE",
  135: "FREADLN",
  136: "FREAD",
  137: "FWRITELN",
  138: "FWRITE",
  139: "FPOS",
  140: "DATEVALUE",
  141: "TIMEVALUE",
  142: "SLN",
  143: "SYD",
  144: "DDB",
  145: "GET.DEF",
  146: "REFTEXT",
  147: "TEXTREF",
  148: "INDIRECT",
  149: "REGISTER",
  150: "CALL",
  151: "ADD.BAR",
  152: "ADD.MENU",
  153: "ADD.COMMAND",
  154: "ENABLE.COMMAND",
  155: "CHECK.COMMAND",
  156: "RENAME.COMMAND",
  157: "SHOW.BAR",
  158: "DELETE.MENU",
  159: "DELETE.COMMAND",
  160: "GET.CHART.ITEM",
  161: "DIALOG.BOX",
  162: "CLEAN",
  163: "MDETERM",
  164: "MINVERSE",
  165: "MMULT",
  166: "FILES",
  167: "IPMT",
  168: "PPMT",
  169: "COUNTA",
  170: "CANCEL.KEY",
  171: "FOR",
  172: "WHILE",
  173: "BREAK",
  174: "NEXT",
  175: "INITIATE",
  176: "REQUEST",
  177: "POKE",
  178: "EXECUTE",
  179: "TERMINATE",
  180: "RESTART",
  181: "HELP",
  182: "GET.BAR",
  183: "PRODUCT",
  184: "FACT",
  185: "GET.CELL",
  186: "GET.WORKSPACE",
  187: "GET.WINDOW",
  188: "GET.DOCUMENT",
  189: "DPRODUCT",
  190: "ISNONTEXT",
  191: "GET.NOTE",
  192: "NOTE",
  193: "STDEVP",
  194: "VARP",
  195: "DSTDEVP",
  196: "DVARP",
  197: "TRUNC",
  198: "ISLOGICAL",
  199: "DCOUNTA",
  200: "DELETE.BAR",
  201: "UNREGISTER",
  204: "USDOLLAR",
  205: "FINDB",
  206: "SEARCHB",
  207: "REPLACEB",
  208: "LEFTB",
  209: "RIGHTB",
  210: "MIDB",
  211: "LENB",
  212: "ROUNDUP",
  213: "ROUNDDOWN",
  214: "ASC",
  215: "DBCS",
  216: "RANK",
  219: "ADDRESS",
  220: "DAYS360",
  221: "TODAY",
  222: "VDB",
  223: "ELSE",
  224: "ELSE.IF",
  225: "END.IF",
  226: "FOR.CELL",
  227: "MEDIAN",
  228: "SUMPRODUCT",
  229: "SINH",
  230: "COSH",
  231: "TANH",
  232: "ASINH",
  233: "ACOSH",
  234: "ATANH",
  235: "DGET",
  236: "CREATE.OBJECT",
  237: "VOLATILE",
  238: "LAST.ERROR",
  239: "CUSTOM.UNDO",
  240: "CUSTOM.REPEAT",
  241: "FORMULA.CONVERT",
  242: "GET.LINK.INFO",
  243: "TEXT.BOX",
  244: "INFO",
  245: "GROUP",
  246: "GET.OBJECT",
  247: "DB",
  248: "PAUSE",
  251: "RESUME",
  252: "FREQUENCY",
  253: "ADD.TOOLBAR",
  254: "DELETE.TOOLBAR",
  255: "User",
  256: "RESET.TOOLBAR",
  257: "EVALUATE",
  258: "GET.TOOLBAR",
  259: "GET.TOOL",
  260: "SPELLING.CHECK",
  261: "ERROR.TYPE",
  262: "APP.TITLE",
  263: "WINDOW.TITLE",
  264: "SAVE.TOOLBAR",
  265: "ENABLE.TOOL",
  266: "PRESS.TOOL",
  267: "REGISTER.ID",
  268: "GET.WORKBOOK",
  269: "AVEDEV",
  270: "BETADIST",
  271: "GAMMALN",
  272: "BETAINV",
  273: "BINOMDIST",
  274: "CHIDIST",
  275: "CHIINV",
  276: "COMBIN",
  277: "CONFIDENCE",
  278: "CRITBINOM",
  279: "EVEN",
  280: "EXPONDIST",
  281: "FDIST",
  282: "FINV",
  283: "FISHER",
  284: "FISHERINV",
  285: "FLOOR",
  286: "GAMMADIST",
  287: "GAMMAINV",
  288: "CEILING",
  289: "HYPGEOMDIST",
  290: "LOGNORMDIST",
  291: "LOGINV",
  292: "NEGBINOMDIST",
  293: "NORMDIST",
  294: "NORMSDIST",
  295: "NORMINV",
  296: "NORMSINV",
  297: "STANDARDIZE",
  298: "ODD",
  299: "PERMUT",
  300: "POISSON",
  301: "TDIST",
  302: "WEIBULL",
  303: "SUMXMY2",
  304: "SUMX2MY2",
  305: "SUMX2PY2",
  306: "CHITEST",
  307: "CORREL",
  308: "COVAR",
  309: "FORECAST",
  310: "FTEST",
  311: "INTERCEPT",
  312: "PEARSON",
  313: "RSQ",
  314: "STEYX",
  315: "SLOPE",
  316: "TTEST",
  317: "PROB",
  318: "DEVSQ",
  319: "GEOMEAN",
  320: "HARMEAN",
  321: "SUMSQ",
  322: "KURT",
  323: "SKEW",
  324: "ZTEST",
  325: "LARGE",
  326: "SMALL",
  327: "QUARTILE",
  328: "PERCENTILE",
  329: "PERCENTRANK",
  330: "MODE",
  331: "TRIMMEAN",
  332: "TINV",
  334: "MOVIE.COMMAND",
  335: "GET.MOVIE",
  336: "CONCATENATE",
  337: "POWER",
  338: "PIVOT.ADD.DATA",
  339: "GET.PIVOT.TABLE",
  340: "GET.PIVOT.FIELD",
  341: "GET.PIVOT.ITEM",
  342: "RADIANS",
  343: "DEGREES",
  344: "SUBTOTAL",
  345: "SUMIF",
  346: "COUNTIF",
  347: "COUNTBLANK",
  348: "SCENARIO.GET",
  349: "OPTIONS.LISTS.GET",
  350: "ISPMT",
  351: "DATEDIF",
  352: "DATESTRING",
  353: "NUMBERSTRING",
  354: "ROMAN",
  355: "OPEN.DIALOG",
  356: "SAVE.DIALOG",
  357: "VIEW.GET",
  358: "GETPIVOTDATA",
  359: "HYPERLINK",
  360: "PHONETIC",
  361: "AVERAGEA",
  362: "MAXA",
  363: "MINA",
  364: "STDEVPA",
  365: "VARPA",
  366: "STDEVA",
  367: "VARA",
  368: "BAHTTEXT",
  369: "THAIDAYOFWEEK",
  370: "THAIDIGIT",
  371: "THAIMONTHOFYEAR",
  372: "THAINUMSOUND",
  373: "THAINUMSTRING",
  374: "THAISTRINGLENGTH",
  375: "ISTHAIDIGIT",
  376: "ROUNDBAHTDOWN",
  377: "ROUNDBAHTUP",
  378: "THAIYEAR",
  379: "RTD",
  380: "CUBEVALUE",
  381: "CUBEMEMBER",
  382: "CUBEMEMBERPROPERTY",
  383: "CUBERANKEDMEMBER",
  384: "HEX2BIN",
  385: "HEX2DEC",
  386: "HEX2OCT",
  387: "DEC2BIN",
  388: "DEC2HEX",
  389: "DEC2OCT",
  390: "OCT2BIN",
  391: "OCT2HEX",
  392: "OCT2DEC",
  393: "BIN2DEC",
  394: "BIN2OCT",
  395: "BIN2HEX",
  396: "IMSUB",
  397: "IMDIV",
  398: "IMPOWER",
  399: "IMABS",
  400: "IMSQRT",
  401: "IMLN",
  402: "IMLOG2",
  403: "IMLOG10",
  404: "IMSIN",
  405: "IMCOS",
  406: "IMEXP",
  407: "IMARGUMENT",
  408: "IMCONJUGATE",
  409: "IMAGINARY",
  410: "IMREAL",
  411: "COMPLEX",
  412: "IMSUM",
  413: "IMPRODUCT",
  414: "SERIESSUM",
  415: "FACTDOUBLE",
  416: "SQRTPI",
  417: "QUOTIENT",
  418: "DELTA",
  419: "GESTEP",
  420: "ISEVEN",
  421: "ISODD",
  422: "MROUND",
  423: "ERF",
  424: "ERFC",
  425: "BESSELJ",
  426: "BESSELK",
  427: "BESSELY",
  428: "BESSELI",
  429: "XIRR",
  430: "XNPV",
  431: "PRICEMAT",
  432: "YIELDMAT",
  433: "INTRATE",
  434: "RECEIVED",
  435: "DISC",
  436: "PRICEDISC",
  437: "YIELDDISC",
  438: "TBILLEQ",
  439: "TBILLPRICE",
  440: "TBILLYIELD",
  441: "PRICE",
  442: "YIELD",
  443: "DOLLARDE",
  444: "DOLLARFR",
  445: "NOMINAL",
  446: "EFFECT",
  447: "CUMPRINC",
  448: "CUMIPMT",
  449: "EDATE",
  450: "EOMONTH",
  451: "YEARFRAC",
  452: "COUPDAYBS",
  453: "COUPDAYS",
  454: "COUPDAYSNC",
  455: "COUPNCD",
  456: "COUPNUM",
  457: "COUPPCD",
  458: "DURATION",
  459: "MDURATION",
  460: "ODDLPRICE",
  461: "ODDLYIELD",
  462: "ODDFPRICE",
  463: "ODDFYIELD",
  464: "RANDBETWEEN",
  465: "WEEKNUM",
  466: "AMORDEGRC",
  467: "AMORLINC",
  468: "CONVERT",
  724: "SHEETJS",
  469: "ACCRINT",
  470: "ACCRINTM",
  471: "WORKDAY",
  472: "NETWORKDAYS",
  473: "GCD",
  474: "MULTINOMIAL",
  475: "LCM",
  476: "FVSCHEDULE",
  477: "CUBEKPIMEMBER",
  478: "CUBESET",
  479: "CUBESETCOUNT",
  480: "IFERROR",
  481: "COUNTIFS",
  482: "SUMIFS",
  483: "AVERAGEIF",
  484: "AVERAGEIFS"
}, W1 = {
  2: 1,
  3: 1,
  10: 0,
  15: 1,
  16: 1,
  17: 1,
  18: 1,
  19: 0,
  20: 1,
  21: 1,
  22: 1,
  23: 1,
  24: 1,
  25: 1,
  26: 1,
  27: 2,
  30: 2,
  31: 3,
  32: 1,
  33: 1,
  34: 0,
  35: 0,
  38: 1,
  39: 2,
  40: 3,
  41: 3,
  42: 3,
  43: 3,
  44: 3,
  45: 3,
  47: 3,
  48: 2,
  53: 1,
  61: 3,
  63: 0,
  65: 3,
  66: 3,
  67: 1,
  68: 1,
  69: 1,
  70: 1,
  71: 1,
  72: 1,
  73: 1,
  74: 0,
  75: 1,
  76: 1,
  77: 1,
  79: 2,
  80: 2,
  83: 1,
  85: 0,
  86: 1,
  89: 0,
  90: 1,
  94: 0,
  95: 0,
  97: 2,
  98: 1,
  99: 1,
  101: 3,
  102: 3,
  105: 1,
  106: 1,
  108: 2,
  111: 1,
  112: 1,
  113: 1,
  114: 1,
  117: 2,
  118: 1,
  119: 4,
  121: 1,
  126: 1,
  127: 1,
  128: 1,
  129: 1,
  130: 1,
  131: 1,
  133: 1,
  134: 1,
  135: 1,
  136: 2,
  137: 2,
  138: 2,
  140: 1,
  141: 1,
  142: 3,
  143: 4,
  144: 4,
  161: 1,
  162: 1,
  163: 1,
  164: 1,
  165: 2,
  172: 1,
  175: 2,
  176: 2,
  177: 3,
  178: 2,
  179: 1,
  184: 1,
  186: 1,
  189: 3,
  190: 1,
  195: 3,
  196: 3,
  197: 1,
  198: 1,
  199: 3,
  201: 1,
  207: 4,
  210: 3,
  211: 1,
  212: 2,
  213: 2,
  214: 1,
  215: 1,
  225: 0,
  229: 1,
  230: 1,
  231: 1,
  232: 1,
  233: 1,
  234: 1,
  235: 3,
  244: 1,
  247: 4,
  252: 2,
  257: 1,
  261: 1,
  271: 1,
  273: 4,
  274: 2,
  275: 2,
  276: 2,
  277: 3,
  278: 3,
  279: 1,
  280: 3,
  281: 3,
  282: 3,
  283: 1,
  284: 1,
  285: 2,
  286: 4,
  287: 3,
  288: 2,
  289: 4,
  290: 3,
  291: 3,
  292: 3,
  293: 4,
  294: 1,
  295: 3,
  296: 1,
  297: 3,
  298: 1,
  299: 2,
  300: 3,
  301: 3,
  302: 4,
  303: 2,
  304: 2,
  305: 2,
  306: 2,
  307: 2,
  308: 2,
  309: 3,
  310: 2,
  311: 2,
  312: 2,
  313: 2,
  314: 2,
  315: 2,
  316: 4,
  325: 2,
  326: 2,
  327: 2,
  328: 2,
  331: 2,
  332: 2,
  337: 2,
  342: 1,
  343: 1,
  346: 2,
  347: 1,
  350: 4,
  351: 3,
  352: 1,
  353: 2,
  360: 1,
  368: 1,
  369: 1,
  370: 1,
  371: 1,
  372: 1,
  373: 1,
  374: 1,
  375: 1,
  376: 1,
  377: 1,
  378: 1,
  382: 3,
  385: 1,
  392: 1,
  393: 1,
  396: 2,
  397: 2,
  398: 2,
  399: 1,
  400: 1,
  401: 1,
  402: 1,
  403: 1,
  404: 1,
  405: 1,
  406: 1,
  407: 1,
  408: 1,
  409: 1,
  410: 1,
  414: 4,
  415: 1,
  416: 1,
  417: 2,
  420: 1,
  421: 1,
  422: 2,
  424: 1,
  425: 2,
  426: 2,
  427: 2,
  428: 2,
  430: 3,
  438: 3,
  439: 3,
  440: 3,
  443: 2,
  444: 2,
  445: 2,
  446: 2,
  447: 6,
  448: 6,
  449: 2,
  450: 2,
  464: 2,
  468: 3,
  476: 2,
  479: 1,
  480: 2,
  65535: 0
};
function V1(e) {
  var t = "of:=" + e.replace(S0, "$1[.$2$3$4$5]").replace(/\]:\[/g, ":");
  return t.replace(/;/g, "|").replace(/,/g, ";");
}
function G1(e) {
  return e.replace(/\./, "!");
}
var Bt = typeof Map < "u";
function F0(e, t, r) {
  var n = 0, a = e.length;
  if (r) {
    if (Bt ? r.has(t) : Object.prototype.hasOwnProperty.call(r, t)) {
      for (var i = Bt ? r.get(t) : r[t]; n < i.length; ++n)
        if (e[i[n]].t === t)
          return e.Count++, i[n];
    }
  } else
    for (; n < a; ++n)
      if (e[n].t === t)
        return e.Count++, n;
  return e[a] = { t }, e.Count++, e.Unique++, r && (Bt ? (r.has(t) || r.set(t, []), r.get(t).push(a)) : (Object.prototype.hasOwnProperty.call(r, t) || (r[t] = []), r[t].push(a))), a;
}
function Pn(e, t) {
  var r = { min: e + 1, max: e + 1 }, n = -1;
  return t.MDW && (Nr = t.MDW), t.width != null ? r.customWidth = 1 : t.wpx != null ? n = wn(t.wpx) : t.wch != null && (n = t.wch), n > -1 ? (r.width = e0(n), r.customWidth = 1) : t.width != null && (r.width = t.width), t.hidden && (r.hidden = !0), t.level != null && (r.outlineLevel = r.level = t.level), r;
}
function ls(e, t) {
  if (!!e) {
    var r = [0.7, 0.7, 0.75, 0.75, 0.3, 0.3];
    t == "xlml" && (r = [1, 1, 1, 1, 0.5, 0.5]), e.left == null && (e.left = r[0]), e.right == null && (e.right = r[1]), e.top == null && (e.top = r[2]), e.bottom == null && (e.bottom = r[3]), e.header == null && (e.header = r[4]), e.footer == null && (e.footer = r[5]);
  }
}
function jr(e, t, r) {
  var n = r.revssf[t.z != null ? t.z : "General"], a = 60, i = e.length;
  if (n == null && r.ssf) {
    for (; a < 392; ++a)
      if (r.ssf[a] == null) {
        ni(t.z, a), r.ssf[a] = t.z, r.revssf[t.z] = n = a;
        break;
      }
  }
  for (a = 0; a != i; ++a)
    if (e[a].numFmtId === n)
      return a;
  return e[i] = {
    numFmtId: n,
    fontId: 0,
    fillId: 0,
    borderId: 0,
    xfId: 0,
    applyNumberFormat: 1
  }, i;
}
function X1(e, t, r) {
  if (e && e["!ref"]) {
    var n = Se(e["!ref"]);
    if (n.e.c < n.s.c || n.e.r < n.s.r)
      throw new Error("Bad range (" + r + "): " + e["!ref"]);
  }
}
function j1(e) {
  if (e.length === 0)
    return "";
  for (var t = '<mergeCells count="' + e.length + '">', r = 0; r != e.length; ++r)
    t += '<mergeCell ref="' + ke(e[r]) + '"/>';
  return t + "</mergeCells>";
}
function $1(e, t, r, n, a) {
  var i = !1, s = {}, f = null;
  if (n.bookType !== "xlsx" && t.vbaraw) {
    var c = t.SheetNames[r];
    try {
      t.Workbook && (c = t.Workbook.Sheets[r].CodeName || c);
    } catch {
    }
    i = !0, s.codeName = Dr(ge(c));
  }
  if (e && e["!outline"]) {
    var l = { summaryBelow: 1, summaryRight: 1 };
    e["!outline"].above && (l.summaryBelow = 0), e["!outline"].left && (l.summaryRight = 0), f = (f || "") + q("outlinePr", null, l);
  }
  !i && !f || (a[a.length] = q("sheetPr", f, s));
}
var z1 = ["objects", "scenarios", "selectLockedCells", "selectUnlockedCells"], K1 = [
  "formatColumns",
  "formatRows",
  "formatCells",
  "insertColumns",
  "insertRows",
  "insertHyperlinks",
  "deleteColumns",
  "deleteRows",
  "sort",
  "autoFilter",
  "pivotTables"
];
function Y1(e) {
  var t = { sheet: 1 };
  return z1.forEach(function(r) {
    e[r] != null && e[r] && (t[r] = "1");
  }), K1.forEach(function(r) {
    e[r] != null && !e[r] && (t[r] = "0");
  }), e.password && (t.password = ji(e.password).toString(16).toUpperCase()), q("sheetProtection", null, t);
}
function q1(e) {
  return ls(e), q("pageMargins", null, e);
}
function J1(e, t) {
  for (var r = ["<cols>"], n, a = 0; a != t.length; ++a)
    !(n = t[a]) || (r[r.length] = q("col", null, Pn(a, n)));
  return r[r.length] = "</cols>", r.join("");
}
function Z1(e, t, r, n) {
  var a = typeof e.ref == "string" ? e.ref : ke(e.ref);
  r.Workbook || (r.Workbook = { Sheets: [] }), r.Workbook.Names || (r.Workbook.Names = []);
  var i = r.Workbook.Names, s = cr(a);
  s.s.r == s.e.r && (s.e.r = cr(t["!ref"]).e.r, a = ke(s));
  for (var f = 0; f < i.length; ++f) {
    var c = i[f];
    if (c.Name == "_xlnm._FilterDatabase" && c.Sheet == n) {
      c.Ref = "'" + r.SheetNames[n] + "'!" + a;
      break;
    }
  }
  return f == i.length && i.push({ Name: "_xlnm._FilterDatabase", Sheet: n, Ref: "'" + r.SheetNames[n] + "'!" + a }), q("autoFilter", null, { ref: a });
}
function Q1(e, t, r, n) {
  var a = { workbookViewId: "0" };
  return (((n || {}).Workbook || {}).Views || [])[0] && (a.rightToLeft = n.Workbook.Views[0].RTL ? "1" : "0"), q("sheetViews", q("sheetView", null, a), {});
}
function eh(e, t, r, n) {
  if (e.c && r["!comments"].push([t, e.c]), e.v === void 0 && typeof e.f != "string" || e.t === "z" && !e.f)
    return "";
  var a = "", i = e.t, s = e.v;
  if (e.t !== "z")
    switch (e.t) {
      case "b":
        a = e.v ? "1" : "0";
        break;
      case "n":
        a = "" + e.v;
        break;
      case "e":
        a = zt[e.v];
        break;
      case "d":
        n && n.cellDates ? a = Ze(e.v, -1).toISOString() : (e = tr(e), e.t = "n", a = "" + (e.v = rr(Ze(e.v)))), typeof e.z > "u" && (e.z = Oe[14]);
        break;
      default:
        a = e.v;
        break;
    }
  var f = Ge("v", ge(a)), c = { r: t }, l = jr(n.cellXfs, e, n);
  switch (l !== 0 && (c.s = l), e.t) {
    case "n":
      break;
    case "d":
      c.t = "d";
      break;
    case "b":
      c.t = "b";
      break;
    case "e":
      c.t = "e";
      break;
    case "z":
      break;
    default:
      if (e.v == null) {
        delete e.t;
        break;
      }
      if (e.v.length > 32767)
        throw new Error("Text length must not exceed 32767 characters");
      if (n && n.bookSST) {
        f = Ge("v", "" + F0(n.Strings, e.v, n.revStrings)), c.t = "s";
        break;
      }
      c.t = "str";
      break;
  }
  if (e.t != i && (e.t = i, e.v = s), typeof e.f == "string" && e.f) {
    var o = e.F && e.F.slice(0, t.length) == t ? { t: "array", ref: e.F } : null;
    f = q("f", ge(e.f), o) + (e.v != null ? f : "");
  }
  return e.l && r["!links"].push([t, e.l]), e.D && (c.cm = 1), q("c", f, c);
}
function rh(e, t, r, n) {
  var a = [], i = [], s = Se(e["!ref"]), f = "", c, l = "", o = [], u = 0, h = 0, d = e["!rows"], g = Array.isArray(e), x = { r: l }, m, O = -1;
  for (h = s.s.c; h <= s.e.c; ++h)
    o[h] = ze(h);
  for (u = s.s.r; u <= s.e.r; ++u) {
    for (i = [], l = Xe(u), h = s.s.c; h <= s.e.c; ++h) {
      c = o[h] + l;
      var A = g ? (e[u] || [])[h] : e[c];
      A !== void 0 && (f = eh(A, c, e, t)) != null && i.push(f);
    }
    (i.length > 0 || d && d[u]) && (x = { r: l }, d && d[u] && (m = d[u], m.hidden && (x.hidden = 1), O = -1, m.hpx ? O = Sn(m.hpx) : m.hpt && (O = m.hpt), O > -1 && (x.ht = O, x.customHeight = 1), m.level && (x.outlineLevel = m.level)), a[a.length] = q("row", i.join(""), x));
  }
  if (d)
    for (; u < d.length; ++u)
      d && d[u] && (x = { r: u + 1 }, m = d[u], m.hidden && (x.hidden = 1), O = -1, m.hpx ? O = Sn(m.hpx) : m.hpt && (O = m.hpt), O > -1 && (x.ht = O, x.customHeight = 1), m.level && (x.outlineLevel = m.level), a[a.length] = q("row", "", x));
  return a.join("");
}
function os(e, t, r, n) {
  var a = [Ne, q("worksheet", null, {
    xmlns: Et[0],
    "xmlns:r": Be.r
  })], i = r.SheetNames[e], s = 0, f = "", c = r.Sheets[i];
  c == null && (c = {});
  var l = c["!ref"] || "A1", o = Se(l);
  if (o.e.c > 16383 || o.e.r > 1048575) {
    if (t.WTF)
      throw new Error("Range " + l + " exceeds format limit A1:XFD1048576");
    o.e.c = Math.min(o.e.c, 16383), o.e.r = Math.min(o.e.c, 1048575), l = ke(o);
  }
  n || (n = {}), c["!comments"] = [];
  var u = [];
  $1(c, r, e, t, a), a[a.length] = q("dimension", null, { ref: l }), a[a.length] = Q1(c, t, e, r), t.sheetFormat && (a[a.length] = q("sheetFormatPr", null, {
    defaultRowHeight: t.sheetFormat.defaultRowHeight || "16",
    baseColWidth: t.sheetFormat.baseColWidth || "10",
    outlineLevelRow: t.sheetFormat.outlineLevelRow || "7"
  })), c["!cols"] != null && c["!cols"].length > 0 && (a[a.length] = J1(c, c["!cols"])), a[s = a.length] = "<sheetData/>", c["!links"] = [], c["!ref"] != null && (f = rh(c, t), f.length > 0 && (a[a.length] = f)), a.length > s + 1 && (a[a.length] = "</sheetData>", a[s] = a[s].replace("/>", ">")), c["!protect"] && (a[a.length] = Y1(c["!protect"])), c["!autofilter"] != null && (a[a.length] = Z1(c["!autofilter"], c, r, e)), c["!merges"] != null && c["!merges"].length > 0 && (a[a.length] = j1(c["!merges"]));
  var h = -1, d, g = -1;
  return c["!links"].length > 0 && (a[a.length] = "<hyperlinks>", c["!links"].forEach(function(x) {
    !x[1].Target || (d = { ref: x[0] }, x[1].Target.charAt(0) != "#" && (g = me(n, -1, ge(x[1].Target).replace(/#.*$/, ""), xe.HLINK), d["r:id"] = "rId" + g), (h = x[1].Target.indexOf("#")) > -1 && (d.location = ge(x[1].Target.slice(h + 1))), x[1].Tooltip && (d.tooltip = ge(x[1].Tooltip)), a[a.length] = q("hyperlink", null, d));
  }), a[a.length] = "</hyperlinks>"), delete c["!links"], c["!margins"] != null && (a[a.length] = q1(c["!margins"])), (!t || t.ignoreEC || t.ignoreEC == null) && (a[a.length] = Ge("ignoredErrors", q("ignoredError", null, { numberStoredAsText: 1, sqref: l }))), u.length > 0 && (g = me(n, -1, "../drawings/drawing" + (e + 1) + ".xml", xe.DRAW), a[a.length] = q("drawing", null, { "r:id": "rId" + g }), c["!drawing"] = u), c["!comments"].length > 0 && (g = me(n, -1, "../drawings/vmlDrawing" + (e + 1) + ".vml", xe.VML), a[a.length] = q("legacyDrawing", null, { "r:id": "rId" + g }), c["!legacy"] = g), a.length > 1 && (a[a.length] = "</worksheet>", a[1] = a[1].replace("/>", ">")), a.join("");
}
function th(e, t) {
  var r = {}, n = e.l + t;
  r.r = e.read_shift(4), e.l += 4;
  var a = e.read_shift(2);
  e.l += 1;
  var i = e.read_shift(1);
  return e.l = n, i & 7 && (r.level = i & 7), i & 16 && (r.hidden = !0), i & 32 && (r.hpt = a / 20), r;
}
function nh(e, t, r) {
  var n = M(145), a = (r["!rows"] || [])[e] || {};
  n.write_shift(4, e), n.write_shift(4, 0);
  var i = 320;
  a.hpx ? i = Sn(a.hpx) * 20 : a.hpt && (i = a.hpt * 20), n.write_shift(2, i), n.write_shift(1, 0);
  var s = 0;
  a.level && (s |= a.level), a.hidden && (s |= 16), (a.hpx || a.hpt) && (s |= 32), n.write_shift(1, s), n.write_shift(1, 0);
  var f = 0, c = n.l;
  n.l += 4;
  for (var l = { r: e, c: 0 }, o = 0; o < 16; ++o)
    if (!(t.s.c > o + 1 << 10 || t.e.c < o << 10)) {
      for (var u = -1, h = -1, d = o << 10; d < o + 1 << 10; ++d) {
        l.c = d;
        var g = Array.isArray(r) ? (r[l.r] || [])[l.c] : r[_e(l)];
        g && (u < 0 && (u = d), h = d);
      }
      u < 0 || (++f, n.write_shift(4, u), n.write_shift(4, h));
    }
  var x = n.l;
  return n.l = c, n.write_shift(4, f), n.l = x, n.length > n.l ? n.slice(0, n.l) : n;
}
function ah(e, t, r, n) {
  var a = nh(n, r, t);
  (a.length > 17 || (t["!rows"] || [])[n]) && H(e, 0, a);
}
var ih = ft, sh = St;
function fh() {
}
function lh(e, t) {
  var r = {}, n = e[e.l];
  return ++e.l, r.above = !(n & 64), r.left = !(n & 128), e.l += 18, r.name = go(e), r;
}
function oh(e, t, r) {
  r == null && (r = M(84 + 4 * e.length));
  var n = 192;
  t && (t.above && (n &= -65), t.left && (n &= -129)), r.write_shift(1, n);
  for (var a = 1; a < 3; ++a)
    r.write_shift(1, 0);
  return _n({ auto: 1 }, r), r.write_shift(-4, -1), r.write_shift(-4, -1), Ai(e, r), r.slice(0, r.l);
}
function ch(e) {
  var t = pr(e);
  return [t];
}
function uh(e, t, r) {
  return r == null && (r = M(8)), at(t, r);
}
function hh(e) {
  var t = it(e);
  return [t];
}
function xh(e, t, r) {
  return r == null && (r = M(4)), st(t, r);
}
function dh(e) {
  var t = pr(e), r = e.read_shift(1);
  return [t, r, "b"];
}
function ph(e, t, r) {
  return r == null && (r = M(9)), at(t, r), r.write_shift(1, e.v ? 1 : 0), r;
}
function vh(e) {
  var t = it(e), r = e.read_shift(1);
  return [t, r, "b"];
}
function mh(e, t, r) {
  return r == null && (r = M(5)), st(t, r), r.write_shift(1, e.v ? 1 : 0), r;
}
function gh(e) {
  var t = pr(e), r = e.read_shift(1);
  return [t, r, "e"];
}
function _h(e, t, r) {
  return r == null && (r = M(9)), at(t, r), r.write_shift(1, e.v), r;
}
function Th(e) {
  var t = it(e), r = e.read_shift(1);
  return [t, r, "e"];
}
function Eh(e, t, r) {
  return r == null && (r = M(8)), st(t, r), r.write_shift(1, e.v), r.write_shift(2, 0), r.write_shift(1, 0), r;
}
function wh(e) {
  var t = pr(e), r = e.read_shift(4);
  return [t, r, "s"];
}
function Sh(e, t, r) {
  return r == null && (r = M(12)), at(t, r), r.write_shift(4, t.v), r;
}
function Ah(e) {
  var t = it(e), r = e.read_shift(4);
  return [t, r, "s"];
}
function yh(e, t, r) {
  return r == null && (r = M(8)), st(t, r), r.write_shift(4, t.v), r;
}
function Fh(e) {
  var t = pr(e), r = At(e);
  return [t, r, "n"];
}
function Ch(e, t, r) {
  return r == null && (r = M(16)), at(t, r), rt(e.v, r), r;
}
function Oh(e) {
  var t = it(e), r = At(e);
  return [t, r, "n"];
}
function Dh(e, t, r) {
  return r == null && (r = M(12)), st(t, r), rt(e.v, r), r;
}
function Rh(e) {
  var t = pr(e), r = yi(e);
  return [t, r, "n"];
}
function kh(e, t, r) {
  return r == null && (r = M(12)), at(t, r), Fi(e.v, r), r;
}
function Nh(e) {
  var t = it(e), r = yi(e);
  return [t, r, "n"];
}
function Ih(e, t, r) {
  return r == null && (r = M(8)), st(t, r), Fi(e.v, r), r;
}
function Ph(e) {
  var t = pr(e), r = g0(e);
  return [t, r, "is"];
}
function Lh(e) {
  var t = pr(e), r = Ke(e);
  return [t, r, "str"];
}
function Bh(e, t, r) {
  return r == null && (r = M(12 + 4 * e.v.length)), at(t, r), be(e.v, r), r.length > r.l ? r.slice(0, r.l) : r;
}
function Mh(e) {
  var t = it(e), r = Ke(e);
  return [t, r, "str"];
}
function bh(e, t, r) {
  return r == null && (r = M(8 + 4 * e.v.length)), st(t, r), be(e.v, r), r.length > r.l ? r.slice(0, r.l) : r;
}
function Uh(e, t, r) {
  var n = e.l + t, a = pr(e);
  a.r = r["!row"];
  var i = e.read_shift(1), s = [a, i, "b"];
  if (r.cellFormula) {
    e.l += 2;
    var f = In(e, n - e.l, r);
    s[3] = gt(f, null, a, r.supbooks, r);
  } else
    e.l = n;
  return s;
}
function Hh(e, t, r) {
  var n = e.l + t, a = pr(e);
  a.r = r["!row"];
  var i = e.read_shift(1), s = [a, i, "e"];
  if (r.cellFormula) {
    e.l += 2;
    var f = In(e, n - e.l, r);
    s[3] = gt(f, null, a, r.supbooks, r);
  } else
    e.l = n;
  return s;
}
function Wh(e, t, r) {
  var n = e.l + t, a = pr(e);
  a.r = r["!row"];
  var i = At(e), s = [a, i, "n"];
  if (r.cellFormula) {
    e.l += 2;
    var f = In(e, n - e.l, r);
    s[3] = gt(f, null, a, r.supbooks, r);
  } else
    e.l = n;
  return s;
}
function Vh(e, t, r) {
  var n = e.l + t, a = pr(e);
  a.r = r["!row"];
  var i = Ke(e), s = [a, i, "str"];
  if (r.cellFormula) {
    e.l += 2;
    var f = In(e, n - e.l, r);
    s[3] = gt(f, null, a, r.supbooks, r);
  } else
    e.l = n;
  return s;
}
var Gh = ft, Xh = St;
function jh(e, t) {
  return t == null && (t = M(4)), t.write_shift(4, e), t;
}
function $h(e, t) {
  var r = e.l + t, n = ft(e), a = _0(e), i = Ke(e), s = Ke(e), f = Ke(e);
  e.l = r;
  var c = { rfx: n, relId: a, loc: i, display: f };
  return s && (c.Tooltip = s), c;
}
function zh(e, t) {
  var r = M(50 + 4 * (e[1].Target.length + (e[1].Tooltip || "").length));
  St({ s: Me(e[0]), e: Me(e[0]) }, r), T0("rId" + t, r);
  var n = e[1].Target.indexOf("#"), a = n == -1 ? "" : e[1].Target.slice(n + 1);
  return be(a || "", r), be(e[1].Tooltip || "", r), be("", r), r.slice(0, r.l);
}
function Kh() {
}
function Yh(e, t, r) {
  var n = e.l + t, a = Ci(e), i = e.read_shift(1), s = [a];
  if (s[2] = i, r.cellFormula) {
    var f = M1(e, n - e.l, r);
    s[1] = f;
  } else
    e.l = n;
  return s;
}
function qh(e, t, r) {
  var n = e.l + t, a = ft(e), i = [a];
  if (r.cellFormula) {
    var s = U1(e, n - e.l, r);
    i[1] = s, e.l = n;
  } else
    e.l = n;
  return i;
}
function Jh(e, t, r) {
  r == null && (r = M(18));
  var n = Pn(e, t);
  r.write_shift(-4, e), r.write_shift(-4, e), r.write_shift(4, (n.width || 10) * 256), r.write_shift(4, 0);
  var a = 0;
  return t.hidden && (a |= 1), typeof n.width == "number" && (a |= 2), t.level && (a |= t.level << 8), r.write_shift(2, a), r;
}
var cs = ["left", "right", "top", "bottom", "header", "footer"];
function Zh(e) {
  var t = {};
  return cs.forEach(function(r) {
    t[r] = At(e);
  }), t;
}
function Qh(e, t) {
  return t == null && (t = M(6 * 8)), ls(e), cs.forEach(function(r) {
    rt(e[r], t);
  }), t;
}
function ex(e) {
  var t = e.read_shift(2);
  return e.l += 28, { RTL: t & 32 };
}
function rx(e, t, r) {
  r == null && (r = M(30));
  var n = 924;
  return (((t || {}).Views || [])[0] || {}).RTL && (n |= 32), r.write_shift(2, n), r.write_shift(4, 0), r.write_shift(4, 0), r.write_shift(4, 0), r.write_shift(1, 0), r.write_shift(1, 0), r.write_shift(2, 0), r.write_shift(2, 100), r.write_shift(2, 0), r.write_shift(2, 0), r.write_shift(2, 0), r.write_shift(4, 0), r;
}
function tx(e) {
  var t = M(24);
  return t.write_shift(4, 4), t.write_shift(4, 1), St(e, t), t;
}
function nx(e, t) {
  return t == null && (t = M(16 * 4 + 2)), t.write_shift(2, e.password ? ji(e.password) : 0), t.write_shift(4, 1), [
    ["objects", !1],
    ["scenarios", !1],
    ["formatCells", !0],
    ["formatColumns", !0],
    ["formatRows", !0],
    ["insertColumns", !0],
    ["insertRows", !0],
    ["insertHyperlinks", !0],
    ["deleteColumns", !0],
    ["deleteRows", !0],
    ["selectLockedCells", !1],
    ["sort", !0],
    ["autoFilter", !0],
    ["pivotTables", !0],
    ["selectUnlockedCells", !1]
  ].forEach(function(r) {
    r[1] ? t.write_shift(4, e[r[0]] != null && !e[r[0]] ? 1 : 0) : t.write_shift(4, e[r[0]] != null && e[r[0]] ? 0 : 1);
  }), t;
}
function ax() {
}
function ix() {
}
function sx(e, t, r, n, a, i, s) {
  if (t.v === void 0)
    return !1;
  var f = "";
  switch (t.t) {
    case "b":
      f = t.v ? "1" : "0";
      break;
    case "d":
      t = tr(t), t.z = t.z || Oe[14], t.v = rr(Ze(t.v)), t.t = "n";
      break;
    case "n":
    case "e":
      f = "" + t.v;
      break;
    default:
      f = t.v;
      break;
  }
  var c = { r, c: n };
  switch (c.s = jr(a.cellXfs, t, a), t.l && i["!links"].push([_e(c), t.l]), t.c && i["!comments"].push([_e(c), t.c]), t.t) {
    case "s":
    case "str":
      return a.bookSST ? (f = F0(a.Strings, t.v, a.revStrings), c.t = "s", c.v = f, s ? H(e, 18, yh(t, c)) : H(e, 7, Sh(t, c))) : (c.t = "str", s ? H(e, 17, bh(t, c)) : H(e, 6, Bh(t, c))), !0;
    case "n":
      return t.v == (t.v | 0) && t.v > -1e3 && t.v < 1e3 ? s ? H(e, 13, Ih(t, c)) : H(e, 2, kh(t, c)) : s ? H(e, 16, Dh(t, c)) : H(e, 5, Ch(t, c)), !0;
    case "b":
      return c.t = "b", s ? H(e, 15, mh(t, c)) : H(e, 4, ph(t, c)), !0;
    case "e":
      return c.t = "e", s ? H(e, 14, Eh(t, c)) : H(e, 3, _h(t, c)), !0;
  }
  return s ? H(e, 12, xh(t, c)) : H(e, 1, uh(t, c)), !0;
}
function fx(e, t, r, n) {
  var a = Se(t["!ref"] || "A1"), i, s = "", f = [];
  H(e, 145);
  var c = Array.isArray(t), l = a.e.r;
  t["!rows"] && (l = Math.max(a.e.r, t["!rows"].length - 1));
  for (var o = a.s.r; o <= l; ++o) {
    s = Xe(o), ah(e, t, a, o);
    var u = !1;
    if (o <= a.e.r)
      for (var h = a.s.c; h <= a.e.c; ++h) {
        o === a.s.r && (f[h] = ze(h)), i = f[h] + s;
        var d = c ? (t[o] || [])[h] : t[i];
        if (!d) {
          u = !1;
          continue;
        }
        u = sx(e, d, o, h, n, t, u);
      }
  }
  H(e, 146);
}
function lx(e, t) {
  !t || !t["!merges"] || (H(e, 177, jh(t["!merges"].length)), t["!merges"].forEach(function(r) {
    H(e, 176, Xh(r));
  }), H(e, 178));
}
function ox(e, t) {
  !t || !t["!cols"] || (H(e, 390), t["!cols"].forEach(function(r, n) {
    r && H(e, 60, Jh(n, r));
  }), H(e, 391));
}
function cx(e, t) {
  !t || !t["!ref"] || (H(e, 648), H(e, 649, tx(Se(t["!ref"]))), H(e, 650));
}
function ux(e, t, r) {
  t["!links"].forEach(function(n) {
    if (!!n[1].Target) {
      var a = me(r, -1, n[1].Target.replace(/#.*$/, ""), xe.HLINK);
      H(e, 494, zh(n, a));
    }
  }), delete t["!links"];
}
function hx(e, t, r, n) {
  if (t["!comments"].length > 0) {
    var a = me(n, -1, "../drawings/vmlDrawing" + (r + 1) + ".vml", xe.VML);
    H(e, 551, T0("rId" + a)), t["!legacy"] = a;
  }
}
function xx(e, t, r, n) {
  if (!!t["!autofilter"]) {
    var a = t["!autofilter"], i = typeof a.ref == "string" ? a.ref : ke(a.ref);
    r.Workbook || (r.Workbook = { Sheets: [] }), r.Workbook.Names || (r.Workbook.Names = []);
    var s = r.Workbook.Names, f = cr(i);
    f.s.r == f.e.r && (f.e.r = cr(t["!ref"]).e.r, i = ke(f));
    for (var c = 0; c < s.length; ++c) {
      var l = s[c];
      if (l.Name == "_xlnm._FilterDatabase" && l.Sheet == n) {
        l.Ref = "'" + r.SheetNames[n] + "'!" + i;
        break;
      }
    }
    c == s.length && s.push({ Name: "_xlnm._FilterDatabase", Sheet: n, Ref: "'" + r.SheetNames[n] + "'!" + i }), H(e, 161, St(Se(i))), H(e, 162);
  }
}
function dx(e, t, r) {
  H(e, 133), H(e, 137, rx(t, r)), H(e, 138), H(e, 134);
}
function px(e, t) {
  !t["!protect"] || H(e, 535, nx(t["!protect"]));
}
function vx(e, t, r, n) {
  var a = er(), i = r.SheetNames[e], s = r.Sheets[i] || {}, f = i;
  try {
    r && r.Workbook && (f = r.Workbook.Sheets[e].CodeName || f);
  } catch {
  }
  var c = Se(s["!ref"] || "A1");
  if (c.e.c > 16383 || c.e.r > 1048575) {
    if (t.WTF)
      throw new Error("Range " + (s["!ref"] || "A1") + " exceeds format limit A1:XFD1048576");
    c.e.c = Math.min(c.e.c, 16383), c.e.r = Math.min(c.e.c, 1048575);
  }
  return s["!links"] = [], s["!comments"] = [], H(a, 129), (r.vbaraw || s["!outline"]) && H(a, 147, oh(f, s["!outline"])), H(a, 148, sh(c)), dx(a, s, r.Workbook), ox(a, s), fx(a, s, e, t), px(a, s), xx(a, s, r, e), lx(a, s), ux(a, s, n), s["!margins"] && H(a, 476, Qh(s["!margins"])), (!t || t.ignoreEC || t.ignoreEC == null) && cx(a, s), hx(a, s, e, n), H(a, 130), a.end();
}
function mx(e, t) {
  e.l += 10;
  var r = Ke(e);
  return { name: r };
}
var gx = [
  ["allowRefreshQuery", !1, "bool"],
  ["autoCompressPictures", !0, "bool"],
  ["backupFile", !1, "bool"],
  ["checkCompatibility", !1, "bool"],
  ["CodeName", ""],
  ["date1904", !1, "bool"],
  ["defaultThemeVersion", 0, "int"],
  ["filterPrivacy", !1, "bool"],
  ["hidePivotFieldList", !1, "bool"],
  ["promptedSolutions", !1, "bool"],
  ["publishItems", !1, "bool"],
  ["refreshAllConnections", !1, "bool"],
  ["saveExternalLinkValues", !0, "bool"],
  ["showBorderUnselectedTables", !0, "bool"],
  ["showInkAnnotation", !0, "bool"],
  ["showObjects", "all"],
  ["showPivotChartFilter", !1, "bool"],
  ["updateLinks", "userSet"]
];
function _x(e) {
  return !e.Workbook || !e.Workbook.WBProps ? "false" : Yl(e.Workbook.WBProps.date1904) ? "true" : "false";
}
var Tx = /* @__PURE__ */ "][*?/\\".split("");
function us(e, t) {
  if (e.length > 31) {
    if (t)
      return !1;
    throw new Error("Sheet names cannot exceed 31 chars");
  }
  var r = !0;
  return Tx.forEach(function(n) {
    if (e.indexOf(n) != -1) {
      if (!t)
        throw new Error("Sheet name cannot contain : \\ / ? * [ ]");
      r = !1;
    }
  }), r;
}
function Ex(e, t, r) {
  e.forEach(function(n, a) {
    us(n);
    for (var i = 0; i < a; ++i)
      if (n == e[i])
        throw new Error("Duplicate Sheet Name: " + n);
    if (r) {
      var s = t && t[a] && t[a].CodeName || n;
      if (s.charCodeAt(0) == 95 && s.length > 22)
        throw new Error("Bad Code Name: Worksheet" + s);
    }
  });
}
function wx(e) {
  if (!e || !e.SheetNames || !e.Sheets)
    throw new Error("Invalid Workbook");
  if (!e.SheetNames.length)
    throw new Error("Workbook is empty");
  var t = e.Workbook && e.Workbook.Sheets || [];
  Ex(e.SheetNames, t, !!e.vbaraw);
  for (var r = 0; r < e.SheetNames.length; ++r)
    X1(e.Sheets[e.SheetNames[r]], e.SheetNames[r], r);
}
function hs(e) {
  var t = [Ne];
  t[t.length] = q("workbook", null, {
    xmlns: Et[0],
    "xmlns:r": Be.r
  });
  var r = e.Workbook && (e.Workbook.Names || []).length > 0, n = { codeName: "ThisWorkbook" };
  e.Workbook && e.Workbook.WBProps && (gx.forEach(function(f) {
    e.Workbook.WBProps[f[0]] != null && e.Workbook.WBProps[f[0]] != f[1] && (n[f[0]] = e.Workbook.WBProps[f[0]]);
  }), e.Workbook.WBProps.CodeName && (n.codeName = e.Workbook.WBProps.CodeName, delete n.CodeName)), t[t.length] = q("workbookPr", null, n);
  var a = e.Workbook && e.Workbook.Sheets || [], i = 0;
  if (a && a[0] && !!a[0].Hidden) {
    for (t[t.length] = "<bookViews>", i = 0; i != e.SheetNames.length && !(!a[i] || !a[i].Hidden); ++i)
      ;
    i == e.SheetNames.length && (i = 0), t[t.length] = '<workbookView firstSheet="' + i + '" activeTab="' + i + '"/>', t[t.length] = "</bookViews>";
  }
  for (t[t.length] = "<sheets>", i = 0; i != e.SheetNames.length; ++i) {
    var s = { name: ge(e.SheetNames[i].slice(0, 31)) };
    if (s.sheetId = "" + (i + 1), s["r:id"] = "rId" + (i + 1), a[i])
      switch (a[i].Hidden) {
        case 1:
          s.state = "hidden";
          break;
        case 2:
          s.state = "veryHidden";
          break;
      }
    t[t.length] = q("sheet", null, s);
  }
  return t[t.length] = "</sheets>", r && (t[t.length] = "<definedNames>", e.Workbook && e.Workbook.Names && e.Workbook.Names.forEach(function(f) {
    var c = { name: f.Name };
    f.Comment && (c.comment = f.Comment), f.Sheet != null && (c.localSheetId = "" + f.Sheet), f.Hidden && (c.hidden = "1"), f.Ref && (t[t.length] = q("definedName", ge(f.Ref), c));
  }), t[t.length] = "</definedNames>"), t.length > 2 && (t[t.length] = "</workbook>", t[1] = t[1].replace("/>", ">")), t.join("");
}
function Sx(e, t) {
  var r = {};
  return r.Hidden = e.read_shift(4), r.iTabID = e.read_shift(4), r.strRelID = Qn(e), r.name = Ke(e), r;
}
function Ax(e, t) {
  return t || (t = M(127)), t.write_shift(4, e.Hidden), t.write_shift(4, e.iTabID), T0(e.strRelID, t), be(e.name.slice(0, 31), t), t.length > t.l ? t.slice(0, t.l) : t;
}
function yx(e, t) {
  var r = {}, n = e.read_shift(4);
  r.defaultThemeVersion = e.read_shift(4);
  var a = t > 8 ? Ke(e) : "";
  return a.length > 0 && (r.CodeName = a), r.autoCompressPictures = !!(n & 65536), r.backupFile = !!(n & 64), r.checkCompatibility = !!(n & 4096), r.date1904 = !!(n & 1), r.filterPrivacy = !!(n & 8), r.hidePivotFieldList = !!(n & 1024), r.promptedSolutions = !!(n & 16), r.publishItems = !!(n & 2048), r.refreshAllConnections = !!(n & 262144), r.saveExternalLinkValues = !!(n & 128), r.showBorderUnselectedTables = !!(n & 4), r.showInkAnnotation = !!(n & 32), r.showObjects = ["all", "placeholders", "none"][n >> 13 & 3], r.showPivotChartFilter = !!(n & 32768), r.updateLinks = ["userSet", "never", "always"][n >> 8 & 3], r;
}
function Fx(e, t) {
  t || (t = M(72));
  var r = 0;
  return e && e.filterPrivacy && (r |= 8), t.write_shift(4, r), t.write_shift(4, 0), Ai(e && e.CodeName || "ThisWorkbook", t), t.slice(0, t.l);
}
function Cx(e, t, r) {
  var n = e.l + t;
  e.l += 4, e.l += 1;
  var a = e.read_shift(4), i = _o(e), s = b1(e, 0, r), f = _0(e);
  e.l = n;
  var c = { Name: i, Ptg: s };
  return a < 268435455 && (c.Sheet = a), f && (c.Comment = f), c;
}
function Ox(e, t) {
  H(e, 143);
  for (var r = 0; r != t.SheetNames.length; ++r) {
    var n = t.Workbook && t.Workbook.Sheets && t.Workbook.Sheets[r] && t.Workbook.Sheets[r].Hidden || 0, a = { Hidden: n, iTabID: r + 1, strRelID: "rId" + (r + 1), name: t.SheetNames[r] };
    H(e, 156, Ax(a));
  }
  H(e, 144);
}
function Dx(e, t) {
  t || (t = M(127));
  for (var r = 0; r != 4; ++r)
    t.write_shift(4, 0);
  return be("SheetJS", t), be(hn.version, t), be(hn.version, t), be("7262", t), t.length > t.l ? t.slice(0, t.l) : t;
}
function Rx(e, t) {
  t || (t = M(29)), t.write_shift(-4, 0), t.write_shift(-4, 460), t.write_shift(4, 28800), t.write_shift(4, 17600), t.write_shift(4, 500), t.write_shift(4, e), t.write_shift(4, e);
  var r = 120;
  return t.write_shift(1, r), t.length > t.l ? t.slice(0, t.l) : t;
}
function kx(e, t) {
  if (!(!t.Workbook || !t.Workbook.Sheets)) {
    for (var r = t.Workbook.Sheets, n = 0, a = -1, i = -1; n < r.length; ++n)
      !r[n] || !r[n].Hidden && a == -1 ? a = n : r[n].Hidden == 1 && i == -1 && (i = n);
    i > a || (H(e, 135), H(e, 158, Rx(a)), H(e, 136));
  }
}
function Nx(e, t) {
  var r = er();
  return H(r, 131), H(r, 128, Dx()), H(r, 153, Fx(e.Workbook && e.Workbook.WBProps || null)), kx(r, e), Ox(r, e), H(r, 132), r.end();
}
function Ix(e, t, r) {
  return (t.slice(-4) === ".bin" ? Nx : hs)(e);
}
function Px(e, t, r, n, a) {
  return (t.slice(-4) === ".bin" ? vx : os)(e, r, n, a);
}
function Lx(e, t, r) {
  return (t.slice(-4) === ".bin" ? Qc : Ki)(e, r);
}
function Bx(e, t, r) {
  return (t.slice(-4) === ".bin" ? Fc : Xi)(e, r);
}
function Mx(e, t, r) {
  return (t.slice(-4) === ".bin" ? pu : Qi)(e);
}
function bx(e) {
  return (e.slice(-4) === ".bin" ? fu : Ji)();
}
function Ux(e, t) {
  var r = [];
  return e.Props && r.push(Lo(e.Props, t)), e.Custprops && r.push(Bo(e.Props, e.Custprops)), r.join("");
}
function Hx() {
  return "";
}
function Wx(e, t) {
  var r = ['<Style ss:ID="Default" ss:Name="Normal"><NumberFormat/></Style>'];
  return t.cellXfs.forEach(function(n, a) {
    var i = [];
    i.push(q("NumberFormat", null, { "ss:Format": ge(Oe[n.numFmtId]) }));
    var s = { "ss:ID": "s" + (21 + a) };
    r.push(q("Style", i.join(""), s));
  }), q("Styles", r.join(""));
}
function xs(e) {
  return q("NamedRange", null, { "ss:Name": e.Name, "ss:RefersTo": "=" + A0(e.Ref, { r: 0, c: 0 }) });
}
function Vx(e) {
  if (!((e || {}).Workbook || {}).Names)
    return "";
  for (var t = e.Workbook.Names, r = [], n = 0; n < t.length; ++n) {
    var a = t[n];
    a.Sheet == null && (a.Name.match(/^_xlfn\./) || r.push(xs(a)));
  }
  return q("Names", r.join(""));
}
function Gx(e, t, r, n) {
  if (!e || !((n || {}).Workbook || {}).Names)
    return "";
  for (var a = n.Workbook.Names, i = [], s = 0; s < a.length; ++s) {
    var f = a[s];
    f.Sheet == r && (f.Name.match(/^_xlfn\./) || i.push(xs(f)));
  }
  return i.join("");
}
function Xx(e, t, r, n) {
  if (!e)
    return "";
  var a = [];
  if (e["!margins"] && (a.push("<PageSetup>"), e["!margins"].header && a.push(q("Header", null, { "x:Margin": e["!margins"].header })), e["!margins"].footer && a.push(q("Footer", null, { "x:Margin": e["!margins"].footer })), a.push(q("PageMargins", null, {
    "x:Bottom": e["!margins"].bottom || "0.75",
    "x:Left": e["!margins"].left || "0.7",
    "x:Right": e["!margins"].right || "0.7",
    "x:Top": e["!margins"].top || "0.75"
  })), a.push("</PageSetup>")), n && n.Workbook && n.Workbook.Sheets && n.Workbook.Sheets[r])
    if (n.Workbook.Sheets[r].Hidden)
      a.push(q("Visible", n.Workbook.Sheets[r].Hidden == 1 ? "SheetHidden" : "SheetVeryHidden", {}));
    else {
      for (var i = 0; i < r && !(n.Workbook.Sheets[i] && !n.Workbook.Sheets[i].Hidden); ++i)
        ;
      i == r && a.push("<Selected/>");
    }
  return ((((n || {}).Workbook || {}).Views || [])[0] || {}).RTL && a.push("<DisplayRightToLeft/>"), e["!protect"] && (a.push(Ge("ProtectContents", "True")), e["!protect"].objects && a.push(Ge("ProtectObjects", "True")), e["!protect"].scenarios && a.push(Ge("ProtectScenarios", "True")), e["!protect"].selectLockedCells != null && !e["!protect"].selectLockedCells ? a.push(Ge("EnableSelection", "NoSelection")) : e["!protect"].selectUnlockedCells != null && !e["!protect"].selectUnlockedCells && a.push(Ge("EnableSelection", "UnlockedCells")), [
    ["formatCells", "AllowFormatCells"],
    ["formatColumns", "AllowSizeCols"],
    ["formatRows", "AllowSizeRows"],
    ["insertColumns", "AllowInsertCols"],
    ["insertRows", "AllowInsertRows"],
    ["insertHyperlinks", "AllowInsertHyperlinks"],
    ["deleteColumns", "AllowDeleteCols"],
    ["deleteRows", "AllowDeleteRows"],
    ["sort", "AllowSort"],
    ["autoFilter", "AllowFilter"],
    ["pivotTables", "AllowUsePivotTables"]
  ].forEach(function(s) {
    e["!protect"][s[0]] && a.push("<" + s[1] + "/>");
  })), a.length == 0 ? "" : q("WorksheetOptions", a.join(""), { xmlns: fr.x });
}
function jx(e) {
  return e.map(function(t) {
    var r = Kl(t.t || ""), n = q("ss:Data", r, { xmlns: "http://www.w3.org/TR/REC-html40" });
    return q("Comment", n, { "ss:Author": t.a });
  }).join("");
}
function $x(e, t, r, n, a, i, s) {
  if (!e || e.v == null && e.f == null)
    return "";
  var f = {};
  if (e.f && (f["ss:Formula"] = "=" + ge(A0(e.f, s))), e.F && e.F.slice(0, t.length) == t) {
    var c = Me(e.F.slice(t.length + 1));
    f["ss:ArrayRange"] = "RC:R" + (c.r == s.r ? "" : "[" + (c.r - s.r) + "]") + "C" + (c.c == s.c ? "" : "[" + (c.c - s.c) + "]");
  }
  if (e.l && e.l.Target && (f["ss:HRef"] = ge(e.l.Target), e.l.Tooltip && (f["x:HRefScreenTip"] = ge(e.l.Tooltip))), r["!merges"])
    for (var l = r["!merges"], o = 0; o != l.length; ++o)
      l[o].s.c != s.c || l[o].s.r != s.r || (l[o].e.c > l[o].s.c && (f["ss:MergeAcross"] = l[o].e.c - l[o].s.c), l[o].e.r > l[o].s.r && (f["ss:MergeDown"] = l[o].e.r - l[o].s.r));
  var u = "", h = "";
  switch (e.t) {
    case "z":
      if (!n.sheetStubs)
        return "";
      break;
    case "n":
      u = "Number", h = String(e.v);
      break;
    case "b":
      u = "Boolean", h = e.v ? "1" : "0";
      break;
    case "e":
      u = "Error", h = zt[e.v];
      break;
    case "d":
      u = "DateTime", h = new Date(e.v).toISOString(), e.z == null && (e.z = e.z || Oe[14]);
      break;
    case "s":
      u = "String", h = zl(e.v || "");
      break;
  }
  var d = jr(n.cellXfs, e, n);
  f["ss:StyleID"] = "s" + (21 + d), f["ss:Index"] = s.c + 1;
  var g = e.v != null ? h : "", x = e.t == "z" ? "" : '<Data ss:Type="' + u + '">' + g + "</Data>";
  return (e.c || []).length > 0 && (x += jx(e.c)), q("Cell", x, f);
}
function zx(e, t) {
  var r = '<Row ss:Index="' + (e + 1) + '"';
  return t && (t.hpt && !t.hpx && (t.hpx = zi(t.hpt)), t.hpx && (r += ' ss:AutoFitHeight="0" ss:Height="' + t.hpx + '"'), t.hidden && (r += ' ss:Hidden="1"')), r + ">";
}
function Kx(e, t, r, n) {
  if (!e["!ref"])
    return "";
  var a = Se(e["!ref"]), i = e["!merges"] || [], s = 0, f = [];
  e["!cols"] && e["!cols"].forEach(function(m, O) {
    w0(m);
    var A = !!m.width, y = Pn(O, m), R = { "ss:Index": O + 1 };
    A && (R["ss:Width"] = En(y.width)), m.hidden && (R["ss:Hidden"] = "1"), f.push(q("Column", null, R));
  });
  for (var c = Array.isArray(e), l = a.s.r; l <= a.e.r; ++l) {
    for (var o = [zx(l, (e["!rows"] || [])[l])], u = a.s.c; u <= a.e.c; ++u) {
      var h = !1;
      for (s = 0; s != i.length; ++s)
        if (!(i[s].s.c > u) && !(i[s].s.r > l) && !(i[s].e.c < u) && !(i[s].e.r < l)) {
          (i[s].s.c != u || i[s].s.r != l) && (h = !0);
          break;
        }
      if (!h) {
        var d = { r: l, c: u }, g = _e(d), x = c ? (e[l] || [])[u] : e[g];
        o.push($x(x, g, e, t, r, n, d));
      }
    }
    o.push("</Row>"), o.length > 2 && f.push(o.join(""));
  }
  return f.join("");
}
function Yx(e, t, r) {
  var n = [], a = r.SheetNames[e], i = r.Sheets[a], s = i ? Gx(i, t, e, r) : "";
  return s.length > 0 && n.push("<Names>" + s + "</Names>"), s = i ? Kx(i, t, e, r) : "", s.length > 0 && n.push("<Table>" + s + "</Table>"), n.push(Xx(i, t, e, r)), n.join("");
}
function qx(e, t) {
  t || (t = {}), e.SSF || (e.SSF = tr(Oe)), e.SSF && (Dn(), On(e.SSF), t.revssf = Rn(e.SSF), t.revssf[e.SSF[65535]] = 0, t.ssf = e.SSF, t.cellXfs = [], jr(t.cellXfs, {}, { revssf: { General: 0 } }));
  var r = [];
  r.push(Ux(e, t)), r.push(Hx()), r.push(""), r.push("");
  for (var n = 0; n < e.SheetNames.length; ++n)
    r.push(q("Worksheet", Yx(n, t, e), { "ss:Name": ge(e.SheetNames[n]) }));
  return r[2] = Wx(e, t), r[3] = Vx(e), Ne + q("Workbook", r.join(""), {
    xmlns: fr.ss,
    "xmlns:o": fr.o,
    "xmlns:x": fr.x,
    "xmlns:ss": fr.ss,
    "xmlns:dt": fr.dt,
    "xmlns:html": fr.html
  });
}
var zn = {
  SI: "e0859ff2f94f6810ab9108002b27b3d9",
  DSI: "02d5cdd59c2e1b10939708002b2cf9ae",
  UDI: "05d5cdd59c2e1b10939708002b2cf9ae"
};
function Jx(e, t) {
  var r = [], n = [], a = [], i = 0, s, f = ra(da, "n"), c = ra(pa, "n");
  if (e.Props)
    for (s = je(e.Props), i = 0; i < s.length; ++i)
      (Object.prototype.hasOwnProperty.call(f, s[i]) ? r : Object.prototype.hasOwnProperty.call(c, s[i]) ? n : a).push([s[i], e.Props[s[i]]]);
  if (e.Custprops)
    for (s = je(e.Custprops), i = 0; i < s.length; ++i)
      Object.prototype.hasOwnProperty.call(e.Props || {}, s[i]) || (Object.prototype.hasOwnProperty.call(f, s[i]) ? r : Object.prototype.hasOwnProperty.call(c, s[i]) ? n : a).push([s[i], e.Custprops[s[i]]]);
  var l = [];
  for (i = 0; i < a.length; ++i)
    Mi.indexOf(a[i][0]) > -1 || Pi.indexOf(a[i][0]) > -1 || a[i][1] != null && l.push(a[i]);
  n.length && Ee.utils.cfb_add(t, "/SummaryInformation", Ta(n, zn.SI, c, pa)), (r.length || l.length) && Ee.utils.cfb_add(t, "/DocumentSummaryInformation", Ta(r, zn.DSI, f, da, l.length ? l : null, zn.UDI));
}
function Zx(e, t) {
  var r = t || {}, n = Ee.utils.cfb_new({ root: "R" }), a = "/Workbook";
  switch (r.bookType || "xls") {
    case "xls":
      r.bookType = "biff8";
    case "xla":
      r.bookType || (r.bookType = "xla");
    case "biff8":
      a = "/Workbook", r.biff = 8;
      break;
    case "biff5":
      a = "/Book", r.biff = 5;
      break;
    default:
      throw new Error("invalid type " + r.bookType + " for XLS CFB");
  }
  return Ee.utils.cfb_add(n, a, ds(e, r)), r.biff == 8 && (e.Props || e.Custprops) && Jx(e, n), r.biff == 8 && e.vbaraw && vu(n, Ee.read(e.vbaraw, { type: typeof e.vbaraw == "string" ? "binary" : "buffer" })), n;
}
var Qx = {
  0: { f: th },
  1: { f: ch },
  2: { f: Rh },
  3: { f: gh },
  4: { f: dh },
  5: { f: Fh },
  6: { f: Lh },
  7: { f: wh },
  8: { f: Vh },
  9: { f: Wh },
  10: { f: Uh },
  11: { f: Hh },
  12: { f: hh },
  13: { f: Nh },
  14: { f: Th },
  15: { f: vh },
  16: { f: Oh },
  17: { f: Mh },
  18: { f: Ah },
  19: { f: g0 },
  20: {},
  21: {},
  22: {},
  23: {},
  24: {},
  25: {},
  26: {},
  27: {},
  28: {},
  29: {},
  30: {},
  31: {},
  32: {},
  33: {},
  34: {},
  35: { T: 1 },
  36: { T: -1 },
  37: { T: 1 },
  38: { T: -1 },
  39: { f: Cx },
  40: {},
  42: {},
  43: { f: Lc },
  44: { f: Ic },
  45: { f: bc },
  46: { f: Hc },
  47: { f: Uc },
  48: {},
  49: { f: uo },
  50: {},
  51: { f: tu },
  52: { T: 1 },
  53: { T: -1 },
  54: { T: 1 },
  55: { T: -1 },
  56: { T: 1 },
  57: { T: -1 },
  58: {},
  59: {},
  60: { f: xc },
  62: { f: Ph },
  63: { f: lu },
  64: { f: ax },
  65: {},
  66: {},
  67: {},
  68: {},
  69: {},
  70: {},
  128: {},
  129: { T: 1 },
  130: { T: -1 },
  131: { T: 1, f: yr, p: 0 },
  132: { T: -1 },
  133: { T: 1 },
  134: { T: -1 },
  135: { T: 1 },
  136: { T: -1 },
  137: { T: 1, f: ex },
  138: { T: -1 },
  139: { T: 1 },
  140: { T: -1 },
  141: { T: 1 },
  142: { T: -1 },
  143: { T: 1 },
  144: { T: -1 },
  145: { T: 1 },
  146: { T: -1 },
  147: { f: lh },
  148: { f: ih, p: 16 },
  151: { f: Kh },
  152: {},
  153: { f: yx },
  154: {},
  155: {},
  156: { f: Sx },
  157: {},
  158: {},
  159: { T: 1, f: Sc },
  160: { T: -1 },
  161: { T: 1, f: ft },
  162: { T: -1 },
  163: { T: 1 },
  164: { T: -1 },
  165: { T: 1 },
  166: { T: -1 },
  167: {},
  168: {},
  169: {},
  170: {},
  171: {},
  172: { T: 1 },
  173: { T: -1 },
  174: {},
  175: {},
  176: { f: Gh },
  177: { T: 1 },
  178: { T: -1 },
  179: { T: 1 },
  180: { T: -1 },
  181: { T: 1 },
  182: { T: -1 },
  183: { T: 1 },
  184: { T: -1 },
  185: { T: 1 },
  186: { T: -1 },
  187: { T: 1 },
  188: { T: -1 },
  189: { T: 1 },
  190: { T: -1 },
  191: { T: 1 },
  192: { T: -1 },
  193: { T: 1 },
  194: { T: -1 },
  195: { T: 1 },
  196: { T: -1 },
  197: { T: 1 },
  198: { T: -1 },
  199: { T: 1 },
  200: { T: -1 },
  201: { T: 1 },
  202: { T: -1 },
  203: { T: 1 },
  204: { T: -1 },
  205: { T: 1 },
  206: { T: -1 },
  207: { T: 1 },
  208: { T: -1 },
  209: { T: 1 },
  210: { T: -1 },
  211: { T: 1 },
  212: { T: -1 },
  213: { T: 1 },
  214: { T: -1 },
  215: { T: 1 },
  216: { T: -1 },
  217: { T: 1 },
  218: { T: -1 },
  219: { T: 1 },
  220: { T: -1 },
  221: { T: 1 },
  222: { T: -1 },
  223: { T: 1 },
  224: { T: -1 },
  225: { T: 1 },
  226: { T: -1 },
  227: { T: 1 },
  228: { T: -1 },
  229: { T: 1 },
  230: { T: -1 },
  231: { T: 1 },
  232: { T: -1 },
  233: { T: 1 },
  234: { T: -1 },
  235: { T: 1 },
  236: { T: -1 },
  237: { T: 1 },
  238: { T: -1 },
  239: { T: 1 },
  240: { T: -1 },
  241: { T: 1 },
  242: { T: -1 },
  243: { T: 1 },
  244: { T: -1 },
  245: { T: 1 },
  246: { T: -1 },
  247: { T: 1 },
  248: { T: -1 },
  249: { T: 1 },
  250: { T: -1 },
  251: { T: 1 },
  252: { T: -1 },
  253: { T: 1 },
  254: { T: -1 },
  255: { T: 1 },
  256: { T: -1 },
  257: { T: 1 },
  258: { T: -1 },
  259: { T: 1 },
  260: { T: -1 },
  261: { T: 1 },
  262: { T: -1 },
  263: { T: 1 },
  264: { T: -1 },
  265: { T: 1 },
  266: { T: -1 },
  267: { T: 1 },
  268: { T: -1 },
  269: { T: 1 },
  270: { T: -1 },
  271: { T: 1 },
  272: { T: -1 },
  273: { T: 1 },
  274: { T: -1 },
  275: { T: 1 },
  276: { T: -1 },
  277: {},
  278: { T: 1 },
  279: { T: -1 },
  280: { T: 1 },
  281: { T: -1 },
  282: { T: 1 },
  283: { T: 1 },
  284: { T: -1 },
  285: { T: 1 },
  286: { T: -1 },
  287: { T: 1 },
  288: { T: -1 },
  289: { T: 1 },
  290: { T: -1 },
  291: { T: 1 },
  292: { T: -1 },
  293: { T: 1 },
  294: { T: -1 },
  295: { T: 1 },
  296: { T: -1 },
  297: { T: 1 },
  298: { T: -1 },
  299: { T: 1 },
  300: { T: -1 },
  301: { T: 1 },
  302: { T: -1 },
  303: { T: 1 },
  304: { T: -1 },
  305: { T: 1 },
  306: { T: -1 },
  307: { T: 1 },
  308: { T: -1 },
  309: { T: 1 },
  310: { T: -1 },
  311: { T: 1 },
  312: { T: -1 },
  313: { T: -1 },
  314: { T: 1 },
  315: { T: -1 },
  316: { T: 1 },
  317: { T: -1 },
  318: { T: 1 },
  319: { T: -1 },
  320: { T: 1 },
  321: { T: -1 },
  322: { T: 1 },
  323: { T: -1 },
  324: { T: 1 },
  325: { T: -1 },
  326: { T: 1 },
  327: { T: -1 },
  328: { T: 1 },
  329: { T: -1 },
  330: { T: 1 },
  331: { T: -1 },
  332: { T: 1 },
  333: { T: -1 },
  334: { T: 1 },
  335: { f: eu },
  336: { T: -1 },
  337: { f: iu, T: 1 },
  338: { T: -1 },
  339: { T: 1 },
  340: { T: -1 },
  341: { T: 1 },
  342: { T: -1 },
  343: { T: 1 },
  344: { T: -1 },
  345: { T: 1 },
  346: { T: -1 },
  347: { T: 1 },
  348: { T: -1 },
  349: { T: 1 },
  350: { T: -1 },
  351: {},
  352: {},
  353: { T: 1 },
  354: { T: -1 },
  355: { f: Qn },
  357: {},
  358: {},
  359: {},
  360: { T: 1 },
  361: {},
  362: { f: fc },
  363: {},
  364: {},
  366: {},
  367: {},
  368: {},
  369: {},
  370: {},
  371: {},
  372: { T: 1 },
  373: { T: -1 },
  374: { T: 1 },
  375: { T: -1 },
  376: { T: 1 },
  377: { T: -1 },
  378: { T: 1 },
  379: { T: -1 },
  380: { T: 1 },
  381: { T: -1 },
  382: { T: 1 },
  383: { T: -1 },
  384: { T: 1 },
  385: { T: -1 },
  386: { T: 1 },
  387: { T: -1 },
  388: { T: 1 },
  389: { T: -1 },
  390: { T: 1 },
  391: { T: -1 },
  392: { T: 1 },
  393: { T: -1 },
  394: { T: 1 },
  395: { T: -1 },
  396: {},
  397: {},
  398: {},
  399: {},
  400: {},
  401: { T: 1 },
  403: {},
  404: {},
  405: {},
  406: {},
  407: {},
  408: {},
  409: {},
  410: {},
  411: {},
  412: {},
  413: {},
  414: {},
  415: {},
  416: {},
  417: {},
  418: {},
  419: {},
  420: {},
  421: {},
  422: { T: 1 },
  423: { T: 1 },
  424: { T: -1 },
  425: { T: -1 },
  426: { f: Yh },
  427: { f: qh },
  428: {},
  429: { T: 1 },
  430: { T: -1 },
  431: { T: 1 },
  432: { T: -1 },
  433: { T: 1 },
  434: { T: -1 },
  435: { T: 1 },
  436: { T: -1 },
  437: { T: 1 },
  438: { T: -1 },
  439: { T: 1 },
  440: { T: -1 },
  441: { T: 1 },
  442: { T: -1 },
  443: { T: 1 },
  444: { T: -1 },
  445: { T: 1 },
  446: { T: -1 },
  447: { T: 1 },
  448: { T: -1 },
  449: { T: 1 },
  450: { T: -1 },
  451: { T: 1 },
  452: { T: -1 },
  453: { T: 1 },
  454: { T: -1 },
  455: { T: 1 },
  456: { T: -1 },
  457: { T: 1 },
  458: { T: -1 },
  459: { T: 1 },
  460: { T: -1 },
  461: { T: 1 },
  462: { T: -1 },
  463: { T: 1 },
  464: { T: -1 },
  465: { T: 1 },
  466: { T: -1 },
  467: { T: 1 },
  468: { T: -1 },
  469: { T: 1 },
  470: { T: -1 },
  471: {},
  472: {},
  473: { T: 1 },
  474: { T: -1 },
  475: {},
  476: { f: Zh },
  477: {},
  478: {},
  479: { T: 1 },
  480: { T: -1 },
  481: { T: 1 },
  482: { T: -1 },
  483: { T: 1 },
  484: { T: -1 },
  485: { f: fh },
  486: { T: 1 },
  487: { T: -1 },
  488: { T: 1 },
  489: { T: -1 },
  490: { T: 1 },
  491: { T: -1 },
  492: { T: 1 },
  493: { T: -1 },
  494: { f: $h },
  495: { T: 1 },
  496: { T: -1 },
  497: { T: 1 },
  498: { T: -1 },
  499: {},
  500: { T: 1 },
  501: { T: -1 },
  502: { T: 1 },
  503: { T: -1 },
  504: {},
  505: { T: 1 },
  506: { T: -1 },
  507: {},
  508: { T: 1 },
  509: { T: -1 },
  510: { T: 1 },
  511: { T: -1 },
  512: {},
  513: {},
  514: { T: 1 },
  515: { T: -1 },
  516: { T: 1 },
  517: { T: -1 },
  518: { T: 1 },
  519: { T: -1 },
  520: { T: 1 },
  521: { T: -1 },
  522: {},
  523: {},
  524: {},
  525: {},
  526: {},
  527: {},
  528: { T: 1 },
  529: { T: -1 },
  530: { T: 1 },
  531: { T: -1 },
  532: { T: 1 },
  533: { T: -1 },
  534: {},
  535: {},
  536: {},
  537: {},
  538: { T: 1 },
  539: { T: -1 },
  540: { T: 1 },
  541: { T: -1 },
  542: { T: 1 },
  548: {},
  549: {},
  550: { f: Qn },
  551: {},
  552: {},
  553: {},
  554: { T: 1 },
  555: { T: -1 },
  556: { T: 1 },
  557: { T: -1 },
  558: { T: 1 },
  559: { T: -1 },
  560: { T: 1 },
  561: { T: -1 },
  562: {},
  564: {},
  565: { T: 1 },
  566: { T: -1 },
  569: { T: 1 },
  570: { T: -1 },
  572: {},
  573: { T: 1 },
  574: { T: -1 },
  577: {},
  578: {},
  579: {},
  580: {},
  581: {},
  582: {},
  583: {},
  584: {},
  585: {},
  586: {},
  587: {},
  588: { T: -1 },
  589: {},
  590: { T: 1 },
  591: { T: -1 },
  592: { T: 1 },
  593: { T: -1 },
  594: { T: 1 },
  595: { T: -1 },
  596: {},
  597: { T: 1 },
  598: { T: -1 },
  599: { T: 1 },
  600: { T: -1 },
  601: { T: 1 },
  602: { T: -1 },
  603: { T: 1 },
  604: { T: -1 },
  605: { T: 1 },
  606: { T: -1 },
  607: {},
  608: { T: 1 },
  609: { T: -1 },
  610: {},
  611: { T: 1 },
  612: { T: -1 },
  613: { T: 1 },
  614: { T: -1 },
  615: { T: 1 },
  616: { T: -1 },
  617: { T: 1 },
  618: { T: -1 },
  619: { T: 1 },
  620: { T: -1 },
  625: {},
  626: { T: 1 },
  627: { T: -1 },
  628: { T: 1 },
  629: { T: -1 },
  630: { T: 1 },
  631: { T: -1 },
  632: { f: xu },
  633: { T: 1 },
  634: { T: -1 },
  635: { T: 1, f: uu },
  636: { T: -1 },
  637: { f: vo },
  638: { T: 1 },
  639: {},
  640: { T: -1 },
  641: { T: 1 },
  642: { T: -1 },
  643: { T: 1 },
  644: {},
  645: { T: -1 },
  646: { T: 1 },
  648: { T: 1 },
  649: {},
  650: { T: -1 },
  651: { f: mx },
  652: {},
  653: { T: 1 },
  654: { T: -1 },
  655: { T: 1 },
  656: { T: -1 },
  657: { T: 1 },
  658: { T: -1 },
  659: {},
  660: { T: 1 },
  661: {},
  662: { T: -1 },
  663: {},
  664: { T: 1 },
  665: {},
  666: { T: -1 },
  667: {},
  668: {},
  669: {},
  671: { T: 1 },
  672: { T: -1 },
  673: { T: 1 },
  674: { T: -1 },
  675: {},
  676: {},
  677: {},
  678: {},
  679: {},
  680: {},
  681: {},
  1024: {},
  1025: {},
  1026: { T: 1 },
  1027: { T: -1 },
  1028: { T: 1 },
  1029: { T: -1 },
  1030: {},
  1031: { T: 1 },
  1032: { T: -1 },
  1033: { T: 1 },
  1034: { T: -1 },
  1035: {},
  1036: {},
  1037: {},
  1038: { T: 1 },
  1039: { T: -1 },
  1040: {},
  1041: { T: 1 },
  1042: { T: -1 },
  1043: {},
  1044: {},
  1045: {},
  1046: { T: 1 },
  1047: { T: -1 },
  1048: { T: 1 },
  1049: { T: -1 },
  1050: {},
  1051: { T: 1 },
  1052: { T: 1 },
  1053: { f: ix },
  1054: { T: 1 },
  1055: {},
  1056: { T: 1 },
  1057: { T: -1 },
  1058: { T: 1 },
  1059: { T: -1 },
  1061: {},
  1062: { T: 1 },
  1063: { T: -1 },
  1064: { T: 1 },
  1065: { T: -1 },
  1066: { T: 1 },
  1067: { T: -1 },
  1068: { T: 1 },
  1069: { T: -1 },
  1070: { T: 1 },
  1071: { T: -1 },
  1072: { T: 1 },
  1073: { T: -1 },
  1075: { T: 1 },
  1076: { T: -1 },
  1077: { T: 1 },
  1078: { T: -1 },
  1079: { T: 1 },
  1080: { T: -1 },
  1081: { T: 1 },
  1082: { T: -1 },
  1083: { T: 1 },
  1084: { T: -1 },
  1085: {},
  1086: { T: 1 },
  1087: { T: -1 },
  1088: { T: 1 },
  1089: { T: -1 },
  1090: { T: 1 },
  1091: { T: -1 },
  1092: { T: 1 },
  1093: { T: -1 },
  1094: { T: 1 },
  1095: { T: -1 },
  1096: {},
  1097: { T: 1 },
  1098: {},
  1099: { T: -1 },
  1100: { T: 1 },
  1101: { T: -1 },
  1102: {},
  1103: {},
  1104: {},
  1105: {},
  1111: {},
  1112: {},
  1113: { T: 1 },
  1114: { T: -1 },
  1115: { T: 1 },
  1116: { T: -1 },
  1117: {},
  1118: { T: 1 },
  1119: { T: -1 },
  1120: { T: 1 },
  1121: { T: -1 },
  1122: { T: 1 },
  1123: { T: -1 },
  1124: { T: 1 },
  1125: { T: -1 },
  1126: {},
  1128: { T: 1 },
  1129: { T: -1 },
  1130: {},
  1131: { T: 1 },
  1132: { T: -1 },
  1133: { T: 1 },
  1134: { T: -1 },
  1135: { T: 1 },
  1136: { T: -1 },
  1137: { T: 1 },
  1138: { T: -1 },
  1139: { T: 1 },
  1140: { T: -1 },
  1141: {},
  1142: { T: 1 },
  1143: { T: -1 },
  1144: { T: 1 },
  1145: { T: -1 },
  1146: {},
  1147: { T: 1 },
  1148: { T: -1 },
  1149: { T: 1 },
  1150: { T: -1 },
  1152: { T: 1 },
  1153: { T: -1 },
  1154: { T: -1 },
  1155: { T: -1 },
  1156: { T: -1 },
  1157: { T: 1 },
  1158: { T: -1 },
  1159: { T: 1 },
  1160: { T: -1 },
  1161: { T: 1 },
  1162: { T: -1 },
  1163: { T: 1 },
  1164: { T: -1 },
  1165: { T: 1 },
  1166: { T: -1 },
  1167: { T: 1 },
  1168: { T: -1 },
  1169: { T: 1 },
  1170: { T: -1 },
  1171: {},
  1172: { T: 1 },
  1173: { T: -1 },
  1177: {},
  1178: { T: 1 },
  1180: {},
  1181: {},
  1182: {},
  2048: { T: 1 },
  2049: { T: -1 },
  2050: {},
  2051: { T: 1 },
  2052: { T: -1 },
  2053: {},
  2054: {},
  2055: { T: 1 },
  2056: { T: -1 },
  2057: { T: 1 },
  2058: { T: -1 },
  2060: {},
  2067: {},
  2068: { T: 1 },
  2069: { T: -1 },
  2070: {},
  2071: {},
  2072: { T: 1 },
  2073: { T: -1 },
  2075: {},
  2076: {},
  2077: { T: 1 },
  2078: { T: -1 },
  2079: {},
  2080: { T: 1 },
  2081: { T: -1 },
  2082: {},
  2083: { T: 1 },
  2084: { T: -1 },
  2085: { T: 1 },
  2086: { T: -1 },
  2087: { T: 1 },
  2088: { T: -1 },
  2089: { T: 1 },
  2090: { T: -1 },
  2091: {},
  2092: {},
  2093: { T: 1 },
  2094: { T: -1 },
  2095: {},
  2096: { T: 1 },
  2097: { T: -1 },
  2098: { T: 1 },
  2099: { T: -1 },
  2100: { T: 1 },
  2101: { T: -1 },
  2102: {},
  2103: { T: 1 },
  2104: { T: -1 },
  2105: {},
  2106: { T: 1 },
  2107: { T: -1 },
  2108: {},
  2109: { T: 1 },
  2110: { T: -1 },
  2111: { T: 1 },
  2112: { T: -1 },
  2113: { T: 1 },
  2114: { T: -1 },
  2115: {},
  2116: {},
  2117: {},
  2118: { T: 1 },
  2119: { T: -1 },
  2120: {},
  2121: { T: 1 },
  2122: { T: -1 },
  2123: { T: 1 },
  2124: { T: -1 },
  2125: {},
  2126: { T: 1 },
  2127: { T: -1 },
  2128: {},
  2129: { T: 1 },
  2130: { T: -1 },
  2131: { T: 1 },
  2132: { T: -1 },
  2133: { T: 1 },
  2134: {},
  2135: {},
  2136: {},
  2137: { T: 1 },
  2138: { T: -1 },
  2139: { T: 1 },
  2140: { T: -1 },
  2141: {},
  3072: {},
  3073: {},
  4096: { T: 1 },
  4097: { T: -1 },
  5002: { T: 1 },
  5003: { T: -1 },
  5081: { T: 1 },
  5082: { T: -1 },
  5083: {},
  5084: { T: 1 },
  5085: { T: -1 },
  5086: { T: 1 },
  5087: { T: -1 },
  5088: {},
  5089: {},
  5090: {},
  5092: { T: 1 },
  5093: { T: -1 },
  5094: {},
  5095: { T: 1 },
  5096: { T: -1 },
  5097: {},
  5099: {},
  65535: { n: "" }
};
function J(e, t, r, n) {
  var a = t;
  if (!isNaN(a)) {
    var i = n || (r || []).length || 0, s = e.next(4);
    s.write_shift(2, a), s.write_shift(2, i), i > 0 && p0(r) && e.push(r);
  }
}
function e2(e, t, r, n) {
  var a = n || (r || []).length || 0;
  if (a <= 8224)
    return J(e, t, r, a);
  var i = t;
  if (!isNaN(i)) {
    for (var s = r.parts || [], f = 0, c = 0, l = 0; l + (s[f] || 8224) <= 8224; )
      l += s[f] || 8224, f++;
    var o = e.next(4);
    for (o.write_shift(2, i), o.write_shift(2, l), e.push(r.slice(c, c + l)), c += l; c < a; ) {
      for (o = e.next(4), o.write_shift(2, 60), l = 0; l + (s[f] || 8224) <= 8224; )
        l += s[f] || 8224, f++;
      o.write_shift(2, l), e.push(r.slice(c, c + l)), c += l;
    }
  }
}
function Yt(e, t, r) {
  return e || (e = M(7)), e.write_shift(2, t), e.write_shift(2, r), e.write_shift(2, 0), e.write_shift(1, 0), e;
}
function r2(e, t, r, n) {
  var a = M(9);
  return Yt(a, e, t), Ui(r, n || "b", a), a;
}
function t2(e, t, r) {
  var n = M(8 + 2 * r.length);
  return Yt(n, e, t), n.write_shift(1, r.length), n.write_shift(r.length, r, "sbcs"), n.l < n.length ? n.slice(0, n.l) : n;
}
function n2(e, t, r, n) {
  if (t.v != null)
    switch (t.t) {
      case "d":
      case "n":
        var a = t.t == "d" ? rr(Ze(t.v)) : t.v;
        a == (a | 0) && a >= 0 && a < 65536 ? J(e, 2, mc(r, n, a)) : J(e, 3, vc(r, n, a));
        return;
      case "b":
      case "e":
        J(e, 5, r2(r, n, t.v, t.t));
        return;
      case "s":
      case "str":
        J(e, 4, t2(r, n, (t.v || "").slice(0, 255)));
        return;
    }
  J(e, 1, Yt(null, r, n));
}
function a2(e, t, r, n) {
  var a = Array.isArray(t), i = Se(t["!ref"] || "A1"), s, f = "", c = [];
  if (i.e.c > 255 || i.e.r > 16383) {
    if (n.WTF)
      throw new Error("Range " + (t["!ref"] || "A1") + " exceeds format limit A1:IV16384");
    i.e.c = Math.min(i.e.c, 255), i.e.r = Math.min(i.e.c, 16383), s = ke(i);
  }
  for (var l = i.s.r; l <= i.e.r; ++l) {
    f = Xe(l);
    for (var o = i.s.c; o <= i.e.c; ++o) {
      l === i.s.r && (c[o] = ze(o)), s = c[o] + f;
      var u = a ? (t[l] || [])[o] : t[s];
      !u || n2(e, u, l, o);
    }
  }
}
function i2(e, t) {
  for (var r = t || {}, n = er(), a = 0, i = 0; i < e.SheetNames.length; ++i)
    e.SheetNames[i] == r.sheet && (a = i);
  if (a == 0 && !!r.sheet && e.SheetNames[0] != r.sheet)
    throw new Error("Sheet not found: " + r.sheet);
  return J(n, r.biff == 4 ? 1033 : r.biff == 3 ? 521 : 9, E0(e, 16, r)), a2(n, e.Sheets[e.SheetNames[a]], a, r), J(n, 10), n.end();
}
function s2(e, t, r) {
  J(e, 49, Qo({
    sz: 12,
    color: { theme: 1 },
    name: "Arial",
    family: 2,
    scheme: "minor"
  }, r));
}
function f2(e, t, r) {
  !t || [[5, 8], [23, 26], [41, 44], [50, 392]].forEach(function(n) {
    for (var a = n[0]; a <= n[1]; ++a)
      t[a] != null && J(e, 1054, tc(a, t[a], r));
  });
}
function l2(e, t) {
  var r = M(19);
  r.write_shift(4, 2151), r.write_shift(4, 0), r.write_shift(4, 0), r.write_shift(2, 3), r.write_shift(1, 1), r.write_shift(4, 0), J(e, 2151, r), r = M(39), r.write_shift(4, 2152), r.write_shift(4, 0), r.write_shift(4, 0), r.write_shift(2, 3), r.write_shift(1, 0), r.write_shift(4, 0), r.write_shift(2, 1), r.write_shift(4, 4), r.write_shift(2, 0), Vi(Se(t["!ref"] || "A1"), r), r.write_shift(4, 4), J(e, 2152, r);
}
function o2(e, t) {
  for (var r = 0; r < 16; ++r)
    J(e, 224, wa({ numFmtId: 0, style: !0 }, 0, t));
  t.cellXfs.forEach(function(n) {
    J(e, 224, wa(n, 0, t));
  });
}
function c2(e, t) {
  for (var r = 0; r < t["!links"].length; ++r) {
    var n = t["!links"][r];
    J(e, 440, cc(n)), n[1].Tooltip && J(e, 2048, uc(n));
  }
  delete t["!links"];
}
function u2(e, t) {
  if (!!t) {
    var r = 0;
    t.forEach(function(n, a) {
      ++r <= 256 && n && J(e, 125, dc(Pn(a, n), a));
    });
  }
}
function h2(e, t, r, n, a) {
  var i = 16 + jr(a.cellXfs, t, a);
  if (t.v == null && !t.bf) {
    J(e, 513, tt(r, n, i));
    return;
  }
  if (t.bf)
    J(e, 6, B1(t, r, n, a, i));
  else
    switch (t.t) {
      case "d":
      case "n":
        var s = t.t == "d" ? rr(Ze(t.v)) : t.v;
        J(e, 515, sc(r, n, s, i));
        break;
      case "b":
      case "e":
        J(e, 517, ic(r, n, t.v, i, a, t.t));
        break;
      case "s":
      case "str":
        if (a.bookSST) {
          var f = F0(a.Strings, t.v, a.revStrings);
          J(e, 253, ec(r, n, f, i));
        } else
          J(e, 516, rc(r, n, (t.v || "").slice(0, 255), i, a));
        break;
      default:
        J(e, 513, tt(r, n, i));
    }
}
function x2(e, t, r) {
  var n = er(), a = r.SheetNames[e], i = r.Sheets[a] || {}, s = (r || {}).Workbook || {}, f = (s.Sheets || [])[e] || {}, c = Array.isArray(i), l = t.biff == 8, o, u = "", h = [], d = Se(i["!ref"] || "A1"), g = l ? 65536 : 16384;
  if (d.e.c > 255 || d.e.r >= g) {
    if (t.WTF)
      throw new Error("Range " + (i["!ref"] || "A1") + " exceeds format limit A1:IV16384");
    d.e.c = Math.min(d.e.c, 255), d.e.r = Math.min(d.e.c, g - 1);
  }
  J(n, 2057, E0(r, 16, t)), J(n, 13, dr(1)), J(n, 12, dr(100)), J(n, 15, Je(!0)), J(n, 17, Je(!1)), J(n, 16, rt(1e-3)), J(n, 95, Je(!0)), J(n, 42, Je(!1)), J(n, 43, Je(!1)), J(n, 130, dr(1)), J(n, 128, ac([0, 0])), J(n, 131, Je(!1)), J(n, 132, Je(!1)), l && u2(n, i["!cols"]), J(n, 512, nc(d, t)), l && (i["!links"] = []);
  for (var x = d.s.r; x <= d.e.r; ++x) {
    u = Xe(x);
    for (var m = d.s.c; m <= d.e.c; ++m) {
      x === d.s.r && (h[m] = ze(m)), o = h[m] + u;
      var O = c ? (i[x] || [])[m] : i[o];
      !O || (h2(n, O, x, m, t), l && O.l && i["!links"].push([o, O.l]));
    }
  }
  var A = f.CodeName || f.name || a;
  return l && J(n, 574, Zo((s.Views || [])[0])), l && (i["!merges"] || []).length && J(n, 229, oc(i["!merges"])), l && c2(n, i), J(n, 442, Wi(A)), l && l2(n, i), J(n, 10), n.end();
}
function d2(e, t, r) {
  var n = er(), a = (e || {}).Workbook || {}, i = a.Sheets || [], s = a.WBProps || {}, f = r.biff == 8, c = r.biff == 5;
  if (J(n, 2057, E0(e, 5, r)), r.bookType == "xla" && J(n, 135), J(n, 225, f ? dr(1200) : null), J(n, 193, Uo(2)), c && J(n, 191), c && J(n, 192), J(n, 226), J(n, 92, Ko("SheetJS", r)), J(n, 66, dr(f ? 1200 : 1252)), f && J(n, 353, dr(0)), f && J(n, 448), J(n, 317, pc(e.SheetNames.length)), f && e.vbaraw && J(n, 211), f && e.vbaraw) {
    var l = s.CodeName || "ThisWorkbook";
    J(n, 442, Wi(l));
  }
  J(n, 156, dr(17)), J(n, 25, Je(!1)), J(n, 18, Je(!1)), J(n, 19, dr(0)), f && J(n, 431, Je(!1)), f && J(n, 444, dr(0)), J(n, 61, Jo()), J(n, 64, Je(!1)), J(n, 141, dr(0)), J(n, 34, Je(_x(e) == "true")), J(n, 14, Je(!0)), f && J(n, 439, Je(!1)), J(n, 218, dr(0)), s2(n, e, r), f2(n, e.SSF, r), o2(n, r), f && J(n, 352, Je(!1));
  var o = n.end(), u = er();
  f && J(u, 140, hc()), f && r.Strings && e2(u, 252, qo(r.Strings)), J(u, 10);
  var h = u.end(), d = er(), g = 0, x = 0;
  for (x = 0; x < e.SheetNames.length; ++x)
    g += (f ? 12 : 11) + (f ? 2 : 1) * e.SheetNames[x].length;
  var m = o.length + g + h.length;
  for (x = 0; x < e.SheetNames.length; ++x) {
    var O = i[x] || {};
    J(d, 133, Yo({ pos: m, hs: O.Hidden || 0, dt: 0, name: e.SheetNames[x] }, r)), m += t[x].length;
  }
  var A = d.end();
  if (g != A.length)
    throw new Error("BS8 " + g + " != " + A.length);
  var y = [];
  return o.length && y.push(o), A.length && y.push(A), h.length && y.push(h), Ve(y);
}
function p2(e, t) {
  var r = t || {}, n = [];
  e && !e.SSF && (e.SSF = tr(Oe)), e && e.SSF && (Dn(), On(e.SSF), r.revssf = Rn(e.SSF), r.revssf[e.SSF[65535]] = 0, r.ssf = e.SSF), r.Strings = [], r.Strings.Count = 0, r.Strings.Unique = 0, C0(r), r.cellXfs = [], jr(r.cellXfs, {}, { revssf: { General: 0 } }), e.Props || (e.Props = {});
  for (var a = 0; a < e.SheetNames.length; ++a)
    n[n.length] = x2(a, r, e);
  return n.unshift(d2(e, n, r)), Ve(n);
}
function ds(e, t) {
  for (var r = 0; r <= e.SheetNames.length; ++r) {
    var n = e.Sheets[e.SheetNames[r]];
    if (!(!n || !n["!ref"])) {
      var a = cr(n["!ref"]);
      a.e.c > 255 && typeof console < "u" && console.error && console.error("Worksheet '" + e.SheetNames[r] + "' extends beyond column IV (255).  Data may be lost.");
    }
  }
  var i = t || {};
  switch (i.biff || 2) {
    case 8:
    case 5:
      return p2(e, t);
    case 4:
    case 3:
    case 2:
      return i2(e, t);
  }
  throw new Error("invalid type " + i.bookType + " for BIFF");
}
function v2(e, t, r, n) {
  for (var a = e["!merges"] || [], i = [], s = t.s.c; s <= t.e.c; ++s) {
    for (var f = 0, c = 0, l = 0; l < a.length; ++l)
      if (!(a[l].s.r > r || a[l].s.c > s) && !(a[l].e.r < r || a[l].e.c < s)) {
        if (a[l].s.r < r || a[l].s.c < s) {
          f = -1;
          break;
        }
        f = a[l].e.r - a[l].s.r + 1, c = a[l].e.c - a[l].s.c + 1;
        break;
      }
    if (!(f < 0)) {
      var o = _e({ r, c: s }), u = n.dense ? (e[r] || [])[s] : e[o], h = u && u.v != null && (u.h || $l(u.w || (Pr(u), u.w) || "")) || "", d = {};
      f > 1 && (d.rowspan = f), c > 1 && (d.colspan = c), n.editable ? h = '<span contenteditable="true">' + h + "</span>" : u && (d["data-t"] = u && u.t || "z", u.v != null && (d["data-v"] = u.v), u.z != null && (d["data-z"] = u.z), u.l && (u.l.Target || "#").charAt(0) != "#" && (h = '<a href="' + u.l.Target + '">' + h + "</a>")), d.id = (n.id || "sjs") + "-" + o, i.push(q("td", h, d));
    }
  }
  var g = "<tr>";
  return g + i.join("") + "</tr>";
}
var m2 = '<html><head><meta charset="utf-8"/><title>SheetJS Table Export</title></head><body>', g2 = "</body></html>";
function _2(e, t, r) {
  var n = [];
  return n.join("") + "<table" + (r && r.id ? ' id="' + r.id + '"' : "") + ">";
}
function ps(e, t) {
  var r = t || {}, n = r.header != null ? r.header : m2, a = r.footer != null ? r.footer : g2, i = [n], s = cr(e["!ref"]);
  r.dense = Array.isArray(e), i.push(_2(e, s, r));
  for (var f = s.s.r; f <= s.e.r; ++f)
    i.push(v2(e, s, f, r));
  return i.push("</table>" + a), i.join("");
}
function vs(e, t, r) {
  var n = r || {}, a = 0, i = 0;
  if (n.origin != null)
    if (typeof n.origin == "number")
      a = n.origin;
    else {
      var s = typeof n.origin == "string" ? Me(n.origin) : n.origin;
      a = s.r, i = s.c;
    }
  var f = t.getElementsByTagName("tr"), c = Math.min(n.sheetRows || 1e7, f.length), l = { s: { r: 0, c: 0 }, e: { r: a, c: i } };
  if (e["!ref"]) {
    var o = cr(e["!ref"]);
    l.s.r = Math.min(l.s.r, o.s.r), l.s.c = Math.min(l.s.c, o.s.c), l.e.r = Math.max(l.e.r, o.e.r), l.e.c = Math.max(l.e.c, o.e.c), a == -1 && (l.e.r = a = o.e.r + 1);
  }
  var u = [], h = 0, d = e["!rows"] || (e["!rows"] = []), g = 0, x = 0, m = 0, O = 0, A = 0, y = 0;
  for (e["!cols"] || (e["!cols"] = []); g < f.length && x < c; ++g) {
    var R = f[g];
    if (Da(R)) {
      if (n.display)
        continue;
      d[x] = { hidden: !0 };
    }
    var X = R.children;
    for (m = O = 0; m < X.length; ++m) {
      var Q = X[m];
      if (!(n.display && Da(Q))) {
        var D = Q.hasAttribute("data-v") ? Q.getAttribute("data-v") : Q.hasAttribute("v") ? Q.getAttribute("v") : ql(Q.innerHTML), U = Q.getAttribute("data-z") || Q.getAttribute("z");
        for (h = 0; h < u.length; ++h) {
          var B = u[h];
          B.s.c == O + i && B.s.r < x + a && x + a <= B.e.r && (O = B.e.c + 1 - i, h = -1);
        }
        y = +Q.getAttribute("colspan") || 1, ((A = +Q.getAttribute("rowspan") || 1) > 1 || y > 1) && u.push({ s: { r: x + a, c: O + i }, e: { r: x + a + (A || 1) - 1, c: O + i + (y || 1) - 1 } });
        var G = { t: "s", v: D }, j = Q.getAttribute("data-t") || Q.getAttribute("t") || "";
        D != null && (D.length == 0 ? G.t = j || "z" : n.raw || D.trim().length == 0 || j == "s" || (D === "TRUE" ? G = { t: "b", v: !0 } : D === "FALSE" ? G = { t: "b", v: !1 } : isNaN(kr(D)) ? isNaN(Ut(D).getDate()) || (G = { t: "d", v: Ze(D) }, n.cellDates || (G = { t: "n", v: rr(G.v) }), G.z = n.dateNF || Oe[14]) : G = { t: "n", v: kr(D) })), G.z === void 0 && U != null && (G.z = U);
        var K = "", te = Q.getElementsByTagName("A");
        if (te && te.length)
          for (var Te = 0; Te < te.length && !(te[Te].hasAttribute("href") && (K = te[Te].getAttribute("href"), K.charAt(0) != "#")); ++Te)
            ;
        K && K.charAt(0) != "#" && (G.l = { Target: K }), n.dense ? (e[x + a] || (e[x + a] = []), e[x + a][O + i] = G) : e[_e({ c: O + i, r: x + a })] = G, l.e.c < O + i && (l.e.c = O + i), O += y;
      }
    }
    ++x;
  }
  return u.length && (e["!merges"] = (e["!merges"] || []).concat(u)), l.e.r = Math.max(l.e.r, x - 1 + a), e["!ref"] = ke(l), x >= c && (e["!fullref"] = ke((l.e.r = f.length - g + x - 1 + a, l))), e;
}
function ms(e, t) {
  var r = t || {}, n = r.dense ? [] : {};
  return vs(n, e, t);
}
function T2(e, t) {
  return nt(ms(e, t), t);
}
function Da(e) {
  var t = "", r = E2(e);
  return r && (t = r(e).getPropertyValue("display")), t || (t = e.style && e.style.display), t === "none";
}
function E2(e) {
  return e.ownerDocument.defaultView && typeof e.ownerDocument.defaultView.getComputedStyle == "function" ? e.ownerDocument.defaultView.getComputedStyle : typeof getComputedStyle == "function" ? getComputedStyle : null;
}
var w2 = /* @__PURE__ */ function() {
  var e = [
    "<office:master-styles>",
    '<style:master-page style:name="mp1" style:page-layout-name="mp1">',
    "<style:header/>",
    '<style:header-left style:display="false"/>',
    "<style:footer/>",
    '<style:footer-left style:display="false"/>',
    "</style:master-page>",
    "</office:master-styles>"
  ].join(""), t = "<office:document-styles " + Ht({
    "xmlns:office": "urn:oasis:names:tc:opendocument:xmlns:office:1.0",
    "xmlns:table": "urn:oasis:names:tc:opendocument:xmlns:table:1.0",
    "xmlns:style": "urn:oasis:names:tc:opendocument:xmlns:style:1.0",
    "xmlns:text": "urn:oasis:names:tc:opendocument:xmlns:text:1.0",
    "xmlns:draw": "urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",
    "xmlns:fo": "urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0",
    "xmlns:xlink": "http://www.w3.org/1999/xlink",
    "xmlns:dc": "http://purl.org/dc/elements/1.1/",
    "xmlns:number": "urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0",
    "xmlns:svg": "urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0",
    "xmlns:of": "urn:oasis:names:tc:opendocument:xmlns:of:1.2",
    "office:version": "1.2"
  }) + ">" + e + "</office:document-styles>";
  return function() {
    return Ne + t;
  };
}(), Ra = /* @__PURE__ */ function() {
  var e = function(i) {
    return ge(i).replace(/  +/g, function(s) {
      return '<text:s text:c="' + s.length + '"/>';
    }).replace(/\t/g, "<text:tab/>").replace(/\n/g, "</text:p><text:p>").replace(/^ /, "<text:s/>").replace(/ $/, "<text:s/>");
  }, t = `          <table:table-cell />
`, r = `          <table:covered-table-cell/>
`, n = function(i, s, f) {
    var c = [];
    c.push('      <table:table table:name="' + ge(s.SheetNames[f]) + `" table:style-name="ta1">
`);
    var l = 0, o = 0, u = cr(i["!ref"] || "A1"), h = i["!merges"] || [], d = 0, g = Array.isArray(i);
    if (i["!cols"])
      for (o = 0; o <= u.e.c; ++o)
        c.push("        <table:table-column" + (i["!cols"][o] ? ' table:style-name="co' + i["!cols"][o].ods + '"' : "") + `></table:table-column>
`);
    var x = "", m = i["!rows"] || [];
    for (l = 0; l < u.s.r; ++l)
      x = m[l] ? ' table:style-name="ro' + m[l].ods + '"' : "", c.push("        <table:table-row" + x + `></table:table-row>
`);
    for (; l <= u.e.r; ++l) {
      for (x = m[l] ? ' table:style-name="ro' + m[l].ods + '"' : "", c.push("        <table:table-row" + x + `>
`), o = 0; o < u.s.c; ++o)
        c.push(t);
      for (; o <= u.e.c; ++o) {
        var O = !1, A = {}, y = "";
        for (d = 0; d != h.length; ++d)
          if (!(h[d].s.c > o) && !(h[d].s.r > l) && !(h[d].e.c < o) && !(h[d].e.r < l)) {
            (h[d].s.c != o || h[d].s.r != l) && (O = !0), A["table:number-columns-spanned"] = h[d].e.c - h[d].s.c + 1, A["table:number-rows-spanned"] = h[d].e.r - h[d].s.r + 1;
            break;
          }
        if (O) {
          c.push(r);
          continue;
        }
        var R = _e({ r: l, c: o }), X = g ? (i[l] || [])[o] : i[R];
        if (X && X.f && (A["table:formula"] = ge(V1(X.f)), X.F && X.F.slice(0, R.length) == R)) {
          var Q = cr(X.F);
          A["table:number-matrix-columns-spanned"] = Q.e.c - Q.s.c + 1, A["table:number-matrix-rows-spanned"] = Q.e.r - Q.s.r + 1;
        }
        if (!X) {
          c.push(t);
          continue;
        }
        switch (X.t) {
          case "b":
            y = X.v ? "TRUE" : "FALSE", A["office:value-type"] = "boolean", A["office:boolean-value"] = X.v ? "true" : "false";
            break;
          case "n":
            y = X.w || String(X.v || 0), A["office:value-type"] = "float", A["office:value"] = X.v || 0;
            break;
          case "s":
          case "str":
            y = X.v == null ? "" : X.v, A["office:value-type"] = "string";
            break;
          case "d":
            y = X.w || Ze(X.v).toISOString(), A["office:value-type"] = "date", A["office:date-value"] = Ze(X.v).toISOString(), A["table:style-name"] = "ce1";
            break;
          default:
            c.push(t);
            continue;
        }
        var D = e(y);
        if (X.l && X.l.Target) {
          var U = X.l.Target;
          U = U.charAt(0) == "#" ? "#" + G1(U.slice(1)) : U, U.charAt(0) != "#" && !U.match(/^\w+:/) && (U = "../" + U), D = q("text:a", D, { "xlink:href": U.replace(/&/g, "&amp;") });
        }
        c.push("          " + q("table:table-cell", q("text:p", D, {}), A) + `
`);
      }
      c.push(`        </table:table-row>
`);
    }
    return c.push(`      </table:table>
`), c.join("");
  }, a = function(i, s) {
    i.push(` <office:automatic-styles>
`), i.push(`  <number:date-style style:name="N37" number:automatic-order="true">
`), i.push(`   <number:month number:style="long"/>
`), i.push(`   <number:text>/</number:text>
`), i.push(`   <number:day number:style="long"/>
`), i.push(`   <number:text>/</number:text>
`), i.push(`   <number:year/>
`), i.push(`  </number:date-style>
`);
    var f = 0;
    s.SheetNames.map(function(l) {
      return s.Sheets[l];
    }).forEach(function(l) {
      if (!!l && l["!cols"]) {
        for (var o = 0; o < l["!cols"].length; ++o)
          if (l["!cols"][o]) {
            var u = l["!cols"][o];
            if (u.width == null && u.wpx == null && u.wch == null)
              continue;
            w0(u), u.ods = f;
            var h = l["!cols"][o].wpx + "px";
            i.push('  <style:style style:name="co' + f + `" style:family="table-column">
`), i.push('   <style:table-column-properties fo:break-before="auto" style:column-width="' + h + `"/>
`), i.push(`  </style:style>
`), ++f;
          }
      }
    });
    var c = 0;
    s.SheetNames.map(function(l) {
      return s.Sheets[l];
    }).forEach(function(l) {
      if (!!l && l["!rows"]) {
        for (var o = 0; o < l["!rows"].length; ++o)
          if (l["!rows"][o]) {
            l["!rows"][o].ods = c;
            var u = l["!rows"][o].hpx + "px";
            i.push('  <style:style style:name="ro' + c + `" style:family="table-row">
`), i.push('   <style:table-row-properties fo:break-before="auto" style:row-height="' + u + `"/>
`), i.push(`  </style:style>
`), ++c;
          }
      }
    }), i.push(`  <style:style style:name="ta1" style:family="table" style:master-page-name="mp1">
`), i.push(`   <style:table-properties table:display="true" style:writing-mode="lr-tb"/>
`), i.push(`  </style:style>
`), i.push(`  <style:style style:name="ce1" style:family="table-cell" style:parent-style-name="Default" style:data-style-name="N37"/>
`), i.push(` </office:automatic-styles>
`);
  };
  return function(s, f) {
    var c = [Ne], l = Ht({
      "xmlns:office": "urn:oasis:names:tc:opendocument:xmlns:office:1.0",
      "xmlns:table": "urn:oasis:names:tc:opendocument:xmlns:table:1.0",
      "xmlns:style": "urn:oasis:names:tc:opendocument:xmlns:style:1.0",
      "xmlns:text": "urn:oasis:names:tc:opendocument:xmlns:text:1.0",
      "xmlns:draw": "urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",
      "xmlns:fo": "urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0",
      "xmlns:xlink": "http://www.w3.org/1999/xlink",
      "xmlns:dc": "http://purl.org/dc/elements/1.1/",
      "xmlns:meta": "urn:oasis:names:tc:opendocument:xmlns:meta:1.0",
      "xmlns:number": "urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0",
      "xmlns:presentation": "urn:oasis:names:tc:opendocument:xmlns:presentation:1.0",
      "xmlns:svg": "urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0",
      "xmlns:chart": "urn:oasis:names:tc:opendocument:xmlns:chart:1.0",
      "xmlns:dr3d": "urn:oasis:names:tc:opendocument:xmlns:dr3d:1.0",
      "xmlns:math": "http://www.w3.org/1998/Math/MathML",
      "xmlns:form": "urn:oasis:names:tc:opendocument:xmlns:form:1.0",
      "xmlns:script": "urn:oasis:names:tc:opendocument:xmlns:script:1.0",
      "xmlns:ooo": "http://openoffice.org/2004/office",
      "xmlns:ooow": "http://openoffice.org/2004/writer",
      "xmlns:oooc": "http://openoffice.org/2004/calc",
      "xmlns:dom": "http://www.w3.org/2001/xml-events",
      "xmlns:xforms": "http://www.w3.org/2002/xforms",
      "xmlns:xsd": "http://www.w3.org/2001/XMLSchema",
      "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
      "xmlns:sheet": "urn:oasis:names:tc:opendocument:sh33tjs:1.0",
      "xmlns:rpt": "http://openoffice.org/2005/report",
      "xmlns:of": "urn:oasis:names:tc:opendocument:xmlns:of:1.2",
      "xmlns:xhtml": "http://www.w3.org/1999/xhtml",
      "xmlns:grddl": "http://www.w3.org/2003/g/data-view#",
      "xmlns:tableooo": "http://openoffice.org/2009/table",
      "xmlns:drawooo": "http://openoffice.org/2010/draw",
      "xmlns:calcext": "urn:org:documentfoundation:names:experimental:calc:xmlns:calcext:1.0",
      "xmlns:loext": "urn:org:documentfoundation:names:experimental:office:xmlns:loext:1.0",
      "xmlns:field": "urn:openoffice:names:experimental:ooo-ms-interop:xmlns:field:1.0",
      "xmlns:formx": "urn:openoffice:names:experimental:ooxml-odf-interop:xmlns:form:1.0",
      "xmlns:css3t": "http://www.w3.org/TR/css3-text/",
      "office:version": "1.2"
    }), o = Ht({
      "xmlns:config": "urn:oasis:names:tc:opendocument:xmlns:config:1.0",
      "office:mimetype": "application/vnd.oasis.opendocument.spreadsheet"
    });
    f.bookType == "fods" ? (c.push("<office:document" + l + o + `>
`), c.push(Ni().replace(/office:document-meta/g, "office:meta"))) : c.push("<office:document-content" + l + `>
`), a(c, s), c.push(`  <office:body>
`), c.push(`    <office:spreadsheet>
`);
    for (var u = 0; u != s.SheetNames.length; ++u)
      c.push(n(s.Sheets[s.SheetNames[u]], s, u));
    return c.push(`    </office:spreadsheet>
`), c.push(`  </office:body>
`), f.bookType == "fods" ? c.push("</office:document>") : c.push("</office:document-content>"), c.join("");
  };
}();
function gs(e, t) {
  if (t.bookType == "fods")
    return Ra(e, t);
  var r = u0(), n = "", a = [], i = [];
  return n = "mimetype", ce(r, n, "application/vnd.oasis.opendocument.spreadsheet"), n = "content.xml", ce(r, n, Ra(e, t)), a.push([n, "text/xml"]), i.push([n, "ContentFile"]), n = "styles.xml", ce(r, n, w2(e, t)), a.push([n, "text/xml"]), i.push([n, "StylesFile"]), n = "meta.xml", ce(r, n, Ne + Ni()), a.push([n, "text/xml"]), i.push([n, "MetadataFile"]), n = "manifest.rdf", ce(r, n, Po(i)), a.push([n, "application/rdf+xml"]), n = "META-INF/manifest.xml", ce(r, n, No(a)), r;
}
/*! sheetjs (C) 2013-present SheetJS -- http://sheetjs.com */
function An(e) {
  return new DataView(e.buffer, e.byteOffset, e.byteLength);
}
function S2(e) {
  return typeof TextEncoder < "u" ? new TextEncoder().encode(e) : _r(Dr(e));
}
function A2(e, t) {
  e:
    for (var r = 0; r <= e.length - t.length; ++r) {
      for (var n = 0; n < t.length; ++n)
        if (e[r + n] != t[n])
          continue e;
      return !0;
    }
  return !1;
}
function Xr(e) {
  var t = e.reduce(function(a, i) {
    return a + i.length;
  }, 0), r = new Uint8Array(t), n = 0;
  return e.forEach(function(a) {
    r.set(a, n), n += a.length;
  }), r;
}
function y2(e, t, r) {
  var n = Math.floor(r == 0 ? 0 : Math.LOG10E * Math.log(Math.abs(r))) + 6176 - 20, a = r / Math.pow(10, n - 6176);
  e[t + 15] |= n >> 7, e[t + 14] |= (n & 127) << 1;
  for (var i = 0; a >= 1; ++i, a /= 256)
    e[t + i] = a & 255;
  e[t + 15] |= r >= 0 ? 0 : 128;
}
function Wt(e, t) {
  var r = t ? t[0] : 0, n = e[r] & 127;
  e:
    if (e[r++] >= 128 && (n |= (e[r] & 127) << 7, e[r++] < 128 || (n |= (e[r] & 127) << 14, e[r++] < 128) || (n |= (e[r] & 127) << 21, e[r++] < 128) || (n += (e[r] & 127) * Math.pow(2, 28), ++r, e[r++] < 128) || (n += (e[r] & 127) * Math.pow(2, 35), ++r, e[r++] < 128) || (n += (e[r] & 127) * Math.pow(2, 42), ++r, e[r++] < 128)))
      break e;
  return t && (t[0] = r), n;
}
function ve(e) {
  var t = new Uint8Array(7);
  t[0] = e & 127;
  var r = 1;
  e:
    if (e > 127) {
      if (t[r - 1] |= 128, t[r] = e >> 7 & 127, ++r, e <= 16383 || (t[r - 1] |= 128, t[r] = e >> 14 & 127, ++r, e <= 2097151) || (t[r - 1] |= 128, t[r] = e >> 21 & 127, ++r, e <= 268435455) || (t[r - 1] |= 128, t[r] = e / 256 >>> 21 & 127, ++r, e <= 34359738367) || (t[r - 1] |= 128, t[r] = e / 65536 >>> 21 & 127, ++r, e <= 4398046511103))
        break e;
      t[r - 1] |= 128, t[r] = e / 16777216 >>> 21 & 127, ++r;
    }
  return t.slice(0, r);
}
function mt(e) {
  var t = 0, r = e[t] & 127;
  e:
    if (e[t++] >= 128) {
      if (r |= (e[t] & 127) << 7, e[t++] < 128 || (r |= (e[t] & 127) << 14, e[t++] < 128) || (r |= (e[t] & 127) << 21, e[t++] < 128))
        break e;
      r |= (e[t] & 127) << 28;
    }
  return r;
}
function Ie(e) {
  for (var t = [], r = [0]; r[0] < e.length; ) {
    var n = r[0], a = Wt(e, r), i = a & 7;
    a = Math.floor(a / 8);
    var s = 0, f;
    if (a == 0)
      break;
    switch (i) {
      case 0:
        {
          for (var c = r[0]; e[r[0]++] >= 128; )
            ;
          f = e.slice(c, r[0]);
        }
        break;
      case 5:
        s = 4, f = e.slice(r[0], r[0] + s), r[0] += s;
        break;
      case 1:
        s = 8, f = e.slice(r[0], r[0] + s), r[0] += s;
        break;
      case 2:
        s = Wt(e, r), f = e.slice(r[0], r[0] + s), r[0] += s;
        break;
      case 3:
      case 4:
      default:
        throw new Error("PB Type ".concat(i, " for Field ").concat(a, " at offset ").concat(n));
    }
    var l = { data: f, type: i };
    t[a] == null ? t[a] = [l] : t[a].push(l);
  }
  return t;
}
function He(e) {
  var t = [];
  return e.forEach(function(r, n) {
    r.forEach(function(a) {
      !a.data || (t.push(ve(n * 8 + a.type)), a.type == 2 && t.push(ve(a.data.length)), t.push(a.data));
    });
  }), Xr(t);
}
function mr(e) {
  for (var t, r = [], n = [0]; n[0] < e.length; ) {
    var a = Wt(e, n), i = Ie(e.slice(n[0], n[0] + a));
    n[0] += a;
    var s = {
      id: mt(i[1][0].data),
      messages: []
    };
    i[2].forEach(function(f) {
      var c = Ie(f.data), l = mt(c[3][0].data);
      s.messages.push({
        meta: c,
        data: e.slice(n[0], n[0] + l)
      }), n[0] += l;
    }), (t = i[3]) != null && t[0] && (s.merge = mt(i[3][0].data) >>> 0 > 0), r.push(s);
  }
  return r;
}
function ct(e) {
  var t = [];
  return e.forEach(function(r) {
    var n = [];
    n[1] = [{ data: ve(r.id), type: 0 }], n[2] = [], r.merge != null && (n[3] = [{ data: ve(+!!r.merge), type: 0 }]);
    var a = [];
    r.messages.forEach(function(s) {
      a.push(s.data), s.meta[3] = [{ type: 0, data: ve(s.data.length) }], n[2].push({ data: He(s.meta), type: 2 });
    });
    var i = He(n);
    t.push(ve(i.length)), t.push(i), a.forEach(function(s) {
      return t.push(s);
    });
  }), Xr(t);
}
function F2(e, t) {
  if (e != 0)
    throw new Error("Unexpected Snappy chunk type ".concat(e));
  for (var r = [0], n = Wt(t, r), a = []; r[0] < t.length; ) {
    var i = t[r[0]] & 3;
    if (i == 0) {
      var s = t[r[0]++] >> 2;
      if (s < 60)
        ++s;
      else {
        var f = s - 59;
        s = t[r[0]], f > 1 && (s |= t[r[0] + 1] << 8), f > 2 && (s |= t[r[0] + 2] << 16), f > 3 && (s |= t[r[0] + 3] << 24), s >>>= 0, s++, r[0] += f;
      }
      a.push(t.slice(r[0], r[0] + s)), r[0] += s;
      continue;
    } else {
      var c = 0, l = 0;
      if (i == 1 ? (l = (t[r[0]] >> 2 & 7) + 4, c = (t[r[0]++] & 224) << 3, c |= t[r[0]++]) : (l = (t[r[0]++] >> 2) + 1, i == 2 ? (c = t[r[0]] | t[r[0] + 1] << 8, r[0] += 2) : (c = (t[r[0]] | t[r[0] + 1] << 8 | t[r[0] + 2] << 16 | t[r[0] + 3] << 24) >>> 0, r[0] += 4)), a = [Xr(a)], c == 0)
        throw new Error("Invalid offset 0");
      if (c > a[0].length)
        throw new Error("Invalid offset beyond length");
      if (l >= c)
        for (a.push(a[0].slice(-c)), l -= c; l >= a[a.length - 1].length; )
          a.push(a[a.length - 1]), l -= a[a.length - 1].length;
      a.push(a[0].slice(-c, -c + l));
    }
  }
  var o = Xr(a);
  if (o.length != n)
    throw new Error("Unexpected length: ".concat(o.length, " != ").concat(n));
  return o;
}
function gr(e) {
  for (var t = [], r = 0; r < e.length; ) {
    var n = e[r++], a = e[r] | e[r + 1] << 8 | e[r + 2] << 16;
    r += 3, t.push(F2(n, e.slice(r, r + a))), r += a;
  }
  if (r !== e.length)
    throw new Error("data is not a valid framed stream!");
  return Xr(t);
}
function ut(e) {
  for (var t = [], r = 0; r < e.length; ) {
    var n = Math.min(e.length - r, 268435455), a = new Uint8Array(4);
    t.push(a);
    var i = ve(n), s = i.length;
    t.push(i), n <= 60 ? (s++, t.push(new Uint8Array([n - 1 << 2]))) : n <= 256 ? (s += 2, t.push(new Uint8Array([240, n - 1 & 255]))) : n <= 65536 ? (s += 3, t.push(new Uint8Array([244, n - 1 & 255, n - 1 >> 8 & 255]))) : n <= 16777216 ? (s += 4, t.push(new Uint8Array([248, n - 1 & 255, n - 1 >> 8 & 255, n - 1 >> 16 & 255]))) : n <= 4294967296 && (s += 5, t.push(new Uint8Array([252, n - 1 & 255, n - 1 >> 8 & 255, n - 1 >> 16 & 255, n - 1 >>> 24 & 255]))), t.push(e.slice(r, r + n)), s += n, a[0] = 0, a[1] = s & 255, a[2] = s >> 8 & 255, a[3] = s >> 16 & 255, r += n;
  }
  return Xr(t);
}
function Kn(e, t) {
  var r = new Uint8Array(32), n = An(r), a = 12, i = 0;
  switch (r[0] = 5, e.t) {
    case "n":
      r[1] = 2, y2(r, a, e.v), i |= 1, a += 16;
      break;
    case "b":
      r[1] = 6, n.setFloat64(a, e.v ? 1 : 0, !0), i |= 2, a += 8;
      break;
    case "s":
      if (t.indexOf(e.v) == -1)
        throw new Error("Value ".concat(e.v, " missing from SST!"));
      r[1] = 3, n.setUint32(a, t.indexOf(e.v), !0), i |= 8, a += 4;
      break;
    default:
      throw "unsupported cell type " + e.t;
  }
  return n.setUint32(8, i, !0), r.slice(0, a);
}
function Yn(e, t) {
  var r = new Uint8Array(32), n = An(r), a = 12, i = 0;
  switch (r[0] = 3, e.t) {
    case "n":
      r[2] = 2, n.setFloat64(a, e.v, !0), i |= 32, a += 8;
      break;
    case "b":
      r[2] = 6, n.setFloat64(a, e.v ? 1 : 0, !0), i |= 32, a += 8;
      break;
    case "s":
      if (t.indexOf(e.v) == -1)
        throw new Error("Value ".concat(e.v, " missing from SST!"));
      r[2] = 3, n.setUint32(a, t.indexOf(e.v), !0), i |= 16, a += 4;
      break;
    default:
      throw "unsupported cell type " + e.t;
  }
  return n.setUint32(4, i, !0), r.slice(0, a);
}
function Br(e) {
  var t = Ie(e);
  return Wt(t[1][0].data);
}
function C2(e, t, r) {
  var n, a, i, s;
  if (!((n = e[6]) != null && n[0]) || !((a = e[7]) != null && a[0]))
    throw "Mutation only works on post-BNC storages!";
  var f = ((s = (i = e[8]) == null ? void 0 : i[0]) == null ? void 0 : s.data) && mt(e[8][0].data) > 0 || !1;
  if (f)
    throw "Math only works with normal offsets";
  for (var c = 0, l = An(e[7][0].data), o = 0, u = [], h = An(e[4][0].data), d = 0, g = [], x = 0; x < t.length; ++x) {
    if (t[x] == null) {
      l.setUint16(x * 2, 65535, !0), h.setUint16(x * 2, 65535);
      continue;
    }
    l.setUint16(x * 2, o, !0), h.setUint16(x * 2, d, !0);
    var m, O;
    switch (typeof t[x]) {
      case "string":
        m = Kn({ t: "s", v: t[x] }, r), O = Yn({ t: "s", v: t[x] }, r);
        break;
      case "number":
        m = Kn({ t: "n", v: t[x] }, r), O = Yn({ t: "n", v: t[x] }, r);
        break;
      case "boolean":
        m = Kn({ t: "b", v: t[x] }, r), O = Yn({ t: "b", v: t[x] }, r);
        break;
      default:
        throw new Error("Unsupported value " + t[x]);
    }
    u.push(m), o += m.length, g.push(O), d += O.length, ++c;
  }
  for (e[2][0].data = ve(c); x < e[7][0].data.length / 2; ++x)
    l.setUint16(x * 2, 65535, !0), h.setUint16(x * 2, 65535, !0);
  return e[6][0].data = Xr(u), e[3][0].data = Xr(g), c;
}
function O2(e, t) {
  if (!t || !t.numbers)
    throw new Error("Must pass a `numbers` option -- check the README");
  var r = e.Sheets[e.SheetNames[0]];
  e.SheetNames.length > 1 && console.error("The Numbers writer currently writes only the first table");
  var n = cr(r["!ref"]);
  n.s.r = n.s.c = 0;
  var a = !1;
  n.e.c > 9 && (a = !0, n.e.c = 9), n.e.r > 49 && (a = !0, n.e.r = 49), a && console.error("The Numbers writer is currently limited to ".concat(ke(n)));
  var i = yn(r, { range: n, header: 1 }), s = ["~Sh33tJ5~"];
  i.forEach(function(L) {
    return L.forEach(function(C) {
      typeof C == "string" && s.push(C);
    });
  });
  var f = {}, c = [], l = Ee.read(t.numbers, { type: "base64" });
  l.FileIndex.map(function(L, C) {
    return [L, l.FullPaths[C]];
  }).forEach(function(L) {
    var C = L[0], F = L[1];
    if (C.type == 2 && !!C.name.match(/\.iwa/)) {
      var V = C.content, se = gr(V), fe = mr(se);
      fe.forEach(function(ie) {
        c.push(ie.id), f[ie.id] = { deps: [], location: F, type: mt(ie.messages[0].meta[1][0].data) };
      });
    }
  }), c.sort(function(L, C) {
    return L - C;
  });
  var o = c.filter(function(L) {
    return L > 1;
  }).map(function(L) {
    return [L, ve(L)];
  });
  l.FileIndex.map(function(L, C) {
    return [L, l.FullPaths[C]];
  }).forEach(function(L) {
    var C = L[0];
    if (L[1], !!C.name.match(/\.iwa/)) {
      var F = mr(gr(C.content));
      F.forEach(function(V) {
        V.messages.forEach(function(se) {
          o.forEach(function(fe) {
            V.messages.some(function(ie) {
              return mt(ie.meta[1][0].data) != 11006 && A2(ie.data, fe[1]);
            }) && f[fe[0]].deps.push(V.id);
          });
        });
      });
    }
  });
  for (var u = Ee.find(l, f[1].location), h = mr(gr(u.content)), d, g = 0; g < h.length; ++g) {
    var x = h[g];
    x.id == 1 && (d = x);
  }
  var m = Br(Ie(d.messages[0].data)[1][0].data);
  for (u = Ee.find(l, f[m].location), h = mr(gr(u.content)), g = 0; g < h.length; ++g)
    x = h[g], x.id == m && (d = x);
  for (m = Br(Ie(d.messages[0].data)[2][0].data), u = Ee.find(l, f[m].location), h = mr(gr(u.content)), g = 0; g < h.length; ++g)
    x = h[g], x.id == m && (d = x);
  for (m = Br(Ie(d.messages[0].data)[2][0].data), u = Ee.find(l, f[m].location), h = mr(gr(u.content)), g = 0; g < h.length; ++g)
    x = h[g], x.id == m && (d = x);
  var O = Ie(d.messages[0].data);
  {
    O[6][0].data = ve(n.e.r + 1), O[7][0].data = ve(n.e.c + 1);
    var A = Br(O[46][0].data), y = Ee.find(l, f[A].location), R = mr(gr(y.content));
    {
      for (var X = 0; X < R.length && R[X].id != A; ++X)
        ;
      if (R[X].id != A)
        throw "Bad ColumnRowUIDMapArchive";
      var Q = Ie(R[X].messages[0].data);
      Q[1] = [], Q[2] = [], Q[3] = [];
      for (var D = 0; D <= n.e.c; ++D) {
        var U = [];
        U[1] = U[2] = [{ type: 0, data: ve(D + 420690) }], Q[1].push({ type: 2, data: He(U) }), Q[2].push({ type: 0, data: ve(D) }), Q[3].push({ type: 0, data: ve(D) });
      }
      Q[4] = [], Q[5] = [], Q[6] = [];
      for (var B = 0; B <= n.e.r; ++B)
        U = [], U[1] = U[2] = [{ type: 0, data: ve(B + 726270) }], Q[4].push({ type: 2, data: He(U) }), Q[5].push({ type: 0, data: ve(B) }), Q[6].push({ type: 0, data: ve(B) });
      R[X].messages[0].data = He(Q);
    }
    y.content = ut(ct(R)), y.size = y.content.length, delete O[46];
    var G = Ie(O[4][0].data);
    {
      G[7][0].data = ve(n.e.r + 1);
      var j = Ie(G[1][0].data), K = Br(j[2][0].data);
      y = Ee.find(l, f[K].location), R = mr(gr(y.content));
      {
        if (R[0].id != K)
          throw "Bad HeaderStorageBucket";
        var te = Ie(R[0].messages[0].data);
        for (B = 0; B < i.length; ++B) {
          var Te = Ie(te[2][0].data);
          Te[1][0].data = ve(B), Te[4][0].data = ve(i[B].length), te[2][B] = { type: te[2][0].type, data: He(Te) };
        }
        R[0].messages[0].data = He(te);
      }
      y.content = ut(ct(R)), y.size = y.content.length;
      var oe = Br(G[2][0].data);
      y = Ee.find(l, f[oe].location), R = mr(gr(y.content));
      {
        if (R[0].id != oe)
          throw "Bad HeaderStorageBucket";
        for (te = Ie(R[0].messages[0].data), D = 0; D <= n.e.c; ++D)
          Te = Ie(te[2][0].data), Te[1][0].data = ve(D), Te[4][0].data = ve(n.e.r + 1), te[2][D] = { type: te[2][0].type, data: He(Te) };
        R[0].messages[0].data = He(te);
      }
      y.content = ut(ct(R)), y.size = y.content.length;
      var Ue = Br(G[4][0].data);
      (function() {
        for (var L = Ee.find(l, f[Ue].location), C = mr(gr(L.content)), F, V = 0; V < C.length; ++V) {
          var se = C[V];
          se.id == Ue && (F = se);
        }
        var fe = Ie(F.messages[0].data);
        {
          fe[3] = [];
          var ie = [];
          s.forEach(function(he, Ye) {
            ie[1] = [{ type: 0, data: ve(Ye) }], ie[2] = [{ type: 0, data: ve(1) }], ie[3] = [{ type: 2, data: S2(he) }], fe[3].push({ type: 2, data: He(ie) });
          });
        }
        F.messages[0].data = He(fe);
        var ee = ct(C), we = ut(ee);
        L.content = we, L.size = L.content.length;
      })();
      var De = Ie(G[3][0].data);
      {
        var vr = De[1][0];
        delete De[2];
        var Pe = Ie(vr.data);
        {
          var ur = Br(Pe[2][0].data);
          (function() {
            for (var L = Ee.find(l, f[ur].location), C = mr(gr(L.content)), F, V = 0; V < C.length; ++V) {
              var se = C[V];
              se.id == ur && (F = se);
            }
            var fe = Ie(F.messages[0].data);
            {
              delete fe[6], delete De[7];
              var ie = new Uint8Array(fe[5][0].data);
              fe[5] = [];
              for (var ee = 0, we = 0; we <= n.e.r; ++we) {
                var he = Ie(ie);
                ee += C2(he, i[we], s), he[1][0].data = ve(we), fe[5].push({ data: He(he), type: 2 });
              }
              fe[1] = [{ type: 0, data: ve(n.e.c + 1) }], fe[2] = [{ type: 0, data: ve(n.e.r + 1) }], fe[3] = [{ type: 0, data: ve(ee) }], fe[4] = [{ type: 0, data: ve(n.e.r + 1) }];
            }
            F.messages[0].data = He(fe);
            var Ye = ct(C), pe = ut(Ye);
            L.content = pe, L.size = L.content.length;
          })();
        }
        vr.data = He(Pe);
      }
      G[3][0].data = He(De);
    }
    O[4][0].data = He(G);
  }
  d.messages[0].data = He(O);
  var ar = ct(h), S = ut(ar);
  return u.content = S, u.size = u.content.length, l;
}
function D2(e) {
  return function(r) {
    for (var n = 0; n != e.length; ++n) {
      var a = e[n];
      r[a[0]] === void 0 && (r[a[0]] = a[1]), a[2] === "n" && (r[a[0]] = Number(r[a[0]]));
    }
  };
}
function C0(e) {
  D2([
    ["cellDates", !1],
    ["bookSST", !1],
    ["bookType", "xlsx"],
    ["compression", !1],
    ["WTF", !1]
  ])(e);
}
function R2(e, t) {
  return t.bookType == "ods" ? gs(e, t) : t.bookType == "numbers" ? O2(e, t) : t.bookType == "xlsb" ? k2(e, t) : N2(e, t);
}
function k2(e, t) {
  xt = 1024, e && !e.SSF && (e.SSF = tr(Oe)), e && e.SSF && (Dn(), On(e.SSF), t.revssf = Rn(e.SSF), t.revssf[e.SSF[65535]] = 0, t.ssf = e.SSF), t.rels = {}, t.wbrels = {}, t.Strings = [], t.Strings.Count = 0, t.Strings.Unique = 0, Bt ? t.revStrings = /* @__PURE__ */ new Map() : (t.revStrings = {}, t.revStrings.foo = [], delete t.revStrings.foo);
  var r = t.bookType == "xlsb" ? "bin" : "xml", n = es.indexOf(t.bookType) > -1, a = Di();
  C0(t = t || {});
  var i = u0(), s = "", f = 0;
  if (t.cellXfs = [], jr(t.cellXfs, {}, { revssf: { General: 0 } }), e.Props || (e.Props = {}), s = "docProps/core.xml", ce(i, s, Ii(e.Props, t)), a.coreprops.push(s), me(t.rels, 2, s, xe.CORE_PROPS), s = "docProps/app.xml", !(e.Props && e.Props.SheetNames))
    if (!e.Workbook || !e.Workbook.Sheets)
      e.Props.SheetNames = e.SheetNames;
    else {
      for (var c = [], l = 0; l < e.SheetNames.length; ++l)
        (e.Workbook.Sheets[l] || {}).Hidden != 2 && c.push(e.SheetNames[l]);
      e.Props.SheetNames = c;
    }
  for (e.Props.Worksheets = e.Props.SheetNames.length, ce(i, s, Li(e.Props)), a.extprops.push(s), me(t.rels, 3, s, xe.EXT_PROPS), e.Custprops !== e.Props && je(e.Custprops || {}).length > 0 && (s = "docProps/custom.xml", ce(i, s, Bi(e.Custprops)), a.custprops.push(s), me(t.rels, 4, s, xe.CUST_PROPS)), f = 1; f <= e.SheetNames.length; ++f) {
    var o = { "!id": {} }, u = e.Sheets[e.SheetNames[f - 1]], h = (u || {})["!type"] || "sheet";
    switch (h) {
      case "chart":
      default:
        s = "xl/worksheets/sheet" + f + "." + r, ce(i, s, Px(f - 1, s, t, e, o)), a.sheets.push(s), me(t.wbrels, -1, "worksheets/sheet" + f + "." + r, xe.WS[0]);
    }
    if (u) {
      var d = u["!comments"], g = !1, x = "";
      d && d.length > 0 && (x = "xl/comments" + f + "." + r, ce(i, x, Mx(d, x)), a.comments.push(x), me(o, -1, "../comments" + f + "." + r, xe.CMNT), g = !0), u["!legacy"] && g && ce(i, "xl/drawings/vmlDrawing" + f + ".vml", Zi(f, u["!comments"])), delete u["!comments"], delete u["!legacy"];
    }
    o["!id"].rId1 && ce(i, ki(s), pt(o));
  }
  return t.Strings != null && t.Strings.length > 0 && (s = "xl/sharedStrings." + r, ce(i, s, Bx(t.Strings, s, t)), a.strs.push(s), me(t.wbrels, -1, "sharedStrings." + r, xe.SST)), s = "xl/workbook." + r, ce(i, s, Ix(e, s)), a.workbooks.push(s), me(t.rels, 1, s, xe.WB), s = "xl/theme/theme1.xml", ce(i, s, qi(e.Themes, t)), a.themes.push(s), me(t.wbrels, -1, "theme/theme1.xml", xe.THEME), s = "xl/styles." + r, ce(i, s, Lx(e, s, t)), a.styles.push(s), me(t.wbrels, -1, "styles." + r, xe.STY), e.vbaraw && n && (s = "xl/vbaProject.bin", ce(i, s, e.vbaraw), a.vba.push(s), me(t.wbrels, -1, "vbaProject.bin", xe.VBA)), s = "xl/metadata." + r, ce(i, s, bx(s)), a.metadata.push(s), me(t.wbrels, -1, "metadata." + r, xe.XLMETA), ce(i, "[Content_Types].xml", Ri(a, t)), ce(i, "_rels/.rels", pt(t.rels)), ce(i, "xl/_rels/workbook." + r + ".rels", pt(t.wbrels)), delete t.revssf, delete t.ssf, i;
}
function N2(e, t) {
  xt = 1024, e && !e.SSF && (e.SSF = tr(Oe)), e && e.SSF && (Dn(), On(e.SSF), t.revssf = Rn(e.SSF), t.revssf[e.SSF[65535]] = 0, t.ssf = e.SSF), t.rels = {}, t.wbrels = {}, t.Strings = [], t.Strings.Count = 0, t.Strings.Unique = 0, Bt ? t.revStrings = /* @__PURE__ */ new Map() : (t.revStrings = {}, t.revStrings.foo = [], delete t.revStrings.foo);
  var r = "xml", n = es.indexOf(t.bookType) > -1, a = Di();
  C0(t = t || {});
  var i = u0(), s = "", f = 0;
  if (t.cellXfs = [], jr(t.cellXfs, {}, { revssf: { General: 0 } }), e.Props || (e.Props = {}), s = "docProps/core.xml", ce(i, s, Ii(e.Props, t)), a.coreprops.push(s), me(t.rels, 2, s, xe.CORE_PROPS), s = "docProps/app.xml", !(e.Props && e.Props.SheetNames))
    if (!e.Workbook || !e.Workbook.Sheets)
      e.Props.SheetNames = e.SheetNames;
    else {
      for (var c = [], l = 0; l < e.SheetNames.length; ++l)
        (e.Workbook.Sheets[l] || {}).Hidden != 2 && c.push(e.SheetNames[l]);
      e.Props.SheetNames = c;
    }
  e.Props.Worksheets = e.Props.SheetNames.length, ce(i, s, Li(e.Props)), a.extprops.push(s), me(t.rels, 3, s, xe.EXT_PROPS), e.Custprops !== e.Props && je(e.Custprops || {}).length > 0 && (s = "docProps/custom.xml", ce(i, s, Bi(e.Custprops)), a.custprops.push(s), me(t.rels, 4, s, xe.CUST_PROPS));
  var o = ["SheetJ5"];
  for (t.tcid = 0, f = 1; f <= e.SheetNames.length; ++f) {
    var u = { "!id": {} }, h = e.Sheets[e.SheetNames[f - 1]], d = (h || {})["!type"] || "sheet";
    switch (d) {
      case "chart":
      default:
        s = "xl/worksheets/sheet" + f + "." + r, ce(i, s, os(f - 1, t, e, u)), a.sheets.push(s), me(t.wbrels, -1, "worksheets/sheet" + f + "." + r, xe.WS[0]);
    }
    if (h) {
      var g = h["!comments"], x = !1, m = "";
      if (g && g.length > 0) {
        var O = !1;
        g.forEach(function(A) {
          A[1].forEach(function(y) {
            y.T == !0 && (O = !0);
          });
        }), O && (m = "xl/threadedComments/threadedComment" + f + "." + r, ce(i, m, ou(g, o, t)), a.threadedcomments.push(m), me(u, -1, "../threadedComments/threadedComment" + f + "." + r, xe.TCMNT)), m = "xl/comments" + f + "." + r, ce(i, m, Qi(g)), a.comments.push(m), me(u, -1, "../comments" + f + "." + r, xe.CMNT), x = !0;
      }
      h["!legacy"] && x && ce(i, "xl/drawings/vmlDrawing" + f + ".vml", Zi(f, h["!comments"])), delete h["!comments"], delete h["!legacy"];
    }
    u["!id"].rId1 && ce(i, ki(s), pt(u));
  }
  return t.Strings != null && t.Strings.length > 0 && (s = "xl/sharedStrings." + r, ce(i, s, Xi(t.Strings, t)), a.strs.push(s), me(t.wbrels, -1, "sharedStrings." + r, xe.SST)), s = "xl/workbook." + r, ce(i, s, hs(e)), a.workbooks.push(s), me(t.rels, 1, s, xe.WB), s = "xl/theme/theme1.xml", ce(i, s, qi(e.Themes, t)), a.themes.push(s), me(t.wbrels, -1, "theme/theme1.xml", xe.THEME), s = "xl/styles." + r, ce(i, s, Ki(e, t)), a.styles.push(s), me(t.wbrels, -1, "styles." + r, xe.STY), e.vbaraw && n && (s = "xl/vbaProject.bin", ce(i, s, e.vbaraw), a.vba.push(s), me(t.wbrels, -1, "vbaProject.bin", xe.VBA)), s = "xl/metadata." + r, ce(i, s, Ji()), a.metadata.push(s), me(t.wbrels, -1, "metadata." + r, xe.XLMETA), o.length > 1 && (s = "xl/persons/person.xml", ce(i, s, cu(o)), a.people.push(s), me(t.wbrels, -1, "persons/person.xml", xe.PEOPLE)), ce(i, "[Content_Types].xml", Ri(a, t)), ce(i, "_rels/.rels", pt(t.rels)), ce(i, "xl/_rels/workbook." + r + ".rels", pt(t.wbrels)), delete t.revssf, delete t.ssf, i;
}
function I2(e, t) {
  var r = "";
  switch ((t || {}).type || "base64") {
    case "buffer":
      return [e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7]];
    case "base64":
      r = Ir(e.slice(0, 12));
      break;
    case "binary":
      r = e;
      break;
    case "array":
      return [e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7]];
    default:
      throw new Error("Unrecognized type " + (t && t.type || "undefined"));
  }
  return [r.charCodeAt(0), r.charCodeAt(1), r.charCodeAt(2), r.charCodeAt(3), r.charCodeAt(4), r.charCodeAt(5), r.charCodeAt(6), r.charCodeAt(7)];
}
function _s(e, t) {
  switch (t.type) {
    case "base64":
    case "binary":
      break;
    case "buffer":
    case "array":
      t.type = "";
      break;
    case "file":
      return jt(t.file, Ee.write(e, { type: de ? "buffer" : "" }));
    case "string":
      throw new Error("'string' output type invalid for '" + t.bookType + "' files");
    default:
      throw new Error("Unrecognized type " + t.type);
  }
  return Ee.write(e, t);
}
function P2(e, t) {
  var r = tr(t || {}), n = R2(e, r);
  return L2(n, r);
}
function L2(e, t) {
  var r = {}, n = de ? "nodebuffer" : typeof Uint8Array < "u" ? "array" : "string";
  if (t.compression && (r.compression = "DEFLATE"), t.password)
    r.type = n;
  else
    switch (t.type) {
      case "base64":
        r.type = "base64";
        break;
      case "binary":
        r.type = "string";
        break;
      case "string":
        throw new Error("'string' output type invalid for '" + t.bookType + "' files");
      case "buffer":
      case "file":
        r.type = n;
        break;
      default:
        throw new Error("Unrecognized type " + t.type);
    }
  var a = e.FullPaths ? Ee.write(e, { fileType: "zip", type: { nodebuffer: "buffer", string: "binary" }[r.type] || r.type, compression: !!t.compression }) : e.generate(r);
  if (typeof Deno < "u" && typeof a == "string") {
    if (t.type == "binary" || t.type == "base64")
      return a;
    a = new Uint8Array(Cn(a));
  }
  return t.password && typeof encrypt_agile < "u" ? _s(encrypt_agile(a, t.password), t) : t.type === "file" ? jt(t.file, a) : t.type == "string" ? Nt(a) : a;
}
function B2(e, t) {
  var r = t || {}, n = Zx(e, r);
  return _s(n, r);
}
function Ar(e, t, r) {
  r || (r = "");
  var n = r + e;
  switch (t.type) {
    case "base64":
      return bt(Dr(n));
    case "binary":
      return Dr(n);
    case "string":
      return e;
    case "file":
      return jt(t.file, n, "utf8");
    case "buffer":
      return de ? Lr(n, "utf8") : typeof TextEncoder < "u" ? new TextEncoder().encode(n) : Ar(n, { type: "binary" }).split("").map(function(a) {
        return a.charCodeAt(0);
      });
  }
  throw new Error("Unrecognized type " + t.type);
}
function M2(e, t) {
  switch (t.type) {
    case "base64":
      return bt(e);
    case "binary":
      return e;
    case "string":
      return e;
    case "file":
      return jt(t.file, e, "binary");
    case "buffer":
      return de ? Lr(e, "binary") : e.split("").map(function(r) {
        return r.charCodeAt(0);
      });
  }
  throw new Error("Unrecognized type " + t.type);
}
function sn(e, t) {
  switch (t.type) {
    case "string":
    case "base64":
    case "binary":
      for (var r = "", n = 0; n < e.length; ++n)
        r += String.fromCharCode(e[n]);
      return t.type == "base64" ? bt(r) : t.type == "string" ? Nt(r) : r;
    case "file":
      return jt(t.file, e);
    case "buffer":
      return e;
    default:
      throw new Error("Unrecognized type " + t.type);
  }
}
function Ts(e, t) {
  ol(), wx(e);
  var r = tr(t || {});
  if (r.cellStyles && (r.cellNF = !0, r.sheetStubs = !0), r.type == "array") {
    r.type = "binary";
    var n = Ts(e, r);
    return r.type = "array", Cn(n);
  }
  var a = 0;
  if (r.sheet && (typeof r.sheet == "number" ? a = r.sheet : a = e.SheetNames.indexOf(r.sheet), !e.SheetNames[a]))
    throw new Error("Sheet not found: " + r.sheet + " : " + typeof r.sheet);
  switch (r.bookType || "xlsb") {
    case "xml":
    case "xlml":
      return Ar(qx(e, r), r);
    case "slk":
    case "sylk":
      return Ar(_c.from_sheet(e.Sheets[e.SheetNames[a]], r), r);
    case "htm":
    case "html":
      return Ar(ps(e.Sheets[e.SheetNames[a]], r), r);
    case "txt":
      return M2(Es(e.Sheets[e.SheetNames[a]], r), r);
    case "csv":
      return Ar(O0(e.Sheets[e.SheetNames[a]], r), r, "\uFEFF");
    case "dif":
      return Ar(Tc.from_sheet(e.Sheets[e.SheetNames[a]], r), r);
    case "dbf":
      return sn(gc.from_sheet(e.Sheets[e.SheetNames[a]], r), r);
    case "prn":
      return Ar(Ec.from_sheet(e.Sheets[e.SheetNames[a]], r), r);
    case "rtf":
      return Ar(Oc.from_sheet(e.Sheets[e.SheetNames[a]], r), r);
    case "eth":
      return Ar(Gi.from_sheet(e.Sheets[e.SheetNames[a]], r), r);
    case "fods":
      return Ar(gs(e, r), r);
    case "wk1":
      return sn(Sa.sheet_to_wk1(e.Sheets[e.SheetNames[a]], r), r);
    case "wk3":
      return sn(Sa.book_to_wk3(e, r), r);
    case "biff2":
      r.biff || (r.biff = 2);
    case "biff3":
      r.biff || (r.biff = 3);
    case "biff4":
      return r.biff || (r.biff = 4), sn(ds(e, r), r);
    case "biff5":
      r.biff || (r.biff = 5);
    case "biff8":
    case "xla":
    case "xls":
      return r.biff || (r.biff = 8), B2(e, r);
    case "xlsx":
    case "xlsm":
    case "xlam":
    case "xlsb":
    case "numbers":
    case "ods":
      return P2(e, r);
    default:
      throw new Error("Unrecognized bookType |" + r.bookType + "|");
  }
}
function b2(e, t, r, n, a, i, s, f) {
  var c = Xe(r), l = f.defval, o = f.raw || !Object.prototype.hasOwnProperty.call(f, "raw"), u = !0, h = a === 1 ? [] : {};
  if (a !== 1)
    if (Object.defineProperty)
      try {
        Object.defineProperty(h, "__rowNum__", { value: r, enumerable: !1 });
      } catch {
        h.__rowNum__ = r;
      }
    else
      h.__rowNum__ = r;
  if (!s || e[r])
    for (var d = t.s.c; d <= t.e.c; ++d) {
      var g = s ? e[r][d] : e[n[d] + c];
      if (g === void 0 || g.t === void 0) {
        if (l === void 0)
          continue;
        i[d] != null && (h[i[d]] = l);
        continue;
      }
      var x = g.v;
      switch (g.t) {
        case "z":
          if (x == null)
            break;
          continue;
        case "e":
          x = x == 0 ? null : void 0;
          break;
        case "s":
        case "d":
        case "b":
        case "n":
          break;
        default:
          throw new Error("unrecognized type " + g.t);
      }
      if (i[d] != null) {
        if (x == null)
          if (g.t == "e" && x === null)
            h[i[d]] = null;
          else if (l !== void 0)
            h[i[d]] = l;
          else if (o && x === null)
            h[i[d]] = null;
          else
            continue;
        else
          h[i[d]] = o && (g.t !== "n" || g.t === "n" && f.rawNumbers !== !1) ? x : Pr(g, x, f);
        x != null && (u = !1);
      }
    }
  return { row: h, isempty: u };
}
function yn(e, t) {
  if (e == null || e["!ref"] == null)
    return [];
  var r = { t: "n", v: 0 }, n = 0, a = 1, i = [], s = 0, f = "", c = { s: { r: 0, c: 0 }, e: { r: 0, c: 0 } }, l = t || {}, o = l.range != null ? l.range : e["!ref"];
  switch (l.header === 1 ? n = 1 : l.header === "A" ? n = 2 : Array.isArray(l.header) ? n = 3 : l.header == null && (n = 0), typeof o) {
    case "string":
      c = Se(o);
      break;
    case "number":
      c = Se(e["!ref"]), c.s.r = o;
      break;
    default:
      c = o;
  }
  n > 0 && (a = 0);
  var u = Xe(c.s.r), h = [], d = [], g = 0, x = 0, m = Array.isArray(e), O = c.s.r, A = 0, y = {};
  m && !e[O] && (e[O] = []);
  var R = l.skipHidden && e["!cols"] || [], X = l.skipHidden && e["!rows"] || [];
  for (A = c.s.c; A <= c.e.c; ++A)
    if (!(R[A] || {}).hidden)
      switch (h[A] = ze(A), r = m ? e[O][A] : e[h[A] + u], n) {
        case 1:
          i[A] = A - c.s.c;
          break;
        case 2:
          i[A] = h[A];
          break;
        case 3:
          i[A] = l.header[A - c.s.c];
          break;
        default:
          if (r == null && (r = { w: "__EMPTY", t: "s" }), f = s = Pr(r, null, l), x = y[s] || 0, !x)
            y[s] = 1;
          else {
            do
              f = s + "_" + x++;
            while (y[f]);
            y[s] = x, y[f] = 1;
          }
          i[A] = f;
      }
  for (O = c.s.r + a; O <= c.e.r; ++O)
    if (!(X[O] || {}).hidden) {
      var Q = b2(e, c, O, h, n, i, m, l);
      (Q.isempty === !1 || (n === 1 ? l.blankrows !== !1 : !!l.blankrows)) && (d[g++] = Q.row);
    }
  return d.length = g, d;
}
var ka = /"/g;
function U2(e, t, r, n, a, i, s, f) {
  for (var c = !0, l = [], o = "", u = Xe(r), h = t.s.c; h <= t.e.c; ++h)
    if (!!n[h]) {
      var d = f.dense ? (e[r] || [])[h] : e[n[h] + u];
      if (d == null)
        o = "";
      else if (d.v != null) {
        c = !1, o = "" + (f.rawNumbers && d.t == "n" ? d.v : Pr(d, null, f));
        for (var g = 0, x = 0; g !== o.length; ++g)
          if ((x = o.charCodeAt(g)) === a || x === i || x === 34 || f.forceQuotes) {
            o = '"' + o.replace(ka, '""') + '"';
            break;
          }
        o == "ID" && (o = '"ID"');
      } else
        d.f != null && !d.F ? (c = !1, o = "=" + d.f, o.indexOf(",") >= 0 && (o = '"' + o.replace(ka, '""') + '"')) : o = "";
      l.push(o);
    }
  return f.blankrows === !1 && c ? null : l.join(s);
}
function O0(e, t) {
  var r = [], n = t == null ? {} : t;
  if (e == null || e["!ref"] == null)
    return "";
  var a = Se(e["!ref"]), i = n.FS !== void 0 ? n.FS : ",", s = i.charCodeAt(0), f = n.RS !== void 0 ? n.RS : `
`, c = f.charCodeAt(0), l = new RegExp((i == "|" ? "\\|" : i) + "+$"), o = "", u = [];
  n.dense = Array.isArray(e);
  for (var h = n.skipHidden && e["!cols"] || [], d = n.skipHidden && e["!rows"] || [], g = a.s.c; g <= a.e.c; ++g)
    (h[g] || {}).hidden || (u[g] = ze(g));
  for (var x = 0, m = a.s.r; m <= a.e.r; ++m)
    (d[m] || {}).hidden || (o = U2(e, a, m, u, s, c, i, n), o != null && (n.strip && (o = o.replace(l, "")), (o || n.blankrows !== !1) && r.push((x++ ? f : "") + o)));
  return delete n.dense, r.join("");
}
function Es(e, t) {
  t || (t = {}), t.FS = "	", t.RS = `
`;
  var r = O0(e, t);
  return r;
}
function H2(e) {
  var t = "", r, n = "";
  if (e == null || e["!ref"] == null)
    return [];
  var a = Se(e["!ref"]), i = "", s = [], f, c = [], l = Array.isArray(e);
  for (f = a.s.c; f <= a.e.c; ++f)
    s[f] = ze(f);
  for (var o = a.s.r; o <= a.e.r; ++o)
    for (i = Xe(o), f = a.s.c; f <= a.e.c; ++f)
      if (t = s[f] + i, r = l ? (e[o] || [])[f] : e[t], n = "", r !== void 0) {
        if (r.F != null) {
          if (t = r.F, !r.f)
            continue;
          n = r.f, t.indexOf(":") == -1 && (t = t + ":" + t);
        }
        if (r.f != null)
          n = r.f;
        else {
          if (r.t == "z")
            continue;
          if (r.t == "n" && r.v != null)
            n = "" + r.v;
          else if (r.t == "b")
            n = r.v ? "TRUE" : "FALSE";
          else if (r.w !== void 0)
            n = "'" + r.w;
          else {
            if (r.v === void 0)
              continue;
            r.t == "s" ? n = "'" + r.v : n = "" + r.v;
          }
        }
        c[c.length] = t + "=" + n;
      }
  return c;
}
function ws(e, t, r) {
  var n = r || {}, a = +!n.skipHeader, i = e || {}, s = 0, f = 0;
  if (i && n.origin != null)
    if (typeof n.origin == "number")
      s = n.origin;
    else {
      var c = typeof n.origin == "string" ? Me(n.origin) : n.origin;
      s = c.r, f = c.c;
    }
  var l, o = { s: { c: 0, r: 0 }, e: { c: f, r: s + t.length - 1 + a } };
  if (i["!ref"]) {
    var u = Se(i["!ref"]);
    o.e.c = Math.max(o.e.c, u.e.c), o.e.r = Math.max(o.e.r, u.e.r), s == -1 && (s = u.e.r + 1, o.e.r = s + t.length - 1 + a);
  } else
    s == -1 && (s = 0, o.e.r = t.length - 1 + a);
  var h = n.header || [], d = 0;
  t.forEach(function(x, m) {
    je(x).forEach(function(O) {
      (d = h.indexOf(O)) == -1 && (h[d = h.length] = O);
      var A = x[O], y = "z", R = "", X = _e({ c: f + d, r: s + m + a });
      l = Vt(i, X), A && typeof A == "object" && !(A instanceof Date) ? i[X] = A : (typeof A == "number" ? y = "n" : typeof A == "boolean" ? y = "b" : typeof A == "string" ? y = "s" : A instanceof Date ? (y = "d", n.cellDates || (y = "n", A = rr(A)), R = n.dateNF || Oe[14]) : A === null && n.nullError && (y = "e", A = 0), l ? (l.t = y, l.v = A, delete l.w, delete l.R, R && (l.z = R)) : i[X] = l = { t: y, v: A }, R && (l.z = R));
    });
  }), o.e.c = Math.max(o.e.c, f + h.length - 1);
  var g = Xe(s);
  if (a)
    for (d = 0; d < h.length; ++d)
      i[ze(d + f) + g] = { t: "s", v: h[d] };
  return i["!ref"] = ke(o), i;
}
function W2(e, t) {
  return ws(null, e, t);
}
function Vt(e, t, r) {
  if (typeof t == "string") {
    if (Array.isArray(e)) {
      var n = Me(t);
      return e[n.r] || (e[n.r] = []), e[n.r][n.c] || (e[n.r][n.c] = { t: "z" });
    }
    return e[t] || (e[t] = { t: "z" });
  }
  return typeof t != "number" ? Vt(e, _e(t)) : Vt(e, _e({ r: t, c: r || 0 }));
}
function V2(e, t) {
  if (typeof t == "number") {
    if (t >= 0 && e.SheetNames.length > t)
      return t;
    throw new Error("Cannot find sheet # " + t);
  } else if (typeof t == "string") {
    var r = e.SheetNames.indexOf(t);
    if (r > -1)
      return r;
    throw new Error("Cannot find sheet name |" + t + "|");
  } else
    throw new Error("Cannot find sheet |" + t + "|");
}
function G2() {
  return { SheetNames: [], Sheets: {} };
}
function X2(e, t, r, n) {
  var a = 1;
  if (!r)
    for (; a <= 65535 && e.SheetNames.indexOf(r = "Sheet" + a) != -1; ++a, r = void 0)
      ;
  if (!r || e.SheetNames.length >= 65535)
    throw new Error("Too many worksheets");
  if (n && e.SheetNames.indexOf(r) >= 0) {
    var i = r.match(/(^.*?)(\d+)$/);
    a = i && +i[2] || 0;
    var s = i && i[1] || r;
    for (++a; a <= 65535 && e.SheetNames.indexOf(r = s + a) != -1; ++a)
      ;
  }
  if (us(r), e.SheetNames.indexOf(r) >= 0)
    throw new Error("Worksheet with name |" + r + "| already exists!");
  return e.SheetNames.push(r), e.Sheets[r] = t, r;
}
function j2(e, t, r) {
  e.Workbook || (e.Workbook = {}), e.Workbook.Sheets || (e.Workbook.Sheets = []);
  var n = V2(e, t);
  switch (e.Workbook.Sheets[n] || (e.Workbook.Sheets[n] = {}), r) {
    case 0:
    case 1:
    case 2:
      break;
    default:
      throw new Error("Bad sheet visibility setting " + r);
  }
  e.Workbook.Sheets[n].Hidden = r;
}
function $2(e, t) {
  return e.z = t, e;
}
function Ss(e, t, r) {
  return t ? (e.l = { Target: t }, r && (e.l.Tooltip = r)) : delete e.l, e;
}
function z2(e, t, r) {
  return Ss(e, "#" + t, r);
}
function K2(e, t, r) {
  e.c || (e.c = []), e.c.push({ t, a: r || "SheetJS" });
}
function Y2(e, t, r, n) {
  for (var a = typeof t != "string" ? t : Se(t), i = typeof t == "string" ? t : ke(t), s = a.s.r; s <= a.e.r; ++s)
    for (var f = a.s.c; f <= a.e.c; ++f) {
      var c = Vt(e, s, f);
      c.t = "n", c.F = i, delete c.v, s == a.s.r && f == a.s.c && (c.f = r, n && (c.D = !0));
    }
  return e;
}
var Na = {
  encode_col: ze,
  encode_row: Xe,
  encode_cell: _e,
  encode_range: ke,
  decode_col: m0,
  decode_row: v0,
  split_cell: co,
  decode_cell: Me,
  decode_range: cr,
  format_cell: Pr,
  sheet_add_aoa: Si,
  sheet_add_json: ws,
  sheet_add_dom: vs,
  aoa_to_sheet: wt,
  json_to_sheet: W2,
  table_to_sheet: ms,
  table_to_book: T2,
  sheet_to_csv: O0,
  sheet_to_txt: Es,
  sheet_to_json: yn,
  sheet_to_html: ps,
  sheet_to_formulae: H2,
  sheet_to_row_object_array: yn,
  sheet_get_cell: Vt,
  book_new: G2,
  book_append_sheet: X2,
  book_set_sheet_visibility: j2,
  cell_set_number_format: $2,
  cell_set_hyperlink: Ss,
  cell_set_internal_link: z2,
  cell_add_comment: K2,
  sheet_set_array_formula: Y2,
  consts: {
    SHEET_VISIBLE: 0,
    SHEET_HIDDEN: 1,
    SHEET_VERY_HIDDEN: 2
  }
};
function q2(e) {
  const t = {}, r = {
    s: {
      c: 1e7,
      r: 1e7
    },
    e: {
      c: 0,
      r: 0
    }
  };
  for (let n = 0; n != e.length; ++n)
    for (let a = 0; a != e[n].length; ++a) {
      r.s.r > n && (r.s.r = n), r.s.c > a && (r.s.c = a), r.e.r < n && (r.e.r = n), r.e.c < a && (r.e.c = a);
      const i = {
        v: e[n][a]
      };
      if (i.v == null)
        continue;
      const s = Na.encode_cell({
        c: a,
        r: n
      });
      typeof i.v == "number" ? i.t = "n" : typeof i.v == "boolean" ? i.t = "b" : i.t = "s", t[s] = i;
    }
  return r.s.c < 1e7 && (t["!ref"] = Na.encode_range(r)), t;
}
class J2 {
  constructor() {
    Hn(this, "SheetNames", []);
    Hn(this, "Sheets", {});
  }
}
const Z2 = (e) => {
  const t = new ArrayBuffer(e.length), r = new Uint8Array(t);
  for (let n = 0; n < e.length; ++n)
    r[n] = e.charCodeAt(n) & 255;
  return t;
}, Q2 = ({ header: e, data: t, filename: r }) => {
  t = Qe(t), t.unshift(e);
  const n = "SheetJS", a = new J2(), i = q2(t), s = t.map((l) => l.map((o) => o == null ? {
    wch: 10
  } : o.toString().charCodeAt(0) > 255 ? {
    wch: o.toString().length * 2
  } : {
    wch: o.toString().length
  }));
  let f = s[0];
  for (let l = 1; l < s.length; l++)
    for (let o = 0; o < s[l].length; o++)
      f[o].wch < s[l][o].wch && (f[o].wch = s[l][o].wch);
  i["!cols"] = f, a.SheetNames.push(n), a.Sheets[n] = i;
  const c = Ts(a, {
    bookType: "xlsx",
    bookSST: !1,
    type: "binary"
  });
  Ga.exports.saveAs(
    new Blob([Z2(c)], {
      type: "application/octet-stream"
    }),
    `${r}.xlsx`
  );
}, _d = async ({ filename: e, tableHead: t, tableData: r }) => {
  const n = (c) => {
    let l = /<\/?.+?\/?>/g;
    return l.test(c) ? c.replace(l, "") : c;
  }, a = async (c, l) => {
    const o = [];
    for (const u of l) {
      const h = [], d = c.length;
      for (let g = 0; g < d; g++) {
        const x = c[g];
        let m = u[x.prop];
        if (x.render) {
          const O = x.render(u, g);
          O && Array.isArray(O.children) && O.children.length > 1 && O.children.forEach((A) => {
            A && typeof A.children == "string" && (A.children += `
`);
          }), m = await Va(O);
        }
        m = n(m), h.push(m);
      }
      o.push(h);
    }
    return o;
  }, i = t.filter((c) => !c.only_display), s = i.map((c) => c.label), f = pf({
    lock: !0,
    text: "\u6570\u636E\u5BFC\u51FA\u4E2D...",
    background: "rgba(0, 0, 0, 0.7)"
  });
  return new Promise((c) => {
    setTimeout(async () => {
      const l = await a(i, r);
      await Q2({
        header: s,
        data: l,
        filename: e
      }), f.close(), cn.success("\u5BFC\u51FA\u6210\u529F\uFF01"), c(!0);
    }, 500);
  });
}, Td = (e, t = 60, r = "\u83B7\u53D6\u9A8C\u8BC1\u7801") => {
  const n = ue(t), a = ue(r), i = ue(), s = () => {
    n.value--, a.value = `${n.value} \u79D2\u540E\u91CD\u8BD5`, i.value = setInterval(() => {
      n.value > 0 ? (n.value--, a.value = `${n.value} \u79D2\u540E\u91CD\u8BD5`) : f();
    }, 1e3);
  }, f = () => {
    n.value = t, a.value = r, clearInterval(i.value);
  }, c = ue(!1), l = () => {
    c.value = !0;
  };
  return {
    getCode: () => {
      n.value === t && l();
    },
    tip: a,
    showSlider: c,
    pass: async () => {
      console.log("\u9A8C\u8BC1\u901A\u8FC7"), c.value = !1, await e(), s();
    },
    cancel: () => {
      console.log("\u53D6\u6D88\u9A8C\u8BC1"), c.value = !1;
    }
  };
}, ed = (e, t = 9999) => {
  var a;
  const r = document.createElement("div"), n = W(Hf, {
    onDestroy: () => {
      document.body.removeChild(r);
    },
    zIndex: t
  });
  Ys(n, r), document.body.appendChild(r), (a = n.component.exposed) == null || a.show(e);
}, rd = (e, t, r = "enter") => {
  e.key.toLocaleLowerCase() === r && (e.preventDefault(), t());
}, Ed = (e, t) => {
  const r = ue(Qe(e));
  return {
    query: r,
    reset: () => {
      r.value = Qe(e), t();
    }
  };
}, wd = (e) => {
  const t = ue(!1), r = ue(""), n = ue([]), a = async (s) => {
    s = s.trim();
    const f = await e(s);
    f && (n.value = f);
  }, i = ue(!1);
  return {
    loading: t,
    search: a,
    searchStr: r,
    options: n,
    init: i
  };
};
export {
  Uf as YoungDateRange,
  ud as YoungDialog,
  Hf as YoungImageViewer,
  cd as YoungPagination,
  pd as YoungRotateTip,
  dd as YoungSearchForm,
  Bf as YoungSelect,
  od as YoungTable,
  vd as YoungTablePro,
  xd as YoungTimeRange,
  md as YoungUpload,
  hd as YoungWeekday,
  V0 as useAutoLoad,
  _d as useExport2Excel,
  gd as useFormMode,
  ed as useImagePreview,
  rd as useKeyUp,
  Ed as useQuery,
  wd as useRemoteSearch,
  Td as useVerifyCode
};
//# sourceMappingURL=index.es.js.map
