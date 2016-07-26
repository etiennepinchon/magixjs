var FileReader,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

window._FileReader = FileReader;

FileReader = (function(_super) {
  __extends(FileReader, _super);

  function FileReader(parameters) {
    var _this;
    if (parameters === void 0) {
      parameters = {};
    }
    if (!window._FileReader) {
      this.emit(Event.Unsupported);
      if (properties.unsupported) {
        properties.unsupported();
      }
      return false;
    }
    this.reader = new window._FileReader;
    _this = this;

    /*
        FileReader.onloadstart
        A handler for the loadstart event. This event is triggered each time the reading is starting.
     */
    this.reader.addEventListener('loadstart', (function(e) {
      _this.emit(Event.LoadStart, e);
      if (parameters.start) {
        parameters.start(e);
      }
    }), false);

    /*
        FileReader.onloadstart
        A handler for the loadstart event. This event is triggered each time the reading is starting.
     */
    this.reader.addEventListener('loadend', (function(e) {
      _this.emit(Event.LoadEnd, e);
      if (parameters.end) {
        parameters.end(e);
      }
    }), false);

    /*
        FileReader.onprogress
        A handler for the progress event. This event is triggered while reading a Blob content.
     */
    this.reader.addEventListener('progress', (function(e) {
      _this.emit(Event.Progress, e);
      if (parameters.progress) {
        parameters.progress(e);
      }
    }), false);

    /*
        FileReader.onload
        A handler for the load event. This event is triggered each time the reading operation is successfully completed.
     */
    this.reader.addEventListener('load', (function() {
      _this.emit(Event.Load, _this.reader.result);
      if (parameters.then) {
        parameters.then(_this.reader.result);
      } else if (parameters.done) {
        parameters.done(_this.reader.result);
      } else if (parameters.loaded) {
        parameters.loaded(_this.reader.result);
      }
    }), false);

    /*
        FileReader.onerror
        A handler for the error event. This event is triggered each time the reading operation encounter an error.
     */
    this.reader.addEventListener('error', (function() {
      _this.emit(Event.Error, _this.reader.error);
      if (parameters.error) {
        parameters.error(_this.reader.error);
      }
    }), false);

    /*
        FileReader.onerror
        A handler for the error event. This event is triggered each time the reading operation encounter an error.
     */
    this.reader.addEventListener('abort', (function(e) {
      _this.emit(Event.Abort, e);
      if (parameters.abort) {
        parameters.abort(e);
      }
    }), false);

    /*
    FileReader.readAsArrayBuffer()
    Starts reading the contents of the specified Blob, once finished, the result attribute contains an ArrayBuffer representing the file's data.
    
    FileReader.readAsBinaryString() 
    Starts reading the contents of the specified Blob, once finished, the result attribute contains the raw binary data from the file as a string.
    
    FileReader.readAsDataURL()
    Starts reading the contents of the specified Blob, once finished, the result attribute contains a data: URL representing the file's data.
    At that time, the result attribute contains the data as a URL representing the file's data as a base64 encoded string.
    
    FileReader.readAsText()
    Starts reading the contents of the specified Blob, once finished, the result attribute contains the contents of the file as a text string.
     */
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

  FileReader.prototype._kind = 'FileReader';

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

FileReader.prototype.abort = function(first_argument) {
  if (this.reader !== void 0) {
    this.reader.abort();
  }
};


/*
var reader = new FileReader({
	arrayBuffer: blob,

or

	binary: blob,

or

	base64: blob,

or

	text: blob
});

Example 1
var blob = new Blob(['Hello!'], {type: 'text/plain'});
var reader = new FileReader({
	text: blob,
	then: function(result) {
		console.log(result);
	}
});

reader.on(Event.LoadEnd, function() {
	console.log("Loading ended");
});

reader.on(Event.Progress, function(e) {
	console.log(e);
});

Example 2
var blob = new Blob(['Hello!'], {type: 'text/plain'});
var reader = new FileReader();
reader.base64 = blob;
reader.on(Event.Loaded, function(result) {
	console.log(result);
});
 */
