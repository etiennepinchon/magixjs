# *********************************
# *********************************
# Location
# *********************************
# ** By Etienne Pinchon
# ** ©2016
# See more: http://www.w3schools.com/html/html5_geolocation.asp

class Location extends Element
	constructor: (properties) ->

		if not properties
			properties = {}
		
		# Test support
		if not navigator.geolocation
			@emit Event.Unsupported

			#log("Location: Location is not supported by this browser.");
			if properties.unsupported
				properties.unsupported()
			return false
		
		if properties.current
			properties.success = properties.current
			@current properties
		
		if properties.watch
			properties.success = properties.watch
			@watch properties
		
		return true

	_kind : 'Location'

	onUnsupported : (cb) -> @on Event.Unsupported, cb
	onSuccess : (cb) -> @on Event.Success, cb
	onError : (cb) -> @on Event.Error, cb
	onClear : (cb) -> @on Event.Clear, cb


##############################################################
# METHODS

# *********************************
# current method
# *********************************
# Used to get the current position of the device.

###
	Property	Returns
	coords.latitude	The latitude as a decimal number
	coords.longitude	The longitude as a decimal number
	coords.accuracy	The accuracy of position
	coords.altitude	The altitude in meters above the mean sea level
	coords.altitudeAccuracy	The altitude accuracy of position
	coords.heading	The heading as degrees clockwise from North
	coords.speed	The speed in meters per second
	timestamp	The date/time of the response
###

Location::current = (parameters) ->

	if Utils.isBoolean(parameters)
		accurate = parameters
		parameters = {}

	if not parameters
		parameters = {}

	if parameters.accurate is undefined
		parameters.accurate = false
	if accurate
		parameters.accurate = accurate

	_this = @

	navigator.geolocation.getCurrentPosition (position) ->
		
		# Inject timestamp in coords
		position.coords.timestamp = position.timestamp
		_this.emit Event.Success, position.coords
		
		if parameters.success
			
			parameters.success position.coords
		return
	, (error) ->
		_this.emit Event.Error, error
		if parameters.error
			parameters.error error
		return
	, enableHighAccuracy: parameters.accurate
  
	

# *********************************
# watch method
# *********************************

###
	watchPosition() - Returns the current position of the user and continues to return updated position as the user moves (like the GPS in a car).
	clearWatch() - Stops the watchPosition() method.

	The example below shows the watchPosition() method. You need an accurate GPS device to test this (like iPhone):
###

Location::watch = (parameters) ->

	if Utils.isBoolean(parameters)
		accurate = parameters
		parameters = {}

	if not parameters
		parameters = {}

	if parameters.accurate is undefined
		parameters.accurate = false
	if accurate
		parameters.accurate = accurate

	_this = @

	@watch = navigator.geolocation.watchPosition (position) ->
		
		# Inject timestamp in coords
		position.coords.timestamp = position.timestamp

		_this.emit Event.Success, position.coords

		if parameters.success
			parameters.success position.coords
		return
	, (error) ->
		_this.emit Event.Error, error
		if parameters.error
			parameters.error error
		return
	, enableHighAccuracy: parameters.accurate
  
	return

# *********************************
# clear method
# *********************************
# Stops the watch method.

Location::clear = ->
	if @watch
		@emit Event.Clear
		navigator.geolocation.clearWatch @watch
	return

# EXAMPLES

###
var geo = new Location();
if (geo) {
	geo.current({
		success: function() {

		},
		error: function: {

		}
	});

	geo.watch({
		success: function() {
			geo.clear();
		},
		error: function: {

		},
		accurate: true
	});
};
###

###
var geo = new Location({
	unsupported: function() {

	},
	watch: function(position) {

	},
	current: function(position) {

	},
	error: function(error) {

	}
});


loc = new Location()
loc.current()

loc.onSuccess (e) ->
	console.log e
loc.onError (e) ->
	console.log e


loc = new Location()

# bool for accuracy
loc.watch true

loc.onSuccess (e) ->
	console.log e
loc.onError (e) ->
	console.log e

loc = new Location
	current: (e)->
		console.log e

###
