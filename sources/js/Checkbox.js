var Checkbox, CheckboxInput,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

CheckboxInput = (function(_super) {
  __extends(CheckboxInput, _super);

  function CheckboxInput() {
    return CheckboxInput.__super__.constructor.apply(this, arguments);
  }

  CheckboxInput.prototype._kind = 'CheckboxInput';

  CheckboxInput.prototype._elementType = 'input';

  return CheckboxInput;

})(View);

Checkbox = (function(_super) {
  __extends(Checkbox, _super);

  Checkbox.prototype._kind = 'Checkbox';

  function Checkbox(properties) {
    var that;
    this.input = new CheckboxInput();
    this.input._element.setAttribute('type', 'checkbox');
    this.input.style.verticalAlign = 'middle';
    this.label = new Text(App.Originals.Checkbox.Text);
    Checkbox.__super__.constructor.apply(this, arguments);
    that = this;
    this.addChild(this.input);
    this.addChild(this.label);
    this.onClick(function() {
      if (!this.enabled) {
        return;
      }
      if (that.checked) {
        return that.checked = false;
      } else {
        return that.checked = true;
      }
    });
  }

  Checkbox.define('enabled', {
    get: function() {
      if (this._enabled === NULL) {
        this._enabled = true;
      }
      return this._enabled;
    },
    set: function(value) {
      if (value === true) {
        this._enabled = true;
        this.input._element.disabled = false;
      } else {
        this._enabled = false;
        this.input._element.disabled = true;
      }
    }
  });

  Checkbox.define('checked', {
    get: function() {
      return this.input._element.checked;
    },
    set: function(value) {
      if (value === true) {
        this.input._element.checked = true;
        this.emit('change:value', true);
        this.emit('change:checked', true);
      } else {
        this.input._element.checked = false;
        this.emit('change:value', false);
        this.emit('change:checked', false);
      }
    }
  });

  Checkbox.define('text', {
    get: function() {
      return this.label.text;
    },
    set: function(value) {
      this.label.text = value;
    }
  });

  Checkbox.prototype.focus = function() {
    this.input._element.focus();
  };

  Checkbox.prototype.resignFocus = function() {
    this.input._element.blur();
  };

  Checkbox.prototype.onChange = function(cb) {
    this.on('change:value', cb);
  };

  return Checkbox;

})(View);
