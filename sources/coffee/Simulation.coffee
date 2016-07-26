Event.SimulationStart = 'simulationStart'
Event.SimulationStep = 'simulationStep'
Event.SimulationStop = 'simulationStop'

SimulatorClasses =
	"spring": SpringSimulator
	"friction": FrictionSimulator
	"inertial-scroll": MomentumBounceSimulator

class Simulation extends Element

	constructor: (options={}) ->

		#options = Defaults.get "Simulation", options

		super options

		@options = Utils.defaults options,
			view: null
			properties: {}
			model: "spring"
			modelOptions: {}
			delay: 0
			debug: false

		@_running = false

		SimulatorClass = SimulatorClasses[@options.model] or SpringSimulator

		@_simulator = new SimulatorClass @options.modelOptions

	# Though properties aren't modified directly by the simulation, it's still
	# necessary to return them so that conflicting animations/simulations can
	# detect one another and not run at the same time.
	animatingProperties: ->
		Utils.keys(@options.properties)

	start: =>

		if @options.view is null
			console.error "Simulation: missing view"

		if @options.debug
			console.log "Simulation.start #{@_simulator.constructor.name}", @options.modelOptions

		animatingProperties = @animatingProperties()
		for property, animation of @options.view.animatingProperties()
			if property in animatingProperties
				animation.stop()

		if @options.delay
			Utils.delay(@options.delay, @_start)
		else
			@_start()

		return true

	stop: (emit=true)->
		return unless @_running

		@_running = false

		@options.view.context.removeAnimation(@)

		@emit(Event.SimulationStop) if emit
		App.Loop.off("update", @_update)

	# copy: -> return new Simulation(Utils.clone(@options))

	emit: (event) ->
		super
		# Also emit this to the view with self as argument
		@options.view.emit(event, @)

	_start: =>
		return if @_running

		@_running = true

		@options.view.context.addAnimation(@)

		@emit(Event.SimulationStart)
		App.Loop.on("update", @_update)

	_update: (delta) =>
		if @_simulator.finished()
			@stop(emit=false)
			@emit("end")
			@emit(Event.SimulationStop)
		else
			result = @_simulator.next(delta)
			@emit(Event.SimulationStep, result, delta)

	##############################################################
	# Passthrough to simulator

	@define "simulator",
		get: -> @_simulator

	finished: -> @_simulator.finished()
