var View,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
  __slice = [].slice;

View = (function(_super) {
  var onScrollAnimationDidEnd, onScrollAnimationDidStart, onScrollEnd, onScrollStart;

  __extends(View, _super);

  function View(options) {
    if (options == null) {
      options = {};
    }
    this.addListener = __bind(this.addListener, this);
    this.once = __bind(this.once, this);
    View.__super__.constructor.apply(this, arguments);
    this._children = [];
    this._createElement();
    this.userInteraction = false;
    this._context.addView(this);
    this._context.emit("view:create", this);
    this.props = Defaults.getDefaults(this._kind, options);
    if (options.parent) {
      delete options.parent;
    }
    if (options.addTo) {
      delete options.addTo;
    }
    if (options.props) {
      this.props = options.props;
    }
  }

  View.prototype._kind = 'View';

  View.prototype._elementType = 'div';

  View.prototype._createElement = function() {
    this._element = document.createElement(this._elementType);
    this._element.setAttribute('id', ("Orbe" + this._kind + "::") + this.id);
    this._element.style.overflow = 'hidden';
    this._element.style.outline = 'none';
    this._element.style.position = 'relative';
    return this._element.instance = this;
  };

  View.prototype._insertElement = function() {
    this.bringToFront();
    return this._context._element.appendChild(this._element);
  };

  View.define('html', {
    get: function() {
      return this._element.innerHTML || "";
    },
    set: function(value) {
      this._element.innerHTML = value;
      return this.emit('change:html', value);
    }
  });

  View.define('context', {
    get: function() {
      return this._context;
    }
  });

  View.define('_domEventManager', {
    get: function() {
      return this._context.domEventManager.wrap(this._element);
    }
  });

  View.define('element', {
    get: function() {
      return this._element;
    }
  });

  View.define('style', {
    importable: true,
    exportable: false,
    get: function() {
      return this._element.style;
    },
    set: function(value) {
      Utils.extend(this._element.style, value);
      return this.emit("change:style");
    }
  });

  View.define('classList', {
    importable: true,
    exportable: false,
    get: function() {
      return this._element.classList;
    }
  });

  View.define('click', {
    get: function() {
      return this._eventClick;
    },
    set: function(value) {
      this._eventClick = value;
      return this.on(Event.Click, value);
    }
  });

  View.define('doubleClick', {
    get: function() {
      return this._eventDoubleClick;
    },
    set: function(value) {
      this._eventDoubleClick = value;
      return this.on(Event.DoubleClick, value);
    }
  });

  View.define('down', {
    get: function() {
      return this._eventDown;
    },
    set: function(value) {
      this._eventDown = value;
      return this.on(Event.Down, value);
    }
  });

  View.define('over', {
    get: function() {
      return this._eventOver;
    },
    set: function(value) {
      this._eventOver = value;
      return this.on(Event.Over, value);
    }
  });

  View.define('up', {
    get: function() {
      return this._eventUp;
    },
    set: function(value) {
      this._eventUp = value;
      return this.on(Event.Up, value);
    }
  });

  View.define('in', {
    get: function() {
      return this._eventIn;
    },
    set: function(value) {
      this._eventIn = value;
      return this.on(Event.In, value);
    }
  });

  View.define('out', {
    get: function() {
      return this._eventOut;
    },
    set: function(value) {
      this._eventOut = value;
      return this.on(Event.Out, value);
    }
  });

  View.define('mouseDown', {
    get: function() {
      return this._eventDown;
    },
    set: function(value) {
      this._eventDown = value;
      return this.on(Event.Down, value);
    }
  });

  View.define('mouseOver', {
    get: function() {
      return this._eventOver;
    },
    set: function(value) {
      this._eventOver = value;
      return this.on(Event.Over, value);
    }
  });

  View.define('mouseUp', {
    get: function() {
      return this._eventUp;
    },
    set: function(value) {
      this._eventUp = value;
      return this.on(Event.Up, value);
    }
  });

  View.define('mouseIn', {
    get: function() {
      return this._eventIn;
    },
    set: function(value) {
      this._eventIn = value;
      return this.on(Event.In, value);
    }
  });

  View.define('mouseOut', {
    get: function() {
      return this._eventOut;
    },
    set: function(value) {
      this._eventOut = value;
      return this.on(Event.Out, value);
    }
  });

  View._def = function(name, get_default, set_action) {
    return this.define(name, {
      get: function() {
        if (this["_" + name] === void 0) {
          return get_default;
        }
        return this["_" + name];
      },
      set: function(value) {
        this["_" + name] = value;
        set_action.call(this, value);
        return this.emit("change:" + name, value);
      }
    });
  };

  View._def_style = function(name, style_name, get_default) {
    return this._def(name, get_default, function(value) {
      return this._element.style[style_name] = value;
    });
  };

  View._alias = function(alias_name, original_name) {
    return this.define(alias_name, {
      get: function() {
        return this["" + original_name];
      },
      set: function(value) {
        return this["" + original_name] = value;
      }
    });
  };

  View.define('do', {
    get: function() {
      return this._do;
    },
    set: function(fn) {
      if (Utils.isFunction(fn)) {
        this._do = fn;
        return fn.call(this);
      }
    }
  });

  View.define('name', {
    get: function() {
      return this._getPropertyValue('name');
    },
    set: function(value) {
      this._setPropertyValue('name', value);
      return this._element.setAttribute('name', value);
    }
  });

  View._def('fixed', false, function(value) {
    if (value === true) {
      this._fixed = true;
      return this._element.style.position = 'fixed';
    } else {
      this._fixed = false;
      if (this._element.style.left !== '') {
        return this._element.style.position = 'absolute';
      } else {
        return this._element.style.position = '';
      }
    }
  });

  View.define('margin', {
    get: function() {
      if (this._margin === void 0) {
        this._margin = {
          x: 0,
          y: 0,
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        };
      }
      return this._margin;
    },
    set: function(value) {
      var i, item, output;
      if (this._margin === void 0) {
        this._margin = {
          x: 0,
          y: 0,
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        };
      }
      if (typeof value !== 'object') {
        if (value === 'center') {
          value = 'auto';
        }
        this._margin.x = value;
        this._margin.y = value;
        this._margin.top = value;
        this._margin.right = value;
        this._margin.bottom = value;
        this._margin.left = value;
      } else {
        if (value.x !== void 0) {
          if (value.x === 'center') {
            value.x = 'auto';
          }
          this._margin.x = value.x;
          if (value.left === void 0) {
            value.left = value.x;
          }
          if (value.right === void 0) {
            value.right = value.x;
          }
        }
        if (value.y !== void 0) {
          if (value.y === 'center') {
            value.y = 'auto';
          }
          this._margin.y = value.y;
          if (value.top === void 0) {
            value.top = value.y;
          }
          if (value.bottom === void 0) {
            value.bottom = value.y;
          }
        }
        if (value.top !== void 0) {
          this._margin.top = value.top;
        }
        if (value.bottom !== void 0) {
          this._margin.bottom = value.bottom;
        }
        if (value.left !== void 0) {
          this._margin.left = value.left;
        }
        if (value.right !== void 0) {
          this._margin.right = value.right;
        }
      }
      this.emit('change:margin', this._margin);
      output = '';
      i = void 0;
      for (item in this._margin) {
        if (item !== 'x' && item !== 'y') {
          i = this._margin[item];
          if (typeof this._margin[item] === 'number') {
            i = this._margin[item] + 'px';
          }
          output += i + ' ';
        }
      }
      return this._element.style.margin = output;
    }
  });

  View._alias('mg', 'margin');

  View.define('marginX', {
    get: function() {
      return this.margin.x;
    },
    set: function(value) {
      return this.margin = {
        x: value
      };
    }
  });

  View.define('marginY', {
    get: function() {
      return this.margin.y;
    },
    set: function(value) {
      return this.margin = {
        y: value
      };
    }
  });

  View.define('marginTop', {
    get: function() {
      return this.margin.top;
    },
    set: function(value) {
      return this.margin = {
        top: value
      };
    }
  });

  View.define('marginRight', {
    get: function() {
      return this.margin.right;
    },
    set: function(value) {
      return this.margin = {
        right: value
      };
    }
  });

  View.define('marginBottom', {
    get: function() {
      return this.margin.bottom;
    },
    set: function(value) {
      return this.margin = {
        bottom: value
      };
    }
  });

  View.define('marginLeft', {
    get: function() {
      return this.margin.left;
    },
    set: function(value) {
      this.margin = {
        left: value
      };
    }
  });

  View.define('padding', {
    get: function() {
      if (this._padding === void 0) {
        this._padding = {
          x: 0,
          y: 0,
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        };
      }
      return this._padding;
    },
    set: function(value) {
      var i, item, output;
      if (this._padding === void 0) {
        this._padding = {
          x: 0,
          y: 0,
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        };
      }
      if (typeof value !== 'object') {
        this._padding.x = value;
        this._padding.y = value;
        this._padding.top = value;
        this._padding.right = value;
        this._padding.bottom = value;
        this._padding.left = value;
      } else {
        if (value.x !== void 0) {
          this._padding.x = value.x;
          if (value.left === void 0) {
            value.left = value.x;
          }
          if (value.right === void 0) {
            value.right = value.x;
          }
        }
        if (value.y !== void 0) {
          this._padding.y = value.y;
          if (value.top === void 0) {
            value.top = value.y;
          }
          if (value.bottom === void 0) {
            value.bottom = value.y;
          }
        }
        if (value.top !== void 0) {
          this._padding.top = value.top;
        }
        if (value.bottom !== void 0) {
          this._padding.bottom = value.bottom;
        }
        if (value.left !== void 0) {
          this._padding.left = value.left;
        }
        if (value.right !== void 0) {
          this._padding.right = value.right;
        }
      }
      this.emit('change:padding', this._padding);
      output = '';
      i = void 0;
      for (item in this._padding) {
        if (item !== 'x' && item !== 'y') {
          i = this._padding[item];
          if (typeof this._padding[item] === 'number') {
            i = this._padding[item] + 'px';
          }
          output += i + ' ';
        }
      }
      return this._element.style.padding = output;
    }
  });

  View._alias('pg', 'padding');

  View.define('paddingX', {
    get: function() {
      return this.padding.x;
    },
    set: function(value) {
      return this.padding = {
        x: value
      };
    }
  });

  View.define('paddingY', {
    get: function() {
      return this.padding.y;
    },
    set: function(value) {
      return this.padding = {
        y: value
      };
    }
  });

  View.define('paddingTop', {
    get: function() {
      return this.padding.top;
    },
    set: function(value) {
      return this.padding = {
        top: value
      };
    }
  });

  View.define('paddingRight', {
    get: function() {
      return this.padding.right;
    },
    set: function(value) {
      return this.padding = {
        right: value
      };
    }
  });

  View.define('paddingBottom', {
    get: function() {
      return this.padding.bottom;
    },
    set: function(value) {
      return this.padding = {
        bottom: value
      };
    }
  });

  View.define('paddingLeft', {
    get: function() {
      return this.padding.left;
    },
    set: function(value) {
      return this.padding = {
        left: value
      };
    }
  });

  View.define('x', {
    get: function() {
      var left;
      left = this._element.style.left;
      if (left.indexOf('px') >= 0) {
        left = parseFloat(left, 10);
      }
      if (left === '') {
        left = 0;
      }
      return left;
    },
    set: function(value) {
      this._keepCenterX = false;
      if (Utils.isObject(value)) {
        if (value.centerX) {
          this._keepCenterX = true;
        }
        value = value.value;
      }
      if (Utils.isNumber(value)) {
        value = value + 'px';
      }
      if (!this.fixed) {
        this._element.style.position = 'absolute';
      }
      this._element.style.left = value;
      this.emit('change:x', value);
      this.emit('change:left', value);
      this.emit('change:point', this.point);
      return this.emit('change:frame', this.frame);
    }
  });

  View.define('y', {
    get: function() {
      var top;
      top = this._element.style.top;
      if (top.indexOf('px') >= 0) {
        top = parseFloat(top, 10);
      }
      if (top === '') {
        top = 0;
      }
      return top;
    },
    set: function(value) {
      this._keepCenterY = false;
      if (Utils.isObject(value)) {
        if (value.centerY) {
          this._keepCenterY = true;
        }
        value = value.value;
      }
      if (Utils.isNumber(value)) {
        value = value + 'px';
      }
      if (!this.fixed) {
        this._element.style.position = 'absolute';
      }
      this._element.style.top = value;
      this.emit('change:y', value);
      this.emit('change:top', value);
      this.emit('change:point', this.point);
      return this.emit('change:frame', this.frame);
    }
  });

  View._alias('top', 'y');

  View._alias('left', 'x');

  View.define('bottom', {
    get: function() {
      var bottom;
      bottom = this._element.style.bottom;
      if (bottom.indexOf('px') >= 0) {
        bottom = parseFloat(bottom, 10);
      }
      if (bottom === '') {
        bottom = 0;
      }
      return bottom;
    },
    set: function(value) {
      if (Utils.isNumber(value)) {
        value = value + 'px';
      }
      if (!this.fixed) {
        this._element.style.position = 'absolute';
      }
      this._element.style.bottom = value;
      return this.emit('change:bottom', value);
    }
  });

  View.define('right', {
    get: function() {
      var right;
      right = this._element.style.right;
      if (right.indexOf('px') >= 0) {
        right = parseFloat(right, 10);
      }
      if (right === '') {
        right = 0;
      }
      return right;
    },
    set: function(value) {
      if (Utils.isNumber(value)) {
        value = value + 'px';
      }
      if (!this.fixed) {
        this._element.style.position = 'absolute';
      }
      this._element.style.right = value;
      return this.emit('change:right', value);
    }
  });

  View.define('width', {
    configurable: true,
    get: function() {
      var borders, leftBorder, rightBorder;
      if (this._width !== void 0 && typeof this._width !== 'number') {
        return this._width;
      }
      if (this._element.offsetWidth === 0 && this._width !== void 0) {
        return this._width;
      }
      leftBorder = this._element.style.borderLeftWidth !== '' ? this._element.style.borderLeftWidth : 0;
      rightBorder = this._element.style.borderRightWidth !== '' ? this._element.style.borderRightWidth : 0;
      borders = parseFloat(leftBorder, 10) + parseFloat(rightBorder, 10);
      return this._element.offsetWidth - borders;
    },
    set: function(value) {
      if (value === 'auto') {
        this._element.style.width = '';
        return;
      }
      this._width = value;
      if (Utils.isNumber(value)) {
        value = value + 'px';
      }
      this._element.style.width = value;
      this.emit('change:width', this._width);
      this.emit('change:size', this.size);
      return this.emit('change:frame', this.frame);
    }
  });

  View.define('height', {
    configurable: true,
    get: function() {
      var borders, bottomBorder, topBorder;
      if (this._height !== void 0 && typeof this._height !== 'number') {
        return this._height;
      }
      if (this._element.offsetHeight === 0 && this._height !== void 0) {
        return this._height;
      }
      topBorder = this._element.style.borderTopWidth !== '' ? this._element.style.borderTopWidth : 0;
      bottomBorder = this._element.style.borderBottomWidth !== '' ? this._element.style.borderBottomWidth : 0;
      borders = parseFloat(topBorder, 10) + parseFloat(bottomBorder, 10);
      return this._element.offsetHeight - borders;
    },
    set: function(value) {
      if (value === 'auto') {
        this._element.style.height = '';
        return;
      }
      this._height = value;
      if (Utils.isNumber(value)) {
        value = value + 'px';
      }
      this._element.style.height = value;
      this.emit('change:height', this._height);
      this.emit('change:size', this.size);
      this.emit('change:frame', this.frame);
    }
  });

  View._alias('w', 'width');

  View._alias('h', 'height');

  View._def('minWidth', null, function(value) {
    if (Utils.isNumber(value)) {
      value = value + 'px';
    }
    return this._element.style.minWidth = value;
  });

  View._def('maxWidth', null, function(value) {
    if (Utils.isNumber(value)) {
      value = value + 'px';
    }
    return this._element.style.maxWidth = value;
  });

  View._def('minHeight', null, function(value) {
    if (Utils.isNumber(value)) {
      value = value + 'px';
    }
    return this._element.style.minHeight = value;
  });

  View._def('maxHeight', null, function(value) {
    if (Utils.isNumber(value)) {
      value = value + 'px';
    }
    return this._element.style.maxHeight = value;
  });

  View._def_min = function(name) {
    return this.define('min' + name.toUpperCase(), {
      get: function() {
        var cs;
        cs = 'left';
        if (name === 'y') {
          cs = 'top';
        }
        if (typeof this[name] === 'string' && this[name].indexOf('%') >= 0) {
          return parseFloat(this.computedStyle()[cs], 10);
        }
        return this[name];
      },
      set: function(value) {
        this[name] = value;
      }
    });
  };

  View._def_mid = function(name) {
    return this.define('mid' + name.toUpperCase(), {
      get: function() {
        var cs, size;
        size = 'width';
        if (name === 'y') {
          size = 'height';
        }
        cs = 'left';
        if (name === 'y') {
          cs = 'top';
        }
        if (typeof this[name] === 'string' && this[name].indexOf('%') >= 0) {
          return parseFloat(this.computedStyle()[cs], 10) + this[size] / 2;
        }
        return this[name] + this[size] / 2;
      },
      set: function(value) {
        var size;
        size = 'width';
        if (name === 'y') {
          size = 'height';
        }
        this[name] = value - (this[size] / 2);
      }
    });
  };

  View._def_max = function(name) {
    return this.define('max' + name.toUpperCase(), {
      get: function() {
        var cs, size;
        size = 'width';
        if (name === 'y') {
          size = 'height';
        }
        cs = 'left';
        if (name === 'y') {
          cs = 'top';
        }
        if (typeof this[name] === 'string' && this[name].indexOf('%') >= 0) {
          return parseFloat(this.computedStyle()[cs], 10) + this[size];
        }
        return this[name] + this[size];
      },
      set: function(value) {
        var size;
        size = 'width';
        if (name === 'y') {
          size = 'height';
        }
        this[name] = value - this[size];
      }
    });
  };

  View._def_min('x');

  View._def_min('y');

  View._def_mid('x');

  View._def_mid('y');

  View._def_max('x');

  View._def_max('y');

  View.define('point', {
    get: function() {
      return {
        x: this.x,
        y: this.y
      };
    },
    set: function(value) {
      if (value.x !== void 0) {
        this.x = value.x;
      }
      if (value.y !== void 0) {
        this.y = value.y;
      }
    }
  });

  View.define('size', {
    get: function() {
      return {
        width: this.width,
        height: this.height
      };
    },
    set: function(value) {
      if (value.width !== void 0) {
        this.width = value.width;
      }
      if (value.height !== void 0) {
        this.height = value.height;
      }
    }
  });

  View.define('frame', {
    get: function() {
      return {
        x: this.x,
        y: this.y,
        width: this.width,
        height: this.height
      };
    },
    set: function(value) {
      if (value.x !== void 0) {
        this.x = value.x;
      }
      if (value.y !== void 0) {
        this.y = value.y;
      }
      if (value.width !== void 0) {
        this.width = value.width;
      }
      if (value.height !== void 0) {
        this.height = value.height;
      }
    }
  });

  View.define('windowFrame', {
    get: function() {
      return {
        x: this._element.getBoundingClientRect().left,
        y: this._element.getBoundingClientRect().top,
        width: this.width,
        height: this.height
      };
    },
    set: function(value) {
      if (value.x !== void 0) {
        this.x = value.x;
      }
      if (value.y !== void 0) {
        this.y = value.y;
      }
      if (value.width !== void 0) {
        this.width = value.width;
      }
      if (value.height !== void 0) {
        this.height = value.height;
      }
      return this.fixed = true;
    }
  });

  View.define('backgroundColor', {
    configurable: true,
    get: function() {
      if (this._background === void 0) {
        return null;
      }
      return this._background;
    },
    set: function(value) {
      if (!value) {
        value = '';
      }
      if (value === 'clear') {
        value = 'transparent';
      }
      value = Color.toColor(value);
      if (value && value.color) {
        this._background = value.color;
      } else {
        this._background = value;
      }
      return this._element.style.background = value;
    }
  });

  View._alias('bc', 'backgroundColor');

  View.define('display', {
    get: function() {
      if (this._element.style.display === 'none') {
        return false;
      }
      if (this._element.style.display === '') {
        return true;
      }
      return this._element.style.display;
    },
    set: function(value) {
      if (!Utils.isString(value)) {
        if (value === true) {
          return this._element.style.display = 'block';
        } else {
          return this._element.style.display = 'none';
        }
      } else {
        this._element.style.display = value;
        return this._element.style.webkitDisplay = value;
      }
    }
  });

  View.define('visible', {
    get: function() {
      var visibility;
      visibility = this._element.style.visibility;
      if (visibility === 'visible' || visibility === '') {
        return true;
      }
      return false;
    },
    set: function(value) {
      if (value === true) {
        value = 'visible';
      } else {
        value = 'hidden';
      }
      return this._element.style.visibility = value;
    }
  });

  View.define('image', {
    configurable: true,
    get: function() {
      if (this._image === void 0) {
        return false;
      }
      return this._image;
    },
    set: function(value) {
      this._background = null;
      this._image = value;
      this._element.style.backgroundImage = 'url(' + Utils.parseAsset(value) + ')';
      this._element.style.backgroundSize = 'cover';
      return this.imageRepeat = false;
    }
  });

  View._alias('backgroundImage', 'image');

  View.define('background', {
    get: function() {
      return this.image;
    },
    set: function(value) {
      if (Color.isColor(value) || value.color) {
        return this.backgroundColor = value;
      } else {
        this.image = value;
        this.imagePosition = 'center center';
        this.imageSize = 'cover';
        return this.imageRepeat = false;
      }
    }
  });

  View.define('imageSize', {
    get: function() {
      if (this._imageSize === void 0) {
        return 'cover';
      }
      return this._image;
    },
    set: function(value) {
      this._imageSize = value;
      if (Utils.isNumber(value)) {
        value = (value * 100) + '%';
      }
      return this._element.style.backgroundSize = value;
    }
  });

  View._alias('imageScale', 'imageSize');

  View.define('imageRepeat', {
    get: function() {
      if (this._imageRepeat === void 0) {
        return true;
      }
      return this._imageRepeat;
    },
    set: function(value) {
      if (value === true || value === 'repeat') {
        this._imageRepeat = true;
        this._element.style.backgroundRepeat = 'repeat';
        if (this.imageSize === 'cover') {
          return this.imageSize = 'auto';
        }
      } else {
        this._imageRepeat = false;
        return this._element.style.backgroundRepeat = 'no-repeat';
      }
    }
  });

  View.define('imageFixed', {
    get: function() {
      if (this._imageFixed === void 0) {
        this._imageFixed = false;
      }
      return this._imageFixed;
    },
    set: function(value) {
      if (value === true) {
        this._imageFixed = true;
        return this._element.style.backgroundAttachment = 'fixed';
      } else {
        this._imageFixed = false;
        return this._element.style.backgroundAttachment = 'scroll';
      }
    }
  });

  View.define('imagePosition', {
    get: function() {
      if (this._imagePosition === void 0) {
        this._imagePosition = '';
      }
      return this._imagePosition;
    },
    set: function(value) {
      this._imagePosition = value;
      if (typeof value === 'number') {
        value = value + 'px';
      }
      return this._element.style.backgroundPosition = value;
    }
  });

  View._def_style('opacity', 'opacity', 1);

  View._alias('alpha', 'opacity');

  View.define('clip', {
    get: function() {
      if (this._clip === void 0) {
        this._clip = true;
      }
      return this._clip;
    },
    set: function(value) {
      if (value === true) {
        this._clip = true;
        return this._element.style.overflow = 'hidden';
      } else {
        this._clip = false;
        return this._element.style.overflow = 'visible';
      }
    }
  });

  View.define('scrollTop', {
    get: function() {
      return this._element.scrollTop;
    },
    set: function(value) {
      return this._element.scrollTop = value;
    }
  });

  View._alias('scrollY', 'scrollTop');

  View.define('scrollLeft', {
    get: function() {
      return this._element.scrollLeft;
    },
    set: function(value) {
      return this._element.scrollLeft = value;
    }
  });

  View._alias('scrollX', 'scrollLeft');

  View.define("scrollFrame", {
    importable: false,
    get: function() {
      var frame;
      return frame = {
        x: this.scrollX,
        y: this.scrollY,
        width: this.width,
        height: this.height
      };
    },
    set: function(frame) {
      this.scrollX = frame.x;
      return this.scrollY = frame.y;
    }
  });

  View.define('scrollWidth', {
    get: function() {
      return this._element.scrollWidth;
    }
  });

  View.define('scrollHeight', {
    get: function() {
      return this._element.scrollHeight;
    }
  });

  View.define('scroll', {
    configurable: true,
    get: function() {
      if (this._scroll === void 0) {
        return false;
      }
      return this._scroll;
    },
    set: function(value) {
      if (value === true) {
        this._scroll = true;
        this._element.style.overflow = 'scroll';
        return this._element.style.webkitOverflowScrolling = 'touch';
      } else {
        this._scroll = false;
        if (this.clip) {
          return this._element.style.overflow = 'hidden';
        } else {
          return this._element.style.overflow = 'auto';
        }
      }
    }
  });

  View.define('scrollHorizontal', {
    configurable: true,
    get: function() {
      if (this._scrollHorizontal === void 0) {
        return false;
      }
      return this._scrollHorizontal;
    },
    set: function(value) {
      if (value === true) {
        this._scrollHorizontal = true;
        this._element.style.overflowX = 'scroll';
        if (this.clip && !this.scrollVertical) {
          this._element.style.overflowY = 'hidden';
        }
        this._element.style.webkitOverflowScrolling = 'touch';
      } else {
        this._scrollHorizontal = false;
        if (this.clip) {
          this._element.style.overflowX = 'hidden';
        } else {
          this._element.style.overflowX = 'auto';
        }
      }
    }
  });

  View.define('scrollVertical', {
    configurable: true,
    get: function() {
      if (this._scrollVertical === void 0) {
        return false;
      }
      return this._scrollVertical;
    },
    set: function(value) {
      if (value === true) {
        this._scrollVertical = true;
        this._element.style.overflowY = 'scroll';
        if (this.clip && !this.scrollHorizontal) {
          this._element.style.overflowX = 'hidden';
        }
        return this._element.style.webkitOverflowScrolling = 'touch';
      } else {
        this._scrollVertical = false;
        if (this.clip) {
          return this._element.style.overflowY = 'hidden';
        } else {
          return this._element.style.overflowY = 'auto';
        }
      }
    }
  });

  View._def_style('cursor', 'cursor', 'auto');

  View.define('parent', {
    enumerable: false,
    exportable: false,
    importable: true,
    get: function() {
      return this._parent || null;
    },
    set: function(view) {
      if (view === this._parent) {
        return;
      }
      Utils.domCompleteCancel(this.__insertElement);
      if (this._parent) {
        if (this._parent === App._wrapper) {
          App._page = null;
          App.emit('change:page', {
            added: [],
            removed: [this]
          });
        }
        this.emit(Event.WillDisappear);
        if (this.willDisappear) {
          this.willDisappear();
        }
        this._parent._children = Utils.without(this._parent._children, this);
        if (this._element.parentNode === this._parent._element) {
          this._parent._element.removeChild(this._element);
        }
        this._parent.emit("change:children", {
          added: [],
          removed: [this]
        });
        this.emit(Event.DidDisappear);
        if (this.didDisappear) {
          this.didDisappear();
        }
      }
      if (view) {
        if (view._kind === 'App') {
          if (this._kind === 'Page') {
            view = App._wrapper;
            App._page = this;
            App._pages_counter++;
          } else {
            throw Error("View: parent view must be a page, not the App.");
            return;
          }
        }
        this.emit(Event.WillAppear);
        if (this.willAppear) {
          this.willAppear(this.__options);
        }
        view._element.appendChild(this._element);
        view._children.push(this);
        if (view._kind === 'App' && this._kind === 'Page') {
          App.emit('change:page', {
            added: [this],
            removed: []
          });
        }
        view.emit("change:children", {
          added: [this],
          removed: []
        });
        if (this.didAppear) {
          this._didAppear = true;
          this.didAppear(this.__options);
        }
        this.emit(Event.DidAppear);
      }
      this._parent = view;
      return this.emit("change:parent");
    }
  });

  View._alias('addTo', 'parent');

  View.define('children', {
    enumerable: false,
    exportable: false,
    importable: false,
    get: function() {
      return Utils.clone(this._children);
    }
  });

  View.define('siblings', {
    enumerable: false,
    exportable: false,
    importable: false,
    get: function() {
      if (!this.parent) {
        return null;
      }
      return Utils.without(this.parent._children, this);
    }
  });

  View.define('descendants', {
    enumerable: false,
    exportable: false,
    importable: false,
    get: function() {
      var f, result;
      result = [];
      f = function(view) {
        result.push(view);
        return view.children.map(f);
      };
      this.children.map(f);
      return result;
    }
  });

  View.define('index', {
    get: function() {
      if (!this._index) {
        this._index = 0;
      }
      return this._index;
    },
    set: function(value) {
      this._index = parseInt(value);
      this.emit('change:index', value);
      return this._element.style.zIndex = value;
    }
  });

  View.define('flex', {
    get: function() {
      return this._flex;
    },
    set: function(value) {
      if (value === true) {
        this._element.style.flex = '1';
      } else if (value === false) {
        this._element.style.flex = '0';
      } else {
        this._element.style.flex = String(value);
        this._element.style.webkitFlex = String(value);
      }
      return this._flex = value;
    }
  });

  View.define('originX', {
    get: function() {
      if (this._originX === void 0) {
        return 0.5;
      }
      return this._originX;
    },
    set: function(value) {
      if (value < 0 || value > 1) {
        value = 0.5;
      }
      this._originX = value;
      if (this._originY === void 0) {
        this._originY = 0.5;
      }
      this._element.style.transformOrigin = value * 100 + '% ' + this._originY * 100 + '%';
    }
  });

  View.define('originY', {
    get: function() {
      if (this._originY === void 0) {
        return 0.5;
      }
      return this._originY;
    },
    set: function(value) {
      if (value < 0 || value > 1) {
        value = 0.5;
      }
      this._originY = value;
      if (this._originX === void 0) {
        this._originX = 0.5;
      }
      return this._element.style.transformOrigin = this._originX * 100 + '% ' + value * 100 + '%';
    }
  });

  View._def('perspective', 0, function(value) {
    return this._element.style.perspective = value + 'px';
  });

  View._def('preserve3D', false, function(value) {
    if (value) {
      value = 'preserve-3d';
    } else {
      value = 'flat';
    }
    this._element.style.webkitTransformStyle = value;
    return this._element.style.transformStyle = value;
  });

  View._def('translate', 0, function(value) {
    this._translateX = value;
    this._translateY = value;
    return this._updateTransform();
  });

  View._def('translateX', 0, function(value) {
    if (this._translateY === void 0) {
      this._translateY = 0;
    }
    return this._updateTransform();
  });

  View._def('translateY', 0, function(value) {
    if (this._translateX === void 0) {
      this._translateX = 0;
    }
    return this._updateTransform();
  });

  View._def('translateZ', 0, function(value) {
    if (this._translateZ === void 0) {
      this._translateZ = 0;
    }
    return this._updateTransform();
  });

  View._def('rotation', 0, function() {
    return this._updateTransform();
  });

  View._alias('rotate', 'rotation');

  View._def('rotationX', 0, function() {
    return this._updateTransform();
  });

  View._alias('rotateX', 'rotationX');

  View._def('rotationY', 0, function() {
    return this._updateTransform();
  });

  View._alias('rotateY', 'rotationY');

  View._def('rotationZ', 0, function() {
    return this._updateTransform();
  });

  View._alias('rotateZ', 'rotationZ');

  View._def('scale', 1, function(value) {
    this._scaleX = value;
    this._scaleY = value;
    return this._updateTransform();
  });

  View._def('scaleX', 1, function(value) {
    if (this._scaleY === void 0) {
      this._scaleY = 1;
    }
    return this._updateTransform();
  });

  View._def('scaleY', 1, function(value) {
    if (this._scaleX === void 0) {
      this._scaleX = 1;
    }
    return this._updateTransform();
  });

  View._def('skew', 0, function(value) {
    this._skewX = value;
    this._skewY = value;
    return this._updateTransform();
  });

  View._def('skewX', 0, function(value) {
    if (this._skewY === void 0) {
      this._skewY = 0;
    }
    return this._updateTransform();
  });

  View._def('skewY', 0, function(value) {
    if (this._skewX === void 0) {
      this._skewX = 0;
    }
    return this._updateTransform();
  });

  View._def('blur', 0, function(value) {
    this._f_blur = 'blur(' + value + 'px) ';
    return this._updateEffects();
  });

  View._def('brightness', 1, function(value) {
    this._f_brightness = 'brightness(' + value + ') ';
    return this._updateEffects();
  });

  View._def('saturate', 100, function(value) {
    this._f_saturate = 'saturate(' + value + '%) ';
    return this._updateEffects();
  });

  View.define('hueRotate', {
    get: function() {
      if (this._hueRotate === void 0) {
        return 0;
      }
      return this._hueRotate;
    },
    set: function(value) {
      if (value < 0 || value > 360) {
        value = 0;
      }
      this._hueRotate = value;
      this._f_hueRotate = 'hue-rotate(' + value + 'deg) ';
      return this._updateEffects();
    }
  });

  View._def('contrast', 100, function(value) {
    this._f_contrast = 'contrast(' + value + '%) ';
    return this._updateEffects();
  });

  View.define('invert', {
    get: function() {
      if (this._invert === void 0) {
        return 0;
      }
      return this._invert;
    },
    set: function(value) {
      if (value < 0 || value > 100) {
        value = 0;
      }
      this._invert = value;
      this._f_invert = 'invert(' + value + '%) ';
      return this._updateEffects();
    }
  });

  View.define('grayscale', {
    get: function() {
      if (this._grayscale === void 0) {
        return 0;
      }
      return this._grayscale;
    },
    set: function(value) {
      if (value < 0 || value > 100) {
        value = 0;
      }
      this._grayscale = value;
      this._f_grayscale = 'grayscale(' + value + '%) ';
      return this._updateEffects();
    }
  });

  View.define('sepia', {
    get: function() {
      if (this._sepia === void 0) {
        return 0;
      }
      return this._sepia;
    },
    set: function(value) {
      if (value < 0 || value > 100) {
        value = 0;
      }
      this._sepia = value;
      this._f_sepia = 'sepia(' + value + '%) ';
      return this._updateEffects();
    }
  });

  View._def('backdropBlur', 0, function(value) {
    this._bf_blur = 'blur(' + value + 'px) ';
    return this._updateBackDropEffects();
  });

  View._def('backdropBrightness', 1, function(value) {
    this._bf_brightness = 'brightness(' + value + ') ';
    return this._updateBackDropEffects();
  });

  View._def('backdropSaturate', 100, function(value) {
    this._bf_saturate = 'saturate(' + value + '%) ';
    return this._updateBackDropEffects();
  });

  View.define('backdropHueRotate', {
    get: function() {
      if (this._hueRotate === void 0) {
        return 0;
      }
      return this._hueRotate;
    },
    set: function(value) {
      if (value < 0 || value > 360) {
        value = 0;
      }
      this._hueRotate = value;
      this._bf_hueRotate = 'hue-rotate(' + value + 'deg) ';
      return this._updateBackDropEffects();
    }
  });

  View._def('backdropContrast', 100, function(value) {
    this._bf_contrast = 'contrast(' + value + '%) ';
    return this._updateBackDropEffects();
  });

  View.define('backdropInvert', {
    get: function() {
      if (this._invert === void 0) {
        return 0;
      }
      return this._invert;
    },
    set: function(value) {
      if (value < 0 || value > 100) {
        value = 0;
      }
      this._invert = value;
      this._bf_invert = 'invert(' + value + '%) ';
      return this._updateBackDropEffects();
    }
  });

  View.define('backdropGrayscale', {
    get: function() {
      if (this._grayscale === void 0) {
        return 0;
      }
      return this._grayscale;
    },
    set: function(value) {
      if (value < 0 || value > 100) {
        value = 0;
      }
      this._grayscale = value;
      this._bf_grayscale = 'grayscale(' + value + '%) ';
      return this._updateBackDropEffects();
    }
  });

  View.define('backdropSepia', {
    get: function() {
      if (this._sepia === void 0) {
        return 0;
      }
      return this._sepia;
    },
    set: function(value) {
      if (value < 0 || value > 100) {
        value = 0;
      }
      this._sepia = value;
      this._bf_sepia = 'sepia(' + value + '%) ';
      return this._updateBackDropEffects();
    }
  });

  View._def('shadowX', 0, function() {
    return this._updateShadow();
  });

  View._def('shadowY', 0, function() {
    return this._updateShadow();
  });

  View._def('shadowBlur', 0, function() {
    return this._updateShadow();
  });

  View._def('shadowSpread', 0, function() {
    return this._updateShadow();
  });

  View._def('shadowColor', 'black', function() {
    return this._updateShadow();
  });

  View.define('shadowInset', {
    get: function() {
      if (this._shadowInset === void 0) {
        return '';
      }
      return this._shadowInset;
    },
    set: function(value) {
      if (value === true) {
        value = 'inset';
      } else {
        value = '';
      }
      this._shadowInset = value;
      return this._updateShadow();
    }
  });

  View.define('borderBox', {
    get: function() {
      if (this._borderBox === void 0) {
        this._borderBox = false;
      }
      return this._borderBox;
    },
    set: function(value) {
      if (value === true) {
        this._borderBox = true;
        return this._element.style.boxSizing = 'border-box';
      } else {
        this._borderBox = false;
        return this._element.style.boxSizing = 'content-box';
      }
    }
  });

  View._def('borderRadius', 0, function(value) {
    if (typeof value === 'number') {
      value = value + 'px';
    }
    this._element.style.borderRadius = value;
    this._element.style.webkitBorderRadius = value;
    this._element.style.mozBorderRadius = value;
    this._element.style.msBorderRadius = value;
    return this._element.style.oBorderRadius = value;
  });

  View._alias('br', 'borderRadius');

  View._alias('cornerRadius', 'borderRadius');

  View._def('borderTopLeftRadius', 0, function(value) {
    if (typeof value === 'number') {
      value = value + 'px';
    }
    this._element.style.borderTopLeftRadius = value;
    this._element.style.webkitBorderTopLeftRadius = value;
    this._element.style.mozBorderTopLeftRadius = value;
    this._element.style.msBorderTopLeftRadius = value;
    return this._element.style.oBorderTopLeftRadius = value;
  });

  View._def('borderTopRightRadius', 0, function(value) {
    if (typeof value === 'number') {
      value = value + 'px';
    }
    this._element.style.borderTopRightRadius = value;
    this._element.style.webkitBorderTopRightRadius = value;
    this._element.style.mozBorderTopRightRadius = value;
    this._element.style.msBorderTopRightRadius = value;
    return this._element.style.oBorderTopRightRadius = value;
  });

  View._def('borderBottomLeftRadius', 0, function(value) {
    if (typeof value === 'number') {
      value = value + 'px';
    }
    this._element.style.borderBottomLeftRadius = value;
    this._element.style.webkitBorderBottomLeftRadius = value;
    this._element.style.mozBorderBottomLeftRadius = value;
    this._element.style.msBorderBottomLeftRadius = value;
    return this._element.style.oBorderBottomLeftRadiuss = value;
  });

  View._def('borderBottomRightRadius', 0, function(value) {
    if (typeof value === 'number') {
      value = value + 'px';
    }
    this._element.style.borderBottomRightRadius = value;
    this._element.style.webkitBorderBottomRightRadius = value;
    this._element.style.mozBorderBottomRightRadius = value;
    this._element.style.msBorderBottomRightRadius = value;
    return this._element.style.oBorderBottomRightRadius = value;
  });

  View._def('borderColor', '', function(value) {
    if (value === 'clear') {
      value = 'transparent';
    }
    return this._element.style.borderColor = value;
  });

  View._def('borderTopColor', '', function(value) {
    if (value === 'clear') {
      value = 'transparent';
    }
    return this._element.style.borderTopColor = value;
  });

  View._def('borderBottomColor', '', function(value) {
    if (value === 'clear') {
      value = 'transparent';
    }
    return this._element.style.borderBottomColor = value;
  });

  View._def('borderLeftColor', '', function(value) {
    if (value === 'clear') {
      value = 'transparent';
    }
    return this._element.style.borderLeftColor = value;
  });

  View._def('borderRightColor', '', function(value) {
    if (value === 'clear') {
      value = 'transparent';
    }
    return this._element.style.borderRightColor = value;
  });

  View._def_style('borderStyle', 'borderStyle', 'solid');

  View._def('borderWidth', 0, function(value) {
    if (typeof value === 'number') {
      value = value + 'px';
    }
    this._element.style.borderWidth = value;
    return this._element.style.borderStyle = this.borderStyle;
  });

  View._def('borderLeftWidth', 0, function(value) {
    if (typeof value === 'number') {
      value = value + 'px';
    }
    this._element.style.borderLeftWidth = value;
    return this._element.style.borderStyle = this.borderStyle;
  });

  View._def('borderRightWidth', 0, function(value) {
    if (typeof value === 'number') {
      value = value + 'px';
    }
    this._element.style.borderRightWidth = value;
    return this._element.style.borderStyle = this.borderStyle;
  });

  View._def('borderTopWidth', 0, function(value) {
    if (typeof value === 'number') {
      value = value + 'px';
    }
    this._element.style.borderTopWidth = value;
    return this._element.style.borderStyle = this.borderStyle;
  });

  View._def('borderBottomWidth', 0, function(value) {
    if (typeof value === 'number') {
      value = value + 'px';
    }
    this._element.style.borderBottomWidth = value;
    return this._element.style.borderStyle = this.borderStyle;
  });

  View.define('userInteraction', {
    get: function() {
      if (this._userInteraction === void 0) {
        this._userInteraction = false;
      }
      return this._userInteraction;
    },
    set: function(value) {
      if (value === true) {
        this._userInteraction = true;
        this.classList.remove('no-select');
        return this.classList.add('select');
      } else {
        this._userInteraction = false;
        this.classList.remove('select');
        return this.classList.add('no-select');
      }
    }
  });

  View._alias('interaction', 'userInteraction');

  View.define("states", {
    enumerable: false,
    exportable: false,
    importable: false,
    get: function() {
      return this._states != null ? this._states : this._states = new ViewStates(this);
    }
  });

  View.define('draggable', {
    get: function() {
      return this._draggable != null ? this._draggable : this._draggable = new ViewDraggable(this);
    },
    set: function(value) {
      if (Utils.isBoolean(value)) {
        return this.draggable.enabled = value;
      }
    }
  });

  View.define('transition', {
    get: function() {
      return this._transition;
    },
    set: function(options) {
      var properties;
      if (options === false) {
        if (this._transition) {
          this._transition.disable();
        }
        return;
      }
      properties = {
        view: this,
        duration: 0.2
      };
      if (typeof options === 'object') {
        if (options.duration) {
          properties.duration = options.duration;
        }
        if (options.delay) {
          properties.delay = options.delay;
        }
        if (options.curve) {
          properties.curve = options.curve;
        }
      }
      this._transition = new Transition(properties);
      return this._transition.start();
    }
  });

  View.define('isAnimating', {
    enumerable: false,
    exportable: false,
    get: function() {
      return this.animations().length !== 0;
    }
  });

  View.define('hoverAnimated', {
    get: function() {
      if (this._hover) {
        this._hover.values;
      } else {
        this._hover = {};
      }
      return this._hover;
    },
    set: function(values) {
      var i, keys;
      if (!values || typeof values !== 'object') {
        false;
      }
      this._hover = {};
      this._hover.originalValues = {};
      this._hover.transition = null;
      this._hover.animate = true;
      this._hover.options = {
        duration: 0.2
      };
      if (values.hasOwnProperty('animated') && values.animated === false) {
        this._hover.animate = false;
      }
      if (values.hasOwnProperty('options')) {
        this._hover.options = values['options'];
        delete values['options'];
      }
      keys = Object.keys(values);
      i = 0;
      while (i < keys.length) {
        if (keys[i] in this) {
          this._hover.originalValues[keys[i]] = this[keys[i]];
        }
        i++;
      }
      this._hover.values = values;
      this.on(Event.In, function(event, view) {
        var item, req;
        if (!this._hover.animate) {
          this.props = this._hover.values;
          return;
        }
        req = {
          properties: this._hover.values,
          view: this
        };
        for (item in this._hover.options) {
          req[item] = this._hover.options[item];
        }
        this._hover.transition = new Transition(req);
        return this._hover.transition.start();
      });
      return this.on(Event.Out, function(event, view) {
        if (!this._hover.animate) {
          this.props = this._hover.originalValues;
          return;
        }
        if (!this._hover.transition.options) {
          this._hover.transition.options = {};
        }
        this._hover.transition.options.properties = this._hover.originalValues;
        return this._hover.transition.start(true);
      });
    }
  });

  View.define('hover', {
    get: function() {
      return this.hoverAnimated;
    },
    set: function(values) {
      if (values.animate !== void 0) {
        values.animated = values.animate;
      }
      if (values.animated === void 0) {
        values.animated = false;
      }
      return this.hoverAnimated = values;
    }
  });

  View.define('delegate', {
    get: function() {
      if (this._delegate === void 0) {
        this._delegate = null;
      }
      return this._delegate;
    },
    set: function(value) {
      return this._delegate = value;
    }
  });

  View.define('pointerEvent', {
    get: function() {
      if (this._element.style.pointerEvents === 'none') {
        return false;
      }
      return true;
    },
    set: function(value) {
      if (value) {
        value = 'auto';
      } else {
        value = 'none';
      }
      return this._element.style.pointerEvents = value;
    }
  });

  View._alias('pointerEvents', 'pointerEvent');

  View._alias('ignoreEvent', 'pointerEvent');

  View._def('tooltip', null, function(value) {
    return this._element.setAttribute('title', value);
  });


  /*
  	*	normal
  	*	multiply
  	*	screen
  	*	overlay
  	*	darken
  	*	lighten
  	*	color-dodge
  	*	color-burn
  	*	hard-light
  	*	soft-light
  	*	difference
  	*	exclusion
  	*	hue
  	*	saturation
  	*	color
  	*	luminosity
   */

  View.define('blend', {
    get: function() {
      return this._element.style.mixBlendMode;
    },
    set: function(value) {
      return this._element.style.mixBlendMode = value;
    }
  });

  View._def('force2d', false, function(value) {
    if (value === true) {
      this._element.style.webkitTransform = '';
      this._element.style.mozTransform = '';
      this._element.style.msTransform = '';
      this._element.style.oTransform = '';
      return this._element.style.transform = '';
    }
  });

  View.define('fontSize', {
    get: function() {
      return parseFloat(this._element.style.fontSize, 10);
    },
    set: function(value) {
      if (typeof value === 'number') {
        value = value + 'px';
      }
      this._element.style.fontSize = value;
    }
  });

  View._alias('fsize', 'fontSize');

  View.define('fontStyle', {
    get: function() {
      return this._element.style.fontStyle;
    },
    set: function(value) {
      return this._element.style.fontStyle = value;
    }
  });

  View.define('fontWeight', {
    get: function() {
      return this._element.style.fontWeight;
    },
    set: function(value) {
      return this._element.style.fontWeight = value;
    }
  });

  View._alias('weight', 'fontWeight');

  View.define('fontName', {
    get: function() {
      return this._element.style.fontFamily;
    },
    set: function(value) {
      return this._element.style.fontFamily = value + ', sans-serif';
    }
  });

  View._alias('fontFamily', 'fontName');

  View.define('font', {
    get: function() {
      return this._element.style.font;
    },
    set: function(value) {
      return this._element.style.font = value;
    }
  });

  View.define('color', {
    get: function() {
      return this._element.style.color;
    },
    set: function(value) {
      if (value === 'clear') {
        value = 'transparent';
      }
      value = Color.toColor(value);
      if (value && value.color) {
        value = value.color;
      } else {
        value = value;
      }
      return this._element.style.color = value;
    }
  });

  View.define('align', {
    get: function() {
      return this._element.style.textAlign;
    },
    set: function(value) {
      return this._element.style.textAlign = value;
    }
  });

  View._alias('textAlignment', 'align');

  View._alias('textAlign', 'align');

  View.prototype.addChild = function(view) {
    return view.parent = this;
  };

  View.prototype.add = function(view) {
    return this.addChild(view);
  };

  View.prototype.removeChild = function(view) {
    if (__indexOf.call(this.children, view) < 0) {
      return;
    }
    return view.parent = null;
  };

  View.prototype.remove = function(view) {
    return this.removeChild(view);
  };

  View.prototype.ancestors = function(context) {
    var currentView, parents;
    if (context == null) {
      context = false;
    }
    parents = [];
    currentView = this;
    if (context === false) {
      while (currentView.parent) {
        parents.push(currentView.parent);
        currentView = currentView.parent;
      }
    } else {
      while (currentView._parentOrContext()) {
        parents.push(currentView._parentOrContext());
        currentView = currentView._parentOrContext();
      }
    }
    return parents;
  };

  View.prototype.childrenWithName = function(name) {
    return this.children.filter(function(view) {
      return view.name === name;
    });
  };

  View.prototype.siblingsWithName = function(name) {
    return this.siblings.filter(function(view) {
      return view.name === name;
    });
  };

  View.prototype.childrenAbove = function(point, originX, originY) {
    if (originX == null) {
      originX = 0;
    }
    if (originY == null) {
      originY = 0;
    }
    return this.children.filter(function(view) {
      return Utils.framePointForOrigin(view.frame, originX, originY).y < point.y;
    });
  };

  View.prototype.childrenBelow = function(point, originX, originY) {
    if (originX == null) {
      originX = 0;
    }
    if (originY == null) {
      originY = 0;
    }
    return this.children.filter(function(view) {
      return Utils.framePointForOrigin(view.frame, originX, originY).y > point.y;
    });
  };

  View.prototype.childrenLeft = function(point, originX, originY) {
    if (originX == null) {
      originX = 0;
    }
    if (originY == null) {
      originY = 0;
    }
    return this.children.filter(function(view) {
      return Utils.framePointForOrigin(view.frame, originX, originY).x < point.x;
    });
  };

  View.prototype.childrenRight = function(point, originX, originY) {
    if (originX == null) {
      originX = 0;
    }
    if (originY == null) {
      originY = 0;
    }
    return this.children.filter(function(view) {
      return Utils.framePointForOrigin(view.frame, originX, originY).x > point.x;
    });
  };

  View.prototype._parentOrContext = function() {
    if (this.parent) {
      return this.parent;
    }
    if (this._context._parent) {
      return this._context._parent;
    }
  };

  View.prototype.bringToFront = function() {
    if (!this.siblings) {
      return;
    }
    return this.index = Utils.max(Utils.union([0], this.siblings.map(function(view) {
      return view.index;
    }))) + 1;
  };

  View.prototype.sendToBack = function() {
    if (!this.siblings) {
      return;
    }
    return this.index = Utils.max(Utils.union([0], this.siblings.map(function(view) {
      return view.index;
    }))) - 1;
  };

  View.prototype.placeBefore = function(view) {
    var v, _i, _len, _ref;
    if (__indexOf.call(this.siblings, view) < 0) {
      return;
    }
    _ref = this.siblings;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      v = _ref[_i];
      if (v.index <= view.index) {
        v.index -= 1;
      }
    }
    return this.index = view.index + 1;
  };

  View.prototype.placeBehind = function(view) {
    var v, _i, _len, _ref;
    if (__indexOf.call(this.siblings, view) < 0) {
      return;
    }
    _ref = this.siblings;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      v = _ref[_i];
      if (v.index >= view.index) {
        v.index += 1;
      }
    }
    return this.index = view.index - 1;
  };

  View.prototype.computedStyle = function(property) {
    if (property !== void 0) {
      return window.getComputedStyle(this._element).getPropertyValue(property);
    }
    return window.getComputedStyle(this._element);
  };

  View.prototype.cx = function() {
    var value;
    value = this.computedStyle().getPropertyValue('left');
    if (value === '') {
      return null;
    }
    return parseFloat(value, 10);
  };

  View.prototype.cy = function() {
    var value;
    value = this.computedStyle().getPropertyValue('top');
    if (value === '') {
      return null;
    }
    return parseFloat(value, 10);
  };

  View.prototype.cwidth = function() {
    return parseFloat(this.computedStyle().getPropertyValue('width'), 10);
  };

  View.prototype.cheight = function() {
    return parseFloat(this.computedStyle().getPropertyValue('height'), 10);
  };

  View.prototype.destroy = function(descendance) {
    var view, _i, _len, _ref, _ref1;
    if (this.parent) {
      this.parent._children = Utils.without(this.parent._children, this);
    }
    if ((_ref = this._element.parentNode) != null) {
      _ref.removeChild(this._element);
    }
    this.removeAllListeners();
    this._context.removeView(this);
    this._context.emit("view:destroy", this);
    if (descendance) {
      _ref1 = this.descendants;
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        view = _ref1[_i];
        view.destroy();
      }
    }
  };

  View.prototype.copy = function() {
    var clonedView;
    clonedView = Utils.clone(this);
    clonedView._element = this._element.cloneNode(true);
    clonedView._element.instance = clonedView;
    clonedView._events = void 0;
    clonedView._id = Utils.randomID();
    clonedView._element.setAttribute('id', ("Orbe" + this._kind + "::") + clonedView.id);
    clonedView._parent = null;
    return clonedView;

    /*
    		view = @copySingle()
    		for child in @children
    			copiedChild = child.copy()
    			copiedChild.parent = view
    		view
     */
  };

  View.prototype.copySingle = function() {
    var clonedView;
    clonedView = Utils.clone(this);
    clonedView._parent = null;
    clonedView._element = this._element.cloneNode(false);
    clonedView._events = void 0;
    clonedView._id = Utils.randomID();
    clonedView._element.setAttribute('id', ("Orbe" + this._kind + "::") + clonedView.id);
    clonedView._children = [];
    return clonedView;
  };

  View.prototype.querySelector = function(selector) {
    return this._element.querySelector(selector);
  };

  View.prototype.querySelectorAll = function(selector) {
    return this._element.querySelectorAll(selector);
  };

  View.prototype.pixelAlign = function() {
    this.x = parseInt(this.x);
    return this.y = parseInt(this.y);
  };

  View.prototype.contentFrame = function() {
    var i, maxHeight, maxWidth, maxX, maxY;
    maxWidth = 0;
    maxHeight = 0;
    i = 0;
    while (i < this.children.length) {
      maxX = this.children[i].x + this.children[i].width;
      maxY = this.children[i].y + this.children[i].height;
      if (maxX > maxWidth) {
        maxWidth = maxX;
      }
      if (maxY > maxHeight) {
        maxHeight = maxY;
      }
      i++;
    }
    return {
      x: 0,
      y: 0,
      width: maxWidth,
      height: maxHeight
    };
  };

  View.prototype.centerFrame = function() {
    var frame, height, width;
    if (this.parent) {
      frame = this.frame;
      width = this.parent.width;
      if (Utils.isString(this.parent.width)) {
        width = this.parent.cwidth();
      }
      height = this.parent.height;
      if (Utils.isString(this.parent.height)) {
        height = this.parent.cheight();
      }
      Utils.frameSetMidX(frame, parseInt((width / 2.0) - this.borderWidth - this.marginLeft));
      Utils.frameSetMidY(frame, parseInt((height / 2.0) - this.borderWidth - this.marginTop));
      return frame;
    } else {
      frame = this.frame;
      Utils.frameSetMidX(frame, parseInt(this._context.width / 2.0) - this.borderWidth - this.marginLeft);
      Utils.frameSetMidY(frame, parseInt(this._context.height / 2.0) - this.borderWidth - this.marginTop);
      return frame;
    }
  };

  View.prototype.absoluteCenter = function(autoResize) {
    var frame, that;
    frame = this.centerFrame();

    /*
    		if not @parent
    			@x = frame.x
    			@y = frame.y
    
    		return
     */
    this.x = {
      value: frame.x,
      centerX: true
    };
    this.y = {
      value: frame.y,
      centerY: true
    };
    if (!autoResize) {
      if (!this.parent) {
        return;
      }
      if (Utils.isString(this.parent.width) ||  Utils.isString(this.parent.height)) {
        that = this;
        App.onResize(function() {
          frame = that.centerFrame();
          if (that._keepCenterX) {
            that.x = {
              value: frame.x,
              centerX: true
            };
          }
          if (that._keepCenterY) {
            return that.y = {
              value: frame.y,
              centerY: true
            };
          }
        });
      }
    }
    return this;
  };

  View.prototype.absoluteCenterX = function(offset, autoResize) {
    var that;
    if (offset == null) {
      offset = 0;
    }
    this.x = {
      value: this.centerFrame().x + offset,
      centerX: true
    };
    if (!autoResize) {
      if (!this.parent) {
        return;
      }
      if (Utils.isString(this.parent.width) ||  Utils.isString(this.parent.height)) {
        that = this;
        App.onResize(function() {
          var frame;
          frame = that.centerFrame();
          if (that._keepCenterX) {
            return that.x = {
              value: frame.x + offset,
              centerX: true
            };
          }
        });
      }
    }
    return this;
  };

  View.prototype.absoluteCenterY = function(offset, autoResize) {
    var that;
    if (offset == null) {
      offset = 0;
    }
    this.y = {
      value: this.centerFrame().y + offset,
      centerY: true
    };
    if (!autoResize) {
      if (!this.parent) {
        return;
      }
      if (Utils.isString(this.parent.width) ||  Utils.isString(this.parent.height)) {
        that = this;
        App.onResize(function() {
          var frame;
          frame = that.centerFrame();
          if (that._keepCenterY) {
            return that.y = {
              value: frame.y + offset,
              centerY: true
            };
          }
        });
      }
    }
    return this;
  };

  View.prototype.center = function() {
    this._element.style.position = "absolute";
    this.x = "50%";
    this.y = "50%";
    this.marginLeft = -(this.width / 2);
    return this.marginTop = -(this.height / 2);
  };

  View.prototype.centerX = function(offset) {
    this.element.style.position = 'absolute';
    this.x = '50%';
    if (offset === void 0) {
      offset = 0;
    }
    this.marginLeft = -(this.width / 2) + offset;
  };

  View.prototype.centerY = function(offset) {
    this.element.style.position = 'absolute';
    this.y = '50%';
    if (offset === void 0) {
      offset = 0;
    }
    return this.marginTop = -(this.height / 2) + offset;
  };

  View.prototype.animate = function(options) {
    var animation, start;
    start = options.start;
    if (!start) {
      start = true;
    }
    delete options.start;
    options.view = this;
    animation = new Animation(options);
    if (start) {
      animation.start();
    }
    return animation;
  };

  View.prototype.animations = function() {
    return this._context.animations.filter((function(_this) {
      return function(animation) {
        return animation.options.view === _this;
      };
    })(this));
  };

  View.prototype.animatingProperties = function() {
    var animation, properties, propertyName, _i, _j, _len, _len1, _ref, _ref1;
    properties = {};
    _ref = this.animations();
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      animation = _ref[_i];
      _ref1 = animation.animatingProperties();
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        propertyName = _ref1[_j];
        properties[propertyName] = animation;
      }
    }
    return properties;
  };

  View.prototype.animateStop = function() {
    var _ref;
    Utils.invoke(this.animations(), "stop");
    return (_ref = this._draggable) != null ? _ref.animateStop() : void 0;
  };

  View.prototype.animatingProperties = function() {
    var animation, i, j, len, len1, properties, propertyName, ref, ref1;
    properties = {};
    ref = this.animations();
    i = 0;
    len = ref.length;
    while (i < len) {
      animation = ref[i];
      ref1 = animation.animatingProperties();
      j = 0;
      len1 = ref1.length;
      while (j < len1) {
        propertyName = ref1[j];
        properties[propertyName] = animation;
        j++;
      }
      i++;
    }
    return properties;
  };

  View.prototype.enterFullScreen = function() {
    if (!document.fullscreenElement || !document.webkitFullscreenElement || !document.mozFullScreenElement || !document.msFullscreenElement) {
      if (this._element.requestFullscreen) {
        this._element.requestFullscreen();
      } else if (this._element.webkitRequestFullscreen) {
        this._element.webkitRequestFullscreen();
      } else if (this._element.mozRequestFullScreen) {
        this._element.mozRequestFullScreen();
      } else if (this._element.msRequestFullscreen) {
        this._element.msRequestFullscreen();
      }
    }
  };

  View.prototype.exitFullScreen = function() {
    if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  };

  View.prototype.isFullScreen = function() {
    if (document.fullscreenEnabled || document.mozFullscreenEnabled || document.webkitIsFullScreen) {
      return true;
    }
    return false;
  };

  View.prototype.fadeIn = function(parameters) {
    var time;
    if (!parameters) {
      parameters = {};
    }
    time = false;
    if (typeof parameters === 'number') {
      time = parameters;
      parameters = {};
    }
    if (parameters.props) {
      parameters.properties = parameters.props;
    }
    if (!parameters.properties) {
      parameters.properties = {};
    }
    parameters.properties.opacity = 1;
    if (!parameters.curve) {
      parameters.curve = 'linear';
    }
    if (time) {
      parameters.time = time;
    }
    return this.animate(parameters);
  };

  View.prototype.fadeOut = function(parameters) {
    var time;
    if (!parameters) {
      parameters = {};
    }
    time = false;
    if (typeof parameters === 'number') {
      time = parameters;
      parameters = {};
    }
    if (parameters.props) {
      parameters.properties = parameters.props;
    }
    if (!parameters.properties) {
      parameters.properties = {};
    }
    parameters.properties.opacity = 0;
    if (!parameters.curve) {
      parameters.curve = 'linear';
    }
    if (time) {
      parameters.time = time;
    }
    return this.animate(parameters);
  };

  View.prototype.removeAll = function() {
    var i;
    i = 0;
    while (i < this.children.length) {
      this.removeChild(this.children[i]);
      i++;
    }
  };

  View.prototype.empty = function() {
    return this.removeAll();
  };

  View.prototype.emit = function() {
    var args, eventName, velocity, _ref;
    eventName = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    if (this._cancelClickEventInDragSession) {
      if (eventName === Event.Click || eventName === Event.Tap || eventName === Event.TapStart || eventName === Event.TapEnd || eventName === Event.LongPress || eventName === Event.LongPressStart || eventName === Event.LongPressEnd) {
        if (this._parentDraggableView()) {
          velocity = (_ref = this._parentDraggableView()) != null ? _ref.draggable.velocity : void 0;
          if (Math.abs(velocity.x) > this._cancelClickEventInDragSessionVelocity) {
            return;
          }
          if (Math.abs(velocity.y) > this._cancelClickEventInDragSessionVelocity) {
            return;
          }
        }
      }
    }
    return View.__super__.emit.apply(this, [eventName].concat(__slice.call(args), [this]));
  };

  View.prototype.once = function(eventName, listener) {
    View.__super__.once.call(this, eventName, listener);
    return this._addListener(eventName, listener);
  };

  View.prototype.addListener = function(eventName, listener) {
    if (!eventName || !listener) {
      return;
    }
    View.__super__.addListener.call(this, eventName, listener);
    return this._addListener(eventName, listener);
  };

  View.prototype.removeListener = function(eventName, listener) {
    if (!eventName) {
      throw Error("View.off needs a valid event name");
    }
    View.__super__.removeListener.call(this, eventName, listener);
    return this._removeListener(eventName, listener);
  };

  View.prototype._addListener = function(eventName, listener) {
    if (Utils.domValidEvent(this._element, eventName) || __indexOf.call(Utils.values(Gesture), eventName) >= 0) {
      if (!this._domEventManager.listeners(eventName).length) {
        return this._domEventManager.addEventListener(eventName, (function(_this) {
          return function(event) {
            return _this.emit(eventName, event);
          };
        })(this));
      }
    }
  };

  View.prototype._removeListener = function(eventName, listener) {
    if (!this.listeners(eventName).length) {
      return this._domEventManager.removeAllListeners(eventName);
    }
  };

  View.prototype._parentDraggableView = function() {
    var view, _i, _len, _ref, _ref1;
    _ref = this.ancestors();
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      view = _ref[_i];
      if ((_ref1 = view._draggable) != null ? _ref1.enabled : void 0) {
        return view;
      }
    }
    return null;
  };

  View.prototype.on = View.prototype.addListener;

  View.prototype.off = View.prototype.removeListener;

  View.prototype.onWillAppear = function(cb) {
    return this.on(Event.WillAppear, cb);
  };

  View.prototype.onAppear = function(cb) {
    return this.on(Event.Appear, cb);
  };

  View.prototype.onDidAppear = function(cb) {
    return this.on(Event.DidAppear, cb);
  };

  View.prototype.onWillDisappear = function(cb) {
    return this.on(Event.WillDisappear, cb);
  };

  View.prototype.onDisappear = function(cb) {
    return this.on(Event.Disappear, cb);
  };

  View.prototype.onDidDisappear = function(cb) {
    return this.on(Event.DidDisappear, cb);
  };

  View.prototype.onClick = function(cb) {
    return this.on(Event.Click, cb);
  };

  View.prototype.onDoubleClick = function(cb) {
    return this.on(Event.DoubleClick, cb);
  };

  View.prototype.onIn = function(cb) {
    return this.on(Event.In, cb);
  };

  View.prototype.onOut = function(cb) {
    return this.on(Event.Out, cb);
  };

  View.prototype.onDown = function(cb) {
    return this.on(Event.Down, cb);
  };

  View.prototype.onOver = function(cb) {
    return this.on(Event.Over, cb);
  };

  View.prototype.onUp = function(cb) {
    return this.on(Event.Up, cb);
  };

  View.prototype.onMove = function(cb) {
    return this.on(Event.Move, cb);
  };

  View.prototype.onRightClick = function(cb) {
    return this.on(Event.RightClick, cb);
  };

  View.prototype.onMouseIn = function(cb) {
    return this.on(Event.MouseIn, cb);
  };

  View.prototype.onMouseUp = function(cb) {
    return this.on(Event.MouseUp, cb);
  };

  View.prototype.onMouseDown = function(cb) {
    return this.on(Event.MouseDown, cb);
  };

  View.prototype.onMouseOver = function(cb) {
    return this.on(Event.MouseOver, cb);
  };

  View.prototype.onMouseOut = function(cb) {
    return this.on(Event.MouseOut, cb);
  };

  View.prototype.onMouseMove = function(cb) {
    return this.on(Event.MouseMove, cb);
  };

  View.prototype.onMouseWheel = function(cb) {
    return this.on(Event.MouseWheel, cb);
  };

  onScrollStart = function(cb) {
    return this.on(Event.ScrollStart, cb);
  };

  View.prototype.onScroll = function(cb) {
    return this.on(Event.Scroll, cb);
  };

  onScrollEnd = function(cb) {
    return this.on(Event.ScrollEnd, cb);
  };

  onScrollAnimationDidStart = function(cb) {
    return this.on(Event.ScrollAnimationDidStart, cb);
  };

  onScrollAnimationDidEnd = function(cb) {
    return this.on(Event.ScrollAnimationDidEnd, cb);
  };

  View.prototype.onTouchStart = function(cb) {
    return this.on(Event.TouchStart, cb);
  };

  View.prototype.onTouchEnd = function(cb) {
    return this.on(Event.TouchEnd, cb);
  };

  View.prototype.onTouchMove = function(cb) {
    return this.on(Event.TouchMove, cb);
  };

  View.prototype.onAnimationStart = function(cb) {
    return this.on(Event.AnimationStart, cb);
  };

  View.prototype.onAnimationStop = function(cb) {
    return this.on(Event.AnimationStop, cb);
  };

  View.prototype.onAnimationEnd = function(cb) {
    return this.on(Event.AnimationEnd, cb);
  };

  View.prototype.onAnimationDidStart = function(cb) {
    return this.on(Event.AnimationDidStart, cb);
  };

  View.prototype.onAnimationDidStop = function(cb) {
    return this.on(Event.AnimationDidStop, cb);
  };

  View.prototype.onAnimationDidEnd = function(cb) {
    return this.on(Event.AnimationDidEnd, cb);
  };

  View.prototype.onDragStart = function(cb) {
    return this.on(Event.DragStart, cb);
  };

  View.prototype.onDragWillMove = function(cb) {
    return this.on(Event.DragWillMove, cb);
  };

  View.prototype.onDragMove = function(cb) {
    return this.on(Event.DragMove, cb);
  };

  View.prototype.onDragDidMove = function(cb) {
    return this.on(Event.DragDidMove, cb);
  };

  View.prototype.onDrag = function(cb) {
    return this.on(Event.Drag, cb);
  };

  View.prototype.onDragEnd = function(cb) {
    return this.on(Event.DragEnd, cb);
  };

  View.prototype.onDragAnimationStart = function(cb) {
    return this.on(Event.DragAnimationStart, cb);
  };

  View.prototype.onDragAnimationEnd = function(cb) {
    return this.on(Event.DragAnimationEnd, cb);
  };

  View.prototype.onDirectionLockStart = function(cb) {
    return this.on(Event.DirectionLockStart, cb);
  };

  View.prototype.onDragEnter = function(cb) {
    return this.on(Event.DragEnter, cb);
  };

  View.prototype.onDragOver = function(cb) {
    return this.on(Event.DragOver, cb);
  };

  View.prototype.onDragLeave = function(cb) {
    return this.on(Event.DragLeave, cb);
  };

  View.prototype.onDrop = function(cb) {
    return this.on(Event.Drop, cb);
  };

  View.prototype.onStateSwitch = function(cb) {
    return this.on(Event.StateDidSwitch, cb);
  };

  View.prototype.onStateDidSwitch = function(cb) {
    return this.on(Event.StateDidSwitch, cb);
  };

  View.prototype.onStateWillSwitch = function(cb) {
    return this.on(Event.StateWillSwitch, cb);
  };

  View.prototype.onTap = function(cb) {
    return this.on(Event.Tap, cb);
  };

  View.prototype.onTapStart = function(cb) {
    return this.on(Event.TapStart, cb);
  };

  View.prototype.onTapEnd = function(cb) {
    return this.on(Event.TapEnd, cb);
  };

  View.prototype.onDoubleTap = function(cb) {
    return this.on(Event.DoubleTap, cb);
  };

  View.prototype.onForceTap = function(cb) {
    return this.on(Event.ForceTap, cb);
  };

  View.prototype.onForceTapChange = function(cb) {
    return this.on(Event.ForceTapChange, cb);
  };

  View.prototype.onForceTapStart = function(cb) {
    return this.on(Event.ForceTapStart, cb);
  };

  View.prototype.onForceTapEnd = function(cb) {
    return this.on(Event.ForceTapEnd, cb);
  };

  View.prototype.onLongPress = function(cb) {
    return this.on(Event.LongPress, cb);
  };

  View.prototype.onLongPressStart = function(cb) {
    return this.on(Event.LongPressStart, cb);
  };

  View.prototype.onLongPressEnd = function(cb) {
    return this.on(Event.LongPressEnd, cb);
  };

  View.prototype.onSwipe = function(cb) {
    return this.on(Event.Swipe, cb);
  };

  View.prototype.onSwipeStart = function(cb) {
    return this.on(Event.SwipeStart, cb);
  };

  View.prototype.onSwipeEnd = function(cb) {
    return this.on(Event.SwipeEnd, cb);
  };

  View.prototype.onSwipeUp = function(cb) {
    return this.on(Event.SwipeUp, cb);
  };

  View.prototype.onSwipeUpStart = function(cb) {
    return this.on(Event.SwipeUpStart, cb);
  };

  View.prototype.onSwipeUpEnd = function(cb) {
    return this.on(Event.SwipeUpEnd, cb);
  };

  View.prototype.onSwipeDown = function(cb) {
    return this.on(Event.SwipeDown, cb);
  };

  View.prototype.onSwipeDownStart = function(cb) {
    return this.on(Event.SwipeDownStart, cb);
  };

  View.prototype.onSwipeDownEnd = function(cb) {
    return this.on(Event.SwipeDownEnd, cb);
  };

  View.prototype.onSwipeLeft = function(cb) {
    return this.on(Event.SwipeLeft, cb);
  };

  View.prototype.onSwipeLeftStart = function(cb) {
    return this.on(Event.SwipeLeftStart, cb);
  };

  View.prototype.onSwipeLeftEnd = function(cb) {
    return this.on(Event.SwipeLeftEnd, cb);
  };

  View.prototype.onSwipeRight = function(cb) {
    return this.on(Event.SwipeRight, cb);
  };

  View.prototype.onSwipeRightStart = function(cb) {
    return this.on(Event.SwipeRightStart, cb);
  };

  View.prototype.onSwipeRightEnd = function(cb) {
    return this.on(Event.SwipeRightEnd, cb);
  };

  View.prototype.onPan = function(cb) {
    return this.on(Event.Pan, cb);
  };

  View.prototype.onPanStart = function(cb) {
    return this.on(Event.PanStart, cb);
  };

  View.prototype.onPanEnd = function(cb) {
    return this.on(Event.PanEnd, cb);
  };

  View.prototype.onPanLeft = function(cb) {
    return this.on(Event.PanLeft, cb);
  };

  View.prototype.onPanRight = function(cb) {
    return this.on(Event.PanRight, cb);
  };

  View.prototype.onPanUp = function(cb) {
    return this.on(Event.PanUp, cb);
  };

  View.prototype.onPanDown = function(cb) {
    return this.on(Event.PanDown, cb);
  };


  /*
  	onPinch:(cb) -> @on(Event.Pinch, cb)
  	onPinchStart:(cb) -> @on(Event.PinchStart, cb)
  	onPinchEnd:(cb) -> @on(Event.PinchEnd, cb)
   */

  View.prototype.onScale = function(cb) {
    return this.on(Event.Scale, cb);
  };

  View.prototype.onScaleStart = function(cb) {
    return this.on(Event.ScaleStart, cb);
  };

  View.prototype.onScaleEnd = function(cb) {
    return this.on(Event.ScaleEnd, cb);
  };

  View.prototype.onRotate = function(cb) {
    return this.on(Event.Rotate, cb);
  };

  View.prototype.onRotateStart = function(cb) {
    return this.on(Event.RotateStart, cb);
  };

  View.prototype.onRotateEnd = function(cb) {
    return this.on(Event.RotateEnd, cb);
  };

  View.prototype.toInspect = function() {
    var round;
    round = function(value) {
      if (parseInt(value) === value) {
        return parseInt(value);
      }
      return Utils.round(value, 1);
    };
    if (this.name) {
      return "<" + this._kind + " id:" + this.id + " name:" + this.name + " (" + (round(this.x)) + "," + (round(this.y)) + ") " + (round(this.width)) + "x" + (round(this.height)) + ">";
    }
    return "<" + this._kind + " id:" + this.id + " (" + (round(this.x)) + "," + (round(this.y)) + ") " + (round(this.width)) + "x" + (round(this.height)) + ">";
  };

  View.prototype._updateShadow = function() {
    return this._element.style.boxShadow = this.shadowX + 'px ' + this.shadowY + 'px ' + this.shadowBlur + 'px ' + this.shadowSpread + 'px ' + this.shadowColor + ' ' + this.shadowInset;
  };

  View.prototype._updateEffects = function() {
    var effect;
    if (!this._f_blur) {
      this._f_blur = '';
    }
    if (!this._f_hueRotate) {
      this._f_hueRotate = '';
    }
    if (!this._f_invert) {
      this._f_invert = '';
    }
    if (!this._f_contrast) {
      this._f_contrast = '';
    }
    if (!this._f_grayscale) {
      this._f_grayscale = '';
    }
    if (!this._f_sepia) {
      this._f_sepia = '';
    }
    if (!this._f_saturate) {
      this._f_saturate = '';
    }
    if (!this._f_brightness) {
      this._f_brightness = '';
    }
    effect = this._f_blur + this._f_brightness + this._f_saturate + this._f_hueRotate + this._f_contrast + this._f_invert + this._f_sepia + this._f_grayscale;
    this._element.style.WebkitFilter = effect;
    this._element.style.filter = effect;
  };

  View.prototype._updateBackDropEffects = function() {
    var effect;
    if (!this._bf_blur) {
      this._bf_blur = '';
    }
    if (!this._bf_hueRotate) {
      this._bf_hueRotate = '';
    }
    if (!this._bf_invert) {
      this._bf_invert = '';
    }
    if (!this._bf_contrast) {
      this._bf_contrast = '';
    }
    if (!this._bf_grayscale) {
      this._bf_grayscale = '';
    }
    if (!this._bf_sepia) {
      this._bf_sepia = '';
    }
    if (!this._bf_saturate) {
      this._bf_saturate = '';
    }
    if (!this._bf_brightness) {
      this._bf_brightness = '';
    }
    effect = this._bf_blur + this._bf_brightness + this._bf_saturate + this._bf_hueRotate + this._bf_contrast + this._bf_invert + this._bf_sepia + this._bf_grayscale;
    this._element.style.WebkitBackdropFilter = effect;
    this._element.style.backdropFilter = effect;
  };

  View.prototype._updateTransform = function() {
    var transform, unitX, unitY, unitZ;
    transform = '';
    if (this._translateX !== void 0 || this._translateY !== void 0) {
      unitX = '';
      unitY = '';
      if (typeof this._translateX === 'number') {
        unitX = 'px';
      }
      if (typeof this._translateY === 'number') {
        unitY = 'px';
      }
      transform += 'translate(' + this._translateX + '' + unitX + ', ' + this._translateY + '' + unitY + ') ';
    }
    if (this._translateZ !== void 0) {
      unitZ = '';
      if (typeof this._translateZ === 'number') {
        unitZ = 'px';
      }
      transform += 'translateZ(' + this._translateZ + '' + unitZ + ') ';
    }
    if (this._rotation !== void 0) {
      transform += 'rotate(' + this._rotation + 'deg) ';
    }
    if (this._rotationX !== void 0) {
      transform += 'rotateX(' + this._rotationX + 'deg) ';
    }
    if (this._rotationY !== void 0) {
      transform += 'rotateY(' + this._rotationY + 'deg) ';
    }
    if (this._rotationZ !== void 0) {
      transform += 'rotateZ(' + this._rotationZ + 'deg) ';
    }
    if (this._scale !== void 0) {
      if (this._scaleX === this._scaleY) {
        transform += 'scale(' + this._scaleX + ') ';
      } else {
        transform += 'scale(' + this._scaleX + ', ' + this._scaleY + ') ';
      }
    }
    if (this._skewX !== void 0 || this._skewY !== void 0) {
      if (this._skewX === this._skewY) {
        transform += 'skew(' + this._skewX + 'deg) ';
      } else {
        transform += 'skew(' + this._skewX + 'deg, ' + this._skewY + 'deg) ';
      }
    }
    this._element.style.webkitTransform = transform;
    this._element.style.mozTransform = transform;
    this._element.style.msTransform = transform;
    this._element.style.oTransform = transform;
    return this._element.style.transform = transform;
  };

  return View;

})(Element);
