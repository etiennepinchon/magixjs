# DOMEventManagerElement
# Collect and manage events within an element
class DOMEventManagerElement extends EventEmitter

	constructor: (@element) ->

	# Add event to manager
	addListener: (eventName, listener, capture=false) ->
		super(eventName, listener)

		@element.addEventListener(eventName, listener, false)

	# Remove event from manager
	removeListener: (eventName, listener) ->
		super(eventName, listener)
		@element.removeEventListener(eventName, listener, false)

	# Keep the DOM API working
	addEventListener: @::addListener
	removeEventListener: @::removeListener

# *********************************

EventManagerIdCounter = 0

# DOMEventManager
# Collect and manage element events
class DOMEventManager

	constructor: (element) ->
		@_elements = {}

	# Add an element in the event manager
	wrap: (element) =>

		# If the element to wrap doesn't have an ID yet
		# Increment the manager ID and give it the ID
		if not element._eventManagerId
			element._eventManagerId = EventManagerIdCounter++

		# If the element is not yet in the manager array, we add it within a manager for the element itself
		if not @_elements[element._eventManagerId]
			@_elements[element._eventManagerId] = new DOMEventManagerElement(element)

		# Return the element that has been wrap
		@_elements[element._eventManagerId]

	# Reset the event manager by removing all the listeners
	reset: ->
		for element, elementEventManager of @_elements
			elementEventManager.removeAllListeners()
