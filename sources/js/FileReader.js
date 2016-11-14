var FileReader,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

FileReader = (function(_super) {
  __extends(FileReader, _super);

  FileReader.prototype._kind = 'FileReader';

  function FileReader(parameters) {
    var that;
    if (!window.FileReader) {
      if (properties.unsupported) {
        properties.unsupported();
      }
      this.emit(Event.Unsupported);
      return false;
    }
    this.reader = new window.FileReader;
    that = this;
    if (parameters === NULL) {
      parameters = {};
    }
    this.addReaderEvents();
    if (parameters.arrayBuffer) {
      this.arrayBuffer = parameters.arrayBuffer;
    } else if (parameters.binary) {
      this.binary = parameters.binary;
    } else if (parameters.base64) {
      this.base64 = parameters.base64;
    } else if (parameters.text) {
      this.text = parameters.text;
    }
    return;
  }

  FileReader.prototype.abort = function(first_argument) {
    if (this.reader !== NULL) {
      this.reader.abort();
    }
  };

  FileReader.prototype.addReaderEvents = function() {
    this.reader.addEventListener('loadstart', (function(e) {
      that.emit(Event.LoadStart, e);
      if (parameters.start) {
        return parameters.start(e);
      }
    }), false);
    this.reader.addEventListener('loadend', (function(e) {
      that.emit(Event.LoadEnd, e);
      if (parameters.end) {
        return parameters.end(e);
      }
    }), false);
    this.reader.addEventListener('progress', (function(e) {
      that.emit(Event.Progress, e);
      if (parameters.progress) {
        return parameters.progress(e);
      }
    }), false);
    this.reader.addEventListener('load', (function() {
      that.emit(Event.Load, that.reader.result);
      if (parameters.then) {
        return parameters.then(that.reader.result);
      }
    }), false);
    this.reader.addEventListener('error', (function() {
      that.emit(Event.Error, that.reader.error);
      if (parameters.error) {
        return parameters.error(that.reader.error);
      }
    }), false);
    return this.reader.addEventListener('abort', (function(e) {
      that.emit(Event.Abort, e);
      if (parameters.abort) {
        return parameters.abort(e);
      }
    }), false);
  };

  FileReader.define('arrayBuffer', {
    get: function() {
      return this._arrayBuffer;
    },
    set: function(blob) {
      this._arrayBuffer = blob;
      this.reader.readAsArrayBuffer(blob);
    }
  });

  FileReader.define('binary', {
    get: function() {
      return this._binary;
    },
    set: function(blob) {
      this._binary = blob;
      this.reader.readAsBinaryString(blob);
    }
  });

  FileReader.define('base64', {
    get: function() {
      return this._base64;
    },
    set: function(blob) {
      this._base64 = blob;
      this.reader.readAsDataURL(blob);
    }
  });

  FileReader.define('text', {
    get: function() {
      return this._text;
    },
    set: function(blob) {
      this._text = blob;
      this.reader.readAsText(blob);
    }
  });

  FileReader.prototype.onUnsupported = function(cb) {
    return this.on(Event.Unsupported, cb);
  };

  FileReader.prototype.onLoadStart = function(cb) {
    return this.on(Event.LoadStart, cb);
  };

  FileReader.prototype.onLoadEnd = function(cb) {
    return this.on(Event.LoadEnd, cb);
  };

  FileReader.prototype.onProgress = function(cb) {
    return this.on(Event.Progress, cb);
  };

  FileReader.prototype.onLoad = function(cb) {
    return this.on(Event.Load, cb);
  };

  FileReader.prototype.onLoaded = function(cb) {
    return this.on(Event.Load, cb);
  };

  FileReader.prototype.onDone = function(cb) {
    return this.on(Event.Loaded, cb);
  };

  FileReader.prototype.onAbort = function(cb) {
    return this.on(Event.Abort, cb);
  };

  FileReader.prototype.onQuit = function(cb) {
    return this.on(Event.Quit, cb);
  };

  return FileReader;

})(Element);
