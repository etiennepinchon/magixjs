var Context,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

Context = (function(_super) {
  __extends(Context, _super);

  function Context(options) {
    Context.__super__.constructor.apply(this, arguments);
    if (!options) {
      options = {};
    }
    if (!options.name) {
      throw Error('Context: name required.');
    }
    this._parent = options.parent;
    this._name = options.name;
    this.perspective = options.perspective;
    this.perspectiveOriginX = options.perspectiveOriginX;
    this.perspectiveOriginY = options.perspectiveOriginY;
    this.reset();
  }

  Context.prototype.reset = function() {
    this._createDOMEventManager();
    this._createRootElement();
    this.resetViews();
    this.resetAnimations();
    this.resetTimers();
    this.resetIntervals();
    return this.emit("reset", this);
  };

  Context.define("parent", {
    get: function() {
      return this._parent;
    }
  });

  Context.define("element", {
    get: function() {
      return this._element;
    }
  });

  Context.define("views", {
    get: function() {
      return Utils.clone(this._views);
    }
  });

  Context.define("viewCounter", {
    get: function() {
      return this._viewCounter;
    }
  });

  Context.prototype.addView = function(view) {
    if (__indexOf.call(this._views, view) >= 0) {
      return;
    }
    this._viewCounter++;
    return this._views.push(view);
  };

  Context.prototype.removeView = function(view) {
    return this._views = Utils.without(this._views, view);
  };

  Context.prototype.resetViews = function() {
    this.resetGesture();
    this._views = [];
    return this._viewCounter = 0;
  };

  Context.define("animations", {
    get: function() {
      return Utils.clone(this._animations);
    }
  });

  Context.prototype.addAnimation = function(animation) {
    if (__indexOf.call(this._animations, animation) >= 0) {
      return;
    }
    return this._animations.push(animation);
  };

  Context.prototype.removeAnimation = function(animation) {
    return this._animations = Utils.without(this._animations, animation);
  };

  Context.prototype.resetAnimations = function() {
    this.stopAnimations();
    return this._animations = [];
  };

  Context.prototype.stopAnimations = function() {
    if (!this._animations) {
      return;
    }
    return this._animations.map(function(animation) {
      return animation.stop(true);
    });
  };

  Context.define("timers", {
    get: function() {
      return Utils.clone(this._timers);
    }
  });

  Context.prototype.addTimer = function(timer) {
    if (__indexOf.call(this._timers, timer) >= 0) {
      return;
    }
    return this._timers.push(timer);
  };

  Context.prototype.removeTimer = function(timer) {
    return this._timers = Utils.without(this._timers, timer);
  };

  Context.prototype.resetTimers = function() {
    if (this._timers) {
      this._timers.map(window.clearTimeout);
    }
    return this._timers = [];
  };

  Context.define("intervals", {
    get: function() {
      return Utils.clone(this._intervals);
    }
  });

  Context.prototype.addInterval = function(interval) {
    if (__indexOf.call(this._intervals, interval) >= 0) {
      return;
    }
    return this._intervals.push(interval);
  };

  Context.prototype.removeInterval = function(interval) {
    return this._intervals = Utils.without(this._intervals, interval);
  };

  Context.prototype.resetIntervals = function() {
    if (this._intervals) {
      this._intervals.map(window.clearInterval);
    }
    return this._intervals = [];
  };

  Context.prototype.resetGesture = function() {
    var view, _i, _len, _ref;
    if (!this._views) {
      return;
    }
    _ref = this._views;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      view = _ref[_i];
      if (view._gestures) {
        view._gestures.destroy();
      }
    }
  };


  /*
   */


  /*
  	run: (fn) ->
  		previousContext = Framer.CurrentContext
  		Framer.CurrentContext = @
  		fn()
  		Framer.CurrentContext = previousContext
   */

  Context.prototype.freeze = function() {
    var eventName, view, viewId, viewListeners, _i, _j, _len, _len1, _ref, _ref1;
    if (this._frozenEvents != null) {
      throw new Error("Context is already frozen");
    }
    this._frozenEvents = {};
    _ref = this._views;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      view = _ref[_i];
      viewListeners = {};
      _ref1 = view.listenerEvents();
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        eventName = _ref1[_j];
        viewListeners[eventName] = view.listeners(eventName);
      }
      view.removeAllListeners();
      viewId = this._views.indexOf(view);
      this._frozenEvents[viewId] = viewListeners;
    }
    this.stopAnimations();
    this.resetTimers();
    return this.resetIntervals();
  };

  Context.prototype.resume = function() {
    var eventName, events, listener, listeners, view, viewId, _i, _len, _ref;
    if (this._frozenEvents == null) {
      throw new Error("Context is not frozen, cannot resume");
    }
    _ref = this._frozenEvents;
    for (viewId in _ref) {
      events = _ref[viewId];
      view = this._views[viewId];
      for (eventName in events) {
        listeners = events[eventName];
        for (_i = 0, _len = listeners.length; _i < _len; _i++) {
          listener = listeners[_i];
          view.on(eventName, listener);
        }
      }
    }
    return delete this._frozenEvents;
  };

  Context.prototype._createDOMEventManager = function() {
    if (this.domEventManager) {
      this.domEventManager.reset();
    }
    return this.domEventManager = new DOMEventManager;
  };

  Context.prototype._createRootElement = function() {
    this._destroyRootElement();
    this._element = document.createElement('div');
    this._element.id = 'MagiXRoot';
    this._element.setAttribute("name", this._name);
    this._element.style['perspective'] = this.perspective;
    this._element.style['backgroundColor'] = this.backgroundColor;
    this.__pendingElementMagiXnd = (function(_this) {
      return function() {
        var parentElement, _ref;
        parentElement = (_ref = _this._parent) != null ? _ref._element : void 0;
        if (parentElement == null) {
          parentElement = document.body;
        }
        return parentElement.appendChild(_this._element);
      };
    })(this);
    return Utils.domComplete(this.__pendingElementMagiXnd);
  };

  Context.prototype._destroyRootElement = function() {
    if (this._element && this._element.parentNode) {
      this._element.parentNode.removeChild(this._element);
    }
    if (this.__pendingElementMagiXnd) {
      Utils.domCompleteCancel(this.__pendingElementMagiXnd);
      this.__pendingElementMagiXnd = void 0;
    }
    return this._element = void 0;
  };

  Context.define("width", {
    get: function() {
      if (this.parent != null) {
        return this.parent.width;
      }
      return window.innerWidth;
    }
  });

  Context.define("height", {
    get: function() {
      if (this.parent != null) {
        return this.parent.height;
      }
      return window.innerHeight;
    }
  });

  Context.define("frame", {
    get: function() {
      return {
        x: 0,
        y: 0,
        width: this.width,
        height: this.height
      };
    }
  });

  Context.define("size", {
    get: function() {
      return Utils.pick(this.frame, ["width", "height"]);
    }
  });

  Context.define("point", {
    get: function() {
      return Utils.pick(this.frame, ["x", "y"]);
    }
  });

  Context.define("canvasFrame", {
    get: function() {
      if (this.parent == null) {
        return this.frame;
      }
      return this.parent.canvasFrame;
    }
  });

  Context.define("backgroundColor", {
    get: function() {
      if (Color.isColor(this._backgroundColor)) {
        return this._backgroundColor;
      }
      return "transparent";
    },
    set: function(value) {
      var _ref;
      if (Color.isColor(value)) {
        this._backgroundColor = value;
        return (_ref = this._element) != null ? _ref.style["backgroundColor"] = new Color(value.toString()) : void 0;
      }
    }
  });

  Context.define("perspective", {
    get: function() {
      return this._perspective;
    },
    set: function(value) {
      var _ref;
      if (Utils.isNumber(value)) {
        this._perspective = value;
        return (_ref = this._element) != null ? _ref.style["perspective"] = this._perspective : void 0;
      }
    }
  });

  Context.prototype._updatePerspective = function() {
    var _ref;
    return (_ref = this._element) != null ? _ref.style["perspectiveOrigin"] = "" + (this.perspectiveOriginX * 100) + "% " + (this.perspectiveOriginY * 100) + "%" : void 0;
  };

  Context.define("perspectiveOriginX", {
    get: function() {
      if (Utils.isNumber(this._perspectiveOriginX)) {
        return this._perspectiveOriginX;
      }
      return 0.5;
    },
    set: function(value) {
      if (Utils.isNumber(value)) {
        this._perspectiveOriginX = value;
        return this._updatePerspective();
      }
    }
  });

  Context.define("perspectiveOriginY", {
    get: function() {
      if (Utils.isNumber(this._perspectiveOriginY)) {
        return this._perspectiveOriginY;
      }
      return .5;
    },
    set: function(value) {
      if (Utils.isNumber(value)) {
        this._perspectiveOriginY = value;
        return this._updatePerspective();
      }
    }
  });

  Context.prototype.toInspect = function() {
    var round;
    round = function(value) {
      if (parseInt(value) === value) {
        return parseInt(value);
      }
      return Utils.round(value, 1);
    };
    return "<Context id:" + this.id + " name:" + this._name + " " + (round(this.width)) + "x" + (round(this.height)) + ">";
  };

  return Context;

})(Element);
