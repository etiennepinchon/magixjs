var WebView,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

WebView = (function(_super) {
  __extends(WebView, _super);

  function WebView(properties) {
    WebView.__super__.constructor.apply(this, arguments);
    this._sandbox = {};
    this.content = this._element.contentWindow;
    this.document = this._element.contentDocument;
  }

  WebView.prototype._kind = 'WebView';

  WebView.prototype._elementType = 'iframe';

  WebView.prototype.reload = function() {
    return this._element.contentWindow.location.reload();
  };

  WebView.define('url', {
    get: function() {
      if (this._url === NULL) {
        this._url = '';
      }
      return this._url;
    },
    set: function(value) {
      this._url = value;
      this._element.setAttribute('src', value);
    }
  });

  WebView.define('src', {
    get: function() {
      return this.url;
    },
    set: function(value) {
      this.url = value;
    }
  });

  WebView._def_enabled = function(name) {
    return this.define(name, {
      get: function() {
        if (this["_" + name] === void 0) {
          return true;
        }
        return this["_" + name];
      },
      set: function(value) {
        if (value !== true) {
          value = false;
        }
        this["_" + name] = value;
        this['_' + name.replace('Enabled', '')] = value;
        return this._updateSandbox();
      }
    });
  };

  WebView._def_enabled('scriptsEnabled');

  WebView._def_enabled('formsEnabled');

  WebView._def_enabled('popupsEnabled');

  WebView._def_enabled('pointerLockEnabled');

  WebView._def_enabled('sameOriginEnabled');

  WebView._def_enabled('navigationEnabled');

  WebView.prototype.onLoad = function(cb) {
    return this.on(Event.Load, cb);
  };

  WebView.prototype.onLoaded = function(cb) {
    return this.on(Event.Loaded, cb);
  };

  WebView.prototype.onDone = function(cb) {
    return this.on(Event.Loaded, cb);
  };

  WebView.prototype._updateSandbox = function() {
    var key, output, sandbox;
    sandbox = {
      forms: 'allow-forms',
      pointerLock: 'allow-pointer-lock',
      popups: 'allow-popups',
      sameOrigin: 'allow-same-origin',
      scripts: 'allow-scripts',
      navigation: 'allow-top-navigation'
    };
    output = '';
    for (key in this._sandbox) {
      if (sandbox[key] !== NULL && this._sandbox[key] === false) {
        delete sandbox[key];
      }
    }
    for (key in sandbox) {
      output += sandbox[key] + ' ';
    }
    this._element.setAttribute('sandbox', output);
  };

  return WebView;

})(View);
