
# Notification

window._Notification = window.Notification if window.Notification

class Notification extends Element

	_kind : 'Notification'

	constructor: (properties) ->

		properties 			= {} if not properties
		if not window._Notification
			if properties.unsupported then properties.unsupported()
			@emit Event.Unsupported
			return no

		that = @
		options 			= {}
		properties.title 	= '' if properties.title
		properties.body 	= properties.text if properties.text
		properties.body 	= properties.content if properties.content
		options.body 		= properties.body if properties.body
		options.icon 		= Utils.parseAsset(properties.icon) if properties.icon
		options.vibrate 	= properties.vibrate if properties.vibrate isnt NULL
		options.silent		= properties.silent if properties.silent isnt NULL
			
		if window._Notification.permission is 'granted'
			@_displayNotification()
		else if window._Notification.permission isnt 'denied'
			window._Notification.requestPermission (permission) ->
				if permission is 'granted'
					that.emit Event.Granted, permission
					@_displayNotification()
				else
					that.emit Event.Denied, permission
			return
		else
			if properties.denied then properties.denied()
			that.emit Event.Denied
		return yes

	close : (parameters) ->
		if @_notification
			@_notification.close()
		return

	requestPermission : (parameters) ->
		properties = {} if properties is NULL
		window._Notification.requestPermission (permission) ->
			if permission is 'granted'
				if parameters.granted then parameters.granted permission
				@emit Event.Granted, permission
			else
				if parameters.denied then parameters.denied permission
				@emit Event.Denied, permission
				return
			return

	isGranted : ->
		if window._Notification.permission is 'granted'
			return yes
		return no


	##############################################################
	# EVENTS

	onUnsupported : (cb) -> 
		@on Event.Unsupported, cb
		return
	onGranted : (cb) -> 
		@on Event.Granted, cb
		return
	onDenied : (cb) -> 
		@on Event.Denied, cb
		return
	onError : (cb) -> 
		@on Event.Error, cb
		return
	onClick : (cb) -> 
		@on Event.onClick, cb
		return
	onShow : (cb) -> 
		@on Event.Show, cb
		return
	onClose : (cb) -> 
		@on Event.Close, cb
		return


	##############################################################
	# PRIVATE

	_displayNotification : ->
		@_notification = new (window._Notification)(properties.title, options)
		@_notification.addEventListener 'close', ->
			if properties.close then properties.close()
			that.emit Event.Close
			return
		@_notification.addEventListener 'show', ->
			if properties.show then properties.show()
			that.emit Event.Show
			return
		@_notification.addEventListener 'click', ->
			if properties.click then properties.click()
			that.emit Event.Click
			return
		@_notification.addEventListener 'error', ->
			if properties.error then properties.error()
			that.emit Event.Error
			return
		return
