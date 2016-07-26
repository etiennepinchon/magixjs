var ListItem,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

ListItem = (function(_super) {
  __extends(ListItem, _super);

  function ListItem(properties) {
    ListItem.__super__.constructor.apply(this, arguments);
  }

  ListItem.prototype._kind = 'ListItem';

  ListItem.prototype._elementType = 'li';

  return ListItem;

})(View);

ListItem.prototype.itemIndex = function() {
  var i;
  if (!this || !this.parent || !this.parent.children) {
    false;
  }
  for (i in this.parent.children) {
    if (this.parent.children[i] === this) {
      return parseInt(i, 10);
    }
  }
};

ListItem.prototype.removeFromList = function() {
  this.parent.removeChild(this);
};
