# *********************************
# *********************************
# Text.js
# *********************************
# ** By Etienne Pinchon
# ** ©2016

class Text extends View
	constructor: (options={}) ->
		if options.header
			@_kind = 'TextHeader'
			@_elementType = 'h1'
		else if options.paragraph
			_kind = 'TextParagraph'
			_elementType = 'p'
		super

	_kind 		: 'Text'
	_assigned 	: {}
	_text 		: ''

	##############################################################
	# PROPERTIES

	# *********************************
	# text property
	#
	# ** Change text content of the Text

	@define 'text',
		configurable: true
		get: ->
			@_text
		set: (value) ->
			# Remove any children
			for item in @children
				item.parent = null
			@_assigned  = {}
			@_text 		= value
			@html = Utils.e(value)
			@emit 'change:text', value
			return

	# Alias of text
	@define 'value',
		configurable: true
		get: ->
			@text
		set: (value) ->
			@text = value
			@emit 'change:value', value
			return

	# *********************************

	# Alias that will create a header element instead of a simple text
	@define 'header',
		configurable: true
		get: ->
			@_header
		set: (value) ->
			return if not value
			@text = @_header = value
			@emit 'change:header', value
			return

	# *********************************

	# Alias that will create a paragraph element instead of a simple text
	@define 'paragraph',
		configurable: true
		get: ->
			@_paragraph
		set: (value) ->
			return if not value
			@text = @_paragraph = value
			@emit 'change:paragraph', value
			return

	# *********************************

	@define 'indent',
		get: ->
			@_element.style.textIndent
		set: (value) ->
			value = value + 'px' if typeof value is 'number'
			@_element.style.textIndent = value
			return
	@_alias 'textIndent', 'indent'

	@define 'decoration',
		get: -> @_element.style.textDecoration
		set: (value) -> @_element.style.textDecoration = value
	@_alias 'textDecoration', 'decoration'

	# *********************************
	# spacing property
	#
	# ** Change the letter spacing of the Text
	@define 'spacing',
		get: ->
			parseFloat @_element.style.letterSpacing, 10
		set: (value) ->
			value = value + 'px' if typeof value is 'number'
			@_element.style.letterSpacing = value
			return
	@_alias 'letterSpacing', 'spacing'

	# *********************************
	# wordSpacing property
	#
	# ** Change the word spacing of the Text
	@define 'wordSpacing',
		get: ->
			parseFloat @_element.style.wordSpacing, 10
		set: (value) ->
			value = value + 'px' if typeof value is 'number'
			@_element.style.wordSpacing = value
			return

	# *********************************
	# wrap property
	#
	# ** Allow long words to be able to break and wrap onto the next line:
	# BOOLEAN
	@define 'wrap',
		get: ->
			return true if @_element.style.wordWrap is 'break-word'
			false
		set: (value) ->
			if value is true
				@_element.style.wordWrap = 'break-word'
			else
				@_element.style.wordWrap = 'normal'
			return

	# *********************************
	# break property
	#
	# ** Break words between any two letters
	# http://www.w3schools.com/cssref/css3_pr_word-break.asp
	@define 'break',
		get: ->
			return false if @_break is undefined
			@_break
		set: (value) ->
			if value is true
				@_break is true
				@_element.style.wordBreak = 'break-all'
			else
				@_break is false
				@_element.style.wordBreak = 'normal'
			return

	# *********************************
	# whiteSpace property
	#
	# ** The white-space property specifies how white-space inside an element is handled.

	###
		normal	Sequences of whitespace will collapse into a single whitespace. Text will wrap when necessary. This is default.
		nowrap	Sequences of whitespace will collapse into a single whitespace. Text will never wrap to the next line. The text continues on the same line until a <br> tag is encountered
		pre	Whitespace is preserved by the browser. Text will only wrap on line breaks. Acts like the <pre> tag in HTML
		pre-line	Sequences of whitespace will collapse into a single whitespace. Text will wrap when necessary, and on line breaks
		pre-wrap	Whitespace is preserved by the browser. Text will wrap when necessary, and on line breaks
	###

	@define 'whiteSpace',
		get: -> @_element.style.whiteSpace
		set: (value) -> @_element.style.whiteSpace = value

	@define 'nowrap',
		get: ->
			return true if @_element.style.whiteSpace is 'nowrap'
			false
		set: (value) ->
			if value is true
				@_element.style.whiteSpace = 'nowrap'
			else
				@_element.style.whiteSpace = 'normal'
			return

	# *********************************
	# lineHeight property
	# *********************************
	# ** Change the value of the line height
	@define 'lineHeight',
		get: ->
			parseFloat(@_element.style.lineHeight)
		set: (value) ->
			value = value + 'px' if typeof value is 'number'
			@_element.style.lineHeight = value
			return

	@_def 'textShadowX', 0, -> @_updateTextShadow()
	@_def 'textShadowY', 0, -> @_updateTextShadow()
	@_def 'textShadowBlur', 0, -> @_updateTextShadow()
	@_def 'textShadowColor', '', -> @_updateTextShadow()

	##############################################################
	## TEXT PROPERTIES

	uppercase : -> @_element.style.textTransform = 'uppercase'
	lowercase : -> @_element.style.textTransform = 'lowercase'
	underline : -> @_element.style.textDecoration = 'underline'

	# We don't use the css property to capitalize because 
	# it capitalize every words not just the first letter.
	capitalize : ->
		if @_text isnt undefined
			@_text.charAt(0).toUpperCase() + @_text.slice(1)
			@html = @_text
		return

	centerText : ->
		@align 		= 'center'
		@lineHeight = @parent.height if @parent
			
	assignLink : (keyword, url, options) ->
		if keyword and keyword.length > 0
			@_assigned[keyword] = 
				url : url
				options : options
			@_assignProcessor()

	assign : (keyword, options) ->
		if keyword and keyword.length > 0
			@_assigned[keyword] = 
				options : options
			@_assignProcessor()
		return

	_assignProcessor : ->

		assigned_length = Utils.keys(@_assigned).length
		regexs 			= ''
		i 				= 0
		that 			= this

		for key of @_assigned
			if @_assigned[key].url
				@_assigned[key].assign = new Link
					color: 'inherit'
					display: 'inline'
					href: @_assigned[key].url
			else
				@_assigned[key].assign = new Text
					color: 'inherit'
					display: 'inline'
			for p of @_assigned[key].options
				@_assigned[key].assign[p] = @_assigned[key].options[p]
			regexs += key
			if i < assigned_length-1
				regexs += '|'
			i++
		pattern = new RegExp "("+regexs+")", 'g'
		@html 	= @_text.replace pattern, (match) ->
			type = that._assigned[match].assign._elementType
			split_pattern = new RegExp "(<\/?"+type+">)", 'i'
			that._assigned[match].assign._element.outerHTML.split(split_pattern)[0] + match + "</#{type}>"

	_updateTextShadow : -> @_element.style.textShadow = @textShadowX + 'px ' + @textShadowY + 'px ' + @textShadowBlur + 'px ' + @textShadowColor
		