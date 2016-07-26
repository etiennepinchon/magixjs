# *********************************
# *********************************
# Link
# *********************************
# ** By Etienne Pinchon
# ** ©2016

class Link extends Text
	constructor: (properties) ->
		super
		
		# *********************************
		# Events
		# *********************************
		@on Event.Click, (event, view) ->
			
			# Stop if link was explicitely describe as external
			if @external
				return

			# Stop if the url is not defined or if not in auto mode
			if not view.url or not @auto
				event.preventDefault()
				return

			# Check if link is external to the website
			if not @_isExternal(view.url)
				App.go view.url, true
				event.preventDefault()


	_kind : 'Link'
	_elementType : 'a'

	##############################################################
	# Properties

	# *********************************
	# url property
	# *********************************
	# ** Add a url to the link
	@define 'url',
		get: ->
			@_element.getAttribute 'href'
		set: (value) ->
			@_element.setAttribute 'href', Utils.parseURL(value)
			return


	# Alias of url
	@define 'href',
		get: ->
			@url
		set: (value) ->
			@url = value
			return

	# Alias of url
	@define 'path',
		get: ->
			@url
		set: (value) ->
			@url = value
			return

	# Alias of url
	@define 'link',
		get: ->
			@url
		set: (value) ->
			@url = value
			return


	# *********************************
	# auto property
	# *********************************
	# ** Allow you to deactivate the click effect of the link
	# ** Example: control what's happening when clicking (animation before changing the url and page)
	@define 'auto',
		get: ->
			if @_auto is undefined
				@_auto = true
			@_auto
		set: (value) ->
			if value is true
				@_auto = true
			else
				@_auto = false
			return

	# *********************************
	# external property
	# *********************************
	# ** Force to use the default browser behavior that will buffer the new page
	# ** Not using the navigation ajax system
	@define 'external',
		get: ->
			if not @_external
				@_external = false
			@_external
		set: (value) ->
			if value is true
				@_external = true
			else
				@_external = false
			return

	# *********************************
	# blank property
	# *********************************
	# ** Change the way the link will be open
	# ** Open the link in a new tab
	@define 'blank',
		get: ->
			if @_blank isnt undefined
				@_blank = false
			@_blank
		set: (value) ->
			if value is true
				@_blank = true
				@external = true
				@_element.setAttribute 'target', '_blank'
			else
				@_blank = false
				@external = false
				@_element.setAttribute 'target', '_self'
			return


	# Alias of blank
	@define 'tab',
		get: ->
			@blank
		set: (value) ->
			@blank = value
			return


	# *********************************
	# go method
	# *********************************
	# ** Allow you to controls the url change

	go : (event, view) ->

		# Stop if the url is not defined
		if not @url
			if event
				event.preventDefault()
			return

		# Check if link is external to the website
		if not @_isExternal(@url)
			App.go @url, true
			if event
				event.preventDefault()


	# Test if URL is external or internal
	_isExternal : (url) ->
		domain = (url) ->
			url.replace('http://', '').replace('https://', '').split('/')[0]

		domainURL = domain(url)

		if domainURL is ''
			return false

		domain(location.href) isnt domainURL
