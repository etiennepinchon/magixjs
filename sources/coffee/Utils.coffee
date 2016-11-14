
# Utils

Utils = {}

######################################################
# Platform parsers

Utils.parseAsset = (value) ->
	return value if not value or value.length is 0

	if window.__CATALOG isnt undefined
		tmp_value = ''
		extension = value.split('.').pop()
		if value is extension
			if window.__CATALOG[value] is undefined
				log 'Asset named \'' + value + '\' does not exist.', 'error'
				return ''
			tmp_value = 'documents/' + value + '.' + window.__CATALOG[value]

			# FOR DIRECT PATH ACCESS
			if window.__IS_DIRECT_PATH and window.__ID
				tmp_value = '/' + window.__ID + '/' + tmp_value
			# For the preview mode
			else if window.USE_PROJECT_PATH isnt undefined and window.__ID isnt undefined
				tmp_value = '/p/' + window.__ID + '/' + tmp_value
			else
				tmp_value = '/' + tmp_value

			if App.__BUILD and not App.USE_PROJECT_PATH
				tmp_value += '?b=' + App.__BUILD

			return tmp_value
	value


Utils.parseURL = (value) ->
	# For the preview mode or direct access
	if (window.USE_PROJECT_PATH isnt undefined or window.__IS_DIRECT_PATH isnt undefined) and window.__ID isnt undefined

		isExternal = (url) ->
			domain = (url) ->
				url.replace('http://', '').replace('https://', '').split('/')[0]

			domainURL = domain(url)
			if domainURL is ''
				return false
			domain(location.href) isnt domainURL

		if not isExternal(value)
			if value[0] isnt '/'
				value = '/' + value
			
			if App.USE_PROJECT_PATH or App.__IS_DIRECT_PATH
				value = '/' + window.__ID + value
				value = '/p' + value if App.USE_PROJECT_PATH
	value


######################################################
# HELPERS

# Convert utf8 to base 64
Utils.base64 = (str) ->
    window.btoa(escape(encodeURIComponent(str)))

# Convert base 64 to utf8
Utils.utf8 = (str) ->
    decodeURIComponent(unescape(window.atob(str)))


# GroupeBy
# http://codereview.stackexchange.com/questions/37028/grouping-elements-in-array-by-multiple-properties
Utils.groupBy = (array, f) ->
	groups = {}
	array.forEach (o) ->
		group = JSON.stringify(f(o))
		groups[group] = groups[group] or []
		groups[group].push o
		return
	Object.keys(groups).map (group) ->
		groups[group]

# Merge two arrays together
Utils.mergeArray = (a, b) ->
	a.concat(b)

Utils.values = (arr) ->
	keys = Object.keys(arr)
	vals = []
	for i in keys
	    vals.push(arr[i]);
	
	return vals

# Extracting a list of property values.
Utils.pluck = (arr, key) ->
	arr.map (object) ->
		return object[key]

# Difference between 2 arrays
# Return the value A without the values of B find in A
Utils.without = (a, b) ->
	if not Utils.isArray a
		a = [a]
	if not Utils.isArray b
		b = [b]
	
	a.filter (i) ->
		b.indexOf(i) < 0

Utils.e = (str) ->
	String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace /"/g, '&quot;'

Utils.clone = (original) ->
	#
	if Utils.isArray(original)
		return original.slice(0)

	# First create an empty object with
	# same prototype of our original source
	clone = Object.create(Object.getPrototypeOf(original))
	i = undefined
	keys = Object.getOwnPropertyNames(original)
	i = 0
	while i < keys.length
		# copy each property into the clone
		Object.defineProperty clone, keys[i], Object.getOwnPropertyDescriptor(original, keys[i])
		i++
	clone

Utils.capitalizeFirstLetter = (string) ->
	string.charAt(0).toUpperCase() + string.slice(1)

Utils.capitalizeFirst = Utils.capitalizeFirstLetter

Utils.startsWith = (str, prefix) ->
	str.lastIndexOf(prefix, 0) is 0

Utils.endsWith = (str, suffix) ->
	str.indexOf(suffix, str.length - (suffix.length)) isnt -1

Utils.pick = (obj, list) ->
	newObj = {}
	i = 0
	while i < list.length
		str = list[i].split('.')
		o = obj[str[0]]
		j = 1
		while j < str.length
			o = o[str[j]]
			j++
		newObj[list[i]] = o
		i++
	newObj
	
#var arr = Object.keys( obj ).map(function ( key ) { return obj[key]; });

# Return the minium value if an array, or the minimum value of the key of an object
###
var a ={
    "2013-06-26":839,
    "2013-06-25":50,
    "2013-03-08":25,
    "2013-05-14":546,
    "2013-03-11":20
};
###
Utils.min = (object) ->
	if Utils.isArray(object)
		return Math.min.apply(null, object);
	else
		return Object.keys(object).sort()[0]
	
Utils.max = (object) ->
	if Utils.isArray(object)
		return Math.max.apply(null, object);
	else
		return Object.keys(object).sort().slice(-1)[0]

Utils.isEqual = (x, y) ->
	'use strict'
	if x is null or x is undefined or y is null or y is undefined
		return x is y

	# after this just checking type of one would be enough
	if x.constructor isnt y.constructor
		return false

	# if they are functions, they should exactly refer to same one (because of closures)
	if x instanceof Function
		return x is y

	# if they are regexps, they should exactly refer to same one (it is hard to better equality check on current ES)
	if x instanceof RegExp
		return x is y

	if x is y or x.valueOf() is y.valueOf()
		return true
	if Array.isArray(x) and x.length isnt y.length
		return false
	# if they are dates, they must had equal valueOf
	if x instanceof Date
		return false

	# if they are strictly equal, they both need to be object at least
	if !(x instanceof Object)
		return false
	if !(y instanceof Object)
		return false

	# recursive object equality check
	p = Object.keys(x)
	Object.keys(y).every((i) ->
		p.indexOf(i) isnt -1
	) and p.every((i) ->
		Utils.isEqual x[i], y[i]
	)

Utils.invoke = (obj, method) ->
	args = Array.prototype.slice.call(arguments, 2)
	isFunc = typeof method is 'function'
	obj.map (value) ->
		(if isFunc then method else value[method]).apply value, args
	
Utils.first = (arr) ->
	arr[0]

Utils.last = (arr) ->
	arr[arr.length-1]

# Assign object to other object
Utils.extend = (a, b) ->
	for key of b
		if b.hasOwnProperty(key)
			a[key] = b[key]
	return a

# Add key in object if undefined
Utils.defaults = (a, b) ->
	for key of b
		if not a.hasOwnProperty(key)
			a[key] = b[key]
	return a

# union 
# Computes the union of the passed-in arrays: the list of unique items, 
# in order, that are present in one or more of the arrays.
Utils.union = (x, y) ->
	array = x.concat(y)
	a = array.concat()
	i = 0

	while i < a.length
		j = i + 1
		while j < a.length
			if a[i] == a[j]
				a.splice j--, 1
			++j
		++i
	a


######################################################
# Variable check

Utils.isString = (string) ->
	return true if typeof string is 'string'
	return false

Utils.isFunction = (func) ->
	return true if typeof func is 'function'
	return false

Utils.isBoolean = (bool) ->
	return true if typeof bool is 'boolean'
	return false

Utils.isFloat = (float) ->
	return Number(float) is float and float % 1 isnt 0

Utils.isInteger = (int) ->
	return Number.isInteger(int)

Utils.isNumber = (num) ->
	return !isNaN(num)

Utils.isArray = (arr) ->
	return Array.isArray(arr)

Utils.isObject = (obj) ->
	return true if obj and typeof obj is 'object'
	return false

Utils.isFinite = (num) ->
	return true if num < Infinity and num > -Infinity	
	return false

Utils.isDate = (object) ->
	return true if object instanceof Date
	return false

Utils.isRegExp = (reg) ->
	return true if reg instanceof RegExp
	return false

Utils.isError = (object) ->
	return true if object instanceof Error
	return false

Utils.isNaN = (val) ->
	return true if isNaN(val)
	return false

Utils.isNull = (val) ->
	return true if val is null
	return false

Utils.isUndefined = (val) ->
	return true if val is undefined
	return false



######################################################
# VALUES

Utils.keys = (object) ->
	return Object.keys(object)

Utils.reset = ->
	App.CurrentContext.reset()

Utils.getValue = (value) ->
	return value() if Utils.isFunction value
	return value

Utils.getValueForKeyPath = (obj, key) ->
	result = obj
	return obj[key] if not "." in key
	result = result[key] for key in key.split(".")
	result

Utils.setValueForKeyPath = (obj, path, val) ->
	fields = path.split('.')
	result = obj
	i = 0
	n = fields.length
	while i < n and result != undefined
		field = fields[i]
		if i == n - 1
			result[field] = val
		else
			if typeof result[field] == 'undefined' or !Utils.isObject(result[field])
				result[field] = {}
			result = result[field]
		i++
	return

Utils.valueOrDefault = (value, defaultValue) ->
	if value in [undefined, null]
		value = defaultValue
	return value

Utils.arrayNext = (arr, item) ->
	arr[arr.indexOf(item) + 1] or Utils.first arr

Utils.arrayPrev = (arr, item) ->
	arr[arr.indexOf(item) - 1] or Utils.last arr



######################################################
# MATH

Utils.sum = (arr) -> arr.reduce (a, b) -> a + b
Utils.average = (arr) -> Utils.sum(arr) / arr.length
Utils.mean = Utils.average
Utils.median = (x) ->
	return null if x.length is 0

	sorted = x.slice().sort (a, b) ->
		a - b

	if sorted.length % 2 is 1
		sorted[(sorted.length - 1) / 2]
	else
		(sorted[(sorted.length / 2) - 1] + sorted[sorted.length / 2]) / 2

Utils.nearestIncrement = (x, increment) ->
	return x unless increment
	return Math.round(x * (1 / increment)) / (1 / increment)


######################################################
# TIME FUNCTIONS

# Note: We keep all times in seconds

# Used by animation engine, needs to be very performant
if window.performance
	Utils.getTime = -> window.performance.now() / 1000
else
	Utils.getTime = -> Date.now() / 1000

Utils.delay = (time, f) ->
	timer = setTimeout(f, time * 1000)
	App.CurrentContext.addTimer(timer)
	return timer

Utils.interval = (time, f) ->
	timer = setInterval(f, time * 1000)
	App.CurrentContext.addInterval(timer)
	return {
		stop : ->
			clearInterval(timer)
		clear : ->
			clearInterval(timer)
	}

Utils.debounce = (threshold=0.1, fn, immediate) ->
	timeout = null
	threshold *= 1000
	(args...) ->
		obj = this
		delayed = ->
			fn.apply(obj, args) unless immediate
			timeout = null
		if timeout
			clearTimeout(timeout)
		else if (immediate)
			fn.apply(obj, args)
		timeout = setTimeout delayed, threshold

Utils.throttle = (delay, fn) ->
	return fn if delay is 0
	delay *= 1000
	timer = false
	return ->
		return if timer
		timer = true
		setTimeout (-> timer = false), delay unless delay is -1
		fn arguments...

# Taken from http://addyosmani.com/blog/faster-javascript-memoization/
###
Utils.memoize = (fn) -> ->
	args = Array::slice.call(arguments)
	hash = ""
	i = args.length
	currentArg = null
	while i--
		currentArg = args[i]
		hash += (if (currentArg is Object(currentArg)) then JSON.stringify(currentArg) else currentArg)
		fn.memoize or (fn.memoize = {})
	(if (hash of fn.memoize) then fn.memoize[hash] else fn.memoize[hash] = fn.apply(this, args))

###

######################################################
# HANDY FUNCTIONS

Utils.randomColor = (alpha = 1.0) ->
	return Color.random(alpha)

Utils.randomChoice = (arr) ->
	arr[Math.floor(Math.random() * arr.length)]

Utils.randomNumber = (a=0, b=1) ->
	# Return a random number between a and b
	Utils.mapRange Math.random(), 0, 1, a, b

Utils.defineEnum = (names = [], offset = 0, geometric = 0) ->
	Enum = {}
	for name, i in names
		j = i
		j = if ! offset    then j else j + offset
		j = if ! geometric then j else Math.pow geometric, j
		Enum[Enum[name] = j] = name
	return Enum

Utils.stringify = (obj) ->
	try
		return JSON.stringify obj if Utils.isObject obj
	catch
		""
	return "null" if obj is null
	return "undefined" if obj is undefined
	return obj.toString() if obj.toString
	return obj

Utils.randomID = ->
	Math.floor Math.random() * 100000 + 1

Utils.uuid = ->
	chars = "0123456789abcdefghijklmnopqrstuvwxyz".split("")
	output = new Array(36)
	random = 0

	for digit in [1..32]
		random = 0x2000000 + (Math.random() * 0x1000000) | 0 if (random <= 0x02)
		r = random & 0xf
		random = random >> 4
		output[digit] = chars[if digit == 19 then (r & 0x3) | 0x8 else r]

	output.join ""

# Convert an arguments object to an array
Utils.arrayFromArguments = (args) ->
	return args[0] if Utils.isArray(args[0])
	return Array.prototype.slice.call(args)

# Returns a function that cycles through a list of values with each call.
Utils.cycle = ->
	args = Utils.arrayFromArguments arguments

	curr = -1
	return ->
		curr++
		curr = 0 if curr >= args.length
		return args[curr]


######################################################
# ENVIROMENT FUNCTIONS

Utils.browser = ->
	ua = navigator.userAgent
	tem = undefined
	M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) or []
	if /trident/i.test(M[1])
		tem = /\brv[ :]+(\d+)/g.exec(ua) or []
		return {
		name: 'IE'
		version: tem[1] or ''
		}

	if M[1] is 'Chrome'
		tem = ua.match(/\bOPR\/(\d+)/)
		if tem isnt null
			return {
				name: 'Opera'
				version: tem[1]
			}
	M = if M[2] then [
		M[1]
		M[2]
	] else [
		navigator.appName
		navigator.appVersion
		'-?'
	]
	if (tem = ua.match(/version\/(\d+)/i)) isnt null
		M.splice 1, 1, tem[1]
	{
		name: M[0]
		version: M[1]
	}

Utils.isWebKit = ->
	window.WebKitCSSMatrix isnt undefined

Utils.webkitVersion = ->
	version = -1
	regexp = /AppleWebKit\/([\d.]+)/
	result = regexp.exec(navigator.userAgent)
	version = parseFloat(result[1]) if result
	version

Utils.isChrome = ->
	(/chrome/).test(navigator.userAgent.toLowerCase())

Utils.isSafari = ->
	if (/safari/).test(navigator.userAgent.toLowerCase()) and not Utils.isChrome() # LOL Google Chrome think it is both Safari and Chrome so we need to remove it from the test
		return true
	return false

Utils.isTouch = ->
	# This needs to be a little more extensive because we
	# patch ontouchstart to fake Hammer
	window.ontouchstart is null and
	window.ontouchmove is null and
	window.ontouchend is null

Utils.isDesktop = ->
	Utils.deviceType() is "desktop"

Utils.isPhone = ->
	Utils.deviceType() is "phone"

Utils.isTablet = ->
	Utils.deviceType() is "tablet"

Utils.isMobile = ->
	Utils.isPhone() or Utils.isTablet()

Utils.isFileUrl = (url) ->
	return if not url
	return Utils.startsWith(url, "file://")

Utils.isRelativeUrl = (url) ->
	!/^([a-zA-Z]{1,8}:\/\/).*$/.test(url)

Utils.isLocalServerUrl = (url) ->
	return url.indexOf("127.0.0.1") != -1 or url.indexOf("localhost")  != -1

Utils.isLocalUrl = (url) ->
	return true if Utils.isFileUrl(url)
	return true if Utils.isLocalServerUrl(url)
	return false

Utils.devicePixelRatio = ->
	window.devicePixelRatio

Utils.deviceType = ->

	# Taken from
	# https://github.com/jeffmcmahan/device-detective/blob/master/bin/device-detect.js

	if /(tablet)|(iPad)|(Nexus 9)/i.test(navigator.userAgent)
		return "tablet"

	if /(mobi)/i.test(navigator.userAgent)
		return "phone"

	return "desktop"


Utils.pathJoin = ->
	Utils.arrayFromArguments(arguments).join("/")



######################################################
# MATH FUNCTIONS

Utils.round = (value, decimals=0) ->
	d = Math.pow 10, decimals
	Math.round(value * d) / d

Utils.clamp = (value, a, b) ->

	min = Math.min(a, b)
	max = Math.max(a, b)

	value = min if value < min
	value = max if value > max
	return value

# Taken from http://jsfiddle.net/Xz464/7/
# Used by animation engine, needs to be very performant
Utils.mapRange = (value, fromLow, fromHigh, toLow, toHigh) ->
	toLow + (((value - fromLow) / (fromHigh - fromLow)) * (toHigh - toLow))

# Kind of similar as above but with a better syntax and a limiting option
Utils.modulate = (value, rangeA, rangeB, limit=false) ->

	[fromLow, fromHigh] = rangeA
	[toLow, toHigh] = rangeB

	# if rangeB consists of Colors we return a color tween
	# if Color.isColor(toLow) || Utils.isString(toLow) && Color.isColorString(toLow)
	# 	ratio = Utils.modulate(value, rangeA, [0, 1])
	# 	result = Color.mix(toLow, toHigh, ratio)
	# 	return result

	result = toLow + (((value - fromLow) / (fromHigh - fromLow)) * (toHigh - toLow))

	if limit is true
		if toLow < toHigh
			return toLow if result < toLow
			return toHigh if result > toHigh
		else
			return toLow if result > toLow
			return toHigh if result < toHigh

	result


######################################################
# STRING FUNCTIONS

Utils.parseFunction = (str) ->

	result = {name: "", args: []}

	if Utils.endsWith str, ")"
		result.name = str.split("(")[0]
		result.args = str.split("(")[1].split(",").map (a) -> a.replace(/\)+$/, '').trim()
	else
		result.name = str

	return result


######################################################
# DOM FUNCTIONS

__domComplete = []
__domReady = false

if MagiX.__domReady
	__domReady = true

if document?
	document.onreadystatechange = (event) ->
		if document.readyState is 'interactive'
			__domReady = true
			while __domComplete.length
				f = __domComplete.shift()()

Utils.domComplete = (f) ->
	if __domReady
		f()
	else
		__domComplete.push(f)

Utils.domCompleteCancel = (f) ->
	__domComplete = Utils.without(__domComplete, f)


Utils.domValidEvent = (element, eventName) ->
	return if not eventName
	return true if eventName in ["touchstart", "touchmove", "touchend"]
	return typeof(element["on#{eventName.toLowerCase()}"]) isnt "undefined"


Utils.domLoadScript = (url, callback) ->

	# TODO improve this, maybe
	if App.isOffline()
		return
	
	script = document.createElement "script"
	script.type = "text/javascript"
	script.src = url

	# Then bind the event to the callback function.
	# There are several events for cross browser compatibility.
	if Utils.isFunction callback
		script.onreadystatechange = callback.bind url
		script.onload = callback.bind url

	Utils.domComplete ->
		document.body.appendChild(script)


Utils.insertCSS = (css) ->
	styleElement = document.createElement("style")
	styleElement.type = "text/css"
	styleElement.innerHTML = css

	Utils.domComplete ->
		head = document.head or document.getElementsByTagName('head')[0]
		head.appendChild styleElement

Utils.loadCSS = (paths) ->
	return if not paths
	paths = [paths] if Utils.isString(paths)
	toImport = []

	# Parse paths
	for path in paths

		# No ending with .js
		if path.indexOf('.css') is -1
			path = '/build/' + path + '.css'

			if App.USE_PROJECT_PATH
				urlPathname = App.location.pathname.split('/')
				urlPathname.shift()
				urlPathname.shift()
				path = '/p/' + urlPathname[0] + '/' + path# + '?b=' + new Date().getTime()

		if App.__IS_DIRECT_PATH and Utils.startsWith(path, '/build/')
			path = '/' + window.__ID + path

		if App.__BUILD
			path += '?b=' + App.__BUILD

		head = document.getElementsByTagName('head')[0]
		link = document.createElement('link')
		link.rel = 'stylesheet'
		link.type = 'text/css'
		link.href = path
		link.media = 'all'
		head.appendChild link


######################################################
# GEOMETRY FUNCTIONS

# Point

Utils.pointDivide = (point, fraction) ->
	return point =
		x: point.x / fraction
		y: point.y / fraction

Utils.pointAdd = (pointA, pointB) ->
	return point =
		x: pointA.x + pointB.x
		y: pointA.y + pointB.y

Utils.pointSubtract = (pointA, pointB) ->
	return point =
		x: pointA.x - pointB.x
		y: pointA.y - pointB.y

Utils.pointZero = (args={}) ->
	return Utils.defaults(args, {x:0, y:0})

Utils.pointMin = ->
	points = Utils.arrayFromArguments arguments
	point =
		x: Utils.min points.map (size) -> size.x
		y: Utils.min points.map (size) -> size.y

Utils.pointMax = ->
	points = Utils.arrayFromArguments arguments
	point =
		x: Utils.max points.map (size) -> size.x
		y: Utils.max points.map (size) -> size.y

Utils.pointDelta = (pointA, pointB) ->
	delta =
		x: pointB.x - pointA.x
		y: pointB.y - pointA.y

Utils.pointDistance = (pointA, pointB) ->
	a = pointA.x - pointB.x
	b = pointA.y - pointB.y
	return Math.sqrt((a * a) + (b * b))

Utils.pointInvert = (point) ->
	point =
		x: 0 - point.x
		y: 0 - point.y

Utils.pointTotal = (point) ->
	point.x + point.y

Utils.pointAbs = (point) ->
	point =
		x: Math.abs point.x
		y: Math.abs point.y

Utils.pointInFrame = (point, frame) ->
	return false if point.x < Utils.frameGetMinX(frame) or point.x > Utils.frameGetMaxX(frame)
	return false if point.y < Utils.frameGetMinY(frame) or point.y > Utils.frameGetMaxY(frame)
	return true

Utils.pointCenter = (pointA, pointB) ->
	return point =
		x: (pointA.x + pointB.x) / 2
		y: (pointA.y + pointB.y) / 2

Utils.pointAngle = (pointA, pointB) ->
	return Math.atan2(pointB.y - pointA.y, pointB.x - pointA.x) * 180 / Math.PI


# Size

Utils.sizeZero = (args={}) ->
	return Utils.defaults(args, {width:0, height:0})

Utils.sizeMin = ->
	sizes = Utils.arrayFromArguments arguments
	size  =
		width:  Utils.min sizes.map (size) -> size.width
		height: Utils.min sizes.map (size) -> size.height

Utils.sizeMax = ->
	sizes = Utils.arrayFromArguments arguments
	size  =
		width:  Utils.max sizes.map (size) -> size.width
		height: Utils.max sizes.map (size) -> size.height

# Rect

Utils.rectZero = (args={}) ->
	return Utils.defaults(args, {top:0, right:0, bottom:0, left:0})

Utils.parseRect = (args) ->
	if Utils.isArray(args) and Utils.isNumber(args[0])
		return Utils.parseRect({top:args[0]}) if args.length is 1
		return Utils.parseRect({top:args[0], right:args[1]}) if args.length is 2
		return Utils.parseRect({top:args[0], right:args[1], bottom:args[2]}) if args.length is 3
		return Utils.parseRect({top:args[0], right:args[1], bottom:args[2], left:args[3]}) if args.length is 4
	if Utils.isArray(args) and Utils.isObject(args[0])
		return args[0]
	if Utils.isObject(args)
		return args

	return {}

# Frames

# min mid max * x, y

Utils.frameGetMinX = (frame) -> frame.x
Utils.frameSetMinX = (frame, value) -> frame.x = value

Utils.frameGetMidX = (frame) ->
	if frame.width is 0 then 0 else frame.x + (frame.width / 2.0)
Utils.frameSetMidX = (frame, value) ->
	frame.x = if frame.width is 0 then 0 else value - (frame.width / 2.0)

Utils.frameGetMaxX = (frame) ->
	if frame.width is 0 then 0 else frame.x + frame.width
Utils.frameSetMaxX = (frame, value) ->
	frame.x = if frame.width is 0 then 0 else value - frame.width

Utils.frameGetMinY = (frame) -> frame.y
Utils.frameSetMinY = (frame, value) -> frame.y = value

Utils.frameGetMidY = (frame) ->
	if frame.height is 0 then 0 else frame.y + (frame.height / 2.0)
Utils.frameSetMidY = (frame, value) ->
	frame.y = if frame.height is 0 then 0 else value - (frame.height / 2.0)

Utils.frameGetMaxY = (frame) ->
	if frame.height is 0 then 0 else frame.y + frame.height
Utils.frameSetMaxY = (frame, value) ->
	frame.y = if frame.height is 0 then 0 else value - frame.height

Utils.frameZero = (args={}) ->
	return Utils.defaults(args, {top:0, right:0, bottom:0, left:0})

Utils.frameSize = (frame) ->
	size =
		width: frame.width
		height: frame.height

Utils.framePoint = (frame) ->
	point =
		x: frame.x
		y: frame.y

Utils.pointsFromFrame = (frame) ->
	minX = Utils.frameGetMinX(frame)
	maxX = Utils.frameGetMaxX(frame)
	minY = Utils.frameGetMinY(frame)
	maxY = Utils.frameGetMaxY(frame)
	corner1 = {x:minX, y:minY}
	corner2 = {x:minX, y:maxY}
	corner3 = {x:maxX, y:maxY}
	corner4 = {x:maxX, y:minY}
	return [corner1, corner2, corner3, corner4]

Utils.frameFromPoints = (points) ->

	xValues = Utils.pluck(points, "x")
	yValues = Utils.pluck(points, "y")

	minX = Utils.min(xValues)
	maxX = Utils.max(xValues)
	minY = Utils.min(yValues)
	maxY = Utils.max(yValues)

	frame =
		x: minX
		y: minY
		width: maxX - minX
		height: maxY - minY

Utils.pixelAlignedFrame = (frame) ->
	result =
		width: Math.round(frame.width + (frame.x % 1))
		height: Math.round(frame.height + (frame.y % 1))
		x: Math.round(frame.x)
		y: Math.round(frame.y)

Utils.frameMerge = ->

	# Return a frame that fits all the input frames

	frames = Utils.arrayFromArguments arguments

	frame =
		x: Utils.min frames.map Utils.frameGetMinX
		y: Utils.min frames.map Utils.frameGetMinY

	frame.width  = Utils.max(frames.map Utils.frameGetMaxX) - frame.x
	frame.height = Utils.max(frames.map Utils.frameGetMaxY) - frame.y

	frame

Utils.framePointForOrigin = (frame, originX, originY) ->
	frame =
		x: frame.x + (originX * frame.width)
		y: frame.y + (originY * frame.height)
		width: frame.width
		height: frame.height

Utils.frameInset = (frame, inset) ->

	if Utils.isNumber(inset)
		inset = {top:inset, right:inset, bottom:inset, left:inset}

	frame =
		x: frame.x + inset.left
		y: frame.y + inset.top
		width: frame.width - inset.left - inset.right
		height: frame.height - inset.top - inset.bottom

Utils.frameSortByAbsoluteDistance = (point, frames, originX=0, originY=0) ->
	distance = (frame) ->
		result = Utils.pointDelta(point, Utils.framePointForOrigin(frame, originX, originY))
		result = Utils.pointAbs(result)
		result = Utils.pointTotal(result)
		result

	return frames.sort (a, b) -> distance(a) - distance(b)

Utils.pointInPolygon = (point, vs) ->
	# ray-casting algorithm based on
	# http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html
	x = point[0]
	y = point[1]
	inside = false
	i = 0
	j = vs.length - 1
	while i < vs.length
		xi = vs[i][0]
		yi = vs[i][1]
		xj = vs[j][0]
		yj = vs[j][1]
		intersect = yi > y != yj > y and x < (xj - xi) * (y - yi) / (yj - yi) + xi
		if intersect
			inside = !inside
		j = i++
	inside

Utils.frameCenterPoint = (frame) ->
	return point =
		x: Utils.frameGetMidX(frame)
		y: Utils.frameGetMidY(frame)

# Rotation

Utils.rotationNormalizer = ->

	lastValue = null

	return (value) =>
		lastValue = value if not lastValue?

		diff = lastValue - value
		maxDiff = Math.abs(diff) + 180
		nTimes = Math.floor(maxDiff / 360)

		value -= (nTimes * 360) if diff < 180
		value += (nTimes * 360) if diff > 180

		lastValue = value
		return value


######################################################
# INSPECTOR

Utils.inspectObjectType = (item) ->
	# This is a hacky way to get nice object names, it tries to
	# parse them from the .toString methods for objects.

	if item._kind? and item._kind != "Object"
		return item._kind

	extract = (str) ->
		return null unless str
		regex = /\[object (\w+)\]/
		match = regex.exec(str)
		return match[1] if match
		return null

	if item.toString
		className = extract(item.toString())
		return className if className

	return "Object"


Utils.inspect = (item, max=5, l=0) ->

	return "null" if item is null
	return "undefined" if item is undefined

	# Return inspector function if exist
	if Utils.isFunction(item.toInspect)
		return item.toInspect()

	# If string -> add "" and escape
	if Utils.isString(item)
		return "\"#{item}\""

	if Utils.isNumber(item)
		return "#{item}"

	# If function -> trim to 50 chars
	if Utils.isFunction(item)
		code = item.toString()["function ".length..].replace(/\n/g, "").replace(/\s+/g, " ")
		# We limit the size of a function body if it's in a strucutre
		limit = 50
		code = "#{Utils.trimRight(code[..limit])}… }" if code.length > limit and l > 0
		return "<Function #{code}>"

	# If array inspect and join
	if Utils.isArray(item)
		return "[...]" if l > max
		return "[" + item.map((i) -> Utils.inspect(i, max, l+1)).join(", ") + "]"

	# If object
	if Utils.isObject(item)
		objectType = Utils.inspectObjectType(item)
		
		# We should not loop over dom trees because we will have a bad time
		return "<#{objectType}>" if /HTML\w+?Element/.test(objectType)
		if l > max
			objectInfo = "{...}"
		else

			objectInfo = []
			for stuff of item
				objectInfo.push ("#{stuff}:#{Utils.inspect(item[stuff], max, l+1).toString()}")

			objectInfo = "{" + objectInfo.join(", ") + "}"
			
		return objectInfo if objectType is "Object"
		return "<#{objectType} #{objectInfo}>"

	return "#{item}"

######################################################
# EXTRAS

Utils.formatBytes = (bytes, decimals) ->
  if bytes == 0
    return '0 Byte'
  k = 1000
  # or 1024 for binary
  dm = decimals + 1 or 3
  sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  i = Math.floor(Math.log(bytes) / Math.log(k))
  parseFloat((bytes / k ** i).toFixed(dm)) + ' ' + sizes[i]

