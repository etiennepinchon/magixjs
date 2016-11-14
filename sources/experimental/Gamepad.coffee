# Gamepad

Event.GamepadConnected 		= 'gamepadconnected'
Event.GamepadDisconnected 	= 'gamepaddisconnected'

# List connected gamepads
Gamepads = {}
_gamepadevents = no

class Gamepad extends Element

	_kind 		: 'Gamepad'

	constructor	: ->
		super
		
		return if _gamepadevents
		_gamepadevents = yes

		gamepadHandler = (e, connecting) ->
			if connecting
				Gamepads[e.gamepad.index] = e.gamepad
			else
				delete Gamepads[e.gamepad.index]
			return

		window.addEventListener Event.GamepadConnected, ((e) ->
			gamepadHandler e, yes
			that.emit Event.GamepadConnected, e
			return
		), no
		window.addEventListener Event.GamepadDisconnected, ((e) ->
			gamepadHandler e, no
			that.emit Event.GamepadDisconnected, e
			return
		), no

	@isAvailable ->
		return yes if "getGamepads" in navigator
		return no

	@onGamepadConnected : (cb) ->
		@on Event.GamepadConnected, cb
		return
	@onGamepadDisconnected : (cb) -> 
		@on Event.GamepadDisconnected, cb
		return

# console.log("Controller n°%d connected : %s. %d buttons, %d axes.",
#  e.gamepad.index, e.gamepad.id,
#  e.gamepad.buttons.length, e.gamepad.axes.length);