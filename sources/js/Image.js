var Image,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

window._Image = window.Image;

Image = (function(_super) {
  __extends(Image, _super);

  function Image(properties) {
    Image.__super__.constructor.apply(this, arguments);
  }

  Image.prototype._kind = 'Image';

  Image.prototype._elementType = 'img';

  Image.define('src', {
    get: function() {
      return this._src;
    },
    set: function(value) {
      this._src = value;
      this._element.setAttribute('src', Utils.parseAsset(value));
    }
  });

  Image.define('image', {
    get: function() {
      return this.src;
    },
    set: function(value) {
      this.src = value;
    }
  });

  Image.define('source', {
    get: function() {
      return this.src;
    },
    set: function(value) {
      this.src = value;
    }
  });

  Image.define('url', {
    get: function() {
      return this.src;
    },
    set: function(value) {
      this.src = value;
    }
  });

  Image.define('aspect', {
    get: function() {
      if (this._aspect === void 0) {
        this._aspect = 'fit';
      }
      return this._aspect;
    },
    set: function(value) {
      if (value === 'fit') {
        this.props = {
          width: 'auto',
          height: 'auto',
          maxWidth: '100%',
          maxHeight: '100%'
        };
        return this._aspect = 'fit';
      } else if (value === 'fitCenter') {
        this.props = {
          width: 'auto',
          height: 'auto',
          maxWidth: '100%',
          maxHeight: '100%',
          display: 'block',
          margin: 'auto'
        };
        return this._aspect = 'fitCenter';
      } else if (value === 'fill') {
        this.props = {
          width: '100%',
          height: '100%',
          maxWidth: '',
          maxHeight: ''
        };
        return this._aspect = 'fill';
      } else if (value === 'fillWidth') {
        this.props = {
          width: '100%',
          height: 'auto',
          maxWidth: '',
          maxHeight: ''
        };
        return this._aspect = 'fillWidth';
      } else if (value === 'fillHeight') {
        this.props = {
          width: 'auto',
          height: '100%',
          maxWidth: '',
          maxHeight: ''
        };
        return this._aspect = 'fillHeight';
      } else if (value === 'fillHeightCenter') {
        this.props = {
          width: 'auto',
          height: '100%',
          maxWidth: '',
          maxHeight: '',
          display: 'block',
          margin: 'auto'
        };
        return this._aspect = 'fillHeightCenter';
      }
    }
  });

  Image.define('original', {
    get: function() {
      return {
        width: this.element.naturalWidth,
        height: this.element.naturalHeight
      };
    }
  });

  Image.define('loaded', {
    get: function() {
      if (this._eventLoaded === void 0) {
        return null;
      }
      return this._eventLoaded;
    },
    set: function(value) {
      if (!value) {
        return;
      }
      this._eventLoaded = value;
      this.on(Event.Load, value);
    }
  });

  Image.define('done', {
    get: function() {
      return this.loaded;
    },
    set: function(value) {
      this.loaded = value;
    }
  });

  Image.define('then', {
    get: function() {
      return this.loaded;
    },
    set: function(value) {
      this.loaded = value;
    }
  });

  Image.define('after', {
    get: function() {
      return this.loaded;
    },
    set: function(value) {
      this.loaded = value;
    }
  });

  Image.define('finished', {
    get: function() {
      return this.loaded;
    },
    set: function(value) {
      this.loaded = value;
    }
  });

  Image.define('finish', {
    get: function() {
      return this.loaded;
    },
    set: function(value) {
      this.loaded = value;
    }
  });

  Image.prototype.onLoad = function(cb) {
    return this.on(Event.Load, cb);
  };

  Image.prototype.onLoaded = function(cb) {
    return this.on(Event.Load, cb);
  };

  Image.prototype.onDone = function(cb) {
    return this.on(Event.Load, cb);
  };

  return Image;

})(View);
