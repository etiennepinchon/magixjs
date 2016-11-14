var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

App.run(function() {
  var HomePage, boo, foo;
  HomePage = (function(_super) {
    __extends(HomePage, _super);

    function HomePage() {
      return HomePage.__super__.constructor.apply(this, arguments);
    }

    HomePage.prototype.didAppear = function(properties) {
      return console.log(4);
    };

    return HomePage;

  })(Page);
  foo = new Text({
    backgroundColor: red,
    text: 'hello',
    fontName: 'Comfortaa'
  });
  boo = new TextInput({
    placeholder: 'demo',
    text: 'dd',
    fontName: 'Quicksand'
  });
  foo = new Page({
    url: "demo",
    backgroundColor: green
  });
  return Routes({
    main: function() {
      var arrow;
      App.page = new HomePage({
        backgroundColor: red
      });
      arrow = new View({
        bottom: 100,
        width: 42,
        height: 42,
        bc: blue,
        parent: App.page
      });
      arrow.absoluteCenterX();
      return App.onResize(function() {
        return log(4);
      });
    }
  });

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
