
# Routes

App.Before = NULL
App._routes = {}

class Routes extends Element

	_kind : 'Routes'

	constructor: (routes) ->
		if not Utils.isObject(routes)
			throw new Error('Routes: routes must be in an object.')
			return
		App._routes = routes
		Routes.routing()
		return

	######################################################
	# METHODS

	getAll: -> App._routes
	@add: (route, page)->
		if page._kind and page._kind is 'Page'
			App._routes[route] = page
			Routes.routing()
	@remove: (route)->
		delete App._routes[route] if App._routes[route]
	@routing : ->
		path = App.pathname()

		fireRoute = (name) ->

			if App.Before and typeof App.Before is 'function'
				stop = App.Before()
				return if stop is false
			routeFound 		= true
			if Utils.isFunction(App._routes[name])
				routeReturned 	= App._routes[name]()
			else
				routeReturned 	= App._routes[name]
			App.page 		= routeReturned if routeReturned and routeReturned._kind is 'Page'
			return

		if Utils.isFileUrl(App.location.href)
			err = 'Error: Project opened as a local file. Please set index.html as root / using a virtual server to use Routes.' 
			alert(err)
			throw Error(err)
			return

		pageURL 	= path[0]
		routeFound 	= false

		for routeName of App._routes
			if Utils.startsWith(routeName, '/')
				pageURL = '/' + path[0]
			if Utils.startsWith(routeName, 'match:')
				routeName = routeName.replace('match:', '')
				try
					regex 	= new RegExp(routeName)
					test 	= regex.test(pageURL)
					
					if not test
						test = regex.test('/' + path.join('/'))
					if test
						fireRoute 'match:' + routeName
						return
				catch e
					console.log 'App: Invalid regex, ' + routeName

			else if routeName is pageURL or (pageURL is '' and (routeName is 'main' or routeName is 'index' or routeName is 'Main'))
				fireRoute routeName
				return

		# 404
		if not routeFound
			error_page = ['default', '404', 'Default', 'defaults', 'Defaults']
			for err in error_page
				if App._routes.hasOwnProperty(err) then fireRoute err
		return
