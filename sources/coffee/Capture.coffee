# Capture

class Capture extends Element

	_kind     : 'Capture'
	supported   : yes

	constructor: (options={})->
		that = @

		promisifiedOldGUM = (constraints, successCallback, errorCallback) ->
			# First get ahold of getUserMedia, if present
			getUserMedia = navigator.getUserMedia or navigator.webkitGetUserMedia or navigator.mozGetUserMedia
			
			# Some browsers just don't implement it - return a rejected promise with an error
			# to keep a consistent interface
			if !getUserMedia
				if options.unsupported then options.unsupported()
				that.emit Event.Unsupported
				that.supported = no
				log 'Capture: feature not supported.'
				if options.unsupported
					options.unsupported()
				return no
			# Otherwise, wrap the call to the old navigator.getUserMedia with a Promise
			new Promise((successCallback, errorCallback) ->
			  getUserMedia.call navigator, constraints, successCallback, errorCallback
			  return
		)

		# Older browsers might not implement mediaDevices at all, so we set an empty object first
		if navigator.mediaDevices == undefined
			navigator.mediaDevices = {}

		# Some browsers partially implement mediaDevices. We can't just assign an object
		# with getUserMedia as it would overwrite existing options.
		# Here, we will just add the getUserMedia property if it's missing.
		if navigator.mediaDevices.getUserMedia == undefined
			if promisifiedOldGUM
				navigator.mediaDevices.getUserMedia = promisifiedOldGUM

		if options.video is NULL
			options.video = no
		if options.audio is NULL
			options.audio = no

		# Prefer camera resolution nearest to 1280x720.
		constraints = 
			audio: options.audio
			video: options.video

		navigator.mediaDevices.getUserMedia(constraints).then((stream) ->
			if options.success isnt undefined
				#stream.onended = ->
				#	that.emit Event.Ended
				options.success window.URL.createObjectURL(stream)
			return
		).catch (err) ->
			if options.error isnt undefined
				options.error err
			return
		return

###
Example:
myPlayer = new Player
	width: 720
	height: 720

myCapture = new Capture
	video: true
	audio: true
	success: (stream) ->
		myPlayer.video = stream
		myPlayer.play()
	error: ->
		console.log 'err'
###