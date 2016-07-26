ViewStatesIgnoredKeys = ["ignoreEvent"]

###

myPview.states.add
    stateA:
        x: 500
        opacity: 0.5
 
    stateB:
        y: 200
        x: 0
        opacity: 1

myPview.states.last(curve: "spring(400, 30, 0)", -> console.log 'nice')

###
class ViewStates extends Element

	constructor: (@view) ->

		@_states = {}
		@_orderedStates = []

		@animationOptions = {}

		# Always add the default state as the current
		@add "default", @view.props

		@_currentState = "default"
		@_previousStates = []

		super

	add: (stateName, properties) ->

		# We also allow an object with states to be passed in
		# like: view.states.add({stateA: {...}, stateB: {...}})
		if Utils.isObject(stateName)
			for k, v of stateName
				@add(k, v)
			return

		error = -> throw Error "Usage example: view.states.add(\"someName\", {x:500})"
		error() if not Utils.isString stateName
		error() if not Utils.isObject properties

		# Add a state with a name and properties
		@_orderedStates.push stateName
		@_states[stateName] = ViewStates.filterStateProperties(properties)

	remove: (stateName) ->

		if not @_states.hasOwnProperty stateName
			return

		delete @_states[stateName]
		@_orderedStates = Utils.without @_orderedStates, stateName

	switch: (stateName, animationOptions, instant=false) ->

		args = arguments
		callback = undefined

		if Utils.isFunction(arguments[1])
			callback = arguments[1]
		else if Utils.isFunction(arguments[2])
			callback = arguments[2]
		else if Utils.isFunction(arguments[3])
			callback = arguments[3]

		# Switches to a specific state. If animationOptions are
		# given use those, otherwise the default options.

		# We actually do want to allow this. A state can be set to something
		# that does not equal the property values for that state.

		# if stateName is @_currentState
		# 	return

		if not @_states.hasOwnProperty(stateName)
			throw Error "No such state: '#{stateName}'"

		@emit(Event.StateWillSwitch, @_currentState, stateName, @)

		@_previousStates.push(@_currentState)
		@_currentState = stateName

		properties = {}
		animatingKeys = @animatingKeys()

		for propertyName, value of @_states[stateName]

			# Don't animate ignored properties
			if propertyName in ViewStatesIgnoredKeys
				continue

			if propertyName not in animatingKeys
				continue

			# Allow dynamic properties as functions
			value = value.call(@view, @view, propertyName, stateName) if Utils.isFunction(value)
			# Set the new value
			properties[propertyName] = value

		# If we are only transitioning to non-animatable (numeric) properties
		# we fallback to an instant switch
		animatablePropertyKeys = []

		for k, v of properties
			if Utils.isNumber(v)
				animatablePropertyKeys.push(k)
			else if Color.isColorObject(v)
				animatablePropertyKeys.push(k)
			else if v == null
				animatablePropertyKeys.push(k)

		if animatablePropertyKeys.length == 0
			instant = true

		if instant is true
			# We want to switch immediately without animation
			@view.props = properties
			@emit Event.StateDidSwitch, Utils.last(@_previousStates), @_currentState, @

		else
			# Start the animation and update the state when finished
			animationOptions ?= @animationOptions
			animationOptions.properties = properties

			@_animation?.stop()
			@_animation = @view.animate animationOptions
			@_animation.once "stop", =>

				# Set all the values for keys that we couldn't animate
				for k, v of properties
					@view[k] = v unless Utils.isNumber(v) or Color.isColorObject(v)

				if callback
					callback Utils.last(@_previousStates), @_currentState, @

				@emit(Event.StateDidSwitch, Utils.last(@_previousStates), @_currentState, @) unless Utils.last(@_previousStates) is stateName



	switchInstant: (stateName, callback) ->
		@switch stateName, null, true, callback

	@define "state", get: -> @_currentState
	@define "current", get: -> @_currentState
	@define "all", get: -> Utils.clone(@_orderedStates)

	states: ->
		# Return a list of all the possible states
		Utils.clone @_orderedStates

	animatingKeys: ->

		# Get a list of all the propeties controlled by states

		keys = []

		for stateName, state of @_states
			keys = Utils.union(keys, Utils.keys(state))

		keys

	previous: (states, animationOptions) ->

		args = arguments
		last = Utils.last(args)
		callback = undefined

		if Utils.isFunction(last)
			args = Array.prototype.slice.call(arguments);
			callback = args.pop()
			if states is callback
				states = undefined
			if animationOptions is callback
				animationOptions = {}

		# Go to previous state in list
		states ?= @states()
		@switch Utils.arrayPrev(states, @_currentState), animationOptions, callback

	next: ->
		args = arguments
		
		last = Utils.last(args)
		callback = undefined

		if Utils.isFunction(last)
			args = Array.prototype.slice.call(arguments);
			callback = args.pop()
		
		# TODO: maybe add animationOptions
		states = Utils.arrayFromArguments args

		if not states.length
			states = @states()

			index = states.indexOf(@_currentState)
			if index+1 > states.length
				states = [states[0]]
			else
				states = [states[index+1]]

		that = this

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
		callback = undefined

		if Utils.isFunction(last)
			args = Array.prototype.slice.call(arguments);
			callback = args.pop()
			if animationOptions is callback
				animationOptions = {}

		state = undefined
		# Return to last state
		if not @_previousStates.length
			state = @states()
		else
			state = @_previousStates

		@switch Utils.last(state), animationOptions, callback

	emit: (args...) ->
		super
		# Also emit this to the view with self as argument
		@view.emit args...

	@filterStateProperties = (properties) ->

		stateProperties = {}

		# TODO: Maybe we want to support advanced data structures like objects in the future too.
		for k, v of properties
			# We check if the property name ends with color, because we don't want
			# to convert every string that looks like a Color, like the html property containing "add"
			if Utils.isString(v) and Utils.endsWith(k.toLowerCase(),"color") and Color.isColorString(v)
				stateProperties[k] = new Color(v)
			else if Utils.isNumber(v) or Utils.isFunction(v) or Utils.isBoolean(v) or Utils.isString(v) or Color.isColorObject(v) or v == null
				stateProperties[k] = v

		return stateProperties
