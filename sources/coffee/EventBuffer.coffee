
Event.EventBufferReset   = "eventbufferreset"
Event.EventBufferUpdated = "eventbufferupdated"

# TODO: Replace Date.now() with Utils.getTime()

class EventBuffer extends Element

	constructor: (options = {}) ->
		@options = Utils.defaults options,
			velocityTimeout: 100
		@_events = []

	push: (event) ->
		@_events.push event
		@emit Event.EventBufferUpdated, event

	reset: ->
		@_events.length = 0
		@emit Event.EventBufferReset

	@define "length",
		get: -> @_events.length

	@define "first",
		get: -> @_events[0]

	@define "offset",
		get: ->
			return {x:0, y:0} if events.length < 2
			current = events[events.length - 1]
			first   = events[0]
			offset =
				x: current.x - first.x
				y: current.y - first.y

	@define "events",
		get: ->
			timeout = Date.now() - @options.velocityTimeout
			return @_events.filter (event) => event.t > timeout

	@define "angle",
		get: ->
			events = @events
			return 0 if events.length < 2
			p1 = events[0]
			p2 = events[1]
			return Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;

	@define "velocity",
		get: ->
			events = @events

			return {x:0, y:0} if events.length < 2

			current = events[events.length - 1]
			first   = events[0]
			time    = current.t - first.t

			velocity =
				x: (current.x - first.x) / time
				y: (current.y - first.y) / time

			velocity.x = 0 if velocity.x is Infinity
			velocity.y = 0 if velocity.y is Infinity

			velocity
