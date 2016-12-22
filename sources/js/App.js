var App, Title, kw, res, url, _i, _len, _ref;

App = window;

App._kind = 'App';

App._ee = new EventEmitter();

App._pages_counter = 0;

App.deviceType = NULL;

App.deviceBackground = white;

App._keywords = ['center', 'left', 'right', 'top', 'bottom', 'auto', 'inline-block', 'inline', 'block', 'none', 'fit', 'fitCenter', 'fill', 'fillWidth', 'fillHeight', 'fillHeightCenter', 'text', 'pointer', 'progress', 'move', 'help', 'grabbing', 'grab', 'default', 'crosshair', 'copy', 'col-resize', 'e-resize', 'normal', 'multiply', 'screen', 'overlay', 'darken', 'lighten', 'color-dodge', 'color-burn', 'hard-light', 'soft-light', 'difference', 'exclusion', 'hue', 'saturation', 'color', 'luminosity', 'vertical', 'horizontal', 'border-box', 'padding-box', 'content-box'];

_ref = App._keywords;
for (_i = 0, _len = _ref.length; _i < _len; _i++) {
  kw = _ref[_i];
  App[res = kw.replace(/(-)\w/gi, function(x) {
    return x.slice(1).toUpperCase();
  })] = kw;
}

App._responsives = {};

window.__IS_DIRECT_PATH = false;

if (window.__ID && window.__ID.length === 8) {
  url = App.location.pathname.split('/');
  url.shift();
  if (url[0] === window.__ID) {
    window.__IS_DIRECT_PATH = true;
  }
}

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
  var e_n, window_events, _j, _len1, _results;
  this.id = Utils.randomID();
  this.element = NULL;
  this._routes = {};
  this._page = null;
  this.pages = [];
  this._responsives = {};
  this._fonts = [];
  this._fontsCollection = [];
  App.device = NULL;
  App.deviceType = NULL;
  App.deviceBackground = white;
  if (!this.DefaultContext) {
    this.DefaultContext = new Context({
      name: 'Default',
      backgroundColor: white
    });
    this.CurrentContext = this.DefaultContext;
  } else {
    if (this._wrapper) {
      this._wrapper.destroy(true);
    }
    this.CurrentContext.reset();
  }
  window_events = [Event.Abort, Event.Quit, Event.Error, Event.HashChange, Event.Load, Event.Resize, Event.Scroll, Event.Show, Event.Close, Event.Blur, Event.Focus, Event.HistoryChanged];
  _results = [];
  for (_j = 0, _len1 = window_events.length; _j < _len1; _j++) {
    e_n = window_events[_j];
    _results.push(Event.wrap(window).addEventListener(e_n, function(e) {
      this.emit(e.type, e);
    }));
  }
  return _results;
};

App.running = false;

App.run = function(callback) {
  var loaded;
  App.running = false;
  loaded = function(event) {
    this.reset();
    Defaults.setup();
    this._element = document.createElement('div');
    this._element.setAttribute('id', 'MagiXApp::' + App.id);
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
      height: '100%',
      parent: 'app'
    });
    this._element.appendChild(this._wrapper._element);
    this._wrapper._element.setAttribute('id', 'MagiXWrapper::' + this._wrapper.id);

    /*
    		if App.deviceType isnt NULL
    			App.device = new Device
    				background: App.deviceBackground
    				padding: 10
    			if App.deviceType
    				App.device.type = App.deviceType
     */
    App.on(Event.HistoryChanged, function(e) {
      if (e.state) {
        return Routes.routing();
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
      App.running = true;
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
  this.GestureInputRecognizer = new GestureRecognizer();
  this.Loop = new AnimationLoop();
  Utils.domComplete(this.Loop.start);
  this.define('selected', {
    configurable: true,
    get: function() {
      return this.getSelection().toString();
    }
  });
  this.define('page', {
    configurable: true,
    get: function() {
      return App._page;
    },
    set: function(page) {
      if (page === App._page) {
        return;
      }
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
      log('App: your browser does not support the HTML5 pushState method.');
    }
    Routes.routing();
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
      log('App: your browser does not support the HTML5 pushState method.');
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
    var child, p, _j, _len1, _ref1;
    App._responsives = {};
    _ref1 = App._wrapper.children;
    for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
      child = _ref1[_j];
      if (child._kind && child._kind === 'Page') {
        child.parent = null;
      }
    }
    if (App._page) {
      App._page.parent = null;
    }
    if (page._kind && page._kind === 'Page') {
      App._page = page;
      p = App;
      if (App.device) {
        p = App.device.content;
      }
      return App._page.parent = p;
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
  this.vibrate = function(pattern) {
    if (!navigator.vibrate) {
      return false;
    }
    window.navigator.vibrate(pattern);
  };
  this.setDevice = function(device) {
    App.deviceType = device;
    if (App.device) {
      App.device.type = App.deviceType;
    }
  };
  this.setDeviceBackground = function(background) {
    App.deviceBackground = background;
    if (App.device) {
      App.device.background = App.deviceBackground;
    }
  };
  return;
  return history.pushState({}, null, '/' + this.pathname.join('/'));
};

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

App.toInspect = (function(_this) {
  return function() {
    return "<App id:" + (_this.id || null) + ">";
  };
})(this);

App.setup();

App.onFocus = function(cb) {
  this.on(Event.Focus, cb);
};

App.onResignFocus = function(cb) {
  this.on(Event.Blur, cb);
};

App.onBlur = function(cb) {
  this.on(Event.Blur, cb);
};

App.onResize = function(cb) {
  this.on(Event.Resize, cb);
};

App.onAbort = function(cb) {
  this.on(Event.Abort, cb);
};

App.onQuit = function(cb) {
  this.on(Event.Quit, cb);
};

App.onHashChange = function(cb) {
  this.on(Event.HashChange, cb);
};

App.onLoad = function(cb) {
  this.on(Event.Load, cb);
};

App.onLoaded = function(cb) {
  this.on(Event.Load, cb);
};

App.onDone = function(cb) {
  this.on(Event.Loaded, cb);
};

App.onShow = function(cb) {
  this.on(Event.Show, cb);
};

App.onClose = function(cb) {
  this.on(Event.Close, cb);
};

App.onClick = function(cb) {
  this.on(Event.Click, cb);
};

App.onDoubleClick = function(cb) {
  this.on(Event.DoubleClick, cb);
};

App.onIn = function(cb) {
  this.on(Event.In, cb);
};

App.onOut = function(cb) {
  this.on(Event.Out, cb);
};

App.onDown = function(cb) {
  this.on(Event.Down, cb);
};

App.onOver = function(cb) {
  this.on(Event.Over, cb);
};

App.onUp = function(cb) {
  this.on(Event.Up, cb);
};

App.onMove = function(cb) {
  this.on(Event.Move, cb);
};

App.onRightClick = function(cb) {
  this.on(Event.RightClick, cb);
};

App.onMouseIn = function(cb) {
  this.on(Event.MouseIn, cb);
};

App.onMouseUp = function(cb) {
  this.on(Event.MouseUp, cb);
};

App.onMouseDown = function(cb) {
  this.on(Event.MouseDown, cb);
};

App.onMouseOver = function(cb) {
  this.on(Event.MouseOver, cb);
};

App.onMouseOut = function(cb) {
  this.on(Event.MouseOut, cb);
};

App.onMouseMove = function(cb) {
  this.on(Event.MouseMove, cb);
};

App.onMouseWheel = function(cb) {
  this.on(Event.MouseWheel, cb);
};

App.onScroll = function(cb) {
  this.on(Event.Scroll, cb);
};

App.onTouchStart = function(cb) {
  this.on(Event.TouchStart, cb);
};

App.onTouchEnd = function(cb) {
  this.on(Event.TouchEnd, cb);
};

App.onTouchMove = function(cb) {
  this.on(Event.TouchMove, cb);
};

App.onTap = function(cb) {
  this.on(Event.Tap, cb);
};

App.onTapStart = function(cb) {
  this.on(Event.TapStart, cb);
};

App.onTapEnd = function(cb) {
  this.on(Event.TapEnd, cb);
};

App.onDoubleTap = function(cb) {
  this.on(Event.DoubleTap, cb);
};

App.onForceTap = function(cb) {
  this.on(Event.ForceTap, cb);
};

App.onForceTapChange = function(cb) {
  this.on(Event.ForceTapChange, cb);
};

App.onForceTapStart = function(cb) {
  this.on(Event.ForceTapStart, cb);
};

App.onForceTapEnd = function(cb) {
  this.on(Event.ForceTapEnd, cb);
};

App.onLongPress = function(cb) {
  this.on(Event.LongPress, cb);
};

App.onLongPressStart = function(cb) {
  this.on(Event.LongPressStart, cb);
};

App.onLongPressEnd = function(cb) {
  this.on(Event.LongPressEnd, cb);
};

App.onSwipe = function(cb) {
  this.on(Event.Swipe, cb);
};

App.onSwipeStart = function(cb) {
  this.on(Event.SwipeStart, cb);
};

App.onSwipeEnd = function(cb) {
  this.on(Event.SwipeEnd, cb);
};

App.onSwipeUp = function(cb) {
  this.on(Event.SwipeUp, cb);
};

App.onSwipeUpStart = function(cb) {
  this.on(Event.SwipeUpStart, cb);
};

App.onSwipeUpEnd = function(cb) {
  this.on(Event.SwipeUpEnd, cb);
};

App.onSwipeDown = function(cb) {
  this.on(Event.SwipeDown, cb);
};

App.onSwipeDownStart = function(cb) {
  this.on(Event.SwipeDownStart, cb);
};

App.onSwipeDownEnd = function(cb) {
  this.on(Event.SwipeDownEnd, cb);
};

App.onSwipeLeft = function(cb) {
  this.on(Event.SwipeLeft, cb);
};

App.onSwipeLeftStart = function(cb) {
  this.on(Event.SwipeLeftStart, cb);
};

App.onSwipeLeftEnd = function(cb) {
  this.on(Event.SwipeLeftEnd, cb);
};

App.onSwipeRight = function(cb) {
  this.on(Event.SwipeRight, cb);
};

App.onSwipeRightStart = function(cb) {
  this.on(Event.SwipeRightStart, cb);
};

App.onSwipeRightEnd = function(cb) {
  this.on(Event.SwipeRightEnd, cb);
};

App.onPan = function(cb) {
  this.on(Event.Pan, cb);
};

App.onPanStart = function(cb) {
  this.on(Event.PanStart, cb);
};

App.onPanEnd = function(cb) {
  this.on(Event.PanEnd, cb);
};

App.onPanLeft = function(cb) {
  this.on(Event.PanLeft, cb);
};

App.onPanRight = function(cb) {
  this.on(Event.PanRight, cb);
};

App.onPanUp = function(cb) {
  this.on(Event.PanUp, cb);
};

App.onPanDown = function(cb) {
  this.on(Event.PanDown, cb);
};

App.onScale = function(cb) {
  this.on(Event.Scale, cb);
};

App.onScaleStart = function(cb) {
  this.on(Event.ScaleStart, cb);
};

App.onScaleEnd = function(cb) {
  this.on(Event.ScaleEnd, cb);
};

App.onRotate = function(cb) {
  this.on(Event.Rotate, cb);
};

App.onRotateStart = function(cb) {
  this.on(Event.RotateStart, cb);
};

App.onRotateEnd = function(cb) {
  this.on(Event.RotateEnd, cb);
};

App.onImportProgress = function(cb) {
  this.on(Event.ImportProgress, cb);
};

App.onImportEnd = function(cb) {
  this.on(Event.ImportEnd, cb);
};

App.onPreloadProgress = function(cb) {
  this.on(Event.PreloadProgress, cb);
};

App.onPreloadEnd = function(cb) {
  this.on(Event.PreloadEnd, cb);
};

App.onKeyDown = function(cb) {
  this.on(Event.KeyDown, cb);
};

App.onKeyPress = function(cb) {
  this.on(Event.KeyPress, cb);
};

App.onKeyUp = function(cb) {
  this.on(Event.KeyUp, cb);
};
