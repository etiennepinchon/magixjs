var Page,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Page = (function(_super) {
  __extends(Page, _super);

  function Page(options) {
    if (options == null) {
      options = {};
    }
    if (App.device) {
      options.fixed = false;
    }
    if (options.url) {
      options.parent = -1;
    }
    Page.__super__.constructor.apply(this, arguments);
    this.touchCursor();
    this.onMouseDown(function() {
      return this.touchActiveCursor();
    });
    this.onMouseUp(function() {
      return this.touchCursor();
    });
  }

  Page.prototype._kind = 'Page';

  Page.define('title', {
    configurable: true,
    get: function() {
      return App.title;
    },
    set: function(value) {
      App.title = value;
    }
  });

  Page.define('url', {
    configurable: true,
    get: function() {
      return this.url;
    },
    set: function(value) {
      Routes.add(value, this);
    }
  });

  Page.prototype.isFirst = function() {
    if (!App._pages_counter) {
      return true;
    }
    return false;
  };

  Page.prototype.toInspect = function() {
    if (this.name) {
      return "<Page id:" + this.id + " name:" + this.name + ">";
    }
    return "<Page id:" + this.id + ">";
  };

  Page.prototype.touchCursor = function() {
    var c;
    if (App.device && App.device.type !== NULL && App.device.type !== '') {
      c = 'url(//s3.amazonaws.com/data.magixjs.com/static/cursors/cursor.png) 32 32, auto';
      if (Utils.isWebKit()) {
        c = '-webkit-image-set(url(//s3.amazonaws.com/data.magixjs.com/static/cursors/cursor.png) 1x, url(//s3.amazonaws.com/data.magixjs.com/static/cursors/cursor@2x.png) 2x) 32 32, auto';
      }
      return this.cursor = c;
    } else {
      return this.cursor = 'default';
    }
  };

  Page.prototype.touchActiveCursor = function() {
    var c;
    if (App.device && App.device.type !== NULL && App.device.type !== '') {
      c = 'url(//s3.amazonaws.com/data.magixjs.com/static/cursors/cursorActive.png) 32 32, auto';
      if (Utils.isWebKit()) {
        c = '-webkit-image-set(url(//s3.amazonaws.com/data.magixjs.com/static/cursors/cursorActive.png) 1x, url(//s3.amazonaws.com/data.magixjs.com/static/cursors/cursorActive@2x.png) 2x) 32 32, auto';
      }
      return this.cursor = c;
    } else {
      return this.cursor = 'default';
    }
  };

  return Page;

})(View);
