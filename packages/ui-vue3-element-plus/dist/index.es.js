import { defineComponent as h, ref as g, onActivated as q, nextTick as m, watchEffect as V, createVNode as s, mergeProps as b, Fragment as j, computed as F, Teleport as z, isVNode as D } from "vue";
import { deepClone as v, randomId as P } from "@bluesyoung/utils";
import { ElTable as _, ElTableColumn as H, ElTooltip as N, ElPagination as Y, ElDialog as $, ElButton as O, ElMessageBox as M, ElSelect as C, ElOption as L } from "element-plus";
import { useIntersectionObserver as R } from "@vueuse/core";
const k = h({
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
    }
  },
  emits: ["sort-change"],
  setup(e, {
    emit: n,
    attrs: c,
    slots: t
  }) {
    const r = g(null);
    q(() => {
      m(() => {
        r.value.doLayout();
      });
    });
    const a = g([]), d = g([]);
    return V(() => {
      const o = e.tableData, l = e.tableHead, u = o.length;
      m(() => {
        d.value = l.filter((i) => !i.only_export);
        const f = 50;
        if (u <= f)
          a.value = v(o);
        else {
          const {
            elArr: i,
            load: y
          } = E(a, g(o), f);
          let w = 0;
          a.value = o.slice(w, f), m(() => {
            i.value = r.value.$el.querySelector("tbody").children, y();
          });
        }
      });
    }), () => s(_, b(c, {
      ref: r,
      data: a.value,
      style: "width: 100%",
      height: e.tableHeight,
      onSortChange: (o) => n("sort-change", o)
    }), {
      default: () => {
        var o, l;
        return [d.value.map((u, f) => s(H, {
          key: f,
          prop: u.prop,
          label: u.label,
          width: u.width || "",
          sortable: u.sortable || !1,
          fixed: u.fixed || !1,
          align: u.aligin || "left"
        }, {
          header: (i) => d.value[i.$index].tool_content ? s(j, null, [s("span", null, [i.column.label]), s(N, {
            placement: "bottom"
          }, {
            content: () => d.value[i.$index].tool_content
          })]) : s("span", null, [i.column.label]),
          default: (i) => u.render ? u.render(i.row) : s("span", null, [i.row[u.prop]])
        })), (o = t.switch) == null ? void 0 : o.call(t), (l = t.operate) == null ? void 0 : l.call(t)];
      }
    });
  }
}), S = {
  type: Number,
  required: !0
}, ee = h({
  props: {
    total: S,
    page: S,
    limit: S,
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
    emit: n,
    attrs: c
  }) {
    const t = (a) => {
      n("update:page", 1), n("update:limit", a), n("page-change");
    }, r = (a) => {
      n("update:page", a), n("page-change");
    };
    return () => s("div", {
      style: "background: white; padding-top: 20px;"
    }, [s(Y, b(c, {
      background: e.background,
      currentPage: e.page,
      pageSize: e.limit,
      layout: e.layout,
      pageSizes: e.pageSizes,
      total: e.total,
      "onUpdate:page-size": (a) => t(a),
      "onUpdate:current-page": (a) => r(a)
    }), null)]);
  }
}), te = h({
  props: {
    modelValue: Boolean,
    realTitle: String,
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
    sureFn: Function
  },
  emits: ["sure", "clear", "update:modelValue"],
  setup(e, {
    emit: n,
    attrs: c,
    slots: t
  }) {
    const r = F(() => {
      let l = "\u65B0\u5EFA";
      return e.isEdit && (l = "\u7F16\u8F91"), e.isMore && (l = "\u8BE6\u60C5"), l;
    }), a = F({
      get: () => e.isAdd || e.isMore || e.isEdit,
      set: (l) => null
    }), d = async () => {
      if (!(e.sureFn && await e.sureFn() === !1)) {
        if (e.isMore) {
          n("clear");
          return;
        }
        n("update:modelValue", !1), n("sure");
      }
    }, o = () => {
      if (e.isMore || !e.showCancel) {
        n("clear"), n("update:modelValue", !1);
        return;
      }
      M.confirm("\u6570\u636E\u672A\u4FDD\u5B58\uFF0C\u5173\u95ED\u5C06\u4E22\u5931\u6570\u636E\uFF0C\u786E\u8BA4\u5173\u95ED\uFF1F", "\u63D0\u793A").then(() => {
        n("update:modelValue", !1), n("clear");
      }).catch(() => null);
    };
    return () => s(z, {
      to: "body"
    }, {
      default: () => [s($, b(c, {
        modelValue: e.modelValue || a.value,
        title: e.realTitle || r.value,
        closeOnClickModal: !1,
        closeOnPressEscape: !1,
        beforeClose: o
      }), {
        default: () => {
          var l;
          return (l = t.body) == null ? void 0 : l.call(t);
        },
        footer: () => {
          var l, u, f;
          return s(j, null, [(l = t.button) == null ? void 0 : l.call(t), e.showCancel && s(O, {
            onClick: () => o()
          }, {
            default: () => [e.cancelText]
          }), (u = t.step1) == null ? void 0 : u.call(t), (f = t.step2) == null ? void 0 : f.call(t), e.showSure && s(O, {
            type: "primary",
            onClick: () => d()
          }, {
            default: () => [e.sureText]
          })]);
        }
      })]
    });
  }
});
function U(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !D(e);
}
const ae = h({
  props: {
    options: {
      type: Object,
      required: !0
    }
  },
  setup(e, {
    attrs: n
  }) {
    const c = P();
    return () => {
      let t;
      return s(C, n, U(t = e.options.map((r, a) => s(L, b(r, {
        key: a + c
      }), null))) ? t : {
        default: () => [t]
      });
    };
  }
}), E = (e, n, c = 10, t = g(!1)) => {
  const r = g([]), a = g(!1), d = g(1), o = () => {
    const { stop: l } = R(
      r.value[e.value.length - 1],
      ([{ isIntersecting: u }]) => {
        u && (a.value = u, l());
      }
    );
  };
  return V(async () => {
    if (!t.value && a.value) {
      if (e.value.length === n.value.length)
        return;
      d.value++;
      const l = n.value.slice(c * (d.value - 1), c * d.value);
      if (l.length === 0)
        return;
      e.value.push(...l), a.value = !1, await m(), o();
    }
  }), {
    elArr: r,
    touchEndEl: a,
    page: d,
    load: o
  };
}, le = (e, { addCbk: n, modCbk: c, delCbk: t, cpEffect: r, cgEffect: a, disableclear: d }, o = "\u786E\u8BA4\u5220\u9664\u8BE5\u6761\u6570\u636E\uFF1F") => {
  const l = g(!1), u = g(!1), f = g(!1), i = g(v(e)), y = g(), w = async () => await new Promise((B) => {
    var T;
    (T = y.value) == null || T.validate(async (A) => {
      A && B(!0);
    }).catch((A) => {
      B(!1);
    });
  }), x = () => {
    l.value = !1, u.value = !1, f.value = !1, i.value = v(e);
  };
  return {
    isAdd: l,
    isEdit: u,
    isMore: f,
    clear: x,
    edit: (p) => {
      r == null || r(p), i.value = v(p), u.value = !0;
    },
    more: (p) => {
      r == null || r(p), i.value = v(p), f.value = !0;
    },
    form: i,
    del: (p) => {
      M.confirm(o, "\u63D0\u793A", {
        type: "warning"
      }).then(async () => {
        await (t == null ? void 0 : t(p)), a == null || a();
      }).catch(() => null);
    },
    sure: async () => {
      if (l.value) {
        if (await (n == null ? void 0 : n()) === !1)
          return;
      } else if (await (c == null ? void 0 : c()) === !1)
        return;
      !d && x(), a == null || a();
    },
    formRef: y,
    validForm: w
  };
};
export {
  te as YoungDialog,
  ee as YoungPagination,
  ae as YoungSelect,
  k as YoungTable,
  E as useAutoLoad,
  le as useFormMode
};
//# sourceMappingURL=index.es.js.map
