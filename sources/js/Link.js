var Link,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Link = (function(_super) {
  __extends(Link, _super);

  Link.prototype._kind = 'Link';

  Link.prototype._elementType = 'a';

  function Link(properties) {
    Link.__super__.constructor.apply(this, arguments);
    this.on(Event.Click, function(event, view) {
      if (this.external) {
        return;
      }
      if (!view.url || !this.auto) {
        event.preventDefault();
        return;
      }
      if (!this._isExternal(view.url)) {
        App.go(view.url, true);
        return event.preventDefault();
      }
    });
  }

  Link.define('url', {
    get: function() {
      return this._element.getAttribute('href');
    },
    set: function(value) {
      this._element.setAttribute('href', Utils.parseURL(value));
    }
  });

  Link.define('href', {
    get: function() {
      return this.url;
    },
    set: function(value) {
      this.url = value;
    }
  });

  Link.define('path', {
    get: function() {
      return this.url;
    },
    set: function(value) {
      this.url = value;
    }
  });

  Link.define('link', {
    get: function() {
      return this.url;
    },
    set: function(value) {
      this.url = value;
    }
  });

  Link.define('auto', {
    get: function() {
      if (this._auto === NULL) {
        this._auto = true;
      }
      return this._auto;
    },
    set: function(value) {
      if (value === true) {
        this._auto = true;
      } else {
        this._auto = false;
      }
    }
  });

  Link.define('external', {
    get: function() {
      if (!this._external) {
        this._external = false;
      }
      return this._external;
    },
    set: function(value) {
      if (value === true) {
        this._external = true;
      } else {
        this._external = false;
      }
    }
  });

  Link.define('blank', {
    get: function() {
      if (this._blank !== NULL) {
        this._blank = false;
      }
      return this._blank;
    },
    set: function(value) {
      if (value === true) {
        this._blank = true;
        this.external = true;
        this._element.setAttribute('target', '_blank');
      } else {
        this._blank = false;
        this.external = false;
        this._element.setAttribute('target', '_self');
      }
    }
  });

  Link.define('tab', {
    get: function() {
      return this.blank;
    },
    set: function(value) {
      this.blank = value;
    }
  });

  Link.prototype.go = function(event, view) {
    if (!this.url) {
      if (event) {
        event.preventDefault();
      }
      return;
    }
    if (!this._isExternal(this.url)) {
      App.go(this.url, true);
      if (event) {
        return event.preventDefault();
      }
    }
  };

  Link.prototype._isExternal = function(url) {
    var domain, domainURL;
    domain = function(url) {
      return url.replace('http://', '').replace('https://', '').split('/')[0];
    };
    domainURL = domain(url);
    if (domainURL === '') {
      return false;
    }
    return domain(location.href) !== domainURL;
  };

  return Link;

})(Text);
