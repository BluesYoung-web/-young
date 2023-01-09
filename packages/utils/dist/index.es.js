const a = (e, t) => Object.prototype.toString.call(e) === `[object ${t.name}]`, m = (e) => a(e, Array), g = (e) => a(e, Object), b = (e) => a(e, Number), D = (e) => a(e, String), x = (e) => a(e, Boolean), A = (e) => a(e, Map), F = (e) => a(e, WeakMap), H = (e) => a(e, Set), T = (e) => a(e, WeakSet), E = (e) => a(e, ArrayBuffer), k = (e) => a(e, RegExp), $ = (e) => a(e, Function), C = (e) => a(e, Symbol), N = (e) => e === null, R = (e) => e === void 0, O = (e) => {
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
      typeof l == "object" && l !== null && ![Date, RegExp, Function].some((p) => l instanceof p) ? n.push({
        parent: c,
        key: d,
        data: l
      }) : c[d] = l;
  }
  return t;
}, L = (e, t = !1) => {
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
}, I = (e, t = "*") => {
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
}, J = [
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
      let e = new Date(), t = new Date(e.getTime() - 7 * 24 * 3600 * 1e3), n = new Date(e.getTime() - 7 * 24 * 3600 * 1e3), s = t.getDay(), o = t.getDate() - s + (s === 0 ? -6 : 1), r = new Date(t.setDate(o)), c = new Date(n.setDate(o + 6));
      return [r, c];
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
], Y = (e) => {
  const t = new Date().setHours(23, 59, 59);
  return e.getTime() > t;
}, z = (e, t) => {
  let n = new Date(e, t - 1, 1), s = new Date(e, t, 0);
  return [
    n.getDate().toString().padStart(2, "0"),
    s.getDate().toString().padStart(2, "0")
  ];
}, G = async (e) => new Promise((t) => setTimeout(t, e * 1e3)), h = (e, t = "%") => {
  const n = [];
  return e.split(t).map((s) => {
    if (s) {
      const o = s.replace("u", "0x");
      o.length > 6 ? n.push(String.fromCharCode(+o.substr(0, 6)), decodeURIComponent(o.slice(6))) : o.length === 6 ? n.push(String.fromCharCode(+o)) : n.push(decodeURIComponent(o));
    }
  }), n.join("");
}, K = (e) => e.includes("%u") ? h(e, "%") : e.includes("\\u") ? h(e, "\\") : decodeURIComponent(e), X = (e, t = {}) => {
  if (D(e))
    try {
      const n = JSON.parse(e);
      return g(n) || Array.isArray(n) ? n : t;
    } catch {
      return t;
    }
  return t;
}, V = (e) => e.indexOf("http") !== -1 ? e : `//${e}`, Q = () => Math.random().toString(36).slice(8), _ = (e) => /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(e), ee = (e) => /^1[23456789]\d{9}$/.test(e), te = (e) => /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w-.\/?%&=]*)?/.test(e), ne = (e) => /ws(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w-.\/?%&=]*)?/.test(e), se = (e) => !/Invalid|NaN/.test(new Date(e).toString()), oe = (e) => /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(new Date(e).toString()), re = (e) => /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(e + ""), ae = (e) => /^\d+$/.test(e + ""), ce = (e) => /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(e + ""), ie = (e) => {
  const t = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/, n = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/;
  return e.length === 7 ? n.test(e) : e.length === 8 ? t.test(e) : !1;
}, le = (e) => /^[\u4e00-\u9fa5]+$/gi.test(e), ue = (e) => /^[a-zA-Z]+$/.test(e), de = (e) => /^\d{3,4}-\d{7,8}(-\d{3,4})?$/.test(e), me = (e) => {
  if (D(e))
    try {
      const t = JSON.parse(e);
      return !!(g(t) || Array.isArray(t));
    } catch {
      return !1;
    }
  return !1;
}, he = (e) => /^-?\d{1,3}(,\d{3})*(\.\d+)?$/.test(e), ge = () => /MicroMessenger/gim.test(navigator.userAgent), De = () => !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), fe = () => {
  const e = navigator.userAgent;
  return e.indexOf("Android") > -1 || e.indexOf("Adr") > -1;
}, M = () => {
  const e = document.documentElement.scrollTop || document.body.scrollTop;
  e > 0 && (window.requestAnimationFrame(M), window.scrollTo(0, e - e / 8));
}, we = () => {
  window.scrollTo(0, document.documentElement.clientHeight);
}, pe = (e) => {
  var t;
  (t = document.querySelector(e)) == null || t.scrollIntoView({
    behavior: "smooth"
  });
}, ye = () => {
  let e = 0, t = 0;
  return e = (document.compatMode == "BackCompat" ? document.body : document.documentElement).clientWidth, document.body.clientHeight && document.documentElement.clientHeight ? t = document.body.clientHeight < document.documentElement.clientHeight ? document.body.clientHeight : document.documentElement.clientHeight : t = document.body.clientHeight > document.documentElement.clientHeight ? document.body.clientHeight : document.documentElement.clientHeight, [e, t];
}, Se = async () => {
  let e = document.body;
  e.requestFullscreen ? await e.requestFullscreen() : e.mozRequestFullScreen ? await e.mozRequestFullScreen() : e.msRequestFullscreen ? await e.msRequestFullscreen() : e.webkitRequestFullscreen && await e.webkitRequestFullScreen();
}, Me = async () => {
  document.exitFullscreen ? document.exitFullscreen() : document.msExitFullscreen ? document.msExitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitExitFullscreen && document.webkitExitFullscreen();
};
function i(e) {
  ["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", "Tab"].includes(e.key) && e.preventDefault();
}
function w(e) {
  e.preventDefault();
}
const ve = (e = window) => {
  e.addEventListener("wheel", w, { passive: !1 }), e.addEventListener("keyup", i), e.addEventListener("keydown", i), e.addEventListener("keypress", i);
}, be = (e = window) => {
  e.removeEventListener("wheel", w), e.removeEventListener("keyup", i), e.removeEventListener("keydown", i), e.removeEventListener("keypress", i);
}, xe = () => "#" + (Math.random() * 1048575 * 1e6).toString(16).slice(0, 6), Ae = (e, t, n) => ((e << 16) + (t << 8) + n).toString(16).padStart(6, "0"), Fe = (e) => {
  let t = !1, n = e.slice(e.startsWith("#") ? 1 : 0);
  return n.length === 3 ? n = [...n].map((s) => s + s).join("") : n.length === 8 && (t = !0), n = parseInt(n, 16), `rgb${t ? "a" : ""}(${n >>> (t ? 24 : 16)}, ${(n & (t ? 16711680 : 65280)) >>> (t ? 16 : 8)}, ${(n & (t ? 65280 : 255)) >>> (t ? 8 : 0)}${t ? `, ${n & 255}` : ""})`;
}, He = (e) => "#" + e.slice(e.length === 4 ? 1 : 0).split("").map((t) => t + t).join(""), Te = (e) => {
  var o, r;
  const [t, n, s] = (r = (o = e.match(/\d+/g)) == null ? void 0 : o.map((c) => +c)) != null ? r : [0, 0, 0];
  return { red: t, green: n, blue: s };
}, Ee = (e) => {
  var t, n;
  return (n = (t = e.match(/\d+/g)) == null ? void 0 : t.map((s) => +s)) != null ? n : [0, 0, 0];
}, ke = (e, t, n) => {
  e /= 255, t /= 255, n /= 255;
  const s = Math.max(e, t, n), o = s - Math.min(e, t, n), r = o === 0 ? 0 : o && s === e ? (t - n) / o : s === t ? 2 + (n - e) / o : 4 + (e - t) / o;
  return [60 * (r < 0 ? r + 6 : r), s && o / s * 100, s * 100];
}, $e = (e, t, n) => {
  t /= 100, n /= 100;
  const s = (r) => (r + e / 60) % 6, o = (r) => n * (1 - t * Math.max(0, Math.min(s(r), 4 - s(r), 1)));
  return [255 * o(5), 255 * o(3), 255 * o(1)];
}, Ce = (e, t, n) => {
  e /= 255, t /= 255, n /= 255;
  const s = Math.max(e, t, n), o = s - Math.min(e, t, n), r = o ? s === e ? (t - n) / o : s === t ? 2 + (n - e) / o : 4 + (e - t) / o : 0;
  return [
    60 * r < 0 ? 60 * r + 360 : 60 * r,
    100 * (o ? s <= 0.5 ? o / (2 * s - o) : o / (2 - (2 * s - o)) : 0),
    100 * (2 * s - o) / 2
  ];
}, Ne = (e, t, n) => {
  t /= 100, n /= 100;
  const s = (c) => (c + e / 30) % 12, o = t * Math.min(n, 1 - n), r = (c) => n - o * Math.max(-1, Math.min(s(c) - 3, Math.min(9 - s(c), 1)));
  return [255 * r(0), 255 * r(8), 255 * r(4)];
};
class v {
}
class Re extends v {
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
    if (!!n)
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
  $e as HSBToRGB,
  Ne as HSLToRGB,
  ke as RGBToHSB,
  Ce as RGBToHSL,
  Ae as RGBToHex,
  Re as YoungLocalStorage,
  v as YoungStorage,
  O as deepClone,
  ve as disableScroll,
  be as enableScroll,
  K as encodedStrParse,
  Me as exitFullscreen,
  He as extendHex,
  L as formatCurrency,
  U as formatDate,
  V as formatUrl,
  ye as getClientHeight,
  z as getDateRange,
  Fe as hexToRGB,
  P as idMasaike,
  fe as isAndroid,
  m as isArray,
  E as isArrayBuffer,
  x as isBoolean,
  le as isChinese,
  he as isCurrencyStr,
  se as isDate,
  re as isDecimal,
  Y as isDisabledDate,
  _ as isEmail,
  $ as isFunction,
  te as isHttpUrl,
  oe as isISODate,
  ce as isIdCard,
  ae as isInteger,
  me as isJsonStr,
  de as isLandline,
  ue as isLetter,
  ie as isLicensePlate,
  A as isMap,
  ee as isMobile,
  N as isNull,
  b as isNumber,
  g as isObject,
  k as isRegExp,
  H as isSet,
  D as isString,
  C as isSymbol,
  R as isUndefined,
  ge as isWeChat,
  F as isWeakMap,
  T as isWeakSet,
  ne as isWebSocketUrl,
  De as isiOS,
  y as lastMonthDay,
  I as nameMasaike,
  j as nextDay,
  xe as randomHexColorCode,
  Q as randomId,
  f as recentDay,
  Z as recentMonth,
  X as safeJsonParse,
  we as scrollToBottom,
  M as scrollToTop,
  J as shortcuts,
  G as sleep,
  pe as smoothScroll,
  B as telMasaike,
  q as thisMonth,
  S as thisMonthDay,
  Se as toFullScreen,
  Ee as toRGBArray,
  Te as toRGBObject,
  W as ymdParse
};
//# sourceMappingURL=index.es.js.map
