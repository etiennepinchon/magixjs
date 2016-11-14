var Thread,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Thread = (function(_super) {
  __extends(Thread, _super);

  Thread.prototype._kind = 'Thread';

  function Thread(properties) {
    if (properties === NULL) {
      properties = {};
    }
    if (!window.Worker) {
      if (properties.unsupported) {
        properties.unsupported();
      }
      this.emit(Event.Unsupported);
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

  Thread.define('process', {
    get: function() {
      return this._process;
    },
    set: function(fn) {
      var func, that, workerData;
      that = this;
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
      this.worker.addEventListener('message', function(e) {
        return that.emit(Event.Receive, e);
      }, false);
      return this.worker.addEventListener(Event.Error, function(e) {
        return that.emit(Event.Error, e);
      }, false);
    }
  });

  Thread.prototype.send = function(message) {
    if (this.worker !== NULL) {
      this.worker.postMessage(message);
      this.emit(Event.Send, message);
    }
  };

  Thread.prototype.end = function() {
    if (this.worker !== NULL) {
      this.worker.terminate();
      delete this.worker;
      this.worker = NULL;
      this.emit(Event.End);
    }
  };

  Thread.prototype.stop = function() {
    this.end();
  };

  Thread.prototype.terminate = function() {
    this.terminate();
  };

  Thread.prototype.onUnsupported = function(cb) {
    this.on(Event.Unsupported, cb);
  };

  Thread.prototype.onReceive = function(cb) {
    this.on(Event.Receive, cb);
  };

  Thread.prototype.onSend = function(cb) {
    this.on(Event.Send, cb);
  };

  Thread.prototype.onEnd = function(cb) {
    this.on(Event.End, cb);
  };

  Thread.prototype.onStop = function(cb) {
    this.on(Event.End, cb);
  };

  Thread.prototype.onTerminate = function(cb) {
    this.on(Event.End, cb);
  };

  Thread.prototype.onError = function(cb) {
    this.on(Event.Error, cb);
  };

  return Thread;

})(Element);
