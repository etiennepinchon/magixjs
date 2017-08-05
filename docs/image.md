# Name
Image

# Description
Images are the image containers of Magix. They inherit all of the Views properties and methods and as such can be customized in the same way.

# Extends
view


##############################################################
## Overview
Overview

### Description
Images are used to display images on the screen. Images can be used to display any time of image from profile pictures to page background images. They can be given the same properties as the view.

### Example
myImage = new Image
	x: 100
	y: 100
	width: 250
	height: 250
	image: 'image'
	parent: Playground
### End Example

### About Example
An image added to an Image can have its aspect ratio and positioning. Once the image has loaded the image can given new properties and animations. In the following example, the Image fades in when the image has finished loading.

### Example
myImage = new Image
	image: 'http://i.imgur.com/fKH3obf.jpg'
	aspect: fill
	scale: 0.5
	opacity: 0
	done: ->
		this.fadeIn 0.3
	parent: Playground

myImage.center()
### End Example



##############################################################
## Property
image

### Type
<string>

### Description
Set the source image of Image.

### Alias
source,src,url

### Example
# With the asset catalog
myImage = new Image
	image: 'background'
	parent: Playground
### End Example


##############################################################
## Property
original

### Type
<Size object>

### Read only

### Description
Returns the original size of the source image.

### Example
myImage = new Image
	image: 'http://i.imgur.com/fKH3obf.jpg'
	parent: Playground

myImage.center()

# Original width
log image.original.width

# Original height
log image.original.height
### End Example


##############################################################
## Property
aspect

### Type
<string>

### Description
Set the aspect of the image within the image.

### Example
myImage = new Image

# Scale the image to fit within the bounds of the image.
myImage.aspect = fit

# Scale and center the image of the image
myImage.aspect = fitCenter

# Set the width or height of the image to equal that of the image to completely fill it, that may result in parts of the image being out of the bounds of the image
myImage.aspect = fill

# Set the width of the image to equal that of the image to completely fill it
myImage.aspect = fillWidth

# Set the height of the image to equal that of the image to completely fill it
myImage.aspect = fillHeight

# Set the height of the image to equal that of the image to completely fill and center it within the bounds of the image
myImage.aspect = fillHeightCenter
### End Example


##############################################################
## Property
then

### Type
<function>

### Description
Allows you to set new properties and animations to the image when the image has finished loading.

### Alias
done,after,finished

### Example
myImage = new Image
	image: 'http://i.imgur.com/fKH3obf.jpg'
	aspect: fill
	scale: 0.5
	opacity: 0
	then: ->
		this.fadeIn 0.3
	parent: Playground

myImage.center()
### End Example

### About Example
The same behaviour can be triggered by using an Event Listener.

### Example
myImage = new Image
	image: 'http://i.imgur.com/fKH3obf.jpg'
	aspect: fill
	scale: 0.5
	opacity: 0
	parent: Playground

myImage.center()

myImage.onLoaded ->
	this.fadeIn 0.3
### End Example


##############################################################
## Method
onLoaded()

### Description
Called when an image has finished loading.

### Alias
onLoad(),onDone()

### Example
myView.onLoaded (event) ->
	log 'Image finished loading'
### End Example

