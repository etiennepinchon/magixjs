# *********************************
# *********************************
# TextView
# *********************************
# ** By Etienne Pinchon
# ** ©2016

class TextView extends TextField
	constructor: (properties) ->
		super

		# *********************************

		@on Event.Input, (event, view) ->
			if not @autoresize
				return
			view.height = 'auto'
			view.height = view.element.scrollHeight
			return

	_kind : 'TextView'
	_elementType : 'textarea'


	##############################################################
	# Properties

	@define 'text',
		get: ->
			@_element.value
		set: (value) ->
			@_element.innerHTML = value
			@_element.value = value
			@emit 'change:text', value
			return


	@define 'value',
		get: ->
			@_element.value
		set: (value) ->
			@_element.innerHTML = value
			@_element.value = value
			@emit 'change:value', value
			return


	# *********************************


	@define 'resizable',
		get: ->
			if @_resizable is undefined
				@_resizable = false
			@_resizable
		set: (value) ->
			if value is true
				@_resizable = true
				if @_resizeDirection is undefined
					@_element.style.resize = ''
				else
					@_element.style.resize = @_resizeDirection
			else
				@_resizable = false
				@_element.style.resize = 'none'
			return


	# Alias
	@define 'resize',
		get: ->
			@resizable
		set: (value) ->
			@resizable = value
			return


	# *********************************


	@define 'resizeDirection',
		get: ->
			if @_resizeDirection is undefined
				if @_resizable
					@_resizeDirection = 'both'
				else
					@_resizeDirection = false
			@_resizeDirection
		set: (value) ->
			if value is 'vertical' or value is 'horizontal'
				@_resizeDirection = value
				if @_resizable
					@_element.style.resize = value
			else
				@_resizeDirection = ''
			return


	# *********************************




	@define 'autoresize',
		get: ->
			if @_autoresize is undefined
				@_autoresize = false
			@_autoresize
		set: (value) ->
			if value is true
				@_autoresize = true
			else
				@_autoresize = false
			return


	# *********************************

	# Will fit the content
	fit : ->
		@height = @scrollHeight+2

