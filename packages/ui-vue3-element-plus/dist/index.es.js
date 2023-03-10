var Ns = Object.defineProperty;
var Is = (e, t, r) => t in e ? Ns(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var Nn = (e, t, r) => (Is(e, typeof t != "symbol" ? t + "" : t, r), r);
import { defineComponent as qr, onMounted as ks, ref as De, onActivated as Ps, nextTick as At, watchEffect as $n, createVNode as we, mergeProps as Dr, Fragment as mn, createTextVNode as Fa, computed as C0, watch as O0, Teleport as Ls, isVNode as ya, initDirectivesForSSR as Ms, createApp as Bs, ssrContextKey as Ca, warn as en, Static as bs, Comment as Us, Text as Ws, ssrUtils as Oa } from "vue";
import { deepClone as Pr, randomId as Da, recentDay as Hs } from "@bluesyoung/utils";
import { ElTable as Vs, ElTableColumn as D0, ElTooltip as Gs, ElPagination as Xs, ElDialog as js, ElButton as R0, ElMessageBox as Ra, ElSelect as $s, ElOption as zs, ElCheckboxGroup as Ks, ElCheckbox as Ys, ElTimeSelect as N0, ElDatePicker as Js, ElLoadingService as qs, ElMessage as Zs } from "element-plus";
import { useIntersectionObserver as Qs } from "@vueuse/core";
import { makeMap as ef, isPromise as zn, isFunction as rf, NOOP as I0, isString as dt, escapeHtmlComment as tf, escapeHtml as Br, isVoidTag as nf, isOn as af, isSVGTag as sf, propsToAttrMap as ff, isBooleanAttr as lf, includeBooleanAttr as of, isSSRSafeAttrName as cf, normalizeClass as hf, normalizeStyle as uf, stringifyStyle as xf, isArray as df } from "@vue/shared";
const k2 = qr({
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
      type: Number,
      default: 600
    },
    selectable: {
      type: Boolean,
      default: !1
    },
    rowDraggable: {
      type: Boolean,
      default: !1
    }
    /**
     * 列排序有 bug，暂不放出
     */
    // colDraggable: {
    //   type: Boolean,
    //   default: false
    // }
  },
  emits: [
    "row-drag-change"
    //  'col-drag-change'
  ],
  setup(e, {
    emit: t,
    attrs: r,
    slots: n
  }) {
    ks(async () => {
      if (e.rowDraggable) {
        const {
          default: o
        } = await import("sortablejs");
        if (e.rowDraggable) {
          const l = a.value.$el.querySelector("tbody");
          l.style.cursor = "move", new o(l, {
            animation: 150,
            onEnd: ({
              oldIndex: c,
              newIndex: u
            }) => {
              if (c === u)
                return;
              const h = f.value, p = Pr(h[c]);
              h.splice(c, 1), h.splice(u, 0, p), t("row-drag-change", f.value);
            }
          });
        }
      }
    });
    const a = De(null);
    Ps(() => {
      At(() => {
        a.value.doLayout();
      });
    });
    const i = De([]), s = De([]), f = De([]);
    return $n(() => {
      const o = e.tableData, l = e.tableHead, c = o.length;
      At(() => {
        s.value = l.filter((h) => !h.only_export);
        const u = 50;
        if (c <= u)
          i.value = Pr(o), f.value = Pr(o);
        else {
          const {
            elArr: h,
            load: p
          } = P0(i, De(o), u), {
            elArr: _,
            load: x
          } = P0(f, De(o), u);
          let g = 0;
          i.value = o.slice(g, u), f.value = o.slice(g, u), At(() => {
            h.value = a.value.$el.querySelector("tbody").children, p();
          }), At(() => {
            _.value = a.value.$el.querySelector("tbody").children, x();
          });
        }
      });
    }), () => we(Vs, Dr(r, {
      ref: a,
      data: i.value,
      style: {
        width: "100%"
      },
      height: e.tableHeight
    }), {
      default: () => {
        var o, l;
        return [e.selectable && we(D0, {
          type: "selection",
          width: "55"
        }, null), s.value.map((c, u) => we(D0, {
          key: u,
          prop: c.prop,
          label: c.label,
          width: c.width || "",
          sortable: c.sortable || !1,
          fixed: c.fixed || !1,
          align: c.aligin || "left",
          showOverflowTooltip: c.show_overflow_tooltip ?? !0
        }, {
          header: (h) => s.value[u].tool_content ? we(mn, null, [we("span", null, [h.column.label]), we(Gs, {
            placement: "bottom"
          }, {
            default: () => [Fa("？")],
            content: () => s.value[u].tool_content
          })]) : we("span", null, [h.column.label]),
          default: (h) => c.render ? c.render(h.row, h.$index) : we("span", null, [h.row[c.prop]])
        })), (o = n.switch) == null ? void 0 : o.call(n), (l = n.operate) == null ? void 0 : l.call(n)];
      }
    });
  }
}), In = {
  type: Number,
  required: !0
}, P2 = qr({
  props: {
    total: In,
    page: In,
    limit: In,
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
    const n = (i) => {
      t("update:page", 1), t("update:limit", i), t("page-change");
    }, a = (i) => {
      t("update:page", i), t("page-change");
    };
    return () => we("div", {
      style: "background: white; padding-top: 20px;"
    }, [we(Xs, Dr(r, {
      background: e.background,
      currentPage: e.page,
      pageSize: e.limit,
      layout: e.layout,
      pageSizes: e.pageSizes,
      total: e.total,
      "onUpdate:page-size": (i) => n(i),
      "onUpdate:current-page": (i) => a(i)
    }), null)]);
  }
}), L2 = qr({
  props: {
    modelValue: Boolean,
    realTitle: String,
    sureText: {
      type: String,
      default: "确定"
    },
    cancelText: {
      type: String,
      default: "取消"
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
    /**
     * 对比 form 表单
     */
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
    const a = De(""), i = C0(() => {
      let l = "新建";
      return e.isEdit && (l = "编辑"), e.isMore && (l = "详情"), l;
    }), s = C0({
      get: () => e.isAdd || e.isMore || e.isEdit,
      set: (l) => null
    });
    e.diffForm && O0(() => s.value, (l, c) => {
      l && !c && (a.value = JSON.stringify(e.diffForm));
    }), e.diffForm && O0(() => e.modelValue, (l, c) => {
      l && !c && (a.value = JSON.stringify(e.diffForm));
    });
    const f = async () => {
      if (!(e.sureFn && await e.sureFn() === !1)) {
        if (e.isMore) {
          t("clear");
          return;
        }
        t("update:modelValue", !1), t("sure");
      }
    }, o = () => {
      const l = JSON.stringify(e.diffForm);
      if (e.isMore || !e.showCancel) {
        t("clear"), t("update:modelValue", !1);
        return;
      }
      if (e.diffForm && a.value === l) {
        t("clear"), t("update:modelValue", !1);
        return;
      } else
        Ra.confirm("数据未保存，关闭将丢失数据，确认关闭？", "提示").then(() => {
          t("update:modelValue", !1), t("clear");
        }).catch(() => null);
    };
    return () => we(Ls, {
      to: "body"
    }, {
      default: () => [we(js, Dr(r, {
        modelValue: e.modelValue || s.value,
        title: e.realTitle || i.value,
        closeOnClickModal: !0,
        closeOnPressEscape: !1,
        beforeClose: o
      }), {
        default: () => {
          var l;
          return (l = n.body) == null ? void 0 : l.call(n);
        },
        footer: () => {
          var l, c, u;
          return we(mn, null, [(l = n.button) == null ? void 0 : l.call(n), e.showCancel && we(R0, {
            onClick: () => o()
          }, {
            default: () => [e.cancelText]
          }), (c = n.step1) == null ? void 0 : c.call(n), (u = n.step2) == null ? void 0 : u.call(n), e.showSure && we(R0, {
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
function pf(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !ya(e);
}
const M2 = qr({
  props: {
    options: {
      type: Object,
      required: !0
    }
  },
  setup(e, {
    attrs: t
  }) {
    const r = Da();
    return () => {
      let n;
      return we($s, t, pf(n = e.options.map((a, i) => we(zs, Dr(a, {
        key: i + r
      }), null))) ? n : {
        default: () => [n]
      });
    };
  }
});
function k0(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !ya(e);
}
const vf = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"], B2 = qr({
  props: {
    modelValue: {
      type: Object,
      required: !0
    }
  },
  emits: ["update:modelValue"],
  setup(e, {
    attrs: t,
    emit: r
  }) {
    const n = Da();
    return () => {
      let a;
      return we(Ks, Dr(t, {
        modelValue: e.modelValue,
        onChange: (i) => r("update:modelValue", i)
      }), k0(a = vf.map((i, s) => we(Ys, {
        label: s + 1,
        key: s + n
      }, k0(i) ? i : {
        default: () => [i]
      }))) ? a : {
        default: () => [a]
      });
    };
  }
}), b2 = qr({
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
    }
  },
  emits: ["update:start", "update:end"],
  setup(e, {
    attrs: t,
    emit: r
  }) {
    return () => we(mn, null, [we(N0, Dr(t, {
      modelValue: e.start,
      class: "w-120px mr-2",
      maxTime: e.end,
      placeholder: "开始时间",
      start: e.startTime,
      step: e.step,
      end: e.endTime,
      "onUpdate:modelValue": (n) => r("update:start", n)
    }), null), Fa("-  "), we(N0, Dr(t, {
      modelValue: e.end,
      class: "w-120px",
      minTime: e.start,
      placeholder: "结束时间",
      start: e.startTime,
      step: e.step,
      end: e.endTime,
      "onUpdate:modelValue": (n) => r("update:end", n)
    }), null)]);
  }
}), U2 = qr({
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
    }
  },
  emits: ["update:start", "update:end"],
  setup(e, {
    attrs: t,
    emit: r
  }) {
    const n = De();
    $n(() => {
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
    return () => we(Js, Dr(t, {
      modelValue: n.value,
      type: "daterange",
      "start-placeholder": "开始日期",
      "end-placeholder": "结束日期",
      "default-time": Hs(),
      clearable: !0,
      "onUpdate:modelValue": (i) => a(i)
    }), null);
  }
}), P0 = (e, t, r = 10, n = De(!1)) => {
  const a = De([]), i = De(!1), s = De(1), f = () => {
    const { stop: o } = Qs(
      a.value[e.value.length - 1],
      ([{ isIntersecting: l }]) => {
        l && (i.value = l, o());
      }
    );
  };
  return $n(async () => {
    if (!n.value && i.value) {
      if (e.value.length === t.value.length)
        return;
      s.value++;
      const o = t.value.slice(r * (s.value - 1), r * s.value);
      if (o.length === 0)
        return;
      e.value.push(...o), i.value = !1, await At(), f();
    }
  }), {
    elArr: a,
    touchEndEl: i,
    page: s,
    load: f
  };
}, W2 = (e, { addCbk: t, modCbk: r, delCbk: n, cpEffect: a, cgEffect: i, clearEffect: s, disableclear: f }, o = "确认删除该条数据？") => {
  const l = De(!1), c = De(!1), u = De(!1), h = De(Pr(e)), p = De(), _ = async () => await new Promise((j) => {
    var Q;
    (Q = p.value) == null || Q.validate(async (D) => {
      D && j(!0);
    }).catch((D) => {
      j(!1);
    });
  }), x = () => {
    l.value = !1, c.value = !1, u.value = !1, s == null || s(), h.value = Pr(e);
  };
  return {
    isAdd: l,
    isEdit: c,
    isMore: u,
    clear: x,
    edit: async (L) => {
      const j = await (a == null ? void 0 : a(L));
      h.value = Pr(j || L), c.value = !0;
    },
    more: async (L) => {
      const j = await (a == null ? void 0 : a(L));
      h.value = Pr(j || L), u.value = !0;
    },
    form: h,
    del: (L) => {
      Ra.confirm(o, "提示", {
        type: "warning"
      }).then(async () => {
        await (n == null ? void 0 : n(L)), i == null || i();
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
    formRef: p,
    validForm: _
  };
}, mf = ef(",key,ref,innerHTML,textContent,ref_key,ref_for");
function gf(e, t) {
  let r = "";
  for (const n in e) {
    if (mf(n) || af(n) || t === "textarea" && n === "value")
      continue;
    const a = e[n];
    n === "class" ? r += ` class="${Ef(a)}"` : n === "style" ? r += ` style="${wf(a)}"` : r += _f(n, a, t);
  }
  return r;
}
function _f(e, t, r) {
  if (!Tf(t))
    return "";
  const n = r && (r.indexOf("-") > 0 || sf(r)) ? e : ff[e] || e.toLowerCase();
  return lf(n) ? of(t) ? ` ${n}` : "" : cf(n) ? t === "" ? ` ${n}` : ` ${n}="${Br(t)}"` : (console.warn(`[@vue/server-renderer] Skipped rendering unsafe attribute name: ${n}`), "");
}
function Tf(e) {
  if (e == null)
    return !1;
  const t = typeof e;
  return t === "string" || t === "number" || t === "boolean";
}
function Ef(e) {
  return Br(hf(e));
}
function wf(e) {
  if (!e)
    return "";
  if (dt(e))
    return Br(e);
  const t = uf(e);
  return Br(xf(t));
}
function Sf(e, t) {
  throw new Error("On-the-fly template compilation is not supported in the ESM build of @vue/server-renderer. All templates must be pre-compiled into render functions.");
}
function Af(e, t, r, n, a) {
  e("<!--teleport start-->");
  const i = a.appContext.provides[Ca], s = i.__teleportBuffers || (i.__teleportBuffers = {}), f = s[r] || (s[r] = []), o = f.length;
  let l;
  if (n)
    t(e), l = "<!--teleport anchor-->";
  else {
    const { getBuffer: c, push: u } = Na();
    t(u), u("<!--teleport anchor-->"), l = c();
  }
  f.splice(o, 0, l), e("<!--teleport end-->");
}
const { createComponentInstance: Ff, setCurrentRenderingInstance: L0, setupComponent: yf, renderComponentRoot: M0, normalizeVNode: Cf } = Oa;
function Na() {
  let e = !1;
  const t = [];
  return {
    getBuffer() {
      return t;
    },
    push(r) {
      const n = dt(r);
      e && n ? t[t.length - 1] += r : t.push(r), e = n, (zn(r) || df(r) && r.hasAsync) && (t.hasAsync = !0);
    }
  };
}
function Ia(e, t = null, r) {
  const n = Ff(e, t, null), a = yf(
    n,
    !0
    /* isSSR */
  ), i = zn(a), s = n.sp;
  if (i || s) {
    let f = i ? a : Promise.resolve();
    return s && (f = f.then(() => Promise.all(s.map((o) => o.call(n.proxy)))).catch(() => {
    })), f.then(() => B0(n, r));
  } else
    return B0(n, r);
}
function B0(e, t) {
  const r = e.type, { getBuffer: n, push: a } = Na();
  if (rf(r)) {
    let i = M0(e);
    if (!r.props)
      for (const s in e.attrs)
        s.startsWith("data-v-") && ((i.props || (i.props = {}))[s] = "");
    rn(a, e.subTree = i, e, t);
  } else {
    (!e.render || e.render === I0) && !e.ssrRender && !r.ssrRender && dt(r.template) && (r.ssrRender = Sf(r.template));
    for (const s of e.scope.effects)
      s.computed && (s.computed._cacheable = !0);
    const i = e.ssrRender || r.ssrRender;
    if (i) {
      let s = e.inheritAttrs !== !1 ? e.attrs : void 0, f = !1, o = e;
      for (; ; ) {
        const c = o.vnode.scopeId;
        c && (f || (s = { ...s }, f = !0), s[c] = "");
        const u = o.parent;
        if (u && u.subTree && u.subTree === o.vnode)
          o = u;
        else
          break;
      }
      t && (f || (s = { ...s }), s[t.trim()] = "");
      const l = L0(e);
      try {
        i(
          e.proxy,
          a,
          e,
          s,
          // compiler-optimized bindings
          e.props,
          e.setupState,
          e.data,
          e.ctx
        );
      } finally {
        L0(l);
      }
    } else if (e.render && e.render !== I0)
      rn(a, e.subTree = M0(e), e, t);
    else {
      const s = r.name || r.__file || "<Anonymous>";
      en(`Component ${s} is missing template or render function.`), a("<!---->");
    }
  }
  return n();
}
function rn(e, t, r, n) {
  const { type: a, shapeFlag: i, children: s } = t;
  switch (a) {
    case Ws:
      e(Br(s));
      break;
    case Us:
      e(s ? `<!--${tf(s)}-->` : "<!---->");
      break;
    case bs:
      e(s);
      break;
    case mn:
      t.slotScopeIds && (n = (n ? n + " " : "") + t.slotScopeIds.join(" ")), e("<!--[-->"), Kn(e, s, r, n), e("<!--]-->");
      break;
    default:
      i & 1 ? Of(e, t, r, n) : i & 6 ? e(Ia(t, r, n)) : i & 64 ? Rf(e, t, r, n) : i & 128 ? rn(e, t.ssContent, r, n) : en("[@vue/server-renderer] Invalid VNode type:", a, `(${typeof a})`);
  }
}
function Kn(e, t, r, n) {
  for (let a = 0; a < t.length; a++)
    rn(e, Cf(t[a]), r, n);
}
function Of(e, t, r, n) {
  const a = t.type;
  let { props: i, children: s, shapeFlag: f, scopeId: o, dirs: l } = t, c = `<${a}`;
  l && (i = Df(t, i, l)), i && (c += gf(i, a)), o && (c += ` ${o}`);
  let u = r, h = t;
  for (; u && h === u.subTree; )
    h = u.vnode, h.scopeId && (c += ` ${h.scopeId}`), u = u.parent;
  if (n && (c += ` ${n}`), e(c + ">"), !nf(a)) {
    let p = !1;
    i && (i.innerHTML ? (p = !0, e(i.innerHTML)) : i.textContent ? (p = !0, e(Br(i.textContent))) : a === "textarea" && i.value && (p = !0, e(Br(i.value)))), p || (f & 8 ? e(Br(s)) : f & 16 && Kn(e, s, r, n)), e(`</${a}>`);
  }
}
function Df(e, t, r) {
  const n = [];
  for (let a = 0; a < r.length; a++) {
    const i = r[a], { dir: { getSSRProps: s } } = i;
    if (s) {
      const f = s(i, e);
      f && n.push(f);
    }
  }
  return Dr(t || {}, ...n);
}
function Rf(e, t, r, n) {
  const a = t.props && t.props.to, i = t.props && t.props.disabled;
  if (!a)
    return i || en("[@vue/server-renderer] Teleport is missing target prop."), [];
  if (!dt(a))
    return en("[@vue/server-renderer] Teleport target must be a query selector string."), [];
  Af(e, (s) => {
    Kn(s, t.children, r, n);
  }, a, i || i === "", r);
}
const { isVNode: Nf } = Oa;
async function Yn(e) {
  if (e.hasAsync) {
    let t = "";
    for (let r = 0; r < e.length; r++) {
      let n = e[r];
      zn(n) && (n = await n), dt(n) ? t += n : t += await Yn(n);
    }
    return t;
  } else
    return ka(e);
}
function ka(e) {
  let t = "";
  for (let r = 0; r < e.length; r++) {
    let n = e[r];
    dt(n) ? t += n : t += ka(n);
  }
  return t;
}
async function Pa(e, t = {}) {
  if (Nf(e))
    return Pa(Bs({ render: () => e }), t);
  const r = we(e._component, e._props);
  r.appContext = e._context, e.provide(Ca, t);
  const n = await Ia(r), a = await Yn(n);
  if (await If(t), t.__watcherHandles)
    for (const i of t.__watcherHandles)
      i();
  return a;
}
async function If(e) {
  if (e.__teleportBuffers) {
    e.teleports = e.teleports || {};
    for (const t in e.__teleportBuffers)
      e.teleports[t] = await Yn(await Promise.all([e.__teleportBuffers[t]]));
  }
}
Ms();
var wt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, Hn = {}, kf = {
  get exports() {
    return Hn;
  },
  set exports(e) {
    Hn = e;
  }
};
(function(e, t) {
  (function(r, n) {
    n();
  })(wt, function() {
    function r(l, c) {
      return typeof c > "u" ? c = { autoBom: !1 } : typeof c != "object" && (console.warn("Deprecated: Expected third argument to be a object"), c = { autoBom: !c }), c.autoBom && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(l.type) ? new Blob(["\uFEFF", l], { type: l.type }) : l;
    }
    function n(l, c, u) {
      var h = new XMLHttpRequest();
      h.open("GET", l), h.responseType = "blob", h.onload = function() {
        o(h.response, c, u);
      }, h.onerror = function() {
        console.error("could not download file");
      }, h.send();
    }
    function a(l) {
      var c = new XMLHttpRequest();
      c.open("HEAD", l, !1);
      try {
        c.send();
      } catch {
      }
      return 200 <= c.status && 299 >= c.status;
    }
    function i(l) {
      try {
        l.dispatchEvent(new MouseEvent("click"));
      } catch {
        var c = document.createEvent("MouseEvents");
        c.initMouseEvent("click", !0, !0, window, 0, 0, 0, 80, 20, !1, !1, !1, !1, 0, null), l.dispatchEvent(c);
      }
    }
    var s = typeof window == "object" && window.window === window ? window : typeof self == "object" && self.self === self ? self : typeof wt == "object" && wt.global === wt ? wt : void 0, f = s.navigator && /Macintosh/.test(navigator.userAgent) && /AppleWebKit/.test(navigator.userAgent) && !/Safari/.test(navigator.userAgent), o = s.saveAs || (typeof window != "object" || window !== s ? function() {
    } : "download" in HTMLAnchorElement.prototype && !f ? function(l, c, u) {
      var h = s.URL || s.webkitURL, p = document.createElement("a");
      c = c || l.name || "download", p.download = c, p.rel = "noopener", typeof l == "string" ? (p.href = l, p.origin === location.origin ? i(p) : a(p.href) ? n(l, c, u) : i(p, p.target = "_blank")) : (p.href = h.createObjectURL(l), setTimeout(function() {
        h.revokeObjectURL(p.href);
      }, 4e4), setTimeout(function() {
        i(p);
      }, 0));
    } : "msSaveOrOpenBlob" in navigator ? function(l, c, u) {
      if (c = c || l.name || "download", typeof l != "string")
        navigator.msSaveOrOpenBlob(r(l, u), c);
      else if (a(l))
        n(l, c, u);
      else {
        var h = document.createElement("a");
        h.href = l, h.target = "_blank", setTimeout(function() {
          i(h);
        });
      }
    } : function(l, c, u, h) {
      if (h = h || open("", "_blank"), h && (h.document.title = h.document.body.innerText = "downloading..."), typeof l == "string")
        return n(l, c, u);
      var p = l.type === "application/octet-stream", _ = /constructor/i.test(s.HTMLElement) || s.safari, x = /CriOS\/[\d]+/.test(navigator.userAgent);
      if ((x || p && _ || f) && typeof FileReader < "u") {
        var g = new FileReader();
        g.onloadend = function() {
          var F = g.result;
          F = x ? F : F.replace(/^data:[^;]*;/, "data:attachment/file;"), h ? h.location.href = F : location = F, h = null;
        }, g.readAsDataURL(l);
      } else {
        var C = s.URL || s.webkitURL, O = C.createObjectURL(l);
        h ? h.location = O : location.href = O, h = null, setTimeout(function() {
          C.revokeObjectURL(O);
        }, 4e4);
      }
    });
    s.saveAs = o.saveAs = o, e.exports = o;
  });
})(kf);
/*! xlsx.js (C) 2013-present SheetJS -- http://sheetjs.com */
var tn = {};
tn.version = "0.18.5";
var La = 1252, Pf = [874, 932, 936, 949, 950, 1250, 1251, 1252, 1253, 1254, 1255, 1256, 1257, 1258, 1e4], Ma = function(e) {
  Pf.indexOf(e) != -1 && (La = e);
};
function Lf() {
  Ma(1252);
}
var It = function(e) {
  Ma(e);
};
function Mf() {
  It(1200), Lf();
}
function Bf(e) {
  for (var t = [], r = 0; r < e.length >> 1; ++r)
    t[r] = String.fromCharCode(e.charCodeAt(2 * r + 1) + (e.charCodeAt(2 * r) << 8));
  return t.join("");
}
var $t = function(t) {
  return String.fromCharCode(t);
}, b0 = function(t) {
  return String.fromCharCode(t);
}, jr, Lr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
function kt(e) {
  for (var t = "", r = 0, n = 0, a = 0, i = 0, s = 0, f = 0, o = 0, l = 0; l < e.length; )
    r = e.charCodeAt(l++), i = r >> 2, n = e.charCodeAt(l++), s = (r & 3) << 4 | n >> 4, a = e.charCodeAt(l++), f = (n & 15) << 2 | a >> 6, o = a & 63, isNaN(n) ? f = o = 64 : isNaN(a) && (o = 64), t += Lr.charAt(i) + Lr.charAt(s) + Lr.charAt(f) + Lr.charAt(o);
  return t;
}
function Rr(e) {
  var t = "", r = 0, n = 0, a = 0, i = 0, s = 0, f = 0, o = 0;
  e = e.replace(/[^\w\+\/\=]/g, "");
  for (var l = 0; l < e.length; )
    i = Lr.indexOf(e.charAt(l++)), s = Lr.indexOf(e.charAt(l++)), r = i << 2 | s >> 4, t += String.fromCharCode(r), f = Lr.indexOf(e.charAt(l++)), n = (s & 15) << 4 | f >> 2, f !== 64 && (t += String.fromCharCode(n)), o = Lr.indexOf(e.charAt(l++)), a = (f & 3) << 6 | o, o !== 64 && (t += String.fromCharCode(a));
  return t;
}
var ue = /* @__PURE__ */ function() {
  return typeof Buffer < "u" && typeof process < "u" && typeof process.versions < "u" && !!process.versions.node;
}(), Ir = /* @__PURE__ */ function() {
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
function Kr(e) {
  return ue ? Buffer.alloc ? Buffer.alloc(e) : new Buffer(e) : typeof Uint8Array < "u" ? new Uint8Array(e) : new Array(e);
}
function U0(e) {
  return ue ? Buffer.allocUnsafe ? Buffer.allocUnsafe(e) : new Buffer(e) : typeof Uint8Array < "u" ? new Uint8Array(e) : new Array(e);
}
var pr = function(t) {
  return ue ? Ir(t, "binary") : t.split("").map(function(r) {
    return r.charCodeAt(0) & 255;
  });
};
function gn(e) {
  if (typeof ArrayBuffer > "u")
    return pr(e);
  for (var t = new ArrayBuffer(e.length), r = new Uint8Array(t), n = 0; n != e.length; ++n)
    r[n] = e.charCodeAt(n) & 255;
  return t;
}
function bt(e) {
  if (Array.isArray(e))
    return e.map(function(n) {
      return String.fromCharCode(n);
    }).join("");
  for (var t = [], r = 0; r < e.length; ++r)
    t[r] = String.fromCharCode(e[r]);
  return t.join("");
}
function bf(e) {
  if (typeof Uint8Array > "u")
    throw new Error("Unsupported");
  return new Uint8Array(e);
}
var He = ue ? function(e) {
  return Buffer.concat(e.map(function(t) {
    return Buffer.isBuffer(t) ? t : Ir(t);
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
function Uf(e) {
  for (var t = [], r = 0, n = e.length + 250, a = Kr(e.length + 255), i = 0; i < e.length; ++i) {
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
    r > n && (t.push(a.slice(0, r)), r = 0, a = Kr(65535), n = 65530);
  }
  return t.push(a.slice(0, r)), He(t);
}
var yt = /\u0000/g, zt = /[\u0001-\u0006]/g;
function ot(e) {
  for (var t = "", r = e.length - 1; r >= 0; )
    t += e.charAt(r--);
  return t;
}
function vr(e, t) {
  var r = "" + e;
  return r.length >= t ? r : ye("0", t - r.length) + r;
}
function Jn(e, t) {
  var r = "" + e;
  return r.length >= t ? r : ye(" ", t - r.length) + r;
}
function nn(e, t) {
  var r = "" + e;
  return r.length >= t ? r : r + ye(" ", t - r.length);
}
function Wf(e, t) {
  var r = "" + Math.round(e);
  return r.length >= t ? r : ye("0", t - r.length) + r;
}
function Hf(e, t) {
  var r = "" + e;
  return r.length >= t ? r : ye("0", t - r.length) + r;
}
var W0 = /* @__PURE__ */ Math.pow(2, 32);
function at(e, t) {
  if (e > W0 || e < -W0)
    return Wf(e, t);
  var r = Math.round(e);
  return Hf(r, t);
}
function an(e, t) {
  return t = t || 0, e.length >= 7 + t && (e.charCodeAt(t) | 32) === 103 && (e.charCodeAt(t + 1) | 32) === 101 && (e.charCodeAt(t + 2) | 32) === 110 && (e.charCodeAt(t + 3) | 32) === 101 && (e.charCodeAt(t + 4) | 32) === 114 && (e.charCodeAt(t + 5) | 32) === 97 && (e.charCodeAt(t + 6) | 32) === 108;
}
var H0 = [
  ["Sun", "Sunday"],
  ["Mon", "Monday"],
  ["Tue", "Tuesday"],
  ["Wed", "Wednesday"],
  ["Thu", "Thursday"],
  ["Fri", "Friday"],
  ["Sat", "Saturday"]
], kn = [
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
function Vf(e) {
  return e || (e = {}), e[0] = "General", e[1] = "0", e[2] = "0.00", e[3] = "#,##0", e[4] = "#,##0.00", e[9] = "0%", e[10] = "0.00%", e[11] = "0.00E+00", e[12] = "# ?/?", e[13] = "# ??/??", e[14] = "m/d/yy", e[15] = "d-mmm-yy", e[16] = "d-mmm", e[17] = "mmm-yy", e[18] = "h:mm AM/PM", e[19] = "h:mm:ss AM/PM", e[20] = "h:mm", e[21] = "h:mm:ss", e[22] = "m/d/yy h:mm", e[37] = "#,##0 ;(#,##0)", e[38] = "#,##0 ;[Red](#,##0)", e[39] = "#,##0.00;(#,##0.00)", e[40] = "#,##0.00;[Red](#,##0.00)", e[45] = "mm:ss", e[46] = "[h]:mm:ss", e[47] = "mmss.0", e[48] = "##0.0E+0", e[49] = "@", e[56] = '"上午/下午 "hh"時"mm"分"ss"秒 "', e;
}
var Ce = {
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
  56: '"上午/下午 "hh"時"mm"分"ss"秒 "'
}, V0 = {
  5: 37,
  6: 38,
  7: 39,
  8: 40,
  //  5 -> 37 ...  8 -> 40
  23: 0,
  24: 0,
  25: 0,
  26: 0,
  // 23 ->  0 ... 26 ->  0
  27: 14,
  28: 14,
  29: 14,
  30: 14,
  31: 14,
  // 27 -> 14 ... 31 -> 14
  50: 14,
  51: 14,
  52: 14,
  53: 14,
  54: 14,
  // 50 -> 14 ... 58 -> 14
  55: 14,
  56: 14,
  57: 14,
  58: 14,
  59: 1,
  60: 2,
  61: 3,
  62: 4,
  // 59 ->  1 ... 62 ->  4
  67: 9,
  68: 10,
  // 67 ->  9 ... 68 -> 10
  69: 12,
  70: 13,
  71: 14,
  // 69 -> 12 ... 71 -> 14
  72: 14,
  73: 15,
  74: 16,
  75: 17,
  // 72 -> 14 ... 75 -> 17
  76: 20,
  77: 21,
  78: 22,
  // 76 -> 20 ... 78 -> 22
  79: 45,
  80: 46,
  81: 47,
  // 79 -> 45 ... 81 -> 47
  82: 0
  // 82 ->  0 ... 65536 -> 0 (omitted)
}, Gf = {
  //  5 -- Currency,   0 decimal, black negative
  5: '"$"#,##0_);\\("$"#,##0\\)',
  63: '"$"#,##0_);\\("$"#,##0\\)',
  //  6 -- Currency,   0 decimal, red   negative
  6: '"$"#,##0_);[Red]\\("$"#,##0\\)',
  64: '"$"#,##0_);[Red]\\("$"#,##0\\)',
  //  7 -- Currency,   2 decimal, black negative
  7: '"$"#,##0.00_);\\("$"#,##0.00\\)',
  65: '"$"#,##0.00_);\\("$"#,##0.00\\)',
  //  8 -- Currency,   2 decimal, red   negative
  8: '"$"#,##0.00_);[Red]\\("$"#,##0.00\\)',
  66: '"$"#,##0.00_);[Red]\\("$"#,##0.00\\)',
  // 41 -- Accounting, 0 decimal, No Symbol
  41: '_(* #,##0_);_(* \\(#,##0\\);_(* "-"_);_(@_)',
  // 42 -- Accounting, 0 decimal, $  Symbol
  42: '_("$"* #,##0_);_("$"* \\(#,##0\\);_("$"* "-"_);_(@_)',
  // 43 -- Accounting, 2 decimal, No Symbol
  43: '_(* #,##0.00_);_(* \\(#,##0.00\\);_(* "-"??_);_(@_)',
  // 44 -- Accounting, 2 decimal, $  Symbol
  44: '_("$"* #,##0.00_);_("$"* \\(#,##0.00\\);_("$"* "-"??_);_(@_)'
};
function sn(e, t, r) {
  for (var n = e < 0 ? -1 : 1, a = e * n, i = 0, s = 1, f = 0, o = 1, l = 0, c = 0, u = Math.floor(a); l < t && (u = Math.floor(a), f = u * s + i, c = u * l + o, !(a - u < 5e-8)); )
    a = 1 / (a - u), i = s, s = f, o = l, l = c;
  if (c > t && (l > t ? (c = o, f = i) : (c = l, f = s)), !r)
    return [0, n * f, c];
  var h = Math.floor(n * f / c);
  return [h, n * f - h * c, c];
}
function Kt(e, t, r) {
  if (e > 2958465 || e < 0)
    return null;
  var n = e | 0, a = Math.floor(86400 * (e - n)), i = 0, s = [], f = { D: n, T: a, u: 86400 * (e - n) - a, y: 0, m: 0, d: 0, H: 0, M: 0, S: 0, q: 0 };
  if (Math.abs(f.u) < 1e-6 && (f.u = 0), t && t.date1904 && (n += 1462), f.u > 0.9999 && (f.u = 0, ++a == 86400 && (f.T = a = 0, ++n, ++f.D)), n === 60)
    s = r ? [1317, 10, 29] : [1900, 2, 29], i = 3;
  else if (n === 0)
    s = r ? [1317, 8, 29] : [1900, 1, 0], i = 6;
  else {
    n > 60 && --n;
    var o = new Date(1900, 0, 1);
    o.setDate(o.getDate() + n - 1), s = [o.getFullYear(), o.getMonth() + 1, o.getDate()], i = o.getDay(), n < 60 && (i = (i + 6) % 7), r && (i = Jf(o, s));
  }
  return f.y = s[0], f.m = s[1], f.d = s[2], f.S = a % 60, a = Math.floor(a / 60), f.M = a % 60, a = Math.floor(a / 60), f.H = a, f.q = i, f;
}
var Ba = /* @__PURE__ */ new Date(1899, 11, 31, 0, 0, 0), Xf = /* @__PURE__ */ Ba.getTime(), jf = /* @__PURE__ */ new Date(1900, 2, 1, 0, 0, 0);
function ba(e, t) {
  var r = /* @__PURE__ */ e.getTime();
  return t ? r -= 1461 * 24 * 60 * 60 * 1e3 : e >= jf && (r += 24 * 60 * 60 * 1e3), (r - (Xf + (/* @__PURE__ */ e.getTimezoneOffset() - /* @__PURE__ */ Ba.getTimezoneOffset()) * 6e4)) / (24 * 60 * 60 * 1e3);
}
function qn(e) {
  return e.indexOf(".") == -1 ? e : e.replace(/(?:\.0*|(\.\d*[1-9])0+)$/, "$1");
}
function $f(e) {
  return e.indexOf("E") == -1 ? e : e.replace(/(?:\.0*|(\.\d*[1-9])0+)[Ee]/, "$1E").replace(/(E[+-])(\d)$/, "$10$2");
}
function zf(e) {
  var t = e < 0 ? 12 : 11, r = qn(e.toFixed(12));
  return r.length <= t || (r = e.toPrecision(10), r.length <= t) ? r : e.toExponential(5);
}
function Kf(e) {
  var t = qn(e.toFixed(11));
  return t.length > (e < 0 ? 12 : 11) || t === "0" || t === "-0" ? e.toPrecision(6) : t;
}
function Yf(e) {
  var t = Math.floor(Math.log(Math.abs(e)) * Math.LOG10E), r;
  return t >= -4 && t <= -1 ? r = e.toPrecision(10 + t) : Math.abs(t) <= 9 ? r = zf(e) : t === 10 ? r = e.toFixed(10).substr(0, 12) : r = Kf(e), qn($f(r.toUpperCase()));
}
function Vn(e, t) {
  switch (typeof e) {
    case "string":
      return e;
    case "boolean":
      return e ? "TRUE" : "FALSE";
    case "number":
      return (e | 0) === e ? e.toString(10) : Yf(e);
    case "undefined":
      return "";
    case "object":
      if (e == null)
        return "";
      if (e instanceof Date)
        return br(14, ba(e, t && t.date1904), t);
  }
  throw new Error("unsupported value in General format: " + e);
}
function Jf(e, t) {
  t[0] -= 581;
  var r = e.getDay();
  return e < 60 && (r = (r + 6) % 7), r;
}
function qf(e, t, r, n) {
  var a = "", i = 0, s = 0, f = r.y, o, l = 0;
  switch (e) {
    case 98:
      f = r.y + 543;
    case 121:
      switch (t.length) {
        case 1:
        case 2:
          o = f % 100, l = 2;
          break;
        default:
          o = f % 1e4, l = 4;
          break;
      }
      break;
    case 109:
      switch (t.length) {
        case 1:
        case 2:
          o = r.m, l = t.length;
          break;
        case 3:
          return kn[r.m - 1][1];
        case 5:
          return kn[r.m - 1][0];
        default:
          return kn[r.m - 1][2];
      }
      break;
    case 100:
      switch (t.length) {
        case 1:
        case 2:
          o = r.d, l = t.length;
          break;
        case 3:
          return H0[r.q][0];
        default:
          return H0[r.q][1];
      }
      break;
    case 104:
      switch (t.length) {
        case 1:
        case 2:
          o = 1 + (r.H + 11) % 12, l = t.length;
          break;
        default:
          throw "bad hour format: " + t;
      }
      break;
    case 72:
      switch (t.length) {
        case 1:
        case 2:
          o = r.H, l = t.length;
          break;
        default:
          throw "bad hour format: " + t;
      }
      break;
    case 77:
      switch (t.length) {
        case 1:
        case 2:
          o = r.M, l = t.length;
          break;
        default:
          throw "bad minute format: " + t;
      }
      break;
    case 115:
      if (t != "s" && t != "ss" && t != ".0" && t != ".00" && t != ".000")
        throw "bad second format: " + t;
      return r.u === 0 && (t == "s" || t == "ss") ? vr(r.S, t.length) : (n >= 2 ? s = n === 3 ? 1e3 : 100 : s = n === 1 ? 10 : 1, i = Math.round(s * (r.S + r.u)), i >= 60 * s && (i = 0), t === "s" ? i === 0 ? "0" : "" + i / s : (a = vr(i, 2 + n), t === "ss" ? a.substr(0, 2) : "." + a.substr(2, t.length - 1)));
    case 90:
      switch (t) {
        case "[h]":
        case "[hh]":
          o = r.D * 24 + r.H;
          break;
        case "[m]":
        case "[mm]":
          o = (r.D * 24 + r.H) * 60 + r.M;
          break;
        case "[s]":
        case "[ss]":
          o = ((r.D * 24 + r.H) * 60 + r.M) * 60 + Math.round(r.S + r.u);
          break;
        default:
          throw "bad abstime format: " + t;
      }
      l = t.length === 3 ? 1 : 2;
      break;
    case 101:
      o = f, l = 1;
      break;
  }
  var c = l > 0 ? vr(o, l) : "";
  return c;
}
function Mr(e) {
  var t = 3;
  if (e.length <= t)
    return e;
  for (var r = e.length % t, n = e.substr(0, r); r != e.length; r += t)
    n += (n.length > 0 ? "," : "") + e.substr(r, t);
  return n;
}
var Ua = /%/g;
function Zf(e, t, r) {
  var n = t.replace(Ua, ""), a = t.length - n.length;
  return yr(e, n, r * Math.pow(10, 2 * a)) + ye("%", a);
}
function Qf(e, t, r) {
  for (var n = t.length - 1; t.charCodeAt(n - 1) === 44; )
    --n;
  return yr(e, t.substr(0, n), r / Math.pow(10, 3 * (t.length - n)));
}
function Wa(e, t) {
  var r, n = e.indexOf("E") - e.indexOf(".") - 1;
  if (e.match(/^#+0.0E\+0$/)) {
    if (t == 0)
      return "0.0E+0";
    if (t < 0)
      return "-" + Wa(e, -t);
    var a = e.indexOf(".");
    a === -1 && (a = e.indexOf("E"));
    var i = Math.floor(Math.log(t) * Math.LOG10E) % a;
    if (i < 0 && (i += a), r = (t / Math.pow(10, i)).toPrecision(n + 1 + (a + i) % a), r.indexOf("e") === -1) {
      var s = Math.floor(Math.log(t) * Math.LOG10E);
      for (r.indexOf(".") === -1 ? r = r.charAt(0) + "." + r.substr(1) + "E+" + (s - r.length + i) : r += "E+" + (s - i); r.substr(0, 2) === "0."; )
        r = r.charAt(0) + r.substr(2, a) + "." + r.substr(2 + a), r = r.replace(/^0+([1-9])/, "$1").replace(/^0+\./, "0.");
      r = r.replace(/\+-/, "-");
    }
    r = r.replace(/^([+-]?)(\d*)\.(\d*)[Ee]/, function(f, o, l, c) {
      return o + l + c.substr(0, (a + i) % a) + "." + c.substr(i) + "E";
    });
  } else
    r = t.toExponential(n);
  return e.match(/E\+00$/) && r.match(/e[+-]\d$/) && (r = r.substr(0, r.length - 1) + "0" + r.charAt(r.length - 1)), e.match(/E\-/) && r.match(/e\+/) && (r = r.replace(/e\+/, "e")), r.replace("e", "E");
}
var Ha = /# (\?+)( ?)\/( ?)(\d+)/;
function el(e, t, r) {
  var n = parseInt(e[4], 10), a = Math.round(t * n), i = Math.floor(a / n), s = a - i * n, f = n;
  return r + (i === 0 ? "" : "" + i) + " " + (s === 0 ? ye(" ", e[1].length + 1 + e[4].length) : Jn(s, e[1].length) + e[2] + "/" + e[3] + vr(f, e[4].length));
}
function rl(e, t, r) {
  return r + (t === 0 ? "" : "" + t) + ye(" ", e[1].length + 2 + e[4].length);
}
var Va = /^#*0*\.([0#]+)/, Ga = /\).*[0#]/, Xa = /\(###\) ###\\?-####/;
function Ye(e) {
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
function G0(e, t) {
  var r = Math.pow(10, t);
  return "" + Math.round(e * r) / r;
}
function X0(e, t) {
  var r = e - Math.floor(e), n = Math.pow(10, t);
  return t < ("" + Math.round(r * n)).length ? 0 : Math.round(r * n);
}
function tl(e, t) {
  return t < ("" + Math.round((e - Math.floor(e)) * Math.pow(10, t))).length ? 1 : 0;
}
function nl(e) {
  return e < 2147483647 && e > -2147483648 ? "" + (e >= 0 ? e | 0 : e - 1 | 0) : "" + Math.floor(e);
}
function or(e, t, r) {
  if (e.charCodeAt(0) === 40 && !t.match(Ga)) {
    var n = t.replace(/\( */, "").replace(/ \)/, "").replace(/\)/, "");
    return r >= 0 ? or("n", n, r) : "(" + or("n", n, -r) + ")";
  }
  if (t.charCodeAt(t.length - 1) === 44)
    return Qf(e, t, r);
  if (t.indexOf("%") !== -1)
    return Zf(e, t, r);
  if (t.indexOf("E") !== -1)
    return Wa(t, r);
  if (t.charCodeAt(0) === 36)
    return "$" + or(e, t.substr(t.charAt(1) == " " ? 2 : 1), r);
  var a, i, s, f, o = Math.abs(r), l = r < 0 ? "-" : "";
  if (t.match(/^00+$/))
    return l + at(o, t.length);
  if (t.match(/^[#?]+$/))
    return a = at(r, 0), a === "0" && (a = ""), a.length > t.length ? a : Ye(t.substr(0, t.length - a.length)) + a;
  if (i = t.match(Ha))
    return el(i, o, l);
  if (t.match(/^#+0+$/))
    return l + at(o, t.length - t.indexOf("0"));
  if (i = t.match(Va))
    return a = G0(r, i[1].length).replace(/^([^\.]+)$/, "$1." + Ye(i[1])).replace(/\.$/, "." + Ye(i[1])).replace(/\.(\d*)$/, function(_, x) {
      return "." + x + ye("0", Ye(
        /*::(*/
        i[1]
      ).length - x.length);
    }), t.indexOf("0.") !== -1 ? a : a.replace(/^0\./, ".");
  if (t = t.replace(/^#+([0.])/, "$1"), i = t.match(/^(0*)\.(#*)$/))
    return l + G0(o, i[2].length).replace(/\.(\d*[1-9])0*$/, ".$1").replace(/^(-?\d*)$/, "$1.").replace(/^0\./, i[1].length ? "0." : ".");
  if (i = t.match(/^#{1,3},##0(\.?)$/))
    return l + Mr(at(o, 0));
  if (i = t.match(/^#,##0\.([#0]*0)$/))
    return r < 0 ? "-" + or(e, t, -r) : Mr("" + (Math.floor(r) + tl(r, i[1].length))) + "." + vr(X0(r, i[1].length), i[1].length);
  if (i = t.match(/^#,#*,#0/))
    return or(e, t.replace(/^#,#*,/, ""), r);
  if (i = t.match(/^([0#]+)(\\?-([0#]+))+$/))
    return a = ot(or(e, t.replace(/[\\-]/g, ""), r)), s = 0, ot(ot(t.replace(/\\/g, "")).replace(/[0#]/g, function(_) {
      return s < a.length ? a.charAt(s++) : _ === "0" ? "0" : "";
    }));
  if (t.match(Xa))
    return a = or(e, "##########", r), "(" + a.substr(0, 3) + ") " + a.substr(3, 3) + "-" + a.substr(6);
  var c = "";
  if (i = t.match(/^([#0?]+)( ?)\/( ?)([#0?]+)/))
    return s = Math.min(
      /*::String(*/
      i[4].length,
      7
    ), f = sn(o, Math.pow(10, s) - 1, !1), a = "" + l, c = yr(
      "n",
      /*::String(*/
      i[1],
      f[1]
    ), c.charAt(c.length - 1) == " " && (c = c.substr(0, c.length - 1) + "0"), a += c + /*::String(*/
    i[2] + "/" + /*::String(*/
    i[3], c = nn(f[2], s), c.length < i[4].length && (c = Ye(i[4].substr(i[4].length - c.length)) + c), a += c, a;
  if (i = t.match(/^# ([#0?]+)( ?)\/( ?)([#0?]+)/))
    return s = Math.min(Math.max(i[1].length, i[4].length), 7), f = sn(o, Math.pow(10, s) - 1, !0), l + (f[0] || (f[1] ? "" : "0")) + " " + (f[1] ? Jn(f[1], s) + i[2] + "/" + i[3] + nn(f[2], s) : ye(" ", 2 * s + 1 + i[2].length + i[3].length));
  if (i = t.match(/^[#0?]+$/))
    return a = at(r, 0), t.length <= a.length ? a : Ye(t.substr(0, t.length - a.length)) + a;
  if (i = t.match(/^([#0?]+)\.([#0]+)$/)) {
    a = "" + r.toFixed(Math.min(i[2].length, 10)).replace(/([^0])0+$/, "$1"), s = a.indexOf(".");
    var u = t.indexOf(".") - s, h = t.length - a.length - u;
    return Ye(t.substr(0, u) + a + t.substr(t.length - h));
  }
  if (i = t.match(/^00,000\.([#0]*0)$/))
    return s = X0(r, i[1].length), r < 0 ? "-" + or(e, t, -r) : Mr(nl(r)).replace(/^\d,\d{3}$/, "0$&").replace(/^\d*$/, function(_) {
      return "00," + (_.length < 3 ? vr(0, 3 - _.length) : "") + _;
    }) + "." + vr(s, i[1].length);
  switch (t) {
    case "###,##0.00":
      return or(e, "#,##0.00", r);
    case "###,###":
    case "##,###":
    case "#,###":
      var p = Mr(at(o, 0));
      return p !== "0" ? l + p : "";
    case "###,###.00":
      return or(e, "###,##0.00", r).replace(/^0\./, ".");
    case "#,###.00":
      return or(e, "#,##0.00", r).replace(/^0\./, ".");
  }
  throw new Error("unsupported format |" + t + "|");
}
function al(e, t, r) {
  for (var n = t.length - 1; t.charCodeAt(n - 1) === 44; )
    --n;
  return yr(e, t.substr(0, n), r / Math.pow(10, 3 * (t.length - n)));
}
function il(e, t, r) {
  var n = t.replace(Ua, ""), a = t.length - n.length;
  return yr(e, n, r * Math.pow(10, 2 * a)) + ye("%", a);
}
function ja(e, t) {
  var r, n = e.indexOf("E") - e.indexOf(".") - 1;
  if (e.match(/^#+0.0E\+0$/)) {
    if (t == 0)
      return "0.0E+0";
    if (t < 0)
      return "-" + ja(e, -t);
    var a = e.indexOf(".");
    a === -1 && (a = e.indexOf("E"));
    var i = Math.floor(Math.log(t) * Math.LOG10E) % a;
    if (i < 0 && (i += a), r = (t / Math.pow(10, i)).toPrecision(n + 1 + (a + i) % a), !r.match(/[Ee]/)) {
      var s = Math.floor(Math.log(t) * Math.LOG10E);
      r.indexOf(".") === -1 ? r = r.charAt(0) + "." + r.substr(1) + "E+" + (s - r.length + i) : r += "E+" + (s - i), r = r.replace(/\+-/, "-");
    }
    r = r.replace(/^([+-]?)(\d*)\.(\d*)[Ee]/, function(f, o, l, c) {
      return o + l + c.substr(0, (a + i) % a) + "." + c.substr(i) + "E";
    });
  } else
    r = t.toExponential(n);
  return e.match(/E\+00$/) && r.match(/e[+-]\d$/) && (r = r.substr(0, r.length - 1) + "0" + r.charAt(r.length - 1)), e.match(/E\-/) && r.match(/e\+/) && (r = r.replace(/e\+/, "e")), r.replace("e", "E");
}
function _r(e, t, r) {
  if (e.charCodeAt(0) === 40 && !t.match(Ga)) {
    var n = t.replace(/\( */, "").replace(/ \)/, "").replace(/\)/, "");
    return r >= 0 ? _r("n", n, r) : "(" + _r("n", n, -r) + ")";
  }
  if (t.charCodeAt(t.length - 1) === 44)
    return al(e, t, r);
  if (t.indexOf("%") !== -1)
    return il(e, t, r);
  if (t.indexOf("E") !== -1)
    return ja(t, r);
  if (t.charCodeAt(0) === 36)
    return "$" + _r(e, t.substr(t.charAt(1) == " " ? 2 : 1), r);
  var a, i, s, f, o = Math.abs(r), l = r < 0 ? "-" : "";
  if (t.match(/^00+$/))
    return l + vr(o, t.length);
  if (t.match(/^[#?]+$/))
    return a = "" + r, r === 0 && (a = ""), a.length > t.length ? a : Ye(t.substr(0, t.length - a.length)) + a;
  if (i = t.match(Ha))
    return rl(i, o, l);
  if (t.match(/^#+0+$/))
    return l + vr(o, t.length - t.indexOf("0"));
  if (i = t.match(Va))
    return a = ("" + r).replace(/^([^\.]+)$/, "$1." + Ye(i[1])).replace(/\.$/, "." + Ye(i[1])), a = a.replace(/\.(\d*)$/, function(_, x) {
      return "." + x + ye("0", Ye(i[1]).length - x.length);
    }), t.indexOf("0.") !== -1 ? a : a.replace(/^0\./, ".");
  if (t = t.replace(/^#+([0.])/, "$1"), i = t.match(/^(0*)\.(#*)$/))
    return l + ("" + o).replace(/\.(\d*[1-9])0*$/, ".$1").replace(/^(-?\d*)$/, "$1.").replace(/^0\./, i[1].length ? "0." : ".");
  if (i = t.match(/^#{1,3},##0(\.?)$/))
    return l + Mr("" + o);
  if (i = t.match(/^#,##0\.([#0]*0)$/))
    return r < 0 ? "-" + _r(e, t, -r) : Mr("" + r) + "." + ye("0", i[1].length);
  if (i = t.match(/^#,#*,#0/))
    return _r(e, t.replace(/^#,#*,/, ""), r);
  if (i = t.match(/^([0#]+)(\\?-([0#]+))+$/))
    return a = ot(_r(e, t.replace(/[\\-]/g, ""), r)), s = 0, ot(ot(t.replace(/\\/g, "")).replace(/[0#]/g, function(_) {
      return s < a.length ? a.charAt(s++) : _ === "0" ? "0" : "";
    }));
  if (t.match(Xa))
    return a = _r(e, "##########", r), "(" + a.substr(0, 3) + ") " + a.substr(3, 3) + "-" + a.substr(6);
  var c = "";
  if (i = t.match(/^([#0?]+)( ?)\/( ?)([#0?]+)/))
    return s = Math.min(
      /*::String(*/
      i[4].length,
      7
    ), f = sn(o, Math.pow(10, s) - 1, !1), a = "" + l, c = yr(
      "n",
      /*::String(*/
      i[1],
      f[1]
    ), c.charAt(c.length - 1) == " " && (c = c.substr(0, c.length - 1) + "0"), a += c + /*::String(*/
    i[2] + "/" + /*::String(*/
    i[3], c = nn(f[2], s), c.length < i[4].length && (c = Ye(i[4].substr(i[4].length - c.length)) + c), a += c, a;
  if (i = t.match(/^# ([#0?]+)( ?)\/( ?)([#0?]+)/))
    return s = Math.min(Math.max(i[1].length, i[4].length), 7), f = sn(o, Math.pow(10, s) - 1, !0), l + (f[0] || (f[1] ? "" : "0")) + " " + (f[1] ? Jn(f[1], s) + i[2] + "/" + i[3] + nn(f[2], s) : ye(" ", 2 * s + 1 + i[2].length + i[3].length));
  if (i = t.match(/^[#0?]+$/))
    return a = "" + r, t.length <= a.length ? a : Ye(t.substr(0, t.length - a.length)) + a;
  if (i = t.match(/^([#0]+)\.([#0]+)$/)) {
    a = "" + r.toFixed(Math.min(i[2].length, 10)).replace(/([^0])0+$/, "$1"), s = a.indexOf(".");
    var u = t.indexOf(".") - s, h = t.length - a.length - u;
    return Ye(t.substr(0, u) + a + t.substr(t.length - h));
  }
  if (i = t.match(/^00,000\.([#0]*0)$/))
    return r < 0 ? "-" + _r(e, t, -r) : Mr("" + r).replace(/^\d,\d{3}$/, "0$&").replace(/^\d*$/, function(_) {
      return "00," + (_.length < 3 ? vr(0, 3 - _.length) : "") + _;
    }) + "." + vr(0, i[1].length);
  switch (t) {
    case "###,###":
    case "##,###":
    case "#,###":
      var p = Mr("" + o);
      return p !== "0" ? l + p : "";
    default:
      if (t.match(/\.[0#?]*$/))
        return _r(e, t.slice(0, t.lastIndexOf(".")), r) + Ye(t.slice(t.lastIndexOf(".")));
  }
  throw new Error("unsupported format |" + t + "|");
}
function yr(e, t, r) {
  return (r | 0) === r ? _r(e, t, r) : or(e, t, r);
}
function sl(e) {
  for (var t = [], r = !1, n = 0, a = 0; n < e.length; ++n)
    switch (
      /*cc=*/
      e.charCodeAt(n)
    ) {
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
var $a = /\[[HhMmSs\u0E0A\u0E19\u0E17]*\]/;
function za(e) {
  for (var t = 0, r = "", n = ""; t < e.length; )
    switch (r = e.charAt(t)) {
      case "G":
        an(e, t) && (t += 6), t++;
        break;
      case '"':
        for (
          ;
          /*cc=*/
          e.charCodeAt(++t) !== 34 && t < e.length;
        )
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
      case "上":
        if (e.substr(t, 3).toUpperCase() === "A/P" || e.substr(t, 5).toUpperCase() === "AM/PM" || e.substr(t, 5).toUpperCase() === "上午/下午")
          return !0;
        ++t;
        break;
      case "[":
        for (n = r; e.charAt(t++) !== "]" && t < e.length; )
          n += e.charAt(t);
        if (n.match($a))
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
function fl(e, t, r, n) {
  for (var a = [], i = "", s = 0, f = "", o = "t", l, c, u, h = "H"; s < e.length; )
    switch (f = e.charAt(s)) {
      case "G":
        if (!an(e, s))
          throw new Error("unrecognized character " + f + " in " + e);
        a[a.length] = { t: "G", v: "General" }, s += 7;
        break;
      case '"':
        for (i = ""; (u = e.charCodeAt(++s)) !== 34 && s < e.length; )
          i += String.fromCharCode(u);
        a[a.length] = { t: "t", v: i }, ++s;
        break;
      case "\\":
        var p = e.charAt(++s), _ = p === "(" || p === ")" ? p : "t";
        a[a.length] = { t: _, v: p }, ++s;
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
          if (l == null && (l = Kt(t, r, e.charAt(s + 1) === "2"), l == null))
            return "";
          a[a.length] = { t: "X", v: e.substr(s, 2) }, o = f, s += 2;
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
        if (t < 0 || l == null && (l = Kt(t, r), l == null))
          return "";
        for (i = f; ++s < e.length && e.charAt(s).toLowerCase() === f; )
          i += f;
        f === "m" && o.toLowerCase() === "h" && (f = "M"), f === "h" && (f = h), a[a.length] = { t: f, v: i }, o = f;
        break;
      case "A":
      case "a":
      case "上":
        var x = { t: f, v: f };
        if (l == null && (l = Kt(t, r)), e.substr(s, 3).toUpperCase() === "A/P" ? (l != null && (x.v = l.H >= 12 ? "P" : "A"), x.t = "T", h = "h", s += 3) : e.substr(s, 5).toUpperCase() === "AM/PM" ? (l != null && (x.v = l.H >= 12 ? "PM" : "AM"), x.t = "T", s += 5, h = "h") : e.substr(s, 5).toUpperCase() === "上午/下午" ? (l != null && (x.v = l.H >= 12 ? "下午" : "上午"), x.t = "T", s += 5, h = "h") : (x.t = "t", ++s), l == null && x.t === "T")
          return "";
        a[a.length] = x, o = f;
        break;
      case "[":
        for (i = f; e.charAt(s++) !== "]" && s < e.length; )
          i += e.charAt(s);
        if (i.slice(-1) !== "]")
          throw 'unterminated "[" block: |' + i + "|";
        if (i.match($a)) {
          if (l == null && (l = Kt(t, r), l == null))
            return "";
          a[a.length] = { t: "Z", v: i.toLowerCase() }, o = i.charAt(1);
        } else
          i.indexOf("$") > -1 && (i = (i.match(/\$([^-\[\]]*)/) || [])[1] || "$", za(e) || (a[a.length] = { t: "t", v: i }));
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
        a[a.length] = { t: f, v: i }, o = f;
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
        if (",$-+/():!^&'~{}<>=€acfijklopqrtuvwxzP".indexOf(f) === -1)
          throw new Error("unrecognized character " + f + " in " + e);
        a[a.length] = { t: "t", v: f }, ++s;
        break;
    }
  var g = 0, C = 0, O;
  for (s = a.length - 1, o = "t"; s >= 0; --s)
    switch (a[s].t) {
      case "h":
      case "H":
        a[s].t = h, o = "h", g < 1 && (g = 1);
        break;
      case "s":
        (O = a[s].v.match(/\.0+$/)) && (C = Math.max(C, O[0].length - 1)), g < 3 && (g = 3);
      case "d":
      case "y":
      case "M":
      case "e":
        o = a[s].t;
        break;
      case "m":
        o === "s" && (a[s].t = "M", g < 2 && (g = 2));
        break;
      case "X":
        break;
      case "Z":
        g < 1 && a[s].v.match(/[Hh]/) && (g = 1), g < 2 && a[s].v.match(/[Mm]/) && (g = 2), g < 3 && a[s].v.match(/[Ss]/) && (g = 3);
    }
  switch (g) {
    case 0:
      break;
    case 1:
      l.u >= 0.5 && (l.u = 0, ++l.S), l.S >= 60 && (l.S = 0, ++l.M), l.M >= 60 && (l.M = 0, ++l.H);
      break;
    case 2:
      l.u >= 0.5 && (l.u = 0, ++l.S), l.S >= 60 && (l.S = 0, ++l.M);
      break;
  }
  var F = "", L;
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
        a[s].v = qf(a[s].t.charCodeAt(0), a[s].v, l, C), a[s].t = "t";
        break;
      case "n":
      case "?":
        for (L = s + 1; a[L] != null && ((f = a[L].t) === "?" || f === "D" || (f === " " || f === "t") && a[L + 1] != null && (a[L + 1].t === "?" || a[L + 1].t === "t" && a[L + 1].v === "/") || a[s].t === "(" && (f === " " || f === "n" || f === ")") || f === "t" && (a[L].v === "/" || a[L].v === " " && a[L + 1] != null && a[L + 1].t == "?")); )
          a[s].v += a[L].v, a[L] = { v: "", t: ";" }, ++L;
        F += a[s].v, s = L - 1;
        break;
      case "G":
        a[s].t = "t", a[s].v = Vn(t, r);
        break;
    }
  var j = "", Q, D;
  if (F.length > 0) {
    F.charCodeAt(0) == 40 ? (Q = t < 0 && F.charCodeAt(0) === 45 ? -t : t, D = yr("n", F, Q)) : (Q = t < 0 && n > 1 ? -t : t, D = yr("n", F, Q), Q < 0 && a[0] && a[0].t == "t" && (D = D.substr(1), a[0].v = "-" + a[0].v)), L = D.length - 1;
    var U = a.length;
    for (s = 0; s < a.length; ++s)
      if (a[s] != null && a[s].t != "t" && a[s].v.indexOf(".") > -1) {
        U = s;
        break;
      }
    var M = a.length;
    if (U === a.length && D.indexOf("E") === -1) {
      for (s = a.length - 1; s >= 0; --s)
        a[s] == null || "n?".indexOf(a[s].t) === -1 || (L >= a[s].v.length - 1 ? (L -= a[s].v.length, a[s].v = D.substr(L + 1, a[s].v.length)) : L < 0 ? a[s].v = "" : (a[s].v = D.substr(0, L + 1), L = -1), a[s].t = "t", M = s);
      L >= 0 && M < a.length && (a[M].v = D.substr(0, L + 1) + a[M].v);
    } else if (U !== a.length && D.indexOf("E") === -1) {
      for (L = D.indexOf(".") - 1, s = U; s >= 0; --s)
        if (!(a[s] == null || "n?".indexOf(a[s].t) === -1)) {
          for (c = a[s].v.indexOf(".") > -1 && s === U ? a[s].v.indexOf(".") - 1 : a[s].v.length - 1, j = a[s].v.substr(c + 1); c >= 0; --c)
            L >= 0 && (a[s].v.charAt(c) === "0" || a[s].v.charAt(c) === "#") && (j = D.charAt(L--) + j);
          a[s].v = j, a[s].t = "t", M = s;
        }
      for (L >= 0 && M < a.length && (a[M].v = D.substr(0, L + 1) + a[M].v), L = D.indexOf(".") + 1, s = U; s < a.length; ++s)
        if (!(a[s] == null || "n?(".indexOf(a[s].t) === -1 && s !== U)) {
          for (c = a[s].v.indexOf(".") > -1 && s === U ? a[s].v.indexOf(".") + 1 : 0, j = a[s].v.substr(0, c); c < a[s].v.length; ++c)
            L < D.length && (j += D.charAt(L++));
          a[s].v = j, a[s].t = "t", M = s;
        }
    }
  }
  for (s = 0; s < a.length; ++s)
    a[s] != null && "n?".indexOf(a[s].t) > -1 && (Q = n > 1 && t < 0 && s > 0 && a[s - 1].v === "-" ? -t : t, a[s].v = yr(a[s].t, a[s].v, Q), a[s].t = "t");
  var V = "";
  for (s = 0; s !== a.length; ++s)
    a[s] != null && (V += a[s].v);
  return V;
}
var j0 = /\[(=|>[=]?|<[>=]?)(-?\d+(?:\.\d*)?)\]/;
function $0(e, t) {
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
function ll(e, t) {
  var r = sl(e), n = r.length, a = r[n - 1].indexOf("@");
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
    var s = r[0].match(j0), f = r[1].match(j0);
    return $0(t, s) ? [n, r[0]] : $0(t, f) ? [n, r[1]] : [n, r[s != null && f != null ? 2 : 1]];
  }
  return [n, i];
}
function br(e, t, r) {
  r == null && (r = {});
  var n = "";
  switch (typeof e) {
    case "string":
      e == "m/d/yy" && r.dateNF ? n = r.dateNF : n = e;
      break;
    case "number":
      e == 14 && r.dateNF ? n = r.dateNF : n = (r.table != null ? r.table : Ce)[e], n == null && (n = r.table && r.table[V0[e]] || Ce[V0[e]]), n == null && (n = Gf[e] || "General");
      break;
  }
  if (an(n, 0))
    return Vn(t, r);
  t instanceof Date && (t = ba(t, r.date1904));
  var a = ll(n, t);
  if (an(a[1]))
    return Vn(t, r);
  if (t === !0)
    t = "TRUE";
  else if (t === !1)
    t = "FALSE";
  else if (t === "" || t == null)
    return "";
  return fl(a[1], t, r, a[0]);
}
function Ka(e, t) {
  if (typeof t != "number") {
    t = +t || -1;
    for (var r = 0; r < 392; ++r) {
      if (Ce[r] == null) {
        t < 0 && (t = r);
        continue;
      }
      if (Ce[r] == e) {
        t = r;
        break;
      }
    }
    t < 0 && (t = 391);
  }
  return Ce[t] = e, t;
}
function _n(e) {
  for (var t = 0; t != 392; ++t)
    e[t] !== void 0 && Ka(e[t], t);
}
function Tn() {
  Ce = Vf();
}
var Ya = /[dD]+|[mM]+|[yYeE]+|[Hh]+|[Ss]+/g;
function ol(e) {
  var t = typeof e == "number" ? Ce[e] : e;
  return t = t.replace(Ya, "(\\d+)"), new RegExp("^" + t + "$");
}
function cl(e, t, r) {
  var n = -1, a = -1, i = -1, s = -1, f = -1, o = -1;
  (t.match(Ya) || []).forEach(function(u, h) {
    var p = parseInt(r[h + 1], 10);
    switch (u.toLowerCase().charAt(0)) {
      case "y":
        n = p;
        break;
      case "d":
        i = p;
        break;
      case "h":
        s = p;
        break;
      case "s":
        o = p;
        break;
      case "m":
        s >= 0 ? f = p : a = p;
        break;
    }
  }), o >= 0 && f == -1 && a >= 0 && (f = a, a = -1);
  var l = ("" + (n >= 0 ? n : new Date().getFullYear())).slice(-4) + "-" + ("00" + (a >= 1 ? a : 1)).slice(-2) + "-" + ("00" + (i >= 1 ? i : 1)).slice(-2);
  l.length == 7 && (l = "0" + l), l.length == 8 && (l = "20" + l);
  var c = ("00" + (s >= 0 ? s : 0)).slice(-2) + ":" + ("00" + (f >= 0 ? f : 0)).slice(-2) + ":" + ("00" + (o >= 0 ? o : 0)).slice(-2);
  return s == -1 && f == -1 && o == -1 ? l : n == -1 && a == -1 && i == -1 ? c : l + "T" + c;
}
var hl = /* @__PURE__ */ function() {
  var e = {};
  e.version = "1.2.0";
  function t() {
    for (var D = 0, U = new Array(256), M = 0; M != 256; ++M)
      D = M, D = D & 1 ? -306674912 ^ D >>> 1 : D >>> 1, D = D & 1 ? -306674912 ^ D >>> 1 : D >>> 1, D = D & 1 ? -306674912 ^ D >>> 1 : D >>> 1, D = D & 1 ? -306674912 ^ D >>> 1 : D >>> 1, D = D & 1 ? -306674912 ^ D >>> 1 : D >>> 1, D = D & 1 ? -306674912 ^ D >>> 1 : D >>> 1, D = D & 1 ? -306674912 ^ D >>> 1 : D >>> 1, D = D & 1 ? -306674912 ^ D >>> 1 : D >>> 1, U[M] = D;
    return typeof Int32Array < "u" ? new Int32Array(U) : U;
  }
  var r = t();
  function n(D) {
    var U = 0, M = 0, V = 0, G = typeof Int32Array < "u" ? new Int32Array(4096) : new Array(4096);
    for (V = 0; V != 256; ++V)
      G[V] = D[V];
    for (V = 0; V != 256; ++V)
      for (M = D[V], U = 256 + V; U < 4096; U += 256)
        M = G[U] = M >>> 8 ^ D[M & 255];
    var z = [];
    for (V = 1; V != 16; ++V)
      z[V - 1] = typeof Int32Array < "u" ? G.subarray(V * 256, V * 256 + 256) : G.slice(V * 256, V * 256 + 256);
    return z;
  }
  var a = n(r), i = a[0], s = a[1], f = a[2], o = a[3], l = a[4], c = a[5], u = a[6], h = a[7], p = a[8], _ = a[9], x = a[10], g = a[11], C = a[12], O = a[13], F = a[14];
  function L(D, U) {
    for (var M = U ^ -1, V = 0, G = D.length; V < G; )
      M = M >>> 8 ^ r[(M ^ D.charCodeAt(V++)) & 255];
    return ~M;
  }
  function j(D, U) {
    for (var M = U ^ -1, V = D.length - 15, G = 0; G < V; )
      M = F[D[G++] ^ M & 255] ^ O[D[G++] ^ M >> 8 & 255] ^ C[D[G++] ^ M >> 16 & 255] ^ g[D[G++] ^ M >>> 24] ^ x[D[G++]] ^ _[D[G++]] ^ p[D[G++]] ^ h[D[G++]] ^ u[D[G++]] ^ c[D[G++]] ^ l[D[G++]] ^ o[D[G++]] ^ f[D[G++]] ^ s[D[G++]] ^ i[D[G++]] ^ r[D[G++]];
    for (V += 15; G < V; )
      M = M >>> 8 ^ r[(M ^ D[G++]) & 255];
    return ~M;
  }
  function Q(D, U) {
    for (var M = U ^ -1, V = 0, G = D.length, z = 0, re = 0; V < G; )
      z = D.charCodeAt(V++), z < 128 ? M = M >>> 8 ^ r[(M ^ z) & 255] : z < 2048 ? (M = M >>> 8 ^ r[(M ^ (192 | z >> 6 & 31)) & 255], M = M >>> 8 ^ r[(M ^ (128 | z & 63)) & 255]) : z >= 55296 && z < 57344 ? (z = (z & 1023) + 64, re = D.charCodeAt(V++) & 1023, M = M >>> 8 ^ r[(M ^ (240 | z >> 8 & 7)) & 255], M = M >>> 8 ^ r[(M ^ (128 | z >> 2 & 63)) & 255], M = M >>> 8 ^ r[(M ^ (128 | re >> 6 & 15 | (z & 3) << 4)) & 255], M = M >>> 8 ^ r[(M ^ (128 | re & 63)) & 255]) : (M = M >>> 8 ^ r[(M ^ (224 | z >> 12 & 15)) & 255], M = M >>> 8 ^ r[(M ^ (128 | z >> 6 & 63)) & 255], M = M >>> 8 ^ r[(M ^ (128 | z & 63)) & 255]);
    return ~M;
  }
  return e.table = r, e.bstr = L, e.buf = j, e.str = Q, e;
}(), _e = /* @__PURE__ */ function() {
  var t = {};
  t.version = "1.2.1";
  function r(d, T) {
    for (var v = d.split("/"), m = T.split("/"), E = 0, w = 0, N = Math.min(v.length, m.length); E < N; ++E) {
      if (w = v[E].length - m[E].length)
        return w;
      if (v[E] != m[E])
        return v[E] < m[E] ? -1 : 1;
    }
    return v.length - m.length;
  }
  function n(d) {
    if (d.charAt(d.length - 1) == "/")
      return d.slice(0, -1).indexOf("/") === -1 ? d : n(d.slice(0, -1));
    var T = d.lastIndexOf("/");
    return T === -1 ? d : d.slice(0, T + 1);
  }
  function a(d) {
    if (d.charAt(d.length - 1) == "/")
      return a(d.slice(0, -1));
    var T = d.lastIndexOf("/");
    return T === -1 ? d : d.slice(T + 1);
  }
  function i(d, T) {
    typeof T == "string" && (T = new Date(T));
    var v = T.getHours();
    v = v << 6 | T.getMinutes(), v = v << 5 | T.getSeconds() >>> 1, d.write_shift(2, v);
    var m = T.getFullYear() - 1980;
    m = m << 4 | T.getMonth() + 1, m = m << 5 | T.getDate(), d.write_shift(2, m);
  }
  function s(d) {
    var T = d.read_shift(2) & 65535, v = d.read_shift(2) & 65535, m = new Date(), E = v & 31;
    v >>>= 5;
    var w = v & 15;
    v >>>= 4, m.setMilliseconds(0), m.setFullYear(v + 1980), m.setMonth(w - 1), m.setDate(E);
    var N = T & 31;
    T >>>= 5;
    var b = T & 63;
    return T >>>= 6, m.setHours(T), m.setMinutes(b), m.setSeconds(N << 1), m;
  }
  function f(d) {
    nr(d, 0);
    for (var T = (
      /*::(*/
      {}
    ), v = 0; d.l <= d.length - 4; ) {
      var m = d.read_shift(2), E = d.read_shift(2), w = d.l + E, N = {};
      switch (m) {
        case 21589:
          v = d.read_shift(1), v & 1 && (N.mtime = d.read_shift(4)), E > 5 && (v & 2 && (N.atime = d.read_shift(4)), v & 4 && (N.ctime = d.read_shift(4))), N.mtime && (N.mt = new Date(N.mtime * 1e3));
          break;
      }
      d.l = w, T[m] = N;
    }
    return T;
  }
  var o;
  function l() {
    return o || (o = {});
  }
  function c(d, T) {
    if (d[0] == 80 && d[1] == 75)
      return y0(d, T);
    if ((d[0] | 32) == 109 && (d[1] | 32) == 105)
      return Fs(d, T);
    if (d.length < 512)
      throw new Error("CFB file size " + d.length + " < 512");
    var v = 3, m = 512, E = 0, w = 0, N = 0, b = 0, R = 0, I = [], k = (
      /*::(*/
      d.slice(0, 512)
    );
    nr(k, 0);
    var X = u(k);
    switch (v = X[0], v) {
      case 3:
        m = 512;
        break;
      case 4:
        m = 4096;
        break;
      case 0:
        if (X[1] == 0)
          return y0(d, T);
      default:
        throw new Error("Major Version: Expected 3 or 4 saw " + v);
    }
    m !== 512 && (k = /*::(*/
    d.slice(0, m), nr(
      k,
      28
      /* blob.l */
    ));
    var q = d.slice(0, m);
    h(k, v);
    var te = k.read_shift(4, "i");
    if (v === 3 && te !== 0)
      throw new Error("# Directory Sectors: Expected 0 saw " + te);
    k.l += 4, N = k.read_shift(4, "i"), k.l += 4, k.chk("00100000", "Mini Stream Cutoff Size: "), b = k.read_shift(4, "i"), E = k.read_shift(4, "i"), R = k.read_shift(4, "i"), w = k.read_shift(4, "i");
    for (var K = -1, ee = 0; ee < 109 && (K = k.read_shift(4, "i"), !(K < 0)); ++ee)
      I[ee] = K;
    var fe = p(d, m);
    g(R, w, fe, m, I);
    var Se = O(fe, N, I, m);
    Se[N].name = "!Directory", E > 0 && b !== re && (Se[b].name = "!MiniFAT"), Se[I[0]].name = "!FAT", Se.fat_addrs = I, Se.ssz = m;
    var Ae = {}, je = [], _t = [], Tt = [];
    F(N, Se, fe, je, E, Ae, _t, b), _(_t, Tt, je), je.shift();
    var Et = {
      FileIndex: _t,
      FullPaths: Tt
    };
    return T && T.raw && (Et.raw = { header: q, sectors: fe }), Et;
  }
  function u(d) {
    if (d[d.l] == 80 && d[d.l + 1] == 75)
      return [0, 0];
    d.chk(ge, "Header Signature: "), d.l += 16;
    var T = d.read_shift(2, "u");
    return [d.read_shift(2, "u"), T];
  }
  function h(d, T) {
    var v = 9;
    switch (d.l += 2, v = d.read_shift(2)) {
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
    d.chk("0600", "Mini Sector Shift: "), d.chk("000000000000", "Reserved: ");
  }
  function p(d, T) {
    for (var v = Math.ceil(d.length / T) - 1, m = [], E = 1; E < v; ++E)
      m[E - 1] = d.slice(E * T, (E + 1) * T);
    return m[v - 1] = d.slice(v * T), m;
  }
  function _(d, T, v) {
    for (var m = 0, E = 0, w = 0, N = 0, b = 0, R = v.length, I = [], k = []; m < R; ++m)
      I[m] = k[m] = m, T[m] = v[m];
    for (; b < k.length; ++b)
      m = k[b], E = d[m].L, w = d[m].R, N = d[m].C, I[m] === m && (E !== -1 && I[E] !== E && (I[m] = I[E]), w !== -1 && I[w] !== w && (I[m] = I[w])), N !== -1 && (I[N] = m), E !== -1 && m != I[m] && (I[E] = I[m], k.lastIndexOf(E) < b && k.push(E)), w !== -1 && m != I[m] && (I[w] = I[m], k.lastIndexOf(w) < b && k.push(w));
    for (m = 1; m < R; ++m)
      I[m] === m && (w !== -1 && I[w] !== w ? I[m] = I[w] : E !== -1 && I[E] !== E && (I[m] = I[E]));
    for (m = 1; m < R; ++m)
      if (d[m].type !== 0) {
        if (b = m, b != I[b])
          do
            b = I[b], T[m] = T[b] + "/" + T[m];
          while (b !== 0 && I[b] !== -1 && b != I[b]);
        I[m] = -1;
      }
    for (T[0] += "/", m = 1; m < R; ++m)
      d[m].type !== 2 && (T[m] += "/");
  }
  function x(d, T, v) {
    for (var m = d.start, E = d.size, w = [], N = m; v && E > 0 && N >= 0; )
      w.push(T.slice(N * z, N * z + z)), E -= z, N = $r(v, N * 4);
    return w.length === 0 ? B(0) : He(w).slice(0, d.size);
  }
  function g(d, T, v, m, E) {
    var w = re;
    if (d === re) {
      if (T !== 0)
        throw new Error("DIFAT chain shorter than expected");
    } else if (d !== -1) {
      var N = v[d], b = (m >>> 2) - 1;
      if (!N)
        return;
      for (var R = 0; R < b && (w = $r(N, R * 4)) !== re; ++R)
        E.push(w);
      g($r(N, m - 4), T - 1, v, m, E);
    }
  }
  function C(d, T, v, m, E) {
    var w = [], N = [];
    E || (E = []);
    var b = m - 1, R = 0, I = 0;
    for (R = T; R >= 0; ) {
      E[R] = !0, w[w.length] = R, N.push(d[R]);
      var k = v[Math.floor(R * 4 / m)];
      if (I = R * 4 & b, m < 4 + I)
        throw new Error("FAT boundary crossed: " + R + " 4 " + m);
      if (!d[k])
        break;
      R = $r(d[k], I);
    }
    return { nodes: w, data: ea([N]) };
  }
  function O(d, T, v, m) {
    var E = d.length, w = [], N = [], b = [], R = [], I = m - 1, k = 0, X = 0, q = 0, te = 0;
    for (k = 0; k < E; ++k)
      if (b = [], q = k + T, q >= E && (q -= E), !N[q]) {
        R = [];
        var K = [];
        for (X = q; X >= 0; ) {
          K[X] = !0, N[X] = !0, b[b.length] = X, R.push(d[X]);
          var ee = v[Math.floor(X * 4 / m)];
          if (te = X * 4 & I, m < 4 + te)
            throw new Error("FAT boundary crossed: " + X + " 4 " + m);
          if (!d[ee] || (X = $r(d[ee], te), K[X]))
            break;
        }
        w[q] = { nodes: b, data: ea([R]) };
      }
    return w;
  }
  function F(d, T, v, m, E, w, N, b) {
    for (var R = 0, I = m.length ? 2 : 0, k = T[d].data, X = 0, q = 0, te; X < k.length; X += 128) {
      var K = (
        /*::(*/
        k.slice(X, X + 128)
      );
      nr(K, 64), q = K.read_shift(2), te = t0(K, 0, q - I), m.push(te);
      var ee = {
        name: te,
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
      fe !== 0 && (ee.ct = L(K, K.l - 8));
      var Se = K.read_shift(2) + K.read_shift(2) + K.read_shift(2) + K.read_shift(2);
      Se !== 0 && (ee.mt = L(K, K.l - 8)), ee.start = K.read_shift(4, "i"), ee.size = K.read_shift(4, "i"), ee.size < 0 && ee.start < 0 && (ee.size = ee.type = 0, ee.start = re, ee.name = ""), ee.type === 5 ? (R = ee.start, E > 0 && R !== re && (T[R].name = "!StreamData")) : ee.size >= 4096 ? (ee.storage = "fat", T[ee.start] === void 0 && (T[ee.start] = C(v, ee.start, T.fat_addrs, T.ssz)), T[ee.start].name = ee.name, ee.content = T[ee.start].data.slice(0, ee.size)) : (ee.storage = "minifat", ee.size < 0 ? ee.size = 0 : R !== re && ee.start !== re && T[R] && (ee.content = x(ee, T[R].data, (T[b] || {}).data))), ee.content && nr(ee.content, 0), w[te] = ee, N.push(ee);
    }
  }
  function L(d, T) {
    return new Date((ir(d, T + 4) / 1e7 * Math.pow(2, 32) + ir(d, T) / 1e7 - 11644473600) * 1e3);
  }
  function j(d, T) {
    return l(), c(o.readFileSync(d), T);
  }
  function Q(d, T) {
    var v = T && T.type;
    switch (v || ue && Buffer.isBuffer(d) && (v = "buffer"), v || "base64") {
      case "file":
        return j(d, T);
      case "base64":
        return c(pr(Rr(d)), T);
      case "binary":
        return c(pr(d), T);
    }
    return c(
      /*::typeof blob == 'string' ? new Buffer(blob, 'utf-8') : */
      d,
      T
    );
  }
  function D(d, T) {
    var v = T || {}, m = v.root || "Root Entry";
    if (d.FullPaths || (d.FullPaths = []), d.FileIndex || (d.FileIndex = []), d.FullPaths.length !== d.FileIndex.length)
      throw new Error("inconsistent CFB structure");
    d.FullPaths.length === 0 && (d.FullPaths[0] = m + "/", d.FileIndex[0] = { name: m, type: 5 }), v.CLSID && (d.FileIndex[0].clsid = v.CLSID), U(d);
  }
  function U(d) {
    var T = "Sh33tJ5";
    if (!_e.find(d, "/" + T)) {
      var v = B(4);
      v[0] = 55, v[1] = v[3] = 50, v[2] = 54, d.FileIndex.push({ name: T, type: 2, content: v, size: 4, L: 69, R: 69, C: 69 }), d.FullPaths.push(d.FullPaths[0] + T), M(d);
    }
  }
  function M(d, T) {
    D(d);
    for (var v = !1, m = !1, E = d.FullPaths.length - 1; E >= 0; --E) {
      var w = d.FileIndex[E];
      switch (w.type) {
        case 0:
          m ? v = !0 : (d.FileIndex.pop(), d.FullPaths.pop());
          break;
        case 1:
        case 2:
        case 5:
          m = !0, isNaN(w.R * w.L * w.C) && (v = !0), w.R > -1 && w.L > -1 && w.R == w.L && (v = !0);
          break;
        default:
          v = !0;
          break;
      }
    }
    if (!(!v && !T)) {
      var N = new Date(1987, 1, 19), b = 0, R = Object.create ? /* @__PURE__ */ Object.create(null) : {}, I = [];
      for (E = 0; E < d.FullPaths.length; ++E)
        R[d.FullPaths[E]] = !0, d.FileIndex[E].type !== 0 && I.push([d.FullPaths[E], d.FileIndex[E]]);
      for (E = 0; E < I.length; ++E) {
        var k = n(I[E][0]);
        m = R[k], m || (I.push([k, {
          name: a(k).replace("/", ""),
          type: 1,
          clsid: be,
          ct: N,
          mt: N,
          content: null
        }]), R[k] = !0);
      }
      for (I.sort(function(te, K) {
        return r(te[0], K[0]);
      }), d.FullPaths = [], d.FileIndex = [], E = 0; E < I.length; ++E)
        d.FullPaths[E] = I[E][0], d.FileIndex[E] = I[E][1];
      for (E = 0; E < I.length; ++E) {
        var X = d.FileIndex[E], q = d.FullPaths[E];
        if (X.name = a(q).replace("/", ""), X.L = X.R = X.C = -(X.color = 1), X.size = X.content ? X.content.length : 0, X.start = 0, X.clsid = X.clsid || be, E === 0)
          X.C = I.length > 1 ? 1 : -1, X.size = 0, X.type = 5;
        else if (q.slice(-1) == "/") {
          for (b = E + 1; b < I.length && n(d.FullPaths[b]) != q; ++b)
            ;
          for (X.C = b >= I.length ? -1 : b, b = E + 1; b < I.length && n(d.FullPaths[b]) != n(q); ++b)
            ;
          X.R = b >= I.length ? -1 : b, X.type = 1;
        } else
          n(d.FullPaths[E + 1] || "") == n(q) && (X.R = E + 1), X.type = 2;
      }
    }
  }
  function V(d, T) {
    var v = T || {};
    if (v.fileType == "mad")
      return ys(d, v);
    switch (M(d), v.fileType) {
      case "zip":
        return _s(d, v);
    }
    var m = function(te) {
      for (var K = 0, ee = 0, fe = 0; fe < te.FileIndex.length; ++fe) {
        var Se = te.FileIndex[fe];
        if (Se.content) {
          var Ae = Se.content.length;
          Ae > 0 && (Ae < 4096 ? K += Ae + 63 >> 6 : ee += Ae + 511 >> 9);
        }
      }
      for (var je = te.FullPaths.length + 3 >> 2, _t = K + 7 >> 3, Tt = K + 127 >> 7, Et = _t + ee + je + Tt, Xr = Et + 127 >> 7, Rn = Xr <= 109 ? 0 : Math.ceil((Xr - 109) / 127); Et + Xr + Rn + 127 >> 7 > Xr; )
        Rn = ++Xr <= 109 ? 0 : Math.ceil((Xr - 109) / 127);
      var Ar = [1, Rn, Xr, Tt, je, ee, K, 0];
      return te.FileIndex[0].size = K << 6, Ar[7] = (te.FileIndex[0].start = Ar[0] + Ar[1] + Ar[2] + Ar[3] + Ar[4] + Ar[5]) + (Ar[6] + 7 >> 3), Ar;
    }(d), E = B(m[7] << 9), w = 0, N = 0;
    {
      for (w = 0; w < 8; ++w)
        E.write_shift(1, le[w]);
      for (w = 0; w < 8; ++w)
        E.write_shift(2, 0);
      for (E.write_shift(2, 62), E.write_shift(2, 3), E.write_shift(2, 65534), E.write_shift(2, 9), E.write_shift(2, 6), w = 0; w < 3; ++w)
        E.write_shift(2, 0);
      for (E.write_shift(4, 0), E.write_shift(4, m[2]), E.write_shift(4, m[0] + m[1] + m[2] + m[3] - 1), E.write_shift(4, 0), E.write_shift(4, 1 << 12), E.write_shift(4, m[3] ? m[0] + m[1] + m[2] - 1 : re), E.write_shift(4, m[3]), E.write_shift(-4, m[1] ? m[0] - 1 : re), E.write_shift(4, m[1]), w = 0; w < 109; ++w)
        E.write_shift(-4, w < m[2] ? m[1] + w : -1);
    }
    if (m[1])
      for (N = 0; N < m[1]; ++N) {
        for (; w < 236 + N * 127; ++w)
          E.write_shift(-4, w < m[2] ? m[1] + w : -1);
        E.write_shift(-4, N === m[1] - 1 ? re : N + 1);
      }
    var b = function(te) {
      for (N += te; w < N - 1; ++w)
        E.write_shift(-4, w + 1);
      te && (++w, E.write_shift(-4, re));
    };
    for (N = w = 0, N += m[1]; w < N; ++w)
      E.write_shift(-4, Oe.DIFSECT);
    for (N += m[2]; w < N; ++w)
      E.write_shift(-4, Oe.FATSECT);
    b(m[3]), b(m[4]);
    for (var R = 0, I = 0, k = d.FileIndex[0]; R < d.FileIndex.length; ++R)
      k = d.FileIndex[R], k.content && (I = k.content.length, !(I < 4096) && (k.start = N, b(I + 511 >> 9)));
    for (b(m[6] + 7 >> 3); E.l & 511; )
      E.write_shift(-4, Oe.ENDOFCHAIN);
    for (N = w = 0, R = 0; R < d.FileIndex.length; ++R)
      k = d.FileIndex[R], k.content && (I = k.content.length, !(!I || I >= 4096) && (k.start = N, b(I + 63 >> 6)));
    for (; E.l & 511; )
      E.write_shift(-4, Oe.ENDOFCHAIN);
    for (w = 0; w < m[4] << 2; ++w) {
      var X = d.FullPaths[w];
      if (!X || X.length === 0) {
        for (R = 0; R < 17; ++R)
          E.write_shift(4, 0);
        for (R = 0; R < 3; ++R)
          E.write_shift(4, -1);
        for (R = 0; R < 12; ++R)
          E.write_shift(4, 0);
        continue;
      }
      k = d.FileIndex[w], w === 0 && (k.start = k.size ? k.start - 1 : re);
      var q = w === 0 && v.root || k.name;
      if (I = 2 * (q.length + 1), E.write_shift(64, q, "utf16le"), E.write_shift(2, I), E.write_shift(1, k.type), E.write_shift(1, k.color), E.write_shift(-4, k.L), E.write_shift(-4, k.R), E.write_shift(-4, k.C), k.clsid)
        E.write_shift(16, k.clsid, "hex");
      else
        for (R = 0; R < 4; ++R)
          E.write_shift(4, 0);
      E.write_shift(4, k.state || 0), E.write_shift(4, 0), E.write_shift(4, 0), E.write_shift(4, 0), E.write_shift(4, 0), E.write_shift(4, k.start), E.write_shift(4, k.size), E.write_shift(4, 0);
    }
    for (w = 1; w < d.FileIndex.length; ++w)
      if (k = d.FileIndex[w], k.size >= 4096)
        if (E.l = k.start + 1 << 9, ue && Buffer.isBuffer(k.content))
          k.content.copy(E, E.l, 0, k.size), E.l += k.size + 511 & -512;
        else {
          for (R = 0; R < k.size; ++R)
            E.write_shift(1, k.content[R]);
          for (; R & 511; ++R)
            E.write_shift(1, 0);
        }
    for (w = 1; w < d.FileIndex.length; ++w)
      if (k = d.FileIndex[w], k.size > 0 && k.size < 4096)
        if (ue && Buffer.isBuffer(k.content))
          k.content.copy(E, E.l, 0, k.size), E.l += k.size + 63 & -64;
        else {
          for (R = 0; R < k.size; ++R)
            E.write_shift(1, k.content[R]);
          for (; R & 63; ++R)
            E.write_shift(1, 0);
        }
    if (ue)
      E.l = E.length;
    else
      for (; E.l < E.length; )
        E.write_shift(1, 0);
    return E;
  }
  function G(d, T) {
    var v = d.FullPaths.map(function(R) {
      return R.toUpperCase();
    }), m = v.map(function(R) {
      var I = R.split("/");
      return I[I.length - (R.slice(-1) == "/" ? 2 : 1)];
    }), E = !1;
    T.charCodeAt(0) === 47 ? (E = !0, T = v[0].slice(0, -1) + T) : E = T.indexOf("/") !== -1;
    var w = T.toUpperCase(), N = E === !0 ? v.indexOf(w) : m.indexOf(w);
    if (N !== -1)
      return d.FileIndex[N];
    var b = !w.match(zt);
    for (w = w.replace(yt, ""), b && (w = w.replace(zt, "!")), N = 0; N < v.length; ++N)
      if ((b ? v[N].replace(zt, "!") : v[N]).replace(yt, "") == w || (b ? m[N].replace(zt, "!") : m[N]).replace(yt, "") == w)
        return d.FileIndex[N];
    return null;
  }
  var z = 64, re = -2, ge = "d0cf11e0a1b11ae1", le = [208, 207, 17, 224, 161, 177, 26, 225], be = "00000000000000000000000000000000", Oe = {
    /* 2.1 Compund File Sector Numbers and Types */
    MAXREGSECT: -6,
    DIFSECT: -4,
    FATSECT: -3,
    ENDOFCHAIN: re,
    FREESECT: -1,
    /* 2.2 Compound File Header */
    HEADER_SIGNATURE: ge,
    HEADER_MINOR_VERSION: "3e00",
    MAXREGSID: -6,
    NOSTREAM: -1,
    HEADER_CLSID: be,
    /* 2.6.1 Compound File Directory Entry */
    EntryTypes: ["unknown", "storage", "stream", "lockbytes", "property", "root"]
  };
  function ur(d, T, v) {
    l();
    var m = V(d, v);
    o.writeFileSync(T, m);
  }
  function Pe(d) {
    for (var T = new Array(d.length), v = 0; v < d.length; ++v)
      T[v] = String.fromCharCode(d[v]);
    return T.join("");
  }
  function fr(d, T) {
    var v = V(d, T);
    switch (T && T.type || "buffer") {
      case "file":
        return l(), o.writeFileSync(T.filename, v), v;
      case "binary":
        return typeof v == "string" ? v : Pe(v);
      case "base64":
        return kt(typeof v == "string" ? v : Pe(v));
      case "buffer":
        if (ue)
          return Buffer.isBuffer(v) ? v : Ir(v);
      case "array":
        return typeof v == "string" ? pr(v) : v;
    }
    return v;
  }
  var rr;
  function S(d) {
    try {
      var T = d.InflateRaw, v = new T();
      if (v._processChunk(new Uint8Array([3, 0]), v._finishFlushFlag), v.bytesRead)
        rr = d;
      else
        throw new Error("zlib does not expose bytesRead");
    } catch (m) {
      console.error("cannot use native zlib: " + (m.message || m));
    }
  }
  function P(d, T) {
    if (!rr)
      return A0(d, T);
    var v = rr.InflateRaw, m = new v(), E = m._processChunk(d.slice(d.l), m._finishFlushFlag);
    return d.l += m.bytesRead, E;
  }
  function y(d) {
    return rr ? rr.deflateRawSync(d) : g0(d);
  }
  var A = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], H = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258], ie = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577];
  function se(d) {
    var T = (d << 1 | d << 11) & 139536 | (d << 5 | d << 15) & 558144;
    return (T >> 16 | T >> 8 | T) & 255;
  }
  for (var ae = typeof Uint8Array < "u", Z = ae ? new Uint8Array(1 << 8) : [], Te = 0; Te < 1 << 8; ++Te)
    Z[Te] = se(Te);
  function ce(d, T) {
    var v = Z[d & 255];
    return T <= 8 ? v >>> 8 - T : (v = v << 8 | Z[d >> 8 & 255], T <= 16 ? v >>> 16 - T : (v = v << 8 | Z[d >> 16 & 255], v >>> 24 - T));
  }
  function Ke(d, T) {
    var v = T & 7, m = T >>> 3;
    return (d[m] | (v <= 6 ? 0 : d[m + 1] << 8)) >>> v & 3;
  }
  function xe(d, T) {
    var v = T & 7, m = T >>> 3;
    return (d[m] | (v <= 5 ? 0 : d[m + 1] << 8)) >>> v & 7;
  }
  function wr(d, T) {
    var v = T & 7, m = T >>> 3;
    return (d[m] | (v <= 4 ? 0 : d[m + 1] << 8)) >>> v & 15;
  }
  function Fe(d, T) {
    var v = T & 7, m = T >>> 3;
    return (d[m] | (v <= 3 ? 0 : d[m + 1] << 8)) >>> v & 31;
  }
  function ne(d, T) {
    var v = T & 7, m = T >>> 3;
    return (d[m] | (v <= 1 ? 0 : d[m + 1] << 8)) >>> v & 127;
  }
  function lr(d, T, v) {
    var m = T & 7, E = T >>> 3, w = (1 << v) - 1, N = d[E] >>> m;
    return v < 8 - m || (N |= d[E + 1] << 8 - m, v < 16 - m) || (N |= d[E + 2] << 16 - m, v < 24 - m) || (N |= d[E + 3] << 24 - m), N & w;
  }
  function Sr(d, T, v) {
    var m = T & 7, E = T >>> 3;
    return m <= 5 ? d[E] |= (v & 7) << m : (d[E] |= v << m & 255, d[E + 1] = (v & 7) >> 8 - m), T + 3;
  }
  function Vr(d, T, v) {
    var m = T & 7, E = T >>> 3;
    return v = (v & 1) << m, d[E] |= v, T + 1;
  }
  function nt(d, T, v) {
    var m = T & 7, E = T >>> 3;
    return v <<= m, d[E] |= v & 255, v >>>= 8, d[E + 1] = v, T + 8;
  }
  function m0(d, T, v) {
    var m = T & 7, E = T >>> 3;
    return v <<= m, d[E] |= v & 255, v >>>= 8, d[E + 1] = v & 255, d[E + 2] = v >>> 8, T + 16;
  }
  function yn(d, T) {
    var v = d.length, m = 2 * v > T ? 2 * v : T + 5, E = 0;
    if (v >= T)
      return d;
    if (ue) {
      var w = U0(m);
      if (d.copy)
        d.copy(w);
      else
        for (; E < d.length; ++E)
          w[E] = d[E];
      return w;
    } else if (ae) {
      var N = new Uint8Array(m);
      if (N.set)
        N.set(d);
      else
        for (; E < v; ++E)
          N[E] = d[E];
      return N;
    }
    return d.length = m, d;
  }
  function gr(d) {
    for (var T = new Array(d), v = 0; v < d; ++v)
      T[v] = 0;
    return T;
  }
  function Xt(d, T, v) {
    var m = 1, E = 0, w = 0, N = 0, b = 0, R = d.length, I = ae ? new Uint16Array(32) : gr(32);
    for (w = 0; w < 32; ++w)
      I[w] = 0;
    for (w = R; w < v; ++w)
      d[w] = 0;
    R = d.length;
    var k = ae ? new Uint16Array(R) : gr(R);
    for (w = 0; w < R; ++w)
      I[E = d[w]]++, m < E && (m = E), k[w] = 0;
    for (I[0] = 0, w = 1; w <= m; ++w)
      I[w + 16] = b = b + I[w - 1] << 1;
    for (w = 0; w < R; ++w)
      b = d[w], b != 0 && (k[w] = I[b + 16]++);
    var X = 0;
    for (w = 0; w < R; ++w)
      if (X = d[w], X != 0)
        for (b = ce(k[w], m) >> m - X, N = (1 << m + 4 - X) - 1; N >= 0; --N)
          T[b | N << X] = X & 15 | w << 4;
    return m;
  }
  var Cn = ae ? new Uint16Array(512) : gr(512), On = ae ? new Uint16Array(32) : gr(32);
  if (!ae) {
    for (var Gr = 0; Gr < 512; ++Gr)
      Cn[Gr] = 0;
    for (Gr = 0; Gr < 32; ++Gr)
      On[Gr] = 0;
  }
  (function() {
    for (var d = [], T = 0; T < 32; T++)
      d.push(5);
    Xt(d, On, 32);
    var v = [];
    for (T = 0; T <= 143; T++)
      v.push(8);
    for (; T <= 255; T++)
      v.push(9);
    for (; T <= 279; T++)
      v.push(7);
    for (; T <= 287; T++)
      v.push(8);
    Xt(v, Cn, 288);
  })();
  var ps = /* @__PURE__ */ function() {
    for (var T = ae ? new Uint8Array(32768) : [], v = 0, m = 0; v < ie.length - 1; ++v)
      for (; m < ie[v + 1]; ++m)
        T[m] = v;
    for (; m < 32768; ++m)
      T[m] = 29;
    var E = ae ? new Uint8Array(259) : [];
    for (v = 0, m = 0; v < H.length - 1; ++v)
      for (; m < H[v + 1]; ++m)
        E[m] = v;
    function w(b, R) {
      for (var I = 0; I < b.length; ) {
        var k = Math.min(65535, b.length - I), X = I + k == b.length;
        for (R.write_shift(1, +X), R.write_shift(2, k), R.write_shift(2, ~k & 65535); k-- > 0; )
          R[R.l++] = b[I++];
      }
      return R.l;
    }
    function N(b, R) {
      for (var I = 0, k = 0, X = ae ? new Uint16Array(32768) : []; k < b.length; ) {
        var q = (
          /* data.length - boff; */
          Math.min(65535, b.length - k)
        );
        if (q < 10) {
          for (I = Sr(R, I, +(k + q == b.length)), I & 7 && (I += 8 - (I & 7)), R.l = I / 8 | 0, R.write_shift(2, q), R.write_shift(2, ~q & 65535); q-- > 0; )
            R[R.l++] = b[k++];
          I = R.l * 8;
          continue;
        }
        I = Sr(R, I, +(k + q == b.length) + 2);
        for (var te = 0; q-- > 0; ) {
          var K = b[k];
          te = (te << 5 ^ K) & 32767;
          var ee = -1, fe = 0;
          if ((ee = X[te]) && (ee |= k & -32768, ee > k && (ee -= 32768), ee < k))
            for (; b[ee + fe] == b[k + fe] && fe < 250; )
              ++fe;
          if (fe > 2) {
            K = E[fe], K <= 22 ? I = nt(R, I, Z[K + 1] >> 1) - 1 : (nt(R, I, 3), I += 5, nt(R, I, Z[K - 23] >> 5), I += 3);
            var Se = K < 8 ? 0 : K - 4 >> 2;
            Se > 0 && (m0(R, I, fe - H[K]), I += Se), K = T[k - ee], I = nt(R, I, Z[K] >> 3), I -= 3;
            var Ae = K < 4 ? 0 : K - 2 >> 1;
            Ae > 0 && (m0(R, I, k - ee - ie[K]), I += Ae);
            for (var je = 0; je < fe; ++je)
              X[te] = k & 32767, te = (te << 5 ^ b[k]) & 32767, ++k;
            q -= fe - 1;
          } else
            K <= 143 ? K = K + 48 : I = Vr(R, I, 1), I = nt(R, I, Z[K]), X[te] = k & 32767, ++k;
        }
        I = nt(R, I, 0) - 1;
      }
      return R.l = (I + 7) / 8 | 0, R.l;
    }
    return function(R, I) {
      return R.length < 8 ? w(R, I) : N(R, I);
    };
  }();
  function g0(d) {
    var T = B(50 + Math.floor(d.length * 1.1)), v = ps(d, T);
    return T.slice(0, v);
  }
  var _0 = ae ? new Uint16Array(32768) : gr(32768), T0 = ae ? new Uint16Array(32768) : gr(32768), E0 = ae ? new Uint16Array(128) : gr(128), w0 = 1, S0 = 1;
  function vs(d, T) {
    var v = Fe(d, T) + 257;
    T += 5;
    var m = Fe(d, T) + 1;
    T += 5;
    var E = wr(d, T) + 4;
    T += 4;
    for (var w = 0, N = ae ? new Uint8Array(19) : gr(19), b = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], R = 1, I = ae ? new Uint8Array(8) : gr(8), k = ae ? new Uint8Array(8) : gr(8), X = N.length, q = 0; q < E; ++q)
      N[A[q]] = w = xe(d, T), R < w && (R = w), I[w]++, T += 3;
    var te = 0;
    for (I[0] = 0, q = 1; q <= R; ++q)
      k[q] = te = te + I[q - 1] << 1;
    for (q = 0; q < X; ++q)
      (te = N[q]) != 0 && (b[q] = k[te]++);
    var K = 0;
    for (q = 0; q < X; ++q)
      if (K = N[q], K != 0) {
        te = Z[b[q]] >> 8 - K;
        for (var ee = (1 << 7 - K) - 1; ee >= 0; --ee)
          E0[te | ee << K] = K & 7 | q << 3;
      }
    var fe = [];
    for (R = 1; fe.length < v + m; )
      switch (te = E0[ne(d, T)], T += te & 7, te >>>= 3) {
        case 16:
          for (w = 3 + Ke(d, T), T += 2, te = fe[fe.length - 1]; w-- > 0; )
            fe.push(te);
          break;
        case 17:
          for (w = 3 + xe(d, T), T += 3; w-- > 0; )
            fe.push(0);
          break;
        case 18:
          for (w = 11 + ne(d, T), T += 7; w-- > 0; )
            fe.push(0);
          break;
        default:
          fe.push(te), R < te && (R = te);
          break;
      }
    var Se = fe.slice(0, v), Ae = fe.slice(v);
    for (q = v; q < 286; ++q)
      Se[q] = 0;
    for (q = m; q < 30; ++q)
      Ae[q] = 0;
    return w0 = Xt(Se, _0, 286), S0 = Xt(Ae, T0, 30), T;
  }
  function ms(d, T) {
    if (d[0] == 3 && !(d[1] & 3))
      return [Kr(T), 2];
    for (var v = 0, m = 0, E = U0(T || 1 << 18), w = 0, N = E.length >>> 0, b = 0, R = 0; !(m & 1); ) {
      if (m = xe(d, v), v += 3, m >>> 1)
        m >> 1 == 1 ? (b = 9, R = 5) : (v = vs(d, v), b = w0, R = S0);
      else {
        v & 7 && (v += 8 - (v & 7));
        var I = d[v >>> 3] | d[(v >>> 3) + 1] << 8;
        if (v += 32, I > 0)
          for (!T && N < w + I && (E = yn(E, w + I), N = E.length); I-- > 0; )
            E[w++] = d[v >>> 3], v += 8;
        continue;
      }
      for (; ; ) {
        !T && N < w + 32767 && (E = yn(E, w + 32767), N = E.length);
        var k = lr(d, v, b), X = m >>> 1 == 1 ? Cn[k] : _0[k];
        if (v += X & 15, X >>>= 4, !(X >>> 8 & 255))
          E[w++] = X;
        else {
          if (X == 256)
            break;
          X -= 257;
          var q = X < 8 ? 0 : X - 4 >> 2;
          q > 5 && (q = 0);
          var te = w + H[X];
          q > 0 && (te += lr(d, v, q), v += q), k = lr(d, v, R), X = m >>> 1 == 1 ? On[k] : T0[k], v += X & 15, X >>>= 4;
          var K = X < 4 ? 0 : X - 2 >> 1, ee = ie[X];
          for (K > 0 && (ee += lr(d, v, K), v += K), !T && N < te && (E = yn(E, te + 100), N = E.length); w < te; )
            E[w] = E[w - ee], ++w;
        }
      }
    }
    return T ? [E, v + 7 >>> 3] : [E.slice(0, w), v + 7 >>> 3];
  }
  function A0(d, T) {
    var v = d.slice(d.l || 0), m = ms(v, T);
    return d.l += m[1], m[0];
  }
  function F0(d, T) {
    if (d)
      typeof console < "u" && console.error(T);
    else
      throw new Error(T);
  }
  function y0(d, T) {
    var v = (
      /*::(*/
      d
    );
    nr(v, 0);
    var m = [], E = [], w = {
      FileIndex: m,
      FullPaths: E
    };
    D(w, { root: T.root });
    for (var N = v.length - 4; (v[N] != 80 || v[N + 1] != 75 || v[N + 2] != 5 || v[N + 3] != 6) && N >= 0; )
      --N;
    v.l = N + 4, v.l += 4;
    var b = v.read_shift(2);
    v.l += 6;
    var R = v.read_shift(4);
    for (v.l = R, N = 0; N < b; ++N) {
      v.l += 20;
      var I = v.read_shift(4), k = v.read_shift(4), X = v.read_shift(2), q = v.read_shift(2), te = v.read_shift(2);
      v.l += 8;
      var K = v.read_shift(4), ee = f(
        /*::(*/
        v.slice(v.l + X, v.l + X + q)
        /*:: :any)*/
      );
      v.l += X + q + te;
      var fe = v.l;
      v.l = K + 4, gs(v, I, k, w, ee), v.l = fe;
    }
    return w;
  }
  function gs(d, T, v, m, E) {
    d.l += 2;
    var w = d.read_shift(2), N = d.read_shift(2), b = s(d);
    if (w & 8257)
      throw new Error("Unsupported ZIP encryption");
    for (var R = d.read_shift(4), I = d.read_shift(4), k = d.read_shift(4), X = d.read_shift(2), q = d.read_shift(2), te = "", K = 0; K < X; ++K)
      te += String.fromCharCode(d[d.l++]);
    if (q) {
      var ee = f(
        /*::(*/
        d.slice(d.l, d.l + q)
        /*:: :any)*/
      );
      (ee[21589] || {}).mt && (b = ee[21589].mt), ((E || {})[21589] || {}).mt && (b = E[21589].mt);
    }
    d.l += q;
    var fe = d.slice(d.l, d.l + I);
    switch (N) {
      case 8:
        fe = P(d, k);
        break;
      case 0:
        break;
      default:
        throw new Error("Unsupported ZIP Compression method " + N);
    }
    var Se = !1;
    w & 8 && (R = d.read_shift(4), R == 134695760 && (R = d.read_shift(4), Se = !0), I = d.read_shift(4), k = d.read_shift(4)), I != T && F0(Se, "Bad compressed size: " + T + " != " + I), k != v && F0(Se, "Bad uncompressed size: " + v + " != " + k), Dn(m, te, fe, { unsafe: !0, mt: b });
  }
  function _s(d, T) {
    var v = T || {}, m = [], E = [], w = B(1), N = v.compression ? 8 : 0, b = 0, R = 0, I = 0, k = 0, X = 0, q = d.FullPaths[0], te = q, K = d.FileIndex[0], ee = [], fe = 0;
    for (R = 1; R < d.FullPaths.length; ++R)
      if (te = d.FullPaths[R].slice(q.length), K = d.FileIndex[R], !(!K.size || !K.content || te == "Sh33tJ5")) {
        var Se = k, Ae = B(te.length);
        for (I = 0; I < te.length; ++I)
          Ae.write_shift(1, te.charCodeAt(I) & 127);
        Ae = Ae.slice(0, Ae.l), ee[X] = hl.buf(
          /*::((*/
          K.content,
          0
        );
        var je = K.content;
        N == 8 && (je = y(je)), w = B(30), w.write_shift(4, 67324752), w.write_shift(2, 20), w.write_shift(2, b), w.write_shift(2, N), K.mt ? i(w, K.mt) : w.write_shift(4, 0), w.write_shift(-4, ee[X]), w.write_shift(4, je.length), w.write_shift(
          4,
          /*::(*/
          K.content.length
        ), w.write_shift(2, Ae.length), w.write_shift(2, 0), k += w.length, m.push(w), k += Ae.length, m.push(Ae), k += je.length, m.push(je), w = B(46), w.write_shift(4, 33639248), w.write_shift(2, 0), w.write_shift(2, 20), w.write_shift(2, b), w.write_shift(2, N), w.write_shift(4, 0), w.write_shift(-4, ee[X]), w.write_shift(4, je.length), w.write_shift(
          4,
          /*::(*/
          K.content.length
        ), w.write_shift(2, Ae.length), w.write_shift(2, 0), w.write_shift(2, 0), w.write_shift(2, 0), w.write_shift(2, 0), w.write_shift(4, 0), w.write_shift(4, Se), fe += w.l, E.push(w), fe += Ae.length, E.push(Ae), ++X;
      }
    return w = B(22), w.write_shift(4, 101010256), w.write_shift(2, 0), w.write_shift(2, 0), w.write_shift(2, X), w.write_shift(2, X), w.write_shift(4, fe), w.write_shift(4, k), w.write_shift(2, 0), He([He(m), He(E), w]);
  }
  var jt = {
    htm: "text/html",
    xml: "text/xml",
    gif: "image/gif",
    jpg: "image/jpeg",
    png: "image/png",
    mso: "application/x-mso",
    thmx: "application/vnd.ms-officetheme",
    sh33tj5: "application/octet-stream"
  };
  function Ts(d, T) {
    if (d.ctype)
      return d.ctype;
    var v = d.name || "", m = v.match(/\.([^\.]+)$/);
    return m && jt[m[1]] || T && (m = (v = T).match(/[\.\\]([^\.\\])+$/), m && jt[m[1]]) ? jt[m[1]] : "application/octet-stream";
  }
  function Es(d) {
    for (var T = kt(d), v = [], m = 0; m < T.length; m += 76)
      v.push(T.slice(m, m + 76));
    return v.join(`\r
`) + `\r
`;
  }
  function ws(d) {
    var T = d.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7E-\xFF=]/g, function(I) {
      var k = I.charCodeAt(0).toString(16).toUpperCase();
      return "=" + (k.length == 1 ? "0" + k : k);
    });
    T = T.replace(/ $/mg, "=20").replace(/\t$/mg, "=09"), T.charAt(0) == `
` && (T = "=0D" + T.slice(1)), T = T.replace(/\r(?!\n)/mg, "=0D").replace(/\n\n/mg, `
=0A`).replace(/([^\r\n])\n/mg, "$1=0A");
    for (var v = [], m = T.split(`\r
`), E = 0; E < m.length; ++E) {
      var w = m[E];
      if (w.length == 0) {
        v.push("");
        continue;
      }
      for (var N = 0; N < w.length; ) {
        var b = 76, R = w.slice(N, N + b);
        R.charAt(b - 1) == "=" ? b-- : R.charAt(b - 2) == "=" ? b -= 2 : R.charAt(b - 3) == "=" && (b -= 3), R = w.slice(N, N + b), N += b, N < w.length && (R += "="), v.push(R);
      }
    }
    return v.join(`\r
`);
  }
  function Ss(d) {
    for (var T = [], v = 0; v < d.length; ++v) {
      for (var m = d[v]; v <= d.length && m.charAt(m.length - 1) == "="; )
        m = m.slice(0, m.length - 1) + d[++v];
      T.push(m);
    }
    for (var E = 0; E < T.length; ++E)
      T[E] = T[E].replace(/[=][0-9A-Fa-f]{2}/g, function(w) {
        return String.fromCharCode(parseInt(w.slice(1), 16));
      });
    return pr(T.join(`\r
`));
  }
  function As(d, T, v) {
    for (var m = "", E = "", w = "", N, b = 0; b < 10; ++b) {
      var R = T[b];
      if (!R || R.match(/^\s*$/))
        break;
      var I = R.match(/^(.*?):\s*([^\s].*)$/);
      if (I)
        switch (I[1].toLowerCase()) {
          case "content-location":
            m = I[2].trim();
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
        N = pr(Rr(T.slice(b).join("")));
        break;
      case "quoted-printable":
        N = Ss(T.slice(b));
        break;
      default:
        throw new Error("Unsupported Content-Transfer-Encoding " + E);
    }
    var k = Dn(d, m.slice(v.length), N, { unsafe: !0 });
    w && (k.ctype = w);
  }
  function Fs(d, T) {
    if (Pe(d.slice(0, 13)).toLowerCase() != "mime-version:")
      throw new Error("Unsupported MAD header");
    var v = T && T.root || "", m = (ue && Buffer.isBuffer(d) ? d.toString("binary") : Pe(d)).split(`\r
`), E = 0, w = "";
    for (E = 0; E < m.length; ++E)
      if (w = m[E], !!/^Content-Location:/i.test(w) && (w = w.slice(w.indexOf("file")), v || (v = w.slice(0, w.lastIndexOf("/") + 1)), w.slice(0, v.length) != v))
        for (; v.length > 0 && (v = v.slice(0, v.length - 1), v = v.slice(0, v.lastIndexOf("/") + 1), w.slice(0, v.length) != v); )
          ;
    var N = (m[1] || "").match(/boundary="(.*?)"/);
    if (!N)
      throw new Error("MAD cannot find boundary");
    var b = "--" + (N[1] || ""), R = [], I = [], k = {
      FileIndex: R,
      FullPaths: I
    };
    D(k);
    var X, q = 0;
    for (E = 0; E < m.length; ++E) {
      var te = m[E];
      te !== b && te !== b + "--" || (q++ && As(k, m.slice(X, E), v), X = E);
    }
    return k;
  }
  function ys(d, T) {
    var v = T || {}, m = v.boundary || "SheetJS";
    m = "------=" + m;
    for (var E = [
      "MIME-Version: 1.0",
      'Content-Type: multipart/related; boundary="' + m.slice(2) + '"',
      "",
      "",
      ""
    ], w = d.FullPaths[0], N = w, b = d.FileIndex[0], R = 1; R < d.FullPaths.length; ++R)
      if (N = d.FullPaths[R].slice(w.length), b = d.FileIndex[R], !(!b.size || !b.content || N == "Sh33tJ5")) {
        N = N.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7E-\xFF]/g, function(fe) {
          return "_x" + fe.charCodeAt(0).toString(16) + "_";
        }).replace(/[\u0080-\uFFFF]/g, function(fe) {
          return "_u" + fe.charCodeAt(0).toString(16) + "_";
        });
        for (var I = b.content, k = ue && Buffer.isBuffer(I) ? I.toString("binary") : Pe(I), X = 0, q = Math.min(1024, k.length), te = 0, K = 0; K <= q; ++K)
          (te = k.charCodeAt(K)) >= 32 && te < 128 && ++X;
        var ee = X >= q * 4 / 5;
        E.push(m), E.push("Content-Location: " + (v.root || "file:///C:/SheetJS/") + N), E.push("Content-Transfer-Encoding: " + (ee ? "quoted-printable" : "base64")), E.push("Content-Type: " + Ts(b, N)), E.push(""), E.push(ee ? ws(k) : Es(k));
      }
    return E.push(m + `--\r
`), E.join(`\r
`);
  }
  function Cs(d) {
    var T = {};
    return D(T, d), T;
  }
  function Dn(d, T, v, m) {
    var E = m && m.unsafe;
    E || D(d);
    var w = !E && _e.find(d, T);
    if (!w) {
      var N = d.FullPaths[0];
      T.slice(0, N.length) == N ? N = T : (N.slice(-1) != "/" && (N += "/"), N = (N + T).replace("//", "/")), w = { name: a(T), type: 2 }, d.FileIndex.push(w), d.FullPaths.push(N), E || _e.utils.cfb_gc(d);
    }
    return w.content = v, w.size = v ? v.length : 0, m && (m.CLSID && (w.clsid = m.CLSID), m.mt && (w.mt = m.mt), m.ct && (w.ct = m.ct)), w;
  }
  function Os(d, T) {
    D(d);
    var v = _e.find(d, T);
    if (v) {
      for (var m = 0; m < d.FileIndex.length; ++m)
        if (d.FileIndex[m] == v)
          return d.FileIndex.splice(m, 1), d.FullPaths.splice(m, 1), !0;
    }
    return !1;
  }
  function Ds(d, T, v) {
    D(d);
    var m = _e.find(d, T);
    if (m) {
      for (var E = 0; E < d.FileIndex.length; ++E)
        if (d.FileIndex[E] == m)
          return d.FileIndex[E].name = a(v), d.FullPaths[E] = v, !0;
    }
    return !1;
  }
  function Rs(d) {
    M(d, !0);
  }
  return t.find = G, t.read = Q, t.parse = c, t.write = fr, t.writeFile = ur, t.utils = {
    cfb_new: Cs,
    cfb_add: Dn,
    cfb_del: Os,
    cfb_mov: Ds,
    cfb_gc: Rs,
    ReadShift: Ot,
    CheckField: xi,
    prep_blob: nr,
    bconcat: He,
    use_zlib: S,
    _deflateRaw: g0,
    _inflateRaw: A0,
    consts: Oe
  }, t;
}();
function ul(e) {
  return typeof e == "string" ? gn(e) : Array.isArray(e) ? bf(e) : e;
}
function Ut(e, t, r) {
  if (typeof Deno < "u") {
    if (r && typeof t == "string")
      switch (r) {
        case "utf8":
          t = new TextEncoder(r).encode(t);
          break;
        case "binary":
          t = gn(t);
          break;
        default:
          throw new Error("Unsupported encoding " + r);
      }
    return Deno.writeFileSync(e, t);
  }
  var n = r == "utf8" ? Fr(t) : t;
  if (typeof IE_SaveFile < "u")
    return IE_SaveFile(n, e);
  if (typeof Blob < "u") {
    var a = new Blob([ul(n)], { type: "application/octet-stream" });
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
      return f.open("w"), f.encoding = "binary", Array.isArray(t) && (t = bt(t)), f.write(t), f.close(), t;
    } catch (o) {
      if (!o.message || !o.message.match(/onstruct/))
        throw o;
    }
  throw new Error("cannot save file " + e);
}
function Xe(e) {
  for (var t = Object.keys(e), r = [], n = 0; n < t.length; ++n)
    Object.prototype.hasOwnProperty.call(e, t[n]) && r.push(t[n]);
  return r;
}
function z0(e, t) {
  for (var r = [], n = Xe(e), a = 0; a !== n.length; ++a)
    r[e[n[a]][t]] == null && (r[e[n[a]][t]] = n[a]);
  return r;
}
function Zn(e) {
  for (var t = [], r = Xe(e), n = 0; n !== r.length; ++n)
    t[e[r[n]]] = r[n];
  return t;
}
function En(e) {
  for (var t = [], r = Xe(e), n = 0; n !== r.length; ++n)
    t[e[r[n]]] = parseInt(r[n], 10);
  return t;
}
function xl(e) {
  for (var t = [], r = Xe(e), n = 0; n !== r.length; ++n)
    t[e[r[n]]] == null && (t[e[r[n]]] = []), t[e[r[n]]].push(r[n]);
  return t;
}
var fn = /* @__PURE__ */ new Date(1899, 11, 30, 0, 0, 0);
function Qe(e, t) {
  var r = /* @__PURE__ */ e.getTime();
  t && (r -= 1462 * 24 * 60 * 60 * 1e3);
  var n = /* @__PURE__ */ fn.getTime() + (/* @__PURE__ */ e.getTimezoneOffset() - /* @__PURE__ */ fn.getTimezoneOffset()) * 6e4;
  return (r - n) / (24 * 60 * 60 * 1e3);
}
var Ja = /* @__PURE__ */ new Date(), dl = /* @__PURE__ */ fn.getTime() + (/* @__PURE__ */ Ja.getTimezoneOffset() - /* @__PURE__ */ fn.getTimezoneOffset()) * 6e4, K0 = /* @__PURE__ */ Ja.getTimezoneOffset();
function qa(e) {
  var t = new Date();
  return t.setTime(e * 24 * 60 * 60 * 1e3 + dl), t.getTimezoneOffset() !== K0 && t.setTime(t.getTime() + (t.getTimezoneOffset() - K0) * 6e4), t;
}
var Y0 = /* @__PURE__ */ new Date("2017-02-19T19:06:09.000Z"), Za = /* @__PURE__ */ isNaN(/* @__PURE__ */ Y0.getFullYear()) ? /* @__PURE__ */ new Date("2/19/17") : Y0, pl = /* @__PURE__ */ Za.getFullYear() == 2017;
function qe(e, t) {
  var r = new Date(e);
  if (pl)
    return t > 0 ? r.setTime(r.getTime() + r.getTimezoneOffset() * 60 * 1e3) : t < 0 && r.setTime(r.getTime() - r.getTimezoneOffset() * 60 * 1e3), r;
  if (e instanceof Date)
    return e;
  if (Za.getFullYear() == 1917 && !isNaN(r.getFullYear())) {
    var n = r.getFullYear();
    return e.indexOf("" + n) > -1 || r.setFullYear(r.getFullYear() + 100), r;
  }
  var a = e.match(/\d+/g) || ["2017", "2", "19", "0", "0", "0"], i = new Date(+a[0], +a[1] - 1, +a[2], +a[3] || 0, +a[4] || 0, +a[5] || 0);
  return e.indexOf("Z") > -1 && (i = new Date(i.getTime() - i.getTimezoneOffset() * 60 * 1e3)), i;
}
function wn(e, t) {
  if (ue && Buffer.isBuffer(e)) {
    if (t) {
      if (e[0] == 255 && e[1] == 254)
        return Fr(e.slice(2).toString("utf16le"));
      if (e[1] == 254 && e[2] == 255)
        return Fr(Bf(e.slice(2).toString("binary")));
    }
    return e.toString("binary");
  }
  if (typeof TextDecoder < "u")
    try {
      if (t) {
        if (e[0] == 255 && e[1] == 254)
          return Fr(new TextDecoder("utf-16le").decode(e.slice(2)));
        if (e[0] == 254 && e[1] == 255)
          return Fr(new TextDecoder("utf-16be").decode(e.slice(2)));
      }
      var r = {
        "€": "",
        "‚": "",
        ƒ: "",
        "„": "",
        "…": "",
        "†": "",
        "‡": "",
        "ˆ": "",
        "‰": "",
        Š: "",
        "‹": "",
        Œ: "",
        Ž: "",
        "‘": "",
        "’": "",
        "“": "",
        "”": "",
        "•": "",
        "–": "",
        "—": "",
        "˜": "",
        "™": "",
        š: "",
        "›": "",
        œ: "",
        ž: "",
        Ÿ: ""
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
function er(e) {
  if (typeof JSON < "u" && !Array.isArray(e))
    return JSON.parse(JSON.stringify(e));
  if (typeof e != "object" || e == null)
    return e;
  if (e instanceof Date)
    return new Date(e.getTime());
  var t = {};
  for (var r in e)
    Object.prototype.hasOwnProperty.call(e, r) && (t[r] = er(e[r]));
  return t;
}
function ye(e, t) {
  for (var r = ""; r.length < t; )
    r += e;
  return r;
}
function Cr(e) {
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
var vl = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
function Pt(e) {
  var t = new Date(e), r = new Date(NaN), n = t.getYear(), a = t.getMonth(), i = t.getDate();
  if (isNaN(i))
    return r;
  var s = e.toLowerCase();
  if (s.match(/jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec/)) {
    if (s = s.replace(/[^a-z]/g, "").replace(/([^a-z]|^)[ap]m?([^a-z]|$)/, ""), s.length > 3 && vl.indexOf(s) == -1)
      return r;
  } else if (s.match(/[a-z]/))
    return r;
  return n < 0 || n > 8099 ? r : (a > 0 || i > 1) && n != 101 ? t : e.match(/[^-0-9:,\/\\]/) ? r : t;
}
function oe(e, t, r) {
  if (e.FullPaths) {
    if (typeof r == "string") {
      var n;
      return ue ? n = Ir(r) : n = Uf(r), _e.utils.cfb_add(e, t, n);
    }
    _e.utils.cfb_add(e, t, r);
  } else
    e.file(t, r);
}
function Qn() {
  return _e.utils.cfb_new();
}
var Ie = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\r
`, ml = {
  "&quot;": '"',
  "&apos;": "'",
  "&gt;": ">",
  "&lt;": "<",
  "&amp;": "&"
}, e0 = /* @__PURE__ */ Zn(ml), r0 = /[&<>'"]/g, gl = /[\u0000-\u0008\u000b-\u001f]/g;
function ve(e) {
  var t = e + "";
  return t.replace(r0, function(r) {
    return e0[r];
  }).replace(gl, function(r) {
    return "_x" + ("000" + r.charCodeAt(0).toString(16)).slice(-4) + "_";
  });
}
function J0(e) {
  return ve(e).replace(/ /g, "_x0020_");
}
var Qa = /[\u0000-\u001f]/g;
function _l(e) {
  var t = e + "";
  return t.replace(r0, function(r) {
    return e0[r];
  }).replace(/\n/g, "<br/>").replace(Qa, function(r) {
    return "&#x" + ("000" + r.charCodeAt(0).toString(16)).slice(-4) + ";";
  });
}
function Tl(e) {
  var t = e + "";
  return t.replace(r0, function(r) {
    return e0[r];
  }).replace(Qa, function(r) {
    return "&#x" + r.charCodeAt(0).toString(16).toUpperCase() + ";";
  });
}
function El(e) {
  return e.replace(/(\r\n|[\r\n])/g, "&#10;");
}
function wl(e) {
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
function Pn(e) {
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
function q0(e) {
  var t = Kr(2 * e.length), r, n, a = 1, i = 0, s = 0, f;
  for (n = 0; n < e.length; n += a)
    a = 1, (f = e.charCodeAt(n)) < 128 ? r = f : f < 224 ? (r = (f & 31) * 64 + (e.charCodeAt(n + 1) & 63), a = 2) : f < 240 ? (r = (f & 15) * 4096 + (e.charCodeAt(n + 1) & 63) * 64 + (e.charCodeAt(n + 2) & 63), a = 3) : (a = 4, r = (f & 7) * 262144 + (e.charCodeAt(n + 1) & 63) * 4096 + (e.charCodeAt(n + 2) & 63) * 64 + (e.charCodeAt(n + 3) & 63), r -= 65536, s = 55296 + (r >>> 10 & 1023), r = 56320 + (r & 1023)), s !== 0 && (t[i++] = s & 255, t[i++] = s >>> 8, s = 0), t[i++] = r % 256, t[i++] = r >>> 8;
  return t.slice(0, i).toString("ucs2");
}
function Z0(e) {
  return Ir(e, "binary").toString("utf8");
}
var Yt = "foo bar bazâð£", Ct = ue && (/* @__PURE__ */ Z0(Yt) == /* @__PURE__ */ Pn(Yt) && Z0 || /* @__PURE__ */ q0(Yt) == /* @__PURE__ */ Pn(Yt) && q0) || Pn, Fr = ue ? function(e) {
  return Ir(e, "utf8").toString("binary");
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
}, Sl = /* @__PURE__ */ function() {
  var e = [
    ["nbsp", " "],
    ["middot", "·"],
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
}(), ei = /(^\s|\s$|\n)/;
function Ve(e, t) {
  return "<" + e + (t.match(ei) ? ' xml:space="preserve"' : "") + ">" + t + "</" + e + ">";
}
function Lt(e) {
  return Xe(e).map(function(t) {
    return " " + t + '="' + e[t] + '"';
  }).join("");
}
function Y(e, t, r) {
  return "<" + e + (r != null ? Lt(r) : "") + (t != null ? (t.match(ei) ? ' xml:space="preserve"' : "") + ">" + t + "</" + e : "/") + ">";
}
function Gn(e, t) {
  try {
    return e.toISOString().replace(/\.\d*/, "");
  } catch (r) {
    if (t)
      throw r;
  }
  return "";
}
function Al(e, t) {
  switch (typeof e) {
    case "string":
      var r = Y("vt:lpwstr", ve(e));
      return t && (r = r.replace(/&quot;/g, "_x0022_")), r;
    case "number":
      return Y((e | 0) == e ? "vt:i4" : "vt:r8", ve(String(e)));
    case "boolean":
      return Y("vt:bool", e ? "true" : "false");
  }
  if (e instanceof Date)
    return Y("vt:filetime", Gn(e));
  throw new Error("Unable to serialize " + e);
}
var Le = {
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
}, pt = [
  "http://schemas.openxmlformats.org/spreadsheetml/2006/main",
  "http://purl.oclc.org/ooxml/spreadsheetml/main",
  "http://schemas.microsoft.com/office/excel/2006/main",
  "http://schemas.microsoft.com/office/excel/2006/2"
], ar = {
  o: "urn:schemas-microsoft-com:office:office",
  x: "urn:schemas-microsoft-com:office:excel",
  ss: "urn:schemas-microsoft-com:office:spreadsheet",
  dt: "uuid:C2F41010-65B3-11d1-A29F-00AA00C14882",
  mv: "http://macVmlSchemaUri",
  v: "urn:schemas-microsoft-com:vml",
  html: "http://www.w3.org/TR/REC-html40"
};
function Fl(e, t) {
  for (var r = 1 - 2 * (e[t + 7] >>> 7), n = ((e[t + 7] & 127) << 4) + (e[t + 6] >>> 4 & 15), a = e[t + 6] & 15, i = 5; i >= 0; --i)
    a = a * 256 + e[t + i];
  return n == 2047 ? a == 0 ? r * (1 / 0) : NaN : (n == 0 ? n = -1022 : (n -= 1023, a += Math.pow(2, 52)), r * Math.pow(2, n - 52) * a);
}
function yl(e, t, r) {
  var n = (t < 0 || 1 / t == -1 / 0 ? 1 : 0) << 7, a = 0, i = 0, s = n ? -t : t;
  isFinite(s) ? s == 0 ? a = i = 0 : (a = Math.floor(Math.log(s) / Math.LN2), i = s * Math.pow(2, 52 - a), a <= -1023 && (!isFinite(i) || i < Math.pow(2, 52)) ? a = -1022 : (i -= Math.pow(2, 52), a += 1023)) : (a = 2047, i = isNaN(t) ? 26985 : 0);
  for (var f = 0; f <= 5; ++f, i /= 256)
    e[r + f] = i & 255;
  e[r + 6] = (a & 15) << 4 | i & 15, e[r + 7] = a >> 4 | n;
}
var Q0 = function(e) {
  for (var t = [], r = 10240, n = 0; n < e[0].length; ++n)
    if (e[0][n])
      for (var a = 0, i = e[0][n].length; a < i; a += r)
        t.push.apply(t, e[0][n].slice(a, a + r));
  return t;
}, ea = ue ? function(e) {
  return e[0].length > 0 && Buffer.isBuffer(e[0][0]) ? Buffer.concat(e[0].map(function(t) {
    return Buffer.isBuffer(t) ? t : Ir(t);
  })) : Q0(e);
} : Q0, ra = function(e, t, r) {
  for (var n = [], a = t; a < r; a += 2)
    n.push(String.fromCharCode(Ft(e, a)));
  return n.join("").replace(yt, "");
}, t0 = ue ? function(e, t, r) {
  return Buffer.isBuffer(e) ? e.toString("utf16le", t, r).replace(yt, "") : ra(e, t, r);
} : ra, ta = function(e, t, r) {
  for (var n = [], a = t; a < t + r; ++a)
    n.push(("0" + e[a].toString(16)).slice(-2));
  return n.join("");
}, ri = ue ? function(e, t, r) {
  return Buffer.isBuffer(e) ? e.toString("hex", t, t + r) : ta(e, t, r);
} : ta, na = function(e, t, r) {
  for (var n = [], a = t; a < r; a++)
    n.push(String.fromCharCode(ft(e, a)));
  return n.join("");
}, Wt = ue ? function(t, r, n) {
  return Buffer.isBuffer(t) ? t.toString("utf8", r, n) : na(t, r, n);
} : na, ti = function(e, t) {
  var r = ir(e, t);
  return r > 0 ? Wt(e, t + 4, t + 4 + r - 1) : "";
}, ni = ti, ai = function(e, t) {
  var r = ir(e, t);
  return r > 0 ? Wt(e, t + 4, t + 4 + r - 1) : "";
}, ii = ai, si = function(e, t) {
  var r = 2 * ir(e, t);
  return r > 0 ? Wt(e, t + 4, t + 4 + r - 1) : "";
}, fi = si, li = function(t, r) {
  var n = ir(t, r);
  return n > 0 ? t0(t, r + 4, r + 4 + n) : "";
}, oi = li, ci = function(e, t) {
  var r = ir(e, t);
  return r > 0 ? Wt(e, t + 4, t + 4 + r) : "";
}, hi = ci, ui = function(e, t) {
  return Fl(e, t);
}, ln = ui, n0 = function(t) {
  return Array.isArray(t) || typeof Uint8Array < "u" && t instanceof Uint8Array;
};
ue && (ni = function(t, r) {
  if (!Buffer.isBuffer(t))
    return ti(t, r);
  var n = t.readUInt32LE(r);
  return n > 0 ? t.toString("utf8", r + 4, r + 4 + n - 1) : "";
}, ii = function(t, r) {
  if (!Buffer.isBuffer(t))
    return ai(t, r);
  var n = t.readUInt32LE(r);
  return n > 0 ? t.toString("utf8", r + 4, r + 4 + n - 1) : "";
}, fi = function(t, r) {
  if (!Buffer.isBuffer(t))
    return si(t, r);
  var n = 2 * t.readUInt32LE(r);
  return t.toString("utf16le", r + 4, r + 4 + n - 1);
}, oi = function(t, r) {
  if (!Buffer.isBuffer(t))
    return li(t, r);
  var n = t.readUInt32LE(r);
  return t.toString("utf16le", r + 4, r + 4 + n);
}, hi = function(t, r) {
  if (!Buffer.isBuffer(t))
    return ci(t, r);
  var n = t.readUInt32LE(r);
  return t.toString("utf8", r + 4, r + 4 + n);
}, ln = function(t, r) {
  return Buffer.isBuffer(t) ? t.readDoubleLE(r) : ui(t, r);
}, n0 = function(t) {
  return Buffer.isBuffer(t) || Array.isArray(t) || typeof Uint8Array < "u" && t instanceof Uint8Array;
});
var ft = function(e, t) {
  return e[t];
}, Ft = function(e, t) {
  return e[t + 1] * (1 << 8) + e[t];
}, Cl = function(e, t) {
  var r = e[t + 1] * 256 + e[t];
  return r < 32768 ? r : (65535 - r + 1) * -1;
}, ir = function(e, t) {
  return e[t + 3] * (1 << 24) + (e[t + 2] << 16) + (e[t + 1] << 8) + e[t];
}, $r = function(e, t) {
  return e[t + 3] << 24 | e[t + 2] << 16 | e[t + 1] << 8 | e[t];
}, Ol = function(e, t) {
  return e[t] << 24 | e[t + 1] << 16 | e[t + 2] << 8 | e[t + 3];
};
function Ot(e, t) {
  var r = "", n, a, i = [], s, f, o, l;
  switch (t) {
    case "dbcs":
      if (l = this.l, ue && Buffer.isBuffer(this))
        r = this.slice(this.l, this.l + 2 * e).toString("utf16le");
      else
        for (o = 0; o < e; ++o)
          r += String.fromCharCode(Ft(this, l)), l += 2;
      e *= 2;
      break;
    case "utf8":
      r = Wt(this, this.l, this.l + e);
      break;
    case "utf16le":
      e *= 2, r = t0(this, this.l, this.l + e);
      break;
    case "wstr":
      return Ot.call(this, e, "dbcs");
    case "lpstr-ansi":
      r = ni(this, this.l), e = 4 + ir(this, this.l);
      break;
    case "lpstr-cp":
      r = ii(this, this.l), e = 4 + ir(this, this.l);
      break;
    case "lpwstr":
      r = fi(this, this.l), e = 4 + 2 * ir(this, this.l);
      break;
    case "lpp4":
      e = 4 + ir(this, this.l), r = oi(this, this.l), e & 2 && (e += 2);
      break;
    case "8lpp4":
      e = 4 + ir(this, this.l), r = hi(this, this.l), e & 3 && (e += 4 - (e & 3));
      break;
    case "cstr":
      for (e = 0, r = ""; (s = ft(this, this.l + e++)) !== 0; )
        i.push($t(s));
      r = i.join("");
      break;
    case "_wstr":
      for (e = 0, r = ""; (s = Ft(this, this.l + e)) !== 0; )
        i.push($t(s)), e += 2;
      e += 2, r = i.join("");
      break;
    case "dbcs-cont":
      for (r = "", l = this.l, o = 0; o < e; ++o) {
        if (this.lens && this.lens.indexOf(l) !== -1)
          return s = ft(this, l), this.l = l + 1, f = Ot.call(this, e - o, s ? "dbcs-cont" : "sbcs-cont"), i.join("") + f;
        i.push($t(Ft(this, l))), l += 2;
      }
      r = i.join(""), e *= 2;
      break;
    case "cpstr":
    case "sbcs-cont":
      for (r = "", l = this.l, o = 0; o != e; ++o) {
        if (this.lens && this.lens.indexOf(l) !== -1)
          return s = ft(this, l), this.l = l + 1, f = Ot.call(this, e - o, s ? "dbcs-cont" : "sbcs-cont"), i.join("") + f;
        i.push($t(ft(this, l))), l += 1;
      }
      r = i.join("");
      break;
    default:
      switch (e) {
        case 1:
          return n = ft(this, this.l), this.l++, n;
        case 2:
          return n = (t === "i" ? Cl : Ft)(this, this.l), this.l += 2, n;
        case 4:
        case -4:
          return t === "i" || !(this[this.l + 3] & 128) ? (n = (e > 0 ? $r : Ol)(this, this.l), this.l += 4, n) : (a = ir(this, this.l), this.l += 4, a);
        case 8:
        case -8:
          if (t === "f")
            return e == 8 ? a = ln(this, this.l) : a = ln([this[this.l + 7], this[this.l + 6], this[this.l + 5], this[this.l + 4], this[this.l + 3], this[this.l + 2], this[this.l + 1], this[this.l + 0]], 0), this.l += 8, a;
          e = 8;
        case 16:
          r = ri(this, this.l, e);
          break;
      }
  }
  return this.l += e, r;
}
var Dl = function(e, t, r) {
  e[r] = t & 255, e[r + 1] = t >>> 8 & 255, e[r + 2] = t >>> 16 & 255, e[r + 3] = t >>> 24 & 255;
}, Rl = function(e, t, r) {
  e[r] = t & 255, e[r + 1] = t >> 8 & 255, e[r + 2] = t >> 16 & 255, e[r + 3] = t >> 24 & 255;
}, Nl = function(e, t, r) {
  e[r] = t & 255, e[r + 1] = t >>> 8 & 255;
};
function Il(e, t, r) {
  var n = 0, a = 0;
  if (r === "dbcs") {
    for (a = 0; a != t.length; ++a)
      Nl(this, t.charCodeAt(a), this.l + 2 * a);
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
        n = 4, Dl(this, t, this.l);
        break;
      case 8:
        if (n = 8, r === "f") {
          yl(this, t, this.l);
          break;
        }
      case 16:
        break;
      case -4:
        n = 4, Rl(this, t, this.l);
        break;
    }
  return this.l += n, this;
}
function xi(e, t) {
  var r = ri(this, this.l, e.length >> 1);
  if (r !== e)
    throw new Error(t + "Expected " + e + " saw " + r);
  this.l += e.length >> 1;
}
function nr(e, t) {
  e.l = t, e.read_shift = /*::(*/
  Ot, e.chk = xi, e.write_shift = Il;
}
function Er(e, t) {
  e.l += t;
}
function B(e) {
  var t = Kr(e);
  return nr(t, 0), t;
}
function Ze() {
  var e = [], t = ue ? 256 : 2048, r = function(l) {
    var c = B(l);
    return nr(c, 0), c;
  }, n = r(t), a = function() {
    n && (n.length > n.l && (n = n.slice(0, n.l), n.l = n.length), n.length > 0 && e.push(n), n = null);
  }, i = function(l) {
    return n && l < n.length - n.l ? n : (a(), n = r(Math.max(l + 1, t)));
  }, s = function() {
    return a(), He(e);
  }, f = function(l) {
    a(), n = l, n.l == null && (n.l = n.length), i(t);
  };
  return { next: i, push: f, end: s, _bufs: e };
}
function W(e, t, r, n) {
  var a = +t, i;
  if (!isNaN(a)) {
    n || (n = yx[a].p || (r || []).length || 0), i = 1 + (a >= 128 ? 1 : 0) + 1, n >= 128 && ++i, n >= 16384 && ++i, n >= 2097152 && ++i;
    var s = e.next(i);
    a <= 127 ? s.write_shift(1, a) : (s.write_shift(1, (a & 127) + 128), s.write_shift(1, a >> 7));
    for (var f = 0; f != 4; ++f)
      if (n >= 128)
        s.write_shift(1, (n & 127) + 128), n >>= 7;
      else {
        s.write_shift(1, n);
        break;
      }
    /*:: length != null &&*/
    n > 0 && n0(r) && e.push(r);
  }
}
function Dt(e, t, r) {
  var n = er(e);
  if (t.s ? (n.cRel && (n.c += t.s.c), n.rRel && (n.r += t.s.r)) : (n.cRel && (n.c += t.c), n.rRel && (n.r += t.r)), !r || r.biff < 12) {
    for (; n.c >= 256; )
      n.c -= 256;
    for (; n.r >= 65536; )
      n.r -= 65536;
  }
  return n;
}
function aa(e, t, r) {
  var n = er(e);
  return n.s = Dt(n.s, t.s, r), n.e = Dt(n.e, t.s, r), n;
}
function Rt(e, t) {
  if (e.cRel && e.c < 0)
    for (e = er(e); e.c < 0; )
      e.c += t > 8 ? 16384 : 256;
  if (e.rRel && e.r < 0)
    for (e = er(e); e.r < 0; )
      e.r += t > 8 ? 1048576 : t > 5 ? 65536 : 16384;
  var r = me(e);
  return !e.cRel && e.cRel != null && (r = Ll(r)), !e.rRel && e.rRel != null && (r = kl(r)), r;
}
function Ln(e, t) {
  return e.s.r == 0 && !e.s.rRel && e.e.r == (t.biff >= 12 ? 1048575 : t.biff >= 8 ? 65536 : 16384) && !e.e.rRel ? (e.s.cRel ? "" : "$") + $e(e.s.c) + ":" + (e.e.cRel ? "" : "$") + $e(e.e.c) : e.s.c == 0 && !e.s.cRel && e.e.c == (t.biff >= 12 ? 16383 : 255) && !e.e.cRel ? (e.s.rRel ? "" : "$") + Ge(e.s.r) + ":" + (e.e.rRel ? "" : "$") + Ge(e.e.r) : Rt(e.s, t.biff) + ":" + Rt(e.e, t.biff);
}
function a0(e) {
  return parseInt(Pl(e), 10) - 1;
}
function Ge(e) {
  return "" + (e + 1);
}
function kl(e) {
  return e.replace(/([A-Z]|^)(\d+)$/, "$1$$$2");
}
function Pl(e) {
  return e.replace(/\$(\d+)$/, "$1");
}
function i0(e) {
  for (var t = Ml(e), r = 0, n = 0; n !== t.length; ++n)
    r = 26 * r + t.charCodeAt(n) - 64;
  return r - 1;
}
function $e(e) {
  if (e < 0)
    throw new Error("invalid column " + e);
  var t = "";
  for (++e; e; e = Math.floor((e - 1) / 26))
    t = String.fromCharCode((e - 1) % 26 + 65) + t;
  return t;
}
function Ll(e) {
  return e.replace(/^([A-Z])/, "$$$1");
}
function Ml(e) {
  return e.replace(/^\$([A-Z])/, "$1");
}
function Bl(e) {
  return e.replace(/(\$?[A-Z]*)(\$?\d*)/, "$1,$2").split(",");
}
function Me(e) {
  for (var t = 0, r = 0, n = 0; n < e.length; ++n) {
    var a = e.charCodeAt(n);
    a >= 48 && a <= 57 ? t = 10 * t + (a - 48) : a >= 65 && a <= 90 && (r = 26 * r + (a - 64));
  }
  return { c: r - 1, r: t - 1 };
}
function me(e) {
  for (var t = e.c + 1, r = ""; t; t = (t - 1) / 26 | 0)
    r = String.fromCharCode((t - 1) % 26 + 65) + r;
  return r + (e.r + 1);
}
function sr(e) {
  var t = e.indexOf(":");
  return t == -1 ? { s: Me(e), e: Me(e) } : { s: Me(e.slice(0, t)), e: Me(e.slice(t + 1)) };
}
function Ne(e, t) {
  return typeof t > "u" || typeof t == "number" ? Ne(e.s, e.e) : (typeof e != "string" && (e = me(e)), typeof t != "string" && (t = me(t)), e == t ? e : e + ":" + t);
}
function Ee(e) {
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
function ia(e, t) {
  var r = e.t == "d" && t instanceof Date;
  if (e.z != null)
    try {
      return e.w = br(e.z, r ? Qe(t) : t);
    } catch {
    }
  try {
    return e.w = br((e.XF || {}).numFmtId || (r ? 14 : 0), r ? Qe(t) : t);
  } catch {
    return "" + t;
  }
}
function Nr(e, t, r) {
  return e == null || e.t == null || e.t == "z" ? "" : e.w !== void 0 ? e.w : (e.t == "d" && !e.z && r && r.dateNF && (e.z = r.dateNF), e.t == "e" ? Ht[e.v] || e.v : t == null ? ia(e, e.v) : ia(e, t));
}
function Zr(e, t) {
  var r = t && t.sheet ? t.sheet : "Sheet1", n = {};
  return n[r] = e, { SheetNames: [r], Sheets: n };
}
function di(e, t, r) {
  var n = r || {}, a = e ? Array.isArray(e) : n.dense, i = e || (a ? [] : {}), s = 0, f = 0;
  if (i && n.origin != null) {
    if (typeof n.origin == "number")
      s = n.origin;
    else {
      var o = typeof n.origin == "string" ? Me(n.origin) : n.origin;
      s = o.r, f = o.c;
    }
    i["!ref"] || (i["!ref"] = "A1:A1");
  }
  var l = { s: { c: 1e7, r: 1e7 }, e: { c: 0, r: 0 } };
  if (i["!ref"]) {
    var c = Ee(i["!ref"]);
    l.s.c = c.s.c, l.s.r = c.s.r, l.e.c = Math.max(l.e.c, c.e.c), l.e.r = Math.max(l.e.r, c.e.r), s == -1 && (l.e.r = s = c.e.r + 1);
  }
  for (var u = 0; u != t.length; ++u)
    if (t[u]) {
      if (!Array.isArray(t[u]))
        throw new Error("aoa_to_sheet expects an array of arrays");
      for (var h = 0; h != t[u].length; ++h)
        if (!(typeof t[u][h] > "u")) {
          var p = { v: t[u][h] }, _ = s + u, x = f + h;
          if (l.s.r > _ && (l.s.r = _), l.s.c > x && (l.s.c = x), l.e.r < _ && (l.e.r = _), l.e.c < x && (l.e.c = x), t[u][h] && typeof t[u][h] == "object" && !Array.isArray(t[u][h]) && !(t[u][h] instanceof Date))
            p = t[u][h];
          else if (Array.isArray(p.v) && (p.f = t[u][h][1], p.v = p.v[0]), p.v === null)
            if (p.f)
              p.t = "n";
            else if (n.nullError)
              p.t = "e", p.v = 0;
            else if (n.sheetStubs)
              p.t = "z";
            else
              continue;
          else
            typeof p.v == "number" ? p.t = "n" : typeof p.v == "boolean" ? p.t = "b" : p.v instanceof Date ? (p.z = n.dateNF || Ce[14], n.cellDates ? (p.t = "d", p.w = br(p.z, Qe(p.v))) : (p.t = "n", p.v = Qe(p.v), p.w = br(p.z, p.v))) : p.t = "s";
          if (a)
            i[_] || (i[_] = []), i[_][x] && i[_][x].z && (p.z = i[_][x].z), i[_][x] = p;
          else {
            var g = me({ c: x, r: _ });
            i[g] && i[g].z && (p.z = i[g].z), i[g] = p;
          }
        }
    }
  return l.s.c < 1e7 && (i["!ref"] = Ne(l)), i;
}
function vt(e, t) {
  return di(null, e, t);
}
function bl(e) {
  return e.read_shift(4, "i");
}
function mr(e, t) {
  return t || (t = B(4)), t.write_shift(4, e), t;
}
function ze(e) {
  var t = e.read_shift(4);
  return t === 0 ? "" : e.read_shift(t, "dbcs");
}
function Be(e, t) {
  var r = !1;
  return t == null && (r = !0, t = B(4 + 2 * e.length)), t.write_shift(4, e.length), e.length > 0 && t.write_shift(0, e, "dbcs"), r ? t.slice(0, t.l) : t;
}
function Ul(e) {
  return { ich: e.read_shift(2), ifnt: e.read_shift(2) };
}
function Wl(e, t) {
  return t || (t = B(4)), t.write_shift(2, e.ich || 0), t.write_shift(2, e.ifnt || 0), t;
}
function s0(e, t) {
  var r = e.l, n = e.read_shift(1), a = ze(e), i = [], s = { t: a, h: a };
  if (n & 1) {
    for (var f = e.read_shift(4), o = 0; o != f; ++o)
      i.push(Ul(e));
    s.r = i;
  } else
    s.r = [{ ich: 0, ifnt: 0 }];
  return e.l = r + t, s;
}
function Hl(e, t) {
  var r = !1;
  return t == null && (r = !0, t = B(15 + 4 * e.t.length)), t.write_shift(1, 0), Be(e.t, t), r ? t.slice(0, t.l) : t;
}
var Vl = s0;
function Gl(e, t) {
  var r = !1;
  return t == null && (r = !0, t = B(23 + 4 * e.t.length)), t.write_shift(1, 1), Be(e.t, t), t.write_shift(4, 1), Wl({ ich: 0, ifnt: 0 }, t), r ? t.slice(0, t.l) : t;
}
function hr(e) {
  var t = e.read_shift(4), r = e.read_shift(2);
  return r += e.read_shift(1) << 16, e.l++, { c: t, iStyleRef: r };
}
function Qr(e, t) {
  return t == null && (t = B(8)), t.write_shift(-4, e.c), t.write_shift(3, e.iStyleRef || e.s), t.write_shift(1, 0), t;
}
function et(e) {
  var t = e.read_shift(2);
  return t += e.read_shift(1) << 16, e.l++, { c: -1, iStyleRef: t };
}
function rt(e, t) {
  return t == null && (t = B(4)), t.write_shift(3, e.iStyleRef || e.s), t.write_shift(1, 0), t;
}
var Xl = ze, pi = Be;
function f0(e) {
  var t = e.read_shift(4);
  return t === 0 || t === 4294967295 ? "" : e.read_shift(t, "dbcs");
}
function on(e, t) {
  var r = !1;
  return t == null && (r = !0, t = B(127)), t.write_shift(4, e.length > 0 ? e.length : 4294967295), e.length > 0 && t.write_shift(0, e, "dbcs"), r ? t.slice(0, t.l) : t;
}
var jl = ze, Xn = f0, l0 = on;
function vi(e) {
  var t = e.slice(e.l, e.l + 4), r = t[0] & 1, n = t[0] & 2;
  e.l += 4;
  var a = n === 0 ? ln([0, 0, 0, 0, t[0] & 252, t[1], t[2], t[3]], 0) : $r(t, 0) >> 2;
  return r ? a / 100 : a;
}
function mi(e, t) {
  t == null && (t = B(4));
  var r = 0, n = 0, a = e * 100;
  if (e == (e | 0) && e >= -(1 << 29) && e < 1 << 29 ? n = 1 : a == (a | 0) && a >= -(1 << 29) && a < 1 << 29 && (n = 1, r = 1), n)
    t.write_shift(-4, ((r ? a : e) << 2) + (r + 2));
  else
    throw new Error("unsupported RkNumber " + e);
}
function gi(e) {
  var t = { s: {}, e: {} };
  return t.s.r = e.read_shift(4), t.e.r = e.read_shift(4), t.s.c = e.read_shift(4), t.e.c = e.read_shift(4), t;
}
function $l(e, t) {
  return t || (t = B(16)), t.write_shift(4, e.s.r), t.write_shift(4, e.e.r), t.write_shift(4, e.s.c), t.write_shift(4, e.e.c), t;
}
var tt = gi, mt = $l;
function gt(e) {
  if (e.length - e.l < 8)
    throw "XLS Xnum Buffer underflow";
  return e.read_shift(8, "f");
}
function Yr(e, t) {
  return (t || B(8)).write_shift(8, e, "f");
}
function zl(e) {
  var t = {}, r = e.read_shift(1), n = r >>> 1, a = e.read_shift(1), i = e.read_shift(2, "i"), s = e.read_shift(1), f = e.read_shift(1), o = e.read_shift(1);
  switch (e.l++, n) {
    case 0:
      t.auto = 1;
      break;
    case 1:
      t.index = a;
      var l = to[a];
      l && (t.rgb = va(l));
      break;
    case 2:
      t.rgb = va([s, f, o]);
      break;
    case 3:
      t.theme = a;
      break;
  }
  return i != 0 && (t.tint = i > 0 ? i / 32767 : i / 32768), t;
}
function cn(e, t) {
  if (t || (t = B(8)), !e || e.auto)
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
function Kl(e) {
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
function Yl(e, t) {
  t || (t = B(2));
  var r = (e.italic ? 2 : 0) | (e.strike ? 8 : 0) | (e.outline ? 16 : 0) | (e.shadow ? 32 : 0) | (e.condense ? 64 : 0) | (e.extend ? 128 : 0);
  return t.write_shift(1, r), t.write_shift(1, 0), t;
}
var _i = 2, tr = 3, Jt = 11, hn = 19, qt = 64, Jl = 65, ql = 71, Zl = 4108, Ql = 4126, We = 80, sa = {
  /*::[*/
  1: { n: "CodePage", t: _i },
  /*::[*/
  2: { n: "Category", t: We },
  /*::[*/
  3: { n: "PresentationFormat", t: We },
  /*::[*/
  4: { n: "ByteCount", t: tr },
  /*::[*/
  5: { n: "LineCount", t: tr },
  /*::[*/
  6: { n: "ParagraphCount", t: tr },
  /*::[*/
  7: { n: "SlideCount", t: tr },
  /*::[*/
  8: { n: "NoteCount", t: tr },
  /*::[*/
  9: { n: "HiddenCount", t: tr },
  /*::[*/
  10: { n: "MultimediaClipCount", t: tr },
  /*::[*/
  11: { n: "ScaleCrop", t: Jt },
  /*::[*/
  12: {
    n: "HeadingPairs",
    t: Zl
    /* VT_VECTOR | VT_VARIANT */
  },
  /*::[*/
  13: {
    n: "TitlesOfParts",
    t: Ql
    /* VT_VECTOR | VT_LPSTR */
  },
  /*::[*/
  14: { n: "Manager", t: We },
  /*::[*/
  15: { n: "Company", t: We },
  /*::[*/
  16: { n: "LinksUpToDate", t: Jt },
  /*::[*/
  17: { n: "CharacterCount", t: tr },
  /*::[*/
  19: { n: "SharedDoc", t: Jt },
  /*::[*/
  22: { n: "HyperlinksChanged", t: Jt },
  /*::[*/
  23: { n: "AppVersion", t: tr, p: "version" },
  /*::[*/
  24: { n: "DigSig", t: Jl },
  /*::[*/
  26: { n: "ContentType", t: We },
  /*::[*/
  27: { n: "ContentStatus", t: We },
  /*::[*/
  28: { n: "Language", t: We },
  /*::[*/
  29: { n: "Version", t: We },
  /*::[*/
  255: {},
  /* [MS-OLEPS] 2.18 */
  /*::[*/
  2147483648: { n: "Locale", t: hn },
  /*::[*/
  2147483651: { n: "Behavior", t: hn },
  /*::[*/
  1919054434: {}
}, fa = {
  /*::[*/
  1: { n: "CodePage", t: _i },
  /*::[*/
  2: { n: "Title", t: We },
  /*::[*/
  3: { n: "Subject", t: We },
  /*::[*/
  4: { n: "Author", t: We },
  /*::[*/
  5: { n: "Keywords", t: We },
  /*::[*/
  6: { n: "Comments", t: We },
  /*::[*/
  7: { n: "Template", t: We },
  /*::[*/
  8: { n: "LastAuthor", t: We },
  /*::[*/
  9: { n: "RevNumber", t: We },
  /*::[*/
  10: { n: "EditTime", t: qt },
  /*::[*/
  11: { n: "LastPrinted", t: qt },
  /*::[*/
  12: { n: "CreatedDate", t: qt },
  /*::[*/
  13: { n: "ModifiedDate", t: qt },
  /*::[*/
  14: { n: "PageCount", t: tr },
  /*::[*/
  15: { n: "WordCount", t: tr },
  /*::[*/
  16: { n: "CharCount", t: tr },
  /*::[*/
  17: { n: "Thumbnail", t: ql },
  /*::[*/
  18: { n: "Application", t: We },
  /*::[*/
  19: { n: "DocSecurity", t: tr },
  /*::[*/
  255: {},
  /* [MS-OLEPS] 2.18 */
  /*::[*/
  2147483648: { n: "Locale", t: hn },
  /*::[*/
  2147483651: { n: "Behavior", t: hn },
  /*::[*/
  1919054434: {}
};
function eo(e) {
  return e.map(function(t) {
    return [t >> 16 & 255, t >> 8 & 255, t & 255];
  });
}
var ro = /* @__PURE__ */ eo([
  /* Color Constants */
  0,
  16777215,
  16711680,
  65280,
  255,
  16776960,
  16711935,
  65535,
  /* Overridable Defaults */
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
  /* Other entries to appease BIFF8/12 */
  16777215,
  /* 0x40 icvForeground ?? */
  0,
  /* 0x41 icvBackground ?? */
  0,
  /* 0x42 icvFrame ?? */
  0,
  /* 0x43 icv3D ?? */
  0,
  /* 0x44 icv3DText ?? */
  0,
  /* 0x45 icv3DHilite ?? */
  0,
  /* 0x46 icv3DShadow ?? */
  0,
  /* 0x47 icvHilite ?? */
  0,
  /* 0x48 icvCtlText ?? */
  0,
  /* 0x49 icvCtlScrl ?? */
  0,
  /* 0x4A icvCtlInv ?? */
  0,
  /* 0x4B icvCtlBody ?? */
  0,
  /* 0x4C icvCtlFrame ?? */
  0,
  /* 0x4D icvCtlFore ?? */
  0,
  /* 0x4E icvCtlBack ?? */
  0,
  /* 0x4F icvCtlNeutral */
  0,
  /* 0x50 icvInfoBk ?? */
  0
  /* 0x51 icvInfoText ?? */
]), to = /* @__PURE__ */ er(ro), Ht = {
  /*::[*/
  0: "#NULL!",
  /*::[*/
  7: "#DIV/0!",
  /*::[*/
  15: "#VALUE!",
  /*::[*/
  23: "#REF!",
  /*::[*/
  29: "#NAME?",
  /*::[*/
  36: "#NUM!",
  /*::[*/
  42: "#N/A",
  /*::[*/
  43: "#GETTING_DATA",
  /*::[*/
  255: "#WTF?"
}, no = {
  /* Workbook */
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml": "workbooks",
  "application/vnd.ms-excel.sheet.macroEnabled.main+xml": "workbooks",
  "application/vnd.ms-excel.sheet.binary.macroEnabled.main": "workbooks",
  "application/vnd.ms-excel.addin.macroEnabled.main+xml": "workbooks",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.template.main+xml": "workbooks",
  /* Worksheet */
  "application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml": "sheets",
  "application/vnd.ms-excel.worksheet": "sheets",
  "application/vnd.ms-excel.binIndexWs": "TODO",
  /* Binary Index */
  /* Chartsheet */
  "application/vnd.openxmlformats-officedocument.spreadsheetml.chartsheet+xml": "charts",
  "application/vnd.ms-excel.chartsheet": "charts",
  /* Macrosheet */
  "application/vnd.ms-excel.macrosheet+xml": "macros",
  "application/vnd.ms-excel.macrosheet": "macros",
  "application/vnd.ms-excel.intlmacrosheet": "TODO",
  "application/vnd.ms-excel.binIndexMs": "TODO",
  /* Binary Index */
  /* Dialogsheet */
  "application/vnd.openxmlformats-officedocument.spreadsheetml.dialogsheet+xml": "dialogs",
  "application/vnd.ms-excel.dialogsheet": "dialogs",
  /* Shared Strings */
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml": "strs",
  "application/vnd.ms-excel.sharedStrings": "strs",
  /* Styles */
  "application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml": "styles",
  "application/vnd.ms-excel.styles": "styles",
  /* File Properties */
  "application/vnd.openxmlformats-package.core-properties+xml": "coreprops",
  "application/vnd.openxmlformats-officedocument.custom-properties+xml": "custprops",
  "application/vnd.openxmlformats-officedocument.extended-properties+xml": "extprops",
  /* Custom Data Properties */
  "application/vnd.openxmlformats-officedocument.customXmlProperties+xml": "TODO",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.customProperty": "TODO",
  /* Comments */
  "application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml": "comments",
  "application/vnd.ms-excel.comments": "comments",
  "application/vnd.ms-excel.threadedcomments+xml": "threadedcomments",
  "application/vnd.ms-excel.person+xml": "people",
  /* Metadata (Stock/Geography and Dynamic Array) */
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheetMetadata+xml": "metadata",
  "application/vnd.ms-excel.sheetMetadata": "metadata",
  /* PivotTable */
  "application/vnd.ms-excel.pivotTable": "TODO",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotTable+xml": "TODO",
  /* Chart Objects */
  "application/vnd.openxmlformats-officedocument.drawingml.chart+xml": "TODO",
  /* Chart Colors */
  "application/vnd.ms-office.chartcolorstyle+xml": "TODO",
  /* Chart Style */
  "application/vnd.ms-office.chartstyle+xml": "TODO",
  /* Chart Advanced */
  "application/vnd.ms-office.chartex+xml": "TODO",
  /* Calculation Chain */
  "application/vnd.ms-excel.calcChain": "calcchains",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.calcChain+xml": "calcchains",
  /* Printer Settings */
  "application/vnd.openxmlformats-officedocument.spreadsheetml.printerSettings": "TODO",
  /* ActiveX */
  "application/vnd.ms-office.activeX": "TODO",
  "application/vnd.ms-office.activeX+xml": "TODO",
  /* Custom Toolbars */
  "application/vnd.ms-excel.attachedToolbars": "TODO",
  /* External Data Connections */
  "application/vnd.ms-excel.connections": "TODO",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.connections+xml": "TODO",
  /* External Links */
  "application/vnd.ms-excel.externalLink": "links",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.externalLink+xml": "links",
  /* PivotCache */
  "application/vnd.ms-excel.pivotCacheDefinition": "TODO",
  "application/vnd.ms-excel.pivotCacheRecords": "TODO",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotCacheDefinition+xml": "TODO",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotCacheRecords+xml": "TODO",
  /* Query Table */
  "application/vnd.ms-excel.queryTable": "TODO",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.queryTable+xml": "TODO",
  /* Shared Workbook */
  "application/vnd.ms-excel.userNames": "TODO",
  "application/vnd.ms-excel.revisionHeaders": "TODO",
  "application/vnd.ms-excel.revisionLog": "TODO",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionHeaders+xml": "TODO",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionLog+xml": "TODO",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.userNames+xml": "TODO",
  /* Single Cell Table */
  "application/vnd.ms-excel.tableSingleCells": "TODO",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.tableSingleCells+xml": "TODO",
  /* Slicer */
  "application/vnd.ms-excel.slicer": "TODO",
  "application/vnd.ms-excel.slicerCache": "TODO",
  "application/vnd.ms-excel.slicer+xml": "TODO",
  "application/vnd.ms-excel.slicerCache+xml": "TODO",
  /* Sort Map */
  "application/vnd.ms-excel.wsSortMap": "TODO",
  /* Table */
  "application/vnd.ms-excel.table": "TODO",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml": "TODO",
  /* Themes */
  "application/vnd.openxmlformats-officedocument.theme+xml": "themes",
  /* Theme Override */
  "application/vnd.openxmlformats-officedocument.themeOverride+xml": "TODO",
  /* Timeline */
  "application/vnd.ms-excel.Timeline+xml": "TODO",
  /* verify */
  "application/vnd.ms-excel.TimelineCache+xml": "TODO",
  /* verify */
  /* VBA */
  "application/vnd.ms-office.vbaProject": "vba",
  "application/vnd.ms-office.vbaProjectSignature": "TODO",
  /* Volatile Dependencies */
  "application/vnd.ms-office.volatileDependencies": "TODO",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.volatileDependencies+xml": "TODO",
  /* Control Properties */
  "application/vnd.ms-excel.controlproperties+xml": "TODO",
  /* Data Model */
  "application/vnd.openxmlformats-officedocument.model+data": "TODO",
  /* Survey */
  "application/vnd.ms-excel.Survey+xml": "TODO",
  /* Drawing */
  "application/vnd.openxmlformats-officedocument.drawing+xml": "drawings",
  "application/vnd.openxmlformats-officedocument.drawingml.chartshapes+xml": "TODO",
  "application/vnd.openxmlformats-officedocument.drawingml.diagramColors+xml": "TODO",
  "application/vnd.openxmlformats-officedocument.drawingml.diagramData+xml": "TODO",
  "application/vnd.openxmlformats-officedocument.drawingml.diagramLayout+xml": "TODO",
  "application/vnd.openxmlformats-officedocument.drawingml.diagramStyle+xml": "TODO",
  /* VML */
  "application/vnd.openxmlformats-officedocument.vmlDrawing": "TODO",
  "application/vnd.openxmlformats-package.relationships+xml": "rels",
  "application/vnd.openxmlformats-officedocument.oleObject": "TODO",
  /* Image */
  "image/png": "TODO",
  sheet: "js"
}, Zt = {
  workbooks: {
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml",
    xlsm: "application/vnd.ms-excel.sheet.macroEnabled.main+xml",
    xlsb: "application/vnd.ms-excel.sheet.binary.macroEnabled.main",
    xlam: "application/vnd.ms-excel.addin.macroEnabled.main+xml",
    xltx: "application/vnd.openxmlformats-officedocument.spreadsheetml.template.main+xml"
  },
  strs: {
    /* Shared Strings */
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml",
    xlsb: "application/vnd.ms-excel.sharedStrings"
  },
  comments: {
    /* Comments */
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml",
    xlsb: "application/vnd.ms-excel.comments"
  },
  sheets: {
    /* Worksheet */
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml",
    xlsb: "application/vnd.ms-excel.worksheet"
  },
  charts: {
    /* Chartsheet */
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.chartsheet+xml",
    xlsb: "application/vnd.ms-excel.chartsheet"
  },
  dialogs: {
    /* Dialogsheet */
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.dialogsheet+xml",
    xlsb: "application/vnd.ms-excel.dialogsheet"
  },
  macros: {
    /* Macrosheet (Excel 4.0 Macros) */
    xlsx: "application/vnd.ms-excel.macrosheet+xml",
    xlsb: "application/vnd.ms-excel.macrosheet"
  },
  metadata: {
    /* Metadata (Stock/Geography and Dynamic Array) */
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheetMetadata+xml",
    xlsb: "application/vnd.ms-excel.sheetMetadata"
  },
  styles: {
    /* Styles */
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml",
    xlsb: "application/vnd.ms-excel.styles"
  }
};
function Ti() {
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
function Ei(e, t) {
  var r = xl(no), n = [], a;
  n[n.length] = Ie, n[n.length] = Y("Types", null, {
    xmlns: Le.CT,
    "xmlns:xsd": Le.xsd,
    "xmlns:xsi": Le.xsi
  }), n = n.concat([
    ["xml", "application/xml"],
    ["bin", "application/vnd.ms-excel.sheet.binary.macroEnabled.main"],
    ["vml", "application/vnd.openxmlformats-officedocument.vmlDrawing"],
    ["data", "application/vnd.openxmlformats-officedocument.model+data"],
    /* from test files */
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
  ].map(function(o) {
    return Y("Default", null, { Extension: o[0], ContentType: o[1] });
  }));
  var i = function(o) {
    e[o] && e[o].length > 0 && (a = e[o][0], n[n.length] = Y("Override", null, {
      PartName: (a[0] == "/" ? "" : "/") + a,
      ContentType: Zt[o][t.bookType] || Zt[o].xlsx
    }));
  }, s = function(o) {
    (e[o] || []).forEach(function(l) {
      n[n.length] = Y("Override", null, {
        PartName: (l[0] == "/" ? "" : "/") + l,
        ContentType: Zt[o][t.bookType] || Zt[o].xlsx
      });
    });
  }, f = function(o) {
    (e[o] || []).forEach(function(l) {
      n[n.length] = Y("Override", null, {
        PartName: (l[0] == "/" ? "" : "/") + l,
        ContentType: r[o][0]
      });
    });
  };
  return i("workbooks"), s("sheets"), s("charts"), f("themes"), ["strs", "styles"].forEach(i), ["coreprops", "extprops", "custprops"].forEach(f), f("vba"), f("comments"), f("threadedcomments"), f("drawings"), s("metadata"), f("people"), n.length > 2 && (n[n.length] = "</Types>", n[1] = n[1].replace("/>", ">")), n.join("");
}
var he = {
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
function wi(e) {
  var t = e.lastIndexOf("/");
  return e.slice(0, t + 1) + "_rels/" + e.slice(t + 1) + ".rels";
}
function ct(e) {
  var t = [Ie, Y("Relationships", null, {
    //'xmlns:ns0': XMLNS.RELS,
    xmlns: Le.RELS
  })];
  return Xe(e["!id"]).forEach(function(r) {
    t[t.length] = Y("Relationship", null, e["!id"][r]);
  }), t.length > 2 && (t[t.length] = "</Relationships>", t[1] = t[1].replace("/>", ">")), t.join("");
}
function pe(e, t, r, n, a, i) {
  if (a || (a = {}), e["!id"] || (e["!id"] = {}), e["!idx"] || (e["!idx"] = 1), t < 0)
    for (t = e["!idx"]; e["!id"]["rId" + t]; ++t)
      ;
  if (e["!idx"] = t + 1, a.Id = "rId" + t, a.Type = n, a.Target = r, i ? a.TargetMode = i : [he.HLINK, he.XPATH, he.XMISS].indexOf(a.Type) > -1 && (a.TargetMode = "External"), e["!id"][a.Id])
    throw new Error("Cannot rewrite rId " + t);
  return e["!id"][a.Id] = a, e[("/" + a.Target).replace("//", "/")] = a, t;
}
function ao(e) {
  var t = [Ie];
  t.push(`<manifest:manifest xmlns:manifest="urn:oasis:names:tc:opendocument:xmlns:manifest:1.0" manifest:version="1.2">
`), t.push(`  <manifest:file-entry manifest:full-path="/" manifest:version="1.2" manifest:media-type="application/vnd.oasis.opendocument.spreadsheet"/>
`);
  for (var r = 0; r < e.length; ++r)
    t.push('  <manifest:file-entry manifest:full-path="' + e[r][0] + '" manifest:media-type="' + e[r][1] + `"/>
`);
  return t.push("</manifest:manifest>"), t.join("");
}
function la(e, t, r) {
  return [
    '  <rdf:Description rdf:about="' + e + `">
`,
    '    <rdf:type rdf:resource="http://docs.oasis-open.org/ns/office/1.2/meta/' + (r || "odf") + "#" + t + `"/>
`,
    `  </rdf:Description>
`
  ].join("");
}
function io(e, t) {
  return [
    '  <rdf:Description rdf:about="' + e + `">
`,
    '    <ns0:hasPart xmlns:ns0="http://docs.oasis-open.org/ns/office/1.2/meta/pkg#" rdf:resource="' + t + `"/>
`,
    `  </rdf:Description>
`
  ].join("");
}
function so(e) {
  var t = [Ie];
  t.push(`<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
`);
  for (var r = 0; r != e.length; ++r)
    t.push(la(e[r][0], e[r][1])), t.push(io("", e[r][0]));
  return t.push(la("", "Document", "pkg")), t.push("</rdf:RDF>"), t.join("");
}
function Si() {
  return '<office:document-meta xmlns:office="urn:oasis:names:tc:opendocument:xmlns:office:1.0" xmlns:meta="urn:oasis:names:tc:opendocument:xmlns:meta:1.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:xlink="http://www.w3.org/1999/xlink" office:version="1.2"><office:meta><meta:generator>SheetJS ' + tn.version + "</meta:generator></office:meta></office:document-meta>";
}
var zr = [
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
function Mn(e, t, r, n, a) {
  a[e] != null || t == null || t === "" || (a[e] = t, t = ve(t), n[n.length] = r ? Y(e, t, r) : Ve(e, t));
}
function Ai(e, t) {
  var r = t || {}, n = [Ie, Y("cp:coreProperties", null, {
    //'xmlns': XMLNS.CORE_PROPS,
    "xmlns:cp": Le.CORE_PROPS,
    "xmlns:dc": Le.dc,
    "xmlns:dcterms": Le.dcterms,
    "xmlns:dcmitype": Le.dcmitype,
    "xmlns:xsi": Le.xsi
  })], a = {};
  if (!e && !r.Props)
    return n.join("");
  e && (e.CreatedDate != null && Mn("dcterms:created", typeof e.CreatedDate == "string" ? e.CreatedDate : Gn(e.CreatedDate, r.WTF), { "xsi:type": "dcterms:W3CDTF" }, n, a), e.ModifiedDate != null && Mn("dcterms:modified", typeof e.ModifiedDate == "string" ? e.ModifiedDate : Gn(e.ModifiedDate, r.WTF), { "xsi:type": "dcterms:W3CDTF" }, n, a));
  for (var i = 0; i != zr.length; ++i) {
    var s = zr[i], f = r.Props && r.Props[s[1]] != null ? r.Props[s[1]] : e ? e[s[1]] : null;
    f === !0 ? f = "1" : f === !1 ? f = "0" : typeof f == "number" && (f = String(f)), f != null && Mn(s[0], f, null, n, a);
  }
  return n.length > 2 && (n[n.length] = "</cp:coreProperties>", n[1] = n[1].replace("/>", ">")), n.join("");
}
var ht = [
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
], Fi = [
  "Worksheets",
  "SheetNames",
  "NamedRanges",
  "DefinedNames",
  "Chartsheets",
  "ChartNames"
];
function yi(e) {
  var t = [], r = Y;
  return e || (e = {}), e.Application = "SheetJS", t[t.length] = Ie, t[t.length] = Y("Properties", null, {
    xmlns: Le.EXT_PROPS,
    "xmlns:vt": Le.vt
  }), ht.forEach(function(n) {
    if (e[n[1]] !== void 0) {
      var a;
      switch (n[2]) {
        case "string":
          a = ve(String(e[n[1]]));
          break;
        case "bool":
          a = e[n[1]] ? "true" : "false";
          break;
      }
      a !== void 0 && (t[t.length] = r(n[0], a));
    }
  }), t[t.length] = r("HeadingPairs", r("vt:vector", r("vt:variant", "<vt:lpstr>Worksheets</vt:lpstr>") + r("vt:variant", r("vt:i4", String(e.Worksheets))), { size: 2, baseType: "variant" })), t[t.length] = r("TitlesOfParts", r("vt:vector", e.SheetNames.map(function(n) {
    return "<vt:lpstr>" + ve(n) + "</vt:lpstr>";
  }).join(""), { size: e.Worksheets, baseType: "lpstr" })), t.length > 2 && (t[t.length] = "</Properties>", t[1] = t[1].replace("/>", ">")), t.join("");
}
function Ci(e) {
  var t = [Ie, Y("Properties", null, {
    xmlns: Le.CUST_PROPS,
    "xmlns:vt": Le.vt
  })];
  if (!e)
    return t.join("");
  var r = 1;
  return Xe(e).forEach(function(a) {
    ++r, t[t.length] = Y("property", Al(e[a], !0), {
      fmtid: "{D5CDD505-2E9C-101B-9397-08002B2CF9AE}",
      pid: r,
      name: ve(a)
    });
  }), t.length > 2 && (t[t.length] = "</Properties>", t[1] = t[1].replace("/>", ">")), t.join("");
}
var oa = {
  Title: "Title",
  Subject: "Subject",
  Author: "Author",
  Keywords: "Keywords",
  Comments: "Description",
  LastAuthor: "LastAuthor",
  RevNumber: "Revision",
  Application: "AppName",
  /* TotalTime: 'TotalTime', */
  LastPrinted: "LastPrinted",
  CreatedDate: "Created",
  ModifiedDate: "LastSaved",
  /* Pages */
  /* Words */
  /* Characters */
  Category: "Category",
  /* PresentationFormat */
  Manager: "Manager",
  Company: "Company",
  /* Guid */
  /* HyperlinkBase */
  /* Bytes */
  /* Lines */
  /* Paragraphs */
  /* CharactersWithSpaces */
  AppVersion: "Version",
  ContentStatus: "ContentStatus",
  /* NOTE: missing from schema */
  Identifier: "Identifier",
  /* NOTE: missing from schema */
  Language: "Language"
  /* NOTE: missing from schema */
};
function fo(e, t) {
  var r = [];
  return Xe(oa).map(function(n) {
    for (var a = 0; a < zr.length; ++a)
      if (zr[a][1] == n)
        return zr[a];
    for (a = 0; a < ht.length; ++a)
      if (ht[a][1] == n)
        return ht[a];
    throw n;
  }).forEach(function(n) {
    if (e[n[1]] != null) {
      var a = t && t.Props && t.Props[n[1]] != null ? t.Props[n[1]] : e[n[1]];
      switch (n[2]) {
        case "date":
          a = new Date(a).toISOString().replace(/\.\d*Z/, "Z");
          break;
      }
      typeof a == "number" ? a = String(a) : a === !0 || a === !1 ? a = a ? "1" : "0" : a instanceof Date && (a = new Date(a).toISOString().replace(/\.\d*Z/, "")), r.push(Ve(oa[n[1]] || n[1], a));
    }
  }), Y("DocumentProperties", r.join(""), { xmlns: ar.o });
}
function lo(e, t) {
  var r = ["Worksheets", "SheetNames"], n = "CustomDocumentProperties", a = [];
  return e && Xe(e).forEach(function(i) {
    if (Object.prototype.hasOwnProperty.call(e, i)) {
      for (var s = 0; s < zr.length; ++s)
        if (i == zr[s][1])
          return;
      for (s = 0; s < ht.length; ++s)
        if (i == ht[s][1])
          return;
      for (s = 0; s < r.length; ++s)
        if (i == r[s])
          return;
      var f = e[i], o = "string";
      typeof f == "number" ? (o = "float", f = String(f)) : f === !0 || f === !1 ? (o = "boolean", f = f ? "1" : "0") : f = String(f), a.push(Y(J0(i), f, { "dt:dt": o }));
    }
  }), t && Xe(t).forEach(function(i) {
    if (Object.prototype.hasOwnProperty.call(t, i) && !(e && Object.prototype.hasOwnProperty.call(e, i))) {
      var s = t[i], f = "string";
      typeof s == "number" ? (f = "float", s = String(s)) : s === !0 || s === !1 ? (f = "boolean", s = s ? "1" : "0") : s instanceof Date ? (f = "dateTime.tz", s = s.toISOString()) : s = String(s), a.push(Y(J0(i), s, { "dt:dt": f }));
    }
  }), "<" + n + ' xmlns="' + ar.o + '">' + a.join("") + "</" + n + ">";
}
function oo(e) {
  var t = typeof e == "string" ? new Date(Date.parse(e)) : e, r = t.getTime() / 1e3 + 11644473600, n = r % Math.pow(2, 32), a = (r - n) / Math.pow(2, 32);
  n *= 1e7, a *= 1e7;
  var i = n / Math.pow(2, 32) | 0;
  i > 0 && (n = n % Math.pow(2, 32), a += i);
  var s = B(8);
  return s.write_shift(4, n), s.write_shift(4, a), s;
}
function ca(e, t) {
  var r = B(4), n = B(4);
  switch (r.write_shift(4, e == 80 ? 31 : e), e) {
    case 3:
      n.write_shift(-4, t);
      break;
    case 5:
      n = B(8), n.write_shift(8, t, "f");
      break;
    case 11:
      n.write_shift(4, t ? 1 : 0);
      break;
    case 64:
      n = oo(t);
      break;
    case 31:
    case 80:
      for (n = B(4 + 2 * (t.length + 1) + (t.length % 2 ? 0 : 2)), n.write_shift(4, t.length + 1), n.write_shift(0, t, "dbcs"); n.l != n.length; )
        n.write_shift(1, 0);
      break;
    default:
      throw new Error("TypedPropertyValue unrecognized type " + e + " " + t);
  }
  return He([r, n]);
}
var Oi = ["CodePage", "Thumbnail", "_PID_LINKBASE", "_PID_HLINKS", "SystemIdentifier", "FMTID"];
function co(e) {
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
function ha(e, t, r) {
  var n = B(8), a = [], i = [], s = 8, f = 0, o = B(8), l = B(8);
  if (o.write_shift(4, 2), o.write_shift(4, 1200), l.write_shift(4, 1), i.push(o), a.push(l), s += 8 + o.length, !t) {
    l = B(8), l.write_shift(4, 0), a.unshift(l);
    var c = [B(4)];
    for (c[0].write_shift(4, e.length), f = 0; f < e.length; ++f) {
      var u = e[f][0];
      for (o = B(4 + 4 + 2 * (u.length + 1) + (u.length % 2 ? 0 : 2)), o.write_shift(4, f + 2), o.write_shift(4, u.length + 1), o.write_shift(0, u, "dbcs"); o.l != o.length; )
        o.write_shift(1, 0);
      c.push(o);
    }
    o = He(c), i.unshift(o), s += 8 + o.length;
  }
  for (f = 0; f < e.length; ++f)
    if (!(t && !t[e[f][0]]) && !(Oi.indexOf(e[f][0]) > -1 || Fi.indexOf(e[f][0]) > -1) && e[f][1] != null) {
      var h = e[f][1], p = 0;
      if (t) {
        p = +t[e[f][0]];
        var _ = r[p];
        if (_.p == "version" && typeof h == "string") {
          var x = h.split(".");
          h = (+x[0] << 16) + (+x[1] || 0);
        }
        o = ca(_.t, h);
      } else {
        var g = co(h);
        g == -1 && (g = 31, h = String(h)), o = ca(g, h);
      }
      i.push(o), l = B(8), l.write_shift(4, t ? p : 2 + f), a.push(l), s += 8 + o.length;
    }
  var C = 8 * (i.length + 1);
  for (f = 0; f < i.length; ++f)
    a[f].write_shift(4, C), C += i[f].length;
  return n.write_shift(4, s), n.write_shift(4, i.length), He([n].concat(a).concat(i));
}
function ua(e, t, r, n, a, i) {
  var s = B(a ? 68 : 48), f = [s];
  s.write_shift(2, 65534), s.write_shift(2, 0), s.write_shift(4, 842412599), s.write_shift(16, _e.utils.consts.HEADER_CLSID, "hex"), s.write_shift(4, a ? 2 : 1), s.write_shift(16, t, "hex"), s.write_shift(4, a ? 68 : 48);
  var o = ha(e, r, n);
  if (f.push(o), a) {
    var l = ha(a, null, null);
    s.write_shift(16, i, "hex"), s.write_shift(4, 68 + o.length), f.push(l);
  }
  return He(f);
}
function ho(e, t) {
  t || (t = B(e));
  for (var r = 0; r < e; ++r)
    t.write_shift(1, 0);
  return t;
}
function uo(e, t) {
  return e.read_shift(t) === 1;
}
function Je(e, t) {
  return t || (t = B(2)), t.write_shift(2, +!!e), t;
}
function Di(e) {
  return e.read_shift(2, "u");
}
function cr(e, t) {
  return t || (t = B(2)), t.write_shift(2, e), t;
}
function Ri(e, t, r) {
  return r || (r = B(2)), r.write_shift(1, t == "e" ? +e : +!!e), r.write_shift(1, t == "e" ? 1 : 0), r;
}
function Ni(e, t, r) {
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
function xo(e) {
  var t = e.t || "", r = B(3 + 0);
  r.write_shift(2, t.length), r.write_shift(1, 1);
  var n = B(2 * t.length);
  n.write_shift(2 * t.length, t, "utf16le");
  var a = [r, n];
  return He(a);
}
function po(e, t, r) {
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
function vo(e, t, r) {
  var n = e.read_shift(r && r.biff == 2 ? 1 : 2);
  return n === 0 ? (e.l++, "") : po(e, n, r);
}
function mo(e, t, r) {
  if (r.biff > 5)
    return vo(e, t, r);
  var n = e.read_shift(1);
  return n === 0 ? (e.l++, "") : e.read_shift(n, r.biff <= 4 || !e.lens ? "cpstr" : "sbcs-cont");
}
function Ii(e, t, r) {
  return r || (r = B(3 + 2 * e.length)), r.write_shift(2, e.length), r.write_shift(1, 1), r.write_shift(31, e, "utf16le"), r;
}
function xa(e, t) {
  t || (t = B(6 + e.length * 2)), t.write_shift(4, 1 + e.length);
  for (var r = 0; r < e.length; ++r)
    t.write_shift(2, e.charCodeAt(r));
  return t.write_shift(2, 0), t;
}
function go(e) {
  var t = B(512), r = 0, n = e.Target;
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
    n = n.slice(1), xa(n, t);
  else if (i & 2) {
    for (s = "e0 c9 ea 79 f9 ba ce 11 8c 82 00 aa 00 4b a9 0b".split(" "), r = 0; r < s.length; ++r)
      t.write_shift(1, parseInt(s[r], 16));
    var f = a > -1 ? n.slice(0, a) : n;
    for (t.write_shift(4, 2 * (f.length + 1)), r = 0; r < f.length; ++r)
      t.write_shift(2, f.charCodeAt(r));
    t.write_shift(2, 0), i & 8 && xa(a > -1 ? n.slice(a + 1) : "", t);
  } else {
    for (s = "03 03 00 00 00 00 00 00 c0 00 00 00 00 00 00 46".split(" "), r = 0; r < s.length; ++r)
      t.write_shift(1, parseInt(s[r], 16));
    for (var o = 0; n.slice(o * 3, o * 3 + 3) == "../" || n.slice(o * 3, o * 3 + 3) == "..\\"; )
      ++o;
    for (t.write_shift(2, o), t.write_shift(4, n.length - 3 * o + 1), r = 0; r < n.length - 3 * o; ++r)
      t.write_shift(1, n.charCodeAt(r + 3 * o) & 255);
    for (t.write_shift(1, 0), t.write_shift(2, 65535), t.write_shift(2, 57005), r = 0; r < 6; ++r)
      t.write_shift(4, 0);
  }
  return t.slice(0, t.l);
}
function Jr(e, t, r, n) {
  return n || (n = B(6)), n.write_shift(2, e), n.write_shift(2, t), n.write_shift(2, r || 0), n;
}
function _o(e, t, r) {
  var n = r.biff > 8 ? 4 : 2, a = e.read_shift(n), i = e.read_shift(n, "i"), s = e.read_shift(n, "i");
  return [a, i, s];
}
function To(e) {
  var t = e.read_shift(2), r = e.read_shift(2), n = e.read_shift(2), a = e.read_shift(2);
  return { s: { c: n, r: t }, e: { c: a, r } };
}
function ki(e, t) {
  return t || (t = B(8)), t.write_shift(2, e.s.r), t.write_shift(2, e.e.r), t.write_shift(2, e.s.c), t.write_shift(2, e.e.c), t;
}
function o0(e, t, r) {
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
  var i = B(a);
  return i.write_shift(2, n), i.write_shift(2, t), a > 4 && i.write_shift(2, 29282), a > 6 && i.write_shift(2, 1997), a > 8 && (i.write_shift(2, 49161), i.write_shift(2, 1), i.write_shift(2, 1798), i.write_shift(2, 0)), i;
}
function Eo(e, t) {
  var r = !t || t.biff == 8, n = B(r ? 112 : 54);
  for (n.write_shift(t.biff == 8 ? 2 : 1, 7), r && n.write_shift(1, 0), n.write_shift(4, 859007059), n.write_shift(4, 5458548 | (r ? 0 : 536870912)); n.l < n.length; )
    n.write_shift(1, r ? 0 : 32);
  return n;
}
function wo(e, t) {
  var r = !t || t.biff >= 8 ? 2 : 1, n = B(8 + r * e.name.length);
  n.write_shift(4, e.pos), n.write_shift(1, e.hs || 0), n.write_shift(1, e.dt), n.write_shift(1, e.name.length), t.biff >= 8 && n.write_shift(1, 1), n.write_shift(r * e.name.length, e.name, t.biff < 8 ? "sbcs" : "utf16le");
  var a = n.slice(0, n.l);
  return a.l = n.l, a;
}
function So(e, t) {
  var r = B(8);
  r.write_shift(4, e.Count), r.write_shift(4, e.Unique);
  for (var n = [], a = 0; a < e.length; ++a)
    n[a] = xo(e[a]);
  var i = He([r].concat(n));
  return i.parts = [r.length].concat(n.map(function(s) {
    return s.length;
  })), i;
}
function Ao() {
  var e = B(18);
  return e.write_shift(2, 0), e.write_shift(2, 0), e.write_shift(2, 29280), e.write_shift(2, 17600), e.write_shift(2, 56), e.write_shift(2, 0), e.write_shift(2, 0), e.write_shift(2, 1), e.write_shift(2, 500), e;
}
function Fo(e) {
  var t = B(18), r = 1718;
  return e && e.RTL && (r |= 64), t.write_shift(2, r), t.write_shift(4, 0), t.write_shift(4, 64), t.write_shift(4, 0), t.write_shift(4, 0), t;
}
function yo(e, t) {
  var r = e.name || "Arial", n = t && t.biff == 5, a = n ? 15 + r.length : 16 + 2 * r.length, i = B(a);
  return i.write_shift(2, (e.sz || 12) * 20), i.write_shift(4, 0), i.write_shift(2, 400), i.write_shift(4, 0), i.write_shift(2, 0), i.write_shift(1, r.length), n || i.write_shift(1, 1), i.write_shift((n ? 1 : 2) * r.length, r, n ? "sbcs" : "utf16le"), i;
}
function Co(e, t, r, n) {
  var a = B(10);
  return Jr(e, t, n, a), a.write_shift(4, r), a;
}
function Oo(e, t, r, n, a) {
  var i = !a || a.biff == 8, s = B(6 + 2 + +i + (1 + i) * r.length);
  return Jr(e, t, n, s), s.write_shift(2, r.length), i && s.write_shift(1, 1), s.write_shift((1 + i) * r.length, r, i ? "utf16le" : "sbcs"), s;
}
function Do(e, t, r, n) {
  var a = r && r.biff == 5;
  n || (n = B(a ? 3 + t.length : 5 + 2 * t.length)), n.write_shift(2, e), n.write_shift(a ? 1 : 2, t.length), a || n.write_shift(1, 1), n.write_shift((a ? 1 : 2) * t.length, t, a ? "sbcs" : "utf16le");
  var i = n.length > n.l ? n.slice(0, n.l) : n;
  return i.l == null && (i.l = i.length), i;
}
function Ro(e, t) {
  var r = t.biff == 8 || !t.biff ? 4 : 2, n = B(2 * r + 6);
  return n.write_shift(r, e.s.r), n.write_shift(r, e.e.r + 1), n.write_shift(2, e.s.c), n.write_shift(2, e.e.c + 1), n.write_shift(2, 0), n;
}
function da(e, t, r, n) {
  var a = r && r.biff == 5;
  n || (n = B(a ? 16 : 20)), n.write_shift(2, 0), e.style ? (n.write_shift(2, e.numFmtId || 0), n.write_shift(2, 65524)) : (n.write_shift(2, e.numFmtId || 0), n.write_shift(2, t << 4));
  var i = 0;
  return e.numFmtId > 0 && a && (i |= 1024), n.write_shift(4, i), n.write_shift(4, 0), a || n.write_shift(4, 0), n.write_shift(2, 0), n;
}
function No(e) {
  var t = B(8);
  return t.write_shift(4, 0), t.write_shift(2, e[0] ? e[0] + 1 : 0), t.write_shift(2, e[1] ? e[1] + 1 : 0), t;
}
function Io(e, t, r, n, a, i) {
  var s = B(8);
  return Jr(e, t, n, s), Ri(r, i, s), s;
}
function ko(e, t, r, n) {
  var a = B(14);
  return Jr(e, t, n, a), Yr(r, a), a;
}
function Po(e, t, r) {
  if (r.biff < 8)
    return Lo(e, t, r);
  for (var n = [], a = e.l + t, i = e.read_shift(r.biff > 8 ? 4 : 2); i-- !== 0; )
    n.push(_o(e, r.biff > 8 ? 12 : 6, r));
  if (e.l != a)
    throw new Error("Bad ExternSheet: " + e.l + " != " + a);
  return n;
}
function Lo(e, t, r) {
  e[e.l + 1] == 3 && e[e.l]++;
  var n = Ni(e, t, r);
  return n.charCodeAt(0) == 3 ? n.slice(1) : n;
}
function Mo(e) {
  var t = B(2 + e.length * 8);
  t.write_shift(2, e.length);
  for (var r = 0; r < e.length; ++r)
    ki(e[r], t);
  return t;
}
function Bo(e) {
  var t = B(24), r = Me(e[0]);
  t.write_shift(2, r.r), t.write_shift(2, r.r), t.write_shift(2, r.c), t.write_shift(2, r.c);
  for (var n = "d0 c9 ea 79 f9 ba ce 11 8c 82 00 aa 00 4b a9 0b".split(" "), a = 0; a < 16; ++a)
    t.write_shift(1, parseInt(n[a], 16));
  return He([t, go(e[1])]);
}
function bo(e) {
  var t = e[1].Tooltip, r = B(10 + 2 * (t.length + 1));
  r.write_shift(2, 2048);
  var n = Me(e[0]);
  r.write_shift(2, n.r), r.write_shift(2, n.r), r.write_shift(2, n.c), r.write_shift(2, n.c);
  for (var a = 0; a < t.length; ++a)
    r.write_shift(2, t.charCodeAt(a));
  return r.write_shift(2, 0), r;
}
function Uo(e) {
  return e || (e = B(4)), e.write_shift(2, 1), e.write_shift(2, 1), e;
}
function Wo(e, t, r) {
  if (!r.cellStyles)
    return Er(e, t);
  var n = r && r.biff >= 12 ? 4 : 2, a = e.read_shift(n), i = e.read_shift(n), s = e.read_shift(n), f = e.read_shift(n), o = e.read_shift(2);
  n == 2 && (e.l += 2);
  var l = { s: a, e: i, w: s, ixfe: f, flags: o };
  return (r.biff >= 5 || !r.biff) && (l.level = o >> 8 & 7), l;
}
function Ho(e, t) {
  var r = B(12);
  r.write_shift(2, t), r.write_shift(2, t), r.write_shift(2, e.width * 256), r.write_shift(2, 0);
  var n = 0;
  return e.hidden && (n |= 1), r.write_shift(1, n), n = e.level || 0, r.write_shift(1, n), r.write_shift(2, 0), r;
}
function Vo(e) {
  for (var t = B(2 * e), r = 0; r < e; ++r)
    t.write_shift(2, r + 1);
  return t;
}
function Go(e, t, r) {
  var n = B(15);
  return Gt(n, e, t), n.write_shift(8, r, "f"), n;
}
function Xo(e, t, r) {
  var n = B(9);
  return Gt(n, e, t), n.write_shift(2, r), n;
}
var jo = /* @__PURE__ */ function() {
  var e = {
    /* Code Pages Supported by Visual FoxPro */
    /*::[*/
    1: 437,
    /*::[*/
    2: 850,
    /*::[*/
    3: 1252,
    /*::[*/
    4: 1e4,
    /*::[*/
    100: 852,
    /*::[*/
    101: 866,
    /*::[*/
    102: 865,
    /*::[*/
    103: 861,
    /*::[*/
    104: 895,
    /*::[*/
    105: 620,
    /*::[*/
    106: 737,
    /*::[*/
    107: 857,
    /*::[*/
    120: 950,
    /*::[*/
    121: 949,
    /*::[*/
    122: 936,
    /*::[*/
    123: 932,
    /*::[*/
    124: 874,
    /*::[*/
    125: 1255,
    /*::[*/
    126: 1256,
    /*::[*/
    150: 10007,
    /*::[*/
    151: 10029,
    /*::[*/
    152: 10006,
    /*::[*/
    200: 1250,
    /*::[*/
    201: 1251,
    /*::[*/
    202: 1254,
    /*::[*/
    203: 1253,
    /* shapefile DBF extension */
    /*::[*/
    0: 20127,
    /*::[*/
    8: 865,
    /*::[*/
    9: 437,
    /*::[*/
    10: 850,
    /*::[*/
    11: 437,
    /*::[*/
    13: 437,
    /*::[*/
    14: 850,
    /*::[*/
    15: 437,
    /*::[*/
    16: 850,
    /*::[*/
    17: 437,
    /*::[*/
    18: 850,
    /*::[*/
    19: 932,
    /*::[*/
    20: 850,
    /*::[*/
    21: 437,
    /*::[*/
    22: 850,
    /*::[*/
    23: 865,
    /*::[*/
    24: 437,
    /*::[*/
    25: 437,
    /*::[*/
    26: 850,
    /*::[*/
    27: 437,
    /*::[*/
    28: 863,
    /*::[*/
    29: 850,
    /*::[*/
    31: 852,
    /*::[*/
    34: 852,
    /*::[*/
    35: 852,
    /*::[*/
    36: 860,
    /*::[*/
    37: 850,
    /*::[*/
    38: 866,
    /*::[*/
    55: 850,
    /*::[*/
    64: 852,
    /*::[*/
    77: 936,
    /*::[*/
    78: 949,
    /*::[*/
    79: 950,
    /*::[*/
    80: 874,
    /*::[*/
    87: 1252,
    /*::[*/
    88: 1252,
    /*::[*/
    89: 1252,
    /*::[*/
    108: 863,
    /*::[*/
    134: 737,
    /*::[*/
    135: 852,
    /*::[*/
    136: 857,
    /*::[*/
    204: 1257,
    /*::[*/
    255: 16969
  }, t = Zn({
    /*::[*/
    1: 437,
    /*::[*/
    2: 850,
    /*::[*/
    3: 1252,
    /*::[*/
    4: 1e4,
    /*::[*/
    100: 852,
    /*::[*/
    101: 866,
    /*::[*/
    102: 865,
    /*::[*/
    103: 861,
    /*::[*/
    104: 895,
    /*::[*/
    105: 620,
    /*::[*/
    106: 737,
    /*::[*/
    107: 857,
    /*::[*/
    120: 950,
    /*::[*/
    121: 949,
    /*::[*/
    122: 936,
    /*::[*/
    123: 932,
    /*::[*/
    124: 874,
    /*::[*/
    125: 1255,
    /*::[*/
    126: 1256,
    /*::[*/
    150: 10007,
    /*::[*/
    151: 10029,
    /*::[*/
    152: 10006,
    /*::[*/
    200: 1250,
    /*::[*/
    201: 1251,
    /*::[*/
    202: 1254,
    /*::[*/
    203: 1253,
    /*::[*/
    0: 20127
  });
  function r(f, o) {
    var l = [], c = Kr(1);
    switch (o.type) {
      case "base64":
        c = pr(Rr(f));
        break;
      case "binary":
        c = pr(f);
        break;
      case "buffer":
      case "array":
        c = f;
        break;
    }
    nr(c, 0);
    var u = c.read_shift(1), h = !!(u & 136), p = !1, _ = !1;
    switch (u) {
      case 2:
        break;
      case 3:
        break;
      case 48:
        p = !0, h = !0;
        break;
      case 49:
        p = !0, h = !0;
        break;
      case 131:
        break;
      case 139:
        break;
      case 140:
        _ = !0;
        break;
      case 245:
        break;
      default:
        throw new Error("DBF Unsupported Version: " + u.toString(16));
    }
    var x = 0, g = 521;
    u == 2 && (x = c.read_shift(2)), c.l += 3, u != 2 && (x = c.read_shift(4)), x > 1048576 && (x = 1e6), u != 2 && (g = c.read_shift(2));
    var C = c.read_shift(2), O = o.codepage || 1252;
    u != 2 && (c.l += 16, c.read_shift(1), c[c.l] !== 0 && (O = e[c[c.l]]), c.l += 1, c.l += 2), _ && (c.l += 36);
    for (var F = [], L = {}, j = Math.min(c.length, u == 2 ? 521 : g - 10 - (p ? 264 : 0)), Q = _ ? 32 : 11; c.l < j && c[c.l] != 13; )
      switch (L = {}, L.name = jr.utils.decode(O, c.slice(c.l, c.l + Q)).replace(/[\u0000\r\n].*$/g, ""), c.l += Q, L.type = String.fromCharCode(c.read_shift(1)), u != 2 && !_ && (L.offset = c.read_shift(4)), L.len = c.read_shift(1), u == 2 && (L.offset = c.read_shift(2)), L.dec = c.read_shift(1), L.name.length && F.push(L), u != 2 && (c.l += _ ? 13 : 14), L.type) {
        case "B":
          (!p || L.len != 8) && o.WTF && console.log("Skipping " + L.name + ":" + L.type);
          break;
        case "G":
        case "P":
          o.WTF && console.log("Skipping " + L.name + ":" + L.type);
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
          throw new Error("Unknown Field Type: " + L.type);
      }
    if (c[c.l] !== 13 && (c.l = g - 1), c.read_shift(1) !== 13)
      throw new Error("DBF Terminator not found " + c.l + " " + c[c.l]);
    c.l = g;
    var D = 0, U = 0;
    for (l[0] = [], U = 0; U != F.length; ++U)
      l[0][U] = F[U].name;
    for (; x-- > 0; ) {
      if (c[c.l] === 42) {
        c.l += C;
        continue;
      }
      for (++c.l, l[++D] = [], U = 0, U = 0; U != F.length; ++U) {
        var M = c.slice(c.l, c.l + F[U].len);
        c.l += F[U].len, nr(M, 0);
        var V = jr.utils.decode(O, M);
        switch (F[U].type) {
          case "C":
            V.trim().length && (l[D][U] = V.replace(/\s+$/, ""));
            break;
          case "D":
            V.length === 8 ? l[D][U] = new Date(+V.slice(0, 4), +V.slice(4, 6) - 1, +V.slice(6, 8)) : l[D][U] = V;
            break;
          case "F":
            l[D][U] = parseFloat(V.trim());
            break;
          case "+":
          case "I":
            l[D][U] = _ ? M.read_shift(-4, "i") ^ 2147483648 : M.read_shift(4, "i");
            break;
          case "L":
            switch (V.trim().toUpperCase()) {
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
                throw new Error("DBF Unrecognized L:|" + V + "|");
            }
            break;
          case "M":
            if (!h)
              throw new Error("DBF Unexpected MEMO for type " + u.toString(16));
            l[D][U] = "##MEMO##" + (_ ? parseInt(V.trim(), 10) : M.read_shift(4));
            break;
          case "N":
            V = V.replace(/\u0000/g, "").trim(), V && V != "." && (l[D][U] = +V || 0);
            break;
          case "@":
            l[D][U] = new Date(M.read_shift(-8, "f") - 621356832e5);
            break;
          case "T":
            l[D][U] = new Date((M.read_shift(4) - 2440588) * 864e5 + M.read_shift(4));
            break;
          case "Y":
            l[D][U] = M.read_shift(4, "i") / 1e4 + M.read_shift(4, "i") / 1e4 * Math.pow(2, 32);
            break;
          case "O":
            l[D][U] = -M.read_shift(-8, "f");
            break;
          case "B":
            if (p && F[U].len == 8) {
              l[D][U] = M.read_shift(8, "f");
              break;
            }
          case "G":
          case "P":
            M.l += F[U].len;
            break;
          case "0":
            if (F[U].name === "_NullFlags")
              break;
          default:
            throw new Error("DBF Unsupported data type " + F[U].type);
        }
      }
    }
    if (u != 2 && c.l < c.length && c[c.l++] != 26)
      throw new Error("DBF EOF Marker missing " + (c.l - 1) + " of " + c.length + " " + c[c.l - 1].toString(16));
    return o && o.sheetRows && (l = l.slice(0, o.sheetRows)), o.DBF = F, l;
  }
  function n(f, o) {
    var l = o || {};
    l.dateNF || (l.dateNF = "yyyymmdd");
    var c = vt(r(f, l), l);
    return c["!cols"] = l.DBF.map(function(u) {
      return {
        wch: u.len,
        DBF: u
      };
    }), delete l.DBF, c;
  }
  function a(f, o) {
    try {
      return Zr(n(f, o), o);
    } catch (l) {
      if (o && o.WTF)
        throw l;
    }
    return { SheetNames: [], Sheets: {} };
  }
  var i = { B: 8, C: 250, L: 1, D: 8, "?": 0, "": 0 };
  function s(f, o) {
    var l = o || {};
    if (+l.codepage >= 0 && It(+l.codepage), l.type == "string")
      throw new Error("Cannot write DBF to JS string");
    var c = Ze(), u = vn(f, { header: 1, raw: !0, cellDates: !0 }), h = u[0], p = u.slice(1), _ = f["!cols"] || [], x = 0, g = 0, C = 0, O = 1;
    for (x = 0; x < h.length; ++x) {
      if (((_[x] || {}).DBF || {}).name) {
        h[x] = _[x].DBF.name, ++C;
        continue;
      }
      if (h[x] != null) {
        if (++C, typeof h[x] == "number" && (h[x] = h[x].toString(10)), typeof h[x] != "string")
          throw new Error("DBF Invalid column name " + h[x] + " |" + typeof h[x] + "|");
        if (h.indexOf(h[x]) !== x) {
          for (g = 0; g < 1024; ++g)
            if (h.indexOf(h[x] + "_" + g) == -1) {
              h[x] += "_" + g;
              break;
            }
        }
      }
    }
    var F = Ee(f["!ref"]), L = [], j = [], Q = [];
    for (x = 0; x <= F.e.c - F.s.c; ++x) {
      var D = "", U = "", M = 0, V = [];
      for (g = 0; g < p.length; ++g)
        p[g][x] != null && V.push(p[g][x]);
      if (V.length == 0 || h[x] == null) {
        L[x] = "?";
        continue;
      }
      for (g = 0; g < V.length; ++g) {
        switch (typeof V[g]) {
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
            U = V[g] instanceof Date ? "D" : "C";
            break;
          default:
            U = "C";
        }
        M = Math.max(M, String(V[g]).length), D = D && D != U ? "C" : U;
      }
      M > 250 && (M = 250), U = ((_[x] || {}).DBF || {}).type, U == "C" && _[x].DBF.len > M && (M = _[x].DBF.len), D == "B" && U == "N" && (D = "N", Q[x] = _[x].DBF.dec, M = _[x].DBF.len), j[x] = D == "C" || U == "N" ? M : i[D] || 0, O += j[x], L[x] = D;
    }
    var G = c.next(32);
    for (G.write_shift(4, 318902576), G.write_shift(4, p.length), G.write_shift(2, 296 + 32 * C), G.write_shift(2, O), x = 0; x < 4; ++x)
      G.write_shift(4, 0);
    for (G.write_shift(4, 0 | (+t[
      /*::String(*/
      La
      /*::)*/
    ] || 3) << 8), x = 0, g = 0; x < h.length; ++x)
      if (h[x] != null) {
        var z = c.next(32), re = (h[x].slice(-10) + "\0\0\0\0\0\0\0\0\0\0\0").slice(0, 11);
        z.write_shift(1, re, "sbcs"), z.write_shift(1, L[x] == "?" ? "C" : L[x], "sbcs"), z.write_shift(4, g), z.write_shift(1, j[x] || i[L[x]] || 0), z.write_shift(1, Q[x] || 0), z.write_shift(1, 2), z.write_shift(4, 0), z.write_shift(1, 0), z.write_shift(4, 0), z.write_shift(4, 0), g += j[x] || i[L[x]] || 0;
      }
    var ge = c.next(264);
    for (ge.write_shift(4, 13), x = 0; x < 65; ++x)
      ge.write_shift(4, 0);
    for (x = 0; x < p.length; ++x) {
      var le = c.next(O);
      for (le.write_shift(1, 0), g = 0; g < h.length; ++g)
        if (h[g] != null)
          switch (L[g]) {
            case "L":
              le.write_shift(1, p[x][g] == null ? 63 : p[x][g] ? 84 : 70);
              break;
            case "B":
              le.write_shift(8, p[x][g] || 0, "f");
              break;
            case "N":
              var be = "0";
              for (typeof p[x][g] == "number" && (be = p[x][g].toFixed(Q[g] || 0)), C = 0; C < j[g] - be.length; ++C)
                le.write_shift(1, 32);
              le.write_shift(1, be, "sbcs");
              break;
            case "D":
              p[x][g] ? (le.write_shift(4, ("0000" + p[x][g].getFullYear()).slice(-4), "sbcs"), le.write_shift(2, ("00" + (p[x][g].getMonth() + 1)).slice(-2), "sbcs"), le.write_shift(2, ("00" + p[x][g].getDate()).slice(-2), "sbcs")) : le.write_shift(8, "00000000", "sbcs");
              break;
            case "C":
              var Oe = String(p[x][g] != null ? p[x][g] : "").slice(0, j[g]);
              for (le.write_shift(1, Oe, "sbcs"), C = 0; C < j[g] - Oe.length; ++C)
                le.write_shift(1, 32);
              break;
          }
    }
    return c.next(1).write_shift(1, 26), c.end();
  }
  return {
    to_workbook: a,
    to_sheet: n,
    from_sheet: s
  };
}(), $o = /* @__PURE__ */ function() {
  var e = {
    AA: "À",
    BA: "Á",
    CA: "Â",
    DA: 195,
    HA: "Ä",
    JA: 197,
    AE: "È",
    BE: "É",
    CE: "Ê",
    HE: "Ë",
    AI: "Ì",
    BI: "Í",
    CI: "Î",
    HI: "Ï",
    AO: "Ò",
    BO: "Ó",
    CO: "Ô",
    DO: 213,
    HO: "Ö",
    AU: "Ù",
    BU: "Ú",
    CU: "Û",
    HU: "Ü",
    Aa: "à",
    Ba: "á",
    Ca: "â",
    Da: 227,
    Ha: "ä",
    Ja: 229,
    Ae: "è",
    Be: "é",
    Ce: "ê",
    He: "ë",
    Ai: "ì",
    Bi: "í",
    Ci: "î",
    Hi: "ï",
    Ao: "ò",
    Bo: "ó",
    Co: "ô",
    Do: 245,
    Ho: "ö",
    Au: "ù",
    Bu: "ú",
    Cu: "û",
    Hu: "ü",
    KC: "Ç",
    Kc: "ç",
    q: "æ",
    z: "œ",
    a: "Æ",
    j: "Œ",
    DN: 209,
    Dn: 241,
    Hy: 255,
    S: 169,
    c: 170,
    R: 174,
    "B ": 180,
    /*::[*/
    0: 176,
    /*::[*/
    1: 177,
    /*::[*/
    2: 178,
    /*::[*/
    3: 179,
    /*::[*/
    5: 181,
    /*::[*/
    6: 182,
    /*::[*/
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
  }, t = new RegExp("\x1BN(" + Xe(e).join("|").replace(/\|\|\|/, "|\\||").replace(/([?()+])/g, "\\$1") + "|\\|)", "gm"), r = function(h, p) {
    var _ = e[p];
    return typeof _ == "number" ? b0(_) : _;
  }, n = function(h, p, _) {
    var x = p.charCodeAt(0) - 32 << 4 | _.charCodeAt(0) - 48;
    return x == 59 ? h : b0(x);
  };
  e["|"] = 254;
  function a(h, p) {
    switch (p.type) {
      case "base64":
        return i(Rr(h), p);
      case "binary":
        return i(h, p);
      case "buffer":
        return i(ue && Buffer.isBuffer(h) ? h.toString("binary") : bt(h), p);
      case "array":
        return i(wn(h), p);
    }
    throw new Error("Unrecognized type " + p.type);
  }
  function i(h, p) {
    var _ = h.split(/[\n\r]+/), x = -1, g = -1, C = 0, O = 0, F = [], L = [], j = null, Q = {}, D = [], U = [], M = [], V = 0, G;
    for (+p.codepage >= 0 && It(+p.codepage); C !== _.length; ++C) {
      V = 0;
      var z = _[C].trim().replace(/\x1B([\x20-\x2F])([\x30-\x3F])/g, n).replace(t, r), re = z.replace(/;;/g, "\0").split(";").map(function(A) {
        return A.replace(/\u0000/g, ";");
      }), ge = re[0], le;
      if (z.length > 0)
        switch (ge) {
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
            re[1].charAt(0) == "P" && L.push(z.slice(3).replace(/;;/g, ";"));
            break;
          case "C":
            var be = !1, Oe = !1, ur = !1, Pe = !1, fr = -1, rr = -1;
            for (O = 1; O < re.length; ++O)
              switch (re[O].charAt(0)) {
                case "A":
                  break;
                case "X":
                  g = parseInt(re[O].slice(1)) - 1, Oe = !0;
                  break;
                case "Y":
                  for (x = parseInt(re[O].slice(1)) - 1, Oe || (g = 0), G = F.length; G <= x; ++G)
                    F[G] = [];
                  break;
                case "K":
                  le = re[O].slice(1), le.charAt(0) === '"' ? le = le.slice(1, le.length - 1) : le === "TRUE" ? le = !0 : le === "FALSE" ? le = !1 : isNaN(Cr(le)) ? isNaN(Pt(le).getDate()) || (le = qe(le)) : (le = Cr(le), j !== null && za(j) && (le = qa(le))), be = !0;
                  break;
                case "E":
                  Pe = !0;
                  var S = Xc(re[O].slice(1), { r: x, c: g });
                  F[x][g] = [F[x][g], S];
                  break;
                case "S":
                  ur = !0, F[x][g] = [F[x][g], "S5S"];
                  break;
                case "G":
                  break;
                case "R":
                  fr = parseInt(re[O].slice(1)) - 1;
                  break;
                case "C":
                  rr = parseInt(re[O].slice(1)) - 1;
                  break;
                default:
                  if (p && p.WTF)
                    throw new Error("SYLK bad record " + z);
              }
            if (be && (F[x][g] && F[x][g].length == 2 ? F[x][g][0] = le : F[x][g] = le, j = null), ur) {
              if (Pe)
                throw new Error("SYLK shared formula cannot have own formula");
              var P = fr > -1 && F[fr][rr];
              if (!P || !P[1])
                throw new Error("SYLK shared formula cannot find base");
              F[x][g][1] = jc(P[1], { r: x - fr, c: g - rr });
            }
            break;
          case "F":
            var y = 0;
            for (O = 1; O < re.length; ++O)
              switch (re[O].charAt(0)) {
                case "X":
                  g = parseInt(re[O].slice(1)) - 1, ++y;
                  break;
                case "Y":
                  for (x = parseInt(re[O].slice(1)) - 1, G = F.length; G <= x; ++G)
                    F[G] = [];
                  break;
                case "M":
                  V = parseInt(re[O].slice(1)) / 20;
                  break;
                case "F":
                  break;
                case "G":
                  break;
                case "P":
                  j = L[parseInt(re[O].slice(1))];
                  break;
                case "S":
                  break;
                case "D":
                  break;
                case "N":
                  break;
                case "W":
                  for (M = re[O].slice(1).split(" "), G = parseInt(M[0], 10); G <= parseInt(M[1], 10); ++G)
                    V = parseInt(M[2], 10), U[G - 1] = V === 0 ? { hidden: !0 } : { wch: V }, c0(U[G - 1]);
                  break;
                case "C":
                  g = parseInt(re[O].slice(1)) - 1, U[g] || (U[g] = {});
                  break;
                case "R":
                  x = parseInt(re[O].slice(1)) - 1, D[x] || (D[x] = {}), V > 0 ? (D[x].hpt = V, D[x].hpx = bi(V)) : V === 0 && (D[x].hidden = !0);
                  break;
                default:
                  if (p && p.WTF)
                    throw new Error("SYLK bad record " + z);
              }
            y < 1 && (j = null);
            break;
          default:
            if (p && p.WTF)
              throw new Error("SYLK bad record " + z);
        }
    }
    return D.length > 0 && (Q["!rows"] = D), U.length > 0 && (Q["!cols"] = U), p && p.sheetRows && (F = F.slice(0, p.sheetRows)), [F, Q];
  }
  function s(h, p) {
    var _ = a(h, p), x = _[0], g = _[1], C = vt(x, p);
    return Xe(g).forEach(function(O) {
      C[O] = g[O];
    }), C;
  }
  function f(h, p) {
    return Zr(s(h, p), p);
  }
  function o(h, p, _, x) {
    var g = "C;Y" + (_ + 1) + ";X" + (x + 1) + ";K";
    switch (h.t) {
      case "n":
        g += h.v || 0, h.f && !h.F && (g += ";E" + u0(h.f, { r: _, c: x }));
        break;
      case "b":
        g += h.v ? "TRUE" : "FALSE";
        break;
      case "e":
        g += h.w || h.v;
        break;
      case "d":
        g += '"' + (h.w || h.v) + '"';
        break;
      case "s":
        g += '"' + h.v.replace(/"/g, "").replace(/;/g, ";;") + '"';
        break;
    }
    return g;
  }
  function l(h, p) {
    p.forEach(function(_, x) {
      var g = "F;W" + (x + 1) + " " + (x + 1) + " ";
      _.hidden ? g += "0" : (typeof _.width == "number" && !_.wpx && (_.wpx = un(_.width)), typeof _.wpx == "number" && !_.wch && (_.wch = xn(_.wpx)), typeof _.wch == "number" && (g += Math.round(_.wch))), g.charAt(g.length - 1) != " " && h.push(g);
    });
  }
  function c(h, p) {
    p.forEach(function(_, x) {
      var g = "F;";
      _.hidden ? g += "M0;" : _.hpt ? g += "M" + 20 * _.hpt + ";" : _.hpx && (g += "M" + 20 * dn(_.hpx) + ";"), g.length > 2 && h.push(g + "R" + (x + 1));
    });
  }
  function u(h, p) {
    var _ = ["ID;PWXL;N;E"], x = [], g = Ee(h["!ref"]), C, O = Array.isArray(h), F = `\r
`;
    _.push("P;PGeneral"), _.push("F;P0;DG0G8;M255"), h["!cols"] && l(_, h["!cols"]), h["!rows"] && c(_, h["!rows"]), _.push("B;Y" + (g.e.r - g.s.r + 1) + ";X" + (g.e.c - g.s.c + 1) + ";D" + [g.s.c, g.s.r, g.e.c, g.e.r].join(" "));
    for (var L = g.s.r; L <= g.e.r; ++L)
      for (var j = g.s.c; j <= g.e.c; ++j) {
        var Q = me({ r: L, c: j });
        C = O ? (h[L] || [])[j] : h[Q], !(!C || C.v == null && (!C.f || C.F)) && x.push(o(C, h, L, j));
      }
    return _.join(F) + F + x.join(F) + F + "E" + F;
  }
  return {
    to_workbook: f,
    to_sheet: s,
    from_sheet: u
  };
}(), zo = /* @__PURE__ */ function() {
  function e(i, s) {
    switch (s.type) {
      case "base64":
        return t(Rr(i), s);
      case "binary":
        return t(i, s);
      case "buffer":
        return t(ue && Buffer.isBuffer(i) ? i.toString("binary") : bt(i), s);
      case "array":
        return t(wn(i), s);
    }
    throw new Error("Unrecognized type " + s.type);
  }
  function t(i, s) {
    for (var f = i.split(`
`), o = -1, l = -1, c = 0, u = []; c !== f.length; ++c) {
      if (f[c].trim() === "BOT") {
        u[++o] = [], l = 0;
        continue;
      }
      if (!(o < 0)) {
        var h = f[c].trim().split(","), p = h[0], _ = h[1];
        ++c;
        for (var x = f[c] || ""; (x.match(/["]/g) || []).length & 1 && c < f.length - 1; )
          x += `
` + f[++c];
        switch (x = x.trim(), +p) {
          case -1:
            if (x === "BOT") {
              u[++o] = [], l = 0;
              continue;
            } else if (x !== "EOD")
              throw new Error("Unrecognized DIF special command " + x);
            break;
          case 0:
            x === "TRUE" ? u[o][l] = !0 : x === "FALSE" ? u[o][l] = !1 : isNaN(Cr(_)) ? isNaN(Pt(_).getDate()) ? u[o][l] = _ : u[o][l] = qe(_) : u[o][l] = Cr(_), ++l;
            break;
          case 1:
            x = x.slice(1, x.length - 1), x = x.replace(/""/g, '"'), x && x.match(/^=".*"$/) && (x = x.slice(2, -1)), u[o][l++] = x !== "" ? x : null;
            break;
        }
        if (x === "EOD")
          break;
      }
    }
    return s && s.sheetRows && (u = u.slice(0, s.sheetRows)), u;
  }
  function r(i, s) {
    return vt(e(i, s), s);
  }
  function n(i, s) {
    return Zr(r(i, s), s);
  }
  var a = /* @__PURE__ */ function() {
    var i = function(o, l, c, u, h) {
      o.push(l), o.push(c + "," + u), o.push('"' + h.replace(/"/g, '""') + '"');
    }, s = function(o, l, c, u) {
      o.push(l + "," + c), o.push(l == 1 ? '"' + u.replace(/"/g, '""') + '"' : u);
    };
    return function(o) {
      var l = [], c = Ee(o["!ref"]), u, h = Array.isArray(o);
      i(l, "TABLE", 0, 1, "sheetjs"), i(l, "VECTORS", 0, c.e.r - c.s.r + 1, ""), i(l, "TUPLES", 0, c.e.c - c.s.c + 1, ""), i(l, "DATA", 0, 0, "");
      for (var p = c.s.r; p <= c.e.r; ++p) {
        s(l, -1, 0, "BOT");
        for (var _ = c.s.c; _ <= c.e.c; ++_) {
          var x = me({ r: p, c: _ });
          if (u = h ? (o[p] || [])[_] : o[x], !u) {
            s(l, 1, 0, "");
            continue;
          }
          switch (u.t) {
            case "n":
              var g = u.w;
              !g && u.v != null && (g = u.v), g == null ? u.f && !u.F ? s(l, 1, 0, "=" + u.f) : s(l, 1, 0, "") : s(l, 0, g, "V");
              break;
            case "b":
              s(l, 0, u.v ? 1 : 0, u.v ? "TRUE" : "FALSE");
              break;
            case "s":
              s(l, 1, 0, isNaN(u.v) ? u.v : '="' + u.v + '"');
              break;
            case "d":
              u.w || (u.w = br(u.z || Ce[14], Qe(qe(u.v)))), s(l, 0, u.w, "V");
              break;
            default:
              s(l, 1, 0, "");
          }
        }
      }
      s(l, -1, 0, "EOD");
      var C = `\r
`, O = l.join(C);
      return O;
    };
  }();
  return {
    to_workbook: n,
    to_sheet: r,
    from_sheet: a
  };
}(), Pi = /* @__PURE__ */ function() {
  function e(u) {
    return u.replace(/\\b/g, "\\").replace(/\\c/g, ":").replace(/\\n/g, `
`);
  }
  function t(u) {
    return u.replace(/\\/g, "\\b").replace(/:/g, "\\c").replace(/\n/g, "\\n");
  }
  function r(u, h) {
    for (var p = u.split(`
`), _ = -1, x = -1, g = 0, C = []; g !== p.length; ++g) {
      var O = p[g].trim().split(":");
      if (O[0] === "cell") {
        var F = Me(O[1]);
        if (C.length <= F.r)
          for (_ = C.length; _ <= F.r; ++_)
            C[_] || (C[_] = []);
        switch (_ = F.r, x = F.c, O[2]) {
          case "t":
            C[_][x] = e(O[3]);
            break;
          case "v":
            C[_][x] = +O[3];
            break;
          case "vtf":
            var L = O[O.length - 1];
          case "vtc":
            switch (O[3]) {
              case "nl":
                C[_][x] = !!+O[4];
                break;
              default:
                C[_][x] = +O[4];
                break;
            }
            O[2] == "vtf" && (C[_][x] = [C[_][x], L]);
        }
      }
    }
    return h && h.sheetRows && (C = C.slice(0, h.sheetRows)), C;
  }
  function n(u, h) {
    return vt(r(u, h), h);
  }
  function a(u, h) {
    return Zr(n(u, h), h);
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
`), o = "--SocialCalcSpreadsheetControlSave--";
  function l(u) {
    if (!u || !u["!ref"])
      return "";
    for (var h = [], p = [], _, x = "", g = sr(u["!ref"]), C = Array.isArray(u), O = g.s.r; O <= g.e.r; ++O)
      for (var F = g.s.c; F <= g.e.c; ++F)
        if (x = me({ r: O, c: F }), _ = C ? (u[O] || [])[F] : u[x], !(!_ || _.v == null || _.t === "z")) {
          switch (p = ["cell", x, "t"], _.t) {
            case "s":
            case "str":
              p.push(t(_.v));
              break;
            case "n":
              _.f ? (p[2] = "vtf", p[3] = "n", p[4] = _.v, p[5] = t(_.f)) : (p[2] = "v", p[3] = _.v);
              break;
            case "b":
              p[2] = "vt" + (_.f ? "f" : "c"), p[3] = "nl", p[4] = _.v ? "1" : "0", p[5] = t(_.f || (_.v ? "TRUE" : "FALSE"));
              break;
            case "d":
              var L = Qe(qe(_.v));
              p[2] = "vtc", p[3] = "nd", p[4] = "" + L, p[5] = _.w || br(_.z || Ce[14], L);
              break;
            case "e":
              continue;
          }
          h.push(p.join(":"));
        }
    return h.push("sheet:c:" + (g.e.c - g.s.c + 1) + ":r:" + (g.e.r - g.s.r + 1) + ":tvf:1"), h.push("valueformat:1:text-wiki"), h.join(`
`);
  }
  function c(u) {
    return [i, s, f, s, l(u), o].join(`
`);
  }
  return {
    to_workbook: a,
    to_sheet: n,
    from_sheet: c
  };
}(), Ko = /* @__PURE__ */ function() {
  function e(c, u, h, p, _) {
    _.raw ? u[h][p] = c : c === "" || (c === "TRUE" ? u[h][p] = !0 : c === "FALSE" ? u[h][p] = !1 : isNaN(Cr(c)) ? isNaN(Pt(c).getDate()) ? u[h][p] = c : u[h][p] = qe(c) : u[h][p] = Cr(c));
  }
  function t(c, u) {
    var h = u || {}, p = [];
    if (!c || c.length === 0)
      return p;
    for (var _ = c.split(/[\r\n]/), x = _.length - 1; x >= 0 && _[x].length === 0; )
      --x;
    for (var g = 10, C = 0, O = 0; O <= x; ++O)
      C = _[O].indexOf(" "), C == -1 ? C = _[O].length : C++, g = Math.max(g, C);
    for (O = 0; O <= x; ++O) {
      p[O] = [];
      var F = 0;
      for (e(_[O].slice(0, g).trim(), p, O, F, h), F = 1; F <= (_[O].length - g) / 10 + 1; ++F)
        e(_[O].slice(g + (F - 1) * 10, g + F * 10).trim(), p, O, F, h);
    }
    return h.sheetRows && (p = p.slice(0, h.sheetRows)), p;
  }
  var r = {
    /*::[*/
    44: ",",
    /*::[*/
    9: "	",
    /*::[*/
    59: ";",
    /*::[*/
    124: "|"
  }, n = {
    /*::[*/
    44: 3,
    /*::[*/
    9: 2,
    /*::[*/
    59: 1,
    /*::[*/
    124: 0
  };
  function a(c) {
    for (var u = {}, h = !1, p = 0, _ = 0; p < c.length; ++p)
      (_ = c.charCodeAt(p)) == 34 ? h = !h : !h && _ in r && (u[_] = (u[_] || 0) + 1);
    _ = [];
    for (p in u)
      Object.prototype.hasOwnProperty.call(u, p) && _.push([u[p], p]);
    if (!_.length) {
      u = n;
      for (p in u)
        Object.prototype.hasOwnProperty.call(u, p) && _.push([u[p], p]);
    }
    return _.sort(function(x, g) {
      return x[0] - g[0] || n[x[1]] - n[g[1]];
    }), r[_.pop()[1]] || 44;
  }
  function i(c, u) {
    var h = u || {}, p = "", _ = h.dense ? [] : {}, x = { s: { c: 0, r: 0 }, e: { c: 0, r: 0 } };
    c.slice(0, 4) == "sep=" ? c.charCodeAt(5) == 13 && c.charCodeAt(6) == 10 ? (p = c.charAt(4), c = c.slice(7)) : c.charCodeAt(5) == 13 || c.charCodeAt(5) == 10 ? (p = c.charAt(4), c = c.slice(6)) : p = a(c.slice(0, 1024)) : h && h.FS ? p = h.FS : p = a(c.slice(0, 1024));
    var g = 0, C = 0, O = 0, F = 0, L = 0, j = p.charCodeAt(0), Q = !1, D = 0, U = c.charCodeAt(0);
    c = c.replace(/\r\n/mg, `
`);
    var M = h.dateNF != null ? ol(h.dateNF) : null;
    function V() {
      var G = c.slice(F, L), z = {};
      if (G.charAt(0) == '"' && G.charAt(G.length - 1) == '"' && (G = G.slice(1, -1).replace(/""/g, '"')), G.length === 0)
        z.t = "z";
      else if (h.raw)
        z.t = "s", z.v = G;
      else if (G.trim().length === 0)
        z.t = "s", z.v = G;
      else if (G.charCodeAt(0) == 61)
        G.charCodeAt(1) == 34 && G.charCodeAt(G.length - 1) == 34 ? (z.t = "s", z.v = G.slice(2, -1).replace(/""/g, '"')) : $c(G) ? (z.t = "n", z.f = G.slice(1)) : (z.t = "s", z.v = G);
      else if (G == "TRUE")
        z.t = "b", z.v = !0;
      else if (G == "FALSE")
        z.t = "b", z.v = !1;
      else if (!isNaN(O = Cr(G)))
        z.t = "n", h.cellText !== !1 && (z.w = G), z.v = O;
      else if (!isNaN(Pt(G).getDate()) || M && G.match(M)) {
        z.z = h.dateNF || Ce[14];
        var re = 0;
        M && G.match(M) && (G = cl(G, h.dateNF, G.match(M) || []), re = 1), h.cellDates ? (z.t = "d", z.v = qe(G, re)) : (z.t = "n", z.v = Qe(qe(G, re))), h.cellText !== !1 && (z.w = br(z.z, z.v instanceof Date ? Qe(z.v) : z.v)), h.cellNF || delete z.z;
      } else
        z.t = "s", z.v = G;
      if (z.t == "z" || (h.dense ? (_[g] || (_[g] = []), _[g][C] = z) : _[me({ c: C, r: g })] = z), F = L + 1, U = c.charCodeAt(F), x.e.c < C && (x.e.c = C), x.e.r < g && (x.e.r = g), D == j)
        ++C;
      else if (C = 0, ++g, h.sheetRows && h.sheetRows <= g)
        return !0;
    }
    e:
      for (; L < c.length; ++L)
        switch (D = c.charCodeAt(L)) {
          case 34:
            U === 34 && (Q = !Q);
            break;
          case j:
          case 10:
          case 13:
            if (!Q && V())
              break e;
            break;
        }
    return L - F > 0 && V(), _["!ref"] = Ne(x), _;
  }
  function s(c, u) {
    return !(u && u.PRN) || u.FS || c.slice(0, 4) == "sep=" || c.indexOf("	") >= 0 || c.indexOf(",") >= 0 || c.indexOf(";") >= 0 ? i(c, u) : vt(t(c, u), u);
  }
  function f(c, u) {
    var h = "", p = u.type == "string" ? [0, 0, 0, 0] : s2(c, u);
    switch (u.type) {
      case "base64":
        h = Rr(c);
        break;
      case "binary":
        h = c;
        break;
      case "buffer":
        u.codepage == 65001 ? h = c.toString("utf8") : u.codepage && typeof jr < "u" ? h = jr.utils.decode(u.codepage, c) : h = ue && Buffer.isBuffer(c) ? c.toString("binary") : bt(c);
        break;
      case "array":
        h = wn(c);
        break;
      case "string":
        h = c;
        break;
      default:
        throw new Error("Unrecognized type " + u.type);
    }
    return p[0] == 239 && p[1] == 187 && p[2] == 191 ? h = Ct(h.slice(3)) : u.type != "string" && u.type != "buffer" && u.codepage == 65001 ? h = Ct(h) : u.type == "binary" && typeof jr < "u" && u.codepage && (h = jr.utils.decode(u.codepage, jr.utils.encode(28591, h))), h.slice(0, 19) == "socialcalc:version:" ? Pi.to_sheet(u.type == "string" ? h : Ct(h), u) : s(h, u);
  }
  function o(c, u) {
    return Zr(f(c, u), u);
  }
  function l(c) {
    for (var u = [], h = Ee(c["!ref"]), p, _ = Array.isArray(c), x = h.s.r; x <= h.e.r; ++x) {
      for (var g = [], C = h.s.c; C <= h.e.c; ++C) {
        var O = me({ r: x, c: C });
        if (p = _ ? (c[x] || [])[C] : c[O], !p || p.v == null) {
          g.push("          ");
          continue;
        }
        for (var F = (p.w || (Nr(p), p.w) || "").slice(0, 10); F.length < 10; )
          F += " ";
        g.push(F + (C === 0 ? " " : ""));
      }
      u.push(g.join(""));
    }
    return u.join(`
`);
  }
  return {
    to_workbook: o,
    to_sheet: f,
    from_sheet: l
  };
}(), pa = /* @__PURE__ */ function() {
  function e(S, P, y) {
    if (S) {
      nr(S, S.l || 0);
      for (var A = y.Enum || fr; S.l < S.length; ) {
        var H = S.read_shift(2), ie = A[H] || A[65535], se = S.read_shift(2), ae = S.l + se, Z = ie.f && ie.f(S, se, y);
        if (S.l = ae, P(Z, ie, H))
          return;
      }
    }
  }
  function t(S, P) {
    switch (P.type) {
      case "base64":
        return r(pr(Rr(S)), P);
      case "binary":
        return r(pr(S), P);
      case "buffer":
      case "array":
        return r(S, P);
    }
    throw "Unsupported type " + P.type;
  }
  function r(S, P) {
    if (!S)
      return S;
    var y = P || {}, A = y.dense ? [] : {}, H = "Sheet1", ie = "", se = 0, ae = {}, Z = [], Te = [], ce = { s: { r: 0, c: 0 }, e: { r: 0, c: 0 } }, Ke = y.sheetRows || 0;
    if (S[2] == 0 && (S[3] == 8 || S[3] == 9) && S.length >= 16 && S[14] == 5 && S[15] === 108)
      throw new Error("Unsupported Works 3 for Mac file");
    if (S[2] == 2)
      y.Enum = fr, e(S, function(ne, lr, Sr) {
        switch (Sr) {
          case 0:
            y.vers = ne, ne >= 4096 && (y.qpro = !0);
            break;
          case 6:
            ce = ne;
            break;
          case 204:
            ne && (ie = ne);
            break;
          case 222:
            ie = ne;
            break;
          case 15:
          case 51:
            y.qpro || (ne[1].v = ne[1].v.slice(1));
          case 13:
          case 14:
          case 16:
            Sr == 14 && (ne[2] & 112) == 112 && (ne[2] & 15) > 1 && (ne[2] & 15) < 15 && (ne[1].z = y.dateNF || Ce[14], y.cellDates && (ne[1].t = "d", ne[1].v = qa(ne[1].v))), y.qpro && ne[3] > se && (A["!ref"] = Ne(ce), ae[H] = A, Z.push(H), A = y.dense ? [] : {}, ce = { s: { r: 0, c: 0 }, e: { r: 0, c: 0 } }, se = ne[3], H = ie || "Sheet" + (se + 1), ie = "");
            var Vr = y.dense ? (A[ne[0].r] || [])[ne[0].c] : A[me(ne[0])];
            if (Vr) {
              Vr.t = ne[1].t, Vr.v = ne[1].v, ne[1].z != null && (Vr.z = ne[1].z), ne[1].f != null && (Vr.f = ne[1].f);
              break;
            }
            y.dense ? (A[ne[0].r] || (A[ne[0].r] = []), A[ne[0].r][ne[0].c] = ne[1]) : A[me(ne[0])] = ne[1];
            break;
        }
      }, y);
    else if (S[2] == 26 || S[2] == 14)
      y.Enum = rr, S[2] == 14 && (y.qpro = !0, S.l = 0), e(S, function(ne, lr, Sr) {
        switch (Sr) {
          case 204:
            H = ne;
            break;
          case 22:
            ne[1].v = ne[1].v.slice(1);
          case 23:
          case 24:
          case 25:
          case 37:
          case 39:
          case 40:
            if (ne[3] > se && (A["!ref"] = Ne(ce), ae[H] = A, Z.push(H), A = y.dense ? [] : {}, ce = { s: { r: 0, c: 0 }, e: { r: 0, c: 0 } }, se = ne[3], H = "Sheet" + (se + 1)), Ke > 0 && ne[0].r >= Ke)
              break;
            y.dense ? (A[ne[0].r] || (A[ne[0].r] = []), A[ne[0].r][ne[0].c] = ne[1]) : A[me(ne[0])] = ne[1], ce.e.c < ne[0].c && (ce.e.c = ne[0].c), ce.e.r < ne[0].r && (ce.e.r = ne[0].r);
            break;
          case 27:
            ne[14e3] && (Te[ne[14e3][0]] = ne[14e3][1]);
            break;
          case 1537:
            Te[ne[0]] = ne[1], ne[0] == se && (H = ne[1]);
            break;
        }
      }, y);
    else
      throw new Error("Unrecognized LOTUS BOF " + S[2]);
    if (A["!ref"] = Ne(ce), ae[ie || H] = A, Z.push(ie || H), !Te.length)
      return { SheetNames: Z, Sheets: ae };
    for (var xe = {}, wr = [], Fe = 0; Fe < Te.length; ++Fe)
      ae[Z[Fe]] ? (wr.push(Te[Fe] || Z[Fe]), xe[Te[Fe]] = ae[Te[Fe]] || ae[Z[Fe]]) : (wr.push(Te[Fe]), xe[Te[Fe]] = { "!ref": "A1" });
    return { SheetNames: wr, Sheets: xe };
  }
  function n(S, P) {
    var y = P || {};
    if (+y.codepage >= 0 && It(+y.codepage), y.type == "string")
      throw new Error("Cannot write WK1 to JS string");
    var A = Ze(), H = Ee(S["!ref"]), ie = Array.isArray(S), se = [];
    J(A, 0, i(1030)), J(A, 6, o(H));
    for (var ae = Math.min(H.e.r, 8191), Z = H.s.r; Z <= ae; ++Z)
      for (var Te = Ge(Z), ce = H.s.c; ce <= H.e.c; ++ce) {
        Z === H.s.r && (se[ce] = $e(ce));
        var Ke = se[ce] + Te, xe = ie ? (S[Z] || [])[ce] : S[Ke];
        if (!(!xe || xe.t == "z"))
          if (xe.t == "n")
            (xe.v | 0) == xe.v && xe.v >= -32768 && xe.v <= 32767 ? J(A, 13, p(Z, ce, xe.v)) : J(A, 14, x(Z, ce, xe.v));
          else {
            var wr = Nr(xe);
            J(A, 15, u(Z, ce, wr.slice(0, 239)));
          }
      }
    return J(A, 1), A.end();
  }
  function a(S, P) {
    var y = P || {};
    if (+y.codepage >= 0 && It(+y.codepage), y.type == "string")
      throw new Error("Cannot write WK3 to JS string");
    var A = Ze();
    J(A, 0, s(S));
    for (var H = 0, ie = 0; H < S.SheetNames.length; ++H)
      (S.Sheets[S.SheetNames[H]] || {})["!ref"] && J(A, 27, Pe(S.SheetNames[H], ie++));
    var se = 0;
    for (H = 0; H < S.SheetNames.length; ++H) {
      var ae = S.Sheets[S.SheetNames[H]];
      if (!(!ae || !ae["!ref"])) {
        for (var Z = Ee(ae["!ref"]), Te = Array.isArray(ae), ce = [], Ke = Math.min(Z.e.r, 8191), xe = Z.s.r; xe <= Ke; ++xe)
          for (var wr = Ge(xe), Fe = Z.s.c; Fe <= Z.e.c; ++Fe) {
            xe === Z.s.r && (ce[Fe] = $e(Fe));
            var ne = ce[Fe] + wr, lr = Te ? (ae[xe] || [])[Fe] : ae[ne];
            if (!(!lr || lr.t == "z"))
              if (lr.t == "n")
                J(A, 23, V(xe, Fe, se, lr.v));
              else {
                var Sr = Nr(lr);
                J(A, 22, D(xe, Fe, se, Sr.slice(0, 239)));
              }
          }
        ++se;
      }
    }
    return J(A, 1), A.end();
  }
  function i(S) {
    var P = B(2);
    return P.write_shift(2, S), P;
  }
  function s(S) {
    var P = B(26);
    P.write_shift(2, 4096), P.write_shift(2, 4), P.write_shift(4, 0);
    for (var y = 0, A = 0, H = 0, ie = 0; ie < S.SheetNames.length; ++ie) {
      var se = S.SheetNames[ie], ae = S.Sheets[se];
      if (!(!ae || !ae["!ref"])) {
        ++H;
        var Z = sr(ae["!ref"]);
        y < Z.e.r && (y = Z.e.r), A < Z.e.c && (A = Z.e.c);
      }
    }
    return y > 8191 && (y = 8191), P.write_shift(2, y), P.write_shift(1, H), P.write_shift(1, A), P.write_shift(2, 0), P.write_shift(2, 0), P.write_shift(1, 1), P.write_shift(1, 2), P.write_shift(4, 0), P.write_shift(4, 0), P;
  }
  function f(S, P, y) {
    var A = { s: { c: 0, r: 0 }, e: { c: 0, r: 0 } };
    return P == 8 && y.qpro ? (A.s.c = S.read_shift(1), S.l++, A.s.r = S.read_shift(2), A.e.c = S.read_shift(1), S.l++, A.e.r = S.read_shift(2), A) : (A.s.c = S.read_shift(2), A.s.r = S.read_shift(2), P == 12 && y.qpro && (S.l += 2), A.e.c = S.read_shift(2), A.e.r = S.read_shift(2), P == 12 && y.qpro && (S.l += 2), A.s.c == 65535 && (A.s.c = A.e.c = A.s.r = A.e.r = 0), A);
  }
  function o(S) {
    var P = B(8);
    return P.write_shift(2, S.s.c), P.write_shift(2, S.s.r), P.write_shift(2, S.e.c), P.write_shift(2, S.e.r), P;
  }
  function l(S, P, y) {
    var A = [{ c: 0, r: 0 }, { t: "n", v: 0 }, 0, 0];
    return y.qpro && y.vers != 20768 ? (A[0].c = S.read_shift(1), A[3] = S.read_shift(1), A[0].r = S.read_shift(2), S.l += 2) : (A[2] = S.read_shift(1), A[0].c = S.read_shift(2), A[0].r = S.read_shift(2)), A;
  }
  function c(S, P, y) {
    var A = S.l + P, H = l(S, P, y);
    if (H[1].t = "s", y.vers == 20768) {
      S.l++;
      var ie = S.read_shift(1);
      return H[1].v = S.read_shift(ie, "utf8"), H;
    }
    return y.qpro && S.l++, H[1].v = S.read_shift(A - S.l, "cstr"), H;
  }
  function u(S, P, y) {
    var A = B(7 + y.length);
    A.write_shift(1, 255), A.write_shift(2, P), A.write_shift(2, S), A.write_shift(1, 39);
    for (var H = 0; H < A.length; ++H) {
      var ie = y.charCodeAt(H);
      A.write_shift(1, ie >= 128 ? 95 : ie);
    }
    return A.write_shift(1, 0), A;
  }
  function h(S, P, y) {
    var A = l(S, P, y);
    return A[1].v = S.read_shift(2, "i"), A;
  }
  function p(S, P, y) {
    var A = B(7);
    return A.write_shift(1, 255), A.write_shift(2, P), A.write_shift(2, S), A.write_shift(2, y, "i"), A;
  }
  function _(S, P, y) {
    var A = l(S, P, y);
    return A[1].v = S.read_shift(8, "f"), A;
  }
  function x(S, P, y) {
    var A = B(13);
    return A.write_shift(1, 255), A.write_shift(2, P), A.write_shift(2, S), A.write_shift(8, y, "f"), A;
  }
  function g(S, P, y) {
    var A = S.l + P, H = l(S, P, y);
    if (H[1].v = S.read_shift(8, "f"), y.qpro)
      S.l = A;
    else {
      var ie = S.read_shift(2);
      L(S.slice(S.l, S.l + ie), H), S.l += ie;
    }
    return H;
  }
  function C(S, P, y) {
    var A = P & 32768;
    return P &= -32769, P = (A ? S : 0) + (P >= 8192 ? P - 16384 : P), (A ? "" : "$") + (y ? $e(P) : Ge(P));
  }
  var O = {
    51: ["FALSE", 0],
    52: ["TRUE", 0],
    70: ["LEN", 1],
    80: ["SUM", 69],
    81: ["AVERAGEA", 69],
    82: ["COUNTA", 69],
    83: ["MINA", 69],
    84: ["MAXA", 69],
    111: ["T", 1]
  }, F = [
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    // eslint-disable-line no-mixed-spaces-and-tabs
    "",
    "+",
    "-",
    "*",
    "/",
    "^",
    "=",
    "<>",
    // eslint-disable-line no-mixed-spaces-and-tabs
    "<=",
    ">=",
    "<",
    ">",
    "",
    "",
    "",
    "",
    // eslint-disable-line no-mixed-spaces-and-tabs
    "&",
    "",
    "",
    "",
    "",
    "",
    "",
    ""
    // eslint-disable-line no-mixed-spaces-and-tabs
  ];
  function L(S, P) {
    nr(S, 0);
    for (var y = [], A = 0, H = "", ie = "", se = "", ae = ""; S.l < S.length; ) {
      var Z = S[S.l++];
      switch (Z) {
        case 0:
          y.push(S.read_shift(8, "f"));
          break;
        case 1:
          ie = C(P[0].c, S.read_shift(2), !0), H = C(P[0].r, S.read_shift(2), !1), y.push(ie + H);
          break;
        case 2:
          {
            var Te = C(P[0].c, S.read_shift(2), !0), ce = C(P[0].r, S.read_shift(2), !1);
            ie = C(P[0].c, S.read_shift(2), !0), H = C(P[0].r, S.read_shift(2), !1), y.push(Te + ce + ":" + ie + H);
          }
          break;
        case 3:
          if (S.l < S.length) {
            console.error("WK1 premature formula end");
            return;
          }
          break;
        case 4:
          y.push("(" + y.pop() + ")");
          break;
        case 5:
          y.push(S.read_shift(2));
          break;
        case 6:
          {
            for (var Ke = ""; Z = S[S.l++]; )
              Ke += String.fromCharCode(Z);
            y.push('"' + Ke.replace(/"/g, '""') + '"');
          }
          break;
        case 8:
          y.push("-" + y.pop());
          break;
        case 23:
          y.push("+" + y.pop());
          break;
        case 22:
          y.push("NOT(" + y.pop() + ")");
          break;
        case 20:
        case 21:
          ae = y.pop(), se = y.pop(), y.push(["AND", "OR"][Z - 20] + "(" + se + "," + ae + ")");
          break;
        default:
          if (Z < 32 && F[Z])
            ae = y.pop(), se = y.pop(), y.push(se + F[Z] + ae);
          else if (O[Z]) {
            if (A = O[Z][1], A == 69 && (A = S[S.l++]), A > y.length) {
              console.error("WK1 bad formula parse 0x" + Z.toString(16) + ":|" + y.join("|") + "|");
              return;
            }
            var xe = y.slice(-A);
            y.length -= A, y.push(O[Z][0] + "(" + xe.join(",") + ")");
          } else
            return Z <= 7 ? console.error("WK1 invalid opcode " + Z.toString(16)) : Z <= 24 ? console.error("WK1 unsupported op " + Z.toString(16)) : Z <= 30 ? console.error("WK1 invalid opcode " + Z.toString(16)) : Z <= 115 ? console.error("WK1 unsupported function opcode " + Z.toString(16)) : console.error("WK1 unrecognized opcode " + Z.toString(16));
      }
    }
    y.length == 1 ? P[1].f = "" + y[0] : console.error("WK1 bad formula parse |" + y.join("|") + "|");
  }
  function j(S) {
    var P = [{ c: 0, r: 0 }, { t: "n", v: 0 }, 0];
    return P[0].r = S.read_shift(2), P[3] = S[S.l++], P[0].c = S[S.l++], P;
  }
  function Q(S, P) {
    var y = j(S);
    return y[1].t = "s", y[1].v = S.read_shift(P - 4, "cstr"), y;
  }
  function D(S, P, y, A) {
    var H = B(6 + A.length);
    H.write_shift(2, S), H.write_shift(1, y), H.write_shift(1, P), H.write_shift(1, 39);
    for (var ie = 0; ie < A.length; ++ie) {
      var se = A.charCodeAt(ie);
      H.write_shift(1, se >= 128 ? 95 : se);
    }
    return H.write_shift(1, 0), H;
  }
  function U(S, P) {
    var y = j(S);
    y[1].v = S.read_shift(2);
    var A = y[1].v >> 1;
    if (y[1].v & 1)
      switch (A & 7) {
        case 0:
          A = (A >> 3) * 5e3;
          break;
        case 1:
          A = (A >> 3) * 500;
          break;
        case 2:
          A = (A >> 3) / 20;
          break;
        case 3:
          A = (A >> 3) / 200;
          break;
        case 4:
          A = (A >> 3) / 2e3;
          break;
        case 5:
          A = (A >> 3) / 2e4;
          break;
        case 6:
          A = (A >> 3) / 16;
          break;
        case 7:
          A = (A >> 3) / 64;
          break;
      }
    return y[1].v = A, y;
  }
  function M(S, P) {
    var y = j(S), A = S.read_shift(4), H = S.read_shift(4), ie = S.read_shift(2);
    if (ie == 65535)
      return A === 0 && H === 3221225472 ? (y[1].t = "e", y[1].v = 15) : A === 0 && H === 3489660928 ? (y[1].t = "e", y[1].v = 42) : y[1].v = 0, y;
    var se = ie & 32768;
    return ie = (ie & 32767) - 16446, y[1].v = (1 - se * 2) * (H * Math.pow(2, ie + 32) + A * Math.pow(2, ie)), y;
  }
  function V(S, P, y, A) {
    var H = B(14);
    if (H.write_shift(2, S), H.write_shift(1, y), H.write_shift(1, P), A == 0)
      return H.write_shift(4, 0), H.write_shift(4, 0), H.write_shift(2, 65535), H;
    var ie = 0, se = 0, ae = 0, Z = 0;
    return A < 0 && (ie = 1, A = -A), se = Math.log2(A) | 0, A /= Math.pow(2, se - 31), Z = A >>> 0, Z & 2147483648 || (A /= 2, ++se, Z = A >>> 0), A -= Z, Z |= 2147483648, Z >>>= 0, A *= Math.pow(2, 32), ae = A >>> 0, H.write_shift(4, ae), H.write_shift(4, Z), se += 16383 + (ie ? 32768 : 0), H.write_shift(2, se), H;
  }
  function G(S, P) {
    var y = M(S);
    return S.l += P - 14, y;
  }
  function z(S, P) {
    var y = j(S), A = S.read_shift(4);
    return y[1].v = A >> 6, y;
  }
  function re(S, P) {
    var y = j(S), A = S.read_shift(8, "f");
    return y[1].v = A, y;
  }
  function ge(S, P) {
    var y = re(S);
    return S.l += P - 10, y;
  }
  function le(S, P) {
    return S[S.l + P - 1] == 0 ? S.read_shift(P, "cstr") : "";
  }
  function be(S, P) {
    var y = S[S.l++];
    y > P - 1 && (y = P - 1);
    for (var A = ""; A.length < y; )
      A += String.fromCharCode(S[S.l++]);
    return A;
  }
  function Oe(S, P, y) {
    if (!(!y.qpro || P < 21)) {
      var A = S.read_shift(1);
      S.l += 17, S.l += 1, S.l += 2;
      var H = S.read_shift(P - 21, "cstr");
      return [A, H];
    }
  }
  function ur(S, P) {
    for (var y = {}, A = S.l + P; S.l < A; ) {
      var H = S.read_shift(2);
      if (H == 14e3) {
        for (y[H] = [0, ""], y[H][0] = S.read_shift(2); S[S.l]; )
          y[H][1] += String.fromCharCode(S[S.l]), S.l++;
        S.l++;
      }
    }
    return y;
  }
  function Pe(S, P) {
    var y = B(5 + S.length);
    y.write_shift(2, 14e3), y.write_shift(2, P);
    for (var A = 0; A < S.length; ++A) {
      var H = S.charCodeAt(A);
      y[y.l++] = H > 127 ? 95 : H;
    }
    return y[y.l++] = 0, y;
  }
  var fr = {
    /*::[*/
    0: { n: "BOF", f: Di },
    /*::[*/
    1: { n: "EOF" },
    /*::[*/
    2: { n: "CALCMODE" },
    /*::[*/
    3: { n: "CALCORDER" },
    /*::[*/
    4: { n: "SPLIT" },
    /*::[*/
    5: { n: "SYNC" },
    /*::[*/
    6: { n: "RANGE", f },
    /*::[*/
    7: { n: "WINDOW1" },
    /*::[*/
    8: { n: "COLW1" },
    /*::[*/
    9: { n: "WINTWO" },
    /*::[*/
    10: { n: "COLW2" },
    /*::[*/
    11: { n: "NAME" },
    /*::[*/
    12: { n: "BLANK" },
    /*::[*/
    13: { n: "INTEGER", f: h },
    /*::[*/
    14: { n: "NUMBER", f: _ },
    /*::[*/
    15: { n: "LABEL", f: c },
    /*::[*/
    16: { n: "FORMULA", f: g },
    /*::[*/
    24: { n: "TABLE" },
    /*::[*/
    25: { n: "ORANGE" },
    /*::[*/
    26: { n: "PRANGE" },
    /*::[*/
    27: { n: "SRANGE" },
    /*::[*/
    28: { n: "FRANGE" },
    /*::[*/
    29: { n: "KRANGE1" },
    /*::[*/
    32: { n: "HRANGE" },
    /*::[*/
    35: { n: "KRANGE2" },
    /*::[*/
    36: { n: "PROTEC" },
    /*::[*/
    37: { n: "FOOTER" },
    /*::[*/
    38: { n: "HEADER" },
    /*::[*/
    39: { n: "SETUP" },
    /*::[*/
    40: { n: "MARGINS" },
    /*::[*/
    41: { n: "LABELFMT" },
    /*::[*/
    42: { n: "TITLES" },
    /*::[*/
    43: { n: "SHEETJS" },
    /*::[*/
    45: { n: "GRAPH" },
    /*::[*/
    46: { n: "NGRAPH" },
    /*::[*/
    47: { n: "CALCCOUNT" },
    /*::[*/
    48: { n: "UNFORMATTED" },
    /*::[*/
    49: { n: "CURSORW12" },
    /*::[*/
    50: { n: "WINDOW" },
    /*::[*/
    51: { n: "STRING", f: c },
    /*::[*/
    55: { n: "PASSWORD" },
    /*::[*/
    56: { n: "LOCKED" },
    /*::[*/
    60: { n: "QUERY" },
    /*::[*/
    61: { n: "QUERYNAME" },
    /*::[*/
    62: { n: "PRINT" },
    /*::[*/
    63: { n: "PRINTNAME" },
    /*::[*/
    64: { n: "GRAPH2" },
    /*::[*/
    65: { n: "GRAPHNAME" },
    /*::[*/
    66: { n: "ZOOM" },
    /*::[*/
    67: { n: "SYMSPLIT" },
    /*::[*/
    68: { n: "NSROWS" },
    /*::[*/
    69: { n: "NSCOLS" },
    /*::[*/
    70: { n: "RULER" },
    /*::[*/
    71: { n: "NNAME" },
    /*::[*/
    72: { n: "ACOMM" },
    /*::[*/
    73: { n: "AMACRO" },
    /*::[*/
    74: { n: "PARSE" },
    /*::[*/
    102: { n: "PRANGES??" },
    /*::[*/
    103: { n: "RRANGES??" },
    /*::[*/
    104: { n: "FNAME??" },
    /*::[*/
    105: { n: "MRANGES??" },
    /*::[*/
    204: { n: "SHEETNAMECS", f: le },
    /*::[*/
    222: { n: "SHEETNAMELP", f: be },
    /*::[*/
    65535: { n: "" }
  }, rr = {
    /*::[*/
    0: { n: "BOF" },
    /*::[*/
    1: { n: "EOF" },
    /*::[*/
    2: { n: "PASSWORD" },
    /*::[*/
    3: { n: "CALCSET" },
    /*::[*/
    4: { n: "WINDOWSET" },
    /*::[*/
    5: { n: "SHEETCELLPTR" },
    /*::[*/
    6: { n: "SHEETLAYOUT" },
    /*::[*/
    7: { n: "COLUMNWIDTH" },
    /*::[*/
    8: { n: "HIDDENCOLUMN" },
    /*::[*/
    9: { n: "USERRANGE" },
    /*::[*/
    10: { n: "SYSTEMRANGE" },
    /*::[*/
    11: { n: "ZEROFORCE" },
    /*::[*/
    12: { n: "SORTKEYDIR" },
    /*::[*/
    13: { n: "FILESEAL" },
    /*::[*/
    14: { n: "DATAFILLNUMS" },
    /*::[*/
    15: { n: "PRINTMAIN" },
    /*::[*/
    16: { n: "PRINTSTRING" },
    /*::[*/
    17: { n: "GRAPHMAIN" },
    /*::[*/
    18: { n: "GRAPHSTRING" },
    /*::[*/
    19: { n: "??" },
    /*::[*/
    20: { n: "ERRCELL" },
    /*::[*/
    21: { n: "NACELL" },
    /*::[*/
    22: { n: "LABEL16", f: Q },
    /*::[*/
    23: { n: "NUMBER17", f: M },
    /*::[*/
    24: { n: "NUMBER18", f: U },
    /*::[*/
    25: { n: "FORMULA19", f: G },
    /*::[*/
    26: { n: "FORMULA1A" },
    /*::[*/
    27: { n: "XFORMAT", f: ur },
    /*::[*/
    28: { n: "DTLABELMISC" },
    /*::[*/
    29: { n: "DTLABELCELL" },
    /*::[*/
    30: { n: "GRAPHWINDOW" },
    /*::[*/
    31: { n: "CPA" },
    /*::[*/
    32: { n: "LPLAUTO" },
    /*::[*/
    33: { n: "QUERY" },
    /*::[*/
    34: { n: "HIDDENSHEET" },
    /*::[*/
    35: { n: "??" },
    /*::[*/
    37: { n: "NUMBER25", f: z },
    /*::[*/
    38: { n: "??" },
    /*::[*/
    39: { n: "NUMBER27", f: re },
    /*::[*/
    40: { n: "FORMULA28", f: ge },
    /*::[*/
    142: { n: "??" },
    /*::[*/
    147: { n: "??" },
    /*::[*/
    150: { n: "??" },
    /*::[*/
    151: { n: "??" },
    /*::[*/
    152: { n: "??" },
    /*::[*/
    153: { n: "??" },
    /*::[*/
    154: { n: "??" },
    /*::[*/
    155: { n: "??" },
    /*::[*/
    156: { n: "??" },
    /*::[*/
    163: { n: "??" },
    /*::[*/
    174: { n: "??" },
    /*::[*/
    175: { n: "??" },
    /*::[*/
    176: { n: "??" },
    /*::[*/
    177: { n: "??" },
    /*::[*/
    184: { n: "??" },
    /*::[*/
    185: { n: "??" },
    /*::[*/
    186: { n: "??" },
    /*::[*/
    187: { n: "??" },
    /*::[*/
    188: { n: "??" },
    /*::[*/
    195: { n: "??" },
    /*::[*/
    201: { n: "??" },
    /*::[*/
    204: { n: "SHEETNAMECS", f: le },
    /*::[*/
    205: { n: "??" },
    /*::[*/
    206: { n: "??" },
    /*::[*/
    207: { n: "??" },
    /*::[*/
    208: { n: "??" },
    /*::[*/
    256: { n: "??" },
    /*::[*/
    259: { n: "??" },
    /*::[*/
    260: { n: "??" },
    /*::[*/
    261: { n: "??" },
    /*::[*/
    262: { n: "??" },
    /*::[*/
    263: { n: "??" },
    /*::[*/
    265: { n: "??" },
    /*::[*/
    266: { n: "??" },
    /*::[*/
    267: { n: "??" },
    /*::[*/
    268: { n: "??" },
    /*::[*/
    270: { n: "??" },
    /*::[*/
    271: { n: "??" },
    /*::[*/
    384: { n: "??" },
    /*::[*/
    389: { n: "??" },
    /*::[*/
    390: { n: "??" },
    /*::[*/
    393: { n: "??" },
    /*::[*/
    396: { n: "??" },
    /*::[*/
    512: { n: "??" },
    /*::[*/
    514: { n: "??" },
    /*::[*/
    513: { n: "??" },
    /*::[*/
    516: { n: "??" },
    /*::[*/
    517: { n: "??" },
    /*::[*/
    640: { n: "??" },
    /*::[*/
    641: { n: "??" },
    /*::[*/
    642: { n: "??" },
    /*::[*/
    643: { n: "??" },
    /*::[*/
    644: { n: "??" },
    /*::[*/
    645: { n: "??" },
    /*::[*/
    646: { n: "??" },
    /*::[*/
    647: { n: "??" },
    /*::[*/
    648: { n: "??" },
    /*::[*/
    658: { n: "??" },
    /*::[*/
    659: { n: "??" },
    /*::[*/
    660: { n: "??" },
    /*::[*/
    661: { n: "??" },
    /*::[*/
    662: { n: "??" },
    /*::[*/
    665: { n: "??" },
    /*::[*/
    666: { n: "??" },
    /*::[*/
    768: { n: "??" },
    /*::[*/
    772: { n: "??" },
    /*::[*/
    1537: { n: "SHEETINFOQP", f: Oe },
    /*::[*/
    1600: { n: "??" },
    /*::[*/
    1602: { n: "??" },
    /*::[*/
    1793: { n: "??" },
    /*::[*/
    1794: { n: "??" },
    /*::[*/
    1795: { n: "??" },
    /*::[*/
    1796: { n: "??" },
    /*::[*/
    1920: { n: "??" },
    /*::[*/
    2048: { n: "??" },
    /*::[*/
    2049: { n: "??" },
    /*::[*/
    2052: { n: "??" },
    /*::[*/
    2688: { n: "??" },
    /*::[*/
    10998: { n: "??" },
    /*::[*/
    12849: { n: "??" },
    /*::[*/
    28233: { n: "??" },
    /*::[*/
    28484: { n: "??" },
    /*::[*/
    65535: { n: "" }
  };
  return {
    sheet_to_wk1: n,
    book_to_wk3: a,
    to_workbook: t
  };
}(), Yo = /^\s|\s$|[\t\n\r]/;
function Li(e, t) {
  if (!t.bookSST)
    return "";
  var r = [Ie];
  r[r.length] = Y("sst", null, {
    xmlns: pt[0],
    count: e.Count,
    uniqueCount: e.Unique
  });
  for (var n = 0; n != e.length; ++n)
    if (e[n] != null) {
      var a = e[n], i = "<si>";
      a.r ? i += a.r : (i += "<t", a.t || (a.t = ""), a.t.match(Yo) && (i += ' xml:space="preserve"'), i += ">" + ve(a.t) + "</t>"), i += "</si>", r[r.length] = i;
    }
  return r.length > 2 && (r[r.length] = "</sst>", r[1] = r[1].replace("/>", ">")), r.join("");
}
function Jo(e) {
  return [e.read_shift(4), e.read_shift(4)];
}
function qo(e, t) {
  return t || (t = B(8)), t.write_shift(4, e.Count), t.write_shift(4, e.Unique), t;
}
var Zo = Hl;
function Qo(e) {
  var t = Ze();
  W(t, 159, qo(e));
  for (var r = 0; r < e.length; ++r)
    W(t, 19, Zo(e[r]));
  return W(
    t,
    160
    /* BrtEndSst */
  ), t.end();
}
function ec(e) {
  for (var t = [], r = e.split(""), n = 0; n < r.length; ++n)
    t[n] = r[n].charCodeAt(0);
  return t;
}
function Mi(e) {
  var t = 0, r, n = ec(e), a = n.length + 1, i, s, f, o, l;
  for (r = Kr(a), r[0] = n.length, i = 1; i != a; ++i)
    r[i] = n[i - 1];
  for (i = a - 1; i >= 0; --i)
    s = r[i], f = t & 16384 ? 1 : 0, o = t << 1 & 32767, l = f | o, t = l ^ s;
  return t ^ 52811;
}
var rc = /* @__PURE__ */ function() {
  function e(a, i) {
    switch (i.type) {
      case "base64":
        return t(Rr(a), i);
      case "binary":
        return t(a, i);
      case "buffer":
        return t(ue && Buffer.isBuffer(a) ? a.toString("binary") : bt(a), i);
      case "array":
        return t(wn(a), i);
    }
    throw new Error("Unrecognized type " + i.type);
  }
  function t(a, i) {
    var s = i || {}, f = s.dense ? [] : {}, o = a.match(/\\trowd.*?\\row\b/g);
    if (!o.length)
      throw new Error("RTF missing table");
    var l = { s: { c: 0, r: 0 }, e: { c: 0, r: o.length - 1 } };
    return o.forEach(function(c, u) {
      Array.isArray(f) && (f[u] = []);
      for (var h = /\\\w+\b/g, p = 0, _, x = -1; _ = h.exec(c); ) {
        switch (_[0]) {
          case "\\cell":
            var g = c.slice(p, h.lastIndex - _[0].length);
            if (g[0] == " " && (g = g.slice(1)), ++x, g.length) {
              var C = { v: g, t: "s" };
              Array.isArray(f) ? f[u][x] = C : f[me({ r: u, c: x })] = C;
            }
            break;
        }
        p = h.lastIndex;
      }
      x > l.e.c && (l.e.c = x);
    }), f["!ref"] = Ne(l), f;
  }
  function r(a, i) {
    return Zr(e(a, i), i);
  }
  function n(a) {
    for (var i = ["{\\rtf1\\ansi"], s = Ee(a["!ref"]), f, o = Array.isArray(a), l = s.s.r; l <= s.e.r; ++l) {
      i.push("\\trowd\\trautofit1");
      for (var c = s.s.c; c <= s.e.c; ++c)
        i.push("\\cellx" + (c + 1));
      for (i.push("\\pard\\intbl"), c = s.s.c; c <= s.e.c; ++c) {
        var u = me({ r: l, c });
        f = o ? (a[l] || [])[c] : a[u], !(!f || f.v == null && (!f.f || f.F)) && (i.push(" " + (f.w || (Nr(f), f.w))), i.push("\\cell"));
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
function va(e) {
  for (var t = 0, r = 1; t != 3; ++t)
    r = r * 256 + (e[t] > 255 ? 255 : e[t] < 0 ? 0 : e[t]);
  return r.toString(16).toUpperCase().slice(1);
}
var tc = 6, Or = tc;
function un(e) {
  return Math.floor((e + Math.round(128 / Or) / 256) * Or);
}
function xn(e) {
  return Math.floor((e - 5) / Or * 100 + 0.5) / 100;
}
function jn(e) {
  return Math.round((e * Or + 5) / Or * 256) / 256;
}
function c0(e) {
  e.width ? (e.wpx = un(e.width), e.wch = xn(e.wpx), e.MDW = Or) : e.wpx ? (e.wch = xn(e.wpx), e.width = jn(e.wch), e.MDW = Or) : typeof e.wch == "number" && (e.width = jn(e.wch), e.wpx = un(e.width), e.MDW = Or), e.customWidth && delete e.customWidth;
}
var nc = 96, Bi = nc;
function dn(e) {
  return e * 96 / Bi;
}
function bi(e) {
  return e * Bi / 96;
}
function ac(e) {
  var t = ["<numFmts>"];
  return [[5, 8], [23, 26], [41, 44], [
    /*63*/
    50,
    /*66],[164,*/
    392
  ]].forEach(function(r) {
    for (var n = r[0]; n <= r[1]; ++n)
      e[n] != null && (t[t.length] = Y("numFmt", null, { numFmtId: n, formatCode: ve(e[n]) }));
  }), t.length === 1 ? "" : (t[t.length] = "</numFmts>", t[0] = Y("numFmts", null, { count: t.length - 2 }).replace("/>", ">"), t.join(""));
}
function ic(e) {
  var t = [];
  return t[t.length] = Y("cellXfs", null), e.forEach(function(r) {
    t[t.length] = Y("xf", null, r);
  }), t[t.length] = "</cellXfs>", t.length === 2 ? "" : (t[0] = Y("cellXfs", null, { count: t.length - 2 }).replace("/>", ">"), t.join(""));
}
function Ui(e, t) {
  var r = [Ie, Y("styleSheet", null, {
    xmlns: pt[0],
    "xmlns:vt": Le.vt
  })], n;
  return e.SSF && (n = ac(e.SSF)) != null && (r[r.length] = n), r[r.length] = '<fonts count="1"><font><sz val="12"/><color theme="1"/><name val="Calibri"/><family val="2"/><scheme val="minor"/></font></fonts>', r[r.length] = '<fills count="2"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill></fills>', r[r.length] = '<borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders>', r[r.length] = '<cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>', (n = ic(t.cellXfs)) && (r[r.length] = n), r[r.length] = '<cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles>', r[r.length] = '<dxfs count="0"/>', r[r.length] = '<tableStyles count="0" defaultTableStyle="TableStyleMedium9" defaultPivotStyle="PivotStyleMedium4"/>', r.length > 2 && (r[r.length] = "</styleSheet>", r[1] = r[1].replace("/>", ">")), r.join("");
}
function sc(e, t) {
  var r = e.read_shift(2), n = ze(e);
  return [r, n];
}
function fc(e, t, r) {
  r || (r = B(6 + 4 * t.length)), r.write_shift(2, e), Be(t, r);
  var n = r.length > r.l ? r.slice(0, r.l) : r;
  return r.l == null && (r.l = r.length), n;
}
function lc(e, t, r) {
  var n = {};
  n.sz = e.read_shift(2) / 20;
  var a = Kl(e);
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
  var o = e.read_shift(1);
  switch (o > 0 && (n.charset = o), e.l++, n.color = zl(e), e.read_shift(1)) {
    case 1:
      n.scheme = "major";
      break;
    case 2:
      n.scheme = "minor";
      break;
  }
  return n.name = ze(e), n;
}
function oc(e, t) {
  t || (t = B(25 + 4 * 32)), t.write_shift(2, e.sz * 20), Yl(e, t), t.write_shift(2, e.bold ? 700 : 400);
  var r = 0;
  e.vertAlign == "superscript" ? r = 1 : e.vertAlign == "subscript" && (r = 2), t.write_shift(2, r), t.write_shift(1, e.underline || 0), t.write_shift(1, e.family || 0), t.write_shift(1, e.charset || 0), t.write_shift(1, 0), cn(e.color, t);
  var n = 0;
  return e.scheme == "major" && (n = 1), e.scheme == "minor" && (n = 2), t.write_shift(1, n), Be(e.name, t), t.length > t.l ? t.slice(0, t.l) : t;
}
var cc = [
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
], Bn, hc = Er;
function ma(e, t) {
  t || (t = B(4 * 3 + 8 * 7 + 16 * 1)), Bn || (Bn = Zn(cc));
  var r = Bn[e.patternType];
  r == null && (r = 40), t.write_shift(4, r);
  var n = 0;
  if (r != 40)
    for (cn({ auto: 1 }, t), cn({ auto: 1 }, t); n < 12; ++n)
      t.write_shift(4, 0);
  else {
    for (; n < 4; ++n)
      t.write_shift(4, 0);
    for (; n < 12; ++n)
      t.write_shift(4, 0);
  }
  return t.length > t.l ? t.slice(0, t.l) : t;
}
function uc(e, t) {
  var r = e.l + t, n = e.read_shift(2), a = e.read_shift(2);
  return e.l = r, { ixfe: n, numFmtId: a };
}
function Wi(e, t, r) {
  r || (r = B(16)), r.write_shift(2, t || 0), r.write_shift(2, e.numFmtId || 0), r.write_shift(2, 0), r.write_shift(2, 0), r.write_shift(2, 0), r.write_shift(1, 0), r.write_shift(1, 0);
  var n = 0;
  return r.write_shift(1, n), r.write_shift(1, 0), r.write_shift(1, 0), r.write_shift(1, 0), r;
}
function St(e, t) {
  return t || (t = B(10)), t.write_shift(1, 0), t.write_shift(1, 0), t.write_shift(4, 0), t.write_shift(4, 0), t;
}
var xc = Er;
function dc(e, t) {
  return t || (t = B(51)), t.write_shift(1, 0), St(null, t), St(null, t), St(null, t), St(null, t), St(null, t), t.length > t.l ? t.slice(0, t.l) : t;
}
function pc(e, t) {
  return t || (t = B(12 + 4 * 10)), t.write_shift(4, e.xfId), t.write_shift(2, 1), t.write_shift(1, +e.builtinId), t.write_shift(1, 0), on(e.name || "", t), t.length > t.l ? t.slice(0, t.l) : t;
}
function vc(e, t, r) {
  var n = B(2052);
  return n.write_shift(4, e), on(t, n), on(r, n), n.length > n.l ? n.slice(0, n.l) : n;
}
function mc(e, t) {
  if (t) {
    var r = 0;
    [[5, 8], [23, 26], [41, 44], [
      /*63*/
      50,
      /*66],[164,*/
      392
    ]].forEach(function(n) {
      for (var a = n[0]; a <= n[1]; ++a)
        t[a] != null && ++r;
    }), r != 0 && (W(e, 615, mr(r)), [[5, 8], [23, 26], [41, 44], [
      /*63*/
      50,
      /*66],[164,*/
      392
    ]].forEach(function(n) {
      for (var a = n[0]; a <= n[1]; ++a)
        t[a] != null && W(e, 44, fc(a, t[a]));
    }), W(
      e,
      616
      /* BrtEndFmts */
    ));
  }
}
function gc(e) {
  var t = 1;
  W(e, 611, mr(t)), W(e, 43, oc({
    sz: 12,
    color: { theme: 1 },
    name: "Calibri",
    family: 2,
    scheme: "minor"
  })), W(
    e,
    612
    /* BrtEndFonts */
  );
}
function _c(e) {
  var t = 2;
  W(e, 603, mr(t)), W(e, 45, ma({ patternType: "none" })), W(e, 45, ma({ patternType: "gray125" })), W(
    e,
    604
    /* BrtEndFills */
  );
}
function Tc(e) {
  var t = 1;
  W(e, 613, mr(t)), W(e, 46, dc()), W(
    e,
    614
    /* BrtEndBorders */
  );
}
function Ec(e) {
  var t = 1;
  W(e, 626, mr(t)), W(e, 47, Wi({
    numFmtId: 0,
    fontId: 0,
    fillId: 0,
    borderId: 0
  }, 65535)), W(
    e,
    627
    /* BrtEndCellStyleXFs */
  );
}
function wc(e, t) {
  W(e, 617, mr(t.length)), t.forEach(function(r) {
    W(e, 47, Wi(r, 0));
  }), W(
    e,
    618
    /* BrtEndCellXFs */
  );
}
function Sc(e) {
  var t = 1;
  W(e, 619, mr(t)), W(e, 48, pc({
    xfId: 0,
    builtinId: 0,
    name: "Normal"
  })), W(
    e,
    620
    /* BrtEndStyles */
  );
}
function Ac(e) {
  var t = 0;
  W(e, 505, mr(t)), W(
    e,
    506
    /* BrtEndDXFs */
  );
}
function Fc(e) {
  var t = 0;
  W(e, 508, vc(t, "TableStyleMedium9", "PivotStyleMedium4")), W(
    e,
    509
    /* BrtEndTableStyles */
  );
}
function yc(e, t) {
  var r = Ze();
  return W(
    r,
    278
    /* BrtBeginStyleSheet */
  ), mc(r, e.SSF), gc(r), _c(r), Tc(r), Ec(r), wc(r, t.cellXfs), Sc(r), Ac(r), Fc(r), W(
    r,
    279
    /* BrtEndStyleSheet */
  ), r.end();
}
function Hi(e, t) {
  if (t && t.themeXLSX)
    return t.themeXLSX;
  if (e && typeof e.raw == "string")
    return e.raw;
  var r = [Ie];
  return r[r.length] = '<a:theme xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" name="Office Theme">', r[r.length] = "<a:themeElements>", r[r.length] = '<a:clrScheme name="Office">', r[r.length] = '<a:dk1><a:sysClr val="windowText" lastClr="000000"/></a:dk1>', r[r.length] = '<a:lt1><a:sysClr val="window" lastClr="FFFFFF"/></a:lt1>', r[r.length] = '<a:dk2><a:srgbClr val="1F497D"/></a:dk2>', r[r.length] = '<a:lt2><a:srgbClr val="EEECE1"/></a:lt2>', r[r.length] = '<a:accent1><a:srgbClr val="4F81BD"/></a:accent1>', r[r.length] = '<a:accent2><a:srgbClr val="C0504D"/></a:accent2>', r[r.length] = '<a:accent3><a:srgbClr val="9BBB59"/></a:accent3>', r[r.length] = '<a:accent4><a:srgbClr val="8064A2"/></a:accent4>', r[r.length] = '<a:accent5><a:srgbClr val="4BACC6"/></a:accent5>', r[r.length] = '<a:accent6><a:srgbClr val="F79646"/></a:accent6>', r[r.length] = '<a:hlink><a:srgbClr val="0000FF"/></a:hlink>', r[r.length] = '<a:folHlink><a:srgbClr val="800080"/></a:folHlink>', r[r.length] = "</a:clrScheme>", r[r.length] = '<a:fontScheme name="Office">', r[r.length] = "<a:majorFont>", r[r.length] = '<a:latin typeface="Cambria"/>', r[r.length] = '<a:ea typeface=""/>', r[r.length] = '<a:cs typeface=""/>', r[r.length] = '<a:font script="Jpan" typeface="ＭＳ Ｐゴシック"/>', r[r.length] = '<a:font script="Hang" typeface="맑은 고딕"/>', r[r.length] = '<a:font script="Hans" typeface="宋体"/>', r[r.length] = '<a:font script="Hant" typeface="新細明體"/>', r[r.length] = '<a:font script="Arab" typeface="Times New Roman"/>', r[r.length] = '<a:font script="Hebr" typeface="Times New Roman"/>', r[r.length] = '<a:font script="Thai" typeface="Tahoma"/>', r[r.length] = '<a:font script="Ethi" typeface="Nyala"/>', r[r.length] = '<a:font script="Beng" typeface="Vrinda"/>', r[r.length] = '<a:font script="Gujr" typeface="Shruti"/>', r[r.length] = '<a:font script="Khmr" typeface="MoolBoran"/>', r[r.length] = '<a:font script="Knda" typeface="Tunga"/>', r[r.length] = '<a:font script="Guru" typeface="Raavi"/>', r[r.length] = '<a:font script="Cans" typeface="Euphemia"/>', r[r.length] = '<a:font script="Cher" typeface="Plantagenet Cherokee"/>', r[r.length] = '<a:font script="Yiii" typeface="Microsoft Yi Baiti"/>', r[r.length] = '<a:font script="Tibt" typeface="Microsoft Himalaya"/>', r[r.length] = '<a:font script="Thaa" typeface="MV Boli"/>', r[r.length] = '<a:font script="Deva" typeface="Mangal"/>', r[r.length] = '<a:font script="Telu" typeface="Gautami"/>', r[r.length] = '<a:font script="Taml" typeface="Latha"/>', r[r.length] = '<a:font script="Syrc" typeface="Estrangelo Edessa"/>', r[r.length] = '<a:font script="Orya" typeface="Kalinga"/>', r[r.length] = '<a:font script="Mlym" typeface="Kartika"/>', r[r.length] = '<a:font script="Laoo" typeface="DokChampa"/>', r[r.length] = '<a:font script="Sinh" typeface="Iskoola Pota"/>', r[r.length] = '<a:font script="Mong" typeface="Mongolian Baiti"/>', r[r.length] = '<a:font script="Viet" typeface="Times New Roman"/>', r[r.length] = '<a:font script="Uigh" typeface="Microsoft Uighur"/>', r[r.length] = '<a:font script="Geor" typeface="Sylfaen"/>', r[r.length] = "</a:majorFont>", r[r.length] = "<a:minorFont>", r[r.length] = '<a:latin typeface="Calibri"/>', r[r.length] = '<a:ea typeface=""/>', r[r.length] = '<a:cs typeface=""/>', r[r.length] = '<a:font script="Jpan" typeface="ＭＳ Ｐゴシック"/>', r[r.length] = '<a:font script="Hang" typeface="맑은 고딕"/>', r[r.length] = '<a:font script="Hans" typeface="宋体"/>', r[r.length] = '<a:font script="Hant" typeface="新細明體"/>', r[r.length] = '<a:font script="Arab" typeface="Arial"/>', r[r.length] = '<a:font script="Hebr" typeface="Arial"/>', r[r.length] = '<a:font script="Thai" typeface="Tahoma"/>', r[r.length] = '<a:font script="Ethi" typeface="Nyala"/>', r[r.length] = '<a:font script="Beng" typeface="Vrinda"/>', r[r.length] = '<a:font script="Gujr" typeface="Shruti"/>', r[r.length] = '<a:font script="Khmr" typeface="DaunPenh"/>', r[r.length] = '<a:font script="Knda" typeface="Tunga"/>', r[r.length] = '<a:font script="Guru" typeface="Raavi"/>', r[r.length] = '<a:font script="Cans" typeface="Euphemia"/>', r[r.length] = '<a:font script="Cher" typeface="Plantagenet Cherokee"/>', r[r.length] = '<a:font script="Yiii" typeface="Microsoft Yi Baiti"/>', r[r.length] = '<a:font script="Tibt" typeface="Microsoft Himalaya"/>', r[r.length] = '<a:font script="Thaa" typeface="MV Boli"/>', r[r.length] = '<a:font script="Deva" typeface="Mangal"/>', r[r.length] = '<a:font script="Telu" typeface="Gautami"/>', r[r.length] = '<a:font script="Taml" typeface="Latha"/>', r[r.length] = '<a:font script="Syrc" typeface="Estrangelo Edessa"/>', r[r.length] = '<a:font script="Orya" typeface="Kalinga"/>', r[r.length] = '<a:font script="Mlym" typeface="Kartika"/>', r[r.length] = '<a:font script="Laoo" typeface="DokChampa"/>', r[r.length] = '<a:font script="Sinh" typeface="Iskoola Pota"/>', r[r.length] = '<a:font script="Mong" typeface="Mongolian Baiti"/>', r[r.length] = '<a:font script="Viet" typeface="Arial"/>', r[r.length] = '<a:font script="Uigh" typeface="Microsoft Uighur"/>', r[r.length] = '<a:font script="Geor" typeface="Sylfaen"/>', r[r.length] = "</a:minorFont>", r[r.length] = "</a:fontScheme>", r[r.length] = '<a:fmtScheme name="Office">', r[r.length] = "<a:fillStyleLst>", r[r.length] = '<a:solidFill><a:schemeClr val="phClr"/></a:solidFill>', r[r.length] = '<a:gradFill rotWithShape="1">', r[r.length] = "<a:gsLst>", r[r.length] = '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="50000"/><a:satMod val="300000"/></a:schemeClr></a:gs>', r[r.length] = '<a:gs pos="35000"><a:schemeClr val="phClr"><a:tint val="37000"/><a:satMod val="300000"/></a:schemeClr></a:gs>', r[r.length] = '<a:gs pos="100000"><a:schemeClr val="phClr"><a:tint val="15000"/><a:satMod val="350000"/></a:schemeClr></a:gs>', r[r.length] = "</a:gsLst>", r[r.length] = '<a:lin ang="16200000" scaled="1"/>', r[r.length] = "</a:gradFill>", r[r.length] = '<a:gradFill rotWithShape="1">', r[r.length] = "<a:gsLst>", r[r.length] = '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="100000"/><a:shade val="100000"/><a:satMod val="130000"/></a:schemeClr></a:gs>', r[r.length] = '<a:gs pos="100000"><a:schemeClr val="phClr"><a:tint val="50000"/><a:shade val="100000"/><a:satMod val="350000"/></a:schemeClr></a:gs>', r[r.length] = "</a:gsLst>", r[r.length] = '<a:lin ang="16200000" scaled="0"/>', r[r.length] = "</a:gradFill>", r[r.length] = "</a:fillStyleLst>", r[r.length] = "<a:lnStyleLst>", r[r.length] = '<a:ln w="9525" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"><a:shade val="95000"/><a:satMod val="105000"/></a:schemeClr></a:solidFill><a:prstDash val="solid"/></a:ln>', r[r.length] = '<a:ln w="25400" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln>', r[r.length] = '<a:ln w="38100" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln>', r[r.length] = "</a:lnStyleLst>", r[r.length] = "<a:effectStyleLst>", r[r.length] = "<a:effectStyle>", r[r.length] = "<a:effectLst>", r[r.length] = '<a:outerShdw blurRad="40000" dist="20000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="38000"/></a:srgbClr></a:outerShdw>', r[r.length] = "</a:effectLst>", r[r.length] = "</a:effectStyle>", r[r.length] = "<a:effectStyle>", r[r.length] = "<a:effectLst>", r[r.length] = '<a:outerShdw blurRad="40000" dist="23000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="35000"/></a:srgbClr></a:outerShdw>', r[r.length] = "</a:effectLst>", r[r.length] = "</a:effectStyle>", r[r.length] = "<a:effectStyle>", r[r.length] = "<a:effectLst>", r[r.length] = '<a:outerShdw blurRad="40000" dist="23000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="35000"/></a:srgbClr></a:outerShdw>', r[r.length] = "</a:effectLst>", r[r.length] = '<a:scene3d><a:camera prst="orthographicFront"><a:rot lat="0" lon="0" rev="0"/></a:camera><a:lightRig rig="threePt" dir="t"><a:rot lat="0" lon="0" rev="1200000"/></a:lightRig></a:scene3d>', r[r.length] = '<a:sp3d><a:bevelT w="63500" h="25400"/></a:sp3d>', r[r.length] = "</a:effectStyle>", r[r.length] = "</a:effectStyleLst>", r[r.length] = "<a:bgFillStyleLst>", r[r.length] = '<a:solidFill><a:schemeClr val="phClr"/></a:solidFill>', r[r.length] = '<a:gradFill rotWithShape="1">', r[r.length] = "<a:gsLst>", r[r.length] = '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="40000"/><a:satMod val="350000"/></a:schemeClr></a:gs>', r[r.length] = '<a:gs pos="40000"><a:schemeClr val="phClr"><a:tint val="45000"/><a:shade val="99000"/><a:satMod val="350000"/></a:schemeClr></a:gs>', r[r.length] = '<a:gs pos="100000"><a:schemeClr val="phClr"><a:shade val="20000"/><a:satMod val="255000"/></a:schemeClr></a:gs>', r[r.length] = "</a:gsLst>", r[r.length] = '<a:path path="circle"><a:fillToRect l="50000" t="-80000" r="50000" b="180000"/></a:path>', r[r.length] = "</a:gradFill>", r[r.length] = '<a:gradFill rotWithShape="1">', r[r.length] = "<a:gsLst>", r[r.length] = '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="80000"/><a:satMod val="300000"/></a:schemeClr></a:gs>', r[r.length] = '<a:gs pos="100000"><a:schemeClr val="phClr"><a:shade val="30000"/><a:satMod val="200000"/></a:schemeClr></a:gs>', r[r.length] = "</a:gsLst>", r[r.length] = '<a:path path="circle"><a:fillToRect l="50000" t="50000" r="50000" b="50000"/></a:path>', r[r.length] = "</a:gradFill>", r[r.length] = "</a:bgFillStyleLst>", r[r.length] = "</a:fmtScheme>", r[r.length] = "</a:themeElements>", r[r.length] = "<a:objectDefaults>", r[r.length] = "<a:spDef>", r[r.length] = '<a:spPr/><a:bodyPr/><a:lstStyle/><a:style><a:lnRef idx="1"><a:schemeClr val="accent1"/></a:lnRef><a:fillRef idx="3"><a:schemeClr val="accent1"/></a:fillRef><a:effectRef idx="2"><a:schemeClr val="accent1"/></a:effectRef><a:fontRef idx="minor"><a:schemeClr val="lt1"/></a:fontRef></a:style>', r[r.length] = "</a:spDef>", r[r.length] = "<a:lnDef>", r[r.length] = '<a:spPr/><a:bodyPr/><a:lstStyle/><a:style><a:lnRef idx="2"><a:schemeClr val="accent1"/></a:lnRef><a:fillRef idx="0"><a:schemeClr val="accent1"/></a:fillRef><a:effectRef idx="1"><a:schemeClr val="accent1"/></a:effectRef><a:fontRef idx="minor"><a:schemeClr val="tx1"/></a:fontRef></a:style>', r[r.length] = "</a:lnDef>", r[r.length] = "</a:objectDefaults>", r[r.length] = "<a:extraClrSchemeLst/>", r[r.length] = "</a:theme>", r.join("");
}
function Cc(e, t) {
  return {
    flags: e.read_shift(4),
    version: e.read_shift(4),
    name: ze(e)
  };
}
function Oc(e) {
  var t = B(12 + 2 * e.name.length);
  return t.write_shift(4, e.flags), t.write_shift(4, e.version), Be(e.name, t), t.slice(0, t.l);
}
function Dc(e) {
  for (var t = [], r = e.read_shift(4); r-- > 0; )
    t.push([e.read_shift(4), e.read_shift(4)]);
  return t;
}
function Rc(e) {
  var t = B(4 + 8 * e.length);
  t.write_shift(4, e.length);
  for (var r = 0; r < e.length; ++r)
    t.write_shift(4, e[r][0]), t.write_shift(4, e[r][1]);
  return t;
}
function Nc(e, t) {
  var r = B(8 + 2 * t.length);
  return r.write_shift(4, e), Be(t, r), r.slice(0, r.l);
}
function Ic(e) {
  return e.l += 4, e.read_shift(4) != 0;
}
function kc(e, t) {
  var r = B(8);
  return r.write_shift(4, e), r.write_shift(4, t ? 1 : 0), r;
}
function Pc() {
  var e = Ze();
  return W(e, 332), W(e, 334, mr(1)), W(e, 335, Oc({
    name: "XLDAPR",
    version: 12e4,
    flags: 3496657072
  })), W(e, 336), W(e, 339, Nc(1, "XLDAPR")), W(e, 52), W(e, 35, mr(514)), W(e, 4096, mr(0)), W(e, 4097, cr(1)), W(e, 36), W(e, 53), W(e, 340), W(e, 337, kc(1, !0)), W(e, 51, Rc([[1, 0]])), W(e, 338), W(e, 333), e.end();
}
function Vi() {
  var e = [Ie];
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
function Lc(e) {
  var t = {};
  t.i = e.read_shift(4);
  var r = {};
  r.r = e.read_shift(4), r.c = e.read_shift(4), t.r = me(r);
  var n = e.read_shift(1);
  return n & 2 && (t.l = "1"), n & 8 && (t.a = "1"), t;
}
var lt = 1024;
function Gi(e, t) {
  for (var r = [21600, 21600], n = ["m0,0l0", r[1], r[0], r[1], r[0], "0xe"].join(","), a = [
    Y("xml", null, { "xmlns:v": ar.v, "xmlns:o": ar.o, "xmlns:x": ar.x, "xmlns:mv": ar.mv }).replace(/\/>/, ">"),
    Y("o:shapelayout", Y("o:idmap", null, { "v:ext": "edit", data: e }), { "v:ext": "edit" }),
    Y("v:shapetype", [
      Y("v:stroke", null, { joinstyle: "miter" }),
      Y("v:path", null, { gradientshapeok: "t", "o:connecttype": "rect" })
    ].join(""), { id: "_x0000_t202", "o:spt": 202, coordsize: r.join(","), path: n })
  ]; lt < e * 1e3; )
    lt += 1e3;
  return t.forEach(function(i) {
    var s = Me(i[0]), f = (
      /*::(*/
      { color2: "#BEFF82", type: "gradient" }
    );
    f.type == "gradient" && (f.angle = "-180");
    var o = f.type == "gradient" ? Y("o:fill", null, { type: "gradientUnscaled", "v:ext": "view" }) : null, l = Y("v:fill", o, f), c = { on: "t", obscured: "t" };
    ++lt, a = a.concat([
      "<v:shape" + Lt({
        id: "_x0000_s" + lt,
        type: "#_x0000_t202",
        style: "position:absolute; margin-left:80pt;margin-top:5pt;width:104pt;height:64pt;z-index:10" + (i[1].hidden ? ";visibility:hidden" : ""),
        fillcolor: "#ECFAD4",
        strokecolor: "#edeaa1"
      }) + ">",
      l,
      Y("v:shadow", null, c),
      Y("v:path", null, { "o:connecttype": "none" }),
      '<v:textbox><div style="text-align:left"></div></v:textbox>',
      '<x:ClientData ObjectType="Note">',
      "<x:MoveWithCells/>",
      "<x:SizeWithCells/>",
      /* Part 4 19.4.2.3 Anchor (Anchor) */
      Ve("x:Anchor", [s.c + 1, 0, s.r + 1, 0, s.c + 3, 20, s.r + 5, 20].join(",")),
      Ve("x:AutoFill", "False"),
      Ve("x:Row", String(s.r)),
      Ve("x:Column", String(s.c)),
      i[1].hidden ? "" : "<x:Visible/>",
      "</x:ClientData>",
      "</v:shape>"
    ]);
  }), a.push("</xml>"), a.join("");
}
function Xi(e) {
  var t = [Ie, Y("comments", null, { xmlns: pt[0] })], r = [];
  return t.push("<authors>"), e.forEach(function(n) {
    n[1].forEach(function(a) {
      var i = ve(a.a);
      r.indexOf(i) == -1 && (r.push(i), t.push("<author>" + i + "</author>")), a.T && a.ID && r.indexOf("tc=" + a.ID) == -1 && (r.push("tc=" + a.ID), t.push("<author>tc=" + a.ID + "</author>"));
    });
  }), r.length == 0 && (r.push("SheetJ5"), t.push("<author>SheetJ5</author>")), t.push("</authors>"), t.push("<commentList>"), e.forEach(function(n) {
    var a = 0, i = [];
    if (n[1][0] && n[1][0].T && n[1][0].ID ? a = r.indexOf("tc=" + n[1][0].ID) : n[1].forEach(function(o) {
      o.a && (a = r.indexOf(ve(o.a))), i.push(o.t || "");
    }), t.push('<comment ref="' + n[0] + '" authorId="' + a + '"><text>'), i.length <= 1)
      t.push(Ve("t", ve(i[0] || "")));
    else {
      for (var s = `Comment:
    ` + i[0] + `
`, f = 1; f < i.length; ++f)
        s += `Reply:
    ` + i[f] + `
`;
      t.push(Ve("t", ve(s)));
    }
    t.push("</text></comment>");
  }), t.push("</commentList>"), t.length > 2 && (t[t.length] = "</comments>", t[1] = t[1].replace("/>", ">")), t.join("");
}
function Mc(e, t, r) {
  var n = [Ie, Y("ThreadedComments", null, { xmlns: Le.TCMNT }).replace(/[\/]>/, ">")];
  return e.forEach(function(a) {
    var i = "";
    (a[1] || []).forEach(function(s, f) {
      if (!s.T) {
        delete s.ID;
        return;
      }
      s.a && t.indexOf(s.a) == -1 && t.push(s.a);
      var o = {
        ref: a[0],
        id: "{54EE7951-7262-4200-6969-" + ("000000000000" + r.tcid++).slice(-12) + "}"
      };
      f == 0 ? i = o.id : o.parentId = i, s.ID = o.id, s.a && (o.personId = "{54EE7950-7262-4200-6969-" + ("000000000000" + t.indexOf(s.a)).slice(-12) + "}"), n.push(Y("threadedComment", Ve("text", s.t || ""), o));
    });
  }), n.push("</ThreadedComments>"), n.join("");
}
function Bc(e) {
  var t = [Ie, Y("personList", null, {
    xmlns: Le.TCMNT,
    "xmlns:x": pt[0]
  }).replace(/[\/]>/, ">")];
  return e.forEach(function(r, n) {
    t.push(Y("person", null, {
      displayName: r,
      id: "{54EE7950-7262-4200-6969-" + ("000000000000" + n).slice(-12) + "}",
      userId: r,
      providerId: "None"
    }));
  }), t.push("</personList>"), t.join("");
}
function bc(e) {
  var t = {};
  t.iauthor = e.read_shift(4);
  var r = tt(e);
  return t.rfx = r.s, t.ref = me(r.s), e.l += 16, t;
}
function Uc(e, t) {
  return t == null && (t = B(36)), t.write_shift(4, e[1].iauthor), mt(e[0], t), t.write_shift(4, 0), t.write_shift(4, 0), t.write_shift(4, 0), t.write_shift(4, 0), t;
}
var Wc = ze;
function Hc(e) {
  return Be(e.slice(0, 54));
}
function Vc(e) {
  var t = Ze(), r = [];
  return W(
    t,
    628
    /* BrtBeginComments */
  ), W(
    t,
    630
    /* BrtBeginCommentAuthors */
  ), e.forEach(function(n) {
    n[1].forEach(function(a) {
      r.indexOf(a.a) > -1 || (r.push(a.a.slice(0, 54)), W(t, 632, Hc(a.a)));
    });
  }), W(
    t,
    631
    /* BrtEndCommentAuthors */
  ), W(
    t,
    633
    /* BrtBeginCommentList */
  ), e.forEach(function(n) {
    n[1].forEach(function(a) {
      a.iauthor = r.indexOf(a.a);
      var i = { s: Me(n[0]), e: Me(n[0]) };
      W(t, 635, Uc([i, a])), a.t && a.t.length > 0 && W(t, 637, Gl(a)), W(
        t,
        636
        /* BrtEndComment */
      ), delete a.iauthor;
    });
  }), W(
    t,
    634
    /* BrtEndCommentList */
  ), W(
    t,
    629
    /* BrtEndComments */
  ), t.end();
}
function Gc(e, t) {
  t.FullPaths.forEach(function(r, n) {
    if (n != 0) {
      var a = r.replace(/[^\/]*[\/]/, "/_VBA_PROJECT_CUR/");
      a.slice(-1) !== "/" && _e.utils.cfb_add(e, a, t.FileIndex[n].content);
    }
  });
}
var ji = ["xlsb", "xlsm", "xlam", "biff8", "xla"], Xc = /* @__PURE__ */ function() {
  var e = /(^|[^A-Za-z_])R(\[?-?\d+\]|[1-9]\d*|)C(\[?-?\d+\]|[1-9]\d*|)(?![A-Za-z0-9_])/g, t = { r: 0, c: 0 };
  function r(n, a, i, s) {
    var f = !1, o = !1;
    i.length == 0 ? o = !0 : i.charAt(0) == "[" && (o = !0, i = i.slice(1, -1)), s.length == 0 ? f = !0 : s.charAt(0) == "[" && (f = !0, s = s.slice(1, -1));
    var l = i.length > 0 ? parseInt(i, 10) | 0 : 0, c = s.length > 0 ? parseInt(s, 10) | 0 : 0;
    return f ? c += t.c : --c, o ? l += t.r : --l, a + (f ? "" : "$") + $e(c) + (o ? "" : "$") + Ge(l);
  }
  return function(a, i) {
    return t = i, a.replace(e, r);
  };
}(), h0 = /(^|[^._A-Z0-9])([$]?)([A-Z]{1,2}|[A-W][A-Z]{2}|X[A-E][A-Z]|XF[A-D])([$]?)(10[0-3]\d{4}|104[0-7]\d{3}|1048[0-4]\d{2}|10485[0-6]\d|104857[0-6]|[1-9]\d{0,5})(?![_.\(A-Za-z0-9])/g, u0 = /* @__PURE__ */ function() {
  return function(t, r) {
    return t.replace(h0, function(n, a, i, s, f, o) {
      var l = i0(s) - (i ? 0 : r.c), c = a0(o) - (f ? 0 : r.r), u = c == 0 ? "" : f ? c + 1 : "[" + c + "]", h = l == 0 ? "" : i ? l + 1 : "[" + l + "]";
      return a + "R" + u + "C" + h;
    });
  };
}();
function jc(e, t) {
  return e.replace(h0, function(r, n, a, i, s, f) {
    return n + (a == "$" ? a + i : $e(i0(i) + t.c)) + (s == "$" ? s + f : Ge(a0(f) + t.r));
  });
}
function $c(e) {
  return e.length != 1;
}
function Re(e) {
  e.l += 1;
}
function Ur(e, t) {
  var r = e.read_shift(t == 1 ? 1 : 2);
  return [r & 16383, r >> 14 & 1, r >> 15 & 1];
}
function $i(e, t, r) {
  var n = 2;
  if (r) {
    if (r.biff >= 2 && r.biff <= 5)
      return zi(e);
    r.biff == 12 && (n = 4);
  }
  var a = e.read_shift(n), i = e.read_shift(n), s = Ur(e, 2), f = Ur(e, 2);
  return { s: { r: a, c: s[0], cRel: s[1], rRel: s[2] }, e: { r: i, c: f[0], cRel: f[1], rRel: f[2] } };
}
function zi(e) {
  var t = Ur(e, 2), r = Ur(e, 2), n = e.read_shift(1), a = e.read_shift(1);
  return { s: { r: t[0], c: n, cRel: t[1], rRel: t[2] }, e: { r: r[0], c: a, cRel: r[1], rRel: r[2] } };
}
function zc(e, t, r) {
  if (r.biff < 8)
    return zi(e);
  var n = e.read_shift(r.biff == 12 ? 4 : 2), a = e.read_shift(r.biff == 12 ? 4 : 2), i = Ur(e, 2), s = Ur(e, 2);
  return { s: { r: n, c: i[0], cRel: i[1], rRel: i[2] }, e: { r: a, c: s[0], cRel: s[1], rRel: s[2] } };
}
function Ki(e, t, r) {
  if (r && r.biff >= 2 && r.biff <= 5)
    return Kc(e);
  var n = e.read_shift(r && r.biff == 12 ? 4 : 2), a = Ur(e, 2);
  return { r: n, c: a[0], cRel: a[1], rRel: a[2] };
}
function Kc(e) {
  var t = Ur(e, 2), r = e.read_shift(1);
  return { r: t[0], c: r, cRel: t[1], rRel: t[2] };
}
function Yc(e) {
  var t = e.read_shift(2), r = e.read_shift(2);
  return { r: t, c: r & 255, fQuoted: !!(r & 16384), cRel: r >> 15, rRel: r >> 15 };
}
function Jc(e, t, r) {
  var n = r && r.biff ? r.biff : 8;
  if (n >= 2 && n <= 5)
    return qc(e);
  var a = e.read_shift(n >= 12 ? 4 : 2), i = e.read_shift(2), s = (i & 16384) >> 14, f = (i & 32768) >> 15;
  if (i &= 16383, f == 1)
    for (; a > 524287; )
      a -= 1048576;
  if (s == 1)
    for (; i > 8191; )
      i = i - 16384;
  return { r: a, c: i, cRel: s, rRel: f };
}
function qc(e) {
  var t = e.read_shift(2), r = e.read_shift(1), n = (t & 32768) >> 15, a = (t & 16384) >> 14;
  return t &= 16383, n == 1 && t >= 8192 && (t = t - 16384), a == 1 && r >= 128 && (r = r - 256), { r: t, c: r, cRel: a, rRel: n };
}
function Zc(e, t, r) {
  var n = (e[e.l++] & 96) >> 5, a = $i(e, r.biff >= 2 && r.biff <= 5 ? 6 : 8, r);
  return [n, a];
}
function Qc(e, t, r) {
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
  var s = $i(e, i, r);
  return [n, a, s];
}
function eh(e, t, r) {
  var n = (e[e.l++] & 96) >> 5;
  return e.l += r && r.biff > 8 ? 12 : r.biff < 8 ? 6 : 8, [n];
}
function rh(e, t, r) {
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
function th(e, t, r) {
  var n = (e[e.l++] & 96) >> 5, a = zc(e, t - 1, r);
  return [n, a];
}
function nh(e, t, r) {
  var n = (e[e.l++] & 96) >> 5;
  return e.l += r.biff == 2 ? 6 : r.biff == 12 ? 14 : 7, [n];
}
function ga(e) {
  var t = e[e.l + 1] & 1, r = 1;
  return e.l += 4, [t, r];
}
function ah(e, t, r) {
  e.l += 2;
  for (var n = e.read_shift(r && r.biff == 2 ? 1 : 2), a = [], i = 0; i <= n; ++i)
    a.push(e.read_shift(r && r.biff == 2 ? 1 : 2));
  return a;
}
function ih(e, t, r) {
  var n = e[e.l + 1] & 255 ? 1 : 0;
  return e.l += 2, [n, e.read_shift(r && r.biff == 2 ? 1 : 2)];
}
function sh(e, t, r) {
  var n = e[e.l + 1] & 255 ? 1 : 0;
  return e.l += 2, [n, e.read_shift(r && r.biff == 2 ? 1 : 2)];
}
function fh(e) {
  var t = e[e.l + 1] & 255 ? 1 : 0;
  return e.l += 2, [t, e.read_shift(2)];
}
function lh(e, t, r) {
  var n = e[e.l + 1] & 255 ? 1 : 0;
  return e.l += r && r.biff == 2 ? 3 : 4, [n];
}
function Yi(e) {
  var t = e.read_shift(1), r = e.read_shift(1);
  return [t, r];
}
function oh(e) {
  return e.read_shift(2), Yi(e);
}
function ch(e) {
  return e.read_shift(2), Yi(e);
}
function hh(e, t, r) {
  var n = (e[e.l] & 96) >> 5;
  e.l += 1;
  var a = Ki(e, 0, r);
  return [n, a];
}
function uh(e, t, r) {
  var n = (e[e.l] & 96) >> 5;
  e.l += 1;
  var a = Jc(e, 0, r);
  return [n, a];
}
function xh(e, t, r) {
  var n = (e[e.l] & 96) >> 5;
  e.l += 1;
  var a = e.read_shift(2);
  r && r.biff == 5 && (e.l += 12);
  var i = Ki(e, 0, r);
  return [n, a, i];
}
function dh(e, t, r) {
  var n = (e[e.l] & 96) >> 5;
  e.l += 1;
  var a = e.read_shift(r && r.biff <= 3 ? 1 : 2);
  return [du[a], Zi[a], n];
}
function ph(e, t, r) {
  var n = e[e.l++], a = e.read_shift(1), i = r && r.biff <= 3 ? [n == 88 ? -1 : 0, e.read_shift(1)] : vh(e);
  return [a, (i[0] === 0 ? Zi : xu)[i[1]]];
}
function vh(e) {
  return [e[e.l + 1] >> 7, e.read_shift(2) & 32767];
}
function mh(e, t, r) {
  e.l += r && r.biff == 2 ? 3 : 4;
}
function gh(e, t, r) {
  if (e.l++, r && r.biff == 12)
    return [e.read_shift(4, "i"), 0];
  var n = e.read_shift(2), a = e.read_shift(r && r.biff == 2 ? 1 : 2);
  return [n, a];
}
function _h(e) {
  return e.l++, Ht[e.read_shift(1)];
}
function Th(e) {
  return e.l++, e.read_shift(2);
}
function Eh(e) {
  return e.l++, e.read_shift(1) !== 0;
}
function wh(e) {
  return e.l++, gt(e);
}
function Sh(e, t, r) {
  return e.l++, Ni(e, t - 1, r);
}
function Ah(e, t) {
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
      r[1] = uo(e, 1) ? "TRUE" : "FALSE", t != 12 && (e.l += 7);
      break;
    case 37:
    case 16:
      r[1] = Ht[e[e.l]], e.l += t == 12 ? 4 : 8;
      break;
    case 0:
      e.l += 8;
      break;
    case 1:
      r[1] = gt(e);
      break;
    case 2:
      r[1] = mo(e, 0, { biff: t > 0 && t < 8 ? 2 : t });
      break;
    default:
      throw new Error("Bad SerAr: " + r[0]);
  }
  return r;
}
function Fh(e, t, r) {
  for (var n = e.read_shift(r.biff == 12 ? 4 : 2), a = [], i = 0; i != n; ++i)
    a.push((r.biff == 12 ? tt : To)(e));
  return a;
}
function yh(e, t, r) {
  var n = 0, a = 0;
  r.biff == 12 ? (n = e.read_shift(4), a = e.read_shift(4)) : (a = 1 + e.read_shift(1), n = 1 + e.read_shift(2)), r.biff >= 2 && r.biff < 8 && (--n, --a == 0 && (a = 256));
  for (var i = 0, s = []; i != n && (s[i] = []); ++i)
    for (var f = 0; f != a; ++f)
      s[i][f] = Ah(e, r.biff);
  return s;
}
function Ch(e, t, r) {
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
function Oh(e, t, r) {
  if (r.biff == 5)
    return Dh(e);
  var n = e.read_shift(1) >>> 5 & 3, a = e.read_shift(2), i = e.read_shift(4);
  return [n, a, i];
}
function Dh(e) {
  var t = e.read_shift(1) >>> 5 & 3, r = e.read_shift(2, "i");
  e.l += 8;
  var n = e.read_shift(2);
  return e.l += 12, [t, r, n];
}
function Rh(e, t, r) {
  var n = e.read_shift(1) >>> 5 & 3;
  e.l += r && r.biff == 2 ? 3 : 4;
  var a = e.read_shift(r && r.biff == 2 ? 1 : 2);
  return [n, a];
}
function Nh(e, t, r) {
  var n = e.read_shift(1) >>> 5 & 3, a = e.read_shift(r && r.biff == 2 ? 1 : 2);
  return [n, a];
}
function Ih(e, t, r) {
  var n = e.read_shift(1) >>> 5 & 3;
  return e.l += 4, r.biff < 8 && e.l--, r.biff == 12 && (e.l += 2), [n];
}
function kh(e, t, r) {
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
var Ph = Er, Lh = Er, Mh = Er;
function Vt(e, t, r) {
  return e.l += 2, [Yc(e)];
}
function x0(e) {
  return e.l += 6, [];
}
var Bh = Vt, bh = x0, Uh = x0, Wh = Vt;
function Ji(e) {
  return e.l += 2, [Di(e), e.read_shift(2) & 1];
}
var Hh = Vt, Vh = Ji, Gh = x0, Xh = Vt, jh = Vt, $h = [
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
function zh(e) {
  e.l += 2;
  var t = e.read_shift(2), r = e.read_shift(2), n = e.read_shift(4), a = e.read_shift(2), i = e.read_shift(2), s = $h[r >> 2 & 31];
  return { ixti: t, coltype: r & 3, rt: s, idx: n, c: a, C: i };
}
function Kh(e) {
  return e.l += 2, [e.read_shift(4)];
}
function Yh(e, t, r) {
  return e.l += 5, e.l += 2, e.l += r.biff == 2 ? 1 : 4, ["PTGSHEET"];
}
function Jh(e, t, r) {
  return e.l += r.biff == 2 ? 4 : 5, ["PTGENDSHEET"];
}
function qh(e) {
  var t = e.read_shift(1) >>> 5 & 3, r = e.read_shift(2);
  return [t, r];
}
function Zh(e) {
  var t = e.read_shift(1) >>> 5 & 3, r = e.read_shift(2);
  return [t, r];
}
function Qh(e) {
  return e.l += 4, [0, 0];
}
var _a = {
  /*::[*/
  1: { n: "PtgExp", f: gh },
  /*::[*/
  2: { n: "PtgTbl", f: Mh },
  /*::[*/
  3: { n: "PtgAdd", f: Re },
  /*::[*/
  4: { n: "PtgSub", f: Re },
  /*::[*/
  5: { n: "PtgMul", f: Re },
  /*::[*/
  6: { n: "PtgDiv", f: Re },
  /*::[*/
  7: { n: "PtgPower", f: Re },
  /*::[*/
  8: { n: "PtgConcat", f: Re },
  /*::[*/
  9: { n: "PtgLt", f: Re },
  /*::[*/
  10: { n: "PtgLe", f: Re },
  /*::[*/
  11: { n: "PtgEq", f: Re },
  /*::[*/
  12: { n: "PtgGe", f: Re },
  /*::[*/
  13: { n: "PtgGt", f: Re },
  /*::[*/
  14: { n: "PtgNe", f: Re },
  /*::[*/
  15: { n: "PtgIsect", f: Re },
  /*::[*/
  16: { n: "PtgUnion", f: Re },
  /*::[*/
  17: { n: "PtgRange", f: Re },
  /*::[*/
  18: { n: "PtgUplus", f: Re },
  /*::[*/
  19: { n: "PtgUminus", f: Re },
  /*::[*/
  20: { n: "PtgPercent", f: Re },
  /*::[*/
  21: { n: "PtgParen", f: Re },
  /*::[*/
  22: { n: "PtgMissArg", f: Re },
  /*::[*/
  23: { n: "PtgStr", f: Sh },
  /*::[*/
  26: { n: "PtgSheet", f: Yh },
  /*::[*/
  27: { n: "PtgEndSheet", f: Jh },
  /*::[*/
  28: { n: "PtgErr", f: _h },
  /*::[*/
  29: { n: "PtgBool", f: Eh },
  /*::[*/
  30: { n: "PtgInt", f: Th },
  /*::[*/
  31: { n: "PtgNum", f: wh },
  /*::[*/
  32: { n: "PtgArray", f: nh },
  /*::[*/
  33: { n: "PtgFunc", f: dh },
  /*::[*/
  34: { n: "PtgFuncVar", f: ph },
  /*::[*/
  35: { n: "PtgName", f: Ch },
  /*::[*/
  36: { n: "PtgRef", f: hh },
  /*::[*/
  37: { n: "PtgArea", f: Zc },
  /*::[*/
  38: { n: "PtgMemArea", f: Rh },
  /*::[*/
  39: { n: "PtgMemErr", f: Ph },
  /*::[*/
  40: { n: "PtgMemNoMem", f: Lh },
  /*::[*/
  41: { n: "PtgMemFunc", f: Nh },
  /*::[*/
  42: { n: "PtgRefErr", f: Ih },
  /*::[*/
  43: { n: "PtgAreaErr", f: eh },
  /*::[*/
  44: { n: "PtgRefN", f: uh },
  /*::[*/
  45: { n: "PtgAreaN", f: th },
  /*::[*/
  46: { n: "PtgMemAreaN", f: qh },
  /*::[*/
  47: { n: "PtgMemNoMemN", f: Zh },
  /*::[*/
  57: { n: "PtgNameX", f: Oh },
  /*::[*/
  58: { n: "PtgRef3d", f: xh },
  /*::[*/
  59: { n: "PtgArea3d", f: Qc },
  /*::[*/
  60: { n: "PtgRefErr3d", f: kh },
  /*::[*/
  61: { n: "PtgAreaErr3d", f: rh },
  /*::[*/
  255: {}
}, eu = {
  /*::[*/
  64: 32,
  /*::[*/
  96: 32,
  /*::[*/
  65: 33,
  /*::[*/
  97: 33,
  /*::[*/
  66: 34,
  /*::[*/
  98: 34,
  /*::[*/
  67: 35,
  /*::[*/
  99: 35,
  /*::[*/
  68: 36,
  /*::[*/
  100: 36,
  /*::[*/
  69: 37,
  /*::[*/
  101: 37,
  /*::[*/
  70: 38,
  /*::[*/
  102: 38,
  /*::[*/
  71: 39,
  /*::[*/
  103: 39,
  /*::[*/
  72: 40,
  /*::[*/
  104: 40,
  /*::[*/
  73: 41,
  /*::[*/
  105: 41,
  /*::[*/
  74: 42,
  /*::[*/
  106: 42,
  /*::[*/
  75: 43,
  /*::[*/
  107: 43,
  /*::[*/
  76: 44,
  /*::[*/
  108: 44,
  /*::[*/
  77: 45,
  /*::[*/
  109: 45,
  /*::[*/
  78: 46,
  /*::[*/
  110: 46,
  /*::[*/
  79: 47,
  /*::[*/
  111: 47,
  /*::[*/
  88: 34,
  /*::[*/
  120: 34,
  /*::[*/
  89: 57,
  /*::[*/
  121: 57,
  /*::[*/
  90: 58,
  /*::[*/
  122: 58,
  /*::[*/
  91: 59,
  /*::[*/
  123: 59,
  /*::[*/
  92: 60,
  /*::[*/
  124: 60,
  /*::[*/
  93: 61,
  /*::[*/
  125: 61
}, ru = {
  /*::[*/
  1: { n: "PtgElfLel", f: Ji },
  /*::[*/
  2: { n: "PtgElfRw", f: Xh },
  /*::[*/
  3: { n: "PtgElfCol", f: Bh },
  /*::[*/
  6: { n: "PtgElfRwV", f: jh },
  /*::[*/
  7: { n: "PtgElfColV", f: Wh },
  /*::[*/
  10: { n: "PtgElfRadical", f: Hh },
  /*::[*/
  11: { n: "PtgElfRadicalS", f: Gh },
  /*::[*/
  13: { n: "PtgElfColS", f: bh },
  /*::[*/
  15: { n: "PtgElfColSV", f: Uh },
  /*::[*/
  16: { n: "PtgElfRadicalLel", f: Vh },
  /*::[*/
  25: { n: "PtgList", f: zh },
  /*::[*/
  29: { n: "PtgSxName", f: Kh },
  /*::[*/
  255: {}
}, tu = {
  /*::[*/
  0: { n: "PtgAttrNoop", f: Qh },
  /*::[*/
  1: { n: "PtgAttrSemi", f: lh },
  /*::[*/
  2: { n: "PtgAttrIf", f: sh },
  /*::[*/
  4: { n: "PtgAttrChoose", f: ah },
  /*::[*/
  8: { n: "PtgAttrGoto", f: ih },
  /*::[*/
  16: { n: "PtgAttrSum", f: mh },
  /*::[*/
  32: { n: "PtgAttrBaxcel", f: ga },
  /*::[*/
  33: { n: "PtgAttrBaxcel", f: ga },
  /*::[*/
  64: { n: "PtgAttrSpace", f: oh },
  /*::[*/
  65: { n: "PtgAttrSpaceSemi", f: ch },
  /*::[*/
  128: { n: "PtgAttrIfError", f: fh },
  /*::[*/
  255: {}
};
function nu(e, t, r, n) {
  if (n.biff < 8)
    return Er(e, t);
  for (var a = e.l + t, i = [], s = 0; s !== r.length; ++s)
    switch (r[s][0]) {
      case "PtgArray":
        r[s][1] = yh(e, 0, n), i.push(r[s][1]);
        break;
      case "PtgMemArea":
        r[s][2] = Fh(e, r[s][1], n), i.push(r[s][2]);
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
  return t = a - e.l, t !== 0 && i.push(Er(e, t)), i;
}
function au(e, t, r) {
  for (var n = e.l + t, a, i, s = []; n != e.l; )
    t = n - e.l, i = e[e.l], a = _a[i] || _a[eu[i]], (i === 24 || i === 25) && (a = (i === 24 ? ru : tu)[e[e.l + 1]]), !a || !a.f ? Er(e, t) : s.push([a.n, a.f(e, t, r)]);
  return s;
}
function iu(e) {
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
var su = {
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
function fu(e, t) {
  if (!e && !(t && t.biff <= 5 && t.biff >= 2))
    throw new Error("empty sheet name");
  return /[^\w\u4E00-\u9FFF\u3040-\u30FF]/.test(e) ? "'" + e + "'" : e;
}
function qi(e, t, r) {
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
function Ta(e, t, r) {
  var n = qi(e, t, r);
  return n == "#REF" ? n : fu(n, r);
}
function xt(e, t, r, n, a) {
  var i = a && a.biff || 8, s = (
    /*range != null ? range :*/
    { s: { c: 0, r: 0 }, e: { c: 0, r: 0 } }
  ), f = [], o, l, c, u = 0, h = 0, p, _ = "";
  if (!e[0] || !e[0][0])
    return "";
  for (var x = -1, g = "", C = 0, O = e[0].length; C < O; ++C) {
    var F = e[0][C];
    switch (F[0]) {
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
        if (o = f.pop(), l = f.pop(), x >= 0) {
          switch (e[0][x][1][0]) {
            case 0:
              g = ye(" ", e[0][x][1][1]);
              break;
            case 1:
              g = ye("\r", e[0][x][1][1]);
              break;
            default:
              if (g = "", a.WTF)
                throw new Error("Unexpected PtgAttrSpaceType " + e[0][x][1][0]);
          }
          l = l + g, x = -1;
        }
        f.push(l + su[F[0]] + o);
        break;
      case "PtgIsect":
        o = f.pop(), l = f.pop(), f.push(l + " " + o);
        break;
      case "PtgUnion":
        o = f.pop(), l = f.pop(), f.push(l + "," + o);
        break;
      case "PtgRange":
        o = f.pop(), l = f.pop(), f.push(l + ":" + o);
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
        c = Dt(F[1][1], s, a), f.push(Rt(c, i));
        break;
      case "PtgRefN":
        c = r ? Dt(F[1][1], r, a) : F[1][1], f.push(Rt(c, i));
        break;
      case "PtgRef3d":
        u = /*::Number(*/
        F[1][1], c = Dt(F[1][2], s, a), _ = Ta(n, u, a), f.push(_ + "!" + Rt(c, i));
        break;
      case "PtgFunc":
      case "PtgFuncVar":
        var L = F[1][0], j = F[1][1];
        L || (L = 0), L &= 127;
        var Q = L == 0 ? [] : f.slice(-L);
        f.length -= L, j === "User" && (j = Q.shift()), f.push(j + "(" + Q.join(",") + ")");
        break;
      case "PtgBool":
        f.push(F[1] ? "TRUE" : "FALSE");
        break;
      case "PtgInt":
        f.push(
          /*::String(*/
          F[1]
          /*::)*/
        );
        break;
      case "PtgNum":
        f.push(String(F[1]));
        break;
      case "PtgStr":
        f.push('"' + F[1].replace(/"/g, '""') + '"');
        break;
      case "PtgErr":
        f.push(
          /*::String(*/
          F[1]
          /*::)*/
        );
        break;
      case "PtgAreaN":
        p = aa(F[1][1], r ? { s: r } : s, a), f.push(Ln(p, a));
        break;
      case "PtgArea":
        p = aa(F[1][1], s, a), f.push(Ln(p, a));
        break;
      case "PtgArea3d":
        u = /*::Number(*/
        F[1][1], p = F[1][2], _ = Ta(n, u, a), f.push(_ + "!" + Ln(p, a));
        break;
      case "PtgAttrSum":
        f.push("SUM(" + f.pop() + ")");
        break;
      case "PtgAttrBaxcel":
      case "PtgAttrSemi":
        break;
      case "PtgName":
        h = F[1][2];
        var D = (n.names || [])[h - 1] || (n[0] || [])[h], U = D ? D.Name : "SH33TJSNAME" + String(h);
        U && U.slice(0, 6) == "_xlfn." && !a.xlfn && (U = U.slice(6)), f.push(U);
        break;
      case "PtgNameX":
        var M = F[1][1];
        h = F[1][2];
        var V;
        if (a.biff <= 5)
          M < 0 && (M = -M), n[M] && (V = n[M][h]);
        else {
          var G = "";
          if (((n[M] || [])[0] || [])[0] == 14849 || (((n[M] || [])[0] || [])[0] == 1025 ? n[M][h] && n[M][h].itab > 0 && (G = n.SheetNames[n[M][h].itab - 1] + "!") : G = n.SheetNames[h - 1] + "!"), n[M] && n[M][h])
            G += n[M][h].Name;
          else if (n[0] && n[0][h])
            G += n[0][h].Name;
          else {
            var z = (qi(n, M, a) || "").split(";;");
            z[h - 1] ? G = z[h - 1] : G += "SH33TJSERRX";
          }
          f.push(G);
          break;
        }
        V || (V = { Name: "SH33TJSERRY" }), f.push(V.Name);
        break;
      case "PtgParen":
        var re = "(", ge = ")";
        if (x >= 0) {
          switch (g = "", e[0][x][1][0]) {
            case 2:
              re = ye(" ", e[0][x][1][1]) + re;
              break;
            case 3:
              re = ye("\r", e[0][x][1][1]) + re;
              break;
            case 4:
              ge = ye(" ", e[0][x][1][1]) + ge;
              break;
            case 5:
              ge = ye("\r", e[0][x][1][1]) + ge;
              break;
            default:
              if (a.WTF)
                throw new Error("Unexpected PtgAttrSpaceType " + e[0][x][1][0]);
          }
          x = -1;
        }
        f.push(re + f.pop() + ge);
        break;
      case "PtgRefErr":
        f.push("#REF!");
        break;
      case "PtgRefErr3d":
        f.push("#REF!");
        break;
      case "PtgExp":
        c = { c: F[1][1], r: F[1][0] };
        var le = { c: r.c, r: r.r };
        if (n.sharedf[me(c)]) {
          var be = n.sharedf[me(c)];
          f.push(xt(be, s, le, n, a));
        } else {
          var Oe = !1;
          for (o = 0; o != n.arrayf.length; ++o)
            if (l = n.arrayf[o], !(c.c < l[0].s.c || c.c > l[0].e.c) && !(c.r < l[0].s.r || c.r > l[0].e.r)) {
              f.push(xt(l[1], s, le, n, a)), Oe = !0;
              break;
            }
          Oe || f.push(
            /*::String(*/
            F[1]
            /*::)*/
          );
        }
        break;
      case "PtgArray":
        f.push("{" + iu(
          /*::(*/
          F[1]
          /*:: :any)*/
        ) + "}");
        break;
      case "PtgMemArea":
        break;
      case "PtgAttrSpace":
      case "PtgAttrSpaceSemi":
        x = C;
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
        f.push("Table" + F[1].idx + "[#" + F[1].rt + "]");
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
        throw new Error("Unrecognized Formula Token: " + String(F));
      default:
        throw new Error("Unrecognized Formula Token: " + String(F));
    }
    var ur = ["PtgAttrSpace", "PtgAttrSpaceSemi", "PtgAttrGoto"];
    if (a.biff != 3 && x >= 0 && ur.indexOf(e[0][C][0]) == -1) {
      F = e[0][x];
      var Pe = !0;
      switch (F[1][0]) {
        case 4:
          Pe = !1;
        case 0:
          g = ye(" ", F[1][1]);
          break;
        case 5:
          Pe = !1;
        case 1:
          g = ye("\r", F[1][1]);
          break;
        default:
          if (g = "", a.WTF)
            throw new Error("Unexpected PtgAttrSpaceType " + F[1][0]);
      }
      f.push((Pe ? g : "") + f.pop() + (Pe ? "" : g)), x = -1;
    }
  }
  if (f.length > 1 && a.WTF)
    throw new Error("bad formula stack");
  return f[0];
}
function lu(e) {
  if (e == null) {
    var t = B(8);
    return t.write_shift(1, 3), t.write_shift(1, 0), t.write_shift(2, 0), t.write_shift(2, 0), t.write_shift(2, 65535), t;
  } else if (typeof e == "number")
    return Yr(e);
  return Yr(0);
}
function ou(e, t, r, n, a) {
  var i = Jr(t, r, a), s = lu(e.v), f = B(6), o = 33;
  f.write_shift(2, o), f.write_shift(4, 0);
  for (var l = B(e.bf.length), c = 0; c < e.bf.length; ++c)
    l[c] = e.bf[c];
  var u = He([i, s, f, l]);
  return u;
}
function Sn(e, t, r) {
  var n = e.read_shift(4), a = au(e, n, r), i = e.read_shift(4), s = i > 0 ? nu(e, i, a, r) : null;
  return [a, s];
}
var cu = Sn, An = Sn, hu = Sn, uu = Sn, xu = {
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
}, Zi = {
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
}, du = {
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
function pu(e) {
  var t = "of:=" + e.replace(h0, "$1[.$2$3$4$5]").replace(/\]:\[/g, ":");
  return t.replace(/;/g, "|").replace(/,/g, ";");
}
function vu(e) {
  return e.replace(/\./, "!");
}
var Nt = typeof Map < "u";
function d0(e, t, r) {
  var n = 0, a = e.length;
  if (r) {
    if (Nt ? r.has(t) : Object.prototype.hasOwnProperty.call(r, t)) {
      for (var i = Nt ? r.get(t) : r[t]; n < i.length; ++n)
        if (e[i[n]].t === t)
          return e.Count++, i[n];
    }
  } else
    for (; n < a; ++n)
      if (e[n].t === t)
        return e.Count++, n;
  return e[a] = { t }, e.Count++, e.Unique++, r && (Nt ? (r.has(t) || r.set(t, []), r.get(t).push(a)) : (Object.prototype.hasOwnProperty.call(r, t) || (r[t] = []), r[t].push(a))), a;
}
function Fn(e, t) {
  var r = { min: e + 1, max: e + 1 }, n = -1;
  return t.MDW && (Or = t.MDW), t.width != null ? r.customWidth = 1 : t.wpx != null ? n = xn(t.wpx) : t.wch != null && (n = t.wch), n > -1 ? (r.width = jn(n), r.customWidth = 1) : t.width != null && (r.width = t.width), t.hidden && (r.hidden = !0), t.level != null && (r.outlineLevel = r.level = t.level), r;
}
function Qi(e, t) {
  if (e) {
    var r = [0.7, 0.7, 0.75, 0.75, 0.3, 0.3];
    t == "xlml" && (r = [1, 1, 1, 1, 0.5, 0.5]), e.left == null && (e.left = r[0]), e.right == null && (e.right = r[1]), e.top == null && (e.top = r[2]), e.bottom == null && (e.bottom = r[3]), e.header == null && (e.header = r[4]), e.footer == null && (e.footer = r[5]);
  }
}
function Hr(e, t, r) {
  var n = r.revssf[t.z != null ? t.z : "General"], a = 60, i = e.length;
  if (n == null && r.ssf) {
    for (; a < 392; ++a)
      if (r.ssf[a] == null) {
        Ka(t.z, a), r.ssf[a] = t.z, r.revssf[t.z] = n = a;
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
function mu(e, t, r) {
  if (e && e["!ref"]) {
    var n = Ee(e["!ref"]);
    if (n.e.c < n.s.c || n.e.r < n.s.r)
      throw new Error("Bad range (" + r + "): " + e["!ref"]);
  }
}
function gu(e) {
  if (e.length === 0)
    return "";
  for (var t = '<mergeCells count="' + e.length + '">', r = 0; r != e.length; ++r)
    t += '<mergeCell ref="' + Ne(e[r]) + '"/>';
  return t + "</mergeCells>";
}
function _u(e, t, r, n, a) {
  var i = !1, s = {}, f = null;
  if (n.bookType !== "xlsx" && t.vbaraw) {
    var o = t.SheetNames[r];
    try {
      t.Workbook && (o = t.Workbook.Sheets[r].CodeName || o);
    } catch {
    }
    i = !0, s.codeName = Fr(ve(o));
  }
  if (e && e["!outline"]) {
    var l = { summaryBelow: 1, summaryRight: 1 };
    e["!outline"].above && (l.summaryBelow = 0), e["!outline"].left && (l.summaryRight = 0), f = (f || "") + Y("outlinePr", null, l);
  }
  !i && !f || (a[a.length] = Y("sheetPr", f, s));
}
var Tu = ["objects", "scenarios", "selectLockedCells", "selectUnlockedCells"], Eu = [
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
function wu(e) {
  var t = { sheet: 1 };
  return Tu.forEach(function(r) {
    e[r] != null && e[r] && (t[r] = "1");
  }), Eu.forEach(function(r) {
    e[r] != null && !e[r] && (t[r] = "0");
  }), e.password && (t.password = Mi(e.password).toString(16).toUpperCase()), Y("sheetProtection", null, t);
}
function Su(e) {
  return Qi(e), Y("pageMargins", null, e);
}
function Au(e, t) {
  for (var r = ["<cols>"], n, a = 0; a != t.length; ++a)
    (n = t[a]) && (r[r.length] = Y("col", null, Fn(a, n)));
  return r[r.length] = "</cols>", r.join("");
}
function Fu(e, t, r, n) {
  var a = typeof e.ref == "string" ? e.ref : Ne(e.ref);
  r.Workbook || (r.Workbook = { Sheets: [] }), r.Workbook.Names || (r.Workbook.Names = []);
  var i = r.Workbook.Names, s = sr(a);
  s.s.r == s.e.r && (s.e.r = sr(t["!ref"]).e.r, a = Ne(s));
  for (var f = 0; f < i.length; ++f) {
    var o = i[f];
    if (o.Name == "_xlnm._FilterDatabase" && o.Sheet == n) {
      o.Ref = "'" + r.SheetNames[n] + "'!" + a;
      break;
    }
  }
  return f == i.length && i.push({ Name: "_xlnm._FilterDatabase", Sheet: n, Ref: "'" + r.SheetNames[n] + "'!" + a }), Y("autoFilter", null, { ref: a });
}
function yu(e, t, r, n) {
  var a = { workbookViewId: "0" };
  return (((n || {}).Workbook || {}).Views || [])[0] && (a.rightToLeft = n.Workbook.Views[0].RTL ? "1" : "0"), Y("sheetViews", Y("sheetView", null, a), {});
}
function Cu(e, t, r, n) {
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
        a = Ht[e.v];
        break;
      case "d":
        n && n.cellDates ? a = qe(e.v, -1).toISOString() : (e = er(e), e.t = "n", a = "" + (e.v = Qe(qe(e.v)))), typeof e.z > "u" && (e.z = Ce[14]);
        break;
      default:
        a = e.v;
        break;
    }
  var f = Ve("v", ve(a)), o = { r: t }, l = Hr(n.cellXfs, e, n);
  switch (l !== 0 && (o.s = l), e.t) {
    case "n":
      break;
    case "d":
      o.t = "d";
      break;
    case "b":
      o.t = "b";
      break;
    case "e":
      o.t = "e";
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
        f = Ve("v", "" + d0(n.Strings, e.v, n.revStrings)), o.t = "s";
        break;
      }
      o.t = "str";
      break;
  }
  if (e.t != i && (e.t = i, e.v = s), typeof e.f == "string" && e.f) {
    var c = e.F && e.F.slice(0, t.length) == t ? { t: "array", ref: e.F } : null;
    f = Y("f", ve(e.f), c) + (e.v != null ? f : "");
  }
  return e.l && r["!links"].push([t, e.l]), e.D && (o.cm = 1), Y("c", f, o);
}
function Ou(e, t, r, n) {
  var a = [], i = [], s = Ee(e["!ref"]), f = "", o, l = "", c = [], u = 0, h = 0, p = e["!rows"], _ = Array.isArray(e), x = { r: l }, g, C = -1;
  for (h = s.s.c; h <= s.e.c; ++h)
    c[h] = $e(h);
  for (u = s.s.r; u <= s.e.r; ++u) {
    for (i = [], l = Ge(u), h = s.s.c; h <= s.e.c; ++h) {
      o = c[h] + l;
      var O = _ ? (e[u] || [])[h] : e[o];
      O !== void 0 && (f = Cu(O, o, e, t)) != null && i.push(f);
    }
    (i.length > 0 || p && p[u]) && (x = { r: l }, p && p[u] && (g = p[u], g.hidden && (x.hidden = 1), C = -1, g.hpx ? C = dn(g.hpx) : g.hpt && (C = g.hpt), C > -1 && (x.ht = C, x.customHeight = 1), g.level && (x.outlineLevel = g.level)), a[a.length] = Y("row", i.join(""), x));
  }
  if (p)
    for (; u < p.length; ++u)
      p && p[u] && (x = { r: u + 1 }, g = p[u], g.hidden && (x.hidden = 1), C = -1, g.hpx ? C = dn(g.hpx) : g.hpt && (C = g.hpt), C > -1 && (x.ht = C, x.customHeight = 1), g.level && (x.outlineLevel = g.level), a[a.length] = Y("row", "", x));
  return a.join("");
}
function es(e, t, r, n) {
  var a = [Ie, Y("worksheet", null, {
    xmlns: pt[0],
    "xmlns:r": Le.r
  })], i = r.SheetNames[e], s = 0, f = "", o = r.Sheets[i];
  o == null && (o = {});
  var l = o["!ref"] || "A1", c = Ee(l);
  if (c.e.c > 16383 || c.e.r > 1048575) {
    if (t.WTF)
      throw new Error("Range " + l + " exceeds format limit A1:XFD1048576");
    c.e.c = Math.min(c.e.c, 16383), c.e.r = Math.min(c.e.c, 1048575), l = Ne(c);
  }
  n || (n = {}), o["!comments"] = [];
  var u = [];
  _u(o, r, e, t, a), a[a.length] = Y("dimension", null, { ref: l }), a[a.length] = yu(o, t, e, r), t.sheetFormat && (a[a.length] = Y("sheetFormatPr", null, {
    defaultRowHeight: t.sheetFormat.defaultRowHeight || "16",
    baseColWidth: t.sheetFormat.baseColWidth || "10",
    outlineLevelRow: t.sheetFormat.outlineLevelRow || "7"
  })), o["!cols"] != null && o["!cols"].length > 0 && (a[a.length] = Au(o, o["!cols"])), a[s = a.length] = "<sheetData/>", o["!links"] = [], o["!ref"] != null && (f = Ou(o, t), f.length > 0 && (a[a.length] = f)), a.length > s + 1 && (a[a.length] = "</sheetData>", a[s] = a[s].replace("/>", ">")), o["!protect"] && (a[a.length] = wu(o["!protect"])), o["!autofilter"] != null && (a[a.length] = Fu(o["!autofilter"], o, r, e)), o["!merges"] != null && o["!merges"].length > 0 && (a[a.length] = gu(o["!merges"]));
  var h = -1, p, _ = -1;
  return (
    /*::(*/
    o["!links"].length > 0 && (a[a.length] = "<hyperlinks>", o["!links"].forEach(function(x) {
      x[1].Target && (p = { ref: x[0] }, x[1].Target.charAt(0) != "#" && (_ = pe(n, -1, ve(x[1].Target).replace(/#.*$/, ""), he.HLINK), p["r:id"] = "rId" + _), (h = x[1].Target.indexOf("#")) > -1 && (p.location = ve(x[1].Target.slice(h + 1))), x[1].Tooltip && (p.tooltip = ve(x[1].Tooltip)), a[a.length] = Y("hyperlink", null, p));
    }), a[a.length] = "</hyperlinks>"), delete o["!links"], o["!margins"] != null && (a[a.length] = Su(o["!margins"])), (!t || t.ignoreEC || t.ignoreEC == null) && (a[a.length] = Ve("ignoredErrors", Y("ignoredError", null, { numberStoredAsText: 1, sqref: l }))), u.length > 0 && (_ = pe(n, -1, "../drawings/drawing" + (e + 1) + ".xml", he.DRAW), a[a.length] = Y("drawing", null, { "r:id": "rId" + _ }), o["!drawing"] = u), o["!comments"].length > 0 && (_ = pe(n, -1, "../drawings/vmlDrawing" + (e + 1) + ".vml", he.VML), a[a.length] = Y("legacyDrawing", null, { "r:id": "rId" + _ }), o["!legacy"] = _), a.length > 1 && (a[a.length] = "</worksheet>", a[1] = a[1].replace("/>", ">")), a.join("")
  );
}
function Du(e, t) {
  var r = {}, n = e.l + t;
  r.r = e.read_shift(4), e.l += 4;
  var a = e.read_shift(2);
  e.l += 1;
  var i = e.read_shift(1);
  return e.l = n, i & 7 && (r.level = i & 7), i & 16 && (r.hidden = !0), i & 32 && (r.hpt = a / 20), r;
}
function Ru(e, t, r) {
  var n = B(145), a = (r["!rows"] || [])[e] || {};
  n.write_shift(4, e), n.write_shift(4, 0);
  var i = 320;
  a.hpx ? i = dn(a.hpx) * 20 : a.hpt && (i = a.hpt * 20), n.write_shift(2, i), n.write_shift(1, 0);
  var s = 0;
  a.level && (s |= a.level), a.hidden && (s |= 16), (a.hpx || a.hpt) && (s |= 32), n.write_shift(1, s), n.write_shift(1, 0);
  var f = 0, o = n.l;
  n.l += 4;
  for (var l = { r: e, c: 0 }, c = 0; c < 16; ++c)
    if (!(t.s.c > c + 1 << 10 || t.e.c < c << 10)) {
      for (var u = -1, h = -1, p = c << 10; p < c + 1 << 10; ++p) {
        l.c = p;
        var _ = Array.isArray(r) ? (r[l.r] || [])[l.c] : r[me(l)];
        _ && (u < 0 && (u = p), h = p);
      }
      u < 0 || (++f, n.write_shift(4, u), n.write_shift(4, h));
    }
  var x = n.l;
  return n.l = o, n.write_shift(4, f), n.l = x, n.length > n.l ? n.slice(0, n.l) : n;
}
function Nu(e, t, r, n) {
  var a = Ru(n, r, t);
  (a.length > 17 || (t["!rows"] || [])[n]) && W(e, 0, a);
}
var Iu = tt, ku = mt;
function Pu() {
}
function Lu(e, t) {
  var r = {}, n = e[e.l];
  return ++e.l, r.above = !(n & 64), r.left = !(n & 128), e.l += 18, r.name = Xl(e), r;
}
function Mu(e, t, r) {
  r == null && (r = B(84 + 4 * e.length));
  var n = 192;
  t && (t.above && (n &= -65), t.left && (n &= -129)), r.write_shift(1, n);
  for (var a = 1; a < 3; ++a)
    r.write_shift(1, 0);
  return cn({ auto: 1 }, r), r.write_shift(-4, -1), r.write_shift(-4, -1), pi(e, r), r.slice(0, r.l);
}
function Bu(e) {
  var t = hr(e);
  return [t];
}
function bu(e, t, r) {
  return r == null && (r = B(8)), Qr(t, r);
}
function Uu(e) {
  var t = et(e);
  return [t];
}
function Wu(e, t, r) {
  return r == null && (r = B(4)), rt(t, r);
}
function Hu(e) {
  var t = hr(e), r = e.read_shift(1);
  return [t, r, "b"];
}
function Vu(e, t, r) {
  return r == null && (r = B(9)), Qr(t, r), r.write_shift(1, e.v ? 1 : 0), r;
}
function Gu(e) {
  var t = et(e), r = e.read_shift(1);
  return [t, r, "b"];
}
function Xu(e, t, r) {
  return r == null && (r = B(5)), rt(t, r), r.write_shift(1, e.v ? 1 : 0), r;
}
function ju(e) {
  var t = hr(e), r = e.read_shift(1);
  return [t, r, "e"];
}
function $u(e, t, r) {
  return r == null && (r = B(9)), Qr(t, r), r.write_shift(1, e.v), r;
}
function zu(e) {
  var t = et(e), r = e.read_shift(1);
  return [t, r, "e"];
}
function Ku(e, t, r) {
  return r == null && (r = B(8)), rt(t, r), r.write_shift(1, e.v), r.write_shift(2, 0), r.write_shift(1, 0), r;
}
function Yu(e) {
  var t = hr(e), r = e.read_shift(4);
  return [t, r, "s"];
}
function Ju(e, t, r) {
  return r == null && (r = B(12)), Qr(t, r), r.write_shift(4, t.v), r;
}
function qu(e) {
  var t = et(e), r = e.read_shift(4);
  return [t, r, "s"];
}
function Zu(e, t, r) {
  return r == null && (r = B(8)), rt(t, r), r.write_shift(4, t.v), r;
}
function Qu(e) {
  var t = hr(e), r = gt(e);
  return [t, r, "n"];
}
function e1(e, t, r) {
  return r == null && (r = B(16)), Qr(t, r), Yr(e.v, r), r;
}
function r1(e) {
  var t = et(e), r = gt(e);
  return [t, r, "n"];
}
function t1(e, t, r) {
  return r == null && (r = B(12)), rt(t, r), Yr(e.v, r), r;
}
function n1(e) {
  var t = hr(e), r = vi(e);
  return [t, r, "n"];
}
function a1(e, t, r) {
  return r == null && (r = B(12)), Qr(t, r), mi(e.v, r), r;
}
function i1(e) {
  var t = et(e), r = vi(e);
  return [t, r, "n"];
}
function s1(e, t, r) {
  return r == null && (r = B(8)), rt(t, r), mi(e.v, r), r;
}
function f1(e) {
  var t = hr(e), r = s0(e);
  return [t, r, "is"];
}
function l1(e) {
  var t = hr(e), r = ze(e);
  return [t, r, "str"];
}
function o1(e, t, r) {
  return r == null && (r = B(12 + 4 * e.v.length)), Qr(t, r), Be(e.v, r), r.length > r.l ? r.slice(0, r.l) : r;
}
function c1(e) {
  var t = et(e), r = ze(e);
  return [t, r, "str"];
}
function h1(e, t, r) {
  return r == null && (r = B(8 + 4 * e.v.length)), rt(t, r), Be(e.v, r), r.length > r.l ? r.slice(0, r.l) : r;
}
function u1(e, t, r) {
  var n = e.l + t, a = hr(e);
  a.r = r["!row"];
  var i = e.read_shift(1), s = [a, i, "b"];
  if (r.cellFormula) {
    e.l += 2;
    var f = An(e, n - e.l, r);
    s[3] = xt(f, null, a, r.supbooks, r);
  } else
    e.l = n;
  return s;
}
function x1(e, t, r) {
  var n = e.l + t, a = hr(e);
  a.r = r["!row"];
  var i = e.read_shift(1), s = [a, i, "e"];
  if (r.cellFormula) {
    e.l += 2;
    var f = An(e, n - e.l, r);
    s[3] = xt(f, null, a, r.supbooks, r);
  } else
    e.l = n;
  return s;
}
function d1(e, t, r) {
  var n = e.l + t, a = hr(e);
  a.r = r["!row"];
  var i = gt(e), s = [a, i, "n"];
  if (r.cellFormula) {
    e.l += 2;
    var f = An(e, n - e.l, r);
    s[3] = xt(f, null, a, r.supbooks, r);
  } else
    e.l = n;
  return s;
}
function p1(e, t, r) {
  var n = e.l + t, a = hr(e);
  a.r = r["!row"];
  var i = ze(e), s = [a, i, "str"];
  if (r.cellFormula) {
    e.l += 2;
    var f = An(e, n - e.l, r);
    s[3] = xt(f, null, a, r.supbooks, r);
  } else
    e.l = n;
  return s;
}
var v1 = tt, m1 = mt;
function g1(e, t) {
  return t == null && (t = B(4)), t.write_shift(4, e), t;
}
function _1(e, t) {
  var r = e.l + t, n = tt(e), a = f0(e), i = ze(e), s = ze(e), f = ze(e);
  e.l = r;
  var o = { rfx: n, relId: a, loc: i, display: f };
  return s && (o.Tooltip = s), o;
}
function T1(e, t) {
  var r = B(50 + 4 * (e[1].Target.length + (e[1].Tooltip || "").length));
  mt({ s: Me(e[0]), e: Me(e[0]) }, r), l0("rId" + t, r);
  var n = e[1].Target.indexOf("#"), a = n == -1 ? "" : e[1].Target.slice(n + 1);
  return Be(a || "", r), Be(e[1].Tooltip || "", r), Be("", r), r.slice(0, r.l);
}
function E1() {
}
function w1(e, t, r) {
  var n = e.l + t, a = gi(e), i = e.read_shift(1), s = [a];
  if (s[2] = i, r.cellFormula) {
    var f = cu(e, n - e.l, r);
    s[1] = f;
  } else
    e.l = n;
  return s;
}
function S1(e, t, r) {
  var n = e.l + t, a = tt(e), i = [a];
  if (r.cellFormula) {
    var s = uu(e, n - e.l, r);
    i[1] = s, e.l = n;
  } else
    e.l = n;
  return i;
}
function A1(e, t, r) {
  r == null && (r = B(18));
  var n = Fn(e, t);
  r.write_shift(-4, e), r.write_shift(-4, e), r.write_shift(4, (n.width || 10) * 256), r.write_shift(
    4,
    0
    /*ixfe*/
  );
  var a = 0;
  return t.hidden && (a |= 1), typeof n.width == "number" && (a |= 2), t.level && (a |= t.level << 8), r.write_shift(2, a), r;
}
var rs = ["left", "right", "top", "bottom", "header", "footer"];
function F1(e) {
  var t = {};
  return rs.forEach(function(r) {
    t[r] = gt(e);
  }), t;
}
function y1(e, t) {
  return t == null && (t = B(6 * 8)), Qi(e), rs.forEach(function(r) {
    Yr(e[r], t);
  }), t;
}
function C1(e) {
  var t = e.read_shift(2);
  return e.l += 28, { RTL: t & 32 };
}
function O1(e, t, r) {
  r == null && (r = B(30));
  var n = 924;
  return (((t || {}).Views || [])[0] || {}).RTL && (n |= 32), r.write_shift(2, n), r.write_shift(4, 0), r.write_shift(4, 0), r.write_shift(4, 0), r.write_shift(1, 0), r.write_shift(1, 0), r.write_shift(2, 0), r.write_shift(2, 100), r.write_shift(2, 0), r.write_shift(2, 0), r.write_shift(2, 0), r.write_shift(4, 0), r;
}
function D1(e) {
  var t = B(24);
  return t.write_shift(4, 4), t.write_shift(4, 1), mt(e, t), t;
}
function R1(e, t) {
  return t == null && (t = B(16 * 4 + 2)), t.write_shift(2, e.password ? Mi(e.password) : 0), t.write_shift(4, 1), [
    ["objects", !1],
    // fObjects
    ["scenarios", !1],
    // fScenarios
    ["formatCells", !0],
    // fFormatCells
    ["formatColumns", !0],
    // fFormatColumns
    ["formatRows", !0],
    // fFormatRows
    ["insertColumns", !0],
    // fInsertColumns
    ["insertRows", !0],
    // fInsertRows
    ["insertHyperlinks", !0],
    // fInsertHyperlinks
    ["deleteColumns", !0],
    // fDeleteColumns
    ["deleteRows", !0],
    // fDeleteRows
    ["selectLockedCells", !1],
    // fSelLockedCells
    ["sort", !0],
    // fSort
    ["autoFilter", !0],
    // fAutoFilter
    ["pivotTables", !0],
    // fPivotTables
    ["selectUnlockedCells", !1]
    // fSelUnlockedCells
  ].forEach(function(r) {
    r[1] ? t.write_shift(4, e[r[0]] != null && !e[r[0]] ? 1 : 0) : t.write_shift(4, e[r[0]] != null && e[r[0]] ? 0 : 1);
  }), t;
}
function N1() {
}
function I1() {
}
function k1(e, t, r, n, a, i, s) {
  if (t.v === void 0)
    return !1;
  var f = "";
  switch (t.t) {
    case "b":
      f = t.v ? "1" : "0";
      break;
    case "d":
      t = er(t), t.z = t.z || Ce[14], t.v = Qe(qe(t.v)), t.t = "n";
      break;
    case "n":
    case "e":
      f = "" + t.v;
      break;
    default:
      f = t.v;
      break;
  }
  var o = { r, c: n };
  switch (o.s = Hr(a.cellXfs, t, a), t.l && i["!links"].push([me(o), t.l]), t.c && i["!comments"].push([me(o), t.c]), t.t) {
    case "s":
    case "str":
      return a.bookSST ? (f = d0(a.Strings, t.v, a.revStrings), o.t = "s", o.v = f, s ? W(e, 18, Zu(t, o)) : W(e, 7, Ju(t, o))) : (o.t = "str", s ? W(e, 17, h1(t, o)) : W(e, 6, o1(t, o))), !0;
    case "n":
      return t.v == (t.v | 0) && t.v > -1e3 && t.v < 1e3 ? s ? W(e, 13, s1(t, o)) : W(e, 2, a1(t, o)) : s ? W(e, 16, t1(t, o)) : W(e, 5, e1(t, o)), !0;
    case "b":
      return o.t = "b", s ? W(e, 15, Xu(t, o)) : W(e, 4, Vu(t, o)), !0;
    case "e":
      return o.t = "e", s ? W(e, 14, Ku(t, o)) : W(e, 3, $u(t, o)), !0;
  }
  return s ? W(e, 12, Wu(t, o)) : W(e, 1, bu(t, o)), !0;
}
function P1(e, t, r, n) {
  var a = Ee(t["!ref"] || "A1"), i, s = "", f = [];
  W(
    e,
    145
    /* BrtBeginSheetData */
  );
  var o = Array.isArray(t), l = a.e.r;
  t["!rows"] && (l = Math.max(a.e.r, t["!rows"].length - 1));
  for (var c = a.s.r; c <= l; ++c) {
    s = Ge(c), Nu(e, t, a, c);
    var u = !1;
    if (c <= a.e.r)
      for (var h = a.s.c; h <= a.e.c; ++h) {
        c === a.s.r && (f[h] = $e(h)), i = f[h] + s;
        var p = o ? (t[c] || [])[h] : t[i];
        if (!p) {
          u = !1;
          continue;
        }
        u = k1(e, p, c, h, n, t, u);
      }
  }
  W(
    e,
    146
    /* BrtEndSheetData */
  );
}
function L1(e, t) {
  !t || !t["!merges"] || (W(e, 177, g1(t["!merges"].length)), t["!merges"].forEach(function(r) {
    W(e, 176, m1(r));
  }), W(
    e,
    178
    /* BrtEndMergeCells */
  ));
}
function M1(e, t) {
  !t || !t["!cols"] || (W(
    e,
    390
    /* BrtBeginColInfos */
  ), t["!cols"].forEach(function(r, n) {
    r && W(e, 60, A1(n, r));
  }), W(
    e,
    391
    /* BrtEndColInfos */
  ));
}
function B1(e, t) {
  !t || !t["!ref"] || (W(
    e,
    648
    /* BrtBeginCellIgnoreECs */
  ), W(e, 649, D1(Ee(t["!ref"]))), W(
    e,
    650
    /* BrtEndCellIgnoreECs */
  ));
}
function b1(e, t, r) {
  t["!links"].forEach(function(n) {
    if (n[1].Target) {
      var a = pe(r, -1, n[1].Target.replace(/#.*$/, ""), he.HLINK);
      W(e, 494, T1(n, a));
    }
  }), delete t["!links"];
}
function U1(e, t, r, n) {
  if (t["!comments"].length > 0) {
    var a = pe(n, -1, "../drawings/vmlDrawing" + (r + 1) + ".vml", he.VML);
    W(e, 551, l0("rId" + a)), t["!legacy"] = a;
  }
}
function W1(e, t, r, n) {
  if (t["!autofilter"]) {
    var a = t["!autofilter"], i = typeof a.ref == "string" ? a.ref : Ne(a.ref);
    r.Workbook || (r.Workbook = { Sheets: [] }), r.Workbook.Names || (r.Workbook.Names = []);
    var s = r.Workbook.Names, f = sr(i);
    f.s.r == f.e.r && (f.e.r = sr(t["!ref"]).e.r, i = Ne(f));
    for (var o = 0; o < s.length; ++o) {
      var l = s[o];
      if (l.Name == "_xlnm._FilterDatabase" && l.Sheet == n) {
        l.Ref = "'" + r.SheetNames[n] + "'!" + i;
        break;
      }
    }
    o == s.length && s.push({ Name: "_xlnm._FilterDatabase", Sheet: n, Ref: "'" + r.SheetNames[n] + "'!" + i }), W(e, 161, mt(Ee(i))), W(
      e,
      162
      /* BrtEndAFilter */
    );
  }
}
function H1(e, t, r) {
  W(
    e,
    133
    /* BrtBeginWsViews */
  ), W(e, 137, O1(t, r)), W(
    e,
    138
    /* BrtEndWsView */
  ), W(
    e,
    134
    /* BrtEndWsViews */
  );
}
function V1(e, t) {
  t["!protect"] && W(e, 535, R1(t["!protect"]));
}
function G1(e, t, r, n) {
  var a = Ze(), i = r.SheetNames[e], s = r.Sheets[i] || {}, f = i;
  try {
    r && r.Workbook && (f = r.Workbook.Sheets[e].CodeName || f);
  } catch {
  }
  var o = Ee(s["!ref"] || "A1");
  if (o.e.c > 16383 || o.e.r > 1048575) {
    if (t.WTF)
      throw new Error("Range " + (s["!ref"] || "A1") + " exceeds format limit A1:XFD1048576");
    o.e.c = Math.min(o.e.c, 16383), o.e.r = Math.min(o.e.c, 1048575);
  }
  return s["!links"] = [], s["!comments"] = [], W(
    a,
    129
    /* BrtBeginSheet */
  ), (r.vbaraw || s["!outline"]) && W(a, 147, Mu(f, s["!outline"])), W(a, 148, ku(o)), H1(a, s, r.Workbook), M1(a, s), P1(a, s, e, t), V1(a, s), W1(a, s, r, e), L1(a, s), b1(a, s, n), s["!margins"] && W(a, 476, y1(s["!margins"])), (!t || t.ignoreEC || t.ignoreEC == null) && B1(a, s), U1(a, s, e, n), W(
    a,
    130
    /* BrtEndSheet */
  ), a.end();
}
function X1(e, t) {
  e.l += 10;
  var r = ze(e);
  return { name: r };
}
var j1 = [
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
function $1(e) {
  return !e.Workbook || !e.Workbook.WBProps ? "false" : wl(e.Workbook.WBProps.date1904) ? "true" : "false";
}
var z1 = /* @__PURE__ */ "][*?/\\".split("");
function ts(e, t) {
  if (e.length > 31) {
    if (t)
      return !1;
    throw new Error("Sheet names cannot exceed 31 chars");
  }
  var r = !0;
  return z1.forEach(function(n) {
    if (e.indexOf(n) != -1) {
      if (!t)
        throw new Error("Sheet name cannot contain : \\ / ? * [ ]");
      r = !1;
    }
  }), r;
}
function K1(e, t, r) {
  e.forEach(function(n, a) {
    ts(n);
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
function Y1(e) {
  if (!e || !e.SheetNames || !e.Sheets)
    throw new Error("Invalid Workbook");
  if (!e.SheetNames.length)
    throw new Error("Workbook is empty");
  var t = e.Workbook && e.Workbook.Sheets || [];
  K1(e.SheetNames, t, !!e.vbaraw);
  for (var r = 0; r < e.SheetNames.length; ++r)
    mu(e.Sheets[e.SheetNames[r]], e.SheetNames[r], r);
}
function ns(e) {
  var t = [Ie];
  t[t.length] = Y("workbook", null, {
    xmlns: pt[0],
    //'xmlns:mx': XMLNS.mx,
    //'xmlns:s': XMLNS_main[0],
    "xmlns:r": Le.r
  });
  var r = e.Workbook && (e.Workbook.Names || []).length > 0, n = { codeName: "ThisWorkbook" };
  e.Workbook && e.Workbook.WBProps && (j1.forEach(function(f) {
    e.Workbook.WBProps[f[0]] != null && e.Workbook.WBProps[f[0]] != f[1] && (n[f[0]] = e.Workbook.WBProps[f[0]]);
  }), e.Workbook.WBProps.CodeName && (n.codeName = e.Workbook.WBProps.CodeName, delete n.CodeName)), t[t.length] = Y("workbookPr", null, n);
  var a = e.Workbook && e.Workbook.Sheets || [], i = 0;
  if (a && a[0] && a[0].Hidden) {
    for (t[t.length] = "<bookViews>", i = 0; i != e.SheetNames.length && !(!a[i] || !a[i].Hidden); ++i)
      ;
    i == e.SheetNames.length && (i = 0), t[t.length] = '<workbookView firstSheet="' + i + '" activeTab="' + i + '"/>', t[t.length] = "</bookViews>";
  }
  for (t[t.length] = "<sheets>", i = 0; i != e.SheetNames.length; ++i) {
    var s = { name: ve(e.SheetNames[i].slice(0, 31)) };
    if (s.sheetId = "" + (i + 1), s["r:id"] = "rId" + (i + 1), a[i])
      switch (a[i].Hidden) {
        case 1:
          s.state = "hidden";
          break;
        case 2:
          s.state = "veryHidden";
          break;
      }
    t[t.length] = Y("sheet", null, s);
  }
  return t[t.length] = "</sheets>", r && (t[t.length] = "<definedNames>", e.Workbook && e.Workbook.Names && e.Workbook.Names.forEach(function(f) {
    var o = { name: f.Name };
    f.Comment && (o.comment = f.Comment), f.Sheet != null && (o.localSheetId = "" + f.Sheet), f.Hidden && (o.hidden = "1"), f.Ref && (t[t.length] = Y("definedName", ve(f.Ref), o));
  }), t[t.length] = "</definedNames>"), t.length > 2 && (t[t.length] = "</workbook>", t[1] = t[1].replace("/>", ">")), t.join("");
}
function J1(e, t) {
  var r = {};
  return r.Hidden = e.read_shift(4), r.iTabID = e.read_shift(4), r.strRelID = Xn(e), r.name = ze(e), r;
}
function q1(e, t) {
  return t || (t = B(127)), t.write_shift(4, e.Hidden), t.write_shift(4, e.iTabID), l0(e.strRelID, t), Be(e.name.slice(0, 31), t), t.length > t.l ? t.slice(0, t.l) : t;
}
function Z1(e, t) {
  var r = {}, n = e.read_shift(4);
  r.defaultThemeVersion = e.read_shift(4);
  var a = t > 8 ? ze(e) : "";
  return a.length > 0 && (r.CodeName = a), r.autoCompressPictures = !!(n & 65536), r.backupFile = !!(n & 64), r.checkCompatibility = !!(n & 4096), r.date1904 = !!(n & 1), r.filterPrivacy = !!(n & 8), r.hidePivotFieldList = !!(n & 1024), r.promptedSolutions = !!(n & 16), r.publishItems = !!(n & 2048), r.refreshAllConnections = !!(n & 262144), r.saveExternalLinkValues = !!(n & 128), r.showBorderUnselectedTables = !!(n & 4), r.showInkAnnotation = !!(n & 32), r.showObjects = ["all", "placeholders", "none"][n >> 13 & 3], r.showPivotChartFilter = !!(n & 32768), r.updateLinks = ["userSet", "never", "always"][n >> 8 & 3], r;
}
function Q1(e, t) {
  t || (t = B(72));
  var r = 0;
  return e && e.filterPrivacy && (r |= 8), t.write_shift(4, r), t.write_shift(4, 0), pi(e && e.CodeName || "ThisWorkbook", t), t.slice(0, t.l);
}
function ex(e, t, r) {
  var n = e.l + t;
  e.l += 4, e.l += 1;
  var a = e.read_shift(4), i = jl(e), s = hu(e, 0, r), f = f0(e);
  e.l = n;
  var o = { Name: i, Ptg: s };
  return a < 268435455 && (o.Sheet = a), f && (o.Comment = f), o;
}
function rx(e, t) {
  W(
    e,
    143
    /* BrtBeginBundleShs */
  );
  for (var r = 0; r != t.SheetNames.length; ++r) {
    var n = t.Workbook && t.Workbook.Sheets && t.Workbook.Sheets[r] && t.Workbook.Sheets[r].Hidden || 0, a = { Hidden: n, iTabID: r + 1, strRelID: "rId" + (r + 1), name: t.SheetNames[r] };
    W(e, 156, q1(a));
  }
  W(
    e,
    144
    /* BrtEndBundleShs */
  );
}
function tx(e, t) {
  t || (t = B(127));
  for (var r = 0; r != 4; ++r)
    t.write_shift(4, 0);
  return Be("SheetJS", t), Be(tn.version, t), Be(tn.version, t), Be("7262", t), t.length > t.l ? t.slice(0, t.l) : t;
}
function nx(e, t) {
  t || (t = B(29)), t.write_shift(-4, 0), t.write_shift(-4, 460), t.write_shift(4, 28800), t.write_shift(4, 17600), t.write_shift(4, 500), t.write_shift(4, e), t.write_shift(4, e);
  var r = 120;
  return t.write_shift(1, r), t.length > t.l ? t.slice(0, t.l) : t;
}
function ax(e, t) {
  if (!(!t.Workbook || !t.Workbook.Sheets)) {
    for (var r = t.Workbook.Sheets, n = 0, a = -1, i = -1; n < r.length; ++n)
      !r[n] || !r[n].Hidden && a == -1 ? a = n : r[n].Hidden == 1 && i == -1 && (i = n);
    i > a || (W(
      e,
      135
      /* BrtBeginBookViews */
    ), W(e, 158, nx(a)), W(
      e,
      136
      /* BrtEndBookViews */
    ));
  }
}
function ix(e, t) {
  var r = Ze();
  return W(
    r,
    131
    /* BrtBeginBook */
  ), W(r, 128, tx()), W(r, 153, Q1(e.Workbook && e.Workbook.WBProps || null)), ax(r, e), rx(r, e), W(
    r,
    132
    /* BrtEndBook */
  ), r.end();
}
function sx(e, t, r) {
  return (t.slice(-4) === ".bin" ? ix : ns)(e);
}
function fx(e, t, r, n, a) {
  return (t.slice(-4) === ".bin" ? G1 : es)(e, r, n, a);
}
function lx(e, t, r) {
  return (t.slice(-4) === ".bin" ? yc : Ui)(e, r);
}
function ox(e, t, r) {
  return (t.slice(-4) === ".bin" ? Qo : Li)(e, r);
}
function cx(e, t, r) {
  return (t.slice(-4) === ".bin" ? Vc : Xi)(e);
}
function hx(e) {
  return (e.slice(-4) === ".bin" ? Pc : Vi)();
}
function ux(e, t) {
  var r = [];
  return e.Props && r.push(fo(e.Props, t)), e.Custprops && r.push(lo(e.Props, e.Custprops)), r.join("");
}
function xx() {
  return "";
}
function dx(e, t) {
  var r = ['<Style ss:ID="Default" ss:Name="Normal"><NumberFormat/></Style>'];
  return t.cellXfs.forEach(function(n, a) {
    var i = [];
    i.push(Y("NumberFormat", null, { "ss:Format": ve(Ce[n.numFmtId]) }));
    var s = (
      /*::(*/
      { "ss:ID": "s" + (21 + a) }
    );
    r.push(Y("Style", i.join(""), s));
  }), Y("Styles", r.join(""));
}
function as(e) {
  return Y("NamedRange", null, { "ss:Name": e.Name, "ss:RefersTo": "=" + u0(e.Ref, { r: 0, c: 0 }) });
}
function px(e) {
  if (!((e || {}).Workbook || {}).Names)
    return "";
  for (var t = e.Workbook.Names, r = [], n = 0; n < t.length; ++n) {
    var a = t[n];
    a.Sheet == null && (a.Name.match(/^_xlfn\./) || r.push(as(a)));
  }
  return Y("Names", r.join(""));
}
function vx(e, t, r, n) {
  if (!e || !((n || {}).Workbook || {}).Names)
    return "";
  for (var a = n.Workbook.Names, i = [], s = 0; s < a.length; ++s) {
    var f = a[s];
    f.Sheet == r && (f.Name.match(/^_xlfn\./) || i.push(as(f)));
  }
  return i.join("");
}
function mx(e, t, r, n) {
  if (!e)
    return "";
  var a = [];
  if (e["!margins"] && (a.push("<PageSetup>"), e["!margins"].header && a.push(Y("Header", null, { "x:Margin": e["!margins"].header })), e["!margins"].footer && a.push(Y("Footer", null, { "x:Margin": e["!margins"].footer })), a.push(Y("PageMargins", null, {
    "x:Bottom": e["!margins"].bottom || "0.75",
    "x:Left": e["!margins"].left || "0.7",
    "x:Right": e["!margins"].right || "0.7",
    "x:Top": e["!margins"].top || "0.75"
  })), a.push("</PageSetup>")), n && n.Workbook && n.Workbook.Sheets && n.Workbook.Sheets[r])
    if (n.Workbook.Sheets[r].Hidden)
      a.push(Y("Visible", n.Workbook.Sheets[r].Hidden == 1 ? "SheetHidden" : "SheetVeryHidden", {}));
    else {
      for (var i = 0; i < r && !(n.Workbook.Sheets[i] && !n.Workbook.Sheets[i].Hidden); ++i)
        ;
      i == r && a.push("<Selected/>");
    }
  return ((((n || {}).Workbook || {}).Views || [])[0] || {}).RTL && a.push("<DisplayRightToLeft/>"), e["!protect"] && (a.push(Ve("ProtectContents", "True")), e["!protect"].objects && a.push(Ve("ProtectObjects", "True")), e["!protect"].scenarios && a.push(Ve("ProtectScenarios", "True")), e["!protect"].selectLockedCells != null && !e["!protect"].selectLockedCells ? a.push(Ve("EnableSelection", "NoSelection")) : e["!protect"].selectUnlockedCells != null && !e["!protect"].selectUnlockedCells && a.push(Ve("EnableSelection", "UnlockedCells")), [
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
  })), a.length == 0 ? "" : Y("WorksheetOptions", a.join(""), { xmlns: ar.x });
}
function gx(e) {
  return e.map(function(t) {
    var r = El(t.t || ""), n = Y("ss:Data", r, { xmlns: "http://www.w3.org/TR/REC-html40" });
    return Y("Comment", n, { "ss:Author": t.a });
  }).join("");
}
function _x(e, t, r, n, a, i, s) {
  if (!e || e.v == null && e.f == null)
    return "";
  var f = {};
  if (e.f && (f["ss:Formula"] = "=" + ve(u0(e.f, s))), e.F && e.F.slice(0, t.length) == t) {
    var o = Me(e.F.slice(t.length + 1));
    f["ss:ArrayRange"] = "RC:R" + (o.r == s.r ? "" : "[" + (o.r - s.r) + "]") + "C" + (o.c == s.c ? "" : "[" + (o.c - s.c) + "]");
  }
  if (e.l && e.l.Target && (f["ss:HRef"] = ve(e.l.Target), e.l.Tooltip && (f["x:HRefScreenTip"] = ve(e.l.Tooltip))), r["!merges"])
    for (var l = r["!merges"], c = 0; c != l.length; ++c)
      l[c].s.c != s.c || l[c].s.r != s.r || (l[c].e.c > l[c].s.c && (f["ss:MergeAcross"] = l[c].e.c - l[c].s.c), l[c].e.r > l[c].s.r && (f["ss:MergeDown"] = l[c].e.r - l[c].s.r));
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
      u = "Error", h = Ht[e.v];
      break;
    case "d":
      u = "DateTime", h = new Date(e.v).toISOString(), e.z == null && (e.z = e.z || Ce[14]);
      break;
    case "s":
      u = "String", h = Tl(e.v || "");
      break;
  }
  var p = Hr(n.cellXfs, e, n);
  f["ss:StyleID"] = "s" + (21 + p), f["ss:Index"] = s.c + 1;
  var _ = e.v != null ? h : "", x = e.t == "z" ? "" : '<Data ss:Type="' + u + '">' + _ + "</Data>";
  return (e.c || []).length > 0 && (x += gx(e.c)), Y("Cell", x, f);
}
function Tx(e, t) {
  var r = '<Row ss:Index="' + (e + 1) + '"';
  return t && (t.hpt && !t.hpx && (t.hpx = bi(t.hpt)), t.hpx && (r += ' ss:AutoFitHeight="0" ss:Height="' + t.hpx + '"'), t.hidden && (r += ' ss:Hidden="1"')), r + ">";
}
function Ex(e, t, r, n) {
  if (!e["!ref"])
    return "";
  var a = Ee(e["!ref"]), i = e["!merges"] || [], s = 0, f = [];
  e["!cols"] && e["!cols"].forEach(function(g, C) {
    c0(g);
    var O = !!g.width, F = Fn(C, g), L = { "ss:Index": C + 1 };
    O && (L["ss:Width"] = un(F.width)), g.hidden && (L["ss:Hidden"] = "1"), f.push(Y("Column", null, L));
  });
  for (var o = Array.isArray(e), l = a.s.r; l <= a.e.r; ++l) {
    for (var c = [Tx(l, (e["!rows"] || [])[l])], u = a.s.c; u <= a.e.c; ++u) {
      var h = !1;
      for (s = 0; s != i.length; ++s)
        if (!(i[s].s.c > u) && !(i[s].s.r > l) && !(i[s].e.c < u) && !(i[s].e.r < l)) {
          (i[s].s.c != u || i[s].s.r != l) && (h = !0);
          break;
        }
      if (!h) {
        var p = { r: l, c: u }, _ = me(p), x = o ? (e[l] || [])[u] : e[_];
        c.push(_x(x, _, e, t, r, n, p));
      }
    }
    c.push("</Row>"), c.length > 2 && f.push(c.join(""));
  }
  return f.join("");
}
function wx(e, t, r) {
  var n = [], a = r.SheetNames[e], i = r.Sheets[a], s = i ? vx(i, t, e, r) : "";
  return s.length > 0 && n.push("<Names>" + s + "</Names>"), s = i ? Ex(i, t, e, r) : "", s.length > 0 && n.push("<Table>" + s + "</Table>"), n.push(mx(i, t, e, r)), n.join("");
}
function Sx(e, t) {
  t || (t = {}), e.SSF || (e.SSF = er(Ce)), e.SSF && (Tn(), _n(e.SSF), t.revssf = En(e.SSF), t.revssf[e.SSF[65535]] = 0, t.ssf = e.SSF, t.cellXfs = [], Hr(t.cellXfs, {}, { revssf: { General: 0 } }));
  var r = [];
  r.push(ux(e, t)), r.push(xx()), r.push(""), r.push("");
  for (var n = 0; n < e.SheetNames.length; ++n)
    r.push(Y("Worksheet", wx(n, t, e), { "ss:Name": ve(e.SheetNames[n]) }));
  return r[2] = dx(e, t), r[3] = px(e), Ie + Y("Workbook", r.join(""), {
    xmlns: ar.ss,
    "xmlns:o": ar.o,
    "xmlns:x": ar.x,
    "xmlns:ss": ar.ss,
    "xmlns:dt": ar.dt,
    "xmlns:html": ar.html
  });
}
var bn = {
  SI: "e0859ff2f94f6810ab9108002b27b3d9",
  DSI: "02d5cdd59c2e1b10939708002b2cf9ae",
  UDI: "05d5cdd59c2e1b10939708002b2cf9ae"
};
function Ax(e, t) {
  var r = [], n = [], a = [], i = 0, s, f = z0(sa, "n"), o = z0(fa, "n");
  if (e.Props)
    for (s = Xe(e.Props), i = 0; i < s.length; ++i)
      (Object.prototype.hasOwnProperty.call(f, s[i]) ? r : Object.prototype.hasOwnProperty.call(o, s[i]) ? n : a).push([s[i], e.Props[s[i]]]);
  if (e.Custprops)
    for (s = Xe(e.Custprops), i = 0; i < s.length; ++i)
      Object.prototype.hasOwnProperty.call(e.Props || {}, s[i]) || (Object.prototype.hasOwnProperty.call(f, s[i]) ? r : Object.prototype.hasOwnProperty.call(o, s[i]) ? n : a).push([s[i], e.Custprops[s[i]]]);
  var l = [];
  for (i = 0; i < a.length; ++i)
    Oi.indexOf(a[i][0]) > -1 || Fi.indexOf(a[i][0]) > -1 || a[i][1] != null && l.push(a[i]);
  n.length && _e.utils.cfb_add(t, "/SummaryInformation", ua(n, bn.SI, o, fa)), (r.length || l.length) && _e.utils.cfb_add(t, "/DocumentSummaryInformation", ua(r, bn.DSI, f, sa, l.length ? l : null, bn.UDI));
}
function Fx(e, t) {
  var r = t || {}, n = _e.utils.cfb_new({ root: "R" }), a = "/Workbook";
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
  return _e.utils.cfb_add(n, a, is(e, r)), r.biff == 8 && (e.Props || e.Custprops) && Ax(e, n), r.biff == 8 && e.vbaraw && Gc(n, _e.read(e.vbaraw, { type: typeof e.vbaraw == "string" ? "binary" : "buffer" })), n;
}
var yx = {
  /*::[*/
  0: {
    /* n:"BrtRowHdr", */
    f: Du
  },
  /*::[*/
  1: {
    /* n:"BrtCellBlank", */
    f: Bu
  },
  /*::[*/
  2: {
    /* n:"BrtCellRk", */
    f: n1
  },
  /*::[*/
  3: {
    /* n:"BrtCellError", */
    f: ju
  },
  /*::[*/
  4: {
    /* n:"BrtCellBool", */
    f: Hu
  },
  /*::[*/
  5: {
    /* n:"BrtCellReal", */
    f: Qu
  },
  /*::[*/
  6: {
    /* n:"BrtCellSt", */
    f: l1
  },
  /*::[*/
  7: {
    /* n:"BrtCellIsst", */
    f: Yu
  },
  /*::[*/
  8: {
    /* n:"BrtFmlaString", */
    f: p1
  },
  /*::[*/
  9: {
    /* n:"BrtFmlaNum", */
    f: d1
  },
  /*::[*/
  10: {
    /* n:"BrtFmlaBool", */
    f: u1
  },
  /*::[*/
  11: {
    /* n:"BrtFmlaError", */
    f: x1
  },
  /*::[*/
  12: {
    /* n:"BrtShortBlank", */
    f: Uu
  },
  /*::[*/
  13: {
    /* n:"BrtShortRk", */
    f: i1
  },
  /*::[*/
  14: {
    /* n:"BrtShortError", */
    f: zu
  },
  /*::[*/
  15: {
    /* n:"BrtShortBool", */
    f: Gu
  },
  /*::[*/
  16: {
    /* n:"BrtShortReal", */
    f: r1
  },
  /*::[*/
  17: {
    /* n:"BrtShortSt", */
    f: c1
  },
  /*::[*/
  18: {
    /* n:"BrtShortIsst", */
    f: qu
  },
  /*::[*/
  19: {
    /* n:"BrtSSTItem", */
    f: s0
  },
  /*::[*/
  20: {
    /* n:"BrtPCDIMissing" */
  },
  /*::[*/
  21: {
    /* n:"BrtPCDINumber" */
  },
  /*::[*/
  22: {
    /* n:"BrtPCDIBoolean" */
  },
  /*::[*/
  23: {
    /* n:"BrtPCDIError" */
  },
  /*::[*/
  24: {
    /* n:"BrtPCDIString" */
  },
  /*::[*/
  25: {
    /* n:"BrtPCDIDatetime" */
  },
  /*::[*/
  26: {
    /* n:"BrtPCDIIndex" */
  },
  /*::[*/
  27: {
    /* n:"BrtPCDIAMissing" */
  },
  /*::[*/
  28: {
    /* n:"BrtPCDIANumber" */
  },
  /*::[*/
  29: {
    /* n:"BrtPCDIABoolean" */
  },
  /*::[*/
  30: {
    /* n:"BrtPCDIAError" */
  },
  /*::[*/
  31: {
    /* n:"BrtPCDIAString" */
  },
  /*::[*/
  32: {
    /* n:"BrtPCDIADatetime" */
  },
  /*::[*/
  33: {
    /* n:"BrtPCRRecord" */
  },
  /*::[*/
  34: {
    /* n:"BrtPCRRecordDt" */
  },
  /*::[*/
  35: {
    /* n:"BrtFRTBegin", */
    T: 1
  },
  /*::[*/
  36: {
    /* n:"BrtFRTEnd", */
    T: -1
  },
  /*::[*/
  37: {
    /* n:"BrtACBegin", */
    T: 1
  },
  /*::[*/
  38: {
    /* n:"BrtACEnd", */
    T: -1
  },
  /*::[*/
  39: {
    /* n:"BrtName", */
    f: ex
  },
  /*::[*/
  40: {
    /* n:"BrtIndexRowBlock" */
  },
  /*::[*/
  42: {
    /* n:"BrtIndexBlock" */
  },
  /*::[*/
  43: {
    /* n:"BrtFont", */
    f: lc
  },
  /*::[*/
  44: {
    /* n:"BrtFmt", */
    f: sc
  },
  /*::[*/
  45: {
    /* n:"BrtFill", */
    f: hc
  },
  /*::[*/
  46: {
    /* n:"BrtBorder", */
    f: xc
  },
  /*::[*/
  47: {
    /* n:"BrtXF", */
    f: uc
  },
  /*::[*/
  48: {
    /* n:"BrtStyle" */
  },
  /*::[*/
  49: {
    /* n:"BrtCellMeta", */
    f: bl
  },
  /*::[*/
  50: {
    /* n:"BrtValueMeta" */
  },
  /*::[*/
  51: {
    /* n:"BrtMdb" */
    f: Dc
  },
  /*::[*/
  52: {
    /* n:"BrtBeginFmd", */
    T: 1
  },
  /*::[*/
  53: {
    /* n:"BrtEndFmd", */
    T: -1
  },
  /*::[*/
  54: {
    /* n:"BrtBeginMdx", */
    T: 1
  },
  /*::[*/
  55: {
    /* n:"BrtEndMdx", */
    T: -1
  },
  /*::[*/
  56: {
    /* n:"BrtBeginMdxTuple", */
    T: 1
  },
  /*::[*/
  57: {
    /* n:"BrtEndMdxTuple", */
    T: -1
  },
  /*::[*/
  58: {
    /* n:"BrtMdxMbrIstr" */
  },
  /*::[*/
  59: {
    /* n:"BrtStr" */
  },
  /*::[*/
  60: {
    /* n:"BrtColInfo", */
    f: Wo
  },
  /*::[*/
  62: {
    /* n:"BrtCellRString", */
    f: f1
  },
  /*::[*/
  63: {
    /* n:"BrtCalcChainItem$", */
    f: Lc
  },
  /*::[*/
  64: {
    /* n:"BrtDVal", */
    f: N1
  },
  /*::[*/
  65: {
    /* n:"BrtSxvcellNum" */
  },
  /*::[*/
  66: {
    /* n:"BrtSxvcellStr" */
  },
  /*::[*/
  67: {
    /* n:"BrtSxvcellBool" */
  },
  /*::[*/
  68: {
    /* n:"BrtSxvcellErr" */
  },
  /*::[*/
  69: {
    /* n:"BrtSxvcellDate" */
  },
  /*::[*/
  70: {
    /* n:"BrtSxvcellNil" */
  },
  /*::[*/
  128: {
    /* n:"BrtFileVersion" */
  },
  /*::[*/
  129: {
    /* n:"BrtBeginSheet", */
    T: 1
  },
  /*::[*/
  130: {
    /* n:"BrtEndSheet", */
    T: -1
  },
  /*::[*/
  131: {
    /* n:"BrtBeginBook", */
    T: 1,
    f: Er,
    p: 0
  },
  /*::[*/
  132: {
    /* n:"BrtEndBook", */
    T: -1
  },
  /*::[*/
  133: {
    /* n:"BrtBeginWsViews", */
    T: 1
  },
  /*::[*/
  134: {
    /* n:"BrtEndWsViews", */
    T: -1
  },
  /*::[*/
  135: {
    /* n:"BrtBeginBookViews", */
    T: 1
  },
  /*::[*/
  136: {
    /* n:"BrtEndBookViews", */
    T: -1
  },
  /*::[*/
  137: {
    /* n:"BrtBeginWsView", */
    T: 1,
    f: C1
  },
  /*::[*/
  138: {
    /* n:"BrtEndWsView", */
    T: -1
  },
  /*::[*/
  139: {
    /* n:"BrtBeginCsViews", */
    T: 1
  },
  /*::[*/
  140: {
    /* n:"BrtEndCsViews", */
    T: -1
  },
  /*::[*/
  141: {
    /* n:"BrtBeginCsView", */
    T: 1
  },
  /*::[*/
  142: {
    /* n:"BrtEndCsView", */
    T: -1
  },
  /*::[*/
  143: {
    /* n:"BrtBeginBundleShs", */
    T: 1
  },
  /*::[*/
  144: {
    /* n:"BrtEndBundleShs", */
    T: -1
  },
  /*::[*/
  145: {
    /* n:"BrtBeginSheetData", */
    T: 1
  },
  /*::[*/
  146: {
    /* n:"BrtEndSheetData", */
    T: -1
  },
  /*::[*/
  147: {
    /* n:"BrtWsProp", */
    f: Lu
  },
  /*::[*/
  148: {
    /* n:"BrtWsDim", */
    f: Iu,
    p: 16
  },
  /*::[*/
  151: {
    /* n:"BrtPane", */
    f: E1
  },
  /*::[*/
  152: {
    /* n:"BrtSel" */
  },
  /*::[*/
  153: {
    /* n:"BrtWbProp", */
    f: Z1
  },
  /*::[*/
  154: {
    /* n:"BrtWbFactoid" */
  },
  /*::[*/
  155: {
    /* n:"BrtFileRecover" */
  },
  /*::[*/
  156: {
    /* n:"BrtBundleSh", */
    f: J1
  },
  /*::[*/
  157: {
    /* n:"BrtCalcProp" */
  },
  /*::[*/
  158: {
    /* n:"BrtBookView" */
  },
  /*::[*/
  159: {
    /* n:"BrtBeginSst", */
    T: 1,
    f: Jo
  },
  /*::[*/
  160: {
    /* n:"BrtEndSst", */
    T: -1
  },
  /*::[*/
  161: {
    /* n:"BrtBeginAFilter", */
    T: 1,
    f: tt
  },
  /*::[*/
  162: {
    /* n:"BrtEndAFilter", */
    T: -1
  },
  /*::[*/
  163: {
    /* n:"BrtBeginFilterColumn", */
    T: 1
  },
  /*::[*/
  164: {
    /* n:"BrtEndFilterColumn", */
    T: -1
  },
  /*::[*/
  165: {
    /* n:"BrtBeginFilters", */
    T: 1
  },
  /*::[*/
  166: {
    /* n:"BrtEndFilters", */
    T: -1
  },
  /*::[*/
  167: {
    /* n:"BrtFilter" */
  },
  /*::[*/
  168: {
    /* n:"BrtColorFilter" */
  },
  /*::[*/
  169: {
    /* n:"BrtIconFilter" */
  },
  /*::[*/
  170: {
    /* n:"BrtTop10Filter" */
  },
  /*::[*/
  171: {
    /* n:"BrtDynamicFilter" */
  },
  /*::[*/
  172: {
    /* n:"BrtBeginCustomFilters", */
    T: 1
  },
  /*::[*/
  173: {
    /* n:"BrtEndCustomFilters", */
    T: -1
  },
  /*::[*/
  174: {
    /* n:"BrtCustomFilter" */
  },
  /*::[*/
  175: {
    /* n:"BrtAFilterDateGroupItem" */
  },
  /*::[*/
  176: {
    /* n:"BrtMergeCell", */
    f: v1
  },
  /*::[*/
  177: {
    /* n:"BrtBeginMergeCells", */
    T: 1
  },
  /*::[*/
  178: {
    /* n:"BrtEndMergeCells", */
    T: -1
  },
  /*::[*/
  179: {
    /* n:"BrtBeginPivotCacheDef", */
    T: 1
  },
  /*::[*/
  180: {
    /* n:"BrtEndPivotCacheDef", */
    T: -1
  },
  /*::[*/
  181: {
    /* n:"BrtBeginPCDFields", */
    T: 1
  },
  /*::[*/
  182: {
    /* n:"BrtEndPCDFields", */
    T: -1
  },
  /*::[*/
  183: {
    /* n:"BrtBeginPCDField", */
    T: 1
  },
  /*::[*/
  184: {
    /* n:"BrtEndPCDField", */
    T: -1
  },
  /*::[*/
  185: {
    /* n:"BrtBeginPCDSource", */
    T: 1
  },
  /*::[*/
  186: {
    /* n:"BrtEndPCDSource", */
    T: -1
  },
  /*::[*/
  187: {
    /* n:"BrtBeginPCDSRange", */
    T: 1
  },
  /*::[*/
  188: {
    /* n:"BrtEndPCDSRange", */
    T: -1
  },
  /*::[*/
  189: {
    /* n:"BrtBeginPCDFAtbl", */
    T: 1
  },
  /*::[*/
  190: {
    /* n:"BrtEndPCDFAtbl", */
    T: -1
  },
  /*::[*/
  191: {
    /* n:"BrtBeginPCDIRun", */
    T: 1
  },
  /*::[*/
  192: {
    /* n:"BrtEndPCDIRun", */
    T: -1
  },
  /*::[*/
  193: {
    /* n:"BrtBeginPivotCacheRecords", */
    T: 1
  },
  /*::[*/
  194: {
    /* n:"BrtEndPivotCacheRecords", */
    T: -1
  },
  /*::[*/
  195: {
    /* n:"BrtBeginPCDHierarchies", */
    T: 1
  },
  /*::[*/
  196: {
    /* n:"BrtEndPCDHierarchies", */
    T: -1
  },
  /*::[*/
  197: {
    /* n:"BrtBeginPCDHierarchy", */
    T: 1
  },
  /*::[*/
  198: {
    /* n:"BrtEndPCDHierarchy", */
    T: -1
  },
  /*::[*/
  199: {
    /* n:"BrtBeginPCDHFieldsUsage", */
    T: 1
  },
  /*::[*/
  200: {
    /* n:"BrtEndPCDHFieldsUsage", */
    T: -1
  },
  /*::[*/
  201: {
    /* n:"BrtBeginExtConnection", */
    T: 1
  },
  /*::[*/
  202: {
    /* n:"BrtEndExtConnection", */
    T: -1
  },
  /*::[*/
  203: {
    /* n:"BrtBeginECDbProps", */
    T: 1
  },
  /*::[*/
  204: {
    /* n:"BrtEndECDbProps", */
    T: -1
  },
  /*::[*/
  205: {
    /* n:"BrtBeginECOlapProps", */
    T: 1
  },
  /*::[*/
  206: {
    /* n:"BrtEndECOlapProps", */
    T: -1
  },
  /*::[*/
  207: {
    /* n:"BrtBeginPCDSConsol", */
    T: 1
  },
  /*::[*/
  208: {
    /* n:"BrtEndPCDSConsol", */
    T: -1
  },
  /*::[*/
  209: {
    /* n:"BrtBeginPCDSCPages", */
    T: 1
  },
  /*::[*/
  210: {
    /* n:"BrtEndPCDSCPages", */
    T: -1
  },
  /*::[*/
  211: {
    /* n:"BrtBeginPCDSCPage", */
    T: 1
  },
  /*::[*/
  212: {
    /* n:"BrtEndPCDSCPage", */
    T: -1
  },
  /*::[*/
  213: {
    /* n:"BrtBeginPCDSCPItem", */
    T: 1
  },
  /*::[*/
  214: {
    /* n:"BrtEndPCDSCPItem", */
    T: -1
  },
  /*::[*/
  215: {
    /* n:"BrtBeginPCDSCSets", */
    T: 1
  },
  /*::[*/
  216: {
    /* n:"BrtEndPCDSCSets", */
    T: -1
  },
  /*::[*/
  217: {
    /* n:"BrtBeginPCDSCSet", */
    T: 1
  },
  /*::[*/
  218: {
    /* n:"BrtEndPCDSCSet", */
    T: -1
  },
  /*::[*/
  219: {
    /* n:"BrtBeginPCDFGroup", */
    T: 1
  },
  /*::[*/
  220: {
    /* n:"BrtEndPCDFGroup", */
    T: -1
  },
  /*::[*/
  221: {
    /* n:"BrtBeginPCDFGItems", */
    T: 1
  },
  /*::[*/
  222: {
    /* n:"BrtEndPCDFGItems", */
    T: -1
  },
  /*::[*/
  223: {
    /* n:"BrtBeginPCDFGRange", */
    T: 1
  },
  /*::[*/
  224: {
    /* n:"BrtEndPCDFGRange", */
    T: -1
  },
  /*::[*/
  225: {
    /* n:"BrtBeginPCDFGDiscrete", */
    T: 1
  },
  /*::[*/
  226: {
    /* n:"BrtEndPCDFGDiscrete", */
    T: -1
  },
  /*::[*/
  227: {
    /* n:"BrtBeginPCDSDTupleCache", */
    T: 1
  },
  /*::[*/
  228: {
    /* n:"BrtEndPCDSDTupleCache", */
    T: -1
  },
  /*::[*/
  229: {
    /* n:"BrtBeginPCDSDTCEntries", */
    T: 1
  },
  /*::[*/
  230: {
    /* n:"BrtEndPCDSDTCEntries", */
    T: -1
  },
  /*::[*/
  231: {
    /* n:"BrtBeginPCDSDTCEMembers", */
    T: 1
  },
  /*::[*/
  232: {
    /* n:"BrtEndPCDSDTCEMembers", */
    T: -1
  },
  /*::[*/
  233: {
    /* n:"BrtBeginPCDSDTCEMember", */
    T: 1
  },
  /*::[*/
  234: {
    /* n:"BrtEndPCDSDTCEMember", */
    T: -1
  },
  /*::[*/
  235: {
    /* n:"BrtBeginPCDSDTCQueries", */
    T: 1
  },
  /*::[*/
  236: {
    /* n:"BrtEndPCDSDTCQueries", */
    T: -1
  },
  /*::[*/
  237: {
    /* n:"BrtBeginPCDSDTCQuery", */
    T: 1
  },
  /*::[*/
  238: {
    /* n:"BrtEndPCDSDTCQuery", */
    T: -1
  },
  /*::[*/
  239: {
    /* n:"BrtBeginPCDSDTCSets", */
    T: 1
  },
  /*::[*/
  240: {
    /* n:"BrtEndPCDSDTCSets", */
    T: -1
  },
  /*::[*/
  241: {
    /* n:"BrtBeginPCDSDTCSet", */
    T: 1
  },
  /*::[*/
  242: {
    /* n:"BrtEndPCDSDTCSet", */
    T: -1
  },
  /*::[*/
  243: {
    /* n:"BrtBeginPCDCalcItems", */
    T: 1
  },
  /*::[*/
  244: {
    /* n:"BrtEndPCDCalcItems", */
    T: -1
  },
  /*::[*/
  245: {
    /* n:"BrtBeginPCDCalcItem", */
    T: 1
  },
  /*::[*/
  246: {
    /* n:"BrtEndPCDCalcItem", */
    T: -1
  },
  /*::[*/
  247: {
    /* n:"BrtBeginPRule", */
    T: 1
  },
  /*::[*/
  248: {
    /* n:"BrtEndPRule", */
    T: -1
  },
  /*::[*/
  249: {
    /* n:"BrtBeginPRFilters", */
    T: 1
  },
  /*::[*/
  250: {
    /* n:"BrtEndPRFilters", */
    T: -1
  },
  /*::[*/
  251: {
    /* n:"BrtBeginPRFilter", */
    T: 1
  },
  /*::[*/
  252: {
    /* n:"BrtEndPRFilter", */
    T: -1
  },
  /*::[*/
  253: {
    /* n:"BrtBeginPNames", */
    T: 1
  },
  /*::[*/
  254: {
    /* n:"BrtEndPNames", */
    T: -1
  },
  /*::[*/
  255: {
    /* n:"BrtBeginPName", */
    T: 1
  },
  /*::[*/
  256: {
    /* n:"BrtEndPName", */
    T: -1
  },
  /*::[*/
  257: {
    /* n:"BrtBeginPNPairs", */
    T: 1
  },
  /*::[*/
  258: {
    /* n:"BrtEndPNPairs", */
    T: -1
  },
  /*::[*/
  259: {
    /* n:"BrtBeginPNPair", */
    T: 1
  },
  /*::[*/
  260: {
    /* n:"BrtEndPNPair", */
    T: -1
  },
  /*::[*/
  261: {
    /* n:"BrtBeginECWebProps", */
    T: 1
  },
  /*::[*/
  262: {
    /* n:"BrtEndECWebProps", */
    T: -1
  },
  /*::[*/
  263: {
    /* n:"BrtBeginEcWpTables", */
    T: 1
  },
  /*::[*/
  264: {
    /* n:"BrtEndECWPTables", */
    T: -1
  },
  /*::[*/
  265: {
    /* n:"BrtBeginECParams", */
    T: 1
  },
  /*::[*/
  266: {
    /* n:"BrtEndECParams", */
    T: -1
  },
  /*::[*/
  267: {
    /* n:"BrtBeginECParam", */
    T: 1
  },
  /*::[*/
  268: {
    /* n:"BrtEndECParam", */
    T: -1
  },
  /*::[*/
  269: {
    /* n:"BrtBeginPCDKPIs", */
    T: 1
  },
  /*::[*/
  270: {
    /* n:"BrtEndPCDKPIs", */
    T: -1
  },
  /*::[*/
  271: {
    /* n:"BrtBeginPCDKPI", */
    T: 1
  },
  /*::[*/
  272: {
    /* n:"BrtEndPCDKPI", */
    T: -1
  },
  /*::[*/
  273: {
    /* n:"BrtBeginDims", */
    T: 1
  },
  /*::[*/
  274: {
    /* n:"BrtEndDims", */
    T: -1
  },
  /*::[*/
  275: {
    /* n:"BrtBeginDim", */
    T: 1
  },
  /*::[*/
  276: {
    /* n:"BrtEndDim", */
    T: -1
  },
  /*::[*/
  277: {
    /* n:"BrtIndexPartEnd" */
  },
  /*::[*/
  278: {
    /* n:"BrtBeginStyleSheet", */
    T: 1
  },
  /*::[*/
  279: {
    /* n:"BrtEndStyleSheet", */
    T: -1
  },
  /*::[*/
  280: {
    /* n:"BrtBeginSXView", */
    T: 1
  },
  /*::[*/
  281: {
    /* n:"BrtEndSXVI", */
    T: -1
  },
  /*::[*/
  282: {
    /* n:"BrtBeginSXVI", */
    T: 1
  },
  /*::[*/
  283: {
    /* n:"BrtBeginSXVIs", */
    T: 1
  },
  /*::[*/
  284: {
    /* n:"BrtEndSXVIs", */
    T: -1
  },
  /*::[*/
  285: {
    /* n:"BrtBeginSXVD", */
    T: 1
  },
  /*::[*/
  286: {
    /* n:"BrtEndSXVD", */
    T: -1
  },
  /*::[*/
  287: {
    /* n:"BrtBeginSXVDs", */
    T: 1
  },
  /*::[*/
  288: {
    /* n:"BrtEndSXVDs", */
    T: -1
  },
  /*::[*/
  289: {
    /* n:"BrtBeginSXPI", */
    T: 1
  },
  /*::[*/
  290: {
    /* n:"BrtEndSXPI", */
    T: -1
  },
  /*::[*/
  291: {
    /* n:"BrtBeginSXPIs", */
    T: 1
  },
  /*::[*/
  292: {
    /* n:"BrtEndSXPIs", */
    T: -1
  },
  /*::[*/
  293: {
    /* n:"BrtBeginSXDI", */
    T: 1
  },
  /*::[*/
  294: {
    /* n:"BrtEndSXDI", */
    T: -1
  },
  /*::[*/
  295: {
    /* n:"BrtBeginSXDIs", */
    T: 1
  },
  /*::[*/
  296: {
    /* n:"BrtEndSXDIs", */
    T: -1
  },
  /*::[*/
  297: {
    /* n:"BrtBeginSXLI", */
    T: 1
  },
  /*::[*/
  298: {
    /* n:"BrtEndSXLI", */
    T: -1
  },
  /*::[*/
  299: {
    /* n:"BrtBeginSXLIRws", */
    T: 1
  },
  /*::[*/
  300: {
    /* n:"BrtEndSXLIRws", */
    T: -1
  },
  /*::[*/
  301: {
    /* n:"BrtBeginSXLICols", */
    T: 1
  },
  /*::[*/
  302: {
    /* n:"BrtEndSXLICols", */
    T: -1
  },
  /*::[*/
  303: {
    /* n:"BrtBeginSXFormat", */
    T: 1
  },
  /*::[*/
  304: {
    /* n:"BrtEndSXFormat", */
    T: -1
  },
  /*::[*/
  305: {
    /* n:"BrtBeginSXFormats", */
    T: 1
  },
  /*::[*/
  306: {
    /* n:"BrtEndSxFormats", */
    T: -1
  },
  /*::[*/
  307: {
    /* n:"BrtBeginSxSelect", */
    T: 1
  },
  /*::[*/
  308: {
    /* n:"BrtEndSxSelect", */
    T: -1
  },
  /*::[*/
  309: {
    /* n:"BrtBeginISXVDRws", */
    T: 1
  },
  /*::[*/
  310: {
    /* n:"BrtEndISXVDRws", */
    T: -1
  },
  /*::[*/
  311: {
    /* n:"BrtBeginISXVDCols", */
    T: 1
  },
  /*::[*/
  312: {
    /* n:"BrtEndISXVDCols", */
    T: -1
  },
  /*::[*/
  313: {
    /* n:"BrtEndSXLocation", */
    T: -1
  },
  /*::[*/
  314: {
    /* n:"BrtBeginSXLocation", */
    T: 1
  },
  /*::[*/
  315: {
    /* n:"BrtEndSXView", */
    T: -1
  },
  /*::[*/
  316: {
    /* n:"BrtBeginSXTHs", */
    T: 1
  },
  /*::[*/
  317: {
    /* n:"BrtEndSXTHs", */
    T: -1
  },
  /*::[*/
  318: {
    /* n:"BrtBeginSXTH", */
    T: 1
  },
  /*::[*/
  319: {
    /* n:"BrtEndSXTH", */
    T: -1
  },
  /*::[*/
  320: {
    /* n:"BrtBeginISXTHRws", */
    T: 1
  },
  /*::[*/
  321: {
    /* n:"BrtEndISXTHRws", */
    T: -1
  },
  /*::[*/
  322: {
    /* n:"BrtBeginISXTHCols", */
    T: 1
  },
  /*::[*/
  323: {
    /* n:"BrtEndISXTHCols", */
    T: -1
  },
  /*::[*/
  324: {
    /* n:"BrtBeginSXTDMPS", */
    T: 1
  },
  /*::[*/
  325: {
    /* n:"BrtEndSXTDMPs", */
    T: -1
  },
  /*::[*/
  326: {
    /* n:"BrtBeginSXTDMP", */
    T: 1
  },
  /*::[*/
  327: {
    /* n:"BrtEndSXTDMP", */
    T: -1
  },
  /*::[*/
  328: {
    /* n:"BrtBeginSXTHItems", */
    T: 1
  },
  /*::[*/
  329: {
    /* n:"BrtEndSXTHItems", */
    T: -1
  },
  /*::[*/
  330: {
    /* n:"BrtBeginSXTHItem", */
    T: 1
  },
  /*::[*/
  331: {
    /* n:"BrtEndSXTHItem", */
    T: -1
  },
  /*::[*/
  332: {
    /* n:"BrtBeginMetadata", */
    T: 1
  },
  /*::[*/
  333: {
    /* n:"BrtEndMetadata", */
    T: -1
  },
  /*::[*/
  334: {
    /* n:"BrtBeginEsmdtinfo", */
    T: 1
  },
  /*::[*/
  335: {
    /* n:"BrtMdtinfo", */
    f: Cc
  },
  /*::[*/
  336: {
    /* n:"BrtEndEsmdtinfo", */
    T: -1
  },
  /*::[*/
  337: {
    /* n:"BrtBeginEsmdb", */
    f: Ic,
    T: 1
  },
  /*::[*/
  338: {
    /* n:"BrtEndEsmdb", */
    T: -1
  },
  /*::[*/
  339: {
    /* n:"BrtBeginEsfmd", */
    T: 1
  },
  /*::[*/
  340: {
    /* n:"BrtEndEsfmd", */
    T: -1
  },
  /*::[*/
  341: {
    /* n:"BrtBeginSingleCells", */
    T: 1
  },
  /*::[*/
  342: {
    /* n:"BrtEndSingleCells", */
    T: -1
  },
  /*::[*/
  343: {
    /* n:"BrtBeginList", */
    T: 1
  },
  /*::[*/
  344: {
    /* n:"BrtEndList", */
    T: -1
  },
  /*::[*/
  345: {
    /* n:"BrtBeginListCols", */
    T: 1
  },
  /*::[*/
  346: {
    /* n:"BrtEndListCols", */
    T: -1
  },
  /*::[*/
  347: {
    /* n:"BrtBeginListCol", */
    T: 1
  },
  /*::[*/
  348: {
    /* n:"BrtEndListCol", */
    T: -1
  },
  /*::[*/
  349: {
    /* n:"BrtBeginListXmlCPr", */
    T: 1
  },
  /*::[*/
  350: {
    /* n:"BrtEndListXmlCPr", */
    T: -1
  },
  /*::[*/
  351: {
    /* n:"BrtListCCFmla" */
  },
  /*::[*/
  352: {
    /* n:"BrtListTrFmla" */
  },
  /*::[*/
  353: {
    /* n:"BrtBeginExternals", */
    T: 1
  },
  /*::[*/
  354: {
    /* n:"BrtEndExternals", */
    T: -1
  },
  /*::[*/
  355: {
    /* n:"BrtSupBookSrc", */
    f: Xn
  },
  /*::[*/
  357: {
    /* n:"BrtSupSelf" */
  },
  /*::[*/
  358: {
    /* n:"BrtSupSame" */
  },
  /*::[*/
  359: {
    /* n:"BrtSupTabs" */
  },
  /*::[*/
  360: {
    /* n:"BrtBeginSupBook", */
    T: 1
  },
  /*::[*/
  361: {
    /* n:"BrtPlaceholderName" */
  },
  /*::[*/
  362: {
    /* n:"BrtExternSheet", */
    f: Po
  },
  /*::[*/
  363: {
    /* n:"BrtExternTableStart" */
  },
  /*::[*/
  364: {
    /* n:"BrtExternTableEnd" */
  },
  /*::[*/
  366: {
    /* n:"BrtExternRowHdr" */
  },
  /*::[*/
  367: {
    /* n:"BrtExternCellBlank" */
  },
  /*::[*/
  368: {
    /* n:"BrtExternCellReal" */
  },
  /*::[*/
  369: {
    /* n:"BrtExternCellBool" */
  },
  /*::[*/
  370: {
    /* n:"BrtExternCellError" */
  },
  /*::[*/
  371: {
    /* n:"BrtExternCellString" */
  },
  /*::[*/
  372: {
    /* n:"BrtBeginEsmdx", */
    T: 1
  },
  /*::[*/
  373: {
    /* n:"BrtEndEsmdx", */
    T: -1
  },
  /*::[*/
  374: {
    /* n:"BrtBeginMdxSet", */
    T: 1
  },
  /*::[*/
  375: {
    /* n:"BrtEndMdxSet", */
    T: -1
  },
  /*::[*/
  376: {
    /* n:"BrtBeginMdxMbrProp", */
    T: 1
  },
  /*::[*/
  377: {
    /* n:"BrtEndMdxMbrProp", */
    T: -1
  },
  /*::[*/
  378: {
    /* n:"BrtBeginMdxKPI", */
    T: 1
  },
  /*::[*/
  379: {
    /* n:"BrtEndMdxKPI", */
    T: -1
  },
  /*::[*/
  380: {
    /* n:"BrtBeginEsstr", */
    T: 1
  },
  /*::[*/
  381: {
    /* n:"BrtEndEsstr", */
    T: -1
  },
  /*::[*/
  382: {
    /* n:"BrtBeginPRFItem", */
    T: 1
  },
  /*::[*/
  383: {
    /* n:"BrtEndPRFItem", */
    T: -1
  },
  /*::[*/
  384: {
    /* n:"BrtBeginPivotCacheIDs", */
    T: 1
  },
  /*::[*/
  385: {
    /* n:"BrtEndPivotCacheIDs", */
    T: -1
  },
  /*::[*/
  386: {
    /* n:"BrtBeginPivotCacheID", */
    T: 1
  },
  /*::[*/
  387: {
    /* n:"BrtEndPivotCacheID", */
    T: -1
  },
  /*::[*/
  388: {
    /* n:"BrtBeginISXVIs", */
    T: 1
  },
  /*::[*/
  389: {
    /* n:"BrtEndISXVIs", */
    T: -1
  },
  /*::[*/
  390: {
    /* n:"BrtBeginColInfos", */
    T: 1
  },
  /*::[*/
  391: {
    /* n:"BrtEndColInfos", */
    T: -1
  },
  /*::[*/
  392: {
    /* n:"BrtBeginRwBrk", */
    T: 1
  },
  /*::[*/
  393: {
    /* n:"BrtEndRwBrk", */
    T: -1
  },
  /*::[*/
  394: {
    /* n:"BrtBeginColBrk", */
    T: 1
  },
  /*::[*/
  395: {
    /* n:"BrtEndColBrk", */
    T: -1
  },
  /*::[*/
  396: {
    /* n:"BrtBrk" */
  },
  /*::[*/
  397: {
    /* n:"BrtUserBookView" */
  },
  /*::[*/
  398: {
    /* n:"BrtInfo" */
  },
  /*::[*/
  399: {
    /* n:"BrtCUsr" */
  },
  /*::[*/
  400: {
    /* n:"BrtUsr" */
  },
  /*::[*/
  401: {
    /* n:"BrtBeginUsers", */
    T: 1
  },
  /*::[*/
  403: {
    /* n:"BrtEOF" */
  },
  /*::[*/
  404: {
    /* n:"BrtUCR" */
  },
  /*::[*/
  405: {
    /* n:"BrtRRInsDel" */
  },
  /*::[*/
  406: {
    /* n:"BrtRREndInsDel" */
  },
  /*::[*/
  407: {
    /* n:"BrtRRMove" */
  },
  /*::[*/
  408: {
    /* n:"BrtRREndMove" */
  },
  /*::[*/
  409: {
    /* n:"BrtRRChgCell" */
  },
  /*::[*/
  410: {
    /* n:"BrtRREndChgCell" */
  },
  /*::[*/
  411: {
    /* n:"BrtRRHeader" */
  },
  /*::[*/
  412: {
    /* n:"BrtRRUserView" */
  },
  /*::[*/
  413: {
    /* n:"BrtRRRenSheet" */
  },
  /*::[*/
  414: {
    /* n:"BrtRRInsertSh" */
  },
  /*::[*/
  415: {
    /* n:"BrtRRDefName" */
  },
  /*::[*/
  416: {
    /* n:"BrtRRNote" */
  },
  /*::[*/
  417: {
    /* n:"BrtRRConflict" */
  },
  /*::[*/
  418: {
    /* n:"BrtRRTQSIF" */
  },
  /*::[*/
  419: {
    /* n:"BrtRRFormat" */
  },
  /*::[*/
  420: {
    /* n:"BrtRREndFormat" */
  },
  /*::[*/
  421: {
    /* n:"BrtRRAutoFmt" */
  },
  /*::[*/
  422: {
    /* n:"BrtBeginUserShViews", */
    T: 1
  },
  /*::[*/
  423: {
    /* n:"BrtBeginUserShView", */
    T: 1
  },
  /*::[*/
  424: {
    /* n:"BrtEndUserShView", */
    T: -1
  },
  /*::[*/
  425: {
    /* n:"BrtEndUserShViews", */
    T: -1
  },
  /*::[*/
  426: {
    /* n:"BrtArrFmla", */
    f: w1
  },
  /*::[*/
  427: {
    /* n:"BrtShrFmla", */
    f: S1
  },
  /*::[*/
  428: {
    /* n:"BrtTable" */
  },
  /*::[*/
  429: {
    /* n:"BrtBeginExtConnections", */
    T: 1
  },
  /*::[*/
  430: {
    /* n:"BrtEndExtConnections", */
    T: -1
  },
  /*::[*/
  431: {
    /* n:"BrtBeginPCDCalcMems", */
    T: 1
  },
  /*::[*/
  432: {
    /* n:"BrtEndPCDCalcMems", */
    T: -1
  },
  /*::[*/
  433: {
    /* n:"BrtBeginPCDCalcMem", */
    T: 1
  },
  /*::[*/
  434: {
    /* n:"BrtEndPCDCalcMem", */
    T: -1
  },
  /*::[*/
  435: {
    /* n:"BrtBeginPCDHGLevels", */
    T: 1
  },
  /*::[*/
  436: {
    /* n:"BrtEndPCDHGLevels", */
    T: -1
  },
  /*::[*/
  437: {
    /* n:"BrtBeginPCDHGLevel", */
    T: 1
  },
  /*::[*/
  438: {
    /* n:"BrtEndPCDHGLevel", */
    T: -1
  },
  /*::[*/
  439: {
    /* n:"BrtBeginPCDHGLGroups", */
    T: 1
  },
  /*::[*/
  440: {
    /* n:"BrtEndPCDHGLGroups", */
    T: -1
  },
  /*::[*/
  441: {
    /* n:"BrtBeginPCDHGLGroup", */
    T: 1
  },
  /*::[*/
  442: {
    /* n:"BrtEndPCDHGLGroup", */
    T: -1
  },
  /*::[*/
  443: {
    /* n:"BrtBeginPCDHGLGMembers", */
    T: 1
  },
  /*::[*/
  444: {
    /* n:"BrtEndPCDHGLGMembers", */
    T: -1
  },
  /*::[*/
  445: {
    /* n:"BrtBeginPCDHGLGMember", */
    T: 1
  },
  /*::[*/
  446: {
    /* n:"BrtEndPCDHGLGMember", */
    T: -1
  },
  /*::[*/
  447: {
    /* n:"BrtBeginQSI", */
    T: 1
  },
  /*::[*/
  448: {
    /* n:"BrtEndQSI", */
    T: -1
  },
  /*::[*/
  449: {
    /* n:"BrtBeginQSIR", */
    T: 1
  },
  /*::[*/
  450: {
    /* n:"BrtEndQSIR", */
    T: -1
  },
  /*::[*/
  451: {
    /* n:"BrtBeginDeletedNames", */
    T: 1
  },
  /*::[*/
  452: {
    /* n:"BrtEndDeletedNames", */
    T: -1
  },
  /*::[*/
  453: {
    /* n:"BrtBeginDeletedName", */
    T: 1
  },
  /*::[*/
  454: {
    /* n:"BrtEndDeletedName", */
    T: -1
  },
  /*::[*/
  455: {
    /* n:"BrtBeginQSIFs", */
    T: 1
  },
  /*::[*/
  456: {
    /* n:"BrtEndQSIFs", */
    T: -1
  },
  /*::[*/
  457: {
    /* n:"BrtBeginQSIF", */
    T: 1
  },
  /*::[*/
  458: {
    /* n:"BrtEndQSIF", */
    T: -1
  },
  /*::[*/
  459: {
    /* n:"BrtBeginAutoSortScope", */
    T: 1
  },
  /*::[*/
  460: {
    /* n:"BrtEndAutoSortScope", */
    T: -1
  },
  /*::[*/
  461: {
    /* n:"BrtBeginConditionalFormatting", */
    T: 1
  },
  /*::[*/
  462: {
    /* n:"BrtEndConditionalFormatting", */
    T: -1
  },
  /*::[*/
  463: {
    /* n:"BrtBeginCFRule", */
    T: 1
  },
  /*::[*/
  464: {
    /* n:"BrtEndCFRule", */
    T: -1
  },
  /*::[*/
  465: {
    /* n:"BrtBeginIconSet", */
    T: 1
  },
  /*::[*/
  466: {
    /* n:"BrtEndIconSet", */
    T: -1
  },
  /*::[*/
  467: {
    /* n:"BrtBeginDatabar", */
    T: 1
  },
  /*::[*/
  468: {
    /* n:"BrtEndDatabar", */
    T: -1
  },
  /*::[*/
  469: {
    /* n:"BrtBeginColorScale", */
    T: 1
  },
  /*::[*/
  470: {
    /* n:"BrtEndColorScale", */
    T: -1
  },
  /*::[*/
  471: {
    /* n:"BrtCFVO" */
  },
  /*::[*/
  472: {
    /* n:"BrtExternValueMeta" */
  },
  /*::[*/
  473: {
    /* n:"BrtBeginColorPalette", */
    T: 1
  },
  /*::[*/
  474: {
    /* n:"BrtEndColorPalette", */
    T: -1
  },
  /*::[*/
  475: {
    /* n:"BrtIndexedColor" */
  },
  /*::[*/
  476: {
    /* n:"BrtMargins", */
    f: F1
  },
  /*::[*/
  477: {
    /* n:"BrtPrintOptions" */
  },
  /*::[*/
  478: {
    /* n:"BrtPageSetup" */
  },
  /*::[*/
  479: {
    /* n:"BrtBeginHeaderFooter", */
    T: 1
  },
  /*::[*/
  480: {
    /* n:"BrtEndHeaderFooter", */
    T: -1
  },
  /*::[*/
  481: {
    /* n:"BrtBeginSXCrtFormat", */
    T: 1
  },
  /*::[*/
  482: {
    /* n:"BrtEndSXCrtFormat", */
    T: -1
  },
  /*::[*/
  483: {
    /* n:"BrtBeginSXCrtFormats", */
    T: 1
  },
  /*::[*/
  484: {
    /* n:"BrtEndSXCrtFormats", */
    T: -1
  },
  /*::[*/
  485: {
    /* n:"BrtWsFmtInfo", */
    f: Pu
  },
  /*::[*/
  486: {
    /* n:"BrtBeginMgs", */
    T: 1
  },
  /*::[*/
  487: {
    /* n:"BrtEndMGs", */
    T: -1
  },
  /*::[*/
  488: {
    /* n:"BrtBeginMGMaps", */
    T: 1
  },
  /*::[*/
  489: {
    /* n:"BrtEndMGMaps", */
    T: -1
  },
  /*::[*/
  490: {
    /* n:"BrtBeginMG", */
    T: 1
  },
  /*::[*/
  491: {
    /* n:"BrtEndMG", */
    T: -1
  },
  /*::[*/
  492: {
    /* n:"BrtBeginMap", */
    T: 1
  },
  /*::[*/
  493: {
    /* n:"BrtEndMap", */
    T: -1
  },
  /*::[*/
  494: {
    /* n:"BrtHLink", */
    f: _1
  },
  /*::[*/
  495: {
    /* n:"BrtBeginDCon", */
    T: 1
  },
  /*::[*/
  496: {
    /* n:"BrtEndDCon", */
    T: -1
  },
  /*::[*/
  497: {
    /* n:"BrtBeginDRefs", */
    T: 1
  },
  /*::[*/
  498: {
    /* n:"BrtEndDRefs", */
    T: -1
  },
  /*::[*/
  499: {
    /* n:"BrtDRef" */
  },
  /*::[*/
  500: {
    /* n:"BrtBeginScenMan", */
    T: 1
  },
  /*::[*/
  501: {
    /* n:"BrtEndScenMan", */
    T: -1
  },
  /*::[*/
  502: {
    /* n:"BrtBeginSct", */
    T: 1
  },
  /*::[*/
  503: {
    /* n:"BrtEndSct", */
    T: -1
  },
  /*::[*/
  504: {
    /* n:"BrtSlc" */
  },
  /*::[*/
  505: {
    /* n:"BrtBeginDXFs", */
    T: 1
  },
  /*::[*/
  506: {
    /* n:"BrtEndDXFs", */
    T: -1
  },
  /*::[*/
  507: {
    /* n:"BrtDXF" */
  },
  /*::[*/
  508: {
    /* n:"BrtBeginTableStyles", */
    T: 1
  },
  /*::[*/
  509: {
    /* n:"BrtEndTableStyles", */
    T: -1
  },
  /*::[*/
  510: {
    /* n:"BrtBeginTableStyle", */
    T: 1
  },
  /*::[*/
  511: {
    /* n:"BrtEndTableStyle", */
    T: -1
  },
  /*::[*/
  512: {
    /* n:"BrtTableStyleElement" */
  },
  /*::[*/
  513: {
    /* n:"BrtTableStyleClient" */
  },
  /*::[*/
  514: {
    /* n:"BrtBeginVolDeps", */
    T: 1
  },
  /*::[*/
  515: {
    /* n:"BrtEndVolDeps", */
    T: -1
  },
  /*::[*/
  516: {
    /* n:"BrtBeginVolType", */
    T: 1
  },
  /*::[*/
  517: {
    /* n:"BrtEndVolType", */
    T: -1
  },
  /*::[*/
  518: {
    /* n:"BrtBeginVolMain", */
    T: 1
  },
  /*::[*/
  519: {
    /* n:"BrtEndVolMain", */
    T: -1
  },
  /*::[*/
  520: {
    /* n:"BrtBeginVolTopic", */
    T: 1
  },
  /*::[*/
  521: {
    /* n:"BrtEndVolTopic", */
    T: -1
  },
  /*::[*/
  522: {
    /* n:"BrtVolSubtopic" */
  },
  /*::[*/
  523: {
    /* n:"BrtVolRef" */
  },
  /*::[*/
  524: {
    /* n:"BrtVolNum" */
  },
  /*::[*/
  525: {
    /* n:"BrtVolErr" */
  },
  /*::[*/
  526: {
    /* n:"BrtVolStr" */
  },
  /*::[*/
  527: {
    /* n:"BrtVolBool" */
  },
  /*::[*/
  528: {
    /* n:"BrtBeginCalcChain$", */
    T: 1
  },
  /*::[*/
  529: {
    /* n:"BrtEndCalcChain$", */
    T: -1
  },
  /*::[*/
  530: {
    /* n:"BrtBeginSortState", */
    T: 1
  },
  /*::[*/
  531: {
    /* n:"BrtEndSortState", */
    T: -1
  },
  /*::[*/
  532: {
    /* n:"BrtBeginSortCond", */
    T: 1
  },
  /*::[*/
  533: {
    /* n:"BrtEndSortCond", */
    T: -1
  },
  /*::[*/
  534: {
    /* n:"BrtBookProtection" */
  },
  /*::[*/
  535: {
    /* n:"BrtSheetProtection" */
  },
  /*::[*/
  536: {
    /* n:"BrtRangeProtection" */
  },
  /*::[*/
  537: {
    /* n:"BrtPhoneticInfo" */
  },
  /*::[*/
  538: {
    /* n:"BrtBeginECTxtWiz", */
    T: 1
  },
  /*::[*/
  539: {
    /* n:"BrtEndECTxtWiz", */
    T: -1
  },
  /*::[*/
  540: {
    /* n:"BrtBeginECTWFldInfoLst", */
    T: 1
  },
  /*::[*/
  541: {
    /* n:"BrtEndECTWFldInfoLst", */
    T: -1
  },
  /*::[*/
  542: {
    /* n:"BrtBeginECTwFldInfo", */
    T: 1
  },
  /*::[*/
  548: {
    /* n:"BrtFileSharing" */
  },
  /*::[*/
  549: {
    /* n:"BrtOleSize" */
  },
  /*::[*/
  550: {
    /* n:"BrtDrawing", */
    f: Xn
  },
  /*::[*/
  551: {
    /* n:"BrtLegacyDrawing" */
  },
  /*::[*/
  552: {
    /* n:"BrtLegacyDrawingHF" */
  },
  /*::[*/
  553: {
    /* n:"BrtWebOpt" */
  },
  /*::[*/
  554: {
    /* n:"BrtBeginWebPubItems", */
    T: 1
  },
  /*::[*/
  555: {
    /* n:"BrtEndWebPubItems", */
    T: -1
  },
  /*::[*/
  556: {
    /* n:"BrtBeginWebPubItem", */
    T: 1
  },
  /*::[*/
  557: {
    /* n:"BrtEndWebPubItem", */
    T: -1
  },
  /*::[*/
  558: {
    /* n:"BrtBeginSXCondFmt", */
    T: 1
  },
  /*::[*/
  559: {
    /* n:"BrtEndSXCondFmt", */
    T: -1
  },
  /*::[*/
  560: {
    /* n:"BrtBeginSXCondFmts", */
    T: 1
  },
  /*::[*/
  561: {
    /* n:"BrtEndSXCondFmts", */
    T: -1
  },
  /*::[*/
  562: {
    /* n:"BrtBkHim" */
  },
  /*::[*/
  564: {
    /* n:"BrtColor" */
  },
  /*::[*/
  565: {
    /* n:"BrtBeginIndexedColors", */
    T: 1
  },
  /*::[*/
  566: {
    /* n:"BrtEndIndexedColors", */
    T: -1
  },
  /*::[*/
  569: {
    /* n:"BrtBeginMRUColors", */
    T: 1
  },
  /*::[*/
  570: {
    /* n:"BrtEndMRUColors", */
    T: -1
  },
  /*::[*/
  572: {
    /* n:"BrtMRUColor" */
  },
  /*::[*/
  573: {
    /* n:"BrtBeginDVals", */
    T: 1
  },
  /*::[*/
  574: {
    /* n:"BrtEndDVals", */
    T: -1
  },
  /*::[*/
  577: {
    /* n:"BrtSupNameStart" */
  },
  /*::[*/
  578: {
    /* n:"BrtSupNameValueStart" */
  },
  /*::[*/
  579: {
    /* n:"BrtSupNameValueEnd" */
  },
  /*::[*/
  580: {
    /* n:"BrtSupNameNum" */
  },
  /*::[*/
  581: {
    /* n:"BrtSupNameErr" */
  },
  /*::[*/
  582: {
    /* n:"BrtSupNameSt" */
  },
  /*::[*/
  583: {
    /* n:"BrtSupNameNil" */
  },
  /*::[*/
  584: {
    /* n:"BrtSupNameBool" */
  },
  /*::[*/
  585: {
    /* n:"BrtSupNameFmla" */
  },
  /*::[*/
  586: {
    /* n:"BrtSupNameBits" */
  },
  /*::[*/
  587: {
    /* n:"BrtSupNameEnd" */
  },
  /*::[*/
  588: {
    /* n:"BrtEndSupBook", */
    T: -1
  },
  /*::[*/
  589: {
    /* n:"BrtCellSmartTagProperty" */
  },
  /*::[*/
  590: {
    /* n:"BrtBeginCellSmartTag", */
    T: 1
  },
  /*::[*/
  591: {
    /* n:"BrtEndCellSmartTag", */
    T: -1
  },
  /*::[*/
  592: {
    /* n:"BrtBeginCellSmartTags", */
    T: 1
  },
  /*::[*/
  593: {
    /* n:"BrtEndCellSmartTags", */
    T: -1
  },
  /*::[*/
  594: {
    /* n:"BrtBeginSmartTags", */
    T: 1
  },
  /*::[*/
  595: {
    /* n:"BrtEndSmartTags", */
    T: -1
  },
  /*::[*/
  596: {
    /* n:"BrtSmartTagType" */
  },
  /*::[*/
  597: {
    /* n:"BrtBeginSmartTagTypes", */
    T: 1
  },
  /*::[*/
  598: {
    /* n:"BrtEndSmartTagTypes", */
    T: -1
  },
  /*::[*/
  599: {
    /* n:"BrtBeginSXFilters", */
    T: 1
  },
  /*::[*/
  600: {
    /* n:"BrtEndSXFilters", */
    T: -1
  },
  /*::[*/
  601: {
    /* n:"BrtBeginSXFILTER", */
    T: 1
  },
  /*::[*/
  602: {
    /* n:"BrtEndSXFilter", */
    T: -1
  },
  /*::[*/
  603: {
    /* n:"BrtBeginFills", */
    T: 1
  },
  /*::[*/
  604: {
    /* n:"BrtEndFills", */
    T: -1
  },
  /*::[*/
  605: {
    /* n:"BrtBeginCellWatches", */
    T: 1
  },
  /*::[*/
  606: {
    /* n:"BrtEndCellWatches", */
    T: -1
  },
  /*::[*/
  607: {
    /* n:"BrtCellWatch" */
  },
  /*::[*/
  608: {
    /* n:"BrtBeginCRErrs", */
    T: 1
  },
  /*::[*/
  609: {
    /* n:"BrtEndCRErrs", */
    T: -1
  },
  /*::[*/
  610: {
    /* n:"BrtCrashRecErr" */
  },
  /*::[*/
  611: {
    /* n:"BrtBeginFonts", */
    T: 1
  },
  /*::[*/
  612: {
    /* n:"BrtEndFonts", */
    T: -1
  },
  /*::[*/
  613: {
    /* n:"BrtBeginBorders", */
    T: 1
  },
  /*::[*/
  614: {
    /* n:"BrtEndBorders", */
    T: -1
  },
  /*::[*/
  615: {
    /* n:"BrtBeginFmts", */
    T: 1
  },
  /*::[*/
  616: {
    /* n:"BrtEndFmts", */
    T: -1
  },
  /*::[*/
  617: {
    /* n:"BrtBeginCellXFs", */
    T: 1
  },
  /*::[*/
  618: {
    /* n:"BrtEndCellXFs", */
    T: -1
  },
  /*::[*/
  619: {
    /* n:"BrtBeginStyles", */
    T: 1
  },
  /*::[*/
  620: {
    /* n:"BrtEndStyles", */
    T: -1
  },
  /*::[*/
  625: {
    /* n:"BrtBigName" */
  },
  /*::[*/
  626: {
    /* n:"BrtBeginCellStyleXFs", */
    T: 1
  },
  /*::[*/
  627: {
    /* n:"BrtEndCellStyleXFs", */
    T: -1
  },
  /*::[*/
  628: {
    /* n:"BrtBeginComments", */
    T: 1
  },
  /*::[*/
  629: {
    /* n:"BrtEndComments", */
    T: -1
  },
  /*::[*/
  630: {
    /* n:"BrtBeginCommentAuthors", */
    T: 1
  },
  /*::[*/
  631: {
    /* n:"BrtEndCommentAuthors", */
    T: -1
  },
  /*::[*/
  632: {
    /* n:"BrtCommentAuthor", */
    f: Wc
  },
  /*::[*/
  633: {
    /* n:"BrtBeginCommentList", */
    T: 1
  },
  /*::[*/
  634: {
    /* n:"BrtEndCommentList", */
    T: -1
  },
  /*::[*/
  635: {
    /* n:"BrtBeginComment", */
    T: 1,
    f: bc
  },
  /*::[*/
  636: {
    /* n:"BrtEndComment", */
    T: -1
  },
  /*::[*/
  637: {
    /* n:"BrtCommentText", */
    f: Vl
  },
  /*::[*/
  638: {
    /* n:"BrtBeginOleObjects", */
    T: 1
  },
  /*::[*/
  639: {
    /* n:"BrtOleObject" */
  },
  /*::[*/
  640: {
    /* n:"BrtEndOleObjects", */
    T: -1
  },
  /*::[*/
  641: {
    /* n:"BrtBeginSxrules", */
    T: 1
  },
  /*::[*/
  642: {
    /* n:"BrtEndSxRules", */
    T: -1
  },
  /*::[*/
  643: {
    /* n:"BrtBeginActiveXControls", */
    T: 1
  },
  /*::[*/
  644: {
    /* n:"BrtActiveX" */
  },
  /*::[*/
  645: {
    /* n:"BrtEndActiveXControls", */
    T: -1
  },
  /*::[*/
  646: {
    /* n:"BrtBeginPCDSDTCEMembersSortBy", */
    T: 1
  },
  /*::[*/
  648: {
    /* n:"BrtBeginCellIgnoreECs", */
    T: 1
  },
  /*::[*/
  649: {
    /* n:"BrtCellIgnoreEC" */
  },
  /*::[*/
  650: {
    /* n:"BrtEndCellIgnoreECs", */
    T: -1
  },
  /*::[*/
  651: {
    /* n:"BrtCsProp", */
    f: X1
  },
  /*::[*/
  652: {
    /* n:"BrtCsPageSetup" */
  },
  /*::[*/
  653: {
    /* n:"BrtBeginUserCsViews", */
    T: 1
  },
  /*::[*/
  654: {
    /* n:"BrtEndUserCsViews", */
    T: -1
  },
  /*::[*/
  655: {
    /* n:"BrtBeginUserCsView", */
    T: 1
  },
  /*::[*/
  656: {
    /* n:"BrtEndUserCsView", */
    T: -1
  },
  /*::[*/
  657: {
    /* n:"BrtBeginPcdSFCIEntries", */
    T: 1
  },
  /*::[*/
  658: {
    /* n:"BrtEndPCDSFCIEntries", */
    T: -1
  },
  /*::[*/
  659: {
    /* n:"BrtPCDSFCIEntry" */
  },
  /*::[*/
  660: {
    /* n:"BrtBeginListParts", */
    T: 1
  },
  /*::[*/
  661: {
    /* n:"BrtListPart" */
  },
  /*::[*/
  662: {
    /* n:"BrtEndListParts", */
    T: -1
  },
  /*::[*/
  663: {
    /* n:"BrtSheetCalcProp" */
  },
  /*::[*/
  664: {
    /* n:"BrtBeginFnGroup", */
    T: 1
  },
  /*::[*/
  665: {
    /* n:"BrtFnGroup" */
  },
  /*::[*/
  666: {
    /* n:"BrtEndFnGroup", */
    T: -1
  },
  /*::[*/
  667: {
    /* n:"BrtSupAddin" */
  },
  /*::[*/
  668: {
    /* n:"BrtSXTDMPOrder" */
  },
  /*::[*/
  669: {
    /* n:"BrtCsProtection" */
  },
  /*::[*/
  671: {
    /* n:"BrtBeginWsSortMap", */
    T: 1
  },
  /*::[*/
  672: {
    /* n:"BrtEndWsSortMap", */
    T: -1
  },
  /*::[*/
  673: {
    /* n:"BrtBeginRRSort", */
    T: 1
  },
  /*::[*/
  674: {
    /* n:"BrtEndRRSort", */
    T: -1
  },
  /*::[*/
  675: {
    /* n:"BrtRRSortItem" */
  },
  /*::[*/
  676: {
    /* n:"BrtFileSharingIso" */
  },
  /*::[*/
  677: {
    /* n:"BrtBookProtectionIso" */
  },
  /*::[*/
  678: {
    /* n:"BrtSheetProtectionIso" */
  },
  /*::[*/
  679: {
    /* n:"BrtCsProtectionIso" */
  },
  /*::[*/
  680: {
    /* n:"BrtRangeProtectionIso" */
  },
  /*::[*/
  681: {
    /* n:"BrtDValList" */
  },
  /*::[*/
  1024: {
    /* n:"BrtRwDescent" */
  },
  /*::[*/
  1025: {
    /* n:"BrtKnownFonts" */
  },
  /*::[*/
  1026: {
    /* n:"BrtBeginSXTupleSet", */
    T: 1
  },
  /*::[*/
  1027: {
    /* n:"BrtEndSXTupleSet", */
    T: -1
  },
  /*::[*/
  1028: {
    /* n:"BrtBeginSXTupleSetHeader", */
    T: 1
  },
  /*::[*/
  1029: {
    /* n:"BrtEndSXTupleSetHeader", */
    T: -1
  },
  /*::[*/
  1030: {
    /* n:"BrtSXTupleSetHeaderItem" */
  },
  /*::[*/
  1031: {
    /* n:"BrtBeginSXTupleSetData", */
    T: 1
  },
  /*::[*/
  1032: {
    /* n:"BrtEndSXTupleSetData", */
    T: -1
  },
  /*::[*/
  1033: {
    /* n:"BrtBeginSXTupleSetRow", */
    T: 1
  },
  /*::[*/
  1034: {
    /* n:"BrtEndSXTupleSetRow", */
    T: -1
  },
  /*::[*/
  1035: {
    /* n:"BrtSXTupleSetRowItem" */
  },
  /*::[*/
  1036: {
    /* n:"BrtNameExt" */
  },
  /*::[*/
  1037: {
    /* n:"BrtPCDH14" */
  },
  /*::[*/
  1038: {
    /* n:"BrtBeginPCDCalcMem14", */
    T: 1
  },
  /*::[*/
  1039: {
    /* n:"BrtEndPCDCalcMem14", */
    T: -1
  },
  /*::[*/
  1040: {
    /* n:"BrtSXTH14" */
  },
  /*::[*/
  1041: {
    /* n:"BrtBeginSparklineGroup", */
    T: 1
  },
  /*::[*/
  1042: {
    /* n:"BrtEndSparklineGroup", */
    T: -1
  },
  /*::[*/
  1043: {
    /* n:"BrtSparkline" */
  },
  /*::[*/
  1044: {
    /* n:"BrtSXDI14" */
  },
  /*::[*/
  1045: {
    /* n:"BrtWsFmtInfoEx14" */
  },
  /*::[*/
  1046: {
    /* n:"BrtBeginConditionalFormatting14", */
    T: 1
  },
  /*::[*/
  1047: {
    /* n:"BrtEndConditionalFormatting14", */
    T: -1
  },
  /*::[*/
  1048: {
    /* n:"BrtBeginCFRule14", */
    T: 1
  },
  /*::[*/
  1049: {
    /* n:"BrtEndCFRule14", */
    T: -1
  },
  /*::[*/
  1050: {
    /* n:"BrtCFVO14" */
  },
  /*::[*/
  1051: {
    /* n:"BrtBeginDatabar14", */
    T: 1
  },
  /*::[*/
  1052: {
    /* n:"BrtBeginIconSet14", */
    T: 1
  },
  /*::[*/
  1053: {
    /* n:"BrtDVal14", */
    f: I1
  },
  /*::[*/
  1054: {
    /* n:"BrtBeginDVals14", */
    T: 1
  },
  /*::[*/
  1055: {
    /* n:"BrtColor14" */
  },
  /*::[*/
  1056: {
    /* n:"BrtBeginSparklines", */
    T: 1
  },
  /*::[*/
  1057: {
    /* n:"BrtEndSparklines", */
    T: -1
  },
  /*::[*/
  1058: {
    /* n:"BrtBeginSparklineGroups", */
    T: 1
  },
  /*::[*/
  1059: {
    /* n:"BrtEndSparklineGroups", */
    T: -1
  },
  /*::[*/
  1061: {
    /* n:"BrtSXVD14" */
  },
  /*::[*/
  1062: {
    /* n:"BrtBeginSXView14", */
    T: 1
  },
  /*::[*/
  1063: {
    /* n:"BrtEndSXView14", */
    T: -1
  },
  /*::[*/
  1064: {
    /* n:"BrtBeginSXView16", */
    T: 1
  },
  /*::[*/
  1065: {
    /* n:"BrtEndSXView16", */
    T: -1
  },
  /*::[*/
  1066: {
    /* n:"BrtBeginPCD14", */
    T: 1
  },
  /*::[*/
  1067: {
    /* n:"BrtEndPCD14", */
    T: -1
  },
  /*::[*/
  1068: {
    /* n:"BrtBeginExtConn14", */
    T: 1
  },
  /*::[*/
  1069: {
    /* n:"BrtEndExtConn14", */
    T: -1
  },
  /*::[*/
  1070: {
    /* n:"BrtBeginSlicerCacheIDs", */
    T: 1
  },
  /*::[*/
  1071: {
    /* n:"BrtEndSlicerCacheIDs", */
    T: -1
  },
  /*::[*/
  1072: {
    /* n:"BrtBeginSlicerCacheID", */
    T: 1
  },
  /*::[*/
  1073: {
    /* n:"BrtEndSlicerCacheID", */
    T: -1
  },
  /*::[*/
  1075: {
    /* n:"BrtBeginSlicerCache", */
    T: 1
  },
  /*::[*/
  1076: {
    /* n:"BrtEndSlicerCache", */
    T: -1
  },
  /*::[*/
  1077: {
    /* n:"BrtBeginSlicerCacheDef", */
    T: 1
  },
  /*::[*/
  1078: {
    /* n:"BrtEndSlicerCacheDef", */
    T: -1
  },
  /*::[*/
  1079: {
    /* n:"BrtBeginSlicersEx", */
    T: 1
  },
  /*::[*/
  1080: {
    /* n:"BrtEndSlicersEx", */
    T: -1
  },
  /*::[*/
  1081: {
    /* n:"BrtBeginSlicerEx", */
    T: 1
  },
  /*::[*/
  1082: {
    /* n:"BrtEndSlicerEx", */
    T: -1
  },
  /*::[*/
  1083: {
    /* n:"BrtBeginSlicer", */
    T: 1
  },
  /*::[*/
  1084: {
    /* n:"BrtEndSlicer", */
    T: -1
  },
  /*::[*/
  1085: {
    /* n:"BrtSlicerCachePivotTables" */
  },
  /*::[*/
  1086: {
    /* n:"BrtBeginSlicerCacheOlapImpl", */
    T: 1
  },
  /*::[*/
  1087: {
    /* n:"BrtEndSlicerCacheOlapImpl", */
    T: -1
  },
  /*::[*/
  1088: {
    /* n:"BrtBeginSlicerCacheLevelsData", */
    T: 1
  },
  /*::[*/
  1089: {
    /* n:"BrtEndSlicerCacheLevelsData", */
    T: -1
  },
  /*::[*/
  1090: {
    /* n:"BrtBeginSlicerCacheLevelData", */
    T: 1
  },
  /*::[*/
  1091: {
    /* n:"BrtEndSlicerCacheLevelData", */
    T: -1
  },
  /*::[*/
  1092: {
    /* n:"BrtBeginSlicerCacheSiRanges", */
    T: 1
  },
  /*::[*/
  1093: {
    /* n:"BrtEndSlicerCacheSiRanges", */
    T: -1
  },
  /*::[*/
  1094: {
    /* n:"BrtBeginSlicerCacheSiRange", */
    T: 1
  },
  /*::[*/
  1095: {
    /* n:"BrtEndSlicerCacheSiRange", */
    T: -1
  },
  /*::[*/
  1096: {
    /* n:"BrtSlicerCacheOlapItem" */
  },
  /*::[*/
  1097: {
    /* n:"BrtBeginSlicerCacheSelections", */
    T: 1
  },
  /*::[*/
  1098: {
    /* n:"BrtSlicerCacheSelection" */
  },
  /*::[*/
  1099: {
    /* n:"BrtEndSlicerCacheSelections", */
    T: -1
  },
  /*::[*/
  1100: {
    /* n:"BrtBeginSlicerCacheNative", */
    T: 1
  },
  /*::[*/
  1101: {
    /* n:"BrtEndSlicerCacheNative", */
    T: -1
  },
  /*::[*/
  1102: {
    /* n:"BrtSlicerCacheNativeItem" */
  },
  /*::[*/
  1103: {
    /* n:"BrtRangeProtection14" */
  },
  /*::[*/
  1104: {
    /* n:"BrtRangeProtectionIso14" */
  },
  /*::[*/
  1105: {
    /* n:"BrtCellIgnoreEC14" */
  },
  /*::[*/
  1111: {
    /* n:"BrtList14" */
  },
  /*::[*/
  1112: {
    /* n:"BrtCFIcon" */
  },
  /*::[*/
  1113: {
    /* n:"BrtBeginSlicerCachesPivotCacheIDs", */
    T: 1
  },
  /*::[*/
  1114: {
    /* n:"BrtEndSlicerCachesPivotCacheIDs", */
    T: -1
  },
  /*::[*/
  1115: {
    /* n:"BrtBeginSlicers", */
    T: 1
  },
  /*::[*/
  1116: {
    /* n:"BrtEndSlicers", */
    T: -1
  },
  /*::[*/
  1117: {
    /* n:"BrtWbProp14" */
  },
  /*::[*/
  1118: {
    /* n:"BrtBeginSXEdit", */
    T: 1
  },
  /*::[*/
  1119: {
    /* n:"BrtEndSXEdit", */
    T: -1
  },
  /*::[*/
  1120: {
    /* n:"BrtBeginSXEdits", */
    T: 1
  },
  /*::[*/
  1121: {
    /* n:"BrtEndSXEdits", */
    T: -1
  },
  /*::[*/
  1122: {
    /* n:"BrtBeginSXChange", */
    T: 1
  },
  /*::[*/
  1123: {
    /* n:"BrtEndSXChange", */
    T: -1
  },
  /*::[*/
  1124: {
    /* n:"BrtBeginSXChanges", */
    T: 1
  },
  /*::[*/
  1125: {
    /* n:"BrtEndSXChanges", */
    T: -1
  },
  /*::[*/
  1126: {
    /* n:"BrtSXTupleItems" */
  },
  /*::[*/
  1128: {
    /* n:"BrtBeginSlicerStyle", */
    T: 1
  },
  /*::[*/
  1129: {
    /* n:"BrtEndSlicerStyle", */
    T: -1
  },
  /*::[*/
  1130: {
    /* n:"BrtSlicerStyleElement" */
  },
  /*::[*/
  1131: {
    /* n:"BrtBeginStyleSheetExt14", */
    T: 1
  },
  /*::[*/
  1132: {
    /* n:"BrtEndStyleSheetExt14", */
    T: -1
  },
  /*::[*/
  1133: {
    /* n:"BrtBeginSlicerCachesPivotCacheID", */
    T: 1
  },
  /*::[*/
  1134: {
    /* n:"BrtEndSlicerCachesPivotCacheID", */
    T: -1
  },
  /*::[*/
  1135: {
    /* n:"BrtBeginConditionalFormattings", */
    T: 1
  },
  /*::[*/
  1136: {
    /* n:"BrtEndConditionalFormattings", */
    T: -1
  },
  /*::[*/
  1137: {
    /* n:"BrtBeginPCDCalcMemExt", */
    T: 1
  },
  /*::[*/
  1138: {
    /* n:"BrtEndPCDCalcMemExt", */
    T: -1
  },
  /*::[*/
  1139: {
    /* n:"BrtBeginPCDCalcMemsExt", */
    T: 1
  },
  /*::[*/
  1140: {
    /* n:"BrtEndPCDCalcMemsExt", */
    T: -1
  },
  /*::[*/
  1141: {
    /* n:"BrtPCDField14" */
  },
  /*::[*/
  1142: {
    /* n:"BrtBeginSlicerStyles", */
    T: 1
  },
  /*::[*/
  1143: {
    /* n:"BrtEndSlicerStyles", */
    T: -1
  },
  /*::[*/
  1144: {
    /* n:"BrtBeginSlicerStyleElements", */
    T: 1
  },
  /*::[*/
  1145: {
    /* n:"BrtEndSlicerStyleElements", */
    T: -1
  },
  /*::[*/
  1146: {
    /* n:"BrtCFRuleExt" */
  },
  /*::[*/
  1147: {
    /* n:"BrtBeginSXCondFmt14", */
    T: 1
  },
  /*::[*/
  1148: {
    /* n:"BrtEndSXCondFmt14", */
    T: -1
  },
  /*::[*/
  1149: {
    /* n:"BrtBeginSXCondFmts14", */
    T: 1
  },
  /*::[*/
  1150: {
    /* n:"BrtEndSXCondFmts14", */
    T: -1
  },
  /*::[*/
  1152: {
    /* n:"BrtBeginSortCond14", */
    T: 1
  },
  /*::[*/
  1153: {
    /* n:"BrtEndSortCond14", */
    T: -1
  },
  /*::[*/
  1154: {
    /* n:"BrtEndDVals14", */
    T: -1
  },
  /*::[*/
  1155: {
    /* n:"BrtEndIconSet14", */
    T: -1
  },
  /*::[*/
  1156: {
    /* n:"BrtEndDatabar14", */
    T: -1
  },
  /*::[*/
  1157: {
    /* n:"BrtBeginColorScale14", */
    T: 1
  },
  /*::[*/
  1158: {
    /* n:"BrtEndColorScale14", */
    T: -1
  },
  /*::[*/
  1159: {
    /* n:"BrtBeginSxrules14", */
    T: 1
  },
  /*::[*/
  1160: {
    /* n:"BrtEndSxrules14", */
    T: -1
  },
  /*::[*/
  1161: {
    /* n:"BrtBeginPRule14", */
    T: 1
  },
  /*::[*/
  1162: {
    /* n:"BrtEndPRule14", */
    T: -1
  },
  /*::[*/
  1163: {
    /* n:"BrtBeginPRFilters14", */
    T: 1
  },
  /*::[*/
  1164: {
    /* n:"BrtEndPRFilters14", */
    T: -1
  },
  /*::[*/
  1165: {
    /* n:"BrtBeginPRFilter14", */
    T: 1
  },
  /*::[*/
  1166: {
    /* n:"BrtEndPRFilter14", */
    T: -1
  },
  /*::[*/
  1167: {
    /* n:"BrtBeginPRFItem14", */
    T: 1
  },
  /*::[*/
  1168: {
    /* n:"BrtEndPRFItem14", */
    T: -1
  },
  /*::[*/
  1169: {
    /* n:"BrtBeginCellIgnoreECs14", */
    T: 1
  },
  /*::[*/
  1170: {
    /* n:"BrtEndCellIgnoreECs14", */
    T: -1
  },
  /*::[*/
  1171: {
    /* n:"BrtDxf14" */
  },
  /*::[*/
  1172: {
    /* n:"BrtBeginDxF14s", */
    T: 1
  },
  /*::[*/
  1173: {
    /* n:"BrtEndDxf14s", */
    T: -1
  },
  /*::[*/
  1177: {
    /* n:"BrtFilter14" */
  },
  /*::[*/
  1178: {
    /* n:"BrtBeginCustomFilters14", */
    T: 1
  },
  /*::[*/
  1180: {
    /* n:"BrtCustomFilter14" */
  },
  /*::[*/
  1181: {
    /* n:"BrtIconFilter14" */
  },
  /*::[*/
  1182: {
    /* n:"BrtPivotCacheConnectionName" */
  },
  /*::[*/
  2048: {
    /* n:"BrtBeginDecoupledPivotCacheIDs", */
    T: 1
  },
  /*::[*/
  2049: {
    /* n:"BrtEndDecoupledPivotCacheIDs", */
    T: -1
  },
  /*::[*/
  2050: {
    /* n:"BrtDecoupledPivotCacheID" */
  },
  /*::[*/
  2051: {
    /* n:"BrtBeginPivotTableRefs", */
    T: 1
  },
  /*::[*/
  2052: {
    /* n:"BrtEndPivotTableRefs", */
    T: -1
  },
  /*::[*/
  2053: {
    /* n:"BrtPivotTableRef" */
  },
  /*::[*/
  2054: {
    /* n:"BrtSlicerCacheBookPivotTables" */
  },
  /*::[*/
  2055: {
    /* n:"BrtBeginSxvcells", */
    T: 1
  },
  /*::[*/
  2056: {
    /* n:"BrtEndSxvcells", */
    T: -1
  },
  /*::[*/
  2057: {
    /* n:"BrtBeginSxRow", */
    T: 1
  },
  /*::[*/
  2058: {
    /* n:"BrtEndSxRow", */
    T: -1
  },
  /*::[*/
  2060: {
    /* n:"BrtPcdCalcMem15" */
  },
  /*::[*/
  2067: {
    /* n:"BrtQsi15" */
  },
  /*::[*/
  2068: {
    /* n:"BrtBeginWebExtensions", */
    T: 1
  },
  /*::[*/
  2069: {
    /* n:"BrtEndWebExtensions", */
    T: -1
  },
  /*::[*/
  2070: {
    /* n:"BrtWebExtension" */
  },
  /*::[*/
  2071: {
    /* n:"BrtAbsPath15" */
  },
  /*::[*/
  2072: {
    /* n:"BrtBeginPivotTableUISettings", */
    T: 1
  },
  /*::[*/
  2073: {
    /* n:"BrtEndPivotTableUISettings", */
    T: -1
  },
  /*::[*/
  2075: {
    /* n:"BrtTableSlicerCacheIDs" */
  },
  /*::[*/
  2076: {
    /* n:"BrtTableSlicerCacheID" */
  },
  /*::[*/
  2077: {
    /* n:"BrtBeginTableSlicerCache", */
    T: 1
  },
  /*::[*/
  2078: {
    /* n:"BrtEndTableSlicerCache", */
    T: -1
  },
  /*::[*/
  2079: {
    /* n:"BrtSxFilter15" */
  },
  /*::[*/
  2080: {
    /* n:"BrtBeginTimelineCachePivotCacheIDs", */
    T: 1
  },
  /*::[*/
  2081: {
    /* n:"BrtEndTimelineCachePivotCacheIDs", */
    T: -1
  },
  /*::[*/
  2082: {
    /* n:"BrtTimelineCachePivotCacheID" */
  },
  /*::[*/
  2083: {
    /* n:"BrtBeginTimelineCacheIDs", */
    T: 1
  },
  /*::[*/
  2084: {
    /* n:"BrtEndTimelineCacheIDs", */
    T: -1
  },
  /*::[*/
  2085: {
    /* n:"BrtBeginTimelineCacheID", */
    T: 1
  },
  /*::[*/
  2086: {
    /* n:"BrtEndTimelineCacheID", */
    T: -1
  },
  /*::[*/
  2087: {
    /* n:"BrtBeginTimelinesEx", */
    T: 1
  },
  /*::[*/
  2088: {
    /* n:"BrtEndTimelinesEx", */
    T: -1
  },
  /*::[*/
  2089: {
    /* n:"BrtBeginTimelineEx", */
    T: 1
  },
  /*::[*/
  2090: {
    /* n:"BrtEndTimelineEx", */
    T: -1
  },
  /*::[*/
  2091: {
    /* n:"BrtWorkBookPr15" */
  },
  /*::[*/
  2092: {
    /* n:"BrtPCDH15" */
  },
  /*::[*/
  2093: {
    /* n:"BrtBeginTimelineStyle", */
    T: 1
  },
  /*::[*/
  2094: {
    /* n:"BrtEndTimelineStyle", */
    T: -1
  },
  /*::[*/
  2095: {
    /* n:"BrtTimelineStyleElement" */
  },
  /*::[*/
  2096: {
    /* n:"BrtBeginTimelineStylesheetExt15", */
    T: 1
  },
  /*::[*/
  2097: {
    /* n:"BrtEndTimelineStylesheetExt15", */
    T: -1
  },
  /*::[*/
  2098: {
    /* n:"BrtBeginTimelineStyles", */
    T: 1
  },
  /*::[*/
  2099: {
    /* n:"BrtEndTimelineStyles", */
    T: -1
  },
  /*::[*/
  2100: {
    /* n:"BrtBeginTimelineStyleElements", */
    T: 1
  },
  /*::[*/
  2101: {
    /* n:"BrtEndTimelineStyleElements", */
    T: -1
  },
  /*::[*/
  2102: {
    /* n:"BrtDxf15" */
  },
  /*::[*/
  2103: {
    /* n:"BrtBeginDxfs15", */
    T: 1
  },
  /*::[*/
  2104: {
    /* n:"BrtEndDxfs15", */
    T: -1
  },
  /*::[*/
  2105: {
    /* n:"BrtSlicerCacheHideItemsWithNoData" */
  },
  /*::[*/
  2106: {
    /* n:"BrtBeginItemUniqueNames", */
    T: 1
  },
  /*::[*/
  2107: {
    /* n:"BrtEndItemUniqueNames", */
    T: -1
  },
  /*::[*/
  2108: {
    /* n:"BrtItemUniqueName" */
  },
  /*::[*/
  2109: {
    /* n:"BrtBeginExtConn15", */
    T: 1
  },
  /*::[*/
  2110: {
    /* n:"BrtEndExtConn15", */
    T: -1
  },
  /*::[*/
  2111: {
    /* n:"BrtBeginOledbPr15", */
    T: 1
  },
  /*::[*/
  2112: {
    /* n:"BrtEndOledbPr15", */
    T: -1
  },
  /*::[*/
  2113: {
    /* n:"BrtBeginDataFeedPr15", */
    T: 1
  },
  /*::[*/
  2114: {
    /* n:"BrtEndDataFeedPr15", */
    T: -1
  },
  /*::[*/
  2115: {
    /* n:"BrtTextPr15" */
  },
  /*::[*/
  2116: {
    /* n:"BrtRangePr15" */
  },
  /*::[*/
  2117: {
    /* n:"BrtDbCommand15" */
  },
  /*::[*/
  2118: {
    /* n:"BrtBeginDbTables15", */
    T: 1
  },
  /*::[*/
  2119: {
    /* n:"BrtEndDbTables15", */
    T: -1
  },
  /*::[*/
  2120: {
    /* n:"BrtDbTable15" */
  },
  /*::[*/
  2121: {
    /* n:"BrtBeginDataModel", */
    T: 1
  },
  /*::[*/
  2122: {
    /* n:"BrtEndDataModel", */
    T: -1
  },
  /*::[*/
  2123: {
    /* n:"BrtBeginModelTables", */
    T: 1
  },
  /*::[*/
  2124: {
    /* n:"BrtEndModelTables", */
    T: -1
  },
  /*::[*/
  2125: {
    /* n:"BrtModelTable" */
  },
  /*::[*/
  2126: {
    /* n:"BrtBeginModelRelationships", */
    T: 1
  },
  /*::[*/
  2127: {
    /* n:"BrtEndModelRelationships", */
    T: -1
  },
  /*::[*/
  2128: {
    /* n:"BrtModelRelationship" */
  },
  /*::[*/
  2129: {
    /* n:"BrtBeginECTxtWiz15", */
    T: 1
  },
  /*::[*/
  2130: {
    /* n:"BrtEndECTxtWiz15", */
    T: -1
  },
  /*::[*/
  2131: {
    /* n:"BrtBeginECTWFldInfoLst15", */
    T: 1
  },
  /*::[*/
  2132: {
    /* n:"BrtEndECTWFldInfoLst15", */
    T: -1
  },
  /*::[*/
  2133: {
    /* n:"BrtBeginECTWFldInfo15", */
    T: 1
  },
  /*::[*/
  2134: {
    /* n:"BrtFieldListActiveItem" */
  },
  /*::[*/
  2135: {
    /* n:"BrtPivotCacheIdVersion" */
  },
  /*::[*/
  2136: {
    /* n:"BrtSXDI15" */
  },
  /*::[*/
  2137: {
    /* n:"BrtBeginModelTimeGroupings", */
    T: 1
  },
  /*::[*/
  2138: {
    /* n:"BrtEndModelTimeGroupings", */
    T: -1
  },
  /*::[*/
  2139: {
    /* n:"BrtBeginModelTimeGrouping", */
    T: 1
  },
  /*::[*/
  2140: {
    /* n:"BrtEndModelTimeGrouping", */
    T: -1
  },
  /*::[*/
  2141: {
    /* n:"BrtModelTimeGroupingCalcCol" */
  },
  /*::[*/
  3072: {
    /* n:"BrtUid" */
  },
  /*::[*/
  3073: {
    /* n:"BrtRevisionPtr" */
  },
  /*::[*/
  4096: {
    /* n:"BrtBeginDynamicArrayPr", */
    T: 1
  },
  /*::[*/
  4097: {
    /* n:"BrtEndDynamicArrayPr", */
    T: -1
  },
  /*::[*/
  5002: {
    /* n:"BrtBeginRichValueBlock", */
    T: 1
  },
  /*::[*/
  5003: {
    /* n:"BrtEndRichValueBlock", */
    T: -1
  },
  /*::[*/
  5081: {
    /* n:"BrtBeginRichFilters", */
    T: 1
  },
  /*::[*/
  5082: {
    /* n:"BrtEndRichFilters", */
    T: -1
  },
  /*::[*/
  5083: {
    /* n:"BrtRichFilter" */
  },
  /*::[*/
  5084: {
    /* n:"BrtBeginRichFilterColumn", */
    T: 1
  },
  /*::[*/
  5085: {
    /* n:"BrtEndRichFilterColumn", */
    T: -1
  },
  /*::[*/
  5086: {
    /* n:"BrtBeginCustomRichFilters", */
    T: 1
  },
  /*::[*/
  5087: {
    /* n:"BrtEndCustomRichFilters", */
    T: -1
  },
  /*::[*/
  5088: {
    /* n:"BrtCustomRichFilter" */
  },
  /*::[*/
  5089: {
    /* n:"BrtTop10RichFilter" */
  },
  /*::[*/
  5090: {
    /* n:"BrtDynamicRichFilter" */
  },
  /*::[*/
  5092: {
    /* n:"BrtBeginRichSortCondition", */
    T: 1
  },
  /*::[*/
  5093: {
    /* n:"BrtEndRichSortCondition", */
    T: -1
  },
  /*::[*/
  5094: {
    /* n:"BrtRichFilterDateGroupItem" */
  },
  /*::[*/
  5095: {
    /* n:"BrtBeginCalcFeatures", */
    T: 1
  },
  /*::[*/
  5096: {
    /* n:"BrtEndCalcFeatures", */
    T: -1
  },
  /*::[*/
  5097: {
    /* n:"BrtCalcFeature" */
  },
  /*::[*/
  5099: {
    /* n:"BrtExternalLinksPr" */
  },
  /*::[*/
  65535: { n: "" }
};
function J(e, t, r, n) {
  var a = t;
  if (!isNaN(a)) {
    var i = n || (r || []).length || 0, s = e.next(4);
    s.write_shift(2, a), s.write_shift(2, i), /*:: len != null &&*/
    i > 0 && n0(r) && e.push(r);
  }
}
function Cx(e, t, r, n) {
  var a = n || (r || []).length || 0;
  if (a <= 8224)
    return J(e, t, r, a);
  var i = t;
  if (!isNaN(i)) {
    for (var s = r.parts || [], f = 0, o = 0, l = 0; l + (s[f] || 8224) <= 8224; )
      l += s[f] || 8224, f++;
    var c = e.next(4);
    for (c.write_shift(2, i), c.write_shift(2, l), e.push(r.slice(o, o + l)), o += l; o < a; ) {
      for (c = e.next(4), c.write_shift(2, 60), l = 0; l + (s[f] || 8224) <= 8224; )
        l += s[f] || 8224, f++;
      c.write_shift(2, l), e.push(r.slice(o, o + l)), o += l;
    }
  }
}
function Gt(e, t, r) {
  return e || (e = B(7)), e.write_shift(2, t), e.write_shift(2, r), e.write_shift(2, 0), e.write_shift(1, 0), e;
}
function Ox(e, t, r, n) {
  var a = B(9);
  return Gt(a, e, t), Ri(r, n || "b", a), a;
}
function Dx(e, t, r) {
  var n = B(8 + 2 * r.length);
  return Gt(n, e, t), n.write_shift(1, r.length), n.write_shift(r.length, r, "sbcs"), n.l < n.length ? n.slice(0, n.l) : n;
}
function Rx(e, t, r, n) {
  if (t.v != null)
    switch (t.t) {
      case "d":
      case "n":
        var a = t.t == "d" ? Qe(qe(t.v)) : t.v;
        a == (a | 0) && a >= 0 && a < 65536 ? J(e, 2, Xo(r, n, a)) : J(e, 3, Go(r, n, a));
        return;
      case "b":
      case "e":
        J(e, 5, Ox(r, n, t.v, t.t));
        return;
      case "s":
      case "str":
        J(e, 4, Dx(r, n, (t.v || "").slice(0, 255)));
        return;
    }
  J(e, 1, Gt(null, r, n));
}
function Nx(e, t, r, n) {
  var a = Array.isArray(t), i = Ee(t["!ref"] || "A1"), s, f = "", o = [];
  if (i.e.c > 255 || i.e.r > 16383) {
    if (n.WTF)
      throw new Error("Range " + (t["!ref"] || "A1") + " exceeds format limit A1:IV16384");
    i.e.c = Math.min(i.e.c, 255), i.e.r = Math.min(i.e.c, 16383), s = Ne(i);
  }
  for (var l = i.s.r; l <= i.e.r; ++l) {
    f = Ge(l);
    for (var c = i.s.c; c <= i.e.c; ++c) {
      l === i.s.r && (o[c] = $e(c)), s = o[c] + f;
      var u = a ? (t[l] || [])[c] : t[s];
      u && Rx(e, u, l, c);
    }
  }
}
function Ix(e, t) {
  for (var r = t || {}, n = Ze(), a = 0, i = 0; i < e.SheetNames.length; ++i)
    e.SheetNames[i] == r.sheet && (a = i);
  if (a == 0 && r.sheet && e.SheetNames[0] != r.sheet)
    throw new Error("Sheet not found: " + r.sheet);
  return J(n, r.biff == 4 ? 1033 : r.biff == 3 ? 521 : 9, o0(e, 16, r)), Nx(n, e.Sheets[e.SheetNames[a]], a, r), J(n, 10), n.end();
}
function kx(e, t, r) {
  J(e, 49, yo({
    sz: 12,
    color: { theme: 1 },
    name: "Arial",
    family: 2,
    scheme: "minor"
  }, r));
}
function Px(e, t, r) {
  t && [[5, 8], [23, 26], [41, 44], [
    /*63*/
    50,
    /*66],[164,*/
    392
  ]].forEach(function(n) {
    for (var a = n[0]; a <= n[1]; ++a)
      t[a] != null && J(e, 1054, Do(a, t[a], r));
  });
}
function Lx(e, t) {
  var r = B(19);
  r.write_shift(4, 2151), r.write_shift(4, 0), r.write_shift(4, 0), r.write_shift(2, 3), r.write_shift(1, 1), r.write_shift(4, 0), J(e, 2151, r), r = B(39), r.write_shift(4, 2152), r.write_shift(4, 0), r.write_shift(4, 0), r.write_shift(2, 3), r.write_shift(1, 0), r.write_shift(4, 0), r.write_shift(2, 1), r.write_shift(4, 4), r.write_shift(2, 0), ki(Ee(t["!ref"] || "A1"), r), r.write_shift(4, 4), J(e, 2152, r);
}
function Mx(e, t) {
  for (var r = 0; r < 16; ++r)
    J(e, 224, da({ numFmtId: 0, style: !0 }, 0, t));
  t.cellXfs.forEach(function(n) {
    J(e, 224, da(n, 0, t));
  });
}
function Bx(e, t) {
  for (var r = 0; r < t["!links"].length; ++r) {
    var n = t["!links"][r];
    J(e, 440, Bo(n)), n[1].Tooltip && J(e, 2048, bo(n));
  }
  delete t["!links"];
}
function bx(e, t) {
  if (t) {
    var r = 0;
    t.forEach(function(n, a) {
      ++r <= 256 && n && J(e, 125, Ho(Fn(a, n), a));
    });
  }
}
function Ux(e, t, r, n, a) {
  var i = 16 + Hr(a.cellXfs, t, a);
  if (t.v == null && !t.bf) {
    J(e, 513, Jr(r, n, i));
    return;
  }
  if (t.bf)
    J(e, 6, ou(t, r, n, a, i));
  else
    switch (t.t) {
      case "d":
      case "n":
        var s = t.t == "d" ? Qe(qe(t.v)) : t.v;
        J(e, 515, ko(r, n, s, i));
        break;
      case "b":
      case "e":
        J(e, 517, Io(r, n, t.v, i, a, t.t));
        break;
      case "s":
      case "str":
        if (a.bookSST) {
          var f = d0(a.Strings, t.v, a.revStrings);
          J(e, 253, Co(r, n, f, i));
        } else
          J(e, 516, Oo(r, n, (t.v || "").slice(0, 255), i, a));
        break;
      default:
        J(e, 513, Jr(r, n, i));
    }
}
function Wx(e, t, r) {
  var n = Ze(), a = r.SheetNames[e], i = r.Sheets[a] || {}, s = (r || {}).Workbook || {}, f = (s.Sheets || [])[e] || {}, o = Array.isArray(i), l = t.biff == 8, c, u = "", h = [], p = Ee(i["!ref"] || "A1"), _ = l ? 65536 : 16384;
  if (p.e.c > 255 || p.e.r >= _) {
    if (t.WTF)
      throw new Error("Range " + (i["!ref"] || "A1") + " exceeds format limit A1:IV16384");
    p.e.c = Math.min(p.e.c, 255), p.e.r = Math.min(p.e.c, _ - 1);
  }
  J(n, 2057, o0(r, 16, t)), J(n, 13, cr(1)), J(n, 12, cr(100)), J(n, 15, Je(!0)), J(n, 17, Je(!1)), J(n, 16, Yr(1e-3)), J(n, 95, Je(!0)), J(n, 42, Je(!1)), J(n, 43, Je(!1)), J(n, 130, cr(1)), J(n, 128, No([0, 0])), J(n, 131, Je(!1)), J(n, 132, Je(!1)), l && bx(n, i["!cols"]), J(n, 512, Ro(p, t)), l && (i["!links"] = []);
  for (var x = p.s.r; x <= p.e.r; ++x) {
    u = Ge(x);
    for (var g = p.s.c; g <= p.e.c; ++g) {
      x === p.s.r && (h[g] = $e(g)), c = h[g] + u;
      var C = o ? (i[x] || [])[g] : i[c];
      C && (Ux(n, C, x, g, t), l && C.l && i["!links"].push([c, C.l]));
    }
  }
  var O = f.CodeName || f.name || a;
  return l && J(n, 574, Fo((s.Views || [])[0])), l && (i["!merges"] || []).length && J(n, 229, Mo(i["!merges"])), l && Bx(n, i), J(n, 442, Ii(O)), l && Lx(n, i), J(
    n,
    10
    /* EOF */
  ), n.end();
}
function Hx(e, t, r) {
  var n = Ze(), a = (e || {}).Workbook || {}, i = a.Sheets || [], s = (
    /*::((*/
    a.WBProps || {
      /*::CodeName:"ThisWorkbook"*/
    }
  ), f = r.biff == 8, o = r.biff == 5;
  if (J(n, 2057, o0(e, 5, r)), r.bookType == "xla" && J(
    n,
    135
    /* Addin */
  ), J(n, 225, f ? cr(1200) : null), J(n, 193, ho(2)), o && J(
    n,
    191
    /* ToolbarHdr */
  ), o && J(
    n,
    192
    /* ToolbarEnd */
  ), J(
    n,
    226
    /* InterfaceEnd */
  ), J(n, 92, Eo("SheetJS", r)), J(n, 66, cr(f ? 1200 : 1252)), f && J(n, 353, cr(0)), f && J(
    n,
    448
    /* Excel9File */
  ), J(n, 317, Vo(e.SheetNames.length)), f && e.vbaraw && J(
    n,
    211
    /* ObProj */
  ), f && e.vbaraw) {
    var l = s.CodeName || "ThisWorkbook";
    J(n, 442, Ii(l));
  }
  J(n, 156, cr(17)), J(n, 25, Je(!1)), J(n, 18, Je(!1)), J(n, 19, cr(0)), f && J(n, 431, Je(!1)), f && J(n, 444, cr(0)), J(n, 61, Ao()), J(n, 64, Je(!1)), J(n, 141, cr(0)), J(n, 34, Je($1(e) == "true")), J(n, 14, Je(!0)), f && J(n, 439, Je(!1)), J(n, 218, cr(0)), kx(n, e, r), Px(n, e.SSF, r), Mx(n, r), f && J(n, 352, Je(!1));
  var c = n.end(), u = Ze();
  f && J(u, 140, Uo()), f && r.Strings && Cx(u, 252, So(r.Strings)), J(
    u,
    10
    /* EOF */
  );
  var h = u.end(), p = Ze(), _ = 0, x = 0;
  for (x = 0; x < e.SheetNames.length; ++x)
    _ += (f ? 12 : 11) + (f ? 2 : 1) * e.SheetNames[x].length;
  var g = c.length + _ + h.length;
  for (x = 0; x < e.SheetNames.length; ++x) {
    var C = i[x] || {};
    J(p, 133, wo({ pos: g, hs: C.Hidden || 0, dt: 0, name: e.SheetNames[x] }, r)), g += t[x].length;
  }
  var O = p.end();
  if (_ != O.length)
    throw new Error("BS8 " + _ + " != " + O.length);
  var F = [];
  return c.length && F.push(c), O.length && F.push(O), h.length && F.push(h), He(F);
}
function Vx(e, t) {
  var r = t || {}, n = [];
  e && !e.SSF && (e.SSF = er(Ce)), e && e.SSF && (Tn(), _n(e.SSF), r.revssf = En(e.SSF), r.revssf[e.SSF[65535]] = 0, r.ssf = e.SSF), r.Strings = /*::((*/
  [], r.Strings.Count = 0, r.Strings.Unique = 0, p0(r), r.cellXfs = [], Hr(r.cellXfs, {}, { revssf: { General: 0 } }), e.Props || (e.Props = {});
  for (var a = 0; a < e.SheetNames.length; ++a)
    n[n.length] = Wx(a, r, e);
  return n.unshift(Hx(e, n, r)), He(n);
}
function is(e, t) {
  for (var r = 0; r <= e.SheetNames.length; ++r) {
    var n = e.Sheets[e.SheetNames[r]];
    if (!(!n || !n["!ref"])) {
      var a = sr(n["!ref"]);
      a.e.c > 255 && typeof console < "u" && console.error && console.error("Worksheet '" + e.SheetNames[r] + "' extends beyond column IV (255).  Data may be lost.");
    }
  }
  var i = t || {};
  switch (i.biff || 2) {
    case 8:
    case 5:
      return Vx(e, t);
    case 4:
    case 3:
    case 2:
      return Ix(e, t);
  }
  throw new Error("invalid type " + i.bookType + " for BIFF");
}
function Gx(e, t, r, n) {
  for (var a = e["!merges"] || [], i = [], s = t.s.c; s <= t.e.c; ++s) {
    for (var f = 0, o = 0, l = 0; l < a.length; ++l)
      if (!(a[l].s.r > r || a[l].s.c > s) && !(a[l].e.r < r || a[l].e.c < s)) {
        if (a[l].s.r < r || a[l].s.c < s) {
          f = -1;
          break;
        }
        f = a[l].e.r - a[l].s.r + 1, o = a[l].e.c - a[l].s.c + 1;
        break;
      }
    if (!(f < 0)) {
      var c = me({ r, c: s }), u = n.dense ? (e[r] || [])[s] : e[c], h = u && u.v != null && (u.h || _l(u.w || (Nr(u), u.w) || "")) || "", p = {};
      f > 1 && (p.rowspan = f), o > 1 && (p.colspan = o), n.editable ? h = '<span contenteditable="true">' + h + "</span>" : u && (p["data-t"] = u && u.t || "z", u.v != null && (p["data-v"] = u.v), u.z != null && (p["data-z"] = u.z), u.l && (u.l.Target || "#").charAt(0) != "#" && (h = '<a href="' + u.l.Target + '">' + h + "</a>")), p.id = (n.id || "sjs") + "-" + c, i.push(Y("td", h, p));
    }
  }
  var _ = "<tr>";
  return _ + i.join("") + "</tr>";
}
var Xx = '<html><head><meta charset="utf-8"/><title>SheetJS Table Export</title></head><body>', jx = "</body></html>";
function $x(e, t, r) {
  var n = [];
  return n.join("") + "<table" + (r && r.id ? ' id="' + r.id + '"' : "") + ">";
}
function ss(e, t) {
  var r = t || {}, n = r.header != null ? r.header : Xx, a = r.footer != null ? r.footer : jx, i = [n], s = sr(e["!ref"]);
  r.dense = Array.isArray(e), i.push($x(e, s, r));
  for (var f = s.s.r; f <= s.e.r; ++f)
    i.push(Gx(e, s, f, r));
  return i.push("</table>" + a), i.join("");
}
function fs(e, t, r) {
  var n = r || {}, a = 0, i = 0;
  if (n.origin != null)
    if (typeof n.origin == "number")
      a = n.origin;
    else {
      var s = typeof n.origin == "string" ? Me(n.origin) : n.origin;
      a = s.r, i = s.c;
    }
  var f = t.getElementsByTagName("tr"), o = Math.min(n.sheetRows || 1e7, f.length), l = { s: { r: 0, c: 0 }, e: { r: a, c: i } };
  if (e["!ref"]) {
    var c = sr(e["!ref"]);
    l.s.r = Math.min(l.s.r, c.s.r), l.s.c = Math.min(l.s.c, c.s.c), l.e.r = Math.max(l.e.r, c.e.r), l.e.c = Math.max(l.e.c, c.e.c), a == -1 && (l.e.r = a = c.e.r + 1);
  }
  var u = [], h = 0, p = e["!rows"] || (e["!rows"] = []), _ = 0, x = 0, g = 0, C = 0, O = 0, F = 0;
  for (e["!cols"] || (e["!cols"] = []); _ < f.length && x < o; ++_) {
    var L = f[_];
    if (Ea(L)) {
      if (n.display)
        continue;
      p[x] = { hidden: !0 };
    }
    var j = L.children;
    for (g = C = 0; g < j.length; ++g) {
      var Q = j[g];
      if (!(n.display && Ea(Q))) {
        var D = Q.hasAttribute("data-v") ? Q.getAttribute("data-v") : Q.hasAttribute("v") ? Q.getAttribute("v") : Sl(Q.innerHTML), U = Q.getAttribute("data-z") || Q.getAttribute("z");
        for (h = 0; h < u.length; ++h) {
          var M = u[h];
          M.s.c == C + i && M.s.r < x + a && x + a <= M.e.r && (C = M.e.c + 1 - i, h = -1);
        }
        F = +Q.getAttribute("colspan") || 1, ((O = +Q.getAttribute("rowspan") || 1) > 1 || F > 1) && u.push({ s: { r: x + a, c: C + i }, e: { r: x + a + (O || 1) - 1, c: C + i + (F || 1) - 1 } });
        var V = { t: "s", v: D }, G = Q.getAttribute("data-t") || Q.getAttribute("t") || "";
        D != null && (D.length == 0 ? V.t = G || "z" : n.raw || D.trim().length == 0 || G == "s" || (D === "TRUE" ? V = { t: "b", v: !0 } : D === "FALSE" ? V = { t: "b", v: !1 } : isNaN(Cr(D)) ? isNaN(Pt(D).getDate()) || (V = { t: "d", v: qe(D) }, n.cellDates || (V = { t: "n", v: Qe(V.v) }), V.z = n.dateNF || Ce[14]) : V = { t: "n", v: Cr(D) })), V.z === void 0 && U != null && (V.z = U);
        var z = "", re = Q.getElementsByTagName("A");
        if (re && re.length)
          for (var ge = 0; ge < re.length && !(re[ge].hasAttribute("href") && (z = re[ge].getAttribute("href"), z.charAt(0) != "#")); ++ge)
            ;
        z && z.charAt(0) != "#" && (V.l = { Target: z }), n.dense ? (e[x + a] || (e[x + a] = []), e[x + a][C + i] = V) : e[me({ c: C + i, r: x + a })] = V, l.e.c < C + i && (l.e.c = C + i), C += F;
      }
    }
    ++x;
  }
  return u.length && (e["!merges"] = (e["!merges"] || []).concat(u)), l.e.r = Math.max(l.e.r, x - 1 + a), e["!ref"] = Ne(l), x >= o && (e["!fullref"] = Ne((l.e.r = f.length - _ + x - 1 + a, l))), e;
}
function ls(e, t) {
  var r = t || {}, n = r.dense ? [] : {};
  return fs(n, e, t);
}
function zx(e, t) {
  return Zr(ls(e, t), t);
}
function Ea(e) {
  var t = "", r = Kx(e);
  return r && (t = r(e).getPropertyValue("display")), t || (t = e.style && e.style.display), t === "none";
}
function Kx(e) {
  return e.ownerDocument.defaultView && typeof e.ownerDocument.defaultView.getComputedStyle == "function" ? e.ownerDocument.defaultView.getComputedStyle : typeof getComputedStyle == "function" ? getComputedStyle : null;
}
var Yx = /* @__PURE__ */ function() {
  var e = [
    "<office:master-styles>",
    '<style:master-page style:name="mp1" style:page-layout-name="mp1">',
    "<style:header/>",
    '<style:header-left style:display="false"/>',
    "<style:footer/>",
    '<style:footer-left style:display="false"/>',
    "</style:master-page>",
    "</office:master-styles>"
  ].join(""), t = "<office:document-styles " + Lt({
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
    return Ie + t;
  };
}(), wa = /* @__PURE__ */ function() {
  var e = function(i) {
    return ve(i).replace(/  +/g, function(s) {
      return '<text:s text:c="' + s.length + '"/>';
    }).replace(/\t/g, "<text:tab/>").replace(/\n/g, "</text:p><text:p>").replace(/^ /, "<text:s/>").replace(/ $/, "<text:s/>");
  }, t = `          <table:table-cell />
`, r = `          <table:covered-table-cell/>
`, n = function(i, s, f) {
    var o = [];
    o.push('      <table:table table:name="' + ve(s.SheetNames[f]) + `" table:style-name="ta1">
`);
    var l = 0, c = 0, u = sr(i["!ref"] || "A1"), h = i["!merges"] || [], p = 0, _ = Array.isArray(i);
    if (i["!cols"])
      for (c = 0; c <= u.e.c; ++c)
        o.push("        <table:table-column" + (i["!cols"][c] ? ' table:style-name="co' + i["!cols"][c].ods + '"' : "") + `></table:table-column>
`);
    var x = "", g = i["!rows"] || [];
    for (l = 0; l < u.s.r; ++l)
      x = g[l] ? ' table:style-name="ro' + g[l].ods + '"' : "", o.push("        <table:table-row" + x + `></table:table-row>
`);
    for (; l <= u.e.r; ++l) {
      for (x = g[l] ? ' table:style-name="ro' + g[l].ods + '"' : "", o.push("        <table:table-row" + x + `>
`), c = 0; c < u.s.c; ++c)
        o.push(t);
      for (; c <= u.e.c; ++c) {
        var C = !1, O = {}, F = "";
        for (p = 0; p != h.length; ++p)
          if (!(h[p].s.c > c) && !(h[p].s.r > l) && !(h[p].e.c < c) && !(h[p].e.r < l)) {
            (h[p].s.c != c || h[p].s.r != l) && (C = !0), O["table:number-columns-spanned"] = h[p].e.c - h[p].s.c + 1, O["table:number-rows-spanned"] = h[p].e.r - h[p].s.r + 1;
            break;
          }
        if (C) {
          o.push(r);
          continue;
        }
        var L = me({ r: l, c }), j = _ ? (i[l] || [])[c] : i[L];
        if (j && j.f && (O["table:formula"] = ve(pu(j.f)), j.F && j.F.slice(0, L.length) == L)) {
          var Q = sr(j.F);
          O["table:number-matrix-columns-spanned"] = Q.e.c - Q.s.c + 1, O["table:number-matrix-rows-spanned"] = Q.e.r - Q.s.r + 1;
        }
        if (!j) {
          o.push(t);
          continue;
        }
        switch (j.t) {
          case "b":
            F = j.v ? "TRUE" : "FALSE", O["office:value-type"] = "boolean", O["office:boolean-value"] = j.v ? "true" : "false";
            break;
          case "n":
            F = j.w || String(j.v || 0), O["office:value-type"] = "float", O["office:value"] = j.v || 0;
            break;
          case "s":
          case "str":
            F = j.v == null ? "" : j.v, O["office:value-type"] = "string";
            break;
          case "d":
            F = j.w || qe(j.v).toISOString(), O["office:value-type"] = "date", O["office:date-value"] = qe(j.v).toISOString(), O["table:style-name"] = "ce1";
            break;
          default:
            o.push(t);
            continue;
        }
        var D = e(F);
        if (j.l && j.l.Target) {
          var U = j.l.Target;
          U = U.charAt(0) == "#" ? "#" + vu(U.slice(1)) : U, U.charAt(0) != "#" && !U.match(/^\w+:/) && (U = "../" + U), D = Y("text:a", D, { "xlink:href": U.replace(/&/g, "&amp;") });
        }
        o.push("          " + Y("table:table-cell", Y("text:p", D, {}), O) + `
`);
      }
      o.push(`        </table:table-row>
`);
    }
    return o.push(`      </table:table>
`), o.join("");
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
      if (l && l["!cols"]) {
        for (var c = 0; c < l["!cols"].length; ++c)
          if (l["!cols"][c]) {
            var u = l["!cols"][c];
            if (u.width == null && u.wpx == null && u.wch == null)
              continue;
            c0(u), u.ods = f;
            var h = l["!cols"][c].wpx + "px";
            i.push('  <style:style style:name="co' + f + `" style:family="table-column">
`), i.push('   <style:table-column-properties fo:break-before="auto" style:column-width="' + h + `"/>
`), i.push(`  </style:style>
`), ++f;
          }
      }
    });
    var o = 0;
    s.SheetNames.map(function(l) {
      return s.Sheets[l];
    }).forEach(function(l) {
      if (l && l["!rows"]) {
        for (var c = 0; c < l["!rows"].length; ++c)
          if (l["!rows"][c]) {
            l["!rows"][c].ods = o;
            var u = l["!rows"][c].hpx + "px";
            i.push('  <style:style style:name="ro' + o + `" style:family="table-row">
`), i.push('   <style:table-row-properties fo:break-before="auto" style:row-height="' + u + `"/>
`), i.push(`  </style:style>
`), ++o;
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
    var o = [Ie], l = Lt({
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
    }), c = Lt({
      "xmlns:config": "urn:oasis:names:tc:opendocument:xmlns:config:1.0",
      "office:mimetype": "application/vnd.oasis.opendocument.spreadsheet"
    });
    f.bookType == "fods" ? (o.push("<office:document" + l + c + `>
`), o.push(Si().replace(/office:document-meta/g, "office:meta"))) : o.push("<office:document-content" + l + `>
`), a(o, s), o.push(`  <office:body>
`), o.push(`    <office:spreadsheet>
`);
    for (var u = 0; u != s.SheetNames.length; ++u)
      o.push(n(s.Sheets[s.SheetNames[u]], s, u));
    return o.push(`    </office:spreadsheet>
`), o.push(`  </office:body>
`), f.bookType == "fods" ? o.push("</office:document>") : o.push("</office:document-content>"), o.join("");
  };
}();
function os(e, t) {
  if (t.bookType == "fods")
    return wa(e, t);
  var r = Qn(), n = "", a = [], i = [];
  return n = "mimetype", oe(r, n, "application/vnd.oasis.opendocument.spreadsheet"), n = "content.xml", oe(r, n, wa(e, t)), a.push([n, "text/xml"]), i.push([n, "ContentFile"]), n = "styles.xml", oe(r, n, Yx(e, t)), a.push([n, "text/xml"]), i.push([n, "StylesFile"]), n = "meta.xml", oe(r, n, Ie + Si(
    /*::wb, opts*/
  )), a.push([n, "text/xml"]), i.push([n, "MetadataFile"]), n = "manifest.rdf", oe(r, n, so(
    i
    /*, opts*/
  )), a.push([n, "application/rdf+xml"]), n = "META-INF/manifest.xml", oe(r, n, ao(
    a
    /*, opts*/
  )), r;
}
/*! sheetjs (C) 2013-present SheetJS -- http://sheetjs.com */
function pn(e) {
  return new DataView(e.buffer, e.byteOffset, e.byteLength);
}
function Jx(e) {
  return typeof TextEncoder < "u" ? new TextEncoder().encode(e) : pr(Fr(e));
}
function qx(e, t) {
  e:
    for (var r = 0; r <= e.length - t.length; ++r) {
      for (var n = 0; n < t.length; ++n)
        if (e[r + n] != t[n])
          continue e;
      return !0;
    }
  return !1;
}
function Wr(e) {
  var t = e.reduce(function(a, i) {
    return a + i.length;
  }, 0), r = new Uint8Array(t), n = 0;
  return e.forEach(function(a) {
    r.set(a, n), n += a.length;
  }), r;
}
function Zx(e, t, r) {
  var n = Math.floor(r == 0 ? 0 : Math.LOG10E * Math.log(Math.abs(r))) + 6176 - 20, a = r / Math.pow(10, n - 6176);
  e[t + 15] |= n >> 7, e[t + 14] |= (n & 127) << 1;
  for (var i = 0; a >= 1; ++i, a /= 256)
    e[t + i] = a & 255;
  e[t + 15] |= r >= 0 ? 0 : 128;
}
function Mt(e, t) {
  var r = t ? t[0] : 0, n = e[r] & 127;
  e:
    if (e[r++] >= 128 && (n |= (e[r] & 127) << 7, e[r++] < 128 || (n |= (e[r] & 127) << 14, e[r++] < 128) || (n |= (e[r] & 127) << 21, e[r++] < 128) || (n += (e[r] & 127) * Math.pow(2, 28), ++r, e[r++] < 128) || (n += (e[r] & 127) * Math.pow(2, 35), ++r, e[r++] < 128) || (n += (e[r] & 127) * Math.pow(2, 42), ++r, e[r++] < 128)))
      break e;
  return t && (t[0] = r), n;
}
function de(e) {
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
function ut(e) {
  var t = 0, r = e[t] & 127;
  e:
    if (e[t++] >= 128) {
      if (r |= (e[t] & 127) << 7, e[t++] < 128 || (r |= (e[t] & 127) << 14, e[t++] < 128) || (r |= (e[t] & 127) << 21, e[t++] < 128))
        break e;
      r |= (e[t] & 127) << 28;
    }
  return r;
}
function ke(e) {
  for (var t = [], r = [0]; r[0] < e.length; ) {
    var n = r[0], a = Mt(e, r), i = a & 7;
    a = Math.floor(a / 8);
    var s = 0, f;
    if (a == 0)
      break;
    switch (i) {
      case 0:
        {
          for (var o = r[0]; e[r[0]++] >= 128; )
            ;
          f = e.slice(o, r[0]);
        }
        break;
      case 5:
        s = 4, f = e.slice(r[0], r[0] + s), r[0] += s;
        break;
      case 1:
        s = 8, f = e.slice(r[0], r[0] + s), r[0] += s;
        break;
      case 2:
        s = Mt(e, r), f = e.slice(r[0], r[0] + s), r[0] += s;
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
function Ue(e) {
  var t = [];
  return e.forEach(function(r, n) {
    r.forEach(function(a) {
      a.data && (t.push(de(n * 8 + a.type)), a.type == 2 && t.push(de(a.data.length)), t.push(a.data));
    });
  }), Wr(t);
}
function xr(e) {
  for (var t, r = [], n = [0]; n[0] < e.length; ) {
    var a = Mt(e, n), i = ke(e.slice(n[0], n[0] + a));
    n[0] += a;
    var s = {
      id: ut(i[1][0].data),
      messages: []
    };
    i[2].forEach(function(f) {
      var o = ke(f.data), l = ut(o[3][0].data);
      s.messages.push({
        meta: o,
        data: e.slice(n[0], n[0] + l)
      }), n[0] += l;
    }), (t = i[3]) != null && t[0] && (s.merge = ut(i[3][0].data) >>> 0 > 0), r.push(s);
  }
  return r;
}
function it(e) {
  var t = [];
  return e.forEach(function(r) {
    var n = [];
    n[1] = [{ data: de(r.id), type: 0 }], n[2] = [], r.merge != null && (n[3] = [{ data: de(+!!r.merge), type: 0 }]);
    var a = [];
    r.messages.forEach(function(s) {
      a.push(s.data), s.meta[3] = [{ type: 0, data: de(s.data.length) }], n[2].push({ data: Ue(s.meta), type: 2 });
    });
    var i = Ue(n);
    t.push(de(i.length)), t.push(i), a.forEach(function(s) {
      return t.push(s);
    });
  }), Wr(t);
}
function Qx(e, t) {
  if (e != 0)
    throw new Error("Unexpected Snappy chunk type ".concat(e));
  for (var r = [0], n = Mt(t, r), a = []; r[0] < t.length; ) {
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
      var o = 0, l = 0;
      if (i == 1 ? (l = (t[r[0]] >> 2 & 7) + 4, o = (t[r[0]++] & 224) << 3, o |= t[r[0]++]) : (l = (t[r[0]++] >> 2) + 1, i == 2 ? (o = t[r[0]] | t[r[0] + 1] << 8, r[0] += 2) : (o = (t[r[0]] | t[r[0] + 1] << 8 | t[r[0] + 2] << 16 | t[r[0] + 3] << 24) >>> 0, r[0] += 4)), a = [Wr(a)], o == 0)
        throw new Error("Invalid offset 0");
      if (o > a[0].length)
        throw new Error("Invalid offset beyond length");
      if (l >= o)
        for (a.push(a[0].slice(-o)), l -= o; l >= a[a.length - 1].length; )
          a.push(a[a.length - 1]), l -= a[a.length - 1].length;
      a.push(a[0].slice(-o, -o + l));
    }
  }
  var c = Wr(a);
  if (c.length != n)
    throw new Error("Unexpected length: ".concat(c.length, " != ").concat(n));
  return c;
}
function dr(e) {
  for (var t = [], r = 0; r < e.length; ) {
    var n = e[r++], a = e[r] | e[r + 1] << 8 | e[r + 2] << 16;
    r += 3, t.push(Qx(n, e.slice(r, r + a))), r += a;
  }
  if (r !== e.length)
    throw new Error("data is not a valid framed stream!");
  return Wr(t);
}
function st(e) {
  for (var t = [], r = 0; r < e.length; ) {
    var n = Math.min(e.length - r, 268435455), a = new Uint8Array(4);
    t.push(a);
    var i = de(n), s = i.length;
    t.push(i), n <= 60 ? (s++, t.push(new Uint8Array([n - 1 << 2]))) : n <= 256 ? (s += 2, t.push(new Uint8Array([240, n - 1 & 255]))) : n <= 65536 ? (s += 3, t.push(new Uint8Array([244, n - 1 & 255, n - 1 >> 8 & 255]))) : n <= 16777216 ? (s += 4, t.push(new Uint8Array([248, n - 1 & 255, n - 1 >> 8 & 255, n - 1 >> 16 & 255]))) : n <= 4294967296 && (s += 5, t.push(new Uint8Array([252, n - 1 & 255, n - 1 >> 8 & 255, n - 1 >> 16 & 255, n - 1 >>> 24 & 255]))), t.push(e.slice(r, r + n)), s += n, a[0] = 0, a[1] = s & 255, a[2] = s >> 8 & 255, a[3] = s >> 16 & 255, r += n;
  }
  return Wr(t);
}
function Un(e, t) {
  var r = new Uint8Array(32), n = pn(r), a = 12, i = 0;
  switch (r[0] = 5, e.t) {
    case "n":
      r[1] = 2, Zx(r, a, e.v), i |= 1, a += 16;
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
function Wn(e, t) {
  var r = new Uint8Array(32), n = pn(r), a = 12, i = 0;
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
function kr(e) {
  var t = ke(e);
  return Mt(t[1][0].data);
}
function e2(e, t, r) {
  var n, a, i, s;
  if (!((n = e[6]) != null && n[0]) || !((a = e[7]) != null && a[0]))
    throw "Mutation only works on post-BNC storages!";
  var f = ((s = (i = e[8]) == null ? void 0 : i[0]) == null ? void 0 : s.data) && ut(e[8][0].data) > 0 || !1;
  if (f)
    throw "Math only works with normal offsets";
  for (var o = 0, l = pn(e[7][0].data), c = 0, u = [], h = pn(e[4][0].data), p = 0, _ = [], x = 0; x < t.length; ++x) {
    if (t[x] == null) {
      l.setUint16(x * 2, 65535, !0), h.setUint16(x * 2, 65535);
      continue;
    }
    l.setUint16(x * 2, c, !0), h.setUint16(x * 2, p, !0);
    var g, C;
    switch (typeof t[x]) {
      case "string":
        g = Un({ t: "s", v: t[x] }, r), C = Wn({ t: "s", v: t[x] }, r);
        break;
      case "number":
        g = Un({ t: "n", v: t[x] }, r), C = Wn({ t: "n", v: t[x] }, r);
        break;
      case "boolean":
        g = Un({ t: "b", v: t[x] }, r), C = Wn({ t: "b", v: t[x] }, r);
        break;
      default:
        throw new Error("Unsupported value " + t[x]);
    }
    u.push(g), c += g.length, _.push(C), p += C.length, ++o;
  }
  for (e[2][0].data = de(o); x < e[7][0].data.length / 2; ++x)
    l.setUint16(x * 2, 65535, !0), h.setUint16(x * 2, 65535, !0);
  return e[6][0].data = Wr(u), e[3][0].data = Wr(_), o;
}
function r2(e, t) {
  if (!t || !t.numbers)
    throw new Error("Must pass a `numbers` option -- check the README");
  var r = e.Sheets[e.SheetNames[0]];
  e.SheetNames.length > 1 && console.error("The Numbers writer currently writes only the first table");
  var n = sr(r["!ref"]);
  n.s.r = n.s.c = 0;
  var a = !1;
  n.e.c > 9 && (a = !0, n.e.c = 9), n.e.r > 49 && (a = !0, n.e.r = 49), a && console.error("The Numbers writer is currently limited to ".concat(Ne(n)));
  var i = vn(r, { range: n, header: 1 }), s = ["~Sh33tJ5~"];
  i.forEach(function(P) {
    return P.forEach(function(y) {
      typeof y == "string" && s.push(y);
    });
  });
  var f = {}, o = [], l = _e.read(t.numbers, { type: "base64" });
  l.FileIndex.map(function(P, y) {
    return [P, l.FullPaths[y]];
  }).forEach(function(P) {
    var y = P[0], A = P[1];
    if (y.type == 2 && y.name.match(/\.iwa/)) {
      var H = y.content, ie = dr(H), se = xr(ie);
      se.forEach(function(ae) {
        o.push(ae.id), f[ae.id] = { deps: [], location: A, type: ut(ae.messages[0].meta[1][0].data) };
      });
    }
  }), o.sort(function(P, y) {
    return P - y;
  });
  var c = o.filter(function(P) {
    return P > 1;
  }).map(function(P) {
    return [P, de(P)];
  });
  l.FileIndex.map(function(P, y) {
    return [P, l.FullPaths[y]];
  }).forEach(function(P) {
    var y = P[0];
    if (P[1], !!y.name.match(/\.iwa/)) {
      var A = xr(dr(y.content));
      A.forEach(function(H) {
        H.messages.forEach(function(ie) {
          c.forEach(function(se) {
            H.messages.some(function(ae) {
              return ut(ae.meta[1][0].data) != 11006 && qx(ae.data, se[1]);
            }) && f[se[0]].deps.push(H.id);
          });
        });
      });
    }
  });
  for (var u = _e.find(l, f[1].location), h = xr(dr(u.content)), p, _ = 0; _ < h.length; ++_) {
    var x = h[_];
    x.id == 1 && (p = x);
  }
  var g = kr(ke(p.messages[0].data)[1][0].data);
  for (u = _e.find(l, f[g].location), h = xr(dr(u.content)), _ = 0; _ < h.length; ++_)
    x = h[_], x.id == g && (p = x);
  for (g = kr(ke(p.messages[0].data)[2][0].data), u = _e.find(l, f[g].location), h = xr(dr(u.content)), _ = 0; _ < h.length; ++_)
    x = h[_], x.id == g && (p = x);
  for (g = kr(ke(p.messages[0].data)[2][0].data), u = _e.find(l, f[g].location), h = xr(dr(u.content)), _ = 0; _ < h.length; ++_)
    x = h[_], x.id == g && (p = x);
  var C = ke(p.messages[0].data);
  {
    C[6][0].data = de(n.e.r + 1), C[7][0].data = de(n.e.c + 1);
    var O = kr(C[46][0].data), F = _e.find(l, f[O].location), L = xr(dr(F.content));
    {
      for (var j = 0; j < L.length && L[j].id != O; ++j)
        ;
      if (L[j].id != O)
        throw "Bad ColumnRowUIDMapArchive";
      var Q = ke(L[j].messages[0].data);
      Q[1] = [], Q[2] = [], Q[3] = [];
      for (var D = 0; D <= n.e.c; ++D) {
        var U = [];
        U[1] = U[2] = [{ type: 0, data: de(D + 420690) }], Q[1].push({ type: 2, data: Ue(U) }), Q[2].push({ type: 0, data: de(D) }), Q[3].push({ type: 0, data: de(D) });
      }
      Q[4] = [], Q[5] = [], Q[6] = [];
      for (var M = 0; M <= n.e.r; ++M)
        U = [], U[1] = U[2] = [{ type: 0, data: de(M + 726270) }], Q[4].push({ type: 2, data: Ue(U) }), Q[5].push({ type: 0, data: de(M) }), Q[6].push({ type: 0, data: de(M) });
      L[j].messages[0].data = Ue(Q);
    }
    F.content = st(it(L)), F.size = F.content.length, delete C[46];
    var V = ke(C[4][0].data);
    {
      V[7][0].data = de(n.e.r + 1);
      var G = ke(V[1][0].data), z = kr(G[2][0].data);
      F = _e.find(l, f[z].location), L = xr(dr(F.content));
      {
        if (L[0].id != z)
          throw "Bad HeaderStorageBucket";
        var re = ke(L[0].messages[0].data);
        for (M = 0; M < i.length; ++M) {
          var ge = ke(re[2][0].data);
          ge[1][0].data = de(M), ge[4][0].data = de(i[M].length), re[2][M] = { type: re[2][0].type, data: Ue(ge) };
        }
        L[0].messages[0].data = Ue(re);
      }
      F.content = st(it(L)), F.size = F.content.length;
      var le = kr(V[2][0].data);
      F = _e.find(l, f[le].location), L = xr(dr(F.content));
      {
        if (L[0].id != le)
          throw "Bad HeaderStorageBucket";
        for (re = ke(L[0].messages[0].data), D = 0; D <= n.e.c; ++D)
          ge = ke(re[2][0].data), ge[1][0].data = de(D), ge[4][0].data = de(n.e.r + 1), re[2][D] = { type: re[2][0].type, data: Ue(ge) };
        L[0].messages[0].data = Ue(re);
      }
      F.content = st(it(L)), F.size = F.content.length;
      var be = kr(V[4][0].data);
      (function() {
        for (var P = _e.find(l, f[be].location), y = xr(dr(P.content)), A, H = 0; H < y.length; ++H) {
          var ie = y[H];
          ie.id == be && (A = ie);
        }
        var se = ke(A.messages[0].data);
        {
          se[3] = [];
          var ae = [];
          s.forEach(function(ce, Ke) {
            ae[1] = [{ type: 0, data: de(Ke) }], ae[2] = [{ type: 0, data: de(1) }], ae[3] = [{ type: 2, data: Jx(ce) }], se[3].push({ type: 2, data: Ue(ae) });
          });
        }
        A.messages[0].data = Ue(se);
        var Z = it(y), Te = st(Z);
        P.content = Te, P.size = P.content.length;
      })();
      var Oe = ke(V[3][0].data);
      {
        var ur = Oe[1][0];
        delete Oe[2];
        var Pe = ke(ur.data);
        {
          var fr = kr(Pe[2][0].data);
          (function() {
            for (var P = _e.find(l, f[fr].location), y = xr(dr(P.content)), A, H = 0; H < y.length; ++H) {
              var ie = y[H];
              ie.id == fr && (A = ie);
            }
            var se = ke(A.messages[0].data);
            {
              delete se[6], delete Oe[7];
              var ae = new Uint8Array(se[5][0].data);
              se[5] = [];
              for (var Z = 0, Te = 0; Te <= n.e.r; ++Te) {
                var ce = ke(ae);
                Z += e2(ce, i[Te], s), ce[1][0].data = de(Te), se[5].push({ data: Ue(ce), type: 2 });
              }
              se[1] = [{ type: 0, data: de(n.e.c + 1) }], se[2] = [{ type: 0, data: de(n.e.r + 1) }], se[3] = [{ type: 0, data: de(Z) }], se[4] = [{ type: 0, data: de(n.e.r + 1) }];
            }
            A.messages[0].data = Ue(se);
            var Ke = it(y), xe = st(Ke);
            P.content = xe, P.size = P.content.length;
          })();
        }
        ur.data = Ue(Pe);
      }
      V[3][0].data = Ue(Oe);
    }
    C[4][0].data = Ue(V);
  }
  p.messages[0].data = Ue(C);
  var rr = it(h), S = st(rr);
  return u.content = S, u.size = u.content.length, l;
}
function t2(e) {
  return function(r) {
    for (var n = 0; n != e.length; ++n) {
      var a = e[n];
      r[a[0]] === void 0 && (r[a[0]] = a[1]), a[2] === "n" && (r[a[0]] = Number(r[a[0]]));
    }
  };
}
function p0(e) {
  t2([
    ["cellDates", !1],
    /* write date cells with type `d` */
    ["bookSST", !1],
    /* Generate Shared String Table */
    ["bookType", "xlsx"],
    /* Type of workbook (xlsx/m/b) */
    ["compression", !1],
    /* Use file compression */
    ["WTF", !1]
    /* WTF mode (throws errors) */
  ])(e);
}
function n2(e, t) {
  return t.bookType == "ods" ? os(e, t) : t.bookType == "numbers" ? r2(e, t) : t.bookType == "xlsb" ? a2(e, t) : i2(e, t);
}
function a2(e, t) {
  lt = 1024, e && !e.SSF && (e.SSF = er(Ce)), e && e.SSF && (Tn(), _n(e.SSF), t.revssf = En(e.SSF), t.revssf[e.SSF[65535]] = 0, t.ssf = e.SSF), t.rels = {}, t.wbrels = {}, t.Strings = /*::((*/
  [], t.Strings.Count = 0, t.Strings.Unique = 0, Nt ? t.revStrings = /* @__PURE__ */ new Map() : (t.revStrings = {}, t.revStrings.foo = [], delete t.revStrings.foo);
  var r = t.bookType == "xlsb" ? "bin" : "xml", n = ji.indexOf(t.bookType) > -1, a = Ti();
  p0(t = t || {});
  var i = Qn(), s = "", f = 0;
  if (t.cellXfs = [], Hr(t.cellXfs, {}, { revssf: { General: 0 } }), e.Props || (e.Props = {}), s = "docProps/core.xml", oe(i, s, Ai(e.Props, t)), a.coreprops.push(s), pe(t.rels, 2, s, he.CORE_PROPS), s = "docProps/app.xml", !(e.Props && e.Props.SheetNames))
    if (!e.Workbook || !e.Workbook.Sheets)
      e.Props.SheetNames = e.SheetNames;
    else {
      for (var o = [], l = 0; l < e.SheetNames.length; ++l)
        (e.Workbook.Sheets[l] || {}).Hidden != 2 && o.push(e.SheetNames[l]);
      e.Props.SheetNames = o;
    }
  for (e.Props.Worksheets = e.Props.SheetNames.length, oe(i, s, yi(e.Props)), a.extprops.push(s), pe(t.rels, 3, s, he.EXT_PROPS), e.Custprops !== e.Props && Xe(e.Custprops || {}).length > 0 && (s = "docProps/custom.xml", oe(i, s, Ci(e.Custprops)), a.custprops.push(s), pe(t.rels, 4, s, he.CUST_PROPS)), f = 1; f <= e.SheetNames.length; ++f) {
    var c = { "!id": {} }, u = e.Sheets[e.SheetNames[f - 1]], h = (u || {})["!type"] || "sheet";
    switch (h) {
      case "chart":
      default:
        s = "xl/worksheets/sheet" + f + "." + r, oe(i, s, fx(f - 1, s, t, e, c)), a.sheets.push(s), pe(t.wbrels, -1, "worksheets/sheet" + f + "." + r, he.WS[0]);
    }
    if (u) {
      var p = u["!comments"], _ = !1, x = "";
      p && p.length > 0 && (x = "xl/comments" + f + "." + r, oe(i, x, cx(p, x)), a.comments.push(x), pe(c, -1, "../comments" + f + "." + r, he.CMNT), _ = !0), u["!legacy"] && _ && oe(i, "xl/drawings/vmlDrawing" + f + ".vml", Gi(f, u["!comments"])), delete u["!comments"], delete u["!legacy"];
    }
    c["!id"].rId1 && oe(i, wi(s), ct(c));
  }
  return t.Strings != null && t.Strings.length > 0 && (s = "xl/sharedStrings." + r, oe(i, s, ox(t.Strings, s, t)), a.strs.push(s), pe(t.wbrels, -1, "sharedStrings." + r, he.SST)), s = "xl/workbook." + r, oe(i, s, sx(e, s)), a.workbooks.push(s), pe(t.rels, 1, s, he.WB), s = "xl/theme/theme1.xml", oe(i, s, Hi(e.Themes, t)), a.themes.push(s), pe(t.wbrels, -1, "theme/theme1.xml", he.THEME), s = "xl/styles." + r, oe(i, s, lx(e, s, t)), a.styles.push(s), pe(t.wbrels, -1, "styles." + r, he.STY), e.vbaraw && n && (s = "xl/vbaProject.bin", oe(i, s, e.vbaraw), a.vba.push(s), pe(t.wbrels, -1, "vbaProject.bin", he.VBA)), s = "xl/metadata." + r, oe(i, s, hx(s)), a.metadata.push(s), pe(t.wbrels, -1, "metadata." + r, he.XLMETA), oe(i, "[Content_Types].xml", Ei(a, t)), oe(i, "_rels/.rels", ct(t.rels)), oe(i, "xl/_rels/workbook." + r + ".rels", ct(t.wbrels)), delete t.revssf, delete t.ssf, i;
}
function i2(e, t) {
  lt = 1024, e && !e.SSF && (e.SSF = er(Ce)), e && e.SSF && (Tn(), _n(e.SSF), t.revssf = En(e.SSF), t.revssf[e.SSF[65535]] = 0, t.ssf = e.SSF), t.rels = {}, t.wbrels = {}, t.Strings = /*::((*/
  [], t.Strings.Count = 0, t.Strings.Unique = 0, Nt ? t.revStrings = /* @__PURE__ */ new Map() : (t.revStrings = {}, t.revStrings.foo = [], delete t.revStrings.foo);
  var r = "xml", n = ji.indexOf(t.bookType) > -1, a = Ti();
  p0(t = t || {});
  var i = Qn(), s = "", f = 0;
  if (t.cellXfs = [], Hr(t.cellXfs, {}, { revssf: { General: 0 } }), e.Props || (e.Props = {}), s = "docProps/core.xml", oe(i, s, Ai(e.Props, t)), a.coreprops.push(s), pe(t.rels, 2, s, he.CORE_PROPS), s = "docProps/app.xml", !(e.Props && e.Props.SheetNames))
    if (!e.Workbook || !e.Workbook.Sheets)
      e.Props.SheetNames = e.SheetNames;
    else {
      for (var o = [], l = 0; l < e.SheetNames.length; ++l)
        (e.Workbook.Sheets[l] || {}).Hidden != 2 && o.push(e.SheetNames[l]);
      e.Props.SheetNames = o;
    }
  e.Props.Worksheets = e.Props.SheetNames.length, oe(i, s, yi(e.Props)), a.extprops.push(s), pe(t.rels, 3, s, he.EXT_PROPS), e.Custprops !== e.Props && Xe(e.Custprops || {}).length > 0 && (s = "docProps/custom.xml", oe(i, s, Ci(e.Custprops)), a.custprops.push(s), pe(t.rels, 4, s, he.CUST_PROPS));
  var c = ["SheetJ5"];
  for (t.tcid = 0, f = 1; f <= e.SheetNames.length; ++f) {
    var u = { "!id": {} }, h = e.Sheets[e.SheetNames[f - 1]], p = (h || {})["!type"] || "sheet";
    switch (p) {
      case "chart":
      default:
        s = "xl/worksheets/sheet" + f + "." + r, oe(i, s, es(f - 1, t, e, u)), a.sheets.push(s), pe(t.wbrels, -1, "worksheets/sheet" + f + "." + r, he.WS[0]);
    }
    if (h) {
      var _ = h["!comments"], x = !1, g = "";
      if (_ && _.length > 0) {
        var C = !1;
        _.forEach(function(O) {
          O[1].forEach(function(F) {
            F.T == !0 && (C = !0);
          });
        }), C && (g = "xl/threadedComments/threadedComment" + f + "." + r, oe(i, g, Mc(_, c, t)), a.threadedcomments.push(g), pe(u, -1, "../threadedComments/threadedComment" + f + "." + r, he.TCMNT)), g = "xl/comments" + f + "." + r, oe(i, g, Xi(_)), a.comments.push(g), pe(u, -1, "../comments" + f + "." + r, he.CMNT), x = !0;
      }
      h["!legacy"] && x && oe(i, "xl/drawings/vmlDrawing" + f + ".vml", Gi(f, h["!comments"])), delete h["!comments"], delete h["!legacy"];
    }
    u["!id"].rId1 && oe(i, wi(s), ct(u));
  }
  return t.Strings != null && t.Strings.length > 0 && (s = "xl/sharedStrings." + r, oe(i, s, Li(t.Strings, t)), a.strs.push(s), pe(t.wbrels, -1, "sharedStrings." + r, he.SST)), s = "xl/workbook." + r, oe(i, s, ns(e)), a.workbooks.push(s), pe(t.rels, 1, s, he.WB), s = "xl/theme/theme1.xml", oe(i, s, Hi(e.Themes, t)), a.themes.push(s), pe(t.wbrels, -1, "theme/theme1.xml", he.THEME), s = "xl/styles." + r, oe(i, s, Ui(e, t)), a.styles.push(s), pe(t.wbrels, -1, "styles." + r, he.STY), e.vbaraw && n && (s = "xl/vbaProject.bin", oe(i, s, e.vbaraw), a.vba.push(s), pe(t.wbrels, -1, "vbaProject.bin", he.VBA)), s = "xl/metadata." + r, oe(i, s, Vi()), a.metadata.push(s), pe(t.wbrels, -1, "metadata." + r, he.XLMETA), c.length > 1 && (s = "xl/persons/person.xml", oe(i, s, Bc(c)), a.people.push(s), pe(t.wbrels, -1, "persons/person.xml", he.PEOPLE)), oe(i, "[Content_Types].xml", Ei(a, t)), oe(i, "_rels/.rels", ct(t.rels)), oe(i, "xl/_rels/workbook." + r + ".rels", ct(t.wbrels)), delete t.revssf, delete t.ssf, i;
}
function s2(e, t) {
  var r = "";
  switch ((t || {}).type || "base64") {
    case "buffer":
      return [e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7]];
    case "base64":
      r = Rr(e.slice(0, 12));
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
function cs(e, t) {
  switch (t.type) {
    case "base64":
    case "binary":
      break;
    case "buffer":
    case "array":
      t.type = "";
      break;
    case "file":
      return Ut(t.file, _e.write(e, { type: ue ? "buffer" : "" }));
    case "string":
      throw new Error("'string' output type invalid for '" + t.bookType + "' files");
    default:
      throw new Error("Unrecognized type " + t.type);
  }
  return _e.write(e, t);
}
function f2(e, t) {
  var r = er(t || {}), n = n2(e, r);
  return l2(n, r);
}
function l2(e, t) {
  var r = {}, n = ue ? "nodebuffer" : typeof Uint8Array < "u" ? "array" : "string";
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
  var a = e.FullPaths ? _e.write(e, { fileType: "zip", type: (
    /*::(*/
    { nodebuffer: "buffer", string: "binary" }[r.type] || r.type
  ), compression: !!t.compression }) : e.generate(r);
  if (typeof Deno < "u" && typeof a == "string") {
    if (t.type == "binary" || t.type == "base64")
      return a;
    a = new Uint8Array(gn(a));
  }
  return t.password && typeof encrypt_agile < "u" ? cs(encrypt_agile(a, t.password), t) : t.type === "file" ? Ut(t.file, a) : t.type == "string" ? Ct(
    /*::(*/
    a
    /*:: :any)*/
  ) : a;
}
function o2(e, t) {
  var r = t || {}, n = Fx(e, r);
  return cs(n, r);
}
function Tr(e, t, r) {
  r || (r = "");
  var n = r + e;
  switch (t.type) {
    case "base64":
      return kt(Fr(n));
    case "binary":
      return Fr(n);
    case "string":
      return e;
    case "file":
      return Ut(t.file, n, "utf8");
    case "buffer":
      return ue ? Ir(n, "utf8") : typeof TextEncoder < "u" ? new TextEncoder().encode(n) : Tr(n, { type: "binary" }).split("").map(function(a) {
        return a.charCodeAt(0);
      });
  }
  throw new Error("Unrecognized type " + t.type);
}
function c2(e, t) {
  switch (t.type) {
    case "base64":
      return kt(e);
    case "binary":
      return e;
    case "string":
      return e;
    case "file":
      return Ut(t.file, e, "binary");
    case "buffer":
      return ue ? Ir(e, "binary") : e.split("").map(function(r) {
        return r.charCodeAt(0);
      });
  }
  throw new Error("Unrecognized type " + t.type);
}
function Qt(e, t) {
  switch (t.type) {
    case "string":
    case "base64":
    case "binary":
      for (var r = "", n = 0; n < e.length; ++n)
        r += String.fromCharCode(e[n]);
      return t.type == "base64" ? kt(r) : t.type == "string" ? Ct(r) : r;
    case "file":
      return Ut(t.file, e);
    case "buffer":
      return e;
    default:
      throw new Error("Unrecognized type " + t.type);
  }
}
function hs(e, t) {
  Mf(), Y1(e);
  var r = er(t || {});
  if (r.cellStyles && (r.cellNF = !0, r.sheetStubs = !0), r.type == "array") {
    r.type = "binary";
    var n = hs(e, r);
    return r.type = "array", gn(n);
  }
  var a = 0;
  if (r.sheet && (typeof r.sheet == "number" ? a = r.sheet : a = e.SheetNames.indexOf(r.sheet), !e.SheetNames[a]))
    throw new Error("Sheet not found: " + r.sheet + " : " + typeof r.sheet);
  switch (r.bookType || "xlsb") {
    case "xml":
    case "xlml":
      return Tr(Sx(e, r), r);
    case "slk":
    case "sylk":
      return Tr($o.from_sheet(e.Sheets[e.SheetNames[a]], r), r);
    case "htm":
    case "html":
      return Tr(ss(e.Sheets[e.SheetNames[a]], r), r);
    case "txt":
      return c2(us(e.Sheets[e.SheetNames[a]], r), r);
    case "csv":
      return Tr(v0(e.Sheets[e.SheetNames[a]], r), r, "\uFEFF");
    case "dif":
      return Tr(zo.from_sheet(e.Sheets[e.SheetNames[a]], r), r);
    case "dbf":
      return Qt(jo.from_sheet(e.Sheets[e.SheetNames[a]], r), r);
    case "prn":
      return Tr(Ko.from_sheet(e.Sheets[e.SheetNames[a]], r), r);
    case "rtf":
      return Tr(rc.from_sheet(e.Sheets[e.SheetNames[a]], r), r);
    case "eth":
      return Tr(Pi.from_sheet(e.Sheets[e.SheetNames[a]], r), r);
    case "fods":
      return Tr(os(e, r), r);
    case "wk1":
      return Qt(pa.sheet_to_wk1(e.Sheets[e.SheetNames[a]], r), r);
    case "wk3":
      return Qt(pa.book_to_wk3(e, r), r);
    case "biff2":
      r.biff || (r.biff = 2);
    case "biff3":
      r.biff || (r.biff = 3);
    case "biff4":
      return r.biff || (r.biff = 4), Qt(is(e, r), r);
    case "biff5":
      r.biff || (r.biff = 5);
    case "biff8":
    case "xla":
    case "xls":
      return r.biff || (r.biff = 8), o2(e, r);
    case "xlsx":
    case "xlsm":
    case "xlam":
    case "xlsb":
    case "numbers":
    case "ods":
      return f2(e, r);
    default:
      throw new Error("Unrecognized bookType |" + r.bookType + "|");
  }
}
function h2(e, t, r, n, a, i, s, f) {
  var o = Ge(r), l = f.defval, c = f.raw || !Object.prototype.hasOwnProperty.call(f, "raw"), u = !0, h = a === 1 ? [] : {};
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
    for (var p = t.s.c; p <= t.e.c; ++p) {
      var _ = s ? e[r][p] : e[n[p] + o];
      if (_ === void 0 || _.t === void 0) {
        if (l === void 0)
          continue;
        i[p] != null && (h[i[p]] = l);
        continue;
      }
      var x = _.v;
      switch (_.t) {
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
          throw new Error("unrecognized type " + _.t);
      }
      if (i[p] != null) {
        if (x == null)
          if (_.t == "e" && x === null)
            h[i[p]] = null;
          else if (l !== void 0)
            h[i[p]] = l;
          else if (c && x === null)
            h[i[p]] = null;
          else
            continue;
        else
          h[i[p]] = c && (_.t !== "n" || _.t === "n" && f.rawNumbers !== !1) ? x : Nr(_, x, f);
        x != null && (u = !1);
      }
    }
  return { row: h, isempty: u };
}
function vn(e, t) {
  if (e == null || e["!ref"] == null)
    return [];
  var r = { t: "n", v: 0 }, n = 0, a = 1, i = [], s = 0, f = "", o = { s: { r: 0, c: 0 }, e: { r: 0, c: 0 } }, l = t || {}, c = l.range != null ? l.range : e["!ref"];
  switch (l.header === 1 ? n = 1 : l.header === "A" ? n = 2 : Array.isArray(l.header) ? n = 3 : l.header == null && (n = 0), typeof c) {
    case "string":
      o = Ee(c);
      break;
    case "number":
      o = Ee(e["!ref"]), o.s.r = c;
      break;
    default:
      o = c;
  }
  n > 0 && (a = 0);
  var u = Ge(o.s.r), h = [], p = [], _ = 0, x = 0, g = Array.isArray(e), C = o.s.r, O = 0, F = {};
  g && !e[C] && (e[C] = []);
  var L = l.skipHidden && e["!cols"] || [], j = l.skipHidden && e["!rows"] || [];
  for (O = o.s.c; O <= o.e.c; ++O)
    if (!(L[O] || {}).hidden)
      switch (h[O] = $e(O), r = g ? e[C][O] : e[h[O] + u], n) {
        case 1:
          i[O] = O - o.s.c;
          break;
        case 2:
          i[O] = h[O];
          break;
        case 3:
          i[O] = l.header[O - o.s.c];
          break;
        default:
          if (r == null && (r = { w: "__EMPTY", t: "s" }), f = s = Nr(r, null, l), x = F[s] || 0, !x)
            F[s] = 1;
          else {
            do
              f = s + "_" + x++;
            while (F[f]);
            F[s] = x, F[f] = 1;
          }
          i[O] = f;
      }
  for (C = o.s.r + a; C <= o.e.r; ++C)
    if (!(j[C] || {}).hidden) {
      var Q = h2(e, o, C, h, n, i, g, l);
      (Q.isempty === !1 || (n === 1 ? l.blankrows !== !1 : l.blankrows)) && (p[_++] = Q.row);
    }
  return p.length = _, p;
}
var Sa = /"/g;
function u2(e, t, r, n, a, i, s, f) {
  for (var o = !0, l = [], c = "", u = Ge(r), h = t.s.c; h <= t.e.c; ++h)
    if (n[h]) {
      var p = f.dense ? (e[r] || [])[h] : e[n[h] + u];
      if (p == null)
        c = "";
      else if (p.v != null) {
        o = !1, c = "" + (f.rawNumbers && p.t == "n" ? p.v : Nr(p, null, f));
        for (var _ = 0, x = 0; _ !== c.length; ++_)
          if ((x = c.charCodeAt(_)) === a || x === i || x === 34 || f.forceQuotes) {
            c = '"' + c.replace(Sa, '""') + '"';
            break;
          }
        c == "ID" && (c = '"ID"');
      } else
        p.f != null && !p.F ? (o = !1, c = "=" + p.f, c.indexOf(",") >= 0 && (c = '"' + c.replace(Sa, '""') + '"')) : c = "";
      l.push(c);
    }
  return f.blankrows === !1 && o ? null : l.join(s);
}
function v0(e, t) {
  var r = [], n = t ?? {};
  if (e == null || e["!ref"] == null)
    return "";
  var a = Ee(e["!ref"]), i = n.FS !== void 0 ? n.FS : ",", s = i.charCodeAt(0), f = n.RS !== void 0 ? n.RS : `
`, o = f.charCodeAt(0), l = new RegExp((i == "|" ? "\\|" : i) + "+$"), c = "", u = [];
  n.dense = Array.isArray(e);
  for (var h = n.skipHidden && e["!cols"] || [], p = n.skipHidden && e["!rows"] || [], _ = a.s.c; _ <= a.e.c; ++_)
    (h[_] || {}).hidden || (u[_] = $e(_));
  for (var x = 0, g = a.s.r; g <= a.e.r; ++g)
    (p[g] || {}).hidden || (c = u2(e, a, g, u, s, o, i, n), c != null && (n.strip && (c = c.replace(l, "")), (c || n.blankrows !== !1) && r.push((x++ ? f : "") + c)));
  return delete n.dense, r.join("");
}
function us(e, t) {
  t || (t = {}), t.FS = "	", t.RS = `
`;
  var r = v0(e, t);
  return r;
}
function x2(e) {
  var t = "", r, n = "";
  if (e == null || e["!ref"] == null)
    return [];
  var a = Ee(e["!ref"]), i = "", s = [], f, o = [], l = Array.isArray(e);
  for (f = a.s.c; f <= a.e.c; ++f)
    s[f] = $e(f);
  for (var c = a.s.r; c <= a.e.r; ++c)
    for (i = Ge(c), f = a.s.c; f <= a.e.c; ++f)
      if (t = s[f] + i, r = l ? (e[c] || [])[f] : e[t], n = "", r !== void 0) {
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
        o[o.length] = t + "=" + n;
      }
  return o;
}
function xs(e, t, r) {
  var n = r || {}, a = +!n.skipHeader, i = e || {}, s = 0, f = 0;
  if (i && n.origin != null)
    if (typeof n.origin == "number")
      s = n.origin;
    else {
      var o = typeof n.origin == "string" ? Me(n.origin) : n.origin;
      s = o.r, f = o.c;
    }
  var l, c = { s: { c: 0, r: 0 }, e: { c: f, r: s + t.length - 1 + a } };
  if (i["!ref"]) {
    var u = Ee(i["!ref"]);
    c.e.c = Math.max(c.e.c, u.e.c), c.e.r = Math.max(c.e.r, u.e.r), s == -1 && (s = u.e.r + 1, c.e.r = s + t.length - 1 + a);
  } else
    s == -1 && (s = 0, c.e.r = t.length - 1 + a);
  var h = n.header || [], p = 0;
  t.forEach(function(x, g) {
    Xe(x).forEach(function(C) {
      (p = h.indexOf(C)) == -1 && (h[p = h.length] = C);
      var O = x[C], F = "z", L = "", j = me({ c: f + p, r: s + g + a });
      l = Bt(i, j), O && typeof O == "object" && !(O instanceof Date) ? i[j] = O : (typeof O == "number" ? F = "n" : typeof O == "boolean" ? F = "b" : typeof O == "string" ? F = "s" : O instanceof Date ? (F = "d", n.cellDates || (F = "n", O = Qe(O)), L = n.dateNF || Ce[14]) : O === null && n.nullError && (F = "e", O = 0), l ? (l.t = F, l.v = O, delete l.w, delete l.R, L && (l.z = L)) : i[j] = l = { t: F, v: O }, L && (l.z = L));
    });
  }), c.e.c = Math.max(c.e.c, f + h.length - 1);
  var _ = Ge(s);
  if (a)
    for (p = 0; p < h.length; ++p)
      i[$e(p + f) + _] = { t: "s", v: h[p] };
  return i["!ref"] = Ne(c), i;
}
function d2(e, t) {
  return xs(null, e, t);
}
function Bt(e, t, r) {
  if (typeof t == "string") {
    if (Array.isArray(e)) {
      var n = Me(t);
      return e[n.r] || (e[n.r] = []), e[n.r][n.c] || (e[n.r][n.c] = { t: "z" });
    }
    return e[t] || (e[t] = { t: "z" });
  }
  return typeof t != "number" ? Bt(e, me(t)) : Bt(e, me({ r: t, c: r || 0 }));
}
function p2(e, t) {
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
function v2() {
  return { SheetNames: [], Sheets: {} };
}
function m2(e, t, r, n) {
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
  if (ts(r), e.SheetNames.indexOf(r) >= 0)
    throw new Error("Worksheet with name |" + r + "| already exists!");
  return e.SheetNames.push(r), e.Sheets[r] = t, r;
}
function g2(e, t, r) {
  e.Workbook || (e.Workbook = {}), e.Workbook.Sheets || (e.Workbook.Sheets = []);
  var n = p2(e, t);
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
function _2(e, t) {
  return e.z = t, e;
}
function ds(e, t, r) {
  return t ? (e.l = { Target: t }, r && (e.l.Tooltip = r)) : delete e.l, e;
}
function T2(e, t, r) {
  return ds(e, "#" + t, r);
}
function E2(e, t, r) {
  e.c || (e.c = []), e.c.push({ t, a: r || "SheetJS" });
}
function w2(e, t, r, n) {
  for (var a = typeof t != "string" ? t : Ee(t), i = typeof t == "string" ? t : Ne(t), s = a.s.r; s <= a.e.r; ++s)
    for (var f = a.s.c; f <= a.e.c; ++f) {
      var o = Bt(e, s, f);
      o.t = "n", o.F = i, delete o.v, s == a.s.r && f == a.s.c && (o.f = r, n && (o.D = !0));
    }
  return e;
}
var Aa = {
  encode_col: $e,
  encode_row: Ge,
  encode_cell: me,
  encode_range: Ne,
  decode_col: i0,
  decode_row: a0,
  split_cell: Bl,
  decode_cell: Me,
  decode_range: sr,
  format_cell: Nr,
  sheet_add_aoa: di,
  sheet_add_json: xs,
  sheet_add_dom: fs,
  aoa_to_sheet: vt,
  json_to_sheet: d2,
  table_to_sheet: ls,
  table_to_book: zx,
  sheet_to_csv: v0,
  sheet_to_txt: us,
  sheet_to_json: vn,
  sheet_to_html: ss,
  sheet_to_formulae: x2,
  sheet_to_row_object_array: vn,
  sheet_get_cell: Bt,
  book_new: v2,
  book_append_sheet: m2,
  book_set_sheet_visibility: g2,
  cell_set_number_format: _2,
  cell_set_hyperlink: ds,
  cell_set_internal_link: T2,
  cell_add_comment: E2,
  sheet_set_array_formula: w2,
  consts: {
    SHEET_VISIBLE: 0,
    SHEET_HIDDEN: 1,
    SHEET_VERY_HIDDEN: 2
  }
};
function S2(e) {
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
      const s = Aa.encode_cell({
        c: a,
        r: n
      });
      typeof i.v == "number" ? i.t = "n" : typeof i.v == "boolean" ? i.t = "b" : i.t = "s", t[s] = i;
    }
  return r.s.c < 1e7 && (t["!ref"] = Aa.encode_range(r)), t;
}
class A2 {
  constructor() {
    Nn(this, "SheetNames", []);
    Nn(this, "Sheets", {});
  }
}
const F2 = (e) => {
  const t = new ArrayBuffer(e.length), r = new Uint8Array(t);
  for (let n = 0; n < e.length; ++n)
    r[n] = e.charCodeAt(n) & 255;
  return t;
}, y2 = ({ header: e, data: t, filename: r }) => {
  t = Pr(t), t.unshift(e);
  const n = "SheetJS", a = new A2(), i = S2(t), s = t.map((l) => l.map((c) => c == null ? {
    wch: 10
  } : c.toString().charCodeAt(0) > 255 ? {
    wch: c.toString().length * 2
  } : {
    wch: c.toString().length
  }));
  let f = s[0];
  for (let l = 1; l < s.length; l++)
    for (let c = 0; c < s[l].length; c++)
      f[c].wch < s[l][c].wch && (f[c].wch = s[l][c].wch);
  i["!cols"] = f, a.SheetNames.push(n), a.Sheets[n] = i;
  const o = hs(a, {
    bookType: "xlsx",
    bookSST: !1,
    type: "binary"
  });
  Hn.saveAs(
    new Blob([F2(o)], {
      type: "application/octet-stream"
    }),
    `${r}.xlsx`
  );
}, H2 = async ({ filename: e, tableHead: t, tableData: r }) => {
  const n = (o) => {
    let l = /<\/?.+?\/?>/g;
    return l.test(o) ? o.replace(l, "") : o;
  }, a = async (o, l) => {
    const c = [];
    for (const u of l) {
      const h = [], p = o.length;
      for (let _ = 0; _ < p; _++) {
        const x = o[_];
        let g = u[x.prop];
        if (x.render) {
          const C = x.render(u, _);
          C && Array.isArray(C.children) && C.children.length > 1 && C.children.forEach((O) => {
            O && typeof O.children == "string" && (O.children += `
`);
          }), g = await Pa(C);
        }
        g = n(g), h.push(g);
      }
      c.push(h);
    }
    return c;
  }, i = t.filter((o) => !o.only_display), s = i.map((o) => o.label), f = qs({
    lock: !0,
    text: "数据导出中...",
    background: "rgba(0, 0, 0, 0.7)"
  });
  return new Promise((o) => {
    setTimeout(async () => {
      const l = await a(i, r);
      await y2({
        header: s,
        data: l,
        filename: e
      }), f.close(), Zs.success("导出成功！"), o(!0);
    }, 500);
  });
}, V2 = (e, t = 60, r = "获取验证码") => {
  const n = De(t), a = De(r), i = De(), s = () => {
    n.value--, a.value = `${n.value} 秒后重试`, i.value = setInterval(() => {
      n.value > 0 ? (n.value--, a.value = `${n.value} 秒后重试`) : f();
    }, 1e3);
  }, f = () => {
    n.value = t, a.value = r, clearInterval(i.value);
  }, o = De(!1), l = () => {
    o.value = !0;
  };
  return {
    getCode: () => {
      n.value === t && l();
    },
    tip: a,
    showSlider: o,
    pass: async () => {
      console.log("验证通过"), o.value = !1, await e(), s();
    },
    cancel: () => {
      console.log("取消验证"), o.value = !1;
    }
  };
};
export {
  U2 as YoungDateRange,
  L2 as YoungDialog,
  P2 as YoungPagination,
  M2 as YoungSelect,
  k2 as YoungTable,
  b2 as YoungTimeRange,
  B2 as YoungWeekday,
  P0 as useAutoLoad,
  H2 as useExport2Excel,
  W2 as useFormMode,
  V2 as useVerifyCode
};
//# sourceMappingURL=index.es.js.map
