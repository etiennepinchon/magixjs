# HMD <==> Head Mounted Display .. LAME NAME..;

# FROM MY OCULUS:
# 0: HMDVRDevice
#	deviceId "0x100" 
#	deviceName "Oculus VR HMD (0.5.0) (HMD)"
#	hardwareUnitId "0x100" 
# PROTO:
#	getEyeParameters()
#	setFieldOfView()

# 1: PositionSensorVRDevice
#	deviceId "0x101" 
#	deviceName "Oculus VR HMD (0.5.0) (Sensor)"
#	hardwareUnitId "0x100" 
# PROTO:
#	getImmediateState()
#	getState()
#	resetSensor()


# @sensor.getState()
#	angularAcceleration : w, x, y, z
#	angularVelocity : w, x, y, z
#	hasOrientation : bool (true)
#	hasPosition : bool (false)
#	linearAcceleration : w, x, y, z
#	linearVelocity : w, x, y, z
# 	orientation :  w, x, y, z
#	position
#	timeStamp


## that.display.getEyeParameters('left')#.fieldOfView;
# upDegrees: The number of degrees upwards that the field of view extends in.
# rightDegrees: The number of degrees to the right that the field of view extends in.
# downDegrees: The number of degrees downwards that the field of view extends in.
# leftDegrees: The number of degrees to the left that the field of view extends in.


###
function setCustomFOV(up,right,down,left) {
  var testFOV = new VRFieldOfView(up,right,down,left);

  gHMD.setFieldOfView(testFOV,testFOV,0.01,10000.0);
}

# ALIAS ?
that.display.name = that.display.deviceName if that.display.deviceName
that.display.unitId = that.display.hardwareUnitId if that.display.hardwareUnitId
that.display.id = that.display.deviceId if that.display.deviceId

that.sensor.name = that.sensor.deviceName if that.sensor.deviceName
that.sensor.unitId = that.sensor.hardwareUnitId if that.sensor.hardwareUnitId
that.sensor.id = that.sensor.deviceId if that.sensor.deviceId
###

class VR extends Element

	devices : []
	sensor : null
	display : null

	_kind : 'VR'

	onUnsupported : (cb) -> @on Event.Unsupported, cb
	onDisplayConnected : (cb) -> @on Event.DisplayConnected, cb
	onDisplayDisconnected : (cb) -> @on Event.DisplayDisconnected, cb

	constructor : (options) ->
		if not options
			options = {}

		if not navigator.getVRDevices
			console.log 'VR: WebVR API not supported by this browser.'

			@emit Event.Unsupported
			if options.unsupported
				options.unsupported()
			return false
		
		##############################################################

		# EVENTS
		that = @
		Event.wrap(window).addEventListener 'onvrdisplayconnected', ->
			if properties.displayConnected
				properties.displayConnected()
			that.emit Event.DisplayConnected
			return
		Event.wrap(window).addEventListener 'onvrdisplaydisconnected', ->
			if properties.displayDisconnected
				properties.displayDisconnected()
			that.emit Event.DisplayDisconnected
			return

		return

	getDevices : (fn)->
		that = @
		navigator.getVRDevices().then (myDevices) ->
			that.devices = myDevices

			# Loop through the devices to find the VR display
			for device in that.devices
				if device instanceof HMDVRDevice
					that.display = device
					break

			if not that.display
				console.log 'VR: No display found.'
				fn() if fn
				return

			# Loop through the devices to find the VR sensor
			for device in that.devices
				if device instanceof PositionSensorVRDevice and device.hardwareUnitId is that.display.unitId
					that.sensor = device
					break

			fn() if fn
			return



