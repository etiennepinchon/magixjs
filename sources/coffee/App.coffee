
# App

App 				= window
App._kind 			= 'App'
App._ee 			= new EventEmitter()
App._pages_counter = 0
App.deviceType = NULL
App.deviceBackground = white

# POSITION KEYWORD
# TODO: http://www.w3schools.com/cssref/pr_class_cursor.asp
App._keywords = [
	'center'
	'left'
	'right'
	'top'
	'bottom'
	'auto'
	'inline-block'
	'inline'
	'block'
	'none'
	'fit'
	'fitCenter'
	'fill'
	'fillWidth'
	'fillHeight'
	'fillHeightCenter'
	'text'
	'pointer'
	'progress'
	'move'
	'help'
	'grabbing'
	'grab'
	'default'
	'crosshair'
	'copy'
	'col-resize'
	'e-resize'
	'normal'
	'multiply'
	'screen'
	'overlay'
	'darken'
	'lighten'
	'color-dodge'
	'color-burn'
	'hard-light'
	'soft-light'
	'difference'
	'exclusion'
	'hue'
	'saturation'
	'color'
	'luminosity'
	'vertical'
	'horizontal'
	'border-box'
	'padding-box'
	'content-box'
]

for kw in App._keywords
	App[res = kw.replace(/(-)\w/gi, (x) ->
	  x.slice(1).toUpperCase()
	)] = kw

App._responsives = {}

######################################################
# DIRECT PATH TEST

window.__IS_DIRECT_PATH = no
if window.__ID and window.__ID.length is 8
	url = App.location.pathname.split('/')
	url.shift()
	if url[0] is window.__ID
		window.__IS_DIRECT_PATH = yes

######################################################
# MINIMAL FUNCTIONS

# Before = undefined
# Routes =  (routes, beforeFn) ->
# 	window.Before = beforeFn if beforeFn
# 	App.routes = routes
Title = (title) -> App.title = title

######################################################
# HANDY FUNCTIONS

App.define = (name, args) ->
	Object.defineProperty this, name, args
App.emit = (name, value) ->
	return if not @_wrapper
	@_wrapper.emit(name, value)
App.once = (eventName, listener) ->
	return if not @_wrapper
	@_wrapper.once(eventName, listener)
App.on = (eventName, listener) ->
	return if not @_wrapper
	@_wrapper.on(eventName, listener)
App.off = (eventName, listener) ->
	return if not @_wrapper
	@_wrapper.off(eventName, listener)

######################################################
# RUNTIME

App.reset = ->
	@id 				= Utils.randomID()
	@element 			= NULL
	@_routes 			= {}
	@_page 				= null
	@pages 				= []
	@_responsives 		= {}
	@_fonts 			= []
	@_fontsCollection 	= []
	App.device = NULL
	App.deviceType = NULL
	App.deviceBackground = white

	# Context
	if not @DefaultContext
		@DefaultContext = new Context
			name 			: 'Default'
			backgroundColor : white
		@CurrentContext = @DefaultContext
	else
		# Remove wrapper and children if exist
		if @_wrapper then @_wrapper.destroy(true)

		# Reset context
		@CurrentContext.reset()

	# Window Events
	window_events = [
		Event.Abort
		Event.Quit
		Event.Error
		Event.HashChange
		Event.Load
		Event.Resize
		Event.Scroll
		Event.Show
		Event.Close
		Event.Blur
		Event.Focus
		Event.HistoryChanged
	]

	for e_n in window_events
		Event.wrap(window).addEventListener e_n, (e)->
			@emit(e.type, e)
			return

# *********************************
# run method
# *********************************
# ** Triggered when the DOM has been loaded


App.running = no
App.run = (callback) ->
	
	App.running = no

	loaded = (event) ->
		
		@reset()

		# Setup defaults properties
		Defaults.setup()

		@_element = document.createElement('div')
		@_element.setAttribute 'id', 'MagiXApp::' + App.id
		@_element.style.background 				= 'white'
		@_element.style.width 					= '100%'
		@_element.style.height 					= '100%'
		@_element.style.position 				= 'fixed'
		@_element.style.top 					= '0'
		@_element.style.left 					= '0'
		@_element.style.right 					= '0'
		@_element.style.bottom 					= '0'
		@_element.style.webkitFontSmoothing 	= 'antialiased'
		@CurrentContext._element.appendChild @_element

		@_wrapper = new View
			width: '100%'
			height: '100%'
			parent: 'app'
		@_element.appendChild @_wrapper._element
		@_wrapper._element.setAttribute 'id', 'MagiXWrapper::' + @_wrapper.id
		
		###
		if App.deviceType isnt NULL
			App.device = new Device
				background: App.deviceBackground
				padding: 10
			if App.deviceType
				App.device.type = App.deviceType
		###
		######################################################
		# HISTORY
		
		# When user press back button
		App.on Event.HistoryChanged, (e) ->
			#return if e.state and e.state.update
			Routes.routing() if e.state

		# Safari patch
		if Utils.isSafari()
			history.replaceState {}, ''

		######################################################
		# RESPONSIVE

		App._updateResponsivesStates()
		App.onResize -> App._updateResponsivesStates()

		######################################################

		if callback
			App.running = yes
			@emit Event.Run
			callback()

		return

	if __domReady
		loaded()
	else
		Utils.domComplete(loaded)
	return
	

App.setup = ->
	
	@GestureInputRecognizer = new GestureRecognizer()
	@Loop 					= new AnimationLoop()
	Utils.domComplete(@Loop.start)
	
	##############################################################
	# Return Selected text

	@define 'selected',
		configurable: true
		get: -> @getSelection().toString()

	##############################################################
	# page property
	#
	# * Allow you to add a page to the app
	
	# TODO CHECK LIFE CYCLE

	@define 'page',
		configurable: true
		get: -> App._page
		set: (page) ->
			if page is App._page then return
			if App._page
				App.removePage App._page
				App._page = null
			@addPage page
			return
	@define 'pages',
		configurable: true
		get: -> App._wrapper.children
	@define 'title',
		configurable: true
		get: -> document.title
		set: (value) ->
			document.title = value
			return
	@define 'fontName',
		configurable: true
		get: -> @_element.style.fontFamily
		set: (value) ->
			@_element.style.fontFamily = value + ', sans-serif'
			return
	@define 'fontFamily',
		configurable: true
		get: -> @fontName
		set: (value) ->
			@fontName = value
			return
	@define 'fontWeight',
		configurable: true
		get: -> @_element.style.fontWeight
		set: (value) ->
			@_element.style.fontFamily = value
			return
	@define 'fontSize',
		configurable: true
		get: -> @_element.style.fontSize
		set: (value) ->
			@_element.style.fontSize = value
			return
	@define 'textColor',
		configurable: true
		get: -> @_element.style.color
		set: (value) ->
			@_element.style.color = value
			return
	@define 'width',
		configurable: true
		get: -> @innerWidth
	@define 'height',
		configurable: true
		get: -> @innerHeight
	@define 'size',
		configurable: true
		get: ->
			{
				width: @width
				height: @height
			}
	@define 'frame',
		configurable: true
		get: ->
			{
				x: 0
				y: 0
				width: @width
				height: @height
			}

	######################################################
	# NAVIGATION

	@go = (url, normal) ->
			
		# If main/index -> /
		if url is 'main' or url is 'index'
			url = ''

		# Add / if don't have it
		if not Utils.startsWith(url, '/')
			url = '/' + url
		
		if window.USE_URL
			window.USE_URL = url
		
		if normal isnt true
			url = Utils.parseURL(url)

		if history.pushState
			history.pushState {}, null, url
		else
			log 'App: your browser does not support the HTML5 pushState method.'
		
		Routes.routing()
		
		return

	@updateURL = (url, normal) ->
		
		# If main/index -> /
		if url is 'main' or url is 'index'
			url = ''

		# Add / if don't have it
		if not Utils.startsWith(url, '/')
			url = '/' + url
		
		if window.USE_URL
			window.USE_URL = url
		
		if normal isnt true
			url = Utils.parseURL(url)
		
		if history.pushState
			#history.pushState {update: true}, null, url
			history.pushState {}, null, url
		else
			log 'App: your browser does not support the HTML5 pushState method.'
		
		return

	# *********************************
	# pathname method
	#
	# * Return the array of path from url

	@pathname = ->
		urlPathname = undefined

		# In case we are using the preview from the editor and need to specify the url,
		# because the iframe won't have the right url.
		if App.USE_URL
			urlPathname = App.USE_URL.split('/')
		else
			urlPathname = App.location.pathname.split('/')

		urlPathname.shift()

		# Allow to use the project path as a root
		# /56a9f5ccc5ab56c71d434d7a/signin is> /signin
		if window.__IS_DIRECT_PATH
			urlPathname.shift()
			urlPathname.push '' if urlPathname.length is 0
		else if App.USE_PROJECT_PATH isnt undefined
			# && USE_PROJECT_PATH is true
			urlPathname.shift()
			urlPathname.shift()
			urlPathname.push '' if urlPathname.length is 0
				
		urlPathname
	@parameters = ->
		query 	= window.location.search.substr(1)
		result 	= {}
		query.split('&').forEach (part) ->
			item = part.split('=')
			result[item[0]] = decodeURIComponent(item[1]) if item[0] isnt ''
			return
		result
	@hash = ->
		return location.hash.replace '#', ''


	######################################################
	# PAGE MANAGMENT

	# *********************************
	# addPage method
	# 
	# * Allow you to add a page to the app

	@addPage = (page) ->
		App._responsives = {}

		# Remove existing pages
		for child in App._wrapper.children
			if child._kind and child._kind is 'Page'
				child.parent = null

		# Remove current page
		App._page.parent = null if App._page
		if page._kind and page._kind is 'Page'
			App._page = page
			p = App
			p = App.device.content if App.device
			App._page.parent = p

	# *********************************
	# removePage method
	# 
	# * Allow you to remove a page from the app

	@removePage = (page) -> page.parent = null

	######################################################
	# FULLSCREEN

	@enterFullscreen = ->
		return no if not @page
		@page.enterFullscreen()
	@exitFullscreen = ->
		return no if not @page
		@page.exitFullscreen()
	@isFullscreen = ->
		return no if not @page
		@page.isFullscreen()

	# *********************************
	# inWebView method
	#
	# * Return if the view is embed in a iframe or not

	@inWebView = ->
		try
			return window.self isnt window.top
		catch e
			return true
		return

	######################################################
	# ONLINE/OFFLINE CHECK

	@isOnline = ->
		navigator.onLine
	@isOffline = ->
		!navigator.onLine

	# Vibrate
	@vibrate = (pattern) ->
		return no if not navigator.vibrate
		window.navigator.vibrate pattern
		return

	# Change device
	@setDevice = (device)->
		App.deviceType = device
		if App.device
			App.device.type = App.deviceType
		return

	@setDeviceBackground = (background)->
		App.deviceBackground = background
		if App.device
			App.device.background = App.deviceBackground
		return

	return

	history.pushState {}, null, ('/'+@pathname.join('/'))

# Battery
App.battery = no

if navigator.getBattery
	navigator.getBattery().then (battery) ->
		App.battery = battery
		battery.addEventListener 'chargingchange', ->
			App.emit 'change:batteryCharging', battery.charging
			return
		battery.addEventListener 'levelchange', ->
			App.emit 'change:batteryLevel', battery.level
			return
		battery.addEventListener 'chargingtimechange', ->
			App.emit 'change:chargingTime', battery.chargingTime
			return
		battery.addEventListener 'dischargingtimechange', ->
			App.emit 'change:dischargingTime', battery.dischargingTime
			return
		return

App.toInspect = =>
	"<App id:#{@id or null}>"

App.setup()


######################################################
# PRIVATE FUNCTIONS


##############################################################
## EVENT HELPERS

App.onFocus = (cb) -> 
	@on Event.Focus, cb
	return
App.onResignFocus = (cb) -> 
	@on Event.Blur, cb
	return
App.onBlur = (cb) -> 
	@on Event.Blur, cb
	return
App.onResize = (cb) -> 
	@on Event.Resize, cb
	return
App.onAbort = (cb) -> 
	@on Event.Abort, cb
	return
App.onQuit = (cb) -> 
	@on Event.Quit, cb
	return
App.onHashChange = (cb) -> 
	@on Event.HashChange, cb
	return
App.onLoad = (cb) -> 
	@on Event.Load, cb
	return
App.onLoaded = (cb) -> 
	@on Event.Load, cb
	return
App.onDone = (cb) -> 
	@on Event.Loaded, cb
	return
App.onShow = (cb) -> 
	@on Event.Show, cb
	return
App.onClose = (cb) -> 
	@on Event.Close, cb
	return

App.onClick = (cb) -> 
	@on Event.Click, cb
	return
App.onDoubleClick = (cb) -> 
	@on Event.DoubleClick, cb
	return
App.onIn = (cb) -> 
	@on Event.In, cb
	return
App.onOut = (cb) -> 
	@on Event.Out, cb
	return
App.onDown = (cb) -> 
	@on Event.Down, cb
	return
App.onOver = (cb) -> 
	@on Event.Over, cb
	return
App.onUp = (cb) -> 
	@on Event.Up, cb
	return
App.onMove = (cb) -> 
	@on Event.Move, cb
	return
App.onRightClick = (cb) -> 
	@on Event.RightClick, cb
	return

App.onMouseIn = (cb) -> 
	@on Event.MouseIn, cb
	return
App.onMouseUp = (cb) -> 
	@on Event.MouseUp, cb
	return
App.onMouseDown = (cb) -> 
	@on Event.MouseDown, cb
	return
App.onMouseOver = (cb) -> 
	@on Event.MouseOver, cb
	return
App.onMouseOut = (cb) -> 
	@on Event.MouseOut, cb
	return
App.onMouseMove = (cb) -> 
	@on Event.MouseMove, cb
	return
App.onMouseWheel = (cb) -> 
	@on Event.MouseWheel, cb
	return

App.onScroll = (cb) -> 
	@on Event.Scroll, cb
	return

# Touch Event
App.onTouchStart = (cb) -> 
	@on Event.TouchStart, cb
	return
App.onTouchEnd = (cb) -> 
	@on Event.TouchEnd, cb
	return
App.onTouchMove = (cb) -> 
	@on Event.TouchMove, cb
	return

# Gestures

# Tap
App.onTap = (cb) -> 
	@on(Event.Tap, cb)
	return
App.onTapStart = (cb) -> 
	@on(Event.TapStart, cb)
	return
App.onTapEnd = (cb) -> 
	@on(Event.TapEnd, cb)
	return
App.onDoubleTap = (cb) -> 
	@on(Event.DoubleTap, cb)
	return

# Force Tap
App.onForceTap = (cb) -> 
	@on(Event.ForceTap, cb)
	return
App.onForceTapChange = (cb) -> 
	@on(Event.ForceTapChange, cb)
	return
App.onForceTapStart = (cb) -> 
	@on(Event.ForceTapStart, cb)
	return
App.onForceTapEnd = (cb) -> 
	@on(Event.ForceTapEnd, cb)
	return

# Press
App.onLongPress = (cb) -> 
	@on(Event.LongPress, cb)
	return
App.onLongPressStart = (cb) -> 
	@on(Event.LongPressStart, cb)
	return
App.onLongPressEnd = (cb) -> 
	@on(Event.LongPressEnd, cb)
	return

# Swipe
App.onSwipe = (cb) -> 
	@on(Event.Swipe, cb)
	return
App.onSwipeStart = (cb) -> 
	@on(Event.SwipeStart, cb)
	return
App.onSwipeEnd = (cb) -> 
	@on(Event.SwipeEnd, cb)
	return

App.onSwipeUp = (cb) -> 
	@on(Event.SwipeUp, cb)
	return
App.onSwipeUpStart = (cb) -> 
	@on(Event.SwipeUpStart, cb)
	return
App.onSwipeUpEnd = (cb) -> 
	@on(Event.SwipeUpEnd, cb)
	return

App.onSwipeDown = (cb) -> 
	@on(Event.SwipeDown, cb)
	return
App.onSwipeDownStart = (cb) -> 
	@on(Event.SwipeDownStart, cb)
	return
App.onSwipeDownEnd = (cb) -> 
	@on(Event.SwipeDownEnd, cb)
	return

App.onSwipeLeft = (cb) -> 
	@on(Event.SwipeLeft, cb)
	return
App.onSwipeLeftStart = (cb) -> 
	@on(Event.SwipeLeftStart, cb)
	return
App.onSwipeLeftEnd = (cb) -> 
	@on(Event.SwipeLeftEnd, cb)
	return

App.onSwipeRight = (cb) -> 
	@on(Event.SwipeRight, cb)
	return
App.onSwipeRightStart = (cb) -> 
	@on(Event.SwipeRightStart, cb)
	return
App.onSwipeRightEnd = (cb) -> 
	@on(Event.SwipeRightEnd, cb)
	return

# Pan
App.onPan = (cb) -> 
	@on(Event.Pan, cb)
	return
App.onPanStart = (cb) -> 
	@on(Event.PanStart, cb)
	return
App.onPanEnd = (cb) -> 
	@on(Event.PanEnd, cb)
	return
App.onPanLeft = (cb) -> 
	@on(Event.PanLeft, cb)
	return
App.onPanRight = (cb) -> 
	@on(Event.PanRight, cb)
	return
App.onPanUp = (cb) -> 
	@on(Event.PanUp, cb)
	return
App.onPanDown = (cb) -> 
	@on(Event.PanDown, cb)
	return

# Scale
App.onScale = (cb) -> 
	@on(Event.Scale, cb)
	return
App.onScaleStart = (cb) -> 
	@on(Event.ScaleStart, cb)
	return
App.onScaleEnd = (cb) -> 
	@on(Event.ScaleEnd, cb)
	return

# Rotate
App.onRotate = (cb) -> 
	@on(Event.Rotate, cb)
	return
App.onRotateStart = (cb) -> 
	@on(Event.RotateStart, cb)
	return
App.onRotateEnd = (cb) -> 
	@on(Event.RotateEnd, cb)
	return

# Import
App.onImportProgress = (cb) -> 
	@on(Event.ImportProgress, cb)
	return
App.onImportEnd = (cb) -> 
	@on(Event.ImportEnd, cb)
	return

# Preload
App.onPreloadProgress = (cb) -> 
	@on(Event.PreloadProgress, cb)
	return
App.onPreloadEnd = (cb) -> 
	@on(Event.PreloadEnd, cb)
	return

# Keyboard Events
App.onKeyDown = (cb) -> 
	@on Event.KeyDown, cb
	return
App.onKeyPress = (cb) -> 
	@on Event.KeyPress, cb
	return
App.onKeyUp = (cb) -> 
	@on Event.KeyUp, cb
	return


