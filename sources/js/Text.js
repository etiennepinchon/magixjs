var Text,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Text = (function(_super) {
  __extends(Text, _super);

  function Text(options) {
    var _elementType, _kind;
    if (options == null) {
      options = {};
    }
    if (options.header) {
      this._kind = 'TextHeader';
      this._elementType = 'h1';
    } else if (options.paragraph) {
      _kind = 'TextParagraph';
      _elementType = 'p';
    }
    Text.__super__.constructor.apply(this, arguments);
  }

  Text.prototype._kind = 'Text';

  Text.prototype._assigned = {};

  Text.prototype._text = '';

  Text.define('text', {
    configurable: true,
    get: function() {
      return this._text;
    },
    set: function(value) {
      var item, _i, _len, _ref;
      _ref = this.children;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        item = _ref[_i];
        item.parent = null;
      }
      this._assigned = {};
      this._text = value;
      this.emit('change:text', value);
      this.html = Utils.e(value);
    }
  });

  Text.define('value', {
    configurable: true,
    get: function() {
      return this.text;
    },
    set: function(value) {
      this.emit('change:value', value);
      this.text = value;
    }
  });

  Text.define('header', {
    configurable: true,
    get: function() {
      return this._header;
    },
    set: function(value) {
      if (!value) {
        return;
      }
      this.emit('change:header', value);
      this.text = this._header = value;
    }
  });

  Text.define('paragraph', {
    configurable: true,
    get: function() {
      return this._paragraph;
    },
    set: function(value) {
      if (!value) {
        return;
      }
      this.emit('change:paragraph', value);
      this.text = this._paragraph = value;
    }
  });

  Text.define('indent', {
    get: function() {
      return this._element.style.textIndent;
    },
    set: function(value) {
      if (typeof value === 'number') {
        value = value + 'px';
      }
      this._element.style.textIndent = value;
    }
  });

  Text._alias('textIndent', 'indent');

  Text.define('decoration', {
    get: function() {
      return this._element.style.textDecoration;
    },
    set: function(value) {
      return this._element.style.textDecoration = value;
    }
  });

  Text._alias('textDecoration', 'decoration');

  Text.define('spacing', {
    get: function() {
      return parseFloat(this._element.style.letterSpacing, 10);
    },
    set: function(value) {
      if (typeof value === 'number') {
        value = value + 'px';
      }
      this._element.style.letterSpacing = value;
    }
  });

  Text._alias('letterSpacing', 'spacing');

  Text.define('wordSpacing', {
    get: function() {
      return parseFloat(this._element.style.wordSpacing, 10);
    },
    set: function(value) {
      if (typeof value === 'number') {
        value = value + 'px';
      }
      this._element.style.wordSpacing = value;
    }
  });

  Text.define('wrap', {
    get: function() {
      if (this._element.style.wordWrap === 'break-word') {
        return true;
      }
      return false;
    },
    set: function(value) {
      if (value === true) {
        this._element.style.wordWrap = 'break-word';
      } else {
        this._element.style.wordWrap = 'normal';
      }
    }
  });

  Text.define('break', {
    get: function() {
      if (this._break === void 0) {
        return false;
      }
      return this._break;
    },
    set: function(value) {
      if (value === true) {
        this._break === true;
        this._element.style.wordBreak = 'break-all';
      } else {
        this._break === false;
        this._element.style.wordBreak = 'normal';
      }
    }
  });


  /*
  		normal	Sequences of whitespace will collapse into a single whitespace. Text will wrap when necessary. This is default.
  		nowrap	Sequences of whitespace will collapse into a single whitespace. Text will never wrap to the next line. The text continues on the same line until a <br> tag is encountered
  		pre	Whitespace is preserved by the browser. Text will only wrap on line breaks. Acts like the <pre> tag in HTML
  		pre-line	Sequences of whitespace will collapse into a single whitespace. Text will wrap when necessary, and on line breaks
  		pre-wrap	Whitespace is preserved by the browser. Text will wrap when necessary, and on line breaks
   */

  Text.define('whiteSpace', {
    get: function() {
      return this._element.style.whiteSpace;
    },
    set: function(value) {
      return this._element.style.whiteSpace = value;
    }
  });

  Text.define('nowrap', {
    get: function() {
      if (this._element.style.whiteSpace === 'nowrap') {
        return true;
      }
      return false;
    },
    set: function(value) {
      if (value === true) {
        this._element.style.whiteSpace = 'nowrap';
      } else {
        this._element.style.whiteSpace = 'normal';
      }
    }
  });

  Text.define('lineHeight', {
    get: function() {
      return parseFloat(this._element.style.lineHeight);
    },
    set: function(value) {
      if (typeof value === 'number') {
        value = value + 'px';
      }
      this._element.style.lineHeight = value;
    }
  });

  Text._def('textShadowX', 0, function() {
    return this._updateTextShadow();
  });

  Text._def('textShadowY', 0, function() {
    return this._updateTextShadow();
  });

  Text._def('textShadowBlur', 0, function() {
    return this._updateTextShadow();
  });

  Text._def('textShadowColor', '', function() {
    return this._updateTextShadow();
  });

  Text.prototype.uppercase = function() {
    return this._element.style.textTransform = 'uppercase';
  };

  Text.prototype.lowercase = function() {
    return this._element.style.textTransform = 'lowercase';
  };

  Text.prototype.underline = function() {
    return this._element.style.textDecoration = 'underline';
  };

  Text.prototype.capitalize = function() {
    if (this._text !== void 0) {
      this._text.charAt(0).toUpperCase() + this._text.slice(1);
      this.html = this._text;
    }
  };

  Text.prototype.centerText = function() {
    this.align = 'center';
    if (this.parent) {
      return this.lineHeight = this.parent.height;
    }
  };

  Text.prototype.assignLink = function(keyword, url, options) {
    if (keyword && keyword.length > 0) {
      this._assigned[keyword] = {
        url: url,
        options: options
      };
      return this._assignProcessor();
    }
  };

  Text.prototype.assign = function(keyword, options) {
    if (keyword && keyword.length > 0) {
      this._assigned[keyword] = {
        options: options
      };
      this._assignProcessor();
    }
  };

  Text.prototype._assignProcessor = function() {
    var assigned_length, i, key, p, pattern, regexs, that;
    assigned_length = Utils.keys(this._assigned).length;
    regexs = '';
    i = 0;
    for (key in this._assigned) {
      if (this._assigned[key].url) {
        this._assigned[key].assign = new Link({
          color: 'inherit',
          display: 'inline',
          href: this._assigned[key].url
        });
      } else {
        this._assigned[key].assign = new Text({
          color: 'inherit',
          display: 'inline'
        });
      }
      for (p in this._assigned[key].options) {
        this._assigned[key].assign[p] = this._assigned[key].options[p];
      }
      regexs += key;
      if (i < assigned_length - 1) {
        regexs += '|';
      }
      i++;
    }
    that = this;
    pattern = new RegExp("(" + regexs + ")", 'g');
    return this.html = this._text.replace(pattern, function(match) {
      var split_pattern, type;
      type = that._assigned[match].assign._elementType;
      split_pattern = new RegExp("(<\/?" + type + ">)", 'i');
      return that._assigned[match].assign._element.outerHTML.split(split_pattern)[0] + match + ("</" + type + ">");
    });
  };

  Text.prototype._updateTextShadow = function() {
    return this._element.style.textShadow = this.textShadowX + 'px ' + this.textShadowY + 'px ' + this.textShadowBlur + 'px ' + this.textShadowColor;
  };

  return Text;

})(View);
