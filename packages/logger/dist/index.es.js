const c = {
  silent: Number.NEGATIVE_INFINITY,
  fatal: 0,
  error: 0,
  warn: 1,
  log: 2,
  info: 3,
  success: 3,
  fail: 3,
  ready: 3,
  start: 3,
  box: 3,
  debug: 4,
  trace: 5,
  verbose: Number.POSITIVE_INFINITY
}, v = {
  // Silent
  silent: {
    level: -1
  },
  // Level 0
  fatal: {
    level: c.fatal
  },
  error: {
    level: c.error
  },
  // Level 1
  warn: {
    level: c.warn
  },
  // Level 2
  log: {
    level: c.log
  },
  // Level 3
  info: {
    level: c.info
  },
  success: {
    level: c.success
  },
  fail: {
    level: c.fail
  },
  ready: {
    level: c.info
  },
  start: {
    level: c.info
  },
  box: {
    level: c.info
  },
  // Level 4
  debug: {
    level: c.debug
  },
  // Level 5
  trace: {
    level: c.trace
  },
  // Verbose
  verbose: {
    level: c.verbose
  }
};
function u(r) {
  return r !== null && typeof r == "object";
}
function _(r, t, o = ".", s) {
  if (!u(t))
    return _(r, {}, o, s);
  const e = Object.assign({}, t);
  for (const i in r) {
    if (i === "__proto__" || i === "constructor")
      continue;
    const n = r[i];
    n != null && (s && s(e, i, n, o) || (Array.isArray(n) && Array.isArray(e[i]) ? e[i] = [...n, ...e[i]] : u(n) && u(e[i]) ? e[i] = _(
      n,
      e[i],
      (o ? `${o}.` : "") + i.toString(),
      s
    ) : e[i] = n));
  }
  return e;
}
function L(r) {
  return (...t) => (
    // eslint-disable-next-line unicorn/no-array-reduce
    t.reduce((o, s) => _(o, s, "", r), {})
  );
}
const S = L();
function F(r) {
  return Object.prototype.toString.call(r) === "[object Object]";
}
function T(r) {
  return !(!F(r) || !r.message && !r.args || r.stack);
}
let f = !1;
const w = [];
class l {
  constructor(t = {}) {
    const o = t.types || v;
    this.options = S(
      {
        ...t,
        defaults: { ...t.defaults },
        level: h(t.level, o),
        reporters: [...t.reporters || []]
      },
      {
        types: v,
        throttle: 1e3,
        throttleMin: 5,
        formatOptions: {
          date: !0,
          colors: !1,
          compact: !0
        }
      }
    );
    for (const s in o) {
      const e = {
        type: s,
        ...this.options.defaults,
        ...o[s]
      };
      this[s] = this._wrapLogFn(e), this[s].raw = this._wrapLogFn(
        e,
        !0
      );
    }
    this.options.mockFn && this.mockTypes(), this._lastLog = {};
  }
  get level() {
    return this.options.level;
  }
  set level(t) {
    this.options.level = h(
      t,
      this.options.types,
      this.options.level
    );
  }
  prompt(t, o) {
    if (!this.options.prompt)
      throw new Error("prompt is not supported!");
    return this.options.prompt(t, o);
  }
  create(t) {
    const o = new l({
      ...this.options,
      ...t
    });
    return this._mockFn && o.mockTypes(this._mockFn), o;
  }
  withDefaults(t) {
    return this.create({
      ...this.options,
      defaults: {
        ...this.options.defaults,
        ...t
      }
    });
  }
  withTag(t) {
    return this.withDefaults({
      tag: this.options.defaults.tag ? this.options.defaults.tag + ":" + t : t
    });
  }
  addReporter(t) {
    return this.options.reporters.push(t), this;
  }
  removeReporter(t) {
    if (t) {
      const o = this.options.reporters.indexOf(t);
      if (o >= 0)
        return this.options.reporters.splice(o, 1);
    } else
      this.options.reporters.splice(0);
    return this;
  }
  setReporters(t) {
    return this.options.reporters = Array.isArray(t) ? t : [t], this;
  }
  wrapAll() {
    this.wrapConsole(), this.wrapStd();
  }
  restoreAll() {
    this.restoreConsole(), this.restoreStd();
  }
  wrapConsole() {
    for (const t in this.options.types)
      console["__" + t] || (console["__" + t] = console[t]), console[t] = this[t].raw;
  }
  restoreConsole() {
    for (const t in this.options.types)
      console["__" + t] && (console[t] = console["__" + t], delete console["__" + t]);
  }
  wrapStd() {
    this._wrapStream(this.options.stdout, "log"), this._wrapStream(this.options.stderr, "log");
  }
  _wrapStream(t, o) {
    t && (t.__write || (t.__write = t.write), t.write = (s) => {
      this[o].raw(String(s).trim());
    });
  }
  restoreStd() {
    this._restoreStream(this.options.stdout), this._restoreStream(this.options.stderr);
  }
  _restoreStream(t) {
    t && t.__write && (t.write = t.__write, delete t.__write);
  }
  pauseLogs() {
    f = !0;
  }
  resumeLogs() {
    f = !1;
    const t = w.splice(0);
    for (const o of t)
      o[0]._logFn(o[1], o[2]);
  }
  mockTypes(t) {
    const o = t || this.options.mockFn;
    if (this._mockFn = o, typeof o == "function")
      for (const s in this.options.types)
        this[s] = o(s, this.options.types[s]) || this[s], this[s].raw = this[s];
  }
  _wrapLogFn(t, o) {
    return (...s) => {
      if (f) {
        w.push([this, t, s, o]);
        return;
      }
      return this._logFn(t, s, o);
    };
  }
  _logFn(t, o, s) {
    if ((t.level || 0) > this.level)
      return !1;
    const e = {
      date: /* @__PURE__ */ new Date(),
      args: [],
      ...t,
      level: h(t.level, this.options.types)
    };
    !s && o.length === 1 && T(o[0]) ? Object.assign(e, o[0]) : e.args = [...o], e.message && (e.args.unshift(e.message), delete e.message), e.additional && (Array.isArray(e.additional) || (e.additional = e.additional.split(`
`)), e.args.push(`
` + e.additional.join(`
`)), delete e.additional), e.type = typeof e.type == "string" ? e.type.toLowerCase() : "log", e.tag = typeof e.tag == "string" ? e.tag : "";
    const i = (p = !1) => {
      const a = (this._lastLog.count || 0) - this.options.throttleMin;
      if (this._lastLog.object && a > 0) {
        const d = [...this._lastLog.object.args];
        a > 1 && d.push(`(repeated ${a} times)`), this._log({ ...this._lastLog.object, args: d }), this._lastLog.count = 1;
      }
      p && (this._lastLog.object = e, this._log(e));
    };
    clearTimeout(this._lastLog.timeout);
    const n = this._lastLog.time && e.date ? e.date.getTime() - this._lastLog.time.getTime() : 0;
    if (this._lastLog.time = e.date, n < this.options.throttle)
      try {
        const p = JSON.stringify([
          e.type,
          e.tag,
          e.args
        ]), a = this._lastLog.serialized === p;
        if (this._lastLog.serialized = p, a && (this._lastLog.count = (this._lastLog.count || 0) + 1, this._lastLog.count > this.options.throttleMin)) {
          this._lastLog.timeout = setTimeout(
            i,
            this.options.throttle
          );
          return;
        }
      } catch {
      }
    i(!0);
  }
  _log(t) {
    for (const o of this.options.reporters)
      o.log(t, {
        options: this.options
      });
  }
}
function h(r, t = {}, o = 3) {
  return r === void 0 ? o : typeof r == "number" ? r : t[r] && t[r].level !== void 0 ? t[r].level : o;
}
l.prototype.add = l.prototype.addReporter;
l.prototype.remove = l.prototype.removeReporter;
l.prototype.clear = l.prototype.removeReporter;
l.prototype.withScope = l.prototype.withTag;
l.prototype.mock = l.prototype.mockTypes;
l.prototype.pause = l.prototype.pauseLogs;
l.prototype.resume = l.prototype.resumeLogs;
function b(r = {}) {
  return new l(r);
}
class C {
  constructor(t) {
    this.options = { ...t }, this.defaultColor = "#7f8c8d", this.levelColorMap = {
      0: "#c0392b",
      // Red
      1: "#f39c12",
      // Yellow
      3: "#00BCD4"
      // Cyan
    }, this.typeColorMap = {
      success: "#2ecc71"
      // Green
    };
  }
  _getLogFn(t) {
    return t < 1 ? console.__error || console.error : t === 1 ? console.__warn || console.warn : console.__log || console.log;
  }
  log(t) {
    const o = this._getLogFn(t.level), s = t.type === "log" ? "" : t.type, e = t.tag || "", n = `
      background: ${this.typeColorMap[t.type] || this.levelColorMap[t.level] || this.defaultColor};
      border-radius: 0.5em;
      color: white;
      font-weight: bold;
      padding: 2px 0.5em;
    `, p = `%c${[e, s].filter(Boolean).join(":")}`;
    typeof t.args[0] == "string" ? o(
      `${p}%c ${t.args[0]}`,
      n,
      // Empty string as style resets to default console style
      "",
      ...t.args.slice(1)
    ) : o(p, n, ...t.args);
  }
}
function A(r = {}) {
  return b({
    reporters: r.reporters || [new C({})],
    prompt(o, s = {}) {
      return s.type === "confirm" ? Promise.resolve(confirm(o)) : Promise.resolve(prompt(o));
    },
    ...r
  });
}
const m = A();
function g(r) {
  return r !== null && typeof r == "object";
}
function y(r, t, o = ".", s) {
  if (!g(t))
    return y(r, {}, o, s);
  const e = Object.assign({}, t);
  for (const i in r) {
    if (i === "__proto__" || i === "constructor")
      continue;
    const n = r[i];
    n != null && (s && s(e, i, n, o) || (Array.isArray(n) && Array.isArray(e[i]) ? e[i] = [...n, ...e[i]] : g(n) && g(e[i]) ? e[i] = y(
      n,
      e[i],
      (o ? `${o}.` : "") + i.toString(),
      s
    ) : e[i] = n));
  }
  return e;
}
function $(r) {
  return (...t) => (
    // eslint-disable-next-line unicorn/no-array-reduce
    t.reduce((o, s) => y(o, s, "", r), {})
  );
}
const k = $(), x = {
  forceExit: {
    sync: !0,
    async: !1
  },
  wrapConsole: !0,
  tag: "young_logger",
  reporter({ level: r, type: t, tag: o, args: s, date: e }, i) {
    i(
      `${Math.floor(e.getTime() / 1e3)} ${t} ${o || this.tag} - - - - - - - ${JSON.stringify(s)}`
    );
  }
}, I = (r = {}) => {
  const t = k(r, x), o = console.log;
  process.on("uncaughtException", (e) => {
    console.error("sync error: ", e.toString()), t.forceExit.sync && process.exit(1);
  }), process.on("unhandledRejection", (e) => {
    console.error("async error: ", e.toString()), t.forceExit.async && process.exit(1);
  });
  const s = m.create({
    formatOptions: {
      compact: !0
    },
    reporters: [
      {
        log: (e) => t.reporter(e, o)
      }
    ]
  });
  return t.wrapConsole && s.wrapConsole(), {
    logger: s.withTag(t.tag),
    consola: m
  };
};
export {
  I as useYoungLogger
};
//# sourceMappingURL=index.es.js.map
