var LinearAnimator,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

LinearAnimator = (function(_super) {
  __extends(LinearAnimator, _super);

  function LinearAnimator() {
    return LinearAnimator.__super__.constructor.apply(this, arguments);
  }

  LinearAnimator.prototype.setup = function(options) {
    this.options = Utils.defaults(options, {
      time: 1,
      precision: 1 / 1000
    });
    return this._time = 0;
  };

  LinearAnimator.prototype.next = function(delta) {
    this._time += delta;
    if (this.finished()) {
      return 1;
    }
    return this._time / this.options.time;
  };

  LinearAnimator.prototype.finished = function() {
    return this._time >= this.options.time - this.options.precision;
  };

  return LinearAnimator;

})(Animator);
