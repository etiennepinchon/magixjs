var Gamepad, Gamepads, _gamepadevents,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

Event.GamepadConnected = 'gamepadconnected';

Event.GamepadDisconnected = 'gamepaddisconnected';

Gamepads = {};

_gamepadevents = false;

Gamepad = (function(_super) {
  __extends(Gamepad, _super);

  Gamepad.prototype._kind = 'Gamepad';

  function Gamepad() {
    var gamepadHandler;
    Gamepad.__super__.constructor.apply(this, arguments);
    if (_gamepadevents) {
      return;
    }
    _gamepadevents = true;
    gamepadHandler = function(e, connecting) {
      if (connecting) {
        Gamepads[e.gamepad.index] = e.gamepad;
      } else {
        delete Gamepads[e.gamepad.index];
      }
    };
    window.addEventListener(Event.GamepadConnected, (function(e) {
      gamepadHandler(e, true);
      that.emit(Event.GamepadConnected, e);
    }), false);
    window.addEventListener(Event.GamepadDisconnected, (function(e) {
      gamepadHandler(e, false);
      that.emit(Event.GamepadDisconnected, e);
    }), false);
  }

  Gamepad.isAvailable(function() {
    if (__indexOf.call(navigator, "getGamepads") >= 0) {
      return true;
    }
    return false;
  });

  Gamepad.onGamepadConnected = function(cb) {
    this.on(Event.GamepadConnected, cb);
  };

  Gamepad.onGamepadDisconnected = function(cb) {
    this.on(Event.GamepadDisconnected, cb);
  };

  return Gamepad;

})(Element);
