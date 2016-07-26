var GestureDoubleTapTime, GestureEdgeSwipeDistance, GestureForceTapDesktop, GestureForceTapMobile, GestureForceTapMobilePollTime, GestureLongPressTime, GestureMinimumFingerDistance, GestureRecognizer, GestureSwipeThreshold, GestureVelocityTime,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

GestureLongPressTime = 0.5;

GestureDoubleTapTime = 0.25;

GestureSwipeThreshold = 30;

GestureEdgeSwipeDistance = 30;

GestureVelocityTime = 0.1;

GestureForceTapDesktop = MouseEvent.WEBKIT_FORCE_AT_FORCE_MOUSE_DOWN;

GestureForceTapMobile = 0.7;

GestureForceTapMobilePollTime = 1 / 30;

GestureMinimumFingerDistance = 30;

GestureRecognizer = (function() {
  function GestureRecognizer() {
    this._process = __bind(this._process, this);
    this.edgeswipedirectionend = __bind(this.edgeswipedirectionend, this);
    this.edgeswipedirectionstart = __bind(this.edgeswipedirectionstart, this);
    this.edgeswipedirection = __bind(this.edgeswipedirection, this);
    this.swipedirectionend = __bind(this.swipedirectionend, this);
    this.swipedirection = __bind(this.swipedirection, this);
    this.swipedirectionstart = __bind(this.swipedirectionstart, this);
    this.swipeend = __bind(this.swipeend, this);
    this.swipe = __bind(this.swipe, this);
    this.swipestart = __bind(this.swipestart, this);
    this.rotateend = __bind(this.rotateend, this);
    this.rotate = __bind(this.rotate, this);
    this.rotatestart = __bind(this.rotatestart, this);
    this.scaleend = __bind(this.scaleend, this);
    this.scale = __bind(this.scale, this);
    this.scalestart = __bind(this.scalestart, this);
    this.pinchend = __bind(this.pinchend, this);
    this.pinch = __bind(this.pinch, this);
    this.pinchstart = __bind(this.pinchstart, this);
    this.panright = __bind(this.panright, this);
    this.panleft = __bind(this.panleft, this);
    this.pandown = __bind(this.pandown, this);
    this.panup = __bind(this.panup, this);
    this.panend = __bind(this.panend, this);
    this.pan = __bind(this.pan, this);
    this.panstart = __bind(this.panstart, this);
    this.forcetapend = __bind(this.forcetapend, this);
    this.forcetapstart = __bind(this.forcetapstart, this);
    this.forcetapchange = __bind(this.forcetapchange, this);
    this._updateMacForce = __bind(this._updateMacForce, this);
    this._updateTouchForce = __bind(this._updateTouchForce, this);
    this.longpressend = __bind(this.longpressend, this);
    this.longpressstart = __bind(this.longpressstart, this);
    this.doubletap = __bind(this.doubletap, this);
    this.tapend = __bind(this.tapend, this);
    this.tapstart = __bind(this.tapstart, this);
    this.tap = __bind(this.tap, this);
    this.touchend = __bind(this.touchend, this);
    this.touchmove = __bind(this.touchmove, this);
    this.touchstart = __bind(this.touchstart, this);
    this.startTouch = __bind(this.startTouch, this);
    this.startMouse = __bind(this.startMouse, this);
    this.em = new DOMEventManager();
    this.em.wrap(window).addEventListener("mousedown", this.startMouse);
    this.em.wrap(window).addEventListener("touchstart", this.startTouch);
  }

  GestureRecognizer.prototype.destroy = function() {
    return this.em.removeAllListeners();
  };

  GestureRecognizer.prototype.cancel = function() {
    window.clearTimeout(this.session.pressTimer);
    return this.session = null;
  };

  GestureRecognizer.prototype.startMouse = function(event) {
    if (this.session) {
      return;
    }
    this.em.wrap(window).addEventListener("mousemove", this.touchmove);
    this.em.wrap(window).addEventListener("mouseup", this.touchend);
    return this.touchstart(event);
  };

  GestureRecognizer.prototype.startTouch = function(event) {
    if (this.session) {
      return;
    }
    this.em.wrap(window).addEventListener("touchmove", this.touchmove);
    this.em.wrap(window).addEventListener("touchend", this.touchend);
    return this.touchstart(event);
  };

  GestureRecognizer.prototype.touchstart = function(event) {
    if (this.session) {
      return;
    }
    this.em.wrap(window).addEventListener("webkitmouseforcechanged", this._updateMacForce);
    this.session = {
      startEvent: this._getGestureEvent(event),
      lastEvent: null,
      startMultiEvent: null,
      startTime: Date.now(),
      pressTimer: window.setTimeout(this.longpressstart, GestureLongPressTime * 1000),
      started: {},
      events: [],
      eventCount: 0
    };
    event = this._getGestureEvent(event);
    this.tapstart(event);
    if (Date.now() - this.doubleTapTime < (GestureDoubleTapTime * 1000)) {
      this.doubletap(event);
    } else {
      this.doubleTapTime = Date.now();
    }
    this._process(event);
    if (Utils.isTouch()) {
      return this._updateTouchForce();
    }
  };

  GestureRecognizer.prototype.touchmove = function(event) {
    return this._process(this._getGestureEvent(event));
  };

  GestureRecognizer.prototype.touchend = function(event) {
    var eventName, value, _ref, _ref1;
    if (event.touches != null) {
      if (Utils.isTouch()) {
        if (!(event.touches.length === 0)) {
          return;
        }
      } else {
        if (!(event.touches.length === event.changedTouches.length)) {
          return;
        }
      }
    }
    this.em.wrap(window).removeEventListener("mousemove", this.touchmove);
    this.em.wrap(window).removeEventListener("mouseup", this.touchend);
    this.em.wrap(window).removeEventListener("touchmove", this.touchmove);
    this.em.wrap(window).removeEventListener("touchend", this.touchend);
    this.em.wrap(window).addEventListener("webkitmouseforcechanged", this._updateMacForce);
    event = this._getGestureEvent(event);
    _ref = this.session.started;
    for (eventName in _ref) {
      value = _ref[eventName];
      if (value) {
        this["" + eventName + "end"](event);
      }
    }
    if (!((_ref1 = this.session) != null ? _ref1.startEvent : void 0)) {
      this.tap(event);
    } else if (this.session.startEvent.target === event.target) {
      this.tap(event);
    }
    this.tapend(event);
    return this.cancel();
  };

  GestureRecognizer.prototype.tap = function(event) {
    return this._dispatchEvent("tap", event);
  };

  GestureRecognizer.prototype.tapstart = function(event) {
    return this._dispatchEvent("tapstart", event);
  };

  GestureRecognizer.prototype.tapend = function(event) {
    return this._dispatchEvent("tapend", event);
  };

  GestureRecognizer.prototype.doubletap = function(event) {
    return this._dispatchEvent("doubletap", event);
  };

  GestureRecognizer.prototype.longpressstart = function() {
    var event;
    if (!this.session) {
      return;
    }
    if (this.session.started.longpress) {
      return;
    }
    event = this._getGestureEvent(this.session.startEvent);
    this.session.started.longpress = event;
    this._dispatchEvent("longpressstart", event);
    return this._dispatchEvent("longpress", event);
  };

  GestureRecognizer.prototype.longpressend = function(event) {
    return this._dispatchEvent("longpressend", event);
  };

  GestureRecognizer.prototype._updateTouchForce = function() {
    var event, _ref, _ref1;
    if (!((_ref = this.session) != null ? (_ref1 = _ref.lastEvent) != null ? _ref1.touches.length : void 0 : void 0)) {
      return;
    }
    this.session.force = this.session.lastEvent.touches[0].force || 0;
    event = this._getGestureEvent(this.session.lastEvent);
    this.forcetapchange(event);
    if (this.session.force >= GestureForceTapMobile) {
      this.forcetapstart(event);
    } else {
      this.forcetapend(event);
    }
    return setTimeout(this._updateTouchForce, GestureForceTapMobilePollTime);
  };

  GestureRecognizer.prototype._updateMacForce = function(event) {
    if (!this.session) {
      return;
    }
    this.session.force = Utils.modulate(event.webkitForce, [0, 3], [0, 1]);
    this.forcetapchange(this._getGestureEvent(event));
    if (event.webkitForce >= GestureForceTapDesktop) {
      return this.forcetapstart(event);
    } else {
      return this.forcetapend(event);
    }
  };

  GestureRecognizer.prototype.forcetapchange = function(event) {
    return this._dispatchEvent("forcetapchange", event);
  };

  GestureRecognizer.prototype.forcetapstart = function(event) {
    if (!this.session) {
      return;
    }
    if (this.session.started.forcetap) {
      return;
    }
    this.session.started.forcetap = event;
    this._dispatchEvent("forcetapstart", event);
    return this._dispatchEvent("forcetap", event);
  };

  GestureRecognizer.prototype.forcetapend = function(event) {
    if (!this.session) {
      return;
    }
    if (!this.session.started.forcetap) {
      return;
    }
    this.session.started.forcetap = null;
    return this._dispatchEvent("forcetapend", event);
  };

  GestureRecognizer.prototype.panstart = function(event) {
    this.session.started.pan = event;
    return this._dispatchEvent("panstart", event, this.session.started.pan.target);
  };

  GestureRecognizer.prototype.pan = function(event) {
    var direction;
    this._dispatchEvent("pan", event, this.session.started.pan.target);
    direction = this._getDirection(event.delta);
    if (direction) {
      return this["pan" + direction](event);
    }
  };

  GestureRecognizer.prototype.panend = function(event) {
    this._dispatchEvent("panend", event, this.session.started.pan.target);
    return this.session.started.pan = null;
  };

  GestureRecognizer.prototype.panup = function(event) {
    return this._dispatchEvent("panup", event, this.session.started.pan.target);
  };

  GestureRecognizer.prototype.pandown = function(event) {
    return this._dispatchEvent("pandown", event, this.session.started.pan.target);
  };

  GestureRecognizer.prototype.panleft = function(event) {
    return this._dispatchEvent("panleft", event, this.session.started.pan.target);
  };

  GestureRecognizer.prototype.panright = function(event) {
    return this._dispatchEvent("panright", event, this.session.started.pan.target);
  };

  GestureRecognizer.prototype.pinchstart = function(event) {
    this.session.started.pinch = event;
    this.scalestart(event, this.session.started.pinch.target);
    this.rotatestart(event, this.session.started.pinch.target);
    return this._dispatchEvent("pinchstart", event);
  };

  GestureRecognizer.prototype.pinch = function(event) {
    this._dispatchEvent("pinch", event);
    this.scale(event, this.session.started.pinch.target);
    return this.rotate(event, this.session.started.pinch.target);
  };

  GestureRecognizer.prototype.pinchend = function(event) {
    this._dispatchEvent("pinchend", event);
    this.scaleend(event, this.session.started.pinch.target);
    this.rotateend(event, this.session.started.pinch.target);
    return this.session.started.pinch = null;
  };

  GestureRecognizer.prototype.scalestart = function(event) {
    return this._dispatchEvent("scalestart", event);
  };

  GestureRecognizer.prototype.scale = function(event) {
    return this._dispatchEvent("scale", event);
  };

  GestureRecognizer.prototype.scaleend = function(event) {
    return this._dispatchEvent("scaleend", event);
  };

  GestureRecognizer.prototype.rotatestart = function(event) {
    return this._dispatchEvent("rotatestart", event);
  };

  GestureRecognizer.prototype.rotate = function(event) {
    return this._dispatchEvent("rotate", event);
  };

  GestureRecognizer.prototype.rotateend = function(event) {
    return this._dispatchEvent("rotateend", event);
  };

  GestureRecognizer.prototype.swipestart = function(event) {
    this._dispatchEvent("swipestart", event);
    this.session.started.swipe = event;
    return this.swipedirectionstart(event);
  };

  GestureRecognizer.prototype.swipe = function(event) {
    this._dispatchEvent("swipe", event);
    return this.swipedirection(event);
  };

  GestureRecognizer.prototype.swipeend = function(event) {
    return this._dispatchEvent("swipeend", event);
  };

  GestureRecognizer.prototype.swipedirectionstart = function(event) {
    var direction, maxX, maxY, swipeEdge, _ref, _ref1, _ref2, _ref3;
    if (!event.offsetDirection) {
      return;
    }
    if (this.session.started.swipedirection) {
      return;
    }
    this.session.started.swipedirection = event;
    direction = this.session.started.swipedirection.offsetDirection;
    this._dispatchEvent("swipe" + direction + "start", event);
    swipeEdge = this._edgeForSwipeDirection(direction);
    maxX = Utils.frameGetMaxX(App.frame);
    maxY = Utils.frameGetMaxY(App.frame);
    if (swipeEdge === "top" && (0 < (_ref = event.start.y - App.frame.y) && _ref < GestureEdgeSwipeDistance)) {
      this.edgeswipedirectionstart(event);
    }
    if (swipeEdge === "right" && (maxX - GestureEdgeSwipeDistance < (_ref1 = event.start.x) && _ref1 < maxX)) {
      this.edgeswipedirectionstart(event);
    }
    if (swipeEdge === "bottom" && (maxY - GestureEdgeSwipeDistance < (_ref2 = event.start.y) && _ref2 < maxY)) {
      this.edgeswipedirectionstart(event);
    }
    if (swipeEdge === "left" && (0 < (_ref3 = event.start.x - App.frame.x) && _ref3 < GestureEdgeSwipeDistance)) {
      return this.edgeswipedirectionstart(event);
    }
  };

  GestureRecognizer.prototype.swipedirection = function(event) {
    var direction;
    if (!this.session.started.swipedirection) {
      return;
    }
    direction = this.session.started.swipedirection.offsetDirection;
    this._dispatchEvent("swipe" + direction, event);
    if (this.session.started.edgeswipedirection) {
      return this.edgeswipedirection(event);
    }
  };

  GestureRecognizer.prototype.swipedirectionend = function(event) {
    var direction;
    if (!this.session.started.swipedirection) {
      return;
    }
    direction = this.session.started.swipedirection.offsetDirection;
    return this._dispatchEvent("swipe" + direction + "end", event);
  };

  GestureRecognizer.prototype.edgeswipedirection = function(event) {
    var swipeEdge;
    swipeEdge = this._edgeForSwipeDirection(this.session.started.edgeswipedirection.offsetDirection);
    App.emit("edgeswipe", this._createEvent("edgeswipe", event));
    App.emit("edgeswipe" + swipeEdge, this._createEvent("edgeswipe" + swipeEdge, event));
    return this._dispatchEvent("edgeswipe" + swipeEdge, event);
  };

  GestureRecognizer.prototype.edgeswipedirectionstart = function(event) {
    var swipeEdge;
    if (this.session.started.edgeswipedirection) {
      return;
    }
    this.session.started.edgeswipedirection = event;
    swipeEdge = this._edgeForSwipeDirection(this.session.started.edgeswipedirection.offsetDirection);
    App.emit("edgeswipestart", this._createEvent("edgeswipestart", event));
    return App.emit("edgeswipe" + swipeEdge + "start", this._createEvent("edgeswipe" + swipeEdge + "start", event));
  };

  GestureRecognizer.prototype.edgeswipedirectionend = function(event) {
    var swipeEdge;
    swipeEdge = this._edgeForSwipeDirection(this.session.started.edgeswipedirection.offsetDirection);
    App.emit("edgeswipeend", this._createEvent("edgeswipeend", event));
    return App.emit("edgeswipe" + swipeEdge + "end", this._createEvent("edgeswipe" + swipeEdge + "end", event));
  };

  GestureRecognizer.prototype._process = function(event) {
    if (!this.session) {
      return;
    }
    this.session.events.push(event);
    event.eventCount = this.session.eventCount++;
    if (Math.abs(event.delta.x) > 0 || Math.abs(event.delta.y) > 0) {
      if (!this.session.started.pan) {
        this.panstart(event);
      } else {
        this.pan(event);
      }
    }
    if (this.session.started.pinch && event.fingers === 1) {
      this.pinchend(event);
    } else if (!this.session.started.pinch && event.fingers === 2) {
      this.pinchstart(event);
    } else if (this.session.started.pinch) {
      this.pinch(event);
    }
    if (!this.session.started.swipe && (Math.abs(event.offset.x) > GestureSwipeThreshold || Math.abs(event.offset.y) > GestureSwipeThreshold)) {
      this.swipestart(event);
    } else if (this.session.started.swipe) {
      this.swipe(event);
    }
    return this.session.lastEvent = event;
  };

  GestureRecognizer.prototype._getEventPoint = function(event) {
    var _ref;
    if ((_ref = event.touches) != null ? _ref.length : void 0) {
      return this._getTouchPoint(event, 0);
    }
    return {
      x: event.pageX,
      y: event.pageY
    };
  };

  GestureRecognizer.prototype._getGestureEvent = function(event) {
    var events, pointKey, touchPointA, touchPointB, _i, _len, _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8, _ref9;
    Utils.extend(event, {
      time: Date.now(),
      point: this._getEventPoint(event),
      start: this._getEventPoint(event),
      previous: this._getEventPoint(event),
      offset: {
        x: 0,
        y: 0
      },
      offsetTime: 0,
      offsetAngle: 0,
      offsetDirection: null,
      delta: {
        x: 0,
        y: 0
      },
      deltaTime: 0,
      deltaAngle: 0,
      deltaDirection: null,
      force: 0,
      velocity: {
        x: 0,
        y: 0
      },
      fingers: ((_ref = event.touches) != null ? _ref.length : void 0) || 0,
      touchCenter: this._getEventPoint(event),
      touchOffset: {
        x: 0,
        y: 0
      },
      touchDistance: 0,
      scale: 1,
      scaleDirection: null,
      rotation: 0
    });
    if ((_ref1 = this.session) != null ? _ref1.startEvent : void 0) {
      event.start = this.session.startEvent.point;
      event.offset = Utils.pointSubtract(event.point, event.start);
      event.offsetTime = event.time - this.session.startEvent.time;
      event.offsetAngle = Utils.pointAngle(this.session.startEvent.point, event.point);
      event.offsetDirection = this._getDirection(event.offset);
      event.touchCenterStart = this.session.startEvent.touchCenter;
    }
    if ((_ref2 = this.session) != null ? _ref2.lastEvent : void 0) {
      event.previous = this.session.lastEvent.point;
      event.deltaTime = event.time - this.session.lastEvent.time;
      event.delta = Utils.pointSubtract(event.point, this.session.lastEvent.point);
      event.deltaAngle = Utils.pointAngle(event.point, this.session.lastEvent.point);
      event.deltaDirection = this._getDirection(event.delta);
    }
    if (event.fingers > 1) {
      touchPointA = this._getTouchPoint(event, 0);
      touchPointB = this._getTouchPoint(event, 1);
      event.touchCenter = Utils.pointCenter(touchPointB, touchPointA);
      event.touchOffset = Utils.pointSubtract(touchPointB, touchPointA);
      event.touchDistance = Utils.max([GestureMinimumFingerDistance, Utils.pointDistance(touchPointA, touchPointB)]);
      event.rotation = Utils.pointAngle(touchPointA, touchPointB);
    }
    if ((_ref3 = this.session) != null ? _ref3.events : void 0) {
      events = this.session.events.filter(function(e) {
        if (e.eventCount === 0) {
          return false;
        }
        return e.time > (event.time - (GestureVelocityTime * 1000));
      });
      event.velocity = this._getVelocity(events);
    }
    if ((_ref4 = this.session) != null ? _ref4.started.pinch : void 0) {
      event.scale = event.touchDistance / this.session.started.pinch.touchDistance;
      event.scaleDirection = this._getScaleDirection(event.scale - this.session.lastEvent.scale);
      if (!event.scaleDirection && ((_ref5 = this.session) != null ? _ref5.lastEvent : void 0)) {
        event.scaleDirection = this.session.lastEvent.scaleDirection;
      }
    }
    if ((_ref6 = this.session) != null ? _ref6.lastEvent : void 0) {
      if ((event.fingers !== (_ref7 = this.session.lastEvent.fingers) && _ref7 === 2)) {
        event.delta = {
          x: 0,
          y: 0
        };
      }
      if (event.fingers === 2 && this.session.lastEvent.fingers === 2) {
        event.delta = Utils.pointSubtract(event.touchCenter, this.session.lastEvent.touchCenter);
      }
    }
    if ((_ref8 = this.session) != null ? _ref8.lastEvent : void 0) {
      if (this.session.force) {
        event.force = this.session.force;
      }
    }
    _ref9 = ["point", "start", "previous", "offset", "delta", "velocity", "touchCenter", "touchOffset"];
    for (_i = 0, _len = _ref9.length; _i < _len; _i++) {
      pointKey = _ref9[_i];
      event["" + pointKey + "X"] = event[pointKey].x;
      event["" + pointKey + "Y"] = event[pointKey].y;
    }
    return event;
  };

  GestureRecognizer.prototype._getTouchPoint = function(event, index) {
    var point;
    return point = {
      x: event.touches[index].pageX,
      y: event.touches[index].pageY
    };
  };

  GestureRecognizer.prototype._getDirection = function(offset) {
    if (Math.abs(offset.x) > Math.abs(offset.y)) {
      if (offset.x > 0) {
        return "right";
      }
      if (offset.x < 0) {
        return "left";
      }
    }
    if (Math.abs(offset.x) < Math.abs(offset.y)) {
      if (offset.y < 0) {
        return "up";
      }
      if (offset.y > 0) {
        return "down";
      }
    }
    return null;
  };

  GestureRecognizer.prototype._edgeForSwipeDirection = function(direction) {
    if (direction === "down") {
      return "top";
    }
    if (direction === "left") {
      return "right";
    }
    if (direction === "up") {
      return "bottom";
    }
    if (direction === "right") {
      return "left";
    }
    return null;
  };

  GestureRecognizer.prototype._getScaleDirection = function(offset) {
    if (offset > 0) {
      return "up";
    }
    if (offset < 0) {
      return "down";
    }
    return null;
  };

  GestureRecognizer.prototype._createEvent = function(type, event) {
    var k, touchEvent, v;
    touchEvent = document.createEvent("MouseEvent");
    touchEvent.initMouseEvent(type, true, true, window, event.detail, event.screenX, event.screenY, event.clientX, event.clientY, event.ctrlKey, event.shiftKey, event.altKey, event.metaKey, event.button, event.relatedTarget);
    touchEvent.touches = event.touches;
    touchEvent.changedTouches = event.touches;
    touchEvent.targetTouches = event.touches;
    for (k in event) {
      v = event[k];
      touchEvent[k] = v;
    }
    return touchEvent;
  };

  GestureRecognizer.prototype._dispatchEvent = function(type, event, target) {
    var touchEvent, _ref, _ref1;
    touchEvent = this._createEvent(type, event);
    if (target == null) {
      target = (_ref = this.session) != null ? (_ref1 = _ref.startEvent) != null ? _ref1.target : void 0 : void 0;
    }
    if (target == null) {
      target = event.target;
    }
    return target.dispatchEvent(touchEvent);
  };

  GestureRecognizer.prototype._getVelocity = function(events) {
    var current, first, time, velocity;
    if (events.length < 2) {
      return {
        x: 0,
        y: 0
      };
    }
    current = events[events.length - 1];
    first = events[0];
    time = current.time - first.time;
    velocity = {
      x: (current.point.x - first.point.x) / time,
      y: (current.point.y - first.point.y) / time
    };
    if (velocity.x === Infinity) {
      velocity.x = 0;
    }
    if (velocity.y === Infinity) {
      velocity.y = 0;
    }
    return velocity;
  };

  return GestureRecognizer;

})();
