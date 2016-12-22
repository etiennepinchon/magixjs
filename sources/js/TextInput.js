var TextInput,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

TextInput = (function(_super) {
  __extends(TextInput, _super);

  function TextInput(properties) {
    if (properties && properties.multiline) {
      this._elementType = 'textarea';
      this._multiline = true;
      this._resizable = true;
    }
    TextInput.__super__.constructor.apply(this, arguments);
    if (!properties.userInteraction) {
      this.userInteraction = true;
    }
    if (this._multiline) {
      this.on(Event.Input, function(event, view) {
        if (!this.autoresize) {
          return;
        }
        view.height = 'auto';
        view.height = view.element.scrollHeight;
      });
    }
  }

  TextInput.prototype._kind = 'Input';

  TextInput.prototype._elementType = 'input';

  TextInput.prototype._multiline = false;

  TextInput.define('text', {
    configurable: true,
    get: function() {
      return this._element.value;
    },
    set: function(value) {
      if (this._multiline) {
        this._element.innerHTML = value;
      }
      this._element.value = value;
      this.emit('change:text', value);
    }
  });

  TextInput.define('value', {
    configurable: true,
    get: function() {
      if (this._multiline) {
        return this._element.value;
      }
      return this.text;
    },
    set: function(value) {
      if (this._multiline) {
        this._element.innerHTML = value;
      }
      this.text = value;
      this.emit('change:value', value);
    }
  });

  TextInput.define('val', {
    configurable: true,
    get: function() {
      return this.value;
    },
    set: function(value) {
      return this.value = value;
    }
  });

  TextInput.define('multiline', {
    get: function() {
      if (!this.multiline) {
        return false;
      }
      return this.multiline;
    }
  });

  TextInput.define('placeholder', {
    get: function() {
      return this._element.getAttribute('placeholder');
    },
    set: function(value) {
      this._element.setAttribute('placeholder', value);
    }
  });

  TextInput.define('placeholderColor', {
    get: function() {
      if (!this._placeholderColor) {
        return '';
      }
      return this._placeholderColor;
    },
    set: function(value) {
      var id;
      if (value === 'clear') {
        value = 'transparent';
      }
      value = Color.toColor(value);
      if (value && value.color) {
        this._placeholderColor = value.color;
      } else {
        this._placeholderColor = value;
      }
      id = ("MagiX" + this._kind + "-") + this.id;
      return CSS('#' + id + '::-webkit-input-placeholder {color:    ' + this._placeholderColor + ';}#' + id + ':-moz-placeholder {color:    ' + this._placeholderColor + ';}#' + id + '::-moz-placeholder {color:    ' + this._placeholderColor + ';}#' + id + ':-ms-input-placeholder {color:    ' + this._placeholderColor + ';}');
    }
  });

  TextInput.define('secure', {
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

  TextInput.define('maxlength', {
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

  TextInput.define('limit', {
    get: function() {
      return this.limit;
    },
    set: function(value) {
      this.maxlength = value;
    }
  });

  TextInput.define('readonly', {
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

  TextInput.define('autocomplete', {
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

  TextInput.define('autocorrect', {
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

  TextInput.define('autocapitalize', {
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

  TextInput.define('spellcheck', {
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

  TextInput.define('resizable', {
    get: function() {
      if (this._resizable === void 0) {
        this._resizable = false;
      }
      return this._resizable;
    },
    set: function(value) {
      if (value === true) {
        this._resizable = true;
        if (this._resizeDirection === void 0) {
          this._element.style.resize = '';
        } else {
          this._element.style.resize = this._resizeDirection;
        }
      } else {
        this._resizable = false;
        this._element.style.resize = 'none';
      }
    }
  });

  TextInput.define('resize', {
    get: function() {
      return this.resizable;
    },
    set: function(value) {
      this.resizable = value;
    }
  });

  TextInput.define('resizeDirection', {
    get: function() {
      if (this._resizeDirection === void 0) {
        if (this._resizable) {
          this._resizeDirection = 'both';
        } else {
          this._resizeDirection = false;
        }
      }
      return this._resizeDirection;
    },
    set: function(value) {
      if (value === 'vertical' || value === 'horizontal') {
        this._resizeDirection = value;
        if (this._resizable) {
          this._element.style.resize = value;
        }
      } else {
        this._resizeDirection = '';
      }
    }
  });

  TextInput.define('autoresize', {
    get: function() {
      if (this._autoresize === void 0) {
        this._autoresize = false;
      }
      return this._autoresize;
    },
    set: function(value) {
      if (value === true) {
        this._autoresize = true;
      } else {
        this._autoresize = false;
      }
    }
  });

  TextInput.prototype.fit = function() {
    return this.height = this.scrollHeight;
  };

  TextInput.prototype.focus = function() {
    this._element.focus();
  };

  TextInput.prototype.resignFocus = function() {
    this._element.blur();
  };

  TextInput.prototype.select = function() {
    this._element.select();
  };

  TextInput.prototype.empty = function() {
    this.value = '';
  };

  TextInput.prototype.onKeyDown = function(cb) {
    return this.on(Event.KeyDown, cb);
  };

  TextInput.prototype.onKeyPress = function(cb) {
    return this.on(Event.KeyPress, cb);
  };

  TextInput.prototype.onKeyUp = function(cb) {
    return this.on(Event.KeyUp, cb);
  };

  TextInput.prototype.onFocus = function(cb) {
    return this.on(Event.Focus, cb);
  };

  TextInput.prototype.onResignFocus = function(cb) {
    return this.on(Event.ResignFocus, cb);
  };

  TextInput.prototype.onBlur = function(cb) {
    return this.on(Event.ResignFocus, cb);
  };

  TextInput.prototype.onChange = function(cb) {
    return this.on(Event.Change, cb);
  };

  TextInput.prototype.onWillFocus = function(cb) {
    return this.on(Event.WillFocus, cb);
  };

  TextInput.prototype.onWillResignFocus = function(cb) {
    return this.on(Event.WillResignFocus, cb);
  };

  TextInput.prototype.onInput = function(cb) {
    return this.on(Event.Input, cb);
  };

  TextInput.prototype.onSelect = function(cb) {
    return this.on(Event.Select, cb);
  };

  return TextInput;

})(Text);
