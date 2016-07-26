
/*

th = new Thread ->
	 * Compute
	i = 'd'
	setInterval (->
		self.postMessage('stuff')
		return
	), 400

th.onReceive (e) ->
	console.log 'yo'

th.onError (e) ->
	console.log e
 */
var Thread,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Thread = (function(_super) {
  __extends(Thread, _super);

  function Thread(properties) {
    if (properties === void 0) {
      properties = {};
    }
    if (!window.Worker) {
      this.emit(Event.Unsupported);
      if (properties.unsupported) {
        properties.unsupported();
      }
      return false;
    }
    if (Utils.isFunction(properties)) {
      this.process = properties;
      return;
    }
    if (properties.process) {
      this.process = properties.process;
      return;
    }
    if (properties.receive) {
      this.onReceive = properties.receive;
      return;
    }
    this;
  }

  Thread.prototype._kind = 'Thread';

  Thread.define('process', {
    get: function() {
      return this._process;
    },
    set: function(fn) {
      var func, workerData, _this;
      window.send = window.postMessage;
      window.URL = window.URL || window.webkitURL;
      func = fn.toString().match(/function[^{]+\{([\s\S]*)\}$/)[1];
      workerData = new Blob(['self.send = postMessage;\n' + func], {
        type: 'text/javascript'
      });
      if (this.worker) {
        this.end();
      }
      this.worker = new Worker(window.URL.createObjectURL(workerData));
      _this = this;
      this.worker.addEventListener('message', function(e) {
        return _this.emit(Event.Receive, e);
      }, false);
      return this.worker.addEventListener('error', function(e) {
        return _this.emit(Event.Error, e);
      }, false);
    }
  });

  Thread.prototype.onUnsupported = function(cb) {
    return this.on(Event.Unsupported, cb);
  };

  Thread.prototype.onReceive = function(cb) {
    return this.on(Event.Receive, cb);
  };

  Thread.prototype.onSend = function(cb) {
    return this.on(Event.Send, cb);
  };

  Thread.prototype.onEnd = function(cb) {
    return this.on(Event.End, cb);
  };

  Thread.prototype.onStop = function(cb) {
    return this.on(Event.End, cb);
  };

  Thread.prototype.onTerminate = function(cb) {
    return this.on(Event.End, cb);
  };

  Thread.prototype.onError = function(cb) {
    return this.on(Event.Error, cb);
  };

  return Thread;

})(Element);

Thread.prototype.send = function(message) {
  if (this.worker !== void 0) {
    this.worker.postMessage(message);
    this.emit(Event.Send, message);
  }
};

Thread.prototype.end = function() {
  if (this.worker !== void 0) {
    this.worker.terminate();
    delete this.worker;
    this.worker = void 0;
    this.emit(Event.End);
  }
};

Thread.prototype.stop = function() {
  this.end();
};

Thread.prototype.terminate = function() {
  this.terminate();
};
