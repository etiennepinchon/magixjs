// *********************************
// *********************************
// Graphics.js
// *********************************
// ** By Etienne Pinchon
// ** ©2016

var Graphics = function(properties) {

	window.animationFrame = (function(){
      return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function(callback, element){
                window.setTimeout(callback, 1000 / 60);
              };
    })();

    Object.defineProperty(this, 'camera', {
	  get: function() {
		return this._camera;
	  },
	  set: function(value) {
	  	this._camera = value;
	  }
	});

    Object.defineProperty(this, 'renderer', {
	  get: function() {
		return this._renderer;
	  },
	  set: function(value) {
	  	this._renderer = value;
	  	this.element.appendChild(value.domElement);

	  	this._renderer.setPixelRatio( window.devicePixelRatio );

	  	// Set background if backgroundColor already defined
	  	if (this._background != undefined) {
	  		this.renderer.setClearColor(this._background);
	  	};
	  }
	});

    Object.defineProperty(this, 'rendering', {
	  get: function() {
		return this._rendering;
	  },
	  set: function(value) {

	  	this._renderingFunc = value;

	  	// Define rendering function
	  	this._rendering = function () {
			animationFrame(this._rendering);
			
			// Execute rendering function
			if (this._renderingFunc != undefined) {
				this._renderingFunc();
			};
			
			// If renderer, scene and camera are defined
			this.render();
		}.bind(this);
	  }
	});

    // *********************************
	// backgroundColor property
	// *********************************
	// ** Change the background color of a view

	Object.defineProperty(this, 'backgroundColor', {
		configurable: true,
	  get: function() {
		return this._background;
	  },
	  set: function(value) {
		this._background = value;
		this.element.style.background = value;

		if (this.renderer != undefined) {
			this.renderer.setClearColor(value);
		};
	  }
	});

	// ** Alias of backgroundColor
	Object.defineProperty(this, 'bc', {
		configurable: true,
	  get: function() {
		return this.backgroundColor;
	  },
	  set: function(value) {
		this.backgroundColor = value;
	  }
	});


	this.init(properties);
};

Graphics.prototype = new Canvas();

/*
	var graphics = new Graphics({
		width: width,
		height: height,
		superView: testController.view
	});
*/
Graphics.prototype.init = function(properties) {

	View.prototype.init.call(this);
	//Canvas.prototype.init.call(this);

	// Create a new scene
	this.scene = new THREE.Scene();

	// If properties
	if (properties != undefined) {

		// If rendering function
		/*if (properties.render != undefined) {

			// Define rendering function
			this.render = function () {
				animationFrame(this.render);

				// Execute rendering function
				properties.render();

				// If renderer, scene and camera are defined
				if (this.renderer != undefined && this.scene != undefined && this.camera != undefined) {
					this.renderer.render(this.scene, this.camera);
				};	
			};
		};*/

		// Default full screen
		if (properties.width == undefined) {
			properties.width = "100%";
		}
		if (properties.height == undefined) {
			properties.height = "100%";
		}

		this.props(properties);
	};

	var _this = this;
	window.addEventListener('resize', onWindowResize, false );
	
	function onWindowResize() {
		if (_this.camera != undefined) {
			_this.camera.aspect = window.innerWidth / window.innerHeight;
			_this.camera.updateProjectionMatrix();
		};
		if (_this.renderer != undefined) {
			_this.renderer.setSize( window.innerWidth, window.innerHeight );
		};
	}
};

Graphics.prototype.render = function(rendering) {
	if (this.renderer == undefined) {
		return;
	};

	this.renderer.render(this.scene, this.camera);

	if (rendering != undefined) {
		this.rendering = rendering;
		this.rendering();
	};
}




// Return mesh from geometry and material
Graphics.mesh = function(geometry, material) {
	if (geometry == undefined || material == undefined) {
		return;
	};

	var mesh = new THREE.Mesh(geometry, material);
	return mesh;
}

// Return a continuous line.
Graphics.line = function(geometry, material) {
	if (geometry == undefined || material == undefined) {
		return;
	};

	var line = new THREE.Line(geometry, material);
	return line;
}

// LineSegments
// A series of lines.
Graphics.segments = function(geometry, material) {
	if (geometry == undefined || material == undefined) {
		return;
	};

	var lineSegments = new THREE.LineSegments(geometry, material);
	return lineSegments;
}


Graphics.prototype.add = function(mesh) {
	if (this.scene == undefined || mesh == undefined) {
		return;
	};

	this.scene.add(mesh);
}





Graphics.perspectiveCamera = function(properties) {

	if (properties == undefined) {
		properties = {};
	};

	// fov — Camera frustum vertical field of view.
	if (properties.field != undefined) {
		properties.fov = properties.field;
	}
	if (properties.fov == undefined) {
		properties.fov = 75;
	}

	// aspect — Camera frustum aspect ratio.
	if (properties.ratio != undefined) {
		properties.aspect = properties.ratio;
	}
	if (properties.aspect == undefined) {
		properties.aspect = window.innerWidth/window.innerHeight;
	}

	// near — Camera frustum near plane.
	if (properties.from != undefined) {
		properties.near = properties.from;
	}
	if (properties.near == undefined) {
		properties.near = 0.1;
	}

	//far — Camera frustum far plane
	if (properties.to != undefined) {
		properties.far = properties.to;
	}
	if (properties.far == undefined) {
		properties.far = 1000;
	}

	var camera = new THREE.PerspectiveCamera(properties.fov, properties.aspect, properties.near, properties.far);

	// Properties

	/*
	.zoom
	Gets or sets the zoom factor of the camera.
	
	.fov
	Camera frustum vertical field of view, from bottom to top of view, in degrees.
	
	.aspect
	Camera frustum aspect ratio, window width divided by window height.
	
	.near
	Camera frustum near plane.
	
	.far
	Camera frustum far plane.
	*/

	Object.defineProperty(camera, 'field', {
	  get: function() {
		return camera.fov;
	  },
	  set: function(value) {
	  	camera.fov = value;
	  }
	});

	Object.defineProperty(camera, 'ratio', {
	  get: function() {
		return camera.aspect;
	  },
	  set: function(value) {
	  	camera.aspect = value;
	  }
	});

	Object.defineProperty(camera, 'from', {
	  get: function() {
		return camera.near;
	  },
	  set: function(value) {
	  	camera.near = value;
	  }
	});

	Object.defineProperty(camera, 'to', {
	  get: function() {
		return camera.far;
	  },
	  set: function(value) {
	  	camera.far = value;
	  }
	});

	return camera;
};



/*
	OrthographicCamera( left, right, top, bottom, near, far )

	left — Camera frustum left plane.
	right — Camera frustum right plane.
	top — Camera frustum top plane.
	bottom — Camera frustum bottom plane.
	near — Camera frustum near plane.
	far — Camera frustum far plane.
*/
Graphics.orthographicCamera = function(properties) {

	if (properties == undefined) {
		properties = {};
	};

	// left — Camera frustum left plane.
	if (properties.left == undefined) {
		properties.left = window.innerWidth / - 2;
	}

	// right — Camera frustum right plane.
	if (properties.right == undefined) {
		properties.right = window.innerWidth / 2;
	}

	// top — Camera frustum top plane.
	if (properties.top == undefined) {
		properties.top = window.innerHeight / 2;
	}

	// bottom — Camera frustum top plane.
	if (properties.bottom == undefined) {
		properties.bottom = window.innerHeight / - 2;
	}



	// near — Camera frustum near plane.
	if (properties.from != undefined) {
		properties.near = properties.from;
	}
	if (properties.near == undefined) {
		properties.near = 1;
	}

	//far — Camera frustum far plane
	if (properties.to != undefined) {
		properties.far = properties.to;
	}
	if (properties.far == undefined) {
		properties.far = 1000;
	}

	var camera = new THREE.OrthographicCamera(properties.left, properties.right, properties.top, properties.bottom, properties.near, properties.far);

	Object.defineProperty(camera, 'from', {
	  get: function() {
		return camera.near;
	  },
	  set: function(value) {
	  	camera.near = value;
	  }
	});

	Object.defineProperty(camera, 'to', {
	  get: function() {
		return camera.far;
	  },
	  set: function(value) {
	  	camera.far = value;
	  }
	});

	return camera;
};







Graphics.webGL = function(properties) {
	
	if (properties == undefined) {
		properties = {};
	};

	var renderer = new THREE.WebGLRenderer();

	Object.defineProperty(renderer, 'width', {
	  get: function() {
	  	if (renderer._width == undefined) {
	  		renderer._width = this.width;
	  	};
		return renderer._width;
	  },
	  set: function(value) {
	  	renderer._width = value;

	  	// Set renderer size
		renderer.setSize(value, renderer._height);
	  }
	});

	Object.defineProperty(renderer, 'height', {
	  get: function() {
	  	if (renderer._height == undefined) {
	  		renderer._height = this.height;
	  	};
		return renderer._height;
	  },
	  set: function(value) {
	  	renderer._height = value;

	  	// Set renderer size
		renderer.setSize(renderer._width, value);
	  }
	});

	if (properties.width == undefined) {
		renderer.width = window.innerWidth;
	}

	if (properties.height == undefined) {
		renderer.height = window.innerHeight;
	}

	// Insert rendrer
	//this.element.appendChild(renderer.domElement);

	return renderer;
};


/*
.getContext ()
Return the WebGL context.


# .getContextAttributes ()
Returns an object that describes the attributes set on the WebGL context when it was created.

# .supportsVertexTextures ()
Return a Boolean true if the context supports vertex textures.

# .setSize ( width, height, updateStyle )
Resizes the output canvas to (width, height), and also sets the viewport to fit that size, starting in (0, 0). Setting updateStyle to true adds explicit pixel units to the output canvas style.

# .setViewport ( x, y, width, height )
Sets the viewport to render from (x, y) to (x + width, y + height).

# .setScissor ( x, y, width, height )
Sets the scissor area from (x, y) to (x + width, y + height).
NOTE: The point (x, y) is the lower left corner of the area to be set for both of these methods. The area is defined from left to right in width but bottom to top in height. The sense of the vertical definition is opposite to the fill direction of an HTML canvas element.

# .setScissorTest ( boolean )
Enable or disable the scissor test. When this is enabled, only the pixels within the defined scissor area will be affected by further renderer actions.

# .setClearColor ( color, alpha )
Sets the clear color and opacity.

// Creates a renderer with red background
var renderer = new THREE.WebGLRenderer();
renderer.setSize( 200, 100 );
renderer.setClearColor( 0xff0000 );

# .getClearColor ()
Returns a THREE.Color instance with the current clear color.

# .getClearAlpha ()
Returns a float with the current clear alpha. Ranges from 0 to 1.

# .clear ( color, depth, stencil )
Tells the renderer to clear its color, depth or stencil drawing buffer(s). This method initializes the color buffer to the current clear color value.
Arguments default to true.

# .renderBufferImmediate ( object, program, shading )
object — an instance of Object3D]
program — an instance of shaderProgram
shading — an instance of Material
Render an immediate buffer. Gets called by renderImmediateObject.

# .renderBufferDirect ( camera, lights, fog, material, geometryGroup, object )
Render a buffer geometry group using the camera and with the correct material.
# .renderBuffer ( camera, lights, fog, material, geometryGroup, object )

Render a geometry group using the camera and with the correct material.
# .render ( scene, camera, renderTarget, forceClear )

Render a scene using a camera.
The render is done to the renderTarget (if specified) or to the canvas as usual.
If forceClear is true, the depth, stencil and color buffers will be cleared before rendering even if the renderer's autoClear property is false.
Even with forceClear set to true you can prevent certain buffers being cleared by setting either the .autoClearColor, .autoClearStencil or .autoClearDepth properties to false.

# .readRenderTargetPixels ( renderTarget, x, y, width, height, buffer )
Reads the pixel data from the renderTarget into the buffer you pass in. Buffer should be a Javascript Uint8Array instantiated with new Uint8Array( renderTargetWidth * renderTargetWidth * 4 ) to account for size and color information. This is a wrapper around gl.readPixels.

# .renderImmediateObject ( camera, lights, fog, material, object )
Renders an immediate Object using a camera.

# .setFaceCulling ( cullFace, frontFace )
cullFace —- "back", "front", "front_and_back", or false.
frontFace —- "ccw" or "cw
Used for setting the gl frontFace, cullFace states in the GPU, thus enabling/disabling face culling when rendering.
If cullFace is false, culling will be disabled.

# .setTexture ( texture, slot )
texture -- The texture that needs to be set.
slot -- The number indicating which slot should be used by the texture.
This method sets the correct texture to the correct slot for the wegl shader. The slot number can be found as a value of the uniform of the sampler.

# .setRenderTarget ( renderTarget )

renderTarget -- The renderTarget that needs to be activated.
This method sets the active rendertarget.

# .supportsCompressedTextureS3TC ()
This method returns true if the webgl implementation supports compressed textures of the format S3TC.

# .getMaxAnisotropy ()
This returns the anisotropy level of the textures.

# .getPrecision ()
This gets the precision used by the shaders. It returns "highp","mediump" or "lowp".

# .setMaterialFaces (material)
material -- The material with side that shouldn't be culled.
This sets which side needs to be culled in the webgl renderer.

# .supportsStandardDerivatives ()
This method returns true if the webgl implementation supports standard derivatives.

# .supportsFloatTextures ()
This method returns true if the webgl implementation supports float textures.

# .clearTarget (renderTarget, color, depth, stencil)
renderTarget -- The renderTarget that needs to be cleared.
color -- If set, then the color gets cleared. 
depth -- If set, then the depth gets cleared. 
stencil -- If set, then the stencil gets cleared.
This method clears a rendertarget. To do this, it activates the rendertarget.

*/