var Utils, __domComplete, __domReady,
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
  __slice = [].slice;

Utils = {};

Utils.parseAsset = function(value) {
  var extension, tmp_value;
  if (!value || value.length === 0) {
    return value;
  }
  if (!Utils.isString(value)) {
    return value;
  }
  if (window.__CATALOG !== void 0) {
    tmp_value = '';
    extension = value.split('.').pop();
    if (value === extension) {
      if (window.__CATALOG[value] === void 0) {
        log('Asset named \'' + value + '\' does not exist.', 'error');
        return '';
      }
      tmp_value = 'documents/' + value + '.' + window.__CATALOG[value];
      if (window.__IS_DIRECT_PATH && window.__ID) {
        tmp_value = '/' + window.__ID + '/' + tmp_value;
      } else if (window.USE_PROJECT_PATH !== void 0 && window.__ID !== void 0) {
        tmp_value = '/p/' + window.__ID + '/' + tmp_value;
      } else {
        tmp_value = '/' + tmp_value;
      }
      if (App.__BUILD && !App.USE_PROJECT_PATH) {
        tmp_value += '?b=' + App.__BUILD;
      }
      return tmp_value;
    }
  }
  return value;
};

Utils.parseURL = function(value) {
  var isExternal;
  if ((window.USE_PROJECT_PATH !== void 0 || window.__IS_DIRECT_PATH !== void 0) && window.__ID !== void 0) {
    isExternal = function(url) {
      var domain, domainURL;
      domain = function(url) {
        return url.replace('http://', '').replace('https://', '').split('/')[0];
      };
      domainURL = domain(url);
      if (domainURL === '') {
        return false;
      }
      return domain(location.href) !== domainURL;
    };
    if (!isExternal(value)) {
      if (value[0] !== '/') {
        value = '/' + value;
      }
      if (App.USE_PROJECT_PATH || App.__IS_DIRECT_PATH) {
        value = '/' + window.__ID + value;
        if (App.USE_PROJECT_PATH) {
          value = '/p' + value;
        }
      }
    }
  }
  return value;
};

Utils.base64 = function(str) {
  return window.btoa(escape(encodeURIComponent(str)));
};

Utils.utf8 = function(str) {
  return decodeURIComponent(unescape(window.atob(str)));
};

Utils.groupBy = function(array, f) {
  var groups;
  groups = {};
  array.forEach(function(o) {
    var group;
    group = JSON.stringify(f(o));
    groups[group] = groups[group] || [];
    groups[group].push(o);
  });
  return Object.keys(groups).map(function(group) {
    return groups[group];
  });
};

Utils.mergeArray = function(a, b) {
  return a.concat(b);
};

Utils.values = function(arr) {
  var i, keys, vals, _i, _len;
  keys = Object.keys(arr);
  vals = [];
  for (_i = 0, _len = keys.length; _i < _len; _i++) {
    i = keys[_i];
    vals.push(arr[i]);
  }
  return vals;
};

Utils.pluck = function(arr, key) {
  return arr.map(function(object) {
    return object[key];
  });
};

Utils.without = function(a, b) {
  if (!Utils.isArray(a)) {
    a = [a];
  }
  if (!Utils.isArray(b)) {
    b = [b];
  }
  return a.filter(function(i) {
    return b.indexOf(i) < 0;
  });
};

Utils.e = function(str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
};

Utils.clone = function(original) {
  var clone, i, keys;
  if (Utils.isArray(original)) {
    return original.slice(0);
  }
  clone = Object.create(Object.getPrototypeOf(original));
  i = void 0;
  keys = Object.getOwnPropertyNames(original);
  i = 0;
  while (i < keys.length) {
    Object.defineProperty(clone, keys[i], Object.getOwnPropertyDescriptor(original, keys[i]));
    i++;
  }
  return clone;
};

Utils.capitalizeFirstLetter = function(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

Utils.capitalizeFirst = Utils.capitalizeFirstLetter;

Utils.startsWith = function(str, prefix) {
  return str.lastIndexOf(prefix, 0) === 0;
};

Utils.endsWith = function(str, suffix) {
  return str.indexOf(suffix, str.length - suffix.length) !== -1;
};

Utils.pick = function(obj, list) {
  var i, j, newObj, o, str;
  newObj = {};
  i = 0;
  while (i < list.length) {
    str = list[i].split('.');
    o = obj[str[0]];
    j = 1;
    while (j < str.length) {
      o = o[str[j]];
      j++;
    }
    newObj[list[i]] = o;
    i++;
  }
  return newObj;
};


/*
var a ={
    "2013-06-26":839,
    "2013-06-25":50,
    "2013-03-08":25,
    "2013-05-14":546,
    "2013-03-11":20
};
 */

Utils.min = function(object) {
  if (Utils.isArray(object)) {
    return Math.min.apply(null, object);
  } else {
    return Object.keys(object).sort()[0];
  }
};

Utils.max = function(object) {
  if (Utils.isArray(object)) {
    return Math.max.apply(null, object);
  } else {
    return Object.keys(object).sort().slice(-1)[0];
  }
};

Utils.isEqual = function(x, y) {
  'use strict';
  var p;
  if (x === null || x === void 0 || y === null || y === void 0) {
    return x === y;
  }
  if (x.constructor !== y.constructor) {
    return false;
  }
  if (x instanceof Function) {
    return x === y;
  }
  if (x instanceof RegExp) {
    return x === y;
  }
  if (x === y || x.valueOf() === y.valueOf()) {
    return true;
  }
  if (Array.isArray(x) && x.length !== y.length) {
    return false;
  }
  if (x instanceof Date) {
    return false;
  }
  if (!(x instanceof Object)) {
    return false;
  }
  if (!(y instanceof Object)) {
    return false;
  }
  p = Object.keys(x);
  return Object.keys(y).every(function(i) {
    return p.indexOf(i) !== -1;
  }) && p.every(function(i) {
    return Utils.isEqual(x[i], y[i]);
  });
};

Utils.invoke = function(obj, method) {
  var args, isFunc;
  args = Array.prototype.slice.call(arguments, 2);
  isFunc = typeof method === 'function';
  return obj.map(function(value) {
    return (isFunc ? method : value[method]).apply(value, args);
  });
};

Utils.first = function(arr) {
  return arr[0];
};

Utils.last = function(arr) {
  return arr[arr.length - 1];
};

Utils.extend = function(a, b) {
  var key;
  for (key in b) {
    if (b.hasOwnProperty(key)) {
      a[key] = b[key];
    }
  }
  return a;
};

Utils.defaults = function(a, b) {
  var key;
  for (key in b) {
    if (!a.hasOwnProperty(key)) {
      a[key] = b[key];
    }
  }
  return a;
};

Utils.union = function(x, y) {
  var a, array, i, j;
  array = x.concat(y);
  a = array.concat();
  i = 0;
  while (i < a.length) {
    j = i + 1;
    while (j < a.length) {
      if (a[i] === a[j]) {
        a.splice(j--, 1);
      }
      ++j;
    }
    ++i;
  }
  return a;
};

Utils.isString = function(string) {
  if (typeof string === 'string') {
    return true;
  }
  return false;
};

Utils.isFunction = function(func) {
  if (typeof func === 'function') {
    return true;
  }
  return false;
};

Utils.isBoolean = function(bool) {
  if (typeof bool === 'boolean') {
    return true;
  }
  return false;
};

Utils.isFloat = function(float) {
  return Number(float) === float && float % 1 !== 0;
};

Utils.isInteger = function(int) {
  return Number.isInteger(int);
};

Utils.isNumber = function(num) {
  return !isNaN(num);
};

Utils.isArray = function(arr) {
  return Array.isArray(arr);
};

Utils.isObject = function(obj) {
  if (obj && typeof obj === 'object') {
    return true;
  }
  return false;
};

Utils.isFinite = function(num) {
  if (num < Infinity && num > -Infinity) {
    return true;
  }
  return false;
};

Utils.isDate = function(object) {
  if (object instanceof Date) {
    return true;
  }
  return false;
};

Utils.isRegExp = function(reg) {
  if (reg instanceof RegExp) {
    return true;
  }
  return false;
};

Utils.isError = function(object) {
  if (object instanceof Error) {
    return true;
  }
  return false;
};

Utils.isNaN = function(val) {
  if (isNaN(val)) {
    return true;
  }
  return false;
};

Utils.isNull = function(val) {
  if (val === null) {
    return true;
  }
  return false;
};

Utils.isUndefined = function(val) {
  if (val === void 0) {
    return true;
  }
  return false;
};

Utils.keys = function(object) {
  return Object.keys(object);
};

Utils.reset = function() {
  return App.CurrentContext.reset();
};

Utils.getValue = function(value) {
  if (Utils.isFunction(value)) {
    return value();
  }
  return value;
};

Utils.getValueForKeyPath = function(obj, key) {
  var result, _i, _len, _ref, _ref1;
  result = obj;
  if (_ref = !".", __indexOf.call(key, _ref) >= 0) {
    return obj[key];
  }
  _ref1 = key.split(".");
  for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
    key = _ref1[_i];
    result = result[key];
  }
  return result;
};

Utils.setValueForKeyPath = function(obj, path, val) {
  var field, fields, i, n, result;
  fields = path.split('.');
  result = obj;
  i = 0;
  n = fields.length;
  while (i < n && result !== void 0) {
    field = fields[i];
    if (i === n - 1) {
      result[field] = val;
    } else {
      if (typeof result[field] === 'undefined' || !Utils.isObject(result[field])) {
        result[field] = {};
      }
      result = result[field];
    }
    i++;
  }
};

Utils.valueOrDefault = function(value, defaultValue) {
  if (value === (void 0) || value === null) {
    value = defaultValue;
  }
  return value;
};

Utils.arrayNext = function(arr, item) {
  return arr[arr.indexOf(item) + 1] || Utils.first(arr);
};

Utils.arrayPrev = function(arr, item) {
  return arr[arr.indexOf(item) - 1] || Utils.last(arr);
};

Utils.sum = function(arr) {
  return arr.reduce(function(a, b) {
    return a + b;
  });
};

Utils.average = function(arr) {
  return Utils.sum(arr) / arr.length;
};

Utils.mean = Utils.average;

Utils.median = function(x) {
  var sorted;
  if (x.length === 0) {
    return null;
  }
  sorted = x.slice().sort(function(a, b) {
    return a - b;
  });
  if (sorted.length % 2 === 1) {
    return sorted[(sorted.length - 1) / 2];
  } else {
    return (sorted[(sorted.length / 2) - 1] + sorted[sorted.length / 2]) / 2;
  }
};

Utils.nearestIncrement = function(x, increment) {
  if (!increment) {
    return x;
  }
  return Math.round(x * (1 / increment)) / (1 / increment);
};

if (window.performance) {
  Utils.getTime = function() {
    return window.performance.now() / 1000;
  };
} else {
  Utils.getTime = function() {
    return Date.now() / 1000;
  };
}

Utils.delay = function(time, f) {
  var timer;
  timer = setTimeout(f, time * 1000);
  App.CurrentContext.addTimer(timer);
  return timer;
};

Utils.interval = function(time, f) {
  var timer;
  timer = setInterval(f, time * 1000);
  App.CurrentContext.addInterval(timer);
  return {
    stop: function() {
      return clearInterval(timer);
    },
    clear: function() {
      return clearInterval(timer);
    }
  };
};

Utils.debounce = function(threshold, fn, immediate) {
  var timeout;
  if (threshold == null) {
    threshold = 0.1;
  }
  timeout = null;
  threshold *= 1000;
  return function() {
    var args, delayed, obj;
    args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    obj = this;
    delayed = function() {
      if (!immediate) {
        fn.apply(obj, args);
      }
      return timeout = null;
    };
    if (timeout) {
      clearTimeout(timeout);
    } else if (immediate) {
      fn.apply(obj, args);
    }
    return timeout = setTimeout(delayed, threshold);
  };
};

Utils.throttle = function(delay, fn) {
  var timer;
  if (delay === 0) {
    return fn;
  }
  delay *= 1000;
  timer = false;
  return function() {
    if (timer) {
      return;
    }
    timer = true;
    if (delay !== -1) {
      setTimeout((function() {
        return timer = false;
      }), delay);
    }
    return fn.apply(null, arguments);
  };
};


/*
Utils.memoize = (fn) -> ->
	args = Array::slice.call(arguments)
	hash = ""
	i = args.length
	currentArg = null
	while i--
		currentArg = args[i]
		hash += (if (currentArg is Object(currentArg)) then JSON.stringify(currentArg) else currentArg)
		fn.memoize or (fn.memoize = {})
	(if (hash of fn.memoize) then fn.memoize[hash] else fn.memoize[hash] = fn.apply(this, args))
 */

Utils.randomColor = function(alpha) {
  if (alpha == null) {
    alpha = 1.0;
  }
  return Color.random(alpha);
};

Utils.randomChoice = function(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

Utils.randomNumber = function(a, b) {
  if (a == null) {
    a = 0;
  }
  if (b == null) {
    b = 1;
  }
  return Utils.mapRange(Math.random(), 0, 1, a, b);
};

Utils.defineEnum = function(names, offset, geometric) {
  var Enum, i, j, name, _i, _len;
  if (names == null) {
    names = [];
  }
  if (offset == null) {
    offset = 0;
  }
  if (geometric == null) {
    geometric = 0;
  }
  Enum = {};
  for (i = _i = 0, _len = names.length; _i < _len; i = ++_i) {
    name = names[i];
    j = i;
    j = !offset ? j : j + offset;
    j = !geometric ? j : Math.pow(geometric, j);
    Enum[Enum[name] = j] = name;
  }
  return Enum;
};

Utils.stringify = function(obj) {
  try {
    if (Utils.isObject(obj)) {
      return JSON.stringify(obj);
    }
  } catch (_error) {
    "";
  }
  if (obj === null) {
    return "null";
  }
  if (obj === void 0) {
    return "undefined";
  }
  if (obj.toString) {
    return obj.toString();
  }
  return obj;
};

Utils.randomID = function() {
  return Math.floor(Math.random() * 100000 + 1);
};

Utils.uuid = function() {
  var chars, digit, output, r, random, _i;
  chars = "0123456789abcdefghijklmnopqrstuvwxyz".split("");
  output = new Array(36);
  random = 0;
  for (digit = _i = 1; _i <= 32; digit = ++_i) {
    if (random <= 0x02) {
      random = 0x2000000 + (Math.random() * 0x1000000) | 0;
    }
    r = random & 0xf;
    random = random >> 4;
    output[digit] = chars[digit === 19 ? (r & 0x3) | 0x8 : r];
  }
  return output.join("");
};

Utils.arrayFromArguments = function(args) {
  if (Utils.isArray(args[0])) {
    return args[0];
  }
  return Array.prototype.slice.call(args);
};

Utils.cycle = function() {
  var args, curr;
  args = Utils.arrayFromArguments(arguments);
  curr = -1;
  return function() {
    curr++;
    if (curr >= args.length) {
      curr = 0;
    }
    return args[curr];
  };
};

Utils.browser = function() {
  var M, tem, ua;
  ua = navigator.userAgent;
  tem = void 0;
  M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
  if (/trident/i.test(M[1])) {
    tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
    return {
      name: 'IE',
      version: tem[1] || ''
    };
  }
  if (M[1] === 'Chrome') {
    tem = ua.match(/\bOPR\/(\d+)/);
    if (tem !== null) {
      return {
        name: 'Opera',
        version: tem[1]
      };
    }
  }
  M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
  if ((tem = ua.match(/version\/(\d+)/i)) !== null) {
    M.splice(1, 1, tem[1]);
  }
  return {
    name: M[0],
    version: M[1]
  };
};

Utils.isWebKit = function() {
  return window.WebKitCSSMatrix !== void 0;
};

Utils.webkitVersion = function() {
  var regexp, result, version;
  version = -1;
  regexp = /AppleWebKit\/([\d.]+)/;
  result = regexp.exec(navigator.userAgent);
  if (result) {
    version = parseFloat(result[1]);
  }
  return version;
};

Utils.isChrome = function() {
  return /chrome/.test(navigator.userAgent.toLowerCase());
};

Utils.isSafari = function() {
  if (/safari/.test(navigator.userAgent.toLowerCase()) && !Utils.isChrome()) {
    return true;
  }
  return false;
};

Utils.isTouch = function() {
  return window.ontouchstart === null && window.ontouchmove === null && window.ontouchend === null;
};

Utils.isDesktop = function() {
  return Utils.deviceType() === "desktop";
};

Utils.isPhone = function() {
  return Utils.deviceType() === "phone";
};

Utils.isTablet = function() {
  return Utils.deviceType() === "tablet";
};

Utils.isMobile = function() {
  return Utils.isPhone() || Utils.isTablet();
};

Utils.isFileUrl = function(url) {
  if (!url) {
    return;
  }
  return Utils.startsWith(url, "file://");
};

Utils.isRelativeUrl = function(url) {
  return !/^([a-zA-Z]{1,8}:\/\/).*$/.test(url);
};

Utils.isLocalServerUrl = function(url) {
  return url.indexOf("127.0.0.1") !== -1 || url.indexOf("localhost") !== -1;
};

Utils.isLocalUrl = function(url) {
  if (Utils.isFileUrl(url)) {
    return true;
  }
  if (Utils.isLocalServerUrl(url)) {
    return true;
  }
  return false;
};

Utils.devicePixelRatio = function() {
  return window.devicePixelRatio;
};

Utils.isJP2Supported = function() {
  return Utils.isWebKit() && !Utils.isChrome();
};

Utils.isWebPSupported = function() {
  return Utils.isChrome();
};

Utils.deviceType = function() {
  if (/(tablet)|(iPad)|(Nexus 9)/i.test(navigator.userAgent)) {
    return "tablet";
  }
  if (/(mobi)/i.test(navigator.userAgent)) {
    return "phone";
  }
  return "desktop";
};

Utils.pathJoin = function() {
  return Utils.arrayFromArguments(arguments).join("/");
};

Utils.filenameFromURL = function(url) {
  return url.substring(url.lastIndexOf('/') + 1);
};

Utils.round = function(value, decimals) {
  var d;
  if (decimals == null) {
    decimals = 0;
  }
  d = Math.pow(10, decimals);
  return Math.round(value * d) / d;
};

Utils.clamp = function(value, a, b) {
  var max, min;
  min = Math.min(a, b);
  max = Math.max(a, b);
  if (value < min) {
    value = min;
  }
  if (value > max) {
    value = max;
  }
  return value;
};

Utils.mapRange = function(value, fromLow, fromHigh, toLow, toHigh) {
  return toLow + (((value - fromLow) / (fromHigh - fromLow)) * (toHigh - toLow));
};

Utils.modulate = function(value, rangeA, rangeB, limit) {
  var fromHigh, fromLow, result, toHigh, toLow;
  if (limit == null) {
    limit = false;
  }
  fromLow = rangeA[0], fromHigh = rangeA[1];
  toLow = rangeB[0], toHigh = rangeB[1];
  result = toLow + (((value - fromLow) / (fromHigh - fromLow)) * (toHigh - toLow));
  if (limit === true) {
    if (toLow < toHigh) {
      if (result < toLow) {
        return toLow;
      }
      if (result > toHigh) {
        return toHigh;
      }
    } else {
      if (result > toLow) {
        return toLow;
      }
      if (result < toHigh) {
        return toHigh;
      }
    }
  }
  return result;
};

Utils.pickRandomProperty = function(obj) {
  var count, prop, result;
  result = void 0;
  count = 0;
  for (prop in obj) {
    if (Math.random() < 1 / ++count) {
      result = prop;
    }
  }
  return result;
};

Utils.parseFunction = function(str) {
  var result;
  result = {
    name: "",
    args: []
  };
  if (Utils.endsWith(str, ")")) {
    result.name = str.split("(")[0];
    result.args = str.split("(")[1].split(",").map(function(a) {
      return a.replace(/\)+$/, '').trim();
    });
  } else {
    result.name = str;
  }
  return result;
};

__domComplete = [];

__domReady = false;

if (MagiX.__domReady) {
  __domReady = true;
}

if (typeof document !== "undefined" && document !== null) {
  document.onreadystatechange = function(event) {
    var f, _results;
    if (document.readyState === 'interactive') {
      __domReady = true;
      _results = [];
      while (__domComplete.length) {
        _results.push(f = __domComplete.shift()());
      }
      return _results;
    }
  };
}

Utils.domComplete = function(f) {
  if (__domReady) {
    return f();
  } else {
    return __domComplete.push(f);
  }
};

Utils.domCompleteCancel = function(f) {
  return __domComplete = Utils.without(__domComplete, f);
};

Utils.domValidEvent = function(element, eventName) {
  if (!eventName) {
    return;
  }
  if (eventName === "touchstart" || eventName === "touchmove" || eventName === "touchend") {
    return true;
  }
  return typeof element["on" + (eventName.toLowerCase())] !== "undefined";
};

Utils.domLoadScript = function(url, callback) {
  var script;
  if (App.isOffline()) {
    return;
  }
  script = document.createElement("script");
  script.type = "text/javascript";
  script.src = url;
  if (Utils.isFunction(callback)) {
    script.onreadystatechange = callback.bind(url);
    script.onload = callback.bind(url);
  }
  return Utils.domComplete(function() {
    return document.body.appendChild(script);
  });
};

Utils.insertCSS = function(css) {
  var styleElement;
  styleElement = document.createElement("style");
  styleElement.type = "text/css";
  styleElement.innerHTML = css;
  return Utils.domComplete(function() {
    var head;
    head = document.head || document.getElementsByTagName('head')[0];
    return head.appendChild(styleElement);
  });
};

Utils.loadCSS = function(paths) {
  var head, link, path, toImport, urlPathname, _i, _len, _results;
  if (!paths) {
    return;
  }
  if (Utils.isString(paths)) {
    paths = [paths];
  }
  toImport = [];
  _results = [];
  for (_i = 0, _len = paths.length; _i < _len; _i++) {
    path = paths[_i];
    if (path.indexOf('.css') === -1) {
      path = '/build/' + path + '.css';
      if (App.USE_PROJECT_PATH) {
        urlPathname = App.location.pathname.split('/');
        urlPathname.shift();
        urlPathname.shift();
        path = '/p/' + urlPathname[0] + '/' + path;
      }
    }
    if (App.__IS_DIRECT_PATH && Utils.startsWith(path, '/build/')) {
      path = '/' + window.__ID + path;
    }
    if (App.__BUILD) {
      path += '?b=' + App.__BUILD;
    }
    head = document.getElementsByTagName('head')[0];
    link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = path;
    link.media = 'all';
    _results.push(head.appendChild(link));
  }
  return _results;
};

Utils.pointDivide = function(point, fraction) {
  return point = {
    x: point.x / fraction,
    y: point.y / fraction
  };
};

Utils.pointAdd = function(pointA, pointB) {
  var point;
  return point = {
    x: pointA.x + pointB.x,
    y: pointA.y + pointB.y
  };
};

Utils.pointSubtract = function(pointA, pointB) {
  var point;
  return point = {
    x: pointA.x - pointB.x,
    y: pointA.y - pointB.y
  };
};

Utils.pointZero = function(args) {
  if (args == null) {
    args = {};
  }
  return Utils.defaults(args, {
    x: 0,
    y: 0
  });
};

Utils.pointMin = function() {
  var point, points;
  points = Utils.arrayFromArguments(arguments);
  return point = {
    x: Utils.min(points.map(function(size) {
      return size.x;
    })),
    y: Utils.min(points.map(function(size) {
      return size.y;
    }))
  };
};

Utils.pointMax = function() {
  var point, points;
  points = Utils.arrayFromArguments(arguments);
  return point = {
    x: Utils.max(points.map(function(size) {
      return size.x;
    })),
    y: Utils.max(points.map(function(size) {
      return size.y;
    }))
  };
};

Utils.pointDelta = function(pointA, pointB) {
  var delta;
  return delta = {
    x: pointB.x - pointA.x,
    y: pointB.y - pointA.y
  };
};

Utils.pointDistance = function(pointA, pointB) {
  var a, b;
  a = pointA.x - pointB.x;
  b = pointA.y - pointB.y;
  return Math.sqrt((a * a) + (b * b));
};

Utils.pointInvert = function(point) {
  return point = {
    x: 0 - point.x,
    y: 0 - point.y
  };
};

Utils.pointTotal = function(point) {
  return point.x + point.y;
};

Utils.pointAbs = function(point) {
  return point = {
    x: Math.abs(point.x),
    y: Math.abs(point.y)
  };
};

Utils.pointInFrame = function(point, frame) {
  if (point.x < Utils.frameGetMinX(frame) || point.x > Utils.frameGetMaxX(frame)) {
    return false;
  }
  if (point.y < Utils.frameGetMinY(frame) || point.y > Utils.frameGetMaxY(frame)) {
    return false;
  }
  return true;
};

Utils.pointCenter = function(pointA, pointB) {
  var point;
  return point = {
    x: (pointA.x + pointB.x) / 2,
    y: (pointA.y + pointB.y) / 2
  };
};

Utils.pointAngle = function(pointA, pointB) {
  return Math.atan2(pointB.y - pointA.y, pointB.x - pointA.x) * 180 / Math.PI;
};

Utils.sizeZero = function(args) {
  if (args == null) {
    args = {};
  }
  return Utils.defaults(args, {
    width: 0,
    height: 0
  });
};

Utils.sizeMin = function() {
  var size, sizes;
  sizes = Utils.arrayFromArguments(arguments);
  return size = {
    width: Utils.min(sizes.map(function(size) {
      return size.width;
    })),
    height: Utils.min(sizes.map(function(size) {
      return size.height;
    }))
  };
};

Utils.sizeMax = function() {
  var size, sizes;
  sizes = Utils.arrayFromArguments(arguments);
  return size = {
    width: Utils.max(sizes.map(function(size) {
      return size.width;
    })),
    height: Utils.max(sizes.map(function(size) {
      return size.height;
    }))
  };
};

Utils.rectZero = function(args) {
  if (args == null) {
    args = {};
  }
  return Utils.defaults(args, {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  });
};

Utils.parseRect = function(args) {
  if (Utils.isArray(args) && Utils.isNumber(args[0])) {
    if (args.length === 1) {
      return Utils.parseRect({
        top: args[0]
      });
    }
    if (args.length === 2) {
      return Utils.parseRect({
        top: args[0],
        right: args[1]
      });
    }
    if (args.length === 3) {
      return Utils.parseRect({
        top: args[0],
        right: args[1],
        bottom: args[2]
      });
    }
    if (args.length === 4) {
      return Utils.parseRect({
        top: args[0],
        right: args[1],
        bottom: args[2],
        left: args[3]
      });
    }
  }
  if (Utils.isArray(args) && Utils.isObject(args[0])) {
    return args[0];
  }
  if (Utils.isObject(args)) {
    return args;
  }
  return {};
};

Utils.frameGetMinX = function(frame) {
  return frame.x;
};

Utils.frameSetMinX = function(frame, value) {
  return frame.x = value;
};

Utils.frameGetMidX = function(frame) {
  if (frame.width === 0) {
    return 0;
  } else {
    return frame.x + (frame.width / 2.0);
  }
};

Utils.frameSetMidX = function(frame, value) {
  return frame.x = frame.width === 0 ? 0 : value - (frame.width / 2.0);
};

Utils.frameGetMaxX = function(frame) {
  if (frame.width === 0) {
    return 0;
  } else {
    return frame.x + frame.width;
  }
};

Utils.frameSetMaxX = function(frame, value) {
  return frame.x = frame.width === 0 ? 0 : value - frame.width;
};

Utils.frameGetMinY = function(frame) {
  return frame.y;
};

Utils.frameSetMinY = function(frame, value) {
  return frame.y = value;
};

Utils.frameGetMidY = function(frame) {
  if (frame.height === 0) {
    return 0;
  } else {
    return frame.y + (frame.height / 2.0);
  }
};

Utils.frameSetMidY = function(frame, value) {
  return frame.y = frame.height === 0 ? 0 : value - (frame.height / 2.0);
};

Utils.frameGetMaxY = function(frame) {
  if (frame.height === 0) {
    return 0;
  } else {
    return frame.y + frame.height;
  }
};

Utils.frameSetMaxY = function(frame, value) {
  return frame.y = frame.height === 0 ? 0 : value - frame.height;
};

Utils.frameZero = function(args) {
  if (args == null) {
    args = {};
  }
  return Utils.defaults(args, {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  });
};

Utils.frameSize = function(frame) {
  var size;
  return size = {
    width: frame.width,
    height: frame.height
  };
};

Utils.framePoint = function(frame) {
  var point;
  return point = {
    x: frame.x,
    y: frame.y
  };
};

Utils.pointsFromFrame = function(frame) {
  var corner1, corner2, corner3, corner4, maxX, maxY, minX, minY;
  minX = Utils.frameGetMinX(frame);
  maxX = Utils.frameGetMaxX(frame);
  minY = Utils.frameGetMinY(frame);
  maxY = Utils.frameGetMaxY(frame);
  corner1 = {
    x: minX,
    y: minY
  };
  corner2 = {
    x: minX,
    y: maxY
  };
  corner3 = {
    x: maxX,
    y: maxY
  };
  corner4 = {
    x: maxX,
    y: minY
  };
  return [corner1, corner2, corner3, corner4];
};

Utils.frameFromPoints = function(points) {
  var frame, maxX, maxY, minX, minY, xValues, yValues;
  xValues = Utils.pluck(points, "x");
  yValues = Utils.pluck(points, "y");
  minX = Utils.min(xValues);
  maxX = Utils.max(xValues);
  minY = Utils.min(yValues);
  maxY = Utils.max(yValues);
  return frame = {
    x: minX,
    y: minY,
    width: maxX - minX,
    height: maxY - minY
  };
};

Utils.pixelAlignedFrame = function(frame) {
  var result;
  return result = {
    width: Math.round(frame.width + (frame.x % 1)),
    height: Math.round(frame.height + (frame.y % 1)),
    x: Math.round(frame.x),
    y: Math.round(frame.y)
  };
};

Utils.frameMerge = function() {
  var frame, frames;
  frames = Utils.arrayFromArguments(arguments);
  frame = {
    x: Utils.min(frames.map(Utils.frameGetMinX)),
    y: Utils.min(frames.map(Utils.frameGetMinY))
  };
  frame.width = Utils.max(frames.map(Utils.frameGetMaxX)) - frame.x;
  frame.height = Utils.max(frames.map(Utils.frameGetMaxY)) - frame.y;
  return frame;
};

Utils.framePointForOrigin = function(frame, originX, originY) {
  return frame = {
    x: frame.x + (originX * frame.width),
    y: frame.y + (originY * frame.height),
    width: frame.width,
    height: frame.height
  };
};

Utils.frameInset = function(frame, inset) {
  if (Utils.isNumber(inset)) {
    inset = {
      top: inset,
      right: inset,
      bottom: inset,
      left: inset
    };
  }
  return frame = {
    x: frame.x + inset.left,
    y: frame.y + inset.top,
    width: frame.width - inset.left - inset.right,
    height: frame.height - inset.top - inset.bottom
  };
};

Utils.frameSortByAbsoluteDistance = function(point, frames, originX, originY) {
  var distance;
  if (originX == null) {
    originX = 0;
  }
  if (originY == null) {
    originY = 0;
  }
  distance = function(frame) {
    var result;
    result = Utils.pointDelta(point, Utils.framePointForOrigin(frame, originX, originY));
    result = Utils.pointAbs(result);
    result = Utils.pointTotal(result);
    return result;
  };
  return frames.sort(function(a, b) {
    return distance(a) - distance(b);
  });
};

Utils.pointInPolygon = function(point, vs) {
  var i, inside, intersect, j, x, xi, xj, y, yi, yj;
  x = point[0];
  y = point[1];
  inside = false;
  i = 0;
  j = vs.length - 1;
  while (i < vs.length) {
    xi = vs[i][0];
    yi = vs[i][1];
    xj = vs[j][0];
    yj = vs[j][1];
    intersect = ((yi > y && y !== yj) && yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi;
    if (intersect) {
      inside = !inside;
    }
    j = i++;
  }
  return inside;
};

Utils.frameCenterPoint = function(frame) {
  var point;
  return point = {
    x: Utils.frameGetMidX(frame),
    y: Utils.frameGetMidY(frame)
  };
};

Utils.rotationNormalizer = function() {
  var lastValue;
  lastValue = null;
  return (function(_this) {
    return function(value) {
      var diff, maxDiff, nTimes;
      if (lastValue == null) {
        lastValue = value;
      }
      diff = lastValue - value;
      maxDiff = Math.abs(diff) + 180;
      nTimes = Math.floor(maxDiff / 360);
      if (diff < 180) {
        value -= nTimes * 360;
      }
      if (diff > 180) {
        value += nTimes * 360;
      }
      lastValue = value;
      return value;
    };
  })(this);
};

Utils.inspectObjectType = function(item) {
  var className, extract;
  if ((item._kind != null) && item._kind !== "Object") {
    return item._kind;
  }
  extract = function(str) {
    var match, regex;
    if (!str) {
      return null;
    }
    regex = /\[object (\w+)\]/;
    match = regex.exec(str);
    if (match) {
      return match[1];
    }
    return null;
  };
  if (item.toString) {
    className = extract(item.toString());
    if (className) {
      return className;
    }
  }
  return "Object";
};

Utils.inspect = function(item, max, l) {
  var code, limit, objectInfo, objectType, stuff;
  if (max == null) {
    max = 5;
  }
  if (l == null) {
    l = 0;
  }
  if (item === null) {
    return "null";
  }
  if (item === void 0) {
    return "undefined";
  }
  if (Utils.isFunction(item.toInspect)) {
    return item.toInspect();
  }
  if (Utils.isString(item)) {
    return "\"" + item + "\"";
  }
  if (Utils.isNumber(item)) {
    return "" + item;
  }
  if (Utils.isFunction(item)) {
    code = item.toString().slice("function ".length).replace(/\n/g, "").replace(/\s+/g, " ");
    limit = 50;
    if (code.length > limit && l > 0) {
      code = "" + (Utils.trimRight(code.slice(0, +limit + 1 || 9e9))) + "… }";
    }
    return "<Function " + code + ">";
  }
  if (Utils.isArray(item)) {
    if (l > max) {
      return "[...]";
    }
    return "[" + item.map(function(i) {
      return Utils.inspect(i, max, l + 1);
    }).join(", ") + "]";
  }
  if (Utils.isObject(item)) {
    objectType = Utils.inspectObjectType(item);
    if (/HTML\w+?Element/.test(objectType)) {
      return "<" + objectType + ">";
    }
    if (l > max) {
      objectInfo = "{...}";
    } else {
      objectInfo = [];
      for (stuff in item) {
        objectInfo.push("" + stuff + ":" + (Utils.inspect(item[stuff], max, l + 1).toString()));
      }
      objectInfo = "{" + objectInfo.join(", ") + "}";
    }
    if (objectType === "Object") {
      return objectInfo;
    }
    return "<" + objectType + " " + objectInfo + ">";
  }
  return "" + item;
};

Utils.formatBytes = function(bytes, decimals) {
  var dm, i, k, sizes;
  if (bytes === 0) {
    return '0 Byte';
  }
  k = 1000;
  dm = decimals + 1 || 3;
  sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};
