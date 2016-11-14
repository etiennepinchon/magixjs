
# Button

class Button extends Text

	_kind 			: 'Button'
	_elementType 	: 'button'
	
	##############################################################
	# PROPERTIES

	# Set an icon image in the button
	# myButton.icon = "URL";
	@define 'icon',
		get: ->
			@image
		set: (value) ->
			@backgroundColor = 'none'
			@image = value
			@imagePosition = 'center center'
			@imageSize = '100% 100%'
			@imageRepeat = false
			@padding = 0
			return

	focus : ->
		@_element.focus()
		return
	resignFocus : ->
		@_element.blur()
		return