var Dropdown,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Dropdown = (function(_super) {
  __extends(Dropdown, _super);

  function Dropdown() {
    return Dropdown.__super__.constructor.apply(this, arguments);
  }

  Dropdown.prototype._kind = 'Dropdown';

  Dropdown.prototype._elementType = 'select';

  Dropdown.define('options', {
    get: function() {
      if (this._options === NULL) {
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
        if (optionKey !== NULL) {
          option = document.createElement('option');
          option.text = value[optionKey];
          if (value[optionKey].value !== NULL) {
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
      if (this._enabled === NULL) {
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
      this._element.value = value;
    }
  });

  Dropdown.prototype.focus = function() {
    this._element.setAttribute('autofocus', 'autofocus');
  };

  Dropdown.prototype.resignFocus = function() {
    this._element.removeAttribute('autofocus');
  };

  Dropdown.prototype.onFocus = function(cb) {
    this.on(Event.Focus, cb);
  };

  Dropdown.prototype.onResignFocus = function(cb) {
    this.on(Event.ResignFocus, cb);
  };

  Dropdown.prototype.onBlur = function(cb) {
    this.on(Event.Blur, cb);
  };

  Dropdown.prototype.onChange = function(cb) {
    this.on(Event.Change, cb);
  };

  return Dropdown;

})(View);
