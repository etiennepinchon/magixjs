
# ProgressBar

class ProgressBar extends Slider
	
	_kind		: 'ProgressBar'

	constructor : (properties) ->
		properties.noknob = yes
		super
		@removeChild @knob
		@value = 0.5 if properties.value is NULL
