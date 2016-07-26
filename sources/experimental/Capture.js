// *********************************
// *********************************
// Capture.js
// *********************************
// ** By Etienne Pinchon
// ** ©2016

var Capture = function(properties) {
	if (properties == undefined) {
		properties = {};
	}

	if (properties.video == undefined) {
		properties.video = false;
	}

	if (properties.audio == undefined) {
		properties.audio = false;
	}

	var promisifiedOldGUM = function(constraints, successCallback, errorCallback) {

	  // First get ahold of getUserMedia, if present
	  var getUserMedia = (navigator.getUserMedia ||
	      navigator.webkitGetUserMedia ||
	      navigator.mozGetUserMedia);

	  // Some browsers just don't implement it - return a rejected promise with an error
	  // to keep a consistent interface
	  if(!getUserMedia) {
	    log("Capture: Capture API not supported by this browser.");

		if (properties.unsupported) {
			properties.unsupported();
		}
		return false;
	  }

	  // Otherwise, wrap the call to the old navigator.getUserMedia with a Promise
	  return new Promise(function(successCallback, errorCallback) {
	    getUserMedia.call(navigator, constraints, successCallback, errorCallback);
	  });
	}

	// Older browsers might not implement mediaDevices at all, so we set an empty object first
	if(navigator.mediaDevices === undefined) {
	  navigator.mediaDevices = {};
	}

	// Some browsers partially implement mediaDevices. We can't just assign an object
	// with getUserMedia as it would overwrite existing properties.
	// Here, we will just add the getUserMedia property if it's missing.
	if(navigator.mediaDevices.getUserMedia === undefined) {
		if (promisifiedOldGUM) {
			navigator.mediaDevices.getUserMedia = promisifiedOldGUM;
		};
	}

	// Prefer camera resolution nearest to 1280x720.
	var constraints = { 
		audio: properties.audio, 
		video: properties.video 
	};

	navigator.mediaDevices.getUserMedia(constraints)
	.then(function(stream) {
	  if (properties.success != undefined) {
		properties.success(window.URL.createObjectURL(stream));
	  }
	})
	.catch(function(err) {
	    if (properties.error != undefined) {
			properties.error(err);
		}
	});
}

/*
Example:
var myPlayer = new Player({
	width: 400,
	height: 400,
	addTo: App.page
});
myPlayer.on(Events.LoadedMetaData, function() {
	this.play();
})

var myCapture = new Capture({
	video: true,
	audio: true,
	success: function(stream) {
		myPlayer.video = stream;
	}
});*/
/*

  // Set stream inside player
  if (properties.video == false) {
  	properties.player.audio = window.URL.createObjectURL(stream);
  }
  else {
  	properties.player.video = window.URL.createObjectURL(stream);
  }
  	
  properties.player.on(Events.LoadedMetaData, function() {
  	properties.player.play();
  })*/
