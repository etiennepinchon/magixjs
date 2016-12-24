var Request, RequestEngine,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

RequestEngine = (function(_super) {
  __extends(RequestEngine, _super);

  RequestEngine.prototype._kind = 'RequestEngine';

  RequestEngine.prototype.url = NULL;

  RequestEngine.prototype.parameters = NULL;

  RequestEngine.prototype.files = NULL;

  RequestEngine.prototype.username = NULL;

  RequestEngine.prototype.password = NULL;

  RequestEngine.prototype.success = NULL;

  RequestEngine.prototype.error = NULL;

  RequestEngine.prototype.async = true;

  RequestEngine.prototype.response = {};

  RequestEngine.prototype.xhttp = new XMLHttpRequest;

  function RequestEngine(type, args) {
    var item, that;
    if (!Utils.isString(args[0])) {
      return null;
    }
    this.url = args[0];
    if (Utils.isFunction(args[1])) {
      this.success = args[1];
      if (Utils.isFunction(args[2])) {
        this.error = args[2];
      }
    } else if (Utils.isObject(args[1])) {
      if (args[1].success) {
        this.success = args[1].success;
      }
      if (args[1].error) {
        this.error = args[1].error;
      }
      if (args[1].files) {
        this.files = args[1].files;
      }
      if (args[1].async === false) {
        this.async = false;
      }
      if (args[1].then) {
        this.then = args[1].then;
      }
      if (args[1].username) {
        this.username = args[1].username;
      }
      if (args[1].password) {
        this.password = args[1].password;
      }
      if (args[1].parameters && Utils.isObject(args[1].parameters)) {
        this.parameters = args[1].parameters;
      }
      if (Utils.isFunction(args[2])) {
        this.success = args[2];
        if (Utils.isFunction(args[3])) {
          this.error = args[3];
        }
      }
    }
    if (this.parameters) {
      that = this;
      this._parameters = Object.keys(this.parameters).map(function(k) {
        return encodeURIComponent(k) + '=' + encodeURIComponent(that.parameters[k]);
      }).join('&');
    }
    if (this.files) {
      this.setUploadEvents();
    }
    this.xhttp.onreadystatechange = this.responseProcess.bind(this);
    if (type === 'GET' && this._parameters && this._parameters.length) {
      this.url = this.url + '?' + this._parameters;
    }
    this.xhttp.open(type, this.url, this.async, this.username, this.password);
    if (type === 'POST' && this.files) {
      this._parameters = new FormData;
      for (item in this.parameters) {
        console.log(this.parameters);
        this._parameters.append(item, this.parameters[item]);
      }
      for (item in this.files) {
        this._parameters.append(item, this.files[item]);
      }
    } else if (type !== 'GET') {
      this.xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    }
    this.xhttp.send(this._parameters);
    return;
  }

  RequestEngine.prototype.setUploadEvents = function() {
    var that;
    that = this;
    this.xhttp.upload.addEventListener(Event.Progress, function(event) {
      event.progress = NULL;
      if (event.lengthComputable) {
        event.progress = event.loaded / event.total;
      }
      that.emit(Event.Progress, event);
    });
    this.xhttp.upload.addEventListener(Event.Loaded, function(event) {
      event.progress = 100;
      that.emit(Event.Load, event);
    });
    this.xhttp.upload.addEventListener(Event.Error, function(event) {
      that.emit(Event.Error, event);
    });
    return this.xhttp.upload.addEventListener(Event.Abort, function(event) {
      that.emit(Event.Abort, event);
    });
  };

  RequestEngine.prototype.setHTTPResponse = function() {
    var err;
    if (this.xhttp.responseText !== NULL) {
      try {
        return this.response.data = JSON.parse(this.xhttp.responseText);
      } catch (_error) {
        err = _error;
        return this.response.data = this.xhttp.responseText;
      }
    }
  };

  RequestEngine.prototype.responseProcess = function() {
    this.response.state = this.xhttp.readyState;
    this.response.status = this.xhttp.status;
    if (this.xhttp.readyState === 4) {
      this.response.raw = this.xhttp.responseText;
      if (this.xhttp.status.toString()[0] === '2') {
        if (this.success) {
          this.setHTTPResponse();
          this.success(this.response);
          this.emit(Event.Success, this.response);
        }
      } else {
        if (this.error) {
          this.setHTTPResponse();
          this.error(this.response);
          this.emit(Event.Error, this.response);
        }
      }
      if (this.then) {
        this.then(this.response);
      }
      this.emit(Event.Response, this.response);
    }
  };

  RequestEngine.prototype.onSuccess = function(cb) {
    return this.on(Event.Success, cb);
  };

  RequestEngine.prototype.onError = function(cb) {
    return this.on(Event.Error, cb);
  };

  RequestEngine.prototype.onResponse = function(cb) {
    return this.on(Event.Response, cb);
  };

  RequestEngine.prototype.onProgress = function(cb) {
    return this.on(Event.Progress, cb);
  };

  RequestEngine.prototype.onAbort = function(cb) {
    return this.on(Event.Abort, cb);
  };

  RequestEngine.prototype.onLoad = function(cb) {
    return this.on(Event.Load, cb);
  };

  RequestEngine.prototype.onLoaded = function(cb) {
    return this.on(Event.Loaded, cb);
  };

  RequestEngine.prototype.onDone = function(cb) {
    return this.on(Event.Loaded, cb);
  };

  return RequestEngine;

})(Element);

Request = {
  get: function() {
    if (arguments.length === 0) {
      return null;
    }
    return new RequestEngine('GET', arguments);
  },
  send: function() {
    if (arguments.length === 0) {
      return null;
    }
    return new RequestEngine('POST', arguments);
  },
  "delete": function() {
    if (arguments.length === 0) {
      return null;
    }
    return new RequestEngine('DELETE', arguments);
  },
  update: function() {
    if (arguments.length === 0) {
      return null;
    }
    return new RequestEngine('PUT', arguments);
  }
};
