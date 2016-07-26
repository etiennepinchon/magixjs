var Location,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Location = (function(_super) {
  __extends(Location, _super);

  function Location(properties) {
    if (!properties) {
      properties = {};
    }
    if (!navigator.geolocation) {
      this.emit(Event.Unsupported);
      if (properties.unsupported) {
        properties.unsupported();
      }
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

  Location.prototype._kind = 'Location';

  Location.prototype.onUnsupported = function(cb) {
    return this.on(Event.Unsupported, cb);
  };

  Location.prototype.onSuccess = function(cb) {
    return this.on(Event.Success, cb);
  };

  Location.prototype.onError = function(cb) {
    return this.on(Event.Error, cb);
  };

  Location.prototype.onClear = function(cb) {
    return this.on(Event.Clear, cb);
  };

  return Location;

})(Element);


/*
	Property	Returns
	coords.latitude	The latitude as a decimal number
	coords.longitude	The longitude as a decimal number
	coords.accuracy	The accuracy of position
	coords.altitude	The altitude in meters above the mean sea level
	coords.altitudeAccuracy	The altitude accuracy of position
	coords.heading	The heading as degrees clockwise from North
	coords.speed	The speed in meters per second
	timestamp	The date/time of the response
 */

Location.prototype.current = function(parameters) {
  var accurate, _this;
  if (Utils.isBoolean(parameters)) {
    accurate = parameters;
    parameters = {};
  }
  if (!parameters) {
    parameters = {};
  }
  if (parameters.accurate === void 0) {
    parameters.accurate = false;
  }
  if (accurate) {
    parameters.accurate = accurate;
  }
  _this = this;
  return navigator.geolocation.getCurrentPosition(function(position) {
    position.coords.timestamp = position.timestamp;
    _this.emit(Event.Success, position.coords);
    if (parameters.success) {
      parameters.success(position.coords);
    }
  }, function(error) {
    _this.emit(Event.Error, error);
    if (parameters.error) {
      parameters.error(error);
    }
  }, {
    enableHighAccuracy: parameters.accurate
  });
};


/*
	watchPosition() - Returns the current position of the user and continues to return updated position as the user moves (like the GPS in a car).
	clearWatch() - Stops the watchPosition() method.

	The example below shows the watchPosition() method. You need an accurate GPS device to test this (like iPhone):
 */

Location.prototype.watch = function(parameters) {
  var accurate, _this;
  if (Utils.isBoolean(parameters)) {
    accurate = parameters;
    parameters = {};
  }
  if (!parameters) {
    parameters = {};
  }
  if (parameters.accurate === void 0) {
    parameters.accurate = false;
  }
  if (accurate) {
    parameters.accurate = accurate;
  }
  _this = this;
  this.watch = navigator.geolocation.watchPosition(function(position) {
    position.coords.timestamp = position.timestamp;
    _this.emit(Event.Success, position.coords);
    if (parameters.success) {
      parameters.success(position.coords);
    }
  }, function(error) {
    _this.emit(Event.Error, error);
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


/*
var geo = new Location();
if (geo) {
	geo.current({
		success: function() {

		},
		error: function: {

		}
	});

	geo.watch({
		success: function() {
			geo.clear();
		},
		error: function: {

		},
		accurate: true
	});
};
 */


/*
var geo = new Location({
	unsupported: function() {

	},
	watch: function(position) {

	},
	current: function(position) {

	},
	error: function(error) {

	}
});


loc = new Location()
loc.current()

loc.onSuccess (e) ->
	console.log e
loc.onError (e) ->
	console.log e


loc = new Location()

 * bool for accuracy
loc.watch true

loc.onSuccess (e) ->
	console.log e
loc.onError (e) ->
	console.log e

loc = new Location
	current: (e)->
		console.log e
 */
