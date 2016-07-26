App = window
App._kind = 'App'
App._ee = new EventEmitter()
App._pages_counter = 0

# POSITION KEYWORD
window.center = 'center'
window.left = 'left'
window.right = 'right'
window.top = 'top'
window.bottom = 'bottom'
window.auto = 'auto'

window.inlineBlock = 'inline-block'
window.block = 'block'
window.inline = 'inline'
window.none = 'none'

window.fit = 'fit'
window.fitCenter = 'fitCenter'
window.fill = 'fill'
window.fillWidth = 'fillWidth'
window.fillHeight = 'fillHeight'
window.fillHeightCenter = 'fillHeightCenter'

# Store responsive view from the page
App._responsives = {}

# Google Font script
WebFontConfig = null
_googleFont = []

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

Before = null

Routes =  (routes, beforeFn) ->
	if beforeFn
		window.Before = beforeFn
	
	App.routes = routes

Fonts = (fonts) ->
	App.fonts = fonts

Title = (title) ->
	App.title = title


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
	@id = Utils.randomID()
	App.element = undefined

	# Routes
	@_routes = {}

	# Pages
	App._page = null
	@pages = []
	
	# Reset responsive
	App._responsives = {}

	# Fonts
	@_fonts = null
	@_fontsCollection = []

	# Context
	if not @DefaultContext
		@DefaultContext = new Context
			name:'Default'
			backgroundColor: 'white'

		@CurrentContext = @DefaultContext
	else
		# Remove wrapper and children if exist
		if @_wrapper
			@_wrapper.destroy(true)

		# Reset context
		@CurrentContext.reset()

	# Frame/Object Event	
	Event.wrap(window).addEventListener Event.Abort, (e) -> @emit(Event.Abort, e)
	Event.wrap(window).addEventListener Event.Quit, (e) -> 
		@emit(Event.Quit, e)
		return
	Event.wrap(window).addEventListener Event.Error, (e) -> @emit(Event.Error, e)
	Event.wrap(window).addEventListener Event.HashChange, (e) -> @emit(Event.HashChange, e)
	Event.wrap(window).addEventListener Event.Load, (e) -> @emit(Event.Load, e)
	Event.wrap(window).addEventListener Event.Resize, (e) -> @emit(Event.Resize, e)
	Event.wrap(window).addEventListener Event.Scroll, (e) -> @emit(Event.Scroll, e)
	Event.wrap(window).addEventListener Event.Show, (e) -> @emit(Event.Show, e)
	Event.wrap(window).addEventListener Event.Close, (e) -> @emit(Event.Close, e)
	Event.wrap(window).addEventListener Event.Blur, (e) -> @emit(Event.Blur, e)
	Event.wrap(window).addEventListener Event.Focus, (e) -> @emit(Event.Focus, e)
	Event.wrap(window).addEventListener Event.HistoryChanged, (e) -> @emit(Event.HistoryChanged, e)
	
# *********************************
# run method
# *********************************
# ** Triggered when the DOM has been loaded

App.run = (callback) ->
	
	loaded = (event) ->
		
		@reset()

		# Setup defaults properties
		Defaults.setup()

		@_element = document.createElement('div')
		@_element.setAttribute 'id', 'OrbeApp::' + App.id
		@_element.style.background = 'white'
		@_element.style.width = '100%'
		@_element.style.height = '100%'
		@_element.style.position = 'fixed'
		@_element.style.top = '0'
		@_element.style.left = '0'
		@_element.style.right = '0'
		@_element.style.bottom = '0'
		@_element.style.webkitFontSmoothing = 'antialiased'
		@CurrentContext._element.appendChild @_element

		@_wrapper = new View
			width: '100%'
			height: '100%'
		@_element.appendChild @_wrapper._element
		@_wrapper._element.setAttribute 'id', 'OrbeAppWrapper::' + @_wrapper.id
		
		######################################################
		# HISTORY
		
		# When user press back button
		App.on Event.HistoryChanged, (e) ->
			#return if e.state and e.state.update
			App._routing() if e.state

		# Safari patch
		if Utils.isSafari()
			history.replaceState {}, ''

		######################################################
		# RESPONSIVE

		App._updateResponsivesStates()
		App.onResize -> App._updateResponsivesStates()

		######################################################

		if callback
			@emit Event.Run
			callback()

		return

	if __domReady
		loaded()
	else
		Utils.domComplete(loaded)

	return
	

App.setup = ->
	
	#@reset()

	# Initiate animation Loop
	@Loop = new AnimationLoop()
	Utils.domComplete(@Loop.start)

	# Initiate Gesture Recognizer
	@GestureInputRecognizer = new GestureRecognizer()

	# *********************************
	# Routes property
	#
	# * Define the routes of the application

	@define 'routes',
		configurable: true
		get: ->
			@_routes
		set: (routes) ->
			if not Utils.isObject(routes)
				throw new Error('App: routes must be in an object.')
				return
			@_routes = routes
			App._routing()

			return
		
	# *********************************
	# page property
	#
	# * Allow you to add a page to the app
	
	# TODO CHECK LIFE CYCLE

	@define 'page',
		configurable: true
		get: ->
			App._page
		set: (page) ->
			if App._page
				App.removePage App._page
				App._page = null
			
			@addPage page
			return

	# Return all the pages
	# READ ONLY
	@define 'pages',
		configurable: true
		get: ->
			App._wrapper.children

	# *********************************
	# title property
	# 
	# * Set the current title of the page
	@define 'title',
		configurable: true
		get: ->
			document.title
		set: (value) ->
			document.title = value
			return

	# *********************************
	# Fonts property
	# 
	# * Allow you to load font directly from google font
	# * Visit https://www.google.com/fonts for more info
	# Example :
	# App.Fonts = ['Open+Sans:400,300:latin'];

	@define 'fonts',
		configurable: true
		get: ->
			@_fonts
		set: (fonts) ->
			@_fonts = fonts

			google_previous_call = Utils.clone(@_googleFont)
			@_googleFont = []

			# Format fonts
			@_updateFonts @_fonts
			
			# Set the first font in the array as default
			if App._fontsCollection.length > 0
				App.fontName = App._fontsCollection[0].name

			# If fonts are already loaded
			if Utils.isEqual google_previous_call, @_googleFont
				return

			# *********************************

			if @_googleFont.length > 0
				WebFontConfig = 
					google: 
						families: App._googleFont
					#fontactive: (familyName, fvd) ->
					#	console.log fvd
					#active: ->
					#	console.log 'active'

				# Load webfont.js
				Utils.domLoadScript (if 'https:' is document.location.protocol then 'https' else 'http') + '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js'


	# *********************************
	# fontName property
	#
	# * Set the default FontName to use
	@define 'fontName',
		configurable: true
		get: ->
			@_element.style.fontFamily
		set: (value) ->
			@_element.style.fontFamily = value + ', sans-serif'
			return

	# Alias of fontName
	@define 'fontFamily',
		configurable: true
		get: ->
			@fontName
		set: (value) ->
			@fontName = value
			return


	# *********************************
	# fontWeight property
	# 
	# * Set the default FontWeight to use
	@define 'fontWeight',
		configurable: true
		get: ->
			@_element.style.fontWeight
		set: (value) ->
			@_element.style.fontFamily = value
			return


	# *********************************
	# fontSize property
	#
	# * Set the default FontSize to use
	@define 'fontSize',
		configurable: true
		get: ->
			@_element.style.fontSize
		set: (value) ->
			@_element.style.fontSize = value
			return


	# *********************************
	# textColor property
	# 
	# * Set the default TextColor to use
	@define 'textColor',
		configurable: true
		get: ->
			@_element.style.color
		set: (value) ->
			@_element.style.color = value
			return


	# *********************************
	# width property
	# 
	# * Return the width of the app, which is the width of the window
	@define 'width',
		configurable: true
		get: ->
			@innerWidth


	# *********************************
	# height property
	# 
	# * Return the height of the app, which is the height of the window
	@define 'height',
		configurable: true
		get: ->
			@innerHeight


	# *********************************
	# size property
	# 
	# * Return the current size of the view
	@define 'size',
		configurable: true
		get: ->
			{
				width: @width
				height: @height
			}


	# *********************************
	# frame property
	# 
	# * Return the current frame of the view
	@define 'frame',
		configurable: true
		get: ->
			{
				x: 0
				y: 0
				width: @width
				height: @height
			}

	# Alias to insert css into the app
	@css = Utils.insertCSS

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
			say 'App: your browser does not support the HTML5 pushState method.'
		
		App._routing()
		
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
			say 'App: your browser does not support the HTML5 pushState method.'
		
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

	# *********************************
	# parameters method
	#
	# * Return the array of parameters from url

	@parameters = ->
		query = window.location.search.substr(1)
		result = {}
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

		# Reset responsive
		App._responsives = {}
		#App._wrapper.empty()
		for child in App._wrapper.children
			if child._kind and child._kind is 'Page'
				child.parent = null

		App._page.parent = null if App._page

		if page._kind and page._kind is 'Page'
			App._page = page
			App._page.parent = @

	# *********************************
	# removePage method
	# 
	# * Allow you to remove a page from the app

	@removePage = (page) ->
		page.parent = null


	######################################################
	# FULLSCREEN

	# *********************************
	# enterFullScreen method
	# 
	# ** Allow you to switch full screen

	@enterFullScreen = ->
		if not @page
			return false
		@page.enterFullScreen()

	# *********************************
	# exitFullScreen method
	# 
	# * Exit full screen

	@exitFullScreen = ->
		if not @page
			return false
		@page.exitFullScreen()

	# *********************************
	# isFullScreen method
	# 
	# * Check if the application is in full screen

	@isFullScreen = ->
		if not @page
			return false
		@page.isFullScreen()



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

	# *********************************
	# isOnline method

	@isOnline = ->
		navigator.onLine

	# *********************************
	# isOffline method

	@isOffline = ->
		!navigator.onLine

	return

App.setup()



# *********************************
# App.battery
# *********************************
# ** Use to get information about the device battery

###
// Is the battery charging? Return boolean.
App.battery.charging

// Return the battery level in percent
App.battery.level

// Return the battery charging time in seconds
App.battery.chargingTime

// Return the battery discharging time in seconds
App.battery.dischargingTime

Event:

Change.BatteryCharging
App.on Change.BatteryCharging (charging) ->

Change.BatteryLevel
App.on Change.BatteryLevel (charging) ->

Change.ChargingTime
App.on Change.ChargingTime (charging) ->

Change.DischargingTime
App.on Change.DischargingTime (charging) ->

###

App.battery = false

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

# *********************************
# App.vibrate()
# *********************************
# ** Use to create a device vibration
# Argument: pattern
# The pattern may consist of either a single integer, 
# describing the number of milliseconds to vibrate, 
# or an array of integers describing a pattern of vibrations and pauses.
# Single vibration:
# App.vibrate(200);
# App.vibrate([200]);
# Vibration pattern:
# App.vibrate([200, 100, 200]);

App.vibrate = (pattern) ->
	if not navigator.vibrate
		return false
	window.navigator.vibrate pattern
	return

# *********************************
# Accelerometer
# *********************************

###
Event will return
* acceleration Read only	
The acceleration of the device. This value has taken into account the effect 
of gravity and removed it from the figures. This value may not exist if the hardware doesn't know 
how to remove gravity from the acceleration data.

	acceleration.x Read only
	The amount of acceleration along the X axis. Read only.
	acceleration.y Read only
	The amount of acceleration along the Y axis. Read only.
	acceleration.z Read only
	The amount of acceleration along the Z axis. Read only.

* accelerationIncludingGravity Read only	
The acceleration of the device. This value includes the effect of gravity, and may be the 
only value available on devices that don't have a gyroscope to allow them to properly 
remove gravity from the data.

* interval Read only
* The interval, in milliseconds, at which the DeviceMotionEvent is fired. 
The next event will be fired in approximately this amount of time.

* rotationRate Read only
The rates of rotation of the device about all three axes.

	rotationRate.alpha Read only
	The amount of rotation around the Z axis, in degrees per second.
	rotationRate.beta Read only
	The amount of rotation around the X axis, in degrees per second.
	rotationRate.gamma Read only
	The amount of rotation around the Y axis, in degrees per second.

// App.on Change.DeviceMotion (event)->
	x = event.acceleration.x;
		y = event.acceleration.y;
		z = event.acceleration.z;

		# Do something awesome.
###

# *********************************
# Device Orientation
# *********************************

###
// Use to detecting device orientation

event.alpha value represents the motion of the device around the z axis, 
represented in degrees with values ranging from 0 to 360.

event.beta value represents the motion of the device around the x axis, 
represented in degrees with values ranging from -180 to 180. 
This represents a front to back motion of the device.

event.gamma value represents the motion of the device around the y axis, 
represented in degrees with values ranging from -90 to 90. This represents a left to right motion of the device.

// App.on Change.DeviceOrientation, (event) ->
	absolute = event.absolute
	alpha		= event.alpha
	beta		 = event.beta
	gamma		= event.gamma

###

# *********************************
# Clipboard
# *********************************

###
Event fired when the user invoked the particular clipboard operation (either cut, copy or paste).
App.on Event.Cut (event) ->
App.on Event.Copy (event) ->
App.on Event.Paste (event) ->
###

# Programatically invokes the specified clipboard operation (either cut, copy or paste)
# on the data or element currently having a focus.

### 
App.clipboard.cut();
App.clipboard.copy();

Examples:

[var myButton = new Button({
	text: “Copy”,
	parent: page,
	click: function() {
		App.clipboard.copy(“something to copy”);
	}
});

var myTextField = new TextField({
	text: "something to copy",
	parent: page,
	click: function() {
		this.select();
		App.clipboard.copy();
	}
});

###

App.clipboard =
	'cut': ->
		document.execCommand 'Cut'
		return
	'copy': (text) ->

		detectIE = ->
			ua = window.navigator.userAgent
			msie = ua.indexOf('MSIE ')
			if msie > 0
				# IE 10 or older => return version number
				return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10)
			trident = ua.indexOf('Trident/')
			if trident > 0
				# IE 11 => return version number
				rv = ua.indexOf('rv:')
				return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10)
			edge = ua.indexOf('Edge/')
			if edge > 0
				# IE 12 => return version number
				return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10)
			# other browser
			false

		if text
			document.execCommand 'Copy'
			return
		
		if detectIE()
			window.clipboardData.setData 'Text', text

		textField = document.createElement('textarea')
		textField.innerText = text
		
		document.body.appendChild textField
		textField.select()
		
		document.execCommand 'copy'
		if window.clipboardData
			window.clipboardData.setData 'Text', copytext
		
		textField.remove()
		return


App.toInspect = =>
	"<App id:#{@id or null}>"


######################################################
# BEHIND THE SCENE FNs

# *********************************
# _routing method
#
# * Use for the routing of the app

App._routing = ->
	path = @pathname()

	fireRoute = (name) ->

		# Execute the before route function
		if window.Before
			stop = window.Before()
			
			# If the returning value is false, we stop the routing
			if stop is false
				return
			
		routeFound = true
		routeReturned = App._routes[name]()

		# If the return is page, we automatically add it
		if routeReturned and routeReturned._kind is 'Page'
			App.page = routeReturned
			
		return

	# Local verification: alert user if project in local
	if Utils.isFileUrl(App.location.href)
		err = 'Error: Project opened as a local file. Please set index.html as root / using a virtual server to use Routes.' 
		alert(err)
		throw Error(err)
		return

	# Get the first parameter from the URL
	pageURL = path[0]
	routeFound = false

	# Loop through the routes
	for routeName of @_routes
		
		if Utils.startsWith(routeName, '/')
			pageURL = '/' + path[0]

		# If the route start wth 'match:', it's a regex
		if Utils.startsWith(routeName, 'match:')
			
			routeName = routeName.replace('match:', '')
			
			try
				regex = new RegExp(routeName)
				test = regex.test(pageURL)
				
				# If the first test fail, we start again with the match of the full URL
				if not test
					test = regex.test('/' + path.join('/'))
				
				# If this test succeed, fire the route
				if test
					fireRoute 'match:' + routeName
					return
			catch e
				console.log 'App: Invalid regex, ' + routeName

		else if routeName is pageURL or (pageURL is '' and (routeName is 'main' or routeName is 'index' or routeName is 'Main'))
			fireRoute routeName
			return
	
	if not routeFound
		# Trigger the 404 page
		if @_routes.hasOwnProperty('default')
			fireRoute 'default'
		# Alias
		else if @_routes.hasOwnProperty('404')
			fireRoute '404'
		else if @_routes.hasOwnProperty('Default')
			fireRoute 'Default'
		else if @_routes.hasOwnProperty('defaults')
			fireRoute 'defaults'
		else if @_routes.hasOwnProperty('Defaults')
			fireRoute 'Defaults'
	return


App._updateFonts = (fonts) ->
	# Parse object to google font format: 'Open+Sans:400,300:latin'

	parseGoogleFontObject = (googleObj) ->
		if not googleObj.name
			return ''
		else
			# Parse name
			googleObj._name = googleObj.name.split(' ').join('+')
		
		# Set default weight
		if not googleObj.weight
			googleObj.weight = '400'
		
		# Set default sets
		if not googleObj.sets
			googleObj.sets = 'latin'
		googleObj._name + ':' + googleObj.weight + ':' + googleObj.sets

	if not fonts
		return

	fontDetector = new @_fontDetector

	# App.Fonts = "Open Sans";
	if Utils.isString(fonts)
		fonts = [ fonts ]

	if Utils.isArray(fonts)
		i = 0
		while i < fonts.length
			# App.Fonts = ["Open Sans", "Monterrat"];
			if typeof fonts[i] is 'string'
				fontName = fonts[i].replace(/\s+/g, '')
				font = name: fonts[i]
				
				# App.Fonts.OpenSans
				@_fonts[fontName] = fonts[i]
				@_fontsCollection.push font
				
				# If the font does not exist, we push it to the google font system
				if not fontDetector.detect(fonts[i])
					@_googleFont.push parseGoogleFontObject(font)
			
			# App.Fonts = [{width:"Open Sans"}, {width:"Monterrat"}];
			if Utils.isObject(fonts[i]) and fonts[i].name
				fontName = fonts[i].name.replace(/\s+/g, '')
				font = fonts[i]

				@_fonts[fontName] = fonts[i].name
				@_fontsCollection.push font
				
				# If the font does not exist, we push it to the google font system
				if not fontDetector.detect(fonts[i].name)
					@_googleFont.push parseGoogleFontObject(fonts[i])
			i++

	else if Utils.isObject(fonts) and fonts.name
		fontName = fonts.name.replace(/\s+/g, '')
		@_fonts[fontName] = fonts.name
		@_fontsCollection.push fonts

		# If the font does not exist, we push it to the google font system
		if not fontDetector.detect(fonts.name)
			@_googleFont.push parseGoogleFontObject(fonts)



###*
# JavaScript code to detect available availability of a
# particular font in a browser using JavaScript and CSS.
#
# Author : Lalit Patel
# Website: http://www.lalit.org/lab/javascript-css-font-detect/
# License: Apache Software License 2.0
#					http://www.apache.org/licenses/LICENSE-2.0
# Version: 0.15 (21 Sep 2009)
#					Changed comparision font to default from sans-default-default,
#					as in FF3.0 font of child element didn't fallback
#					to parent element if the font is missing.
# Version: 0.2 (04 Mar 2012)
#					Comparing font against all the 3 generic font families ie,
#					'monospace', 'sans-serif' and 'sans'. If it doesn't match all 3
#					then that font is 100% not available in the system
# Version: 0.3 (24 Mar 2012)
#					Replaced sans with serif in the list of baseFonts

/**
# Usage: d = new Detector();
#				d.detect('font name');
###

App._fontDetector = ->
	# a font will be compared against all the three default fonts.
	# and if it doesn't match all 3 then that font is not available.
	baseFonts = [
		'monospace'
		'sans-serif'
		'serif'
	]
	#we use m or w because these two characters take up the maximum width.
	# And we use a LLi so that the same matching fonts can get separated
	testString = 'mmmmmmmmmmlli'
	#we test using 72px font size, we may use any size. I guess larger the better.
	testSize = '72px'
	h = document.getElementsByTagName('body')[0]
	# create a SPAN in the document to get the width of the text we use to test
	s = document.createElement('span')

	detect = (font) ->
		detected = false
		for index of baseFonts
			s.style.fontFamily = font + ',' + baseFonts[index]
			# name of the font along with the base font for fallback.
			h.appendChild s
			matched = s.offsetWidth isnt defaultWidth[baseFonts[index]] or s.offsetHeight isnt defaultHeight[baseFonts[index]]
			h.removeChild s
			detected = detected or matched
		detected

	s.style.fontSize = testSize
	s.innerHTML = testString
	defaultWidth = {}
	defaultHeight = {}
	for index of baseFonts
		#get the default width for the three base fonts
		s.style.fontFamily = baseFonts[index]
		h.appendChild s
		defaultWidth[baseFonts[index]] = s.offsetWidth
		#width for the default font
		defaultHeight[baseFonts[index]] = s.offsetHeight
		#height for the defualt font
		h.removeChild s
	@detect = detect
	return


##############################################################
## EVENT HELPERS

App.onFocus = (cb) -> @on Event.Focus, cb
App.onResignFocus = (cb) -> @on Event.Blur, cb
App.onBlur = (cb) -> @on Event.Blur, cb
App.onResize = (cb) -> @on Event.Resize, cb
App.onAbort = (cb) -> @on Event.Abort, cb
App.onQuit = (cb) -> @on Event.Quit, cb
App.onHashChange = (cb) -> @on Event.HashChange, cb
App.onLoad = (cb) -> @on Event.Load, cb
App.onLoaded = (cb) -> @on Event.Load, cb
App.onDone = (cb) -> @on Event.Loaded, cb
App.onShow = (cb) -> @on Event.Show, cb
App.onClose = (cb) -> @on Event.Close, cb

App.onClick = (cb) -> @on Event.Click, cb
App.onDoubleClick = (cb) -> @on Event.DoubleClick, cb
App.onIn = (cb) -> @on Event.In, cb
App.onOut = (cb) -> @on Event.Out, cb
App.onDown = (cb) -> @on Event.Down, cb
App.onOver = (cb) -> @on Event.Over, cb
App.onUp = (cb) -> @on Event.Up, cb
App.onMove = (cb) -> @on Event.Move, cb
App.onRightClick = (cb) -> @on Event.RightClick, cb

App.onMouseIn = (cb) -> @on Event.MouseIn, cb
App.onMouseUp = (cb) -> @on Event.MouseUp, cb
App.onMouseDown = (cb) -> @on Event.MouseDown, cb
App.onMouseOver = (cb) -> @on Event.MouseOver, cb
App.onMouseOut = (cb) -> @on Event.MouseOut, cb
App.onMouseMove = (cb) -> @on Event.MouseMove, cb
App.onMouseWheel = (cb) -> @on Event.MouseWheel, cb

App.onScroll = (cb) -> @on Event.Scroll, cb

# Touch Event
App.onTouchStart = (cb) -> @on Event.TouchStart, cb
App.onTouchEnd = (cb) -> @on Event.TouchEnd, cb
App.onTouchMove = (cb) -> @on Event.TouchMove, cb

# Gestures

# Tap
App.onTap = (cb) -> @on(Event.Tap, cb)
App.onTapStart = (cb) -> @on(Event.TapStart, cb)
App.onTapEnd = (cb) -> @on(Event.TapEnd, cb)
App.onDoubleTap = (cb) -> @on(Event.DoubleTap, cb)

# Force Tap
App.onForceTap = (cb) -> @on(Event.ForceTap, cb)
App.onForceTapChange = (cb) -> @on(Event.ForceTapChange, cb)
App.onForceTapStart = (cb) -> @on(Event.ForceTapStart, cb)
App.onForceTapEnd = (cb) -> @on(Event.ForceTapEnd, cb)

# Press
App.onLongPress = (cb) -> @on(Event.LongPress, cb)
App.onLongPressStart = (cb) -> @on(Event.LongPressStart, cb)
App.onLongPressEnd = (cb) -> @on(Event.LongPressEnd, cb)

# Swipe
App.onSwipe = (cb) -> @on(Event.Swipe, cb)
onSwipeStart = (cb) -> @on(Event.SwipeStart, cb)
onSwipeEnd = (cb) -> @on(Event.SwipeEnd, cb)

App.onSwipeUp = (cb) -> @on(Event.SwipeUp, cb)
App.onSwipeUpStart = (cb) -> @on(Event.SwipeUpStart, cb)
App.onSwipeUpEnd = (cb) -> @on(Event.SwipeUpEnd, cb)

App.onSwipeDown = (cb) -> @on(Event.SwipeDown, cb)
App.onSwipeDownStart = (cb) -> @on(Event.SwipeDownStart, cb)
App.onSwipeDownEnd = (cb) -> @on(Event.SwipeDownEnd, cb)

App.onSwipeLeft = (cb) -> @on(Event.SwipeLeft, cb)
App.onSwipeLeftStart = (cb) -> @on(Event.SwipeLeftStart, cb)
App.onSwipeLeftEnd = (cb) -> @on(Event.SwipeLeftEnd, cb)

App.onSwipeRight = (cb) -> @on(Event.SwipeRight, cb)
App.onSwipeRightStart = (cb) -> @on(Event.SwipeRightStart, cb)
App.onSwipeRightEnd = (cb) -> @on(Event.SwipeRightEnd, cb)

# Pan
App.onPan = (cb) -> @on(Event.Pan, cb)
App.onPanStart = (cb) -> @on(Event.PanStart, cb)
App.onPanEnd = (cb) -> @on(Event.PanEnd, cb)
App.onPanLeft = (cb) -> @on(Event.PanLeft, cb)
App.onPanRight = (cb) -> @on(Event.PanRight, cb)
App.onPanUp = (cb) -> @on(Event.PanUp, cb)
App.onPanDown = (cb) -> @on(Event.PanDown, cb)

# Pinch
###
App.onPinch = (cb) -> @on(Event.Pinch, cb)
App.onPinchStart = (cb) -> @on(Event.PinchStart, cb)
App.onPinchEnd = (cb) -> @on(Event.PinchEnd, cb)
###

# Scale
App.onScale = (cb) -> @on(Event.Scale, cb)
App.onScaleStart = (cb) -> @on(Event.ScaleStart, cb)
App.onScaleEnd = (cb) -> @on(Event.ScaleEnd, cb)

# Rotate
App.onRotate = (cb) -> @on(Event.Rotate, cb)
App.onRotateStart = (cb) -> @on(Event.RotateStart, cb)
App.onRotateEnd = (cb) -> @on(Event.RotateEnd, cb)

# Import
App.onImportProgress = (cb) -> @on(Event.ImportProgress, cb)
App.onImportEnd = (cb) -> @on(Event.ImportEnd, cb)

# Preload
App.onPreloadProgress = (cb) -> @on(Event.PreloadProgress, cb)
App.onPreloadEnd = (cb) -> @on(Event.PreloadEnd, cb)

# Keyboard Events
App.onKeyDown = (cb) -> @on Event.KeyDown, cb
App.onKeyPress = (cb) -> @on Event.KeyPress, cb
App.onKeyUp = (cb) -> @on Event.KeyUp, cb


