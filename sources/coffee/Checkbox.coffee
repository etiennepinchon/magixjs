
# Checkbox

# TODO: Custom property -> bool

class CheckboxInput extends View
	_kind 			: 'CheckboxInput'
	_elementType 	: 'input'

class Checkbox extends View

	_kind : 'Checkbox'

	constructor: (properties) ->
		
		@input = new CheckboxInput()
		@input._element.setAttribute 'type', 'checkbox'
		@input.style.verticalAlign = 'middle'
		@label = new Text(App.Originals.Checkbox.Text)

		super

		that = this
		@addChild @input
		@addChild @label
		@onClick ->
			return if not @enabled
			if that.checked
				that.checked = false
			else
				that.checked = true

	##############################################################
	# PROPERTIES

	@define 'enabled',
		get: ->
			@_enabled = true if @_enabled is NULL
			@_enabled
		set: (value) ->
			if value is true
				@_enabled = true
				@input._element.disabled = false
			else
				@_enabled = false
				@input._element.disabled = true
			return
	@define 'checked',
		get: -> @input._element.checked
		set: (value) ->
			if value is true
				@input._element.checked = true
				@emit 'change:value', true
				@emit 'change:checked', true
			else
				@input._element.checked = false
				@emit 'change:value', false
				@emit 'change:checked', false
			return
	@define 'text',
		get: -> @label.text
		set: (value) ->
			@label.text = value
			return

	##############################################################
	# METHDOS

	focus : ->
		@input._element.focus()
		return
	resignFocus : ->
		@input._element.blur()
		return
	onChange : (cb) ->
	  @on 'change:value', cb
	  return


