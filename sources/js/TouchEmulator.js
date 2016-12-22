var TouchEmulator, cancelEvent, createTouch, dispatchTouchEvent, touchEmulator,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

createTouch = function(event, identifier, offset) {
  var touch;
  if (offset == null) {
    offset = {
      x: 0,
      y: 0
    };
  }
  return touch = {
    identifier: identifier,
    target: event.target,
    pageX: event.pageX - offset.x,
    pageY: event.pageY - offset.y,
    clientX: event.clientX - offset.x,
    clientY: event.clientY - offset.y,
    screenX: event.screenX - offset.x,
    screenY: event.screenY - offset.y
  };
};

dispatchTouchEvent = function(type, target, event, offset) {
  var touchEvent, touches;
  if (target == null) {
    target = event.target;
  }
  touchEvent = document.createEvent("MouseEvent");
  touchEvent.initMouseEvent(type, true, true, window, event.detail, event.screenX, event.screenY, event.clientX, event.clientY, event.ctrlKey, event.shiftKey, event.altKey, event.metaKey, event.button, event.relatedTarget);
  touches = [];
  touches.push(createTouch(event, 1));
  if (offset) {
    touches.push(createTouch(event, 2, offset));
  }
  touchEvent.touches = touchEvent.changedTouches = touchEvent.targetTouches = touches;
  return target.dispatchEvent(touchEvent);
};

cancelEvent = function(event) {
  event.preventDefault();
  return event.stopPropagation();
};

TouchEmulator = (function(_super) {
  __extends(TouchEmulator, _super);

  function TouchEmulator() {
    this.mousemovePosition = __bind(this.mousemovePosition, this);
    this.mouseout = __bind(this.mouseout, this);
    this.mouseup = __bind(this.mouseup, this);
    this.mousemove = __bind(this.mousemove, this);
    this.mousedown = __bind(this.mousedown, this);
    this.keyup = __bind(this.keyup, this);
    this.keydown = __bind(this.keydown, this);
    var touchPointerInitialOffset;
    this.touchPointerImage = "url('//localhost:9000/documents/images/cursors/cursor@2x.png')";
    this.touchPointerImageActive = "url('//localhost:9000/documents/images/cursors/cursor-active@2x.png')";
    this.touchPointerImageSize = 64;
    this.touchPointerInitialOffset = {
      x: 0,
      y: 0
    };
    this.keyPinchCode = 18;
    this.keyPanCode = 91;
    this.context = new Context({
      name: "TouchEmulator"
    });
    this.context._element.style.zIndex = 10000;
    this.wrap = this.context.domEventManager.wrap;
    this.wrap(document).addEventListener("mousedown", this.mousedown, true);
    this.wrap(document).addEventListener("mousemove", this.mousemove, true);
    this.wrap(document).addEventListener("mouseup", this.mouseup, true);
    this.wrap(document).addEventListener("keydown", this.keydown, true);
    this.wrap(document).addEventListener("keyup", this.keyup, true);
    this.wrap(document).addEventListener("mouseout", this.mouseout, true);
    this.isMouseDown = false;
    this.isPinchKeyDown = false;
    this.isPanKeyDown = false;
    touchPointerInitialOffset = this.touchPointerInitialOffset;
    this.touchPointView = new View({
      width: this.touchPointerImageSize,
      height: this.touchPointerImageSize,
      backgroundColor: null,
      opacity: 1,
      parent: App.page
    });
    this.touchPointView.style.backgroundImage = this.touchPointerImage;
  }

  TouchEmulator.prototype.destroy = function() {
    this.context.reset();
    return this.context = null;
  };

  TouchEmulator.prototype.keydown = function(event) {
    if (event.keyCode === this.keyPinchCode) {
      this.isPinchKeyDown = true;
      this.startPoint = this.centerPoint = null;
      this.showTouchCursor();
      this.touchPointView.midX = this.point.x;
      this.touchPointView.midY = this.point.y;
    }
    if (event.keyCode === this.keyPanCode) {
      this.isPanKeyDown = true;
      return cancelEvent(event);
    }
  };

  TouchEmulator.prototype.keyup = function(event) {
    if (event.keyCode === this.keyPinchCode) {
      cancelEvent(event);
      this.isPinchKeyDown = false;
      this.hideTouchCursor();
    }
    if (event.keyCode === this.keyPanCode) {
      cancelEvent(event);
      if (this.touchPoint && this.point) {
        this.centerPoint = Utils.pointCenter(this.touchPoint, this.point);
        return this.isPanKeyDown = false;
      }
    }
  };

  TouchEmulator.prototype.mousedown = function(event) {
    this.isMouseDown = true;
    this.target = event.target;
    if (this.isPinchKeyDown) {
      dispatchTouchEvent("touchstart", this.target, event, this.touchPointDelta);
    } else {
      dispatchTouchEvent("touchstart", this.target, event);
    }
    return this.touchPointView.style.backgroundImage = this.touchPointerImageActive;
  };

  TouchEmulator.prototype.mousemove = function(event) {
    this.point = {
      x: event.pageX,
      y: event.pageY
    };
    if (this.startPoint == null) {
      this.startPoint = this.point;
    }
    if (this.centerPoint == null) {
      this.centerPoint = this.point;
    }
    if (this.isPinchKeyDown && !this.isPanKeyDown) {
      if (this.touchPointerInitialOffset && this.centerPoint) {
        this.touchPoint = Utils.pointAdd(this.touchPointerInitialOffset, this.pinchPoint(this.point, this.centerPoint));
        this.touchPointDelta = Utils.pointSubtract(this.point, this.touchPoint);
      }
    }
    if (this.isPinchKeyDown && this.isPanKeyDown) {
      if (this.touchPoint && this.touchPointDelta) {
        this.touchPoint = this.panPoint(this.point, this.touchPointDelta);
      }
    }
    if (this.isPinchKeyDown || this.isPanKeyDown) {
      if (this.touchPoint) {
        this.touchPointView.visible = true;
        this.touchPointView.midX = this.touchPoint.x;
        this.touchPointView.midY = this.touchPoint.y;
      }
    }
    if (this.isMouseDown) {
      if ((this.isPinchKeyDown || this.isPanKeyDown) && this.touchPointDelta) {
        return dispatchTouchEvent("touchmove", this.target, event, this.touchPointDelta);
      } else {
        return dispatchTouchEvent("touchmove", this.target, event);
      }
    }
  };

  TouchEmulator.prototype.mouseup = function(event) {
    if (this.isPinchKeyDown || this.isPanKeyDown) {
      dispatchTouchEvent("touchend", this.target, event, this.touchPointDelta);
    } else {
      dispatchTouchEvent("touchend", this.target, event);
    }
    return this.endMultiTouch();
  };

  TouchEmulator.prototype.mouseout = function(event) {
    var fromElement;
    if (this.isMouseDown) {
      return;
    }
    fromElement = event.relatedTarget || event.toElement;
    if (!fromElement || fromElement.nodeName === "HTML") {
      return this.endMultiTouch();
    }
  };

  TouchEmulator.prototype.showTouchCursor = function() {
    if (!this.point) {
      this.point = {
        x: event.pageX,
        y: event.pageY
      };
    }
    this.touchPointView.animateStop();
    this.touchPointView.midX = this.point.x;
    this.touchPointView.midY = this.point.y;
    this.touchPointView.scale = 1.8;
    return this.touchPointView.animate({
      opacity: 1,
      scale: 1,
      options: {
        time: 0.1,
        curve: "ease-out"
      }
    });
  };

  TouchEmulator.prototype.hideTouchCursor = function() {
    if (!(this.touchPointView.opacity > 0)) {
      return;
    }
    this.touchPointView.animateStop();
    return this.touchPointView.animate({
      opacity: 0,
      scale: 1.2,
      options: {
        time: 0.08
      }
    });
  };

  TouchEmulator.prototype.mousemovePosition = function(event) {
    return this.point = {
      x: event.pageX,
      y: event.pageY
    };
  };

  TouchEmulator.prototype.endMultiTouch = function() {
    this.isMouseDown = false;
    this.touchPointView.style.backgroundImage = this.touchPointerImage;
    return this.hideTouchCursor();
  };

  TouchEmulator.prototype.pinchPoint = function(point, centerPoint) {
    return Utils.pointSubtract(centerPoint, Utils.pointSubtract(point, centerPoint));
  };

  TouchEmulator.prototype.panPoint = function(point, offsetPoint) {
    return Utils.pointSubtract(point, offsetPoint);
  };

  return TouchEmulator;

})(Element);

touchEmulator = null;

TouchEmulator.enable = function() {
  if (Utils.isTouch()) {
    return;
  }
  if (touchEmulator == null) {
    touchEmulator = new TouchEmulator();
  }
  return Event.enableEmulatedTouchEvents(true);
};

TouchEmulator.disable = function() {
  if (!touchEmulator) {
    return;
  }
  touchEmulator.destroy();
  touchEmulator = null;
  return Event.enableEmulatedTouchEvents(false);
};
