
# Image

window._Image = window.Image

class Image extends View
	constructor: (properties) ->
		super

	_kind        : 'Image'
	_elementType : 'img'

	##############################################################
	# PROPERTIES

	@define 'src',
		get: -> @_src
		set: (value) ->
			@_src = value
			@_element.setAttribute 'src', Utils.parseAsset(value)
			return
	@define 'image',
		get: -> @src
		set: (value) ->
			@src = value
			return
	@define 'source',
		get: -> @src
		set: (value) ->
			@src = value
			return
	@define 'url',
		get: -> @src
		set: (value) ->
			@src = value
			return

	# *********************************

	@define 'aspect',
		get: ->
			if @_aspect is undefined
				@_aspect = 'fit'
			@_aspect
		set: (value) ->
			if value is 'fit'
				@props =
					width: 'auto'
					height: 'auto'
					maxWidth: '100%'
					maxHeight: '100%'
				@_aspect = 'fit'
			
			else if value is 'fitCenter'
				@props =
					width: 'auto'
					height: 'auto'
					maxWidth: '100%'
					maxHeight: '100%'
					display: 'block' 
					margin: 'auto' # Center the picture
				@_aspect = 'fitCenter'
			
			else if value is 'fill'
				@props =
					width: '100%'
					height: '100%'
					maxWidth: ''
					maxHeight: ''
				@_aspect = 'fill'
			
			else if value is 'fillWidth'
				@props =
					width: '100%'
					height: 'auto'
					maxWidth: ''
					maxHeight: ''
				@_aspect = 'fillWidth'
			
			else if value is 'fillHeight'
				@props =
					width: 'auto'
					height: '100%'
					maxWidth: ''
					maxHeight: ''
				@_aspect = 'fillHeight'
			
			else if value is 'fillHeightCenter'
				@props =
					width: 'auto'
					height: '100%'
					maxWidth: ''
					maxHeight: ''
					display: 'block'
					margin: 'auto' # Center the picture
				@_aspect = 'fillHeightCenter'

	# Return the original width and heigth
	# READ ONLY
	@define 'original',
		get: ->
			return {
				width  : this.element.naturalWidth
				height : this.element.naturalHeight
			}

	# *********************************
	# Quick event properties properties
	# *********************************
	@define 'loaded',
		get: ->
			return null if @_eventLoaded is undefined
			@_eventLoaded
		set: (value) ->
			return if not value
			@_eventLoaded = value
			@on Event.Load, value
			return

	# *********************************

	@define 'then',
		get: -> @loaded
		set: (value) ->
			@loaded = value
			return

	onLoad : (cb) -> 
		@on Event.Load, cb
		return
	onLoaded : (cb) ->
		@on Event.Load, cb
		return
	onDone : (cb) -> 
		@on Event.Load, cb
		return






