// *********************************
// *********************************
// GraphicsGeometry.js
// *********************************
// ** By Etienne Pinchon
// ** ©2016

var GraphicsGeometry = function() {
	var geometry = new THREE.Geometry();
	return geometry;
};


// BoxGeometry(width, height, depth, widthSegments, heightSegments, depthSegments)
/*
	width — Width of the sides on the X axis.
	height — Height of the sides on the Y axis.
	depth — Depth of the sides on the Z axis.
	widthSegments — Optional. Number of segmented faces along the width of the sides. Default is 1.
	heightSegments — Optional. Number of segmented faces along the height of the sides. Default is 1.
	depthSegments — Optional. Number of segmented faces along the depth of the sides. Default is 1.
*/
GraphicsGeometry.box = function(properties) {

	if (properties == undefined) {
		properties = {};
	};

	// width
	if (properties.width == undefined) {
		properties.width = 1;
	}

	// height
	if (properties.height == undefined) {
		properties.height = 1;
	}

	// depth
	if (properties.depth == undefined) {
		properties.depth = 1;
	}

	// widthSegments
	if (properties.widthSegments == undefined) {
		properties.widthSegments = 1;
	}

	// heightSegments
	if (properties.heightSegments == undefined) {
		properties.heightSegments = 1;
	}

	// depthSegments
	if (properties.depthSegments == undefined) {
		properties.depthSegments = 1;
	}

	var geometry = new THREE.BoxGeometry(properties.width, properties.height, properties.depth, properties.widthSegments, properties.heightSegments, properties.depthSegments);

	geometry.width = properties.width;
	geometry.height = properties.height;
	geometry.depth = properties.depth;
	geometry.widthSegments = properties.widthSegments;
	geometry.heightSegments = properties.heightSegments;
	geometry.depthSegments = properties.depthSegments;

	return geometry;
};

/*
CircleGeometry(radius, segments, thetaStart, thetaLength)

radius — Radius of the circle, default = 50.
segments — Number of segments (triangles), minimum = 3, default = 8.
start — Start angle for first segment, default = 0 (three o'clock position).
length — The central angle, often called theta, of the circular sector. The default is 2*Pi, which makes for a complete circle.

// Create circle geometry
var geometry = GraphicsGeometry.circle({
	radius: 2,
	segments: 20
});

*/
GraphicsGeometry.circle = function(properties) {

	if (properties == undefined) {
		properties = {};
	};

	// radius
	if (properties.radius == undefined) {
		properties.radius = 2;
	}

	// segments
	if (properties.segments == undefined) {
		properties.segments = 40;
	}

	var geometry = new THREE.CircleGeometry(properties.radius, properties.segments, properties.start, properties.length);

	geometry.radius = properties.radius;
	geometry.segments = properties.segments;
	geometry.start = properties.start;
	geometry.length = properties.length;

	return geometry;
};


/*
	CylinderGeometry(radiusTop, radiusBottom, height, radiusSegments, heightSegments, openEnded, thetaStart, thetaLength)

	radiusTop — Radius of the cylinder at the top. Default is 20.
	radiusBottom — Radius of the cylinder at the bottom. Default is 20.
	height — Height of the cylinder. Default is 100.
	radiusSegments — Number of segmented faces around the circumference of the cylinder. Default is 8
	heightSegments — Number of rows of faces along the height of the cylinder. Default is 1.
	openEnded — A Boolean indicating whether the ends of the cylinder are open or capped. Default is false, meaning capped.
	start — Start angle for first segment, default = 0 (three o'clock position).
	length — The central angle, often called theta, of the circular sector. The default is 2*Pi, which makes for a complete cylinder.
*/

GraphicsGeometry.cylinder = function(properties) {

	if (properties == undefined) {
		properties = {};
	};

	// radius
	if (properties.radius != undefined) {
		properties.radiusTop = properties.radius;
		properties.radiusBottom = properties.radius;
	}

	// radiusTop
	if (properties.radiusTop == undefined) {
		properties.radiusTop = 2;
	}

	// radiusBottom
	if (properties.radiusBottom == undefined) {
		properties.radiusBottom = 2;
	}

	// radiusSegments
	if (properties.radiusSegments == undefined) {
		properties.radiusSegments = 40;
	}

	// height
	if (properties.height == undefined) {
		properties.height = 3;
	}

	var geometry = new THREE.CylinderGeometry(properties.radiusTop, properties.radiusBottom, properties.height, properties.radiusSegments, properties.heightSegments, properties.openEnded, properties.start, properties.length);

	geometry.radius = properties.radius;
	geometry.radiusTop = properties.radiusTop;
	geometry.radiusBottom = properties.radiusBottom;
	geometry.radiusSegments = properties.radiusSegments;
	geometry.heightSegments = properties.heightSegments;
	geometry.openEnded = properties.openEnded;
	geometry.start = properties.start;
	geometry.length = properties.length;

	return geometry;
};


/*
	DodecahedronGeometry(radius, detail)

	radius — Radius of the dodecahedron. Default is 1.
	detail — Default is 0. Setting this to a value greater than 0 adds vertices making it no longer a dodecahedron.
*/
GraphicsGeometry.dodecahedron = function(properties) {

	if (properties == undefined) {
		properties = {};
	};

	// radius
	if (properties.radius == undefined) {
		properties.radius = 1;
	}

	// detail
	if (properties.detail == undefined) {
		properties.detail = 0;
	}

	var geometry = new THREE.DodecahedronGeometry(properties.radius, properties.detail);

	geometry.radius = properties.radius;
	geometry.detail = properties.detail;

	return geometry;
};


/*
	IcosahedronGeometry(radius, detail)

	radius — Default is 1. 
	detail — Default is 0. Setting this to a value greater than 0 adds more vertices making it no longer an icosahedron. When detail is greater than 1, it's effectively a sphere.
*/
GraphicsGeometry.icosahedron = function(properties) {

	if (properties == undefined) {
		properties = {};
	};

	// radius
	if (properties.radius == undefined) {
		properties.radius = 1;
	}

	// detail
	if (properties.detail == undefined) {
		properties.detail = 0;
	}

	var geometry = new THREE.IcosahedronGeometry(properties.radius, properties.detail);

	geometry.radius = properties.radius;
	geometry.detail = properties.detail;

	return geometry;
};


/*
	OctahedronGeometry(radius, detail)

	radius — Radius of the octahedron. Default is 1.
	detail — Default is 0. Setting this to a value greater than zero add vertices making it no longer an octahedron.
*/
GraphicsGeometry.octahedronGeometry = function(properties) {

	if (properties == undefined) {
		properties = {};
	};

	// radius
	if (properties.radius == undefined) {
		properties.radius = 1;
	}

	// detail
	if (properties.detail == undefined) {
		properties.detail = 0;
	}

	var geometry = new THREE.OctahedronGeometry(properties.radius, properties.detail);

	geometry.radius = properties.radius;
	geometry.detail = properties.detail;

	return geometry;
};


/*
	PlaneGeometry(width, height, widthSegments, heightSegments)

	width — Width along the X axis.
	height — Height along the Y axis.
	widthSegments — Optional. Default is 1. 
	heightSegments — Optional. Default is 1.
*/
GraphicsGeometry.plane = function(properties) {

	if (properties == undefined) {
		properties = {};
	};

	// width
	if (properties.width == undefined) {
		properties.width = 1;
	}

	// height
	if (properties.height == undefined) {
		properties.height = 1;
	}

	// widthSegments
	if (properties.widthSegments == undefined) {
		properties.widthSegments = 1;
	}

	// heightSegments
	if (properties.heightSegments == undefined) {
		properties.heightSegments = 1;
	}

	var geometry = new THREE.PlaneGeometry(properties.width, properties.height, properties.widthSegments, properties.heightSegments);

	geometry.width = properties.width;
	geometry.height = properties.height;
	geometry.widthSegments = properties.widthSegments;
	geometry.heightSegments = properties.heightSegments;

	return geometry;
};

/*
	RingGeometry(innerRadius, outerRadius, thetaSegments, phiSegments, thetaStart, thetaLength)

	innerRadius — Default is 0, but it doesn't work right when innerRadius is set to 0.
	outerRadius — Default is 50. 
	segments — Number of segments. A higher number means the ring will be more round. Minimum is 3. Default is 8. 
	phiSegments — Minimum is 1. Default is 8.
	
	start — Starting angle. Default is 0. 
	length — Central angle. Default is Math.PI * 2.
*/
GraphicsGeometry.ring = function(properties) {

	if (properties == undefined) {
		properties = {};
	};

	// radius
	if (properties.radius != undefined) {
		properties.innerRadius = properties.radius;
		properties.outerRadius = properties.radius;
	}

	// innerRadius
	if (properties.innerRadius == undefined) {
		properties.innerRadius = 1;
	}

	// outerRadius
	if (properties.outerRadius == undefined) {
		properties.outerRadius = 2;
	}

	// segments
	if (properties.segments == undefined) {
		properties.segments = 40;
	}

	// phiSegments
	if (properties.phiSegments == undefined) {
		properties.phiSegments = 1;
	}

	var geometry = new THREE.RingGeometry(properties.innerRadius, properties.outerRadius, properties.segments, properties.phiSegments, properties.start, properties.length);

	geometry.radius = properties.radius;
	geometry.innerRadius = properties.innerRadius;
	geometry.outerRadius = properties.outerRadius;
	geometry.segments = properties.segments;
	geometry.phiSegments = properties.phiSegments;
	geometry.start = properties.start;
	geometry.length = properties.length;

	return geometry;
};


/*
	SphereGeometry(radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength)

	radius — sphere radius. Default is 50.
	widthSegments — number of horizontal segments. Minimum value is 3, and the default is 8.
	heightSegments — number of vertical segments. Minimum value is 2, and the default is 6.
	phiStart — specify horizontal starting angle. Default is 0.
	phiLength — specify horizontal sweep angle size. Default is Math.PI * 2.
	thetaStart — specify vertical starting angle. Default is 0.
	thetaLength — specify vertical sweep angle size. Default is Math.PI.
	The geometry is created by sweeping and calculating vertexes around the Y axis (horizontal sweep) and the Z axis (vertical sweep). Thus, incomplete spheres (akin to 'sphere slices') can be created through the use of different values of phiStart, phiLength, thetaStart and thetaLength, in order to define the points in which we start (or end) calculating those vertices.

*/
GraphicsGeometry.sphere = function(properties) {

	if (properties == undefined) {
		properties = {};
	};

	// radius
	if (properties.radius == undefined) {
		properties.radius = 1;
	}

	// segments
	if (properties.segments != undefined) {
		properties.widthSegments = properties.segments;
		properties.heightSegments = properties.segments;
	}

	// widthSegments
	if (properties.widthSegments == undefined) {
		properties.widthSegments = 40;
	}

	// heightSegments
	if (properties.heightSegments == undefined) {
		properties.heightSegments = 40;
	}

	var geometry = new THREE.SphereGeometry(properties.radius, properties.widthSegments, properties.heightSegments, properties.phiStart, properties.phiLength, properties.start, properties.length);

	geometry.radius = properties.radius;

	geometry.segments = properties.segments;
	geometry.widthSegments = properties.widthSegments;
	geometry.heightSegments = properties.heightSegments;

	geometry.phiStart = properties.phiStart;
	geometry.phiLength = properties.phiLength;

	geometry.start = properties.start;
	geometry.length = properties.length;

	return geometry;
};


/*
	TetrahedronGeometry(radius, detail)

	radius — Radius of the tetrahedron. Default is 1.
	detail — Default is 0. Setting this to a value greater than 0 adds vertices making it no longer a tetrahedron.
*/
GraphicsGeometry.tetrahedron = function(properties) {

	if (properties == undefined) {
		properties = {};
	};

	// radius
	if (properties.radius == undefined) {
		properties.radius = 1;
	}

	// detail
	if (properties.detail == undefined) {
		properties.detail = 0;
	}

	var geometry = new THREE.TetrahedronGeometry(properties.radius, properties.detail);

	geometry.radius = properties.radius;
	geometry.detail = properties.detail;

	return geometry;
};




/*
	TorusGeometry(radius, tube, radialSegments, tubularSegments, arc)

	radius — Default is 100. 
	tube — Diameter of the tube. Default is 40. 
	radialSegments — Default is 8 
	tubularSegments — Default is 6. 
	arc — Central angle. Default is Math.PI * 2.
*/
GraphicsGeometry.torus = function(properties) {

	if (properties == undefined) {
		properties = {};
	};

	// radius
	if (properties.radius == undefined) {
		properties.radius = 1;
	}

	// tube
	if (properties.tube == undefined) {
		properties.tube = 0.5;
	}

	// segments
	if (properties.segments != undefined) {
		properties.radialSegments = properties.radialSegments;
		properties.tubularSegments = properties.tubularSegments;
	}

	// radialSegments
	if (properties.radialSegments == undefined) {
		properties.radialSegments = 40;
	}

	// tubularSegments
	if (properties.tubularSegments == undefined) {
		properties.tubularSegments = 40;
	}

	var geometry = new THREE.TorusGeometry(properties.radius, properties.tube, properties.radialSegments, properties.tubularSegments, properties.arc);

	geometry.radius = properties.radius;
	geometry.tube = properties.tube;

	geometry.segments = properties.segments;
	geometry.radialSegments = properties.radialSegments;
	geometry.tubularSegments = properties.tubularSegments;

	geometry.arc = properties.arc;

	return geometry;
};


/*
	TorusKnotGeometry(radius, tube, radialSegments, tubularSegments, p, q, heightScale)

	radius — Default is 100. 
	tube — Default is 40. 
	radialSegments — Default is 64. 
	tubularSegments — Default is 8. 
	p — Default is 2. 
	q — Default is 3. 
	heightScale — Default is 1.
*/
GraphicsGeometry.torusKnot = function(properties) {

	if (properties == undefined) {
		properties = {};
	};

	// radius
	if (properties.radius == undefined) {
		properties.radius = 1;
	}

	// tube
	if (properties.tube == undefined) {
		properties.tube = 0.5;
	}

	// segments
	if (properties.segments != undefined) {
		properties.radialSegments = properties.radialSegments;
		properties.tubularSegments = properties.tubularSegments;
	}

	// radialSegments
	if (properties.radialSegments == undefined) {
		properties.radialSegments = 40;
	}

	// tubularSegments
	if (properties.tubularSegments == undefined) {
		properties.tubularSegments = 40;
	}


	// radialSegments
	if (properties.p == undefined) {
		properties.p = 2;
	}

	// tubularSegments
	if (properties.q == undefined) {
		properties.q = 3;
	}

	// heightScale
	if (properties.heightScale == undefined) {
		properties.heightScale = 1;
	}

	var geometry = new THREE.TorusKnotGeometry(properties.radius, properties.tube, properties.radialSegments, properties.tubularSegments, properties.p, properties.q, properties.heightScale);

	geometry.radius = properties.radius;
	geometry.tube = properties.tube;

	geometry.segments = properties.segments;
	geometry.radialSegments = properties.radialSegments;
	geometry.tubularSegments = properties.tubularSegments;

	geometry.p = properties.p;
	geometry.q = properties.q;
	geometry.heightScale = properties.heightScale;

	return geometry;
};




