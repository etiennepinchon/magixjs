var FileField,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

FileField = (function(_super) {
  __extends(FileField, _super);

  function FileField(properties) {
    FileField.__super__.constructor.apply(this, arguments);
    this._element.setAttribute('type', 'file');
    this._element.setAttribute('tabindex', '1');
  }

  FileField.prototype._kind = 'FileField';

  FileField.prototype._elementType = 'input';

  FileField.define('accept', {
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

  FileField.define('value', {
    get: function() {
      return this._element.value;
    }
  });

  FileField.define('file', {
    get: function() {
      return this._element.files[0];
    }
  });

  FileField.define('files', {
    get: function() {
      return this._element.files;
    }
  });

  FileField.define('multiple', {
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

  return FileField;

})(View);

FileField.prototype.focus = function() {
  this._element.focus();
};

FileField.prototype.resignFocus = function() {
  this._element.blur();
};

FileField.prototype.open = function() {
  this._element.click();
};

FileField.prototype.onFocus = function(cb) {
  return this.on(Event.Focus, cb);
};

FileField.prototype.onResignFocus = function(cb) {
  return this.on(Event.ResignFocus, cb);
};

FileField.prototype.onBlur = function(cb) {
  return this.on(Event.Blur, cb);
};

FileField.prototype.onChange = function(cb) {
  return this.on(Event.Change, cb);
};

FileField.prototype.onWillFocus = function(cb) {
  return this.on(Event.WillFocus, cb);
};

FileField.prototype.onWillResignFocus = function(cb) {
  return this.on(Event.WillResignFocus, cb);
};
