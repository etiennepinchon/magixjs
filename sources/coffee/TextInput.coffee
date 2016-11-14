
# TextInput

class TextInput extends Text
	constructor: (properties) ->
		if properties and properties.multiline
			@_elementType = 'textarea'
			@_multiline = yes
			@_resizable = yes

		super
		@userInteraction = yes if not properties.userInteraction
		if @_multiline
			@on Event.Input, (event, view) ->
				if not @autoresize
					return
				view.height = 'auto'
				view.height = view.element.scrollHeight
				return

	_kind 		 : 'Input'
	_elementType : 'input'
	_multiline 	 : no

	##############################################################
	# PROPERTIES

	@define 'text',
		configurable: true
		get: ->
			@_element.value
		set: (value) ->
			@_element.innerHTML = value if @_multiline
			@_element.value = value
			@emit 'change:text', value
			return

	# Alias of text
	@define 'value',
		configurable: true
		get: ->
			return @_element.value if @_multiline
			@text
		set: (value) ->
			@_element.innerHTML = value if @_multiline
			@text = value
			@emit 'change:value', value
			return

	@define 'val',
		configurable: true
		get: -> @value
		set: (value) -> @value = value


	# *********************************
	# TO ENABLE MUTILINE

	# default is false
	@define 'multiline', 
		get: ->
			return no if not @multiline
			@multiline
	
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

	##############################################################
	# MULTILINE PROPERTIES

	# *********************************

	@define 'resizable',
		get: ->
			if @_resizable is undefined
				@_resizable = no
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
		@height = @scrollHeight#+2


	focus : ->
		@_element.focus()
		return
	resignFocus : ->
		@_element.blur()
		return
	select : ->
		@_element.select()
		return
	empty : ->
		@value = ''
		return

	# Keyboard Events
	onKeyDown : (cb) -> @on Event.KeyDown, cb
	onKeyPress : (cb) -> @on Event.KeyPress, cb
	onKeyUp : (cb) -> @on Event.KeyUp, cb

	# Form Events
	onFocus : (cb) -> @on Event.Focus, cb
	onResignFocus : (cb) -> @on Event.ResignFocus, cb
	onBlur : (cb) -> @on Event.ResignFocus, cb
	onChange : (cb) -> @on Event.Change, cb
	onWillFocus : (cb) -> @on Event.WillFocus, cb
	onWillResignFocus : (cb) -> @on Event.WillResignFocus, cb
	onInput : (cb) -> @on Event.Input, cb
	onSelect : (cb) -> @on Event.Select, cb

