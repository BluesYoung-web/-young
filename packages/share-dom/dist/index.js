var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  Detector: () => Detector,
  copy: () => copy,
  detector: () => d,
  ua: () => ua
});
module.exports = __toCommonJS(src_exports);

// src/utils/copy.ts
function select(element) {
  let selectedText;
  if (element.nodeName === "SELECT") {
    element.focus();
    selectedText = element.value;
  } else if (element.nodeName === "INPUT" || element.nodeName === "TEXTAREA") {
    var isReadOnly = element.hasAttribute("readonly");
    if (!isReadOnly) {
      element.setAttribute("readonly", "");
    }
    element.select();
    element.setSelectionRange(0, element.value.length);
    if (!isReadOnly) {
      element.removeAttribute("readonly");
    }
    selectedText = element.value;
  } else {
    if (element.hasAttribute("contenteditable")) {
      element.focus();
    }
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(element);
    selection.removeAllRanges();
    selection.addRange(range);
    selectedText = selection.toString();
  }
  return selectedText;
}
function copy(text, options) {
  let debug, fakeElem, success = false;
  options = options || {};
  debug = options.debug || false;
  try {
    const isRTL = document.documentElement.getAttribute("dir") == "rtl";
    fakeElem = document.createElement("textarea");
    fakeElem.style.fontSize = "12pt";
    fakeElem.style.border = "0";
    fakeElem.style.padding = "0";
    fakeElem.style.margin = "0";
    fakeElem.style.position = "absolute";
    fakeElem.style[isRTL ? "right" : "left"] = "-9999px";
    let yPosition = window.pageYOffset || document.documentElement.scrollTop;
    fakeElem.style.top = `${yPosition}px`;
    fakeElem.setAttribute("readonly", "");
    fakeElem.value = text;
    document.body.appendChild(fakeElem);
    select(fakeElem);
    let successful = document.execCommand("copy");
    if (!successful) {
      throw new Error("copy command was unsuccessful");
    }
    success = true;
  } catch (err) {
    debug && console.error("unable to copy using execCommand: ", err);
    debug && console.warn("trying IE specific stuff");
    try {
      window.clipboardData.setData("text", text);
      success = true;
    } catch (err2) {
      debug && console.error("unable to copy using clipboardData: ", err2);
    }
  } finally {
    if (fakeElem) {
      document.body.removeChild(fakeElem);
    }
  }
  return success;
}

// src/utils/detector.ts
function typeOf(type) {
  return function(object) {
    return Object.prototype.toString.call(object) === "[object " + type + "]";
  };
}
function each(object, factory) {
  for (let i = 0, l = object.length; i < l; i++) {
    if (factory.call(object, object[i], i) === false) {
      break;
    }
  }
}
var Detector = class {
  constructor(rules) {
    this._rules = rules;
  }
  _detect(name, expression, ua2) {
    const expr = typeOf("Function")(expression) ? expression.call(null, ua2) : expression;
    if (!expr) {
      return null;
    }
    const info = {
      name,
      version: "0",
      codename: ""
    };
    if (expr === true) {
      return info;
    } else if (typeOf("String")(expr)) {
      if (ua2.indexOf(expr) !== -1) {
        return info;
      }
    } else if (typeOf("Object")(expr)) {
      if (expr.hasOwnProperty("version")) {
        info.version = expr.version;
      }
      return info;
    } else if (typeOf("RegExp")(expr)) {
      const m = expr.exec(ua2);
      if (m) {
        if (m.length >= 2 && m[1]) {
          info.version = m[1].replace(/_/g, ".");
        }
        return info;
      }
    }
  }
  _parseItem(ua2, patterns, factory, detector2) {
    let self = this;
    let detected = {
      name: "na",
      version: "0"
    };
    each(patterns, function(pattern) {
      const d2 = self._detect(pattern[0], pattern[1], ua2);
      if (d2) {
        detected = d2;
        return false;
      }
    });
    factory.call(detector2, detected.name, detected.version);
  }
  parse(ua2) {
    ua2 = (ua2 || "").toLowerCase();
    const d2 = {};
    this._parseItem(ua2, this._rules.os, function(name, version) {
      const v = parseFloat(version);
      d2.os = {
        name,
        version: v,
        fullVersion: version
      };
      d2.os[name] = v;
    }, d2);
    this._parseItem(ua2, this._rules.browser, function(name, version) {
      let mode = version;
      const v = parseFloat(version);
      d2.browser = {
        name,
        version: v,
        fullVersion: version,
        mode: parseFloat(mode),
        fullMode: mode
      };
      d2.browser[name] = v;
    }, d2);
    return d2;
  }
};
var OS = [
  ["ios", function(ua2) {
    if (/\bcpu(?: iphone)? os /.test(ua2)) {
      return /\bcpu(?: iphone)? os ([0-9._]+)/;
    } else if (ua2.indexOf("iph os ") !== -1) {
      return /\biph os ([0-9_]+)/;
    } else {
      return /\bios\b/;
    }
  }],
  ["android", function(ua2) {
    if (ua2.indexOf("android") >= 0) {
      return /\bandroid[ \/-]?([0-9.x]+)?/;
    } else if (ua2.indexOf("adr") >= 0) {
      if (ua2.indexOf("mqqbrowser") >= 0) {
        return /\badr[ ]\(linux; u; ([0-9.]+)?/;
      } else {
        return /\badr(?:[ ]([0-9.]+))?/;
      }
    }
    return "android";
  }],
  ["wp", function(ua2) {
    if (ua2.indexOf("windows phone ") !== -1) {
      return /\bwindows phone (?:os )?([0-9.]+)/;
    } else if (ua2.indexOf("xblwp") !== -1) {
      return /\bxblwp([0-9.]+)/;
    } else if (ua2.indexOf("zunewp") !== -1) {
      return /\bzunewp([0-9.]+)/;
    }
    return "windows phone";
  }],
  ["symbian", /\bsymbian(?:os)?\/([0-9.]+)/],
  ["chromeos", /\bcros i686 ([0-9.]+)/],
  ["linux", "linux"],
  ["windowsce", /\bwindows ce(?: ([0-9.]+))?/]
];
var BROWSER = [
  ["micromessenger", /\bmicromessenger\/([\d.]+)/],
  ["qq", /\bqq/i],
  ["qzone", /qzone\/.*_qz_([\d.]+)/i],
  ["qqbrowser", /\bm?qqbrowser\/([0-9.]+)/],
  ["tt", /\btencenttraveler ([0-9.]+)/],
  ["weibo", /weibo__([0-9.]+)/],
  ["uc", function(ua2) {
    if (ua2.indexOf("ucbrowser/") >= 0) {
      return /\bucbrowser\/([0-9.]+)/;
    } else if (ua2.indexOf("ubrowser/") >= 0) {
      return /\bubrowser\/([0-9.]+)/;
    } else if (/\buc\/[0-9]/.test(ua2)) {
      return /\buc\/([0-9.]+)/;
    } else if (ua2.indexOf("ucweb") >= 0) {
      return /\bucweb([0-9.]+)?/;
    } else {
      return /\b(?:ucbrowser|uc)\b/;
    }
  }],
  ["360", function(ua2) {
    if (ua2.indexOf("360 aphone browser") !== -1) {
      return /\b360 aphone browser \(([^\)]+)\)/;
    }
    return /\b360(?:se|ee|chrome|browser)\b/;
  }],
  [
    "baidu",
    function(ua2) {
      let back = 0;
      let a;
      if (/ baiduboxapp\//i.test(ua2)) {
        if (a = /([\d+.]+)_(?:diordna|enohpi)_/.exec(ua2)) {
          a = a[1].split(".");
          back = a.reverse().join(".");
        } else if (a = /baiduboxapp\/([\d+.]+)/.exec(ua2)) {
          back = a[1];
        }
        return {
          version: back
        };
      }
      return false;
    }
  ],
  ["baidubrowser", /\b(?:ba?idubrowser|baiduhd)[ \/]([0-9.x]+)/],
  ["bdminivideo", /bdminivideo\/([0-9.]+)/],
  ["sogou", function(ua2) {
    if (ua2.indexOf("sogoumobilebrowser") >= 0) {
      return /sogoumobilebrowser\/([0-9.]+)/;
    } else if (ua2.indexOf("sogoumse") >= 0) {
      return true;
    }
    return / se ([0-9.x]+)/;
  }],
  ["ali-ap", function(ua2) {
    if (ua2.indexOf("aliapp") > 0) {
      return /\baliapp\(ap\/([0-9.]+)\)/;
    } else {
      return /\balipayclient\/([0-9.]+)\b/;
    }
  }],
  ["ali-tb", /\baliapp\(tb\/([0-9.]+)\)/],
  ["ali-tm", /\baliapp\(tm\/([0-9.]+)\)/],
  ["tao", /\btaobrowser\/([0-9.]+)/],
  ["mi", /\bmiuibrowser\/([0-9.]+)/],
  ["oppo", /\boppobrowser\/([0-9.]+)/],
  ["vivo", /\bvivobrowser\/([0-9.]+)/],
  ["meizu", /\bmzbrowser\/([0-9.]+)/],
  ["nokia", /\bnokiabrowser\/([0-9.]+)/],
  ["samsung", /\bsamsungbrowser\/([0-9.]+)/],
  ["maxthon", /\b(?:maxthon|mxbrowser)(?:[ \/]([0-9.]+))?/],
  ["opera", function(ua2) {
    const re_opera_old = /\bopera.+version\/([0-9.ab]+)/;
    const re_opera_new = /\bopr\/([0-9.]+)/;
    return re_opera_old.test(ua2) ? re_opera_old : re_opera_new;
  }],
  ["edge", /edge\/([0-9.]+)/],
  ["firefox", /\bfirefox\/([0-9.ab]+)/],
  ["chrome", / (?:chrome|crios|crmo)\/([0-9.]+)/],
  ["android", function(ua2) {
    if (ua2.indexOf("android") === -1) {
      return;
    }
    return /\bversion\/([0-9.]+(?: beta)?)/;
  }],
  ["safari", /\bversion\/([0-9.]+(?: beta)?)(?: mobile(?:\/[a-z0-9]+)?)? safari\//],
  ["webview", /\bcpu(?: iphone)? os (?:[0-9._]+).+\bapplewebkit\b/]
];
var detector = new Detector({
  os: OS,
  browser: BROWSER
});
var ua = navigator.userAgent + " " + navigator.appVersion + " " + navigator.vendor;
var d = detector.parse(ua);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Detector,
  copy,
  detector,
  ua
});
