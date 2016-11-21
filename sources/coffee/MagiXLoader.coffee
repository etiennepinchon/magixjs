# MAGIX LOADER JS

if not MagiX
	console.log 'MagiX | Beyond magical. @etiennepinchon'

__MAGIX_LOADED = no

MagiX =
	version: '1.0'
	creator: 'Etienne Pinchon (@etiennepinchon)'
	about: 'Beyond magical.'
	copyright: 'magixjs.com'

	boot: ->
		MagiX.__domComplete = []
		MagiX.__domReady = no

		if document?
			document.onreadystatechange = (event) ->
				if document.readyState is 'interactive'
					MagiX.__domReady = yes
					while MagiX.__domComplete.length
						f = MagiX.__domComplete.shift()()

	_onComplete : (f) ->
		if MagiX.__domReady then return f()
		MagiX.__domComplete.push(f)

	load: (first, second)->
		# If the loader if called again (why I don't know..), we skip to the callback
		if __MAGIX_LOADED
			if Utils.isFunction(first)
				first()
			else if Utils.isFunction(second)
				second()

		# Load files passed as arguments on bootup.
		do_next = ->
			# Place file to load inside array
			if Utils.isString(first) then first = [first] 
				
			# Fire call back if no other file to load
			if Utils.isFunction(first)
				__MAGIX_LOADED = yes
				first()
			# Load scripts
			else if Utils.isArray(first)
				Import first, ->
					__MAGIX_LOADED = yes
					second() if Utils.isFunction(second)
					return
			return
		
		MagiX._onComplete ->
			url = '//s3.amazonaws.com/data.magixjs.com/framework/1.0/magix.min.js?b=' + __MAGIX_JS_BUILD_DATE__ # //magixjs.com/framework/1.0/magix.min.js

			# Create script
			script = document.createElement "script"
			script.type = "text/javascript"
			script.src = url
			script.onreadystatechange = do_next
			script.onload = do_next
			document.body.appendChild(script)
				
# Boot MagiX right away.
MagiX.boot()
