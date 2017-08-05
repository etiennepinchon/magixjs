# Name
Notification

# Description
Notification is used to show a user a browser notification. Notifications are show by the browser so a user can still get a notification when they have changed tabs.



##############################################################
## Overview
Overview

### Description
A Notification is an object made up of multiple properties which can be used to set the content of the notification. It is also possible to set its behaviour when the browser does not support notifications or the notification is closed.

### Example
myNotification = new Notification
	title: 'Notification name'
	body: 'What notification is about'
### End Example

### About Example
Permission is required from the user to show notifications. It is also possible to check whether permission has been granted.

### Example
Notification.requestPermission()

# User grants permission

if Notification.isGranted()
	# Show notification if permission has been granted.
	myNotification = new Notification
		title: 'Notification name'
		body: 'What notification is about'
### End Example


##############################################################
## Method
close()

### Description
Close the notification.

### Example
myNotification = new Notification
	title: 'Notification name'
	body: 'What notification is about'
myNotification.close()
### End Example


##############################################################
## Method
requestPermission()

### Description
Ask the user for permission to display notifications.

### Example
Notification.requestPermission()
### End Example


##############################################################
## Method
isGranted()

### Description
Returns a whether permission to display notification has been granted. If granted, the value will be yes.

### Example
log Notification.isGranted()
### End Example


##############################################################
## Method
onClick()

### Description
Triggered when the notification is clicked by the user.

### Example
myNotification = new Notification
	title: 'Notification name'
	body: 'What notification is about'

myNotification.onClick ->
	log 'Notification clicked'
### End Example


##############################################################
## Method
onError()

### Description
Triggered when there was an error displaying the notification.

### Example
myNotification = new Notification
	title: 'Notification name'
	body: 'What notification is about'

myNotification.onError ->
	log 'Error displaying the notification'
### End Example


##############################################################
## Method
onClose()

### Description
Triggered when the notification is closed.

### Example
myNotification = new Notification
	title: 'Notification name'
	body: 'What notification is about'

myNotification.onClose ->
	log 'Notification closed'
### End Example


##############################################################
## Method
onShow()

### Description
Triggered when the notification is displayed.

### Example
myNotification = new Notification
	title: 'Notification name'
	body: 'What notification is about'

myNotification.onShow ->
	log 'Notification displayed'
### End Example


##############################################################
## Method
onUnsupported()

### Description
Triggered when Notification is not supported by the browser.

### Example
myNotification = new Notification
	title: 'Notification name'
	body: 'What notification is about'

myNotification.onUnsupported ->
	log 'Woops!'
### End Example


##############################################################
## Method
onGranted()

### Description
Triggered when Notification is allowed to be displayed.

### Example
myNotification = new Notification
	title: 'Notification name'
	body: 'What notification is about'

myNotification.onGranted ->
	log 'YAH! Granted!'
### End Example


##############################################################
## Method
onDenied()

### Description
Triggered when Notification is not allowed to be displayed.

### Example
myNotification = new Notification
	title: 'Notification name'
	body: 'What notification is about'

myNotification.onDenied ->
	log 'Nope..'
### End Example

