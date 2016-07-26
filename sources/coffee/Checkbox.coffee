# *********************************
# *********************************
# Checkbox.js
# *********************************
# ** By Etienne Pinchon
# ** ©2016

###
	myCheck = new Checkbox
		text: 'Check me'
		parent: @
	myCheck.onChange (e)->
		say @inputed
###

# TODO: Custom property -> bool

class CheckboxInput extends View
	_kind : 'CheckboxInput'
	_elementType : 'input'

class Checkbox extends View
	constructor: (properties) ->
		
		@input = new CheckboxInput()
		@input._element.setAttribute 'type', 'checkbox'
		@input.style.verticalAlign = 'middle'

		@label = new Text(App.Originals.Checkbox.Text)

		super

		_this = this

		@addChild @input
		@addChild @label

		@onClick ->
			return if not @enabled
			if _this.checked
				_this.checked = false
			else
				_this.checked = true

	
	_kind : 'Checkbox'

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
				@input._element.disabled = false
			else
				@_enabled = false
				@input._element.disabled = true
			return

	@define 'checked',
		get: ->
			@input._element.checked
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
		get: ->
			@label.text
		set: (value) ->
			@label.text = value
			return

Checkbox::focus = ->
	@input._element.focus()
	return

Checkbox::resignFocus = ->
	@input._element.blur()
	return

# Form Events
Checkbox::onChange = (cb) ->
  @on 'change:value', cb


