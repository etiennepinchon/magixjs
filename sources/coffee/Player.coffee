
# Pview

class Pview extends View

	_kind : 'Pview'

	constructor : (properties) ->
		@pview = new Object
		super
	
	play : ->
		@pview.play()
		return

	load : ->
		@pview.load()
		return

	pause : ->
		@pview.pause()
		return

	canPlayType : (type) ->
		@pview.canPlayType type

	addTextTrack : (kind, label, language) ->
		@_element.addTextTrack kind, label, language
		return

	##############################################################
	# PROPERTIES

	@define 'video',
		get: -> @pview.currentSrc
		set: (value) ->
			if @pview.mediaType isnt NULL
				if @pview.mediaType is 'video'
					@pview.src = Utils.parseAsset(value)
					return
				else
					@pview.pause()
					@_element.removeChild @pview
			@pview = document.createElement('video')
			@pview.style.overflow = 'hidden'
			@pview.style.display = 'block'
			@pview.style.width = '100%'
			@pview.innerHTML = ''
			@pview.mediaType = 'video'
			@_element.appendChild @pview
			@pview.source = document.createElement('source')
			@pview.source.setAttribute 'src', Utils.parseAsset(value)
			@pview.appendChild @pview.source
			@_updateProperties()
			@pview.element = Event.wrap(@pview).element
			@pview.on = @pview.addEventListener
			@pview.off = @pview.removeEventListener
			return

	@define 'audio',
		get: -> @pview.currentSrc
		set: (value) ->
			if @pview.mediaType isnt NULL
				if @pview.mediaType is 'audio'
					@pview.src = Utils.parseAsset(value)
					return
				else
					@pview.pause()
					@_element.removeChild @pview
			@pview = document.createElement('audio')
			@pview.style.overflow = 'hidden'
			@pview.style.display = 'block'
			@pview.style.width = '100%'
			@pview.innerHTML = ''
			@pview.mediaType = 'audio'
			@_element.appendChild @pview
			@pview.source = document.createElement('source')
			@pview.source.setAttribute 'src', Utils.parseAsset(value)
			@pview.appendChild @pview.source
			@_updateProperties()
			@pview.element = Event.wrap(@pview).element
			@pview.on = @pview.addEventListener
			@pview.off = @pview.removeEventListener
			return

	@define 'autoplay',
		get: -> @pview.autoplay
		set: (value) ->
			@_autoplay = value
			@pview.autoplay = value
			return

	@define 'buffered',
		get: -> @pview.buffered
		set: (value) ->
			log 'Pview: cannot set buffered property.'
			return

	@define 'controls',
		get: -> @pview.controls
		set: (value) ->
			@_controls = value
			@pview.controls = value
			return

	@define 'currentTime',
		get: -> @pview.currentTime
		set: (value) ->
			@_currentTime = value
			@pview.currentTime = value
			return

	@define 'defaultMuted',
		get: -> @pview.defaultMuted
		set: (value) ->
			@_defaultMuted = value
			@pview.defaultMuted = value
			return

	@define 'defaultPlaybackRate',
		get: -> @pview.defaultPlaybackRate
		set: (value) ->
			@_defaultPlaybackRate = value
			@pview.defaultPlaybackRate = value
			return

	@define 'duration',
		get: -> @pview.duration
		set: (value) ->
			log 'Pview: cannot set duration property.'
			return

	@define 'ended',
		get: -> @pview.ended
		set: (value) ->
			log 'Pview: cannot set ended property.'
			return

	@define 'loop',
		get: -> @_element.loop
		set: (value) ->
			@_loop = value
			@pview.loop = value
			return

	@define 'mediaGroup',
		get: -> @_element.mediaGroup
		set: (value) ->
			@_mediaGroup = value
			@pview.mediaGroup = value
			return

	@define 'muted',
		get: -> @_element.muted
		set: (value) ->
			@_muted = value
			@pview.muted = value
			return

	@define 'networkState',
		get: -> @pview.networkState
		set: (value) ->
			log 'Pview: cannot set networkState property.'
			return

	@define 'paused',
		get: -> @pview.paused
		set: (value) ->
			log 'Pview: cannot set paused property.'
			return

	@define 'playbackRate',
		get: -> @pview.playbackRate
		set: (value) ->
			@_playbackRate = value
			@pview.playbackRate = value
			return

	@define 'played',
		get: -> @pview.played
		set: (value) ->
			log 'Pview: cannot set played property.'
			return

	@define 'preload',
		get: -> @pview.preload
		set: (value) ->
			@_preload = value
			@pview.preload = value
			return

	@define 'readyState',
		get: -> @pview.readyState
		set: (value) ->
			log 'Pview: cannot set readyState property.'
			return

	@define 'seekable',
		get: -> @pview.seekable
		set: (value) ->
			console.log 'Pview: cannot set seekable property.'
			return

	@define 'seeking',
		get: -> @pview.seeking
		set: (value) ->
			console.log 'Pview: cannot set seeking property.'
			return

	@define 'textTracks',
		get: -> @pview.textTracks
		set: (value) ->
			console.log 'Pview: cannot set textTracks property.'
			return

	@define 'volume',
		get: -> @pview.volume
		set: (value) ->
			@_volume = value
			@pview.volume = value
			return


	##############################################################
	# EVENTS

	on 					: (eventName, fn) -> @pview.on eventName, fn
	off 				: (eventName, fn) -> @pview.off eventName, fn
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

	@_updateProperties : ->
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
