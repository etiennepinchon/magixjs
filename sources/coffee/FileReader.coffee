
# FileReader

class FileReader extends Element
	
	_kind : 'FileReader'

	constructor : (parameters) ->
		if not window.FileReader
			if properties.unsupported then properties.unsupported()
			@emit Event.Unsupported
			return no

		@reader     = new window.FileReader
		that        = this
		parameters  = {} if parameters is NULL

		@addReaderEvents()
		if parameters.arrayBuffer
			@arrayBuffer = parameters.arrayBuffer
		else if parameters.binary
			@binary = parameters.binary
		else if parameters.base64
			@base64 = parameters.base64
		else if parameters.text
			@text = parameters.text
		return

	abort : (first_argument) ->
		if @reader isnt NULL
			@reader.abort()
		return

	addReaderEvents : ->
		@reader.addEventListener 'loadstart', ((e) ->
			that.emit Event.LoadStart, e
			if parameters.start then parameters.start e
		), no
		@reader.addEventListener 'loadend', ((e) ->
			that.emit Event.LoadEnd, e
			if parameters.end then parameters.end e
		), no
		@reader.addEventListener 'progress', ((e) ->
			that.emit Event.Progress, e
			if parameters.progress then parameters.progress e
		), no
		@reader.addEventListener 'load', (->
			that.emit Event.Load, that.reader.result
			if parameters.then then parameters.then that.reader.result
		), no
		@reader.addEventListener 'error', (->
			that.emit Event.Error, that.reader.error
			if parameters.error then parameters.error that.reader.error
		), no
		@reader.addEventListener 'abort', ((e) ->
			that.emit Event.Abort, e
			if parameters.abort then parameters.abort e
		), no

	@define 'arrayBuffer',
		get: -> return @_arrayBuffer
		set: (blob) ->
			@_arrayBuffer = blob
			@reader.readAsArrayBuffer blob
			return
	@define 'binary',
		get: -> return @_binary
		set: (blob) ->
			@_binary = blob
			@reader.readAsBinaryString blob
			return
	@define 'base64',
		get: -> return @_base64
		set: (blob) ->
			@_base64 = blob
			@reader.readAsDataURL blob
			return

	@define 'text',
		get: -> return @_text
		set: (blob) ->
			@_text = blob
			@reader.readAsText blob
			return

	onUnsupported   : (cb) -> @on Event.Unsupported, cb
	onLoadStart     : (cb) -> @on Event.LoadStart, cb
	onLoadEnd       : (cb) -> @on Event.LoadEnd, cb
	onProgress      : (cb) -> @on Event.Progress, cb
	onLoad          : (cb) -> @on Event.Load, cb
	onLoaded        : (cb) -> @on Event.Load, cb
	onDone          : (cb) -> @on Event.Loaded, cb
	onAbort         : (cb) -> @on Event.Abort, cb
	onQuit          : (cb) -> @on Event.Quit, cb
