
# FileInput

class FileInput extends View
	constructor: (properties) ->
		super
		@_element.setAttribute 'type', 'file'
		@_element.setAttribute 'tabindex', '1'

	_kind 		 : 'FileInput'
	_elementType : 'input'

	##############################################################
	# Properties

	@define 'accept',
		get: ->
			@_accept
		set: (value) ->
			if typeof value is 'string'
				value = [ value ]
			if typeof value is 'object'
				output = ''
				i = 0
				while i < value.length
					output += value[i]
					if i isnt value.length - 1
						output += ', '
					i++
				@_accept = value
				@_element.setAttribute 'accept', output
			return

	@define 'value', get: ->
		@_element.value

	# *********************************

	# Return the first file selected
	@define 'file', get: ->
		@_element.files[0]

	# *********************************

	# Return all the selected files
	@define 'files', get: ->
		@_element.files


	# Enable/disable multiple files selection
	# default is false
	@define 'multiple', 
		get: ->
			return false if not @_multiple
			@_multiple
		set: (value) ->
			if value is true
				@_multiple = true
				@_element.setAttribute 'multiple', 'multiple'
			else 
				@_multiple = false
				@_element.removeAttribute 'multiple'
			
	focus : ->
		@_element.focus()
		return
	resignFocus : ->
		@_element.blur()
		return
	open : ->
		@_element.click()
		return

	# Form Events
	onFocus : (cb) -> @on Event.Focus, cb
	onResignFocus : (cb) -> @on Event.ResignFocus, cb
	onBlur : (cb) -> @on Event.Blur, cb
	onChange : (cb) -> @on Event.Change, cb
	onWillFocus : (cb) -> @on Event.WillFocus, cb
	onWillResignFocus : (cb) -> @on Event.WillResignFocus, cb
