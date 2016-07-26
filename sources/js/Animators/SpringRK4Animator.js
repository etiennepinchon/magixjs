var SpringRK4Animator,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

SpringRK4Animator = (function(_super) {
  __extends(SpringRK4Animator, _super);

  function SpringRK4Animator() {
    this.finished = __bind(this.finished, this);
    return SpringRK4Animator.__super__.constructor.apply(this, arguments);
  }

  SpringRK4Animator.prototype.setup = function(options) {
    this.options = Utils.defaults(options, {
      tension: 250,
      friction: 25,
      velocity: 0,
      tolerance: 1 / 10000,
      time: null
    });
    this._time = 0;
    this._value = 0;
    this._velocity = this.options.velocity;
    this._stopSpring = false;
    return this._integrator = new Integrator((function(_this) {
      return function(state) {
        return -_this.options.tension * state.x - _this.options.friction * state.v;
      };
    })(this));
  };

  SpringRK4Animator.prototype.next = function(delta) {
    var finalVelocity, net1DVelocity, netFloat, netValueIsLow, netVelocityIsLow, stateAfter, stateBefore;
    if (this.finished()) {
      return 1;
    }
    this._time += delta;
    stateBefore = {};
    stateAfter = {};
    stateBefore.x = this._value - 1;
    stateBefore.v = this._velocity;
    stateAfter = this._integrator.integrateState(stateBefore, delta);
    this._value = 1 + stateAfter.x;
    finalVelocity = stateAfter.v;
    netFloat = stateAfter.x;
    net1DVelocity = stateAfter.v;
    netValueIsLow = Math.abs(netFloat) < this.options.tolerance;
    netVelocityIsLow = Math.abs(net1DVelocity) < this.options.tolerance;
    this._stopSpring = netValueIsLow && netVelocityIsLow;
    this._velocity = finalVelocity;
    return this._value;
  };

  SpringRK4Animator.prototype.finished = function() {
    return this._stopSpring;
  };

  return SpringRK4Animator;

})(Animator);
