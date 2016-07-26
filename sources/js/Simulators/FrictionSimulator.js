var FrictionSimulator,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

FrictionSimulator = (function(_super) {
  __extends(FrictionSimulator, _super);

  function FrictionSimulator() {
    this.finished = __bind(this.finished, this);
    return FrictionSimulator.__super__.constructor.apply(this, arguments);
  }

  FrictionSimulator.prototype.setup = function(options) {
    this.options = Defaults.get("FrictionSimulator", options);
    this.options = Utils.defaults(options, {
      velocity: 0,
      position: 0
    });
    this._state = {
      x: this.options.position,
      v: this.options.velocity
    };
    return this._integrator = new Integrator((function(_this) {
      return function(state) {
        return -(_this.options.friction * state.v);
      };
    })(this));
  };

  FrictionSimulator.prototype.next = function(delta) {
    this._state = this._integrator.integrateState(this._state, delta);
    return this._state;
  };

  FrictionSimulator.prototype.finished = function() {
    return Math.abs(this._state.v) < this.options.tolerance;
  };

  return FrictionSimulator;

})(Simulator);
