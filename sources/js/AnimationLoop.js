var AnimationLoop, AnimatorClassBezierPresets, AnimatorClasses, getTime,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

getTime = function() {
  return Utils.getTime() * 1000;
};

AnimationLoop = (function(_super) {
  __extends(AnimationLoop, _super);

  function AnimationLoop() {
    this.start = __bind(this.start, this);
    this.delta = 1 / 60;
    this.raf = true;
    if (Utils.webkitVersion() > 600 && Utils.webkitVersion() < 601) {
      if (Utils.isDesktop()) {
        this.raf = false;
      }
    }
    this.maximumListeners = Infinity;
  }

  AnimationLoop.prototype.start = function() {
    var animationLoop, tick, update, _timestamp;
    animationLoop = this;
    _timestamp = getTime();
    update = function() {
      var delta, timestamp;
      if (animationLoop.delta) {
        delta = animationLoop.delta;
      } else {
        timestamp = getTime();
        delta = (timestamp - _timestamp) / 1000;
        _timestamp = timestamp;
      }
      animationLoop.emit("update", delta);
      return animationLoop.emit("render", delta);
    };
    tick = function(timestamp) {
      if (animationLoop.raf) {
        update();
        return window.requestAnimationFrame(tick);
      } else {
        return window.setTimeout(function() {
          update();
          return window.requestAnimationFrame(tick);
        }, 0);
      }
    };
    return tick();
  };

  return AnimationLoop;

})(EventEmitter);

AnimatorClasses = {
  'linear': LinearAnimator,
  'bezier-curve': BezierCurveAnimator,
  'spring-rk4': SpringRK4Animator,
  'spring': SpringRK4Animator,
  'spring-dho': SpringDHOAnimator
};

AnimatorClassBezierPresets = ['ease', 'ease-in', 'ease-out', 'ease-in-out'];
