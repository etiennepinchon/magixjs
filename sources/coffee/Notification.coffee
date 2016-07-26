# *********************************
# *********************************
# Notification
# *********************************
# ** By Etienne Pinchon
# ** ©2016
# See more: https://developer.mozilla.org/en/docs/Web/API/notification

###
Examples:

myNotification = new Notification
	title: "My notification name"
	body: "What it is all about.."

myNotification.onGranted ->
	console.log 'granted!'

myNotification.onShow ->
	console.log 'showed!'

myNotification.onClose ->
	console.log 'closed!'

###

if window.Notification
  window._Notification = window.Notification

class Notification extends Element
	constructor: (properties) ->

		_this = @

		displayNotification = ->
			@_notification = new (window._Notification)(properties.title, options)
	  
			# It is triggered when notification is closed
			@_notification.addEventListener 'close', ->
				if properties.close
					properties.close()
				_this.emit Event.Close
				return

			# It is triggered each time the notification is shown.
			@_notification.addEventListener 'show', ->
				if properties.show
					properties.show()
				_this.emit Event.Show
				return

			# It is triggered each time the user clicks on the notification.
			@_notification.addEventListener 'click', ->
				if properties.click
					properties.click()
				_this.emit Event.Click
				return

			# It is triggered each time the user clicks on the notification.
			@_notification.addEventListener 'error', ->
				if properties.error
					properties.error()
				_this.emit Event.Error
				return
			return
	

		if not properties
			properties = {}
		
		# Test support
		if not window._Notification
			@emit Event.Unsupported

			#log("Location: Location is not supported by this browser.");
			if properties.unsupported
				properties.unsupported()
			return false


		if properties.title
			properties.title = ''
		
		# Options
		options = {}
		
		if properties.text
			properties.body = properties.text
		
		if properties.body
			options.body = properties.body
		
		if properties.icon
			options.icon = Utils.parseAsset(properties.icon)
		
		# Chrome only:
		# ex: vibrate: [200, 100, 200]
		# https://developer.mozilla.org/en-US/docs/Web/API/Notification/vibrate
		if properties.vibrate isnt undefined
			options.vibrate = properties.vibrate
		
		# ex: silent: true
		# https://developer.mozilla.org/en-US/docs/Web/API/Notification/silent
		if properties.silent isnt undefined
			options.silent = properties.silent
		
		# Let's check whether notification permissions have already been granted
		if window._Notification.permission is 'granted'

			# If it's okay let's create a notification
			displayNotification()
		
		else if window._Notification.permission isnt 'denied'
			window._Notification.requestPermission (permission) ->
			
				# If the user accepts, let's create a notification
				if permission is 'granted'
					_this.emit Event.Granted, permission
					displayNotification()
				else
					_this.emit Event.Denied, permission
			
			return
		else
			# Quick alias
			if properties.denied
				properties.denied()
			
			_this.emit Event.Denied
			
		
		true

	_kind : 'Notification'

	onUnsupported : (cb) -> @on Event.Unsupported, cb
	onGranted : (cb) -> @on Event.Granted, cb
	onDenied : (cb) -> @on Event.Denied, cb
	onError : (cb) -> @on Event.Error, cb
	onClick : (cb) -> @on Event.onClick, cb
	onShow : (cb) -> @on Event.Show, cb
	onClose : (cb) -> @on Event.Close, cb


# *********************************
# close method
# *********************************
# Programmatically closes a notification.

Notification::close = (parameters) ->
	if @_notification
		@_notification.close()
	return

# *********************************
# requestPermission method
# *********************************
# Ask the user for permission to display notifications

Notification.requestPermission = (parameters) ->
	if properties is undefined
		properties = {}
	
	window._Notification.requestPermission (permission) ->
		# If the user accepts, let's create a notification
		if permission is 'granted'
			if parameters.granted
				parameters.granted permission
			@emit Event.Granted, permission
		else
			if parameters.denied
				parameters.denied permission

			@emit Event.Denied, permission

			return
		return

# *********************************
# isGranted method
# *********************************
# BOOL Check whether or not the user has granded the notification
# Ex: log(Notification.isGranted());

Notification.isGranted = ->
	if window._Notification.permission is 'granted'
		return true
	false

