# *********************************
# *********************************
# Network
# *********************************
# ** By Etienne Pinchon
# ** ©2016

###
GET '/', {}, (response) -> , (error)->
POST '/', {}, (response) -> , (error)->
DEL '/', {}, (response) -> , (error)->
PUT '/', {}, (response) -> , (error)->
###

GET = ->
	return if arguments.length is 0
	return Network._inline 'get', arguments

POST = ->
	return if arguments.length is 0
	return Network._inline 'post', arguments

DEL = ->
	return if arguments.length is 0
	return Network._inline 'del', arguments

PUT = ->
	return if arguments.length is 0
	return Network._inline 'put', arguments


class Network extends Element
	constructor: (parameters) ->

		@url = false
		@type = false
		@parameters = ''
		@_parameters = {}
		@beforeCallback = false
		@thenCallback = false
		@successCallback = false
		@errorCallback = false
		@files = false
		@username = ''
		@password = ''
		@response = {}
		@async = true

		if parameters is undefined
			return

		# Set the URL
		if parameters.get isnt undefined
			@url = parameters.get
			@type = 'GET'
		else if parameters.post isnt undefined
			@url = parameters.post
			@type = 'POST'
		else if parameters.put isnt undefined
			@url = parameters.put
			@type = 'PUT'
		else if parameters.del isnt undefined
			@url = parameters.del
			@type = 'DELETE'
		else if parameters.delete isnt undefined
			@url = parameters.delete
			@type = 'DELETE'

		# Set async
		if parameters.async isnt undefined
			@async = parameters.async

		# Set the callback
		if parameters.parameters isnt undefined
			if typeof parameters.parameters isnt 'object'
				return
			@_parameters = parameters.parameters
			@parameters = Object.keys(parameters.parameters).map((k) ->
				encodeURIComponent(k) + '=' + encodeURIComponent(parameters.parameters[k])
			).join('&')

		# Set the callback
		if parameters.before isnt undefined
			@beforeCallback = parameters.before

		# Set the callback
		if parameters.then isnt undefined
			@thenCallback = parameters.then

		# Set the callback
		if parameters.success isnt undefined
			@successCallback = parameters.success

		# Attach username
		if parameters.username isnt undefined
			@username = parameters.username

		# Attach password
		if parameters.password isnt undefined
			@password = parameters.password

		# Set the callback
		if parameters.error isnt undefined
			@errorCallback = parameters.error

		# Make sure we can create the request
		if not @url and not @type
			return

		# Trigger the "before" callback
		if @beforeCallback
			@beforeCallback()

		# Create new XMLHttpRequest instance
		xhttp = new XMLHttpRequest

		# Attach file to the request
		if parameters.files isnt undefined
			@files = parameters.files
			_this = this

			# Upload events
			xhttp.upload.addEventListener Event.Progress, (event) ->
				# Inject percent loaded inside the event variable
				if event.lengthComputable
					event.progress = event.loaded / event.total
				else
					event.progress = undefined
				_this.emit Event.Progress, event
				return

			xhttp.upload.addEventListener Event.Loaded, (event) ->
				event.progress = 100
				_this.emit Event.Load, event
				return

			xhttp.upload.addEventListener Event.Error, (event) ->
				_this.emit Event.Error, event
				return

			xhttp.upload.addEventListener Event.Abort, (event) ->
				_this.emit Event.Abort, event
				return

		# *********************************

		xhttp.onreadystatechange = (->
			@response.state = xhttp.readyState
			@response.status = xhttp.status

			if xhttp.readyState is 4
				@response.raw = xhttp.responseText

				# If everything ok, trigger the callback
				if xhttp.status.toString()[0] is '2'
					if @successCallback
						try
							@response.data = JSON.parse(xhttp.responseText)
						catch err
							@response.data = xhttp.responseText
						@successCallback @response

						@emit Event.Success, @response
				else
					if @errorCallback
						if xhttp.responseText isnt undefined
							try
								@response.data = JSON.parse(xhttp.responseText)
							catch err
								@response.data = xhttp.responseText
						@errorCallback @response

						@emit Event.Error, @response

				# Trigger the always callback
				if @thenCallback
					@thenCallback @response

				@emit Event.Response, @response
			return
		).bind(this)

		# GET
		if @type is 'GET'
			if @parameters isnt ''
				@url = @url + '?' + @parameters

		# Prepare the request
		xhttp.open @type, @url, @async, @username, @password

		# POST
		parameters = undefined
		if @type isnt 'GET'
			parameters = @parameters

			# If we want to send files
			if @type is 'POST' and @files

				# Create a new form data
				parameters = new FormData

				# Add parameters with values
				for item of @_parameters
					parameters.append item, @_parameters[item]

				# Add files
				for item of @files
					parameters.append item, @files[item]
			else
				#Send the proper header information along with the request
				xhttp.setRequestHeader 'Content-type', 'application/x-www-form-urlencoded'

		xhttp.send parameters
		return

	_kind: 'Network'

	onSuccess : (cb) -> @on Event.Success, cb
	onError : (cb) -> @on Event.Error, cb
	onResponse : (cb) -> @on Event.Response, cb
	onProgress : (cb) -> @on Event.Progress, cb
	onAbort : (cb) -> @on Event.Abort, cb
	onLoad : (cb) -> @on Event.Load, cb
	onLoaded : (cb) -> @on Event.Loaded, cb
	onDone : (cb) -> @on Event.Loaded, cb

Network._inline = (method, args) ->
	requestObject = {}

	# First argument is method
	if Utils.isString(args[0])
		requestObject[method] = args[0]
	
	# Second is paramters
	if args[1] and Utils.isObject(args[1]) and not Utils.isFunction(args[1])
		requestObject.parameters = args[1]

		if args[2] and Utils.isFunction(args[2])
			requestObject.success = args[2]

			if args[3] and Utils.isFunction(args[3])
				requestObject.error = args[3]

	# Otherse first is success
	else if args[1] and Utils.isFunction(args[1])
		requestObject.success = args[1]

		if args[2] and Utils.isFunction(args[2])
			requestObject.error = args[2]

	return Network requestObject
