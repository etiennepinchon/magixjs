var Notification,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

if (window.Notification) {
  window._Notification = window.Notification;
}

Notification = (function(_super) {
  __extends(Notification, _super);

  Notification.prototype._kind = 'Notification';

  function Notification(properties) {
    var options, that;
    if (!properties) {
      properties = {};
    }
    if (!window._Notification) {
      if (properties.unsupported) {
        properties.unsupported();
      }
      this.emit(Event.Unsupported);
      return false;
    }
    that = this;
    options = {};
    if (properties.title) {
      properties.title = '';
    }
    if (properties.text) {
      properties.body = properties.text;
    }
    if (properties.content) {
      properties.body = properties.content;
    }
    if (properties.body) {
      options.body = properties.body;
    }
    if (properties.icon) {
      options.icon = Utils.parseAsset(properties.icon);
    }
    if (properties.vibrate !== NULL) {
      options.vibrate = properties.vibrate;
    }
    if (properties.silent !== NULL) {
      options.silent = properties.silent;
    }
    if (window._Notification.permission === 'granted') {
      this._displayNotification();
    } else if (window._Notification.permission !== 'denied') {
      window._Notification.requestPermission(function(permission) {
        if (permission === 'granted') {
          that.emit(Event.Granted, permission);
          return this._displayNotification();
        } else {
          return that.emit(Event.Denied, permission);
        }
      });
      return;
    } else {
      if (properties.denied) {
        properties.denied();
      }
      that.emit(Event.Denied);
    }
    return true;
  }

  Notification.prototype.close = function(parameters) {
    if (this._notification) {
      this._notification.close();
    }
  };

  Notification.prototype.requestPermission = function(parameters) {
    var properties;
    if (properties === NULL) {
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

  Notification.prototype.isGranted = function() {
    if (window._Notification.permission === 'granted') {
      return true;
    }
    return false;
  };

  Notification.prototype.onUnsupported = function(cb) {
    this.on(Event.Unsupported, cb);
  };

  Notification.prototype.onGranted = function(cb) {
    this.on(Event.Granted, cb);
  };

  Notification.prototype.onDenied = function(cb) {
    this.on(Event.Denied, cb);
  };

  Notification.prototype.onError = function(cb) {
    this.on(Event.Error, cb);
  };

  Notification.prototype.onClick = function(cb) {
    this.on(Event.onClick, cb);
  };

  Notification.prototype.onShow = function(cb) {
    this.on(Event.Show, cb);
  };

  Notification.prototype.onClose = function(cb) {
    this.on(Event.Close, cb);
  };

  Notification.prototype._displayNotification = function() {
    this._notification = new window._Notification(properties.title, options);
    this._notification.addEventListener('close', function() {
      if (properties.close) {
        properties.close();
      }
      that.emit(Event.Close);
    });
    this._notification.addEventListener('show', function() {
      if (properties.show) {
        properties.show();
      }
      that.emit(Event.Show);
    });
    this._notification.addEventListener('click', function() {
      if (properties.click) {
        properties.click();
      }
      that.emit(Event.Click);
    });
    this._notification.addEventListener('error', function() {
      if (properties.error) {
        properties.error();
      }
      that.emit(Event.Error);
    });
  };

  return Notification;

})(Element);
