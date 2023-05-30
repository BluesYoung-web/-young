var bs = Object.defineProperty;
var Us = (e, t, r) => t in e ? bs(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var bn = (e, t, r) => (Us(e, typeof t != "symbol" ? t + "" : t, r), r);
import { defineComponent as lr, onMounted as Da, ref as ue, onActivated as Ra, nextTick as Mr, watchEffect as gt, createVNode as j, mergeProps as Le, Fragment as Hr, createTextVNode as pt, isVNode as Vt, computed as Lt, watch as Kn, Teleport as Hs, reactive as Ws, TransitionGroup as Vs, initDirectivesForSSR as Gs, createApp as Xs, ssrContextKey as ka, warn as sn, Static as js, Comment as zs, Text as $s, ssrUtils as Ia, render as Ks } from "vue";
import { deepClone as mr, randomId as An, recentDay as Ys, isArray as qs } from "@bluesyoung/utils";
import { ElTable as Na, ElTableColumn as fn, ElTooltip as Js, ElPopover as Pa, ElCheckboxGroup as La, ElCheckbox as Ma, ElPagination as Zs, ElDialog as Qs, ElButton as ln, ElMessageBox as Ba, ElSelect as ef, ElOption as rf, ElTimeSelect as L0, ElTimePicker as tf, ElDatePicker as nf, ElImageViewer as af, ElForm as sf, ElInput as ff, ElInputNumber as lf, ElFormItem as of, ElOverlay as cf, ElLoadingService as uf, ElMessage as hf } from "element-plus";
import { useEventListener as e0, useWindowSize as xf, useIntersectionObserver as df } from "@vueuse/core";
import { makeMap as pf, isPromise as r0, isFunction as vf, NOOP as M0, isString as mt, escapeHtmlComment as gf, escapeHtml as Ur, isVoidTag as mf, isOn as _f, isSVGTag as Tf, propsToAttrMap as wf, isBooleanAttr as Ef, includeBooleanAttr as Sf, isSSRSafeAttrName as Af, normalizeClass as Ff, normalizeStyle as yf, stringifyStyle as Cf, isArray as Of } from "@vue/shared";
function Df(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !Vt(e);
}
const ad = lr({
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
    Da(async () => {
      if (e.rowDraggable) {
        const {
          default: l
        } = await import("sortablejs");
        if (e.rowDraggable) {
          const c = a.value.$el.querySelector("tbody");
          c.style.cursor = "move", new l(c, {
            animation: 150,
            onEnd: ({
              oldIndex: x,
              newIndex: h
            }) => {
              if (x === h)
                return;
              const d = f.value, m = mr(d[x]);
              d.splice(x, 1), d.splice(h, 0, m), t("row-drag-change", f.value);
            }
          });
        }
      }
    });
    const a = ue();
    Ra(() => {
      Mr(() => {
        a.value.doLayout();
      });
    });
    const i = ue([]), s = ue([]), f = ue([]);
    gt(() => {
      const l = e.tableData, c = e.tableHead, x = l.length;
      Mr(() => {
        s.value = c.filter((d) => !d.only_export);
        const h = 50;
        if (x <= h)
          i.value = mr(l), f.value = mr(l);
        else {
          const {
            elArr: d,
            load: m
          } = b0(i, ue(l), h), {
            elArr: u,
            load: g
          } = b0(f, ue(l), h);
          let F = 0;
          i.value = l.slice(F, h), f.value = l.slice(F, h), Mr(() => {
            d.value = a.value.$el.querySelector("tbody").children, m();
          }), Mr(() => {
            u.value = a.value.$el.querySelector("tbody").children, g();
          });
        }
      });
    });
    const o = (l) => {
      s.value = e.tableHead.filter((c) => !c.only_export && l.includes(c.prop));
    };
    return () => j("div", {
      style: {
        position: "relative"
      }
    }, [j(Na, Le(r, {
      ref: a,
      data: i.value,
      style: {
        width: "100%"
      },
      height: e.tableHeight
    }), {
      default: () => {
        var l, c;
        return [e.selectable && j(fn, {
          type: "selection",
          width: "55"
        }, null), s.value.map((x, h) => j(fn, {
          key: h,
          prop: x.prop,
          label: x.label,
          width: x.width || "",
          sortable: x.sortable || !1,
          fixed: x.fixed || !1,
          align: x.aligin || "left",
          showOverflowTooltip: x.show_overflow_tooltip ?? !0
        }, {
          header: (d) => s.value[h].tool_content ? j("div", {
            style: {
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }
          }, [j("span", null, [d.column.label]), j(Js, {
            placement: "bottom"
          }, {
            default: () => [j("svg", {
              xmlns: "http://www.w3.org/2000/svg",
              width: "1.2em",
              height: "1.2em",
              viewBox: "0 0 256 256"
            }, [j("path", {
              fill: "currentColor",
              d: "M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24Zm0 168a12 12 0 1 1 12-12a12 12 0 0 1-12 12Zm8-48.72v.72a8 8 0 0 1-16 0v-8a8 8 0 0 1 8-8c13.23 0 24-9 24-20s-10.77-20-24-20s-24 9-24 20v4a8 8 0 0 1-16 0v-4c0-19.85 17.94-36 40-36s40 16.15 40 36c0 17.38-13.76 31.93-32 35.28Z"
            }, null)])],
            content: () => s.value[h].tool_content
          })]) : j("span", null, [d.column.label]),
          default: (d) => x.render ? x.render(d.row, d.$index) : j("span", null, [d.row[x.prop]])
        })), (l = n.switch) == null ? void 0 : l.call(n), (c = n.operate) == null ? void 0 : c.call(n)];
      }
    }), e.enableCustomHead && j(Pa, {
      trigger: "click",
      placement: "bottom-end",
      width: 200
    }, {
      reference: () => j("div", {
        style: {
          position: "absolute",
          top: 0,
          right: 0,
          zIndex: 2,
          cursor: "pointer"
        },
        title: "表头配置"
      }, [j("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "1.5rem",
        height: "1.5rem",
        viewBox: "0 0 24 24"
      }, [j("path", {
        fill: "currentColor",
        d: "M13.875 22h-3.75q-.375 0-.65-.25t-.325-.625l-.3-2.325q-.325-.125-.613-.3t-.562-.375l-2.175.9q-.35.125-.7.025t-.55-.425L2.4 15.4q-.2-.325-.125-.7t.375-.6l1.875-1.425Q4.5 12.5 4.5 12.337v-.674q0-.163.025-.338L2.65 9.9q-.3-.225-.375-.6t.125-.7l1.85-3.225q.175-.35.537-.438t.713.038l2.175.9q.275-.2.575-.375t.6-.3l.3-2.325q.05-.375.325-.625t.65-.25h3.75q.375 0 .65.25t.325.625l.3 2.325q.325.125.613.3t.562.375l2.175-.9q.35-.125.7-.025t.55.425L21.6 8.6q.2.325.125.7t-.375.6l-1.875 1.425q.025.175.025.338v.674q0 .163-.05.338l1.875 1.425q.3.225.375.6t-.125.7l-1.85 3.2q-.2.325-.563.438t-.712-.013l-2.125-.9q-.275.2-.575.375t-.6.3l-.3 2.325q-.05.375-.325.625t-.65.25Zm-1.825-6.5q1.45 0 2.475-1.025T15.55 12q0-1.45-1.025-2.475T12.05 8.5q-1.475 0-2.488 1.025T8.55 12q0 1.45 1.012 2.475T12.05 15.5Zm0-2q-.625 0-1.063-.438T10.55 12q0-.625.438-1.063t1.062-.437q.625 0 1.063.438T13.55 12q0 .625-.438 1.063t-1.062.437ZM12 12Zm-1 8h1.975l.35-2.65q.775-.2 1.438-.588t1.212-.937l2.475 1.025l.975-1.7l-2.15-1.625q.125-.35.175-.737T17.5 12q0-.4-.05-.787t-.175-.738l2.15-1.625l-.975-1.7l-2.475 1.05q-.55-.575-1.212-.962t-1.438-.588L13 4h-1.975l-.35 2.65q-.775.2-1.437.588t-1.213.937L5.55 7.15l-.975 1.7l2.15 1.6q-.125.375-.175.75t-.05.8q0 .4.05.775t.175.75l-2.15 1.625l.975 1.7l2.475-1.05q.55.575 1.213.963t1.437.587L11 20Z"
      }, null)])]),
      default: () => {
        let l;
        return j(Hr, null, [j("div", {
          style: {
            marginBottom: "10px",
            textAlign: "center",
            fontWeight: "bold"
          }
        }, [pt("自定义展示的表头")]), j(La, {
          style: {
            maxHeight: "350px",
            overflowY: "auto"
          },
          modelValue: s.value.map((c) => c.prop),
          "onUpdate:modelValue": o
        }, Df(l = e.tableHead.filter((c) => !c.only_export).map((c, x) => (
          // @ts-ignore
          j(Ma, {
            label: c.prop,
            key: x,
            title: c.label
          }, {
            default: () => [c.label]
          })
        ))) ? l : {
          default: () => [l]
        })]);
      }
    })]);
  }
}), Un = {
  type: Number,
  required: !0
}, id = lr({
  props: {
    total: Un,
    page: Un,
    limit: Un,
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
    return () => j("div", {
      style: "background: white; padding-top: 20px;"
    }, [j(Zs, Le(r, {
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
}), sd = lr({
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
    const a = ue(""), i = Lt(() => {
      let l = "新建";
      return e.isEdit && (l = "编辑"), e.isMore && (l = "详情"), l;
    }), s = Lt({
      get: () => e.isAdd || e.isMore || e.isEdit,
      set: (l) => null
    });
    e.diffForm && Kn(() => s.value, (l, c) => {
      l && !c && (a.value = JSON.stringify(e.diffForm));
    }), e.diffForm && Kn(() => e.modelValue, (l, c) => {
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
        Ba.confirm("数据未保存，关闭将丢失数据，确认关闭？", "提示").then(() => {
          t("update:modelValue", !1), t("clear");
        }).catch(() => null);
    };
    return () => j(Hs, {
      to: "body"
    }, {
      default: () => [j(Qs, Le(r, {
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
          var l, c, x;
          return j(Hr, null, [(l = n.button) == null ? void 0 : l.call(n), e.showCancel && j(ln, {
            onClick: () => o()
          }, {
            default: () => [e.cancelText]
          }), (c = n.step1) == null ? void 0 : c.call(n), (x = n.step2) == null ? void 0 : x.call(n), e.showSure && j(ln, {
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
function Rf(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !Vt(e);
}
const kf = lr({
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
    const n = An();
    return () => {
      let a;
      return j(ef, Le({
        modelValue: e.modelValue,
        "onUpdate:modelValue": (i) => {
          r("update:modelValue", i), r("change", i);
        }
      }, t), Rf(a = e.options.map((i, s) => j(rf, Le(i, {
        key: s + n
      }), null))) ? a : {
        default: () => [a]
      });
    };
  }
});
function B0(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !Vt(e);
}
const If = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"], fd = lr({
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
    const n = An();
    return () => {
      let a;
      return j(La, Le(t, {
        modelValue: e.modelValue,
        onChange: (i) => r("update:modelValue", i)
      }), B0(a = If.map((i, s) => j(Ma, {
        label: s + 1,
        key: s + n
      }, B0(i) ? i : {
        default: () => [i]
      }))) ? a : {
        default: () => [a]
      });
    };
  }
}), ld = lr({
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
    /**
     * 是否精确到秒
     */
    second: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["update:start", "update:end"],
  setup(e, {
    attrs: t,
    emit: r
  }) {
    const n = ue();
    gt(() => {
      e.start && e.end ? n.value = [new Date(`2022 02 02 ${e.start}`), new Date(`2022 02 02 ${e.end}`)] : n.value = void 0;
    });
    const a = (i) => {
      var s, f;
      if (!i)
        r("update:start", ""), r("update:end", "");
      else {
        const [o, l] = i;
        r("update:start", ((s = o.toLocaleString().match(/\d\d:\d\d:\d\d/)) == null ? void 0 : s[0]) ?? ""), r("update:end", ((f = l.toLocaleString().match(/\d\d:\d\d:\d\d/)) == null ? void 0 : f[0]) ?? "");
      }
    };
    return () => e.second ? j(tf, Le(t, {
      modelValue: n.value,
      isRange: !0,
      startPlaceholder: "开始时间",
      endPlaceholder: "结束时间",
      "onUpdate:modelValue": a
    }), null) : j(Hr, null, [j(L0, Le(t, {
      modelValue: e.start,
      class: "w-120px mr-2",
      maxTime: e.end,
      placeholder: "开始时间",
      start: e.startTime,
      step: e.step,
      end: e.endTime,
      "onUpdate:modelValue": (i) => r("update:start", i)
    }), null), pt("-  "), j(L0, Le(t, {
      modelValue: e.end,
      class: "w-120px",
      minTime: e.start,
      placeholder: "结束时间",
      start: e.startTime,
      step: e.step,
      end: e.endTime,
      "onUpdate:modelValue": (i) => r("update:end", i)
    }), null)]);
  }
}), Nf = [{
  text: "今天",
  value: (() => {
    const e = new Date(), t = new Date();
    return t.setHours(0, 0, 0), e.setHours(23, 59, 59), [t, e];
  })()
}, {
  text: "昨天",
  value: (() => {
    const e = new Date(), t = new Date();
    return e.setTime(t.getTime() - 3600 * 1e3 * 24 * 1), t.setTime(t.getTime() - 3600 * 1e3 * 24 * 1), t.setHours(0, 0, 0), e.setHours(23, 59, 59), [t, e];
  })()
}, {
  text: "本周",
  value: (() => {
    const e = new Date(), t = new Date();
    var r = t.getDay() || 7;
    return t.setDate(t.getDate() - r + 1), t.setHours(0, 0, 0), e.setHours(23, 59, 59), [t, e];
  })()
}, {
  text: "上周",
  value: (() => {
    const e = new Date(), t = new Date(e.getTime() - 7 * 24 * 3600 * 1e3), r = new Date(e.getTime() - 7 * 24 * 3600 * 1e3), n = t.getDay(), a = t.getDate() - n + (n === 0 ? -6 : 1), i = new Date(t.setDate(a)), s = new Date(r.setDate(a + 6));
    return i.setHours(0, 0, 0), s.setHours(23, 59, 59), [i, s];
  })()
}, {
  text: "本月",
  value: (() => {
    const e = new Date(), t = new Date();
    return e.setDate(1), e.setHours(0, 0, 0), t.setHours(23, 59, 59), [e, t];
  })()
}, {
  text: "上月",
  value: (() => {
    const t = new Date(), r = new Date(t.getFullYear(), t.getMonth() - 1, 1), a = new Date(t.getFullYear(), t.getMonth(), 1).getTime() - 1 * 864e5, i = new Date(a);
    return r.setHours(0, 0, 0), i.setHours(23, 59, 59), [r, i];
  })()
}, {
  text: "最近7天",
  value: (() => {
    const e = new Date(), t = new Date();
    return t.setTime(t.getTime() - 3600 * 1e3 * 24 * 6), t.setHours(0, 0, 0), e.setHours(23, 59, 59), [t, e];
  })()
}, {
  text: "最近30天",
  value: (() => {
    const e = new Date(), t = new Date();
    return t.setTime(t.getTime() - 3600 * 1e3 * 24 * 30), t.setHours(0, 0, 0), e.setHours(23, 59, 59), [t, e];
  })()
}], Pf = lr({
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
    /**
     * 是否精确到秒
     */
    second: {
      type: Boolean,
      default: !1
    },
    /**
     * 是否展示快捷选项
     * @cond1 传入 true，使用默认的快捷选项
     * @cond2 传入数组，使用数组作为快捷选项
     */
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
    gt(() => {
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
    return () => j(nf, Le(t, {
      modelValue: n.value,
      type: e.second ? "datetimerange" : "daterange",
      "start-placeholder": "开始日期",
      "end-placeholder": "结束日期",
      "default-time": Ys(),
      shortcuts: e.shortcuts ? qs(e.shortcuts) ? e.shortcuts : Nf : void 0,
      clearable: !0,
      "onUpdate:modelValue": (i) => a(i),
      onChange: () => r("change")
    }), null);
  }
}), Lf = lr({
  props: {
    onDestroy: {
      type: Function,
      default: () => console.log("为了节省性能，此时应该销毁dom")
    },
    zIndex: {
      type: Number,
      default: 9999
    }
  },
  setup(e, {
    expose: t
  }) {
    const r = ue(!1), n = Ws({
      srcList: [],
      index: 0,
      zIndex: e.zIndex
    });
    function a(l) {
      if (l.ctrlKey) {
        if (l.deltaY < 0)
          return l.preventDefault(), !1;
        if (l.deltaY > 0)
          return l.preventDefault(), !1;
      }
    }
    const i = e0("wheel", a, {
      passive: !1
    });
    let s;
    function f(l) {
      n.srcList = l.srcList, n.index = l.index ?? 0, s = document.body.style.overflow, document.body.style.overflow = "hidden", r.value = !0;
    }
    function o() {
      i(), document.body.style.overflow = s, r.value = !1, e.onDestroy();
    }
    return t({
      show: f,
      close: o
    }), () => r.value && j(af, {
      zIndex: n.zIndex,
      initialIndex: n.index,
      urlList: n.srcList,
      hideOnClickModal: !0,
      onClose: o
    }, null);
  }
});
function Mf(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !Vt(e);
}
const od = lr({
  props: {
    modelValue: Object,
    searchScheme: Object,
    fastSearch: {
      type: Boolean,
      default: !0
    },
    onSearch: {
      type: Function,
      default: () => console.log("---表单元素触发请求---")
    },
    onReset: {
      type: Function,
      default: () => console.log("---触发重置请求---")
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
    Kn(() => e.modelValue, (o) => {
      a.value = mr(o);
    }, {
      immediate: !0,
      deep: !0
    });
    const i = (o = !0) => {
      r("update:modelValue", {
        ...a.value
      }), e.fastSearch && o && e.onSearch();
    }, s = (o) => {
      const l = e.searchScheme[o];
      l.attrs || (l.attrs = {});
      const c = (u, g) => g ? j(of, {
        label: l.tip
      }, Mf(u) ? u : {
        default: () => [u]
      }) : u, [x, h] = e.dateTimeKey, m = {
        input: () => c(j(ff, Le({
          modelValue: a.value[o],
          "onUpdate:modelValue": (u) => {
            var g;
            return a.value[o] = (g = u == null ? void 0 : u.trim) == null ? void 0 : g.call(u);
          },
          onChange: () => i(!1),
          onKeyup: (u) => J2(u, () => i())
        }, l.attrs), null), l.tip),
        number: (u) => c(j(lf, Le({
          modelValue: a.value[u],
          "onUpdate:modelValue": (g) => a.value[u] = g,
          onChange: () => i(),
          style: {
            width: "120px"
          }
        }, l.attrs), null), l.tip),
        select: (u) => c(j(kf, Le({
          modelValue: a.value[u],
          options: l.options || [],
          "onUpdate:modelValue": (g) => a.value[u] = g,
          onChange: () => i()
        }, l.attrs), null), l.tip),
        // ! 时间范围选择，通常全局只有一个
        datetimerange: (u) => c(j(Pf, Le({
          start: a.value[x],
          end: a.value[h],
          "onUpdate:start": (g) => {
            a.value[x] = g;
          },
          "onUpdate:end": (g) => {
            a.value[h] = g;
          },
          onChange: i
        }, l.attrs), null), l.tip),
        custom: (u) => c(l.render(), l.tip)
      }[l.type];
      if (m)
        return m(o);
      throw new Error("unknown search form type");
    }, f = An();
    return () => j("div", Le({
      style: {
        maxWidth: "100%",
        margin: "auto",
        padding: "20px"
      }
    }, t), [j(sf, {
      model: e.modelValue
    }, {
      default: () => {
        var o, l;
        return [j("div", {
          style: {
            display: "flex",
            flexWrap: "wrap",
            gap: "10px 20px"
          }
        }, [Object.keys(e.searchScheme).map((c, x) => j("div", {
          key: x + f
        }, [s(c)])), j("div", null, [(o = n.custom) == null ? void 0 : o.call(n)])]), j("div", {
          style: {
            display: "flex"
          }
        }, [j(ln, {
          type: "primary",
          onClick: () => e.onSearch()
        }, {
          default: () => [pt("搜索")]
        }), j(ln, {
          onClick: () => e.onReset()
        }, {
          default: () => [pt("重置")]
        }), (l = n.btns) == null ? void 0 : l.call(n)])];
      }
    })]);
  }
}), Bf = "https://g2021-cdn.laiyouxi.com/image/21Store/laiyouxi_guid/website/landscape.png", cd = lr({
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
    } = xf(), o = Lt(() => s.value < f.value || s.value < e.maxWidth);
    return gt(() => {
      o.value ? a() : i();
    }), e0(r, "animationend", (l) => {
      i();
    }), () => j(Hr, null, [n.value && j(cf, Le({
      mask: !0,
      style: {
        width: "100vw",
        height: "100vh"
      }
    }, t), {
      default: () => [j("div", {
        style: {
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }
      }, [j("style", null, [`
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
                `]), j("img", {
        ref: r,
        src: Bf,
        class: "rotate-tip"
      }, null), j("div", {
        style: {
          color: "white",
          marginTop: "2.5rem",
          fontSize: "1.25rem",
          lineHeight: "1.75rem"
        }
      }, [pt("为了更好的用户体验，请横屏使用")])])]
    })]);
  }
});
function bf(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !Vt(e);
}
const Uf = lr({
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
    const r = ue(!1), n = ue(!1);
    let a = -1, i;
    function s(x) {
      a = x;
    }
    function f(x, h) {
      x.preventDefault(), i !== null && clearTimeout(i), n.value = !0, i = setTimeout(() => {
        if (a !== h) {
          const d = e.list[a];
          e.list.splice(a, 1), e.list.splice(h, 0, d), a = h;
        }
        n.value = !1;
      }, 100);
    }
    function o() {
      n.value ? setTimeout(() => {
        o();
      }, 100) : t("drag-end", e.list);
    }
    function l(x, h) {
      x.preventDefault();
    }
    function c(x) {
      t("change", x, !x.check);
    }
    return () => {
      let x;
      return j("div", null, [j("style", null, [`
          .young-drag-list {
            list-style: none;
          }
          
          .young-drag-list-item {
            transition: transform .3s;
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
            /* 显示省略号 */
          }
          
          .young-drag-list-item .draggable {
            text-align: center;
            display: flex;
            align-items: center;
            padding: 0 12px;
            height: 100%;
          }
          
          .young-drag-list-item .check {
            text-align: center;
            display: flex;
            align-items: center;
            padding: 0 12px;
            height: 100%;
          }
          `]), j(Vs, null, bf(x = e.list.map((h, d) => j("div", {
        class: `young-drag-list-item ${h.check ? "active" : ""}`,
        key: h.label,
        onDragstart: () => s(d),
        onDragenter: (m) => f(m, d),
        onDragover: (m) => l(m),
        onDragend: o,
        draggable: r.value
      }, [j("div", {
        class: "draggable",
        onMouseover: () => r.value = !0,
        onMouseout: () => r.value = !1
      }, [j("svg", {
        class: "icon",
        viewBox: "0 0 1024 1024",
        version: "1.1",
        xmlns: "http://www.w3.org/2000/svg",
        "p-id": "6483",
        width: "16",
        height: "16"
      }, [j("path", {
        d: "M867.995 459.647h-711.99c-27.921 0-52.353 24.434-52.353 52.353s24.434 52.353 52.353 52.353h711.99c27.921 0 52.353-24.434 52.353-52.353s-24.434-52.353-52.353-52.353z",
        "p-id": "6484"
      }, null), j("path", {
        d: "M867.995 763.291h-711.99c-27.921 0-52.353 24.434-52.353 52.353s24.434 52.353 52.353 52.353h711.99c27.921 0 52.353-24.434 52.353-52.353s-24.434-52.353-52.353-52.353z",
        "p-id": "6485"
      }, null), j("path", {
        d: "M156.005 260.709h711.99c27.921 0 52.353-24.434 52.353-52.353s-24.434-52.353-52.353-52.353h-711.99c-27.921 0-52.353 24.434-52.353 52.353s24.434 52.353 52.353 52.353z",
        "p-id": "6486"
      }, null)])]), j("div", {
        class: "label",
        onClick: (m) => {
          m.stopPropagation(), c(h);
        },
        title: h.label
      }, [h.label]), h.check !== !1 && j("div", {
        class: "check",
        onClick: (m) => {
          m.stopPropagation(), c(h);
        }
      }, [j("svg", {
        class: "icon",
        viewBox: "0 0 1024 1024",
        version: "1.1",
        xmlns: "http://www.w3.org/2000/svg",
        "p-id": "7463",
        width: "18",
        height: "18"
      }, [j("path", {
        d: "M186.4 480.3l219.5 253.8c7.8 9 21.4 10 30.4 2.2 0.6-0.5 1.2-1.1 1.7-1.7L839.6 300c7.6-8.2 7.6-20.9-0.1-29.1-7.7-8.2-20.4-9.1-29.2-2.1L433.8 573.6c-7.3 5.9-17.5 6.4-25.3 1.3l-194-126.3c-9-5.8-20.8-4.2-27.9 3.8-7.1 7.9-7.1 19.9-0.2 27.9z",
        fill: "#409eff ",
        "p-id": "7464"
      }, null)])])]))) ? x : {
        default: () => [x]
      })]);
    };
  }
}), Hf = lr({
  props: {
    tableHead: {
      required: !0,
      type: Object
    },
    height: {
      type: String,
      default: "100%"
    }
  },
  emits: ["drag-end", "change"],
  setup(e, {
    emit: t
  }) {
    const r = ue(!1), n = (i) => {
      t("drag-end", i);
    }, a = (i, s) => {
      t("change", i, s);
    };
    return Da(() => {
      e0("click", (i) => {
        r.value = !1;
      });
    }), () => j(Hr, null, [j("style", null, [`
            .young-table-pro-setting {
              position: absolute;
              top: 0;
              right: 0;
              z-index: 2;
              cursor: pointer;
              background: #fff;
              /* padding: 0 5px; */
              display: flex;
              justify-content: center;
              align-items: center;
            }
            
            .young-table-pro-border {
              border-left: 1px solid #ebeef5;
            }
            
            .popover_title {
              height: 24px;
              line-height: 24px;
              text-align: center;
              font-weight: bold;
              color: #333;
              border-bottom: 1px solid #ebeef5;
              position: relative;
              padding: 12px;
              box-sizing: content-box;
            }
            
            .popover_title .svg {
              position: absolute;
              right: 12px;
              top: 15px;
              cursor: pointer;
            }
            
            .popover_content {
              height: 400px;
              overflow-y: auto;
            }
            
            /* 针对 Webkit 浏览器 */
            ::-webkit-scrollbar {
              width: 0;
              height: 0;
            }
            
            /* 针对 Firefox 浏览器 */
            ::-moz-scrollbar {
              width: 0;
              height: 0;
            }
            
            .popover_content .header_item {
              padding: 8px;
              cursor: pointer;
            }
            
            .popover_content .header_item:hover {
              background: #eee;
            }
            `]), j(Pa, {
      trigger: "click",
      visible: r.value,
      placement: "bottom-end",
      popperStyle: "padding:0",
      width: 250,
      showArrow: !1
    }, {
      reference: () => j("div", {
        class: "young-table-pro-setting young-table-pro-border",
        style: {
          height: e.height,
          width: e.height
        },
        onClick: (i) => {
          i.stopPropagation(), r.value = !0;
        },
        title: "表头配置"
      }, [j("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "1.5rem",
        height: "1.5rem",
        viewBox: "0 0 24 24"
      }, [j("path", {
        fill: "currentColor",
        d: "M13.875 22h-3.75q-.375 0-.65-.25t-.325-.625l-.3-2.325q-.325-.125-.613-.3t-.562-.375l-2.175.9q-.35.125-.7.025t-.55-.425L2.4 15.4q-.2-.325-.125-.7t.375-.6l1.875-1.425Q4.5 12.5 4.5 12.337v-.674q0-.163.025-.338L2.65 9.9q-.3-.225-.375-.6t.125-.7l1.85-3.225q.175-.35.537-.438t.713.038l2.175.9q.275-.2.575-.375t.6-.3l.3-2.325q.05-.375.325-.625t.65-.25h3.75q.375 0 .65.25t.325.625l.3 2.325q.325.125.613.3t.562.375l2.175-.9q.35-.125.7-.025t.55.425L21.6 8.6q.2.325.125.7t-.375.6l-1.875 1.425q.025.175.025.338v.674q0 .163-.05.338l1.875 1.425q.3.225.375.6t-.125.7l-1.85 3.2q-.2.325-.563.438t-.712-.013l-2.125-.9q-.275.2-.575.375t-.6.3l-.3 2.325q-.05.375-.325.625t-.65.25Zm-1.825-6.5q1.45 0 2.475-1.025T15.55 12q0-1.45-1.025-2.475T12.05 8.5q-1.475 0-2.488 1.025T8.55 12q0 1.45 1.012 2.475T12.05 15.5Zm0-2q-.625 0-1.063-.438T10.55 12q0-.625.438-1.063t1.062-.437q.625 0 1.063.438T13.55 12q0 .625-.438 1.063t-1.062.437ZM12 12Zm-1 8h1.975l.35-2.65q.775-.2 1.438-.588t1.212-.937l2.475 1.025l.975-1.7l-2.15-1.625q.125-.35.175-.737T17.5 12q0-.4-.05-.787t-.175-.738l2.15-1.625l-.975-1.7l-2.475 1.05q-.55-.575-1.212-.962t-1.438-.588L13 4h-1.975l-.35 2.65q-.775.2-1.437.588t-1.213.937L5.55 7.15l-.975 1.7l2.15 1.6q-.125.375-.175.75t-.05.8q0 .4.05.775t.175.75l-2.15 1.625l.975 1.7l2.475-1.05q.55.575 1.213.963t1.437.587L11 20Z"
      }, null)])]),
      default: () => j(Hr, null, [j("div", {
        class: "popover_title",
        onClick: (i) => i.stopPropagation()
      }, [pt("表头设置"), j("div", {
        class: "svg",
        onClick: (i) => {
          i.stopPropagation(), r.value = !1;
        }
      }, [j("svg", {
        class: "icon",
        viewBox: "0 0 1024 1024",
        version: "1.1",
        xmlns: "http://www.w3.org/2000/svg",
        "p-id": "5481",
        width: "18",
        height: "18"
      }, [j("path", {
        d: "M512 1024C229.376 1024 0 794.624 0 512S229.376 0 512 0s512 229.376 512 512-229.376 512-512 512z m0-975.36C257.024 48.64 48.64 257.024 48.64 512c0 254.976 207.872 463.36 463.36 463.36S975.36 767.488 975.36 512 766.976 48.64 512 48.64z",
        fill: "#8A8A8A",
        "p-id": "5482"
      }, null), j("path", {
        d: "M548.864 512l195.072-195.072c9.728-9.728 9.728-25.6 0-36.864l-1.536-1.536c-9.728-9.728-25.6-9.728-35.328 0L512 475.136 316.928 280.064c-9.728-9.728-25.6-9.728-35.328 0l-1.536 1.536c-9.728 9.728-9.728 25.6 0 36.864L475.136 512 280.064 707.072c-9.728 9.728-9.728 25.6 0 36.864l1.536 1.536c9.728 9.728 25.6 9.728 35.328 0L512 548.864l195.072 195.072c9.728 9.728 25.6 9.728 35.328 0l1.536-1.536c9.728-9.728 9.728-25.6 0-36.864L548.864 512z",
        fill: "#8A8A8A",
        "p-id": "5483"
      }, null)])])]), j("div", {
        class: "popover_content"
      }, [j(Uf, {
        list: e.tableHead,
        "onDrag-end": n,
        onChange: a
      }, null)])])
    })]);
  }
}), ud = lr({
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
    }
  },
  setup(e, {
    emit: t,
    attrs: r
  }) {
    const n = ue();
    Ra(() => {
      Mr(() => {
        n.value.doLayout();
      });
    });
    const a = ue([]), i = ue([]), s = ue([]), f = ue(0);
    gt(() => {
      a.value = e.tableData, i.value = e.tableHead, s.value = e.tableHead.map((u) => u.prop.toString()), Mr(() => {
        x();
      });
    });
    const o = Lt(() => i.value.map((u) => (u.check = s.value.includes(u.prop), u))), l = Lt(() => o.value.filter((u) => u.check)), c = () => {
      const u = document.querySelector(".el-table__header");
      u.offsetHeight === 0 ? setTimeout(() => {
        c();
      }, 100) : f.value = u.offsetHeight - 1;
    }, x = () => {
      Mr(() => {
        c();
      });
    }, h = (u, g) => {
      const F = s.value.findIndex((O) => O === u.prop);
      !g && F != -1 ? s.value.splice(F, 1) : s.value.push(u.prop);
    }, d = (u) => {
      i.value = u;
    }, m = An();
    return () => j(Hr, null, [j("style", null, [`
          .nowarp {
            word-break: normal;
          }
          `]), j("div", {
      style: "position: relative;"
    }, [j(Na, Le(r, {
      ref: n,
      "header-cell-class-name": "nowarp",
      data: a.value,
      style: {
        width: "100%"
      },
      height: e.tableHeight,
      border: !0,
      "onHeader-dragend": x
    }), {
      default: () => [e.selectable && j(fn, {
        type: "selection",
        width: "55"
      }, null), l.value.map((u, g) => j(fn, {
        key: u.prop.toString() + g + m,
        prop: u.prop,
        label: u.label,
        width: u.width || "",
        sortable: u.sortable || !1,
        fixed: u.fixed || !1,
        align: u.aligin || "left",
        showOverflowTooltip: u.show_overflow_tooltip ?? !0
      }, {
        header: () => j("span", {
          class: "nowarp",
          title: u.label
        }, [u.label]),
        default: ({
          row: F,
          $index: O
        }) => u.render ? u.render(F, O) : j("span", null, [F[u.prop]])
      }))]
    }), j(Hf, {
      height: `${f.value}px`,
      tableHead: o.value,
      "onDrag-end": d,
      onChange: h
    }, null)])]);
  }
}), b0 = (e, t, r = 10, n = ue(!1)) => {
  const a = ue([]), i = ue(!1), s = ue(1), f = () => {
    const { stop: o } = df(
      a.value[e.value.length - 1],
      ([{ isIntersecting: l }]) => {
        l && (i.value = l, o());
      }
    );
  };
  return gt(async () => {
    if (!n.value && i.value) {
      if (e.value.length === t.value.length)
        return;
      s.value++;
      const o = t.value.slice(r * (s.value - 1), r * s.value);
      if (o.length === 0)
        return;
      e.value.push(...o), i.value = !1, await Mr(), f();
    }
  }), {
    elArr: a,
    touchEndEl: i,
    page: s,
    load: f
  };
}, hd = (e, { addCbk: t, modCbk: r, delCbk: n, cpEffect: a, cgEffect: i, clearEffect: s, disableclear: f }, o = "确认删除该条数据？") => {
  const l = ue(!1), c = ue(!1), x = ue(!1), h = ue(mr(e)), d = ue(), m = async () => await new Promise((z) => {
    var ee;
    (ee = d.value) == null || ee.validate(async (D) => {
      D && z(!0);
    }).catch((D) => {
      z(!1);
    });
  }), u = () => {
    l.value = !1, c.value = !1, x.value = !1, s == null || s(), h.value = mr(e);
  };
  return {
    isAdd: l,
    isEdit: c,
    isMore: x,
    clear: u,
    edit: async (L) => {
      const z = await (a == null ? void 0 : a(L));
      h.value = mr(z || L), c.value = !0;
    },
    more: async (L) => {
      const z = await (a == null ? void 0 : a(L));
      h.value = mr(z || L), x.value = !0;
    },
    form: h,
    del: (L) => {
      Ba.confirm(o, "提示", {
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
      !f && u(), i == null || i();
    },
    formRef: d,
    validForm: m
  };
}, Wf = pf(",key,ref,innerHTML,textContent,ref_key,ref_for");
function Vf(e, t) {
  let r = "";
  for (const n in e) {
    if (Wf(n) || _f(n) || t === "textarea" && n === "value")
      continue;
    const a = e[n];
    n === "class" ? r += ` class="${jf(a)}"` : n === "style" ? r += ` style="${zf(a)}"` : r += Gf(n, a, t);
  }
  return r;
}
function Gf(e, t, r) {
  if (!Xf(t))
    return "";
  const n = r && (r.indexOf("-") > 0 || Tf(r)) ? e : wf[e] || e.toLowerCase();
  return Ef(n) ? Sf(t) ? ` ${n}` : "" : Af(n) ? t === "" ? ` ${n}` : ` ${n}="${Ur(t)}"` : (console.warn(`[@vue/server-renderer] Skipped rendering unsafe attribute name: ${n}`), "");
}
function Xf(e) {
  if (e == null)
    return !1;
  const t = typeof e;
  return t === "string" || t === "number" || t === "boolean";
}
function jf(e) {
  return Ur(Ff(e));
}
function zf(e) {
  if (!e)
    return "";
  if (mt(e))
    return Ur(e);
  const t = yf(e);
  return Ur(Cf(t));
}
function $f(e, t) {
  throw new Error("On-the-fly template compilation is not supported in the ESM build of @vue/server-renderer. All templates must be pre-compiled into render functions.");
}
function Kf(e, t, r, n, a) {
  e("<!--teleport start-->");
  const i = a.appContext.provides[ka], s = i.__teleportBuffers || (i.__teleportBuffers = {}), f = s[r] || (s[r] = []), o = f.length;
  let l;
  if (n)
    t(e), l = "<!--teleport anchor-->";
  else {
    const { getBuffer: c, push: x } = ba();
    t(x), x("<!--teleport anchor-->"), l = c();
  }
  f.splice(o, 0, l), e("<!--teleport end-->");
}
const { createComponentInstance: Yf, setCurrentRenderingInstance: U0, setupComponent: qf, renderComponentRoot: H0, normalizeVNode: Jf } = Ia;
function ba() {
  let e = !1;
  const t = [];
  return {
    getBuffer() {
      return t;
    },
    push(r) {
      const n = mt(r);
      e && n ? t[t.length - 1] += r : t.push(r), e = n, (r0(r) || Of(r) && r.hasAsync) && (t.hasAsync = !0);
    }
  };
}
function Ua(e, t = null, r) {
  const n = Yf(e, t, null), a = qf(
    n,
    !0
    /* isSSR */
  ), i = r0(a), s = n.sp;
  if (i || s) {
    let f = i ? a : Promise.resolve();
    return s && (f = f.then(() => Promise.all(s.map((o) => o.call(n.proxy)))).catch(() => {
    })), f.then(() => W0(n, r));
  } else
    return W0(n, r);
}
function W0(e, t) {
  const r = e.type, { getBuffer: n, push: a } = ba();
  if (vf(r)) {
    let i = H0(e);
    if (!r.props)
      for (const s in e.attrs)
        s.startsWith("data-v-") && ((i.props || (i.props = {}))[s] = "");
    on(a, e.subTree = i, e, t);
  } else {
    (!e.render || e.render === M0) && !e.ssrRender && !r.ssrRender && mt(r.template) && (r.ssrRender = $f(r.template));
    for (const s of e.scope.effects)
      s.computed && (s.computed._cacheable = !0);
    const i = e.ssrRender || r.ssrRender;
    if (i) {
      let s = e.inheritAttrs !== !1 ? e.attrs : void 0, f = !1, o = e;
      for (; ; ) {
        const c = o.vnode.scopeId;
        c && (f || (s = { ...s }, f = !0), s[c] = "");
        const x = o.parent;
        if (x && x.subTree && x.subTree === o.vnode)
          o = x;
        else
          break;
      }
      t && (f || (s = { ...s }), s[t.trim()] = "");
      const l = U0(e);
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
        U0(l);
      }
    } else if (e.render && e.render !== M0)
      on(a, e.subTree = H0(e), e, t);
    else {
      const s = r.name || r.__file || "<Anonymous>";
      sn(`Component ${s} is missing template or render function.`), a("<!---->");
    }
  }
  return n();
}
function on(e, t, r, n) {
  const { type: a, shapeFlag: i, children: s } = t;
  switch (a) {
    case $s:
      e(Ur(s));
      break;
    case zs:
      e(s ? `<!--${gf(s)}-->` : "<!---->");
      break;
    case js:
      e(s);
      break;
    case Hr:
      t.slotScopeIds && (n = (n ? n + " " : "") + t.slotScopeIds.join(" ")), e("<!--[-->"), t0(e, s, r, n), e("<!--]-->");
      break;
    default:
      i & 1 ? Zf(e, t, r, n) : i & 6 ? e(Ua(t, r, n)) : i & 64 ? el(e, t, r, n) : i & 128 ? on(e, t.ssContent, r, n) : sn("[@vue/server-renderer] Invalid VNode type:", a, `(${typeof a})`);
  }
}
function t0(e, t, r, n) {
  for (let a = 0; a < t.length; a++)
    on(e, Jf(t[a]), r, n);
}
function Zf(e, t, r, n) {
  const a = t.type;
  let { props: i, children: s, shapeFlag: f, scopeId: o, dirs: l } = t, c = `<${a}`;
  l && (i = Qf(t, i, l)), i && (c += Vf(i, a)), o && (c += ` ${o}`);
  let x = r, h = t;
  for (; x && h === x.subTree; )
    h = x.vnode, h.scopeId && (c += ` ${h.scopeId}`), x = x.parent;
  if (n && (c += ` ${n}`), e(c + ">"), !mf(a)) {
    let d = !1;
    i && (i.innerHTML ? (d = !0, e(i.innerHTML)) : i.textContent ? (d = !0, e(Ur(i.textContent))) : a === "textarea" && i.value && (d = !0, e(Ur(i.value)))), d || (f & 8 ? e(Ur(s)) : f & 16 && t0(e, s, r, n)), e(`</${a}>`);
  }
}
function Qf(e, t, r) {
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
function el(e, t, r, n) {
  const a = t.props && t.props.to, i = t.props && t.props.disabled;
  if (!a)
    return i || sn("[@vue/server-renderer] Teleport is missing target prop."), [];
  if (!mt(a))
    return sn("[@vue/server-renderer] Teleport target must be a query selector string."), [];
  Kf(e, (s) => {
    t0(s, t.children, r, n);
  }, a, i || i === "", r);
}
const { isVNode: rl } = Ia;
async function n0(e) {
  if (e.hasAsync) {
    let t = "";
    for (let r = 0; r < e.length; r++) {
      let n = e[r];
      r0(n) && (n = await n), mt(n) ? t += n : t += await n0(n);
    }
    return t;
  } else
    return Ha(e);
}
function Ha(e) {
  let t = "";
  for (let r = 0; r < e.length; r++) {
    let n = e[r];
    mt(n) ? t += n : t += Ha(n);
  }
  return t;
}
async function Wa(e, t = {}) {
  if (rl(e))
    return Wa(Xs({ render: () => e }), t);
  const r = j(e._component, e._props);
  r.appContext = e._context, e.provide(ka, t);
  const n = await Ua(r), a = await n0(n);
  if (await tl(t), t.__watcherHandles)
    for (const i of t.__watcherHandles)
      i();
  return a;
}
async function tl(e) {
  if (e.__teleportBuffers) {
    e.teleports = e.teleports || {};
    for (const t in e.__teleportBuffers)
      e.teleports[t] = await n0(await Promise.all([e.__teleportBuffers[t]]));
  }
}
Gs();
var yt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, Yn = {}, nl = {
  get exports() {
    return Yn;
  },
  set exports(e) {
    Yn = e;
  }
};
(function(e, t) {
  (function(r, n) {
    n();
  })(yt, function() {
    function r(l, c) {
      return typeof c > "u" ? c = { autoBom: !1 } : typeof c != "object" && (console.warn("Deprecated: Expected third argument to be a object"), c = { autoBom: !c }), c.autoBom && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(l.type) ? new Blob(["\uFEFF", l], { type: l.type }) : l;
    }
    function n(l, c, x) {
      var h = new XMLHttpRequest();
      h.open("GET", l), h.responseType = "blob", h.onload = function() {
        o(h.response, c, x);
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
    var s = typeof window == "object" && window.window === window ? window : typeof self == "object" && self.self === self ? self : typeof yt == "object" && yt.global === yt ? yt : void 0, f = s.navigator && /Macintosh/.test(navigator.userAgent) && /AppleWebKit/.test(navigator.userAgent) && !/Safari/.test(navigator.userAgent), o = s.saveAs || (typeof window != "object" || window !== s ? function() {
    } : "download" in HTMLAnchorElement.prototype && !f ? function(l, c, x) {
      var h = s.URL || s.webkitURL, d = document.createElement("a");
      c = c || l.name || "download", d.download = c, d.rel = "noopener", typeof l == "string" ? (d.href = l, d.origin === location.origin ? i(d) : a(d.href) ? n(l, c, x) : i(d, d.target = "_blank")) : (d.href = h.createObjectURL(l), setTimeout(function() {
        h.revokeObjectURL(d.href);
      }, 4e4), setTimeout(function() {
        i(d);
      }, 0));
    } : "msSaveOrOpenBlob" in navigator ? function(l, c, x) {
      if (c = c || l.name || "download", typeof l != "string")
        navigator.msSaveOrOpenBlob(r(l, x), c);
      else if (a(l))
        n(l, c, x);
      else {
        var h = document.createElement("a");
        h.href = l, h.target = "_blank", setTimeout(function() {
          i(h);
        });
      }
    } : function(l, c, x, h) {
      if (h = h || open("", "_blank"), h && (h.document.title = h.document.body.innerText = "downloading..."), typeof l == "string")
        return n(l, c, x);
      var d = l.type === "application/octet-stream", m = /constructor/i.test(s.HTMLElement) || s.safari, u = /CriOS\/[\d]+/.test(navigator.userAgent);
      if ((u || d && m || f) && typeof FileReader < "u") {
        var g = new FileReader();
        g.onloadend = function() {
          var y = g.result;
          y = u ? y : y.replace(/^data:[^;]*;/, "data:attachment/file;"), h ? h.location.href = y : location = y, h = null;
        }, g.readAsDataURL(l);
      } else {
        var F = s.URL || s.webkitURL, O = F.createObjectURL(l);
        h ? h.location = O : location.href = O, h = null, setTimeout(function() {
          F.revokeObjectURL(O);
        }, 4e4);
      }
    });
    s.saveAs = o.saveAs = o, e.exports = o;
  });
})(nl);
/*! xlsx.js (C) 2013-present SheetJS -- http://sheetjs.com */
var cn = {};
cn.version = "0.18.5";
var Va = 1252, al = [874, 932, 936, 949, 950, 1250, 1251, 1252, 1253, 1254, 1255, 1256, 1257, 1258, 1e4], Ga = function(e) {
  al.indexOf(e) != -1 && (Va = e);
};
function il() {
  Ga(1252);
}
var Mt = function(e) {
  Ga(e);
};
function sl() {
  Mt(1200), il();
}
function fl(e) {
  for (var t = [], r = 0; r < e.length >> 1; ++r)
    t[r] = String.fromCharCode(e.charCodeAt(2 * r + 1) + (e.charCodeAt(2 * r) << 8));
  return t.join("");
}
var Jt = function(t) {
  return String.fromCharCode(t);
}, V0 = function(t) {
  return String.fromCharCode(t);
}, Kr, Br = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
function Bt(e) {
  for (var t = "", r = 0, n = 0, a = 0, i = 0, s = 0, f = 0, o = 0, l = 0; l < e.length; )
    r = e.charCodeAt(l++), i = r >> 2, n = e.charCodeAt(l++), s = (r & 3) << 4 | n >> 4, a = e.charCodeAt(l++), f = (n & 15) << 2 | a >> 6, o = a & 63, isNaN(n) ? f = o = 64 : isNaN(a) && (o = 64), t += Br.charAt(i) + Br.charAt(s) + Br.charAt(f) + Br.charAt(o);
  return t;
}
function Ir(e) {
  var t = "", r = 0, n = 0, a = 0, i = 0, s = 0, f = 0, o = 0;
  e = e.replace(/[^\w\+\/\=]/g, "");
  for (var l = 0; l < e.length; )
    i = Br.indexOf(e.charAt(l++)), s = Br.indexOf(e.charAt(l++)), r = i << 2 | s >> 4, t += String.fromCharCode(r), f = Br.indexOf(e.charAt(l++)), n = (s & 15) << 4 | f >> 2, f !== 64 && (t += String.fromCharCode(n)), o = Br.indexOf(e.charAt(l++)), a = (f & 3) << 6 | o, o !== 64 && (t += String.fromCharCode(a));
  return t;
}
var de = /* @__PURE__ */ function() {
  return typeof Buffer < "u" && typeof process < "u" && typeof process.versions < "u" && !!process.versions.node;
}(), Pr = /* @__PURE__ */ function() {
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
function Jr(e) {
  return de ? Buffer.alloc ? Buffer.alloc(e) : new Buffer(e) : typeof Uint8Array < "u" ? new Uint8Array(e) : new Array(e);
}
function G0(e) {
  return de ? Buffer.allocUnsafe ? Buffer.allocUnsafe(e) : new Buffer(e) : typeof Uint8Array < "u" ? new Uint8Array(e) : new Array(e);
}
var gr = function(t) {
  return de ? Pr(t, "binary") : t.split("").map(function(r) {
    return r.charCodeAt(0) & 255;
  });
};
function Fn(e) {
  if (typeof ArrayBuffer > "u")
    return gr(e);
  for (var t = new ArrayBuffer(e.length), r = new Uint8Array(t), n = 0; n != e.length; ++n)
    r[n] = e.charCodeAt(n) & 255;
  return t;
}
function Gt(e) {
  if (Array.isArray(e))
    return e.map(function(n) {
      return String.fromCharCode(n);
    }).join("");
  for (var t = [], r = 0; r < e.length; ++r)
    t[r] = String.fromCharCode(e[r]);
  return t.join("");
}
function ll(e) {
  if (typeof Uint8Array > "u")
    throw new Error("Unsupported");
  return new Uint8Array(e);
}
var Ve = de ? function(e) {
  return Buffer.concat(e.map(function(t) {
    return Buffer.isBuffer(t) ? t : Pr(t);
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
function ol(e) {
  for (var t = [], r = 0, n = e.length + 250, a = Jr(e.length + 255), i = 0; i < e.length; ++i) {
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
    r > n && (t.push(a.slice(0, r)), r = 0, a = Jr(65535), n = 65530);
  }
  return t.push(a.slice(0, r)), Ve(t);
}
var Dt = /\u0000/g, Zt = /[\u0001-\u0006]/g;
function ut(e) {
  for (var t = "", r = e.length - 1; r >= 0; )
    t += e.charAt(r--);
  return t;
}
function _r(e, t) {
  var r = "" + e;
  return r.length >= t ? r : Ce("0", t - r.length) + r;
}
function a0(e, t) {
  var r = "" + e;
  return r.length >= t ? r : Ce(" ", t - r.length) + r;
}
function un(e, t) {
  var r = "" + e;
  return r.length >= t ? r : r + Ce(" ", t - r.length);
}
function cl(e, t) {
  var r = "" + Math.round(e);
  return r.length >= t ? r : Ce("0", t - r.length) + r;
}
function ul(e, t) {
  var r = "" + e;
  return r.length >= t ? r : Ce("0", t - r.length) + r;
}
var X0 = /* @__PURE__ */ Math.pow(2, 32);
function st(e, t) {
  if (e > X0 || e < -X0)
    return cl(e, t);
  var r = Math.round(e);
  return ul(r, t);
}
function hn(e, t) {
  return t = t || 0, e.length >= 7 + t && (e.charCodeAt(t) | 32) === 103 && (e.charCodeAt(t + 1) | 32) === 101 && (e.charCodeAt(t + 2) | 32) === 110 && (e.charCodeAt(t + 3) | 32) === 101 && (e.charCodeAt(t + 4) | 32) === 114 && (e.charCodeAt(t + 5) | 32) === 97 && (e.charCodeAt(t + 6) | 32) === 108;
}
var j0 = [
  ["Sun", "Sunday"],
  ["Mon", "Monday"],
  ["Tue", "Tuesday"],
  ["Wed", "Wednesday"],
  ["Thu", "Thursday"],
  ["Fri", "Friday"],
  ["Sat", "Saturday"]
], Hn = [
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
function hl(e) {
  return e || (e = {}), e[0] = "General", e[1] = "0", e[2] = "0.00", e[3] = "#,##0", e[4] = "#,##0.00", e[9] = "0%", e[10] = "0.00%", e[11] = "0.00E+00", e[12] = "# ?/?", e[13] = "# ??/??", e[14] = "m/d/yy", e[15] = "d-mmm-yy", e[16] = "d-mmm", e[17] = "mmm-yy", e[18] = "h:mm AM/PM", e[19] = "h:mm:ss AM/PM", e[20] = "h:mm", e[21] = "h:mm:ss", e[22] = "m/d/yy h:mm", e[37] = "#,##0 ;(#,##0)", e[38] = "#,##0 ;[Red](#,##0)", e[39] = "#,##0.00;(#,##0.00)", e[40] = "#,##0.00;[Red](#,##0.00)", e[45] = "mm:ss", e[46] = "[h]:mm:ss", e[47] = "mmss.0", e[48] = "##0.0E+0", e[49] = "@", e[56] = '"上午/下午 "hh"時"mm"分"ss"秒 "', e;
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
  56: '"上午/下午 "hh"時"mm"分"ss"秒 "'
}, z0 = {
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
}, xl = {
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
function xn(e, t, r) {
  for (var n = e < 0 ? -1 : 1, a = e * n, i = 0, s = 1, f = 0, o = 1, l = 0, c = 0, x = Math.floor(a); l < t && (x = Math.floor(a), f = x * s + i, c = x * l + o, !(a - x < 5e-8)); )
    a = 1 / (a - x), i = s, s = f, o = l, l = c;
  if (c > t && (l > t ? (c = o, f = i) : (c = l, f = s)), !r)
    return [0, n * f, c];
  var h = Math.floor(n * f / c);
  return [h, n * f - h * c, c];
}
function Qt(e, t, r) {
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
    o.setDate(o.getDate() + n - 1), s = [o.getFullYear(), o.getMonth() + 1, o.getDate()], i = o.getDay(), n < 60 && (i = (i + 6) % 7), r && (i = Tl(o, s));
  }
  return f.y = s[0], f.m = s[1], f.d = s[2], f.S = a % 60, a = Math.floor(a / 60), f.M = a % 60, a = Math.floor(a / 60), f.H = a, f.q = i, f;
}
var Xa = /* @__PURE__ */ new Date(1899, 11, 31, 0, 0, 0), dl = /* @__PURE__ */ Xa.getTime(), pl = /* @__PURE__ */ new Date(1900, 2, 1, 0, 0, 0);
function ja(e, t) {
  var r = /* @__PURE__ */ e.getTime();
  return t ? r -= 1461 * 24 * 60 * 60 * 1e3 : e >= pl && (r += 24 * 60 * 60 * 1e3), (r - (dl + (/* @__PURE__ */ e.getTimezoneOffset() - /* @__PURE__ */ Xa.getTimezoneOffset()) * 6e4)) / (24 * 60 * 60 * 1e3);
}
function i0(e) {
  return e.indexOf(".") == -1 ? e : e.replace(/(?:\.0*|(\.\d*[1-9])0+)$/, "$1");
}
function vl(e) {
  return e.indexOf("E") == -1 ? e : e.replace(/(?:\.0*|(\.\d*[1-9])0+)[Ee]/, "$1E").replace(/(E[+-])(\d)$/, "$10$2");
}
function gl(e) {
  var t = e < 0 ? 12 : 11, r = i0(e.toFixed(12));
  return r.length <= t || (r = e.toPrecision(10), r.length <= t) ? r : e.toExponential(5);
}
function ml(e) {
  var t = i0(e.toFixed(11));
  return t.length > (e < 0 ? 12 : 11) || t === "0" || t === "-0" ? e.toPrecision(6) : t;
}
function _l(e) {
  var t = Math.floor(Math.log(Math.abs(e)) * Math.LOG10E), r;
  return t >= -4 && t <= -1 ? r = e.toPrecision(10 + t) : Math.abs(t) <= 9 ? r = gl(e) : t === 10 ? r = e.toFixed(10).substr(0, 12) : r = ml(e), i0(vl(r.toUpperCase()));
}
function qn(e, t) {
  switch (typeof e) {
    case "string":
      return e;
    case "boolean":
      return e ? "TRUE" : "FALSE";
    case "number":
      return (e | 0) === e ? e.toString(10) : _l(e);
    case "undefined":
      return "";
    case "object":
      if (e == null)
        return "";
      if (e instanceof Date)
        return Wr(14, ja(e, t && t.date1904), t);
  }
  throw new Error("unsupported value in General format: " + e);
}
function Tl(e, t) {
  t[0] -= 581;
  var r = e.getDay();
  return e < 60 && (r = (r + 6) % 7), r;
}
function wl(e, t, r, n) {
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
          return Hn[r.m - 1][1];
        case 5:
          return Hn[r.m - 1][0];
        default:
          return Hn[r.m - 1][2];
      }
      break;
    case 100:
      switch (t.length) {
        case 1:
        case 2:
          o = r.d, l = t.length;
          break;
        case 3:
          return j0[r.q][0];
        default:
          return j0[r.q][1];
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
      return r.u === 0 && (t == "s" || t == "ss") ? _r(r.S, t.length) : (n >= 2 ? s = n === 3 ? 1e3 : 100 : s = n === 1 ? 10 : 1, i = Math.round(s * (r.S + r.u)), i >= 60 * s && (i = 0), t === "s" ? i === 0 ? "0" : "" + i / s : (a = _r(i, 2 + n), t === "ss" ? a.substr(0, 2) : "." + a.substr(2, t.length - 1)));
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
  var c = l > 0 ? _r(o, l) : "";
  return c;
}
function br(e) {
  var t = 3;
  if (e.length <= t)
    return e;
  for (var r = e.length % t, n = e.substr(0, r); r != e.length; r += t)
    n += (n.length > 0 ? "," : "") + e.substr(r, t);
  return n;
}
var za = /%/g;
function El(e, t, r) {
  var n = t.replace(za, ""), a = t.length - n.length;
  return Dr(e, n, r * Math.pow(10, 2 * a)) + Ce("%", a);
}
function Sl(e, t, r) {
  for (var n = t.length - 1; t.charCodeAt(n - 1) === 44; )
    --n;
  return Dr(e, t.substr(0, n), r / Math.pow(10, 3 * (t.length - n)));
}
function $a(e, t) {
  var r, n = e.indexOf("E") - e.indexOf(".") - 1;
  if (e.match(/^#+0.0E\+0$/)) {
    if (t == 0)
      return "0.0E+0";
    if (t < 0)
      return "-" + $a(e, -t);
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
var Ka = /# (\?+)( ?)\/( ?)(\d+)/;
function Al(e, t, r) {
  var n = parseInt(e[4], 10), a = Math.round(t * n), i = Math.floor(a / n), s = a - i * n, f = n;
  return r + (i === 0 ? "" : "" + i) + " " + (s === 0 ? Ce(" ", e[1].length + 1 + e[4].length) : a0(s, e[1].length) + e[2] + "/" + e[3] + _r(f, e[4].length));
}
function Fl(e, t, r) {
  return r + (t === 0 ? "" : "" + t) + Ce(" ", e[1].length + 2 + e[4].length);
}
var Ya = /^#*0*\.([0#]+)/, qa = /\).*[0#]/, Ja = /\(###\) ###\\?-####/;
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
function $0(e, t) {
  var r = Math.pow(10, t);
  return "" + Math.round(e * r) / r;
}
function K0(e, t) {
  var r = e - Math.floor(e), n = Math.pow(10, t);
  return t < ("" + Math.round(r * n)).length ? 0 : Math.round(r * n);
}
function yl(e, t) {
  return t < ("" + Math.round((e - Math.floor(e)) * Math.pow(10, t))).length ? 1 : 0;
}
function Cl(e) {
  return e < 2147483647 && e > -2147483648 ? "" + (e >= 0 ? e | 0 : e - 1 | 0) : "" + Math.floor(e);
}
function ur(e, t, r) {
  if (e.charCodeAt(0) === 40 && !t.match(qa)) {
    var n = t.replace(/\( */, "").replace(/ \)/, "").replace(/\)/, "");
    return r >= 0 ? ur("n", n, r) : "(" + ur("n", n, -r) + ")";
  }
  if (t.charCodeAt(t.length - 1) === 44)
    return Sl(e, t, r);
  if (t.indexOf("%") !== -1)
    return El(e, t, r);
  if (t.indexOf("E") !== -1)
    return $a(t, r);
  if (t.charCodeAt(0) === 36)
    return "$" + ur(e, t.substr(t.charAt(1) == " " ? 2 : 1), r);
  var a, i, s, f, o = Math.abs(r), l = r < 0 ? "-" : "";
  if (t.match(/^00+$/))
    return l + st(o, t.length);
  if (t.match(/^[#?]+$/))
    return a = st(r, 0), a === "0" && (a = ""), a.length > t.length ? a : qe(t.substr(0, t.length - a.length)) + a;
  if (i = t.match(Ka))
    return Al(i, o, l);
  if (t.match(/^#+0+$/))
    return l + st(o, t.length - t.indexOf("0"));
  if (i = t.match(Ya))
    return a = $0(r, i[1].length).replace(/^([^\.]+)$/, "$1." + qe(i[1])).replace(/\.$/, "." + qe(i[1])).replace(/\.(\d*)$/, function(m, u) {
      return "." + u + Ce("0", qe(
        /*::(*/
        i[1]
      ).length - u.length);
    }), t.indexOf("0.") !== -1 ? a : a.replace(/^0\./, ".");
  if (t = t.replace(/^#+([0.])/, "$1"), i = t.match(/^(0*)\.(#*)$/))
    return l + $0(o, i[2].length).replace(/\.(\d*[1-9])0*$/, ".$1").replace(/^(-?\d*)$/, "$1.").replace(/^0\./, i[1].length ? "0." : ".");
  if (i = t.match(/^#{1,3},##0(\.?)$/))
    return l + br(st(o, 0));
  if (i = t.match(/^#,##0\.([#0]*0)$/))
    return r < 0 ? "-" + ur(e, t, -r) : br("" + (Math.floor(r) + yl(r, i[1].length))) + "." + _r(K0(r, i[1].length), i[1].length);
  if (i = t.match(/^#,#*,#0/))
    return ur(e, t.replace(/^#,#*,/, ""), r);
  if (i = t.match(/^([0#]+)(\\?-([0#]+))+$/))
    return a = ut(ur(e, t.replace(/[\\-]/g, ""), r)), s = 0, ut(ut(t.replace(/\\/g, "")).replace(/[0#]/g, function(m) {
      return s < a.length ? a.charAt(s++) : m === "0" ? "0" : "";
    }));
  if (t.match(Ja))
    return a = ur(e, "##########", r), "(" + a.substr(0, 3) + ") " + a.substr(3, 3) + "-" + a.substr(6);
  var c = "";
  if (i = t.match(/^([#0?]+)( ?)\/( ?)([#0?]+)/))
    return s = Math.min(
      /*::String(*/
      i[4].length,
      7
    ), f = xn(o, Math.pow(10, s) - 1, !1), a = "" + l, c = Dr(
      "n",
      /*::String(*/
      i[1],
      f[1]
    ), c.charAt(c.length - 1) == " " && (c = c.substr(0, c.length - 1) + "0"), a += c + /*::String(*/
    i[2] + "/" + /*::String(*/
    i[3], c = un(f[2], s), c.length < i[4].length && (c = qe(i[4].substr(i[4].length - c.length)) + c), a += c, a;
  if (i = t.match(/^# ([#0?]+)( ?)\/( ?)([#0?]+)/))
    return s = Math.min(Math.max(i[1].length, i[4].length), 7), f = xn(o, Math.pow(10, s) - 1, !0), l + (f[0] || (f[1] ? "" : "0")) + " " + (f[1] ? a0(f[1], s) + i[2] + "/" + i[3] + un(f[2], s) : Ce(" ", 2 * s + 1 + i[2].length + i[3].length));
  if (i = t.match(/^[#0?]+$/))
    return a = st(r, 0), t.length <= a.length ? a : qe(t.substr(0, t.length - a.length)) + a;
  if (i = t.match(/^([#0?]+)\.([#0]+)$/)) {
    a = "" + r.toFixed(Math.min(i[2].length, 10)).replace(/([^0])0+$/, "$1"), s = a.indexOf(".");
    var x = t.indexOf(".") - s, h = t.length - a.length - x;
    return qe(t.substr(0, x) + a + t.substr(t.length - h));
  }
  if (i = t.match(/^00,000\.([#0]*0)$/))
    return s = K0(r, i[1].length), r < 0 ? "-" + ur(e, t, -r) : br(Cl(r)).replace(/^\d,\d{3}$/, "0$&").replace(/^\d*$/, function(m) {
      return "00," + (m.length < 3 ? _r(0, 3 - m.length) : "") + m;
    }) + "." + _r(s, i[1].length);
  switch (t) {
    case "###,##0.00":
      return ur(e, "#,##0.00", r);
    case "###,###":
    case "##,###":
    case "#,###":
      var d = br(st(o, 0));
      return d !== "0" ? l + d : "";
    case "###,###.00":
      return ur(e, "###,##0.00", r).replace(/^0\./, ".");
    case "#,###.00":
      return ur(e, "#,##0.00", r).replace(/^0\./, ".");
  }
  throw new Error("unsupported format |" + t + "|");
}
function Ol(e, t, r) {
  for (var n = t.length - 1; t.charCodeAt(n - 1) === 44; )
    --n;
  return Dr(e, t.substr(0, n), r / Math.pow(10, 3 * (t.length - n)));
}
function Dl(e, t, r) {
  var n = t.replace(za, ""), a = t.length - n.length;
  return Dr(e, n, r * Math.pow(10, 2 * a)) + Ce("%", a);
}
function Za(e, t) {
  var r, n = e.indexOf("E") - e.indexOf(".") - 1;
  if (e.match(/^#+0.0E\+0$/)) {
    if (t == 0)
      return "0.0E+0";
    if (t < 0)
      return "-" + Za(e, -t);
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
function Er(e, t, r) {
  if (e.charCodeAt(0) === 40 && !t.match(qa)) {
    var n = t.replace(/\( */, "").replace(/ \)/, "").replace(/\)/, "");
    return r >= 0 ? Er("n", n, r) : "(" + Er("n", n, -r) + ")";
  }
  if (t.charCodeAt(t.length - 1) === 44)
    return Ol(e, t, r);
  if (t.indexOf("%") !== -1)
    return Dl(e, t, r);
  if (t.indexOf("E") !== -1)
    return Za(t, r);
  if (t.charCodeAt(0) === 36)
    return "$" + Er(e, t.substr(t.charAt(1) == " " ? 2 : 1), r);
  var a, i, s, f, o = Math.abs(r), l = r < 0 ? "-" : "";
  if (t.match(/^00+$/))
    return l + _r(o, t.length);
  if (t.match(/^[#?]+$/))
    return a = "" + r, r === 0 && (a = ""), a.length > t.length ? a : qe(t.substr(0, t.length - a.length)) + a;
  if (i = t.match(Ka))
    return Fl(i, o, l);
  if (t.match(/^#+0+$/))
    return l + _r(o, t.length - t.indexOf("0"));
  if (i = t.match(Ya))
    return a = ("" + r).replace(/^([^\.]+)$/, "$1." + qe(i[1])).replace(/\.$/, "." + qe(i[1])), a = a.replace(/\.(\d*)$/, function(m, u) {
      return "." + u + Ce("0", qe(i[1]).length - u.length);
    }), t.indexOf("0.") !== -1 ? a : a.replace(/^0\./, ".");
  if (t = t.replace(/^#+([0.])/, "$1"), i = t.match(/^(0*)\.(#*)$/))
    return l + ("" + o).replace(/\.(\d*[1-9])0*$/, ".$1").replace(/^(-?\d*)$/, "$1.").replace(/^0\./, i[1].length ? "0." : ".");
  if (i = t.match(/^#{1,3},##0(\.?)$/))
    return l + br("" + o);
  if (i = t.match(/^#,##0\.([#0]*0)$/))
    return r < 0 ? "-" + Er(e, t, -r) : br("" + r) + "." + Ce("0", i[1].length);
  if (i = t.match(/^#,#*,#0/))
    return Er(e, t.replace(/^#,#*,/, ""), r);
  if (i = t.match(/^([0#]+)(\\?-([0#]+))+$/))
    return a = ut(Er(e, t.replace(/[\\-]/g, ""), r)), s = 0, ut(ut(t.replace(/\\/g, "")).replace(/[0#]/g, function(m) {
      return s < a.length ? a.charAt(s++) : m === "0" ? "0" : "";
    }));
  if (t.match(Ja))
    return a = Er(e, "##########", r), "(" + a.substr(0, 3) + ") " + a.substr(3, 3) + "-" + a.substr(6);
  var c = "";
  if (i = t.match(/^([#0?]+)( ?)\/( ?)([#0?]+)/))
    return s = Math.min(
      /*::String(*/
      i[4].length,
      7
    ), f = xn(o, Math.pow(10, s) - 1, !1), a = "" + l, c = Dr(
      "n",
      /*::String(*/
      i[1],
      f[1]
    ), c.charAt(c.length - 1) == " " && (c = c.substr(0, c.length - 1) + "0"), a += c + /*::String(*/
    i[2] + "/" + /*::String(*/
    i[3], c = un(f[2], s), c.length < i[4].length && (c = qe(i[4].substr(i[4].length - c.length)) + c), a += c, a;
  if (i = t.match(/^# ([#0?]+)( ?)\/( ?)([#0?]+)/))
    return s = Math.min(Math.max(i[1].length, i[4].length), 7), f = xn(o, Math.pow(10, s) - 1, !0), l + (f[0] || (f[1] ? "" : "0")) + " " + (f[1] ? a0(f[1], s) + i[2] + "/" + i[3] + un(f[2], s) : Ce(" ", 2 * s + 1 + i[2].length + i[3].length));
  if (i = t.match(/^[#0?]+$/))
    return a = "" + r, t.length <= a.length ? a : qe(t.substr(0, t.length - a.length)) + a;
  if (i = t.match(/^([#0]+)\.([#0]+)$/)) {
    a = "" + r.toFixed(Math.min(i[2].length, 10)).replace(/([^0])0+$/, "$1"), s = a.indexOf(".");
    var x = t.indexOf(".") - s, h = t.length - a.length - x;
    return qe(t.substr(0, x) + a + t.substr(t.length - h));
  }
  if (i = t.match(/^00,000\.([#0]*0)$/))
    return r < 0 ? "-" + Er(e, t, -r) : br("" + r).replace(/^\d,\d{3}$/, "0$&").replace(/^\d*$/, function(m) {
      return "00," + (m.length < 3 ? _r(0, 3 - m.length) : "") + m;
    }) + "." + _r(0, i[1].length);
  switch (t) {
    case "###,###":
    case "##,###":
    case "#,###":
      var d = br("" + o);
      return d !== "0" ? l + d : "";
    default:
      if (t.match(/\.[0#?]*$/))
        return Er(e, t.slice(0, t.lastIndexOf(".")), r) + qe(t.slice(t.lastIndexOf(".")));
  }
  throw new Error("unsupported format |" + t + "|");
}
function Dr(e, t, r) {
  return (r | 0) === r ? Er(e, t, r) : ur(e, t, r);
}
function Rl(e) {
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
var Qa = /\[[HhMmSs\u0E0A\u0E19\u0E17]*\]/;
function ei(e) {
  for (var t = 0, r = "", n = ""; t < e.length; )
    switch (r = e.charAt(t)) {
      case "G":
        hn(e, t) && (t += 6), t++;
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
        if (n.match(Qa))
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
function kl(e, t, r, n) {
  for (var a = [], i = "", s = 0, f = "", o = "t", l, c, x, h = "H"; s < e.length; )
    switch (f = e.charAt(s)) {
      case "G":
        if (!hn(e, s))
          throw new Error("unrecognized character " + f + " in " + e);
        a[a.length] = { t: "G", v: "General" }, s += 7;
        break;
      case '"':
        for (i = ""; (x = e.charCodeAt(++s)) !== 34 && s < e.length; )
          i += String.fromCharCode(x);
        a[a.length] = { t: "t", v: i }, ++s;
        break;
      case "\\":
        var d = e.charAt(++s), m = d === "(" || d === ")" ? d : "t";
        a[a.length] = { t: m, v: d }, ++s;
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
          if (l == null && (l = Qt(t, r, e.charAt(s + 1) === "2"), l == null))
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
        if (t < 0 || l == null && (l = Qt(t, r), l == null))
          return "";
        for (i = f; ++s < e.length && e.charAt(s).toLowerCase() === f; )
          i += f;
        f === "m" && o.toLowerCase() === "h" && (f = "M"), f === "h" && (f = h), a[a.length] = { t: f, v: i }, o = f;
        break;
      case "A":
      case "a":
      case "上":
        var u = { t: f, v: f };
        if (l == null && (l = Qt(t, r)), e.substr(s, 3).toUpperCase() === "A/P" ? (l != null && (u.v = l.H >= 12 ? "P" : "A"), u.t = "T", h = "h", s += 3) : e.substr(s, 5).toUpperCase() === "AM/PM" ? (l != null && (u.v = l.H >= 12 ? "PM" : "AM"), u.t = "T", s += 5, h = "h") : e.substr(s, 5).toUpperCase() === "上午/下午" ? (l != null && (u.v = l.H >= 12 ? "下午" : "上午"), u.t = "T", s += 5, h = "h") : (u.t = "t", ++s), l == null && u.t === "T")
          return "";
        a[a.length] = u, o = f;
        break;
      case "[":
        for (i = f; e.charAt(s++) !== "]" && s < e.length; )
          i += e.charAt(s);
        if (i.slice(-1) !== "]")
          throw 'unterminated "[" block: |' + i + "|";
        if (i.match(Qa)) {
          if (l == null && (l = Qt(t, r), l == null))
            return "";
          a[a.length] = { t: "Z", v: i.toLowerCase() }, o = i.charAt(1);
        } else
          i.indexOf("$") > -1 && (i = (i.match(/\$([^-\[\]]*)/) || [])[1] || "$", ei(e) || (a[a.length] = { t: "t", v: i }));
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
  var g = 0, F = 0, O;
  for (s = a.length - 1, o = "t"; s >= 0; --s)
    switch (a[s].t) {
      case "h":
      case "H":
        a[s].t = h, o = "h", g < 1 && (g = 1);
        break;
      case "s":
        (O = a[s].v.match(/\.0+$/)) && (F = Math.max(F, O[0].length - 1)), g < 3 && (g = 3);
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
  var y = "", L;
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
        a[s].v = wl(a[s].t.charCodeAt(0), a[s].v, l, F), a[s].t = "t";
        break;
      case "n":
      case "?":
        for (L = s + 1; a[L] != null && ((f = a[L].t) === "?" || f === "D" || (f === " " || f === "t") && a[L + 1] != null && (a[L + 1].t === "?" || a[L + 1].t === "t" && a[L + 1].v === "/") || a[s].t === "(" && (f === " " || f === "n" || f === ")") || f === "t" && (a[L].v === "/" || a[L].v === " " && a[L + 1] != null && a[L + 1].t == "?")); )
          a[s].v += a[L].v, a[L] = { v: "", t: ";" }, ++L;
        y += a[s].v, s = L - 1;
        break;
      case "G":
        a[s].t = "t", a[s].v = qn(t, r);
        break;
    }
  var z = "", ee, D;
  if (y.length > 0) {
    y.charCodeAt(0) == 40 ? (ee = t < 0 && y.charCodeAt(0) === 45 ? -t : t, D = Dr("n", y, ee)) : (ee = t < 0 && n > 1 ? -t : t, D = Dr("n", y, ee), ee < 0 && a[0] && a[0].t == "t" && (D = D.substr(1), a[0].v = "-" + a[0].v)), L = D.length - 1;
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
          for (c = a[s].v.indexOf(".") > -1 && s === U ? a[s].v.indexOf(".") - 1 : a[s].v.length - 1, z = a[s].v.substr(c + 1); c >= 0; --c)
            L >= 0 && (a[s].v.charAt(c) === "0" || a[s].v.charAt(c) === "#") && (z = D.charAt(L--) + z);
          a[s].v = z, a[s].t = "t", M = s;
        }
      for (L >= 0 && M < a.length && (a[M].v = D.substr(0, L + 1) + a[M].v), L = D.indexOf(".") + 1, s = U; s < a.length; ++s)
        if (!(a[s] == null || "n?(".indexOf(a[s].t) === -1 && s !== U)) {
          for (c = a[s].v.indexOf(".") > -1 && s === U ? a[s].v.indexOf(".") + 1 : 0, z = a[s].v.substr(0, c); c < a[s].v.length; ++c)
            L < D.length && (z += D.charAt(L++));
          a[s].v = z, a[s].t = "t", M = s;
        }
    }
  }
  for (s = 0; s < a.length; ++s)
    a[s] != null && "n?".indexOf(a[s].t) > -1 && (ee = n > 1 && t < 0 && s > 0 && a[s - 1].v === "-" ? -t : t, a[s].v = Dr(a[s].t, a[s].v, ee), a[s].t = "t");
  var V = "";
  for (s = 0; s !== a.length; ++s)
    a[s] != null && (V += a[s].v);
  return V;
}
var Y0 = /\[(=|>[=]?|<[>=]?)(-?\d+(?:\.\d*)?)\]/;
function q0(e, t) {
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
function Il(e, t) {
  var r = Rl(e), n = r.length, a = r[n - 1].indexOf("@");
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
    var s = r[0].match(Y0), f = r[1].match(Y0);
    return q0(t, s) ? [n, r[0]] : q0(t, f) ? [n, r[1]] : [n, r[s != null && f != null ? 2 : 1]];
  }
  return [n, i];
}
function Wr(e, t, r) {
  r == null && (r = {});
  var n = "";
  switch (typeof e) {
    case "string":
      e == "m/d/yy" && r.dateNF ? n = r.dateNF : n = e;
      break;
    case "number":
      e == 14 && r.dateNF ? n = r.dateNF : n = (r.table != null ? r.table : Oe)[e], n == null && (n = r.table && r.table[z0[e]] || Oe[z0[e]]), n == null && (n = xl[e] || "General");
      break;
  }
  if (hn(n, 0))
    return qn(t, r);
  t instanceof Date && (t = ja(t, r.date1904));
  var a = Il(n, t);
  if (hn(a[1]))
    return qn(t, r);
  if (t === !0)
    t = "TRUE";
  else if (t === !1)
    t = "FALSE";
  else if (t === "" || t == null)
    return "";
  return kl(a[1], t, r, a[0]);
}
function ri(e, t) {
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
function yn(e) {
  for (var t = 0; t != 392; ++t)
    e[t] !== void 0 && ri(e[t], t);
}
function Cn() {
  Oe = hl();
}
var ti = /[dD]+|[mM]+|[yYeE]+|[Hh]+|[Ss]+/g;
function Nl(e) {
  var t = typeof e == "number" ? Oe[e] : e;
  return t = t.replace(ti, "(\\d+)"), new RegExp("^" + t + "$");
}
function Pl(e, t, r) {
  var n = -1, a = -1, i = -1, s = -1, f = -1, o = -1;
  (t.match(ti) || []).forEach(function(x, h) {
    var d = parseInt(r[h + 1], 10);
    switch (x.toLowerCase().charAt(0)) {
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
        o = d;
        break;
      case "m":
        s >= 0 ? f = d : a = d;
        break;
    }
  }), o >= 0 && f == -1 && a >= 0 && (f = a, a = -1);
  var l = ("" + (n >= 0 ? n : new Date().getFullYear())).slice(-4) + "-" + ("00" + (a >= 1 ? a : 1)).slice(-2) + "-" + ("00" + (i >= 1 ? i : 1)).slice(-2);
  l.length == 7 && (l = "0" + l), l.length == 8 && (l = "20" + l);
  var c = ("00" + (s >= 0 ? s : 0)).slice(-2) + ":" + ("00" + (f >= 0 ? f : 0)).slice(-2) + ":" + ("00" + (o >= 0 ? o : 0)).slice(-2);
  return s == -1 && f == -1 && o == -1 ? l : n == -1 && a == -1 && i == -1 ? c : l + "T" + c;
}
var Ll = /* @__PURE__ */ function() {
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
    var K = [];
    for (V = 1; V != 16; ++V)
      K[V - 1] = typeof Int32Array < "u" ? G.subarray(V * 256, V * 256 + 256) : G.slice(V * 256, V * 256 + 256);
    return K;
  }
  var a = n(r), i = a[0], s = a[1], f = a[2], o = a[3], l = a[4], c = a[5], x = a[6], h = a[7], d = a[8], m = a[9], u = a[10], g = a[11], F = a[12], O = a[13], y = a[14];
  function L(D, U) {
    for (var M = U ^ -1, V = 0, G = D.length; V < G; )
      M = M >>> 8 ^ r[(M ^ D.charCodeAt(V++)) & 255];
    return ~M;
  }
  function z(D, U) {
    for (var M = U ^ -1, V = D.length - 15, G = 0; G < V; )
      M = y[D[G++] ^ M & 255] ^ O[D[G++] ^ M >> 8 & 255] ^ F[D[G++] ^ M >> 16 & 255] ^ g[D[G++] ^ M >>> 24] ^ u[D[G++]] ^ m[D[G++]] ^ d[D[G++]] ^ h[D[G++]] ^ x[D[G++]] ^ c[D[G++]] ^ l[D[G++]] ^ o[D[G++]] ^ f[D[G++]] ^ s[D[G++]] ^ i[D[G++]] ^ r[D[G++]];
    for (V += 15; G < V; )
      M = M >>> 8 ^ r[(M ^ D[G++]) & 255];
    return ~M;
  }
  function ee(D, U) {
    for (var M = U ^ -1, V = 0, G = D.length, K = 0, te = 0; V < G; )
      K = D.charCodeAt(V++), K < 128 ? M = M >>> 8 ^ r[(M ^ K) & 255] : K < 2048 ? (M = M >>> 8 ^ r[(M ^ (192 | K >> 6 & 31)) & 255], M = M >>> 8 ^ r[(M ^ (128 | K & 63)) & 255]) : K >= 55296 && K < 57344 ? (K = (K & 1023) + 64, te = D.charCodeAt(V++) & 1023, M = M >>> 8 ^ r[(M ^ (240 | K >> 8 & 7)) & 255], M = M >>> 8 ^ r[(M ^ (128 | K >> 2 & 63)) & 255], M = M >>> 8 ^ r[(M ^ (128 | te >> 6 & 15 | (K & 3) << 4)) & 255], M = M >>> 8 ^ r[(M ^ (128 | te & 63)) & 255]) : (M = M >>> 8 ^ r[(M ^ (224 | K >> 12 & 15)) & 255], M = M >>> 8 ^ r[(M ^ (128 | K >> 6 & 63)) & 255], M = M >>> 8 ^ r[(M ^ (128 | K & 63)) & 255]);
    return ~M;
  }
  return e.table = r, e.bstr = L, e.buf = z, e.str = ee, e;
}(), we = /* @__PURE__ */ function() {
  var t = {};
  t.version = "1.2.1";
  function r(p, T) {
    for (var v = p.split("/"), _ = T.split("/"), w = 0, E = 0, k = Math.min(v.length, _.length); w < k; ++w) {
      if (E = v[w].length - _[w].length)
        return E;
      if (v[w] != _[w])
        return v[w] < _[w] ? -1 : 1;
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
    var T = p.read_shift(2) & 65535, v = p.read_shift(2) & 65535, _ = new Date(), w = v & 31;
    v >>>= 5;
    var E = v & 15;
    v >>>= 4, _.setMilliseconds(0), _.setFullYear(v + 1980), _.setMonth(E - 1), _.setDate(w);
    var k = T & 31;
    T >>>= 5;
    var b = T & 63;
    return T >>>= 6, _.setHours(T), _.setMinutes(b), _.setSeconds(k << 1), _;
  }
  function f(p) {
    ar(p, 0);
    for (var T = (
      /*::(*/
      {}
    ), v = 0; p.l <= p.length - 4; ) {
      var _ = p.read_shift(2), w = p.read_shift(2), E = p.l + w, k = {};
      switch (_) {
        case 21589:
          v = p.read_shift(1), v & 1 && (k.mtime = p.read_shift(4)), w > 5 && (v & 2 && (k.atime = p.read_shift(4)), v & 4 && (k.ctime = p.read_shift(4))), k.mtime && (k.mt = new Date(k.mtime * 1e3));
          break;
      }
      p.l = E, T[_] = k;
    }
    return T;
  }
  var o;
  function l() {
    return o || (o = {});
  }
  function c(p, T) {
    if (p[0] == 80 && p[1] == 75)
      return P0(p, T);
    if ((p[0] | 32) == 109 && (p[1] | 32) == 105)
      return Is(p, T);
    if (p.length < 512)
      throw new Error("CFB file size " + p.length + " < 512");
    var v = 3, _ = 512, w = 0, E = 0, k = 0, b = 0, R = 0, I = [], N = (
      /*::(*/
      p.slice(0, 512)
    );
    ar(N, 0);
    var X = x(N);
    switch (v = X[0], v) {
      case 3:
        _ = 512;
        break;
      case 4:
        _ = 4096;
        break;
      case 0:
        if (X[1] == 0)
          return P0(p, T);
      default:
        throw new Error("Major Version: Expected 3 or 4 saw " + v);
    }
    _ !== 512 && (N = /*::(*/
    p.slice(0, _), ar(
      N,
      28
      /* blob.l */
    ));
    var Z = p.slice(0, _);
    h(N, v);
    var ne = N.read_shift(4, "i");
    if (v === 3 && ne !== 0)
      throw new Error("# Directory Sectors: Expected 0 saw " + ne);
    N.l += 4, k = N.read_shift(4, "i"), N.l += 4, N.chk("00100000", "Mini Stream Cutoff Size: "), b = N.read_shift(4, "i"), w = N.read_shift(4, "i"), R = N.read_shift(4, "i"), E = N.read_shift(4, "i");
    for (var Y = -1, re = 0; re < 109 && (Y = N.read_shift(4, "i"), !(Y < 0)); ++re)
      I[re] = Y;
    var le = d(p, _);
    g(R, E, le, _, I);
    var Ae = O(le, k, I, _);
    Ae[k].name = "!Directory", w > 0 && b !== te && (Ae[b].name = "!MiniFAT"), Ae[I[0]].name = "!FAT", Ae.fat_addrs = I, Ae.ssz = _;
    var Fe = {}, ze = [], St = [], At = [];
    y(k, Ae, le, ze, w, Fe, St, b), m(St, At, ze), ze.shift();
    var Ft = {
      FileIndex: St,
      FullPaths: At
    };
    return T && T.raw && (Ft.raw = { header: Z, sectors: le }), Ft;
  }
  function x(p) {
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
    for (var v = Math.ceil(p.length / T) - 1, _ = [], w = 1; w < v; ++w)
      _[w - 1] = p.slice(w * T, (w + 1) * T);
    return _[v - 1] = p.slice(v * T), _;
  }
  function m(p, T, v) {
    for (var _ = 0, w = 0, E = 0, k = 0, b = 0, R = v.length, I = [], N = []; _ < R; ++_)
      I[_] = N[_] = _, T[_] = v[_];
    for (; b < N.length; ++b)
      _ = N[b], w = p[_].L, E = p[_].R, k = p[_].C, I[_] === _ && (w !== -1 && I[w] !== w && (I[_] = I[w]), E !== -1 && I[E] !== E && (I[_] = I[E])), k !== -1 && (I[k] = _), w !== -1 && _ != I[_] && (I[w] = I[_], N.lastIndexOf(w) < b && N.push(w)), E !== -1 && _ != I[_] && (I[E] = I[_], N.lastIndexOf(E) < b && N.push(E));
    for (_ = 1; _ < R; ++_)
      I[_] === _ && (E !== -1 && I[E] !== E ? I[_] = I[E] : w !== -1 && I[w] !== w && (I[_] = I[w]));
    for (_ = 1; _ < R; ++_)
      if (p[_].type !== 0) {
        if (b = _, b != I[b])
          do
            b = I[b], T[_] = T[b] + "/" + T[_];
          while (b !== 0 && I[b] !== -1 && b != I[b]);
        I[_] = -1;
      }
    for (T[0] += "/", _ = 1; _ < R; ++_)
      p[_].type !== 2 && (T[_] += "/");
  }
  function u(p, T, v) {
    for (var _ = p.start, w = p.size, E = [], k = _; v && w > 0 && k >= 0; )
      E.push(T.slice(k * K, k * K + K)), w -= K, k = Yr(v, k * 4);
    return E.length === 0 ? B(0) : Ve(E).slice(0, p.size);
  }
  function g(p, T, v, _, w) {
    var E = te;
    if (p === te) {
      if (T !== 0)
        throw new Error("DIFAT chain shorter than expected");
    } else if (p !== -1) {
      var k = v[p], b = (_ >>> 2) - 1;
      if (!k)
        return;
      for (var R = 0; R < b && (E = Yr(k, R * 4)) !== te; ++R)
        w.push(E);
      g(Yr(k, _ - 4), T - 1, v, _, w);
    }
  }
  function F(p, T, v, _, w) {
    var E = [], k = [];
    w || (w = []);
    var b = _ - 1, R = 0, I = 0;
    for (R = T; R >= 0; ) {
      w[R] = !0, E[E.length] = R, k.push(p[R]);
      var N = v[Math.floor(R * 4 / _)];
      if (I = R * 4 & b, _ < 4 + I)
        throw new Error("FAT boundary crossed: " + R + " 4 " + _);
      if (!p[N])
        break;
      R = Yr(p[N], I);
    }
    return { nodes: E, data: aa([k]) };
  }
  function O(p, T, v, _) {
    var w = p.length, E = [], k = [], b = [], R = [], I = _ - 1, N = 0, X = 0, Z = 0, ne = 0;
    for (N = 0; N < w; ++N)
      if (b = [], Z = N + T, Z >= w && (Z -= w), !k[Z]) {
        R = [];
        var Y = [];
        for (X = Z; X >= 0; ) {
          Y[X] = !0, k[X] = !0, b[b.length] = X, R.push(p[X]);
          var re = v[Math.floor(X * 4 / _)];
          if (ne = X * 4 & I, _ < 4 + ne)
            throw new Error("FAT boundary crossed: " + X + " 4 " + _);
          if (!p[re] || (X = Yr(p[re], ne), Y[X]))
            break;
        }
        E[Z] = { nodes: b, data: aa([R]) };
      }
    return E;
  }
  function y(p, T, v, _, w, E, k, b) {
    for (var R = 0, I = _.length ? 2 : 0, N = T[p].data, X = 0, Z = 0, ne; X < N.length; X += 128) {
      var Y = (
        /*::(*/
        N.slice(X, X + 128)
      );
      ar(Y, 64), Z = Y.read_shift(2), ne = c0(Y, 0, Z - I), _.push(ne);
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
      le !== 0 && (re.ct = L(Y, Y.l - 8));
      var Ae = Y.read_shift(2) + Y.read_shift(2) + Y.read_shift(2) + Y.read_shift(2);
      Ae !== 0 && (re.mt = L(Y, Y.l - 8)), re.start = Y.read_shift(4, "i"), re.size = Y.read_shift(4, "i"), re.size < 0 && re.start < 0 && (re.size = re.type = 0, re.start = te, re.name = ""), re.type === 5 ? (R = re.start, w > 0 && R !== te && (T[R].name = "!StreamData")) : re.size >= 4096 ? (re.storage = "fat", T[re.start] === void 0 && (T[re.start] = F(v, re.start, T.fat_addrs, T.ssz)), T[re.start].name = re.name, re.content = T[re.start].data.slice(0, re.size)) : (re.storage = "minifat", re.size < 0 ? re.size = 0 : R !== te && re.start !== te && T[R] && (re.content = u(re, T[R].data, (T[b] || {}).data))), re.content && ar(re.content, 0), E[ne] = re, k.push(re);
    }
  }
  function L(p, T) {
    return new Date((sr(p, T + 4) / 1e7 * Math.pow(2, 32) + sr(p, T) / 1e7 - 11644473600) * 1e3);
  }
  function z(p, T) {
    return l(), c(o.readFileSync(p), T);
  }
  function ee(p, T) {
    var v = T && T.type;
    switch (v || de && Buffer.isBuffer(p) && (v = "buffer"), v || "base64") {
      case "file":
        return z(p, T);
      case "base64":
        return c(gr(Ir(p)), T);
      case "binary":
        return c(gr(p), T);
    }
    return c(
      /*::typeof blob == 'string' ? new Buffer(blob, 'utf-8') : */
      p,
      T
    );
  }
  function D(p, T) {
    var v = T || {}, _ = v.root || "Root Entry";
    if (p.FullPaths || (p.FullPaths = []), p.FileIndex || (p.FileIndex = []), p.FullPaths.length !== p.FileIndex.length)
      throw new Error("inconsistent CFB structure");
    p.FullPaths.length === 0 && (p.FullPaths[0] = _ + "/", p.FileIndex[0] = { name: _, type: 5 }), v.CLSID && (p.FileIndex[0].clsid = v.CLSID), U(p);
  }
  function U(p) {
    var T = "Sh33tJ5";
    if (!we.find(p, "/" + T)) {
      var v = B(4);
      v[0] = 55, v[1] = v[3] = 50, v[2] = 54, p.FileIndex.push({ name: T, type: 2, content: v, size: 4, L: 69, R: 69, C: 69 }), p.FullPaths.push(p.FullPaths[0] + T), M(p);
    }
  }
  function M(p, T) {
    D(p);
    for (var v = !1, _ = !1, w = p.FullPaths.length - 1; w >= 0; --w) {
      var E = p.FileIndex[w];
      switch (E.type) {
        case 0:
          _ ? v = !0 : (p.FileIndex.pop(), p.FullPaths.pop());
          break;
        case 1:
        case 2:
        case 5:
          _ = !0, isNaN(E.R * E.L * E.C) && (v = !0), E.R > -1 && E.L > -1 && E.R == E.L && (v = !0);
          break;
        default:
          v = !0;
          break;
      }
    }
    if (!(!v && !T)) {
      var k = new Date(1987, 1, 19), b = 0, R = Object.create ? /* @__PURE__ */ Object.create(null) : {}, I = [];
      for (w = 0; w < p.FullPaths.length; ++w)
        R[p.FullPaths[w]] = !0, p.FileIndex[w].type !== 0 && I.push([p.FullPaths[w], p.FileIndex[w]]);
      for (w = 0; w < I.length; ++w) {
        var N = n(I[w][0]);
        _ = R[N], _ || (I.push([N, {
          name: a(N).replace("/", ""),
          type: 1,
          clsid: Ue,
          ct: k,
          mt: k,
          content: null
        }]), R[N] = !0);
      }
      for (I.sort(function(ne, Y) {
        return r(ne[0], Y[0]);
      }), p.FullPaths = [], p.FileIndex = [], w = 0; w < I.length; ++w)
        p.FullPaths[w] = I[w][0], p.FileIndex[w] = I[w][1];
      for (w = 0; w < I.length; ++w) {
        var X = p.FileIndex[w], Z = p.FullPaths[w];
        if (X.name = a(Z).replace("/", ""), X.L = X.R = X.C = -(X.color = 1), X.size = X.content ? X.content.length : 0, X.start = 0, X.clsid = X.clsid || Ue, w === 0)
          X.C = I.length > 1 ? 1 : -1, X.size = 0, X.type = 5;
        else if (Z.slice(-1) == "/") {
          for (b = w + 1; b < I.length && n(p.FullPaths[b]) != Z; ++b)
            ;
          for (X.C = b >= I.length ? -1 : b, b = w + 1; b < I.length && n(p.FullPaths[b]) != n(Z); ++b)
            ;
          X.R = b >= I.length ? -1 : b, X.type = 1;
        } else
          n(p.FullPaths[w + 1] || "") == n(Z) && (X.R = w + 1), X.type = 2;
      }
    }
  }
  function V(p, T) {
    var v = T || {};
    if (v.fileType == "mad")
      return Ns(p, v);
    switch (M(p), v.fileType) {
      case "zip":
        return ys(p, v);
    }
    var _ = function(ne) {
      for (var Y = 0, re = 0, le = 0; le < ne.FileIndex.length; ++le) {
        var Ae = ne.FileIndex[le];
        if (Ae.content) {
          var Fe = Ae.content.length;
          Fe > 0 && (Fe < 4096 ? Y += Fe + 63 >> 6 : re += Fe + 511 >> 9);
        }
      }
      for (var ze = ne.FullPaths.length + 3 >> 2, St = Y + 7 >> 3, At = Y + 127 >> 7, Ft = St + re + ze + At, $r = Ft + 127 >> 7, Bn = $r <= 109 ? 0 : Math.ceil(($r - 109) / 127); Ft + $r + Bn + 127 >> 7 > $r; )
        Bn = ++$r <= 109 ? 0 : Math.ceil(($r - 109) / 127);
      var Cr = [1, Bn, $r, At, ze, re, Y, 0];
      return ne.FileIndex[0].size = Y << 6, Cr[7] = (ne.FileIndex[0].start = Cr[0] + Cr[1] + Cr[2] + Cr[3] + Cr[4] + Cr[5]) + (Cr[6] + 7 >> 3), Cr;
    }(p), w = B(_[7] << 9), E = 0, k = 0;
    {
      for (E = 0; E < 8; ++E)
        w.write_shift(1, oe[E]);
      for (E = 0; E < 8; ++E)
        w.write_shift(2, 0);
      for (w.write_shift(2, 62), w.write_shift(2, 3), w.write_shift(2, 65534), w.write_shift(2, 9), w.write_shift(2, 6), E = 0; E < 3; ++E)
        w.write_shift(2, 0);
      for (w.write_shift(4, 0), w.write_shift(4, _[2]), w.write_shift(4, _[0] + _[1] + _[2] + _[3] - 1), w.write_shift(4, 0), w.write_shift(4, 1 << 12), w.write_shift(4, _[3] ? _[0] + _[1] + _[2] - 1 : te), w.write_shift(4, _[3]), w.write_shift(-4, _[1] ? _[0] - 1 : te), w.write_shift(4, _[1]), E = 0; E < 109; ++E)
        w.write_shift(-4, E < _[2] ? _[1] + E : -1);
    }
    if (_[1])
      for (k = 0; k < _[1]; ++k) {
        for (; E < 236 + k * 127; ++E)
          w.write_shift(-4, E < _[2] ? _[1] + E : -1);
        w.write_shift(-4, k === _[1] - 1 ? te : k + 1);
      }
    var b = function(ne) {
      for (k += ne; E < k - 1; ++E)
        w.write_shift(-4, E + 1);
      ne && (++E, w.write_shift(-4, te));
    };
    for (k = E = 0, k += _[1]; E < k; ++E)
      w.write_shift(-4, De.DIFSECT);
    for (k += _[2]; E < k; ++E)
      w.write_shift(-4, De.FATSECT);
    b(_[3]), b(_[4]);
    for (var R = 0, I = 0, N = p.FileIndex[0]; R < p.FileIndex.length; ++R)
      N = p.FileIndex[R], N.content && (I = N.content.length, !(I < 4096) && (N.start = k, b(I + 511 >> 9)));
    for (b(_[6] + 7 >> 3); w.l & 511; )
      w.write_shift(-4, De.ENDOFCHAIN);
    for (k = E = 0, R = 0; R < p.FileIndex.length; ++R)
      N = p.FileIndex[R], N.content && (I = N.content.length, !(!I || I >= 4096) && (N.start = k, b(I + 63 >> 6)));
    for (; w.l & 511; )
      w.write_shift(-4, De.ENDOFCHAIN);
    for (E = 0; E < _[4] << 2; ++E) {
      var X = p.FullPaths[E];
      if (!X || X.length === 0) {
        for (R = 0; R < 17; ++R)
          w.write_shift(4, 0);
        for (R = 0; R < 3; ++R)
          w.write_shift(4, -1);
        for (R = 0; R < 12; ++R)
          w.write_shift(4, 0);
        continue;
      }
      N = p.FileIndex[E], E === 0 && (N.start = N.size ? N.start - 1 : te);
      var Z = E === 0 && v.root || N.name;
      if (I = 2 * (Z.length + 1), w.write_shift(64, Z, "utf16le"), w.write_shift(2, I), w.write_shift(1, N.type), w.write_shift(1, N.color), w.write_shift(-4, N.L), w.write_shift(-4, N.R), w.write_shift(-4, N.C), N.clsid)
        w.write_shift(16, N.clsid, "hex");
      else
        for (R = 0; R < 4; ++R)
          w.write_shift(4, 0);
      w.write_shift(4, N.state || 0), w.write_shift(4, 0), w.write_shift(4, 0), w.write_shift(4, 0), w.write_shift(4, 0), w.write_shift(4, N.start), w.write_shift(4, N.size), w.write_shift(4, 0);
    }
    for (E = 1; E < p.FileIndex.length; ++E)
      if (N = p.FileIndex[E], N.size >= 4096)
        if (w.l = N.start + 1 << 9, de && Buffer.isBuffer(N.content))
          N.content.copy(w, w.l, 0, N.size), w.l += N.size + 511 & -512;
        else {
          for (R = 0; R < N.size; ++R)
            w.write_shift(1, N.content[R]);
          for (; R & 511; ++R)
            w.write_shift(1, 0);
        }
    for (E = 1; E < p.FileIndex.length; ++E)
      if (N = p.FileIndex[E], N.size > 0 && N.size < 4096)
        if (de && Buffer.isBuffer(N.content))
          N.content.copy(w, w.l, 0, N.size), w.l += N.size + 63 & -64;
        else {
          for (R = 0; R < N.size; ++R)
            w.write_shift(1, N.content[R]);
          for (; R & 63; ++R)
            w.write_shift(1, 0);
        }
    if (de)
      w.l = w.length;
    else
      for (; w.l < w.length; )
        w.write_shift(1, 0);
    return w;
  }
  function G(p, T) {
    var v = p.FullPaths.map(function(R) {
      return R.toUpperCase();
    }), _ = v.map(function(R) {
      var I = R.split("/");
      return I[I.length - (R.slice(-1) == "/" ? 2 : 1)];
    }), w = !1;
    T.charCodeAt(0) === 47 ? (w = !0, T = v[0].slice(0, -1) + T) : w = T.indexOf("/") !== -1;
    var E = T.toUpperCase(), k = w === !0 ? v.indexOf(E) : _.indexOf(E);
    if (k !== -1)
      return p.FileIndex[k];
    var b = !E.match(Zt);
    for (E = E.replace(Dt, ""), b && (E = E.replace(Zt, "!")), k = 0; k < v.length; ++k)
      if ((b ? v[k].replace(Zt, "!") : v[k]).replace(Dt, "") == E || (b ? _[k].replace(Zt, "!") : _[k]).replace(Dt, "") == E)
        return p.FileIndex[k];
    return null;
  }
  var K = 64, te = -2, Te = "d0cf11e0a1b11ae1", oe = [208, 207, 17, 224, 161, 177, 26, 225], Ue = "00000000000000000000000000000000", De = {
    /* 2.1 Compund File Sector Numbers and Types */
    MAXREGSECT: -6,
    DIFSECT: -4,
    FATSECT: -3,
    ENDOFCHAIN: te,
    FREESECT: -1,
    /* 2.2 Compound File Header */
    HEADER_SIGNATURE: Te,
    HEADER_MINOR_VERSION: "3e00",
    MAXREGSID: -6,
    NOSTREAM: -1,
    HEADER_CLSID: Ue,
    /* 2.6.1 Compound File Directory Entry */
    EntryTypes: ["unknown", "storage", "stream", "lockbytes", "property", "root"]
  };
  function dr(p, T, v) {
    l();
    var _ = V(p, v);
    o.writeFileSync(T, _);
  }
  function Pe(p) {
    for (var T = new Array(p.length), v = 0; v < p.length; ++v)
      T[v] = String.fromCharCode(p[v]);
    return T.join("");
  }
  function or(p, T) {
    var v = V(p, T);
    switch (T && T.type || "buffer") {
      case "file":
        return l(), o.writeFileSync(T.filename, v), v;
      case "binary":
        return typeof v == "string" ? v : Pe(v);
      case "base64":
        return Bt(typeof v == "string" ? v : Pe(v));
      case "buffer":
        if (de)
          return Buffer.isBuffer(v) ? v : Pr(v);
      case "array":
        return typeof v == "string" ? gr(v) : v;
    }
    return v;
  }
  var tr;
  function S(p) {
    try {
      var T = p.InflateRaw, v = new T();
      if (v._processChunk(new Uint8Array([3, 0]), v._finishFlushFlag), v.bytesRead)
        tr = p;
      else
        throw new Error("zlib does not expose bytesRead");
    } catch (_) {
      console.error("cannot use native zlib: " + (_.message || _));
    }
  }
  function P(p, T) {
    if (!tr)
      return I0(p, T);
    var v = tr.InflateRaw, _ = new v(), w = _._processChunk(p.slice(p.l), _._finishFlushFlag);
    return p.l += _.bytesRead, w;
  }
  function C(p) {
    return tr ? tr.deflateRawSync(p) : y0(p);
  }
  var A = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], W = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258], se = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577];
  function fe(p) {
    var T = (p << 1 | p << 11) & 139536 | (p << 5 | p << 15) & 558144;
    return (T >> 16 | T >> 8 | T) & 255;
  }
  for (var ie = typeof Uint8Array < "u", Q = ie ? new Uint8Array(1 << 8) : [], Ee = 0; Ee < 1 << 8; ++Ee)
    Q[Ee] = fe(Ee);
  function he(p, T) {
    var v = Q[p & 255];
    return T <= 8 ? v >>> 8 - T : (v = v << 8 | Q[p >> 8 & 255], T <= 16 ? v >>> 16 - T : (v = v << 8 | Q[p >> 16 & 255], v >>> 24 - T));
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
  function ye(p, T) {
    var v = T & 7, _ = T >>> 3;
    return (p[_] | (v <= 3 ? 0 : p[_ + 1] << 8)) >>> v & 31;
  }
  function ae(p, T) {
    var v = T & 7, _ = T >>> 3;
    return (p[_] | (v <= 1 ? 0 : p[_ + 1] << 8)) >>> v & 127;
  }
  function cr(p, T, v) {
    var _ = T & 7, w = T >>> 3, E = (1 << v) - 1, k = p[w] >>> _;
    return v < 8 - _ || (k |= p[w + 1] << 8 - _, v < 16 - _) || (k |= p[w + 2] << 16 - _, v < 24 - _) || (k |= p[w + 3] << 24 - _), k & E;
  }
  function yr(p, T, v) {
    var _ = T & 7, w = T >>> 3;
    return _ <= 5 ? p[w] |= (v & 7) << _ : (p[w] |= v << _ & 255, p[w + 1] = (v & 7) >> 8 - _), T + 3;
  }
  function jr(p, T, v) {
    var _ = T & 7, w = T >>> 3;
    return v = (v & 1) << _, p[w] |= v, T + 1;
  }
  function it(p, T, v) {
    var _ = T & 7, w = T >>> 3;
    return v <<= _, p[w] |= v & 255, v >>>= 8, p[w + 1] = v, T + 8;
  }
  function F0(p, T, v) {
    var _ = T & 7, w = T >>> 3;
    return v <<= _, p[w] |= v & 255, v >>>= 8, p[w + 1] = v & 255, p[w + 2] = v >>> 8, T + 16;
  }
  function Nn(p, T) {
    var v = p.length, _ = 2 * v > T ? 2 * v : T + 5, w = 0;
    if (v >= T)
      return p;
    if (de) {
      var E = G0(_);
      if (p.copy)
        p.copy(E);
      else
        for (; w < p.length; ++w)
          E[w] = p[w];
      return E;
    } else if (ie) {
      var k = new Uint8Array(_);
      if (k.set)
        k.set(p);
      else
        for (; w < v; ++w)
          k[w] = p[w];
      return k;
    }
    return p.length = _, p;
  }
  function wr(p) {
    for (var T = new Array(p), v = 0; v < p; ++v)
      T[v] = 0;
    return T;
  }
  function Yt(p, T, v) {
    var _ = 1, w = 0, E = 0, k = 0, b = 0, R = p.length, I = ie ? new Uint16Array(32) : wr(32);
    for (E = 0; E < 32; ++E)
      I[E] = 0;
    for (E = R; E < v; ++E)
      p[E] = 0;
    R = p.length;
    var N = ie ? new Uint16Array(R) : wr(R);
    for (E = 0; E < R; ++E)
      I[w = p[E]]++, _ < w && (_ = w), N[E] = 0;
    for (I[0] = 0, E = 1; E <= _; ++E)
      I[E + 16] = b = b + I[E - 1] << 1;
    for (E = 0; E < R; ++E)
      b = p[E], b != 0 && (N[E] = I[b + 16]++);
    var X = 0;
    for (E = 0; E < R; ++E)
      if (X = p[E], X != 0)
        for (b = he(N[E], _) >> _ - X, k = (1 << _ + 4 - X) - 1; k >= 0; --k)
          T[b | k << X] = X & 15 | E << 4;
    return _;
  }
  var Pn = ie ? new Uint16Array(512) : wr(512), Ln = ie ? new Uint16Array(32) : wr(32);
  if (!ie) {
    for (var zr = 0; zr < 512; ++zr)
      Pn[zr] = 0;
    for (zr = 0; zr < 32; ++zr)
      Ln[zr] = 0;
  }
  (function() {
    for (var p = [], T = 0; T < 32; T++)
      p.push(5);
    Yt(p, Ln, 32);
    var v = [];
    for (T = 0; T <= 143; T++)
      v.push(8);
    for (; T <= 255; T++)
      v.push(9);
    for (; T <= 279; T++)
      v.push(7);
    for (; T <= 287; T++)
      v.push(8);
    Yt(v, Pn, 288);
  })();
  var Es = /* @__PURE__ */ function() {
    for (var T = ie ? new Uint8Array(32768) : [], v = 0, _ = 0; v < se.length - 1; ++v)
      for (; _ < se[v + 1]; ++_)
        T[_] = v;
    for (; _ < 32768; ++_)
      T[_] = 29;
    var w = ie ? new Uint8Array(259) : [];
    for (v = 0, _ = 0; v < W.length - 1; ++v)
      for (; _ < W[v + 1]; ++_)
        w[_] = v;
    function E(b, R) {
      for (var I = 0; I < b.length; ) {
        var N = Math.min(65535, b.length - I), X = I + N == b.length;
        for (R.write_shift(1, +X), R.write_shift(2, N), R.write_shift(2, ~N & 65535); N-- > 0; )
          R[R.l++] = b[I++];
      }
      return R.l;
    }
    function k(b, R) {
      for (var I = 0, N = 0, X = ie ? new Uint16Array(32768) : []; N < b.length; ) {
        var Z = (
          /* data.length - boff; */
          Math.min(65535, b.length - N)
        );
        if (Z < 10) {
          for (I = yr(R, I, +(N + Z == b.length)), I & 7 && (I += 8 - (I & 7)), R.l = I / 8 | 0, R.write_shift(2, Z), R.write_shift(2, ~Z & 65535); Z-- > 0; )
            R[R.l++] = b[N++];
          I = R.l * 8;
          continue;
        }
        I = yr(R, I, +(N + Z == b.length) + 2);
        for (var ne = 0; Z-- > 0; ) {
          var Y = b[N];
          ne = (ne << 5 ^ Y) & 32767;
          var re = -1, le = 0;
          if ((re = X[ne]) && (re |= N & -32768, re > N && (re -= 32768), re < N))
            for (; b[re + le] == b[N + le] && le < 250; )
              ++le;
          if (le > 2) {
            Y = w[le], Y <= 22 ? I = it(R, I, Q[Y + 1] >> 1) - 1 : (it(R, I, 3), I += 5, it(R, I, Q[Y - 23] >> 5), I += 3);
            var Ae = Y < 8 ? 0 : Y - 4 >> 2;
            Ae > 0 && (F0(R, I, le - W[Y]), I += Ae), Y = T[N - re], I = it(R, I, Q[Y] >> 3), I -= 3;
            var Fe = Y < 4 ? 0 : Y - 2 >> 1;
            Fe > 0 && (F0(R, I, N - re - se[Y]), I += Fe);
            for (var ze = 0; ze < le; ++ze)
              X[ne] = N & 32767, ne = (ne << 5 ^ b[N]) & 32767, ++N;
            Z -= le - 1;
          } else
            Y <= 143 ? Y = Y + 48 : I = jr(R, I, 1), I = it(R, I, Q[Y]), X[ne] = N & 32767, ++N;
        }
        I = it(R, I, 0) - 1;
      }
      return R.l = (I + 7) / 8 | 0, R.l;
    }
    return function(R, I) {
      return R.length < 8 ? E(R, I) : k(R, I);
    };
  }();
  function y0(p) {
    var T = B(50 + Math.floor(p.length * 1.1)), v = Es(p, T);
    return T.slice(0, v);
  }
  var C0 = ie ? new Uint16Array(32768) : wr(32768), O0 = ie ? new Uint16Array(32768) : wr(32768), D0 = ie ? new Uint16Array(128) : wr(128), R0 = 1, k0 = 1;
  function Ss(p, T) {
    var v = ye(p, T) + 257;
    T += 5;
    var _ = ye(p, T) + 1;
    T += 5;
    var w = Fr(p, T) + 4;
    T += 4;
    for (var E = 0, k = ie ? new Uint8Array(19) : wr(19), b = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], R = 1, I = ie ? new Uint8Array(8) : wr(8), N = ie ? new Uint8Array(8) : wr(8), X = k.length, Z = 0; Z < w; ++Z)
      k[A[Z]] = E = pe(p, T), R < E && (R = E), I[E]++, T += 3;
    var ne = 0;
    for (I[0] = 0, Z = 1; Z <= R; ++Z)
      N[Z] = ne = ne + I[Z - 1] << 1;
    for (Z = 0; Z < X; ++Z)
      (ne = k[Z]) != 0 && (b[Z] = N[ne]++);
    var Y = 0;
    for (Z = 0; Z < X; ++Z)
      if (Y = k[Z], Y != 0) {
        ne = Q[b[Z]] >> 8 - Y;
        for (var re = (1 << 7 - Y) - 1; re >= 0; --re)
          D0[ne | re << Y] = Y & 7 | Z << 3;
      }
    var le = [];
    for (R = 1; le.length < v + _; )
      switch (ne = D0[ae(p, T)], T += ne & 7, ne >>>= 3) {
        case 16:
          for (E = 3 + Ye(p, T), T += 2, ne = le[le.length - 1]; E-- > 0; )
            le.push(ne);
          break;
        case 17:
          for (E = 3 + pe(p, T), T += 3; E-- > 0; )
            le.push(0);
          break;
        case 18:
          for (E = 11 + ae(p, T), T += 7; E-- > 0; )
            le.push(0);
          break;
        default:
          le.push(ne), R < ne && (R = ne);
          break;
      }
    var Ae = le.slice(0, v), Fe = le.slice(v);
    for (Z = v; Z < 286; ++Z)
      Ae[Z] = 0;
    for (Z = _; Z < 30; ++Z)
      Fe[Z] = 0;
    return R0 = Yt(Ae, C0, 286), k0 = Yt(Fe, O0, 30), T;
  }
  function As(p, T) {
    if (p[0] == 3 && !(p[1] & 3))
      return [Jr(T), 2];
    for (var v = 0, _ = 0, w = G0(T || 1 << 18), E = 0, k = w.length >>> 0, b = 0, R = 0; !(_ & 1); ) {
      if (_ = pe(p, v), v += 3, _ >>> 1)
        _ >> 1 == 1 ? (b = 9, R = 5) : (v = Ss(p, v), b = R0, R = k0);
      else {
        v & 7 && (v += 8 - (v & 7));
        var I = p[v >>> 3] | p[(v >>> 3) + 1] << 8;
        if (v += 32, I > 0)
          for (!T && k < E + I && (w = Nn(w, E + I), k = w.length); I-- > 0; )
            w[E++] = p[v >>> 3], v += 8;
        continue;
      }
      for (; ; ) {
        !T && k < E + 32767 && (w = Nn(w, E + 32767), k = w.length);
        var N = cr(p, v, b), X = _ >>> 1 == 1 ? Pn[N] : C0[N];
        if (v += X & 15, X >>>= 4, !(X >>> 8 & 255))
          w[E++] = X;
        else {
          if (X == 256)
            break;
          X -= 257;
          var Z = X < 8 ? 0 : X - 4 >> 2;
          Z > 5 && (Z = 0);
          var ne = E + W[X];
          Z > 0 && (ne += cr(p, v, Z), v += Z), N = cr(p, v, R), X = _ >>> 1 == 1 ? Ln[N] : O0[N], v += X & 15, X >>>= 4;
          var Y = X < 4 ? 0 : X - 2 >> 1, re = se[X];
          for (Y > 0 && (re += cr(p, v, Y), v += Y), !T && k < ne && (w = Nn(w, ne + 100), k = w.length); E < ne; )
            w[E] = w[E - re], ++E;
        }
      }
    }
    return T ? [w, v + 7 >>> 3] : [w.slice(0, E), v + 7 >>> 3];
  }
  function I0(p, T) {
    var v = p.slice(p.l || 0), _ = As(v, T);
    return p.l += _[1], _[0];
  }
  function N0(p, T) {
    if (p)
      typeof console < "u" && console.error(T);
    else
      throw new Error(T);
  }
  function P0(p, T) {
    var v = (
      /*::(*/
      p
    );
    ar(v, 0);
    var _ = [], w = [], E = {
      FileIndex: _,
      FullPaths: w
    };
    D(E, { root: T.root });
    for (var k = v.length - 4; (v[k] != 80 || v[k + 1] != 75 || v[k + 2] != 5 || v[k + 3] != 6) && k >= 0; )
      --k;
    v.l = k + 4, v.l += 4;
    var b = v.read_shift(2);
    v.l += 6;
    var R = v.read_shift(4);
    for (v.l = R, k = 0; k < b; ++k) {
      v.l += 20;
      var I = v.read_shift(4), N = v.read_shift(4), X = v.read_shift(2), Z = v.read_shift(2), ne = v.read_shift(2);
      v.l += 8;
      var Y = v.read_shift(4), re = f(
        /*::(*/
        v.slice(v.l + X, v.l + X + Z)
        /*:: :any)*/
      );
      v.l += X + Z + ne;
      var le = v.l;
      v.l = Y + 4, Fs(v, I, N, E, re), v.l = le;
    }
    return E;
  }
  function Fs(p, T, v, _, w) {
    p.l += 2;
    var E = p.read_shift(2), k = p.read_shift(2), b = s(p);
    if (E & 8257)
      throw new Error("Unsupported ZIP encryption");
    for (var R = p.read_shift(4), I = p.read_shift(4), N = p.read_shift(4), X = p.read_shift(2), Z = p.read_shift(2), ne = "", Y = 0; Y < X; ++Y)
      ne += String.fromCharCode(p[p.l++]);
    if (Z) {
      var re = f(
        /*::(*/
        p.slice(p.l, p.l + Z)
        /*:: :any)*/
      );
      (re[21589] || {}).mt && (b = re[21589].mt), ((w || {})[21589] || {}).mt && (b = w[21589].mt);
    }
    p.l += Z;
    var le = p.slice(p.l, p.l + I);
    switch (k) {
      case 8:
        le = P(p, N);
        break;
      case 0:
        break;
      default:
        throw new Error("Unsupported ZIP Compression method " + k);
    }
    var Ae = !1;
    E & 8 && (R = p.read_shift(4), R == 134695760 && (R = p.read_shift(4), Ae = !0), I = p.read_shift(4), N = p.read_shift(4)), I != T && N0(Ae, "Bad compressed size: " + T + " != " + I), N != v && N0(Ae, "Bad uncompressed size: " + v + " != " + N), Mn(_, ne, le, { unsafe: !0, mt: b });
  }
  function ys(p, T) {
    var v = T || {}, _ = [], w = [], E = B(1), k = v.compression ? 8 : 0, b = 0, R = 0, I = 0, N = 0, X = 0, Z = p.FullPaths[0], ne = Z, Y = p.FileIndex[0], re = [], le = 0;
    for (R = 1; R < p.FullPaths.length; ++R)
      if (ne = p.FullPaths[R].slice(Z.length), Y = p.FileIndex[R], !(!Y.size || !Y.content || ne == "Sh33tJ5")) {
        var Ae = N, Fe = B(ne.length);
        for (I = 0; I < ne.length; ++I)
          Fe.write_shift(1, ne.charCodeAt(I) & 127);
        Fe = Fe.slice(0, Fe.l), re[X] = Ll.buf(
          /*::((*/
          Y.content,
          0
        );
        var ze = Y.content;
        k == 8 && (ze = C(ze)), E = B(30), E.write_shift(4, 67324752), E.write_shift(2, 20), E.write_shift(2, b), E.write_shift(2, k), Y.mt ? i(E, Y.mt) : E.write_shift(4, 0), E.write_shift(-4, re[X]), E.write_shift(4, ze.length), E.write_shift(
          4,
          /*::(*/
          Y.content.length
        ), E.write_shift(2, Fe.length), E.write_shift(2, 0), N += E.length, _.push(E), N += Fe.length, _.push(Fe), N += ze.length, _.push(ze), E = B(46), E.write_shift(4, 33639248), E.write_shift(2, 0), E.write_shift(2, 20), E.write_shift(2, b), E.write_shift(2, k), E.write_shift(4, 0), E.write_shift(-4, re[X]), E.write_shift(4, ze.length), E.write_shift(
          4,
          /*::(*/
          Y.content.length
        ), E.write_shift(2, Fe.length), E.write_shift(2, 0), E.write_shift(2, 0), E.write_shift(2, 0), E.write_shift(2, 0), E.write_shift(4, 0), E.write_shift(4, Ae), le += E.l, w.push(E), le += Fe.length, w.push(Fe), ++X;
      }
    return E = B(22), E.write_shift(4, 101010256), E.write_shift(2, 0), E.write_shift(2, 0), E.write_shift(2, X), E.write_shift(2, X), E.write_shift(4, le), E.write_shift(4, N), E.write_shift(2, 0), Ve([Ve(_), Ve(w), E]);
  }
  var qt = {
    htm: "text/html",
    xml: "text/xml",
    gif: "image/gif",
    jpg: "image/jpeg",
    png: "image/png",
    mso: "application/x-mso",
    thmx: "application/vnd.ms-officetheme",
    sh33tj5: "application/octet-stream"
  };
  function Cs(p, T) {
    if (p.ctype)
      return p.ctype;
    var v = p.name || "", _ = v.match(/\.([^\.]+)$/);
    return _ && qt[_[1]] || T && (_ = (v = T).match(/[\.\\]([^\.\\])+$/), _ && qt[_[1]]) ? qt[_[1]] : "application/octet-stream";
  }
  function Os(p) {
    for (var T = Bt(p), v = [], _ = 0; _ < T.length; _ += 76)
      v.push(T.slice(_, _ + 76));
    return v.join(`\r
`) + `\r
`;
  }
  function Ds(p) {
    var T = p.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7E-\xFF=]/g, function(I) {
      var N = I.charCodeAt(0).toString(16).toUpperCase();
      return "=" + (N.length == 1 ? "0" + N : N);
    });
    T = T.replace(/ $/mg, "=20").replace(/\t$/mg, "=09"), T.charAt(0) == `
` && (T = "=0D" + T.slice(1)), T = T.replace(/\r(?!\n)/mg, "=0D").replace(/\n\n/mg, `
=0A`).replace(/([^\r\n])\n/mg, "$1=0A");
    for (var v = [], _ = T.split(`\r
`), w = 0; w < _.length; ++w) {
      var E = _[w];
      if (E.length == 0) {
        v.push("");
        continue;
      }
      for (var k = 0; k < E.length; ) {
        var b = 76, R = E.slice(k, k + b);
        R.charAt(b - 1) == "=" ? b-- : R.charAt(b - 2) == "=" ? b -= 2 : R.charAt(b - 3) == "=" && (b -= 3), R = E.slice(k, k + b), k += b, k < E.length && (R += "="), v.push(R);
      }
    }
    return v.join(`\r
`);
  }
  function Rs(p) {
    for (var T = [], v = 0; v < p.length; ++v) {
      for (var _ = p[v]; v <= p.length && _.charAt(_.length - 1) == "="; )
        _ = _.slice(0, _.length - 1) + p[++v];
      T.push(_);
    }
    for (var w = 0; w < T.length; ++w)
      T[w] = T[w].replace(/[=][0-9A-Fa-f]{2}/g, function(E) {
        return String.fromCharCode(parseInt(E.slice(1), 16));
      });
    return gr(T.join(`\r
`));
  }
  function ks(p, T, v) {
    for (var _ = "", w = "", E = "", k, b = 0; b < 10; ++b) {
      var R = T[b];
      if (!R || R.match(/^\s*$/))
        break;
      var I = R.match(/^(.*?):\s*([^\s].*)$/);
      if (I)
        switch (I[1].toLowerCase()) {
          case "content-location":
            _ = I[2].trim();
            break;
          case "content-type":
            E = I[2].trim();
            break;
          case "content-transfer-encoding":
            w = I[2].trim();
            break;
        }
    }
    switch (++b, w.toLowerCase()) {
      case "base64":
        k = gr(Ir(T.slice(b).join("")));
        break;
      case "quoted-printable":
        k = Rs(T.slice(b));
        break;
      default:
        throw new Error("Unsupported Content-Transfer-Encoding " + w);
    }
    var N = Mn(p, _.slice(v.length), k, { unsafe: !0 });
    E && (N.ctype = E);
  }
  function Is(p, T) {
    if (Pe(p.slice(0, 13)).toLowerCase() != "mime-version:")
      throw new Error("Unsupported MAD header");
    var v = T && T.root || "", _ = (de && Buffer.isBuffer(p) ? p.toString("binary") : Pe(p)).split(`\r
`), w = 0, E = "";
    for (w = 0; w < _.length; ++w)
      if (E = _[w], !!/^Content-Location:/i.test(E) && (E = E.slice(E.indexOf("file")), v || (v = E.slice(0, E.lastIndexOf("/") + 1)), E.slice(0, v.length) != v))
        for (; v.length > 0 && (v = v.slice(0, v.length - 1), v = v.slice(0, v.lastIndexOf("/") + 1), E.slice(0, v.length) != v); )
          ;
    var k = (_[1] || "").match(/boundary="(.*?)"/);
    if (!k)
      throw new Error("MAD cannot find boundary");
    var b = "--" + (k[1] || ""), R = [], I = [], N = {
      FileIndex: R,
      FullPaths: I
    };
    D(N);
    var X, Z = 0;
    for (w = 0; w < _.length; ++w) {
      var ne = _[w];
      ne !== b && ne !== b + "--" || (Z++ && ks(N, _.slice(X, w), v), X = w);
    }
    return N;
  }
  function Ns(p, T) {
    var v = T || {}, _ = v.boundary || "SheetJS";
    _ = "------=" + _;
    for (var w = [
      "MIME-Version: 1.0",
      'Content-Type: multipart/related; boundary="' + _.slice(2) + '"',
      "",
      "",
      ""
    ], E = p.FullPaths[0], k = E, b = p.FileIndex[0], R = 1; R < p.FullPaths.length; ++R)
      if (k = p.FullPaths[R].slice(E.length), b = p.FileIndex[R], !(!b.size || !b.content || k == "Sh33tJ5")) {
        k = k.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7E-\xFF]/g, function(le) {
          return "_x" + le.charCodeAt(0).toString(16) + "_";
        }).replace(/[\u0080-\uFFFF]/g, function(le) {
          return "_u" + le.charCodeAt(0).toString(16) + "_";
        });
        for (var I = b.content, N = de && Buffer.isBuffer(I) ? I.toString("binary") : Pe(I), X = 0, Z = Math.min(1024, N.length), ne = 0, Y = 0; Y <= Z; ++Y)
          (ne = N.charCodeAt(Y)) >= 32 && ne < 128 && ++X;
        var re = X >= Z * 4 / 5;
        w.push(_), w.push("Content-Location: " + (v.root || "file:///C:/SheetJS/") + k), w.push("Content-Transfer-Encoding: " + (re ? "quoted-printable" : "base64")), w.push("Content-Type: " + Cs(b, k)), w.push(""), w.push(re ? Ds(N) : Os(N));
      }
    return w.push(_ + `--\r
`), w.join(`\r
`);
  }
  function Ps(p) {
    var T = {};
    return D(T, p), T;
  }
  function Mn(p, T, v, _) {
    var w = _ && _.unsafe;
    w || D(p);
    var E = !w && we.find(p, T);
    if (!E) {
      var k = p.FullPaths[0];
      T.slice(0, k.length) == k ? k = T : (k.slice(-1) != "/" && (k += "/"), k = (k + T).replace("//", "/")), E = { name: a(T), type: 2 }, p.FileIndex.push(E), p.FullPaths.push(k), w || we.utils.cfb_gc(p);
    }
    return E.content = v, E.size = v ? v.length : 0, _ && (_.CLSID && (E.clsid = _.CLSID), _.mt && (E.mt = _.mt), _.ct && (E.ct = _.ct)), E;
  }
  function Ls(p, T) {
    D(p);
    var v = we.find(p, T);
    if (v) {
      for (var _ = 0; _ < p.FileIndex.length; ++_)
        if (p.FileIndex[_] == v)
          return p.FileIndex.splice(_, 1), p.FullPaths.splice(_, 1), !0;
    }
    return !1;
  }
  function Ms(p, T, v) {
    D(p);
    var _ = we.find(p, T);
    if (_) {
      for (var w = 0; w < p.FileIndex.length; ++w)
        if (p.FileIndex[w] == _)
          return p.FileIndex[w].name = a(v), p.FullPaths[w] = v, !0;
    }
    return !1;
  }
  function Bs(p) {
    M(p, !0);
  }
  return t.find = G, t.read = ee, t.parse = c, t.write = or, t.writeFile = dr, t.utils = {
    cfb_new: Ps,
    cfb_add: Mn,
    cfb_del: Ls,
    cfb_mov: Ms,
    cfb_gc: Bs,
    ReadShift: kt,
    CheckField: Ti,
    prep_blob: ar,
    bconcat: Ve,
    use_zlib: S,
    _deflateRaw: y0,
    _inflateRaw: I0,
    consts: De
  }, t;
}();
function Ml(e) {
  return typeof e == "string" ? Fn(e) : Array.isArray(e) ? ll(e) : e;
}
function Xt(e, t, r) {
  if (typeof Deno < "u") {
    if (r && typeof t == "string")
      switch (r) {
        case "utf8":
          t = new TextEncoder(r).encode(t);
          break;
        case "binary":
          t = Fn(t);
          break;
        default:
          throw new Error("Unsupported encoding " + r);
      }
    return Deno.writeFileSync(e, t);
  }
  var n = r == "utf8" ? Or(t) : t;
  if (typeof IE_SaveFile < "u")
    return IE_SaveFile(n, e);
  if (typeof Blob < "u") {
    var a = new Blob([Ml(n)], { type: "application/octet-stream" });
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
      return f.open("w"), f.encoding = "binary", Array.isArray(t) && (t = Gt(t)), f.write(t), f.close(), t;
    } catch (o) {
      if (!o.message || !o.message.match(/onstruct/))
        throw o;
    }
  throw new Error("cannot save file " + e);
}
function je(e) {
  for (var t = Object.keys(e), r = [], n = 0; n < t.length; ++n)
    Object.prototype.hasOwnProperty.call(e, t[n]) && r.push(t[n]);
  return r;
}
function J0(e, t) {
  for (var r = [], n = je(e), a = 0; a !== n.length; ++a)
    r[e[n[a]][t]] == null && (r[e[n[a]][t]] = n[a]);
  return r;
}
function s0(e) {
  for (var t = [], r = je(e), n = 0; n !== r.length; ++n)
    t[e[r[n]]] = r[n];
  return t;
}
function On(e) {
  for (var t = [], r = je(e), n = 0; n !== r.length; ++n)
    t[e[r[n]]] = parseInt(r[n], 10);
  return t;
}
function Bl(e) {
  for (var t = [], r = je(e), n = 0; n !== r.length; ++n)
    t[e[r[n]]] == null && (t[e[r[n]]] = []), t[e[r[n]]].push(r[n]);
  return t;
}
var dn = /* @__PURE__ */ new Date(1899, 11, 30, 0, 0, 0);
function er(e, t) {
  var r = /* @__PURE__ */ e.getTime();
  t && (r -= 1462 * 24 * 60 * 60 * 1e3);
  var n = /* @__PURE__ */ dn.getTime() + (/* @__PURE__ */ e.getTimezoneOffset() - /* @__PURE__ */ dn.getTimezoneOffset()) * 6e4;
  return (r - n) / (24 * 60 * 60 * 1e3);
}
var ni = /* @__PURE__ */ new Date(), bl = /* @__PURE__ */ dn.getTime() + (/* @__PURE__ */ ni.getTimezoneOffset() - /* @__PURE__ */ dn.getTimezoneOffset()) * 6e4, Z0 = /* @__PURE__ */ ni.getTimezoneOffset();
function ai(e) {
  var t = new Date();
  return t.setTime(e * 24 * 60 * 60 * 1e3 + bl), t.getTimezoneOffset() !== Z0 && t.setTime(t.getTime() + (t.getTimezoneOffset() - Z0) * 6e4), t;
}
var Q0 = /* @__PURE__ */ new Date("2017-02-19T19:06:09.000Z"), ii = /* @__PURE__ */ isNaN(/* @__PURE__ */ Q0.getFullYear()) ? /* @__PURE__ */ new Date("2/19/17") : Q0, Ul = /* @__PURE__ */ ii.getFullYear() == 2017;
function Ze(e, t) {
  var r = new Date(e);
  if (Ul)
    return t > 0 ? r.setTime(r.getTime() + r.getTimezoneOffset() * 60 * 1e3) : t < 0 && r.setTime(r.getTime() - r.getTimezoneOffset() * 60 * 1e3), r;
  if (e instanceof Date)
    return e;
  if (ii.getFullYear() == 1917 && !isNaN(r.getFullYear())) {
    var n = r.getFullYear();
    return e.indexOf("" + n) > -1 || r.setFullYear(r.getFullYear() + 100), r;
  }
  var a = e.match(/\d+/g) || ["2017", "2", "19", "0", "0", "0"], i = new Date(+a[0], +a[1] - 1, +a[2], +a[3] || 0, +a[4] || 0, +a[5] || 0);
  return e.indexOf("Z") > -1 && (i = new Date(i.getTime() - i.getTimezoneOffset() * 60 * 1e3)), i;
}
function Dn(e, t) {
  if (de && Buffer.isBuffer(e)) {
    if (t) {
      if (e[0] == 255 && e[1] == 254)
        return Or(e.slice(2).toString("utf16le"));
      if (e[1] == 254 && e[2] == 255)
        return Or(fl(e.slice(2).toString("binary")));
    }
    return e.toString("binary");
  }
  if (typeof TextDecoder < "u")
    try {
      if (t) {
        if (e[0] == 255 && e[1] == 254)
          return Or(new TextDecoder("utf-16le").decode(e.slice(2)));
        if (e[0] == 254 && e[1] == 255)
          return Or(new TextDecoder("utf-16be").decode(e.slice(2)));
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
function rr(e) {
  if (typeof JSON < "u" && !Array.isArray(e))
    return JSON.parse(JSON.stringify(e));
  if (typeof e != "object" || e == null)
    return e;
  if (e instanceof Date)
    return new Date(e.getTime());
  var t = {};
  for (var r in e)
    Object.prototype.hasOwnProperty.call(e, r) && (t[r] = rr(e[r]));
  return t;
}
function Ce(e, t) {
  for (var r = ""; r.length < t; )
    r += e;
  return r;
}
function Rr(e) {
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
var Hl = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
function bt(e) {
  var t = new Date(e), r = new Date(NaN), n = t.getYear(), a = t.getMonth(), i = t.getDate();
  if (isNaN(i))
    return r;
  var s = e.toLowerCase();
  if (s.match(/jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec/)) {
    if (s = s.replace(/[^a-z]/g, "").replace(/([^a-z]|^)[ap]m?([^a-z]|$)/, ""), s.length > 3 && Hl.indexOf(s) == -1)
      return r;
  } else if (s.match(/[a-z]/))
    return r;
  return n < 0 || n > 8099 ? r : (a > 0 || i > 1) && n != 101 ? t : e.match(/[^-0-9:,\/\\]/) ? r : t;
}
function ce(e, t, r) {
  if (e.FullPaths) {
    if (typeof r == "string") {
      var n;
      return de ? n = Pr(r) : n = ol(r), we.utils.cfb_add(e, t, n);
    }
    we.utils.cfb_add(e, t, r);
  } else
    e.file(t, r);
}
function f0() {
  return we.utils.cfb_new();
}
var Ie = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\r
`, Wl = {
  "&quot;": '"',
  "&apos;": "'",
  "&gt;": ">",
  "&lt;": "<",
  "&amp;": "&"
}, l0 = /* @__PURE__ */ s0(Wl), o0 = /[&<>'"]/g, Vl = /[\u0000-\u0008\u000b-\u001f]/g;
function me(e) {
  var t = e + "";
  return t.replace(o0, function(r) {
    return l0[r];
  }).replace(Vl, function(r) {
    return "_x" + ("000" + r.charCodeAt(0).toString(16)).slice(-4) + "_";
  });
}
function ea(e) {
  return me(e).replace(/ /g, "_x0020_");
}
var si = /[\u0000-\u001f]/g;
function Gl(e) {
  var t = e + "";
  return t.replace(o0, function(r) {
    return l0[r];
  }).replace(/\n/g, "<br/>").replace(si, function(r) {
    return "&#x" + ("000" + r.charCodeAt(0).toString(16)).slice(-4) + ";";
  });
}
function Xl(e) {
  var t = e + "";
  return t.replace(o0, function(r) {
    return l0[r];
  }).replace(si, function(r) {
    return "&#x" + r.charCodeAt(0).toString(16).toUpperCase() + ";";
  });
}
function jl(e) {
  return e.replace(/(\r\n|[\r\n])/g, "&#10;");
}
function zl(e) {
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
function Wn(e) {
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
function ra(e) {
  var t = Jr(2 * e.length), r, n, a = 1, i = 0, s = 0, f;
  for (n = 0; n < e.length; n += a)
    a = 1, (f = e.charCodeAt(n)) < 128 ? r = f : f < 224 ? (r = (f & 31) * 64 + (e.charCodeAt(n + 1) & 63), a = 2) : f < 240 ? (r = (f & 15) * 4096 + (e.charCodeAt(n + 1) & 63) * 64 + (e.charCodeAt(n + 2) & 63), a = 3) : (a = 4, r = (f & 7) * 262144 + (e.charCodeAt(n + 1) & 63) * 4096 + (e.charCodeAt(n + 2) & 63) * 64 + (e.charCodeAt(n + 3) & 63), r -= 65536, s = 55296 + (r >>> 10 & 1023), r = 56320 + (r & 1023)), s !== 0 && (t[i++] = s & 255, t[i++] = s >>> 8, s = 0), t[i++] = r % 256, t[i++] = r >>> 8;
  return t.slice(0, i).toString("ucs2");
}
function ta(e) {
  return Pr(e, "binary").toString("utf8");
}
var en = "foo bar bazâð£", Rt = de && (/* @__PURE__ */ ta(en) == /* @__PURE__ */ Wn(en) && ta || /* @__PURE__ */ ra(en) == /* @__PURE__ */ Wn(en) && ra) || Wn, Or = de ? function(e) {
  return Pr(e, "utf8").toString("binary");
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
}, $l = /* @__PURE__ */ function() {
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
}(), fi = /(^\s|\s$|\n)/;
function Ge(e, t) {
  return "<" + e + (t.match(fi) ? ' xml:space="preserve"' : "") + ">" + t + "</" + e + ">";
}
function Ut(e) {
  return je(e).map(function(t) {
    return " " + t + '="' + e[t] + '"';
  }).join("");
}
function q(e, t, r) {
  return "<" + e + (r != null ? Ut(r) : "") + (t != null ? (t.match(fi) ? ' xml:space="preserve"' : "") + ">" + t + "</" + e : "/") + ">";
}
function Jn(e, t) {
  try {
    return e.toISOString().replace(/\.\d*/, "");
  } catch (r) {
    if (t)
      throw r;
  }
  return "";
}
function Kl(e, t) {
  switch (typeof e) {
    case "string":
      var r = q("vt:lpwstr", me(e));
      return t && (r = r.replace(/&quot;/g, "_x0022_")), r;
    case "number":
      return q((e | 0) == e ? "vt:i4" : "vt:r8", me(String(e)));
    case "boolean":
      return q("vt:bool", e ? "true" : "false");
  }
  if (e instanceof Date)
    return q("vt:filetime", Jn(e));
  throw new Error("Unable to serialize " + e);
}
var Me = {
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
}, _t = [
  "http://schemas.openxmlformats.org/spreadsheetml/2006/main",
  "http://purl.oclc.org/ooxml/spreadsheetml/main",
  "http://schemas.microsoft.com/office/excel/2006/main",
  "http://schemas.microsoft.com/office/excel/2006/2"
], ir = {
  o: "urn:schemas-microsoft-com:office:office",
  x: "urn:schemas-microsoft-com:office:excel",
  ss: "urn:schemas-microsoft-com:office:spreadsheet",
  dt: "uuid:C2F41010-65B3-11d1-A29F-00AA00C14882",
  mv: "http://macVmlSchemaUri",
  v: "urn:schemas-microsoft-com:vml",
  html: "http://www.w3.org/TR/REC-html40"
};
function Yl(e, t) {
  for (var r = 1 - 2 * (e[t + 7] >>> 7), n = ((e[t + 7] & 127) << 4) + (e[t + 6] >>> 4 & 15), a = e[t + 6] & 15, i = 5; i >= 0; --i)
    a = a * 256 + e[t + i];
  return n == 2047 ? a == 0 ? r * (1 / 0) : NaN : (n == 0 ? n = -1022 : (n -= 1023, a += Math.pow(2, 52)), r * Math.pow(2, n - 52) * a);
}
function ql(e, t, r) {
  var n = (t < 0 || 1 / t == -1 / 0 ? 1 : 0) << 7, a = 0, i = 0, s = n ? -t : t;
  isFinite(s) ? s == 0 ? a = i = 0 : (a = Math.floor(Math.log(s) / Math.LN2), i = s * Math.pow(2, 52 - a), a <= -1023 && (!isFinite(i) || i < Math.pow(2, 52)) ? a = -1022 : (i -= Math.pow(2, 52), a += 1023)) : (a = 2047, i = isNaN(t) ? 26985 : 0);
  for (var f = 0; f <= 5; ++f, i /= 256)
    e[r + f] = i & 255;
  e[r + 6] = (a & 15) << 4 | i & 15, e[r + 7] = a >> 4 | n;
}
var na = function(e) {
  for (var t = [], r = 10240, n = 0; n < e[0].length; ++n)
    if (e[0][n])
      for (var a = 0, i = e[0][n].length; a < i; a += r)
        t.push.apply(t, e[0][n].slice(a, a + r));
  return t;
}, aa = de ? function(e) {
  return e[0].length > 0 && Buffer.isBuffer(e[0][0]) ? Buffer.concat(e[0].map(function(t) {
    return Buffer.isBuffer(t) ? t : Pr(t);
  })) : na(e);
} : na, ia = function(e, t, r) {
  for (var n = [], a = t; a < r; a += 2)
    n.push(String.fromCharCode(Ot(e, a)));
  return n.join("").replace(Dt, "");
}, c0 = de ? function(e, t, r) {
  return Buffer.isBuffer(e) ? e.toString("utf16le", t, r).replace(Dt, "") : ia(e, t, r);
} : ia, sa = function(e, t, r) {
  for (var n = [], a = t; a < t + r; ++a)
    n.push(("0" + e[a].toString(16)).slice(-2));
  return n.join("");
}, li = de ? function(e, t, r) {
  return Buffer.isBuffer(e) ? e.toString("hex", t, t + r) : sa(e, t, r);
} : sa, fa = function(e, t, r) {
  for (var n = [], a = t; a < r; a++)
    n.push(String.fromCharCode(ot(e, a)));
  return n.join("");
}, jt = de ? function(t, r, n) {
  return Buffer.isBuffer(t) ? t.toString("utf8", r, n) : fa(t, r, n);
} : fa, oi = function(e, t) {
  var r = sr(e, t);
  return r > 0 ? jt(e, t + 4, t + 4 + r - 1) : "";
}, ci = oi, ui = function(e, t) {
  var r = sr(e, t);
  return r > 0 ? jt(e, t + 4, t + 4 + r - 1) : "";
}, hi = ui, xi = function(e, t) {
  var r = 2 * sr(e, t);
  return r > 0 ? jt(e, t + 4, t + 4 + r - 1) : "";
}, di = xi, pi = function(t, r) {
  var n = sr(t, r);
  return n > 0 ? c0(t, r + 4, r + 4 + n) : "";
}, vi = pi, gi = function(e, t) {
  var r = sr(e, t);
  return r > 0 ? jt(e, t + 4, t + 4 + r) : "";
}, mi = gi, _i = function(e, t) {
  return Yl(e, t);
}, pn = _i, u0 = function(t) {
  return Array.isArray(t) || typeof Uint8Array < "u" && t instanceof Uint8Array;
};
de && (ci = function(t, r) {
  if (!Buffer.isBuffer(t))
    return oi(t, r);
  var n = t.readUInt32LE(r);
  return n > 0 ? t.toString("utf8", r + 4, r + 4 + n - 1) : "";
}, hi = function(t, r) {
  if (!Buffer.isBuffer(t))
    return ui(t, r);
  var n = t.readUInt32LE(r);
  return n > 0 ? t.toString("utf8", r + 4, r + 4 + n - 1) : "";
}, di = function(t, r) {
  if (!Buffer.isBuffer(t))
    return xi(t, r);
  var n = 2 * t.readUInt32LE(r);
  return t.toString("utf16le", r + 4, r + 4 + n - 1);
}, vi = function(t, r) {
  if (!Buffer.isBuffer(t))
    return pi(t, r);
  var n = t.readUInt32LE(r);
  return t.toString("utf16le", r + 4, r + 4 + n);
}, mi = function(t, r) {
  if (!Buffer.isBuffer(t))
    return gi(t, r);
  var n = t.readUInt32LE(r);
  return t.toString("utf8", r + 4, r + 4 + n);
}, pn = function(t, r) {
  return Buffer.isBuffer(t) ? t.readDoubleLE(r) : _i(t, r);
}, u0 = function(t) {
  return Buffer.isBuffer(t) || Array.isArray(t) || typeof Uint8Array < "u" && t instanceof Uint8Array;
});
var ot = function(e, t) {
  return e[t];
}, Ot = function(e, t) {
  return e[t + 1] * (1 << 8) + e[t];
}, Jl = function(e, t) {
  var r = e[t + 1] * 256 + e[t];
  return r < 32768 ? r : (65535 - r + 1) * -1;
}, sr = function(e, t) {
  return e[t + 3] * (1 << 24) + (e[t + 2] << 16) + (e[t + 1] << 8) + e[t];
}, Yr = function(e, t) {
  return e[t + 3] << 24 | e[t + 2] << 16 | e[t + 1] << 8 | e[t];
}, Zl = function(e, t) {
  return e[t] << 24 | e[t + 1] << 16 | e[t + 2] << 8 | e[t + 3];
};
function kt(e, t) {
  var r = "", n, a, i = [], s, f, o, l;
  switch (t) {
    case "dbcs":
      if (l = this.l, de && Buffer.isBuffer(this))
        r = this.slice(this.l, this.l + 2 * e).toString("utf16le");
      else
        for (o = 0; o < e; ++o)
          r += String.fromCharCode(Ot(this, l)), l += 2;
      e *= 2;
      break;
    case "utf8":
      r = jt(this, this.l, this.l + e);
      break;
    case "utf16le":
      e *= 2, r = c0(this, this.l, this.l + e);
      break;
    case "wstr":
      return kt.call(this, e, "dbcs");
    case "lpstr-ansi":
      r = ci(this, this.l), e = 4 + sr(this, this.l);
      break;
    case "lpstr-cp":
      r = hi(this, this.l), e = 4 + sr(this, this.l);
      break;
    case "lpwstr":
      r = di(this, this.l), e = 4 + 2 * sr(this, this.l);
      break;
    case "lpp4":
      e = 4 + sr(this, this.l), r = vi(this, this.l), e & 2 && (e += 2);
      break;
    case "8lpp4":
      e = 4 + sr(this, this.l), r = mi(this, this.l), e & 3 && (e += 4 - (e & 3));
      break;
    case "cstr":
      for (e = 0, r = ""; (s = ot(this, this.l + e++)) !== 0; )
        i.push(Jt(s));
      r = i.join("");
      break;
    case "_wstr":
      for (e = 0, r = ""; (s = Ot(this, this.l + e)) !== 0; )
        i.push(Jt(s)), e += 2;
      e += 2, r = i.join("");
      break;
    case "dbcs-cont":
      for (r = "", l = this.l, o = 0; o < e; ++o) {
        if (this.lens && this.lens.indexOf(l) !== -1)
          return s = ot(this, l), this.l = l + 1, f = kt.call(this, e - o, s ? "dbcs-cont" : "sbcs-cont"), i.join("") + f;
        i.push(Jt(Ot(this, l))), l += 2;
      }
      r = i.join(""), e *= 2;
      break;
    case "cpstr":
    case "sbcs-cont":
      for (r = "", l = this.l, o = 0; o != e; ++o) {
        if (this.lens && this.lens.indexOf(l) !== -1)
          return s = ot(this, l), this.l = l + 1, f = kt.call(this, e - o, s ? "dbcs-cont" : "sbcs-cont"), i.join("") + f;
        i.push(Jt(ot(this, l))), l += 1;
      }
      r = i.join("");
      break;
    default:
      switch (e) {
        case 1:
          return n = ot(this, this.l), this.l++, n;
        case 2:
          return n = (t === "i" ? Jl : Ot)(this, this.l), this.l += 2, n;
        case 4:
        case -4:
          return t === "i" || !(this[this.l + 3] & 128) ? (n = (e > 0 ? Yr : Zl)(this, this.l), this.l += 4, n) : (a = sr(this, this.l), this.l += 4, a);
        case 8:
        case -8:
          if (t === "f")
            return e == 8 ? a = pn(this, this.l) : a = pn([this[this.l + 7], this[this.l + 6], this[this.l + 5], this[this.l + 4], this[this.l + 3], this[this.l + 2], this[this.l + 1], this[this.l + 0]], 0), this.l += 8, a;
          e = 8;
        case 16:
          r = li(this, this.l, e);
          break;
      }
  }
  return this.l += e, r;
}
var Ql = function(e, t, r) {
  e[r] = t & 255, e[r + 1] = t >>> 8 & 255, e[r + 2] = t >>> 16 & 255, e[r + 3] = t >>> 24 & 255;
}, eo = function(e, t, r) {
  e[r] = t & 255, e[r + 1] = t >> 8 & 255, e[r + 2] = t >> 16 & 255, e[r + 3] = t >> 24 & 255;
}, ro = function(e, t, r) {
  e[r] = t & 255, e[r + 1] = t >>> 8 & 255;
};
function to(e, t, r) {
  var n = 0, a = 0;
  if (r === "dbcs") {
    for (a = 0; a != t.length; ++a)
      ro(this, t.charCodeAt(a), this.l + 2 * a);
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
        n = 4, Ql(this, t, this.l);
        break;
      case 8:
        if (n = 8, r === "f") {
          ql(this, t, this.l);
          break;
        }
      case 16:
        break;
      case -4:
        n = 4, eo(this, t, this.l);
        break;
    }
  return this.l += n, this;
}
function Ti(e, t) {
  var r = li(this, this.l, e.length >> 1);
  if (r !== e)
    throw new Error(t + "Expected " + e + " saw " + r);
  this.l += e.length >> 1;
}
function ar(e, t) {
  e.l = t, e.read_shift = /*::(*/
  kt, e.chk = Ti, e.write_shift = to;
}
function Ar(e, t) {
  e.l += t;
}
function B(e) {
  var t = Jr(e);
  return ar(t, 0), t;
}
function Qe() {
  var e = [], t = de ? 256 : 2048, r = function(l) {
    var c = B(l);
    return ar(c, 0), c;
  }, n = r(t), a = function() {
    n && (n.length > n.l && (n = n.slice(0, n.l), n.l = n.length), n.length > 0 && e.push(n), n = null);
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
    n || (n = qx[a].p || (r || []).length || 0), i = 1 + (a >= 128 ? 1 : 0) + 1, n >= 128 && ++i, n >= 16384 && ++i, n >= 2097152 && ++i;
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
    n > 0 && u0(r) && e.push(r);
  }
}
function It(e, t, r) {
  var n = rr(e);
  if (t.s ? (n.cRel && (n.c += t.s.c), n.rRel && (n.r += t.s.r)) : (n.cRel && (n.c += t.c), n.rRel && (n.r += t.r)), !r || r.biff < 12) {
    for (; n.c >= 256; )
      n.c -= 256;
    for (; n.r >= 65536; )
      n.r -= 65536;
  }
  return n;
}
function la(e, t, r) {
  var n = rr(e);
  return n.s = It(n.s, t.s, r), n.e = It(n.e, t.s, r), n;
}
function Nt(e, t) {
  if (e.cRel && e.c < 0)
    for (e = rr(e); e.c < 0; )
      e.c += t > 8 ? 16384 : 256;
  if (e.rRel && e.r < 0)
    for (e = rr(e); e.r < 0; )
      e.r += t > 8 ? 1048576 : t > 5 ? 65536 : 16384;
  var r = _e(e);
  return !e.cRel && e.cRel != null && (r = io(r)), !e.rRel && e.rRel != null && (r = no(r)), r;
}
function Vn(e, t) {
  return e.s.r == 0 && !e.s.rRel && e.e.r == (t.biff >= 12 ? 1048575 : t.biff >= 8 ? 65536 : 16384) && !e.e.rRel ? (e.s.cRel ? "" : "$") + $e(e.s.c) + ":" + (e.e.cRel ? "" : "$") + $e(e.e.c) : e.s.c == 0 && !e.s.cRel && e.e.c == (t.biff >= 12 ? 16383 : 255) && !e.e.cRel ? (e.s.rRel ? "" : "$") + Xe(e.s.r) + ":" + (e.e.rRel ? "" : "$") + Xe(e.e.r) : Nt(e.s, t.biff) + ":" + Nt(e.e, t.biff);
}
function h0(e) {
  return parseInt(ao(e), 10) - 1;
}
function Xe(e) {
  return "" + (e + 1);
}
function no(e) {
  return e.replace(/([A-Z]|^)(\d+)$/, "$1$$$2");
}
function ao(e) {
  return e.replace(/\$(\d+)$/, "$1");
}
function x0(e) {
  for (var t = so(e), r = 0, n = 0; n !== t.length; ++n)
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
function io(e) {
  return e.replace(/^([A-Z])/, "$$$1");
}
function so(e) {
  return e.replace(/^\$([A-Z])/, "$1");
}
function fo(e) {
  return e.replace(/(\$?[A-Z]*)(\$?\d*)/, "$1,$2").split(",");
}
function Be(e) {
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
function fr(e) {
  var t = e.indexOf(":");
  return t == -1 ? { s: Be(e), e: Be(e) } : { s: Be(e.slice(0, t)), e: Be(e.slice(t + 1)) };
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
function oa(e, t) {
  var r = e.t == "d" && t instanceof Date;
  if (e.z != null)
    try {
      return e.w = Wr(e.z, r ? er(t) : t);
    } catch {
    }
  try {
    return e.w = Wr((e.XF || {}).numFmtId || (r ? 14 : 0), r ? er(t) : t);
  } catch {
    return "" + t;
  }
}
function Nr(e, t, r) {
  return e == null || e.t == null || e.t == "z" ? "" : e.w !== void 0 ? e.w : (e.t == "d" && !e.z && r && r.dateNF && (e.z = r.dateNF), e.t == "e" ? zt[e.v] || e.v : t == null ? oa(e, e.v) : oa(e, t));
}
function et(e, t) {
  var r = t && t.sheet ? t.sheet : "Sheet1", n = {};
  return n[r] = e, { SheetNames: [r], Sheets: n };
}
function wi(e, t, r) {
  var n = r || {}, a = e ? Array.isArray(e) : n.dense, i = e || (a ? [] : {}), s = 0, f = 0;
  if (i && n.origin != null) {
    if (typeof n.origin == "number")
      s = n.origin;
    else {
      var o = typeof n.origin == "string" ? Be(n.origin) : n.origin;
      s = o.r, f = o.c;
    }
    i["!ref"] || (i["!ref"] = "A1:A1");
  }
  var l = { s: { c: 1e7, r: 1e7 }, e: { c: 0, r: 0 } };
  if (i["!ref"]) {
    var c = Se(i["!ref"]);
    l.s.c = c.s.c, l.s.r = c.s.r, l.e.c = Math.max(l.e.c, c.e.c), l.e.r = Math.max(l.e.r, c.e.r), s == -1 && (l.e.r = s = c.e.r + 1);
  }
  for (var x = 0; x != t.length; ++x)
    if (t[x]) {
      if (!Array.isArray(t[x]))
        throw new Error("aoa_to_sheet expects an array of arrays");
      for (var h = 0; h != t[x].length; ++h)
        if (!(typeof t[x][h] > "u")) {
          var d = { v: t[x][h] }, m = s + x, u = f + h;
          if (l.s.r > m && (l.s.r = m), l.s.c > u && (l.s.c = u), l.e.r < m && (l.e.r = m), l.e.c < u && (l.e.c = u), t[x][h] && typeof t[x][h] == "object" && !Array.isArray(t[x][h]) && !(t[x][h] instanceof Date))
            d = t[x][h];
          else if (Array.isArray(d.v) && (d.f = t[x][h][1], d.v = d.v[0]), d.v === null)
            if (d.f)
              d.t = "n";
            else if (n.nullError)
              d.t = "e", d.v = 0;
            else if (n.sheetStubs)
              d.t = "z";
            else
              continue;
          else
            typeof d.v == "number" ? d.t = "n" : typeof d.v == "boolean" ? d.t = "b" : d.v instanceof Date ? (d.z = n.dateNF || Oe[14], n.cellDates ? (d.t = "d", d.w = Wr(d.z, er(d.v))) : (d.t = "n", d.v = er(d.v), d.w = Wr(d.z, d.v))) : d.t = "s";
          if (a)
            i[m] || (i[m] = []), i[m][u] && i[m][u].z && (d.z = i[m][u].z), i[m][u] = d;
          else {
            var g = _e({ c: u, r: m });
            i[g] && i[g].z && (d.z = i[g].z), i[g] = d;
          }
        }
    }
  return l.s.c < 1e7 && (i["!ref"] = ke(l)), i;
}
function Tt(e, t) {
  return wi(null, e, t);
}
function lo(e) {
  return e.read_shift(4, "i");
}
function Tr(e, t) {
  return t || (t = B(4)), t.write_shift(4, e), t;
}
function Ke(e) {
  var t = e.read_shift(4);
  return t === 0 ? "" : e.read_shift(t, "dbcs");
}
function be(e, t) {
  var r = !1;
  return t == null && (r = !0, t = B(4 + 2 * e.length)), t.write_shift(4, e.length), e.length > 0 && t.write_shift(0, e, "dbcs"), r ? t.slice(0, t.l) : t;
}
function oo(e) {
  return { ich: e.read_shift(2), ifnt: e.read_shift(2) };
}
function co(e, t) {
  return t || (t = B(4)), t.write_shift(2, e.ich || 0), t.write_shift(2, e.ifnt || 0), t;
}
function d0(e, t) {
  var r = e.l, n = e.read_shift(1), a = Ke(e), i = [], s = { t: a, h: a };
  if (n & 1) {
    for (var f = e.read_shift(4), o = 0; o != f; ++o)
      i.push(oo(e));
    s.r = i;
  } else
    s.r = [{ ich: 0, ifnt: 0 }];
  return e.l = r + t, s;
}
function uo(e, t) {
  var r = !1;
  return t == null && (r = !0, t = B(15 + 4 * e.t.length)), t.write_shift(1, 0), be(e.t, t), r ? t.slice(0, t.l) : t;
}
var ho = d0;
function xo(e, t) {
  var r = !1;
  return t == null && (r = !0, t = B(23 + 4 * e.t.length)), t.write_shift(1, 1), be(e.t, t), t.write_shift(4, 1), co({ ich: 0, ifnt: 0 }, t), r ? t.slice(0, t.l) : t;
}
function xr(e) {
  var t = e.read_shift(4), r = e.read_shift(2);
  return r += e.read_shift(1) << 16, e.l++, { c: t, iStyleRef: r };
}
function rt(e, t) {
  return t == null && (t = B(8)), t.write_shift(-4, e.c), t.write_shift(3, e.iStyleRef || e.s), t.write_shift(1, 0), t;
}
function tt(e) {
  var t = e.read_shift(2);
  return t += e.read_shift(1) << 16, e.l++, { c: -1, iStyleRef: t };
}
function nt(e, t) {
  return t == null && (t = B(4)), t.write_shift(3, e.iStyleRef || e.s), t.write_shift(1, 0), t;
}
var po = Ke, Ei = be;
function p0(e) {
  var t = e.read_shift(4);
  return t === 0 || t === 4294967295 ? "" : e.read_shift(t, "dbcs");
}
function vn(e, t) {
  var r = !1;
  return t == null && (r = !0, t = B(127)), t.write_shift(4, e.length > 0 ? e.length : 4294967295), e.length > 0 && t.write_shift(0, e, "dbcs"), r ? t.slice(0, t.l) : t;
}
var vo = Ke, Zn = p0, v0 = vn;
function Si(e) {
  var t = e.slice(e.l, e.l + 4), r = t[0] & 1, n = t[0] & 2;
  e.l += 4;
  var a = n === 0 ? pn([0, 0, 0, 0, t[0] & 252, t[1], t[2], t[3]], 0) : Yr(t, 0) >> 2;
  return r ? a / 100 : a;
}
function Ai(e, t) {
  t == null && (t = B(4));
  var r = 0, n = 0, a = e * 100;
  if (e == (e | 0) && e >= -(1 << 29) && e < 1 << 29 ? n = 1 : a == (a | 0) && a >= -(1 << 29) && a < 1 << 29 && (n = 1, r = 1), n)
    t.write_shift(-4, ((r ? a : e) << 2) + (r + 2));
  else
    throw new Error("unsupported RkNumber " + e);
}
function Fi(e) {
  var t = { s: {}, e: {} };
  return t.s.r = e.read_shift(4), t.e.r = e.read_shift(4), t.s.c = e.read_shift(4), t.e.c = e.read_shift(4), t;
}
function go(e, t) {
  return t || (t = B(16)), t.write_shift(4, e.s.r), t.write_shift(4, e.e.r), t.write_shift(4, e.s.c), t.write_shift(4, e.e.c), t;
}
var at = Fi, wt = go;
function Et(e) {
  if (e.length - e.l < 8)
    throw "XLS Xnum Buffer underflow";
  return e.read_shift(8, "f");
}
function Zr(e, t) {
  return (t || B(8)).write_shift(8, e, "f");
}
function mo(e) {
  var t = {}, r = e.read_shift(1), n = r >>> 1, a = e.read_shift(1), i = e.read_shift(2, "i"), s = e.read_shift(1), f = e.read_shift(1), o = e.read_shift(1);
  switch (e.l++, n) {
    case 0:
      t.auto = 1;
      break;
    case 1:
      t.index = a;
      var l = Co[a];
      l && (t.rgb = Ta(l));
      break;
    case 2:
      t.rgb = Ta([s, f, o]);
      break;
    case 3:
      t.theme = a;
      break;
  }
  return i != 0 && (t.tint = i > 0 ? i / 32767 : i / 32768), t;
}
function gn(e, t) {
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
function _o(e) {
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
function To(e, t) {
  t || (t = B(2));
  var r = (e.italic ? 2 : 0) | (e.strike ? 8 : 0) | (e.outline ? 16 : 0) | (e.shadow ? 32 : 0) | (e.condense ? 64 : 0) | (e.extend ? 128 : 0);
  return t.write_shift(1, r), t.write_shift(1, 0), t;
}
var yi = 2, nr = 3, rn = 11, mn = 19, tn = 64, wo = 65, Eo = 71, So = 4108, Ao = 4126, We = 80, ca = {
  /*::[*/
  1: { n: "CodePage", t: yi },
  /*::[*/
  2: { n: "Category", t: We },
  /*::[*/
  3: { n: "PresentationFormat", t: We },
  /*::[*/
  4: { n: "ByteCount", t: nr },
  /*::[*/
  5: { n: "LineCount", t: nr },
  /*::[*/
  6: { n: "ParagraphCount", t: nr },
  /*::[*/
  7: { n: "SlideCount", t: nr },
  /*::[*/
  8: { n: "NoteCount", t: nr },
  /*::[*/
  9: { n: "HiddenCount", t: nr },
  /*::[*/
  10: { n: "MultimediaClipCount", t: nr },
  /*::[*/
  11: { n: "ScaleCrop", t: rn },
  /*::[*/
  12: {
    n: "HeadingPairs",
    t: So
    /* VT_VECTOR | VT_VARIANT */
  },
  /*::[*/
  13: {
    n: "TitlesOfParts",
    t: Ao
    /* VT_VECTOR | VT_LPSTR */
  },
  /*::[*/
  14: { n: "Manager", t: We },
  /*::[*/
  15: { n: "Company", t: We },
  /*::[*/
  16: { n: "LinksUpToDate", t: rn },
  /*::[*/
  17: { n: "CharacterCount", t: nr },
  /*::[*/
  19: { n: "SharedDoc", t: rn },
  /*::[*/
  22: { n: "HyperlinksChanged", t: rn },
  /*::[*/
  23: { n: "AppVersion", t: nr, p: "version" },
  /*::[*/
  24: { n: "DigSig", t: wo },
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
  2147483648: { n: "Locale", t: mn },
  /*::[*/
  2147483651: { n: "Behavior", t: mn },
  /*::[*/
  1919054434: {}
}, ua = {
  /*::[*/
  1: { n: "CodePage", t: yi },
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
  10: { n: "EditTime", t: tn },
  /*::[*/
  11: { n: "LastPrinted", t: tn },
  /*::[*/
  12: { n: "CreatedDate", t: tn },
  /*::[*/
  13: { n: "ModifiedDate", t: tn },
  /*::[*/
  14: { n: "PageCount", t: nr },
  /*::[*/
  15: { n: "WordCount", t: nr },
  /*::[*/
  16: { n: "CharCount", t: nr },
  /*::[*/
  17: { n: "Thumbnail", t: Eo },
  /*::[*/
  18: { n: "Application", t: We },
  /*::[*/
  19: { n: "DocSecurity", t: nr },
  /*::[*/
  255: {},
  /* [MS-OLEPS] 2.18 */
  /*::[*/
  2147483648: { n: "Locale", t: mn },
  /*::[*/
  2147483651: { n: "Behavior", t: mn },
  /*::[*/
  1919054434: {}
};
function Fo(e) {
  return e.map(function(t) {
    return [t >> 16 & 255, t >> 8 & 255, t & 255];
  });
}
var yo = /* @__PURE__ */ Fo([
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
]), Co = /* @__PURE__ */ rr(yo), zt = {
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
}, Oo = {
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
}, nn = {
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
function Ci() {
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
function Oi(e, t) {
  var r = Bl(Oo), n = [], a;
  n[n.length] = Ie, n[n.length] = q("Types", null, {
    xmlns: Me.CT,
    "xmlns:xsd": Me.xsd,
    "xmlns:xsi": Me.xsi
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
    return q("Default", null, { Extension: o[0], ContentType: o[1] });
  }));
  var i = function(o) {
    e[o] && e[o].length > 0 && (a = e[o][0], n[n.length] = q("Override", null, {
      PartName: (a[0] == "/" ? "" : "/") + a,
      ContentType: nn[o][t.bookType] || nn[o].xlsx
    }));
  }, s = function(o) {
    (e[o] || []).forEach(function(l) {
      n[n.length] = q("Override", null, {
        PartName: (l[0] == "/" ? "" : "/") + l,
        ContentType: nn[o][t.bookType] || nn[o].xlsx
      });
    });
  }, f = function(o) {
    (e[o] || []).forEach(function(l) {
      n[n.length] = q("Override", null, {
        PartName: (l[0] == "/" ? "" : "/") + l,
        ContentType: r[o][0]
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
function Di(e) {
  var t = e.lastIndexOf("/");
  return e.slice(0, t + 1) + "_rels/" + e.slice(t + 1) + ".rels";
}
function ht(e) {
  var t = [Ie, q("Relationships", null, {
    //'xmlns:ns0': XMLNS.RELS,
    xmlns: Me.RELS
  })];
  return je(e["!id"]).forEach(function(r) {
    t[t.length] = q("Relationship", null, e["!id"][r]);
  }), t.length > 2 && (t[t.length] = "</Relationships>", t[1] = t[1].replace("/>", ">")), t.join("");
}
function ge(e, t, r, n, a, i) {
  if (a || (a = {}), e["!id"] || (e["!id"] = {}), e["!idx"] || (e["!idx"] = 1), t < 0)
    for (t = e["!idx"]; e["!id"]["rId" + t]; ++t)
      ;
  if (e["!idx"] = t + 1, a.Id = "rId" + t, a.Type = n, a.Target = r, i ? a.TargetMode = i : [xe.HLINK, xe.XPATH, xe.XMISS].indexOf(a.Type) > -1 && (a.TargetMode = "External"), e["!id"][a.Id])
    throw new Error("Cannot rewrite rId " + t);
  return e["!id"][a.Id] = a, e[("/" + a.Target).replace("//", "/")] = a, t;
}
function Do(e) {
  var t = [Ie];
  t.push(`<manifest:manifest xmlns:manifest="urn:oasis:names:tc:opendocument:xmlns:manifest:1.0" manifest:version="1.2">
`), t.push(`  <manifest:file-entry manifest:full-path="/" manifest:version="1.2" manifest:media-type="application/vnd.oasis.opendocument.spreadsheet"/>
`);
  for (var r = 0; r < e.length; ++r)
    t.push('  <manifest:file-entry manifest:full-path="' + e[r][0] + '" manifest:media-type="' + e[r][1] + `"/>
`);
  return t.push("</manifest:manifest>"), t.join("");
}
function ha(e, t, r) {
  return [
    '  <rdf:Description rdf:about="' + e + `">
`,
    '    <rdf:type rdf:resource="http://docs.oasis-open.org/ns/office/1.2/meta/' + (r || "odf") + "#" + t + `"/>
`,
    `  </rdf:Description>
`
  ].join("");
}
function Ro(e, t) {
  return [
    '  <rdf:Description rdf:about="' + e + `">
`,
    '    <ns0:hasPart xmlns:ns0="http://docs.oasis-open.org/ns/office/1.2/meta/pkg#" rdf:resource="' + t + `"/>
`,
    `  </rdf:Description>
`
  ].join("");
}
function ko(e) {
  var t = [Ie];
  t.push(`<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
`);
  for (var r = 0; r != e.length; ++r)
    t.push(ha(e[r][0], e[r][1])), t.push(Ro("", e[r][0]));
  return t.push(ha("", "Document", "pkg")), t.push("</rdf:RDF>"), t.join("");
}
function Ri() {
  return '<office:document-meta xmlns:office="urn:oasis:names:tc:opendocument:xmlns:office:1.0" xmlns:meta="urn:oasis:names:tc:opendocument:xmlns:meta:1.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:xlink="http://www.w3.org/1999/xlink" office:version="1.2"><office:meta><meta:generator>SheetJS ' + cn.version + "</meta:generator></office:meta></office:document-meta>";
}
var qr = [
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
function Gn(e, t, r, n, a) {
  a[e] != null || t == null || t === "" || (a[e] = t, t = me(t), n[n.length] = r ? q(e, t, r) : Ge(e, t));
}
function ki(e, t) {
  var r = t || {}, n = [Ie, q("cp:coreProperties", null, {
    //'xmlns': XMLNS.CORE_PROPS,
    "xmlns:cp": Me.CORE_PROPS,
    "xmlns:dc": Me.dc,
    "xmlns:dcterms": Me.dcterms,
    "xmlns:dcmitype": Me.dcmitype,
    "xmlns:xsi": Me.xsi
  })], a = {};
  if (!e && !r.Props)
    return n.join("");
  e && (e.CreatedDate != null && Gn("dcterms:created", typeof e.CreatedDate == "string" ? e.CreatedDate : Jn(e.CreatedDate, r.WTF), { "xsi:type": "dcterms:W3CDTF" }, n, a), e.ModifiedDate != null && Gn("dcterms:modified", typeof e.ModifiedDate == "string" ? e.ModifiedDate : Jn(e.ModifiedDate, r.WTF), { "xsi:type": "dcterms:W3CDTF" }, n, a));
  for (var i = 0; i != qr.length; ++i) {
    var s = qr[i], f = r.Props && r.Props[s[1]] != null ? r.Props[s[1]] : e ? e[s[1]] : null;
    f === !0 ? f = "1" : f === !1 ? f = "0" : typeof f == "number" && (f = String(f)), f != null && Gn(s[0], f, null, n, a);
  }
  return n.length > 2 && (n[n.length] = "</cp:coreProperties>", n[1] = n[1].replace("/>", ">")), n.join("");
}
var xt = [
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
], Ii = [
  "Worksheets",
  "SheetNames",
  "NamedRanges",
  "DefinedNames",
  "Chartsheets",
  "ChartNames"
];
function Ni(e) {
  var t = [], r = q;
  return e || (e = {}), e.Application = "SheetJS", t[t.length] = Ie, t[t.length] = q("Properties", null, {
    xmlns: Me.EXT_PROPS,
    "xmlns:vt": Me.vt
  }), xt.forEach(function(n) {
    if (e[n[1]] !== void 0) {
      var a;
      switch (n[2]) {
        case "string":
          a = me(String(e[n[1]]));
          break;
        case "bool":
          a = e[n[1]] ? "true" : "false";
          break;
      }
      a !== void 0 && (t[t.length] = r(n[0], a));
    }
  }), t[t.length] = r("HeadingPairs", r("vt:vector", r("vt:variant", "<vt:lpstr>Worksheets</vt:lpstr>") + r("vt:variant", r("vt:i4", String(e.Worksheets))), { size: 2, baseType: "variant" })), t[t.length] = r("TitlesOfParts", r("vt:vector", e.SheetNames.map(function(n) {
    return "<vt:lpstr>" + me(n) + "</vt:lpstr>";
  }).join(""), { size: e.Worksheets, baseType: "lpstr" })), t.length > 2 && (t[t.length] = "</Properties>", t[1] = t[1].replace("/>", ">")), t.join("");
}
function Pi(e) {
  var t = [Ie, q("Properties", null, {
    xmlns: Me.CUST_PROPS,
    "xmlns:vt": Me.vt
  })];
  if (!e)
    return t.join("");
  var r = 1;
  return je(e).forEach(function(a) {
    ++r, t[t.length] = q("property", Kl(e[a], !0), {
      fmtid: "{D5CDD505-2E9C-101B-9397-08002B2CF9AE}",
      pid: r,
      name: me(a)
    });
  }), t.length > 2 && (t[t.length] = "</Properties>", t[1] = t[1].replace("/>", ">")), t.join("");
}
var xa = {
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
function Io(e, t) {
  var r = [];
  return je(xa).map(function(n) {
    for (var a = 0; a < qr.length; ++a)
      if (qr[a][1] == n)
        return qr[a];
    for (a = 0; a < xt.length; ++a)
      if (xt[a][1] == n)
        return xt[a];
    throw n;
  }).forEach(function(n) {
    if (e[n[1]] != null) {
      var a = t && t.Props && t.Props[n[1]] != null ? t.Props[n[1]] : e[n[1]];
      switch (n[2]) {
        case "date":
          a = new Date(a).toISOString().replace(/\.\d*Z/, "Z");
          break;
      }
      typeof a == "number" ? a = String(a) : a === !0 || a === !1 ? a = a ? "1" : "0" : a instanceof Date && (a = new Date(a).toISOString().replace(/\.\d*Z/, "")), r.push(Ge(xa[n[1]] || n[1], a));
    }
  }), q("DocumentProperties", r.join(""), { xmlns: ir.o });
}
function No(e, t) {
  var r = ["Worksheets", "SheetNames"], n = "CustomDocumentProperties", a = [];
  return e && je(e).forEach(function(i) {
    if (Object.prototype.hasOwnProperty.call(e, i)) {
      for (var s = 0; s < qr.length; ++s)
        if (i == qr[s][1])
          return;
      for (s = 0; s < xt.length; ++s)
        if (i == xt[s][1])
          return;
      for (s = 0; s < r.length; ++s)
        if (i == r[s])
          return;
      var f = e[i], o = "string";
      typeof f == "number" ? (o = "float", f = String(f)) : f === !0 || f === !1 ? (o = "boolean", f = f ? "1" : "0") : f = String(f), a.push(q(ea(i), f, { "dt:dt": o }));
    }
  }), t && je(t).forEach(function(i) {
    if (Object.prototype.hasOwnProperty.call(t, i) && !(e && Object.prototype.hasOwnProperty.call(e, i))) {
      var s = t[i], f = "string";
      typeof s == "number" ? (f = "float", s = String(s)) : s === !0 || s === !1 ? (f = "boolean", s = s ? "1" : "0") : s instanceof Date ? (f = "dateTime.tz", s = s.toISOString()) : s = String(s), a.push(q(ea(i), s, { "dt:dt": f }));
    }
  }), "<" + n + ' xmlns="' + ir.o + '">' + a.join("") + "</" + n + ">";
}
function Po(e) {
  var t = typeof e == "string" ? new Date(Date.parse(e)) : e, r = t.getTime() / 1e3 + 11644473600, n = r % Math.pow(2, 32), a = (r - n) / Math.pow(2, 32);
  n *= 1e7, a *= 1e7;
  var i = n / Math.pow(2, 32) | 0;
  i > 0 && (n = n % Math.pow(2, 32), a += i);
  var s = B(8);
  return s.write_shift(4, n), s.write_shift(4, a), s;
}
function da(e, t) {
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
      n = Po(t);
      break;
    case 31:
    case 80:
      for (n = B(4 + 2 * (t.length + 1) + (t.length % 2 ? 0 : 2)), n.write_shift(4, t.length + 1), n.write_shift(0, t, "dbcs"); n.l != n.length; )
        n.write_shift(1, 0);
      break;
    default:
      throw new Error("TypedPropertyValue unrecognized type " + e + " " + t);
  }
  return Ve([r, n]);
}
var Li = ["CodePage", "Thumbnail", "_PID_LINKBASE", "_PID_HLINKS", "SystemIdentifier", "FMTID"];
function Lo(e) {
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
function pa(e, t, r) {
  var n = B(8), a = [], i = [], s = 8, f = 0, o = B(8), l = B(8);
  if (o.write_shift(4, 2), o.write_shift(4, 1200), l.write_shift(4, 1), i.push(o), a.push(l), s += 8 + o.length, !t) {
    l = B(8), l.write_shift(4, 0), a.unshift(l);
    var c = [B(4)];
    for (c[0].write_shift(4, e.length), f = 0; f < e.length; ++f) {
      var x = e[f][0];
      for (o = B(4 + 4 + 2 * (x.length + 1) + (x.length % 2 ? 0 : 2)), o.write_shift(4, f + 2), o.write_shift(4, x.length + 1), o.write_shift(0, x, "dbcs"); o.l != o.length; )
        o.write_shift(1, 0);
      c.push(o);
    }
    o = Ve(c), i.unshift(o), s += 8 + o.length;
  }
  for (f = 0; f < e.length; ++f)
    if (!(t && !t[e[f][0]]) && !(Li.indexOf(e[f][0]) > -1 || Ii.indexOf(e[f][0]) > -1) && e[f][1] != null) {
      var h = e[f][1], d = 0;
      if (t) {
        d = +t[e[f][0]];
        var m = r[d];
        if (m.p == "version" && typeof h == "string") {
          var u = h.split(".");
          h = (+u[0] << 16) + (+u[1] || 0);
        }
        o = da(m.t, h);
      } else {
        var g = Lo(h);
        g == -1 && (g = 31, h = String(h)), o = da(g, h);
      }
      i.push(o), l = B(8), l.write_shift(4, t ? d : 2 + f), a.push(l), s += 8 + o.length;
    }
  var F = 8 * (i.length + 1);
  for (f = 0; f < i.length; ++f)
    a[f].write_shift(4, F), F += i[f].length;
  return n.write_shift(4, s), n.write_shift(4, i.length), Ve([n].concat(a).concat(i));
}
function va(e, t, r, n, a, i) {
  var s = B(a ? 68 : 48), f = [s];
  s.write_shift(2, 65534), s.write_shift(2, 0), s.write_shift(4, 842412599), s.write_shift(16, we.utils.consts.HEADER_CLSID, "hex"), s.write_shift(4, a ? 2 : 1), s.write_shift(16, t, "hex"), s.write_shift(4, a ? 68 : 48);
  var o = pa(e, r, n);
  if (f.push(o), a) {
    var l = pa(a, null, null);
    s.write_shift(16, i, "hex"), s.write_shift(4, 68 + o.length), f.push(l);
  }
  return Ve(f);
}
function Mo(e, t) {
  t || (t = B(e));
  for (var r = 0; r < e; ++r)
    t.write_shift(1, 0);
  return t;
}
function Bo(e, t) {
  return e.read_shift(t) === 1;
}
function Je(e, t) {
  return t || (t = B(2)), t.write_shift(2, +!!e), t;
}
function Mi(e) {
  return e.read_shift(2, "u");
}
function hr(e, t) {
  return t || (t = B(2)), t.write_shift(2, e), t;
}
function Bi(e, t, r) {
  return r || (r = B(2)), r.write_shift(1, t == "e" ? +e : +!!e), r.write_shift(1, t == "e" ? 1 : 0), r;
}
function bi(e, t, r) {
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
function bo(e) {
  var t = e.t || "", r = B(3 + 0);
  r.write_shift(2, t.length), r.write_shift(1, 1);
  var n = B(2 * t.length);
  n.write_shift(2 * t.length, t, "utf16le");
  var a = [r, n];
  return Ve(a);
}
function Uo(e, t, r) {
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
function Ho(e, t, r) {
  var n = e.read_shift(r && r.biff == 2 ? 1 : 2);
  return n === 0 ? (e.l++, "") : Uo(e, n, r);
}
function Wo(e, t, r) {
  if (r.biff > 5)
    return Ho(e, t, r);
  var n = e.read_shift(1);
  return n === 0 ? (e.l++, "") : e.read_shift(n, r.biff <= 4 || !e.lens ? "cpstr" : "sbcs-cont");
}
function Ui(e, t, r) {
  return r || (r = B(3 + 2 * e.length)), r.write_shift(2, e.length), r.write_shift(1, 1), r.write_shift(31, e, "utf16le"), r;
}
function ga(e, t) {
  t || (t = B(6 + e.length * 2)), t.write_shift(4, 1 + e.length);
  for (var r = 0; r < e.length; ++r)
    t.write_shift(2, e.charCodeAt(r));
  return t.write_shift(2, 0), t;
}
function Vo(e) {
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
    n = n.slice(1), ga(n, t);
  else if (i & 2) {
    for (s = "e0 c9 ea 79 f9 ba ce 11 8c 82 00 aa 00 4b a9 0b".split(" "), r = 0; r < s.length; ++r)
      t.write_shift(1, parseInt(s[r], 16));
    var f = a > -1 ? n.slice(0, a) : n;
    for (t.write_shift(4, 2 * (f.length + 1)), r = 0; r < f.length; ++r)
      t.write_shift(2, f.charCodeAt(r));
    t.write_shift(2, 0), i & 8 && ga(a > -1 ? n.slice(a + 1) : "", t);
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
function Qr(e, t, r, n) {
  return n || (n = B(6)), n.write_shift(2, e), n.write_shift(2, t), n.write_shift(2, r || 0), n;
}
function Go(e, t, r) {
  var n = r.biff > 8 ? 4 : 2, a = e.read_shift(n), i = e.read_shift(n, "i"), s = e.read_shift(n, "i");
  return [a, i, s];
}
function Xo(e) {
  var t = e.read_shift(2), r = e.read_shift(2), n = e.read_shift(2), a = e.read_shift(2);
  return { s: { c: n, r: t }, e: { c: a, r } };
}
function Hi(e, t) {
  return t || (t = B(8)), t.write_shift(2, e.s.r), t.write_shift(2, e.e.r), t.write_shift(2, e.s.c), t.write_shift(2, e.e.c), t;
}
function g0(e, t, r) {
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
function jo(e, t) {
  var r = !t || t.biff == 8, n = B(r ? 112 : 54);
  for (n.write_shift(t.biff == 8 ? 2 : 1, 7), r && n.write_shift(1, 0), n.write_shift(4, 859007059), n.write_shift(4, 5458548 | (r ? 0 : 536870912)); n.l < n.length; )
    n.write_shift(1, r ? 0 : 32);
  return n;
}
function zo(e, t) {
  var r = !t || t.biff >= 8 ? 2 : 1, n = B(8 + r * e.name.length);
  n.write_shift(4, e.pos), n.write_shift(1, e.hs || 0), n.write_shift(1, e.dt), n.write_shift(1, e.name.length), t.biff >= 8 && n.write_shift(1, 1), n.write_shift(r * e.name.length, e.name, t.biff < 8 ? "sbcs" : "utf16le");
  var a = n.slice(0, n.l);
  return a.l = n.l, a;
}
function $o(e, t) {
  var r = B(8);
  r.write_shift(4, e.Count), r.write_shift(4, e.Unique);
  for (var n = [], a = 0; a < e.length; ++a)
    n[a] = bo(e[a]);
  var i = Ve([r].concat(n));
  return i.parts = [r.length].concat(n.map(function(s) {
    return s.length;
  })), i;
}
function Ko() {
  var e = B(18);
  return e.write_shift(2, 0), e.write_shift(2, 0), e.write_shift(2, 29280), e.write_shift(2, 17600), e.write_shift(2, 56), e.write_shift(2, 0), e.write_shift(2, 0), e.write_shift(2, 1), e.write_shift(2, 500), e;
}
function Yo(e) {
  var t = B(18), r = 1718;
  return e && e.RTL && (r |= 64), t.write_shift(2, r), t.write_shift(4, 0), t.write_shift(4, 64), t.write_shift(4, 0), t.write_shift(4, 0), t;
}
function qo(e, t) {
  var r = e.name || "Arial", n = t && t.biff == 5, a = n ? 15 + r.length : 16 + 2 * r.length, i = B(a);
  return i.write_shift(2, (e.sz || 12) * 20), i.write_shift(4, 0), i.write_shift(2, 400), i.write_shift(4, 0), i.write_shift(2, 0), i.write_shift(1, r.length), n || i.write_shift(1, 1), i.write_shift((n ? 1 : 2) * r.length, r, n ? "sbcs" : "utf16le"), i;
}
function Jo(e, t, r, n) {
  var a = B(10);
  return Qr(e, t, n, a), a.write_shift(4, r), a;
}
function Zo(e, t, r, n, a) {
  var i = !a || a.biff == 8, s = B(6 + 2 + +i + (1 + i) * r.length);
  return Qr(e, t, n, s), s.write_shift(2, r.length), i && s.write_shift(1, 1), s.write_shift((1 + i) * r.length, r, i ? "utf16le" : "sbcs"), s;
}
function Qo(e, t, r, n) {
  var a = r && r.biff == 5;
  n || (n = B(a ? 3 + t.length : 5 + 2 * t.length)), n.write_shift(2, e), n.write_shift(a ? 1 : 2, t.length), a || n.write_shift(1, 1), n.write_shift((a ? 1 : 2) * t.length, t, a ? "sbcs" : "utf16le");
  var i = n.length > n.l ? n.slice(0, n.l) : n;
  return i.l == null && (i.l = i.length), i;
}
function ec(e, t) {
  var r = t.biff == 8 || !t.biff ? 4 : 2, n = B(2 * r + 6);
  return n.write_shift(r, e.s.r), n.write_shift(r, e.e.r + 1), n.write_shift(2, e.s.c), n.write_shift(2, e.e.c + 1), n.write_shift(2, 0), n;
}
function ma(e, t, r, n) {
  var a = r && r.biff == 5;
  n || (n = B(a ? 16 : 20)), n.write_shift(2, 0), e.style ? (n.write_shift(2, e.numFmtId || 0), n.write_shift(2, 65524)) : (n.write_shift(2, e.numFmtId || 0), n.write_shift(2, t << 4));
  var i = 0;
  return e.numFmtId > 0 && a && (i |= 1024), n.write_shift(4, i), n.write_shift(4, 0), a || n.write_shift(4, 0), n.write_shift(2, 0), n;
}
function rc(e) {
  var t = B(8);
  return t.write_shift(4, 0), t.write_shift(2, e[0] ? e[0] + 1 : 0), t.write_shift(2, e[1] ? e[1] + 1 : 0), t;
}
function tc(e, t, r, n, a, i) {
  var s = B(8);
  return Qr(e, t, n, s), Bi(r, i, s), s;
}
function nc(e, t, r, n) {
  var a = B(14);
  return Qr(e, t, n, a), Zr(r, a), a;
}
function ac(e, t, r) {
  if (r.biff < 8)
    return ic(e, t, r);
  for (var n = [], a = e.l + t, i = e.read_shift(r.biff > 8 ? 4 : 2); i-- !== 0; )
    n.push(Go(e, r.biff > 8 ? 12 : 6, r));
  if (e.l != a)
    throw new Error("Bad ExternSheet: " + e.l + " != " + a);
  return n;
}
function ic(e, t, r) {
  e[e.l + 1] == 3 && e[e.l]++;
  var n = bi(e, t, r);
  return n.charCodeAt(0) == 3 ? n.slice(1) : n;
}
function sc(e) {
  var t = B(2 + e.length * 8);
  t.write_shift(2, e.length);
  for (var r = 0; r < e.length; ++r)
    Hi(e[r], t);
  return t;
}
function fc(e) {
  var t = B(24), r = Be(e[0]);
  t.write_shift(2, r.r), t.write_shift(2, r.r), t.write_shift(2, r.c), t.write_shift(2, r.c);
  for (var n = "d0 c9 ea 79 f9 ba ce 11 8c 82 00 aa 00 4b a9 0b".split(" "), a = 0; a < 16; ++a)
    t.write_shift(1, parseInt(n[a], 16));
  return Ve([t, Vo(e[1])]);
}
function lc(e) {
  var t = e[1].Tooltip, r = B(10 + 2 * (t.length + 1));
  r.write_shift(2, 2048);
  var n = Be(e[0]);
  r.write_shift(2, n.r), r.write_shift(2, n.r), r.write_shift(2, n.c), r.write_shift(2, n.c);
  for (var a = 0; a < t.length; ++a)
    r.write_shift(2, t.charCodeAt(a));
  return r.write_shift(2, 0), r;
}
function oc(e) {
  return e || (e = B(4)), e.write_shift(2, 1), e.write_shift(2, 1), e;
}
function cc(e, t, r) {
  if (!r.cellStyles)
    return Ar(e, t);
  var n = r && r.biff >= 12 ? 4 : 2, a = e.read_shift(n), i = e.read_shift(n), s = e.read_shift(n), f = e.read_shift(n), o = e.read_shift(2);
  n == 2 && (e.l += 2);
  var l = { s: a, e: i, w: s, ixfe: f, flags: o };
  return (r.biff >= 5 || !r.biff) && (l.level = o >> 8 & 7), l;
}
function uc(e, t) {
  var r = B(12);
  r.write_shift(2, t), r.write_shift(2, t), r.write_shift(2, e.width * 256), r.write_shift(2, 0);
  var n = 0;
  return e.hidden && (n |= 1), r.write_shift(1, n), n = e.level || 0, r.write_shift(1, n), r.write_shift(2, 0), r;
}
function hc(e) {
  for (var t = B(2 * e), r = 0; r < e; ++r)
    t.write_shift(2, r + 1);
  return t;
}
function xc(e, t, r) {
  var n = B(15);
  return Kt(n, e, t), n.write_shift(8, r, "f"), n;
}
function dc(e, t, r) {
  var n = B(9);
  return Kt(n, e, t), n.write_shift(2, r), n;
}
var pc = /* @__PURE__ */ function() {
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
  }, t = s0({
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
    var l = [], c = Jr(1);
    switch (o.type) {
      case "base64":
        c = gr(Ir(f));
        break;
      case "binary":
        c = gr(f);
        break;
      case "buffer":
      case "array":
        c = f;
        break;
    }
    ar(c, 0);
    var x = c.read_shift(1), h = !!(x & 136), d = !1, m = !1;
    switch (x) {
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
        m = !0;
        break;
      case 245:
        break;
      default:
        throw new Error("DBF Unsupported Version: " + x.toString(16));
    }
    var u = 0, g = 521;
    x == 2 && (u = c.read_shift(2)), c.l += 3, x != 2 && (u = c.read_shift(4)), u > 1048576 && (u = 1e6), x != 2 && (g = c.read_shift(2));
    var F = c.read_shift(2), O = o.codepage || 1252;
    x != 2 && (c.l += 16, c.read_shift(1), c[c.l] !== 0 && (O = e[c[c.l]]), c.l += 1, c.l += 2), m && (c.l += 36);
    for (var y = [], L = {}, z = Math.min(c.length, x == 2 ? 521 : g - 10 - (d ? 264 : 0)), ee = m ? 32 : 11; c.l < z && c[c.l] != 13; )
      switch (L = {}, L.name = Kr.utils.decode(O, c.slice(c.l, c.l + ee)).replace(/[\u0000\r\n].*$/g, ""), c.l += ee, L.type = String.fromCharCode(c.read_shift(1)), x != 2 && !m && (L.offset = c.read_shift(4)), L.len = c.read_shift(1), x == 2 && (L.offset = c.read_shift(2)), L.dec = c.read_shift(1), L.name.length && y.push(L), x != 2 && (c.l += m ? 13 : 14), L.type) {
        case "B":
          (!d || L.len != 8) && o.WTF && console.log("Skipping " + L.name + ":" + L.type);
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
    for (l[0] = [], U = 0; U != y.length; ++U)
      l[0][U] = y[U].name;
    for (; u-- > 0; ) {
      if (c[c.l] === 42) {
        c.l += F;
        continue;
      }
      for (++c.l, l[++D] = [], U = 0, U = 0; U != y.length; ++U) {
        var M = c.slice(c.l, c.l + y[U].len);
        c.l += y[U].len, ar(M, 0);
        var V = Kr.utils.decode(O, M);
        switch (y[U].type) {
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
            l[D][U] = m ? M.read_shift(-4, "i") ^ 2147483648 : M.read_shift(4, "i");
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
              throw new Error("DBF Unexpected MEMO for type " + x.toString(16));
            l[D][U] = "##MEMO##" + (m ? parseInt(V.trim(), 10) : M.read_shift(4));
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
            if (d && y[U].len == 8) {
              l[D][U] = M.read_shift(8, "f");
              break;
            }
          case "G":
          case "P":
            M.l += y[U].len;
            break;
          case "0":
            if (y[U].name === "_NullFlags")
              break;
          default:
            throw new Error("DBF Unsupported data type " + y[U].type);
        }
      }
    }
    if (x != 2 && c.l < c.length && c[c.l++] != 26)
      throw new Error("DBF EOF Marker missing " + (c.l - 1) + " of " + c.length + " " + c[c.l - 1].toString(16));
    return o && o.sheetRows && (l = l.slice(0, o.sheetRows)), o.DBF = y, l;
  }
  function n(f, o) {
    var l = o || {};
    l.dateNF || (l.dateNF = "yyyymmdd");
    var c = Tt(r(f, l), l);
    return c["!cols"] = l.DBF.map(function(x) {
      return {
        wch: x.len,
        DBF: x
      };
    }), delete l.DBF, c;
  }
  function a(f, o) {
    try {
      return et(n(f, o), o);
    } catch (l) {
      if (o && o.WTF)
        throw l;
    }
    return { SheetNames: [], Sheets: {} };
  }
  var i = { B: 8, C: 250, L: 1, D: 8, "?": 0, "": 0 };
  function s(f, o) {
    var l = o || {};
    if (+l.codepage >= 0 && Mt(+l.codepage), l.type == "string")
      throw new Error("Cannot write DBF to JS string");
    var c = Qe(), x = Sn(f, { header: 1, raw: !0, cellDates: !0 }), h = x[0], d = x.slice(1), m = f["!cols"] || [], u = 0, g = 0, F = 0, O = 1;
    for (u = 0; u < h.length; ++u) {
      if (((m[u] || {}).DBF || {}).name) {
        h[u] = m[u].DBF.name, ++F;
        continue;
      }
      if (h[u] != null) {
        if (++F, typeof h[u] == "number" && (h[u] = h[u].toString(10)), typeof h[u] != "string")
          throw new Error("DBF Invalid column name " + h[u] + " |" + typeof h[u] + "|");
        if (h.indexOf(h[u]) !== u) {
          for (g = 0; g < 1024; ++g)
            if (h.indexOf(h[u] + "_" + g) == -1) {
              h[u] += "_" + g;
              break;
            }
        }
      }
    }
    var y = Se(f["!ref"]), L = [], z = [], ee = [];
    for (u = 0; u <= y.e.c - y.s.c; ++u) {
      var D = "", U = "", M = 0, V = [];
      for (g = 0; g < d.length; ++g)
        d[g][u] != null && V.push(d[g][u]);
      if (V.length == 0 || h[u] == null) {
        L[u] = "?";
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
      M > 250 && (M = 250), U = ((m[u] || {}).DBF || {}).type, U == "C" && m[u].DBF.len > M && (M = m[u].DBF.len), D == "B" && U == "N" && (D = "N", ee[u] = m[u].DBF.dec, M = m[u].DBF.len), z[u] = D == "C" || U == "N" ? M : i[D] || 0, O += z[u], L[u] = D;
    }
    var G = c.next(32);
    for (G.write_shift(4, 318902576), G.write_shift(4, d.length), G.write_shift(2, 296 + 32 * F), G.write_shift(2, O), u = 0; u < 4; ++u)
      G.write_shift(4, 0);
    for (G.write_shift(4, 0 | (+t[
      /*::String(*/
      Va
      /*::)*/
    ] || 3) << 8), u = 0, g = 0; u < h.length; ++u)
      if (h[u] != null) {
        var K = c.next(32), te = (h[u].slice(-10) + "\0\0\0\0\0\0\0\0\0\0\0").slice(0, 11);
        K.write_shift(1, te, "sbcs"), K.write_shift(1, L[u] == "?" ? "C" : L[u], "sbcs"), K.write_shift(4, g), K.write_shift(1, z[u] || i[L[u]] || 0), K.write_shift(1, ee[u] || 0), K.write_shift(1, 2), K.write_shift(4, 0), K.write_shift(1, 0), K.write_shift(4, 0), K.write_shift(4, 0), g += z[u] || i[L[u]] || 0;
      }
    var Te = c.next(264);
    for (Te.write_shift(4, 13), u = 0; u < 65; ++u)
      Te.write_shift(4, 0);
    for (u = 0; u < d.length; ++u) {
      var oe = c.next(O);
      for (oe.write_shift(1, 0), g = 0; g < h.length; ++g)
        if (h[g] != null)
          switch (L[g]) {
            case "L":
              oe.write_shift(1, d[u][g] == null ? 63 : d[u][g] ? 84 : 70);
              break;
            case "B":
              oe.write_shift(8, d[u][g] || 0, "f");
              break;
            case "N":
              var Ue = "0";
              for (typeof d[u][g] == "number" && (Ue = d[u][g].toFixed(ee[g] || 0)), F = 0; F < z[g] - Ue.length; ++F)
                oe.write_shift(1, 32);
              oe.write_shift(1, Ue, "sbcs");
              break;
            case "D":
              d[u][g] ? (oe.write_shift(4, ("0000" + d[u][g].getFullYear()).slice(-4), "sbcs"), oe.write_shift(2, ("00" + (d[u][g].getMonth() + 1)).slice(-2), "sbcs"), oe.write_shift(2, ("00" + d[u][g].getDate()).slice(-2), "sbcs")) : oe.write_shift(8, "00000000", "sbcs");
              break;
            case "C":
              var De = String(d[u][g] != null ? d[u][g] : "").slice(0, z[g]);
              for (oe.write_shift(1, De, "sbcs"), F = 0; F < z[g] - De.length; ++F)
                oe.write_shift(1, 32);
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
}(), vc = /* @__PURE__ */ function() {
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
  }, t = new RegExp("\x1BN(" + je(e).join("|").replace(/\|\|\|/, "|\\||").replace(/([?()+])/g, "\\$1") + "|\\|)", "gm"), r = function(h, d) {
    var m = e[d];
    return typeof m == "number" ? V0(m) : m;
  }, n = function(h, d, m) {
    var u = d.charCodeAt(0) - 32 << 4 | m.charCodeAt(0) - 48;
    return u == 59 ? h : V0(u);
  };
  e["|"] = 254;
  function a(h, d) {
    switch (d.type) {
      case "base64":
        return i(Ir(h), d);
      case "binary":
        return i(h, d);
      case "buffer":
        return i(de && Buffer.isBuffer(h) ? h.toString("binary") : Gt(h), d);
      case "array":
        return i(Dn(h), d);
    }
    throw new Error("Unrecognized type " + d.type);
  }
  function i(h, d) {
    var m = h.split(/[\n\r]+/), u = -1, g = -1, F = 0, O = 0, y = [], L = [], z = null, ee = {}, D = [], U = [], M = [], V = 0, G;
    for (+d.codepage >= 0 && Mt(+d.codepage); F !== m.length; ++F) {
      V = 0;
      var K = m[F].trim().replace(/\x1B([\x20-\x2F])([\x30-\x3F])/g, n).replace(t, r), te = K.replace(/;;/g, "\0").split(";").map(function(A) {
        return A.replace(/\u0000/g, ";");
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
            te[1].charAt(0) == "P" && L.push(K.slice(3).replace(/;;/g, ";"));
            break;
          case "C":
            var Ue = !1, De = !1, dr = !1, Pe = !1, or = -1, tr = -1;
            for (O = 1; O < te.length; ++O)
              switch (te[O].charAt(0)) {
                case "A":
                  break;
                case "X":
                  g = parseInt(te[O].slice(1)) - 1, De = !0;
                  break;
                case "Y":
                  for (u = parseInt(te[O].slice(1)) - 1, De || (g = 0), G = y.length; G <= u; ++G)
                    y[G] = [];
                  break;
                case "K":
                  oe = te[O].slice(1), oe.charAt(0) === '"' ? oe = oe.slice(1, oe.length - 1) : oe === "TRUE" ? oe = !0 : oe === "FALSE" ? oe = !1 : isNaN(Rr(oe)) ? isNaN(bt(oe).getDate()) || (oe = Ze(oe)) : (oe = Rr(oe), z !== null && ei(z) && (oe = ai(oe))), Ue = !0;
                  break;
                case "E":
                  Pe = !0;
                  var S = du(te[O].slice(1), { r: u, c: g });
                  y[u][g] = [y[u][g], S];
                  break;
                case "S":
                  dr = !0, y[u][g] = [y[u][g], "S5S"];
                  break;
                case "G":
                  break;
                case "R":
                  or = parseInt(te[O].slice(1)) - 1;
                  break;
                case "C":
                  tr = parseInt(te[O].slice(1)) - 1;
                  break;
                default:
                  if (d && d.WTF)
                    throw new Error("SYLK bad record " + K);
              }
            if (Ue && (y[u][g] && y[u][g].length == 2 ? y[u][g][0] = oe : y[u][g] = oe, z = null), dr) {
              if (Pe)
                throw new Error("SYLK shared formula cannot have own formula");
              var P = or > -1 && y[or][tr];
              if (!P || !P[1])
                throw new Error("SYLK shared formula cannot find base");
              y[u][g][1] = pu(P[1], { r: u - or, c: g - tr });
            }
            break;
          case "F":
            var C = 0;
            for (O = 1; O < te.length; ++O)
              switch (te[O].charAt(0)) {
                case "X":
                  g = parseInt(te[O].slice(1)) - 1, ++C;
                  break;
                case "Y":
                  for (u = parseInt(te[O].slice(1)) - 1, G = y.length; G <= u; ++G)
                    y[G] = [];
                  break;
                case "M":
                  V = parseInt(te[O].slice(1)) / 20;
                  break;
                case "F":
                  break;
                case "G":
                  break;
                case "P":
                  z = L[parseInt(te[O].slice(1))];
                  break;
                case "S":
                  break;
                case "D":
                  break;
                case "N":
                  break;
                case "W":
                  for (M = te[O].slice(1).split(" "), G = parseInt(M[0], 10); G <= parseInt(M[1], 10); ++G)
                    V = parseInt(M[2], 10), U[G - 1] = V === 0 ? { hidden: !0 } : { wch: V }, m0(U[G - 1]);
                  break;
                case "C":
                  g = parseInt(te[O].slice(1)) - 1, U[g] || (U[g] = {});
                  break;
                case "R":
                  u = parseInt(te[O].slice(1)) - 1, D[u] || (D[u] = {}), V > 0 ? (D[u].hpt = V, D[u].hpx = ji(V)) : V === 0 && (D[u].hidden = !0);
                  break;
                default:
                  if (d && d.WTF)
                    throw new Error("SYLK bad record " + K);
              }
            C < 1 && (z = null);
            break;
          default:
            if (d && d.WTF)
              throw new Error("SYLK bad record " + K);
        }
    }
    return D.length > 0 && (ee["!rows"] = D), U.length > 0 && (ee["!cols"] = U), d && d.sheetRows && (y = y.slice(0, d.sheetRows)), [y, ee];
  }
  function s(h, d) {
    var m = a(h, d), u = m[0], g = m[1], F = Tt(u, d);
    return je(g).forEach(function(O) {
      F[O] = g[O];
    }), F;
  }
  function f(h, d) {
    return et(s(h, d), d);
  }
  function o(h, d, m, u) {
    var g = "C;Y" + (m + 1) + ";X" + (u + 1) + ";K";
    switch (h.t) {
      case "n":
        g += h.v || 0, h.f && !h.F && (g += ";E" + T0(h.f, { r: m, c: u }));
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
  function l(h, d) {
    d.forEach(function(m, u) {
      var g = "F;W" + (u + 1) + " " + (u + 1) + " ";
      m.hidden ? g += "0" : (typeof m.width == "number" && !m.wpx && (m.wpx = _n(m.width)), typeof m.wpx == "number" && !m.wch && (m.wch = Tn(m.wpx)), typeof m.wch == "number" && (g += Math.round(m.wch))), g.charAt(g.length - 1) != " " && h.push(g);
    });
  }
  function c(h, d) {
    d.forEach(function(m, u) {
      var g = "F;";
      m.hidden ? g += "M0;" : m.hpt ? g += "M" + 20 * m.hpt + ";" : m.hpx && (g += "M" + 20 * wn(m.hpx) + ";"), g.length > 2 && h.push(g + "R" + (u + 1));
    });
  }
  function x(h, d) {
    var m = ["ID;PWXL;N;E"], u = [], g = Se(h["!ref"]), F, O = Array.isArray(h), y = `\r
`;
    m.push("P;PGeneral"), m.push("F;P0;DG0G8;M255"), h["!cols"] && l(m, h["!cols"]), h["!rows"] && c(m, h["!rows"]), m.push("B;Y" + (g.e.r - g.s.r + 1) + ";X" + (g.e.c - g.s.c + 1) + ";D" + [g.s.c, g.s.r, g.e.c, g.e.r].join(" "));
    for (var L = g.s.r; L <= g.e.r; ++L)
      for (var z = g.s.c; z <= g.e.c; ++z) {
        var ee = _e({ r: L, c: z });
        F = O ? (h[L] || [])[z] : h[ee], !(!F || F.v == null && (!F.f || F.F)) && u.push(o(F, h, L, z));
      }
    return m.join(y) + y + u.join(y) + y + "E" + y;
  }
  return {
    to_workbook: f,
    to_sheet: s,
    from_sheet: x
  };
}(), gc = /* @__PURE__ */ function() {
  function e(i, s) {
    switch (s.type) {
      case "base64":
        return t(Ir(i), s);
      case "binary":
        return t(i, s);
      case "buffer":
        return t(de && Buffer.isBuffer(i) ? i.toString("binary") : Gt(i), s);
      case "array":
        return t(Dn(i), s);
    }
    throw new Error("Unrecognized type " + s.type);
  }
  function t(i, s) {
    for (var f = i.split(`
`), o = -1, l = -1, c = 0, x = []; c !== f.length; ++c) {
      if (f[c].trim() === "BOT") {
        x[++o] = [], l = 0;
        continue;
      }
      if (!(o < 0)) {
        var h = f[c].trim().split(","), d = h[0], m = h[1];
        ++c;
        for (var u = f[c] || ""; (u.match(/["]/g) || []).length & 1 && c < f.length - 1; )
          u += `
` + f[++c];
        switch (u = u.trim(), +d) {
          case -1:
            if (u === "BOT") {
              x[++o] = [], l = 0;
              continue;
            } else if (u !== "EOD")
              throw new Error("Unrecognized DIF special command " + u);
            break;
          case 0:
            u === "TRUE" ? x[o][l] = !0 : u === "FALSE" ? x[o][l] = !1 : isNaN(Rr(m)) ? isNaN(bt(m).getDate()) ? x[o][l] = m : x[o][l] = Ze(m) : x[o][l] = Rr(m), ++l;
            break;
          case 1:
            u = u.slice(1, u.length - 1), u = u.replace(/""/g, '"'), u && u.match(/^=".*"$/) && (u = u.slice(2, -1)), x[o][l++] = u !== "" ? u : null;
            break;
        }
        if (u === "EOD")
          break;
      }
    }
    return s && s.sheetRows && (x = x.slice(0, s.sheetRows)), x;
  }
  function r(i, s) {
    return Tt(e(i, s), s);
  }
  function n(i, s) {
    return et(r(i, s), s);
  }
  var a = /* @__PURE__ */ function() {
    var i = function(o, l, c, x, h) {
      o.push(l), o.push(c + "," + x), o.push('"' + h.replace(/"/g, '""') + '"');
    }, s = function(o, l, c, x) {
      o.push(l + "," + c), o.push(l == 1 ? '"' + x.replace(/"/g, '""') + '"' : x);
    };
    return function(o) {
      var l = [], c = Se(o["!ref"]), x, h = Array.isArray(o);
      i(l, "TABLE", 0, 1, "sheetjs"), i(l, "VECTORS", 0, c.e.r - c.s.r + 1, ""), i(l, "TUPLES", 0, c.e.c - c.s.c + 1, ""), i(l, "DATA", 0, 0, "");
      for (var d = c.s.r; d <= c.e.r; ++d) {
        s(l, -1, 0, "BOT");
        for (var m = c.s.c; m <= c.e.c; ++m) {
          var u = _e({ r: d, c: m });
          if (x = h ? (o[d] || [])[m] : o[u], !x) {
            s(l, 1, 0, "");
            continue;
          }
          switch (x.t) {
            case "n":
              var g = x.w;
              !g && x.v != null && (g = x.v), g == null ? x.f && !x.F ? s(l, 1, 0, "=" + x.f) : s(l, 1, 0, "") : s(l, 0, g, "V");
              break;
            case "b":
              s(l, 0, x.v ? 1 : 0, x.v ? "TRUE" : "FALSE");
              break;
            case "s":
              s(l, 1, 0, isNaN(x.v) ? x.v : '="' + x.v + '"');
              break;
            case "d":
              x.w || (x.w = Wr(x.z || Oe[14], er(Ze(x.v)))), s(l, 0, x.w, "V");
              break;
            default:
              s(l, 1, 0, "");
          }
        }
      }
      s(l, -1, 0, "EOD");
      var F = `\r
`, O = l.join(F);
      return O;
    };
  }();
  return {
    to_workbook: n,
    to_sheet: r,
    from_sheet: a
  };
}(), Wi = /* @__PURE__ */ function() {
  function e(x) {
    return x.replace(/\\b/g, "\\").replace(/\\c/g, ":").replace(/\\n/g, `
`);
  }
  function t(x) {
    return x.replace(/\\/g, "\\b").replace(/:/g, "\\c").replace(/\n/g, "\\n");
  }
  function r(x, h) {
    for (var d = x.split(`
`), m = -1, u = -1, g = 0, F = []; g !== d.length; ++g) {
      var O = d[g].trim().split(":");
      if (O[0] === "cell") {
        var y = Be(O[1]);
        if (F.length <= y.r)
          for (m = F.length; m <= y.r; ++m)
            F[m] || (F[m] = []);
        switch (m = y.r, u = y.c, O[2]) {
          case "t":
            F[m][u] = e(O[3]);
            break;
          case "v":
            F[m][u] = +O[3];
            break;
          case "vtf":
            var L = O[O.length - 1];
          case "vtc":
            switch (O[3]) {
              case "nl":
                F[m][u] = !!+O[4];
                break;
              default:
                F[m][u] = +O[4];
                break;
            }
            O[2] == "vtf" && (F[m][u] = [F[m][u], L]);
        }
      }
    }
    return h && h.sheetRows && (F = F.slice(0, h.sheetRows)), F;
  }
  function n(x, h) {
    return Tt(r(x, h), h);
  }
  function a(x, h) {
    return et(n(x, h), h);
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
  function l(x) {
    if (!x || !x["!ref"])
      return "";
    for (var h = [], d = [], m, u = "", g = fr(x["!ref"]), F = Array.isArray(x), O = g.s.r; O <= g.e.r; ++O)
      for (var y = g.s.c; y <= g.e.c; ++y)
        if (u = _e({ r: O, c: y }), m = F ? (x[O] || [])[y] : x[u], !(!m || m.v == null || m.t === "z")) {
          switch (d = ["cell", u, "t"], m.t) {
            case "s":
            case "str":
              d.push(t(m.v));
              break;
            case "n":
              m.f ? (d[2] = "vtf", d[3] = "n", d[4] = m.v, d[5] = t(m.f)) : (d[2] = "v", d[3] = m.v);
              break;
            case "b":
              d[2] = "vt" + (m.f ? "f" : "c"), d[3] = "nl", d[4] = m.v ? "1" : "0", d[5] = t(m.f || (m.v ? "TRUE" : "FALSE"));
              break;
            case "d":
              var L = er(Ze(m.v));
              d[2] = "vtc", d[3] = "nd", d[4] = "" + L, d[5] = m.w || Wr(m.z || Oe[14], L);
              break;
            case "e":
              continue;
          }
          h.push(d.join(":"));
        }
    return h.push("sheet:c:" + (g.e.c - g.s.c + 1) + ":r:" + (g.e.r - g.s.r + 1) + ":tvf:1"), h.push("valueformat:1:text-wiki"), h.join(`
`);
  }
  function c(x) {
    return [i, s, f, s, l(x), o].join(`
`);
  }
  return {
    to_workbook: a,
    to_sheet: n,
    from_sheet: c
  };
}(), mc = /* @__PURE__ */ function() {
  function e(c, x, h, d, m) {
    m.raw ? x[h][d] = c : c === "" || (c === "TRUE" ? x[h][d] = !0 : c === "FALSE" ? x[h][d] = !1 : isNaN(Rr(c)) ? isNaN(bt(c).getDate()) ? x[h][d] = c : x[h][d] = Ze(c) : x[h][d] = Rr(c));
  }
  function t(c, x) {
    var h = x || {}, d = [];
    if (!c || c.length === 0)
      return d;
    for (var m = c.split(/[\r\n]/), u = m.length - 1; u >= 0 && m[u].length === 0; )
      --u;
    for (var g = 10, F = 0, O = 0; O <= u; ++O)
      F = m[O].indexOf(" "), F == -1 ? F = m[O].length : F++, g = Math.max(g, F);
    for (O = 0; O <= u; ++O) {
      d[O] = [];
      var y = 0;
      for (e(m[O].slice(0, g).trim(), d, O, y, h), y = 1; y <= (m[O].length - g) / 10 + 1; ++y)
        e(m[O].slice(g + (y - 1) * 10, g + y * 10).trim(), d, O, y, h);
    }
    return h.sheetRows && (d = d.slice(0, h.sheetRows)), d;
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
    for (var x = {}, h = !1, d = 0, m = 0; d < c.length; ++d)
      (m = c.charCodeAt(d)) == 34 ? h = !h : !h && m in r && (x[m] = (x[m] || 0) + 1);
    m = [];
    for (d in x)
      Object.prototype.hasOwnProperty.call(x, d) && m.push([x[d], d]);
    if (!m.length) {
      x = n;
      for (d in x)
        Object.prototype.hasOwnProperty.call(x, d) && m.push([x[d], d]);
    }
    return m.sort(function(u, g) {
      return u[0] - g[0] || n[u[1]] - n[g[1]];
    }), r[m.pop()[1]] || 44;
  }
  function i(c, x) {
    var h = x || {}, d = "", m = h.dense ? [] : {}, u = { s: { c: 0, r: 0 }, e: { c: 0, r: 0 } };
    c.slice(0, 4) == "sep=" ? c.charCodeAt(5) == 13 && c.charCodeAt(6) == 10 ? (d = c.charAt(4), c = c.slice(7)) : c.charCodeAt(5) == 13 || c.charCodeAt(5) == 10 ? (d = c.charAt(4), c = c.slice(6)) : d = a(c.slice(0, 1024)) : h && h.FS ? d = h.FS : d = a(c.slice(0, 1024));
    var g = 0, F = 0, O = 0, y = 0, L = 0, z = d.charCodeAt(0), ee = !1, D = 0, U = c.charCodeAt(0);
    c = c.replace(/\r\n/mg, `
`);
    var M = h.dateNF != null ? Nl(h.dateNF) : null;
    function V() {
      var G = c.slice(y, L), K = {};
      if (G.charAt(0) == '"' && G.charAt(G.length - 1) == '"' && (G = G.slice(1, -1).replace(/""/g, '"')), G.length === 0)
        K.t = "z";
      else if (h.raw)
        K.t = "s", K.v = G;
      else if (G.trim().length === 0)
        K.t = "s", K.v = G;
      else if (G.charCodeAt(0) == 61)
        G.charCodeAt(1) == 34 && G.charCodeAt(G.length - 1) == 34 ? (K.t = "s", K.v = G.slice(2, -1).replace(/""/g, '"')) : vu(G) ? (K.t = "n", K.f = G.slice(1)) : (K.t = "s", K.v = G);
      else if (G == "TRUE")
        K.t = "b", K.v = !0;
      else if (G == "FALSE")
        K.t = "b", K.v = !1;
      else if (!isNaN(O = Rr(G)))
        K.t = "n", h.cellText !== !1 && (K.w = G), K.v = O;
      else if (!isNaN(bt(G).getDate()) || M && G.match(M)) {
        K.z = h.dateNF || Oe[14];
        var te = 0;
        M && G.match(M) && (G = Pl(G, h.dateNF, G.match(M) || []), te = 1), h.cellDates ? (K.t = "d", K.v = Ze(G, te)) : (K.t = "n", K.v = er(Ze(G, te))), h.cellText !== !1 && (K.w = Wr(K.z, K.v instanceof Date ? er(K.v) : K.v)), h.cellNF || delete K.z;
      } else
        K.t = "s", K.v = G;
      if (K.t == "z" || (h.dense ? (m[g] || (m[g] = []), m[g][F] = K) : m[_e({ c: F, r: g })] = K), y = L + 1, U = c.charCodeAt(y), u.e.c < F && (u.e.c = F), u.e.r < g && (u.e.r = g), D == z)
        ++F;
      else if (F = 0, ++g, h.sheetRows && h.sheetRows <= g)
        return !0;
    }
    e:
      for (; L < c.length; ++L)
        switch (D = c.charCodeAt(L)) {
          case 34:
            U === 34 && (ee = !ee);
            break;
          case z:
          case 10:
          case 13:
            if (!ee && V())
              break e;
            break;
        }
    return L - y > 0 && V(), m["!ref"] = ke(u), m;
  }
  function s(c, x) {
    return !(x && x.PRN) || x.FS || c.slice(0, 4) == "sep=" || c.indexOf("	") >= 0 || c.indexOf(",") >= 0 || c.indexOf(";") >= 0 ? i(c, x) : Tt(t(c, x), x);
  }
  function f(c, x) {
    var h = "", d = x.type == "string" ? [0, 0, 0, 0] : R2(c, x);
    switch (x.type) {
      case "base64":
        h = Ir(c);
        break;
      case "binary":
        h = c;
        break;
      case "buffer":
        x.codepage == 65001 ? h = c.toString("utf8") : x.codepage && typeof Kr < "u" ? h = Kr.utils.decode(x.codepage, c) : h = de && Buffer.isBuffer(c) ? c.toString("binary") : Gt(c);
        break;
      case "array":
        h = Dn(c);
        break;
      case "string":
        h = c;
        break;
      default:
        throw new Error("Unrecognized type " + x.type);
    }
    return d[0] == 239 && d[1] == 187 && d[2] == 191 ? h = Rt(h.slice(3)) : x.type != "string" && x.type != "buffer" && x.codepage == 65001 ? h = Rt(h) : x.type == "binary" && typeof Kr < "u" && x.codepage && (h = Kr.utils.decode(x.codepage, Kr.utils.encode(28591, h))), h.slice(0, 19) == "socialcalc:version:" ? Wi.to_sheet(x.type == "string" ? h : Rt(h), x) : s(h, x);
  }
  function o(c, x) {
    return et(f(c, x), x);
  }
  function l(c) {
    for (var x = [], h = Se(c["!ref"]), d, m = Array.isArray(c), u = h.s.r; u <= h.e.r; ++u) {
      for (var g = [], F = h.s.c; F <= h.e.c; ++F) {
        var O = _e({ r: u, c: F });
        if (d = m ? (c[u] || [])[F] : c[O], !d || d.v == null) {
          g.push("          ");
          continue;
        }
        for (var y = (d.w || (Nr(d), d.w) || "").slice(0, 10); y.length < 10; )
          y += " ";
        g.push(y + (F === 0 ? " " : ""));
      }
      x.push(g.join(""));
    }
    return x.join(`
`);
  }
  return {
    to_workbook: o,
    to_sheet: f,
    from_sheet: l
  };
}(), _a = /* @__PURE__ */ function() {
  function e(S, P, C) {
    if (S) {
      ar(S, S.l || 0);
      for (var A = C.Enum || or; S.l < S.length; ) {
        var W = S.read_shift(2), se = A[W] || A[65535], fe = S.read_shift(2), ie = S.l + fe, Q = se.f && se.f(S, fe, C);
        if (S.l = ie, P(Q, se, W))
          return;
      }
    }
  }
  function t(S, P) {
    switch (P.type) {
      case "base64":
        return r(gr(Ir(S)), P);
      case "binary":
        return r(gr(S), P);
      case "buffer":
      case "array":
        return r(S, P);
    }
    throw "Unsupported type " + P.type;
  }
  function r(S, P) {
    if (!S)
      return S;
    var C = P || {}, A = C.dense ? [] : {}, W = "Sheet1", se = "", fe = 0, ie = {}, Q = [], Ee = [], he = { s: { r: 0, c: 0 }, e: { r: 0, c: 0 } }, Ye = C.sheetRows || 0;
    if (S[2] == 0 && (S[3] == 8 || S[3] == 9) && S.length >= 16 && S[14] == 5 && S[15] === 108)
      throw new Error("Unsupported Works 3 for Mac file");
    if (S[2] == 2)
      C.Enum = or, e(S, function(ae, cr, yr) {
        switch (yr) {
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
            yr == 14 && (ae[2] & 112) == 112 && (ae[2] & 15) > 1 && (ae[2] & 15) < 15 && (ae[1].z = C.dateNF || Oe[14], C.cellDates && (ae[1].t = "d", ae[1].v = ai(ae[1].v))), C.qpro && ae[3] > fe && (A["!ref"] = ke(he), ie[W] = A, Q.push(W), A = C.dense ? [] : {}, he = { s: { r: 0, c: 0 }, e: { r: 0, c: 0 } }, fe = ae[3], W = se || "Sheet" + (fe + 1), se = "");
            var jr = C.dense ? (A[ae[0].r] || [])[ae[0].c] : A[_e(ae[0])];
            if (jr) {
              jr.t = ae[1].t, jr.v = ae[1].v, ae[1].z != null && (jr.z = ae[1].z), ae[1].f != null && (jr.f = ae[1].f);
              break;
            }
            C.dense ? (A[ae[0].r] || (A[ae[0].r] = []), A[ae[0].r][ae[0].c] = ae[1]) : A[_e(ae[0])] = ae[1];
            break;
        }
      }, C);
    else if (S[2] == 26 || S[2] == 14)
      C.Enum = tr, S[2] == 14 && (C.qpro = !0, S.l = 0), e(S, function(ae, cr, yr) {
        switch (yr) {
          case 204:
            W = ae;
            break;
          case 22:
            ae[1].v = ae[1].v.slice(1);
          case 23:
          case 24:
          case 25:
          case 37:
          case 39:
          case 40:
            if (ae[3] > fe && (A["!ref"] = ke(he), ie[W] = A, Q.push(W), A = C.dense ? [] : {}, he = { s: { r: 0, c: 0 }, e: { r: 0, c: 0 } }, fe = ae[3], W = "Sheet" + (fe + 1)), Ye > 0 && ae[0].r >= Ye)
              break;
            C.dense ? (A[ae[0].r] || (A[ae[0].r] = []), A[ae[0].r][ae[0].c] = ae[1]) : A[_e(ae[0])] = ae[1], he.e.c < ae[0].c && (he.e.c = ae[0].c), he.e.r < ae[0].r && (he.e.r = ae[0].r);
            break;
          case 27:
            ae[14e3] && (Ee[ae[14e3][0]] = ae[14e3][1]);
            break;
          case 1537:
            Ee[ae[0]] = ae[1], ae[0] == fe && (W = ae[1]);
            break;
        }
      }, C);
    else
      throw new Error("Unrecognized LOTUS BOF " + S[2]);
    if (A["!ref"] = ke(he), ie[se || W] = A, Q.push(se || W), !Ee.length)
      return { SheetNames: Q, Sheets: ie };
    for (var pe = {}, Fr = [], ye = 0; ye < Ee.length; ++ye)
      ie[Q[ye]] ? (Fr.push(Ee[ye] || Q[ye]), pe[Ee[ye]] = ie[Ee[ye]] || ie[Q[ye]]) : (Fr.push(Ee[ye]), pe[Ee[ye]] = { "!ref": "A1" });
    return { SheetNames: Fr, Sheets: pe };
  }
  function n(S, P) {
    var C = P || {};
    if (+C.codepage >= 0 && Mt(+C.codepage), C.type == "string")
      throw new Error("Cannot write WK1 to JS string");
    var A = Qe(), W = Se(S["!ref"]), se = Array.isArray(S), fe = [];
    J(A, 0, i(1030)), J(A, 6, o(W));
    for (var ie = Math.min(W.e.r, 8191), Q = W.s.r; Q <= ie; ++Q)
      for (var Ee = Xe(Q), he = W.s.c; he <= W.e.c; ++he) {
        Q === W.s.r && (fe[he] = $e(he));
        var Ye = fe[he] + Ee, pe = se ? (S[Q] || [])[he] : S[Ye];
        if (!(!pe || pe.t == "z"))
          if (pe.t == "n")
            (pe.v | 0) == pe.v && pe.v >= -32768 && pe.v <= 32767 ? J(A, 13, d(Q, he, pe.v)) : J(A, 14, u(Q, he, pe.v));
          else {
            var Fr = Nr(pe);
            J(A, 15, x(Q, he, Fr.slice(0, 239)));
          }
      }
    return J(A, 1), A.end();
  }
  function a(S, P) {
    var C = P || {};
    if (+C.codepage >= 0 && Mt(+C.codepage), C.type == "string")
      throw new Error("Cannot write WK3 to JS string");
    var A = Qe();
    J(A, 0, s(S));
    for (var W = 0, se = 0; W < S.SheetNames.length; ++W)
      (S.Sheets[S.SheetNames[W]] || {})["!ref"] && J(A, 27, Pe(S.SheetNames[W], se++));
    var fe = 0;
    for (W = 0; W < S.SheetNames.length; ++W) {
      var ie = S.Sheets[S.SheetNames[W]];
      if (!(!ie || !ie["!ref"])) {
        for (var Q = Se(ie["!ref"]), Ee = Array.isArray(ie), he = [], Ye = Math.min(Q.e.r, 8191), pe = Q.s.r; pe <= Ye; ++pe)
          for (var Fr = Xe(pe), ye = Q.s.c; ye <= Q.e.c; ++ye) {
            pe === Q.s.r && (he[ye] = $e(ye));
            var ae = he[ye] + Fr, cr = Ee ? (ie[pe] || [])[ye] : ie[ae];
            if (!(!cr || cr.t == "z"))
              if (cr.t == "n")
                J(A, 23, V(pe, ye, fe, cr.v));
              else {
                var yr = Nr(cr);
                J(A, 22, D(pe, ye, fe, yr.slice(0, 239)));
              }
          }
        ++fe;
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
    for (var C = 0, A = 0, W = 0, se = 0; se < S.SheetNames.length; ++se) {
      var fe = S.SheetNames[se], ie = S.Sheets[fe];
      if (!(!ie || !ie["!ref"])) {
        ++W;
        var Q = fr(ie["!ref"]);
        C < Q.e.r && (C = Q.e.r), A < Q.e.c && (A = Q.e.c);
      }
    }
    return C > 8191 && (C = 8191), P.write_shift(2, C), P.write_shift(1, W), P.write_shift(1, A), P.write_shift(2, 0), P.write_shift(2, 0), P.write_shift(1, 1), P.write_shift(1, 2), P.write_shift(4, 0), P.write_shift(4, 0), P;
  }
  function f(S, P, C) {
    var A = { s: { c: 0, r: 0 }, e: { c: 0, r: 0 } };
    return P == 8 && C.qpro ? (A.s.c = S.read_shift(1), S.l++, A.s.r = S.read_shift(2), A.e.c = S.read_shift(1), S.l++, A.e.r = S.read_shift(2), A) : (A.s.c = S.read_shift(2), A.s.r = S.read_shift(2), P == 12 && C.qpro && (S.l += 2), A.e.c = S.read_shift(2), A.e.r = S.read_shift(2), P == 12 && C.qpro && (S.l += 2), A.s.c == 65535 && (A.s.c = A.e.c = A.s.r = A.e.r = 0), A);
  }
  function o(S) {
    var P = B(8);
    return P.write_shift(2, S.s.c), P.write_shift(2, S.s.r), P.write_shift(2, S.e.c), P.write_shift(2, S.e.r), P;
  }
  function l(S, P, C) {
    var A = [{ c: 0, r: 0 }, { t: "n", v: 0 }, 0, 0];
    return C.qpro && C.vers != 20768 ? (A[0].c = S.read_shift(1), A[3] = S.read_shift(1), A[0].r = S.read_shift(2), S.l += 2) : (A[2] = S.read_shift(1), A[0].c = S.read_shift(2), A[0].r = S.read_shift(2)), A;
  }
  function c(S, P, C) {
    var A = S.l + P, W = l(S, P, C);
    if (W[1].t = "s", C.vers == 20768) {
      S.l++;
      var se = S.read_shift(1);
      return W[1].v = S.read_shift(se, "utf8"), W;
    }
    return C.qpro && S.l++, W[1].v = S.read_shift(A - S.l, "cstr"), W;
  }
  function x(S, P, C) {
    var A = B(7 + C.length);
    A.write_shift(1, 255), A.write_shift(2, P), A.write_shift(2, S), A.write_shift(1, 39);
    for (var W = 0; W < A.length; ++W) {
      var se = C.charCodeAt(W);
      A.write_shift(1, se >= 128 ? 95 : se);
    }
    return A.write_shift(1, 0), A;
  }
  function h(S, P, C) {
    var A = l(S, P, C);
    return A[1].v = S.read_shift(2, "i"), A;
  }
  function d(S, P, C) {
    var A = B(7);
    return A.write_shift(1, 255), A.write_shift(2, P), A.write_shift(2, S), A.write_shift(2, C, "i"), A;
  }
  function m(S, P, C) {
    var A = l(S, P, C);
    return A[1].v = S.read_shift(8, "f"), A;
  }
  function u(S, P, C) {
    var A = B(13);
    return A.write_shift(1, 255), A.write_shift(2, P), A.write_shift(2, S), A.write_shift(8, C, "f"), A;
  }
  function g(S, P, C) {
    var A = S.l + P, W = l(S, P, C);
    if (W[1].v = S.read_shift(8, "f"), C.qpro)
      S.l = A;
    else {
      var se = S.read_shift(2);
      L(S.slice(S.l, S.l + se), W), S.l += se;
    }
    return W;
  }
  function F(S, P, C) {
    var A = P & 32768;
    return P &= -32769, P = (A ? S : 0) + (P >= 8192 ? P - 16384 : P), (A ? "" : "$") + (C ? $e(P) : Xe(P));
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
  }, y = [
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
    ar(S, 0);
    for (var C = [], A = 0, W = "", se = "", fe = "", ie = ""; S.l < S.length; ) {
      var Q = S[S.l++];
      switch (Q) {
        case 0:
          C.push(S.read_shift(8, "f"));
          break;
        case 1:
          se = F(P[0].c, S.read_shift(2), !0), W = F(P[0].r, S.read_shift(2), !1), C.push(se + W);
          break;
        case 2:
          {
            var Ee = F(P[0].c, S.read_shift(2), !0), he = F(P[0].r, S.read_shift(2), !1);
            se = F(P[0].c, S.read_shift(2), !0), W = F(P[0].r, S.read_shift(2), !1), C.push(Ee + he + ":" + se + W);
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
            for (var Ye = ""; Q = S[S.l++]; )
              Ye += String.fromCharCode(Q);
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
          ie = C.pop(), fe = C.pop(), C.push(["AND", "OR"][Q - 20] + "(" + fe + "," + ie + ")");
          break;
        default:
          if (Q < 32 && y[Q])
            ie = C.pop(), fe = C.pop(), C.push(fe + y[Q] + ie);
          else if (O[Q]) {
            if (A = O[Q][1], A == 69 && (A = S[S.l++]), A > C.length) {
              console.error("WK1 bad formula parse 0x" + Q.toString(16) + ":|" + C.join("|") + "|");
              return;
            }
            var pe = C.slice(-A);
            C.length -= A, C.push(O[Q][0] + "(" + pe.join(",") + ")");
          } else
            return Q <= 7 ? console.error("WK1 invalid opcode " + Q.toString(16)) : Q <= 24 ? console.error("WK1 unsupported op " + Q.toString(16)) : Q <= 30 ? console.error("WK1 invalid opcode " + Q.toString(16)) : Q <= 115 ? console.error("WK1 unsupported function opcode " + Q.toString(16)) : console.error("WK1 unrecognized opcode " + Q.toString(16));
      }
    }
    C.length == 1 ? P[1].f = "" + C[0] : console.error("WK1 bad formula parse |" + C.join("|") + "|");
  }
  function z(S) {
    var P = [{ c: 0, r: 0 }, { t: "n", v: 0 }, 0];
    return P[0].r = S.read_shift(2), P[3] = S[S.l++], P[0].c = S[S.l++], P;
  }
  function ee(S, P) {
    var C = z(S);
    return C[1].t = "s", C[1].v = S.read_shift(P - 4, "cstr"), C;
  }
  function D(S, P, C, A) {
    var W = B(6 + A.length);
    W.write_shift(2, S), W.write_shift(1, C), W.write_shift(1, P), W.write_shift(1, 39);
    for (var se = 0; se < A.length; ++se) {
      var fe = A.charCodeAt(se);
      W.write_shift(1, fe >= 128 ? 95 : fe);
    }
    return W.write_shift(1, 0), W;
  }
  function U(S, P) {
    var C = z(S);
    C[1].v = S.read_shift(2);
    var A = C[1].v >> 1;
    if (C[1].v & 1)
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
    return C[1].v = A, C;
  }
  function M(S, P) {
    var C = z(S), A = S.read_shift(4), W = S.read_shift(4), se = S.read_shift(2);
    if (se == 65535)
      return A === 0 && W === 3221225472 ? (C[1].t = "e", C[1].v = 15) : A === 0 && W === 3489660928 ? (C[1].t = "e", C[1].v = 42) : C[1].v = 0, C;
    var fe = se & 32768;
    return se = (se & 32767) - 16446, C[1].v = (1 - fe * 2) * (W * Math.pow(2, se + 32) + A * Math.pow(2, se)), C;
  }
  function V(S, P, C, A) {
    var W = B(14);
    if (W.write_shift(2, S), W.write_shift(1, C), W.write_shift(1, P), A == 0)
      return W.write_shift(4, 0), W.write_shift(4, 0), W.write_shift(2, 65535), W;
    var se = 0, fe = 0, ie = 0, Q = 0;
    return A < 0 && (se = 1, A = -A), fe = Math.log2(A) | 0, A /= Math.pow(2, fe - 31), Q = A >>> 0, Q & 2147483648 || (A /= 2, ++fe, Q = A >>> 0), A -= Q, Q |= 2147483648, Q >>>= 0, A *= Math.pow(2, 32), ie = A >>> 0, W.write_shift(4, ie), W.write_shift(4, Q), fe += 16383 + (se ? 32768 : 0), W.write_shift(2, fe), W;
  }
  function G(S, P) {
    var C = M(S);
    return S.l += P - 14, C;
  }
  function K(S, P) {
    var C = z(S), A = S.read_shift(4);
    return C[1].v = A >> 6, C;
  }
  function te(S, P) {
    var C = z(S), A = S.read_shift(8, "f");
    return C[1].v = A, C;
  }
  function Te(S, P) {
    var C = te(S);
    return S.l += P - 10, C;
  }
  function oe(S, P) {
    return S[S.l + P - 1] == 0 ? S.read_shift(P, "cstr") : "";
  }
  function Ue(S, P) {
    var C = S[S.l++];
    C > P - 1 && (C = P - 1);
    for (var A = ""; A.length < C; )
      A += String.fromCharCode(S[S.l++]);
    return A;
  }
  function De(S, P, C) {
    if (!(!C.qpro || P < 21)) {
      var A = S.read_shift(1);
      S.l += 17, S.l += 1, S.l += 2;
      var W = S.read_shift(P - 21, "cstr");
      return [A, W];
    }
  }
  function dr(S, P) {
    for (var C = {}, A = S.l + P; S.l < A; ) {
      var W = S.read_shift(2);
      if (W == 14e3) {
        for (C[W] = [0, ""], C[W][0] = S.read_shift(2); S[S.l]; )
          C[W][1] += String.fromCharCode(S[S.l]), S.l++;
        S.l++;
      }
    }
    return C;
  }
  function Pe(S, P) {
    var C = B(5 + S.length);
    C.write_shift(2, 14e3), C.write_shift(2, P);
    for (var A = 0; A < S.length; ++A) {
      var W = S.charCodeAt(A);
      C[C.l++] = W > 127 ? 95 : W;
    }
    return C[C.l++] = 0, C;
  }
  var or = {
    /*::[*/
    0: { n: "BOF", f: Mi },
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
    14: { n: "NUMBER", f: m },
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
    204: { n: "SHEETNAMECS", f: oe },
    /*::[*/
    222: { n: "SHEETNAMELP", f: Ue },
    /*::[*/
    65535: { n: "" }
  }, tr = {
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
    22: { n: "LABEL16", f: ee },
    /*::[*/
    23: { n: "NUMBER17", f: M },
    /*::[*/
    24: { n: "NUMBER18", f: U },
    /*::[*/
    25: { n: "FORMULA19", f: G },
    /*::[*/
    26: { n: "FORMULA1A" },
    /*::[*/
    27: { n: "XFORMAT", f: dr },
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
    37: { n: "NUMBER25", f: K },
    /*::[*/
    38: { n: "??" },
    /*::[*/
    39: { n: "NUMBER27", f: te },
    /*::[*/
    40: { n: "FORMULA28", f: Te },
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
    204: { n: "SHEETNAMECS", f: oe },
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
    1537: { n: "SHEETINFOQP", f: De },
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
}(), _c = /^\s|\s$|[\t\n\r]/;
function Vi(e, t) {
  if (!t.bookSST)
    return "";
  var r = [Ie];
  r[r.length] = q("sst", null, {
    xmlns: _t[0],
    count: e.Count,
    uniqueCount: e.Unique
  });
  for (var n = 0; n != e.length; ++n)
    if (e[n] != null) {
      var a = e[n], i = "<si>";
      a.r ? i += a.r : (i += "<t", a.t || (a.t = ""), a.t.match(_c) && (i += ' xml:space="preserve"'), i += ">" + me(a.t) + "</t>"), i += "</si>", r[r.length] = i;
    }
  return r.length > 2 && (r[r.length] = "</sst>", r[1] = r[1].replace("/>", ">")), r.join("");
}
function Tc(e) {
  return [e.read_shift(4), e.read_shift(4)];
}
function wc(e, t) {
  return t || (t = B(8)), t.write_shift(4, e.Count), t.write_shift(4, e.Unique), t;
}
var Ec = uo;
function Sc(e) {
  var t = Qe();
  H(t, 159, wc(e));
  for (var r = 0; r < e.length; ++r)
    H(t, 19, Ec(e[r]));
  return H(
    t,
    160
    /* BrtEndSst */
  ), t.end();
}
function Ac(e) {
  for (var t = [], r = e.split(""), n = 0; n < r.length; ++n)
    t[n] = r[n].charCodeAt(0);
  return t;
}
function Gi(e) {
  var t = 0, r, n = Ac(e), a = n.length + 1, i, s, f, o, l;
  for (r = Jr(a), r[0] = n.length, i = 1; i != a; ++i)
    r[i] = n[i - 1];
  for (i = a - 1; i >= 0; --i)
    s = r[i], f = t & 16384 ? 1 : 0, o = t << 1 & 32767, l = f | o, t = l ^ s;
  return t ^ 52811;
}
var Fc = /* @__PURE__ */ function() {
  function e(a, i) {
    switch (i.type) {
      case "base64":
        return t(Ir(a), i);
      case "binary":
        return t(a, i);
      case "buffer":
        return t(de && Buffer.isBuffer(a) ? a.toString("binary") : Gt(a), i);
      case "array":
        return t(Dn(a), i);
    }
    throw new Error("Unrecognized type " + i.type);
  }
  function t(a, i) {
    var s = i || {}, f = s.dense ? [] : {}, o = a.match(/\\trowd.*?\\row\b/g);
    if (!o.length)
      throw new Error("RTF missing table");
    var l = { s: { c: 0, r: 0 }, e: { c: 0, r: o.length - 1 } };
    return o.forEach(function(c, x) {
      Array.isArray(f) && (f[x] = []);
      for (var h = /\\\w+\b/g, d = 0, m, u = -1; m = h.exec(c); ) {
        switch (m[0]) {
          case "\\cell":
            var g = c.slice(d, h.lastIndex - m[0].length);
            if (g[0] == " " && (g = g.slice(1)), ++u, g.length) {
              var F = { v: g, t: "s" };
              Array.isArray(f) ? f[x][u] = F : f[_e({ r: x, c: u })] = F;
            }
            break;
        }
        d = h.lastIndex;
      }
      u > l.e.c && (l.e.c = u);
    }), f["!ref"] = ke(l), f;
  }
  function r(a, i) {
    return et(e(a, i), i);
  }
  function n(a) {
    for (var i = ["{\\rtf1\\ansi"], s = Se(a["!ref"]), f, o = Array.isArray(a), l = s.s.r; l <= s.e.r; ++l) {
      i.push("\\trowd\\trautofit1");
      for (var c = s.s.c; c <= s.e.c; ++c)
        i.push("\\cellx" + (c + 1));
      for (i.push("\\pard\\intbl"), c = s.s.c; c <= s.e.c; ++c) {
        var x = _e({ r: l, c });
        f = o ? (a[l] || [])[c] : a[x], !(!f || f.v == null && (!f.f || f.F)) && (i.push(" " + (f.w || (Nr(f), f.w))), i.push("\\cell"));
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
function Ta(e) {
  for (var t = 0, r = 1; t != 3; ++t)
    r = r * 256 + (e[t] > 255 ? 255 : e[t] < 0 ? 0 : e[t]);
  return r.toString(16).toUpperCase().slice(1);
}
var yc = 6, kr = yc;
function _n(e) {
  return Math.floor((e + Math.round(128 / kr) / 256) * kr);
}
function Tn(e) {
  return Math.floor((e - 5) / kr * 100 + 0.5) / 100;
}
function Qn(e) {
  return Math.round((e * kr + 5) / kr * 256) / 256;
}
function m0(e) {
  e.width ? (e.wpx = _n(e.width), e.wch = Tn(e.wpx), e.MDW = kr) : e.wpx ? (e.wch = Tn(e.wpx), e.width = Qn(e.wch), e.MDW = kr) : typeof e.wch == "number" && (e.width = Qn(e.wch), e.wpx = _n(e.width), e.MDW = kr), e.customWidth && delete e.customWidth;
}
var Cc = 96, Xi = Cc;
function wn(e) {
  return e * 96 / Xi;
}
function ji(e) {
  return e * Xi / 96;
}
function Oc(e) {
  var t = ["<numFmts>"];
  return [[5, 8], [23, 26], [41, 44], [
    /*63*/
    50,
    /*66],[164,*/
    392
  ]].forEach(function(r) {
    for (var n = r[0]; n <= r[1]; ++n)
      e[n] != null && (t[t.length] = q("numFmt", null, { numFmtId: n, formatCode: me(e[n]) }));
  }), t.length === 1 ? "" : (t[t.length] = "</numFmts>", t[0] = q("numFmts", null, { count: t.length - 2 }).replace("/>", ">"), t.join(""));
}
function Dc(e) {
  var t = [];
  return t[t.length] = q("cellXfs", null), e.forEach(function(r) {
    t[t.length] = q("xf", null, r);
  }), t[t.length] = "</cellXfs>", t.length === 2 ? "" : (t[0] = q("cellXfs", null, { count: t.length - 2 }).replace("/>", ">"), t.join(""));
}
function zi(e, t) {
  var r = [Ie, q("styleSheet", null, {
    xmlns: _t[0],
    "xmlns:vt": Me.vt
  })], n;
  return e.SSF && (n = Oc(e.SSF)) != null && (r[r.length] = n), r[r.length] = '<fonts count="1"><font><sz val="12"/><color theme="1"/><name val="Calibri"/><family val="2"/><scheme val="minor"/></font></fonts>', r[r.length] = '<fills count="2"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill></fills>', r[r.length] = '<borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders>', r[r.length] = '<cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>', (n = Dc(t.cellXfs)) && (r[r.length] = n), r[r.length] = '<cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles>', r[r.length] = '<dxfs count="0"/>', r[r.length] = '<tableStyles count="0" defaultTableStyle="TableStyleMedium9" defaultPivotStyle="PivotStyleMedium4"/>', r.length > 2 && (r[r.length] = "</styleSheet>", r[1] = r[1].replace("/>", ">")), r.join("");
}
function Rc(e, t) {
  var r = e.read_shift(2), n = Ke(e);
  return [r, n];
}
function kc(e, t, r) {
  r || (r = B(6 + 4 * t.length)), r.write_shift(2, e), be(t, r);
  var n = r.length > r.l ? r.slice(0, r.l) : r;
  return r.l == null && (r.l = r.length), n;
}
function Ic(e, t, r) {
  var n = {};
  n.sz = e.read_shift(2) / 20;
  var a = _o(e);
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
  switch (o > 0 && (n.charset = o), e.l++, n.color = mo(e), e.read_shift(1)) {
    case 1:
      n.scheme = "major";
      break;
    case 2:
      n.scheme = "minor";
      break;
  }
  return n.name = Ke(e), n;
}
function Nc(e, t) {
  t || (t = B(25 + 4 * 32)), t.write_shift(2, e.sz * 20), To(e, t), t.write_shift(2, e.bold ? 700 : 400);
  var r = 0;
  e.vertAlign == "superscript" ? r = 1 : e.vertAlign == "subscript" && (r = 2), t.write_shift(2, r), t.write_shift(1, e.underline || 0), t.write_shift(1, e.family || 0), t.write_shift(1, e.charset || 0), t.write_shift(1, 0), gn(e.color, t);
  var n = 0;
  return e.scheme == "major" && (n = 1), e.scheme == "minor" && (n = 2), t.write_shift(1, n), be(e.name, t), t.length > t.l ? t.slice(0, t.l) : t;
}
var Pc = [
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
], Xn, Lc = Ar;
function wa(e, t) {
  t || (t = B(4 * 3 + 8 * 7 + 16 * 1)), Xn || (Xn = s0(Pc));
  var r = Xn[e.patternType];
  r == null && (r = 40), t.write_shift(4, r);
  var n = 0;
  if (r != 40)
    for (gn({ auto: 1 }, t), gn({ auto: 1 }, t); n < 12; ++n)
      t.write_shift(4, 0);
  else {
    for (; n < 4; ++n)
      t.write_shift(4, 0);
    for (; n < 12; ++n)
      t.write_shift(4, 0);
  }
  return t.length > t.l ? t.slice(0, t.l) : t;
}
function Mc(e, t) {
  var r = e.l + t, n = e.read_shift(2), a = e.read_shift(2);
  return e.l = r, { ixfe: n, numFmtId: a };
}
function $i(e, t, r) {
  r || (r = B(16)), r.write_shift(2, t || 0), r.write_shift(2, e.numFmtId || 0), r.write_shift(2, 0), r.write_shift(2, 0), r.write_shift(2, 0), r.write_shift(1, 0), r.write_shift(1, 0);
  var n = 0;
  return r.write_shift(1, n), r.write_shift(1, 0), r.write_shift(1, 0), r.write_shift(1, 0), r;
}
function Ct(e, t) {
  return t || (t = B(10)), t.write_shift(1, 0), t.write_shift(1, 0), t.write_shift(4, 0), t.write_shift(4, 0), t;
}
var Bc = Ar;
function bc(e, t) {
  return t || (t = B(51)), t.write_shift(1, 0), Ct(null, t), Ct(null, t), Ct(null, t), Ct(null, t), Ct(null, t), t.length > t.l ? t.slice(0, t.l) : t;
}
function Uc(e, t) {
  return t || (t = B(12 + 4 * 10)), t.write_shift(4, e.xfId), t.write_shift(2, 1), t.write_shift(1, +e.builtinId), t.write_shift(1, 0), vn(e.name || "", t), t.length > t.l ? t.slice(0, t.l) : t;
}
function Hc(e, t, r) {
  var n = B(2052);
  return n.write_shift(4, e), vn(t, n), vn(r, n), n.length > n.l ? n.slice(0, n.l) : n;
}
function Wc(e, t) {
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
    }), r != 0 && (H(e, 615, Tr(r)), [[5, 8], [23, 26], [41, 44], [
      /*63*/
      50,
      /*66],[164,*/
      392
    ]].forEach(function(n) {
      for (var a = n[0]; a <= n[1]; ++a)
        t[a] != null && H(e, 44, kc(a, t[a]));
    }), H(
      e,
      616
      /* BrtEndFmts */
    ));
  }
}
function Vc(e) {
  var t = 1;
  H(e, 611, Tr(t)), H(e, 43, Nc({
    sz: 12,
    color: { theme: 1 },
    name: "Calibri",
    family: 2,
    scheme: "minor"
  })), H(
    e,
    612
    /* BrtEndFonts */
  );
}
function Gc(e) {
  var t = 2;
  H(e, 603, Tr(t)), H(e, 45, wa({ patternType: "none" })), H(e, 45, wa({ patternType: "gray125" })), H(
    e,
    604
    /* BrtEndFills */
  );
}
function Xc(e) {
  var t = 1;
  H(e, 613, Tr(t)), H(e, 46, bc()), H(
    e,
    614
    /* BrtEndBorders */
  );
}
function jc(e) {
  var t = 1;
  H(e, 626, Tr(t)), H(e, 47, $i({
    numFmtId: 0,
    fontId: 0,
    fillId: 0,
    borderId: 0
  }, 65535)), H(
    e,
    627
    /* BrtEndCellStyleXFs */
  );
}
function zc(e, t) {
  H(e, 617, Tr(t.length)), t.forEach(function(r) {
    H(e, 47, $i(r, 0));
  }), H(
    e,
    618
    /* BrtEndCellXFs */
  );
}
function $c(e) {
  var t = 1;
  H(e, 619, Tr(t)), H(e, 48, Uc({
    xfId: 0,
    builtinId: 0,
    name: "Normal"
  })), H(
    e,
    620
    /* BrtEndStyles */
  );
}
function Kc(e) {
  var t = 0;
  H(e, 505, Tr(t)), H(
    e,
    506
    /* BrtEndDXFs */
  );
}
function Yc(e) {
  var t = 0;
  H(e, 508, Hc(t, "TableStyleMedium9", "PivotStyleMedium4")), H(
    e,
    509
    /* BrtEndTableStyles */
  );
}
function qc(e, t) {
  var r = Qe();
  return H(
    r,
    278
    /* BrtBeginStyleSheet */
  ), Wc(r, e.SSF), Vc(r), Gc(r), Xc(r), jc(r), zc(r, t.cellXfs), $c(r), Kc(r), Yc(r), H(
    r,
    279
    /* BrtEndStyleSheet */
  ), r.end();
}
function Ki(e, t) {
  if (t && t.themeXLSX)
    return t.themeXLSX;
  if (e && typeof e.raw == "string")
    return e.raw;
  var r = [Ie];
  return r[r.length] = '<a:theme xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" name="Office Theme">', r[r.length] = "<a:themeElements>", r[r.length] = '<a:clrScheme name="Office">', r[r.length] = '<a:dk1><a:sysClr val="windowText" lastClr="000000"/></a:dk1>', r[r.length] = '<a:lt1><a:sysClr val="window" lastClr="FFFFFF"/></a:lt1>', r[r.length] = '<a:dk2><a:srgbClr val="1F497D"/></a:dk2>', r[r.length] = '<a:lt2><a:srgbClr val="EEECE1"/></a:lt2>', r[r.length] = '<a:accent1><a:srgbClr val="4F81BD"/></a:accent1>', r[r.length] = '<a:accent2><a:srgbClr val="C0504D"/></a:accent2>', r[r.length] = '<a:accent3><a:srgbClr val="9BBB59"/></a:accent3>', r[r.length] = '<a:accent4><a:srgbClr val="8064A2"/></a:accent4>', r[r.length] = '<a:accent5><a:srgbClr val="4BACC6"/></a:accent5>', r[r.length] = '<a:accent6><a:srgbClr val="F79646"/></a:accent6>', r[r.length] = '<a:hlink><a:srgbClr val="0000FF"/></a:hlink>', r[r.length] = '<a:folHlink><a:srgbClr val="800080"/></a:folHlink>', r[r.length] = "</a:clrScheme>", r[r.length] = '<a:fontScheme name="Office">', r[r.length] = "<a:majorFont>", r[r.length] = '<a:latin typeface="Cambria"/>', r[r.length] = '<a:ea typeface=""/>', r[r.length] = '<a:cs typeface=""/>', r[r.length] = '<a:font script="Jpan" typeface="ＭＳ Ｐゴシック"/>', r[r.length] = '<a:font script="Hang" typeface="맑은 고딕"/>', r[r.length] = '<a:font script="Hans" typeface="宋体"/>', r[r.length] = '<a:font script="Hant" typeface="新細明體"/>', r[r.length] = '<a:font script="Arab" typeface="Times New Roman"/>', r[r.length] = '<a:font script="Hebr" typeface="Times New Roman"/>', r[r.length] = '<a:font script="Thai" typeface="Tahoma"/>', r[r.length] = '<a:font script="Ethi" typeface="Nyala"/>', r[r.length] = '<a:font script="Beng" typeface="Vrinda"/>', r[r.length] = '<a:font script="Gujr" typeface="Shruti"/>', r[r.length] = '<a:font script="Khmr" typeface="MoolBoran"/>', r[r.length] = '<a:font script="Knda" typeface="Tunga"/>', r[r.length] = '<a:font script="Guru" typeface="Raavi"/>', r[r.length] = '<a:font script="Cans" typeface="Euphemia"/>', r[r.length] = '<a:font script="Cher" typeface="Plantagenet Cherokee"/>', r[r.length] = '<a:font script="Yiii" typeface="Microsoft Yi Baiti"/>', r[r.length] = '<a:font script="Tibt" typeface="Microsoft Himalaya"/>', r[r.length] = '<a:font script="Thaa" typeface="MV Boli"/>', r[r.length] = '<a:font script="Deva" typeface="Mangal"/>', r[r.length] = '<a:font script="Telu" typeface="Gautami"/>', r[r.length] = '<a:font script="Taml" typeface="Latha"/>', r[r.length] = '<a:font script="Syrc" typeface="Estrangelo Edessa"/>', r[r.length] = '<a:font script="Orya" typeface="Kalinga"/>', r[r.length] = '<a:font script="Mlym" typeface="Kartika"/>', r[r.length] = '<a:font script="Laoo" typeface="DokChampa"/>', r[r.length] = '<a:font script="Sinh" typeface="Iskoola Pota"/>', r[r.length] = '<a:font script="Mong" typeface="Mongolian Baiti"/>', r[r.length] = '<a:font script="Viet" typeface="Times New Roman"/>', r[r.length] = '<a:font script="Uigh" typeface="Microsoft Uighur"/>', r[r.length] = '<a:font script="Geor" typeface="Sylfaen"/>', r[r.length] = "</a:majorFont>", r[r.length] = "<a:minorFont>", r[r.length] = '<a:latin typeface="Calibri"/>', r[r.length] = '<a:ea typeface=""/>', r[r.length] = '<a:cs typeface=""/>', r[r.length] = '<a:font script="Jpan" typeface="ＭＳ Ｐゴシック"/>', r[r.length] = '<a:font script="Hang" typeface="맑은 고딕"/>', r[r.length] = '<a:font script="Hans" typeface="宋体"/>', r[r.length] = '<a:font script="Hant" typeface="新細明體"/>', r[r.length] = '<a:font script="Arab" typeface="Arial"/>', r[r.length] = '<a:font script="Hebr" typeface="Arial"/>', r[r.length] = '<a:font script="Thai" typeface="Tahoma"/>', r[r.length] = '<a:font script="Ethi" typeface="Nyala"/>', r[r.length] = '<a:font script="Beng" typeface="Vrinda"/>', r[r.length] = '<a:font script="Gujr" typeface="Shruti"/>', r[r.length] = '<a:font script="Khmr" typeface="DaunPenh"/>', r[r.length] = '<a:font script="Knda" typeface="Tunga"/>', r[r.length] = '<a:font script="Guru" typeface="Raavi"/>', r[r.length] = '<a:font script="Cans" typeface="Euphemia"/>', r[r.length] = '<a:font script="Cher" typeface="Plantagenet Cherokee"/>', r[r.length] = '<a:font script="Yiii" typeface="Microsoft Yi Baiti"/>', r[r.length] = '<a:font script="Tibt" typeface="Microsoft Himalaya"/>', r[r.length] = '<a:font script="Thaa" typeface="MV Boli"/>', r[r.length] = '<a:font script="Deva" typeface="Mangal"/>', r[r.length] = '<a:font script="Telu" typeface="Gautami"/>', r[r.length] = '<a:font script="Taml" typeface="Latha"/>', r[r.length] = '<a:font script="Syrc" typeface="Estrangelo Edessa"/>', r[r.length] = '<a:font script="Orya" typeface="Kalinga"/>', r[r.length] = '<a:font script="Mlym" typeface="Kartika"/>', r[r.length] = '<a:font script="Laoo" typeface="DokChampa"/>', r[r.length] = '<a:font script="Sinh" typeface="Iskoola Pota"/>', r[r.length] = '<a:font script="Mong" typeface="Mongolian Baiti"/>', r[r.length] = '<a:font script="Viet" typeface="Arial"/>', r[r.length] = '<a:font script="Uigh" typeface="Microsoft Uighur"/>', r[r.length] = '<a:font script="Geor" typeface="Sylfaen"/>', r[r.length] = "</a:minorFont>", r[r.length] = "</a:fontScheme>", r[r.length] = '<a:fmtScheme name="Office">', r[r.length] = "<a:fillStyleLst>", r[r.length] = '<a:solidFill><a:schemeClr val="phClr"/></a:solidFill>', r[r.length] = '<a:gradFill rotWithShape="1">', r[r.length] = "<a:gsLst>", r[r.length] = '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="50000"/><a:satMod val="300000"/></a:schemeClr></a:gs>', r[r.length] = '<a:gs pos="35000"><a:schemeClr val="phClr"><a:tint val="37000"/><a:satMod val="300000"/></a:schemeClr></a:gs>', r[r.length] = '<a:gs pos="100000"><a:schemeClr val="phClr"><a:tint val="15000"/><a:satMod val="350000"/></a:schemeClr></a:gs>', r[r.length] = "</a:gsLst>", r[r.length] = '<a:lin ang="16200000" scaled="1"/>', r[r.length] = "</a:gradFill>", r[r.length] = '<a:gradFill rotWithShape="1">', r[r.length] = "<a:gsLst>", r[r.length] = '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="100000"/><a:shade val="100000"/><a:satMod val="130000"/></a:schemeClr></a:gs>', r[r.length] = '<a:gs pos="100000"><a:schemeClr val="phClr"><a:tint val="50000"/><a:shade val="100000"/><a:satMod val="350000"/></a:schemeClr></a:gs>', r[r.length] = "</a:gsLst>", r[r.length] = '<a:lin ang="16200000" scaled="0"/>', r[r.length] = "</a:gradFill>", r[r.length] = "</a:fillStyleLst>", r[r.length] = "<a:lnStyleLst>", r[r.length] = '<a:ln w="9525" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"><a:shade val="95000"/><a:satMod val="105000"/></a:schemeClr></a:solidFill><a:prstDash val="solid"/></a:ln>', r[r.length] = '<a:ln w="25400" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln>', r[r.length] = '<a:ln w="38100" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln>', r[r.length] = "</a:lnStyleLst>", r[r.length] = "<a:effectStyleLst>", r[r.length] = "<a:effectStyle>", r[r.length] = "<a:effectLst>", r[r.length] = '<a:outerShdw blurRad="40000" dist="20000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="38000"/></a:srgbClr></a:outerShdw>', r[r.length] = "</a:effectLst>", r[r.length] = "</a:effectStyle>", r[r.length] = "<a:effectStyle>", r[r.length] = "<a:effectLst>", r[r.length] = '<a:outerShdw blurRad="40000" dist="23000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="35000"/></a:srgbClr></a:outerShdw>', r[r.length] = "</a:effectLst>", r[r.length] = "</a:effectStyle>", r[r.length] = "<a:effectStyle>", r[r.length] = "<a:effectLst>", r[r.length] = '<a:outerShdw blurRad="40000" dist="23000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="35000"/></a:srgbClr></a:outerShdw>', r[r.length] = "</a:effectLst>", r[r.length] = '<a:scene3d><a:camera prst="orthographicFront"><a:rot lat="0" lon="0" rev="0"/></a:camera><a:lightRig rig="threePt" dir="t"><a:rot lat="0" lon="0" rev="1200000"/></a:lightRig></a:scene3d>', r[r.length] = '<a:sp3d><a:bevelT w="63500" h="25400"/></a:sp3d>', r[r.length] = "</a:effectStyle>", r[r.length] = "</a:effectStyleLst>", r[r.length] = "<a:bgFillStyleLst>", r[r.length] = '<a:solidFill><a:schemeClr val="phClr"/></a:solidFill>', r[r.length] = '<a:gradFill rotWithShape="1">', r[r.length] = "<a:gsLst>", r[r.length] = '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="40000"/><a:satMod val="350000"/></a:schemeClr></a:gs>', r[r.length] = '<a:gs pos="40000"><a:schemeClr val="phClr"><a:tint val="45000"/><a:shade val="99000"/><a:satMod val="350000"/></a:schemeClr></a:gs>', r[r.length] = '<a:gs pos="100000"><a:schemeClr val="phClr"><a:shade val="20000"/><a:satMod val="255000"/></a:schemeClr></a:gs>', r[r.length] = "</a:gsLst>", r[r.length] = '<a:path path="circle"><a:fillToRect l="50000" t="-80000" r="50000" b="180000"/></a:path>', r[r.length] = "</a:gradFill>", r[r.length] = '<a:gradFill rotWithShape="1">', r[r.length] = "<a:gsLst>", r[r.length] = '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="80000"/><a:satMod val="300000"/></a:schemeClr></a:gs>', r[r.length] = '<a:gs pos="100000"><a:schemeClr val="phClr"><a:shade val="30000"/><a:satMod val="200000"/></a:schemeClr></a:gs>', r[r.length] = "</a:gsLst>", r[r.length] = '<a:path path="circle"><a:fillToRect l="50000" t="50000" r="50000" b="50000"/></a:path>', r[r.length] = "</a:gradFill>", r[r.length] = "</a:bgFillStyleLst>", r[r.length] = "</a:fmtScheme>", r[r.length] = "</a:themeElements>", r[r.length] = "<a:objectDefaults>", r[r.length] = "<a:spDef>", r[r.length] = '<a:spPr/><a:bodyPr/><a:lstStyle/><a:style><a:lnRef idx="1"><a:schemeClr val="accent1"/></a:lnRef><a:fillRef idx="3"><a:schemeClr val="accent1"/></a:fillRef><a:effectRef idx="2"><a:schemeClr val="accent1"/></a:effectRef><a:fontRef idx="minor"><a:schemeClr val="lt1"/></a:fontRef></a:style>', r[r.length] = "</a:spDef>", r[r.length] = "<a:lnDef>", r[r.length] = '<a:spPr/><a:bodyPr/><a:lstStyle/><a:style><a:lnRef idx="2"><a:schemeClr val="accent1"/></a:lnRef><a:fillRef idx="0"><a:schemeClr val="accent1"/></a:fillRef><a:effectRef idx="1"><a:schemeClr val="accent1"/></a:effectRef><a:fontRef idx="minor"><a:schemeClr val="tx1"/></a:fontRef></a:style>', r[r.length] = "</a:lnDef>", r[r.length] = "</a:objectDefaults>", r[r.length] = "<a:extraClrSchemeLst/>", r[r.length] = "</a:theme>", r.join("");
}
function Jc(e, t) {
  return {
    flags: e.read_shift(4),
    version: e.read_shift(4),
    name: Ke(e)
  };
}
function Zc(e) {
  var t = B(12 + 2 * e.name.length);
  return t.write_shift(4, e.flags), t.write_shift(4, e.version), be(e.name, t), t.slice(0, t.l);
}
function Qc(e) {
  for (var t = [], r = e.read_shift(4); r-- > 0; )
    t.push([e.read_shift(4), e.read_shift(4)]);
  return t;
}
function eu(e) {
  var t = B(4 + 8 * e.length);
  t.write_shift(4, e.length);
  for (var r = 0; r < e.length; ++r)
    t.write_shift(4, e[r][0]), t.write_shift(4, e[r][1]);
  return t;
}
function ru(e, t) {
  var r = B(8 + 2 * t.length);
  return r.write_shift(4, e), be(t, r), r.slice(0, r.l);
}
function tu(e) {
  return e.l += 4, e.read_shift(4) != 0;
}
function nu(e, t) {
  var r = B(8);
  return r.write_shift(4, e), r.write_shift(4, t ? 1 : 0), r;
}
function au() {
  var e = Qe();
  return H(e, 332), H(e, 334, Tr(1)), H(e, 335, Zc({
    name: "XLDAPR",
    version: 12e4,
    flags: 3496657072
  })), H(e, 336), H(e, 339, ru(1, "XLDAPR")), H(e, 52), H(e, 35, Tr(514)), H(e, 4096, Tr(0)), H(e, 4097, hr(1)), H(e, 36), H(e, 53), H(e, 340), H(e, 337, nu(1, !0)), H(e, 51, eu([[1, 0]])), H(e, 338), H(e, 333), e.end();
}
function Yi() {
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
function iu(e) {
  var t = {};
  t.i = e.read_shift(4);
  var r = {};
  r.r = e.read_shift(4), r.c = e.read_shift(4), t.r = _e(r);
  var n = e.read_shift(1);
  return n & 2 && (t.l = "1"), n & 8 && (t.a = "1"), t;
}
var ct = 1024;
function qi(e, t) {
  for (var r = [21600, 21600], n = ["m0,0l0", r[1], r[0], r[1], r[0], "0xe"].join(","), a = [
    q("xml", null, { "xmlns:v": ir.v, "xmlns:o": ir.o, "xmlns:x": ir.x, "xmlns:mv": ir.mv }).replace(/\/>/, ">"),
    q("o:shapelayout", q("o:idmap", null, { "v:ext": "edit", data: e }), { "v:ext": "edit" }),
    q("v:shapetype", [
      q("v:stroke", null, { joinstyle: "miter" }),
      q("v:path", null, { gradientshapeok: "t", "o:connecttype": "rect" })
    ].join(""), { id: "_x0000_t202", "o:spt": 202, coordsize: r.join(","), path: n })
  ]; ct < e * 1e3; )
    ct += 1e3;
  return t.forEach(function(i) {
    var s = Be(i[0]), f = (
      /*::(*/
      { color2: "#BEFF82", type: "gradient" }
    );
    f.type == "gradient" && (f.angle = "-180");
    var o = f.type == "gradient" ? q("o:fill", null, { type: "gradientUnscaled", "v:ext": "view" }) : null, l = q("v:fill", o, f), c = { on: "t", obscured: "t" };
    ++ct, a = a.concat([
      "<v:shape" + Ut({
        id: "_x0000_s" + ct,
        type: "#_x0000_t202",
        style: "position:absolute; margin-left:80pt;margin-top:5pt;width:104pt;height:64pt;z-index:10" + (i[1].hidden ? ";visibility:hidden" : ""),
        fillcolor: "#ECFAD4",
        strokecolor: "#edeaa1"
      }) + ">",
      l,
      q("v:shadow", null, c),
      q("v:path", null, { "o:connecttype": "none" }),
      '<v:textbox><div style="text-align:left"></div></v:textbox>',
      '<x:ClientData ObjectType="Note">',
      "<x:MoveWithCells/>",
      "<x:SizeWithCells/>",
      /* Part 4 19.4.2.3 Anchor (Anchor) */
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
function Ji(e) {
  var t = [Ie, q("comments", null, { xmlns: _t[0] })], r = [];
  return t.push("<authors>"), e.forEach(function(n) {
    n[1].forEach(function(a) {
      var i = me(a.a);
      r.indexOf(i) == -1 && (r.push(i), t.push("<author>" + i + "</author>")), a.T && a.ID && r.indexOf("tc=" + a.ID) == -1 && (r.push("tc=" + a.ID), t.push("<author>tc=" + a.ID + "</author>"));
    });
  }), r.length == 0 && (r.push("SheetJ5"), t.push("<author>SheetJ5</author>")), t.push("</authors>"), t.push("<commentList>"), e.forEach(function(n) {
    var a = 0, i = [];
    if (n[1][0] && n[1][0].T && n[1][0].ID ? a = r.indexOf("tc=" + n[1][0].ID) : n[1].forEach(function(o) {
      o.a && (a = r.indexOf(me(o.a))), i.push(o.t || "");
    }), t.push('<comment ref="' + n[0] + '" authorId="' + a + '"><text>'), i.length <= 1)
      t.push(Ge("t", me(i[0] || "")));
    else {
      for (var s = `Comment:
    ` + i[0] + `
`, f = 1; f < i.length; ++f)
        s += `Reply:
    ` + i[f] + `
`;
      t.push(Ge("t", me(s)));
    }
    t.push("</text></comment>");
  }), t.push("</commentList>"), t.length > 2 && (t[t.length] = "</comments>", t[1] = t[1].replace("/>", ">")), t.join("");
}
function su(e, t, r) {
  var n = [Ie, q("ThreadedComments", null, { xmlns: Me.TCMNT }).replace(/[\/]>/, ">")];
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
      f == 0 ? i = o.id : o.parentId = i, s.ID = o.id, s.a && (o.personId = "{54EE7950-7262-4200-6969-" + ("000000000000" + t.indexOf(s.a)).slice(-12) + "}"), n.push(q("threadedComment", Ge("text", s.t || ""), o));
    });
  }), n.push("</ThreadedComments>"), n.join("");
}
function fu(e) {
  var t = [Ie, q("personList", null, {
    xmlns: Me.TCMNT,
    "xmlns:x": _t[0]
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
function lu(e) {
  var t = {};
  t.iauthor = e.read_shift(4);
  var r = at(e);
  return t.rfx = r.s, t.ref = _e(r.s), e.l += 16, t;
}
function ou(e, t) {
  return t == null && (t = B(36)), t.write_shift(4, e[1].iauthor), wt(e[0], t), t.write_shift(4, 0), t.write_shift(4, 0), t.write_shift(4, 0), t.write_shift(4, 0), t;
}
var cu = Ke;
function uu(e) {
  return be(e.slice(0, 54));
}
function hu(e) {
  var t = Qe(), r = [];
  return H(
    t,
    628
    /* BrtBeginComments */
  ), H(
    t,
    630
    /* BrtBeginCommentAuthors */
  ), e.forEach(function(n) {
    n[1].forEach(function(a) {
      r.indexOf(a.a) > -1 || (r.push(a.a.slice(0, 54)), H(t, 632, uu(a.a)));
    });
  }), H(
    t,
    631
    /* BrtEndCommentAuthors */
  ), H(
    t,
    633
    /* BrtBeginCommentList */
  ), e.forEach(function(n) {
    n[1].forEach(function(a) {
      a.iauthor = r.indexOf(a.a);
      var i = { s: Be(n[0]), e: Be(n[0]) };
      H(t, 635, ou([i, a])), a.t && a.t.length > 0 && H(t, 637, xo(a)), H(
        t,
        636
        /* BrtEndComment */
      ), delete a.iauthor;
    });
  }), H(
    t,
    634
    /* BrtEndCommentList */
  ), H(
    t,
    629
    /* BrtEndComments */
  ), t.end();
}
function xu(e, t) {
  t.FullPaths.forEach(function(r, n) {
    if (n != 0) {
      var a = r.replace(/[^\/]*[\/]/, "/_VBA_PROJECT_CUR/");
      a.slice(-1) !== "/" && we.utils.cfb_add(e, a, t.FileIndex[n].content);
    }
  });
}
var Zi = ["xlsb", "xlsm", "xlam", "biff8", "xla"], du = /* @__PURE__ */ function() {
  var e = /(^|[^A-Za-z_])R(\[?-?\d+\]|[1-9]\d*|)C(\[?-?\d+\]|[1-9]\d*|)(?![A-Za-z0-9_])/g, t = { r: 0, c: 0 };
  function r(n, a, i, s) {
    var f = !1, o = !1;
    i.length == 0 ? o = !0 : i.charAt(0) == "[" && (o = !0, i = i.slice(1, -1)), s.length == 0 ? f = !0 : s.charAt(0) == "[" && (f = !0, s = s.slice(1, -1));
    var l = i.length > 0 ? parseInt(i, 10) | 0 : 0, c = s.length > 0 ? parseInt(s, 10) | 0 : 0;
    return f ? c += t.c : --c, o ? l += t.r : --l, a + (f ? "" : "$") + $e(c) + (o ? "" : "$") + Xe(l);
  }
  return function(a, i) {
    return t = i, a.replace(e, r);
  };
}(), _0 = /(^|[^._A-Z0-9])([$]?)([A-Z]{1,2}|[A-W][A-Z]{2}|X[A-E][A-Z]|XF[A-D])([$]?)(10[0-3]\d{4}|104[0-7]\d{3}|1048[0-4]\d{2}|10485[0-6]\d|104857[0-6]|[1-9]\d{0,5})(?![_.\(A-Za-z0-9])/g, T0 = /* @__PURE__ */ function() {
  return function(t, r) {
    return t.replace(_0, function(n, a, i, s, f, o) {
      var l = x0(s) - (i ? 0 : r.c), c = h0(o) - (f ? 0 : r.r), x = c == 0 ? "" : f ? c + 1 : "[" + c + "]", h = l == 0 ? "" : i ? l + 1 : "[" + l + "]";
      return a + "R" + x + "C" + h;
    });
  };
}();
function pu(e, t) {
  return e.replace(_0, function(r, n, a, i, s, f) {
    return n + (a == "$" ? a + i : $e(x0(i) + t.c)) + (s == "$" ? s + f : Xe(h0(f) + t.r));
  });
}
function vu(e) {
  return e.length != 1;
}
function Re(e) {
  e.l += 1;
}
function Vr(e, t) {
  var r = e.read_shift(t == 1 ? 1 : 2);
  return [r & 16383, r >> 14 & 1, r >> 15 & 1];
}
function Qi(e, t, r) {
  var n = 2;
  if (r) {
    if (r.biff >= 2 && r.biff <= 5)
      return es(e);
    r.biff == 12 && (n = 4);
  }
  var a = e.read_shift(n), i = e.read_shift(n), s = Vr(e, 2), f = Vr(e, 2);
  return { s: { r: a, c: s[0], cRel: s[1], rRel: s[2] }, e: { r: i, c: f[0], cRel: f[1], rRel: f[2] } };
}
function es(e) {
  var t = Vr(e, 2), r = Vr(e, 2), n = e.read_shift(1), a = e.read_shift(1);
  return { s: { r: t[0], c: n, cRel: t[1], rRel: t[2] }, e: { r: r[0], c: a, cRel: r[1], rRel: r[2] } };
}
function gu(e, t, r) {
  if (r.biff < 8)
    return es(e);
  var n = e.read_shift(r.biff == 12 ? 4 : 2), a = e.read_shift(r.biff == 12 ? 4 : 2), i = Vr(e, 2), s = Vr(e, 2);
  return { s: { r: n, c: i[0], cRel: i[1], rRel: i[2] }, e: { r: a, c: s[0], cRel: s[1], rRel: s[2] } };
}
function rs(e, t, r) {
  if (r && r.biff >= 2 && r.biff <= 5)
    return mu(e);
  var n = e.read_shift(r && r.biff == 12 ? 4 : 2), a = Vr(e, 2);
  return { r: n, c: a[0], cRel: a[1], rRel: a[2] };
}
function mu(e) {
  var t = Vr(e, 2), r = e.read_shift(1);
  return { r: t[0], c: r, cRel: t[1], rRel: t[2] };
}
function _u(e) {
  var t = e.read_shift(2), r = e.read_shift(2);
  return { r: t, c: r & 255, fQuoted: !!(r & 16384), cRel: r >> 15, rRel: r >> 15 };
}
function Tu(e, t, r) {
  var n = r && r.biff ? r.biff : 8;
  if (n >= 2 && n <= 5)
    return wu(e);
  var a = e.read_shift(n >= 12 ? 4 : 2), i = e.read_shift(2), s = (i & 16384) >> 14, f = (i & 32768) >> 15;
  if (i &= 16383, f == 1)
    for (; a > 524287; )
      a -= 1048576;
  if (s == 1)
    for (; i > 8191; )
      i = i - 16384;
  return { r: a, c: i, cRel: s, rRel: f };
}
function wu(e) {
  var t = e.read_shift(2), r = e.read_shift(1), n = (t & 32768) >> 15, a = (t & 16384) >> 14;
  return t &= 16383, n == 1 && t >= 8192 && (t = t - 16384), a == 1 && r >= 128 && (r = r - 256), { r: t, c: r, cRel: a, rRel: n };
}
function Eu(e, t, r) {
  var n = (e[e.l++] & 96) >> 5, a = Qi(e, r.biff >= 2 && r.biff <= 5 ? 6 : 8, r);
  return [n, a];
}
function Su(e, t, r) {
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
  var s = Qi(e, i, r);
  return [n, a, s];
}
function Au(e, t, r) {
  var n = (e[e.l++] & 96) >> 5;
  return e.l += r && r.biff > 8 ? 12 : r.biff < 8 ? 6 : 8, [n];
}
function Fu(e, t, r) {
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
function yu(e, t, r) {
  var n = (e[e.l++] & 96) >> 5, a = gu(e, t - 1, r);
  return [n, a];
}
function Cu(e, t, r) {
  var n = (e[e.l++] & 96) >> 5;
  return e.l += r.biff == 2 ? 6 : r.biff == 12 ? 14 : 7, [n];
}
function Ea(e) {
  var t = e[e.l + 1] & 1, r = 1;
  return e.l += 4, [t, r];
}
function Ou(e, t, r) {
  e.l += 2;
  for (var n = e.read_shift(r && r.biff == 2 ? 1 : 2), a = [], i = 0; i <= n; ++i)
    a.push(e.read_shift(r && r.biff == 2 ? 1 : 2));
  return a;
}
function Du(e, t, r) {
  var n = e[e.l + 1] & 255 ? 1 : 0;
  return e.l += 2, [n, e.read_shift(r && r.biff == 2 ? 1 : 2)];
}
function Ru(e, t, r) {
  var n = e[e.l + 1] & 255 ? 1 : 0;
  return e.l += 2, [n, e.read_shift(r && r.biff == 2 ? 1 : 2)];
}
function ku(e) {
  var t = e[e.l + 1] & 255 ? 1 : 0;
  return e.l += 2, [t, e.read_shift(2)];
}
function Iu(e, t, r) {
  var n = e[e.l + 1] & 255 ? 1 : 0;
  return e.l += r && r.biff == 2 ? 3 : 4, [n];
}
function ts(e) {
  var t = e.read_shift(1), r = e.read_shift(1);
  return [t, r];
}
function Nu(e) {
  return e.read_shift(2), ts(e);
}
function Pu(e) {
  return e.read_shift(2), ts(e);
}
function Lu(e, t, r) {
  var n = (e[e.l] & 96) >> 5;
  e.l += 1;
  var a = rs(e, 0, r);
  return [n, a];
}
function Mu(e, t, r) {
  var n = (e[e.l] & 96) >> 5;
  e.l += 1;
  var a = Tu(e, 0, r);
  return [n, a];
}
function Bu(e, t, r) {
  var n = (e[e.l] & 96) >> 5;
  e.l += 1;
  var a = e.read_shift(2);
  r && r.biff == 5 && (e.l += 12);
  var i = rs(e, 0, r);
  return [n, a, i];
}
function bu(e, t, r) {
  var n = (e[e.l] & 96) >> 5;
  e.l += 1;
  var a = e.read_shift(r && r.biff <= 3 ? 1 : 2);
  return [b1[a], is[a], n];
}
function Uu(e, t, r) {
  var n = e[e.l++], a = e.read_shift(1), i = r && r.biff <= 3 ? [n == 88 ? -1 : 0, e.read_shift(1)] : Hu(e);
  return [a, (i[0] === 0 ? is : B1)[i[1]]];
}
function Hu(e) {
  return [e[e.l + 1] >> 7, e.read_shift(2) & 32767];
}
function Wu(e, t, r) {
  e.l += r && r.biff == 2 ? 3 : 4;
}
function Vu(e, t, r) {
  if (e.l++, r && r.biff == 12)
    return [e.read_shift(4, "i"), 0];
  var n = e.read_shift(2), a = e.read_shift(r && r.biff == 2 ? 1 : 2);
  return [n, a];
}
function Gu(e) {
  return e.l++, zt[e.read_shift(1)];
}
function Xu(e) {
  return e.l++, e.read_shift(2);
}
function ju(e) {
  return e.l++, e.read_shift(1) !== 0;
}
function zu(e) {
  return e.l++, Et(e);
}
function $u(e, t, r) {
  return e.l++, bi(e, t - 1, r);
}
function Ku(e, t) {
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
      r[1] = Bo(e, 1) ? "TRUE" : "FALSE", t != 12 && (e.l += 7);
      break;
    case 37:
    case 16:
      r[1] = zt[e[e.l]], e.l += t == 12 ? 4 : 8;
      break;
    case 0:
      e.l += 8;
      break;
    case 1:
      r[1] = Et(e);
      break;
    case 2:
      r[1] = Wo(e, 0, { biff: t > 0 && t < 8 ? 2 : t });
      break;
    default:
      throw new Error("Bad SerAr: " + r[0]);
  }
  return r;
}
function Yu(e, t, r) {
  for (var n = e.read_shift(r.biff == 12 ? 4 : 2), a = [], i = 0; i != n; ++i)
    a.push((r.biff == 12 ? at : Xo)(e));
  return a;
}
function qu(e, t, r) {
  var n = 0, a = 0;
  r.biff == 12 ? (n = e.read_shift(4), a = e.read_shift(4)) : (a = 1 + e.read_shift(1), n = 1 + e.read_shift(2)), r.biff >= 2 && r.biff < 8 && (--n, --a == 0 && (a = 256));
  for (var i = 0, s = []; i != n && (s[i] = []); ++i)
    for (var f = 0; f != a; ++f)
      s[i][f] = Ku(e, r.biff);
  return s;
}
function Ju(e, t, r) {
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
function Zu(e, t, r) {
  if (r.biff == 5)
    return Qu(e);
  var n = e.read_shift(1) >>> 5 & 3, a = e.read_shift(2), i = e.read_shift(4);
  return [n, a, i];
}
function Qu(e) {
  var t = e.read_shift(1) >>> 5 & 3, r = e.read_shift(2, "i");
  e.l += 8;
  var n = e.read_shift(2);
  return e.l += 12, [t, r, n];
}
function e1(e, t, r) {
  var n = e.read_shift(1) >>> 5 & 3;
  e.l += r && r.biff == 2 ? 3 : 4;
  var a = e.read_shift(r && r.biff == 2 ? 1 : 2);
  return [n, a];
}
function r1(e, t, r) {
  var n = e.read_shift(1) >>> 5 & 3, a = e.read_shift(r && r.biff == 2 ? 1 : 2);
  return [n, a];
}
function t1(e, t, r) {
  var n = e.read_shift(1) >>> 5 & 3;
  return e.l += 4, r.biff < 8 && e.l--, r.biff == 12 && (e.l += 2), [n];
}
function n1(e, t, r) {
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
var a1 = Ar, i1 = Ar, s1 = Ar;
function $t(e, t, r) {
  return e.l += 2, [_u(e)];
}
function w0(e) {
  return e.l += 6, [];
}
var f1 = $t, l1 = w0, o1 = w0, c1 = $t;
function ns(e) {
  return e.l += 2, [Mi(e), e.read_shift(2) & 1];
}
var u1 = $t, h1 = ns, x1 = w0, d1 = $t, p1 = $t, v1 = [
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
function g1(e) {
  e.l += 2;
  var t = e.read_shift(2), r = e.read_shift(2), n = e.read_shift(4), a = e.read_shift(2), i = e.read_shift(2), s = v1[r >> 2 & 31];
  return { ixti: t, coltype: r & 3, rt: s, idx: n, c: a, C: i };
}
function m1(e) {
  return e.l += 2, [e.read_shift(4)];
}
function _1(e, t, r) {
  return e.l += 5, e.l += 2, e.l += r.biff == 2 ? 1 : 4, ["PTGSHEET"];
}
function T1(e, t, r) {
  return e.l += r.biff == 2 ? 4 : 5, ["PTGENDSHEET"];
}
function w1(e) {
  var t = e.read_shift(1) >>> 5 & 3, r = e.read_shift(2);
  return [t, r];
}
function E1(e) {
  var t = e.read_shift(1) >>> 5 & 3, r = e.read_shift(2);
  return [t, r];
}
function S1(e) {
  return e.l += 4, [0, 0];
}
var Sa = {
  /*::[*/
  1: { n: "PtgExp", f: Vu },
  /*::[*/
  2: { n: "PtgTbl", f: s1 },
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
  23: { n: "PtgStr", f: $u },
  /*::[*/
  26: { n: "PtgSheet", f: _1 },
  /*::[*/
  27: { n: "PtgEndSheet", f: T1 },
  /*::[*/
  28: { n: "PtgErr", f: Gu },
  /*::[*/
  29: { n: "PtgBool", f: ju },
  /*::[*/
  30: { n: "PtgInt", f: Xu },
  /*::[*/
  31: { n: "PtgNum", f: zu },
  /*::[*/
  32: { n: "PtgArray", f: Cu },
  /*::[*/
  33: { n: "PtgFunc", f: bu },
  /*::[*/
  34: { n: "PtgFuncVar", f: Uu },
  /*::[*/
  35: { n: "PtgName", f: Ju },
  /*::[*/
  36: { n: "PtgRef", f: Lu },
  /*::[*/
  37: { n: "PtgArea", f: Eu },
  /*::[*/
  38: { n: "PtgMemArea", f: e1 },
  /*::[*/
  39: { n: "PtgMemErr", f: a1 },
  /*::[*/
  40: { n: "PtgMemNoMem", f: i1 },
  /*::[*/
  41: { n: "PtgMemFunc", f: r1 },
  /*::[*/
  42: { n: "PtgRefErr", f: t1 },
  /*::[*/
  43: { n: "PtgAreaErr", f: Au },
  /*::[*/
  44: { n: "PtgRefN", f: Mu },
  /*::[*/
  45: { n: "PtgAreaN", f: yu },
  /*::[*/
  46: { n: "PtgMemAreaN", f: w1 },
  /*::[*/
  47: { n: "PtgMemNoMemN", f: E1 },
  /*::[*/
  57: { n: "PtgNameX", f: Zu },
  /*::[*/
  58: { n: "PtgRef3d", f: Bu },
  /*::[*/
  59: { n: "PtgArea3d", f: Su },
  /*::[*/
  60: { n: "PtgRefErr3d", f: n1 },
  /*::[*/
  61: { n: "PtgAreaErr3d", f: Fu },
  /*::[*/
  255: {}
}, A1 = {
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
}, F1 = {
  /*::[*/
  1: { n: "PtgElfLel", f: ns },
  /*::[*/
  2: { n: "PtgElfRw", f: d1 },
  /*::[*/
  3: { n: "PtgElfCol", f: f1 },
  /*::[*/
  6: { n: "PtgElfRwV", f: p1 },
  /*::[*/
  7: { n: "PtgElfColV", f: c1 },
  /*::[*/
  10: { n: "PtgElfRadical", f: u1 },
  /*::[*/
  11: { n: "PtgElfRadicalS", f: x1 },
  /*::[*/
  13: { n: "PtgElfColS", f: l1 },
  /*::[*/
  15: { n: "PtgElfColSV", f: o1 },
  /*::[*/
  16: { n: "PtgElfRadicalLel", f: h1 },
  /*::[*/
  25: { n: "PtgList", f: g1 },
  /*::[*/
  29: { n: "PtgSxName", f: m1 },
  /*::[*/
  255: {}
}, y1 = {
  /*::[*/
  0: { n: "PtgAttrNoop", f: S1 },
  /*::[*/
  1: { n: "PtgAttrSemi", f: Iu },
  /*::[*/
  2: { n: "PtgAttrIf", f: Ru },
  /*::[*/
  4: { n: "PtgAttrChoose", f: Ou },
  /*::[*/
  8: { n: "PtgAttrGoto", f: Du },
  /*::[*/
  16: { n: "PtgAttrSum", f: Wu },
  /*::[*/
  32: { n: "PtgAttrBaxcel", f: Ea },
  /*::[*/
  33: { n: "PtgAttrBaxcel", f: Ea },
  /*::[*/
  64: { n: "PtgAttrSpace", f: Nu },
  /*::[*/
  65: { n: "PtgAttrSpaceSemi", f: Pu },
  /*::[*/
  128: { n: "PtgAttrIfError", f: ku },
  /*::[*/
  255: {}
};
function C1(e, t, r, n) {
  if (n.biff < 8)
    return Ar(e, t);
  for (var a = e.l + t, i = [], s = 0; s !== r.length; ++s)
    switch (r[s][0]) {
      case "PtgArray":
        r[s][1] = qu(e, 0, n), i.push(r[s][1]);
        break;
      case "PtgMemArea":
        r[s][2] = Yu(e, r[s][1], n), i.push(r[s][2]);
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
  return t = a - e.l, t !== 0 && i.push(Ar(e, t)), i;
}
function O1(e, t, r) {
  for (var n = e.l + t, a, i, s = []; n != e.l; )
    t = n - e.l, i = e[e.l], a = Sa[i] || Sa[A1[i]], (i === 24 || i === 25) && (a = (i === 24 ? F1 : y1)[e[e.l + 1]]), !a || !a.f ? Ar(e, t) : s.push([a.n, a.f(e, t, r)]);
  return s;
}
function D1(e) {
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
var R1 = {
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
function k1(e, t) {
  if (!e && !(t && t.biff <= 5 && t.biff >= 2))
    throw new Error("empty sheet name");
  return /[^\w\u4E00-\u9FFF\u3040-\u30FF]/.test(e) ? "'" + e + "'" : e;
}
function as(e, t, r) {
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
function Aa(e, t, r) {
  var n = as(e, t, r);
  return n == "#REF" ? n : k1(n, r);
}
function vt(e, t, r, n, a) {
  var i = a && a.biff || 8, s = (
    /*range != null ? range :*/
    { s: { c: 0, r: 0 }, e: { c: 0, r: 0 } }
  ), f = [], o, l, c, x = 0, h = 0, d, m = "";
  if (!e[0] || !e[0][0])
    return "";
  for (var u = -1, g = "", F = 0, O = e[0].length; F < O; ++F) {
    var y = e[0][F];
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
        if (o = f.pop(), l = f.pop(), u >= 0) {
          switch (e[0][u][1][0]) {
            case 0:
              g = Ce(" ", e[0][u][1][1]);
              break;
            case 1:
              g = Ce("\r", e[0][u][1][1]);
              break;
            default:
              if (g = "", a.WTF)
                throw new Error("Unexpected PtgAttrSpaceType " + e[0][u][1][0]);
          }
          l = l + g, u = -1;
        }
        f.push(l + R1[y[0]] + o);
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
        c = It(y[1][1], s, a), f.push(Nt(c, i));
        break;
      case "PtgRefN":
        c = r ? It(y[1][1], r, a) : y[1][1], f.push(Nt(c, i));
        break;
      case "PtgRef3d":
        x = /*::Number(*/
        y[1][1], c = It(y[1][2], s, a), m = Aa(n, x, a), f.push(m + "!" + Nt(c, i));
        break;
      case "PtgFunc":
      case "PtgFuncVar":
        var L = y[1][0], z = y[1][1];
        L || (L = 0), L &= 127;
        var ee = L == 0 ? [] : f.slice(-L);
        f.length -= L, z === "User" && (z = ee.shift()), f.push(z + "(" + ee.join(",") + ")");
        break;
      case "PtgBool":
        f.push(y[1] ? "TRUE" : "FALSE");
        break;
      case "PtgInt":
        f.push(
          /*::String(*/
          y[1]
          /*::)*/
        );
        break;
      case "PtgNum":
        f.push(String(y[1]));
        break;
      case "PtgStr":
        f.push('"' + y[1].replace(/"/g, '""') + '"');
        break;
      case "PtgErr":
        f.push(
          /*::String(*/
          y[1]
          /*::)*/
        );
        break;
      case "PtgAreaN":
        d = la(y[1][1], r ? { s: r } : s, a), f.push(Vn(d, a));
        break;
      case "PtgArea":
        d = la(y[1][1], s, a), f.push(Vn(d, a));
        break;
      case "PtgArea3d":
        x = /*::Number(*/
        y[1][1], d = y[1][2], m = Aa(n, x, a), f.push(m + "!" + Vn(d, a));
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
        var M = y[1][1];
        h = y[1][2];
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
            var K = (as(n, M, a) || "").split(";;");
            K[h - 1] ? G = K[h - 1] : G += "SH33TJSERRX";
          }
          f.push(G);
          break;
        }
        V || (V = { Name: "SH33TJSERRY" }), f.push(V.Name);
        break;
      case "PtgParen":
        var te = "(", Te = ")";
        if (u >= 0) {
          switch (g = "", e[0][u][1][0]) {
            case 2:
              te = Ce(" ", e[0][u][1][1]) + te;
              break;
            case 3:
              te = Ce("\r", e[0][u][1][1]) + te;
              break;
            case 4:
              Te = Ce(" ", e[0][u][1][1]) + Te;
              break;
            case 5:
              Te = Ce("\r", e[0][u][1][1]) + Te;
              break;
            default:
              if (a.WTF)
                throw new Error("Unexpected PtgAttrSpaceType " + e[0][u][1][0]);
          }
          u = -1;
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
        c = { c: y[1][1], r: y[1][0] };
        var oe = { c: r.c, r: r.r };
        if (n.sharedf[_e(c)]) {
          var Ue = n.sharedf[_e(c)];
          f.push(vt(Ue, s, oe, n, a));
        } else {
          var De = !1;
          for (o = 0; o != n.arrayf.length; ++o)
            if (l = n.arrayf[o], !(c.c < l[0].s.c || c.c > l[0].e.c) && !(c.r < l[0].s.r || c.r > l[0].e.r)) {
              f.push(vt(l[1], s, oe, n, a)), De = !0;
              break;
            }
          De || f.push(
            /*::String(*/
            y[1]
            /*::)*/
          );
        }
        break;
      case "PtgArray":
        f.push("{" + D1(
          /*::(*/
          y[1]
          /*:: :any)*/
        ) + "}");
        break;
      case "PtgMemArea":
        break;
      case "PtgAttrSpace":
      case "PtgAttrSpaceSemi":
        u = F;
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
    var dr = ["PtgAttrSpace", "PtgAttrSpaceSemi", "PtgAttrGoto"];
    if (a.biff != 3 && u >= 0 && dr.indexOf(e[0][F][0]) == -1) {
      y = e[0][u];
      var Pe = !0;
      switch (y[1][0]) {
        case 4:
          Pe = !1;
        case 0:
          g = Ce(" ", y[1][1]);
          break;
        case 5:
          Pe = !1;
        case 1:
          g = Ce("\r", y[1][1]);
          break;
        default:
          if (g = "", a.WTF)
            throw new Error("Unexpected PtgAttrSpaceType " + y[1][0]);
      }
      f.push((Pe ? g : "") + f.pop() + (Pe ? "" : g)), u = -1;
    }
  }
  if (f.length > 1 && a.WTF)
    throw new Error("bad formula stack");
  return f[0];
}
function I1(e) {
  if (e == null) {
    var t = B(8);
    return t.write_shift(1, 3), t.write_shift(1, 0), t.write_shift(2, 0), t.write_shift(2, 0), t.write_shift(2, 65535), t;
  } else if (typeof e == "number")
    return Zr(e);
  return Zr(0);
}
function N1(e, t, r, n, a) {
  var i = Qr(t, r, a), s = I1(e.v), f = B(6), o = 33;
  f.write_shift(2, o), f.write_shift(4, 0);
  for (var l = B(e.bf.length), c = 0; c < e.bf.length; ++c)
    l[c] = e.bf[c];
  var x = Ve([i, s, f, l]);
  return x;
}
function Rn(e, t, r) {
  var n = e.read_shift(4), a = O1(e, n, r), i = e.read_shift(4), s = i > 0 ? C1(e, i, a, r) : null;
  return [a, s];
}
var P1 = Rn, kn = Rn, L1 = Rn, M1 = Rn, B1 = {
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
}, is = {
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
}, b1 = {
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
function U1(e) {
  var t = "of:=" + e.replace(_0, "$1[.$2$3$4$5]").replace(/\]:\[/g, ":");
  return t.replace(/;/g, "|").replace(/,/g, ";");
}
function H1(e) {
  return e.replace(/\./, "!");
}
var Pt = typeof Map < "u";
function E0(e, t, r) {
  var n = 0, a = e.length;
  if (r) {
    if (Pt ? r.has(t) : Object.prototype.hasOwnProperty.call(r, t)) {
      for (var i = Pt ? r.get(t) : r[t]; n < i.length; ++n)
        if (e[i[n]].t === t)
          return e.Count++, i[n];
    }
  } else
    for (; n < a; ++n)
      if (e[n].t === t)
        return e.Count++, n;
  return e[a] = { t }, e.Count++, e.Unique++, r && (Pt ? (r.has(t) || r.set(t, []), r.get(t).push(a)) : (Object.prototype.hasOwnProperty.call(r, t) || (r[t] = []), r[t].push(a))), a;
}
function In(e, t) {
  var r = { min: e + 1, max: e + 1 }, n = -1;
  return t.MDW && (kr = t.MDW), t.width != null ? r.customWidth = 1 : t.wpx != null ? n = Tn(t.wpx) : t.wch != null && (n = t.wch), n > -1 ? (r.width = Qn(n), r.customWidth = 1) : t.width != null && (r.width = t.width), t.hidden && (r.hidden = !0), t.level != null && (r.outlineLevel = r.level = t.level), r;
}
function ss(e, t) {
  if (e) {
    var r = [0.7, 0.7, 0.75, 0.75, 0.3, 0.3];
    t == "xlml" && (r = [1, 1, 1, 1, 0.5, 0.5]), e.left == null && (e.left = r[0]), e.right == null && (e.right = r[1]), e.top == null && (e.top = r[2]), e.bottom == null && (e.bottom = r[3]), e.header == null && (e.header = r[4]), e.footer == null && (e.footer = r[5]);
  }
}
function Xr(e, t, r) {
  var n = r.revssf[t.z != null ? t.z : "General"], a = 60, i = e.length;
  if (n == null && r.ssf) {
    for (; a < 392; ++a)
      if (r.ssf[a] == null) {
        ri(t.z, a), r.ssf[a] = t.z, r.revssf[t.z] = n = a;
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
function W1(e, t, r) {
  if (e && e["!ref"]) {
    var n = Se(e["!ref"]);
    if (n.e.c < n.s.c || n.e.r < n.s.r)
      throw new Error("Bad range (" + r + "): " + e["!ref"]);
  }
}
function V1(e) {
  if (e.length === 0)
    return "";
  for (var t = '<mergeCells count="' + e.length + '">', r = 0; r != e.length; ++r)
    t += '<mergeCell ref="' + ke(e[r]) + '"/>';
  return t + "</mergeCells>";
}
function G1(e, t, r, n, a) {
  var i = !1, s = {}, f = null;
  if (n.bookType !== "xlsx" && t.vbaraw) {
    var o = t.SheetNames[r];
    try {
      t.Workbook && (o = t.Workbook.Sheets[r].CodeName || o);
    } catch {
    }
    i = !0, s.codeName = Or(me(o));
  }
  if (e && e["!outline"]) {
    var l = { summaryBelow: 1, summaryRight: 1 };
    e["!outline"].above && (l.summaryBelow = 0), e["!outline"].left && (l.summaryRight = 0), f = (f || "") + q("outlinePr", null, l);
  }
  !i && !f || (a[a.length] = q("sheetPr", f, s));
}
var X1 = ["objects", "scenarios", "selectLockedCells", "selectUnlockedCells"], j1 = [
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
function z1(e) {
  var t = { sheet: 1 };
  return X1.forEach(function(r) {
    e[r] != null && e[r] && (t[r] = "1");
  }), j1.forEach(function(r) {
    e[r] != null && !e[r] && (t[r] = "0");
  }), e.password && (t.password = Gi(e.password).toString(16).toUpperCase()), q("sheetProtection", null, t);
}
function $1(e) {
  return ss(e), q("pageMargins", null, e);
}
function K1(e, t) {
  for (var r = ["<cols>"], n, a = 0; a != t.length; ++a)
    (n = t[a]) && (r[r.length] = q("col", null, In(a, n)));
  return r[r.length] = "</cols>", r.join("");
}
function Y1(e, t, r, n) {
  var a = typeof e.ref == "string" ? e.ref : ke(e.ref);
  r.Workbook || (r.Workbook = { Sheets: [] }), r.Workbook.Names || (r.Workbook.Names = []);
  var i = r.Workbook.Names, s = fr(a);
  s.s.r == s.e.r && (s.e.r = fr(t["!ref"]).e.r, a = ke(s));
  for (var f = 0; f < i.length; ++f) {
    var o = i[f];
    if (o.Name == "_xlnm._FilterDatabase" && o.Sheet == n) {
      o.Ref = "'" + r.SheetNames[n] + "'!" + a;
      break;
    }
  }
  return f == i.length && i.push({ Name: "_xlnm._FilterDatabase", Sheet: n, Ref: "'" + r.SheetNames[n] + "'!" + a }), q("autoFilter", null, { ref: a });
}
function q1(e, t, r, n) {
  var a = { workbookViewId: "0" };
  return (((n || {}).Workbook || {}).Views || [])[0] && (a.rightToLeft = n.Workbook.Views[0].RTL ? "1" : "0"), q("sheetViews", q("sheetView", null, a), {});
}
function J1(e, t, r, n) {
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
        n && n.cellDates ? a = Ze(e.v, -1).toISOString() : (e = rr(e), e.t = "n", a = "" + (e.v = er(Ze(e.v)))), typeof e.z > "u" && (e.z = Oe[14]);
        break;
      default:
        a = e.v;
        break;
    }
  var f = Ge("v", me(a)), o = { r: t }, l = Xr(n.cellXfs, e, n);
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
        f = Ge("v", "" + E0(n.Strings, e.v, n.revStrings)), o.t = "s";
        break;
      }
      o.t = "str";
      break;
  }
  if (e.t != i && (e.t = i, e.v = s), typeof e.f == "string" && e.f) {
    var c = e.F && e.F.slice(0, t.length) == t ? { t: "array", ref: e.F } : null;
    f = q("f", me(e.f), c) + (e.v != null ? f : "");
  }
  return e.l && r["!links"].push([t, e.l]), e.D && (o.cm = 1), q("c", f, o);
}
function Z1(e, t, r, n) {
  var a = [], i = [], s = Se(e["!ref"]), f = "", o, l = "", c = [], x = 0, h = 0, d = e["!rows"], m = Array.isArray(e), u = { r: l }, g, F = -1;
  for (h = s.s.c; h <= s.e.c; ++h)
    c[h] = $e(h);
  for (x = s.s.r; x <= s.e.r; ++x) {
    for (i = [], l = Xe(x), h = s.s.c; h <= s.e.c; ++h) {
      o = c[h] + l;
      var O = m ? (e[x] || [])[h] : e[o];
      O !== void 0 && (f = J1(O, o, e, t)) != null && i.push(f);
    }
    (i.length > 0 || d && d[x]) && (u = { r: l }, d && d[x] && (g = d[x], g.hidden && (u.hidden = 1), F = -1, g.hpx ? F = wn(g.hpx) : g.hpt && (F = g.hpt), F > -1 && (u.ht = F, u.customHeight = 1), g.level && (u.outlineLevel = g.level)), a[a.length] = q("row", i.join(""), u));
  }
  if (d)
    for (; x < d.length; ++x)
      d && d[x] && (u = { r: x + 1 }, g = d[x], g.hidden && (u.hidden = 1), F = -1, g.hpx ? F = wn(g.hpx) : g.hpt && (F = g.hpt), F > -1 && (u.ht = F, u.customHeight = 1), g.level && (u.outlineLevel = g.level), a[a.length] = q("row", "", u));
  return a.join("");
}
function fs(e, t, r, n) {
  var a = [Ie, q("worksheet", null, {
    xmlns: _t[0],
    "xmlns:r": Me.r
  })], i = r.SheetNames[e], s = 0, f = "", o = r.Sheets[i];
  o == null && (o = {});
  var l = o["!ref"] || "A1", c = Se(l);
  if (c.e.c > 16383 || c.e.r > 1048575) {
    if (t.WTF)
      throw new Error("Range " + l + " exceeds format limit A1:XFD1048576");
    c.e.c = Math.min(c.e.c, 16383), c.e.r = Math.min(c.e.c, 1048575), l = ke(c);
  }
  n || (n = {}), o["!comments"] = [];
  var x = [];
  G1(o, r, e, t, a), a[a.length] = q("dimension", null, { ref: l }), a[a.length] = q1(o, t, e, r), t.sheetFormat && (a[a.length] = q("sheetFormatPr", null, {
    defaultRowHeight: t.sheetFormat.defaultRowHeight || "16",
    baseColWidth: t.sheetFormat.baseColWidth || "10",
    outlineLevelRow: t.sheetFormat.outlineLevelRow || "7"
  })), o["!cols"] != null && o["!cols"].length > 0 && (a[a.length] = K1(o, o["!cols"])), a[s = a.length] = "<sheetData/>", o["!links"] = [], o["!ref"] != null && (f = Z1(o, t), f.length > 0 && (a[a.length] = f)), a.length > s + 1 && (a[a.length] = "</sheetData>", a[s] = a[s].replace("/>", ">")), o["!protect"] && (a[a.length] = z1(o["!protect"])), o["!autofilter"] != null && (a[a.length] = Y1(o["!autofilter"], o, r, e)), o["!merges"] != null && o["!merges"].length > 0 && (a[a.length] = V1(o["!merges"]));
  var h = -1, d, m = -1;
  return (
    /*::(*/
    o["!links"].length > 0 && (a[a.length] = "<hyperlinks>", o["!links"].forEach(function(u) {
      u[1].Target && (d = { ref: u[0] }, u[1].Target.charAt(0) != "#" && (m = ge(n, -1, me(u[1].Target).replace(/#.*$/, ""), xe.HLINK), d["r:id"] = "rId" + m), (h = u[1].Target.indexOf("#")) > -1 && (d.location = me(u[1].Target.slice(h + 1))), u[1].Tooltip && (d.tooltip = me(u[1].Tooltip)), a[a.length] = q("hyperlink", null, d));
    }), a[a.length] = "</hyperlinks>"), delete o["!links"], o["!margins"] != null && (a[a.length] = $1(o["!margins"])), (!t || t.ignoreEC || t.ignoreEC == null) && (a[a.length] = Ge("ignoredErrors", q("ignoredError", null, { numberStoredAsText: 1, sqref: l }))), x.length > 0 && (m = ge(n, -1, "../drawings/drawing" + (e + 1) + ".xml", xe.DRAW), a[a.length] = q("drawing", null, { "r:id": "rId" + m }), o["!drawing"] = x), o["!comments"].length > 0 && (m = ge(n, -1, "../drawings/vmlDrawing" + (e + 1) + ".vml", xe.VML), a[a.length] = q("legacyDrawing", null, { "r:id": "rId" + m }), o["!legacy"] = m), a.length > 1 && (a[a.length] = "</worksheet>", a[1] = a[1].replace("/>", ">")), a.join("")
  );
}
function Q1(e, t) {
  var r = {}, n = e.l + t;
  r.r = e.read_shift(4), e.l += 4;
  var a = e.read_shift(2);
  e.l += 1;
  var i = e.read_shift(1);
  return e.l = n, i & 7 && (r.level = i & 7), i & 16 && (r.hidden = !0), i & 32 && (r.hpt = a / 20), r;
}
function eh(e, t, r) {
  var n = B(145), a = (r["!rows"] || [])[e] || {};
  n.write_shift(4, e), n.write_shift(4, 0);
  var i = 320;
  a.hpx ? i = wn(a.hpx) * 20 : a.hpt && (i = a.hpt * 20), n.write_shift(2, i), n.write_shift(1, 0);
  var s = 0;
  a.level && (s |= a.level), a.hidden && (s |= 16), (a.hpx || a.hpt) && (s |= 32), n.write_shift(1, s), n.write_shift(1, 0);
  var f = 0, o = n.l;
  n.l += 4;
  for (var l = { r: e, c: 0 }, c = 0; c < 16; ++c)
    if (!(t.s.c > c + 1 << 10 || t.e.c < c << 10)) {
      for (var x = -1, h = -1, d = c << 10; d < c + 1 << 10; ++d) {
        l.c = d;
        var m = Array.isArray(r) ? (r[l.r] || [])[l.c] : r[_e(l)];
        m && (x < 0 && (x = d), h = d);
      }
      x < 0 || (++f, n.write_shift(4, x), n.write_shift(4, h));
    }
  var u = n.l;
  return n.l = o, n.write_shift(4, f), n.l = u, n.length > n.l ? n.slice(0, n.l) : n;
}
function rh(e, t, r, n) {
  var a = eh(n, r, t);
  (a.length > 17 || (t["!rows"] || [])[n]) && H(e, 0, a);
}
var th = at, nh = wt;
function ah() {
}
function ih(e, t) {
  var r = {}, n = e[e.l];
  return ++e.l, r.above = !(n & 64), r.left = !(n & 128), e.l += 18, r.name = po(e), r;
}
function sh(e, t, r) {
  r == null && (r = B(84 + 4 * e.length));
  var n = 192;
  t && (t.above && (n &= -65), t.left && (n &= -129)), r.write_shift(1, n);
  for (var a = 1; a < 3; ++a)
    r.write_shift(1, 0);
  return gn({ auto: 1 }, r), r.write_shift(-4, -1), r.write_shift(-4, -1), Ei(e, r), r.slice(0, r.l);
}
function fh(e) {
  var t = xr(e);
  return [t];
}
function lh(e, t, r) {
  return r == null && (r = B(8)), rt(t, r);
}
function oh(e) {
  var t = tt(e);
  return [t];
}
function ch(e, t, r) {
  return r == null && (r = B(4)), nt(t, r);
}
function uh(e) {
  var t = xr(e), r = e.read_shift(1);
  return [t, r, "b"];
}
function hh(e, t, r) {
  return r == null && (r = B(9)), rt(t, r), r.write_shift(1, e.v ? 1 : 0), r;
}
function xh(e) {
  var t = tt(e), r = e.read_shift(1);
  return [t, r, "b"];
}
function dh(e, t, r) {
  return r == null && (r = B(5)), nt(t, r), r.write_shift(1, e.v ? 1 : 0), r;
}
function ph(e) {
  var t = xr(e), r = e.read_shift(1);
  return [t, r, "e"];
}
function vh(e, t, r) {
  return r == null && (r = B(9)), rt(t, r), r.write_shift(1, e.v), r;
}
function gh(e) {
  var t = tt(e), r = e.read_shift(1);
  return [t, r, "e"];
}
function mh(e, t, r) {
  return r == null && (r = B(8)), nt(t, r), r.write_shift(1, e.v), r.write_shift(2, 0), r.write_shift(1, 0), r;
}
function _h(e) {
  var t = xr(e), r = e.read_shift(4);
  return [t, r, "s"];
}
function Th(e, t, r) {
  return r == null && (r = B(12)), rt(t, r), r.write_shift(4, t.v), r;
}
function wh(e) {
  var t = tt(e), r = e.read_shift(4);
  return [t, r, "s"];
}
function Eh(e, t, r) {
  return r == null && (r = B(8)), nt(t, r), r.write_shift(4, t.v), r;
}
function Sh(e) {
  var t = xr(e), r = Et(e);
  return [t, r, "n"];
}
function Ah(e, t, r) {
  return r == null && (r = B(16)), rt(t, r), Zr(e.v, r), r;
}
function Fh(e) {
  var t = tt(e), r = Et(e);
  return [t, r, "n"];
}
function yh(e, t, r) {
  return r == null && (r = B(12)), nt(t, r), Zr(e.v, r), r;
}
function Ch(e) {
  var t = xr(e), r = Si(e);
  return [t, r, "n"];
}
function Oh(e, t, r) {
  return r == null && (r = B(12)), rt(t, r), Ai(e.v, r), r;
}
function Dh(e) {
  var t = tt(e), r = Si(e);
  return [t, r, "n"];
}
function Rh(e, t, r) {
  return r == null && (r = B(8)), nt(t, r), Ai(e.v, r), r;
}
function kh(e) {
  var t = xr(e), r = d0(e);
  return [t, r, "is"];
}
function Ih(e) {
  var t = xr(e), r = Ke(e);
  return [t, r, "str"];
}
function Nh(e, t, r) {
  return r == null && (r = B(12 + 4 * e.v.length)), rt(t, r), be(e.v, r), r.length > r.l ? r.slice(0, r.l) : r;
}
function Ph(e) {
  var t = tt(e), r = Ke(e);
  return [t, r, "str"];
}
function Lh(e, t, r) {
  return r == null && (r = B(8 + 4 * e.v.length)), nt(t, r), be(e.v, r), r.length > r.l ? r.slice(0, r.l) : r;
}
function Mh(e, t, r) {
  var n = e.l + t, a = xr(e);
  a.r = r["!row"];
  var i = e.read_shift(1), s = [a, i, "b"];
  if (r.cellFormula) {
    e.l += 2;
    var f = kn(e, n - e.l, r);
    s[3] = vt(f, null, a, r.supbooks, r);
  } else
    e.l = n;
  return s;
}
function Bh(e, t, r) {
  var n = e.l + t, a = xr(e);
  a.r = r["!row"];
  var i = e.read_shift(1), s = [a, i, "e"];
  if (r.cellFormula) {
    e.l += 2;
    var f = kn(e, n - e.l, r);
    s[3] = vt(f, null, a, r.supbooks, r);
  } else
    e.l = n;
  return s;
}
function bh(e, t, r) {
  var n = e.l + t, a = xr(e);
  a.r = r["!row"];
  var i = Et(e), s = [a, i, "n"];
  if (r.cellFormula) {
    e.l += 2;
    var f = kn(e, n - e.l, r);
    s[3] = vt(f, null, a, r.supbooks, r);
  } else
    e.l = n;
  return s;
}
function Uh(e, t, r) {
  var n = e.l + t, a = xr(e);
  a.r = r["!row"];
  var i = Ke(e), s = [a, i, "str"];
  if (r.cellFormula) {
    e.l += 2;
    var f = kn(e, n - e.l, r);
    s[3] = vt(f, null, a, r.supbooks, r);
  } else
    e.l = n;
  return s;
}
var Hh = at, Wh = wt;
function Vh(e, t) {
  return t == null && (t = B(4)), t.write_shift(4, e), t;
}
function Gh(e, t) {
  var r = e.l + t, n = at(e), a = p0(e), i = Ke(e), s = Ke(e), f = Ke(e);
  e.l = r;
  var o = { rfx: n, relId: a, loc: i, display: f };
  return s && (o.Tooltip = s), o;
}
function Xh(e, t) {
  var r = B(50 + 4 * (e[1].Target.length + (e[1].Tooltip || "").length));
  wt({ s: Be(e[0]), e: Be(e[0]) }, r), v0("rId" + t, r);
  var n = e[1].Target.indexOf("#"), a = n == -1 ? "" : e[1].Target.slice(n + 1);
  return be(a || "", r), be(e[1].Tooltip || "", r), be("", r), r.slice(0, r.l);
}
function jh() {
}
function zh(e, t, r) {
  var n = e.l + t, a = Fi(e), i = e.read_shift(1), s = [a];
  if (s[2] = i, r.cellFormula) {
    var f = P1(e, n - e.l, r);
    s[1] = f;
  } else
    e.l = n;
  return s;
}
function $h(e, t, r) {
  var n = e.l + t, a = at(e), i = [a];
  if (r.cellFormula) {
    var s = M1(e, n - e.l, r);
    i[1] = s, e.l = n;
  } else
    e.l = n;
  return i;
}
function Kh(e, t, r) {
  r == null && (r = B(18));
  var n = In(e, t);
  r.write_shift(-4, e), r.write_shift(-4, e), r.write_shift(4, (n.width || 10) * 256), r.write_shift(
    4,
    0
    /*ixfe*/
  );
  var a = 0;
  return t.hidden && (a |= 1), typeof n.width == "number" && (a |= 2), t.level && (a |= t.level << 8), r.write_shift(2, a), r;
}
var ls = ["left", "right", "top", "bottom", "header", "footer"];
function Yh(e) {
  var t = {};
  return ls.forEach(function(r) {
    t[r] = Et(e);
  }), t;
}
function qh(e, t) {
  return t == null && (t = B(6 * 8)), ss(e), ls.forEach(function(r) {
    Zr(e[r], t);
  }), t;
}
function Jh(e) {
  var t = e.read_shift(2);
  return e.l += 28, { RTL: t & 32 };
}
function Zh(e, t, r) {
  r == null && (r = B(30));
  var n = 924;
  return (((t || {}).Views || [])[0] || {}).RTL && (n |= 32), r.write_shift(2, n), r.write_shift(4, 0), r.write_shift(4, 0), r.write_shift(4, 0), r.write_shift(1, 0), r.write_shift(1, 0), r.write_shift(2, 0), r.write_shift(2, 100), r.write_shift(2, 0), r.write_shift(2, 0), r.write_shift(2, 0), r.write_shift(4, 0), r;
}
function Qh(e) {
  var t = B(24);
  return t.write_shift(4, 4), t.write_shift(4, 1), wt(e, t), t;
}
function ex(e, t) {
  return t == null && (t = B(16 * 4 + 2)), t.write_shift(2, e.password ? Gi(e.password) : 0), t.write_shift(4, 1), [
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
function rx() {
}
function tx() {
}
function nx(e, t, r, n, a, i, s) {
  if (t.v === void 0)
    return !1;
  var f = "";
  switch (t.t) {
    case "b":
      f = t.v ? "1" : "0";
      break;
    case "d":
      t = rr(t), t.z = t.z || Oe[14], t.v = er(Ze(t.v)), t.t = "n";
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
  switch (o.s = Xr(a.cellXfs, t, a), t.l && i["!links"].push([_e(o), t.l]), t.c && i["!comments"].push([_e(o), t.c]), t.t) {
    case "s":
    case "str":
      return a.bookSST ? (f = E0(a.Strings, t.v, a.revStrings), o.t = "s", o.v = f, s ? H(e, 18, Eh(t, o)) : H(e, 7, Th(t, o))) : (o.t = "str", s ? H(e, 17, Lh(t, o)) : H(e, 6, Nh(t, o))), !0;
    case "n":
      return t.v == (t.v | 0) && t.v > -1e3 && t.v < 1e3 ? s ? H(e, 13, Rh(t, o)) : H(e, 2, Oh(t, o)) : s ? H(e, 16, yh(t, o)) : H(e, 5, Ah(t, o)), !0;
    case "b":
      return o.t = "b", s ? H(e, 15, dh(t, o)) : H(e, 4, hh(t, o)), !0;
    case "e":
      return o.t = "e", s ? H(e, 14, mh(t, o)) : H(e, 3, vh(t, o)), !0;
  }
  return s ? H(e, 12, ch(t, o)) : H(e, 1, lh(t, o)), !0;
}
function ax(e, t, r, n) {
  var a = Se(t["!ref"] || "A1"), i, s = "", f = [];
  H(
    e,
    145
    /* BrtBeginSheetData */
  );
  var o = Array.isArray(t), l = a.e.r;
  t["!rows"] && (l = Math.max(a.e.r, t["!rows"].length - 1));
  for (var c = a.s.r; c <= l; ++c) {
    s = Xe(c), rh(e, t, a, c);
    var x = !1;
    if (c <= a.e.r)
      for (var h = a.s.c; h <= a.e.c; ++h) {
        c === a.s.r && (f[h] = $e(h)), i = f[h] + s;
        var d = o ? (t[c] || [])[h] : t[i];
        if (!d) {
          x = !1;
          continue;
        }
        x = nx(e, d, c, h, n, t, x);
      }
  }
  H(
    e,
    146
    /* BrtEndSheetData */
  );
}
function ix(e, t) {
  !t || !t["!merges"] || (H(e, 177, Vh(t["!merges"].length)), t["!merges"].forEach(function(r) {
    H(e, 176, Wh(r));
  }), H(
    e,
    178
    /* BrtEndMergeCells */
  ));
}
function sx(e, t) {
  !t || !t["!cols"] || (H(
    e,
    390
    /* BrtBeginColInfos */
  ), t["!cols"].forEach(function(r, n) {
    r && H(e, 60, Kh(n, r));
  }), H(
    e,
    391
    /* BrtEndColInfos */
  ));
}
function fx(e, t) {
  !t || !t["!ref"] || (H(
    e,
    648
    /* BrtBeginCellIgnoreECs */
  ), H(e, 649, Qh(Se(t["!ref"]))), H(
    e,
    650
    /* BrtEndCellIgnoreECs */
  ));
}
function lx(e, t, r) {
  t["!links"].forEach(function(n) {
    if (n[1].Target) {
      var a = ge(r, -1, n[1].Target.replace(/#.*$/, ""), xe.HLINK);
      H(e, 494, Xh(n, a));
    }
  }), delete t["!links"];
}
function ox(e, t, r, n) {
  if (t["!comments"].length > 0) {
    var a = ge(n, -1, "../drawings/vmlDrawing" + (r + 1) + ".vml", xe.VML);
    H(e, 551, v0("rId" + a)), t["!legacy"] = a;
  }
}
function cx(e, t, r, n) {
  if (t["!autofilter"]) {
    var a = t["!autofilter"], i = typeof a.ref == "string" ? a.ref : ke(a.ref);
    r.Workbook || (r.Workbook = { Sheets: [] }), r.Workbook.Names || (r.Workbook.Names = []);
    var s = r.Workbook.Names, f = fr(i);
    f.s.r == f.e.r && (f.e.r = fr(t["!ref"]).e.r, i = ke(f));
    for (var o = 0; o < s.length; ++o) {
      var l = s[o];
      if (l.Name == "_xlnm._FilterDatabase" && l.Sheet == n) {
        l.Ref = "'" + r.SheetNames[n] + "'!" + i;
        break;
      }
    }
    o == s.length && s.push({ Name: "_xlnm._FilterDatabase", Sheet: n, Ref: "'" + r.SheetNames[n] + "'!" + i }), H(e, 161, wt(Se(i))), H(
      e,
      162
      /* BrtEndAFilter */
    );
  }
}
function ux(e, t, r) {
  H(
    e,
    133
    /* BrtBeginWsViews */
  ), H(e, 137, Zh(t, r)), H(
    e,
    138
    /* BrtEndWsView */
  ), H(
    e,
    134
    /* BrtEndWsViews */
  );
}
function hx(e, t) {
  t["!protect"] && H(e, 535, ex(t["!protect"]));
}
function xx(e, t, r, n) {
  var a = Qe(), i = r.SheetNames[e], s = r.Sheets[i] || {}, f = i;
  try {
    r && r.Workbook && (f = r.Workbook.Sheets[e].CodeName || f);
  } catch {
  }
  var o = Se(s["!ref"] || "A1");
  if (o.e.c > 16383 || o.e.r > 1048575) {
    if (t.WTF)
      throw new Error("Range " + (s["!ref"] || "A1") + " exceeds format limit A1:XFD1048576");
    o.e.c = Math.min(o.e.c, 16383), o.e.r = Math.min(o.e.c, 1048575);
  }
  return s["!links"] = [], s["!comments"] = [], H(
    a,
    129
    /* BrtBeginSheet */
  ), (r.vbaraw || s["!outline"]) && H(a, 147, sh(f, s["!outline"])), H(a, 148, nh(o)), ux(a, s, r.Workbook), sx(a, s), ax(a, s, e, t), hx(a, s), cx(a, s, r, e), ix(a, s), lx(a, s, n), s["!margins"] && H(a, 476, qh(s["!margins"])), (!t || t.ignoreEC || t.ignoreEC == null) && fx(a, s), ox(a, s, e, n), H(
    a,
    130
    /* BrtEndSheet */
  ), a.end();
}
function dx(e, t) {
  e.l += 10;
  var r = Ke(e);
  return { name: r };
}
var px = [
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
function vx(e) {
  return !e.Workbook || !e.Workbook.WBProps ? "false" : zl(e.Workbook.WBProps.date1904) ? "true" : "false";
}
var gx = /* @__PURE__ */ "][*?/\\".split("");
function os(e, t) {
  if (e.length > 31) {
    if (t)
      return !1;
    throw new Error("Sheet names cannot exceed 31 chars");
  }
  var r = !0;
  return gx.forEach(function(n) {
    if (e.indexOf(n) != -1) {
      if (!t)
        throw new Error("Sheet name cannot contain : \\ / ? * [ ]");
      r = !1;
    }
  }), r;
}
function mx(e, t, r) {
  e.forEach(function(n, a) {
    os(n);
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
function _x(e) {
  if (!e || !e.SheetNames || !e.Sheets)
    throw new Error("Invalid Workbook");
  if (!e.SheetNames.length)
    throw new Error("Workbook is empty");
  var t = e.Workbook && e.Workbook.Sheets || [];
  mx(e.SheetNames, t, !!e.vbaraw);
  for (var r = 0; r < e.SheetNames.length; ++r)
    W1(e.Sheets[e.SheetNames[r]], e.SheetNames[r], r);
}
function cs(e) {
  var t = [Ie];
  t[t.length] = q("workbook", null, {
    xmlns: _t[0],
    //'xmlns:mx': XMLNS.mx,
    //'xmlns:s': XMLNS_main[0],
    "xmlns:r": Me.r
  });
  var r = e.Workbook && (e.Workbook.Names || []).length > 0, n = { codeName: "ThisWorkbook" };
  e.Workbook && e.Workbook.WBProps && (px.forEach(function(f) {
    e.Workbook.WBProps[f[0]] != null && e.Workbook.WBProps[f[0]] != f[1] && (n[f[0]] = e.Workbook.WBProps[f[0]]);
  }), e.Workbook.WBProps.CodeName && (n.codeName = e.Workbook.WBProps.CodeName, delete n.CodeName)), t[t.length] = q("workbookPr", null, n);
  var a = e.Workbook && e.Workbook.Sheets || [], i = 0;
  if (a && a[0] && a[0].Hidden) {
    for (t[t.length] = "<bookViews>", i = 0; i != e.SheetNames.length && !(!a[i] || !a[i].Hidden); ++i)
      ;
    i == e.SheetNames.length && (i = 0), t[t.length] = '<workbookView firstSheet="' + i + '" activeTab="' + i + '"/>', t[t.length] = "</bookViews>";
  }
  for (t[t.length] = "<sheets>", i = 0; i != e.SheetNames.length; ++i) {
    var s = { name: me(e.SheetNames[i].slice(0, 31)) };
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
    var o = { name: f.Name };
    f.Comment && (o.comment = f.Comment), f.Sheet != null && (o.localSheetId = "" + f.Sheet), f.Hidden && (o.hidden = "1"), f.Ref && (t[t.length] = q("definedName", me(f.Ref), o));
  }), t[t.length] = "</definedNames>"), t.length > 2 && (t[t.length] = "</workbook>", t[1] = t[1].replace("/>", ">")), t.join("");
}
function Tx(e, t) {
  var r = {};
  return r.Hidden = e.read_shift(4), r.iTabID = e.read_shift(4), r.strRelID = Zn(e), r.name = Ke(e), r;
}
function wx(e, t) {
  return t || (t = B(127)), t.write_shift(4, e.Hidden), t.write_shift(4, e.iTabID), v0(e.strRelID, t), be(e.name.slice(0, 31), t), t.length > t.l ? t.slice(0, t.l) : t;
}
function Ex(e, t) {
  var r = {}, n = e.read_shift(4);
  r.defaultThemeVersion = e.read_shift(4);
  var a = t > 8 ? Ke(e) : "";
  return a.length > 0 && (r.CodeName = a), r.autoCompressPictures = !!(n & 65536), r.backupFile = !!(n & 64), r.checkCompatibility = !!(n & 4096), r.date1904 = !!(n & 1), r.filterPrivacy = !!(n & 8), r.hidePivotFieldList = !!(n & 1024), r.promptedSolutions = !!(n & 16), r.publishItems = !!(n & 2048), r.refreshAllConnections = !!(n & 262144), r.saveExternalLinkValues = !!(n & 128), r.showBorderUnselectedTables = !!(n & 4), r.showInkAnnotation = !!(n & 32), r.showObjects = ["all", "placeholders", "none"][n >> 13 & 3], r.showPivotChartFilter = !!(n & 32768), r.updateLinks = ["userSet", "never", "always"][n >> 8 & 3], r;
}
function Sx(e, t) {
  t || (t = B(72));
  var r = 0;
  return e && e.filterPrivacy && (r |= 8), t.write_shift(4, r), t.write_shift(4, 0), Ei(e && e.CodeName || "ThisWorkbook", t), t.slice(0, t.l);
}
function Ax(e, t, r) {
  var n = e.l + t;
  e.l += 4, e.l += 1;
  var a = e.read_shift(4), i = vo(e), s = L1(e, 0, r), f = p0(e);
  e.l = n;
  var o = { Name: i, Ptg: s };
  return a < 268435455 && (o.Sheet = a), f && (o.Comment = f), o;
}
function Fx(e, t) {
  H(
    e,
    143
    /* BrtBeginBundleShs */
  );
  for (var r = 0; r != t.SheetNames.length; ++r) {
    var n = t.Workbook && t.Workbook.Sheets && t.Workbook.Sheets[r] && t.Workbook.Sheets[r].Hidden || 0, a = { Hidden: n, iTabID: r + 1, strRelID: "rId" + (r + 1), name: t.SheetNames[r] };
    H(e, 156, wx(a));
  }
  H(
    e,
    144
    /* BrtEndBundleShs */
  );
}
function yx(e, t) {
  t || (t = B(127));
  for (var r = 0; r != 4; ++r)
    t.write_shift(4, 0);
  return be("SheetJS", t), be(cn.version, t), be(cn.version, t), be("7262", t), t.length > t.l ? t.slice(0, t.l) : t;
}
function Cx(e, t) {
  t || (t = B(29)), t.write_shift(-4, 0), t.write_shift(-4, 460), t.write_shift(4, 28800), t.write_shift(4, 17600), t.write_shift(4, 500), t.write_shift(4, e), t.write_shift(4, e);
  var r = 120;
  return t.write_shift(1, r), t.length > t.l ? t.slice(0, t.l) : t;
}
function Ox(e, t) {
  if (!(!t.Workbook || !t.Workbook.Sheets)) {
    for (var r = t.Workbook.Sheets, n = 0, a = -1, i = -1; n < r.length; ++n)
      !r[n] || !r[n].Hidden && a == -1 ? a = n : r[n].Hidden == 1 && i == -1 && (i = n);
    i > a || (H(
      e,
      135
      /* BrtBeginBookViews */
    ), H(e, 158, Cx(a)), H(
      e,
      136
      /* BrtEndBookViews */
    ));
  }
}
function Dx(e, t) {
  var r = Qe();
  return H(
    r,
    131
    /* BrtBeginBook */
  ), H(r, 128, yx()), H(r, 153, Sx(e.Workbook && e.Workbook.WBProps || null)), Ox(r, e), Fx(r, e), H(
    r,
    132
    /* BrtEndBook */
  ), r.end();
}
function Rx(e, t, r) {
  return (t.slice(-4) === ".bin" ? Dx : cs)(e);
}
function kx(e, t, r, n, a) {
  return (t.slice(-4) === ".bin" ? xx : fs)(e, r, n, a);
}
function Ix(e, t, r) {
  return (t.slice(-4) === ".bin" ? qc : zi)(e, r);
}
function Nx(e, t, r) {
  return (t.slice(-4) === ".bin" ? Sc : Vi)(e, r);
}
function Px(e, t, r) {
  return (t.slice(-4) === ".bin" ? hu : Ji)(e);
}
function Lx(e) {
  return (e.slice(-4) === ".bin" ? au : Yi)();
}
function Mx(e, t) {
  var r = [];
  return e.Props && r.push(Io(e.Props, t)), e.Custprops && r.push(No(e.Props, e.Custprops)), r.join("");
}
function Bx() {
  return "";
}
function bx(e, t) {
  var r = ['<Style ss:ID="Default" ss:Name="Normal"><NumberFormat/></Style>'];
  return t.cellXfs.forEach(function(n, a) {
    var i = [];
    i.push(q("NumberFormat", null, { "ss:Format": me(Oe[n.numFmtId]) }));
    var s = (
      /*::(*/
      { "ss:ID": "s" + (21 + a) }
    );
    r.push(q("Style", i.join(""), s));
  }), q("Styles", r.join(""));
}
function us(e) {
  return q("NamedRange", null, { "ss:Name": e.Name, "ss:RefersTo": "=" + T0(e.Ref, { r: 0, c: 0 }) });
}
function Ux(e) {
  if (!((e || {}).Workbook || {}).Names)
    return "";
  for (var t = e.Workbook.Names, r = [], n = 0; n < t.length; ++n) {
    var a = t[n];
    a.Sheet == null && (a.Name.match(/^_xlfn\./) || r.push(us(a)));
  }
  return q("Names", r.join(""));
}
function Hx(e, t, r, n) {
  if (!e || !((n || {}).Workbook || {}).Names)
    return "";
  for (var a = n.Workbook.Names, i = [], s = 0; s < a.length; ++s) {
    var f = a[s];
    f.Sheet == r && (f.Name.match(/^_xlfn\./) || i.push(us(f)));
  }
  return i.join("");
}
function Wx(e, t, r, n) {
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
  })), a.length == 0 ? "" : q("WorksheetOptions", a.join(""), { xmlns: ir.x });
}
function Vx(e) {
  return e.map(function(t) {
    var r = jl(t.t || ""), n = q("ss:Data", r, { xmlns: "http://www.w3.org/TR/REC-html40" });
    return q("Comment", n, { "ss:Author": t.a });
  }).join("");
}
function Gx(e, t, r, n, a, i, s) {
  if (!e || e.v == null && e.f == null)
    return "";
  var f = {};
  if (e.f && (f["ss:Formula"] = "=" + me(T0(e.f, s))), e.F && e.F.slice(0, t.length) == t) {
    var o = Be(e.F.slice(t.length + 1));
    f["ss:ArrayRange"] = "RC:R" + (o.r == s.r ? "" : "[" + (o.r - s.r) + "]") + "C" + (o.c == s.c ? "" : "[" + (o.c - s.c) + "]");
  }
  if (e.l && e.l.Target && (f["ss:HRef"] = me(e.l.Target), e.l.Tooltip && (f["x:HRefScreenTip"] = me(e.l.Tooltip))), r["!merges"])
    for (var l = r["!merges"], c = 0; c != l.length; ++c)
      l[c].s.c != s.c || l[c].s.r != s.r || (l[c].e.c > l[c].s.c && (f["ss:MergeAcross"] = l[c].e.c - l[c].s.c), l[c].e.r > l[c].s.r && (f["ss:MergeDown"] = l[c].e.r - l[c].s.r));
  var x = "", h = "";
  switch (e.t) {
    case "z":
      if (!n.sheetStubs)
        return "";
      break;
    case "n":
      x = "Number", h = String(e.v);
      break;
    case "b":
      x = "Boolean", h = e.v ? "1" : "0";
      break;
    case "e":
      x = "Error", h = zt[e.v];
      break;
    case "d":
      x = "DateTime", h = new Date(e.v).toISOString(), e.z == null && (e.z = e.z || Oe[14]);
      break;
    case "s":
      x = "String", h = Xl(e.v || "");
      break;
  }
  var d = Xr(n.cellXfs, e, n);
  f["ss:StyleID"] = "s" + (21 + d), f["ss:Index"] = s.c + 1;
  var m = e.v != null ? h : "", u = e.t == "z" ? "" : '<Data ss:Type="' + x + '">' + m + "</Data>";
  return (e.c || []).length > 0 && (u += Vx(e.c)), q("Cell", u, f);
}
function Xx(e, t) {
  var r = '<Row ss:Index="' + (e + 1) + '"';
  return t && (t.hpt && !t.hpx && (t.hpx = ji(t.hpt)), t.hpx && (r += ' ss:AutoFitHeight="0" ss:Height="' + t.hpx + '"'), t.hidden && (r += ' ss:Hidden="1"')), r + ">";
}
function jx(e, t, r, n) {
  if (!e["!ref"])
    return "";
  var a = Se(e["!ref"]), i = e["!merges"] || [], s = 0, f = [];
  e["!cols"] && e["!cols"].forEach(function(g, F) {
    m0(g);
    var O = !!g.width, y = In(F, g), L = { "ss:Index": F + 1 };
    O && (L["ss:Width"] = _n(y.width)), g.hidden && (L["ss:Hidden"] = "1"), f.push(q("Column", null, L));
  });
  for (var o = Array.isArray(e), l = a.s.r; l <= a.e.r; ++l) {
    for (var c = [Xx(l, (e["!rows"] || [])[l])], x = a.s.c; x <= a.e.c; ++x) {
      var h = !1;
      for (s = 0; s != i.length; ++s)
        if (!(i[s].s.c > x) && !(i[s].s.r > l) && !(i[s].e.c < x) && !(i[s].e.r < l)) {
          (i[s].s.c != x || i[s].s.r != l) && (h = !0);
          break;
        }
      if (!h) {
        var d = { r: l, c: x }, m = _e(d), u = o ? (e[l] || [])[x] : e[m];
        c.push(Gx(u, m, e, t, r, n, d));
      }
    }
    c.push("</Row>"), c.length > 2 && f.push(c.join(""));
  }
  return f.join("");
}
function zx(e, t, r) {
  var n = [], a = r.SheetNames[e], i = r.Sheets[a], s = i ? Hx(i, t, e, r) : "";
  return s.length > 0 && n.push("<Names>" + s + "</Names>"), s = i ? jx(i, t, e, r) : "", s.length > 0 && n.push("<Table>" + s + "</Table>"), n.push(Wx(i, t, e, r)), n.join("");
}
function $x(e, t) {
  t || (t = {}), e.SSF || (e.SSF = rr(Oe)), e.SSF && (Cn(), yn(e.SSF), t.revssf = On(e.SSF), t.revssf[e.SSF[65535]] = 0, t.ssf = e.SSF, t.cellXfs = [], Xr(t.cellXfs, {}, { revssf: { General: 0 } }));
  var r = [];
  r.push(Mx(e, t)), r.push(Bx()), r.push(""), r.push("");
  for (var n = 0; n < e.SheetNames.length; ++n)
    r.push(q("Worksheet", zx(n, t, e), { "ss:Name": me(e.SheetNames[n]) }));
  return r[2] = bx(e, t), r[3] = Ux(e), Ie + q("Workbook", r.join(""), {
    xmlns: ir.ss,
    "xmlns:o": ir.o,
    "xmlns:x": ir.x,
    "xmlns:ss": ir.ss,
    "xmlns:dt": ir.dt,
    "xmlns:html": ir.html
  });
}
var jn = {
  SI: "e0859ff2f94f6810ab9108002b27b3d9",
  DSI: "02d5cdd59c2e1b10939708002b2cf9ae",
  UDI: "05d5cdd59c2e1b10939708002b2cf9ae"
};
function Kx(e, t) {
  var r = [], n = [], a = [], i = 0, s, f = J0(ca, "n"), o = J0(ua, "n");
  if (e.Props)
    for (s = je(e.Props), i = 0; i < s.length; ++i)
      (Object.prototype.hasOwnProperty.call(f, s[i]) ? r : Object.prototype.hasOwnProperty.call(o, s[i]) ? n : a).push([s[i], e.Props[s[i]]]);
  if (e.Custprops)
    for (s = je(e.Custprops), i = 0; i < s.length; ++i)
      Object.prototype.hasOwnProperty.call(e.Props || {}, s[i]) || (Object.prototype.hasOwnProperty.call(f, s[i]) ? r : Object.prototype.hasOwnProperty.call(o, s[i]) ? n : a).push([s[i], e.Custprops[s[i]]]);
  var l = [];
  for (i = 0; i < a.length; ++i)
    Li.indexOf(a[i][0]) > -1 || Ii.indexOf(a[i][0]) > -1 || a[i][1] != null && l.push(a[i]);
  n.length && we.utils.cfb_add(t, "/SummaryInformation", va(n, jn.SI, o, ua)), (r.length || l.length) && we.utils.cfb_add(t, "/DocumentSummaryInformation", va(r, jn.DSI, f, ca, l.length ? l : null, jn.UDI));
}
function Yx(e, t) {
  var r = t || {}, n = we.utils.cfb_new({ root: "R" }), a = "/Workbook";
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
  return we.utils.cfb_add(n, a, hs(e, r)), r.biff == 8 && (e.Props || e.Custprops) && Kx(e, n), r.biff == 8 && e.vbaraw && xu(n, we.read(e.vbaraw, { type: typeof e.vbaraw == "string" ? "binary" : "buffer" })), n;
}
var qx = {
  /*::[*/
  0: {
    /* n:"BrtRowHdr", */
    f: Q1
  },
  /*::[*/
  1: {
    /* n:"BrtCellBlank", */
    f: fh
  },
  /*::[*/
  2: {
    /* n:"BrtCellRk", */
    f: Ch
  },
  /*::[*/
  3: {
    /* n:"BrtCellError", */
    f: ph
  },
  /*::[*/
  4: {
    /* n:"BrtCellBool", */
    f: uh
  },
  /*::[*/
  5: {
    /* n:"BrtCellReal", */
    f: Sh
  },
  /*::[*/
  6: {
    /* n:"BrtCellSt", */
    f: Ih
  },
  /*::[*/
  7: {
    /* n:"BrtCellIsst", */
    f: _h
  },
  /*::[*/
  8: {
    /* n:"BrtFmlaString", */
    f: Uh
  },
  /*::[*/
  9: {
    /* n:"BrtFmlaNum", */
    f: bh
  },
  /*::[*/
  10: {
    /* n:"BrtFmlaBool", */
    f: Mh
  },
  /*::[*/
  11: {
    /* n:"BrtFmlaError", */
    f: Bh
  },
  /*::[*/
  12: {
    /* n:"BrtShortBlank", */
    f: oh
  },
  /*::[*/
  13: {
    /* n:"BrtShortRk", */
    f: Dh
  },
  /*::[*/
  14: {
    /* n:"BrtShortError", */
    f: gh
  },
  /*::[*/
  15: {
    /* n:"BrtShortBool", */
    f: xh
  },
  /*::[*/
  16: {
    /* n:"BrtShortReal", */
    f: Fh
  },
  /*::[*/
  17: {
    /* n:"BrtShortSt", */
    f: Ph
  },
  /*::[*/
  18: {
    /* n:"BrtShortIsst", */
    f: wh
  },
  /*::[*/
  19: {
    /* n:"BrtSSTItem", */
    f: d0
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
    f: Ax
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
    f: Ic
  },
  /*::[*/
  44: {
    /* n:"BrtFmt", */
    f: Rc
  },
  /*::[*/
  45: {
    /* n:"BrtFill", */
    f: Lc
  },
  /*::[*/
  46: {
    /* n:"BrtBorder", */
    f: Bc
  },
  /*::[*/
  47: {
    /* n:"BrtXF", */
    f: Mc
  },
  /*::[*/
  48: {
    /* n:"BrtStyle" */
  },
  /*::[*/
  49: {
    /* n:"BrtCellMeta", */
    f: lo
  },
  /*::[*/
  50: {
    /* n:"BrtValueMeta" */
  },
  /*::[*/
  51: {
    /* n:"BrtMdb" */
    f: Qc
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
    f: cc
  },
  /*::[*/
  62: {
    /* n:"BrtCellRString", */
    f: kh
  },
  /*::[*/
  63: {
    /* n:"BrtCalcChainItem$", */
    f: iu
  },
  /*::[*/
  64: {
    /* n:"BrtDVal", */
    f: rx
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
    f: Ar,
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
    f: Jh
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
    f: ih
  },
  /*::[*/
  148: {
    /* n:"BrtWsDim", */
    f: th,
    p: 16
  },
  /*::[*/
  151: {
    /* n:"BrtPane", */
    f: jh
  },
  /*::[*/
  152: {
    /* n:"BrtSel" */
  },
  /*::[*/
  153: {
    /* n:"BrtWbProp", */
    f: Ex
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
    f: Tx
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
    f: Tc
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
    f: at
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
    f: Hh
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
    f: Jc
  },
  /*::[*/
  336: {
    /* n:"BrtEndEsmdtinfo", */
    T: -1
  },
  /*::[*/
  337: {
    /* n:"BrtBeginEsmdb", */
    f: tu,
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
    f: Zn
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
    f: ac
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
    f: zh
  },
  /*::[*/
  427: {
    /* n:"BrtShrFmla", */
    f: $h
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
    f: Yh
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
    f: ah
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
    f: Gh
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
    f: Zn
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
    f: cu
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
    f: lu
  },
  /*::[*/
  636: {
    /* n:"BrtEndComment", */
    T: -1
  },
  /*::[*/
  637: {
    /* n:"BrtCommentText", */
    f: ho
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
    f: dx
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
    f: tx
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
    i > 0 && u0(r) && e.push(r);
  }
}
function Jx(e, t, r, n) {
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
function Kt(e, t, r) {
  return e || (e = B(7)), e.write_shift(2, t), e.write_shift(2, r), e.write_shift(2, 0), e.write_shift(1, 0), e;
}
function Zx(e, t, r, n) {
  var a = B(9);
  return Kt(a, e, t), Bi(r, n || "b", a), a;
}
function Qx(e, t, r) {
  var n = B(8 + 2 * r.length);
  return Kt(n, e, t), n.write_shift(1, r.length), n.write_shift(r.length, r, "sbcs"), n.l < n.length ? n.slice(0, n.l) : n;
}
function e2(e, t, r, n) {
  if (t.v != null)
    switch (t.t) {
      case "d":
      case "n":
        var a = t.t == "d" ? er(Ze(t.v)) : t.v;
        a == (a | 0) && a >= 0 && a < 65536 ? J(e, 2, dc(r, n, a)) : J(e, 3, xc(r, n, a));
        return;
      case "b":
      case "e":
        J(e, 5, Zx(r, n, t.v, t.t));
        return;
      case "s":
      case "str":
        J(e, 4, Qx(r, n, (t.v || "").slice(0, 255)));
        return;
    }
  J(e, 1, Kt(null, r, n));
}
function r2(e, t, r, n) {
  var a = Array.isArray(t), i = Se(t["!ref"] || "A1"), s, f = "", o = [];
  if (i.e.c > 255 || i.e.r > 16383) {
    if (n.WTF)
      throw new Error("Range " + (t["!ref"] || "A1") + " exceeds format limit A1:IV16384");
    i.e.c = Math.min(i.e.c, 255), i.e.r = Math.min(i.e.c, 16383), s = ke(i);
  }
  for (var l = i.s.r; l <= i.e.r; ++l) {
    f = Xe(l);
    for (var c = i.s.c; c <= i.e.c; ++c) {
      l === i.s.r && (o[c] = $e(c)), s = o[c] + f;
      var x = a ? (t[l] || [])[c] : t[s];
      x && e2(e, x, l, c);
    }
  }
}
function t2(e, t) {
  for (var r = t || {}, n = Qe(), a = 0, i = 0; i < e.SheetNames.length; ++i)
    e.SheetNames[i] == r.sheet && (a = i);
  if (a == 0 && r.sheet && e.SheetNames[0] != r.sheet)
    throw new Error("Sheet not found: " + r.sheet);
  return J(n, r.biff == 4 ? 1033 : r.biff == 3 ? 521 : 9, g0(e, 16, r)), r2(n, e.Sheets[e.SheetNames[a]], a, r), J(n, 10), n.end();
}
function n2(e, t, r) {
  J(e, 49, qo({
    sz: 12,
    color: { theme: 1 },
    name: "Arial",
    family: 2,
    scheme: "minor"
  }, r));
}
function a2(e, t, r) {
  t && [[5, 8], [23, 26], [41, 44], [
    /*63*/
    50,
    /*66],[164,*/
    392
  ]].forEach(function(n) {
    for (var a = n[0]; a <= n[1]; ++a)
      t[a] != null && J(e, 1054, Qo(a, t[a], r));
  });
}
function i2(e, t) {
  var r = B(19);
  r.write_shift(4, 2151), r.write_shift(4, 0), r.write_shift(4, 0), r.write_shift(2, 3), r.write_shift(1, 1), r.write_shift(4, 0), J(e, 2151, r), r = B(39), r.write_shift(4, 2152), r.write_shift(4, 0), r.write_shift(4, 0), r.write_shift(2, 3), r.write_shift(1, 0), r.write_shift(4, 0), r.write_shift(2, 1), r.write_shift(4, 4), r.write_shift(2, 0), Hi(Se(t["!ref"] || "A1"), r), r.write_shift(4, 4), J(e, 2152, r);
}
function s2(e, t) {
  for (var r = 0; r < 16; ++r)
    J(e, 224, ma({ numFmtId: 0, style: !0 }, 0, t));
  t.cellXfs.forEach(function(n) {
    J(e, 224, ma(n, 0, t));
  });
}
function f2(e, t) {
  for (var r = 0; r < t["!links"].length; ++r) {
    var n = t["!links"][r];
    J(e, 440, fc(n)), n[1].Tooltip && J(e, 2048, lc(n));
  }
  delete t["!links"];
}
function l2(e, t) {
  if (t) {
    var r = 0;
    t.forEach(function(n, a) {
      ++r <= 256 && n && J(e, 125, uc(In(a, n), a));
    });
  }
}
function o2(e, t, r, n, a) {
  var i = 16 + Xr(a.cellXfs, t, a);
  if (t.v == null && !t.bf) {
    J(e, 513, Qr(r, n, i));
    return;
  }
  if (t.bf)
    J(e, 6, N1(t, r, n, a, i));
  else
    switch (t.t) {
      case "d":
      case "n":
        var s = t.t == "d" ? er(Ze(t.v)) : t.v;
        J(e, 515, nc(r, n, s, i));
        break;
      case "b":
      case "e":
        J(e, 517, tc(r, n, t.v, i, a, t.t));
        break;
      case "s":
      case "str":
        if (a.bookSST) {
          var f = E0(a.Strings, t.v, a.revStrings);
          J(e, 253, Jo(r, n, f, i));
        } else
          J(e, 516, Zo(r, n, (t.v || "").slice(0, 255), i, a));
        break;
      default:
        J(e, 513, Qr(r, n, i));
    }
}
function c2(e, t, r) {
  var n = Qe(), a = r.SheetNames[e], i = r.Sheets[a] || {}, s = (r || {}).Workbook || {}, f = (s.Sheets || [])[e] || {}, o = Array.isArray(i), l = t.biff == 8, c, x = "", h = [], d = Se(i["!ref"] || "A1"), m = l ? 65536 : 16384;
  if (d.e.c > 255 || d.e.r >= m) {
    if (t.WTF)
      throw new Error("Range " + (i["!ref"] || "A1") + " exceeds format limit A1:IV16384");
    d.e.c = Math.min(d.e.c, 255), d.e.r = Math.min(d.e.c, m - 1);
  }
  J(n, 2057, g0(r, 16, t)), J(n, 13, hr(1)), J(n, 12, hr(100)), J(n, 15, Je(!0)), J(n, 17, Je(!1)), J(n, 16, Zr(1e-3)), J(n, 95, Je(!0)), J(n, 42, Je(!1)), J(n, 43, Je(!1)), J(n, 130, hr(1)), J(n, 128, rc([0, 0])), J(n, 131, Je(!1)), J(n, 132, Je(!1)), l && l2(n, i["!cols"]), J(n, 512, ec(d, t)), l && (i["!links"] = []);
  for (var u = d.s.r; u <= d.e.r; ++u) {
    x = Xe(u);
    for (var g = d.s.c; g <= d.e.c; ++g) {
      u === d.s.r && (h[g] = $e(g)), c = h[g] + x;
      var F = o ? (i[u] || [])[g] : i[c];
      F && (o2(n, F, u, g, t), l && F.l && i["!links"].push([c, F.l]));
    }
  }
  var O = f.CodeName || f.name || a;
  return l && J(n, 574, Yo((s.Views || [])[0])), l && (i["!merges"] || []).length && J(n, 229, sc(i["!merges"])), l && f2(n, i), J(n, 442, Ui(O)), l && i2(n, i), J(
    n,
    10
    /* EOF */
  ), n.end();
}
function u2(e, t, r) {
  var n = Qe(), a = (e || {}).Workbook || {}, i = a.Sheets || [], s = (
    /*::((*/
    a.WBProps || {
      /*::CodeName:"ThisWorkbook"*/
    }
  ), f = r.biff == 8, o = r.biff == 5;
  if (J(n, 2057, g0(e, 5, r)), r.bookType == "xla" && J(
    n,
    135
    /* Addin */
  ), J(n, 225, f ? hr(1200) : null), J(n, 193, Mo(2)), o && J(
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
  ), J(n, 92, jo("SheetJS", r)), J(n, 66, hr(f ? 1200 : 1252)), f && J(n, 353, hr(0)), f && J(
    n,
    448
    /* Excel9File */
  ), J(n, 317, hc(e.SheetNames.length)), f && e.vbaraw && J(
    n,
    211
    /* ObProj */
  ), f && e.vbaraw) {
    var l = s.CodeName || "ThisWorkbook";
    J(n, 442, Ui(l));
  }
  J(n, 156, hr(17)), J(n, 25, Je(!1)), J(n, 18, Je(!1)), J(n, 19, hr(0)), f && J(n, 431, Je(!1)), f && J(n, 444, hr(0)), J(n, 61, Ko()), J(n, 64, Je(!1)), J(n, 141, hr(0)), J(n, 34, Je(vx(e) == "true")), J(n, 14, Je(!0)), f && J(n, 439, Je(!1)), J(n, 218, hr(0)), n2(n, e, r), a2(n, e.SSF, r), s2(n, r), f && J(n, 352, Je(!1));
  var c = n.end(), x = Qe();
  f && J(x, 140, oc()), f && r.Strings && Jx(x, 252, $o(r.Strings)), J(
    x,
    10
    /* EOF */
  );
  var h = x.end(), d = Qe(), m = 0, u = 0;
  for (u = 0; u < e.SheetNames.length; ++u)
    m += (f ? 12 : 11) + (f ? 2 : 1) * e.SheetNames[u].length;
  var g = c.length + m + h.length;
  for (u = 0; u < e.SheetNames.length; ++u) {
    var F = i[u] || {};
    J(d, 133, zo({ pos: g, hs: F.Hidden || 0, dt: 0, name: e.SheetNames[u] }, r)), g += t[u].length;
  }
  var O = d.end();
  if (m != O.length)
    throw new Error("BS8 " + m + " != " + O.length);
  var y = [];
  return c.length && y.push(c), O.length && y.push(O), h.length && y.push(h), Ve(y);
}
function h2(e, t) {
  var r = t || {}, n = [];
  e && !e.SSF && (e.SSF = rr(Oe)), e && e.SSF && (Cn(), yn(e.SSF), r.revssf = On(e.SSF), r.revssf[e.SSF[65535]] = 0, r.ssf = e.SSF), r.Strings = /*::((*/
  [], r.Strings.Count = 0, r.Strings.Unique = 0, S0(r), r.cellXfs = [], Xr(r.cellXfs, {}, { revssf: { General: 0 } }), e.Props || (e.Props = {});
  for (var a = 0; a < e.SheetNames.length; ++a)
    n[n.length] = c2(a, r, e);
  return n.unshift(u2(e, n, r)), Ve(n);
}
function hs(e, t) {
  for (var r = 0; r <= e.SheetNames.length; ++r) {
    var n = e.Sheets[e.SheetNames[r]];
    if (!(!n || !n["!ref"])) {
      var a = fr(n["!ref"]);
      a.e.c > 255 && typeof console < "u" && console.error && console.error("Worksheet '" + e.SheetNames[r] + "' extends beyond column IV (255).  Data may be lost.");
    }
  }
  var i = t || {};
  switch (i.biff || 2) {
    case 8:
    case 5:
      return h2(e, t);
    case 4:
    case 3:
    case 2:
      return t2(e, t);
  }
  throw new Error("invalid type " + i.bookType + " for BIFF");
}
function x2(e, t, r, n) {
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
      var c = _e({ r, c: s }), x = n.dense ? (e[r] || [])[s] : e[c], h = x && x.v != null && (x.h || Gl(x.w || (Nr(x), x.w) || "")) || "", d = {};
      f > 1 && (d.rowspan = f), o > 1 && (d.colspan = o), n.editable ? h = '<span contenteditable="true">' + h + "</span>" : x && (d["data-t"] = x && x.t || "z", x.v != null && (d["data-v"] = x.v), x.z != null && (d["data-z"] = x.z), x.l && (x.l.Target || "#").charAt(0) != "#" && (h = '<a href="' + x.l.Target + '">' + h + "</a>")), d.id = (n.id || "sjs") + "-" + c, i.push(q("td", h, d));
    }
  }
  var m = "<tr>";
  return m + i.join("") + "</tr>";
}
var d2 = '<html><head><meta charset="utf-8"/><title>SheetJS Table Export</title></head><body>', p2 = "</body></html>";
function v2(e, t, r) {
  var n = [];
  return n.join("") + "<table" + (r && r.id ? ' id="' + r.id + '"' : "") + ">";
}
function xs(e, t) {
  var r = t || {}, n = r.header != null ? r.header : d2, a = r.footer != null ? r.footer : p2, i = [n], s = fr(e["!ref"]);
  r.dense = Array.isArray(e), i.push(v2(e, s, r));
  for (var f = s.s.r; f <= s.e.r; ++f)
    i.push(x2(e, s, f, r));
  return i.push("</table>" + a), i.join("");
}
function ds(e, t, r) {
  var n = r || {}, a = 0, i = 0;
  if (n.origin != null)
    if (typeof n.origin == "number")
      a = n.origin;
    else {
      var s = typeof n.origin == "string" ? Be(n.origin) : n.origin;
      a = s.r, i = s.c;
    }
  var f = t.getElementsByTagName("tr"), o = Math.min(n.sheetRows || 1e7, f.length), l = { s: { r: 0, c: 0 }, e: { r: a, c: i } };
  if (e["!ref"]) {
    var c = fr(e["!ref"]);
    l.s.r = Math.min(l.s.r, c.s.r), l.s.c = Math.min(l.s.c, c.s.c), l.e.r = Math.max(l.e.r, c.e.r), l.e.c = Math.max(l.e.c, c.e.c), a == -1 && (l.e.r = a = c.e.r + 1);
  }
  var x = [], h = 0, d = e["!rows"] || (e["!rows"] = []), m = 0, u = 0, g = 0, F = 0, O = 0, y = 0;
  for (e["!cols"] || (e["!cols"] = []); m < f.length && u < o; ++m) {
    var L = f[m];
    if (Fa(L)) {
      if (n.display)
        continue;
      d[u] = { hidden: !0 };
    }
    var z = L.children;
    for (g = F = 0; g < z.length; ++g) {
      var ee = z[g];
      if (!(n.display && Fa(ee))) {
        var D = ee.hasAttribute("data-v") ? ee.getAttribute("data-v") : ee.hasAttribute("v") ? ee.getAttribute("v") : $l(ee.innerHTML), U = ee.getAttribute("data-z") || ee.getAttribute("z");
        for (h = 0; h < x.length; ++h) {
          var M = x[h];
          M.s.c == F + i && M.s.r < u + a && u + a <= M.e.r && (F = M.e.c + 1 - i, h = -1);
        }
        y = +ee.getAttribute("colspan") || 1, ((O = +ee.getAttribute("rowspan") || 1) > 1 || y > 1) && x.push({ s: { r: u + a, c: F + i }, e: { r: u + a + (O || 1) - 1, c: F + i + (y || 1) - 1 } });
        var V = { t: "s", v: D }, G = ee.getAttribute("data-t") || ee.getAttribute("t") || "";
        D != null && (D.length == 0 ? V.t = G || "z" : n.raw || D.trim().length == 0 || G == "s" || (D === "TRUE" ? V = { t: "b", v: !0 } : D === "FALSE" ? V = { t: "b", v: !1 } : isNaN(Rr(D)) ? isNaN(bt(D).getDate()) || (V = { t: "d", v: Ze(D) }, n.cellDates || (V = { t: "n", v: er(V.v) }), V.z = n.dateNF || Oe[14]) : V = { t: "n", v: Rr(D) })), V.z === void 0 && U != null && (V.z = U);
        var K = "", te = ee.getElementsByTagName("A");
        if (te && te.length)
          for (var Te = 0; Te < te.length && !(te[Te].hasAttribute("href") && (K = te[Te].getAttribute("href"), K.charAt(0) != "#")); ++Te)
            ;
        K && K.charAt(0) != "#" && (V.l = { Target: K }), n.dense ? (e[u + a] || (e[u + a] = []), e[u + a][F + i] = V) : e[_e({ c: F + i, r: u + a })] = V, l.e.c < F + i && (l.e.c = F + i), F += y;
      }
    }
    ++u;
  }
  return x.length && (e["!merges"] = (e["!merges"] || []).concat(x)), l.e.r = Math.max(l.e.r, u - 1 + a), e["!ref"] = ke(l), u >= o && (e["!fullref"] = ke((l.e.r = f.length - m + u - 1 + a, l))), e;
}
function ps(e, t) {
  var r = t || {}, n = r.dense ? [] : {};
  return ds(n, e, t);
}
function g2(e, t) {
  return et(ps(e, t), t);
}
function Fa(e) {
  var t = "", r = m2(e);
  return r && (t = r(e).getPropertyValue("display")), t || (t = e.style && e.style.display), t === "none";
}
function m2(e) {
  return e.ownerDocument.defaultView && typeof e.ownerDocument.defaultView.getComputedStyle == "function" ? e.ownerDocument.defaultView.getComputedStyle : typeof getComputedStyle == "function" ? getComputedStyle : null;
}
var _2 = /* @__PURE__ */ function() {
  var e = [
    "<office:master-styles>",
    '<style:master-page style:name="mp1" style:page-layout-name="mp1">',
    "<style:header/>",
    '<style:header-left style:display="false"/>',
    "<style:footer/>",
    '<style:footer-left style:display="false"/>',
    "</style:master-page>",
    "</office:master-styles>"
  ].join(""), t = "<office:document-styles " + Ut({
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
}(), ya = /* @__PURE__ */ function() {
  var e = function(i) {
    return me(i).replace(/  +/g, function(s) {
      return '<text:s text:c="' + s.length + '"/>';
    }).replace(/\t/g, "<text:tab/>").replace(/\n/g, "</text:p><text:p>").replace(/^ /, "<text:s/>").replace(/ $/, "<text:s/>");
  }, t = `          <table:table-cell />
`, r = `          <table:covered-table-cell/>
`, n = function(i, s, f) {
    var o = [];
    o.push('      <table:table table:name="' + me(s.SheetNames[f]) + `" table:style-name="ta1">
`);
    var l = 0, c = 0, x = fr(i["!ref"] || "A1"), h = i["!merges"] || [], d = 0, m = Array.isArray(i);
    if (i["!cols"])
      for (c = 0; c <= x.e.c; ++c)
        o.push("        <table:table-column" + (i["!cols"][c] ? ' table:style-name="co' + i["!cols"][c].ods + '"' : "") + `></table:table-column>
`);
    var u = "", g = i["!rows"] || [];
    for (l = 0; l < x.s.r; ++l)
      u = g[l] ? ' table:style-name="ro' + g[l].ods + '"' : "", o.push("        <table:table-row" + u + `></table:table-row>
`);
    for (; l <= x.e.r; ++l) {
      for (u = g[l] ? ' table:style-name="ro' + g[l].ods + '"' : "", o.push("        <table:table-row" + u + `>
`), c = 0; c < x.s.c; ++c)
        o.push(t);
      for (; c <= x.e.c; ++c) {
        var F = !1, O = {}, y = "";
        for (d = 0; d != h.length; ++d)
          if (!(h[d].s.c > c) && !(h[d].s.r > l) && !(h[d].e.c < c) && !(h[d].e.r < l)) {
            (h[d].s.c != c || h[d].s.r != l) && (F = !0), O["table:number-columns-spanned"] = h[d].e.c - h[d].s.c + 1, O["table:number-rows-spanned"] = h[d].e.r - h[d].s.r + 1;
            break;
          }
        if (F) {
          o.push(r);
          continue;
        }
        var L = _e({ r: l, c }), z = m ? (i[l] || [])[c] : i[L];
        if (z && z.f && (O["table:formula"] = me(U1(z.f)), z.F && z.F.slice(0, L.length) == L)) {
          var ee = fr(z.F);
          O["table:number-matrix-columns-spanned"] = ee.e.c - ee.s.c + 1, O["table:number-matrix-rows-spanned"] = ee.e.r - ee.s.r + 1;
        }
        if (!z) {
          o.push(t);
          continue;
        }
        switch (z.t) {
          case "b":
            y = z.v ? "TRUE" : "FALSE", O["office:value-type"] = "boolean", O["office:boolean-value"] = z.v ? "true" : "false";
            break;
          case "n":
            y = z.w || String(z.v || 0), O["office:value-type"] = "float", O["office:value"] = z.v || 0;
            break;
          case "s":
          case "str":
            y = z.v == null ? "" : z.v, O["office:value-type"] = "string";
            break;
          case "d":
            y = z.w || Ze(z.v).toISOString(), O["office:value-type"] = "date", O["office:date-value"] = Ze(z.v).toISOString(), O["table:style-name"] = "ce1";
            break;
          default:
            o.push(t);
            continue;
        }
        var D = e(y);
        if (z.l && z.l.Target) {
          var U = z.l.Target;
          U = U.charAt(0) == "#" ? "#" + H1(U.slice(1)) : U, U.charAt(0) != "#" && !U.match(/^\w+:/) && (U = "../" + U), D = q("text:a", D, { "xlink:href": U.replace(/&/g, "&amp;") });
        }
        o.push("          " + q("table:table-cell", q("text:p", D, {}), O) + `
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
            var x = l["!cols"][c];
            if (x.width == null && x.wpx == null && x.wch == null)
              continue;
            m0(x), x.ods = f;
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
            var x = l["!rows"][c].hpx + "px";
            i.push('  <style:style style:name="ro' + o + `" style:family="table-row">
`), i.push('   <style:table-row-properties fo:break-before="auto" style:row-height="' + x + `"/>
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
    var o = [Ie], l = Ut({
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
    }), c = Ut({
      "xmlns:config": "urn:oasis:names:tc:opendocument:xmlns:config:1.0",
      "office:mimetype": "application/vnd.oasis.opendocument.spreadsheet"
    });
    f.bookType == "fods" ? (o.push("<office:document" + l + c + `>
`), o.push(Ri().replace(/office:document-meta/g, "office:meta"))) : o.push("<office:document-content" + l + `>
`), a(o, s), o.push(`  <office:body>
`), o.push(`    <office:spreadsheet>
`);
    for (var x = 0; x != s.SheetNames.length; ++x)
      o.push(n(s.Sheets[s.SheetNames[x]], s, x));
    return o.push(`    </office:spreadsheet>
`), o.push(`  </office:body>
`), f.bookType == "fods" ? o.push("</office:document>") : o.push("</office:document-content>"), o.join("");
  };
}();
function vs(e, t) {
  if (t.bookType == "fods")
    return ya(e, t);
  var r = f0(), n = "", a = [], i = [];
  return n = "mimetype", ce(r, n, "application/vnd.oasis.opendocument.spreadsheet"), n = "content.xml", ce(r, n, ya(e, t)), a.push([n, "text/xml"]), i.push([n, "ContentFile"]), n = "styles.xml", ce(r, n, _2(e, t)), a.push([n, "text/xml"]), i.push([n, "StylesFile"]), n = "meta.xml", ce(r, n, Ie + Ri(
    /*::wb, opts*/
  )), a.push([n, "text/xml"]), i.push([n, "MetadataFile"]), n = "manifest.rdf", ce(r, n, ko(
    i
    /*, opts*/
  )), a.push([n, "application/rdf+xml"]), n = "META-INF/manifest.xml", ce(r, n, Do(
    a
    /*, opts*/
  )), r;
}
/*! sheetjs (C) 2013-present SheetJS -- http://sheetjs.com */
function En(e) {
  return new DataView(e.buffer, e.byteOffset, e.byteLength);
}
function T2(e) {
  return typeof TextEncoder < "u" ? new TextEncoder().encode(e) : gr(Or(e));
}
function w2(e, t) {
  e:
    for (var r = 0; r <= e.length - t.length; ++r) {
      for (var n = 0; n < t.length; ++n)
        if (e[r + n] != t[n])
          continue e;
      return !0;
    }
  return !1;
}
function Gr(e) {
  var t = e.reduce(function(a, i) {
    return a + i.length;
  }, 0), r = new Uint8Array(t), n = 0;
  return e.forEach(function(a) {
    r.set(a, n), n += a.length;
  }), r;
}
function E2(e, t, r) {
  var n = Math.floor(r == 0 ? 0 : Math.LOG10E * Math.log(Math.abs(r))) + 6176 - 20, a = r / Math.pow(10, n - 6176);
  e[t + 15] |= n >> 7, e[t + 14] |= (n & 127) << 1;
  for (var i = 0; a >= 1; ++i, a /= 256)
    e[t + i] = a & 255;
  e[t + 15] |= r >= 0 ? 0 : 128;
}
function Ht(e, t) {
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
function dt(e) {
  var t = 0, r = e[t] & 127;
  e:
    if (e[t++] >= 128) {
      if (r |= (e[t] & 127) << 7, e[t++] < 128 || (r |= (e[t] & 127) << 14, e[t++] < 128) || (r |= (e[t] & 127) << 21, e[t++] < 128))
        break e;
      r |= (e[t] & 127) << 28;
    }
  return r;
}
function Ne(e) {
  for (var t = [], r = [0]; r[0] < e.length; ) {
    var n = r[0], a = Ht(e, r), i = a & 7;
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
        s = Ht(e, r), f = e.slice(r[0], r[0] + s), r[0] += s;
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
      a.data && (t.push(ve(n * 8 + a.type)), a.type == 2 && t.push(ve(a.data.length)), t.push(a.data));
    });
  }), Gr(t);
}
function pr(e) {
  for (var t, r = [], n = [0]; n[0] < e.length; ) {
    var a = Ht(e, n), i = Ne(e.slice(n[0], n[0] + a));
    n[0] += a;
    var s = {
      id: dt(i[1][0].data),
      messages: []
    };
    i[2].forEach(function(f) {
      var o = Ne(f.data), l = dt(o[3][0].data);
      s.messages.push({
        meta: o,
        data: e.slice(n[0], n[0] + l)
      }), n[0] += l;
    }), (t = i[3]) != null && t[0] && (s.merge = dt(i[3][0].data) >>> 0 > 0), r.push(s);
  }
  return r;
}
function ft(e) {
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
  }), Gr(t);
}
function S2(e, t) {
  if (e != 0)
    throw new Error("Unexpected Snappy chunk type ".concat(e));
  for (var r = [0], n = Ht(t, r), a = []; r[0] < t.length; ) {
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
      if (i == 1 ? (l = (t[r[0]] >> 2 & 7) + 4, o = (t[r[0]++] & 224) << 3, o |= t[r[0]++]) : (l = (t[r[0]++] >> 2) + 1, i == 2 ? (o = t[r[0]] | t[r[0] + 1] << 8, r[0] += 2) : (o = (t[r[0]] | t[r[0] + 1] << 8 | t[r[0] + 2] << 16 | t[r[0] + 3] << 24) >>> 0, r[0] += 4)), a = [Gr(a)], o == 0)
        throw new Error("Invalid offset 0");
      if (o > a[0].length)
        throw new Error("Invalid offset beyond length");
      if (l >= o)
        for (a.push(a[0].slice(-o)), l -= o; l >= a[a.length - 1].length; )
          a.push(a[a.length - 1]), l -= a[a.length - 1].length;
      a.push(a[0].slice(-o, -o + l));
    }
  }
  var c = Gr(a);
  if (c.length != n)
    throw new Error("Unexpected length: ".concat(c.length, " != ").concat(n));
  return c;
}
function vr(e) {
  for (var t = [], r = 0; r < e.length; ) {
    var n = e[r++], a = e[r] | e[r + 1] << 8 | e[r + 2] << 16;
    r += 3, t.push(S2(n, e.slice(r, r + a))), r += a;
  }
  if (r !== e.length)
    throw new Error("data is not a valid framed stream!");
  return Gr(t);
}
function lt(e) {
  for (var t = [], r = 0; r < e.length; ) {
    var n = Math.min(e.length - r, 268435455), a = new Uint8Array(4);
    t.push(a);
    var i = ve(n), s = i.length;
    t.push(i), n <= 60 ? (s++, t.push(new Uint8Array([n - 1 << 2]))) : n <= 256 ? (s += 2, t.push(new Uint8Array([240, n - 1 & 255]))) : n <= 65536 ? (s += 3, t.push(new Uint8Array([244, n - 1 & 255, n - 1 >> 8 & 255]))) : n <= 16777216 ? (s += 4, t.push(new Uint8Array([248, n - 1 & 255, n - 1 >> 8 & 255, n - 1 >> 16 & 255]))) : n <= 4294967296 && (s += 5, t.push(new Uint8Array([252, n - 1 & 255, n - 1 >> 8 & 255, n - 1 >> 16 & 255, n - 1 >>> 24 & 255]))), t.push(e.slice(r, r + n)), s += n, a[0] = 0, a[1] = s & 255, a[2] = s >> 8 & 255, a[3] = s >> 16 & 255, r += n;
  }
  return Gr(t);
}
function zn(e, t) {
  var r = new Uint8Array(32), n = En(r), a = 12, i = 0;
  switch (r[0] = 5, e.t) {
    case "n":
      r[1] = 2, E2(r, a, e.v), i |= 1, a += 16;
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
function $n(e, t) {
  var r = new Uint8Array(32), n = En(r), a = 12, i = 0;
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
function Lr(e) {
  var t = Ne(e);
  return Ht(t[1][0].data);
}
function A2(e, t, r) {
  var n, a, i, s;
  if (!((n = e[6]) != null && n[0]) || !((a = e[7]) != null && a[0]))
    throw "Mutation only works on post-BNC storages!";
  var f = ((s = (i = e[8]) == null ? void 0 : i[0]) == null ? void 0 : s.data) && dt(e[8][0].data) > 0 || !1;
  if (f)
    throw "Math only works with normal offsets";
  for (var o = 0, l = En(e[7][0].data), c = 0, x = [], h = En(e[4][0].data), d = 0, m = [], u = 0; u < t.length; ++u) {
    if (t[u] == null) {
      l.setUint16(u * 2, 65535, !0), h.setUint16(u * 2, 65535);
      continue;
    }
    l.setUint16(u * 2, c, !0), h.setUint16(u * 2, d, !0);
    var g, F;
    switch (typeof t[u]) {
      case "string":
        g = zn({ t: "s", v: t[u] }, r), F = $n({ t: "s", v: t[u] }, r);
        break;
      case "number":
        g = zn({ t: "n", v: t[u] }, r), F = $n({ t: "n", v: t[u] }, r);
        break;
      case "boolean":
        g = zn({ t: "b", v: t[u] }, r), F = $n({ t: "b", v: t[u] }, r);
        break;
      default:
        throw new Error("Unsupported value " + t[u]);
    }
    x.push(g), c += g.length, m.push(F), d += F.length, ++o;
  }
  for (e[2][0].data = ve(o); u < e[7][0].data.length / 2; ++u)
    l.setUint16(u * 2, 65535, !0), h.setUint16(u * 2, 65535, !0);
  return e[6][0].data = Gr(x), e[3][0].data = Gr(m), o;
}
function F2(e, t) {
  if (!t || !t.numbers)
    throw new Error("Must pass a `numbers` option -- check the README");
  var r = e.Sheets[e.SheetNames[0]];
  e.SheetNames.length > 1 && console.error("The Numbers writer currently writes only the first table");
  var n = fr(r["!ref"]);
  n.s.r = n.s.c = 0;
  var a = !1;
  n.e.c > 9 && (a = !0, n.e.c = 9), n.e.r > 49 && (a = !0, n.e.r = 49), a && console.error("The Numbers writer is currently limited to ".concat(ke(n)));
  var i = Sn(r, { range: n, header: 1 }), s = ["~Sh33tJ5~"];
  i.forEach(function(P) {
    return P.forEach(function(C) {
      typeof C == "string" && s.push(C);
    });
  });
  var f = {}, o = [], l = we.read(t.numbers, { type: "base64" });
  l.FileIndex.map(function(P, C) {
    return [P, l.FullPaths[C]];
  }).forEach(function(P) {
    var C = P[0], A = P[1];
    if (C.type == 2 && C.name.match(/\.iwa/)) {
      var W = C.content, se = vr(W), fe = pr(se);
      fe.forEach(function(ie) {
        o.push(ie.id), f[ie.id] = { deps: [], location: A, type: dt(ie.messages[0].meta[1][0].data) };
      });
    }
  }), o.sort(function(P, C) {
    return P - C;
  });
  var c = o.filter(function(P) {
    return P > 1;
  }).map(function(P) {
    return [P, ve(P)];
  });
  l.FileIndex.map(function(P, C) {
    return [P, l.FullPaths[C]];
  }).forEach(function(P) {
    var C = P[0];
    if (P[1], !!C.name.match(/\.iwa/)) {
      var A = pr(vr(C.content));
      A.forEach(function(W) {
        W.messages.forEach(function(se) {
          c.forEach(function(fe) {
            W.messages.some(function(ie) {
              return dt(ie.meta[1][0].data) != 11006 && w2(ie.data, fe[1]);
            }) && f[fe[0]].deps.push(W.id);
          });
        });
      });
    }
  });
  for (var x = we.find(l, f[1].location), h = pr(vr(x.content)), d, m = 0; m < h.length; ++m) {
    var u = h[m];
    u.id == 1 && (d = u);
  }
  var g = Lr(Ne(d.messages[0].data)[1][0].data);
  for (x = we.find(l, f[g].location), h = pr(vr(x.content)), m = 0; m < h.length; ++m)
    u = h[m], u.id == g && (d = u);
  for (g = Lr(Ne(d.messages[0].data)[2][0].data), x = we.find(l, f[g].location), h = pr(vr(x.content)), m = 0; m < h.length; ++m)
    u = h[m], u.id == g && (d = u);
  for (g = Lr(Ne(d.messages[0].data)[2][0].data), x = we.find(l, f[g].location), h = pr(vr(x.content)), m = 0; m < h.length; ++m)
    u = h[m], u.id == g && (d = u);
  var F = Ne(d.messages[0].data);
  {
    F[6][0].data = ve(n.e.r + 1), F[7][0].data = ve(n.e.c + 1);
    var O = Lr(F[46][0].data), y = we.find(l, f[O].location), L = pr(vr(y.content));
    {
      for (var z = 0; z < L.length && L[z].id != O; ++z)
        ;
      if (L[z].id != O)
        throw "Bad ColumnRowUIDMapArchive";
      var ee = Ne(L[z].messages[0].data);
      ee[1] = [], ee[2] = [], ee[3] = [];
      for (var D = 0; D <= n.e.c; ++D) {
        var U = [];
        U[1] = U[2] = [{ type: 0, data: ve(D + 420690) }], ee[1].push({ type: 2, data: He(U) }), ee[2].push({ type: 0, data: ve(D) }), ee[3].push({ type: 0, data: ve(D) });
      }
      ee[4] = [], ee[5] = [], ee[6] = [];
      for (var M = 0; M <= n.e.r; ++M)
        U = [], U[1] = U[2] = [{ type: 0, data: ve(M + 726270) }], ee[4].push({ type: 2, data: He(U) }), ee[5].push({ type: 0, data: ve(M) }), ee[6].push({ type: 0, data: ve(M) });
      L[z].messages[0].data = He(ee);
    }
    y.content = lt(ft(L)), y.size = y.content.length, delete F[46];
    var V = Ne(F[4][0].data);
    {
      V[7][0].data = ve(n.e.r + 1);
      var G = Ne(V[1][0].data), K = Lr(G[2][0].data);
      y = we.find(l, f[K].location), L = pr(vr(y.content));
      {
        if (L[0].id != K)
          throw "Bad HeaderStorageBucket";
        var te = Ne(L[0].messages[0].data);
        for (M = 0; M < i.length; ++M) {
          var Te = Ne(te[2][0].data);
          Te[1][0].data = ve(M), Te[4][0].data = ve(i[M].length), te[2][M] = { type: te[2][0].type, data: He(Te) };
        }
        L[0].messages[0].data = He(te);
      }
      y.content = lt(ft(L)), y.size = y.content.length;
      var oe = Lr(V[2][0].data);
      y = we.find(l, f[oe].location), L = pr(vr(y.content));
      {
        if (L[0].id != oe)
          throw "Bad HeaderStorageBucket";
        for (te = Ne(L[0].messages[0].data), D = 0; D <= n.e.c; ++D)
          Te = Ne(te[2][0].data), Te[1][0].data = ve(D), Te[4][0].data = ve(n.e.r + 1), te[2][D] = { type: te[2][0].type, data: He(Te) };
        L[0].messages[0].data = He(te);
      }
      y.content = lt(ft(L)), y.size = y.content.length;
      var Ue = Lr(V[4][0].data);
      (function() {
        for (var P = we.find(l, f[Ue].location), C = pr(vr(P.content)), A, W = 0; W < C.length; ++W) {
          var se = C[W];
          se.id == Ue && (A = se);
        }
        var fe = Ne(A.messages[0].data);
        {
          fe[3] = [];
          var ie = [];
          s.forEach(function(he, Ye) {
            ie[1] = [{ type: 0, data: ve(Ye) }], ie[2] = [{ type: 0, data: ve(1) }], ie[3] = [{ type: 2, data: T2(he) }], fe[3].push({ type: 2, data: He(ie) });
          });
        }
        A.messages[0].data = He(fe);
        var Q = ft(C), Ee = lt(Q);
        P.content = Ee, P.size = P.content.length;
      })();
      var De = Ne(V[3][0].data);
      {
        var dr = De[1][0];
        delete De[2];
        var Pe = Ne(dr.data);
        {
          var or = Lr(Pe[2][0].data);
          (function() {
            for (var P = we.find(l, f[or].location), C = pr(vr(P.content)), A, W = 0; W < C.length; ++W) {
              var se = C[W];
              se.id == or && (A = se);
            }
            var fe = Ne(A.messages[0].data);
            {
              delete fe[6], delete De[7];
              var ie = new Uint8Array(fe[5][0].data);
              fe[5] = [];
              for (var Q = 0, Ee = 0; Ee <= n.e.r; ++Ee) {
                var he = Ne(ie);
                Q += A2(he, i[Ee], s), he[1][0].data = ve(Ee), fe[5].push({ data: He(he), type: 2 });
              }
              fe[1] = [{ type: 0, data: ve(n.e.c + 1) }], fe[2] = [{ type: 0, data: ve(n.e.r + 1) }], fe[3] = [{ type: 0, data: ve(Q) }], fe[4] = [{ type: 0, data: ve(n.e.r + 1) }];
            }
            A.messages[0].data = He(fe);
            var Ye = ft(C), pe = lt(Ye);
            P.content = pe, P.size = P.content.length;
          })();
        }
        dr.data = He(Pe);
      }
      V[3][0].data = He(De);
    }
    F[4][0].data = He(V);
  }
  d.messages[0].data = He(F);
  var tr = ft(h), S = lt(tr);
  return x.content = S, x.size = x.content.length, l;
}
function y2(e) {
  return function(r) {
    for (var n = 0; n != e.length; ++n) {
      var a = e[n];
      r[a[0]] === void 0 && (r[a[0]] = a[1]), a[2] === "n" && (r[a[0]] = Number(r[a[0]]));
    }
  };
}
function S0(e) {
  y2([
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
function C2(e, t) {
  return t.bookType == "ods" ? vs(e, t) : t.bookType == "numbers" ? F2(e, t) : t.bookType == "xlsb" ? O2(e, t) : D2(e, t);
}
function O2(e, t) {
  ct = 1024, e && !e.SSF && (e.SSF = rr(Oe)), e && e.SSF && (Cn(), yn(e.SSF), t.revssf = On(e.SSF), t.revssf[e.SSF[65535]] = 0, t.ssf = e.SSF), t.rels = {}, t.wbrels = {}, t.Strings = /*::((*/
  [], t.Strings.Count = 0, t.Strings.Unique = 0, Pt ? t.revStrings = /* @__PURE__ */ new Map() : (t.revStrings = {}, t.revStrings.foo = [], delete t.revStrings.foo);
  var r = t.bookType == "xlsb" ? "bin" : "xml", n = Zi.indexOf(t.bookType) > -1, a = Ci();
  S0(t = t || {});
  var i = f0(), s = "", f = 0;
  if (t.cellXfs = [], Xr(t.cellXfs, {}, { revssf: { General: 0 } }), e.Props || (e.Props = {}), s = "docProps/core.xml", ce(i, s, ki(e.Props, t)), a.coreprops.push(s), ge(t.rels, 2, s, xe.CORE_PROPS), s = "docProps/app.xml", !(e.Props && e.Props.SheetNames))
    if (!e.Workbook || !e.Workbook.Sheets)
      e.Props.SheetNames = e.SheetNames;
    else {
      for (var o = [], l = 0; l < e.SheetNames.length; ++l)
        (e.Workbook.Sheets[l] || {}).Hidden != 2 && o.push(e.SheetNames[l]);
      e.Props.SheetNames = o;
    }
  for (e.Props.Worksheets = e.Props.SheetNames.length, ce(i, s, Ni(e.Props)), a.extprops.push(s), ge(t.rels, 3, s, xe.EXT_PROPS), e.Custprops !== e.Props && je(e.Custprops || {}).length > 0 && (s = "docProps/custom.xml", ce(i, s, Pi(e.Custprops)), a.custprops.push(s), ge(t.rels, 4, s, xe.CUST_PROPS)), f = 1; f <= e.SheetNames.length; ++f) {
    var c = { "!id": {} }, x = e.Sheets[e.SheetNames[f - 1]], h = (x || {})["!type"] || "sheet";
    switch (h) {
      case "chart":
      default:
        s = "xl/worksheets/sheet" + f + "." + r, ce(i, s, kx(f - 1, s, t, e, c)), a.sheets.push(s), ge(t.wbrels, -1, "worksheets/sheet" + f + "." + r, xe.WS[0]);
    }
    if (x) {
      var d = x["!comments"], m = !1, u = "";
      d && d.length > 0 && (u = "xl/comments" + f + "." + r, ce(i, u, Px(d, u)), a.comments.push(u), ge(c, -1, "../comments" + f + "." + r, xe.CMNT), m = !0), x["!legacy"] && m && ce(i, "xl/drawings/vmlDrawing" + f + ".vml", qi(f, x["!comments"])), delete x["!comments"], delete x["!legacy"];
    }
    c["!id"].rId1 && ce(i, Di(s), ht(c));
  }
  return t.Strings != null && t.Strings.length > 0 && (s = "xl/sharedStrings." + r, ce(i, s, Nx(t.Strings, s, t)), a.strs.push(s), ge(t.wbrels, -1, "sharedStrings." + r, xe.SST)), s = "xl/workbook." + r, ce(i, s, Rx(e, s)), a.workbooks.push(s), ge(t.rels, 1, s, xe.WB), s = "xl/theme/theme1.xml", ce(i, s, Ki(e.Themes, t)), a.themes.push(s), ge(t.wbrels, -1, "theme/theme1.xml", xe.THEME), s = "xl/styles." + r, ce(i, s, Ix(e, s, t)), a.styles.push(s), ge(t.wbrels, -1, "styles." + r, xe.STY), e.vbaraw && n && (s = "xl/vbaProject.bin", ce(i, s, e.vbaraw), a.vba.push(s), ge(t.wbrels, -1, "vbaProject.bin", xe.VBA)), s = "xl/metadata." + r, ce(i, s, Lx(s)), a.metadata.push(s), ge(t.wbrels, -1, "metadata." + r, xe.XLMETA), ce(i, "[Content_Types].xml", Oi(a, t)), ce(i, "_rels/.rels", ht(t.rels)), ce(i, "xl/_rels/workbook." + r + ".rels", ht(t.wbrels)), delete t.revssf, delete t.ssf, i;
}
function D2(e, t) {
  ct = 1024, e && !e.SSF && (e.SSF = rr(Oe)), e && e.SSF && (Cn(), yn(e.SSF), t.revssf = On(e.SSF), t.revssf[e.SSF[65535]] = 0, t.ssf = e.SSF), t.rels = {}, t.wbrels = {}, t.Strings = /*::((*/
  [], t.Strings.Count = 0, t.Strings.Unique = 0, Pt ? t.revStrings = /* @__PURE__ */ new Map() : (t.revStrings = {}, t.revStrings.foo = [], delete t.revStrings.foo);
  var r = "xml", n = Zi.indexOf(t.bookType) > -1, a = Ci();
  S0(t = t || {});
  var i = f0(), s = "", f = 0;
  if (t.cellXfs = [], Xr(t.cellXfs, {}, { revssf: { General: 0 } }), e.Props || (e.Props = {}), s = "docProps/core.xml", ce(i, s, ki(e.Props, t)), a.coreprops.push(s), ge(t.rels, 2, s, xe.CORE_PROPS), s = "docProps/app.xml", !(e.Props && e.Props.SheetNames))
    if (!e.Workbook || !e.Workbook.Sheets)
      e.Props.SheetNames = e.SheetNames;
    else {
      for (var o = [], l = 0; l < e.SheetNames.length; ++l)
        (e.Workbook.Sheets[l] || {}).Hidden != 2 && o.push(e.SheetNames[l]);
      e.Props.SheetNames = o;
    }
  e.Props.Worksheets = e.Props.SheetNames.length, ce(i, s, Ni(e.Props)), a.extprops.push(s), ge(t.rels, 3, s, xe.EXT_PROPS), e.Custprops !== e.Props && je(e.Custprops || {}).length > 0 && (s = "docProps/custom.xml", ce(i, s, Pi(e.Custprops)), a.custprops.push(s), ge(t.rels, 4, s, xe.CUST_PROPS));
  var c = ["SheetJ5"];
  for (t.tcid = 0, f = 1; f <= e.SheetNames.length; ++f) {
    var x = { "!id": {} }, h = e.Sheets[e.SheetNames[f - 1]], d = (h || {})["!type"] || "sheet";
    switch (d) {
      case "chart":
      default:
        s = "xl/worksheets/sheet" + f + "." + r, ce(i, s, fs(f - 1, t, e, x)), a.sheets.push(s), ge(t.wbrels, -1, "worksheets/sheet" + f + "." + r, xe.WS[0]);
    }
    if (h) {
      var m = h["!comments"], u = !1, g = "";
      if (m && m.length > 0) {
        var F = !1;
        m.forEach(function(O) {
          O[1].forEach(function(y) {
            y.T == !0 && (F = !0);
          });
        }), F && (g = "xl/threadedComments/threadedComment" + f + "." + r, ce(i, g, su(m, c, t)), a.threadedcomments.push(g), ge(x, -1, "../threadedComments/threadedComment" + f + "." + r, xe.TCMNT)), g = "xl/comments" + f + "." + r, ce(i, g, Ji(m)), a.comments.push(g), ge(x, -1, "../comments" + f + "." + r, xe.CMNT), u = !0;
      }
      h["!legacy"] && u && ce(i, "xl/drawings/vmlDrawing" + f + ".vml", qi(f, h["!comments"])), delete h["!comments"], delete h["!legacy"];
    }
    x["!id"].rId1 && ce(i, Di(s), ht(x));
  }
  return t.Strings != null && t.Strings.length > 0 && (s = "xl/sharedStrings." + r, ce(i, s, Vi(t.Strings, t)), a.strs.push(s), ge(t.wbrels, -1, "sharedStrings." + r, xe.SST)), s = "xl/workbook." + r, ce(i, s, cs(e)), a.workbooks.push(s), ge(t.rels, 1, s, xe.WB), s = "xl/theme/theme1.xml", ce(i, s, Ki(e.Themes, t)), a.themes.push(s), ge(t.wbrels, -1, "theme/theme1.xml", xe.THEME), s = "xl/styles." + r, ce(i, s, zi(e, t)), a.styles.push(s), ge(t.wbrels, -1, "styles." + r, xe.STY), e.vbaraw && n && (s = "xl/vbaProject.bin", ce(i, s, e.vbaraw), a.vba.push(s), ge(t.wbrels, -1, "vbaProject.bin", xe.VBA)), s = "xl/metadata." + r, ce(i, s, Yi()), a.metadata.push(s), ge(t.wbrels, -1, "metadata." + r, xe.XLMETA), c.length > 1 && (s = "xl/persons/person.xml", ce(i, s, fu(c)), a.people.push(s), ge(t.wbrels, -1, "persons/person.xml", xe.PEOPLE)), ce(i, "[Content_Types].xml", Oi(a, t)), ce(i, "_rels/.rels", ht(t.rels)), ce(i, "xl/_rels/workbook." + r + ".rels", ht(t.wbrels)), delete t.revssf, delete t.ssf, i;
}
function R2(e, t) {
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
function gs(e, t) {
  switch (t.type) {
    case "base64":
    case "binary":
      break;
    case "buffer":
    case "array":
      t.type = "";
      break;
    case "file":
      return Xt(t.file, we.write(e, { type: de ? "buffer" : "" }));
    case "string":
      throw new Error("'string' output type invalid for '" + t.bookType + "' files");
    default:
      throw new Error("Unrecognized type " + t.type);
  }
  return we.write(e, t);
}
function k2(e, t) {
  var r = rr(t || {}), n = C2(e, r);
  return I2(n, r);
}
function I2(e, t) {
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
  var a = e.FullPaths ? we.write(e, { fileType: "zip", type: (
    /*::(*/
    { nodebuffer: "buffer", string: "binary" }[r.type] || r.type
  ), compression: !!t.compression }) : e.generate(r);
  if (typeof Deno < "u" && typeof a == "string") {
    if (t.type == "binary" || t.type == "base64")
      return a;
    a = new Uint8Array(Fn(a));
  }
  return t.password && typeof encrypt_agile < "u" ? gs(encrypt_agile(a, t.password), t) : t.type === "file" ? Xt(t.file, a) : t.type == "string" ? Rt(
    /*::(*/
    a
    /*:: :any)*/
  ) : a;
}
function N2(e, t) {
  var r = t || {}, n = Yx(e, r);
  return gs(n, r);
}
function Sr(e, t, r) {
  r || (r = "");
  var n = r + e;
  switch (t.type) {
    case "base64":
      return Bt(Or(n));
    case "binary":
      return Or(n);
    case "string":
      return e;
    case "file":
      return Xt(t.file, n, "utf8");
    case "buffer":
      return de ? Pr(n, "utf8") : typeof TextEncoder < "u" ? new TextEncoder().encode(n) : Sr(n, { type: "binary" }).split("").map(function(a) {
        return a.charCodeAt(0);
      });
  }
  throw new Error("Unrecognized type " + t.type);
}
function P2(e, t) {
  switch (t.type) {
    case "base64":
      return Bt(e);
    case "binary":
      return e;
    case "string":
      return e;
    case "file":
      return Xt(t.file, e, "binary");
    case "buffer":
      return de ? Pr(e, "binary") : e.split("").map(function(r) {
        return r.charCodeAt(0);
      });
  }
  throw new Error("Unrecognized type " + t.type);
}
function an(e, t) {
  switch (t.type) {
    case "string":
    case "base64":
    case "binary":
      for (var r = "", n = 0; n < e.length; ++n)
        r += String.fromCharCode(e[n]);
      return t.type == "base64" ? Bt(r) : t.type == "string" ? Rt(r) : r;
    case "file":
      return Xt(t.file, e);
    case "buffer":
      return e;
    default:
      throw new Error("Unrecognized type " + t.type);
  }
}
function ms(e, t) {
  sl(), _x(e);
  var r = rr(t || {});
  if (r.cellStyles && (r.cellNF = !0, r.sheetStubs = !0), r.type == "array") {
    r.type = "binary";
    var n = ms(e, r);
    return r.type = "array", Fn(n);
  }
  var a = 0;
  if (r.sheet && (typeof r.sheet == "number" ? a = r.sheet : a = e.SheetNames.indexOf(r.sheet), !e.SheetNames[a]))
    throw new Error("Sheet not found: " + r.sheet + " : " + typeof r.sheet);
  switch (r.bookType || "xlsb") {
    case "xml":
    case "xlml":
      return Sr($x(e, r), r);
    case "slk":
    case "sylk":
      return Sr(vc.from_sheet(e.Sheets[e.SheetNames[a]], r), r);
    case "htm":
    case "html":
      return Sr(xs(e.Sheets[e.SheetNames[a]], r), r);
    case "txt":
      return P2(_s(e.Sheets[e.SheetNames[a]], r), r);
    case "csv":
      return Sr(A0(e.Sheets[e.SheetNames[a]], r), r, "\uFEFF");
    case "dif":
      return Sr(gc.from_sheet(e.Sheets[e.SheetNames[a]], r), r);
    case "dbf":
      return an(pc.from_sheet(e.Sheets[e.SheetNames[a]], r), r);
    case "prn":
      return Sr(mc.from_sheet(e.Sheets[e.SheetNames[a]], r), r);
    case "rtf":
      return Sr(Fc.from_sheet(e.Sheets[e.SheetNames[a]], r), r);
    case "eth":
      return Sr(Wi.from_sheet(e.Sheets[e.SheetNames[a]], r), r);
    case "fods":
      return Sr(vs(e, r), r);
    case "wk1":
      return an(_a.sheet_to_wk1(e.Sheets[e.SheetNames[a]], r), r);
    case "wk3":
      return an(_a.book_to_wk3(e, r), r);
    case "biff2":
      r.biff || (r.biff = 2);
    case "biff3":
      r.biff || (r.biff = 3);
    case "biff4":
      return r.biff || (r.biff = 4), an(hs(e, r), r);
    case "biff5":
      r.biff || (r.biff = 5);
    case "biff8":
    case "xla":
    case "xls":
      return r.biff || (r.biff = 8), N2(e, r);
    case "xlsx":
    case "xlsm":
    case "xlam":
    case "xlsb":
    case "numbers":
    case "ods":
      return k2(e, r);
    default:
      throw new Error("Unrecognized bookType |" + r.bookType + "|");
  }
}
function L2(e, t, r, n, a, i, s, f) {
  var o = Xe(r), l = f.defval, c = f.raw || !Object.prototype.hasOwnProperty.call(f, "raw"), x = !0, h = a === 1 ? [] : {};
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
      var m = s ? e[r][d] : e[n[d] + o];
      if (m === void 0 || m.t === void 0) {
        if (l === void 0)
          continue;
        i[d] != null && (h[i[d]] = l);
        continue;
      }
      var u = m.v;
      switch (m.t) {
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
          throw new Error("unrecognized type " + m.t);
      }
      if (i[d] != null) {
        if (u == null)
          if (m.t == "e" && u === null)
            h[i[d]] = null;
          else if (l !== void 0)
            h[i[d]] = l;
          else if (c && u === null)
            h[i[d]] = null;
          else
            continue;
        else
          h[i[d]] = c && (m.t !== "n" || m.t === "n" && f.rawNumbers !== !1) ? u : Nr(m, u, f);
        u != null && (x = !1);
      }
    }
  return { row: h, isempty: x };
}
function Sn(e, t) {
  if (e == null || e["!ref"] == null)
    return [];
  var r = { t: "n", v: 0 }, n = 0, a = 1, i = [], s = 0, f = "", o = { s: { r: 0, c: 0 }, e: { r: 0, c: 0 } }, l = t || {}, c = l.range != null ? l.range : e["!ref"];
  switch (l.header === 1 ? n = 1 : l.header === "A" ? n = 2 : Array.isArray(l.header) ? n = 3 : l.header == null && (n = 0), typeof c) {
    case "string":
      o = Se(c);
      break;
    case "number":
      o = Se(e["!ref"]), o.s.r = c;
      break;
    default:
      o = c;
  }
  n > 0 && (a = 0);
  var x = Xe(o.s.r), h = [], d = [], m = 0, u = 0, g = Array.isArray(e), F = o.s.r, O = 0, y = {};
  g && !e[F] && (e[F] = []);
  var L = l.skipHidden && e["!cols"] || [], z = l.skipHidden && e["!rows"] || [];
  for (O = o.s.c; O <= o.e.c; ++O)
    if (!(L[O] || {}).hidden)
      switch (h[O] = $e(O), r = g ? e[F][O] : e[h[O] + x], n) {
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
          if (r == null && (r = { w: "__EMPTY", t: "s" }), f = s = Nr(r, null, l), u = y[s] || 0, !u)
            y[s] = 1;
          else {
            do
              f = s + "_" + u++;
            while (y[f]);
            y[s] = u, y[f] = 1;
          }
          i[O] = f;
      }
  for (F = o.s.r + a; F <= o.e.r; ++F)
    if (!(z[F] || {}).hidden) {
      var ee = L2(e, o, F, h, n, i, g, l);
      (ee.isempty === !1 || (n === 1 ? l.blankrows !== !1 : l.blankrows)) && (d[m++] = ee.row);
    }
  return d.length = m, d;
}
var Ca = /"/g;
function M2(e, t, r, n, a, i, s, f) {
  for (var o = !0, l = [], c = "", x = Xe(r), h = t.s.c; h <= t.e.c; ++h)
    if (n[h]) {
      var d = f.dense ? (e[r] || [])[h] : e[n[h] + x];
      if (d == null)
        c = "";
      else if (d.v != null) {
        o = !1, c = "" + (f.rawNumbers && d.t == "n" ? d.v : Nr(d, null, f));
        for (var m = 0, u = 0; m !== c.length; ++m)
          if ((u = c.charCodeAt(m)) === a || u === i || u === 34 || f.forceQuotes) {
            c = '"' + c.replace(Ca, '""') + '"';
            break;
          }
        c == "ID" && (c = '"ID"');
      } else
        d.f != null && !d.F ? (o = !1, c = "=" + d.f, c.indexOf(",") >= 0 && (c = '"' + c.replace(Ca, '""') + '"')) : c = "";
      l.push(c);
    }
  return f.blankrows === !1 && o ? null : l.join(s);
}
function A0(e, t) {
  var r = [], n = t ?? {};
  if (e == null || e["!ref"] == null)
    return "";
  var a = Se(e["!ref"]), i = n.FS !== void 0 ? n.FS : ",", s = i.charCodeAt(0), f = n.RS !== void 0 ? n.RS : `
`, o = f.charCodeAt(0), l = new RegExp((i == "|" ? "\\|" : i) + "+$"), c = "", x = [];
  n.dense = Array.isArray(e);
  for (var h = n.skipHidden && e["!cols"] || [], d = n.skipHidden && e["!rows"] || [], m = a.s.c; m <= a.e.c; ++m)
    (h[m] || {}).hidden || (x[m] = $e(m));
  for (var u = 0, g = a.s.r; g <= a.e.r; ++g)
    (d[g] || {}).hidden || (c = M2(e, a, g, x, s, o, i, n), c != null && (n.strip && (c = c.replace(l, "")), (c || n.blankrows !== !1) && r.push((u++ ? f : "") + c)));
  return delete n.dense, r.join("");
}
function _s(e, t) {
  t || (t = {}), t.FS = "	", t.RS = `
`;
  var r = A0(e, t);
  return r;
}
function B2(e) {
  var t = "", r, n = "";
  if (e == null || e["!ref"] == null)
    return [];
  var a = Se(e["!ref"]), i = "", s = [], f, o = [], l = Array.isArray(e);
  for (f = a.s.c; f <= a.e.c; ++f)
    s[f] = $e(f);
  for (var c = a.s.r; c <= a.e.r; ++c)
    for (i = Xe(c), f = a.s.c; f <= a.e.c; ++f)
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
function Ts(e, t, r) {
  var n = r || {}, a = +!n.skipHeader, i = e || {}, s = 0, f = 0;
  if (i && n.origin != null)
    if (typeof n.origin == "number")
      s = n.origin;
    else {
      var o = typeof n.origin == "string" ? Be(n.origin) : n.origin;
      s = o.r, f = o.c;
    }
  var l, c = { s: { c: 0, r: 0 }, e: { c: f, r: s + t.length - 1 + a } };
  if (i["!ref"]) {
    var x = Se(i["!ref"]);
    c.e.c = Math.max(c.e.c, x.e.c), c.e.r = Math.max(c.e.r, x.e.r), s == -1 && (s = x.e.r + 1, c.e.r = s + t.length - 1 + a);
  } else
    s == -1 && (s = 0, c.e.r = t.length - 1 + a);
  var h = n.header || [], d = 0;
  t.forEach(function(u, g) {
    je(u).forEach(function(F) {
      (d = h.indexOf(F)) == -1 && (h[d = h.length] = F);
      var O = u[F], y = "z", L = "", z = _e({ c: f + d, r: s + g + a });
      l = Wt(i, z), O && typeof O == "object" && !(O instanceof Date) ? i[z] = O : (typeof O == "number" ? y = "n" : typeof O == "boolean" ? y = "b" : typeof O == "string" ? y = "s" : O instanceof Date ? (y = "d", n.cellDates || (y = "n", O = er(O)), L = n.dateNF || Oe[14]) : O === null && n.nullError && (y = "e", O = 0), l ? (l.t = y, l.v = O, delete l.w, delete l.R, L && (l.z = L)) : i[z] = l = { t: y, v: O }, L && (l.z = L));
    });
  }), c.e.c = Math.max(c.e.c, f + h.length - 1);
  var m = Xe(s);
  if (a)
    for (d = 0; d < h.length; ++d)
      i[$e(d + f) + m] = { t: "s", v: h[d] };
  return i["!ref"] = ke(c), i;
}
function b2(e, t) {
  return Ts(null, e, t);
}
function Wt(e, t, r) {
  if (typeof t == "string") {
    if (Array.isArray(e)) {
      var n = Be(t);
      return e[n.r] || (e[n.r] = []), e[n.r][n.c] || (e[n.r][n.c] = { t: "z" });
    }
    return e[t] || (e[t] = { t: "z" });
  }
  return typeof t != "number" ? Wt(e, _e(t)) : Wt(e, _e({ r: t, c: r || 0 }));
}
function U2(e, t) {
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
function H2() {
  return { SheetNames: [], Sheets: {} };
}
function W2(e, t, r, n) {
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
  if (os(r), e.SheetNames.indexOf(r) >= 0)
    throw new Error("Worksheet with name |" + r + "| already exists!");
  return e.SheetNames.push(r), e.Sheets[r] = t, r;
}
function V2(e, t, r) {
  e.Workbook || (e.Workbook = {}), e.Workbook.Sheets || (e.Workbook.Sheets = []);
  var n = U2(e, t);
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
function G2(e, t) {
  return e.z = t, e;
}
function ws(e, t, r) {
  return t ? (e.l = { Target: t }, r && (e.l.Tooltip = r)) : delete e.l, e;
}
function X2(e, t, r) {
  return ws(e, "#" + t, r);
}
function j2(e, t, r) {
  e.c || (e.c = []), e.c.push({ t, a: r || "SheetJS" });
}
function z2(e, t, r, n) {
  for (var a = typeof t != "string" ? t : Se(t), i = typeof t == "string" ? t : ke(t), s = a.s.r; s <= a.e.r; ++s)
    for (var f = a.s.c; f <= a.e.c; ++f) {
      var o = Wt(e, s, f);
      o.t = "n", o.F = i, delete o.v, s == a.s.r && f == a.s.c && (o.f = r, n && (o.D = !0));
    }
  return e;
}
var Oa = {
  encode_col: $e,
  encode_row: Xe,
  encode_cell: _e,
  encode_range: ke,
  decode_col: x0,
  decode_row: h0,
  split_cell: fo,
  decode_cell: Be,
  decode_range: fr,
  format_cell: Nr,
  sheet_add_aoa: wi,
  sheet_add_json: Ts,
  sheet_add_dom: ds,
  aoa_to_sheet: Tt,
  json_to_sheet: b2,
  table_to_sheet: ps,
  table_to_book: g2,
  sheet_to_csv: A0,
  sheet_to_txt: _s,
  sheet_to_json: Sn,
  sheet_to_html: xs,
  sheet_to_formulae: B2,
  sheet_to_row_object_array: Sn,
  sheet_get_cell: Wt,
  book_new: H2,
  book_append_sheet: W2,
  book_set_sheet_visibility: V2,
  cell_set_number_format: G2,
  cell_set_hyperlink: ws,
  cell_set_internal_link: X2,
  cell_add_comment: j2,
  sheet_set_array_formula: z2,
  consts: {
    SHEET_VISIBLE: 0,
    SHEET_HIDDEN: 1,
    SHEET_VERY_HIDDEN: 2
  }
};
function $2(e) {
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
      const s = Oa.encode_cell({
        c: a,
        r: n
      });
      typeof i.v == "number" ? i.t = "n" : typeof i.v == "boolean" ? i.t = "b" : i.t = "s", t[s] = i;
    }
  return r.s.c < 1e7 && (t["!ref"] = Oa.encode_range(r)), t;
}
class K2 {
  constructor() {
    bn(this, "SheetNames", []);
    bn(this, "Sheets", {});
  }
}
const Y2 = (e) => {
  const t = new ArrayBuffer(e.length), r = new Uint8Array(t);
  for (let n = 0; n < e.length; ++n)
    r[n] = e.charCodeAt(n) & 255;
  return t;
}, q2 = ({ header: e, data: t, filename: r }) => {
  t = mr(t), t.unshift(e);
  const n = "SheetJS", a = new K2(), i = $2(t), s = t.map((l) => l.map((c) => c == null ? {
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
  const o = ms(a, {
    bookType: "xlsx",
    bookSST: !1,
    type: "binary"
  });
  Yn.saveAs(
    new Blob([Y2(o)], {
      type: "application/octet-stream"
    }),
    `${r}.xlsx`
  );
}, xd = async ({ filename: e, tableHead: t, tableData: r }) => {
  const n = (o) => {
    let l = /<\/?.+?\/?>/g;
    return l.test(o) ? o.replace(l, "") : o;
  }, a = async (o, l) => {
    const c = [];
    for (const x of l) {
      const h = [], d = o.length;
      for (let m = 0; m < d; m++) {
        const u = o[m];
        let g = x[u.prop];
        if (u.render) {
          const F = u.render(x, m);
          F && Array.isArray(F.children) && F.children.length > 1 && F.children.forEach((O) => {
            O && typeof O.children == "string" && (O.children += `
`);
          }), g = await Wa(F);
        }
        g = n(g), h.push(g);
      }
      c.push(h);
    }
    return c;
  }, i = t.filter((o) => !o.only_display), s = i.map((o) => o.label), f = uf({
    lock: !0,
    text: "数据导出中...",
    background: "rgba(0, 0, 0, 0.7)"
  });
  return new Promise((o) => {
    setTimeout(async () => {
      const l = await a(i, r);
      await q2({
        header: s,
        data: l,
        filename: e
      }), f.close(), hf.success("导出成功！"), o(!0);
    }, 500);
  });
}, dd = (e, t = 60, r = "获取验证码") => {
  const n = ue(t), a = ue(r), i = ue(), s = () => {
    n.value--, a.value = `${n.value} 秒后重试`, i.value = setInterval(() => {
      n.value > 0 ? (n.value--, a.value = `${n.value} 秒后重试`) : f();
    }, 1e3);
  }, f = () => {
    n.value = t, a.value = r, clearInterval(i.value);
  }, o = ue(!1), l = () => {
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
}, pd = (e, t = 9999) => {
  var a;
  const r = document.createElement("div"), n = j(Lf, {
    onDestroy: () => {
      document.body.removeChild(r);
    },
    zIndex: t
  });
  Ks(n, r), document.body.appendChild(r), (a = n.component.exposed) == null || a.show(e);
}, J2 = (e, t, r = "enter") => {
  e.key.toLocaleLowerCase() === r && (e.preventDefault(), t());
}, vd = (e, t) => {
  const r = ue(mr(e));
  return {
    query: r,
    reset: () => {
      r.value = mr(e), t();
    }
  };
}, gd = (e) => {
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
  Pf as YoungDateRange,
  sd as YoungDialog,
  Lf as YoungImageViewer,
  id as YoungPagination,
  cd as YoungRotateTip,
  od as YoungSearchForm,
  kf as YoungSelect,
  ad as YoungTable,
  ud as YoungTablePro,
  ld as YoungTimeRange,
  fd as YoungWeekday,
  b0 as useAutoLoad,
  xd as useExport2Excel,
  hd as useFormMode,
  pd as useImagePreview,
  J2 as useKeyUp,
  vd as useQuery,
  gd as useRemoteSearch,
  dd as useVerifyCode
};
//# sourceMappingURL=index.es.js.map
