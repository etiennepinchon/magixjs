# Name
Location

# Description
Location is class which determines the location and other related information of a users device.


##############################################################
## Overview
Overview

### Description
Location allows you to determine the location of a user's device. This is done by using the "current" method.

### Example
myLocation = new Location
	unsupported: ->
		log 'Browser not supported'
	current: (position) ->
		log 'Location determined'
	error: (error) ->
		log 'Error determining location'
### End Example

### About Example
The position argument returned in the callback when location is successfully determined also contains other information such as heading and speed.

### Example
myLocation = new Location

myLocation.current
	accurate: yes, # enable high accuracy
	success: (position) ->

		# The latitude as a decimal number
		log position.coords.latitude

		# The longitude as a decimal number
		log position.coords.longitude

		# The accuracy of the position
		log position.coords.accuracy

		# The altitude in meters above mean sea level
		log position.coords.altitude

		# The altitude accuracy of the position
		log position.coords.altitudeAccuracy

		# The heading in degrees clockwise from North
		log position.coords.heading

		# The speed in meters per second
		log position.coords.speed

		# The time and date of the response
		log position.timestamp
	error: (error) ->
		log error
### End Example


##############################################################
## Property
accurate

### Type
<boolean>

### Description
Set the accuracy of the location determined.

### Example
myLocation = new Location
	accurate: yes
### End Example


##############################################################
## Method
current()

### Description
Returns the current location of the device.

### Example
myLocation = new Location

myLocation.current
	accurate: yes, # enable high accuracy
	success: (position) ->
		log position
	error: (error) ->
		log error
### End Example


##############################################################
## Method
watch()

### Description
Returns the current location of the device and continues to return an updated location as the user moves. This is particularly useful for a GPS app. This requires a GPS device like a smartphone to work.

### Example
myLocation = new Location

myLocation.watch
	accurate: yes, # enable high accuracy
	success: (position) ->
		log position
	error: (error) ->
		log error
### End Example


##############################################################
## Method
clear()

### Description
Stops the watch method.

### Example
myLocation = new Location

myLocation.watch
	accurate: yes, # enable high accuracy
	success: (position) ->
		log position
	error: (error) ->
		log error

myLocation.clear()
### End Example


##############################################################
## Method
onUnsupported()

### Description
Triggered when Location is not supported by the browser.

### Example
myLocation.onUnsupported ->
	log 'Woops!'
### End Example


##############################################################
## Method
onSuccess()

### Description
Called when the location is returned.

### Example
myLocation = new Location

accurate = true
myLocation.current(accurate)

net.onSuccess (position) ->
	# Got the location
### End Example


##############################################################
## Method
onError()

### Description
Called when location failed to be detected.

### Example
myLocation = new Location

accurate = true
myLocation.watch(accurate)

net.onError (error) ->
	# Nope..
### End Example








