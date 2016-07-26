var restify = require('restify');
var fs = require('fs');
var LZString = require('lz-string');
 
var server = restify.createServer();
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.gzipResponse());

server.get('/api/:url', function (req, res, next) {
	var body = '<html><body>something</body></html>';
	res.writeHead(200, {
		'Content-Length': Buffer.byteLength(body),
		'Content-Type': 'text/html'
	});
	res.write(body);
	res.end();

	return next();
});

// Static files
server.get(/\/sources\/?.*/, restify.serveStatic({
		directory: '../'//__dirname
}));

server.get(/\/test\/?.*/, restify.serveStatic({
		directory: '../'//__dirname
}));


var wrench = require("wrench");
var uglify = require("uglify-js");
var path = require('path');


var walk = function(dir, done) {
	var results = [];
	fs.readdir(dir, function(err, list) {
		if (err) return done(err);
		var i = 0;
		(function next() {
			var file = list[i++];
			if (!file) return done(null, results);
			file = dir + '/' + file;
			fs.stat(file, function(err, stat) {
				if (stat && stat.isDirectory()) {
					walk(file, function(err, res) {
						results = results.concat(res);
						next();
					});
				} else {
					results.push(file);
					next();
				}
			});
		})();
	});
};

var framework_files = [
	"../sources/js/Orbe.js",
	"../sources/js/Defaults.js",
	"../sources/js/Utils.js",
	"../sources/js/Config.js",
	"../sources/js/Say.js",

	"../sources/js/lib/EE3.js",
	"../sources/js/Event.js",
	"../sources/js/EventEmitter.js",
	"../sources/js/Element.js",
	"../sources/js/EventBuffer.js",

	"../sources/js/DOMEventManager.js",
	"../sources/js/Context.js",
	"../sources/js/lib/husl.js",
	"../sources/js/lib/LAB.min.js",
	"../sources/js/Color.js",
	"../sources/js/Store.js",
	"../sources/js/Cookie.js",
	"../sources/js/Network.js",
	"../sources/js/GestureRecognizer.js",

	"../sources/js/Transition.js",
	"../sources/js/Animator.js",
	"../sources/js/Animators/LinearAnimator.js",
	"../sources/js/Animators/BezierCurveAnimator.js",
	"../sources/js/Animators/SpringRK4Animator.js",
	"../sources/js/Animators/SpringDHOAnimator.js",
	"../sources/js/Animation.js",
	"../sources/js/Integrator.js",
	"../sources/js/AnimationLoop.js",
	"../sources/js/Simulator.js",
	"../sources/js/Simulators/FrictionSimulator.js",
	"../sources/js/Simulators/SpringSimulator.js",
	"../sources/js/Simulators/MomentumBounceSimulator.js",
	"../sources/js/Simulation.js",

	"../sources/js/FileReader.js",
	"../sources/js/Location.js",
	"../sources/js/Thread.js",
	"../sources/js/Notification.js",

	"../sources/js/App.js",
	"../sources/js/Import.js",
	"../sources/js/Preload.js",
	"../sources/js/When.js",
	"../sources/js/View.js",
	"../sources/js/ViewStates.js",
	"../sources/js/ViewDraggable.js",
	"../sources/js/Page.js",
	"../sources/js/Text.js",
	"../sources/js/Link.js",
	"../sources/js/Image.js",
	"../sources/js/Button.js",
	"../sources/js/Slider.js",
	"../sources/js/ProgressBar.js",
	"../sources/js/TextField.js",
	"../sources/js/FileField.js",
	"../sources/js/TextView.js",
	"../sources/js/Canvas.js",
	"../sources/js/WebView.js",
	"../sources/js/Dropdown.js",
	"../sources/js/Checkbox.js",
	"../sources/js/RadioButton.js",
	"../sources/js/Player.js",
	"../sources/js/List.js",
	"../sources/js/ListItem.js"
];

server.get('/compile', function (req, res, next) {

	var start = +new Date();

	var uglified = uglify.minify(framework_files);

	var versioning = '/* Orbe.io || Created by Etienne Pinchon (@etiennepinchon) || Copyright @2016 */var __ORBE_JS_BUILD_DATE__=' + new Date().getTime() / 1000 + ';';
	var finalJS = versioning + uglified.code

	fs.writeFile('../build/orbe.min.js', finalJS, function (err){
		if(err) {
			res.send(err);
		} 
		else {
			var loader_files = ["../sources/js/OrbeLoader.js"]
			uglified = uglify.minify(loader_files);

			fs.writeFile('../build/orbe.loader.min.js', versioning + uglified.code, function (err){
				if(err) {
					res.send(err);
				} else {
					var end = +new Date();
				 	res.send({"message": "OrbeJS compiled with success. " + (framework_files.length + loader_files.length) + ' files. Done in ' + (end-start) + 'ms'});
				}
			});
		}
	});

	return next();
});

// App path
server.get(/\/?/, function (req, res, next) {

	// Build page -> use to test the loading system
	if(req.params.build == 'true') {
		res.writeHead(200);
	    fs.createReadStream('../test/build/index.html').pipe(res);
	    return next();
	}

	res.writeHead(200);
    fs.createReadStream('../test/dev/index.html').pipe(res);
    return next();
});
 
server.listen(8888, function () {
	console.log('%s listening at %s', server.name, server.url);
});

console.log("Server now running....");