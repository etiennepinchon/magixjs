
# AnimationLoop

getTime = -> Utils.getTime() * 1000

# Make the time ticks a "fixed" 1/60 of a second.

class AnimationLoop extends EventEmitter

	constructor: ->

		# For now we set the delta to a fixed time because using performance.now plus
		# raf seems to cause weird issues.
		@delta = 1/60
		@raf = true

		# Workaraound for RAF bug on 10.10
		# https://bugs.webkit.org/show_bug.cgi?id=137599

		if Utils.webkitVersion() > 600 and Utils.webkitVersion() < 601
			if Utils.isDesktop()
				@raf = false

		# To avoid event emitter warning
		@maximumListeners = Infinity

	start: =>
		
		animationLoop = @
		_timestamp = getTime()

		update = ->
			
			if animationLoop.delta
				delta = animationLoop.delta
			else
				timestamp = getTime()
				delta = (timestamp - _timestamp) / 1000
				_timestamp = timestamp

			animationLoop.emit("update", delta)
			animationLoop.emit("render", delta)

		tick = (timestamp) ->

			if animationLoop.raf
				update()
				window.requestAnimationFrame(tick)
			else
				window.setTimeout ->
					update()
					window.requestAnimationFrame(tick)
				, 0

		tick()

#-----------

AnimatorClasses = 
	'linear': LinearAnimator
	'bezier-curve': BezierCurveAnimator
	'spring-rk4': SpringRK4Animator
	'spring': SpringRK4Animator
	'spring-dho': SpringDHOAnimator

AnimatorClassBezierPresets = [
	'ease'
	'ease-in'
	'ease-out'
	'ease-in-out'
]