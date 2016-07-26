# *********************************
# *********************************
# Player
# *********************************
# ** By Etienne Pinchon
# ** ©2016

###
	Example:
	myPlayer = new Player
		video: '/assets/images/demo.mp4'
		parent : @

	myPlayer.onTimeUpdate, (e)->
		console.log e

	myPlayer.play()
###

class Player extends View
	constructor: (properties) ->

		@player = new Object

		super
	
	on : (eventName, fn) -> @player.on eventName, fn
	off : (eventName, fn) -> @player.off eventName, fn

	onCanPlay: (cb) -> @on Event.CanPlay, cb
	onCanPlayThrough: (cb) -> @on Event.CanPlayThrough, cb
	onDurationChange: (cb) -> @on Event.DurationChange, cb
	onEmptied: (cb) -> @on Event.Emptied, cb
	onReachEnd: (cb) -> @on Event.ReachEnd, cb
	onLoadedData: (cb) -> @on Event.LoadedData, cb
	onLoadedMetaData: (cb) -> @on Event.LoadedMetaData, cb
	onLoadStart: (cb) -> @on Event.LoadStart, cb
	onPause: (cb) -> @on Event.Pause, cb
	onPlay: (cb) -> @on Event.Play, cb
	onPlaying: (cb) -> @on Event.Playing, cb
	onProgress: (cb) -> @on Event.Progress, cb
	onSpeedChange: (cb) -> @on Event.SpeedChange, cb
	onSeeked: (cb) -> @on Event.Seeked, cb
	onSeeking: (cb) -> @on Event.Seeking, cb
	onStalled: (cb) -> @on Event.Stalled, cb
	onSuspend: (cb) -> @on Event.Suspend, cb
	onTimeUpdate: (cb) -> @on Event.TimeUpdate, cb
	onVolumeChange: (cb) -> @on Event.VolumeChange, cb
	onWaiting: (cb) -> @on Event.Waiting, cb

	_kind : 'Player'

	##############################################################
	# Properties


	@define 'video',
		get: ->
			@player.currentSrc
		set: (value) ->
			# If player already defined
			if @player.mediaType isnt undefined
				if @player.mediaType is 'video'
					# Change source
					@player.src = Utils.parseAsset(value)
					return
				else
					# Remove player element
					@player.pause()
					@_element.removeChild @player

			@player = document.createElement('video')
			@player.style.overflow = 'hidden'
			@player.style.display = 'block'
			@player.style.width = '100%'
			@player.innerHTML = ''
			@player.mediaType = 'video'
			@_element.appendChild @player

			# Add source
			@player.source = document.createElement('source')
			@player.source.setAttribute 'src', Utils.parseAsset(value)
			@player.appendChild @player.source
			@_updateProperties()

			# Wrap events
			@player.element = Event.wrap(@player).element
			@player.on = @player.addEventListener
			@player.off = @player.removeEventListener
			
			return


	@define 'audio',
		get: ->
			@player.currentSrc
		set: (value) ->
			# If player already defined
			if @player.mediaType isnt undefined
				if @player.mediaType is 'audio'
					# Change source
					@player.src = Utils.parseAsset(value)
					return
				else
					# Remove player element
					@player.pause()
					@_element.removeChild @player

			@player = document.createElement('audio')
			@player.style.overflow = 'hidden'
			@player.style.display = 'block'
			@player.style.width = '100%'
			@player.innerHTML = ''
			@player.mediaType = 'audio'
			@_element.appendChild @player

			# Add source
			@player.source = document.createElement('source')
			@player.source.setAttribute 'src', Utils.parseAsset(value)
			@player.appendChild @player.source
			@_updateProperties()

			# Wrap events
			@player.element = Event.wrap(@player).element
			@player.on = @player.addEventListener
			@player.off = @player.removeEventListener

			return


	# *********************************
	# autoplay property
	# *********************************
	# The autoplay property sets or returns whether the audio/video should start playing as soon as it is loaded.
	# Default: false. Indicates that the audio/video should NOT start playing as soon as it is loaded
	# See more: http://www.w3schools.com/tags/av_prop_autoplay.asp
	@define 'autoplay',
		get: ->
			@player.autoplay
		set: (value) ->
			@_autoplay = value
			@player.autoplay = value
			return


	# *********************************
	# buffered property
	# *********************************

	###
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
	###

	@define 'buffered',
		get: ->
			@player.buffered
		set: (value) ->
			console.log 'Player: cannot set buffered property.'
			return


	# *********************************
	# controls property
	# *********************************

	###
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
	###

	@define 'controls',
		get: ->
			@player.controls
		set: (value) ->
			@_controls = value
			@player.controls = value
			return


	# *********************************
	# currentTime property
	# *********************************

	###
		The currentTime property sets or returns the current position (in seconds) of the audio/video playback.
		When setting this property, the playback will jump to the specified position.

		Ex: vid.currentTime = 5;
	###

	@define 'currentTime',
		get: ->
			@player.currentTime
		set: (value) ->
			@_currentTime = value
			@player.currentTime = value
			return


	# *********************************
	# defaultMuted property
	# *********************************

	###
		The defaultMuted property sets or returns whether the audio/video should be muted by default.
		Setting this property will only change the default muted state, not the current. To change the current muted state, use the muted property.

		Ex: vid.defaultMuted = true;
	###

	@define 'defaultMuted',
		get: ->
			@player.defaultMuted
		set: (value) ->
			@_defaultMuted = value
			@player.defaultMuted = value
			return


	# *********************************
	# defaultPlaybackRate property
	# *********************************

	###
		The defaultPlaybackRate property sets or returns the default playback speed of the audio/video.

		Setting this property will only change the default playback speed, not the current. To change the current playback speed, use the playbackRate property.
	###

	@define 'defaultPlaybackRate',
		get: ->
			@player.defaultPlaybackRate
		set: (value) ->
			@_defaultPlaybackRate = value
			@player.defaultPlaybackRate = value
			return


	# *********************************
	# duration property
	# *********************************

	###
		The duration property returns the length of the current audio/video, in seconds.

		If no audio/video is set, NaN (Not-a-Number) is returned.

		Note: This property is read-only.
	###

	@define 'duration',
		get: ->
			@player.duration
		set: (value) ->
			console.log 'Player: cannot set duration property.'
			return


	# *********************************
	# ended property
	# *********************************

	###
		The ended property returns whether the playback of the audio/video has ended.

		An audio/video has ended when the playback position is at the end of the audio/video.

		Note: This property is read-only.
	###

	@define 'ended',
		get: ->
			@player.ended
		set: (value) ->
			console.log 'Player: cannot set ended property.'
			return


	# *********************************
	# loop property
	# *********************************

	###
		The loop property sets or returns whether the audio/video should start playing over again when it is finished.

		Default false. Indicates that the audio/video should NOT start playing again when it is finished
	###

	@define 'loop',
		get: ->
			@_element.loop
		set: (value) ->
			@_loop = value
			@player.loop = value
			return


	# *********************************
	# mediaGroup property
	# *********************************

	###
		The mediaGroup property sets or returns the name of the media group the audio/video is a part of.

		A media group allow 2 or more audio/video elements to be kept synchronized.

		See more: http://www.w3schools.com/tags/av_prop_mediagroup.asp

		Ex: vid1.mediaGroup = "test";
			vid2.mediaGroup = "test";
	###

	@define 'mediaGroup',
		get: ->
			@_element.mediaGroup
		set: (value) ->
			@_mediaGroup = value
			@player.mediaGroup = value
			return


	# *********************************
	# muted property
	# *********************************

	###
		The muted property sets or returns whether the audio/video should be muted (sound turned off).
	###

	@define 'muted',
		get: ->
			@_element.muted
		set: (value) ->
			@_muted = value
			@player.muted = value
			return


	# *********************************
	# networkState property
	# *********************************

	###
		The networkState property returns the current network state (activity) of the audio/video.

		Return Value:

			Number	Represents the current network state of the audio/video element:
			0 = NETWORK_EMPTY - audio/video has not yet been initialized
			1 = NETWORK_IDLE - audio/video is active and has selected a resource, but is not using the network
			2 = NETWORK_LOADING - browser is downloading data
			3 = NETWORK_NO_SOURCE - no audio/video source found

		Note: This property is read-only.
	###

	@define 'networkState',
		get: ->
			@player.networkState
		set: (value) ->
			console.log 'Player: cannot set networkState property.'
			return


	# *********************************
	# paused property
	# *********************************

	###
		The paused property returns whether the audio/video is paused.

		Note: This property is read-only.
	###

	@define 'paused',
		get: ->
			@player.paused
		set: (value) ->
			console.log 'Player: cannot set paused property.'
			return


	# *********************************
	# playbackRate property
	# *********************************

	###
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
	###

	@define 'playbackRate',
		get: ->
			@player.playbackRate
		set: (value) ->
			@_playbackRate = value
			@player.playbackRate = value
			return


	# *********************************
	# played property
	# *********************************

	###
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
	###

	@define 'played',
		get: ->
			@player.played
		set: (value) ->
			console.log 'Player: cannot set played property.'
			return


	# *********************************
	# preload property
	# *********************************

	###
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
	###

	@define 'preload',
		get: ->
			@player.preload
		set: (value) ->
			@_preload = value
			@player.preload = value
			return


	# *********************************
	# readyState property
	# *********************************

	###
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
	###

	@define 'readyState',
		get: ->
			@player.readyState
		set: (value) ->
			console.log 'Player: cannot set readyState property.'
			return


	# *********************************
	# seekable property
	# *********************************

	###
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
	###

	@define 'seekable',
		get: ->
			@player.seekable
		set: (value) ->
			console.log 'Player: cannot set seekable property.'
			return


	# *********************************
	# seeking property
	# *********************************

	###
		The seeking property returns whether the user is currently seeking in the audio/video.
		Seeking is when you move/skip to a new position in the audio/video.

		Note: This property is read-only.
	###

	@define 'seeking',
		get: ->
			@player.seeking
		set: (value) ->
			console.log 'Player: cannot set seeking property.'
			return


	# *********************************
	# textTracks property
	# *********************************

	###
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
	###

	@define 'textTracks',
		get: ->
			@player.textTracks
		set: (value) ->
			console.log 'Player: cannot set textTracks property.'
			return


	# *********************************
	# volume property
	# *********************************

	###
		The volume property sets or returns the current volume of the audio/video.

		Ex: vid.volume = 0.2;

		See more: http://www.w3schools.com/tags/av_prop_volume.asp
	###

	@define 'volume',
		get: ->
			@player.volume
		set: (value) ->
			@_volume = value
			@player.volume = value
			return


Player::play = ->
	@player.play()
	return

Player::load = ->
	@player.load()
	return

Player::pause = ->
	@player.pause()
	return

###
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
###

Player::canPlayType = (type) ->
	@player.canPlayType type

###
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
###

Player::addTextTrack = (kind, label, language) ->
	@_element.addTextTrack kind, label, language
	return

Player::_updateProperties = ->
	if @_autoplay isnt undefined
		@autoplay = @_autoplay

	if @_controls isnt undefined
		@controls = @_controls

	if @_currentTime isnt undefined
		@currentTime = @_currentTime

	if @_defaultMuted isnt undefined
		@defaultMuted = @_defaultMuted

	if @_defaultPlaybackRate isnt undefined
		@defaultPlaybackRate = @_defaultPlaybackRate

	if @_loop isnt undefined
		@loop = @_loop

	if @_mediaGroup isnt undefined
		@mediaGroup = @_mediaGroup

	if @_muted isnt undefined
		@muted = @_muted

	if @_playbackRate isnt undefined
		@playbackRate = @_playbackRate

	if @_preload isnt undefined
		@preload = @_preload

	if @_volume isnt undefined
		@volume = @_volume

	return
