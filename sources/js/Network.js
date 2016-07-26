
/*
GET '/', {}, (response) -> , (error)->
POST '/', {}, (response) -> , (error)->
DEL '/', {}, (response) -> , (error)->
PUT '/', {}, (response) -> , (error)->
 */
var DEL, GET, Network, POST, PUT,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

GET = function() {
  if (arguments.length === 0) {
    return;
  }
  return Network._inline('get', arguments);
};

POST = function() {
  if (arguments.length === 0) {
    return;
  }
  return Network._inline('post', arguments);
};

DEL = function() {
  if (arguments.length === 0) {
    return;
  }
  return Network._inline('del', arguments);
};

PUT = function() {
  if (arguments.length === 0) {
    return;
  }
  return Network._inline('put', arguments);
};

Network = (function(_super) {
  __extends(Network, _super);

  function Network(parameters) {
    var item, xhttp, _this;
    this.url = false;
    this.type = false;
    this.parameters = '';
    this._parameters = {};
    this.beforeCallback = false;
    this.thenCallback = false;
    this.successCallback = false;
    this.errorCallback = false;
    this.files = false;
    this.username = '';
    this.password = '';
    this.response = {};
    this.async = true;
    if (parameters === void 0) {
      return;
    }
    if (parameters.get !== void 0) {
      this.url = parameters.get;
      this.type = 'GET';
    } else if (parameters.post !== void 0) {
      this.url = parameters.post;
      this.type = 'POST';
    } else if (parameters.put !== void 0) {
      this.url = parameters.put;
      this.type = 'PUT';
    } else if (parameters.del !== void 0) {
      this.url = parameters.del;
      this.type = 'DELETE';
    } else if (parameters["delete"] !== void 0) {
      this.url = parameters["delete"];
      this.type = 'DELETE';
    }
    if (parameters.async !== void 0) {
      this.async = parameters.async;
    }
    if (parameters.parameters !== void 0) {
      if (typeof parameters.parameters !== 'object') {
        return;
      }
      this._parameters = parameters.parameters;
      this.parameters = Object.keys(parameters.parameters).map(function(k) {
        return encodeURIComponent(k) + '=' + encodeURIComponent(parameters.parameters[k]);
      }).join('&');
    }
    if (parameters.before !== void 0) {
      this.beforeCallback = parameters.before;
    }
    if (parameters.then !== void 0) {
      this.thenCallback = parameters.then;
    }
    if (parameters.success !== void 0) {
      this.successCallback = parameters.success;
    }
    if (parameters.username !== void 0) {
      this.username = parameters.username;
    }
    if (parameters.password !== void 0) {
      this.password = parameters.password;
    }
    if (parameters.error !== void 0) {
      this.errorCallback = parameters.error;
    }
    if (!this.url && !this.type) {
      return;
    }
    if (this.beforeCallback) {
      this.beforeCallback();
    }
    xhttp = new XMLHttpRequest;
    if (parameters.files !== void 0) {
      this.files = parameters.files;
      _this = this;
      xhttp.upload.addEventListener(Event.Progress, function(event) {
        if (event.lengthComputable) {
          event.progress = event.loaded / event.total;
        } else {
          event.progress = void 0;
        }
        _this.emit(Event.Progress, event);
      });
      xhttp.upload.addEventListener(Event.Loaded, function(event) {
        event.progress = 100;
        _this.emit(Event.Load, event);
      });
      xhttp.upload.addEventListener(Event.Error, function(event) {
        _this.emit(Event.Error, event);
      });
      xhttp.upload.addEventListener(Event.Abort, function(event) {
        _this.emit(Event.Abort, event);
      });
    }
    xhttp.onreadystatechange = (function() {
      var err;
      this.response.state = xhttp.readyState;
      this.response.status = xhttp.status;
      if (xhttp.readyState === 4) {
        this.response.raw = xhttp.responseText;
        if (xhttp.status.toString()[0] === '2') {
          if (this.successCallback) {
            try {
              this.response.data = JSON.parse(xhttp.responseText);
            } catch (_error) {
              err = _error;
              this.response.data = xhttp.responseText;
            }
            this.successCallback(this.response);
            this.emit(Event.Success, this.response);
          }
        } else {
          if (this.errorCallback) {
            if (xhttp.responseText !== void 0) {
              try {
                this.response.data = JSON.parse(xhttp.responseText);
              } catch (_error) {
                err = _error;
                this.response.data = xhttp.responseText;
              }
            }
            this.errorCallback(this.response);
            this.emit(Event.Error, this.response);
          }
        }
        if (this.thenCallback) {
          this.thenCallback(this.response);
        }
        this.emit(Event.Response, this.response);
      }
    }).bind(this);
    if (this.type === 'GET') {
      if (this.parameters !== '') {
        this.url = this.url + '?' + this.parameters;
      }
    }
    xhttp.open(this.type, this.url, this.async, this.username, this.password);
    parameters = void 0;
    if (this.type !== 'GET') {
      parameters = this.parameters;
      if (this.type === 'POST' && this.files) {
        parameters = new FormData;
        for (item in this._parameters) {
          parameters.append(item, this._parameters[item]);
        }
        for (item in this.files) {
          parameters.append(item, this.files[item]);
        }
      } else {
        xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      }
    }
    xhttp.send(parameters);
    return;
  }

  Network.prototype._kind = 'Network';

  Network.prototype.onSuccess = function(cb) {
    return this.on(Event.Success, cb);
  };

  Network.prototype.onError = function(cb) {
    return this.on(Event.Error, cb);
  };

  Network.prototype.onResponse = function(cb) {
    return this.on(Event.Response, cb);
  };

  Network.prototype.onProgress = function(cb) {
    return this.on(Event.Progress, cb);
  };

  Network.prototype.onAbort = function(cb) {
    return this.on(Event.Abort, cb);
  };

  Network.prototype.onLoad = function(cb) {
    return this.on(Event.Load, cb);
  };

  Network.prototype.onLoaded = function(cb) {
    return this.on(Event.Loaded, cb);
  };

  Network.prototype.onDone = function(cb) {
    return this.on(Event.Loaded, cb);
  };

  return Network;

})(Element);

Network._inline = function(method, args) {
  var requestObject;
  requestObject = {};
  if (Utils.isString(args[0])) {
    requestObject[method] = args[0];
  }
  if (args[1] && Utils.isObject(args[1]) && !Utils.isFunction(args[1])) {
    requestObject.parameters = args[1];
    if (args[2] && Utils.isFunction(args[2])) {
      requestObject.success = args[2];
      if (args[3] && Utils.isFunction(args[3])) {
        requestObject.error = args[3];
      }
    }
  } else if (args[1] && Utils.isFunction(args[1])) {
    requestObject.success = args[1];
    if (args[2] && Utils.isFunction(args[2])) {
      requestObject.error = args[2];
    }
  }
  return Network(requestObject);
};
