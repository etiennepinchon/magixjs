var Color, ColorModel, ColorType, bound01, color, convertToPercentage, correctAlpha, cssNames, hslToRgb, inputData, isNumeric, isOnePointZero, isPercentage, matchers, numberFromString, pad2, percentToFraction, rgb, rgbToHex, rgbToHsl, rgbToRgb, rgba, rgbaFromHusl, stringToObject,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

rgb = function(r, g, b) {
  return "rgb(" + r + ", " + g + ", " + b + ")";
};

rgba = function(r, g, b, a) {
  return "rgba(" + r + ", " + g + ", " + b + ", " + a + ")";
};

ColorType = {
  RGB: "rgb",
  HSL: "hsl",
  HEX: "hex",
  NAME: "name"
};

Color = (function(_super) {
  __extends(Color, _super);

  function Color(color, r, g, b) {
    var input;
    this.color = color;
    this.toInspect = __bind(this.toInspect, this);
    if (this.color === "") {
      this.color = null;
    }
    color = this.color;
    if (Color.isColorObject(color)) {
      return color;
    }
    input = inputData(color, r, g, b);
    this._type = input.type;
    this._r = input.r;
    this._g = input.g;
    this._b = input.b;
    this._a = input.a;
    this._h = input.h;
    this._s = input.s;
    this._l = input.l;
    this._roundA = Math.round(100 * this._a) / 100;
  }

  Color.define("r", {
    get: function() {
      return this._r;
    }
  });

  Color.define("g", {
    get: function() {
      return this._g;
    }
  });

  Color.define("b", {
    get: function() {
      return this._b;
    }
  });

  Color.define("a", {
    get: function() {
      return this._a;
    }
  });

  Color.define("h", {
    get: function() {
      return this._h;
    }
  });

  Color.define("s", {
    get: function() {
      return this._s;
    }
  });

  Color.define("l", {
    get: function() {
      return this._l;
    }
  });

  Color.prototype.toHex = function(allow3Char) {
    return rgbToHex(this._r, this._g, this._b, allow3Char);
  };

  Color.prototype.toHexString = function(allow3Char) {
    return "#" + this.toHex(allow3Char);
  };

  Color.prototype.toRgb = function() {
    if (this._rgb === void 0) {
      this._rgb = {
        r: Math.round(this._r),
        g: Math.round(this._g),
        b: Math.round(this._b),
        a: this._a
      };
    }
    return this._rgb;
  };

  Color.prototype.toRgbString = function() {
    if (this._a === 1) {
      return "rgb(" + (Utils.round(this._r, 0)) + ", " + (Utils.round(this._g, 0)) + ", " + (Utils.round(this._b, 0)) + ")";
    } else {
      return "rgba(" + (Utils.round(this._r, 0)) + ", " + (Utils.round(this._g, 0)) + ", " + (Utils.round(this._b, 0)) + ", " + this._roundA + ")";
    }
  };

  Color.prototype.toHsl = function() {
    if (this._hsl === void 0) {
      this._hsl = {
        h: this.h,
        s: this.s,
        l: this.l,
        a: this.a
      };
    }
    return this._hsl;
  };

  Color.prototype.toHusl = function() {
    var c, husl;
    if (this._husl === void 0) {
      c = libhusl._conv;
      husl = c.lch.husl(c.luv.lch(c.xyz.luv(c.rgb.xyz([this.r / 255, this.g / 255, this.b / 255]))));
      this._husl = {
        h: husl[0],
        s: husl[1],
        l: husl[2]
      };
    }
    return this._husl;
  };

  Color.prototype.toHslString = function() {
    var h, hsl, l, s;
    if (this._hslString === void 0) {
      hsl = this.toHsl();
      h = Math.round(hsl.h);
      s = Math.round(hsl.s * 100);
      l = Math.round(hsl.l * 100);
      if (this._a === 1) {
        this._hslString = "hsl(" + h + ", " + s + "%, " + l + "%)";
      } else {
        this._hslString = "hsla(" + h + ", " + s + "%, " + l + "%, " + this._roundA + ")";
      }
    }
    return this._hslString;
  };

  Color.prototype.toName = function() {
    var hex, key, value, _i, _len, _ref;
    if (this._a === 0) {
      return "transparent";
    }
    if (this._a < 1) {
      return false;
    }
    hex = rgbToHex(this._r, this._g, this._b, true);
    _ref = Utils.keys(cssNames);
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      key = _ref[_i];
      value = cssNames[key];
      if (value === hex) {
        return key;
      }
    }
    return false;
  };

  Color.prototype.lighten = function(amount) {
    var hsl;
    if (amount == null) {
      amount = 10;
    }
    hsl = this.toHsl();
    hsl.l += amount / 100;
    hsl.l = Math.min(1, Math.max(0, hsl.l));
    return new Color(hsl);
  };

  Color.prototype.brighten = function(amount) {
    if (amount == null) {
      amount = 10;
    }
    rgb = this.toRgb();
    rgb.r = Math.max(0, Math.min(255, rgb.r - Math.round(255 * -(amount / 100))));
    rgb.g = Math.max(0, Math.min(255, rgb.g - Math.round(255 * -(amount / 100))));
    rgb.b = Math.max(0, Math.min(255, rgb.b - Math.round(255 * -(amount / 100))));
    return new Color(rgb);
  };

  Color.prototype.darken = function(amount) {
    var hsl;
    if (amount == null) {
      amount = 10;
    }
    hsl = this.toHsl();
    hsl.l -= amount / 100;
    hsl.l = Math.min(1, Math.max(0, hsl.l));
    return new Color(hsl);
  };

  Color.prototype.desaturate = function(amount) {
    var hsl;
    if (amount == null) {
      amount = 10;
    }
    hsl = this.toHsl();
    hsl.s -= amount / 100;
    hsl.s = Math.min(1, Math.max(0, hsl.s));
    return new Color(hsl);
  };

  Color.prototype.saturate = function(amount) {
    var hsl;
    if (amount == null) {
      amount = 10;
    }
    hsl = this.toHsl();
    hsl.s += amount / 100;
    hsl.s = Math.min(1, Math.max(0, hsl.s));
    return new Color(hsl);
  };

  Color.prototype.grayscale = function() {
    var hsl;
    hsl = this.toHsl();
    return new Color(hsl).desaturate(100);
  };

  Color.prototype.toString = function() {
    return this.toRgbString();
  };

  Color.prototype.isEqual = function(colorB) {
    return Color.equal(this, colorB);
  };

  Color.prototype.transparent = function() {
    var result;
    return result = new Color({
      r: this.r,
      g: this.g,
      b: this.b,
      a: 0
    });
  };

  Color.prototype.mix = function(colorB, fraction, limit, model) {
    if (limit == null) {
      limit = false;
    }
    return Color.mix(this, colorB, fraction, limit, model);
  };

  Color.prototype.toInspect = function() {
    if (this._type === ColorType.HSL) {
      return "<Color h:" + this.h + " s:" + this.s + " l:" + this.l + " a:" + this.a + ">";
    } else if (this._type === ColorType.HEX || this._type === ColorType.NAME) {
      return "<Color \"" + this.color + "\">";
    } else {
      return "<Color r:" + this.r + " g:" + this.g + " b:" + this.b + " a:" + this.a + ">";
    }
  };

  Color.mix = function(colorA, colorB, fraction, limit, model) {
    var deltaH, fromH, hslA, hslB, result, toH, tween;
    if (fraction == null) {
      fraction = .5;
    }
    if (limit == null) {
      limit = false;
    }
    result = null;
    if (typeof colorA === "string" && this.isColorString(colorA)) {
      colorA = new Color(colorA);
    }
    if (typeof colorB === "string" && this.isColorString(colorB)) {
      colorB = new Color(colorB);
    }
    if (!(colorA instanceof Color) && colorB instanceof Color) {
      colorA = colorB.transparent();
    } else if (colorA instanceof Color && colorA._a === 0 && colorB instanceof Color && colorB._a !== 0) {
      colorA = colorB.transparent();
    } else if (!(colorB instanceof Color) && colorA instanceof Color) {
      colorB = colorA.transparent();
    } else if (colorB instanceof Color && colorB._a === 0 && colorA instanceof Color && colorA._a !== 0) {
      colorB = colorA.transparent();
    }
    if (colorB instanceof Color) {
      if (ColorModel.isRGB(model)) {
        result = new Color({
          r: Utils.modulate(fraction, [0, 1], [colorA._r, colorB._r], limit),
          g: Utils.modulate(fraction, [0, 1], [colorA._g, colorB._g], limit),
          b: Utils.modulate(fraction, [0, 1], [colorA._b, colorB._b], limit),
          a: Utils.modulate(fraction, [0, 1], [colorA._a, colorB._a], limit)
        });
      } else {
        hslA;
        hslB;
        if (ColorModel.isHSL(model)) {
          hslA = colorA.toHsl();
          hslB = colorB.toHsl();
        } else {
          hslA = colorA.toHusl();
          hslB = colorB.toHusl();
        }
        if (hslA.s === 0) {
          hslA.h = hslB.h;
        } else if (hslB.s === 0) {
          hslB.h = hslA.h;
        }
        fromH = hslA.h;
        toH = hslB.h;
        deltaH = toH - fromH;
        if (deltaH > 180) {
          deltaH = (toH - 360) - fromH;
        } else if (deltaH < -180) {
          deltaH = (toH + 360) - fromH;
        }
        tween = {
          h: Utils.modulate(fraction, [0, 1], [fromH, fromH + deltaH], limit),
          s: Utils.modulate(fraction, [0, 1], [hslA.s, hslB.s], limit),
          l: Utils.modulate(fraction, [0, 1], [hslA.l, hslB.l], limit),
          a: Utils.modulate(fraction, [0, 1], [colorA.a, colorB.a], limit)
        };
        if (ColorModel.isHSL(model)) {
          result = new Color(tween);
        } else {
          result = new Color(rgbaFromHusl(tween));
        }
      }
    }
    return result;
  };

  Color.random = function(alpha) {
    var c;
    if (alpha == null) {
      alpha = 1.0;
    }
    c = function() {
      return parseInt(Math.random() * 255);
    };
    return new Color("rgba(" + (c()) + ", " + (c()) + ", " + (c()) + ", " + alpha + ")");
  };

  Color.toColor = function(color) {
    if (color === 'inherit') {
      return color;
    }
    if (color.color && Utils.isString(color.color) && color.color.indexOf('gradient') !== -1) {
      return color.color;
    }
    return new Color(color);
  };

  Color.validColorValue = function(color) {
    return color instanceof Color || color === null;
  };

  Color.isColor = function(color) {
    if (Utils.isString(color)) {
      return this.isColorString(color);
    } else {
      return this.isColorObject(color);
    }
  };

  Color.isColorObject = function(color) {
    return color instanceof Color;
  };

  Color.isColorString = function(colorString) {
    if (Utils.isString(colorString)) {
      return stringToObject(colorString) !== false;
    }
    return false;
  };

  Color.equal = function(colorA, colorB) {
    if (!this.validColorValue(colorA)) {
      if (!Color.isColorString(colorA)) {
        return false;
      }
    }
    if (!this.validColorValue(colorB)) {
      if (!Color.isColorString(colorB)) {
        return false;
      }
    }
    colorA = new Color(colorA);
    colorB = new Color(colorB);
    if (colorA.r !== colorB.r) {
      return false;
    }
    if (colorA.g !== colorB.g) {
      return false;
    }
    if (colorA.b !== colorB.b) {
      return false;
    }
    if (colorA.a !== colorB.a) {
      return false;
    }
    return true;
  };

  Color.rgbToHsl = function(a, b, c) {
    return rgbToHsl(a, b, c);
  };

  Color.gradient = function() {
    var arg, args, color, colors, i, orientation, string, _i, _j, _len, _len1;
    args = arguments;
    orientation = 'to bottom';
    colors = [];
    string = '';
    i = 0;
    for (_i = 0, _len = args.length; _i < _len; _i++) {
      arg = args[_i];
      if (typeof arg === "string" && this.isColorString(arg)) {
        arg = new Color(arg);
        colors.push(arg);
      } else {
        if (arg === 'transparent' || arg === 'clear') {
          arg = new Color();
          arg = arg.transparent();
          colors.push(arg);
        } else {
          if (Utils.isNumber(arg)) {
            orientation = arg + 'deg';
          } else if (arg.indexOf('deg') === -1) {
            orientation = 'to ' + arg;
          } else {
            orientation = arg;
          }
        }
      }
      i++;
    }
    i = 0;
    for (_j = 0, _len1 = colors.length; _j < _len1; _j++) {
      color = colors[_j];
      string += color.toString();
      if (i !== colors.length - 1) {
        string += ', ';
      }
      i++;
    }
    return {
      color: 'linear-gradient(' + orientation + ', ' + string + ')'
    };
  };

  return Color;

})(Element);

ColorModel = {
  RGB: "rgb",
  RGBA: "rgba",
  HSL: "hsl",
  HSLA: "hsla"
};

ColorModel.isRGB = function(colorModel) {
  var _ref;
  if (Utils.isString(colorModel)) {
    return (_ref = colorModel.toLowerCase()) === ColorModel.RGB || _ref === ColorModel.RGBA;
  }
  return false;
};

ColorModel.isHSL = function(colorModel) {
  var _ref;
  if (Utils.isString(colorModel)) {
    return (_ref = colorModel.toLowerCase()) === ColorModel.HSL || _ref === ColorModel.HSLA;
  }
  return false;
};

rgbaFromHusl = function(husl) {
  var c;
  c = libhusl._conv;
  rgb = c.xyz.rgb(c.luv.xyz(c.lch.luv(c.husl.lch([husl.h, husl.s, husl.l]))));
  rgba = {
    r: rgb[0] * 255,
    g: rgb[1] * 255,
    b: rgb[2] * 255,
    a: husl.a
  };
  return rgba;
};

inputData = function(color, g, b, alpha) {
  var a, h, hsl, l, ok, s, type;
  rgb = {
    r: 0,
    g: 0,
    b: 0
  };
  hsl = {
    h: 0,
    s: 0,
    l: 0
  };
  a = 1;
  ok = false;
  type = ColorType.RGB;
  if (color === null) {
    a = 0;
  } else if (Utils.isNumber(color)) {
    rgb.r = color;
    if (Utils.isNumber(g)) {
      rgb.g = g;
    }
    if (Utils.isNumber(b)) {
      rgb.b = b;
    }
    if (Utils.isNumber(alpha)) {
      a = alpha;
    }
  } else {
    if (typeof color === "string") {
      color = stringToObject(color);
      if (!color) {
        color = {
          r: 0,
          g: 0,
          b: 0,
          a: 0
        };
      }
      if (color.hasOwnProperty("type")) {
        type = color.type;
      }
    }
    if (typeof color === "object") {
      if (color.hasOwnProperty("r") || color.hasOwnProperty("g") || color.hasOwnProperty("b")) {
        rgb = rgbToRgb(color.r, color.g, color.b);
      } else if (color.hasOwnProperty("h") || color.hasOwnProperty("s") || color.hasOwnProperty("l")) {
        h = isNumeric(color.h) ? parseFloat(color.h) : 0;
        h = (h + 360) % 360;
        s = isNumeric(color.s) ? color.s : 1;
        if (Utils.isString(color.s)) {
          s = numberFromString(color.s);
        }
        l = isNumeric(color.l) ? color.l : 0.5;
        if (Utils.isString(color.l)) {
          l = numberFromString(color.l);
        }
        rgb = hslToRgb(h, s, l);
        type = ColorType.HSL;
        hsl = {
          h: h,
          s: s,
          l: l
        };
      }
      if (color.hasOwnProperty("a")) {
        a = color.a;
      }
    }
  }
  a = correctAlpha(a);
  if (type !== ColorType.HSL) {
    hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  }
  return {
    type: type,
    r: Math.min(255, Math.max(rgb.r, 0)),
    g: Math.min(255, Math.max(rgb.g, 0)),
    b: Math.min(255, Math.max(rgb.b, 0)),
    h: Utils.clamp(hsl.h, 0, 360),
    s: Utils.clamp(hsl.s, 0, 1),
    l: Utils.clamp(hsl.l, 0, 1),
    a: a
  };
};

numberFromString = function(string) {
  return string.match(/\d+/)[0];
};

rgbToRgb = function(r, g, b) {
  return {
    r: isNumeric(r) ? bound01(r, 255) * 255 : 0,
    g: isNumeric(g) ? bound01(g, 255) * 255 : 0,
    b: isNumeric(b) ? bound01(b, 255) * 255 : 0
  };
};

rgbToHex = function(r, g, b, allow3Char) {
  var hex;
  hex = [pad2(Math.round(r).toString(16)), pad2(Math.round(g).toString(16)), pad2(Math.round(b).toString(16))];
  if (allow3Char && hex[0].charAt(0) === hex[0].charAt(1) && hex[1].charAt(0) === hex[1].charAt(1) && hex[2].charAt(0) === hex[2].charAt(1)) {
    return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0);
  }
  return hex.join("");
};

rgbToHsl = function(r, g, b) {
  var d, h, l, max, min, s;
  r = bound01(r, 255);
  g = bound01(g, 255);
  b = bound01(b, 255);
  max = Math.max(r, g, b);
  min = Math.min(r, g, b);
  h = s = l = (max + min) / 2;
  if (max === min) {
    h = s = 0;
  } else {
    d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
    }
    h /= 6;
  }
  return {
    h: h * 360,
    s: s,
    l: l
  };
};

hslToRgb = function(h, s, l) {
  var b, g, hue2rgb, p, q, r;
  r = void 0;
  g = void 0;
  b = void 0;
  h = bound01(h, 360);
  s = bound01(s * 100, 100);
  l = bound01(l * 100, 100);
  hue2rgb = function(p, q, t) {
    if (t < 0) {
      t += 1;
    }
    if (t > 1) {
      t -= 1;
    }
    if (t < 1 / 6) {
      return p + (q - p) * 6 * t;
    }
    if (t < 1 / 2) {
      return q;
    }
    if (t < 2 / 3) {
      return p + (q - p) * (2 / 3 - t) * 6;
    }
    return p;
  };
  if (s === 0) {
    r = g = b = l;
  } else {
    q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - (1 / 3));
  }
  return {
    r: r * 255,
    g: g * 255,
    b: b * 255
  };
};

convertToPercentage = function(n) {
  if (n <= 1) {
    n = n * 100 + "%";
  }
  return n;
};

correctAlpha = function(a) {
  a = parseFloat(a);
  if (a < 0) {
    a = 0;
  }
  if (isNaN(a) || a > 1) {
    a = 1;
  }
  return a;
};

bound01 = function(n, max) {
  var processPercent;
  if (isOnePointZero(n)) {
    n = "100%";
  }
  processPercent = isPercentage(n);
  n = Math.min(max, Math.max(0, parseFloat(n)));
  if (processPercent) {
    n = parseInt(n * max, 10) / 100;
  }
  if (Math.abs(n - max) < 0.000001) {
    return 1;
  }
  return n % max / parseFloat(max);
};

isOnePointZero = function(n) {
  return typeof n === "string" && n.indexOf(".") !== -1 && parseFloat(n) === 1;
};

isPercentage = function(n) {
  return typeof n === "string" && n.indexOf("%") !== -1;
};

pad2 = function(char) {
  if (char.length === 1) {
    return "0" + char;
  } else {
    return "" + char;
  }
};

matchers = (function() {
  var css_integer, css_number, css_unit, permissive_match3, permissive_match4;
  css_integer = '[-\\+]?\\d+%?';
  css_number = "[-\\+]?\\d*\\.\\d+%?";
  css_unit = "(?:" + css_number + ")|(?:" + css_integer + ")";
  permissive_match3 = '[\\s|\\(]+(' + css_unit + ')[,|\\s]+(' + css_unit + ')[,|\\s]+(' + css_unit + ')\\s*\\)?';
  permissive_match4 = '[\\s|\\(]+(' + css_unit + ')[,|\\s]+(' + css_unit + ')[,|\\s]+(' + css_unit + ')[,|\\s]+(' + css_unit + ')\\s*\\)?';
  return {
    rgb: new RegExp('rgb' + permissive_match3),
    rgba: new RegExp('rgba' + permissive_match4),
    hsl: new RegExp('hsl' + permissive_match3),
    hsla: new RegExp('hsla' + permissive_match4),
    hex3: /^([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
    hex6: /^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
  };
})();

isNumeric = function(value) {
  return !isNaN(value) && isFinite(value);
};

percentToFraction = function(percentage) {
  return numberFromString(percentage) / 100;
};

stringToObject = function(color) {
  var match, named, trimLeft, trimRight;
  trimLeft = /^[\s,#]+/;
  trimRight = /\s+$/;
  color = color.replace(trimLeft, "").replace(trimRight, "").toLowerCase();
  named = false;
  if (cssNames[color]) {
    color = cssNames[color];
    named = true;
    ({
      type: ColorType.NAME
    });
  } else if (color === "transparent") {
    return {
      r: 0,
      g: 0,
      b: 0,
      a: 0,
      type: ColorType.NAME
    };
  }
  match = void 0;
  if (match = matchers.rgb.exec(color)) {
    return {
      r: match[1],
      g: match[2],
      b: match[3]
    };
  }
  if (match = matchers.rgba.exec(color)) {
    return {
      r: match[1],
      g: match[2],
      b: match[3],
      a: match[4]
    };
  }
  if (match = matchers.hsl.exec(color)) {
    return {
      h: match[1],
      s: percentToFraction(match[2]),
      l: percentToFraction(match[3])
    };
  }
  if (match = matchers.hsla.exec(color)) {
    return {
      h: match[1],
      s: percentToFraction(match[2]),
      l: percentToFraction(match[3]),
      a: match[4]
    };
  }
  if (match = matchers.hex6.exec(color) || (match = matchers.hex6.exec(cssNames[color]))) {
    return {
      r: parseInt(match[1], 16),
      g: parseInt(match[2], 16),
      b: parseInt(match[3], 16),
      a: 1,
      type: ColorType.HEX
    };
  }
  if (match = matchers.hex3.exec(color) || (match = matchers.hex3.exec(cssNames[color]))) {
    return {
      r: parseInt(match[1] + "" + match[1], 16),
      g: parseInt(match[2] + "" + match[2], 16),
      b: parseInt(match[3] + "" + match[3], 16),
      type: ColorType.HEX
    };
  } else {
    return false;
  }
};

cssNames = {
  aliceblue: "f0f8ff",
  antiquewhite: "faebd7",
  aqua: "0ff",
  aquamarine: "7fffd4",
  azure: "f0ffff",
  beige: "f5f5dc",
  bisque: "ffe4c4",
  black: "000",
  blanchedalmond: "ffebcd",
  blue: "00f",
  blueviolet: "8a2be2",
  brown: "a52a2a",
  burlywood: "deb887",
  burntsienna: "ea7e5d",
  cadetblue: "5f9ea0",
  chartreuse: "7fff00",
  chocolate: "d2691e",
  coral: "ff7f50",
  cornflowerblue: "6495ed",
  cornsilk: "fff8dc",
  crimson: "dc143c",
  cyan: "0ff",
  darkblue: "00008b",
  darkcyan: "008b8b",
  darkgoldenrod: "b8860b",
  darkgray: "a9a9a9",
  darkgreen: "006400",
  darkgrey: "a9a9a9",
  darkkhaki: "bdb76b",
  darkmagenta: "8b008b",
  darkolivegreen: "556b2f",
  darkorange: "ff8c00",
  darkorchid: "9932cc",
  darkred: "8b0000",
  darksalmon: "e9967a",
  darkseagreen: "8fbc8f",
  darkslateblue: "483d8b",
  darkslategray: "2f4f4f",
  darkslategrey: "2f4f4f",
  darkturquoise: "00ced1",
  darkviolet: "9400d3",
  deeppink: "ff1493",
  deepskyblue: "00bfff",
  dimgray: "696969",
  dimgrey: "696969",
  dodgerblue: "1e90ff",
  firebrick: "b22222",
  floralwhite: "fffaf0",
  forestgreen: "228b22",
  fuchsia: "f0f",
  gainsboro: "dcdcdc",
  ghostwhite: "f8f8ff",
  gold: "ffd700",
  goldenrod: "daa520",
  gray: "808080",
  green: "008000",
  greenyellow: "adff2f",
  grey: "808080",
  honeydew: "f0fff0",
  hotpink: "ff69b4",
  indianred: "cd5c5c",
  indigo: "4b0082",
  ivory: "fffff0",
  khaki: "f0e68c",
  lavender: "e6e6fa",
  lavenderblush: "fff0f5",
  lawngreen: "7cfc00",
  lemonchiffon: "fffacd",
  lightblue: "add8e6",
  lightcoral: "f08080",
  lightcyan: "e0ffff",
  lightgoldenrodyellow: "fafad2",
  lightgray: "d3d3d3",
  lightgreen: "90ee90",
  lightgrey: "d3d3d3",
  lightpink: "ffb6c1",
  lightsalmon: "ffa07a",
  lightseagreen: "20b2aa",
  lightskyblue: "87cefa",
  lightslategray: "789",
  lightslategrey: "789",
  lightsteelblue: "b0c4de",
  lightyellow: "ffffe0",
  lime: "0f0",
  limegreen: "32cd32",
  linen: "faf0e6",
  magenta: "f0f",
  maroon: "800000",
  mediumaquamarine: "66cdaa",
  mediumblue: "0000cd",
  mediumorchid: "ba55d3",
  mediumpurple: "9370db",
  mediumseagreen: "3cb371",
  mediumslateblue: "7b68ee",
  mediumspringgreen: "00fa9a",
  mediumturquoise: "48d1cc",
  mediumvioletred: "c71585",
  midnightblue: "191970",
  mintcream: "f5fffa",
  mistyrose: "ffe4e1",
  moccasin: "ffe4b5",
  navajowhite: "ffdead",
  navy: "000080",
  oldlace: "fdf5e6",
  olive: "808000",
  olivedrab: "6b8e23",
  orange: "ffa500",
  orangered: "ff4500",
  orchid: "da70d6",
  palegoldenrod: "eee8aa",
  palegreen: "98fb98",
  paleturquoise: "afeeee",
  palevioletred: "db7093",
  papayawhip: "ffefd5",
  peachpuff: "ffdab9",
  peru: "cd853f",
  pink: "ffc0cb",
  plum: "dda0dd",
  powderblue: "b0e0e6",
  purple: "800080",
  rebeccapurple: "663399",
  red: "f00",
  rosybrown: "bc8f8f",
  royalblue: "4169e1",
  saddlebrown: "8b4513",
  salmon: "fa8072",
  sandybrown: "f4a460",
  seagreen: "2e8b57",
  seashell: "fff5ee",
  sienna: "a0522d",
  silver: "c0c0c0",
  skyblue: "87ceeb",
  slateblue: "6a5acd",
  slategray: "708090",
  slategrey: "708090",
  snow: "fffafa",
  springgreen: "00ff7f",
  steelblue: "4682b4",
  tan: "d2b48c",
  teal: "008080",
  thistle: "d8bfd8",
  tomato: "ff6347",
  turquoise: "40e0d0",
  violet: "ee82ee",
  wheat: "f5deb3",
  white: "fff",
  whitesmoke: "f5f5f5",
  yellow: "ff0",
  yellowgreen: "9acd32"
};

for (color in cssNames) {
  Color[color] = '#' + cssNames[color];
}

for (color in cssNames) {
  window[color] = '#' + cssNames[color];
}

window.clear = 'clear';

window.transparent = 'transparent';
