# *********************************
# Import

# Ex : 	Import 'url', ->
#		Import [ 'url', ... ], ->

Import = (paths, cb) ->
	return if not paths
	paths = [paths] if Utils.isString(paths)
	toImport = []

	# Parse paths
	for path in paths

		# No ending with .js
		if path.indexOf('.js') is -1
			path = '/build/' + path + '.js'

			if App.USE_PROJECT_PATH
				urlPathname = App.location.pathname.split('/')
				urlPathname.shift()
				urlPathname.shift()
				path = '/p/' + urlPathname[0] + path

		if App.__IS_DIRECT_PATH and Utils.startsWith(path, '/build/')
			path = '/' + window.__ID + path

		if App.__IS_PREVIEW
			path += '?b=' + (new Date().getTime())
		else if App.__BUILD
			path += '?b=' + App.__BUILD

		toImport.push path

	if App.USE_PROJECT_PATH
		$LAB.setGlobalDefaults
			CacheBust: yes

	$LAB
		.setGlobalDefaults 
			'ErrorHandler': (e) ->
				console.error e.stack
				return
		.script(toImport).wait ->
			App.emit Event.ImportEnd
			cb() if cb


