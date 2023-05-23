import { defineComponent as D, ref as x, onMounted as O, onUnmounted as E, createVNode as o, Teleport as R, nextTick as _, Fragment as K, watch as F, reactive as G, computed as P, mergeProps as J } from "vue";
import { useMouse as Q } from "@vueuse/core";
const te = D({
  props: {
    zIndex: {
      type: Number,
      default: 2e3
    }
  },
  setup(a, {
    expose: c,
    slots: h
  }) {
    const u = x(!1), f = () => u.value = !0, d = () => u.value = !1, S = (l) => {
      l.composedPath()[0] === l.currentTarget && d();
    };
    c({
      show: f,
      hide: d
    });
    const e = x(), g = (l) => {
      l.ctrlKey && l.key.toLocaleLowerCase() === "k" && (l.preventDefault(), u.value ? d() : (f(), _(() => {
        var r;
        (r = e.value) == null || r.focus();
      })));
    };
    return O(() => {
      window.addEventListener("keydown", g);
    }), E(() => {
      window.removeEventListener("keydown", g);
    }), () => o(R, {
      to: "body"
    }, {
      default: () => [o("div", {
        onClick: (l) => S(l),
        style: {
          display: u.value ? "block" : "none",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          width: "100vw",
          height: "100vh",
          position: "absolute",
          left: 0,
          top: 0,
          zIndex: a.zIndex
        }
      }, [o("div", {
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
      }, [h.default ? h.default({
        el: e
      }) : o("input", {
        ref: e,
        type: "text"
      }, null)])])]
    });
  }
}), ae = D({
  props: {
    titleStyle: {
      type: Object,
      default: () => ({
        fontSize: "24px",
        width: "220px"
      })
    },
    activeStyle: {
      type: [Object, String],
      default: () => ({
        color: "#409eff",
        cursor: "pointer",
        borderBottom: "2px solid #409eff",
        marginBottom: "20px"
      })
    },
    inactiveStyle: {
      type: [Object, String],
      default: () => ({
        cursor: "pointer",
        marginBottom: "20px"
      })
    },
    titles: {
      type: Array,
      required: !0
    }
  },
  setup(a, {
    slots: c
  }) {
    const h = x(0);
    return () => {
      var u;
      return o(K, null, [o("div", {
        style: {
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          ...a.titleStyle
        }
      }, [a.titles.map((f, d) => o("div", {
        key: d + "adjhskse",
        style: d === h.value ? a.activeStyle : a.inactiveStyle,
        onClick: () => h.value = d
      }, [f]))]), (u = c[`index_${h.value}`]) == null ? void 0 : u.call(c)]);
    };
  }
}), ne = D({
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
    emit: c
  }) {
    const {
      x: h,
      y: u
    } = Q(), f = x(0), d = x(0), S = x();
    F(() => a.modelValue, (l, r) => {
      l && !r && _(() => {
        console.log(S.value);
        const {
          width: w,
          height: Y
        } = window.getComputedStyle(S.value), {
          innerWidth: z,
          innerHeight: M
        } = window, C = h.value, T = u.value, k = parseFloat(w), s = parseFloat(Y);
        f.value = z - C > k ? C : z - k, d.value = M - T > s ? T : M - s;
      });
    });
    const e = (l) => {
      c("clickItem", l);
    }, g = () => {
      c("update:modelValue", !1);
    };
    return () => o(R, {
      to: "body"
    }, {
      default: () => [a.modelValue && o("div", {
        style: {
          backgroundColor: "rgba(200, 200, 200, 0)",
          position: "absolute",
          width: "100vw",
          height: "100vh",
          top: 0,
          zIndex: 1001
        },
        onClick: () => g()
      }, [o("ul", {
        ref: S,
        style: {
          left: f.value + "px",
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
      }, [a.menuList.map((l, r) => o("li", {
        key: r + "fdasjhe",
        style: {
          margin: 0,
          padding: "7px 16px",
          cursor: "pointer"
        },
        onClick: (w) => {
          w.stopPropagation(), e(l.handlerName);
        },
        onMouseover: (w) => w.currentTarget.style.background = "#eee",
        onMouseleave: (w) => w.currentTarget.style.background = "#fff"
      }, [l.title]))])])]
    });
  }
}), ie = D({
  props: {
    /**
     * 主 canvas 的宽
     */
    canvasWidth: {
      type: Number,
      default: 310
    },
    /**
     * 主 canvas 的高
     */
    canvasHeight: {
      type: Number,
      default: 160
    },
    /**
     * 是否出现，由父级控制
     */
    show: {
      type: Boolean,
      default: !1
    },
    /**
     * 拼图块的大小缩放比例
     */
    puzzleScale: {
      type: Number,
      default: 1
    },
    /**
     * 滑块的大小
     */
    sliderSize: {
      type: Number,
      default: 50
    },
    /**
     * 允许的偏差值
     */
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
      default: "验证通过！"
    },
    failText: {
      type: String,
      default: "验证失败，请重试"
    },
    sliderText: {
      type: String,
      default: "拖动滑块完成拼图"
    },
    zIndex: {
      type: Number,
      default: 10001
    }
  },
  emits: ["success", "fail", "close"],
  setup(a, {
    emit: c,
    attrs: h
  }) {
    const u = x(), f = x(), d = x(), S = x(), e = G({
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
      n ? (document.body.classList.add("vue-puzzle-overflow"), W()) : (e.isSubmting = !1, e.isSuccess = !1, e.infoBoxShow = !1, document.body.classList.remove("vue-puzzle-overflow"));
    });
    const g = P(() => {
      const n = e.startWidth + e.newX - e.startX;
      return n < r.value ? r.value : n > a.canvasWidth ? a.canvasWidth : n;
    }), l = P(() => Math.round(Math.max(Math.min(a.puzzleScale, 2), 0.2) * 52.5 + 6)), r = P(() => Math.max(Math.min(Math.round(a.sliderSize), Math.round(a.canvasWidth * 0.5)), 10)), w = () => {
      e.mouseDown || (e.timer1 && clearTimeout(e.timer1), c("close"));
    }, Y = () => {
      e.closeDown = !0;
    }, z = () => {
      e.closeDown && w(), e.closeDown = !1;
    }, M = (n) => {
      var t;
      e.isCanSlide && (e.mouseDown = !0, e.startWidth = ((t = u.value) == null ? void 0 : t.clientWidth) ?? 0, e.newX = n.clientX || n.changedTouches[0].clientX, e.startX = n.clientX || n.changedTouches[0].clientX);
    }, C = (n) => {
      e.mouseDown && (n.preventDefault(), e.newX = n.clientX || n.changedTouches[0].clientX);
    }, T = () => {
      e.mouseDown && (e.mouseDown = !1, j());
    }, k = (n = !1) => {
      var L;
      if (e.loading && !n)
        return;
      e.loading = !0, e.isCanSlide = !1;
      const t = f.value, X = d.value, v = S.value, i = t == null ? void 0 : t.getContext("2d"), b = X == null ? void 0 : X.getContext("2d"), m = v == null ? void 0 : v.getContext("2d");
      if (!i || !b || !m) {
        console.error("not found ctx / ctx2 / ctx3");
        return;
      }
      const U = navigator.userAgent.indexOf("Firefox") >= 0 && navigator.userAgent.indexOf("Windows") >= 0, y = document.createElement("img");
      if (i.fillStyle = "rgba(255,255,255,1)", m.fillStyle = "rgba(255,255,255,1)", i.clearRect(0, 0, a.canvasWidth, a.canvasHeight), b.clearRect(0, 0, a.canvasWidth, a.canvasHeight), e.pinX = s(l.value + 20, a.canvasWidth - l.value - 10), e.pinY = s(20, a.canvasHeight - l.value - 10), y.crossOrigin = "anonymous", y.onload = () => {
        const [p, H, $, B] = N(y);
        i.save(), I(i), i.closePath(), U ? (i.clip(), i.save(), i.shadowOffsetX = 0, i.shadowOffsetY = 0, i.shadowColor = "#000", i.shadowBlur = 3, i.fill(), i.restore()) : (i.shadowOffsetX = 0, i.shadowOffsetY = 0, i.shadowColor = "#000", i.shadowBlur = 3, i.fill(), i.clip()), i.drawImage(y, p, H, $, B), m.fillRect(0, 0, a.canvasWidth, a.canvasHeight), m.drawImage(y, p, H, $, B), i.globalCompositeOperation = "source-atop", I(i), i.arc(e.pinX + Math.ceil(l.value / 2), e.pinY + Math.ceil(l.value / 2), l.value * 1.2, 0, Math.PI * 2, !0), i.closePath(), i.shadowColor = "rgba(255, 255, 255, .8)", i.shadowOffsetX = -1, i.shadowOffsetY = -1, i.shadowBlur = Math.min(Math.ceil(8 * a.puzzleScale), 12), i.fillStyle = "#ffffaa", i.fill();
        const q = i.getImageData(
          e.pinX - 3,
          // 为了阴影 是从-3px开始截取，判定的时候要+3px
          e.pinY - 20,
          e.pinX + l.value + 5,
          e.pinY + l.value + 5
        );
        b.putImageData(q, 0, e.pinY - 20), i.restore(), i.clearRect(0, 0, a.canvasWidth, a.canvasHeight), i.save(), I(i), i.globalAlpha = 0.8, i.fillStyle = "#ffffff", i.fill(), i.restore(), i.save(), i.globalCompositeOperation = "source-atop", I(i), i.arc(e.pinX + Math.ceil(l.value / 2), e.pinY + Math.ceil(l.value / 2), l.value * 1.2, 0, Math.PI * 2, !0), i.shadowColor = "#000", i.shadowOffsetX = 2, i.shadowOffsetY = 2, i.shadowBlur = 16, i.fill(), i.restore(), i.save(), i.globalCompositeOperation = "destination-over", i.drawImage(y, p, H, $, B), i.restore(), e.loading = !1, e.isCanSlide = !0;
      }, y.onerror = () => {
        k(!0);
      }, !n && ((L = a.imgs) != null && L.length)) {
        let p = s(0, a.imgs.length - 1);
        p === e.imgIndex && (p === a.imgs.length - 1 ? p = 0 : p++), e.imgIndex = p, y.src = a.imgs[p];
      } else
        y.src = V();
    }, s = (n, t) => Math.ceil(Math.random() * (t - n) + n), N = (n) => {
      const t = n.width / n.height, X = a.canvasWidth / a.canvasHeight;
      let v = 0, i = 0, b = 0, m = 0;
      return t > X ? (m = a.canvasHeight, b = t * m, i = 0, v = (a.canvasWidth - b) / 2) : (b = a.canvasWidth, m = b / t, v = 0, i = (a.canvasHeight - m) / 2), [v, i, b, m];
    }, I = (n) => {
      const t = Math.ceil(15 * a.puzzleScale);
      n.beginPath(), n.moveTo(e.pinX, e.pinY), n.lineTo(e.pinX + t, e.pinY), n.arcTo(e.pinX + t, e.pinY - t / 2, e.pinX + t + t / 2, e.pinY - t / 2, t / 2), n.arcTo(e.pinX + t + t, e.pinY - t / 2, e.pinX + t + t, e.pinY, t / 2), n.lineTo(e.pinX + t + t + t, e.pinY), n.lineTo(e.pinX + t + t + t, e.pinY + t), n.arcTo(e.pinX + t + t + t + t / 2, e.pinY + t, e.pinX + t + t + t + t / 2, e.pinY + t + t / 2, t / 2), n.arcTo(e.pinX + t + t + t + t / 2, e.pinY + t + t, e.pinX + t + t + t, e.pinY + t + t, t / 2), n.lineTo(e.pinX + t + t + t, e.pinY + t + t + t), n.lineTo(e.pinX, e.pinY + t + t + t), n.lineTo(e.pinX, e.pinY + t + t), n.arcTo(e.pinX + t / 2, e.pinY + t + t, e.pinX + t / 2, e.pinY + t + t / 2, t / 2), n.arcTo(e.pinX + t / 2, e.pinY + t, e.pinX, e.pinY + t, t / 2), n.lineTo(e.pinX, e.pinY);
    }, V = () => {
      const n = document.createElement("canvas"), t = n.getContext("2d");
      if (!t)
        return console.error("not found ctx"), "";
      n.width = a.canvasWidth, n.height = a.canvasHeight, t.fillStyle = `rgb(${s(100, 255)},${s(100, 255)},${s(100, 255)})`, t.fillRect(0, 0, a.canvasWidth, a.canvasHeight);
      for (let X = 0; X < 12; X++)
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
      const n = Math.abs(e.pinX - (g.value - r.value) + (l.value - r.value) * ((g.value - r.value) / (a.canvasWidth - r.value)) - 3);
      n < a.range ? (e.infoText = a.successText, e.infoBoxFail = !1, e.infoBoxShow = !0, e.isCanSlide = !1, e.isSuccess = !0, e.timer1 && clearTimeout(e.timer1), e.timer1 = setTimeout(() => {
        e.isSubmting = !1, c("success", n);
      }, 800)) : (e.infoText = a.failText, e.infoBoxFail = !0, e.infoBoxShow = !0, e.isCanSlide = !1, c("fail", n), e.timer1 && clearTimeout(e.timer1), e.timer1 = setTimeout(() => {
        e.isSubmting = !1, W();
      }, 800));
    }, A = () => {
      e.infoBoxFail = !1, e.infoBoxShow = !1, e.isCanSlide = !1, e.isSuccess = !1, e.startWidth = r.value, e.startX = 0, e.newX = 0;
    }, W = () => {
      e.isSubmting || (A(), k());
    };
    return O(() => {
      document.addEventListener("mousemove", C, !1), document.addEventListener("mouseup", T, !1), document.addEventListener("touchmove", C, {
        passive: !1
      }), document.addEventListener("touchend", T, !1), a.show && (document.body.classList.add("vue-puzzle-overflow"), W());
    }), E(() => {
      e.timer1 && clearTimeout(e.timer1), document.removeEventListener("mousemove", C, !1), document.removeEventListener("mouseup", T, !1), document.removeEventListener("touchmove", C), document.removeEventListener("touchend", T, !1);
    }), () => o("div", J(h, {
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
      onMouseup: z,
      onTouchstart: Y,
      onTouchend: z
    }), [o("style", null, [`
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

            .auth-control_ .range-box {
              position: relative;
              width: 100%;
              background-color: #eef1f8;
              margin-top: 20px;
              border-radius: 3px;
              box-shadow: 0 0 8px rgba(240, 240, 240, 0.6) inset;
            }

            .auth-control_ .range-text {
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
            .auth-control_ .range-slider {
              position: absolute;
              height: 100%;
              width: 50px;
              background-color: rgba(106, 160, 255, 0.8);
              border-radius: 3px;
            }
            .vue-puzzle-overflow {
              overflow: hidden !important;
            }
            .range-slider .range-btn {
              position: absolute;
              display: flex;
              align-items: center;
              justify-content: center;
              right: 0;
              width: 50px;
              height: 100%;
              background-color: #fff;
              border-radius: 3px;
              box-shadow: 0 0 4px #ccc;
              cursor: pointer;
            }

            .range-slider .range-btn > div {
              width: 0;
              height: 40%;
              transition: all 200ms;
              border: solid 1px #6aa0ff;
            }

            .range-slider .range-btn > div:nth-child(2) {
              margin: 0 4px;
            }

            .range-slider .range-btn:hover > div:nth-child(1), .range-slider .range-btn.isDown > div:nth-child(1) {
              border: solid 4px transparent;
              height: 0;
              border-right-color: #6aa0ff;
            }

            .range-slider .range-btn:hover > div:nth-child(2), .range-slider .range-btn.isDown > div:nth-child(2) {
              border-width: 3px;
              height: 0;
              border-radius: 3px;
              margin: 0 6px;
              border-right-color: #6aa0ff;
            }

            .range-slider .range-btn:hover > div:nth-child(3), .range-slider .range-btn.isDown > div:nth-child(3) {
              border: solid 4px transparent;
              height: 0;
              border-left-color: #6aa0ff;
            }
            `]), o("div", {
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
    }, [o("div", {
      style: {
        position: "relative",
        overflow: "hidden",
        borderRadius: "3px",
        height: `${a.canvasHeight}px`
      }
    }, [o("canvas", {
      ref: f,
      width: a.canvasWidth,
      height: a.canvasHeight,
      style: {
        width: `${a.canvasWidth}px`,
        height: `${a.canvasHeight}px`
      }
    }, null), o("canvas", {
      ref: S,
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
    }, null), o("canvas", {
      ref: d,
      style: {
        position: "absolute",
        top: 0,
        left: 0,
        width: `${l.value}px`,
        height: `${a.canvasHeight}px`,
        zIndex: 2,
        transform: `translateX(${g.value - r.value - (l.value - r.value) * ((g.value - r.value) / (a.canvasWidth - r.value))}px)`
      },
      width: l.value,
      height: a.canvasHeight
    }, null), o("div", {
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
    }, [o("div", {
      style: {
        flex: "none",
        height: "5px",
        lineHeight: 0
      }
    }, [o("span", {
      class: "loading_item",
      style: {
        animationPlayState: e.loading ? "" : "paused",
        marginLeft: 0
      }
    }, null), o("span", {
      class: "loading_item",
      style: {
        animationPlayState: e.loading ? "" : "paused",
        animationDelay: "0.13s"
      }
    }, null), o("span", {
      class: "loading_item",
      style: {
        animationPlayState: e.loading ? "" : "paused",
        animationDelay: "0.26s"
      }
    }, null), o("span", {
      class: "loading_item",
      style: {
        animationPlayState: e.loading ? "" : "paused",
        animationDelay: "0.39s"
      }
    }, null), o("span", {
      class: "loading_item",
      style: {
        animationPlayState: e.loading ? "" : "paused",
        animationDelay: "0.52s"
      }
    }, null)])]), o("div", {
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
    }, [e.infoText]), o("div", {
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
    }, null), o("img", {
      class: "reset_",
      title: "刷新",
      onClick: W,
      src: "data:image/svg+xml;utf8,%3Csvg preserveAspectRatio='xMidYMid meet' viewBox='0 0 21 24' width='1em' height='1em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='%2343CF96' d='m7.5 21l2.999-3v1.5a7.501 7.501 0 0 0 5.299-12.811l2.114-2.124A10.465 10.465 0 0 1 21 12.002C21 17.8 16.3 22.5 10.502 22.5H10.5V24zM0 12C.007 6.204 4.704 1.507 10.499 1.5h.001V0l3 3l-3 3V4.5h-.002a7.502 7.502 0 0 0-5.299 12.812l-2.112 2.124a10.397 10.397 0 0 1-3.088-7.407v-.03v.002z'/%3E%3C/svg%3E"
    }, null)]), o("div", {
      class: "auth-control_"
    }, [o("div", {
      class: "range-box",
      style: {
        height: `${r.value}px`
      }
    }, [o("div", {
      class: "range-text"
    }, [a.sliderText]), o("div", {
      ref: u,
      class: "range-slider",
      style: {
        width: `${g.value}px`
      }
    }, [o("div", {
      class: `${e.mouseDown ? "range-btn isDown" : "range-btn"}`,
      style: {
        width: `${r.value}px`
      },
      onMousedown: M,
      onTouchstart: M
    }, [o("div", null, null), o("div", null, null), o("div", null, null)])])])])])]);
  }
});
export {
  te as YoungCmdPopup,
  ne as YoungContextMenu,
  ie as YoungSlideVerify,
  ae as YoungTab
};
//# sourceMappingURL=index.es.js.map
