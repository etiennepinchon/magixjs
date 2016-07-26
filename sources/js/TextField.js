var TextField,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

TextField = (function(_super) {
  __extends(TextField, _super);

  function TextField(properties) {
    TextField.__super__.constructor.apply(this, arguments);
  }

  TextField.prototype._kind = 'TextField';

  TextField.prototype._elementType = 'input';

  TextField.define('text', {
    configurable: true,
    get: function() {
      return this._element.value;
    },
    set: function(value) {
      this._element.value = value;
      this.emit('change:text', value);
    }
  });

  TextField.define('value', {
    configurable: true,
    get: function() {
      return this.text;
    },
    set: function(value) {
      this.text = value;
      this.emit('change:value', value);
    }
  });

  TextField.define('val', {
    configurable: true,
    get: function() {
      return this.value;
    },
    set: function(value) {
      return this.value = value;
    }
  });

  TextField.define('placeholder', {
    get: function() {
      return this._element.getAttribute('placeholder');
    },
    set: function(value) {
      this._element.setAttribute('placeholder', value);
    }
  });

  TextField.define('secure', {
    get: function() {
      if (this._secureTextEntry === void 0) {
        this._secureTextEntry = false;
      }
      return this._secureTextEntry;
    },
    set: function(value) {
      if (value === true) {
        this._secureTextEntry = true;
        this._element.setAttribute('type', 'password');
      } else {
        this._secureTextEntry = false;
        this._element.setAttribute('type', 'text');
      }
    }
  });

  TextField.define('maxlength', {
    get: function() {
      if (this._maxlength === void 0) {
        this._maxlength = 0;
      }
      return this._maxlength;
    },
    set: function(value) {
      this._maxlength = value;
      this._element.setAttribute('maxlength', value);
    }
  });

  TextField.define('limit', {
    get: function() {
      return this.limit;
    },
    set: function(value) {
      this.maxlength = value;
    }
  });

  TextField.define('readonly', {
    get: function() {
      if (this._readonly === void 0) {
        this._readonly = true;
      }
      return this._readonly;
    },
    set: function(value) {
      if (value === true) {
        this._readonly = true;
        this._element.setAttribute('readonly', 'on');
      } else {
        this._readonly = false;
        this._element.setAttribute('readonly', 'off');
      }
    }
  });

  TextField.define('autocomplete', {
    get: function() {
      if (this._autocomplete === void 0) {
        this._autocomplete = true;
      }
      return this._autocomplete;
    },
    set: function(value) {
      if (value === true) {
        this._autocomplete = true;
        this._element.setAttribute('autocomplete', 'on');
      } else {
        this._autocomplete = false;
        this._element.setAttribute('autocomplete', 'off');
      }
    }
  });

  TextField.define('autocorrect', {
    get: function() {
      if (this._autocorrect === void 0) {
        this._autocorrect = true;
      }
      return this._autocorrect;
    },
    set: function(value) {
      if (value === true) {
        this._autocorrecte = true;
        this._element.setAttribute('autocorrect', 'on');
      } else {
        this._autocorrect = false;
        this._element.setAttribute('autocorrect', 'off');
      }
    }
  });

  TextField.define('autocapitalize', {
    get: function() {
      if (this._autocapitalize === void 0) {
        this._autocapitalize = true;
      }
      return this._autocapitalize;
    },
    set: function(value) {
      if (value === true) {
        this._autocapitalize = true;
        this._element.setAttribute('autocapitalize', 'on');
      } else {
        this._autocapitalize = false;
        this._element.setAttribute('autocapitalize', 'off');
      }
    }
  });

  TextField.define('spellcheck', {
    get: function() {
      if (this._spellcheck === void 0) {
        this._spellcheck = true;
      }
      return this._spellcheck;
    },
    set: function(value) {
      if (value === true) {
        this._spellcheck = true;
        this._element.setAttribute('spellcheck', 'true');
      } else {
        this._spellcheck = false;
        this._element.setAttribute('spellcheck', 'false');
      }
    }
  });

  return TextField;

})(Text);

TextField.prototype.focus = function() {
  this._element.focus();
};

TextField.prototype.resignFocus = function() {
  this._element.blur();
};

TextField.prototype.select = function() {
  this._element.select();
};

TextField.prototype.empty = function() {
  this.value = '';
};

TextField.prototype.onKeyDown = function(cb) {
  return this.on(Event.KeyDown, cb);
};

TextField.prototype.onKeyPress = function(cb) {
  return this.on(Event.KeyPress, cb);
};

TextField.prototype.onKeyUp = function(cb) {
  return this.on(Event.KeyUp, cb);
};

TextField.prototype.onFocus = function(cb) {
  return this.on(Event.Focus, cb);
};

TextField.prototype.onResignFocus = function(cb) {
  return this.on(Event.ResignFocus, cb);
};

TextField.prototype.onBlur = function(cb) {
  return this.on(Event.ResignFocus, cb);
};

TextField.prototype.onChange = function(cb) {
  return this.on(Event.Change, cb);
};

TextField.prototype.onWillFocus = function(cb) {
  return this.on(Event.WillFocus, cb);
};

TextField.prototype.onWillResignFocus = function(cb) {
  return this.on(Event.WillResignFocus, cb);
};

TextField.prototype.onInput = function(cb) {
  return this.on(Event.Input, cb);
};

TextField.prototype.onSelect = function(cb) {
  return this.on(Event.Select, cb);
};
