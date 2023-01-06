import { defineComponent as w, ref as c, onActivated as P, nextTick as h, watchEffect as M, createVNode as s, mergeProps as x, Fragment as z, computed as F, Teleport as q } from "vue";
import { deepClone as y } from "@bluesyoung/utils";
import { ElTable as H, ElTableColumn as O, ElTooltip as j, ElPagination as N, ElDialog as _, ElButton as V, ElMessageBox as D } from "element-plus";
import { useIntersectionObserver as Y } from "@vueuse/core";
const Q = w({
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
    attrs: g,
    slots: a
  }) {
    const r = c(null);
    P(() => {
      h(() => {
        r.value.doLayout();
      });
    });
    const t = c([]), d = c([]);
    return M(() => {
      const o = e.tableData, l = e.tableHead, u = o.length;
      h(() => {
        d.value = l.filter((i) => !i.only_export);
        const f = 50;
        if (u <= f)
          t.value = y(o);
        else {
          const {
            elArr: i,
            load: m
          } = $(t, c(o), f);
          let p = 0;
          t.value = o.slice(p, f), h(() => {
            i.value = r.value.$el.querySelector("tbody").children, m();
          });
        }
      });
    }), () => s(H, x(g, {
      ref: r,
      data: t.value,
      style: "width: 100%",
      height: e.tableHeight,
      onSortChange: (o) => n("sort-change", o)
    }), {
      default: () => {
        var o, l;
        return [d.value.map((u, f) => s(O, {
          key: f,
          prop: u.prop,
          label: u.label,
          width: u.width || "",
          sortable: u.sortable || !1,
          fixed: u.fixed || !1,
          align: u.aligin || "left"
        }, {
          header: (i) => d.value[i.$index].tool_content ? s(z, null, [s("span", null, [i.column.label]), s(j, {
            placement: "bottom"
          }, {
            content: () => d.value[i.$index].tool_content
          })]) : s("span", null, [i.column.label]),
          default: (i) => u.render ? u.render(i.row) : s("span", null, [i.row[u.prop]])
        })), (o = a.switch) == null ? void 0 : o.call(a), (l = a.operate) == null ? void 0 : l.call(a)];
      }
    });
  }
}), b = {
  type: Number,
  required: !0
}, W = w({
  props: {
    total: b,
    page: b,
    limit: b,
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
    attrs: g
  }) {
    const a = (t) => {
      n("update:page", 1), n("update:limit", t), n("page-change");
    }, r = (t) => {
      n("update:page", t), n("page-change");
    };
    return () => s("div", {
      style: "background: white; padding-top: 20px;"
    }, [s(N, x(g, {
      background: e.background,
      currentPage: e.page,
      pageSize: e.limit,
      layout: e.layout,
      pageSizes: e.pageSizes,
      total: e.total,
      "onUpdate:page-size": (t) => a(t),
      "onUpdate:current-page": (t) => r(t)
    }), null)]);
  }
}), X = w({
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
    attrs: g,
    slots: a
  }) {
    const r = F(() => {
      let l = "\u65B0\u5EFA";
      return e.isEdit && (l = "\u7F16\u8F91"), e.isMore && (l = "\u8BE6\u60C5"), l;
    }), t = F({
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
      D.confirm("\u6570\u636E\u672A\u4FDD\u5B58\uFF0C\u5173\u95ED\u5C06\u4E22\u5931\u6570\u636E\uFF0C\u786E\u8BA4\u5173\u95ED\uFF1F", "\u63D0\u793A").then(() => {
        n("update:modelValue", !1), n("clear");
      }).catch(() => null);
    };
    return () => s(q, {
      to: "body"
    }, {
      default: () => [s(_, x(g, {
        modelValue: e.modelValue || t.value,
        title: e.realTitle || r.value,
        closeOnClickModal: !1,
        closeOnPressEscape: !1,
        beforeClose: o
      }), {
        default: () => {
          var l;
          return (l = a.body) == null ? void 0 : l.call(a);
        },
        footer: () => {
          var l, u, f;
          return s(z, null, [(l = a.button) == null ? void 0 : l.call(a), e.showCancel && s(V, {
            onClick: () => o()
          }, {
            default: () => [e.cancelText]
          }), (u = a.step1) == null ? void 0 : u.call(a), (f = a.step2) == null ? void 0 : f.call(a), e.showSure && s(V, {
            type: "primary",
            onClick: () => d()
          }, {
            default: () => [e.sureText]
          })]);
        }
      })]
    });
  }
}), $ = (e, n, g = 10, a = c(!1)) => {
  const r = c([]), t = c(!1), d = c(1), o = () => {
    const { stop: l } = Y(
      r.value[e.value.length - 1],
      ([{ isIntersecting: u }]) => {
        u && (t.value = u, l());
      }
    );
  };
  return M(async () => {
    if (!a.value && t.value) {
      if (e.value.length === n.value.length)
        return;
      d.value++;
      const l = n.value.slice(g * (d.value - 1), g * d.value);
      if (l.length === 0)
        return;
      e.value.push(...l), t.value = !1, await h(), o();
    }
  }), {
    elArr: r,
    touchEndEl: t,
    page: d,
    load: o
  };
}, Z = (e, { addCbk: n, modCbk: g, delCbk: a, cpEffect: r, cgEffect: t, disableclear: d }, o = "\u786E\u8BA4\u5220\u9664\u8BE5\u6761\u6570\u636E\uFF1F") => {
  const l = c(!1), u = c(!1), f = c(!1), i = c(y(e)), m = c(), p = async () => await new Promise((S) => {
    var T;
    (T = m.value) == null || T.validate(async (A) => {
      A && S(!0);
    }).catch((A) => {
      S(!1);
    });
  }), B = () => {
    l.value = !1, u.value = !1, f.value = !1, i.value = y(e);
  };
  return {
    isAdd: l,
    isEdit: u,
    isMore: f,
    clear: B,
    edit: (v) => {
      r == null || r(v), i.value = y(v), u.value = !0;
    },
    more: (v) => {
      r == null || r(v), i.value = y(v), f.value = !0;
    },
    form: i,
    del: (v) => {
      D.confirm(o, "\u63D0\u793A", {
        type: "warning"
      }).then(async () => {
        await (a == null ? void 0 : a(v)), t == null || t();
      }).catch(() => null);
    },
    sure: async () => {
      if (l.value) {
        if (await (n == null ? void 0 : n()) === !1)
          return;
      } else if (await (g == null ? void 0 : g()) === !1)
        return;
      !d && B(), t == null || t();
    },
    formRef: m,
    validForm: p
  };
};
export {
  X as YoungDialog,
  W as YoungPagination,
  Q as YoungTable,
  $ as useAutoLoad,
  Z as useFormMode
};
//# sourceMappingURL=index.es.js.map
