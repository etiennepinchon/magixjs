# *********************************
# *********************************
# Button.js
# *********************************
# ** By Etienne Pinchon
# ** ©2016

class Button extends Text
	constructor: (options) ->
		super
	

	_kind : 'Button'
	_elementType : 'button'


	##############################################################
	# Properties

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

Button::focus = ->
	@_element.focus()
	return

Button::resignFocus = ->
	@_element.blur()
	return