App.run ->

	Playground = new Page
		parent: App

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

	a = new View
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



# 	Defaults.set 'TextView',
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
# 		hello = new View
# 			width: 300
# 			height: 300
# 			bc: red
# 			parent: @

# 		hello.center()

# 		vr = new VR()
# 		#vr.getDevices ->
# 		#	console.log 'all good'
# 		#	console.log vr.sensor

		

		











