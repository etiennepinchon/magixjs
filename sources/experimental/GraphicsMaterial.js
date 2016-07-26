// *********************************
// *********************************
// GraphicsMaterial.js
// *********************************
// ** By Etienne Pinchon
// ** ©2016

var GraphicsMaterial = function() {


};


/*

	MeshBasicMaterial
	A material for drawing geometries in a simple shaded (flat or wireframe) way.
	The default will render as flat polygons. To draw the mesh as wireframe, simply set the 'wireframe' property to true.

	color — geometry color in hexadecimal. Default is 0xffffff.
	map — Set texture map. Default is null 
	aoMap — Set ambient occlusion map. Default is null 
	specularMap — Set specular map. Default is null.
	alphaMap — Set alpha map. Default is null.
	envMap — Set env map. Default is null.
	fog — Define whether the material color is affected by global fog settings. Default is true.
	shading — Define shading type. Default is THREE.SmoothShading.
	wireframe — render geometry as wireframe. Default is false.
	wireframeLinewidth — Line thickness. Default is 1.
	wireframeLinecap — Define appearance of line ends. Default is 'round'.
	wireframeLinejoin — Define appearance of line joints. Default is 'round'.
	vertexColors — Define how the vertices gets colored. Default is THREE.NoColors.
	skinning — Define whether the material uses skinning. Default is false.
	morphTargets — Define whether the material uses morphTargets. Default is false.
*/

GraphicsMaterial.basic = function(properties) {

	if (properties == undefined) {
		properties = {};
	};

	// wireframeWidth
	if (properties.wireframeWidth != undefined) {
		properties.wireframeLinewidth = properties.wireframeWidth;
	}

	// wireframeCap
	if (properties.wireframeCap != undefined) {
		properties.wireframeLinecap = properties.wireframeCap;
	}

	// wireframeJoin
	if (properties.wireframeJoin != undefined) {
		properties.wireframeLinejoin = properties.wireframeJoin;
	}

	// Create material
	var material = new THREE.MeshBasicMaterial(properties);
	return material;
}



//MeshDepthMaterial
//A material for drawing geometry by depth. 
// Depth is based off of the camera near and far plane. White is nearest, black is farthest.

/* 	MeshDepthMaterial(parameters)

	parameters is an object with one or more properties defining the material's appearance.
	morphTargets -- Define whether the material uses morphTargets. Default is false.
	wireframe -- Render geometry as wireframe. Default is false (i.e. render as smooth shaded).
	wireframeLinewidth -- Controls wireframe thickness. Default is 1.

	var material = GraphicsMaterial.meshDepth({
		wireframe: true
	});
*/

GraphicsMaterial.depth = function(properties) {

	if (properties == undefined) {
		properties = {};
	};

	// morph
	if (properties.morph == undefined) {
		properties.morph = false;
	}

	// wireframe
	if (properties.wireframe == undefined) {
		properties.wireframe = false;
	}

	// wireframeWidth
	if (properties.wireframeWidth == undefined) {
		properties.wireframeWidth = 1;
	}

	// Create material
	var material = new THREE.MeshDepthMaterial({
		morphTargets: properties.morph, 
		wireframe: properties.wireframe,
		wireframeLinewidth: properties.wireframeWidth
	});
	return material;
}


/*
	MeshLambertMaterial
	A material for non-shiny (Lambertian) surfaces, evaluated per vertex.

	color — Line color in hexadecimal. Default is 0xffffff.
	map — Sets the texture map. Default is null 
	lightMap — Set light map. Default is null.
	aoMap — Set ao map. Default is null.
	emissiveMap — Set emissive map. Default is null.
	specularMap — Set specular map. Default is null.
	alphaMap — Set alpha map. Default is null.
	envMap — Set env map. Default is null.
	fog — Define whether the material color is affected by global fog settings. Default is false.
	wireframe — Render geometry as wireframe. Default is false (i.e. render as smooth shaded).
	wireframeLinewidth — Controls wireframe thickness. Default is 1.
	wireframeLinecap — Define appearance of line ends. Default is 'round'.
	wireframeLinejoin — Define appearance of line joints. Default is 'round'.
	vertexColors — Define how the vertices gets colored. Default is THREE.NoColors.
	skinning — Define whether the material uses skinning. Default is false.
	morphTargets — Define whether the material uses morphTargets. Default is false.
*/

GraphicsMaterial.faded = function(properties) {

	if (properties == undefined) {
		properties = {};
	};

	// wireframeWidth
	if (properties.wireframeWidth != undefined) {
		properties.wireframeLinewidth = properties.wireframeWidth;
	}

	// wireframeCap
	if (properties.wireframeCap != undefined) {
		properties.wireframeLinecap = properties.wireframeCap;
	}

	// wireframeJoin
	if (properties.wireframeJoin != undefined) {
		properties.wireframeLinejoin = properties.wireframeJoin;
	}

	// Create material
	var material = new THREE.MeshLambertMaterial(properties);
	return material;
}



//MeshDepthMaterial
// A material that maps the normal vectors to RGB colors.
/* 	
	wireframe -- Render geometry as wireframe. Default is false (i.e. render as smooth shaded).
	wireframeLinewidth -- Controls wireframe thickness. Default is 1.
	morphTargets -- Define whether the material uses morphTargets. Default is false.
*/

GraphicsMaterial.colored = function(properties) {

	if (properties == undefined) {
		properties = {};
	};

	// morph
	if (properties.morph == undefined) {
		properties.morph = false;
	}

	// wireframe
	if (properties.wireframe == undefined) {
		properties.wireframe = false;
	}

	// wireframeWidth
	if (properties.wireframeWidth == undefined) {
		properties.wireframeWidth = 1;
	}

	// Create material
	var material = new THREE.MeshNormalMaterial({
		morphTargets: properties.morph, 
		wireframe: properties.wireframe,
		wireframeLinewidth: properties.wireframeWidth
	});
	return material;
}


/*

	MeshPhongMaterial
	A material for shiny surfaces, evaluated per pixel.

	color — geometry color in hexadecimal. Default is 0xffffff.
	map — Set texture map. Default is null 
	lightMap — Set light map. Default is null.
	aoMap — Set ao map. Default is null.
	emissiveMap — Set emissive map. Default is null.
	specularMap — Set specular map. Default is null.
	alphaMap — Set alpha map. Default is null.
	displacementMap — Set displacement map. Default is null.
	displacementScale — Set displacement scale. Default is 1.
	displacementBias — Set displacement offset. Default is 0.
	envMap — Set env map. Default is null.
	fog — Define whether the material color is affected by global fog settings. Default is true.
	shading — Define shading type. Default is THREE.SmoothShading.
	wireframe — render geometry as wireframe. Default is false.
	wireframeLinewidth — Line thickness. Default is 1.
	wireframeLinecap — Define appearance of line ends. Default is 'round'.
	wireframeLinejoin — Define appearance of line joints. Default is 'round'.
	vertexColors — Define how the vertices gets colored. Default is THREE.NoColors.
	skinning — Define whether the material uses skinning. Default is false.
	morphTargets — Define whether the material uses morphTargets. Default is false.

*/

GraphicsMaterial.shinny = function(properties) {

	if (properties == undefined) {
		properties = {};
	};

	// wireframeWidth
	if (properties.wireframeWidth != undefined) {
		properties.wireframeLinewidth = properties.wireframeWidth;
	}

	// wireframeCap
	if (properties.wireframeCap != undefined) {
		properties.wireframeLinecap = properties.wireframeCap;
	}

	// wireframeJoin
	if (properties.wireframeJoin != undefined) {
		properties.wireframeLinejoin = properties.wireframeJoin;
	}

	// Create material
	var material = new THREE.MeshPhongMaterial(properties);
	return material;
}


/*
	LineBasicMaterial

	A material for drawing wireframe-style geometries.

	parameters is an object with one or more properties defining the material's appearance.
	color — Line color in hexadecimal. Default is 0xffffff.
	linewidth — Line thickness. Default is 1.
	linecap — Define appearance of line ends. Default is 'round'.
	linejoin — Define appearance of line joints. Default is 'round'.
	vertexColors — Define how the vertices gets colored. Default is THREE.NoColors.
	fog — Define whether the material color is affected by global fog settings. Default is false.
*/
GraphicsMaterial.line = function(properties) {

	if (properties == undefined) {
		properties = {};
	};

	// lineWidth
	if (properties.lineWidth != undefined) {
		properties.linewidth = properties.lineWidth;
	}

	// lineCap
	if (properties.lineCap != undefined) {
		properties.linecap = properties.lineCap;
	}

	// wireframeJoin
	if (properties.lineJoin != undefined) {
		properties.linejoin = properties.lineJoin;
	}

	// Create material
	var material = new THREE.LineBasicMaterial(properties);
	return material;
}


/*
	LineDashedMaterial

	A material for drawing wireframe-style geometries with dashed lines.

	color — Line color in hexadecimal. Default is 0xffffff.
	linewidth — Line thickness. Default is 1.
	scale — The scale of the dashed part of a line. Default is 1.
	dashSize — The size of the dash. Default is 3.
	gapSize - The size of the gap. Default is 1.
	vertexColors — Define how the vertices gets colored. Default is THREE.NoColors.
	fog — Define whether the material color is affected by global fog settings. Default is false.
*/
GraphicsMaterial.dashed = function(properties) {

	if (properties == undefined) {
		properties = {};
	};

	// lineWidth
	if (properties.lineWidth != undefined) {
		properties.linewidth = properties.lineWidth;
	}

	// Create material
	var material = new THREE.LineDashedMaterial(properties);
	return material;
}





