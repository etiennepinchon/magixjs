var Animator;

Animator = (function() {
  function Animator(options) {
    if (options == null) {
      options = {};
    }
    this.setup(options);
  }

  Animator.setup = function(options) {
    throw Error('Not implemented');
  };

  Animator.next = function(delta) {
    throw Error('Not implemented');
  };

  Animator.finished = function() {
    throw Error('Not implemented');
  };

  return Animator;

})();
