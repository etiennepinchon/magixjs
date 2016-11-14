var Location,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Location = (function(_super) {
  __extends(Location, _super);

  Location.prototype._kind = 'Location';

  function Location(properties) {
    if (!properties) {
      properties = {};
    }
    if (!navigator.geolocation) {
      if (properties.unsupported) {
        properties.unsupported();
      }
      this.emit(Event.Unsupported);
      return false;
    }
    if (properties.current) {
      properties.success = properties.current;
      this.current(properties);
    }
    if (properties.watch) {
      properties.success = properties.watch;
      this.watch(properties);
    }
    return true;
  }

  Location.prototype.current = function(parameters) {
    var accurate, that;
    if (Utils.isBoolean(parameters)) {
      accurate = parameters;
      parameters = {};
    }
    that = this;
    if (!parameters) {
      parameters = {};
    }
    if (parameters.accurate === NULL) {
      parameters.accurate = false;
    }
    if (accurate) {
      parameters.accurate = accurate;
    }
    navigator.geolocation.getCurrentPosition(function(position) {
      position.coords.timestamp = position.timestamp;
      that.emit(Event.Success, position.coords);
      if (parameters.success) {
        parameters.success(position.coords);
      }
    }, function(error) {
      that.emit(Event.Error, error);
      if (parameters.error) {
        parameters.error(error);
      }
    }, {
      enableHighAccuracy: parameters.accurate
    });
  };

  Location.prototype.watch = function(parameters) {
    var accurate, that;
    if (Utils.isBoolean(parameters)) {
      accurate = parameters;
      parameters = {};
    }
    if (!parameters) {
      parameters = {};
    }
    that = this;
    if (!parameters) {
      parameters = {};
    }
    if (parameters.accurate === NULL) {
      parameters.accurate = false;
    }
    if (accurate) {
      parameters.accurate = accurate;
    }
    this.watch = navigator.geolocation.watchPosition(function(position) {
      position.coords.timestamp = position.timestamp;
      that.emit(Event.Success, position.coords);
      if (parameters.success) {
        parameters.success(position.coords);
      }
    }, function(error) {
      that.emit(Event.Error, error);
      if (parameters.error) {
        parameters.error(error);
      }
    }, {
      enableHighAccuracy: parameters.accurate
    });
  };

  Location.prototype.clear = function() {
    if (this.watch) {
      this.emit(Event.Clear);
      navigator.geolocation.clearWatch(this.watch);
    }
  };

  Location.prototype.onUnsupported = function(cb) {
    this.on(Event.Unsupported, cb);
  };

  Location.prototype.onSuccess = function(cb) {
    this.on(Event.Success, cb);
  };

  Location.prototype.onError = function(cb) {
    this.on(Event.Error, cb);
  };

  Location.prototype.onClear = function(cb) {
    this.on(Event.Clear, cb);
  };

  return Location;

})(Element);
