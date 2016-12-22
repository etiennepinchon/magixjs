class Context extends Element
	
	constructor: (options) ->
		super

		if not options
			options = {}
	
			#options = Defaults.get('Context', options)

			# Set the default properties
			#@props App.defaults.Context

		if not options.name
			throw Error('Context: name required.')
		
		# *********************************

		@_parent = options.parent
		@_name = options.name
		@perspective = options.perspective
		@perspectiveOriginX = options.perspectiveOriginX
		@perspectiveOriginY = options.perspectiveOriginY
		@reset()

	reset: ->

		@_createDOMEventManager()
		@_createRootElement()

		@resetViews()
		@resetAnimations()
		@resetTimers()
		@resetIntervals()

		@emit("reset", @)

	# destroy: ->
	# 	@reset()

	@define "parent",
		get: -> @_parent

	@define "element",
		get: -> @_element


	##############################################################
	# Collections

	# Views
	@define "views", get: -> Utils.clone(@_views)
	@define "viewCounter", get: -> @_viewCounter

	addView: (view) ->
		return if view in @_views
		@_viewCounter++
		@_views.push(view)

	removeView: (view) ->
		@_views = Utils.without(@_views, view)

	resetViews: ->
		@resetGesture()
		@_views = []
		@_viewCounter = 0


	##############################################################
	# Animations

	@define "animations", get: -> Utils.clone(@_animations)

	addAnimation: (animation) ->
		return if animation in @_animations
		@_animations.push(animation)

	removeAnimation: (animation) ->
		@_animations = Utils.without(@_animations, animation)

	resetAnimations: ->
		@stopAnimations()
		@_animations = []

	stopAnimations: ->
		return unless @_animations
		@_animations.map (animation) -> animation.stop(true)

	##############################################################
	# Timers

	@define "timers", get: -> Utils.clone(@_timers)

	addTimer: (timer) ->
		return if timer in @_timers
		@_timers.push(timer)

	removeTimer: (timer) ->
		@_timers = Utils.without(@_timers, timer)

	resetTimers: ->
		@_timers.map(window.clearTimeout) if @_timers
		@_timers = []

	##############################################################
	# Intervals

	@define "intervals", get: -> Utils.clone(@_intervals)

	addInterval: (interval) ->
		return if interval in @_intervals
		@_intervals.push(interval)

	removeInterval: (interval) ->
		@_intervals = Utils.without(@_intervals, interval)

	resetIntervals: ->
		@_intervals.map(window.clearInterval) if @_intervals
		@_intervals = []

	# Gesture
	resetGesture: ->
		return unless @_views
		for view in @_views
			if view._gestures
				view._gestures.destroy()

		return

	###
	##############################################################
	# Run
	###
	run: (fn) ->
		previousContext = Framer.CurrentContext
		Framer.CurrentContext = @
		fn()
		Framer.CurrentContext = previousContext
	###


	# Remove all events from a context
	freeze: ->
		if @_frozenEvents?
			throw new Error "Context is already frozen"

		@_frozenEvents = {}

		# Loop through the views in the context
		for view in @_views

			viewListeners = {}

			# Loop through the listener inside the views
			for eventName in view.listenerEvents()
				viewListeners[eventName] = view.listeners(eventName)

			# Remove all the listerner
			view.removeAllListeners()
			viewId = @_views.indexOf(view)

			# Insert the view in the frozen array
			@_frozenEvents[viewId] = viewListeners


		# Stop the animations, timers and intervals
		@stopAnimations()

		# TODO: It would be nice to continue at least intervals after a resume
		@resetTimers()
		@resetIntervals()



	# Re-add listerners to events
	resume: ->
		if not @_frozenEvents?
			throw new Error "Context is not frozen, cannot resume"

		# Loop through the frozen views
		for viewId, events of @_frozenEvents
			view = @_views[viewId]

			# Loop through the events name inside each views
			for eventName, listeners of events

				# Listen to each event again
				for listener in listeners
					view.on(eventName, listener)

		# Remove the frozen array
		delete @_frozenEvents


	##############################################################
	# DOM


	# Create a DOMEventManager inside the context

	# This manages all dom events for any node in this context centrally,
	# so we can clean them up on a reset, avoiding memory leaks and whatnot.

	_createDOMEventManager: ->
		if @domEventManager
			@domEventManager.reset()
		@domEventManager = new DOMEventManager


	# Create context

	# Everything under the context lives in a single div that we either insert
	# directly on the root, or attach to the parent view. The element append
	# can be pending if the document isn't ready yet.

	_createRootElement: ->

		@_destroyRootElement()
		
		@_element = document.createElement('div')
		@_element.id = 'MagiXRoot'
		@_element.setAttribute "name", @_name
		@_element.style['perspective'] = @perspective
		@_element.style['backgroundColor'] = @backgroundColor
		
		# Once the dom is loaded insert element inside document body
		@__pendingElementMagiXnd = =>
			parentElement = @_parent?._element
			parentElement ?= document.body
			parentElement.appendChild(@_element)

		# Add call back to dom completion method
		Utils.domComplete @__pendingElementMagiXnd


	# Remove older root element
	_destroyRootElement: ->
		# If element and parent exist, remove child
		if @_element and @_element.parentNode
			@_element.parentNode.removeChild @_element
		
		# Remove append callback from dom completion method
		if @__pendingElementMagiXnd
			Utils.domCompleteCancel @__pendingElementMagiXnd
			@__pendingElementMagiXnd = undefined
		
		@_element = undefined

	

	##############################################################
	# Geometry

	# Remember the context doesn't really have height. These are just a reference
	# to it's parent or document.

	@define "width",
		get: ->
			return @parent.width if @parent?
			return window.innerWidth

	@define "height",
		get: ->
			return @parent.height if @parent?
			return window.innerHeight

	@define "frame", get: -> {x:0, y:0, width:@width, height:@height}
	@define "size",  get: -> Utils.pick(@frame, ["width", "height"])
	@define "point", get: -> Utils.pick(@frame, ["x", "y"])
	@define "canvasFrame",
		get: ->
			return @frame if not @parent?
			return @parent.canvasFrame

	@define "backgroundColor",
		get: ->
			return @_backgroundColor if Color.isColor(@_backgroundColor)
			return "transparent"
		set: (value) ->
			if Color.isColor(value)
				@_backgroundColor = value
				@_element?.style["backgroundColor"] = new Color value.toString()

	@define "perspective",
		get: ->
			return @_perspective
		set: (value) ->
			if Utils.isNumber(value)
				@_perspective = value
				@_element?.style["perspective"] = @_perspective

	_updatePerspective: ->
		@_element?.style["perspectiveOrigin"] = "#{@perspectiveOriginX * 100}% #{@perspectiveOriginY * 100}%"

	@define "perspectiveOriginX",
		get: ->
			return @_perspectiveOriginX if Utils.isNumber(@_perspectiveOriginX)
			return 0.5
		set: (value) ->
			if Utils.isNumber(value)
				@_perspectiveOriginX = value
				@_updatePerspective()

	@define "perspectiveOriginY",
		get: ->
				return @_perspectiveOriginY if Utils.isNumber(@_perspectiveOriginY)
				return .5
		set: (value) ->
			if Utils.isNumber(value)
				@_perspectiveOriginY = value
				@_updatePerspective()


	toInspect: ->

		round = (value) ->
			if parseInt(value) == value
				return parseInt(value)
			return Utils.round(value, 1)

		return "<Context id:#{@id} name:#{@_name} #{round(@width)}x#{round(@height)}>"











