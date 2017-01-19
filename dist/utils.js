!function (e, t) {
  if ("object" == typeof exports && "object" == typeof module) module.exports = t(); else if ("function" == typeof define && define.amd) define([], t); else {
    var r = t();
    for (var n in r)("object" == typeof exports ? exports : e)[n] = r[n]
  }
}(this, function () {
  return function (e) {
    function t(n) {
      if (r[n])return r[n].exports;
      var o = r[n] = { exports: {}, id: n, loaded: !1 };
      return e[n].call(o.exports, o, o.exports, t), o.loaded = !0, o.exports
    }

    var r = {};
    return t.m = e, t.c = r, t.p = "", t(0)
  }([function (e, t, r) {
    (function (t) {
      "use strict";
      function n(e) {
        if (Array.isArray(e)) {
          for (var t = 0, r = Array(e.length); t < e.length; t++)r[t] = e[t];
          return r
        }
        return Array.from(e)
      }

      function o(e, t) {
        var r = {};
        for (var n in e)t.indexOf(n) >= 0 || Object.prototype.hasOwnProperty.call(e, n) && (r[n] = e[n]);
        return r
      }

      var i = Object.assign || function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var r = arguments[t];
            for (var n in r)Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
          }
          return e
        }, a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
          return typeof e
        } : function (e) {
          return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        }, c = r(1), f = r(6), u = r(7), l = "object" === ("undefined" == typeof window ? "undefined" : a(window)) ? window : t;
      l.Headers.prototype.keys = t.Headers.prototype.keys || function () {
          return Object.keys(this._headers || {})
        }, l.Headers.prototype.values = t.Headers.prototype.values || function () {
          var e = this;
          return Object.keys(this._headers || {}).map(function (t) {
            return e._headers[k]
          })
        };
      var s = function (e) {
        return e
      }, p = {}, d = "", y = function (e) {
        return e
      }, b = function (e) {
        return e instanceof Headers ? function () {
            return Array.from(e.keys()).reduce(function (t, r) {
              return t[r] = e.get(r), t
            }, {})
          }() : e
      }, m = function (e, t, r) {
        var n = t.ssl, o = (t.method, t.query);
        return "function" == typeof r ? r(e, t) : ("string" == typeof r && (e = e.replace(/^\/\//, r)), /^\/\//.test(e) && (e = (n ? "https" : "http") + ":" + e), o && (e += "" + (e.match(/\?/) ? "&" : "?") + c.stringify(o)), e)
      }, h = function (e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, r = t.method, n = void 0 === r ? "GET" : r, l = t.query, s = void 0 === l ? {} : l, y = t.data, h = void 0 === y ? {} : y, v = t.body, j = void 0 === v ? {} : v, g = t.headers, O = void 0 === g ? {} : g, w = (t.json, o(t, ["method", "query", "data", "body", "headers", "json"])), x = "GET" === n || "HEAD" === n, A = "undefined" != typeof window && "undefined" != typeof FormData && j instanceof FormData;
        if (x ? s = "object" === ("undefined" == typeof s ? "undefined" : a(s)) ? i({}, s, h, j) : 0 === Object.keys(s).length ? h : s : j = "object" !== ("undefined" == typeof j ? "undefined" : a(j)) || A ? 0 !== Object.keys(j).length || A ? j : h : i({}, h, j), O = new Headers(i({}, b(O), b(p))), x ? "" : O.set("Content-Type", O.get("Content-Type") || f(j)), "object" === ("undefined" == typeof j ? "undefined" : a(j)))switch (O.get("Content-Type")) {
          case u.form:
            j = c.stringify(j);
            break;
          case u.formData:
            var k = function () {
              var e = new FormData;
              return Object.keys(j).forEach(function (t) {
                e.set(t, j[t])
              }), j = e, "break"
            }();
            if ("break" === k)break
        }
        var D = i({ method: n, query: s, headers: O }, w);
        return x || (D.body = j), [m(e, D, d), D]
      }, v = function (e) {
        var t = function () {
          return e.call.apply(e, [void 0].concat(n(h.apply(void 0, arguments)))).then(y).then(s)
        };
        return t.callback = function (e) {
          "function" == typeof e && (s = e), delete t.callback
        }, t.baseHost = function (e) {
          d = e
        }, t.headers = function (e) {
          if ("object" !== ("undefined" == typeof e ? "undefined" : a(e)) && "function" != typeof e)throw new Error("global headers must be object or function");
          p = e, delete t.headers
        }, t
      };
      e.exports = { fetchDecorator: v }
    }).call(t, function () {
      return this
    }())
  }, function (e, t, r) {
    "use strict";
    var n = r(2), o = r(5), i = r(4);
    e.exports = { formats: i, parse: o, stringify: n }
  }, function (e, t, r) {
    "use strict";
    var n = r(3), o = r(4), i = {
      brackets: function (e) {
        return e + "[]"
      }, indices: function (e, t) {
        return e + "[" + t + "]"
      }, repeat: function (e) {
        return e
      }
    }, a = Date.prototype.toISOString, c = {
      delimiter: "&",
      encode: !0,
      encoder: n.encode,
      serializeDate: function (e) {
        return a.call(e)
      },
      skipNulls: !1,
      strictNullHandling: !1
    }, f = function e(t, r, o, i, a, c, f, u, l, s, p) {
      var d = t;
      if ("function" == typeof f) d = f(r, d); else if (d instanceof Date) d = s(d); else if (null === d) {
        if (i)return c ? c(r) : r;
        d = ""
      }
      if ("string" == typeof d || "number" == typeof d || "boolean" == typeof d || n.isBuffer(d))return c ? [p(c(r)) + "=" + p(c(d))] : [p(r) + "=" + p(String(d))];
      var y = [];
      if ("undefined" == typeof d)return y;
      var b;
      if (Array.isArray(f)) b = f; else {
        var m = Object.keys(d);
        b = u ? m.sort(u) : m
      }
      for (var h = 0; h < b.length; ++h) {
        var v = b[h];
        a && null === d[v] || (y = Array.isArray(d) ? y.concat(e(d[v], o(r, v), o, i, a, c, f, u, l, s, p)) : y.concat(e(d[v], r + (l ? "." + v : "[" + v + "]"), o, i, a, c, f, u, l, s, p)))
      }
      return y
    };
    e.exports = function (e, t) {
      var r = e, n = t || {}, a = "undefined" == typeof n.delimiter ? c.delimiter : n.delimiter, u = "boolean" == typeof n.strictNullHandling ? n.strictNullHandling : c.strictNullHandling, l = "boolean" == typeof n.skipNulls ? n.skipNulls : c.skipNulls, s = "boolean" == typeof n.encode ? n.encode : c.encode, p = s ? "function" == typeof n.encoder ? n.encoder : c.encoder : null, d = "function" == typeof n.sort ? n.sort : null, y = "undefined" != typeof n.allowDots && n.allowDots, b = "function" == typeof n.serializeDate ? n.serializeDate : c.serializeDate;
      if ("undefined" == typeof n.format) n.format = o.default; else if (!Object.prototype.hasOwnProperty.call(o.formatters, n.format))throw new TypeError("Unknown format option provided.");
      var m, h, v = o.formatters[n.format];
      if (null !== n.encoder && void 0 !== n.encoder && "function" != typeof n.encoder)throw new TypeError("Encoder has to be a function.");
      "function" == typeof n.filter ? (h = n.filter, r = h("", r)): Array.isArray(n.filter) && (h = n.filter, m = h);
      var j = [];
      if ("object" != typeof r || null === r)return "";
      var g;
      g = n.arrayFormat in i ? n.arrayFormat : "indices" in n ? n.indices ? "indices" : "repeat" : "indices";
      var O = i[g];
      m || (m = Object.keys(r)), d && m.sort(d);
      for (var w = 0; w < m.length; ++w) {
        var x = m[w];
        l && null === r[x] || (j = j.concat(f(r[x], x, O, u, l, p, h, d, y, b, v)))
      }
      return j.join(a)
    }
  }, function (e, t) {
    "use strict";
    var r = Object.prototype.hasOwnProperty, n = function () {
      for (var e = [], t = 0; t < 256; ++t)e.push("%" + ((t < 16 ? "0" : "") + t.toString(16)).toUpperCase());
      return e
    }();
    t.arrayToObject = function (e, t) {
      for (var r = t && t.plainObjects ? Object.create(null) : {}, n = 0; n < e.length; ++n)"undefined" != typeof e[n] && (r[n] = e[n]);
      return r
    }, t.merge = function (e, n, o) {
      if (!n)return e;
      if ("object" != typeof n) {
        if (Array.isArray(e)) e.push(n); else {
          if ("object" != typeof e)return [e, n];
          e[n] = !0
        }
        return e
      }
      if ("object" != typeof e)return [e].concat(n);
      var i = e;
      return Array.isArray(e) && !Array.isArray(n) && (i = t.arrayToObject(e, o)), Array.isArray(e) && Array.isArray(n) ? (n.forEach(function (n, i) {
          r.call(e, i) ? e[i] && "object" == typeof e[i] ? e[i] = t.merge(e[i], n, o) : e.push(n) : e[i] = n
        }), e) : Object.keys(n).reduce(function (e, r) {
          var i = n[r];
          return Object.prototype.hasOwnProperty.call(e, r) ? e[r] = t.merge(e[r], i, o) : e[r] = i, e
        }, i)
    }, t.decode = function (e) {
      try {
        return decodeURIComponent(e.replace(/\+/g, " "))
      } catch (t) {
        return e
      }
    }, t.encode = function (e) {
      if (0 === e.length)return e;
      for (var t = "string" == typeof e ? e : String(e), r = "", o = 0; o < t.length; ++o) {
        var i = t.charCodeAt(o);
        45 === i || 46 === i || 95 === i || 126 === i || i >= 48 && i <= 57 || i >= 65 && i <= 90 || i >= 97 && i <= 122 ? r += t.charAt(o) : i < 128 ? r += n[i] : i < 2048 ? r += n[192 | i >> 6] + n[128 | 63 & i] : i < 55296 || i >= 57344 ? r += n[224 | i >> 12] + n[128 | i >> 6 & 63] + n[128 | 63 & i] : (o += 1, i = 65536 + ((1023 & i) << 10 | 1023 & t.charCodeAt(o)), r += n[240 | i >> 18] + n[128 | i >> 12 & 63] + n[128 | i >> 6 & 63] + n[128 | 63 & i])
      }
      return r
    }, t.compact = function (e, r) {
      if ("object" != typeof e || null === e)return e;
      var n = r || [], o = n.indexOf(e);
      if (o !== -1)return n[o];
      if (n.push(e), Array.isArray(e)) {
        for (var i = [], a = 0; a < e.length; ++a)e[a] && "object" == typeof e[a] ? i.push(t.compact(e[a], n)) : "undefined" != typeof e[a] && i.push(e[a]);
        return i
      }
      var c = Object.keys(e);
      return c.forEach(function (r) {
        e[r] = t.compact(e[r], n)
      }), e
    }, t.isRegExp = function (e) {
      return "[object RegExp]" === Object.prototype.toString.call(e)
    }, t.isBuffer = function (e) {
      return null !== e && "undefined" != typeof e && !!(e.constructor && e.constructor.isBuffer && e.constructor.isBuffer(e))
    }
  }, function (e, t) {
    "use strict";
    var r = String.prototype.replace, n = /%20/g;
    e.exports = {
      default: "RFC3986", formatters: {
        RFC1738: function (e) {
          return r.call(e, n, "+")
        }, RFC3986: function (e) {
          return e
        }
      }, RFC1738: "RFC1738", RFC3986: "RFC3986"
    }
  }, function (e, t, r) {
    "use strict";
    var n = r(3), o = Object.prototype.hasOwnProperty, i = {
      allowDots: !1,
      allowPrototypes: !1,
      arrayLimit: 20,
      decoder: n.decode,
      delimiter: "&",
      depth: 5,
      parameterLimit: 1e3,
      plainObjects: !1,
      strictNullHandling: !1
    }, a = function (e, t) {
      for (var r = {}, n = e.split(t.delimiter, t.parameterLimit === 1 / 0 ? void 0 : t.parameterLimit), i = 0; i < n.length; ++i) {
        var a, c, f = n[i], u = f.indexOf("]=") === -1 ? f.indexOf("=") : f.indexOf("]=") + 1;
        u === -1 ? (a = t.decoder(f), c = t.strictNullHandling ? null : "") : (a = t.decoder(f.slice(0, u)), c = t.decoder(f.slice(u + 1))), o.call(r, a) ? r[a] = [].concat(r[a]).concat(c) : r[a] = c
      }
      return r
    }, c = function e(t, r, n) {
      if (!t.length)return r;
      var o, i = t.shift();
      if ("[]" === i) o = [], o = o.concat(e(t, r, n)); else {
        o = n.plainObjects ? Object.create(null) : {};
        var a = "[" === i[0] && "]" === i[i.length - 1] ? i.slice(1, i.length - 1) : i, c = parseInt(a, 10);
        !isNaN(c) && i !== a && String(c) === a && c >= 0 && n.parseArrays && c <= n.arrayLimit ? (o = [], o[c] = e(t, r, n)) : o[a] = e(t, r, n)
      }
      return o
    }, f = function (e, t, r) {
      if (e) {
        var n = r.allowDots ? e.replace(/\.([^\.\[]+)/g, "[$1]") : e, i = /^([^\[\]]*)/, a = /(\[[^\[\]]*\])/g, f = i.exec(n), u = [];
        if (f[1]) {
          if (!r.plainObjects && o.call(Object.prototype, f[1]) && !r.allowPrototypes)return;
          u.push(f[1])
        }
        for (var l = 0; null !== (f = a.exec(n)) && l < r.depth;)l += 1, (r.plainObjects || !o.call(Object.prototype, f[1].replace(/\[|\]/g, "")) || r.allowPrototypes) && u.push(f[1]);
        return f && u.push("[" + n.slice(f.index) + "]"), c(u, t, r)
      }
    };
    e.exports = function (e, t) {
      var r = t || {};
      if (null !== r.decoder && void 0 !== r.decoder && "function" != typeof r.decoder)throw new TypeError("Decoder has to be a function.");
      if (r.delimiter = "string" == typeof r.delimiter || n.isRegExp(r.delimiter) ? r.delimiter : i.delimiter, r.depth = "number" == typeof r.depth ? r.depth : i.depth, r.arrayLimit = "number" == typeof r.arrayLimit ? r.arrayLimit : i.arrayLimit, r.parseArrays = r.parseArrays !== !1, r.decoder = "function" == typeof r.decoder ? r.decoder : i.decoder, r.allowDots = "boolean" == typeof r.allowDots ? r.allowDots : i.allowDots, r.plainObjects = "boolean" == typeof r.plainObjects ? r.plainObjects : i.plainObjects, r.allowPrototypes = "boolean" == typeof r.allowPrototypes ? r.allowPrototypes : i.allowPrototypes, r.parameterLimit = "number" == typeof r.parameterLimit ? r.parameterLimit : i.parameterLimit, r.strictNullHandling = "boolean" == typeof r.strictNullHandling ? r.strictNullHandling : i.strictNullHandling, "" === e || null === e || "undefined" == typeof e)return r.plainObjects ? Object.create(null) : {};
      for (var o = "string" == typeof e ? a(e, r) : e, c = r.plainObjects ? Object.create(null) : {}, u = Object.keys(o), l = 0; l < u.length; ++l) {
        var s = u[l], p = f(s, o[s], r);
        c = n.merge(c, p, r)
      }
      return n.compact(c)
    }
  }, function (e, t, r) {
    "use strict";
    var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
        return typeof e
      } : function (e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
      }, o = r(7), i = function (e, t) {
      if ("undefined" != typeof window && "undefined" != typeof FormData && e instanceof FormData)return o.formData;
      if ("string" == typeof e)try {
        if (JSON.parse(e))return o.json
      } catch (e) {
        return o.text
      }
      return "object" === ("undefined" == typeof e ? "undefined" : n(e)) ? t ? o.json : o.form : o.text
    };
    e.exports = i
  }, function (e, t) {
    "use strict";
    e.exports = {
      formData: "multipart/form-data",
      form: "application/x-www-form-urlencoded",
      json: "application/json",
      text: "text/plain"
    }
  }])
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vdXRpbHMuanMiXSwibWFwcGluZ3MiOiJBQUFBIiwic291cmNlUm9vdCI6IiJ9