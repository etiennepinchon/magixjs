EventKey = "_events"

class EventEmitter extends EE3

	listenerEvents: ->
		return [] if @[EventKey] is undefined
		return Utils.keys(@[EventKey])

	removeAllListeners: (eventName) ->

		# We override this method to make the eventName optional. If none
		# is given we remove all listeners for all event names.

		if eventName
			eventNames = [eventName]
		else
			eventNames = @listenerEvents()

		for eventName in eventNames
			for listener in @listeners(eventName)
				@removeListener(eventName, listener)
