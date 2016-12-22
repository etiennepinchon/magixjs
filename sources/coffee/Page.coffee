
# Page

class Page extends View
	constructor: (options={}) ->
		if App.device
			options.fixed = no
		options.parent = -1 if options.url
		#options.parent = App if not options.parent and not options.url
		super

		@touchCursor()
		@onMouseDown -> @touchActiveCursor()
		@onMouseUp -> @touchCursor()
	
	_kind : 'Page'
		
	######################################################
	# PROPERTIES

	@define 'title',
		configurable: yes
		get: ->
			App.title
		set: (value) ->
			App.title = value
			return

	@define 'url',
		configurable: yes
		get: -> @url
		set: (value) ->
			Routes.add(value, @)
			return

	######################################################
	# METHODS

	isFirst : ->
		return yes if not App._pages_counter
		return no

	toInspect: ->
		if @name
			return "<Page id:#{@id} name:#{@name}>"
		return "<Page id:#{@id}>"

	touchCursor : ->
		if App.device and App.device.type isnt NULL and App.device.type isnt ''
			c =  'url(//s3.amazonaws.com/data.magixjs.com/static/cursors/cursor.png) 32 32, auto'
			if Utils.isWebKit()
				c = '-webkit-image-set(url(//s3.amazonaws.com/data.magixjs.com/static/cursors/cursor.png) 1x, url(//s3.amazonaws.com/data.magixjs.com/static/cursors/cursor@2x.png) 2x) 32 32, auto'
			@cursor = c
		else
			@cursor = 'default'
		
	touchActiveCursor : ->
		if App.device and App.device.type isnt NULL and App.device.type isnt ''
			c = 'url(//s3.amazonaws.com/data.magixjs.com/static/cursors/cursorActive.png) 32 32, auto'
			if Utils.isWebKit()
				c = '-webkit-image-set(url(//s3.amazonaws.com/data.magixjs.com/static/cursors/cursorActive.png) 1x, url(//s3.amazonaws.com/data.magixjs.com/static/cursors/cursorActive@2x.png) 2x) 32 32, auto'
			@cursor = c
		else
			@cursor = 'default'