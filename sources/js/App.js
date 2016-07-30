var App, Before, Fonts, Routes, Title, WebFontConfig, onSwipeEnd, onSwipeStart, url, _googleFont;

App = window;

App._kind = 'App';

App._ee = new EventEmitter();

App._pages_counter = 0;

window.center = 'center';

window.left = 'left';

window.right = 'right';

window.top = 'top';

window.bottom = 'bottom';

window.auto = 'auto';

window.inlineBlock = 'inline-block';

window.block = 'block';

window.inline = 'inline';

window.none = 'none';

window.fit = 'fit';

window.fitCenter = 'fitCenter';

window.fill = 'fill';

window.fillWidth = 'fillWidth';

window.fillHeight = 'fillHeight';

window.fillHeightCenter = 'fillHeightCenter';

App._responsives = {};

WebFontConfig = null;

_googleFont = [];

window.__IS_DIRECT_PATH = false;

if (window.__ID && window.__ID.length === 8) {
  url = App.location.pathname.split('/');
  url.shift();
  if (url[0] === window.__ID) {
    window.__IS_DIRECT_PATH = true;
  }
}

Before = void 0;

Routes = function(routes, beforeFn) {
  if (beforeFn) {
    window.Before = beforeFn;
  }
  return App.routes = routes;
};

Fonts = function(fonts) {
  return App.fonts = fonts;
};

Title = function(title) {
  return App.title = title;
};

App.define = function(name, args) {
  return Object.defineProperty(this, name, args);
};

App.emit = function(name, value) {
  if (!this._wrapper) {
    return;
  }
  return this._wrapper.emit(name, value);
};

App.once = function(eventName, listener) {
  if (!this._wrapper) {
    return;
  }
  return this._wrapper.once(eventName, listener);
};

App.on = function(eventName, listener) {
  if (!this._wrapper) {
    return;
  }
  return this._wrapper.on(eventName, listener);
};

App.off = function(eventName, listener) {
  if (!this._wrapper) {
    return;
  }
  return this._wrapper.off(eventName, listener);
};

App.reset = function() {
  this.id = Utils.randomID();
  App.element = void 0;
  this._routes = {};
  App._page = null;
  this.pages = [];
  App._responsives = {};
  this._fonts = null;
  this._fontsCollection = [];
  if (!this.DefaultContext) {
    this.DefaultContext = new Context({
      name: 'Default',
      backgroundColor: 'white'
    });
    this.CurrentContext = this.DefaultContext;
  } else {
    if (this._wrapper) {
      this._wrapper.destroy(true);
    }
    this.CurrentContext.reset();
  }
  Event.wrap(window).addEventListener(Event.Abort, function(e) {
    return this.emit(Event.Abort, e);
  });
  Event.wrap(window).addEventListener(Event.Quit, function(e) {
    this.emit(Event.Quit, e);
  });
  Event.wrap(window).addEventListener(Event.Error, function(e) {
    return this.emit(Event.Error, e);
  });
  Event.wrap(window).addEventListener(Event.HashChange, function(e) {
    return this.emit(Event.HashChange, e);
  });
  Event.wrap(window).addEventListener(Event.Load, function(e) {
    return this.emit(Event.Load, e);
  });
  Event.wrap(window).addEventListener(Event.Resize, function(e) {
    return this.emit(Event.Resize, e);
  });
  Event.wrap(window).addEventListener(Event.Scroll, function(e) {
    return this.emit(Event.Scroll, e);
  });
  Event.wrap(window).addEventListener(Event.Show, function(e) {
    return this.emit(Event.Show, e);
  });
  Event.wrap(window).addEventListener(Event.Close, function(e) {
    return this.emit(Event.Close, e);
  });
  Event.wrap(window).addEventListener(Event.Blur, function(e) {
    return this.emit(Event.Blur, e);
  });
  Event.wrap(window).addEventListener(Event.Focus, function(e) {
    return this.emit(Event.Focus, e);
  });
  return Event.wrap(window).addEventListener(Event.HistoryChanged, function(e) {
    return this.emit(Event.HistoryChanged, e);
  });
};

App.run = function(callback) {
  var loaded;
  loaded = function(event) {
    this.reset();
    Defaults.setup();
    this._element = document.createElement('div');
    this._element.setAttribute('id', 'OrbeApp::' + App.id);
    this._element.style.background = 'white';
    this._element.style.width = '100%';
    this._element.style.height = '100%';
    this._element.style.position = 'fixed';
    this._element.style.top = '0';
    this._element.style.left = '0';
    this._element.style.right = '0';
    this._element.style.bottom = '0';
    this._element.style.webkitFontSmoothing = 'antialiased';
    this.CurrentContext._element.appendChild(this._element);
    this._wrapper = new View({
      width: '100%',
      height: '100%'
    });
    this._element.appendChild(this._wrapper._element);
    this._wrapper._element.setAttribute('id', 'OrbeAppWrapper::' + this._wrapper.id);
    App.on(Event.HistoryChanged, function(e) {
      if (e.state) {
        return App._routing();
      }
    });
    if (Utils.isSafari()) {
      history.replaceState({}, '');
    }
    App._updateResponsivesStates();
    App.onResize(function() {
      return App._updateResponsivesStates();
    });
    if (callback) {
      this.emit(Event.Run);
      callback();
    }
  };
  if (__domReady) {
    loaded();
  } else {
    Utils.domComplete(loaded);
  }
};

App.setup = function() {
  this.Loop = new AnimationLoop();
  Utils.domComplete(this.Loop.start);
  this.GestureInputRecognizer = new GestureRecognizer();
  this.define('selected', {
    configurable: true,
    get: function() {
      return this.getSelection().toString();
    }
  });
  this.define('routes', {
    configurable: true,
    get: function() {
      return this._routes;
    },
    set: function(routes) {
      if (!Utils.isObject(routes)) {
        throw new Error('App: routes must be in an object.');
        return;
      }
      this._routes = routes;
      App._routing();
    }
  });
  this.define('page', {
    configurable: true,
    get: function() {
      return App._page;
    },
    set: function(page) {
      if (App._page) {
        App.removePage(App._page);
        App._page = null;
      }
      this.addPage(page);
    }
  });
  this.define('pages', {
    configurable: true,
    get: function() {
      return App._wrapper.children;
    }
  });
  this.define('title', {
    configurable: true,
    get: function() {
      return document.title;
    },
    set: function(value) {
      document.title = value;
    }
  });
  this.define('fonts', {
    configurable: true,
    get: function() {
      return this._fonts;
    },
    set: function(fonts) {
      var google_previous_call;
      this._fonts = fonts;
      google_previous_call = Utils.clone(this._googleFont);
      this._googleFont = [];
      this._updateFonts(this._fonts);
      if (App._fontsCollection.length > 0) {
        App.fontName = App._fontsCollection[0].name;
      }
      if (Utils.isEqual(google_previous_call, this._googleFont)) {
        return;
      }
      if (this._googleFont.length > 0) {
        WebFontConfig = {
          google: {
            families: App._googleFont
          }
        };
        return Utils.domLoadScript(('https:' === document.location.protocol ? 'https' : 'http') + '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js');
      }
    }
  });
  this.define('fontName', {
    configurable: true,
    get: function() {
      return this._element.style.fontFamily;
    },
    set: function(value) {
      this._element.style.fontFamily = value + ', sans-serif';
    }
  });
  this.define('fontFamily', {
    configurable: true,
    get: function() {
      return this.fontName;
    },
    set: function(value) {
      this.fontName = value;
    }
  });
  this.define('fontWeight', {
    configurable: true,
    get: function() {
      return this._element.style.fontWeight;
    },
    set: function(value) {
      this._element.style.fontFamily = value;
    }
  });
  this.define('fontSize', {
    configurable: true,
    get: function() {
      return this._element.style.fontSize;
    },
    set: function(value) {
      this._element.style.fontSize = value;
    }
  });
  this.define('textColor', {
    configurable: true,
    get: function() {
      return this._element.style.color;
    },
    set: function(value) {
      this._element.style.color = value;
    }
  });
  this.define('width', {
    configurable: true,
    get: function() {
      return this.innerWidth;
    }
  });
  this.define('height', {
    configurable: true,
    get: function() {
      return this.innerHeight;
    }
  });
  this.define('size', {
    configurable: true,
    get: function() {
      return {
        width: this.width,
        height: this.height
      };
    }
  });
  this.define('frame', {
    configurable: true,
    get: function() {
      return {
        x: 0,
        y: 0,
        width: this.width,
        height: this.height
      };
    }
  });
  this.css = Utils.insertCSS;
  this.go = function(url, normal) {
    if (url === 'main' || url === 'index') {
      url = '';
    }
    if (!Utils.startsWith(url, '/')) {
      url = '/' + url;
    }
    if (window.USE_URL) {
      window.USE_URL = url;
    }
    if (normal !== true) {
      url = Utils.parseURL(url);
    }
    if (history.pushState) {
      history.pushState({}, null, url);
    } else {
      say('App: your browser does not support the HTML5 pushState method.');
    }
    App._routing();
  };
  this.updateURL = function(url, normal) {
    if (url === 'main' || url === 'index') {
      url = '';
    }
    if (!Utils.startsWith(url, '/')) {
      url = '/' + url;
    }
    if (window.USE_URL) {
      window.USE_URL = url;
    }
    if (normal !== true) {
      url = Utils.parseURL(url);
    }
    if (history.pushState) {
      history.pushState({}, null, url);
    } else {
      say('App: your browser does not support the HTML5 pushState method.');
    }
  };
  this.pathname = function() {
    var urlPathname;
    urlPathname = void 0;
    if (App.USE_URL) {
      urlPathname = App.USE_URL.split('/');
    } else {
      urlPathname = App.location.pathname.split('/');
    }
    urlPathname.shift();
    if (window.__IS_DIRECT_PATH) {
      urlPathname.shift();
      if (urlPathname.length === 0) {
        urlPathname.push('');
      }
    } else if (App.USE_PROJECT_PATH !== void 0) {
      urlPathname.shift();
      urlPathname.shift();
      if (urlPathname.length === 0) {
        urlPathname.push('');
      }
    }
    return urlPathname;
  };
  this.parameters = function() {
    var query, result;
    query = window.location.search.substr(1);
    result = {};
    query.split('&').forEach(function(part) {
      var item;
      item = part.split('=');
      if (item[0] !== '') {
        result[item[0]] = decodeURIComponent(item[1]);
      }
    });
    return result;
  };
  this.hash = function() {
    return location.hash.replace('#', '');
  };
  this.addPage = function(page) {
    var child, _i, _len, _ref;
    App._responsives = {};
    _ref = App._wrapper.children;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      child = _ref[_i];
      if (child._kind && child._kind === 'Page') {
        child.parent = null;
      }
    }
    if (App._page) {
      App._page.parent = null;
    }
    if (page._kind && page._kind === 'Page') {
      App._page = page;
      return App._page.parent = this;
    }
  };
  this.removePage = function(page) {
    return page.parent = null;
  };
  this.enterFullscreen = function() {
    if (!this.page) {
      return false;
    }
    return this.page.enterFullscreen();
  };
  this.exitFullscreen = function() {
    if (!this.page) {
      return false;
    }
    return this.page.exitFullscreen();
  };
  this.isFullscreen = function() {
    if (!this.page) {
      return false;
    }
    return this.page.isFullscreen();
  };
  this.inWebView = function() {
    var e;
    try {
      return window.self !== window.top;
    } catch (_error) {
      e = _error;
      return true;
    }
  };
  this.isOnline = function() {
    return navigator.onLine;
  };
  this.isOffline = function() {
    return !navigator.onLine;
  };
};

App.setup();


/*
// Is the battery charging? Return boolean.
App.battery.charging

// Return the battery level in percent
App.battery.level

// Return the battery charging time in seconds
App.battery.chargingTime

// Return the battery discharging time in seconds
App.battery.dischargingTime

Event:

Change.BatteryCharging
App.on Change.BatteryCharging (charging) ->

Change.BatteryLevel
App.on Change.BatteryLevel (charging) ->

Change.ChargingTime
App.on Change.ChargingTime (charging) ->

Change.DischargingTime
App.on Change.DischargingTime (charging) ->
 */

App.battery = false;

if (navigator.getBattery) {
  navigator.getBattery().then(function(battery) {
    App.battery = battery;
    battery.addEventListener('chargingchange', function() {
      App.emit('change:batteryCharging', battery.charging);
    });
    battery.addEventListener('levelchange', function() {
      App.emit('change:batteryLevel', battery.level);
    });
    battery.addEventListener('chargingtimechange', function() {
      App.emit('change:chargingTime', battery.chargingTime);
    });
    battery.addEventListener('dischargingtimechange', function() {
      App.emit('change:dischargingTime', battery.dischargingTime);
    });
  });
}

App.vibrate = function(pattern) {
  if (!navigator.vibrate) {
    return false;
  }
  window.navigator.vibrate(pattern);
};


/*
Event will return
* acceleration Read only	
The acceleration of the device. This value has taken into account the effect 
of gravity and removed it from the figures. This value may not exist if the hardware doesn't know 
how to remove gravity from the acceleration data.

	acceleration.x Read only
	The amount of acceleration along the X axis. Read only.
	acceleration.y Read only
	The amount of acceleration along the Y axis. Read only.
	acceleration.z Read only
	The amount of acceleration along the Z axis. Read only.

* accelerationIncludingGravity Read only	
The acceleration of the device. This value includes the effect of gravity, and may be the 
only value available on devices that don't have a gyroscope to allow them to properly 
remove gravity from the data.

* interval Read only
* The interval, in milliseconds, at which the DeviceMotionEvent is fired. 
The next event will be fired in approximately this amount of time.

* rotationRate Read only
The rates of rotation of the device about all three axes.

	rotationRate.alpha Read only
	The amount of rotation around the Z axis, in degrees per second.
	rotationRate.beta Read only
	The amount of rotation around the X axis, in degrees per second.
	rotationRate.gamma Read only
	The amount of rotation around the Y axis, in degrees per second.

// App.on Change.DeviceMotion (event)->
	x = event.acceleration.x;
		y = event.acceleration.y;
		z = event.acceleration.z;

		 * Do something awesome.
 */


/*
// Use to detecting device orientation

event.alpha value represents the motion of the device around the z axis, 
represented in degrees with values ranging from 0 to 360.

event.beta value represents the motion of the device around the x axis, 
represented in degrees with values ranging from -180 to 180. 
This represents a front to back motion of the device.

event.gamma value represents the motion of the device around the y axis, 
represented in degrees with values ranging from -90 to 90. This represents a left to right motion of the device.

// App.on Change.DeviceOrientation, (event) ->
	absolute = event.absolute
	alpha		= event.alpha
	beta		 = event.beta
	gamma		= event.gamma
 */


/*
Event fired when the user invoked the particular clipboard operation (either cut, copy or paste).
App.on Event.Cut (event) ->
App.on Event.Copy (event) ->
App.on Event.Paste (event) ->
 */


/* 
App.clipboard.cut();
App.clipboard.copy();

Examples:

[var myButton = new Button({
	text: “Copy”,
	parent: page,
	click: function() {
		App.clipboard.copy(“something to copy”);
	}
});

var myTextField = new TextField({
	text: "something to copy",
	parent: page,
	click: function() {
		this.select();
		App.clipboard.copy();
	}
});
 */

App.clipboard = {
  'cut': function() {
    document.execCommand('Cut');
  },
  'copy': function(text) {
    var detectIE, textField;
    detectIE = function() {
      var edge, msie, rv, trident, ua;
      ua = window.navigator.userAgent;
      msie = ua.indexOf('MSIE ');
      if (msie > 0) {
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
      }
      trident = ua.indexOf('Trident/');
      if (trident > 0) {
        rv = ua.indexOf('rv:');
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
      }
      edge = ua.indexOf('Edge/');
      if (edge > 0) {
        return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
      }
      return false;
    };
    if (text) {
      document.execCommand('Copy');
      return;
    }
    if (detectIE()) {
      window.clipboardData.setData('Text', text);
    }
    textField = document.createElement('textarea');
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    if (window.clipboardData) {
      window.clipboardData.setData('Text', copytext);
    }
    textField.remove();
  }
};

App.toInspect = (function(_this) {
  return function() {
    return "<App id:" + (_this.id || null) + ">";
  };
})(this);

App._routing = function() {
  var e, err, fireRoute, pageURL, path, regex, routeFound, routeName, test;
  path = this.pathname();
  fireRoute = function(name) {
    var routeFound, routeReturned, stop;
    if (window.Before && typeof window.Before === 'function') {
      stop = window.Before();
      if (stop === false) {
        return;
      }
    }
    routeFound = true;
    routeReturned = App._routes[name]();
    if (routeReturned && routeReturned._kind === 'Page') {
      App.page = routeReturned;
    }
  };
  if (Utils.isFileUrl(App.location.href)) {
    err = 'Error: Project opened as a local file. Please set index.html as root / using a virtual server to use Routes.';
    alert(err);
    throw Error(err);
    return;
  }
  pageURL = path[0];
  routeFound = false;
  for (routeName in this._routes) {
    if (Utils.startsWith(routeName, '/')) {
      pageURL = '/' + path[0];
    }
    if (Utils.startsWith(routeName, 'match:')) {
      routeName = routeName.replace('match:', '');
      try {
        regex = new RegExp(routeName);
        test = regex.test(pageURL);
        if (!test) {
          test = regex.test('/' + path.join('/'));
        }
        if (test) {
          fireRoute('match:' + routeName);
          return;
        }
      } catch (_error) {
        e = _error;
        console.log('App: Invalid regex, ' + routeName);
      }
    } else if (routeName === pageURL || (pageURL === '' && (routeName === 'main' || routeName === 'index' || routeName === 'Main'))) {
      fireRoute(routeName);
      return;
    }
  }
  if (!routeFound) {
    if (this._routes.hasOwnProperty('default')) {
      fireRoute('default');
    } else if (this._routes.hasOwnProperty('404')) {
      fireRoute('404');
    } else if (this._routes.hasOwnProperty('Default')) {
      fireRoute('Default');
    } else if (this._routes.hasOwnProperty('defaults')) {
      fireRoute('defaults');
    } else if (this._routes.hasOwnProperty('Defaults')) {
      fireRoute('Defaults');
    }
  }
};

App._updateFonts = function(fonts) {
  var font, fontDetector, fontName, i, parseGoogleFontObject, _results;
  parseGoogleFontObject = function(googleObj) {
    if (!googleObj.name) {
      return '';
    } else {
      googleObj._name = googleObj.name.split(' ').join('+');
    }
    if (!googleObj.weight) {
      googleObj.weight = '400';
    }
    if (!googleObj.sets) {
      googleObj.sets = 'latin';
    }
    return googleObj._name + ':' + googleObj.weight + ':' + googleObj.sets;
  };
  if (!fonts) {
    return;
  }
  fontDetector = new this._fontDetector;
  if (Utils.isString(fonts)) {
    fonts = [fonts];
  }
  if (Utils.isArray(fonts)) {
    i = 0;
    _results = [];
    while (i < fonts.length) {
      if (typeof fonts[i] === 'string') {
        fontName = fonts[i].replace(/\s+/g, '');
        font = {
          name: fonts[i]
        };
        this._fonts[fontName] = fonts[i];
        this._fontsCollection.push(font);
        if (!fontDetector.detect(fonts[i])) {
          this._googleFont.push(parseGoogleFontObject(font));
        }
      }
      if (Utils.isObject(fonts[i]) && fonts[i].name) {
        fontName = fonts[i].name.replace(/\s+/g, '');
        font = fonts[i];
        this._fonts[fontName] = fonts[i].name;
        this._fontsCollection.push(font);
        if (!fontDetector.detect(fonts[i].name)) {
          this._googleFont.push(parseGoogleFontObject(fonts[i]));
        }
      }
      _results.push(i++);
    }
    return _results;
  } else if (Utils.isObject(fonts) && fonts.name) {
    fontName = fonts.name.replace(/\s+/g, '');
    this._fonts[fontName] = fonts.name;
    this._fontsCollection.push(fonts);
    if (!fontDetector.detect(fonts.name)) {
      return this._googleFont.push(parseGoogleFontObject(fonts));
    }
  }
};


/**
 * JavaScript code to detect available availability of a
 * particular font in a browser using JavaScript and CSS.
 *
 * Author : Lalit Patel
 * Website: http://www.lalit.org/lab/javascript-css-font-detect/
 * License: Apache Software License 2.0
 *					http://www.apache.org/licenses/LICENSE-2.0
 * Version: 0.15 (21 Sep 2009)
 *					Changed comparision font to default from sans-default-default,
 *					as in FF3.0 font of child element didn't fallback
 *					to parent element if the font is missing.
 * Version: 0.2 (04 Mar 2012)
 *					Comparing font against all the 3 generic font families ie,
 *					'monospace', 'sans-serif' and 'sans'. If it doesn't match all 3
 *					then that font is 100% not available in the system
 * Version: 0.3 (24 Mar 2012)
 *					Replaced sans with serif in the list of baseFonts

/**
 * Usage: d = new Detector();
 *				d.detect('font name');
 */

App._fontDetector = function() {
  var baseFonts, defaultHeight, defaultWidth, detect, h, index, s, testSize, testString;
  baseFonts = ['monospace', 'sans-serif', 'serif'];
  testString = 'mmmmmmmmmmlli';
  testSize = '72px';
  h = document.getElementsByTagName('body')[0];
  s = document.createElement('span');
  detect = function(font) {
    var detected, index, matched;
    detected = false;
    for (index in baseFonts) {
      s.style.fontFamily = font + ',' + baseFonts[index];
      h.appendChild(s);
      matched = s.offsetWidth !== defaultWidth[baseFonts[index]] || s.offsetHeight !== defaultHeight[baseFonts[index]];
      h.removeChild(s);
      detected = detected || matched;
    }
    return detected;
  };
  s.style.fontSize = testSize;
  s.innerHTML = testString;
  defaultWidth = {};
  defaultHeight = {};
  for (index in baseFonts) {
    s.style.fontFamily = baseFonts[index];
    h.appendChild(s);
    defaultWidth[baseFonts[index]] = s.offsetWidth;
    defaultHeight[baseFonts[index]] = s.offsetHeight;
    h.removeChild(s);
  }
  this.detect = detect;
};

App.onFocus = function(cb) {
  return this.on(Event.Focus, cb);
};

App.onResignFocus = function(cb) {
  return this.on(Event.Blur, cb);
};

App.onBlur = function(cb) {
  return this.on(Event.Blur, cb);
};

App.onResize = function(cb) {
  return this.on(Event.Resize, cb);
};

App.onAbort = function(cb) {
  return this.on(Event.Abort, cb);
};

App.onQuit = function(cb) {
  return this.on(Event.Quit, cb);
};

App.onHashChange = function(cb) {
  return this.on(Event.HashChange, cb);
};

App.onLoad = function(cb) {
  return this.on(Event.Load, cb);
};

App.onLoaded = function(cb) {
  return this.on(Event.Load, cb);
};

App.onDone = function(cb) {
  return this.on(Event.Loaded, cb);
};

App.onShow = function(cb) {
  return this.on(Event.Show, cb);
};

App.onClose = function(cb) {
  return this.on(Event.Close, cb);
};

App.onClick = function(cb) {
  return this.on(Event.Click, cb);
};

App.onDoubleClick = function(cb) {
  return this.on(Event.DoubleClick, cb);
};

App.onIn = function(cb) {
  return this.on(Event.In, cb);
};

App.onOut = function(cb) {
  return this.on(Event.Out, cb);
};

App.onDown = function(cb) {
  return this.on(Event.Down, cb);
};

App.onOver = function(cb) {
  return this.on(Event.Over, cb);
};

App.onUp = function(cb) {
  return this.on(Event.Up, cb);
};

App.onMove = function(cb) {
  return this.on(Event.Move, cb);
};

App.onRightClick = function(cb) {
  return this.on(Event.RightClick, cb);
};

App.onMouseIn = function(cb) {
  return this.on(Event.MouseIn, cb);
};

App.onMouseUp = function(cb) {
  return this.on(Event.MouseUp, cb);
};

App.onMouseDown = function(cb) {
  return this.on(Event.MouseDown, cb);
};

App.onMouseOver = function(cb) {
  return this.on(Event.MouseOver, cb);
};

App.onMouseOut = function(cb) {
  return this.on(Event.MouseOut, cb);
};

App.onMouseMove = function(cb) {
  return this.on(Event.MouseMove, cb);
};

App.onMouseWheel = function(cb) {
  return this.on(Event.MouseWheel, cb);
};

App.onScroll = function(cb) {
  return this.on(Event.Scroll, cb);
};

App.onTouchStart = function(cb) {
  return this.on(Event.TouchStart, cb);
};

App.onTouchEnd = function(cb) {
  return this.on(Event.TouchEnd, cb);
};

App.onTouchMove = function(cb) {
  return this.on(Event.TouchMove, cb);
};

App.onTap = function(cb) {
  return this.on(Event.Tap, cb);
};

App.onTapStart = function(cb) {
  return this.on(Event.TapStart, cb);
};

App.onTapEnd = function(cb) {
  return this.on(Event.TapEnd, cb);
};

App.onDoubleTap = function(cb) {
  return this.on(Event.DoubleTap, cb);
};

App.onForceTap = function(cb) {
  return this.on(Event.ForceTap, cb);
};

App.onForceTapChange = function(cb) {
  return this.on(Event.ForceTapChange, cb);
};

App.onForceTapStart = function(cb) {
  return this.on(Event.ForceTapStart, cb);
};

App.onForceTapEnd = function(cb) {
  return this.on(Event.ForceTapEnd, cb);
};

App.onLongPress = function(cb) {
  return this.on(Event.LongPress, cb);
};

App.onLongPressStart = function(cb) {
  return this.on(Event.LongPressStart, cb);
};

App.onLongPressEnd = function(cb) {
  return this.on(Event.LongPressEnd, cb);
};

App.onSwipe = function(cb) {
  return this.on(Event.Swipe, cb);
};

onSwipeStart = function(cb) {
  return this.on(Event.SwipeStart, cb);
};

onSwipeEnd = function(cb) {
  return this.on(Event.SwipeEnd, cb);
};

App.onSwipeUp = function(cb) {
  return this.on(Event.SwipeUp, cb);
};

App.onSwipeUpStart = function(cb) {
  return this.on(Event.SwipeUpStart, cb);
};

App.onSwipeUpEnd = function(cb) {
  return this.on(Event.SwipeUpEnd, cb);
};

App.onSwipeDown = function(cb) {
  return this.on(Event.SwipeDown, cb);
};

App.onSwipeDownStart = function(cb) {
  return this.on(Event.SwipeDownStart, cb);
};

App.onSwipeDownEnd = function(cb) {
  return this.on(Event.SwipeDownEnd, cb);
};

App.onSwipeLeft = function(cb) {
  return this.on(Event.SwipeLeft, cb);
};

App.onSwipeLeftStart = function(cb) {
  return this.on(Event.SwipeLeftStart, cb);
};

App.onSwipeLeftEnd = function(cb) {
  return this.on(Event.SwipeLeftEnd, cb);
};

App.onSwipeRight = function(cb) {
  return this.on(Event.SwipeRight, cb);
};

App.onSwipeRightStart = function(cb) {
  return this.on(Event.SwipeRightStart, cb);
};

App.onSwipeRightEnd = function(cb) {
  return this.on(Event.SwipeRightEnd, cb);
};

App.onPan = function(cb) {
  return this.on(Event.Pan, cb);
};

App.onPanStart = function(cb) {
  return this.on(Event.PanStart, cb);
};

App.onPanEnd = function(cb) {
  return this.on(Event.PanEnd, cb);
};

App.onPanLeft = function(cb) {
  return this.on(Event.PanLeft, cb);
};

App.onPanRight = function(cb) {
  return this.on(Event.PanRight, cb);
};

App.onPanUp = function(cb) {
  return this.on(Event.PanUp, cb);
};

App.onPanDown = function(cb) {
  return this.on(Event.PanDown, cb);
};


/*
App.onPinch = (cb) -> @on(Event.Pinch, cb)
App.onPinchStart = (cb) -> @on(Event.PinchStart, cb)
App.onPinchEnd = (cb) -> @on(Event.PinchEnd, cb)
 */

App.onScale = function(cb) {
  return this.on(Event.Scale, cb);
};

App.onScaleStart = function(cb) {
  return this.on(Event.ScaleStart, cb);
};

App.onScaleEnd = function(cb) {
  return this.on(Event.ScaleEnd, cb);
};

App.onRotate = function(cb) {
  return this.on(Event.Rotate, cb);
};

App.onRotateStart = function(cb) {
  return this.on(Event.RotateStart, cb);
};

App.onRotateEnd = function(cb) {
  return this.on(Event.RotateEnd, cb);
};

App.onImportProgress = function(cb) {
  return this.on(Event.ImportProgress, cb);
};

App.onImportEnd = function(cb) {
  return this.on(Event.ImportEnd, cb);
};

App.onPreloadProgress = function(cb) {
  return this.on(Event.PreloadProgress, cb);
};

App.onPreloadEnd = function(cb) {
  return this.on(Event.PreloadEnd, cb);
};

App.onKeyDown = function(cb) {
  return this.on(Event.KeyDown, cb);
};

App.onKeyPress = function(cb) {
  return this.on(Event.KeyPress, cb);
};

App.onKeyUp = function(cb) {
  return this.on(Event.KeyUp, cb);
};
