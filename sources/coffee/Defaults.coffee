
# Defaults

NULL = undefined

Originals =
	View:
		width: 200
		height: 200
		backgroundColor: 'rgba(123,123,123,0.5)'
		
	Page:
		#fixed: true
		x: 0
		y: 0
		width: '100%'
		height: '100%'
		backgroundColor: 'white'
					 
	Transition:
		properties: {}
		time: 0.3
		delay: 0
		view: null
		curve: 'ease'

	ViewDraggable:
		momentum: true
		momentumOptions:
			friction: 2.1
			tolerance: 1
		bounce: true
		bounceOptions:
			friction: 40
			tension: 200
			tolerance: 1
		directionLock: false
		directionLockThreshold:
			x: 10
			y: 10
		overdrag: true
		overdragScale: 0.5
		pixelAlign: true
		velocityTimeout: 100
		velocityScale: 890

	Animation:
		view: null
		delay: 0
		curve: 'ease'
		curveOptions: {}
		time: 0.3
		repeat: 0
		properties: {}

	FrictionSimulator:
		friction: 2
		tolerance: 1/10

	SpringSimulator:
		tension: 500
		friction: 10
		tolerance: 1/10000

	MomentumBounceSimulator:
		momentum:
			friction: 2
			tolerance: 10
		bounce:
			tension: 500
			friction: 10
			tolerance: 1

	Context:
		perspective: 0
		perspectiveOriginX: 0.5
		perspectiveOriginY: 0.5
		parent: null
		name: null
		
	Pview: 
		width: 300
	
	TextField:
		padding: 8
		width: 300
		fontSize: 16
		backgroundColor: 'rgba(123,123,123,0.5)'
		borderWidth: 0
		color: 'white'
		spacing: 0.6
		userInteraction: true

	TextView:
		padding: 8
		width: 300
		height: 64
		fontSize: 16
		scrollVertical: true
		backgroundColor: 'rgba(123,123,123,0.5)'
		borderWidth: 0
		color: 'white'
		spacing: 0.6
		resize: false
		userInteraction: true

	WebView:
		width: 400
		height: 300

	Slider:
		width: 200
		height: 200
		backgroundColor: 'rgba(123,123,123,0.5)'

	ProgressBar: {}

	Dropdown: 
		__width:
			w: 200
			width: 200

	List: {}

	ListItem: {}

	Image: {}

	Text:
		clip: no
		width: '100%'
		align: 'left'
		userInteraction: no
		display: 'table'

	Link:
		width: '100%'
		align: 'center'
		display: 'block'
		color: 'black'
		userInteraction: no

	FileField: 
		padding:
			x: 12
			y: 10

	Checkbox: Text:
		display: 'inline-block'
		cursor: 'pointer'
		margin: left: 3
		color: '#333'
		fontSize: 13

	RadioButton: Text:
		display: 'inline-block'
		cursor: 'pointer'
		marginLeft: 4
		color: '#333'
		fontSize: 13

	Button:
		display: 'block'
		padding:
			x: 20
			y: 8
		margin: 0
		fontSize: 14
		backgroundColor: 'rgba(123,123,123,0.5)'
		color: 'white'
		borderWidth: 0
		cursor: 'pointer'
		userInteraction: no
		borderBox: true

	Canvas: 
		width: 200
		height: 200
		backgroundColor: 'rgba(123,123,123,0.5)'

###	
	ScrollView: 
		width: 400
		height: 300
		mouseWheel: true
		
	Cards: 
		width: 400
		height: 300
		mouseWheel: false
###

Defaults =
	set: (className, options)->
		if App.defaults.hasOwnProperty(className)
			App.defaults[className] = Utils.extend(App.defaults[className], options)
		else
			App.defaults[className] = options
			
	# Return an array we the (default minus options) and the options
	getDefaults: (className, options) ->

		return options unless App.defaults.hasOwnProperty(className)

		# Always start with the originals
		defaults = Utils.clone App.defaults[className]

		# Remove the items that are redefined by the user
		for item of options
			if defaults.hasOwnProperty(item)
				delete defaults[item]

		[defaults, options]

	# Return the options over the default
	get: (className, options) ->

		return {} unless App.defaults.hasOwnProperty(className)

		# Always start with the originals
		defaults = Utils.clone App.defaults[className]

		# Copy over the user defined options
		for k, v of App.defaults[className]
			defaults[k] = if Utils.isFunction(v) then v() else v

		# Then copy over the default keys to the options
		for k, v of options
			defaults[k] = v

		defaults

	setup: ->
		# This should only be called once when App loads. It looks if there
		# are already options defined and updates them with the originals.
		if App.defaults
			for className, classValues of App.defaults
				for k, v of classValues
					Originals[className][k] = v

		Defaults.reset()

	reset: ->
		App.defaults = Utils.clone Originals
