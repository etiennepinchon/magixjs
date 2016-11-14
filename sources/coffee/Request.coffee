# Request

class RequestEngine extends Element

	_kind 		: 'RequestEngine'
	url 		: NULL
	parameters 	: NULL
	files 		: NULL
	username 	: NULL
	password 	: NULL
	success 	: NULL
	error 		: NULL
	async 		: yes
	response 	: {}
	xhttp 		: new XMLHttpRequest
	
	constructor: (type, args)->
		if not Utils.isString(args[0]) then return null
		@url = args[0]
		if Utils.isFunction(args[1])
			@success = args[1]
			@error 	 = args[2] if Utils.isFunction(args[2])
		else if Utils.isObject(args[1])
			@success 	= args[1].success if args[1].success
			@error 	 	= args[1].error if args[1].error
			@files		= args[1].files if args[1].files
			@async		= no if args[1].async is no
			@then 		= args[1].then if args[1].then
			@username 	= args[1].username if args[1].username
			@password 	= args[1].password if args[1].password
			if args[1].parameters and Utils.isObject(args[1].parameters)
				@parameters = args[1].parameters 
			if Utils.isFunction(args[2])
				@success = args[2]
				@error   = args[3] if Utils.isFunction(args[3])
		if @parameters
			@_parameters = Object.keys(@parameters).map((k) ->
				encodeURIComponent(k) + '=' + encodeURIComponent(@parameters[k])
			).join('&')
		if @files then @setUploadEvents()
		@xhttp.onreadystatechange = @responseProcess.bind(this)
		if type is 'GET' and @_parameters and @_parameters.length
			@url = @url + '?' + @_parameters 
		@xhttp.open type, @url, @async, @username, @password
		if type is 'POST' and @files
			@_parameters = new FormData
			for item of @parameters
				@_parameters.append item, @parameters[item]
			for item of @files
				@_parameters.append item, @files[item]
		else if type isnt 'GET'
			@xhttp.setRequestHeader 'Content-type', 'application/x-www-form-urlencoded'
		@xhttp.send @_parameters
		return

	setUploadEvents : ->
		that = @
		@xhttp.upload.addEventListener Event.Progress, (event) ->
			event.progress = NULL
			event.progress = event.loaded/event.total if event.lengthComputable
			that.emit Event.Progress, event
			return
		@xhttp.upload.addEventListener Event.Loaded, (event) ->
			event.progress = 100
			that.emit Event.Load, event
			return
		@xhttp.upload.addEventListener Event.Error, (event) ->
			that.emit Event.Error, event
			return
		@xhttp.upload.addEventListener Event.Abort, (event) ->
			that.emit Event.Abort, event
			return

	setHTTPResponse : ->
		if @xhttp.responseText isnt NULL
			try
				@response.data = JSON.parse(@xhttp.responseText)
			catch err
				@response.data = @xhttp.responseText

	responseProcess : ->
		@response.state 	= @xhttp.readyState
		@response.status 	= @xhttp.status
		if @xhttp.readyState is 4
			@response.raw = @xhttp.responseText
			if @xhttp.status.toString()[0] is '2'
				if @success
					@setHTTPResponse()
					@success @response
					@emit Event.Success, @response
			else
				if @error
					@setHTTPResponse()
					@error @response
					@emit Event.Error, @response
			if @then then @then @response
			@emit Event.Response, @response
		return

	onSuccess 	: (cb) -> @on Event.Success, cb
	onError 	: (cb) -> @on Event.Error, cb
	onResponse 	: (cb) -> @on Event.Response, cb
	onProgress 	: (cb) -> @on Event.Progress, cb
	onAbort 	: (cb) -> @on Event.Abort, cb
	onLoad 		: (cb) -> @on Event.Load, cb
	onLoaded 	: (cb) -> @on Event.Loaded, cb
	onDone 		: (cb) -> @on Event.Loaded, cb

Request =
	get : ->
		return null if arguments.length is 0
		return new RequestEngine('GET', arguments)
	send : ->
		return null if arguments.length is 0
		return new RequestEngine('POST', arguments)
	delete : ->
		return null if arguments.length is 0
		return new RequestEngine('DELETE', arguments)
	update : ->
		return null if arguments.length is 0
		return new RequestEngine('PUT', arguments)
