# *********************************
# *********************************
# Dropdown.js
# *********************************
# ** By Etienne Pinchon
# ** ©2016

###
	d = new Dropdown
		options:
			'one': 'Select one'
			'two': 'Select two'
			'tree': 'Select tree'
			'four': 'Select four'
		parent: @

	d.onChange (e)->
		console.log @value
###

class Dropdown extends View
	constructor: (properties) ->
		super

	_kind : 'Dropdown'
	_elementType : 'select'

	##############################################################
	# Properties

	@define 'options',
		get: ->
			if @_options is undefined
				@_options = {}
			@_options
		set: (value) ->
			return false if not Utils.isObject(value)
			
			@_options = value
			
			for optionKey of value
				if optionKey isnt undefined
					option = document.createElement('option')
					option.text = value[optionKey]
					
					if value[optionKey].value isnt undefined
						option.setAttribute 'value', optionKey
					
					@_element.add option

	# *********************************

	@define 'enabled',
		get: ->
			if @_enabled is undefined
				@_enabled = true
			@_enabled
		set: (value) ->
			if value is true
				@_enabled = value
				@_element.disabled = false
			else
				@_enabled = false
				@_element.disabled = true
			return

	# *********************************

	@define 'value',
		get: ->
			@_element.options[@_element.selectedIndex].value
		set: (value) ->
			@_element.value = value


Dropdown::focus = ->
	@_element.setAttribute 'autofocus', 'autofocus'
	return

Dropdown::resignFocus = ->
	@_element.removeAttribute 'autofocus'
	return

# Form Events
Dropdown::onFocus = (cb) ->
  @on Event.Focus, cb

Dropdown::onResignFocus = (cb) ->
  @on Event.ResignFocus, cb

Dropdown::onBlur = (cb) ->
  @on Event.Blur, cb

Dropdown::onChange = (cb) ->
  @on Event.Change, cb


