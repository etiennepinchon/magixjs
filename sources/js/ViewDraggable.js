var ViewDraggable,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Event.DragSessionStart = "dragsessionstart";

Event.DragSessionMove = "dragsessionmove";

Event.DragSessionEnd = "dragsessionend";

Event.DragAnimationDidStart = Event.DragAnimationStart;

Event.DragAnimationDidEnd = Event.DragAnimationEnd;

Event.DirectionLockDidStart = Event.DirectionLockStart;

"\n┌──────┐                   │\n│      │\n│      │  ───────────────▶ │ ◀────▶\n│      │\n└──────┘                   │\n\n════════  ═════════════════ ═══════\n\n  Drag         Momentum      Bounce\n";

ViewDraggable = (function(_super) {
  __extends(ViewDraggable, _super);

  ViewDraggable.define("speedX", ViewDraggable.simpleProperty("speedX", 1));

  ViewDraggable.define("speedY", ViewDraggable.simpleProperty("speedY", 1));

  ViewDraggable.define("horizontal", ViewDraggable.simpleProperty("horizontal", true));

  ViewDraggable.define("vertical", ViewDraggable.simpleProperty("vertical", true));

  ViewDraggable.define("momentumVelocityMultiplier", ViewDraggable.simpleProperty("momentumVelocityMultiplier", 800));

  ViewDraggable.define("directionLock", ViewDraggable.simpleProperty("directionLock", false));

  ViewDraggable.define("directionLockThreshold", ViewDraggable.simpleProperty("directionLockThreshold", {
    x: 10,
    y: 10
  }));

  ViewDraggable.define("propagateEvent", ViewDraggable.simpleProperty("propagateEvent", true));

  ViewDraggable.define("constraints", {
    get: function() {
      return this._constraints;
    },
    set: function(value) {
      if (value && Utils.isObject(value)) {
        value = Utils.pick(value, ["x", "y", "width", "height"]);
        value = Utils.defaults(value, {
          x: 0,
          y: 0,
          width: 0,
          height: 0
        });
        this._constraints = value;
      } else {
        this._constraints = {
          x: 0,
          y: 0,
          width: 0,
          height: 0
        };
      }
      if (this._constraints) {
        return this._updateSimulationConstraints(this._constraints);
      }
    }
  });

  ViewDraggable.define("isDragging", {
    get: function() {
      return this._isDragging || false;
    }
  });

  ViewDraggable.define("isAnimating", {
    get: function() {
      return this._isAnimating || false;
    }
  });

  ViewDraggable.define("isMoving", {
    get: function() {
      return this._isMoving || false;
    }
  });

  ViewDraggable.define("viewStartPoint", {
    get: function() {
      return this._viewStartPoint || this.view.point;
    }
  });

  ViewDraggable.define("cursorStartPoint", {
    get: function() {
      return this._cursorStartPoint || {
        x: 0,
        y: 0
      };
    }
  });

  ViewDraggable.define("viewCursorOffset", {
    get: function() {
      return this._viewCursorOffset || {
        x: 0,
        y: 0
      };
    }
  });

  ViewDraggable.define("offset", {
    get: function() {
      var offset;
      if (!this._correctedViewStartPoint) {
        return {
          x: 0,
          y: 0
        };
      }
      return offset = {
        x: this.view.x - this._correctedViewStartPoint.x,
        y: this.view.y - this._correctedViewStartPoint.y
      };
    }
  });

  function ViewDraggable(view) {
    var options;
    this.view = view;
    this._stopSimulation = __bind(this._stopSimulation, this);
    this._onSimulationStop = __bind(this._onSimulationStop, this);
    this._onSimulationStep = __bind(this._onSimulationStep, this);
    this._touchEnd = __bind(this._touchEnd, this);
    this._touchMove = __bind(this._touchMove, this);
    this._touchStart = __bind(this._touchStart, this);
    this._updateViewPosition = __bind(this._updateViewPosition, this);
    this.touchStart = __bind(this.touchStart, this);
    options = Defaults.get("ViewDraggable", {});
    ViewDraggable.__super__.constructor.call(this, options);
    Utils.extend(this, options);
    this.enabled = true;
    this._eventBuffer = new EventBuffer;
    this._constraints = null;
    this._ignoreUpdateViewPosition = true;
    this.attach();
  }

  ViewDraggable.prototype.attach = function() {
    this.view.on(Gesture.TapStart, this.touchStart);
    this.view.on("change:x", this._updateViewPosition);
    return this.view.on("change:y", this._updateViewPosition);
  };

  ViewDraggable.prototype.remove = function() {
    this.view.off(Gesture.TapStart, this.touchStart);
    this.view.off(Gesture.Pan, this._touchMove);
    return this.view.off(Gesture.PanEnd, this._touchEnd);
  };

  ViewDraggable.prototype.updatePosition = function(point) {
    return point;
  };

  ViewDraggable.prototype.touchStart = function(event) {
    return this._touchStart(event);
  };

  ViewDraggable.prototype._updateViewPosition = function() {
    if (this._ignoreUpdateViewPosition === true) {
      return;
    }
    return this._point = this.view.point;
  };

  ViewDraggable.prototype._touchStart = function(event) {
    var animation, properties, touchEvent, _i, _len, _ref;
    Event.wrap(document).addEventListener(Gesture.Pan, this._touchMove);
    Event.wrap(document).addEventListener(Gesture.TapEnd, this._touchEnd);
    this._isMoving = this.isAnimating;
    _ref = this.view.animations();
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      animation = _ref[_i];
      properties = animation.options.properties;
      if (properties.hasOwnProperty("x") || properties.hasOwnProperty("y")) {
        animation.stop();
      }
    }
    this._stopSimulation();
    this._resetdirectionLock();
    event.preventDefault();
    if (this.propagateEvent === false) {
      event.stopPropagation();
    }
    touchEvent = Event.touchEvent(event);
    this._eventBuffer.push({
      x: touchEvent.clientX,
      y: touchEvent.clientY,
      t: Date.now()
    });
    this._viewStartPoint = this.view.point;
    this._correctedViewStartPoint = this.view.point;
    if (this.constraints && this.bounce) {
      this._correctedViewStartPoint = this._constrainPosition(this._correctedViewStartPoint, this.constraints, 1 / this.overdragScale);
    }
    this._cursorStartPoint = {
      x: touchEvent.clientX,
      y: touchEvent.clientY
    };
    this._viewCursorOffset = {
      x: touchEvent.clientX - this._correctedViewStartPoint.x,
      y: touchEvent.clientY - this._correctedViewStartPoint.y
    };
    this._point = this._correctedViewStartPoint;
    this._ignoreUpdateViewPosition = false;
    return this.emit(Event.DragSessionStart, event);
  };

  ViewDraggable.prototype._touchMove = function(event) {
    var offset, point, scaleX, scaleY, touchEvent;
    if (!this.enabled) {
      return;
    }
    if (!this._point) {
      this.touchStart(event);
    }
    this._lastEvent = event;
    event.preventDefault();
    if (this.propagateEvent === false) {
      event.stopPropagation();
    }
    touchEvent = Event.touchEvent(event);
    this._eventBuffer.push({
      x: touchEvent.clientX,
      y: touchEvent.clientY,
      t: Date.now()
    });
    point = Utils.clone(this._point);
    scaleX = this.view.scale * this.view.scaleX;
    scaleY = this.view.scale * this.view.scaleY;
    if (this.horizontal) {
      point.x = this._point.x + (event.delta.x * scaleX * this.speedX);
    }
    if (this.vertical) {
      point.y = this._point.y + (event.delta.y * scaleY * this.speedY);
    }
    this._point = Utils.clone(point);
    if (this._constraints) {
      point = this._constrainPosition(point, this._constraints, this.overdragScale);
    }
    if (this.directionLock) {
      if (!this._directionLockEnabledX && !this._directionLockEnabledY) {
        offset = event.offset;
        offset.x = offset.x * this.speedX * this.view.scaleX * this.view.scale;
        offset.y = offset.y * this.speedY * this.view.scaleY * this.view.scale;
        this._updatedirectionLock(offset);
        return;
      } else {
        if (this._directionLockEnabledX) {
          point.x = this._viewStartPoint.x;
        }
        if (this._directionLockEnabledY) {
          point.y = this._viewStartPoint.y;
        }
      }
    }
    if (point.x !== this._viewStartPoint.x || point.y !== this._viewStartPoint.y) {
      if (!this._isDragging) {
        this._isDragging = true;
        this._isMoving = true;
        this.emit(Event.DragStart, event);
      }
    }
    if (this.isDragging) {
      this.emit(Event.DragWillMove, event);
    }
    if (this.pixelAlign) {
      if (this.horizontal) {
        point.x = parseInt(point.x);
      }
      if (this.vertical) {
        point.y = parseInt(point.y);
      }
    }
    this._ignoreUpdateViewPosition = true;
    this.view.point = this.updatePosition(point);
    this._ignoreUpdateViewPosition = false;
    if (this.isDragging) {
      this.emit(Event.Move, this.view.point);
      this.emit(Event.DragDidMove, event);
    }
    return this.emit(Event.DragSessionMove, event);
  };

  ViewDraggable.prototype._touchEnd = function(event) {
    Event.wrap(document).removeEventListener(Gesture.Pan, this._touchMove);
    Event.wrap(document).removeEventListener(Gesture.TapEnd, this._touchEnd);
    if (this.propagateEvent === false) {
      event.stopPropagation();
    }
    this._startSimulation();
    this.emit(Event.DragSessionEnd, event);
    if (this._isDragging) {
      this.emit(Event.DragEnd, event);
    }
    this._isDragging = false;
    return this._ignoreUpdateViewPosition = true;
  };

  ViewDraggable.define("constraintsOffset", {
    get: function() {
      var constrainedPoint, maxX, maxY, minX, minY, offset, point, _ref;
      if (!this.constraints) {
        return {
          x: 0,
          y: 0
        };
      }
      _ref = this._calculateConstraints(this.constraints), minX = _ref.minX, maxX = _ref.maxX, minY = _ref.minY, maxY = _ref.maxY;
      point = this.view.point;
      constrainedPoint = {
        x: Utils.clamp(point.x, minX, maxX),
        y: Utils.clamp(point.y, minY, maxY)
      };
      offset = {
        x: point.x - constrainedPoint.x,
        y: point.y - constrainedPoint.y
      };
      return offset;
    }
  });

  ViewDraggable.define("isBeyondConstraints", {
    get: function() {
      var constraintsOffset;
      constraintsOffset = this.constraintsOffset;
      if (constraintsOffset.x !== 0) {
        return true;
      }
      if (constraintsOffset.y !== 0) {
        return true;
      }
      return false;
    }
  });

  ViewDraggable.prototype._clampAndScale = function(value, min, max, scale) {
    if (value < min) {
      value = min + (value - min) * scale;
    }
    if (value > max) {
      value = max + (value - max) * scale;
    }
    return value;
  };

  ViewDraggable.prototype._calculateConstraints = function(bounds) {
    var constraints;
    if (!bounds) {
      return constraints = {
        minX: Infinity,
        maxX: Infinity,
        minY: Infinity,
        maxY: Infinity
      };
    }
    if (bounds.width < this.view.width) {
      bounds.width = this.view.width;
    }
    if (bounds.height < this.view.height) {
      bounds.height = this.view.height;
    }
    constraints = {
      minX: Utils.frameGetMinX(bounds),
      maxX: Utils.frameGetMaxX(bounds),
      minY: Utils.frameGetMinY(bounds),
      maxY: Utils.frameGetMaxY(bounds)
    };
    constraints.maxX -= this.view.width;
    constraints.maxY -= this.view.height;
    return constraints;
  };

  ViewDraggable.prototype._constrainPosition = function(proposedPoint, bounds, scale) {
    var maxX, maxY, minX, minY, point, _ref;
    _ref = this._calculateConstraints(this._constraints), minX = _ref.minX, maxX = _ref.maxX, minY = _ref.minY, maxY = _ref.maxY;
    if (this.overdrag) {
      point = {
        x: this._clampAndScale(proposedPoint.x, minX, maxX, scale),
        y: this._clampAndScale(proposedPoint.y, minY, maxY, scale)
      };
    } else {
      point = {
        x: Utils.clamp(proposedPoint.x, minX, maxX),
        y: Utils.clamp(proposedPoint.y, minY, maxY)
      };
    }
    if (this.speedX === 0 || this.horizontal === false) {
      point.x = proposedPoint.x;
    }
    if (this.speedY === 0 || this.vertical === false) {
      point.y = proposedPoint.y;
    }
    return point;
  };

  ViewDraggable.define("velocity", {
    get: function() {
      if (this.isAnimating) {
        return this._calculateSimulationVelocity();
      }
      return this._eventBuffer.velocity;
      return {
        x: 0,
        y: 0
      };
    }
  });

  ViewDraggable.define("angle", {
    get: function() {
      return this._eventBuffer.angle;
    }
  });

  ViewDraggable.define("direction", {
    get: function() {
      var velocity;
      velocity = this.velocity;
      if (Math.abs(velocity.x) > Math.abs(velocity.y)) {
        if (velocity.x > 0) {
          return "right";
        }
        return "left";
      } else {
        if (velocity.y > 0) {
          return "down";
        }
        return "up";
      }
    }
  });

  ViewDraggable.prototype.calculateVelocity = function() {
    return this.velocity;
  };

  ViewDraggable.prototype._calculateSimulationVelocity = function() {
    var velocity, xFinished, yFinished;
    xFinished = this._simulation.x.finished();
    yFinished = this._simulation.y.finished();
    velocity = {
      x: 0,
      y: 0
    };
    if (!xFinished) {
      velocity.x = this._simulation.x.simulator.state.v / this.momentumVelocityMultiplier;
    }
    if (!yFinished) {
      velocity.y = this._simulation.y.simulator.state.v / this.momentumVelocityMultiplier;
    }
    return velocity;
  };

  ViewDraggable.prototype.emit = function(eventName, event) {
    this.view.emit(eventName, event);
    return ViewDraggable.__super__.emit.call(this, eventName, event);
  };

  ViewDraggable.prototype._updatedirectionLock = function(correctedDelta) {
    this._directionLockEnabledX = Math.abs(correctedDelta.y) > this.directionLockThreshold.y;
    this._directionLockEnabledY = Math.abs(correctedDelta.x) > this.directionLockThreshold.x;
    if (this._directionLockEnabledX || this._directionLockEnabledY) {
      return this.emit(Event.DirectionLockStart, {
        x: this._directionLockEnabledX,
        y: this._directionLockEnabledY
      });
    }
  };

  ViewDraggable.prototype._resetdirectionLock = function() {
    this._directionLockEnabledX = false;
    return this._directionLockEnabledY = false;
  };

  ViewDraggable.prototype._setupSimulation = function() {
    if (this._simulation) {
      return;
    }
    this._simulation = {
      x: this._setupSimulationForAxis("x"),
      y: this._setupSimulationForAxis("y")
    };
    return this._updateSimulationConstraints(this.constraints);
  };

  ViewDraggable.prototype._setupSimulationForAxis = function(axis) {
    var properties, simulation;
    properties = {};
    properties[axis] = true;
    simulation = new Simulation({
      view: this.view,
      properties: properties,
      model: "inertial-scroll",
      modelOptions: {
        momentum: this.momentumOptions,
        bounce: this.bounceOptions
      }
    });
    simulation.on(Event.SimulationStep, (function(_this) {
      return function(state) {
        return _this._onSimulationStep(axis, state);
      };
    })(this));
    simulation.on(Event.SimulationStop, (function(_this) {
      return function(state) {
        return _this._onSimulationStop(axis, state);
      };
    })(this));
    return simulation;
  };

  ViewDraggable.prototype._updateSimulationConstraints = function(constraints) {
    var maxX, maxY, minX, minY, _ref;
    if (!this._simulation) {
      return;
    }
    if (constraints) {
      _ref = this._calculateConstraints(this._constraints), minX = _ref.minX, maxX = _ref.maxX, minY = _ref.minY, maxY = _ref.maxY;
      this._simulation.x.simulator.options = {
        min: minX,
        max: maxX
      };
      return this._simulation.y.simulator.options = {
        min: minY,
        max: maxY
      };
    } else {
      this._simulation.x.simulator.options = {
        min: -Infinity,
        max: +Infinity
      };
      return this._simulation.y.simulator.options = {
        min: -Infinity,
        max: +Infinity
      };
    }
  };

  ViewDraggable.prototype._onSimulationStep = function(axis, state) {
    var delta, maxX, maxY, minX, minY, updatePoint, _ref;
    if (axis === "x" && this.horizontal === false) {
      return;
    }
    if (axis === "y" && this.vertical === false) {
      return;
    }
    if (this.constraints) {
      if (this.bounce) {
        delta = state.x - this.view[axis];
      } else {
        _ref = this._calculateConstraints(this._constraints), minX = _ref.minX, maxX = _ref.maxX, minY = _ref.minY, maxY = _ref.maxY;
        if (axis === "x") {
          delta = Utils.clamp(state.x, minX, maxX) - this.view[axis];
        }
        if (axis === "y") {
          delta = Utils.clamp(state.x, minY, maxY) - this.view[axis];
        }
      }
    } else {
      delta = state.x - this.view[axis];
    }
    updatePoint = this.view.point;
    if (axis === "x") {
      updatePoint[axis] = updatePoint[axis] + delta;
    }
    if (axis === "y") {
      updatePoint[axis] = updatePoint[axis] + delta;
    }
    this.updatePosition(updatePoint);
    this.view[axis] = this.updatePosition(updatePoint)[axis];
    return this.emit(Event.Move, this.view.point);
  };

  ViewDraggable.prototype._onSimulationStop = function(axis, state) {
    if (axis === "x" && this.horizontal === false) {
      return;
    }
    if (axis === "y" && this.vertical === false) {
      return;
    }
    if (!this._simulation) {
      return;
    }
    if (this.pixelAlign) {
      this.view[axis] = parseInt(this.view[axis]);
    }
    if (this._simulation.x.finished() && this._simulation.y.finished()) {
      return this._stopSimulation();
    }
  };

  ViewDraggable.prototype._startSimulation = function() {
    var maxX, maxY, minX, minY, startSimulationX, startSimulationY, velocity, velocityX, velocityY, _ref;
    if (!(this.momentum || this.bounce)) {
      return;
    }
    if (this.isBeyondConstraints === false && this.momentum === false) {
      return;
    }
    if (this.isBeyondConstraints === false && this.isDragging === false) {
      return;
    }
    _ref = this._calculateConstraints(this._constraints), minX = _ref.minX, maxX = _ref.maxX, minY = _ref.minY, maxY = _ref.maxY;
    startSimulationX = this.overdrag === true || (this.view.x > minX && this.view.x < maxX);
    startSimulationY = this.overdrag === true || (this.view.y > minY && this.view.y < maxY);
    if ((startSimulationX === startSimulationY && startSimulationY === false)) {
      return;
    }
    velocity = this.velocity;
    velocityX = velocity.x * this.momentumVelocityMultiplier * this.speedX * this.view.scaleX * this.view.scale;
    velocityY = velocity.y * this.momentumVelocityMultiplier * this.speedY * this.view.scaleY * this.view.scale;
    this._setupSimulation();
    this._isAnimating = true;
    this._isMoving = true;
    this._simulation.x.simulator.setState({
      x: this.view.x,
      v: velocityX
    });
    if (startSimulationX) {
      this._simulation.x.start();
    }
    this._simulation.y.simulator.setState({
      x: this.view.y,
      v: velocityY
    });
    if (startSimulationY) {
      this._simulation.y.start();
    }
    return this.emit(Event.DragAnimationStart);
  };

  ViewDraggable.prototype._stopSimulation = function() {
    var _ref, _ref1;
    this._isAnimating = false;
    if (!this._simulation) {
      return;
    }
    if ((_ref = this._simulation) != null) {
      _ref.x.stop();
    }
    if ((_ref1 = this._simulation) != null) {
      _ref1.y.stop();
    }
    this._simulation = null;
    this.emit(Event.Move, this.view.point);
    return this.emit(Event.DragAnimationEnd);
  };

  ViewDraggable.prototype.animateStop = function() {
    return this._stopSimulation();
  };

  ViewDraggable.prototype.onMove = function(cb) {
    return this.on(Event.Move, cb);
  };

  ViewDraggable.prototype.onDragStart = function(cb) {
    return this.on(Event.DragStart, cb);
  };

  ViewDraggable.prototype.onDragWillMove = function(cb) {
    return this.on(Event.DragWillMove, cb);
  };

  ViewDraggable.prototype.onDragMove = function(cb) {
    return this.on(Event.DragMove, cb);
  };

  ViewDraggable.prototype.onDragDidMove = function(cb) {
    return this.on(Event.DragDidMove, cb);
  };

  ViewDraggable.prototype.onDrag = function(cb) {
    return this.on(Event.Drag, cb);
  };

  ViewDraggable.prototype.onDragEnd = function(cb) {
    return this.on(Event.DragEnd, cb);
  };

  ViewDraggable.prototype.onDragAnimationStart = function(cb) {
    return this.on(Event.DragAnimationStart, cb);
  };

  ViewDraggable.prototype.onDragAnimationEnd = function(cb) {
    return this.on(Event.DragAnimationEnd, cb);
  };

  ViewDraggable.prototype.onDirectionLockStart = function(cb) {
    return this.on(Event.DirectionLockStart, cb);
  };

  return ViewDraggable;

})(Element);
