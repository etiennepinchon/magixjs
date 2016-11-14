var Say, say,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Say = (function(_super) {
  __extends(Say, _super);

  Say.prototype._kind = 'Say';

  function Say(str, options) {
    var i, that, voice, voices, _i, _j, _len, _len1;
    if (options == null) {
      options = {};
    }
    Say.__super__.constructor.apply(this, arguments);
    if (!window.speechSynthesis) {
      if (options.unsupported) {
        options.unsupported();
      }
      this.emit(Event.Unsupported);
      log('Say: feature not supported.');
      return false;
    }
    this.message = new SpeechSynthesisUtterance();
    voices = Say.getVoicesAvailable();
    if (options.voice) {
      for (_i = 0, _len = voices.length; _i < _len; _i++) {
        voice = voices[_i];
        if (voice.name === options.voice) {
          this.message.voice = voice;
        }
      }
    } else if (options.voiceID) {
      i = 0;
      for (_j = 0, _len1 = voices.length; _j < _len1; _j++) {
        voice = voices[_j];
        if (options.voiceID === i) {
          this.message.voice = voice;
        }
        i++;
      }
    }
    that = this;
    this.message.voiceURI = 'native';
    if (options.volume) {
      this.message.volume = options.volume;
    }
    if (options.rate) {
      this.message.rate = options.rate;
    }
    if (options.pitch) {
      this.message.pitch = options.pitch;
    }
    if (str) {
      this.message.text = str;
    }
    if (options.language) {
      this.message.lang = options.language;
    }
    this.message.onboundary = function(e) {
      that.emit(Event.Boundary, e);
    };
    this.message.onend = function(e) {
      that.emit(Event.End, e);
    };
    this.message.onerror = function(e) {
      that.emit(Event.Error, e);
    };
    this.message.onmark = function(e) {
      that.emit(Event.Mark, e);
    };
    this.message.onpause = function(e) {
      that.emit(Event.Pause, e);
    };
    this.message.onresume = function(e) {
      that.emit(Event.Resume, e);
    };
    this.message.onstart = function(e) {
      that.emit(Event.Start, e);
    };
    if (options.auto !== false) {
      speechSynthesis.speak(this.message);
    }
  }

  Say.prototype.speak = function() {
    if (this.message) {
      window.speechSynthesis.speak(this.message);
    }
  };

  Say.prototype.pause = function() {
    window.speechSynthesis.pause();
  };

  Say.prototype.resume = function() {
    window.speechSynthesis.resume();
  };

  Say.prototype.cancel = function() {
    window.speechSynthesis.cancel();
  };

  Say.getVoicesAvailable = function() {
    return window.speechSynthesis.getVoices();
  };

  Say.getVoicesNameAvailable = function() {
    var voice, voice_name, voices, _i, _len;
    voices = window.speechSynthesis.getVoices();
    voice_name = [];
    for (_i = 0, _len = voices.length; _i < _len; _i++) {
      voice = voices[_i];
      voice_name.push(voice.name);
    }
    return voice_name;
  };

  Say.prototype.onUnsupported = function(cb) {
    this.on(Event.Unsupported, cb);
  };

  Say.prototype.onBoundary = function(cb) {
    this.on(Event.Boundary, cb);
  };

  Say.prototype.onEnd = function(cb) {
    this.on(Event.End, cb);
  };

  Say.prototype.onError = function(cb) {
    this.on(Event.Error, cb);
  };

  Say.prototype.onMark = function(cb) {
    this.on(Event.Mark, cb);
  };

  Say.prototype.onPause = function(cb) {
    this.on(Event.Pause, cb);
  };

  Say.prototype.onResume = function(cb) {
    this.on(Event.Resume, cb);
  };

  Say.prototype.onStart = function(cb) {
    this.on(Event.Start, cb);
  };

  return Say;

})(Element);

say = Say;
