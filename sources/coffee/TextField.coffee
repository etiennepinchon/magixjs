# *********************************
# *********************************
# TextField.js
# *********************************
# ** By Etienne Pinchon
# ** ©2016

class TextField extends Text
	constructor: (properties) ->
		super

	_kind : 'TextField'
	_elementType : 'input'


	##############################################################
	# Properties


	@define 'text',
		configurable: true
		get: ->
			@_element.value
		set: (value) ->
			@_element.value = value
			@emit 'change:text', value
			return

	# Alias of text
	@define 'value',
		configurable: true
		get: ->
			@text
		set: (value) ->
			@text = value
			@emit 'change:value', value
			return

	@define 'val',
		configurable: true
		get: -> @value
		set: (value) -> @value = value


	# *********************************


	@define 'placeholder',
		get: ->
			@_element.getAttribute 'placeholder'
		set: (value) ->
			@_element.setAttribute 'placeholder', value
			return


	# *********************************


	@define 'secure',
		get: ->
			if @_secureTextEntry is undefined
				@_secureTextEntry = false
			@_secureTextEntry
		set: (value) ->
			if value is true
				@_secureTextEntry = true
				@_element.setAttribute 'type', 'password'
			else
				@_secureTextEntry = false
				@_element.setAttribute 'type', 'text'
			return


	# *********************************


	@define 'maxlength',
		get: ->
			if @_maxlength is undefined
				@_maxlength = 0
			@_maxlength
		set: (value) ->
			@_maxlength = value
			@_element.setAttribute 'maxlength', value
			return


	@define 'limit',
		get: ->
			@limit
		set: (value) ->
			@maxlength = value
			return


	# *********************************

	@define 'readonly',
		get: ->
			if @_readonly is undefined
				@_readonly = true
			@_readonly
		set: (value) ->
			if value is true
				@_readonly = true
				@_element.setAttribute 'readonly', 'on'
			else
				@_readonly = false
				@_element.setAttribute 'readonly', 'off'
			return

	@define 'autocomplete',
		get: ->
			if @_autocomplete is undefined
				@_autocomplete = true
			@_autocomplete
		set: (value) ->
			if value is true
				@_autocomplete = true
				@_element.setAttribute 'autocomplete', 'on'
			else
				@_autocomplete = false
				@_element.setAttribute 'autocomplete', 'off'
			return


	@define 'autocorrect',
		get: ->
			if @_autocorrect is undefined
				@_autocorrect = true
			@_autocorrect
		set: (value) ->
			if value is true
				@_autocorrecte = true
				@_element.setAttribute 'autocorrect', 'on'
			else
				@_autocorrect = false
				@_element.setAttribute 'autocorrect', 'off'
			return


	@define 'autocapitalize',
		get: ->
			if @_autocapitalize is undefined
				@_autocapitalize = true
			@_autocapitalize
		set: (value) ->
			if value is true
				@_autocapitalize = true
				@_element.setAttribute 'autocapitalize', 'on'
			else
				@_autocapitalize = false
				@_element.setAttribute 'autocapitalize', 'off'
			return


	@define 'spellcheck',
		get: ->
			if @_spellcheck is undefined
				@_spellcheck = true
			@_spellcheck
		set: (value) ->
			if value is true
				@_spellcheck = true
				@_element.setAttribute 'spellcheck', 'true'
			else
				@_spellcheck = false
				@_element.setAttribute 'spellcheck', 'false'
			return

			
TextField::focus = ->
	@_element.focus()
	return

TextField::resignFocus = ->
	@_element.blur()
	return

TextField::select = ->
	@_element.select()
	return

TextField::empty = ->
	@value = ''
	return

# Keyboard Events
TextField::onKeyDown = (cb) -> @on Event.KeyDown, cb
TextField::onKeyPress = (cb) -> @on Event.KeyPress, cb
TextField::onKeyUp = (cb) -> @on Event.KeyUp, cb

# Form Events
TextField::onFocus = (cb) -> @on Event.Focus, cb
TextField::onResignFocus = (cb) -> @on Event.ResignFocus, cb
TextField::onBlur = (cb) -> @on Event.ResignFocus, cb
TextField::onChange = (cb) -> @on Event.Change, cb
TextField::onWillFocus = (cb) -> @on Event.WillFocus, cb
TextField::onWillResignFocus = (cb) -> @on Event.WillResignFocus, cb
TextField::onInput = (cb) -> @on Event.Input, cb
TextField::onSelect = (cb) -> @on Event.Select, cb




