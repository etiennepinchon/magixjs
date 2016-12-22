
# Player

class Player extends View

	_kind : 'Player'

	constructor : (properties) ->
		@player = new Element
		super
	
	play : ->
		@player.play()
		return

	load : ->
		@player.load()
		return

	pause : ->
		@player.pause()
		return

	canPlayType : (type) ->
		@player.canPlayType type

	addTextTrack : (kind, label, language) ->
		@_element.addTextTrack kind, label, language
		return

	##############################################################
	# PROPERTIES

	@define 'video',
		get: -> @player.currentSrc
		set: (value) ->
			if @player.mediaType isnt NULL
				if @player.mediaType is 'video'
					@player.src = Utils.parseAsset(value)
					return
				else
					@player.pause()
					@_element.removeChild @player
			@player = document.createElement('video')
			@player.style.overflow = 'hidden'
			@player.style.display = 'block'
			@player.style.width = '100%'
			@player.innerHTML = ''
			@player.mediaType = 'video'
			@_element.appendChild @player
			@player.source = document.createElement('source')
			@player.source.setAttribute 'src', Utils.parseAsset(value)
			@player.appendChild @player.source
			@_updateProperties()
			@player.element = Event.wrap(@player).element
			@player.on = @player.addEventListener
			@player.off = @player.removeEventListener
			return

	@define 'audio',
		get: -> @player.currentSrc
		set: (value) ->
			if @player.mediaType isnt NULL
				if @player.mediaType is 'audio'
					@player.src = Utils.parseAsset(value)
					return
				else
					@player.pause()
					@_element.removeChild @player
			@player = document.createElement('audio')
			@player.style.overflow = 'hidden'
			@player.style.display = 'block'
			@player.style.width = '100%'
			@player.innerHTML = ''
			@player.mediaType = 'audio'
			@_element.appendChild @player
			@player.source = document.createElement('source')
			@player.source.setAttribute 'src', Utils.parseAsset(value)
			@player.appendChild @player.source
			@_updateProperties()
			@player.element = Event.wrap(@player).element
			@player.on = @player.addEventListener
			@player.off = @player.removeEventListener
			return

	@define 'autoplay',
		get: -> @player.autoplay
		set: (value) ->
			@_autoplay = value
			@player.autoplay = value
			return

	@define 'buffered',
		get: -> @player.buffered
		set: (value) ->
			log 'Player: cannot set buffered property.'
			return

	@define 'controls',
		get: -> @player.controls
		set: (value) ->
			@_controls = value
			@player.controls = value
			return

	@define 'currentTime',
		get: -> @player.currentTime
		set: (value) ->
			@_currentTime = value
			@player.currentTime = value
			return

	@define 'defaultMuted',
		get: -> @player.defaultMuted
		set: (value) ->
			@_defaultMuted = value
			@player.defaultMuted = value
			return

	@define 'defaultPlaybackRate',
		get: -> @player.defaultPlaybackRate
		set: (value) ->
			@_defaultPlaybackRate = value
			@player.defaultPlaybackRate = value
			return

	@define 'duration',
		get: -> @player.duration
		set: (value) ->
			log 'Player: cannot set duration property.'
			return

	@define 'ended',
		get: -> @player.ended
		set: (value) ->
			log 'Player: cannot set ended property.'
			return

	@define 'loop',
		get: -> @_element.loop
		set: (value) ->
			@_loop = value
			@player.loop = value
			return

	@define 'mediaGroup',
		get: -> @_element.mediaGroup
		set: (value) ->
			@_mediaGroup = value
			@player.mediaGroup = value
			return

	@define 'muted',
		get: -> @_element.muted
		set: (value) ->
			@_muted = value
			@player.muted = value
			return

	@define 'networkState',
		get: -> @player.networkState
		set: (value) ->
			log 'Player: cannot set networkState property.'
			return

	@define 'paused',
		get: -> @player.paused
		set: (value) ->
			log 'Player: cannot set paused property.'
			return

	@define 'playbackRate',
		get: -> @player.playbackRate
		set: (value) ->
			@_playbackRate = value
			@player.playbackRate = value
			return

	@define 'played',
		get: -> @player.played
		set: (value) ->
			log 'Player: cannot set played property.'
			return

	@define 'preload',
		get: -> @player.preload
		set: (value) ->
			@_preload = value
			@player.preload = value
			return

	@define 'readyState',
		get: -> @player.readyState
		set: (value) ->
			log 'Player: cannot set readyState property.'
			return

	@define 'seekable',
		get: -> @player.seekable
		set: (value) ->
			console.log 'Player: cannot set seekable property.'
			return

	@define 'seeking',
		get: -> @player.seeking
		set: (value) ->
			console.log 'Player: cannot set seeking property.'
			return

	@define 'textTracks',
		get: -> @player.textTracks
		set: (value) ->
			console.log 'Player: cannot set textTracks property.'
			return

	@define 'volume',
		get: -> @player.volume
		set: (value) ->
			@_volume = value
			@player.volume = value
			return


	##############################################################
	# EVENTS

	on 					: (eventName, fn) -> @player.on eventName, fn
	off 				: (eventName, fn) -> @player.off eventName, fn
	onCanPlay 			: (cb) -> @on Event.CanPlay, cb
	onCanPlayThrough 	: (cb) -> @on Event.CanPlayThrough, cb
	onDurationChange	: (cb) -> @on Event.DurationChange, cb
	onEmptied			: (cb) -> @on Event.Emptied, cb
	onReachEnd			: (cb) -> @on Event.ReachEnd, cb
	onLoadedData 		: (cb) -> @on Event.LoadedData, cb
	onLoadedMetaData 	: (cb) -> @on Event.LoadedMetaData, cb
	onLoadStart 		: (cb) -> @on Event.LoadStart, cb
	onPause 			: (cb) -> @on Event.Pause, cb
	onPlay 				: (cb) -> @on Event.Play, cb
	onPlaying 			: (cb) -> @on Event.Playing, cb
	onProgress 			: (cb) -> @on Event.Progress, cb
	onSpeedChange 		: (cb) -> @on Event.SpeedChange, cb
	onSeeked 			: (cb) -> @on Event.Seeked, cb
	onSeeking 			: (cb) -> @on Event.Seeking, cb
	onStalled 			: (cb) -> @on Event.Stalled, cb
	onSuspend 			: (cb) -> @on Event.Suspend, cb
	onTimeUpdate 		: (cb) -> @on Event.TimeUpdate, cb
	onVolumeChange		: (cb) -> @on Event.VolumeChange, cb
	onWaiting			: (cb) -> @on Event.Waiting, cb

	##############################################################
	# PRIVATE

	_updateProperties : ->
		@autoplay 				= @_autoplay if @_autoplay isnt NULL
		@controls 				= @_controls if @_controls isnt NULL
		@currentTime 			= @_currentTime if @_currentTime isnt NULL
		@defaultMuted 			= @_defaultMuted if @_defaultMuted isnt NULL
		@defaultPlaybackRate 	= @_defaultPlaybackRate if @_defaultPlaybackRate isnt NULL
		@loop 					= @_loop if @_loop isnt NULL
		@mediaGroup 			= @_mediaGroup if @_mediaGroup isnt NULL
		@muted 					= @_muted if @_muted isnt NULL
		@playbackRate 			= @_playbackRate if @_playbackRate isnt NULL
		@preload 				= @_preload if @_preload isnt NULL
		@volume 				= @_volume if @_volume isnt NULL
		return

	