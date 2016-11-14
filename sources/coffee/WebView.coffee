
# WebView

class WebView extends View
	constructor: (properties) ->
		super
		@_sandbox = {}
		@content = @_element.contentWindow
		@document = @_element.contentDocument

	_kind : 'WebView'
	_elementType : 'iframe'

	reload : -> @_element.contentWindow.location.reload()

	@define 'url',
		get: ->
			@_url = '' if @_url is NULL
			@_url
		set: (value) ->
			@_url = value
			@_element.setAttribute 'src', value
			return

	@define 'src',
		get: -> return @url
		set: (value) ->
			@url = value
			return

	@_def_enabled = (name) ->
		@define name,
			get: ->
				return true if @["_#{name}"] is undefined	
				@["_#{name}"]
			set: (value) ->
				value = false if value isnt true
				@["_#{name}"] = value
				@['_' + name.replace('Enabled', '')] = value
				@_updateSandbox()

	@_def_enabled 'scriptsEnabled'
	@_def_enabled 'formsEnabled'
	@_def_enabled 'popupsEnabled'
	@_def_enabled 'pointerLockEnabled'
	@_def_enabled 'sameOriginEnabled'
	@_def_enabled 'navigationEnabled'

	##############################################################
	# EVENTS
	
	onLoad : (cb) -> @on Event.Load, cb
	onLoaded : (cb) -> @on Event.Loaded, cb
	onDone : (cb) -> @on Event.Loaded, cb

	##############################################################
	# PRIVATE

	_updateSandbox : ->
		sandbox = 
			forms: 'allow-forms'
			pointerLock: 'allow-pointer-lock'
			popups: 'allow-popups'
			sameOrigin: 'allow-same-origin'
			scripts: 'allow-scripts'
			navigation: 'allow-top-navigation'

		output = ''
		for key of @_sandbox
			if sandbox[key] isnt NULL and @_sandbox[key] is false
				delete sandbox[key]
		for key of sandbox
			output += sandbox[key] + ' '
		@_element.setAttribute 'sandbox', output
		return
