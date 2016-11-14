
# Dropdown

class Dropdown extends View

	_kind 			: 'Dropdown'
	_elementType 	: 'select'

	##############################################################
	# PROPERTIES

	@define 'options',
		get: ->
			if @_options is NULL
				@_options = {}
			@_options
		set: (value) ->
			return no if not Utils.isObject(value)
			
			@_options = value
			
			for optionKey of value
				if optionKey isnt NULL
					option = document.createElement('option')
					option.text = value[optionKey]
					if value[optionKey].value isnt NULL
						option.setAttribute 'value', optionKey
					@_element.add option
	@define 'enabled',
		get: ->
			@_enabled = yes if @_enabled is NULL
			@_enabled
		set: (value) ->
			if value is yes
				@_enabled = value
				@_element.disabled = no
			else
				@_enabled = no
				@_element.disabled = yes
			return
	@define 'value',
		get: -> @_element.options[@_element.selectedIndex].value
		set: (value) ->
			@_element.value = value
			return

	##############################################################
	# METHODS

	focus : ->
		@_element.setAttribute 'autofocus', 'autofocus'
		return
	resignFocus : ->
		@_element.removeAttribute 'autofocus'
		return
	onFocus : (cb) ->
		@on Event.Focus, cb
		return
	onResignFocus : (cb) ->
		@on Event.ResignFocus, cb
		return
	onBlur : (cb) ->
		@on Event.Blur, cb
		return
	onChange : (cb) ->
		@on Event.Change, cb
		return
