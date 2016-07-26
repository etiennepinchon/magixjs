var DOMEventManager, DOMEventManagerElement, EventManagerIdCounter,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

DOMEventManagerElement = (function(_super) {
  __extends(DOMEventManagerElement, _super);

  function DOMEventManagerElement(element) {
    this.element = element;
  }

  DOMEventManagerElement.prototype.addListener = function(eventName, listener, capture) {
    if (capture == null) {
      capture = false;
    }
    DOMEventManagerElement.__super__.addListener.call(this, eventName, listener);
    return this.element.addEventListener(eventName, listener, false);
  };

  DOMEventManagerElement.prototype.removeListener = function(eventName, listener) {
    DOMEventManagerElement.__super__.removeListener.call(this, eventName, listener);
    return this.element.removeEventListener(eventName, listener, false);
  };

  DOMEventManagerElement.prototype.addEventListener = DOMEventManagerElement.prototype.addListener;

  DOMEventManagerElement.prototype.removeEventListener = DOMEventManagerElement.prototype.removeListener;

  return DOMEventManagerElement;

})(EventEmitter);

EventManagerIdCounter = 0;

DOMEventManager = (function() {
  function DOMEventManager(element) {
    this.wrap = __bind(this.wrap, this);
    this._elements = {};
  }

  DOMEventManager.prototype.wrap = function(element) {
    if (!element._eventManagerId) {
      element._eventManagerId = EventManagerIdCounter++;
    }
    if (!this._elements[element._eventManagerId]) {
      this._elements[element._eventManagerId] = new DOMEventManagerElement(element);
    }
    return this._elements[element._eventManagerId];
  };

  DOMEventManager.prototype.reset = function() {
    var element, elementEventManager, _ref, _results;
    _ref = this._elements;
    _results = [];
    for (element in _ref) {
      elementEventManager = _ref[element];
      _results.push(elementEventManager.removeAllListeners());
    }
    return _results;
  };

  return DOMEventManager;

})();
