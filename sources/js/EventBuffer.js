var EventBuffer,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Event.EventBufferReset = "eventbufferreset";

Event.EventBufferUpdated = "eventbufferupdated";

EventBuffer = (function(_super) {
  __extends(EventBuffer, _super);

  function EventBuffer(options) {
    if (options == null) {
      options = {};
    }
    this.options = Utils.defaults(options, {
      velocityTimeout: 100
    });
    this._events = [];
  }

  EventBuffer.prototype.push = function(event) {
    this._events.push(event);
    return this.emit(Event.EventBufferUpdated, event);
  };

  EventBuffer.prototype.reset = function() {
    this._events.length = 0;
    return this.emit(Event.EventBufferReset);
  };

  EventBuffer.define("length", {
    get: function() {
      return this._events.length;
    }
  });

  EventBuffer.define("first", {
    get: function() {
      return this._events[0];
    }
  });

  EventBuffer.define("offset", {
    get: function() {
      var current, first, offset;
      if (events.length < 2) {
        return {
          x: 0,
          y: 0
        };
      }
      current = events[events.length - 1];
      first = events[0];
      return offset = {
        x: current.x - first.x,
        y: current.y - first.y
      };
    }
  });

  EventBuffer.define("events", {
    get: function() {
      var timeout;
      timeout = Date.now() - this.options.velocityTimeout;
      return this._events.filter((function(_this) {
        return function(event) {
          return event.t > timeout;
        };
      })(this));
    }
  });

  EventBuffer.define("angle", {
    get: function() {
      var events, p1, p2;
      events = this.events;
      if (events.length < 2) {
        return 0;
      }
      p1 = events[0];
      p2 = events[1];
      return Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;
    }
  });

  EventBuffer.define("velocity", {
    get: function() {
      var current, events, first, time, velocity;
      events = this.events;
      if (events.length < 2) {
        return {
          x: 0,
          y: 0
        };
      }
      current = events[events.length - 1];
      first = events[0];
      time = current.t - first.t;
      velocity = {
        x: (current.x - first.x) / time,
        y: (current.y - first.y) / time
      };
      if (velocity.x === Infinity) {
        velocity.x = 0;
      }
      if (velocity.y === Infinity) {
        velocity.y = 0;
      }
      return velocity;
    }
  });

  return EventBuffer;

})(Element);
