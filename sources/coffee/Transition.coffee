# *********************************
# *********************************
# Transition.js
# *********************************
# ** By Etienne Pinchon
# ** ©2016

class Transition extends Element

	_kind : 'Transition'
	
	constructor: (options) ->
		
		if options.duration
			options.time = options.duration

		# Set the default properties
		#@options = App.defaults.Transition

		options = Defaults.get @_kind, options

		super options

		@options = Utils.clone Utils.defaults options,
			properties: {}
			time: 0.3
			delay: 0
			view: null
			curve: 'ease'

		if options
			if options.properties
				@options.properties = options.properties
			else
				@options.properties = {}

			if options.view
				@options.view = options.view

			if options.duration
				@options.duration = options.duration

			if options.delay
				@options.delay = options.delay
				
			if options.curve
				@options.curve = options.curve

Transition::start = (remove) ->
	if @options.view
		# *** CSS Syntax ***
		# animation: name duration timing-function delay iteration-count direction fill-mode play-state;
		@options.view.style.transition = 'all ' + @options.duration + 's ' + @options.curve + ' ' + @options.delay + 's'
	
		@options.view.props = @options.properties
	else
		return

	if not remove
		return
	else
		_view = @options.view
		that = this
		Utils.delay @options.duration, ->
			_view.style.transition = ''
			that.emit 'end'

Transition::disable = ->
	if @options.view
		@options.view.style.transition = 'none'

Transition::remove = ->
	if @options.view
		@options.view.style.transition = ''



	