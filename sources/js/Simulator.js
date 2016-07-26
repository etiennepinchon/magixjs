var Simulator,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Simulator = (function(_super) {
  __extends(Simulator, _super);

  Simulator.define("state", {
    get: function() {
      return Utils.clone(this._state);
    },
    set: function(state) {
      return this._state = Utils.clone(state);
    }
  });

  function Simulator(options) {
    if (options == null) {
      options = {};
    }
    this._state = {
      x: 0,
      v: 0
    };
    this.options = null;
    this.setup(options);
  }

  Simulator.prototype.setup = function(options) {
    throw Error("Not implemented");
  };

  Simulator.prototype.next = function(delta) {
    throw Error("Not implemented");
  };

  Simulator.prototype.finished = function() {
    throw Error("Not implemented");
  };

  return Simulator;

})(Element);
