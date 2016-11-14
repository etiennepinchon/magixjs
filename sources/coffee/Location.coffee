
# Location

class Location extends Element

	_kind : 'Location'

	constructor: (properties) ->

		properties = {} if not properties
		if not navigator.geolocation
			if properties.unsupported then properties.unsupported()
			@emit Event.Unsupported
			return no
		if properties.current
			properties.success = properties.current
			@current properties
		if properties.watch
			properties.success = properties.watch
			@watch properties
		return yes

	current : (parameters) ->

		if Utils.isBoolean(parameters)
			accurate = parameters
			parameters = {}

		that 				= @
		parameters  		= {} if not parameters
		parameters.accurate = no if parameters.accurate is NULL
		parameters.accurate = accurate if accurate
			
		navigator.geolocation.getCurrentPosition (position) ->
			position.coords.timestamp = position.timestamp
			that.emit Event.Success, position.coords
			if parameters.success then parameters.success position.coords
			return
		, (error) ->
			that.emit Event.Error, error
			if parameters.error then parameters.error error
			return
		, enableHighAccuracy: parameters.accurate
		return

	watch : (parameters) ->

		if Utils.isBoolean(parameters)
			accurate = parameters
			parameters = {}

		parameters = {} if not parameters
		that 				= @
		parameters  		= {} if not parameters
		parameters.accurate = no if parameters.accurate is NULL
		parameters.accurate = accurate if accurate

		@watch = navigator.geolocation.watchPosition (position) ->
			position.coords.timestamp = position.timestamp
			that.emit Event.Success, position.coords
			if parameters.success then parameters.success position.coords
			return
		, (error) ->
			that.emit Event.Error, error
			if parameters.error then parameters.error error
			return
		, enableHighAccuracy: parameters.accurate
		return

	clear : ->
		if @watch
			@emit Event.Clear
			navigator.geolocation.clearWatch @watch
		return

	##############################################################
	# EVENTS

	onUnsupported 	: (cb) ->
		@on Event.Unsupported, cb
		return
	onSuccess 		: (cb) ->
		@on Event.Success, cb
		return
	onError 		: (cb) ->
		@on Event.Error, cb
		return
	onClear 		: (cb) ->
		@on Event.Clear, cb
		return
