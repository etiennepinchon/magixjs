
App.run ->

	class HomePage extends Page
		didAppear : (properties) ->
			console.log 4

	#Fonts
	# 	name: 'Open Sans'
	# 	weight: '400,300'
	# ,
	# 	name: 'Comfortaa'
	# 	weight: '700,600'
	# ,
	# 	name: 'Baloo Bhai'

	#Font 'Baloo Bhai', '400,300'
	#Font 'Quicksand', '400,300'
	#Font 'Comfortaa', '700,600'
	#Font 'Open Sans', '400,300'

	#Fonts
	#	name: 'Quicksand'
	#	weight: '400,300'
	
	foo = new Text
		backgroundColor: red
		text: 'hello'
		fontName: 'Comfortaa'

	boo = new TextInput
		placeholder: 'demo'
		text: 'dd'
		fontName: 'Quicksand'

	foo = new Page
		url: "demo"
		backgroundColor: green

	Routes
		main: ->
			App.page = new HomePage
				backgroundColor: red

			arrow = new View
				bottom: 100
				width: 42
				height: 42
				bc: blue
				parent: App.page
			arrow.absoluteCenterX()


			App.onResize ->
				log 4

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

		

		











