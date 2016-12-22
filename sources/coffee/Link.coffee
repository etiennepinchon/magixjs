
# Link

class Link extends Text
	
	_kind : 'Link'
	_elementType : 'a'

	constructor: (properties) ->
		super
		
		@on Event.Click, (event, view) ->
			
			# Stop if link was explicitely describe as external
			return if @external
				
			# Stop if the url is not defined or if not in auto mode
			if not view.url or not @auto
				event.preventDefault()
				return
			# Check if link is external to the website
			if not @_isExternal(view.url)
				App.go view.url, true
				event.preventDefault()

	##############################################################
	# PROPERTIES

	# *********************************
	# url property
	# *********************************
	# ** Add a url to the link
	@define 'url',
		get: -> @_element.getAttribute 'href'
		set: (value) ->
			@_element.setAttribute 'href', Utils.parseURL(value)
			return
	@define 'href',
		get: -> @url
		set: (value) ->
			@url = value
			return
	@define 'path',
		get: -> @url
		set: (value) ->
			@url = value
			return
	@define 'link',
		get: -> @url
		set: (value) ->
			@url = value
			return

	@define 'download',
		get: ->
			return no if @_download is NULL
			@_download
		set: (value) ->
			if value is yes
				@_download = yes
				@_element.setAttribute 'download', Utils.filenameFromURL @url
			else
				@_download = no
				@_element.removeAttribute 'download'
			return
	
	# *********************************
	# auto property
	# *********************************
	# ** Allow you to deactivate the click effect of the link
	# ** Example: control what's happening when clicking (animation before changing the url and page)
	@define 'auto',
		get: ->
			@_auto = true if @_auto is NULL
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
			@_external = false if not @_external
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
			@_blank = false if @_blank isnt NULL
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

	go: (event, view) ->

		# Stop if the url is not defined
		if not @url
			if event then event.preventDefault()
			return

		# Check if link is external to the website
		if not @_isExternal(@url)
			App.go @url, true
			if event then event.preventDefault()


	trigger: ->
		@element.click()

	##############################################################
	# PRIVATE

	# Test if URL is external or internal
	_isExternal : (url) ->
		domain = (url) ->
			url.replace('http://', '').replace('https://', '').split('/')[0]
		domainURL = domain(url)
		return false if domainURL is ''
		domain(location.href) isnt domainURL
