var Player,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Player = (function(_super) {
  __extends(Player, _super);

  Player.prototype._kind = 'Player';

  function Player(properties) {
    this.player = new Element;
    Player.__super__.constructor.apply(this, arguments);
  }

  Player.prototype.play = function() {
    this.player.play();
  };

  Player.prototype.load = function() {
    this.player.load();
  };

  Player.prototype.pause = function() {
    this.player.pause();
  };

  Player.prototype.canPlayType = function(type) {
    return this.player.canPlayType(type);
  };

  Player.prototype.addTextTrack = function(kind, label, language) {
    this._element.addTextTrack(kind, label, language);
  };

  Player.define('video', {
    get: function() {
      return this.player.currentSrc;
    },
    set: function(value) {
      if (this.player.mediaType !== NULL) {
        if (this.player.mediaType === 'video') {
          this.player.src = Utils.parseAsset(value);
          return;
        } else {
          this.player.pause();
          this._element.removeChild(this.player);
        }
      }
      this.player = document.createElement('video');
      this.player.style.overflow = 'hidden';
      this.player.style.display = 'block';
      this.player.style.width = '100%';
      this.player.innerHTML = '';
      this.player.mediaType = 'video';
      this._element.appendChild(this.player);
      this.player.source = document.createElement('source');
      this.player.source.setAttribute('src', Utils.parseAsset(value));
      this.player.appendChild(this.player.source);
      this._updateProperties();
      this.player.element = Event.wrap(this.player).element;
      this.player.on = this.player.addEventListener;
      this.player.off = this.player.removeEventListener;
    }
  });

  Player.define('audio', {
    get: function() {
      return this.player.currentSrc;
    },
    set: function(value) {
      if (this.player.mediaType !== NULL) {
        if (this.player.mediaType === 'audio') {
          this.player.src = Utils.parseAsset(value);
          return;
        } else {
          this.player.pause();
          this._element.removeChild(this.player);
        }
      }
      this.player = document.createElement('audio');
      this.player.style.overflow = 'hidden';
      this.player.style.display = 'block';
      this.player.style.width = '100%';
      this.player.innerHTML = '';
      this.player.mediaType = 'audio';
      this._element.appendChild(this.player);
      this.player.source = document.createElement('source');
      this.player.source.setAttribute('src', Utils.parseAsset(value));
      this.player.appendChild(this.player.source);
      this._updateProperties();
      this.player.element = Event.wrap(this.player).element;
      this.player.on = this.player.addEventListener;
      this.player.off = this.player.removeEventListener;
    }
  });

  Player.define('autoplay', {
    get: function() {
      return this.player.autoplay;
    },
    set: function(value) {
      this._autoplay = value;
      this.player.autoplay = value;
    }
  });

  Player.define('buffered', {
    get: function() {
      return this.player.buffered;
    },
    set: function(value) {
      log('Player: cannot set buffered property.');
    }
  });

  Player.define('controls', {
    get: function() {
      return this.player.controls;
    },
    set: function(value) {
      this._controls = value;
      this.player.controls = value;
    }
  });

  Player.define('currentTime', {
    get: function() {
      return this.player.currentTime;
    },
    set: function(value) {
      this._currentTime = value;
      this.player.currentTime = value;
    }
  });

  Player.define('defaultMuted', {
    get: function() {
      return this.player.defaultMuted;
    },
    set: function(value) {
      this._defaultMuted = value;
      this.player.defaultMuted = value;
    }
  });

  Player.define('defaultPlaybackRate', {
    get: function() {
      return this.player.defaultPlaybackRate;
    },
    set: function(value) {
      this._defaultPlaybackRate = value;
      this.player.defaultPlaybackRate = value;
    }
  });

  Player.define('duration', {
    get: function() {
      return this.player.duration;
    },
    set: function(value) {
      log('Player: cannot set duration property.');
    }
  });

  Player.define('ended', {
    get: function() {
      return this.player.ended;
    },
    set: function(value) {
      log('Player: cannot set ended property.');
    }
  });

  Player.define('loop', {
    get: function() {
      return this._element.loop;
    },
    set: function(value) {
      this._loop = value;
      this.player.loop = value;
    }
  });

  Player.define('mediaGroup', {
    get: function() {
      return this._element.mediaGroup;
    },
    set: function(value) {
      this._mediaGroup = value;
      this.player.mediaGroup = value;
    }
  });

  Player.define('muted', {
    get: function() {
      return this._element.muted;
    },
    set: function(value) {
      this._muted = value;
      this.player.muted = value;
    }
  });

  Player.define('networkState', {
    get: function() {
      return this.player.networkState;
    },
    set: function(value) {
      log('Player: cannot set networkState property.');
    }
  });

  Player.define('paused', {
    get: function() {
      return this.player.paused;
    },
    set: function(value) {
      log('Player: cannot set paused property.');
    }
  });

  Player.define('playbackRate', {
    get: function() {
      return this.player.playbackRate;
    },
    set: function(value) {
      this._playbackRate = value;
      this.player.playbackRate = value;
    }
  });

  Player.define('played', {
    get: function() {
      return this.player.played;
    },
    set: function(value) {
      log('Player: cannot set played property.');
    }
  });

  Player.define('preload', {
    get: function() {
      return this.player.preload;
    },
    set: function(value) {
      this._preload = value;
      this.player.preload = value;
    }
  });

  Player.define('readyState', {
    get: function() {
      return this.player.readyState;
    },
    set: function(value) {
      log('Player: cannot set readyState property.');
    }
  });

  Player.define('seekable', {
    get: function() {
      return this.player.seekable;
    },
    set: function(value) {
      console.log('Player: cannot set seekable property.');
    }
  });

  Player.define('seeking', {
    get: function() {
      return this.player.seeking;
    },
    set: function(value) {
      console.log('Player: cannot set seeking property.');
    }
  });

  Player.define('textTracks', {
    get: function() {
      return this.player.textTracks;
    },
    set: function(value) {
      console.log('Player: cannot set textTracks property.');
    }
  });

  Player.define('volume', {
    get: function() {
      return this.player.volume;
    },
    set: function(value) {
      this._volume = value;
      this.player.volume = value;
    }
  });

  Player.prototype.on = function(eventName, fn) {
    return this.player.on(eventName, fn);
  };

  Player.prototype.off = function(eventName, fn) {
    return this.player.off(eventName, fn);
  };

  Player.prototype.onCanPlay = function(cb) {
    return this.on(Event.CanPlay, cb);
  };

  Player.prototype.onCanPlayThrough = function(cb) {
    return this.on(Event.CanPlayThrough, cb);
  };

  Player.prototype.onDurationChange = function(cb) {
    return this.on(Event.DurationChange, cb);
  };

  Player.prototype.onEmptied = function(cb) {
    return this.on(Event.Emptied, cb);
  };

  Player.prototype.onReachEnd = function(cb) {
    return this.on(Event.ReachEnd, cb);
  };

  Player.prototype.onLoadedData = function(cb) {
    return this.on(Event.LoadedData, cb);
  };

  Player.prototype.onLoadedMetaData = function(cb) {
    return this.on(Event.LoadedMetaData, cb);
  };

  Player.prototype.onLoadStart = function(cb) {
    return this.on(Event.LoadStart, cb);
  };

  Player.prototype.onPause = function(cb) {
    return this.on(Event.Pause, cb);
  };

  Player.prototype.onPlay = function(cb) {
    return this.on(Event.Play, cb);
  };

  Player.prototype.onPlaying = function(cb) {
    return this.on(Event.Playing, cb);
  };

  Player.prototype.onProgress = function(cb) {
    return this.on(Event.Progress, cb);
  };

  Player.prototype.onSpeedChange = function(cb) {
    return this.on(Event.SpeedChange, cb);
  };

  Player.prototype.onSeeked = function(cb) {
    return this.on(Event.Seeked, cb);
  };

  Player.prototype.onSeeking = function(cb) {
    return this.on(Event.Seeking, cb);
  };

  Player.prototype.onStalled = function(cb) {
    return this.on(Event.Stalled, cb);
  };

  Player.prototype.onSuspend = function(cb) {
    return this.on(Event.Suspend, cb);
  };

  Player.prototype.onTimeUpdate = function(cb) {
    return this.on(Event.TimeUpdate, cb);
  };

  Player.prototype.onVolumeChange = function(cb) {
    return this.on(Event.VolumeChange, cb);
  };

  Player.prototype.onWaiting = function(cb) {
    return this.on(Event.Waiting, cb);
  };

  Player.prototype._updateProperties = function() {
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

  return Player;

})(View);
