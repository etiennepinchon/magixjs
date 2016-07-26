# *********************************
# Preload

# Ex : 	Preload 'url', ->
#		Preload [ 'url', ... ], ->

Preload = (urls, callback) ->
	if not urls
		return

	if Utils.isString(urls)
		urls = [ urls ]

	paths = []

	for path in urls
		paths.push
			image: path
			loaded: false

	loaded = 0
	i = 0

	for path in paths
		if not path.loaded
			path.loaded = true
			
			img = new Image(source: path.image)
			
			# When the image as been loaded
			img.on Event.Load, (event, view) ->
				loaded++
				progress = 100 * loaded / paths.length
				
				App.emit Event.PreloadProgress,
					images: paths
					current: view.image
					progress: progress
				
				# When all the images are loaded
				if loaded is paths.length
					App.emit Event.PreloadEnd
				
					if callback
						callback()
				
				return
	return