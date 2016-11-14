
# Preload

Preload = (urls, callback) ->
	return if not urls
		
	urls 	= [urls] if Utils.isString(urls)
	paths 	= []
	loaded 	= 0
	i 		= 0

	for path in urls
		paths.push
			image  : path
			loaded : no
	for path in paths
		if not path.loaded
			path.loaded = yes
			img 		= new Image 
				source: path.image
				display: no
			img.parent = null
			img.on Event.Load, (event, view) ->
				loaded++
				progress = 100 * loaded / paths.length
				App.emit Event.PreloadProgress,
					images: paths
					current: view.image
					progress: progress
				if loaded is paths.length
					App.emit Event.PreloadEnd
					if callback then callback()
				return
	return