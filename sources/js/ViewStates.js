var ViewStates, ViewStatesIgnoredKeys,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
  __slice = [].slice;

ViewStatesIgnoredKeys = ["ignoreEvent"];


/*

myPview.states.add
    stateA:
        x: 500
        opacity: 0.5
 
    stateB:
        y: 200
        x: 0
        opacity: 1

myPview.states.last(curve: "spring(400, 30, 0)", -> console.log 'nice')
 */

ViewStates = (function(_super) {
  __extends(ViewStates, _super);

  function ViewStates(view) {
    this.view = view;
    this._states = {};
    this._orderedStates = [];
    this.animationOptions = {};
    this.add("default", this.view.props);
    this._currentState = "default";
    this._previousStates = [];
    ViewStates.__super__.constructor.apply(this, arguments);
  }

  ViewStates.prototype.add = function(stateName, properties) {
    var error, k, v;
    if (Utils.isObject(stateName)) {
      for (k in stateName) {
        v = stateName[k];
        this.add(k, v);
      }
      return;
    }
    error = function() {
      throw Error("Usage example: view.states.add(\"someName\", {x:500})");
    };
    if (!Utils.isString(stateName)) {
      error();
    }
    if (!Utils.isObject(properties)) {
      error();
    }
    this._orderedStates.push(stateName);
    return this._states[stateName] = ViewStates.filterStateProperties(properties);
  };

  ViewStates.prototype.remove = function(stateName) {
    if (!this._states.hasOwnProperty(stateName)) {
      return;
    }
    delete this._states[stateName];
    return this._orderedStates = Utils.without(this._orderedStates, stateName);
  };

  ViewStates.prototype["switch"] = function(stateName, animationOptions, instant) {
    var animatablePropertyKeys, animatingKeys, args, callback, k, properties, propertyName, v, value, _ref, _ref1;
    if (instant == null) {
      instant = false;
    }
    args = arguments;
    callback = void 0;
    if (Utils.isFunction(arguments[1])) {
      callback = arguments[1];
    } else if (Utils.isFunction(arguments[2])) {
      callback = arguments[2];
    } else if (Utils.isFunction(arguments[3])) {
      callback = arguments[3];
    }
    if (!this._states.hasOwnProperty(stateName)) {
      throw Error("No such state: '" + stateName + "'");
    }
    this.emit(Event.StateWillSwitch, this._currentState, stateName, this);
    this._previousStates.push(this._currentState);
    this._currentState = stateName;
    properties = {};
    animatingKeys = this.animatingKeys();
    _ref = this._states[stateName];
    for (propertyName in _ref) {
      value = _ref[propertyName];
      if (__indexOf.call(ViewStatesIgnoredKeys, propertyName) >= 0) {
        continue;
      }
      if (__indexOf.call(animatingKeys, propertyName) < 0) {
        continue;
      }
      if (Utils.isFunction(value)) {
        value = value.call(this.view, this.view, propertyName, stateName);
      }
      properties[propertyName] = value;
    }
    animatablePropertyKeys = [];
    for (k in properties) {
      v = properties[k];
      if (Utils.isNumber(v)) {
        animatablePropertyKeys.push(k);
      } else if (Color.isColorObject(v)) {
        animatablePropertyKeys.push(k);
      } else if (v === null) {
        animatablePropertyKeys.push(k);
      }
    }
    if (animatablePropertyKeys.length === 0) {
      instant = true;
    }
    if (instant === true) {
      this.view.props = properties;
      return this.emit(Event.StateDidSwitch, Utils.last(this._previousStates), this._currentState, this);
    } else {
      if (animationOptions == null) {
        animationOptions = this.animationOptions;
      }
      animationOptions.properties = properties;
      if ((_ref1 = this._animation) != null) {
        _ref1.stop();
      }
      this._animation = this.view.animate(animationOptions);
      return this._animation.once("stop", (function(_this) {
        return function() {
          for (k in properties) {
            v = properties[k];
            if (!(Utils.isNumber(v) || Color.isColorObject(v))) {
              _this.view[k] = v;
            }
          }
          if (callback) {
            callback(Utils.last(_this._previousStates), _this._currentState, _this);
          }
          if (Utils.last(_this._previousStates) !== stateName) {
            return _this.emit(Event.StateDidSwitch, Utils.last(_this._previousStates), _this._currentState, _this);
          }
        };
      })(this));
    }
  };

  ViewStates.prototype.switchInstant = function(stateName, callback) {
    return this["switch"](stateName, null, true, callback);
  };

  ViewStates.define("state", {
    get: function() {
      return this._currentState;
    }
  });

  ViewStates.define("current", {
    get: function() {
      return this._currentState;
    }
  });

  ViewStates.define("all", {
    get: function() {
      return Utils.clone(this._orderedStates);
    }
  });

  ViewStates.prototype.states = function() {
    return Utils.clone(this._orderedStates);
  };

  ViewStates.prototype.animatingKeys = function() {
    var keys, state, stateName, _ref;
    keys = [];
    _ref = this._states;
    for (stateName in _ref) {
      state = _ref[stateName];
      keys = Utils.union(keys, Utils.keys(state));
    }
    return keys;
  };

  ViewStates.prototype.previous = function(states, animationOptions) {
    var args, callback, last;
    args = arguments;
    last = Utils.last(args);
    callback = void 0;
    if (Utils.isFunction(last)) {
      args = Array.prototype.slice.call(arguments);
      callback = args.pop();
      if (states === callback) {
        states = void 0;
      }
      if (animationOptions === callback) {
        animationOptions = {};
      }
    }
    if (states == null) {
      states = this.states();
    }
    return this["switch"](Utils.arrayPrev(states, this._currentState), animationOptions, callback);
  };

  ViewStates.prototype.next = function() {
    var args, callback, index, last, states, that;
    args = arguments;
    last = Utils.last(args);
    callback = void 0;
    if (Utils.isFunction(last)) {
      args = Array.prototype.slice.call(arguments);
      callback = args.pop();
    }
    states = Utils.arrayFromArguments(args);
    if (!states.length) {
      states = this.states();
      index = states.indexOf(this._currentState);
      if (index + 1 > states.length) {
        states = [states[0]];
      } else {
        states = [states[index + 1]];
      }
    }
    that = this;
    return this["switch"](Utils.arrayNext(states, this._currentState), function() {
      states.shift();
      if (states.length > 0) {
        if (callback) {
          return that.next(states, callback);
        } else {
          return that.next(states);
        }
      } else if (callback) {
        return callback();
      }
    });
  };

  ViewStates.prototype.last = function(animationOptions) {
    var args, callback, last, state;
    args = arguments;
    last = Utils.last(args);
    callback = void 0;
    if (Utils.isFunction(last)) {
      args = Array.prototype.slice.call(arguments);
      callback = args.pop();
      if (animationOptions === callback) {
        animationOptions = {};
      }
    }
    state = void 0;
    if (!this._previousStates.length) {
      state = this.states();
    } else {
      state = this._previousStates;
    }
    return this["switch"](Utils.last(state), animationOptions, callback);
  };

  ViewStates.prototype.emit = function() {
    var args, _ref;
    args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    ViewStates.__super__.emit.apply(this, arguments);
    return (_ref = this.view).emit.apply(_ref, args);
  };

  ViewStates.filterStateProperties = function(properties) {
    var k, stateProperties, v;
    stateProperties = {};
    for (k in properties) {
      v = properties[k];
      if (Utils.isString(v) && Utils.endsWith(k.toLowerCase(), "color") && Color.isColorString(v)) {
        stateProperties[k] = new Color(v);
      } else if (Utils.isNumber(v) || Utils.isFunction(v) || Utils.isBoolean(v) || Utils.isString(v) || Color.isColorObject(v) || v === null) {
        stateProperties[k] = v;
      }
    }
    return stateProperties;
  };

  return ViewStates;

})(Element);
