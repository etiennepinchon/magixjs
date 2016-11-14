# Thread

class Thread extends Element

	_kind : 'Thread'

	constructor: (properties) ->
		properties = {} if properties is NULL
			
		if not window.Worker
			if properties.unsupported then properties.unsupported()
			@emit Event.Unsupported
			return no
		if Utils.isFunction(properties)
			@process = properties
			return
		if properties.process
			@process = properties.process
			return
		if properties.receive
			@onReceive = properties.receive
			return
		@

	@define 'process',
		get: -> @_process
		set: (fn) ->
			that 			= @
			window.send 	= window.postMessage
			window.URL 		= window.URL or window.webkitURL
			func 			= fn.toString().match(/function[^{]+\{([\s\S]*)\}$/)[1]
			workerData 		= new Blob([ 'self.send = postMessage;\n' + func ], type: 'text/javascript')
			
			if @worker then @end()
			@worker = new Worker(window.URL.createObjectURL(workerData))
			@worker.addEventListener 'message', (e) ->
				that.emit Event.Receive, e
			, no
			@worker.addEventListener Event.Error, (e) ->
				that.emit Event.Error, e
			, no

	##############################################################
	# FUNCTIONS

	send 		: (message) ->
		if @worker isnt NULL
			@worker.postMessage message
			@emit Event.Send, message
		return
	end 		: ->
		if @worker isnt NULL
			@worker.terminate()
			delete @worker
			@worker = NULL
			@emit Event.End
		return
	stop 		: ->
		@end()
		return
	terminate 	: ->
		@terminate()
		return

	##############################################################
	# EVENTS

	onUnsupported 	: (cb) -> 
		@on Event.Unsupported, cb
		return
	onReceive 		: (cb) -> 
		@on Event.Receive, cb
		return
	onSend 			: (cb) -> 
		@on Event.Send, cb
		return
	onEnd 			: (cb) -> 
		@on Event.End, cb
		return
	onStop 			: (cb) -> 
		@on Event.End, cb
		return
	onTerminate		: (cb) -> 
		@on Event.End, cb
		return
	onError 		: (cb) -> 
		@on Event.Error, cb
		return
