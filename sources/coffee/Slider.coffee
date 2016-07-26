Event.SliderValueChange  = "sliderValueChange"

class Knob extends View

	constructor: (options) ->
		super options

	@define "constrained", @simpleProperty("constrained", false)

	#_kind: 'Knob'

class Slider extends View

	constructor: (options={}) ->

		Utils.defaults options,
			backgroundColor: "#ccc"
			borderRadius: 50
			#margin: 15
			clip: false
			width: 300
			height: 10
			value: 0
			knobSize: 30

		# Set some sensible default for the hit area
		options.hitArea ?= options.knobSize

		@knob = new Knob
			backgroundColor: "#fff"
			shadowY: 1, shadowBlur: 3
			shadowColor: "rgba(0,0,0,0.35)"
			name: "knob"

		@fill = new View
			backgroundColor: "#333"
			width: 0, 
			force2d: true
			name: "fill"
			backgroundColor: '#179afc'

		@sliderOverlay = new View
			backgroundColor: null
			name: "sliderOverlay"

		super options

		#@knobSize = options.knobSize
		@knob.parent = @fill.parent = @sliderOverlay.parent = @


		# Set fill initially
		if @width > @height
			@fill.height = @height
		else
			@fill.width = @width

		@fill.borderRadius = @sliderOverlay.borderRadius = @borderRadius

		@knob.draggable.enabled = true
		@knob.draggable.overdrag = false
		@knob.draggable.momentum = true
		@knob.draggable.momentumOptions = {friction: 5, tolerance: 0.25}
		@knob.draggable.bounce = false
		@knob.borderRadius = @knobSize / 2

		# Set value
		if options.value
			@value = options.value

		@_updateFrame()
		@_updateKnob()
		@_updateFill()

		@on("change:frame", @_updateFrame)
		@on("change:borderRadius", @_setRadius)
		@knob.on("change:size", @_updateKnob)
		@knob.on("change:frame", @_updateValue)
		@knob.on("change:frame", @_updateFill)

		if not options.noknob
			@fill.on(Event.TapStart, @_touchStart)
			@fill.on(Event.TapEnd, @_touchEnd)
			@sliderOverlay.on(Event.TapStart, @_touchStart)
			@sliderOverlay.on(Event.TapEnd, @_touchEnd)
		else if options.knobSize
			@knobSize = options.knobSize
		
	_kind: 'Slider'

	_touchStart: (event) =>

		event.preventDefault()

		#offsetX = 0
		#offsetY = 0

		if @width > @height
			@value = @valueForPoint(Event.touchEvent(event).layerX)#@valueForPoint(Event.touchEvent(event).clientX - @x - offsetX) #- @screenScaledFrame().x) / @canvasScaleX() - offsetX
		else
			@value = @valueForPoint(Event.touchEvent(event).layerY)#@valueForPoint(Event.touchEvent(event).clientY - @y - offsetY)# - @screenScaledFrame().y) / @canvasScaleY() - offsetY

		@knob.draggable._touchStart(event)
		@_updateValue()

	_touchEnd: (event) =>
		@_updateValue()

	_updateFill: =>
		if @width > @height
			@fill.width = @knob.midX
		else
			@fill.height = @knob.midY

	_updateKnob: =>
		if @width > @height
			@knob.midX = @fill.width
			@knob.absoluteCenterY()
		else
			@knob.midY = @fill.height
			@knob.absoluteCenterX()

	_updateFrame: =>

		@knob.draggable.constraints =
			x: -@knob.width / 2
			y: -@knob.height / 2
			width: @width + @knob.width
			height: @height + @knob.height

		if @knob.constrained
			@knob.draggable.constraints =
				x: 0
				y: 0
				width: @width
				height: @height

		if @width > @height
			@fill.height = @height
			@knob.absoluteCenterY()
		else
			@fill.width = @width
			@knob.absoluteCenterX()

		if @width > @height
			@knob.draggable.speedY = 0
		else
			@knob.draggable.speedX = 0

		@sliderOverlay.absoluteCenter()


	_setRadius: =>
		radius = @borderRadius
		@fill.style.borderRadius = "#{radius}px 0 0 #{radius}px"

	@define "knobSize",
		get: -> @_knobSize
		set: (value) ->
			@_knobSize = value
			@knob.width = @_knobSize
			@knob.height = @_knobSize
			@_updateFrame()

	@define "hitArea",
		get: ->
			@_hitArea
		set: (value) ->
			@_hitArea = value
			if @width > @height			
				@sliderOverlay.width = @width + @hitArea
				@sliderOverlay.height = @hitArea
			else
				@sliderOverlay.width = @hitArea
				@sliderOverlay.height = @height + @hitArea

	@define "min",
		get: -> @_min or 0
		set: (value) -> @_min = value

	@define "max",
		get: -> @_max or 1
		set: (value) -> @_max = value

	@define "value",
		get: ->
			if @width > @height
				@valueForPoint(@knob.midX)
			else
				@valueForPoint(@knob.midY)

		set: (value) ->
			if @width > @height
				@knob.midX = @pointForValue(value)
			else
				@knob.midY = @pointForValue(value)

			@_updateFill()
			@_updateValue()

	_updateValue: =>
		
		if @_lastUpdatedValue is @value
			return

		@_lastUpdatedValue = @value
		@emit("change:value", @value)
		@emit(Event.SliderValueChange, @value)

	pointForValue: (value) ->

		if @width > @height
			if @knob.constrained
				return Utils.modulate(value, [@min, @max], [0 + (@knob.width / 2), @width - (@knob.width / 2)], true)
			else
				return Utils.modulate(value, [@min, @max], [0 , @width], true)
		else
			if @knob.constrained
				return Utils.modulate(value, [@min, @max], [0 + (@knob.height / 2), @height - (@knob.height / 2)], true)
			else
				return Utils.modulate(value, [@min, @max], [0, @height], true)

	valueForPoint: (value) ->
		if @width > @height
			if @knob.constrained
				return Utils.modulate(value, [0 + (@knob.width / 2), @width - (@knob.width / 2)], [@min, @max], true)
			else
				return Utils.modulate(value, [0, @width], [@min, @max], true)
		else
			if @knob.constrained
				return Utils.modulate(value, [0 + (@knob.height / 2), @height - (@knob.height / 2)], [@min, @max], true)
			else
				return Utils.modulate(value, [0, @height], [@min, @max], true)

	animateToValue: (value, animationOptions={curve:"spring(300,25,0)"}) ->
		if @width > @height
			animationOptions.properties = {x: @pointForValue(value) - (@knob.width/2)}
		else
			animationOptions.properties = {y: @pointForValue(value) - (@knob.height/2)}

		@knob.animate(animationOptions)

	##############################################################
	## EVENT HELPERS

	onValueChange: (cb) -> @on(Event.SliderValueChange, cb)
