import { defineComponent as W, ref as x, onMounted as R, onUnmounted as O, createVNode as i, Teleport as E, nextTick as _, Fragment as K, watch as F, reactive as G, computed as B, mergeProps as J } from "vue";
import { useMouse as Q } from "@vueuse/core";
const te = W({
  props: {
    zIndex: {
      type: Number,
      default: 2e3
    }
  },
  setup(a, {
    expose: u,
    slots: f
  }) {
    const c = x(!1), g = () => c.value = !0, d = () => c.value = !1, C = (l) => {
      l.composedPath()[0] === l.currentTarget && d();
    };
    u({
      show: g,
      hide: d
    });
    const e = x(), m = (l) => {
      l.ctrlKey && l.key.toLocaleLowerCase() === "k" && (l.preventDefault(), c.value ? d() : (g(), _(() => {
        var r;
        (r = e.value) == null || r.focus();
      })));
    };
    return R(() => {
      window.addEventListener("keydown", m);
    }), O(() => {
      window.removeEventListener("keydown", m);
    }), () => i(E, {
      to: "body"
    }, {
      default: () => [i("div", {
        onClick: (l) => C(l),
        style: {
          display: c.value ? "block" : "none",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          width: "100vw",
          height: "100vh",
          position: "absolute",
          left: 0,
          top: 0,
          zIndex: a.zIndex
        }
      }, [i("div", {
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
      }, [f.default ? f.default({
        el: e
      }) : i("input", {
        ref: e,
        type: "text"
      }, null)])])]
    });
  }
}), ae = W({
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
  setup(a, {
    slots: u
  }) {
    const f = x(0);
    return () => {
      var c;
      return i(K, null, [i("div", {
        style: {
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          ...a.titleStyle
        }
      }, [a.titles.map((g, d) => i("div", {
        key: d + "adjhskse",
        style: d === f.value ? a.activeStyle : a.inactiveStyle,
        onClick: () => f.value = d
      }, [g]))]), (c = u[`index_${f.value}`]) == null ? void 0 : c.call(u)]);
    };
  }
}), ne = W({
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
  setup(a, {
    emit: u
  }) {
    const {
      x: f,
      y: c
    } = Q(), g = x(0), d = x(0), C = x();
    F(() => a.modelValue, (l, r) => {
      l && !r && _(() => {
        console.log(C.value);
        const {
          width: y,
          height: Y
        } = window.getComputedStyle(C.value), {
          innerWidth: M,
          innerHeight: z
        } = window, X = f.value, T = c.value, k = parseFloat(y), s = parseFloat(Y);
        g.value = M - X > k ? X : M - k, d.value = z - T > s ? T : z - s;
      });
    });
    const e = (l) => {
      u("clickItem", l);
    }, m = () => {
      u("update:modelValue", !1);
    };
    return () => i(E, {
      to: "body"
    }, {
      default: () => [a.modelValue && i("div", {
        style: {
          backgroundColor: "rgba(200, 200, 200, 0)",
          position: "absolute",
          width: "100vw",
          height: "100vh",
          top: 0,
          zIndex: 1001
        },
        onClick: () => m()
      }, [i("ul", {
        ref: C,
        style: {
          left: g.value + "px",
          top: d.value + "px",
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
      }, [a.menuList.map((l, r) => i("li", {
        key: r + "fdasjhe",
        style: {
          margin: 0,
          padding: "7px 16px",
          cursor: "pointer"
        },
        onClick: (y) => {
          y.stopPropagation(), e(l.handlerName);
        },
        onMouseover: (y) => y.currentTarget.style.background = "#eee",
        onMouseleave: (y) => y.currentTarget.style.background = "#fff"
      }, [l.title]))])])]
    });
  }
}), oe = W({
  props: {
    canvasWidth: {
      type: Number,
      default: 310
    },
    canvasHeight: {
      type: Number,
      default: 160
    },
    show: {
      type: Boolean,
      default: !1
    },
    puzzleScale: {
      type: Number,
      default: 1
    },
    sliderSize: {
      type: Number,
      default: 50
    },
    range: {
      type: Number,
      default: 10
    },
    imgs: {
      type: Array,
      default: void 0
    },
    successText: {
      type: String,
      default: "\u9A8C\u8BC1\u901A\u8FC7\uFF01"
    },
    failText: {
      type: String,
      default: "\u9A8C\u8BC1\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5"
    },
    sliderText: {
      type: String,
      default: "\u62D6\u52A8\u6ED1\u5757\u5B8C\u6210\u62FC\u56FE"
    },
    zIndex: {
      type: Number,
      default: 10001
    }
  },
  emits: ["success", "fail", "close"],
  setup(a, {
    emit: u,
    attrs: f
  }) {
    const c = x(), g = x(), d = x(), C = x(), e = G({
      mouseDown: !1,
      startWidth: 50,
      startX: 0,
      newX: 0,
      pinX: 0,
      pinY: 0,
      loading: !1,
      isCanSlide: !1,
      error: !1,
      infoBoxShow: !1,
      infoText: "",
      infoBoxFail: !1,
      timer1: void 0,
      closeDown: !1,
      isSuccess: !1,
      imgIndex: -1,
      isSubmting: !1
    });
    F(() => a.show, (n) => {
      n ? (document.body.classList.add("vue-puzzle-overflow"), I()) : (e.isSubmting = !1, e.isSuccess = !1, e.infoBoxShow = !1, document.body.classList.remove("vue-puzzle-overflow"));
    });
    const m = B(() => {
      const n = e.startWidth + e.newX - e.startX;
      return n < r.value ? r.value : n > a.canvasWidth ? a.canvasWidth : n;
    }), l = B(() => Math.round(Math.max(Math.min(a.puzzleScale, 2), 0.2) * 52.5 + 6)), r = B(() => Math.max(Math.min(Math.round(a.sliderSize), Math.round(a.canvasWidth * 0.5)), 10)), y = () => {
      e.mouseDown || (e.timer1 && clearTimeout(e.timer1), u("close"));
    }, Y = () => {
      e.closeDown = !0;
    }, M = () => {
      e.closeDown && y(), e.closeDown = !1;
    }, z = (n) => {
      var t, h;
      e.isCanSlide && (e.mouseDown = !0, e.startWidth = (h = (t = c.value) == null ? void 0 : t.clientWidth) != null ? h : 0, e.newX = n.clientX || n.changedTouches[0].clientX, e.startX = n.clientX || n.changedTouches[0].clientX);
    }, X = (n) => {
      e.mouseDown && (n.preventDefault(), e.newX = n.clientX || n.changedTouches[0].clientX);
    }, T = () => {
      e.mouseDown && (e.mouseDown = !1, j());
    }, k = (n = !1) => {
      var L;
      if (e.loading && !n)
        return;
      e.loading = !0, e.isCanSlide = !1;
      const t = g.value, h = d.value, v = C.value, o = t == null ? void 0 : t.getContext("2d"), b = h == null ? void 0 : h.getContext("2d"), p = v == null ? void 0 : v.getContext("2d");
      if (!o || !b || !p) {
        console.error("not found ctx / ctx2 / ctx3");
        return;
      }
      const q = navigator.userAgent.indexOf("Firefox") >= 0 && navigator.userAgent.indexOf("Windows") >= 0, S = document.createElement("img");
      if (o.fillStyle = "rgba(255,255,255,1)", p.fillStyle = "rgba(255,255,255,1)", o.clearRect(0, 0, a.canvasWidth, a.canvasHeight), b.clearRect(0, 0, a.canvasWidth, a.canvasHeight), e.pinX = s(l.value + 20, a.canvasWidth - l.value - 10), e.pinY = s(20, a.canvasHeight - l.value - 10), S.crossOrigin = "anonymous", S.onload = () => {
        const [w, H, $, P] = N(S);
        o.save(), D(o), o.closePath(), q ? (o.clip(), o.save(), o.shadowOffsetX = 0, o.shadowOffsetY = 0, o.shadowColor = "#000", o.shadowBlur = 3, o.fill(), o.restore()) : (o.shadowOffsetX = 0, o.shadowOffsetY = 0, o.shadowColor = "#000", o.shadowBlur = 3, o.fill(), o.clip()), o.drawImage(S, w, H, $, P), p.fillRect(0, 0, a.canvasWidth, a.canvasHeight), p.drawImage(S, w, H, $, P), o.globalCompositeOperation = "source-atop", D(o), o.arc(e.pinX + Math.ceil(l.value / 2), e.pinY + Math.ceil(l.value / 2), l.value * 1.2, 0, Math.PI * 2, !0), o.closePath(), o.shadowColor = "rgba(255, 255, 255, .8)", o.shadowOffsetX = -1, o.shadowOffsetY = -1, o.shadowBlur = Math.min(Math.ceil(8 * a.puzzleScale), 12), o.fillStyle = "#ffffaa", o.fill();
        const U = o.getImageData(
          e.pinX - 3,
          e.pinY - 20,
          e.pinX + l.value + 5,
          e.pinY + l.value + 5
        );
        b.putImageData(U, 0, e.pinY - 20), o.restore(), o.clearRect(0, 0, a.canvasWidth, a.canvasHeight), o.save(), D(o), o.globalAlpha = 0.8, o.fillStyle = "#ffffff", o.fill(), o.restore(), o.save(), o.globalCompositeOperation = "source-atop", D(o), o.arc(e.pinX + Math.ceil(l.value / 2), e.pinY + Math.ceil(l.value / 2), l.value * 1.2, 0, Math.PI * 2, !0), o.shadowColor = "#000", o.shadowOffsetX = 2, o.shadowOffsetY = 2, o.shadowBlur = 16, o.fill(), o.restore(), o.save(), o.globalCompositeOperation = "destination-over", o.drawImage(S, w, H, $, P), o.restore(), e.loading = !1, e.isCanSlide = !0;
      }, S.onerror = () => {
        k(!0);
      }, !n && ((L = a.imgs) == null ? void 0 : L.length)) {
        let w = s(0, a.imgs.length - 1);
        w === e.imgIndex && (w === a.imgs.length - 1 ? w = 0 : w++), e.imgIndex = w, S.src = a.imgs[w];
      } else
        S.src = V();
    }, s = (n, t) => Math.ceil(Math.random() * (t - n) + n), N = (n) => {
      const t = n.width / n.height, h = a.canvasWidth / a.canvasHeight;
      let v = 0, o = 0, b = 0, p = 0;
      return t > h ? (p = a.canvasHeight, b = t * p, o = 0, v = (a.canvasWidth - b) / 2) : (b = a.canvasWidth, p = b / t, v = 0, o = (a.canvasHeight - p) / 2), [v, o, b, p];
    }, D = (n) => {
      const t = Math.ceil(15 * a.puzzleScale);
      n.beginPath(), n.moveTo(e.pinX, e.pinY), n.lineTo(e.pinX + t, e.pinY), n.arcTo(e.pinX + t, e.pinY - t / 2, e.pinX + t + t / 2, e.pinY - t / 2, t / 2), n.arcTo(e.pinX + t + t, e.pinY - t / 2, e.pinX + t + t, e.pinY, t / 2), n.lineTo(e.pinX + t + t + t, e.pinY), n.lineTo(e.pinX + t + t + t, e.pinY + t), n.arcTo(e.pinX + t + t + t + t / 2, e.pinY + t, e.pinX + t + t + t + t / 2, e.pinY + t + t / 2, t / 2), n.arcTo(e.pinX + t + t + t + t / 2, e.pinY + t + t, e.pinX + t + t + t, e.pinY + t + t, t / 2), n.lineTo(e.pinX + t + t + t, e.pinY + t + t + t), n.lineTo(e.pinX, e.pinY + t + t + t), n.lineTo(e.pinX, e.pinY + t + t), n.arcTo(e.pinX + t / 2, e.pinY + t + t, e.pinX + t / 2, e.pinY + t + t / 2, t / 2), n.arcTo(e.pinX + t / 2, e.pinY + t, e.pinX, e.pinY + t, t / 2), n.lineTo(e.pinX, e.pinY);
    }, V = () => {
      const n = document.createElement("canvas"), t = n.getContext("2d");
      if (!t)
        return console.error("not found ctx"), "";
      n.width = a.canvasWidth, n.height = a.canvasHeight, t.fillStyle = `rgb(${s(100, 255)},${s(100, 255)},${s(100, 255)})`, t.fillRect(0, 0, a.canvasWidth, a.canvasHeight);
      for (let h = 0; h < 12; h++)
        if (t.fillStyle = `rgb(${s(100, 255)},${s(100, 255)},${s(100, 255)})`, t.strokeStyle = `rgb(${s(100, 255)},${s(100, 255)},${s(100, 255)})`, s(0, 2) > 1)
          t.save(), t.rotate(s(-90, 90) * Math.PI / 180), t.fillRect(s(-20, n.width - 20), s(-20, n.height - 20), s(10, n.width / 2 + 10), s(10, n.height / 2 + 10)), t.restore();
        else {
          t.beginPath();
          const v = s(-Math.PI, Math.PI);
          t.arc(s(0, n.width), s(0, n.height), s(10, n.height / 2 + 10), v, v + Math.PI * 1.5), t.closePath(), t.fill();
        }
      return n.toDataURL("image/png");
    }, j = () => {
      e.isSubmting = !0;
      const n = Math.abs(e.pinX - (m.value - r.value) + (l.value - r.value) * ((m.value - r.value) / (a.canvasWidth - r.value)) - 3);
      n < a.range ? (e.infoText = a.successText, e.infoBoxFail = !1, e.infoBoxShow = !0, e.isCanSlide = !1, e.isSuccess = !0, e.timer1 && clearTimeout(e.timer1), e.timer1 = setTimeout(() => {
        e.isSubmting = !1, u("success", n);
      }, 800)) : (e.infoText = a.failText, e.infoBoxFail = !0, e.infoBoxShow = !0, e.isCanSlide = !1, u("fail", n), e.timer1 && clearTimeout(e.timer1), e.timer1 = setTimeout(() => {
        e.isSubmting = !1, I();
      }, 800));
    }, A = () => {
      e.infoBoxFail = !1, e.infoBoxShow = !1, e.isCanSlide = !1, e.isSuccess = !1, e.startWidth = r.value, e.startX = 0, e.newX = 0;
    }, I = () => {
      e.isSubmting || (A(), k());
    };
    return R(() => {
      document.addEventListener("mousemove", X, !1), document.addEventListener("mouseup", T, !1), document.addEventListener("touchmove", X, {
        passive: !1
      }), document.addEventListener("touchend", T, !1), a.show && (document.body.classList.add("vue-puzzle-overflow"), I());
    }), O(() => {
      e.timer1 && clearTimeout(e.timer1), document.removeEventListener("mousemove", X, !1), document.removeEventListener("mouseup", T, !1), document.removeEventListener("touchmove", X), document.removeEventListener("touchend", T, !1);
    }), () => i("div", J(f, {
      style: {
        position: "fixed",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        zIndex: a.zIndex,
        opacity: a.show ? 1 : 0,
        pointerEvents: a.show ? "auto" : "none",
        transition: "opacity 200ms"
      },
      onMousedown: Y,
      onMouseup: M,
      onTouchstart: Y,
      onTouchend: M
    }), [i("div", {
      style: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        padding: "20px",
        background: "#fff",
        userSelect: "none",
        borderRadius: "3px",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.3)"
      },
      onMousedown: (n) => n.stopPropagation(),
      onTouchstart: (n) => n.stopPropagation()
    }, [i("div", {
      style: {
        position: "relative",
        overflow: "hidden",
        borderRadius: "3px",
        height: `${a.canvasHeight}px`
      }
    }, [i("canvas", {
      ref: g,
      width: a.canvasWidth,
      height: a.canvasHeight,
      style: {
        width: `${a.canvasWidth}px`,
        height: `${a.canvasHeight}px`
      }
    }, null), i("canvas", {
      ref: C,
      style: {
        position: "absolute",
        top: 0,
        left: 0,
        opacity: e.isSuccess ? 1 : 0,
        zIndex: 3,
        transition: "opacity 600ms",
        width: `${a.canvasWidth}px`,
        height: `${a.canvasHeight}px`
      },
      width: a.canvasWidth,
      height: a.canvasHeight
    }, null), i("canvas", {
      ref: d,
      style: {
        position: "absolute",
        top: 0,
        left: 0,
        width: `${l.value}px`,
        height: `${a.canvasHeight}px`,
        zIndex: 2,
        transform: `translateX(${m.value - r.value - (l.value - r.value) * ((m.value - r.value) / (a.canvasWidth - r.value))}px)`
      },
      width: l.value,
      height: a.canvasHeight
    }, null), i("div", {
      style: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        zIndex: 20,
        opacity: e.loading ? 1 : 0,
        pointerEvents: e.loading ? "auto" : "none",
        transition: "opacity 100ms",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }
    }, [i("style", null, [`
                  @keyframes load {
                    0% {
                      opacity: 1;
                      transform: scale(1.3);
                    }
                    100% {
                      opacity: 0.2;
                      transform: scale(0.3);
                    }
                  }
                  .loading_item {
                    display: inline-block;
                    width: 5px;
                    height: 100%;
                    margin-left: 2px;
                    border-radius: 50%;
                    background-color: #888;
                    animation: load 1.04s ease infinite;
                  }
                  `]), i("div", {
      style: {
        flex: "none",
        height: "5px",
        lineHeight: 0
      }
    }, [i("span", {
      class: "loading_item",
      style: {
        animationPlayState: e.loading ? "" : "paused",
        marginLeft: 0
      }
    }, null), i("span", {
      class: "loading_item",
      style: {
        animationPlayState: e.loading ? "" : "paused",
        animationDelay: "0.13s"
      }
    }, null), i("span", {
      class: "loading_item",
      style: {
        animationPlayState: e.loading ? "" : "paused",
        animationDelay: "0.26s"
      }
    }, null), i("span", {
      class: "loading_item",
      style: {
        animationPlayState: e.loading ? "" : "paused",
        animationDelay: "0.39s"
      }
    }, null), i("span", {
      class: "loading_item",
      style: {
        animationPlayState: e.loading ? "" : "paused",
        animationDelay: "0.52s"
      }
    }, null)])]), i("div", {
      style: {
        position: "absolute",
        left: 0,
        bottom: 0,
        width: "100%",
        height: "24px",
        lineHeight: "24px",
        textAlign: "center",
        overflow: "hidden",
        fontSize: "13px",
        backgroundColor: e.infoBoxFail ? "#ce594b" : "#83ce3f",
        opacity: e.infoBoxShow ? 0.95 : 0,
        transform: `translateY(${e.infoBoxShow ? 0 : "24px"})`,
        transition: "all 200ms",
        color: "#fff",
        zIndex: 10
      }
    }, [e.infoText]), i("div", {
      style: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "30px",
        height: "100%",
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        zIndex: 3,
        transform: `translateX(${e.isSuccess ? `${a.canvasWidth + a.canvasHeight * 0.578}px` : `-${a.canvasHeight * 0.578}px`}) skew(-30deg, 0)`,
        transition: e.isSuccess ? "transform 600ms" : ""
      }
    }, null), i("style", null, [`
                .reset_ {
                  position: absolute;
                  top: 2px;
                  right: 2px;
                  width: 35px;
                  height: auto;
                  z-index: 12;
                  cursor: pointer;
                  transition: transform 200ms;
                  transform: rotate(0deg);
                }
                .reset_:hover {
                  transform: rotate(-90deg);
                }

                .auth-control_.range-box {
                  position: relative;
                  width: 100%;
                  background-color: #eef1f8;
                  margin-top: 20px;
                  border-radius: 3px;
                  box-shadow: 0 0 8px rgba(240, 240, 240, 0.6) inset;
                }

                .auth-control_.range-text {
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                  font-size: 14px;
                  color: #b7bcd1;
                  white-space: nowrap;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  text-align: center;
                  width: 100%;
                }
                .auth-control_.range-slider {
                  position: absolute;
                  height: 100%;
                  width: 50px;
                  background-color: rgba(106, 160, 255, 0.8);
                  border-radius: 3px;
                }
                .vue-puzzle-overflow {
                  overflow: hidden !important;
                }
                `]), i("img", {
      class: "reset_",
      title: "\u5237\u65B0",
      onClick: I,
      src: "data:image/svg+xml;utf8,%3Csvg preserveAspectRatio='xMidYMid meet' viewBox='0 0 21 24' width='1em' height='1em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='%2343CF96' d='m7.5 21l2.999-3v1.5a7.501 7.501 0 0 0 5.299-12.811l2.114-2.124A10.465 10.465 0 0 1 21 12.002C21 17.8 16.3 22.5 10.502 22.5H10.5V24zM0 12C.007 6.204 4.704 1.507 10.499 1.5h.001V0l3 3l-3 3V4.5h-.002a7.502 7.502 0 0 0-5.299 12.812l-2.112 2.124a10.397 10.397 0 0 1-3.088-7.407v-.03v.002z'/%3E%3C/svg%3E"
    }, null)]), i("div", {
      class: "auth-control_"
    }, [i("div", {
      class: "range-box",
      style: {
        height: `${r.value}px`
      }
    }, [i("div", {
      class: "range-text"
    }, [a.sliderText]), i("div", {
      ref: c,
      class: "range-slider",
      style: {
        width: `${m.value}px`
      }
    }, [i("div", {
      style: {
        width: `${r.value}px`,
        position: "absolute",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        right: 0,
        height: "100%",
        backgroundColor: "#fff",
        borderRadius: "3px",
        boxShadow: "0 0 4px #ccc",
        cursor: "pointer"
      },
      onMousedown: z,
      onTouchstart: z,
      onMouseenter: () => e.mouseDown = !0,
      onMouseleave: () => e.mouseDown = !1
    }, [i("div", {
      style: {
        width: 0,
        height: e.mouseDown ? 0 : "40%",
        transition: "all 200ms",
        border: e.mouseDown ? "4px solid transparent" : "1px solid #6aa0ff",
        borderRightColor: e.mouseDown ? "#6aa0ff" : ""
      }
    }, null), i("div", {
      style: {
        width: 0,
        height: e.mouseDown ? 0 : "40%",
        transition: "all 200ms",
        border: "1px solid #6aa0ff",
        margin: e.mouseDown ? "0 6px" : "0 4px",
        borderRightColor: e.mouseDown ? "#6aa0ff" : "",
        borderWidth: e.mouseDown ? "3px" : "",
        borderRadius: e.mouseDown ? "3px" : ""
      }
    }, null), i("div", {
      style: {
        width: 0,
        height: e.mouseDown ? 0 : "40%",
        transition: "all 200ms",
        border: e.mouseDown ? "4px solid transparent" : "1px solid #6aa0ff",
        borderLeftColor: e.mouseDown ? "#6aa0ff" : ""
      }
    }, null)])])])])])]);
  }
});
export {
  te as YoungCmdPopup,
  ne as YoungContextMenu,
  oe as YoungSlideVerify,
  ae as YoungTab
};
//# sourceMappingURL=index.es.js.map
