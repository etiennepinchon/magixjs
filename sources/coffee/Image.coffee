# *********************************
# *********************************
# Image.js
# *********************************
# ** By Etienne Pinchon
# ** ©2016

window._Image = window.Image

class Image extends View
	constructor: (properties) ->
		super

	_kind : 'Image'
	_elementType : 'img'

	##############################################################
	# Properties

	@define 'src',
		get: ->
			@_src
		set: (value) ->
			@_src = value
			@_element.setAttribute 'src', Utils.parseAsset(value)
			return

	# Alias
	@define 'image',
		get: ->
			@src
		set: (value) ->
			@src = value
			return

	# Alias
	@define 'source',
		get: ->
			@src
		set: (value) ->
			@src = value
			return

	# Alias
	@define 'url',
		get: ->
			@src
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
				width: this.element.naturalWidth
				height: this.element.naturalHeight
			}

	# *********************************
	# Quick event properties properties
	# *********************************
	@define 'loaded',
		get: ->
			if @_eventLoaded is undefined
				return null
			@_eventLoaded
		set: (value) ->
			if not value
				return
			@_eventLoaded = value
			@on Event.Load, value
			return

	# *********************************

	@define 'done',
		get: ->
			@loaded
		set: (value) ->
			@loaded = value
			return

	@define 'then',
		get: ->
			@loaded
		set: (value) ->
			@loaded = value
			return

	@define 'after',
		get: ->
			@loaded
		set: (value) ->
			@loaded = value
			return

	@define 'finished',
		get: ->
			@loaded
		set: (value) ->
			@loaded = value
			return

	@define 'finish',
		get: ->
			@loaded
		set: (value) ->
			@loaded = value
			return

	onLoad : (cb) -> @on Event.Load, cb
	onLoaded : (cb) -> @on Event.Load, cb
	onDone : (cb) -> @on Event.Load, cb






