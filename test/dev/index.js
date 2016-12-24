App.run(function() {
  var myText;
  Import('dss');
  Font('Montserrat', '400, 700');
  App.setDevice(Device.iPhoneGold);
  myText = new Text({
    width: auto,
    text: 'Hello',
    image: 'http://goo.gl/TY8mx3',
    imagePosition: center,
    imageScale: 1,
    backgroundClip: text,
    fontSize: 120,
    fontWeight: 700,
    color: clear
  });
  myText.center();
  return Request.send('http://localhost:8880', {
    parameters: {
      data: 42
    }
  });

  /*
  	 * Create a new list
  	myList = new List
  		y: 100
  		width: 300
  		length: 20
  
  	myList.centerX()
  
  	App.page.background = red
  	 * For each element of the list
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
   */

  /*
  	test = new View
  		bc: red
  		width: 750
  		height: 120
  
  	App.device.background = Color.random()
  
  	Below Tablet, test,
  		width: 100
  		backgroundColor: blue
   */

  /*
  	myPlayer = new Player
  		width: 400
  		height: 400
  		video: 'http://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_1mb.mp4'
  	myPlayer.play()
   */

  /*
  	test = new Button
  		bc: red
  		width: 310
  		height: 120
  		mouseDown: ->
  			this.animate
  				properties:
  					x: 10
  					
  			 *	this.backgroundColor = Color.random()
   */

  /*
  	Below iPhone7, test,
  		width: 100
  		backgroundColor: blue
   */

  /*
  	speech = new SpeechRecognition
  		continuous: yes
  		lang: 'en-US'
  		interimResults: yes
  		 *grammars: speechRecognitionList
  
  	speech.onResult (event) ->
    		console.log event
  
  	test = new View
  		bc: red
  		width: 750
  		height: 120
  		click: ->
  			speech.start()
   */

  /*
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
   */

  /*
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
   */

  /*
  	demo = new Text
  		width: auto
  		 *image: 'http://yoksel.github.io/about-svg/assets/img/parts/fire.gif' 
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
   */

  /*
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
  
  			 * say 'PUSH'
  			 * say 'PUSH'
  			 * say 'PUSH'
  			 * say 'PUSH'
  			 * say 'PUSH'
  			 * say 'PUSH'
  			 * say 'PUSH'
  			 * say 'PUSH'
  			 * say '11:42, congrats to everyone'
  
  			return firstPage
  		haha : ->
  			secondPage = new Page
  			 	backgroundColor: green
  
  			hello = new Link
  				text: 'home'
  				width: 300
  				 *href: '/'
  				fontSize: 90
  				fontName: 'Comfortaa'
  				fontWeight: 400
  				color: black
  				background: blue
  				spacing: 4
  				x: 300
  				y: 40
  				 *margin: 40
  
  			hello.center()
  
  			hello2 = new Link
  				text: 'home'
  				width: 300
  				 *href: '/'
  				fontSize: 90
  				fontName: 'Baloo Bhai'
  				fontWeight: 400
  				color: black
  				background: blue
  				spacing: 4
  				x: 300
  				y: 40
  				 *margin: 40
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
   */

  /*
  	voice = new Say 'Welcome',
  		auto: no
  	voice.onEnd ->
  		log 'ok'
  	voice.speak()
   */

  /*
  	 * Import fonts
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
  
  
  	 *say Color.gradient Color.gradient Color.random(), Color.random()
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
   */
});
