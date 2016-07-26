var Transition,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Transition = (function(_super) {
  __extends(Transition, _super);

  Transition.prototype._kind = 'Transition';

  function Transition(options) {
    if (options.duration) {
      options.time = options.duration;
    }
    options = Defaults.get(this._kind, options);
    Transition.__super__.constructor.call(this, options);
    this.options = Utils.clone(Utils.defaults(options, {
      properties: {},
      time: 0.3,
      delay: 0,
      view: null,
      curve: 'ease'
    }));
    if (options) {
      if (options.properties) {
        this.options.properties = options.properties;
      } else {
        this.options.properties = {};
      }
      if (options.view) {
        this.options.view = options.view;
      }
      if (options.duration) {
        this.options.duration = options.duration;
      }
      if (options.delay) {
        this.options.delay = options.delay;
      }
      if (options.curve) {
        this.options.curve = options.curve;
      }
    }
  }

  return Transition;

})(Element);

Transition.prototype.start = function(remove) {
  var that, _view;
  if (this.options.view) {
    this.options.view.style.transition = 'all ' + this.options.duration + 's ' + this.options.curve + ' ' + this.options.delay + 's';
    this.options.view.props = this.options.properties;
  } else {
    return;
  }
  if (!remove) {

  } else {
    _view = this.options.view;
    that = this;
    return Utils.delay(this.options.duration, function() {
      _view.style.transition = '';
      return that.emit('end');
    });
  }
};

Transition.prototype.disable = function() {
  if (this.options.view) {
    return this.options.view.style.transition = 'none';
  }
};

Transition.prototype.remove = function() {
  if (this.options.view) {
    return this.options.view.style.transition = '';
  }
};
