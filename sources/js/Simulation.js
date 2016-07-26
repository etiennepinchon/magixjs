var Simulation, SimulatorClasses,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

Event.SimulationStart = 'simulationStart';

Event.SimulationStep = 'simulationStep';

Event.SimulationStop = 'simulationStop';

SimulatorClasses = {
  "spring": SpringSimulator,
  "friction": FrictionSimulator,
  "inertial-scroll": MomentumBounceSimulator
};

Simulation = (function(_super) {
  __extends(Simulation, _super);

  function Simulation(options) {
    var SimulatorClass;
    if (options == null) {
      options = {};
    }
    this._update = __bind(this._update, this);
    this._start = __bind(this._start, this);
    this.start = __bind(this.start, this);
    Simulation.__super__.constructor.call(this, options);
    this.options = Utils.defaults(options, {
      view: null,
      properties: {},
      model: "spring",
      modelOptions: {},
      delay: 0,
      debug: false
    });
    this._running = false;
    SimulatorClass = SimulatorClasses[this.options.model] || SpringSimulator;
    this._simulator = new SimulatorClass(this.options.modelOptions);
  }

  Simulation.prototype.animatingProperties = function() {
    return Utils.keys(this.options.properties);
  };

  Simulation.prototype.start = function() {
    var animatingProperties, animation, property, _ref;
    if (this.options.view === null) {
      console.error("Simulation: missing view");
    }
    if (this.options.debug) {
      console.log("Simulation.start " + this._simulator.constructor.name, this.options.modelOptions);
    }
    animatingProperties = this.animatingProperties();
    _ref = this.options.view.animatingProperties();
    for (property in _ref) {
      animation = _ref[property];
      if (__indexOf.call(animatingProperties, property) >= 0) {
        animation.stop();
      }
    }
    if (this.options.delay) {
      Utils.delay(this.options.delay, this._start);
    } else {
      this._start();
    }
    return true;
  };

  Simulation.prototype.stop = function(emit) {
    if (emit == null) {
      emit = true;
    }
    if (!this._running) {
      return;
    }
    this._running = false;
    this.options.view.context.removeAnimation(this);
    if (emit) {
      this.emit(Event.SimulationStop);
    }
    return App.Loop.off("update", this._update);
  };

  Simulation.prototype.emit = function(event) {
    Simulation.__super__.emit.apply(this, arguments);
    return this.options.view.emit(event, this);
  };

  Simulation.prototype._start = function() {
    if (this._running) {
      return;
    }
    this._running = true;
    this.options.view.context.addAnimation(this);
    this.emit(Event.SimulationStart);
    return App.Loop.on("update", this._update);
  };

  Simulation.prototype._update = function(delta) {
    var emit, result;
    if (this._simulator.finished()) {
      this.stop(emit = false);
      this.emit("end");
      return this.emit(Event.SimulationStop);
    } else {
      result = this._simulator.next(delta);
      return this.emit(Event.SimulationStep, result, delta);
    }
  };

  Simulation.define("simulator", {
    get: function() {
      return this._simulator;
    }
  });

  Simulation.prototype.finished = function() {
    return this._simulator.finished();
  };

  return Simulation;

})(Element);
