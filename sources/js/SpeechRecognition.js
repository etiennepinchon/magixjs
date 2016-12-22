var SpeechRecognition,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

if (window.webkitSpeechRecognition) {
  window._SpeechRecognition = window.webkitSpeechRecognition;
}

if (window.SpeechRecognition) {
  window._SpeechRecognition = window.SpeechRecognition;
}

SpeechRecognition = (function(_super) {
  __extends(SpeechRecognition, _super);

  SpeechRecognition.prototype._kind = 'SpeechRecognition';

  SpeechRecognition.prototype.supported = true;

  function SpeechRecognition(str, options) {
    var that;
    if (options == null) {
      options = {};
    }
    that = this;
    if (window._SpeechRecognition === NULL) {
      if (options.unsupported) {
        options.unsupported();
      }
      this.emit(Event.Unsupported);
      this.supported = false;
      log('SpeechRecognition: feature not supported.');
      return false;
    }
    this.recognition = new window._SpeechRecognition();
    if (options.continuous) {
      this.recognition.continuous = options.continuous;
    }
    if (options.interimResults) {
      this.recognition.interimResults = options.interimResults;
    }
    if (options.language) {
      this.recognition.lang = options.language;
    }
    if (options.grammars) {
      this.recognition.grammars = options.grammars;
    }
    if (options.maxAlternatives) {
      this.recognition.maxAlternatives = options.maxAlternatives;
    }
    this.recognition.onaudiostart = function(e) {
      that.emit(Event.AudioStart, e);
    };
    this.recognition.onaudioend = function(e) {
      that.emit(Event.AudioEnd, e);
    };
    this.recognition.onend = function(e) {
      that.emit(Event.End, e);
    };
    this.recognition.onerror = function(e) {
      that.emit(Event.Error, e);
    };
    this.recognition.onstart = function(e) {
      that.emit(Event.Start, e);
    };
    this.recognition.onnomatch = function(e) {
      that.emit(Event.NoMatch, e);
    };
    this.recognition.onresult = function(e) {
      that.emit(Event.Result, e);
    };
    this.recognition.onsoundstart = function(e) {
      that.emit(Event.SoundStart, e);
    };
    this.recognition.onsoundend = function(e) {
      that.emit(Event.SoundEnd, e);
    };
    this.recognition.onspeechstart = function(e) {
      that.emit(Event.SpeechStart, e);
    };
    this.recognition.onspeechend = function(e) {
      that.emit(Event.SpeechEnd, e);
    };
  }

  SpeechRecognition.prototype.abort = function() {
    this.recognition.abort();
  };

  SpeechRecognition.prototype.start = function() {
    this.recognition.start();
  };

  SpeechRecognition.prototype.stop = function() {
    this.recognition.stop();
  };

  SpeechRecognition.prototype.onUnsupported = function(cb) {
    this.on(Event.Unsupported, cb);
  };

  SpeechRecognition.prototype.onAudioStart = function(cb) {
    this.on(Event.AudioStart, cb);
  };

  SpeechRecognition.prototype.onAudioEnd = function(cb) {
    this.on(Event.AudioEnd, cb);
  };

  SpeechRecognition.prototype.onNoMatch = function(cb) {
    this.on(Event.NoMatch, cb);
  };

  SpeechRecognition.prototype.onResult = function(cb) {
    this.on(Event.Result, cb);
  };

  SpeechRecognition.prototype.onSoundStart = function(cb) {
    this.on(Event.SoundStart, cb);
  };

  SpeechRecognition.prototype.onSoundEnd = function(cb) {
    this.on(Event.SoundEnd, cb);
  };

  SpeechRecognition.prototype.onSpeechStart = function(cb) {
    this.on(Event.SpeechStart, cb);
  };

  SpeechRecognition.prototype.onSpeechEnd = function(cb) {
    this.on(Event.SpeechEnd, cb);
  };

  SpeechRecognition.prototype.onEnd = function(cb) {
    this.on(Event.End, cb);
  };

  SpeechRecognition.prototype.onError = function(cb) {
    this.on(Event.Error, cb);
  };

  SpeechRecognition.prototype.onStart = function(cb) {
    this.on(Event.Start, cb);
  };

  return SpeechRecognition;

})(Element);
