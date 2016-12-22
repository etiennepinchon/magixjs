var Capture,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Capture = (function(_super) {
  __extends(Capture, _super);

  Capture.prototype._kind = 'Capture';

  Capture.prototype.supported = true;

  function Capture(options) {
    var constraints, promisifiedOldGUM, that;
    if (options == null) {
      options = {};
    }
    that = this;
    promisifiedOldGUM = function(constraints, successCallback, errorCallback) {
      var getUserMedia;
      getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
      if (!getUserMedia) {
        if (options.unsupported) {
          options.unsupported();
        }
        that.emit(Event.Unsupported);
        that.supported = false;
        log('Capture: feature not supported.');
        if (options.unsupported) {
          options.unsupported();
        }
        return false;
      }
      return new Promise(function(successCallback, errorCallback) {
        getUserMedia.call(navigator, constraints, successCallback, errorCallback);
      });
    };
    if (navigator.mediaDevices === void 0) {
      navigator.mediaDevices = {};
    }
    if (navigator.mediaDevices.getUserMedia === void 0) {
      if (promisifiedOldGUM) {
        navigator.mediaDevices.getUserMedia = promisifiedOldGUM;
      }
    }
    if (options.video === NULL) {
      options.video = false;
    }
    if (options.audio === NULL) {
      options.audio = false;
    }
    constraints = {
      audio: options.audio,
      video: options.video
    };
    navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
      if (options.success !== void 0) {
        options.success(window.URL.createObjectURL(stream));
      }
    })["catch"](function(err) {
      if (options.error !== void 0) {
        options.error(err);
      }
    });
    return;
  }

  return Capture;

})(Element);


/*
Example:
myPlayer = new Player
	width: 720
	height: 720

myCapture = new Capture
	video: true
	audio: true
	success: (stream) ->
		myPlayer.video = stream
		myPlayer.play()
	error: ->
		console.log 'err'
 */
