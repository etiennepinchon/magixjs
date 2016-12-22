var List,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

List = (function(_super) {
  __extends(List, _super);

  function List(properties) {
    var properties_copy, val;
    properties_copy = Utils.clone(properties);
    if (properties) {
      if (properties.length) {
        delete properties.length;
      }
      if (properties.each) {
        delete properties.each;
      }
    }
    List.__super__.constructor.call(this, properties);
    this.children = [];
    this.count = 0;
    this.functionAtIndex = false;
    this.functionToCount = function() {
      return this.count;
    };
    this.horizontal = false;
    if (properties_copy) {
      if (properties_copy.length) {
        val = properties_copy.length;
        this.length(val);
        delete properties_copy.length;
      }
      if (properties_copy.horizontal) {
        this.horizontal = properties_copy.horizontal;
      }
      if (properties_copy.vertical) {
        this.horizontal = !properties_copy.vertical;
      }
      if (properties_copy.each) {
        this.each(properties_copy.each);
        delete properties_copy.each;
      }
    }
  }

  List.prototype._kind = 'List';

  List.prototype._elementType = 'ul';

  List.prototype.length = function(functionToCount) {
    var number, value;
    if (functionToCount !== NULL && typeof functionToCount === 'number') {
      value = functionToCount;
      functionToCount = function() {
        return value;
      };
    }
    if (functionToCount !== NULL) {
      this.functionToCount = functionToCount;
      return;
    }
    number = this.functionToCount();
    if (typeof number !== 'number') {
      number = 0;
    }
    this.count = number;
    return this.count;
  };

  List.prototype.each = function(functionAtIndex) {
    var i, viewItem, _this;
    this.length();
    if (functionAtIndex) {
      this.functionAtIndex = functionAtIndex;
    }
    _this = this;
    i = 0;
    while (i < this.count) {
      if (functionAtIndex) {
        viewItem = functionAtIndex(null, i);
        if (!viewItem) {
          log('List: nothing was return from the each function.');
          return;
        }
        if (this.horizontal) {
          viewItem.display = 'inline-block';
        } else {
          viewItem.display = 'block';
        }
        _this.addChild(viewItem);
      }
      i++;
    }
  };

  List.prototype.itemAtIndex = function(index) {
    return this.children[index];
  };

  List.prototype.addItem = function(item) {
    this.addChild(item);
  };

  List.prototype.removeItem = function(item) {
    this.removeChild(item);
  };

  List.prototype.removeItemAtIndex = function(index) {
    var i;
    for (i in this.children) {
      if (i === index) {
        this.removeChild(this.parent.children[i]);
        return;
      }
    }
  };

  List.prototype.reload = function() {
    var children, i, indexedItem, item;
    if (!this.functionAtIndex) {
      return;
    }
    this.length();
    if (this.count < this.children.length) {
      children = this.children.length;
      i = 0;
      while (i < children) {
        if (this.count <= i) {
          this.removeChild(this.children[0]);
        }
        i++;
      }
    }
    i = 0;
    while (i < this.count) {
      item = this.children[i];
      indexedItem = this.functionAtIndex(item, i);
      if (this.horizontal) {
        indexedItem.display = 'inline-block';
      } else {
        indexedItem.display = 'block';
      }
      if (!item && indexedItem) {
        this.addChild(indexedItem);
      }
      i++;
    }
  };

  List.prototype.reset = function() {
    this._children = [];
    this.html = '';
    return this.each(this.functionAtIndex);
  };

  return List;

})(View);
