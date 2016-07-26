var MomentumBounceSimulator,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

MomentumBounceSimulator = (function(_super) {
  __extends(MomentumBounceSimulator, _super);

  function MomentumBounceSimulator() {
    this.finished = __bind(this.finished, this);
    return MomentumBounceSimulator.__super__.constructor.apply(this, arguments);
  }

  MomentumBounceSimulator.prototype.setup = function(options) {
    this.options = Defaults.get("MomentumBounceSimulator", options);
    this.options = Utils.defaults(options, {
      velocity: 0,
      position: 0,
      min: 0,
      max: 0
    });
    this._frictionSimulator = new FrictionSimulator({
      friction: this.options.momentum.friction,
      tolerance: this.options.momentum.tolerance,
      velocity: this.options.velocity,
      position: this.options.position
    });
    this._springSimulator = new SpringSimulator({
      tension: this.options.bounce.tension,
      friction: this.options.bounce.friction,
      tolerance: this.options.bounce.tolerance,
      velocity: this.options.velocity,
      position: this.options.position
    });
    this._state = {
      x: this.options.position,
      v: this.options.velocity
    };
    return this._useSpring = false;
  };

  MomentumBounceSimulator.prototype.next = function(delta) {
    if (this._useSpring) {
      this._state = this._springSimulator.next(delta);
    } else {
      this._state = this._frictionSimulator.next(delta);
      this._tryTransitionToSpring(this._state);
    }
    return this._state;
  };

  MomentumBounceSimulator.prototype.finished = function() {
    if (this._useSpring) {
      return this._springSimulator.finished();
    }
    return this._frictionSimulator.finished();
  };

  MomentumBounceSimulator.prototype.setState = function(state) {
    var bound;
    this._state = {
      x: state.x,
      v: state.v
    };
    this._frictionSimulator.setState(this._state);
    if (this._isValidState()) {
      return this._tryTransitionToSpring();
    } else {
      if (this._state.x <= this.options.min) {
        bound = this.options.min;
      }
      if (this._state.x >= this.options.max) {
        bound = this.options.max;
      }
      return this._transitionToSpring(bound);
    }
  };

  MomentumBounceSimulator.prototype._tryTransitionToSpring = function(force) {
    var aboveMaxWithVelocity, belowMinWithVelocity, bound;
    belowMinWithVelocity = this._state.x < this.options.min && this._state.v <= 0;
    aboveMaxWithVelocity = this._state.x > this.options.max && this._state.v >= 0;
    if (belowMinWithVelocity || aboveMaxWithVelocity) {
      if (belowMinWithVelocity) {
        bound = this.options.min;
      }
      if (aboveMaxWithVelocity) {
        bound = this.options.max;
      }
      return this._transitionToSpring(bound);
    } else {
      return this._useSpring = false;
    }
  };

  MomentumBounceSimulator.prototype._transitionToSpring = function(bound) {
    this._useSpring = true;
    this._springSimulator.options.offset = bound;
    return this._springSimulator.setState(this._state);
  };

  MomentumBounceSimulator.prototype._isValidState = function() {
    var aboveMaxTravelingBack, belowMinTravelingBack, bound, check, friction, solution;
    belowMinTravelingBack = this._state.x < this.options.min && this._state.v > 0;
    aboveMaxTravelingBack = this._state.x > this.options.max && this._state.v < 0;
    check = false;
    if (belowMinTravelingBack) {
      bound = this.options.min;
      check = true;
    } else if (aboveMaxTravelingBack) {
      bound = this.options.max;
      check = true;
    }
    if (check) {
      friction = this._frictionSimulator.options.friction;
      solution = 1 - (friction * (bound - this._state.x)) / this._state.v;
      return solution > 0;
    }
    return true;
  };

  return MomentumBounceSimulator;

})(Simulator);
