# *********************************
# *********************************
# RadioButton
# *********************************
# ** By Etienne Pinchon
# ** ©2016

###
	myRadioButton = new RadioButton
		text: 'Select me'
		parent: @
	myRadioButton.onChange (e)->
		say @checked
###

class RadioButtonOriginalInput extends View
	constructor: ->
		super
		@element.setAttribute 'type', 'radio'
		@style.verticalAlign = 'middle'

	_elementType : 'input'
	_kind : 'RadioButtonInput'

class RadioButtonInput extends View
	constructor: ->
		super

		@props = 
			width: 18
			height: 18
			padding: 0
			borderRadius: 10
			borderWidth: 1
			borderColor: 'rgba(0, 0, 0, 0.08)'
			backgroundColor: 'white'
			display: 'inline-block'
		@style.float = 'left'

		@dot = new View
			width: 10
			height: 10
			borderRadius: 5
			backgroundColor: '#179afc'
			#transition: true
			opacity: 0
			parent: @
		@dot.absoluteCenter()

		@checked = false

	_kind : 'RadioButtonInput'
	

class RadioButton extends View
	constructor: (properties={}) ->

		##############################################################
		# INPUT
		@input = undefined
		if not properties.original
			properties.original = false
			@input = new RadioButtonInput()
		else
			@input = new RadioButtonOriginalInput()

		@original = properties.original

		##############################################################
		# LABEL
		
		@label = new Text(App.Originals.RadioButton.Text)
		if @original
			@label.fontSize = 12

		##############################################################

		super

		##############################################################

		# Add elements
		@addChild @input
		@addChild @label

		@on Event.Click, (event, view) ->
			return if not @enabled
			@checked = true

	_kind : 'RadioButton'

	##############################################################
	# Properties

	@define 'enabled',
		get: ->
			if @_enabled is undefined
				@_enabled = true
			@_enabled
		set: (value) ->

			if value is true
				@_enabled = true
				if @original
					@input._element.disabled = false
				else
					@input.opacity = 1
			else
				@_enabled = false
				if @original
					@input._element.disabled = true
				else
					@input.opacity = 0.5
			return

	@define 'checked',
		get: ->
			if @original
				@input._element.checked
			else
				@input.checked

		set: (value) ->
			return if value is @input._element.checked

			if value is true

				if value isnt @input.checked or @original
					@emit 'change:value', true
					@emit 'change:checked', true

				if @original
					@input._element.checked = true
				else
					@input.checked = true
					@input.dot.opacity = 1
					if @_group
						if App.__radiobuttons[@_group]
							for item in App.__radiobuttons[@_group]
								if item and item isnt @
									item.checked = false

						#console.log 'radiobuttongroup::' + @_group
						#@emit 'radiobuttongroup::' + @_group, @
			else
				if value isnt @input.checked or @original
					@emit 'change:value', false
					@emit 'change:checked', false

				if @original
					@input._element.checked = false
				else
					@input.checked = false
					@input.dot.opacity = 0
			return

	@define 'text',
		get: ->
			@label.text
		set: (value) ->
			@label.text = value
			@emit 'change:text', value
			return

	@define 'group',
		get: ->
			if @_group is undefined
				@_group = ''
			@_group
		set: (value) ->

			if @_group and not @orignal
				index = App.__radiobuttons[@_group].indexof @
				if index > -1
					App.__radiobuttons[@_group].splice index, 1

			@_group = value
			if @original
				@input._element.setAttribute 'name', value
			else
				App.__radiobuttons = {} if not App.__radiobuttons
				App.__radiobuttons[@_group] = [] if not App.__radiobuttons[@_group]
				App.__radiobuttons[@_group].push @
				
				###
				@on 'radiobuttongroup::' + @_group, (view)->
					console.log @id
					if @ isnt view
						@checked = false
				###

			return

RadioButton::focus = ->
	@input._element.focus()
	return

RadioButton::resignFocus = ->
	@input._element.blur()
	return

# Form Events
RadioButton::onChange = (cb) ->
  @on 'change:value', cb


