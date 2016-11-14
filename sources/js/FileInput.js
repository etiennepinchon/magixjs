var FileInput,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

FileInput = (function(_super) {
  __extends(FileInput, _super);

  function FileInput(properties) {
    FileInput.__super__.constructor.apply(this, arguments);
    this._element.setAttribute('type', 'file');
    this._element.setAttribute('tabindex', '1');
  }

  FileInput.prototype._kind = 'FileInput';

  FileInput.prototype._elementType = 'input';

  FileInput.define('accept', {
    get: function() {
      return this._accept;
    },
    set: function(value) {
      var i, output;
      if (typeof value === 'string') {
        value = [value];
      }
      if (typeof value === 'object') {
        output = '';
        i = 0;
        while (i < value.length) {
          output += value[i];
          if (i !== value.length - 1) {
            output += ', ';
          }
          i++;
        }
        this._accept = value;
        this._element.setAttribute('accept', output);
      }
    }
  });

  FileInput.define('value', {
    get: function() {
      return this._element.value;
    }
  });

  FileInput.define('file', {
    get: function() {
      return this._element.files[0];
    }
  });

  FileInput.define('files', {
    get: function() {
      return this._element.files;
    }
  });

  FileInput.define('multiple', {
    get: function() {
      if (!this._multiple) {
        return false;
      }
      return this._multiple;
    },
    set: function(value) {
      if (value === true) {
        this._multiple = true;
        return this._element.setAttribute('multiple', 'multiple');
      } else {
        this._multiple = false;
        return this._element.removeAttribute('multiple');
      }
    }
  });

  FileInput.prototype.focus = function() {
    this._element.focus();
  };

  FileInput.prototype.resignFocus = function() {
    this._element.blur();
  };

  FileInput.prototype.open = function() {
    this._element.click();
  };

  FileInput.prototype.onFocus = function(cb) {
    return this.on(Event.Focus, cb);
  };

  FileInput.prototype.onResignFocus = function(cb) {
    return this.on(Event.ResignFocus, cb);
  };

  FileInput.prototype.onBlur = function(cb) {
    return this.on(Event.Blur, cb);
  };

  FileInput.prototype.onChange = function(cb) {
    return this.on(Event.Change, cb);
  };

  FileInput.prototype.onWillFocus = function(cb) {
    return this.on(Event.WillFocus, cb);
  };

  FileInput.prototype.onWillResignFocus = function(cb) {
    return this.on(Event.WillResignFocus, cb);
  };

  return FileInput;

})(View);
