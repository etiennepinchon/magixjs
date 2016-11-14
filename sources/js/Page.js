var Page,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Page = (function(_super) {
  __extends(Page, _super);

  function Page(options) {
    if (options.url) {
      options.parent = -1;
    }
    if (!options.parent && !options.url) {
      options.parent = App;
    }
    Page.__super__.constructor.apply(this, arguments);
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

  return Page;

})(View);
