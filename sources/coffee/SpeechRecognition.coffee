# SpeechRecognition

window._SpeechRecognition = window.webkitSpeechRecognition if window.webkitSpeechRecognition
window._SpeechRecognition = window.SpeechRecognition if window.SpeechRecognition

class SpeechRecognition extends Element

	_kind 		: 'SpeechRecognition'
	supported 	: yes

	constructor: (str, options={})->
		that = @
		if window._SpeechRecognition is NULL
			if options.unsupported then options.unsupported()
			@emit Event.Unsupported
			@supported = no
			log 'SpeechRecognition: feature not supported.'
			return no

		@recognition = new window._SpeechRecognition()
		@recognition.continuous = options.continuous if options.continuous
		@recognition.interimResults = options.interimResults if options.interimResults
		@recognition.lang = options.language if options.language
		@recognition.grammars = options.grammars if options.grammars
		@recognition.maxAlternatives = options.maxAlternatives if options.maxAlternatives
		
		@recognition.onaudiostart = (e) ->
			that.emit Event.AudioStart, e
			return
		@recognition.onaudioend = (e) ->
			that.emit Event.AudioEnd, e
			return
		@recognition.onend = (e) ->
			that.emit Event.End, e
			return
		@recognition.onerror = (e) ->
			that.emit Event.Error, e
			return
		@recognition.onstart = (e) ->
			that.emit Event.Start, e
			return
		@recognition.onnomatch = (e) ->
			that.emit Event.NoMatch, e
			return
		@recognition.onresult = (e) ->
			that.emit Event.Result, e
			return
		@recognition.onsoundstart = (e) ->
			that.emit Event.SoundStart, e
			return
		@recognition.onsoundend = (e) ->
			that.emit Event.SoundEnd, e
			return
		@recognition.onspeechstart = (e) ->
			that.emit Event.SpeechStart, e
			return
		@recognition.onspeechend = (e) ->
			that.emit Event.SpeechEnd, e
			return

	abort : -> 
		@recognition.abort()
		return
	start : -> 
		@recognition.start()
		return
	stop : -> 
		@recognition.stop()
		return

	##############################################################
	# EVENTS

	onUnsupported 	: (cb) -> 
		@on Event.Unsupported, cb
		return
	onAudioStart 	: (cb) -> 
		@on Event.AudioStart, cb
		return
	onAudioEnd	 	: (cb) -> 
		@on Event.AudioEnd, cb
		return
	onNoMatch 		: (cb) -> 
		@on Event.NoMatch, cb
		return
	onResult 		: (cb) -> 
		@on Event.Result, cb
		return
	onSoundStart 	: (cb) -> 
		@on Event.SoundStart, cb
		return
	onSoundEnd 		: (cb) -> 
		@on Event.SoundEnd, cb
		return
	onSpeechStart 	: (cb) -> 
		@on Event.SpeechStart, cb
		return
	onSpeechEnd 	: (cb) -> 
		@on Event.SpeechEnd, cb
		return
	onEnd 			: (cb) -> 
		@on Event.End, cb
		return
	onError 		: (cb) -> 
		@on Event.Error, cb
		return
	onStart 		: (cb) -> 
		@on Event.Start, cb
		return
		