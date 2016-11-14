# Say

class Say extends Element

	_kind : 'Say'

	constructor: (str, options={})->
		super
		
		if not window.speechSynthesis
			if options.unsupported then options.unsupported()
			@emit Event.Unsupported
			log 'Say: feature not supported.'
			return no

		@message = new SpeechSynthesisUtterance()

		# Get all voices
		voices = Say.getVoicesAvailable()
		
		if options.voice
			for voice in voices
				if voice.name is options.voice
					@message.voice = voice
		else if options.voiceID
			i = 0
			for voice in voices
				if options.voiceID is i
					@message.voice = voice
				i++

		that 			= @
		@message.voiceURI 	= 'native'
		@message.volume 		= options.volume if options.volume
		# 0 to 1
		@message.rate 		= options.rate if options.rate
		# 0.1 to 10
		@message.pitch 		= options.pitch if options.pitch
		#0 to 2
		@message.text 		= str if str
		@message.lang 		= options.language if options.language

		@message.onboundary = (e) ->
			that.emit Event.Boundary, e
			return
		@message.onend = (e) ->
			that.emit Event.End, e
			return
		@message.onerror = (e) ->
			that.emit Event.Error, e
			return
		@message.onmark = (e) ->
			that.emit Event.Mark, e
			return
		@message.onpause = (e) ->
			that.emit Event.Pause, e
			return
		@message.onresume = (e) ->
			that.emit Event.Resume, e
			return
		@message.onstart = (e) ->
			that.emit Event.Start, e
			return

		if options.auto isnt false
			speechSynthesis.speak @message

	speak : -> 
		window.speechSynthesis.speak @message if @message
		return
	pause : -> 
		window.speechSynthesis.pause()
		return
	resume : -> 
		window.speechSynthesis.resume()
		return
	cancel : -> 
		window.speechSynthesis.cancel()
		return

	##############################################################
	# STATIC METHODS

	@getVoicesAvailable : ->
		window.speechSynthesis.getVoices()
		
	@getVoicesNameAvailable : ->
		voices = window.speechSynthesis.getVoices()
		voice_name = []
		for voice in voices
			voice_name.push voice.name
		voice_name

	##############################################################
	# EVENTS

	onUnsupported 	: (cb) -> 
		@on Event.Unsupported, cb
		return
	onBoundary 		: (cb) -> 
		@on Event.Boundary, cb
		return
	onEnd 			: (cb) -> 
		@on Event.End, cb
		return
	onError 		: (cb) -> 
		@on Event.Error, cb
		return
	onMark	 		: (cb) -> 
		@on Event.Mark, cb
		return
	onPause	 		: (cb) -> 
		@on Event.Pause, cb
		return
	onResume 		: (cb) -> 
		@on Event.Resume, cb
		return
	onStart 		: (cb) -> 
		@on Event.Start, cb
		return

say = Say
