
App.run ->
	Import 'dss'

	Font 'Montserrat', '400, 700'

	# Choose device to emulate
	App.setDevice Device.iPhoneGold

	# Create a new text
	myText = new Text
		width: auto
		text: 'Hello'
		image: 'http://goo.gl/TY8mx3'
		imagePosition: center
		imageScale: 1
		backgroundClip: text
		fontSize: 120
		fontWeight: 700
		color: clear
	myText.center()

	Request.send 'http://localhost:8880',
		parameters:
			data: 42





	###
	# Create a new list
	myList = new List
		y: 100
		width: 300
		length: 20

	myList.centerX()

	App.page.background = red
	# For each element of the list
	myList.each (item, index) ->
		if not item
			item = new ListItem
				width: '100%'
				height: 128
				marginBottom: 10
				borderRadius: 5
				transition: yes
				
			container = new View
	         width: '100%'
	         height: '100%'
	         backgroundColor: white
	         parent: item
	            
	      item.onSwipeLeftEnd ->
	         container.fadeOut
	            x: -300
	            duration: .3
	            then: ->
	               item.height = 0
	               item.marginBottom = 0
		return item
	###


	###
	test = new View
		bc: red
		width: 750
		height: 120

	App.device.background = Color.random()

	Below Tablet, test,
		width: 100
		backgroundColor: blue
	###

	#App.setDevice Device.iPad

	###
	myPlayer = new Player
		width: 400
		height: 400
		video: 'http://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_1mb.mp4'
	myPlayer.play()
	###
	
	#device = new Device
	#	background: Color.gradient('#f52fee', '#6600ff', 120)
	#	index: 100
		
	#device.content.backgroundColor = blue

	#grammar = '#JSGF V1.0; grammar colors; public <color> = aqua | azure | beige | bisque | black | blue | brown | chocolate | coral | crimson | cyan | fuchsia | ghostwhite | gold | goldenrod | gray | green | indigo | ivory | khaki | lavender | lime | linen | magenta | maroon | moccasin | navy | olive | orange | orchid | peru | pink | plum | purple | red | salmon | sienna | silver | snow | tan | teal | thistle | tomato | turquoise | violet | white | yellow ;'
	#speechRecognitionList = new SpeechGrammarList()
	#speechRecognitionList.addFromString(grammar, 1)
	###
	test = new Button
		bc: red
		width: 310
		height: 120
		mouseDown: ->
			this.animate
				properties:
					x: 10
					
			#	this.backgroundColor = Color.random()
	###
	#App.device.type = NULL

	#TouchEmulator.enable()
	###
	Below iPhone7, test,
		width: 100
		backgroundColor: blue
	###
	#Interval .5, ->
	#	console.log 'dd'
	#	App.device.type = Utils.pickRandomProperty(Devices)

	###
	speech = new SpeechRecognition
		continuous: yes
		lang: 'en-US'
		interimResults: yes
		#grammars: speechRecognitionList

	speech.onResult (event) ->
   		console.log event

	test = new View
		bc: red
		width: 750
		height: 120
		click: ->
			speech.start()
	###
		#parent: device.content

	###
	myPlayer = new Player
		width: 480

	myCapture = new Capture
		video: true
		audio: true
		success: (stream) ->
			myPlayer.video = stream
			myPlayer.play()
		error: ->
			console.log 'err'
	###
	
	###
	demo = new Text
		width: auto
		image: 'http://yoksel.github.io/about-svg/assets/img/parts/fire.gif'
		text: 'Hello'
		imagePosition: center
		imageScale: 1.5
		backgroundClip: text
		fontSize: 140
		color: clear
	demo.center()
	App.page.backgroundColor = black

	started = no
	speech = NULL
	demo.onClick ->
		if started is no
			speech = new SpeechRecognition()
			if speech.supported
				started = yes
				speech.onEnd (event)->
					console.log event
				speech.onResult (event)->
					console.log event
				speech.start()
		else
			started = no
			speech.stop()
	###


	###
	demo = new Text
		width: auto
		#image: 'http://yoksel.github.io/about-svg/assets/img/parts/fire.gif' 
		image: '-webkit-linear-gradient(90deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1), rgba(0, 0, 0, 0))'
		imageRepeat: yes
		imagePosition:
			x: 0
			y: -308
		text: 'Hello'
		backgroundClip: text
		imageSize: '100% 100%'
		fontSize: 140
		color: clear
	demo.center()

	App.page.backgroundColor = '#f5f5f5'
	demo.animate
		props:
			imagePositionY: -500
		duration: 2
		repeat: 10
		curve: 'linear'
	###


	###
	Routes
		main: ->

			firstPage = new Page
				backgroundColor: red

			hello = new Link
				text: 'Hello'
				width: 300
				href: '/haha'
				fontSize: 90
				fontName: 'Baloo Bhai'
				fontWeight: 400
				color: black
				background: blue
				spacing: 4
				
			hello.background = clear
			hello.center()

			# say 'PUSH'
			# say 'PUSH'
			# say 'PUSH'
			# say 'PUSH'
			# say 'PUSH'
			# say 'PUSH'
			# say 'PUSH'
			# say 'PUSH'
			# say '11:42, congrats to everyone'

			return firstPage
		haha : ->
			secondPage = new Page
			 	backgroundColor: green

			hello = new Link
				text: 'home'
				width: 300
				#href: '/'
				fontSize: 90
				fontName: 'Comfortaa'
				fontWeight: 400
				color: black
				background: blue
				spacing: 4
				x: 300
				y: 40
				#margin: 40

			hello.center()

			hello2 = new Link
				text: 'home'
				width: 300
				#href: '/'
				fontSize: 90
				fontName: 'Baloo Bhai'
				fontWeight: 400
				color: black
				background: blue
				spacing: 4
				x: 300
				y: 40
				#margin: 40
				click: ->
					hello.animate
						duration: 0.3
						delay: 1
						props:
							backgroundColor: red

					hello2.animate
						duration: 10
						props:
							x: 0
							y: 0

			return secondPage

	###

	# # Instanciate DB
	# db = new WebDB
	# 	name: 'demoDB'
	# 	version: 13

	# db.onUpgradeNeeded ->
	# 	console.log 'jj'

	# 	usersStore = db.createStore
	# 		name: 'usersdd'
	# 		keyPath: "email"

	# 	usersStore.onSuccess ->
	# 		console.log 'dd'
	# 		# Create index
	# 	usersStore.createIndex
	# 		store: 'usersdd'
	# 		name: 'name'
	# 		keyPath: 'name'
	# 		unique: yes

	# 	usersStore.createIndex
	# 		store: 'usersdd'
	# 		name: 'age'
	# 		keyPath: 'age'
	# 		unique: no


	# db.onSuccess ->
	# 	console.log db.request.result

	# 	# transation = db.transaction 'users'
	# 	# #transation.getStore 'us'
	# 	# transation.onComplete (e)->
	# 	# 	console.log e

	# 	# Create new Store
		


	# db.onVersionChange ->
	#  	console.log db.db

	# # 	# Create new Store
	# # 	usersStore = db.createStore
	# # 		name: 'users'
	# # 		keyPath: "email"

	# # 	usersStore.onSuccess ->
	# # 		console.log 'dd'
	# # 		# Create index
	# # 		usersStore.createIndex
	# # 			store: 'users'
	# # 			name: 'name'
	# # 			keyPath: 'name'
	# # 			unique: yes

	# # 		usersStore.createIndex
	# # 			store: 'users'
	# # 			name: 'age'
	# # 			keyPath: 'age'
	# # 			unique: no

	# # 		# Add data
	# # 		req = usersStore.add
	# # 			email: 'etienne@orbe.io'
	# # 			age: 21
	# # 		req.onSuccess ->
	# # 			log 'nice'

	# # 		console.log usersStore.getAll()
				

	# firstPage = new Page
	# 	backgroundColor: red
	# 	url: '/'


	# #Require 'http://d1n0x3qji82z53.cloudfront.net/src-min-noconflict/ace.js'
   		
	# #new say 'App fully loaded',
 #   	#	voiceID: 4

	# hello = new Link
	# 	text: 'Hello'
	# 	width: 300
	# 	href: '/haha'
	# 	fontSize: 90
	# 	fontName: 'Baloo Bhai'
	# 	fontWeight: 400
	# 	color: black
	# 	background: blue
	# 	spacing: 4
	# 	parent: firstPage
		
	# hello.background = clear
	# hello.center()

	# secondPage = new Page
	#  	backgroundColor: green
	#  	url: '/haha'

	# hello = new Link
	# 	text: 'home'
	# 	width: 300
	# 	href: '/'
	# 	fontSize: 90
	# 	fontName: 'Baloo Bhai'
	# 	fontWeight: 400
	# 	color: black
	# 	background: blue
	# 	spacing: 4
	# 	parent: secondPage


	###
	voice = new Say 'Welcome',
		auto: no
	voice.onEnd ->
		log 'ok'
	voice.speak()
	###


	###
	# Import fonts
	Fonts [
		name: 'Raleway'
		weight: '600,500,400,300,100'
	,
		name: 'Roboto Mono'
		weight: '400'
	,
		name: 'Montserrat'
		weight: '600,500,400,300,100'
	]


	#say Color.gradient Color.gradient Color.random(), Color.random()
	Playground.background = Color.gradient Color.random(), Color.random(), Color.random(), Color.random(), Color.random(), Color.random()

	hello = new Text
		text: 'Hello'
		width: 300
		fontSize: 90
		fontWeight: 300
		color: black
		spacing: 4
		parent: Playground
		
	hello.center()

	a = new Layer
		props:
			bc: red
		parent: Playground

	Below Tablet, hello,
		fontSize: 32
		bc: clear

	Below Mobile, hello,
		fontSize: 16
		bc: green

	Above TV, hello,
		fontSize: 64
		bc: blue
	###


# 	Defaults.set 'TextLayer',
# 		backgroundColor: 'blue'
# 		h: 200

# 	Defaults.set 'Text',
# 		align: 'left'
# 		width: 'auto'

# 	Fonts
# 		name: 'Raleway',
# 		weight: '600,500,400,300,100'

# 	Routes
# 		main: ->
# 			new MyPage
# 		about: ->
# 			new MyPage
# 		default: ->
# 			console.log 'default'
# 		, ->
# 			console.log 'Before request'

# class MyPage extends Page
# 	didAppear : ->
# 		hello = new Layer
# 			width: 300
# 			height: 300
# 			bc: red
# 			parent: @

# 		hello.center()

# 		vr = new VR()
# 		#vr.getDevices ->
# 		#	console.log 'all good'
# 		#	console.log vr.sensor

		

		











