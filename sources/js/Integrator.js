var Integrator;

Integrator = (function() {
  function Integrator(_accelerationForState) {
    this._accelerationForState = _accelerationForState;
    if (!Utils.isFunction(this._accelerationForState)) {
      console.warn("Integrator: an integrator must be constructed with an acceleration function");
      this._accelerationForState = function() {
        return 0;
      };
    }
  }

  Integrator.prototype.integrateState = function(state, dt) {
    var a, b, c, d, dvdt, dxdt;
    a = this._evaluateState(state);
    b = this._evaluateStateWithDerivative(state, dt * 0.5, a);
    c = this._evaluateStateWithDerivative(state, dt * 0.5, b);
    d = this._evaluateStateWithDerivative(state, dt, c);
    dxdt = 1.0 / 6.0 * (a.dx + 2.0 * (b.dx + c.dx) + d.dx);
    dvdt = 1.0 / 6.0 * (a.dv + 2.0 * (b.dv + c.dv) + d.dv);
    state.x = state.x + dxdt * dt;
    state.v = state.v + dvdt * dt;
    return state;
  };

  Integrator.prototype._evaluateState = function(initialState) {
    var output;
    output = {};
    output.dx = initialState.v;
    output.dv = this._accelerationForState(initialState);
    return output;
  };

  Integrator.prototype._evaluateStateWithDerivative = function(initialState, dt, derivative) {
    var output, state;
    state = {};
    state.x = initialState.x + derivative.dx * dt;
    state.v = initialState.v + derivative.dv * dt;
    output = {};
    output.dx = state.v;
    output.dv = this._accelerationForState(state);
    return output;
  };

  return Integrator;

})();
