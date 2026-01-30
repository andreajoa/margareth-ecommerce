import { json } from "@remix-run/node";
function getDefaultExportFromCjs(x2) {
  return x2 && x2.__esModule && Object.prototype.hasOwnProperty.call(x2, "default") ? x2["default"] : x2;
}
var jsxRuntime = { exports: {} };
var reactJsxRuntime_production_min = {};
var react = { exports: {} };
var react_production_min = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var l$5 = Symbol.for("react.element"), n$3 = Symbol.for("react.portal"), p$4 = Symbol.for("react.fragment"), q$1 = Symbol.for("react.strict_mode"), r$2 = Symbol.for("react.profiler"), t$3 = Symbol.for("react.provider"), u$3 = Symbol.for("react.context"), v$3 = Symbol.for("react.forward_ref"), w$2 = Symbol.for("react.suspense"), x$2 = Symbol.for("react.memo"), y$2 = Symbol.for("react.lazy"), z$2 = Symbol.iterator;
function A$2(a2) {
  if (null === a2 || "object" !== typeof a2) return null;
  a2 = z$2 && a2[z$2] || a2["@@iterator"];
  return "function" === typeof a2 ? a2 : null;
}
var B$3 = { isMounted: function() {
  return false;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, C$2 = Object.assign, D$2 = {};
function E$3(a2, b, e2) {
  this.props = a2;
  this.context = b;
  this.refs = D$2;
  this.updater = e2 || B$3;
}
E$3.prototype.isReactComponent = {};
E$3.prototype.setState = function(a2, b) {
  if ("object" !== typeof a2 && "function" !== typeof a2 && null != a2) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, a2, b, "setState");
};
E$3.prototype.forceUpdate = function(a2) {
  this.updater.enqueueForceUpdate(this, a2, "forceUpdate");
};
function F$1() {
}
F$1.prototype = E$3.prototype;
function G$2(a2, b, e2) {
  this.props = a2;
  this.context = b;
  this.refs = D$2;
  this.updater = e2 || B$3;
}
var H$3 = G$2.prototype = new F$1();
H$3.constructor = G$2;
C$2(H$3, E$3.prototype);
H$3.isPureReactComponent = true;
var I$3 = Array.isArray, J$2 = Object.prototype.hasOwnProperty, K$3 = { current: null }, L$3 = { key: true, ref: true, __self: true, __source: true };
function M$3(a2, b, e2) {
  var d, c2 = {}, k2 = null, h = null;
  if (null != b) for (d in void 0 !== b.ref && (h = b.ref), void 0 !== b.key && (k2 = "" + b.key), b) J$2.call(b, d) && !L$3.hasOwnProperty(d) && (c2[d] = b[d]);
  var g = arguments.length - 2;
  if (1 === g) c2.children = e2;
  else if (1 < g) {
    for (var f2 = Array(g), m2 = 0; m2 < g; m2++) f2[m2] = arguments[m2 + 2];
    c2.children = f2;
  }
  if (a2 && a2.defaultProps) for (d in g = a2.defaultProps, g) void 0 === c2[d] && (c2[d] = g[d]);
  return { $$typeof: l$5, type: a2, key: k2, ref: h, props: c2, _owner: K$3.current };
}
function N$3(a2, b) {
  return { $$typeof: l$5, type: a2.type, key: b, ref: a2.ref, props: a2.props, _owner: a2._owner };
}
function O$3(a2) {
  return "object" === typeof a2 && null !== a2 && a2.$$typeof === l$5;
}
function escape(a2) {
  var b = { "=": "=0", ":": "=2" };
  return "$" + a2.replace(/[=:]/g, function(a3) {
    return b[a3];
  });
}
var P$3 = /\/+/g;
function Q$3(a2, b) {
  return "object" === typeof a2 && null !== a2 && null != a2.key ? escape("" + a2.key) : b.toString(36);
}
function R$3(a2, b, e2, d, c2) {
  var k2 = typeof a2;
  if ("undefined" === k2 || "boolean" === k2) a2 = null;
  var h = false;
  if (null === a2) h = true;
  else switch (k2) {
    case "string":
    case "number":
      h = true;
      break;
    case "object":
      switch (a2.$$typeof) {
        case l$5:
        case n$3:
          h = true;
      }
  }
  if (h) return h = a2, c2 = c2(h), a2 = "" === d ? "." + Q$3(h, 0) : d, I$3(c2) ? (e2 = "", null != a2 && (e2 = a2.replace(P$3, "$&/") + "/"), R$3(c2, b, e2, "", function(a3) {
    return a3;
  })) : null != c2 && (O$3(c2) && (c2 = N$3(c2, e2 + (!c2.key || h && h.key === c2.key ? "" : ("" + c2.key).replace(P$3, "$&/") + "/") + a2)), b.push(c2)), 1;
  h = 0;
  d = "" === d ? "." : d + ":";
  if (I$3(a2)) for (var g = 0; g < a2.length; g++) {
    k2 = a2[g];
    var f2 = d + Q$3(k2, g);
    h += R$3(k2, b, e2, f2, c2);
  }
  else if (f2 = A$2(a2), "function" === typeof f2) for (a2 = f2.call(a2), g = 0; !(k2 = a2.next()).done; ) k2 = k2.value, f2 = d + Q$3(k2, g++), h += R$3(k2, b, e2, f2, c2);
  else if ("object" === k2) throw b = String(a2), Error("Objects are not valid as a React child (found: " + ("[object Object]" === b ? "object with keys {" + Object.keys(a2).join(", ") + "}" : b) + "). If you meant to render a collection of children, use an array instead.");
  return h;
}
function S$3(a2, b, e2) {
  if (null == a2) return a2;
  var d = [], c2 = 0;
  R$3(a2, d, "", "", function(a3) {
    return b.call(e2, a3, c2++);
  });
  return d;
}
function T$3(a2) {
  if (-1 === a2._status) {
    var b = a2._result;
    b = b();
    b.then(function(b2) {
      if (0 === a2._status || -1 === a2._status) a2._status = 1, a2._result = b2;
    }, function(b2) {
      if (0 === a2._status || -1 === a2._status) a2._status = 2, a2._result = b2;
    });
    -1 === a2._status && (a2._status = 0, a2._result = b);
  }
  if (1 === a2._status) return a2._result.default;
  throw a2._result;
}
var U$3 = { current: null }, V$3 = { transition: null }, W$3 = { ReactCurrentDispatcher: U$3, ReactCurrentBatchConfig: V$3, ReactCurrentOwner: K$3 };
function X$3() {
  throw Error("act(...) is not supported in production builds of React.");
}
react_production_min.Children = { map: S$3, forEach: function(a2, b, e2) {
  S$3(a2, function() {
    b.apply(this, arguments);
  }, e2);
}, count: function(a2) {
  var b = 0;
  S$3(a2, function() {
    b++;
  });
  return b;
}, toArray: function(a2) {
  return S$3(a2, function(a3) {
    return a3;
  }) || [];
}, only: function(a2) {
  if (!O$3(a2)) throw Error("React.Children.only expected to receive a single React element child.");
  return a2;
} };
react_production_min.Component = E$3;
react_production_min.Fragment = p$4;
react_production_min.Profiler = r$2;
react_production_min.PureComponent = G$2;
react_production_min.StrictMode = q$1;
react_production_min.Suspense = w$2;
react_production_min.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = W$3;
react_production_min.act = X$3;
react_production_min.cloneElement = function(a2, b, e2) {
  if (null === a2 || void 0 === a2) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + a2 + ".");
  var d = C$2({}, a2.props), c2 = a2.key, k2 = a2.ref, h = a2._owner;
  if (null != b) {
    void 0 !== b.ref && (k2 = b.ref, h = K$3.current);
    void 0 !== b.key && (c2 = "" + b.key);
    if (a2.type && a2.type.defaultProps) var g = a2.type.defaultProps;
    for (f2 in b) J$2.call(b, f2) && !L$3.hasOwnProperty(f2) && (d[f2] = void 0 === b[f2] && void 0 !== g ? g[f2] : b[f2]);
  }
  var f2 = arguments.length - 2;
  if (1 === f2) d.children = e2;
  else if (1 < f2) {
    g = Array(f2);
    for (var m2 = 0; m2 < f2; m2++) g[m2] = arguments[m2 + 2];
    d.children = g;
  }
  return { $$typeof: l$5, type: a2.type, key: c2, ref: k2, props: d, _owner: h };
};
react_production_min.createContext = function(a2) {
  a2 = { $$typeof: u$3, _currentValue: a2, _currentValue2: a2, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null };
  a2.Provider = { $$typeof: t$3, _context: a2 };
  return a2.Consumer = a2;
};
react_production_min.createElement = M$3;
react_production_min.createFactory = function(a2) {
  var b = M$3.bind(null, a2);
  b.type = a2;
  return b;
};
react_production_min.createRef = function() {
  return { current: null };
};
react_production_min.forwardRef = function(a2) {
  return { $$typeof: v$3, render: a2 };
};
react_production_min.isValidElement = O$3;
react_production_min.lazy = function(a2) {
  return { $$typeof: y$2, _payload: { _status: -1, _result: a2 }, _init: T$3 };
};
react_production_min.memo = function(a2, b) {
  return { $$typeof: x$2, type: a2, compare: void 0 === b ? null : b };
};
react_production_min.startTransition = function(a2) {
  var b = V$3.transition;
  V$3.transition = {};
  try {
    a2();
  } finally {
    V$3.transition = b;
  }
};
react_production_min.unstable_act = X$3;
react_production_min.useCallback = function(a2, b) {
  return U$3.current.useCallback(a2, b);
};
react_production_min.useContext = function(a2) {
  return U$3.current.useContext(a2);
};
react_production_min.useDebugValue = function() {
};
react_production_min.useDeferredValue = function(a2) {
  return U$3.current.useDeferredValue(a2);
};
react_production_min.useEffect = function(a2, b) {
  return U$3.current.useEffect(a2, b);
};
react_production_min.useId = function() {
  return U$3.current.useId();
};
react_production_min.useImperativeHandle = function(a2, b, e2) {
  return U$3.current.useImperativeHandle(a2, b, e2);
};
react_production_min.useInsertionEffect = function(a2, b) {
  return U$3.current.useInsertionEffect(a2, b);
};
react_production_min.useLayoutEffect = function(a2, b) {
  return U$3.current.useLayoutEffect(a2, b);
};
react_production_min.useMemo = function(a2, b) {
  return U$3.current.useMemo(a2, b);
};
react_production_min.useReducer = function(a2, b, e2) {
  return U$3.current.useReducer(a2, b, e2);
};
react_production_min.useRef = function(a2) {
  return U$3.current.useRef(a2);
};
react_production_min.useState = function(a2) {
  return U$3.current.useState(a2);
};
react_production_min.useSyncExternalStore = function(a2, b, e2) {
  return U$3.current.useSyncExternalStore(a2, b, e2);
};
react_production_min.useTransition = function() {
  return U$3.current.useTransition();
};
react_production_min.version = "18.3.1";
{
  react.exports = react_production_min;
}
var reactExports = react.exports;
const React__default = /* @__PURE__ */ getDefaultExportFromCjs(reactExports);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var f$1 = reactExports, k$1 = Symbol.for("react.element"), l$4 = Symbol.for("react.fragment"), m = Object.prototype.hasOwnProperty, n$2 = f$1.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, p$3 = { key: true, ref: true, __self: true, __source: true };
function q(c2, a2, g) {
  var b, d = {}, e2 = null, h = null;
  void 0 !== g && (e2 = "" + g);
  void 0 !== a2.key && (e2 = "" + a2.key);
  void 0 !== a2.ref && (h = a2.ref);
  for (b in a2) m.call(a2, b) && !p$3.hasOwnProperty(b) && (d[b] = a2[b]);
  if (c2 && c2.defaultProps) for (b in a2 = c2.defaultProps, a2) void 0 === d[b] && (d[b] = a2[b]);
  return { $$typeof: k$1, type: c2, key: e2, ref: h, props: d, _owner: n$2.current };
}
reactJsxRuntime_production_min.Fragment = l$4;
reactJsxRuntime_production_min.jsx = q;
reactJsxRuntime_production_min.jsxs = q;
{
  jsxRuntime.exports = reactJsxRuntime_production_min;
}
var jsxRuntimeExports = jsxRuntime.exports;
var reactDom_production_min = {};
var scheduler = { exports: {} };
var scheduler_production_min = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
(function(exports$1) {
  function f2(a2, b) {
    var c2 = a2.length;
    a2.push(b);
    a: for (; 0 < c2; ) {
      var d = c2 - 1 >>> 1, e2 = a2[d];
      if (0 < g(e2, b)) a2[d] = b, a2[c2] = e2, c2 = d;
      else break a;
    }
  }
  function h(a2) {
    return 0 === a2.length ? null : a2[0];
  }
  function k2(a2) {
    if (0 === a2.length) return null;
    var b = a2[0], c2 = a2.pop();
    if (c2 !== b) {
      a2[0] = c2;
      a: for (var d = 0, e2 = a2.length, w2 = e2 >>> 1; d < w2; ) {
        var m2 = 2 * (d + 1) - 1, C2 = a2[m2], n2 = m2 + 1, x2 = a2[n2];
        if (0 > g(C2, c2)) n2 < e2 && 0 > g(x2, C2) ? (a2[d] = x2, a2[n2] = c2, d = n2) : (a2[d] = C2, a2[m2] = c2, d = m2);
        else if (n2 < e2 && 0 > g(x2, c2)) a2[d] = x2, a2[n2] = c2, d = n2;
        else break a;
      }
    }
    return b;
  }
  function g(a2, b) {
    var c2 = a2.sortIndex - b.sortIndex;
    return 0 !== c2 ? c2 : a2.id - b.id;
  }
  if ("object" === typeof performance && "function" === typeof performance.now) {
    var l2 = performance;
    exports$1.unstable_now = function() {
      return l2.now();
    };
  } else {
    var p2 = Date, q2 = p2.now();
    exports$1.unstable_now = function() {
      return p2.now() - q2;
    };
  }
  var r2 = [], t2 = [], u2 = 1, v2 = null, y2 = 3, z2 = false, A2 = false, B2 = false, D2 = "function" === typeof setTimeout ? setTimeout : null, E2 = "function" === typeof clearTimeout ? clearTimeout : null, F2 = "undefined" !== typeof setImmediate ? setImmediate : null;
  "undefined" !== typeof navigator && void 0 !== navigator.scheduling && void 0 !== navigator.scheduling.isInputPending && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function G2(a2) {
    for (var b = h(t2); null !== b; ) {
      if (null === b.callback) k2(t2);
      else if (b.startTime <= a2) k2(t2), b.sortIndex = b.expirationTime, f2(r2, b);
      else break;
      b = h(t2);
    }
  }
  function H2(a2) {
    B2 = false;
    G2(a2);
    if (!A2) if (null !== h(r2)) A2 = true, I2(J2);
    else {
      var b = h(t2);
      null !== b && K2(H2, b.startTime - a2);
    }
  }
  function J2(a2, b) {
    A2 = false;
    B2 && (B2 = false, E2(L2), L2 = -1);
    z2 = true;
    var c2 = y2;
    try {
      G2(b);
      for (v2 = h(r2); null !== v2 && (!(v2.expirationTime > b) || a2 && !M2()); ) {
        var d = v2.callback;
        if ("function" === typeof d) {
          v2.callback = null;
          y2 = v2.priorityLevel;
          var e2 = d(v2.expirationTime <= b);
          b = exports$1.unstable_now();
          "function" === typeof e2 ? v2.callback = e2 : v2 === h(r2) && k2(r2);
          G2(b);
        } else k2(r2);
        v2 = h(r2);
      }
      if (null !== v2) var w2 = true;
      else {
        var m2 = h(t2);
        null !== m2 && K2(H2, m2.startTime - b);
        w2 = false;
      }
      return w2;
    } finally {
      v2 = null, y2 = c2, z2 = false;
    }
  }
  var N2 = false, O2 = null, L2 = -1, P2 = 5, Q2 = -1;
  function M2() {
    return exports$1.unstable_now() - Q2 < P2 ? false : true;
  }
  function R2() {
    if (null !== O2) {
      var a2 = exports$1.unstable_now();
      Q2 = a2;
      var b = true;
      try {
        b = O2(true, a2);
      } finally {
        b ? S2() : (N2 = false, O2 = null);
      }
    } else N2 = false;
  }
  var S2;
  if ("function" === typeof F2) S2 = function() {
    F2(R2);
  };
  else if ("undefined" !== typeof MessageChannel) {
    var T2 = new MessageChannel(), U2 = T2.port2;
    T2.port1.onmessage = R2;
    S2 = function() {
      U2.postMessage(null);
    };
  } else S2 = function() {
    D2(R2, 0);
  };
  function I2(a2) {
    O2 = a2;
    N2 || (N2 = true, S2());
  }
  function K2(a2, b) {
    L2 = D2(function() {
      a2(exports$1.unstable_now());
    }, b);
  }
  exports$1.unstable_IdlePriority = 5;
  exports$1.unstable_ImmediatePriority = 1;
  exports$1.unstable_LowPriority = 4;
  exports$1.unstable_NormalPriority = 3;
  exports$1.unstable_Profiling = null;
  exports$1.unstable_UserBlockingPriority = 2;
  exports$1.unstable_cancelCallback = function(a2) {
    a2.callback = null;
  };
  exports$1.unstable_continueExecution = function() {
    A2 || z2 || (A2 = true, I2(J2));
  };
  exports$1.unstable_forceFrameRate = function(a2) {
    0 > a2 || 125 < a2 ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : P2 = 0 < a2 ? Math.floor(1e3 / a2) : 5;
  };
  exports$1.unstable_getCurrentPriorityLevel = function() {
    return y2;
  };
  exports$1.unstable_getFirstCallbackNode = function() {
    return h(r2);
  };
  exports$1.unstable_next = function(a2) {
    switch (y2) {
      case 1:
      case 2:
      case 3:
        var b = 3;
        break;
      default:
        b = y2;
    }
    var c2 = y2;
    y2 = b;
    try {
      return a2();
    } finally {
      y2 = c2;
    }
  };
  exports$1.unstable_pauseExecution = function() {
  };
  exports$1.unstable_requestPaint = function() {
  };
  exports$1.unstable_runWithPriority = function(a2, b) {
    switch (a2) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        a2 = 3;
    }
    var c2 = y2;
    y2 = a2;
    try {
      return b();
    } finally {
      y2 = c2;
    }
  };
  exports$1.unstable_scheduleCallback = function(a2, b, c2) {
    var d = exports$1.unstable_now();
    "object" === typeof c2 && null !== c2 ? (c2 = c2.delay, c2 = "number" === typeof c2 && 0 < c2 ? d + c2 : d) : c2 = d;
    switch (a2) {
      case 1:
        var e2 = -1;
        break;
      case 2:
        e2 = 250;
        break;
      case 5:
        e2 = 1073741823;
        break;
      case 4:
        e2 = 1e4;
        break;
      default:
        e2 = 5e3;
    }
    e2 = c2 + e2;
    a2 = { id: u2++, callback: b, priorityLevel: a2, startTime: c2, expirationTime: e2, sortIndex: -1 };
    c2 > d ? (a2.sortIndex = c2, f2(t2, a2), null === h(r2) && a2 === h(t2) && (B2 ? (E2(L2), L2 = -1) : B2 = true, K2(H2, c2 - d))) : (a2.sortIndex = e2, f2(r2, a2), A2 || z2 || (A2 = true, I2(J2)));
    return a2;
  };
  exports$1.unstable_shouldYield = M2;
  exports$1.unstable_wrapCallback = function(a2) {
    var b = y2;
    return function() {
      var c2 = y2;
      y2 = b;
      try {
        return a2.apply(this, arguments);
      } finally {
        y2 = c2;
      }
    };
  };
})(scheduler_production_min);
{
  scheduler.exports = scheduler_production_min;
}
var schedulerExports = scheduler.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var aa$2 = reactExports, ca$1 = schedulerExports;
function p$2(a2) {
  for (var b = "https://reactjs.org/docs/error-decoder.html?invariant=" + a2, c2 = 1; c2 < arguments.length; c2++) b += "&args[]=" + encodeURIComponent(arguments[c2]);
  return "Minified React error #" + a2 + "; visit " + b + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var da$1 = /* @__PURE__ */ new Set(), ea$1 = {};
function fa$2(a2, b) {
  ha$2(a2, b);
  ha$2(a2 + "Capture", b);
}
function ha$2(a2, b) {
  ea$1[a2] = b;
  for (a2 = 0; a2 < b.length; a2++) da$1.add(b[a2]);
}
var ia$2 = !("undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement), ja$2 = Object.prototype.hasOwnProperty, ka$2 = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, la$2 = {}, ma$1 = {};
function oa$2(a2) {
  if (ja$2.call(ma$1, a2)) return true;
  if (ja$2.call(la$2, a2)) return false;
  if (ka$2.test(a2)) return ma$1[a2] = true;
  la$2[a2] = true;
  return false;
}
function pa$2(a2, b, c2, d) {
  if (null !== c2 && 0 === c2.type) return false;
  switch (typeof b) {
    case "function":
    case "symbol":
      return true;
    case "boolean":
      if (d) return false;
      if (null !== c2) return !c2.acceptsBooleans;
      a2 = a2.toLowerCase().slice(0, 5);
      return "data-" !== a2 && "aria-" !== a2;
    default:
      return false;
  }
}
function qa$2(a2, b, c2, d) {
  if (null === b || "undefined" === typeof b || pa$2(a2, b, c2, d)) return true;
  if (d) return false;
  if (null !== c2) switch (c2.type) {
    case 3:
      return !b;
    case 4:
      return false === b;
    case 5:
      return isNaN(b);
    case 6:
      return isNaN(b) || 1 > b;
  }
  return false;
}
function v$2(a2, b, c2, d, e2, f2, g) {
  this.acceptsBooleans = 2 === b || 3 === b || 4 === b;
  this.attributeName = d;
  this.attributeNamespace = e2;
  this.mustUseProperty = c2;
  this.propertyName = a2;
  this.type = b;
  this.sanitizeURL = f2;
  this.removeEmptyString = g;
}
var z$1 = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a2) {
  z$1[a2] = new v$2(a2, 0, false, a2, null, false, false);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(a2) {
  var b = a2[0];
  z$1[b] = new v$2(b, 1, false, a2[1], null, false, false);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(a2) {
  z$1[a2] = new v$2(a2, 2, false, a2.toLowerCase(), null, false, false);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(a2) {
  z$1[a2] = new v$2(a2, 2, false, a2, null, false, false);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a2) {
  z$1[a2] = new v$2(a2, 3, false, a2.toLowerCase(), null, false, false);
});
["checked", "multiple", "muted", "selected"].forEach(function(a2) {
  z$1[a2] = new v$2(a2, 3, true, a2, null, false, false);
});
["capture", "download"].forEach(function(a2) {
  z$1[a2] = new v$2(a2, 4, false, a2, null, false, false);
});
["cols", "rows", "size", "span"].forEach(function(a2) {
  z$1[a2] = new v$2(a2, 6, false, a2, null, false, false);
});
["rowSpan", "start"].forEach(function(a2) {
  z$1[a2] = new v$2(a2, 5, false, a2.toLowerCase(), null, false, false);
});
var ra$2 = /[\-:]([a-z])/g;
function sa$2(a2) {
  return a2[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a2) {
  var b = a2.replace(
    ra$2,
    sa$2
  );
  z$1[b] = new v$2(b, 1, false, a2, null, false, false);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a2) {
  var b = a2.replace(ra$2, sa$2);
  z$1[b] = new v$2(b, 1, false, a2, "http://www.w3.org/1999/xlink", false, false);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(a2) {
  var b = a2.replace(ra$2, sa$2);
  z$1[b] = new v$2(b, 1, false, a2, "http://www.w3.org/XML/1998/namespace", false, false);
});
["tabIndex", "crossOrigin"].forEach(function(a2) {
  z$1[a2] = new v$2(a2, 1, false, a2.toLowerCase(), null, false, false);
});
z$1.xlinkHref = new v$2("xlinkHref", 1, false, "xlink:href", "http://www.w3.org/1999/xlink", true, false);
["src", "href", "action", "formAction"].forEach(function(a2) {
  z$1[a2] = new v$2(a2, 1, false, a2.toLowerCase(), null, true, true);
});
function ta$2(a2, b, c2, d) {
  var e2 = z$1.hasOwnProperty(b) ? z$1[b] : null;
  if (null !== e2 ? 0 !== e2.type : d || !(2 < b.length) || "o" !== b[0] && "O" !== b[0] || "n" !== b[1] && "N" !== b[1]) qa$2(b, c2, e2, d) && (c2 = null), d || null === e2 ? oa$2(b) && (null === c2 ? a2.removeAttribute(b) : a2.setAttribute(b, "" + c2)) : e2.mustUseProperty ? a2[e2.propertyName] = null === c2 ? 3 === e2.type ? false : "" : c2 : (b = e2.attributeName, d = e2.attributeNamespace, null === c2 ? a2.removeAttribute(b) : (e2 = e2.type, c2 = 3 === e2 || 4 === e2 && true === c2 ? "" : "" + c2, d ? a2.setAttributeNS(d, b, c2) : a2.setAttribute(b, c2)));
}
var ua$2 = aa$2.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, va$2 = Symbol.for("react.element"), wa$2 = Symbol.for("react.portal"), ya$2 = Symbol.for("react.fragment"), za$2 = Symbol.for("react.strict_mode"), Aa$2 = Symbol.for("react.profiler"), Ba$2 = Symbol.for("react.provider"), Ca$2 = Symbol.for("react.context"), Da$2 = Symbol.for("react.forward_ref"), Ea$2 = Symbol.for("react.suspense"), Fa$2 = Symbol.for("react.suspense_list"), Ga$2 = Symbol.for("react.memo"), Ha$2 = Symbol.for("react.lazy");
var Ia$2 = Symbol.for("react.offscreen");
var Ja$2 = Symbol.iterator;
function Ka$2(a2) {
  if (null === a2 || "object" !== typeof a2) return null;
  a2 = Ja$2 && a2[Ja$2] || a2["@@iterator"];
  return "function" === typeof a2 ? a2 : null;
}
var A$1 = Object.assign, La$2;
function Ma$2(a2) {
  if (void 0 === La$2) try {
    throw Error();
  } catch (c2) {
    var b = c2.stack.trim().match(/\n( *(at )?)/);
    La$2 = b && b[1] || "";
  }
  return "\n" + La$2 + a2;
}
var Na$2 = false;
function Oa$2(a2, b) {
  if (!a2 || Na$2) return "";
  Na$2 = true;
  var c2 = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (b) if (b = function() {
      throw Error();
    }, Object.defineProperty(b.prototype, "props", { set: function() {
      throw Error();
    } }), "object" === typeof Reflect && Reflect.construct) {
      try {
        Reflect.construct(b, []);
      } catch (l2) {
        var d = l2;
      }
      Reflect.construct(a2, [], b);
    } else {
      try {
        b.call();
      } catch (l2) {
        d = l2;
      }
      a2.call(b.prototype);
    }
    else {
      try {
        throw Error();
      } catch (l2) {
        d = l2;
      }
      a2();
    }
  } catch (l2) {
    if (l2 && d && "string" === typeof l2.stack) {
      for (var e2 = l2.stack.split("\n"), f2 = d.stack.split("\n"), g = e2.length - 1, h = f2.length - 1; 1 <= g && 0 <= h && e2[g] !== f2[h]; ) h--;
      for (; 1 <= g && 0 <= h; g--, h--) if (e2[g] !== f2[h]) {
        if (1 !== g || 1 !== h) {
          do
            if (g--, h--, 0 > h || e2[g] !== f2[h]) {
              var k2 = "\n" + e2[g].replace(" at new ", " at ");
              a2.displayName && k2.includes("<anonymous>") && (k2 = k2.replace("<anonymous>", a2.displayName));
              return k2;
            }
          while (1 <= g && 0 <= h);
        }
        break;
      }
    }
  } finally {
    Na$2 = false, Error.prepareStackTrace = c2;
  }
  return (a2 = a2 ? a2.displayName || a2.name : "") ? Ma$2(a2) : "";
}
function Pa$2(a2) {
  switch (a2.tag) {
    case 5:
      return Ma$2(a2.type);
    case 16:
      return Ma$2("Lazy");
    case 13:
      return Ma$2("Suspense");
    case 19:
      return Ma$2("SuspenseList");
    case 0:
    case 2:
    case 15:
      return a2 = Oa$2(a2.type, false), a2;
    case 11:
      return a2 = Oa$2(a2.type.render, false), a2;
    case 1:
      return a2 = Oa$2(a2.type, true), a2;
    default:
      return "";
  }
}
function Qa$2(a2) {
  if (null == a2) return null;
  if ("function" === typeof a2) return a2.displayName || a2.name || null;
  if ("string" === typeof a2) return a2;
  switch (a2) {
    case ya$2:
      return "Fragment";
    case wa$2:
      return "Portal";
    case Aa$2:
      return "Profiler";
    case za$2:
      return "StrictMode";
    case Ea$2:
      return "Suspense";
    case Fa$2:
      return "SuspenseList";
  }
  if ("object" === typeof a2) switch (a2.$$typeof) {
    case Ca$2:
      return (a2.displayName || "Context") + ".Consumer";
    case Ba$2:
      return (a2._context.displayName || "Context") + ".Provider";
    case Da$2:
      var b = a2.render;
      a2 = a2.displayName;
      a2 || (a2 = b.displayName || b.name || "", a2 = "" !== a2 ? "ForwardRef(" + a2 + ")" : "ForwardRef");
      return a2;
    case Ga$2:
      return b = a2.displayName || null, null !== b ? b : Qa$2(a2.type) || "Memo";
    case Ha$2:
      b = a2._payload;
      a2 = a2._init;
      try {
        return Qa$2(a2(b));
      } catch (c2) {
      }
  }
  return null;
}
function Ra$2(a2) {
  var b = a2.type;
  switch (a2.tag) {
    case 24:
      return "Cache";
    case 9:
      return (b.displayName || "Context") + ".Consumer";
    case 10:
      return (b._context.displayName || "Context") + ".Provider";
    case 18:
      return "DehydratedFragment";
    case 11:
      return a2 = b.render, a2 = a2.displayName || a2.name || "", b.displayName || ("" !== a2 ? "ForwardRef(" + a2 + ")" : "ForwardRef");
    case 7:
      return "Fragment";
    case 5:
      return b;
    case 4:
      return "Portal";
    case 3:
      return "Root";
    case 6:
      return "Text";
    case 16:
      return Qa$2(b);
    case 8:
      return b === za$2 ? "StrictMode" : "Mode";
    case 22:
      return "Offscreen";
    case 12:
      return "Profiler";
    case 21:
      return "Scope";
    case 13:
      return "Suspense";
    case 19:
      return "SuspenseList";
    case 25:
      return "TracingMarker";
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if ("function" === typeof b) return b.displayName || b.name || null;
      if ("string" === typeof b) return b;
  }
  return null;
}
function Sa$2(a2) {
  switch (typeof a2) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return a2;
    case "object":
      return a2;
    default:
      return "";
  }
}
function Ta$2(a2) {
  var b = a2.type;
  return (a2 = a2.nodeName) && "input" === a2.toLowerCase() && ("checkbox" === b || "radio" === b);
}
function Ua$2(a2) {
  var b = Ta$2(a2) ? "checked" : "value", c2 = Object.getOwnPropertyDescriptor(a2.constructor.prototype, b), d = "" + a2[b];
  if (!a2.hasOwnProperty(b) && "undefined" !== typeof c2 && "function" === typeof c2.get && "function" === typeof c2.set) {
    var e2 = c2.get, f2 = c2.set;
    Object.defineProperty(a2, b, { configurable: true, get: function() {
      return e2.call(this);
    }, set: function(a3) {
      d = "" + a3;
      f2.call(this, a3);
    } });
    Object.defineProperty(a2, b, { enumerable: c2.enumerable });
    return { getValue: function() {
      return d;
    }, setValue: function(a3) {
      d = "" + a3;
    }, stopTracking: function() {
      a2._valueTracker = null;
      delete a2[b];
    } };
  }
}
function Va$2(a2) {
  a2._valueTracker || (a2._valueTracker = Ua$2(a2));
}
function Wa$2(a2) {
  if (!a2) return false;
  var b = a2._valueTracker;
  if (!b) return true;
  var c2 = b.getValue();
  var d = "";
  a2 && (d = Ta$2(a2) ? a2.checked ? "true" : "false" : a2.value);
  a2 = d;
  return a2 !== c2 ? (b.setValue(a2), true) : false;
}
function Xa$2(a2) {
  a2 = a2 || ("undefined" !== typeof document ? document : void 0);
  if ("undefined" === typeof a2) return null;
  try {
    return a2.activeElement || a2.body;
  } catch (b) {
    return a2.body;
  }
}
function Ya$2(a2, b) {
  var c2 = b.checked;
  return A$1({}, b, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: null != c2 ? c2 : a2._wrapperState.initialChecked });
}
function Za$2(a2, b) {
  var c2 = null == b.defaultValue ? "" : b.defaultValue, d = null != b.checked ? b.checked : b.defaultChecked;
  c2 = Sa$2(null != b.value ? b.value : c2);
  a2._wrapperState = { initialChecked: d, initialValue: c2, controlled: "checkbox" === b.type || "radio" === b.type ? null != b.checked : null != b.value };
}
function ab$2(a2, b) {
  b = b.checked;
  null != b && ta$2(a2, "checked", b, false);
}
function bb$2(a2, b) {
  ab$2(a2, b);
  var c2 = Sa$2(b.value), d = b.type;
  if (null != c2) if ("number" === d) {
    if (0 === c2 && "" === a2.value || a2.value != c2) a2.value = "" + c2;
  } else a2.value !== "" + c2 && (a2.value = "" + c2);
  else if ("submit" === d || "reset" === d) {
    a2.removeAttribute("value");
    return;
  }
  b.hasOwnProperty("value") ? cb$2(a2, b.type, c2) : b.hasOwnProperty("defaultValue") && cb$2(a2, b.type, Sa$2(b.defaultValue));
  null == b.checked && null != b.defaultChecked && (a2.defaultChecked = !!b.defaultChecked);
}
function db$2(a2, b, c2) {
  if (b.hasOwnProperty("value") || b.hasOwnProperty("defaultValue")) {
    var d = b.type;
    if (!("submit" !== d && "reset" !== d || void 0 !== b.value && null !== b.value)) return;
    b = "" + a2._wrapperState.initialValue;
    c2 || b === a2.value || (a2.value = b);
    a2.defaultValue = b;
  }
  c2 = a2.name;
  "" !== c2 && (a2.name = "");
  a2.defaultChecked = !!a2._wrapperState.initialChecked;
  "" !== c2 && (a2.name = c2);
}
function cb$2(a2, b, c2) {
  if ("number" !== b || Xa$2(a2.ownerDocument) !== a2) null == c2 ? a2.defaultValue = "" + a2._wrapperState.initialValue : a2.defaultValue !== "" + c2 && (a2.defaultValue = "" + c2);
}
var eb$2 = Array.isArray;
function fb$2(a2, b, c2, d) {
  a2 = a2.options;
  if (b) {
    b = {};
    for (var e2 = 0; e2 < c2.length; e2++) b["$" + c2[e2]] = true;
    for (c2 = 0; c2 < a2.length; c2++) e2 = b.hasOwnProperty("$" + a2[c2].value), a2[c2].selected !== e2 && (a2[c2].selected = e2), e2 && d && (a2[c2].defaultSelected = true);
  } else {
    c2 = "" + Sa$2(c2);
    b = null;
    for (e2 = 0; e2 < a2.length; e2++) {
      if (a2[e2].value === c2) {
        a2[e2].selected = true;
        d && (a2[e2].defaultSelected = true);
        return;
      }
      null !== b || a2[e2].disabled || (b = a2[e2]);
    }
    null !== b && (b.selected = true);
  }
}
function gb$2(a2, b) {
  if (null != b.dangerouslySetInnerHTML) throw Error(p$2(91));
  return A$1({}, b, { value: void 0, defaultValue: void 0, children: "" + a2._wrapperState.initialValue });
}
function hb$2(a2, b) {
  var c2 = b.value;
  if (null == c2) {
    c2 = b.children;
    b = b.defaultValue;
    if (null != c2) {
      if (null != b) throw Error(p$2(92));
      if (eb$2(c2)) {
        if (1 < c2.length) throw Error(p$2(93));
        c2 = c2[0];
      }
      b = c2;
    }
    null == b && (b = "");
    c2 = b;
  }
  a2._wrapperState = { initialValue: Sa$2(c2) };
}
function ib$2(a2, b) {
  var c2 = Sa$2(b.value), d = Sa$2(b.defaultValue);
  null != c2 && (c2 = "" + c2, c2 !== a2.value && (a2.value = c2), null == b.defaultValue && a2.defaultValue !== c2 && (a2.defaultValue = c2));
  null != d && (a2.defaultValue = "" + d);
}
function jb$2(a2) {
  var b = a2.textContent;
  b === a2._wrapperState.initialValue && "" !== b && null !== b && (a2.value = b);
}
function kb$2(a2) {
  switch (a2) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function lb$2(a2, b) {
  return null == a2 || "http://www.w3.org/1999/xhtml" === a2 ? kb$2(b) : "http://www.w3.org/2000/svg" === a2 && "foreignObject" === b ? "http://www.w3.org/1999/xhtml" : a2;
}
var mb$1, nb$1 = function(a2) {
  return "undefined" !== typeof MSApp && MSApp.execUnsafeLocalFunction ? function(b, c2, d, e2) {
    MSApp.execUnsafeLocalFunction(function() {
      return a2(b, c2, d, e2);
    });
  } : a2;
}(function(a2, b) {
  if ("http://www.w3.org/2000/svg" !== a2.namespaceURI || "innerHTML" in a2) a2.innerHTML = b;
  else {
    mb$1 = mb$1 || document.createElement("div");
    mb$1.innerHTML = "<svg>" + b.valueOf().toString() + "</svg>";
    for (b = mb$1.firstChild; a2.firstChild; ) a2.removeChild(a2.firstChild);
    for (; b.firstChild; ) a2.appendChild(b.firstChild);
  }
});
function ob$2(a2, b) {
  if (b) {
    var c2 = a2.firstChild;
    if (c2 && c2 === a2.lastChild && 3 === c2.nodeType) {
      c2.nodeValue = b;
      return;
    }
  }
  a2.textContent = b;
}
var pb$2 = {
  animationIterationCount: true,
  aspectRatio: true,
  borderImageOutset: true,
  borderImageSlice: true,
  borderImageWidth: true,
  boxFlex: true,
  boxFlexGroup: true,
  boxOrdinalGroup: true,
  columnCount: true,
  columns: true,
  flex: true,
  flexGrow: true,
  flexPositive: true,
  flexShrink: true,
  flexNegative: true,
  flexOrder: true,
  gridArea: true,
  gridRow: true,
  gridRowEnd: true,
  gridRowSpan: true,
  gridRowStart: true,
  gridColumn: true,
  gridColumnEnd: true,
  gridColumnSpan: true,
  gridColumnStart: true,
  fontWeight: true,
  lineClamp: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  tabSize: true,
  widows: true,
  zIndex: true,
  zoom: true,
  fillOpacity: true,
  floodOpacity: true,
  stopOpacity: true,
  strokeDasharray: true,
  strokeDashoffset: true,
  strokeMiterlimit: true,
  strokeOpacity: true,
  strokeWidth: true
}, qb$2 = ["Webkit", "ms", "Moz", "O"];
Object.keys(pb$2).forEach(function(a2) {
  qb$2.forEach(function(b) {
    b = b + a2.charAt(0).toUpperCase() + a2.substring(1);
    pb$2[b] = pb$2[a2];
  });
});
function rb$2(a2, b, c2) {
  return null == b || "boolean" === typeof b || "" === b ? "" : c2 || "number" !== typeof b || 0 === b || pb$2.hasOwnProperty(a2) && pb$2[a2] ? ("" + b).trim() : b + "px";
}
function sb$2(a2, b) {
  a2 = a2.style;
  for (var c2 in b) if (b.hasOwnProperty(c2)) {
    var d = 0 === c2.indexOf("--"), e2 = rb$2(c2, b[c2], d);
    "float" === c2 && (c2 = "cssFloat");
    d ? a2.setProperty(c2, e2) : a2[c2] = e2;
  }
}
var tb$2 = A$1({ menuitem: true }, { area: true, base: true, br: true, col: true, embed: true, hr: true, img: true, input: true, keygen: true, link: true, meta: true, param: true, source: true, track: true, wbr: true });
function ub$2(a2, b) {
  if (b) {
    if (tb$2[a2] && (null != b.children || null != b.dangerouslySetInnerHTML)) throw Error(p$2(137, a2));
    if (null != b.dangerouslySetInnerHTML) {
      if (null != b.children) throw Error(p$2(60));
      if ("object" !== typeof b.dangerouslySetInnerHTML || !("__html" in b.dangerouslySetInnerHTML)) throw Error(p$2(61));
    }
    if (null != b.style && "object" !== typeof b.style) throw Error(p$2(62));
  }
}
function vb$2(a2, b) {
  if (-1 === a2.indexOf("-")) return "string" === typeof b.is;
  switch (a2) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return false;
    default:
      return true;
  }
}
var wb$2 = null;
function xb$2(a2) {
  a2 = a2.target || a2.srcElement || window;
  a2.correspondingUseElement && (a2 = a2.correspondingUseElement);
  return 3 === a2.nodeType ? a2.parentNode : a2;
}
var yb$2 = null, zb$2 = null, Ab$2 = null;
function Bb$2(a2) {
  if (a2 = Cb$2(a2)) {
    if ("function" !== typeof yb$2) throw Error(p$2(280));
    var b = a2.stateNode;
    b && (b = Db$2(b), yb$2(a2.stateNode, a2.type, b));
  }
}
function Eb$2(a2) {
  zb$2 ? Ab$2 ? Ab$2.push(a2) : Ab$2 = [a2] : zb$2 = a2;
}
function Fb$1() {
  if (zb$2) {
    var a2 = zb$2, b = Ab$2;
    Ab$2 = zb$2 = null;
    Bb$2(a2);
    if (b) for (a2 = 0; a2 < b.length; a2++) Bb$2(b[a2]);
  }
}
function Gb$2(a2, b) {
  return a2(b);
}
function Hb$2() {
}
var Ib$2 = false;
function Jb$2(a2, b, c2) {
  if (Ib$2) return a2(b, c2);
  Ib$2 = true;
  try {
    return Gb$2(a2, b, c2);
  } finally {
    if (Ib$2 = false, null !== zb$2 || null !== Ab$2) Hb$2(), Fb$1();
  }
}
function Kb$2(a2, b) {
  var c2 = a2.stateNode;
  if (null === c2) return null;
  var d = Db$2(c2);
  if (null === d) return null;
  c2 = d[b];
  a: switch (b) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
      (d = !d.disabled) || (a2 = a2.type, d = !("button" === a2 || "input" === a2 || "select" === a2 || "textarea" === a2));
      a2 = !d;
      break a;
    default:
      a2 = false;
  }
  if (a2) return null;
  if (c2 && "function" !== typeof c2) throw Error(p$2(231, b, typeof c2));
  return c2;
}
var Lb$2 = false;
if (ia$2) try {
  var Mb$2 = {};
  Object.defineProperty(Mb$2, "passive", { get: function() {
    Lb$2 = true;
  } });
  window.addEventListener("test", Mb$2, Mb$2);
  window.removeEventListener("test", Mb$2, Mb$2);
} catch (a2) {
  Lb$2 = false;
}
function Nb$2(a2, b, c2, d, e2, f2, g, h, k2) {
  var l2 = Array.prototype.slice.call(arguments, 3);
  try {
    b.apply(c2, l2);
  } catch (m2) {
    this.onError(m2);
  }
}
var Ob$2 = false, Pb$2 = null, Qb$2 = false, Rb$2 = null, Sb$2 = { onError: function(a2) {
  Ob$2 = true;
  Pb$2 = a2;
} };
function Tb$2(a2, b, c2, d, e2, f2, g, h, k2) {
  Ob$2 = false;
  Pb$2 = null;
  Nb$2.apply(Sb$2, arguments);
}
function Ub$1(a2, b, c2, d, e2, f2, g, h, k2) {
  Tb$2.apply(this, arguments);
  if (Ob$2) {
    if (Ob$2) {
      var l2 = Pb$2;
      Ob$2 = false;
      Pb$2 = null;
    } else throw Error(p$2(198));
    Qb$2 || (Qb$2 = true, Rb$2 = l2);
  }
}
function Vb$1(a2) {
  var b = a2, c2 = a2;
  if (a2.alternate) for (; b.return; ) b = b.return;
  else {
    a2 = b;
    do
      b = a2, 0 !== (b.flags & 4098) && (c2 = b.return), a2 = b.return;
    while (a2);
  }
  return 3 === b.tag ? c2 : null;
}
function Wb$1(a2) {
  if (13 === a2.tag) {
    var b = a2.memoizedState;
    null === b && (a2 = a2.alternate, null !== a2 && (b = a2.memoizedState));
    if (null !== b) return b.dehydrated;
  }
  return null;
}
function Xb$1(a2) {
  if (Vb$1(a2) !== a2) throw Error(p$2(188));
}
function Yb$1(a2) {
  var b = a2.alternate;
  if (!b) {
    b = Vb$1(a2);
    if (null === b) throw Error(p$2(188));
    return b !== a2 ? null : a2;
  }
  for (var c2 = a2, d = b; ; ) {
    var e2 = c2.return;
    if (null === e2) break;
    var f2 = e2.alternate;
    if (null === f2) {
      d = e2.return;
      if (null !== d) {
        c2 = d;
        continue;
      }
      break;
    }
    if (e2.child === f2.child) {
      for (f2 = e2.child; f2; ) {
        if (f2 === c2) return Xb$1(e2), a2;
        if (f2 === d) return Xb$1(e2), b;
        f2 = f2.sibling;
      }
      throw Error(p$2(188));
    }
    if (c2.return !== d.return) c2 = e2, d = f2;
    else {
      for (var g = false, h = e2.child; h; ) {
        if (h === c2) {
          g = true;
          c2 = e2;
          d = f2;
          break;
        }
        if (h === d) {
          g = true;
          d = e2;
          c2 = f2;
          break;
        }
        h = h.sibling;
      }
      if (!g) {
        for (h = f2.child; h; ) {
          if (h === c2) {
            g = true;
            c2 = f2;
            d = e2;
            break;
          }
          if (h === d) {
            g = true;
            d = f2;
            c2 = e2;
            break;
          }
          h = h.sibling;
        }
        if (!g) throw Error(p$2(189));
      }
    }
    if (c2.alternate !== d) throw Error(p$2(190));
  }
  if (3 !== c2.tag) throw Error(p$2(188));
  return c2.stateNode.current === c2 ? a2 : b;
}
function Zb$1(a2) {
  a2 = Yb$1(a2);
  return null !== a2 ? $b$1(a2) : null;
}
function $b$1(a2) {
  if (5 === a2.tag || 6 === a2.tag) return a2;
  for (a2 = a2.child; null !== a2; ) {
    var b = $b$1(a2);
    if (null !== b) return b;
    a2 = a2.sibling;
  }
  return null;
}
var ac$1 = ca$1.unstable_scheduleCallback, bc$1 = ca$1.unstable_cancelCallback, cc$1 = ca$1.unstable_shouldYield, dc$1 = ca$1.unstable_requestPaint, B$2 = ca$1.unstable_now, ec$1 = ca$1.unstable_getCurrentPriorityLevel, fc$1 = ca$1.unstable_ImmediatePriority, gc$1 = ca$1.unstable_UserBlockingPriority, hc$1 = ca$1.unstable_NormalPriority, ic$1 = ca$1.unstable_LowPriority, jc$1 = ca$1.unstable_IdlePriority, kc$1 = null, lc$1 = null;
function mc$1(a2) {
  if (lc$1 && "function" === typeof lc$1.onCommitFiberRoot) try {
    lc$1.onCommitFiberRoot(kc$1, a2, void 0, 128 === (a2.current.flags & 128));
  } catch (b) {
  }
}
var oc$1 = Math.clz32 ? Math.clz32 : nc$1, pc$1 = Math.log, qc$1 = Math.LN2;
function nc$1(a2) {
  a2 >>>= 0;
  return 0 === a2 ? 32 : 31 - (pc$1(a2) / qc$1 | 0) | 0;
}
var rc$1 = 64, sc$1 = 4194304;
function tc$1(a2) {
  switch (a2 & -a2) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return a2 & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return a2 & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return a2;
  }
}
function uc$1(a2, b) {
  var c2 = a2.pendingLanes;
  if (0 === c2) return 0;
  var d = 0, e2 = a2.suspendedLanes, f2 = a2.pingedLanes, g = c2 & 268435455;
  if (0 !== g) {
    var h = g & ~e2;
    0 !== h ? d = tc$1(h) : (f2 &= g, 0 !== f2 && (d = tc$1(f2)));
  } else g = c2 & ~e2, 0 !== g ? d = tc$1(g) : 0 !== f2 && (d = tc$1(f2));
  if (0 === d) return 0;
  if (0 !== b && b !== d && 0 === (b & e2) && (e2 = d & -d, f2 = b & -b, e2 >= f2 || 16 === e2 && 0 !== (f2 & 4194240))) return b;
  0 !== (d & 4) && (d |= c2 & 16);
  b = a2.entangledLanes;
  if (0 !== b) for (a2 = a2.entanglements, b &= d; 0 < b; ) c2 = 31 - oc$1(b), e2 = 1 << c2, d |= a2[c2], b &= ~e2;
  return d;
}
function vc$1(a2, b) {
  switch (a2) {
    case 1:
    case 2:
    case 4:
      return b + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return b + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function wc$1(a2, b) {
  for (var c2 = a2.suspendedLanes, d = a2.pingedLanes, e2 = a2.expirationTimes, f2 = a2.pendingLanes; 0 < f2; ) {
    var g = 31 - oc$1(f2), h = 1 << g, k2 = e2[g];
    if (-1 === k2) {
      if (0 === (h & c2) || 0 !== (h & d)) e2[g] = vc$1(h, b);
    } else k2 <= b && (a2.expiredLanes |= h);
    f2 &= ~h;
  }
}
function xc$1(a2) {
  a2 = a2.pendingLanes & -1073741825;
  return 0 !== a2 ? a2 : a2 & 1073741824 ? 1073741824 : 0;
}
function yc$1() {
  var a2 = rc$1;
  rc$1 <<= 1;
  0 === (rc$1 & 4194240) && (rc$1 = 64);
  return a2;
}
function zc$1(a2) {
  for (var b = [], c2 = 0; 31 > c2; c2++) b.push(a2);
  return b;
}
function Ac$1(a2, b, c2) {
  a2.pendingLanes |= b;
  536870912 !== b && (a2.suspendedLanes = 0, a2.pingedLanes = 0);
  a2 = a2.eventTimes;
  b = 31 - oc$1(b);
  a2[b] = c2;
}
function Bc$1(a2, b) {
  var c2 = a2.pendingLanes & ~b;
  a2.pendingLanes = b;
  a2.suspendedLanes = 0;
  a2.pingedLanes = 0;
  a2.expiredLanes &= b;
  a2.mutableReadLanes &= b;
  a2.entangledLanes &= b;
  b = a2.entanglements;
  var d = a2.eventTimes;
  for (a2 = a2.expirationTimes; 0 < c2; ) {
    var e2 = 31 - oc$1(c2), f2 = 1 << e2;
    b[e2] = 0;
    d[e2] = -1;
    a2[e2] = -1;
    c2 &= ~f2;
  }
}
function Cc$1(a2, b) {
  var c2 = a2.entangledLanes |= b;
  for (a2 = a2.entanglements; c2; ) {
    var d = 31 - oc$1(c2), e2 = 1 << d;
    e2 & b | a2[d] & b && (a2[d] |= b);
    c2 &= ~e2;
  }
}
var C$1 = 0;
function Dc$1(a2) {
  a2 &= -a2;
  return 1 < a2 ? 4 < a2 ? 0 !== (a2 & 268435455) ? 16 : 536870912 : 4 : 1;
}
var Ec$1, Fc$1, Gc$1, Hc$1, Ic$1, Jc$1 = false, Kc$1 = [], Lc$1 = null, Mc$1 = null, Nc$1 = null, Oc$1 = /* @__PURE__ */ new Map(), Pc$1 = /* @__PURE__ */ new Map(), Qc$1 = [], Rc$1 = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function Sc$1(a2, b) {
  switch (a2) {
    case "focusin":
    case "focusout":
      Lc$1 = null;
      break;
    case "dragenter":
    case "dragleave":
      Mc$1 = null;
      break;
    case "mouseover":
    case "mouseout":
      Nc$1 = null;
      break;
    case "pointerover":
    case "pointerout":
      Oc$1.delete(b.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Pc$1.delete(b.pointerId);
  }
}
function Tc$1(a2, b, c2, d, e2, f2) {
  if (null === a2 || a2.nativeEvent !== f2) return a2 = { blockedOn: b, domEventName: c2, eventSystemFlags: d, nativeEvent: f2, targetContainers: [e2] }, null !== b && (b = Cb$2(b), null !== b && Fc$1(b)), a2;
  a2.eventSystemFlags |= d;
  b = a2.targetContainers;
  null !== e2 && -1 === b.indexOf(e2) && b.push(e2);
  return a2;
}
function Uc$1(a2, b, c2, d, e2) {
  switch (b) {
    case "focusin":
      return Lc$1 = Tc$1(Lc$1, a2, b, c2, d, e2), true;
    case "dragenter":
      return Mc$1 = Tc$1(Mc$1, a2, b, c2, d, e2), true;
    case "mouseover":
      return Nc$1 = Tc$1(Nc$1, a2, b, c2, d, e2), true;
    case "pointerover":
      var f2 = e2.pointerId;
      Oc$1.set(f2, Tc$1(Oc$1.get(f2) || null, a2, b, c2, d, e2));
      return true;
    case "gotpointercapture":
      return f2 = e2.pointerId, Pc$1.set(f2, Tc$1(Pc$1.get(f2) || null, a2, b, c2, d, e2)), true;
  }
  return false;
}
function Vc$1(a2) {
  var b = Wc$1(a2.target);
  if (null !== b) {
    var c2 = Vb$1(b);
    if (null !== c2) {
      if (b = c2.tag, 13 === b) {
        if (b = Wb$1(c2), null !== b) {
          a2.blockedOn = b;
          Ic$1(a2.priority, function() {
            Gc$1(c2);
          });
          return;
        }
      } else if (3 === b && c2.stateNode.current.memoizedState.isDehydrated) {
        a2.blockedOn = 3 === c2.tag ? c2.stateNode.containerInfo : null;
        return;
      }
    }
  }
  a2.blockedOn = null;
}
function Xc$1(a2) {
  if (null !== a2.blockedOn) return false;
  for (var b = a2.targetContainers; 0 < b.length; ) {
    var c2 = Yc$1(a2.domEventName, a2.eventSystemFlags, b[0], a2.nativeEvent);
    if (null === c2) {
      c2 = a2.nativeEvent;
      var d = new c2.constructor(c2.type, c2);
      wb$2 = d;
      c2.target.dispatchEvent(d);
      wb$2 = null;
    } else return b = Cb$2(c2), null !== b && Fc$1(b), a2.blockedOn = c2, false;
    b.shift();
  }
  return true;
}
function Zc$1(a2, b, c2) {
  Xc$1(a2) && c2.delete(b);
}
function $c$1() {
  Jc$1 = false;
  null !== Lc$1 && Xc$1(Lc$1) && (Lc$1 = null);
  null !== Mc$1 && Xc$1(Mc$1) && (Mc$1 = null);
  null !== Nc$1 && Xc$1(Nc$1) && (Nc$1 = null);
  Oc$1.forEach(Zc$1);
  Pc$1.forEach(Zc$1);
}
function ad$1(a2, b) {
  a2.blockedOn === b && (a2.blockedOn = null, Jc$1 || (Jc$1 = true, ca$1.unstable_scheduleCallback(ca$1.unstable_NormalPriority, $c$1)));
}
function bd$1(a2) {
  function b(b2) {
    return ad$1(b2, a2);
  }
  if (0 < Kc$1.length) {
    ad$1(Kc$1[0], a2);
    for (var c2 = 1; c2 < Kc$1.length; c2++) {
      var d = Kc$1[c2];
      d.blockedOn === a2 && (d.blockedOn = null);
    }
  }
  null !== Lc$1 && ad$1(Lc$1, a2);
  null !== Mc$1 && ad$1(Mc$1, a2);
  null !== Nc$1 && ad$1(Nc$1, a2);
  Oc$1.forEach(b);
  Pc$1.forEach(b);
  for (c2 = 0; c2 < Qc$1.length; c2++) d = Qc$1[c2], d.blockedOn === a2 && (d.blockedOn = null);
  for (; 0 < Qc$1.length && (c2 = Qc$1[0], null === c2.blockedOn); ) Vc$1(c2), null === c2.blockedOn && Qc$1.shift();
}
var cd$1 = ua$2.ReactCurrentBatchConfig, dd$1 = true;
function ed$1(a2, b, c2, d) {
  var e2 = C$1, f2 = cd$1.transition;
  cd$1.transition = null;
  try {
    C$1 = 1, fd$1(a2, b, c2, d);
  } finally {
    C$1 = e2, cd$1.transition = f2;
  }
}
function gd$1(a2, b, c2, d) {
  var e2 = C$1, f2 = cd$1.transition;
  cd$1.transition = null;
  try {
    C$1 = 4, fd$1(a2, b, c2, d);
  } finally {
    C$1 = e2, cd$1.transition = f2;
  }
}
function fd$1(a2, b, c2, d) {
  if (dd$1) {
    var e2 = Yc$1(a2, b, c2, d);
    if (null === e2) hd$1(a2, b, d, id$1, c2), Sc$1(a2, d);
    else if (Uc$1(e2, a2, b, c2, d)) d.stopPropagation();
    else if (Sc$1(a2, d), b & 4 && -1 < Rc$1.indexOf(a2)) {
      for (; null !== e2; ) {
        var f2 = Cb$2(e2);
        null !== f2 && Ec$1(f2);
        f2 = Yc$1(a2, b, c2, d);
        null === f2 && hd$1(a2, b, d, id$1, c2);
        if (f2 === e2) break;
        e2 = f2;
      }
      null !== e2 && d.stopPropagation();
    } else hd$1(a2, b, d, null, c2);
  }
}
var id$1 = null;
function Yc$1(a2, b, c2, d) {
  id$1 = null;
  a2 = xb$2(d);
  a2 = Wc$1(a2);
  if (null !== a2) if (b = Vb$1(a2), null === b) a2 = null;
  else if (c2 = b.tag, 13 === c2) {
    a2 = Wb$1(b);
    if (null !== a2) return a2;
    a2 = null;
  } else if (3 === c2) {
    if (b.stateNode.current.memoizedState.isDehydrated) return 3 === b.tag ? b.stateNode.containerInfo : null;
    a2 = null;
  } else b !== a2 && (a2 = null);
  id$1 = a2;
  return null;
}
function jd$1(a2) {
  switch (a2) {
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 1;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "toggle":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 4;
    case "message":
      switch (ec$1()) {
        case fc$1:
          return 1;
        case gc$1:
          return 4;
        case hc$1:
        case ic$1:
          return 16;
        case jc$1:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var kd$1 = null, ld$1 = null, md = null;
function nd() {
  if (md) return md;
  var a2, b = ld$1, c2 = b.length, d, e2 = "value" in kd$1 ? kd$1.value : kd$1.textContent, f2 = e2.length;
  for (a2 = 0; a2 < c2 && b[a2] === e2[a2]; a2++) ;
  var g = c2 - a2;
  for (d = 1; d <= g && b[c2 - d] === e2[f2 - d]; d++) ;
  return md = e2.slice(a2, 1 < d ? 1 - d : void 0);
}
function od(a2) {
  var b = a2.keyCode;
  "charCode" in a2 ? (a2 = a2.charCode, 0 === a2 && 13 === b && (a2 = 13)) : a2 = b;
  10 === a2 && (a2 = 13);
  return 32 <= a2 || 13 === a2 ? a2 : 0;
}
function pd() {
  return true;
}
function qd() {
  return false;
}
function rd(a2) {
  function b(b2, d, e2, f2, g) {
    this._reactName = b2;
    this._targetInst = e2;
    this.type = d;
    this.nativeEvent = f2;
    this.target = g;
    this.currentTarget = null;
    for (var c2 in a2) a2.hasOwnProperty(c2) && (b2 = a2[c2], this[c2] = b2 ? b2(f2) : f2[c2]);
    this.isDefaultPrevented = (null != f2.defaultPrevented ? f2.defaultPrevented : false === f2.returnValue) ? pd : qd;
    this.isPropagationStopped = qd;
    return this;
  }
  A$1(b.prototype, { preventDefault: function() {
    this.defaultPrevented = true;
    var a3 = this.nativeEvent;
    a3 && (a3.preventDefault ? a3.preventDefault() : "unknown" !== typeof a3.returnValue && (a3.returnValue = false), this.isDefaultPrevented = pd);
  }, stopPropagation: function() {
    var a3 = this.nativeEvent;
    a3 && (a3.stopPropagation ? a3.stopPropagation() : "unknown" !== typeof a3.cancelBubble && (a3.cancelBubble = true), this.isPropagationStopped = pd);
  }, persist: function() {
  }, isPersistent: pd });
  return b;
}
var sd = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(a2) {
  return a2.timeStamp || Date.now();
}, defaultPrevented: 0, isTrusted: 0 }, td = rd(sd), ud = A$1({}, sd, { view: 0, detail: 0 }), vd = rd(ud), wd, xd, yd, Ad = A$1({}, ud, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: zd, button: 0, buttons: 0, relatedTarget: function(a2) {
  return void 0 === a2.relatedTarget ? a2.fromElement === a2.srcElement ? a2.toElement : a2.fromElement : a2.relatedTarget;
}, movementX: function(a2) {
  if ("movementX" in a2) return a2.movementX;
  a2 !== yd && (yd && "mousemove" === a2.type ? (wd = a2.screenX - yd.screenX, xd = a2.screenY - yd.screenY) : xd = wd = 0, yd = a2);
  return wd;
}, movementY: function(a2) {
  return "movementY" in a2 ? a2.movementY : xd;
} }), Bd = rd(Ad), Cd = A$1({}, Ad, { dataTransfer: 0 }), Dd = rd(Cd), Ed = A$1({}, ud, { relatedTarget: 0 }), Fd = rd(Ed), Gd = A$1({}, sd, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Hd = rd(Gd), Id = A$1({}, sd, { clipboardData: function(a2) {
  return "clipboardData" in a2 ? a2.clipboardData : window.clipboardData;
} }), Jd = rd(Id), Kd = A$1({}, sd, { data: 0 }), Ld = rd(Kd), Md = {
  Esc: "Escape",
  Spacebar: " ",
  Left: "ArrowLeft",
  Up: "ArrowUp",
  Right: "ArrowRight",
  Down: "ArrowDown",
  Del: "Delete",
  Win: "OS",
  Menu: "ContextMenu",
  Apps: "ContextMenu",
  Scroll: "ScrollLock",
  MozPrintableKey: "Unidentified"
}, Nd = {
  8: "Backspace",
  9: "Tab",
  12: "Clear",
  13: "Enter",
  16: "Shift",
  17: "Control",
  18: "Alt",
  19: "Pause",
  20: "CapsLock",
  27: "Escape",
  32: " ",
  33: "PageUp",
  34: "PageDown",
  35: "End",
  36: "Home",
  37: "ArrowLeft",
  38: "ArrowUp",
  39: "ArrowRight",
  40: "ArrowDown",
  45: "Insert",
  46: "Delete",
  112: "F1",
  113: "F2",
  114: "F3",
  115: "F4",
  116: "F5",
  117: "F6",
  118: "F7",
  119: "F8",
  120: "F9",
  121: "F10",
  122: "F11",
  123: "F12",
  144: "NumLock",
  145: "ScrollLock",
  224: "Meta"
}, Od = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function Pd(a2) {
  var b = this.nativeEvent;
  return b.getModifierState ? b.getModifierState(a2) : (a2 = Od[a2]) ? !!b[a2] : false;
}
function zd() {
  return Pd;
}
var Qd = A$1({}, ud, { key: function(a2) {
  if (a2.key) {
    var b = Md[a2.key] || a2.key;
    if ("Unidentified" !== b) return b;
  }
  return "keypress" === a2.type ? (a2 = od(a2), 13 === a2 ? "Enter" : String.fromCharCode(a2)) : "keydown" === a2.type || "keyup" === a2.type ? Nd[a2.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: zd, charCode: function(a2) {
  return "keypress" === a2.type ? od(a2) : 0;
}, keyCode: function(a2) {
  return "keydown" === a2.type || "keyup" === a2.type ? a2.keyCode : 0;
}, which: function(a2) {
  return "keypress" === a2.type ? od(a2) : "keydown" === a2.type || "keyup" === a2.type ? a2.keyCode : 0;
} }), Rd = rd(Qd), Sd = A$1({}, Ad, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Td = rd(Sd), Ud = A$1({}, ud, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: zd }), Vd = rd(Ud), Wd = A$1({}, sd, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), Xd = rd(Wd), Yd = A$1({}, Ad, {
  deltaX: function(a2) {
    return "deltaX" in a2 ? a2.deltaX : "wheelDeltaX" in a2 ? -a2.wheelDeltaX : 0;
  },
  deltaY: function(a2) {
    return "deltaY" in a2 ? a2.deltaY : "wheelDeltaY" in a2 ? -a2.wheelDeltaY : "wheelDelta" in a2 ? -a2.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), Zd = rd(Yd), $d = [9, 13, 27, 32], ae = ia$2 && "CompositionEvent" in window, be = null;
ia$2 && "documentMode" in document && (be = document.documentMode);
var ce = ia$2 && "TextEvent" in window && !be, de = ia$2 && (!ae || be && 8 < be && 11 >= be), ee = String.fromCharCode(32), fe = false;
function ge(a2, b) {
  switch (a2) {
    case "keyup":
      return -1 !== $d.indexOf(b.keyCode);
    case "keydown":
      return 229 !== b.keyCode;
    case "keypress":
    case "mousedown":
    case "focusout":
      return true;
    default:
      return false;
  }
}
function he(a2) {
  a2 = a2.detail;
  return "object" === typeof a2 && "data" in a2 ? a2.data : null;
}
var ie = false;
function je(a2, b) {
  switch (a2) {
    case "compositionend":
      return he(b);
    case "keypress":
      if (32 !== b.which) return null;
      fe = true;
      return ee;
    case "textInput":
      return a2 = b.data, a2 === ee && fe ? null : a2;
    default:
      return null;
  }
}
function ke(a2, b) {
  if (ie) return "compositionend" === a2 || !ae && ge(a2, b) ? (a2 = nd(), md = ld$1 = kd$1 = null, ie = false, a2) : null;
  switch (a2) {
    case "paste":
      return null;
    case "keypress":
      if (!(b.ctrlKey || b.altKey || b.metaKey) || b.ctrlKey && b.altKey) {
        if (b.char && 1 < b.char.length) return b.char;
        if (b.which) return String.fromCharCode(b.which);
      }
      return null;
    case "compositionend":
      return de && "ko" !== b.locale ? null : b.data;
    default:
      return null;
  }
}
var le = { color: true, date: true, datetime: true, "datetime-local": true, email: true, month: true, number: true, password: true, range: true, search: true, tel: true, text: true, time: true, url: true, week: true };
function me(a2) {
  var b = a2 && a2.nodeName && a2.nodeName.toLowerCase();
  return "input" === b ? !!le[a2.type] : "textarea" === b ? true : false;
}
function ne(a2, b, c2, d) {
  Eb$2(d);
  b = oe(b, "onChange");
  0 < b.length && (c2 = new td("onChange", "change", null, c2, d), a2.push({ event: c2, listeners: b }));
}
var pe = null, qe = null;
function re(a2) {
  se(a2, 0);
}
function te(a2) {
  var b = ue(a2);
  if (Wa$2(b)) return a2;
}
function ve(a2, b) {
  if ("change" === a2) return b;
}
var we = false;
if (ia$2) {
  var xe;
  if (ia$2) {
    var ye = "oninput" in document;
    if (!ye) {
      var ze = document.createElement("div");
      ze.setAttribute("oninput", "return;");
      ye = "function" === typeof ze.oninput;
    }
    xe = ye;
  } else xe = false;
  we = xe && (!document.documentMode || 9 < document.documentMode);
}
function Ae() {
  pe && (pe.detachEvent("onpropertychange", Be), qe = pe = null);
}
function Be(a2) {
  if ("value" === a2.propertyName && te(qe)) {
    var b = [];
    ne(b, qe, a2, xb$2(a2));
    Jb$2(re, b);
  }
}
function Ce(a2, b, c2) {
  "focusin" === a2 ? (Ae(), pe = b, qe = c2, pe.attachEvent("onpropertychange", Be)) : "focusout" === a2 && Ae();
}
function De(a2) {
  if ("selectionchange" === a2 || "keyup" === a2 || "keydown" === a2) return te(qe);
}
function Ee(a2, b) {
  if ("click" === a2) return te(b);
}
function Fe(a2, b) {
  if ("input" === a2 || "change" === a2) return te(b);
}
function Ge(a2, b) {
  return a2 === b && (0 !== a2 || 1 / a2 === 1 / b) || a2 !== a2 && b !== b;
}
var He = "function" === typeof Object.is ? Object.is : Ge;
function Ie(a2, b) {
  if (He(a2, b)) return true;
  if ("object" !== typeof a2 || null === a2 || "object" !== typeof b || null === b) return false;
  var c2 = Object.keys(a2), d = Object.keys(b);
  if (c2.length !== d.length) return false;
  for (d = 0; d < c2.length; d++) {
    var e2 = c2[d];
    if (!ja$2.call(b, e2) || !He(a2[e2], b[e2])) return false;
  }
  return true;
}
function Je(a2) {
  for (; a2 && a2.firstChild; ) a2 = a2.firstChild;
  return a2;
}
function Ke(a2, b) {
  var c2 = Je(a2);
  a2 = 0;
  for (var d; c2; ) {
    if (3 === c2.nodeType) {
      d = a2 + c2.textContent.length;
      if (a2 <= b && d >= b) return { node: c2, offset: b - a2 };
      a2 = d;
    }
    a: {
      for (; c2; ) {
        if (c2.nextSibling) {
          c2 = c2.nextSibling;
          break a;
        }
        c2 = c2.parentNode;
      }
      c2 = void 0;
    }
    c2 = Je(c2);
  }
}
function Le(a2, b) {
  return a2 && b ? a2 === b ? true : a2 && 3 === a2.nodeType ? false : b && 3 === b.nodeType ? Le(a2, b.parentNode) : "contains" in a2 ? a2.contains(b) : a2.compareDocumentPosition ? !!(a2.compareDocumentPosition(b) & 16) : false : false;
}
function Me() {
  for (var a2 = window, b = Xa$2(); b instanceof a2.HTMLIFrameElement; ) {
    try {
      var c2 = "string" === typeof b.contentWindow.location.href;
    } catch (d) {
      c2 = false;
    }
    if (c2) a2 = b.contentWindow;
    else break;
    b = Xa$2(a2.document);
  }
  return b;
}
function Ne(a2) {
  var b = a2 && a2.nodeName && a2.nodeName.toLowerCase();
  return b && ("input" === b && ("text" === a2.type || "search" === a2.type || "tel" === a2.type || "url" === a2.type || "password" === a2.type) || "textarea" === b || "true" === a2.contentEditable);
}
function Oe(a2) {
  var b = Me(), c2 = a2.focusedElem, d = a2.selectionRange;
  if (b !== c2 && c2 && c2.ownerDocument && Le(c2.ownerDocument.documentElement, c2)) {
    if (null !== d && Ne(c2)) {
      if (b = d.start, a2 = d.end, void 0 === a2 && (a2 = b), "selectionStart" in c2) c2.selectionStart = b, c2.selectionEnd = Math.min(a2, c2.value.length);
      else if (a2 = (b = c2.ownerDocument || document) && b.defaultView || window, a2.getSelection) {
        a2 = a2.getSelection();
        var e2 = c2.textContent.length, f2 = Math.min(d.start, e2);
        d = void 0 === d.end ? f2 : Math.min(d.end, e2);
        !a2.extend && f2 > d && (e2 = d, d = f2, f2 = e2);
        e2 = Ke(c2, f2);
        var g = Ke(
          c2,
          d
        );
        e2 && g && (1 !== a2.rangeCount || a2.anchorNode !== e2.node || a2.anchorOffset !== e2.offset || a2.focusNode !== g.node || a2.focusOffset !== g.offset) && (b = b.createRange(), b.setStart(e2.node, e2.offset), a2.removeAllRanges(), f2 > d ? (a2.addRange(b), a2.extend(g.node, g.offset)) : (b.setEnd(g.node, g.offset), a2.addRange(b)));
      }
    }
    b = [];
    for (a2 = c2; a2 = a2.parentNode; ) 1 === a2.nodeType && b.push({ element: a2, left: a2.scrollLeft, top: a2.scrollTop });
    "function" === typeof c2.focus && c2.focus();
    for (c2 = 0; c2 < b.length; c2++) a2 = b[c2], a2.element.scrollLeft = a2.left, a2.element.scrollTop = a2.top;
  }
}
var Pe = ia$2 && "documentMode" in document && 11 >= document.documentMode, Qe = null, Re = null, Se = null, Te = false;
function Ue(a2, b, c2) {
  var d = c2.window === c2 ? c2.document : 9 === c2.nodeType ? c2 : c2.ownerDocument;
  Te || null == Qe || Qe !== Xa$2(d) || (d = Qe, "selectionStart" in d && Ne(d) ? d = { start: d.selectionStart, end: d.selectionEnd } : (d = (d.ownerDocument && d.ownerDocument.defaultView || window).getSelection(), d = { anchorNode: d.anchorNode, anchorOffset: d.anchorOffset, focusNode: d.focusNode, focusOffset: d.focusOffset }), Se && Ie(Se, d) || (Se = d, d = oe(Re, "onSelect"), 0 < d.length && (b = new td("onSelect", "select", null, b, c2), a2.push({ event: b, listeners: d }), b.target = Qe)));
}
function Ve(a2, b) {
  var c2 = {};
  c2[a2.toLowerCase()] = b.toLowerCase();
  c2["Webkit" + a2] = "webkit" + b;
  c2["Moz" + a2] = "moz" + b;
  return c2;
}
var We = { animationend: Ve("Animation", "AnimationEnd"), animationiteration: Ve("Animation", "AnimationIteration"), animationstart: Ve("Animation", "AnimationStart"), transitionend: Ve("Transition", "TransitionEnd") }, Xe = {}, Ye = {};
ia$2 && (Ye = document.createElement("div").style, "AnimationEvent" in window || (delete We.animationend.animation, delete We.animationiteration.animation, delete We.animationstart.animation), "TransitionEvent" in window || delete We.transitionend.transition);
function Ze(a2) {
  if (Xe[a2]) return Xe[a2];
  if (!We[a2]) return a2;
  var b = We[a2], c2;
  for (c2 in b) if (b.hasOwnProperty(c2) && c2 in Ye) return Xe[a2] = b[c2];
  return a2;
}
var $e = Ze("animationend"), af = Ze("animationiteration"), bf = Ze("animationstart"), cf = Ze("transitionend"), df = /* @__PURE__ */ new Map(), ef = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function ff(a2, b) {
  df.set(a2, b);
  fa$2(b, [a2]);
}
for (var gf = 0; gf < ef.length; gf++) {
  var hf = ef[gf], jf = hf.toLowerCase(), kf = hf[0].toUpperCase() + hf.slice(1);
  ff(jf, "on" + kf);
}
ff($e, "onAnimationEnd");
ff(af, "onAnimationIteration");
ff(bf, "onAnimationStart");
ff("dblclick", "onDoubleClick");
ff("focusin", "onFocus");
ff("focusout", "onBlur");
ff(cf, "onTransitionEnd");
ha$2("onMouseEnter", ["mouseout", "mouseover"]);
ha$2("onMouseLeave", ["mouseout", "mouseover"]);
ha$2("onPointerEnter", ["pointerout", "pointerover"]);
ha$2("onPointerLeave", ["pointerout", "pointerover"]);
fa$2("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
fa$2("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
fa$2("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
fa$2("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
fa$2("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
fa$2("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var lf = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), mf = new Set("cancel close invalid load scroll toggle".split(" ").concat(lf));
function nf(a2, b, c2) {
  var d = a2.type || "unknown-event";
  a2.currentTarget = c2;
  Ub$1(d, b, void 0, a2);
  a2.currentTarget = null;
}
function se(a2, b) {
  b = 0 !== (b & 4);
  for (var c2 = 0; c2 < a2.length; c2++) {
    var d = a2[c2], e2 = d.event;
    d = d.listeners;
    a: {
      var f2 = void 0;
      if (b) for (var g = d.length - 1; 0 <= g; g--) {
        var h = d[g], k2 = h.instance, l2 = h.currentTarget;
        h = h.listener;
        if (k2 !== f2 && e2.isPropagationStopped()) break a;
        nf(e2, h, l2);
        f2 = k2;
      }
      else for (g = 0; g < d.length; g++) {
        h = d[g];
        k2 = h.instance;
        l2 = h.currentTarget;
        h = h.listener;
        if (k2 !== f2 && e2.isPropagationStopped()) break a;
        nf(e2, h, l2);
        f2 = k2;
      }
    }
  }
  if (Qb$2) throw a2 = Rb$2, Qb$2 = false, Rb$2 = null, a2;
}
function D$1(a2, b) {
  var c2 = b[of];
  void 0 === c2 && (c2 = b[of] = /* @__PURE__ */ new Set());
  var d = a2 + "__bubble";
  c2.has(d) || (pf(b, a2, 2, false), c2.add(d));
}
function qf(a2, b, c2) {
  var d = 0;
  b && (d |= 4);
  pf(c2, a2, d, b);
}
var rf = "_reactListening" + Math.random().toString(36).slice(2);
function sf(a2) {
  if (!a2[rf]) {
    a2[rf] = true;
    da$1.forEach(function(b2) {
      "selectionchange" !== b2 && (mf.has(b2) || qf(b2, false, a2), qf(b2, true, a2));
    });
    var b = 9 === a2.nodeType ? a2 : a2.ownerDocument;
    null === b || b[rf] || (b[rf] = true, qf("selectionchange", false, b));
  }
}
function pf(a2, b, c2, d) {
  switch (jd$1(b)) {
    case 1:
      var e2 = ed$1;
      break;
    case 4:
      e2 = gd$1;
      break;
    default:
      e2 = fd$1;
  }
  c2 = e2.bind(null, b, c2, a2);
  e2 = void 0;
  !Lb$2 || "touchstart" !== b && "touchmove" !== b && "wheel" !== b || (e2 = true);
  d ? void 0 !== e2 ? a2.addEventListener(b, c2, { capture: true, passive: e2 }) : a2.addEventListener(b, c2, true) : void 0 !== e2 ? a2.addEventListener(b, c2, { passive: e2 }) : a2.addEventListener(b, c2, false);
}
function hd$1(a2, b, c2, d, e2) {
  var f2 = d;
  if (0 === (b & 1) && 0 === (b & 2) && null !== d) a: for (; ; ) {
    if (null === d) return;
    var g = d.tag;
    if (3 === g || 4 === g) {
      var h = d.stateNode.containerInfo;
      if (h === e2 || 8 === h.nodeType && h.parentNode === e2) break;
      if (4 === g) for (g = d.return; null !== g; ) {
        var k2 = g.tag;
        if (3 === k2 || 4 === k2) {
          if (k2 = g.stateNode.containerInfo, k2 === e2 || 8 === k2.nodeType && k2.parentNode === e2) return;
        }
        g = g.return;
      }
      for (; null !== h; ) {
        g = Wc$1(h);
        if (null === g) return;
        k2 = g.tag;
        if (5 === k2 || 6 === k2) {
          d = f2 = g;
          continue a;
        }
        h = h.parentNode;
      }
    }
    d = d.return;
  }
  Jb$2(function() {
    var d2 = f2, e3 = xb$2(c2), g2 = [];
    a: {
      var h2 = df.get(a2);
      if (void 0 !== h2) {
        var k3 = td, n2 = a2;
        switch (a2) {
          case "keypress":
            if (0 === od(c2)) break a;
          case "keydown":
          case "keyup":
            k3 = Rd;
            break;
          case "focusin":
            n2 = "focus";
            k3 = Fd;
            break;
          case "focusout":
            n2 = "blur";
            k3 = Fd;
            break;
          case "beforeblur":
          case "afterblur":
            k3 = Fd;
            break;
          case "click":
            if (2 === c2.button) break a;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            k3 = Bd;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            k3 = Dd;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            k3 = Vd;
            break;
          case $e:
          case af:
          case bf:
            k3 = Hd;
            break;
          case cf:
            k3 = Xd;
            break;
          case "scroll":
            k3 = vd;
            break;
          case "wheel":
            k3 = Zd;
            break;
          case "copy":
          case "cut":
          case "paste":
            k3 = Jd;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            k3 = Td;
        }
        var t2 = 0 !== (b & 4), J2 = !t2 && "scroll" === a2, x2 = t2 ? null !== h2 ? h2 + "Capture" : null : h2;
        t2 = [];
        for (var w2 = d2, u2; null !== w2; ) {
          u2 = w2;
          var F2 = u2.stateNode;
          5 === u2.tag && null !== F2 && (u2 = F2, null !== x2 && (F2 = Kb$2(w2, x2), null != F2 && t2.push(tf(w2, F2, u2))));
          if (J2) break;
          w2 = w2.return;
        }
        0 < t2.length && (h2 = new k3(h2, n2, null, c2, e3), g2.push({ event: h2, listeners: t2 }));
      }
    }
    if (0 === (b & 7)) {
      a: {
        h2 = "mouseover" === a2 || "pointerover" === a2;
        k3 = "mouseout" === a2 || "pointerout" === a2;
        if (h2 && c2 !== wb$2 && (n2 = c2.relatedTarget || c2.fromElement) && (Wc$1(n2) || n2[uf])) break a;
        if (k3 || h2) {
          h2 = e3.window === e3 ? e3 : (h2 = e3.ownerDocument) ? h2.defaultView || h2.parentWindow : window;
          if (k3) {
            if (n2 = c2.relatedTarget || c2.toElement, k3 = d2, n2 = n2 ? Wc$1(n2) : null, null !== n2 && (J2 = Vb$1(n2), n2 !== J2 || 5 !== n2.tag && 6 !== n2.tag)) n2 = null;
          } else k3 = null, n2 = d2;
          if (k3 !== n2) {
            t2 = Bd;
            F2 = "onMouseLeave";
            x2 = "onMouseEnter";
            w2 = "mouse";
            if ("pointerout" === a2 || "pointerover" === a2) t2 = Td, F2 = "onPointerLeave", x2 = "onPointerEnter", w2 = "pointer";
            J2 = null == k3 ? h2 : ue(k3);
            u2 = null == n2 ? h2 : ue(n2);
            h2 = new t2(F2, w2 + "leave", k3, c2, e3);
            h2.target = J2;
            h2.relatedTarget = u2;
            F2 = null;
            Wc$1(e3) === d2 && (t2 = new t2(x2, w2 + "enter", n2, c2, e3), t2.target = u2, t2.relatedTarget = J2, F2 = t2);
            J2 = F2;
            if (k3 && n2) b: {
              t2 = k3;
              x2 = n2;
              w2 = 0;
              for (u2 = t2; u2; u2 = vf(u2)) w2++;
              u2 = 0;
              for (F2 = x2; F2; F2 = vf(F2)) u2++;
              for (; 0 < w2 - u2; ) t2 = vf(t2), w2--;
              for (; 0 < u2 - w2; ) x2 = vf(x2), u2--;
              for (; w2--; ) {
                if (t2 === x2 || null !== x2 && t2 === x2.alternate) break b;
                t2 = vf(t2);
                x2 = vf(x2);
              }
              t2 = null;
            }
            else t2 = null;
            null !== k3 && wf(g2, h2, k3, t2, false);
            null !== n2 && null !== J2 && wf(g2, J2, n2, t2, true);
          }
        }
      }
      a: {
        h2 = d2 ? ue(d2) : window;
        k3 = h2.nodeName && h2.nodeName.toLowerCase();
        if ("select" === k3 || "input" === k3 && "file" === h2.type) var na2 = ve;
        else if (me(h2)) if (we) na2 = Fe;
        else {
          na2 = De;
          var xa2 = Ce;
        }
        else (k3 = h2.nodeName) && "input" === k3.toLowerCase() && ("checkbox" === h2.type || "radio" === h2.type) && (na2 = Ee);
        if (na2 && (na2 = na2(a2, d2))) {
          ne(g2, na2, c2, e3);
          break a;
        }
        xa2 && xa2(a2, h2, d2);
        "focusout" === a2 && (xa2 = h2._wrapperState) && xa2.controlled && "number" === h2.type && cb$2(h2, "number", h2.value);
      }
      xa2 = d2 ? ue(d2) : window;
      switch (a2) {
        case "focusin":
          if (me(xa2) || "true" === xa2.contentEditable) Qe = xa2, Re = d2, Se = null;
          break;
        case "focusout":
          Se = Re = Qe = null;
          break;
        case "mousedown":
          Te = true;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          Te = false;
          Ue(g2, c2, e3);
          break;
        case "selectionchange":
          if (Pe) break;
        case "keydown":
        case "keyup":
          Ue(g2, c2, e3);
      }
      var $a2;
      if (ae) b: {
        switch (a2) {
          case "compositionstart":
            var ba2 = "onCompositionStart";
            break b;
          case "compositionend":
            ba2 = "onCompositionEnd";
            break b;
          case "compositionupdate":
            ba2 = "onCompositionUpdate";
            break b;
        }
        ba2 = void 0;
      }
      else ie ? ge(a2, c2) && (ba2 = "onCompositionEnd") : "keydown" === a2 && 229 === c2.keyCode && (ba2 = "onCompositionStart");
      ba2 && (de && "ko" !== c2.locale && (ie || "onCompositionStart" !== ba2 ? "onCompositionEnd" === ba2 && ie && ($a2 = nd()) : (kd$1 = e3, ld$1 = "value" in kd$1 ? kd$1.value : kd$1.textContent, ie = true)), xa2 = oe(d2, ba2), 0 < xa2.length && (ba2 = new Ld(ba2, a2, null, c2, e3), g2.push({ event: ba2, listeners: xa2 }), $a2 ? ba2.data = $a2 : ($a2 = he(c2), null !== $a2 && (ba2.data = $a2))));
      if ($a2 = ce ? je(a2, c2) : ke(a2, c2)) d2 = oe(d2, "onBeforeInput"), 0 < d2.length && (e3 = new Ld("onBeforeInput", "beforeinput", null, c2, e3), g2.push({ event: e3, listeners: d2 }), e3.data = $a2);
    }
    se(g2, b);
  });
}
function tf(a2, b, c2) {
  return { instance: a2, listener: b, currentTarget: c2 };
}
function oe(a2, b) {
  for (var c2 = b + "Capture", d = []; null !== a2; ) {
    var e2 = a2, f2 = e2.stateNode;
    5 === e2.tag && null !== f2 && (e2 = f2, f2 = Kb$2(a2, c2), null != f2 && d.unshift(tf(a2, f2, e2)), f2 = Kb$2(a2, b), null != f2 && d.push(tf(a2, f2, e2)));
    a2 = a2.return;
  }
  return d;
}
function vf(a2) {
  if (null === a2) return null;
  do
    a2 = a2.return;
  while (a2 && 5 !== a2.tag);
  return a2 ? a2 : null;
}
function wf(a2, b, c2, d, e2) {
  for (var f2 = b._reactName, g = []; null !== c2 && c2 !== d; ) {
    var h = c2, k2 = h.alternate, l2 = h.stateNode;
    if (null !== k2 && k2 === d) break;
    5 === h.tag && null !== l2 && (h = l2, e2 ? (k2 = Kb$2(c2, f2), null != k2 && g.unshift(tf(c2, k2, h))) : e2 || (k2 = Kb$2(c2, f2), null != k2 && g.push(tf(c2, k2, h))));
    c2 = c2.return;
  }
  0 !== g.length && a2.push({ event: b, listeners: g });
}
var xf = /\r\n?/g, yf = /\u0000|\uFFFD/g;
function zf(a2) {
  return ("string" === typeof a2 ? a2 : "" + a2).replace(xf, "\n").replace(yf, "");
}
function Af(a2, b, c2) {
  b = zf(b);
  if (zf(a2) !== b && c2) throw Error(p$2(425));
}
function Bf() {
}
var Cf = null, Df = null;
function Ef(a2, b) {
  return "textarea" === a2 || "noscript" === a2 || "string" === typeof b.children || "number" === typeof b.children || "object" === typeof b.dangerouslySetInnerHTML && null !== b.dangerouslySetInnerHTML && null != b.dangerouslySetInnerHTML.__html;
}
var Ff = "function" === typeof setTimeout ? setTimeout : void 0, Gf = "function" === typeof clearTimeout ? clearTimeout : void 0, Hf = "function" === typeof Promise ? Promise : void 0, Jf = "function" === typeof queueMicrotask ? queueMicrotask : "undefined" !== typeof Hf ? function(a2) {
  return Hf.resolve(null).then(a2).catch(If);
} : Ff;
function If(a2) {
  setTimeout(function() {
    throw a2;
  });
}
function Kf(a2, b) {
  var c2 = b, d = 0;
  do {
    var e2 = c2.nextSibling;
    a2.removeChild(c2);
    if (e2 && 8 === e2.nodeType) if (c2 = e2.data, "/$" === c2) {
      if (0 === d) {
        a2.removeChild(e2);
        bd$1(b);
        return;
      }
      d--;
    } else "$" !== c2 && "$?" !== c2 && "$!" !== c2 || d++;
    c2 = e2;
  } while (c2);
  bd$1(b);
}
function Lf(a2) {
  for (; null != a2; a2 = a2.nextSibling) {
    var b = a2.nodeType;
    if (1 === b || 3 === b) break;
    if (8 === b) {
      b = a2.data;
      if ("$" === b || "$!" === b || "$?" === b) break;
      if ("/$" === b) return null;
    }
  }
  return a2;
}
function Mf(a2) {
  a2 = a2.previousSibling;
  for (var b = 0; a2; ) {
    if (8 === a2.nodeType) {
      var c2 = a2.data;
      if ("$" === c2 || "$!" === c2 || "$?" === c2) {
        if (0 === b) return a2;
        b--;
      } else "/$" === c2 && b++;
    }
    a2 = a2.previousSibling;
  }
  return null;
}
var Nf = Math.random().toString(36).slice(2), Of = "__reactFiber$" + Nf, Pf = "__reactProps$" + Nf, uf = "__reactContainer$" + Nf, of = "__reactEvents$" + Nf, Qf = "__reactListeners$" + Nf, Rf = "__reactHandles$" + Nf;
function Wc$1(a2) {
  var b = a2[Of];
  if (b) return b;
  for (var c2 = a2.parentNode; c2; ) {
    if (b = c2[uf] || c2[Of]) {
      c2 = b.alternate;
      if (null !== b.child || null !== c2 && null !== c2.child) for (a2 = Mf(a2); null !== a2; ) {
        if (c2 = a2[Of]) return c2;
        a2 = Mf(a2);
      }
      return b;
    }
    a2 = c2;
    c2 = a2.parentNode;
  }
  return null;
}
function Cb$2(a2) {
  a2 = a2[Of] || a2[uf];
  return !a2 || 5 !== a2.tag && 6 !== a2.tag && 13 !== a2.tag && 3 !== a2.tag ? null : a2;
}
function ue(a2) {
  if (5 === a2.tag || 6 === a2.tag) return a2.stateNode;
  throw Error(p$2(33));
}
function Db$2(a2) {
  return a2[Pf] || null;
}
var Sf = [], Tf = -1;
function Uf(a2) {
  return { current: a2 };
}
function E$2(a2) {
  0 > Tf || (a2.current = Sf[Tf], Sf[Tf] = null, Tf--);
}
function G$1(a2, b) {
  Tf++;
  Sf[Tf] = a2.current;
  a2.current = b;
}
var Vf = {}, H$2 = Uf(Vf), Wf = Uf(false), Xf = Vf;
function Yf(a2, b) {
  var c2 = a2.type.contextTypes;
  if (!c2) return Vf;
  var d = a2.stateNode;
  if (d && d.__reactInternalMemoizedUnmaskedChildContext === b) return d.__reactInternalMemoizedMaskedChildContext;
  var e2 = {}, f2;
  for (f2 in c2) e2[f2] = b[f2];
  d && (a2 = a2.stateNode, a2.__reactInternalMemoizedUnmaskedChildContext = b, a2.__reactInternalMemoizedMaskedChildContext = e2);
  return e2;
}
function Zf(a2) {
  a2 = a2.childContextTypes;
  return null !== a2 && void 0 !== a2;
}
function $f() {
  E$2(Wf);
  E$2(H$2);
}
function ag(a2, b, c2) {
  if (H$2.current !== Vf) throw Error(p$2(168));
  G$1(H$2, b);
  G$1(Wf, c2);
}
function bg(a2, b, c2) {
  var d = a2.stateNode;
  b = b.childContextTypes;
  if ("function" !== typeof d.getChildContext) return c2;
  d = d.getChildContext();
  for (var e2 in d) if (!(e2 in b)) throw Error(p$2(108, Ra$2(a2) || "Unknown", e2));
  return A$1({}, c2, d);
}
function cg(a2) {
  a2 = (a2 = a2.stateNode) && a2.__reactInternalMemoizedMergedChildContext || Vf;
  Xf = H$2.current;
  G$1(H$2, a2);
  G$1(Wf, Wf.current);
  return true;
}
function dg(a2, b, c2) {
  var d = a2.stateNode;
  if (!d) throw Error(p$2(169));
  c2 ? (a2 = bg(a2, b, Xf), d.__reactInternalMemoizedMergedChildContext = a2, E$2(Wf), E$2(H$2), G$1(H$2, a2)) : E$2(Wf);
  G$1(Wf, c2);
}
var eg = null, fg = false, gg = false;
function hg(a2) {
  null === eg ? eg = [a2] : eg.push(a2);
}
function ig(a2) {
  fg = true;
  hg(a2);
}
function jg() {
  if (!gg && null !== eg) {
    gg = true;
    var a2 = 0, b = C$1;
    try {
      var c2 = eg;
      for (C$1 = 1; a2 < c2.length; a2++) {
        var d = c2[a2];
        do
          d = d(true);
        while (null !== d);
      }
      eg = null;
      fg = false;
    } catch (e2) {
      throw null !== eg && (eg = eg.slice(a2 + 1)), ac$1(fc$1, jg), e2;
    } finally {
      C$1 = b, gg = false;
    }
  }
  return null;
}
var kg = [], lg = 0, mg = null, ng = 0, og = [], pg = 0, qg = null, rg = 1, sg = "";
function tg(a2, b) {
  kg[lg++] = ng;
  kg[lg++] = mg;
  mg = a2;
  ng = b;
}
function ug(a2, b, c2) {
  og[pg++] = rg;
  og[pg++] = sg;
  og[pg++] = qg;
  qg = a2;
  var d = rg;
  a2 = sg;
  var e2 = 32 - oc$1(d) - 1;
  d &= ~(1 << e2);
  c2 += 1;
  var f2 = 32 - oc$1(b) + e2;
  if (30 < f2) {
    var g = e2 - e2 % 5;
    f2 = (d & (1 << g) - 1).toString(32);
    d >>= g;
    e2 -= g;
    rg = 1 << 32 - oc$1(b) + e2 | c2 << e2 | d;
    sg = f2 + a2;
  } else rg = 1 << f2 | c2 << e2 | d, sg = a2;
}
function vg(a2) {
  null !== a2.return && (tg(a2, 1), ug(a2, 1, 0));
}
function wg(a2) {
  for (; a2 === mg; ) mg = kg[--lg], kg[lg] = null, ng = kg[--lg], kg[lg] = null;
  for (; a2 === qg; ) qg = og[--pg], og[pg] = null, sg = og[--pg], og[pg] = null, rg = og[--pg], og[pg] = null;
}
var xg = null, yg = null, I$2 = false, zg = null;
function Ag(a2, b) {
  var c2 = Bg(5, null, null, 0);
  c2.elementType = "DELETED";
  c2.stateNode = b;
  c2.return = a2;
  b = a2.deletions;
  null === b ? (a2.deletions = [c2], a2.flags |= 16) : b.push(c2);
}
function Cg(a2, b) {
  switch (a2.tag) {
    case 5:
      var c2 = a2.type;
      b = 1 !== b.nodeType || c2.toLowerCase() !== b.nodeName.toLowerCase() ? null : b;
      return null !== b ? (a2.stateNode = b, xg = a2, yg = Lf(b.firstChild), true) : false;
    case 6:
      return b = "" === a2.pendingProps || 3 !== b.nodeType ? null : b, null !== b ? (a2.stateNode = b, xg = a2, yg = null, true) : false;
    case 13:
      return b = 8 !== b.nodeType ? null : b, null !== b ? (c2 = null !== qg ? { id: rg, overflow: sg } : null, a2.memoizedState = { dehydrated: b, treeContext: c2, retryLane: 1073741824 }, c2 = Bg(18, null, null, 0), c2.stateNode = b, c2.return = a2, a2.child = c2, xg = a2, yg = null, true) : false;
    default:
      return false;
  }
}
function Dg(a2) {
  return 0 !== (a2.mode & 1) && 0 === (a2.flags & 128);
}
function Eg(a2) {
  if (I$2) {
    var b = yg;
    if (b) {
      var c2 = b;
      if (!Cg(a2, b)) {
        if (Dg(a2)) throw Error(p$2(418));
        b = Lf(c2.nextSibling);
        var d = xg;
        b && Cg(a2, b) ? Ag(d, c2) : (a2.flags = a2.flags & -4097 | 2, I$2 = false, xg = a2);
      }
    } else {
      if (Dg(a2)) throw Error(p$2(418));
      a2.flags = a2.flags & -4097 | 2;
      I$2 = false;
      xg = a2;
    }
  }
}
function Fg(a2) {
  for (a2 = a2.return; null !== a2 && 5 !== a2.tag && 3 !== a2.tag && 13 !== a2.tag; ) a2 = a2.return;
  xg = a2;
}
function Gg(a2) {
  if (a2 !== xg) return false;
  if (!I$2) return Fg(a2), I$2 = true, false;
  var b;
  (b = 3 !== a2.tag) && !(b = 5 !== a2.tag) && (b = a2.type, b = "head" !== b && "body" !== b && !Ef(a2.type, a2.memoizedProps));
  if (b && (b = yg)) {
    if (Dg(a2)) throw Hg(), Error(p$2(418));
    for (; b; ) Ag(a2, b), b = Lf(b.nextSibling);
  }
  Fg(a2);
  if (13 === a2.tag) {
    a2 = a2.memoizedState;
    a2 = null !== a2 ? a2.dehydrated : null;
    if (!a2) throw Error(p$2(317));
    a: {
      a2 = a2.nextSibling;
      for (b = 0; a2; ) {
        if (8 === a2.nodeType) {
          var c2 = a2.data;
          if ("/$" === c2) {
            if (0 === b) {
              yg = Lf(a2.nextSibling);
              break a;
            }
            b--;
          } else "$" !== c2 && "$!" !== c2 && "$?" !== c2 || b++;
        }
        a2 = a2.nextSibling;
      }
      yg = null;
    }
  } else yg = xg ? Lf(a2.stateNode.nextSibling) : null;
  return true;
}
function Hg() {
  for (var a2 = yg; a2; ) a2 = Lf(a2.nextSibling);
}
function Ig() {
  yg = xg = null;
  I$2 = false;
}
function Jg(a2) {
  null === zg ? zg = [a2] : zg.push(a2);
}
var Kg = ua$2.ReactCurrentBatchConfig;
function Lg(a2, b, c2) {
  a2 = c2.ref;
  if (null !== a2 && "function" !== typeof a2 && "object" !== typeof a2) {
    if (c2._owner) {
      c2 = c2._owner;
      if (c2) {
        if (1 !== c2.tag) throw Error(p$2(309));
        var d = c2.stateNode;
      }
      if (!d) throw Error(p$2(147, a2));
      var e2 = d, f2 = "" + a2;
      if (null !== b && null !== b.ref && "function" === typeof b.ref && b.ref._stringRef === f2) return b.ref;
      b = function(a3) {
        var b2 = e2.refs;
        null === a3 ? delete b2[f2] : b2[f2] = a3;
      };
      b._stringRef = f2;
      return b;
    }
    if ("string" !== typeof a2) throw Error(p$2(284));
    if (!c2._owner) throw Error(p$2(290, a2));
  }
  return a2;
}
function Mg(a2, b) {
  a2 = Object.prototype.toString.call(b);
  throw Error(p$2(31, "[object Object]" === a2 ? "object with keys {" + Object.keys(b).join(", ") + "}" : a2));
}
function Ng(a2) {
  var b = a2._init;
  return b(a2._payload);
}
function Og(a2) {
  function b(b2, c3) {
    if (a2) {
      var d2 = b2.deletions;
      null === d2 ? (b2.deletions = [c3], b2.flags |= 16) : d2.push(c3);
    }
  }
  function c2(c3, d2) {
    if (!a2) return null;
    for (; null !== d2; ) b(c3, d2), d2 = d2.sibling;
    return null;
  }
  function d(a3, b2) {
    for (a3 = /* @__PURE__ */ new Map(); null !== b2; ) null !== b2.key ? a3.set(b2.key, b2) : a3.set(b2.index, b2), b2 = b2.sibling;
    return a3;
  }
  function e2(a3, b2) {
    a3 = Pg(a3, b2);
    a3.index = 0;
    a3.sibling = null;
    return a3;
  }
  function f2(b2, c3, d2) {
    b2.index = d2;
    if (!a2) return b2.flags |= 1048576, c3;
    d2 = b2.alternate;
    if (null !== d2) return d2 = d2.index, d2 < c3 ? (b2.flags |= 2, c3) : d2;
    b2.flags |= 2;
    return c3;
  }
  function g(b2) {
    a2 && null === b2.alternate && (b2.flags |= 2);
    return b2;
  }
  function h(a3, b2, c3, d2) {
    if (null === b2 || 6 !== b2.tag) return b2 = Qg(c3, a3.mode, d2), b2.return = a3, b2;
    b2 = e2(b2, c3);
    b2.return = a3;
    return b2;
  }
  function k2(a3, b2, c3, d2) {
    var f3 = c3.type;
    if (f3 === ya$2) return m2(a3, b2, c3.props.children, d2, c3.key);
    if (null !== b2 && (b2.elementType === f3 || "object" === typeof f3 && null !== f3 && f3.$$typeof === Ha$2 && Ng(f3) === b2.type)) return d2 = e2(b2, c3.props), d2.ref = Lg(a3, b2, c3), d2.return = a3, d2;
    d2 = Rg(c3.type, c3.key, c3.props, null, a3.mode, d2);
    d2.ref = Lg(a3, b2, c3);
    d2.return = a3;
    return d2;
  }
  function l2(a3, b2, c3, d2) {
    if (null === b2 || 4 !== b2.tag || b2.stateNode.containerInfo !== c3.containerInfo || b2.stateNode.implementation !== c3.implementation) return b2 = Sg(c3, a3.mode, d2), b2.return = a3, b2;
    b2 = e2(b2, c3.children || []);
    b2.return = a3;
    return b2;
  }
  function m2(a3, b2, c3, d2, f3) {
    if (null === b2 || 7 !== b2.tag) return b2 = Tg(c3, a3.mode, d2, f3), b2.return = a3, b2;
    b2 = e2(b2, c3);
    b2.return = a3;
    return b2;
  }
  function q2(a3, b2, c3) {
    if ("string" === typeof b2 && "" !== b2 || "number" === typeof b2) return b2 = Qg("" + b2, a3.mode, c3), b2.return = a3, b2;
    if ("object" === typeof b2 && null !== b2) {
      switch (b2.$$typeof) {
        case va$2:
          return c3 = Rg(b2.type, b2.key, b2.props, null, a3.mode, c3), c3.ref = Lg(a3, null, b2), c3.return = a3, c3;
        case wa$2:
          return b2 = Sg(b2, a3.mode, c3), b2.return = a3, b2;
        case Ha$2:
          var d2 = b2._init;
          return q2(a3, d2(b2._payload), c3);
      }
      if (eb$2(b2) || Ka$2(b2)) return b2 = Tg(b2, a3.mode, c3, null), b2.return = a3, b2;
      Mg(a3, b2);
    }
    return null;
  }
  function r2(a3, b2, c3, d2) {
    var e3 = null !== b2 ? b2.key : null;
    if ("string" === typeof c3 && "" !== c3 || "number" === typeof c3) return null !== e3 ? null : h(a3, b2, "" + c3, d2);
    if ("object" === typeof c3 && null !== c3) {
      switch (c3.$$typeof) {
        case va$2:
          return c3.key === e3 ? k2(a3, b2, c3, d2) : null;
        case wa$2:
          return c3.key === e3 ? l2(a3, b2, c3, d2) : null;
        case Ha$2:
          return e3 = c3._init, r2(
            a3,
            b2,
            e3(c3._payload),
            d2
          );
      }
      if (eb$2(c3) || Ka$2(c3)) return null !== e3 ? null : m2(a3, b2, c3, d2, null);
      Mg(a3, c3);
    }
    return null;
  }
  function y2(a3, b2, c3, d2, e3) {
    if ("string" === typeof d2 && "" !== d2 || "number" === typeof d2) return a3 = a3.get(c3) || null, h(b2, a3, "" + d2, e3);
    if ("object" === typeof d2 && null !== d2) {
      switch (d2.$$typeof) {
        case va$2:
          return a3 = a3.get(null === d2.key ? c3 : d2.key) || null, k2(b2, a3, d2, e3);
        case wa$2:
          return a3 = a3.get(null === d2.key ? c3 : d2.key) || null, l2(b2, a3, d2, e3);
        case Ha$2:
          var f3 = d2._init;
          return y2(a3, b2, c3, f3(d2._payload), e3);
      }
      if (eb$2(d2) || Ka$2(d2)) return a3 = a3.get(c3) || null, m2(b2, a3, d2, e3, null);
      Mg(b2, d2);
    }
    return null;
  }
  function n2(e3, g2, h2, k3) {
    for (var l3 = null, m3 = null, u2 = g2, w2 = g2 = 0, x2 = null; null !== u2 && w2 < h2.length; w2++) {
      u2.index > w2 ? (x2 = u2, u2 = null) : x2 = u2.sibling;
      var n3 = r2(e3, u2, h2[w2], k3);
      if (null === n3) {
        null === u2 && (u2 = x2);
        break;
      }
      a2 && u2 && null === n3.alternate && b(e3, u2);
      g2 = f2(n3, g2, w2);
      null === m3 ? l3 = n3 : m3.sibling = n3;
      m3 = n3;
      u2 = x2;
    }
    if (w2 === h2.length) return c2(e3, u2), I$2 && tg(e3, w2), l3;
    if (null === u2) {
      for (; w2 < h2.length; w2++) u2 = q2(e3, h2[w2], k3), null !== u2 && (g2 = f2(u2, g2, w2), null === m3 ? l3 = u2 : m3.sibling = u2, m3 = u2);
      I$2 && tg(e3, w2);
      return l3;
    }
    for (u2 = d(e3, u2); w2 < h2.length; w2++) x2 = y2(u2, e3, w2, h2[w2], k3), null !== x2 && (a2 && null !== x2.alternate && u2.delete(null === x2.key ? w2 : x2.key), g2 = f2(x2, g2, w2), null === m3 ? l3 = x2 : m3.sibling = x2, m3 = x2);
    a2 && u2.forEach(function(a3) {
      return b(e3, a3);
    });
    I$2 && tg(e3, w2);
    return l3;
  }
  function t2(e3, g2, h2, k3) {
    var l3 = Ka$2(h2);
    if ("function" !== typeof l3) throw Error(p$2(150));
    h2 = l3.call(h2);
    if (null == h2) throw Error(p$2(151));
    for (var u2 = l3 = null, m3 = g2, w2 = g2 = 0, x2 = null, n3 = h2.next(); null !== m3 && !n3.done; w2++, n3 = h2.next()) {
      m3.index > w2 ? (x2 = m3, m3 = null) : x2 = m3.sibling;
      var t3 = r2(e3, m3, n3.value, k3);
      if (null === t3) {
        null === m3 && (m3 = x2);
        break;
      }
      a2 && m3 && null === t3.alternate && b(e3, m3);
      g2 = f2(t3, g2, w2);
      null === u2 ? l3 = t3 : u2.sibling = t3;
      u2 = t3;
      m3 = x2;
    }
    if (n3.done) return c2(
      e3,
      m3
    ), I$2 && tg(e3, w2), l3;
    if (null === m3) {
      for (; !n3.done; w2++, n3 = h2.next()) n3 = q2(e3, n3.value, k3), null !== n3 && (g2 = f2(n3, g2, w2), null === u2 ? l3 = n3 : u2.sibling = n3, u2 = n3);
      I$2 && tg(e3, w2);
      return l3;
    }
    for (m3 = d(e3, m3); !n3.done; w2++, n3 = h2.next()) n3 = y2(m3, e3, w2, n3.value, k3), null !== n3 && (a2 && null !== n3.alternate && m3.delete(null === n3.key ? w2 : n3.key), g2 = f2(n3, g2, w2), null === u2 ? l3 = n3 : u2.sibling = n3, u2 = n3);
    a2 && m3.forEach(function(a3) {
      return b(e3, a3);
    });
    I$2 && tg(e3, w2);
    return l3;
  }
  function J2(a3, d2, f3, h2) {
    "object" === typeof f3 && null !== f3 && f3.type === ya$2 && null === f3.key && (f3 = f3.props.children);
    if ("object" === typeof f3 && null !== f3) {
      switch (f3.$$typeof) {
        case va$2:
          a: {
            for (var k3 = f3.key, l3 = d2; null !== l3; ) {
              if (l3.key === k3) {
                k3 = f3.type;
                if (k3 === ya$2) {
                  if (7 === l3.tag) {
                    c2(a3, l3.sibling);
                    d2 = e2(l3, f3.props.children);
                    d2.return = a3;
                    a3 = d2;
                    break a;
                  }
                } else if (l3.elementType === k3 || "object" === typeof k3 && null !== k3 && k3.$$typeof === Ha$2 && Ng(k3) === l3.type) {
                  c2(a3, l3.sibling);
                  d2 = e2(l3, f3.props);
                  d2.ref = Lg(a3, l3, f3);
                  d2.return = a3;
                  a3 = d2;
                  break a;
                }
                c2(a3, l3);
                break;
              } else b(a3, l3);
              l3 = l3.sibling;
            }
            f3.type === ya$2 ? (d2 = Tg(f3.props.children, a3.mode, h2, f3.key), d2.return = a3, a3 = d2) : (h2 = Rg(f3.type, f3.key, f3.props, null, a3.mode, h2), h2.ref = Lg(a3, d2, f3), h2.return = a3, a3 = h2);
          }
          return g(a3);
        case wa$2:
          a: {
            for (l3 = f3.key; null !== d2; ) {
              if (d2.key === l3) if (4 === d2.tag && d2.stateNode.containerInfo === f3.containerInfo && d2.stateNode.implementation === f3.implementation) {
                c2(a3, d2.sibling);
                d2 = e2(d2, f3.children || []);
                d2.return = a3;
                a3 = d2;
                break a;
              } else {
                c2(a3, d2);
                break;
              }
              else b(a3, d2);
              d2 = d2.sibling;
            }
            d2 = Sg(f3, a3.mode, h2);
            d2.return = a3;
            a3 = d2;
          }
          return g(a3);
        case Ha$2:
          return l3 = f3._init, J2(a3, d2, l3(f3._payload), h2);
      }
      if (eb$2(f3)) return n2(a3, d2, f3, h2);
      if (Ka$2(f3)) return t2(a3, d2, f3, h2);
      Mg(a3, f3);
    }
    return "string" === typeof f3 && "" !== f3 || "number" === typeof f3 ? (f3 = "" + f3, null !== d2 && 6 === d2.tag ? (c2(a3, d2.sibling), d2 = e2(d2, f3), d2.return = a3, a3 = d2) : (c2(a3, d2), d2 = Qg(f3, a3.mode, h2), d2.return = a3, a3 = d2), g(a3)) : c2(a3, d2);
  }
  return J2;
}
var Ug = Og(true), Vg = Og(false), Wg = Uf(null), Xg = null, Yg = null, Zg = null;
function $g() {
  Zg = Yg = Xg = null;
}
function ah(a2) {
  var b = Wg.current;
  E$2(Wg);
  a2._currentValue = b;
}
function bh(a2, b, c2) {
  for (; null !== a2; ) {
    var d = a2.alternate;
    (a2.childLanes & b) !== b ? (a2.childLanes |= b, null !== d && (d.childLanes |= b)) : null !== d && (d.childLanes & b) !== b && (d.childLanes |= b);
    if (a2 === c2) break;
    a2 = a2.return;
  }
}
function ch(a2, b) {
  Xg = a2;
  Zg = Yg = null;
  a2 = a2.dependencies;
  null !== a2 && null !== a2.firstContext && (0 !== (a2.lanes & b) && (dh = true), a2.firstContext = null);
}
function eh(a2) {
  var b = a2._currentValue;
  if (Zg !== a2) if (a2 = { context: a2, memoizedValue: b, next: null }, null === Yg) {
    if (null === Xg) throw Error(p$2(308));
    Yg = a2;
    Xg.dependencies = { lanes: 0, firstContext: a2 };
  } else Yg = Yg.next = a2;
  return b;
}
var fh = null;
function gh(a2) {
  null === fh ? fh = [a2] : fh.push(a2);
}
function hh(a2, b, c2, d) {
  var e2 = b.interleaved;
  null === e2 ? (c2.next = c2, gh(b)) : (c2.next = e2.next, e2.next = c2);
  b.interleaved = c2;
  return ih(a2, d);
}
function ih(a2, b) {
  a2.lanes |= b;
  var c2 = a2.alternate;
  null !== c2 && (c2.lanes |= b);
  c2 = a2;
  for (a2 = a2.return; null !== a2; ) a2.childLanes |= b, c2 = a2.alternate, null !== c2 && (c2.childLanes |= b), c2 = a2, a2 = a2.return;
  return 3 === c2.tag ? c2.stateNode : null;
}
var jh = false;
function kh(a2) {
  a2.updateQueue = { baseState: a2.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function lh(a2, b) {
  a2 = a2.updateQueue;
  b.updateQueue === a2 && (b.updateQueue = { baseState: a2.baseState, firstBaseUpdate: a2.firstBaseUpdate, lastBaseUpdate: a2.lastBaseUpdate, shared: a2.shared, effects: a2.effects });
}
function mh(a2, b) {
  return { eventTime: a2, lane: b, tag: 0, payload: null, callback: null, next: null };
}
function nh(a2, b, c2) {
  var d = a2.updateQueue;
  if (null === d) return null;
  d = d.shared;
  if (0 !== (K$2 & 2)) {
    var e2 = d.pending;
    null === e2 ? b.next = b : (b.next = e2.next, e2.next = b);
    d.pending = b;
    return ih(a2, c2);
  }
  e2 = d.interleaved;
  null === e2 ? (b.next = b, gh(d)) : (b.next = e2.next, e2.next = b);
  d.interleaved = b;
  return ih(a2, c2);
}
function oh(a2, b, c2) {
  b = b.updateQueue;
  if (null !== b && (b = b.shared, 0 !== (c2 & 4194240))) {
    var d = b.lanes;
    d &= a2.pendingLanes;
    c2 |= d;
    b.lanes = c2;
    Cc$1(a2, c2);
  }
}
function ph(a2, b) {
  var c2 = a2.updateQueue, d = a2.alternate;
  if (null !== d && (d = d.updateQueue, c2 === d)) {
    var e2 = null, f2 = null;
    c2 = c2.firstBaseUpdate;
    if (null !== c2) {
      do {
        var g = { eventTime: c2.eventTime, lane: c2.lane, tag: c2.tag, payload: c2.payload, callback: c2.callback, next: null };
        null === f2 ? e2 = f2 = g : f2 = f2.next = g;
        c2 = c2.next;
      } while (null !== c2);
      null === f2 ? e2 = f2 = b : f2 = f2.next = b;
    } else e2 = f2 = b;
    c2 = { baseState: d.baseState, firstBaseUpdate: e2, lastBaseUpdate: f2, shared: d.shared, effects: d.effects };
    a2.updateQueue = c2;
    return;
  }
  a2 = c2.lastBaseUpdate;
  null === a2 ? c2.firstBaseUpdate = b : a2.next = b;
  c2.lastBaseUpdate = b;
}
function qh(a2, b, c2, d) {
  var e2 = a2.updateQueue;
  jh = false;
  var f2 = e2.firstBaseUpdate, g = e2.lastBaseUpdate, h = e2.shared.pending;
  if (null !== h) {
    e2.shared.pending = null;
    var k2 = h, l2 = k2.next;
    k2.next = null;
    null === g ? f2 = l2 : g.next = l2;
    g = k2;
    var m2 = a2.alternate;
    null !== m2 && (m2 = m2.updateQueue, h = m2.lastBaseUpdate, h !== g && (null === h ? m2.firstBaseUpdate = l2 : h.next = l2, m2.lastBaseUpdate = k2));
  }
  if (null !== f2) {
    var q2 = e2.baseState;
    g = 0;
    m2 = l2 = k2 = null;
    h = f2;
    do {
      var r2 = h.lane, y2 = h.eventTime;
      if ((d & r2) === r2) {
        null !== m2 && (m2 = m2.next = {
          eventTime: y2,
          lane: 0,
          tag: h.tag,
          payload: h.payload,
          callback: h.callback,
          next: null
        });
        a: {
          var n2 = a2, t2 = h;
          r2 = b;
          y2 = c2;
          switch (t2.tag) {
            case 1:
              n2 = t2.payload;
              if ("function" === typeof n2) {
                q2 = n2.call(y2, q2, r2);
                break a;
              }
              q2 = n2;
              break a;
            case 3:
              n2.flags = n2.flags & -65537 | 128;
            case 0:
              n2 = t2.payload;
              r2 = "function" === typeof n2 ? n2.call(y2, q2, r2) : n2;
              if (null === r2 || void 0 === r2) break a;
              q2 = A$1({}, q2, r2);
              break a;
            case 2:
              jh = true;
          }
        }
        null !== h.callback && 0 !== h.lane && (a2.flags |= 64, r2 = e2.effects, null === r2 ? e2.effects = [h] : r2.push(h));
      } else y2 = { eventTime: y2, lane: r2, tag: h.tag, payload: h.payload, callback: h.callback, next: null }, null === m2 ? (l2 = m2 = y2, k2 = q2) : m2 = m2.next = y2, g |= r2;
      h = h.next;
      if (null === h) if (h = e2.shared.pending, null === h) break;
      else r2 = h, h = r2.next, r2.next = null, e2.lastBaseUpdate = r2, e2.shared.pending = null;
    } while (1);
    null === m2 && (k2 = q2);
    e2.baseState = k2;
    e2.firstBaseUpdate = l2;
    e2.lastBaseUpdate = m2;
    b = e2.shared.interleaved;
    if (null !== b) {
      e2 = b;
      do
        g |= e2.lane, e2 = e2.next;
      while (e2 !== b);
    } else null === f2 && (e2.shared.lanes = 0);
    rh |= g;
    a2.lanes = g;
    a2.memoizedState = q2;
  }
}
function sh(a2, b, c2) {
  a2 = b.effects;
  b.effects = null;
  if (null !== a2) for (b = 0; b < a2.length; b++) {
    var d = a2[b], e2 = d.callback;
    if (null !== e2) {
      d.callback = null;
      d = c2;
      if ("function" !== typeof e2) throw Error(p$2(191, e2));
      e2.call(d);
    }
  }
}
var th = {}, uh = Uf(th), vh = Uf(th), wh = Uf(th);
function xh(a2) {
  if (a2 === th) throw Error(p$2(174));
  return a2;
}
function yh(a2, b) {
  G$1(wh, b);
  G$1(vh, a2);
  G$1(uh, th);
  a2 = b.nodeType;
  switch (a2) {
    case 9:
    case 11:
      b = (b = b.documentElement) ? b.namespaceURI : lb$2(null, "");
      break;
    default:
      a2 = 8 === a2 ? b.parentNode : b, b = a2.namespaceURI || null, a2 = a2.tagName, b = lb$2(b, a2);
  }
  E$2(uh);
  G$1(uh, b);
}
function zh() {
  E$2(uh);
  E$2(vh);
  E$2(wh);
}
function Ah(a2) {
  xh(wh.current);
  var b = xh(uh.current);
  var c2 = lb$2(b, a2.type);
  b !== c2 && (G$1(vh, a2), G$1(uh, c2));
}
function Bh(a2) {
  vh.current === a2 && (E$2(uh), E$2(vh));
}
var L$2 = Uf(0);
function Ch(a2) {
  for (var b = a2; null !== b; ) {
    if (13 === b.tag) {
      var c2 = b.memoizedState;
      if (null !== c2 && (c2 = c2.dehydrated, null === c2 || "$?" === c2.data || "$!" === c2.data)) return b;
    } else if (19 === b.tag && void 0 !== b.memoizedProps.revealOrder) {
      if (0 !== (b.flags & 128)) return b;
    } else if (null !== b.child) {
      b.child.return = b;
      b = b.child;
      continue;
    }
    if (b === a2) break;
    for (; null === b.sibling; ) {
      if (null === b.return || b.return === a2) return null;
      b = b.return;
    }
    b.sibling.return = b.return;
    b = b.sibling;
  }
  return null;
}
var Dh = [];
function Eh() {
  for (var a2 = 0; a2 < Dh.length; a2++) Dh[a2]._workInProgressVersionPrimary = null;
  Dh.length = 0;
}
var Fh = ua$2.ReactCurrentDispatcher, Gh = ua$2.ReactCurrentBatchConfig, Hh = 0, M$2 = null, N$2 = null, O$2 = null, Ih = false, Jh = false, Kh = 0, Lh = 0;
function P$2() {
  throw Error(p$2(321));
}
function Mh(a2, b) {
  if (null === b) return false;
  for (var c2 = 0; c2 < b.length && c2 < a2.length; c2++) if (!He(a2[c2], b[c2])) return false;
  return true;
}
function Nh(a2, b, c2, d, e2, f2) {
  Hh = f2;
  M$2 = b;
  b.memoizedState = null;
  b.updateQueue = null;
  b.lanes = 0;
  Fh.current = null === a2 || null === a2.memoizedState ? Oh : Ph;
  a2 = c2(d, e2);
  if (Jh) {
    f2 = 0;
    do {
      Jh = false;
      Kh = 0;
      if (25 <= f2) throw Error(p$2(301));
      f2 += 1;
      O$2 = N$2 = null;
      b.updateQueue = null;
      Fh.current = Qh;
      a2 = c2(d, e2);
    } while (Jh);
  }
  Fh.current = Rh;
  b = null !== N$2 && null !== N$2.next;
  Hh = 0;
  O$2 = N$2 = M$2 = null;
  Ih = false;
  if (b) throw Error(p$2(300));
  return a2;
}
function Sh() {
  var a2 = 0 !== Kh;
  Kh = 0;
  return a2;
}
function Th() {
  var a2 = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  null === O$2 ? M$2.memoizedState = O$2 = a2 : O$2 = O$2.next = a2;
  return O$2;
}
function Uh() {
  if (null === N$2) {
    var a2 = M$2.alternate;
    a2 = null !== a2 ? a2.memoizedState : null;
  } else a2 = N$2.next;
  var b = null === O$2 ? M$2.memoizedState : O$2.next;
  if (null !== b) O$2 = b, N$2 = a2;
  else {
    if (null === a2) throw Error(p$2(310));
    N$2 = a2;
    a2 = { memoizedState: N$2.memoizedState, baseState: N$2.baseState, baseQueue: N$2.baseQueue, queue: N$2.queue, next: null };
    null === O$2 ? M$2.memoizedState = O$2 = a2 : O$2 = O$2.next = a2;
  }
  return O$2;
}
function Vh(a2, b) {
  return "function" === typeof b ? b(a2) : b;
}
function Wh(a2) {
  var b = Uh(), c2 = b.queue;
  if (null === c2) throw Error(p$2(311));
  c2.lastRenderedReducer = a2;
  var d = N$2, e2 = d.baseQueue, f2 = c2.pending;
  if (null !== f2) {
    if (null !== e2) {
      var g = e2.next;
      e2.next = f2.next;
      f2.next = g;
    }
    d.baseQueue = e2 = f2;
    c2.pending = null;
  }
  if (null !== e2) {
    f2 = e2.next;
    d = d.baseState;
    var h = g = null, k2 = null, l2 = f2;
    do {
      var m2 = l2.lane;
      if ((Hh & m2) === m2) null !== k2 && (k2 = k2.next = { lane: 0, action: l2.action, hasEagerState: l2.hasEagerState, eagerState: l2.eagerState, next: null }), d = l2.hasEagerState ? l2.eagerState : a2(d, l2.action);
      else {
        var q2 = {
          lane: m2,
          action: l2.action,
          hasEagerState: l2.hasEagerState,
          eagerState: l2.eagerState,
          next: null
        };
        null === k2 ? (h = k2 = q2, g = d) : k2 = k2.next = q2;
        M$2.lanes |= m2;
        rh |= m2;
      }
      l2 = l2.next;
    } while (null !== l2 && l2 !== f2);
    null === k2 ? g = d : k2.next = h;
    He(d, b.memoizedState) || (dh = true);
    b.memoizedState = d;
    b.baseState = g;
    b.baseQueue = k2;
    c2.lastRenderedState = d;
  }
  a2 = c2.interleaved;
  if (null !== a2) {
    e2 = a2;
    do
      f2 = e2.lane, M$2.lanes |= f2, rh |= f2, e2 = e2.next;
    while (e2 !== a2);
  } else null === e2 && (c2.lanes = 0);
  return [b.memoizedState, c2.dispatch];
}
function Xh(a2) {
  var b = Uh(), c2 = b.queue;
  if (null === c2) throw Error(p$2(311));
  c2.lastRenderedReducer = a2;
  var d = c2.dispatch, e2 = c2.pending, f2 = b.memoizedState;
  if (null !== e2) {
    c2.pending = null;
    var g = e2 = e2.next;
    do
      f2 = a2(f2, g.action), g = g.next;
    while (g !== e2);
    He(f2, b.memoizedState) || (dh = true);
    b.memoizedState = f2;
    null === b.baseQueue && (b.baseState = f2);
    c2.lastRenderedState = f2;
  }
  return [f2, d];
}
function Yh() {
}
function Zh(a2, b) {
  var c2 = M$2, d = Uh(), e2 = b(), f2 = !He(d.memoizedState, e2);
  f2 && (d.memoizedState = e2, dh = true);
  d = d.queue;
  $h(ai.bind(null, c2, d, a2), [a2]);
  if (d.getSnapshot !== b || f2 || null !== O$2 && O$2.memoizedState.tag & 1) {
    c2.flags |= 2048;
    bi(9, ci.bind(null, c2, d, e2, b), void 0, null);
    if (null === Q$2) throw Error(p$2(349));
    0 !== (Hh & 30) || di(c2, b, e2);
  }
  return e2;
}
function di(a2, b, c2) {
  a2.flags |= 16384;
  a2 = { getSnapshot: b, value: c2 };
  b = M$2.updateQueue;
  null === b ? (b = { lastEffect: null, stores: null }, M$2.updateQueue = b, b.stores = [a2]) : (c2 = b.stores, null === c2 ? b.stores = [a2] : c2.push(a2));
}
function ci(a2, b, c2, d) {
  b.value = c2;
  b.getSnapshot = d;
  ei(b) && fi(a2);
}
function ai(a2, b, c2) {
  return c2(function() {
    ei(b) && fi(a2);
  });
}
function ei(a2) {
  var b = a2.getSnapshot;
  a2 = a2.value;
  try {
    var c2 = b();
    return !He(a2, c2);
  } catch (d) {
    return true;
  }
}
function fi(a2) {
  var b = ih(a2, 1);
  null !== b && gi(b, a2, 1, -1);
}
function hi(a2) {
  var b = Th();
  "function" === typeof a2 && (a2 = a2());
  b.memoizedState = b.baseState = a2;
  a2 = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Vh, lastRenderedState: a2 };
  b.queue = a2;
  a2 = a2.dispatch = ii.bind(null, M$2, a2);
  return [b.memoizedState, a2];
}
function bi(a2, b, c2, d) {
  a2 = { tag: a2, create: b, destroy: c2, deps: d, next: null };
  b = M$2.updateQueue;
  null === b ? (b = { lastEffect: null, stores: null }, M$2.updateQueue = b, b.lastEffect = a2.next = a2) : (c2 = b.lastEffect, null === c2 ? b.lastEffect = a2.next = a2 : (d = c2.next, c2.next = a2, a2.next = d, b.lastEffect = a2));
  return a2;
}
function ji() {
  return Uh().memoizedState;
}
function ki(a2, b, c2, d) {
  var e2 = Th();
  M$2.flags |= a2;
  e2.memoizedState = bi(1 | b, c2, void 0, void 0 === d ? null : d);
}
function li(a2, b, c2, d) {
  var e2 = Uh();
  d = void 0 === d ? null : d;
  var f2 = void 0;
  if (null !== N$2) {
    var g = N$2.memoizedState;
    f2 = g.destroy;
    if (null !== d && Mh(d, g.deps)) {
      e2.memoizedState = bi(b, c2, f2, d);
      return;
    }
  }
  M$2.flags |= a2;
  e2.memoizedState = bi(1 | b, c2, f2, d);
}
function mi(a2, b) {
  return ki(8390656, 8, a2, b);
}
function $h(a2, b) {
  return li(2048, 8, a2, b);
}
function ni(a2, b) {
  return li(4, 2, a2, b);
}
function oi(a2, b) {
  return li(4, 4, a2, b);
}
function pi(a2, b) {
  if ("function" === typeof b) return a2 = a2(), b(a2), function() {
    b(null);
  };
  if (null !== b && void 0 !== b) return a2 = a2(), b.current = a2, function() {
    b.current = null;
  };
}
function qi(a2, b, c2) {
  c2 = null !== c2 && void 0 !== c2 ? c2.concat([a2]) : null;
  return li(4, 4, pi.bind(null, b, a2), c2);
}
function ri() {
}
function si(a2, b) {
  var c2 = Uh();
  b = void 0 === b ? null : b;
  var d = c2.memoizedState;
  if (null !== d && null !== b && Mh(b, d[1])) return d[0];
  c2.memoizedState = [a2, b];
  return a2;
}
function ti(a2, b) {
  var c2 = Uh();
  b = void 0 === b ? null : b;
  var d = c2.memoizedState;
  if (null !== d && null !== b && Mh(b, d[1])) return d[0];
  a2 = a2();
  c2.memoizedState = [a2, b];
  return a2;
}
function ui(a2, b, c2) {
  if (0 === (Hh & 21)) return a2.baseState && (a2.baseState = false, dh = true), a2.memoizedState = c2;
  He(c2, b) || (c2 = yc$1(), M$2.lanes |= c2, rh |= c2, a2.baseState = true);
  return b;
}
function vi(a2, b) {
  var c2 = C$1;
  C$1 = 0 !== c2 && 4 > c2 ? c2 : 4;
  a2(true);
  var d = Gh.transition;
  Gh.transition = {};
  try {
    a2(false), b();
  } finally {
    C$1 = c2, Gh.transition = d;
  }
}
function wi() {
  return Uh().memoizedState;
}
function xi(a2, b, c2) {
  var d = yi(a2);
  c2 = { lane: d, action: c2, hasEagerState: false, eagerState: null, next: null };
  if (zi(a2)) Ai(b, c2);
  else if (c2 = hh(a2, b, c2, d), null !== c2) {
    var e2 = R$2();
    gi(c2, a2, d, e2);
    Bi(c2, b, d);
  }
}
function ii(a2, b, c2) {
  var d = yi(a2), e2 = { lane: d, action: c2, hasEagerState: false, eagerState: null, next: null };
  if (zi(a2)) Ai(b, e2);
  else {
    var f2 = a2.alternate;
    if (0 === a2.lanes && (null === f2 || 0 === f2.lanes) && (f2 = b.lastRenderedReducer, null !== f2)) try {
      var g = b.lastRenderedState, h = f2(g, c2);
      e2.hasEagerState = true;
      e2.eagerState = h;
      if (He(h, g)) {
        var k2 = b.interleaved;
        null === k2 ? (e2.next = e2, gh(b)) : (e2.next = k2.next, k2.next = e2);
        b.interleaved = e2;
        return;
      }
    } catch (l2) {
    } finally {
    }
    c2 = hh(a2, b, e2, d);
    null !== c2 && (e2 = R$2(), gi(c2, a2, d, e2), Bi(c2, b, d));
  }
}
function zi(a2) {
  var b = a2.alternate;
  return a2 === M$2 || null !== b && b === M$2;
}
function Ai(a2, b) {
  Jh = Ih = true;
  var c2 = a2.pending;
  null === c2 ? b.next = b : (b.next = c2.next, c2.next = b);
  a2.pending = b;
}
function Bi(a2, b, c2) {
  if (0 !== (c2 & 4194240)) {
    var d = b.lanes;
    d &= a2.pendingLanes;
    c2 |= d;
    b.lanes = c2;
    Cc$1(a2, c2);
  }
}
var Rh = { readContext: eh, useCallback: P$2, useContext: P$2, useEffect: P$2, useImperativeHandle: P$2, useInsertionEffect: P$2, useLayoutEffect: P$2, useMemo: P$2, useReducer: P$2, useRef: P$2, useState: P$2, useDebugValue: P$2, useDeferredValue: P$2, useTransition: P$2, useMutableSource: P$2, useSyncExternalStore: P$2, useId: P$2, unstable_isNewReconciler: false }, Oh = { readContext: eh, useCallback: function(a2, b) {
  Th().memoizedState = [a2, void 0 === b ? null : b];
  return a2;
}, useContext: eh, useEffect: mi, useImperativeHandle: function(a2, b, c2) {
  c2 = null !== c2 && void 0 !== c2 ? c2.concat([a2]) : null;
  return ki(
    4194308,
    4,
    pi.bind(null, b, a2),
    c2
  );
}, useLayoutEffect: function(a2, b) {
  return ki(4194308, 4, a2, b);
}, useInsertionEffect: function(a2, b) {
  return ki(4, 2, a2, b);
}, useMemo: function(a2, b) {
  var c2 = Th();
  b = void 0 === b ? null : b;
  a2 = a2();
  c2.memoizedState = [a2, b];
  return a2;
}, useReducer: function(a2, b, c2) {
  var d = Th();
  b = void 0 !== c2 ? c2(b) : b;
  d.memoizedState = d.baseState = b;
  a2 = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: a2, lastRenderedState: b };
  d.queue = a2;
  a2 = a2.dispatch = xi.bind(null, M$2, a2);
  return [d.memoizedState, a2];
}, useRef: function(a2) {
  var b = Th();
  a2 = { current: a2 };
  return b.memoizedState = a2;
}, useState: hi, useDebugValue: ri, useDeferredValue: function(a2) {
  return Th().memoizedState = a2;
}, useTransition: function() {
  var a2 = hi(false), b = a2[0];
  a2 = vi.bind(null, a2[1]);
  Th().memoizedState = a2;
  return [b, a2];
}, useMutableSource: function() {
}, useSyncExternalStore: function(a2, b, c2) {
  var d = M$2, e2 = Th();
  if (I$2) {
    if (void 0 === c2) throw Error(p$2(407));
    c2 = c2();
  } else {
    c2 = b();
    if (null === Q$2) throw Error(p$2(349));
    0 !== (Hh & 30) || di(d, b, c2);
  }
  e2.memoizedState = c2;
  var f2 = { value: c2, getSnapshot: b };
  e2.queue = f2;
  mi(ai.bind(
    null,
    d,
    f2,
    a2
  ), [a2]);
  d.flags |= 2048;
  bi(9, ci.bind(null, d, f2, c2, b), void 0, null);
  return c2;
}, useId: function() {
  var a2 = Th(), b = Q$2.identifierPrefix;
  if (I$2) {
    var c2 = sg;
    var d = rg;
    c2 = (d & ~(1 << 32 - oc$1(d) - 1)).toString(32) + c2;
    b = ":" + b + "R" + c2;
    c2 = Kh++;
    0 < c2 && (b += "H" + c2.toString(32));
    b += ":";
  } else c2 = Lh++, b = ":" + b + "r" + c2.toString(32) + ":";
  return a2.memoizedState = b;
}, unstable_isNewReconciler: false }, Ph = {
  readContext: eh,
  useCallback: si,
  useContext: eh,
  useEffect: $h,
  useImperativeHandle: qi,
  useInsertionEffect: ni,
  useLayoutEffect: oi,
  useMemo: ti,
  useReducer: Wh,
  useRef: ji,
  useState: function() {
    return Wh(Vh);
  },
  useDebugValue: ri,
  useDeferredValue: function(a2) {
    var b = Uh();
    return ui(b, N$2.memoizedState, a2);
  },
  useTransition: function() {
    var a2 = Wh(Vh)[0], b = Uh().memoizedState;
    return [a2, b];
  },
  useMutableSource: Yh,
  useSyncExternalStore: Zh,
  useId: wi,
  unstable_isNewReconciler: false
}, Qh = { readContext: eh, useCallback: si, useContext: eh, useEffect: $h, useImperativeHandle: qi, useInsertionEffect: ni, useLayoutEffect: oi, useMemo: ti, useReducer: Xh, useRef: ji, useState: function() {
  return Xh(Vh);
}, useDebugValue: ri, useDeferredValue: function(a2) {
  var b = Uh();
  return null === N$2 ? b.memoizedState = a2 : ui(b, N$2.memoizedState, a2);
}, useTransition: function() {
  var a2 = Xh(Vh)[0], b = Uh().memoizedState;
  return [a2, b];
}, useMutableSource: Yh, useSyncExternalStore: Zh, useId: wi, unstable_isNewReconciler: false };
function Ci(a2, b) {
  if (a2 && a2.defaultProps) {
    b = A$1({}, b);
    a2 = a2.defaultProps;
    for (var c2 in a2) void 0 === b[c2] && (b[c2] = a2[c2]);
    return b;
  }
  return b;
}
function Di(a2, b, c2, d) {
  b = a2.memoizedState;
  c2 = c2(d, b);
  c2 = null === c2 || void 0 === c2 ? b : A$1({}, b, c2);
  a2.memoizedState = c2;
  0 === a2.lanes && (a2.updateQueue.baseState = c2);
}
var Ei = { isMounted: function(a2) {
  return (a2 = a2._reactInternals) ? Vb$1(a2) === a2 : false;
}, enqueueSetState: function(a2, b, c2) {
  a2 = a2._reactInternals;
  var d = R$2(), e2 = yi(a2), f2 = mh(d, e2);
  f2.payload = b;
  void 0 !== c2 && null !== c2 && (f2.callback = c2);
  b = nh(a2, f2, e2);
  null !== b && (gi(b, a2, e2, d), oh(b, a2, e2));
}, enqueueReplaceState: function(a2, b, c2) {
  a2 = a2._reactInternals;
  var d = R$2(), e2 = yi(a2), f2 = mh(d, e2);
  f2.tag = 1;
  f2.payload = b;
  void 0 !== c2 && null !== c2 && (f2.callback = c2);
  b = nh(a2, f2, e2);
  null !== b && (gi(b, a2, e2, d), oh(b, a2, e2));
}, enqueueForceUpdate: function(a2, b) {
  a2 = a2._reactInternals;
  var c2 = R$2(), d = yi(a2), e2 = mh(c2, d);
  e2.tag = 2;
  void 0 !== b && null !== b && (e2.callback = b);
  b = nh(a2, e2, d);
  null !== b && (gi(b, a2, d, c2), oh(b, a2, d));
} };
function Fi(a2, b, c2, d, e2, f2, g) {
  a2 = a2.stateNode;
  return "function" === typeof a2.shouldComponentUpdate ? a2.shouldComponentUpdate(d, f2, g) : b.prototype && b.prototype.isPureReactComponent ? !Ie(c2, d) || !Ie(e2, f2) : true;
}
function Gi(a2, b, c2) {
  var d = false, e2 = Vf;
  var f2 = b.contextType;
  "object" === typeof f2 && null !== f2 ? f2 = eh(f2) : (e2 = Zf(b) ? Xf : H$2.current, d = b.contextTypes, f2 = (d = null !== d && void 0 !== d) ? Yf(a2, e2) : Vf);
  b = new b(c2, f2);
  a2.memoizedState = null !== b.state && void 0 !== b.state ? b.state : null;
  b.updater = Ei;
  a2.stateNode = b;
  b._reactInternals = a2;
  d && (a2 = a2.stateNode, a2.__reactInternalMemoizedUnmaskedChildContext = e2, a2.__reactInternalMemoizedMaskedChildContext = f2);
  return b;
}
function Hi(a2, b, c2, d) {
  a2 = b.state;
  "function" === typeof b.componentWillReceiveProps && b.componentWillReceiveProps(c2, d);
  "function" === typeof b.UNSAFE_componentWillReceiveProps && b.UNSAFE_componentWillReceiveProps(c2, d);
  b.state !== a2 && Ei.enqueueReplaceState(b, b.state, null);
}
function Ii(a2, b, c2, d) {
  var e2 = a2.stateNode;
  e2.props = c2;
  e2.state = a2.memoizedState;
  e2.refs = {};
  kh(a2);
  var f2 = b.contextType;
  "object" === typeof f2 && null !== f2 ? e2.context = eh(f2) : (f2 = Zf(b) ? Xf : H$2.current, e2.context = Yf(a2, f2));
  e2.state = a2.memoizedState;
  f2 = b.getDerivedStateFromProps;
  "function" === typeof f2 && (Di(a2, b, f2, c2), e2.state = a2.memoizedState);
  "function" === typeof b.getDerivedStateFromProps || "function" === typeof e2.getSnapshotBeforeUpdate || "function" !== typeof e2.UNSAFE_componentWillMount && "function" !== typeof e2.componentWillMount || (b = e2.state, "function" === typeof e2.componentWillMount && e2.componentWillMount(), "function" === typeof e2.UNSAFE_componentWillMount && e2.UNSAFE_componentWillMount(), b !== e2.state && Ei.enqueueReplaceState(e2, e2.state, null), qh(a2, c2, e2, d), e2.state = a2.memoizedState);
  "function" === typeof e2.componentDidMount && (a2.flags |= 4194308);
}
function Ji(a2, b) {
  try {
    var c2 = "", d = b;
    do
      c2 += Pa$2(d), d = d.return;
    while (d);
    var e2 = c2;
  } catch (f2) {
    e2 = "\nError generating stack: " + f2.message + "\n" + f2.stack;
  }
  return { value: a2, source: b, stack: e2, digest: null };
}
function Ki(a2, b, c2) {
  return { value: a2, source: null, stack: null != c2 ? c2 : null, digest: null != b ? b : null };
}
function Li(a2, b) {
  try {
    console.error(b.value);
  } catch (c2) {
    setTimeout(function() {
      throw c2;
    });
  }
}
var Mi = "function" === typeof WeakMap ? WeakMap : Map;
function Ni(a2, b, c2) {
  c2 = mh(-1, c2);
  c2.tag = 3;
  c2.payload = { element: null };
  var d = b.value;
  c2.callback = function() {
    Oi || (Oi = true, Pi = d);
    Li(a2, b);
  };
  return c2;
}
function Qi(a2, b, c2) {
  c2 = mh(-1, c2);
  c2.tag = 3;
  var d = a2.type.getDerivedStateFromError;
  if ("function" === typeof d) {
    var e2 = b.value;
    c2.payload = function() {
      return d(e2);
    };
    c2.callback = function() {
      Li(a2, b);
    };
  }
  var f2 = a2.stateNode;
  null !== f2 && "function" === typeof f2.componentDidCatch && (c2.callback = function() {
    Li(a2, b);
    "function" !== typeof d && (null === Ri ? Ri = /* @__PURE__ */ new Set([this]) : Ri.add(this));
    var c3 = b.stack;
    this.componentDidCatch(b.value, { componentStack: null !== c3 ? c3 : "" });
  });
  return c2;
}
function Si(a2, b, c2) {
  var d = a2.pingCache;
  if (null === d) {
    d = a2.pingCache = new Mi();
    var e2 = /* @__PURE__ */ new Set();
    d.set(b, e2);
  } else e2 = d.get(b), void 0 === e2 && (e2 = /* @__PURE__ */ new Set(), d.set(b, e2));
  e2.has(c2) || (e2.add(c2), a2 = Ti.bind(null, a2, b, c2), b.then(a2, a2));
}
function Ui(a2) {
  do {
    var b;
    if (b = 13 === a2.tag) b = a2.memoizedState, b = null !== b ? null !== b.dehydrated ? true : false : true;
    if (b) return a2;
    a2 = a2.return;
  } while (null !== a2);
  return null;
}
function Vi(a2, b, c2, d, e2) {
  if (0 === (a2.mode & 1)) return a2 === b ? a2.flags |= 65536 : (a2.flags |= 128, c2.flags |= 131072, c2.flags &= -52805, 1 === c2.tag && (null === c2.alternate ? c2.tag = 17 : (b = mh(-1, 1), b.tag = 2, nh(c2, b, 1))), c2.lanes |= 1), a2;
  a2.flags |= 65536;
  a2.lanes = e2;
  return a2;
}
var Wi = ua$2.ReactCurrentOwner, dh = false;
function Xi(a2, b, c2, d) {
  b.child = null === a2 ? Vg(b, null, c2, d) : Ug(b, a2.child, c2, d);
}
function Yi(a2, b, c2, d, e2) {
  c2 = c2.render;
  var f2 = b.ref;
  ch(b, e2);
  d = Nh(a2, b, c2, d, f2, e2);
  c2 = Sh();
  if (null !== a2 && !dh) return b.updateQueue = a2.updateQueue, b.flags &= -2053, a2.lanes &= ~e2, Zi(a2, b, e2);
  I$2 && c2 && vg(b);
  b.flags |= 1;
  Xi(a2, b, d, e2);
  return b.child;
}
function $i(a2, b, c2, d, e2) {
  if (null === a2) {
    var f2 = c2.type;
    if ("function" === typeof f2 && !aj(f2) && void 0 === f2.defaultProps && null === c2.compare && void 0 === c2.defaultProps) return b.tag = 15, b.type = f2, bj(a2, b, f2, d, e2);
    a2 = Rg(c2.type, null, d, b, b.mode, e2);
    a2.ref = b.ref;
    a2.return = b;
    return b.child = a2;
  }
  f2 = a2.child;
  if (0 === (a2.lanes & e2)) {
    var g = f2.memoizedProps;
    c2 = c2.compare;
    c2 = null !== c2 ? c2 : Ie;
    if (c2(g, d) && a2.ref === b.ref) return Zi(a2, b, e2);
  }
  b.flags |= 1;
  a2 = Pg(f2, d);
  a2.ref = b.ref;
  a2.return = b;
  return b.child = a2;
}
function bj(a2, b, c2, d, e2) {
  if (null !== a2) {
    var f2 = a2.memoizedProps;
    if (Ie(f2, d) && a2.ref === b.ref) if (dh = false, b.pendingProps = d = f2, 0 !== (a2.lanes & e2)) 0 !== (a2.flags & 131072) && (dh = true);
    else return b.lanes = a2.lanes, Zi(a2, b, e2);
  }
  return cj(a2, b, c2, d, e2);
}
function dj(a2, b, c2) {
  var d = b.pendingProps, e2 = d.children, f2 = null !== a2 ? a2.memoizedState : null;
  if ("hidden" === d.mode) if (0 === (b.mode & 1)) b.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, G$1(ej, fj), fj |= c2;
  else {
    if (0 === (c2 & 1073741824)) return a2 = null !== f2 ? f2.baseLanes | c2 : c2, b.lanes = b.childLanes = 1073741824, b.memoizedState = { baseLanes: a2, cachePool: null, transitions: null }, b.updateQueue = null, G$1(ej, fj), fj |= a2, null;
    b.memoizedState = { baseLanes: 0, cachePool: null, transitions: null };
    d = null !== f2 ? f2.baseLanes : c2;
    G$1(ej, fj);
    fj |= d;
  }
  else null !== f2 ? (d = f2.baseLanes | c2, b.memoizedState = null) : d = c2, G$1(ej, fj), fj |= d;
  Xi(a2, b, e2, c2);
  return b.child;
}
function gj(a2, b) {
  var c2 = b.ref;
  if (null === a2 && null !== c2 || null !== a2 && a2.ref !== c2) b.flags |= 512, b.flags |= 2097152;
}
function cj(a2, b, c2, d, e2) {
  var f2 = Zf(c2) ? Xf : H$2.current;
  f2 = Yf(b, f2);
  ch(b, e2);
  c2 = Nh(a2, b, c2, d, f2, e2);
  d = Sh();
  if (null !== a2 && !dh) return b.updateQueue = a2.updateQueue, b.flags &= -2053, a2.lanes &= ~e2, Zi(a2, b, e2);
  I$2 && d && vg(b);
  b.flags |= 1;
  Xi(a2, b, c2, e2);
  return b.child;
}
function hj(a2, b, c2, d, e2) {
  if (Zf(c2)) {
    var f2 = true;
    cg(b);
  } else f2 = false;
  ch(b, e2);
  if (null === b.stateNode) ij(a2, b), Gi(b, c2, d), Ii(b, c2, d, e2), d = true;
  else if (null === a2) {
    var g = b.stateNode, h = b.memoizedProps;
    g.props = h;
    var k2 = g.context, l2 = c2.contextType;
    "object" === typeof l2 && null !== l2 ? l2 = eh(l2) : (l2 = Zf(c2) ? Xf : H$2.current, l2 = Yf(b, l2));
    var m2 = c2.getDerivedStateFromProps, q2 = "function" === typeof m2 || "function" === typeof g.getSnapshotBeforeUpdate;
    q2 || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h !== d || k2 !== l2) && Hi(b, g, d, l2);
    jh = false;
    var r2 = b.memoizedState;
    g.state = r2;
    qh(b, d, g, e2);
    k2 = b.memoizedState;
    h !== d || r2 !== k2 || Wf.current || jh ? ("function" === typeof m2 && (Di(b, c2, m2, d), k2 = b.memoizedState), (h = jh || Fi(b, c2, h, d, r2, k2, l2)) ? (q2 || "function" !== typeof g.UNSAFE_componentWillMount && "function" !== typeof g.componentWillMount || ("function" === typeof g.componentWillMount && g.componentWillMount(), "function" === typeof g.UNSAFE_componentWillMount && g.UNSAFE_componentWillMount()), "function" === typeof g.componentDidMount && (b.flags |= 4194308)) : ("function" === typeof g.componentDidMount && (b.flags |= 4194308), b.memoizedProps = d, b.memoizedState = k2), g.props = d, g.state = k2, g.context = l2, d = h) : ("function" === typeof g.componentDidMount && (b.flags |= 4194308), d = false);
  } else {
    g = b.stateNode;
    lh(a2, b);
    h = b.memoizedProps;
    l2 = b.type === b.elementType ? h : Ci(b.type, h);
    g.props = l2;
    q2 = b.pendingProps;
    r2 = g.context;
    k2 = c2.contextType;
    "object" === typeof k2 && null !== k2 ? k2 = eh(k2) : (k2 = Zf(c2) ? Xf : H$2.current, k2 = Yf(b, k2));
    var y2 = c2.getDerivedStateFromProps;
    (m2 = "function" === typeof y2 || "function" === typeof g.getSnapshotBeforeUpdate) || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h !== q2 || r2 !== k2) && Hi(b, g, d, k2);
    jh = false;
    r2 = b.memoizedState;
    g.state = r2;
    qh(b, d, g, e2);
    var n2 = b.memoizedState;
    h !== q2 || r2 !== n2 || Wf.current || jh ? ("function" === typeof y2 && (Di(b, c2, y2, d), n2 = b.memoizedState), (l2 = jh || Fi(b, c2, l2, d, r2, n2, k2) || false) ? (m2 || "function" !== typeof g.UNSAFE_componentWillUpdate && "function" !== typeof g.componentWillUpdate || ("function" === typeof g.componentWillUpdate && g.componentWillUpdate(d, n2, k2), "function" === typeof g.UNSAFE_componentWillUpdate && g.UNSAFE_componentWillUpdate(d, n2, k2)), "function" === typeof g.componentDidUpdate && (b.flags |= 4), "function" === typeof g.getSnapshotBeforeUpdate && (b.flags |= 1024)) : ("function" !== typeof g.componentDidUpdate || h === a2.memoizedProps && r2 === a2.memoizedState || (b.flags |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h === a2.memoizedProps && r2 === a2.memoizedState || (b.flags |= 1024), b.memoizedProps = d, b.memoizedState = n2), g.props = d, g.state = n2, g.context = k2, d = l2) : ("function" !== typeof g.componentDidUpdate || h === a2.memoizedProps && r2 === a2.memoizedState || (b.flags |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h === a2.memoizedProps && r2 === a2.memoizedState || (b.flags |= 1024), d = false);
  }
  return jj(a2, b, c2, d, f2, e2);
}
function jj(a2, b, c2, d, e2, f2) {
  gj(a2, b);
  var g = 0 !== (b.flags & 128);
  if (!d && !g) return e2 && dg(b, c2, false), Zi(a2, b, f2);
  d = b.stateNode;
  Wi.current = b;
  var h = g && "function" !== typeof c2.getDerivedStateFromError ? null : d.render();
  b.flags |= 1;
  null !== a2 && g ? (b.child = Ug(b, a2.child, null, f2), b.child = Ug(b, null, h, f2)) : Xi(a2, b, h, f2);
  b.memoizedState = d.state;
  e2 && dg(b, c2, true);
  return b.child;
}
function kj(a2) {
  var b = a2.stateNode;
  b.pendingContext ? ag(a2, b.pendingContext, b.pendingContext !== b.context) : b.context && ag(a2, b.context, false);
  yh(a2, b.containerInfo);
}
function lj(a2, b, c2, d, e2) {
  Ig();
  Jg(e2);
  b.flags |= 256;
  Xi(a2, b, c2, d);
  return b.child;
}
var mj = { dehydrated: null, treeContext: null, retryLane: 0 };
function nj(a2) {
  return { baseLanes: a2, cachePool: null, transitions: null };
}
function oj(a2, b, c2) {
  var d = b.pendingProps, e2 = L$2.current, f2 = false, g = 0 !== (b.flags & 128), h;
  (h = g) || (h = null !== a2 && null === a2.memoizedState ? false : 0 !== (e2 & 2));
  if (h) f2 = true, b.flags &= -129;
  else if (null === a2 || null !== a2.memoizedState) e2 |= 1;
  G$1(L$2, e2 & 1);
  if (null === a2) {
    Eg(b);
    a2 = b.memoizedState;
    if (null !== a2 && (a2 = a2.dehydrated, null !== a2)) return 0 === (b.mode & 1) ? b.lanes = 1 : "$!" === a2.data ? b.lanes = 8 : b.lanes = 1073741824, null;
    g = d.children;
    a2 = d.fallback;
    return f2 ? (d = b.mode, f2 = b.child, g = { mode: "hidden", children: g }, 0 === (d & 1) && null !== f2 ? (f2.childLanes = 0, f2.pendingProps = g) : f2 = pj(g, d, 0, null), a2 = Tg(a2, d, c2, null), f2.return = b, a2.return = b, f2.sibling = a2, b.child = f2, b.child.memoizedState = nj(c2), b.memoizedState = mj, a2) : qj(b, g);
  }
  e2 = a2.memoizedState;
  if (null !== e2 && (h = e2.dehydrated, null !== h)) return rj(a2, b, g, d, h, e2, c2);
  if (f2) {
    f2 = d.fallback;
    g = b.mode;
    e2 = a2.child;
    h = e2.sibling;
    var k2 = { mode: "hidden", children: d.children };
    0 === (g & 1) && b.child !== e2 ? (d = b.child, d.childLanes = 0, d.pendingProps = k2, b.deletions = null) : (d = Pg(e2, k2), d.subtreeFlags = e2.subtreeFlags & 14680064);
    null !== h ? f2 = Pg(h, f2) : (f2 = Tg(f2, g, c2, null), f2.flags |= 2);
    f2.return = b;
    d.return = b;
    d.sibling = f2;
    b.child = d;
    d = f2;
    f2 = b.child;
    g = a2.child.memoizedState;
    g = null === g ? nj(c2) : { baseLanes: g.baseLanes | c2, cachePool: null, transitions: g.transitions };
    f2.memoizedState = g;
    f2.childLanes = a2.childLanes & ~c2;
    b.memoizedState = mj;
    return d;
  }
  f2 = a2.child;
  a2 = f2.sibling;
  d = Pg(f2, { mode: "visible", children: d.children });
  0 === (b.mode & 1) && (d.lanes = c2);
  d.return = b;
  d.sibling = null;
  null !== a2 && (c2 = b.deletions, null === c2 ? (b.deletions = [a2], b.flags |= 16) : c2.push(a2));
  b.child = d;
  b.memoizedState = null;
  return d;
}
function qj(a2, b) {
  b = pj({ mode: "visible", children: b }, a2.mode, 0, null);
  b.return = a2;
  return a2.child = b;
}
function sj(a2, b, c2, d) {
  null !== d && Jg(d);
  Ug(b, a2.child, null, c2);
  a2 = qj(b, b.pendingProps.children);
  a2.flags |= 2;
  b.memoizedState = null;
  return a2;
}
function rj(a2, b, c2, d, e2, f2, g) {
  if (c2) {
    if (b.flags & 256) return b.flags &= -257, d = Ki(Error(p$2(422))), sj(a2, b, g, d);
    if (null !== b.memoizedState) return b.child = a2.child, b.flags |= 128, null;
    f2 = d.fallback;
    e2 = b.mode;
    d = pj({ mode: "visible", children: d.children }, e2, 0, null);
    f2 = Tg(f2, e2, g, null);
    f2.flags |= 2;
    d.return = b;
    f2.return = b;
    d.sibling = f2;
    b.child = d;
    0 !== (b.mode & 1) && Ug(b, a2.child, null, g);
    b.child.memoizedState = nj(g);
    b.memoizedState = mj;
    return f2;
  }
  if (0 === (b.mode & 1)) return sj(a2, b, g, null);
  if ("$!" === e2.data) {
    d = e2.nextSibling && e2.nextSibling.dataset;
    if (d) var h = d.dgst;
    d = h;
    f2 = Error(p$2(419));
    d = Ki(f2, d, void 0);
    return sj(a2, b, g, d);
  }
  h = 0 !== (g & a2.childLanes);
  if (dh || h) {
    d = Q$2;
    if (null !== d) {
      switch (g & -g) {
        case 4:
          e2 = 2;
          break;
        case 16:
          e2 = 8;
          break;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          e2 = 32;
          break;
        case 536870912:
          e2 = 268435456;
          break;
        default:
          e2 = 0;
      }
      e2 = 0 !== (e2 & (d.suspendedLanes | g)) ? 0 : e2;
      0 !== e2 && e2 !== f2.retryLane && (f2.retryLane = e2, ih(a2, e2), gi(d, a2, e2, -1));
    }
    tj();
    d = Ki(Error(p$2(421)));
    return sj(a2, b, g, d);
  }
  if ("$?" === e2.data) return b.flags |= 128, b.child = a2.child, b = uj.bind(null, a2), e2._reactRetry = b, null;
  a2 = f2.treeContext;
  yg = Lf(e2.nextSibling);
  xg = b;
  I$2 = true;
  zg = null;
  null !== a2 && (og[pg++] = rg, og[pg++] = sg, og[pg++] = qg, rg = a2.id, sg = a2.overflow, qg = b);
  b = qj(b, d.children);
  b.flags |= 4096;
  return b;
}
function vj(a2, b, c2) {
  a2.lanes |= b;
  var d = a2.alternate;
  null !== d && (d.lanes |= b);
  bh(a2.return, b, c2);
}
function wj(a2, b, c2, d, e2) {
  var f2 = a2.memoizedState;
  null === f2 ? a2.memoizedState = { isBackwards: b, rendering: null, renderingStartTime: 0, last: d, tail: c2, tailMode: e2 } : (f2.isBackwards = b, f2.rendering = null, f2.renderingStartTime = 0, f2.last = d, f2.tail = c2, f2.tailMode = e2);
}
function xj(a2, b, c2) {
  var d = b.pendingProps, e2 = d.revealOrder, f2 = d.tail;
  Xi(a2, b, d.children, c2);
  d = L$2.current;
  if (0 !== (d & 2)) d = d & 1 | 2, b.flags |= 128;
  else {
    if (null !== a2 && 0 !== (a2.flags & 128)) a: for (a2 = b.child; null !== a2; ) {
      if (13 === a2.tag) null !== a2.memoizedState && vj(a2, c2, b);
      else if (19 === a2.tag) vj(a2, c2, b);
      else if (null !== a2.child) {
        a2.child.return = a2;
        a2 = a2.child;
        continue;
      }
      if (a2 === b) break a;
      for (; null === a2.sibling; ) {
        if (null === a2.return || a2.return === b) break a;
        a2 = a2.return;
      }
      a2.sibling.return = a2.return;
      a2 = a2.sibling;
    }
    d &= 1;
  }
  G$1(L$2, d);
  if (0 === (b.mode & 1)) b.memoizedState = null;
  else switch (e2) {
    case "forwards":
      c2 = b.child;
      for (e2 = null; null !== c2; ) a2 = c2.alternate, null !== a2 && null === Ch(a2) && (e2 = c2), c2 = c2.sibling;
      c2 = e2;
      null === c2 ? (e2 = b.child, b.child = null) : (e2 = c2.sibling, c2.sibling = null);
      wj(b, false, e2, c2, f2);
      break;
    case "backwards":
      c2 = null;
      e2 = b.child;
      for (b.child = null; null !== e2; ) {
        a2 = e2.alternate;
        if (null !== a2 && null === Ch(a2)) {
          b.child = e2;
          break;
        }
        a2 = e2.sibling;
        e2.sibling = c2;
        c2 = e2;
        e2 = a2;
      }
      wj(b, true, c2, null, f2);
      break;
    case "together":
      wj(b, false, null, null, void 0);
      break;
    default:
      b.memoizedState = null;
  }
  return b.child;
}
function ij(a2, b) {
  0 === (b.mode & 1) && null !== a2 && (a2.alternate = null, b.alternate = null, b.flags |= 2);
}
function Zi(a2, b, c2) {
  null !== a2 && (b.dependencies = a2.dependencies);
  rh |= b.lanes;
  if (0 === (c2 & b.childLanes)) return null;
  if (null !== a2 && b.child !== a2.child) throw Error(p$2(153));
  if (null !== b.child) {
    a2 = b.child;
    c2 = Pg(a2, a2.pendingProps);
    b.child = c2;
    for (c2.return = b; null !== a2.sibling; ) a2 = a2.sibling, c2 = c2.sibling = Pg(a2, a2.pendingProps), c2.return = b;
    c2.sibling = null;
  }
  return b.child;
}
function yj(a2, b, c2) {
  switch (b.tag) {
    case 3:
      kj(b);
      Ig();
      break;
    case 5:
      Ah(b);
      break;
    case 1:
      Zf(b.type) && cg(b);
      break;
    case 4:
      yh(b, b.stateNode.containerInfo);
      break;
    case 10:
      var d = b.type._context, e2 = b.memoizedProps.value;
      G$1(Wg, d._currentValue);
      d._currentValue = e2;
      break;
    case 13:
      d = b.memoizedState;
      if (null !== d) {
        if (null !== d.dehydrated) return G$1(L$2, L$2.current & 1), b.flags |= 128, null;
        if (0 !== (c2 & b.child.childLanes)) return oj(a2, b, c2);
        G$1(L$2, L$2.current & 1);
        a2 = Zi(a2, b, c2);
        return null !== a2 ? a2.sibling : null;
      }
      G$1(L$2, L$2.current & 1);
      break;
    case 19:
      d = 0 !== (c2 & b.childLanes);
      if (0 !== (a2.flags & 128)) {
        if (d) return xj(a2, b, c2);
        b.flags |= 128;
      }
      e2 = b.memoizedState;
      null !== e2 && (e2.rendering = null, e2.tail = null, e2.lastEffect = null);
      G$1(L$2, L$2.current);
      if (d) break;
      else return null;
    case 22:
    case 23:
      return b.lanes = 0, dj(a2, b, c2);
  }
  return Zi(a2, b, c2);
}
var zj, Aj, Bj, Cj;
zj = function(a2, b) {
  for (var c2 = b.child; null !== c2; ) {
    if (5 === c2.tag || 6 === c2.tag) a2.appendChild(c2.stateNode);
    else if (4 !== c2.tag && null !== c2.child) {
      c2.child.return = c2;
      c2 = c2.child;
      continue;
    }
    if (c2 === b) break;
    for (; null === c2.sibling; ) {
      if (null === c2.return || c2.return === b) return;
      c2 = c2.return;
    }
    c2.sibling.return = c2.return;
    c2 = c2.sibling;
  }
};
Aj = function() {
};
Bj = function(a2, b, c2, d) {
  var e2 = a2.memoizedProps;
  if (e2 !== d) {
    a2 = b.stateNode;
    xh(uh.current);
    var f2 = null;
    switch (c2) {
      case "input":
        e2 = Ya$2(a2, e2);
        d = Ya$2(a2, d);
        f2 = [];
        break;
      case "select":
        e2 = A$1({}, e2, { value: void 0 });
        d = A$1({}, d, { value: void 0 });
        f2 = [];
        break;
      case "textarea":
        e2 = gb$2(a2, e2);
        d = gb$2(a2, d);
        f2 = [];
        break;
      default:
        "function" !== typeof e2.onClick && "function" === typeof d.onClick && (a2.onclick = Bf);
    }
    ub$2(c2, d);
    var g;
    c2 = null;
    for (l2 in e2) if (!d.hasOwnProperty(l2) && e2.hasOwnProperty(l2) && null != e2[l2]) if ("style" === l2) {
      var h = e2[l2];
      for (g in h) h.hasOwnProperty(g) && (c2 || (c2 = {}), c2[g] = "");
    } else "dangerouslySetInnerHTML" !== l2 && "children" !== l2 && "suppressContentEditableWarning" !== l2 && "suppressHydrationWarning" !== l2 && "autoFocus" !== l2 && (ea$1.hasOwnProperty(l2) ? f2 || (f2 = []) : (f2 = f2 || []).push(l2, null));
    for (l2 in d) {
      var k2 = d[l2];
      h = null != e2 ? e2[l2] : void 0;
      if (d.hasOwnProperty(l2) && k2 !== h && (null != k2 || null != h)) if ("style" === l2) if (h) {
        for (g in h) !h.hasOwnProperty(g) || k2 && k2.hasOwnProperty(g) || (c2 || (c2 = {}), c2[g] = "");
        for (g in k2) k2.hasOwnProperty(g) && h[g] !== k2[g] && (c2 || (c2 = {}), c2[g] = k2[g]);
      } else c2 || (f2 || (f2 = []), f2.push(
        l2,
        c2
      )), c2 = k2;
      else "dangerouslySetInnerHTML" === l2 ? (k2 = k2 ? k2.__html : void 0, h = h ? h.__html : void 0, null != k2 && h !== k2 && (f2 = f2 || []).push(l2, k2)) : "children" === l2 ? "string" !== typeof k2 && "number" !== typeof k2 || (f2 = f2 || []).push(l2, "" + k2) : "suppressContentEditableWarning" !== l2 && "suppressHydrationWarning" !== l2 && (ea$1.hasOwnProperty(l2) ? (null != k2 && "onScroll" === l2 && D$1("scroll", a2), f2 || h === k2 || (f2 = [])) : (f2 = f2 || []).push(l2, k2));
    }
    c2 && (f2 = f2 || []).push("style", c2);
    var l2 = f2;
    if (b.updateQueue = l2) b.flags |= 4;
  }
};
Cj = function(a2, b, c2, d) {
  c2 !== d && (b.flags |= 4);
};
function Dj(a2, b) {
  if (!I$2) switch (a2.tailMode) {
    case "hidden":
      b = a2.tail;
      for (var c2 = null; null !== b; ) null !== b.alternate && (c2 = b), b = b.sibling;
      null === c2 ? a2.tail = null : c2.sibling = null;
      break;
    case "collapsed":
      c2 = a2.tail;
      for (var d = null; null !== c2; ) null !== c2.alternate && (d = c2), c2 = c2.sibling;
      null === d ? b || null === a2.tail ? a2.tail = null : a2.tail.sibling = null : d.sibling = null;
  }
}
function S$2(a2) {
  var b = null !== a2.alternate && a2.alternate.child === a2.child, c2 = 0, d = 0;
  if (b) for (var e2 = a2.child; null !== e2; ) c2 |= e2.lanes | e2.childLanes, d |= e2.subtreeFlags & 14680064, d |= e2.flags & 14680064, e2.return = a2, e2 = e2.sibling;
  else for (e2 = a2.child; null !== e2; ) c2 |= e2.lanes | e2.childLanes, d |= e2.subtreeFlags, d |= e2.flags, e2.return = a2, e2 = e2.sibling;
  a2.subtreeFlags |= d;
  a2.childLanes = c2;
  return b;
}
function Ej(a2, b, c2) {
  var d = b.pendingProps;
  wg(b);
  switch (b.tag) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return S$2(b), null;
    case 1:
      return Zf(b.type) && $f(), S$2(b), null;
    case 3:
      d = b.stateNode;
      zh();
      E$2(Wf);
      E$2(H$2);
      Eh();
      d.pendingContext && (d.context = d.pendingContext, d.pendingContext = null);
      if (null === a2 || null === a2.child) Gg(b) ? b.flags |= 4 : null === a2 || a2.memoizedState.isDehydrated && 0 === (b.flags & 256) || (b.flags |= 1024, null !== zg && (Fj(zg), zg = null));
      Aj(a2, b);
      S$2(b);
      return null;
    case 5:
      Bh(b);
      var e2 = xh(wh.current);
      c2 = b.type;
      if (null !== a2 && null != b.stateNode) Bj(a2, b, c2, d, e2), a2.ref !== b.ref && (b.flags |= 512, b.flags |= 2097152);
      else {
        if (!d) {
          if (null === b.stateNode) throw Error(p$2(166));
          S$2(b);
          return null;
        }
        a2 = xh(uh.current);
        if (Gg(b)) {
          d = b.stateNode;
          c2 = b.type;
          var f2 = b.memoizedProps;
          d[Of] = b;
          d[Pf] = f2;
          a2 = 0 !== (b.mode & 1);
          switch (c2) {
            case "dialog":
              D$1("cancel", d);
              D$1("close", d);
              break;
            case "iframe":
            case "object":
            case "embed":
              D$1("load", d);
              break;
            case "video":
            case "audio":
              for (e2 = 0; e2 < lf.length; e2++) D$1(lf[e2], d);
              break;
            case "source":
              D$1("error", d);
              break;
            case "img":
            case "image":
            case "link":
              D$1(
                "error",
                d
              );
              D$1("load", d);
              break;
            case "details":
              D$1("toggle", d);
              break;
            case "input":
              Za$2(d, f2);
              D$1("invalid", d);
              break;
            case "select":
              d._wrapperState = { wasMultiple: !!f2.multiple };
              D$1("invalid", d);
              break;
            case "textarea":
              hb$2(d, f2), D$1("invalid", d);
          }
          ub$2(c2, f2);
          e2 = null;
          for (var g in f2) if (f2.hasOwnProperty(g)) {
            var h = f2[g];
            "children" === g ? "string" === typeof h ? d.textContent !== h && (true !== f2.suppressHydrationWarning && Af(d.textContent, h, a2), e2 = ["children", h]) : "number" === typeof h && d.textContent !== "" + h && (true !== f2.suppressHydrationWarning && Af(
              d.textContent,
              h,
              a2
            ), e2 = ["children", "" + h]) : ea$1.hasOwnProperty(g) && null != h && "onScroll" === g && D$1("scroll", d);
          }
          switch (c2) {
            case "input":
              Va$2(d);
              db$2(d, f2, true);
              break;
            case "textarea":
              Va$2(d);
              jb$2(d);
              break;
            case "select":
            case "option":
              break;
            default:
              "function" === typeof f2.onClick && (d.onclick = Bf);
          }
          d = e2;
          b.updateQueue = d;
          null !== d && (b.flags |= 4);
        } else {
          g = 9 === e2.nodeType ? e2 : e2.ownerDocument;
          "http://www.w3.org/1999/xhtml" === a2 && (a2 = kb$2(c2));
          "http://www.w3.org/1999/xhtml" === a2 ? "script" === c2 ? (a2 = g.createElement("div"), a2.innerHTML = "<script><\/script>", a2 = a2.removeChild(a2.firstChild)) : "string" === typeof d.is ? a2 = g.createElement(c2, { is: d.is }) : (a2 = g.createElement(c2), "select" === c2 && (g = a2, d.multiple ? g.multiple = true : d.size && (g.size = d.size))) : a2 = g.createElementNS(a2, c2);
          a2[Of] = b;
          a2[Pf] = d;
          zj(a2, b, false, false);
          b.stateNode = a2;
          a: {
            g = vb$2(c2, d);
            switch (c2) {
              case "dialog":
                D$1("cancel", a2);
                D$1("close", a2);
                e2 = d;
                break;
              case "iframe":
              case "object":
              case "embed":
                D$1("load", a2);
                e2 = d;
                break;
              case "video":
              case "audio":
                for (e2 = 0; e2 < lf.length; e2++) D$1(lf[e2], a2);
                e2 = d;
                break;
              case "source":
                D$1("error", a2);
                e2 = d;
                break;
              case "img":
              case "image":
              case "link":
                D$1(
                  "error",
                  a2
                );
                D$1("load", a2);
                e2 = d;
                break;
              case "details":
                D$1("toggle", a2);
                e2 = d;
                break;
              case "input":
                Za$2(a2, d);
                e2 = Ya$2(a2, d);
                D$1("invalid", a2);
                break;
              case "option":
                e2 = d;
                break;
              case "select":
                a2._wrapperState = { wasMultiple: !!d.multiple };
                e2 = A$1({}, d, { value: void 0 });
                D$1("invalid", a2);
                break;
              case "textarea":
                hb$2(a2, d);
                e2 = gb$2(a2, d);
                D$1("invalid", a2);
                break;
              default:
                e2 = d;
            }
            ub$2(c2, e2);
            h = e2;
            for (f2 in h) if (h.hasOwnProperty(f2)) {
              var k2 = h[f2];
              "style" === f2 ? sb$2(a2, k2) : "dangerouslySetInnerHTML" === f2 ? (k2 = k2 ? k2.__html : void 0, null != k2 && nb$1(a2, k2)) : "children" === f2 ? "string" === typeof k2 ? ("textarea" !== c2 || "" !== k2) && ob$2(a2, k2) : "number" === typeof k2 && ob$2(a2, "" + k2) : "suppressContentEditableWarning" !== f2 && "suppressHydrationWarning" !== f2 && "autoFocus" !== f2 && (ea$1.hasOwnProperty(f2) ? null != k2 && "onScroll" === f2 && D$1("scroll", a2) : null != k2 && ta$2(a2, f2, k2, g));
            }
            switch (c2) {
              case "input":
                Va$2(a2);
                db$2(a2, d, false);
                break;
              case "textarea":
                Va$2(a2);
                jb$2(a2);
                break;
              case "option":
                null != d.value && a2.setAttribute("value", "" + Sa$2(d.value));
                break;
              case "select":
                a2.multiple = !!d.multiple;
                f2 = d.value;
                null != f2 ? fb$2(a2, !!d.multiple, f2, false) : null != d.defaultValue && fb$2(
                  a2,
                  !!d.multiple,
                  d.defaultValue,
                  true
                );
                break;
              default:
                "function" === typeof e2.onClick && (a2.onclick = Bf);
            }
            switch (c2) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                d = !!d.autoFocus;
                break a;
              case "img":
                d = true;
                break a;
              default:
                d = false;
            }
          }
          d && (b.flags |= 4);
        }
        null !== b.ref && (b.flags |= 512, b.flags |= 2097152);
      }
      S$2(b);
      return null;
    case 6:
      if (a2 && null != b.stateNode) Cj(a2, b, a2.memoizedProps, d);
      else {
        if ("string" !== typeof d && null === b.stateNode) throw Error(p$2(166));
        c2 = xh(wh.current);
        xh(uh.current);
        if (Gg(b)) {
          d = b.stateNode;
          c2 = b.memoizedProps;
          d[Of] = b;
          if (f2 = d.nodeValue !== c2) {
            if (a2 = xg, null !== a2) switch (a2.tag) {
              case 3:
                Af(d.nodeValue, c2, 0 !== (a2.mode & 1));
                break;
              case 5:
                true !== a2.memoizedProps.suppressHydrationWarning && Af(d.nodeValue, c2, 0 !== (a2.mode & 1));
            }
          }
          f2 && (b.flags |= 4);
        } else d = (9 === c2.nodeType ? c2 : c2.ownerDocument).createTextNode(d), d[Of] = b, b.stateNode = d;
      }
      S$2(b);
      return null;
    case 13:
      E$2(L$2);
      d = b.memoizedState;
      if (null === a2 || null !== a2.memoizedState && null !== a2.memoizedState.dehydrated) {
        if (I$2 && null !== yg && 0 !== (b.mode & 1) && 0 === (b.flags & 128)) Hg(), Ig(), b.flags |= 98560, f2 = false;
        else if (f2 = Gg(b), null !== d && null !== d.dehydrated) {
          if (null === a2) {
            if (!f2) throw Error(p$2(318));
            f2 = b.memoizedState;
            f2 = null !== f2 ? f2.dehydrated : null;
            if (!f2) throw Error(p$2(317));
            f2[Of] = b;
          } else Ig(), 0 === (b.flags & 128) && (b.memoizedState = null), b.flags |= 4;
          S$2(b);
          f2 = false;
        } else null !== zg && (Fj(zg), zg = null), f2 = true;
        if (!f2) return b.flags & 65536 ? b : null;
      }
      if (0 !== (b.flags & 128)) return b.lanes = c2, b;
      d = null !== d;
      d !== (null !== a2 && null !== a2.memoizedState) && d && (b.child.flags |= 8192, 0 !== (b.mode & 1) && (null === a2 || 0 !== (L$2.current & 1) ? 0 === T$2 && (T$2 = 3) : tj()));
      null !== b.updateQueue && (b.flags |= 4);
      S$2(b);
      return null;
    case 4:
      return zh(), Aj(a2, b), null === a2 && sf(b.stateNode.containerInfo), S$2(b), null;
    case 10:
      return ah(b.type._context), S$2(b), null;
    case 17:
      return Zf(b.type) && $f(), S$2(b), null;
    case 19:
      E$2(L$2);
      f2 = b.memoizedState;
      if (null === f2) return S$2(b), null;
      d = 0 !== (b.flags & 128);
      g = f2.rendering;
      if (null === g) if (d) Dj(f2, false);
      else {
        if (0 !== T$2 || null !== a2 && 0 !== (a2.flags & 128)) for (a2 = b.child; null !== a2; ) {
          g = Ch(a2);
          if (null !== g) {
            b.flags |= 128;
            Dj(f2, false);
            d = g.updateQueue;
            null !== d && (b.updateQueue = d, b.flags |= 4);
            b.subtreeFlags = 0;
            d = c2;
            for (c2 = b.child; null !== c2; ) f2 = c2, a2 = d, f2.flags &= 14680066, g = f2.alternate, null === g ? (f2.childLanes = 0, f2.lanes = a2, f2.child = null, f2.subtreeFlags = 0, f2.memoizedProps = null, f2.memoizedState = null, f2.updateQueue = null, f2.dependencies = null, f2.stateNode = null) : (f2.childLanes = g.childLanes, f2.lanes = g.lanes, f2.child = g.child, f2.subtreeFlags = 0, f2.deletions = null, f2.memoizedProps = g.memoizedProps, f2.memoizedState = g.memoizedState, f2.updateQueue = g.updateQueue, f2.type = g.type, a2 = g.dependencies, f2.dependencies = null === a2 ? null : { lanes: a2.lanes, firstContext: a2.firstContext }), c2 = c2.sibling;
            G$1(L$2, L$2.current & 1 | 2);
            return b.child;
          }
          a2 = a2.sibling;
        }
        null !== f2.tail && B$2() > Gj && (b.flags |= 128, d = true, Dj(f2, false), b.lanes = 4194304);
      }
      else {
        if (!d) if (a2 = Ch(g), null !== a2) {
          if (b.flags |= 128, d = true, c2 = a2.updateQueue, null !== c2 && (b.updateQueue = c2, b.flags |= 4), Dj(f2, true), null === f2.tail && "hidden" === f2.tailMode && !g.alternate && !I$2) return S$2(b), null;
        } else 2 * B$2() - f2.renderingStartTime > Gj && 1073741824 !== c2 && (b.flags |= 128, d = true, Dj(f2, false), b.lanes = 4194304);
        f2.isBackwards ? (g.sibling = b.child, b.child = g) : (c2 = f2.last, null !== c2 ? c2.sibling = g : b.child = g, f2.last = g);
      }
      if (null !== f2.tail) return b = f2.tail, f2.rendering = b, f2.tail = b.sibling, f2.renderingStartTime = B$2(), b.sibling = null, c2 = L$2.current, G$1(L$2, d ? c2 & 1 | 2 : c2 & 1), b;
      S$2(b);
      return null;
    case 22:
    case 23:
      return Hj(), d = null !== b.memoizedState, null !== a2 && null !== a2.memoizedState !== d && (b.flags |= 8192), d && 0 !== (b.mode & 1) ? 0 !== (fj & 1073741824) && (S$2(b), b.subtreeFlags & 6 && (b.flags |= 8192)) : S$2(b), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(p$2(156, b.tag));
}
function Ij(a2, b) {
  wg(b);
  switch (b.tag) {
    case 1:
      return Zf(b.type) && $f(), a2 = b.flags, a2 & 65536 ? (b.flags = a2 & -65537 | 128, b) : null;
    case 3:
      return zh(), E$2(Wf), E$2(H$2), Eh(), a2 = b.flags, 0 !== (a2 & 65536) && 0 === (a2 & 128) ? (b.flags = a2 & -65537 | 128, b) : null;
    case 5:
      return Bh(b), null;
    case 13:
      E$2(L$2);
      a2 = b.memoizedState;
      if (null !== a2 && null !== a2.dehydrated) {
        if (null === b.alternate) throw Error(p$2(340));
        Ig();
      }
      a2 = b.flags;
      return a2 & 65536 ? (b.flags = a2 & -65537 | 128, b) : null;
    case 19:
      return E$2(L$2), null;
    case 4:
      return zh(), null;
    case 10:
      return ah(b.type._context), null;
    case 22:
    case 23:
      return Hj(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var Jj = false, U$2 = false, Kj = "function" === typeof WeakSet ? WeakSet : Set, V$2 = null;
function Lj(a2, b) {
  var c2 = a2.ref;
  if (null !== c2) if ("function" === typeof c2) try {
    c2(null);
  } catch (d) {
    W$2(a2, b, d);
  }
  else c2.current = null;
}
function Mj(a2, b, c2) {
  try {
    c2();
  } catch (d) {
    W$2(a2, b, d);
  }
}
var Nj = false;
function Oj(a2, b) {
  Cf = dd$1;
  a2 = Me();
  if (Ne(a2)) {
    if ("selectionStart" in a2) var c2 = { start: a2.selectionStart, end: a2.selectionEnd };
    else a: {
      c2 = (c2 = a2.ownerDocument) && c2.defaultView || window;
      var d = c2.getSelection && c2.getSelection();
      if (d && 0 !== d.rangeCount) {
        c2 = d.anchorNode;
        var e2 = d.anchorOffset, f2 = d.focusNode;
        d = d.focusOffset;
        try {
          c2.nodeType, f2.nodeType;
        } catch (F2) {
          c2 = null;
          break a;
        }
        var g = 0, h = -1, k2 = -1, l2 = 0, m2 = 0, q2 = a2, r2 = null;
        b: for (; ; ) {
          for (var y2; ; ) {
            q2 !== c2 || 0 !== e2 && 3 !== q2.nodeType || (h = g + e2);
            q2 !== f2 || 0 !== d && 3 !== q2.nodeType || (k2 = g + d);
            3 === q2.nodeType && (g += q2.nodeValue.length);
            if (null === (y2 = q2.firstChild)) break;
            r2 = q2;
            q2 = y2;
          }
          for (; ; ) {
            if (q2 === a2) break b;
            r2 === c2 && ++l2 === e2 && (h = g);
            r2 === f2 && ++m2 === d && (k2 = g);
            if (null !== (y2 = q2.nextSibling)) break;
            q2 = r2;
            r2 = q2.parentNode;
          }
          q2 = y2;
        }
        c2 = -1 === h || -1 === k2 ? null : { start: h, end: k2 };
      } else c2 = null;
    }
    c2 = c2 || { start: 0, end: 0 };
  } else c2 = null;
  Df = { focusedElem: a2, selectionRange: c2 };
  dd$1 = false;
  for (V$2 = b; null !== V$2; ) if (b = V$2, a2 = b.child, 0 !== (b.subtreeFlags & 1028) && null !== a2) a2.return = b, V$2 = a2;
  else for (; null !== V$2; ) {
    b = V$2;
    try {
      var n2 = b.alternate;
      if (0 !== (b.flags & 1024)) switch (b.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if (null !== n2) {
            var t2 = n2.memoizedProps, J2 = n2.memoizedState, x2 = b.stateNode, w2 = x2.getSnapshotBeforeUpdate(b.elementType === b.type ? t2 : Ci(b.type, t2), J2);
            x2.__reactInternalSnapshotBeforeUpdate = w2;
          }
          break;
        case 3:
          var u2 = b.stateNode.containerInfo;
          1 === u2.nodeType ? u2.textContent = "" : 9 === u2.nodeType && u2.documentElement && u2.removeChild(u2.documentElement);
          break;
        case 5:
        case 6:
        case 4:
        case 17:
          break;
        default:
          throw Error(p$2(163));
      }
    } catch (F2) {
      W$2(b, b.return, F2);
    }
    a2 = b.sibling;
    if (null !== a2) {
      a2.return = b.return;
      V$2 = a2;
      break;
    }
    V$2 = b.return;
  }
  n2 = Nj;
  Nj = false;
  return n2;
}
function Pj(a2, b, c2) {
  var d = b.updateQueue;
  d = null !== d ? d.lastEffect : null;
  if (null !== d) {
    var e2 = d = d.next;
    do {
      if ((e2.tag & a2) === a2) {
        var f2 = e2.destroy;
        e2.destroy = void 0;
        void 0 !== f2 && Mj(b, c2, f2);
      }
      e2 = e2.next;
    } while (e2 !== d);
  }
}
function Qj(a2, b) {
  b = b.updateQueue;
  b = null !== b ? b.lastEffect : null;
  if (null !== b) {
    var c2 = b = b.next;
    do {
      if ((c2.tag & a2) === a2) {
        var d = c2.create;
        c2.destroy = d();
      }
      c2 = c2.next;
    } while (c2 !== b);
  }
}
function Rj(a2) {
  var b = a2.ref;
  if (null !== b) {
    var c2 = a2.stateNode;
    switch (a2.tag) {
      case 5:
        a2 = c2;
        break;
      default:
        a2 = c2;
    }
    "function" === typeof b ? b(a2) : b.current = a2;
  }
}
function Sj(a2) {
  var b = a2.alternate;
  null !== b && (a2.alternate = null, Sj(b));
  a2.child = null;
  a2.deletions = null;
  a2.sibling = null;
  5 === a2.tag && (b = a2.stateNode, null !== b && (delete b[Of], delete b[Pf], delete b[of], delete b[Qf], delete b[Rf]));
  a2.stateNode = null;
  a2.return = null;
  a2.dependencies = null;
  a2.memoizedProps = null;
  a2.memoizedState = null;
  a2.pendingProps = null;
  a2.stateNode = null;
  a2.updateQueue = null;
}
function Tj(a2) {
  return 5 === a2.tag || 3 === a2.tag || 4 === a2.tag;
}
function Uj(a2) {
  a: for (; ; ) {
    for (; null === a2.sibling; ) {
      if (null === a2.return || Tj(a2.return)) return null;
      a2 = a2.return;
    }
    a2.sibling.return = a2.return;
    for (a2 = a2.sibling; 5 !== a2.tag && 6 !== a2.tag && 18 !== a2.tag; ) {
      if (a2.flags & 2) continue a;
      if (null === a2.child || 4 === a2.tag) continue a;
      else a2.child.return = a2, a2 = a2.child;
    }
    if (!(a2.flags & 2)) return a2.stateNode;
  }
}
function Vj(a2, b, c2) {
  var d = a2.tag;
  if (5 === d || 6 === d) a2 = a2.stateNode, b ? 8 === c2.nodeType ? c2.parentNode.insertBefore(a2, b) : c2.insertBefore(a2, b) : (8 === c2.nodeType ? (b = c2.parentNode, b.insertBefore(a2, c2)) : (b = c2, b.appendChild(a2)), c2 = c2._reactRootContainer, null !== c2 && void 0 !== c2 || null !== b.onclick || (b.onclick = Bf));
  else if (4 !== d && (a2 = a2.child, null !== a2)) for (Vj(a2, b, c2), a2 = a2.sibling; null !== a2; ) Vj(a2, b, c2), a2 = a2.sibling;
}
function Wj(a2, b, c2) {
  var d = a2.tag;
  if (5 === d || 6 === d) a2 = a2.stateNode, b ? c2.insertBefore(a2, b) : c2.appendChild(a2);
  else if (4 !== d && (a2 = a2.child, null !== a2)) for (Wj(a2, b, c2), a2 = a2.sibling; null !== a2; ) Wj(a2, b, c2), a2 = a2.sibling;
}
var X$2 = null, Xj = false;
function Yj(a2, b, c2) {
  for (c2 = c2.child; null !== c2; ) Zj(a2, b, c2), c2 = c2.sibling;
}
function Zj(a2, b, c2) {
  if (lc$1 && "function" === typeof lc$1.onCommitFiberUnmount) try {
    lc$1.onCommitFiberUnmount(kc$1, c2);
  } catch (h) {
  }
  switch (c2.tag) {
    case 5:
      U$2 || Lj(c2, b);
    case 6:
      var d = X$2, e2 = Xj;
      X$2 = null;
      Yj(a2, b, c2);
      X$2 = d;
      Xj = e2;
      null !== X$2 && (Xj ? (a2 = X$2, c2 = c2.stateNode, 8 === a2.nodeType ? a2.parentNode.removeChild(c2) : a2.removeChild(c2)) : X$2.removeChild(c2.stateNode));
      break;
    case 18:
      null !== X$2 && (Xj ? (a2 = X$2, c2 = c2.stateNode, 8 === a2.nodeType ? Kf(a2.parentNode, c2) : 1 === a2.nodeType && Kf(a2, c2), bd$1(a2)) : Kf(X$2, c2.stateNode));
      break;
    case 4:
      d = X$2;
      e2 = Xj;
      X$2 = c2.stateNode.containerInfo;
      Xj = true;
      Yj(a2, b, c2);
      X$2 = d;
      Xj = e2;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!U$2 && (d = c2.updateQueue, null !== d && (d = d.lastEffect, null !== d))) {
        e2 = d = d.next;
        do {
          var f2 = e2, g = f2.destroy;
          f2 = f2.tag;
          void 0 !== g && (0 !== (f2 & 2) ? Mj(c2, b, g) : 0 !== (f2 & 4) && Mj(c2, b, g));
          e2 = e2.next;
        } while (e2 !== d);
      }
      Yj(a2, b, c2);
      break;
    case 1:
      if (!U$2 && (Lj(c2, b), d = c2.stateNode, "function" === typeof d.componentWillUnmount)) try {
        d.props = c2.memoizedProps, d.state = c2.memoizedState, d.componentWillUnmount();
      } catch (h) {
        W$2(c2, b, h);
      }
      Yj(a2, b, c2);
      break;
    case 21:
      Yj(a2, b, c2);
      break;
    case 22:
      c2.mode & 1 ? (U$2 = (d = U$2) || null !== c2.memoizedState, Yj(a2, b, c2), U$2 = d) : Yj(a2, b, c2);
      break;
    default:
      Yj(a2, b, c2);
  }
}
function ak(a2) {
  var b = a2.updateQueue;
  if (null !== b) {
    a2.updateQueue = null;
    var c2 = a2.stateNode;
    null === c2 && (c2 = a2.stateNode = new Kj());
    b.forEach(function(b2) {
      var d = bk.bind(null, a2, b2);
      c2.has(b2) || (c2.add(b2), b2.then(d, d));
    });
  }
}
function ck(a2, b) {
  var c2 = b.deletions;
  if (null !== c2) for (var d = 0; d < c2.length; d++) {
    var e2 = c2[d];
    try {
      var f2 = a2, g = b, h = g;
      a: for (; null !== h; ) {
        switch (h.tag) {
          case 5:
            X$2 = h.stateNode;
            Xj = false;
            break a;
          case 3:
            X$2 = h.stateNode.containerInfo;
            Xj = true;
            break a;
          case 4:
            X$2 = h.stateNode.containerInfo;
            Xj = true;
            break a;
        }
        h = h.return;
      }
      if (null === X$2) throw Error(p$2(160));
      Zj(f2, g, e2);
      X$2 = null;
      Xj = false;
      var k2 = e2.alternate;
      null !== k2 && (k2.return = null);
      e2.return = null;
    } catch (l2) {
      W$2(e2, b, l2);
    }
  }
  if (b.subtreeFlags & 12854) for (b = b.child; null !== b; ) dk(b, a2), b = b.sibling;
}
function dk(a2, b) {
  var c2 = a2.alternate, d = a2.flags;
  switch (a2.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      ck(b, a2);
      ek(a2);
      if (d & 4) {
        try {
          Pj(3, a2, a2.return), Qj(3, a2);
        } catch (t2) {
          W$2(a2, a2.return, t2);
        }
        try {
          Pj(5, a2, a2.return);
        } catch (t2) {
          W$2(a2, a2.return, t2);
        }
      }
      break;
    case 1:
      ck(b, a2);
      ek(a2);
      d & 512 && null !== c2 && Lj(c2, c2.return);
      break;
    case 5:
      ck(b, a2);
      ek(a2);
      d & 512 && null !== c2 && Lj(c2, c2.return);
      if (a2.flags & 32) {
        var e2 = a2.stateNode;
        try {
          ob$2(e2, "");
        } catch (t2) {
          W$2(a2, a2.return, t2);
        }
      }
      if (d & 4 && (e2 = a2.stateNode, null != e2)) {
        var f2 = a2.memoizedProps, g = null !== c2 ? c2.memoizedProps : f2, h = a2.type, k2 = a2.updateQueue;
        a2.updateQueue = null;
        if (null !== k2) try {
          "input" === h && "radio" === f2.type && null != f2.name && ab$2(e2, f2);
          vb$2(h, g);
          var l2 = vb$2(h, f2);
          for (g = 0; g < k2.length; g += 2) {
            var m2 = k2[g], q2 = k2[g + 1];
            "style" === m2 ? sb$2(e2, q2) : "dangerouslySetInnerHTML" === m2 ? nb$1(e2, q2) : "children" === m2 ? ob$2(e2, q2) : ta$2(e2, m2, q2, l2);
          }
          switch (h) {
            case "input":
              bb$2(e2, f2);
              break;
            case "textarea":
              ib$2(e2, f2);
              break;
            case "select":
              var r2 = e2._wrapperState.wasMultiple;
              e2._wrapperState.wasMultiple = !!f2.multiple;
              var y2 = f2.value;
              null != y2 ? fb$2(e2, !!f2.multiple, y2, false) : r2 !== !!f2.multiple && (null != f2.defaultValue ? fb$2(
                e2,
                !!f2.multiple,
                f2.defaultValue,
                true
              ) : fb$2(e2, !!f2.multiple, f2.multiple ? [] : "", false));
          }
          e2[Pf] = f2;
        } catch (t2) {
          W$2(a2, a2.return, t2);
        }
      }
      break;
    case 6:
      ck(b, a2);
      ek(a2);
      if (d & 4) {
        if (null === a2.stateNode) throw Error(p$2(162));
        e2 = a2.stateNode;
        f2 = a2.memoizedProps;
        try {
          e2.nodeValue = f2;
        } catch (t2) {
          W$2(a2, a2.return, t2);
        }
      }
      break;
    case 3:
      ck(b, a2);
      ek(a2);
      if (d & 4 && null !== c2 && c2.memoizedState.isDehydrated) try {
        bd$1(b.containerInfo);
      } catch (t2) {
        W$2(a2, a2.return, t2);
      }
      break;
    case 4:
      ck(b, a2);
      ek(a2);
      break;
    case 13:
      ck(b, a2);
      ek(a2);
      e2 = a2.child;
      e2.flags & 8192 && (f2 = null !== e2.memoizedState, e2.stateNode.isHidden = f2, !f2 || null !== e2.alternate && null !== e2.alternate.memoizedState || (fk = B$2()));
      d & 4 && ak(a2);
      break;
    case 22:
      m2 = null !== c2 && null !== c2.memoizedState;
      a2.mode & 1 ? (U$2 = (l2 = U$2) || m2, ck(b, a2), U$2 = l2) : ck(b, a2);
      ek(a2);
      if (d & 8192) {
        l2 = null !== a2.memoizedState;
        if ((a2.stateNode.isHidden = l2) && !m2 && 0 !== (a2.mode & 1)) for (V$2 = a2, m2 = a2.child; null !== m2; ) {
          for (q2 = V$2 = m2; null !== V$2; ) {
            r2 = V$2;
            y2 = r2.child;
            switch (r2.tag) {
              case 0:
              case 11:
              case 14:
              case 15:
                Pj(4, r2, r2.return);
                break;
              case 1:
                Lj(r2, r2.return);
                var n2 = r2.stateNode;
                if ("function" === typeof n2.componentWillUnmount) {
                  d = r2;
                  c2 = r2.return;
                  try {
                    b = d, n2.props = b.memoizedProps, n2.state = b.memoizedState, n2.componentWillUnmount();
                  } catch (t2) {
                    W$2(d, c2, t2);
                  }
                }
                break;
              case 5:
                Lj(r2, r2.return);
                break;
              case 22:
                if (null !== r2.memoizedState) {
                  gk(q2);
                  continue;
                }
            }
            null !== y2 ? (y2.return = r2, V$2 = y2) : gk(q2);
          }
          m2 = m2.sibling;
        }
        a: for (m2 = null, q2 = a2; ; ) {
          if (5 === q2.tag) {
            if (null === m2) {
              m2 = q2;
              try {
                e2 = q2.stateNode, l2 ? (f2 = e2.style, "function" === typeof f2.setProperty ? f2.setProperty("display", "none", "important") : f2.display = "none") : (h = q2.stateNode, k2 = q2.memoizedProps.style, g = void 0 !== k2 && null !== k2 && k2.hasOwnProperty("display") ? k2.display : null, h.style.display = rb$2("display", g));
              } catch (t2) {
                W$2(a2, a2.return, t2);
              }
            }
          } else if (6 === q2.tag) {
            if (null === m2) try {
              q2.stateNode.nodeValue = l2 ? "" : q2.memoizedProps;
            } catch (t2) {
              W$2(a2, a2.return, t2);
            }
          } else if ((22 !== q2.tag && 23 !== q2.tag || null === q2.memoizedState || q2 === a2) && null !== q2.child) {
            q2.child.return = q2;
            q2 = q2.child;
            continue;
          }
          if (q2 === a2) break a;
          for (; null === q2.sibling; ) {
            if (null === q2.return || q2.return === a2) break a;
            m2 === q2 && (m2 = null);
            q2 = q2.return;
          }
          m2 === q2 && (m2 = null);
          q2.sibling.return = q2.return;
          q2 = q2.sibling;
        }
      }
      break;
    case 19:
      ck(b, a2);
      ek(a2);
      d & 4 && ak(a2);
      break;
    case 21:
      break;
    default:
      ck(
        b,
        a2
      ), ek(a2);
  }
}
function ek(a2) {
  var b = a2.flags;
  if (b & 2) {
    try {
      a: {
        for (var c2 = a2.return; null !== c2; ) {
          if (Tj(c2)) {
            var d = c2;
            break a;
          }
          c2 = c2.return;
        }
        throw Error(p$2(160));
      }
      switch (d.tag) {
        case 5:
          var e2 = d.stateNode;
          d.flags & 32 && (ob$2(e2, ""), d.flags &= -33);
          var f2 = Uj(a2);
          Wj(a2, f2, e2);
          break;
        case 3:
        case 4:
          var g = d.stateNode.containerInfo, h = Uj(a2);
          Vj(a2, h, g);
          break;
        default:
          throw Error(p$2(161));
      }
    } catch (k2) {
      W$2(a2, a2.return, k2);
    }
    a2.flags &= -3;
  }
  b & 4096 && (a2.flags &= -4097);
}
function hk(a2, b, c2) {
  V$2 = a2;
  ik(a2);
}
function ik(a2, b, c2) {
  for (var d = 0 !== (a2.mode & 1); null !== V$2; ) {
    var e2 = V$2, f2 = e2.child;
    if (22 === e2.tag && d) {
      var g = null !== e2.memoizedState || Jj;
      if (!g) {
        var h = e2.alternate, k2 = null !== h && null !== h.memoizedState || U$2;
        h = Jj;
        var l2 = U$2;
        Jj = g;
        if ((U$2 = k2) && !l2) for (V$2 = e2; null !== V$2; ) g = V$2, k2 = g.child, 22 === g.tag && null !== g.memoizedState ? jk(e2) : null !== k2 ? (k2.return = g, V$2 = k2) : jk(e2);
        for (; null !== f2; ) V$2 = f2, ik(f2), f2 = f2.sibling;
        V$2 = e2;
        Jj = h;
        U$2 = l2;
      }
      kk(a2);
    } else 0 !== (e2.subtreeFlags & 8772) && null !== f2 ? (f2.return = e2, V$2 = f2) : kk(a2);
  }
}
function kk(a2) {
  for (; null !== V$2; ) {
    var b = V$2;
    if (0 !== (b.flags & 8772)) {
      var c2 = b.alternate;
      try {
        if (0 !== (b.flags & 8772)) switch (b.tag) {
          case 0:
          case 11:
          case 15:
            U$2 || Qj(5, b);
            break;
          case 1:
            var d = b.stateNode;
            if (b.flags & 4 && !U$2) if (null === c2) d.componentDidMount();
            else {
              var e2 = b.elementType === b.type ? c2.memoizedProps : Ci(b.type, c2.memoizedProps);
              d.componentDidUpdate(e2, c2.memoizedState, d.__reactInternalSnapshotBeforeUpdate);
            }
            var f2 = b.updateQueue;
            null !== f2 && sh(b, f2, d);
            break;
          case 3:
            var g = b.updateQueue;
            if (null !== g) {
              c2 = null;
              if (null !== b.child) switch (b.child.tag) {
                case 5:
                  c2 = b.child.stateNode;
                  break;
                case 1:
                  c2 = b.child.stateNode;
              }
              sh(b, g, c2);
            }
            break;
          case 5:
            var h = b.stateNode;
            if (null === c2 && b.flags & 4) {
              c2 = h;
              var k2 = b.memoizedProps;
              switch (b.type) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  k2.autoFocus && c2.focus();
                  break;
                case "img":
                  k2.src && (c2.src = k2.src);
              }
            }
            break;
          case 6:
            break;
          case 4:
            break;
          case 12:
            break;
          case 13:
            if (null === b.memoizedState) {
              var l2 = b.alternate;
              if (null !== l2) {
                var m2 = l2.memoizedState;
                if (null !== m2) {
                  var q2 = m2.dehydrated;
                  null !== q2 && bd$1(q2);
                }
              }
            }
            break;
          case 19:
          case 17:
          case 21:
          case 22:
          case 23:
          case 25:
            break;
          default:
            throw Error(p$2(163));
        }
        U$2 || b.flags & 512 && Rj(b);
      } catch (r2) {
        W$2(b, b.return, r2);
      }
    }
    if (b === a2) {
      V$2 = null;
      break;
    }
    c2 = b.sibling;
    if (null !== c2) {
      c2.return = b.return;
      V$2 = c2;
      break;
    }
    V$2 = b.return;
  }
}
function gk(a2) {
  for (; null !== V$2; ) {
    var b = V$2;
    if (b === a2) {
      V$2 = null;
      break;
    }
    var c2 = b.sibling;
    if (null !== c2) {
      c2.return = b.return;
      V$2 = c2;
      break;
    }
    V$2 = b.return;
  }
}
function jk(a2) {
  for (; null !== V$2; ) {
    var b = V$2;
    try {
      switch (b.tag) {
        case 0:
        case 11:
        case 15:
          var c2 = b.return;
          try {
            Qj(4, b);
          } catch (k2) {
            W$2(b, c2, k2);
          }
          break;
        case 1:
          var d = b.stateNode;
          if ("function" === typeof d.componentDidMount) {
            var e2 = b.return;
            try {
              d.componentDidMount();
            } catch (k2) {
              W$2(b, e2, k2);
            }
          }
          var f2 = b.return;
          try {
            Rj(b);
          } catch (k2) {
            W$2(b, f2, k2);
          }
          break;
        case 5:
          var g = b.return;
          try {
            Rj(b);
          } catch (k2) {
            W$2(b, g, k2);
          }
      }
    } catch (k2) {
      W$2(b, b.return, k2);
    }
    if (b === a2) {
      V$2 = null;
      break;
    }
    var h = b.sibling;
    if (null !== h) {
      h.return = b.return;
      V$2 = h;
      break;
    }
    V$2 = b.return;
  }
}
var lk = Math.ceil, mk = ua$2.ReactCurrentDispatcher, nk = ua$2.ReactCurrentOwner, ok = ua$2.ReactCurrentBatchConfig, K$2 = 0, Q$2 = null, Y$2 = null, Z$2 = 0, fj = 0, ej = Uf(0), T$2 = 0, pk = null, rh = 0, qk = 0, rk = 0, sk = null, tk = null, fk = 0, Gj = Infinity, uk = null, Oi = false, Pi = null, Ri = null, vk = false, wk = null, xk = 0, yk = 0, zk = null, Ak = -1, Bk = 0;
function R$2() {
  return 0 !== (K$2 & 6) ? B$2() : -1 !== Ak ? Ak : Ak = B$2();
}
function yi(a2) {
  if (0 === (a2.mode & 1)) return 1;
  if (0 !== (K$2 & 2) && 0 !== Z$2) return Z$2 & -Z$2;
  if (null !== Kg.transition) return 0 === Bk && (Bk = yc$1()), Bk;
  a2 = C$1;
  if (0 !== a2) return a2;
  a2 = window.event;
  a2 = void 0 === a2 ? 16 : jd$1(a2.type);
  return a2;
}
function gi(a2, b, c2, d) {
  if (50 < yk) throw yk = 0, zk = null, Error(p$2(185));
  Ac$1(a2, c2, d);
  if (0 === (K$2 & 2) || a2 !== Q$2) a2 === Q$2 && (0 === (K$2 & 2) && (qk |= c2), 4 === T$2 && Ck(a2, Z$2)), Dk(a2, d), 1 === c2 && 0 === K$2 && 0 === (b.mode & 1) && (Gj = B$2() + 500, fg && jg());
}
function Dk(a2, b) {
  var c2 = a2.callbackNode;
  wc$1(a2, b);
  var d = uc$1(a2, a2 === Q$2 ? Z$2 : 0);
  if (0 === d) null !== c2 && bc$1(c2), a2.callbackNode = null, a2.callbackPriority = 0;
  else if (b = d & -d, a2.callbackPriority !== b) {
    null != c2 && bc$1(c2);
    if (1 === b) 0 === a2.tag ? ig(Ek.bind(null, a2)) : hg(Ek.bind(null, a2)), Jf(function() {
      0 === (K$2 & 6) && jg();
    }), c2 = null;
    else {
      switch (Dc$1(d)) {
        case 1:
          c2 = fc$1;
          break;
        case 4:
          c2 = gc$1;
          break;
        case 16:
          c2 = hc$1;
          break;
        case 536870912:
          c2 = jc$1;
          break;
        default:
          c2 = hc$1;
      }
      c2 = Fk(c2, Gk.bind(null, a2));
    }
    a2.callbackPriority = b;
    a2.callbackNode = c2;
  }
}
function Gk(a2, b) {
  Ak = -1;
  Bk = 0;
  if (0 !== (K$2 & 6)) throw Error(p$2(327));
  var c2 = a2.callbackNode;
  if (Hk() && a2.callbackNode !== c2) return null;
  var d = uc$1(a2, a2 === Q$2 ? Z$2 : 0);
  if (0 === d) return null;
  if (0 !== (d & 30) || 0 !== (d & a2.expiredLanes) || b) b = Ik(a2, d);
  else {
    b = d;
    var e2 = K$2;
    K$2 |= 2;
    var f2 = Jk();
    if (Q$2 !== a2 || Z$2 !== b) uk = null, Gj = B$2() + 500, Kk(a2, b);
    do
      try {
        Lk();
        break;
      } catch (h) {
        Mk(a2, h);
      }
    while (1);
    $g();
    mk.current = f2;
    K$2 = e2;
    null !== Y$2 ? b = 0 : (Q$2 = null, Z$2 = 0, b = T$2);
  }
  if (0 !== b) {
    2 === b && (e2 = xc$1(a2), 0 !== e2 && (d = e2, b = Nk(a2, e2)));
    if (1 === b) throw c2 = pk, Kk(a2, 0), Ck(a2, d), Dk(a2, B$2()), c2;
    if (6 === b) Ck(a2, d);
    else {
      e2 = a2.current.alternate;
      if (0 === (d & 30) && !Ok(e2) && (b = Ik(a2, d), 2 === b && (f2 = xc$1(a2), 0 !== f2 && (d = f2, b = Nk(a2, f2))), 1 === b)) throw c2 = pk, Kk(a2, 0), Ck(a2, d), Dk(a2, B$2()), c2;
      a2.finishedWork = e2;
      a2.finishedLanes = d;
      switch (b) {
        case 0:
        case 1:
          throw Error(p$2(345));
        case 2:
          Pk(a2, tk, uk);
          break;
        case 3:
          Ck(a2, d);
          if ((d & 130023424) === d && (b = fk + 500 - B$2(), 10 < b)) {
            if (0 !== uc$1(a2, 0)) break;
            e2 = a2.suspendedLanes;
            if ((e2 & d) !== d) {
              R$2();
              a2.pingedLanes |= a2.suspendedLanes & e2;
              break;
            }
            a2.timeoutHandle = Ff(Pk.bind(null, a2, tk, uk), b);
            break;
          }
          Pk(a2, tk, uk);
          break;
        case 4:
          Ck(a2, d);
          if ((d & 4194240) === d) break;
          b = a2.eventTimes;
          for (e2 = -1; 0 < d; ) {
            var g = 31 - oc$1(d);
            f2 = 1 << g;
            g = b[g];
            g > e2 && (e2 = g);
            d &= ~f2;
          }
          d = e2;
          d = B$2() - d;
          d = (120 > d ? 120 : 480 > d ? 480 : 1080 > d ? 1080 : 1920 > d ? 1920 : 3e3 > d ? 3e3 : 4320 > d ? 4320 : 1960 * lk(d / 1960)) - d;
          if (10 < d) {
            a2.timeoutHandle = Ff(Pk.bind(null, a2, tk, uk), d);
            break;
          }
          Pk(a2, tk, uk);
          break;
        case 5:
          Pk(a2, tk, uk);
          break;
        default:
          throw Error(p$2(329));
      }
    }
  }
  Dk(a2, B$2());
  return a2.callbackNode === c2 ? Gk.bind(null, a2) : null;
}
function Nk(a2, b) {
  var c2 = sk;
  a2.current.memoizedState.isDehydrated && (Kk(a2, b).flags |= 256);
  a2 = Ik(a2, b);
  2 !== a2 && (b = tk, tk = c2, null !== b && Fj(b));
  return a2;
}
function Fj(a2) {
  null === tk ? tk = a2 : tk.push.apply(tk, a2);
}
function Ok(a2) {
  for (var b = a2; ; ) {
    if (b.flags & 16384) {
      var c2 = b.updateQueue;
      if (null !== c2 && (c2 = c2.stores, null !== c2)) for (var d = 0; d < c2.length; d++) {
        var e2 = c2[d], f2 = e2.getSnapshot;
        e2 = e2.value;
        try {
          if (!He(f2(), e2)) return false;
        } catch (g) {
          return false;
        }
      }
    }
    c2 = b.child;
    if (b.subtreeFlags & 16384 && null !== c2) c2.return = b, b = c2;
    else {
      if (b === a2) break;
      for (; null === b.sibling; ) {
        if (null === b.return || b.return === a2) return true;
        b = b.return;
      }
      b.sibling.return = b.return;
      b = b.sibling;
    }
  }
  return true;
}
function Ck(a2, b) {
  b &= ~rk;
  b &= ~qk;
  a2.suspendedLanes |= b;
  a2.pingedLanes &= ~b;
  for (a2 = a2.expirationTimes; 0 < b; ) {
    var c2 = 31 - oc$1(b), d = 1 << c2;
    a2[c2] = -1;
    b &= ~d;
  }
}
function Ek(a2) {
  if (0 !== (K$2 & 6)) throw Error(p$2(327));
  Hk();
  var b = uc$1(a2, 0);
  if (0 === (b & 1)) return Dk(a2, B$2()), null;
  var c2 = Ik(a2, b);
  if (0 !== a2.tag && 2 === c2) {
    var d = xc$1(a2);
    0 !== d && (b = d, c2 = Nk(a2, d));
  }
  if (1 === c2) throw c2 = pk, Kk(a2, 0), Ck(a2, b), Dk(a2, B$2()), c2;
  if (6 === c2) throw Error(p$2(345));
  a2.finishedWork = a2.current.alternate;
  a2.finishedLanes = b;
  Pk(a2, tk, uk);
  Dk(a2, B$2());
  return null;
}
function Qk(a2, b) {
  var c2 = K$2;
  K$2 |= 1;
  try {
    return a2(b);
  } finally {
    K$2 = c2, 0 === K$2 && (Gj = B$2() + 500, fg && jg());
  }
}
function Rk(a2) {
  null !== wk && 0 === wk.tag && 0 === (K$2 & 6) && Hk();
  var b = K$2;
  K$2 |= 1;
  var c2 = ok.transition, d = C$1;
  try {
    if (ok.transition = null, C$1 = 1, a2) return a2();
  } finally {
    C$1 = d, ok.transition = c2, K$2 = b, 0 === (K$2 & 6) && jg();
  }
}
function Hj() {
  fj = ej.current;
  E$2(ej);
}
function Kk(a2, b) {
  a2.finishedWork = null;
  a2.finishedLanes = 0;
  var c2 = a2.timeoutHandle;
  -1 !== c2 && (a2.timeoutHandle = -1, Gf(c2));
  if (null !== Y$2) for (c2 = Y$2.return; null !== c2; ) {
    var d = c2;
    wg(d);
    switch (d.tag) {
      case 1:
        d = d.type.childContextTypes;
        null !== d && void 0 !== d && $f();
        break;
      case 3:
        zh();
        E$2(Wf);
        E$2(H$2);
        Eh();
        break;
      case 5:
        Bh(d);
        break;
      case 4:
        zh();
        break;
      case 13:
        E$2(L$2);
        break;
      case 19:
        E$2(L$2);
        break;
      case 10:
        ah(d.type._context);
        break;
      case 22:
      case 23:
        Hj();
    }
    c2 = c2.return;
  }
  Q$2 = a2;
  Y$2 = a2 = Pg(a2.current, null);
  Z$2 = fj = b;
  T$2 = 0;
  pk = null;
  rk = qk = rh = 0;
  tk = sk = null;
  if (null !== fh) {
    for (b = 0; b < fh.length; b++) if (c2 = fh[b], d = c2.interleaved, null !== d) {
      c2.interleaved = null;
      var e2 = d.next, f2 = c2.pending;
      if (null !== f2) {
        var g = f2.next;
        f2.next = e2;
        d.next = g;
      }
      c2.pending = d;
    }
    fh = null;
  }
  return a2;
}
function Mk(a2, b) {
  do {
    var c2 = Y$2;
    try {
      $g();
      Fh.current = Rh;
      if (Ih) {
        for (var d = M$2.memoizedState; null !== d; ) {
          var e2 = d.queue;
          null !== e2 && (e2.pending = null);
          d = d.next;
        }
        Ih = false;
      }
      Hh = 0;
      O$2 = N$2 = M$2 = null;
      Jh = false;
      Kh = 0;
      nk.current = null;
      if (null === c2 || null === c2.return) {
        T$2 = 1;
        pk = b;
        Y$2 = null;
        break;
      }
      a: {
        var f2 = a2, g = c2.return, h = c2, k2 = b;
        b = Z$2;
        h.flags |= 32768;
        if (null !== k2 && "object" === typeof k2 && "function" === typeof k2.then) {
          var l2 = k2, m2 = h, q2 = m2.tag;
          if (0 === (m2.mode & 1) && (0 === q2 || 11 === q2 || 15 === q2)) {
            var r2 = m2.alternate;
            r2 ? (m2.updateQueue = r2.updateQueue, m2.memoizedState = r2.memoizedState, m2.lanes = r2.lanes) : (m2.updateQueue = null, m2.memoizedState = null);
          }
          var y2 = Ui(g);
          if (null !== y2) {
            y2.flags &= -257;
            Vi(y2, g, h, f2, b);
            y2.mode & 1 && Si(f2, l2, b);
            b = y2;
            k2 = l2;
            var n2 = b.updateQueue;
            if (null === n2) {
              var t2 = /* @__PURE__ */ new Set();
              t2.add(k2);
              b.updateQueue = t2;
            } else n2.add(k2);
            break a;
          } else {
            if (0 === (b & 1)) {
              Si(f2, l2, b);
              tj();
              break a;
            }
            k2 = Error(p$2(426));
          }
        } else if (I$2 && h.mode & 1) {
          var J2 = Ui(g);
          if (null !== J2) {
            0 === (J2.flags & 65536) && (J2.flags |= 256);
            Vi(J2, g, h, f2, b);
            Jg(Ji(k2, h));
            break a;
          }
        }
        f2 = k2 = Ji(k2, h);
        4 !== T$2 && (T$2 = 2);
        null === sk ? sk = [f2] : sk.push(f2);
        f2 = g;
        do {
          switch (f2.tag) {
            case 3:
              f2.flags |= 65536;
              b &= -b;
              f2.lanes |= b;
              var x2 = Ni(f2, k2, b);
              ph(f2, x2);
              break a;
            case 1:
              h = k2;
              var w2 = f2.type, u2 = f2.stateNode;
              if (0 === (f2.flags & 128) && ("function" === typeof w2.getDerivedStateFromError || null !== u2 && "function" === typeof u2.componentDidCatch && (null === Ri || !Ri.has(u2)))) {
                f2.flags |= 65536;
                b &= -b;
                f2.lanes |= b;
                var F2 = Qi(f2, h, b);
                ph(f2, F2);
                break a;
              }
          }
          f2 = f2.return;
        } while (null !== f2);
      }
      Sk(c2);
    } catch (na2) {
      b = na2;
      Y$2 === c2 && null !== c2 && (Y$2 = c2 = c2.return);
      continue;
    }
    break;
  } while (1);
}
function Jk() {
  var a2 = mk.current;
  mk.current = Rh;
  return null === a2 ? Rh : a2;
}
function tj() {
  if (0 === T$2 || 3 === T$2 || 2 === T$2) T$2 = 4;
  null === Q$2 || 0 === (rh & 268435455) && 0 === (qk & 268435455) || Ck(Q$2, Z$2);
}
function Ik(a2, b) {
  var c2 = K$2;
  K$2 |= 2;
  var d = Jk();
  if (Q$2 !== a2 || Z$2 !== b) uk = null, Kk(a2, b);
  do
    try {
      Tk();
      break;
    } catch (e2) {
      Mk(a2, e2);
    }
  while (1);
  $g();
  K$2 = c2;
  mk.current = d;
  if (null !== Y$2) throw Error(p$2(261));
  Q$2 = null;
  Z$2 = 0;
  return T$2;
}
function Tk() {
  for (; null !== Y$2; ) Uk(Y$2);
}
function Lk() {
  for (; null !== Y$2 && !cc$1(); ) Uk(Y$2);
}
function Uk(a2) {
  var b = Vk(a2.alternate, a2, fj);
  a2.memoizedProps = a2.pendingProps;
  null === b ? Sk(a2) : Y$2 = b;
  nk.current = null;
}
function Sk(a2) {
  var b = a2;
  do {
    var c2 = b.alternate;
    a2 = b.return;
    if (0 === (b.flags & 32768)) {
      if (c2 = Ej(c2, b, fj), null !== c2) {
        Y$2 = c2;
        return;
      }
    } else {
      c2 = Ij(c2, b);
      if (null !== c2) {
        c2.flags &= 32767;
        Y$2 = c2;
        return;
      }
      if (null !== a2) a2.flags |= 32768, a2.subtreeFlags = 0, a2.deletions = null;
      else {
        T$2 = 6;
        Y$2 = null;
        return;
      }
    }
    b = b.sibling;
    if (null !== b) {
      Y$2 = b;
      return;
    }
    Y$2 = b = a2;
  } while (null !== b);
  0 === T$2 && (T$2 = 5);
}
function Pk(a2, b, c2) {
  var d = C$1, e2 = ok.transition;
  try {
    ok.transition = null, C$1 = 1, Wk(a2, b, c2, d);
  } finally {
    ok.transition = e2, C$1 = d;
  }
  return null;
}
function Wk(a2, b, c2, d) {
  do
    Hk();
  while (null !== wk);
  if (0 !== (K$2 & 6)) throw Error(p$2(327));
  c2 = a2.finishedWork;
  var e2 = a2.finishedLanes;
  if (null === c2) return null;
  a2.finishedWork = null;
  a2.finishedLanes = 0;
  if (c2 === a2.current) throw Error(p$2(177));
  a2.callbackNode = null;
  a2.callbackPriority = 0;
  var f2 = c2.lanes | c2.childLanes;
  Bc$1(a2, f2);
  a2 === Q$2 && (Y$2 = Q$2 = null, Z$2 = 0);
  0 === (c2.subtreeFlags & 2064) && 0 === (c2.flags & 2064) || vk || (vk = true, Fk(hc$1, function() {
    Hk();
    return null;
  }));
  f2 = 0 !== (c2.flags & 15990);
  if (0 !== (c2.subtreeFlags & 15990) || f2) {
    f2 = ok.transition;
    ok.transition = null;
    var g = C$1;
    C$1 = 1;
    var h = K$2;
    K$2 |= 4;
    nk.current = null;
    Oj(a2, c2);
    dk(c2, a2);
    Oe(Df);
    dd$1 = !!Cf;
    Df = Cf = null;
    a2.current = c2;
    hk(c2);
    dc$1();
    K$2 = h;
    C$1 = g;
    ok.transition = f2;
  } else a2.current = c2;
  vk && (vk = false, wk = a2, xk = e2);
  f2 = a2.pendingLanes;
  0 === f2 && (Ri = null);
  mc$1(c2.stateNode);
  Dk(a2, B$2());
  if (null !== b) for (d = a2.onRecoverableError, c2 = 0; c2 < b.length; c2++) e2 = b[c2], d(e2.value, { componentStack: e2.stack, digest: e2.digest });
  if (Oi) throw Oi = false, a2 = Pi, Pi = null, a2;
  0 !== (xk & 1) && 0 !== a2.tag && Hk();
  f2 = a2.pendingLanes;
  0 !== (f2 & 1) ? a2 === zk ? yk++ : (yk = 0, zk = a2) : yk = 0;
  jg();
  return null;
}
function Hk() {
  if (null !== wk) {
    var a2 = Dc$1(xk), b = ok.transition, c2 = C$1;
    try {
      ok.transition = null;
      C$1 = 16 > a2 ? 16 : a2;
      if (null === wk) var d = false;
      else {
        a2 = wk;
        wk = null;
        xk = 0;
        if (0 !== (K$2 & 6)) throw Error(p$2(331));
        var e2 = K$2;
        K$2 |= 4;
        for (V$2 = a2.current; null !== V$2; ) {
          var f2 = V$2, g = f2.child;
          if (0 !== (V$2.flags & 16)) {
            var h = f2.deletions;
            if (null !== h) {
              for (var k2 = 0; k2 < h.length; k2++) {
                var l2 = h[k2];
                for (V$2 = l2; null !== V$2; ) {
                  var m2 = V$2;
                  switch (m2.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Pj(8, m2, f2);
                  }
                  var q2 = m2.child;
                  if (null !== q2) q2.return = m2, V$2 = q2;
                  else for (; null !== V$2; ) {
                    m2 = V$2;
                    var r2 = m2.sibling, y2 = m2.return;
                    Sj(m2);
                    if (m2 === l2) {
                      V$2 = null;
                      break;
                    }
                    if (null !== r2) {
                      r2.return = y2;
                      V$2 = r2;
                      break;
                    }
                    V$2 = y2;
                  }
                }
              }
              var n2 = f2.alternate;
              if (null !== n2) {
                var t2 = n2.child;
                if (null !== t2) {
                  n2.child = null;
                  do {
                    var J2 = t2.sibling;
                    t2.sibling = null;
                    t2 = J2;
                  } while (null !== t2);
                }
              }
              V$2 = f2;
            }
          }
          if (0 !== (f2.subtreeFlags & 2064) && null !== g) g.return = f2, V$2 = g;
          else b: for (; null !== V$2; ) {
            f2 = V$2;
            if (0 !== (f2.flags & 2048)) switch (f2.tag) {
              case 0:
              case 11:
              case 15:
                Pj(9, f2, f2.return);
            }
            var x2 = f2.sibling;
            if (null !== x2) {
              x2.return = f2.return;
              V$2 = x2;
              break b;
            }
            V$2 = f2.return;
          }
        }
        var w2 = a2.current;
        for (V$2 = w2; null !== V$2; ) {
          g = V$2;
          var u2 = g.child;
          if (0 !== (g.subtreeFlags & 2064) && null !== u2) u2.return = g, V$2 = u2;
          else b: for (g = w2; null !== V$2; ) {
            h = V$2;
            if (0 !== (h.flags & 2048)) try {
              switch (h.tag) {
                case 0:
                case 11:
                case 15:
                  Qj(9, h);
              }
            } catch (na2) {
              W$2(h, h.return, na2);
            }
            if (h === g) {
              V$2 = null;
              break b;
            }
            var F2 = h.sibling;
            if (null !== F2) {
              F2.return = h.return;
              V$2 = F2;
              break b;
            }
            V$2 = h.return;
          }
        }
        K$2 = e2;
        jg();
        if (lc$1 && "function" === typeof lc$1.onPostCommitFiberRoot) try {
          lc$1.onPostCommitFiberRoot(kc$1, a2);
        } catch (na2) {
        }
        d = true;
      }
      return d;
    } finally {
      C$1 = c2, ok.transition = b;
    }
  }
  return false;
}
function Xk(a2, b, c2) {
  b = Ji(c2, b);
  b = Ni(a2, b, 1);
  a2 = nh(a2, b, 1);
  b = R$2();
  null !== a2 && (Ac$1(a2, 1, b), Dk(a2, b));
}
function W$2(a2, b, c2) {
  if (3 === a2.tag) Xk(a2, a2, c2);
  else for (; null !== b; ) {
    if (3 === b.tag) {
      Xk(b, a2, c2);
      break;
    } else if (1 === b.tag) {
      var d = b.stateNode;
      if ("function" === typeof b.type.getDerivedStateFromError || "function" === typeof d.componentDidCatch && (null === Ri || !Ri.has(d))) {
        a2 = Ji(c2, a2);
        a2 = Qi(b, a2, 1);
        b = nh(b, a2, 1);
        a2 = R$2();
        null !== b && (Ac$1(b, 1, a2), Dk(b, a2));
        break;
      }
    }
    b = b.return;
  }
}
function Ti(a2, b, c2) {
  var d = a2.pingCache;
  null !== d && d.delete(b);
  b = R$2();
  a2.pingedLanes |= a2.suspendedLanes & c2;
  Q$2 === a2 && (Z$2 & c2) === c2 && (4 === T$2 || 3 === T$2 && (Z$2 & 130023424) === Z$2 && 500 > B$2() - fk ? Kk(a2, 0) : rk |= c2);
  Dk(a2, b);
}
function Yk(a2, b) {
  0 === b && (0 === (a2.mode & 1) ? b = 1 : (b = sc$1, sc$1 <<= 1, 0 === (sc$1 & 130023424) && (sc$1 = 4194304)));
  var c2 = R$2();
  a2 = ih(a2, b);
  null !== a2 && (Ac$1(a2, b, c2), Dk(a2, c2));
}
function uj(a2) {
  var b = a2.memoizedState, c2 = 0;
  null !== b && (c2 = b.retryLane);
  Yk(a2, c2);
}
function bk(a2, b) {
  var c2 = 0;
  switch (a2.tag) {
    case 13:
      var d = a2.stateNode;
      var e2 = a2.memoizedState;
      null !== e2 && (c2 = e2.retryLane);
      break;
    case 19:
      d = a2.stateNode;
      break;
    default:
      throw Error(p$2(314));
  }
  null !== d && d.delete(b);
  Yk(a2, c2);
}
var Vk;
Vk = function(a2, b, c2) {
  if (null !== a2) if (a2.memoizedProps !== b.pendingProps || Wf.current) dh = true;
  else {
    if (0 === (a2.lanes & c2) && 0 === (b.flags & 128)) return dh = false, yj(a2, b, c2);
    dh = 0 !== (a2.flags & 131072) ? true : false;
  }
  else dh = false, I$2 && 0 !== (b.flags & 1048576) && ug(b, ng, b.index);
  b.lanes = 0;
  switch (b.tag) {
    case 2:
      var d = b.type;
      ij(a2, b);
      a2 = b.pendingProps;
      var e2 = Yf(b, H$2.current);
      ch(b, c2);
      e2 = Nh(null, b, d, a2, e2, c2);
      var f2 = Sh();
      b.flags |= 1;
      "object" === typeof e2 && null !== e2 && "function" === typeof e2.render && void 0 === e2.$$typeof ? (b.tag = 1, b.memoizedState = null, b.updateQueue = null, Zf(d) ? (f2 = true, cg(b)) : f2 = false, b.memoizedState = null !== e2.state && void 0 !== e2.state ? e2.state : null, kh(b), e2.updater = Ei, b.stateNode = e2, e2._reactInternals = b, Ii(b, d, a2, c2), b = jj(null, b, d, true, f2, c2)) : (b.tag = 0, I$2 && f2 && vg(b), Xi(null, b, e2, c2), b = b.child);
      return b;
    case 16:
      d = b.elementType;
      a: {
        ij(a2, b);
        a2 = b.pendingProps;
        e2 = d._init;
        d = e2(d._payload);
        b.type = d;
        e2 = b.tag = Zk(d);
        a2 = Ci(d, a2);
        switch (e2) {
          case 0:
            b = cj(null, b, d, a2, c2);
            break a;
          case 1:
            b = hj(null, b, d, a2, c2);
            break a;
          case 11:
            b = Yi(null, b, d, a2, c2);
            break a;
          case 14:
            b = $i(null, b, d, Ci(d.type, a2), c2);
            break a;
        }
        throw Error(p$2(
          306,
          d,
          ""
        ));
      }
      return b;
    case 0:
      return d = b.type, e2 = b.pendingProps, e2 = b.elementType === d ? e2 : Ci(d, e2), cj(a2, b, d, e2, c2);
    case 1:
      return d = b.type, e2 = b.pendingProps, e2 = b.elementType === d ? e2 : Ci(d, e2), hj(a2, b, d, e2, c2);
    case 3:
      a: {
        kj(b);
        if (null === a2) throw Error(p$2(387));
        d = b.pendingProps;
        f2 = b.memoizedState;
        e2 = f2.element;
        lh(a2, b);
        qh(b, d, null, c2);
        var g = b.memoizedState;
        d = g.element;
        if (f2.isDehydrated) if (f2 = { element: d, isDehydrated: false, cache: g.cache, pendingSuspenseBoundaries: g.pendingSuspenseBoundaries, transitions: g.transitions }, b.updateQueue.baseState = f2, b.memoizedState = f2, b.flags & 256) {
          e2 = Ji(Error(p$2(423)), b);
          b = lj(a2, b, d, c2, e2);
          break a;
        } else if (d !== e2) {
          e2 = Ji(Error(p$2(424)), b);
          b = lj(a2, b, d, c2, e2);
          break a;
        } else for (yg = Lf(b.stateNode.containerInfo.firstChild), xg = b, I$2 = true, zg = null, c2 = Vg(b, null, d, c2), b.child = c2; c2; ) c2.flags = c2.flags & -3 | 4096, c2 = c2.sibling;
        else {
          Ig();
          if (d === e2) {
            b = Zi(a2, b, c2);
            break a;
          }
          Xi(a2, b, d, c2);
        }
        b = b.child;
      }
      return b;
    case 5:
      return Ah(b), null === a2 && Eg(b), d = b.type, e2 = b.pendingProps, f2 = null !== a2 ? a2.memoizedProps : null, g = e2.children, Ef(d, e2) ? g = null : null !== f2 && Ef(d, f2) && (b.flags |= 32), gj(a2, b), Xi(a2, b, g, c2), b.child;
    case 6:
      return null === a2 && Eg(b), null;
    case 13:
      return oj(a2, b, c2);
    case 4:
      return yh(b, b.stateNode.containerInfo), d = b.pendingProps, null === a2 ? b.child = Ug(b, null, d, c2) : Xi(a2, b, d, c2), b.child;
    case 11:
      return d = b.type, e2 = b.pendingProps, e2 = b.elementType === d ? e2 : Ci(d, e2), Yi(a2, b, d, e2, c2);
    case 7:
      return Xi(a2, b, b.pendingProps, c2), b.child;
    case 8:
      return Xi(a2, b, b.pendingProps.children, c2), b.child;
    case 12:
      return Xi(a2, b, b.pendingProps.children, c2), b.child;
    case 10:
      a: {
        d = b.type._context;
        e2 = b.pendingProps;
        f2 = b.memoizedProps;
        g = e2.value;
        G$1(Wg, d._currentValue);
        d._currentValue = g;
        if (null !== f2) if (He(f2.value, g)) {
          if (f2.children === e2.children && !Wf.current) {
            b = Zi(a2, b, c2);
            break a;
          }
        } else for (f2 = b.child, null !== f2 && (f2.return = b); null !== f2; ) {
          var h = f2.dependencies;
          if (null !== h) {
            g = f2.child;
            for (var k2 = h.firstContext; null !== k2; ) {
              if (k2.context === d) {
                if (1 === f2.tag) {
                  k2 = mh(-1, c2 & -c2);
                  k2.tag = 2;
                  var l2 = f2.updateQueue;
                  if (null !== l2) {
                    l2 = l2.shared;
                    var m2 = l2.pending;
                    null === m2 ? k2.next = k2 : (k2.next = m2.next, m2.next = k2);
                    l2.pending = k2;
                  }
                }
                f2.lanes |= c2;
                k2 = f2.alternate;
                null !== k2 && (k2.lanes |= c2);
                bh(
                  f2.return,
                  c2,
                  b
                );
                h.lanes |= c2;
                break;
              }
              k2 = k2.next;
            }
          } else if (10 === f2.tag) g = f2.type === b.type ? null : f2.child;
          else if (18 === f2.tag) {
            g = f2.return;
            if (null === g) throw Error(p$2(341));
            g.lanes |= c2;
            h = g.alternate;
            null !== h && (h.lanes |= c2);
            bh(g, c2, b);
            g = f2.sibling;
          } else g = f2.child;
          if (null !== g) g.return = f2;
          else for (g = f2; null !== g; ) {
            if (g === b) {
              g = null;
              break;
            }
            f2 = g.sibling;
            if (null !== f2) {
              f2.return = g.return;
              g = f2;
              break;
            }
            g = g.return;
          }
          f2 = g;
        }
        Xi(a2, b, e2.children, c2);
        b = b.child;
      }
      return b;
    case 9:
      return e2 = b.type, d = b.pendingProps.children, ch(b, c2), e2 = eh(e2), d = d(e2), b.flags |= 1, Xi(a2, b, d, c2), b.child;
    case 14:
      return d = b.type, e2 = Ci(d, b.pendingProps), e2 = Ci(d.type, e2), $i(a2, b, d, e2, c2);
    case 15:
      return bj(a2, b, b.type, b.pendingProps, c2);
    case 17:
      return d = b.type, e2 = b.pendingProps, e2 = b.elementType === d ? e2 : Ci(d, e2), ij(a2, b), b.tag = 1, Zf(d) ? (a2 = true, cg(b)) : a2 = false, ch(b, c2), Gi(b, d, e2), Ii(b, d, e2, c2), jj(null, b, d, true, a2, c2);
    case 19:
      return xj(a2, b, c2);
    case 22:
      return dj(a2, b, c2);
  }
  throw Error(p$2(156, b.tag));
};
function Fk(a2, b) {
  return ac$1(a2, b);
}
function $k(a2, b, c2, d) {
  this.tag = a2;
  this.key = c2;
  this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null;
  this.index = 0;
  this.ref = null;
  this.pendingProps = b;
  this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null;
  this.mode = d;
  this.subtreeFlags = this.flags = 0;
  this.deletions = null;
  this.childLanes = this.lanes = 0;
  this.alternate = null;
}
function Bg(a2, b, c2, d) {
  return new $k(a2, b, c2, d);
}
function aj(a2) {
  a2 = a2.prototype;
  return !(!a2 || !a2.isReactComponent);
}
function Zk(a2) {
  if ("function" === typeof a2) return aj(a2) ? 1 : 0;
  if (void 0 !== a2 && null !== a2) {
    a2 = a2.$$typeof;
    if (a2 === Da$2) return 11;
    if (a2 === Ga$2) return 14;
  }
  return 2;
}
function Pg(a2, b) {
  var c2 = a2.alternate;
  null === c2 ? (c2 = Bg(a2.tag, b, a2.key, a2.mode), c2.elementType = a2.elementType, c2.type = a2.type, c2.stateNode = a2.stateNode, c2.alternate = a2, a2.alternate = c2) : (c2.pendingProps = b, c2.type = a2.type, c2.flags = 0, c2.subtreeFlags = 0, c2.deletions = null);
  c2.flags = a2.flags & 14680064;
  c2.childLanes = a2.childLanes;
  c2.lanes = a2.lanes;
  c2.child = a2.child;
  c2.memoizedProps = a2.memoizedProps;
  c2.memoizedState = a2.memoizedState;
  c2.updateQueue = a2.updateQueue;
  b = a2.dependencies;
  c2.dependencies = null === b ? null : { lanes: b.lanes, firstContext: b.firstContext };
  c2.sibling = a2.sibling;
  c2.index = a2.index;
  c2.ref = a2.ref;
  return c2;
}
function Rg(a2, b, c2, d, e2, f2) {
  var g = 2;
  d = a2;
  if ("function" === typeof a2) aj(a2) && (g = 1);
  else if ("string" === typeof a2) g = 5;
  else a: switch (a2) {
    case ya$2:
      return Tg(c2.children, e2, f2, b);
    case za$2:
      g = 8;
      e2 |= 8;
      break;
    case Aa$2:
      return a2 = Bg(12, c2, b, e2 | 2), a2.elementType = Aa$2, a2.lanes = f2, a2;
    case Ea$2:
      return a2 = Bg(13, c2, b, e2), a2.elementType = Ea$2, a2.lanes = f2, a2;
    case Fa$2:
      return a2 = Bg(19, c2, b, e2), a2.elementType = Fa$2, a2.lanes = f2, a2;
    case Ia$2:
      return pj(c2, e2, f2, b);
    default:
      if ("object" === typeof a2 && null !== a2) switch (a2.$$typeof) {
        case Ba$2:
          g = 10;
          break a;
        case Ca$2:
          g = 9;
          break a;
        case Da$2:
          g = 11;
          break a;
        case Ga$2:
          g = 14;
          break a;
        case Ha$2:
          g = 16;
          d = null;
          break a;
      }
      throw Error(p$2(130, null == a2 ? a2 : typeof a2, ""));
  }
  b = Bg(g, c2, b, e2);
  b.elementType = a2;
  b.type = d;
  b.lanes = f2;
  return b;
}
function Tg(a2, b, c2, d) {
  a2 = Bg(7, a2, d, b);
  a2.lanes = c2;
  return a2;
}
function pj(a2, b, c2, d) {
  a2 = Bg(22, a2, d, b);
  a2.elementType = Ia$2;
  a2.lanes = c2;
  a2.stateNode = { isHidden: false };
  return a2;
}
function Qg(a2, b, c2) {
  a2 = Bg(6, a2, null, b);
  a2.lanes = c2;
  return a2;
}
function Sg(a2, b, c2) {
  b = Bg(4, null !== a2.children ? a2.children : [], a2.key, b);
  b.lanes = c2;
  b.stateNode = { containerInfo: a2.containerInfo, pendingChildren: null, implementation: a2.implementation };
  return b;
}
function al(a2, b, c2, d, e2) {
  this.tag = b;
  this.containerInfo = a2;
  this.finishedWork = this.pingCache = this.current = this.pendingChildren = null;
  this.timeoutHandle = -1;
  this.callbackNode = this.pendingContext = this.context = null;
  this.callbackPriority = 0;
  this.eventTimes = zc$1(0);
  this.expirationTimes = zc$1(-1);
  this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0;
  this.entanglements = zc$1(0);
  this.identifierPrefix = d;
  this.onRecoverableError = e2;
  this.mutableSourceEagerHydrationData = null;
}
function bl(a2, b, c2, d, e2, f2, g, h, k2) {
  a2 = new al(a2, b, c2, h, k2);
  1 === b ? (b = 1, true === f2 && (b |= 8)) : b = 0;
  f2 = Bg(3, null, null, b);
  a2.current = f2;
  f2.stateNode = a2;
  f2.memoizedState = { element: d, isDehydrated: c2, cache: null, transitions: null, pendingSuspenseBoundaries: null };
  kh(f2);
  return a2;
}
function cl(a2, b, c2) {
  var d = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
  return { $$typeof: wa$2, key: null == d ? null : "" + d, children: a2, containerInfo: b, implementation: c2 };
}
function dl(a2) {
  if (!a2) return Vf;
  a2 = a2._reactInternals;
  a: {
    if (Vb$1(a2) !== a2 || 1 !== a2.tag) throw Error(p$2(170));
    var b = a2;
    do {
      switch (b.tag) {
        case 3:
          b = b.stateNode.context;
          break a;
        case 1:
          if (Zf(b.type)) {
            b = b.stateNode.__reactInternalMemoizedMergedChildContext;
            break a;
          }
      }
      b = b.return;
    } while (null !== b);
    throw Error(p$2(171));
  }
  if (1 === a2.tag) {
    var c2 = a2.type;
    if (Zf(c2)) return bg(a2, c2, b);
  }
  return b;
}
function el(a2, b, c2, d, e2, f2, g, h, k2) {
  a2 = bl(c2, d, true, a2, e2, f2, g, h, k2);
  a2.context = dl(null);
  c2 = a2.current;
  d = R$2();
  e2 = yi(c2);
  f2 = mh(d, e2);
  f2.callback = void 0 !== b && null !== b ? b : null;
  nh(c2, f2, e2);
  a2.current.lanes = e2;
  Ac$1(a2, e2, d);
  Dk(a2, d);
  return a2;
}
function fl(a2, b, c2, d) {
  var e2 = b.current, f2 = R$2(), g = yi(e2);
  c2 = dl(c2);
  null === b.context ? b.context = c2 : b.pendingContext = c2;
  b = mh(f2, g);
  b.payload = { element: a2 };
  d = void 0 === d ? null : d;
  null !== d && (b.callback = d);
  a2 = nh(e2, b, g);
  null !== a2 && (gi(a2, e2, g, f2), oh(a2, e2, g));
  return g;
}
function gl(a2) {
  a2 = a2.current;
  if (!a2.child) return null;
  switch (a2.child.tag) {
    case 5:
      return a2.child.stateNode;
    default:
      return a2.child.stateNode;
  }
}
function hl(a2, b) {
  a2 = a2.memoizedState;
  if (null !== a2 && null !== a2.dehydrated) {
    var c2 = a2.retryLane;
    a2.retryLane = 0 !== c2 && c2 < b ? c2 : b;
  }
}
function il(a2, b) {
  hl(a2, b);
  (a2 = a2.alternate) && hl(a2, b);
}
function jl() {
  return null;
}
var kl = "function" === typeof reportError ? reportError : function(a2) {
  console.error(a2);
};
function ll(a2) {
  this._internalRoot = a2;
}
ml.prototype.render = ll.prototype.render = function(a2) {
  var b = this._internalRoot;
  if (null === b) throw Error(p$2(409));
  fl(a2, b, null, null);
};
ml.prototype.unmount = ll.prototype.unmount = function() {
  var a2 = this._internalRoot;
  if (null !== a2) {
    this._internalRoot = null;
    var b = a2.containerInfo;
    Rk(function() {
      fl(null, a2, null, null);
    });
    b[uf] = null;
  }
};
function ml(a2) {
  this._internalRoot = a2;
}
ml.prototype.unstable_scheduleHydration = function(a2) {
  if (a2) {
    var b = Hc$1();
    a2 = { blockedOn: null, target: a2, priority: b };
    for (var c2 = 0; c2 < Qc$1.length && 0 !== b && b < Qc$1[c2].priority; c2++) ;
    Qc$1.splice(c2, 0, a2);
    0 === c2 && Vc$1(a2);
  }
};
function nl(a2) {
  return !(!a2 || 1 !== a2.nodeType && 9 !== a2.nodeType && 11 !== a2.nodeType);
}
function ol(a2) {
  return !(!a2 || 1 !== a2.nodeType && 9 !== a2.nodeType && 11 !== a2.nodeType && (8 !== a2.nodeType || " react-mount-point-unstable " !== a2.nodeValue));
}
function pl() {
}
function ql(a2, b, c2, d, e2) {
  if (e2) {
    if ("function" === typeof d) {
      var f2 = d;
      d = function() {
        var a3 = gl(g);
        f2.call(a3);
      };
    }
    var g = el(b, d, a2, 0, null, false, false, "", pl);
    a2._reactRootContainer = g;
    a2[uf] = g.current;
    sf(8 === a2.nodeType ? a2.parentNode : a2);
    Rk();
    return g;
  }
  for (; e2 = a2.lastChild; ) a2.removeChild(e2);
  if ("function" === typeof d) {
    var h = d;
    d = function() {
      var a3 = gl(k2);
      h.call(a3);
    };
  }
  var k2 = bl(a2, 0, false, null, null, false, false, "", pl);
  a2._reactRootContainer = k2;
  a2[uf] = k2.current;
  sf(8 === a2.nodeType ? a2.parentNode : a2);
  Rk(function() {
    fl(b, k2, c2, d);
  });
  return k2;
}
function rl(a2, b, c2, d, e2) {
  var f2 = c2._reactRootContainer;
  if (f2) {
    var g = f2;
    if ("function" === typeof e2) {
      var h = e2;
      e2 = function() {
        var a3 = gl(g);
        h.call(a3);
      };
    }
    fl(b, g, a2, e2);
  } else g = ql(c2, b, a2, e2, d);
  return gl(g);
}
Ec$1 = function(a2) {
  switch (a2.tag) {
    case 3:
      var b = a2.stateNode;
      if (b.current.memoizedState.isDehydrated) {
        var c2 = tc$1(b.pendingLanes);
        0 !== c2 && (Cc$1(b, c2 | 1), Dk(b, B$2()), 0 === (K$2 & 6) && (Gj = B$2() + 500, jg()));
      }
      break;
    case 13:
      Rk(function() {
        var b2 = ih(a2, 1);
        if (null !== b2) {
          var c3 = R$2();
          gi(b2, a2, 1, c3);
        }
      }), il(a2, 1);
  }
};
Fc$1 = function(a2) {
  if (13 === a2.tag) {
    var b = ih(a2, 134217728);
    if (null !== b) {
      var c2 = R$2();
      gi(b, a2, 134217728, c2);
    }
    il(a2, 134217728);
  }
};
Gc$1 = function(a2) {
  if (13 === a2.tag) {
    var b = yi(a2), c2 = ih(a2, b);
    if (null !== c2) {
      var d = R$2();
      gi(c2, a2, b, d);
    }
    il(a2, b);
  }
};
Hc$1 = function() {
  return C$1;
};
Ic$1 = function(a2, b) {
  var c2 = C$1;
  try {
    return C$1 = a2, b();
  } finally {
    C$1 = c2;
  }
};
yb$2 = function(a2, b, c2) {
  switch (b) {
    case "input":
      bb$2(a2, c2);
      b = c2.name;
      if ("radio" === c2.type && null != b) {
        for (c2 = a2; c2.parentNode; ) c2 = c2.parentNode;
        c2 = c2.querySelectorAll("input[name=" + JSON.stringify("" + b) + '][type="radio"]');
        for (b = 0; b < c2.length; b++) {
          var d = c2[b];
          if (d !== a2 && d.form === a2.form) {
            var e2 = Db$2(d);
            if (!e2) throw Error(p$2(90));
            Wa$2(d);
            bb$2(d, e2);
          }
        }
      }
      break;
    case "textarea":
      ib$2(a2, c2);
      break;
    case "select":
      b = c2.value, null != b && fb$2(a2, !!c2.multiple, b, false);
  }
};
Gb$2 = Qk;
Hb$2 = Rk;
var sl = { usingClientEntryPoint: false, Events: [Cb$2, ue, Db$2, Eb$2, Fb$1, Qk] }, tl = { findFiberByHostInstance: Wc$1, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" };
var ul = { bundleType: tl.bundleType, version: tl.version, rendererPackageName: tl.rendererPackageName, rendererConfig: tl.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: ua$2.ReactCurrentDispatcher, findHostInstanceByFiber: function(a2) {
  a2 = Zb$1(a2);
  return null === a2 ? null : a2.stateNode;
}, findFiberByHostInstance: tl.findFiberByHostInstance || jl, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
if ("undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) {
  var vl = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!vl.isDisabled && vl.supportsFiber) try {
    kc$1 = vl.inject(ul), lc$1 = vl;
  } catch (a2) {
  }
}
reactDom_production_min.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = sl;
reactDom_production_min.createPortal = function(a2, b) {
  var c2 = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
  if (!nl(b)) throw Error(p$2(200));
  return cl(a2, b, null, c2);
};
reactDom_production_min.createRoot = function(a2, b) {
  if (!nl(a2)) throw Error(p$2(299));
  var c2 = false, d = "", e2 = kl;
  null !== b && void 0 !== b && (true === b.unstable_strictMode && (c2 = true), void 0 !== b.identifierPrefix && (d = b.identifierPrefix), void 0 !== b.onRecoverableError && (e2 = b.onRecoverableError));
  b = bl(a2, 1, false, null, null, c2, false, d, e2);
  a2[uf] = b.current;
  sf(8 === a2.nodeType ? a2.parentNode : a2);
  return new ll(b);
};
reactDom_production_min.findDOMNode = function(a2) {
  if (null == a2) return null;
  if (1 === a2.nodeType) return a2;
  var b = a2._reactInternals;
  if (void 0 === b) {
    if ("function" === typeof a2.render) throw Error(p$2(188));
    a2 = Object.keys(a2).join(",");
    throw Error(p$2(268, a2));
  }
  a2 = Zb$1(b);
  a2 = null === a2 ? null : a2.stateNode;
  return a2;
};
reactDom_production_min.flushSync = function(a2) {
  return Rk(a2);
};
reactDom_production_min.hydrate = function(a2, b, c2) {
  if (!ol(b)) throw Error(p$2(200));
  return rl(null, a2, b, true, c2);
};
reactDom_production_min.hydrateRoot = function(a2, b, c2) {
  if (!nl(a2)) throw Error(p$2(405));
  var d = null != c2 && c2.hydratedSources || null, e2 = false, f2 = "", g = kl;
  null !== c2 && void 0 !== c2 && (true === c2.unstable_strictMode && (e2 = true), void 0 !== c2.identifierPrefix && (f2 = c2.identifierPrefix), void 0 !== c2.onRecoverableError && (g = c2.onRecoverableError));
  b = el(b, null, a2, 1, null != c2 ? c2 : null, e2, false, f2, g);
  a2[uf] = b.current;
  sf(a2);
  if (d) for (a2 = 0; a2 < d.length; a2++) c2 = d[a2], e2 = c2._getVersion, e2 = e2(c2._source), null == b.mutableSourceEagerHydrationData ? b.mutableSourceEagerHydrationData = [c2, e2] : b.mutableSourceEagerHydrationData.push(
    c2,
    e2
  );
  return new ml(b);
};
reactDom_production_min.render = function(a2, b, c2) {
  if (!ol(b)) throw Error(p$2(200));
  return rl(null, a2, b, false, c2);
};
reactDom_production_min.unmountComponentAtNode = function(a2) {
  if (!ol(a2)) throw Error(p$2(40));
  return a2._reactRootContainer ? (Rk(function() {
    rl(null, null, a2, false, function() {
      a2._reactRootContainer = null;
      a2[uf] = null;
    });
  }), true) : false;
};
reactDom_production_min.unstable_batchedUpdates = Qk;
reactDom_production_min.unstable_renderSubtreeIntoContainer = function(a2, b, c2, d) {
  if (!ol(c2)) throw Error(p$2(200));
  if (null == a2 || void 0 === a2._reactInternals) throw Error(p$2(38));
  return rl(a2, b, c2, false, d);
};
reactDom_production_min.version = "18.3.1-next-f1338f8080-20240426";
function checkDCE() {
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === "undefined" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== "function") {
    return;
  }
  try {
    __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
  } catch (err) {
    console.error(err);
  }
}
{
  checkDCE();
}
/**
 * @remix-run/router v1.23.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function _extends$3() {
  _extends$3 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i2 = 1; i2 < arguments.length; i2++) {
      var source = arguments[i2];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$3.apply(this, arguments);
}
var Action;
(function(Action2) {
  Action2["Pop"] = "POP";
  Action2["Push"] = "PUSH";
  Action2["Replace"] = "REPLACE";
})(Action || (Action = {}));
function invariant$1(value, message) {
  if (value === false || value === null || typeof value === "undefined") {
    throw new Error(message);
  }
}
function warning(cond, message) {
  if (!cond) {
    if (typeof console !== "undefined") console.warn(message);
    try {
      throw new Error(message);
    } catch (e2) {
    }
  }
}
function createPath(_ref) {
  let {
    pathname = "/",
    search = "",
    hash = ""
  } = _ref;
  if (search && search !== "?") pathname += search.charAt(0) === "?" ? search : "?" + search;
  if (hash && hash !== "#") pathname += hash.charAt(0) === "#" ? hash : "#" + hash;
  return pathname;
}
function parsePath(path) {
  let parsedPath = {};
  if (path) {
    let hashIndex = path.indexOf("#");
    if (hashIndex >= 0) {
      parsedPath.hash = path.substr(hashIndex);
      path = path.substr(0, hashIndex);
    }
    let searchIndex = path.indexOf("?");
    if (searchIndex >= 0) {
      parsedPath.search = path.substr(searchIndex);
      path = path.substr(0, searchIndex);
    }
    if (path) {
      parsedPath.pathname = path;
    }
  }
  return parsedPath;
}
var ResultType;
(function(ResultType2) {
  ResultType2["data"] = "data";
  ResultType2["deferred"] = "deferred";
  ResultType2["redirect"] = "redirect";
  ResultType2["error"] = "error";
})(ResultType || (ResultType = {}));
function isIndexRoute(route) {
  return route.index === true;
}
function convertRoutesToDataRoutes(routes2, mapRouteProperties2, parentPath, manifest) {
  if (parentPath === void 0) {
    parentPath = [];
  }
  if (manifest === void 0) {
    manifest = {};
  }
  return routes2.map((route, index2) => {
    let treePath = [...parentPath, String(index2)];
    let id2 = typeof route.id === "string" ? route.id : treePath.join("-");
    invariant$1(route.index !== true || !route.children, "Cannot specify children on an index route");
    invariant$1(!manifest[id2], 'Found a route id collision on id "' + id2 + `".  Route id's must be globally unique within Data Router usages`);
    if (isIndexRoute(route)) {
      let indexRoute = _extends$3({}, route, mapRouteProperties2(route), {
        id: id2
      });
      manifest[id2] = indexRoute;
      return indexRoute;
    } else {
      let pathOrLayoutRoute = _extends$3({}, route, mapRouteProperties2(route), {
        id: id2,
        children: void 0
      });
      manifest[id2] = pathOrLayoutRoute;
      if (route.children) {
        pathOrLayoutRoute.children = convertRoutesToDataRoutes(route.children, mapRouteProperties2, treePath, manifest);
      }
      return pathOrLayoutRoute;
    }
  });
}
function matchRoutes(routes2, locationArg, basename2) {
  if (basename2 === void 0) {
    basename2 = "/";
  }
  return matchRoutesImpl(routes2, locationArg, basename2);
}
function matchRoutesImpl(routes2, locationArg, basename2, allowPartial) {
  let location = typeof locationArg === "string" ? parsePath(locationArg) : locationArg;
  let pathname = stripBasename(location.pathname || "/", basename2);
  if (pathname == null) {
    return null;
  }
  let branches = flattenRoutes(routes2);
  rankRouteBranches(branches);
  let matches = null;
  for (let i2 = 0; matches == null && i2 < branches.length; ++i2) {
    let decoded = decodePath(pathname);
    matches = matchRouteBranch(branches[i2], decoded);
  }
  return matches;
}
function convertRouteMatchToUiMatch(match, loaderData) {
  let {
    route,
    pathname,
    params
  } = match;
  return {
    id: route.id,
    pathname,
    params,
    data: loaderData[route.id],
    handle: route.handle
  };
}
function flattenRoutes(routes2, branches, parentsMeta, parentPath) {
  if (branches === void 0) {
    branches = [];
  }
  if (parentsMeta === void 0) {
    parentsMeta = [];
  }
  if (parentPath === void 0) {
    parentPath = "";
  }
  let flattenRoute = (route, index2, relativePath) => {
    let meta2 = {
      relativePath: relativePath === void 0 ? route.path || "" : relativePath,
      caseSensitive: route.caseSensitive === true,
      childrenIndex: index2,
      route
    };
    if (meta2.relativePath.startsWith("/")) {
      invariant$1(meta2.relativePath.startsWith(parentPath), 'Absolute route path "' + meta2.relativePath + '" nested under path ' + ('"' + parentPath + '" is not valid. An absolute child route path ') + "must start with the combined path of all its parent routes.");
      meta2.relativePath = meta2.relativePath.slice(parentPath.length);
    }
    let path = joinPaths([parentPath, meta2.relativePath]);
    let routesMeta = parentsMeta.concat(meta2);
    if (route.children && route.children.length > 0) {
      invariant$1(
        // Our types know better, but runtime JS may not!
        // @ts-expect-error
        route.index !== true,
        "Index routes must not have child routes. Please remove " + ('all child routes from route path "' + path + '".')
      );
      flattenRoutes(route.children, branches, routesMeta, path);
    }
    if (route.path == null && !route.index) {
      return;
    }
    branches.push({
      path,
      score: computeScore(path, route.index),
      routesMeta
    });
  };
  routes2.forEach((route, index2) => {
    var _route$path;
    if (route.path === "" || !((_route$path = route.path) != null && _route$path.includes("?"))) {
      flattenRoute(route, index2);
    } else {
      for (let exploded of explodeOptionalSegments(route.path)) {
        flattenRoute(route, index2, exploded);
      }
    }
  });
  return branches;
}
function explodeOptionalSegments(path) {
  let segments = path.split("/");
  if (segments.length === 0) return [];
  let [first, ...rest] = segments;
  let isOptional = first.endsWith("?");
  let required = first.replace(/\?$/, "");
  if (rest.length === 0) {
    return isOptional ? [required, ""] : [required];
  }
  let restExploded = explodeOptionalSegments(rest.join("/"));
  let result = [];
  result.push(...restExploded.map((subpath) => subpath === "" ? required : [required, subpath].join("/")));
  if (isOptional) {
    result.push(...restExploded);
  }
  return result.map((exploded) => path.startsWith("/") && exploded === "" ? "/" : exploded);
}
function rankRouteBranches(branches) {
  branches.sort((a2, b) => a2.score !== b.score ? b.score - a2.score : compareIndexes(a2.routesMeta.map((meta2) => meta2.childrenIndex), b.routesMeta.map((meta2) => meta2.childrenIndex)));
}
const paramRe = /^:[\w-]+$/;
const dynamicSegmentValue = 3;
const indexRouteValue = 2;
const emptySegmentValue = 1;
const staticSegmentValue = 10;
const splatPenalty = -2;
const isSplat = (s2) => s2 === "*";
function computeScore(path, index2) {
  let segments = path.split("/");
  let initialScore = segments.length;
  if (segments.some(isSplat)) {
    initialScore += splatPenalty;
  }
  if (index2) {
    initialScore += indexRouteValue;
  }
  return segments.filter((s2) => !isSplat(s2)).reduce((score, segment) => score + (paramRe.test(segment) ? dynamicSegmentValue : segment === "" ? emptySegmentValue : staticSegmentValue), initialScore);
}
function compareIndexes(a2, b) {
  let siblings = a2.length === b.length && a2.slice(0, -1).every((n2, i2) => n2 === b[i2]);
  return siblings ? (
    // If two routes are siblings, we should try to match the earlier sibling
    // first. This allows people to have fine-grained control over the matching
    // behavior by simply putting routes with identical paths in the order they
    // want them tried.
    a2[a2.length - 1] - b[b.length - 1]
  ) : (
    // Otherwise, it doesn't really make sense to rank non-siblings by index,
    // so they sort equally.
    0
  );
}
function matchRouteBranch(branch, pathname, allowPartial) {
  let {
    routesMeta
  } = branch;
  let matchedParams = {};
  let matchedPathname = "/";
  let matches = [];
  for (let i2 = 0; i2 < routesMeta.length; ++i2) {
    let meta2 = routesMeta[i2];
    let end = i2 === routesMeta.length - 1;
    let remainingPathname = matchedPathname === "/" ? pathname : pathname.slice(matchedPathname.length) || "/";
    let match = matchPath({
      path: meta2.relativePath,
      caseSensitive: meta2.caseSensitive,
      end
    }, remainingPathname);
    let route = meta2.route;
    if (!match) {
      return null;
    }
    Object.assign(matchedParams, match.params);
    matches.push({
      // TODO: Can this as be avoided?
      params: matchedParams,
      pathname: joinPaths([matchedPathname, match.pathname]),
      pathnameBase: normalizePathname(joinPaths([matchedPathname, match.pathnameBase])),
      route
    });
    if (match.pathnameBase !== "/") {
      matchedPathname = joinPaths([matchedPathname, match.pathnameBase]);
    }
  }
  return matches;
}
function matchPath(pattern, pathname) {
  if (typeof pattern === "string") {
    pattern = {
      path: pattern,
      caseSensitive: false,
      end: true
    };
  }
  let [matcher, compiledParams] = compilePath(pattern.path, pattern.caseSensitive, pattern.end);
  let match = pathname.match(matcher);
  if (!match) return null;
  let matchedPathname = match[0];
  let pathnameBase = matchedPathname.replace(/(.)\/+$/, "$1");
  let captureGroups = match.slice(1);
  let params = compiledParams.reduce((memo, _ref, index2) => {
    let {
      paramName,
      isOptional
    } = _ref;
    if (paramName === "*") {
      let splatValue = captureGroups[index2] || "";
      pathnameBase = matchedPathname.slice(0, matchedPathname.length - splatValue.length).replace(/(.)\/+$/, "$1");
    }
    const value = captureGroups[index2];
    if (isOptional && !value) {
      memo[paramName] = void 0;
    } else {
      memo[paramName] = (value || "").replace(/%2F/g, "/");
    }
    return memo;
  }, {});
  return {
    params,
    pathname: matchedPathname,
    pathnameBase,
    pattern
  };
}
function compilePath(path, caseSensitive, end) {
  if (caseSensitive === void 0) {
    caseSensitive = false;
  }
  if (end === void 0) {
    end = true;
  }
  warning(path === "*" || !path.endsWith("*") || path.endsWith("/*"), 'Route path "' + path + '" will be treated as if it were ' + ('"' + path.replace(/\*$/, "/*") + '" because the `*` character must ') + "always follow a `/` in the pattern. To get rid of this warning, " + ('please change the route path to "' + path.replace(/\*$/, "/*") + '".'));
  let params = [];
  let regexpSource = "^" + path.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(/\/:([\w-]+)(\?)?/g, (_, paramName, isOptional) => {
    params.push({
      paramName,
      isOptional: isOptional != null
    });
    return isOptional ? "/?([^\\/]+)?" : "/([^\\/]+)";
  });
  if (path.endsWith("*")) {
    params.push({
      paramName: "*"
    });
    regexpSource += path === "*" || path === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$";
  } else if (end) {
    regexpSource += "\\/*$";
  } else if (path !== "" && path !== "/") {
    regexpSource += "(?:(?=\\/|$))";
  } else ;
  let matcher = new RegExp(regexpSource, caseSensitive ? void 0 : "i");
  return [matcher, params];
}
function decodePath(value) {
  try {
    return value.split("/").map((v2) => decodeURIComponent(v2).replace(/\//g, "%2F")).join("/");
  } catch (error) {
    warning(false, 'The URL path "' + value + '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent ' + ("encoding (" + error + ")."));
    return value;
  }
}
function stripBasename(pathname, basename2) {
  if (basename2 === "/") return pathname;
  if (!pathname.toLowerCase().startsWith(basename2.toLowerCase())) {
    return null;
  }
  let startIndex = basename2.endsWith("/") ? basename2.length - 1 : basename2.length;
  let nextChar = pathname.charAt(startIndex);
  if (nextChar && nextChar !== "/") {
    return null;
  }
  return pathname.slice(startIndex) || "/";
}
const ABSOLUTE_URL_REGEX$1$1 = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
const isAbsoluteUrl = (url) => ABSOLUTE_URL_REGEX$1$1.test(url);
function resolvePath(to, fromPathname) {
  if (fromPathname === void 0) {
    fromPathname = "/";
  }
  let {
    pathname: toPathname,
    search = "",
    hash = ""
  } = typeof to === "string" ? parsePath(to) : to;
  let pathname;
  if (toPathname) {
    if (isAbsoluteUrl(toPathname)) {
      pathname = toPathname;
    } else {
      if (toPathname.includes("//")) {
        let oldPathname = toPathname;
        toPathname = toPathname.replace(/\/\/+/g, "/");
        warning(false, "Pathnames cannot have embedded double slashes - normalizing " + (oldPathname + " -> " + toPathname));
      }
      if (toPathname.startsWith("/")) {
        pathname = resolvePathname(toPathname.substring(1), "/");
      } else {
        pathname = resolvePathname(toPathname, fromPathname);
      }
    }
  } else {
    pathname = fromPathname;
  }
  return {
    pathname,
    search: normalizeSearch(search),
    hash: normalizeHash(hash)
  };
}
function resolvePathname(relativePath, fromPathname) {
  let segments = fromPathname.replace(/\/+$/, "").split("/");
  let relativeSegments = relativePath.split("/");
  relativeSegments.forEach((segment) => {
    if (segment === "..") {
      if (segments.length > 1) segments.pop();
    } else if (segment !== ".") {
      segments.push(segment);
    }
  });
  return segments.length > 1 ? segments.join("/") : "/";
}
function getInvalidPathError(char, field, dest, path) {
  return "Cannot include a '" + char + "' character in a manually specified " + ("`to." + field + "` field [" + JSON.stringify(path) + "].  Please separate it out to the ") + ("`to." + dest + "` field. Alternatively you may provide the full path as ") + 'a string in <Link to="..."> and the router will parse it for you.';
}
function getPathContributingMatches(matches) {
  return matches.filter((match, index2) => index2 === 0 || match.route.path && match.route.path.length > 0);
}
function getResolveToMatches(matches, v7_relativeSplatPath) {
  let pathMatches = getPathContributingMatches(matches);
  if (v7_relativeSplatPath) {
    return pathMatches.map((match, idx) => idx === pathMatches.length - 1 ? match.pathname : match.pathnameBase);
  }
  return pathMatches.map((match) => match.pathnameBase);
}
function resolveTo(toArg, routePathnames, locationPathname, isPathRelative) {
  if (isPathRelative === void 0) {
    isPathRelative = false;
  }
  let to;
  if (typeof toArg === "string") {
    to = parsePath(toArg);
  } else {
    to = _extends$3({}, toArg);
    invariant$1(!to.pathname || !to.pathname.includes("?"), getInvalidPathError("?", "pathname", "search", to));
    invariant$1(!to.pathname || !to.pathname.includes("#"), getInvalidPathError("#", "pathname", "hash", to));
    invariant$1(!to.search || !to.search.includes("#"), getInvalidPathError("#", "search", "hash", to));
  }
  let isEmptyPath = toArg === "" || to.pathname === "";
  let toPathname = isEmptyPath ? "/" : to.pathname;
  let from;
  if (toPathname == null) {
    from = locationPathname;
  } else {
    let routePathnameIndex = routePathnames.length - 1;
    if (!isPathRelative && toPathname.startsWith("..")) {
      let toSegments = toPathname.split("/");
      while (toSegments[0] === "..") {
        toSegments.shift();
        routePathnameIndex -= 1;
      }
      to.pathname = toSegments.join("/");
    }
    from = routePathnameIndex >= 0 ? routePathnames[routePathnameIndex] : "/";
  }
  let path = resolvePath(to, from);
  let hasExplicitTrailingSlash = toPathname && toPathname !== "/" && toPathname.endsWith("/");
  let hasCurrentTrailingSlash = (isEmptyPath || toPathname === ".") && locationPathname.endsWith("/");
  if (!path.pathname.endsWith("/") && (hasExplicitTrailingSlash || hasCurrentTrailingSlash)) {
    path.pathname += "/";
  }
  return path;
}
const joinPaths = (paths) => paths.join("/").replace(/\/\/+/g, "/");
const normalizePathname = (pathname) => pathname.replace(/\/+$/, "").replace(/^\/*/, "/");
const normalizeSearch = (search) => !search || search === "?" ? "" : search.startsWith("?") ? search : "?" + search;
const normalizeHash = (hash) => !hash || hash === "#" ? "" : hash.startsWith("#") ? hash : "#" + hash;
class AbortedDeferredError extends Error {
}
function isRouteErrorResponse(error) {
  return error != null && typeof error.status === "number" && typeof error.statusText === "string" && typeof error.internal === "boolean" && "data" in error;
}
const validMutationMethodsArr = ["post", "put", "patch", "delete"];
new Set(validMutationMethodsArr);
const validRequestMethodsArr = ["get", ...validMutationMethodsArr];
new Set(validRequestMethodsArr);
const IDLE_NAVIGATION = {
  state: "idle",
  location: void 0,
  formMethod: void 0,
  formAction: void 0,
  formEncType: void 0,
  formData: void 0,
  json: void 0,
  text: void 0
};
const IDLE_FETCHER = {
  state: "idle",
  data: void 0,
  formMethod: void 0,
  formAction: void 0,
  formEncType: void 0,
  formData: void 0,
  json: void 0,
  text: void 0
};
const IDLE_BLOCKER = {
  state: "unblocked",
  proceed: void 0,
  reset: void 0,
  location: void 0
};
/**
 * React Router v6.30.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function _extends$2() {
  _extends$2 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i2 = 1; i2 < arguments.length; i2++) {
      var source = arguments[i2];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$2.apply(this, arguments);
}
const DataRouterContext = /* @__PURE__ */ reactExports.createContext(null);
const DataRouterStateContext = /* @__PURE__ */ reactExports.createContext(null);
const AwaitContext = /* @__PURE__ */ reactExports.createContext(null);
const NavigationContext = /* @__PURE__ */ reactExports.createContext(null);
const LocationContext = /* @__PURE__ */ reactExports.createContext(null);
const RouteContext = /* @__PURE__ */ reactExports.createContext({
  outlet: null,
  matches: [],
  isDataRoute: false
});
const RouteErrorContext = /* @__PURE__ */ reactExports.createContext(null);
function useHref(to, _temp) {
  let {
    relative
  } = _temp === void 0 ? {} : _temp;
  !useInRouterContext() ? invariant$1(false) : void 0;
  let {
    basename: basename2,
    navigator: navigator2
  } = reactExports.useContext(NavigationContext);
  let {
    hash,
    pathname,
    search
  } = useResolvedPath(to, {
    relative
  });
  let joinedPathname = pathname;
  if (basename2 !== "/") {
    joinedPathname = pathname === "/" ? basename2 : joinPaths([basename2, pathname]);
  }
  return navigator2.createHref({
    pathname: joinedPathname,
    search,
    hash
  });
}
function useInRouterContext() {
  return reactExports.useContext(LocationContext) != null;
}
function useLocation() {
  !useInRouterContext() ? invariant$1(false) : void 0;
  return reactExports.useContext(LocationContext).location;
}
function useIsomorphicLayoutEffect(cb2) {
  let isStatic = reactExports.useContext(NavigationContext).static;
  if (!isStatic) {
    reactExports.useLayoutEffect(cb2);
  }
}
function useNavigate() {
  let {
    isDataRoute
  } = reactExports.useContext(RouteContext);
  return isDataRoute ? useNavigateStable() : useNavigateUnstable();
}
function useNavigateUnstable() {
  !useInRouterContext() ? invariant$1(false) : void 0;
  let dataRouterContext = reactExports.useContext(DataRouterContext);
  let {
    basename: basename2,
    future: future2,
    navigator: navigator2
  } = reactExports.useContext(NavigationContext);
  let {
    matches
  } = reactExports.useContext(RouteContext);
  let {
    pathname: locationPathname
  } = useLocation();
  let routePathnamesJson = JSON.stringify(getResolveToMatches(matches, future2.v7_relativeSplatPath));
  let activeRef = reactExports.useRef(false);
  useIsomorphicLayoutEffect(() => {
    activeRef.current = true;
  });
  let navigate = reactExports.useCallback(function(to, options) {
    if (options === void 0) {
      options = {};
    }
    if (!activeRef.current) return;
    if (typeof to === "number") {
      navigator2.go(to);
      return;
    }
    let path = resolveTo(to, JSON.parse(routePathnamesJson), locationPathname, options.relative === "path");
    if (dataRouterContext == null && basename2 !== "/") {
      path.pathname = path.pathname === "/" ? basename2 : joinPaths([basename2, path.pathname]);
    }
    (!!options.replace ? navigator2.replace : navigator2.push)(path, options.state, options);
  }, [basename2, navigator2, routePathnamesJson, locationPathname, dataRouterContext]);
  return navigate;
}
const OutletContext = /* @__PURE__ */ reactExports.createContext(null);
function useOutlet(context) {
  let outlet = reactExports.useContext(RouteContext).outlet;
  if (outlet) {
    return /* @__PURE__ */ reactExports.createElement(OutletContext.Provider, {
      value: context
    }, outlet);
  }
  return outlet;
}
function useResolvedPath(to, _temp2) {
  let {
    relative
  } = _temp2 === void 0 ? {} : _temp2;
  let {
    future: future2
  } = reactExports.useContext(NavigationContext);
  let {
    matches
  } = reactExports.useContext(RouteContext);
  let {
    pathname: locationPathname
  } = useLocation();
  let routePathnamesJson = JSON.stringify(getResolveToMatches(matches, future2.v7_relativeSplatPath));
  return reactExports.useMemo(() => resolveTo(to, JSON.parse(routePathnamesJson), locationPathname, relative === "path"), [to, routePathnamesJson, locationPathname, relative]);
}
function useRoutesImpl(routes2, locationArg, dataRouterState, future2) {
  !useInRouterContext() ? invariant$1(false) : void 0;
  let {
    navigator: navigator2
  } = reactExports.useContext(NavigationContext);
  let {
    matches: parentMatches
  } = reactExports.useContext(RouteContext);
  let routeMatch = parentMatches[parentMatches.length - 1];
  let parentParams = routeMatch ? routeMatch.params : {};
  routeMatch ? routeMatch.pathname : "/";
  let parentPathnameBase = routeMatch ? routeMatch.pathnameBase : "/";
  routeMatch && routeMatch.route;
  let locationFromContext = useLocation();
  let location;
  {
    location = locationFromContext;
  }
  let pathname = location.pathname || "/";
  let remainingPathname = pathname;
  if (parentPathnameBase !== "/") {
    let parentSegments = parentPathnameBase.replace(/^\//, "").split("/");
    let segments = pathname.replace(/^\//, "").split("/");
    remainingPathname = "/" + segments.slice(parentSegments.length).join("/");
  }
  let matches = matchRoutes(routes2, {
    pathname: remainingPathname
  });
  let renderedMatches = _renderMatches(matches && matches.map((match) => Object.assign({}, match, {
    params: Object.assign({}, parentParams, match.params),
    pathname: joinPaths([
      parentPathnameBase,
      // Re-encode pathnames that were decoded inside matchRoutes
      navigator2.encodeLocation ? navigator2.encodeLocation(match.pathname).pathname : match.pathname
    ]),
    pathnameBase: match.pathnameBase === "/" ? parentPathnameBase : joinPaths([
      parentPathnameBase,
      // Re-encode pathnames that were decoded inside matchRoutes
      navigator2.encodeLocation ? navigator2.encodeLocation(match.pathnameBase).pathname : match.pathnameBase
    ])
  })), parentMatches, dataRouterState, future2);
  return renderedMatches;
}
function DefaultErrorComponent() {
  let error = useRouteError();
  let message = isRouteErrorResponse(error) ? error.status + " " + error.statusText : error instanceof Error ? error.message : JSON.stringify(error);
  let stack = error instanceof Error ? error.stack : null;
  let lightgrey = "rgba(200,200,200, 0.5)";
  let preStyles = {
    padding: "0.5rem",
    backgroundColor: lightgrey
  };
  let devInfo = null;
  return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, /* @__PURE__ */ reactExports.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ reactExports.createElement("h3", {
    style: {
      fontStyle: "italic"
    }
  }, message), stack ? /* @__PURE__ */ reactExports.createElement("pre", {
    style: preStyles
  }, stack) : null, devInfo);
}
const defaultErrorElement = /* @__PURE__ */ reactExports.createElement(DefaultErrorComponent, null);
class RenderErrorBoundary extends reactExports.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: props.location,
      revalidation: props.revalidation,
      error: props.error
    };
  }
  static getDerivedStateFromError(error) {
    return {
      error
    };
  }
  static getDerivedStateFromProps(props, state) {
    if (state.location !== props.location || state.revalidation !== "idle" && props.revalidation === "idle") {
      return {
        error: props.error,
        location: props.location,
        revalidation: props.revalidation
      };
    }
    return {
      error: props.error !== void 0 ? props.error : state.error,
      location: state.location,
      revalidation: props.revalidation || state.revalidation
    };
  }
  componentDidCatch(error, errorInfo) {
    console.error("React Router caught the following error during render", error, errorInfo);
  }
  render() {
    return this.state.error !== void 0 ? /* @__PURE__ */ reactExports.createElement(RouteContext.Provider, {
      value: this.props.routeContext
    }, /* @__PURE__ */ reactExports.createElement(RouteErrorContext.Provider, {
      value: this.state.error,
      children: this.props.component
    })) : this.props.children;
  }
}
function RenderedRoute(_ref) {
  let {
    routeContext,
    match,
    children
  } = _ref;
  let dataRouterContext = reactExports.useContext(DataRouterContext);
  if (dataRouterContext && dataRouterContext.static && dataRouterContext.staticContext && (match.route.errorElement || match.route.ErrorBoundary)) {
    dataRouterContext.staticContext._deepestRenderedBoundaryId = match.route.id;
  }
  return /* @__PURE__ */ reactExports.createElement(RouteContext.Provider, {
    value: routeContext
  }, children);
}
function _renderMatches(matches, parentMatches, dataRouterState, future2) {
  var _dataRouterState;
  if (parentMatches === void 0) {
    parentMatches = [];
  }
  if (dataRouterState === void 0) {
    dataRouterState = null;
  }
  if (future2 === void 0) {
    future2 = null;
  }
  if (matches == null) {
    var _future;
    if (!dataRouterState) {
      return null;
    }
    if (dataRouterState.errors) {
      matches = dataRouterState.matches;
    } else if ((_future = future2) != null && _future.v7_partialHydration && parentMatches.length === 0 && !dataRouterState.initialized && dataRouterState.matches.length > 0) {
      matches = dataRouterState.matches;
    } else {
      return null;
    }
  }
  let renderedMatches = matches;
  let errors = (_dataRouterState = dataRouterState) == null ? void 0 : _dataRouterState.errors;
  if (errors != null) {
    let errorIndex = renderedMatches.findIndex((m2) => m2.route.id && (errors == null ? void 0 : errors[m2.route.id]) !== void 0);
    !(errorIndex >= 0) ? invariant$1(false) : void 0;
    renderedMatches = renderedMatches.slice(0, Math.min(renderedMatches.length, errorIndex + 1));
  }
  let renderFallback = false;
  let fallbackIndex = -1;
  if (dataRouterState && future2 && future2.v7_partialHydration) {
    for (let i2 = 0; i2 < renderedMatches.length; i2++) {
      let match = renderedMatches[i2];
      if (match.route.HydrateFallback || match.route.hydrateFallbackElement) {
        fallbackIndex = i2;
      }
      if (match.route.id) {
        let {
          loaderData,
          errors: errors2
        } = dataRouterState;
        let needsToRunLoader = match.route.loader && loaderData[match.route.id] === void 0 && (!errors2 || errors2[match.route.id] === void 0);
        if (match.route.lazy || needsToRunLoader) {
          renderFallback = true;
          if (fallbackIndex >= 0) {
            renderedMatches = renderedMatches.slice(0, fallbackIndex + 1);
          } else {
            renderedMatches = [renderedMatches[0]];
          }
          break;
        }
      }
    }
  }
  return renderedMatches.reduceRight((outlet, match, index2) => {
    let error;
    let shouldRenderHydrateFallback = false;
    let errorElement = null;
    let hydrateFallbackElement = null;
    if (dataRouterState) {
      error = errors && match.route.id ? errors[match.route.id] : void 0;
      errorElement = match.route.errorElement || defaultErrorElement;
      if (renderFallback) {
        if (fallbackIndex < 0 && index2 === 0) {
          warningOnce("route-fallback");
          shouldRenderHydrateFallback = true;
          hydrateFallbackElement = null;
        } else if (fallbackIndex === index2) {
          shouldRenderHydrateFallback = true;
          hydrateFallbackElement = match.route.hydrateFallbackElement || null;
        }
      }
    }
    let matches2 = parentMatches.concat(renderedMatches.slice(0, index2 + 1));
    let getChildren = () => {
      let children;
      if (error) {
        children = errorElement;
      } else if (shouldRenderHydrateFallback) {
        children = hydrateFallbackElement;
      } else if (match.route.Component) {
        children = /* @__PURE__ */ reactExports.createElement(match.route.Component, null);
      } else if (match.route.element) {
        children = match.route.element;
      } else {
        children = outlet;
      }
      return /* @__PURE__ */ reactExports.createElement(RenderedRoute, {
        match,
        routeContext: {
          outlet,
          matches: matches2,
          isDataRoute: dataRouterState != null
        },
        children
      });
    };
    return dataRouterState && (match.route.ErrorBoundary || match.route.errorElement || index2 === 0) ? /* @__PURE__ */ reactExports.createElement(RenderErrorBoundary, {
      location: dataRouterState.location,
      revalidation: dataRouterState.revalidation,
      component: errorElement,
      error,
      children: getChildren(),
      routeContext: {
        outlet: null,
        matches: matches2,
        isDataRoute: true
      }
    }) : getChildren();
  }, null);
}
var DataRouterHook$1 = /* @__PURE__ */ function(DataRouterHook2) {
  DataRouterHook2["UseBlocker"] = "useBlocker";
  DataRouterHook2["UseRevalidator"] = "useRevalidator";
  DataRouterHook2["UseNavigateStable"] = "useNavigate";
  return DataRouterHook2;
}(DataRouterHook$1 || {});
var DataRouterStateHook$1 = /* @__PURE__ */ function(DataRouterStateHook2) {
  DataRouterStateHook2["UseBlocker"] = "useBlocker";
  DataRouterStateHook2["UseLoaderData"] = "useLoaderData";
  DataRouterStateHook2["UseActionData"] = "useActionData";
  DataRouterStateHook2["UseRouteError"] = "useRouteError";
  DataRouterStateHook2["UseNavigation"] = "useNavigation";
  DataRouterStateHook2["UseRouteLoaderData"] = "useRouteLoaderData";
  DataRouterStateHook2["UseMatches"] = "useMatches";
  DataRouterStateHook2["UseRevalidator"] = "useRevalidator";
  DataRouterStateHook2["UseNavigateStable"] = "useNavigate";
  DataRouterStateHook2["UseRouteId"] = "useRouteId";
  return DataRouterStateHook2;
}(DataRouterStateHook$1 || {});
function useDataRouterContext$2(hookName) {
  let ctx = reactExports.useContext(DataRouterContext);
  !ctx ? invariant$1(false) : void 0;
  return ctx;
}
function useDataRouterState$1(hookName) {
  let state = reactExports.useContext(DataRouterStateContext);
  !state ? invariant$1(false) : void 0;
  return state;
}
function useRouteContext(hookName) {
  let route = reactExports.useContext(RouteContext);
  !route ? invariant$1(false) : void 0;
  return route;
}
function useCurrentRouteId(hookName) {
  let route = useRouteContext();
  let thisRoute = route.matches[route.matches.length - 1];
  !thisRoute.route.id ? invariant$1(false) : void 0;
  return thisRoute.route.id;
}
function useRouteId() {
  return useCurrentRouteId();
}
function useNavigation() {
  let state = useDataRouterState$1();
  return state.navigation;
}
function useMatches() {
  let {
    matches,
    loaderData
  } = useDataRouterState$1();
  return reactExports.useMemo(() => matches.map((m2) => convertRouteMatchToUiMatch(m2, loaderData)), [matches, loaderData]);
}
function useLoaderData$1() {
  let state = useDataRouterState$1(DataRouterStateHook$1.UseLoaderData);
  let routeId = useCurrentRouteId();
  if (state.errors && state.errors[routeId] != null) {
    console.error("You cannot `useLoaderData` in an errorElement (routeId: " + routeId + ")");
    return void 0;
  }
  return state.loaderData[routeId];
}
function useRouteError() {
  var _state$errors;
  let error = reactExports.useContext(RouteErrorContext);
  let state = useDataRouterState$1();
  let routeId = useCurrentRouteId();
  if (error !== void 0) {
    return error;
  }
  return (_state$errors = state.errors) == null ? void 0 : _state$errors[routeId];
}
function useAsyncValue() {
  let value = reactExports.useContext(AwaitContext);
  return value == null ? void 0 : value._data;
}
function useAsyncError() {
  let value = reactExports.useContext(AwaitContext);
  return value == null ? void 0 : value._error;
}
function useNavigateStable() {
  let {
    router
  } = useDataRouterContext$2(DataRouterHook$1.UseNavigateStable);
  let id2 = useCurrentRouteId();
  let activeRef = reactExports.useRef(false);
  useIsomorphicLayoutEffect(() => {
    activeRef.current = true;
  });
  let navigate = reactExports.useCallback(function(to, options) {
    if (options === void 0) {
      options = {};
    }
    if (!activeRef.current) return;
    if (typeof to === "number") {
      router.navigate(to);
    } else {
      router.navigate(to, _extends$2({
        fromRouteId: id2
      }, options));
    }
  }, [router, id2]);
  return navigate;
}
const alreadyWarned$1 = {};
function warningOnce(key, cond, message) {
  if (!alreadyWarned$1[key]) {
    alreadyWarned$1[key] = true;
  }
}
function Outlet(props) {
  return useOutlet(props.context);
}
function Router(_ref5) {
  let {
    basename: basenameProp = "/",
    children = null,
    location: locationProp,
    navigationType = Action.Pop,
    navigator: navigator2,
    static: staticProp = false,
    future: future2
  } = _ref5;
  !!useInRouterContext() ? invariant$1(false) : void 0;
  let basename2 = basenameProp.replace(/^\/*/, "/");
  let navigationContext = reactExports.useMemo(() => ({
    basename: basename2,
    navigator: navigator2,
    static: staticProp,
    future: _extends$2({
      v7_relativeSplatPath: false
    }, future2)
  }), [basename2, future2, navigator2, staticProp]);
  if (typeof locationProp === "string") {
    locationProp = parsePath(locationProp);
  }
  let {
    pathname = "/",
    search = "",
    hash = "",
    state = null,
    key = "default"
  } = locationProp;
  let locationContext = reactExports.useMemo(() => {
    let trailingPathname = stripBasename(pathname, basename2);
    if (trailingPathname == null) {
      return null;
    }
    return {
      location: {
        pathname: trailingPathname,
        search,
        hash,
        state,
        key
      },
      navigationType
    };
  }, [basename2, pathname, search, hash, state, key, navigationType]);
  if (locationContext == null) {
    return null;
  }
  return /* @__PURE__ */ reactExports.createElement(NavigationContext.Provider, {
    value: navigationContext
  }, /* @__PURE__ */ reactExports.createElement(LocationContext.Provider, {
    children,
    value: locationContext
  }));
}
function Await$1(_ref7) {
  let {
    children,
    errorElement,
    resolve
  } = _ref7;
  return /* @__PURE__ */ reactExports.createElement(AwaitErrorBoundary, {
    resolve,
    errorElement
  }, /* @__PURE__ */ reactExports.createElement(ResolveAwait, null, children));
}
var AwaitRenderStatus = /* @__PURE__ */ function(AwaitRenderStatus2) {
  AwaitRenderStatus2[AwaitRenderStatus2["pending"] = 0] = "pending";
  AwaitRenderStatus2[AwaitRenderStatus2["success"] = 1] = "success";
  AwaitRenderStatus2[AwaitRenderStatus2["error"] = 2] = "error";
  return AwaitRenderStatus2;
}(AwaitRenderStatus || {});
const neverSettledPromise = new Promise(() => {
});
class AwaitErrorBoundary extends reactExports.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null
    };
  }
  static getDerivedStateFromError(error) {
    return {
      error
    };
  }
  componentDidCatch(error, errorInfo) {
    console.error("<Await> caught the following error during render", error, errorInfo);
  }
  render() {
    let {
      children,
      errorElement,
      resolve
    } = this.props;
    let promise = null;
    let status = AwaitRenderStatus.pending;
    if (!(resolve instanceof Promise)) {
      status = AwaitRenderStatus.success;
      promise = Promise.resolve();
      Object.defineProperty(promise, "_tracked", {
        get: () => true
      });
      Object.defineProperty(promise, "_data", {
        get: () => resolve
      });
    } else if (this.state.error) {
      status = AwaitRenderStatus.error;
      let renderError = this.state.error;
      promise = Promise.reject().catch(() => {
      });
      Object.defineProperty(promise, "_tracked", {
        get: () => true
      });
      Object.defineProperty(promise, "_error", {
        get: () => renderError
      });
    } else if (resolve._tracked) {
      promise = resolve;
      status = "_error" in promise ? AwaitRenderStatus.error : "_data" in promise ? AwaitRenderStatus.success : AwaitRenderStatus.pending;
    } else {
      status = AwaitRenderStatus.pending;
      Object.defineProperty(resolve, "_tracked", {
        get: () => true
      });
      promise = resolve.then((data) => Object.defineProperty(resolve, "_data", {
        get: () => data
      }), (error) => Object.defineProperty(resolve, "_error", {
        get: () => error
      }));
    }
    if (status === AwaitRenderStatus.error && promise._error instanceof AbortedDeferredError) {
      throw neverSettledPromise;
    }
    if (status === AwaitRenderStatus.error && !errorElement) {
      throw promise._error;
    }
    if (status === AwaitRenderStatus.error) {
      return /* @__PURE__ */ reactExports.createElement(AwaitContext.Provider, {
        value: promise,
        children: errorElement
      });
    }
    if (status === AwaitRenderStatus.success) {
      return /* @__PURE__ */ reactExports.createElement(AwaitContext.Provider, {
        value: promise,
        children
      });
    }
    throw promise;
  }
}
function ResolveAwait(_ref8) {
  let {
    children
  } = _ref8;
  let data = useAsyncValue();
  let toRender = typeof children === "function" ? children(data) : children;
  return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, toRender);
}
function mapRouteProperties(route) {
  let updates = {
    // Note: this check also occurs in createRoutesFromChildren so update
    // there if you change this -- please and thank you!
    hasErrorBoundary: route.ErrorBoundary != null || route.errorElement != null
  };
  if (route.Component) {
    Object.assign(updates, {
      element: /* @__PURE__ */ reactExports.createElement(route.Component),
      Component: void 0
    });
  }
  if (route.HydrateFallback) {
    Object.assign(updates, {
      hydrateFallbackElement: /* @__PURE__ */ reactExports.createElement(route.HydrateFallback),
      HydrateFallback: void 0
    });
  }
  if (route.ErrorBoundary) {
    Object.assign(updates, {
      errorElement: /* @__PURE__ */ reactExports.createElement(route.ErrorBoundary),
      ErrorBoundary: void 0
    });
  }
  return updates;
}
/**
 * React Router DOM v6.30.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function _extends$1() {
  _extends$1 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i2 = 1; i2 < arguments.length; i2++) {
      var source = arguments[i2];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$1.apply(this, arguments);
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i2;
  for (i2 = 0; i2 < sourceKeys.length; i2++) {
    key = sourceKeys[i2];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
const defaultMethod = "get";
const defaultEncType = "application/x-www-form-urlencoded";
function isHtmlElement(object) {
  return object != null && typeof object.tagName === "string";
}
function isButtonElement(object) {
  return isHtmlElement(object) && object.tagName.toLowerCase() === "button";
}
function isFormElement(object) {
  return isHtmlElement(object) && object.tagName.toLowerCase() === "form";
}
function isInputElement(object) {
  return isHtmlElement(object) && object.tagName.toLowerCase() === "input";
}
function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}
function shouldProcessLinkClick(event, target) {
  return event.button === 0 && // Ignore everything but left clicks
  (!target || target === "_self") && // Let browser handle "target=_blank" etc.
  !isModifiedEvent(event);
}
let _formDataSupportsSubmitter = null;
function isFormDataSubmitterSupported() {
  if (_formDataSupportsSubmitter === null) {
    try {
      new FormData(
        document.createElement("form"),
        // @ts-expect-error if FormData supports the submitter parameter, this will throw
        0
      );
      _formDataSupportsSubmitter = false;
    } catch (e2) {
      _formDataSupportsSubmitter = true;
    }
  }
  return _formDataSupportsSubmitter;
}
const supportedFormEncTypes = /* @__PURE__ */ new Set(["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"]);
function getFormEncType(encType) {
  if (encType != null && !supportedFormEncTypes.has(encType)) {
    return null;
  }
  return encType;
}
function getFormSubmissionInfo(target, basename2) {
  let method;
  let action;
  let encType;
  let formData;
  let body;
  if (isFormElement(target)) {
    let attr = target.getAttribute("action");
    action = attr ? stripBasename(attr, basename2) : null;
    method = target.getAttribute("method") || defaultMethod;
    encType = getFormEncType(target.getAttribute("enctype")) || defaultEncType;
    formData = new FormData(target);
  } else if (isButtonElement(target) || isInputElement(target) && (target.type === "submit" || target.type === "image")) {
    let form = target.form;
    if (form == null) {
      throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');
    }
    let attr = target.getAttribute("formaction") || form.getAttribute("action");
    action = attr ? stripBasename(attr, basename2) : null;
    method = target.getAttribute("formmethod") || form.getAttribute("method") || defaultMethod;
    encType = getFormEncType(target.getAttribute("formenctype")) || getFormEncType(form.getAttribute("enctype")) || defaultEncType;
    formData = new FormData(form, target);
    if (!isFormDataSubmitterSupported()) {
      let {
        name,
        type,
        value
      } = target;
      if (type === "image") {
        let prefix = name ? name + "." : "";
        formData.append(prefix + "x", "0");
        formData.append(prefix + "y", "0");
      } else if (name) {
        formData.append(name, value);
      }
    }
  } else if (isHtmlElement(target)) {
    throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');
  } else {
    method = defaultMethod;
    action = null;
    encType = defaultEncType;
    body = target;
  }
  if (formData && encType === "text/plain") {
    body = formData;
    formData = void 0;
  }
  return {
    action,
    method: method.toLowerCase(),
    encType,
    formData,
    body
  };
}
const _excluded = ["onClick", "relative", "reloadDocument", "replace", "state", "target", "to", "preventScrollReset", "viewTransition"], _excluded2 = ["aria-current", "caseSensitive", "className", "end", "style", "to", "viewTransition", "children"], _excluded3 = ["fetcherKey", "navigate", "reloadDocument", "replace", "state", "method", "action", "onSubmit", "relative", "preventScrollReset", "viewTransition"];
const REACT_ROUTER_VERSION = "6";
try {
  window.__reactRouterVersion = REACT_ROUTER_VERSION;
} catch (e2) {
}
const ViewTransitionContext = /* @__PURE__ */ reactExports.createContext({
  isTransitioning: false
});
const FetchersContext = /* @__PURE__ */ reactExports.createContext(/* @__PURE__ */ new Map());
const isBrowser = typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined";
const ABSOLUTE_URL_REGEX$2 = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
const Link$1 = /* @__PURE__ */ reactExports.forwardRef(function LinkWithRef(_ref7, ref) {
  let {
    onClick,
    relative,
    reloadDocument,
    replace: replace2,
    state,
    target,
    to,
    preventScrollReset,
    viewTransition
  } = _ref7, rest = _objectWithoutPropertiesLoose(_ref7, _excluded);
  let {
    basename: basename2
  } = reactExports.useContext(NavigationContext);
  let absoluteHref;
  let isExternal = false;
  if (typeof to === "string" && ABSOLUTE_URL_REGEX$2.test(to)) {
    absoluteHref = to;
    if (isBrowser) {
      try {
        let currentUrl = new URL(window.location.href);
        let targetUrl = to.startsWith("//") ? new URL(currentUrl.protocol + to) : new URL(to);
        let path = stripBasename(targetUrl.pathname, basename2);
        if (targetUrl.origin === currentUrl.origin && path != null) {
          to = path + targetUrl.search + targetUrl.hash;
        } else {
          isExternal = true;
        }
      } catch (e2) {
      }
    }
  }
  let href = useHref(to, {
    relative
  });
  let internalOnClick = useLinkClickHandler(to, {
    replace: replace2,
    state,
    target,
    preventScrollReset,
    relative,
    viewTransition
  });
  function handleClick(event) {
    if (onClick) onClick(event);
    if (!event.defaultPrevented) {
      internalOnClick(event);
    }
  }
  return (
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    /* @__PURE__ */ reactExports.createElement("a", _extends$1({}, rest, {
      href: absoluteHref || href,
      onClick: isExternal || reloadDocument ? onClick : handleClick,
      ref,
      target
    }))
  );
});
const NavLink$1 = /* @__PURE__ */ reactExports.forwardRef(function NavLinkWithRef(_ref8, ref) {
  let {
    "aria-current": ariaCurrentProp = "page",
    caseSensitive = false,
    className: classNameProp = "",
    end = false,
    style: styleProp,
    to,
    viewTransition,
    children
  } = _ref8, rest = _objectWithoutPropertiesLoose(_ref8, _excluded2);
  let path = useResolvedPath(to, {
    relative: rest.relative
  });
  let location = useLocation();
  let routerState = reactExports.useContext(DataRouterStateContext);
  let {
    navigator: navigator2,
    basename: basename2
  } = reactExports.useContext(NavigationContext);
  let isTransitioning = routerState != null && // Conditional usage is OK here because the usage of a data router is static
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useViewTransitionState(path) && viewTransition === true;
  let toPathname = navigator2.encodeLocation ? navigator2.encodeLocation(path).pathname : path.pathname;
  let locationPathname = location.pathname;
  let nextLocationPathname = routerState && routerState.navigation && routerState.navigation.location ? routerState.navigation.location.pathname : null;
  if (!caseSensitive) {
    locationPathname = locationPathname.toLowerCase();
    nextLocationPathname = nextLocationPathname ? nextLocationPathname.toLowerCase() : null;
    toPathname = toPathname.toLowerCase();
  }
  if (nextLocationPathname && basename2) {
    nextLocationPathname = stripBasename(nextLocationPathname, basename2) || nextLocationPathname;
  }
  const endSlashPosition = toPathname !== "/" && toPathname.endsWith("/") ? toPathname.length - 1 : toPathname.length;
  let isActive = locationPathname === toPathname || !end && locationPathname.startsWith(toPathname) && locationPathname.charAt(endSlashPosition) === "/";
  let isPending = nextLocationPathname != null && (nextLocationPathname === toPathname || !end && nextLocationPathname.startsWith(toPathname) && nextLocationPathname.charAt(toPathname.length) === "/");
  let renderProps = {
    isActive,
    isPending,
    isTransitioning
  };
  let ariaCurrent = isActive ? ariaCurrentProp : void 0;
  let className;
  if (typeof classNameProp === "function") {
    className = classNameProp(renderProps);
  } else {
    className = [classNameProp, isActive ? "active" : null, isPending ? "pending" : null, isTransitioning ? "transitioning" : null].filter(Boolean).join(" ");
  }
  let style = typeof styleProp === "function" ? styleProp(renderProps) : styleProp;
  return /* @__PURE__ */ reactExports.createElement(Link$1, _extends$1({}, rest, {
    "aria-current": ariaCurrent,
    className,
    ref,
    style,
    to,
    viewTransition
  }), typeof children === "function" ? children(renderProps) : children);
});
const Form$1 = /* @__PURE__ */ reactExports.forwardRef((_ref9, forwardedRef) => {
  let {
    fetcherKey,
    navigate,
    reloadDocument,
    replace: replace2,
    state,
    method = defaultMethod,
    action,
    onSubmit,
    relative,
    preventScrollReset,
    viewTransition
  } = _ref9, props = _objectWithoutPropertiesLoose(_ref9, _excluded3);
  let submit = useSubmit();
  let formAction = useFormAction(action, {
    relative
  });
  let formMethod = method.toLowerCase() === "get" ? "get" : "post";
  let submitHandler = (event) => {
    onSubmit && onSubmit(event);
    if (event.defaultPrevented) return;
    event.preventDefault();
    let submitter = event.nativeEvent.submitter;
    let submitMethod = (submitter == null ? void 0 : submitter.getAttribute("formmethod")) || method;
    submit(submitter || event.currentTarget, {
      fetcherKey,
      method: submitMethod,
      navigate,
      replace: replace2,
      state,
      relative,
      preventScrollReset,
      viewTransition
    });
  };
  return /* @__PURE__ */ reactExports.createElement("form", _extends$1({
    ref: forwardedRef,
    method: formMethod,
    action: formAction,
    onSubmit: reloadDocument ? onSubmit : submitHandler
  }, props));
});
var DataRouterHook;
(function(DataRouterHook2) {
  DataRouterHook2["UseScrollRestoration"] = "useScrollRestoration";
  DataRouterHook2["UseSubmit"] = "useSubmit";
  DataRouterHook2["UseSubmitFetcher"] = "useSubmitFetcher";
  DataRouterHook2["UseFetcher"] = "useFetcher";
  DataRouterHook2["useViewTransitionState"] = "useViewTransitionState";
})(DataRouterHook || (DataRouterHook = {}));
var DataRouterStateHook;
(function(DataRouterStateHook2) {
  DataRouterStateHook2["UseFetcher"] = "useFetcher";
  DataRouterStateHook2["UseFetchers"] = "useFetchers";
  DataRouterStateHook2["UseScrollRestoration"] = "useScrollRestoration";
})(DataRouterStateHook || (DataRouterStateHook = {}));
function useDataRouterContext$1(hookName) {
  let ctx = reactExports.useContext(DataRouterContext);
  !ctx ? invariant$1(false) : void 0;
  return ctx;
}
function useDataRouterState(hookName) {
  let state = reactExports.useContext(DataRouterStateContext);
  !state ? invariant$1(false) : void 0;
  return state;
}
function useLinkClickHandler(to, _temp) {
  let {
    target,
    replace: replaceProp,
    state,
    preventScrollReset,
    relative,
    viewTransition
  } = _temp === void 0 ? {} : _temp;
  let navigate = useNavigate();
  let location = useLocation();
  let path = useResolvedPath(to, {
    relative
  });
  return reactExports.useCallback((event) => {
    if (shouldProcessLinkClick(event, target)) {
      event.preventDefault();
      let replace2 = replaceProp !== void 0 ? replaceProp : createPath(location) === createPath(path);
      navigate(to, {
        replace: replace2,
        state,
        preventScrollReset,
        relative,
        viewTransition
      });
    }
  }, [location, navigate, path, replaceProp, state, target, to, preventScrollReset, relative, viewTransition]);
}
function validateClientSideSubmission() {
  if (typeof document === "undefined") {
    throw new Error("You are calling submit during the server render. Try calling submit within a `useEffect` or callback instead.");
  }
}
let fetcherId = 0;
let getUniqueFetcherId = () => "__" + String(++fetcherId) + "__";
function useSubmit() {
  let {
    router
  } = useDataRouterContext$1(DataRouterHook.UseSubmit);
  let {
    basename: basename2
  } = reactExports.useContext(NavigationContext);
  let currentRouteId = useRouteId();
  return reactExports.useCallback(function(target, options) {
    if (options === void 0) {
      options = {};
    }
    validateClientSideSubmission();
    let {
      action,
      method,
      encType,
      formData,
      body
    } = getFormSubmissionInfo(target, basename2);
    if (options.navigate === false) {
      let key = options.fetcherKey || getUniqueFetcherId();
      router.fetch(key, currentRouteId, options.action || action, {
        preventScrollReset: options.preventScrollReset,
        formData,
        body,
        formMethod: options.method || method,
        formEncType: options.encType || encType,
        flushSync: options.flushSync
      });
    } else {
      router.navigate(options.action || action, {
        preventScrollReset: options.preventScrollReset,
        formData,
        body,
        formMethod: options.method || method,
        formEncType: options.encType || encType,
        replace: options.replace,
        state: options.state,
        fromRouteId: currentRouteId,
        flushSync: options.flushSync,
        viewTransition: options.viewTransition
      });
    }
  }, [router, basename2, currentRouteId]);
}
function useFormAction(action, _temp2) {
  let {
    relative
  } = _temp2 === void 0 ? {} : _temp2;
  let {
    basename: basename2
  } = reactExports.useContext(NavigationContext);
  let routeContext = reactExports.useContext(RouteContext);
  !routeContext ? invariant$1(false) : void 0;
  let [match] = routeContext.matches.slice(-1);
  let path = _extends$1({}, useResolvedPath(action ? action : ".", {
    relative
  }));
  let location = useLocation();
  if (action == null) {
    path.search = location.search;
    let params = new URLSearchParams(path.search);
    let indexValues = params.getAll("index");
    let hasNakedIndexParam = indexValues.some((v2) => v2 === "");
    if (hasNakedIndexParam) {
      params.delete("index");
      indexValues.filter((v2) => v2).forEach((v2) => params.append("index", v2));
      let qs = params.toString();
      path.search = qs ? "?" + qs : "";
    }
  }
  if ((!action || action === ".") && match.route.index) {
    path.search = path.search ? path.search.replace(/^\?/, "?index&") : "?index";
  }
  if (basename2 !== "/") {
    path.pathname = path.pathname === "/" ? basename2 : joinPaths([basename2, path.pathname]);
  }
  return createPath(path);
}
const SCROLL_RESTORATION_STORAGE_KEY = "react-router-scroll-positions";
let savedScrollPositions = {};
function useScrollRestoration(_temp4) {
  let {
    getKey,
    storageKey
  } = _temp4 === void 0 ? {} : _temp4;
  let {
    router
  } = useDataRouterContext$1(DataRouterHook.UseScrollRestoration);
  let {
    restoreScrollPosition,
    preventScrollReset
  } = useDataRouterState(DataRouterStateHook.UseScrollRestoration);
  let {
    basename: basename2
  } = reactExports.useContext(NavigationContext);
  let location = useLocation();
  let matches = useMatches();
  let navigation = useNavigation();
  reactExports.useEffect(() => {
    window.history.scrollRestoration = "manual";
    return () => {
      window.history.scrollRestoration = "auto";
    };
  }, []);
  usePageHide(reactExports.useCallback(() => {
    if (navigation.state === "idle") {
      let key = (getKey ? getKey(location, matches) : null) || location.key;
      savedScrollPositions[key] = window.scrollY;
    }
    try {
      sessionStorage.setItem(storageKey || SCROLL_RESTORATION_STORAGE_KEY, JSON.stringify(savedScrollPositions));
    } catch (error) {
    }
    window.history.scrollRestoration = "auto";
  }, [storageKey, getKey, navigation.state, location, matches]));
  if (typeof document !== "undefined") {
    reactExports.useLayoutEffect(() => {
      try {
        let sessionPositions = sessionStorage.getItem(storageKey || SCROLL_RESTORATION_STORAGE_KEY);
        if (sessionPositions) {
          savedScrollPositions = JSON.parse(sessionPositions);
        }
      } catch (e2) {
      }
    }, [storageKey]);
    reactExports.useLayoutEffect(() => {
      let getKeyWithoutBasename = getKey && basename2 !== "/" ? (location2, matches2) => getKey(
        // Strip the basename to match useLocation()
        _extends$1({}, location2, {
          pathname: stripBasename(location2.pathname, basename2) || location2.pathname
        }),
        matches2
      ) : getKey;
      let disableScrollRestoration = router == null ? void 0 : router.enableScrollRestoration(savedScrollPositions, () => window.scrollY, getKeyWithoutBasename);
      return () => disableScrollRestoration && disableScrollRestoration();
    }, [router, basename2, getKey]);
    reactExports.useLayoutEffect(() => {
      if (restoreScrollPosition === false) {
        return;
      }
      if (typeof restoreScrollPosition === "number") {
        window.scrollTo(0, restoreScrollPosition);
        return;
      }
      if (location.hash) {
        let el2 = document.getElementById(decodeURIComponent(location.hash.slice(1)));
        if (el2) {
          el2.scrollIntoView();
          return;
        }
      }
      if (preventScrollReset === true) {
        return;
      }
      window.scrollTo(0, 0);
    }, [location, restoreScrollPosition, preventScrollReset]);
  }
}
function usePageHide(callback, options) {
  let {
    capture
  } = {};
  reactExports.useEffect(() => {
    let opts = capture != null ? {
      capture
    } : void 0;
    window.addEventListener("pagehide", callback, opts);
    return () => {
      window.removeEventListener("pagehide", callback, opts);
    };
  }, [callback, capture]);
}
function useViewTransitionState(to, opts) {
  if (opts === void 0) {
    opts = {};
  }
  let vtContext = reactExports.useContext(ViewTransitionContext);
  !(vtContext != null) ? invariant$1(false) : void 0;
  let {
    basename: basename2
  } = useDataRouterContext$1(DataRouterHook.useViewTransitionState);
  let path = useResolvedPath(to, {
    relative: opts.relative
  });
  if (!vtContext.isTransitioning) {
    return false;
  }
  let currentPath = stripBasename(vtContext.currentLocation.pathname, basename2) || vtContext.currentLocation.pathname;
  let nextPath = stripBasename(vtContext.nextLocation.pathname, basename2) || vtContext.nextLocation.pathname;
  return matchPath(path.pathname, nextPath) != null || matchPath(path.pathname, currentPath) != null;
}
/**
 * @remix-run/react v2.17.4
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function(target) {
    for (var i2 = 1; i2 < arguments.length; i2++) {
      var source = arguments[i2];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
/**
 * @remix-run/react v2.17.4
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function invariant(value, message) {
  if (value === false || value === null || typeof value === "undefined") {
    throw new Error(message);
  }
}
/**
 * @remix-run/react v2.17.4
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
async function loadRouteModule(route, routeModulesCache) {
  if (route.id in routeModulesCache) {
    return routeModulesCache[route.id];
  }
  try {
    let routeModule = await import(
      /* webpackIgnore: true */
      route.module
    );
    routeModulesCache[route.id] = routeModule;
    return routeModule;
  } catch (error) {
    console.error(`Error loading route module \`${route.module}\`, reloading page...`);
    console.error(error);
    if (window.__remixContext.isSpaMode && // @ts-expect-error
    false) ;
    window.location.reload();
    return new Promise(() => {
    });
  }
}
/**
 * @remix-run/react v2.17.4
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function getKeyedLinksForMatches(matches, routeModules, manifest) {
  let descriptors = matches.map((match) => {
    var _module$links;
    let module = routeModules[match.route.id];
    let route = manifest.routes[match.route.id];
    return [route.css ? route.css.map((href) => ({
      rel: "stylesheet",
      href
    })) : [], (module === null || module === void 0 ? void 0 : (_module$links = module.links) === null || _module$links === void 0 ? void 0 : _module$links.call(module)) || []];
  }).flat(2);
  let preloads = getCurrentPageModulePreloadHrefs(matches, manifest);
  return dedupeLinkDescriptors(descriptors, preloads);
}
function isPageLinkDescriptor(object) {
  return object != null && typeof object.page === "string";
}
function isHtmlLinkDescriptor(object) {
  if (object == null) {
    return false;
  }
  if (object.href == null) {
    return object.rel === "preload" && typeof object.imageSrcSet === "string" && typeof object.imageSizes === "string";
  }
  return typeof object.rel === "string" && typeof object.href === "string";
}
async function getKeyedPrefetchLinks(matches, manifest, routeModules) {
  let links2 = await Promise.all(matches.map(async (match) => {
    let mod = await loadRouteModule(manifest.routes[match.route.id], routeModules);
    return mod.links ? mod.links() : [];
  }));
  return dedupeLinkDescriptors(links2.flat(1).filter(isHtmlLinkDescriptor).filter((link) => link.rel === "stylesheet" || link.rel === "preload").map((link) => link.rel === "stylesheet" ? {
    ...link,
    rel: "prefetch",
    as: "style"
  } : {
    ...link,
    rel: "prefetch"
  }));
}
function getNewMatchesForLinks(page, nextMatches, currentMatches, manifest, location, future2, mode2) {
  let path = parsePathPatch(page);
  let isNew = (match, index2) => {
    if (!currentMatches[index2]) return true;
    return match.route.id !== currentMatches[index2].route.id;
  };
  let matchPathChanged = (match, index2) => {
    var _currentMatches$index;
    return (
      // param change, /users/123 -> /users/456
      currentMatches[index2].pathname !== match.pathname || // splat param changed, which is not present in match.path
      // e.g. /files/images/avatar.jpg -> files/finances.xls
      ((_currentMatches$index = currentMatches[index2].route.path) === null || _currentMatches$index === void 0 ? void 0 : _currentMatches$index.endsWith("*")) && currentMatches[index2].params["*"] !== match.params["*"]
    );
  };
  let newMatches = mode2 === "data" && (future2.v3_singleFetch || location.search !== path.search) ? (
    // this is really similar to stuff in transition.ts, maybe somebody smarter
    // than me (or in less of a hurry) can share some of it. You're the best.
    nextMatches.filter((match, index2) => {
      let manifestRoute = manifest.routes[match.route.id];
      if (!manifestRoute.hasLoader) {
        return false;
      }
      if (isNew(match, index2) || matchPathChanged(match, index2)) {
        return true;
      }
      let defaultShouldRevalidate = future2.v3_singleFetch || location.search !== path.search;
      if (match.route.shouldRevalidate) {
        var _currentMatches$;
        let routeChoice = match.route.shouldRevalidate({
          currentUrl: new URL(location.pathname + location.search + location.hash, window.origin),
          currentParams: ((_currentMatches$ = currentMatches[0]) === null || _currentMatches$ === void 0 ? void 0 : _currentMatches$.params) || {},
          nextUrl: new URL(page, window.origin),
          nextParams: match.params,
          defaultShouldRevalidate
        });
        if (typeof routeChoice === "boolean") {
          return routeChoice;
        }
      }
      return defaultShouldRevalidate;
    })
  ) : nextMatches.filter((match, index2) => {
    let manifestRoute = manifest.routes[match.route.id];
    return (mode2 === "assets" || manifestRoute.hasLoader) && (isNew(match, index2) || matchPathChanged(match, index2));
  });
  return newMatches;
}
function getDataLinkHrefs(page, matches, manifest) {
  let path = parsePathPatch(page);
  return dedupeHrefs(matches.filter((match) => manifest.routes[match.route.id].hasLoader && !manifest.routes[match.route.id].hasClientLoader).map((match) => {
    let {
      pathname,
      search
    } = path;
    let searchParams = new URLSearchParams(search);
    searchParams.set("_data", match.route.id);
    return `${pathname}?${searchParams}`;
  }));
}
function getModuleLinkHrefs(matches, manifestPatch) {
  return dedupeHrefs(matches.map((match) => {
    let route = manifestPatch.routes[match.route.id];
    let hrefs = [route.module];
    if (route.imports) {
      hrefs = hrefs.concat(route.imports);
    }
    return hrefs;
  }).flat(1));
}
function getCurrentPageModulePreloadHrefs(matches, manifest) {
  return dedupeHrefs(matches.map((match) => {
    let route = manifest.routes[match.route.id];
    let hrefs = [route.module];
    if (route.imports) {
      hrefs = hrefs.concat(route.imports);
    }
    return hrefs;
  }).flat(1));
}
function dedupeHrefs(hrefs) {
  return [...new Set(hrefs)];
}
function sortKeys(obj) {
  let sorted = {};
  let keys = Object.keys(obj).sort();
  for (let key of keys) {
    sorted[key] = obj[key];
  }
  return sorted;
}
function dedupeLinkDescriptors(descriptors, preloads) {
  let set = /* @__PURE__ */ new Set();
  let preloadsSet = new Set(preloads);
  return descriptors.reduce((deduped, descriptor) => {
    let alreadyModulePreload = preloads && !isPageLinkDescriptor(descriptor) && descriptor.as === "script" && descriptor.href && preloadsSet.has(descriptor.href);
    if (alreadyModulePreload) {
      return deduped;
    }
    let key = JSON.stringify(sortKeys(descriptor));
    if (!set.has(key)) {
      set.add(key);
      deduped.push({
        key,
        link: descriptor
      });
    }
    return deduped;
  }, []);
}
function parsePathPatch(href) {
  let path = parsePath(href);
  if (path.search === void 0) path.search = "";
  return path;
}
/**
 * @remix-run/react v2.17.4
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
const ESCAPE_LOOKUP$1 = {
  "&": "\\u0026",
  ">": "\\u003e",
  "<": "\\u003c",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
const ESCAPE_REGEX$1 = /[&><\u2028\u2029]/g;
function escapeHtml(html) {
  return html.replace(ESCAPE_REGEX$1, (match) => ESCAPE_LOOKUP$1[match]);
}
function createHtml(html) {
  return {
    __html: html
  };
}
/**
 * @remix-run/react v2.17.4
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function StreamTransfer({
  context,
  identifier,
  reader,
  textDecoder,
  nonce
}) {
  if (!context.renderMeta || !context.renderMeta.didRenderScripts) {
    return null;
  }
  if (!context.renderMeta.streamCache) {
    context.renderMeta.streamCache = {};
  }
  let {
    streamCache
  } = context.renderMeta;
  let promise = streamCache[identifier];
  if (!promise) {
    promise = streamCache[identifier] = reader.read().then((result) => {
      streamCache[identifier].result = {
        done: result.done,
        value: textDecoder.decode(result.value, {
          stream: true
        })
      };
    }).catch((e2) => {
      streamCache[identifier].error = e2;
    });
  }
  if (promise.error) {
    throw promise.error;
  }
  if (promise.result === void 0) {
    throw promise;
  }
  let {
    done,
    value
  } = promise.result;
  let scriptTag = value ? /* @__PURE__ */ reactExports.createElement("script", {
    nonce,
    dangerouslySetInnerHTML: {
      __html: `window.__remixContext.streamController.enqueue(${escapeHtml(JSON.stringify(value))});`
    }
  }) : null;
  if (done) {
    return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, scriptTag, /* @__PURE__ */ reactExports.createElement("script", {
      nonce,
      dangerouslySetInnerHTML: {
        __html: `window.__remixContext.streamController.close();`
      }
    }));
  } else {
    return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, scriptTag, /* @__PURE__ */ reactExports.createElement(reactExports.Suspense, null, /* @__PURE__ */ reactExports.createElement(StreamTransfer, {
      context,
      identifier: identifier + 1,
      reader,
      textDecoder,
      nonce
    })));
  }
}
function singleFetchUrl(reqUrl) {
  let url = typeof reqUrl === "string" ? new URL(
    reqUrl,
    // This can be called during the SSR flow via PrefetchPageLinksImpl so
    // don't assume window is available
    typeof window === "undefined" ? "server://singlefetch/" : window.location.origin
  ) : reqUrl;
  if (url.pathname === "/") {
    url.pathname = "_root.data";
  } else {
    url.pathname = `${url.pathname.replace(/\/$/, "")}.data`;
  }
  return url;
}
/**
 * @remix-run/react v2.17.4
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
class RemixErrorBoundary extends reactExports.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: props.error || null,
      location: props.location
    };
  }
  static getDerivedStateFromError(error) {
    return {
      error
    };
  }
  static getDerivedStateFromProps(props, state) {
    if (state.location !== props.location) {
      return {
        error: props.error || null,
        location: props.location
      };
    }
    return {
      error: props.error || state.error,
      location: state.location
    };
  }
  render() {
    if (this.state.error) {
      return /* @__PURE__ */ reactExports.createElement(RemixRootDefaultErrorBoundary, {
        error: this.state.error,
        isOutsideRemixApp: true
      });
    } else {
      return this.props.children;
    }
  }
}
function RemixRootDefaultErrorBoundary({
  error,
  isOutsideRemixApp
}) {
  console.error(error);
  let heyDeveloper = /* @__PURE__ */ reactExports.createElement("script", {
    dangerouslySetInnerHTML: {
      __html: `
        console.log(
          "💿 Hey developer 👋. You can provide a way better UX than this when your app throws errors. Check out https://remix.run/guides/errors for more information."
        );
      `
    }
  });
  if (isRouteErrorResponse(error)) {
    return /* @__PURE__ */ reactExports.createElement(BoundaryShell, {
      title: "Unhandled Thrown Response!"
    }, /* @__PURE__ */ reactExports.createElement("h1", {
      style: {
        fontSize: "24px"
      }
    }, error.status, " ", error.statusText), heyDeveloper);
  }
  let errorInstance;
  if (error instanceof Error) {
    errorInstance = error;
  } else {
    let errorString = error == null ? "Unknown Error" : typeof error === "object" && "toString" in error ? error.toString() : JSON.stringify(error);
    errorInstance = new Error(errorString);
  }
  return /* @__PURE__ */ reactExports.createElement(BoundaryShell, {
    title: "Application Error!",
    isOutsideRemixApp
  }, /* @__PURE__ */ reactExports.createElement("h1", {
    style: {
      fontSize: "24px"
    }
  }, "Application Error"), /* @__PURE__ */ reactExports.createElement("pre", {
    style: {
      padding: "2rem",
      background: "hsla(10, 50%, 50%, 0.1)",
      color: "red",
      overflow: "auto"
    }
  }, errorInstance.stack), heyDeveloper);
}
function BoundaryShell({
  title,
  renderScripts,
  isOutsideRemixApp,
  children
}) {
  var _routeModules$root;
  let {
    routeModules
  } = useRemixContext();
  if ((_routeModules$root = routeModules.root) !== null && _routeModules$root !== void 0 && _routeModules$root.Layout && !isOutsideRemixApp) {
    return children;
  }
  return /* @__PURE__ */ reactExports.createElement("html", {
    lang: "en"
  }, /* @__PURE__ */ reactExports.createElement("head", null, /* @__PURE__ */ reactExports.createElement("meta", {
    charSet: "utf-8"
  }), /* @__PURE__ */ reactExports.createElement("meta", {
    name: "viewport",
    content: "width=device-width,initial-scale=1,viewport-fit=cover"
  }), /* @__PURE__ */ reactExports.createElement("title", null, title)), /* @__PURE__ */ reactExports.createElement("body", null, /* @__PURE__ */ reactExports.createElement("main", {
    style: {
      fontFamily: "system-ui, sans-serif",
      padding: "2rem"
    }
  }, children, renderScripts ? /* @__PURE__ */ reactExports.createElement(Scripts, null) : null)));
}
/**
 * @remix-run/react v2.17.4
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function RemixRootDefaultHydrateFallback() {
  return /* @__PURE__ */ reactExports.createElement(BoundaryShell, {
    title: "Loading...",
    renderScripts: true
  }, /* @__PURE__ */ reactExports.createElement("script", {
    dangerouslySetInnerHTML: {
      __html: `
              console.log(
                "💿 Hey developer 👋. You can provide a way better UX than this " +
                "when your app is loading JS modules and/or running \`clientLoader\` " +
                "functions. Check out https://remix.run/route/hydrate-fallback " +
                "for more information."
              );
            `
    }
  }));
}
/**
 * @remix-run/react v2.17.4
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function groupRoutesByParentId(manifest) {
  let routes2 = {};
  Object.values(manifest).forEach((route) => {
    let parentId = route.parentId || "";
    if (!routes2[parentId]) {
      routes2[parentId] = [];
    }
    routes2[parentId].push(route);
  });
  return routes2;
}
function getRouteComponents(route, routeModule, isSpaMode2) {
  let Component = getRouteModuleComponent(routeModule);
  let HydrateFallback = routeModule.HydrateFallback && (!isSpaMode2 || route.id === "root") ? routeModule.HydrateFallback : route.id === "root" ? RemixRootDefaultHydrateFallback : void 0;
  let ErrorBoundary = routeModule.ErrorBoundary ? routeModule.ErrorBoundary : route.id === "root" ? () => /* @__PURE__ */ reactExports.createElement(RemixRootDefaultErrorBoundary, {
    error: useRouteError()
  }) : void 0;
  if (route.id === "root" && routeModule.Layout) {
    return {
      ...Component ? {
        element: /* @__PURE__ */ reactExports.createElement(routeModule.Layout, null, /* @__PURE__ */ reactExports.createElement(Component, null))
      } : {
        Component
      },
      ...ErrorBoundary ? {
        errorElement: /* @__PURE__ */ reactExports.createElement(routeModule.Layout, null, /* @__PURE__ */ reactExports.createElement(ErrorBoundary, null))
      } : {
        ErrorBoundary
      },
      ...HydrateFallback ? {
        hydrateFallbackElement: /* @__PURE__ */ reactExports.createElement(routeModule.Layout, null, /* @__PURE__ */ reactExports.createElement(HydrateFallback, null))
      } : {
        HydrateFallback
      }
    };
  }
  return {
    Component,
    ErrorBoundary,
    HydrateFallback
  };
}
function createServerRoutes(manifest, routeModules, future2, isSpaMode2, parentId = "", routesByParentId = groupRoutesByParentId(manifest), spaModeLazyPromise = Promise.resolve({
  Component: () => null
})) {
  return (routesByParentId[parentId] || []).map((route) => {
    let routeModule = routeModules[route.id];
    invariant(routeModule, "No `routeModule` available to create server routes");
    let dataRoute = {
      ...getRouteComponents(route, routeModule, isSpaMode2),
      caseSensitive: route.caseSensitive,
      id: route.id,
      index: route.index,
      path: route.path,
      handle: routeModule.handle,
      // For SPA Mode, all routes are lazy except root.  However we tell the
      // router root is also lazy here too since we don't need a full
      // implementation - we just need a `lazy` prop to tell the RR rendering
      // where to stop which is always at the root route in SPA mode
      lazy: isSpaMode2 ? () => spaModeLazyPromise : void 0,
      // For partial hydration rendering, we need to indicate when the route
      // has a loader/clientLoader, but it won't ever be called during the static
      // render, so just give it a no-op function so we can render down to the
      // proper fallback
      loader: route.hasLoader || route.hasClientLoader ? () => null : void 0
      // We don't need action/shouldRevalidate on these routes since they're
      // for a static render
    };
    let children = createServerRoutes(manifest, routeModules, future2, isSpaMode2, route.id, routesByParentId, spaModeLazyPromise);
    if (children.length > 0) dataRoute.children = children;
    return dataRoute;
  });
}
function getRouteModuleComponent(routeModule) {
  if (routeModule.default == null) return void 0;
  let isEmptyObject = typeof routeModule.default === "object" && Object.keys(routeModule.default).length === 0;
  if (!isEmptyObject) {
    return routeModule.default;
  }
}
function shouldHydrateRouteLoader(route, routeModule, isSpaMode2) {
  return isSpaMode2 && route.id !== "root" || routeModule.clientLoader != null && (routeModule.clientLoader.hydrate === true || route.hasLoader !== true);
}
/**
 * @remix-run/react v2.17.4
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function isFogOfWarEnabled(future2, isSpaMode2) {
  return future2.v3_lazyRouteDiscovery === true && !isSpaMode2;
}
function getPartialManifest(manifest, router) {
  let routeIds = new Set(router.state.matches.map((m2) => m2.route.id));
  let segments = router.state.location.pathname.split("/").filter(Boolean);
  let paths = ["/"];
  segments.pop();
  while (segments.length > 0) {
    paths.push(`/${segments.join("/")}`);
    segments.pop();
  }
  paths.forEach((path) => {
    let matches = matchRoutes(router.routes, path, router.basename);
    if (matches) {
      matches.forEach((m2) => routeIds.add(m2.route.id));
    }
  });
  let initialRoutes = [...routeIds].reduce((acc, id2) => Object.assign(acc, {
    [id2]: manifest.routes[id2]
  }), {});
  return {
    ...manifest,
    routes: initialRoutes
  };
}
function useDataRouterContext() {
  let context = reactExports.useContext(DataRouterContext);
  invariant(context, "You must render this element inside a <DataRouterContext.Provider> element");
  return context;
}
function useDataRouterStateContext() {
  let context = reactExports.useContext(DataRouterStateContext);
  invariant(context, "You must render this element inside a <DataRouterStateContext.Provider> element");
  return context;
}
const RemixContext = /* @__PURE__ */ reactExports.createContext(void 0);
RemixContext.displayName = "Remix";
function useRemixContext() {
  let context = reactExports.useContext(RemixContext);
  invariant(context, "You must render this element inside a <Remix> element");
  return context;
}
function usePrefetchBehavior(prefetch, theirElementProps) {
  let [maybePrefetch, setMaybePrefetch] = reactExports.useState(false);
  let [shouldPrefetch, setShouldPrefetch] = reactExports.useState(false);
  let {
    onFocus,
    onBlur,
    onMouseEnter,
    onMouseLeave,
    onTouchStart
  } = theirElementProps;
  let ref = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (prefetch === "render") {
      setShouldPrefetch(true);
    }
    if (prefetch === "viewport") {
      let callback = (entries) => {
        entries.forEach((entry2) => {
          setShouldPrefetch(entry2.isIntersecting);
        });
      };
      let observer = new IntersectionObserver(callback, {
        threshold: 0.5
      });
      if (ref.current) observer.observe(ref.current);
      return () => {
        observer.disconnect();
      };
    }
  }, [prefetch]);
  let setIntent = () => {
    if (prefetch === "intent") {
      setMaybePrefetch(true);
    }
  };
  let cancelIntent = () => {
    if (prefetch === "intent") {
      setMaybePrefetch(false);
      setShouldPrefetch(false);
    }
  };
  reactExports.useEffect(() => {
    if (maybePrefetch) {
      let id2 = setTimeout(() => {
        setShouldPrefetch(true);
      }, 100);
      return () => {
        clearTimeout(id2);
      };
    }
  }, [maybePrefetch]);
  return [shouldPrefetch, ref, {
    onFocus: composeEventHandlers(onFocus, setIntent),
    onBlur: composeEventHandlers(onBlur, cancelIntent),
    onMouseEnter: composeEventHandlers(onMouseEnter, setIntent),
    onMouseLeave: composeEventHandlers(onMouseLeave, cancelIntent),
    onTouchStart: composeEventHandlers(onTouchStart, setIntent)
  }];
}
const ABSOLUTE_URL_REGEX$1 = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
function getDiscoverAttr(discover, isAbsolute, reloadDocument) {
  return discover === "render" && !isAbsolute && !reloadDocument ? "true" : void 0;
}
let NavLink = /* @__PURE__ */ reactExports.forwardRef(({
  to,
  prefetch = "none",
  discover = "render",
  ...props
}, forwardedRef) => {
  let isAbsolute = typeof to === "string" && ABSOLUTE_URL_REGEX$1.test(to);
  let href = useHref(to);
  let [shouldPrefetch, ref, prefetchHandlers] = usePrefetchBehavior(prefetch, props);
  return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, /* @__PURE__ */ reactExports.createElement(NavLink$1, _extends({}, props, prefetchHandlers, {
    ref: mergeRefs(forwardedRef, ref),
    to,
    "data-discover": getDiscoverAttr(discover, isAbsolute, props.reloadDocument)
  })), shouldPrefetch && !isAbsolute ? /* @__PURE__ */ reactExports.createElement(PrefetchPageLinks, {
    page: href
  }) : null);
});
NavLink.displayName = "NavLink";
let Link = /* @__PURE__ */ reactExports.forwardRef(({
  to,
  prefetch = "none",
  discover = "render",
  ...props
}, forwardedRef) => {
  let isAbsolute = typeof to === "string" && ABSOLUTE_URL_REGEX$1.test(to);
  let href = useHref(to);
  let [shouldPrefetch, ref, prefetchHandlers] = usePrefetchBehavior(prefetch, props);
  return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, /* @__PURE__ */ reactExports.createElement(Link$1, _extends({}, props, prefetchHandlers, {
    ref: mergeRefs(forwardedRef, ref),
    to,
    "data-discover": getDiscoverAttr(discover, isAbsolute, props.reloadDocument)
  })), shouldPrefetch && !isAbsolute ? /* @__PURE__ */ reactExports.createElement(PrefetchPageLinks, {
    page: href
  }) : null);
});
Link.displayName = "Link";
let Form = /* @__PURE__ */ reactExports.forwardRef(({
  discover = "render",
  ...props
}, forwardedRef) => {
  let isAbsolute = typeof props.action === "string" && ABSOLUTE_URL_REGEX$1.test(props.action);
  return /* @__PURE__ */ reactExports.createElement(Form$1, _extends({}, props, {
    ref: forwardedRef,
    "data-discover": getDiscoverAttr(discover, isAbsolute, props.reloadDocument)
  }));
});
Form.displayName = "Form";
function composeEventHandlers(theirHandler, ourHandler) {
  return (event) => {
    theirHandler && theirHandler(event);
    if (!event.defaultPrevented) {
      ourHandler(event);
    }
  };
}
function getActiveMatches(matches, errors, isSpaMode2) {
  if (isSpaMode2 && !isHydrated) {
    return [matches[0]];
  }
  if (errors) {
    let errorIdx = matches.findIndex((m2) => errors[m2.route.id] !== void 0);
    return matches.slice(0, errorIdx + 1);
  }
  return matches;
}
function Links() {
  let {
    isSpaMode: isSpaMode2,
    manifest,
    routeModules,
    criticalCss
  } = useRemixContext();
  let {
    errors,
    matches: routerMatches
  } = useDataRouterStateContext();
  let matches = getActiveMatches(routerMatches, errors, isSpaMode2);
  let keyedLinks = reactExports.useMemo(() => getKeyedLinksForMatches(matches, routeModules, manifest), [matches, routeModules, manifest]);
  return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, criticalCss ? /* @__PURE__ */ reactExports.createElement("style", {
    dangerouslySetInnerHTML: {
      __html: criticalCss
    }
  }) : null, keyedLinks.map(({
    key,
    link
  }) => isPageLinkDescriptor(link) ? /* @__PURE__ */ reactExports.createElement(PrefetchPageLinks, _extends({
    key
  }, link)) : /* @__PURE__ */ reactExports.createElement("link", _extends({
    key
  }, link))));
}
function PrefetchPageLinks({
  page,
  ...dataLinkProps
}) {
  let {
    router
  } = useDataRouterContext();
  let matches = reactExports.useMemo(() => matchRoutes(router.routes, page, router.basename), [router.routes, page, router.basename]);
  if (!matches) {
    console.warn(`Tried to prefetch ${page} but no routes matched.`);
    return null;
  }
  return /* @__PURE__ */ reactExports.createElement(PrefetchPageLinksImpl, _extends({
    page,
    matches
  }, dataLinkProps));
}
function useKeyedPrefetchLinks(matches) {
  let {
    manifest,
    routeModules
  } = useRemixContext();
  let [keyedPrefetchLinks, setKeyedPrefetchLinks] = reactExports.useState([]);
  reactExports.useEffect(() => {
    let interrupted = false;
    void getKeyedPrefetchLinks(matches, manifest, routeModules).then((links2) => {
      if (!interrupted) {
        setKeyedPrefetchLinks(links2);
      }
    });
    return () => {
      interrupted = true;
    };
  }, [matches, manifest, routeModules]);
  return keyedPrefetchLinks;
}
function PrefetchPageLinksImpl({
  page,
  matches: nextMatches,
  ...linkProps
}) {
  let location = useLocation();
  let {
    future: future2,
    manifest,
    routeModules
  } = useRemixContext();
  let {
    loaderData,
    matches
  } = useDataRouterStateContext();
  let newMatchesForData = reactExports.useMemo(() => getNewMatchesForLinks(page, nextMatches, matches, manifest, location, future2, "data"), [page, nextMatches, matches, manifest, location, future2]);
  let dataHrefs = reactExports.useMemo(() => {
    if (!future2.v3_singleFetch) {
      return getDataLinkHrefs(page, newMatchesForData, manifest);
    }
    if (page === location.pathname + location.search + location.hash) {
      return [];
    }
    let routesParams = /* @__PURE__ */ new Set();
    let foundOptOutRoute = false;
    nextMatches.forEach((m2) => {
      var _routeModules$m$route;
      if (!manifest.routes[m2.route.id].hasLoader) {
        return;
      }
      if (!newMatchesForData.some((m22) => m22.route.id === m2.route.id) && m2.route.id in loaderData && (_routeModules$m$route = routeModules[m2.route.id]) !== null && _routeModules$m$route !== void 0 && _routeModules$m$route.shouldRevalidate) {
        foundOptOutRoute = true;
      } else if (manifest.routes[m2.route.id].hasClientLoader) {
        foundOptOutRoute = true;
      } else {
        routesParams.add(m2.route.id);
      }
    });
    if (routesParams.size === 0) {
      return [];
    }
    let url = singleFetchUrl(page);
    if (foundOptOutRoute && routesParams.size > 0) {
      url.searchParams.set("_routes", nextMatches.filter((m2) => routesParams.has(m2.route.id)).map((m2) => m2.route.id).join(","));
    }
    return [url.pathname + url.search];
  }, [future2.v3_singleFetch, loaderData, location, manifest, newMatchesForData, nextMatches, page, routeModules]);
  let newMatchesForAssets = reactExports.useMemo(() => getNewMatchesForLinks(page, nextMatches, matches, manifest, location, future2, "assets"), [page, nextMatches, matches, manifest, location, future2]);
  let moduleHrefs = reactExports.useMemo(() => getModuleLinkHrefs(newMatchesForAssets, manifest), [newMatchesForAssets, manifest]);
  let keyedPrefetchLinks = useKeyedPrefetchLinks(newMatchesForAssets);
  return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, dataHrefs.map((href) => /* @__PURE__ */ reactExports.createElement("link", _extends({
    key: href,
    rel: "prefetch",
    as: "fetch",
    href
  }, linkProps))), moduleHrefs.map((href) => /* @__PURE__ */ reactExports.createElement("link", _extends({
    key: href,
    rel: "modulepreload",
    href
  }, linkProps))), keyedPrefetchLinks.map(({
    key,
    link
  }) => (
    // these don't spread `linkProps` because they are full link descriptors
    // already with their own props
    /* @__PURE__ */ reactExports.createElement("link", _extends({
      key
    }, link))
  )));
}
function Meta() {
  let {
    isSpaMode: isSpaMode2,
    routeModules
  } = useRemixContext();
  let {
    errors,
    matches: routerMatches,
    loaderData
  } = useDataRouterStateContext();
  let location = useLocation();
  let _matches = getActiveMatches(routerMatches, errors, isSpaMode2);
  let error = null;
  if (errors) {
    error = errors[_matches[_matches.length - 1].route.id];
  }
  let meta2 = [];
  let leafMeta = null;
  let matches = [];
  for (let i2 = 0; i2 < _matches.length; i2++) {
    let _match = _matches[i2];
    let routeId = _match.route.id;
    let data = loaderData[routeId];
    let params = _match.params;
    let routeModule = routeModules[routeId];
    let routeMeta = [];
    let match = {
      id: routeId,
      data,
      meta: [],
      params: _match.params,
      pathname: _match.pathname,
      handle: _match.route.handle,
      error
    };
    matches[i2] = match;
    if (routeModule !== null && routeModule !== void 0 && routeModule.meta) {
      routeMeta = typeof routeModule.meta === "function" ? routeModule.meta({
        data,
        params,
        location,
        matches,
        error
      }) : Array.isArray(routeModule.meta) ? [...routeModule.meta] : routeModule.meta;
    } else if (leafMeta) {
      routeMeta = [...leafMeta];
    }
    routeMeta = routeMeta || [];
    if (!Array.isArray(routeMeta)) {
      throw new Error("The route at " + _match.route.path + " returns an invalid value. All route meta functions must return an array of meta objects.\n\nTo reference the meta function API, see https://remix.run/route/meta");
    }
    match.meta = routeMeta;
    matches[i2] = match;
    meta2 = [...routeMeta];
    leafMeta = meta2;
  }
  return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, meta2.flat().map((metaProps) => {
    if (!metaProps) {
      return null;
    }
    if ("tagName" in metaProps) {
      let {
        tagName,
        ...rest
      } = metaProps;
      if (!isValidMetaTag(tagName)) {
        console.warn(`A meta object uses an invalid tagName: ${tagName}. Expected either 'link' or 'meta'`);
        return null;
      }
      let Comp = tagName;
      return /* @__PURE__ */ reactExports.createElement(Comp, _extends({
        key: JSON.stringify(rest)
      }, rest));
    }
    if ("title" in metaProps) {
      return /* @__PURE__ */ reactExports.createElement("title", {
        key: "title"
      }, String(metaProps.title));
    }
    if ("charset" in metaProps) {
      metaProps.charSet ?? (metaProps.charSet = metaProps.charset);
      delete metaProps.charset;
    }
    if ("charSet" in metaProps && metaProps.charSet != null) {
      return typeof metaProps.charSet === "string" ? /* @__PURE__ */ reactExports.createElement("meta", {
        key: "charSet",
        charSet: metaProps.charSet
      }) : null;
    }
    if ("script:ld+json" in metaProps) {
      try {
        let json2 = JSON.stringify(metaProps["script:ld+json"]);
        return /* @__PURE__ */ reactExports.createElement("script", {
          key: `script:ld+json:${json2}`,
          type: "application/ld+json",
          dangerouslySetInnerHTML: {
            __html: escapeHtml(json2)
          }
        });
      } catch (err) {
        return null;
      }
    }
    return /* @__PURE__ */ reactExports.createElement("meta", _extends({
      key: JSON.stringify(metaProps)
    }, metaProps));
  }));
}
function isValidMetaTag(tagName) {
  return typeof tagName === "string" && /^(meta|link)$/.test(tagName);
}
function Await(props) {
  return /* @__PURE__ */ reactExports.createElement(Await$1, props);
}
let isHydrated = false;
function Scripts(props) {
  let {
    manifest,
    serverHandoffString,
    abortDelay,
    serializeError,
    isSpaMode: isSpaMode2,
    future: future2,
    renderMeta
  } = useRemixContext();
  let {
    router,
    static: isStatic,
    staticContext
  } = useDataRouterContext();
  let {
    matches: routerMatches
  } = useDataRouterStateContext();
  let enableFogOfWar = isFogOfWarEnabled(future2, isSpaMode2);
  if (renderMeta) {
    renderMeta.didRenderScripts = true;
  }
  let matches = getActiveMatches(routerMatches, null, isSpaMode2);
  reactExports.useEffect(() => {
    isHydrated = true;
  }, []);
  let serializePreResolvedErrorImp = (key, error) => {
    let toSerialize;
    if (serializeError && error instanceof Error) {
      toSerialize = serializeError(error);
    } else {
      toSerialize = error;
    }
    return `${JSON.stringify(key)}:__remixContext.p(!1, ${escapeHtml(JSON.stringify(toSerialize))})`;
  };
  let serializePreresolvedDataImp = (routeId, key, data) => {
    let serializedData;
    try {
      serializedData = JSON.stringify(data);
    } catch (error) {
      return serializePreResolvedErrorImp(key, error);
    }
    return `${JSON.stringify(key)}:__remixContext.p(${escapeHtml(serializedData)})`;
  };
  let serializeErrorImp = (routeId, key, error) => {
    let toSerialize;
    if (serializeError && error instanceof Error) {
      toSerialize = serializeError(error);
    } else {
      toSerialize = error;
    }
    return `__remixContext.r(${JSON.stringify(routeId)}, ${JSON.stringify(key)}, !1, ${escapeHtml(JSON.stringify(toSerialize))})`;
  };
  let serializeDataImp = (routeId, key, data) => {
    let serializedData;
    try {
      serializedData = JSON.stringify(data);
    } catch (error) {
      return serializeErrorImp(routeId, key, error);
    }
    return `__remixContext.r(${JSON.stringify(routeId)}, ${JSON.stringify(key)}, ${escapeHtml(serializedData)})`;
  };
  let deferredScripts = [];
  let initialScripts = reactExports.useMemo(() => {
    var _manifest$hmr;
    let streamScript = future2.v3_singleFetch ? (
      // prettier-ignore
      "window.__remixContext.stream = new ReadableStream({start(controller){window.__remixContext.streamController = controller;}}).pipeThrough(new TextEncoderStream());"
    ) : "";
    let contextScript = staticContext ? `window.__remixContext = ${serverHandoffString};${streamScript}` : " ";
    let activeDeferreds = future2.v3_singleFetch ? void 0 : staticContext === null || staticContext === void 0 ? void 0 : staticContext.activeDeferreds;
    contextScript += !activeDeferreds ? "" : ["__remixContext.p = function(v,e,p,x) {", "  if (typeof e !== 'undefined') {", '    x=new Error("Unexpected Server Error");\n    x.stack=undefined;', "    p=Promise.reject(x);", "  } else {", "    p=Promise.resolve(v);", "  }", "  return p;", "};", "__remixContext.n = function(i,k) {", "  __remixContext.t = __remixContext.t || {};", "  __remixContext.t[i] = __remixContext.t[i] || {};", "  let p = new Promise((r, e) => {__remixContext.t[i][k] = {r:(v)=>{r(v);},e:(v)=>{e(v);}};});", typeof abortDelay === "number" ? `setTimeout(() => {if(typeof p._error !== "undefined" || typeof p._data !== "undefined"){return;} __remixContext.t[i][k].e(new Error("Server timeout."))}, ${abortDelay});` : "", "  return p;", "};", "__remixContext.r = function(i,k,v,e,p,x) {", "  p = __remixContext.t[i][k];", "  if (typeof e !== 'undefined') {", '    x=new Error("Unexpected Server Error");\n    x.stack=undefined;', "    p.e(x);", "  } else {", "    p.r(v);", "  }", "};"].join("\n") + Object.entries(activeDeferreds).map(([routeId, deferredData]) => {
      let pendingKeys = new Set(deferredData.pendingKeys);
      let promiseKeyValues = deferredData.deferredKeys.map((key) => {
        if (pendingKeys.has(key)) {
          deferredScripts.push(/* @__PURE__ */ reactExports.createElement(DeferredHydrationScript, {
            key: `${routeId} | ${key}`,
            deferredData,
            routeId,
            dataKey: key,
            scriptProps: props,
            serializeData: serializeDataImp,
            serializeError: serializeErrorImp
          }));
          return `${JSON.stringify(key)}:__remixContext.n(${JSON.stringify(routeId)}, ${JSON.stringify(key)})`;
        } else {
          let trackedPromise = deferredData.data[key];
          if (typeof trackedPromise._error !== "undefined") {
            return serializePreResolvedErrorImp(key, trackedPromise._error);
          } else {
            return serializePreresolvedDataImp(routeId, key, trackedPromise._data);
          }
        }
      }).join(",\n");
      return `Object.assign(__remixContext.state.loaderData[${JSON.stringify(routeId)}], {${promiseKeyValues}});`;
    }).join("\n") + (deferredScripts.length > 0 ? `__remixContext.a=${deferredScripts.length};` : "");
    let routeModulesScript = !isStatic ? " " : `${(_manifest$hmr = manifest.hmr) !== null && _manifest$hmr !== void 0 && _manifest$hmr.runtime ? `import ${JSON.stringify(manifest.hmr.runtime)};` : ""}${enableFogOfWar ? "" : `import ${JSON.stringify(manifest.url)}`};
${matches.map((match, index2) => `import * as route${index2} from ${JSON.stringify(manifest.routes[match.route.id].module)};`).join("\n")}
${enableFogOfWar ? (
      // Inline a minimal manifest with the SSR matches
      `window.__remixManifest = ${JSON.stringify(getPartialManifest(manifest, router), null, 2)};`
    ) : ""}
window.__remixRouteModules = {${matches.map((match, index2) => `${JSON.stringify(match.route.id)}:route${index2}`).join(",")}};

import(${JSON.stringify(manifest.entry.module)});`;
    return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, /* @__PURE__ */ reactExports.createElement("script", _extends({}, props, {
      suppressHydrationWarning: true,
      dangerouslySetInnerHTML: createHtml(contextScript),
      type: void 0
    })), /* @__PURE__ */ reactExports.createElement("script", _extends({}, props, {
      suppressHydrationWarning: true,
      dangerouslySetInnerHTML: createHtml(routeModulesScript),
      type: "module",
      async: true
    })));
  }, []);
  if (!isStatic && typeof __remixContext === "object" && __remixContext.a) {
    for (let i2 = 0; i2 < __remixContext.a; i2++) {
      deferredScripts.push(/* @__PURE__ */ reactExports.createElement(DeferredHydrationScript, {
        key: i2,
        scriptProps: props,
        serializeData: serializeDataImp,
        serializeError: serializeErrorImp
      }));
    }
  }
  let routePreloads = matches.map((match) => {
    let route = manifest.routes[match.route.id];
    return (route.imports || []).concat([route.module]);
  }).flat(1);
  let preloads = isHydrated ? [] : manifest.entry.imports.concat(routePreloads);
  return isHydrated ? null : /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, !enableFogOfWar ? /* @__PURE__ */ reactExports.createElement("link", {
    rel: "modulepreload",
    href: manifest.url,
    crossOrigin: props.crossOrigin
  }) : null, /* @__PURE__ */ reactExports.createElement("link", {
    rel: "modulepreload",
    href: manifest.entry.module,
    crossOrigin: props.crossOrigin
  }), dedupe(preloads).map((path) => /* @__PURE__ */ reactExports.createElement("link", {
    key: path,
    rel: "modulepreload",
    href: path,
    crossOrigin: props.crossOrigin
  })), initialScripts, deferredScripts);
}
function DeferredHydrationScript({
  dataKey,
  deferredData,
  routeId,
  scriptProps,
  serializeData,
  serializeError
}) {
  if (typeof document === "undefined" && deferredData && dataKey && routeId) {
    invariant(deferredData.pendingKeys.includes(dataKey), `Deferred data for route ${routeId} with key ${dataKey} was not pending but tried to render a script for it.`);
  }
  return /* @__PURE__ */ reactExports.createElement(reactExports.Suspense, {
    fallback: (
      // This makes absolutely no sense. The server renders null as a fallback,
      // but when hydrating, we need to render a script tag to avoid a hydration issue.
      // To reproduce a hydration mismatch, just render null as a fallback.
      typeof document === "undefined" && deferredData && dataKey && routeId ? null : /* @__PURE__ */ reactExports.createElement("script", _extends({}, scriptProps, {
        async: true,
        suppressHydrationWarning: true,
        dangerouslySetInnerHTML: {
          __html: " "
        }
      }))
    )
  }, typeof document === "undefined" && deferredData && dataKey && routeId ? /* @__PURE__ */ reactExports.createElement(Await, {
    resolve: deferredData.data[dataKey],
    errorElement: /* @__PURE__ */ reactExports.createElement(ErrorDeferredHydrationScript, {
      dataKey,
      routeId,
      scriptProps,
      serializeError
    }),
    children: (data) => {
      return /* @__PURE__ */ reactExports.createElement("script", _extends({}, scriptProps, {
        async: true,
        suppressHydrationWarning: true,
        dangerouslySetInnerHTML: {
          __html: serializeData(routeId, dataKey, data)
        }
      }));
    }
  }) : /* @__PURE__ */ reactExports.createElement("script", _extends({}, scriptProps, {
    async: true,
    suppressHydrationWarning: true,
    dangerouslySetInnerHTML: {
      __html: " "
    }
  })));
}
function ErrorDeferredHydrationScript({
  dataKey,
  routeId,
  scriptProps,
  serializeError
}) {
  let error = useAsyncError();
  return /* @__PURE__ */ reactExports.createElement("script", _extends({}, scriptProps, {
    suppressHydrationWarning: true,
    dangerouslySetInnerHTML: {
      __html: serializeError(routeId, dataKey, error)
    }
  }));
}
function dedupe(array) {
  return [...new Set(array)];
}
function useLoaderData() {
  return useLoaderData$1();
}
function mergeRefs(...refs) {
  return (value) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(value);
      } else if (ref != null) {
        ref.current = value;
      }
    });
  };
}
/**
 * @remix-run/react v2.17.4
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
let STORAGE_KEY = "positions";
function ScrollRestoration({
  getKey,
  ...props
}) {
  let {
    isSpaMode: isSpaMode2
  } = useRemixContext();
  let location = useLocation();
  let matches = useMatches();
  useScrollRestoration({
    getKey,
    storageKey: STORAGE_KEY
  });
  let key = reactExports.useMemo(
    () => {
      if (!getKey) return null;
      let userKey = getKey(location, matches);
      return userKey !== location.key ? userKey : null;
    },
    // Nah, we only need this the first time for the SSR render
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  if (isSpaMode2) {
    return null;
  }
  let restoreScroll = ((STORAGE_KEY2, restoreKey) => {
    if (!window.history.state || !window.history.state.key) {
      let key2 = Math.random().toString(32).slice(2);
      window.history.replaceState({
        key: key2
      }, "");
    }
    try {
      let positions = JSON.parse(sessionStorage.getItem(STORAGE_KEY2) || "{}");
      let storedY = positions[restoreKey || window.history.state.key];
      if (typeof storedY === "number") {
        window.scrollTo(0, storedY);
      }
    } catch (error) {
      console.error(error);
      sessionStorage.removeItem(STORAGE_KEY2);
    }
  }).toString();
  return /* @__PURE__ */ reactExports.createElement("script", _extends({}, props, {
    suppressHydrationWarning: true,
    dangerouslySetInnerHTML: {
      __html: `(${restoreScroll})(${escapeHtml(JSON.stringify(STORAGE_KEY))}, ${escapeHtml(JSON.stringify(key))})`
    }
  }));
}
function StaticRouterProvider({
  context,
  router,
  hydrate = true,
  nonce
}) {
  !(router && context) ? invariant$1(false) : void 0;
  let dataRouterContext = {
    router,
    navigator: getStatelessNavigator(),
    static: true,
    staticContext: context,
    basename: context.basename || "/"
  };
  let fetchersContext = /* @__PURE__ */ new Map();
  let hydrateScript = "";
  if (hydrate !== false) {
    let data = {
      loaderData: context.loaderData,
      actionData: context.actionData,
      errors: serializeErrors(context.errors)
    };
    let json2 = htmlEscape(JSON.stringify(JSON.stringify(data)));
    hydrateScript = `window.__staticRouterHydrationData = JSON.parse(${json2});`;
  }
  let {
    state
  } = dataRouterContext.router;
  return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, /* @__PURE__ */ reactExports.createElement(DataRouterContext.Provider, {
    value: dataRouterContext
  }, /* @__PURE__ */ reactExports.createElement(DataRouterStateContext.Provider, {
    value: state
  }, /* @__PURE__ */ reactExports.createElement(FetchersContext.Provider, {
    value: fetchersContext
  }, /* @__PURE__ */ reactExports.createElement(ViewTransitionContext.Provider, {
    value: {
      isTransitioning: false
    }
  }, /* @__PURE__ */ reactExports.createElement(Router, {
    basename: dataRouterContext.basename,
    location: state.location,
    navigationType: state.historyAction,
    navigator: dataRouterContext.navigator,
    static: dataRouterContext.static,
    future: {
      v7_relativeSplatPath: router.future.v7_relativeSplatPath
    }
  }, /* @__PURE__ */ reactExports.createElement(DataRoutes, {
    routes: router.routes,
    future: router.future,
    state
  })))))), hydrateScript ? /* @__PURE__ */ reactExports.createElement("script", {
    suppressHydrationWarning: true,
    nonce,
    dangerouslySetInnerHTML: {
      __html: hydrateScript
    }
  }) : null);
}
function DataRoutes({
  routes: routes2,
  future: future2,
  state
}) {
  return useRoutesImpl(routes2, void 0, state, future2);
}
function serializeErrors(errors) {
  if (!errors) return null;
  let entries = Object.entries(errors);
  let serialized = {};
  for (let [key, val] of entries) {
    if (isRouteErrorResponse(val)) {
      serialized[key] = {
        ...val,
        __type: "RouteErrorResponse"
      };
    } else if (val instanceof Error) {
      serialized[key] = {
        message: val.message,
        __type: "Error",
        // If this is a subclass (i.e., ReferenceError), send up the type so we
        // can re-create the same type during hydration.
        ...val.name !== "Error" ? {
          __subType: val.name
        } : {}
      };
    } else {
      serialized[key] = val;
    }
  }
  return serialized;
}
function getStatelessNavigator() {
  return {
    createHref,
    encodeLocation,
    push(to) {
      throw new Error(`You cannot use navigator.push() on the server because it is a stateless environment. This error was probably triggered when you did a \`navigate(${JSON.stringify(to)})\` somewhere in your app.`);
    },
    replace(to) {
      throw new Error(`You cannot use navigator.replace() on the server because it is a stateless environment. This error was probably triggered when you did a \`navigate(${JSON.stringify(to)}, { replace: true })\` somewhere in your app.`);
    },
    go(delta) {
      throw new Error(`You cannot use navigator.go() on the server because it is a stateless environment. This error was probably triggered when you did a \`navigate(${delta})\` somewhere in your app.`);
    },
    back() {
      throw new Error(`You cannot use navigator.back() on the server because it is a stateless environment.`);
    },
    forward() {
      throw new Error(`You cannot use navigator.forward() on the server because it is a stateless environment.`);
    }
  };
}
function createStaticRouter(routes2, context, opts = {}) {
  let manifest = {};
  let dataRoutes = convertRoutesToDataRoutes(routes2, mapRouteProperties, void 0, manifest);
  let matches = context.matches.map((match) => {
    let route = manifest[match.route.id] || match.route;
    return {
      ...match,
      route
    };
  });
  let msg = (method) => `You cannot use router.${method}() on the server because it is a stateless environment`;
  return {
    get basename() {
      return context.basename;
    },
    get future() {
      var _a, _b;
      return {
        v7_fetcherPersist: false,
        v7_normalizeFormMethod: false,
        v7_partialHydration: ((_a = opts.future) == null ? void 0 : _a.v7_partialHydration) === true,
        v7_prependBasename: false,
        v7_relativeSplatPath: ((_b = opts.future) == null ? void 0 : _b.v7_relativeSplatPath) === true,
        v7_skipActionErrorRevalidation: false
      };
    },
    get state() {
      return {
        historyAction: Action.Pop,
        location: context.location,
        matches,
        loaderData: context.loaderData,
        actionData: context.actionData,
        errors: context.errors,
        initialized: true,
        navigation: IDLE_NAVIGATION,
        restoreScrollPosition: null,
        preventScrollReset: false,
        revalidation: "idle",
        fetchers: /* @__PURE__ */ new Map(),
        blockers: /* @__PURE__ */ new Map()
      };
    },
    get routes() {
      return dataRoutes;
    },
    get window() {
      return void 0;
    },
    initialize() {
      throw msg("initialize");
    },
    subscribe() {
      throw msg("subscribe");
    },
    enableScrollRestoration() {
      throw msg("enableScrollRestoration");
    },
    navigate() {
      throw msg("navigate");
    },
    fetch() {
      throw msg("fetch");
    },
    revalidate() {
      throw msg("revalidate");
    },
    createHref,
    encodeLocation,
    getFetcher() {
      return IDLE_FETCHER;
    },
    deleteFetcher() {
      throw msg("deleteFetcher");
    },
    dispose() {
      throw msg("dispose");
    },
    getBlocker() {
      return IDLE_BLOCKER;
    },
    deleteBlocker() {
      throw msg("deleteBlocker");
    },
    patchRoutes() {
      throw msg("patchRoutes");
    },
    _internalFetchControllers: /* @__PURE__ */ new Map(),
    _internalActiveDeferreds: /* @__PURE__ */ new Map(),
    _internalSetRoutes() {
      throw msg("_internalSetRoutes");
    }
  };
}
function createHref(to) {
  return typeof to === "string" ? to : createPath(to);
}
function encodeLocation(to) {
  let href = typeof to === "string" ? to : createPath(to);
  href = href.replace(/ $/, "%20");
  let encoded = ABSOLUTE_URL_REGEX.test(href) ? new URL(href) : new URL(href, "http://localhost");
  return {
    pathname: encoded.pathname,
    search: encoded.search,
    hash: encoded.hash
  };
}
const ABSOLUTE_URL_REGEX = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
const ESCAPE_LOOKUP = {
  "&": "\\u0026",
  ">": "\\u003e",
  "<": "\\u003c",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
const ESCAPE_REGEX = /[&><\u2028\u2029]/g;
function htmlEscape(str) {
  return str.replace(ESCAPE_REGEX, (match) => ESCAPE_LOOKUP[match]);
}
/**
 * @remix-run/react v2.17.4
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function RemixServer({
  context,
  url,
  abortDelay,
  nonce
}) {
  if (typeof url === "string") {
    url = new URL(url);
  }
  let {
    manifest,
    routeModules,
    criticalCss,
    serverHandoffString
  } = context;
  let routes2 = createServerRoutes(manifest.routes, routeModules, context.future, context.isSpaMode);
  context.staticHandlerContext.loaderData = {
    ...context.staticHandlerContext.loaderData
  };
  for (let match of context.staticHandlerContext.matches) {
    let routeId = match.route.id;
    let route = routeModules[routeId];
    let manifestRoute = context.manifest.routes[routeId];
    if (route && shouldHydrateRouteLoader(manifestRoute, route, context.isSpaMode) && (route.HydrateFallback || !manifestRoute.hasLoader)) {
      context.staticHandlerContext.loaderData[routeId] = void 0;
    }
  }
  let router = createStaticRouter(routes2, context.staticHandlerContext, {
    future: {
      v7_partialHydration: true,
      v7_relativeSplatPath: context.future.v3_relativeSplatPath
    }
  });
  return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, /* @__PURE__ */ reactExports.createElement(RemixContext.Provider, {
    value: {
      manifest,
      routeModules,
      criticalCss,
      serverHandoffString,
      future: context.future,
      isSpaMode: context.isSpaMode,
      serializeError: context.serializeError,
      abortDelay,
      renderMeta: context.renderMeta
    }
  }, /* @__PURE__ */ reactExports.createElement(RemixErrorBoundary, {
    location: router.state.location
  }, /* @__PURE__ */ reactExports.createElement(StaticRouterProvider, {
    router,
    context: context.staticHandlerContext,
    hydrate: false
  }))), context.future.v3_singleFetch && context.serverHandoffStream ? /* @__PURE__ */ reactExports.createElement(reactExports.Suspense, null, /* @__PURE__ */ reactExports.createElement(StreamTransfer, {
    context,
    identifier: 0,
    reader: context.serverHandoffStream.getReader(),
    textDecoder: new TextDecoder(),
    nonce
  })) : null);
}
var reactDomServerLegacy_browser_production_min = {};
/**
 * @license React
 * react-dom-server-legacy.browser.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var aa$1 = reactExports;
function l$3(a2) {
  for (var b = "https://reactjs.org/docs/error-decoder.html?invariant=" + a2, c2 = 1; c2 < arguments.length; c2++) b += "&args[]=" + encodeURIComponent(arguments[c2]);
  return "Minified React error #" + a2 + "; visit " + b + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var p$1 = Object.prototype.hasOwnProperty, fa$1 = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, ha$1 = {}, ia$1 = {};
function ja$1(a2) {
  if (p$1.call(ia$1, a2)) return true;
  if (p$1.call(ha$1, a2)) return false;
  if (fa$1.test(a2)) return ia$1[a2] = true;
  ha$1[a2] = true;
  return false;
}
function r$1(a2, b, c2, d, f2, e2, g) {
  this.acceptsBooleans = 2 === b || 3 === b || 4 === b;
  this.attributeName = d;
  this.attributeNamespace = f2;
  this.mustUseProperty = c2;
  this.propertyName = a2;
  this.type = b;
  this.sanitizeURL = e2;
  this.removeEmptyString = g;
}
var t$2 = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a2) {
  t$2[a2] = new r$1(a2, 0, false, a2, null, false, false);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(a2) {
  var b = a2[0];
  t$2[b] = new r$1(b, 1, false, a2[1], null, false, false);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(a2) {
  t$2[a2] = new r$1(a2, 2, false, a2.toLowerCase(), null, false, false);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(a2) {
  t$2[a2] = new r$1(a2, 2, false, a2, null, false, false);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a2) {
  t$2[a2] = new r$1(a2, 3, false, a2.toLowerCase(), null, false, false);
});
["checked", "multiple", "muted", "selected"].forEach(function(a2) {
  t$2[a2] = new r$1(a2, 3, true, a2, null, false, false);
});
["capture", "download"].forEach(function(a2) {
  t$2[a2] = new r$1(a2, 4, false, a2, null, false, false);
});
["cols", "rows", "size", "span"].forEach(function(a2) {
  t$2[a2] = new r$1(a2, 6, false, a2, null, false, false);
});
["rowSpan", "start"].forEach(function(a2) {
  t$2[a2] = new r$1(a2, 5, false, a2.toLowerCase(), null, false, false);
});
var ka$1 = /[\-:]([a-z])/g;
function la$1(a2) {
  return a2[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a2) {
  var b = a2.replace(
    ka$1,
    la$1
  );
  t$2[b] = new r$1(b, 1, false, a2, null, false, false);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a2) {
  var b = a2.replace(ka$1, la$1);
  t$2[b] = new r$1(b, 1, false, a2, "http://www.w3.org/1999/xlink", false, false);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(a2) {
  var b = a2.replace(ka$1, la$1);
  t$2[b] = new r$1(b, 1, false, a2, "http://www.w3.org/XML/1998/namespace", false, false);
});
["tabIndex", "crossOrigin"].forEach(function(a2) {
  t$2[a2] = new r$1(a2, 1, false, a2.toLowerCase(), null, false, false);
});
t$2.xlinkHref = new r$1("xlinkHref", 1, false, "xlink:href", "http://www.w3.org/1999/xlink", true, false);
["src", "href", "action", "formAction"].forEach(function(a2) {
  t$2[a2] = new r$1(a2, 1, false, a2.toLowerCase(), null, true, true);
});
var u$2 = {
  animationIterationCount: true,
  aspectRatio: true,
  borderImageOutset: true,
  borderImageSlice: true,
  borderImageWidth: true,
  boxFlex: true,
  boxFlexGroup: true,
  boxOrdinalGroup: true,
  columnCount: true,
  columns: true,
  flex: true,
  flexGrow: true,
  flexPositive: true,
  flexShrink: true,
  flexNegative: true,
  flexOrder: true,
  gridArea: true,
  gridRow: true,
  gridRowEnd: true,
  gridRowSpan: true,
  gridRowStart: true,
  gridColumn: true,
  gridColumnEnd: true,
  gridColumnSpan: true,
  gridColumnStart: true,
  fontWeight: true,
  lineClamp: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  tabSize: true,
  widows: true,
  zIndex: true,
  zoom: true,
  fillOpacity: true,
  floodOpacity: true,
  stopOpacity: true,
  strokeDasharray: true,
  strokeDashoffset: true,
  strokeMiterlimit: true,
  strokeOpacity: true,
  strokeWidth: true
}, ma = ["Webkit", "ms", "Moz", "O"];
Object.keys(u$2).forEach(function(a2) {
  ma.forEach(function(b) {
    b = b + a2.charAt(0).toUpperCase() + a2.substring(1);
    u$2[b] = u$2[a2];
  });
});
var na = /["'&<>]/;
function v$1(a2) {
  if ("boolean" === typeof a2 || "number" === typeof a2) return "" + a2;
  a2 = "" + a2;
  var b = na.exec(a2);
  if (b) {
    var c2 = "", d, f2 = 0;
    for (d = b.index; d < a2.length; d++) {
      switch (a2.charCodeAt(d)) {
        case 34:
          b = "&quot;";
          break;
        case 38:
          b = "&amp;";
          break;
        case 39:
          b = "&#x27;";
          break;
        case 60:
          b = "&lt;";
          break;
        case 62:
          b = "&gt;";
          break;
        default:
          continue;
      }
      f2 !== d && (c2 += a2.substring(f2, d));
      f2 = d + 1;
      c2 += b;
    }
    a2 = f2 !== d ? c2 + a2.substring(f2, d) : c2;
  }
  return a2;
}
var oa$1 = /([A-Z])/g, pa$1 = /^ms-/, qa$1 = Array.isArray;
function w$1(a2, b) {
  return { insertionMode: a2, selectedValue: b };
}
function ra$1(a2, b, c2) {
  switch (b) {
    case "select":
      return w$1(1, null != c2.value ? c2.value : c2.defaultValue);
    case "svg":
      return w$1(2, null);
    case "math":
      return w$1(3, null);
    case "foreignObject":
      return w$1(1, null);
    case "table":
      return w$1(4, null);
    case "thead":
    case "tbody":
    case "tfoot":
      return w$1(5, null);
    case "colgroup":
      return w$1(7, null);
    case "tr":
      return w$1(6, null);
  }
  return 4 <= a2.insertionMode || 0 === a2.insertionMode ? w$1(1, null) : a2;
}
var sa$1 = /* @__PURE__ */ new Map();
function ta$1(a2, b, c2) {
  if ("object" !== typeof c2) throw Error(l$3(62));
  b = true;
  for (var d in c2) if (p$1.call(c2, d)) {
    var f2 = c2[d];
    if (null != f2 && "boolean" !== typeof f2 && "" !== f2) {
      if (0 === d.indexOf("--")) {
        var e2 = v$1(d);
        f2 = v$1(("" + f2).trim());
      } else {
        e2 = d;
        var g = sa$1.get(e2);
        void 0 !== g ? e2 = g : (g = v$1(e2.replace(oa$1, "-$1").toLowerCase().replace(pa$1, "-ms-")), sa$1.set(e2, g), e2 = g);
        f2 = "number" === typeof f2 ? 0 === f2 || p$1.call(u$2, d) ? "" + f2 : f2 + "px" : v$1(("" + f2).trim());
      }
      b ? (b = false, a2.push(' style="', e2, ":", f2)) : a2.push(";", e2, ":", f2);
    }
  }
  b || a2.push('"');
}
function x$1(a2, b, c2, d) {
  switch (c2) {
    case "style":
      ta$1(a2, b, d);
      return;
    case "defaultValue":
    case "defaultChecked":
    case "innerHTML":
    case "suppressContentEditableWarning":
    case "suppressHydrationWarning":
      return;
  }
  if (!(2 < c2.length) || "o" !== c2[0] && "O" !== c2[0] || "n" !== c2[1] && "N" !== c2[1]) {
    if (b = t$2.hasOwnProperty(c2) ? t$2[c2] : null, null !== b) {
      switch (typeof d) {
        case "function":
        case "symbol":
          return;
        case "boolean":
          if (!b.acceptsBooleans) return;
      }
      c2 = b.attributeName;
      switch (b.type) {
        case 3:
          d && a2.push(" ", c2, '=""');
          break;
        case 4:
          true === d ? a2.push(" ", c2, '=""') : false !== d && a2.push(" ", c2, '="', v$1(d), '"');
          break;
        case 5:
          isNaN(d) || a2.push(" ", c2, '="', v$1(d), '"');
          break;
        case 6:
          !isNaN(d) && 1 <= d && a2.push(" ", c2, '="', v$1(d), '"');
          break;
        default:
          b.sanitizeURL && (d = "" + d), a2.push(" ", c2, '="', v$1(d), '"');
      }
    } else if (ja$1(c2)) {
      switch (typeof d) {
        case "function":
        case "symbol":
          return;
        case "boolean":
          if (b = c2.toLowerCase().slice(0, 5), "data-" !== b && "aria-" !== b) return;
      }
      a2.push(" ", c2, '="', v$1(d), '"');
    }
  }
}
function y$1(a2, b, c2) {
  if (null != b) {
    if (null != c2) throw Error(l$3(60));
    if ("object" !== typeof b || !("__html" in b)) throw Error(l$3(61));
    b = b.__html;
    null !== b && void 0 !== b && a2.push("" + b);
  }
}
function ua$1(a2) {
  var b = "";
  aa$1.Children.forEach(a2, function(a3) {
    null != a3 && (b += a3);
  });
  return b;
}
function va$1(a2, b, c2, d) {
  a2.push(A(c2));
  var f2 = c2 = null, e2;
  for (e2 in b) if (p$1.call(b, e2)) {
    var g = b[e2];
    if (null != g) switch (e2) {
      case "children":
        c2 = g;
        break;
      case "dangerouslySetInnerHTML":
        f2 = g;
        break;
      default:
        x$1(a2, d, e2, g);
    }
  }
  a2.push(">");
  y$1(a2, f2, c2);
  return "string" === typeof c2 ? (a2.push(v$1(c2)), null) : c2;
}
var wa$1 = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/, xa$1 = /* @__PURE__ */ new Map();
function A(a2) {
  var b = xa$1.get(a2);
  if (void 0 === b) {
    if (!wa$1.test(a2)) throw Error(l$3(65, a2));
    b = "<" + a2;
    xa$1.set(a2, b);
  }
  return b;
}
function ya$1(a2, b, c2, d, f2) {
  switch (b) {
    case "select":
      a2.push(A("select"));
      var e2 = null, g = null;
      for (n2 in c2) if (p$1.call(c2, n2)) {
        var h = c2[n2];
        if (null != h) switch (n2) {
          case "children":
            e2 = h;
            break;
          case "dangerouslySetInnerHTML":
            g = h;
            break;
          case "defaultValue":
          case "value":
            break;
          default:
            x$1(a2, d, n2, h);
        }
      }
      a2.push(">");
      y$1(a2, g, e2);
      return e2;
    case "option":
      g = f2.selectedValue;
      a2.push(A("option"));
      var k2 = h = null, m2 = null;
      var n2 = null;
      for (e2 in c2) if (p$1.call(c2, e2)) {
        var q2 = c2[e2];
        if (null != q2) switch (e2) {
          case "children":
            h = q2;
            break;
          case "selected":
            m2 = q2;
            break;
          case "dangerouslySetInnerHTML":
            n2 = q2;
            break;
          case "value":
            k2 = q2;
          default:
            x$1(a2, d, e2, q2);
        }
      }
      if (null != g) if (c2 = null !== k2 ? "" + k2 : ua$1(h), qa$1(g)) for (d = 0; d < g.length; d++) {
        if ("" + g[d] === c2) {
          a2.push(' selected=""');
          break;
        }
      }
      else "" + g === c2 && a2.push(' selected=""');
      else m2 && a2.push(' selected=""');
      a2.push(">");
      y$1(a2, n2, h);
      return h;
    case "textarea":
      a2.push(A("textarea"));
      n2 = g = e2 = null;
      for (h in c2) if (p$1.call(c2, h) && (k2 = c2[h], null != k2)) switch (h) {
        case "children":
          n2 = k2;
          break;
        case "value":
          e2 = k2;
          break;
        case "defaultValue":
          g = k2;
          break;
        case "dangerouslySetInnerHTML":
          throw Error(l$3(91));
        default:
          x$1(
            a2,
            d,
            h,
            k2
          );
      }
      null === e2 && null !== g && (e2 = g);
      a2.push(">");
      if (null != n2) {
        if (null != e2) throw Error(l$3(92));
        if (qa$1(n2) && 1 < n2.length) throw Error(l$3(93));
        e2 = "" + n2;
      }
      "string" === typeof e2 && "\n" === e2[0] && a2.push("\n");
      null !== e2 && a2.push(v$1("" + e2));
      return null;
    case "input":
      a2.push(A("input"));
      k2 = n2 = h = e2 = null;
      for (g in c2) if (p$1.call(c2, g) && (m2 = c2[g], null != m2)) switch (g) {
        case "children":
        case "dangerouslySetInnerHTML":
          throw Error(l$3(399, "input"));
        case "defaultChecked":
          k2 = m2;
          break;
        case "defaultValue":
          h = m2;
          break;
        case "checked":
          n2 = m2;
          break;
        case "value":
          e2 = m2;
          break;
        default:
          x$1(a2, d, g, m2);
      }
      null !== n2 ? x$1(a2, d, "checked", n2) : null !== k2 && x$1(a2, d, "checked", k2);
      null !== e2 ? x$1(a2, d, "value", e2) : null !== h && x$1(a2, d, "value", h);
      a2.push("/>");
      return null;
    case "menuitem":
      a2.push(A("menuitem"));
      for (var C2 in c2) if (p$1.call(c2, C2) && (e2 = c2[C2], null != e2)) switch (C2) {
        case "children":
        case "dangerouslySetInnerHTML":
          throw Error(l$3(400));
        default:
          x$1(a2, d, C2, e2);
      }
      a2.push(">");
      return null;
    case "title":
      a2.push(A("title"));
      e2 = null;
      for (q2 in c2) if (p$1.call(c2, q2) && (g = c2[q2], null != g)) switch (q2) {
        case "children":
          e2 = g;
          break;
        case "dangerouslySetInnerHTML":
          throw Error(l$3(434));
        default:
          x$1(a2, d, q2, g);
      }
      a2.push(">");
      return e2;
    case "listing":
    case "pre":
      a2.push(A(b));
      g = e2 = null;
      for (k2 in c2) if (p$1.call(c2, k2) && (h = c2[k2], null != h)) switch (k2) {
        case "children":
          e2 = h;
          break;
        case "dangerouslySetInnerHTML":
          g = h;
          break;
        default:
          x$1(a2, d, k2, h);
      }
      a2.push(">");
      if (null != g) {
        if (null != e2) throw Error(l$3(60));
        if ("object" !== typeof g || !("__html" in g)) throw Error(l$3(61));
        c2 = g.__html;
        null !== c2 && void 0 !== c2 && ("string" === typeof c2 && 0 < c2.length && "\n" === c2[0] ? a2.push("\n", c2) : a2.push("" + c2));
      }
      "string" === typeof e2 && "\n" === e2[0] && a2.push("\n");
      return e2;
    case "area":
    case "base":
    case "br":
    case "col":
    case "embed":
    case "hr":
    case "img":
    case "keygen":
    case "link":
    case "meta":
    case "param":
    case "source":
    case "track":
    case "wbr":
      a2.push(A(b));
      for (var D2 in c2) if (p$1.call(c2, D2) && (e2 = c2[D2], null != e2)) switch (D2) {
        case "children":
        case "dangerouslySetInnerHTML":
          throw Error(l$3(399, b));
        default:
          x$1(a2, d, D2, e2);
      }
      a2.push("/>");
      return null;
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return va$1(
        a2,
        c2,
        b,
        d
      );
    case "html":
      return 0 === f2.insertionMode && a2.push("<!DOCTYPE html>"), va$1(a2, c2, b, d);
    default:
      if (-1 === b.indexOf("-") && "string" !== typeof c2.is) return va$1(a2, c2, b, d);
      a2.push(A(b));
      g = e2 = null;
      for (m2 in c2) if (p$1.call(c2, m2) && (h = c2[m2], null != h)) switch (m2) {
        case "children":
          e2 = h;
          break;
        case "dangerouslySetInnerHTML":
          g = h;
          break;
        case "style":
          ta$1(a2, d, h);
          break;
        case "suppressContentEditableWarning":
        case "suppressHydrationWarning":
          break;
        default:
          ja$1(m2) && "function" !== typeof h && "symbol" !== typeof h && a2.push(" ", m2, '="', v$1(h), '"');
      }
      a2.push(">");
      y$1(a2, g, e2);
      return e2;
  }
}
function za$1(a2, b, c2) {
  a2.push('<!--$?--><template id="');
  if (null === c2) throw Error(l$3(395));
  a2.push(c2);
  return a2.push('"></template>');
}
function Aa$1(a2, b, c2, d) {
  switch (c2.insertionMode) {
    case 0:
    case 1:
      return a2.push('<div hidden id="'), a2.push(b.segmentPrefix), b = d.toString(16), a2.push(b), a2.push('">');
    case 2:
      return a2.push('<svg aria-hidden="true" style="display:none" id="'), a2.push(b.segmentPrefix), b = d.toString(16), a2.push(b), a2.push('">');
    case 3:
      return a2.push('<math aria-hidden="true" style="display:none" id="'), a2.push(b.segmentPrefix), b = d.toString(16), a2.push(b), a2.push('">');
    case 4:
      return a2.push('<table hidden id="'), a2.push(b.segmentPrefix), b = d.toString(16), a2.push(b), a2.push('">');
    case 5:
      return a2.push('<table hidden><tbody id="'), a2.push(b.segmentPrefix), b = d.toString(16), a2.push(b), a2.push('">');
    case 6:
      return a2.push('<table hidden><tr id="'), a2.push(b.segmentPrefix), b = d.toString(16), a2.push(b), a2.push('">');
    case 7:
      return a2.push('<table hidden><colgroup id="'), a2.push(b.segmentPrefix), b = d.toString(16), a2.push(b), a2.push('">');
    default:
      throw Error(l$3(397));
  }
}
function Ba$1(a2, b) {
  switch (b.insertionMode) {
    case 0:
    case 1:
      return a2.push("</div>");
    case 2:
      return a2.push("</svg>");
    case 3:
      return a2.push("</math>");
    case 4:
      return a2.push("</table>");
    case 5:
      return a2.push("</tbody></table>");
    case 6:
      return a2.push("</tr></table>");
    case 7:
      return a2.push("</colgroup></table>");
    default:
      throw Error(l$3(397));
  }
}
var Ca$1 = /[<\u2028\u2029]/g;
function Da$1(a2) {
  return JSON.stringify(a2).replace(Ca$1, function(a3) {
    switch (a3) {
      case "<":
        return "\\u003c";
      case "\u2028":
        return "\\u2028";
      case "\u2029":
        return "\\u2029";
      default:
        throw Error("escapeJSStringsForInstructionScripts encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React");
    }
  });
}
function Ea$1(a2, b) {
  b = void 0 === b ? "" : b;
  return { bootstrapChunks: [], startInlineScript: "<script>", placeholderPrefix: b + "P:", segmentPrefix: b + "S:", boundaryPrefix: b + "B:", idPrefix: b, nextSuspenseID: 0, sentCompleteSegmentFunction: false, sentCompleteBoundaryFunction: false, sentClientRenderFunction: false, generateStaticMarkup: a2 };
}
function Fa$1(a2, b, c2, d) {
  if (c2.generateStaticMarkup) return a2.push(v$1(b)), false;
  "" === b ? a2 = d : (d && a2.push("<!-- -->"), a2.push(v$1(b)), a2 = true);
  return a2;
}
var B$1 = Object.assign, Ga$1 = Symbol.for("react.element"), Ha$1 = Symbol.for("react.portal"), Ia$1 = Symbol.for("react.fragment"), Ja$1 = Symbol.for("react.strict_mode"), Ka$1 = Symbol.for("react.profiler"), La$1 = Symbol.for("react.provider"), Ma$1 = Symbol.for("react.context"), Na$1 = Symbol.for("react.forward_ref"), Oa$1 = Symbol.for("react.suspense"), Pa$1 = Symbol.for("react.suspense_list"), Qa$1 = Symbol.for("react.memo"), Ra$1 = Symbol.for("react.lazy"), Sa$1 = Symbol.for("react.scope"), Ta$1 = Symbol.for("react.debug_trace_mode"), Ua$1 = Symbol.for("react.legacy_hidden"), Va$1 = Symbol.for("react.default_value"), Wa$1 = Symbol.iterator;
function Xa$1(a2) {
  if (null == a2) return null;
  if ("function" === typeof a2) return a2.displayName || a2.name || null;
  if ("string" === typeof a2) return a2;
  switch (a2) {
    case Ia$1:
      return "Fragment";
    case Ha$1:
      return "Portal";
    case Ka$1:
      return "Profiler";
    case Ja$1:
      return "StrictMode";
    case Oa$1:
      return "Suspense";
    case Pa$1:
      return "SuspenseList";
  }
  if ("object" === typeof a2) switch (a2.$$typeof) {
    case Ma$1:
      return (a2.displayName || "Context") + ".Consumer";
    case La$1:
      return (a2._context.displayName || "Context") + ".Provider";
    case Na$1:
      var b = a2.render;
      a2 = a2.displayName;
      a2 || (a2 = b.displayName || b.name || "", a2 = "" !== a2 ? "ForwardRef(" + a2 + ")" : "ForwardRef");
      return a2;
    case Qa$1:
      return b = a2.displayName || null, null !== b ? b : Xa$1(a2.type) || "Memo";
    case Ra$1:
      b = a2._payload;
      a2 = a2._init;
      try {
        return Xa$1(a2(b));
      } catch (c2) {
      }
  }
  return null;
}
var Ya$1 = {};
function Za$1(a2, b) {
  a2 = a2.contextTypes;
  if (!a2) return Ya$1;
  var c2 = {}, d;
  for (d in a2) c2[d] = b[d];
  return c2;
}
var E$1 = null;
function F(a2, b) {
  if (a2 !== b) {
    a2.context._currentValue2 = a2.parentValue;
    a2 = a2.parent;
    var c2 = b.parent;
    if (null === a2) {
      if (null !== c2) throw Error(l$3(401));
    } else {
      if (null === c2) throw Error(l$3(401));
      F(a2, c2);
    }
    b.context._currentValue2 = b.value;
  }
}
function $a$1(a2) {
  a2.context._currentValue2 = a2.parentValue;
  a2 = a2.parent;
  null !== a2 && $a$1(a2);
}
function ab$1(a2) {
  var b = a2.parent;
  null !== b && ab$1(b);
  a2.context._currentValue2 = a2.value;
}
function bb$1(a2, b) {
  a2.context._currentValue2 = a2.parentValue;
  a2 = a2.parent;
  if (null === a2) throw Error(l$3(402));
  a2.depth === b.depth ? F(a2, b) : bb$1(a2, b);
}
function cb$1(a2, b) {
  var c2 = b.parent;
  if (null === c2) throw Error(l$3(402));
  a2.depth === c2.depth ? F(a2, c2) : cb$1(a2, c2);
  b.context._currentValue2 = b.value;
}
function G(a2) {
  var b = E$1;
  b !== a2 && (null === b ? ab$1(a2) : null === a2 ? $a$1(b) : b.depth === a2.depth ? F(b, a2) : b.depth > a2.depth ? bb$1(b, a2) : cb$1(b, a2), E$1 = a2);
}
var db$1 = { isMounted: function() {
  return false;
}, enqueueSetState: function(a2, b) {
  a2 = a2._reactInternals;
  null !== a2.queue && a2.queue.push(b);
}, enqueueReplaceState: function(a2, b) {
  a2 = a2._reactInternals;
  a2.replace = true;
  a2.queue = [b];
}, enqueueForceUpdate: function() {
} };
function eb$1(a2, b, c2, d) {
  var f2 = void 0 !== a2.state ? a2.state : null;
  a2.updater = db$1;
  a2.props = c2;
  a2.state = f2;
  var e2 = { queue: [], replace: false };
  a2._reactInternals = e2;
  var g = b.contextType;
  a2.context = "object" === typeof g && null !== g ? g._currentValue2 : d;
  g = b.getDerivedStateFromProps;
  "function" === typeof g && (g = g(c2, f2), f2 = null === g || void 0 === g ? f2 : B$1({}, f2, g), a2.state = f2);
  if ("function" !== typeof b.getDerivedStateFromProps && "function" !== typeof a2.getSnapshotBeforeUpdate && ("function" === typeof a2.UNSAFE_componentWillMount || "function" === typeof a2.componentWillMount)) if (b = a2.state, "function" === typeof a2.componentWillMount && a2.componentWillMount(), "function" === typeof a2.UNSAFE_componentWillMount && a2.UNSAFE_componentWillMount(), b !== a2.state && db$1.enqueueReplaceState(a2, a2.state, null), null !== e2.queue && 0 < e2.queue.length) if (b = e2.queue, g = e2.replace, e2.queue = null, e2.replace = false, g && 1 === b.length) a2.state = b[0];
  else {
    e2 = g ? b[0] : a2.state;
    f2 = true;
    for (g = g ? 1 : 0; g < b.length; g++) {
      var h = b[g];
      h = "function" === typeof h ? h.call(a2, e2, c2, d) : h;
      null != h && (f2 ? (f2 = false, e2 = B$1({}, e2, h)) : B$1(e2, h));
    }
    a2.state = e2;
  }
  else e2.queue = null;
}
var fb$1 = { id: 1, overflow: "" };
function gb$1(a2, b, c2) {
  var d = a2.id;
  a2 = a2.overflow;
  var f2 = 32 - H$1(d) - 1;
  d &= ~(1 << f2);
  c2 += 1;
  var e2 = 32 - H$1(b) + f2;
  if (30 < e2) {
    var g = f2 - f2 % 5;
    e2 = (d & (1 << g) - 1).toString(32);
    d >>= g;
    f2 -= g;
    return { id: 1 << 32 - H$1(b) + f2 | c2 << f2 | d, overflow: e2 + a2 };
  }
  return { id: 1 << e2 | c2 << f2 | d, overflow: a2 };
}
var H$1 = Math.clz32 ? Math.clz32 : hb$1, ib$1 = Math.log, jb$1 = Math.LN2;
function hb$1(a2) {
  a2 >>>= 0;
  return 0 === a2 ? 32 : 31 - (ib$1(a2) / jb$1 | 0) | 0;
}
function kb$1(a2, b) {
  return a2 === b && (0 !== a2 || 1 / a2 === 1 / b) || a2 !== a2 && b !== b;
}
var lb$1 = "function" === typeof Object.is ? Object.is : kb$1, I$1 = null, ob$1 = null, J$1 = null, K$1 = null, L$1 = false, M$1 = false, N$1 = 0, O$1 = null, P$1 = 0;
function Q$1() {
  if (null === I$1) throw Error(l$3(321));
  return I$1;
}
function pb$1() {
  if (0 < P$1) throw Error(l$3(312));
  return { memoizedState: null, queue: null, next: null };
}
function qb$1() {
  null === K$1 ? null === J$1 ? (L$1 = false, J$1 = K$1 = pb$1()) : (L$1 = true, K$1 = J$1) : null === K$1.next ? (L$1 = false, K$1 = K$1.next = pb$1()) : (L$1 = true, K$1 = K$1.next);
  return K$1;
}
function rb$1() {
  ob$1 = I$1 = null;
  M$1 = false;
  J$1 = null;
  P$1 = 0;
  K$1 = O$1 = null;
}
function sb$1(a2, b) {
  return "function" === typeof b ? b(a2) : b;
}
function tb$1(a2, b, c2) {
  I$1 = Q$1();
  K$1 = qb$1();
  if (L$1) {
    var d = K$1.queue;
    b = d.dispatch;
    if (null !== O$1 && (c2 = O$1.get(d), void 0 !== c2)) {
      O$1.delete(d);
      d = K$1.memoizedState;
      do
        d = a2(d, c2.action), c2 = c2.next;
      while (null !== c2);
      K$1.memoizedState = d;
      return [d, b];
    }
    return [K$1.memoizedState, b];
  }
  a2 = a2 === sb$1 ? "function" === typeof b ? b() : b : void 0 !== c2 ? c2(b) : b;
  K$1.memoizedState = a2;
  a2 = K$1.queue = { last: null, dispatch: null };
  a2 = a2.dispatch = ub$1.bind(null, I$1, a2);
  return [K$1.memoizedState, a2];
}
function vb$1(a2, b) {
  I$1 = Q$1();
  K$1 = qb$1();
  b = void 0 === b ? null : b;
  if (null !== K$1) {
    var c2 = K$1.memoizedState;
    if (null !== c2 && null !== b) {
      var d = c2[1];
      a: if (null === d) d = false;
      else {
        for (var f2 = 0; f2 < d.length && f2 < b.length; f2++) if (!lb$1(b[f2], d[f2])) {
          d = false;
          break a;
        }
        d = true;
      }
      if (d) return c2[0];
    }
  }
  a2 = a2();
  K$1.memoizedState = [a2, b];
  return a2;
}
function ub$1(a2, b, c2) {
  if (25 <= P$1) throw Error(l$3(301));
  if (a2 === I$1) if (M$1 = true, a2 = { action: c2, next: null }, null === O$1 && (O$1 = /* @__PURE__ */ new Map()), c2 = O$1.get(b), void 0 === c2) O$1.set(b, a2);
  else {
    for (b = c2; null !== b.next; ) b = b.next;
    b.next = a2;
  }
}
function wb$1() {
  throw Error(l$3(394));
}
function R$1() {
}
var xb$1 = { readContext: function(a2) {
  return a2._currentValue2;
}, useContext: function(a2) {
  Q$1();
  return a2._currentValue2;
}, useMemo: vb$1, useReducer: tb$1, useRef: function(a2) {
  I$1 = Q$1();
  K$1 = qb$1();
  var b = K$1.memoizedState;
  return null === b ? (a2 = { current: a2 }, K$1.memoizedState = a2) : b;
}, useState: function(a2) {
  return tb$1(sb$1, a2);
}, useInsertionEffect: R$1, useLayoutEffect: function() {
}, useCallback: function(a2, b) {
  return vb$1(function() {
    return a2;
  }, b);
}, useImperativeHandle: R$1, useEffect: R$1, useDebugValue: R$1, useDeferredValue: function(a2) {
  Q$1();
  return a2;
}, useTransition: function() {
  Q$1();
  return [
    false,
    wb$1
  ];
}, useId: function() {
  var a2 = ob$1.treeContext;
  var b = a2.overflow;
  a2 = a2.id;
  a2 = (a2 & ~(1 << 32 - H$1(a2) - 1)).toString(32) + b;
  var c2 = S$1;
  if (null === c2) throw Error(l$3(404));
  b = N$1++;
  a2 = ":" + c2.idPrefix + "R" + a2;
  0 < b && (a2 += "H" + b.toString(32));
  return a2 + ":";
}, useMutableSource: function(a2, b) {
  Q$1();
  return b(a2._source);
}, useSyncExternalStore: function(a2, b, c2) {
  if (void 0 === c2) throw Error(l$3(407));
  return c2();
} }, S$1 = null, yb$1 = aa$1.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentDispatcher;
function zb$1(a2) {
  console.error(a2);
  return null;
}
function T$1() {
}
function Ab$1(a2, b, c2, d, f2, e2, g, h, k2) {
  var m2 = [], n2 = /* @__PURE__ */ new Set();
  b = { destination: null, responseState: b, progressiveChunkSize: void 0 === d ? 12800 : d, status: 0, fatalError: null, nextSegmentId: 0, allPendingTasks: 0, pendingRootTasks: 0, completedRootSegment: null, abortableTasks: n2, pingedTasks: m2, clientRenderedBoundaries: [], completedBoundaries: [], partialBoundaries: [], onError: void 0 === f2 ? zb$1 : f2, onAllReady: T$1, onShellReady: void 0 === g ? T$1 : g, onShellError: T$1, onFatalError: T$1 };
  c2 = U$1(b, 0, null, c2, false, false);
  c2.parentFlushed = true;
  a2 = Bb$1(b, a2, null, c2, n2, Ya$1, null, fb$1);
  m2.push(a2);
  return b;
}
function Bb$1(a2, b, c2, d, f2, e2, g, h) {
  a2.allPendingTasks++;
  null === c2 ? a2.pendingRootTasks++ : c2.pendingTasks++;
  var k2 = { node: b, ping: function() {
    var b2 = a2.pingedTasks;
    b2.push(k2);
    1 === b2.length && Cb$1(a2);
  }, blockedBoundary: c2, blockedSegment: d, abortSet: f2, legacyContext: e2, context: g, treeContext: h };
  f2.add(k2);
  return k2;
}
function U$1(a2, b, c2, d, f2, e2) {
  return { status: 0, id: -1, index: b, parentFlushed: false, chunks: [], children: [], formatContext: d, boundary: c2, lastPushedText: f2, textEmbedded: e2 };
}
function V$1(a2, b) {
  a2 = a2.onError(b);
  if (null != a2 && "string" !== typeof a2) throw Error('onError returned something with a type other than "string". onError should return a string and may return null or undefined but must not return anything else. It received something of type "' + typeof a2 + '" instead');
  return a2;
}
function W$1(a2, b) {
  var c2 = a2.onShellError;
  c2(b);
  c2 = a2.onFatalError;
  c2(b);
  null !== a2.destination ? (a2.status = 2, a2.destination.destroy(b)) : (a2.status = 1, a2.fatalError = b);
}
function Db$1(a2, b, c2, d, f2) {
  I$1 = {};
  ob$1 = b;
  N$1 = 0;
  for (a2 = c2(d, f2); M$1; ) M$1 = false, N$1 = 0, P$1 += 1, K$1 = null, a2 = c2(d, f2);
  rb$1();
  return a2;
}
function Eb$1(a2, b, c2, d) {
  var f2 = c2.render(), e2 = d.childContextTypes;
  if (null !== e2 && void 0 !== e2) {
    var g = b.legacyContext;
    if ("function" !== typeof c2.getChildContext) d = g;
    else {
      c2 = c2.getChildContext();
      for (var h in c2) if (!(h in e2)) throw Error(l$3(108, Xa$1(d) || "Unknown", h));
      d = B$1({}, g, c2);
    }
    b.legacyContext = d;
    X$1(a2, b, f2);
    b.legacyContext = g;
  } else X$1(a2, b, f2);
}
function Fb(a2, b) {
  if (a2 && a2.defaultProps) {
    b = B$1({}, b);
    a2 = a2.defaultProps;
    for (var c2 in a2) void 0 === b[c2] && (b[c2] = a2[c2]);
    return b;
  }
  return b;
}
function Gb$1(a2, b, c2, d, f2) {
  if ("function" === typeof c2) if (c2.prototype && c2.prototype.isReactComponent) {
    f2 = Za$1(c2, b.legacyContext);
    var e2 = c2.contextType;
    e2 = new c2(d, "object" === typeof e2 && null !== e2 ? e2._currentValue2 : f2);
    eb$1(e2, c2, d, f2);
    Eb$1(a2, b, e2, c2);
  } else {
    e2 = Za$1(c2, b.legacyContext);
    f2 = Db$1(a2, b, c2, d, e2);
    var g = 0 !== N$1;
    if ("object" === typeof f2 && null !== f2 && "function" === typeof f2.render && void 0 === f2.$$typeof) eb$1(f2, c2, d, e2), Eb$1(a2, b, f2, c2);
    else if (g) {
      d = b.treeContext;
      b.treeContext = gb$1(d, 1, 0);
      try {
        X$1(a2, b, f2);
      } finally {
        b.treeContext = d;
      }
    } else X$1(a2, b, f2);
  }
  else if ("string" === typeof c2) {
    f2 = b.blockedSegment;
    e2 = ya$1(f2.chunks, c2, d, a2.responseState, f2.formatContext);
    f2.lastPushedText = false;
    g = f2.formatContext;
    f2.formatContext = ra$1(g, c2, d);
    Hb$1(a2, b, e2);
    f2.formatContext = g;
    switch (c2) {
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "img":
      case "input":
      case "keygen":
      case "link":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
        break;
      default:
        f2.chunks.push("</", c2, ">");
    }
    f2.lastPushedText = false;
  } else {
    switch (c2) {
      case Ua$1:
      case Ta$1:
      case Ja$1:
      case Ka$1:
      case Ia$1:
        X$1(a2, b, d.children);
        return;
      case Pa$1:
        X$1(a2, b, d.children);
        return;
      case Sa$1:
        throw Error(l$3(343));
      case Oa$1:
        a: {
          c2 = b.blockedBoundary;
          f2 = b.blockedSegment;
          e2 = d.fallback;
          d = d.children;
          g = /* @__PURE__ */ new Set();
          var h = { id: null, rootSegmentID: -1, parentFlushed: false, pendingTasks: 0, forceClientRender: false, completedSegments: [], byteSize: 0, fallbackAbortableTasks: g, errorDigest: null }, k2 = U$1(a2, f2.chunks.length, h, f2.formatContext, false, false);
          f2.children.push(k2);
          f2.lastPushedText = false;
          var m2 = U$1(a2, 0, null, f2.formatContext, false, false);
          m2.parentFlushed = true;
          b.blockedBoundary = h;
          b.blockedSegment = m2;
          try {
            if (Hb$1(
              a2,
              b,
              d
            ), a2.responseState.generateStaticMarkup || m2.lastPushedText && m2.textEmbedded && m2.chunks.push("<!-- -->"), m2.status = 1, Y$1(h, m2), 0 === h.pendingTasks) break a;
          } catch (n2) {
            m2.status = 4, h.forceClientRender = true, h.errorDigest = V$1(a2, n2);
          } finally {
            b.blockedBoundary = c2, b.blockedSegment = f2;
          }
          b = Bb$1(a2, e2, c2, k2, g, b.legacyContext, b.context, b.treeContext);
          a2.pingedTasks.push(b);
        }
        return;
    }
    if ("object" === typeof c2 && null !== c2) switch (c2.$$typeof) {
      case Na$1:
        d = Db$1(a2, b, c2.render, d, f2);
        if (0 !== N$1) {
          c2 = b.treeContext;
          b.treeContext = gb$1(c2, 1, 0);
          try {
            X$1(a2, b, d);
          } finally {
            b.treeContext = c2;
          }
        } else X$1(a2, b, d);
        return;
      case Qa$1:
        c2 = c2.type;
        d = Fb(c2, d);
        Gb$1(a2, b, c2, d, f2);
        return;
      case La$1:
        f2 = d.children;
        c2 = c2._context;
        d = d.value;
        e2 = c2._currentValue2;
        c2._currentValue2 = d;
        g = E$1;
        E$1 = d = { parent: g, depth: null === g ? 0 : g.depth + 1, context: c2, parentValue: e2, value: d };
        b.context = d;
        X$1(a2, b, f2);
        a2 = E$1;
        if (null === a2) throw Error(l$3(403));
        d = a2.parentValue;
        a2.context._currentValue2 = d === Va$1 ? a2.context._defaultValue : d;
        a2 = E$1 = a2.parent;
        b.context = a2;
        return;
      case Ma$1:
        d = d.children;
        d = d(c2._currentValue2);
        X$1(a2, b, d);
        return;
      case Ra$1:
        f2 = c2._init;
        c2 = f2(c2._payload);
        d = Fb(c2, d);
        Gb$1(
          a2,
          b,
          c2,
          d,
          void 0
        );
        return;
    }
    throw Error(l$3(130, null == c2 ? c2 : typeof c2, ""));
  }
}
function X$1(a2, b, c2) {
  b.node = c2;
  if ("object" === typeof c2 && null !== c2) {
    switch (c2.$$typeof) {
      case Ga$1:
        Gb$1(a2, b, c2.type, c2.props, c2.ref);
        return;
      case Ha$1:
        throw Error(l$3(257));
      case Ra$1:
        var d = c2._init;
        c2 = d(c2._payload);
        X$1(a2, b, c2);
        return;
    }
    if (qa$1(c2)) {
      Ib$1(a2, b, c2);
      return;
    }
    null === c2 || "object" !== typeof c2 ? d = null : (d = Wa$1 && c2[Wa$1] || c2["@@iterator"], d = "function" === typeof d ? d : null);
    if (d && (d = d.call(c2))) {
      c2 = d.next();
      if (!c2.done) {
        var f2 = [];
        do
          f2.push(c2.value), c2 = d.next();
        while (!c2.done);
        Ib$1(a2, b, f2);
      }
      return;
    }
    a2 = Object.prototype.toString.call(c2);
    throw Error(l$3(31, "[object Object]" === a2 ? "object with keys {" + Object.keys(c2).join(", ") + "}" : a2));
  }
  "string" === typeof c2 ? (d = b.blockedSegment, d.lastPushedText = Fa$1(b.blockedSegment.chunks, c2, a2.responseState, d.lastPushedText)) : "number" === typeof c2 && (d = b.blockedSegment, d.lastPushedText = Fa$1(b.blockedSegment.chunks, "" + c2, a2.responseState, d.lastPushedText));
}
function Ib$1(a2, b, c2) {
  for (var d = c2.length, f2 = 0; f2 < d; f2++) {
    var e2 = b.treeContext;
    b.treeContext = gb$1(e2, d, f2);
    try {
      Hb$1(a2, b, c2[f2]);
    } finally {
      b.treeContext = e2;
    }
  }
}
function Hb$1(a2, b, c2) {
  var d = b.blockedSegment.formatContext, f2 = b.legacyContext, e2 = b.context;
  try {
    return X$1(a2, b, c2);
  } catch (k2) {
    if (rb$1(), "object" === typeof k2 && null !== k2 && "function" === typeof k2.then) {
      c2 = k2;
      var g = b.blockedSegment, h = U$1(a2, g.chunks.length, null, g.formatContext, g.lastPushedText, true);
      g.children.push(h);
      g.lastPushedText = false;
      a2 = Bb$1(a2, b.node, b.blockedBoundary, h, b.abortSet, b.legacyContext, b.context, b.treeContext).ping;
      c2.then(a2, a2);
      b.blockedSegment.formatContext = d;
      b.legacyContext = f2;
      b.context = e2;
      G(e2);
    } else throw b.blockedSegment.formatContext = d, b.legacyContext = f2, b.context = e2, G(e2), k2;
  }
}
function Jb$1(a2) {
  var b = a2.blockedBoundary;
  a2 = a2.blockedSegment;
  a2.status = 3;
  Kb$1(this, b, a2);
}
function Lb$1(a2, b, c2) {
  var d = a2.blockedBoundary;
  a2.blockedSegment.status = 3;
  null === d ? (b.allPendingTasks--, 2 !== b.status && (b.status = 2, null !== b.destination && b.destination.push(null))) : (d.pendingTasks--, d.forceClientRender || (d.forceClientRender = true, a2 = void 0 === c2 ? Error(l$3(432)) : c2, d.errorDigest = b.onError(a2), d.parentFlushed && b.clientRenderedBoundaries.push(d)), d.fallbackAbortableTasks.forEach(function(a3) {
    return Lb$1(a3, b, c2);
  }), d.fallbackAbortableTasks.clear(), b.allPendingTasks--, 0 === b.allPendingTasks && (d = b.onAllReady, d()));
}
function Y$1(a2, b) {
  if (0 === b.chunks.length && 1 === b.children.length && null === b.children[0].boundary) {
    var c2 = b.children[0];
    c2.id = b.id;
    c2.parentFlushed = true;
    1 === c2.status && Y$1(a2, c2);
  } else a2.completedSegments.push(b);
}
function Kb$1(a2, b, c2) {
  if (null === b) {
    if (c2.parentFlushed) {
      if (null !== a2.completedRootSegment) throw Error(l$3(389));
      a2.completedRootSegment = c2;
    }
    a2.pendingRootTasks--;
    0 === a2.pendingRootTasks && (a2.onShellError = T$1, b = a2.onShellReady, b());
  } else b.pendingTasks--, b.forceClientRender || (0 === b.pendingTasks ? (c2.parentFlushed && 1 === c2.status && Y$1(b, c2), b.parentFlushed && a2.completedBoundaries.push(b), b.fallbackAbortableTasks.forEach(Jb$1, a2), b.fallbackAbortableTasks.clear()) : c2.parentFlushed && 1 === c2.status && (Y$1(b, c2), 1 === b.completedSegments.length && b.parentFlushed && a2.partialBoundaries.push(b)));
  a2.allPendingTasks--;
  0 === a2.allPendingTasks && (a2 = a2.onAllReady, a2());
}
function Cb$1(a2) {
  if (2 !== a2.status) {
    var b = E$1, c2 = yb$1.current;
    yb$1.current = xb$1;
    var d = S$1;
    S$1 = a2.responseState;
    try {
      var f2 = a2.pingedTasks, e2;
      for (e2 = 0; e2 < f2.length; e2++) {
        var g = f2[e2];
        var h = a2, k2 = g.blockedSegment;
        if (0 === k2.status) {
          G(g.context);
          try {
            X$1(h, g, g.node), h.responseState.generateStaticMarkup || k2.lastPushedText && k2.textEmbedded && k2.chunks.push("<!-- -->"), g.abortSet.delete(g), k2.status = 1, Kb$1(h, g.blockedBoundary, k2);
          } catch (z2) {
            if (rb$1(), "object" === typeof z2 && null !== z2 && "function" === typeof z2.then) {
              var m2 = g.ping;
              z2.then(m2, m2);
            } else {
              g.abortSet.delete(g);
              k2.status = 4;
              var n2 = g.blockedBoundary, q2 = z2, C2 = V$1(h, q2);
              null === n2 ? W$1(h, q2) : (n2.pendingTasks--, n2.forceClientRender || (n2.forceClientRender = true, n2.errorDigest = C2, n2.parentFlushed && h.clientRenderedBoundaries.push(n2)));
              h.allPendingTasks--;
              if (0 === h.allPendingTasks) {
                var D2 = h.onAllReady;
                D2();
              }
            }
          } finally {
          }
        }
      }
      f2.splice(0, e2);
      null !== a2.destination && Mb$1(a2, a2.destination);
    } catch (z2) {
      V$1(a2, z2), W$1(a2, z2);
    } finally {
      S$1 = d, yb$1.current = c2, c2 === xb$1 && G(b);
    }
  }
}
function Z$1(a2, b, c2) {
  c2.parentFlushed = true;
  switch (c2.status) {
    case 0:
      var d = c2.id = a2.nextSegmentId++;
      c2.lastPushedText = false;
      c2.textEmbedded = false;
      a2 = a2.responseState;
      b.push('<template id="');
      b.push(a2.placeholderPrefix);
      a2 = d.toString(16);
      b.push(a2);
      return b.push('"></template>');
    case 1:
      c2.status = 2;
      var f2 = true;
      d = c2.chunks;
      var e2 = 0;
      c2 = c2.children;
      for (var g = 0; g < c2.length; g++) {
        for (f2 = c2[g]; e2 < f2.index; e2++) b.push(d[e2]);
        f2 = Nb$1(a2, b, f2);
      }
      for (; e2 < d.length - 1; e2++) b.push(d[e2]);
      e2 < d.length && (f2 = b.push(d[e2]));
      return f2;
    default:
      throw Error(l$3(390));
  }
}
function Nb$1(a2, b, c2) {
  var d = c2.boundary;
  if (null === d) return Z$1(a2, b, c2);
  d.parentFlushed = true;
  if (d.forceClientRender) return a2.responseState.generateStaticMarkup || (d = d.errorDigest, b.push("<!--$!-->"), b.push("<template"), d && (b.push(' data-dgst="'), d = v$1(d), b.push(d), b.push('"')), b.push("></template>")), Z$1(a2, b, c2), a2 = a2.responseState.generateStaticMarkup ? true : b.push("<!--/$-->"), a2;
  if (0 < d.pendingTasks) {
    d.rootSegmentID = a2.nextSegmentId++;
    0 < d.completedSegments.length && a2.partialBoundaries.push(d);
    var f2 = a2.responseState;
    var e2 = f2.nextSuspenseID++;
    f2 = f2.boundaryPrefix + e2.toString(16);
    d = d.id = f2;
    za$1(b, a2.responseState, d);
    Z$1(a2, b, c2);
    return b.push("<!--/$-->");
  }
  if (d.byteSize > a2.progressiveChunkSize) return d.rootSegmentID = a2.nextSegmentId++, a2.completedBoundaries.push(d), za$1(b, a2.responseState, d.id), Z$1(a2, b, c2), b.push("<!--/$-->");
  a2.responseState.generateStaticMarkup || b.push("<!--$-->");
  c2 = d.completedSegments;
  if (1 !== c2.length) throw Error(l$3(391));
  Nb$1(a2, b, c2[0]);
  a2 = a2.responseState.generateStaticMarkup ? true : b.push("<!--/$-->");
  return a2;
}
function Ob$1(a2, b, c2) {
  Aa$1(b, a2.responseState, c2.formatContext, c2.id);
  Nb$1(a2, b, c2);
  return Ba$1(b, c2.formatContext);
}
function Pb$1(a2, b, c2) {
  for (var d = c2.completedSegments, f2 = 0; f2 < d.length; f2++) Qb$1(a2, b, c2, d[f2]);
  d.length = 0;
  a2 = a2.responseState;
  d = c2.id;
  c2 = c2.rootSegmentID;
  b.push(a2.startInlineScript);
  a2.sentCompleteBoundaryFunction ? b.push('$RC("') : (a2.sentCompleteBoundaryFunction = true, b.push('function $RC(a,b){a=document.getElementById(a);b=document.getElementById(b);b.parentNode.removeChild(b);if(a){a=a.previousSibling;var f=a.parentNode,c=a.nextSibling,e=0;do{if(c&&8===c.nodeType){var d=c.data;if("/$"===d)if(0===e)break;else e--;else"$"!==d&&"$?"!==d&&"$!"!==d||e++}d=c.nextSibling;f.removeChild(c);c=d}while(c);for(;b.firstChild;)f.insertBefore(b.firstChild,c);a.data="$";a._reactRetry&&a._reactRetry()}};$RC("'));
  if (null === d) throw Error(l$3(395));
  c2 = c2.toString(16);
  b.push(d);
  b.push('","');
  b.push(a2.segmentPrefix);
  b.push(c2);
  return b.push('")<\/script>');
}
function Qb$1(a2, b, c2, d) {
  if (2 === d.status) return true;
  var f2 = d.id;
  if (-1 === f2) {
    if (-1 === (d.id = c2.rootSegmentID)) throw Error(l$3(392));
    return Ob$1(a2, b, d);
  }
  Ob$1(a2, b, d);
  a2 = a2.responseState;
  b.push(a2.startInlineScript);
  a2.sentCompleteSegmentFunction ? b.push('$RS("') : (a2.sentCompleteSegmentFunction = true, b.push('function $RS(a,b){a=document.getElementById(a);b=document.getElementById(b);for(a.parentNode.removeChild(a);a.firstChild;)b.parentNode.insertBefore(a.firstChild,b);b.parentNode.removeChild(b)};$RS("'));
  b.push(a2.segmentPrefix);
  f2 = f2.toString(16);
  b.push(f2);
  b.push('","');
  b.push(a2.placeholderPrefix);
  b.push(f2);
  return b.push('")<\/script>');
}
function Mb$1(a2, b) {
  try {
    var c2 = a2.completedRootSegment;
    if (null !== c2 && 0 === a2.pendingRootTasks) {
      Nb$1(a2, b, c2);
      a2.completedRootSegment = null;
      var d = a2.responseState.bootstrapChunks;
      for (c2 = 0; c2 < d.length - 1; c2++) b.push(d[c2]);
      c2 < d.length && b.push(d[c2]);
    }
    var f2 = a2.clientRenderedBoundaries, e2;
    for (e2 = 0; e2 < f2.length; e2++) {
      var g = f2[e2];
      d = b;
      var h = a2.responseState, k2 = g.id, m2 = g.errorDigest, n2 = g.errorMessage, q2 = g.errorComponentStack;
      d.push(h.startInlineScript);
      h.sentClientRenderFunction ? d.push('$RX("') : (h.sentClientRenderFunction = true, d.push('function $RX(b,c,d,e){var a=document.getElementById(b);a&&(b=a.previousSibling,b.data="$!",a=a.dataset,c&&(a.dgst=c),d&&(a.msg=d),e&&(a.stck=e),b._reactRetry&&b._reactRetry())};$RX("'));
      if (null === k2) throw Error(l$3(395));
      d.push(k2);
      d.push('"');
      if (m2 || n2 || q2) {
        d.push(",");
        var C2 = Da$1(m2 || "");
        d.push(C2);
      }
      if (n2 || q2) {
        d.push(",");
        var D2 = Da$1(n2 || "");
        d.push(D2);
      }
      if (q2) {
        d.push(",");
        var z2 = Da$1(q2);
        d.push(z2);
      }
      if (!d.push(")<\/script>")) {
        a2.destination = null;
        e2++;
        f2.splice(0, e2);
        return;
      }
    }
    f2.splice(0, e2);
    var ba2 = a2.completedBoundaries;
    for (e2 = 0; e2 < ba2.length; e2++) if (!Pb$1(a2, b, ba2[e2])) {
      a2.destination = null;
      e2++;
      ba2.splice(0, e2);
      return;
    }
    ba2.splice(0, e2);
    var ca2 = a2.partialBoundaries;
    for (e2 = 0; e2 < ca2.length; e2++) {
      var mb2 = ca2[e2];
      a: {
        f2 = a2;
        g = b;
        var da2 = mb2.completedSegments;
        for (h = 0; h < da2.length; h++) if (!Qb$1(f2, g, mb2, da2[h])) {
          h++;
          da2.splice(0, h);
          var nb2 = false;
          break a;
        }
        da2.splice(0, h);
        nb2 = true;
      }
      if (!nb2) {
        a2.destination = null;
        e2++;
        ca2.splice(0, e2);
        return;
      }
    }
    ca2.splice(0, e2);
    var ea2 = a2.completedBoundaries;
    for (e2 = 0; e2 < ea2.length; e2++) if (!Pb$1(a2, b, ea2[e2])) {
      a2.destination = null;
      e2++;
      ea2.splice(0, e2);
      return;
    }
    ea2.splice(0, e2);
  } finally {
    0 === a2.allPendingTasks && 0 === a2.pingedTasks.length && 0 === a2.clientRenderedBoundaries.length && 0 === a2.completedBoundaries.length && b.push(null);
  }
}
function Rb$1(a2, b) {
  try {
    var c2 = a2.abortableTasks;
    c2.forEach(function(c3) {
      return Lb$1(c3, a2, b);
    });
    c2.clear();
    null !== a2.destination && Mb$1(a2, a2.destination);
  } catch (d) {
    V$1(a2, d), W$1(a2, d);
  }
}
function Sb$1() {
}
function Tb$1(a2, b, c2, d) {
  var f2 = false, e2 = null, g = "", h = { push: function(a3) {
    null !== a3 && (g += a3);
    return true;
  }, destroy: function(a3) {
    f2 = true;
    e2 = a3;
  } }, k2 = false;
  a2 = Ab$1(a2, Ea$1(c2, b ? b.identifierPrefix : void 0), { insertionMode: 1, selectedValue: null }, Infinity, Sb$1, void 0, function() {
    k2 = true;
  });
  Cb$1(a2);
  Rb$1(a2, d);
  if (1 === a2.status) a2.status = 2, h.destroy(a2.fatalError);
  else if (2 !== a2.status && null === a2.destination) {
    a2.destination = h;
    try {
      Mb$1(a2, h);
    } catch (m2) {
      V$1(a2, m2), W$1(a2, m2);
    }
  }
  if (f2) throw e2;
  if (!k2) throw Error(l$3(426));
  return g;
}
reactDomServerLegacy_browser_production_min.renderToNodeStream = function() {
  throw Error(l$3(207));
};
reactDomServerLegacy_browser_production_min.renderToStaticMarkup = function(a2, b) {
  return Tb$1(a2, b, true, 'The server used "renderToStaticMarkup" which does not support Suspense. If you intended to have the server wait for the suspended component please switch to "renderToReadableStream" which supports Suspense on the server');
};
reactDomServerLegacy_browser_production_min.renderToStaticNodeStream = function() {
  throw Error(l$3(208));
};
reactDomServerLegacy_browser_production_min.renderToString = function(a2, b) {
  return Tb$1(a2, b, false, 'The server used "renderToString" which does not support Suspense. If you intended for this Suspense boundary to render the fallback content on the server consider throwing an Error somewhere within the Suspense boundary. If you intended to have the server wait for the suspended component please switch to "renderToReadableStream" which supports Suspense on the server');
};
reactDomServerLegacy_browser_production_min.version = "18.3.1";
var reactDomServer_browser_production_min = {};
/**
 * @license React
 * react-dom-server.browser.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var aa = reactExports;
function k(a2) {
  for (var b = "https://reactjs.org/docs/error-decoder.html?invariant=" + a2, c2 = 1; c2 < arguments.length; c2++) b += "&args[]=" + encodeURIComponent(arguments[c2]);
  return "Minified React error #" + a2 + "; visit " + b + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var l$2 = null, n$1 = 0;
function p(a2, b) {
  if (0 !== b.length) if (512 < b.length) 0 < n$1 && (a2.enqueue(new Uint8Array(l$2.buffer, 0, n$1)), l$2 = new Uint8Array(512), n$1 = 0), a2.enqueue(b);
  else {
    var c2 = l$2.length - n$1;
    c2 < b.length && (0 === c2 ? a2.enqueue(l$2) : (l$2.set(b.subarray(0, c2), n$1), a2.enqueue(l$2), b = b.subarray(c2)), l$2 = new Uint8Array(512), n$1 = 0);
    l$2.set(b, n$1);
    n$1 += b.length;
  }
}
function t$1(a2, b) {
  p(a2, b);
  return true;
}
function ba(a2) {
  l$2 && 0 < n$1 && (a2.enqueue(new Uint8Array(l$2.buffer, 0, n$1)), l$2 = null, n$1 = 0);
}
var ca = new TextEncoder();
function u$1(a2) {
  return ca.encode(a2);
}
function w(a2) {
  return ca.encode(a2);
}
function da(a2, b) {
  "function" === typeof a2.error ? a2.error(b) : a2.close();
}
var x = Object.prototype.hasOwnProperty, ea = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, fa = {}, ha = {};
function ia(a2) {
  if (x.call(ha, a2)) return true;
  if (x.call(fa, a2)) return false;
  if (ea.test(a2)) return ha[a2] = true;
  fa[a2] = true;
  return false;
}
function y(a2, b, c2, d, f2, e2, g) {
  this.acceptsBooleans = 2 === b || 3 === b || 4 === b;
  this.attributeName = d;
  this.attributeNamespace = f2;
  this.mustUseProperty = c2;
  this.propertyName = a2;
  this.type = b;
  this.sanitizeURL = e2;
  this.removeEmptyString = g;
}
var z = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a2) {
  z[a2] = new y(a2, 0, false, a2, null, false, false);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(a2) {
  var b = a2[0];
  z[b] = new y(b, 1, false, a2[1], null, false, false);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(a2) {
  z[a2] = new y(a2, 2, false, a2.toLowerCase(), null, false, false);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(a2) {
  z[a2] = new y(a2, 2, false, a2, null, false, false);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a2) {
  z[a2] = new y(a2, 3, false, a2.toLowerCase(), null, false, false);
});
["checked", "multiple", "muted", "selected"].forEach(function(a2) {
  z[a2] = new y(a2, 3, true, a2, null, false, false);
});
["capture", "download"].forEach(function(a2) {
  z[a2] = new y(a2, 4, false, a2, null, false, false);
});
["cols", "rows", "size", "span"].forEach(function(a2) {
  z[a2] = new y(a2, 6, false, a2, null, false, false);
});
["rowSpan", "start"].forEach(function(a2) {
  z[a2] = new y(a2, 5, false, a2.toLowerCase(), null, false, false);
});
var ja = /[\-:]([a-z])/g;
function ka(a2) {
  return a2[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a2) {
  var b = a2.replace(
    ja,
    ka
  );
  z[b] = new y(b, 1, false, a2, null, false, false);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a2) {
  var b = a2.replace(ja, ka);
  z[b] = new y(b, 1, false, a2, "http://www.w3.org/1999/xlink", false, false);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(a2) {
  var b = a2.replace(ja, ka);
  z[b] = new y(b, 1, false, a2, "http://www.w3.org/XML/1998/namespace", false, false);
});
["tabIndex", "crossOrigin"].forEach(function(a2) {
  z[a2] = new y(a2, 1, false, a2.toLowerCase(), null, false, false);
});
z.xlinkHref = new y("xlinkHref", 1, false, "xlink:href", "http://www.w3.org/1999/xlink", true, false);
["src", "href", "action", "formAction"].forEach(function(a2) {
  z[a2] = new y(a2, 1, false, a2.toLowerCase(), null, true, true);
});
var B = {
  animationIterationCount: true,
  aspectRatio: true,
  borderImageOutset: true,
  borderImageSlice: true,
  borderImageWidth: true,
  boxFlex: true,
  boxFlexGroup: true,
  boxOrdinalGroup: true,
  columnCount: true,
  columns: true,
  flex: true,
  flexGrow: true,
  flexPositive: true,
  flexShrink: true,
  flexNegative: true,
  flexOrder: true,
  gridArea: true,
  gridRow: true,
  gridRowEnd: true,
  gridRowSpan: true,
  gridRowStart: true,
  gridColumn: true,
  gridColumnEnd: true,
  gridColumnSpan: true,
  gridColumnStart: true,
  fontWeight: true,
  lineClamp: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  tabSize: true,
  widows: true,
  zIndex: true,
  zoom: true,
  fillOpacity: true,
  floodOpacity: true,
  stopOpacity: true,
  strokeDasharray: true,
  strokeDashoffset: true,
  strokeMiterlimit: true,
  strokeOpacity: true,
  strokeWidth: true
}, la = ["Webkit", "ms", "Moz", "O"];
Object.keys(B).forEach(function(a2) {
  la.forEach(function(b) {
    b = b + a2.charAt(0).toUpperCase() + a2.substring(1);
    B[b] = B[a2];
  });
});
var oa = /["'&<>]/;
function C(a2) {
  if ("boolean" === typeof a2 || "number" === typeof a2) return "" + a2;
  a2 = "" + a2;
  var b = oa.exec(a2);
  if (b) {
    var c2 = "", d, f2 = 0;
    for (d = b.index; d < a2.length; d++) {
      switch (a2.charCodeAt(d)) {
        case 34:
          b = "&quot;";
          break;
        case 38:
          b = "&amp;";
          break;
        case 39:
          b = "&#x27;";
          break;
        case 60:
          b = "&lt;";
          break;
        case 62:
          b = "&gt;";
          break;
        default:
          continue;
      }
      f2 !== d && (c2 += a2.substring(f2, d));
      f2 = d + 1;
      c2 += b;
    }
    a2 = f2 !== d ? c2 + a2.substring(f2, d) : c2;
  }
  return a2;
}
var pa = /([A-Z])/g, qa = /^ms-/, ra = Array.isArray, sa = w("<script>"), ta = w("<\/script>"), ua = w('<script src="'), va = w('<script type="module" src="'), wa = w('" async=""><\/script>'), xa = /(<\/|<)(s)(cript)/gi;
function ya(a2, b, c2, d) {
  return "" + b + ("s" === c2 ? "\\u0073" : "\\u0053") + d;
}
function za(a2, b, c2, d, f2) {
  a2 = void 0 === a2 ? "" : a2;
  b = void 0 === b ? sa : w('<script nonce="' + C(b) + '">');
  var e2 = [];
  void 0 !== c2 && e2.push(b, u$1(("" + c2).replace(xa, ya)), ta);
  if (void 0 !== d) for (c2 = 0; c2 < d.length; c2++) e2.push(ua, u$1(C(d[c2])), wa);
  if (void 0 !== f2) for (d = 0; d < f2.length; d++) e2.push(va, u$1(C(f2[d])), wa);
  return { bootstrapChunks: e2, startInlineScript: b, placeholderPrefix: w(a2 + "P:"), segmentPrefix: w(a2 + "S:"), boundaryPrefix: a2 + "B:", idPrefix: a2, nextSuspenseID: 0, sentCompleteSegmentFunction: false, sentCompleteBoundaryFunction: false, sentClientRenderFunction: false };
}
function D(a2, b) {
  return { insertionMode: a2, selectedValue: b };
}
function Aa(a2) {
  return D("http://www.w3.org/2000/svg" === a2 ? 2 : "http://www.w3.org/1998/Math/MathML" === a2 ? 3 : 0, null);
}
function Ba(a2, b, c2) {
  switch (b) {
    case "select":
      return D(1, null != c2.value ? c2.value : c2.defaultValue);
    case "svg":
      return D(2, null);
    case "math":
      return D(3, null);
    case "foreignObject":
      return D(1, null);
    case "table":
      return D(4, null);
    case "thead":
    case "tbody":
    case "tfoot":
      return D(5, null);
    case "colgroup":
      return D(7, null);
    case "tr":
      return D(6, null);
  }
  return 4 <= a2.insertionMode || 0 === a2.insertionMode ? D(1, null) : a2;
}
var Ca = w("<!-- -->");
function Da(a2, b, c2, d) {
  if ("" === b) return d;
  d && a2.push(Ca);
  a2.push(u$1(C(b)));
  return true;
}
var Ea = /* @__PURE__ */ new Map(), Fa = w(' style="'), Ga = w(":"), Ha = w(";");
function Ia(a2, b, c2) {
  if ("object" !== typeof c2) throw Error(k(62));
  b = true;
  for (var d in c2) if (x.call(c2, d)) {
    var f2 = c2[d];
    if (null != f2 && "boolean" !== typeof f2 && "" !== f2) {
      if (0 === d.indexOf("--")) {
        var e2 = u$1(C(d));
        f2 = u$1(C(("" + f2).trim()));
      } else {
        e2 = d;
        var g = Ea.get(e2);
        void 0 !== g ? e2 = g : (g = w(C(e2.replace(pa, "-$1").toLowerCase().replace(qa, "-ms-"))), Ea.set(e2, g), e2 = g);
        f2 = "number" === typeof f2 ? 0 === f2 || x.call(B, d) ? u$1("" + f2) : u$1(f2 + "px") : u$1(C(("" + f2).trim()));
      }
      b ? (b = false, a2.push(Fa, e2, Ga, f2)) : a2.push(Ha, e2, Ga, f2);
    }
  }
  b || a2.push(E);
}
var H = w(" "), I = w('="'), E = w('"'), Ja = w('=""');
function J(a2, b, c2, d) {
  switch (c2) {
    case "style":
      Ia(a2, b, d);
      return;
    case "defaultValue":
    case "defaultChecked":
    case "innerHTML":
    case "suppressContentEditableWarning":
    case "suppressHydrationWarning":
      return;
  }
  if (!(2 < c2.length) || "o" !== c2[0] && "O" !== c2[0] || "n" !== c2[1] && "N" !== c2[1]) {
    if (b = z.hasOwnProperty(c2) ? z[c2] : null, null !== b) {
      switch (typeof d) {
        case "function":
        case "symbol":
          return;
        case "boolean":
          if (!b.acceptsBooleans) return;
      }
      c2 = u$1(b.attributeName);
      switch (b.type) {
        case 3:
          d && a2.push(H, c2, Ja);
          break;
        case 4:
          true === d ? a2.push(H, c2, Ja) : false !== d && a2.push(H, c2, I, u$1(C(d)), E);
          break;
        case 5:
          isNaN(d) || a2.push(H, c2, I, u$1(C(d)), E);
          break;
        case 6:
          !isNaN(d) && 1 <= d && a2.push(H, c2, I, u$1(C(d)), E);
          break;
        default:
          b.sanitizeURL && (d = "" + d), a2.push(H, c2, I, u$1(C(d)), E);
      }
    } else if (ia(c2)) {
      switch (typeof d) {
        case "function":
        case "symbol":
          return;
        case "boolean":
          if (b = c2.toLowerCase().slice(0, 5), "data-" !== b && "aria-" !== b) return;
      }
      a2.push(H, u$1(c2), I, u$1(C(d)), E);
    }
  }
}
var K = w(">"), Ka = w("/>");
function L(a2, b, c2) {
  if (null != b) {
    if (null != c2) throw Error(k(60));
    if ("object" !== typeof b || !("__html" in b)) throw Error(k(61));
    b = b.__html;
    null !== b && void 0 !== b && a2.push(u$1("" + b));
  }
}
function La(a2) {
  var b = "";
  aa.Children.forEach(a2, function(a3) {
    null != a3 && (b += a3);
  });
  return b;
}
var Ma = w(' selected=""');
function Na(a2, b, c2, d) {
  a2.push(M(c2));
  var f2 = c2 = null, e2;
  for (e2 in b) if (x.call(b, e2)) {
    var g = b[e2];
    if (null != g) switch (e2) {
      case "children":
        c2 = g;
        break;
      case "dangerouslySetInnerHTML":
        f2 = g;
        break;
      default:
        J(a2, d, e2, g);
    }
  }
  a2.push(K);
  L(a2, f2, c2);
  return "string" === typeof c2 ? (a2.push(u$1(C(c2))), null) : c2;
}
var Oa = w("\n"), Pa = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/, Qa = /* @__PURE__ */ new Map();
function M(a2) {
  var b = Qa.get(a2);
  if (void 0 === b) {
    if (!Pa.test(a2)) throw Error(k(65, a2));
    b = w("<" + a2);
    Qa.set(a2, b);
  }
  return b;
}
var Ra = w("<!DOCTYPE html>");
function Sa(a2, b, c2, d, f2) {
  switch (b) {
    case "select":
      a2.push(M("select"));
      var e2 = null, g = null;
      for (r2 in c2) if (x.call(c2, r2)) {
        var h = c2[r2];
        if (null != h) switch (r2) {
          case "children":
            e2 = h;
            break;
          case "dangerouslySetInnerHTML":
            g = h;
            break;
          case "defaultValue":
          case "value":
            break;
          default:
            J(a2, d, r2, h);
        }
      }
      a2.push(K);
      L(a2, g, e2);
      return e2;
    case "option":
      g = f2.selectedValue;
      a2.push(M("option"));
      var m2 = h = null, q2 = null;
      var r2 = null;
      for (e2 in c2) if (x.call(c2, e2)) {
        var v2 = c2[e2];
        if (null != v2) switch (e2) {
          case "children":
            h = v2;
            break;
          case "selected":
            q2 = v2;
            break;
          case "dangerouslySetInnerHTML":
            r2 = v2;
            break;
          case "value":
            m2 = v2;
          default:
            J(a2, d, e2, v2);
        }
      }
      if (null != g) if (c2 = null !== m2 ? "" + m2 : La(h), ra(g)) for (d = 0; d < g.length; d++) {
        if ("" + g[d] === c2) {
          a2.push(Ma);
          break;
        }
      }
      else "" + g === c2 && a2.push(Ma);
      else q2 && a2.push(Ma);
      a2.push(K);
      L(a2, r2, h);
      return h;
    case "textarea":
      a2.push(M("textarea"));
      r2 = g = e2 = null;
      for (h in c2) if (x.call(c2, h) && (m2 = c2[h], null != m2)) switch (h) {
        case "children":
          r2 = m2;
          break;
        case "value":
          e2 = m2;
          break;
        case "defaultValue":
          g = m2;
          break;
        case "dangerouslySetInnerHTML":
          throw Error(k(91));
        default:
          J(a2, d, h, m2);
      }
      null === e2 && null !== g && (e2 = g);
      a2.push(K);
      if (null != r2) {
        if (null != e2) throw Error(k(92));
        if (ra(r2) && 1 < r2.length) throw Error(k(93));
        e2 = "" + r2;
      }
      "string" === typeof e2 && "\n" === e2[0] && a2.push(Oa);
      null !== e2 && a2.push(u$1(C("" + e2)));
      return null;
    case "input":
      a2.push(M("input"));
      m2 = r2 = h = e2 = null;
      for (g in c2) if (x.call(c2, g) && (q2 = c2[g], null != q2)) switch (g) {
        case "children":
        case "dangerouslySetInnerHTML":
          throw Error(k(399, "input"));
        case "defaultChecked":
          m2 = q2;
          break;
        case "defaultValue":
          h = q2;
          break;
        case "checked":
          r2 = q2;
          break;
        case "value":
          e2 = q2;
          break;
        default:
          J(a2, d, g, q2);
      }
      null !== r2 ? J(
        a2,
        d,
        "checked",
        r2
      ) : null !== m2 && J(a2, d, "checked", m2);
      null !== e2 ? J(a2, d, "value", e2) : null !== h && J(a2, d, "value", h);
      a2.push(Ka);
      return null;
    case "menuitem":
      a2.push(M("menuitem"));
      for (var A2 in c2) if (x.call(c2, A2) && (e2 = c2[A2], null != e2)) switch (A2) {
        case "children":
        case "dangerouslySetInnerHTML":
          throw Error(k(400));
        default:
          J(a2, d, A2, e2);
      }
      a2.push(K);
      return null;
    case "title":
      a2.push(M("title"));
      e2 = null;
      for (v2 in c2) if (x.call(c2, v2) && (g = c2[v2], null != g)) switch (v2) {
        case "children":
          e2 = g;
          break;
        case "dangerouslySetInnerHTML":
          throw Error(k(434));
        default:
          J(a2, d, v2, g);
      }
      a2.push(K);
      return e2;
    case "listing":
    case "pre":
      a2.push(M(b));
      g = e2 = null;
      for (m2 in c2) if (x.call(c2, m2) && (h = c2[m2], null != h)) switch (m2) {
        case "children":
          e2 = h;
          break;
        case "dangerouslySetInnerHTML":
          g = h;
          break;
        default:
          J(a2, d, m2, h);
      }
      a2.push(K);
      if (null != g) {
        if (null != e2) throw Error(k(60));
        if ("object" !== typeof g || !("__html" in g)) throw Error(k(61));
        c2 = g.__html;
        null !== c2 && void 0 !== c2 && ("string" === typeof c2 && 0 < c2.length && "\n" === c2[0] ? a2.push(Oa, u$1(c2)) : a2.push(u$1("" + c2)));
      }
      "string" === typeof e2 && "\n" === e2[0] && a2.push(Oa);
      return e2;
    case "area":
    case "base":
    case "br":
    case "col":
    case "embed":
    case "hr":
    case "img":
    case "keygen":
    case "link":
    case "meta":
    case "param":
    case "source":
    case "track":
    case "wbr":
      a2.push(M(b));
      for (var F2 in c2) if (x.call(c2, F2) && (e2 = c2[F2], null != e2)) switch (F2) {
        case "children":
        case "dangerouslySetInnerHTML":
          throw Error(k(399, b));
        default:
          J(a2, d, F2, e2);
      }
      a2.push(Ka);
      return null;
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return Na(a2, c2, b, d);
    case "html":
      return 0 === f2.insertionMode && a2.push(Ra), Na(a2, c2, b, d);
    default:
      if (-1 === b.indexOf("-") && "string" !== typeof c2.is) return Na(a2, c2, b, d);
      a2.push(M(b));
      g = e2 = null;
      for (q2 in c2) if (x.call(c2, q2) && (h = c2[q2], null != h)) switch (q2) {
        case "children":
          e2 = h;
          break;
        case "dangerouslySetInnerHTML":
          g = h;
          break;
        case "style":
          Ia(a2, d, h);
          break;
        case "suppressContentEditableWarning":
        case "suppressHydrationWarning":
          break;
        default:
          ia(q2) && "function" !== typeof h && "symbol" !== typeof h && a2.push(H, u$1(q2), I, u$1(C(h)), E);
      }
      a2.push(K);
      L(a2, g, e2);
      return e2;
  }
}
var Ta = w("</"), Ua = w(">"), Va = w('<template id="'), Wa = w('"></template>'), Xa = w("<!--$-->"), Ya = w('<!--$?--><template id="'), Za = w('"></template>'), $a = w("<!--$!-->"), ab = w("<!--/$-->"), bb = w("<template"), cb = w('"'), db = w(' data-dgst="');
w(' data-msg="');
w(' data-stck="');
var eb = w("></template>");
function fb(a2, b, c2) {
  p(a2, Ya);
  if (null === c2) throw Error(k(395));
  p(a2, c2);
  return t$1(a2, Za);
}
var gb = w('<div hidden id="'), hb = w('">'), ib = w("</div>"), jb = w('<svg aria-hidden="true" style="display:none" id="'), kb = w('">'), lb = w("</svg>"), mb = w('<math aria-hidden="true" style="display:none" id="'), nb = w('">'), ob = w("</math>"), pb = w('<table hidden id="'), qb = w('">'), rb = w("</table>"), sb = w('<table hidden><tbody id="'), tb = w('">'), ub = w("</tbody></table>"), vb = w('<table hidden><tr id="'), wb = w('">'), xb = w("</tr></table>"), yb = w('<table hidden><colgroup id="'), zb = w('">'), Ab = w("</colgroup></table>");
function Bb(a2, b, c2, d) {
  switch (c2.insertionMode) {
    case 0:
    case 1:
      return p(a2, gb), p(a2, b.segmentPrefix), p(a2, u$1(d.toString(16))), t$1(a2, hb);
    case 2:
      return p(a2, jb), p(a2, b.segmentPrefix), p(a2, u$1(d.toString(16))), t$1(a2, kb);
    case 3:
      return p(a2, mb), p(a2, b.segmentPrefix), p(a2, u$1(d.toString(16))), t$1(a2, nb);
    case 4:
      return p(a2, pb), p(a2, b.segmentPrefix), p(a2, u$1(d.toString(16))), t$1(a2, qb);
    case 5:
      return p(a2, sb), p(a2, b.segmentPrefix), p(a2, u$1(d.toString(16))), t$1(a2, tb);
    case 6:
      return p(a2, vb), p(a2, b.segmentPrefix), p(a2, u$1(d.toString(16))), t$1(a2, wb);
    case 7:
      return p(
        a2,
        yb
      ), p(a2, b.segmentPrefix), p(a2, u$1(d.toString(16))), t$1(a2, zb);
    default:
      throw Error(k(397));
  }
}
function Cb(a2, b) {
  switch (b.insertionMode) {
    case 0:
    case 1:
      return t$1(a2, ib);
    case 2:
      return t$1(a2, lb);
    case 3:
      return t$1(a2, ob);
    case 4:
      return t$1(a2, rb);
    case 5:
      return t$1(a2, ub);
    case 6:
      return t$1(a2, xb);
    case 7:
      return t$1(a2, Ab);
    default:
      throw Error(k(397));
  }
}
var Db = w('function $RS(a,b){a=document.getElementById(a);b=document.getElementById(b);for(a.parentNode.removeChild(a);a.firstChild;)b.parentNode.insertBefore(a.firstChild,b);b.parentNode.removeChild(b)};$RS("'), Eb = w('$RS("'), Gb = w('","'), Hb = w('")<\/script>'), Ib = w('function $RC(a,b){a=document.getElementById(a);b=document.getElementById(b);b.parentNode.removeChild(b);if(a){a=a.previousSibling;var f=a.parentNode,c=a.nextSibling,e=0;do{if(c&&8===c.nodeType){var d=c.data;if("/$"===d)if(0===e)break;else e--;else"$"!==d&&"$?"!==d&&"$!"!==d||e++}d=c.nextSibling;f.removeChild(c);c=d}while(c);for(;b.firstChild;)f.insertBefore(b.firstChild,c);a.data="$";a._reactRetry&&a._reactRetry()}};$RC("'), Jb = w('$RC("'), Kb = w('","'), Lb = w('")<\/script>'), Mb = w('function $RX(b,c,d,e){var a=document.getElementById(b);a&&(b=a.previousSibling,b.data="$!",a=a.dataset,c&&(a.dgst=c),d&&(a.msg=d),e&&(a.stck=e),b._reactRetry&&b._reactRetry())};$RX("'), Nb = w('$RX("'), Ob = w('"'), Pb = w(")<\/script>"), Qb = w(","), Rb = /[<\u2028\u2029]/g;
function Sb(a2) {
  return JSON.stringify(a2).replace(Rb, function(a3) {
    switch (a3) {
      case "<":
        return "\\u003c";
      case "\u2028":
        return "\\u2028";
      case "\u2029":
        return "\\u2029";
      default:
        throw Error("escapeJSStringsForInstructionScripts encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React");
    }
  });
}
var N = Object.assign, Tb = Symbol.for("react.element"), Ub = Symbol.for("react.portal"), Vb = Symbol.for("react.fragment"), Wb = Symbol.for("react.strict_mode"), Xb = Symbol.for("react.profiler"), Yb = Symbol.for("react.provider"), Zb = Symbol.for("react.context"), $b = Symbol.for("react.forward_ref"), ac = Symbol.for("react.suspense"), bc = Symbol.for("react.suspense_list"), cc = Symbol.for("react.memo"), dc = Symbol.for("react.lazy"), ec = Symbol.for("react.scope"), fc = Symbol.for("react.debug_trace_mode"), gc = Symbol.for("react.legacy_hidden"), hc = Symbol.for("react.default_value"), ic = Symbol.iterator;
function jc(a2) {
  if (null == a2) return null;
  if ("function" === typeof a2) return a2.displayName || a2.name || null;
  if ("string" === typeof a2) return a2;
  switch (a2) {
    case Vb:
      return "Fragment";
    case Ub:
      return "Portal";
    case Xb:
      return "Profiler";
    case Wb:
      return "StrictMode";
    case ac:
      return "Suspense";
    case bc:
      return "SuspenseList";
  }
  if ("object" === typeof a2) switch (a2.$$typeof) {
    case Zb:
      return (a2.displayName || "Context") + ".Consumer";
    case Yb:
      return (a2._context.displayName || "Context") + ".Provider";
    case $b:
      var b = a2.render;
      a2 = a2.displayName;
      a2 || (a2 = b.displayName || b.name || "", a2 = "" !== a2 ? "ForwardRef(" + a2 + ")" : "ForwardRef");
      return a2;
    case cc:
      return b = a2.displayName || null, null !== b ? b : jc(a2.type) || "Memo";
    case dc:
      b = a2._payload;
      a2 = a2._init;
      try {
        return jc(a2(b));
      } catch (c2) {
      }
  }
  return null;
}
var kc = {};
function lc(a2, b) {
  a2 = a2.contextTypes;
  if (!a2) return kc;
  var c2 = {}, d;
  for (d in a2) c2[d] = b[d];
  return c2;
}
var O = null;
function P(a2, b) {
  if (a2 !== b) {
    a2.context._currentValue = a2.parentValue;
    a2 = a2.parent;
    var c2 = b.parent;
    if (null === a2) {
      if (null !== c2) throw Error(k(401));
    } else {
      if (null === c2) throw Error(k(401));
      P(a2, c2);
    }
    b.context._currentValue = b.value;
  }
}
function mc(a2) {
  a2.context._currentValue = a2.parentValue;
  a2 = a2.parent;
  null !== a2 && mc(a2);
}
function nc(a2) {
  var b = a2.parent;
  null !== b && nc(b);
  a2.context._currentValue = a2.value;
}
function oc(a2, b) {
  a2.context._currentValue = a2.parentValue;
  a2 = a2.parent;
  if (null === a2) throw Error(k(402));
  a2.depth === b.depth ? P(a2, b) : oc(a2, b);
}
function pc(a2, b) {
  var c2 = b.parent;
  if (null === c2) throw Error(k(402));
  a2.depth === c2.depth ? P(a2, c2) : pc(a2, c2);
  b.context._currentValue = b.value;
}
function Q(a2) {
  var b = O;
  b !== a2 && (null === b ? nc(a2) : null === a2 ? mc(b) : b.depth === a2.depth ? P(b, a2) : b.depth > a2.depth ? oc(b, a2) : pc(b, a2), O = a2);
}
var qc = { isMounted: function() {
  return false;
}, enqueueSetState: function(a2, b) {
  a2 = a2._reactInternals;
  null !== a2.queue && a2.queue.push(b);
}, enqueueReplaceState: function(a2, b) {
  a2 = a2._reactInternals;
  a2.replace = true;
  a2.queue = [b];
}, enqueueForceUpdate: function() {
} };
function rc(a2, b, c2, d) {
  var f2 = void 0 !== a2.state ? a2.state : null;
  a2.updater = qc;
  a2.props = c2;
  a2.state = f2;
  var e2 = { queue: [], replace: false };
  a2._reactInternals = e2;
  var g = b.contextType;
  a2.context = "object" === typeof g && null !== g ? g._currentValue : d;
  g = b.getDerivedStateFromProps;
  "function" === typeof g && (g = g(c2, f2), f2 = null === g || void 0 === g ? f2 : N({}, f2, g), a2.state = f2);
  if ("function" !== typeof b.getDerivedStateFromProps && "function" !== typeof a2.getSnapshotBeforeUpdate && ("function" === typeof a2.UNSAFE_componentWillMount || "function" === typeof a2.componentWillMount)) if (b = a2.state, "function" === typeof a2.componentWillMount && a2.componentWillMount(), "function" === typeof a2.UNSAFE_componentWillMount && a2.UNSAFE_componentWillMount(), b !== a2.state && qc.enqueueReplaceState(a2, a2.state, null), null !== e2.queue && 0 < e2.queue.length) if (b = e2.queue, g = e2.replace, e2.queue = null, e2.replace = false, g && 1 === b.length) a2.state = b[0];
  else {
    e2 = g ? b[0] : a2.state;
    f2 = true;
    for (g = g ? 1 : 0; g < b.length; g++) {
      var h = b[g];
      h = "function" === typeof h ? h.call(a2, e2, c2, d) : h;
      null != h && (f2 ? (f2 = false, e2 = N({}, e2, h)) : N(e2, h));
    }
    a2.state = e2;
  }
  else e2.queue = null;
}
var sc = { id: 1, overflow: "" };
function tc(a2, b, c2) {
  var d = a2.id;
  a2 = a2.overflow;
  var f2 = 32 - uc(d) - 1;
  d &= ~(1 << f2);
  c2 += 1;
  var e2 = 32 - uc(b) + f2;
  if (30 < e2) {
    var g = f2 - f2 % 5;
    e2 = (d & (1 << g) - 1).toString(32);
    d >>= g;
    f2 -= g;
    return { id: 1 << 32 - uc(b) + f2 | c2 << f2 | d, overflow: e2 + a2 };
  }
  return { id: 1 << e2 | c2 << f2 | d, overflow: a2 };
}
var uc = Math.clz32 ? Math.clz32 : vc, wc = Math.log, xc = Math.LN2;
function vc(a2) {
  a2 >>>= 0;
  return 0 === a2 ? 32 : 31 - (wc(a2) / xc | 0) | 0;
}
function yc(a2, b) {
  return a2 === b && (0 !== a2 || 1 / a2 === 1 / b) || a2 !== a2 && b !== b;
}
var zc = "function" === typeof Object.is ? Object.is : yc, R = null, Ac = null, Bc = null, S = null, T = false, Cc = false, U = 0, V = null, Dc = 0;
function W() {
  if (null === R) throw Error(k(321));
  return R;
}
function Ec() {
  if (0 < Dc) throw Error(k(312));
  return { memoizedState: null, queue: null, next: null };
}
function Fc() {
  null === S ? null === Bc ? (T = false, Bc = S = Ec()) : (T = true, S = Bc) : null === S.next ? (T = false, S = S.next = Ec()) : (T = true, S = S.next);
  return S;
}
function Gc() {
  Ac = R = null;
  Cc = false;
  Bc = null;
  Dc = 0;
  S = V = null;
}
function Hc(a2, b) {
  return "function" === typeof b ? b(a2) : b;
}
function Ic(a2, b, c2) {
  R = W();
  S = Fc();
  if (T) {
    var d = S.queue;
    b = d.dispatch;
    if (null !== V && (c2 = V.get(d), void 0 !== c2)) {
      V.delete(d);
      d = S.memoizedState;
      do
        d = a2(d, c2.action), c2 = c2.next;
      while (null !== c2);
      S.memoizedState = d;
      return [d, b];
    }
    return [S.memoizedState, b];
  }
  a2 = a2 === Hc ? "function" === typeof b ? b() : b : void 0 !== c2 ? c2(b) : b;
  S.memoizedState = a2;
  a2 = S.queue = { last: null, dispatch: null };
  a2 = a2.dispatch = Jc.bind(null, R, a2);
  return [S.memoizedState, a2];
}
function Kc(a2, b) {
  R = W();
  S = Fc();
  b = void 0 === b ? null : b;
  if (null !== S) {
    var c2 = S.memoizedState;
    if (null !== c2 && null !== b) {
      var d = c2[1];
      a: if (null === d) d = false;
      else {
        for (var f2 = 0; f2 < d.length && f2 < b.length; f2++) if (!zc(b[f2], d[f2])) {
          d = false;
          break a;
        }
        d = true;
      }
      if (d) return c2[0];
    }
  }
  a2 = a2();
  S.memoizedState = [a2, b];
  return a2;
}
function Jc(a2, b, c2) {
  if (25 <= Dc) throw Error(k(301));
  if (a2 === R) if (Cc = true, a2 = { action: c2, next: null }, null === V && (V = /* @__PURE__ */ new Map()), c2 = V.get(b), void 0 === c2) V.set(b, a2);
  else {
    for (b = c2; null !== b.next; ) b = b.next;
    b.next = a2;
  }
}
function Lc() {
  throw Error(k(394));
}
function Mc() {
}
var Oc = { readContext: function(a2) {
  return a2._currentValue;
}, useContext: function(a2) {
  W();
  return a2._currentValue;
}, useMemo: Kc, useReducer: Ic, useRef: function(a2) {
  R = W();
  S = Fc();
  var b = S.memoizedState;
  return null === b ? (a2 = { current: a2 }, S.memoizedState = a2) : b;
}, useState: function(a2) {
  return Ic(Hc, a2);
}, useInsertionEffect: Mc, useLayoutEffect: function() {
}, useCallback: function(a2, b) {
  return Kc(function() {
    return a2;
  }, b);
}, useImperativeHandle: Mc, useEffect: Mc, useDebugValue: Mc, useDeferredValue: function(a2) {
  W();
  return a2;
}, useTransition: function() {
  W();
  return [false, Lc];
}, useId: function() {
  var a2 = Ac.treeContext;
  var b = a2.overflow;
  a2 = a2.id;
  a2 = (a2 & ~(1 << 32 - uc(a2) - 1)).toString(32) + b;
  var c2 = Nc;
  if (null === c2) throw Error(k(404));
  b = U++;
  a2 = ":" + c2.idPrefix + "R" + a2;
  0 < b && (a2 += "H" + b.toString(32));
  return a2 + ":";
}, useMutableSource: function(a2, b) {
  W();
  return b(a2._source);
}, useSyncExternalStore: function(a2, b, c2) {
  if (void 0 === c2) throw Error(k(407));
  return c2();
} }, Nc = null, Pc = aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentDispatcher;
function Qc(a2) {
  console.error(a2);
  return null;
}
function X() {
}
function Rc(a2, b, c2, d, f2, e2, g, h, m2) {
  var q2 = [], r2 = /* @__PURE__ */ new Set();
  b = { destination: null, responseState: b, progressiveChunkSize: void 0 === d ? 12800 : d, status: 0, fatalError: null, nextSegmentId: 0, allPendingTasks: 0, pendingRootTasks: 0, completedRootSegment: null, abortableTasks: r2, pingedTasks: q2, clientRenderedBoundaries: [], completedBoundaries: [], partialBoundaries: [], onError: void 0 === f2 ? Qc : f2, onAllReady: void 0 === e2 ? X : e2, onShellReady: void 0 === g ? X : g, onShellError: void 0 === h ? X : h, onFatalError: void 0 === m2 ? X : m2 };
  c2 = Sc(b, 0, null, c2, false, false);
  c2.parentFlushed = true;
  a2 = Tc(b, a2, null, c2, r2, kc, null, sc);
  q2.push(a2);
  return b;
}
function Tc(a2, b, c2, d, f2, e2, g, h) {
  a2.allPendingTasks++;
  null === c2 ? a2.pendingRootTasks++ : c2.pendingTasks++;
  var m2 = { node: b, ping: function() {
    var b2 = a2.pingedTasks;
    b2.push(m2);
    1 === b2.length && Uc(a2);
  }, blockedBoundary: c2, blockedSegment: d, abortSet: f2, legacyContext: e2, context: g, treeContext: h };
  f2.add(m2);
  return m2;
}
function Sc(a2, b, c2, d, f2, e2) {
  return { status: 0, id: -1, index: b, parentFlushed: false, chunks: [], children: [], formatContext: d, boundary: c2, lastPushedText: f2, textEmbedded: e2 };
}
function Y(a2, b) {
  a2 = a2.onError(b);
  if (null != a2 && "string" !== typeof a2) throw Error('onError returned something with a type other than "string". onError should return a string and may return null or undefined but must not return anything else. It received something of type "' + typeof a2 + '" instead');
  return a2;
}
function Vc(a2, b) {
  var c2 = a2.onShellError;
  c2(b);
  c2 = a2.onFatalError;
  c2(b);
  null !== a2.destination ? (a2.status = 2, da(a2.destination, b)) : (a2.status = 1, a2.fatalError = b);
}
function Wc(a2, b, c2, d, f2) {
  R = {};
  Ac = b;
  U = 0;
  for (a2 = c2(d, f2); Cc; ) Cc = false, U = 0, Dc += 1, S = null, a2 = c2(d, f2);
  Gc();
  return a2;
}
function Xc(a2, b, c2, d) {
  var f2 = c2.render(), e2 = d.childContextTypes;
  if (null !== e2 && void 0 !== e2) {
    var g = b.legacyContext;
    if ("function" !== typeof c2.getChildContext) d = g;
    else {
      c2 = c2.getChildContext();
      for (var h in c2) if (!(h in e2)) throw Error(k(108, jc(d) || "Unknown", h));
      d = N({}, g, c2);
    }
    b.legacyContext = d;
    Z(a2, b, f2);
    b.legacyContext = g;
  } else Z(a2, b, f2);
}
function Yc(a2, b) {
  if (a2 && a2.defaultProps) {
    b = N({}, b);
    a2 = a2.defaultProps;
    for (var c2 in a2) void 0 === b[c2] && (b[c2] = a2[c2]);
    return b;
  }
  return b;
}
function Zc(a2, b, c2, d, f2) {
  if ("function" === typeof c2) if (c2.prototype && c2.prototype.isReactComponent) {
    f2 = lc(c2, b.legacyContext);
    var e2 = c2.contextType;
    e2 = new c2(d, "object" === typeof e2 && null !== e2 ? e2._currentValue : f2);
    rc(e2, c2, d, f2);
    Xc(a2, b, e2, c2);
  } else {
    e2 = lc(c2, b.legacyContext);
    f2 = Wc(a2, b, c2, d, e2);
    var g = 0 !== U;
    if ("object" === typeof f2 && null !== f2 && "function" === typeof f2.render && void 0 === f2.$$typeof) rc(f2, c2, d, e2), Xc(a2, b, f2, c2);
    else if (g) {
      d = b.treeContext;
      b.treeContext = tc(d, 1, 0);
      try {
        Z(a2, b, f2);
      } finally {
        b.treeContext = d;
      }
    } else Z(a2, b, f2);
  }
  else if ("string" === typeof c2) {
    f2 = b.blockedSegment;
    e2 = Sa(f2.chunks, c2, d, a2.responseState, f2.formatContext);
    f2.lastPushedText = false;
    g = f2.formatContext;
    f2.formatContext = Ba(g, c2, d);
    $c(a2, b, e2);
    f2.formatContext = g;
    switch (c2) {
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "img":
      case "input":
      case "keygen":
      case "link":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
        break;
      default:
        f2.chunks.push(Ta, u$1(c2), Ua);
    }
    f2.lastPushedText = false;
  } else {
    switch (c2) {
      case gc:
      case fc:
      case Wb:
      case Xb:
      case Vb:
        Z(a2, b, d.children);
        return;
      case bc:
        Z(a2, b, d.children);
        return;
      case ec:
        throw Error(k(343));
      case ac:
        a: {
          c2 = b.blockedBoundary;
          f2 = b.blockedSegment;
          e2 = d.fallback;
          d = d.children;
          g = /* @__PURE__ */ new Set();
          var h = { id: null, rootSegmentID: -1, parentFlushed: false, pendingTasks: 0, forceClientRender: false, completedSegments: [], byteSize: 0, fallbackAbortableTasks: g, errorDigest: null }, m2 = Sc(a2, f2.chunks.length, h, f2.formatContext, false, false);
          f2.children.push(m2);
          f2.lastPushedText = false;
          var q2 = Sc(a2, 0, null, f2.formatContext, false, false);
          q2.parentFlushed = true;
          b.blockedBoundary = h;
          b.blockedSegment = q2;
          try {
            if ($c(
              a2,
              b,
              d
            ), q2.lastPushedText && q2.textEmbedded && q2.chunks.push(Ca), q2.status = 1, ad(h, q2), 0 === h.pendingTasks) break a;
          } catch (r2) {
            q2.status = 4, h.forceClientRender = true, h.errorDigest = Y(a2, r2);
          } finally {
            b.blockedBoundary = c2, b.blockedSegment = f2;
          }
          b = Tc(a2, e2, c2, m2, g, b.legacyContext, b.context, b.treeContext);
          a2.pingedTasks.push(b);
        }
        return;
    }
    if ("object" === typeof c2 && null !== c2) switch (c2.$$typeof) {
      case $b:
        d = Wc(a2, b, c2.render, d, f2);
        if (0 !== U) {
          c2 = b.treeContext;
          b.treeContext = tc(c2, 1, 0);
          try {
            Z(a2, b, d);
          } finally {
            b.treeContext = c2;
          }
        } else Z(a2, b, d);
        return;
      case cc:
        c2 = c2.type;
        d = Yc(c2, d);
        Zc(a2, b, c2, d, f2);
        return;
      case Yb:
        f2 = d.children;
        c2 = c2._context;
        d = d.value;
        e2 = c2._currentValue;
        c2._currentValue = d;
        g = O;
        O = d = { parent: g, depth: null === g ? 0 : g.depth + 1, context: c2, parentValue: e2, value: d };
        b.context = d;
        Z(a2, b, f2);
        a2 = O;
        if (null === a2) throw Error(k(403));
        d = a2.parentValue;
        a2.context._currentValue = d === hc ? a2.context._defaultValue : d;
        a2 = O = a2.parent;
        b.context = a2;
        return;
      case Zb:
        d = d.children;
        d = d(c2._currentValue);
        Z(a2, b, d);
        return;
      case dc:
        f2 = c2._init;
        c2 = f2(c2._payload);
        d = Yc(c2, d);
        Zc(a2, b, c2, d, void 0);
        return;
    }
    throw Error(k(
      130,
      null == c2 ? c2 : typeof c2,
      ""
    ));
  }
}
function Z(a2, b, c2) {
  b.node = c2;
  if ("object" === typeof c2 && null !== c2) {
    switch (c2.$$typeof) {
      case Tb:
        Zc(a2, b, c2.type, c2.props, c2.ref);
        return;
      case Ub:
        throw Error(k(257));
      case dc:
        var d = c2._init;
        c2 = d(c2._payload);
        Z(a2, b, c2);
        return;
    }
    if (ra(c2)) {
      bd(a2, b, c2);
      return;
    }
    null === c2 || "object" !== typeof c2 ? d = null : (d = ic && c2[ic] || c2["@@iterator"], d = "function" === typeof d ? d : null);
    if (d && (d = d.call(c2))) {
      c2 = d.next();
      if (!c2.done) {
        var f2 = [];
        do
          f2.push(c2.value), c2 = d.next();
        while (!c2.done);
        bd(a2, b, f2);
      }
      return;
    }
    a2 = Object.prototype.toString.call(c2);
    throw Error(k(31, "[object Object]" === a2 ? "object with keys {" + Object.keys(c2).join(", ") + "}" : a2));
  }
  "string" === typeof c2 ? (d = b.blockedSegment, d.lastPushedText = Da(b.blockedSegment.chunks, c2, a2.responseState, d.lastPushedText)) : "number" === typeof c2 && (d = b.blockedSegment, d.lastPushedText = Da(b.blockedSegment.chunks, "" + c2, a2.responseState, d.lastPushedText));
}
function bd(a2, b, c2) {
  for (var d = c2.length, f2 = 0; f2 < d; f2++) {
    var e2 = b.treeContext;
    b.treeContext = tc(e2, d, f2);
    try {
      $c(a2, b, c2[f2]);
    } finally {
      b.treeContext = e2;
    }
  }
}
function $c(a2, b, c2) {
  var d = b.blockedSegment.formatContext, f2 = b.legacyContext, e2 = b.context;
  try {
    return Z(a2, b, c2);
  } catch (m2) {
    if (Gc(), "object" === typeof m2 && null !== m2 && "function" === typeof m2.then) {
      c2 = m2;
      var g = b.blockedSegment, h = Sc(a2, g.chunks.length, null, g.formatContext, g.lastPushedText, true);
      g.children.push(h);
      g.lastPushedText = false;
      a2 = Tc(a2, b.node, b.blockedBoundary, h, b.abortSet, b.legacyContext, b.context, b.treeContext).ping;
      c2.then(a2, a2);
      b.blockedSegment.formatContext = d;
      b.legacyContext = f2;
      b.context = e2;
      Q(e2);
    } else throw b.blockedSegment.formatContext = d, b.legacyContext = f2, b.context = e2, Q(e2), m2;
  }
}
function cd(a2) {
  var b = a2.blockedBoundary;
  a2 = a2.blockedSegment;
  a2.status = 3;
  dd(this, b, a2);
}
function ed(a2, b, c2) {
  var d = a2.blockedBoundary;
  a2.blockedSegment.status = 3;
  null === d ? (b.allPendingTasks--, 2 !== b.status && (b.status = 2, null !== b.destination && b.destination.close())) : (d.pendingTasks--, d.forceClientRender || (d.forceClientRender = true, a2 = void 0 === c2 ? Error(k(432)) : c2, d.errorDigest = b.onError(a2), d.parentFlushed && b.clientRenderedBoundaries.push(d)), d.fallbackAbortableTasks.forEach(function(a3) {
    return ed(a3, b, c2);
  }), d.fallbackAbortableTasks.clear(), b.allPendingTasks--, 0 === b.allPendingTasks && (d = b.onAllReady, d()));
}
function ad(a2, b) {
  if (0 === b.chunks.length && 1 === b.children.length && null === b.children[0].boundary) {
    var c2 = b.children[0];
    c2.id = b.id;
    c2.parentFlushed = true;
    1 === c2.status && ad(a2, c2);
  } else a2.completedSegments.push(b);
}
function dd(a2, b, c2) {
  if (null === b) {
    if (c2.parentFlushed) {
      if (null !== a2.completedRootSegment) throw Error(k(389));
      a2.completedRootSegment = c2;
    }
    a2.pendingRootTasks--;
    0 === a2.pendingRootTasks && (a2.onShellError = X, b = a2.onShellReady, b());
  } else b.pendingTasks--, b.forceClientRender || (0 === b.pendingTasks ? (c2.parentFlushed && 1 === c2.status && ad(b, c2), b.parentFlushed && a2.completedBoundaries.push(b), b.fallbackAbortableTasks.forEach(cd, a2), b.fallbackAbortableTasks.clear()) : c2.parentFlushed && 1 === c2.status && (ad(b, c2), 1 === b.completedSegments.length && b.parentFlushed && a2.partialBoundaries.push(b)));
  a2.allPendingTasks--;
  0 === a2.allPendingTasks && (a2 = a2.onAllReady, a2());
}
function Uc(a2) {
  if (2 !== a2.status) {
    var b = O, c2 = Pc.current;
    Pc.current = Oc;
    var d = Nc;
    Nc = a2.responseState;
    try {
      var f2 = a2.pingedTasks, e2;
      for (e2 = 0; e2 < f2.length; e2++) {
        var g = f2[e2];
        var h = a2, m2 = g.blockedSegment;
        if (0 === m2.status) {
          Q(g.context);
          try {
            Z(h, g, g.node), m2.lastPushedText && m2.textEmbedded && m2.chunks.push(Ca), g.abortSet.delete(g), m2.status = 1, dd(h, g.blockedBoundary, m2);
          } catch (G2) {
            if (Gc(), "object" === typeof G2 && null !== G2 && "function" === typeof G2.then) {
              var q2 = g.ping;
              G2.then(q2, q2);
            } else {
              g.abortSet.delete(g);
              m2.status = 4;
              var r2 = g.blockedBoundary, v2 = G2, A2 = Y(h, v2);
              null === r2 ? Vc(h, v2) : (r2.pendingTasks--, r2.forceClientRender || (r2.forceClientRender = true, r2.errorDigest = A2, r2.parentFlushed && h.clientRenderedBoundaries.push(r2)));
              h.allPendingTasks--;
              if (0 === h.allPendingTasks) {
                var F2 = h.onAllReady;
                F2();
              }
            }
          } finally {
          }
        }
      }
      f2.splice(0, e2);
      null !== a2.destination && fd(a2, a2.destination);
    } catch (G2) {
      Y(a2, G2), Vc(a2, G2);
    } finally {
      Nc = d, Pc.current = c2, c2 === Oc && Q(b);
    }
  }
}
function gd(a2, b, c2) {
  c2.parentFlushed = true;
  switch (c2.status) {
    case 0:
      var d = c2.id = a2.nextSegmentId++;
      c2.lastPushedText = false;
      c2.textEmbedded = false;
      a2 = a2.responseState;
      p(b, Va);
      p(b, a2.placeholderPrefix);
      a2 = u$1(d.toString(16));
      p(b, a2);
      return t$1(b, Wa);
    case 1:
      c2.status = 2;
      var f2 = true;
      d = c2.chunks;
      var e2 = 0;
      c2 = c2.children;
      for (var g = 0; g < c2.length; g++) {
        for (f2 = c2[g]; e2 < f2.index; e2++) p(b, d[e2]);
        f2 = hd(a2, b, f2);
      }
      for (; e2 < d.length - 1; e2++) p(b, d[e2]);
      e2 < d.length && (f2 = t$1(b, d[e2]));
      return f2;
    default:
      throw Error(k(390));
  }
}
function hd(a2, b, c2) {
  var d = c2.boundary;
  if (null === d) return gd(a2, b, c2);
  d.parentFlushed = true;
  if (d.forceClientRender) d = d.errorDigest, t$1(b, $a), p(b, bb), d && (p(b, db), p(b, u$1(C(d))), p(b, cb)), t$1(b, eb), gd(a2, b, c2);
  else if (0 < d.pendingTasks) {
    d.rootSegmentID = a2.nextSegmentId++;
    0 < d.completedSegments.length && a2.partialBoundaries.push(d);
    var f2 = a2.responseState;
    var e2 = f2.nextSuspenseID++;
    f2 = w(f2.boundaryPrefix + e2.toString(16));
    d = d.id = f2;
    fb(b, a2.responseState, d);
    gd(a2, b, c2);
  } else if (d.byteSize > a2.progressiveChunkSize) d.rootSegmentID = a2.nextSegmentId++, a2.completedBoundaries.push(d), fb(b, a2.responseState, d.id), gd(a2, b, c2);
  else {
    t$1(b, Xa);
    c2 = d.completedSegments;
    if (1 !== c2.length) throw Error(k(391));
    hd(a2, b, c2[0]);
  }
  return t$1(b, ab);
}
function id(a2, b, c2) {
  Bb(b, a2.responseState, c2.formatContext, c2.id);
  hd(a2, b, c2);
  return Cb(b, c2.formatContext);
}
function jd(a2, b, c2) {
  for (var d = c2.completedSegments, f2 = 0; f2 < d.length; f2++) kd(a2, b, c2, d[f2]);
  d.length = 0;
  a2 = a2.responseState;
  d = c2.id;
  c2 = c2.rootSegmentID;
  p(b, a2.startInlineScript);
  a2.sentCompleteBoundaryFunction ? p(b, Jb) : (a2.sentCompleteBoundaryFunction = true, p(b, Ib));
  if (null === d) throw Error(k(395));
  c2 = u$1(c2.toString(16));
  p(b, d);
  p(b, Kb);
  p(b, a2.segmentPrefix);
  p(b, c2);
  return t$1(b, Lb);
}
function kd(a2, b, c2, d) {
  if (2 === d.status) return true;
  var f2 = d.id;
  if (-1 === f2) {
    if (-1 === (d.id = c2.rootSegmentID)) throw Error(k(392));
    return id(a2, b, d);
  }
  id(a2, b, d);
  a2 = a2.responseState;
  p(b, a2.startInlineScript);
  a2.sentCompleteSegmentFunction ? p(b, Eb) : (a2.sentCompleteSegmentFunction = true, p(b, Db));
  p(b, a2.segmentPrefix);
  f2 = u$1(f2.toString(16));
  p(b, f2);
  p(b, Gb);
  p(b, a2.placeholderPrefix);
  p(b, f2);
  return t$1(b, Hb);
}
function fd(a2, b) {
  l$2 = new Uint8Array(512);
  n$1 = 0;
  try {
    var c2 = a2.completedRootSegment;
    if (null !== c2 && 0 === a2.pendingRootTasks) {
      hd(a2, b, c2);
      a2.completedRootSegment = null;
      var d = a2.responseState.bootstrapChunks;
      for (c2 = 0; c2 < d.length - 1; c2++) p(b, d[c2]);
      c2 < d.length && t$1(b, d[c2]);
    }
    var f2 = a2.clientRenderedBoundaries, e2;
    for (e2 = 0; e2 < f2.length; e2++) {
      var g = f2[e2];
      d = b;
      var h = a2.responseState, m2 = g.id, q2 = g.errorDigest, r2 = g.errorMessage, v2 = g.errorComponentStack;
      p(d, h.startInlineScript);
      h.sentClientRenderFunction ? p(d, Nb) : (h.sentClientRenderFunction = true, p(
        d,
        Mb
      ));
      if (null === m2) throw Error(k(395));
      p(d, m2);
      p(d, Ob);
      if (q2 || r2 || v2) p(d, Qb), p(d, u$1(Sb(q2 || "")));
      if (r2 || v2) p(d, Qb), p(d, u$1(Sb(r2 || "")));
      v2 && (p(d, Qb), p(d, u$1(Sb(v2))));
      if (!t$1(d, Pb)) ;
    }
    f2.splice(0, e2);
    var A2 = a2.completedBoundaries;
    for (e2 = 0; e2 < A2.length; e2++) if (!jd(a2, b, A2[e2])) ;
    A2.splice(0, e2);
    ba(b);
    l$2 = new Uint8Array(512);
    n$1 = 0;
    var F2 = a2.partialBoundaries;
    for (e2 = 0; e2 < F2.length; e2++) {
      var G2 = F2[e2];
      a: {
        f2 = a2;
        g = b;
        var ma2 = G2.completedSegments;
        for (h = 0; h < ma2.length; h++) if (!kd(
          f2,
          g,
          G2,
          ma2[h]
        )) {
          h++;
          ma2.splice(0, h);
          var Fb2 = false;
          break a;
        }
        ma2.splice(0, h);
        Fb2 = true;
      }
      if (!Fb2) {
        a2.destination = null;
        e2++;
        F2.splice(0, e2);
        return;
      }
    }
    F2.splice(0, e2);
    var na2 = a2.completedBoundaries;
    for (e2 = 0; e2 < na2.length; e2++) if (!jd(a2, b, na2[e2])) ;
    na2.splice(0, e2);
  } finally {
    ba(b), 0 === a2.allPendingTasks && 0 === a2.pingedTasks.length && 0 === a2.clientRenderedBoundaries.length && 0 === a2.completedBoundaries.length && b.close();
  }
}
function ld(a2, b) {
  try {
    var c2 = a2.abortableTasks;
    c2.forEach(function(c3) {
      return ed(c3, a2, b);
    });
    c2.clear();
    null !== a2.destination && fd(a2, a2.destination);
  } catch (d) {
    Y(a2, d), Vc(a2, d);
  }
}
reactDomServer_browser_production_min.renderToReadableStream = function(a2, b) {
  return new Promise(function(c2, d) {
    var f2, e2, g = new Promise(function(a3, b2) {
      e2 = a3;
      f2 = b2;
    }), h = Rc(a2, za(b ? b.identifierPrefix : void 0, b ? b.nonce : void 0, b ? b.bootstrapScriptContent : void 0, b ? b.bootstrapScripts : void 0, b ? b.bootstrapModules : void 0), Aa(b ? b.namespaceURI : void 0), b ? b.progressiveChunkSize : void 0, b ? b.onError : void 0, e2, function() {
      var a3 = new ReadableStream({ type: "bytes", pull: function(a4) {
        if (1 === h.status) h.status = 2, da(a4, h.fatalError);
        else if (2 !== h.status && null === h.destination) {
          h.destination = a4;
          try {
            fd(h, a4);
          } catch (A2) {
            Y(h, A2), Vc(h, A2);
          }
        }
      }, cancel: function() {
        ld(h);
      } }, { highWaterMark: 0 });
      a3.allReady = g;
      c2(a3);
    }, function(a3) {
      g.catch(function() {
      });
      d(a3);
    }, f2);
    if (b && b.signal) {
      var m2 = b.signal, q2 = function() {
        ld(h, m2.reason);
        m2.removeEventListener("abort", q2);
      };
      m2.addEventListener("abort", q2);
    }
    Uc(h);
  });
};
reactDomServer_browser_production_min.version = "18.3.1";
var l$1, s$1;
{
  l$1 = reactDomServerLegacy_browser_production_min;
  s$1 = reactDomServer_browser_production_min;
}
l$1.version;
l$1.renderToString;
l$1.renderToStaticMarkup;
l$1.renderToNodeStream;
l$1.renderToStaticNodeStream;
var renderToReadableStream = s$1.renderToReadableStream;
async function handleRequest(request, responseStatusCode, responseHeaders, remixContext) {
  const body = await renderToReadableStream(
    /* @__PURE__ */ jsxRuntimeExports.jsx(RemixServer, { context: remixContext, url: request.url }),
    {
      signal: request.signal,
      onError(error) {
        console.error(error);
        responseStatusCode = 500;
      }
    }
  );
  responseHeaders.set("Content-Type", "text/html");
  return new Response(body, {
    headers: responseHeaders,
    status: responseStatusCode
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest
}, Symbol.toStringTag, { value: "Module" }));
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
function t(t2, n2) {
  var e2 = "function" == typeof Symbol && t2[Symbol.iterator];
  if (!e2)
    return t2;
  var r2, i2, o2 = e2.call(t2), a2 = [];
  try {
    for (; (void 0 === n2 || n2-- > 0) && !(r2 = o2.next()).done; )
      a2.push(r2.value);
  } catch (t3) {
    i2 = { error: t3 };
  } finally {
    try {
      r2 && !r2.done && (e2 = o2.return) && e2.call(o2);
    } finally {
      if (i2)
        throw i2.error;
    }
  }
  return a2;
}
var n;
!function(t2) {
  t2[t2.NotStarted = 0] = "NotStarted", t2[t2.Running = 1] = "Running", t2[t2.Stopped = 2] = "Stopped";
}(n || (n = {}));
var e = { type: "xstate.init" };
function r(t2) {
  return void 0 === t2 ? [] : [].concat(t2);
}
function i(t2) {
  return { type: "xstate.assign", assignment: t2 };
}
function o(t2, n2) {
  return "string" == typeof (t2 = "string" == typeof t2 && n2 && n2[t2] ? n2[t2] : t2) ? { type: t2 } : "function" == typeof t2 ? { type: t2.name, exec: t2 } : t2;
}
function a(t2) {
  return function(n2) {
    return t2 === n2;
  };
}
function u(t2) {
  return "string" == typeof t2 ? { type: t2 } : t2;
}
function c(t2, n2) {
  return { value: t2, context: n2, actions: [], changed: false, matches: a(t2) };
}
function f(t2, n2, e2) {
  var r2 = n2, i2 = false;
  return [t2.filter(function(t3) {
    if ("xstate.assign" === t3.type) {
      i2 = true;
      var n3 = Object.assign({}, r2);
      return "function" == typeof t3.assignment ? n3 = t3.assignment(r2, e2) : Object.keys(t3.assignment).forEach(function(i3) {
        n3[i3] = "function" == typeof t3.assignment[i3] ? t3.assignment[i3](r2, e2) : t3.assignment[i3];
      }), r2 = n3, false;
    }
    return true;
  }), r2, i2];
}
function s(n2, i2) {
  void 0 === i2 && (i2 = {});
  var s2 = t(f(r(n2.states[n2.initial].entry).map(function(t2) {
    return o(t2, i2.actions);
  }), n2.context, e), 2), l2 = s2[0], v2 = s2[1], y2 = { config: n2, _options: i2, initialState: { value: n2.initial, actions: l2, context: v2, matches: a(n2.initial) }, transition: function(e2, i3) {
    var s3, l3, v3 = "string" == typeof e2 ? { value: e2, context: n2.context } : e2, p2 = v3.value, g = v3.context, d = u(i3), x2 = n2.states[p2];
    if (x2.on) {
      var m2 = r(x2.on[d.type]);
      try {
        for (var h = function(t2) {
          var n3 = "function" == typeof Symbol && Symbol.iterator, e3 = n3 && t2[n3], r2 = 0;
          if (e3)
            return e3.call(t2);
          if (t2 && "number" == typeof t2.length)
            return { next: function() {
              return t2 && r2 >= t2.length && (t2 = void 0), { value: t2 && t2[r2++], done: !t2 };
            } };
          throw new TypeError(n3 ? "Object is not iterable." : "Symbol.iterator is not defined.");
        }(m2), b = h.next(); !b.done; b = h.next()) {
          var S2 = b.value;
          if (void 0 === S2)
            return c(p2, g);
          var w2 = "string" == typeof S2 ? { target: S2 } : S2, j = w2.target, E2 = w2.actions, R2 = void 0 === E2 ? [] : E2, N2 = w2.cond, O2 = void 0 === N2 ? function() {
            return true;
          } : N2, _ = void 0 === j, k2 = null != j ? j : p2, T2 = n2.states[k2];
          if (O2(g, d)) {
            var q2 = t(f((_ ? r(R2) : [].concat(x2.exit, R2, T2.entry).filter(function(t2) {
              return t2;
            })).map(function(t2) {
              return o(t2, y2._options.actions);
            }), g, d), 3), z2 = q2[0], A2 = q2[1], B2 = q2[2], C2 = null != j ? j : p2;
            return { value: C2, context: A2, actions: z2, changed: j !== p2 || z2.length > 0 || B2, matches: a(C2) };
          }
        }
      } catch (t2) {
        s3 = { error: t2 };
      } finally {
        try {
          b && !b.done && (l3 = h.return) && l3.call(h);
        } finally {
          if (s3)
            throw s3.error;
        }
      }
    }
    return c(p2, g);
  } };
  return y2;
}
var l = function(t2, n2) {
  return t2.actions.forEach(function(e2) {
    var r2 = e2.exec;
    return r2 && r2(t2.context, n2);
  });
};
function v(t2) {
  var r2 = t2.initialState, i2 = n.NotStarted, o2 = /* @__PURE__ */ new Set(), c2 = { _machine: t2, send: function(e2) {
    i2 === n.Running && (r2 = t2.transition(r2, e2), l(r2, u(e2)), o2.forEach(function(t3) {
      return t3(r2);
    }));
  }, subscribe: function(t3) {
    return o2.add(t3), t3(r2), { unsubscribe: function() {
      return o2.delete(t3);
    } };
  }, start: function(o3) {
    if (o3) {
      var u2 = "object" == typeof o3 ? o3 : { context: t2.config.context, value: o3 };
      r2 = { value: u2.value, actions: [], context: u2.context, matches: a(u2.value) };
    } else
      r2 = t2.initialState;
    return i2 = n.Running, l(r2, e), c2;
  }, stop: function() {
    return i2 = n.Stopped, o2.clear(), c2;
  }, get state() {
    return r2;
  }, get status() {
    return i2;
  } };
  return c2;
}
var index = reactExports.useLayoutEffect;
var withSelector = { exports: {} };
var withSelector_production_min = {};
var shim = { exports: {} };
var useSyncExternalStoreShim_production_min = {};
/**
 * @license React
 * use-sync-external-store-shim.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var hasRequiredUseSyncExternalStoreShim_production_min;
function requireUseSyncExternalStoreShim_production_min() {
  if (hasRequiredUseSyncExternalStoreShim_production_min)
    return useSyncExternalStoreShim_production_min;
  hasRequiredUseSyncExternalStoreShim_production_min = 1;
  var e2 = React__default;
  function h(a2, b) {
    return a2 === b && (0 !== a2 || 1 / a2 === 1 / b) || a2 !== a2 && b !== b;
  }
  var k2 = "function" === typeof Object.is ? Object.is : h, l2 = e2.useState, m2 = e2.useEffect, n2 = e2.useLayoutEffect, p2 = e2.useDebugValue;
  function q2(a2, b) {
    var d = b(), f2 = l2({ inst: { value: d, getSnapshot: b } }), c2 = f2[0].inst, g = f2[1];
    n2(function() {
      c2.value = d;
      c2.getSnapshot = b;
      r2(c2) && g({ inst: c2 });
    }, [a2, d, b]);
    m2(function() {
      r2(c2) && g({ inst: c2 });
      return a2(function() {
        r2(c2) && g({ inst: c2 });
      });
    }, [a2]);
    p2(d);
    return d;
  }
  function r2(a2) {
    var b = a2.getSnapshot;
    a2 = a2.value;
    try {
      var d = b();
      return !k2(a2, d);
    } catch (f2) {
      return true;
    }
  }
  function t2(a2, b) {
    return b();
  }
  var u2 = "undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement ? t2 : q2;
  useSyncExternalStoreShim_production_min.useSyncExternalStore = void 0 !== e2.useSyncExternalStore ? e2.useSyncExternalStore : u2;
  return useSyncExternalStoreShim_production_min;
}
var hasRequiredShim;
function requireShim() {
  if (hasRequiredShim)
    return shim.exports;
  hasRequiredShim = 1;
  {
    shim.exports = requireUseSyncExternalStoreShim_production_min();
  }
  return shim.exports;
}
/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var hasRequiredWithSelector_production_min;
function requireWithSelector_production_min() {
  if (hasRequiredWithSelector_production_min)
    return withSelector_production_min;
  hasRequiredWithSelector_production_min = 1;
  var h = React__default, n2 = requireShim();
  function p2(a2, b) {
    return a2 === b && (0 !== a2 || 1 / a2 === 1 / b) || a2 !== a2 && b !== b;
  }
  var q2 = "function" === typeof Object.is ? Object.is : p2, r2 = n2.useSyncExternalStore, t2 = h.useRef, u2 = h.useEffect, v2 = h.useMemo, w2 = h.useDebugValue;
  withSelector_production_min.useSyncExternalStoreWithSelector = function(a2, b, e2, l2, g) {
    var c2 = t2(null);
    if (null === c2.current) {
      var f2 = { hasValue: false, value: null };
      c2.current = f2;
    } else
      f2 = c2.current;
    c2 = v2(function() {
      function a22(a3) {
        if (!c22) {
          c22 = true;
          d2 = a3;
          a3 = l2(a3);
          if (void 0 !== g && f2.hasValue) {
            var b2 = f2.value;
            if (g(b2, a3))
              return k2 = b2;
          }
          return k2 = a3;
        }
        b2 = k2;
        if (q2(d2, a3))
          return b2;
        var e22 = l2(a3);
        if (void 0 !== g && g(b2, e22))
          return b2;
        d2 = a3;
        return k2 = e22;
      }
      var c22 = false, d2, k2, m2 = void 0 === e2 ? null : e2;
      return [function() {
        return a22(b());
      }, null === m2 ? void 0 : function() {
        return a22(m2());
      }];
    }, [b, e2, l2, g]);
    var d = r2(a2, c2[0], c2[1]);
    u2(function() {
      f2.hasValue = true;
      f2.value = d;
    }, [d]);
    w2(d);
    return d;
  };
  return withSelector_production_min;
}
{
  withSelector.exports = requireWithSelector_production_min();
}
var withSelectorExports = withSelector.exports;
function useConstant(fn) {
  var ref = reactExports.useRef();
  if (!ref.current) {
    ref.current = { v: fn() };
  }
  return ref.current.v;
}
var __read = function(o2, n2) {
  var m2 = typeof Symbol === "function" && o2[Symbol.iterator];
  if (!m2)
    return o2;
  var i2 = m2.call(o2), r2, ar = [], e2;
  try {
    while ((n2 === void 0 || n2-- > 0) && !(r2 = i2.next()).done)
      ar.push(r2.value);
  } catch (error) {
    e2 = { error };
  } finally {
    try {
      if (r2 && !r2.done && (m2 = i2["return"]))
        m2.call(i2);
    } finally {
      if (e2)
        throw e2.error;
    }
  }
  return ar;
};
function identity(a2) {
  return a2;
}
var getServiceState = function(service) {
  var currentValue;
  service.subscribe(function(state) {
    currentValue = state;
  }).unsubscribe();
  return currentValue;
};
function useMachine(stateMachine, options) {
  var persistedStateRef = reactExports.useRef();
  var _b = __read(useConstant(function() {
    var queue2 = [];
    var service2 = v(s(stateMachine.config, options ? options : stateMachine._options));
    var send = service2.send;
    service2.send = function(event) {
      if (service2.status === n.NotStarted) {
        queue2.push(event);
        return;
      }
      send(event);
      persistedStateRef.current = service2.state;
    };
    return [service2, queue2];
  }), 2), service = _b[0], queue = _b[1];
  index(function() {
    if (options) {
      service._machine._options = options;
    }
  });
  var useServiceResult = useService(service);
  reactExports.useEffect(function() {
    service.start(persistedStateRef.current);
    queue.forEach(service.send);
    persistedStateRef.current = service.state;
    return function() {
      service.stop();
    };
  }, []);
  return useServiceResult;
}
var isEqual = function(_prevState, nextState) {
  return nextState.changed === false;
};
function useService(service) {
  var getSnapshot = reactExports.useCallback(function() {
    return getServiceState(service);
  }, [service]);
  var subscribe = reactExports.useCallback(function(handleStoreChange) {
    var unsubscribe = service.subscribe(handleStoreChange).unsubscribe;
    return unsubscribe;
  }, [service]);
  var storeSnapshot = withSelectorExports.useSyncExternalStoreWithSelector(subscribe, getSnapshot, getSnapshot, identity, isEqual);
  return [storeSnapshot, service.send, service];
}
function flattenConnection(connection) {
  if (!connection) {
    const noConnectionErr = `flattenConnection(): needs a 'connection' to flatten, but received '${connection ?? ""}' instead.`;
    {
      console.error(noConnectionErr + ` Returning an empty array`);
      return [];
    }
  }
  if ("nodes" in connection) {
    return connection.nodes;
  }
  if ("edges" in connection && Array.isArray(connection.edges)) {
    return connection.edges.map((edge) => {
      if (!(edge == null ? void 0 : edge.node)) {
        throw new Error(
          "flattenConnection(): Connection edges must contain nodes"
        );
      }
      return edge.node;
    });
  }
  return [];
}
const CartLineAdd = (cartFragment) => (
  /* GraphQL */
  `
  mutation CartLineAdd(
    $cartId: ID!
    $lines: [CartLineInput!]!
    $numCartLines: Int = 250
    $country: CountryCode = ZZ
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        ...CartFragment
      }
    }
  }

  ${cartFragment}
`
);
const CartCreate = (cartFragment) => (
  /* GraphQL */
  `
  mutation CartCreate(
    $input: CartInput!
    $numCartLines: Int = 250
    $country: CountryCode = ZZ
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    cartCreate(input: $input) {
      cart {
        ...CartFragment
      }
    }
  }

  ${cartFragment}
`
);
const CartLineRemove = (cartFragment) => (
  /* GraphQL */
  `
  mutation CartLineRemove(
    $cartId: ID!
    $lines: [ID!]!
    $numCartLines: Int = 250
    $country: CountryCode = ZZ
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    cartLinesRemove(cartId: $cartId, lineIds: $lines) {
      cart {
        ...CartFragment
      }
    }
  }

  ${cartFragment}
`
);
const CartLineUpdate = (cartFragment) => (
  /* GraphQL */
  `
  mutation CartLineUpdate(
    $cartId: ID!
    $lines: [CartLineUpdateInput!]!
    $numCartLines: Int = 250
    $country: CountryCode = ZZ
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        ...CartFragment
      }
    }
  }

  ${cartFragment}
`
);
const CartNoteUpdate = (cartFragment) => (
  /* GraphQL */
  `
  mutation CartNoteUpdate(
    $cartId: ID!
    $note: String!
    $numCartLines: Int = 250
    $country: CountryCode = ZZ
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    cartNoteUpdate(cartId: $cartId, note: $note) {
      cart {
        ...CartFragment
      }
    }
  }

  ${cartFragment}
`
);
const CartBuyerIdentityUpdate = (cartFragment) => (
  /* GraphQL */
  `
  mutation CartBuyerIdentityUpdate(
    $cartId: ID!
    $buyerIdentity: CartBuyerIdentityInput!
    $numCartLines: Int = 250
    $country: CountryCode = ZZ
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    cartBuyerIdentityUpdate(cartId: $cartId, buyerIdentity: $buyerIdentity) {
      cart {
        ...CartFragment
      }
    }
  }

  ${cartFragment}
`
);
const CartAttributesUpdate = (cartFragment) => (
  /* GraphQL */
  `
  mutation CartAttributesUpdate(
    $attributes: [AttributeInput!]!
    $cartId: ID!
    $numCartLines: Int = 250
    $country: CountryCode = ZZ
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    cartAttributesUpdate(attributes: $attributes, cartId: $cartId) {
      cart {
        ...CartFragment
      }
    }
  }

  ${cartFragment}
`
);
const CartDiscountCodesUpdate = (cartFragment) => (
  /* GraphQL */
  `
  mutation CartDiscountCodesUpdate(
    $cartId: ID!
    $discountCodes: [String!]
    $numCartLines: Int = 250
    $country: CountryCode = ZZ
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    cartDiscountCodesUpdate(cartId: $cartId, discountCodes: $discountCodes) {
      cart {
        ...CartFragment
      }
    }
  }

  ${cartFragment}
`
);
const CartQuery = (cartFragment) => (
  /* GraphQL */
  `
  query CartQuery(
    $id: ID!
    $numCartLines: Int = 250
    $country: CountryCode = ZZ
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    cart(id: $id) {
      ...CartFragment
    }
  }

  ${cartFragment}
`
);
const defaultCartFragment = (
  /* GraphQL */
  `
  fragment CartFragment on Cart {
    id
    checkoutUrl
    totalQuantity
    buyerIdentity {
      countryCode
      customer {
        id
        email
        firstName
        lastName
        displayName
      }
      email
      phone
    }
    lines(first: $numCartLines) {
      edges {
        node {
          id
          quantity
          attributes {
            key
            value
          }
          cost {
            totalAmount {
              amount
              currencyCode
            }
            compareAtAmountPerQuantity {
              amount
              currencyCode
            }
          }
          merchandise {
            ... on ProductVariant {
              id
              availableForSale
              compareAtPrice {
                ...MoneyFragment
              }
              price {
                ...MoneyFragment
              }
              requiresShipping
              title
              image {
                ...ImageFragment
              }
              product {
                handle
                title
                id
              }
              selectedOptions {
                name
                value
              }
            }
          }
        }
      }
    }
    cost {
      subtotalAmount {
        ...MoneyFragment
      }
      totalAmount {
        ...MoneyFragment
      }
      totalDutyAmount {
        ...MoneyFragment
      }
      totalTaxAmount {
        ...MoneyFragment
      }
    }
    note
    attributes {
      key
      value
    }
    discountCodes {
      code
      applicable
    }
  }

  fragment MoneyFragment on MoneyV2 {
    currencyCode
    amount
  }
  fragment ImageFragment on Image {
    id
    url
    altText
    width
    height
  }
`
);
const SFAPI_VERSION = "2024-10";
function getPublicTokenHeadersRaw(contentType, storefrontApiVersion, accessToken) {
  return {
    // default to json
    "content-type": contentType === "graphql" ? "application/graphql" : "application/json",
    "X-SDK-Variant": "hydrogen-react",
    "X-SDK-Variant-Source": "react",
    "X-SDK-Version": storefrontApiVersion,
    "X-Shopify-Storefront-Access-Token": accessToken
  };
}
const defaultShopifyContext = {
  storeDomain: "test",
  storefrontToken: "abc123",
  storefrontApiVersion: SFAPI_VERSION,
  countryIsoCode: "US",
  languageIsoCode: "EN",
  getStorefrontApiUrl() {
    return "";
  },
  getPublicTokenHeaders() {
    return {};
  },
  getShopifyDomain() {
    return "";
  }
};
const ShopifyContext = reactExports.createContext(
  defaultShopifyContext
);
function isSfapiProxyEnabled() {
  var _a, _b, _c;
  if (typeof window === "undefined")
    return false;
  try {
    const navigationEntry = (_b = (_a = window.performance) == null ? void 0 : _a.getEntriesByType) == null ? void 0 : _b.call(
      _a,
      "navigation"
    )[0];
    return !!((_c = navigationEntry == null ? void 0 : navigationEntry.serverTiming) == null ? void 0 : _c.some(
      (entry2) => entry2.name === "_sfapi_proxy"
    ));
  } catch (e2) {
    return false;
  }
}
function ShopifyProvider({
  children,
  ...shopifyConfig
}) {
  if (!shopifyConfig.countryIsoCode || !shopifyConfig.languageIsoCode || !shopifyConfig.storeDomain || !shopifyConfig.storefrontToken || !shopifyConfig.storefrontApiVersion) {
    throw new Error(
      `Please provide the necessary props to '<ShopifyProvider/>'`
    );
  }
  if (shopifyConfig.storefrontApiVersion !== SFAPI_VERSION) {
    console.warn(
      `<ShopifyProvider/>: This version of Hydrogen React is built for Shopify's Storefront API version ${SFAPI_VERSION}, but it looks like you're using version ${shopifyConfig.storefrontApiVersion}. There may be issues or bugs if you use a mismatched version of Hydrogen React and the Storefront API.`
    );
  }
  const finalConfig = reactExports.useMemo(() => {
    const sameDomainForStorefrontApi = shopifyConfig.sameDomainForStorefrontApi ?? isSfapiProxyEnabled();
    function getShopifyDomain(overrideProps) {
      const domain = (overrideProps == null ? void 0 : overrideProps.storeDomain) ?? shopifyConfig.storeDomain;
      return domain.includes("://") ? domain : `https://${domain}`;
    }
    return {
      ...shopifyConfig,
      sameDomainForStorefrontApi,
      getPublicTokenHeaders(overrideProps) {
        return getPublicTokenHeadersRaw(
          overrideProps.contentType,
          shopifyConfig.storefrontApiVersion,
          overrideProps.storefrontToken ?? shopifyConfig.storefrontToken
        );
      },
      getShopifyDomain,
      getStorefrontApiUrl(overrideProps) {
        const finalDomainUrl = sameDomainForStorefrontApi && typeof window !== "undefined" ? window.location.origin : getShopifyDomain({
          storeDomain: (overrideProps == null ? void 0 : overrideProps.storeDomain) ?? shopifyConfig.storeDomain
        });
        return `${finalDomainUrl}${finalDomainUrl.endsWith("/") ? "" : "/"}api/${(overrideProps == null ? void 0 : overrideProps.storefrontApiVersion) ?? shopifyConfig.storefrontApiVersion}/graphql.json`;
      }
    };
  }, [shopifyConfig]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ShopifyContext.Provider, { value: finalConfig, children });
}
function useShop() {
  const shopContext = reactExports.useContext(ShopifyContext);
  if (!shopContext) {
    throw new Error(`'useShop()' must be a descendent of <ShopifyProvider/>`);
  }
  return shopContext;
}
const CART_ID_STORAGE_KEY = "shopifyCartId";
const SHOPIFY_STOREFRONT_ID_HEADER = "Shopify-Storefront-Id";
const SHOPIFY_STOREFRONT_Y_HEADER = "Shopify-Storefront-Y";
const SHOPIFY_STOREFRONT_S_HEADER = "Shopify-Storefront-S";
const SHOPIFY_VISIT_TOKEN_HEADER = "X-Shopify-VisitToken";
const SHOPIFY_UNIQUE_TOKEN_HEADER = "X-Shopify-UniqueToken";
const cachedTrackingValues = { current: null };
function getTrackingValues(cookieString) {
  var _a, _b, _c;
  let trackingValues;
  if (typeof window !== "undefined" && typeof window.performance !== "undefined") {
    try {
      const resourceRE = /^https?:\/\/([^/]+)(\/api\/(?:unstable|2\d{3}-\d{2})\/graphql\.json(?=$|\?))?/;
      const entries = performance.getEntriesByType(
        "resource"
      );
      let matchedValues;
      for (let i2 = entries.length - 1; i2 >= 0; i2--) {
        const entry2 = entries[i2];
        if (entry2.initiatorType !== "fetch")
          continue;
        const currentHost = window.location.host;
        const match = entry2.name.match(resourceRE);
        if (!match)
          continue;
        const [, matchedHost, sfapiPath] = match;
        const isMatch = (
          // Same origin (exact host match)
          matchedHost === currentHost || // Subdomain with SFAPI path
          sfapiPath && (matchedHost == null ? void 0 : matchedHost.endsWith(`.${currentHost}`))
        );
        if (isMatch) {
          const values = extractFromPerformanceEntry(entry2);
          if (values) {
            matchedValues = values;
            break;
          }
        }
      }
      if (matchedValues) {
        trackingValues = matchedValues;
      }
      if (trackingValues) {
        cachedTrackingValues.current = trackingValues;
      } else if (cachedTrackingValues.current) {
        trackingValues = cachedTrackingValues.current;
      }
      if (!trackingValues) {
        const navigationEntries = performance.getEntriesByType(
          "navigation"
        )[0];
        trackingValues = extractFromPerformanceEntry(navigationEntries, false);
      }
    } catch {
    }
  }
  if (!trackingValues) {
    const cookie = typeof document !== "undefined" ? document.cookie : "";
    trackingValues = {
      uniqueToken: ((_a = cookie.match(/\b_shopify_y=([^;]+)/)) == null ? void 0 : _a[1]) || "",
      visitToken: ((_b = cookie.match(/\b_shopify_s=([^;]+)/)) == null ? void 0 : _b[1]) || "",
      consent: ((_c = cookie.match(/\b_tracking_consent=([^;]+)/)) == null ? void 0 : _c[1]) || ""
    };
  }
  return trackingValues;
}
function extractFromPerformanceEntry(entry2, isConsentRequired = true) {
  let uniqueToken = "";
  let visitToken = "";
  let consent = "";
  const serverTiming = entry2.serverTiming;
  if (serverTiming && serverTiming.length >= 3) {
    for (let i2 = serverTiming.length - 1; i2 >= 0; i2--) {
      const { name, description } = serverTiming[i2];
      if (!name || !description)
        continue;
      if (name === "_y") {
        uniqueToken = description;
      } else if (name === "_s") {
        visitToken = description;
      } else if (name === "_cmp") {
        consent = description;
      }
      if (uniqueToken && visitToken && consent)
        break;
    }
  }
  return uniqueToken && visitToken && (isConsentRequired ? consent : true) ? { uniqueToken, visitToken, consent } : void 0;
}
function useCartFetch() {
  const {
    storefrontId,
    getPublicTokenHeaders,
    getStorefrontApiUrl,
    sameDomainForStorefrontApi
  } = useShop();
  return reactExports.useCallback(
    ({
      query,
      variables
    }) => {
      const headers = getPublicTokenHeaders({ contentType: "json" });
      if (storefrontId) {
        headers[SHOPIFY_STOREFRONT_ID_HEADER] = storefrontId;
      }
      if (!sameDomainForStorefrontApi) {
        const { uniqueToken, visitToken } = getTrackingValues();
        if (uniqueToken) {
          headers[SHOPIFY_STOREFRONT_Y_HEADER] = uniqueToken;
          headers[SHOPIFY_UNIQUE_TOKEN_HEADER] = uniqueToken;
        }
        if (visitToken) {
          headers[SHOPIFY_STOREFRONT_S_HEADER] = visitToken;
          headers[SHOPIFY_VISIT_TOKEN_HEADER] = visitToken;
        }
      }
      return fetch(getStorefrontApiUrl(), {
        method: "POST",
        headers,
        body: JSON.stringify({
          query: query.toString(),
          variables
        })
      }).then(
        (res) => res.json()
      ).catch((error) => {
        return {
          data: void 0,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
          errors: error == null ? void 0 : error.toString()
        };
      });
    },
    [
      getPublicTokenHeaders,
      storefrontId,
      getStorefrontApiUrl,
      sameDomainForStorefrontApi
    ]
  );
}
function useCartActions({
  numCartLines,
  cartFragment,
  countryCode = "US",
  languageCode = "EN"
}) {
  const fetchCart = useCartFetch();
  const cartFetch = reactExports.useCallback(
    (cartId) => {
      return fetchCart({
        query: CartQuery(cartFragment),
        variables: {
          id: cartId,
          numCartLines,
          country: countryCode,
          language: languageCode
        }
      });
    },
    [fetchCart, cartFragment, numCartLines, countryCode, languageCode]
  );
  const cartCreate = reactExports.useCallback(
    (cart) => {
      return fetchCart({
        query: CartCreate(cartFragment),
        variables: {
          input: cart,
          numCartLines,
          country: countryCode,
          language: languageCode
        }
      });
    },
    [cartFragment, countryCode, fetchCart, numCartLines, languageCode]
  );
  const cartLineAdd = reactExports.useCallback(
    (cartId, lines) => {
      return fetchCart({
        query: CartLineAdd(cartFragment),
        variables: {
          cartId,
          lines,
          numCartLines,
          country: countryCode,
          language: languageCode
        }
      });
    },
    [cartFragment, countryCode, fetchCart, numCartLines, languageCode]
  );
  const cartLineUpdate = reactExports.useCallback(
    (cartId, lines) => {
      return fetchCart({
        query: CartLineUpdate(cartFragment),
        variables: {
          cartId,
          lines,
          numCartLines,
          country: countryCode,
          language: languageCode
        }
      });
    },
    [cartFragment, countryCode, fetchCart, numCartLines, languageCode]
  );
  const cartLineRemove = reactExports.useCallback(
    (cartId, lines) => {
      return fetchCart({
        query: CartLineRemove(cartFragment),
        variables: {
          cartId,
          lines,
          numCartLines,
          country: countryCode,
          language: languageCode
        }
      });
    },
    [cartFragment, countryCode, fetchCart, numCartLines, languageCode]
  );
  const noteUpdate = reactExports.useCallback(
    (cartId, note) => {
      return fetchCart({
        query: CartNoteUpdate(cartFragment),
        variables: {
          cartId,
          note,
          numCartLines,
          country: countryCode,
          language: languageCode
        }
      });
    },
    [fetchCart, cartFragment, numCartLines, countryCode, languageCode]
  );
  const buyerIdentityUpdate = reactExports.useCallback(
    (cartId, buyerIdentity) => {
      return fetchCart({
        query: CartBuyerIdentityUpdate(cartFragment),
        variables: {
          cartId,
          buyerIdentity,
          numCartLines,
          country: countryCode,
          language: languageCode
        }
      });
    },
    [cartFragment, countryCode, fetchCart, numCartLines, languageCode]
  );
  const cartAttributesUpdate = reactExports.useCallback(
    (cartId, attributes) => {
      return fetchCart({
        query: CartAttributesUpdate(cartFragment),
        variables: {
          cartId,
          attributes,
          numCartLines,
          country: countryCode,
          language: languageCode
        }
      });
    },
    [cartFragment, countryCode, fetchCart, numCartLines, languageCode]
  );
  const discountCodesUpdate = reactExports.useCallback(
    (cartId, discountCodes) => {
      return fetchCart({
        query: CartDiscountCodesUpdate(cartFragment),
        variables: {
          cartId,
          discountCodes,
          numCartLines,
          country: countryCode,
          language: languageCode
        }
      });
    },
    [cartFragment, countryCode, fetchCart, numCartLines, languageCode]
  );
  return reactExports.useMemo(
    () => ({
      cartFetch,
      cartCreate,
      cartLineAdd,
      cartLineUpdate,
      cartLineRemove,
      noteUpdate,
      buyerIdentityUpdate,
      cartAttributesUpdate,
      discountCodesUpdate,
      cartFragment
    }),
    [
      cartFetch,
      cartCreate,
      cartLineAdd,
      cartLineUpdate,
      cartLineRemove,
      noteUpdate,
      buyerIdentityUpdate,
      cartAttributesUpdate,
      discountCodesUpdate,
      cartFragment
    ]
  );
}
function invokeCart(action, options) {
  return {
    entry: [
      ...(options == null ? void 0 : options.entryActions) || [],
      i({
        lastValidCart: (context) => context == null ? void 0 : context.cart
      }),
      "onCartActionEntry",
      "onCartActionOptimisticUI",
      action
    ],
    on: {
      RESOLVE: {
        target: (options == null ? void 0 : options.resolveTarget) || "idle",
        actions: [
          i({
            prevCart: (context) => context == null ? void 0 : context.lastValidCart,
            cart: (_, event) => {
              var _a;
              return (_a = event == null ? void 0 : event.payload) == null ? void 0 : _a.cart;
            },
            rawCartResult: (_, event) => {
              var _a;
              return (_a = event == null ? void 0 : event.payload) == null ? void 0 : _a.rawCartResult;
            },
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            errors: (_) => void 0
          })
        ]
      },
      ERROR: {
        target: (options == null ? void 0 : options.errorTarget) || "error",
        actions: [
          i({
            prevCart: (context) => context == null ? void 0 : context.lastValidCart,
            cart: (context) => context == null ? void 0 : context.lastValidCart,
            errors: (_, event) => {
              var _a;
              return (_a = event == null ? void 0 : event.payload) == null ? void 0 : _a.errors;
            }
          })
        ]
      },
      CART_COMPLETED: {
        target: "cartCompleted",
        actions: i({
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          prevCart: (_) => void 0,
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          cart: (_) => void 0,
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          lastValidCart: (_) => void 0,
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          rawCartResult: (_) => void 0,
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          errors: (_) => void 0
        })
      }
    },
    exit: ["onCartActionComplete", ...(options == null ? void 0 : options.exitActions) || []]
  };
}
const INITIALIZING_CART_EVENTS = {
  CART_FETCH: {
    target: "cartFetching"
  },
  CART_CREATE: {
    target: "cartCreating"
  },
  CART_SET: {
    target: "idle",
    actions: [
      i({
        rawCartResult: (_, event) => event.payload.cart,
        cart: (_, event) => cartFromGraphQL(event.payload.cart)
      })
    ]
  }
};
const UPDATING_CART_EVENTS = {
  CARTLINE_ADD: {
    target: "cartLineAdding"
  },
  CARTLINE_UPDATE: {
    target: "cartLineUpdating"
  },
  CARTLINE_REMOVE: {
    target: "cartLineRemoving"
  },
  NOTE_UPDATE: {
    target: "noteUpdating"
  },
  BUYER_IDENTITY_UPDATE: {
    target: "buyerIdentityUpdating"
  },
  CART_ATTRIBUTES_UPDATE: {
    target: "cartAttributesUpdating"
  },
  DISCOUNT_CODES_UPDATE: {
    target: "discountCodesUpdating"
  }
};
function createCartMachine(initialCart) {
  return s({
    id: "Cart",
    initial: initialCart ? "idle" : "uninitialized",
    context: {
      cart: initialCart && cartFromGraphQL(initialCart)
    },
    states: {
      uninitialized: {
        on: INITIALIZING_CART_EVENTS
      },
      cartCompleted: {
        on: INITIALIZING_CART_EVENTS
      },
      initializationError: {
        on: INITIALIZING_CART_EVENTS
      },
      idle: {
        on: { ...INITIALIZING_CART_EVENTS, ...UPDATING_CART_EVENTS }
      },
      error: {
        on: { ...INITIALIZING_CART_EVENTS, ...UPDATING_CART_EVENTS }
      },
      cartFetching: invokeCart("cartFetchAction", {
        errorTarget: "initializationError"
      }),
      cartCreating: invokeCart("cartCreateAction", {
        errorTarget: "initializationError"
      }),
      cartLineRemoving: invokeCart("cartLineRemoveAction"),
      cartLineUpdating: invokeCart("cartLineUpdateAction"),
      cartLineAdding: invokeCart("cartLineAddAction"),
      noteUpdating: invokeCart("noteUpdateAction"),
      buyerIdentityUpdating: invokeCart("buyerIdentityUpdateAction"),
      cartAttributesUpdating: invokeCart("cartAttributesUpdateAction"),
      discountCodesUpdating: invokeCart("discountCodesUpdateAction")
    }
  });
}
function useCartAPIStateMachine({
  numCartLines,
  onCartActionEntry,
  onCartActionOptimisticUI,
  onCartActionComplete,
  data: cart,
  cartFragment,
  countryCode,
  languageCode
}) {
  const {
    cartFetch,
    cartCreate,
    cartLineAdd,
    cartLineUpdate,
    cartLineRemove,
    noteUpdate,
    buyerIdentityUpdate,
    cartAttributesUpdate,
    discountCodesUpdate
  } = useCartActions({
    numCartLines,
    cartFragment,
    countryCode,
    languageCode
  });
  const cartMachine = reactExports.useMemo(() => createCartMachine(cart), [cart]);
  const [state, send, service] = useMachine(cartMachine, {
    actions: {
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      cartFetchAction: async (_, event) => {
        var _a;
        if (event.type !== "CART_FETCH")
          return;
        const { data, errors } = await cartFetch((_a = event == null ? void 0 : event.payload) == null ? void 0 : _a.cartId);
        const resultEvent = eventFromFetchResult(event, data == null ? void 0 : data.cart, errors);
        send(resultEvent);
      },
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      cartCreateAction: async (_, event) => {
        var _a;
        if (event.type !== "CART_CREATE")
          return;
        const { data, errors } = await cartCreate(event == null ? void 0 : event.payload);
        const resultEvent = eventFromFetchResult(
          event,
          (_a = data == null ? void 0 : data.cartCreate) == null ? void 0 : _a.cart,
          errors
        );
        send(resultEvent);
      },
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      cartLineAddAction: async (context, event) => {
        var _a, _b;
        if (event.type !== "CARTLINE_ADD" || !((_a = context == null ? void 0 : context.cart) == null ? void 0 : _a.id))
          return;
        const { data, errors } = await cartLineAdd(
          context.cart.id,
          event.payload.lines
        );
        const resultEvent = eventFromFetchResult(
          event,
          (_b = data == null ? void 0 : data.cartLinesAdd) == null ? void 0 : _b.cart,
          errors
        );
        send(resultEvent);
      },
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      cartLineUpdateAction: async (context, event) => {
        var _a, _b;
        if (event.type !== "CARTLINE_UPDATE" || !((_a = context == null ? void 0 : context.cart) == null ? void 0 : _a.id))
          return;
        const { data, errors } = await cartLineUpdate(
          context.cart.id,
          event.payload.lines
        );
        const resultEvent = eventFromFetchResult(
          event,
          (_b = data == null ? void 0 : data.cartLinesUpdate) == null ? void 0 : _b.cart,
          errors
        );
        send(resultEvent);
      },
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      cartLineRemoveAction: async (context, event) => {
        var _a, _b;
        if (event.type !== "CARTLINE_REMOVE" || !((_a = context == null ? void 0 : context.cart) == null ? void 0 : _a.id))
          return;
        const { data, errors } = await cartLineRemove(
          context.cart.id,
          event.payload.lines
        );
        const resultEvent = eventFromFetchResult(
          event,
          (_b = data == null ? void 0 : data.cartLinesRemove) == null ? void 0 : _b.cart,
          errors
        );
        send(resultEvent);
      },
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      noteUpdateAction: async (context, event) => {
        var _a, _b;
        if (event.type !== "NOTE_UPDATE" || !((_a = context == null ? void 0 : context.cart) == null ? void 0 : _a.id))
          return;
        const { data, errors } = await noteUpdate(
          context.cart.id,
          event.payload.note
        );
        const resultEvent = eventFromFetchResult(
          event,
          (_b = data == null ? void 0 : data.cartNoteUpdate) == null ? void 0 : _b.cart,
          errors
        );
        send(resultEvent);
      },
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      buyerIdentityUpdateAction: async (context, event) => {
        var _a, _b;
        if (event.type !== "BUYER_IDENTITY_UPDATE" || !((_a = context == null ? void 0 : context.cart) == null ? void 0 : _a.id))
          return;
        const { data, errors } = await buyerIdentityUpdate(
          context.cart.id,
          event.payload.buyerIdentity
        );
        const resultEvent = eventFromFetchResult(
          event,
          (_b = data == null ? void 0 : data.cartBuyerIdentityUpdate) == null ? void 0 : _b.cart,
          errors
        );
        send(resultEvent);
      },
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      cartAttributesUpdateAction: async (context, event) => {
        var _a, _b;
        if (event.type !== "CART_ATTRIBUTES_UPDATE" || !((_a = context == null ? void 0 : context.cart) == null ? void 0 : _a.id))
          return;
        const { data, errors } = await cartAttributesUpdate(
          context.cart.id,
          event.payload.attributes
        );
        const resultEvent = eventFromFetchResult(
          event,
          (_b = data == null ? void 0 : data.cartAttributesUpdate) == null ? void 0 : _b.cart,
          errors
        );
        send(resultEvent);
      },
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      discountCodesUpdateAction: async (context, event) => {
        var _a, _b;
        if (event.type !== "DISCOUNT_CODES_UPDATE" || !((_a = context == null ? void 0 : context.cart) == null ? void 0 : _a.id))
          return;
        const { data, errors } = await discountCodesUpdate(
          context.cart.id,
          event.payload.discountCodes
        );
        const resultEvent = eventFromFetchResult(
          event,
          (_b = data == null ? void 0 : data.cartDiscountCodesUpdate) == null ? void 0 : _b.cart,
          errors
        );
        send(resultEvent);
      },
      ...onCartActionEntry && {
        onCartActionEntry: (context, event) => {
          if (isCartActionEvent(event)) {
            onCartActionEntry(context, event);
          }
        }
      },
      ...onCartActionOptimisticUI && {
        onCartActionOptimisticUI: i((context, event) => {
          return onCartActionOptimisticUI(context, event);
        })
      },
      ...onCartActionComplete && {
        onCartActionComplete: (context, event) => {
          if (isCartFetchResultEvent(event)) {
            onCartActionComplete(context, event);
          }
        }
      }
    }
  });
  return reactExports.useMemo(() => [state, send, service], [state, send, service]);
}
function cartFromGraphQL(cart) {
  return {
    ...cart,
    lines: flattenConnection(cart == null ? void 0 : cart.lines),
    note: cart.note ?? void 0
  };
}
function eventFromFetchResult(cartActionEvent, cart, errors) {
  if (errors) {
    return { type: "ERROR", payload: { errors, cartActionEvent } };
  }
  if (!cart) {
    return {
      type: "CART_COMPLETED",
      payload: {
        cartActionEvent
      }
    };
  }
  return {
    type: "RESOLVE",
    payload: {
      cart: cartFromGraphQL(cart),
      rawCartResult: cart,
      cartActionEvent
    }
  };
}
function isCartActionEvent(event) {
  return event.type === "CART_CREATE" || event.type === "CARTLINE_ADD" || event.type === "CARTLINE_UPDATE" || event.type === "CARTLINE_REMOVE" || event.type === "NOTE_UPDATE" || event.type === "BUYER_IDENTITY_UPDATE" || event.type === "CART_ATTRIBUTES_UPDATE" || event.type === "DISCOUNT_CODES_UPDATE";
}
function isCartFetchResultEvent(event) {
  return event.type === "RESOLVE" || event.type === "ERROR" || event.type === "CART_COMPLETED";
}
const CartContext = reactExports.createContext(null);
function CartProvider({
  children,
  numCartLines,
  onCreate,
  onLineAdd,
  onLineRemove,
  onLineUpdate,
  onNoteUpdate,
  onBuyerIdentityUpdate,
  onAttributesUpdate,
  onDiscountCodesUpdate,
  onCreateComplete,
  onLineAddComplete,
  onLineRemoveComplete,
  onLineUpdateComplete,
  onNoteUpdateComplete,
  onBuyerIdentityUpdateComplete,
  onAttributesUpdateComplete,
  onDiscountCodesUpdateComplete,
  data: cart,
  cartFragment = defaultCartFragment,
  customerAccessToken,
  countryCode,
  languageCode
}) {
  var _a, _b, _c, _d, _e, _f, _g;
  const shop = useShop();
  if (!shop)
    throw new Error(
      "<CartProvider> needs to be a descendant of <ShopifyProvider>"
    );
  countryCode = (countryCode ?? shop.countryIsoCode ?? "US").toUpperCase();
  languageCode = (languageCode ?? shop.languageIsoCode ?? "EN").toUpperCase();
  if (countryCode)
    countryCode = countryCode.toUpperCase();
  const [prevCountryCode, setPrevCountryCode] = reactExports.useState(countryCode);
  const [prevCustomerAccessToken, setPrevCustomerAccessToken] = reactExports.useState(customerAccessToken);
  const customerOverridesCountryCode = reactExports.useRef(false);
  if (prevCountryCode !== countryCode || prevCustomerAccessToken !== customerAccessToken) {
    setPrevCountryCode(countryCode);
    setPrevCustomerAccessToken(customerAccessToken);
    customerOverridesCountryCode.current = false;
  }
  const [cartState, cartSend] = useCartAPIStateMachine({
    numCartLines,
    data: cart,
    cartFragment,
    countryCode,
    languageCode,
    onCartActionEntry(_, event) {
      try {
        switch (event.type) {
          case "CART_CREATE":
            return onCreate == null ? void 0 : onCreate();
          case "CARTLINE_ADD":
            return onLineAdd == null ? void 0 : onLineAdd();
          case "CARTLINE_REMOVE":
            return onLineRemove == null ? void 0 : onLineRemove();
          case "CARTLINE_UPDATE":
            return onLineUpdate == null ? void 0 : onLineUpdate();
          case "NOTE_UPDATE":
            return onNoteUpdate == null ? void 0 : onNoteUpdate();
          case "BUYER_IDENTITY_UPDATE":
            return onBuyerIdentityUpdate == null ? void 0 : onBuyerIdentityUpdate();
          case "CART_ATTRIBUTES_UPDATE":
            return onAttributesUpdate == null ? void 0 : onAttributesUpdate();
          case "DISCOUNT_CODES_UPDATE":
            return onDiscountCodesUpdate == null ? void 0 : onDiscountCodesUpdate();
        }
      } catch (error) {
        console.error("Cart entry action failed", error);
      }
    },
    onCartActionOptimisticUI(context, event) {
      var _a2, _b2, _c2, _d2;
      if (!context.cart)
        return { ...context };
      switch (event.type) {
        case "CARTLINE_REMOVE":
          return {
            ...context,
            cart: {
              ...context.cart,
              lines: (_b2 = (_a2 = context == null ? void 0 : context.cart) == null ? void 0 : _a2.lines) == null ? void 0 : _b2.filter(
                (line) => (line == null ? void 0 : line.id) && !event.payload.lines.includes(line == null ? void 0 : line.id)
              )
            }
          };
        case "CARTLINE_UPDATE":
          return {
            ...context,
            cart: {
              ...context.cart,
              lines: (_d2 = (_c2 = context == null ? void 0 : context.cart) == null ? void 0 : _c2.lines) == null ? void 0 : _d2.map((line) => {
                const updatedLine = event.payload.lines.find(
                  ({ id: id2 }) => id2 === (line == null ? void 0 : line.id)
                );
                if (updatedLine && updatedLine.quantity) {
                  return {
                    ...line,
                    quantity: updatedLine.quantity
                  };
                }
                return line;
              })
            }
          };
      }
      return { ...context };
    },
    onCartActionComplete(context, event) {
      const cartActionEvent = event.payload.cartActionEvent;
      try {
        switch (event.type) {
          case "RESOLVE":
            switch (cartActionEvent.type) {
              case "CART_CREATE":
                return onCreateComplete == null ? void 0 : onCreateComplete();
              case "CARTLINE_ADD":
                return onLineAddComplete == null ? void 0 : onLineAddComplete();
              case "CARTLINE_REMOVE":
                return onLineRemoveComplete == null ? void 0 : onLineRemoveComplete();
              case "CARTLINE_UPDATE":
                return onLineUpdateComplete == null ? void 0 : onLineUpdateComplete();
              case "NOTE_UPDATE":
                return onNoteUpdateComplete == null ? void 0 : onNoteUpdateComplete();
              case "BUYER_IDENTITY_UPDATE":
                if (countryCodeNotUpdated(context, cartActionEvent)) {
                  customerOverridesCountryCode.current = true;
                }
                return onBuyerIdentityUpdateComplete == null ? void 0 : onBuyerIdentityUpdateComplete();
              case "CART_ATTRIBUTES_UPDATE":
                return onAttributesUpdateComplete == null ? void 0 : onAttributesUpdateComplete();
              case "DISCOUNT_CODES_UPDATE":
                return onDiscountCodesUpdateComplete == null ? void 0 : onDiscountCodesUpdateComplete();
            }
        }
      } catch (error) {
        console.error("onCartActionComplete failed", error);
      }
    }
  });
  const cartReady = reactExports.useRef(false);
  const [isCartReady, setIsCartReady] = reactExports.useState(false);
  const cartCompleted = cartState.matches("cartCompleted");
  const countryChanged = (cartState.value === "idle" || cartState.value === "error" || cartState.value === "cartCompleted") && countryCode !== ((_c = (_b = (_a = cartState == null ? void 0 : cartState.context) == null ? void 0 : _a.cart) == null ? void 0 : _b.buyerIdentity) == null ? void 0 : _c.countryCode) && !cartState.context.errors;
  const fetchingFromStorage = reactExports.useRef(false);
  reactExports.useEffect(() => {
    if (!cartReady.current && !fetchingFromStorage.current) {
      if (!cart && storageAvailable("localStorage")) {
        fetchingFromStorage.current = true;
        try {
          const cartId = window.localStorage.getItem(CART_ID_STORAGE_KEY);
          if (cartId) {
            cartSend({ type: "CART_FETCH", payload: { cartId } });
          }
        } catch (error) {
          console.warn("error fetching cartId");
          console.warn(error);
        }
      }
      cartReady.current = true;
      setIsCartReady(true);
    }
  }, [cart, cartReady, cartSend]);
  reactExports.useEffect(() => {
    if (!countryChanged || customerOverridesCountryCode.current)
      return;
    cartSend({
      type: "BUYER_IDENTITY_UPDATE",
      payload: { buyerIdentity: { countryCode, customerAccessToken } }
    });
  }, [
    countryCode,
    customerAccessToken,
    countryChanged,
    customerOverridesCountryCode,
    cartSend
  ]);
  const onCartReadySend = reactExports.useCallback(
    (cartEvent) => {
      if (!cartReady.current) {
        return console.warn("Cart isn't ready yet");
      }
      cartSend(cartEvent);
    },
    [cartSend]
  );
  reactExports.useEffect(() => {
    var _a2, _b2, _c2;
    if (((_b2 = (_a2 = cartState == null ? void 0 : cartState.context) == null ? void 0 : _a2.cart) == null ? void 0 : _b2.id) && storageAvailable("localStorage")) {
      try {
        window.localStorage.setItem(
          CART_ID_STORAGE_KEY,
          (_c2 = cartState.context.cart) == null ? void 0 : _c2.id
        );
      } catch (error) {
        console.warn("Failed to save cartId to localStorage", error);
      }
    }
  }, [(_e = (_d = cartState == null ? void 0 : cartState.context) == null ? void 0 : _d.cart) == null ? void 0 : _e.id]);
  reactExports.useEffect(() => {
    if (cartCompleted && storageAvailable("localStorage")) {
      try {
        window.localStorage.removeItem(CART_ID_STORAGE_KEY);
      } catch (error) {
        console.warn("Failed to delete cartId from localStorage", error);
      }
    }
  }, [cartCompleted]);
  const cartCreate = reactExports.useCallback(
    (cartInput) => {
      var _a2, _b2;
      if (countryCode && !((_a2 = cartInput.buyerIdentity) == null ? void 0 : _a2.countryCode)) {
        if (cartInput.buyerIdentity == null) {
          cartInput.buyerIdentity = {};
        }
        cartInput.buyerIdentity.countryCode = countryCode;
      }
      if (customerAccessToken && !((_b2 = cartInput.buyerIdentity) == null ? void 0 : _b2.customerAccessToken)) {
        if (cartInput.buyerIdentity == null) {
          cartInput.buyerIdentity = {};
        }
        cartInput.buyerIdentity.customerAccessToken = customerAccessToken;
      }
      onCartReadySend({
        type: "CART_CREATE",
        payload: cartInput
      });
    },
    [countryCode, customerAccessToken, onCartReadySend]
  );
  const cartDisplayState = useDelayedStateUntilHydration(cartState);
  const cartContextValue = reactExports.useMemo(() => {
    var _a2, _b2, _c2, _d2;
    return {
      ...((_a2 = cartDisplayState == null ? void 0 : cartDisplayState.context) == null ? void 0 : _a2.cart) ?? { lines: [], attributes: [] },
      status: transposeStatus(cartDisplayState.value),
      error: (_b2 = cartDisplayState == null ? void 0 : cartDisplayState.context) == null ? void 0 : _b2.errors,
      totalQuantity: ((_d2 = (_c2 = cartDisplayState == null ? void 0 : cartDisplayState.context) == null ? void 0 : _c2.cart) == null ? void 0 : _d2.totalQuantity) ?? 0,
      cartCreate,
      cartReady: isCartReady,
      linesAdd(lines) {
        var _a3, _b3;
        if ((_b3 = (_a3 = cartDisplayState == null ? void 0 : cartDisplayState.context) == null ? void 0 : _a3.cart) == null ? void 0 : _b3.id) {
          onCartReadySend({
            type: "CARTLINE_ADD",
            payload: { lines }
          });
        } else {
          cartCreate({ lines });
        }
      },
      linesRemove(lines) {
        onCartReadySend({
          type: "CARTLINE_REMOVE",
          payload: {
            lines
          }
        });
      },
      linesUpdate(lines) {
        onCartReadySend({
          type: "CARTLINE_UPDATE",
          payload: {
            lines
          }
        });
      },
      noteUpdate(note) {
        onCartReadySend({
          type: "NOTE_UPDATE",
          payload: {
            note
          }
        });
      },
      buyerIdentityUpdate(buyerIdentity) {
        onCartReadySend({
          type: "BUYER_IDENTITY_UPDATE",
          payload: {
            buyerIdentity
          }
        });
      },
      cartAttributesUpdate(attributes) {
        onCartReadySend({
          type: "CART_ATTRIBUTES_UPDATE",
          payload: {
            attributes
          }
        });
      },
      discountCodesUpdate(discountCodes) {
        onCartReadySend({
          type: "DISCOUNT_CODES_UPDATE",
          payload: {
            discountCodes
          }
        });
      },
      cartFragment
    };
  }, [
    cartCreate,
    isCartReady,
    (_f = cartDisplayState == null ? void 0 : cartDisplayState.context) == null ? void 0 : _f.cart,
    (_g = cartDisplayState == null ? void 0 : cartDisplayState.context) == null ? void 0 : _g.errors,
    cartDisplayState.value,
    cartFragment,
    onCartReadySend
  ]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(CartContext.Provider, { value: cartContextValue, children });
}
function transposeStatus(status) {
  switch (status) {
    case "uninitialized":
    case "initializationError":
      return "uninitialized";
    case "idle":
    case "cartCompleted":
    case "error":
      return "idle";
    case "cartFetching":
      return "fetching";
    case "cartCreating":
      return "creating";
    case "cartLineAdding":
    case "cartLineRemoving":
    case "cartLineUpdating":
    case "noteUpdating":
    case "buyerIdentityUpdating":
    case "cartAttributesUpdating":
    case "discountCodesUpdating":
      return "updating";
  }
}
function useDelayedStateUntilHydration(state) {
  const [isPending, startTransition] = reactExports.useTransition();
  const [delayedState, setDelayedState] = reactExports.useState(state);
  const firstTimePending = reactExports.useRef(false);
  if (isPending) {
    firstTimePending.current = true;
  }
  const firstTimePendingFinished = reactExports.useRef(false);
  if (!isPending && firstTimePending.current) {
    firstTimePendingFinished.current = true;
  }
  reactExports.useEffect(() => {
    startTransition(() => {
      if (!firstTimePendingFinished.current) {
        setDelayedState(state);
      }
    });
  }, [state]);
  const displayState = firstTimePendingFinished.current ? state : delayedState;
  return displayState;
}
function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x2 = "__storage_test__";
    storage.setItem(x2, x2);
    storage.removeItem(x2);
    return true;
  } catch (e2) {
    return !!(e2 instanceof DOMException && // everything except Firefox
    (e2.code === 22 || // Firefox
    e2.code === 1014 || // test name field too, because code might not be present
    // everything except Firefox
    e2.name === "QuotaExceededError" || // Firefox
    e2.name === "NS_ERROR_DOM_QUOTA_REACHED") && // acknowledge QuotaExceededError only if there's something already stored
    storage && storage.length !== 0);
  }
}
function countryCodeNotUpdated(context, event) {
  var _a, _b;
  return !!(event.payload.buyerIdentity.countryCode && ((_b = (_a = context.cart) == null ? void 0 : _a.buyerIdentity) == null ? void 0 : _b.countryCode) !== event.payload.buyerIdentity.countryCode);
}
function Header({ menu }) {
  var _a;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("header", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container", style: { display: "flex", alignItems: "center", justifyContent: "space-between" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/", className: "brand", "aria-label": "Página inicial", style: { display: "inline-flex", alignItems: "center" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/logo.svg", alt: "BrinqueTEAndo", style: { height: "40px" } }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { style: { display: "flex", gap: "16px", flexWrap: "wrap" }, children: ((_a = menu == null ? void 0 : menu.items) == null ? void 0 : _a.length) ? menu.items.map((item) => {
      var _a2;
      return ((_a2 = item.url) == null ? void 0 : _a2.startsWith("http")) ? /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: item.url, rel: "noopener", style: { color: "var(--brand-blue)" }, children: item.title }, item.id) : /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: item.url || "/", style: { color: "var(--brand-blue)" }, children: item.title }, item.id);
    }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", children: "Início" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/collections/sensory-toys", children: "Coleções" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/collections/by-age", children: "Por Idade" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/collections/by-skill", children: "Por Habilidade" })
    ] }) })
  ] }) });
}
function Footer({ menu }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container", style: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "BrinqueTEAndo" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Brinquedos educativos com foco em TEA/TDAH." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Menu" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { style: { listStyle: "none", padding: 0 }, children: ((menu == null ? void 0 : menu.items) || []).map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: item.url || "/", children: item.title }) }, item.id)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Contato" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "WhatsApp: (xx) xxxx-xxxx" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Email: contato@brinqueteando.com" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Newsletter" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: (e2) => e2.preventDefault(), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "email", placeholder: "Seu e-mail", required: true }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn-primary", type: "submit", children: "Assinar" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container", style: { marginTop: "12px" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("small", { children: "© 2026 BrinqueTEAndo. Todos os direitos reservados." }) })
  ] });
}
var define_process_env_default$1 = {};
const STORE_DOMAIN = define_process_env_default$1.PUBLIC_STORE_DOMAIN || "uxst0j-qe.myshopify.com";
const STOREFRONT_API_TOKEN = define_process_env_default$1.PUBLIC_STOREFRONT_API_TOKEN || "f4519cf3a3a10b4fccca0df4b0a464e1";
const API_VERSION = "2024-10";
async function fetchShopify(query, variables = {}) {
  try {
    const response = await fetch(`https://${STORE_DOMAIN}/api/${API_VERSION}/graphql.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": STOREFRONT_API_TOKEN
      },
      body: JSON.stringify({ query, variables })
    });
    if (!response.ok) {
      console.error("Shopify API error:", response.status, response.statusText);
      return null;
    }
    const json2 = await response.json();
    if (json2.errors) {
      console.error("GraphQL errors:", json2.errors);
      return null;
    }
    return json2.data;
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
}
const MENU_QUERY = `
  query Menu($handle: String!) {
    menu(handle: $handle) {
      id
      title
      items {
        id
        title
        url
        items {
          id
          title
          url
        }
      }
    }
  }
`;
const PRODUCT_QUERY = `
  query Product($handle: String!) {
    product(handle: $handle) {
      id
      title
      description
      descriptionHtml
      handle
      vendor
      tags
      productType
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      images(first: 10) {
        edges {
          node {
            id
            url
            altText
            width
            height
          }
        }
      }
      variants(first: 50) {
        edges {
          node {
            id
            title
            priceV2 {
              amount
              currencyCode
            }
            availableForSale
            sku
            selectedOptions {
              name
              value
            }
          }
        }
      }
      seo {
        title
        description
      }
    }
  }
`;
const COLLECTION_QUERY = `
  query Collection($handle: String!, $first: Int!, $sortKey: ProductCollectionSortKeys, $reverse: Boolean) {
    collection(handle: $handle) {
      id
      title
      description
      descriptionHtml
      handle
      seo {
        title
        description
      }
      image {
        id
        url
        altText
      }
      products(first: $first, sortKey: $sortKey, reverse: $reverse) {
        edges {
          node {
            id
            title
            handle
            vendor
            tags
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 2) {
              edges {
                node {
                  id
                  url
                  altText
                }
              }
            }
            availableForSale
          }
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
      }
    }
  }
`;
const COLLECTIONS_QUERY = `
  query Collections($first: Int!) {
    collections(first: $first) {
      edges {
        node {
          id
          title
          handle
          description
          image {
            url
            altText
          }
          products(first: 1) {
            edges {
              node {
                id
              }
            }
          }
        }
      }
    }
  }
`;
const PRODUCT_RECOMMENDATIONS_QUERY = `
  query ProductRecommendations($productId: ID!) {
    productRecommendations(productId: $productId) {
      id
      title
      handle
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      images(first: 1) {
        edges {
          node {
            url
            altText
          }
        }
      }
    }
  }
`;
var define_process_env_default = {};
const meta$3 = () => [{ title: "BrinqueTEAndo" }];
const links = () => [
  { rel: "stylesheet", href: "/app.css" }
];
async function loader$3() {
  var _a, _b;
  let header = null;
  let footer = null;
  try {
    header = ((_a = await fetchShopify(MENU_QUERY, { handle: "main-menu" })) == null ? void 0 : _a.menu) || null;
    footer = ((_b = await fetchShopify(MENU_QUERY, { handle: "footer-menu" })) == null ? void 0 : _b.menu) || null;
  } catch (_) {
  }
  return json({
    shop: {
      storeDomain: define_process_env_default.PUBLIC_STORE_DOMAIN || "",
      storefrontToken: define_process_env_default.PUBLIC_STOREFRONT_API_TOKEN || "",
      apiVersion: "2024-10",
      country: "BR",
      language: "PT_BR"
    },
    menus: { header, footer }
  });
}
function App() {
  const data = useLoaderData();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "pt-BR", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("head", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Meta, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Links, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
          :root {
            --brand-blue-light: #8ECAE7;
            --brand-blue-dark: #21388D;
            --brand-blue: #3292D8;
            --brand-red: #CF111A;
            --brand-yellow: #DEC91F;
            --brand-gray-blue: #7D8FA4;
            --brand-beige: #EAD9B9;
          }
          body { margin: 0; font-family: system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', Arial, 'Noto Sans', sans-serif; background: #fff; color: #111; }
          a { color: var(--brand-blue); text-decoration: none; }
          .container { max-width: 1200px; margin: 0 auto; padding: 16px; }
          .btn-primary { background: var(--brand-blue-light); color: var(--brand-blue-dark); padding: 12px 20px; border-radius: 8px; font-weight: 700; border: none; cursor: pointer; }
          .btn-secondary { background: var(--brand-blue); color: #fff; padding: 12px 20px; border-radius: 8px; font-weight: 700; border: none; cursor: pointer; }
          header { padding: 12px 16px; border-bottom: 1px solid #eee; }
          header .brand { font-weight: 800; color: var(--brand-blue-dark); }
          footer { margin-top: 48px; padding: 24px 16px; background: #f8fafc; border-top: 1px solid #eee; }
        ` })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ShopifyProvider, { storefrontApiVersion: data.shop.apiVersion, storeDomain: `https://${data.shop.storeDomain}`, storefrontToken: data.shop.storefrontToken, country: data.shop.country, language: data.shop.language, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CartProvider, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Header, { menu: data.menus.header }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "container", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, { menu: data.menus.footer })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollRestoration, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: App,
  links,
  loader: loader$3,
  meta: meta$3
}, Symbol.toStringTag, { value: "Module" }));
const meta$2 = ({ data }) => {
  var _a, _b, _c;
  return [
    { title: `${((_a = data == null ? void 0 : data.collection) == null ? void 0 : _a.title) || "Coleção"} - BrinqueTEAndo` },
    { name: "description", content: ((_c = (_b = data == null ? void 0 : data.collection) == null ? void 0 : _b.seo) == null ? void 0 : _c.description) || "Coleção com filtros por preço, idade, habilidades e tipo de produto." }
  ];
};
async function loader$2({ params }) {
  const { handle } = params;
  const data = await fetchShopify(COLLECTION_QUERY, { handle, first: 12, sortKey: "RELEVANCE", reverse: false });
  return json({ collection: data == null ? void 0 : data.collection });
}
function CollectionPage() {
  var _a, _b;
  const { collection } = useLoaderData();
  const products = ((_b = (_a = collection == null ? void 0 : collection.products) == null ? void 0 : _a.edges) == null ? void 0 : _b.map((e2) => e2.node)) || [];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { style: { marginTop: 0 }, children: [
      "Coleção: ",
      collection == null ? void 0 : collection.title
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { style: { display: "grid", gridTemplateColumns: "260px 1fr", gap: "24px" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { style: { border: "1px solid #eee", borderRadius: "12px", padding: "12px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Filtros" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
          "Preço: ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "range", min: 0, max: 500 })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Idade" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox" }),
            " 3-5 anos"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox" }),
            " 6-8 anos"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox" }),
            " 9-12 anos"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox" }),
            " 13+"
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Habilidade" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox" }),
            " Motora Fina"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox" }),
            " Comunicação"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox" }),
            " Social"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox" }),
            " Cognitiva"
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox" }),
          " Somente em estoque"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Ordenar por" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Relevância" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Menor Preço" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Maior Preço" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Mais Vendidos" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Novidades" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Melhor Avaliação" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }, children: products.map((p2) => {
        var _a2, _b2, _c, _d, _e, _f, _g, _h;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { border: "1px solid #eee", borderRadius: "12px", padding: "12px" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { background: "#f2f2f2", height: 160, borderRadius: "8px" }, children: ((_d = (_c = (_b2 = (_a2 = p2 == null ? void 0 : p2.images) == null ? void 0 : _a2.edges) == null ? void 0 : _b2[0]) == null ? void 0 : _c.node) == null ? void 0 : _d.url) && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: p2.images.edges[0].node.url, alt: p2.images.edges[0].node.altText || p2.title, style: { width: "100%", height: "100%", objectFit: "cover", borderRadius: "8px" } }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: p2.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            (_f = (_e = p2.priceRange) == null ? void 0 : _e.minVariantPrice) == null ? void 0 : _f.amount,
            " ",
            (_h = (_g = p2.priceRange) == null ? void 0 : _g.minVariantPrice) == null ? void 0 : _h.currencyCode
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { marginTop: "8px", display: "flex", gap: "8px" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { className: "btn-secondary", to: `/products/${p2.handle}`, children: "Ver" }) })
        ] }, p2.id);
      }) }) })
    ] })
  ] });
}
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: CollectionPage,
  loader: loader$2,
  meta: meta$2
}, Symbol.toStringTag, { value: "Module" }));
const meta$1 = ({ data }) => {
  var _a, _b, _c;
  return [
    { title: `${((_a = data == null ? void 0 : data.product) == null ? void 0 : _a.title) || "Produto"} - BrinqueTEAndo` },
    { name: "description", content: ((_c = (_b = data == null ? void 0 : data.product) == null ? void 0 : _b.seo) == null ? void 0 : _c.description) || "Benefícios educacionais para TEA/TDAH, idade recomendada e certificações." }
  ];
};
async function loader$1({ params }) {
  var _a;
  const { handle } = params;
  const product = (_a = await fetchShopify(PRODUCT_QUERY, { handle })) == null ? void 0 : _a.product;
  let recommendations = [];
  if (product == null ? void 0 : product.id) {
    const rec = await fetchShopify(PRODUCT_RECOMMENDATIONS_QUERY, { productId: product.id });
    recommendations = (rec == null ? void 0 : rec.productRecommendations) || [];
  }
  return json({ product, recommendations });
}
function ProductPage() {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k;
  const { product, recommendations } = useLoaderData();
  const { linesAdd } = reactExports.useCart();
  const firstVariantId = (_d = (_c = (_b = (_a = product == null ? void 0 : product.variants) == null ? void 0 : _a.edges) == null ? void 0 : _b[0]) == null ? void 0 : _c.node) == null ? void 0 : _d.id;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { style: { marginBottom: "12px" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", children: "Início" }),
      " ",
      ">",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/collections/sensory-toys", children: "Coleções" }),
      " ",
      ">",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: (product == null ? void 0 : product.title) || "Produto" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { style: { display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "24px" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }, children: (_g = (_f = (_e = product == null ? void 0 : product.images) == null ? void 0 : _e.edges) == null ? void 0 : _f.slice(0, 4)) == null ? void 0 : _g.map(({ node }, i2) => /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: node.url, alt: node.altText || (product == null ? void 0 : product.title), style: { height: 180, objectFit: "cover", borderRadius: "8px" } }, node.id || i2)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { marginTop: "8px" }, children: "Galeria (min 5 imagens) e 360° (placeholder)." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { style: { marginTop: 0 }, children: product == null ? void 0 : product.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { fontSize: "24px", fontWeight: 800 }, children: [
          (_i = (_h = product == null ? void 0 : product.priceRange) == null ? void 0 : _h.minVariantPrice) == null ? void 0 : _i.amount,
          " ",
          (_k = (_j = product == null ? void 0 : product.priceRange) == null ? void 0 : _j.minVariantPrice) == null ? void 0 : _k.currencyCode
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: "#555" }, children: "Em estoque" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { marginTop: "12px" }, dangerouslySetInnerHTML: { __html: (product == null ? void 0 : product.descriptionHtml) || "" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", gap: "12px" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn-primary", disabled: !firstVariantId, onClick: () => linesAdd([{ merchandiseId: firstVariantId, quantity: 1 }]), children: "ADICIONAR AO CARRINHO" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { marginTop: "12px", color: "#555" }, children: "Entrega estimada: Litoral de SP em 2-4 dias úteis." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginTop: "16px", display: "flex", gap: "12px" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "🚚 Frete grátis acima de R$ 250" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "🔒 Pagamento seguro" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "↩️ Devolução fácil" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { style: { marginTop: "24px" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Relacionados" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px" }, children: recommendations == null ? void 0 : recommendations.map((p2) => {
        var _a2, _b2, _c2, _d2;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { border: "1px solid #eee", borderRadius: "8px", padding: "12px" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: p2.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            (_b2 = (_a2 = p2.priceRange) == null ? void 0 : _a2.minVariantPrice) == null ? void 0 : _b2.amount,
            " ",
            (_d2 = (_c2 = p2.priceRange) == null ? void 0 : _c2.minVariantPrice) == null ? void 0 : _d2.currencyCode
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { className: "btn-secondary", style: { marginTop: "8px" }, to: `/products/${p2.handle}`, children: "Ver" })
        ] }, p2.id);
      }) })
    ] })
  ] });
}
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ProductPage,
  loader: loader$1,
  meta: meta$1
}, Symbol.toStringTag, { value: "Module" }));
const meta = () => [
  { title: "BrinqueTEAndo - Brinquedos Educativos para Autismo, TDAH e TEA | Litoral SP" },
  { name: "description", content: "Brinquedos que transformam o aprendizado. Benefícios para TEA/TDAH. Entrega no litoral de SP." }
];
async function loader() {
  var _a, _b;
  const data = await fetchShopify(COLLECTIONS_QUERY, { first: 4 }).catch(() => null);
  const collections = ((_b = (_a = data == null ? void 0 : data.collections) == null ? void 0 : _a.edges) == null ? void 0 : _b.map((e2) => e2.node)) || [];
  return json({ collections });
}
function HomePage() {
  const { collections } = useLoaderData();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { style: {
      padding: "40px",
      background: "var(--brand-blue-light)",
      borderRadius: "16px",
      position: "relative"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { style: { color: "var(--brand-blue-dark)" }, children: "Brinquedos que Transformam o Aprendizado" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Foco nos benefícios para TEA/TDAH e desenvolvimento infantil." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: "12px", marginTop: "16px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { className: "btn-primary", to: "/collections/sensory-toys", children: "EXPLORAR BRINQUEDOS" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { className: "btn-secondary", to: "/about", children: "SOBRE NÓS" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "aria-hidden": true, style: { position: "absolute", right: 20, top: 20, opacity: 0.2, fontSize: "64px" }, children: "🐉" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { style: { marginTop: "32px" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Coleções em Destaque" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }, children: collections.map((c2) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { border: "1px solid #eee", borderRadius: "12px", padding: "16px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: c2.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Explore produtos recomendados para desenvolvimento." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { className: "btn-secondary", to: `/collections/${c2.handle}`, children: "VER COLEÇÃO" })
      ] }, c2.id)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { style: { marginTop: "32px" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Mais Amados pelas Famílias" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Carousel/grid de best sellers (placeholder)." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { style: { marginTop: "32px" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Nosso Compromisso Educacional" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }, children: ["Desenvolvimento Através da Brincadeira", "Recomendados por Terapeutas", "Segurança e Qualidade", "Entrega Rápida no Litoral de SP"].map((t2, i2) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { border: "1px solid #eee", borderRadius: "12px", padding: "16px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: t2 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Conteúdo educativo breve explicando o benefício." })
      ] }, i2)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { style: { marginTop: "32px" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Aprenda Conosco" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Cards de blog/artigos (placeholder)." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { style: { marginTop: "32px", background: "var(--brand-blue-light)", padding: "24px", borderRadius: "12px" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: { color: "var(--brand-blue-dark)" }, children: "Receba Dicas e Novidades" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Cadastre-se e receba conteúdo exclusivo sobre desenvolvimento infantil" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { style: { display: "flex", gap: "12px", flexWrap: "wrap" }, onSubmit: (e2) => e2.preventDefault(), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { placeholder: "Nome" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "email", placeholder: "Email", required: true }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { placeholder: "WhatsApp" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn-primary", type: "submit", children: "CADASTRAR" })
      ] })
    ] })
  ] });
}
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: HomePage,
  loader,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-BkZeBuxB.js", "imports": ["/assets/components-DIzj77dM.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/root-DYC9Ya5C.js", "imports": ["/assets/components-DIzj77dM.js"], "css": [] }, "routes/collections.$handle": { "id": "routes/collections.$handle", "parentId": "root", "path": "collections/:handle", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/collections._handle-B_gzQrho.js", "imports": ["/assets/components-DIzj77dM.js"], "css": [] }, "routes/products.$handle": { "id": "routes/products.$handle", "parentId": "root", "path": "products/:handle", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/products._handle-BSO0ueyC.js", "imports": ["/assets/components-DIzj77dM.js"], "css": [] }, "routes/index": { "id": "routes/index", "parentId": "root", "path": "index", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/index-CWMI_MAs.js", "imports": ["/assets/components-DIzj77dM.js"], "css": [] } }, "url": "/assets/manifest-4498b74e.js", "version": "4498b74e" };
const mode = "production";
const assetsBuildDirectory = "dist/client";
const basename = "/";
const future = { "v3_fetcherPersist": true, "v3_relativeSplatPath": true, "v3_throwAbortReason": true, "v3_routeConfig": false, "v3_singleFetch": false, "v3_lazyRouteDiscovery": false, "unstable_optimizeDeps": false };
const isSpaMode = false;
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/collections.$handle": {
    id: "routes/collections.$handle",
    parentId: "root",
    path: "collections/:handle",
    index: void 0,
    caseSensitive: void 0,
    module: route1
  },
  "routes/products.$handle": {
    id: "routes/products.$handle",
    parentId: "root",
    path: "products/:handle",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/index": {
    id: "routes/index",
    parentId: "root",
    path: "index",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  mode,
  publicPath,
  routes
};
