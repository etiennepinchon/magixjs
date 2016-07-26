
/*
canvas = new Canvas
	width: 500
	height: 400
	parent: @

ctx = canvas.getContext('2d')
ctx.moveTo 0,0
ctx.lineTo 200,100
ctx.stroke()
 */
var Canvas,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Canvas = (function(_super) {
  __extends(Canvas, _super);

  function Canvas(options) {
    Canvas.__super__.constructor.apply(this, arguments);
  }

  Canvas.prototype._kind = 'Canvas';

  Canvas.prototype._elementType = 'canvas';

  Canvas.prototype.getContext = function(ctx) {
    if (ctx == null) {
      ctx = "2d";
    }
    return this._element.getContext(ctx);
  };

  return Canvas;

})(View);
