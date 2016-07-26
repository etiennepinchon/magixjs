// *********************************
// *********************************
// GraphicsLight.js
// *********************************
// ** By Etienne Pinchon
// ** ©2016

var GraphicsLight = function() {

};

/*
	AmbientLight
	This light's color gets applied to all the objects in the scene globally.
*/
GraphicsLight.ambient = function(properties) {

	var color = null;

	if (properties == undefined) {
		properties = {};
	}
	else if (typeof properties == "string") {
		color = properties;
	};

	// color
	if (properties.color != undefined) {
		color = properties.color;
	}

	var light = new THREE.AmbientLight(color); // soft white light
	return light;
};

/*
	DirectionalLight
	Affects objects using MeshLambertMaterial or MeshPhongMaterial.
*/
GraphicsLight.directional = function(properties) {

	var color = null;

	if (properties == undefined) {
		properties = {};
	}
	else if (typeof properties == "string") {
		color = properties;
	};

	// color
	if (properties.color != undefined) {
		color = properties.color;
	}

	var light = new THREE.DirectionalLight(color);

	// x
	if (properties.x != undefined) {
		light.position.x = properties.x;
	}

	// y
	if (properties.y != undefined) {
		light.position.y = properties.y;
	}

	// z
	if (properties.z != undefined) {
		light.position.z = properties.z;
	}

	return light;
};

/*
	HemisphereLight
	A light source positioned directly above the scene.
*/
GraphicsLight.hemisphere = function(properties) {

	if (properties == undefined) {
		properties = {};
	}

	// intensity
	if (properties.intensity == undefined) {
		properties.intensity = 1;
	}

	var light = new THREE.HemisphereLight(properties.top, properties.bottom, properties.intensity); // soft white light
	return light;
};




