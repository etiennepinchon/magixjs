# *********************************
# *********************************
# ProgressBar
# *********************************
# ** By Etienne Pinchon
# ** ©2016

class ProgressBar extends Slider
	constructor: (properties) ->

		properties.noknob = true
		
		super
		
		# Remove the knob
		@removeChild @knob

		if properties.value is undefined
		  @value = 0.5
		
	_kind: 'ProgressBar'
	