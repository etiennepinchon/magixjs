var EventEmitter, EventKey,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

EventKey = "_events";

EventEmitter = (function(_super) {
  __extends(EventEmitter, _super);

  function EventEmitter() {
    return EventEmitter.__super__.constructor.apply(this, arguments);
  }

  EventEmitter.prototype.listenerEvents = function() {
    if (this[EventKey] === void 0) {
      return [];
    }
    return Utils.keys(this[EventKey]);
  };

  EventEmitter.prototype.removeAllListeners = function(eventName) {
    var eventNames, listener, _i, _len, _results;
    if (eventName) {
      eventNames = [eventName];
    } else {
      eventNames = this.listenerEvents();
    }
    _results = [];
    for (_i = 0, _len = eventNames.length; _i < _len; _i++) {
      eventName = eventNames[_i];
      _results.push((function() {
        var _j, _len1, _ref, _results1;
        _ref = this.listeners(eventName);
        _results1 = [];
        for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
          listener = _ref[_j];
          _results1.push(this.removeListener(eventName, listener));
        }
        return _results1;
      }).call(this));
    }
    return _results;
  };

  return EventEmitter;

})(EE3);
