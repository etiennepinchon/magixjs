
/*
	d = new Dropdown
		options:
			'one': 'Select one'
			'two': 'Select two'
			'tree': 'Select tree'
			'four': 'Select four'
		parent: @

	d.onChange (e)->
		console.log @value
 */
var Dropdown,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Dropdown = (function(_super) {
  __extends(Dropdown, _super);

  function Dropdown(properties) {
    Dropdown.__super__.constructor.apply(this, arguments);
  }

  Dropdown.prototype._kind = 'Dropdown';

  Dropdown.prototype._elementType = 'select';

  Dropdown.define('options', {
    get: function() {
      if (this._options === void 0) {
        this._options = {};
      }
      return this._options;
    },
    set: function(value) {
      var option, optionKey, _results;
      if (!Utils.isObject(value)) {
        return false;
      }
      this._options = value;
      _results = [];
      for (optionKey in value) {
        if (optionKey !== void 0) {
          option = document.createElement('option');
          option.text = value[optionKey];
          if (value[optionKey].value !== void 0) {
            option.setAttribute('value', optionKey);
          }
          _results.push(this._element.add(option));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    }
  });

  Dropdown.define('enabled', {
    get: function() {
      if (this._enabled === void 0) {
        this._enabled = true;
      }
      return this._enabled;
    },
    set: function(value) {
      if (value === true) {
        this._enabled = value;
        this._element.disabled = false;
      } else {
        this._enabled = false;
        this._element.disabled = true;
      }
    }
  });

  Dropdown.define('value', {
    get: function() {
      return this._element.options[this._element.selectedIndex].value;
    },
    set: function(value) {
      return this._element.value = value;
    }
  });

  return Dropdown;

})(View);

Dropdown.prototype.focus = function() {
  this._element.setAttribute('autofocus', 'autofocus');
};

Dropdown.prototype.resignFocus = function() {
  this._element.removeAttribute('autofocus');
};

Dropdown.prototype.onFocus = function(cb) {
  return this.on(Event.Focus, cb);
};

Dropdown.prototype.onResignFocus = function(cb) {
  return this.on(Event.ResignFocus, cb);
};

Dropdown.prototype.onBlur = function(cb) {
  return this.on(Event.Blur, cb);
};

Dropdown.prototype.onChange = function(cb) {
  return this.on(Event.Change, cb);
};
