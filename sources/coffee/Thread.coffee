# *********************************
# *********************************
# Thread
# *********************************
# ** By Etienne Pinchon
# ** ©2016
# See more: http://www.w3schools.com/html/html5_webworkers.asp

###

th = new Thread ->
	# Compute
	i = 'd'
	setInterval (->
		self.postMessage('stuff')
		return
	), 400

th.onReceive (e) ->
	console.log 'yo'

th.onError (e) ->
	console.log e

###

class Thread extends Element
	constructor: (properties) ->
			
		if properties is undefined
			properties = {}

		# Test support
		if not window.Worker
			@emit Event.Unsupported

			#log("Location: Location is not supported by this browser.");
			if properties.unsupported
				properties.unsupported()
			return false

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

	_kind : 'Thread'

	@define 'process',
		get: ->
			@_process
		set: (fn) ->

			window.send = window.postMessage
			window.URL = window.URL or window.webkitURL
			
			# Remove the last return
			#split_return_fn = fn.toString().match(/function[^{]+\{([\s\S]*)\}$/)[1].split('return')
			#console.log split_return_fn.join('return')

			#last_return_fn = split_return_fn.pop()
			#split_return_fn.join('return')


			#fn = split_return_fn + last_return_fn
			func = fn.toString().match(/function[^{]+\{([\s\S]*)\}$/)[1]
			
			#split_return_fn = func.split('return')
			#last_return_fn = split_return_fn.pop()
			#split_return_fn = split_return_fn.join('return') +  last_return_fn
			#console.log split_return_fn


			# Convert worker to Blob
			workerData = new Blob([ 'self.send = postMessage;\n' + func ], type: 'text/javascript')
			
			if @worker
				@end()
			
			# Create new worker
			@worker = new Worker(window.URL.createObjectURL(workerData))

			_this = @

			# listen for messages sent by the worker
			@worker.addEventListener 'message', (e) ->
				_this.emit Event.Receive, e
			, false

			# listen for messages sent by the worker
			@worker.addEventListener 'error', (e) ->
				_this.emit Event.Error, e
			, false

	onUnsupported : (cb) -> @on Event.Unsupported, cb
	onReceive : (cb) -> @on Event.Receive, cb
	onSend : (cb) -> @on Event.Send, cb
	
	onEnd : (cb) -> @on Event.End, cb
	onStop : (cb) -> @on Event.End, cb
	onTerminate : (cb) -> @on Event.End, cb
	
	onError : (cb) -> @on Event.Error, cb

# *********************************
# Send method

# Send message to thread
Thread::send = (message) ->
	if @worker isnt undefined
		@worker.postMessage message
		@emit Event.Send, message

	return

# *********************************
# End method

# End thread execution
Thread::end = ->
	if @worker isnt undefined
		@worker.terminate()
		delete @worker
		@worker = undefined
		@emit Event.End
	return

# Stop 
Thread::stop = ->
	@end()
	return

# Terminate 
Thread::terminate = ->
	@terminate()
	return



