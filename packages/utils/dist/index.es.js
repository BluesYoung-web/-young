const c = (e, t) => Object.prototype.toString.call(e) === `[object ${t.name}]`, h = (e) => c(e, Array), g = (e) => c(e, Object), b = (e) => c(e, Number), D = (e) => c(e, String), A = (e) => c(e, Boolean), F = (e) => c(e, Map), v = (e) => c(e, WeakMap), x = (e) => c(e, Set), H = (e) => c(e, WeakSet), k = (e) => c(e, ArrayBuffer), E = (e) => c(e, RegExp), T = (e) => c(e, Function), $ = (e) => c(e, Symbol), C = (e) => e === null, N = (e) => e === void 0, R = (e) => {
  if ([null, void 0, NaN, !1].includes(e) || typeof e != "object")
    return e;
  const t = h(e) ? [] : {}, n = [
    {
      parent: t,
      key: void 0,
      data: e
    }
  ];
  for (; n.length; ) {
    const { parent: s, key: o, data: r } = n.pop();
    let a = s;
    typeof o < "u" && (a = s[o] = h(r) ? [] : {});
    for (let [d, l] of Object.entries(r))
      typeof l == "object" && l !== null && ![Date, RegExp, Function].some((p) => l instanceof p) ? n.push({
        parent: a,
        key: d,
        data: l
      }) : a[d] = l;
  }
  return t;
}, O = (e, t = !1) => {
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
}, B = (e, t = "****") => {
  e = String(e);
  const n = e.substring(0, 3), s = e.substring(7, 11);
  return n + t + s;
}, L = (e, t = "*") => {
  const n = e.length;
  return n <= 2 ? e[0] + t : e[0] + t + e[n - 1];
}, P = (e, t = "********") => `${e.substr(0, 6)}${t}${e.substr(-4)}`;
function U(e, t = "Y-M-D h:m:s") {
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
const y = () => {
  const e = new Date(), t = e.getFullYear(), n = e.getMonth();
  return n === 0 ? (e.setFullYear(t - 1), e.setMonth(11)) : e.setMonth(n - 1), e.setDate(1), e.setHours(0, 0, 0, 0), e;
}, S = () => {
  const e = new Date();
  return e.setDate(1), e.setHours(0, 0, 0, 0), e;
}, f = () => {
  const e = new Date();
  e.setDate(e.getDate() - 1), e.setHours(0, 0, 0, 0);
  const t = new Date(e.getTime() + 1e3 * 60 * 60 * 24);
  return t.setHours(23, 59, 59), [e, t];
}, Z = () => [y(), f()[1]], q = () => [S(), f()[1]], W = (e, t = "-") => {
  let n = String(e).split("");
  return n.splice(4, 0, t), n.splice(7, 0, t), n.join("");
}, j = (e = 0, t = 0, n = 0) => {
  const s = new Date();
  return s.setDate(s.getDate() + 1), s.setHours(e, t, n), s;
}, I = [
  {
    text: "\u4ECA\u5929",
    value: (() => {
      const e = new Date();
      return [new Date(), e];
    })()
  },
  {
    text: "\u6628\u5929",
    value: (() => {
      const e = new Date(), t = new Date();
      return e.setTime(t.getTime() - 3600 * 1e3 * 24 * 1), t.setTime(t.getTime() - 3600 * 1e3 * 24 * 1), [t, e];
    })()
  },
  {
    text: "\u672C\u5468",
    value: (() => {
      const e = new Date(), t = new Date();
      var n = t.getDay() || 7;
      return t.setDate(t.getDate() - n + 1), [t, e];
    })()
  },
  {
    text: "\u4E0A\u5468",
    value: (() => {
      let e = new Date(), t = new Date(e.getTime() - 7 * 24 * 3600 * 1e3), n = new Date(e.getTime() - 7 * 24 * 3600 * 1e3), s = t.getDay(), o = t.getDate() - s + (s === 0 ? -6 : 1), r = new Date(t.setDate(o)), a = new Date(n.setDate(o + 6));
      return [r, a];
    })()
  },
  {
    text: "\u672C\u6708",
    value: (() => {
      const e = new Date(), t = new Date();
      return t.setDate(1), t.setHours(0), t.setSeconds(0), t.setMinutes(0), [t, e];
    })()
  },
  {
    text: "\u4E0A\u6708",
    value: (() => {
      let e = 864e5, t = new Date(), n = new Date(t.getFullYear(), t.getMonth() - 1, 1), o = new Date(t.getFullYear(), t.getMonth(), 1).getTime() - 1 * e, r = new Date(o);
      return [n, r];
    })()
  },
  {
    text: "\u6700\u8FD17\u5929",
    value: (() => {
      const e = new Date(), t = new Date();
      return t.setTime(t.getTime() - 3600 * 1e3 * 24 * 6), [t, e];
    })()
  },
  {
    text: "\u6700\u8FD130\u5929",
    value: (() => {
      const e = new Date(), t = new Date();
      return t.setTime(t.getTime() - 3600 * 1e3 * 24 * 30), [t, e];
    })()
  }
], z = (e) => {
  const t = new Date().setHours(23, 59, 59);
  return e.getTime() > t;
}, G = (e, t) => {
  let n = new Date(e, t - 1, 1), s = new Date(e, t, 0);
  return [
    n.getDate().toString().padStart(2, "0"),
    s.getDate().toString().padStart(2, "0")
  ];
}, J = async (e) => new Promise((t) => setTimeout(t, e * 1e3)), m = (e, t = "%") => {
  const n = [];
  return e.split(t).map((s) => {
    if (s) {
      const o = s.replace("u", "0x");
      o.length > 6 ? n.push(String.fromCharCode(+o.substr(0, 6)), decodeURIComponent(o.slice(6))) : o.length === 6 ? n.push(String.fromCharCode(+o)) : n.push(decodeURIComponent(o));
    }
  }), n.join("");
}, Y = (e) => e.includes("%u") ? m(e, "%") : e.includes("\\u") ? m(e, "\\") : decodeURIComponent(e), K = (e, t = {}) => {
  if (D(e))
    try {
      const n = JSON.parse(e);
      return g(n) || Array.isArray(n) ? n : t;
    } catch {
      return t;
    }
  return t;
}, X = (e) => e.indexOf("http") !== -1 ? e : `//${e}`, V = (e) => /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(e), Q = (e) => /^1[23456789]\d{9}$/.test(e), _ = (e) => /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w-.\/?%&=]*)?/.test(e), ee = (e) => /ws(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w-.\/?%&=]*)?/.test(e), te = (e) => !/Invalid|NaN/.test(new Date(e).toString()), ne = (e) => /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(new Date(e).toString()), se = (e) => /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(e + ""), oe = (e) => /^\d+$/.test(e + ""), re = (e) => /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(e + ""), ce = (e) => {
  const t = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/, n = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/;
  return e.length === 7 ? n.test(e) : e.length === 8 ? t.test(e) : !1;
}, ae = (e) => /^[\u4e00-\u9fa5]+$/gi.test(e), ie = (e) => /^[a-zA-Z]+$/.test(e), le = (e) => /^\d{3,4}-\d{7,8}(-\d{3,4})?$/.test(e), ue = (e) => {
  if (D(e))
    try {
      const t = JSON.parse(e);
      return !!(g(t) || Array.isArray(t));
    } catch {
      return !1;
    }
  return !1;
}, de = (e) => /^-?\d{1,3}(,\d{3})*(\.\d+)?$/.test(e), he = () => /MicroMessenger/gim.test(navigator.userAgent), me = () => !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), ge = () => {
  const e = navigator.userAgent;
  return e.indexOf("Android") > -1 || e.indexOf("Adr") > -1;
}, M = () => {
  const e = document.documentElement.scrollTop || document.body.scrollTop;
  e > 0 && (window.requestAnimationFrame(M), window.scrollTo(0, e - e / 8));
}, De = () => {
  window.scrollTo(0, document.documentElement.clientHeight);
}, fe = (e) => {
  var t;
  (t = document.querySelector(e)) == null || t.scrollIntoView({
    behavior: "smooth"
  });
}, we = () => {
  let e = 0, t = 0;
  return e = (document.compatMode == "BackCompat" ? document.body : document.documentElement).clientWidth, document.body.clientHeight && document.documentElement.clientHeight ? t = document.body.clientHeight < document.documentElement.clientHeight ? document.body.clientHeight : document.documentElement.clientHeight : t = document.body.clientHeight > document.documentElement.clientHeight ? document.body.clientHeight : document.documentElement.clientHeight, [e, t];
}, pe = async () => {
  let e = document.body;
  e.requestFullscreen ? await e.requestFullscreen() : e.mozRequestFullScreen ? await e.mozRequestFullScreen() : e.msRequestFullscreen ? await e.msRequestFullscreen() : e.webkitRequestFullscreen && await e.webkitRequestFullScreen();
}, ye = async () => {
  document.exitFullscreen ? document.exitFullscreen() : document.msExitFullscreen ? document.msExitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitExitFullscreen && document.webkitExitFullscreen();
};
function i(e) {
  ["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", "Tab"].includes(e.key) && e.preventDefault();
}
function w(e) {
  e.preventDefault();
}
const Se = (e = window) => {
  e.addEventListener("wheel", w, { passive: !1 }), e.addEventListener("keyup", i), e.addEventListener("keydown", i), e.addEventListener("keypress", i);
}, Me = (e = window) => {
  e.removeEventListener("wheel", w), e.removeEventListener("keyup", i), e.removeEventListener("keydown", i), e.removeEventListener("keypress", i);
}, be = () => "#" + (Math.random() * 1048575 * 1e6).toString(16).slice(0, 6), Ae = (e, t, n) => ((e << 16) + (t << 8) + n).toString(16).padStart(6, "0"), Fe = (e) => {
  let t = !1, n = e.slice(e.startsWith("#") ? 1 : 0);
  return n.length === 3 ? n = [...n].map((s) => s + s).join("") : n.length === 8 && (t = !0), n = parseInt(n, 16), `rgb${t ? "a" : ""}(${n >>> (t ? 24 : 16)}, ${(n & (t ? 16711680 : 65280)) >>> (t ? 16 : 8)}, ${(n & (t ? 65280 : 255)) >>> (t ? 8 : 0)}${t ? `, ${n & 255}` : ""})`;
}, ve = (e) => "#" + e.slice(e.length === 4 ? 1 : 0).split("").map((t) => t + t).join(""), xe = (e) => {
  var o, r;
  const [t, n, s] = (r = (o = e.match(/\d+/g)) == null ? void 0 : o.map((a) => +a)) != null ? r : [0, 0, 0];
  return { red: t, green: n, blue: s };
}, He = (e) => {
  var t, n;
  return (n = (t = e.match(/\d+/g)) == null ? void 0 : t.map((s) => +s)) != null ? n : [0, 0, 0];
}, ke = (e, t, n) => {
  e /= 255, t /= 255, n /= 255;
  const s = Math.max(e, t, n), o = s - Math.min(e, t, n), r = o === 0 ? 0 : o && s === e ? (t - n) / o : s === t ? 2 + (n - e) / o : 4 + (e - t) / o;
  return [60 * (r < 0 ? r + 6 : r), s && o / s * 100, s * 100];
}, Ee = (e, t, n) => {
  t /= 100, n /= 100;
  const s = (r) => (r + e / 60) % 6, o = (r) => n * (1 - t * Math.max(0, Math.min(s(r), 4 - s(r), 1)));
  return [255 * o(5), 255 * o(3), 255 * o(1)];
}, Te = (e, t, n) => {
  e /= 255, t /= 255, n /= 255;
  const s = Math.max(e, t, n), o = s - Math.min(e, t, n), r = o ? s === e ? (t - n) / o : s === t ? 2 + (n - e) / o : 4 + (e - t) / o : 0;
  return [
    60 * r < 0 ? 60 * r + 360 : 60 * r,
    100 * (o ? s <= 0.5 ? o / (2 * s - o) : o / (2 - (2 * s - o)) : 0),
    100 * (2 * s - o) / 2
  ];
}, $e = (e, t, n) => {
  t /= 100, n /= 100;
  const s = (a) => (a + e / 30) % 12, o = t * Math.min(n, 1 - n), r = (a) => n - o * Math.max(-1, Math.min(s(a) - 3, Math.min(9 - s(a), 1)));
  return [255 * r(0), 255 * r(8), 255 * r(4)];
};
export {
  Ee as HSBToRGB,
  $e as HSLToRGB,
  ke as RGBToHSB,
  Te as RGBToHSL,
  Ae as RGBToHex,
  R as deepClone,
  Se as disableScroll,
  Me as enableScroll,
  Y as encodedStrParse,
  ye as exitFullscreen,
  ve as extendHex,
  O as formatCurrency,
  U as formatDate,
  X as formatUrl,
  we as getClientHeight,
  G as getDateRange,
  Fe as hexToRGB,
  P as idMasaike,
  ge as isAndroid,
  h as isArray,
  k as isArrayBuffer,
  A as isBoolean,
  ae as isChinese,
  de as isCurrencyStr,
  te as isDate,
  se as isDecimal,
  z as isDisabledDate,
  V as isEmail,
  T as isFunction,
  _ as isHttpUrl,
  ne as isISODate,
  re as isIdCard,
  oe as isInteger,
  ue as isJsonStr,
  le as isLandline,
  ie as isLetter,
  ce as isLicensePlate,
  F as isMap,
  Q as isMobile,
  C as isNull,
  b as isNumber,
  g as isObject,
  E as isRegExp,
  x as isSet,
  D as isString,
  $ as isSymbol,
  N as isUndefined,
  he as isWeChat,
  v as isWeakMap,
  H as isWeakSet,
  ee as isWebSocketUrl,
  me as isiOS,
  y as lastMonthDay,
  L as nameMasaike,
  j as nextDay,
  be as randomHexColorCode,
  f as recentDay,
  Z as recentMonth,
  K as safeJsonParse,
  De as scrollToBottom,
  M as scrollToTop,
  I as shortcuts,
  J as sleep,
  fe as smoothScroll,
  B as telMasaike,
  q as thisMonth,
  S as thisMonthDay,
  pe as toFullScreen,
  He as toRGBArray,
  xe as toRGBObject,
  W as ymdParse
};
//# sourceMappingURL=index.es.js.map
