
# Special cases
Event.DragSessionStart      = "dragsessionstart"
Event.DragSessionMove       = "dragsessionmove"
Event.DragSessionEnd        = "dragsessionend"

# Add deprecated aliases
Event.DragAnimationDidStart = Event.DragAnimationStart
Event.DragAnimationDidEnd = Event.DragAnimationEnd
Event.DirectionLockDidStart = Event.DirectionLockStart

"""

    ┌──────┐                   │
    │      │
    │      │  ───────────────▶ │ ◀────▶
    │      │
    └──────┘                   │

    ════════  ═════════════════ ═══════

      Drag         Momentum      Bounce

"""

class ViewDraggable extends Element

	@define "speedX", @simpleProperty("speedX", 1)
	@define "speedY", @simpleProperty("speedY", 1)

	@define "horizontal", @simpleProperty("horizontal", true)
	@define "vertical", @simpleProperty("vertical", true)

	@define "momentumVelocityMultiplier", @simpleProperty("momentumVelocityMultiplier", 800)
	@define "directionLock", @simpleProperty("directionLock", false)
	@define "directionLockThreshold", @simpleProperty("directionLockThreshold", {x:10, y:10})
	@define "propagateEvent", @simpleProperty("propagateEvent", true)

	@define "constraints",
		get: -> @_constraints
		set: (value) ->
			if value and Utils.isObject(value)
				value = Utils.pick(value, ["x", "y", "width", "height"])
				value = Utils.defaults(value, {x:0, y:0, width:0, height:0})
				@_constraints = value
			else
				@_constraints = {x:0, y:0, width:0, height:0}
			@_updateSimulationConstraints(@_constraints) if @_constraints

	# The isDragging only is true when there was actual movement, so you can
	# use it to determine a click from a drag event.
	@define "isDragging", get: -> @_isDragging or false
	@define "isAnimating", get: -> @_isAnimating or false
	@define "isMoving", get: -> @_isMoving or false

	@define "viewStartPoint", get: -> @_viewStartPoint or @view.point
	@define "cursorStartPoint", get: -> @_cursorStartPoint or {x:0, y:0}
	@define "viewCursorOffset", get: -> @_viewCursorOffset or {x:0, y:0}

	@define "offset",
		get: ->
			return {x:0, y:0} if not @_correctedViewStartPoint
			return offset =
				x: @view.x - @_correctedViewStartPoint.x
				y: @view.y - @_correctedViewStartPoint.y

	constructor: (@view) ->

		options = Defaults.get("ViewDraggable", {})

		super options

		Utils.extend(@, options)

		@enabled = true

		# TODO: will have to change panRecognizer's horizontal/vertical etc
		# when they are changed on the ViewDraggable
		# @_panRecognizer = new PanRecognizer @eventBuffer

		@_eventBuffer = new EventBuffer
		@_constraints = null
		@_ignoreUpdateViewPosition = true

		@attach()

	attach: ->
		#@view.on(Event.Down, @touchStart)
		@view.on(Gesture.TapStart, @touchStart)
		#@view.on(Gesture.Pan, @_touchMove)
		#@view.on(Gesture.TapEnd, @_touchEnd)

		@view.on("change:x", @_updateViewPosition)
		@view.on("change:y", @_updateViewPosition)

	remove: ->
		@view.off(Gesture.TapStart, @touchStart)
		@view.off(Gesture.Pan, @_touchMove)
		@view.off(Gesture.PanEnd, @_touchEnd)

	updatePosition: (point) ->
		# Override this to add your own behaviour to the update position
		return point

	touchStart: (event) =>
	
		# We expose this publicly so you can start the dragging from an external event
		# this is for example needed with the slider.
		@_touchStart(event)

	_updateViewPosition: =>
		# This updates the view position if it's extrenally changed while
		# a drag is going on at the same time.
		return if @_ignoreUpdateViewPosition is true
		@_point = @view.point

	_touchStart: (event) =>

		Event.wrap(document).addEventListener(Gesture.Pan, @_touchMove)
		Event.wrap(document).addEventListener(Gesture.TapEnd, @_touchEnd)

		# Only reset isMoving if this was not animating when we were clicking
		# so we can use it to detect a click versus a drag.
		@_isMoving = @isAnimating

		# Stop any animations influencing the position, but no others.
		for animation in @view.animations()
			properties = animation.options.properties
			if properties.hasOwnProperty("x") or properties.hasOwnProperty("y")
				animation.stop()

		@_stopSimulation()
		@_resetdirectionLock()

		event.preventDefault()
		event.stopPropagation() if @propagateEvent is false

		# Extract the event (mobile may have multiple)
		touchEvent = Event.touchEvent(event)

		# TODO: we should use the event velocity
		@_eventBuffer.push
			x: touchEvent.clientX
			y: touchEvent.clientY
			t: Date.now()

		# Store original view position
		@_viewStartPoint = @view.point
		@_correctedViewStartPoint = @view.point

		# If we are beyond bounds, we need to correct for the scaled clamping from the last drag,
		# hence the 1 / overdragScale
		if @constraints and @bounce
			@_correctedViewStartPoint = @_constrainPosition(
				@_correctedViewStartPoint, @constraints, 1 / @overdragScale)

		# Store start cursor position
		@_cursorStartPoint =
			x: touchEvent.clientX
			y: touchEvent.clientY

		# Store cursor/view offset
		@_viewCursorOffset =
			x: touchEvent.clientX - @_correctedViewStartPoint.x
			y: touchEvent.clientY - @_correctedViewStartPoint.y

		@_point = @_correctedViewStartPoint
		@_ignoreUpdateViewPosition = false

		@emit(Event.DragSessionStart, event)

	_touchMove: (event) =>

		return unless @enabled

		# If we started dragging from another event we need to capture some initial values
		@touchStart(event) if not @_point

		@_lastEvent = event

		event.preventDefault()
		event.stopPropagation() if @propagateEvent is false

		touchEvent = Event.touchEvent(event)

		@_eventBuffer.push
			x: touchEvent.clientX
			y: touchEvent.clientY
			t: Date.now() # We don't use timeStamp because it's different on Chrome/Safari

		point = Utils.clone(@_point)

		#scaleX = (1 / @view.canvasScaleX() * @view.scale * @view.scaleX)
		#scaleY = (1 / @view.canvasScaleY() * @view.scale * @view.scaleY)

		scaleX = (@view.scale * @view.scaleX)
		scaleY = (@view.scale * @view.scaleY)

		point.x = @_point.x + (event.delta.x * scaleX * @speedX) if @horizontal
		point.y = @_point.y + (event.delta.y * scaleY * @speedY) if @vertical

		# Save the point for the next update so we have the unrounded, unconstrained value
		@_point = Utils.clone(point)

		# Constraints and overdrag
		point = @_constrainPosition(point, @_constraints, @overdragScale) if @_constraints

		# Direction lock
		if @directionLock
			if not @_directionLockEnabledX and not @_directionLockEnabledY

				offset = event.offset
				#offset.x = offset.x * @speedX * (1 / @view.canvasScaleX()) * @view.scaleX * @view.scale
				#offset.y = offset.y * @speedY * (1 / @view.canvasScaleY()) * @view.scaleY * @view.scale

				offset.x = offset.x * @speedX * @view.scaleX * @view.scale
				offset.y = offset.y * @speedY * @view.scaleY * @view.scale

				@_updatedirectionLock(offset)
				return
			else
				point.x = @_viewStartPoint.x if @_directionLockEnabledX
				point.y = @_viewStartPoint.y if @_directionLockEnabledY

		# Update the dragging status
		if point.x isnt @_viewStartPoint.x or point.y isnt @_viewStartPoint.y
			if not @_isDragging
				@_isDragging = true
				@_isMoving = true
				@emit(Event.DragStart, event)

		# Move literally means move. If there is no movement, we do not emit.
		if @isDragging
			@emit(Event.DragWillMove, event)

		# Align every drag to pixels
		if @pixelAlign
			point.x = parseInt(point.x) if @horizontal
			point.y = parseInt(point.y) if @vertical

		# While we update the view position ourselves, we don't want
		# to trigger the updater for external changes.
		@_ignoreUpdateViewPosition = true
		@view.point = @updatePosition(point)
		@_ignoreUpdateViewPosition = false

		if @isDragging
			@emit(Event.Move, @view.point)
			@emit(Event.DragDidMove, event)

		@emit(Event.DragSessionMove, event)

	_touchEnd: (event) =>

		Event.wrap(document).removeEventListener(Gesture.Pan, @_touchMove)
		Event.wrap(document).removeEventListener(Gesture.TapEnd, @_touchEnd)

		event.stopPropagation() if @propagateEvent is false

		# Start the simulation prior to emitting the DragEnd event.
		# This way, if the user calls view.animate on DragEnd, the simulation will
		# be canceled by the user's animation (if the user animates x and/or y).
		@_startSimulation()

		@emit(Event.DragSessionEnd, event)
		@emit(Event.DragEnd, event) if @_isDragging

		# Set _isDragging after DragEnd is fired, so that calls to calculateVelocity()
		# still returns dragging velocity - both in case the user calls calculateVelocity(),
		# (which would return a stale value before the simulation had finished one tick)
		# and because @_start currently calls calculateVelocity().
		@_isDragging = false

		@_ignoreUpdateViewPosition = true


	##############################################################
	# Constraints

	@define "constraintsOffset",
		get: ->
			return {x:0, y:0} unless @constraints
			{minX, maxX, minY, maxY} = @_calculateConstraints(@constraints)
			point = @view.point
			constrainedPoint =
				x: Utils.clamp(point.x, minX, maxX)
				y: Utils.clamp(point.y, minY, maxY)
			offset =
				x: point.x - constrainedPoint.x
				y: point.y - constrainedPoint.y
			return offset

	@define "isBeyondConstraints",
		get: ->
			constraintsOffset = @constraintsOffset
			return true if constraintsOffset.x != 0
			return true if constraintsOffset.y != 0
			return false

	_clampAndScale: (value, min, max, scale) ->
		# TODO: Move to utils? Combine with clamp?
		value = min + (value - min) * scale if value < min
		value = max + (value - max) * scale if value > max
		return value

	_calculateConstraints: (bounds) ->

		if not bounds
			return constraints =
				minX: Infinity
				maxX: Infinity
				minY: Infinity
				maxY: Infinity

		# Correct the constraints if the view size exceeds the constraints
		bounds.width = @view.width if bounds.width < @view.width
		bounds.height = @view.height if bounds.height < @view.height

		#bounds.width = Utils.max([bounds.width, @view.width])

		constraints =
			minX: Utils.frameGetMinX(bounds)
			maxX: Utils.frameGetMaxX(bounds)
			minY: Utils.frameGetMinY(bounds)
			maxY: Utils.frameGetMaxY(bounds)

		# It makes sense to take the dimensions of the object into account
		constraints.maxX -= @view.width
		constraints.maxY -= @view.height

		return constraints

	_constrainPosition: (proposedPoint, bounds, scale) ->

		{minX, maxX, minY, maxY} = @_calculateConstraints(@_constraints)

		if @overdrag
			point =
				x: @_clampAndScale(proposedPoint.x, minX, maxX, scale)
				y: @_clampAndScale(proposedPoint.y, minY, maxY, scale)
		else
			point =
				x: Utils.clamp(proposedPoint.x, minX, maxX)
				y: Utils.clamp(proposedPoint.y, minY, maxY)

		point.x = proposedPoint.x if @speedX == 0 or @horizontal is false
		point.y = proposedPoint.y if @speedY == 0 or @vertical   is false

		return point

	##############################################################
	# Velocity

	@define "velocity",
		get: ->
			return @_calculateSimulationVelocity() if @isAnimating
			return @_eventBuffer.velocity
			return {x:0, y:0}

			# return @_eventBuffer.velocity if @isDragging
			# return @_calculateSimulationVelocity() if @isAnimating
			# return {x:0, y:0}

	@define "angle",
		get: -> @_eventBuffer.angle

	@define "direction",
		get: ->
			# return null if not @isDragging
			velocity = @velocity
			if Math.abs(velocity.x) > Math.abs(velocity.y)
				return "right" if velocity.x > 0
				return "left"
			else
				return "down" if velocity.y > 0
				return "up"

	calculateVelocity: ->
		# Compatibility method
		@velocity

	_calculateSimulationVelocity: ->

		xFinished = @_simulation.x.finished()
		yFinished = @_simulation.y.finished()

		velocity = {x:0, y:0}
		velocity.x = (@_simulation.x.simulator.state.v / @momentumVelocityMultiplier) if not xFinished
		velocity.y = (@_simulation.y.simulator.state.v / @momentumVelocityMultiplier) if not yFinished

		return velocity

	##############################################################
	# Event Handling

	emit: (eventName, event) ->

		# TODO: Add new event properties like position corrected for device

		# Pass this to the view above
		@view.emit(eventName, event)

		super eventName, event

	##############################################################
	# Lock Direction

	_updatedirectionLock: (correctedDelta) ->

		@_directionLockEnabledX = Math.abs(correctedDelta.y) > @directionLockThreshold.y
		@_directionLockEnabledY = Math.abs(correctedDelta.x) > @directionLockThreshold.x

		# TODO: This wasn't working as advertised. We shouls have a way to scroll diagonally
		# if we were sort of moving into both directions equally.

		# xSlightlyPreferred = Math.abs(correctedDelta.y) > @directionLockThreshold.y / 2
		# ySlightlyPreferred = Math.abs(correctedDelta.x) > @directionLockThreshold.x / 2

		# # Allow locking in both directions at the same time
		# @_directionLockEnabledX = @_directionLockEnabledY = true if (xSlightlyPreferred and ySlightlyPreferred)

		if @_directionLockEnabledX or @_directionLockEnabledY
			@emit Event.DirectionLockStart,
				x: @_directionLockEnabledX
				y: @_directionLockEnabledY

	_resetdirectionLock: ->
		@_directionLockEnabledX = false
		@_directionLockEnabledY = false

	##############################################################
	# Inertial scroll simulation

	_setupSimulation: ->
		return if @_simulation

		@_simulation =
			x: @_setupSimulationForAxis("x")
			y: @_setupSimulationForAxis("y")

		@_updateSimulationConstraints(@constraints)

	_setupSimulationForAxis: (axis) ->

		properties = {}
		properties[axis] = true

		simulation = new Simulation
			view: @view
			properties: properties
			model: "inertial-scroll"
			modelOptions:
				momentum: @momentumOptions
				bounce: @bounceOptions

		simulation.on Event.SimulationStep, (state) => @_onSimulationStep(axis, state)
		simulation.on Event.SimulationStop, (state) => @_onSimulationStop(axis, state)
		simulation

	_updateSimulationConstraints: (constraints) ->
		# This is where we let the simulator know about our constraints
		return unless @_simulation
		if constraints
			{minX, maxX, minY, maxY} = @_calculateConstraints(@_constraints)
			@_simulation.x.simulator.options = {min:minX, max:maxX}
			@_simulation.y.simulator.options = {min:minY, max:maxY}
		else
			@_simulation.x.simulator.options = {min:-Infinity, max:+Infinity}
			@_simulation.y.simulator.options = {min:-Infinity, max:+Infinity}

	_onSimulationStep: (axis, state) =>

		return if axis is "x" and @horizontal is false
		return if axis is "y" and @vertical is false

		# The simulation state has x as value, it can look confusing here
		# as we're working with x and y.

		if @constraints
			if @bounce
				delta = state.x - @view[axis]
			else
				{minX, maxX, minY, maxY} = @_calculateConstraints(@_constraints)
				delta = Utils.clamp(state.x, minX, maxX) - @view[axis] if axis is "x"
				delta = Utils.clamp(state.x, minY, maxY) - @view[axis] if axis is "y"
		else
			delta = state.x - @view[axis]

		updatePoint = @view.point
		updatePoint[axis] = updatePoint[axis] + delta if axis is "x"
		updatePoint[axis] = updatePoint[axis] + delta if axis is "y"
		@updatePosition(updatePoint)

		@view[axis] = @updatePosition(updatePoint)[axis]
		@emit(Event.Move, @view.point)

	_onSimulationStop: (axis, state) =>

		return if axis is "x" and @horizontal is false
		return if axis is "y" and @vertical is false
		return unless @_simulation

		# Round the end position to whole pixels
		@view[axis] = parseInt(@view[axis]) if @pixelAlign

		# See if both simulators are stopped
		if @_simulation.x.finished() and @_simulation.y.finished()
			@_stopSimulation()

	_startSimulation: ->

		# The types of simulation that we can have are:
		# 1) Momentum inside constraints
		# 2) Momentum inside constraints to outside constraints bounce
		# 3) Release outside constraints bounce
		# 4) Momentum without constraints

		return unless @momentum or @bounce
		return if @isBeyondConstraints is false and @momentum is false
		return if @isBeyondConstraints is false and @isDragging is false

		# If overdrag is disabled, we need to not have a bounce animation
		# when the cursor is outside of the dragging bounds for an axis.
		{minX, maxX, minY, maxY} = @_calculateConstraints(@_constraints)

		startSimulationX = @overdrag is true or (@view.x > minX and @view.x < maxX)
		startSimulationY = @overdrag is true or (@view.y > minY and @view.y < maxY)

		if startSimulationX is startSimulationY is false
			return

		velocity = @velocity

		#velocityX = velocity.x * @momentumVelocityMultiplier * @speedX * (1 / @view.canvasScaleX()) * @view.scaleX * @view.scale
		#velocityY = velocity.y * @momentumVelocityMultiplier * @speedY * (1 / @view.canvasScaleY()) * @view.scaleY * @view.scale

		velocityX = velocity.x * @momentumVelocityMultiplier * @speedX * @view.scaleX * @view.scale
		velocityY = velocity.y * @momentumVelocityMultiplier * @speedY * @view.scaleY * @view.scale

		@_setupSimulation()
		@_isAnimating = true
		@_isMoving = true

		@_simulation.x.simulator.setState
			x: @view.x
			v: velocityX
		@_simulation.x.start() if startSimulationX

		@_simulation.y.simulator.setState
			x: @view.y
			v: velocityY
		@_simulation.y.start() if startSimulationY

		@emit(Event.DragAnimationStart)

	_stopSimulation: =>
		@_isAnimating = false
		return unless @_simulation
		@_simulation?.x.stop()
		@_simulation?.y.stop()
		@_simulation = null
		@emit(Event.Move, @view.point)
		@emit(Event.DragAnimationEnd)

	animateStop: ->
		@_stopSimulation()

	##############################################################
	## EVENT HELPERS

	onMove: (cb) -> @on(Event.Move, cb)
	onDragStart: (cb) -> @on(Event.DragStart, cb)
	onDragWillMove: (cb) -> @on(Event.DragWillMove, cb)
	onDragMove: (cb) -> @on(Event.DragMove, cb)
	onDragDidMove: (cb) -> @on(Event.DragDidMove, cb)
	onDrag: (cb) -> @on(Event.Drag, cb)
	onDragEnd: (cb) -> @on(Event.DragEnd, cb)
	onDragAnimationStart: (cb) -> @on(Event.DragAnimationStart, cb)
	onDragAnimationEnd: (cb) -> @on(Event.DragAnimationEnd, cb)
	onDirectionLockStart: (cb) -> @on(Event.DirectionLockStart, cb)
