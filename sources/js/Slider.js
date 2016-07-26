var Knob, Slider,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Event.SliderValueChange = "sliderValueChange";

Knob = (function(_super) {
  __extends(Knob, _super);

  function Knob(options) {
    Knob.__super__.constructor.call(this, options);
  }

  Knob.define("constrained", Knob.simpleProperty("constrained", false));

  return Knob;

})(View);

Slider = (function(_super) {
  __extends(Slider, _super);

  function Slider(options) {
    if (options == null) {
      options = {};
    }
    this._updateValue = __bind(this._updateValue, this);
    this._setRadius = __bind(this._setRadius, this);
    this._updateFrame = __bind(this._updateFrame, this);
    this._updateKnob = __bind(this._updateKnob, this);
    this._updateFill = __bind(this._updateFill, this);
    this._touchEnd = __bind(this._touchEnd, this);
    this._touchStart = __bind(this._touchStart, this);
    Utils.defaults(options, {
      backgroundColor: "#ccc",
      borderRadius: 50,
      clip: false,
      width: 300,
      height: 10,
      value: 0,
      knobSize: 30
    });
    if (options.hitArea == null) {
      options.hitArea = options.knobSize;
    }
    this.knob = new Knob({
      backgroundColor: "#fff",
      shadowY: 1,
      shadowBlur: 3,
      shadowColor: "rgba(0,0,0,0.35)",
      name: "knob"
    });
    this.fill = new View({
      backgroundColor: "#333",
      width: 0,
      force2d: true,
      name: "fill",
      backgroundColor: '#179afc'
    });
    this.sliderOverlay = new View({
      backgroundColor: null,
      name: "sliderOverlay"
    });
    Slider.__super__.constructor.call(this, options);
    this.knob.parent = this.fill.parent = this.sliderOverlay.parent = this;
    if (this.width > this.height) {
      this.fill.height = this.height;
    } else {
      this.fill.width = this.width;
    }
    this.fill.borderRadius = this.sliderOverlay.borderRadius = this.borderRadius;
    this.knob.draggable.enabled = true;
    this.knob.draggable.overdrag = false;
    this.knob.draggable.momentum = true;
    this.knob.draggable.momentumOptions = {
      friction: 5,
      tolerance: 0.25
    };
    this.knob.draggable.bounce = false;
    this.knob.borderRadius = this.knobSize / 2;
    if (options.value) {
      this.value = options.value;
    }
    this._updateFrame();
    this._updateKnob();
    this._updateFill();
    this.on("change:frame", this._updateFrame);
    this.on("change:borderRadius", this._setRadius);
    this.knob.on("change:size", this._updateKnob);
    this.knob.on("change:frame", this._updateValue);
    this.knob.on("change:frame", this._updateFill);
    if (!options.noknob) {
      this.fill.on(Event.TapStart, this._touchStart);
      this.fill.on(Event.TapEnd, this._touchEnd);
      this.sliderOverlay.on(Event.TapStart, this._touchStart);
      this.sliderOverlay.on(Event.TapEnd, this._touchEnd);
    } else if (options.knobSize) {
      this.knobSize = options.knobSize;
    }
  }

  Slider.prototype._kind = 'Slider';

  Slider.prototype._touchStart = function(event) {
    event.preventDefault();
    if (this.width > this.height) {
      this.value = this.valueForPoint(Event.touchEvent(event).layerX);
    } else {
      this.value = this.valueForPoint(Event.touchEvent(event).layerY);
    }
    this.knob.draggable._touchStart(event);
    return this._updateValue();
  };

  Slider.prototype._touchEnd = function(event) {
    return this._updateValue();
  };

  Slider.prototype._updateFill = function() {
    if (this.width > this.height) {
      return this.fill.width = this.knob.midX;
    } else {
      return this.fill.height = this.knob.midY;
    }
  };

  Slider.prototype._updateKnob = function() {
    if (this.width > this.height) {
      this.knob.midX = this.fill.width;
      return this.knob.absoluteCenterY();
    } else {
      this.knob.midY = this.fill.height;
      return this.knob.absoluteCenterX();
    }
  };

  Slider.prototype._updateFrame = function() {
    this.knob.draggable.constraints = {
      x: -this.knob.width / 2,
      y: -this.knob.height / 2,
      width: this.width + this.knob.width,
      height: this.height + this.knob.height
    };
    if (this.knob.constrained) {
      this.knob.draggable.constraints = {
        x: 0,
        y: 0,
        width: this.width,
        height: this.height
      };
    }
    if (this.width > this.height) {
      this.fill.height = this.height;
      this.knob.absoluteCenterY();
    } else {
      this.fill.width = this.width;
      this.knob.absoluteCenterX();
    }
    if (this.width > this.height) {
      this.knob.draggable.speedY = 0;
    } else {
      this.knob.draggable.speedX = 0;
    }
    return this.sliderOverlay.absoluteCenter();
  };

  Slider.prototype._setRadius = function() {
    var radius;
    radius = this.borderRadius;
    return this.fill.style.borderRadius = "" + radius + "px 0 0 " + radius + "px";
  };

  Slider.define("knobSize", {
    get: function() {
      return this._knobSize;
    },
    set: function(value) {
      this._knobSize = value;
      this.knob.width = this._knobSize;
      this.knob.height = this._knobSize;
      return this._updateFrame();
    }
  });

  Slider.define("hitArea", {
    get: function() {
      return this._hitArea;
    },
    set: function(value) {
      this._hitArea = value;
      if (this.width > this.height) {
        this.sliderOverlay.width = this.width + this.hitArea;
        return this.sliderOverlay.height = this.hitArea;
      } else {
        this.sliderOverlay.width = this.hitArea;
        return this.sliderOverlay.height = this.height + this.hitArea;
      }
    }
  });

  Slider.define("min", {
    get: function() {
      return this._min || 0;
    },
    set: function(value) {
      return this._min = value;
    }
  });

  Slider.define("max", {
    get: function() {
      return this._max || 1;
    },
    set: function(value) {
      return this._max = value;
    }
  });

  Slider.define("value", {
    get: function() {
      if (this.width > this.height) {
        return this.valueForPoint(this.knob.midX);
      } else {
        return this.valueForPoint(this.knob.midY);
      }
    },
    set: function(value) {
      if (this.width > this.height) {
        this.knob.midX = this.pointForValue(value);
      } else {
        this.knob.midY = this.pointForValue(value);
      }
      this._updateFill();
      return this._updateValue();
    }
  });

  Slider.prototype._updateValue = function() {
    if (this._lastUpdatedValue === this.value) {
      return;
    }
    this._lastUpdatedValue = this.value;
    this.emit("change:value", this.value);
    return this.emit(Event.SliderValueChange, this.value);
  };

  Slider.prototype.pointForValue = function(value) {
    if (this.width > this.height) {
      if (this.knob.constrained) {
        return Utils.modulate(value, [this.min, this.max], [0 + (this.knob.width / 2), this.width - (this.knob.width / 2)], true);
      } else {
        return Utils.modulate(value, [this.min, this.max], [0, this.width], true);
      }
    } else {
      if (this.knob.constrained) {
        return Utils.modulate(value, [this.min, this.max], [0 + (this.knob.height / 2), this.height - (this.knob.height / 2)], true);
      } else {
        return Utils.modulate(value, [this.min, this.max], [0, this.height], true);
      }
    }
  };

  Slider.prototype.valueForPoint = function(value) {
    if (this.width > this.height) {
      if (this.knob.constrained) {
        return Utils.modulate(value, [0 + (this.knob.width / 2), this.width - (this.knob.width / 2)], [this.min, this.max], true);
      } else {
        return Utils.modulate(value, [0, this.width], [this.min, this.max], true);
      }
    } else {
      if (this.knob.constrained) {
        return Utils.modulate(value, [0 + (this.knob.height / 2), this.height - (this.knob.height / 2)], [this.min, this.max], true);
      } else {
        return Utils.modulate(value, [0, this.height], [this.min, this.max], true);
      }
    }
  };

  Slider.prototype.animateToValue = function(value, animationOptions) {
    if (animationOptions == null) {
      animationOptions = {
        curve: "spring(300,25,0)"
      };
    }
    if (this.width > this.height) {
      animationOptions.properties = {
        x: this.pointForValue(value) - (this.knob.width / 2)
      };
    } else {
      animationOptions.properties = {
        y: this.pointForValue(value) - (this.knob.height / 2)
      };
    }
    return this.knob.animate(animationOptions);
  };

  Slider.prototype.onValueChange = function(cb) {
    return this.on(Event.SliderValueChange, cb);
  };

  return Slider;

})(View);
