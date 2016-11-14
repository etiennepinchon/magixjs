var Element,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Element = (function(_super) {
  __extends(Element, _super);

  Element.prototype._kind = 'Element';

  function Element(options) {
    if (options == null) {
      options = {};
    }
    this._getPropertyValue = __bind(this._getPropertyValue, this);
    this._setPropertyValue = __bind(this._setPropertyValue, this);
    this.toInspect = __bind(this.toInspect, this);
    this._id = Utils.randomID();
    this.__options = options;
    this._context = App.CurrentContext;
    this['_DefinedPropertiesValuesKey'] = {};
  }

  Element.prototype.toInspect = function() {
    return "<" + this._kind + " id:" + (this.id || null) + ">";
  };

  Element.define = function(propertyName, descriptor) {
    var getName, i, setName, _i, _len, _ref;
    _ref = ["enumerable", "exportable", "importable"];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      i = _ref[_i];
      if (descriptor.hasOwnProperty(i)) {
        if (!Utils.isBoolean(descriptor[i])) {
          throw Error("woops " + propertyName + " " + descriptor[i]);
        }
      }
    }
    if (this !== Element) {
      descriptor.propertyName = propertyName;
      if (descriptor.enumerable == null) {
        descriptor.enumerable = true;
      }
      if (descriptor.exportable == null) {
        descriptor.exportable = true;
      }
      if (descriptor.importable == null) {
        descriptor.importable = true;
      }
      descriptor.importable = descriptor.importable && descriptor.set;
      if (descriptor.exportable || descriptor.importable) {
        if (this['_DefinedPropertiesKey'] == null) {
          this['_DefinedPropertiesKey'] = {};
        }
        this['_DefinedPropertiesKey'][propertyName] = descriptor;
      }
    }
    getName = "get" + (Utils.capitalizeFirstLetter(propertyName));
    this.prototype[getName] = descriptor.get;
    descriptor.get = this.prototype[getName];
    if (descriptor.set) {
      setName = "set" + (Utils.capitalizeFirstLetter(propertyName));
      this.prototype[setName] = descriptor.set;
      descriptor.set = this.prototype[setName];
    }
    return Object.defineProperty(this.prototype, propertyName, descriptor);
  };

  Element.simpleProperty = function(name, fallback, options) {
    if (options == null) {
      options = {};
    }
    return Utils.extend(options, {
      "default": fallback,
      get: function() {
        return this._getPropertyValue(name);
      },
      set: function(value) {
        return this._setPropertyValue(name, value);
      }
    });
  };

  Element.proxyProperty = function(keyPath, options) {
    var objectKey;
    if (options == null) {
      options = {};
    }
    objectKey = keyPath.split(".")[0];
    return Utils.extend(options, {
      get: function() {
        if (!Utils.isObject(this[objectKey])) {
          return;
        }
        return Utils.getValueForKeyPath(this, keyPath);
      },
      set: function(value) {
        if (!Utils.isObject(this[objectKey])) {
          return;
        }
        return Utils.setValueForKeyPath(this, keyPath, value);
      }
    });
  };

  Element.prototype._setPropertyValue = function(k, v) {
    return this['_DefinedPropertiesValuesKey'][k] = v;
  };

  Element.prototype._getPropertyValue = function(k) {
    return Utils.valueOrDefault(this['_DefinedPropertiesValuesKey'][k], this._getPropertyDefaultValue(k));
  };

  Element.prototype._getPropertyDefaultValue = function(k) {
    return this._propertyList()[k]["default"];
  };

  Element.prototype._propertyList = function() {
    return this.constructor['_DefinedPropertiesKey'];
  };

  Element.prototype.keys = function() {
    return Utils.keys(this.props);
  };

  Element.prototype.onChange = function(name, cb) {
    return this.on("change:" + name, cb);
  };

  Element.define("id", {
    get: function() {
      return this._id;
    }
  });

  Element.define('props', {
    importable: false,
    exportable: false,
    get: function() {
      var descriptor, key, keys, propertyList;
      keys = [];
      propertyList = this._propertyList();
      for (key in propertyList) {
        descriptor = propertyList[key];
        if (descriptor.exportable) {
          keys.push(key);
        }
      }
      return Utils.pick(this, keys);
    },
    set: function(value) {
      var action, k, propertyList, v, _ref;
      if (Utils.isArray(value)) {
        if (value[0]) {
          this.props = value[0];
        }
        if (value[1]) {
          this.props = value[1];
        }
        return;
      }
      action = null;
      propertyList = this._propertyList();
      for (k in value) {
        v = value[k];
        if (k === 'do') {
          action = v;
        } else {
          if ((_ref = propertyList[k]) != null ? _ref.importable : void 0) {
            this[k] = v;
          }
        }
      }
      if (action) {
        return this["do"] = action;
      }
    }
  });

  return Element;

})(EventEmitter);
