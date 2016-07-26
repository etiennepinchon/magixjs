
/*
Examples:

myNotification = new Notification
	title: "My notification name"
	body: "What it is all about.."

myNotification.onGranted ->
	console.log 'granted!'

myNotification.onShow ->
	console.log 'showed!'

myNotification.onClose ->
	console.log 'closed!'
 */
var Notification,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

if (window.Notification) {
  window._Notification = window.Notification;
}

Notification = (function(_super) {
  __extends(Notification, _super);

  function Notification(properties) {
    var displayNotification, options, _this;
    _this = this;
    displayNotification = function() {
      this._notification = new window._Notification(properties.title, options);
      this._notification.addEventListener('close', function() {
        if (properties.close) {
          properties.close();
        }
        _this.emit(Event.Close);
      });
      this._notification.addEventListener('show', function() {
        if (properties.show) {
          properties.show();
        }
        _this.emit(Event.Show);
      });
      this._notification.addEventListener('click', function() {
        if (properties.click) {
          properties.click();
        }
        _this.emit(Event.Click);
      });
      this._notification.addEventListener('error', function() {
        if (properties.error) {
          properties.error();
        }
        _this.emit(Event.Error);
      });
    };
    if (!properties) {
      properties = {};
    }
    if (!window._Notification) {
      this.emit(Event.Unsupported);
      if (properties.unsupported) {
        properties.unsupported();
      }
      return false;
    }
    if (properties.title) {
      properties.title = '';
    }
    options = {};
    if (properties.text) {
      properties.body = properties.text;
    }
    if (properties.body) {
      options.body = properties.body;
    }
    if (properties.icon) {
      options.icon = Utils.parseAsset(properties.icon);
    }
    if (properties.vibrate !== void 0) {
      options.vibrate = properties.vibrate;
    }
    if (properties.silent !== void 0) {
      options.silent = properties.silent;
    }
    if (window._Notification.permission === 'granted') {
      displayNotification();
    } else if (window._Notification.permission !== 'denied') {
      window._Notification.requestPermission(function(permission) {
        if (permission === 'granted') {
          _this.emit(Event.Granted, permission);
          return displayNotification();
        } else {
          return _this.emit(Event.Denied, permission);
        }
      });
      return;
    } else {
      if (properties.denied) {
        properties.denied();
      }
      _this.emit(Event.Denied);
    }
    true;
  }

  Notification.prototype._kind = 'Notification';

  Notification.prototype.onUnsupported = function(cb) {
    return this.on(Event.Unsupported, cb);
  };

  Notification.prototype.onGranted = function(cb) {
    return this.on(Event.Granted, cb);
  };

  Notification.prototype.onDenied = function(cb) {
    return this.on(Event.Denied, cb);
  };

  Notification.prototype.onError = function(cb) {
    return this.on(Event.Error, cb);
  };

  Notification.prototype.onClick = function(cb) {
    return this.on(Event.onClick, cb);
  };

  Notification.prototype.onShow = function(cb) {
    return this.on(Event.Show, cb);
  };

  Notification.prototype.onClose = function(cb) {
    return this.on(Event.Close, cb);
  };

  return Notification;

})(Element);

Notification.prototype.close = function(parameters) {
  if (this._notification) {
    this._notification.close();
  }
};

Notification.requestPermission = function(parameters) {
  var properties;
  if (properties === void 0) {
    properties = {};
  }
  return window._Notification.requestPermission(function(permission) {
    if (permission === 'granted') {
      if (parameters.granted) {
        parameters.granted(permission);
      }
      this.emit(Event.Granted, permission);
    } else {
      if (parameters.denied) {
        parameters.denied(permission);
      }
      this.emit(Event.Denied, permission);
      return;
    }
  });
};

Notification.isGranted = function() {
  if (window._Notification.permission === 'granted') {
    return true;
  }
  return false;
};
