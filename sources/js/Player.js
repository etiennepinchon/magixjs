var Pview,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Pview = (function(_super) {
  __extends(Pview, _super);

  Pview.prototype._kind = 'Pview';

  function Pview(properties) {
    this.pview = new Object;
    Pview.__super__.constructor.apply(this, arguments);
  }

  Pview.prototype.play = function() {
    this.pview.play();
  };

  Pview.prototype.load = function() {
    this.pview.load();
  };

  Pview.prototype.pause = function() {
    this.pview.pause();
  };

  Pview.prototype.canPlayType = function(type) {
    return this.pview.canPlayType(type);
  };

  Pview.prototype.addTextTrack = function(kind, label, language) {
    this._element.addTextTrack(kind, label, language);
  };

  Pview.define('video', {
    get: function() {
      return this.pview.currentSrc;
    },
    set: function(value) {
      if (this.pview.mediaType !== NULL) {
        if (this.pview.mediaType === 'video') {
          this.pview.src = Utils.parseAsset(value);
          return;
        } else {
          this.pview.pause();
          this._element.removeChild(this.pview);
        }
      }
      this.pview = document.createElement('video');
      this.pview.style.overflow = 'hidden';
      this.pview.style.display = 'block';
      this.pview.style.width = '100%';
      this.pview.innerHTML = '';
      this.pview.mediaType = 'video';
      this._element.appendChild(this.pview);
      this.pview.source = document.createElement('source');
      this.pview.source.setAttribute('src', Utils.parseAsset(value));
      this.pview.appendChild(this.pview.source);
      this._updateProperties();
      this.pview.element = Event.wrap(this.pview).element;
      this.pview.on = this.pview.addEventListener;
      this.pview.off = this.pview.removeEventListener;
    }
  });

  Pview.define('audio', {
    get: function() {
      return this.pview.currentSrc;
    },
    set: function(value) {
      if (this.pview.mediaType !== NULL) {
        if (this.pview.mediaType === 'audio') {
          this.pview.src = Utils.parseAsset(value);
          return;
        } else {
          this.pview.pause();
          this._element.removeChild(this.pview);
        }
      }
      this.pview = document.createElement('audio');
      this.pview.style.overflow = 'hidden';
      this.pview.style.display = 'block';
      this.pview.style.width = '100%';
      this.pview.innerHTML = '';
      this.pview.mediaType = 'audio';
      this._element.appendChild(this.pview);
      this.pview.source = document.createElement('source');
      this.pview.source.setAttribute('src', Utils.parseAsset(value));
      this.pview.appendChild(this.pview.source);
      this._updateProperties();
      this.pview.element = Event.wrap(this.pview).element;
      this.pview.on = this.pview.addEventListener;
      this.pview.off = this.pview.removeEventListener;
    }
  });

  Pview.define('autoplay', {
    get: function() {
      return this.pview.autoplay;
    },
    set: function(value) {
      this._autoplay = value;
      this.pview.autoplay = value;
    }
  });

  Pview.define('buffered', {
    get: function() {
      return this.pview.buffered;
    },
    set: function(value) {
      log('Pview: cannot set buffered property.');
    }
  });

  Pview.define('controls', {
    get: function() {
      return this.pview.controls;
    },
    set: function(value) {
      this._controls = value;
      this.pview.controls = value;
    }
  });

  Pview.define('currentTime', {
    get: function() {
      return this.pview.currentTime;
    },
    set: function(value) {
      this._currentTime = value;
      this.pview.currentTime = value;
    }
  });

  Pview.define('defaultMuted', {
    get: function() {
      return this.pview.defaultMuted;
    },
    set: function(value) {
      this._defaultMuted = value;
      this.pview.defaultMuted = value;
    }
  });

  Pview.define('defaultPlaybackRate', {
    get: function() {
      return this.pview.defaultPlaybackRate;
    },
    set: function(value) {
      this._defaultPlaybackRate = value;
      this.pview.defaultPlaybackRate = value;
    }
  });

  Pview.define('duration', {
    get: function() {
      return this.pview.duration;
    },
    set: function(value) {
      log('Pview: cannot set duration property.');
    }
  });

  Pview.define('ended', {
    get: function() {
      return this.pview.ended;
    },
    set: function(value) {
      log('Pview: cannot set ended property.');
    }
  });

  Pview.define('loop', {
    get: function() {
      return this._element.loop;
    },
    set: function(value) {
      this._loop = value;
      this.pview.loop = value;
    }
  });

  Pview.define('mediaGroup', {
    get: function() {
      return this._element.mediaGroup;
    },
    set: function(value) {
      this._mediaGroup = value;
      this.pview.mediaGroup = value;
    }
  });

  Pview.define('muted', {
    get: function() {
      return this._element.muted;
    },
    set: function(value) {
      this._muted = value;
      this.pview.muted = value;
    }
  });

  Pview.define('networkState', {
    get: function() {
      return this.pview.networkState;
    },
    set: function(value) {
      log('Pview: cannot set networkState property.');
    }
  });

  Pview.define('paused', {
    get: function() {
      return this.pview.paused;
    },
    set: function(value) {
      log('Pview: cannot set paused property.');
    }
  });

  Pview.define('playbackRate', {
    get: function() {
      return this.pview.playbackRate;
    },
    set: function(value) {
      this._playbackRate = value;
      this.pview.playbackRate = value;
    }
  });

  Pview.define('played', {
    get: function() {
      return this.pview.played;
    },
    set: function(value) {
      log('Pview: cannot set played property.');
    }
  });

  Pview.define('preload', {
    get: function() {
      return this.pview.preload;
    },
    set: function(value) {
      this._preload = value;
      this.pview.preload = value;
    }
  });

  Pview.define('readyState', {
    get: function() {
      return this.pview.readyState;
    },
    set: function(value) {
      log('Pview: cannot set readyState property.');
    }
  });

  Pview.define('seekable', {
    get: function() {
      return this.pview.seekable;
    },
    set: function(value) {
      console.log('Pview: cannot set seekable property.');
    }
  });

  Pview.define('seeking', {
    get: function() {
      return this.pview.seeking;
    },
    set: function(value) {
      console.log('Pview: cannot set seeking property.');
    }
  });

  Pview.define('textTracks', {
    get: function() {
      return this.pview.textTracks;
    },
    set: function(value) {
      console.log('Pview: cannot set textTracks property.');
    }
  });

  Pview.define('volume', {
    get: function() {
      return this.pview.volume;
    },
    set: function(value) {
      this._volume = value;
      this.pview.volume = value;
    }
  });

  Pview.prototype.on = function(eventName, fn) {
    return this.pview.on(eventName, fn);
  };

  Pview.prototype.off = function(eventName, fn) {
    return this.pview.off(eventName, fn);
  };

  Pview.prototype.onCanPlay = function(cb) {
    return this.on(Event.CanPlay, cb);
  };

  Pview.prototype.onCanPlayThrough = function(cb) {
    return this.on(Event.CanPlayThrough, cb);
  };

  Pview.prototype.onDurationChange = function(cb) {
    return this.on(Event.DurationChange, cb);
  };

  Pview.prototype.onEmptied = function(cb) {
    return this.on(Event.Emptied, cb);
  };

  Pview.prototype.onReachEnd = function(cb) {
    return this.on(Event.ReachEnd, cb);
  };

  Pview.prototype.onLoadedData = function(cb) {
    return this.on(Event.LoadedData, cb);
  };

  Pview.prototype.onLoadedMetaData = function(cb) {
    return this.on(Event.LoadedMetaData, cb);
  };

  Pview.prototype.onLoadStart = function(cb) {
    return this.on(Event.LoadStart, cb);
  };

  Pview.prototype.onPause = function(cb) {
    return this.on(Event.Pause, cb);
  };

  Pview.prototype.onPlay = function(cb) {
    return this.on(Event.Play, cb);
  };

  Pview.prototype.onPlaying = function(cb) {
    return this.on(Event.Playing, cb);
  };

  Pview.prototype.onProgress = function(cb) {
    return this.on(Event.Progress, cb);
  };

  Pview.prototype.onSpeedChange = function(cb) {
    return this.on(Event.SpeedChange, cb);
  };

  Pview.prototype.onSeeked = function(cb) {
    return this.on(Event.Seeked, cb);
  };

  Pview.prototype.onSeeking = function(cb) {
    return this.on(Event.Seeking, cb);
  };

  Pview.prototype.onStalled = function(cb) {
    return this.on(Event.Stalled, cb);
  };

  Pview.prototype.onSuspend = function(cb) {
    return this.on(Event.Suspend, cb);
  };

  Pview.prototype.onTimeUpdate = function(cb) {
    return this.on(Event.TimeUpdate, cb);
  };

  Pview.prototype.onVolumeChange = function(cb) {
    return this.on(Event.VolumeChange, cb);
  };

  Pview.prototype.onWaiting = function(cb) {
    return this.on(Event.Waiting, cb);
  };

  Pview._updateProperties = function() {
    if (this._autoplay !== NULL) {
      this.autoplay = this._autoplay;
    }
    if (this._controls !== NULL) {
      this.controls = this._controls;
    }
    if (this._currentTime !== NULL) {
      this.currentTime = this._currentTime;
    }
    if (this._defaultMuted !== NULL) {
      this.defaultMuted = this._defaultMuted;
    }
    if (this._defaultPlaybackRate !== NULL) {
      this.defaultPlaybackRate = this._defaultPlaybackRate;
    }
    if (this._loop !== NULL) {
      this.loop = this._loop;
    }
    if (this._mediaGroup !== NULL) {
      this.mediaGroup = this._mediaGroup;
    }
    if (this._muted !== NULL) {
      this.muted = this._muted;
    }
    if (this._playbackRate !== NULL) {
      this.playbackRate = this._playbackRate;
    }
    if (this._preload !== NULL) {
      this.preload = this._preload;
    }
    if (this._volume !== NULL) {
      this.volume = this._volume;
    }
  };

  return Pview;

})(View);
