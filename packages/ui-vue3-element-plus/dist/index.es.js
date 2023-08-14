var Ks = Object.defineProperty;
var qs = (e, r, t) => r in e ? Ks(e, r, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[r] = t;
var Gn = (e, r, t) => (qs(e, typeof r != "symbol" ? r + "" : r, t), t);
import { defineComponent as tt, onMounted as oi, ref as he, onActivated as Wa, nextTick as It, watchEffect as wr, createVNode as U, mergeProps as Pe, Fragment as Vt, createTextVNode as Qe, isVNode as In, computed as er, watch as ri, Teleport as Js, reactive as Zs, openBlock as Qr, createElementBlock as en, withDirectives as Yi, createElementVNode as Ne, normalizeStyle as tn, vShow as Gi, createCommentVNode as $n, normalizeClass as Qs, toDisplayString as $i, initDirectivesForSSR as eo, createApp as to, ssrContextKey as Xa, warn as hn, Static as ro, Comment as no, Text as io, ssrUtils as Va, render as ao } from "vue";
import { deepClone as rt, randomId as Yr, recentDay as so, isArray as oo } from "@bluesyoung/utils";
import { ElTable as Ya, ElTableColumn as un, ElTooltip as xn, ElPopover as fo, ElCheckboxGroup as Ga, ElCheckbox as $a, ElPagination as lo, ElDialog as co, ElButton as Rt, ElMessageBox as fi, ElSelect as ho, ElOption as uo, ElTimeSelect as zi, ElTimePicker as xo, ElDatePicker as po, ElImageViewer as go, ElForm as vo, ElInput as mo, ElInputNumber as _o, ElFormItem as wo, ElOverlay as To, ElSwitch as Eo, ElDrawer as So, ElMessage as dn, ElUpload as yo, ElLoadingService as Ao } from "element-plus";
import { useMediaQuery as kn, useEventListener as li, useWindowSize as Co, useLocalStorage as Fo, useIntersectionObserver as Oo } from "@vueuse/core";
import Do from "sortablejs";
import { makeMap as Io, isPromise as ci, isFunction as ko, NOOP as ji, isString as Tr, escapeHtmlComment as Ro, escapeHtml as Xt, isVoidTag as No, isOn as Lo, isSVGTag as Po, propsToAttrMap as Mo, isBooleanAttr as Bo, includeBooleanAttr as bo, isSSRSafeAttrName as Uo, normalizeClass as Ho, normalizeStyle as Wo, stringifyStyle as Xo, isArray as Vo } from "@vue/shared";
function Yo(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !In(e);
}
const Lp = tt({
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
    emit: r,
    attrs: t,
    slots: n
  }) {
    oi(async () => {
      if (e.rowDraggable) {
        const {
          default: f
        } = await import("sortablejs");
        if (e.rowDraggable) {
          const l = i.value.$el.querySelector("tbody");
          l.style.cursor = "move", new f(l, {
            animation: 150,
            onEnd: ({
              oldIndex: h,
              newIndex: x
            }) => {
              if (h === x)
                return;
              const d = o.value, v = rt(d[h]);
              d.splice(h, 1), d.splice(x, 0, v), r("row-drag-change", o.value);
            }
          });
        }
      }
    });
    const i = he();
    Wa(() => {
      It(() => {
        i.value.doLayout();
      });
    });
    const a = he([]), s = he([]), o = he([]);
    wr(() => {
      const f = e.tableData, l = e.tableHead, h = f.length;
      It(() => {
        s.value = l.filter((d) => !d.only_export);
        const x = 50;
        if (h <= x)
          a.value = rt(f), o.value = rt(f);
        else {
          const {
            elArr: d,
            load: v
          } = qi(a, he(f), x), {
            elArr: u,
            load: g
          } = qi(o, he(f), x);
          let S = 0;
          a.value = f.slice(S, x), o.value = f.slice(S, x), It(() => {
            d.value = i.value.$el.querySelector("tbody").children, v();
          }), It(() => {
            u.value = i.value.$el.querySelector("tbody").children, g();
          });
        }
      });
    });
    const c = (f) => {
      s.value = e.tableHead.filter((l) => !l.only_export && f.includes(l.prop));
    };
    return () => U("div", {
      style: {
        position: "relative"
      }
    }, [U(Ya, Pe(t, {
      ref: i,
      data: a.value,
      style: {
        width: "100%"
      },
      height: e.tableHeight
    }), {
      default: () => {
        var f, l;
        return [e.selectable && U(un, {
          type: "selection",
          width: "55"
        }, null), s.value.map((h, x) => {
          var d;
          return U(un, {
            key: x,
            prop: h.prop,
            label: h.label,
            width: h.width || "",
            sortable: h.sortable || !1,
            fixed: h.fixed || !1,
            align: h.aligin || "left",
            showOverflowTooltip: (d = h.show_overflow_tooltip) != null ? d : !0
          }, {
            header: (v) => s.value[x].tool_content ? U("div", {
              style: {
                display: h.sortable ? "inline-block" : "flex",
                justifyContent: "center",
                alignItems: "center"
              }
            }, [U("span", null, [v.column.label]), U(xn, {
              placement: "bottom"
            }, {
              default: () => [U("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                width: "1.2em",
                height: "1.2em",
                viewBox: "0 0 256 256"
              }, [U("path", {
                fill: "currentColor",
                d: "M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24Zm0 168a12 12 0 1 1 12-12a12 12 0 0 1-12 12Zm8-48.72v.72a8 8 0 0 1-16 0v-8a8 8 0 0 1 8-8c13.23 0 24-9 24-20s-10.77-20-24-20s-24 9-24 20v4a8 8 0 0 1-16 0v-4c0-19.85 17.94-36 40-36s40 16.15 40 36c0 17.38-13.76 31.93-32 35.28Z"
              }, null)])],
              content: () => s.value[x].tool_content
            })]) : U("span", null, [v.column.label]),
            default: (v) => h.render ? h.render(v.row, v.$index) : U("span", null, [v.row[h.prop]])
          });
        }), (f = n.switch) == null ? void 0 : f.call(n), (l = n.operate) == null ? void 0 : l.call(n)];
      }
    }), e.enableCustomHead && U(fo, {
      trigger: "click",
      placement: "bottom-end",
      width: 200
    }, {
      reference: () => U("div", {
        style: {
          position: "absolute",
          top: 0,
          right: 0,
          zIndex: 2,
          cursor: "pointer"
        },
        title: "\u8868\u5934\u914D\u7F6E"
      }, [U("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "1.5rem",
        height: "1.5rem",
        viewBox: "0 0 24 24"
      }, [U("path", {
        fill: "currentColor",
        d: "M13.875 22h-3.75q-.375 0-.65-.25t-.325-.625l-.3-2.325q-.325-.125-.613-.3t-.562-.375l-2.175.9q-.35.125-.7.025t-.55-.425L2.4 15.4q-.2-.325-.125-.7t.375-.6l1.875-1.425Q4.5 12.5 4.5 12.337v-.674q0-.163.025-.338L2.65 9.9q-.3-.225-.375-.6t.125-.7l1.85-3.225q.175-.35.537-.438t.713.038l2.175.9q.275-.2.575-.375t.6-.3l.3-2.325q.05-.375.325-.625t.65-.25h3.75q.375 0 .65.25t.325.625l.3 2.325q.325.125.613.3t.562.375l2.175-.9q.35-.125.7-.025t.55.425L21.6 8.6q.2.325.125.7t-.375.6l-1.875 1.425q.025.175.025.338v.674q0 .163-.05.338l1.875 1.425q.3.225.375.6t-.125.7l-1.85 3.2q-.2.325-.563.438t-.712-.013l-2.125-.9q-.275.2-.575.375t-.6.3l-.3 2.325q-.05.375-.325.625t-.65.25Zm-1.825-6.5q1.45 0 2.475-1.025T15.55 12q0-1.45-1.025-2.475T12.05 8.5q-1.475 0-2.488 1.025T8.55 12q0 1.45 1.012 2.475T12.05 15.5Zm0-2q-.625 0-1.063-.438T10.55 12q0-.625.438-1.063t1.062-.437q.625 0 1.063.438T13.55 12q0 .625-.438 1.063t-1.062.437ZM12 12Zm-1 8h1.975l.35-2.65q.775-.2 1.438-.588t1.212-.937l2.475 1.025l.975-1.7l-2.15-1.625q.125-.35.175-.737T17.5 12q0-.4-.05-.787t-.175-.738l2.15-1.625l-.975-1.7l-2.475 1.05q-.55-.575-1.212-.962t-1.438-.588L13 4h-1.975l-.35 2.65q-.775.2-1.437.588t-1.213.937L5.55 7.15l-.975 1.7l2.15 1.6q-.125.375-.175.75t-.05.8q0 .4.05.775t.175.75l-2.15 1.625l.975 1.7l2.475-1.05q.55.575 1.213.963t1.437.587L11 20Z"
      }, null)])]),
      default: () => {
        let f;
        return U(Vt, null, [U("div", {
          style: {
            marginBottom: "10px",
            textAlign: "center",
            fontWeight: "bold"
          }
        }, [Qe("\u81EA\u5B9A\u4E49\u5C55\u793A\u7684\u8868\u5934")]), U(Ga, {
          style: {
            maxHeight: "350px",
            overflowY: "auto"
          },
          modelValue: s.value.map((l) => l.prop),
          "onUpdate:modelValue": c
        }, Yo(f = e.tableHead.filter((l) => !l.only_export).map((l, h) => U($a, {
          label: l.prop,
          key: h,
          title: l.label
        }, {
          default: () => [l.label]
        }))) ? f : {
          default: () => [f]
        })]);
      }
    })]);
  }
}), zn = {
  type: Number,
  required: !0
}, Pp = tt({
  props: {
    total: zn,
    page: zn,
    limit: zn,
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
    emit: r,
    attrs: t
  }) {
    const n = (s) => {
      r("update:page", 1), r("update:limit", s), r("page-change");
    }, i = (s) => {
      r("update:page", s), r("page-change");
    }, a = kn("(max-width: 639.9px)");
    return () => U(lo, Pe({
      style: {
        background: "white",
        paddingTop: "20px",
        display: "flex",
        flexWrap: "wrap"
      }
    }, t, {
      background: e.background,
      currentPage: e.page,
      pageSize: e.limit,
      layout: a.value ? "total, sizes, jumper" : e.layout,
      pageSizes: e.pageSizes,
      total: e.total,
      "onUpdate:page-size": (s) => n(s),
      "onUpdate:current-page": (s) => i(s)
    }), null);
  }
}), Go = tt({
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
    emit: r,
    attrs: t,
    slots: n
  }) {
    const i = he(""), a = er(() => {
      let l = "\u65B0\u5EFA";
      return e.isEdit && (l = "\u7F16\u8F91"), e.isMore && (l = "\u8BE6\u60C5"), l;
    }), s = er({
      get: () => e.isAdd || e.isMore || e.isEdit,
      set: (l) => null
    });
    e.diffForm && ri(() => s.value, (l, h) => {
      l && !h && (i.value = JSON.stringify(e.diffForm));
    }), e.diffForm && ri(() => e.modelValue, (l, h) => {
      l && !h && (i.value = JSON.stringify(e.diffForm));
    });
    const o = async () => {
      if (!(e.sureFn && await e.sureFn() === !1)) {
        if (e.isMore) {
          r("clear");
          return;
        }
        r("update:modelValue", !1), r("sure");
      }
    }, c = () => {
      const l = JSON.stringify(e.diffForm);
      if (e.isMore || !e.showCancel) {
        r("clear"), r("update:modelValue", !1);
        return;
      }
      if (e.diffForm && i.value === l) {
        r("clear"), r("update:modelValue", !1);
        return;
      } else
        fi.confirm("\u6570\u636E\u672A\u4FDD\u5B58\uFF0C\u5173\u95ED\u5C06\u4E22\u5931\u6570\u636E\uFF0C\u786E\u8BA4\u5173\u95ED\uFF1F", "\u63D0\u793A", {
          confirmButtonText: "\u786E\u8BA4",
          cancelButtonText: "\u53D6\u6D88"
        }).then(() => {
          r("update:modelValue", !1), r("clear");
        }).catch(() => null);
    }, f = kn("(max-width: 1023.9px)");
    return () => U(Js, {
      to: "body"
    }, {
      default: () => [U(co, Pe(t, {
        modelValue: e.modelValue || s.value,
        title: e.realTitle || a.value,
        width: f.value ? "96%" : e.width,
        closeOnClickModal: !0,
        closeOnPressEscape: !1,
        beforeClose: c
      }), {
        default: () => {
          var l;
          return (l = n.body) == null ? void 0 : l.call(n);
        },
        footer: () => {
          var l, h, x;
          return U(Vt, null, [(l = n.button) == null ? void 0 : l.call(n), e.showCancel && U(Rt, {
            onClick: () => c()
          }, {
            default: () => [e.cancelText]
          }), (h = n.step1) == null ? void 0 : h.call(n), (x = n.step2) == null ? void 0 : x.call(n), e.showSure && U(Rt, {
            type: "primary",
            onClick: () => o()
          }, {
            default: () => [e.sureText]
          })]);
        }
      })]
    });
  }
});
function $o(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !In(e);
}
const zo = tt({
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
    attrs: r,
    emit: t
  }) {
    const n = Yr();
    return () => {
      let i;
      return U(ho, Pe({
        modelValue: e.modelValue,
        "onUpdate:modelValue": (a) => {
          t("update:modelValue", a), t("change", a);
        }
      }, r), $o(i = e.options.map((a, s) => U(uo, Pe(a, {
        key: s + n
      }), null))) ? i : {
        default: () => [i]
      });
    };
  }
});
function Ki(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !In(e);
}
const jo = ["\u5468\u4E00", "\u5468\u4E8C", "\u5468\u4E09", "\u5468\u56DB", "\u5468\u4E94", "\u5468\u516D", "\u5468\u65E5"], Mp = tt({
  props: {
    modelValue: {
      type: Object,
      required: !0
    }
  },
  emits: ["update:modelValue", "change"],
  setup(e, {
    attrs: r,
    emit: t
  }) {
    const n = Yr(), i = (a) => {
      t("update:modelValue", a), t("change", a);
    };
    return () => {
      let a;
      return U(Ga, Pe(r, {
        modelValue: e.modelValue,
        onChange: i
      }), Ki(a = jo.map((s, o) => U($a, {
        label: o + 1,
        key: o + n
      }, Ki(s) ? s : {
        default: () => [s]
      }))) ? a : {
        default: () => [a]
      });
    };
  }
}), Bp = tt({
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
    attrs: r,
    emit: t
  }) {
    const n = he();
    wr(() => {
      e.start && e.end ? n.value = [new Date(`2022 02 02 ${e.start}`), new Date(`2022 02 02 ${e.end}${e.second ? ":59" : ""}`)] : n.value = void 0;
    });
    const i = (a) => {
      var s, o, c, f;
      if (!a)
        t("update:start", ""), t("update:end", "");
      else {
        const [l, h] = a;
        t("update:start", (o = (s = l.toLocaleString().match(/\d\d:\d\d:\d\d/)) == null ? void 0 : s[0]) != null ? o : ""), t("update:end", (f = (c = h.toLocaleString().match(/\d\d:\d\d:\d\d/)) == null ? void 0 : c[0]) != null ? f : "");
      }
      t("change");
    };
    return () => e.second ? U(xo, Pe(r, {
      modelValue: n.value,
      isRange: !0,
      startPlaceholder: "\u5F00\u59CB\u65F6\u95F4",
      endPlaceholder: "\u7ED3\u675F\u65F6\u95F4",
      "onUpdate:modelValue": i
    }), null) : U(Vt, null, [U(zi, Pe(r, {
      modelValue: e.start,
      class: "w-120px mr-2",
      maxTime: e.end,
      placeholder: "\u5F00\u59CB\u65F6\u95F4",
      start: e.startTime,
      step: e.step,
      end: e.endTime,
      "onUpdate:modelValue": (a) => t("update:start", a)
    }), null), Qe("- \xA0"), U(zi, Pe(r, {
      modelValue: e.end,
      class: "w-120px",
      minTime: e.start,
      placeholder: "\u7ED3\u675F\u65F6\u95F4",
      start: e.startTime,
      step: e.step,
      end: e.endTime,
      "onUpdate:modelValue": (a) => t("update:end", a)
    }), null)]);
  }
}), Ko = [{
  text: "\u4ECA\u5929",
  value: (() => {
    const e = new Date(), r = new Date();
    return r.setHours(0, 0, 0), e.setHours(23, 59, 59), [r, e];
  })()
}, {
  text: "\u6628\u5929",
  value: (() => {
    const e = new Date(), r = new Date();
    return e.setTime(r.getTime() - 3600 * 1e3 * 24 * 1), r.setTime(r.getTime() - 3600 * 1e3 * 24 * 1), r.setHours(0, 0, 0), e.setHours(23, 59, 59), [r, e];
  })()
}, {
  text: "\u672C\u5468",
  value: (() => {
    const e = new Date(), r = new Date();
    var t = r.getDay() || 7;
    return r.setDate(r.getDate() - t + 1), r.setHours(0, 0, 0), e.setHours(23, 59, 59), [r, e];
  })()
}, {
  text: "\u4E0A\u5468",
  value: (() => {
    const e = new Date(), r = new Date(e.getTime() - 7 * 24 * 3600 * 1e3), t = new Date(e.getTime() - 7 * 24 * 3600 * 1e3), n = r.getDay(), i = r.getDate() - n + (n === 0 ? -6 : 1), a = new Date(r.setDate(i)), s = new Date(t.setDate(i + 6));
    return a.setHours(0, 0, 0), s.setHours(23, 59, 59), [a, s];
  })()
}, {
  text: "\u672C\u6708",
  value: (() => {
    const e = new Date(), r = new Date();
    return e.setDate(1), e.setHours(0, 0, 0), r.setHours(23, 59, 59), [e, r];
  })()
}, {
  text: "\u4E0A\u6708",
  value: (() => {
    const r = new Date(), t = new Date(r.getFullYear(), r.getMonth() - 1, 1), i = new Date(r.getFullYear(), r.getMonth(), 1).getTime() - 1 * 864e5, a = new Date(i);
    return t.setHours(0, 0, 0), a.setHours(23, 59, 59), [t, a];
  })()
}, {
  text: "\u6700\u8FD17\u5929",
  value: (() => {
    const e = new Date(), r = new Date();
    return r.setTime(r.getTime() - 3600 * 1e3 * 24 * 6), r.setHours(0, 0, 0), e.setHours(23, 59, 59), [r, e];
  })()
}, {
  text: "\u6700\u8FD130\u5929",
  value: (() => {
    const e = new Date(), r = new Date();
    return r.setTime(r.getTime() - 3600 * 1e3 * 24 * 30), r.setHours(0, 0, 0), e.setHours(23, 59, 59), [r, e];
  })()
}], qo = tt({
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
    attrs: r,
    emit: t
  }) {
    const n = he();
    wr(() => {
      e.start && e.end ? e.unix ? n.value = [new Date(+e.start * 1e3), new Date(+e.end * 1e3)] : n.value = [new Date(e.start), new Date(e.end)] : n.value = null;
    });
    const i = (a) => {
      if (!a)
        t("update:start", void 0), t("update:end", void 0), n.value = null;
      else {
        const [s, o] = a;
        e.unix ? (t("update:start", Math.floor(s.getTime() / 1e3)), t("update:end", Math.floor(o.getTime() / 1e3))) : (t("update:start", s.getTime()), t("update:end", o.getTime()));
      }
    };
    return () => U(po, Pe(r, {
      modelValue: n.value,
      type: e.second ? "datetimerange" : "daterange",
      "start-placeholder": "\u5F00\u59CB\u65E5\u671F",
      "end-placeholder": "\u7ED3\u675F\u65E5\u671F",
      "default-time": so(),
      shortcuts: e.shortcuts ? oo(e.shortcuts) ? e.shortcuts : Ko : void 0,
      clearable: !0,
      "onUpdate:modelValue": (a) => i(a),
      onChange: () => t("change")
    }), null);
  }
}), Jo = tt({
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
    expose: r
  }) {
    const t = he(!1), n = Zs({
      srcList: [],
      index: 0,
      zIndex: e.zIndex
    });
    function i(f) {
      if (!!f.ctrlKey) {
        if (f.deltaY < 0)
          return f.preventDefault(), !1;
        if (f.deltaY > 0)
          return f.preventDefault(), !1;
      }
    }
    const a = li("wheel", i, {
      passive: !1
    });
    let s;
    function o(f) {
      var l;
      n.srcList = f.srcList, n.index = (l = f.index) != null ? l : 0, s = document.body.style.overflow, document.body.style.overflow = "hidden", t.value = !0;
    }
    function c() {
      a(), document.body.style.overflow = s, t.value = !1, e.onDestroy();
    }
    return r({
      show: o,
      close: c
    }), () => t.value && U(go, {
      zIndex: n.zIndex,
      initialIndex: n.index,
      urlList: n.srcList,
      hideOnClickModal: !0,
      onClose: c
    }, null);
  }
});
function Zo(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !In(e);
}
const bp = tt({
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
    attrs: r,
    emit: t,
    slots: n
  }) {
    const i = he({});
    ri(() => e.modelValue, (c) => {
      i.value = rt(c);
    }, {
      immediate: !0,
      deep: !0
    });
    const a = (c = !0) => {
      t("update:modelValue", {
        ...i.value
      }), e.fastSearch && c && e.onSearch();
    }, s = (c) => {
      const f = e.searchScheme[c];
      f.attrs || (f.attrs = {});
      const l = (u, g) => g ? U(wo, {
        label: f.tip
      }, Zo(u) ? u : {
        default: () => [u]
      }) : u, [h, x] = e.dateTimeKey, v = {
        input: () => l(U(mo, Pe({
          modelValue: i.value[c],
          "onUpdate:modelValue": (u) => {
            var g;
            return i.value[c] = (g = u == null ? void 0 : u.trim) == null ? void 0 : g.call(u);
          },
          onChange: () => a(!1),
          onKeyup: (u) => Cp(u, () => a())
        }, f.attrs), null), f.tip),
        number: (u) => l(U(_o, Pe({
          modelValue: i.value[u],
          "onUpdate:modelValue": (g) => i.value[u] = g,
          onChange: () => a(),
          style: {
            width: "120px"
          }
        }, f.attrs), null), f.tip),
        select: (u) => l(U(zo, Pe({
          modelValue: i.value[u],
          options: f.options || [],
          "onUpdate:modelValue": (g) => i.value[u] = g,
          onChange: () => a()
        }, f.attrs), null), f.tip),
        datetimerange: (u) => l(U(qo, Pe({
          start: i.value[h],
          end: i.value[x],
          "onUpdate:start": (g) => {
            i.value[h] = g;
          },
          "onUpdate:end": (g) => {
            i.value[x] = g;
          },
          onChange: a
        }, f.attrs), null), f.tip),
        custom: (u) => l(f.render(), f.tip)
      }[f.type];
      if (v)
        return v(c);
      throw new Error("unknown search form type");
    }, o = Yr();
    return () => U("div", Pe({
      style: {
        maxWidth: "100%",
        margin: "auto",
        padding: "20px"
      }
    }, r), [U(vo, {
      model: e.modelValue
    }, {
      default: () => {
        var c, f;
        return [U("div", {
          style: {
            display: "flex",
            flexWrap: "wrap",
            gap: "10px 20px"
          }
        }, [Object.keys(e.searchScheme).map((l, h) => U("div", {
          key: h + o
        }, [s(l)])), U("div", null, [(c = n.custom) == null ? void 0 : c.call(n)])]), U("div", {
          style: {
            display: "flex"
          }
        }, [U(Rt, {
          type: "primary",
          onClick: () => e.onSearch()
        }, {
          default: () => [Qe("\u641C\u7D22")]
        }), U(Rt, {
          onClick: () => e.onReset()
        }, {
          default: () => [Qe("\u91CD\u7F6E")]
        }), (f = n.btns) == null ? void 0 : f.call(n)])];
      }
    })]);
  }
}), Qo = "https://g2021-cdn.laiyouxi.com/image/21Store/laiyouxi_guid/website/landscape.png", Up = tt({
  props: {
    maxWidth: {
      type: Number,
      default: 768
    }
  },
  setup(e, {
    attrs: r
  }) {
    const t = he(), n = he(!1), i = () => n.value = !0, a = () => n.value = !1, {
      width: s,
      height: o
    } = Co(), c = er(() => s.value < o.value || s.value < e.maxWidth);
    return wr(() => {
      c.value ? i() : a();
    }), li(t, "animationend", (f) => {
      a();
    }), () => U(Vt, null, [n.value && U(To, Pe({
      mask: !0,
      style: {
        width: "100vw",
        height: "100vh"
      }
    }, r), {
      default: () => [U("div", {
        style: {
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }
      }, [U("style", null, [`
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
                `]), U("img", {
        ref: t,
        src: Qo,
        class: "rotate-tip"
      }, null), U("div", {
        style: {
          color: "white",
          marginTop: "2.5rem",
          fontSize: "1.25rem",
          lineHeight: "1.75rem"
        }
      }, [Qe("\u4E3A\u4E86\u66F4\u597D\u7684\u7528\u6237\u4F53\u9A8C\uFF0C\u8BF7\u6A2A\u5C4F\u4F7F\u7528")])])]
    })]);
  }
}), ef = tt({
  props: {
    list: {
      required: !0,
      type: Object
    }
  },
  emits: ["drag-end", "change"],
  setup(e, {
    emit: r
  }) {
    oi(() => {
      const n = document.querySelector(".young-drap-list");
      new Do(n, {
        animation: 150,
        onEnd: ({
          oldIndex: i,
          newIndex: a
        }) => {
          if (i--, a--, console.log(i, a), i === a)
            return;
          const s = e.list, o = rt(s[i]);
          s.splice(i, 1), s.splice(a, 0, o), r("drag-end", s);
        }
      });
    });
    function t(n) {
      r("change", n, !n.check);
    }
    return () => U("div", {
      class: "young-drap-list"
    }, [U("style", null, [`
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
          `]), e.list.map((n, i) => U("div", {
      class: `young-drag-list-item ${n.check ? "active" : ""}`,
      key: n.label
    }, [U("div", {
      class: "draggable",
      title: "\u62D6\u52A8\u53EF\u6392\u5E8F"
    }, [U("svg", {
      class: "icon",
      viewBox: "0 0 1024 1024",
      version: "1.1",
      xmlns: "http://www.w3.org/2000/svg",
      "p-id": "6483",
      width: "16",
      height: "16"
    }, [U("path", {
      d: "M867.995 459.647h-711.99c-27.921 0-52.353 24.434-52.353 52.353s24.434 52.353 52.353 52.353h711.99c27.921 0 52.353-24.434 52.353-52.353s-24.434-52.353-52.353-52.353z",
      "p-id": "6484"
    }, null), U("path", {
      d: "M867.995 763.291h-711.99c-27.921 0-52.353 24.434-52.353 52.353s24.434 52.353 52.353 52.353h711.99c27.921 0 52.353-24.434 52.353-52.353s-24.434-52.353-52.353-52.353z",
      "p-id": "6485"
    }, null), U("path", {
      d: "M156.005 260.709h711.99c27.921 0 52.353-24.434 52.353-52.353s-24.434-52.353-52.353-52.353h-711.99c-27.921 0-52.353 24.434-52.353 52.353s24.434 52.353 52.353 52.353z",
      "p-id": "6486"
    }, null)])]), U("div", {
      class: "label",
      onClick: (a) => {
        a.stopPropagation(), t(n);
      },
      title: n.label,
      style: {
        display: "flex",
        justifyContent: "space-between"
      },
      draggable: !1
    }, [U("span", null, [n.label]), U(Eo, {
      modelValue: n.check
    }, null)])]))]);
  }
}), tf = tt({
  props: {
    tableHead: {
      required: !0,
      type: Object
    }
  },
  emits: ["drag-end", "change", "save", "reset"],
  setup(e, {
    emit: r
  }) {
    const t = he(!1), n = (s) => {
      r("drag-end", s);
    }, i = (s, o) => {
      r("change", s, o);
    };
    oi(() => {
      li("click", (s) => {
        t.value = !1;
      });
    });
    const a = kn("(max-width: 639.9px)");
    return () => U(Vt, null, [U("div", {
      style: {
        display: "flex",
        justifyContent: "flex-end",
        paddingBottom: "10px",
        cursor: "pointer"
      },
      onClick: (s) => {
        s.stopPropagation(), t.value = !0;
      },
      title: "\u8868\u5934\u914D\u7F6E"
    }, [U("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      width: "1.5rem",
      height: "1.5rem",
      viewBox: "0 0 24 24"
    }, [U("path", {
      fill: "currentColor",
      d: "M13.875 22h-3.75q-.375 0-.65-.25t-.325-.625l-.3-2.325q-.325-.125-.613-.3t-.562-.375l-2.175.9q-.35.125-.7.025t-.55-.425L2.4 15.4q-.2-.325-.125-.7t.375-.6l1.875-1.425Q4.5 12.5 4.5 12.337v-.674q0-.163.025-.338L2.65 9.9q-.3-.225-.375-.6t.125-.7l1.85-3.225q.175-.35.537-.438t.713.038l2.175.9q.275-.2.575-.375t.6-.3l.3-2.325q.05-.375.325-.625t.65-.25h3.75q.375 0 .65.25t.325.625l.3 2.325q.325.125.613.3t.562.375l2.175-.9q.35-.125.7-.025t.55.425L21.6 8.6q.2.325.125.7t-.375.6l-1.875 1.425q.025.175.025.338v.674q0 .163-.05.338l1.875 1.425q.3.225.375.6t-.125.7l-1.85 3.2q-.2.325-.563.438t-.712-.013l-2.125-.9q-.275.2-.575.375t-.6.3l-.3 2.325q-.05.375-.325.625t-.65.25Zm-1.825-6.5q1.45 0 2.475-1.025T15.55 12q0-1.45-1.025-2.475T12.05 8.5q-1.475 0-2.488 1.025T8.55 12q0 1.45 1.012 2.475T12.05 15.5Zm0-2q-.625 0-1.063-.438T10.55 12q0-.625.438-1.063t1.062-.437q.625 0 1.063.438T13.55 12q0 .625-.438 1.063t-1.062.437ZM12 12Zm-1 8h1.975l.35-2.65q.775-.2 1.438-.588t1.212-.937l2.475 1.025l.975-1.7l-2.15-1.625q.125-.35.175-.737T17.5 12q0-.4-.05-.787t-.175-.738l2.15-1.625l-.975-1.7l-2.475 1.05q-.55-.575-1.212-.962t-1.438-.588L13 4h-1.975l-.35 2.65q-.775.2-1.437.588t-1.213.937L5.55 7.15l-.975 1.7l2.15 1.6q-.125.375-.175.75t-.05.8q0 .4.05.775t.175.75l-2.15 1.625l.975 1.7l2.475-1.05q.55.575 1.213.963t1.437.587L11 20Z"
    }, null)])]), U(So, {
      modelValue: t.value,
      withHeader: !1,
      "onUpdate:modelValue": (s) => t.value = s,
      size: a.value ? "75%" : "30%"
    }, {
      default: () => U(Vt, null, [U("div", {
        style: {
          color: "#999",
          textAlign: "center",
          padding: "10px"
        }
      }, [Qe("\u62D6\u52A8\u53EF\u6392\u5E8F\uFF0C\u70B9\u51FB\u53EF\u4EE5\u5207\u6362\u5C55\u793A\u72B6\u6001")]), U(ef, {
        list: e.tableHead,
        "onDrag-end": n,
        onChange: i
      }, null)]),
      footer: () => U("div", {
        style: {
          textAlign: "left"
        }
      }, [U(xn, {
        content: "\u4FDD\u5B58\u914D\u7F6E\u5230\u672C\u5730\uFF0C\u5982\u679C\u4E0D\u4FDD\u5B58\uFF0C\u5219\u9875\u9762\u5237\u65B0\u4E4B\u540E\u4F1A\u4E22\u5931\u73B0\u6709\u7684\u4E2A\u6027\u5316\u914D\u7F6E"
      }, {
        default: () => [U(Rt, {
          type: "primary",
          onClick: () => r("save")
        }, {
          default: () => [Qe("\u4FDD\u5B58")]
        })]
      }), U(xn, {
        content: "\u5FEB\u901F\u6062\u590D\u9ED8\u8BA4\u914D\u7F6E"
      }, {
        default: () => [U(Rt, {
          onClick: () => r("reset")
        }, {
          default: () => [Qe("\u91CD\u7F6E")]
        })]
      })])
    })]);
  }
}), Hp = tt({
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
    attrs: r,
    expose: t,
    slots: n
  }) {
    const i = he();
    Wa(() => {
      It(() => {
        i.value.doLayout();
      });
    });
    const a = he([]), s = he([]), o = he([]);
    wr(() => {
      a.value = e.tableData, It(() => {
        f();
      });
    });
    const c = Fo(`table_pro_tableHead_${e.historyId}`, {}), f = () => {
      var A, C, I, Y;
      e.history ? (s.value = (C = (A = c.value) == null ? void 0 : A.tableHead) != null ? C : [], o.value = (Y = (I = c.value) == null ? void 0 : I.tableHeadCheck) != null ? Y : [], o.value.length === 0 && l()) : l();
    }, l = () => {
      var A;
      s.value = rt(e.tableHead), o.value = (A = e.tableHeadCheck) != null && A.length ? rt(e.tableHeadCheck) : e.tableHead.map((C) => C.prop);
    }, h = er(() => s.value.map((A) => (A.check = o.value.includes(A.prop), A))), x = er(() => h.value.filter((A) => !A.only_export && A.check)), d = (A, C) => {
      const I = o.value.findIndex((Y) => Y === A.prop);
      !C && I != -1 ? o.value.splice(I, 1) : o.value.push(A.prop);
    }, v = (A) => {
      s.value = A;
    }, u = () => {
      c.value = {
        tableHead: h.value,
        tableHeadCheck: o.value
      }, dn.success("\u4FDD\u5B58\u6210\u529F");
    }, g = () => {
      fi.confirm("\u786E\u5B9A\u91CD\u7F6E\u8868\u5934\u5417\uFF1F", "\u63D0\u793A", {
        confirmButtonText: "\u786E\u5B9A",
        cancelButtonText: "\u53D6\u6D88",
        type: "warning"
      }).then(() => {
        c.value = {}, dn.success("\u91CD\u7F6E\u6210\u529F"), It(() => {
          f();
        });
      });
    }, S = Yr();
    return t({
      saveTableHead: u,
      resetTableHead: g
    }), () => U(Vt, null, [U("style", null, [`
          .nowarp {
            word-break: normal;
          }
          `]), U("div", null, [e.saveTableHead && U(tf, {
      tableHead: h.value.filter((A) => !A.only_export),
      "onDrag-end": v,
      onChange: d,
      onSave: u,
      onReset: g
    }, null), U("div", {
      style: "position: relative;"
    }, [U(Ya, Pe({
      ref: i,
      "header-cell-class-name": "nowarp",
      data: a.value,
      style: {
        width: "100%"
      },
      height: e.tableHeight,
      border: !0
    }, r), {
      default: () => {
        var A, C;
        return [e.selectable && U(un, {
          type: "selection",
          width: "55"
        }, null), x.value.map((I, Y) => {
          var Q;
          return U(un, {
            key: I.prop.toString() + Y + S,
            prop: I.prop,
            label: I.label,
            width: I.width || "",
            sortable: I.sortable || !1,
            fixed: I.fixed || !1,
            align: I.aligin || "left",
            showOverflowTooltip: (Q = I.show_overflow_tooltip) != null ? Q : !0
          }, {
            header: (D) => s.value[Y].tool_content ? U("div", {
              style: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }
            }, [U("span", {
              class: "nowarp",
              title: I.label
            }, [D.column.label]), U(xn, {
              placement: "bottom"
            }, {
              default: () => [U("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                width: "1.2em",
                height: "1.2em",
                viewBox: "0 0 256 256"
              }, [U("path", {
                fill: "currentColor",
                d: "M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24Zm0 168a12 12 0 1 1 12-12a12 12 0 0 1-12 12Zm8-48.72v.72a8 8 0 0 1-16 0v-8a8 8 0 0 1 8-8c13.23 0 24-9 24-20s-10.77-20-24-20s-24 9-24 20v4a8 8 0 0 1-16 0v-4c0-19.85 17.94-36 40-36s40 16.15 40 36c0 17.38-13.76 31.93-32 35.28Z"
              }, null)])],
              content: () => s.value[Y].tool_content
            })]) : U("span", {
              class: "nowarp",
              title: I.label
            }, [D.column.label]),
            default: ({
              row: D,
              $index: H
            }) => I.render ? I.render(D, H) : U("span", null, [D[I.prop]])
          });
        }), (A = n.switch) == null ? void 0 : A.call(n), (C = n.operate) == null ? void 0 : C.call(n)];
      }
    })])])]);
  }
}), za = {};
za.getData = (e) => new Promise((r, t) => {
  let n = {};
  rf(e).then((i) => {
    n.arrayBuffer = i, n.orientation = of(i), r(n);
  }).catch((i) => {
    t(i);
  });
});
function rf(e) {
  let r = null;
  return new Promise((t, n) => {
    if (e.src)
      if (/^data\:/i.test(e.src))
        r = af(e.src), t(r);
      else if (/^blob\:/i.test(e.src)) {
        var i = new FileReader();
        i.onload = function(s) {
          r = s.target.result, t(r);
        }, nf(e.src, function(s) {
          i.readAsArrayBuffer(s);
        });
      } else {
        var a = new XMLHttpRequest();
        a.onload = function() {
          if (this.status == 200 || this.status === 0)
            r = a.response, t(r);
          else
            throw "Could not load image";
          a = null;
        }, a.open("GET", e.src, !0), a.responseType = "arraybuffer", a.send(null);
      }
    else
      n("img error");
  });
}
function nf(e, r) {
  var t = new XMLHttpRequest();
  t.open("GET", e, !0), t.responseType = "blob", t.onload = function(n) {
    (this.status == 200 || this.status === 0) && r(this.response);
  }, t.send();
}
function af(e) {
  e = e.replace(/^data\:([^\;]+)\;base64,/gmi, "");
  for (var r = atob(e), t = r.length, n = new ArrayBuffer(t), i = new Uint8Array(n), a = 0; a < t; a++)
    i[a] = r.charCodeAt(a);
  return n;
}
function sf(e, r, t) {
  var n = "", i;
  for (i = r, t += r; i < t; i++)
    n += String.fromCharCode(e.getUint8(i));
  return n;
}
function of(e) {
  var r = new DataView(e), t = r.byteLength, n, i, a, s, o, c, f, l, h, x;
  if (r.getUint8(0) === 255 && r.getUint8(1) === 216)
    for (h = 2; h < t; ) {
      if (r.getUint8(h) === 255 && r.getUint8(h + 1) === 225) {
        f = h;
        break;
      }
      h++;
    }
  if (f && (i = f + 4, a = f + 10, sf(r, i, 4) === "Exif" && (c = r.getUint16(a), o = c === 18761, (o || c === 19789) && r.getUint16(a + 2, o) === 42 && (s = r.getUint32(a + 4, o), s >= 8 && (l = a + s)))), l) {
    for (t = r.getUint16(l, o), x = 0; x < t; x++)
      if (h = l + x * 12 + 2, r.getUint16(h, o) === 274) {
        h += 8, n = r.getUint16(h, o);
        break;
      }
  }
  return n;
}
const ff = (e, r) => {
  const t = e.__vccOpts || e;
  for (const [n, i] of r)
    t[n] = i;
  return t;
}, lf = tt({
  data: function() {
    return {
      w: 0,
      h: 0,
      scale: 1,
      x: 0,
      y: 0,
      loading: !0,
      trueWidth: 0,
      trueHeight: 0,
      move: !0,
      moveX: 0,
      moveY: 0,
      crop: !1,
      cropping: !1,
      cropW: 0,
      cropH: 0,
      cropOldW: 0,
      cropOldH: 0,
      canChangeX: !1,
      canChangeY: !1,
      changeCropTypeX: 1,
      changeCropTypeY: 1,
      cropX: 0,
      cropY: 0,
      cropChangeX: 0,
      cropChangeY: 0,
      cropOffsertX: 0,
      cropOffsertY: 0,
      support: "",
      touches: [],
      touchNow: !1,
      rotate: 0,
      isIos: !1,
      orientation: 0,
      imgs: "",
      coe: 0.2,
      scaling: !1,
      scalingSet: "",
      coeStatus: "",
      isCanShow: !0
    };
  },
  props: {
    img: {
      type: [String, Blob, null, File],
      default: ""
    },
    outputSize: {
      type: Number,
      default: 1
    },
    outputType: {
      type: String,
      default: "jpeg"
    },
    info: {
      type: Boolean,
      default: !0
    },
    canScale: {
      type: Boolean,
      default: !0
    },
    autoCrop: {
      type: Boolean,
      default: !1
    },
    autoCropWidth: {
      type: [Number, String],
      default: 0
    },
    autoCropHeight: {
      type: [Number, String],
      default: 0
    },
    fixed: {
      type: Boolean,
      default: !1
    },
    fixedNumber: {
      type: Array,
      default: () => [1, 1]
    },
    fixedBox: {
      type: Boolean,
      default: !1
    },
    full: {
      type: Boolean,
      default: !1
    },
    canMove: {
      type: Boolean,
      default: !0
    },
    canMoveBox: {
      type: Boolean,
      default: !0
    },
    original: {
      type: Boolean,
      default: !1
    },
    centerBox: {
      type: Boolean,
      default: !1
    },
    high: {
      type: Boolean,
      default: !0
    },
    infoTrue: {
      type: Boolean,
      default: !1
    },
    maxImgSize: {
      type: [Number, String],
      default: 2e3
    },
    enlarge: {
      type: [Number, String],
      default: 1
    },
    preW: {
      type: [Number, String],
      default: 0
    },
    mode: {
      type: String,
      default: "contain"
    },
    limitMinSize: {
      type: [Number, Array, String],
      default: () => 10,
      validator: function(e) {
        return Array.isArray(e) ? Number(e[0]) >= 0 && Number(e[1]) >= 0 : Number(e) >= 0;
      }
    },
    fillColor: {
      type: String,
      default: ""
    }
  },
  computed: {
    cropInfo() {
      let e = {};
      if (e.top = this.cropOffsertY > 21 ? "-21px" : "0px", e.width = this.cropW > 0 ? this.cropW : 0, e.height = this.cropH > 0 ? this.cropH : 0, this.infoTrue) {
        let r = 1;
        this.high && !this.full && (r = window.devicePixelRatio), this.enlarge !== 1 & !this.full && (r = Math.abs(Number(this.enlarge))), e.width = e.width * r, e.height = e.height * r, this.full && (e.width = e.width / this.scale, e.height = e.height / this.scale);
      }
      return e.width = e.width.toFixed(0), e.height = e.height.toFixed(0), e;
    },
    isIE() {
      return !!window.ActiveXObject || "ActiveXObject" in window;
    },
    passive() {
      return this.isIE ? null : {
        passive: !1
      };
    }
  },
  watch: {
    img() {
      this.checkedImg();
    },
    imgs(e) {
      e !== "" && this.reload();
    },
    cropW() {
      this.showPreview();
    },
    cropH() {
      this.showPreview();
    },
    cropOffsertX() {
      this.showPreview();
    },
    cropOffsertY() {
      this.showPreview();
    },
    scale(e, r) {
      this.showPreview();
    },
    x() {
      this.showPreview();
    },
    y() {
      this.showPreview();
    },
    autoCrop(e) {
      e && this.goAutoCrop();
    },
    autoCropWidth() {
      this.autoCrop && this.goAutoCrop();
    },
    autoCropHeight() {
      this.autoCrop && this.goAutoCrop();
    },
    mode() {
      this.checkedImg();
    },
    rotate() {
      this.showPreview(), this.autoCrop ? this.goAutoCrop(this.cropW, this.cropH) : (this.cropW > 0 || this.cropH > 0) && this.goAutoCrop(this.cropW, this.cropH);
    }
  },
  methods: {
    getVersion(e) {
      var r = navigator.userAgent.split(" "), t = "";
      let n = 0;
      const i = new RegExp(e, "i");
      for (var a = 0; a < r.length; a++)
        i.test(r[a]) && (t = r[a]);
      return t ? n = t.split("/")[1].split(".") : n = ["0", "0", "0"], n;
    },
    checkOrientationImage(e, r, t, n) {
      if (this.getVersion("chrome")[0] >= 81)
        r = -1;
      else if (this.getVersion("safari")[0] >= 605) {
        const s = this.getVersion("version");
        s[0] > 13 && s[1] > 1 && (r = -1);
      } else {
        const s = navigator.userAgent.toLowerCase().match(/cpu iphone os (.*?) like mac os/);
        if (s) {
          let o = s[1];
          o = o.split("_"), (o[0] > 13 || o[0] >= 13 && o[1] >= 4) && (r = -1);
        }
      }
      let i = document.createElement("canvas"), a = i.getContext("2d");
      switch (a.save(), r) {
        case 2:
          i.width = t, i.height = n, a.translate(t, 0), a.scale(-1, 1);
          break;
        case 3:
          i.width = t, i.height = n, a.translate(t / 2, n / 2), a.rotate(180 * Math.PI / 180), a.translate(-t / 2, -n / 2);
          break;
        case 4:
          i.width = t, i.height = n, a.translate(0, n), a.scale(1, -1);
          break;
        case 5:
          i.height = t, i.width = n, a.rotate(0.5 * Math.PI), a.scale(1, -1);
          break;
        case 6:
          i.width = n, i.height = t, a.translate(n / 2, t / 2), a.rotate(90 * Math.PI / 180), a.translate(-t / 2, -n / 2);
          break;
        case 7:
          i.height = t, i.width = n, a.rotate(0.5 * Math.PI), a.translate(t, -n), a.scale(-1, 1);
          break;
        case 8:
          i.height = t, i.width = n, a.translate(n / 2, t / 2), a.rotate(-90 * Math.PI / 180), a.translate(-t / 2, -n / 2);
          break;
        default:
          i.width = t, i.height = n;
      }
      a.drawImage(e, 0, 0, t, n), a.restore(), i.toBlob(
        (s) => {
          let o = URL.createObjectURL(s);
          URL.revokeObjectURL(this.imgs), this.imgs = o;
        },
        "image/" + this.outputType,
        1
      );
    },
    checkedImg() {
      if (this.img === null || this.img === "") {
        this.imgs = "", this.clearCrop();
        return;
      }
      this.loading = !0, this.scale = 1, this.rotate = 0, this.clearCrop();
      let e = new Image();
      if (e.onload = () => {
        if (this.img === "")
          return this.$emit("img-load", "error"), !1;
        let t = e.width, n = e.height;
        za.getData(e).then((i) => {
          this.orientation = i.orientation || 1;
          let a = Number(this.maxImgSize);
          if (!this.orientation && t < a & n < a) {
            this.imgs = this.img;
            return;
          }
          t > a && (n = n / t * a, t = a), n > a && (t = t / n * a, n = a), this.checkOrientationImage(e, this.orientation, t, n);
        });
      }, e.onerror = () => {
        this.$emit("img-load", "error");
      }, this.img.substr(0, 4) !== "data" && (e.crossOrigin = ""), this.isIE) {
        var r = new XMLHttpRequest();
        r.onload = function() {
          var t = URL.createObjectURL(this.response);
          e.src = t;
        }, r.open("GET", this.img, !0), r.responseType = "blob", r.send();
      } else
        e.src = this.img;
    },
    startMove(e) {
      if (e.preventDefault(), this.move && !this.crop) {
        if (!this.canMove)
          return !1;
        this.moveX = ("clientX" in e ? e.clientX : e.touches[0].clientX) - this.x, this.moveY = ("clientY" in e ? e.clientY : e.touches[0].clientY) - this.y, e.touches ? (window.addEventListener("touchmove", this.moveImg), window.addEventListener("touchend", this.leaveImg), e.touches.length == 2 && (this.touches = e.touches, window.addEventListener("touchmove", this.touchScale), window.addEventListener("touchend", this.cancelTouchScale))) : (window.addEventListener("mousemove", this.moveImg), window.addEventListener("mouseup", this.leaveImg)), this.$emit("img-moving", {
          moving: !0,
          axis: this.getImgAxis()
        });
      } else
        this.cropping = !0, window.addEventListener("mousemove", this.createCrop), window.addEventListener("mouseup", this.endCrop), window.addEventListener("touchmove", this.createCrop), window.addEventListener("touchend", this.endCrop), this.cropOffsertX = e.offsetX ? e.offsetX : e.touches[0].pageX - this.$refs.cropper.offsetLeft, this.cropOffsertY = e.offsetY ? e.offsetY : e.touches[0].pageY - this.$refs.cropper.offsetTop, this.cropX = "clientX" in e ? e.clientX : e.touches[0].clientX, this.cropY = "clientY" in e ? e.clientY : e.touches[0].clientY, this.cropChangeX = this.cropOffsertX, this.cropChangeY = this.cropOffsertY, this.cropW = 0, this.cropH = 0;
    },
    touchScale(e) {
      e.preventDefault();
      let r = this.scale;
      var t = {
        x: this.touches[0].clientX,
        y: this.touches[0].clientY
      }, n = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      }, i = {
        x: this.touches[1].clientX,
        y: this.touches[1].clientY
      }, a = {
        x: e.touches[1].clientX,
        y: e.touches[1].clientY
      }, s = Math.sqrt(
        Math.pow(t.x - i.x, 2) + Math.pow(t.y - i.y, 2)
      ), o = Math.sqrt(
        Math.pow(n.x - a.x, 2) + Math.pow(n.y - a.y, 2)
      ), c = o - s, f = 1;
      f = f / this.trueWidth > f / this.trueHeight ? f / this.trueHeight : f / this.trueWidth, f = f > 0.1 ? 0.1 : f;
      var l = f * c;
      if (!this.touchNow) {
        if (this.touchNow = !0, c > 0 ? r += Math.abs(l) : c < 0 && r > Math.abs(l) && (r -= Math.abs(l)), this.touches = e.touches, setTimeout(() => {
          this.touchNow = !1;
        }, 8), !this.checkoutImgAxis(this.x, this.y, r))
          return !1;
        this.scale = r;
      }
    },
    cancelTouchScale(e) {
      window.removeEventListener("touchmove", this.touchScale);
    },
    moveImg(e) {
      if (e.preventDefault(), e.touches && e.touches.length === 2)
        return this.touches = e.touches, window.addEventListener("touchmove", this.touchScale), window.addEventListener("touchend", this.cancelTouchScale), window.removeEventListener("touchmove", this.moveImg), !1;
      let r = "clientX" in e ? e.clientX : e.touches[0].clientX, t = "clientY" in e ? e.clientY : e.touches[0].clientY, n, i;
      n = r - this.moveX, i = t - this.moveY, this.$nextTick(() => {
        if (this.centerBox) {
          let a = this.getImgAxis(n, i, this.scale), s = this.getCropAxis(), o = this.trueHeight * this.scale, c = this.trueWidth * this.scale, f, l, h, x;
          switch (this.rotate) {
            case 1:
            case -1:
            case 3:
            case -3:
              f = this.cropOffsertX - this.trueWidth * (1 - this.scale) / 2 + (o - c) / 2, l = this.cropOffsertY - this.trueHeight * (1 - this.scale) / 2 + (c - o) / 2, h = f - o + this.cropW, x = l - c + this.cropH;
              break;
            default:
              f = this.cropOffsertX - this.trueWidth * (1 - this.scale) / 2, l = this.cropOffsertY - this.trueHeight * (1 - this.scale) / 2, h = f - c + this.cropW, x = l - o + this.cropH;
              break;
          }
          a.x1 >= s.x1 && (n = f), a.y1 >= s.y1 && (i = l), a.x2 <= s.x2 && (n = h), a.y2 <= s.y2 && (i = x);
        }
        this.x = n, this.y = i, this.$emit("img-moving", {
          moving: !0,
          axis: this.getImgAxis()
        });
      });
    },
    leaveImg(e) {
      window.removeEventListener("mousemove", this.moveImg), window.removeEventListener("touchmove", this.moveImg), window.removeEventListener("mouseup", this.leaveImg), window.removeEventListener("touchend", this.leaveImg), this.$emit("img-moving", {
        moving: !1,
        axis: this.getImgAxis()
      });
    },
    scaleImg() {
      this.canScale && window.addEventListener(this.support, this.changeSize, this.passive);
    },
    cancelScale() {
      this.canScale && window.removeEventListener(this.support, this.changeSize);
    },
    changeSize(e) {
      e.preventDefault();
      let r = this.scale;
      var t = e.deltaY || e.wheelDelta, n = navigator.userAgent.indexOf("Firefox");
      t = n > 0 ? t * 30 : t, this.isIE && (t = -t);
      var i = this.coe;
      i = i / this.trueWidth > i / this.trueHeight ? i / this.trueHeight : i / this.trueWidth;
      var a = i * t;
      a < 0 ? r += Math.abs(a) : r > Math.abs(a) && (r -= Math.abs(a));
      let s = a < 0 ? "add" : "reduce";
      if (s !== this.coeStatus && (this.coeStatus = s, this.coe = 0.2), this.scaling || (this.scalingSet = setTimeout(() => {
        this.scaling = !1, this.coe = this.coe += 0.01;
      }, 50)), this.scaling = !0, !this.checkoutImgAxis(this.x, this.y, r))
        return !1;
      this.scale = r;
    },
    changeScale(e) {
      let r = this.scale;
      e = e || 1;
      var t = 20;
      if (t = t / this.trueWidth > t / this.trueHeight ? t / this.trueHeight : t / this.trueWidth, e = e * t, e > 0 ? r += Math.abs(e) : r > Math.abs(e) && (r -= Math.abs(e)), !this.checkoutImgAxis(this.x, this.y, r))
        return !1;
      this.scale = r;
    },
    createCrop(e) {
      e.preventDefault();
      var r = "clientX" in e ? e.clientX : e.touches ? e.touches[0].clientX : 0, t = "clientY" in e ? e.clientY : e.touches ? e.touches[0].clientY : 0;
      this.$nextTick(() => {
        var n = r - this.cropX, i = t - this.cropY;
        if (n > 0 ? (this.cropW = n + this.cropChangeX > this.w ? this.w - this.cropChangeX : n, this.cropOffsertX = this.cropChangeX) : (this.cropW = this.w - this.cropChangeX + Math.abs(n) > this.w ? this.cropChangeX : Math.abs(n), this.cropOffsertX = this.cropChangeX + n > 0 ? this.cropChangeX + n : 0), !this.fixed)
          i > 0 ? (this.cropH = i + this.cropChangeY > this.h ? this.h - this.cropChangeY : i, this.cropOffsertY = this.cropChangeY) : (this.cropH = this.h - this.cropChangeY + Math.abs(i) > this.h ? this.cropChangeY : Math.abs(i), this.cropOffsertY = this.cropChangeY + i > 0 ? this.cropChangeY + i : 0);
        else {
          var a = this.cropW / this.fixedNumber[0] * this.fixedNumber[1];
          a + this.cropOffsertY > this.h ? (this.cropH = this.h - this.cropOffsertY, this.cropW = this.cropH / this.fixedNumber[1] * this.fixedNumber[0], n > 0 ? this.cropOffsertX = this.cropChangeX : this.cropOffsertX = this.cropChangeX - this.cropW) : this.cropH = a, this.cropOffsertY = this.cropOffsertY;
        }
      });
    },
    changeCropSize(e, r, t, n, i) {
      e.preventDefault(), window.addEventListener("mousemove", this.changeCropNow), window.addEventListener("mouseup", this.changeCropEnd), window.addEventListener("touchmove", this.changeCropNow), window.addEventListener("touchend", this.changeCropEnd), this.canChangeX = r, this.canChangeY = t, this.changeCropTypeX = n, this.changeCropTypeY = i, this.cropX = "clientX" in e ? e.clientX : e.touches[0].clientX, this.cropY = "clientY" in e ? e.clientY : e.touches[0].clientY, this.cropOldW = this.cropW, this.cropOldH = this.cropH, this.cropChangeX = this.cropOffsertX, this.cropChangeY = this.cropOffsertY, this.fixed && this.canChangeX && this.canChangeY && (this.canChangeY = 0), this.$emit("change-crop-size", {
        width: this.cropW,
        height: this.cropH
      });
    },
    changeCropNow(e) {
      e.preventDefault();
      var r = "clientX" in e ? e.clientX : e.touches ? e.touches[0].clientX : 0, t = "clientY" in e ? e.clientY : e.touches ? e.touches[0].clientY : 0;
      let n = this.w, i = this.h, a = 0, s = 0;
      if (this.centerBox) {
        let f = this.getImgAxis(), l = f.x2, h = f.y2;
        a = f.x1 > 0 ? f.x1 : 0, s = f.y1 > 0 ? f.y1 : 0, n > l && (n = l), i > h && (i = h);
      }
      const [o, c] = this.checkCropLimitSize();
      this.$nextTick(() => {
        var f = r - this.cropX, l = t - this.cropY;
        if (this.canChangeX && (this.changeCropTypeX === 1 ? this.cropOldW - f < o ? (this.cropW = o, this.cropOffsertX = this.cropOldW + this.cropChangeX - a - o) : this.cropOldW - f > 0 ? (this.cropW = n - this.cropChangeX - f <= n - a ? this.cropOldW - f : this.cropOldW + this.cropChangeX - a, this.cropOffsertX = n - this.cropChangeX - f <= n - a ? this.cropChangeX + f : a) : (this.cropW = Math.abs(f) + this.cropChangeX <= n ? Math.abs(f) - this.cropOldW : n - this.cropOldW - this.cropChangeX, this.cropOffsertX = this.cropChangeX + this.cropOldW) : this.changeCropTypeX === 2 && (this.cropOldW + f < o ? this.cropW = o : this.cropOldW + f > 0 ? (this.cropW = this.cropOldW + f + this.cropOffsertX <= n ? this.cropOldW + f : n - this.cropOffsertX, this.cropOffsertX = this.cropChangeX) : (this.cropW = n - this.cropChangeX + Math.abs(f + this.cropOldW) <= n - a ? Math.abs(f + this.cropOldW) : this.cropChangeX - a, this.cropOffsertX = n - this.cropChangeX + Math.abs(f + this.cropOldW) <= n - a ? this.cropChangeX - Math.abs(f + this.cropOldW) : a))), this.canChangeY && (this.changeCropTypeY === 1 ? this.cropOldH - l < c ? (this.cropH = c, this.cropOffsertY = this.cropOldH + this.cropChangeY - s - c) : this.cropOldH - l > 0 ? (this.cropH = i - this.cropChangeY - l <= i - s ? this.cropOldH - l : this.cropOldH + this.cropChangeY - s, this.cropOffsertY = i - this.cropChangeY - l <= i - s ? this.cropChangeY + l : s) : (this.cropH = Math.abs(l) + this.cropChangeY <= i ? Math.abs(l) - this.cropOldH : i - this.cropOldH - this.cropChangeY, this.cropOffsertY = this.cropChangeY + this.cropOldH) : this.changeCropTypeY === 2 && (this.cropOldH + l < c ? this.cropH = c : this.cropOldH + l > 0 ? (this.cropH = this.cropOldH + l + this.cropOffsertY <= i ? this.cropOldH + l : i - this.cropOffsertY, this.cropOffsertY = this.cropChangeY) : (this.cropH = i - this.cropChangeY + Math.abs(l + this.cropOldH) <= i - s ? Math.abs(l + this.cropOldH) : this.cropChangeY - s, this.cropOffsertY = i - this.cropChangeY + Math.abs(l + this.cropOldH) <= i - s ? this.cropChangeY - Math.abs(l + this.cropOldH) : s))), this.canChangeX && this.fixed) {
          var h = this.cropW / this.fixedNumber[0] * this.fixedNumber[1];
          h < c ? (this.cropH = c, this.cropW = this.fixedNumber[0] * c / this.fixedNumber[1], this.changeCropTypeX === 1 && (this.cropOffsertX = this.cropChangeX + (this.cropOldW - this.cropW))) : h + this.cropOffsertY > i ? (this.cropH = i - this.cropOffsertY, this.cropW = this.cropH / this.fixedNumber[1] * this.fixedNumber[0], this.changeCropTypeX === 1 && (this.cropOffsertX = this.cropChangeX + (this.cropOldW - this.cropW))) : this.cropH = h;
        }
        if (this.canChangeY && this.fixed) {
          var x = this.cropH / this.fixedNumber[1] * this.fixedNumber[0];
          x < o ? (this.cropW = o, this.cropH = this.fixedNumber[1] * o / this.fixedNumber[0], this.cropOffsertY = this.cropOldH + this.cropChangeY - this.cropH) : x + this.cropOffsertX > n ? (this.cropW = n - this.cropOffsertX, this.cropH = this.cropW / this.fixedNumber[0] * this.fixedNumber[1]) : this.cropW = x;
        }
      });
    },
    checkCropLimitSize() {
      let { cropW: e, cropH: r, limitMinSize: t } = this, n = new Array();
      return Array.isArray(t) ? n = t : n = [t, t], e = parseFloat(n[0]), r = parseFloat(n[1]), [e, r];
    },
    changeCropEnd(e) {
      window.removeEventListener("mousemove", this.changeCropNow), window.removeEventListener("mouseup", this.changeCropEnd), window.removeEventListener("touchmove", this.changeCropNow), window.removeEventListener("touchend", this.changeCropEnd);
    },
    calculateSize(e, r, t, n, i, a) {
      const s = e / r;
      let o = i, c = a;
      return o < t && (o = t, c = Math.ceil(o / s)), c < n && (c = n, o = Math.ceil(c * s), o < t && (o = t, c = Math.ceil(o / s))), o < i && (o = i, c = Math.ceil(o / s)), c < a && (c = a, o = Math.ceil(c * s)), { width: o, height: c };
    },
    endCrop() {
      this.cropW === 0 && this.cropH === 0 && (this.cropping = !1);
      let [e, r] = this.checkCropLimitSize();
      const { width: t, height: n } = this.fixed ? this.calculateSize(
        this.fixedNumber[0],
        this.fixedNumber[1],
        e,
        r,
        this.cropW,
        this.cropH
      ) : { width: e, height: r };
      t > this.cropW && (this.cropW = t, this.cropOffsertX + t > this.w && (this.cropOffsertX = this.w - t)), n > this.cropH && (this.cropH = n, this.cropOffsertY + n > this.h && (this.cropOffsertY = this.h - n)), window.removeEventListener("mousemove", this.createCrop), window.removeEventListener("mouseup", this.endCrop), window.removeEventListener("touchmove", this.createCrop), window.removeEventListener("touchend", this.endCrop);
    },
    startCrop() {
      this.crop = !0;
    },
    stopCrop() {
      this.crop = !1;
    },
    clearCrop() {
      this.cropping = !1, this.cropW = 0, this.cropH = 0;
    },
    cropMove(e) {
      if (e.preventDefault(), !this.canMoveBox)
        return this.crop = !1, this.startMove(e), !1;
      if (e.touches && e.touches.length === 2)
        return this.crop = !1, this.startMove(e), this.leaveCrop(), !1;
      window.addEventListener("mousemove", this.moveCrop), window.addEventListener("mouseup", this.leaveCrop), window.addEventListener("touchmove", this.moveCrop), window.addEventListener("touchend", this.leaveCrop);
      let r = "clientX" in e ? e.clientX : e.touches[0].clientX, t = "clientY" in e ? e.clientY : e.touches[0].clientY, n, i;
      n = r - this.cropOffsertX, i = t - this.cropOffsertY, this.cropX = n, this.cropY = i, this.$emit("crop-moving", {
        moving: !0,
        axis: this.getCropAxis()
      });
    },
    moveCrop(e, r) {
      let t = 0, n = 0;
      e && (e.preventDefault(), t = "clientX" in e ? e.clientX : e.touches[0].clientX, n = "clientY" in e ? e.clientY : e.touches[0].clientY), this.$nextTick(() => {
        let i, a, s = t - this.cropX, o = n - this.cropY;
        if (r && (s = this.cropOffsertX, o = this.cropOffsertY), s <= 0 ? i = 0 : s + this.cropW > this.w ? i = this.w - this.cropW : i = s, o <= 0 ? a = 0 : o + this.cropH > this.h ? a = this.h - this.cropH : a = o, this.centerBox) {
          let c = this.getImgAxis();
          i <= c.x1 && (i = c.x1), i + this.cropW > c.x2 && (i = c.x2 - this.cropW), a <= c.y1 && (a = c.y1), a + this.cropH > c.y2 && (a = c.y2 - this.cropH);
        }
        this.cropOffsertX = i, this.cropOffsertY = a, this.$emit("crop-moving", {
          moving: !0,
          axis: this.getCropAxis()
        });
      });
    },
    getImgAxis(e, r, t) {
      e = e || this.x, r = r || this.y, t = t || this.scale;
      let n = {
        x1: 0,
        x2: 0,
        y1: 0,
        y2: 0
      }, i = this.trueWidth * t, a = this.trueHeight * t;
      switch (this.rotate) {
        case 0:
          n.x1 = e + this.trueWidth * (1 - t) / 2, n.x2 = n.x1 + this.trueWidth * t, n.y1 = r + this.trueHeight * (1 - t) / 2, n.y2 = n.y1 + this.trueHeight * t;
          break;
        case 1:
        case -1:
        case 3:
        case -3:
          n.x1 = e + this.trueWidth * (1 - t) / 2 + (i - a) / 2, n.x2 = n.x1 + this.trueHeight * t, n.y1 = r + this.trueHeight * (1 - t) / 2 + (a - i) / 2, n.y2 = n.y1 + this.trueWidth * t;
          break;
        default:
          n.x1 = e + this.trueWidth * (1 - t) / 2, n.x2 = n.x1 + this.trueWidth * t, n.y1 = r + this.trueHeight * (1 - t) / 2, n.y2 = n.y1 + this.trueHeight * t;
          break;
      }
      return n;
    },
    getCropAxis() {
      let e = {
        x1: 0,
        x2: 0,
        y1: 0,
        y2: 0
      };
      return e.x1 = this.cropOffsertX, e.x2 = e.x1 + this.cropW, e.y1 = this.cropOffsertY, e.y2 = e.y1 + this.cropH, e;
    },
    leaveCrop(e) {
      window.removeEventListener("mousemove", this.moveCrop), window.removeEventListener("mouseup", this.leaveCrop), window.removeEventListener("touchmove", this.moveCrop), window.removeEventListener("touchend", this.leaveCrop), this.$emit("crop-moving", {
        moving: !1,
        axis: this.getCropAxis()
      });
    },
    getCropChecked(e) {
      let r = document.createElement("canvas"), t = new Image(), n = this.rotate, i = this.trueWidth, a = this.trueHeight, s = this.cropOffsertX, o = this.cropOffsertY;
      t.onload = () => {
        if (this.cropW !== 0) {
          let l = r.getContext("2d"), h = 1;
          this.high & !this.full && (h = window.devicePixelRatio), this.enlarge !== 1 & !this.full && (h = Math.abs(Number(this.enlarge)));
          let x = this.cropW * h, d = this.cropH * h, v = i * this.scale * h, u = a * this.scale * h, g = (this.x - s + this.trueWidth * (1 - this.scale) / 2) * h, S = (this.y - o + this.trueHeight * (1 - this.scale) / 2) * h;
          switch (f(x, d), l.save(), this.fillColor && (l.fillStyle = this.fillColor, l.fillRect(0, 0, r.width, r.height)), n) {
            case 0:
              this.full ? (f(x / this.scale, d / this.scale), l.drawImage(
                t,
                g / this.scale,
                S / this.scale,
                v / this.scale,
                u / this.scale
              )) : l.drawImage(t, g, S, v, u);
              break;
            case 1:
            case -3:
              this.full ? (f(x / this.scale, d / this.scale), g = g / this.scale + (v / this.scale - u / this.scale) / 2, S = S / this.scale + (u / this.scale - v / this.scale) / 2, l.rotate(n * 90 * Math.PI / 180), l.drawImage(
                t,
                S,
                -g - u / this.scale,
                v / this.scale,
                u / this.scale
              )) : (g = g + (v - u) / 2, S = S + (u - v) / 2, l.rotate(n * 90 * Math.PI / 180), l.drawImage(t, S, -g - u, v, u));
              break;
            case 2:
            case -2:
              this.full ? (f(x / this.scale, d / this.scale), l.rotate(n * 90 * Math.PI / 180), g = g / this.scale, S = S / this.scale, l.drawImage(
                t,
                -g - v / this.scale,
                -S - u / this.scale,
                v / this.scale,
                u / this.scale
              )) : (l.rotate(n * 90 * Math.PI / 180), l.drawImage(t, -g - v, -S - u, v, u));
              break;
            case 3:
            case -1:
              this.full ? (f(x / this.scale, d / this.scale), g = g / this.scale + (v / this.scale - u / this.scale) / 2, S = S / this.scale + (u / this.scale - v / this.scale) / 2, l.rotate(n * 90 * Math.PI / 180), l.drawImage(
                t,
                -S - v / this.scale,
                g,
                v / this.scale,
                u / this.scale
              )) : (g = g + (v - u) / 2, S = S + (u - v) / 2, l.rotate(n * 90 * Math.PI / 180), l.drawImage(t, -S - v, g, v, u));
              break;
            default:
              this.full ? (f(x / this.scale, d / this.scale), l.drawImage(
                t,
                g / this.scale,
                S / this.scale,
                v / this.scale,
                u / this.scale
              )) : l.drawImage(t, g, S, v, u);
          }
          l.restore();
        } else {
          let l = i * this.scale, h = a * this.scale, x = r.getContext("2d");
          switch (x.save(), this.fillColor && (x.fillStyle = this.fillColor, x.fillRect(0, 0, r.width, r.height)), n) {
            case 0:
              f(l, h), x.drawImage(t, 0, 0, l, h);
              break;
            case 1:
            case -3:
              f(h, l), x.rotate(n * 90 * Math.PI / 180), x.drawImage(t, 0, -h, l, h);
              break;
            case 2:
            case -2:
              f(l, h), x.rotate(n * 90 * Math.PI / 180), x.drawImage(t, -l, -h, l, h);
              break;
            case 3:
            case -1:
              f(h, l), x.rotate(n * 90 * Math.PI / 180), x.drawImage(t, -l, 0, l, h);
              break;
            default:
              f(l, h), x.drawImage(t, 0, 0, l, h);
          }
          x.restore();
        }
        e(r);
      };
      var c = this.img.substr(0, 4);
      c !== "data" && (t.crossOrigin = "Anonymous"), t.src = this.imgs;
      function f(l, h) {
        r.width = Math.round(l), r.height = Math.round(h);
      }
    },
    getCropData(e) {
      this.getCropChecked((r) => {
        e(r.toDataURL("image/" + this.outputType, this.outputSize));
      });
    },
    getCropBlob(e) {
      this.getCropChecked((r) => {
        r.toBlob(
          (t) => e(t),
          "image/" + this.outputType,
          this.outputSize
        );
      });
    },
    showPreview() {
      if (this.isCanShow)
        this.isCanShow = !1, setTimeout(() => {
          this.isCanShow = !0;
        }, 16);
      else
        return !1;
      let e = this.cropW, r = this.cropH, t = this.scale;
      var n = {};
      n.div = {
        width: `${e}px`,
        height: `${r}px`
      };
      let i = (this.x - this.cropOffsertX) / t, a = (this.y - this.cropOffsertY) / t, s = 0;
      n.w = e, n.h = r, n.url = this.imgs, n.img = {
        width: `${this.trueWidth}px`,
        height: `${this.trueHeight}px`,
        transform: `scale(${t})translate3d(${i}px, ${a}px, ${s}px)rotateZ(${this.rotate * 90}deg)`
      }, n.html = `
      <div class="show-preview" style="width: ${n.w}px; height: ${n.h}px,; overflow: hidden">
        <div style="width: ${e}px; height: ${r}px">
          <img src=${n.url} style="width: ${this.trueWidth}px; height: ${this.trueHeight}px; transform:
          scale(${t})translate3d(${i}px, ${a}px, ${s}px)rotateZ(${this.rotate * 90}deg)">
        </div>
      </div>`, this.$emit("real-time", n);
    },
    reload() {
      let e = new Image();
      e.onload = () => {
        this.w = parseFloat(window.getComputedStyle(this.$refs.cropper).width), this.h = parseFloat(window.getComputedStyle(this.$refs.cropper).height), this.trueWidth = e.width, this.trueHeight = e.height, this.original ? this.scale = 1 : this.scale = this.checkedMode(), this.$nextTick(() => {
          this.x = -(this.trueWidth - this.trueWidth * this.scale) / 2 + (this.w - this.trueWidth * this.scale) / 2, this.y = -(this.trueHeight - this.trueHeight * this.scale) / 2 + (this.h - this.trueHeight * this.scale) / 2, this.loading = !1, this.autoCrop && this.goAutoCrop(), this.$emit("img-load", "success"), setTimeout(() => {
            this.showPreview();
          }, 20);
        });
      }, e.onerror = () => {
        this.$emit("img-load", "error");
      }, e.src = this.imgs;
    },
    checkedMode() {
      let e = 1, r = this.trueWidth, t = this.trueHeight;
      const n = this.mode.split(" ");
      switch (n[0]) {
        case "contain":
          this.trueWidth > this.w && (e = this.w / this.trueWidth), this.trueHeight * e > this.h && (e = this.h / this.trueHeight);
          break;
        case "cover":
          r = this.w, e = r / this.trueWidth, t = t * e, t < this.h && (t = this.h, e = t / this.trueHeight);
          break;
        default:
          try {
            let i = n[0];
            if (i.search("px") !== -1) {
              i = i.replace("px", ""), r = parseFloat(i);
              const a = r / this.trueWidth;
              let s = 1, o = n[1];
              o.search("px") !== -1 && (o = o.replace("px", ""), t = parseFloat(o), s = t / this.trueHeight), e = Math.min(a, s);
            }
            if (i.search("%") !== -1 && (i = i.replace("%", ""), r = parseFloat(i) / 100 * this.w, e = r / this.trueWidth), n.length === 2 && i === "auto") {
              let a = n[1];
              a.search("px") !== -1 && (a = a.replace("px", ""), t = parseFloat(a), e = t / this.trueHeight), a.search("%") !== -1 && (a = a.replace("%", ""), t = parseFloat(a) / 100 * this.h, e = t / this.trueHeight);
            }
          } catch {
            e = 1;
          }
      }
      return e;
    },
    goAutoCrop(e, r) {
      if (this.imgs === "" || this.imgs === null)
        return;
      this.clearCrop(), this.cropping = !0;
      let t = this.w, n = this.h;
      if (this.centerBox) {
        const s = Math.abs(this.rotate) % 2 > 0;
        let o = (s ? this.trueHeight : this.trueWidth) * this.scale, c = (s ? this.trueWidth : this.trueHeight) * this.scale;
        t = o < t ? o : t, n = c < n ? c : n;
      }
      var i = e || parseFloat(this.autoCropWidth), a = r || parseFloat(this.autoCropHeight);
      (i === 0 || a === 0) && (i = t * 0.8, a = n * 0.8), i = i > t ? t : i, a = a > n ? n : a, this.fixed && (a = i / this.fixedNumber[0] * this.fixedNumber[1]), a > this.h && (a = this.h, i = a / this.fixedNumber[1] * this.fixedNumber[0]), this.changeCrop(i, a);
    },
    changeCrop(e, r) {
      if (this.centerBox) {
        let t = this.getImgAxis();
        e > t.x2 - t.x1 && (e = t.x2 - t.x1, r = e / this.fixedNumber[0] * this.fixedNumber[1]), r > t.y2 - t.y1 && (r = t.y2 - t.y1, e = r / this.fixedNumber[1] * this.fixedNumber[0]);
      }
      this.cropW = e, this.cropH = r, this.checkCropLimitSize(), this.$nextTick(() => {
        this.cropOffsertX = (this.w - this.cropW) / 2, this.cropOffsertY = (this.h - this.cropH) / 2, this.centerBox && this.moveCrop(null, !0);
      });
    },
    refresh() {
      this.img, this.imgs = "", this.scale = 1, this.crop = !1, this.rotate = 0, this.w = 0, this.h = 0, this.trueWidth = 0, this.trueHeight = 0, this.clearCrop(), this.$nextTick(() => {
        this.checkedImg();
      });
    },
    rotateLeft() {
      this.rotate = this.rotate <= -3 ? 0 : this.rotate - 1;
    },
    rotateRight() {
      this.rotate = this.rotate >= 3 ? 0 : this.rotate + 1;
    },
    rotateClear() {
      this.rotate = 0;
    },
    checkoutImgAxis(e, r, t) {
      e = e || this.x, r = r || this.y, t = t || this.scale;
      let n = !0;
      if (this.centerBox) {
        let i = this.getImgAxis(e, r, t), a = this.getCropAxis();
        i.x1 >= a.x1 && (n = !1), i.x2 <= a.x2 && (n = !1), i.y1 >= a.y1 && (n = !1), i.y2 <= a.y2 && (n = !1);
      }
      return n;
    }
  },
  mounted() {
    this.support = "onwheel" in document.createElement("div") ? "wheel" : document.onmousewheel !== void 0 ? "mousewheel" : "DOMMouseScroll";
    let e = this;
    var r = navigator.userAgent;
    this.isIOS = !!r.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), HTMLCanvasElement.prototype.toBlob || Object.defineProperty(HTMLCanvasElement.prototype, "toBlob", {
      value: function(t, n, i) {
        for (var a = atob(this.toDataURL(n, i).split(",")[1]), s = a.length, o = new Uint8Array(s), c = 0; c < s; c++)
          o[c] = a.charCodeAt(c);
        t(new Blob([o], { type: e.type || "image/png" }));
      }
    }), this.showPreview(), this.checkedImg();
  },
  unmounted() {
    window.removeEventListener("mousemove", this.moveCrop), window.removeEventListener("mouseup", this.leaveCrop), window.removeEventListener("touchmove", this.moveCrop), window.removeEventListener("touchend", this.leaveCrop), this.cancelScale();
  }
}), cf = {
  key: 0,
  class: "cropper-box"
}, hf = ["src"], uf = { class: "cropper-view-box" }, xf = ["src"], df = { key: 1 };
function pf(e, r, t, n, i, a) {
  return Qr(), en("div", {
    class: "vue-cropper",
    ref: "cropper",
    onMouseover: r[28] || (r[28] = (...s) => e.scaleImg && e.scaleImg(...s)),
    onMouseout: r[29] || (r[29] = (...s) => e.cancelScale && e.cancelScale(...s))
  }, [
    e.imgs ? (Qr(), en("div", cf, [
      Yi(Ne("div", {
        class: "cropper-box-canvas",
        style: tn({
          width: e.trueWidth + "px",
          height: e.trueHeight + "px",
          transform: "scale(" + e.scale + "," + e.scale + ") translate3d(" + e.x / e.scale + "px," + e.y / e.scale + "px,0)rotateZ(" + e.rotate * 90 + "deg)"
        })
      }, [
        Ne("img", {
          src: e.imgs,
          alt: "cropper-img",
          ref: "cropperImg"
        }, null, 8, hf)
      ], 4), [
        [Gi, !e.loading]
      ])
    ])) : $n("", !0),
    Ne("div", {
      class: Qs(["cropper-drag-box", { "cropper-move": e.move && !e.crop, "cropper-crop": e.crop, "cropper-modal": e.cropping }]),
      onMousedown: r[0] || (r[0] = (...s) => e.startMove && e.startMove(...s)),
      onTouchstart: r[1] || (r[1] = (...s) => e.startMove && e.startMove(...s))
    }, null, 34),
    Yi(Ne("div", {
      class: "cropper-crop-box",
      style: tn({
        width: e.cropW + "px",
        height: e.cropH + "px",
        transform: "translate3d(" + e.cropOffsertX + "px," + e.cropOffsertY + "px,0)"
      })
    }, [
      Ne("span", uf, [
        Ne("img", {
          style: tn({
            width: e.trueWidth + "px",
            height: e.trueHeight + "px",
            transform: "scale(" + e.scale + "," + e.scale + ") translate3d(" + (e.x - e.cropOffsertX) / e.scale + "px," + (e.y - e.cropOffsertY) / e.scale + "px,0)rotateZ(" + e.rotate * 90 + "deg)"
          }),
          src: e.imgs,
          alt: "cropper-img"
        }, null, 12, xf)
      ]),
      Ne("span", {
        class: "cropper-face cropper-move",
        onMousedown: r[2] || (r[2] = (...s) => e.cropMove && e.cropMove(...s)),
        onTouchstart: r[3] || (r[3] = (...s) => e.cropMove && e.cropMove(...s))
      }, null, 32),
      e.info ? (Qr(), en("span", {
        key: 0,
        class: "crop-info",
        style: tn({ top: e.cropInfo.top })
      }, $i(e.cropInfo.width) + " \xD7 " + $i(e.cropInfo.height), 5)) : $n("", !0),
      e.fixedBox ? $n("", !0) : (Qr(), en("span", df, [
        Ne("span", {
          class: "crop-line line-w",
          onMousedown: r[4] || (r[4] = (s) => e.changeCropSize(s, !1, !0, 0, 1)),
          onTouchstart: r[5] || (r[5] = (s) => e.changeCropSize(s, !1, !0, 0, 1))
        }, null, 32),
        Ne("span", {
          class: "crop-line line-a",
          onMousedown: r[6] || (r[6] = (s) => e.changeCropSize(s, !0, !1, 1, 0)),
          onTouchstart: r[7] || (r[7] = (s) => e.changeCropSize(s, !0, !1, 1, 0))
        }, null, 32),
        Ne("span", {
          class: "crop-line line-s",
          onMousedown: r[8] || (r[8] = (s) => e.changeCropSize(s, !1, !0, 0, 2)),
          onTouchstart: r[9] || (r[9] = (s) => e.changeCropSize(s, !1, !0, 0, 2))
        }, null, 32),
        Ne("span", {
          class: "crop-line line-d",
          onMousedown: r[10] || (r[10] = (s) => e.changeCropSize(s, !0, !1, 2, 0)),
          onTouchstart: r[11] || (r[11] = (s) => e.changeCropSize(s, !0, !1, 2, 0))
        }, null, 32),
        Ne("span", {
          class: "crop-point point1",
          onMousedown: r[12] || (r[12] = (s) => e.changeCropSize(s, !0, !0, 1, 1)),
          onTouchstart: r[13] || (r[13] = (s) => e.changeCropSize(s, !0, !0, 1, 1))
        }, null, 32),
        Ne("span", {
          class: "crop-point point2",
          onMousedown: r[14] || (r[14] = (s) => e.changeCropSize(s, !1, !0, 0, 1)),
          onTouchstart: r[15] || (r[15] = (s) => e.changeCropSize(s, !1, !0, 0, 1))
        }, null, 32),
        Ne("span", {
          class: "crop-point point3",
          onMousedown: r[16] || (r[16] = (s) => e.changeCropSize(s, !0, !0, 2, 1)),
          onTouchstart: r[17] || (r[17] = (s) => e.changeCropSize(s, !0, !0, 2, 1))
        }, null, 32),
        Ne("span", {
          class: "crop-point point4",
          onMousedown: r[18] || (r[18] = (s) => e.changeCropSize(s, !0, !1, 1, 0)),
          onTouchstart: r[19] || (r[19] = (s) => e.changeCropSize(s, !0, !1, 1, 0))
        }, null, 32),
        Ne("span", {
          class: "crop-point point5",
          onMousedown: r[20] || (r[20] = (s) => e.changeCropSize(s, !0, !1, 2, 0)),
          onTouchstart: r[21] || (r[21] = (s) => e.changeCropSize(s, !0, !1, 2, 0))
        }, null, 32),
        Ne("span", {
          class: "crop-point point6",
          onMousedown: r[22] || (r[22] = (s) => e.changeCropSize(s, !0, !0, 1, 2)),
          onTouchstart: r[23] || (r[23] = (s) => e.changeCropSize(s, !0, !0, 1, 2))
        }, null, 32),
        Ne("span", {
          class: "crop-point point7",
          onMousedown: r[24] || (r[24] = (s) => e.changeCropSize(s, !1, !0, 0, 2)),
          onTouchstart: r[25] || (r[25] = (s) => e.changeCropSize(s, !1, !0, 0, 2))
        }, null, 32),
        Ne("span", {
          class: "crop-point point8",
          onMousedown: r[26] || (r[26] = (s) => e.changeCropSize(s, !0, !0, 2, 2)),
          onTouchstart: r[27] || (r[27] = (s) => e.changeCropSize(s, !0, !0, 2, 2))
        }, null, 32)
      ]))
    ], 4), [
      [Gi, e.cropping]
    ])
  ], 544);
}
const gf = /* @__PURE__ */ ff(lf, [["render", pf], ["__scopeId", "data-v-18751258"]]);
const Wp = tt({
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
    },
    cropper: {
      type: Boolean,
      default: !1
    },
    aspt: {
      type: Object,
      default: () => [1, 1]
    },
    cropperAttrs: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ["update:modelValue", "change"],
  setup(e, {
    emit: r
  }) {
    const t = er(() => e.modelValue.map((u, g) => ({
      uid: g,
      name: u,
      status: "success",
      url: u
    }))), n = () => dn.error("\u8D85\u51FA\u6570\u91CF\u9650\u5236\uFF01\uFF01\uFF01"), i = (u, g) => {
      const S = g.map((A) => A.url);
      r("update:modelValue", S), r("change", S);
    }, a = async (u) => {
      if (u)
        if (e.type === "image" && e.cropper)
          h.value = !0, await It(), l.value = URL.createObjectURL(u.raw), f.value.startCrop();
        else {
          const g = await e.uploadFn(u.raw), S = [...t.value.filter((A) => A.status === "success").map((A) => A.url), g];
          r("update:modelValue", S), r("change", S);
        }
    }, s = (u) => {
      const g = e.modelValue.indexOf(u);
      Ap({
        srcList: e.modelValue,
        index: g === -1 ? 0 : g
      });
    }, o = er(() => e.modelValue.length < e.limit ? "inline-flex" : "none"), c = "young-upload-" + Yr(), f = he(), l = he(), h = he(!1), x = () => {
      f.value.getCropBlob(async (u) => {
        const g = await e.uploadFn(u), S = [...t.value.filter((A) => A.status === "success").map((A) => A.url), g];
        r("update:modelValue", S), r("change", S), l.value = "";
      }), h.value = !1;
    }, d = () => {
      l.value = "", h.value = !1;
      const u = [...t.value.filter((g) => g.status === "success").map((g) => g.url)];
      r("update:modelValue", u), r("change", u);
    }, v = kn("(max-width: 1023.9px)");
    return () => U("div", {
      id: c
    }, [U("style", null, [`
          #${c} .el-upload--picture-card {
            display: ${o.value};
          }
          `]), U(yo, {
      accept: e.accept ? e.accept : e.type === "image" ? "image/*" : "*",
      limit: e.limit,
      listType: e.type === "image" ? "picture-card" : void 0,
      multiple: e.limit > 1,
      fileList: t.value,
      autoUpload: !1,
      onExceed: n,
      onChange: a,
      onRemove: i,
      onPreview: ({
        url: u
      }) => e.type === "image" && s(u),
      style: {
        maxWidth: "500px"
      }
    }, {
      default: () => [U("div", null, [e.modelValue.length < e.limit && e.type === "image" ? U("div", {
        style: {
          fontSize: "1.875rem",
          lineHeight: "2.25rem"
        }
      }, [U("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "1em",
        height: "1em",
        viewBox: "0 0 24 24"
      }, [U("path", {
        fill: "currentColor",
        d: "M18 12.998h-5v5a1 1 0 0 1-2 0v-5H6a1 1 0 0 1 0-2h5v-5a1 1 0 0 1 2 0v5h5a1 1 0 0 1 0 2z"
      }, null)])]) : e.modelValue.length < e.limit ? U("div", {
        style: {
          marginRight: "0.5rem"
        }
      }, [U(Rt, {
        type: "primary"
      }, {
        default: () => [Qe("\u4E0A\u4F20\u6587\u4EF6")]
      })]) : U("div", {
        style: {
          cursor: "not-allowed",
          pointerEvents: "none"
        }
      }, [Qe("\u5DF2\u8FBE\u6570\u91CF\u4E0A\u9650")])]), U("div", null, [Qe("("), e.modelValue.length, Qe(" / "), e.limit, Qe(")")])]
    }), U(Go, {
      modelValue: h.value,
      "onUpdate:modelValue": (u) => h.value = u,
      top: "0",
      width: "96%",
      realTitle: "\u56FE\u7247\u88C1\u526A",
      showCancel: !1,
      showSure: !1
    }, {
      body: () => U("div", {
        style: {
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }
      }, [U("div", {
        style: {
          width: v.value ? "90vw" : "800px",
          height: v.value ? "90vh" : "72vh"
        }
      }, [U(gf, Pe({
        ref: f,
        autoCrop: !0,
        centerBox: !0,
        fixedNumber: e.aspt,
        img: l.value,
        outputType: "webp",
        fixed: !0
      }, e.cropperAttrs), null)]), U("div", {
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "80px",
          width: "96%",
          padding: "0 20px"
        }
      }, [U(Rt, {
        style: {
          width: "48%"
        },
        onClick: d
      }, {
        default: () => [Qe("\u53D6\u6D88")]
      }), U(Rt, {
        style: {
          width: "48%"
        },
        type: "primary",
        onClick: x
      }, {
        default: () => [Qe("\u88C1\u526A")]
      })])])
    })]);
  }
}), qi = (e, r, t = 10, n = he(!1)) => {
  const i = he([]), a = he(!1), s = he(1), o = () => {
    const { stop: c } = Oo(
      i.value[e.value.length - 1],
      ([{ isIntersecting: f }]) => {
        f && (a.value = f, c());
      }
    );
  };
  return wr(async () => {
    if (!n.value && a.value) {
      if (e.value.length === r.value.length)
        return;
      s.value++;
      const c = r.value.slice(t * (s.value - 1), t * s.value);
      if (c.length === 0)
        return;
      e.value.push(...c), a.value = !1, await It(), o();
    }
  }), {
    elArr: i,
    touchEndEl: a,
    page: s,
    load: o
  };
}, Xp = (e, { addCbk: r, modCbk: t, delCbk: n, cpEffect: i, cgEffect: a, clearEffect: s, disableclear: o }, c = "\u786E\u8BA4\u5220\u9664\u8BE5\u6761\u6570\u636E\uFF1F") => {
  const f = he(!1), l = he(!1), h = he(!1), x = he(rt(e)), d = he(), v = async () => await new Promise((Y) => {
    var Q;
    (Q = d.value) == null || Q.validate(async (D) => {
      D && Y(!0);
    }).catch((D) => {
      Y(!1);
    });
  }), u = () => {
    f.value = !1, l.value = !1, h.value = !1, s == null || s(), x.value = rt(e);
  };
  return {
    isAdd: f,
    isEdit: l,
    isMore: h,
    clear: u,
    edit: async (I) => {
      const Y = await (i == null ? void 0 : i(I));
      x.value = rt(Y || I), l.value = !0;
    },
    more: async (I) => {
      const Y = await (i == null ? void 0 : i(I));
      x.value = rt(Y || I), h.value = !0;
    },
    form: x,
    del: (I) => {
      fi.confirm(c, "\u63D0\u793A", {
        confirmButtonText: "\u786E\u8BA4",
        cancelButtonText: "\u53D6\u6D88",
        type: "warning"
      }).then(async () => {
        await (n == null ? void 0 : n(I)), a == null || a();
      }).catch(() => null);
    },
    sure: async () => {
      if (f.value) {
        if (await (r == null ? void 0 : r()) === !1)
          return;
      } else if (await (t == null ? void 0 : t()) === !1)
        return;
      !o && u(), a == null || a();
    },
    formRef: d,
    validForm: v
  };
}, vf = Io(",key,ref,innerHTML,textContent,ref_key,ref_for");
function mf(e, r) {
  let t = "";
  for (const n in e) {
    if (vf(n) || Lo(n) || r === "textarea" && n === "value")
      continue;
    const i = e[n];
    n === "class" ? t += ` class="${Tf(i)}"` : n === "style" ? t += ` style="${Ef(i)}"` : t += _f(n, i, r);
  }
  return t;
}
function _f(e, r, t) {
  if (!wf(r))
    return "";
  const n = t && (t.indexOf("-") > 0 || Po(t)) ? e : Mo[e] || e.toLowerCase();
  return Bo(n) ? bo(r) ? ` ${n}` : "" : Uo(n) ? r === "" ? ` ${n}` : ` ${n}="${Xt(r)}"` : (console.warn(`[@vue/server-renderer] Skipped rendering unsafe attribute name: ${n}`), "");
}
function wf(e) {
  if (e == null)
    return !1;
  const r = typeof e;
  return r === "string" || r === "number" || r === "boolean";
}
function Tf(e) {
  return Xt(Ho(e));
}
function Ef(e) {
  if (!e)
    return "";
  if (Tr(e))
    return Xt(e);
  const r = Wo(e);
  return Xt(Xo(r));
}
function Sf(e, r) {
  throw new Error("On-the-fly template compilation is not supported in the ESM build of @vue/server-renderer. All templates must be pre-compiled into render functions.");
}
function yf(e, r, t, n, i) {
  e("<!--teleport start-->");
  const a = i.appContext.provides[Xa], s = a.__teleportBuffers || (a.__teleportBuffers = {}), o = s[t] || (s[t] = []), c = o.length;
  let f;
  if (n)
    r(e), f = "<!--teleport anchor-->";
  else {
    const { getBuffer: l, push: h } = ja();
    r(h), h("<!--teleport anchor-->"), f = l();
  }
  o.splice(c, 0, f), e("<!--teleport end-->");
}
const { createComponentInstance: Af, setCurrentRenderingInstance: Ji, setupComponent: Cf, renderComponentRoot: Zi, normalizeVNode: Ff } = Va;
function ja() {
  let e = !1;
  const r = [];
  return {
    getBuffer() {
      return r;
    },
    push(t) {
      const n = Tr(t);
      e && n ? r[r.length - 1] += t : r.push(t), e = n, (ci(t) || Vo(t) && t.hasAsync) && (r.hasAsync = !0);
    }
  };
}
function Ka(e, r = null, t) {
  const n = Af(e, r, null), i = Cf(n, !0), a = ci(i), s = n.sp;
  if (a || s) {
    let o = a ? i : Promise.resolve();
    return s && (o = o.then(() => Promise.all(s.map((c) => c.call(n.proxy)))).catch(() => {
    })), o.then(() => Qi(n, t));
  } else
    return Qi(n, t);
}
function Qi(e, r) {
  const t = e.type, { getBuffer: n, push: i } = ja();
  if (ko(t)) {
    let a = Zi(e);
    if (!t.props)
      for (const s in e.attrs)
        s.startsWith("data-v-") && ((a.props || (a.props = {}))[s] = "");
    pn(i, e.subTree = a, e, r);
  } else {
    (!e.render || e.render === ji) && !e.ssrRender && !t.ssrRender && Tr(t.template) && (t.ssrRender = Sf(t.template));
    for (const s of e.scope.effects)
      s.computed && (s.computed._cacheable = !0);
    const a = e.ssrRender || t.ssrRender;
    if (a) {
      let s = e.inheritAttrs !== !1 ? e.attrs : void 0, o = !1, c = e;
      for (; ; ) {
        const l = c.vnode.scopeId;
        l && (o || (s = { ...s }, o = !0), s[l] = "");
        const h = c.parent;
        if (h && h.subTree && h.subTree === c.vnode)
          c = h;
        else
          break;
      }
      r && (o || (s = { ...s }), s[r.trim()] = "");
      const f = Ji(e);
      try {
        a(
          e.proxy,
          i,
          e,
          s,
          e.props,
          e.setupState,
          e.data,
          e.ctx
        );
      } finally {
        Ji(f);
      }
    } else if (e.render && e.render !== ji)
      pn(i, e.subTree = Zi(e), e, r);
    else {
      const s = t.name || t.__file || "<Anonymous>";
      hn(`Component ${s} is missing template or render function.`), i("<!---->");
    }
  }
  return n();
}
function pn(e, r, t, n) {
  const { type: i, shapeFlag: a, children: s } = r;
  switch (i) {
    case io:
      e(Xt(s));
      break;
    case no:
      e(s ? `<!--${Ro(s)}-->` : "<!---->");
      break;
    case ro:
      e(s);
      break;
    case Vt:
      r.slotScopeIds && (n = (n ? n + " " : "") + r.slotScopeIds.join(" ")), e("<!--[-->"), hi(e, s, t, n), e("<!--]-->");
      break;
    default:
      a & 1 ? Of(e, r, t, n) : a & 6 ? e(Ka(r, t, n)) : a & 64 ? If(e, r, t, n) : a & 128 ? pn(e, r.ssContent, t, n) : hn("[@vue/server-renderer] Invalid VNode type:", i, `(${typeof i})`);
  }
}
function hi(e, r, t, n) {
  for (let i = 0; i < r.length; i++)
    pn(e, Ff(r[i]), t, n);
}
function Of(e, r, t, n) {
  const i = r.type;
  let { props: a, children: s, shapeFlag: o, scopeId: c, dirs: f } = r, l = `<${i}`;
  f && (a = Df(r, a, f)), a && (l += mf(a, i)), c && (l += ` ${c}`);
  let h = t, x = r;
  for (; h && x === h.subTree; )
    x = h.vnode, x.scopeId && (l += ` ${x.scopeId}`), h = h.parent;
  if (n && (l += ` ${n}`), e(l + ">"), !No(i)) {
    let d = !1;
    a && (a.innerHTML ? (d = !0, e(a.innerHTML)) : a.textContent ? (d = !0, e(Xt(a.textContent))) : i === "textarea" && a.value && (d = !0, e(Xt(a.value)))), d || (o & 8 ? e(Xt(s)) : o & 16 && hi(e, s, t, n)), e(`</${i}>`);
  }
}
function Df(e, r, t) {
  const n = [];
  for (let i = 0; i < t.length; i++) {
    const a = t[i], { dir: { getSSRProps: s } } = a;
    if (s) {
      const o = s(a, e);
      o && n.push(o);
    }
  }
  return Pe(r || {}, ...n);
}
function If(e, r, t, n) {
  const i = r.props && r.props.to, a = r.props && r.props.disabled;
  if (!i)
    return a || hn("[@vue/server-renderer] Teleport is missing target prop."), [];
  if (!Tr(i))
    return hn("[@vue/server-renderer] Teleport target must be a query selector string."), [];
  yf(e, (s) => {
    hi(s, r.children, t, n);
  }, i, a || a === "", t);
}
const { isVNode: kf } = Va;
async function ui(e) {
  if (e.hasAsync) {
    let r = "";
    for (let t = 0; t < e.length; t++) {
      let n = e[t];
      ci(n) && (n = await n), Tr(n) ? r += n : r += await ui(n);
    }
    return r;
  } else
    return qa(e);
}
function qa(e) {
  let r = "";
  for (let t = 0; t < e.length; t++) {
    let n = e[t];
    Tr(n) ? r += n : r += qa(n);
  }
  return r;
}
async function Ja(e, r = {}) {
  if (kf(e))
    return Ja(to({ render: () => e }), r);
  const t = U(e._component, e._props);
  t.appContext = e._context, e.provide(Xa, r);
  const n = await Ka(t), i = await ui(n);
  if (await Rf(r), r.__watcherHandles)
    for (const a of r.__watcherHandles)
      a();
  return i;
}
async function Rf(e) {
  if (e.__teleportBuffers) {
    e.teleports = e.teleports || {};
    for (const r in e.__teleportBuffers)
      e.teleports[r] = await ui(await Promise.all([e.__teleportBuffers[r]]));
  }
}
eo();
var Dr = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, Za = { exports: {} };
(function(e, r) {
  (function(t, n) {
    n();
  })(Dr, function() {
    function t(f, l) {
      return typeof l > "u" ? l = { autoBom: !1 } : typeof l != "object" && (console.warn("Deprecated: Expected third argument to be a object"), l = { autoBom: !l }), l.autoBom && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(f.type) ? new Blob(["\uFEFF", f], { type: f.type }) : f;
    }
    function n(f, l, h) {
      var x = new XMLHttpRequest();
      x.open("GET", f), x.responseType = "blob", x.onload = function() {
        c(x.response, l, h);
      }, x.onerror = function() {
        console.error("could not download file");
      }, x.send();
    }
    function i(f) {
      var l = new XMLHttpRequest();
      l.open("HEAD", f, !1);
      try {
        l.send();
      } catch {
      }
      return 200 <= l.status && 299 >= l.status;
    }
    function a(f) {
      try {
        f.dispatchEvent(new MouseEvent("click"));
      } catch {
        var l = document.createEvent("MouseEvents");
        l.initMouseEvent("click", !0, !0, window, 0, 0, 0, 80, 20, !1, !1, !1, !1, 0, null), f.dispatchEvent(l);
      }
    }
    var s = typeof window == "object" && window.window === window ? window : typeof self == "object" && self.self === self ? self : typeof Dr == "object" && Dr.global === Dr ? Dr : void 0, o = s.navigator && /Macintosh/.test(navigator.userAgent) && /AppleWebKit/.test(navigator.userAgent) && !/Safari/.test(navigator.userAgent), c = s.saveAs || (typeof window != "object" || window !== s ? function() {
    } : "download" in HTMLAnchorElement.prototype && !o ? function(f, l, h) {
      var x = s.URL || s.webkitURL, d = document.createElement("a");
      l = l || f.name || "download", d.download = l, d.rel = "noopener", typeof f == "string" ? (d.href = f, d.origin === location.origin ? a(d) : i(d.href) ? n(f, l, h) : a(d, d.target = "_blank")) : (d.href = x.createObjectURL(f), setTimeout(function() {
        x.revokeObjectURL(d.href);
      }, 4e4), setTimeout(function() {
        a(d);
      }, 0));
    } : "msSaveOrOpenBlob" in navigator ? function(f, l, h) {
      if (l = l || f.name || "download", typeof f != "string")
        navigator.msSaveOrOpenBlob(t(f, h), l);
      else if (i(f))
        n(f, l, h);
      else {
        var x = document.createElement("a");
        x.href = f, x.target = "_blank", setTimeout(function() {
          a(x);
        });
      }
    } : function(f, l, h, x) {
      if (x = x || open("", "_blank"), x && (x.document.title = x.document.body.innerText = "downloading..."), typeof f == "string")
        return n(f, l, h);
      var d = f.type === "application/octet-stream", v = /constructor/i.test(s.HTMLElement) || s.safari, u = /CriOS\/[\d]+/.test(navigator.userAgent);
      if ((u || d && v || o) && typeof FileReader < "u") {
        var g = new FileReader();
        g.onloadend = function() {
          var C = g.result;
          C = u ? C : C.replace(/^data:[^;]*;/, "data:attachment/file;"), x ? x.location.href = C : location = C, x = null;
        }, g.readAsDataURL(f);
      } else {
        var S = s.URL || s.webkitURL, A = S.createObjectURL(f);
        x ? x.location = A : location.href = A, x = null, setTimeout(function() {
          S.revokeObjectURL(A);
        }, 4e4);
      }
    });
    s.saveAs = c.saveAs = c, e.exports = c;
  });
})(Za);
/*! xlsx.js (C) 2013-present SheetJS -- http://sheetjs.com */
var gn = {};
gn.version = "0.18.5";
var Qa = 1252, Nf = [874, 932, 936, 949, 950, 1250, 1251, 1252, 1253, 1254, 1255, 1256, 1257, 1258, 1e4], e0 = function(e) {
  Nf.indexOf(e) != -1 && (Qa = e);
};
function Lf() {
  e0(1252);
}
var br = function(e) {
  e0(e);
};
function Pf() {
  br(1200), Lf();
}
function Mf(e) {
  for (var r = [], t = 0; t < e.length >> 1; ++t)
    r[t] = String.fromCharCode(e.charCodeAt(2 * t + 1) + (e.charCodeAt(2 * t) << 8));
  return r.join("");
}
var rn = function(r) {
  return String.fromCharCode(r);
}, ea = function(r) {
  return String.fromCharCode(r);
}, Jt, Ht = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
function Ur(e) {
  for (var r = "", t = 0, n = 0, i = 0, a = 0, s = 0, o = 0, c = 0, f = 0; f < e.length; )
    t = e.charCodeAt(f++), a = t >> 2, n = e.charCodeAt(f++), s = (t & 3) << 4 | n >> 4, i = e.charCodeAt(f++), o = (n & 15) << 2 | i >> 6, c = i & 63, isNaN(n) ? o = c = 64 : isNaN(i) && (c = 64), r += Ht.charAt(a) + Ht.charAt(s) + Ht.charAt(o) + Ht.charAt(c);
  return r;
}
function Mt(e) {
  var r = "", t = 0, n = 0, i = 0, a = 0, s = 0, o = 0, c = 0;
  e = e.replace(/[^\w\+\/\=]/g, "");
  for (var f = 0; f < e.length; )
    a = Ht.indexOf(e.charAt(f++)), s = Ht.indexOf(e.charAt(f++)), t = a << 2 | s >> 4, r += String.fromCharCode(t), o = Ht.indexOf(e.charAt(f++)), n = (s & 15) << 4 | o >> 2, o !== 64 && (r += String.fromCharCode(n)), c = Ht.indexOf(e.charAt(f++)), i = (o & 3) << 6 | c, c !== 64 && (r += String.fromCharCode(i));
  return r;
}
var de = /* @__PURE__ */ function() {
  return typeof Buffer < "u" && typeof process < "u" && typeof process.versions < "u" && !!process.versions.node;
}(), bt = /* @__PURE__ */ function() {
  if (typeof Buffer < "u") {
    var e = !Buffer.from;
    if (!e)
      try {
        Buffer.from("foo", "utf8");
      } catch {
        e = !0;
      }
    return e ? function(r, t) {
      return t ? new Buffer(r, t) : new Buffer(r);
    } : Buffer.from.bind(Buffer);
  }
  return function() {
  };
}();
function tr(e) {
  return de ? Buffer.alloc ? Buffer.alloc(e) : new Buffer(e) : typeof Uint8Array < "u" ? new Uint8Array(e) : new Array(e);
}
function ta(e) {
  return de ? Buffer.allocUnsafe ? Buffer.allocUnsafe(e) : new Buffer(e) : typeof Uint8Array < "u" ? new Uint8Array(e) : new Array(e);
}
var wt = function(r) {
  return de ? bt(r, "binary") : r.split("").map(function(t) {
    return t.charCodeAt(0) & 255;
  });
};
function Rn(e) {
  if (typeof ArrayBuffer > "u")
    return wt(e);
  for (var r = new ArrayBuffer(e.length), t = new Uint8Array(r), n = 0; n != e.length; ++n)
    t[n] = e.charCodeAt(n) & 255;
  return r;
}
function Gr(e) {
  if (Array.isArray(e))
    return e.map(function(n) {
      return String.fromCharCode(n);
    }).join("");
  for (var r = [], t = 0; t < e.length; ++t)
    r[t] = String.fromCharCode(e[t]);
  return r.join("");
}
function Bf(e) {
  if (typeof Uint8Array > "u")
    throw new Error("Unsupported");
  return new Uint8Array(e);
}
var Ve = de ? function(e) {
  return Buffer.concat(e.map(function(r) {
    return Buffer.isBuffer(r) ? r : bt(r);
  }));
} : function(e) {
  if (typeof Uint8Array < "u") {
    var r = 0, t = 0;
    for (r = 0; r < e.length; ++r)
      t += e[r].length;
    var n = new Uint8Array(t), i = 0;
    for (r = 0, t = 0; r < e.length; t += i, ++r)
      if (i = e[r].length, e[r] instanceof Uint8Array)
        n.set(e[r], t);
      else {
        if (typeof e[r] == "string")
          throw "wtf";
        n.set(new Uint8Array(e[r]), t);
      }
    return n;
  }
  return [].concat.apply([], e.map(function(a) {
    return Array.isArray(a) ? a : [].slice.call(a);
  }));
};
function bf(e) {
  for (var r = [], t = 0, n = e.length + 250, i = tr(e.length + 255), a = 0; a < e.length; ++a) {
    var s = e.charCodeAt(a);
    if (s < 128)
      i[t++] = s;
    else if (s < 2048)
      i[t++] = 192 | s >> 6 & 31, i[t++] = 128 | s & 63;
    else if (s >= 55296 && s < 57344) {
      s = (s & 1023) + 64;
      var o = e.charCodeAt(++a) & 1023;
      i[t++] = 240 | s >> 8 & 7, i[t++] = 128 | s >> 2 & 63, i[t++] = 128 | o >> 6 & 15 | (s & 3) << 4, i[t++] = 128 | o & 63;
    } else
      i[t++] = 224 | s >> 12 & 15, i[t++] = 128 | s >> 6 & 63, i[t++] = 128 | s & 63;
    t > n && (r.push(i.slice(0, t)), t = 0, i = tr(65535), n = 65530);
  }
  return r.push(i.slice(0, t)), Ve(r);
}
var Rr = /\u0000/g, nn = /[\u0001-\u0006]/g;
function pr(e) {
  for (var r = "", t = e.length - 1; t >= 0; )
    r += e.charAt(t--);
  return r;
}
function Tt(e, r) {
  var t = "" + e;
  return t.length >= r ? t : Fe("0", r - t.length) + t;
}
function xi(e, r) {
  var t = "" + e;
  return t.length >= r ? t : Fe(" ", r - t.length) + t;
}
function vn(e, r) {
  var t = "" + e;
  return t.length >= r ? t : t + Fe(" ", r - t.length);
}
function Uf(e, r) {
  var t = "" + Math.round(e);
  return t.length >= r ? t : Fe("0", r - t.length) + t;
}
function Hf(e, r) {
  var t = "" + e;
  return t.length >= r ? t : Fe("0", r - t.length) + t;
}
var ra = /* @__PURE__ */ Math.pow(2, 32);
function cr(e, r) {
  if (e > ra || e < -ra)
    return Uf(e, r);
  var t = Math.round(e);
  return Hf(t, r);
}
function mn(e, r) {
  return r = r || 0, e.length >= 7 + r && (e.charCodeAt(r) | 32) === 103 && (e.charCodeAt(r + 1) | 32) === 101 && (e.charCodeAt(r + 2) | 32) === 110 && (e.charCodeAt(r + 3) | 32) === 101 && (e.charCodeAt(r + 4) | 32) === 114 && (e.charCodeAt(r + 5) | 32) === 97 && (e.charCodeAt(r + 6) | 32) === 108;
}
var na = [
  ["Sun", "Sunday"],
  ["Mon", "Monday"],
  ["Tue", "Tuesday"],
  ["Wed", "Wednesday"],
  ["Thu", "Thursday"],
  ["Fri", "Friday"],
  ["Sat", "Saturday"]
], jn = [
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
function Wf(e) {
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
}, ia = {
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
}, Xf = {
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
function _n(e, r, t) {
  for (var n = e < 0 ? -1 : 1, i = e * n, a = 0, s = 1, o = 0, c = 1, f = 0, l = 0, h = Math.floor(i); f < r && (h = Math.floor(i), o = h * s + a, l = h * f + c, !(i - h < 5e-8)); )
    i = 1 / (i - h), a = s, s = o, c = f, f = l;
  if (l > r && (f > r ? (l = c, o = a) : (l = f, o = s)), !t)
    return [0, n * o, l];
  var x = Math.floor(n * o / l);
  return [x, n * o - x * l, l];
}
function an(e, r, t) {
  if (e > 2958465 || e < 0)
    return null;
  var n = e | 0, i = Math.floor(86400 * (e - n)), a = 0, s = [], o = { D: n, T: i, u: 86400 * (e - n) - i, y: 0, m: 0, d: 0, H: 0, M: 0, S: 0, q: 0 };
  if (Math.abs(o.u) < 1e-6 && (o.u = 0), r && r.date1904 && (n += 1462), o.u > 0.9999 && (o.u = 0, ++i == 86400 && (o.T = i = 0, ++n, ++o.D)), n === 60)
    s = t ? [1317, 10, 29] : [1900, 2, 29], a = 3;
  else if (n === 0)
    s = t ? [1317, 8, 29] : [1900, 1, 0], a = 6;
  else {
    n > 60 && --n;
    var c = new Date(1900, 0, 1);
    c.setDate(c.getDate() + n - 1), s = [c.getFullYear(), c.getMonth() + 1, c.getDate()], a = c.getDay(), n < 60 && (a = (a + 6) % 7), t && (a = Kf(c, s));
  }
  return o.y = s[0], o.m = s[1], o.d = s[2], o.S = i % 60, i = Math.floor(i / 60), o.M = i % 60, i = Math.floor(i / 60), o.H = i, o.q = a, o;
}
var t0 = /* @__PURE__ */ new Date(1899, 11, 31, 0, 0, 0), Vf = /* @__PURE__ */ t0.getTime(), Yf = /* @__PURE__ */ new Date(1900, 2, 1, 0, 0, 0);
function r0(e, r) {
  var t = /* @__PURE__ */ e.getTime();
  return r ? t -= 1461 * 24 * 60 * 60 * 1e3 : e >= Yf && (t += 24 * 60 * 60 * 1e3), (t - (Vf + (/* @__PURE__ */ e.getTimezoneOffset() - /* @__PURE__ */ t0.getTimezoneOffset()) * 6e4)) / (24 * 60 * 60 * 1e3);
}
function di(e) {
  return e.indexOf(".") == -1 ? e : e.replace(/(?:\.0*|(\.\d*[1-9])0+)$/, "$1");
}
function Gf(e) {
  return e.indexOf("E") == -1 ? e : e.replace(/(?:\.0*|(\.\d*[1-9])0+)[Ee]/, "$1E").replace(/(E[+-])(\d)$/, "$10$2");
}
function $f(e) {
  var r = e < 0 ? 12 : 11, t = di(e.toFixed(12));
  return t.length <= r || (t = e.toPrecision(10), t.length <= r) ? t : e.toExponential(5);
}
function zf(e) {
  var r = di(e.toFixed(11));
  return r.length > (e < 0 ? 12 : 11) || r === "0" || r === "-0" ? e.toPrecision(6) : r;
}
function jf(e) {
  var r = Math.floor(Math.log(Math.abs(e)) * Math.LOG10E), t;
  return r >= -4 && r <= -1 ? t = e.toPrecision(10 + r) : Math.abs(r) <= 9 ? t = $f(e) : r === 10 ? t = e.toFixed(10).substr(0, 12) : t = zf(e), di(Gf(t.toUpperCase()));
}
function ni(e, r) {
  switch (typeof e) {
    case "string":
      return e;
    case "boolean":
      return e ? "TRUE" : "FALSE";
    case "number":
      return (e | 0) === e ? e.toString(10) : jf(e);
    case "undefined":
      return "";
    case "object":
      if (e == null)
        return "";
      if (e instanceof Date)
        return Yt(14, r0(e, r && r.date1904), r);
  }
  throw new Error("unsupported value in General format: " + e);
}
function Kf(e, r) {
  r[0] -= 581;
  var t = e.getDay();
  return e < 60 && (t = (t + 6) % 7), t;
}
function qf(e, r, t, n) {
  var i = "", a = 0, s = 0, o = t.y, c, f = 0;
  switch (e) {
    case 98:
      o = t.y + 543;
    case 121:
      switch (r.length) {
        case 1:
        case 2:
          c = o % 100, f = 2;
          break;
        default:
          c = o % 1e4, f = 4;
          break;
      }
      break;
    case 109:
      switch (r.length) {
        case 1:
        case 2:
          c = t.m, f = r.length;
          break;
        case 3:
          return jn[t.m - 1][1];
        case 5:
          return jn[t.m - 1][0];
        default:
          return jn[t.m - 1][2];
      }
      break;
    case 100:
      switch (r.length) {
        case 1:
        case 2:
          c = t.d, f = r.length;
          break;
        case 3:
          return na[t.q][0];
        default:
          return na[t.q][1];
      }
      break;
    case 104:
      switch (r.length) {
        case 1:
        case 2:
          c = 1 + (t.H + 11) % 12, f = r.length;
          break;
        default:
          throw "bad hour format: " + r;
      }
      break;
    case 72:
      switch (r.length) {
        case 1:
        case 2:
          c = t.H, f = r.length;
          break;
        default:
          throw "bad hour format: " + r;
      }
      break;
    case 77:
      switch (r.length) {
        case 1:
        case 2:
          c = t.M, f = r.length;
          break;
        default:
          throw "bad minute format: " + r;
      }
      break;
    case 115:
      if (r != "s" && r != "ss" && r != ".0" && r != ".00" && r != ".000")
        throw "bad second format: " + r;
      return t.u === 0 && (r == "s" || r == "ss") ? Tt(t.S, r.length) : (n >= 2 ? s = n === 3 ? 1e3 : 100 : s = n === 1 ? 10 : 1, a = Math.round(s * (t.S + t.u)), a >= 60 * s && (a = 0), r === "s" ? a === 0 ? "0" : "" + a / s : (i = Tt(a, 2 + n), r === "ss" ? i.substr(0, 2) : "." + i.substr(2, r.length - 1)));
    case 90:
      switch (r) {
        case "[h]":
        case "[hh]":
          c = t.D * 24 + t.H;
          break;
        case "[m]":
        case "[mm]":
          c = (t.D * 24 + t.H) * 60 + t.M;
          break;
        case "[s]":
        case "[ss]":
          c = ((t.D * 24 + t.H) * 60 + t.M) * 60 + Math.round(t.S + t.u);
          break;
        default:
          throw "bad abstime format: " + r;
      }
      f = r.length === 3 ? 1 : 2;
      break;
    case 101:
      c = o, f = 1;
      break;
  }
  var l = f > 0 ? Tt(c, f) : "";
  return l;
}
function Wt(e) {
  var r = 3;
  if (e.length <= r)
    return e;
  for (var t = e.length % r, n = e.substr(0, t); t != e.length; t += r)
    n += (n.length > 0 ? "," : "") + e.substr(t, r);
  return n;
}
var n0 = /%/g;
function Jf(e, r, t) {
  var n = r.replace(n0, ""), i = r.length - n.length;
  return Nt(e, n, t * Math.pow(10, 2 * i)) + Fe("%", i);
}
function Zf(e, r, t) {
  for (var n = r.length - 1; r.charCodeAt(n - 1) === 44; )
    --n;
  return Nt(e, r.substr(0, n), t / Math.pow(10, 3 * (r.length - n)));
}
function i0(e, r) {
  var t, n = e.indexOf("E") - e.indexOf(".") - 1;
  if (e.match(/^#+0.0E\+0$/)) {
    if (r == 0)
      return "0.0E+0";
    if (r < 0)
      return "-" + i0(e, -r);
    var i = e.indexOf(".");
    i === -1 && (i = e.indexOf("E"));
    var a = Math.floor(Math.log(r) * Math.LOG10E) % i;
    if (a < 0 && (a += i), t = (r / Math.pow(10, a)).toPrecision(n + 1 + (i + a) % i), t.indexOf("e") === -1) {
      var s = Math.floor(Math.log(r) * Math.LOG10E);
      for (t.indexOf(".") === -1 ? t = t.charAt(0) + "." + t.substr(1) + "E+" + (s - t.length + a) : t += "E+" + (s - a); t.substr(0, 2) === "0."; )
        t = t.charAt(0) + t.substr(2, i) + "." + t.substr(2 + i), t = t.replace(/^0+([1-9])/, "$1").replace(/^0+\./, "0.");
      t = t.replace(/\+-/, "-");
    }
    t = t.replace(/^([+-]?)(\d*)\.(\d*)[Ee]/, function(o, c, f, l) {
      return c + f + l.substr(0, (i + a) % i) + "." + l.substr(a) + "E";
    });
  } else
    t = r.toExponential(n);
  return e.match(/E\+00$/) && t.match(/e[+-]\d$/) && (t = t.substr(0, t.length - 1) + "0" + t.charAt(t.length - 1)), e.match(/E\-/) && t.match(/e\+/) && (t = t.replace(/e\+/, "e")), t.replace("e", "E");
}
var a0 = /# (\?+)( ?)\/( ?)(\d+)/;
function Qf(e, r, t) {
  var n = parseInt(e[4], 10), i = Math.round(r * n), a = Math.floor(i / n), s = i - a * n, o = n;
  return t + (a === 0 ? "" : "" + a) + " " + (s === 0 ? Fe(" ", e[1].length + 1 + e[4].length) : xi(s, e[1].length) + e[2] + "/" + e[3] + Tt(o, e[4].length));
}
function el(e, r, t) {
  return t + (r === 0 ? "" : "" + r) + Fe(" ", e[1].length + 2 + e[4].length);
}
var s0 = /^#*0*\.([0#]+)/, o0 = /\).*[0#]/, f0 = /\(###\) ###\\?-####/;
function Je(e) {
  for (var r = "", t, n = 0; n != e.length; ++n)
    switch (t = e.charCodeAt(n)) {
      case 35:
        break;
      case 63:
        r += " ";
        break;
      case 48:
        r += "0";
        break;
      default:
        r += String.fromCharCode(t);
    }
  return r;
}
function aa(e, r) {
  var t = Math.pow(10, r);
  return "" + Math.round(e * t) / t;
}
function sa(e, r) {
  var t = e - Math.floor(e), n = Math.pow(10, r);
  return r < ("" + Math.round(t * n)).length ? 0 : Math.round(t * n);
}
function tl(e, r) {
  return r < ("" + Math.round((e - Math.floor(e)) * Math.pow(10, r))).length ? 1 : 0;
}
function rl(e) {
  return e < 2147483647 && e > -2147483648 ? "" + (e >= 0 ? e | 0 : e - 1 | 0) : "" + Math.floor(e);
}
function dt(e, r, t) {
  if (e.charCodeAt(0) === 40 && !r.match(o0)) {
    var n = r.replace(/\( */, "").replace(/ \)/, "").replace(/\)/, "");
    return t >= 0 ? dt("n", n, t) : "(" + dt("n", n, -t) + ")";
  }
  if (r.charCodeAt(r.length - 1) === 44)
    return Zf(e, r, t);
  if (r.indexOf("%") !== -1)
    return Jf(e, r, t);
  if (r.indexOf("E") !== -1)
    return i0(r, t);
  if (r.charCodeAt(0) === 36)
    return "$" + dt(e, r.substr(r.charAt(1) == " " ? 2 : 1), t);
  var i, a, s, o, c = Math.abs(t), f = t < 0 ? "-" : "";
  if (r.match(/^00+$/))
    return f + cr(c, r.length);
  if (r.match(/^[#?]+$/))
    return i = cr(t, 0), i === "0" && (i = ""), i.length > r.length ? i : Je(r.substr(0, r.length - i.length)) + i;
  if (a = r.match(a0))
    return Qf(a, c, f);
  if (r.match(/^#+0+$/))
    return f + cr(c, r.length - r.indexOf("0"));
  if (a = r.match(s0))
    return i = aa(t, a[1].length).replace(/^([^\.]+)$/, "$1." + Je(a[1])).replace(/\.$/, "." + Je(a[1])).replace(/\.(\d*)$/, function(v, u) {
      return "." + u + Fe("0", Je(a[1]).length - u.length);
    }), r.indexOf("0.") !== -1 ? i : i.replace(/^0\./, ".");
  if (r = r.replace(/^#+([0.])/, "$1"), a = r.match(/^(0*)\.(#*)$/))
    return f + aa(c, a[2].length).replace(/\.(\d*[1-9])0*$/, ".$1").replace(/^(-?\d*)$/, "$1.").replace(/^0\./, a[1].length ? "0." : ".");
  if (a = r.match(/^#{1,3},##0(\.?)$/))
    return f + Wt(cr(c, 0));
  if (a = r.match(/^#,##0\.([#0]*0)$/))
    return t < 0 ? "-" + dt(e, r, -t) : Wt("" + (Math.floor(t) + tl(t, a[1].length))) + "." + Tt(sa(t, a[1].length), a[1].length);
  if (a = r.match(/^#,#*,#0/))
    return dt(e, r.replace(/^#,#*,/, ""), t);
  if (a = r.match(/^([0#]+)(\\?-([0#]+))+$/))
    return i = pr(dt(e, r.replace(/[\\-]/g, ""), t)), s = 0, pr(pr(r.replace(/\\/g, "")).replace(/[0#]/g, function(v) {
      return s < i.length ? i.charAt(s++) : v === "0" ? "0" : "";
    }));
  if (r.match(f0))
    return i = dt(e, "##########", t), "(" + i.substr(0, 3) + ") " + i.substr(3, 3) + "-" + i.substr(6);
  var l = "";
  if (a = r.match(/^([#0?]+)( ?)\/( ?)([#0?]+)/))
    return s = Math.min(a[4].length, 7), o = _n(c, Math.pow(10, s) - 1, !1), i = "" + f, l = Nt("n", a[1], o[1]), l.charAt(l.length - 1) == " " && (l = l.substr(0, l.length - 1) + "0"), i += l + a[2] + "/" + a[3], l = vn(o[2], s), l.length < a[4].length && (l = Je(a[4].substr(a[4].length - l.length)) + l), i += l, i;
  if (a = r.match(/^# ([#0?]+)( ?)\/( ?)([#0?]+)/))
    return s = Math.min(Math.max(a[1].length, a[4].length), 7), o = _n(c, Math.pow(10, s) - 1, !0), f + (o[0] || (o[1] ? "" : "0")) + " " + (o[1] ? xi(o[1], s) + a[2] + "/" + a[3] + vn(o[2], s) : Fe(" ", 2 * s + 1 + a[2].length + a[3].length));
  if (a = r.match(/^[#0?]+$/))
    return i = cr(t, 0), r.length <= i.length ? i : Je(r.substr(0, r.length - i.length)) + i;
  if (a = r.match(/^([#0?]+)\.([#0]+)$/)) {
    i = "" + t.toFixed(Math.min(a[2].length, 10)).replace(/([^0])0+$/, "$1"), s = i.indexOf(".");
    var h = r.indexOf(".") - s, x = r.length - i.length - h;
    return Je(r.substr(0, h) + i + r.substr(r.length - x));
  }
  if (a = r.match(/^00,000\.([#0]*0)$/))
    return s = sa(t, a[1].length), t < 0 ? "-" + dt(e, r, -t) : Wt(rl(t)).replace(/^\d,\d{3}$/, "0$&").replace(/^\d*$/, function(v) {
      return "00," + (v.length < 3 ? Tt(0, 3 - v.length) : "") + v;
    }) + "." + Tt(s, a[1].length);
  switch (r) {
    case "###,##0.00":
      return dt(e, "#,##0.00", t);
    case "###,###":
    case "##,###":
    case "#,###":
      var d = Wt(cr(c, 0));
      return d !== "0" ? f + d : "";
    case "###,###.00":
      return dt(e, "###,##0.00", t).replace(/^0\./, ".");
    case "#,###.00":
      return dt(e, "#,##0.00", t).replace(/^0\./, ".");
  }
  throw new Error("unsupported format |" + r + "|");
}
function nl(e, r, t) {
  for (var n = r.length - 1; r.charCodeAt(n - 1) === 44; )
    --n;
  return Nt(e, r.substr(0, n), t / Math.pow(10, 3 * (r.length - n)));
}
function il(e, r, t) {
  var n = r.replace(n0, ""), i = r.length - n.length;
  return Nt(e, n, t * Math.pow(10, 2 * i)) + Fe("%", i);
}
function l0(e, r) {
  var t, n = e.indexOf("E") - e.indexOf(".") - 1;
  if (e.match(/^#+0.0E\+0$/)) {
    if (r == 0)
      return "0.0E+0";
    if (r < 0)
      return "-" + l0(e, -r);
    var i = e.indexOf(".");
    i === -1 && (i = e.indexOf("E"));
    var a = Math.floor(Math.log(r) * Math.LOG10E) % i;
    if (a < 0 && (a += i), t = (r / Math.pow(10, a)).toPrecision(n + 1 + (i + a) % i), !t.match(/[Ee]/)) {
      var s = Math.floor(Math.log(r) * Math.LOG10E);
      t.indexOf(".") === -1 ? t = t.charAt(0) + "." + t.substr(1) + "E+" + (s - t.length + a) : t += "E+" + (s - a), t = t.replace(/\+-/, "-");
    }
    t = t.replace(/^([+-]?)(\d*)\.(\d*)[Ee]/, function(o, c, f, l) {
      return c + f + l.substr(0, (i + a) % i) + "." + l.substr(a) + "E";
    });
  } else
    t = r.toExponential(n);
  return e.match(/E\+00$/) && t.match(/e[+-]\d$/) && (t = t.substr(0, t.length - 1) + "0" + t.charAt(t.length - 1)), e.match(/E\-/) && t.match(/e\+/) && (t = t.replace(/e\+/, "e")), t.replace("e", "E");
}
function yt(e, r, t) {
  if (e.charCodeAt(0) === 40 && !r.match(o0)) {
    var n = r.replace(/\( */, "").replace(/ \)/, "").replace(/\)/, "");
    return t >= 0 ? yt("n", n, t) : "(" + yt("n", n, -t) + ")";
  }
  if (r.charCodeAt(r.length - 1) === 44)
    return nl(e, r, t);
  if (r.indexOf("%") !== -1)
    return il(e, r, t);
  if (r.indexOf("E") !== -1)
    return l0(r, t);
  if (r.charCodeAt(0) === 36)
    return "$" + yt(e, r.substr(r.charAt(1) == " " ? 2 : 1), t);
  var i, a, s, o, c = Math.abs(t), f = t < 0 ? "-" : "";
  if (r.match(/^00+$/))
    return f + Tt(c, r.length);
  if (r.match(/^[#?]+$/))
    return i = "" + t, t === 0 && (i = ""), i.length > r.length ? i : Je(r.substr(0, r.length - i.length)) + i;
  if (a = r.match(a0))
    return el(a, c, f);
  if (r.match(/^#+0+$/))
    return f + Tt(c, r.length - r.indexOf("0"));
  if (a = r.match(s0))
    return i = ("" + t).replace(/^([^\.]+)$/, "$1." + Je(a[1])).replace(/\.$/, "." + Je(a[1])), i = i.replace(/\.(\d*)$/, function(v, u) {
      return "." + u + Fe("0", Je(a[1]).length - u.length);
    }), r.indexOf("0.") !== -1 ? i : i.replace(/^0\./, ".");
  if (r = r.replace(/^#+([0.])/, "$1"), a = r.match(/^(0*)\.(#*)$/))
    return f + ("" + c).replace(/\.(\d*[1-9])0*$/, ".$1").replace(/^(-?\d*)$/, "$1.").replace(/^0\./, a[1].length ? "0." : ".");
  if (a = r.match(/^#{1,3},##0(\.?)$/))
    return f + Wt("" + c);
  if (a = r.match(/^#,##0\.([#0]*0)$/))
    return t < 0 ? "-" + yt(e, r, -t) : Wt("" + t) + "." + Fe("0", a[1].length);
  if (a = r.match(/^#,#*,#0/))
    return yt(e, r.replace(/^#,#*,/, ""), t);
  if (a = r.match(/^([0#]+)(\\?-([0#]+))+$/))
    return i = pr(yt(e, r.replace(/[\\-]/g, ""), t)), s = 0, pr(pr(r.replace(/\\/g, "")).replace(/[0#]/g, function(v) {
      return s < i.length ? i.charAt(s++) : v === "0" ? "0" : "";
    }));
  if (r.match(f0))
    return i = yt(e, "##########", t), "(" + i.substr(0, 3) + ") " + i.substr(3, 3) + "-" + i.substr(6);
  var l = "";
  if (a = r.match(/^([#0?]+)( ?)\/( ?)([#0?]+)/))
    return s = Math.min(a[4].length, 7), o = _n(c, Math.pow(10, s) - 1, !1), i = "" + f, l = Nt("n", a[1], o[1]), l.charAt(l.length - 1) == " " && (l = l.substr(0, l.length - 1) + "0"), i += l + a[2] + "/" + a[3], l = vn(o[2], s), l.length < a[4].length && (l = Je(a[4].substr(a[4].length - l.length)) + l), i += l, i;
  if (a = r.match(/^# ([#0?]+)( ?)\/( ?)([#0?]+)/))
    return s = Math.min(Math.max(a[1].length, a[4].length), 7), o = _n(c, Math.pow(10, s) - 1, !0), f + (o[0] || (o[1] ? "" : "0")) + " " + (o[1] ? xi(o[1], s) + a[2] + "/" + a[3] + vn(o[2], s) : Fe(" ", 2 * s + 1 + a[2].length + a[3].length));
  if (a = r.match(/^[#0?]+$/))
    return i = "" + t, r.length <= i.length ? i : Je(r.substr(0, r.length - i.length)) + i;
  if (a = r.match(/^([#0]+)\.([#0]+)$/)) {
    i = "" + t.toFixed(Math.min(a[2].length, 10)).replace(/([^0])0+$/, "$1"), s = i.indexOf(".");
    var h = r.indexOf(".") - s, x = r.length - i.length - h;
    return Je(r.substr(0, h) + i + r.substr(r.length - x));
  }
  if (a = r.match(/^00,000\.([#0]*0)$/))
    return t < 0 ? "-" + yt(e, r, -t) : Wt("" + t).replace(/^\d,\d{3}$/, "0$&").replace(/^\d*$/, function(v) {
      return "00," + (v.length < 3 ? Tt(0, 3 - v.length) : "") + v;
    }) + "." + Tt(0, a[1].length);
  switch (r) {
    case "###,###":
    case "##,###":
    case "#,###":
      var d = Wt("" + c);
      return d !== "0" ? f + d : "";
    default:
      if (r.match(/\.[0#?]*$/))
        return yt(e, r.slice(0, r.lastIndexOf(".")), t) + Je(r.slice(r.lastIndexOf(".")));
  }
  throw new Error("unsupported format |" + r + "|");
}
function Nt(e, r, t) {
  return (t | 0) === t ? yt(e, r, t) : dt(e, r, t);
}
function al(e) {
  for (var r = [], t = !1, n = 0, i = 0; n < e.length; ++n)
    switch (e.charCodeAt(n)) {
      case 34:
        t = !t;
        break;
      case 95:
      case 42:
      case 92:
        ++n;
        break;
      case 59:
        r[r.length] = e.substr(i, n - i), i = n + 1;
    }
  if (r[r.length] = e.substr(i), t === !0)
    throw new Error("Format |" + e + "| unterminated string ");
  return r;
}
var c0 = /\[[HhMmSs\u0E0A\u0E19\u0E17]*\]/;
function h0(e) {
  for (var r = 0, t = "", n = ""; r < e.length; )
    switch (t = e.charAt(r)) {
      case "G":
        mn(e, r) && (r += 6), r++;
        break;
      case '"':
        for (; e.charCodeAt(++r) !== 34 && r < e.length; )
          ;
        ++r;
        break;
      case "\\":
        r += 2;
        break;
      case "_":
        r += 2;
        break;
      case "@":
        ++r;
        break;
      case "B":
      case "b":
        if (e.charAt(r + 1) === "1" || e.charAt(r + 1) === "2")
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
        if (e.substr(r, 3).toUpperCase() === "A/P" || e.substr(r, 5).toUpperCase() === "AM/PM" || e.substr(r, 5).toUpperCase() === "\u4E0A\u5348/\u4E0B\u5348")
          return !0;
        ++r;
        break;
      case "[":
        for (n = t; e.charAt(r++) !== "]" && r < e.length; )
          n += e.charAt(r);
        if (n.match(c0))
          return !0;
        break;
      case ".":
      case "0":
      case "#":
        for (; r < e.length && ("0#?.,E+-%".indexOf(t = e.charAt(++r)) > -1 || t == "\\" && e.charAt(r + 1) == "-" && "0#".indexOf(e.charAt(r + 2)) > -1); )
          ;
        break;
      case "?":
        for (; e.charAt(++r) === t; )
          ;
        break;
      case "*":
        ++r, (e.charAt(r) == " " || e.charAt(r) == "*") && ++r;
        break;
      case "(":
      case ")":
        ++r;
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
        for (; r < e.length && "0123456789".indexOf(e.charAt(++r)) > -1; )
          ;
        break;
      case " ":
        ++r;
        break;
      default:
        ++r;
        break;
    }
  return !1;
}
function sl(e, r, t, n) {
  for (var i = [], a = "", s = 0, o = "", c = "t", f, l, h, x = "H"; s < e.length; )
    switch (o = e.charAt(s)) {
      case "G":
        if (!mn(e, s))
          throw new Error("unrecognized character " + o + " in " + e);
        i[i.length] = { t: "G", v: "General" }, s += 7;
        break;
      case '"':
        for (a = ""; (h = e.charCodeAt(++s)) !== 34 && s < e.length; )
          a += String.fromCharCode(h);
        i[i.length] = { t: "t", v: a }, ++s;
        break;
      case "\\":
        var d = e.charAt(++s), v = d === "(" || d === ")" ? d : "t";
        i[i.length] = { t: v, v: d }, ++s;
        break;
      case "_":
        i[i.length] = { t: "t", v: " " }, s += 2;
        break;
      case "@":
        i[i.length] = { t: "T", v: r }, ++s;
        break;
      case "B":
      case "b":
        if (e.charAt(s + 1) === "1" || e.charAt(s + 1) === "2") {
          if (f == null && (f = an(r, t, e.charAt(s + 1) === "2"), f == null))
            return "";
          i[i.length] = { t: "X", v: e.substr(s, 2) }, c = o, s += 2;
          break;
        }
      case "M":
      case "D":
      case "Y":
      case "H":
      case "S":
      case "E":
        o = o.toLowerCase();
      case "m":
      case "d":
      case "y":
      case "h":
      case "s":
      case "e":
      case "g":
        if (r < 0 || f == null && (f = an(r, t), f == null))
          return "";
        for (a = o; ++s < e.length && e.charAt(s).toLowerCase() === o; )
          a += o;
        o === "m" && c.toLowerCase() === "h" && (o = "M"), o === "h" && (o = x), i[i.length] = { t: o, v: a }, c = o;
        break;
      case "A":
      case "a":
      case "\u4E0A":
        var u = { t: o, v: o };
        if (f == null && (f = an(r, t)), e.substr(s, 3).toUpperCase() === "A/P" ? (f != null && (u.v = f.H >= 12 ? "P" : "A"), u.t = "T", x = "h", s += 3) : e.substr(s, 5).toUpperCase() === "AM/PM" ? (f != null && (u.v = f.H >= 12 ? "PM" : "AM"), u.t = "T", s += 5, x = "h") : e.substr(s, 5).toUpperCase() === "\u4E0A\u5348/\u4E0B\u5348" ? (f != null && (u.v = f.H >= 12 ? "\u4E0B\u5348" : "\u4E0A\u5348"), u.t = "T", s += 5, x = "h") : (u.t = "t", ++s), f == null && u.t === "T")
          return "";
        i[i.length] = u, c = o;
        break;
      case "[":
        for (a = o; e.charAt(s++) !== "]" && s < e.length; )
          a += e.charAt(s);
        if (a.slice(-1) !== "]")
          throw 'unterminated "[" block: |' + a + "|";
        if (a.match(c0)) {
          if (f == null && (f = an(r, t), f == null))
            return "";
          i[i.length] = { t: "Z", v: a.toLowerCase() }, c = a.charAt(1);
        } else
          a.indexOf("$") > -1 && (a = (a.match(/\$([^-\[\]]*)/) || [])[1] || "$", h0(e) || (i[i.length] = { t: "t", v: a }));
        break;
      case ".":
        if (f != null) {
          for (a = o; ++s < e.length && (o = e.charAt(s)) === "0"; )
            a += o;
          i[i.length] = { t: "s", v: a };
          break;
        }
      case "0":
      case "#":
        for (a = o; ++s < e.length && "0#?.,E+-%".indexOf(o = e.charAt(s)) > -1; )
          a += o;
        i[i.length] = { t: "n", v: a };
        break;
      case "?":
        for (a = o; e.charAt(++s) === o; )
          a += o;
        i[i.length] = { t: o, v: a }, c = o;
        break;
      case "*":
        ++s, (e.charAt(s) == " " || e.charAt(s) == "*") && ++s;
        break;
      case "(":
      case ")":
        i[i.length] = { t: n === 1 ? "t" : o, v: o }, ++s;
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
        for (a = o; s < e.length && "0123456789".indexOf(e.charAt(++s)) > -1; )
          a += e.charAt(s);
        i[i.length] = { t: "D", v: a };
        break;
      case " ":
        i[i.length] = { t: o, v: o }, ++s;
        break;
      case "$":
        i[i.length] = { t: "t", v: "$" }, ++s;
        break;
      default:
        if (",$-+/():!^&'~{}<>=\u20ACacfijklopqrtuvwxzP".indexOf(o) === -1)
          throw new Error("unrecognized character " + o + " in " + e);
        i[i.length] = { t: "t", v: o }, ++s;
        break;
    }
  var g = 0, S = 0, A;
  for (s = i.length - 1, c = "t"; s >= 0; --s)
    switch (i[s].t) {
      case "h":
      case "H":
        i[s].t = x, c = "h", g < 1 && (g = 1);
        break;
      case "s":
        (A = i[s].v.match(/\.0+$/)) && (S = Math.max(S, A[0].length - 1)), g < 3 && (g = 3);
      case "d":
      case "y":
      case "M":
      case "e":
        c = i[s].t;
        break;
      case "m":
        c === "s" && (i[s].t = "M", g < 2 && (g = 2));
        break;
      case "X":
        break;
      case "Z":
        g < 1 && i[s].v.match(/[Hh]/) && (g = 1), g < 2 && i[s].v.match(/[Mm]/) && (g = 2), g < 3 && i[s].v.match(/[Ss]/) && (g = 3);
    }
  switch (g) {
    case 0:
      break;
    case 1:
      f.u >= 0.5 && (f.u = 0, ++f.S), f.S >= 60 && (f.S = 0, ++f.M), f.M >= 60 && (f.M = 0, ++f.H);
      break;
    case 2:
      f.u >= 0.5 && (f.u = 0, ++f.S), f.S >= 60 && (f.S = 0, ++f.M);
      break;
  }
  var C = "", I;
  for (s = 0; s < i.length; ++s)
    switch (i[s].t) {
      case "t":
      case "T":
      case " ":
      case "D":
        break;
      case "X":
        i[s].v = "", i[s].t = ";";
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
        i[s].v = qf(i[s].t.charCodeAt(0), i[s].v, f, S), i[s].t = "t";
        break;
      case "n":
      case "?":
        for (I = s + 1; i[I] != null && ((o = i[I].t) === "?" || o === "D" || (o === " " || o === "t") && i[I + 1] != null && (i[I + 1].t === "?" || i[I + 1].t === "t" && i[I + 1].v === "/") || i[s].t === "(" && (o === " " || o === "n" || o === ")") || o === "t" && (i[I].v === "/" || i[I].v === " " && i[I + 1] != null && i[I + 1].t == "?")); )
          i[s].v += i[I].v, i[I] = { v: "", t: ";" }, ++I;
        C += i[s].v, s = I - 1;
        break;
      case "G":
        i[s].t = "t", i[s].v = ni(r, t);
        break;
    }
  var Y = "", Q, D;
  if (C.length > 0) {
    C.charCodeAt(0) == 40 ? (Q = r < 0 && C.charCodeAt(0) === 45 ? -r : r, D = Nt("n", C, Q)) : (Q = r < 0 && n > 1 ? -r : r, D = Nt("n", C, Q), Q < 0 && i[0] && i[0].t == "t" && (D = D.substr(1), i[0].v = "-" + i[0].v)), I = D.length - 1;
    var H = i.length;
    for (s = 0; s < i.length; ++s)
      if (i[s] != null && i[s].t != "t" && i[s].v.indexOf(".") > -1) {
        H = s;
        break;
      }
    var M = i.length;
    if (H === i.length && D.indexOf("E") === -1) {
      for (s = i.length - 1; s >= 0; --s)
        i[s] == null || "n?".indexOf(i[s].t) === -1 || (I >= i[s].v.length - 1 ? (I -= i[s].v.length, i[s].v = D.substr(I + 1, i[s].v.length)) : I < 0 ? i[s].v = "" : (i[s].v = D.substr(0, I + 1), I = -1), i[s].t = "t", M = s);
      I >= 0 && M < i.length && (i[M].v = D.substr(0, I + 1) + i[M].v);
    } else if (H !== i.length && D.indexOf("E") === -1) {
      for (I = D.indexOf(".") - 1, s = H; s >= 0; --s)
        if (!(i[s] == null || "n?".indexOf(i[s].t) === -1)) {
          for (l = i[s].v.indexOf(".") > -1 && s === H ? i[s].v.indexOf(".") - 1 : i[s].v.length - 1, Y = i[s].v.substr(l + 1); l >= 0; --l)
            I >= 0 && (i[s].v.charAt(l) === "0" || i[s].v.charAt(l) === "#") && (Y = D.charAt(I--) + Y);
          i[s].v = Y, i[s].t = "t", M = s;
        }
      for (I >= 0 && M < i.length && (i[M].v = D.substr(0, I + 1) + i[M].v), I = D.indexOf(".") + 1, s = H; s < i.length; ++s)
        if (!(i[s] == null || "n?(".indexOf(i[s].t) === -1 && s !== H)) {
          for (l = i[s].v.indexOf(".") > -1 && s === H ? i[s].v.indexOf(".") + 1 : 0, Y = i[s].v.substr(0, l); l < i[s].v.length; ++l)
            I < D.length && (Y += D.charAt(I++));
          i[s].v = Y, i[s].t = "t", M = s;
        }
    }
  }
  for (s = 0; s < i.length; ++s)
    i[s] != null && "n?".indexOf(i[s].t) > -1 && (Q = n > 1 && r < 0 && s > 0 && i[s - 1].v === "-" ? -r : r, i[s].v = Nt(i[s].t, i[s].v, Q), i[s].t = "t");
  var V = "";
  for (s = 0; s !== i.length; ++s)
    i[s] != null && (V += i[s].v);
  return V;
}
var oa = /\[(=|>[=]?|<[>=]?)(-?\d+(?:\.\d*)?)\]/;
function fa(e, r) {
  if (r == null)
    return !1;
  var t = parseFloat(r[2]);
  switch (r[1]) {
    case "=":
      if (e == t)
        return !0;
      break;
    case ">":
      if (e > t)
        return !0;
      break;
    case "<":
      if (e < t)
        return !0;
      break;
    case "<>":
      if (e != t)
        return !0;
      break;
    case ">=":
      if (e >= t)
        return !0;
      break;
    case "<=":
      if (e <= t)
        return !0;
      break;
  }
  return !1;
}
function ol(e, r) {
  var t = al(e), n = t.length, i = t[n - 1].indexOf("@");
  if (n < 4 && i > -1 && --n, t.length > 4)
    throw new Error("cannot find right format for |" + t.join("|") + "|");
  if (typeof r != "number")
    return [4, t.length === 4 || i > -1 ? t[t.length - 1] : "@"];
  switch (t.length) {
    case 1:
      t = i > -1 ? ["General", "General", "General", t[0]] : [t[0], t[0], t[0], "@"];
      break;
    case 2:
      t = i > -1 ? [t[0], t[0], t[0], t[1]] : [t[0], t[1], t[0], "@"];
      break;
    case 3:
      t = i > -1 ? [t[0], t[1], t[0], t[2]] : [t[0], t[1], t[2], "@"];
      break;
  }
  var a = r > 0 ? t[0] : r < 0 ? t[1] : t[2];
  if (t[0].indexOf("[") === -1 && t[1].indexOf("[") === -1)
    return [n, a];
  if (t[0].match(/\[[=<>]/) != null || t[1].match(/\[[=<>]/) != null) {
    var s = t[0].match(oa), o = t[1].match(oa);
    return fa(r, s) ? [n, t[0]] : fa(r, o) ? [n, t[1]] : [n, t[s != null && o != null ? 2 : 1]];
  }
  return [n, a];
}
function Yt(e, r, t) {
  t == null && (t = {});
  var n = "";
  switch (typeof e) {
    case "string":
      e == "m/d/yy" && t.dateNF ? n = t.dateNF : n = e;
      break;
    case "number":
      e == 14 && t.dateNF ? n = t.dateNF : n = (t.table != null ? t.table : Oe)[e], n == null && (n = t.table && t.table[ia[e]] || Oe[ia[e]]), n == null && (n = Xf[e] || "General");
      break;
  }
  if (mn(n, 0))
    return ni(r, t);
  r instanceof Date && (r = r0(r, t.date1904));
  var i = ol(n, r);
  if (mn(i[1]))
    return ni(r, t);
  if (r === !0)
    r = "TRUE";
  else if (r === !1)
    r = "FALSE";
  else if (r === "" || r == null)
    return "";
  return sl(i[1], r, t, i[0]);
}
function u0(e, r) {
  if (typeof r != "number") {
    r = +r || -1;
    for (var t = 0; t < 392; ++t) {
      if (Oe[t] == null) {
        r < 0 && (r = t);
        continue;
      }
      if (Oe[t] == e) {
        r = t;
        break;
      }
    }
    r < 0 && (r = 391);
  }
  return Oe[r] = e, r;
}
function Nn(e) {
  for (var r = 0; r != 392; ++r)
    e[r] !== void 0 && u0(e[r], r);
}
function Ln() {
  Oe = Wf();
}
var x0 = /[dD]+|[mM]+|[yYeE]+|[Hh]+|[Ss]+/g;
function fl(e) {
  var r = typeof e == "number" ? Oe[e] : e;
  return r = r.replace(x0, "(\\d+)"), new RegExp("^" + r + "$");
}
function ll(e, r, t) {
  var n = -1, i = -1, a = -1, s = -1, o = -1, c = -1;
  (r.match(x0) || []).forEach(function(h, x) {
    var d = parseInt(t[x + 1], 10);
    switch (h.toLowerCase().charAt(0)) {
      case "y":
        n = d;
        break;
      case "d":
        a = d;
        break;
      case "h":
        s = d;
        break;
      case "s":
        c = d;
        break;
      case "m":
        s >= 0 ? o = d : i = d;
        break;
    }
  }), c >= 0 && o == -1 && i >= 0 && (o = i, i = -1);
  var f = ("" + (n >= 0 ? n : new Date().getFullYear())).slice(-4) + "-" + ("00" + (i >= 1 ? i : 1)).slice(-2) + "-" + ("00" + (a >= 1 ? a : 1)).slice(-2);
  f.length == 7 && (f = "0" + f), f.length == 8 && (f = "20" + f);
  var l = ("00" + (s >= 0 ? s : 0)).slice(-2) + ":" + ("00" + (o >= 0 ? o : 0)).slice(-2) + ":" + ("00" + (c >= 0 ? c : 0)).slice(-2);
  return s == -1 && o == -1 && c == -1 ? f : n == -1 && i == -1 && a == -1 ? l : f + "T" + l;
}
var cl = /* @__PURE__ */ function() {
  var e = {};
  e.version = "1.2.0";
  function r() {
    for (var D = 0, H = new Array(256), M = 0; M != 256; ++M)
      D = M, D = D & 1 ? -306674912 ^ D >>> 1 : D >>> 1, D = D & 1 ? -306674912 ^ D >>> 1 : D >>> 1, D = D & 1 ? -306674912 ^ D >>> 1 : D >>> 1, D = D & 1 ? -306674912 ^ D >>> 1 : D >>> 1, D = D & 1 ? -306674912 ^ D >>> 1 : D >>> 1, D = D & 1 ? -306674912 ^ D >>> 1 : D >>> 1, D = D & 1 ? -306674912 ^ D >>> 1 : D >>> 1, D = D & 1 ? -306674912 ^ D >>> 1 : D >>> 1, H[M] = D;
    return typeof Int32Array < "u" ? new Int32Array(H) : H;
  }
  var t = r();
  function n(D) {
    var H = 0, M = 0, V = 0, G = typeof Int32Array < "u" ? new Int32Array(4096) : new Array(4096);
    for (V = 0; V != 256; ++V)
      G[V] = D[V];
    for (V = 0; V != 256; ++V)
      for (M = D[V], H = 256 + V; H < 4096; H += 256)
        M = G[H] = M >>> 8 ^ D[M & 255];
    var j = [];
    for (V = 1; V != 16; ++V)
      j[V - 1] = typeof Int32Array < "u" ? G.subarray(V * 256, V * 256 + 256) : G.slice(V * 256, V * 256 + 256);
    return j;
  }
  var i = n(t), a = i[0], s = i[1], o = i[2], c = i[3], f = i[4], l = i[5], h = i[6], x = i[7], d = i[8], v = i[9], u = i[10], g = i[11], S = i[12], A = i[13], C = i[14];
  function I(D, H) {
    for (var M = H ^ -1, V = 0, G = D.length; V < G; )
      M = M >>> 8 ^ t[(M ^ D.charCodeAt(V++)) & 255];
    return ~M;
  }
  function Y(D, H) {
    for (var M = H ^ -1, V = D.length - 15, G = 0; G < V; )
      M = C[D[G++] ^ M & 255] ^ A[D[G++] ^ M >> 8 & 255] ^ S[D[G++] ^ M >> 16 & 255] ^ g[D[G++] ^ M >>> 24] ^ u[D[G++]] ^ v[D[G++]] ^ d[D[G++]] ^ x[D[G++]] ^ h[D[G++]] ^ l[D[G++]] ^ f[D[G++]] ^ c[D[G++]] ^ o[D[G++]] ^ s[D[G++]] ^ a[D[G++]] ^ t[D[G++]];
    for (V += 15; G < V; )
      M = M >>> 8 ^ t[(M ^ D[G++]) & 255];
    return ~M;
  }
  function Q(D, H) {
    for (var M = H ^ -1, V = 0, G = D.length, j = 0, re = 0; V < G; )
      j = D.charCodeAt(V++), j < 128 ? M = M >>> 8 ^ t[(M ^ j) & 255] : j < 2048 ? (M = M >>> 8 ^ t[(M ^ (192 | j >> 6 & 31)) & 255], M = M >>> 8 ^ t[(M ^ (128 | j & 63)) & 255]) : j >= 55296 && j < 57344 ? (j = (j & 1023) + 64, re = D.charCodeAt(V++) & 1023, M = M >>> 8 ^ t[(M ^ (240 | j >> 8 & 7)) & 255], M = M >>> 8 ^ t[(M ^ (128 | j >> 2 & 63)) & 255], M = M >>> 8 ^ t[(M ^ (128 | re >> 6 & 15 | (j & 3) << 4)) & 255], M = M >>> 8 ^ t[(M ^ (128 | re & 63)) & 255]) : (M = M >>> 8 ^ t[(M ^ (224 | j >> 12 & 15)) & 255], M = M >>> 8 ^ t[(M ^ (128 | j >> 6 & 63)) & 255], M = M >>> 8 ^ t[(M ^ (128 | j & 63)) & 255]);
    return ~M;
  }
  return e.table = t, e.bstr = I, e.buf = Y, e.str = Q, e;
}(), Te = /* @__PURE__ */ function() {
  var r = {};
  r.version = "1.2.1";
  function t(p, w) {
    for (var m = p.split("/"), _ = w.split("/"), T = 0, E = 0, R = Math.min(m.length, _.length); T < R; ++T) {
      if (E = m[T].length - _[T].length)
        return E;
      if (m[T] != _[T])
        return m[T] < _[T] ? -1 : 1;
    }
    return m.length - _.length;
  }
  function n(p) {
    if (p.charAt(p.length - 1) == "/")
      return p.slice(0, -1).indexOf("/") === -1 ? p : n(p.slice(0, -1));
    var w = p.lastIndexOf("/");
    return w === -1 ? p : p.slice(0, w + 1);
  }
  function i(p) {
    if (p.charAt(p.length - 1) == "/")
      return i(p.slice(0, -1));
    var w = p.lastIndexOf("/");
    return w === -1 ? p : p.slice(w + 1);
  }
  function a(p, w) {
    typeof w == "string" && (w = new Date(w));
    var m = w.getHours();
    m = m << 6 | w.getMinutes(), m = m << 5 | w.getSeconds() >>> 1, p.write_shift(2, m);
    var _ = w.getFullYear() - 1980;
    _ = _ << 4 | w.getMonth() + 1, _ = _ << 5 | w.getDate(), p.write_shift(2, _);
  }
  function s(p) {
    var w = p.read_shift(2) & 65535, m = p.read_shift(2) & 65535, _ = new Date(), T = m & 31;
    m >>>= 5;
    var E = m & 15;
    m >>>= 4, _.setMilliseconds(0), _.setFullYear(m + 1980), _.setMonth(E - 1), _.setDate(T);
    var R = w & 31;
    w >>>= 5;
    var b = w & 63;
    return w >>>= 6, _.setHours(w), _.setMinutes(b), _.setSeconds(R << 1), _;
  }
  function o(p) {
    ft(p, 0);
    for (var w = {}, m = 0; p.l <= p.length - 4; ) {
      var _ = p.read_shift(2), T = p.read_shift(2), E = p.l + T, R = {};
      switch (_) {
        case 21589:
          m = p.read_shift(1), m & 1 && (R.mtime = p.read_shift(4)), T > 5 && (m & 2 && (R.atime = p.read_shift(4)), m & 4 && (R.ctime = p.read_shift(4))), R.mtime && (R.mt = new Date(R.mtime * 1e3));
          break;
      }
      p.l = E, w[_] = R;
    }
    return w;
  }
  var c;
  function f() {
    return c || (c = {});
  }
  function l(p, w) {
    if (p[0] == 80 && p[1] == 75)
      return Vi(p, w);
    if ((p[0] | 32) == 109 && (p[1] | 32) == 105)
      return Vs(p, w);
    if (p.length < 512)
      throw new Error("CFB file size " + p.length + " < 512");
    var m = 3, _ = 512, T = 0, E = 0, R = 0, b = 0, k = 0, N = [], L = p.slice(0, 512);
    ft(L, 0);
    var z = h(L);
    switch (m = z[0], m) {
      case 3:
        _ = 512;
        break;
      case 4:
        _ = 4096;
        break;
      case 0:
        if (z[1] == 0)
          return Vi(p, w);
      default:
        throw new Error("Major Version: Expected 3 or 4 saw " + m);
    }
    _ !== 512 && (L = p.slice(0, _), ft(L, 28));
    var Z = p.slice(0, _);
    x(L, m);
    var ne = L.read_shift(4, "i");
    if (m === 3 && ne !== 0)
      throw new Error("# Directory Sectors: Expected 0 saw " + ne);
    L.l += 4, R = L.read_shift(4, "i"), L.l += 4, L.chk("00100000", "Mini Stream Cutoff Size: "), b = L.read_shift(4, "i"), T = L.read_shift(4, "i"), k = L.read_shift(4, "i"), E = L.read_shift(4, "i");
    for (var K = -1, te = 0; te < 109 && (K = L.read_shift(4, "i"), !(K < 0)); ++te)
      N[te] = K;
    var fe = d(p, _);
    g(k, E, fe, _, N);
    var ye = A(fe, R, N, _);
    ye[R].name = "!Directory", T > 0 && b !== re && (ye[b].name = "!MiniFAT"), ye[N[0]].name = "!FAT", ye.fat_addrs = N, ye.ssz = _;
    var Ae = {}, ze = [], Cr = [], Fr = [];
    C(R, ye, fe, ze, T, Ae, Cr, b), v(Cr, Fr, ze), ze.shift();
    var Or = {
      FileIndex: Cr,
      FullPaths: Fr
    };
    return w && w.raw && (Or.raw = { header: Z, sectors: fe }), Or;
  }
  function h(p) {
    if (p[p.l] == 80 && p[p.l + 1] == 75)
      return [0, 0];
    p.chk(we, "Header Signature: "), p.l += 16;
    var w = p.read_shift(2, "u");
    return [p.read_shift(2, "u"), w];
  }
  function x(p, w) {
    var m = 9;
    switch (p.l += 2, m = p.read_shift(2)) {
      case 9:
        if (w != 3)
          throw new Error("Sector Shift: Expected 9 saw " + m);
        break;
      case 12:
        if (w != 4)
          throw new Error("Sector Shift: Expected 12 saw " + m);
        break;
      default:
        throw new Error("Sector Shift: Expected 9 or 12 saw " + m);
    }
    p.chk("0600", "Mini Sector Shift: "), p.chk("000000000000", "Reserved: ");
  }
  function d(p, w) {
    for (var m = Math.ceil(p.length / w) - 1, _ = [], T = 1; T < m; ++T)
      _[T - 1] = p.slice(T * w, (T + 1) * w);
    return _[m - 1] = p.slice(m * w), _;
  }
  function v(p, w, m) {
    for (var _ = 0, T = 0, E = 0, R = 0, b = 0, k = m.length, N = [], L = []; _ < k; ++_)
      N[_] = L[_] = _, w[_] = m[_];
    for (; b < L.length; ++b)
      _ = L[b], T = p[_].L, E = p[_].R, R = p[_].C, N[_] === _ && (T !== -1 && N[T] !== T && (N[_] = N[T]), E !== -1 && N[E] !== E && (N[_] = N[E])), R !== -1 && (N[R] = _), T !== -1 && _ != N[_] && (N[T] = N[_], L.lastIndexOf(T) < b && L.push(T)), E !== -1 && _ != N[_] && (N[E] = N[_], L.lastIndexOf(E) < b && L.push(E));
    for (_ = 1; _ < k; ++_)
      N[_] === _ && (E !== -1 && N[E] !== E ? N[_] = N[E] : T !== -1 && N[T] !== T && (N[_] = N[T]));
    for (_ = 1; _ < k; ++_)
      if (p[_].type !== 0) {
        if (b = _, b != N[b])
          do
            b = N[b], w[_] = w[b] + "/" + w[_];
          while (b !== 0 && N[b] !== -1 && b != N[b]);
        N[_] = -1;
      }
    for (w[0] += "/", _ = 1; _ < k; ++_)
      p[_].type !== 2 && (w[_] += "/");
  }
  function u(p, w, m) {
    for (var _ = p.start, T = p.size, E = [], R = _; m && T > 0 && R >= 0; )
      E.push(w.slice(R * j, R * j + j)), T -= j, R = Zt(m, R * 4);
    return E.length === 0 ? B(0) : Ve(E).slice(0, p.size);
  }
  function g(p, w, m, _, T) {
    var E = re;
    if (p === re) {
      if (w !== 0)
        throw new Error("DIFAT chain shorter than expected");
    } else if (p !== -1) {
      var R = m[p], b = (_ >>> 2) - 1;
      if (!R)
        return;
      for (var k = 0; k < b && (E = Zt(R, k * 4)) !== re; ++k)
        T.push(E);
      g(Zt(R, _ - 4), w - 1, m, _, T);
    }
  }
  function S(p, w, m, _, T) {
    var E = [], R = [];
    T || (T = []);
    var b = _ - 1, k = 0, N = 0;
    for (k = w; k >= 0; ) {
      T[k] = !0, E[E.length] = k, R.push(p[k]);
      var L = m[Math.floor(k * 4 / _)];
      if (N = k * 4 & b, _ < 4 + N)
        throw new Error("FAT boundary crossed: " + k + " 4 " + _);
      if (!p[L])
        break;
      k = Zt(p[L], N);
    }
    return { nodes: E, data: ga([R]) };
  }
  function A(p, w, m, _) {
    var T = p.length, E = [], R = [], b = [], k = [], N = _ - 1, L = 0, z = 0, Z = 0, ne = 0;
    for (L = 0; L < T; ++L)
      if (b = [], Z = L + w, Z >= T && (Z -= T), !R[Z]) {
        k = [];
        var K = [];
        for (z = Z; z >= 0; ) {
          K[z] = !0, R[z] = !0, b[b.length] = z, k.push(p[z]);
          var te = m[Math.floor(z * 4 / _)];
          if (ne = z * 4 & N, _ < 4 + ne)
            throw new Error("FAT boundary crossed: " + z + " 4 " + _);
          if (!p[te] || (z = Zt(p[te], ne), K[z]))
            break;
        }
        E[Z] = { nodes: b, data: ga([k]) };
      }
    return E;
  }
  function C(p, w, m, _, T, E, R, b) {
    for (var k = 0, N = _.length ? 2 : 0, L = w[p].data, z = 0, Z = 0, ne; z < L.length; z += 128) {
      var K = L.slice(z, z + 128);
      ft(K, 64), Z = K.read_shift(2), ne = _i(K, 0, Z - N), _.push(ne);
      var te = {
        name: ne,
        type: K.read_shift(1),
        color: K.read_shift(1),
        L: K.read_shift(4, "i"),
        R: K.read_shift(4, "i"),
        C: K.read_shift(4, "i"),
        clsid: K.read_shift(16),
        state: K.read_shift(4, "i"),
        start: 0,
        size: 0
      }, fe = K.read_shift(2) + K.read_shift(2) + K.read_shift(2) + K.read_shift(2);
      fe !== 0 && (te.ct = I(K, K.l - 8));
      var ye = K.read_shift(2) + K.read_shift(2) + K.read_shift(2) + K.read_shift(2);
      ye !== 0 && (te.mt = I(K, K.l - 8)), te.start = K.read_shift(4, "i"), te.size = K.read_shift(4, "i"), te.size < 0 && te.start < 0 && (te.size = te.type = 0, te.start = re, te.name = ""), te.type === 5 ? (k = te.start, T > 0 && k !== re && (w[k].name = "!StreamData")) : te.size >= 4096 ? (te.storage = "fat", w[te.start] === void 0 && (w[te.start] = S(m, te.start, w.fat_addrs, w.ssz)), w[te.start].name = te.name, te.content = w[te.start].data.slice(0, te.size)) : (te.storage = "minifat", te.size < 0 ? te.size = 0 : k !== re && te.start !== re && w[k] && (te.content = u(te, w[k].data, (w[b] || {}).data))), te.content && ft(te.content, 0), E[ne] = te, R.push(te);
    }
  }
  function I(p, w) {
    return new Date((ct(p, w + 4) / 1e7 * Math.pow(2, 32) + ct(p, w) / 1e7 - 11644473600) * 1e3);
  }
  function Y(p, w) {
    return f(), l(c.readFileSync(p), w);
  }
  function Q(p, w) {
    var m = w && w.type;
    switch (m || de && Buffer.isBuffer(p) && (m = "buffer"), m || "base64") {
      case "file":
        return Y(p, w);
      case "base64":
        return l(wt(Mt(p)), w);
      case "binary":
        return l(wt(p), w);
    }
    return l(p, w);
  }
  function D(p, w) {
    var m = w || {}, _ = m.root || "Root Entry";
    if (p.FullPaths || (p.FullPaths = []), p.FileIndex || (p.FileIndex = []), p.FullPaths.length !== p.FileIndex.length)
      throw new Error("inconsistent CFB structure");
    p.FullPaths.length === 0 && (p.FullPaths[0] = _ + "/", p.FileIndex[0] = { name: _, type: 5 }), m.CLSID && (p.FileIndex[0].clsid = m.CLSID), H(p);
  }
  function H(p) {
    var w = "Sh33tJ5";
    if (!Te.find(p, "/" + w)) {
      var m = B(4);
      m[0] = 55, m[1] = m[3] = 50, m[2] = 54, p.FileIndex.push({ name: w, type: 2, content: m, size: 4, L: 69, R: 69, C: 69 }), p.FullPaths.push(p.FullPaths[0] + w), M(p);
    }
  }
  function M(p, w) {
    D(p);
    for (var m = !1, _ = !1, T = p.FullPaths.length - 1; T >= 0; --T) {
      var E = p.FileIndex[T];
      switch (E.type) {
        case 0:
          _ ? m = !0 : (p.FileIndex.pop(), p.FullPaths.pop());
          break;
        case 1:
        case 2:
        case 5:
          _ = !0, isNaN(E.R * E.L * E.C) && (m = !0), E.R > -1 && E.L > -1 && E.R == E.L && (m = !0);
          break;
        default:
          m = !0;
          break;
      }
    }
    if (!(!m && !w)) {
      var R = new Date(1987, 1, 19), b = 0, k = Object.create ? /* @__PURE__ */ Object.create(null) : {}, N = [];
      for (T = 0; T < p.FullPaths.length; ++T)
        k[p.FullPaths[T]] = !0, p.FileIndex[T].type !== 0 && N.push([p.FullPaths[T], p.FileIndex[T]]);
      for (T = 0; T < N.length; ++T) {
        var L = n(N[T][0]);
        _ = k[L], _ || (N.push([L, {
          name: i(L).replace("/", ""),
          type: 1,
          clsid: He,
          ct: R,
          mt: R,
          content: null
        }]), k[L] = !0);
      }
      for (N.sort(function(ne, K) {
        return t(ne[0], K[0]);
      }), p.FullPaths = [], p.FileIndex = [], T = 0; T < N.length; ++T)
        p.FullPaths[T] = N[T][0], p.FileIndex[T] = N[T][1];
      for (T = 0; T < N.length; ++T) {
        var z = p.FileIndex[T], Z = p.FullPaths[T];
        if (z.name = i(Z).replace("/", ""), z.L = z.R = z.C = -(z.color = 1), z.size = z.content ? z.content.length : 0, z.start = 0, z.clsid = z.clsid || He, T === 0)
          z.C = N.length > 1 ? 1 : -1, z.size = 0, z.type = 5;
        else if (Z.slice(-1) == "/") {
          for (b = T + 1; b < N.length && n(p.FullPaths[b]) != Z; ++b)
            ;
          for (z.C = b >= N.length ? -1 : b, b = T + 1; b < N.length && n(p.FullPaths[b]) != n(Z); ++b)
            ;
          z.R = b >= N.length ? -1 : b, z.type = 1;
        } else
          n(p.FullPaths[T + 1] || "") == n(Z) && (z.R = T + 1), z.type = 2;
      }
    }
  }
  function V(p, w) {
    var m = w || {};
    if (m.fileType == "mad")
      return Ys(p, m);
    switch (M(p), m.fileType) {
      case "zip":
        return Bs(p, m);
    }
    var _ = function(ne) {
      for (var K = 0, te = 0, fe = 0; fe < ne.FileIndex.length; ++fe) {
        var ye = ne.FileIndex[fe];
        if (!!ye.content) {
          var Ae = ye.content.length;
          Ae > 0 && (Ae < 4096 ? K += Ae + 63 >> 6 : te += Ae + 511 >> 9);
        }
      }
      for (var ze = ne.FullPaths.length + 3 >> 2, Cr = K + 7 >> 3, Fr = K + 127 >> 7, Or = Cr + te + ze + Fr, qt = Or + 127 >> 7, Yn = qt <= 109 ? 0 : Math.ceil((qt - 109) / 127); Or + qt + Yn + 127 >> 7 > qt; )
        Yn = ++qt <= 109 ? 0 : Math.ceil((qt - 109) / 127);
      var Dt = [1, Yn, qt, Fr, ze, te, K, 0];
      return ne.FileIndex[0].size = K << 6, Dt[7] = (ne.FileIndex[0].start = Dt[0] + Dt[1] + Dt[2] + Dt[3] + Dt[4] + Dt[5]) + (Dt[6] + 7 >> 3), Dt;
    }(p), T = B(_[7] << 9), E = 0, R = 0;
    {
      for (E = 0; E < 8; ++E)
        T.write_shift(1, le[E]);
      for (E = 0; E < 8; ++E)
        T.write_shift(2, 0);
      for (T.write_shift(2, 62), T.write_shift(2, 3), T.write_shift(2, 65534), T.write_shift(2, 9), T.write_shift(2, 6), E = 0; E < 3; ++E)
        T.write_shift(2, 0);
      for (T.write_shift(4, 0), T.write_shift(4, _[2]), T.write_shift(4, _[0] + _[1] + _[2] + _[3] - 1), T.write_shift(4, 0), T.write_shift(4, 1 << 12), T.write_shift(4, _[3] ? _[0] + _[1] + _[2] - 1 : re), T.write_shift(4, _[3]), T.write_shift(-4, _[1] ? _[0] - 1 : re), T.write_shift(4, _[1]), E = 0; E < 109; ++E)
        T.write_shift(-4, E < _[2] ? _[1] + E : -1);
    }
    if (_[1])
      for (R = 0; R < _[1]; ++R) {
        for (; E < 236 + R * 127; ++E)
          T.write_shift(-4, E < _[2] ? _[1] + E : -1);
        T.write_shift(-4, R === _[1] - 1 ? re : R + 1);
      }
    var b = function(ne) {
      for (R += ne; E < R - 1; ++E)
        T.write_shift(-4, E + 1);
      ne && (++E, T.write_shift(-4, re));
    };
    for (R = E = 0, R += _[1]; E < R; ++E)
      T.write_shift(-4, De.DIFSECT);
    for (R += _[2]; E < R; ++E)
      T.write_shift(-4, De.FATSECT);
    b(_[3]), b(_[4]);
    for (var k = 0, N = 0, L = p.FileIndex[0]; k < p.FileIndex.length; ++k)
      L = p.FileIndex[k], L.content && (N = L.content.length, !(N < 4096) && (L.start = R, b(N + 511 >> 9)));
    for (b(_[6] + 7 >> 3); T.l & 511; )
      T.write_shift(-4, De.ENDOFCHAIN);
    for (R = E = 0, k = 0; k < p.FileIndex.length; ++k)
      L = p.FileIndex[k], L.content && (N = L.content.length, !(!N || N >= 4096) && (L.start = R, b(N + 63 >> 6)));
    for (; T.l & 511; )
      T.write_shift(-4, De.ENDOFCHAIN);
    for (E = 0; E < _[4] << 2; ++E) {
      var z = p.FullPaths[E];
      if (!z || z.length === 0) {
        for (k = 0; k < 17; ++k)
          T.write_shift(4, 0);
        for (k = 0; k < 3; ++k)
          T.write_shift(4, -1);
        for (k = 0; k < 12; ++k)
          T.write_shift(4, 0);
        continue;
      }
      L = p.FileIndex[E], E === 0 && (L.start = L.size ? L.start - 1 : re);
      var Z = E === 0 && m.root || L.name;
      if (N = 2 * (Z.length + 1), T.write_shift(64, Z, "utf16le"), T.write_shift(2, N), T.write_shift(1, L.type), T.write_shift(1, L.color), T.write_shift(-4, L.L), T.write_shift(-4, L.R), T.write_shift(-4, L.C), L.clsid)
        T.write_shift(16, L.clsid, "hex");
      else
        for (k = 0; k < 4; ++k)
          T.write_shift(4, 0);
      T.write_shift(4, L.state || 0), T.write_shift(4, 0), T.write_shift(4, 0), T.write_shift(4, 0), T.write_shift(4, 0), T.write_shift(4, L.start), T.write_shift(4, L.size), T.write_shift(4, 0);
    }
    for (E = 1; E < p.FileIndex.length; ++E)
      if (L = p.FileIndex[E], L.size >= 4096)
        if (T.l = L.start + 1 << 9, de && Buffer.isBuffer(L.content))
          L.content.copy(T, T.l, 0, L.size), T.l += L.size + 511 & -512;
        else {
          for (k = 0; k < L.size; ++k)
            T.write_shift(1, L.content[k]);
          for (; k & 511; ++k)
            T.write_shift(1, 0);
        }
    for (E = 1; E < p.FileIndex.length; ++E)
      if (L = p.FileIndex[E], L.size > 0 && L.size < 4096)
        if (de && Buffer.isBuffer(L.content))
          L.content.copy(T, T.l, 0, L.size), T.l += L.size + 63 & -64;
        else {
          for (k = 0; k < L.size; ++k)
            T.write_shift(1, L.content[k]);
          for (; k & 63; ++k)
            T.write_shift(1, 0);
        }
    if (de)
      T.l = T.length;
    else
      for (; T.l < T.length; )
        T.write_shift(1, 0);
    return T;
  }
  function G(p, w) {
    var m = p.FullPaths.map(function(k) {
      return k.toUpperCase();
    }), _ = m.map(function(k) {
      var N = k.split("/");
      return N[N.length - (k.slice(-1) == "/" ? 2 : 1)];
    }), T = !1;
    w.charCodeAt(0) === 47 ? (T = !0, w = m[0].slice(0, -1) + w) : T = w.indexOf("/") !== -1;
    var E = w.toUpperCase(), R = T === !0 ? m.indexOf(E) : _.indexOf(E);
    if (R !== -1)
      return p.FileIndex[R];
    var b = !E.match(nn);
    for (E = E.replace(Rr, ""), b && (E = E.replace(nn, "!")), R = 0; R < m.length; ++R)
      if ((b ? m[R].replace(nn, "!") : m[R]).replace(Rr, "") == E || (b ? _[R].replace(nn, "!") : _[R]).replace(Rr, "") == E)
        return p.FileIndex[R];
    return null;
  }
  var j = 64, re = -2, we = "d0cf11e0a1b11ae1", le = [208, 207, 17, 224, 161, 177, 26, 225], He = "00000000000000000000000000000000", De = {
    MAXREGSECT: -6,
    DIFSECT: -4,
    FATSECT: -3,
    ENDOFCHAIN: re,
    FREESECT: -1,
    HEADER_SIGNATURE: we,
    HEADER_MINOR_VERSION: "3e00",
    MAXREGSID: -6,
    NOSTREAM: -1,
    HEADER_CLSID: He,
    EntryTypes: ["unknown", "storage", "stream", "lockbytes", "property", "root"]
  };
  function vt(p, w, m) {
    f();
    var _ = V(p, m);
    c.writeFileSync(w, _);
  }
  function Me(p) {
    for (var w = new Array(p.length), m = 0; m < p.length; ++m)
      w[m] = String.fromCharCode(p[m]);
    return w.join("");
  }
  function ut(p, w) {
    var m = V(p, w);
    switch (w && w.type || "buffer") {
      case "file":
        return f(), c.writeFileSync(w.filename, m), m;
      case "binary":
        return typeof m == "string" ? m : Me(m);
      case "base64":
        return Ur(typeof m == "string" ? m : Me(m));
      case "buffer":
        if (de)
          return Buffer.isBuffer(m) ? m : bt(m);
      case "array":
        return typeof m == "string" ? wt(m) : m;
    }
    return m;
  }
  var st;
  function y(p) {
    try {
      var w = p.InflateRaw, m = new w();
      if (m._processChunk(new Uint8Array([3, 0]), m._finishFlushFlag), m.bytesRead)
        st = p;
      else
        throw new Error("zlib does not expose bytesRead");
    } catch (_) {
      console.error("cannot use native zlib: " + (_.message || _));
    }
  }
  function P(p, w) {
    if (!st)
      return Wi(p, w);
    var m = st.InflateRaw, _ = new m(), T = _._processChunk(p.slice(p.l), _._finishFlushFlag);
    return p.l += _.bytesRead, T;
  }
  function O(p) {
    return st ? st.deflateRawSync(p) : Pi(p);
  }
  var F = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], X = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258], se = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577];
  function oe(p) {
    var w = (p << 1 | p << 11) & 139536 | (p << 5 | p << 15) & 558144;
    return (w >> 16 | w >> 8 | w) & 255;
  }
  for (var ae = typeof Uint8Array < "u", ee = ae ? new Uint8Array(1 << 8) : [], Ee = 0; Ee < 1 << 8; ++Ee)
    ee[Ee] = oe(Ee);
  function ue(p, w) {
    var m = ee[p & 255];
    return w <= 8 ? m >>> 8 - w : (m = m << 8 | ee[p >> 8 & 255], w <= 16 ? m >>> 16 - w : (m = m << 8 | ee[p >> 16 & 255], m >>> 24 - w));
  }
  function qe(p, w) {
    var m = w & 7, _ = w >>> 3;
    return (p[_] | (m <= 6 ? 0 : p[_ + 1] << 8)) >>> m & 3;
  }
  function pe(p, w) {
    var m = w & 7, _ = w >>> 3;
    return (p[_] | (m <= 5 ? 0 : p[_ + 1] << 8)) >>> m & 7;
  }
  function Ft(p, w) {
    var m = w & 7, _ = w >>> 3;
    return (p[_] | (m <= 4 ? 0 : p[_ + 1] << 8)) >>> m & 15;
  }
  function Ce(p, w) {
    var m = w & 7, _ = w >>> 3;
    return (p[_] | (m <= 3 ? 0 : p[_ + 1] << 8)) >>> m & 31;
  }
  function ie(p, w) {
    var m = w & 7, _ = w >>> 3;
    return (p[_] | (m <= 1 ? 0 : p[_ + 1] << 8)) >>> m & 127;
  }
  function xt(p, w, m) {
    var _ = w & 7, T = w >>> 3, E = (1 << m) - 1, R = p[T] >>> _;
    return m < 8 - _ || (R |= p[T + 1] << 8 - _, m < 16 - _) || (R |= p[T + 2] << 16 - _, m < 24 - _) || (R |= p[T + 3] << 24 - _), R & E;
  }
  function Ot(p, w, m) {
    var _ = w & 7, T = w >>> 3;
    return _ <= 5 ? p[T] |= (m & 7) << _ : (p[T] |= m << _ & 255, p[T + 1] = (m & 7) >> 8 - _), w + 3;
  }
  function jt(p, w, m) {
    var _ = w & 7, T = w >>> 3;
    return m = (m & 1) << _, p[T] |= m, w + 1;
  }
  function lr(p, w, m) {
    var _ = w & 7, T = w >>> 3;
    return m <<= _, p[T] |= m & 255, m >>>= 8, p[T + 1] = m, w + 8;
  }
  function Li(p, w, m) {
    var _ = w & 7, T = w >>> 3;
    return m <<= _, p[T] |= m & 255, m >>>= 8, p[T + 1] = m & 255, p[T + 2] = m >>> 8, w + 16;
  }
  function Hn(p, w) {
    var m = p.length, _ = 2 * m > w ? 2 * m : w + 5, T = 0;
    if (m >= w)
      return p;
    if (de) {
      var E = ta(_);
      if (p.copy)
        p.copy(E);
      else
        for (; T < p.length; ++T)
          E[T] = p[T];
      return E;
    } else if (ae) {
      var R = new Uint8Array(_);
      if (R.set)
        R.set(p);
      else
        for (; T < m; ++T)
          R[T] = p[T];
      return R;
    }
    return p.length = _, p;
  }
  function St(p) {
    for (var w = new Array(p), m = 0; m < p; ++m)
      w[m] = 0;
    return w;
  }
  function Jr(p, w, m) {
    var _ = 1, T = 0, E = 0, R = 0, b = 0, k = p.length, N = ae ? new Uint16Array(32) : St(32);
    for (E = 0; E < 32; ++E)
      N[E] = 0;
    for (E = k; E < m; ++E)
      p[E] = 0;
    k = p.length;
    var L = ae ? new Uint16Array(k) : St(k);
    for (E = 0; E < k; ++E)
      N[T = p[E]]++, _ < T && (_ = T), L[E] = 0;
    for (N[0] = 0, E = 1; E <= _; ++E)
      N[E + 16] = b = b + N[E - 1] << 1;
    for (E = 0; E < k; ++E)
      b = p[E], b != 0 && (L[E] = N[b + 16]++);
    var z = 0;
    for (E = 0; E < k; ++E)
      if (z = p[E], z != 0)
        for (b = ue(L[E], _) >> _ - z, R = (1 << _ + 4 - z) - 1; R >= 0; --R)
          w[b | R << z] = z & 15 | E << 4;
    return _;
  }
  var Wn = ae ? new Uint16Array(512) : St(512), Xn = ae ? new Uint16Array(32) : St(32);
  if (!ae) {
    for (var Kt = 0; Kt < 512; ++Kt)
      Wn[Kt] = 0;
    for (Kt = 0; Kt < 32; ++Kt)
      Xn[Kt] = 0;
  }
  (function() {
    for (var p = [], w = 0; w < 32; w++)
      p.push(5);
    Jr(p, Xn, 32);
    var m = [];
    for (w = 0; w <= 143; w++)
      m.push(8);
    for (; w <= 255; w++)
      m.push(9);
    for (; w <= 279; w++)
      m.push(7);
    for (; w <= 287; w++)
      m.push(8);
    Jr(m, Wn, 288);
  })();
  var Ns = /* @__PURE__ */ function() {
    for (var w = ae ? new Uint8Array(32768) : [], m = 0, _ = 0; m < se.length - 1; ++m)
      for (; _ < se[m + 1]; ++_)
        w[_] = m;
    for (; _ < 32768; ++_)
      w[_] = 29;
    var T = ae ? new Uint8Array(259) : [];
    for (m = 0, _ = 0; m < X.length - 1; ++m)
      for (; _ < X[m + 1]; ++_)
        T[_] = m;
    function E(b, k) {
      for (var N = 0; N < b.length; ) {
        var L = Math.min(65535, b.length - N), z = N + L == b.length;
        for (k.write_shift(1, +z), k.write_shift(2, L), k.write_shift(2, ~L & 65535); L-- > 0; )
          k[k.l++] = b[N++];
      }
      return k.l;
    }
    function R(b, k) {
      for (var N = 0, L = 0, z = ae ? new Uint16Array(32768) : []; L < b.length; ) {
        var Z = Math.min(65535, b.length - L);
        if (Z < 10) {
          for (N = Ot(k, N, +(L + Z == b.length)), N & 7 && (N += 8 - (N & 7)), k.l = N / 8 | 0, k.write_shift(2, Z), k.write_shift(2, ~Z & 65535); Z-- > 0; )
            k[k.l++] = b[L++];
          N = k.l * 8;
          continue;
        }
        N = Ot(k, N, +(L + Z == b.length) + 2);
        for (var ne = 0; Z-- > 0; ) {
          var K = b[L];
          ne = (ne << 5 ^ K) & 32767;
          var te = -1, fe = 0;
          if ((te = z[ne]) && (te |= L & -32768, te > L && (te -= 32768), te < L))
            for (; b[te + fe] == b[L + fe] && fe < 250; )
              ++fe;
          if (fe > 2) {
            K = T[fe], K <= 22 ? N = lr(k, N, ee[K + 1] >> 1) - 1 : (lr(k, N, 3), N += 5, lr(k, N, ee[K - 23] >> 5), N += 3);
            var ye = K < 8 ? 0 : K - 4 >> 2;
            ye > 0 && (Li(k, N, fe - X[K]), N += ye), K = w[L - te], N = lr(k, N, ee[K] >> 3), N -= 3;
            var Ae = K < 4 ? 0 : K - 2 >> 1;
            Ae > 0 && (Li(k, N, L - te - se[K]), N += Ae);
            for (var ze = 0; ze < fe; ++ze)
              z[ne] = L & 32767, ne = (ne << 5 ^ b[L]) & 32767, ++L;
            Z -= fe - 1;
          } else
            K <= 143 ? K = K + 48 : N = jt(k, N, 1), N = lr(k, N, ee[K]), z[ne] = L & 32767, ++L;
        }
        N = lr(k, N, 0) - 1;
      }
      return k.l = (N + 7) / 8 | 0, k.l;
    }
    return function(k, N) {
      return k.length < 8 ? E(k, N) : R(k, N);
    };
  }();
  function Pi(p) {
    var w = B(50 + Math.floor(p.length * 1.1)), m = Ns(p, w);
    return w.slice(0, m);
  }
  var Mi = ae ? new Uint16Array(32768) : St(32768), Bi = ae ? new Uint16Array(32768) : St(32768), bi = ae ? new Uint16Array(128) : St(128), Ui = 1, Hi = 1;
  function Ls(p, w) {
    var m = Ce(p, w) + 257;
    w += 5;
    var _ = Ce(p, w) + 1;
    w += 5;
    var T = Ft(p, w) + 4;
    w += 4;
    for (var E = 0, R = ae ? new Uint8Array(19) : St(19), b = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], k = 1, N = ae ? new Uint8Array(8) : St(8), L = ae ? new Uint8Array(8) : St(8), z = R.length, Z = 0; Z < T; ++Z)
      R[F[Z]] = E = pe(p, w), k < E && (k = E), N[E]++, w += 3;
    var ne = 0;
    for (N[0] = 0, Z = 1; Z <= k; ++Z)
      L[Z] = ne = ne + N[Z - 1] << 1;
    for (Z = 0; Z < z; ++Z)
      (ne = R[Z]) != 0 && (b[Z] = L[ne]++);
    var K = 0;
    for (Z = 0; Z < z; ++Z)
      if (K = R[Z], K != 0) {
        ne = ee[b[Z]] >> 8 - K;
        for (var te = (1 << 7 - K) - 1; te >= 0; --te)
          bi[ne | te << K] = K & 7 | Z << 3;
      }
    var fe = [];
    for (k = 1; fe.length < m + _; )
      switch (ne = bi[ie(p, w)], w += ne & 7, ne >>>= 3) {
        case 16:
          for (E = 3 + qe(p, w), w += 2, ne = fe[fe.length - 1]; E-- > 0; )
            fe.push(ne);
          break;
        case 17:
          for (E = 3 + pe(p, w), w += 3; E-- > 0; )
            fe.push(0);
          break;
        case 18:
          for (E = 11 + ie(p, w), w += 7; E-- > 0; )
            fe.push(0);
          break;
        default:
          fe.push(ne), k < ne && (k = ne);
          break;
      }
    var ye = fe.slice(0, m), Ae = fe.slice(m);
    for (Z = m; Z < 286; ++Z)
      ye[Z] = 0;
    for (Z = _; Z < 30; ++Z)
      Ae[Z] = 0;
    return Ui = Jr(ye, Mi, 286), Hi = Jr(Ae, Bi, 30), w;
  }
  function Ps(p, w) {
    if (p[0] == 3 && !(p[1] & 3))
      return [tr(w), 2];
    for (var m = 0, _ = 0, T = ta(w || 1 << 18), E = 0, R = T.length >>> 0, b = 0, k = 0; (_ & 1) == 0; ) {
      if (_ = pe(p, m), m += 3, _ >>> 1 == 0) {
        m & 7 && (m += 8 - (m & 7));
        var N = p[m >>> 3] | p[(m >>> 3) + 1] << 8;
        if (m += 32, N > 0)
          for (!w && R < E + N && (T = Hn(T, E + N), R = T.length); N-- > 0; )
            T[E++] = p[m >>> 3], m += 8;
        continue;
      } else
        _ >> 1 == 1 ? (b = 9, k = 5) : (m = Ls(p, m), b = Ui, k = Hi);
      for (; ; ) {
        !w && R < E + 32767 && (T = Hn(T, E + 32767), R = T.length);
        var L = xt(p, m, b), z = _ >>> 1 == 1 ? Wn[L] : Mi[L];
        if (m += z & 15, z >>>= 4, (z >>> 8 & 255) === 0)
          T[E++] = z;
        else {
          if (z == 256)
            break;
          z -= 257;
          var Z = z < 8 ? 0 : z - 4 >> 2;
          Z > 5 && (Z = 0);
          var ne = E + X[z];
          Z > 0 && (ne += xt(p, m, Z), m += Z), L = xt(p, m, k), z = _ >>> 1 == 1 ? Xn[L] : Bi[L], m += z & 15, z >>>= 4;
          var K = z < 4 ? 0 : z - 2 >> 1, te = se[z];
          for (K > 0 && (te += xt(p, m, K), m += K), !w && R < ne && (T = Hn(T, ne + 100), R = T.length); E < ne; )
            T[E] = T[E - te], ++E;
        }
      }
    }
    return w ? [T, m + 7 >>> 3] : [T.slice(0, E), m + 7 >>> 3];
  }
  function Wi(p, w) {
    var m = p.slice(p.l || 0), _ = Ps(m, w);
    return p.l += _[1], _[0];
  }
  function Xi(p, w) {
    if (p)
      typeof console < "u" && console.error(w);
    else
      throw new Error(w);
  }
  function Vi(p, w) {
    var m = p;
    ft(m, 0);
    var _ = [], T = [], E = {
      FileIndex: _,
      FullPaths: T
    };
    D(E, { root: w.root });
    for (var R = m.length - 4; (m[R] != 80 || m[R + 1] != 75 || m[R + 2] != 5 || m[R + 3] != 6) && R >= 0; )
      --R;
    m.l = R + 4, m.l += 4;
    var b = m.read_shift(2);
    m.l += 6;
    var k = m.read_shift(4);
    for (m.l = k, R = 0; R < b; ++R) {
      m.l += 20;
      var N = m.read_shift(4), L = m.read_shift(4), z = m.read_shift(2), Z = m.read_shift(2), ne = m.read_shift(2);
      m.l += 8;
      var K = m.read_shift(4), te = o(m.slice(m.l + z, m.l + z + Z));
      m.l += z + Z + ne;
      var fe = m.l;
      m.l = K + 4, Ms(m, N, L, E, te), m.l = fe;
    }
    return E;
  }
  function Ms(p, w, m, _, T) {
    p.l += 2;
    var E = p.read_shift(2), R = p.read_shift(2), b = s(p);
    if (E & 8257)
      throw new Error("Unsupported ZIP encryption");
    for (var k = p.read_shift(4), N = p.read_shift(4), L = p.read_shift(4), z = p.read_shift(2), Z = p.read_shift(2), ne = "", K = 0; K < z; ++K)
      ne += String.fromCharCode(p[p.l++]);
    if (Z) {
      var te = o(p.slice(p.l, p.l + Z));
      (te[21589] || {}).mt && (b = te[21589].mt), ((T || {})[21589] || {}).mt && (b = T[21589].mt);
    }
    p.l += Z;
    var fe = p.slice(p.l, p.l + N);
    switch (R) {
      case 8:
        fe = P(p, L);
        break;
      case 0:
        break;
      default:
        throw new Error("Unsupported ZIP Compression method " + R);
    }
    var ye = !1;
    E & 8 && (k = p.read_shift(4), k == 134695760 && (k = p.read_shift(4), ye = !0), N = p.read_shift(4), L = p.read_shift(4)), N != w && Xi(ye, "Bad compressed size: " + w + " != " + N), L != m && Xi(ye, "Bad uncompressed size: " + m + " != " + L), Vn(_, ne, fe, { unsafe: !0, mt: b });
  }
  function Bs(p, w) {
    var m = w || {}, _ = [], T = [], E = B(1), R = m.compression ? 8 : 0, b = 0, k = 0, N = 0, L = 0, z = 0, Z = p.FullPaths[0], ne = Z, K = p.FileIndex[0], te = [], fe = 0;
    for (k = 1; k < p.FullPaths.length; ++k)
      if (ne = p.FullPaths[k].slice(Z.length), K = p.FileIndex[k], !(!K.size || !K.content || ne == "Sh33tJ5")) {
        var ye = L, Ae = B(ne.length);
        for (N = 0; N < ne.length; ++N)
          Ae.write_shift(1, ne.charCodeAt(N) & 127);
        Ae = Ae.slice(0, Ae.l), te[z] = cl.buf(K.content, 0);
        var ze = K.content;
        R == 8 && (ze = O(ze)), E = B(30), E.write_shift(4, 67324752), E.write_shift(2, 20), E.write_shift(2, b), E.write_shift(2, R), K.mt ? a(E, K.mt) : E.write_shift(4, 0), E.write_shift(-4, te[z]), E.write_shift(4, ze.length), E.write_shift(4, K.content.length), E.write_shift(2, Ae.length), E.write_shift(2, 0), L += E.length, _.push(E), L += Ae.length, _.push(Ae), L += ze.length, _.push(ze), E = B(46), E.write_shift(4, 33639248), E.write_shift(2, 0), E.write_shift(2, 20), E.write_shift(2, b), E.write_shift(2, R), E.write_shift(4, 0), E.write_shift(-4, te[z]), E.write_shift(4, ze.length), E.write_shift(4, K.content.length), E.write_shift(2, Ae.length), E.write_shift(2, 0), E.write_shift(2, 0), E.write_shift(2, 0), E.write_shift(2, 0), E.write_shift(4, 0), E.write_shift(4, ye), fe += E.l, T.push(E), fe += Ae.length, T.push(Ae), ++z;
      }
    return E = B(22), E.write_shift(4, 101010256), E.write_shift(2, 0), E.write_shift(2, 0), E.write_shift(2, z), E.write_shift(2, z), E.write_shift(4, fe), E.write_shift(4, L), E.write_shift(2, 0), Ve([Ve(_), Ve(T), E]);
  }
  var Zr = {
    htm: "text/html",
    xml: "text/xml",
    gif: "image/gif",
    jpg: "image/jpeg",
    png: "image/png",
    mso: "application/x-mso",
    thmx: "application/vnd.ms-officetheme",
    sh33tj5: "application/octet-stream"
  };
  function bs(p, w) {
    if (p.ctype)
      return p.ctype;
    var m = p.name || "", _ = m.match(/\.([^\.]+)$/);
    return _ && Zr[_[1]] || w && (_ = (m = w).match(/[\.\\]([^\.\\])+$/), _ && Zr[_[1]]) ? Zr[_[1]] : "application/octet-stream";
  }
  function Us(p) {
    for (var w = Ur(p), m = [], _ = 0; _ < w.length; _ += 76)
      m.push(w.slice(_, _ + 76));
    return m.join(`\r
`) + `\r
`;
  }
  function Hs(p) {
    var w = p.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7E-\xFF=]/g, function(N) {
      var L = N.charCodeAt(0).toString(16).toUpperCase();
      return "=" + (L.length == 1 ? "0" + L : L);
    });
    w = w.replace(/ $/mg, "=20").replace(/\t$/mg, "=09"), w.charAt(0) == `
` && (w = "=0D" + w.slice(1)), w = w.replace(/\r(?!\n)/mg, "=0D").replace(/\n\n/mg, `
=0A`).replace(/([^\r\n])\n/mg, "$1=0A");
    for (var m = [], _ = w.split(`\r
`), T = 0; T < _.length; ++T) {
      var E = _[T];
      if (E.length == 0) {
        m.push("");
        continue;
      }
      for (var R = 0; R < E.length; ) {
        var b = 76, k = E.slice(R, R + b);
        k.charAt(b - 1) == "=" ? b-- : k.charAt(b - 2) == "=" ? b -= 2 : k.charAt(b - 3) == "=" && (b -= 3), k = E.slice(R, R + b), R += b, R < E.length && (k += "="), m.push(k);
      }
    }
    return m.join(`\r
`);
  }
  function Ws(p) {
    for (var w = [], m = 0; m < p.length; ++m) {
      for (var _ = p[m]; m <= p.length && _.charAt(_.length - 1) == "="; )
        _ = _.slice(0, _.length - 1) + p[++m];
      w.push(_);
    }
    for (var T = 0; T < w.length; ++T)
      w[T] = w[T].replace(/[=][0-9A-Fa-f]{2}/g, function(E) {
        return String.fromCharCode(parseInt(E.slice(1), 16));
      });
    return wt(w.join(`\r
`));
  }
  function Xs(p, w, m) {
    for (var _ = "", T = "", E = "", R, b = 0; b < 10; ++b) {
      var k = w[b];
      if (!k || k.match(/^\s*$/))
        break;
      var N = k.match(/^(.*?):\s*([^\s].*)$/);
      if (N)
        switch (N[1].toLowerCase()) {
          case "content-location":
            _ = N[2].trim();
            break;
          case "content-type":
            E = N[2].trim();
            break;
          case "content-transfer-encoding":
            T = N[2].trim();
            break;
        }
    }
    switch (++b, T.toLowerCase()) {
      case "base64":
        R = wt(Mt(w.slice(b).join("")));
        break;
      case "quoted-printable":
        R = Ws(w.slice(b));
        break;
      default:
        throw new Error("Unsupported Content-Transfer-Encoding " + T);
    }
    var L = Vn(p, _.slice(m.length), R, { unsafe: !0 });
    E && (L.ctype = E);
  }
  function Vs(p, w) {
    if (Me(p.slice(0, 13)).toLowerCase() != "mime-version:")
      throw new Error("Unsupported MAD header");
    var m = w && w.root || "", _ = (de && Buffer.isBuffer(p) ? p.toString("binary") : Me(p)).split(`\r
`), T = 0, E = "";
    for (T = 0; T < _.length; ++T)
      if (E = _[T], !!/^Content-Location:/i.test(E) && (E = E.slice(E.indexOf("file")), m || (m = E.slice(0, E.lastIndexOf("/") + 1)), E.slice(0, m.length) != m))
        for (; m.length > 0 && (m = m.slice(0, m.length - 1), m = m.slice(0, m.lastIndexOf("/") + 1), E.slice(0, m.length) != m); )
          ;
    var R = (_[1] || "").match(/boundary="(.*?)"/);
    if (!R)
      throw new Error("MAD cannot find boundary");
    var b = "--" + (R[1] || ""), k = [], N = [], L = {
      FileIndex: k,
      FullPaths: N
    };
    D(L);
    var z, Z = 0;
    for (T = 0; T < _.length; ++T) {
      var ne = _[T];
      ne !== b && ne !== b + "--" || (Z++ && Xs(L, _.slice(z, T), m), z = T);
    }
    return L;
  }
  function Ys(p, w) {
    var m = w || {}, _ = m.boundary || "SheetJS";
    _ = "------=" + _;
    for (var T = [
      "MIME-Version: 1.0",
      'Content-Type: multipart/related; boundary="' + _.slice(2) + '"',
      "",
      "",
      ""
    ], E = p.FullPaths[0], R = E, b = p.FileIndex[0], k = 1; k < p.FullPaths.length; ++k)
      if (R = p.FullPaths[k].slice(E.length), b = p.FileIndex[k], !(!b.size || !b.content || R == "Sh33tJ5")) {
        R = R.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7E-\xFF]/g, function(fe) {
          return "_x" + fe.charCodeAt(0).toString(16) + "_";
        }).replace(/[\u0080-\uFFFF]/g, function(fe) {
          return "_u" + fe.charCodeAt(0).toString(16) + "_";
        });
        for (var N = b.content, L = de && Buffer.isBuffer(N) ? N.toString("binary") : Me(N), z = 0, Z = Math.min(1024, L.length), ne = 0, K = 0; K <= Z; ++K)
          (ne = L.charCodeAt(K)) >= 32 && ne < 128 && ++z;
        var te = z >= Z * 4 / 5;
        T.push(_), T.push("Content-Location: " + (m.root || "file:///C:/SheetJS/") + R), T.push("Content-Transfer-Encoding: " + (te ? "quoted-printable" : "base64")), T.push("Content-Type: " + bs(b, R)), T.push(""), T.push(te ? Hs(L) : Us(L));
      }
    return T.push(_ + `--\r
`), T.join(`\r
`);
  }
  function Gs(p) {
    var w = {};
    return D(w, p), w;
  }
  function Vn(p, w, m, _) {
    var T = _ && _.unsafe;
    T || D(p);
    var E = !T && Te.find(p, w);
    if (!E) {
      var R = p.FullPaths[0];
      w.slice(0, R.length) == R ? R = w : (R.slice(-1) != "/" && (R += "/"), R = (R + w).replace("//", "/")), E = { name: i(w), type: 2 }, p.FileIndex.push(E), p.FullPaths.push(R), T || Te.utils.cfb_gc(p);
    }
    return E.content = m, E.size = m ? m.length : 0, _ && (_.CLSID && (E.clsid = _.CLSID), _.mt && (E.mt = _.mt), _.ct && (E.ct = _.ct)), E;
  }
  function $s(p, w) {
    D(p);
    var m = Te.find(p, w);
    if (m) {
      for (var _ = 0; _ < p.FileIndex.length; ++_)
        if (p.FileIndex[_] == m)
          return p.FileIndex.splice(_, 1), p.FullPaths.splice(_, 1), !0;
    }
    return !1;
  }
  function zs(p, w, m) {
    D(p);
    var _ = Te.find(p, w);
    if (_) {
      for (var T = 0; T < p.FileIndex.length; ++T)
        if (p.FileIndex[T] == _)
          return p.FileIndex[T].name = i(m), p.FullPaths[T] = m, !0;
    }
    return !1;
  }
  function js(p) {
    M(p, !0);
  }
  return r.find = G, r.read = Q, r.parse = l, r.write = ut, r.writeFile = vt, r.utils = {
    cfb_new: Gs,
    cfb_add: Vn,
    cfb_del: $s,
    cfb_mov: zs,
    cfb_gc: js,
    ReadShift: Lr,
    CheckField: k0,
    prep_blob: ft,
    bconcat: Ve,
    use_zlib: y,
    _deflateRaw: Pi,
    _inflateRaw: Wi,
    consts: De
  }, r;
}();
function hl(e) {
  return typeof e == "string" ? Rn(e) : Array.isArray(e) ? Bf(e) : e;
}
function $r(e, r, t) {
  if (typeof Deno < "u") {
    if (t && typeof r == "string")
      switch (t) {
        case "utf8":
          r = new TextEncoder(t).encode(r);
          break;
        case "binary":
          r = Rn(r);
          break;
        default:
          throw new Error("Unsupported encoding " + t);
      }
    return Deno.writeFileSync(e, r);
  }
  var n = t == "utf8" ? kt(r) : r;
  if (typeof IE_SaveFile < "u")
    return IE_SaveFile(n, e);
  if (typeof Blob < "u") {
    var i = new Blob([hl(n)], { type: "application/octet-stream" });
    if (typeof navigator < "u" && navigator.msSaveBlob)
      return navigator.msSaveBlob(i, e);
    if (typeof saveAs < "u")
      return saveAs(i, e);
    if (typeof URL < "u" && typeof document < "u" && document.createElement && URL.createObjectURL) {
      var a = URL.createObjectURL(i);
      if (typeof chrome == "object" && typeof (chrome.downloads || {}).download == "function")
        return URL.revokeObjectURL && typeof setTimeout < "u" && setTimeout(function() {
          URL.revokeObjectURL(a);
        }, 6e4), chrome.downloads.download({ url: a, filename: e, saveAs: !0 });
      var s = document.createElement("a");
      if (s.download != null)
        return s.download = e, s.href = a, document.body.appendChild(s), s.click(), document.body.removeChild(s), URL.revokeObjectURL && typeof setTimeout < "u" && setTimeout(function() {
          URL.revokeObjectURL(a);
        }, 6e4), a;
    }
  }
  if (typeof $ < "u" && typeof File < "u" && typeof Folder < "u")
    try {
      var o = File(e);
      return o.open("w"), o.encoding = "binary", Array.isArray(r) && (r = Gr(r)), o.write(r), o.close(), r;
    } catch (c) {
      if (!c.message || !c.message.match(/onstruct/))
        throw c;
    }
  throw new Error("cannot save file " + e);
}
function $e(e) {
  for (var r = Object.keys(e), t = [], n = 0; n < r.length; ++n)
    Object.prototype.hasOwnProperty.call(e, r[n]) && t.push(r[n]);
  return t;
}
function la(e, r) {
  for (var t = [], n = $e(e), i = 0; i !== n.length; ++i)
    t[e[n[i]][r]] == null && (t[e[n[i]][r]] = n[i]);
  return t;
}
function pi(e) {
  for (var r = [], t = $e(e), n = 0; n !== t.length; ++n)
    r[e[t[n]]] = t[n];
  return r;
}
function Pn(e) {
  for (var r = [], t = $e(e), n = 0; n !== t.length; ++n)
    r[e[t[n]]] = parseInt(t[n], 10);
  return r;
}
function ul(e) {
  for (var r = [], t = $e(e), n = 0; n !== t.length; ++n)
    r[e[t[n]]] == null && (r[e[t[n]]] = []), r[e[t[n]]].push(t[n]);
  return r;
}
var wn = /* @__PURE__ */ new Date(1899, 11, 30, 0, 0, 0);
function it(e, r) {
  var t = /* @__PURE__ */ e.getTime();
  r && (t -= 1462 * 24 * 60 * 60 * 1e3);
  var n = /* @__PURE__ */ wn.getTime() + (/* @__PURE__ */ e.getTimezoneOffset() - /* @__PURE__ */ wn.getTimezoneOffset()) * 6e4;
  return (t - n) / (24 * 60 * 60 * 1e3);
}
var d0 = /* @__PURE__ */ new Date(), xl = /* @__PURE__ */ wn.getTime() + (/* @__PURE__ */ d0.getTimezoneOffset() - /* @__PURE__ */ wn.getTimezoneOffset()) * 6e4, ca = /* @__PURE__ */ d0.getTimezoneOffset();
function p0(e) {
  var r = new Date();
  return r.setTime(e * 24 * 60 * 60 * 1e3 + xl), r.getTimezoneOffset() !== ca && r.setTime(r.getTime() + (r.getTimezoneOffset() - ca) * 6e4), r;
}
var ha = /* @__PURE__ */ new Date("2017-02-19T19:06:09.000Z"), g0 = /* @__PURE__ */ isNaN(/* @__PURE__ */ ha.getFullYear()) ? /* @__PURE__ */ new Date("2/19/17") : ha, dl = /* @__PURE__ */ g0.getFullYear() == 2017;
function et(e, r) {
  var t = new Date(e);
  if (dl)
    return r > 0 ? t.setTime(t.getTime() + t.getTimezoneOffset() * 60 * 1e3) : r < 0 && t.setTime(t.getTime() - t.getTimezoneOffset() * 60 * 1e3), t;
  if (e instanceof Date)
    return e;
  if (g0.getFullYear() == 1917 && !isNaN(t.getFullYear())) {
    var n = t.getFullYear();
    return e.indexOf("" + n) > -1 || t.setFullYear(t.getFullYear() + 100), t;
  }
  var i = e.match(/\d+/g) || ["2017", "2", "19", "0", "0", "0"], a = new Date(+i[0], +i[1] - 1, +i[2], +i[3] || 0, +i[4] || 0, +i[5] || 0);
  return e.indexOf("Z") > -1 && (a = new Date(a.getTime() - a.getTimezoneOffset() * 60 * 1e3)), a;
}
function Mn(e, r) {
  if (de && Buffer.isBuffer(e)) {
    if (r) {
      if (e[0] == 255 && e[1] == 254)
        return kt(e.slice(2).toString("utf16le"));
      if (e[1] == 254 && e[2] == 255)
        return kt(Mf(e.slice(2).toString("binary")));
    }
    return e.toString("binary");
  }
  if (typeof TextDecoder < "u")
    try {
      if (r) {
        if (e[0] == 255 && e[1] == 254)
          return kt(new TextDecoder("utf-16le").decode(e.slice(2)));
        if (e[0] == 254 && e[1] == 255)
          return kt(new TextDecoder("utf-16be").decode(e.slice(2)));
      }
      var t = {
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
      return Array.isArray(e) && (e = new Uint8Array(e)), new TextDecoder("latin1").decode(e).replace(/[€‚ƒ„…†‡ˆ‰Š‹ŒŽ‘’“”•–—˜™š›œžŸ]/g, function(a) {
        return t[a] || a;
      });
    } catch {
    }
  for (var n = [], i = 0; i != e.length; ++i)
    n.push(String.fromCharCode(e[i]));
  return n.join("");
}
function at(e) {
  if (typeof JSON < "u" && !Array.isArray(e))
    return JSON.parse(JSON.stringify(e));
  if (typeof e != "object" || e == null)
    return e;
  if (e instanceof Date)
    return new Date(e.getTime());
  var r = {};
  for (var t in e)
    Object.prototype.hasOwnProperty.call(e, t) && (r[t] = at(e[t]));
  return r;
}
function Fe(e, r) {
  for (var t = ""; t.length < r; )
    t += e;
  return t;
}
function Lt(e) {
  var r = Number(e);
  if (!isNaN(r))
    return isFinite(r) ? r : NaN;
  if (!/\d/.test(e))
    return r;
  var t = 1, n = e.replace(/([\d]),([\d])/g, "$1$2").replace(/[$]/g, "").replace(/[%]/g, function() {
    return t *= 100, "";
  });
  return !isNaN(r = Number(n)) || (n = n.replace(/[(](.*)[)]/, function(i, a) {
    return t = -t, a;
  }), !isNaN(r = Number(n))) ? r / t : r;
}
var pl = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
function Hr(e) {
  var r = new Date(e), t = new Date(NaN), n = r.getYear(), i = r.getMonth(), a = r.getDate();
  if (isNaN(a))
    return t;
  var s = e.toLowerCase();
  if (s.match(/jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec/)) {
    if (s = s.replace(/[^a-z]/g, "").replace(/([^a-z]|^)[ap]m?([^a-z]|$)/, ""), s.length > 3 && pl.indexOf(s) == -1)
      return t;
  } else if (s.match(/[a-z]/))
    return t;
  return n < 0 || n > 8099 ? t : (i > 0 || a > 1) && n != 101 ? r : e.match(/[^-0-9:,\/\\]/) ? t : r;
}
function ce(e, r, t) {
  if (e.FullPaths) {
    if (typeof t == "string") {
      var n;
      return de ? n = bt(t) : n = bf(t), Te.utils.cfb_add(e, r, n);
    }
    Te.utils.cfb_add(e, r, t);
  } else
    e.file(r, t);
}
function gi() {
  return Te.utils.cfb_new();
}
var Re = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\r
`, gl = {
  "&quot;": '"',
  "&apos;": "'",
  "&gt;": ">",
  "&lt;": "<",
  "&amp;": "&"
}, vi = /* @__PURE__ */ pi(gl), mi = /[&<>'"]/g, vl = /[\u0000-\u0008\u000b-\u001f]/g;
function me(e) {
  var r = e + "";
  return r.replace(mi, function(t) {
    return vi[t];
  }).replace(vl, function(t) {
    return "_x" + ("000" + t.charCodeAt(0).toString(16)).slice(-4) + "_";
  });
}
function ua(e) {
  return me(e).replace(/ /g, "_x0020_");
}
var v0 = /[\u0000-\u001f]/g;
function ml(e) {
  var r = e + "";
  return r.replace(mi, function(t) {
    return vi[t];
  }).replace(/\n/g, "<br/>").replace(v0, function(t) {
    return "&#x" + ("000" + t.charCodeAt(0).toString(16)).slice(-4) + ";";
  });
}
function _l(e) {
  var r = e + "";
  return r.replace(mi, function(t) {
    return vi[t];
  }).replace(v0, function(t) {
    return "&#x" + t.charCodeAt(0).toString(16).toUpperCase() + ";";
  });
}
function wl(e) {
  return e.replace(/(\r\n|[\r\n])/g, "&#10;");
}
function Tl(e) {
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
function Kn(e) {
  for (var r = "", t = 0, n = 0, i = 0, a = 0, s = 0, o = 0; t < e.length; ) {
    if (n = e.charCodeAt(t++), n < 128) {
      r += String.fromCharCode(n);
      continue;
    }
    if (i = e.charCodeAt(t++), n > 191 && n < 224) {
      s = (n & 31) << 6, s |= i & 63, r += String.fromCharCode(s);
      continue;
    }
    if (a = e.charCodeAt(t++), n < 240) {
      r += String.fromCharCode((n & 15) << 12 | (i & 63) << 6 | a & 63);
      continue;
    }
    s = e.charCodeAt(t++), o = ((n & 7) << 18 | (i & 63) << 12 | (a & 63) << 6 | s & 63) - 65536, r += String.fromCharCode(55296 + (o >>> 10 & 1023)), r += String.fromCharCode(56320 + (o & 1023));
  }
  return r;
}
function xa(e) {
  var r = tr(2 * e.length), t, n, i = 1, a = 0, s = 0, o;
  for (n = 0; n < e.length; n += i)
    i = 1, (o = e.charCodeAt(n)) < 128 ? t = o : o < 224 ? (t = (o & 31) * 64 + (e.charCodeAt(n + 1) & 63), i = 2) : o < 240 ? (t = (o & 15) * 4096 + (e.charCodeAt(n + 1) & 63) * 64 + (e.charCodeAt(n + 2) & 63), i = 3) : (i = 4, t = (o & 7) * 262144 + (e.charCodeAt(n + 1) & 63) * 4096 + (e.charCodeAt(n + 2) & 63) * 64 + (e.charCodeAt(n + 3) & 63), t -= 65536, s = 55296 + (t >>> 10 & 1023), t = 56320 + (t & 1023)), s !== 0 && (r[a++] = s & 255, r[a++] = s >>> 8, s = 0), r[a++] = t % 256, r[a++] = t >>> 8;
  return r.slice(0, a).toString("ucs2");
}
function da(e) {
  return bt(e, "binary").toString("utf8");
}
var sn = "foo bar baz\xE2\x98\x83\xF0\x9F\x8D\xA3", Nr = de && (/* @__PURE__ */ da(sn) == /* @__PURE__ */ Kn(sn) && da || /* @__PURE__ */ xa(sn) == /* @__PURE__ */ Kn(sn) && xa) || Kn, kt = de ? function(e) {
  return bt(e, "utf8").toString("binary");
} : function(e) {
  for (var r = [], t = 0, n = 0, i = 0; t < e.length; )
    switch (n = e.charCodeAt(t++), !0) {
      case n < 128:
        r.push(String.fromCharCode(n));
        break;
      case n < 2048:
        r.push(String.fromCharCode(192 + (n >> 6))), r.push(String.fromCharCode(128 + (n & 63)));
        break;
      case (n >= 55296 && n < 57344):
        n -= 55296, i = e.charCodeAt(t++) - 56320 + (n << 10), r.push(String.fromCharCode(240 + (i >> 18 & 7))), r.push(String.fromCharCode(144 + (i >> 12 & 63))), r.push(String.fromCharCode(128 + (i >> 6 & 63))), r.push(String.fromCharCode(128 + (i & 63)));
        break;
      default:
        r.push(String.fromCharCode(224 + (n >> 12))), r.push(String.fromCharCode(128 + (n >> 6 & 63))), r.push(String.fromCharCode(128 + (n & 63)));
    }
  return r.join("");
}, El = /* @__PURE__ */ function() {
  var e = [
    ["nbsp", " "],
    ["middot", "\xB7"],
    ["quot", '"'],
    ["apos", "'"],
    ["gt", ">"],
    ["lt", "<"],
    ["amp", "&"]
  ].map(function(r) {
    return [new RegExp("&" + r[0] + ";", "ig"), r[1]];
  });
  return function(t) {
    for (var n = t.replace(/^[\t\n\r ]+/, "").replace(/[\t\n\r ]+$/, "").replace(/>\s+/g, ">").replace(/\s+</g, "<").replace(/[\t\n\r ]+/g, " ").replace(/<\s*[bB][rR]\s*\/?>/g, `
`).replace(/<[^>]*>/g, ""), i = 0; i < e.length; ++i)
      n = n.replace(e[i][0], e[i][1]);
    return n;
  };
}(), m0 = /(^\s|\s$|\n)/;
function Ye(e, r) {
  return "<" + e + (r.match(m0) ? ' xml:space="preserve"' : "") + ">" + r + "</" + e + ">";
}
function Wr(e) {
  return $e(e).map(function(r) {
    return " " + r + '="' + e[r] + '"';
  }).join("");
}
function q(e, r, t) {
  return "<" + e + (t != null ? Wr(t) : "") + (r != null ? (r.match(m0) ? ' xml:space="preserve"' : "") + ">" + r + "</" + e : "/") + ">";
}
function ii(e, r) {
  try {
    return e.toISOString().replace(/\.\d*/, "");
  } catch (t) {
    if (r)
      throw t;
  }
  return "";
}
function Sl(e, r) {
  switch (typeof e) {
    case "string":
      var t = q("vt:lpwstr", me(e));
      return r && (t = t.replace(/&quot;/g, "_x0022_")), t;
    case "number":
      return q((e | 0) == e ? "vt:i4" : "vt:r8", me(String(e)));
    case "boolean":
      return q("vt:bool", e ? "true" : "false");
  }
  if (e instanceof Date)
    return q("vt:filetime", ii(e));
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
}, Er = [
  "http://schemas.openxmlformats.org/spreadsheetml/2006/main",
  "http://purl.oclc.org/ooxml/spreadsheetml/main",
  "http://schemas.microsoft.com/office/excel/2006/main",
  "http://schemas.microsoft.com/office/excel/2006/2"
], lt = {
  o: "urn:schemas-microsoft-com:office:office",
  x: "urn:schemas-microsoft-com:office:excel",
  ss: "urn:schemas-microsoft-com:office:spreadsheet",
  dt: "uuid:C2F41010-65B3-11d1-A29F-00AA00C14882",
  mv: "http://macVmlSchemaUri",
  v: "urn:schemas-microsoft-com:vml",
  html: "http://www.w3.org/TR/REC-html40"
};
function yl(e, r) {
  for (var t = 1 - 2 * (e[r + 7] >>> 7), n = ((e[r + 7] & 127) << 4) + (e[r + 6] >>> 4 & 15), i = e[r + 6] & 15, a = 5; a >= 0; --a)
    i = i * 256 + e[r + a];
  return n == 2047 ? i == 0 ? t * (1 / 0) : NaN : (n == 0 ? n = -1022 : (n -= 1023, i += Math.pow(2, 52)), t * Math.pow(2, n - 52) * i);
}
function Al(e, r, t) {
  var n = (r < 0 || 1 / r == -1 / 0 ? 1 : 0) << 7, i = 0, a = 0, s = n ? -r : r;
  isFinite(s) ? s == 0 ? i = a = 0 : (i = Math.floor(Math.log(s) / Math.LN2), a = s * Math.pow(2, 52 - i), i <= -1023 && (!isFinite(a) || a < Math.pow(2, 52)) ? i = -1022 : (a -= Math.pow(2, 52), i += 1023)) : (i = 2047, a = isNaN(r) ? 26985 : 0);
  for (var o = 0; o <= 5; ++o, a /= 256)
    e[t + o] = a & 255;
  e[t + 6] = (i & 15) << 4 | a & 15, e[t + 7] = i >> 4 | n;
}
var pa = function(e) {
  for (var r = [], t = 10240, n = 0; n < e[0].length; ++n)
    if (e[0][n])
      for (var i = 0, a = e[0][n].length; i < a; i += t)
        r.push.apply(r, e[0][n].slice(i, i + t));
  return r;
}, ga = de ? function(e) {
  return e[0].length > 0 && Buffer.isBuffer(e[0][0]) ? Buffer.concat(e[0].map(function(r) {
    return Buffer.isBuffer(r) ? r : bt(r);
  })) : pa(e);
} : pa, va = function(e, r, t) {
  for (var n = [], i = r; i < t; i += 2)
    n.push(String.fromCharCode(kr(e, i)));
  return n.join("").replace(Rr, "");
}, _i = de ? function(e, r, t) {
  return Buffer.isBuffer(e) ? e.toString("utf16le", r, t).replace(Rr, "") : va(e, r, t);
} : va, ma = function(e, r, t) {
  for (var n = [], i = r; i < r + t; ++i)
    n.push(("0" + e[i].toString(16)).slice(-2));
  return n.join("");
}, _0 = de ? function(e, r, t) {
  return Buffer.isBuffer(e) ? e.toString("hex", r, r + t) : ma(e, r, t);
} : ma, _a = function(e, r, t) {
  for (var n = [], i = r; i < t; i++)
    n.push(String.fromCharCode(xr(e, i)));
  return n.join("");
}, zr = de ? function(r, t, n) {
  return Buffer.isBuffer(r) ? r.toString("utf8", t, n) : _a(r, t, n);
} : _a, w0 = function(e, r) {
  var t = ct(e, r);
  return t > 0 ? zr(e, r + 4, r + 4 + t - 1) : "";
}, T0 = w0, E0 = function(e, r) {
  var t = ct(e, r);
  return t > 0 ? zr(e, r + 4, r + 4 + t - 1) : "";
}, S0 = E0, y0 = function(e, r) {
  var t = 2 * ct(e, r);
  return t > 0 ? zr(e, r + 4, r + 4 + t - 1) : "";
}, A0 = y0, C0 = function(r, t) {
  var n = ct(r, t);
  return n > 0 ? _i(r, t + 4, t + 4 + n) : "";
}, F0 = C0, O0 = function(e, r) {
  var t = ct(e, r);
  return t > 0 ? zr(e, r + 4, r + 4 + t) : "";
}, D0 = O0, I0 = function(e, r) {
  return yl(e, r);
}, Tn = I0, wi = function(r) {
  return Array.isArray(r) || typeof Uint8Array < "u" && r instanceof Uint8Array;
};
de && (T0 = function(r, t) {
  if (!Buffer.isBuffer(r))
    return w0(r, t);
  var n = r.readUInt32LE(t);
  return n > 0 ? r.toString("utf8", t + 4, t + 4 + n - 1) : "";
}, S0 = function(r, t) {
  if (!Buffer.isBuffer(r))
    return E0(r, t);
  var n = r.readUInt32LE(t);
  return n > 0 ? r.toString("utf8", t + 4, t + 4 + n - 1) : "";
}, A0 = function(r, t) {
  if (!Buffer.isBuffer(r))
    return y0(r, t);
  var n = 2 * r.readUInt32LE(t);
  return r.toString("utf16le", t + 4, t + 4 + n - 1);
}, F0 = function(r, t) {
  if (!Buffer.isBuffer(r))
    return C0(r, t);
  var n = r.readUInt32LE(t);
  return r.toString("utf16le", t + 4, t + 4 + n);
}, D0 = function(r, t) {
  if (!Buffer.isBuffer(r))
    return O0(r, t);
  var n = r.readUInt32LE(t);
  return r.toString("utf8", t + 4, t + 4 + n);
}, Tn = function(r, t) {
  return Buffer.isBuffer(r) ? r.readDoubleLE(t) : I0(r, t);
}, wi = function(r) {
  return Buffer.isBuffer(r) || Array.isArray(r) || typeof Uint8Array < "u" && r instanceof Uint8Array;
});
var xr = function(e, r) {
  return e[r];
}, kr = function(e, r) {
  return e[r + 1] * (1 << 8) + e[r];
}, Cl = function(e, r) {
  var t = e[r + 1] * 256 + e[r];
  return t < 32768 ? t : (65535 - t + 1) * -1;
}, ct = function(e, r) {
  return e[r + 3] * (1 << 24) + (e[r + 2] << 16) + (e[r + 1] << 8) + e[r];
}, Zt = function(e, r) {
  return e[r + 3] << 24 | e[r + 2] << 16 | e[r + 1] << 8 | e[r];
}, Fl = function(e, r) {
  return e[r] << 24 | e[r + 1] << 16 | e[r + 2] << 8 | e[r + 3];
};
function Lr(e, r) {
  var t = "", n, i, a = [], s, o, c, f;
  switch (r) {
    case "dbcs":
      if (f = this.l, de && Buffer.isBuffer(this))
        t = this.slice(this.l, this.l + 2 * e).toString("utf16le");
      else
        for (c = 0; c < e; ++c)
          t += String.fromCharCode(kr(this, f)), f += 2;
      e *= 2;
      break;
    case "utf8":
      t = zr(this, this.l, this.l + e);
      break;
    case "utf16le":
      e *= 2, t = _i(this, this.l, this.l + e);
      break;
    case "wstr":
      return Lr.call(this, e, "dbcs");
    case "lpstr-ansi":
      t = T0(this, this.l), e = 4 + ct(this, this.l);
      break;
    case "lpstr-cp":
      t = S0(this, this.l), e = 4 + ct(this, this.l);
      break;
    case "lpwstr":
      t = A0(this, this.l), e = 4 + 2 * ct(this, this.l);
      break;
    case "lpp4":
      e = 4 + ct(this, this.l), t = F0(this, this.l), e & 2 && (e += 2);
      break;
    case "8lpp4":
      e = 4 + ct(this, this.l), t = D0(this, this.l), e & 3 && (e += 4 - (e & 3));
      break;
    case "cstr":
      for (e = 0, t = ""; (s = xr(this, this.l + e++)) !== 0; )
        a.push(rn(s));
      t = a.join("");
      break;
    case "_wstr":
      for (e = 0, t = ""; (s = kr(this, this.l + e)) !== 0; )
        a.push(rn(s)), e += 2;
      e += 2, t = a.join("");
      break;
    case "dbcs-cont":
      for (t = "", f = this.l, c = 0; c < e; ++c) {
        if (this.lens && this.lens.indexOf(f) !== -1)
          return s = xr(this, f), this.l = f + 1, o = Lr.call(this, e - c, s ? "dbcs-cont" : "sbcs-cont"), a.join("") + o;
        a.push(rn(kr(this, f))), f += 2;
      }
      t = a.join(""), e *= 2;
      break;
    case "cpstr":
    case "sbcs-cont":
      for (t = "", f = this.l, c = 0; c != e; ++c) {
        if (this.lens && this.lens.indexOf(f) !== -1)
          return s = xr(this, f), this.l = f + 1, o = Lr.call(this, e - c, s ? "dbcs-cont" : "sbcs-cont"), a.join("") + o;
        a.push(rn(xr(this, f))), f += 1;
      }
      t = a.join("");
      break;
    default:
      switch (e) {
        case 1:
          return n = xr(this, this.l), this.l++, n;
        case 2:
          return n = (r === "i" ? Cl : kr)(this, this.l), this.l += 2, n;
        case 4:
        case -4:
          return r === "i" || (this[this.l + 3] & 128) === 0 ? (n = (e > 0 ? Zt : Fl)(this, this.l), this.l += 4, n) : (i = ct(this, this.l), this.l += 4, i);
        case 8:
        case -8:
          if (r === "f")
            return e == 8 ? i = Tn(this, this.l) : i = Tn([this[this.l + 7], this[this.l + 6], this[this.l + 5], this[this.l + 4], this[this.l + 3], this[this.l + 2], this[this.l + 1], this[this.l + 0]], 0), this.l += 8, i;
          e = 8;
        case 16:
          t = _0(this, this.l, e);
          break;
      }
  }
  return this.l += e, t;
}
var Ol = function(e, r, t) {
  e[t] = r & 255, e[t + 1] = r >>> 8 & 255, e[t + 2] = r >>> 16 & 255, e[t + 3] = r >>> 24 & 255;
}, Dl = function(e, r, t) {
  e[t] = r & 255, e[t + 1] = r >> 8 & 255, e[t + 2] = r >> 16 & 255, e[t + 3] = r >> 24 & 255;
}, Il = function(e, r, t) {
  e[t] = r & 255, e[t + 1] = r >>> 8 & 255;
};
function kl(e, r, t) {
  var n = 0, i = 0;
  if (t === "dbcs") {
    for (i = 0; i != r.length; ++i)
      Il(this, r.charCodeAt(i), this.l + 2 * i);
    n = 2 * r.length;
  } else if (t === "sbcs") {
    for (r = r.replace(/[^\x00-\x7F]/g, "_"), i = 0; i != r.length; ++i)
      this[this.l + i] = r.charCodeAt(i) & 255;
    n = r.length;
  } else if (t === "hex") {
    for (; i < e; ++i)
      this[this.l++] = parseInt(r.slice(2 * i, 2 * i + 2), 16) || 0;
    return this;
  } else if (t === "utf16le") {
    var a = Math.min(this.l + e, this.length);
    for (i = 0; i < Math.min(r.length, e); ++i) {
      var s = r.charCodeAt(i);
      this[this.l++] = s & 255, this[this.l++] = s >> 8;
    }
    for (; this.l < a; )
      this[this.l++] = 0;
    return this;
  } else
    switch (e) {
      case 1:
        n = 1, this[this.l] = r & 255;
        break;
      case 2:
        n = 2, this[this.l] = r & 255, r >>>= 8, this[this.l + 1] = r & 255;
        break;
      case 3:
        n = 3, this[this.l] = r & 255, r >>>= 8, this[this.l + 1] = r & 255, r >>>= 8, this[this.l + 2] = r & 255;
        break;
      case 4:
        n = 4, Ol(this, r, this.l);
        break;
      case 8:
        if (n = 8, t === "f") {
          Al(this, r, this.l);
          break;
        }
      case 16:
        break;
      case -4:
        n = 4, Dl(this, r, this.l);
        break;
    }
  return this.l += n, this;
}
function k0(e, r) {
  var t = _0(this, this.l, e.length >> 1);
  if (t !== e)
    throw new Error(r + "Expected " + e + " saw " + t);
  this.l += e.length >> 1;
}
function ft(e, r) {
  e.l = r, e.read_shift = Lr, e.chk = k0, e.write_shift = kl;
}
function Ct(e, r) {
  e.l += r;
}
function B(e) {
  var r = tr(e);
  return ft(r, 0), r;
}
function nt() {
  var e = [], r = de ? 256 : 2048, t = function(f) {
    var l = B(f);
    return ft(l, 0), l;
  }, n = t(r), i = function() {
    !n || (n.length > n.l && (n = n.slice(0, n.l), n.l = n.length), n.length > 0 && e.push(n), n = null);
  }, a = function(f) {
    return n && f < n.length - n.l ? n : (i(), n = t(Math.max(f + 1, r)));
  }, s = function() {
    return i(), Ve(e);
  }, o = function(f) {
    i(), n = f, n.l == null && (n.l = n.length), a(r);
  };
  return { next: a, push: o, end: s, _bufs: e };
}
function W(e, r, t, n) {
  var i = +r, a;
  if (!isNaN(i)) {
    n || (n = yd[i].p || (t || []).length || 0), a = 1 + (i >= 128 ? 1 : 0) + 1, n >= 128 && ++a, n >= 16384 && ++a, n >= 2097152 && ++a;
    var s = e.next(a);
    i <= 127 ? s.write_shift(1, i) : (s.write_shift(1, (i & 127) + 128), s.write_shift(1, i >> 7));
    for (var o = 0; o != 4; ++o)
      if (n >= 128)
        s.write_shift(1, (n & 127) + 128), n >>= 7;
      else {
        s.write_shift(1, n);
        break;
      }
    n > 0 && wi(t) && e.push(t);
  }
}
function Pr(e, r, t) {
  var n = at(e);
  if (r.s ? (n.cRel && (n.c += r.s.c), n.rRel && (n.r += r.s.r)) : (n.cRel && (n.c += r.c), n.rRel && (n.r += r.r)), !t || t.biff < 12) {
    for (; n.c >= 256; )
      n.c -= 256;
    for (; n.r >= 65536; )
      n.r -= 65536;
  }
  return n;
}
function wa(e, r, t) {
  var n = at(e);
  return n.s = Pr(n.s, r.s, t), n.e = Pr(n.e, r.s, t), n;
}
function Mr(e, r) {
  if (e.cRel && e.c < 0)
    for (e = at(e); e.c < 0; )
      e.c += r > 8 ? 16384 : 256;
  if (e.rRel && e.r < 0)
    for (e = at(e); e.r < 0; )
      e.r += r > 8 ? 1048576 : r > 5 ? 65536 : 16384;
  var t = _e(e);
  return !e.cRel && e.cRel != null && (t = Ll(t)), !e.rRel && e.rRel != null && (t = Rl(t)), t;
}
function qn(e, r) {
  return e.s.r == 0 && !e.s.rRel && e.e.r == (r.biff >= 12 ? 1048575 : r.biff >= 8 ? 65536 : 16384) && !e.e.rRel ? (e.s.cRel ? "" : "$") + je(e.s.c) + ":" + (e.e.cRel ? "" : "$") + je(e.e.c) : e.s.c == 0 && !e.s.cRel && e.e.c == (r.biff >= 12 ? 16383 : 255) && !e.e.cRel ? (e.s.rRel ? "" : "$") + Ge(e.s.r) + ":" + (e.e.rRel ? "" : "$") + Ge(e.e.r) : Mr(e.s, r.biff) + ":" + Mr(e.e, r.biff);
}
function Ti(e) {
  return parseInt(Nl(e), 10) - 1;
}
function Ge(e) {
  return "" + (e + 1);
}
function Rl(e) {
  return e.replace(/([A-Z]|^)(\d+)$/, "$1$$$2");
}
function Nl(e) {
  return e.replace(/\$(\d+)$/, "$1");
}
function Ei(e) {
  for (var r = Pl(e), t = 0, n = 0; n !== r.length; ++n)
    t = 26 * t + r.charCodeAt(n) - 64;
  return t - 1;
}
function je(e) {
  if (e < 0)
    throw new Error("invalid column " + e);
  var r = "";
  for (++e; e; e = Math.floor((e - 1) / 26))
    r = String.fromCharCode((e - 1) % 26 + 65) + r;
  return r;
}
function Ll(e) {
  return e.replace(/^([A-Z])/, "$$$1");
}
function Pl(e) {
  return e.replace(/^\$([A-Z])/, "$1");
}
function Ml(e) {
  return e.replace(/(\$?[A-Z]*)(\$?\d*)/, "$1,$2").split(",");
}
function be(e) {
  for (var r = 0, t = 0, n = 0; n < e.length; ++n) {
    var i = e.charCodeAt(n);
    i >= 48 && i <= 57 ? r = 10 * r + (i - 48) : i >= 65 && i <= 90 && (t = 26 * t + (i - 64));
  }
  return { c: t - 1, r: r - 1 };
}
function _e(e) {
  for (var r = e.c + 1, t = ""; r; r = (r - 1) / 26 | 0)
    t = String.fromCharCode((r - 1) % 26 + 65) + t;
  return t + (e.r + 1);
}
function ht(e) {
  var r = e.indexOf(":");
  return r == -1 ? { s: be(e), e: be(e) } : { s: be(e.slice(0, r)), e: be(e.slice(r + 1)) };
}
function ke(e, r) {
  return typeof r > "u" || typeof r == "number" ? ke(e.s, e.e) : (typeof e != "string" && (e = _e(e)), typeof r != "string" && (r = _e(r)), e == r ? e : e + ":" + r);
}
function Se(e) {
  var r = { s: { c: 0, r: 0 }, e: { c: 0, r: 0 } }, t = 0, n = 0, i = 0, a = e.length;
  for (t = 0; n < a && !((i = e.charCodeAt(n) - 64) < 1 || i > 26); ++n)
    t = 26 * t + i;
  for (r.s.c = --t, t = 0; n < a && !((i = e.charCodeAt(n) - 48) < 0 || i > 9); ++n)
    t = 10 * t + i;
  if (r.s.r = --t, n === a || i != 10)
    return r.e.c = r.s.c, r.e.r = r.s.r, r;
  for (++n, t = 0; n != a && !((i = e.charCodeAt(n) - 64) < 1 || i > 26); ++n)
    t = 26 * t + i;
  for (r.e.c = --t, t = 0; n != a && !((i = e.charCodeAt(n) - 48) < 0 || i > 9); ++n)
    t = 10 * t + i;
  return r.e.r = --t, r;
}
function Ta(e, r) {
  var t = e.t == "d" && r instanceof Date;
  if (e.z != null)
    try {
      return e.w = Yt(e.z, t ? it(r) : r);
    } catch {
    }
  try {
    return e.w = Yt((e.XF || {}).numFmtId || (t ? 14 : 0), t ? it(r) : r);
  } catch {
    return "" + r;
  }
}
function Bt(e, r, t) {
  return e == null || e.t == null || e.t == "z" ? "" : e.w !== void 0 ? e.w : (e.t == "d" && !e.z && t && t.dateNF && (e.z = t.dateNF), e.t == "e" ? jr[e.v] || e.v : r == null ? Ta(e, e.v) : Ta(e, r));
}
function ir(e, r) {
  var t = r && r.sheet ? r.sheet : "Sheet1", n = {};
  return n[t] = e, { SheetNames: [t], Sheets: n };
}
function R0(e, r, t) {
  var n = t || {}, i = e ? Array.isArray(e) : n.dense, a = e || (i ? [] : {}), s = 0, o = 0;
  if (a && n.origin != null) {
    if (typeof n.origin == "number")
      s = n.origin;
    else {
      var c = typeof n.origin == "string" ? be(n.origin) : n.origin;
      s = c.r, o = c.c;
    }
    a["!ref"] || (a["!ref"] = "A1:A1");
  }
  var f = { s: { c: 1e7, r: 1e7 }, e: { c: 0, r: 0 } };
  if (a["!ref"]) {
    var l = Se(a["!ref"]);
    f.s.c = l.s.c, f.s.r = l.s.r, f.e.c = Math.max(f.e.c, l.e.c), f.e.r = Math.max(f.e.r, l.e.r), s == -1 && (f.e.r = s = l.e.r + 1);
  }
  for (var h = 0; h != r.length; ++h)
    if (!!r[h]) {
      if (!Array.isArray(r[h]))
        throw new Error("aoa_to_sheet expects an array of arrays");
      for (var x = 0; x != r[h].length; ++x)
        if (!(typeof r[h][x] > "u")) {
          var d = { v: r[h][x] }, v = s + h, u = o + x;
          if (f.s.r > v && (f.s.r = v), f.s.c > u && (f.s.c = u), f.e.r < v && (f.e.r = v), f.e.c < u && (f.e.c = u), r[h][x] && typeof r[h][x] == "object" && !Array.isArray(r[h][x]) && !(r[h][x] instanceof Date))
            d = r[h][x];
          else if (Array.isArray(d.v) && (d.f = r[h][x][1], d.v = d.v[0]), d.v === null)
            if (d.f)
              d.t = "n";
            else if (n.nullError)
              d.t = "e", d.v = 0;
            else if (n.sheetStubs)
              d.t = "z";
            else
              continue;
          else
            typeof d.v == "number" ? d.t = "n" : typeof d.v == "boolean" ? d.t = "b" : d.v instanceof Date ? (d.z = n.dateNF || Oe[14], n.cellDates ? (d.t = "d", d.w = Yt(d.z, it(d.v))) : (d.t = "n", d.v = it(d.v), d.w = Yt(d.z, d.v))) : d.t = "s";
          if (i)
            a[v] || (a[v] = []), a[v][u] && a[v][u].z && (d.z = a[v][u].z), a[v][u] = d;
          else {
            var g = _e({ c: u, r: v });
            a[g] && a[g].z && (d.z = a[g].z), a[g] = d;
          }
        }
    }
  return f.s.c < 1e7 && (a["!ref"] = ke(f)), a;
}
function Sr(e, r) {
  return R0(null, e, r);
}
function Bl(e) {
  return e.read_shift(4, "i");
}
function Et(e, r) {
  return r || (r = B(4)), r.write_shift(4, e), r;
}
function Ke(e) {
  var r = e.read_shift(4);
  return r === 0 ? "" : e.read_shift(r, "dbcs");
}
function Ue(e, r) {
  var t = !1;
  return r == null && (t = !0, r = B(4 + 2 * e.length)), r.write_shift(4, e.length), e.length > 0 && r.write_shift(0, e, "dbcs"), t ? r.slice(0, r.l) : r;
}
function bl(e) {
  return { ich: e.read_shift(2), ifnt: e.read_shift(2) };
}
function Ul(e, r) {
  return r || (r = B(4)), r.write_shift(2, e.ich || 0), r.write_shift(2, e.ifnt || 0), r;
}
function Si(e, r) {
  var t = e.l, n = e.read_shift(1), i = Ke(e), a = [], s = { t: i, h: i };
  if ((n & 1) !== 0) {
    for (var o = e.read_shift(4), c = 0; c != o; ++c)
      a.push(bl(e));
    s.r = a;
  } else
    s.r = [{ ich: 0, ifnt: 0 }];
  return e.l = t + r, s;
}
function Hl(e, r) {
  var t = !1;
  return r == null && (t = !0, r = B(15 + 4 * e.t.length)), r.write_shift(1, 0), Ue(e.t, r), t ? r.slice(0, r.l) : r;
}
var Wl = Si;
function Xl(e, r) {
  var t = !1;
  return r == null && (t = !0, r = B(23 + 4 * e.t.length)), r.write_shift(1, 1), Ue(e.t, r), r.write_shift(4, 1), Ul({ ich: 0, ifnt: 0 }, r), t ? r.slice(0, r.l) : r;
}
function gt(e) {
  var r = e.read_shift(4), t = e.read_shift(2);
  return t += e.read_shift(1) << 16, e.l++, { c: r, iStyleRef: t };
}
function ar(e, r) {
  return r == null && (r = B(8)), r.write_shift(-4, e.c), r.write_shift(3, e.iStyleRef || e.s), r.write_shift(1, 0), r;
}
function sr(e) {
  var r = e.read_shift(2);
  return r += e.read_shift(1) << 16, e.l++, { c: -1, iStyleRef: r };
}
function or(e, r) {
  return r == null && (r = B(4)), r.write_shift(3, e.iStyleRef || e.s), r.write_shift(1, 0), r;
}
var Vl = Ke, N0 = Ue;
function yi(e) {
  var r = e.read_shift(4);
  return r === 0 || r === 4294967295 ? "" : e.read_shift(r, "dbcs");
}
function En(e, r) {
  var t = !1;
  return r == null && (t = !0, r = B(127)), r.write_shift(4, e.length > 0 ? e.length : 4294967295), e.length > 0 && r.write_shift(0, e, "dbcs"), t ? r.slice(0, r.l) : r;
}
var Yl = Ke, ai = yi, Ai = En;
function L0(e) {
  var r = e.slice(e.l, e.l + 4), t = r[0] & 1, n = r[0] & 2;
  e.l += 4;
  var i = n === 0 ? Tn([0, 0, 0, 0, r[0] & 252, r[1], r[2], r[3]], 0) : Zt(r, 0) >> 2;
  return t ? i / 100 : i;
}
function P0(e, r) {
  r == null && (r = B(4));
  var t = 0, n = 0, i = e * 100;
  if (e == (e | 0) && e >= -(1 << 29) && e < 1 << 29 ? n = 1 : i == (i | 0) && i >= -(1 << 29) && i < 1 << 29 && (n = 1, t = 1), n)
    r.write_shift(-4, ((t ? i : e) << 2) + (t + 2));
  else
    throw new Error("unsupported RkNumber " + e);
}
function M0(e) {
  var r = { s: {}, e: {} };
  return r.s.r = e.read_shift(4), r.e.r = e.read_shift(4), r.s.c = e.read_shift(4), r.e.c = e.read_shift(4), r;
}
function Gl(e, r) {
  return r || (r = B(16)), r.write_shift(4, e.s.r), r.write_shift(4, e.e.r), r.write_shift(4, e.s.c), r.write_shift(4, e.e.c), r;
}
var fr = M0, yr = Gl;
function Ar(e) {
  if (e.length - e.l < 8)
    throw "XLS Xnum Buffer underflow";
  return e.read_shift(8, "f");
}
function rr(e, r) {
  return (r || B(8)).write_shift(8, e, "f");
}
function $l(e) {
  var r = {}, t = e.read_shift(1), n = t >>> 1, i = e.read_shift(1), a = e.read_shift(2, "i"), s = e.read_shift(1), o = e.read_shift(1), c = e.read_shift(1);
  switch (e.l++, n) {
    case 0:
      r.auto = 1;
      break;
    case 1:
      r.index = i;
      var f = tc[i];
      f && (r.rgb = Ra(f));
      break;
    case 2:
      r.rgb = Ra([s, o, c]);
      break;
    case 3:
      r.theme = i;
      break;
  }
  return a != 0 && (r.tint = a > 0 ? a / 32767 : a / 32768), r;
}
function Sn(e, r) {
  if (r || (r = B(8)), !e || e.auto)
    return r.write_shift(4, 0), r.write_shift(4, 0), r;
  e.index != null ? (r.write_shift(1, 2), r.write_shift(1, e.index)) : e.theme != null ? (r.write_shift(1, 6), r.write_shift(1, e.theme)) : (r.write_shift(1, 5), r.write_shift(1, 0));
  var t = e.tint || 0;
  if (t > 0 ? t *= 32767 : t < 0 && (t *= 32768), r.write_shift(2, t), !e.rgb || e.theme != null)
    r.write_shift(2, 0), r.write_shift(1, 0), r.write_shift(1, 0);
  else {
    var n = e.rgb || "FFFFFF";
    typeof n == "number" && (n = ("000000" + n.toString(16)).slice(-6)), r.write_shift(1, parseInt(n.slice(0, 2), 16)), r.write_shift(1, parseInt(n.slice(2, 4), 16)), r.write_shift(1, parseInt(n.slice(4, 6), 16)), r.write_shift(1, 255);
  }
  return r;
}
function zl(e) {
  var r = e.read_shift(1);
  e.l++;
  var t = {
    fBold: r & 1,
    fItalic: r & 2,
    fUnderline: r & 4,
    fStrikeout: r & 8,
    fOutline: r & 16,
    fShadow: r & 32,
    fCondense: r & 64,
    fExtend: r & 128
  };
  return t;
}
function jl(e, r) {
  r || (r = B(2));
  var t = (e.italic ? 2 : 0) | (e.strike ? 8 : 0) | (e.outline ? 16 : 0) | (e.shadow ? 32 : 0) | (e.condense ? 64 : 0) | (e.extend ? 128 : 0);
  return r.write_shift(1, t), r.write_shift(1, 0), r;
}
var B0 = 2, ot = 3, on = 11, yn = 19, fn = 64, Kl = 65, ql = 71, Jl = 4108, Zl = 4126, Xe = 80, Ea = {
  1: { n: "CodePage", t: B0 },
  2: { n: "Category", t: Xe },
  3: { n: "PresentationFormat", t: Xe },
  4: { n: "ByteCount", t: ot },
  5: { n: "LineCount", t: ot },
  6: { n: "ParagraphCount", t: ot },
  7: { n: "SlideCount", t: ot },
  8: { n: "NoteCount", t: ot },
  9: { n: "HiddenCount", t: ot },
  10: { n: "MultimediaClipCount", t: ot },
  11: { n: "ScaleCrop", t: on },
  12: { n: "HeadingPairs", t: Jl },
  13: { n: "TitlesOfParts", t: Zl },
  14: { n: "Manager", t: Xe },
  15: { n: "Company", t: Xe },
  16: { n: "LinksUpToDate", t: on },
  17: { n: "CharacterCount", t: ot },
  19: { n: "SharedDoc", t: on },
  22: { n: "HyperlinksChanged", t: on },
  23: { n: "AppVersion", t: ot, p: "version" },
  24: { n: "DigSig", t: Kl },
  26: { n: "ContentType", t: Xe },
  27: { n: "ContentStatus", t: Xe },
  28: { n: "Language", t: Xe },
  29: { n: "Version", t: Xe },
  255: {},
  2147483648: { n: "Locale", t: yn },
  2147483651: { n: "Behavior", t: yn },
  1919054434: {}
}, Sa = {
  1: { n: "CodePage", t: B0 },
  2: { n: "Title", t: Xe },
  3: { n: "Subject", t: Xe },
  4: { n: "Author", t: Xe },
  5: { n: "Keywords", t: Xe },
  6: { n: "Comments", t: Xe },
  7: { n: "Template", t: Xe },
  8: { n: "LastAuthor", t: Xe },
  9: { n: "RevNumber", t: Xe },
  10: { n: "EditTime", t: fn },
  11: { n: "LastPrinted", t: fn },
  12: { n: "CreatedDate", t: fn },
  13: { n: "ModifiedDate", t: fn },
  14: { n: "PageCount", t: ot },
  15: { n: "WordCount", t: ot },
  16: { n: "CharCount", t: ot },
  17: { n: "Thumbnail", t: ql },
  18: { n: "Application", t: Xe },
  19: { n: "DocSecurity", t: ot },
  255: {},
  2147483648: { n: "Locale", t: yn },
  2147483651: { n: "Behavior", t: yn },
  1919054434: {}
};
function Ql(e) {
  return e.map(function(r) {
    return [r >> 16 & 255, r >> 8 & 255, r & 255];
  });
}
var ec = /* @__PURE__ */ Ql([
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
]), tc = /* @__PURE__ */ at(ec), jr = {
  0: "#NULL!",
  7: "#DIV/0!",
  15: "#VALUE!",
  23: "#REF!",
  29: "#NAME?",
  36: "#NUM!",
  42: "#N/A",
  43: "#GETTING_DATA",
  255: "#WTF?"
}, rc = {
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
}, ln = {
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
function b0() {
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
function U0(e, r) {
  var t = ul(rc), n = [], i;
  n[n.length] = Re, n[n.length] = q("Types", null, {
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
  var a = function(c) {
    e[c] && e[c].length > 0 && (i = e[c][0], n[n.length] = q("Override", null, {
      PartName: (i[0] == "/" ? "" : "/") + i,
      ContentType: ln[c][r.bookType] || ln[c].xlsx
    }));
  }, s = function(c) {
    (e[c] || []).forEach(function(f) {
      n[n.length] = q("Override", null, {
        PartName: (f[0] == "/" ? "" : "/") + f,
        ContentType: ln[c][r.bookType] || ln[c].xlsx
      });
    });
  }, o = function(c) {
    (e[c] || []).forEach(function(f) {
      n[n.length] = q("Override", null, {
        PartName: (f[0] == "/" ? "" : "/") + f,
        ContentType: t[c][0]
      });
    });
  };
  return a("workbooks"), s("sheets"), s("charts"), o("themes"), ["strs", "styles"].forEach(a), ["coreprops", "extprops", "custprops"].forEach(o), o("vba"), o("comments"), o("threadedcomments"), o("drawings"), s("metadata"), o("people"), n.length > 2 && (n[n.length] = "</Types>", n[1] = n[1].replace("/>", ">")), n.join("");
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
function H0(e) {
  var r = e.lastIndexOf("/");
  return e.slice(0, r + 1) + "_rels/" + e.slice(r + 1) + ".rels";
}
function gr(e) {
  var r = [Re, q("Relationships", null, {
    xmlns: Be.RELS
  })];
  return $e(e["!id"]).forEach(function(t) {
    r[r.length] = q("Relationship", null, e["!id"][t]);
  }), r.length > 2 && (r[r.length] = "</Relationships>", r[1] = r[1].replace("/>", ">")), r.join("");
}
function ve(e, r, t, n, i, a) {
  if (i || (i = {}), e["!id"] || (e["!id"] = {}), e["!idx"] || (e["!idx"] = 1), r < 0)
    for (r = e["!idx"]; e["!id"]["rId" + r]; ++r)
      ;
  if (e["!idx"] = r + 1, i.Id = "rId" + r, i.Type = n, i.Target = t, a ? i.TargetMode = a : [xe.HLINK, xe.XPATH, xe.XMISS].indexOf(i.Type) > -1 && (i.TargetMode = "External"), e["!id"][i.Id])
    throw new Error("Cannot rewrite rId " + r);
  return e["!id"][i.Id] = i, e[("/" + i.Target).replace("//", "/")] = i, r;
}
function nc(e) {
  var r = [Re];
  r.push(`<manifest:manifest xmlns:manifest="urn:oasis:names:tc:opendocument:xmlns:manifest:1.0" manifest:version="1.2">
`), r.push(`  <manifest:file-entry manifest:full-path="/" manifest:version="1.2" manifest:media-type="application/vnd.oasis.opendocument.spreadsheet"/>
`);
  for (var t = 0; t < e.length; ++t)
    r.push('  <manifest:file-entry manifest:full-path="' + e[t][0] + '" manifest:media-type="' + e[t][1] + `"/>
`);
  return r.push("</manifest:manifest>"), r.join("");
}
function ya(e, r, t) {
  return [
    '  <rdf:Description rdf:about="' + e + `">
`,
    '    <rdf:type rdf:resource="http://docs.oasis-open.org/ns/office/1.2/meta/' + (t || "odf") + "#" + r + `"/>
`,
    `  </rdf:Description>
`
  ].join("");
}
function ic(e, r) {
  return [
    '  <rdf:Description rdf:about="' + e + `">
`,
    '    <ns0:hasPart xmlns:ns0="http://docs.oasis-open.org/ns/office/1.2/meta/pkg#" rdf:resource="' + r + `"/>
`,
    `  </rdf:Description>
`
  ].join("");
}
function ac(e) {
  var r = [Re];
  r.push(`<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
`);
  for (var t = 0; t != e.length; ++t)
    r.push(ya(e[t][0], e[t][1])), r.push(ic("", e[t][0]));
  return r.push(ya("", "Document", "pkg")), r.push("</rdf:RDF>"), r.join("");
}
function W0() {
  return '<office:document-meta xmlns:office="urn:oasis:names:tc:opendocument:xmlns:office:1.0" xmlns:meta="urn:oasis:names:tc:opendocument:xmlns:meta:1.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:xlink="http://www.w3.org/1999/xlink" office:version="1.2"><office:meta><meta:generator>SheetJS ' + gn.version + "</meta:generator></office:meta></office:document-meta>";
}
var Qt = [
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
function Jn(e, r, t, n, i) {
  i[e] != null || r == null || r === "" || (i[e] = r, r = me(r), n[n.length] = t ? q(e, r, t) : Ye(e, r));
}
function X0(e, r) {
  var t = r || {}, n = [Re, q("cp:coreProperties", null, {
    "xmlns:cp": Be.CORE_PROPS,
    "xmlns:dc": Be.dc,
    "xmlns:dcterms": Be.dcterms,
    "xmlns:dcmitype": Be.dcmitype,
    "xmlns:xsi": Be.xsi
  })], i = {};
  if (!e && !t.Props)
    return n.join("");
  e && (e.CreatedDate != null && Jn("dcterms:created", typeof e.CreatedDate == "string" ? e.CreatedDate : ii(e.CreatedDate, t.WTF), { "xsi:type": "dcterms:W3CDTF" }, n, i), e.ModifiedDate != null && Jn("dcterms:modified", typeof e.ModifiedDate == "string" ? e.ModifiedDate : ii(e.ModifiedDate, t.WTF), { "xsi:type": "dcterms:W3CDTF" }, n, i));
  for (var a = 0; a != Qt.length; ++a) {
    var s = Qt[a], o = t.Props && t.Props[s[1]] != null ? t.Props[s[1]] : e ? e[s[1]] : null;
    o === !0 ? o = "1" : o === !1 ? o = "0" : typeof o == "number" && (o = String(o)), o != null && Jn(s[0], o, null, n, i);
  }
  return n.length > 2 && (n[n.length] = "</cp:coreProperties>", n[1] = n[1].replace("/>", ">")), n.join("");
}
var vr = [
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
], V0 = [
  "Worksheets",
  "SheetNames",
  "NamedRanges",
  "DefinedNames",
  "Chartsheets",
  "ChartNames"
];
function Y0(e) {
  var r = [], t = q;
  return e || (e = {}), e.Application = "SheetJS", r[r.length] = Re, r[r.length] = q("Properties", null, {
    xmlns: Be.EXT_PROPS,
    "xmlns:vt": Be.vt
  }), vr.forEach(function(n) {
    if (e[n[1]] !== void 0) {
      var i;
      switch (n[2]) {
        case "string":
          i = me(String(e[n[1]]));
          break;
        case "bool":
          i = e[n[1]] ? "true" : "false";
          break;
      }
      i !== void 0 && (r[r.length] = t(n[0], i));
    }
  }), r[r.length] = t("HeadingPairs", t("vt:vector", t("vt:variant", "<vt:lpstr>Worksheets</vt:lpstr>") + t("vt:variant", t("vt:i4", String(e.Worksheets))), { size: 2, baseType: "variant" })), r[r.length] = t("TitlesOfParts", t("vt:vector", e.SheetNames.map(function(n) {
    return "<vt:lpstr>" + me(n) + "</vt:lpstr>";
  }).join(""), { size: e.Worksheets, baseType: "lpstr" })), r.length > 2 && (r[r.length] = "</Properties>", r[1] = r[1].replace("/>", ">")), r.join("");
}
function G0(e) {
  var r = [Re, q("Properties", null, {
    xmlns: Be.CUST_PROPS,
    "xmlns:vt": Be.vt
  })];
  if (!e)
    return r.join("");
  var t = 1;
  return $e(e).forEach(function(i) {
    ++t, r[r.length] = q("property", Sl(e[i], !0), {
      fmtid: "{D5CDD505-2E9C-101B-9397-08002B2CF9AE}",
      pid: t,
      name: me(i)
    });
  }), r.length > 2 && (r[r.length] = "</Properties>", r[1] = r[1].replace("/>", ">")), r.join("");
}
var Aa = {
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
function sc(e, r) {
  var t = [];
  return $e(Aa).map(function(n) {
    for (var i = 0; i < Qt.length; ++i)
      if (Qt[i][1] == n)
        return Qt[i];
    for (i = 0; i < vr.length; ++i)
      if (vr[i][1] == n)
        return vr[i];
    throw n;
  }).forEach(function(n) {
    if (e[n[1]] != null) {
      var i = r && r.Props && r.Props[n[1]] != null ? r.Props[n[1]] : e[n[1]];
      switch (n[2]) {
        case "date":
          i = new Date(i).toISOString().replace(/\.\d*Z/, "Z");
          break;
      }
      typeof i == "number" ? i = String(i) : i === !0 || i === !1 ? i = i ? "1" : "0" : i instanceof Date && (i = new Date(i).toISOString().replace(/\.\d*Z/, "")), t.push(Ye(Aa[n[1]] || n[1], i));
    }
  }), q("DocumentProperties", t.join(""), { xmlns: lt.o });
}
function oc(e, r) {
  var t = ["Worksheets", "SheetNames"], n = "CustomDocumentProperties", i = [];
  return e && $e(e).forEach(function(a) {
    if (!!Object.prototype.hasOwnProperty.call(e, a)) {
      for (var s = 0; s < Qt.length; ++s)
        if (a == Qt[s][1])
          return;
      for (s = 0; s < vr.length; ++s)
        if (a == vr[s][1])
          return;
      for (s = 0; s < t.length; ++s)
        if (a == t[s])
          return;
      var o = e[a], c = "string";
      typeof o == "number" ? (c = "float", o = String(o)) : o === !0 || o === !1 ? (c = "boolean", o = o ? "1" : "0") : o = String(o), i.push(q(ua(a), o, { "dt:dt": c }));
    }
  }), r && $e(r).forEach(function(a) {
    if (!!Object.prototype.hasOwnProperty.call(r, a) && !(e && Object.prototype.hasOwnProperty.call(e, a))) {
      var s = r[a], o = "string";
      typeof s == "number" ? (o = "float", s = String(s)) : s === !0 || s === !1 ? (o = "boolean", s = s ? "1" : "0") : s instanceof Date ? (o = "dateTime.tz", s = s.toISOString()) : s = String(s), i.push(q(ua(a), s, { "dt:dt": o }));
    }
  }), "<" + n + ' xmlns="' + lt.o + '">' + i.join("") + "</" + n + ">";
}
function fc(e) {
  var r = typeof e == "string" ? new Date(Date.parse(e)) : e, t = r.getTime() / 1e3 + 11644473600, n = t % Math.pow(2, 32), i = (t - n) / Math.pow(2, 32);
  n *= 1e7, i *= 1e7;
  var a = n / Math.pow(2, 32) | 0;
  a > 0 && (n = n % Math.pow(2, 32), i += a);
  var s = B(8);
  return s.write_shift(4, n), s.write_shift(4, i), s;
}
function Ca(e, r) {
  var t = B(4), n = B(4);
  switch (t.write_shift(4, e == 80 ? 31 : e), e) {
    case 3:
      n.write_shift(-4, r);
      break;
    case 5:
      n = B(8), n.write_shift(8, r, "f");
      break;
    case 11:
      n.write_shift(4, r ? 1 : 0);
      break;
    case 64:
      n = fc(r);
      break;
    case 31:
    case 80:
      for (n = B(4 + 2 * (r.length + 1) + (r.length % 2 ? 0 : 2)), n.write_shift(4, r.length + 1), n.write_shift(0, r, "dbcs"); n.l != n.length; )
        n.write_shift(1, 0);
      break;
    default:
      throw new Error("TypedPropertyValue unrecognized type " + e + " " + r);
  }
  return Ve([t, n]);
}
var $0 = ["CodePage", "Thumbnail", "_PID_LINKBASE", "_PID_HLINKS", "SystemIdentifier", "FMTID"];
function lc(e) {
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
function Fa(e, r, t) {
  var n = B(8), i = [], a = [], s = 8, o = 0, c = B(8), f = B(8);
  if (c.write_shift(4, 2), c.write_shift(4, 1200), f.write_shift(4, 1), a.push(c), i.push(f), s += 8 + c.length, !r) {
    f = B(8), f.write_shift(4, 0), i.unshift(f);
    var l = [B(4)];
    for (l[0].write_shift(4, e.length), o = 0; o < e.length; ++o) {
      var h = e[o][0];
      for (c = B(4 + 4 + 2 * (h.length + 1) + (h.length % 2 ? 0 : 2)), c.write_shift(4, o + 2), c.write_shift(4, h.length + 1), c.write_shift(0, h, "dbcs"); c.l != c.length; )
        c.write_shift(1, 0);
      l.push(c);
    }
    c = Ve(l), a.unshift(c), s += 8 + c.length;
  }
  for (o = 0; o < e.length; ++o)
    if (!(r && !r[e[o][0]]) && !($0.indexOf(e[o][0]) > -1 || V0.indexOf(e[o][0]) > -1) && e[o][1] != null) {
      var x = e[o][1], d = 0;
      if (r) {
        d = +r[e[o][0]];
        var v = t[d];
        if (v.p == "version" && typeof x == "string") {
          var u = x.split(".");
          x = (+u[0] << 16) + (+u[1] || 0);
        }
        c = Ca(v.t, x);
      } else {
        var g = lc(x);
        g == -1 && (g = 31, x = String(x)), c = Ca(g, x);
      }
      a.push(c), f = B(8), f.write_shift(4, r ? d : 2 + o), i.push(f), s += 8 + c.length;
    }
  var S = 8 * (a.length + 1);
  for (o = 0; o < a.length; ++o)
    i[o].write_shift(4, S), S += a[o].length;
  return n.write_shift(4, s), n.write_shift(4, a.length), Ve([n].concat(i).concat(a));
}
function Oa(e, r, t, n, i, a) {
  var s = B(i ? 68 : 48), o = [s];
  s.write_shift(2, 65534), s.write_shift(2, 0), s.write_shift(4, 842412599), s.write_shift(16, Te.utils.consts.HEADER_CLSID, "hex"), s.write_shift(4, i ? 2 : 1), s.write_shift(16, r, "hex"), s.write_shift(4, i ? 68 : 48);
  var c = Fa(e, t, n);
  if (o.push(c), i) {
    var f = Fa(i, null, null);
    s.write_shift(16, a, "hex"), s.write_shift(4, 68 + c.length), o.push(f);
  }
  return Ve(o);
}
function cc(e, r) {
  r || (r = B(e));
  for (var t = 0; t < e; ++t)
    r.write_shift(1, 0);
  return r;
}
function hc(e, r) {
  return e.read_shift(r) === 1;
}
function Ze(e, r) {
  return r || (r = B(2)), r.write_shift(2, +!!e), r;
}
function z0(e) {
  return e.read_shift(2, "u");
}
function pt(e, r) {
  return r || (r = B(2)), r.write_shift(2, e), r;
}
function j0(e, r, t) {
  return t || (t = B(2)), t.write_shift(1, r == "e" ? +e : +!!e), t.write_shift(1, r == "e" ? 1 : 0), t;
}
function K0(e, r, t) {
  var n = e.read_shift(t && t.biff >= 12 ? 2 : 1), i = "sbcs-cont";
  if (t && t.biff >= 8, !t || t.biff == 8) {
    var a = e.read_shift(1);
    a && (i = "dbcs-cont");
  } else
    t.biff == 12 && (i = "wstr");
  t.biff >= 2 && t.biff <= 5 && (i = "cpstr");
  var s = n ? e.read_shift(n, i) : "";
  return s;
}
function uc(e) {
  var r = e.t || "", t = B(3 + 0);
  t.write_shift(2, r.length), t.write_shift(1, 1);
  var n = B(2 * r.length);
  n.write_shift(2 * r.length, r, "utf16le");
  var i = [t, n];
  return Ve(i);
}
function xc(e, r, t) {
  var n;
  if (t) {
    if (t.biff >= 2 && t.biff <= 5)
      return e.read_shift(r, "cpstr");
    if (t.biff >= 12)
      return e.read_shift(r, "dbcs-cont");
  }
  var i = e.read_shift(1);
  return i === 0 ? n = e.read_shift(r, "sbcs-cont") : n = e.read_shift(r, "dbcs-cont"), n;
}
function dc(e, r, t) {
  var n = e.read_shift(t && t.biff == 2 ? 1 : 2);
  return n === 0 ? (e.l++, "") : xc(e, n, t);
}
function pc(e, r, t) {
  if (t.biff > 5)
    return dc(e, r, t);
  var n = e.read_shift(1);
  return n === 0 ? (e.l++, "") : e.read_shift(n, t.biff <= 4 || !e.lens ? "cpstr" : "sbcs-cont");
}
function q0(e, r, t) {
  return t || (t = B(3 + 2 * e.length)), t.write_shift(2, e.length), t.write_shift(1, 1), t.write_shift(31, e, "utf16le"), t;
}
function Da(e, r) {
  r || (r = B(6 + e.length * 2)), r.write_shift(4, 1 + e.length);
  for (var t = 0; t < e.length; ++t)
    r.write_shift(2, e.charCodeAt(t));
  return r.write_shift(2, 0), r;
}
function gc(e) {
  var r = B(512), t = 0, n = e.Target;
  n.slice(0, 7) == "file://" && (n = n.slice(7));
  var i = n.indexOf("#"), a = i > -1 ? 31 : 23;
  switch (n.charAt(0)) {
    case "#":
      a = 28;
      break;
    case ".":
      a &= -3;
      break;
  }
  r.write_shift(4, 2), r.write_shift(4, a);
  var s = [8, 6815827, 6619237, 4849780, 83];
  for (t = 0; t < s.length; ++t)
    r.write_shift(4, s[t]);
  if (a == 28)
    n = n.slice(1), Da(n, r);
  else if (a & 2) {
    for (s = "e0 c9 ea 79 f9 ba ce 11 8c 82 00 aa 00 4b a9 0b".split(" "), t = 0; t < s.length; ++t)
      r.write_shift(1, parseInt(s[t], 16));
    var o = i > -1 ? n.slice(0, i) : n;
    for (r.write_shift(4, 2 * (o.length + 1)), t = 0; t < o.length; ++t)
      r.write_shift(2, o.charCodeAt(t));
    r.write_shift(2, 0), a & 8 && Da(i > -1 ? n.slice(i + 1) : "", r);
  } else {
    for (s = "03 03 00 00 00 00 00 00 c0 00 00 00 00 00 00 46".split(" "), t = 0; t < s.length; ++t)
      r.write_shift(1, parseInt(s[t], 16));
    for (var c = 0; n.slice(c * 3, c * 3 + 3) == "../" || n.slice(c * 3, c * 3 + 3) == "..\\"; )
      ++c;
    for (r.write_shift(2, c), r.write_shift(4, n.length - 3 * c + 1), t = 0; t < n.length - 3 * c; ++t)
      r.write_shift(1, n.charCodeAt(t + 3 * c) & 255);
    for (r.write_shift(1, 0), r.write_shift(2, 65535), r.write_shift(2, 57005), t = 0; t < 6; ++t)
      r.write_shift(4, 0);
  }
  return r.slice(0, r.l);
}
function nr(e, r, t, n) {
  return n || (n = B(6)), n.write_shift(2, e), n.write_shift(2, r), n.write_shift(2, t || 0), n;
}
function vc(e, r, t) {
  var n = t.biff > 8 ? 4 : 2, i = e.read_shift(n), a = e.read_shift(n, "i"), s = e.read_shift(n, "i");
  return [i, a, s];
}
function mc(e) {
  var r = e.read_shift(2), t = e.read_shift(2), n = e.read_shift(2), i = e.read_shift(2);
  return { s: { c: n, r }, e: { c: i, r: t } };
}
function J0(e, r) {
  return r || (r = B(8)), r.write_shift(2, e.s.r), r.write_shift(2, e.e.r), r.write_shift(2, e.s.c), r.write_shift(2, e.e.c), r;
}
function Ci(e, r, t) {
  var n = 1536, i = 16;
  switch (t.bookType) {
    case "biff8":
      break;
    case "biff5":
      n = 1280, i = 8;
      break;
    case "biff4":
      n = 4, i = 6;
      break;
    case "biff3":
      n = 3, i = 6;
      break;
    case "biff2":
      n = 2, i = 4;
      break;
    case "xla":
      break;
    default:
      throw new Error("unsupported BIFF version");
  }
  var a = B(i);
  return a.write_shift(2, n), a.write_shift(2, r), i > 4 && a.write_shift(2, 29282), i > 6 && a.write_shift(2, 1997), i > 8 && (a.write_shift(2, 49161), a.write_shift(2, 1), a.write_shift(2, 1798), a.write_shift(2, 0)), a;
}
function _c(e, r) {
  var t = !r || r.biff == 8, n = B(t ? 112 : 54);
  for (n.write_shift(r.biff == 8 ? 2 : 1, 7), t && n.write_shift(1, 0), n.write_shift(4, 859007059), n.write_shift(4, 5458548 | (t ? 0 : 536870912)); n.l < n.length; )
    n.write_shift(1, t ? 0 : 32);
  return n;
}
function wc(e, r) {
  var t = !r || r.biff >= 8 ? 2 : 1, n = B(8 + t * e.name.length);
  n.write_shift(4, e.pos), n.write_shift(1, e.hs || 0), n.write_shift(1, e.dt), n.write_shift(1, e.name.length), r.biff >= 8 && n.write_shift(1, 1), n.write_shift(t * e.name.length, e.name, r.biff < 8 ? "sbcs" : "utf16le");
  var i = n.slice(0, n.l);
  return i.l = n.l, i;
}
function Tc(e, r) {
  var t = B(8);
  t.write_shift(4, e.Count), t.write_shift(4, e.Unique);
  for (var n = [], i = 0; i < e.length; ++i)
    n[i] = uc(e[i]);
  var a = Ve([t].concat(n));
  return a.parts = [t.length].concat(n.map(function(s) {
    return s.length;
  })), a;
}
function Ec() {
  var e = B(18);
  return e.write_shift(2, 0), e.write_shift(2, 0), e.write_shift(2, 29280), e.write_shift(2, 17600), e.write_shift(2, 56), e.write_shift(2, 0), e.write_shift(2, 0), e.write_shift(2, 1), e.write_shift(2, 500), e;
}
function Sc(e) {
  var r = B(18), t = 1718;
  return e && e.RTL && (t |= 64), r.write_shift(2, t), r.write_shift(4, 0), r.write_shift(4, 64), r.write_shift(4, 0), r.write_shift(4, 0), r;
}
function yc(e, r) {
  var t = e.name || "Arial", n = r && r.biff == 5, i = n ? 15 + t.length : 16 + 2 * t.length, a = B(i);
  return a.write_shift(2, (e.sz || 12) * 20), a.write_shift(4, 0), a.write_shift(2, 400), a.write_shift(4, 0), a.write_shift(2, 0), a.write_shift(1, t.length), n || a.write_shift(1, 1), a.write_shift((n ? 1 : 2) * t.length, t, n ? "sbcs" : "utf16le"), a;
}
function Ac(e, r, t, n) {
  var i = B(10);
  return nr(e, r, n, i), i.write_shift(4, t), i;
}
function Cc(e, r, t, n, i) {
  var a = !i || i.biff == 8, s = B(6 + 2 + +a + (1 + a) * t.length);
  return nr(e, r, n, s), s.write_shift(2, t.length), a && s.write_shift(1, 1), s.write_shift((1 + a) * t.length, t, a ? "utf16le" : "sbcs"), s;
}
function Fc(e, r, t, n) {
  var i = t && t.biff == 5;
  n || (n = B(i ? 3 + r.length : 5 + 2 * r.length)), n.write_shift(2, e), n.write_shift(i ? 1 : 2, r.length), i || n.write_shift(1, 1), n.write_shift((i ? 1 : 2) * r.length, r, i ? "sbcs" : "utf16le");
  var a = n.length > n.l ? n.slice(0, n.l) : n;
  return a.l == null && (a.l = a.length), a;
}
function Oc(e, r) {
  var t = r.biff == 8 || !r.biff ? 4 : 2, n = B(2 * t + 6);
  return n.write_shift(t, e.s.r), n.write_shift(t, e.e.r + 1), n.write_shift(2, e.s.c), n.write_shift(2, e.e.c + 1), n.write_shift(2, 0), n;
}
function Ia(e, r, t, n) {
  var i = t && t.biff == 5;
  n || (n = B(i ? 16 : 20)), n.write_shift(2, 0), e.style ? (n.write_shift(2, e.numFmtId || 0), n.write_shift(2, 65524)) : (n.write_shift(2, e.numFmtId || 0), n.write_shift(2, r << 4));
  var a = 0;
  return e.numFmtId > 0 && i && (a |= 1024), n.write_shift(4, a), n.write_shift(4, 0), i || n.write_shift(4, 0), n.write_shift(2, 0), n;
}
function Dc(e) {
  var r = B(8);
  return r.write_shift(4, 0), r.write_shift(2, e[0] ? e[0] + 1 : 0), r.write_shift(2, e[1] ? e[1] + 1 : 0), r;
}
function Ic(e, r, t, n, i, a) {
  var s = B(8);
  return nr(e, r, n, s), j0(t, a, s), s;
}
function kc(e, r, t, n) {
  var i = B(14);
  return nr(e, r, n, i), rr(t, i), i;
}
function Rc(e, r, t) {
  if (t.biff < 8)
    return Nc(e, r, t);
  for (var n = [], i = e.l + r, a = e.read_shift(t.biff > 8 ? 4 : 2); a-- !== 0; )
    n.push(vc(e, t.biff > 8 ? 12 : 6, t));
  if (e.l != i)
    throw new Error("Bad ExternSheet: " + e.l + " != " + i);
  return n;
}
function Nc(e, r, t) {
  e[e.l + 1] == 3 && e[e.l]++;
  var n = K0(e, r, t);
  return n.charCodeAt(0) == 3 ? n.slice(1) : n;
}
function Lc(e) {
  var r = B(2 + e.length * 8);
  r.write_shift(2, e.length);
  for (var t = 0; t < e.length; ++t)
    J0(e[t], r);
  return r;
}
function Pc(e) {
  var r = B(24), t = be(e[0]);
  r.write_shift(2, t.r), r.write_shift(2, t.r), r.write_shift(2, t.c), r.write_shift(2, t.c);
  for (var n = "d0 c9 ea 79 f9 ba ce 11 8c 82 00 aa 00 4b a9 0b".split(" "), i = 0; i < 16; ++i)
    r.write_shift(1, parseInt(n[i], 16));
  return Ve([r, gc(e[1])]);
}
function Mc(e) {
  var r = e[1].Tooltip, t = B(10 + 2 * (r.length + 1));
  t.write_shift(2, 2048);
  var n = be(e[0]);
  t.write_shift(2, n.r), t.write_shift(2, n.r), t.write_shift(2, n.c), t.write_shift(2, n.c);
  for (var i = 0; i < r.length; ++i)
    t.write_shift(2, r.charCodeAt(i));
  return t.write_shift(2, 0), t;
}
function Bc(e) {
  return e || (e = B(4)), e.write_shift(2, 1), e.write_shift(2, 1), e;
}
function bc(e, r, t) {
  if (!t.cellStyles)
    return Ct(e, r);
  var n = t && t.biff >= 12 ? 4 : 2, i = e.read_shift(n), a = e.read_shift(n), s = e.read_shift(n), o = e.read_shift(n), c = e.read_shift(2);
  n == 2 && (e.l += 2);
  var f = { s: i, e: a, w: s, ixfe: o, flags: c };
  return (t.biff >= 5 || !t.biff) && (f.level = c >> 8 & 7), f;
}
function Uc(e, r) {
  var t = B(12);
  t.write_shift(2, r), t.write_shift(2, r), t.write_shift(2, e.width * 256), t.write_shift(2, 0);
  var n = 0;
  return e.hidden && (n |= 1), t.write_shift(1, n), n = e.level || 0, t.write_shift(1, n), t.write_shift(2, 0), t;
}
function Hc(e) {
  for (var r = B(2 * e), t = 0; t < e; ++t)
    r.write_shift(2, t + 1);
  return r;
}
function Wc(e, r, t) {
  var n = B(15);
  return qr(n, e, r), n.write_shift(8, t, "f"), n;
}
function Xc(e, r, t) {
  var n = B(9);
  return qr(n, e, r), n.write_shift(2, t), n;
}
var Vc = /* @__PURE__ */ function() {
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
  }, r = pi({
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
  function t(o, c) {
    var f = [], l = tr(1);
    switch (c.type) {
      case "base64":
        l = wt(Mt(o));
        break;
      case "binary":
        l = wt(o);
        break;
      case "buffer":
      case "array":
        l = o;
        break;
    }
    ft(l, 0);
    var h = l.read_shift(1), x = !!(h & 136), d = !1, v = !1;
    switch (h) {
      case 2:
        break;
      case 3:
        break;
      case 48:
        d = !0, x = !0;
        break;
      case 49:
        d = !0, x = !0;
        break;
      case 131:
        break;
      case 139:
        break;
      case 140:
        v = !0;
        break;
      case 245:
        break;
      default:
        throw new Error("DBF Unsupported Version: " + h.toString(16));
    }
    var u = 0, g = 521;
    h == 2 && (u = l.read_shift(2)), l.l += 3, h != 2 && (u = l.read_shift(4)), u > 1048576 && (u = 1e6), h != 2 && (g = l.read_shift(2));
    var S = l.read_shift(2), A = c.codepage || 1252;
    h != 2 && (l.l += 16, l.read_shift(1), l[l.l] !== 0 && (A = e[l[l.l]]), l.l += 1, l.l += 2), v && (l.l += 36);
    for (var C = [], I = {}, Y = Math.min(l.length, h == 2 ? 521 : g - 10 - (d ? 264 : 0)), Q = v ? 32 : 11; l.l < Y && l[l.l] != 13; )
      switch (I = {}, I.name = Jt.utils.decode(A, l.slice(l.l, l.l + Q)).replace(/[\u0000\r\n].*$/g, ""), l.l += Q, I.type = String.fromCharCode(l.read_shift(1)), h != 2 && !v && (I.offset = l.read_shift(4)), I.len = l.read_shift(1), h == 2 && (I.offset = l.read_shift(2)), I.dec = l.read_shift(1), I.name.length && C.push(I), h != 2 && (l.l += v ? 13 : 14), I.type) {
        case "B":
          (!d || I.len != 8) && c.WTF && console.log("Skipping " + I.name + ":" + I.type);
          break;
        case "G":
        case "P":
          c.WTF && console.log("Skipping " + I.name + ":" + I.type);
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
          throw new Error("Unknown Field Type: " + I.type);
      }
    if (l[l.l] !== 13 && (l.l = g - 1), l.read_shift(1) !== 13)
      throw new Error("DBF Terminator not found " + l.l + " " + l[l.l]);
    l.l = g;
    var D = 0, H = 0;
    for (f[0] = [], H = 0; H != C.length; ++H)
      f[0][H] = C[H].name;
    for (; u-- > 0; ) {
      if (l[l.l] === 42) {
        l.l += S;
        continue;
      }
      for (++l.l, f[++D] = [], H = 0, H = 0; H != C.length; ++H) {
        var M = l.slice(l.l, l.l + C[H].len);
        l.l += C[H].len, ft(M, 0);
        var V = Jt.utils.decode(A, M);
        switch (C[H].type) {
          case "C":
            V.trim().length && (f[D][H] = V.replace(/\s+$/, ""));
            break;
          case "D":
            V.length === 8 ? f[D][H] = new Date(+V.slice(0, 4), +V.slice(4, 6) - 1, +V.slice(6, 8)) : f[D][H] = V;
            break;
          case "F":
            f[D][H] = parseFloat(V.trim());
            break;
          case "+":
          case "I":
            f[D][H] = v ? M.read_shift(-4, "i") ^ 2147483648 : M.read_shift(4, "i");
            break;
          case "L":
            switch (V.trim().toUpperCase()) {
              case "Y":
              case "T":
                f[D][H] = !0;
                break;
              case "N":
              case "F":
                f[D][H] = !1;
                break;
              case "":
              case "?":
                break;
              default:
                throw new Error("DBF Unrecognized L:|" + V + "|");
            }
            break;
          case "M":
            if (!x)
              throw new Error("DBF Unexpected MEMO for type " + h.toString(16));
            f[D][H] = "##MEMO##" + (v ? parseInt(V.trim(), 10) : M.read_shift(4));
            break;
          case "N":
            V = V.replace(/\u0000/g, "").trim(), V && V != "." && (f[D][H] = +V || 0);
            break;
          case "@":
            f[D][H] = new Date(M.read_shift(-8, "f") - 621356832e5);
            break;
          case "T":
            f[D][H] = new Date((M.read_shift(4) - 2440588) * 864e5 + M.read_shift(4));
            break;
          case "Y":
            f[D][H] = M.read_shift(4, "i") / 1e4 + M.read_shift(4, "i") / 1e4 * Math.pow(2, 32);
            break;
          case "O":
            f[D][H] = -M.read_shift(-8, "f");
            break;
          case "B":
            if (d && C[H].len == 8) {
              f[D][H] = M.read_shift(8, "f");
              break;
            }
          case "G":
          case "P":
            M.l += C[H].len;
            break;
          case "0":
            if (C[H].name === "_NullFlags")
              break;
          default:
            throw new Error("DBF Unsupported data type " + C[H].type);
        }
      }
    }
    if (h != 2 && l.l < l.length && l[l.l++] != 26)
      throw new Error("DBF EOF Marker missing " + (l.l - 1) + " of " + l.length + " " + l[l.l - 1].toString(16));
    return c && c.sheetRows && (f = f.slice(0, c.sheetRows)), c.DBF = C, f;
  }
  function n(o, c) {
    var f = c || {};
    f.dateNF || (f.dateNF = "yyyymmdd");
    var l = Sr(t(o, f), f);
    return l["!cols"] = f.DBF.map(function(h) {
      return {
        wch: h.len,
        DBF: h
      };
    }), delete f.DBF, l;
  }
  function i(o, c) {
    try {
      return ir(n(o, c), c);
    } catch (f) {
      if (c && c.WTF)
        throw f;
    }
    return { SheetNames: [], Sheets: {} };
  }
  var a = { B: 8, C: 250, L: 1, D: 8, "?": 0, "": 0 };
  function s(o, c) {
    var f = c || {};
    if (+f.codepage >= 0 && br(+f.codepage), f.type == "string")
      throw new Error("Cannot write DBF to JS string");
    var l = nt(), h = Dn(o, { header: 1, raw: !0, cellDates: !0 }), x = h[0], d = h.slice(1), v = o["!cols"] || [], u = 0, g = 0, S = 0, A = 1;
    for (u = 0; u < x.length; ++u) {
      if (((v[u] || {}).DBF || {}).name) {
        x[u] = v[u].DBF.name, ++S;
        continue;
      }
      if (x[u] != null) {
        if (++S, typeof x[u] == "number" && (x[u] = x[u].toString(10)), typeof x[u] != "string")
          throw new Error("DBF Invalid column name " + x[u] + " |" + typeof x[u] + "|");
        if (x.indexOf(x[u]) !== u) {
          for (g = 0; g < 1024; ++g)
            if (x.indexOf(x[u] + "_" + g) == -1) {
              x[u] += "_" + g;
              break;
            }
        }
      }
    }
    var C = Se(o["!ref"]), I = [], Y = [], Q = [];
    for (u = 0; u <= C.e.c - C.s.c; ++u) {
      var D = "", H = "", M = 0, V = [];
      for (g = 0; g < d.length; ++g)
        d[g][u] != null && V.push(d[g][u]);
      if (V.length == 0 || x[u] == null) {
        I[u] = "?";
        continue;
      }
      for (g = 0; g < V.length; ++g) {
        switch (typeof V[g]) {
          case "number":
            H = "B";
            break;
          case "string":
            H = "C";
            break;
          case "boolean":
            H = "L";
            break;
          case "object":
            H = V[g] instanceof Date ? "D" : "C";
            break;
          default:
            H = "C";
        }
        M = Math.max(M, String(V[g]).length), D = D && D != H ? "C" : H;
      }
      M > 250 && (M = 250), H = ((v[u] || {}).DBF || {}).type, H == "C" && v[u].DBF.len > M && (M = v[u].DBF.len), D == "B" && H == "N" && (D = "N", Q[u] = v[u].DBF.dec, M = v[u].DBF.len), Y[u] = D == "C" || H == "N" ? M : a[D] || 0, A += Y[u], I[u] = D;
    }
    var G = l.next(32);
    for (G.write_shift(4, 318902576), G.write_shift(4, d.length), G.write_shift(2, 296 + 32 * S), G.write_shift(2, A), u = 0; u < 4; ++u)
      G.write_shift(4, 0);
    for (G.write_shift(4, 0 | (+r[Qa] || 3) << 8), u = 0, g = 0; u < x.length; ++u)
      if (x[u] != null) {
        var j = l.next(32), re = (x[u].slice(-10) + "\0\0\0\0\0\0\0\0\0\0\0").slice(0, 11);
        j.write_shift(1, re, "sbcs"), j.write_shift(1, I[u] == "?" ? "C" : I[u], "sbcs"), j.write_shift(4, g), j.write_shift(1, Y[u] || a[I[u]] || 0), j.write_shift(1, Q[u] || 0), j.write_shift(1, 2), j.write_shift(4, 0), j.write_shift(1, 0), j.write_shift(4, 0), j.write_shift(4, 0), g += Y[u] || a[I[u]] || 0;
      }
    var we = l.next(264);
    for (we.write_shift(4, 13), u = 0; u < 65; ++u)
      we.write_shift(4, 0);
    for (u = 0; u < d.length; ++u) {
      var le = l.next(A);
      for (le.write_shift(1, 0), g = 0; g < x.length; ++g)
        if (x[g] != null)
          switch (I[g]) {
            case "L":
              le.write_shift(1, d[u][g] == null ? 63 : d[u][g] ? 84 : 70);
              break;
            case "B":
              le.write_shift(8, d[u][g] || 0, "f");
              break;
            case "N":
              var He = "0";
              for (typeof d[u][g] == "number" && (He = d[u][g].toFixed(Q[g] || 0)), S = 0; S < Y[g] - He.length; ++S)
                le.write_shift(1, 32);
              le.write_shift(1, He, "sbcs");
              break;
            case "D":
              d[u][g] ? (le.write_shift(4, ("0000" + d[u][g].getFullYear()).slice(-4), "sbcs"), le.write_shift(2, ("00" + (d[u][g].getMonth() + 1)).slice(-2), "sbcs"), le.write_shift(2, ("00" + d[u][g].getDate()).slice(-2), "sbcs")) : le.write_shift(8, "00000000", "sbcs");
              break;
            case "C":
              var De = String(d[u][g] != null ? d[u][g] : "").slice(0, Y[g]);
              for (le.write_shift(1, De, "sbcs"), S = 0; S < Y[g] - De.length; ++S)
                le.write_shift(1, 32);
              break;
          }
    }
    return l.next(1).write_shift(1, 26), l.end();
  }
  return {
    to_workbook: i,
    to_sheet: n,
    from_sheet: s
  };
}(), Yc = /* @__PURE__ */ function() {
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
  }, r = new RegExp("\x1BN(" + $e(e).join("|").replace(/\|\|\|/, "|\\||").replace(/([?()+])/g, "\\$1") + "|\\|)", "gm"), t = function(x, d) {
    var v = e[d];
    return typeof v == "number" ? ea(v) : v;
  }, n = function(x, d, v) {
    var u = d.charCodeAt(0) - 32 << 4 | v.charCodeAt(0) - 48;
    return u == 59 ? x : ea(u);
  };
  e["|"] = 254;
  function i(x, d) {
    switch (d.type) {
      case "base64":
        return a(Mt(x), d);
      case "binary":
        return a(x, d);
      case "buffer":
        return a(de && Buffer.isBuffer(x) ? x.toString("binary") : Gr(x), d);
      case "array":
        return a(Mn(x), d);
    }
    throw new Error("Unrecognized type " + d.type);
  }
  function a(x, d) {
    var v = x.split(/[\n\r]+/), u = -1, g = -1, S = 0, A = 0, C = [], I = [], Y = null, Q = {}, D = [], H = [], M = [], V = 0, G;
    for (+d.codepage >= 0 && br(+d.codepage); S !== v.length; ++S) {
      V = 0;
      var j = v[S].trim().replace(/\x1B([\x20-\x2F])([\x30-\x3F])/g, n).replace(r, t), re = j.replace(/;;/g, "\0").split(";").map(function(F) {
        return F.replace(/\u0000/g, ";");
      }), we = re[0], le;
      if (j.length > 0)
        switch (we) {
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
            re[1].charAt(0) == "P" && I.push(j.slice(3).replace(/;;/g, ";"));
            break;
          case "C":
            var He = !1, De = !1, vt = !1, Me = !1, ut = -1, st = -1;
            for (A = 1; A < re.length; ++A)
              switch (re[A].charAt(0)) {
                case "A":
                  break;
                case "X":
                  g = parseInt(re[A].slice(1)) - 1, De = !0;
                  break;
                case "Y":
                  for (u = parseInt(re[A].slice(1)) - 1, De || (g = 0), G = C.length; G <= u; ++G)
                    C[G] = [];
                  break;
                case "K":
                  le = re[A].slice(1), le.charAt(0) === '"' ? le = le.slice(1, le.length - 1) : le === "TRUE" ? le = !0 : le === "FALSE" ? le = !1 : isNaN(Lt(le)) ? isNaN(Hr(le).getDate()) || (le = et(le)) : (le = Lt(le), Y !== null && h0(Y) && (le = p0(le))), He = !0;
                  break;
                case "E":
                  Me = !0;
                  var y = Xh(re[A].slice(1), { r: u, c: g });
                  C[u][g] = [C[u][g], y];
                  break;
                case "S":
                  vt = !0, C[u][g] = [C[u][g], "S5S"];
                  break;
                case "G":
                  break;
                case "R":
                  ut = parseInt(re[A].slice(1)) - 1;
                  break;
                case "C":
                  st = parseInt(re[A].slice(1)) - 1;
                  break;
                default:
                  if (d && d.WTF)
                    throw new Error("SYLK bad record " + j);
              }
            if (He && (C[u][g] && C[u][g].length == 2 ? C[u][g][0] = le : C[u][g] = le, Y = null), vt) {
              if (Me)
                throw new Error("SYLK shared formula cannot have own formula");
              var P = ut > -1 && C[ut][st];
              if (!P || !P[1])
                throw new Error("SYLK shared formula cannot find base");
              C[u][g][1] = Vh(P[1], { r: u - ut, c: g - st });
            }
            break;
          case "F":
            var O = 0;
            for (A = 1; A < re.length; ++A)
              switch (re[A].charAt(0)) {
                case "X":
                  g = parseInt(re[A].slice(1)) - 1, ++O;
                  break;
                case "Y":
                  for (u = parseInt(re[A].slice(1)) - 1, G = C.length; G <= u; ++G)
                    C[G] = [];
                  break;
                case "M":
                  V = parseInt(re[A].slice(1)) / 20;
                  break;
                case "F":
                  break;
                case "G":
                  break;
                case "P":
                  Y = I[parseInt(re[A].slice(1))];
                  break;
                case "S":
                  break;
                case "D":
                  break;
                case "N":
                  break;
                case "W":
                  for (M = re[A].slice(1).split(" "), G = parseInt(M[0], 10); G <= parseInt(M[1], 10); ++G)
                    V = parseInt(M[2], 10), H[G - 1] = V === 0 ? { hidden: !0 } : { wch: V }, Fi(H[G - 1]);
                  break;
                case "C":
                  g = parseInt(re[A].slice(1)) - 1, H[g] || (H[g] = {});
                  break;
                case "R":
                  u = parseInt(re[A].slice(1)) - 1, D[u] || (D[u] = {}), V > 0 ? (D[u].hpt = V, D[u].hpx = rs(V)) : V === 0 && (D[u].hidden = !0);
                  break;
                default:
                  if (d && d.WTF)
                    throw new Error("SYLK bad record " + j);
              }
            O < 1 && (Y = null);
            break;
          default:
            if (d && d.WTF)
              throw new Error("SYLK bad record " + j);
        }
    }
    return D.length > 0 && (Q["!rows"] = D), H.length > 0 && (Q["!cols"] = H), d && d.sheetRows && (C = C.slice(0, d.sheetRows)), [C, Q];
  }
  function s(x, d) {
    var v = i(x, d), u = v[0], g = v[1], S = Sr(u, d);
    return $e(g).forEach(function(A) {
      S[A] = g[A];
    }), S;
  }
  function o(x, d) {
    return ir(s(x, d), d);
  }
  function c(x, d, v, u) {
    var g = "C;Y" + (v + 1) + ";X" + (u + 1) + ";K";
    switch (x.t) {
      case "n":
        g += x.v || 0, x.f && !x.F && (g += ";E" + Di(x.f, { r: v, c: u }));
        break;
      case "b":
        g += x.v ? "TRUE" : "FALSE";
        break;
      case "e":
        g += x.w || x.v;
        break;
      case "d":
        g += '"' + (x.w || x.v) + '"';
        break;
      case "s":
        g += '"' + x.v.replace(/"/g, "").replace(/;/g, ";;") + '"';
        break;
    }
    return g;
  }
  function f(x, d) {
    d.forEach(function(v, u) {
      var g = "F;W" + (u + 1) + " " + (u + 1) + " ";
      v.hidden ? g += "0" : (typeof v.width == "number" && !v.wpx && (v.wpx = An(v.width)), typeof v.wpx == "number" && !v.wch && (v.wch = Cn(v.wpx)), typeof v.wch == "number" && (g += Math.round(v.wch))), g.charAt(g.length - 1) != " " && x.push(g);
    });
  }
  function l(x, d) {
    d.forEach(function(v, u) {
      var g = "F;";
      v.hidden ? g += "M0;" : v.hpt ? g += "M" + 20 * v.hpt + ";" : v.hpx && (g += "M" + 20 * Fn(v.hpx) + ";"), g.length > 2 && x.push(g + "R" + (u + 1));
    });
  }
  function h(x, d) {
    var v = ["ID;PWXL;N;E"], u = [], g = Se(x["!ref"]), S, A = Array.isArray(x), C = `\r
`;
    v.push("P;PGeneral"), v.push("F;P0;DG0G8;M255"), x["!cols"] && f(v, x["!cols"]), x["!rows"] && l(v, x["!rows"]), v.push("B;Y" + (g.e.r - g.s.r + 1) + ";X" + (g.e.c - g.s.c + 1) + ";D" + [g.s.c, g.s.r, g.e.c, g.e.r].join(" "));
    for (var I = g.s.r; I <= g.e.r; ++I)
      for (var Y = g.s.c; Y <= g.e.c; ++Y) {
        var Q = _e({ r: I, c: Y });
        S = A ? (x[I] || [])[Y] : x[Q], !(!S || S.v == null && (!S.f || S.F)) && u.push(c(S, x, I, Y));
      }
    return v.join(C) + C + u.join(C) + C + "E" + C;
  }
  return {
    to_workbook: o,
    to_sheet: s,
    from_sheet: h
  };
}(), Gc = /* @__PURE__ */ function() {
  function e(a, s) {
    switch (s.type) {
      case "base64":
        return r(Mt(a), s);
      case "binary":
        return r(a, s);
      case "buffer":
        return r(de && Buffer.isBuffer(a) ? a.toString("binary") : Gr(a), s);
      case "array":
        return r(Mn(a), s);
    }
    throw new Error("Unrecognized type " + s.type);
  }
  function r(a, s) {
    for (var o = a.split(`
`), c = -1, f = -1, l = 0, h = []; l !== o.length; ++l) {
      if (o[l].trim() === "BOT") {
        h[++c] = [], f = 0;
        continue;
      }
      if (!(c < 0)) {
        var x = o[l].trim().split(","), d = x[0], v = x[1];
        ++l;
        for (var u = o[l] || ""; (u.match(/["]/g) || []).length & 1 && l < o.length - 1; )
          u += `
` + o[++l];
        switch (u = u.trim(), +d) {
          case -1:
            if (u === "BOT") {
              h[++c] = [], f = 0;
              continue;
            } else if (u !== "EOD")
              throw new Error("Unrecognized DIF special command " + u);
            break;
          case 0:
            u === "TRUE" ? h[c][f] = !0 : u === "FALSE" ? h[c][f] = !1 : isNaN(Lt(v)) ? isNaN(Hr(v).getDate()) ? h[c][f] = v : h[c][f] = et(v) : h[c][f] = Lt(v), ++f;
            break;
          case 1:
            u = u.slice(1, u.length - 1), u = u.replace(/""/g, '"'), u && u.match(/^=".*"$/) && (u = u.slice(2, -1)), h[c][f++] = u !== "" ? u : null;
            break;
        }
        if (u === "EOD")
          break;
      }
    }
    return s && s.sheetRows && (h = h.slice(0, s.sheetRows)), h;
  }
  function t(a, s) {
    return Sr(e(a, s), s);
  }
  function n(a, s) {
    return ir(t(a, s), s);
  }
  var i = /* @__PURE__ */ function() {
    var a = function(c, f, l, h, x) {
      c.push(f), c.push(l + "," + h), c.push('"' + x.replace(/"/g, '""') + '"');
    }, s = function(c, f, l, h) {
      c.push(f + "," + l), c.push(f == 1 ? '"' + h.replace(/"/g, '""') + '"' : h);
    };
    return function(c) {
      var f = [], l = Se(c["!ref"]), h, x = Array.isArray(c);
      a(f, "TABLE", 0, 1, "sheetjs"), a(f, "VECTORS", 0, l.e.r - l.s.r + 1, ""), a(f, "TUPLES", 0, l.e.c - l.s.c + 1, ""), a(f, "DATA", 0, 0, "");
      for (var d = l.s.r; d <= l.e.r; ++d) {
        s(f, -1, 0, "BOT");
        for (var v = l.s.c; v <= l.e.c; ++v) {
          var u = _e({ r: d, c: v });
          if (h = x ? (c[d] || [])[v] : c[u], !h) {
            s(f, 1, 0, "");
            continue;
          }
          switch (h.t) {
            case "n":
              var g = h.w;
              !g && h.v != null && (g = h.v), g == null ? h.f && !h.F ? s(f, 1, 0, "=" + h.f) : s(f, 1, 0, "") : s(f, 0, g, "V");
              break;
            case "b":
              s(f, 0, h.v ? 1 : 0, h.v ? "TRUE" : "FALSE");
              break;
            case "s":
              s(f, 1, 0, isNaN(h.v) ? h.v : '="' + h.v + '"');
              break;
            case "d":
              h.w || (h.w = Yt(h.z || Oe[14], it(et(h.v)))), s(f, 0, h.w, "V");
              break;
            default:
              s(f, 1, 0, "");
          }
        }
      }
      s(f, -1, 0, "EOD");
      var S = `\r
`, A = f.join(S);
      return A;
    };
  }();
  return {
    to_workbook: n,
    to_sheet: t,
    from_sheet: i
  };
}(), Z0 = /* @__PURE__ */ function() {
  function e(h) {
    return h.replace(/\\b/g, "\\").replace(/\\c/g, ":").replace(/\\n/g, `
`);
  }
  function r(h) {
    return h.replace(/\\/g, "\\b").replace(/:/g, "\\c").replace(/\n/g, "\\n");
  }
  function t(h, x) {
    for (var d = h.split(`
`), v = -1, u = -1, g = 0, S = []; g !== d.length; ++g) {
      var A = d[g].trim().split(":");
      if (A[0] === "cell") {
        var C = be(A[1]);
        if (S.length <= C.r)
          for (v = S.length; v <= C.r; ++v)
            S[v] || (S[v] = []);
        switch (v = C.r, u = C.c, A[2]) {
          case "t":
            S[v][u] = e(A[3]);
            break;
          case "v":
            S[v][u] = +A[3];
            break;
          case "vtf":
            var I = A[A.length - 1];
          case "vtc":
            switch (A[3]) {
              case "nl":
                S[v][u] = !!+A[4];
                break;
              default:
                S[v][u] = +A[4];
                break;
            }
            A[2] == "vtf" && (S[v][u] = [S[v][u], I]);
        }
      }
    }
    return x && x.sheetRows && (S = S.slice(0, x.sheetRows)), S;
  }
  function n(h, x) {
    return Sr(t(h, x), x);
  }
  function i(h, x) {
    return ir(n(h, x), x);
  }
  var a = [
    "socialcalc:version:1.5",
    "MIME-Version: 1.0",
    "Content-Type: multipart/mixed; boundary=SocialCalcSpreadsheetControlSave"
  ].join(`
`), s = [
    "--SocialCalcSpreadsheetControlSave",
    "Content-type: text/plain; charset=UTF-8"
  ].join(`
`) + `
`, o = [
    "# SocialCalc Spreadsheet Control Save",
    "part:sheet"
  ].join(`
`), c = "--SocialCalcSpreadsheetControlSave--";
  function f(h) {
    if (!h || !h["!ref"])
      return "";
    for (var x = [], d = [], v, u = "", g = ht(h["!ref"]), S = Array.isArray(h), A = g.s.r; A <= g.e.r; ++A)
      for (var C = g.s.c; C <= g.e.c; ++C)
        if (u = _e({ r: A, c: C }), v = S ? (h[A] || [])[C] : h[u], !(!v || v.v == null || v.t === "z")) {
          switch (d = ["cell", u, "t"], v.t) {
            case "s":
            case "str":
              d.push(r(v.v));
              break;
            case "n":
              v.f ? (d[2] = "vtf", d[3] = "n", d[4] = v.v, d[5] = r(v.f)) : (d[2] = "v", d[3] = v.v);
              break;
            case "b":
              d[2] = "vt" + (v.f ? "f" : "c"), d[3] = "nl", d[4] = v.v ? "1" : "0", d[5] = r(v.f || (v.v ? "TRUE" : "FALSE"));
              break;
            case "d":
              var I = it(et(v.v));
              d[2] = "vtc", d[3] = "nd", d[4] = "" + I, d[5] = v.w || Yt(v.z || Oe[14], I);
              break;
            case "e":
              continue;
          }
          x.push(d.join(":"));
        }
    return x.push("sheet:c:" + (g.e.c - g.s.c + 1) + ":r:" + (g.e.r - g.s.r + 1) + ":tvf:1"), x.push("valueformat:1:text-wiki"), x.join(`
`);
  }
  function l(h) {
    return [a, s, o, s, f(h), c].join(`
`);
  }
  return {
    to_workbook: i,
    to_sheet: n,
    from_sheet: l
  };
}(), $c = /* @__PURE__ */ function() {
  function e(l, h, x, d, v) {
    v.raw ? h[x][d] = l : l === "" || (l === "TRUE" ? h[x][d] = !0 : l === "FALSE" ? h[x][d] = !1 : isNaN(Lt(l)) ? isNaN(Hr(l).getDate()) ? h[x][d] = l : h[x][d] = et(l) : h[x][d] = Lt(l));
  }
  function r(l, h) {
    var x = h || {}, d = [];
    if (!l || l.length === 0)
      return d;
    for (var v = l.split(/[\r\n]/), u = v.length - 1; u >= 0 && v[u].length === 0; )
      --u;
    for (var g = 10, S = 0, A = 0; A <= u; ++A)
      S = v[A].indexOf(" "), S == -1 ? S = v[A].length : S++, g = Math.max(g, S);
    for (A = 0; A <= u; ++A) {
      d[A] = [];
      var C = 0;
      for (e(v[A].slice(0, g).trim(), d, A, C, x), C = 1; C <= (v[A].length - g) / 10 + 1; ++C)
        e(v[A].slice(g + (C - 1) * 10, g + C * 10).trim(), d, A, C, x);
    }
    return x.sheetRows && (d = d.slice(0, x.sheetRows)), d;
  }
  var t = {
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
  function i(l) {
    for (var h = {}, x = !1, d = 0, v = 0; d < l.length; ++d)
      (v = l.charCodeAt(d)) == 34 ? x = !x : !x && v in t && (h[v] = (h[v] || 0) + 1);
    v = [];
    for (d in h)
      Object.prototype.hasOwnProperty.call(h, d) && v.push([h[d], d]);
    if (!v.length) {
      h = n;
      for (d in h)
        Object.prototype.hasOwnProperty.call(h, d) && v.push([h[d], d]);
    }
    return v.sort(function(u, g) {
      return u[0] - g[0] || n[u[1]] - n[g[1]];
    }), t[v.pop()[1]] || 44;
  }
  function a(l, h) {
    var x = h || {}, d = "", v = x.dense ? [] : {}, u = { s: { c: 0, r: 0 }, e: { c: 0, r: 0 } };
    l.slice(0, 4) == "sep=" ? l.charCodeAt(5) == 13 && l.charCodeAt(6) == 10 ? (d = l.charAt(4), l = l.slice(7)) : l.charCodeAt(5) == 13 || l.charCodeAt(5) == 10 ? (d = l.charAt(4), l = l.slice(6)) : d = i(l.slice(0, 1024)) : x && x.FS ? d = x.FS : d = i(l.slice(0, 1024));
    var g = 0, S = 0, A = 0, C = 0, I = 0, Y = d.charCodeAt(0), Q = !1, D = 0, H = l.charCodeAt(0);
    l = l.replace(/\r\n/mg, `
`);
    var M = x.dateNF != null ? fl(x.dateNF) : null;
    function V() {
      var G = l.slice(C, I), j = {};
      if (G.charAt(0) == '"' && G.charAt(G.length - 1) == '"' && (G = G.slice(1, -1).replace(/""/g, '"')), G.length === 0)
        j.t = "z";
      else if (x.raw)
        j.t = "s", j.v = G;
      else if (G.trim().length === 0)
        j.t = "s", j.v = G;
      else if (G.charCodeAt(0) == 61)
        G.charCodeAt(1) == 34 && G.charCodeAt(G.length - 1) == 34 ? (j.t = "s", j.v = G.slice(2, -1).replace(/""/g, '"')) : Yh(G) ? (j.t = "n", j.f = G.slice(1)) : (j.t = "s", j.v = G);
      else if (G == "TRUE")
        j.t = "b", j.v = !0;
      else if (G == "FALSE")
        j.t = "b", j.v = !1;
      else if (!isNaN(A = Lt(G)))
        j.t = "n", x.cellText !== !1 && (j.w = G), j.v = A;
      else if (!isNaN(Hr(G).getDate()) || M && G.match(M)) {
        j.z = x.dateNF || Oe[14];
        var re = 0;
        M && G.match(M) && (G = ll(G, x.dateNF, G.match(M) || []), re = 1), x.cellDates ? (j.t = "d", j.v = et(G, re)) : (j.t = "n", j.v = it(et(G, re))), x.cellText !== !1 && (j.w = Yt(j.z, j.v instanceof Date ? it(j.v) : j.v)), x.cellNF || delete j.z;
      } else
        j.t = "s", j.v = G;
      if (j.t == "z" || (x.dense ? (v[g] || (v[g] = []), v[g][S] = j) : v[_e({ c: S, r: g })] = j), C = I + 1, H = l.charCodeAt(C), u.e.c < S && (u.e.c = S), u.e.r < g && (u.e.r = g), D == Y)
        ++S;
      else if (S = 0, ++g, x.sheetRows && x.sheetRows <= g)
        return !0;
    }
    e:
      for (; I < l.length; ++I)
        switch (D = l.charCodeAt(I)) {
          case 34:
            H === 34 && (Q = !Q);
            break;
          case Y:
          case 10:
          case 13:
            if (!Q && V())
              break e;
            break;
        }
    return I - C > 0 && V(), v["!ref"] = ke(u), v;
  }
  function s(l, h) {
    return !(h && h.PRN) || h.FS || l.slice(0, 4) == "sep=" || l.indexOf("	") >= 0 || l.indexOf(",") >= 0 || l.indexOf(";") >= 0 ? a(l, h) : Sr(r(l, h), h);
  }
  function o(l, h) {
    var x = "", d = h.type == "string" ? [0, 0, 0, 0] : ip(l, h);
    switch (h.type) {
      case "base64":
        x = Mt(l);
        break;
      case "binary":
        x = l;
        break;
      case "buffer":
        h.codepage == 65001 ? x = l.toString("utf8") : h.codepage && typeof Jt < "u" ? x = Jt.utils.decode(h.codepage, l) : x = de && Buffer.isBuffer(l) ? l.toString("binary") : Gr(l);
        break;
      case "array":
        x = Mn(l);
        break;
      case "string":
        x = l;
        break;
      default:
        throw new Error("Unrecognized type " + h.type);
    }
    return d[0] == 239 && d[1] == 187 && d[2] == 191 ? x = Nr(x.slice(3)) : h.type != "string" && h.type != "buffer" && h.codepage == 65001 ? x = Nr(x) : h.type == "binary" && typeof Jt < "u" && h.codepage && (x = Jt.utils.decode(h.codepage, Jt.utils.encode(28591, x))), x.slice(0, 19) == "socialcalc:version:" ? Z0.to_sheet(h.type == "string" ? x : Nr(x), h) : s(x, h);
  }
  function c(l, h) {
    return ir(o(l, h), h);
  }
  function f(l) {
    for (var h = [], x = Se(l["!ref"]), d, v = Array.isArray(l), u = x.s.r; u <= x.e.r; ++u) {
      for (var g = [], S = x.s.c; S <= x.e.c; ++S) {
        var A = _e({ r: u, c: S });
        if (d = v ? (l[u] || [])[S] : l[A], !d || d.v == null) {
          g.push("          ");
          continue;
        }
        for (var C = (d.w || (Bt(d), d.w) || "").slice(0, 10); C.length < 10; )
          C += " ";
        g.push(C + (S === 0 ? " " : ""));
      }
      h.push(g.join(""));
    }
    return h.join(`
`);
  }
  return {
    to_workbook: c,
    to_sheet: o,
    from_sheet: f
  };
}(), ka = /* @__PURE__ */ function() {
  function e(y, P, O) {
    if (!!y) {
      ft(y, y.l || 0);
      for (var F = O.Enum || ut; y.l < y.length; ) {
        var X = y.read_shift(2), se = F[X] || F[65535], oe = y.read_shift(2), ae = y.l + oe, ee = se.f && se.f(y, oe, O);
        if (y.l = ae, P(ee, se, X))
          return;
      }
    }
  }
  function r(y, P) {
    switch (P.type) {
      case "base64":
        return t(wt(Mt(y)), P);
      case "binary":
        return t(wt(y), P);
      case "buffer":
      case "array":
        return t(y, P);
    }
    throw "Unsupported type " + P.type;
  }
  function t(y, P) {
    if (!y)
      return y;
    var O = P || {}, F = O.dense ? [] : {}, X = "Sheet1", se = "", oe = 0, ae = {}, ee = [], Ee = [], ue = { s: { r: 0, c: 0 }, e: { r: 0, c: 0 } }, qe = O.sheetRows || 0;
    if (y[2] == 0 && (y[3] == 8 || y[3] == 9) && y.length >= 16 && y[14] == 5 && y[15] === 108)
      throw new Error("Unsupported Works 3 for Mac file");
    if (y[2] == 2)
      O.Enum = ut, e(y, function(ie, xt, Ot) {
        switch (Ot) {
          case 0:
            O.vers = ie, ie >= 4096 && (O.qpro = !0);
            break;
          case 6:
            ue = ie;
            break;
          case 204:
            ie && (se = ie);
            break;
          case 222:
            se = ie;
            break;
          case 15:
          case 51:
            O.qpro || (ie[1].v = ie[1].v.slice(1));
          case 13:
          case 14:
          case 16:
            Ot == 14 && (ie[2] & 112) == 112 && (ie[2] & 15) > 1 && (ie[2] & 15) < 15 && (ie[1].z = O.dateNF || Oe[14], O.cellDates && (ie[1].t = "d", ie[1].v = p0(ie[1].v))), O.qpro && ie[3] > oe && (F["!ref"] = ke(ue), ae[X] = F, ee.push(X), F = O.dense ? [] : {}, ue = { s: { r: 0, c: 0 }, e: { r: 0, c: 0 } }, oe = ie[3], X = se || "Sheet" + (oe + 1), se = "");
            var jt = O.dense ? (F[ie[0].r] || [])[ie[0].c] : F[_e(ie[0])];
            if (jt) {
              jt.t = ie[1].t, jt.v = ie[1].v, ie[1].z != null && (jt.z = ie[1].z), ie[1].f != null && (jt.f = ie[1].f);
              break;
            }
            O.dense ? (F[ie[0].r] || (F[ie[0].r] = []), F[ie[0].r][ie[0].c] = ie[1]) : F[_e(ie[0])] = ie[1];
            break;
        }
      }, O);
    else if (y[2] == 26 || y[2] == 14)
      O.Enum = st, y[2] == 14 && (O.qpro = !0, y.l = 0), e(y, function(ie, xt, Ot) {
        switch (Ot) {
          case 204:
            X = ie;
            break;
          case 22:
            ie[1].v = ie[1].v.slice(1);
          case 23:
          case 24:
          case 25:
          case 37:
          case 39:
          case 40:
            if (ie[3] > oe && (F["!ref"] = ke(ue), ae[X] = F, ee.push(X), F = O.dense ? [] : {}, ue = { s: { r: 0, c: 0 }, e: { r: 0, c: 0 } }, oe = ie[3], X = "Sheet" + (oe + 1)), qe > 0 && ie[0].r >= qe)
              break;
            O.dense ? (F[ie[0].r] || (F[ie[0].r] = []), F[ie[0].r][ie[0].c] = ie[1]) : F[_e(ie[0])] = ie[1], ue.e.c < ie[0].c && (ue.e.c = ie[0].c), ue.e.r < ie[0].r && (ue.e.r = ie[0].r);
            break;
          case 27:
            ie[14e3] && (Ee[ie[14e3][0]] = ie[14e3][1]);
            break;
          case 1537:
            Ee[ie[0]] = ie[1], ie[0] == oe && (X = ie[1]);
            break;
        }
      }, O);
    else
      throw new Error("Unrecognized LOTUS BOF " + y[2]);
    if (F["!ref"] = ke(ue), ae[se || X] = F, ee.push(se || X), !Ee.length)
      return { SheetNames: ee, Sheets: ae };
    for (var pe = {}, Ft = [], Ce = 0; Ce < Ee.length; ++Ce)
      ae[ee[Ce]] ? (Ft.push(Ee[Ce] || ee[Ce]), pe[Ee[Ce]] = ae[Ee[Ce]] || ae[ee[Ce]]) : (Ft.push(Ee[Ce]), pe[Ee[Ce]] = { "!ref": "A1" });
    return { SheetNames: Ft, Sheets: pe };
  }
  function n(y, P) {
    var O = P || {};
    if (+O.codepage >= 0 && br(+O.codepage), O.type == "string")
      throw new Error("Cannot write WK1 to JS string");
    var F = nt(), X = Se(y["!ref"]), se = Array.isArray(y), oe = [];
    J(F, 0, a(1030)), J(F, 6, c(X));
    for (var ae = Math.min(X.e.r, 8191), ee = X.s.r; ee <= ae; ++ee)
      for (var Ee = Ge(ee), ue = X.s.c; ue <= X.e.c; ++ue) {
        ee === X.s.r && (oe[ue] = je(ue));
        var qe = oe[ue] + Ee, pe = se ? (y[ee] || [])[ue] : y[qe];
        if (!(!pe || pe.t == "z"))
          if (pe.t == "n")
            (pe.v | 0) == pe.v && pe.v >= -32768 && pe.v <= 32767 ? J(F, 13, d(ee, ue, pe.v)) : J(F, 14, u(ee, ue, pe.v));
          else {
            var Ft = Bt(pe);
            J(F, 15, h(ee, ue, Ft.slice(0, 239)));
          }
      }
    return J(F, 1), F.end();
  }
  function i(y, P) {
    var O = P || {};
    if (+O.codepage >= 0 && br(+O.codepage), O.type == "string")
      throw new Error("Cannot write WK3 to JS string");
    var F = nt();
    J(F, 0, s(y));
    for (var X = 0, se = 0; X < y.SheetNames.length; ++X)
      (y.Sheets[y.SheetNames[X]] || {})["!ref"] && J(F, 27, Me(y.SheetNames[X], se++));
    var oe = 0;
    for (X = 0; X < y.SheetNames.length; ++X) {
      var ae = y.Sheets[y.SheetNames[X]];
      if (!(!ae || !ae["!ref"])) {
        for (var ee = Se(ae["!ref"]), Ee = Array.isArray(ae), ue = [], qe = Math.min(ee.e.r, 8191), pe = ee.s.r; pe <= qe; ++pe)
          for (var Ft = Ge(pe), Ce = ee.s.c; Ce <= ee.e.c; ++Ce) {
            pe === ee.s.r && (ue[Ce] = je(Ce));
            var ie = ue[Ce] + Ft, xt = Ee ? (ae[pe] || [])[Ce] : ae[ie];
            if (!(!xt || xt.t == "z"))
              if (xt.t == "n")
                J(F, 23, V(pe, Ce, oe, xt.v));
              else {
                var Ot = Bt(xt);
                J(F, 22, D(pe, Ce, oe, Ot.slice(0, 239)));
              }
          }
        ++oe;
      }
    }
    return J(F, 1), F.end();
  }
  function a(y) {
    var P = B(2);
    return P.write_shift(2, y), P;
  }
  function s(y) {
    var P = B(26);
    P.write_shift(2, 4096), P.write_shift(2, 4), P.write_shift(4, 0);
    for (var O = 0, F = 0, X = 0, se = 0; se < y.SheetNames.length; ++se) {
      var oe = y.SheetNames[se], ae = y.Sheets[oe];
      if (!(!ae || !ae["!ref"])) {
        ++X;
        var ee = ht(ae["!ref"]);
        O < ee.e.r && (O = ee.e.r), F < ee.e.c && (F = ee.e.c);
      }
    }
    return O > 8191 && (O = 8191), P.write_shift(2, O), P.write_shift(1, X), P.write_shift(1, F), P.write_shift(2, 0), P.write_shift(2, 0), P.write_shift(1, 1), P.write_shift(1, 2), P.write_shift(4, 0), P.write_shift(4, 0), P;
  }
  function o(y, P, O) {
    var F = { s: { c: 0, r: 0 }, e: { c: 0, r: 0 } };
    return P == 8 && O.qpro ? (F.s.c = y.read_shift(1), y.l++, F.s.r = y.read_shift(2), F.e.c = y.read_shift(1), y.l++, F.e.r = y.read_shift(2), F) : (F.s.c = y.read_shift(2), F.s.r = y.read_shift(2), P == 12 && O.qpro && (y.l += 2), F.e.c = y.read_shift(2), F.e.r = y.read_shift(2), P == 12 && O.qpro && (y.l += 2), F.s.c == 65535 && (F.s.c = F.e.c = F.s.r = F.e.r = 0), F);
  }
  function c(y) {
    var P = B(8);
    return P.write_shift(2, y.s.c), P.write_shift(2, y.s.r), P.write_shift(2, y.e.c), P.write_shift(2, y.e.r), P;
  }
  function f(y, P, O) {
    var F = [{ c: 0, r: 0 }, { t: "n", v: 0 }, 0, 0];
    return O.qpro && O.vers != 20768 ? (F[0].c = y.read_shift(1), F[3] = y.read_shift(1), F[0].r = y.read_shift(2), y.l += 2) : (F[2] = y.read_shift(1), F[0].c = y.read_shift(2), F[0].r = y.read_shift(2)), F;
  }
  function l(y, P, O) {
    var F = y.l + P, X = f(y, P, O);
    if (X[1].t = "s", O.vers == 20768) {
      y.l++;
      var se = y.read_shift(1);
      return X[1].v = y.read_shift(se, "utf8"), X;
    }
    return O.qpro && y.l++, X[1].v = y.read_shift(F - y.l, "cstr"), X;
  }
  function h(y, P, O) {
    var F = B(7 + O.length);
    F.write_shift(1, 255), F.write_shift(2, P), F.write_shift(2, y), F.write_shift(1, 39);
    for (var X = 0; X < F.length; ++X) {
      var se = O.charCodeAt(X);
      F.write_shift(1, se >= 128 ? 95 : se);
    }
    return F.write_shift(1, 0), F;
  }
  function x(y, P, O) {
    var F = f(y, P, O);
    return F[1].v = y.read_shift(2, "i"), F;
  }
  function d(y, P, O) {
    var F = B(7);
    return F.write_shift(1, 255), F.write_shift(2, P), F.write_shift(2, y), F.write_shift(2, O, "i"), F;
  }
  function v(y, P, O) {
    var F = f(y, P, O);
    return F[1].v = y.read_shift(8, "f"), F;
  }
  function u(y, P, O) {
    var F = B(13);
    return F.write_shift(1, 255), F.write_shift(2, P), F.write_shift(2, y), F.write_shift(8, O, "f"), F;
  }
  function g(y, P, O) {
    var F = y.l + P, X = f(y, P, O);
    if (X[1].v = y.read_shift(8, "f"), O.qpro)
      y.l = F;
    else {
      var se = y.read_shift(2);
      I(y.slice(y.l, y.l + se), X), y.l += se;
    }
    return X;
  }
  function S(y, P, O) {
    var F = P & 32768;
    return P &= -32769, P = (F ? y : 0) + (P >= 8192 ? P - 16384 : P), (F ? "" : "$") + (O ? je(P) : Ge(P));
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
  }, C = [
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
  function I(y, P) {
    ft(y, 0);
    for (var O = [], F = 0, X = "", se = "", oe = "", ae = ""; y.l < y.length; ) {
      var ee = y[y.l++];
      switch (ee) {
        case 0:
          O.push(y.read_shift(8, "f"));
          break;
        case 1:
          se = S(P[0].c, y.read_shift(2), !0), X = S(P[0].r, y.read_shift(2), !1), O.push(se + X);
          break;
        case 2:
          {
            var Ee = S(P[0].c, y.read_shift(2), !0), ue = S(P[0].r, y.read_shift(2), !1);
            se = S(P[0].c, y.read_shift(2), !0), X = S(P[0].r, y.read_shift(2), !1), O.push(Ee + ue + ":" + se + X);
          }
          break;
        case 3:
          if (y.l < y.length) {
            console.error("WK1 premature formula end");
            return;
          }
          break;
        case 4:
          O.push("(" + O.pop() + ")");
          break;
        case 5:
          O.push(y.read_shift(2));
          break;
        case 6:
          {
            for (var qe = ""; ee = y[y.l++]; )
              qe += String.fromCharCode(ee);
            O.push('"' + qe.replace(/"/g, '""') + '"');
          }
          break;
        case 8:
          O.push("-" + O.pop());
          break;
        case 23:
          O.push("+" + O.pop());
          break;
        case 22:
          O.push("NOT(" + O.pop() + ")");
          break;
        case 20:
        case 21:
          ae = O.pop(), oe = O.pop(), O.push(["AND", "OR"][ee - 20] + "(" + oe + "," + ae + ")");
          break;
        default:
          if (ee < 32 && C[ee])
            ae = O.pop(), oe = O.pop(), O.push(oe + C[ee] + ae);
          else if (A[ee]) {
            if (F = A[ee][1], F == 69 && (F = y[y.l++]), F > O.length) {
              console.error("WK1 bad formula parse 0x" + ee.toString(16) + ":|" + O.join("|") + "|");
              return;
            }
            var pe = O.slice(-F);
            O.length -= F, O.push(A[ee][0] + "(" + pe.join(",") + ")");
          } else
            return ee <= 7 ? console.error("WK1 invalid opcode " + ee.toString(16)) : ee <= 24 ? console.error("WK1 unsupported op " + ee.toString(16)) : ee <= 30 ? console.error("WK1 invalid opcode " + ee.toString(16)) : ee <= 115 ? console.error("WK1 unsupported function opcode " + ee.toString(16)) : console.error("WK1 unrecognized opcode " + ee.toString(16));
      }
    }
    O.length == 1 ? P[1].f = "" + O[0] : console.error("WK1 bad formula parse |" + O.join("|") + "|");
  }
  function Y(y) {
    var P = [{ c: 0, r: 0 }, { t: "n", v: 0 }, 0];
    return P[0].r = y.read_shift(2), P[3] = y[y.l++], P[0].c = y[y.l++], P;
  }
  function Q(y, P) {
    var O = Y(y);
    return O[1].t = "s", O[1].v = y.read_shift(P - 4, "cstr"), O;
  }
  function D(y, P, O, F) {
    var X = B(6 + F.length);
    X.write_shift(2, y), X.write_shift(1, O), X.write_shift(1, P), X.write_shift(1, 39);
    for (var se = 0; se < F.length; ++se) {
      var oe = F.charCodeAt(se);
      X.write_shift(1, oe >= 128 ? 95 : oe);
    }
    return X.write_shift(1, 0), X;
  }
  function H(y, P) {
    var O = Y(y);
    O[1].v = y.read_shift(2);
    var F = O[1].v >> 1;
    if (O[1].v & 1)
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
    return O[1].v = F, O;
  }
  function M(y, P) {
    var O = Y(y), F = y.read_shift(4), X = y.read_shift(4), se = y.read_shift(2);
    if (se == 65535)
      return F === 0 && X === 3221225472 ? (O[1].t = "e", O[1].v = 15) : F === 0 && X === 3489660928 ? (O[1].t = "e", O[1].v = 42) : O[1].v = 0, O;
    var oe = se & 32768;
    return se = (se & 32767) - 16446, O[1].v = (1 - oe * 2) * (X * Math.pow(2, se + 32) + F * Math.pow(2, se)), O;
  }
  function V(y, P, O, F) {
    var X = B(14);
    if (X.write_shift(2, y), X.write_shift(1, O), X.write_shift(1, P), F == 0)
      return X.write_shift(4, 0), X.write_shift(4, 0), X.write_shift(2, 65535), X;
    var se = 0, oe = 0, ae = 0, ee = 0;
    return F < 0 && (se = 1, F = -F), oe = Math.log2(F) | 0, F /= Math.pow(2, oe - 31), ee = F >>> 0, (ee & 2147483648) == 0 && (F /= 2, ++oe, ee = F >>> 0), F -= ee, ee |= 2147483648, ee >>>= 0, F *= Math.pow(2, 32), ae = F >>> 0, X.write_shift(4, ae), X.write_shift(4, ee), oe += 16383 + (se ? 32768 : 0), X.write_shift(2, oe), X;
  }
  function G(y, P) {
    var O = M(y);
    return y.l += P - 14, O;
  }
  function j(y, P) {
    var O = Y(y), F = y.read_shift(4);
    return O[1].v = F >> 6, O;
  }
  function re(y, P) {
    var O = Y(y), F = y.read_shift(8, "f");
    return O[1].v = F, O;
  }
  function we(y, P) {
    var O = re(y);
    return y.l += P - 10, O;
  }
  function le(y, P) {
    return y[y.l + P - 1] == 0 ? y.read_shift(P, "cstr") : "";
  }
  function He(y, P) {
    var O = y[y.l++];
    O > P - 1 && (O = P - 1);
    for (var F = ""; F.length < O; )
      F += String.fromCharCode(y[y.l++]);
    return F;
  }
  function De(y, P, O) {
    if (!(!O.qpro || P < 21)) {
      var F = y.read_shift(1);
      y.l += 17, y.l += 1, y.l += 2;
      var X = y.read_shift(P - 21, "cstr");
      return [F, X];
    }
  }
  function vt(y, P) {
    for (var O = {}, F = y.l + P; y.l < F; ) {
      var X = y.read_shift(2);
      if (X == 14e3) {
        for (O[X] = [0, ""], O[X][0] = y.read_shift(2); y[y.l]; )
          O[X][1] += String.fromCharCode(y[y.l]), y.l++;
        y.l++;
      }
    }
    return O;
  }
  function Me(y, P) {
    var O = B(5 + y.length);
    O.write_shift(2, 14e3), O.write_shift(2, P);
    for (var F = 0; F < y.length; ++F) {
      var X = y.charCodeAt(F);
      O[O.l++] = X > 127 ? 95 : X;
    }
    return O[O.l++] = 0, O;
  }
  var ut = {
    0: { n: "BOF", f: z0 },
    1: { n: "EOF" },
    2: { n: "CALCMODE" },
    3: { n: "CALCORDER" },
    4: { n: "SPLIT" },
    5: { n: "SYNC" },
    6: { n: "RANGE", f: o },
    7: { n: "WINDOW1" },
    8: { n: "COLW1" },
    9: { n: "WINTWO" },
    10: { n: "COLW2" },
    11: { n: "NAME" },
    12: { n: "BLANK" },
    13: { n: "INTEGER", f: x },
    14: { n: "NUMBER", f: v },
    15: { n: "LABEL", f: l },
    16: { n: "FORMULA", f: g },
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
    51: { n: "STRING", f: l },
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
    204: { n: "SHEETNAMECS", f: le },
    222: { n: "SHEETNAMELP", f: He },
    65535: { n: "" }
  }, st = {
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
    23: { n: "NUMBER17", f: M },
    24: { n: "NUMBER18", f: H },
    25: { n: "FORMULA19", f: G },
    26: { n: "FORMULA1A" },
    27: { n: "XFORMAT", f: vt },
    28: { n: "DTLABELMISC" },
    29: { n: "DTLABELCELL" },
    30: { n: "GRAPHWINDOW" },
    31: { n: "CPA" },
    32: { n: "LPLAUTO" },
    33: { n: "QUERY" },
    34: { n: "HIDDENSHEET" },
    35: { n: "??" },
    37: { n: "NUMBER25", f: j },
    38: { n: "??" },
    39: { n: "NUMBER27", f: re },
    40: { n: "FORMULA28", f: we },
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
    204: { n: "SHEETNAMECS", f: le },
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
    book_to_wk3: i,
    to_workbook: r
  };
}(), zc = /^\s|\s$|[\t\n\r]/;
function Q0(e, r) {
  if (!r.bookSST)
    return "";
  var t = [Re];
  t[t.length] = q("sst", null, {
    xmlns: Er[0],
    count: e.Count,
    uniqueCount: e.Unique
  });
  for (var n = 0; n != e.length; ++n)
    if (e[n] != null) {
      var i = e[n], a = "<si>";
      i.r ? a += i.r : (a += "<t", i.t || (i.t = ""), i.t.match(zc) && (a += ' xml:space="preserve"'), a += ">" + me(i.t) + "</t>"), a += "</si>", t[t.length] = a;
    }
  return t.length > 2 && (t[t.length] = "</sst>", t[1] = t[1].replace("/>", ">")), t.join("");
}
function jc(e) {
  return [e.read_shift(4), e.read_shift(4)];
}
function Kc(e, r) {
  return r || (r = B(8)), r.write_shift(4, e.Count), r.write_shift(4, e.Unique), r;
}
var qc = Hl;
function Jc(e) {
  var r = nt();
  W(r, 159, Kc(e));
  for (var t = 0; t < e.length; ++t)
    W(r, 19, qc(e[t]));
  return W(r, 160), r.end();
}
function Zc(e) {
  for (var r = [], t = e.split(""), n = 0; n < t.length; ++n)
    r[n] = t[n].charCodeAt(0);
  return r;
}
function es(e) {
  var r = 0, t, n = Zc(e), i = n.length + 1, a, s, o, c, f;
  for (t = tr(i), t[0] = n.length, a = 1; a != i; ++a)
    t[a] = n[a - 1];
  for (a = i - 1; a >= 0; --a)
    s = t[a], o = (r & 16384) === 0 ? 0 : 1, c = r << 1 & 32767, f = o | c, r = f ^ s;
  return r ^ 52811;
}
var Qc = /* @__PURE__ */ function() {
  function e(i, a) {
    switch (a.type) {
      case "base64":
        return r(Mt(i), a);
      case "binary":
        return r(i, a);
      case "buffer":
        return r(de && Buffer.isBuffer(i) ? i.toString("binary") : Gr(i), a);
      case "array":
        return r(Mn(i), a);
    }
    throw new Error("Unrecognized type " + a.type);
  }
  function r(i, a) {
    var s = a || {}, o = s.dense ? [] : {}, c = i.match(/\\trowd.*?\\row\b/g);
    if (!c.length)
      throw new Error("RTF missing table");
    var f = { s: { c: 0, r: 0 }, e: { c: 0, r: c.length - 1 } };
    return c.forEach(function(l, h) {
      Array.isArray(o) && (o[h] = []);
      for (var x = /\\\w+\b/g, d = 0, v, u = -1; v = x.exec(l); ) {
        switch (v[0]) {
          case "\\cell":
            var g = l.slice(d, x.lastIndex - v[0].length);
            if (g[0] == " " && (g = g.slice(1)), ++u, g.length) {
              var S = { v: g, t: "s" };
              Array.isArray(o) ? o[h][u] = S : o[_e({ r: h, c: u })] = S;
            }
            break;
        }
        d = x.lastIndex;
      }
      u > f.e.c && (f.e.c = u);
    }), o["!ref"] = ke(f), o;
  }
  function t(i, a) {
    return ir(e(i, a), a);
  }
  function n(i) {
    for (var a = ["{\\rtf1\\ansi"], s = Se(i["!ref"]), o, c = Array.isArray(i), f = s.s.r; f <= s.e.r; ++f) {
      a.push("\\trowd\\trautofit1");
      for (var l = s.s.c; l <= s.e.c; ++l)
        a.push("\\cellx" + (l + 1));
      for (a.push("\\pard\\intbl"), l = s.s.c; l <= s.e.c; ++l) {
        var h = _e({ r: f, c: l });
        o = c ? (i[f] || [])[l] : i[h], !(!o || o.v == null && (!o.f || o.F)) && (a.push(" " + (o.w || (Bt(o), o.w))), a.push("\\cell"));
      }
      a.push("\\pard\\intbl\\row");
    }
    return a.join("") + "}";
  }
  return {
    to_workbook: t,
    to_sheet: e,
    from_sheet: n
  };
}();
function Ra(e) {
  for (var r = 0, t = 1; r != 3; ++r)
    t = t * 256 + (e[r] > 255 ? 255 : e[r] < 0 ? 0 : e[r]);
  return t.toString(16).toUpperCase().slice(1);
}
var eh = 6, Pt = eh;
function An(e) {
  return Math.floor((e + Math.round(128 / Pt) / 256) * Pt);
}
function Cn(e) {
  return Math.floor((e - 5) / Pt * 100 + 0.5) / 100;
}
function si(e) {
  return Math.round((e * Pt + 5) / Pt * 256) / 256;
}
function Fi(e) {
  e.width ? (e.wpx = An(e.width), e.wch = Cn(e.wpx), e.MDW = Pt) : e.wpx ? (e.wch = Cn(e.wpx), e.width = si(e.wch), e.MDW = Pt) : typeof e.wch == "number" && (e.width = si(e.wch), e.wpx = An(e.width), e.MDW = Pt), e.customWidth && delete e.customWidth;
}
var th = 96, ts = th;
function Fn(e) {
  return e * 96 / ts;
}
function rs(e) {
  return e * ts / 96;
}
function rh(e) {
  var r = ["<numFmts>"];
  return [[5, 8], [23, 26], [41, 44], [50, 392]].forEach(function(t) {
    for (var n = t[0]; n <= t[1]; ++n)
      e[n] != null && (r[r.length] = q("numFmt", null, { numFmtId: n, formatCode: me(e[n]) }));
  }), r.length === 1 ? "" : (r[r.length] = "</numFmts>", r[0] = q("numFmts", null, { count: r.length - 2 }).replace("/>", ">"), r.join(""));
}
function nh(e) {
  var r = [];
  return r[r.length] = q("cellXfs", null), e.forEach(function(t) {
    r[r.length] = q("xf", null, t);
  }), r[r.length] = "</cellXfs>", r.length === 2 ? "" : (r[0] = q("cellXfs", null, { count: r.length - 2 }).replace("/>", ">"), r.join(""));
}
function ns(e, r) {
  var t = [Re, q("styleSheet", null, {
    xmlns: Er[0],
    "xmlns:vt": Be.vt
  })], n;
  return e.SSF && (n = rh(e.SSF)) != null && (t[t.length] = n), t[t.length] = '<fonts count="1"><font><sz val="12"/><color theme="1"/><name val="Calibri"/><family val="2"/><scheme val="minor"/></font></fonts>', t[t.length] = '<fills count="2"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill></fills>', t[t.length] = '<borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders>', t[t.length] = '<cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>', (n = nh(r.cellXfs)) && (t[t.length] = n), t[t.length] = '<cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles>', t[t.length] = '<dxfs count="0"/>', t[t.length] = '<tableStyles count="0" defaultTableStyle="TableStyleMedium9" defaultPivotStyle="PivotStyleMedium4"/>', t.length > 2 && (t[t.length] = "</styleSheet>", t[1] = t[1].replace("/>", ">")), t.join("");
}
function ih(e, r) {
  var t = e.read_shift(2), n = Ke(e);
  return [t, n];
}
function ah(e, r, t) {
  t || (t = B(6 + 4 * r.length)), t.write_shift(2, e), Ue(r, t);
  var n = t.length > t.l ? t.slice(0, t.l) : t;
  return t.l == null && (t.l = t.length), n;
}
function sh(e, r, t) {
  var n = {};
  n.sz = e.read_shift(2) / 20;
  var i = zl(e);
  i.fItalic && (n.italic = 1), i.fCondense && (n.condense = 1), i.fExtend && (n.extend = 1), i.fShadow && (n.shadow = 1), i.fOutline && (n.outline = 1), i.fStrikeout && (n.strike = 1);
  var a = e.read_shift(2);
  switch (a === 700 && (n.bold = 1), e.read_shift(2)) {
    case 1:
      n.vertAlign = "superscript";
      break;
    case 2:
      n.vertAlign = "subscript";
      break;
  }
  var s = e.read_shift(1);
  s != 0 && (n.underline = s);
  var o = e.read_shift(1);
  o > 0 && (n.family = o);
  var c = e.read_shift(1);
  switch (c > 0 && (n.charset = c), e.l++, n.color = $l(e), e.read_shift(1)) {
    case 1:
      n.scheme = "major";
      break;
    case 2:
      n.scheme = "minor";
      break;
  }
  return n.name = Ke(e), n;
}
function oh(e, r) {
  r || (r = B(25 + 4 * 32)), r.write_shift(2, e.sz * 20), jl(e, r), r.write_shift(2, e.bold ? 700 : 400);
  var t = 0;
  e.vertAlign == "superscript" ? t = 1 : e.vertAlign == "subscript" && (t = 2), r.write_shift(2, t), r.write_shift(1, e.underline || 0), r.write_shift(1, e.family || 0), r.write_shift(1, e.charset || 0), r.write_shift(1, 0), Sn(e.color, r);
  var n = 0;
  return e.scheme == "major" && (n = 1), e.scheme == "minor" && (n = 2), r.write_shift(1, n), Ue(e.name, r), r.length > r.l ? r.slice(0, r.l) : r;
}
var fh = [
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
], Zn, lh = Ct;
function Na(e, r) {
  r || (r = B(4 * 3 + 8 * 7 + 16 * 1)), Zn || (Zn = pi(fh));
  var t = Zn[e.patternType];
  t == null && (t = 40), r.write_shift(4, t);
  var n = 0;
  if (t != 40)
    for (Sn({ auto: 1 }, r), Sn({ auto: 1 }, r); n < 12; ++n)
      r.write_shift(4, 0);
  else {
    for (; n < 4; ++n)
      r.write_shift(4, 0);
    for (; n < 12; ++n)
      r.write_shift(4, 0);
  }
  return r.length > r.l ? r.slice(0, r.l) : r;
}
function ch(e, r) {
  var t = e.l + r, n = e.read_shift(2), i = e.read_shift(2);
  return e.l = t, { ixfe: n, numFmtId: i };
}
function is(e, r, t) {
  t || (t = B(16)), t.write_shift(2, r || 0), t.write_shift(2, e.numFmtId || 0), t.write_shift(2, 0), t.write_shift(2, 0), t.write_shift(2, 0), t.write_shift(1, 0), t.write_shift(1, 0);
  var n = 0;
  return t.write_shift(1, n), t.write_shift(1, 0), t.write_shift(1, 0), t.write_shift(1, 0), t;
}
function Ir(e, r) {
  return r || (r = B(10)), r.write_shift(1, 0), r.write_shift(1, 0), r.write_shift(4, 0), r.write_shift(4, 0), r;
}
var hh = Ct;
function uh(e, r) {
  return r || (r = B(51)), r.write_shift(1, 0), Ir(null, r), Ir(null, r), Ir(null, r), Ir(null, r), Ir(null, r), r.length > r.l ? r.slice(0, r.l) : r;
}
function xh(e, r) {
  return r || (r = B(12 + 4 * 10)), r.write_shift(4, e.xfId), r.write_shift(2, 1), r.write_shift(1, +e.builtinId), r.write_shift(1, 0), En(e.name || "", r), r.length > r.l ? r.slice(0, r.l) : r;
}
function dh(e, r, t) {
  var n = B(2052);
  return n.write_shift(4, e), En(r, n), En(t, n), n.length > n.l ? n.slice(0, n.l) : n;
}
function ph(e, r) {
  if (!!r) {
    var t = 0;
    [[5, 8], [23, 26], [41, 44], [50, 392]].forEach(function(n) {
      for (var i = n[0]; i <= n[1]; ++i)
        r[i] != null && ++t;
    }), t != 0 && (W(e, 615, Et(t)), [[5, 8], [23, 26], [41, 44], [50, 392]].forEach(function(n) {
      for (var i = n[0]; i <= n[1]; ++i)
        r[i] != null && W(e, 44, ah(i, r[i]));
    }), W(e, 616));
  }
}
function gh(e) {
  var r = 1;
  W(e, 611, Et(r)), W(e, 43, oh({
    sz: 12,
    color: { theme: 1 },
    name: "Calibri",
    family: 2,
    scheme: "minor"
  })), W(e, 612);
}
function vh(e) {
  var r = 2;
  W(e, 603, Et(r)), W(e, 45, Na({ patternType: "none" })), W(e, 45, Na({ patternType: "gray125" })), W(e, 604);
}
function mh(e) {
  var r = 1;
  W(e, 613, Et(r)), W(e, 46, uh()), W(e, 614);
}
function _h(e) {
  var r = 1;
  W(e, 626, Et(r)), W(e, 47, is({
    numFmtId: 0,
    fontId: 0,
    fillId: 0,
    borderId: 0
  }, 65535)), W(e, 627);
}
function wh(e, r) {
  W(e, 617, Et(r.length)), r.forEach(function(t) {
    W(e, 47, is(t, 0));
  }), W(e, 618);
}
function Th(e) {
  var r = 1;
  W(e, 619, Et(r)), W(e, 48, xh({
    xfId: 0,
    builtinId: 0,
    name: "Normal"
  })), W(e, 620);
}
function Eh(e) {
  var r = 0;
  W(e, 505, Et(r)), W(e, 506);
}
function Sh(e) {
  var r = 0;
  W(e, 508, dh(r, "TableStyleMedium9", "PivotStyleMedium4")), W(e, 509);
}
function yh(e, r) {
  var t = nt();
  return W(t, 278), ph(t, e.SSF), gh(t), vh(t), mh(t), _h(t), wh(t, r.cellXfs), Th(t), Eh(t), Sh(t), W(t, 279), t.end();
}
function as(e, r) {
  if (r && r.themeXLSX)
    return r.themeXLSX;
  if (e && typeof e.raw == "string")
    return e.raw;
  var t = [Re];
  return t[t.length] = '<a:theme xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" name="Office Theme">', t[t.length] = "<a:themeElements>", t[t.length] = '<a:clrScheme name="Office">', t[t.length] = '<a:dk1><a:sysClr val="windowText" lastClr="000000"/></a:dk1>', t[t.length] = '<a:lt1><a:sysClr val="window" lastClr="FFFFFF"/></a:lt1>', t[t.length] = '<a:dk2><a:srgbClr val="1F497D"/></a:dk2>', t[t.length] = '<a:lt2><a:srgbClr val="EEECE1"/></a:lt2>', t[t.length] = '<a:accent1><a:srgbClr val="4F81BD"/></a:accent1>', t[t.length] = '<a:accent2><a:srgbClr val="C0504D"/></a:accent2>', t[t.length] = '<a:accent3><a:srgbClr val="9BBB59"/></a:accent3>', t[t.length] = '<a:accent4><a:srgbClr val="8064A2"/></a:accent4>', t[t.length] = '<a:accent5><a:srgbClr val="4BACC6"/></a:accent5>', t[t.length] = '<a:accent6><a:srgbClr val="F79646"/></a:accent6>', t[t.length] = '<a:hlink><a:srgbClr val="0000FF"/></a:hlink>', t[t.length] = '<a:folHlink><a:srgbClr val="800080"/></a:folHlink>', t[t.length] = "</a:clrScheme>", t[t.length] = '<a:fontScheme name="Office">', t[t.length] = "<a:majorFont>", t[t.length] = '<a:latin typeface="Cambria"/>', t[t.length] = '<a:ea typeface=""/>', t[t.length] = '<a:cs typeface=""/>', t[t.length] = '<a:font script="Jpan" typeface="\uFF2D\uFF33 \uFF30\u30B4\u30B7\u30C3\u30AF"/>', t[t.length] = '<a:font script="Hang" typeface="\uB9D1\uC740 \uACE0\uB515"/>', t[t.length] = '<a:font script="Hans" typeface="\u5B8B\u4F53"/>', t[t.length] = '<a:font script="Hant" typeface="\u65B0\u7D30\u660E\u9AD4"/>', t[t.length] = '<a:font script="Arab" typeface="Times New Roman"/>', t[t.length] = '<a:font script="Hebr" typeface="Times New Roman"/>', t[t.length] = '<a:font script="Thai" typeface="Tahoma"/>', t[t.length] = '<a:font script="Ethi" typeface="Nyala"/>', t[t.length] = '<a:font script="Beng" typeface="Vrinda"/>', t[t.length] = '<a:font script="Gujr" typeface="Shruti"/>', t[t.length] = '<a:font script="Khmr" typeface="MoolBoran"/>', t[t.length] = '<a:font script="Knda" typeface="Tunga"/>', t[t.length] = '<a:font script="Guru" typeface="Raavi"/>', t[t.length] = '<a:font script="Cans" typeface="Euphemia"/>', t[t.length] = '<a:font script="Cher" typeface="Plantagenet Cherokee"/>', t[t.length] = '<a:font script="Yiii" typeface="Microsoft Yi Baiti"/>', t[t.length] = '<a:font script="Tibt" typeface="Microsoft Himalaya"/>', t[t.length] = '<a:font script="Thaa" typeface="MV Boli"/>', t[t.length] = '<a:font script="Deva" typeface="Mangal"/>', t[t.length] = '<a:font script="Telu" typeface="Gautami"/>', t[t.length] = '<a:font script="Taml" typeface="Latha"/>', t[t.length] = '<a:font script="Syrc" typeface="Estrangelo Edessa"/>', t[t.length] = '<a:font script="Orya" typeface="Kalinga"/>', t[t.length] = '<a:font script="Mlym" typeface="Kartika"/>', t[t.length] = '<a:font script="Laoo" typeface="DokChampa"/>', t[t.length] = '<a:font script="Sinh" typeface="Iskoola Pota"/>', t[t.length] = '<a:font script="Mong" typeface="Mongolian Baiti"/>', t[t.length] = '<a:font script="Viet" typeface="Times New Roman"/>', t[t.length] = '<a:font script="Uigh" typeface="Microsoft Uighur"/>', t[t.length] = '<a:font script="Geor" typeface="Sylfaen"/>', t[t.length] = "</a:majorFont>", t[t.length] = "<a:minorFont>", t[t.length] = '<a:latin typeface="Calibri"/>', t[t.length] = '<a:ea typeface=""/>', t[t.length] = '<a:cs typeface=""/>', t[t.length] = '<a:font script="Jpan" typeface="\uFF2D\uFF33 \uFF30\u30B4\u30B7\u30C3\u30AF"/>', t[t.length] = '<a:font script="Hang" typeface="\uB9D1\uC740 \uACE0\uB515"/>', t[t.length] = '<a:font script="Hans" typeface="\u5B8B\u4F53"/>', t[t.length] = '<a:font script="Hant" typeface="\u65B0\u7D30\u660E\u9AD4"/>', t[t.length] = '<a:font script="Arab" typeface="Arial"/>', t[t.length] = '<a:font script="Hebr" typeface="Arial"/>', t[t.length] = '<a:font script="Thai" typeface="Tahoma"/>', t[t.length] = '<a:font script="Ethi" typeface="Nyala"/>', t[t.length] = '<a:font script="Beng" typeface="Vrinda"/>', t[t.length] = '<a:font script="Gujr" typeface="Shruti"/>', t[t.length] = '<a:font script="Khmr" typeface="DaunPenh"/>', t[t.length] = '<a:font script="Knda" typeface="Tunga"/>', t[t.length] = '<a:font script="Guru" typeface="Raavi"/>', t[t.length] = '<a:font script="Cans" typeface="Euphemia"/>', t[t.length] = '<a:font script="Cher" typeface="Plantagenet Cherokee"/>', t[t.length] = '<a:font script="Yiii" typeface="Microsoft Yi Baiti"/>', t[t.length] = '<a:font script="Tibt" typeface="Microsoft Himalaya"/>', t[t.length] = '<a:font script="Thaa" typeface="MV Boli"/>', t[t.length] = '<a:font script="Deva" typeface="Mangal"/>', t[t.length] = '<a:font script="Telu" typeface="Gautami"/>', t[t.length] = '<a:font script="Taml" typeface="Latha"/>', t[t.length] = '<a:font script="Syrc" typeface="Estrangelo Edessa"/>', t[t.length] = '<a:font script="Orya" typeface="Kalinga"/>', t[t.length] = '<a:font script="Mlym" typeface="Kartika"/>', t[t.length] = '<a:font script="Laoo" typeface="DokChampa"/>', t[t.length] = '<a:font script="Sinh" typeface="Iskoola Pota"/>', t[t.length] = '<a:font script="Mong" typeface="Mongolian Baiti"/>', t[t.length] = '<a:font script="Viet" typeface="Arial"/>', t[t.length] = '<a:font script="Uigh" typeface="Microsoft Uighur"/>', t[t.length] = '<a:font script="Geor" typeface="Sylfaen"/>', t[t.length] = "</a:minorFont>", t[t.length] = "</a:fontScheme>", t[t.length] = '<a:fmtScheme name="Office">', t[t.length] = "<a:fillStyleLst>", t[t.length] = '<a:solidFill><a:schemeClr val="phClr"/></a:solidFill>', t[t.length] = '<a:gradFill rotWithShape="1">', t[t.length] = "<a:gsLst>", t[t.length] = '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="50000"/><a:satMod val="300000"/></a:schemeClr></a:gs>', t[t.length] = '<a:gs pos="35000"><a:schemeClr val="phClr"><a:tint val="37000"/><a:satMod val="300000"/></a:schemeClr></a:gs>', t[t.length] = '<a:gs pos="100000"><a:schemeClr val="phClr"><a:tint val="15000"/><a:satMod val="350000"/></a:schemeClr></a:gs>', t[t.length] = "</a:gsLst>", t[t.length] = '<a:lin ang="16200000" scaled="1"/>', t[t.length] = "</a:gradFill>", t[t.length] = '<a:gradFill rotWithShape="1">', t[t.length] = "<a:gsLst>", t[t.length] = '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="100000"/><a:shade val="100000"/><a:satMod val="130000"/></a:schemeClr></a:gs>', t[t.length] = '<a:gs pos="100000"><a:schemeClr val="phClr"><a:tint val="50000"/><a:shade val="100000"/><a:satMod val="350000"/></a:schemeClr></a:gs>', t[t.length] = "</a:gsLst>", t[t.length] = '<a:lin ang="16200000" scaled="0"/>', t[t.length] = "</a:gradFill>", t[t.length] = "</a:fillStyleLst>", t[t.length] = "<a:lnStyleLst>", t[t.length] = '<a:ln w="9525" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"><a:shade val="95000"/><a:satMod val="105000"/></a:schemeClr></a:solidFill><a:prstDash val="solid"/></a:ln>', t[t.length] = '<a:ln w="25400" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln>', t[t.length] = '<a:ln w="38100" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln>', t[t.length] = "</a:lnStyleLst>", t[t.length] = "<a:effectStyleLst>", t[t.length] = "<a:effectStyle>", t[t.length] = "<a:effectLst>", t[t.length] = '<a:outerShdw blurRad="40000" dist="20000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="38000"/></a:srgbClr></a:outerShdw>', t[t.length] = "</a:effectLst>", t[t.length] = "</a:effectStyle>", t[t.length] = "<a:effectStyle>", t[t.length] = "<a:effectLst>", t[t.length] = '<a:outerShdw blurRad="40000" dist="23000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="35000"/></a:srgbClr></a:outerShdw>', t[t.length] = "</a:effectLst>", t[t.length] = "</a:effectStyle>", t[t.length] = "<a:effectStyle>", t[t.length] = "<a:effectLst>", t[t.length] = '<a:outerShdw blurRad="40000" dist="23000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="35000"/></a:srgbClr></a:outerShdw>', t[t.length] = "</a:effectLst>", t[t.length] = '<a:scene3d><a:camera prst="orthographicFront"><a:rot lat="0" lon="0" rev="0"/></a:camera><a:lightRig rig="threePt" dir="t"><a:rot lat="0" lon="0" rev="1200000"/></a:lightRig></a:scene3d>', t[t.length] = '<a:sp3d><a:bevelT w="63500" h="25400"/></a:sp3d>', t[t.length] = "</a:effectStyle>", t[t.length] = "</a:effectStyleLst>", t[t.length] = "<a:bgFillStyleLst>", t[t.length] = '<a:solidFill><a:schemeClr val="phClr"/></a:solidFill>', t[t.length] = '<a:gradFill rotWithShape="1">', t[t.length] = "<a:gsLst>", t[t.length] = '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="40000"/><a:satMod val="350000"/></a:schemeClr></a:gs>', t[t.length] = '<a:gs pos="40000"><a:schemeClr val="phClr"><a:tint val="45000"/><a:shade val="99000"/><a:satMod val="350000"/></a:schemeClr></a:gs>', t[t.length] = '<a:gs pos="100000"><a:schemeClr val="phClr"><a:shade val="20000"/><a:satMod val="255000"/></a:schemeClr></a:gs>', t[t.length] = "</a:gsLst>", t[t.length] = '<a:path path="circle"><a:fillToRect l="50000" t="-80000" r="50000" b="180000"/></a:path>', t[t.length] = "</a:gradFill>", t[t.length] = '<a:gradFill rotWithShape="1">', t[t.length] = "<a:gsLst>", t[t.length] = '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="80000"/><a:satMod val="300000"/></a:schemeClr></a:gs>', t[t.length] = '<a:gs pos="100000"><a:schemeClr val="phClr"><a:shade val="30000"/><a:satMod val="200000"/></a:schemeClr></a:gs>', t[t.length] = "</a:gsLst>", t[t.length] = '<a:path path="circle"><a:fillToRect l="50000" t="50000" r="50000" b="50000"/></a:path>', t[t.length] = "</a:gradFill>", t[t.length] = "</a:bgFillStyleLst>", t[t.length] = "</a:fmtScheme>", t[t.length] = "</a:themeElements>", t[t.length] = "<a:objectDefaults>", t[t.length] = "<a:spDef>", t[t.length] = '<a:spPr/><a:bodyPr/><a:lstStyle/><a:style><a:lnRef idx="1"><a:schemeClr val="accent1"/></a:lnRef><a:fillRef idx="3"><a:schemeClr val="accent1"/></a:fillRef><a:effectRef idx="2"><a:schemeClr val="accent1"/></a:effectRef><a:fontRef idx="minor"><a:schemeClr val="lt1"/></a:fontRef></a:style>', t[t.length] = "</a:spDef>", t[t.length] = "<a:lnDef>", t[t.length] = '<a:spPr/><a:bodyPr/><a:lstStyle/><a:style><a:lnRef idx="2"><a:schemeClr val="accent1"/></a:lnRef><a:fillRef idx="0"><a:schemeClr val="accent1"/></a:fillRef><a:effectRef idx="1"><a:schemeClr val="accent1"/></a:effectRef><a:fontRef idx="minor"><a:schemeClr val="tx1"/></a:fontRef></a:style>', t[t.length] = "</a:lnDef>", t[t.length] = "</a:objectDefaults>", t[t.length] = "<a:extraClrSchemeLst/>", t[t.length] = "</a:theme>", t.join("");
}
function Ah(e, r) {
  return {
    flags: e.read_shift(4),
    version: e.read_shift(4),
    name: Ke(e)
  };
}
function Ch(e) {
  var r = B(12 + 2 * e.name.length);
  return r.write_shift(4, e.flags), r.write_shift(4, e.version), Ue(e.name, r), r.slice(0, r.l);
}
function Fh(e) {
  for (var r = [], t = e.read_shift(4); t-- > 0; )
    r.push([e.read_shift(4), e.read_shift(4)]);
  return r;
}
function Oh(e) {
  var r = B(4 + 8 * e.length);
  r.write_shift(4, e.length);
  for (var t = 0; t < e.length; ++t)
    r.write_shift(4, e[t][0]), r.write_shift(4, e[t][1]);
  return r;
}
function Dh(e, r) {
  var t = B(8 + 2 * r.length);
  return t.write_shift(4, e), Ue(r, t), t.slice(0, t.l);
}
function Ih(e) {
  return e.l += 4, e.read_shift(4) != 0;
}
function kh(e, r) {
  var t = B(8);
  return t.write_shift(4, e), t.write_shift(4, r ? 1 : 0), t;
}
function Rh() {
  var e = nt();
  return W(e, 332), W(e, 334, Et(1)), W(e, 335, Ch({
    name: "XLDAPR",
    version: 12e4,
    flags: 3496657072
  })), W(e, 336), W(e, 339, Dh(1, "XLDAPR")), W(e, 52), W(e, 35, Et(514)), W(e, 4096, Et(0)), W(e, 4097, pt(1)), W(e, 36), W(e, 53), W(e, 340), W(e, 337, kh(1, !0)), W(e, 51, Oh([[1, 0]])), W(e, 338), W(e, 333), e.end();
}
function ss() {
  var e = [Re];
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
function Nh(e) {
  var r = {};
  r.i = e.read_shift(4);
  var t = {};
  t.r = e.read_shift(4), t.c = e.read_shift(4), r.r = _e(t);
  var n = e.read_shift(1);
  return n & 2 && (r.l = "1"), n & 8 && (r.a = "1"), r;
}
var dr = 1024;
function os(e, r) {
  for (var t = [21600, 21600], n = ["m0,0l0", t[1], t[0], t[1], t[0], "0xe"].join(","), i = [
    q("xml", null, { "xmlns:v": lt.v, "xmlns:o": lt.o, "xmlns:x": lt.x, "xmlns:mv": lt.mv }).replace(/\/>/, ">"),
    q("o:shapelayout", q("o:idmap", null, { "v:ext": "edit", data: e }), { "v:ext": "edit" }),
    q("v:shapetype", [
      q("v:stroke", null, { joinstyle: "miter" }),
      q("v:path", null, { gradientshapeok: "t", "o:connecttype": "rect" })
    ].join(""), { id: "_x0000_t202", "o:spt": 202, coordsize: t.join(","), path: n })
  ]; dr < e * 1e3; )
    dr += 1e3;
  return r.forEach(function(a) {
    var s = be(a[0]), o = { color2: "#BEFF82", type: "gradient" };
    o.type == "gradient" && (o.angle = "-180");
    var c = o.type == "gradient" ? q("o:fill", null, { type: "gradientUnscaled", "v:ext": "view" }) : null, f = q("v:fill", c, o), l = { on: "t", obscured: "t" };
    ++dr, i = i.concat([
      "<v:shape" + Wr({
        id: "_x0000_s" + dr,
        type: "#_x0000_t202",
        style: "position:absolute; margin-left:80pt;margin-top:5pt;width:104pt;height:64pt;z-index:10" + (a[1].hidden ? ";visibility:hidden" : ""),
        fillcolor: "#ECFAD4",
        strokecolor: "#edeaa1"
      }) + ">",
      f,
      q("v:shadow", null, l),
      q("v:path", null, { "o:connecttype": "none" }),
      '<v:textbox><div style="text-align:left"></div></v:textbox>',
      '<x:ClientData ObjectType="Note">',
      "<x:MoveWithCells/>",
      "<x:SizeWithCells/>",
      Ye("x:Anchor", [s.c + 1, 0, s.r + 1, 0, s.c + 3, 20, s.r + 5, 20].join(",")),
      Ye("x:AutoFill", "False"),
      Ye("x:Row", String(s.r)),
      Ye("x:Column", String(s.c)),
      a[1].hidden ? "" : "<x:Visible/>",
      "</x:ClientData>",
      "</v:shape>"
    ]);
  }), i.push("</xml>"), i.join("");
}
function fs(e) {
  var r = [Re, q("comments", null, { xmlns: Er[0] })], t = [];
  return r.push("<authors>"), e.forEach(function(n) {
    n[1].forEach(function(i) {
      var a = me(i.a);
      t.indexOf(a) == -1 && (t.push(a), r.push("<author>" + a + "</author>")), i.T && i.ID && t.indexOf("tc=" + i.ID) == -1 && (t.push("tc=" + i.ID), r.push("<author>tc=" + i.ID + "</author>"));
    });
  }), t.length == 0 && (t.push("SheetJ5"), r.push("<author>SheetJ5</author>")), r.push("</authors>"), r.push("<commentList>"), e.forEach(function(n) {
    var i = 0, a = [];
    if (n[1][0] && n[1][0].T && n[1][0].ID ? i = t.indexOf("tc=" + n[1][0].ID) : n[1].forEach(function(c) {
      c.a && (i = t.indexOf(me(c.a))), a.push(c.t || "");
    }), r.push('<comment ref="' + n[0] + '" authorId="' + i + '"><text>'), a.length <= 1)
      r.push(Ye("t", me(a[0] || "")));
    else {
      for (var s = `Comment:
    ` + a[0] + `
`, o = 1; o < a.length; ++o)
        s += `Reply:
    ` + a[o] + `
`;
      r.push(Ye("t", me(s)));
    }
    r.push("</text></comment>");
  }), r.push("</commentList>"), r.length > 2 && (r[r.length] = "</comments>", r[1] = r[1].replace("/>", ">")), r.join("");
}
function Lh(e, r, t) {
  var n = [Re, q("ThreadedComments", null, { xmlns: Be.TCMNT }).replace(/[\/]>/, ">")];
  return e.forEach(function(i) {
    var a = "";
    (i[1] || []).forEach(function(s, o) {
      if (!s.T) {
        delete s.ID;
        return;
      }
      s.a && r.indexOf(s.a) == -1 && r.push(s.a);
      var c = {
        ref: i[0],
        id: "{54EE7951-7262-4200-6969-" + ("000000000000" + t.tcid++).slice(-12) + "}"
      };
      o == 0 ? a = c.id : c.parentId = a, s.ID = c.id, s.a && (c.personId = "{54EE7950-7262-4200-6969-" + ("000000000000" + r.indexOf(s.a)).slice(-12) + "}"), n.push(q("threadedComment", Ye("text", s.t || ""), c));
    });
  }), n.push("</ThreadedComments>"), n.join("");
}
function Ph(e) {
  var r = [Re, q("personList", null, {
    xmlns: Be.TCMNT,
    "xmlns:x": Er[0]
  }).replace(/[\/]>/, ">")];
  return e.forEach(function(t, n) {
    r.push(q("person", null, {
      displayName: t,
      id: "{54EE7950-7262-4200-6969-" + ("000000000000" + n).slice(-12) + "}",
      userId: t,
      providerId: "None"
    }));
  }), r.push("</personList>"), r.join("");
}
function Mh(e) {
  var r = {};
  r.iauthor = e.read_shift(4);
  var t = fr(e);
  return r.rfx = t.s, r.ref = _e(t.s), e.l += 16, r;
}
function Bh(e, r) {
  return r == null && (r = B(36)), r.write_shift(4, e[1].iauthor), yr(e[0], r), r.write_shift(4, 0), r.write_shift(4, 0), r.write_shift(4, 0), r.write_shift(4, 0), r;
}
var bh = Ke;
function Uh(e) {
  return Ue(e.slice(0, 54));
}
function Hh(e) {
  var r = nt(), t = [];
  return W(r, 628), W(r, 630), e.forEach(function(n) {
    n[1].forEach(function(i) {
      t.indexOf(i.a) > -1 || (t.push(i.a.slice(0, 54)), W(r, 632, Uh(i.a)));
    });
  }), W(r, 631), W(r, 633), e.forEach(function(n) {
    n[1].forEach(function(i) {
      i.iauthor = t.indexOf(i.a);
      var a = { s: be(n[0]), e: be(n[0]) };
      W(r, 635, Bh([a, i])), i.t && i.t.length > 0 && W(r, 637, Xl(i)), W(r, 636), delete i.iauthor;
    });
  }), W(r, 634), W(r, 629), r.end();
}
function Wh(e, r) {
  r.FullPaths.forEach(function(t, n) {
    if (n != 0) {
      var i = t.replace(/[^\/]*[\/]/, "/_VBA_PROJECT_CUR/");
      i.slice(-1) !== "/" && Te.utils.cfb_add(e, i, r.FileIndex[n].content);
    }
  });
}
var ls = ["xlsb", "xlsm", "xlam", "biff8", "xla"], Xh = /* @__PURE__ */ function() {
  var e = /(^|[^A-Za-z_])R(\[?-?\d+\]|[1-9]\d*|)C(\[?-?\d+\]|[1-9]\d*|)(?![A-Za-z0-9_])/g, r = { r: 0, c: 0 };
  function t(n, i, a, s) {
    var o = !1, c = !1;
    a.length == 0 ? c = !0 : a.charAt(0) == "[" && (c = !0, a = a.slice(1, -1)), s.length == 0 ? o = !0 : s.charAt(0) == "[" && (o = !0, s = s.slice(1, -1));
    var f = a.length > 0 ? parseInt(a, 10) | 0 : 0, l = s.length > 0 ? parseInt(s, 10) | 0 : 0;
    return o ? l += r.c : --l, c ? f += r.r : --f, i + (o ? "" : "$") + je(l) + (c ? "" : "$") + Ge(f);
  }
  return function(i, a) {
    return r = a, i.replace(e, t);
  };
}(), Oi = /(^|[^._A-Z0-9])([$]?)([A-Z]{1,2}|[A-W][A-Z]{2}|X[A-E][A-Z]|XF[A-D])([$]?)(10[0-3]\d{4}|104[0-7]\d{3}|1048[0-4]\d{2}|10485[0-6]\d|104857[0-6]|[1-9]\d{0,5})(?![_.\(A-Za-z0-9])/g, Di = /* @__PURE__ */ function() {
  return function(r, t) {
    return r.replace(Oi, function(n, i, a, s, o, c) {
      var f = Ei(s) - (a ? 0 : t.c), l = Ti(c) - (o ? 0 : t.r), h = l == 0 ? "" : o ? l + 1 : "[" + l + "]", x = f == 0 ? "" : a ? f + 1 : "[" + f + "]";
      return i + "R" + h + "C" + x;
    });
  };
}();
function Vh(e, r) {
  return e.replace(Oi, function(t, n, i, a, s, o) {
    return n + (i == "$" ? i + a : je(Ei(a) + r.c)) + (s == "$" ? s + o : Ge(Ti(o) + r.r));
  });
}
function Yh(e) {
  return e.length != 1;
}
function Ie(e) {
  e.l += 1;
}
function Gt(e, r) {
  var t = e.read_shift(r == 1 ? 1 : 2);
  return [t & 16383, t >> 14 & 1, t >> 15 & 1];
}
function cs(e, r, t) {
  var n = 2;
  if (t) {
    if (t.biff >= 2 && t.biff <= 5)
      return hs(e);
    t.biff == 12 && (n = 4);
  }
  var i = e.read_shift(n), a = e.read_shift(n), s = Gt(e, 2), o = Gt(e, 2);
  return { s: { r: i, c: s[0], cRel: s[1], rRel: s[2] }, e: { r: a, c: o[0], cRel: o[1], rRel: o[2] } };
}
function hs(e) {
  var r = Gt(e, 2), t = Gt(e, 2), n = e.read_shift(1), i = e.read_shift(1);
  return { s: { r: r[0], c: n, cRel: r[1], rRel: r[2] }, e: { r: t[0], c: i, cRel: t[1], rRel: t[2] } };
}
function Gh(e, r, t) {
  if (t.biff < 8)
    return hs(e);
  var n = e.read_shift(t.biff == 12 ? 4 : 2), i = e.read_shift(t.biff == 12 ? 4 : 2), a = Gt(e, 2), s = Gt(e, 2);
  return { s: { r: n, c: a[0], cRel: a[1], rRel: a[2] }, e: { r: i, c: s[0], cRel: s[1], rRel: s[2] } };
}
function us(e, r, t) {
  if (t && t.biff >= 2 && t.biff <= 5)
    return $h(e);
  var n = e.read_shift(t && t.biff == 12 ? 4 : 2), i = Gt(e, 2);
  return { r: n, c: i[0], cRel: i[1], rRel: i[2] };
}
function $h(e) {
  var r = Gt(e, 2), t = e.read_shift(1);
  return { r: r[0], c: t, cRel: r[1], rRel: r[2] };
}
function zh(e) {
  var r = e.read_shift(2), t = e.read_shift(2);
  return { r, c: t & 255, fQuoted: !!(t & 16384), cRel: t >> 15, rRel: t >> 15 };
}
function jh(e, r, t) {
  var n = t && t.biff ? t.biff : 8;
  if (n >= 2 && n <= 5)
    return Kh(e);
  var i = e.read_shift(n >= 12 ? 4 : 2), a = e.read_shift(2), s = (a & 16384) >> 14, o = (a & 32768) >> 15;
  if (a &= 16383, o == 1)
    for (; i > 524287; )
      i -= 1048576;
  if (s == 1)
    for (; a > 8191; )
      a = a - 16384;
  return { r: i, c: a, cRel: s, rRel: o };
}
function Kh(e) {
  var r = e.read_shift(2), t = e.read_shift(1), n = (r & 32768) >> 15, i = (r & 16384) >> 14;
  return r &= 16383, n == 1 && r >= 8192 && (r = r - 16384), i == 1 && t >= 128 && (t = t - 256), { r, c: t, cRel: i, rRel: n };
}
function qh(e, r, t) {
  var n = (e[e.l++] & 96) >> 5, i = cs(e, t.biff >= 2 && t.biff <= 5 ? 6 : 8, t);
  return [n, i];
}
function Jh(e, r, t) {
  var n = (e[e.l++] & 96) >> 5, i = e.read_shift(2, "i"), a = 8;
  if (t)
    switch (t.biff) {
      case 5:
        e.l += 12, a = 6;
        break;
      case 12:
        a = 12;
        break;
    }
  var s = cs(e, a, t);
  return [n, i, s];
}
function Zh(e, r, t) {
  var n = (e[e.l++] & 96) >> 5;
  return e.l += t && t.biff > 8 ? 12 : t.biff < 8 ? 6 : 8, [n];
}
function Qh(e, r, t) {
  var n = (e[e.l++] & 96) >> 5, i = e.read_shift(2), a = 8;
  if (t)
    switch (t.biff) {
      case 5:
        e.l += 12, a = 6;
        break;
      case 12:
        a = 12;
        break;
    }
  return e.l += a, [n, i];
}
function eu(e, r, t) {
  var n = (e[e.l++] & 96) >> 5, i = Gh(e, r - 1, t);
  return [n, i];
}
function tu(e, r, t) {
  var n = (e[e.l++] & 96) >> 5;
  return e.l += t.biff == 2 ? 6 : t.biff == 12 ? 14 : 7, [n];
}
function La(e) {
  var r = e[e.l + 1] & 1, t = 1;
  return e.l += 4, [r, t];
}
function ru(e, r, t) {
  e.l += 2;
  for (var n = e.read_shift(t && t.biff == 2 ? 1 : 2), i = [], a = 0; a <= n; ++a)
    i.push(e.read_shift(t && t.biff == 2 ? 1 : 2));
  return i;
}
function nu(e, r, t) {
  var n = e[e.l + 1] & 255 ? 1 : 0;
  return e.l += 2, [n, e.read_shift(t && t.biff == 2 ? 1 : 2)];
}
function iu(e, r, t) {
  var n = e[e.l + 1] & 255 ? 1 : 0;
  return e.l += 2, [n, e.read_shift(t && t.biff == 2 ? 1 : 2)];
}
function au(e) {
  var r = e[e.l + 1] & 255 ? 1 : 0;
  return e.l += 2, [r, e.read_shift(2)];
}
function su(e, r, t) {
  var n = e[e.l + 1] & 255 ? 1 : 0;
  return e.l += t && t.biff == 2 ? 3 : 4, [n];
}
function xs(e) {
  var r = e.read_shift(1), t = e.read_shift(1);
  return [r, t];
}
function ou(e) {
  return e.read_shift(2), xs(e);
}
function fu(e) {
  return e.read_shift(2), xs(e);
}
function lu(e, r, t) {
  var n = (e[e.l] & 96) >> 5;
  e.l += 1;
  var i = us(e, 0, t);
  return [n, i];
}
function cu(e, r, t) {
  var n = (e[e.l] & 96) >> 5;
  e.l += 1;
  var i = jh(e, 0, t);
  return [n, i];
}
function hu(e, r, t) {
  var n = (e[e.l] & 96) >> 5;
  e.l += 1;
  var i = e.read_shift(2);
  t && t.biff == 5 && (e.l += 12);
  var a = us(e, 0, t);
  return [n, i, a];
}
function uu(e, r, t) {
  var n = (e[e.l] & 96) >> 5;
  e.l += 1;
  var i = e.read_shift(t && t.biff <= 3 ? 1 : 2);
  return [u1[i], gs[i], n];
}
function xu(e, r, t) {
  var n = e[e.l++], i = e.read_shift(1), a = t && t.biff <= 3 ? [n == 88 ? -1 : 0, e.read_shift(1)] : du(e);
  return [i, (a[0] === 0 ? gs : h1)[a[1]]];
}
function du(e) {
  return [e[e.l + 1] >> 7, e.read_shift(2) & 32767];
}
function pu(e, r, t) {
  e.l += t && t.biff == 2 ? 3 : 4;
}
function gu(e, r, t) {
  if (e.l++, t && t.biff == 12)
    return [e.read_shift(4, "i"), 0];
  var n = e.read_shift(2), i = e.read_shift(t && t.biff == 2 ? 1 : 2);
  return [n, i];
}
function vu(e) {
  return e.l++, jr[e.read_shift(1)];
}
function mu(e) {
  return e.l++, e.read_shift(2);
}
function _u(e) {
  return e.l++, e.read_shift(1) !== 0;
}
function wu(e) {
  return e.l++, Ar(e);
}
function Tu(e, r, t) {
  return e.l++, K0(e, r - 1, t);
}
function Eu(e, r) {
  var t = [e.read_shift(1)];
  if (r == 12)
    switch (t[0]) {
      case 2:
        t[0] = 4;
        break;
      case 4:
        t[0] = 16;
        break;
      case 0:
        t[0] = 1;
        break;
      case 1:
        t[0] = 2;
        break;
    }
  switch (t[0]) {
    case 4:
      t[1] = hc(e, 1) ? "TRUE" : "FALSE", r != 12 && (e.l += 7);
      break;
    case 37:
    case 16:
      t[1] = jr[e[e.l]], e.l += r == 12 ? 4 : 8;
      break;
    case 0:
      e.l += 8;
      break;
    case 1:
      t[1] = Ar(e);
      break;
    case 2:
      t[1] = pc(e, 0, { biff: r > 0 && r < 8 ? 2 : r });
      break;
    default:
      throw new Error("Bad SerAr: " + t[0]);
  }
  return t;
}
function Su(e, r, t) {
  for (var n = e.read_shift(t.biff == 12 ? 4 : 2), i = [], a = 0; a != n; ++a)
    i.push((t.biff == 12 ? fr : mc)(e));
  return i;
}
function yu(e, r, t) {
  var n = 0, i = 0;
  t.biff == 12 ? (n = e.read_shift(4), i = e.read_shift(4)) : (i = 1 + e.read_shift(1), n = 1 + e.read_shift(2)), t.biff >= 2 && t.biff < 8 && (--n, --i == 0 && (i = 256));
  for (var a = 0, s = []; a != n && (s[a] = []); ++a)
    for (var o = 0; o != i; ++o)
      s[a][o] = Eu(e, t.biff);
  return s;
}
function Au(e, r, t) {
  var n = e.read_shift(1) >>> 5 & 3, i = !t || t.biff >= 8 ? 4 : 2, a = e.read_shift(i);
  switch (t.biff) {
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
  return [n, 0, a];
}
function Cu(e, r, t) {
  if (t.biff == 5)
    return Fu(e);
  var n = e.read_shift(1) >>> 5 & 3, i = e.read_shift(2), a = e.read_shift(4);
  return [n, i, a];
}
function Fu(e) {
  var r = e.read_shift(1) >>> 5 & 3, t = e.read_shift(2, "i");
  e.l += 8;
  var n = e.read_shift(2);
  return e.l += 12, [r, t, n];
}
function Ou(e, r, t) {
  var n = e.read_shift(1) >>> 5 & 3;
  e.l += t && t.biff == 2 ? 3 : 4;
  var i = e.read_shift(t && t.biff == 2 ? 1 : 2);
  return [n, i];
}
function Du(e, r, t) {
  var n = e.read_shift(1) >>> 5 & 3, i = e.read_shift(t && t.biff == 2 ? 1 : 2);
  return [n, i];
}
function Iu(e, r, t) {
  var n = e.read_shift(1) >>> 5 & 3;
  return e.l += 4, t.biff < 8 && e.l--, t.biff == 12 && (e.l += 2), [n];
}
function ku(e, r, t) {
  var n = (e[e.l++] & 96) >> 5, i = e.read_shift(2), a = 4;
  if (t)
    switch (t.biff) {
      case 5:
        a = 15;
        break;
      case 12:
        a = 6;
        break;
    }
  return e.l += a, [n, i];
}
var Ru = Ct, Nu = Ct, Lu = Ct;
function Kr(e, r, t) {
  return e.l += 2, [zh(e)];
}
function Ii(e) {
  return e.l += 6, [];
}
var Pu = Kr, Mu = Ii, Bu = Ii, bu = Kr;
function ds(e) {
  return e.l += 2, [z0(e), e.read_shift(2) & 1];
}
var Uu = Kr, Hu = ds, Wu = Ii, Xu = Kr, Vu = Kr, Yu = [
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
function Gu(e) {
  e.l += 2;
  var r = e.read_shift(2), t = e.read_shift(2), n = e.read_shift(4), i = e.read_shift(2), a = e.read_shift(2), s = Yu[t >> 2 & 31];
  return { ixti: r, coltype: t & 3, rt: s, idx: n, c: i, C: a };
}
function $u(e) {
  return e.l += 2, [e.read_shift(4)];
}
function zu(e, r, t) {
  return e.l += 5, e.l += 2, e.l += t.biff == 2 ? 1 : 4, ["PTGSHEET"];
}
function ju(e, r, t) {
  return e.l += t.biff == 2 ? 4 : 5, ["PTGENDSHEET"];
}
function Ku(e) {
  var r = e.read_shift(1) >>> 5 & 3, t = e.read_shift(2);
  return [r, t];
}
function qu(e) {
  var r = e.read_shift(1) >>> 5 & 3, t = e.read_shift(2);
  return [r, t];
}
function Ju(e) {
  return e.l += 4, [0, 0];
}
var Pa = {
  1: { n: "PtgExp", f: gu },
  2: { n: "PtgTbl", f: Lu },
  3: { n: "PtgAdd", f: Ie },
  4: { n: "PtgSub", f: Ie },
  5: { n: "PtgMul", f: Ie },
  6: { n: "PtgDiv", f: Ie },
  7: { n: "PtgPower", f: Ie },
  8: { n: "PtgConcat", f: Ie },
  9: { n: "PtgLt", f: Ie },
  10: { n: "PtgLe", f: Ie },
  11: { n: "PtgEq", f: Ie },
  12: { n: "PtgGe", f: Ie },
  13: { n: "PtgGt", f: Ie },
  14: { n: "PtgNe", f: Ie },
  15: { n: "PtgIsect", f: Ie },
  16: { n: "PtgUnion", f: Ie },
  17: { n: "PtgRange", f: Ie },
  18: { n: "PtgUplus", f: Ie },
  19: { n: "PtgUminus", f: Ie },
  20: { n: "PtgPercent", f: Ie },
  21: { n: "PtgParen", f: Ie },
  22: { n: "PtgMissArg", f: Ie },
  23: { n: "PtgStr", f: Tu },
  26: { n: "PtgSheet", f: zu },
  27: { n: "PtgEndSheet", f: ju },
  28: { n: "PtgErr", f: vu },
  29: { n: "PtgBool", f: _u },
  30: { n: "PtgInt", f: mu },
  31: { n: "PtgNum", f: wu },
  32: { n: "PtgArray", f: tu },
  33: { n: "PtgFunc", f: uu },
  34: { n: "PtgFuncVar", f: xu },
  35: { n: "PtgName", f: Au },
  36: { n: "PtgRef", f: lu },
  37: { n: "PtgArea", f: qh },
  38: { n: "PtgMemArea", f: Ou },
  39: { n: "PtgMemErr", f: Ru },
  40: { n: "PtgMemNoMem", f: Nu },
  41: { n: "PtgMemFunc", f: Du },
  42: { n: "PtgRefErr", f: Iu },
  43: { n: "PtgAreaErr", f: Zh },
  44: { n: "PtgRefN", f: cu },
  45: { n: "PtgAreaN", f: eu },
  46: { n: "PtgMemAreaN", f: Ku },
  47: { n: "PtgMemNoMemN", f: qu },
  57: { n: "PtgNameX", f: Cu },
  58: { n: "PtgRef3d", f: hu },
  59: { n: "PtgArea3d", f: Jh },
  60: { n: "PtgRefErr3d", f: ku },
  61: { n: "PtgAreaErr3d", f: Qh },
  255: {}
}, Zu = {
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
}, Qu = {
  1: { n: "PtgElfLel", f: ds },
  2: { n: "PtgElfRw", f: Xu },
  3: { n: "PtgElfCol", f: Pu },
  6: { n: "PtgElfRwV", f: Vu },
  7: { n: "PtgElfColV", f: bu },
  10: { n: "PtgElfRadical", f: Uu },
  11: { n: "PtgElfRadicalS", f: Wu },
  13: { n: "PtgElfColS", f: Mu },
  15: { n: "PtgElfColSV", f: Bu },
  16: { n: "PtgElfRadicalLel", f: Hu },
  25: { n: "PtgList", f: Gu },
  29: { n: "PtgSxName", f: $u },
  255: {}
}, e1 = {
  0: { n: "PtgAttrNoop", f: Ju },
  1: { n: "PtgAttrSemi", f: su },
  2: { n: "PtgAttrIf", f: iu },
  4: { n: "PtgAttrChoose", f: ru },
  8: { n: "PtgAttrGoto", f: nu },
  16: { n: "PtgAttrSum", f: pu },
  32: { n: "PtgAttrBaxcel", f: La },
  33: { n: "PtgAttrBaxcel", f: La },
  64: { n: "PtgAttrSpace", f: ou },
  65: { n: "PtgAttrSpaceSemi", f: fu },
  128: { n: "PtgAttrIfError", f: au },
  255: {}
};
function t1(e, r, t, n) {
  if (n.biff < 8)
    return Ct(e, r);
  for (var i = e.l + r, a = [], s = 0; s !== t.length; ++s)
    switch (t[s][0]) {
      case "PtgArray":
        t[s][1] = yu(e, 0, n), a.push(t[s][1]);
        break;
      case "PtgMemArea":
        t[s][2] = Su(e, t[s][1], n), a.push(t[s][2]);
        break;
      case "PtgExp":
        n && n.biff == 12 && (t[s][1][1] = e.read_shift(4), a.push(t[s][1]));
        break;
      case "PtgList":
      case "PtgElfRadicalS":
      case "PtgElfColS":
      case "PtgElfColSV":
        throw "Unsupported " + t[s][0];
    }
  return r = i - e.l, r !== 0 && a.push(Ct(e, r)), a;
}
function r1(e, r, t) {
  for (var n = e.l + r, i, a, s = []; n != e.l; )
    r = n - e.l, a = e[e.l], i = Pa[a] || Pa[Zu[a]], (a === 24 || a === 25) && (i = (a === 24 ? Qu : e1)[e[e.l + 1]]), !i || !i.f ? Ct(e, r) : s.push([i.n, i.f(e, r, t)]);
  return s;
}
function n1(e) {
  for (var r = [], t = 0; t < e.length; ++t) {
    for (var n = e[t], i = [], a = 0; a < n.length; ++a) {
      var s = n[a];
      if (s)
        switch (s[0]) {
          case 2:
            i.push('"' + s[1].replace(/"/g, '""') + '"');
            break;
          default:
            i.push(s[1]);
        }
      else
        i.push("");
    }
    r.push(i.join(","));
  }
  return r.join(";");
}
var i1 = {
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
function a1(e, r) {
  if (!e && !(r && r.biff <= 5 && r.biff >= 2))
    throw new Error("empty sheet name");
  return /[^\w\u4E00-\u9FFF\u3040-\u30FF]/.test(e) ? "'" + e + "'" : e;
}
function ps(e, r, t) {
  if (!e)
    return "SH33TJSERR0";
  if (t.biff > 8 && (!e.XTI || !e.XTI[r]))
    return e.SheetNames[r];
  if (!e.XTI)
    return "SH33TJSERR6";
  var n = e.XTI[r];
  if (t.biff < 8)
    return r > 1e4 && (r -= 65536), r < 0 && (r = -r), r == 0 ? "" : e.XTI[r - 1];
  if (!n)
    return "SH33TJSERR1";
  var i = "";
  if (t.biff > 8)
    switch (e[n[0]][0]) {
      case 357:
        return i = n[1] == -1 ? "#REF" : e.SheetNames[n[1]], n[1] == n[2] ? i : i + ":" + e.SheetNames[n[2]];
      case 358:
        return t.SID != null ? e.SheetNames[t.SID] : "SH33TJSSAME" + e[n[0]][0];
      case 355:
      default:
        return "SH33TJSSRC" + e[n[0]][0];
    }
  switch (e[n[0]][0][0]) {
    case 1025:
      return i = n[1] == -1 ? "#REF" : e.SheetNames[n[1]] || "SH33TJSERR3", n[1] == n[2] ? i : i + ":" + e.SheetNames[n[2]];
    case 14849:
      return e[n[0]].slice(1).map(function(a) {
        return a.Name;
      }).join(";;");
    default:
      return e[n[0]][0][3] ? (i = n[1] == -1 ? "#REF" : e[n[0]][0][3][n[1]] || "SH33TJSERR4", n[1] == n[2] ? i : i + ":" + e[n[0]][0][3][n[2]]) : "SH33TJSERR2";
  }
}
function Ma(e, r, t) {
  var n = ps(e, r, t);
  return n == "#REF" ? n : a1(n, t);
}
function _r(e, r, t, n, i) {
  var a = i && i.biff || 8, s = { s: { c: 0, r: 0 }, e: { c: 0, r: 0 } }, o = [], c, f, l, h = 0, x = 0, d, v = "";
  if (!e[0] || !e[0][0])
    return "";
  for (var u = -1, g = "", S = 0, A = e[0].length; S < A; ++S) {
    var C = e[0][S];
    switch (C[0]) {
      case "PtgUminus":
        o.push("-" + o.pop());
        break;
      case "PtgUplus":
        o.push("+" + o.pop());
        break;
      case "PtgPercent":
        o.push(o.pop() + "%");
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
        if (c = o.pop(), f = o.pop(), u >= 0) {
          switch (e[0][u][1][0]) {
            case 0:
              g = Fe(" ", e[0][u][1][1]);
              break;
            case 1:
              g = Fe("\r", e[0][u][1][1]);
              break;
            default:
              if (g = "", i.WTF)
                throw new Error("Unexpected PtgAttrSpaceType " + e[0][u][1][0]);
          }
          f = f + g, u = -1;
        }
        o.push(f + i1[C[0]] + c);
        break;
      case "PtgIsect":
        c = o.pop(), f = o.pop(), o.push(f + " " + c);
        break;
      case "PtgUnion":
        c = o.pop(), f = o.pop(), o.push(f + "," + c);
        break;
      case "PtgRange":
        c = o.pop(), f = o.pop(), o.push(f + ":" + c);
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
        l = Pr(C[1][1], s, i), o.push(Mr(l, a));
        break;
      case "PtgRefN":
        l = t ? Pr(C[1][1], t, i) : C[1][1], o.push(Mr(l, a));
        break;
      case "PtgRef3d":
        h = C[1][1], l = Pr(C[1][2], s, i), v = Ma(n, h, i), o.push(v + "!" + Mr(l, a));
        break;
      case "PtgFunc":
      case "PtgFuncVar":
        var I = C[1][0], Y = C[1][1];
        I || (I = 0), I &= 127;
        var Q = I == 0 ? [] : o.slice(-I);
        o.length -= I, Y === "User" && (Y = Q.shift()), o.push(Y + "(" + Q.join(",") + ")");
        break;
      case "PtgBool":
        o.push(C[1] ? "TRUE" : "FALSE");
        break;
      case "PtgInt":
        o.push(C[1]);
        break;
      case "PtgNum":
        o.push(String(C[1]));
        break;
      case "PtgStr":
        o.push('"' + C[1].replace(/"/g, '""') + '"');
        break;
      case "PtgErr":
        o.push(C[1]);
        break;
      case "PtgAreaN":
        d = wa(C[1][1], t ? { s: t } : s, i), o.push(qn(d, i));
        break;
      case "PtgArea":
        d = wa(C[1][1], s, i), o.push(qn(d, i));
        break;
      case "PtgArea3d":
        h = C[1][1], d = C[1][2], v = Ma(n, h, i), o.push(v + "!" + qn(d, i));
        break;
      case "PtgAttrSum":
        o.push("SUM(" + o.pop() + ")");
        break;
      case "PtgAttrBaxcel":
      case "PtgAttrSemi":
        break;
      case "PtgName":
        x = C[1][2];
        var D = (n.names || [])[x - 1] || (n[0] || [])[x], H = D ? D.Name : "SH33TJSNAME" + String(x);
        H && H.slice(0, 6) == "_xlfn." && !i.xlfn && (H = H.slice(6)), o.push(H);
        break;
      case "PtgNameX":
        var M = C[1][1];
        x = C[1][2];
        var V;
        if (i.biff <= 5)
          M < 0 && (M = -M), n[M] && (V = n[M][x]);
        else {
          var G = "";
          if (((n[M] || [])[0] || [])[0] == 14849 || (((n[M] || [])[0] || [])[0] == 1025 ? n[M][x] && n[M][x].itab > 0 && (G = n.SheetNames[n[M][x].itab - 1] + "!") : G = n.SheetNames[x - 1] + "!"), n[M] && n[M][x])
            G += n[M][x].Name;
          else if (n[0] && n[0][x])
            G += n[0][x].Name;
          else {
            var j = (ps(n, M, i) || "").split(";;");
            j[x - 1] ? G = j[x - 1] : G += "SH33TJSERRX";
          }
          o.push(G);
          break;
        }
        V || (V = { Name: "SH33TJSERRY" }), o.push(V.Name);
        break;
      case "PtgParen":
        var re = "(", we = ")";
        if (u >= 0) {
          switch (g = "", e[0][u][1][0]) {
            case 2:
              re = Fe(" ", e[0][u][1][1]) + re;
              break;
            case 3:
              re = Fe("\r", e[0][u][1][1]) + re;
              break;
            case 4:
              we = Fe(" ", e[0][u][1][1]) + we;
              break;
            case 5:
              we = Fe("\r", e[0][u][1][1]) + we;
              break;
            default:
              if (i.WTF)
                throw new Error("Unexpected PtgAttrSpaceType " + e[0][u][1][0]);
          }
          u = -1;
        }
        o.push(re + o.pop() + we);
        break;
      case "PtgRefErr":
        o.push("#REF!");
        break;
      case "PtgRefErr3d":
        o.push("#REF!");
        break;
      case "PtgExp":
        l = { c: C[1][1], r: C[1][0] };
        var le = { c: t.c, r: t.r };
        if (n.sharedf[_e(l)]) {
          var He = n.sharedf[_e(l)];
          o.push(_r(He, s, le, n, i));
        } else {
          var De = !1;
          for (c = 0; c != n.arrayf.length; ++c)
            if (f = n.arrayf[c], !(l.c < f[0].s.c || l.c > f[0].e.c) && !(l.r < f[0].s.r || l.r > f[0].e.r)) {
              o.push(_r(f[1], s, le, n, i)), De = !0;
              break;
            }
          De || o.push(C[1]);
        }
        break;
      case "PtgArray":
        o.push("{" + n1(C[1]) + "}");
        break;
      case "PtgMemArea":
        break;
      case "PtgAttrSpace":
      case "PtgAttrSpaceSemi":
        u = S;
        break;
      case "PtgTbl":
        break;
      case "PtgMemErr":
        break;
      case "PtgMissArg":
        o.push("");
        break;
      case "PtgAreaErr":
        o.push("#REF!");
        break;
      case "PtgAreaErr3d":
        o.push("#REF!");
        break;
      case "PtgList":
        o.push("Table" + C[1].idx + "[#" + C[1].rt + "]");
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
        throw new Error("Unrecognized Formula Token: " + String(C));
      default:
        throw new Error("Unrecognized Formula Token: " + String(C));
    }
    var vt = ["PtgAttrSpace", "PtgAttrSpaceSemi", "PtgAttrGoto"];
    if (i.biff != 3 && u >= 0 && vt.indexOf(e[0][S][0]) == -1) {
      C = e[0][u];
      var Me = !0;
      switch (C[1][0]) {
        case 4:
          Me = !1;
        case 0:
          g = Fe(" ", C[1][1]);
          break;
        case 5:
          Me = !1;
        case 1:
          g = Fe("\r", C[1][1]);
          break;
        default:
          if (g = "", i.WTF)
            throw new Error("Unexpected PtgAttrSpaceType " + C[1][0]);
      }
      o.push((Me ? g : "") + o.pop() + (Me ? "" : g)), u = -1;
    }
  }
  if (o.length > 1 && i.WTF)
    throw new Error("bad formula stack");
  return o[0];
}
function s1(e) {
  if (e == null) {
    var r = B(8);
    return r.write_shift(1, 3), r.write_shift(1, 0), r.write_shift(2, 0), r.write_shift(2, 0), r.write_shift(2, 65535), r;
  } else if (typeof e == "number")
    return rr(e);
  return rr(0);
}
function o1(e, r, t, n, i) {
  var a = nr(r, t, i), s = s1(e.v), o = B(6), c = 33;
  o.write_shift(2, c), o.write_shift(4, 0);
  for (var f = B(e.bf.length), l = 0; l < e.bf.length; ++l)
    f[l] = e.bf[l];
  var h = Ve([a, s, o, f]);
  return h;
}
function Bn(e, r, t) {
  var n = e.read_shift(4), i = r1(e, n, t), a = e.read_shift(4), s = a > 0 ? t1(e, a, i, t) : null;
  return [i, s];
}
var f1 = Bn, bn = Bn, l1 = Bn, c1 = Bn, h1 = {
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
}, gs = {
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
}, u1 = {
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
function x1(e) {
  var r = "of:=" + e.replace(Oi, "$1[.$2$3$4$5]").replace(/\]:\[/g, ":");
  return r.replace(/;/g, "|").replace(/,/g, ";");
}
function d1(e) {
  return e.replace(/\./, "!");
}
var Br = typeof Map < "u";
function ki(e, r, t) {
  var n = 0, i = e.length;
  if (t) {
    if (Br ? t.has(r) : Object.prototype.hasOwnProperty.call(t, r)) {
      for (var a = Br ? t.get(r) : t[r]; n < a.length; ++n)
        if (e[a[n]].t === r)
          return e.Count++, a[n];
    }
  } else
    for (; n < i; ++n)
      if (e[n].t === r)
        return e.Count++, n;
  return e[i] = { t: r }, e.Count++, e.Unique++, t && (Br ? (t.has(r) || t.set(r, []), t.get(r).push(i)) : (Object.prototype.hasOwnProperty.call(t, r) || (t[r] = []), t[r].push(i))), i;
}
function Un(e, r) {
  var t = { min: e + 1, max: e + 1 }, n = -1;
  return r.MDW && (Pt = r.MDW), r.width != null ? t.customWidth = 1 : r.wpx != null ? n = Cn(r.wpx) : r.wch != null && (n = r.wch), n > -1 ? (t.width = si(n), t.customWidth = 1) : r.width != null && (t.width = r.width), r.hidden && (t.hidden = !0), r.level != null && (t.outlineLevel = t.level = r.level), t;
}
function vs(e, r) {
  if (!!e) {
    var t = [0.7, 0.7, 0.75, 0.75, 0.3, 0.3];
    r == "xlml" && (t = [1, 1, 1, 1, 0.5, 0.5]), e.left == null && (e.left = t[0]), e.right == null && (e.right = t[1]), e.top == null && (e.top = t[2]), e.bottom == null && (e.bottom = t[3]), e.header == null && (e.header = t[4]), e.footer == null && (e.footer = t[5]);
  }
}
function zt(e, r, t) {
  var n = t.revssf[r.z != null ? r.z : "General"], i = 60, a = e.length;
  if (n == null && t.ssf) {
    for (; i < 392; ++i)
      if (t.ssf[i] == null) {
        u0(r.z, i), t.ssf[i] = r.z, t.revssf[r.z] = n = i;
        break;
      }
  }
  for (i = 0; i != a; ++i)
    if (e[i].numFmtId === n)
      return i;
  return e[a] = {
    numFmtId: n,
    fontId: 0,
    fillId: 0,
    borderId: 0,
    xfId: 0,
    applyNumberFormat: 1
  }, a;
}
function p1(e, r, t) {
  if (e && e["!ref"]) {
    var n = Se(e["!ref"]);
    if (n.e.c < n.s.c || n.e.r < n.s.r)
      throw new Error("Bad range (" + t + "): " + e["!ref"]);
  }
}
function g1(e) {
  if (e.length === 0)
    return "";
  for (var r = '<mergeCells count="' + e.length + '">', t = 0; t != e.length; ++t)
    r += '<mergeCell ref="' + ke(e[t]) + '"/>';
  return r + "</mergeCells>";
}
function v1(e, r, t, n, i) {
  var a = !1, s = {}, o = null;
  if (n.bookType !== "xlsx" && r.vbaraw) {
    var c = r.SheetNames[t];
    try {
      r.Workbook && (c = r.Workbook.Sheets[t].CodeName || c);
    } catch {
    }
    a = !0, s.codeName = kt(me(c));
  }
  if (e && e["!outline"]) {
    var f = { summaryBelow: 1, summaryRight: 1 };
    e["!outline"].above && (f.summaryBelow = 0), e["!outline"].left && (f.summaryRight = 0), o = (o || "") + q("outlinePr", null, f);
  }
  !a && !o || (i[i.length] = q("sheetPr", o, s));
}
var m1 = ["objects", "scenarios", "selectLockedCells", "selectUnlockedCells"], _1 = [
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
function w1(e) {
  var r = { sheet: 1 };
  return m1.forEach(function(t) {
    e[t] != null && e[t] && (r[t] = "1");
  }), _1.forEach(function(t) {
    e[t] != null && !e[t] && (r[t] = "0");
  }), e.password && (r.password = es(e.password).toString(16).toUpperCase()), q("sheetProtection", null, r);
}
function T1(e) {
  return vs(e), q("pageMargins", null, e);
}
function E1(e, r) {
  for (var t = ["<cols>"], n, i = 0; i != r.length; ++i)
    !(n = r[i]) || (t[t.length] = q("col", null, Un(i, n)));
  return t[t.length] = "</cols>", t.join("");
}
function S1(e, r, t, n) {
  var i = typeof e.ref == "string" ? e.ref : ke(e.ref);
  t.Workbook || (t.Workbook = { Sheets: [] }), t.Workbook.Names || (t.Workbook.Names = []);
  var a = t.Workbook.Names, s = ht(i);
  s.s.r == s.e.r && (s.e.r = ht(r["!ref"]).e.r, i = ke(s));
  for (var o = 0; o < a.length; ++o) {
    var c = a[o];
    if (c.Name == "_xlnm._FilterDatabase" && c.Sheet == n) {
      c.Ref = "'" + t.SheetNames[n] + "'!" + i;
      break;
    }
  }
  return o == a.length && a.push({ Name: "_xlnm._FilterDatabase", Sheet: n, Ref: "'" + t.SheetNames[n] + "'!" + i }), q("autoFilter", null, { ref: i });
}
function y1(e, r, t, n) {
  var i = { workbookViewId: "0" };
  return (((n || {}).Workbook || {}).Views || [])[0] && (i.rightToLeft = n.Workbook.Views[0].RTL ? "1" : "0"), q("sheetViews", q("sheetView", null, i), {});
}
function A1(e, r, t, n) {
  if (e.c && t["!comments"].push([r, e.c]), e.v === void 0 && typeof e.f != "string" || e.t === "z" && !e.f)
    return "";
  var i = "", a = e.t, s = e.v;
  if (e.t !== "z")
    switch (e.t) {
      case "b":
        i = e.v ? "1" : "0";
        break;
      case "n":
        i = "" + e.v;
        break;
      case "e":
        i = jr[e.v];
        break;
      case "d":
        n && n.cellDates ? i = et(e.v, -1).toISOString() : (e = at(e), e.t = "n", i = "" + (e.v = it(et(e.v)))), typeof e.z > "u" && (e.z = Oe[14]);
        break;
      default:
        i = e.v;
        break;
    }
  var o = Ye("v", me(i)), c = { r }, f = zt(n.cellXfs, e, n);
  switch (f !== 0 && (c.s = f), e.t) {
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
        o = Ye("v", "" + ki(n.Strings, e.v, n.revStrings)), c.t = "s";
        break;
      }
      c.t = "str";
      break;
  }
  if (e.t != a && (e.t = a, e.v = s), typeof e.f == "string" && e.f) {
    var l = e.F && e.F.slice(0, r.length) == r ? { t: "array", ref: e.F } : null;
    o = q("f", me(e.f), l) + (e.v != null ? o : "");
  }
  return e.l && t["!links"].push([r, e.l]), e.D && (c.cm = 1), q("c", o, c);
}
function C1(e, r, t, n) {
  var i = [], a = [], s = Se(e["!ref"]), o = "", c, f = "", l = [], h = 0, x = 0, d = e["!rows"], v = Array.isArray(e), u = { r: f }, g, S = -1;
  for (x = s.s.c; x <= s.e.c; ++x)
    l[x] = je(x);
  for (h = s.s.r; h <= s.e.r; ++h) {
    for (a = [], f = Ge(h), x = s.s.c; x <= s.e.c; ++x) {
      c = l[x] + f;
      var A = v ? (e[h] || [])[x] : e[c];
      A !== void 0 && (o = A1(A, c, e, r)) != null && a.push(o);
    }
    (a.length > 0 || d && d[h]) && (u = { r: f }, d && d[h] && (g = d[h], g.hidden && (u.hidden = 1), S = -1, g.hpx ? S = Fn(g.hpx) : g.hpt && (S = g.hpt), S > -1 && (u.ht = S, u.customHeight = 1), g.level && (u.outlineLevel = g.level)), i[i.length] = q("row", a.join(""), u));
  }
  if (d)
    for (; h < d.length; ++h)
      d && d[h] && (u = { r: h + 1 }, g = d[h], g.hidden && (u.hidden = 1), S = -1, g.hpx ? S = Fn(g.hpx) : g.hpt && (S = g.hpt), S > -1 && (u.ht = S, u.customHeight = 1), g.level && (u.outlineLevel = g.level), i[i.length] = q("row", "", u));
  return i.join("");
}
function ms(e, r, t, n) {
  var i = [Re, q("worksheet", null, {
    xmlns: Er[0],
    "xmlns:r": Be.r
  })], a = t.SheetNames[e], s = 0, o = "", c = t.Sheets[a];
  c == null && (c = {});
  var f = c["!ref"] || "A1", l = Se(f);
  if (l.e.c > 16383 || l.e.r > 1048575) {
    if (r.WTF)
      throw new Error("Range " + f + " exceeds format limit A1:XFD1048576");
    l.e.c = Math.min(l.e.c, 16383), l.e.r = Math.min(l.e.c, 1048575), f = ke(l);
  }
  n || (n = {}), c["!comments"] = [];
  var h = [];
  v1(c, t, e, r, i), i[i.length] = q("dimension", null, { ref: f }), i[i.length] = y1(c, r, e, t), r.sheetFormat && (i[i.length] = q("sheetFormatPr", null, {
    defaultRowHeight: r.sheetFormat.defaultRowHeight || "16",
    baseColWidth: r.sheetFormat.baseColWidth || "10",
    outlineLevelRow: r.sheetFormat.outlineLevelRow || "7"
  })), c["!cols"] != null && c["!cols"].length > 0 && (i[i.length] = E1(c, c["!cols"])), i[s = i.length] = "<sheetData/>", c["!links"] = [], c["!ref"] != null && (o = C1(c, r), o.length > 0 && (i[i.length] = o)), i.length > s + 1 && (i[i.length] = "</sheetData>", i[s] = i[s].replace("/>", ">")), c["!protect"] && (i[i.length] = w1(c["!protect"])), c["!autofilter"] != null && (i[i.length] = S1(c["!autofilter"], c, t, e)), c["!merges"] != null && c["!merges"].length > 0 && (i[i.length] = g1(c["!merges"]));
  var x = -1, d, v = -1;
  return c["!links"].length > 0 && (i[i.length] = "<hyperlinks>", c["!links"].forEach(function(u) {
    !u[1].Target || (d = { ref: u[0] }, u[1].Target.charAt(0) != "#" && (v = ve(n, -1, me(u[1].Target).replace(/#.*$/, ""), xe.HLINK), d["r:id"] = "rId" + v), (x = u[1].Target.indexOf("#")) > -1 && (d.location = me(u[1].Target.slice(x + 1))), u[1].Tooltip && (d.tooltip = me(u[1].Tooltip)), i[i.length] = q("hyperlink", null, d));
  }), i[i.length] = "</hyperlinks>"), delete c["!links"], c["!margins"] != null && (i[i.length] = T1(c["!margins"])), (!r || r.ignoreEC || r.ignoreEC == null) && (i[i.length] = Ye("ignoredErrors", q("ignoredError", null, { numberStoredAsText: 1, sqref: f }))), h.length > 0 && (v = ve(n, -1, "../drawings/drawing" + (e + 1) + ".xml", xe.DRAW), i[i.length] = q("drawing", null, { "r:id": "rId" + v }), c["!drawing"] = h), c["!comments"].length > 0 && (v = ve(n, -1, "../drawings/vmlDrawing" + (e + 1) + ".vml", xe.VML), i[i.length] = q("legacyDrawing", null, { "r:id": "rId" + v }), c["!legacy"] = v), i.length > 1 && (i[i.length] = "</worksheet>", i[1] = i[1].replace("/>", ">")), i.join("");
}
function F1(e, r) {
  var t = {}, n = e.l + r;
  t.r = e.read_shift(4), e.l += 4;
  var i = e.read_shift(2);
  e.l += 1;
  var a = e.read_shift(1);
  return e.l = n, a & 7 && (t.level = a & 7), a & 16 && (t.hidden = !0), a & 32 && (t.hpt = i / 20), t;
}
function O1(e, r, t) {
  var n = B(145), i = (t["!rows"] || [])[e] || {};
  n.write_shift(4, e), n.write_shift(4, 0);
  var a = 320;
  i.hpx ? a = Fn(i.hpx) * 20 : i.hpt && (a = i.hpt * 20), n.write_shift(2, a), n.write_shift(1, 0);
  var s = 0;
  i.level && (s |= i.level), i.hidden && (s |= 16), (i.hpx || i.hpt) && (s |= 32), n.write_shift(1, s), n.write_shift(1, 0);
  var o = 0, c = n.l;
  n.l += 4;
  for (var f = { r: e, c: 0 }, l = 0; l < 16; ++l)
    if (!(r.s.c > l + 1 << 10 || r.e.c < l << 10)) {
      for (var h = -1, x = -1, d = l << 10; d < l + 1 << 10; ++d) {
        f.c = d;
        var v = Array.isArray(t) ? (t[f.r] || [])[f.c] : t[_e(f)];
        v && (h < 0 && (h = d), x = d);
      }
      h < 0 || (++o, n.write_shift(4, h), n.write_shift(4, x));
    }
  var u = n.l;
  return n.l = c, n.write_shift(4, o), n.l = u, n.length > n.l ? n.slice(0, n.l) : n;
}
function D1(e, r, t, n) {
  var i = O1(n, t, r);
  (i.length > 17 || (r["!rows"] || [])[n]) && W(e, 0, i);
}
var I1 = fr, k1 = yr;
function R1() {
}
function N1(e, r) {
  var t = {}, n = e[e.l];
  return ++e.l, t.above = !(n & 64), t.left = !(n & 128), e.l += 18, t.name = Vl(e), t;
}
function L1(e, r, t) {
  t == null && (t = B(84 + 4 * e.length));
  var n = 192;
  r && (r.above && (n &= -65), r.left && (n &= -129)), t.write_shift(1, n);
  for (var i = 1; i < 3; ++i)
    t.write_shift(1, 0);
  return Sn({ auto: 1 }, t), t.write_shift(-4, -1), t.write_shift(-4, -1), N0(e, t), t.slice(0, t.l);
}
function P1(e) {
  var r = gt(e);
  return [r];
}
function M1(e, r, t) {
  return t == null && (t = B(8)), ar(r, t);
}
function B1(e) {
  var r = sr(e);
  return [r];
}
function b1(e, r, t) {
  return t == null && (t = B(4)), or(r, t);
}
function U1(e) {
  var r = gt(e), t = e.read_shift(1);
  return [r, t, "b"];
}
function H1(e, r, t) {
  return t == null && (t = B(9)), ar(r, t), t.write_shift(1, e.v ? 1 : 0), t;
}
function W1(e) {
  var r = sr(e), t = e.read_shift(1);
  return [r, t, "b"];
}
function X1(e, r, t) {
  return t == null && (t = B(5)), or(r, t), t.write_shift(1, e.v ? 1 : 0), t;
}
function V1(e) {
  var r = gt(e), t = e.read_shift(1);
  return [r, t, "e"];
}
function Y1(e, r, t) {
  return t == null && (t = B(9)), ar(r, t), t.write_shift(1, e.v), t;
}
function G1(e) {
  var r = sr(e), t = e.read_shift(1);
  return [r, t, "e"];
}
function $1(e, r, t) {
  return t == null && (t = B(8)), or(r, t), t.write_shift(1, e.v), t.write_shift(2, 0), t.write_shift(1, 0), t;
}
function z1(e) {
  var r = gt(e), t = e.read_shift(4);
  return [r, t, "s"];
}
function j1(e, r, t) {
  return t == null && (t = B(12)), ar(r, t), t.write_shift(4, r.v), t;
}
function K1(e) {
  var r = sr(e), t = e.read_shift(4);
  return [r, t, "s"];
}
function q1(e, r, t) {
  return t == null && (t = B(8)), or(r, t), t.write_shift(4, r.v), t;
}
function J1(e) {
  var r = gt(e), t = Ar(e);
  return [r, t, "n"];
}
function Z1(e, r, t) {
  return t == null && (t = B(16)), ar(r, t), rr(e.v, t), t;
}
function Q1(e) {
  var r = sr(e), t = Ar(e);
  return [r, t, "n"];
}
function ex(e, r, t) {
  return t == null && (t = B(12)), or(r, t), rr(e.v, t), t;
}
function tx(e) {
  var r = gt(e), t = L0(e);
  return [r, t, "n"];
}
function rx(e, r, t) {
  return t == null && (t = B(12)), ar(r, t), P0(e.v, t), t;
}
function nx(e) {
  var r = sr(e), t = L0(e);
  return [r, t, "n"];
}
function ix(e, r, t) {
  return t == null && (t = B(8)), or(r, t), P0(e.v, t), t;
}
function ax(e) {
  var r = gt(e), t = Si(e);
  return [r, t, "is"];
}
function sx(e) {
  var r = gt(e), t = Ke(e);
  return [r, t, "str"];
}
function ox(e, r, t) {
  return t == null && (t = B(12 + 4 * e.v.length)), ar(r, t), Ue(e.v, t), t.length > t.l ? t.slice(0, t.l) : t;
}
function fx(e) {
  var r = sr(e), t = Ke(e);
  return [r, t, "str"];
}
function lx(e, r, t) {
  return t == null && (t = B(8 + 4 * e.v.length)), or(r, t), Ue(e.v, t), t.length > t.l ? t.slice(0, t.l) : t;
}
function cx(e, r, t) {
  var n = e.l + r, i = gt(e);
  i.r = t["!row"];
  var a = e.read_shift(1), s = [i, a, "b"];
  if (t.cellFormula) {
    e.l += 2;
    var o = bn(e, n - e.l, t);
    s[3] = _r(o, null, i, t.supbooks, t);
  } else
    e.l = n;
  return s;
}
function hx(e, r, t) {
  var n = e.l + r, i = gt(e);
  i.r = t["!row"];
  var a = e.read_shift(1), s = [i, a, "e"];
  if (t.cellFormula) {
    e.l += 2;
    var o = bn(e, n - e.l, t);
    s[3] = _r(o, null, i, t.supbooks, t);
  } else
    e.l = n;
  return s;
}
function ux(e, r, t) {
  var n = e.l + r, i = gt(e);
  i.r = t["!row"];
  var a = Ar(e), s = [i, a, "n"];
  if (t.cellFormula) {
    e.l += 2;
    var o = bn(e, n - e.l, t);
    s[3] = _r(o, null, i, t.supbooks, t);
  } else
    e.l = n;
  return s;
}
function xx(e, r, t) {
  var n = e.l + r, i = gt(e);
  i.r = t["!row"];
  var a = Ke(e), s = [i, a, "str"];
  if (t.cellFormula) {
    e.l += 2;
    var o = bn(e, n - e.l, t);
    s[3] = _r(o, null, i, t.supbooks, t);
  } else
    e.l = n;
  return s;
}
var dx = fr, px = yr;
function gx(e, r) {
  return r == null && (r = B(4)), r.write_shift(4, e), r;
}
function vx(e, r) {
  var t = e.l + r, n = fr(e), i = yi(e), a = Ke(e), s = Ke(e), o = Ke(e);
  e.l = t;
  var c = { rfx: n, relId: i, loc: a, display: o };
  return s && (c.Tooltip = s), c;
}
function mx(e, r) {
  var t = B(50 + 4 * (e[1].Target.length + (e[1].Tooltip || "").length));
  yr({ s: be(e[0]), e: be(e[0]) }, t), Ai("rId" + r, t);
  var n = e[1].Target.indexOf("#"), i = n == -1 ? "" : e[1].Target.slice(n + 1);
  return Ue(i || "", t), Ue(e[1].Tooltip || "", t), Ue("", t), t.slice(0, t.l);
}
function _x() {
}
function wx(e, r, t) {
  var n = e.l + r, i = M0(e), a = e.read_shift(1), s = [i];
  if (s[2] = a, t.cellFormula) {
    var o = f1(e, n - e.l, t);
    s[1] = o;
  } else
    e.l = n;
  return s;
}
function Tx(e, r, t) {
  var n = e.l + r, i = fr(e), a = [i];
  if (t.cellFormula) {
    var s = c1(e, n - e.l, t);
    a[1] = s, e.l = n;
  } else
    e.l = n;
  return a;
}
function Ex(e, r, t) {
  t == null && (t = B(18));
  var n = Un(e, r);
  t.write_shift(-4, e), t.write_shift(-4, e), t.write_shift(4, (n.width || 10) * 256), t.write_shift(4, 0);
  var i = 0;
  return r.hidden && (i |= 1), typeof n.width == "number" && (i |= 2), r.level && (i |= r.level << 8), t.write_shift(2, i), t;
}
var _s = ["left", "right", "top", "bottom", "header", "footer"];
function Sx(e) {
  var r = {};
  return _s.forEach(function(t) {
    r[t] = Ar(e);
  }), r;
}
function yx(e, r) {
  return r == null && (r = B(6 * 8)), vs(e), _s.forEach(function(t) {
    rr(e[t], r);
  }), r;
}
function Ax(e) {
  var r = e.read_shift(2);
  return e.l += 28, { RTL: r & 32 };
}
function Cx(e, r, t) {
  t == null && (t = B(30));
  var n = 924;
  return (((r || {}).Views || [])[0] || {}).RTL && (n |= 32), t.write_shift(2, n), t.write_shift(4, 0), t.write_shift(4, 0), t.write_shift(4, 0), t.write_shift(1, 0), t.write_shift(1, 0), t.write_shift(2, 0), t.write_shift(2, 100), t.write_shift(2, 0), t.write_shift(2, 0), t.write_shift(2, 0), t.write_shift(4, 0), t;
}
function Fx(e) {
  var r = B(24);
  return r.write_shift(4, 4), r.write_shift(4, 1), yr(e, r), r;
}
function Ox(e, r) {
  return r == null && (r = B(16 * 4 + 2)), r.write_shift(2, e.password ? es(e.password) : 0), r.write_shift(4, 1), [
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
  ].forEach(function(t) {
    t[1] ? r.write_shift(4, e[t[0]] != null && !e[t[0]] ? 1 : 0) : r.write_shift(4, e[t[0]] != null && e[t[0]] ? 0 : 1);
  }), r;
}
function Dx() {
}
function Ix() {
}
function kx(e, r, t, n, i, a, s) {
  if (r.v === void 0)
    return !1;
  var o = "";
  switch (r.t) {
    case "b":
      o = r.v ? "1" : "0";
      break;
    case "d":
      r = at(r), r.z = r.z || Oe[14], r.v = it(et(r.v)), r.t = "n";
      break;
    case "n":
    case "e":
      o = "" + r.v;
      break;
    default:
      o = r.v;
      break;
  }
  var c = { r: t, c: n };
  switch (c.s = zt(i.cellXfs, r, i), r.l && a["!links"].push([_e(c), r.l]), r.c && a["!comments"].push([_e(c), r.c]), r.t) {
    case "s":
    case "str":
      return i.bookSST ? (o = ki(i.Strings, r.v, i.revStrings), c.t = "s", c.v = o, s ? W(e, 18, q1(r, c)) : W(e, 7, j1(r, c))) : (c.t = "str", s ? W(e, 17, lx(r, c)) : W(e, 6, ox(r, c))), !0;
    case "n":
      return r.v == (r.v | 0) && r.v > -1e3 && r.v < 1e3 ? s ? W(e, 13, ix(r, c)) : W(e, 2, rx(r, c)) : s ? W(e, 16, ex(r, c)) : W(e, 5, Z1(r, c)), !0;
    case "b":
      return c.t = "b", s ? W(e, 15, X1(r, c)) : W(e, 4, H1(r, c)), !0;
    case "e":
      return c.t = "e", s ? W(e, 14, $1(r, c)) : W(e, 3, Y1(r, c)), !0;
  }
  return s ? W(e, 12, b1(r, c)) : W(e, 1, M1(r, c)), !0;
}
function Rx(e, r, t, n) {
  var i = Se(r["!ref"] || "A1"), a, s = "", o = [];
  W(e, 145);
  var c = Array.isArray(r), f = i.e.r;
  r["!rows"] && (f = Math.max(i.e.r, r["!rows"].length - 1));
  for (var l = i.s.r; l <= f; ++l) {
    s = Ge(l), D1(e, r, i, l);
    var h = !1;
    if (l <= i.e.r)
      for (var x = i.s.c; x <= i.e.c; ++x) {
        l === i.s.r && (o[x] = je(x)), a = o[x] + s;
        var d = c ? (r[l] || [])[x] : r[a];
        if (!d) {
          h = !1;
          continue;
        }
        h = kx(e, d, l, x, n, r, h);
      }
  }
  W(e, 146);
}
function Nx(e, r) {
  !r || !r["!merges"] || (W(e, 177, gx(r["!merges"].length)), r["!merges"].forEach(function(t) {
    W(e, 176, px(t));
  }), W(e, 178));
}
function Lx(e, r) {
  !r || !r["!cols"] || (W(e, 390), r["!cols"].forEach(function(t, n) {
    t && W(e, 60, Ex(n, t));
  }), W(e, 391));
}
function Px(e, r) {
  !r || !r["!ref"] || (W(e, 648), W(e, 649, Fx(Se(r["!ref"]))), W(e, 650));
}
function Mx(e, r, t) {
  r["!links"].forEach(function(n) {
    if (!!n[1].Target) {
      var i = ve(t, -1, n[1].Target.replace(/#.*$/, ""), xe.HLINK);
      W(e, 494, mx(n, i));
    }
  }), delete r["!links"];
}
function Bx(e, r, t, n) {
  if (r["!comments"].length > 0) {
    var i = ve(n, -1, "../drawings/vmlDrawing" + (t + 1) + ".vml", xe.VML);
    W(e, 551, Ai("rId" + i)), r["!legacy"] = i;
  }
}
function bx(e, r, t, n) {
  if (!!r["!autofilter"]) {
    var i = r["!autofilter"], a = typeof i.ref == "string" ? i.ref : ke(i.ref);
    t.Workbook || (t.Workbook = { Sheets: [] }), t.Workbook.Names || (t.Workbook.Names = []);
    var s = t.Workbook.Names, o = ht(a);
    o.s.r == o.e.r && (o.e.r = ht(r["!ref"]).e.r, a = ke(o));
    for (var c = 0; c < s.length; ++c) {
      var f = s[c];
      if (f.Name == "_xlnm._FilterDatabase" && f.Sheet == n) {
        f.Ref = "'" + t.SheetNames[n] + "'!" + a;
        break;
      }
    }
    c == s.length && s.push({ Name: "_xlnm._FilterDatabase", Sheet: n, Ref: "'" + t.SheetNames[n] + "'!" + a }), W(e, 161, yr(Se(a))), W(e, 162);
  }
}
function Ux(e, r, t) {
  W(e, 133), W(e, 137, Cx(r, t)), W(e, 138), W(e, 134);
}
function Hx(e, r) {
  !r["!protect"] || W(e, 535, Ox(r["!protect"]));
}
function Wx(e, r, t, n) {
  var i = nt(), a = t.SheetNames[e], s = t.Sheets[a] || {}, o = a;
  try {
    t && t.Workbook && (o = t.Workbook.Sheets[e].CodeName || o);
  } catch {
  }
  var c = Se(s["!ref"] || "A1");
  if (c.e.c > 16383 || c.e.r > 1048575) {
    if (r.WTF)
      throw new Error("Range " + (s["!ref"] || "A1") + " exceeds format limit A1:XFD1048576");
    c.e.c = Math.min(c.e.c, 16383), c.e.r = Math.min(c.e.c, 1048575);
  }
  return s["!links"] = [], s["!comments"] = [], W(i, 129), (t.vbaraw || s["!outline"]) && W(i, 147, L1(o, s["!outline"])), W(i, 148, k1(c)), Ux(i, s, t.Workbook), Lx(i, s), Rx(i, s, e, r), Hx(i, s), bx(i, s, t, e), Nx(i, s), Mx(i, s, n), s["!margins"] && W(i, 476, yx(s["!margins"])), (!r || r.ignoreEC || r.ignoreEC == null) && Px(i, s), Bx(i, s, e, n), W(i, 130), i.end();
}
function Xx(e, r) {
  e.l += 10;
  var t = Ke(e);
  return { name: t };
}
var Vx = [
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
function Yx(e) {
  return !e.Workbook || !e.Workbook.WBProps ? "false" : Tl(e.Workbook.WBProps.date1904) ? "true" : "false";
}
var Gx = /* @__PURE__ */ "][*?/\\".split("");
function ws(e, r) {
  if (e.length > 31) {
    if (r)
      return !1;
    throw new Error("Sheet names cannot exceed 31 chars");
  }
  var t = !0;
  return Gx.forEach(function(n) {
    if (e.indexOf(n) != -1) {
      if (!r)
        throw new Error("Sheet name cannot contain : \\ / ? * [ ]");
      t = !1;
    }
  }), t;
}
function $x(e, r, t) {
  e.forEach(function(n, i) {
    ws(n);
    for (var a = 0; a < i; ++a)
      if (n == e[a])
        throw new Error("Duplicate Sheet Name: " + n);
    if (t) {
      var s = r && r[i] && r[i].CodeName || n;
      if (s.charCodeAt(0) == 95 && s.length > 22)
        throw new Error("Bad Code Name: Worksheet" + s);
    }
  });
}
function zx(e) {
  if (!e || !e.SheetNames || !e.Sheets)
    throw new Error("Invalid Workbook");
  if (!e.SheetNames.length)
    throw new Error("Workbook is empty");
  var r = e.Workbook && e.Workbook.Sheets || [];
  $x(e.SheetNames, r, !!e.vbaraw);
  for (var t = 0; t < e.SheetNames.length; ++t)
    p1(e.Sheets[e.SheetNames[t]], e.SheetNames[t], t);
}
function Ts(e) {
  var r = [Re];
  r[r.length] = q("workbook", null, {
    xmlns: Er[0],
    "xmlns:r": Be.r
  });
  var t = e.Workbook && (e.Workbook.Names || []).length > 0, n = { codeName: "ThisWorkbook" };
  e.Workbook && e.Workbook.WBProps && (Vx.forEach(function(o) {
    e.Workbook.WBProps[o[0]] != null && e.Workbook.WBProps[o[0]] != o[1] && (n[o[0]] = e.Workbook.WBProps[o[0]]);
  }), e.Workbook.WBProps.CodeName && (n.codeName = e.Workbook.WBProps.CodeName, delete n.CodeName)), r[r.length] = q("workbookPr", null, n);
  var i = e.Workbook && e.Workbook.Sheets || [], a = 0;
  if (i && i[0] && !!i[0].Hidden) {
    for (r[r.length] = "<bookViews>", a = 0; a != e.SheetNames.length && !(!i[a] || !i[a].Hidden); ++a)
      ;
    a == e.SheetNames.length && (a = 0), r[r.length] = '<workbookView firstSheet="' + a + '" activeTab="' + a + '"/>', r[r.length] = "</bookViews>";
  }
  for (r[r.length] = "<sheets>", a = 0; a != e.SheetNames.length; ++a) {
    var s = { name: me(e.SheetNames[a].slice(0, 31)) };
    if (s.sheetId = "" + (a + 1), s["r:id"] = "rId" + (a + 1), i[a])
      switch (i[a].Hidden) {
        case 1:
          s.state = "hidden";
          break;
        case 2:
          s.state = "veryHidden";
          break;
      }
    r[r.length] = q("sheet", null, s);
  }
  return r[r.length] = "</sheets>", t && (r[r.length] = "<definedNames>", e.Workbook && e.Workbook.Names && e.Workbook.Names.forEach(function(o) {
    var c = { name: o.Name };
    o.Comment && (c.comment = o.Comment), o.Sheet != null && (c.localSheetId = "" + o.Sheet), o.Hidden && (c.hidden = "1"), o.Ref && (r[r.length] = q("definedName", me(o.Ref), c));
  }), r[r.length] = "</definedNames>"), r.length > 2 && (r[r.length] = "</workbook>", r[1] = r[1].replace("/>", ">")), r.join("");
}
function jx(e, r) {
  var t = {};
  return t.Hidden = e.read_shift(4), t.iTabID = e.read_shift(4), t.strRelID = ai(e), t.name = Ke(e), t;
}
function Kx(e, r) {
  return r || (r = B(127)), r.write_shift(4, e.Hidden), r.write_shift(4, e.iTabID), Ai(e.strRelID, r), Ue(e.name.slice(0, 31), r), r.length > r.l ? r.slice(0, r.l) : r;
}
function qx(e, r) {
  var t = {}, n = e.read_shift(4);
  t.defaultThemeVersion = e.read_shift(4);
  var i = r > 8 ? Ke(e) : "";
  return i.length > 0 && (t.CodeName = i), t.autoCompressPictures = !!(n & 65536), t.backupFile = !!(n & 64), t.checkCompatibility = !!(n & 4096), t.date1904 = !!(n & 1), t.filterPrivacy = !!(n & 8), t.hidePivotFieldList = !!(n & 1024), t.promptedSolutions = !!(n & 16), t.publishItems = !!(n & 2048), t.refreshAllConnections = !!(n & 262144), t.saveExternalLinkValues = !!(n & 128), t.showBorderUnselectedTables = !!(n & 4), t.showInkAnnotation = !!(n & 32), t.showObjects = ["all", "placeholders", "none"][n >> 13 & 3], t.showPivotChartFilter = !!(n & 32768), t.updateLinks = ["userSet", "never", "always"][n >> 8 & 3], t;
}
function Jx(e, r) {
  r || (r = B(72));
  var t = 0;
  return e && e.filterPrivacy && (t |= 8), r.write_shift(4, t), r.write_shift(4, 0), N0(e && e.CodeName || "ThisWorkbook", r), r.slice(0, r.l);
}
function Zx(e, r, t) {
  var n = e.l + r;
  e.l += 4, e.l += 1;
  var i = e.read_shift(4), a = Yl(e), s = l1(e, 0, t), o = yi(e);
  e.l = n;
  var c = { Name: a, Ptg: s };
  return i < 268435455 && (c.Sheet = i), o && (c.Comment = o), c;
}
function Qx(e, r) {
  W(e, 143);
  for (var t = 0; t != r.SheetNames.length; ++t) {
    var n = r.Workbook && r.Workbook.Sheets && r.Workbook.Sheets[t] && r.Workbook.Sheets[t].Hidden || 0, i = { Hidden: n, iTabID: t + 1, strRelID: "rId" + (t + 1), name: r.SheetNames[t] };
    W(e, 156, Kx(i));
  }
  W(e, 144);
}
function ed(e, r) {
  r || (r = B(127));
  for (var t = 0; t != 4; ++t)
    r.write_shift(4, 0);
  return Ue("SheetJS", r), Ue(gn.version, r), Ue(gn.version, r), Ue("7262", r), r.length > r.l ? r.slice(0, r.l) : r;
}
function td(e, r) {
  r || (r = B(29)), r.write_shift(-4, 0), r.write_shift(-4, 460), r.write_shift(4, 28800), r.write_shift(4, 17600), r.write_shift(4, 500), r.write_shift(4, e), r.write_shift(4, e);
  var t = 120;
  return r.write_shift(1, t), r.length > r.l ? r.slice(0, r.l) : r;
}
function rd(e, r) {
  if (!(!r.Workbook || !r.Workbook.Sheets)) {
    for (var t = r.Workbook.Sheets, n = 0, i = -1, a = -1; n < t.length; ++n)
      !t[n] || !t[n].Hidden && i == -1 ? i = n : t[n].Hidden == 1 && a == -1 && (a = n);
    a > i || (W(e, 135), W(e, 158, td(i)), W(e, 136));
  }
}
function nd(e, r) {
  var t = nt();
  return W(t, 131), W(t, 128, ed()), W(t, 153, Jx(e.Workbook && e.Workbook.WBProps || null)), rd(t, e), Qx(t, e), W(t, 132), t.end();
}
function id(e, r, t) {
  return (r.slice(-4) === ".bin" ? nd : Ts)(e);
}
function ad(e, r, t, n, i) {
  return (r.slice(-4) === ".bin" ? Wx : ms)(e, t, n, i);
}
function sd(e, r, t) {
  return (r.slice(-4) === ".bin" ? yh : ns)(e, t);
}
function od(e, r, t) {
  return (r.slice(-4) === ".bin" ? Jc : Q0)(e, t);
}
function fd(e, r, t) {
  return (r.slice(-4) === ".bin" ? Hh : fs)(e);
}
function ld(e) {
  return (e.slice(-4) === ".bin" ? Rh : ss)();
}
function cd(e, r) {
  var t = [];
  return e.Props && t.push(sc(e.Props, r)), e.Custprops && t.push(oc(e.Props, e.Custprops)), t.join("");
}
function hd() {
  return "";
}
function ud(e, r) {
  var t = ['<Style ss:ID="Default" ss:Name="Normal"><NumberFormat/></Style>'];
  return r.cellXfs.forEach(function(n, i) {
    var a = [];
    a.push(q("NumberFormat", null, { "ss:Format": me(Oe[n.numFmtId]) }));
    var s = { "ss:ID": "s" + (21 + i) };
    t.push(q("Style", a.join(""), s));
  }), q("Styles", t.join(""));
}
function Es(e) {
  return q("NamedRange", null, { "ss:Name": e.Name, "ss:RefersTo": "=" + Di(e.Ref, { r: 0, c: 0 }) });
}
function xd(e) {
  if (!((e || {}).Workbook || {}).Names)
    return "";
  for (var r = e.Workbook.Names, t = [], n = 0; n < r.length; ++n) {
    var i = r[n];
    i.Sheet == null && (i.Name.match(/^_xlfn\./) || t.push(Es(i)));
  }
  return q("Names", t.join(""));
}
function dd(e, r, t, n) {
  if (!e || !((n || {}).Workbook || {}).Names)
    return "";
  for (var i = n.Workbook.Names, a = [], s = 0; s < i.length; ++s) {
    var o = i[s];
    o.Sheet == t && (o.Name.match(/^_xlfn\./) || a.push(Es(o)));
  }
  return a.join("");
}
function pd(e, r, t, n) {
  if (!e)
    return "";
  var i = [];
  if (e["!margins"] && (i.push("<PageSetup>"), e["!margins"].header && i.push(q("Header", null, { "x:Margin": e["!margins"].header })), e["!margins"].footer && i.push(q("Footer", null, { "x:Margin": e["!margins"].footer })), i.push(q("PageMargins", null, {
    "x:Bottom": e["!margins"].bottom || "0.75",
    "x:Left": e["!margins"].left || "0.7",
    "x:Right": e["!margins"].right || "0.7",
    "x:Top": e["!margins"].top || "0.75"
  })), i.push("</PageSetup>")), n && n.Workbook && n.Workbook.Sheets && n.Workbook.Sheets[t])
    if (n.Workbook.Sheets[t].Hidden)
      i.push(q("Visible", n.Workbook.Sheets[t].Hidden == 1 ? "SheetHidden" : "SheetVeryHidden", {}));
    else {
      for (var a = 0; a < t && !(n.Workbook.Sheets[a] && !n.Workbook.Sheets[a].Hidden); ++a)
        ;
      a == t && i.push("<Selected/>");
    }
  return ((((n || {}).Workbook || {}).Views || [])[0] || {}).RTL && i.push("<DisplayRightToLeft/>"), e["!protect"] && (i.push(Ye("ProtectContents", "True")), e["!protect"].objects && i.push(Ye("ProtectObjects", "True")), e["!protect"].scenarios && i.push(Ye("ProtectScenarios", "True")), e["!protect"].selectLockedCells != null && !e["!protect"].selectLockedCells ? i.push(Ye("EnableSelection", "NoSelection")) : e["!protect"].selectUnlockedCells != null && !e["!protect"].selectUnlockedCells && i.push(Ye("EnableSelection", "UnlockedCells")), [
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
    e["!protect"][s[0]] && i.push("<" + s[1] + "/>");
  })), i.length == 0 ? "" : q("WorksheetOptions", i.join(""), { xmlns: lt.x });
}
function gd(e) {
  return e.map(function(r) {
    var t = wl(r.t || ""), n = q("ss:Data", t, { xmlns: "http://www.w3.org/TR/REC-html40" });
    return q("Comment", n, { "ss:Author": r.a });
  }).join("");
}
function vd(e, r, t, n, i, a, s) {
  if (!e || e.v == null && e.f == null)
    return "";
  var o = {};
  if (e.f && (o["ss:Formula"] = "=" + me(Di(e.f, s))), e.F && e.F.slice(0, r.length) == r) {
    var c = be(e.F.slice(r.length + 1));
    o["ss:ArrayRange"] = "RC:R" + (c.r == s.r ? "" : "[" + (c.r - s.r) + "]") + "C" + (c.c == s.c ? "" : "[" + (c.c - s.c) + "]");
  }
  if (e.l && e.l.Target && (o["ss:HRef"] = me(e.l.Target), e.l.Tooltip && (o["x:HRefScreenTip"] = me(e.l.Tooltip))), t["!merges"])
    for (var f = t["!merges"], l = 0; l != f.length; ++l)
      f[l].s.c != s.c || f[l].s.r != s.r || (f[l].e.c > f[l].s.c && (o["ss:MergeAcross"] = f[l].e.c - f[l].s.c), f[l].e.r > f[l].s.r && (o["ss:MergeDown"] = f[l].e.r - f[l].s.r));
  var h = "", x = "";
  switch (e.t) {
    case "z":
      if (!n.sheetStubs)
        return "";
      break;
    case "n":
      h = "Number", x = String(e.v);
      break;
    case "b":
      h = "Boolean", x = e.v ? "1" : "0";
      break;
    case "e":
      h = "Error", x = jr[e.v];
      break;
    case "d":
      h = "DateTime", x = new Date(e.v).toISOString(), e.z == null && (e.z = e.z || Oe[14]);
      break;
    case "s":
      h = "String", x = _l(e.v || "");
      break;
  }
  var d = zt(n.cellXfs, e, n);
  o["ss:StyleID"] = "s" + (21 + d), o["ss:Index"] = s.c + 1;
  var v = e.v != null ? x : "", u = e.t == "z" ? "" : '<Data ss:Type="' + h + '">' + v + "</Data>";
  return (e.c || []).length > 0 && (u += gd(e.c)), q("Cell", u, o);
}
function md(e, r) {
  var t = '<Row ss:Index="' + (e + 1) + '"';
  return r && (r.hpt && !r.hpx && (r.hpx = rs(r.hpt)), r.hpx && (t += ' ss:AutoFitHeight="0" ss:Height="' + r.hpx + '"'), r.hidden && (t += ' ss:Hidden="1"')), t + ">";
}
function _d(e, r, t, n) {
  if (!e["!ref"])
    return "";
  var i = Se(e["!ref"]), a = e["!merges"] || [], s = 0, o = [];
  e["!cols"] && e["!cols"].forEach(function(g, S) {
    Fi(g);
    var A = !!g.width, C = Un(S, g), I = { "ss:Index": S + 1 };
    A && (I["ss:Width"] = An(C.width)), g.hidden && (I["ss:Hidden"] = "1"), o.push(q("Column", null, I));
  });
  for (var c = Array.isArray(e), f = i.s.r; f <= i.e.r; ++f) {
    for (var l = [md(f, (e["!rows"] || [])[f])], h = i.s.c; h <= i.e.c; ++h) {
      var x = !1;
      for (s = 0; s != a.length; ++s)
        if (!(a[s].s.c > h) && !(a[s].s.r > f) && !(a[s].e.c < h) && !(a[s].e.r < f)) {
          (a[s].s.c != h || a[s].s.r != f) && (x = !0);
          break;
        }
      if (!x) {
        var d = { r: f, c: h }, v = _e(d), u = c ? (e[f] || [])[h] : e[v];
        l.push(vd(u, v, e, r, t, n, d));
      }
    }
    l.push("</Row>"), l.length > 2 && o.push(l.join(""));
  }
  return o.join("");
}
function wd(e, r, t) {
  var n = [], i = t.SheetNames[e], a = t.Sheets[i], s = a ? dd(a, r, e, t) : "";
  return s.length > 0 && n.push("<Names>" + s + "</Names>"), s = a ? _d(a, r, e, t) : "", s.length > 0 && n.push("<Table>" + s + "</Table>"), n.push(pd(a, r, e, t)), n.join("");
}
function Td(e, r) {
  r || (r = {}), e.SSF || (e.SSF = at(Oe)), e.SSF && (Ln(), Nn(e.SSF), r.revssf = Pn(e.SSF), r.revssf[e.SSF[65535]] = 0, r.ssf = e.SSF, r.cellXfs = [], zt(r.cellXfs, {}, { revssf: { General: 0 } }));
  var t = [];
  t.push(cd(e, r)), t.push(hd()), t.push(""), t.push("");
  for (var n = 0; n < e.SheetNames.length; ++n)
    t.push(q("Worksheet", wd(n, r, e), { "ss:Name": me(e.SheetNames[n]) }));
  return t[2] = ud(e, r), t[3] = xd(e), Re + q("Workbook", t.join(""), {
    xmlns: lt.ss,
    "xmlns:o": lt.o,
    "xmlns:x": lt.x,
    "xmlns:ss": lt.ss,
    "xmlns:dt": lt.dt,
    "xmlns:html": lt.html
  });
}
var Qn = {
  SI: "e0859ff2f94f6810ab9108002b27b3d9",
  DSI: "02d5cdd59c2e1b10939708002b2cf9ae",
  UDI: "05d5cdd59c2e1b10939708002b2cf9ae"
};
function Ed(e, r) {
  var t = [], n = [], i = [], a = 0, s, o = la(Ea, "n"), c = la(Sa, "n");
  if (e.Props)
    for (s = $e(e.Props), a = 0; a < s.length; ++a)
      (Object.prototype.hasOwnProperty.call(o, s[a]) ? t : Object.prototype.hasOwnProperty.call(c, s[a]) ? n : i).push([s[a], e.Props[s[a]]]);
  if (e.Custprops)
    for (s = $e(e.Custprops), a = 0; a < s.length; ++a)
      Object.prototype.hasOwnProperty.call(e.Props || {}, s[a]) || (Object.prototype.hasOwnProperty.call(o, s[a]) ? t : Object.prototype.hasOwnProperty.call(c, s[a]) ? n : i).push([s[a], e.Custprops[s[a]]]);
  var f = [];
  for (a = 0; a < i.length; ++a)
    $0.indexOf(i[a][0]) > -1 || V0.indexOf(i[a][0]) > -1 || i[a][1] != null && f.push(i[a]);
  n.length && Te.utils.cfb_add(r, "/SummaryInformation", Oa(n, Qn.SI, c, Sa)), (t.length || f.length) && Te.utils.cfb_add(r, "/DocumentSummaryInformation", Oa(t, Qn.DSI, o, Ea, f.length ? f : null, Qn.UDI));
}
function Sd(e, r) {
  var t = r || {}, n = Te.utils.cfb_new({ root: "R" }), i = "/Workbook";
  switch (t.bookType || "xls") {
    case "xls":
      t.bookType = "biff8";
    case "xla":
      t.bookType || (t.bookType = "xla");
    case "biff8":
      i = "/Workbook", t.biff = 8;
      break;
    case "biff5":
      i = "/Book", t.biff = 5;
      break;
    default:
      throw new Error("invalid type " + t.bookType + " for XLS CFB");
  }
  return Te.utils.cfb_add(n, i, Ss(e, t)), t.biff == 8 && (e.Props || e.Custprops) && Ed(e, n), t.biff == 8 && e.vbaraw && Wh(n, Te.read(e.vbaraw, { type: typeof e.vbaraw == "string" ? "binary" : "buffer" })), n;
}
var yd = {
  0: { f: F1 },
  1: { f: P1 },
  2: { f: tx },
  3: { f: V1 },
  4: { f: U1 },
  5: { f: J1 },
  6: { f: sx },
  7: { f: z1 },
  8: { f: xx },
  9: { f: ux },
  10: { f: cx },
  11: { f: hx },
  12: { f: B1 },
  13: { f: nx },
  14: { f: G1 },
  15: { f: W1 },
  16: { f: Q1 },
  17: { f: fx },
  18: { f: K1 },
  19: { f: Si },
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
  39: { f: Zx },
  40: {},
  42: {},
  43: { f: sh },
  44: { f: ih },
  45: { f: lh },
  46: { f: hh },
  47: { f: ch },
  48: {},
  49: { f: Bl },
  50: {},
  51: { f: Fh },
  52: { T: 1 },
  53: { T: -1 },
  54: { T: 1 },
  55: { T: -1 },
  56: { T: 1 },
  57: { T: -1 },
  58: {},
  59: {},
  60: { f: bc },
  62: { f: ax },
  63: { f: Nh },
  64: { f: Dx },
  65: {},
  66: {},
  67: {},
  68: {},
  69: {},
  70: {},
  128: {},
  129: { T: 1 },
  130: { T: -1 },
  131: { T: 1, f: Ct, p: 0 },
  132: { T: -1 },
  133: { T: 1 },
  134: { T: -1 },
  135: { T: 1 },
  136: { T: -1 },
  137: { T: 1, f: Ax },
  138: { T: -1 },
  139: { T: 1 },
  140: { T: -1 },
  141: { T: 1 },
  142: { T: -1 },
  143: { T: 1 },
  144: { T: -1 },
  145: { T: 1 },
  146: { T: -1 },
  147: { f: N1 },
  148: { f: I1, p: 16 },
  151: { f: _x },
  152: {},
  153: { f: qx },
  154: {},
  155: {},
  156: { f: jx },
  157: {},
  158: {},
  159: { T: 1, f: jc },
  160: { T: -1 },
  161: { T: 1, f: fr },
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
  176: { f: dx },
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
  335: { f: Ah },
  336: { T: -1 },
  337: { f: Ih, T: 1 },
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
  355: { f: ai },
  357: {},
  358: {},
  359: {},
  360: { T: 1 },
  361: {},
  362: { f: Rc },
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
  426: { f: wx },
  427: { f: Tx },
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
  476: { f: Sx },
  477: {},
  478: {},
  479: { T: 1 },
  480: { T: -1 },
  481: { T: 1 },
  482: { T: -1 },
  483: { T: 1 },
  484: { T: -1 },
  485: { f: R1 },
  486: { T: 1 },
  487: { T: -1 },
  488: { T: 1 },
  489: { T: -1 },
  490: { T: 1 },
  491: { T: -1 },
  492: { T: 1 },
  493: { T: -1 },
  494: { f: vx },
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
  550: { f: ai },
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
  632: { f: bh },
  633: { T: 1 },
  634: { T: -1 },
  635: { T: 1, f: Mh },
  636: { T: -1 },
  637: { f: Wl },
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
  651: { f: Xx },
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
  1053: { f: Ix },
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
function J(e, r, t, n) {
  var i = r;
  if (!isNaN(i)) {
    var a = n || (t || []).length || 0, s = e.next(4);
    s.write_shift(2, i), s.write_shift(2, a), a > 0 && wi(t) && e.push(t);
  }
}
function Ad(e, r, t, n) {
  var i = n || (t || []).length || 0;
  if (i <= 8224)
    return J(e, r, t, i);
  var a = r;
  if (!isNaN(a)) {
    for (var s = t.parts || [], o = 0, c = 0, f = 0; f + (s[o] || 8224) <= 8224; )
      f += s[o] || 8224, o++;
    var l = e.next(4);
    for (l.write_shift(2, a), l.write_shift(2, f), e.push(t.slice(c, c + f)), c += f; c < i; ) {
      for (l = e.next(4), l.write_shift(2, 60), f = 0; f + (s[o] || 8224) <= 8224; )
        f += s[o] || 8224, o++;
      l.write_shift(2, f), e.push(t.slice(c, c + f)), c += f;
    }
  }
}
function qr(e, r, t) {
  return e || (e = B(7)), e.write_shift(2, r), e.write_shift(2, t), e.write_shift(2, 0), e.write_shift(1, 0), e;
}
function Cd(e, r, t, n) {
  var i = B(9);
  return qr(i, e, r), j0(t, n || "b", i), i;
}
function Fd(e, r, t) {
  var n = B(8 + 2 * t.length);
  return qr(n, e, r), n.write_shift(1, t.length), n.write_shift(t.length, t, "sbcs"), n.l < n.length ? n.slice(0, n.l) : n;
}
function Od(e, r, t, n) {
  if (r.v != null)
    switch (r.t) {
      case "d":
      case "n":
        var i = r.t == "d" ? it(et(r.v)) : r.v;
        i == (i | 0) && i >= 0 && i < 65536 ? J(e, 2, Xc(t, n, i)) : J(e, 3, Wc(t, n, i));
        return;
      case "b":
      case "e":
        J(e, 5, Cd(t, n, r.v, r.t));
        return;
      case "s":
      case "str":
        J(e, 4, Fd(t, n, (r.v || "").slice(0, 255)));
        return;
    }
  J(e, 1, qr(null, t, n));
}
function Dd(e, r, t, n) {
  var i = Array.isArray(r), a = Se(r["!ref"] || "A1"), s, o = "", c = [];
  if (a.e.c > 255 || a.e.r > 16383) {
    if (n.WTF)
      throw new Error("Range " + (r["!ref"] || "A1") + " exceeds format limit A1:IV16384");
    a.e.c = Math.min(a.e.c, 255), a.e.r = Math.min(a.e.c, 16383), s = ke(a);
  }
  for (var f = a.s.r; f <= a.e.r; ++f) {
    o = Ge(f);
    for (var l = a.s.c; l <= a.e.c; ++l) {
      f === a.s.r && (c[l] = je(l)), s = c[l] + o;
      var h = i ? (r[f] || [])[l] : r[s];
      !h || Od(e, h, f, l);
    }
  }
}
function Id(e, r) {
  for (var t = r || {}, n = nt(), i = 0, a = 0; a < e.SheetNames.length; ++a)
    e.SheetNames[a] == t.sheet && (i = a);
  if (i == 0 && !!t.sheet && e.SheetNames[0] != t.sheet)
    throw new Error("Sheet not found: " + t.sheet);
  return J(n, t.biff == 4 ? 1033 : t.biff == 3 ? 521 : 9, Ci(e, 16, t)), Dd(n, e.Sheets[e.SheetNames[i]], i, t), J(n, 10), n.end();
}
function kd(e, r, t) {
  J(e, 49, yc({
    sz: 12,
    color: { theme: 1 },
    name: "Arial",
    family: 2,
    scheme: "minor"
  }, t));
}
function Rd(e, r, t) {
  !r || [[5, 8], [23, 26], [41, 44], [50, 392]].forEach(function(n) {
    for (var i = n[0]; i <= n[1]; ++i)
      r[i] != null && J(e, 1054, Fc(i, r[i], t));
  });
}
function Nd(e, r) {
  var t = B(19);
  t.write_shift(4, 2151), t.write_shift(4, 0), t.write_shift(4, 0), t.write_shift(2, 3), t.write_shift(1, 1), t.write_shift(4, 0), J(e, 2151, t), t = B(39), t.write_shift(4, 2152), t.write_shift(4, 0), t.write_shift(4, 0), t.write_shift(2, 3), t.write_shift(1, 0), t.write_shift(4, 0), t.write_shift(2, 1), t.write_shift(4, 4), t.write_shift(2, 0), J0(Se(r["!ref"] || "A1"), t), t.write_shift(4, 4), J(e, 2152, t);
}
function Ld(e, r) {
  for (var t = 0; t < 16; ++t)
    J(e, 224, Ia({ numFmtId: 0, style: !0 }, 0, r));
  r.cellXfs.forEach(function(n) {
    J(e, 224, Ia(n, 0, r));
  });
}
function Pd(e, r) {
  for (var t = 0; t < r["!links"].length; ++t) {
    var n = r["!links"][t];
    J(e, 440, Pc(n)), n[1].Tooltip && J(e, 2048, Mc(n));
  }
  delete r["!links"];
}
function Md(e, r) {
  if (!!r) {
    var t = 0;
    r.forEach(function(n, i) {
      ++t <= 256 && n && J(e, 125, Uc(Un(i, n), i));
    });
  }
}
function Bd(e, r, t, n, i) {
  var a = 16 + zt(i.cellXfs, r, i);
  if (r.v == null && !r.bf) {
    J(e, 513, nr(t, n, a));
    return;
  }
  if (r.bf)
    J(e, 6, o1(r, t, n, i, a));
  else
    switch (r.t) {
      case "d":
      case "n":
        var s = r.t == "d" ? it(et(r.v)) : r.v;
        J(e, 515, kc(t, n, s, a));
        break;
      case "b":
      case "e":
        J(e, 517, Ic(t, n, r.v, a, i, r.t));
        break;
      case "s":
      case "str":
        if (i.bookSST) {
          var o = ki(i.Strings, r.v, i.revStrings);
          J(e, 253, Ac(t, n, o, a));
        } else
          J(e, 516, Cc(t, n, (r.v || "").slice(0, 255), a, i));
        break;
      default:
        J(e, 513, nr(t, n, a));
    }
}
function bd(e, r, t) {
  var n = nt(), i = t.SheetNames[e], a = t.Sheets[i] || {}, s = (t || {}).Workbook || {}, o = (s.Sheets || [])[e] || {}, c = Array.isArray(a), f = r.biff == 8, l, h = "", x = [], d = Se(a["!ref"] || "A1"), v = f ? 65536 : 16384;
  if (d.e.c > 255 || d.e.r >= v) {
    if (r.WTF)
      throw new Error("Range " + (a["!ref"] || "A1") + " exceeds format limit A1:IV16384");
    d.e.c = Math.min(d.e.c, 255), d.e.r = Math.min(d.e.c, v - 1);
  }
  J(n, 2057, Ci(t, 16, r)), J(n, 13, pt(1)), J(n, 12, pt(100)), J(n, 15, Ze(!0)), J(n, 17, Ze(!1)), J(n, 16, rr(1e-3)), J(n, 95, Ze(!0)), J(n, 42, Ze(!1)), J(n, 43, Ze(!1)), J(n, 130, pt(1)), J(n, 128, Dc([0, 0])), J(n, 131, Ze(!1)), J(n, 132, Ze(!1)), f && Md(n, a["!cols"]), J(n, 512, Oc(d, r)), f && (a["!links"] = []);
  for (var u = d.s.r; u <= d.e.r; ++u) {
    h = Ge(u);
    for (var g = d.s.c; g <= d.e.c; ++g) {
      u === d.s.r && (x[g] = je(g)), l = x[g] + h;
      var S = c ? (a[u] || [])[g] : a[l];
      !S || (Bd(n, S, u, g, r), f && S.l && a["!links"].push([l, S.l]));
    }
  }
  var A = o.CodeName || o.name || i;
  return f && J(n, 574, Sc((s.Views || [])[0])), f && (a["!merges"] || []).length && J(n, 229, Lc(a["!merges"])), f && Pd(n, a), J(n, 442, q0(A)), f && Nd(n, a), J(n, 10), n.end();
}
function Ud(e, r, t) {
  var n = nt(), i = (e || {}).Workbook || {}, a = i.Sheets || [], s = i.WBProps || {}, o = t.biff == 8, c = t.biff == 5;
  if (J(n, 2057, Ci(e, 5, t)), t.bookType == "xla" && J(n, 135), J(n, 225, o ? pt(1200) : null), J(n, 193, cc(2)), c && J(n, 191), c && J(n, 192), J(n, 226), J(n, 92, _c("SheetJS", t)), J(n, 66, pt(o ? 1200 : 1252)), o && J(n, 353, pt(0)), o && J(n, 448), J(n, 317, Hc(e.SheetNames.length)), o && e.vbaraw && J(n, 211), o && e.vbaraw) {
    var f = s.CodeName || "ThisWorkbook";
    J(n, 442, q0(f));
  }
  J(n, 156, pt(17)), J(n, 25, Ze(!1)), J(n, 18, Ze(!1)), J(n, 19, pt(0)), o && J(n, 431, Ze(!1)), o && J(n, 444, pt(0)), J(n, 61, Ec()), J(n, 64, Ze(!1)), J(n, 141, pt(0)), J(n, 34, Ze(Yx(e) == "true")), J(n, 14, Ze(!0)), o && J(n, 439, Ze(!1)), J(n, 218, pt(0)), kd(n, e, t), Rd(n, e.SSF, t), Ld(n, t), o && J(n, 352, Ze(!1));
  var l = n.end(), h = nt();
  o && J(h, 140, Bc()), o && t.Strings && Ad(h, 252, Tc(t.Strings)), J(h, 10);
  var x = h.end(), d = nt(), v = 0, u = 0;
  for (u = 0; u < e.SheetNames.length; ++u)
    v += (o ? 12 : 11) + (o ? 2 : 1) * e.SheetNames[u].length;
  var g = l.length + v + x.length;
  for (u = 0; u < e.SheetNames.length; ++u) {
    var S = a[u] || {};
    J(d, 133, wc({ pos: g, hs: S.Hidden || 0, dt: 0, name: e.SheetNames[u] }, t)), g += r[u].length;
  }
  var A = d.end();
  if (v != A.length)
    throw new Error("BS8 " + v + " != " + A.length);
  var C = [];
  return l.length && C.push(l), A.length && C.push(A), x.length && C.push(x), Ve(C);
}
function Hd(e, r) {
  var t = r || {}, n = [];
  e && !e.SSF && (e.SSF = at(Oe)), e && e.SSF && (Ln(), Nn(e.SSF), t.revssf = Pn(e.SSF), t.revssf[e.SSF[65535]] = 0, t.ssf = e.SSF), t.Strings = [], t.Strings.Count = 0, t.Strings.Unique = 0, Ri(t), t.cellXfs = [], zt(t.cellXfs, {}, { revssf: { General: 0 } }), e.Props || (e.Props = {});
  for (var i = 0; i < e.SheetNames.length; ++i)
    n[n.length] = bd(i, t, e);
  return n.unshift(Ud(e, n, t)), Ve(n);
}
function Ss(e, r) {
  for (var t = 0; t <= e.SheetNames.length; ++t) {
    var n = e.Sheets[e.SheetNames[t]];
    if (!(!n || !n["!ref"])) {
      var i = ht(n["!ref"]);
      i.e.c > 255 && typeof console < "u" && console.error && console.error("Worksheet '" + e.SheetNames[t] + "' extends beyond column IV (255).  Data may be lost.");
    }
  }
  var a = r || {};
  switch (a.biff || 2) {
    case 8:
    case 5:
      return Hd(e, r);
    case 4:
    case 3:
    case 2:
      return Id(e, r);
  }
  throw new Error("invalid type " + a.bookType + " for BIFF");
}
function Wd(e, r, t, n) {
  for (var i = e["!merges"] || [], a = [], s = r.s.c; s <= r.e.c; ++s) {
    for (var o = 0, c = 0, f = 0; f < i.length; ++f)
      if (!(i[f].s.r > t || i[f].s.c > s) && !(i[f].e.r < t || i[f].e.c < s)) {
        if (i[f].s.r < t || i[f].s.c < s) {
          o = -1;
          break;
        }
        o = i[f].e.r - i[f].s.r + 1, c = i[f].e.c - i[f].s.c + 1;
        break;
      }
    if (!(o < 0)) {
      var l = _e({ r: t, c: s }), h = n.dense ? (e[t] || [])[s] : e[l], x = h && h.v != null && (h.h || ml(h.w || (Bt(h), h.w) || "")) || "", d = {};
      o > 1 && (d.rowspan = o), c > 1 && (d.colspan = c), n.editable ? x = '<span contenteditable="true">' + x + "</span>" : h && (d["data-t"] = h && h.t || "z", h.v != null && (d["data-v"] = h.v), h.z != null && (d["data-z"] = h.z), h.l && (h.l.Target || "#").charAt(0) != "#" && (x = '<a href="' + h.l.Target + '">' + x + "</a>")), d.id = (n.id || "sjs") + "-" + l, a.push(q("td", x, d));
    }
  }
  var v = "<tr>";
  return v + a.join("") + "</tr>";
}
var Xd = '<html><head><meta charset="utf-8"/><title>SheetJS Table Export</title></head><body>', Vd = "</body></html>";
function Yd(e, r, t) {
  var n = [];
  return n.join("") + "<table" + (t && t.id ? ' id="' + t.id + '"' : "") + ">";
}
function ys(e, r) {
  var t = r || {}, n = t.header != null ? t.header : Xd, i = t.footer != null ? t.footer : Vd, a = [n], s = ht(e["!ref"]);
  t.dense = Array.isArray(e), a.push(Yd(e, s, t));
  for (var o = s.s.r; o <= s.e.r; ++o)
    a.push(Wd(e, s, o, t));
  return a.push("</table>" + i), a.join("");
}
function As(e, r, t) {
  var n = t || {}, i = 0, a = 0;
  if (n.origin != null)
    if (typeof n.origin == "number")
      i = n.origin;
    else {
      var s = typeof n.origin == "string" ? be(n.origin) : n.origin;
      i = s.r, a = s.c;
    }
  var o = r.getElementsByTagName("tr"), c = Math.min(n.sheetRows || 1e7, o.length), f = { s: { r: 0, c: 0 }, e: { r: i, c: a } };
  if (e["!ref"]) {
    var l = ht(e["!ref"]);
    f.s.r = Math.min(f.s.r, l.s.r), f.s.c = Math.min(f.s.c, l.s.c), f.e.r = Math.max(f.e.r, l.e.r), f.e.c = Math.max(f.e.c, l.e.c), i == -1 && (f.e.r = i = l.e.r + 1);
  }
  var h = [], x = 0, d = e["!rows"] || (e["!rows"] = []), v = 0, u = 0, g = 0, S = 0, A = 0, C = 0;
  for (e["!cols"] || (e["!cols"] = []); v < o.length && u < c; ++v) {
    var I = o[v];
    if (Ba(I)) {
      if (n.display)
        continue;
      d[u] = { hidden: !0 };
    }
    var Y = I.children;
    for (g = S = 0; g < Y.length; ++g) {
      var Q = Y[g];
      if (!(n.display && Ba(Q))) {
        var D = Q.hasAttribute("data-v") ? Q.getAttribute("data-v") : Q.hasAttribute("v") ? Q.getAttribute("v") : El(Q.innerHTML), H = Q.getAttribute("data-z") || Q.getAttribute("z");
        for (x = 0; x < h.length; ++x) {
          var M = h[x];
          M.s.c == S + a && M.s.r < u + i && u + i <= M.e.r && (S = M.e.c + 1 - a, x = -1);
        }
        C = +Q.getAttribute("colspan") || 1, ((A = +Q.getAttribute("rowspan") || 1) > 1 || C > 1) && h.push({ s: { r: u + i, c: S + a }, e: { r: u + i + (A || 1) - 1, c: S + a + (C || 1) - 1 } });
        var V = { t: "s", v: D }, G = Q.getAttribute("data-t") || Q.getAttribute("t") || "";
        D != null && (D.length == 0 ? V.t = G || "z" : n.raw || D.trim().length == 0 || G == "s" || (D === "TRUE" ? V = { t: "b", v: !0 } : D === "FALSE" ? V = { t: "b", v: !1 } : isNaN(Lt(D)) ? isNaN(Hr(D).getDate()) || (V = { t: "d", v: et(D) }, n.cellDates || (V = { t: "n", v: it(V.v) }), V.z = n.dateNF || Oe[14]) : V = { t: "n", v: Lt(D) })), V.z === void 0 && H != null && (V.z = H);
        var j = "", re = Q.getElementsByTagName("A");
        if (re && re.length)
          for (var we = 0; we < re.length && !(re[we].hasAttribute("href") && (j = re[we].getAttribute("href"), j.charAt(0) != "#")); ++we)
            ;
        j && j.charAt(0) != "#" && (V.l = { Target: j }), n.dense ? (e[u + i] || (e[u + i] = []), e[u + i][S + a] = V) : e[_e({ c: S + a, r: u + i })] = V, f.e.c < S + a && (f.e.c = S + a), S += C;
      }
    }
    ++u;
  }
  return h.length && (e["!merges"] = (e["!merges"] || []).concat(h)), f.e.r = Math.max(f.e.r, u - 1 + i), e["!ref"] = ke(f), u >= c && (e["!fullref"] = ke((f.e.r = o.length - v + u - 1 + i, f))), e;
}
function Cs(e, r) {
  var t = r || {}, n = t.dense ? [] : {};
  return As(n, e, r);
}
function Gd(e, r) {
  return ir(Cs(e, r), r);
}
function Ba(e) {
  var r = "", t = $d(e);
  return t && (r = t(e).getPropertyValue("display")), r || (r = e.style && e.style.display), r === "none";
}
function $d(e) {
  return e.ownerDocument.defaultView && typeof e.ownerDocument.defaultView.getComputedStyle == "function" ? e.ownerDocument.defaultView.getComputedStyle : typeof getComputedStyle == "function" ? getComputedStyle : null;
}
var zd = /* @__PURE__ */ function() {
  var e = [
    "<office:master-styles>",
    '<style:master-page style:name="mp1" style:page-layout-name="mp1">',
    "<style:header/>",
    '<style:header-left style:display="false"/>',
    "<style:footer/>",
    '<style:footer-left style:display="false"/>',
    "</style:master-page>",
    "</office:master-styles>"
  ].join(""), r = "<office:document-styles " + Wr({
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
    return Re + r;
  };
}(), ba = /* @__PURE__ */ function() {
  var e = function(a) {
    return me(a).replace(/  +/g, function(s) {
      return '<text:s text:c="' + s.length + '"/>';
    }).replace(/\t/g, "<text:tab/>").replace(/\n/g, "</text:p><text:p>").replace(/^ /, "<text:s/>").replace(/ $/, "<text:s/>");
  }, r = `          <table:table-cell />
`, t = `          <table:covered-table-cell/>
`, n = function(a, s, o) {
    var c = [];
    c.push('      <table:table table:name="' + me(s.SheetNames[o]) + `" table:style-name="ta1">
`);
    var f = 0, l = 0, h = ht(a["!ref"] || "A1"), x = a["!merges"] || [], d = 0, v = Array.isArray(a);
    if (a["!cols"])
      for (l = 0; l <= h.e.c; ++l)
        c.push("        <table:table-column" + (a["!cols"][l] ? ' table:style-name="co' + a["!cols"][l].ods + '"' : "") + `></table:table-column>
`);
    var u = "", g = a["!rows"] || [];
    for (f = 0; f < h.s.r; ++f)
      u = g[f] ? ' table:style-name="ro' + g[f].ods + '"' : "", c.push("        <table:table-row" + u + `></table:table-row>
`);
    for (; f <= h.e.r; ++f) {
      for (u = g[f] ? ' table:style-name="ro' + g[f].ods + '"' : "", c.push("        <table:table-row" + u + `>
`), l = 0; l < h.s.c; ++l)
        c.push(r);
      for (; l <= h.e.c; ++l) {
        var S = !1, A = {}, C = "";
        for (d = 0; d != x.length; ++d)
          if (!(x[d].s.c > l) && !(x[d].s.r > f) && !(x[d].e.c < l) && !(x[d].e.r < f)) {
            (x[d].s.c != l || x[d].s.r != f) && (S = !0), A["table:number-columns-spanned"] = x[d].e.c - x[d].s.c + 1, A["table:number-rows-spanned"] = x[d].e.r - x[d].s.r + 1;
            break;
          }
        if (S) {
          c.push(t);
          continue;
        }
        var I = _e({ r: f, c: l }), Y = v ? (a[f] || [])[l] : a[I];
        if (Y && Y.f && (A["table:formula"] = me(x1(Y.f)), Y.F && Y.F.slice(0, I.length) == I)) {
          var Q = ht(Y.F);
          A["table:number-matrix-columns-spanned"] = Q.e.c - Q.s.c + 1, A["table:number-matrix-rows-spanned"] = Q.e.r - Q.s.r + 1;
        }
        if (!Y) {
          c.push(r);
          continue;
        }
        switch (Y.t) {
          case "b":
            C = Y.v ? "TRUE" : "FALSE", A["office:value-type"] = "boolean", A["office:boolean-value"] = Y.v ? "true" : "false";
            break;
          case "n":
            C = Y.w || String(Y.v || 0), A["office:value-type"] = "float", A["office:value"] = Y.v || 0;
            break;
          case "s":
          case "str":
            C = Y.v == null ? "" : Y.v, A["office:value-type"] = "string";
            break;
          case "d":
            C = Y.w || et(Y.v).toISOString(), A["office:value-type"] = "date", A["office:date-value"] = et(Y.v).toISOString(), A["table:style-name"] = "ce1";
            break;
          default:
            c.push(r);
            continue;
        }
        var D = e(C);
        if (Y.l && Y.l.Target) {
          var H = Y.l.Target;
          H = H.charAt(0) == "#" ? "#" + d1(H.slice(1)) : H, H.charAt(0) != "#" && !H.match(/^\w+:/) && (H = "../" + H), D = q("text:a", D, { "xlink:href": H.replace(/&/g, "&amp;") });
        }
        c.push("          " + q("table:table-cell", q("text:p", D, {}), A) + `
`);
      }
      c.push(`        </table:table-row>
`);
    }
    return c.push(`      </table:table>
`), c.join("");
  }, i = function(a, s) {
    a.push(` <office:automatic-styles>
`), a.push(`  <number:date-style style:name="N37" number:automatic-order="true">
`), a.push(`   <number:month number:style="long"/>
`), a.push(`   <number:text>/</number:text>
`), a.push(`   <number:day number:style="long"/>
`), a.push(`   <number:text>/</number:text>
`), a.push(`   <number:year/>
`), a.push(`  </number:date-style>
`);
    var o = 0;
    s.SheetNames.map(function(f) {
      return s.Sheets[f];
    }).forEach(function(f) {
      if (!!f && f["!cols"]) {
        for (var l = 0; l < f["!cols"].length; ++l)
          if (f["!cols"][l]) {
            var h = f["!cols"][l];
            if (h.width == null && h.wpx == null && h.wch == null)
              continue;
            Fi(h), h.ods = o;
            var x = f["!cols"][l].wpx + "px";
            a.push('  <style:style style:name="co' + o + `" style:family="table-column">
`), a.push('   <style:table-column-properties fo:break-before="auto" style:column-width="' + x + `"/>
`), a.push(`  </style:style>
`), ++o;
          }
      }
    });
    var c = 0;
    s.SheetNames.map(function(f) {
      return s.Sheets[f];
    }).forEach(function(f) {
      if (!!f && f["!rows"]) {
        for (var l = 0; l < f["!rows"].length; ++l)
          if (f["!rows"][l]) {
            f["!rows"][l].ods = c;
            var h = f["!rows"][l].hpx + "px";
            a.push('  <style:style style:name="ro' + c + `" style:family="table-row">
`), a.push('   <style:table-row-properties fo:break-before="auto" style:row-height="' + h + `"/>
`), a.push(`  </style:style>
`), ++c;
          }
      }
    }), a.push(`  <style:style style:name="ta1" style:family="table" style:master-page-name="mp1">
`), a.push(`   <style:table-properties table:display="true" style:writing-mode="lr-tb"/>
`), a.push(`  </style:style>
`), a.push(`  <style:style style:name="ce1" style:family="table-cell" style:parent-style-name="Default" style:data-style-name="N37"/>
`), a.push(` </office:automatic-styles>
`);
  };
  return function(s, o) {
    var c = [Re], f = Wr({
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
    }), l = Wr({
      "xmlns:config": "urn:oasis:names:tc:opendocument:xmlns:config:1.0",
      "office:mimetype": "application/vnd.oasis.opendocument.spreadsheet"
    });
    o.bookType == "fods" ? (c.push("<office:document" + f + l + `>
`), c.push(W0().replace(/office:document-meta/g, "office:meta"))) : c.push("<office:document-content" + f + `>
`), i(c, s), c.push(`  <office:body>
`), c.push(`    <office:spreadsheet>
`);
    for (var h = 0; h != s.SheetNames.length; ++h)
      c.push(n(s.Sheets[s.SheetNames[h]], s, h));
    return c.push(`    </office:spreadsheet>
`), c.push(`  </office:body>
`), o.bookType == "fods" ? c.push("</office:document>") : c.push("</office:document-content>"), c.join("");
  };
}();
function Fs(e, r) {
  if (r.bookType == "fods")
    return ba(e, r);
  var t = gi(), n = "", i = [], a = [];
  return n = "mimetype", ce(t, n, "application/vnd.oasis.opendocument.spreadsheet"), n = "content.xml", ce(t, n, ba(e, r)), i.push([n, "text/xml"]), a.push([n, "ContentFile"]), n = "styles.xml", ce(t, n, zd(e, r)), i.push([n, "text/xml"]), a.push([n, "StylesFile"]), n = "meta.xml", ce(t, n, Re + W0()), i.push([n, "text/xml"]), a.push([n, "MetadataFile"]), n = "manifest.rdf", ce(t, n, ac(a)), i.push([n, "application/rdf+xml"]), n = "META-INF/manifest.xml", ce(t, n, nc(i)), t;
}
/*! sheetjs (C) 2013-present SheetJS -- http://sheetjs.com */
function On(e) {
  return new DataView(e.buffer, e.byteOffset, e.byteLength);
}
function jd(e) {
  return typeof TextEncoder < "u" ? new TextEncoder().encode(e) : wt(kt(e));
}
function Kd(e, r) {
  e:
    for (var t = 0; t <= e.length - r.length; ++t) {
      for (var n = 0; n < r.length; ++n)
        if (e[t + n] != r[n])
          continue e;
      return !0;
    }
  return !1;
}
function $t(e) {
  var r = e.reduce(function(i, a) {
    return i + a.length;
  }, 0), t = new Uint8Array(r), n = 0;
  return e.forEach(function(i) {
    t.set(i, n), n += i.length;
  }), t;
}
function qd(e, r, t) {
  var n = Math.floor(t == 0 ? 0 : Math.LOG10E * Math.log(Math.abs(t))) + 6176 - 20, i = t / Math.pow(10, n - 6176);
  e[r + 15] |= n >> 7, e[r + 14] |= (n & 127) << 1;
  for (var a = 0; i >= 1; ++a, i /= 256)
    e[r + a] = i & 255;
  e[r + 15] |= t >= 0 ? 0 : 128;
}
function Xr(e, r) {
  var t = r ? r[0] : 0, n = e[t] & 127;
  e:
    if (e[t++] >= 128 && (n |= (e[t] & 127) << 7, e[t++] < 128 || (n |= (e[t] & 127) << 14, e[t++] < 128) || (n |= (e[t] & 127) << 21, e[t++] < 128) || (n += (e[t] & 127) * Math.pow(2, 28), ++t, e[t++] < 128) || (n += (e[t] & 127) * Math.pow(2, 35), ++t, e[t++] < 128) || (n += (e[t] & 127) * Math.pow(2, 42), ++t, e[t++] < 128)))
      break e;
  return r && (r[0] = t), n;
}
function ge(e) {
  var r = new Uint8Array(7);
  r[0] = e & 127;
  var t = 1;
  e:
    if (e > 127) {
      if (r[t - 1] |= 128, r[t] = e >> 7 & 127, ++t, e <= 16383 || (r[t - 1] |= 128, r[t] = e >> 14 & 127, ++t, e <= 2097151) || (r[t - 1] |= 128, r[t] = e >> 21 & 127, ++t, e <= 268435455) || (r[t - 1] |= 128, r[t] = e / 256 >>> 21 & 127, ++t, e <= 34359738367) || (r[t - 1] |= 128, r[t] = e / 65536 >>> 21 & 127, ++t, e <= 4398046511103))
        break e;
      r[t - 1] |= 128, r[t] = e / 16777216 >>> 21 & 127, ++t;
    }
  return r.slice(0, t);
}
function mr(e) {
  var r = 0, t = e[r] & 127;
  e:
    if (e[r++] >= 128) {
      if (t |= (e[r] & 127) << 7, e[r++] < 128 || (t |= (e[r] & 127) << 14, e[r++] < 128) || (t |= (e[r] & 127) << 21, e[r++] < 128))
        break e;
      t |= (e[r] & 127) << 28;
    }
  return t;
}
function Le(e) {
  for (var r = [], t = [0]; t[0] < e.length; ) {
    var n = t[0], i = Xr(e, t), a = i & 7;
    i = Math.floor(i / 8);
    var s = 0, o;
    if (i == 0)
      break;
    switch (a) {
      case 0:
        {
          for (var c = t[0]; e[t[0]++] >= 128; )
            ;
          o = e.slice(c, t[0]);
        }
        break;
      case 5:
        s = 4, o = e.slice(t[0], t[0] + s), t[0] += s;
        break;
      case 1:
        s = 8, o = e.slice(t[0], t[0] + s), t[0] += s;
        break;
      case 2:
        s = Xr(e, t), o = e.slice(t[0], t[0] + s), t[0] += s;
        break;
      case 3:
      case 4:
      default:
        throw new Error("PB Type ".concat(a, " for Field ").concat(i, " at offset ").concat(n));
    }
    var f = { data: o, type: a };
    r[i] == null ? r[i] = [f] : r[i].push(f);
  }
  return r;
}
function We(e) {
  var r = [];
  return e.forEach(function(t, n) {
    t.forEach(function(i) {
      !i.data || (r.push(ge(n * 8 + i.type)), i.type == 2 && r.push(ge(i.data.length)), r.push(i.data));
    });
  }), $t(r);
}
function mt(e) {
  for (var r, t = [], n = [0]; n[0] < e.length; ) {
    var i = Xr(e, n), a = Le(e.slice(n[0], n[0] + i));
    n[0] += i;
    var s = {
      id: mr(a[1][0].data),
      messages: []
    };
    a[2].forEach(function(o) {
      var c = Le(o.data), f = mr(c[3][0].data);
      s.messages.push({
        meta: c,
        data: e.slice(n[0], n[0] + f)
      }), n[0] += f;
    }), (r = a[3]) != null && r[0] && (s.merge = mr(a[3][0].data) >>> 0 > 0), t.push(s);
  }
  return t;
}
function hr(e) {
  var r = [];
  return e.forEach(function(t) {
    var n = [];
    n[1] = [{ data: ge(t.id), type: 0 }], n[2] = [], t.merge != null && (n[3] = [{ data: ge(+!!t.merge), type: 0 }]);
    var i = [];
    t.messages.forEach(function(s) {
      i.push(s.data), s.meta[3] = [{ type: 0, data: ge(s.data.length) }], n[2].push({ data: We(s.meta), type: 2 });
    });
    var a = We(n);
    r.push(ge(a.length)), r.push(a), i.forEach(function(s) {
      return r.push(s);
    });
  }), $t(r);
}
function Jd(e, r) {
  if (e != 0)
    throw new Error("Unexpected Snappy chunk type ".concat(e));
  for (var t = [0], n = Xr(r, t), i = []; t[0] < r.length; ) {
    var a = r[t[0]] & 3;
    if (a == 0) {
      var s = r[t[0]++] >> 2;
      if (s < 60)
        ++s;
      else {
        var o = s - 59;
        s = r[t[0]], o > 1 && (s |= r[t[0] + 1] << 8), o > 2 && (s |= r[t[0] + 2] << 16), o > 3 && (s |= r[t[0] + 3] << 24), s >>>= 0, s++, t[0] += o;
      }
      i.push(r.slice(t[0], t[0] + s)), t[0] += s;
      continue;
    } else {
      var c = 0, f = 0;
      if (a == 1 ? (f = (r[t[0]] >> 2 & 7) + 4, c = (r[t[0]++] & 224) << 3, c |= r[t[0]++]) : (f = (r[t[0]++] >> 2) + 1, a == 2 ? (c = r[t[0]] | r[t[0] + 1] << 8, t[0] += 2) : (c = (r[t[0]] | r[t[0] + 1] << 8 | r[t[0] + 2] << 16 | r[t[0] + 3] << 24) >>> 0, t[0] += 4)), i = [$t(i)], c == 0)
        throw new Error("Invalid offset 0");
      if (c > i[0].length)
        throw new Error("Invalid offset beyond length");
      if (f >= c)
        for (i.push(i[0].slice(-c)), f -= c; f >= i[i.length - 1].length; )
          i.push(i[i.length - 1]), f -= i[i.length - 1].length;
      i.push(i[0].slice(-c, -c + f));
    }
  }
  var l = $t(i);
  if (l.length != n)
    throw new Error("Unexpected length: ".concat(l.length, " != ").concat(n));
  return l;
}
function _t(e) {
  for (var r = [], t = 0; t < e.length; ) {
    var n = e[t++], i = e[t] | e[t + 1] << 8 | e[t + 2] << 16;
    t += 3, r.push(Jd(n, e.slice(t, t + i))), t += i;
  }
  if (t !== e.length)
    throw new Error("data is not a valid framed stream!");
  return $t(r);
}
function ur(e) {
  for (var r = [], t = 0; t < e.length; ) {
    var n = Math.min(e.length - t, 268435455), i = new Uint8Array(4);
    r.push(i);
    var a = ge(n), s = a.length;
    r.push(a), n <= 60 ? (s++, r.push(new Uint8Array([n - 1 << 2]))) : n <= 256 ? (s += 2, r.push(new Uint8Array([240, n - 1 & 255]))) : n <= 65536 ? (s += 3, r.push(new Uint8Array([244, n - 1 & 255, n - 1 >> 8 & 255]))) : n <= 16777216 ? (s += 4, r.push(new Uint8Array([248, n - 1 & 255, n - 1 >> 8 & 255, n - 1 >> 16 & 255]))) : n <= 4294967296 && (s += 5, r.push(new Uint8Array([252, n - 1 & 255, n - 1 >> 8 & 255, n - 1 >> 16 & 255, n - 1 >>> 24 & 255]))), r.push(e.slice(t, t + n)), s += n, i[0] = 0, i[1] = s & 255, i[2] = s >> 8 & 255, i[3] = s >> 16 & 255, t += n;
  }
  return $t(r);
}
function ei(e, r) {
  var t = new Uint8Array(32), n = On(t), i = 12, a = 0;
  switch (t[0] = 5, e.t) {
    case "n":
      t[1] = 2, qd(t, i, e.v), a |= 1, i += 16;
      break;
    case "b":
      t[1] = 6, n.setFloat64(i, e.v ? 1 : 0, !0), a |= 2, i += 8;
      break;
    case "s":
      if (r.indexOf(e.v) == -1)
        throw new Error("Value ".concat(e.v, " missing from SST!"));
      t[1] = 3, n.setUint32(i, r.indexOf(e.v), !0), a |= 8, i += 4;
      break;
    default:
      throw "unsupported cell type " + e.t;
  }
  return n.setUint32(8, a, !0), t.slice(0, i);
}
function ti(e, r) {
  var t = new Uint8Array(32), n = On(t), i = 12, a = 0;
  switch (t[0] = 3, e.t) {
    case "n":
      t[2] = 2, n.setFloat64(i, e.v, !0), a |= 32, i += 8;
      break;
    case "b":
      t[2] = 6, n.setFloat64(i, e.v ? 1 : 0, !0), a |= 32, i += 8;
      break;
    case "s":
      if (r.indexOf(e.v) == -1)
        throw new Error("Value ".concat(e.v, " missing from SST!"));
      t[2] = 3, n.setUint32(i, r.indexOf(e.v), !0), a |= 16, i += 4;
      break;
    default:
      throw "unsupported cell type " + e.t;
  }
  return n.setUint32(4, a, !0), t.slice(0, i);
}
function Ut(e) {
  var r = Le(e);
  return Xr(r[1][0].data);
}
function Zd(e, r, t) {
  var n, i, a, s;
  if (!((n = e[6]) != null && n[0]) || !((i = e[7]) != null && i[0]))
    throw "Mutation only works on post-BNC storages!";
  var o = ((s = (a = e[8]) == null ? void 0 : a[0]) == null ? void 0 : s.data) && mr(e[8][0].data) > 0 || !1;
  if (o)
    throw "Math only works with normal offsets";
  for (var c = 0, f = On(e[7][0].data), l = 0, h = [], x = On(e[4][0].data), d = 0, v = [], u = 0; u < r.length; ++u) {
    if (r[u] == null) {
      f.setUint16(u * 2, 65535, !0), x.setUint16(u * 2, 65535);
      continue;
    }
    f.setUint16(u * 2, l, !0), x.setUint16(u * 2, d, !0);
    var g, S;
    switch (typeof r[u]) {
      case "string":
        g = ei({ t: "s", v: r[u] }, t), S = ti({ t: "s", v: r[u] }, t);
        break;
      case "number":
        g = ei({ t: "n", v: r[u] }, t), S = ti({ t: "n", v: r[u] }, t);
        break;
      case "boolean":
        g = ei({ t: "b", v: r[u] }, t), S = ti({ t: "b", v: r[u] }, t);
        break;
      default:
        throw new Error("Unsupported value " + r[u]);
    }
    h.push(g), l += g.length, v.push(S), d += S.length, ++c;
  }
  for (e[2][0].data = ge(c); u < e[7][0].data.length / 2; ++u)
    f.setUint16(u * 2, 65535, !0), x.setUint16(u * 2, 65535, !0);
  return e[6][0].data = $t(h), e[3][0].data = $t(v), c;
}
function Qd(e, r) {
  if (!r || !r.numbers)
    throw new Error("Must pass a `numbers` option -- check the README");
  var t = e.Sheets[e.SheetNames[0]];
  e.SheetNames.length > 1 && console.error("The Numbers writer currently writes only the first table");
  var n = ht(t["!ref"]);
  n.s.r = n.s.c = 0;
  var i = !1;
  n.e.c > 9 && (i = !0, n.e.c = 9), n.e.r > 49 && (i = !0, n.e.r = 49), i && console.error("The Numbers writer is currently limited to ".concat(ke(n)));
  var a = Dn(t, { range: n, header: 1 }), s = ["~Sh33tJ5~"];
  a.forEach(function(P) {
    return P.forEach(function(O) {
      typeof O == "string" && s.push(O);
    });
  });
  var o = {}, c = [], f = Te.read(r.numbers, { type: "base64" });
  f.FileIndex.map(function(P, O) {
    return [P, f.FullPaths[O]];
  }).forEach(function(P) {
    var O = P[0], F = P[1];
    if (O.type == 2 && !!O.name.match(/\.iwa/)) {
      var X = O.content, se = _t(X), oe = mt(se);
      oe.forEach(function(ae) {
        c.push(ae.id), o[ae.id] = { deps: [], location: F, type: mr(ae.messages[0].meta[1][0].data) };
      });
    }
  }), c.sort(function(P, O) {
    return P - O;
  });
  var l = c.filter(function(P) {
    return P > 1;
  }).map(function(P) {
    return [P, ge(P)];
  });
  f.FileIndex.map(function(P, O) {
    return [P, f.FullPaths[O]];
  }).forEach(function(P) {
    var O = P[0];
    if (P[1], !!O.name.match(/\.iwa/)) {
      var F = mt(_t(O.content));
      F.forEach(function(X) {
        X.messages.forEach(function(se) {
          l.forEach(function(oe) {
            X.messages.some(function(ae) {
              return mr(ae.meta[1][0].data) != 11006 && Kd(ae.data, oe[1]);
            }) && o[oe[0]].deps.push(X.id);
          });
        });
      });
    }
  });
  for (var h = Te.find(f, o[1].location), x = mt(_t(h.content)), d, v = 0; v < x.length; ++v) {
    var u = x[v];
    u.id == 1 && (d = u);
  }
  var g = Ut(Le(d.messages[0].data)[1][0].data);
  for (h = Te.find(f, o[g].location), x = mt(_t(h.content)), v = 0; v < x.length; ++v)
    u = x[v], u.id == g && (d = u);
  for (g = Ut(Le(d.messages[0].data)[2][0].data), h = Te.find(f, o[g].location), x = mt(_t(h.content)), v = 0; v < x.length; ++v)
    u = x[v], u.id == g && (d = u);
  for (g = Ut(Le(d.messages[0].data)[2][0].data), h = Te.find(f, o[g].location), x = mt(_t(h.content)), v = 0; v < x.length; ++v)
    u = x[v], u.id == g && (d = u);
  var S = Le(d.messages[0].data);
  {
    S[6][0].data = ge(n.e.r + 1), S[7][0].data = ge(n.e.c + 1);
    var A = Ut(S[46][0].data), C = Te.find(f, o[A].location), I = mt(_t(C.content));
    {
      for (var Y = 0; Y < I.length && I[Y].id != A; ++Y)
        ;
      if (I[Y].id != A)
        throw "Bad ColumnRowUIDMapArchive";
      var Q = Le(I[Y].messages[0].data);
      Q[1] = [], Q[2] = [], Q[3] = [];
      for (var D = 0; D <= n.e.c; ++D) {
        var H = [];
        H[1] = H[2] = [{ type: 0, data: ge(D + 420690) }], Q[1].push({ type: 2, data: We(H) }), Q[2].push({ type: 0, data: ge(D) }), Q[3].push({ type: 0, data: ge(D) });
      }
      Q[4] = [], Q[5] = [], Q[6] = [];
      for (var M = 0; M <= n.e.r; ++M)
        H = [], H[1] = H[2] = [{ type: 0, data: ge(M + 726270) }], Q[4].push({ type: 2, data: We(H) }), Q[5].push({ type: 0, data: ge(M) }), Q[6].push({ type: 0, data: ge(M) });
      I[Y].messages[0].data = We(Q);
    }
    C.content = ur(hr(I)), C.size = C.content.length, delete S[46];
    var V = Le(S[4][0].data);
    {
      V[7][0].data = ge(n.e.r + 1);
      var G = Le(V[1][0].data), j = Ut(G[2][0].data);
      C = Te.find(f, o[j].location), I = mt(_t(C.content));
      {
        if (I[0].id != j)
          throw "Bad HeaderStorageBucket";
        var re = Le(I[0].messages[0].data);
        for (M = 0; M < a.length; ++M) {
          var we = Le(re[2][0].data);
          we[1][0].data = ge(M), we[4][0].data = ge(a[M].length), re[2][M] = { type: re[2][0].type, data: We(we) };
        }
        I[0].messages[0].data = We(re);
      }
      C.content = ur(hr(I)), C.size = C.content.length;
      var le = Ut(V[2][0].data);
      C = Te.find(f, o[le].location), I = mt(_t(C.content));
      {
        if (I[0].id != le)
          throw "Bad HeaderStorageBucket";
        for (re = Le(I[0].messages[0].data), D = 0; D <= n.e.c; ++D)
          we = Le(re[2][0].data), we[1][0].data = ge(D), we[4][0].data = ge(n.e.r + 1), re[2][D] = { type: re[2][0].type, data: We(we) };
        I[0].messages[0].data = We(re);
      }
      C.content = ur(hr(I)), C.size = C.content.length;
      var He = Ut(V[4][0].data);
      (function() {
        for (var P = Te.find(f, o[He].location), O = mt(_t(P.content)), F, X = 0; X < O.length; ++X) {
          var se = O[X];
          se.id == He && (F = se);
        }
        var oe = Le(F.messages[0].data);
        {
          oe[3] = [];
          var ae = [];
          s.forEach(function(ue, qe) {
            ae[1] = [{ type: 0, data: ge(qe) }], ae[2] = [{ type: 0, data: ge(1) }], ae[3] = [{ type: 2, data: jd(ue) }], oe[3].push({ type: 2, data: We(ae) });
          });
        }
        F.messages[0].data = We(oe);
        var ee = hr(O), Ee = ur(ee);
        P.content = Ee, P.size = P.content.length;
      })();
      var De = Le(V[3][0].data);
      {
        var vt = De[1][0];
        delete De[2];
        var Me = Le(vt.data);
        {
          var ut = Ut(Me[2][0].data);
          (function() {
            for (var P = Te.find(f, o[ut].location), O = mt(_t(P.content)), F, X = 0; X < O.length; ++X) {
              var se = O[X];
              se.id == ut && (F = se);
            }
            var oe = Le(F.messages[0].data);
            {
              delete oe[6], delete De[7];
              var ae = new Uint8Array(oe[5][0].data);
              oe[5] = [];
              for (var ee = 0, Ee = 0; Ee <= n.e.r; ++Ee) {
                var ue = Le(ae);
                ee += Zd(ue, a[Ee], s), ue[1][0].data = ge(Ee), oe[5].push({ data: We(ue), type: 2 });
              }
              oe[1] = [{ type: 0, data: ge(n.e.c + 1) }], oe[2] = [{ type: 0, data: ge(n.e.r + 1) }], oe[3] = [{ type: 0, data: ge(ee) }], oe[4] = [{ type: 0, data: ge(n.e.r + 1) }];
            }
            F.messages[0].data = We(oe);
            var qe = hr(O), pe = ur(qe);
            P.content = pe, P.size = P.content.length;
          })();
        }
        vt.data = We(Me);
      }
      V[3][0].data = We(De);
    }
    S[4][0].data = We(V);
  }
  d.messages[0].data = We(S);
  var st = hr(x), y = ur(st);
  return h.content = y, h.size = h.content.length, f;
}
function ep(e) {
  return function(t) {
    for (var n = 0; n != e.length; ++n) {
      var i = e[n];
      t[i[0]] === void 0 && (t[i[0]] = i[1]), i[2] === "n" && (t[i[0]] = Number(t[i[0]]));
    }
  };
}
function Ri(e) {
  ep([
    ["cellDates", !1],
    ["bookSST", !1],
    ["bookType", "xlsx"],
    ["compression", !1],
    ["WTF", !1]
  ])(e);
}
function tp(e, r) {
  return r.bookType == "ods" ? Fs(e, r) : r.bookType == "numbers" ? Qd(e, r) : r.bookType == "xlsb" ? rp(e, r) : np(e, r);
}
function rp(e, r) {
  dr = 1024, e && !e.SSF && (e.SSF = at(Oe)), e && e.SSF && (Ln(), Nn(e.SSF), r.revssf = Pn(e.SSF), r.revssf[e.SSF[65535]] = 0, r.ssf = e.SSF), r.rels = {}, r.wbrels = {}, r.Strings = [], r.Strings.Count = 0, r.Strings.Unique = 0, Br ? r.revStrings = /* @__PURE__ */ new Map() : (r.revStrings = {}, r.revStrings.foo = [], delete r.revStrings.foo);
  var t = r.bookType == "xlsb" ? "bin" : "xml", n = ls.indexOf(r.bookType) > -1, i = b0();
  Ri(r = r || {});
  var a = gi(), s = "", o = 0;
  if (r.cellXfs = [], zt(r.cellXfs, {}, { revssf: { General: 0 } }), e.Props || (e.Props = {}), s = "docProps/core.xml", ce(a, s, X0(e.Props, r)), i.coreprops.push(s), ve(r.rels, 2, s, xe.CORE_PROPS), s = "docProps/app.xml", !(e.Props && e.Props.SheetNames))
    if (!e.Workbook || !e.Workbook.Sheets)
      e.Props.SheetNames = e.SheetNames;
    else {
      for (var c = [], f = 0; f < e.SheetNames.length; ++f)
        (e.Workbook.Sheets[f] || {}).Hidden != 2 && c.push(e.SheetNames[f]);
      e.Props.SheetNames = c;
    }
  for (e.Props.Worksheets = e.Props.SheetNames.length, ce(a, s, Y0(e.Props)), i.extprops.push(s), ve(r.rels, 3, s, xe.EXT_PROPS), e.Custprops !== e.Props && $e(e.Custprops || {}).length > 0 && (s = "docProps/custom.xml", ce(a, s, G0(e.Custprops)), i.custprops.push(s), ve(r.rels, 4, s, xe.CUST_PROPS)), o = 1; o <= e.SheetNames.length; ++o) {
    var l = { "!id": {} }, h = e.Sheets[e.SheetNames[o - 1]], x = (h || {})["!type"] || "sheet";
    switch (x) {
      case "chart":
      default:
        s = "xl/worksheets/sheet" + o + "." + t, ce(a, s, ad(o - 1, s, r, e, l)), i.sheets.push(s), ve(r.wbrels, -1, "worksheets/sheet" + o + "." + t, xe.WS[0]);
    }
    if (h) {
      var d = h["!comments"], v = !1, u = "";
      d && d.length > 0 && (u = "xl/comments" + o + "." + t, ce(a, u, fd(d, u)), i.comments.push(u), ve(l, -1, "../comments" + o + "." + t, xe.CMNT), v = !0), h["!legacy"] && v && ce(a, "xl/drawings/vmlDrawing" + o + ".vml", os(o, h["!comments"])), delete h["!comments"], delete h["!legacy"];
    }
    l["!id"].rId1 && ce(a, H0(s), gr(l));
  }
  return r.Strings != null && r.Strings.length > 0 && (s = "xl/sharedStrings." + t, ce(a, s, od(r.Strings, s, r)), i.strs.push(s), ve(r.wbrels, -1, "sharedStrings." + t, xe.SST)), s = "xl/workbook." + t, ce(a, s, id(e, s)), i.workbooks.push(s), ve(r.rels, 1, s, xe.WB), s = "xl/theme/theme1.xml", ce(a, s, as(e.Themes, r)), i.themes.push(s), ve(r.wbrels, -1, "theme/theme1.xml", xe.THEME), s = "xl/styles." + t, ce(a, s, sd(e, s, r)), i.styles.push(s), ve(r.wbrels, -1, "styles." + t, xe.STY), e.vbaraw && n && (s = "xl/vbaProject.bin", ce(a, s, e.vbaraw), i.vba.push(s), ve(r.wbrels, -1, "vbaProject.bin", xe.VBA)), s = "xl/metadata." + t, ce(a, s, ld(s)), i.metadata.push(s), ve(r.wbrels, -1, "metadata." + t, xe.XLMETA), ce(a, "[Content_Types].xml", U0(i, r)), ce(a, "_rels/.rels", gr(r.rels)), ce(a, "xl/_rels/workbook." + t + ".rels", gr(r.wbrels)), delete r.revssf, delete r.ssf, a;
}
function np(e, r) {
  dr = 1024, e && !e.SSF && (e.SSF = at(Oe)), e && e.SSF && (Ln(), Nn(e.SSF), r.revssf = Pn(e.SSF), r.revssf[e.SSF[65535]] = 0, r.ssf = e.SSF), r.rels = {}, r.wbrels = {}, r.Strings = [], r.Strings.Count = 0, r.Strings.Unique = 0, Br ? r.revStrings = /* @__PURE__ */ new Map() : (r.revStrings = {}, r.revStrings.foo = [], delete r.revStrings.foo);
  var t = "xml", n = ls.indexOf(r.bookType) > -1, i = b0();
  Ri(r = r || {});
  var a = gi(), s = "", o = 0;
  if (r.cellXfs = [], zt(r.cellXfs, {}, { revssf: { General: 0 } }), e.Props || (e.Props = {}), s = "docProps/core.xml", ce(a, s, X0(e.Props, r)), i.coreprops.push(s), ve(r.rels, 2, s, xe.CORE_PROPS), s = "docProps/app.xml", !(e.Props && e.Props.SheetNames))
    if (!e.Workbook || !e.Workbook.Sheets)
      e.Props.SheetNames = e.SheetNames;
    else {
      for (var c = [], f = 0; f < e.SheetNames.length; ++f)
        (e.Workbook.Sheets[f] || {}).Hidden != 2 && c.push(e.SheetNames[f]);
      e.Props.SheetNames = c;
    }
  e.Props.Worksheets = e.Props.SheetNames.length, ce(a, s, Y0(e.Props)), i.extprops.push(s), ve(r.rels, 3, s, xe.EXT_PROPS), e.Custprops !== e.Props && $e(e.Custprops || {}).length > 0 && (s = "docProps/custom.xml", ce(a, s, G0(e.Custprops)), i.custprops.push(s), ve(r.rels, 4, s, xe.CUST_PROPS));
  var l = ["SheetJ5"];
  for (r.tcid = 0, o = 1; o <= e.SheetNames.length; ++o) {
    var h = { "!id": {} }, x = e.Sheets[e.SheetNames[o - 1]], d = (x || {})["!type"] || "sheet";
    switch (d) {
      case "chart":
      default:
        s = "xl/worksheets/sheet" + o + "." + t, ce(a, s, ms(o - 1, r, e, h)), i.sheets.push(s), ve(r.wbrels, -1, "worksheets/sheet" + o + "." + t, xe.WS[0]);
    }
    if (x) {
      var v = x["!comments"], u = !1, g = "";
      if (v && v.length > 0) {
        var S = !1;
        v.forEach(function(A) {
          A[1].forEach(function(C) {
            C.T == !0 && (S = !0);
          });
        }), S && (g = "xl/threadedComments/threadedComment" + o + "." + t, ce(a, g, Lh(v, l, r)), i.threadedcomments.push(g), ve(h, -1, "../threadedComments/threadedComment" + o + "." + t, xe.TCMNT)), g = "xl/comments" + o + "." + t, ce(a, g, fs(v)), i.comments.push(g), ve(h, -1, "../comments" + o + "." + t, xe.CMNT), u = !0;
      }
      x["!legacy"] && u && ce(a, "xl/drawings/vmlDrawing" + o + ".vml", os(o, x["!comments"])), delete x["!comments"], delete x["!legacy"];
    }
    h["!id"].rId1 && ce(a, H0(s), gr(h));
  }
  return r.Strings != null && r.Strings.length > 0 && (s = "xl/sharedStrings." + t, ce(a, s, Q0(r.Strings, r)), i.strs.push(s), ve(r.wbrels, -1, "sharedStrings." + t, xe.SST)), s = "xl/workbook." + t, ce(a, s, Ts(e)), i.workbooks.push(s), ve(r.rels, 1, s, xe.WB), s = "xl/theme/theme1.xml", ce(a, s, as(e.Themes, r)), i.themes.push(s), ve(r.wbrels, -1, "theme/theme1.xml", xe.THEME), s = "xl/styles." + t, ce(a, s, ns(e, r)), i.styles.push(s), ve(r.wbrels, -1, "styles." + t, xe.STY), e.vbaraw && n && (s = "xl/vbaProject.bin", ce(a, s, e.vbaraw), i.vba.push(s), ve(r.wbrels, -1, "vbaProject.bin", xe.VBA)), s = "xl/metadata." + t, ce(a, s, ss()), i.metadata.push(s), ve(r.wbrels, -1, "metadata." + t, xe.XLMETA), l.length > 1 && (s = "xl/persons/person.xml", ce(a, s, Ph(l)), i.people.push(s), ve(r.wbrels, -1, "persons/person.xml", xe.PEOPLE)), ce(a, "[Content_Types].xml", U0(i, r)), ce(a, "_rels/.rels", gr(r.rels)), ce(a, "xl/_rels/workbook." + t + ".rels", gr(r.wbrels)), delete r.revssf, delete r.ssf, a;
}
function ip(e, r) {
  var t = "";
  switch ((r || {}).type || "base64") {
    case "buffer":
      return [e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7]];
    case "base64":
      t = Mt(e.slice(0, 12));
      break;
    case "binary":
      t = e;
      break;
    case "array":
      return [e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7]];
    default:
      throw new Error("Unrecognized type " + (r && r.type || "undefined"));
  }
  return [t.charCodeAt(0), t.charCodeAt(1), t.charCodeAt(2), t.charCodeAt(3), t.charCodeAt(4), t.charCodeAt(5), t.charCodeAt(6), t.charCodeAt(7)];
}
function Os(e, r) {
  switch (r.type) {
    case "base64":
    case "binary":
      break;
    case "buffer":
    case "array":
      r.type = "";
      break;
    case "file":
      return $r(r.file, Te.write(e, { type: de ? "buffer" : "" }));
    case "string":
      throw new Error("'string' output type invalid for '" + r.bookType + "' files");
    default:
      throw new Error("Unrecognized type " + r.type);
  }
  return Te.write(e, r);
}
function ap(e, r) {
  var t = at(r || {}), n = tp(e, t);
  return sp(n, t);
}
function sp(e, r) {
  var t = {}, n = de ? "nodebuffer" : typeof Uint8Array < "u" ? "array" : "string";
  if (r.compression && (t.compression = "DEFLATE"), r.password)
    t.type = n;
  else
    switch (r.type) {
      case "base64":
        t.type = "base64";
        break;
      case "binary":
        t.type = "string";
        break;
      case "string":
        throw new Error("'string' output type invalid for '" + r.bookType + "' files");
      case "buffer":
      case "file":
        t.type = n;
        break;
      default:
        throw new Error("Unrecognized type " + r.type);
    }
  var i = e.FullPaths ? Te.write(e, { fileType: "zip", type: { nodebuffer: "buffer", string: "binary" }[t.type] || t.type, compression: !!r.compression }) : e.generate(t);
  if (typeof Deno < "u" && typeof i == "string") {
    if (r.type == "binary" || r.type == "base64")
      return i;
    i = new Uint8Array(Rn(i));
  }
  return r.password && typeof encrypt_agile < "u" ? Os(encrypt_agile(i, r.password), r) : r.type === "file" ? $r(r.file, i) : r.type == "string" ? Nr(i) : i;
}
function op(e, r) {
  var t = r || {}, n = Sd(e, t);
  return Os(n, t);
}
function At(e, r, t) {
  t || (t = "");
  var n = t + e;
  switch (r.type) {
    case "base64":
      return Ur(kt(n));
    case "binary":
      return kt(n);
    case "string":
      return e;
    case "file":
      return $r(r.file, n, "utf8");
    case "buffer":
      return de ? bt(n, "utf8") : typeof TextEncoder < "u" ? new TextEncoder().encode(n) : At(n, { type: "binary" }).split("").map(function(i) {
        return i.charCodeAt(0);
      });
  }
  throw new Error("Unrecognized type " + r.type);
}
function fp(e, r) {
  switch (r.type) {
    case "base64":
      return Ur(e);
    case "binary":
      return e;
    case "string":
      return e;
    case "file":
      return $r(r.file, e, "binary");
    case "buffer":
      return de ? bt(e, "binary") : e.split("").map(function(t) {
        return t.charCodeAt(0);
      });
  }
  throw new Error("Unrecognized type " + r.type);
}
function cn(e, r) {
  switch (r.type) {
    case "string":
    case "base64":
    case "binary":
      for (var t = "", n = 0; n < e.length; ++n)
        t += String.fromCharCode(e[n]);
      return r.type == "base64" ? Ur(t) : r.type == "string" ? Nr(t) : t;
    case "file":
      return $r(r.file, e);
    case "buffer":
      return e;
    default:
      throw new Error("Unrecognized type " + r.type);
  }
}
function Ds(e, r) {
  Pf(), zx(e);
  var t = at(r || {});
  if (t.cellStyles && (t.cellNF = !0, t.sheetStubs = !0), t.type == "array") {
    t.type = "binary";
    var n = Ds(e, t);
    return t.type = "array", Rn(n);
  }
  var i = 0;
  if (t.sheet && (typeof t.sheet == "number" ? i = t.sheet : i = e.SheetNames.indexOf(t.sheet), !e.SheetNames[i]))
    throw new Error("Sheet not found: " + t.sheet + " : " + typeof t.sheet);
  switch (t.bookType || "xlsb") {
    case "xml":
    case "xlml":
      return At(Td(e, t), t);
    case "slk":
    case "sylk":
      return At(Yc.from_sheet(e.Sheets[e.SheetNames[i]], t), t);
    case "htm":
    case "html":
      return At(ys(e.Sheets[e.SheetNames[i]], t), t);
    case "txt":
      return fp(Is(e.Sheets[e.SheetNames[i]], t), t);
    case "csv":
      return At(Ni(e.Sheets[e.SheetNames[i]], t), t, "\uFEFF");
    case "dif":
      return At(Gc.from_sheet(e.Sheets[e.SheetNames[i]], t), t);
    case "dbf":
      return cn(Vc.from_sheet(e.Sheets[e.SheetNames[i]], t), t);
    case "prn":
      return At($c.from_sheet(e.Sheets[e.SheetNames[i]], t), t);
    case "rtf":
      return At(Qc.from_sheet(e.Sheets[e.SheetNames[i]], t), t);
    case "eth":
      return At(Z0.from_sheet(e.Sheets[e.SheetNames[i]], t), t);
    case "fods":
      return At(Fs(e, t), t);
    case "wk1":
      return cn(ka.sheet_to_wk1(e.Sheets[e.SheetNames[i]], t), t);
    case "wk3":
      return cn(ka.book_to_wk3(e, t), t);
    case "biff2":
      t.biff || (t.biff = 2);
    case "biff3":
      t.biff || (t.biff = 3);
    case "biff4":
      return t.biff || (t.biff = 4), cn(Ss(e, t), t);
    case "biff5":
      t.biff || (t.biff = 5);
    case "biff8":
    case "xla":
    case "xls":
      return t.biff || (t.biff = 8), op(e, t);
    case "xlsx":
    case "xlsm":
    case "xlam":
    case "xlsb":
    case "numbers":
    case "ods":
      return ap(e, t);
    default:
      throw new Error("Unrecognized bookType |" + t.bookType + "|");
  }
}
function lp(e, r, t, n, i, a, s, o) {
  var c = Ge(t), f = o.defval, l = o.raw || !Object.prototype.hasOwnProperty.call(o, "raw"), h = !0, x = i === 1 ? [] : {};
  if (i !== 1)
    if (Object.defineProperty)
      try {
        Object.defineProperty(x, "__rowNum__", { value: t, enumerable: !1 });
      } catch {
        x.__rowNum__ = t;
      }
    else
      x.__rowNum__ = t;
  if (!s || e[t])
    for (var d = r.s.c; d <= r.e.c; ++d) {
      var v = s ? e[t][d] : e[n[d] + c];
      if (v === void 0 || v.t === void 0) {
        if (f === void 0)
          continue;
        a[d] != null && (x[a[d]] = f);
        continue;
      }
      var u = v.v;
      switch (v.t) {
        case "z":
          if (u == null)
            break;
          continue;
        case "e":
          u = u == 0 ? null : void 0;
          break;
        case "s":
        case "d":
        case "b":
        case "n":
          break;
        default:
          throw new Error("unrecognized type " + v.t);
      }
      if (a[d] != null) {
        if (u == null)
          if (v.t == "e" && u === null)
            x[a[d]] = null;
          else if (f !== void 0)
            x[a[d]] = f;
          else if (l && u === null)
            x[a[d]] = null;
          else
            continue;
        else
          x[a[d]] = l && (v.t !== "n" || v.t === "n" && o.rawNumbers !== !1) ? u : Bt(v, u, o);
        u != null && (h = !1);
      }
    }
  return { row: x, isempty: h };
}
function Dn(e, r) {
  if (e == null || e["!ref"] == null)
    return [];
  var t = { t: "n", v: 0 }, n = 0, i = 1, a = [], s = 0, o = "", c = { s: { r: 0, c: 0 }, e: { r: 0, c: 0 } }, f = r || {}, l = f.range != null ? f.range : e["!ref"];
  switch (f.header === 1 ? n = 1 : f.header === "A" ? n = 2 : Array.isArray(f.header) ? n = 3 : f.header == null && (n = 0), typeof l) {
    case "string":
      c = Se(l);
      break;
    case "number":
      c = Se(e["!ref"]), c.s.r = l;
      break;
    default:
      c = l;
  }
  n > 0 && (i = 0);
  var h = Ge(c.s.r), x = [], d = [], v = 0, u = 0, g = Array.isArray(e), S = c.s.r, A = 0, C = {};
  g && !e[S] && (e[S] = []);
  var I = f.skipHidden && e["!cols"] || [], Y = f.skipHidden && e["!rows"] || [];
  for (A = c.s.c; A <= c.e.c; ++A)
    if (!(I[A] || {}).hidden)
      switch (x[A] = je(A), t = g ? e[S][A] : e[x[A] + h], n) {
        case 1:
          a[A] = A - c.s.c;
          break;
        case 2:
          a[A] = x[A];
          break;
        case 3:
          a[A] = f.header[A - c.s.c];
          break;
        default:
          if (t == null && (t = { w: "__EMPTY", t: "s" }), o = s = Bt(t, null, f), u = C[s] || 0, !u)
            C[s] = 1;
          else {
            do
              o = s + "_" + u++;
            while (C[o]);
            C[s] = u, C[o] = 1;
          }
          a[A] = o;
      }
  for (S = c.s.r + i; S <= c.e.r; ++S)
    if (!(Y[S] || {}).hidden) {
      var Q = lp(e, c, S, x, n, a, g, f);
      (Q.isempty === !1 || (n === 1 ? f.blankrows !== !1 : !!f.blankrows)) && (d[v++] = Q.row);
    }
  return d.length = v, d;
}
var Ua = /"/g;
function cp(e, r, t, n, i, a, s, o) {
  for (var c = !0, f = [], l = "", h = Ge(t), x = r.s.c; x <= r.e.c; ++x)
    if (!!n[x]) {
      var d = o.dense ? (e[t] || [])[x] : e[n[x] + h];
      if (d == null)
        l = "";
      else if (d.v != null) {
        c = !1, l = "" + (o.rawNumbers && d.t == "n" ? d.v : Bt(d, null, o));
        for (var v = 0, u = 0; v !== l.length; ++v)
          if ((u = l.charCodeAt(v)) === i || u === a || u === 34 || o.forceQuotes) {
            l = '"' + l.replace(Ua, '""') + '"';
            break;
          }
        l == "ID" && (l = '"ID"');
      } else
        d.f != null && !d.F ? (c = !1, l = "=" + d.f, l.indexOf(",") >= 0 && (l = '"' + l.replace(Ua, '""') + '"')) : l = "";
      f.push(l);
    }
  return o.blankrows === !1 && c ? null : f.join(s);
}
function Ni(e, r) {
  var t = [], n = r == null ? {} : r;
  if (e == null || e["!ref"] == null)
    return "";
  var i = Se(e["!ref"]), a = n.FS !== void 0 ? n.FS : ",", s = a.charCodeAt(0), o = n.RS !== void 0 ? n.RS : `
`, c = o.charCodeAt(0), f = new RegExp((a == "|" ? "\\|" : a) + "+$"), l = "", h = [];
  n.dense = Array.isArray(e);
  for (var x = n.skipHidden && e["!cols"] || [], d = n.skipHidden && e["!rows"] || [], v = i.s.c; v <= i.e.c; ++v)
    (x[v] || {}).hidden || (h[v] = je(v));
  for (var u = 0, g = i.s.r; g <= i.e.r; ++g)
    (d[g] || {}).hidden || (l = cp(e, i, g, h, s, c, a, n), l != null && (n.strip && (l = l.replace(f, "")), (l || n.blankrows !== !1) && t.push((u++ ? o : "") + l)));
  return delete n.dense, t.join("");
}
function Is(e, r) {
  r || (r = {}), r.FS = "	", r.RS = `
`;
  var t = Ni(e, r);
  return t;
}
function hp(e) {
  var r = "", t, n = "";
  if (e == null || e["!ref"] == null)
    return [];
  var i = Se(e["!ref"]), a = "", s = [], o, c = [], f = Array.isArray(e);
  for (o = i.s.c; o <= i.e.c; ++o)
    s[o] = je(o);
  for (var l = i.s.r; l <= i.e.r; ++l)
    for (a = Ge(l), o = i.s.c; o <= i.e.c; ++o)
      if (r = s[o] + a, t = f ? (e[l] || [])[o] : e[r], n = "", t !== void 0) {
        if (t.F != null) {
          if (r = t.F, !t.f)
            continue;
          n = t.f, r.indexOf(":") == -1 && (r = r + ":" + r);
        }
        if (t.f != null)
          n = t.f;
        else {
          if (t.t == "z")
            continue;
          if (t.t == "n" && t.v != null)
            n = "" + t.v;
          else if (t.t == "b")
            n = t.v ? "TRUE" : "FALSE";
          else if (t.w !== void 0)
            n = "'" + t.w;
          else {
            if (t.v === void 0)
              continue;
            t.t == "s" ? n = "'" + t.v : n = "" + t.v;
          }
        }
        c[c.length] = r + "=" + n;
      }
  return c;
}
function ks(e, r, t) {
  var n = t || {}, i = +!n.skipHeader, a = e || {}, s = 0, o = 0;
  if (a && n.origin != null)
    if (typeof n.origin == "number")
      s = n.origin;
    else {
      var c = typeof n.origin == "string" ? be(n.origin) : n.origin;
      s = c.r, o = c.c;
    }
  var f, l = { s: { c: 0, r: 0 }, e: { c: o, r: s + r.length - 1 + i } };
  if (a["!ref"]) {
    var h = Se(a["!ref"]);
    l.e.c = Math.max(l.e.c, h.e.c), l.e.r = Math.max(l.e.r, h.e.r), s == -1 && (s = h.e.r + 1, l.e.r = s + r.length - 1 + i);
  } else
    s == -1 && (s = 0, l.e.r = r.length - 1 + i);
  var x = n.header || [], d = 0;
  r.forEach(function(u, g) {
    $e(u).forEach(function(S) {
      (d = x.indexOf(S)) == -1 && (x[d = x.length] = S);
      var A = u[S], C = "z", I = "", Y = _e({ c: o + d, r: s + g + i });
      f = Vr(a, Y), A && typeof A == "object" && !(A instanceof Date) ? a[Y] = A : (typeof A == "number" ? C = "n" : typeof A == "boolean" ? C = "b" : typeof A == "string" ? C = "s" : A instanceof Date ? (C = "d", n.cellDates || (C = "n", A = it(A)), I = n.dateNF || Oe[14]) : A === null && n.nullError && (C = "e", A = 0), f ? (f.t = C, f.v = A, delete f.w, delete f.R, I && (f.z = I)) : a[Y] = f = { t: C, v: A }, I && (f.z = I));
    });
  }), l.e.c = Math.max(l.e.c, o + x.length - 1);
  var v = Ge(s);
  if (i)
    for (d = 0; d < x.length; ++d)
      a[je(d + o) + v] = { t: "s", v: x[d] };
  return a["!ref"] = ke(l), a;
}
function up(e, r) {
  return ks(null, e, r);
}
function Vr(e, r, t) {
  if (typeof r == "string") {
    if (Array.isArray(e)) {
      var n = be(r);
      return e[n.r] || (e[n.r] = []), e[n.r][n.c] || (e[n.r][n.c] = { t: "z" });
    }
    return e[r] || (e[r] = { t: "z" });
  }
  return typeof r != "number" ? Vr(e, _e(r)) : Vr(e, _e({ r, c: t || 0 }));
}
function xp(e, r) {
  if (typeof r == "number") {
    if (r >= 0 && e.SheetNames.length > r)
      return r;
    throw new Error("Cannot find sheet # " + r);
  } else if (typeof r == "string") {
    var t = e.SheetNames.indexOf(r);
    if (t > -1)
      return t;
    throw new Error("Cannot find sheet name |" + r + "|");
  } else
    throw new Error("Cannot find sheet |" + r + "|");
}
function dp() {
  return { SheetNames: [], Sheets: {} };
}
function pp(e, r, t, n) {
  var i = 1;
  if (!t)
    for (; i <= 65535 && e.SheetNames.indexOf(t = "Sheet" + i) != -1; ++i, t = void 0)
      ;
  if (!t || e.SheetNames.length >= 65535)
    throw new Error("Too many worksheets");
  if (n && e.SheetNames.indexOf(t) >= 0) {
    var a = t.match(/(^.*?)(\d+)$/);
    i = a && +a[2] || 0;
    var s = a && a[1] || t;
    for (++i; i <= 65535 && e.SheetNames.indexOf(t = s + i) != -1; ++i)
      ;
  }
  if (ws(t), e.SheetNames.indexOf(t) >= 0)
    throw new Error("Worksheet with name |" + t + "| already exists!");
  return e.SheetNames.push(t), e.Sheets[t] = r, t;
}
function gp(e, r, t) {
  e.Workbook || (e.Workbook = {}), e.Workbook.Sheets || (e.Workbook.Sheets = []);
  var n = xp(e, r);
  switch (e.Workbook.Sheets[n] || (e.Workbook.Sheets[n] = {}), t) {
    case 0:
    case 1:
    case 2:
      break;
    default:
      throw new Error("Bad sheet visibility setting " + t);
  }
  e.Workbook.Sheets[n].Hidden = t;
}
function vp(e, r) {
  return e.z = r, e;
}
function Rs(e, r, t) {
  return r ? (e.l = { Target: r }, t && (e.l.Tooltip = t)) : delete e.l, e;
}
function mp(e, r, t) {
  return Rs(e, "#" + r, t);
}
function _p(e, r, t) {
  e.c || (e.c = []), e.c.push({ t: r, a: t || "SheetJS" });
}
function wp(e, r, t, n) {
  for (var i = typeof r != "string" ? r : Se(r), a = typeof r == "string" ? r : ke(r), s = i.s.r; s <= i.e.r; ++s)
    for (var o = i.s.c; o <= i.e.c; ++o) {
      var c = Vr(e, s, o);
      c.t = "n", c.F = a, delete c.v, s == i.s.r && o == i.s.c && (c.f = t, n && (c.D = !0));
    }
  return e;
}
var Ha = {
  encode_col: je,
  encode_row: Ge,
  encode_cell: _e,
  encode_range: ke,
  decode_col: Ei,
  decode_row: Ti,
  split_cell: Ml,
  decode_cell: be,
  decode_range: ht,
  format_cell: Bt,
  sheet_add_aoa: R0,
  sheet_add_json: ks,
  sheet_add_dom: As,
  aoa_to_sheet: Sr,
  json_to_sheet: up,
  table_to_sheet: Cs,
  table_to_book: Gd,
  sheet_to_csv: Ni,
  sheet_to_txt: Is,
  sheet_to_json: Dn,
  sheet_to_html: ys,
  sheet_to_formulae: hp,
  sheet_to_row_object_array: Dn,
  sheet_get_cell: Vr,
  book_new: dp,
  book_append_sheet: pp,
  book_set_sheet_visibility: gp,
  cell_set_number_format: vp,
  cell_set_hyperlink: Rs,
  cell_set_internal_link: mp,
  cell_add_comment: _p,
  sheet_set_array_formula: wp,
  consts: {
    SHEET_VISIBLE: 0,
    SHEET_HIDDEN: 1,
    SHEET_VERY_HIDDEN: 2
  }
};
function Tp(e) {
  const r = {}, t = {
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
    for (let i = 0; i != e[n].length; ++i) {
      t.s.r > n && (t.s.r = n), t.s.c > i && (t.s.c = i), t.e.r < n && (t.e.r = n), t.e.c < i && (t.e.c = i);
      const a = {
        v: e[n][i]
      };
      if (a.v == null)
        continue;
      const s = Ha.encode_cell({
        c: i,
        r: n
      });
      typeof a.v == "number" ? a.t = "n" : typeof a.v == "boolean" ? a.t = "b" : a.t = "s", r[s] = a;
    }
  return t.s.c < 1e7 && (r["!ref"] = Ha.encode_range(t)), r;
}
class Ep {
  constructor() {
    Gn(this, "SheetNames", []);
    Gn(this, "Sheets", {});
  }
}
const Sp = (e) => {
  const r = new ArrayBuffer(e.length), t = new Uint8Array(r);
  for (let n = 0; n < e.length; ++n)
    t[n] = e.charCodeAt(n) & 255;
  return r;
}, yp = ({ header: e, data: r, filename: t }) => {
  r = rt(r), r.unshift(e);
  const n = "SheetJS", i = new Ep(), a = Tp(r), s = r.map((f) => f.map((l) => l == null ? {
    wch: 10
  } : l.toString().charCodeAt(0) > 255 ? {
    wch: l.toString().length * 2
  } : {
    wch: l.toString().length
  }));
  let o = s[0];
  for (let f = 1; f < s.length; f++)
    for (let l = 0; l < s[f].length; l++)
      o[l].wch < s[f][l].wch && (o[l].wch = s[f][l].wch);
  a["!cols"] = o, i.SheetNames.push(n), i.Sheets[n] = a;
  const c = Ds(i, {
    bookType: "xlsx",
    bookSST: !1,
    type: "binary"
  });
  Za.exports.saveAs(
    new Blob([Sp(c)], {
      type: "application/octet-stream"
    }),
    `${t}.xlsx`
  );
}, Vp = async ({ filename: e, tableHead: r, tableData: t }) => {
  const n = (c) => {
    let f = /<\/?.+?\/?>/g;
    return f.test(c) ? c.replace(f, "") : c;
  }, i = async (c, f) => {
    const l = [];
    for (const h of f) {
      const x = [], d = c.length;
      for (let v = 0; v < d; v++) {
        const u = c[v];
        let g = h[u.prop];
        if (u.render) {
          const S = u.render(h, v);
          S && Array.isArray(S.children) && S.children.length > 1 && S.children.forEach((A) => {
            A && typeof A.children == "string" && (A.children += `
`);
          }), g = await Ja(S);
        }
        g = n(g), x.push(g);
      }
      l.push(x);
    }
    return l;
  }, a = r.filter((c) => !c.only_display), s = a.map((c) => c.label), o = Ao({
    lock: !0,
    text: "\u6570\u636E\u5BFC\u51FA\u4E2D...",
    background: "rgba(0, 0, 0, 0.7)"
  });
  return new Promise((c) => {
    setTimeout(async () => {
      const f = await i(a, t);
      await yp({
        header: s,
        data: f,
        filename: e
      }), o.close(), dn.success("\u5BFC\u51FA\u6210\u529F\uFF01"), c(!0);
    }, 500);
  });
}, Yp = (e, r = 60, t = "\u83B7\u53D6\u9A8C\u8BC1\u7801") => {
  const n = he(r), i = he(t), a = he(), s = () => {
    n.value--, i.value = `${n.value} \u79D2\u540E\u91CD\u8BD5`, a.value = setInterval(() => {
      n.value > 0 ? (n.value--, i.value = `${n.value} \u79D2\u540E\u91CD\u8BD5`) : o();
    }, 1e3);
  }, o = () => {
    n.value = r, i.value = t, clearInterval(a.value);
  }, c = he(!1), f = () => {
    c.value = !0;
  };
  return {
    getCode: () => {
      n.value === r && f();
    },
    tip: i,
    showSlider: c,
    pass: async () => {
      console.log("\u9A8C\u8BC1\u901A\u8FC7"), c.value = !1, await e(), s();
    },
    cancel: () => {
      console.log("\u53D6\u6D88\u9A8C\u8BC1"), c.value = !1;
    }
  };
}, Ap = (e, r = 9999) => {
  var i;
  const t = document.createElement("div"), n = U(Jo, {
    onDestroy: () => {
      document.body.removeChild(t);
    },
    zIndex: r
  });
  ao(n, t), document.body.appendChild(t), (i = n.component.exposed) == null || i.show(e);
}, Cp = (e, r, t = "enter") => {
  e.key.toLocaleLowerCase() === t && (e.preventDefault(), r());
}, Gp = (e, r) => {
  const t = he(rt(e));
  return {
    query: t,
    reset: () => {
      t.value = rt(e), r();
    }
  };
}, $p = (e) => {
  const r = he(!1), t = he(""), n = he([]), i = async (s) => {
    s = s.trim();
    const o = await e(s);
    o && (n.value = o);
  }, a = he(!1);
  return {
    loading: r,
    search: i,
    searchStr: t,
    options: n,
    init: a
  };
};
export {
  qo as YoungDateRange,
  Go as YoungDialog,
  Jo as YoungImageViewer,
  Pp as YoungPagination,
  Up as YoungRotateTip,
  bp as YoungSearchForm,
  zo as YoungSelect,
  Lp as YoungTable,
  Hp as YoungTablePro,
  Bp as YoungTimeRange,
  Wp as YoungUpload,
  Mp as YoungWeekday,
  qi as useAutoLoad,
  Vp as useExport2Excel,
  Xp as useFormMode,
  Ap as useImagePreview,
  Cp as useKeyUp,
  Gp as useQuery,
  $p as useRemoteSearch,
  Yp as useVerifyCode
};
//# sourceMappingURL=index.es.js.map
