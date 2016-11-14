
# Fonts

App._WebFontLoad	 = no
App._WebFontLoaded	 = no
App._fonts 			 = []
App._fontsCollection = []
App.WebFontConfig = 
	google: 
		families: []
	#fontactive: (e)->
	#	console.log e
App._googleFont = []
App._googleFontTmp = []

class Font
	_kind 			: 'Font'

	constructor : (font, weight)->
		if Utils.isString font
			font = name: font
		if Utils.isObject(font) and Utils.isString(weight)
			font.weight = weight
		
		return Fonts font

Fonts = ->
	google_previous_call 	= Utils.clone(App._googleFont)
	App._googleFont 		= []

	# Format fonts
	Fonts._updateFonts arguments	

	# Set the first font in the array as default
	if App._fontsCollection.length > 0
		App.fontName = App._fontsCollection[0].name

	# If fonts are already loaded
	return if Utils.isEqual google_previous_call, App._googleFont
	if App._googleFont.length > 0
		# Load webfont.js
		# If webfont isnt loaded yet
		if App._WebFontLoad is false
			App._WebFontLoad = yes
			App.WebFontConfig.google.families = Utils.mergeArray App.WebFontConfig.google.families, App._googleFont
			# Load script
			Utils.domLoadScript (if 'https:' is document.location.protocol then 'https' else 'http') + '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js', ->
				App._WebFontLoaded = yes
				return if not App._googleFontTmp.length
				App.WebFontConfig.google.families = App._googleFontTmp
				App.WebFont.load App.WebFontConfig
		else
			# if script finish loading
			if App._WebFontLoaded
				App.WebFontConfig.google.families = Utils.mergeArray App.WebFontConfig.google.families, App._googleFont
				App.WebFont.load App.WebFontConfig
			else
				App._googleFontTmp = Utils.mergeArray App._googleFontTmp, App._googleFont
			
			
##############################################################
# METHODS

Fonts.getInstalled = ->
	return App._fonts

##############################################################
# PRIVATE METHODS

Fonts._updateFonts = (fonts) ->
	parseGoogleFontObject = (googleObj) ->
		if not googleObj.name
			return ''
		else
			googleObj._name = googleObj.name.split(' ').join('+')
		googleObj.weight = '400' if not googleObj.weight
		googleObj.sets = 'latin' if not googleObj.sets
		googleObj._name + ':' + googleObj.weight + ':' + googleObj.sets

	return if not fonts
		
	fontDetector 	= new Fonts._fontDetector
	fonts 			= [ fonts ] if Utils.isString(fonts)
	
	if Utils.isObject(fonts) and fonts.name
		fontName 			= fonts.name.replace(/\s+/g, '')
		App._fonts[fontName] 	= fonts.name
		App._fontsCollection.push fonts

		if not fontDetector.detect(fonts.name)
			App._googleFont.push parseGoogleFontObject(fonts)

	else if Utils.isArray(fonts) or Utils.isObject(fonts)
		i = 0
		while i < fonts.length
			if typeof fonts[i] is 'string'
				fontName = fonts[i].replace(/\s+/g, '')
				font = name: fonts[i]
				App._fonts[fontName] = fonts[i]
				App._fontsCollection.push font
				if not fontDetector.detect(fonts[i])
					App._googleFont.push parseGoogleFontObject(font)
			if Utils.isObject(fonts[i]) and fonts[i].name
				fontName 			= fonts[i].name.replace(/\s+/g, '')
				font 				= fonts[i]
				App._fonts[fontName] 	= fonts[i].name
				App._fontsCollection.push font
				if not fontDetector.detect(fonts[i].name)
					App._googleFont.push parseGoogleFontObject(fonts[i])
			i++

Fonts._fontDetector = ->
	baseFonts 		= [
		'monospace'
		'sans-serif'
		'serif'
	]
	testString 		= 'mmmmmmmmmmlli'
	testSize 		= '72px'
	h 				= document.getElementsByTagName('body')[0]
	s 				= document.createElement('span')

	detect 			= (font) ->
		detected = false
		for index of baseFonts
			s.style.fontFamily = font + ',' + baseFonts[index]
			# name of the font along with the base font for fallback.
			h.appendChild s
			matched = s.offsetWidth isnt defaultWidth[baseFonts[index]] or s.offsetHeight isnt defaultHeight[baseFonts[index]]
			h.removeChild s
			detected = detected or matched
		detected

	s.style.fontSize 	= testSize
	s.innerHTML 		= testString
	defaultWidth 		= {}
	defaultHeight 		= {}
	for index of baseFonts
		s.style.fontFamily = baseFonts[index]
		h.appendChild s
		defaultWidth[baseFonts[index]] = s.offsetWidth
		defaultHeight[baseFonts[index]] = s.offsetHeight
		h.removeChild s
	@detect = detect
	return
