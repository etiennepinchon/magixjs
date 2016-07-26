# ORBE LOADER JS

__ORBE_LOADED = false

Orbe =
	version: '1.0'
	creator: 'Etienne Pinchon (@etiennepinchon)'
	copyright: 'Orbe.io'

	boot: ->
		Orbe.__domComplete = []
		Orbe.__domReady = false

		if document?
			document.onreadystatechange = (event) ->
				if document.readyState is 'interactive'
					Orbe.__domReady = true
					while Orbe.__domComplete.length
						f = Orbe.__domComplete.shift()()

	_onComplete : (f) ->
		if Orbe.__domReady
			return f()
		Orbe.__domComplete.push(f)

	load: (first, second)->
		# If the loader if called again (why I don't know..), we skip to the callback
		if __ORBE_LOADED
			if Utils.isFunction(first)
				first()
			else if Utils.isFunction(second)
				second()

		do_next = ->
			# Place file to load inside array
			first = [first] if Utils.isString(first)
				
			# Fire call back if no other file to load
			if Utils.isFunction(first)
				__ORBE_LOADED = true
				first()

			# Load scripts
			else if Utils.isArray(first)
				Import first, ->
					__ORBE_LOADED = true
					second() if Utils.isFunction(second)
					return
			return
		
		Orbe._onComplete ->
			url = '//data.orbe.io/framework/1.0/orbe.min.js?b='+__ORBE_JS_BUILD_DATE__

			# Create script
			script = document.createElement "script"
			script.type = "text/javascript"
			script.src = url
			script.onreadystatechange = do_next
			script.onload = do_next
			document.body.appendChild(script)
				
# Boot Orbe right away
Orbe.boot()

