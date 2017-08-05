# Name
Canvas

# Description
A canvas is a type of view which allows you to draw graphics within its bounds. For more information see here. Canvas is created in the same way as View and can be given all properties available to View.

# Extends
view

##############################################################
## Method
getContext

### Description
Return the context of the canvas that allow you to draw.

### Example
myCanvas = new Canvas
	width: 600
	height: 400

context = myCanvas.getContext('2d')

### End Example


