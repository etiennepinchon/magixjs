# *********************************
# *********************************
# FileField
# *********************************
# ** By Etienne Pinchon
# ** ©2016

class FileField extends View
	constructor: (properties) ->
		super
	
		@_element.setAttribute 'type', 'file'
		@_element.setAttribute 'tabindex', '1'

	_kind : 'FileField'
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
			


FileField::focus = ->
	@_element.focus()
	return

FileField::resignFocus = ->
	@_element.blur()
	return

FileField::open = ->
	@_element.click()
	return

# Form Events
FileField::onFocus = (cb) ->
  @on Event.Focus, cb

FileField::onResignFocus = (cb) ->
  @on Event.ResignFocus, cb

FileField::onBlur = (cb) ->
  @on Event.Blur, cb

FileField::onChange = (cb) ->
  @on Event.Change, cb

FileField::onWillFocus = (cb) ->
  @on Event.WillFocus, cb

FileField::onWillResignFocus = (cb) ->
  @on Event.WillResignFocus, cb