
/*
	Example:
	myPlayer = new Player
		video: '/assets/images/demo.mp4'
		parent : @

	myPlayer.onTimeUpdate, (e)->
		console.log e

	myPlayer.play()
 */
var Player,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Player = (function(_super) {
  __extends(Player, _super);

  function Player(properties) {
    this.player = new Object;
    Player.__super__.constructor.apply(this, arguments);
  }

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

  Player.prototype._kind = 'Player';

  Player.define('video', {
    get: function() {
      return this.player.currentSrc;
    },
    set: function(value) {
      if (this.player.mediaType !== void 0) {
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
      if (this.player.mediaType !== void 0) {
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


  /*
  		The buffered property returns a TimeRanges object.
  
  		The TimeRanges object represents the user's buffered ranges of the audio/video.
  
  		A buffered range is a time-range of buffered audio/video. The user gets several buffered ranges if he/she skips in the audio/video.
  
  		Note: This property is read-only.
  
  		Return Value:
  			TimeRanges Object	Represents the buffered parts of the audio/video.
  
  			TimeRanges Object Properties:
  			length - get the number of buffered ranges in the audio/video
  			start(index) - get the start position of a buffered range
  			end(index) - get the end position of a buffered range
  
  		See more: http://www.w3schools.com/tags/av_prop_buffered.asp
   */

  Player.define('buffered', {
    get: function() {
      return this.player.buffered;
    },
    set: function(value) {
      console.log('Player: cannot set buffered property.');
    }
  });


  /*
  		The controls property sets or returns whether the browser should display standard audio/video controls.
  
  		Standard audio/video controls should include:
  
  		Play
  		Pause
  		Seeking
  		Volume
  		Fullscreen toggle (for video)
  		Captions/Subtitles (when available)
  		Track (when available)
  
  		Retrun a Boolean, returns true if the controls are displayed, otherwise it returns false
   */

  Player.define('controls', {
    get: function() {
      return this.player.controls;
    },
    set: function(value) {
      this._controls = value;
      this.player.controls = value;
    }
  });


  /*
  		The currentTime property sets or returns the current position (in seconds) of the audio/video playback.
  		When setting this property, the playback will jump to the specified position.
  
  		Ex: vid.currentTime = 5;
   */

  Player.define('currentTime', {
    get: function() {
      return this.player.currentTime;
    },
    set: function(value) {
      this._currentTime = value;
      this.player.currentTime = value;
    }
  });


  /*
  		The defaultMuted property sets or returns whether the audio/video should be muted by default.
  		Setting this property will only change the default muted state, not the current. To change the current muted state, use the muted property.
  
  		Ex: vid.defaultMuted = true;
   */

  Player.define('defaultMuted', {
    get: function() {
      return this.player.defaultMuted;
    },
    set: function(value) {
      this._defaultMuted = value;
      this.player.defaultMuted = value;
    }
  });


  /*
  		The defaultPlaybackRate property sets or returns the default playback speed of the audio/video.
  
  		Setting this property will only change the default playback speed, not the current. To change the current playback speed, use the playbackRate property.
   */

  Player.define('defaultPlaybackRate', {
    get: function() {
      return this.player.defaultPlaybackRate;
    },
    set: function(value) {
      this._defaultPlaybackRate = value;
      this.player.defaultPlaybackRate = value;
    }
  });


  /*
  		The duration property returns the length of the current audio/video, in seconds.
  
  		If no audio/video is set, NaN (Not-a-Number) is returned.
  
  		Note: This property is read-only.
   */

  Player.define('duration', {
    get: function() {
      return this.player.duration;
    },
    set: function(value) {
      console.log('Player: cannot set duration property.');
    }
  });


  /*
  		The ended property returns whether the playback of the audio/video has ended.
  
  		An audio/video has ended when the playback position is at the end of the audio/video.
  
  		Note: This property is read-only.
   */

  Player.define('ended', {
    get: function() {
      return this.player.ended;
    },
    set: function(value) {
      console.log('Player: cannot set ended property.');
    }
  });


  /*
  		The loop property sets or returns whether the audio/video should start playing over again when it is finished.
  
  		Default false. Indicates that the audio/video should NOT start playing again when it is finished
   */

  Player.define('loop', {
    get: function() {
      return this._element.loop;
    },
    set: function(value) {
      this._loop = value;
      this.player.loop = value;
    }
  });


  /*
  		The mediaGroup property sets or returns the name of the media group the audio/video is a part of.
  
  		A media group allow 2 or more audio/video elements to be kept synchronized.
  
  		See more: http://www.w3schools.com/tags/av_prop_mediagroup.asp
  
  		Ex: vid1.mediaGroup = "test";
  			vid2.mediaGroup = "test";
   */

  Player.define('mediaGroup', {
    get: function() {
      return this._element.mediaGroup;
    },
    set: function(value) {
      this._mediaGroup = value;
      this.player.mediaGroup = value;
    }
  });


  /*
  		The muted property sets or returns whether the audio/video should be muted (sound turned off).
   */

  Player.define('muted', {
    get: function() {
      return this._element.muted;
    },
    set: function(value) {
      this._muted = value;
      this.player.muted = value;
    }
  });


  /*
  		The networkState property returns the current network state (activity) of the audio/video.
  
  		Return Value:
  
  			Number	Represents the current network state of the audio/video element:
  			0 = NETWORK_EMPTY - audio/video has not yet been initialized
  			1 = NETWORK_IDLE - audio/video is active and has selected a resource, but is not using the network
  			2 = NETWORK_LOADING - browser is downloading data
  			3 = NETWORK_NO_SOURCE - no audio/video source found
  
  		Note: This property is read-only.
   */

  Player.define('networkState', {
    get: function() {
      return this.player.networkState;
    },
    set: function(value) {
      console.log('Player: cannot set networkState property.');
    }
  });


  /*
  		The paused property returns whether the audio/video is paused.
  
  		Note: This property is read-only.
   */

  Player.define('paused', {
    get: function() {
      return this.player.paused;
    },
    set: function(value) {
      console.log('Player: cannot set paused property.');
    }
  });


  /*
  		The playbackRate property sets or returns the current playback speed of the audio/video.
  
  		Property Values:
  			playbackspeed	Indicates the current playback speed of the audio/video.
  		
  		Example values:
  			1.0 is normal speed
  			0.5 is half speed (slower)
  			2.0 is double speed (faster)
  			-1.0 is backwards, normal speed
  			-0.5 is backwards, half speed
  
  		Return Value:	Number, the current playback speed
  		Default Value:	1.0
   */

  Player.define('playbackRate', {
    get: function() {
      return this.player.playbackRate;
    },
    set: function(value) {
      this._playbackRate = value;
      this.player.playbackRate = value;
    }
  });


  /*
  		The played property returns a TimeRanges object.
  
  		The TimeRanges object represents ranges of the audio/video that has already been played (seen) by the user.
  
  		A played range is a time-range of played audio/video. The user gets several played ranges if he/she skips in the audio/video.
  
  		Note: This property is read-only.
  
  		Return Value:
  			TimeRanges Object	Represents the played parts of the audio/video.
  		
  		TimeRanges Object Properties:
  
  			length - get the number of played ranges in the audio/video
  			start(index) - get the start position of a played range
  			end(index) - get the end position of a played range
  			Note: The first played range is index 0
  
  		Ex: alert("Start: " + vid.played.start(0) + " End: " + vid.played.end(0));
  
  		See more: http://www.w3schools.com/tags/av_prop_played.asp
   */

  Player.define('played', {
    get: function() {
      return this.player.played;
    },
    set: function(value) {
      console.log('Player: cannot set played property.');
    }
  });


  /*
  		The preload property sets or returns whether the audio/video should start loading as soon as the page loads.
  		The preload property allows the author to provide a hint to the browser about what he/she thinks will lead to the best user experience. This attribute may be ignored in some instances.
  
  		Property Values
  			Value	Description
  			auto	Indicates that the audio/video should start loading as soon as the page loads
  			metadata	Indicates that only the metadata for the audio/video should be loaded when the page loads
  			none	Indicates that the audio/video should NOT start loading as soon as the page loads
  
  		Return Value:	A String, representing what data should be preloaded (if any). Possible return values are "auto", "metadata", or "none". See "Property Values" for what the values mean
  
  		Ex: vid.preload = "auto";
  
  		See more: http://www.w3schools.com/tags/av_prop_preload.asp
   */

  Player.define('preload', {
    get: function() {
      return this.player.preload;
    },
    set: function(value) {
      this._preload = value;
      this.player.preload = value;
    }
  });


  /*
  		The readyState property returns the current ready state of the audio/video.
  
  		The ready state indicates if the audio/video is ready to play or not.
  
  		Note: This property is read-only.
  
  		Return Value:
  			Number	Represents the ready state of the audio/video element:
  			0 = HAVE_NOTHING - no information whether or not the audio/video is ready
  			1 = HAVE_METADATA - metadata for the audio/video is ready
  			2 = HAVE_CURRENT_DATA - data for the current playback position is available, but not enough data to play next frame/millisecond
  			3 = HAVE_FUTURE_DATA - data for the current and at least the next frame is available
  			4 = HAVE_ENOUGH_DATA - enough data available to start playing
  		
  		Ex: alert(vid.readyState);
   */

  Player.define('readyState', {
    get: function() {
      return this.player.readyState;
    },
    set: function(value) {
      console.log('Player: cannot set readyState property.');
    }
  });


  /*
  		The seekable property returns a TimeRanges object.
  
  		The TimeRanges object represents ranges of the audio/video that are available for seeking for user.
  
  		A seekable range is a time-range of audio/video where the user can seek (move playback position) to.
  
  		For non-streaming videos it is often possible to seek anywhere in the video even before it has been buffered.
  
  		Note: This property is read-only.
  
  		Return Value:
  			TimeRanges Object	Represents the seekable parts of the audio/video.
  		
  		TimeRanges Object Properties:
  			length - get the number of seekable ranges in the audio/video
  			start(index) - get the start position of a seekable range
  			end(index) - get the end position of a seekable range
  			Note: The first seekable range is index 0
  		
  		Ex: alert("Start: " + vid.seekable.start(0) + " End: " + vid.seekable.end(0));
  
  		See more: http://www.w3schools.com/tags/av_prop_seekable.asp
   */

  Player.define('seekable', {
    get: function() {
      return this.player.seekable;
    },
    set: function(value) {
      console.log('Player: cannot set seekable property.');
    }
  });


  /*
  		The seeking property returns whether the user is currently seeking in the audio/video.
  		Seeking is when you move/skip to a new position in the audio/video.
  
  		Note: This property is read-only.
   */

  Player.define('seeking', {
    get: function() {
      return this.player.seeking;
    },
    set: function(value) {
      console.log('Player: cannot set seeking property.');
    }
  });


  /*
  		The textTracks property returns a TextTrackList object.
  		The TextTrackList object represents the available text tracks for the audio/video.
  		Each available text track is represented by an TextTrack Object.
  
  		Note: This property is read-only.
  		
  		// Get the number of available text tracks
  		Ex: alert(vid.textTracks.length);
  		
  		Return Value
  			TextTrackList Object	Represents the available text tracks for the the audio/video.
  			TextTrack Object	Represents an text track.
  
  		TextTrackList Object:
  
  			length - get the number of text tracks available in the audio/video
  			[index] - get TextTrack object by index
  			Note: The first available TextTrack object is index 0
  
  		TextTrack Object Properties:
  
  			kind - get the type of the text track (can be: "subtitles", "caption", "descriptions", "chapters", or "metadata")
  			label - get the label of the text track
  			language - get the language of the text track
  			mode - get or set if the track is active ("disabled"|"hidden"|"showing")
  			cues - get a list of cues as a TextTrackCueList object
  			activeCues - get the currently active text track cues as a TextTrackCueList object
  			addCue(cue) - add a cue to the list of cues
  			removeCue(cue) - remove a cue from the list of cues
  
  		See more: http://www.w3schools.com/tags/av_prop_texttracks.asp
   */

  Player.define('textTracks', {
    get: function() {
      return this.player.textTracks;
    },
    set: function(value) {
      console.log('Player: cannot set textTracks property.');
    }
  });


  /*
  		The volume property sets or returns the current volume of the audio/video.
  
  		Ex: vid.volume = 0.2;
  
  		See more: http://www.w3schools.com/tags/av_prop_volume.asp
   */

  Player.define('volume', {
    get: function() {
      return this.player.volume;
    },
    set: function(value) {
      this._volume = value;
      this.player.volume = value;
    }
  });

  return Player;

})(View);

Player.prototype.play = function() {
  this.player.play();
};

Player.prototype.load = function() {
  this.player.load();
};

Player.prototype.pause = function() {
  this.player.pause();
};


/*
	type	Specifies the audio/video type (and optional codecs) to test support for.
	Common values:
	video/ogg
	video/mp4
	video/webm
	audio/mpeg
	audio/ogg
	audio/mp4

	Common values, including codecs:
	video/ogg; codecs="theora, vorbis"
	video/mp4; codecs="avc1.4D401E, mp4a.40.2"
	video/webm; codecs="vp8.0, vorbis"
	audio/ogg; codecs="vorbis"
	audio/mp4; codecs="mp4a.40.5"
	Note: This method can only return "probably" if codecs are included.

	Return Value:	A String, representing the level of support. Possible return values:
	"probably" - most likely support
	"maybe" - might support
	"" - (empty string) no support
 */

Player.prototype.canPlayType = function(type) {
  return this.player.canPlayType(type);
};


/*
	Parameter Values
	kind	Specifies the kind of text track.
	Possible values:

	"subtitles"
	"caption"
	"descriptions"
	"chapters"
	"metadata"

	label	A string specifying the label for the text track. Is used to identify the text track for the users

	language	A two-letter language code that specifies the language of the text track.

	More info: http://www.w3schools.com/tags/av_met_addtexttrack.asp
 */

Player.prototype.addTextTrack = function(kind, label, language) {
  this._element.addTextTrack(kind, label, language);
};

Player.prototype._updateProperties = function() {
  if (this._autoplay !== void 0) {
    this.autoplay = this._autoplay;
  }
  if (this._controls !== void 0) {
    this.controls = this._controls;
  }
  if (this._currentTime !== void 0) {
    this.currentTime = this._currentTime;
  }
  if (this._defaultMuted !== void 0) {
    this.defaultMuted = this._defaultMuted;
  }
  if (this._defaultPlaybackRate !== void 0) {
    this.defaultPlaybackRate = this._defaultPlaybackRate;
  }
  if (this._loop !== void 0) {
    this.loop = this._loop;
  }
  if (this._mediaGroup !== void 0) {
    this.mediaGroup = this._mediaGroup;
  }
  if (this._muted !== void 0) {
    this.muted = this._muted;
  }
  if (this._playbackRate !== void 0) {
    this.playbackRate = this._playbackRate;
  }
  if (this._preload !== void 0) {
    this.preload = this._preload;
  }
  if (this._volume !== void 0) {
    this.volume = this._volume;
  }
};
