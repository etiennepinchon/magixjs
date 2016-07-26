var TextView,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

TextView = (function(_super) {
  __extends(TextView, _super);

  function TextView(properties) {
    TextView.__super__.constructor.apply(this, arguments);
    this.on(Event.Input, function(event, view) {
      if (!this.autoresize) {
        return;
      }
      view.height = 'auto';
      view.height = view.element.scrollHeight;
    });
  }

  TextView.prototype._kind = 'TextView';

  TextView.prototype._elementType = 'textarea';

  TextView.define('text', {
    get: function() {
      return this._element.value;
    },
    set: function(value) {
      this._element.innerHTML = value;
      this._element.value = value;
      this.emit('change:text', value);
    }
  });

  TextView.define('value', {
    get: function() {
      return this._element.value;
    },
    set: function(value) {
      this._element.innerHTML = value;
      this._element.value = value;
      this.emit('change:value', value);
    }
  });

  TextView.define('resizable', {
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

  TextView.define('resize', {
    get: function() {
      return this.resizable;
    },
    set: function(value) {
      this.resizable = value;
    }
  });

  TextView.define('resizeDirection', {
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

  TextView.define('autoresize', {
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

  TextView.prototype.fit = function() {
    return this.height = this.scrollHeight + 2;
  };

  return TextView;

})(TextField);
