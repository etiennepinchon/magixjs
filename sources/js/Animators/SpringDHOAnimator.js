var SpringDHOAnimator,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

SpringDHOAnimator = (function(_super) {
  __extends(SpringDHOAnimator, _super);

  function SpringDHOAnimator() {
    this.finished = __bind(this.finished, this);
    return SpringDHOAnimator.__super__.constructor.apply(this, arguments);
  }

  SpringDHOAnimator.prototype.setup = function(options) {
    this.options = Utils.defaults(options, {
      velocity: 0,
      tolerance: 1 / 10000,
      stiffness: 50,
      damping: 2,
      mass: 0.2,
      time: null
    });
    this._time = 0;
    this._value = 0;
    return this._velocity = this.options.velocity;
  };

  SpringDHOAnimator.prototype.next = function(delta) {
    var F_damper, F_spring, b, k;
    if (this.finished()) {
      return 1;
    }
    this._time += delta;
    k = 0 - this.options.stiffness;
    b = 0 - this.options.damping;
    F_spring = k * (this._value - 1);
    F_damper = b * this._velocity;
    this._velocity += ((F_spring + F_damper) / this.options.mass) * delta;
    this._value += this._velocity * delta;
    return this._value;
  };

  SpringDHOAnimator.prototype.finished = function() {
    return this._time > 0 && Math.abs(this._velocity) < this.options.tolerance;
  };

  return SpringDHOAnimator;

})(Animator);
