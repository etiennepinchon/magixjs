class View extends Element
	constructor: (options={}) ->
		super
		
		@_children = []

		# We have to create the element before we set the defaults
		@_createElement()
		@userInteraction = false

		# Add this view to the current context
		@_context.addView(@)

		@_context.emit("view:create", @)

		@props = Defaults.getDefaults @_kind, options

		delete options.parent if options.parent
		delete options.addTo if options.addTo

		if options.props
			@props = options.props


	##############################################################
	# Properties


	_kind : 'View'
	_elementType : 'div'


	##############################################################
	# BASICS

	##############################################################
	# DOM ELEMENTS

	_createElement: ->
		# Create element
		@_element = document.createElement(@_elementType)
		@_element.setAttribute 'id', "Orbe#{@_kind}::" + @id

		# Clip the view by default
		@_element.style.overflow = 'hidden'
		
		# Remove outline
		@_element.style.outline = 'none'
		
		# Set the basic position type of the element
		@_element.style.position = 'relative'

		# Hacky thing here to get this from the element
		@_element.instance = @


	_insertElement: ->
		@bringToFront()
		@_context._element.appendChild(@_element)


	@define 'html',
		get: ->
			#@_elementHTML?.innerHTML or ""
			@_element.innerHTML or ""
		set: (value) ->

			# Insert some html directly into this view. We actually create
			# a child node to insert it in, so it won't mess with the
			# view hierarchy.

			#if not @_elementHTML
			#	@_elementHTML = document.createElement "div"
			#	@_element.appendChild @_elementHTML

			@_element.innerHTML = value
			@emit 'change:html', value

	@define 'context', get: -> @_context
	@define '_domEventManager', get: -> @_context.domEventManager.wrap @_element
	@define 'element', get: -> @_element


	##############################################################
	# CSS

	@define 'style',
		importable: true
		exportable: false
		get: -> @_element.style
		set: (value) ->
			Utils.extend @_element.style, value
			@emit "change:style"
	
	# *********************************
	# classList property
	#
	# ** Add a class to your view
	# ** Enable you to add an external css sheets to controle your views

	@define 'classList',
		importable: true
		exportable: false
		get: -> @_element.classList


	# *********************************
	# Quick event properties properties
	# *********************************

	@define 'click',
		get: -> @_eventClick
		set: (value) ->	
			@_eventClick = value
			@on Event.Click, value
	@define 'doubleClick',
		get: -> @_eventDoubleClick
		set: (value) ->
			@_eventDoubleClick = value
			@on Event.DoubleClick, value
	@define 'down',
		get: -> @_eventDown
		set: (value) ->
			@_eventDown = value
			@on Event.Down, value
	@define 'over',
		get: -> @_eventOver
		set: (value) ->
			@_eventOver = value
			@on Event.Over, value
	@define 'up',
		get: -> @_eventUp
		set: (value) ->
			@_eventUp = value
			@on Event.Up, value
	@define 'in',
		get: -> @_eventIn
		set: (value) ->
			@_eventIn = value
			@on Event.In, value
	@define 'out',
		get: -> @_eventOut
		set: (value) -> 
			@_eventOut = value
			@on Event.Out, value

	@define 'mouseDown',
		get: -> @_eventDown
		set: (value) ->
			@_eventDown = value
			@on Event.Down, value
	@define 'mouseOver',
		get: -> @_eventOver
		set: (value) ->
			@_eventOver = value
			@on Event.Over, value
	@define 'mouseUp',
		get: -> @_eventUp
		set: (value) ->
			@_eventUp = value
			@on Event.Up, value
	@define 'mouseIn',
		get: -> @_eventIn
		set: (value) ->
			@_eventIn = value
			@on Event.In, value
	@define 'mouseOut',
		get: -> @_eventOut
		set: (value) -> 
			@_eventOut = value
			@on Event.Out, value


	##############################################################
	## DEFINITIONS
	
	@_def = (name, get_default, set_action) ->
		@define name,
			get: ->
				return get_default if @["_#{name}"] is undefined	
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


	##############################################################
	# Properties

	# Perform action -> Will always be called at the end of of a props list if in it
	@define 'do',
		get: ->
			@_do
		set: (fn) ->
			if Utils.isFunction(fn)
				@_do = fn
				fn.call(this)

	# *********************************
	# name property
	#
	# * Add name to the element
	
	@define 'name',
		get : ->
			@_getPropertyValue 'name'
		set : (value) ->
			@_setPropertyValue 'name', value
			@_element.setAttribute 'name', value

	# *********************************
	# fixed property
	#
	# * Change the position of the view to fixed
	# * The view will not move if the parent view is scrolled

	@_def 'fixed', false, (value)-> 
		if value is true
			@_fixed = true
			@_element.style.position = 'fixed'
		else
			@_fixed = false

			if @_element.style.left isnt ''
				@_element.style.position = 'absolute'
			else
				@_element.style.position = ''

	
	
	##############################################################
	# MARGIN
	
	@define 'margin',
		get: ->
			if @_margin is undefined
				@_margin =
					x: 0
					y: 0
					top: 0
					right: 0
					bottom: 0
					left: 0
			@_margin

		set: (value) ->
			if @_margin is undefined
				@_margin =
					x: 0
					y: 0
					top: 0
					right: 0
					bottom: 0
					left: 0

			if typeof value isnt 'object'
				
				# Auto alias
				if value is 'center'
					value = 'auto'

				@_margin.x = value
				@_margin.y = value
				@_margin.top = value
				@_margin.right = value
				@_margin.bottom = value
				@_margin.left = value

			else

				if value.x isnt undefined
					
					# Auto alias
					if value.x is 'center'
						value.x = 'auto'

					@_margin.x = value.x

					if value.left is undefined
						value.left = value.x

					if value.right is undefined
						value.right = value.x

				if value.y isnt undefined
					# Auto alias
					if value.y is 'center'
						value.y = 'auto'

					@_margin.y = value.y

					if value.top is undefined
						value.top = value.y
					if value.bottom is undefined
						value.bottom = value.y

				if value.top isnt undefined
					@_margin.top = value.top

				if value.bottom isnt undefined
					@_margin.bottom = value.bottom

				if value.left isnt undefined
					@_margin.left = value.left

				if value.right isnt undefined
					@_margin.right = value.right

			@emit 'change:margin', @_margin
			output = ''

			i = undefined
			for item of @_margin
				if item isnt 'x' and item isnt 'y'
					i = @_margin[item]
					if typeof @_margin[item] is 'number'
						i = @_margin[item] + 'px'
					output += i + ' '

			@_element.style.margin = output

	@_alias 'mg', 'margin'

	@define 'marginX',
		get: ->
			@margin.x
		set: (value) ->
			@margin = x: value
	
	@define 'marginY',
		get: ->
			@margin.y
		set: (value) ->
			@margin = y: value
	
	@define 'marginTop',
		get: ->
			@margin.top
		set: (value) ->
			@margin = top: value
	
	@define 'marginRight',
		get: ->
			@margin.right
		set: (value) ->
			@margin = right: value
	
	@define 'marginBottom',
		get: ->
			@margin.bottom
		set: (value) ->
			@margin = bottom: value

	@define 'marginLeft',
		get: ->
			@margin.left
		set: (value) ->
			@margin = left: value
			return


	##############################################################
	# PADDING

	@define 'padding',
		get: ->
			if @_padding is undefined
				@_padding =
					x: 0
					y: 0
					top: 0
					right: 0
					bottom: 0
					left: 0

			@_padding
		set: (value) ->
			if @_padding is undefined
				@_padding =
					x: 0
					y: 0
					top: 0
					right: 0
					bottom: 0
					left: 0

			if typeof value isnt 'object'
				@_padding.x = value
				@_padding.y = value
				@_padding.top = value
				@_padding.right = value
				@_padding.bottom = value
				@_padding.left = value

			else
				if value.x isnt undefined
					@_padding.x = value.x
					if value.left is undefined
						value.left = value.x
					if value.right is undefined
						value.right = value.x

				if value.y isnt undefined
					@_padding.y = value.y

					if value.top is undefined
						value.top = value.y

					if value.bottom is undefined
						value.bottom = value.y

				if value.top isnt undefined
					@_padding.top = value.top
				if value.bottom isnt undefined
					@_padding.bottom = value.bottom
				if value.left isnt undefined
					@_padding.left = value.left
				if value.right isnt undefined
					@_padding.right = value.right

			@emit 'change:padding', @_padding
			output = ''

			i = undefined
			for item of @_padding
				if item isnt 'x' and item isnt 'y'
					i = @_padding[item]
					if typeof @_padding[item] is 'number'
						i = @_padding[item] + 'px'
					output += i + ' '
			@_element.style.padding = output


	# ** Alias of padding
	@_alias 'pg', 'padding'

	@define 'paddingX',
		get: ->
			@padding.x
		set: (value) ->
			@padding = x: value

	@define 'paddingY',
		get: ->
			@padding.y
		set: (value) ->
			@padding = y: value

	@define 'paddingTop',
		get: ->
			@padding.top
		set: (value) ->
			@padding = top: value

	@define 'paddingRight',
		get: ->
			@padding.right
		set: (value) ->
			@padding = right: value

	@define 'paddingBottom',
		get: ->
			@padding.bottom
		set: (value) ->
			@padding = bottom: value

	@define 'paddingLeft',
		get: ->
			@padding.left
		set: (value) ->
			@padding = left: value

	@define 'x',
		get: ->
			left = @_element.style.left
			if left.indexOf('px') >= 0
				left = parseFloat(left, 10)
			if left is ''
				left = 0
			left
		set: (value) ->

			@_keepCenterX = false

			if Utils.isObject(value)
				if value.centerX
					@_keepCenterX = true

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
			if top.indexOf('px') >= 0
				top = parseFloat(top, 10)
			if top is ''
				top = 0
			top
		set: (value) ->
			@_keepCenterY = false

			if Utils.isObject(value)
				if value.centerY
					@_keepCenterY = true

				value = value.value

			if Utils.isNumber(value)
				value = value + 'px'
			
			if not @fixed
				@_element.style.position = 'absolute'
			
			@_element.style.top = value
			@emit 'change:y', value
			@emit 'change:top', value
			@emit 'change:point', @point
			@emit 'change:frame', @frame
	


	@_alias 'top', 'y'
	@_alias 'left', 'x'
	
	@define 'bottom',
		get: ->
			bottom = @_element.style.bottom
			if bottom.indexOf('px') >= 0
				bottom = parseFloat(bottom, 10)
			if bottom is ''
				bottom = 0
			bottom
		set: (value) ->
			
			if Utils.isNumber(value)
				value = value + 'px'
			
			if not @fixed
				@_element.style.position = 'absolute'
			
			@_element.style.bottom = value
			@emit 'change:bottom', value

	@define 'right',
		get: ->
			right = @_element.style.right
			if right.indexOf('px') >= 0
				right = parseFloat(right, 10)
			if right is ''
				right = 0
			right
		set: (value) ->
			if Utils.isNumber(value)
				value = value + 'px'
			
			if not @fixed
				@_element.style.position = 'absolute'
			
			@_element.style.right = value
			@emit 'change:right', value


	@define 'width',
		configurable: true
		get: ->
			# If the width is not a number (like a percentage) we return the raw value instead of the numeric value
			# Improvement: allow to retrive the numeric value..
			if @_width isnt undefined and typeof @_width isnt 'number'
				return @_width
			
			if @_element.offsetWidth is 0 and @_width isnt undefined
				return @_width
			
			leftBorder = if @_element.style.borderLeftWidth isnt '' then @_element.style.borderLeftWidth else 0
			rightBorder = if @_element.style.borderRightWidth isnt '' then @_element.style.borderRightWidth else 0
			borders = parseFloat(leftBorder, 10) + parseFloat(rightBorder, 10)
			@_element.offsetWidth - borders
		
		set: (value) ->
			if value is 'auto'
				@_element.style.width = ''
				return
			
			@_width = value
			
			if Utils.isNumber(value)
				value = value + 'px'
			@_element.style.width = value

			@emit 'change:width', @_width
			@emit 'change:size', @size
			@emit 'change:frame', @frame

	@define 'height',
		configurable: true
		get: ->
			# If the height is not a number (like a percentage) we return the raw value instead of the numeric value
			if @_height isnt undefined and typeof @_height isnt 'number'
				return @_height
			if @_element.offsetHeight is 0 and @_height isnt undefined
				return @_height
			topBorder = if @_element.style.borderTopWidth isnt '' then @_element.style.borderTopWidth else 0
			bottomBorder = if @_element.style.borderBottomWidth isnt '' then @_element.style.borderBottomWidth else 0
			borders = parseFloat(topBorder, 10) + parseFloat(bottomBorder, 10)
			@_element.offsetHeight - borders

		set: (value) ->
			if value is 'auto'
				@_element.style.height = ''
				return

			@_height = value
			
			if Utils.isNumber(value)
				value = value + 'px'

			@_element.style.height = value

			@emit 'change:height', @_height
			@emit 'change:size', @size
			@emit 'change:frame', @frame
			return


	@_alias 'w', 'width'
	@_alias 'h', 'height'

	@_def 'minWidth', null, (value) ->
		value = value + 'px' if Utils.isNumber(value)
		@_element.style.minWidth = value

	@_def 'maxWidth', null, (value) ->
		value = value + 'px' if Utils.isNumber(value)
		@_element.style.maxWidth = value


	@_def 'minHeight', null, (value) ->
		value = value + 'px' if Utils.isNumber(value)
		@_element.style.minHeight = value

	@_def 'maxHeight', null, (value) ->
		value = value + 'px' if Utils.isNumber(value)
		@_element.style.maxHeight = value


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


	# *********************************
	# point property
	# *********************************
	# ** Return the current positions of the view

	@define 'point',
		get: ->
			{
				x: @x
				y: @y
			}
		set: (value) ->
			if value.x isnt undefined
				@x = value.x
			if value.y isnt undefined
				@y = value.y
			return


	# *********************************
	# size property
	# *********************************
	# ** Return the current size of the view

	@define 'size',
		get: ->
			{
				width: @width
				height: @height
			}
		set: (value) ->
			if value.width isnt undefined
				@width = value.width
			if value.height isnt undefined
				@height = value.height
			return


	# *********************************
	# frame property
	# *********************************
	# ** Return the current frame of the view

	@define 'frame',
		get: ->
			{
				x: @x
				y: @y
				width: @width
				height: @height
			}
		set: (value) ->
			if value.x isnt undefined
				@x = value.x
			if value.y isnt undefined
				@y = value.y
			if value.width isnt undefined
				@width = value.width
			if value.height isnt undefined
				@height = value.height
			return


	# *********************************
	# windowFrame property
	# *********************************
	# ** Return the current frame of the view from the window perpective

	@define 'windowFrame',
		get: ->
			{
				x: @_element.getBoundingClientRect().left
				y: @_element.getBoundingClientRect().top
				width: @width
				height: @height
			}
		set: (value) ->
			if value.x isnt undefined
				@x = value.x
			if value.y isnt undefined
				@y = value.y
			if value.width isnt undefined
				@width = value.width
			if value.height isnt undefined
				@height = value.height
			@fixed = true


	# *********************************
	# backgroundColor property
	# *********************************
	# ** Change the background color of a view

	@define 'backgroundColor',
		configurable: true
		get: ->
			if @_background is undefined
				return null
			@_background

		set: (value) ->
			if not value
				value = '' 
			
			# Add alias of transparent
			if value is 'clear'
				value = 'transparent'
				
			value = Color.toColor(value)

			if value and value.color
				@_background = value.color
			else
				@_background = value

			@_element.style.background = value

	@_alias 'bc', 'backgroundColor'

	# *********************************
	# display property
	# *********************************
	# ** Change the display of the view

	@define 'display',
		get: ->
			return false if @_element.style.display is 'none'
			return true if @_element.style.display is ''
			@_element.style.display
		set: (value) ->
			if not Utils.isString(value)
				if value is true
					@_element.style.display = 'block'
				else
					@_element.style.display = 'none'
			else
				@_element.style.display = value
				@_element.style.webkitDisplay = value

	@define 'visible',
		get: ->
			visibility = @_element.style.visibility
			return true if visibility is 'visible' or visibility is ''
			false
		set: (value) ->
			if value is true
				value = 'visible'
			else
				value = 'hidden'
			@_element.style.visibility = value

	# *********************************
	# image property
	# *********************************
	# ** Add a background image to your view

	@define 'image',
		configurable: true
		get: ->
			return false if @_image is undefined
			@_image
		set: (value) ->
			# Unset the background color
			@_background = null

			@_image = value
			@_element.style.backgroundImage = 'url(' + Utils.parseAsset(value) + ')'
			@_element.style.backgroundSize = 'cover'
			@imageRepeat = false

	@_alias 'backgroundImage', 'image'

	# Set an background image in the view
	# myButton.background = "URL";
	@define 'background',
		get: ->
			@image
		set: (value) ->
			# July 13, 2016 : Patch value.color for gradient support
			if Color.isColor(value) or value.color
				@backgroundColor = value
			else
				@image = value
				@imagePosition = 'center center'
				@imageSize = 'cover'
				@imageRepeat = false


	# *********************************
	# imageSize property
	# *********************************
	# ** Change the background image size

	@define 'imageSize',
		get: ->
			return 'cover' if @_imageSize is undefined
			@_image
		set: (value) ->
			@_imageSize = value

			# Allow to use it the same way we use scale -> imageSize: 0.8
			value = (value*100) + '%' if Utils.isNumber(value)
			@_element.style.backgroundSize = value

	@_alias 'imageScale', 'imageSize'

	# *********************************
	# imageRepeat property
	# *********************************
	# ** Make the background image repeat or not

	@define 'imageRepeat',
		get: ->
			return true if @_imageRepeat is undefined
			@_imageRepeat
		set: (value) ->
			if value is true or value is 'repeat'
				@_imageRepeat = true
				@_element.style.backgroundRepeat = 'repeat'
				# Disable fullscreen background
				if @imageSize is 'cover'
					@imageSize = 'auto'
			else
				@_imageRepeat = false
				@_element.style.backgroundRepeat = 'no-repeat'

	# *********************************
	# imageFixed property
	# *********************************
	# ** Make the background image fixed (no movement on scroll)

	@define 'imageFixed',
		get: ->
			if @_imageFixed is undefined
				@_imageFixed = false
			@_imageFixed
		set: (value) ->
			if value is true
				@_imageFixed = true
				@_element.style.backgroundAttachment = 'fixed'
			else
				@_imageFixed = false
				@_element.style.backgroundAttachment = 'scroll'

	# *********************************
	# imagePosition property
	# *********************************
	# ** Chage the position of the background image

	@define 'imagePosition',
		get: ->
			if @_imagePosition is undefined
				@_imagePosition = ''
			@_imagePosition
		set: (value) ->
			@_imagePosition = value
			if typeof value is 'number'
				value = value + 'px'
			@_element.style.backgroundPosition = value


	# *********************************
	# opacity property
	#
	# ** Change the opacity of the view

	@_def_style 'opacity','opacity', 1
	@_alias 'alpha', 'opacity'

	# *********************************
	# clip property
	# *********************************
	# ** Hide anything that go beyond the view frame

	@define 'clip',
		get: ->
			if @_clip is undefined
				@_clip = true
			@_clip
		set: (value) ->
			if value is true
				@_clip = true
				@_element.style.overflow = 'hidden'
			else
				@_clip = false
				@_element.style.overflow = 'visible'


	##############################################################
	## SCROLLING

	# *********************************
	# scrollTop property
	# *********************************
	# ** Set/Get scrollTop property

	@define 'scrollTop',
		get: ->
			@_element.scrollTop
		set: (value) ->
			@_element.scrollTop = value

	@_alias 'scrollY', 'scrollTop'

	# *********************************
	# scrollLeft property
	# *********************************
	# ** Set/Get scrollLeft property

	@define 'scrollLeft',
		get: ->
			@_element.scrollLeft
		set: (value) ->
			@_element.scrollLeft = value

	@_alias 'scrollX', 'scrollLeft'

	# *********************************
	# scrollFrame property
	# *********************************

	@define "scrollFrame",
		importable: false
		get: ->
			frame =
				x: @scrollX
				y: @scrollY
				width: @width
				height: @height
		set: (frame) ->
			@scrollX = frame.x
			@scrollY = frame.y
				
	# *********************************
	# scrollWidth property
	# *********************************
	# ** Get scrollWidth property
	# READ ONLY

	@define 'scrollWidth', get: ->
		@_element.scrollWidth


	# *********************************
	# scrollHeight property
	# *********************************
	# ** Get scrollHeight property
	# READ ONLY

	@define 'scrollHeight', get: ->
		@_element.scrollHeight


	# *********************************
	# Scroll property
	# *********************************
	# ** Allow a view to be scrolled

	@define 'scroll',
		configurable: true
		get: ->
			return false if @_scroll is undefined
			@_scroll
		set: (value) ->
			if value is true
				@_scroll = true
				@_element.style.overflow = 'scroll'
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
			return false if @_scrollHorizontal is undefined
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
			return false if @_scrollVertical is undefined
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


	##############################################################
	## HIERARCHY


	# *********************************
	# parent property
	# 
	# * Define the parent of the view
	# * Insert the view inside his parent

	@define 'parent',
		enumerable: false
		exportable: false
		importable: true
		get: ->
			@_parent or null
		set: (view) -> 
			# Return if view already inserted
			return if view is @_parent

			# Cancel previous pending insertions
			Utils.domCompleteCancel @__insertElement

			# Remove from previous parent children
			if @_parent
				if @_parent is App._wrapper
					App._page = null
					App.emit 'change:page', {added:[], removed:[@]}
					
				# WillDisappear
				@emit Event.WillDisappear
				if @willDisappear
					@willDisappear()

				@_parent._children = Utils.without @_parent._children, @

				# Check if element exist in the dom first
				if @_element.parentNode is @_parent._element
					@_parent._element.removeChild @_element

				@_parent.emit "change:children", {added:[], removed:[@]}

				# DidDisappear
				@emit Event.DidDisappear
				if @didDisappear
					@didDisappear()

			# Either insert the element to the new parent element or into dom
			if view
				if view._kind is 'App'
					if @_kind is 'Page'
						view = App._wrapper
						App._page = @
						App._pages_counter++
					else
						throw Error("View: parent view must be a page, not the App.")
						return
					
				# WillAppear
				@emit Event.WillAppear
				if @willAppear
						@willAppear(@__options)

				view._element.appendChild @_element
				view._children.push @

				if view._kind is 'App' and @_kind is 'Page'
					App.emit 'change:page', {added:[@], removed:[]}

				view.emit "change:children", {added:[@], removed:[]}
				
				# DidAppear
				if @didAppear
					@_didAppear = yes
					@didAppear(@__options)
				@emit Event.DidAppear
					
			# Set the parent
			@_parent = view

			@emit "change:parent"

	@_alias 'addTo', 'parent'


	@define 'children',
		enumerable: no
		exportable: no
		importable: no
		get: -> Utils.clone @_children

	# *********************************
	# siblings method
	# 
	# * Get all the siblings views of a specific view
	
	@define 'siblings',
		enumerable: false
		exportable: false
		importable: false
		get: ->
			if not @parent
			  return null

			Utils.without @parent._children, @


	# *********************************
	# descendants property
	# 
	# * Get all the descendance of a view

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


	# *********************************
	# index property
	# *********************************
	# ** Change the viewing order of the view

	@define 'index',
		get: ->
			if not @_index
				@_index = 0
			@_index
		set: (value) ->
			@_index = parseInt(value)
			@emit 'change:index', value
			@_element.style.zIndex = value



	# *********************************
	# flex property
	#
	# * Change the flex of the view
	# http://www.w3schools.com/cssref/tryit.asp?filename=trycss3_flex-grow

	@define 'flex',
		get: ->
			@_flex
		set: (value) ->
			if value is true
				@_element.style.flex = '1'
			else if value is false
				@_element.style.flex = '0'
			else
				@_element.style.flex = String(value)
				@_element.style.webkitFlex = String(value)
			@_flex = value




	##############################################################
	# SHADOWS, FILTERS, TRANSFORMATIONS


	##############################################################
	# TRANSFORMATIONS

	@define 'originX',
		get: ->
			return 0.5 if @_originX is undefined
			@_originX
		set: (value) ->
			value = 0.5 if value < 0 or value > 1
			@_originX = value
			@_originY = 0.5 if @_originY is undefined
			@_element.style.transformOrigin = value * 100 + '% ' + @_originY * 100 + '%'
			return

	@define 'originY',
		get: ->
			return 0.5 if @_originY is undefined
			@_originY
		set: (value) ->
			value = 0.5 if value < 0 or value > 1
			@_originY = value
			@_originX = 0.5 if @_originX is undefined
			@_element.style.transformOrigin = @_originX * 100 + '% ' + value * 100 + '%'


	@_def 'perspective', 0, (value)-> 
		@_element.style.perspective = value + 'px'

	@_def 'preserve3D', no, (value)->
		if value
			value = 'preserve-3d'
		else
			value = 'flat'
		@_element.style.webkitTransformStyle = value
		@_element.style.transformStyle = value

	@_def 'translate', 0, (value)-> 
		@_translateX = value
		@_translateY = value
		@_updateTransform()

	@_def 'translateX', 0, (value)-> 
		@_translateY = 0 if @_translateY is undefined
		@_updateTransform()

	@_def 'translateY', 0, (value)-> 
		@_translateX = 0 if @_translateX is undefined
		@_updateTransform()

	@_def 'translateZ', 0, (value)-> 
		@_translateZ = 0 if @_translateZ is undefined
		@_updateTransform()

	@_def 'rotation', 0, -> @_updateTransform()
	@_alias 'rotate', 'rotation'

	@_def 'rotationX', 0, -> @_updateTransform()
	@_alias 'rotateX', 'rotationX'

	@_def 'rotationY', 0, -> @_updateTransform()
	@_alias 'rotateY', 'rotationY'

	@_def 'rotationZ', 0, -> @_updateTransform()
	@_alias 'rotateZ', 'rotationZ'


	@_def 'scale', 1, (value)-> 
		@_scaleX = value
		@_scaleY = value
		@_updateTransform()

	@_def 'scaleX', 1, (value)-> 
		@_scaleY = 1 if @_scaleY is undefined
		@_updateTransform()

	@_def 'scaleY', 1, (value)-> 
		@_scaleX = 1 if @_scaleX is undefined
		@_updateTransform()



	@_def 'skew', 0, (value)-> 
		@_skewX = value
		@_skewY = value
		@_updateTransform()

	@_def 'skewX', 0, (value)-> 
		@_skewY = 0 if @_skewY is undefined
		@_updateTransform()

	@_def 'skewY', 0, (value)-> 
		@_skewX = 0 if @_skewX is undefined
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
	
	@define 'hueRotate',
		get: ->
			return 0 if @_hueRotate is undefined
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
			return 0 if @_invert is undefined
			@_invert
		set: (value) ->
			value = 0 if value < 0 or value > 100
			@_invert = value

			@_f_invert = 'invert(' + value + '%) '
			@_updateEffects()

	@define 'grayscale',
		get: ->
			return 0 if @_grayscale is undefined
			@_grayscale
		set: (value) ->
			value = 0 if value < 0 or value > 100
			@_grayscale = value

			@_f_grayscale = 'grayscale(' + value + '%) '
			@_updateEffects()

	@define 'sepia',
		get: ->
			return 0 if @_sepia is undefined
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
			return 0 if @_hueRotate is undefined
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
			return 0 if @_invert is undefined
			@_invert
		set: (value) ->
			value = 0 if value < 0 or value > 100
			@_invert = value

			@_bf_invert = 'invert(' + value + '%) '
			@_updateBackDropEffects()

	@define 'backdropGrayscale',
		get: ->
			return 0 if @_grayscale is undefined
			@_grayscale
		set: (value) ->
			value = 0 if value < 0 or value > 100
			@_grayscale = value

			@_bf_grayscale = 'grayscale(' + value + '%) '
			@_updateBackDropEffects()

	@define 'backdropSepia',
		get: ->
			return 0 if @_sepia is undefined
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
			return '' if @_shadowInset is undefined
			@_shadowInset
		set: (value) ->
			if value is true
				value = 'inset'
			else
				value = ''
			@_shadowInset = value
			@_updateShadow()


	# *********************************
	# borderBox property
	#
	# * Specify that <div> elements should have padding and border included in the element's total width and height
	# * The width and height properties (and min/max properties) includes content,
	# * padding and border, but not the margin

	@define 'borderBox',
		get: ->
			if @_borderBox is undefined
				@_borderBox = false
			@_borderBox
		set: (value) ->
			if value is true
				@_borderBox = true
				@_element.style.boxSizing = 'border-box'
			else
				@_borderBox = false
				@_element.style.boxSizing = 'content-box'

	@_def 'borderRadius', 0, (value)->
		value = value + 'px' if typeof value is 'number'
		@_element.style.borderRadius = value
		@_element.style.webkitBorderRadius = value
		@_element.style.mozBorderRadius = value
		@_element.style.msBorderRadius = value
		@_element.style.oBorderRadius = value

	@_alias 'br', 'borderRadius'
	@_alias 'cornerRadius', 'borderRadius'

	@_def 'borderTopLeftRadius', 0, (value) ->
		value = value + 'px' if typeof value is 'number'
		@_element.style.borderTopLeftRadius = value
		@_element.style.webkitBorderTopLeftRadius = value
		@_element.style.mozBorderTopLeftRadius = value
		@_element.style.msBorderTopLeftRadius = value
		@_element.style.oBorderTopLeftRadius = value

	@_def 'borderTopRightRadius', 0, (value) ->
		value = value + 'px' if typeof value is 'number'
		@_element.style.borderTopRightRadius = value
		@_element.style.webkitBorderTopRightRadius = value
		@_element.style.mozBorderTopRightRadius = value
		@_element.style.msBorderTopRightRadius = value
		@_element.style.oBorderTopRightRadius = value

	@_def 'borderBottomLeftRadius', 0, (value) ->
		value = value + 'px' if typeof value is 'number'
		@_element.style.borderBottomLeftRadius = value
		@_element.style.webkitBorderBottomLeftRadius = value
		@_element.style.mozBorderBottomLeftRadius = value
		@_element.style.msBorderBottomLeftRadius = value
		@_element.style.oBorderBottomLeftRadiuss = value

	@_def 'borderBottomRightRadius', 0, (value) ->
		value = value + 'px' if typeof value is 'number'
		@_element.style.borderBottomRightRadius = value
		@_element.style.webkitBorderBottomRightRadius = value
		@_element.style.mozBorderBottomRightRadius = value
		@_element.style.msBorderBottomRightRadius = value
		@_element.style.oBorderBottomRightRadius = value

	##############################################################
	# BORDER
			
	@_def 'borderColor', '', (value) ->
		value = 'transparent' if value is 'clear' # Add alias of transparent
		@_element.style.borderColor = value

	@_def 'borderTopColor', '', (value) ->
		value = 'transparent' if value is 'clear' # Add alias of transparent
		@_element.style.borderTopColor = value

	@_def 'borderBottomColor', '', (value) ->
		value = 'transparent' if value is 'clear' # Add alias of transparent
		@_element.style.borderBottomColor = value

	@_def 'borderLeftColor', '', (value) ->
		value = 'transparent' if value is 'clear' # Add alias of transparent
		@_element.style.borderLeftColor = value

	@_def 'borderRightColor', '', (value) ->
		value = 'transparent' if value is 'clear' # Add alias of transparent
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


	# *********************************
	# userInteraction property
	#
	# * Allow you to disable the user interaction from a view

	@define 'userInteraction',
		get: ->
			if @_userInteraction is undefined
				@_userInteraction = false
			@_userInteraction
		set: (value) ->
			if value is true
				@_userInteraction = true
				@classList.remove 'no-select'
				@classList.add 'select'
			else
				@_userInteraction = false
				@classList.remove 'select'
				@classList.add 'no-select'

	@_alias 'interaction', 'userInteraction'


	##############################################################
	## STATES

	@define "states",
		enumerable: false
		exportable: false
		importable: false
		get: -> @_states ?= new ViewStates @

	#############################################################################
	## Draggable

	@define 'draggable',
		#importable: false
		#exportable: false
		get: -> @_draggable ?= new ViewDraggable(@)
		set: (value) -> @draggable.enabled = value if Utils.isBoolean(value)

	# *********************************
	# transition property
	# *********************************
	# ** Add a transition on a element
	# ** Use CSS transtion, will animate element when changing properties

	@define 'transition',
		get: ->
			@_transition

		set: (options) ->
			if options is false
				@_transition.disable() if @_transition
				return

			properties =
				view: @
				duration: 0.2

			# If options is object then add the options
			if typeof options is 'object'
				if options.duration
					properties.duration = options.duration

				if options.delay
					properties.delay = options.delay
					
				if options.curve
					properties.curve = options.curve

			# Create the transition
			@_transition = new Transition(properties)
			@_transition.start()


	# *********************************
	# isAnimating property
	# *********************************
	# ** Check if the view is currently animating

	@define 'isAnimating',
		enumerable: false
		exportable: false
		get: ->
			@animations().length isnt 0


	# *********************************
	# hover property
	# *********************************
	# ** Change the opacity of the view

	@define 'hoverAnimated',
		get: ->
			if @_hover
				@_hover.values
			else
				@_hover = {}
			
			@_hover

		set: (values) ->
			if not values or typeof values isnt 'object'
				false

			@_hover = {}
			@_hover.originalValues = {}
			@_hover.transition = null
			@_hover.animate = true
			@_hover.options = duration: 0.2

			# If property "animated" set to false, no animation
			if values.hasOwnProperty('animated') and values.animated is false
				@_hover.animate = false

			# If properties "animationOptions" copy to animationOptions
			if values.hasOwnProperty('options')
				@_hover.options = values['options']
				delete values['options']

			# Hold the property keys
			keys = Object.keys(values)

			# Loop through the hover properties like "borderColor: color"
			i = 0
			while i < keys.length
				# If the key exist in the View object, save the current key
				if keys[i] of this
					@_hover.originalValues[keys[i]] = @[keys[i]]
				i++

			# Sae the values for later use
			@_hover.values = values

			# When mouse in the element
			@on Event.In, (event, view) ->
				# If no animation, just props the values
				if not @_hover.animate
					@props = @_hover.values
					return

				req = 
					properties: @_hover.values
					view: this

				# Set the different animation options
				for item of @_hover.options
					req[item] = @_hover.options[item]

				#if req.curve and (req.curve.indexOf('spring') > -1 or req.curve.indexOf('bezier') > -1)
					# Set up the transition using animation
				#	@_hover.transition = new Animation req
				#else
				
				# Set up the transition
				@_hover.transition = new Transition req

				# Start the transition
				@_hover.transition.start()

			# When mouse out of the element
			@on Event.Out, (event, view) ->
				# If no animation, just props the values back to normal
				if not @_hover.animate
					@props = @_hover.originalValues
					return

				@_hover.transition.options = {} if not @_hover.transition.options

				# Set up and start the transition to the normal values
				@_hover.transition.options.properties = @_hover.originalValues
				@_hover.transition.start true

	# ** Alias of hoverAnimated
	@define 'hover',
		get: ->
			@hoverAnimated
		set: (values) ->
			# Alias for animated..
			if values.animate isnt undefined
				values.animated = values.animate
			if values.animated is undefined
				values.animated = false
			@hoverAnimated = values


	# *********************************
	# delegate property
	# *********************************
	# ** Add a delegate to the view
	# ** Allow you to call a	function externe to the file where the view is located

	@define 'delegate',
		get: ->
			if @_delegate is undefined
				@_delegate = null
			@_delegate
		set: (value) ->
			@_delegate = value


	# *********************************
	# pointerEvent property
	# *********************************
	# ** The CSS property pointer-events allows authors to control under what circumstances
	#		(if any) a particular graphic element can become the target of mouse Event. 
	#		When this property is unspecified, the same characteristics of the visiblePainted value apply to SVG content.
	#		In addition to indicating that the element is not the target of mouse events, 
	#		the value none instructs the mouse event to go "through" the element and target whatever is "underneath" that element instead.
	#
	# https://developer.mozilla.org/en/docs/Web/CSS/pointer-events

	@define 'pointerEvent',
		get: ->
			if @_element.style.pointerEvents is 'none'
				return false
			return true
		set: (value) ->
			if value
				value = 'auto'
			else
				value = 'none'

			@_element.style.pointerEvents = value

	@_alias 'pointerEvents', 'pointerEvent'
	@_alias 'ignoreEvent', 'pointerEvent'
	

	@_def 'tooltip', null, (value)->
		@_element.setAttribute 'title', value



	# *********************************
	#	blendMode property
	# *********************************
	# ** Change the blending mode

	###
	*	normal
	*	multiply
	*	screen
	*	overlay
	*	darken
	*	lighten
	*	color-dodge
	*	color-burn
	*	hard-light
	*	soft-light
	*	difference
	*	exclusion
	*	hue
	*	saturation
	*	color
	*	luminosity
	###

	# myView.blend = 'multiply'

	# TODO:
	# myView.blend = Blend.multiply
	@define 'blend',
		get: ->
			@_element.style.mixBlendMode
		set: (value) ->
			@_element.style.mixBlendMode = value

	# *********************************
	# force2d property <boolean>
	#
	# Force the view to be in 2D => removes any transformatin like rotation, scale, skew..

	@_def 'force2d', false, (value) ->
		if value is true
			@_element.style.webkitTransform = ''
			@_element.style.mozTransform = ''
			@_element.style.msTransform = ''
			@_element.style.oTransform = ''
			@_element.style.transform = ''


	##############################################################
	# TEXT PROPERTIES
	# CAN BE USE TO SET COLOR/FONT PROPERTIES OF THE HTML PROPERTIES, OR GLOBAL TEXT PROPS.

	@define 'fontSize',
		get: ->
			parseFloat @_element.style.fontSize, 10
		set: (value) ->
			value = value + 'px' if typeof value is 'number'
			@_element.style.fontSize = value
			return
	@_alias 'fsize', 'fontSize'

	@define 'fontStyle',
		get: -> @_element.style.fontStyle
		set: (value) -> @_element.style.fontStyle = value

	@define 'fontWeight',
		get: -> @_element.style.fontWeight
		set: (value) -> @_element.style.fontWeight = value
	@_alias 'weight', 'fontWeight'


	@define 'fontName',
		get: -> @_element.style.fontFamily
		set: (value) -> @_element.style.fontFamily = value + ', sans-serif'
	@_alias 'fontFamily', 'fontName'

	@define 'font',
		get: -> @_element.style.font
		set: (value) -> @_element.style.font = value

	@define 'color',
		get: -> @_element.style.color
		set: (value) -> 
			# Add alias of transparent
			if value is 'clear'
				value = 'transparent'
				
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

	addChild: (view) ->
		view.parent = @

	add: (view) ->
		@addChild view

	removeChild: (view) ->
		if view not in @children
			return
		view.parent = null

	remove : (view) ->
		@removeChild view

	# *********************************
	# ancestors method
	# 
	# * Gather all the parents that lead to the view
 
	ancestors: (context=false) ->

		parents = []
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

	childrenWithName: (name) ->
		@children.filter (view) -> view.name == name

	siblingsWithName: (name) ->
		@siblings.filter (view) -> view.name == name


	childrenAbove: (point, originX=0, originY=0) -> @children.filter (view) ->
		Utils.framePointForOrigin(view.frame, originX, originY).y < point.y
	childrenBelow: (point, originX=0, originY=0) -> @children.filter (view) ->
		Utils.framePointForOrigin(view.frame, originX, originY).y > point.y
	childrenLeft: (point, originX=0, originY=0) -> @children.filter (view) ->
		Utils.framePointForOrigin(view.frame, originX, originY).x < point.x
	childrenRight: (point, originX=0, originY=0) -> @children.filter (view) ->
		Utils.framePointForOrigin(view.frame, originX, originY).x > point.x

	_parentOrContext: ->
		if @parent
			return @parent
		if @_context._parent
			return @_context._parent

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
		if property isnt undefined
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
	cwidth : ->
		parseFloat @computedStyle().getPropertyValue('width'), 10
	cheight : ->
		parseFloat @computedStyle().getPropertyValue('height'), 10



	##############################################################
	# DOM METHODS

	# *********************************
	# destroy method
	#
	# * Remove a view from his parent view

	destroy : (descendance) ->
		if @parent
			@parent._children = Utils.without(@parent._children, @)

		@_element.parentNode?.removeChild @_element
		@removeAllListeners()

		@_context.removeView(@)
		@_context.emit("view:destroy", @)

		# Remove descendance
		if descendance
			for view in @descendants
				view.destroy()

		return

	# *********************************
	# copy method
	#
	# * Copy a view
	# * TODO: Enable the copy of events already on the view

	copy : ->
		clonedView = Utils.clone(this)
		clonedView._element = @_element.cloneNode true
		clonedView._element.instance = clonedView

		clonedView._events = undefined
		#clonedView._transition = undefined
		clonedView._id = Utils.randomID()
		clonedView._element.setAttribute 'id', "Orbe#{@_kind}::" + clonedView.id
		clonedView._parent = null
		clonedView
		

		###
		view = @copySingle()
		for child in @children
			copiedChild = child.copy()
			copiedChild.parent = view
		view
		###

	# *********************************
	# copySingle method
	#
	# * Copy the view without his children

	copySingle : ->

		clonedView = Utils.clone(this)
		clonedView._parent = null
		clonedView._element = @_element.cloneNode false		
		
		# Remove events
		clonedView._events = undefined

		# HERE IS THE DIFFERENCE WITH COPY: FALSE
		clonedView._id = Utils.randomID()
		clonedView._element.setAttribute 'id', "Orbe#{@_kind}::" + clonedView.id
		
		clonedView._children = []
		clonedView

	# *********************************
	# querySelector method
	# 
	# * Enable you to find an element by id or class inside the view

	querySelector : (selector) -> @_element.querySelector selector

	# *********************************
	# querySelectorAll method
	#
	# * Enable you to find elements by id or class inside the view

	querySelectorAll : (selector) -> @_element.querySelectorAll selector


	# *********************************
	# pixelAlign method
	#
	# * Readjust the view to remove sub-pixel positionning

	pixelAlign: ->
		@x = parseInt @x
		@y = parseInt @y


	# *********************************
	# contentFrame method
	# *********************************
	# ** Return the content frame of the view

	contentFrame : ->
		maxWidth = 0
		maxHeight = 0
		i = 0
		
		while i < @children.length
			maxX = @children[i].x + @children[i].width
			maxY = @children[i].y + @children[i].height
			if maxX > maxWidth
				maxWidth = maxX
			if maxY > maxHeight
				maxHeight = maxY
			i++

		return {
			x: 0
			y: 0
			width: maxWidth
			height: maxHeight
		}

	#contentFrame: ->
	#	return {x:0, y:0, width:0, height:0} unless @children.length
	#	Utils.frameMerge(Utils.pluck(@children, "frame"))

	centerFrame: ->
		# Get the centered frame for its parent
		if @parent
			frame = @frame
		
			width = @parent.width
			if Utils.isString(@parent.width)
				width = @parent.cwidth()

			height = @parent.height
			if Utils.isString(@parent.height)
				height = @parent.cheight()

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
		###
		if not @parent
			@x = frame.x
			@y = frame.y

		return
		###

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
		@_element.style.position = "absolute"
		@x = "50%"
		@y = "50%"
		@marginLeft = -(@width / 2)
		@marginTop = -(@height / 2)

	centerX : (offset) ->
		@element.style.position = 'absolute'
		@x = '50%'
		if offset is undefined
			offset = 0
		@marginLeft = -(@width / 2) + offset
		return

	centerY : (offset) ->
		@element.style.position = 'absolute'
		@y = '50%'
		if offset is undefined
			offset = 0
		@marginTop = -(@height / 2) + offset

	##############################################################
	## ANIMATION

	# *********************************
	# animate method
	#
	# * Enable you to add an animation on the view

	animate : (options) ->

		# Choose to start the animation directly
		start = options.start
		start = true if not start
		delete options.start

		options.view = @
		animation = new Animation options
		animation.start() if start
			
		return animation


	# Current running animations on this view
	animations: ->
		@_context.animations.filter (animation) =>
			animation.options.view == @


	animatingProperties: ->

		properties = {}

		for animation in @animations()
			for propertyName in animation.animatingProperties()
				properties[propertyName] = animation

		return properties


	# *********************************
	# animateStop method
	#
	# * Stop the current running animation if any

	animateStop : ->
		Utils.invoke(@animations(), "stop")
		@_draggable?.animateStop()


	# *********************************
	# animatingProperties method
	# *********************************
	# ** Return the animated properties

	animatingProperties : ->
		properties = {}
		ref = @animations()
		i = 0
		len = ref.length

		while i < len
			animation = ref[i]
			ref1 = animation.animatingProperties()
			j = 0
			len1 = ref1.length
			
			while j < len1
				propertyName = ref1[j]
				properties[propertyName] = animation
				j++
			i++
		properties

	# *********************************
	# enterFullScreen method
	# *********************************
	# ** Allow you to switch full screen

	enterFullScreen : ->
		# Not already full-screen?
		if not document.fullscreenElement or not document.webkitFullscreenElement or not document.mozFullScreenElement or not document.msFullscreenElement
			# go full-screen
			if @_element.requestFullscreen
				@_element.requestFullscreen()
			else if @_element.webkitRequestFullscreen
				@_element.webkitRequestFullscreen()
			else if @_element.mozRequestFullScreen
				@_element.mozRequestFullScreen()
			else if @_element.msRequestFullscreen
				@_element.msRequestFullscreen()
		return

	# *********************************
	# exitFullScreen method
	# *********************************
	# ** Exit full screen

	exitFullScreen : ->
		# Are we already full-screen?
		if document.fullscreenElement or document.webkitFullscreenElement or document.mozFullScreenElement or document.msFullscreenElement
			# exit full-screen
			if document.exitFullscreen
				document.exitFullscreen()
			else if document.webkitExitFullscreen
				document.webkitExitFullscreen()
			else if document.mozCancelFullScreen
				document.mozCancelFullScreen()
			else if document.msExitFullscreen
				document.msExitFullscreen()
		return

	# *********************************
	# isFullScreen method
	# *********************************
	# ** Check if the application is in fullscreen

	isFullScreen : ->
		if document.fullscreenEnabled or document.mozFullscreenEnabled or document.webkitIsFullScreen
			return true
		false

	# *********************************
	# fadeIn method
	# *********************************
	# ** Fade In effect

	fadeIn : (parameters) ->
		if not parameters
			parameters = {}
		
		time = false
		
		# something like: .fadeIn 0.3
		if typeof parameters is 'number'
			time = parameters
			parameters = {}
		
		if parameters.props
			parameters.properties = parameters.props

		if not parameters.properties
			parameters.properties = {}
		
		parameters.properties.opacity = 1
		
		if not parameters.curve
			parameters.curve = 'linear'
		
		if time
			parameters.time = time

		@animate parameters


	# *********************************
	# fadeOut method
	# *********************************
	# ** Fade Out effect

	fadeOut : (parameters) ->
		if not parameters
			parameters = {}

		time = false
		if typeof parameters is 'number'
			time = parameters
			parameters = {}

		if parameters.props
			parameters.properties = parameters.props
			
		if not parameters.properties
			parameters.properties = {}

		parameters.properties.opacity = 0

		if not parameters.curve
			parameters.curve = 'linear'

		if time
			parameters.time = time

		@animate parameters


	# *********************************
	# removeAll method
	# *********************************
	# ** Use to empty a view from its children

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

		# If this view has a parent draggable view and its position moved
		# while dragging we automatically cancel click events. This is what
		# you expect when you add a button to a scroll content view.

		if @_cancelClickEventInDragSession
			if eventName in [Event.Click,
				Event.Tap, Event.TapStart, Event.TapEnd,
				Event.LongPress, Event.LongPressStart, Event.LongPressEnd]
				if @_parentDraggableView()
					velocity = @_parentDraggableView()?.draggable.velocity
					return if Math.abs(velocity.x) > @_cancelClickEventInDragSessionVelocity
					return if Math.abs(velocity.y) > @_cancelClickEventInDragSessionVelocity

		# Always scope the event this to the view and pass the view as
		# last argument for every event.
		super(eventName, args..., @)

	once: (eventName, listener) =>
		super(eventName, listener)
		@_addListener(eventName, listener)

	addListener: (eventName, listener) =>
		if not eventName or not listener
			return

		#throw Error("View.on needs a valid event name") unless eventName
		#throw Error("View.on needs an event listener") unless listener
		super(eventName, listener)
		@_addListener(eventName, listener)

	removeListener: (eventName, listener) ->
		throw Error("View.off needs a valid event name") unless eventName
		super(eventName, listener)
		@_removeListener(eventName, listener)

	_addListener: (eventName, listener) ->

		# Make sure we stop ignoring events once we add a user event listener
		#if not Utils.startsWith(eventName, "change:")
			#@ignoreEvent = false

		# If this is a dom event, we want the actual dom node to let us know
		# when it gets triggered, so we can emit the event through the system.
		if Utils.domValidEvent(@_element, eventName) or eventName in Utils.values(Gesture)
			if not @_domEventManager.listeners(eventName).length
				
				@_domEventManager.addEventListener eventName, (event) =>

					@emit(eventName, event)

	_removeListener: (eventName, listener) ->

		# Do cleanup for dom events if this is the last one of it's type.
		# We are assuming we're the only ones adding dom events to the manager.
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
	onWillAppear: (cb) -> @on Event.WillAppear, cb
	onAppear: (cb) -> @on Event.Appear, cb
	onDidAppear: (cb) -> @on Event.DidAppear, cb
	onWillDisappear: (cb) -> @on Event.WillDisappear, cb
	onDisappear: (cb) -> @on Event.Disappear, cb
	onDidDisappear: (cb) -> @on Event.DidDisappear, cb

	# Mouse event
	onClick: (cb) -> @on Event.Click, cb
	onDoubleClick: (cb) -> @on Event.DoubleClick, cb
	onIn: (cb) -> @on Event.In, cb
	onOut: (cb) -> @on Event.Out, cb
	onDown: (cb) -> @on Event.Down, cb
	onOver: (cb) -> @on Event.Over, cb
	onUp: (cb) -> @on Event.Up, cb
	onMove: (cb) -> @on Event.Move, cb
	onRightClick: (cb) -> @on Event.RightClick, cb

	onMouseIn: (cb) -> @on Event.MouseIn, cb
	onMouseUp: (cb) -> @on Event.MouseUp, cb
	onMouseDown: (cb) -> @on Event.MouseDown, cb
	onMouseOver: (cb) -> @on Event.MouseOver, cb
	onMouseOut: (cb) -> @on Event.MouseOut, cb
	onMouseMove: (cb) -> @on Event.MouseMove, cb
	onMouseWheel: (cb) -> @on Event.MouseWheel, cb

	# Scroll event
	onScrollStart = (cb) -> @on Event.ScrollStart, cb
	onScroll: (cb) -> @on Event.Scroll, cb
	onScrollEnd = (cb) -> @on Event.ScrollEnd, cb
	onScrollAnimationDidStart = (cb) -> @on Event.ScrollAnimationDidStart, cb
	onScrollAnimationDidEnd = (cb) -> @on Event.ScrollAnimationDidEnd, cb

	# Touch Event
	onTouchStart: (cb) -> @on Event.TouchStart, cb
	onTouchEnd: (cb) -> @on Event.TouchEnd, cb
	onTouchMove: (cb) -> @on Event.TouchMove, cb

	# Animations
	onAnimationStart: (cb) -> @on Event.AnimationStart, cb
	onAnimationStop: (cb) -> @on Event.AnimationStop, cb
	onAnimationEnd: (cb) -> @on Event.AnimationEnd, cb
	onAnimationDidStart: (cb) -> @on Event.AnimationDidStart, cb
	onAnimationDidStop: (cb) -> @on Event.AnimationDidStop, cb
	onAnimationDidEnd: (cb) -> @on Event.AnimationDidEnd, cb

	# Draggable
	onDragStart: (cb) -> @on Event.DragStart, cb
	onDragWillMove: (cb) -> @on Event.DragWillMove, cb
	onDragMove: (cb) -> @on Event.DragMove, cb
	onDragDidMove: (cb) -> @on Event.DragDidMove, cb
	onDrag: (cb) -> @on Event.Drag, cb
	onDragEnd: (cb) -> @on Event.DragEnd, cb
	onDragAnimationStart: (cb) -> @on Event.DragAnimationStart, cb
	onDragAnimationEnd: (cb) -> @on Event.DragAnimationEnd, cb
	onDirectionLockStart: (cb) -> @on Event.DirectionLockStart, cb

	onDragEnter: (cb) -> @on(Event.DragEnter, cb)
	onDragOver: (cb) -> @on(Event.DragOver, cb)
	onDragLeave: (cb) -> @on(Event.DragLeave, cb)
	onDrop: (cb) -> @on(Event.Drop, cb)

	# Switch
	onStateSwitch: (cb) -> @on(Event.StateDidSwitch, cb)
	onStateDidSwitch: (cb) -> @on(Event.StateDidSwitch, cb)
	onStateWillSwitch: (cb) -> @on(Event.StateWillSwitch, cb)

	# Gestures

	# Tap
	onTap:(cb) -> @on(Event.Tap, cb)
	onTapStart:(cb) -> @on(Event.TapStart, cb)
	onTapEnd:(cb) -> @on(Event.TapEnd, cb)
	onDoubleTap:(cb) -> @on(Event.DoubleTap, cb)

	# Force Tap
	onForceTap:(cb) -> @on(Event.ForceTap, cb)
	onForceTapChange:(cb) -> @on(Event.ForceTapChange, cb)
	onForceTapStart:(cb) -> @on(Event.ForceTapStart, cb)
	onForceTapEnd:(cb) -> @on(Event.ForceTapEnd, cb)

	# Press
	onLongPress:(cb) -> @on(Event.LongPress, cb)
	onLongPressStart:(cb) -> @on(Event.LongPressStart, cb)
	onLongPressEnd:(cb) -> @on(Event.LongPressEnd, cb)

	# Swipe
	onSwipe:(cb) -> @on(Event.Swipe, cb)
	onSwipeStart:(cb) -> @on(Event.SwipeStart, cb)
	onSwipeEnd:(cb) -> @on(Event.SwipeEnd, cb)

	onSwipeUp:(cb) -> @on(Event.SwipeUp, cb)
	onSwipeUpStart:(cb) -> @on(Event.SwipeUpStart, cb)
	onSwipeUpEnd:(cb) -> @on(Event.SwipeUpEnd, cb)

	onSwipeDown:(cb) -> @on(Event.SwipeDown, cb)
	onSwipeDownStart:(cb) -> @on(Event.SwipeDownStart, cb)
	onSwipeDownEnd:(cb) -> @on(Event.SwipeDownEnd, cb)

	onSwipeLeft:(cb) -> @on(Event.SwipeLeft, cb)
	onSwipeLeftStart:(cb) -> @on(Event.SwipeLeftStart, cb)
	onSwipeLeftEnd:(cb) -> @on(Event.SwipeLeftEnd, cb)

	onSwipeRight:(cb) -> @on(Event.SwipeRight, cb)
	onSwipeRightStart:(cb) -> @on(Event.SwipeRightStart, cb)
	onSwipeRightEnd:(cb) -> @on(Event.SwipeRightEnd, cb)

	# Pan
	onPan:(cb) -> @on(Event.Pan, cb)
	onPanStart:(cb) -> @on(Event.PanStart, cb)
	onPanEnd:(cb) -> @on(Event.PanEnd, cb)
	onPanLeft:(cb) -> @on(Event.PanLeft, cb)
	onPanRight:(cb) -> @on(Event.PanRight, cb)
	onPanUp:(cb) -> @on(Event.PanUp, cb)
	onPanDown:(cb) -> @on(Event.PanDown, cb)

	# Pinch
	###
	onPinch:(cb) -> @on(Event.Pinch, cb)
	onPinchStart:(cb) -> @on(Event.PinchStart, cb)
	onPinchEnd:(cb) -> @on(Event.PinchEnd, cb)
	###

	# Scale
	onScale:(cb) -> @on(Event.Scale, cb)
	onScaleStart:(cb) -> @on(Event.ScaleStart, cb)
	onScaleEnd:(cb) -> @on(Event.ScaleEnd, cb)

	# Rotate
	onRotate:(cb) -> @on(Event.Rotate, cb)
	onRotateStart:(cb) -> @on(Event.RotateStart, cb)
	onRotateEnd:(cb) -> @on(Event.RotateEnd, cb)


	##############################################################
	## INSPECTOR > USED BY SAY

	toInspect: ->
		round = (value) ->
			if parseInt(value) == value
				return parseInt(value)
			return Utils.round(value, 1)

		if @name
			return "<#{@_kind} id:#{@id} name:#{@name} (#{round(@x)},#{round(@y)}) #{round(@width)}x#{round(@height)}>"
		return "<#{@_kind} id:#{@id} (#{round(@x)},#{round(@y)}) #{round(@width)}x#{round(@height)}>"


	##############################################################
	# PRIVATE METHODS

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
		if @_translateX isnt undefined or @_translateY isnt undefined
			unitX = ''
			unitY = ''
			unitX = 'px' if typeof @_translateX is 'number'
			unitY = 'px' if typeof @_translateY is 'number'
			transform += 'translate(' + @_translateX + '' + unitX + ', ' + @_translateY + '' + unitY + ') '
			
		# Transform Z
		if @_translateZ isnt undefined
			unitZ = ''
			unitZ = 'px' if typeof @_translateZ is 'number'
			transform += 'translateZ(' + @_translateZ + '' + unitZ + ') '

		# Rotation
		if @_rotation isnt undefined
			transform += 'rotate(' + @_rotation + 'deg) '
		if @_rotationX isnt undefined
			transform += 'rotateX(' + @_rotationX + 'deg) '
		if @_rotationY isnt undefined
			transform += 'rotateY(' + @_rotationY + 'deg) '
		if @_rotationZ isnt undefined
			transform += 'rotateZ(' + @_rotationZ + 'deg) '
		
		# Scale
		if @_scale isnt undefined
			if @_scaleX is @_scaleY
				transform += 'scale(' + @_scaleX + ') '
			else
				transform += 'scale(' + @_scaleX + ', ' + @_scaleY + ') '
		
		# Skew
		if @_skewX isnt undefined or @_skewY isnt undefined
			if @_skewX is @_skewY
				transform += 'skew(' + @_skewX + 'deg) '
			else
				transform += 'skew(' + @_skewX + 'deg, ' + @_skewY + 'deg) '
		
		@_element.style.webkitTransform = transform
		@_element.style.mozTransform = transform
		@_element.style.msTransform = transform
		@_element.style.oTransform = transform
		@_element.style.transform = transform

