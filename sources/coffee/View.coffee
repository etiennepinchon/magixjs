
# View

class View extends Element
	constructor: (options={}) ->
		@_element 		 = {}

		super

		@_children 		 = []
		
		@_createElement()
		@_context.addView(@)
		@_context.emit("view:create", @)
		@userInteraction = no

		that = @
		getParent = (normal)->
			if App.page and that._kind isnt 'Page'
				return App.page
			else
				#console.log App.deviceType, App.device
				if App.deviceType isnt NULL and App.device is NULL
					App.device = new Device
						background: App.deviceBackground
						padding: 10
					App.device.type = App.deviceType
				p = NULL
				if normal is no
					p = App
					p = App.device.content if App.device isnt NULL
				return p
			return

		# If a route is defined -> missing parent == current page
		if not options.parent# or options.parent is NULL
			# when inserting a device
			if @_kind is 'Device'
				options.parent = App._wrapper

			# when inserting a page
			else if @_kind is 'Page'
				options.parent = getParent(yes)

			# Views without parent and not current page
			else if App.running and not App.page
				App.page = new Page
					backgroundColor: white
					parent: getParent(no)
				options.parent = App.page

			# Other views
			else
				options.parent = App.page
		else if @_kind is 'Page' and options.parent is App
			options.parent = getParent(no)
			App.page = @

		if options.parent is 'app'
			options.parent = NULL

		@props = Defaults.getDefaults @_kind, options
		delete options.parent if options.parent
		delete options.addTo if options.addTo
		@props = options.props if options.props

		
	##############################################################
	# PROPERTIES

	_kind 		 : 'View'
	_elementType : 'div'

	##############################################################
	# BASICS

	##############################################################
	# DOM ELEMENTS

	@define 'html',
		get: -> @_element.innerHTML or ""
		set: (value) ->
			@_element.innerHTML = value
			@emit 'change:html', value

	@define 'context', get: -> @_context
	@define '_domEventManager', get: -> @_context.domEventManager.wrap @_element
	@define 'element', get: -> @_element

	##############################################################
	# CSS

	@define 'style',
		importable: yes
		exportable: no
		get: -> @_element.style
		set: (value) ->
			Utils.extend @_element.style, value
			@emit "change:style"
	
	######################################################
	# classList property
	#
	# ** Add a class to your view
	# ** Enable you to add an external css sheets to controle your views

	@define 'classList',
		importable: yes
		exportable: no
		get: -> @_element.classList

	######################################################
	# Quick event properties properties

	@define 'click',
		get: -> @_eventClick
		set: (value) ->	
			@_eventClick = value
			@on Event.Click, value
			return
	@define 'doubleClick',
		get: -> @_eventDoubleClick
		set: (value) ->
			@_eventDoubleClick = value
			@on Event.DoubleClick, value
			return
	@define 'down',
		get: -> @_eventDown
		set: (value) ->
			@_eventDown = value
			@on Event.Down, value
			return
	@define 'over',
		get: -> @_eventOver
		set: (value) ->
			@_eventOver = value
			@on Event.Over, value
			return
	@define 'up',
		get: -> @_eventUp
		set: (value) ->
			@_eventUp = value
			@on Event.Up, value
			return
	@define 'in',
		get: -> @_eventIn
		set: (value) ->
			@_eventIn = value
			@on Event.In, value
			return
	@define 'out',
		get: -> @_eventOut
		set: (value) -> 
			@_eventOut = value
			@on Event.Out, value
			return

	@define 'mouseDown',
		get: -> @_eventDown
		set: (value) ->
			@_eventDown = value
			@on Event.Down, value
			return
	@define 'mouseOver',
		get: -> @_eventOver
		set: (value) ->
			@_eventOver = value
			@on Event.Over, value
			return
	@define 'mouseUp',
		get: -> @_eventUp
		set: (value) ->
			@_eventUp = value
			@on Event.Up, value
			return
	@define 'mouseIn',
		get: -> @_eventIn
		set: (value) ->
			@_eventIn = value
			@on Event.In, value
			return
	@define 'mouseOut',
		get: -> @_eventOut
		set: (value) -> 
			@_eventOut = value
			@on Event.Out, value
			return

	##############################################################
	## DEFINITIONS
	
	@_def = (name, get_default, set_action) ->
		@define name,
			get: ->
				return get_default if @["_#{name}"] is NULL	
				@["_#{name}"]
			set: (value) ->
				@["_#{name}"] = value
				set_action.call(@, value)
				@emit "change:#{name}", value

	@_def_style = (name, style_name, get_default)->
		@_def name, get_default, (value)->
			@_element.style[style_name] = value

	@_alias = (alias_name, original_name) ->
		@define alias_name,
			get: ->
				@["#{original_name}"]
			set: (value) ->
				@["#{original_name}"] = value


	######################################################
	# PROPERTIES

	# Perform action -> Will always be called at the end of of a props list if in it
	@define 'do',
		get: -> @_do
		set: (fn) ->
			if Utils.isFunction(fn)
				@_do = fn
				fn.call(this)

	######################################################
	# name property
	#
	# * Add name to the element
	
	@define 'name',
		get : -> @_getPropertyValue 'name'
		set : (value) ->
			@_setPropertyValue 'name', value
			@_element.setAttribute 'name', value

	######################################################
	# fixed property
	#
	# * Change the position of the view to fixed
	# * The view will not move if the parent view is scrolled

	@_def 'fixed', no, (value)-> 
		if value is yes
			@_fixed 					= yes
			@_element.style.position 	= 'fixed'
		else
			@_fixed = no
			if @_element.style.left isnt ''
				@_element.style.position = 'absolute'
			else
				@_element.style.position = ''

	##############################################################
	# MARGIN / PADDING

	@define 'margin',
		get: ->
			if @_margin is NULL
				@_margin =
					x 		: 0
					y 		: 0
					top 	: 0
					right 	: 0
					bottom 	: 0
					left 	: 0
			@_margin
		set: (value) ->
			if @_margin is NULL
				@_margin =
					x 		: 0
					y 		: 0
					top 	: 0
					right 	: 0
					bottom 	: 0
					left 	: 0
			if typeof value isnt 'object'
				value = 'auto' if value is 'center'
				@_margin.x 			= value
				@_margin.y 			= value
				@_margin.top 		= value
				@_margin.right 		= value
				@_margin.bottom 	= value
				@_margin.left 		= value

			else if value.x isnt NULL
					value.x 		= 'auto' if value.x is 'center'
					@_margin.x 		= value.x
					value.left 		= value.x if value.left is NULL
					value.right 	= value.x if value.right is NULL
				if value.y isnt NULL
					value.y 		= 'auto' if value.y is 'center'
					@_margin.y 		= value.y
					value.top 		= value.y if value.top is NULL
					value.bottom 	= value.y if value.bottom is NULL
				@_margin.top 		= value.top if value.top isnt NULL
				@_margin.bottom 	= value.bottom if value.bottom isnt NULL
				@_margin.left 		= value.left if value.left isnt NULL
				@_margin.right 		= value.right if value.right isnt NULL

			@emit 'change:margin', @_margin
			output = ''

			i = NULL
			for item of @_margin
				if item isnt 'x' and item isnt 'y'
					i = @_margin[item]
					if typeof @_margin[item] is 'number'
						i = @_margin[item] + 'px'
					output += i + ' '
			@_element.style.margin = output

	@_alias 'mg', 'margin'
	@define 'marginX',
		get: -> @margin.x
		set: (value) -> @margin = x: value
	@define 'marginY',
		get: -> @margin.y
		set: (value) -> @margin = y: value
	@define 'marginTop',
		get: -> @margin.top
		set: (value) -> @margin = top: value
	@define 'marginRight',
		get: -> @margin.right
		set: (value) -> @margin = right: value
	@define 'marginBottom',
		get: -> @margin.bottom
		set: (value) -> @margin = bottom: value
	@define 'marginLeft',
		get: -> @margin.left
		set: (value) -> @margin = left: value


	@define 'padding',
		get: ->
			if @_padding is NULL
				@_padding =
					x 		: 0
					y 		: 0
					top 	: 0
					right 	: 0
					bottom 	: 0
					left 	: 0
			@_padding
		set: (value) ->
			if @_padding is NULL
				@_padding =
					x 		: 0
					y 		: 0
					top 	: 0
					right 	: 0
					bottom 	: 0
					left 	: 0

			if typeof value isnt 'object'
				@_padding.x 		= value
				@_padding.y 		= value
				@_padding.top 		= value
				@_padding.right 	= value
				@_padding.bottom 	= value
				@_padding.left 		= value

			else
				if value.x isnt NULL
					@_padding.x = value.x
					value.left = value.x if value.left is NULL
					value.right = value.x if value.right is NULL
				if value.y isnt NULL
					@_padding.y = value.y
					value.top = value.y if value.top is NULL
					value.bottom = value.y if value.bottom is NULL
				@_padding.top 		= value.top if value.top isnt NULL
				@_padding.bottom 	= value.bottom if value.bottom isnt NULL
				@_padding.left 		= value.left if value.left isnt NULL
				@_padding.right 	= value.right if value.right isnt NULL
			@emit 'change:padding', @_padding
			output = ''

			i = NULL
			for item of @_padding
				if item isnt 'x' and item isnt 'y'
					i = @_padding[item]
					if typeof @_padding[item] is 'number'
						i = @_padding[item] + 'px'
					output += i + ' '
			@_element.style.padding = output

	@_alias 'pg', 'padding'
	@define 'paddingX',
		get: -> @padding.x
		set: (value) -> @padding = x: value
	@define 'paddingY',
		get: -> @padding.y
		set: (value) -> @padding = y: value
	@define 'paddingTop',
		get: -> @padding.top
		set: (value) -> @padding = top: value
	@define 'paddingRight',
		get: -> @padding.right
		set: (value) -> @padding = right: value
	@define 'paddingBottom',
		get: -> @padding.bottom
		set: (value) -> @padding = bottom: value
	@define 'paddingLeft',
		get: ->@padding.left
		set: (value) -> @padding = left: value

	
		
	##############################################################
	# POSITIONING X/Y

	@define 'x',
		get: ->
			left = @_element.style.left
			left = parseFloat(left, 10) if left.indexOf('px') >= 0
			left = 0 if left is ''	
			left
		set: (value) ->
			@_keepCenterX = no

			if Utils.isObject(value)
				if value.centerX
					@_keepCenterX = yes

				value = value.value

			if Utils.isNumber(value)
				value = value + 'px'
			
			if not @fixed
				@_element.style.position = 'absolute'

			@_element.style.left = value
			@emit 'change:x', value
			@emit 'change:left', value
			@emit 'change:point', @point
			@emit 'change:frame', @frame

	@define 'y',
		get: ->
			top = @_element.style.top
			top = parseFloat(top, 10) if top.indexOf('px') >= 0
			top = 0 if top is ''
			top
		set: (value) ->
			@_keepCenterY = no
			if Utils.isObject(value)
				@_keepCenterY 	= yes if value.centerY
				value 			= value.value
			value = value + 'px' if Utils.isNumber(value)			
			@_element.style.position 	= 'absolute' if not @fixed
			@_element.style.top 		= value
			@emit 'change:y', 		value
			@emit 'change:top', 	value
			@emit 'change:point', 	@point
			@emit 'change:frame', 	@frame
	
	@_alias 'top', 'y'
	@_alias 'left', 'x'
	
	
	##############################################################
	# POSITIONING BOTTOM/RIGHT

	@define 'bottom',
		get: ->
			bottom = @_element.style.bottom
			bottom = parseFloat(bottom, 10) if bottom.indexOf('px') >= 0
			bottom = 0 if bottom is ''
			bottom
		set: (value) ->
			value = value + 'px' if Utils.isNumber(value)
			@_element.style.position = 'absolute' if not @fixed
			@_element.style.bottom = value
			@emit 'change:bottom', value

	@define 'right',
		get: ->
			right = @_element.style.right
			right = parseFloat(right, 10) if right.indexOf('px') >= 0
			right = 0 if right is ''
			right
		set: (value) ->
			value = value + 'px' if Utils.isNumber(value)
			@_element.style.position = 'absolute' if not @fixed
			@_element.style.right = value
			@emit 'change:right', value


	##############################################################
	# DIMENSION WIDTH/HEIGHT

	@define 'width',
		configurable: true
		get: ->
			# If the width is not a number (like a percentage) we return the raw value instead of the numeric value
			# Improvement: allow to retrive the numeric value..
			return @_width if @_width isnt NULL and typeof @_width isnt 'number'
			return @_width if @_element.offsetWidth is 0 and @_width isnt NULL
			leftBorder = if @_element.style.borderLeftWidth isnt '' then @_element.style.borderLeftWidth else 0
			rightBorder = if @_element.style.borderRightWidth isnt '' then @_element.style.borderRightWidth else 0
			borders = parseFloat(leftBorder, 10) + parseFloat(rightBorder, 10)
			@_element.offsetWidth - borders
		
		set: (value) ->
			if value is 'auto'
				@_element.style.width = ''
				return
			@_width = value
			value = value + 'px' if Utils.isNumber(value)
			@_element.style.width = value
			@emit 'change:width', @_width
			@emit 'change:size', @size
			@emit 'change:frame', @frame

	@define 'height',
		configurable: true
		get: ->
			# If the height is not a number (like a percentage) we return the raw value instead of the numeric value
			return @_height if @_height isnt NULL and typeof @_height isnt 'number'
			return @_height if @_element.offsetHeight is 0 and @_height isnt NULL
			topBorder = if @_element.style.borderTopWidth isnt '' then @_element.style.borderTopWidth else 0
			bottomBorder = if @_element.style.borderBottomWidth isnt '' then @_element.style.borderBottomWidth else 0
			borders = parseFloat(topBorder, 10) + parseFloat(bottomBorder, 10)
			@_element.offsetHeight - borders

		set: (value) ->
			if value is 'auto'
				@_element.style.height = ''
				return
			@_height = value
			value = value + 'px' if Utils.isNumber(value)
			@_element.style.height = value
			@emit 'change:height', @_height
			@emit 'change:size', @size
			@emit 'change:frame', @frame
			return

	@_alias 'w', 'width'
	@_alias 'h', 'height'
	@_def 'minWidth', null, (value) ->
		value 						= value + 'px' if Utils.isNumber(value)
		@_element.style.minWidth 	= value
	@_def 'maxWidth', null, (value) ->
		value 						= value + 'px' if Utils.isNumber(value)
		@_element.style.maxWidth 	= value
	@_def 'minHeight', null, (value) ->
		value 						= value + 'px' if Utils.isNumber(value)
		@_element.style.minHeight 	= value
	@_def 'maxHeight', null, (value) ->
		value 						= value + 'px' if Utils.isNumber(value)
		@_element.style.maxHeight 	= value

	##############################################################
	# MIN/MID/MAX

	@_def_min = (name)->
		@define 'min'+ name.toUpperCase(),
			get: ->
				cs = 'left'
				cs = 'top' if name is 'y'
				if typeof @[name] is 'string' and @[name].indexOf('%') >= 0
					return parseFloat(@computedStyle()[cs], 10)
				@[name]
			set: (value) ->
				@[name] = value
				return

	@_def_mid = (name)->
		@define 'mid'+ name.toUpperCase(),
			get: ->
				size = 'width'
				size = 'height' if name is 'y'
				cs = 'left'
				cs = 'top' if name is 'y'
				if typeof @[name] is 'string' and @[name].indexOf('%') >= 0
					return parseFloat(@computedStyle()[cs], 10) + @[size] / 2
				@[name] + @[size] / 2
			set: (value) ->
				size = 'width'
				size = 'height' if name is 'y'
				@[name] = value - (@[size] / 2)
				return

	@_def_max = (name)->
		@define 'max'+ name.toUpperCase(),
			get: ->
				size = 'width'
				size = 'height' if name is 'y'
				cs = 'left'
				cs = 'top' if name is 'y'
				if typeof @[name] is 'string' and @[name].indexOf('%') >= 0
					return parseFloat(@computedStyle()[cs], 10) + @[size]
				@[name] + @[size]
			set: (value) ->
				size = 'width'
				size = 'height' if name is 'y'
				@[name] = value - @[size]
				return

	@_def_min 'x'
	@_def_min 'y'

	@_def_mid 'x'
	@_def_mid 'y'

	@_def_max 'x'
	@_def_max 'y'

	##############################################################
	# POINTS
	# * Return the current positions of the view

	@define 'point',
		get: ->
			{
				x: @x
				y: @y
			}
		set: (value) ->
			@x = value.x if value.x isnt NULL
			@y = value.y if value.y isnt NULL
			return

	##############################################################
	# SIZE
	# * Return the current size of the view

	@define 'size',
		get: ->
			{
				width: @width
				height: @height
			}
		set: (value) ->
			@width = value.width if value.width isnt NULL
			@height = value.height if value.height isnt NULL
			return

	##############################################################
	# FRAME
	# * Return the current frame of the view

	@define 'frame',
		get: ->
			{
				x: @x
				y: @y
				width: @width
				height: @height
			}
		set: (value) ->
			@x = value.x if value.x isnt NULL
			@y = value.y if value.y isnt NULL
			@width = value.width if value.width isnt NULL
			@height = value.height if value.height isnt NULL
			return

	##############################################################
	# WINDOWFRAME
	# * Return the current frame of the view from the window perpective
	# TODO: ADD ALIAS LIKE CONTAINER FRAME

	@define 'windowFrame',
		get: ->
			{
				x: @_element.getBoundingClientRect().left
				y: @_element.getBoundingClientRect().top
				width: @width
				height: @height
			}
		set: (value) ->
			@x = value.x if value.x isnt NULL
			@y = value.y if value.y isnt NULL
			@width = value.widthif value.width isnt NULL
			@height = value.height if value.height isnt NULL
			@fixed = true

	##############################################################
	# DISPLAY AND VISIBLE
	# ** Change the display of the view

	@define 'display',
		get: ->
			disp = @_element.style.display
			return no if disp is 'none'
			return yes if disp is ''
			return disp
		set: (value) ->
			if not Utils.isString(value)
				if value
					value = 'block'
				else
					value = 'none'
				@_element.style.display = value
			else
				@_element.style.display = value
				@_element.style.webkitDisplay = value

	@define 'visible',
		get: ->
			visibility = @_element.style.visibility
			return yes if visibility is 'visible' or visibility is ''
			no
		set: (value) ->
			if value
				value = 'visible'
			else
				value = 'hidden'
			@_element.style.visibility = value

	##############################################################
	# BACKGROUND/IMAGE
	# ** Change the background color of a view

	@define 'backgroundColor',
		configurable: yes
		get: ->
			return null if @_background is NULL
			@_background
		set: (value) ->
			value = ''  if not value
			value = 'transparent' if value is 'clear'
			value = Color.toColor(value)
			if value and value.color
				@_background = value.color
			else
				@_background = value
			@_element.style.background = value

	@_alias 'bc', 'backgroundColor'


	##############################################################
	# BACKGROUND CLIP
	# ** The background-clip property specifies the painting area of the background.

	@define 'backgroundClip',
		configurable: yes
		get: ->
			return null if @_backgroundClip is NULL
			@_backgroundClip
		set: (value) ->
			value = 'border-box'  if not value
			@_element.style.backgroundClip = value
			@_element.style.webkitBackgroundClip = value

	##############################################################
	# IMAGE
	# ** Add a background image to your view

	@define 'image',
		configurable: yes
		get: ->
			return no if @_image is NULL
			@_image
		set: (value) ->
			@_background 					= null
			@_image 						= value
			if Utils.isString(value) and value.indexOf('linear-gradient') > -1
				@_element.style.backgroundImage = value
			else
				@_element.style.backgroundImage = 'url(' + Utils.parseAsset(value) + ')'
			@_element.style.backgroundSize 	= 'cover'
			@imageRepeat 					= no
	@_alias 'backgroundImage', 'image'
	@define 'background',
		get: ->
			@image
		set: (value) ->
			# July 13, 2016 : Patch value.color for gradient support
			if Color.isColor(value) or value.color or value is clear
				@backgroundColor = value
			else
				@image 			= value
				@imagePosition 	= 'center center'
				@imageSize 		= 'cover'
				@imageRepeat 	= false

	##############################################################
	# IMAGE SIZE
	# * Change the background image size

	@define 'imageSize',
		get: ->
			return 'cover' if @_imageSize is NULL
			@_image
		set: (value) ->
			@_imageSize = value
			value = (value*100) + '%' if Utils.isNumber(value)
			@_element.style.backgroundSize = value
	@_alias 'imageScale', 'imageSize'

	##############################################################
	# IMAGE REPEAT
	# * Make the background image repeat or not

	@define 'imageRepeat',
		get: ->
			return yes if @_imageRepeat is NULL
			@_imageRepeat
		set: (value) ->
			if value or value is 'repeat'
				@_imageRepeat = yes
				@_element.style.backgroundRepeat = 'repeat'
				@imageSize = 'auto' if @imageSize is 'cover'
			else
				@_imageRepeat = no
				@_element.style.backgroundRepeat = 'no-repeat'

	##############################################################
	# IMAGE FIXED property
	# * Make the background image fixed (no movement on scroll)

	@define 'imageFixed',
		get: ->
			@_imageFixed = no if @_imageFixed is NULL
			@_imageFixed
		set: (value) ->
			if value
				@_imageFixed = yes
				value = 'fixed'
			else
				@_imageFixed = no
				value = 'scroll'
			@_element.style.backgroundAttachment = value

	##############################################################
	# IMAGE POSITION
	# * Chage the position of the background image

	@define 'imagePositionX',
		get: ->
			@_imagePositionX = 0 if @_imagePositionX is NULL
			@_imagePositionX
		set: (value) ->
			@_imagePositionX = value
			@imagePosition = x: value

	@define 'imagePositionY',
		get: ->
			@_imagePositionY = 0 if @_imagePositionY is NULL
			@_imagePositionY
		set: (value) ->
			@_imagePositionY = value
			@imagePosition = y: value

	@define 'imagePosition',
		get: ->
			@_imagePosition = '' if @_imagePosition is NULL
			@_imagePosition
		set: (value) ->
			@_imagePosition = value
			if Utils.isObject value
				if value.x isnt NULL
					@_imagePositionX = value.x
				if value.y isnt NULL
					@_imagePositionY = value.y
				value = "#{@imagePositionX} #{@imagePositionY}"
			else
				value = value+'px' if typeof value is 'number'
			@_element.style.backgroundPosition = value


	##############################################################
	# OPACITY
	# * Change the opacity of the view

	@_def_style 'opacity','opacity', 1
	@_alias 'alpha', 'opacity'

	##############################################################
	# CLIP
	# * Hide anything that go beyond the view frame

	@define 'clip',
		get: ->
			@_clip = yes if @_clip is NULL
			@_clip
		set: (value) ->
			if value is yes
				@_clip = yes
				value = 'hidden'
			else
				@_clip = no
				value = 'visible'
			@_element.style.overflow = value

	##############################################################
	## SCROLLING PROPERTIES

	@define 'scrollTop',
		get: -> @_element.scrollTop
		set: (value) -> @_element.scrollTop = value
	@_alias 'scrollY', 'scrollTop'
	@define 'scrollLeft',
		get: -> @_element.scrollLeft
		set: (value) -> @_element.scrollLeft = value
	@_alias 'scrollX', 'scrollLeft'
	@define "scrollFrame",
		importable: false
		get: ->
			frame =
				x 		: @scrollX
				y 		: @scrollY
				width 	: @width
				height 	: @height
		set: (frame) ->
			@scrollX = frame.x
			@scrollY = frame.y
	@define 'scrollWidth', get: -> @_element.scrollWidth
	@define 'scrollHeight', get: -> @_element.scrollHeight
	

	@define 'scroll',
		configurable: true
		get: ->
			return false if @_scroll is NULL
			@_scroll
		set: (value) ->
			if value is true
				@_scroll 								= true
				@_element.style.overflow 				= 'scroll'
				@_element.style.webkitOverflowScrolling = 'touch'
			else
				@_scroll = false
				if @clip
					@_element.style.overflow = 'hidden'
				else
					@_element.style.overflow = 'auto'


	@define 'scrollHorizontal',
		configurable: true
		get: ->
			return false if @_scrollHorizontal is NULL
			@_scrollHorizontal
		set: (value) ->
			if value is true
				@_scrollHorizontal = true
				@_element.style.overflowX = 'scroll'
				@_element.style.overflowY = 'hidden' if @clip and not @scrollVertical
				@_element.style.webkitOverflowScrolling = 'touch'
			else
				@_scrollHorizontal = false
				if @clip
					@_element.style.overflowX = 'hidden'
				else
					@_element.style.overflowX = 'auto'
			return

	@define 'scrollVertical',
		configurable: true
		get: ->
			return false if @_scrollVertical is NULL
			@_scrollVertical
		set: (value) ->
			if value is true
				@_scrollVertical = true
				@_element.style.overflowY = 'scroll'
				@_element.style.overflowX = 'hidden' if @clip and not @scrollHorizontal
				@_element.style.webkitOverflowScrolling = 'touch'
			else
				@_scrollVertical = false
				if @clip
					@_element.style.overflowY = 'hidden'
				else
					@_element.style.overflowY = 'auto'

	@_def_style 'cursor', 'cursor', 'auto'

	@define 'parent',
		enumerable: false
		exportable: false
		importable: true
		get: ->
			@_parent or null
		set: (view) -> 
			return if view is @_parent or view is -1
			Utils.domCompleteCancel @__insertElement
			if @_parent
				if @_parent is App._wrapper
					App._page = null
					App.emit 'change:page', {added:[], removed:[@]}
				@emit Event.WillDisappear
				@willDisappear() if @willDisappear
				@_parent._children = Utils.without @_parent._children, @
				if @_element.parentNode is @_parent._element
					@_parent._element.removeChild @_element
				@_parent.emit "change:children", {added:[], removed:[@]}
				@emit Event.DidDisappear
				@didDisappear() if @didDisappear
			if view
				if view._kind is 'App'
					if @_kind is 'Page'
						view = App._wrapper
						App._page = @
						App._pages_counter++
					else
						throw Error("View: parent view must be a page, not the App.")
						return
				@emit Event.WillAppear
				@willAppear(@__options) if @willAppear
				view._element.appendChild @_element
				view._children.push @
				if view._kind is 'App' and @_kind is 'Page'
					App.emit 'change:page', {added:[@], removed:[]}
				view.emit "change:children", {added:[@], removed:[]}
				if @didAppear
					@_didAppear = yes
					@didAppear(@__options)
				@emit Event.DidAppear
			@_parent = view
			@emit "change:parent"
	@define 'children',
		enumerable: no
		exportable: no
		importable: no
		get: -> Utils.clone @_children
	@define 'siblings',
		enumerable: false
		exportable: false
		importable: false
		get: ->
			return null if not @parent
			Utils.without @parent._children, @
	@define 'descendants',
		enumerable: false
		exportable: false
		importable: false
		get: ->
			result = []
			f = (view) ->
				result.push view
				view.children.map f
			@children.map f
			result
	@define 'index',
		get: ->
			if not @_index
				@_index = 0
			@_index
		set: (value) ->
			@_index = parseInt(value)
			@emit 'change:index', value
			@_element.style.zIndex = value
	@define 'flex',
		get: ->
			@_flex
		set: (value) ->
			if value is true
				@_element.style.flex = '1'
			else if value is false
				@_element.style.flex = '0'
			else
				@_element.style.flex 		= String(value)
				@_element.style.webkitFlex 	= String(value)
			@_flex = value

	##############################################################
	# TRANSFORMATIONS

	@define 'originX',
		get: ->
			return 0.5 if @_originX is NULL
			@_originX
		set: (value) ->
			value 								= 0.5 if value < 0 or value > 1
			@_originX 							= value
			@_originY 							= 0.5 if @_originY is NULL
			@_element.style.transformOrigin 	= value * 100 + '% ' + @_originY * 100 + '%'
			return

	@define 'originY',
		get: ->
			return 0.5 if @_originY is NULL
			@_originY
		set: (value) ->
			value 								= 0.5 if value < 0 or value > 1
			@_originY 							= value
			@_originX 							= 0.5 if @_originX is NULL
			@_element.style.transformOrigin 	= @_originX * 100 + '% ' + value * 100 + '%'
	@_def 'perspective', 0, (value)-> 
		@_element.style.perspective = value + 'px'
	@_def 'preserve3D', no, (value)->
		if value
			value = 'preserve-3d'
		else
			value = 'flat'
		@_element.style.webkitTransformStyle 	= value
		@_element.style.transformStyle 			= value
	@_def 'translate', 0, (value)-> 
		@_translateX = value
		@_translateY = value
		@_updateTransform()
	@_def 'translateX', 0, (value)-> 
		@_translateY = 0 if @_translateY is NULL
		@_updateTransform()
	@_def 'translateY', 0, (value)-> 
		@_translateX = 0 if @_translateX is NULL
		@_updateTransform()
	@_def 'translateZ', 0, (value)-> 
		@_translateZ = 0 if @_translateZ is NULL
		@_updateTransform()
	@_def 'rotation', 0, -> @_updateTransform()
	@_alias 'rotate', 'rotation'
	@_def 'rotationX', 0, -> @_updateTransform()
	@_alias 'rotateX', 'rotationX'
	@_def 'rotationY', 0, -> @_updateTransform()
	@_alias 'rotateY', 'rotationY'
	@_def 'rotationZ', 0, -> @_updateTransform()
	@_alias 'rotateZ', 'rotationZ'

	##############################################################
	# SCALE

	@_def 'scale', 1, (value)-> 
		@_scaleX = value
		@_scaleY = value
		@_updateTransform()

	@_def 'scaleX', 1, (value)-> 
		@_scaleY = 1 if @_scaleY is NULL
		@_updateTransform()

	@_def 'scaleY', 1, (value)-> 
		@_scaleX = 1 if @_scaleX is NULL
		@_updateTransform()

	##############################################################
	# SKEW

	@_def 'skew', 0, (value)-> 
		@_skewX = value
		@_skewY = value
		@_updateTransform()

	@_def 'skewX', 0, (value)-> 
		@_skewY = 0 if @_skewY is NULL
		@_updateTransform()

	@_def 'skewY', 0, (value)-> 
		@_skewX = 0 if @_skewX is NULL
		@_updateTransform()

	##############################################################
	# FILTERS
	
	@_def 'blur', 0, (value)->
		@_f_blur = 'blur(' + value + 'px) '
		@_updateEffects()

	@_def 'brightness', 1, (value) ->
		@_f_brightness = 'brightness(' + value + ') '
		@_updateEffects()

	@_def 'saturate', 100, (value) ->
		@_f_saturate = 'saturate(' + value + '%) '
		@_updateEffects()
	
	##############################################################

	@define 'hueRotate',
		get: ->
			return 0 if @_hueRotate is NULL
			@_hueRotate
		set: (value) ->
			value = 0 if value < 0 or value > 360
			@_hueRotate = value

			@_f_hueRotate = 'hue-rotate(' + value + 'deg) '
			@_updateEffects()

	@_def 'contrast', 100, (value)->
		@_f_contrast = 'contrast(' + value + '%) '
		@_updateEffects()

	@define 'invert',
		get: ->
			return 0 if @_invert is NULL
			@_invert
		set: (value) ->
			value = 0 if value < 0 or value > 100
			@_invert = value

			@_f_invert = 'invert(' + value + '%) '
			@_updateEffects()

	@define 'grayscale',
		get: ->
			return 0 if @_grayscale is NULL
			@_grayscale
		set: (value) ->
			value = 0 if value < 0 or value > 100
			@_grayscale = value

			@_f_grayscale = 'grayscale(' + value + '%) '
			@_updateEffects()

	@define 'sepia',
		get: ->
			return 0 if @_sepia is NULL
			@_sepia
		set: (value) ->
			value = 0 if value < 0 or value > 100
			@_sepia = value

			@_f_sepia = 'sepia(' + value + '%) '
			@_updateEffects()


	##############################################################
	# BACKDROP FILTERS

	@_def 'backdropBlur', 0, (value) ->
		@_bf_blur = 'blur(' + value + 'px) '
		@_updateBackDropEffects()

	@_def 'backdropBrightness', 1, (value) ->
		@_bf_brightness = 'brightness(' + value + ') '
		@_updateBackDropEffects()

	@_def 'backdropSaturate', 100, (value) ->
		@_bf_saturate = 'saturate(' + value + '%) '
		@_updateBackDropEffects()

	@define 'backdropHueRotate',
		get: ->
			return 0 if @_hueRotate is NULL
			@_hueRotate
		set: (value) ->
			value = 0 if value < 0 or value > 360
			@_hueRotate = value

			@_bf_hueRotate = 'hue-rotate(' + value + 'deg) '
			@_updateBackDropEffects()

	@_def 'backdropContrast', 100, (value) ->
		@_bf_contrast = 'contrast(' + value + '%) '
		@_updateBackDropEffects()

	@define 'backdropInvert',
		get: ->
			return 0 if @_invert is NULL
			@_invert
		set: (value) ->
			value = 0 if value < 0 or value > 100
			@_invert = value

			@_bf_invert = 'invert(' + value + '%) '
			@_updateBackDropEffects()

	@define 'backdropGrayscale',
		get: ->
			return 0 if @_grayscale is NULL
			@_grayscale
		set: (value) ->
			value = 0 if value < 0 or value > 100
			@_grayscale = value

			@_bf_grayscale = 'grayscale(' + value + '%) '
			@_updateBackDropEffects()

	@define 'backdropSepia',
		get: ->
			return 0 if @_sepia is NULL
			@_sepia
		set: (value) ->
			value = 0 if value < 0 or value > 100
			@_sepia = value

			@_bf_sepia = 'sepia(' + value + '%) '
			@_updateBackDropEffects()

	##############################################################
	# SHADOWS

	@_def 'shadowX', 0, -> @_updateShadow()
	@_def 'shadowY', 0, -> @_updateShadow()
	@_def 'shadowBlur', 0, -> @_updateShadow()
	@_def 'shadowSpread', 0, -> @_updateShadow()
	@_def 'shadowColor', 'black', -> @_updateShadow()

	@define 'shadowInset',
		get: ->
			return '' if @_shadowInset is NULL
			@_shadowInset
		set: (value) ->
			if value
				value = 'inset'
			else
				value = ''
			@_shadowInset = value
			@_updateShadow()

	@define 'borderBox',
		get: ->
			if @_borderBox is NULL
				@_borderBox = false
			@_borderBox
		set: (value) ->
			if value is true
				@_borderBox 				= true
				@_element.style.boxSizing 	= 'border-box'
			else
				@_borderBox 				= false
				@_element.style.boxSizing 	= 'content-box'

	# ##############################################################
	# # borderRadius property

	@_def 'borderRadius', 0, (value)->
		value = value + 'px' if typeof value is 'number'
		@_element.style.borderRadius 					= value
		@_element.style.webkitBorderRadius 				= value
		@_element.style.mozBorderRadius 				= value
		@_element.style.msBorderRadius 					= value
		@_element.style.oBorderRadius 					= value

	@_alias 'br', 'borderRadius'
	@_alias 'cornerRadius', 'borderRadius'

	@_def 'borderTopLeftRadius', 0, (value) ->
		value = value + 'px' if typeof value is 'number'
		@_element.style.borderTopLeftRadius 			= value
		@_element.style.webkitBorderTopLeftRadius 		= value
		@_element.style.mozBorderTopLeftRadius 			= value
		@_element.style.msBorderTopLeftRadius 			= value
		@_element.style.oBorderTopLeftRadius 			= value

	@_def 'borderTopRightRadius', 0, (value) ->
		value = value + 'px' if typeof value is 'number'
		@_element.style.borderTopRightRadius 			= value
		@_element.style.webkitBorderTopRightRadius 		= value
		@_element.style.mozBorderTopRightRadius 		= value
		@_element.style.msBorderTopRightRadius 			= value
		@_element.style.oBorderTopRightRadius 			= value

	@_def 'borderBottomLeftRadius', 0, (value) ->
		value = value + 'px' if typeof value is 'number'
		@_element.style.borderBottomLeftRadius 			= value
		@_element.style.webkitBorderBottomLeftRadius 	= value
		@_element.style.mozBorderBottomLeftRadius 		= value
		@_element.style.msBorderBottomLeftRadius 		= value
		@_element.style.oBorderBottomLeftRadiuss 		= value

	@_def 'borderBottomRightRadius', 0, (value) ->
		value = value + 'px' if typeof value is 'number'
		@_element.style.borderBottomRightRadius 		= value
		@_element.style.webkitBorderBottomRightRadius 	= value
		@_element.style.mozBorderBottomRightRadius 		= value
		@_element.style.msBorderBottomRightRadius 		= value
		@_element.style.oBorderBottomRightRadius 		= value

	# ##############################################################
	# # BORDER COLOR / WIDTH
	
	@_def 'borderColor', '', (value) ->
		value = 'transparent' if value is 'clear'
		@_element.style.borderColor = value

	@_def 'borderTopColor', '', (value) ->
		value = 'transparent' if value is 'clear'
		@_element.style.borderTopColor = value

	@_def 'borderBottomColor', '', (value) ->
		value = 'transparent' if value is 'clear'
		@_element.style.borderBottomColor = value

	@_def 'borderLeftColor', '', (value) ->
		value = 'transparent' if value is 'clear'
		@_element.style.borderLeftColor = value

	@_def 'borderRightColor', '', (value) ->
		value = 'transparent' if value is 'clear'
		@_element.style.borderRightColor = value

	@_def_style 'borderStyle', 'borderStyle', 'solid'

	@_def 'borderWidth', 0, (value) ->
		value = value + 'px' if typeof value is 'number'
		@_element.style.borderWidth = value
		@_element.style.borderStyle = @borderStyle

	@_def 'borderLeftWidth', 0, (value) ->
		value = value + 'px' if typeof value is 'number'
		@_element.style.borderLeftWidth = value
		@_element.style.borderStyle = @borderStyle

	@_def 'borderRightWidth', 0, (value) ->
		value = value + 'px' if typeof value is 'number'
		@_element.style.borderRightWidth = value
		@_element.style.borderStyle = @borderStyle

	@_def 'borderTopWidth', 0, (value) ->
		value = value + 'px' if typeof value is 'number'
		@_element.style.borderTopWidth = value
		@_element.style.borderStyle = @borderStyle

	@_def 'borderBottomWidth', 0, (value) ->
		value = value + 'px' if typeof value is 'number'
		@_element.style.borderBottomWidth = value
		@_element.style.borderStyle = @borderStyle

	@define 'userInteraction',
		get: ->
			@_userInteraction = no if @_userInteraction is NULL
			@_userInteraction
		set: (value) ->
			if value
				@_userInteraction = true
				@classList.remove 'no-select'
				@classList.add 'select'
			else
				@_userInteraction = no
				@classList.remove 'select'
				@classList.add 'no-select'
	@_alias 'interaction', 'userInteraction'
	
	##############################################################
	## STATES

	@define "states",
		enumerable: no
		exportable: no
		importable: no
		get: -> @_states ?= new ViewStates @


	#############################################################################
	# DRAGGABLE

	@define 'draggable',
		get: -> 		@_draggable ?= new ViewDraggable(@)
		set: (value) -> @draggable.enabled = value if Utils.isBoolean(value)

	@define 'transition',
		get: ->
			@_transition

		set: (options) ->
			if options is no
				@_transition.disable() if @_transition
				return

			properties =
				view 	 : @
				duration : 0.2

			if typeof options is 'object'
				properties.duration = options.duration if options.duration
				properties.delay 	= options.delay if options.delay
				properties.curve 	= options.curve if options.curve
					
			@_transition = new Transition(properties)
			@_transition.start()

	@define 'isAnimating',
		enumerable: no
		exportable: no
		get: -> @animations().length isnt 0

	@define 'hoverAnimated',
		get: ->
			if @_hover
				@_hover.values
			else
				@_hover = {}
			@_hover

		set: (values) ->
			return no if not values or typeof values isnt 'object'

			@_hover 				= {}
			@_hover.originalValues 	= {}
			@_hover.transition 		= null
			@_hover.animate 		= true
			@_hover.options 		= duration: 0.2

			if values.hasOwnProperty('animated') and values.animated is no
				@_hover.animate = no
			if values.hasOwnProperty('options')
				@_hover.options = values['options']
				delete values['options']
			keys 	= Object.keys(values)
			i 		= 0
			while i < keys.length
				if keys[i] of this
					@_hover.originalValues[keys[i]] = @[keys[i]]
				i++
			@_hover.values = values
			@on Event.In, (event, view) ->
				if not @_hover.animate
					@props = @_hover.values
					return
				req = 
					properties: @_hover.values
					view: this
				for item of @_hover.options
					req[item] = @_hover.options[item]
				@_hover.transition = new Transition req
				@_hover.transition.start()
			@on Event.Out, (event, view) ->
				if not @_hover.animate
					@props = @_hover.originalValues
					return
				@_hover.transition.options = {} if not @_hover.transition.options
				@_hover.transition.options.properties = @_hover.originalValues
				@_hover.transition.start true
	@define 'hover',
		get: ->
			@hoverAnimated
		set: (values) ->
			values.animated = values.animate if values.animate isnt NULL
			values.animated = no if values.animated is NULL
			@hoverAnimated = values
	@define 'delegate',
		get: ->
			if @_delegate is null
				@_delegate = null
			@_delegate
		set: (value) ->
			@_delegate = value
	@define 'pointerEvent',
		get: ->
			return no if @_element.style.pointerEvents is 'none'
			return yes
		set: (value) ->
			if value
				value = 'auto'
			else
				value = 'none'
			@_element.style.pointerEvents = value
	@_alias 'pointerEvents', 'pointerEvent'
	@_alias 'ignoreEvent', 'pointerEvent'
	@_def 	'tooltip', null, (value)-> @_element.setAttribute 'title', value
	@define 'blend',
		get: ->
			@_element.style.mixBlendMode
		set: (value) ->
			@_element.style.mixBlendMode = value
	@_def 'force2d', no, (value) ->
		if value is yes
			@_element.style.webkitTransform = ''
			@_element.style.mozTransform = ''
			@_element.style.msTransform = ''
			@_element.style.oTransform = ''
			@_element.style.transform = ''

	##############################################################
	# TEXT PROPERTIES
	# CAN BE USE TO SET COLOR/FONT PROPERTIES OF THE HTML PROPERTIES, OR GLOBAL TEXT PROPS.

	@define 'fontSize',
		get: -> parseFloat @_element.style.fontSize, 10
		set: (value) ->
			value = value + 'px' if typeof value is 'number'
			@_element.style.fontSize = value
			return
	@_alias 'fsize', 'fontSize'
	@define 'fontStyle',
		get: -> 		@_element.style.fontStyle
		set: (value) -> @_element.style.fontStyle = value
	@define 'fontWeight',
		get: -> 		@_element.style.fontWeight
		set: (value) -> @_element.style.fontWeight = value
	@_alias 'weight', 'fontWeight'
	@define 'fontName',
		get: -> 		@_element.style.fontFamily
		set: (value) -> @_element.style.fontFamily = value + ', sans-serif'
	@_alias 'fontFamily', 'fontName'
	@define 'font',
		get: -> 		@_element.style.font
		set: (value) -> @_element.style.font = value
	@define 'color',
		get: -> @_element.style.color
		set: (value) -> 
			value = 'transparent' if value is 'clear'
			value = Color.toColor(value)
			if value and value.color
				value = value.color
			else
				value = value
			@_element.style.color = value

	@define 'align',
		get: -> @_element.style.textAlign
		set: (value) -> @_element.style.textAlign = value
	@_alias 'textAlignment', 'align'
	@_alias 'textAlign', 'align'


	##############################################################
	## HIERARCHY METHODS

	addChild: (view) -> view.parent = @
	add: (view) -> @addChild view
	removeChild: (view) ->
		return if view not in @children
		view.parent = null
	remove : (view) ->
		@removeChild view
	ancestors: (context=false) ->
		parents 	= []
		currentView = @

		if context is false
			while currentView.parent
				parents.push(currentView.parent)
				currentView = currentView.parent
		else
			while currentView._parentOrContext()
				parents.push(currentView._parentOrContext())
				currentView = currentView._parentOrContext()
		return parents
	childrenWithName: (name) -> @children.filter (view) -> view.name == name
	siblingsWithName: (name) -> @siblings.filter (view) -> view.name == name
	childrenAbove: (point, originX=0, originY=0) -> @children.filter (view) ->
		Utils.framePointForOrigin(view.frame, originX, originY).y < point.y
	childrenBelow: (point, originX=0, originY=0) -> @children.filter (view) ->
		Utils.framePointForOrigin(view.frame, originX, originY).y > point.y
	childrenLeft: (point, originX=0, originY=0) -> @children.filter (view) ->
		Utils.framePointForOrigin(view.frame, originX, originY).x < point.x
	childrenRight: (point, originX=0, originY=0) -> @children.filter (view) ->
		Utils.framePointForOrigin(view.frame, originX, originY).x > point.x

	_parentOrContext: ->
		return @parent if @parent
		return @_context._parent if @_context._parent
			

	##############################################################
	## INDEX ORDERING

	bringToFront : ->
		return if not @siblings
		@index = Utils.max(Utils.union([0], @siblings.map((view) ->
			view.index
		))) + 1
	sendToBack : ->
		return if not @siblings
		@index = Utils.max(Utils.union([0], @siblings.map((view) ->
			view.index
		))) - 1
	placeBefore : (view) ->
		return if view not in @siblings

		for v in @siblings
			if v.index <= view.index
				v.index -= 1

		@index = view.index + 1
	placeBehind : (view) ->
		return if view not in @siblings

		for v in @siblings
			if v.index >= view.index
				v.index += 1

		@index = view.index - 1


	##############################################################
	## COMPUTER STYLE

	computedStyle : (property) ->
		if property isnt NULL
			return window.getComputedStyle(@_element).getPropertyValue(property)
		window.getComputedStyle @_element
	cx : ->
		value = @computedStyle().getPropertyValue('left')
		return null if value is ''
		parseFloat value, 10
	cy : ->
		value = @computedStyle().getPropertyValue('top')
		return null if value is ''
		parseFloat value, 10
	cwidth : -> parseFloat @computedStyle().getPropertyValue('width'), 10
	cheight : -> parseFloat @computedStyle().getPropertyValue('height'), 10


	##############################################################
	# DOM METHODS

	destroy : (descendance) ->
		@parent._children = Utils.without(@parent._children, @) if @parent
		@_element.parentNode?.removeChild @_element
		@removeAllListeners()
		@_context.removeView(@)
		@_context.emit("view:destroy", @)
		if descendance
			for view in @descendants
				view.destroy()
		return

	copy : ->
		clonedView 						= Utils.clone(this)
		clonedView._element 			= @_element.cloneNode yes
		clonedView._element.instance 	= clonedView
		clonedView._events 				= NULL
		clonedView._id 					= Utils.randomID()
		clonedView._element.setAttribute 'id', "MagiX#{@_kind}-" + clonedView.id
		clonedView._parent = null
		clonedView
		
	copySingle : ->
		clonedView  		= Utils.clone(this)
		clonedView._parent 	= null
		clonedView._element = @_element.cloneNode no		
		clonedView._events 	= NULL
		clonedView._id 		= Utils.randomID()
		clonedView._element.setAttribute 'id', "MagiX#{@_kind}-" + clonedView.id
		clonedView._children = []
		clonedView

	querySelector    : (selector) -> @_element.querySelector selector
	querySelectorAll : (selector) -> @_element.querySelectorAll selector

	pixelAlign: ->
		@x = parseInt @x
		@y = parseInt @y

	contentFrame : ->
		maxWidth 	= 0
		maxHeight 	= 0
		i 			= 0
		
		while i < @children.length
			maxX 		= @children[i].x + @children[i].width
			maxY 		= @children[i].y + @children[i].height
			maxWidth 	= maxX if maxX > maxWidth
			maxHeight 	= maxY if maxY > maxHeight	
			i++
		return {
			x 		: 0
			y 		: 0
			width 	: maxWidth
			height 	: maxHeight
		}

	centerFrame: ->
		if @parent
			frame 	= @frame
			width 	= @parent.width
			width 	= @parent.cwidth() if Utils.isString(@parent.width)
			height 	= @parent.height
			height 	= @parent.cheight() if Utils.isString(@parent.height)
			Utils.frameSetMidX(frame, parseInt((width  / 2.0) - @borderWidth - @marginLeft))
			Utils.frameSetMidY(frame, parseInt((height / 2.0) - @borderWidth - @marginTop))
			return frame
		else
			frame = @frame
			Utils.frameSetMidX(frame, parseInt(@_context.width  / 2.0) - @borderWidth - @marginLeft)
			Utils.frameSetMidY(frame, parseInt(@_context.height / 2.0) - @borderWidth - @marginTop)
			return frame

	absoluteCenter: (autoResize)->
		frame = @centerFrame() # Center in parent
		@x = {
			value: frame.x
			centerX: true
		}
		@y = {
			value: frame.y
			centerY: true
		}

		if not autoResize
			return if not @parent
			if Utils.isString(@parent.width) || Utils.isString(@parent.height)
				that = @
				App.onResize ->
					frame = that.centerFrame() # Center  in parent
					if that._keepCenterX 
						that.x = {
							value: frame.x
							centerX: true
						}
					if that._keepCenterY
						that.y = {
							value: frame.y
							centerY: true
						}
		@

	absoluteCenterX: (offset=0, autoResize) ->
		@x = {
			value: @centerFrame().x + offset # Center x in parent
			centerX: true
		}
		
		if not autoResize
			return if not @parent
			if Utils.isString(@parent.width) || Utils.isString(@parent.height)
				that = @
				App.onResize ->
					frame = that.centerFrame() # Center  in parent
					if that._keepCenterX 
						that.x = {
							value: frame.x + offset
							centerX: true
						}
		@

	absoluteCenterY: (offset=0, autoResize) ->
		@y = {
			value: @centerFrame().y + offset # Center y in parent
			centerY: true
		}

		if not autoResize
			return if not @parent
			if Utils.isString(@parent.width) || Utils.isString(@parent.height)
				that = @
				App.onResize ->
					frame = that.centerFrame() # Center  in parent
					if that._keepCenterY 
						that.y = {
							value: frame.y + offset
							centerY: true
						}
		@

	center: ->
		@_element.style.position 	= "absolute"
		@x 							= "50%"
		@y 							= "50%"
		@marginLeft 				= -(@width / 2)
		@marginTop 					= -(@height / 2)
		return
	centerX : (offset) ->
		@element.style.position = 'absolute'
		@x 						= '50%'
		offset 					= 0 if offset is NULL
		@marginLeft 			= -(@width / 2) + offset
		return
	centerY : (offset) ->
		@element.style.position = 'absolute'
		@y 						= '50%'
		offset 					= 0 if offset is NULL
		@marginTop = -(@height / 2) + offset
		return


	##############################################################
	## ANIMATION

	animate : (options) ->
		start = options.start
		start = true if not start
		delete options.start

		options.view 	= @
		animation 		= new Animation options
		animation.start() if start
			
		return animation


	animations: ->
		@_context.animations.filter (animation) =>
			animation.options.view == @

	animatingProperties: ->
		properties = {}

		for animation in @animations()
			for propertyName in animation.animatingProperties()
				properties[propertyName] = animation
		return properties

	animateStop : ->
		Utils.invoke(@animations(), "stop")
		@_draggable?.animateStop()

	animatingProperties : ->
		properties 	= {}
		ref 		= @animations()
		i 			= 0
		len 		= ref.length

		while i < len
			animation 	= ref[i]
			ref1 		= animation.animatingProperties()
			j 			= 0
			len1 		= ref1.length

			while j < len1
				propertyName 				= ref1[j]
				properties[propertyName] 	= animation
				j++
			i++
		properties

	enterFullscreen : ->
		if not document.fullscreenElement or not document.webkitFullscreenElement or not document.mozFullScreenElement or not document.msFullscreenElement
			if @_element.requestFullscreen
				@_element.requestFullscreen()
			else if @_element.webkitRequestFullscreen
				@_element.webkitRequestFullscreen()
			else if @_element.mozRequestFullScreen
				@_element.mozRequestFullScreen()
			else if @_element.msRequestFullscreen
				@_element.msRequestFullscreen()
		return

	exitFullscreen : ->
		if document.fullscreenElement or document.webkitFullscreenElement or document.mozFullScreenElement or document.msFullscreenElement
			if document.exitFullscreen
				document.exitFullscreen()
			else if document.webkitExitFullscreen
				document.webkitExitFullscreen()
			else if document.mozCancelFullScreen
				document.mozCancelFullScreen()
			else if document.msExitFullscreen
				document.msExitFullscreen()
		return

	isFullscreen : ->
		if document.fullscreenEnabled or document.mozFullscreenEnabled or document.webkitIsFullScreen
			return yes
		return no

	fadeIn : (parameters) -> @_fade(1, parameters)
	fadeOut : (parameters) -> @_fade(0, parameters)

	show : -> @display = yes
	hide : -> @display = no

	removeAll : ->
		i = 0
		while i < @children.length
			@removeChild @children[i]
			i++
		return

	empty : -> @removeAll()

	##############################################################
	## EVENTS

	emit: (eventName, args...) ->
		if @_cancelClickEventInDragSession
			if eventName in [Event.Click,
				Event.Tap, Event.TapStart, Event.TapEnd,
				Event.LongPress, Event.LongPressStart, Event.LongPressEnd]
				if @_parentDraggableView()
					velocity = @_parentDraggableView()?.draggable.velocity
					return if Math.abs(velocity.x) > @_cancelClickEventInDragSessionVelocity
					return if Math.abs(velocity.y) > @_cancelClickEventInDragSessionVelocity
		super(eventName, args..., @)

	once: (eventName, listener) =>
		super(eventName, listener)
		@_addListener(eventName, listener)

	addListener: (eventName, listener) =>
		return if not eventName or not listener
		super(eventName, listener)
		@_addListener(eventName, listener)

	removeListener: (eventName, listener) ->
		throw Error("View.off needs a valid event name") unless eventName
		super(eventName, listener)
		@_removeListener(eventName, listener)

	_addListener: (eventName, listener) ->
		if Utils.domValidEvent(@_element, eventName) or eventName in Utils.values(Gesture)
			if not @_domEventManager.listeners(eventName).length
				@_domEventManager.addEventListener eventName, (event) =>
					@emit(eventName, event)

	_removeListener: (eventName, listener) ->
		if not @listeners(eventName).length
			@_domEventManager.removeAllListeners(eventName)

	_parentDraggableView: ->
		for view in @ancestors()
			return view if view._draggable?.enabled
		return null

	on: @::addListener
	off: @::removeListener

	##############################################################
	## EVENT HELPERS

	# Life cycle
	onWillAppear 		: (cb) -> 
		@on Event.WillAppear, cb
		return
	onAppear  			: (cb) -> 
		@on Event.Appear, cb
		return
	onDidAppear         : (cb) -> 
		@on Event.DidAppear, cb
		return
	onWillDisappear 	: (cb) -> 
		@on Event.WillDisappear, cb
		return
	onDisappear 		: (cb) -> 
		@on Event.Disappear, cb
		return
	onDidDisappear 		: (cb) -> 
		@on Event.DidDisappear, cb
		return

	# Mouse event
	onClick 			: (cb) -> 
		@on Event.Click, cb
		return
	onDoubleClick 		: (cb) -> 
		@on Event.DoubleClick, cb
		return
	onIn 				: (cb) -> 
		@on Event.In, cb
		return
	onOut 				: (cb) -> 
		@on Event.Out, cb
		return
	onDown 				: (cb) -> 
		@on Event.Down, cb
		return
	onOver 				: (cb) -> 
		@on Event.Over, cb
		return
	onUp 				: (cb) -> 
		@on Event.Up, cb
		return
	onMove 				: (cb) -> 
		@on Event.Move, cb
		return
	onRightClick 		: (cb) -> 
		@on Event.RightClick, cb
		return
	onMouseIn 			: (cb) -> 
		@on Event.MouseIn, cb
		return
	onMouseUp 			: (cb) -> 
		@on Event.MouseUp, cb
		return
	onMouseDown 		: (cb) -> 
		@on Event.MouseDown, cb
		return
	onMouseOver 		: (cb) -> 
		@on Event.MouseOver, cb
		return
	onMouseOut 			: (cb) -> 
		@on Event.MouseOut, cb
		return
	onMouseMove 		: (cb) -> 
		@on Event.MouseMove, cb
		return
	onMouseWheel 		: (cb) -> 
		@on Event.MouseWheel, cb
		return

	# Scroll event
	onScrollStart 				: (cb) -> 
		@on Event.ScrollStart, cb
		return
	onScroll 					: (cb) -> 
		@on Event.Scroll, cb
		return
	onScrollEnd 				: (cb) -> 
		@on Event.ScrollEnd, cb
		return
	onScrollAnimationDidStart 	: (cb) -> 
		@on Event.ScrollAnimationDidStart, cb
		return
	onScrollAnimationDidEnd 	: (cb) -> 
		@on Event.ScrollAnimationDidEnd, cb
		return

	# Touch Event
	onTouchStart 		: (cb) -> 
		@on Event.TouchStart, cb
		return
	onTouchEnd 			: (cb) -> 
		@on Event.TouchEnd, cb
		return
	onTouchMove 		: (cb) -> 
		@on Event.TouchMove, cb
		return

	# Animations
	onAnimationStart 	: (cb) -> 
		@on Event.AnimationStart, cb
		return
	onAnimationStop 	: (cb) -> 
		@on Event.AnimationStop, cb
		return
	onAnimationEnd 		: (cb) -> 
		@on Event.AnimationEnd, cb
		return
	onAnimationDidStart : (cb) -> 
		@on Event.AnimationDidStart, cb
		return
	onAnimationDidStop 	: (cb) -> 
		@on Event.AnimationDidStop, cb
		return
	onAnimationDidEnd 	: (cb) -> 
		@on Event.AnimationDidEnd, cb
		return

	# Draggable
	onDragStart 		 : (cb) -> 
		@on Event.DragStart, cb
		return
	onDragWillMove 		 : (cb) -> 
		@on Event.DragWillMove, cb
		return
	onDragMove 			 : (cb) -> 
		@on Event.DragMove, cb
		return
	onDragDidMove 		 : (cb) -> 
		@on Event.DragDidMove, cb
		return
	onDrag 				 : (cb) -> 
		@on Event.Drag, cb
		return
	onDragEnd 			 : (cb) -> 
		@on Event.DragEnd, cb
		return
	onDragAnimationStart : (cb) -> 
		@on Event.DragAnimationStart, cb
		return
	onDragAnimationEnd 	 : (cb) -> 
		@on Event.DragAnimationEnd, cb
		return
	onDirectionLockStart : (cb) -> 
		@on Event.DirectionLockStart, cb
		return

	onDragEnter 		: (cb) -> 
		@on(Event.DragEnter, cb)
		return
	onDragOver 			: (cb) -> 
		@on(Event.DragOver, cb)
		return
	onDragLeave 		: (cb) -> 
		@on(Event.DragLeave, cb)
		return
	onDrop 				: (cb) -> 
		@on(Event.Drop, cb)
		return

	# Switch
	onStateSwitch 		: (cb) -> 
		@on(Event.StateDidSwitch, cb)
		return
	onStateDidSwitch 	: (cb) -> 
		@on(Event.StateDidSwitch, cb)
		return
	onStateWillSwitch 	: (cb) -> 
		@on(Event.StateWillSwitch, cb)
		return

	# Gestures
	# Tap
	onTap 				:(cb) -> 
		@on(Event.Tap, cb)
		return
	onTapStart 			:(cb) -> 
		@on(Event.TapStart, cb)
		return
	onTapEnd 			:(cb) -> 
		@on(Event.TapEnd, cb)
		return
	onDoubleTap 		:(cb) -> 
		@on(Event.DoubleTap, cb)
		return

	# Force Tap
	onForceTap 			:(cb) -> 
		@on(Event.ForceTap, cb)
		return
	onForceTapChange 	:(cb) -> 
		@on(Event.ForceTapChange, cb)
		return
	onForceTapStart 	:(cb) -> 
		@on(Event.ForceTapStart, cb)
		return
	onForceTapEnd 		:(cb) -> 
		@on(Event.ForceTapEnd, cb)
		return

	# Press
	onLongPress 		:(cb) -> 
		@on(Event.LongPress, cb)
		return
	onLongPressStart 	:(cb) -> 
		@on(Event.LongPressStart, cb)
		return
	onLongPressEnd 		:(cb) -> 
		@on(Event.LongPressEnd, cb)
		return

	# Swipe
	onSwipe 			:(cb) -> 
		@on(Event.Swipe, cb)
		return
	onSwipeStart 		:(cb) -> 
		@on(Event.SwipeStart, cb)
		return
	onSwipeEnd 			:(cb) -> 
		@on(Event.SwipeEnd, cb)
		return

	onSwipeUp 			:(cb) -> 
		@on(Event.SwipeUp, cb)
		return
	onSwipeUpStart  	:(cb) -> 
		@on(Event.SwipeUpStart, cb)
		return
	onSwipeUpEnd 		:(cb) -> 
		@on(Event.SwipeUpEnd, cb)
		return

	onSwipeDown 		:(cb) -> 
		@on(Event.SwipeDown, cb)
		return
	onSwipeDownStart 	:(cb) -> 
		@on(Event.SwipeDownStart, cb)
		return
	onSwipeDownEnd 		:(cb) -> 
		@on(Event.SwipeDownEnd, cb)
		return

	onSwipeLeft 		:(cb) -> 
		@on(Event.SwipeLeft, cb)
		return
	onSwipeLeftStart	:(cb) -> 
		@on(Event.SwipeLeftStart, cb)
		return
	onSwipeLeftEnd		:(cb) -> 
		@on(Event.SwipeLeftEnd, cb)
		return

	onSwipeRight 		:(cb) -> 
		@on(Event.SwipeRight, cb)
		return
	onSwipeRightStart 	:(cb) -> 
		@on(Event.SwipeRightStart, cb)
		return
	onSwipeRightEnd 	:(cb) -> 
		@on(Event.SwipeRightEnd, cb)
		return

	# Pan
	onPan 				:(cb) -> 
		@on(Event.Pan, cb)
		return
	onPanStart 			:(cb) -> 
		@on(Event.PanStart, cb)
		return
	onPanEnd 			:(cb) -> 
		@on(Event.PanEnd, cb)
		return
	onPanLeft 			:(cb) -> 
		@on(Event.PanLeft, cb)
		return
	onPanRight 			:(cb) -> 
		@on(Event.PanRight, cb)
		return
	onPanUp 			:(cb) -> 
		@on(Event.PanUp, cb)
		return
	onPanDown 			:(cb) -> 
		@on(Event.PanDown, cb)
		return

	# Pinch
	###
	onPinch:(cb) -> @on(Event.Pinch, cb)
	onPinchStart:(cb) -> @on(Event.PinchStart, cb)
	onPinchEnd:(cb) -> @on(Event.PinchEnd, cb)
	###

	# Scale
	onScale 			:(cb) -> 
		@on(Event.Scale, cb)
		return
	onScaleStart 		:(cb) -> 
		@on(Event.ScaleStart, cb)
		return
	onScaleEnd 			:(cb) -> 
		@on(Event.ScaleEnd, cb)
		return

	# Rotate
	onRotate 			:(cb) -> 
		@on(Event.Rotate, cb)
		return
	onRotateStart 		:(cb) -> 
		@on(Event.RotateStart, cb)
		return
	onRotateEnd 		:(cb) -> 
		@on(Event.RotateEnd, cb)
		return

	##############################################################
	## INSPECTOR > USED BY SAY

	toInspect: ->
		round = (value) ->
			return parseInt(value) if parseInt(value) == value
			return Utils.round(value, 1)
		if @name
			return "<#{@_kind} id:#{@id} name:#{@name} (#{round(@x)},#{round(@y)}) #{round(@width)}x#{round(@height)}>"
		return "<#{@_kind} id:#{@id} (#{round(@x)},#{round(@y)}) #{round(@width)}x#{round(@height)}>"


	##############################################################
	# PRIVATE METHODS

	_createElement: ->
		@_element = document.createElement(@_elementType)
		@_element.setAttribute 'id', "MagiX#{@_kind}-" + @id
		@_element.style.overflow = 'hidden'
		@_element.style.outline  = 'none'
		@_element.style.position = 'relative'
		@_element.instance       = @

	_insertElement: ->
		@bringToFront()
		@_context._element.appendChild(@_element)

	_fade : (opacity, parameters)->
		parameters 	= {} if not parameters
		time 		= no
		
		if typeof parameters is 'number'
			time = parameters
			parameters = {}

		tmp_param = NULL
		final_param = {}
		if parameters and parameters.props
			tmp_param = Utils.clone parameters.props
		if parameters and parameters.properties
			tmp_param = Utils.clone parameters.properties

		for item of parameters
			if item isnt 'props' and item isnt 'properties'
				final_param[item] = parameters[item]

		if tmp_param isnt NULL
			for item of tmp_param
				final_param[item] = tmp_param[item]

		final_param.opacity 	= opacity
		final_param.curve 	= 'linear' if not final_param.curve
		final_param.time 	= time if time

		@animate final_param

	_updateShadow : ->
		return @_element.style.boxShadow = @shadowX + 'px ' + @shadowY + 'px ' + @shadowBlur + 'px ' + @shadowSpread + 'px ' + @shadowColor + ' ' + @shadowInset
		
	_updateEffects : ->
		@_f_blur = '' if not @_f_blur
		@_f_hueRotate = '' if not @_f_hueRotate
		@_f_invert = '' if not @_f_invert
		@_f_contrast = '' if not @_f_contrast
		@_f_grayscale = '' if not @_f_grayscale
		@_f_sepia = '' if not @_f_sepia
		@_f_saturate = '' if not @_f_saturate
		@_f_brightness = '' if not @_f_brightness

		effect = @_f_blur + @_f_brightness + @_f_saturate + @_f_hueRotate + @_f_contrast + @_f_invert + @_f_sepia + @_f_grayscale
		@_element.style.WebkitFilter = effect
		@_element.style.filter = effect
		return

	_updateBackDropEffects : ->
		@_bf_blur = '' if not @_bf_blur
		@_bf_hueRotate = '' if not @_bf_hueRotate
		@_bf_invert = '' if not @_bf_invert
		@_bf_contrast = '' if not @_bf_contrast
		@_bf_grayscale = '' if not @_bf_grayscale
		@_bf_sepia = '' if not @_bf_sepia
		@_bf_saturate = '' if not @_bf_saturate
		@_bf_brightness = '' if not @_bf_brightness

		effect = @_bf_blur + @_bf_brightness + @_bf_saturate + @_bf_hueRotate + @_bf_contrast + @_bf_invert + @_bf_sepia + @_bf_grayscale
		@_element.style.WebkitBackdropFilter = effect
		@_element.style.backdropFilter = effect
		return

	_updateTransform : ->
		transform = ''

		# Translate
		if @_translateX isnt NULL or @_translateY isnt NULL
			unitX = ''
			unitY = ''
			unitX = 'px' if typeof @_translateX is 'number'
			unitY = 'px' if typeof @_translateY is 'number'
			transform += 'translate(' + @_translateX + '' + unitX + ', ' + @_translateY + '' + unitY + ') '
			
		# Transform Z
		if @_translateZ isnt NULL
			unitZ = ''
			unitZ = 'px' if typeof @_translateZ is 'number'
			transform += 'translateZ(' + @_translateZ + '' + unitZ + ') '

		# Rotation
		if @_rotation isnt NULL
			transform += 'rotate(' + @_rotation + 'deg) '
		if @_rotationX isnt NULL
			transform += 'rotateX(' + @_rotationX + 'deg) '
		if @_rotationY isnt NULL
			transform += 'rotateY(' + @_rotationY + 'deg) '
		if @_rotationZ isnt NULL
			transform += 'rotateZ(' + @_rotationZ + 'deg) '
		
		# Scale
		if @_scale isnt NULL
			if @_scaleX is @_scaleY
				transform += 'scale(' + @_scaleX + ') '
			else
				transform += 'scale(' + @_scaleX + ', ' + @_scaleY + ') '
		
		# Skew
		if @_skewX isnt NULL or @_skewY isnt NULL
			if @_skewX is @_skewY
				transform += 'skew(' + @_skewX + 'deg) '
			else
				transform += 'skew(' + @_skewX + 'deg, ' + @_skewY + 'deg) '
		
		@_element.style.webkitTransform = transform
		@_element.style.mozTransform = transform
		@_element.style.msTransform = transform
		@_element.style.oTransform = transform
		@_element.style.transform = transform

