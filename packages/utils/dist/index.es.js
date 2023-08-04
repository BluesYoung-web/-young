const a = (e, t) => Object.prototype.toString.call(e) === `[object ${t.name}]`, m = (e) => a(e, Array), g = (e) => a(e, Object), H = (e) => a(e, Number), f = (e) => a(e, String), A = (e) => a(e, Boolean), T = (e) => a(e, Map), k = (e) => a(e, WeakMap), E = (e) => a(e, Set), $ = (e) => a(e, WeakSet), N = (e) => a(e, ArrayBuffer), C = (e) => a(e, RegExp), R = (e) => a(e, Function), O = (e) => a(e, Symbol), L = (e) => e === null, B = (e) => e === void 0, I = (e) => {
  if ([null, void 0, NaN, !1].includes(e) || typeof e != "object")
    return e;
  const t = m(e) ? [] : {}, n = [
    {
      parent: t,
      key: void 0,
      data: e
    }
  ];
  for (; n.length; ) {
    const { parent: s, key: o, data: r } = n.pop();
    let c = s;
    typeof o < "u" && (c = s[o] = m(r) ? [] : {});
    for (let [d, l] of Object.entries(r))
      typeof l == "object" && l !== null && ![Date, RegExp, Function].some((y) => l instanceof y) ? n.push({
        parent: c,
        key: d,
        data: l
      }) : c[d] = l;
  }
  return t;
};
function D(e) {
  return +e || 0;
}
function S(e) {
  return (D(e) / 100).toFixed(2);
}
function P(e) {
  return D(e) * 100;
}
function U(e, t = !1) {
  return M(S(e), t);
}
const M = (e, t = !1) => {
  if (e) {
    if (e = e.toString().replace(/\$|\,/g, ""), e === "" || isNaN(+e))
      return "Not a Number !";
    let n = e.indexOf("-") === 0 ? "-" : t ? "+" : "", s = e.indexOf(".") > 0 ? e.substr(e.indexOf(".")) : "";
    if (s = s.length > 1 ? s : "", e = e.indexOf(".") > 0 ? e.substring(0, e.indexOf(".")) : e, e = Math.abs(+e).toString(), s === "") {
      if (e.length > 1 && e.substr(0, 1) === "0")
        return "Not a Number !";
    } else if (e.length > 1 && e.substr(0, 1) === "0")
      return "Not a Number !";
    for (let o = 0; o < Math.floor((e.length - (1 + o)) / 3); o++)
      e = e.substring(0, e.length - (4 * o + 3)) + "," + e.substring(e.length - (4 * o + 3));
    return n + e + s;
  } else
    return "0";
}, W = (e, t = "****") => {
  e = String(e);
  const n = e.substring(0, 3), s = e.substring(7, 11);
  return n + t + s;
}, Z = (e, t = "*") => {
  const n = e.length;
  return n <= 2 ? e[0] + t : e[0] + t + e[n - 1];
}, q = (e, t = "********") => `${e.substr(0, 6)}${t}${e.substr(-4)}`;
function j(e, t = "Y-M-D h:m:s") {
  const n = ["Y", "M", "D", "h", "m", "s"], s = [], o = new Date(e);
  s.push(o.getFullYear()), s.push(u(o.getMonth() + 1)), s.push(u(o.getDate())), s.push(u(o.getHours())), s.push(u(o.getMinutes())), s.push(u(o.getSeconds()));
  for (const r in s)
    t = t.replace(n[r], s[r] + "");
  return t;
}
function u(e) {
  let t = e.toString();
  return t[1] ? t : "0" + t;
}
const v = () => {
  const e = new Date(), t = e.getFullYear(), n = e.getMonth();
  return n === 0 ? (e.setFullYear(t - 1), e.setMonth(11)) : e.setMonth(n - 1), e.setDate(1), e.setHours(0, 0, 0, 0), e;
}, b = () => {
  const e = new Date();
  return e.setDate(1), e.setHours(0, 0, 0, 0), e;
}, w = () => {
  const e = new Date();
  e.setDate(e.getDate() - 1), e.setHours(0, 0, 0, 0);
  const t = new Date(e.getTime() + 1e3 * 60 * 60 * 24);
  return t.setHours(23, 59, 59), [e, t];
}, J = () => [v(), w()[1]], Y = () => [b(), w()[1]], z = (e, t = "-") => {
  let n = String(e).split("");
  return n.splice(4, 0, t), n.splice(7, 0, t), n.join("");
}, G = (e = 0, t = 0, n = 0) => {
  const s = new Date();
  return s.setDate(s.getDate() + 1), s.setHours(e, t, n), s;
}, K = [
  {
    text: "今天",
    value: (() => {
      const e = new Date();
      return [new Date(), e];
    })()
  },
  {
    text: "昨天",
    value: (() => {
      const e = new Date(), t = new Date();
      return e.setTime(t.getTime() - 3600 * 1e3 * 24 * 1), t.setTime(t.getTime() - 3600 * 1e3 * 24 * 1), [t, e];
    })()
  },
  {
    text: "本周",
    value: (() => {
      const e = new Date(), t = new Date();
      var n = t.getDay() || 7;
      return t.setDate(t.getDate() - n + 1), [t, e];
    })()
  },
  {
    text: "上周",
    value: (() => {
      let e = new Date(), t = new Date(e.getTime() - 7 * 24 * 3600 * 1e3), n = new Date(e.getTime() - 7 * 24 * 3600 * 1e3), s = t.getDay(), o = t.getDate() - s + (s === 0 ? -6 : 1), r = new Date(t.setDate(o)), c = new Date(n.setDate(o + 6));
      return [r, c];
    })()
  },
  {
    text: "本月",
    value: (() => {
      const e = new Date(), t = new Date();
      return t.setDate(1), t.setHours(0), t.setSeconds(0), t.setMinutes(0), [t, e];
    })()
  },
  {
    text: "上月",
    value: (() => {
      let e = 864e5, t = new Date(), n = new Date(t.getFullYear(), t.getMonth() - 1, 1), o = new Date(t.getFullYear(), t.getMonth(), 1).getTime() - 1 * e, r = new Date(o);
      return [n, r];
    })()
  },
  {
    text: "最近7天",
    value: (() => {
      const e = new Date(), t = new Date();
      return t.setTime(t.getTime() - 3600 * 1e3 * 24 * 6), [t, e];
    })()
  },
  {
    text: "最近30天",
    value: (() => {
      const e = new Date(), t = new Date();
      return t.setTime(t.getTime() - 3600 * 1e3 * 24 * 30), [t, e];
    })()
  }
], X = (e) => {
  const t = new Date().setHours(23, 59, 59);
  return e.getTime() > t;
}, V = (e, t) => {
  let n = new Date(e, t - 1, 1), s = new Date(e, t, 0);
  return [
    n.getDate().toString().padStart(2, "0"),
    s.getDate().toString().padStart(2, "0")
  ];
}, Q = async (e) => new Promise((t) => setTimeout(t, e * 1e3)), h = (e, t = "%") => {
  const n = [];
  return e.split(t).map((s) => {
    if (s) {
      const o = s.replace("u", "0x");
      o.length > 6 ? n.push(String.fromCharCode(+o.substr(0, 6)), decodeURIComponent(o.slice(6))) : o.length === 6 ? n.push(String.fromCharCode(+o)) : n.push(decodeURIComponent(o));
    }
  }), n.join("");
}, _ = (e) => e.includes("%u") ? h(e, "%") : e.includes("\\u") ? h(e, "\\") : decodeURIComponent(e), ee = (e, t = {}) => {
  if (f(e))
    try {
      const n = JSON.parse(e);
      return g(n) || Array.isArray(n) ? n : t;
    } catch {
      return t;
    }
  return t;
}, te = (e) => e.indexOf("http") !== -1 ? e : `//${e}`, ne = () => Math.random().toString(36).slice(8), se = (e) => /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(e), oe = (e) => /^1[23456789]\d{9}$/.test(e), re = (e) => /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w-.\/?%&=]*)?/.test(e), ae = (e) => /ws(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w-.\/?%&=]*)?/.test(e), ce = (e) => !/Invalid|NaN/.test(new Date(e).toString()), ie = (e) => /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(new Date(e).toString()), le = (e) => /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(e + ""), ue = (e) => /^\d+$/.test(e + ""), de = (e) => /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(e + ""), me = (e) => {
  const t = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/, n = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/;
  return e.length === 7 ? n.test(e) : e.length === 8 ? t.test(e) : !1;
}, he = (e) => /^[\u4e00-\u9fa5]+$/gi.test(e), ge = (e) => /^[a-zA-Z]+$/.test(e), fe = (e) => /^\d{3,4}-\d{7,8}(-\d{3,4})?$/.test(e), De = (e) => {
  if (f(e))
    try {
      const t = JSON.parse(e);
      return !!(g(t) || Array.isArray(t));
    } catch {
      return !1;
    }
  return !1;
}, we = (e) => /^-?\d{1,3}(,\d{3})*(\.\d+)?$/.test(e), pe = () => /MicroMessenger/gim.test(navigator.userAgent), ye = () => !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), Se = () => {
  const e = navigator.userAgent;
  return e.indexOf("Android") > -1 || e.indexOf("Adr") > -1;
}, x = () => {
  const e = document.documentElement.scrollTop || document.body.scrollTop;
  e > 0 && (window.requestAnimationFrame(x), window.scrollTo(0, e - e / 8));
}, Me = () => {
  window.scrollTo(0, document.documentElement.clientHeight);
}, ve = (e) => {
  var t;
  (t = document.querySelector(e)) == null || t.scrollIntoView({
    behavior: "smooth"
  });
}, be = () => {
  let e = 0, t = 0;
  return e = (document.compatMode == "BackCompat" ? document.body : document.documentElement).clientWidth, document.body.clientHeight && document.documentElement.clientHeight ? t = document.body.clientHeight < document.documentElement.clientHeight ? document.body.clientHeight : document.documentElement.clientHeight : t = document.body.clientHeight > document.documentElement.clientHeight ? document.body.clientHeight : document.documentElement.clientHeight, [e, t];
}, xe = async () => {
  let e = document.body;
  e.requestFullscreen ? await e.requestFullscreen() : e.mozRequestFullScreen ? await e.mozRequestFullScreen() : e.msRequestFullscreen ? await e.msRequestFullscreen() : e.webkitRequestFullscreen && await e.webkitRequestFullScreen();
}, Fe = async () => {
  document.exitFullscreen ? document.exitFullscreen() : document.msExitFullscreen ? document.msExitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitExitFullscreen && document.webkitExitFullscreen();
};
function i(e) {
  ["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", "Tab"].includes(e.key) && e.preventDefault();
}
function p(e) {
  e.preventDefault();
}
const He = (e = window) => {
  e.addEventListener("wheel", p, { passive: !1 }), e.addEventListener("keyup", i), e.addEventListener("keydown", i), e.addEventListener("keypress", i);
}, Ae = (e = window) => {
  e.removeEventListener("wheel", p), e.removeEventListener("keyup", i), e.removeEventListener("keydown", i), e.removeEventListener("keypress", i);
}, Te = () => "#" + (Math.random() * 1048575 * 1e6).toString(16).slice(0, 6), ke = (e, t, n) => ((e << 16) + (t << 8) + n).toString(16).padStart(6, "0"), Ee = (e) => {
  let t = !1, n = e.slice(e.startsWith("#") ? 1 : 0);
  return n.length === 3 ? n = [...n].map((s) => s + s).join("") : n.length === 8 && (t = !0), n = parseInt(n, 16), `rgb${t ? "a" : ""}(${n >>> (t ? 24 : 16)}, ${(n & (t ? 16711680 : 65280)) >>> (t ? 16 : 8)}, ${(n & (t ? 65280 : 255)) >>> (t ? 8 : 0)}${t ? `, ${n & 255}` : ""})`;
}, $e = (e) => "#" + e.slice(e.length === 4 ? 1 : 0).split("").map((t) => t + t).join(""), Ne = (e) => {
  var o;
  const [t, n, s] = ((o = e.match(/\d+/g)) == null ? void 0 : o.map((r) => +r)) ?? [0, 0, 0];
  return { red: t, green: n, blue: s };
}, Ce = (e) => {
  var t;
  return ((t = e.match(/\d+/g)) == null ? void 0 : t.map((n) => +n)) ?? [0, 0, 0];
}, Re = (e, t, n) => {
  e /= 255, t /= 255, n /= 255;
  const s = Math.max(e, t, n), o = s - Math.min(e, t, n), r = o === 0 ? 0 : o && s === e ? (t - n) / o : s === t ? 2 + (n - e) / o : 4 + (e - t) / o;
  return [60 * (r < 0 ? r + 6 : r), s && o / s * 100, s * 100];
}, Oe = (e, t, n) => {
  t /= 100, n /= 100;
  const s = (r) => (r + e / 60) % 6, o = (r) => n * (1 - t * Math.max(0, Math.min(s(r), 4 - s(r), 1)));
  return [255 * o(5), 255 * o(3), 255 * o(1)];
}, Le = (e, t, n) => {
  e /= 255, t /= 255, n /= 255;
  const s = Math.max(e, t, n), o = s - Math.min(e, t, n), r = o ? s === e ? (t - n) / o : s === t ? 2 + (n - e) / o : 4 + (e - t) / o : 0;
  return [
    60 * r < 0 ? 60 * r + 360 : 60 * r,
    100 * (o ? s <= 0.5 ? o / (2 * s - o) : o / (2 - (2 * s - o)) : 0),
    100 * (2 * s - o) / 2
  ];
}, Be = (e, t, n) => {
  t /= 100, n /= 100;
  const s = (c) => (c + e / 30) % 12, o = t * Math.min(n, 1 - n), r = (c) => n - o * Math.max(-1, Math.min(s(c) - 3, Math.min(9 - s(c), 1)));
  return [255 * r(0), 255 * r(8), 255 * r(4)];
};
class F {
}
class Ie extends F {
  /**
   * 存储
   * @param key 键名
   * @param value 键值
   * @param exp 过期时间(天)，默认 1 天后
   */
  set(t, n, s = 1) {
    localStorage.setItem(
      t,
      JSON.stringify({
        exp: new Date(Date.now() + 1e3 * 3600 * 24 * s).getTime(),
        data: n
      })
    );
  }
  remove(t) {
    localStorage.removeItem(t);
  }
  get(t) {
    const n = localStorage.getItem(t);
    if (n)
      try {
        const { exp: s, data: o } = JSON.parse(n);
        if (Date.now() < s)
          return o;
        this.remove(t);
        return;
      } catch {
        this.remove(t);
        return;
      }
  }
}
export {
  Oe as HSBToRGB,
  Be as HSLToRGB,
  Re as RGBToHSB,
  Le as RGBToHSL,
  ke as RGBToHex,
  Ie as YoungLocalStorage,
  F as YoungStorage,
  I as deepClone,
  He as disableScroll,
  Ae as enableScroll,
  _ as encodedStrParse,
  Fe as exitFullscreen,
  $e as extendHex,
  S as fen2yuan,
  U as fen2yuanWithCurrency,
  M as formatCurrency,
  j as formatDate,
  te as formatUrl,
  be as getClientHeight,
  V as getDateRange,
  Ee as hexToRGB,
  q as idMasaike,
  Se as isAndroid,
  m as isArray,
  N as isArrayBuffer,
  A as isBoolean,
  he as isChinese,
  we as isCurrencyStr,
  ce as isDate,
  le as isDecimal,
  X as isDisabledDate,
  se as isEmail,
  R as isFunction,
  re as isHttpUrl,
  ie as isISODate,
  de as isIdCard,
  ue as isInteger,
  De as isJsonStr,
  fe as isLandline,
  ge as isLetter,
  me as isLicensePlate,
  T as isMap,
  oe as isMobile,
  L as isNull,
  H as isNumber,
  g as isObject,
  C as isRegExp,
  E as isSet,
  f as isString,
  O as isSymbol,
  B as isUndefined,
  pe as isWeChat,
  k as isWeakMap,
  $ as isWeakSet,
  ae as isWebSocketUrl,
  ye as isiOS,
  v as lastMonthDay,
  Z as nameMasaike,
  G as nextDay,
  D as polyfillNumber,
  Te as randomHexColorCode,
  ne as randomId,
  w as recentDay,
  J as recentMonth,
  ee as safeJsonParse,
  Me as scrollToBottom,
  x as scrollToTop,
  K as shortcuts,
  Q as sleep,
  ve as smoothScroll,
  W as telMasaike,
  Y as thisMonth,
  b as thisMonthDay,
  xe as toFullScreen,
  Ce as toRGBArray,
  Ne as toRGBObject,
  z as ymdParse,
  P as yuan2fen
};
//# sourceMappingURL=index.es.js.map
