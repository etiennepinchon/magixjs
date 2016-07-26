var Animation, AnimatorClassBezierPresets, AnimatorClasses, evaluateRelativeProperty, isRelativeProperty, numberRE, relativePropertyRE,
  __slice = [].slice,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

AnimatorClasses = {
  "linear": LinearAnimator,
  "bezier-curve": BezierCurveAnimator,
  "spring-rk4": SpringRK4Animator,
  "spring-dho": SpringDHOAnimator
};

AnimatorClasses["spring"] = AnimatorClasses["spring-rk4"];

AnimatorClasses["cubic-bezier"] = AnimatorClasses["bezier-curve"];

AnimatorClassBezierPresets = ["ease", "ease-in", "easein", "ease-out", "easeout", "ease-in-out", "easeinout"];

numberRE = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/;

relativePropertyRE = new RegExp('^(?:([+-])=|)(' + numberRE.source + ')([a-z%]*)$', 'i');

isRelativeProperty = function(v) {
  return Utils.isString(v) && relativePropertyRE.test(v);
};

evaluateRelativeProperty = function(target, k, v) {
  var match, number, rest, sign, unit, _ref;
  _ref = relativePropertyRE.exec(v), match = _ref[0], sign = _ref[1], number = _ref[2], unit = _ref[3], rest = 5 <= _ref.length ? __slice.call(_ref, 4) : [];
  if (sign) {
    return target[k] + (sign + 1) * number;
  }
  return +number;
};

Animation = (function(_super) {
  __extends(Animation, _super);

  function Animation(options) {
    var finishCallback;
    if (options == null) {
      options = {};
    }
    this._updateColorValue = __bind(this._updateColorValue, this);
    this._updateNumberValue = __bind(this._updateNumberValue, this);
    this._updateValues = __bind(this._updateValues, this);
    this._update = __bind(this._update, this);
    this._start = __bind(this._start, this);
    this.start = __bind(this.start, this);
    if (options.props) {
      options.properties = options.props;
    }
    if (options.duration) {
      options.time = options.duration;
    }
    options = Defaults.get("Animation", options);
    Animation.__super__.constructor.call(this, options);
    this.options = Utils.clone(Utils.defaults(options, {
      view: null,
      properties: {},
      curve: "linear",
      curveOptions: {},
      time: 0.3,
      repeat: 0,
      delay: 0,
      debug: false,
      colorModel: "husl"
    }));
    finishCallback = false;
    if (options.then !== void 0) {
      finishCallback = options.then;
    }
    if (options.finish !== void 0) {
      finishCallback = options.finish;
    }
    if (options.done !== void 0) {
      finishCallback = options.done;
    }
    if (options.end !== void 0) {
      finishCallback = options.end;
    }
    if (options.finished !== void 0) {
      finishCallback = options.finished;
    }
    if (finishCallback) {
      this.on(Event.AnimationEnd, function() {
        var e;
        try {
          return finishCallback();
        } catch (_error) {
          e = _error;
          return console.error(e.toString());
        }
      });
    }
    if (options.origin) {
      console.warn("Animation.origin: please use view.originX and view.originY");
    }
    this.options.properties = Animation.filterAnimatableProperties(this.options.properties);
    this._parseAnimatorOptions();
    this._originalState = this._currentState();
    this._repeatCounter = this.options.repeat;
  }

  Animation.define("isAnimating", {
    get: function() {
      return __indexOf.call(this.options.view.context.animations, this) >= 0;
    }
  });

  Animation.prototype.start = function() {
    var AnimatorClass, animation, k, property, v, _ref, _ref1, _ref2;
    if (this.options.view === null) {
      console.error("Animation: missing view");
    }
    AnimatorClass = this._animatorClass();
    if (this.options.debug) {
      console.log("Animation.duration " + this.options.time);
      console.log("Animation.start " + AnimatorClass.name, this.options.curveOptions);
    }
    this._animator = new AnimatorClass(this.options.curveOptions);
    this._target = this.options.view;
    this._stateA = this._currentState();
    this._stateB = {};
    _ref = this.options.properties;
    for (k in _ref) {
      v = _ref[k];
      if (Utils.isFunction(v)) {
        v = v(this.options.view, k);
      } else if (isRelativeProperty(v)) {
        v = evaluateRelativeProperty(this._target, k, v);
      }
      if (this._stateA[k] !== v) {
        this._stateB[k] = v;
      }
    }
    if (Utils.keys(this._stateA).length === 0) {
      console.warn("Animation: nothing to animate, no animatable properties");
      return false;
    }
    if (Utils.isEqual(this._stateA, this._stateB)) {
      console.warn("Animation: nothing to animate, all properties are equal to what it is now");
      return false;
    }
    _ref1 = this._target.animatingProperties();
    for (property in _ref1) {
      animation = _ref1[property];
      if (this._stateA.hasOwnProperty(property)) {
        animation.stop();
      }
      if (property === "x" && (this._stateA.hasOwnProperty("minX") || this._stateA.hasOwnProperty("midX") || this._stateA.hasOwnProperty("maxX"))) {
        animation.stop();
      }
      if (property === "y" && (this._stateA.hasOwnProperty("minY") || this._stateA.hasOwnProperty("midY") || this._stateA.hasOwnProperty("maxY"))) {
        animation.stop();
      }
    }
    if (this.options.debug) {
      console.log("Animation.start");
      _ref2 = this._stateB;
      for (k in _ref2) {
        v = _ref2[k];
        console.log("\t" + k + ": " + this._stateA[k] + " -> " + this._stateB[k]);
      }
    }
    if (this._repeatCounter > 0) {
      this.once("end", (function(_this) {
        return function() {
          var _ref3;
          _ref3 = _this._stateA;
          for (k in _ref3) {
            v = _ref3[k];
            _this._target[k] = v;
          }
          _this._repeatCounter--;
          return _this.start();
        };
      })(this));
    }
    if (this.options.delay) {
      Utils.delay(this.options.delay, this._start);
    } else {
      this._start();
    }
    return true;
  };

  Animation.prototype.stop = function(emit) {
    if (emit == null) {
      emit = true;
    }
    this.options.view.context.removeAnimation(this);
    if (emit) {
      this.emit("stop");
    }
    return App.Loop.off("update", this._update);
  };

  Animation.prototype.reverse = function() {
    var animation, options;
    options = Utils.clone(this.options);
    options.properties = this._originalState;
    animation = new Animation(options);
    return animation;
  };

  Animation.prototype.copy = function() {
    return new Animation(Utils.clone(this.options));
  };

  Animation.prototype.revert = function() {
    return this.reverse();
  };

  Animation.prototype.inverse = function() {
    return this.reverse();
  };

  Animation.prototype.invert = function() {
    return this.reverse();
  };

  Animation.prototype.emit = function(event) {
    Animation.__super__.emit.apply(this, arguments);
    return this.options.view.emit(event, this);
  };

  Animation.prototype.animatingProperties = function() {
    return Utils.keys(this._stateA);
  };

  Animation.prototype._start = function() {
    var k, v, _ref, _results;
    this.options.view.context.addAnimation(this);
    this.emit("start");
    App.Loop.on("update", this._update);
    this._valueUpdaters = {};
    _ref = this._stateB;
    _results = [];
    for (k in _ref) {
      v = _ref[k];
      if (Color.isColorObject(v) || Color.isColorObject(this._stateA[k])) {
        _results.push(this._valueUpdaters[k] = this._updateColorValue);
      } else {
        _results.push(this._valueUpdaters[k] = this._updateNumberValue);
      }
    }
    return _results;
  };

  Animation.prototype._update = function(delta) {
    var emit;
    if (this._animator.finished()) {
      this._updateValues(1);
      this.stop(emit = false);
      this.emit("end");
      return this.emit("stop");
    } else {
      return this._updateValues(this._animator.next(delta));
    }
  };

  Animation.prototype._updateValues = function(value) {
    var k, v, _ref;
    _ref = this._stateB;
    for (k in _ref) {
      v = _ref[k];
      this._valueUpdaters[k](k, value);
    }
    return null;
  };

  Animation.prototype._updateNumberValue = function(key, value) {
    return this._target[key] = Utils.mapRange(value, 0, 1, this._stateA[key], this._stateB[key]);
  };

  Animation.prototype._updateColorValue = function(key, value) {
    return this._target[key] = Color.mix(this._stateA[key], this._stateB[key], value, false, this.options.colorModel);
  };

  Animation.prototype._currentState = function() {
    return Utils.pick(this.options.view, Utils.keys(this.options.properties));
  };

  Animation.prototype._animatorClass = function() {
    var animatorClassName, parsedCurve;
    parsedCurve = Utils.parseFunction(this.options.curve);
    animatorClassName = parsedCurve.name.toLowerCase();
    if (AnimatorClasses.hasOwnProperty(animatorClassName)) {
      return AnimatorClasses[animatorClassName];
    }
    if (__indexOf.call(AnimatorClassBezierPresets, animatorClassName) >= 0) {
      return BezierCurveAnimator;
    }
    return LinearAnimator;
  };

  Animation.prototype._parseAnimatorOptions = function() {
    var animatorClass, animatorClassName, i, k, parsedCurve, value, _i, _j, _len, _len1, _ref, _ref1, _results;
    animatorClass = this._animatorClass();
    parsedCurve = Utils.parseFunction(this.options.curve);
    animatorClassName = parsedCurve.name.toLowerCase();
    if (animatorClass === LinearAnimator || animatorClass === BezierCurveAnimator) {
      if (Utils.isString(this.options.curveOptions) || Utils.isArray(this.options.curveOptions)) {
        this.options.curveOptions = {
          values: this.options.curveOptions
        };
      }
      this.options.curveOptions.time = this.options.time;
    }
    if ((animatorClass === BezierCurveAnimator) && __indexOf.call(AnimatorClassBezierPresets, animatorClassName) >= 0) {
      this.options.curveOptions.values = animatorClassName;
      this.options.curveOptions.time = this.options.time;
    }
    if (parsedCurve.args.length) {
      if (animatorClass === BezierCurveAnimator) {
        this.options.curveOptions.values = parsedCurve.args.map(function(v) {
          return parseFloat(v) || 0;
        });
      }
      if (animatorClass === SpringRK4Animator) {
        _ref = ["tension", "friction", "velocity", "tolerance"];
        for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
          k = _ref[i];
          value = parseFloat(parsedCurve.args[i]);
          if (value) {
            this.options.curveOptions[k] = value;
          }
        }
      }
      if (animatorClass === SpringDHOAnimator) {
        _ref1 = ["stiffness", "damping", "mass", "tolerance"];
        _results = [];
        for (i = _j = 0, _len1 = _ref1.length; _j < _len1; i = ++_j) {
          k = _ref1[i];
          value = parseFloat(parsedCurve.args[i]);
          if (value) {
            _results.push(this.options.curveOptions[k] = value);
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      }
    }
  };

  Animation.filterAnimatableProperties = function(properties) {
    var animatableProperties, k, v;
    animatableProperties = {};
    for (k in properties) {
      v = properties[k];
      if (Utils.isNumber(v) || Utils.isFunction(v) || isRelativeProperty(v) || Color.isColorObject(v) || v === null) {
        animatableProperties[k] = v;
      } else if (Utils.isString(v)) {
        if (Color.isColorString(v)) {
          animatableProperties[k] = new Color(v);
        }
      }
    }
    return animatableProperties;
  };

  Animation.prototype.toInspect = function() {
    return "<Animation id:" + this.id + " isAnimating:" + this.isAnimating + " [" + (Utils.keys(this.options.properties)) + "]>";
  };

  Animation.prototype.onAnimationStart = function(cb) {
    return this.on(Event.AnimationStart, cb);
  };

  Animation.prototype.onAnimationStop = function(cb) {
    return this.on(Event.AnimationStop, cb);
  };

  Animation.prototype.onAnimationEnd = function(cb) {
    return this.on(Event.AnimationEnd, cb);
  };

  Animation.prototype.onAnimationDidStart = function(cb) {
    return this.on(Event.AnimationDidStart, cb);
  };

  Animation.prototype.onAnimationDidStop = function(cb) {
    return this.on(Event.AnimationDidStop, cb);
  };

  Animation.prototype.onAnimationDidEnd = function(cb) {
    return this.on(Event.AnimationDidEnd, cb);
  };

  return Animation;

})(Element);
