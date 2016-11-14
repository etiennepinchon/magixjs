ViewStatesIgnoredKeys = ["ignoreEvent"]

class ViewStates extends Element

	constructor: (@view) ->
		@_states 			= {}
		@_orderedStates 	= []
		@animationOptions 	= {}
		@_currentState 		= "default"
		@_previousStates 	= []

		@add "default", @view.props
		super

	add: (stateName, properties) ->
		if Utils.isObject(stateName)
			for k, v of stateName
				@add(k, v)
			return

		error = -> throw Error "Usage example: view.states.add(\"someName\", {x:500})"
		error() if not Utils.isString stateName
		error() if not Utils.isObject properties

		@_orderedStates.push stateName
		@_states[stateName] = ViewStates.filterStateProperties(properties)

	remove: (stateName) ->
		return if not @_states.hasOwnProperty stateName
		delete @_states[stateName]
		@_orderedStates = Utils.without @_orderedStates, stateName

	switch: (stateName, animationOptions, instant=false) ->
		args 		= arguments
		callback 	= NULL

		if Utils.isFunction(arguments[1])
			callback = arguments[1]
		else if Utils.isFunction(arguments[2])
			callback = arguments[2]
		else if Utils.isFunction(arguments[3])
			callback = arguments[3]

		if not @_states.hasOwnProperty(stateName) then throw Error "No such state: '#{stateName}'"
		@emit(Event.StateWillSwitch, @_currentState, stateName, @)
		@_previousStates.push(@_currentState)
		@_currentState 	= stateName
		properties 		= {}
		animatingKeys = @animatingKeys()

		for propertyName, value of @_states[stateName]
			if propertyName in ViewStatesIgnoredKeys
				continue
			if propertyName not in animatingKeys
				continue
			value = value.call(@view, @view, propertyName, stateName) if Utils.isFunction(value)
			properties[propertyName] = value

		animatablePropertyKeys = []
		for k, v of properties
			if Utils.isNumber(v)
				animatablePropertyKeys.push(k)
			else if Color.isColorObject(v)
				animatablePropertyKeys.push(k)
			else if v == null
				animatablePropertyKeys.push(k)

		if animatablePropertyKeys.length == 0 then instant = true

		if instant is true
			@view.props = properties
			@emit Event.StateDidSwitch, Utils.last(@_previousStates), @_currentState, @
		else
			animationOptions ?= @animationOptions
			animationOptions.properties = properties

			@_animation?.stop()
			@_animation = @view.animate animationOptions
			@_animation.once "stop", =>
				for k, v of properties
					@view[k] = v unless Utils.isNumber(v) or Color.isColorObject(v)
				if callback
					callback Utils.last(@_previousStates), @_currentState, @
				@emit(Event.StateDidSwitch, Utils.last(@_previousStates), @_currentState, @) unless Utils.last(@_previousStates) is stateName


	switchInstant: (stateName, callback) ->
		@switch stateName, null, true, callback

	@define "state", 	get: -> @_currentState
	@define "current", 	get: -> @_currentState
	@define "all", 		get: -> Utils.clone(@_orderedStates)

	states: ->
		Utils.clone @_orderedStates

	animatingKeys: ->
		keys = []
		for stateName, state of @_states
			keys = Utils.union(keys, Utils.keys(state))
		keys

	previous: (states, animationOptions) ->
		args 		= arguments
		last 		= Utils.last(args)
		callback 	= NULL

		if Utils.isFunction(last)
			args = Array.prototype.slice.call(arguments);
			callback = args.pop()
			if states is callback
				states = NULL
			if animationOptions is callback
				animationOptions = {}
		states ?= @states()
		@switch Utils.arrayPrev(states, @_currentState), animationOptions, callback

	next: ->
		args 		= arguments
		last 		= Utils.last(args)
		callback 	= NULL
		that 		= this

		if Utils.isFunction(last)
			args = Array.prototype.slice.call(arguments);
			callback = args.pop()
		states = Utils.arrayFromArguments args
		if not states.length
			states 	= @states()
			index 	= states.indexOf(@_currentState)
			if index+1 > states.length
				states = [states[0]]
			else
				states = [states[index+1]]
		@switch Utils.arrayNext(states, @_currentState), ->
			states.shift()
			if states.length > 0
				if callback
					that.next states, callback
				else
					that.next states
			else if callback
				callback()

	last: (animationOptions) ->

		args = arguments
		last = Utils.last(args)
		callback = NULL
		state = NULL

		if Utils.isFunction(last)
			args 				= Array.prototype.slice.call(arguments);
			callback 			= args.pop()
			animationOptions 	= {} if animationOptions is callback
		if not @_previousStates.length
			state = @states()
		else
			state = @_previousStates
		@switch Utils.last(state), animationOptions, callback

	emit: (args...) ->
		super
		@view.emit args...

	@filterStateProperties = (properties) ->
		stateProperties = {}
		for k, v of properties
			if Utils.isString(v) and Utils.endsWith(k.toLowerCase(),"color") and Color.isColorString(v)
				stateProperties[k] = new Color(v)
			else if Utils.isNumber(v) or Utils.isFunction(v) or Utils.isBoolean(v) or Utils.isString(v) or Color.isColorObject(v) or v == null
				stateProperties[k] = v
		return stateProperties
