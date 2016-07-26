
/*
	myRadioButton = new RadioButton
		text: 'Select me'
		parent: @
	myRadioButton.onChange (e)->
		say @checked
 */
var RadioButton, RadioButtonInput, RadioButtonOriginalInput,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

RadioButtonOriginalInput = (function(_super) {
  __extends(RadioButtonOriginalInput, _super);

  function RadioButtonOriginalInput() {
    RadioButtonOriginalInput.__super__.constructor.apply(this, arguments);
    this.element.setAttribute('type', 'radio');
    this.style.verticalAlign = 'middle';
  }

  RadioButtonOriginalInput.prototype._elementType = 'input';

  RadioButtonOriginalInput.prototype._kind = 'RadioButtonInput';

  return RadioButtonOriginalInput;

})(View);

RadioButtonInput = (function(_super) {
  __extends(RadioButtonInput, _super);

  function RadioButtonInput() {
    RadioButtonInput.__super__.constructor.apply(this, arguments);
    this.props = {
      width: 18,
      height: 18,
      padding: 0,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: 'rgba(0, 0, 0, 0.08)',
      backgroundColor: 'white',
      display: 'inline-block'
    };
    this.style.float = 'left';
    this.dot = new View({
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: '#179afc',
      opacity: 0,
      parent: this
    });
    this.dot.absoluteCenter();
    this.checked = false;
  }

  RadioButtonInput.prototype._kind = 'RadioButtonInput';

  return RadioButtonInput;

})(View);

RadioButton = (function(_super) {
  __extends(RadioButton, _super);

  function RadioButton(properties) {
    if (properties == null) {
      properties = {};
    }
    this.input = void 0;
    if (!properties.original) {
      properties.original = false;
      this.input = new RadioButtonInput();
    } else {
      this.input = new RadioButtonOriginalInput();
    }
    this.original = properties.original;
    this.label = new Text(App.Originals.RadioButton.Text);
    if (this.original) {
      this.label.fontSize = 12;
    }
    RadioButton.__super__.constructor.apply(this, arguments);
    this.addChild(this.input);
    this.addChild(this.label);
    this.on(Event.Click, function(event, view) {
      if (!this.enabled) {
        return;
      }
      return this.checked = true;
    });
  }

  RadioButton.prototype._kind = 'RadioButton';

  RadioButton.define('enabled', {
    get: function() {
      if (this._enabled === void 0) {
        this._enabled = true;
      }
      return this._enabled;
    },
    set: function(value) {
      if (value === true) {
        this._enabled = true;
        if (this.original) {
          this.input._element.disabled = false;
        } else {
          this.input.opacity = 1;
        }
      } else {
        this._enabled = false;
        if (this.original) {
          this.input._element.disabled = true;
        } else {
          this.input.opacity = 0.5;
        }
      }
    }
  });

  RadioButton.define('checked', {
    get: function() {
      if (this.original) {
        return this.input._element.checked;
      } else {
        return this.input.checked;
      }
    },
    set: function(value) {
      var item, _i, _len, _ref;
      if (value === this.input._element.checked) {
        return;
      }
      if (value === true) {
        if (value !== this.input.checked || this.original) {
          this.emit('change:value', true);
          this.emit('change:checked', true);
        }
        if (this.original) {
          this.input._element.checked = true;
        } else {
          this.input.checked = true;
          this.input.dot.opacity = 1;
          if (this._group) {
            if (App.__radiobuttons[this._group]) {
              _ref = App.__radiobuttons[this._group];
              for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                item = _ref[_i];
                if (item && item !== this) {
                  item.checked = false;
                }
              }
            }
          }
        }
      } else {
        if (value !== this.input.checked || this.original) {
          this.emit('change:value', false);
          this.emit('change:checked', false);
        }
        if (this.original) {
          this.input._element.checked = false;
        } else {
          this.input.checked = false;
          this.input.dot.opacity = 0;
        }
      }
    }
  });

  RadioButton.define('text', {
    get: function() {
      return this.label.text;
    },
    set: function(value) {
      this.label.text = value;
      this.emit('change:text', value);
    }
  });

  RadioButton.define('group', {
    get: function() {
      if (this._group === void 0) {
        this._group = '';
      }
      return this._group;
    },
    set: function(value) {
      var index;
      if (this._group && !this.orignal) {
        index = App.__radiobuttons[this._group].indexof(this);
        if (index > -1) {
          App.__radiobuttons[this._group].splice(index, 1);
        }
      }
      this._group = value;
      if (this.original) {
        this.input._element.setAttribute('name', value);
      } else {
        if (!App.__radiobuttons) {
          App.__radiobuttons = {};
        }
        if (!App.__radiobuttons[this._group]) {
          App.__radiobuttons[this._group] = [];
        }
        App.__radiobuttons[this._group].push(this);

        /*
        				@on 'radiobuttongroup::' + @_group, (view)->
        					console.log @id
        					if @ isnt view
        						@checked = false
         */
      }
    }
  });

  return RadioButton;

})(View);

RadioButton.prototype.focus = function() {
  this.input._element.focus();
};

RadioButton.prototype.resignFocus = function() {
  this.input._element.blur();
};

RadioButton.prototype.onChange = function(cb) {
  return this.on('change:value', cb);
};
