# Name
View

# Description
Views are the fundamental containers of Magix, which can be positioned using numerical and dynamic values. Views can have they appearance changed using properties such as opacity, background color and rotate. Views can contain content such as images, videos and text.


##############################################################
# Section
Overview

## Description
Learn the various applications of View and how to use it.


## About Example
Views are the basic containers of Magix and are used to create a layout on the screen. Views are objects which need to be initialized. To create a new view, use the keyword 'new'.

## Example
myView = new View
## End Example

## About Example
Views can be given properties in order to changes their appearance on the screen. Examples include background color, width and height.

## Example
# During Initialization
myView = new View
	opacity: 0.5
	backgroundColor: white

# After initialization
myView.clip = yes
## End Example

## About Example
Views can have parent and/or child views. The position of a child is relative to the top left corner of its parent.

## Example
myView = new View
	width: 100
	height: 100
	backgroundColor: blue

myView2 = new View
	x: 50
	y: 0
	width: 50
	height: 50
	backgroundColor: green
	parent: myView
## End Example

## About Example
Views can be positioned anywhere on the screen. If the view does not have a parent view, it will be positioned relative to the top left corner of the window.

## Example
myView = new View
	x: 100
	y: 100

# It can also be centered on its parent view
myView.center()
## End Example

## About Example
Views can have any of their user interface properties animated. In the following example you can click on the view to see it move and rotate with a two second animation.

## Example
myView = new View
	x: 100
	y: 100
	width: 100
	height: 100
	backgroundColor: red
	text: 'Click me'

myView.onClick (event) ->
	if this.x is 100
		this.animate
			x: 300
			rotation: 180
			borderRadius: 50
			backgroundColor: blue
			duration: 2
	else
		this.animate
			x: 100
			rotation: 0
			borderRadius: 0
			backgroundColor: red
			duration: 2
## End Example

## About Example
Events are used to determine when certain things happen and allow you to create interactions around them. Events are added an element in order to listen for the event of the particular element it is attached to. Multiple events can be added to the same element.

## Example
myView = new View
	x: 100
	y: 100
	width: 100
	height: 100
	backgroundColor: blue

myView.draggable.enabled = true

myView.onClick (event) ->
	log 'View clicked'

myView.onDragStart (event) ->
	log 'Drag started'
## End Example




##############################################################
# Section
Positioning

## Description
Adjust the position of the view on the screen.


##############################################################
## Property
x

### Type
<number>

### Description
The x property of a view defines its horizontal position relative to the top left corner.

### Alias
left

### Example
myView = new View
myView.x = 500
### End Example


##############################################################
## Property
y

### Type
<number>

### Description
The y property of a view defines its vertical position relative to the top left corner.

### Alias
top

### Example
myView = new View
myView.y = 500
### End Example


##############################################################
## Property
right

### Type
<number>

### Description
The right property of a view defines its horizontal position relative to the bottom right corner.

### Example
myView = new View
myView.right = 500
### End Example


##############################################################
## Property
bottom

### Type
<number>

### Description
The bottom property of a view defines its vertical position relative to the bottom right corner.

### Example
myView = new View
myView.bottom = 500
### End Example


##############################################################
## Property
minX

### Type
<number>

### Description
The location of the left edge of the view. This is the same as view.x.

### Example
myView = new View
	x: 100
	y: 100
	width: 100
	height: 100

log myView.minX
# Output: 100
### End Example


##############################################################
## Property
midX

### Type
<number>

### Description
The horizontal center of the view.

### Example
myView = new View
	x: 100
	y: 100
	width: 100
	height: 100

log myView.midX
# Output: 150
### End Example


##############################################################
## Property
maxX

### Type
<number>

### Description
The location of the right edge of the view.

### Example
myView = new View
	x: 100
	y: 100
	width: 100
	height: 100

log myView.maxX
# Output: 200
### End Example


##############################################################
## Property
minY

### Type
<number>

### Description
The location of the top edge of the view. This is the same as view.y.

### Example
myView = new View
	x: 100
	y: 100
	width: 100
	height: 100

log myView.minY
# Output: 100
### End Example


##############################################################
## Property
midY

### Type
<number>

### Description
The vertical center of the view.

### Example
myView = new View
	x: 100
	y: 100
	width: 100
	height: 100

log myView.midY
# Output: 150
### End Example


##############################################################
## Property
maxY

### Type
<number>

### Description
The location of the bottom edge of the view.

### Example
myView = new View
	x: 100
	y: 100
	width: 100
	height: 100

log myView.maxY
# Output: 200
### End Example


##############################################################
## Property
point

### Type
<object>

### Description
Set or capture the x and y values of a view.

### Example
myView = new View
	width: 100
	height: 100

log myView.point
# Output: { x: 100, y: 100 }

myView.point =
	x: 10
	y: 200

log myView.point
# Output: { x: 10, y: 200 }

log myView.x
# Output: 10
### End Example


##############################################################
## Property
fixed

### Type
<boolean>

### Description
Set the view to be fixed in a position on the screen. If the value is yes, the view will not move if any of its parents are scrolled.

### Default
no

### Example
myView = new View
myView.fixed = yes
### End Example


##############################################################
## Property
index

### Type
<number>

### Description
The order index for the view. A view with a higher index will be drawn on top of a view with a lower index. The view index of a view increases with the each new view.

### Example
myView = new View
myView2 = new View

# Draw myView2 on top
myView.index = 2
myView2.index = 1
### End Example


##############################################################
## Property
display

### Type
<string or boolean>

### Description
Set the type of box used to place the view in the window.

### Example
myView = new View

# Display the view in 'block'
myView.display = yes

# Does not display the view
myView.display = no

# Inline places views next to each other in a line
myView.display = 'inline'

# Block places the views successively below each other
myView.display = 'block'

# Inline-Block places the views side by side by default
myView.display = 'inline-block'
### End Example


##############################################################
## Method
Show()

### Description
Unhide the view.

### Example
myView = new View
	width: 500
	height: 500

Show myView
# or
myView.show()
### End Example


##############################################################
## Method
Hide()

### Description
Hide the view.

### Example
myView = new View
	width: 500
	height: 500

Hide myView
# or
myView.hide()
### End Example


##############################################################
## Method
center()

### Description
Center a view relative to its parent. If the view has no superview then it will be centered relative to the window. Note that it uses the margin to center the view, not its coordonates. Use absoluteCenter() to center the view using x and y.

### Example
myView = new View
	width: 500
	height: 500

myView.center()
### End Example


##############################################################
## Method
centerY(offset)

### Description
Center a view relative vertically to its parent. If the view has no superview then it will be centered relative to the window. Note that it uses the margin to center the view, not its coordonates. Use absoluteCenterY() to center the view using x and y.

### Example
myView = new View
	width: 500
	height: 500

myView.centerY()
### End Example


##############################################################
## Method
centerX(offset)

### Description
Center a view relative horizontally to its parent. If the view has no superview then it will be centered relative to the window. Note that it uses the margin to center the view, not its coordonates. Use absoluteCenterX() to center the view using x and y.

### Example
myView = new View
	width: 500
	height: 500

myView.centerX()
### End Example


##############################################################
## Method
absoluteCenter()

### Description
Center a view relative to its parent. If the view has no superview then it will be centered relative to the window.

### Example
myView = new View
	width: 500
	height: 500

myView2 = new View
	parent: myView
	width: 100
	height: 100

myView2.absoluteCenter()

log myView2.x, myView2.y
# Output: 200, 200
### End Example


##############################################################
## Method
absoluteCenterX(offset)

### Description
Center a view horizontally relative to its parent. If the view has no superview then it will be entered relative to the window.

### Arguments
offset — A number that offsets the position.
### End Arguments

### Example
myView = new View
	width: 500
	height: 500

myView2 = new View
	parent: myView
	width: 100
	height: 100

myView2.absoluteCenterX()
log myView2.x, myView2.y
# Output: 200, 0

myView2.absoluteCenterX 20
log myView2.x, myView2.y
# Output: 220, 0
### End Example


##############################################################
## Method
absoluteCenterY(offset)

### Description
Center a view vertically relative to its parent. If the view has no superview then it will be entered relative to the window.

### Arguments
offset — A number that offsets the position.
### End Arguments

### Example
myView = new View
	width: 500
	height: 500

myView2 = new View
	parent: myView
	width: 100
	height: 100

myView2.absoluteCenterY()
log myView2.x, myView2.y
# Output: 0, 200

myView2.absoluteCenterY 20
log myView2.x, myView2.y
# Output: 0, 220
### End Example








##############################################################
## Method
cx()

### Description
Returns the x position of the view in pixels on the screen.

### Example
myView = new View
	x: 100

log myView.cx()
### End Example


##############################################################
## Method
cy()

### Description
Returns the y position of the view in pixels on the screen.

### Example
myView = new View
	y: 100

log myView.cy()
### End Example


##############################################################
## Method
centerFrame()

### Description
Returns the frame of the view centered relative to its superview. If the view has no superview then it will be centered relative to the window.

### Example
myView = new View
	width: 500
	height: 500
myView2 = new View
	parent: myView
	width: 100
	height: 100

log myView2.centerFrame()
# Output: { x: 200, y: 200, width: 100, height: 100 }
### End Example


##############################################################
## Method
pixelAlign()

### Description
Round the x and y values of the view to round numbers.

### Example
myView = new View
	x: 100.5602
	y: 10.2029

myView.pixelAlign()

log myView.x, myView.y
# Output: 100, 10
### End Example



##############################################################
# Section
Size

## Description
Adjust the size of the view on the screen.


##############################################################
## Property
width

### Type
<number>

### Description
The width of the view in pixels.

### Alias
w

### Example
myView = new View
myView.width = 500
### End Example


##############################################################
## Property
height

### Type
<number>

### Description
The height of the view in pixels.

### Alias
h

### Example
myView = new View
myView.height = 500
### End Example


##############################################################
## Property
minWidth

### Type
<number>

### Description
The minimum width of the view.

### Example
myView = new View
	width: 100
	minWidth: 80
### End Example


##############################################################
## Property
maxWidth

### Type
<number>

### Description
The maximum width of the view.

### Example
myView = new View
	width: 100
	maxWidth: 120
### End Example


##############################################################
## Property
minHeight

### Type
<number>

### Description
The minimum height of the view.

### Example
myView = new View
	width: 100
	minHeight: 80
### End Example


##############################################################
## Property
maxHeight

### Type
<number>

### Description
The maximum height of the view.

### Example
myView = new View
	width: 100
	maxHeight: 120
### End Example


##############################################################
## Property
size

### Type
<object>

### Description
Set or capture the x and y values of a view.

### Example
myView = new View

log myView.size
# Output: { width: 100, height: 100 }

myView.size =
	width: 10
	height: 10

log myView.size
# Output: { width: 10, height: 10 }

log myView.width
# Output: 10
### End Example


##############################################################
## Property
frame

### Type
<object>

### Description
Set or capture the x, y, width and height values of a view.

### Example
myView = new View

log myView.frame
# Output: { x: 100, y: 100, width: 100, height: 100 }

myView.frame =
	x: 10
	y: 200
	width: 10
	height: 10

log myView.frame
# Output: { x: 10, y: 200, width: 10, height: 10 }

log myView.x
# Output: 10
### End Example


##############################################################
## Property
windowFrame

### Type
<object>

### Description
Set or capture the position of a view relative to the window irrespective of the position of its parents.

### Example
myView = new View
	x: 100

myView2 = new View
	parent: myView
	x: 100

log myView2.windowFrame
# Output: { x: 200, y: 0, width: 100, height: 100 }

myView2.windowFrame =
	x: 400
	y: 0
	width: 100
	height: 100

log myView2.x
# Output: 300
### End Example


##############################################################
## Method
cwidth()

### Description
Returns the width of the view in pixels on the screen.

### Example
myView = new View
	width: 100

log myView.cwidth()
### End Example


##############################################################
## Method
cheight()

### Description
Returns the height of the view in pixels on the screen.

### Example
myView = new View
	height: 100

log myView.cheight()
### End Example


##############################################################
## Method
contentFrame()

### Description
The combined total frame size of the subviews.

### Example
myView = new View

myView2 = new View
	y: 0
	height: 100
	parent: myView

myView3 = new View
	x: 100
	width: 300
	parent: myView

log myView.contentFrame()
# Output: { x: 0, y: 0, width: 400, height: 100 }
### End Example




##############################################################
# Section
Image

## Description
Set an image as the background of the view.


##############################################################
## Property
image

### Type
<string>

### Description
Set a background image to a view. This can be set as a local path or a full url.

### Alias
backgroundImage

### Example
# Asset images
myView = new View
	image: 'logo'

# Web images
myView.image = 'http://exemple.com/path/to/logo.png'
### End Example

### About Example
The Event.ImageLoaded event notifies you when an image is loaded and ready to display. An Event.ImageLoadError event notifies you when there was an error loading an image.

### Example
myView = new View
	image: 'images/logo.png'

# Listen to the loading event
myView.onImageLoaded ->
	log 'The image loaded'

myView.onImageLoadError ->
	log 'The image couldn't be loaded'
### End Example


##############################################################
## Property
imageSize

### Type
<float>

### Description
Set the scale of the background image of the view.

### Default
1.0

### Example
myView = new View
	width: 100
	height: 100
	image: 'https://www.Magix.io/logo.png'
	imageSize: 0.8

### End Example


##############################################################
## Property
imageRepeat

### Type
<boolean>

### Description
Set whether the background image repeats itself within the bounds of the view.

### Example
myView = new View
myView.image = 'https://www.Magix.io/logo.png'
myView.imageRepeat = yes
### End Example


##############################################################
## Property
imageFixed

### Type
<boolean>

### Description
Set the background image of the view to be fixed in a position on the screen. If the value is yes, the background image will not move if the view is scrolled.

### Default
no

### Example
myView = new View
myView.image = 'https://www.Magix.io/logo.png'
myView.imageFixed = yes
### End Example


##############################################################
## Property
imagePosition

### Type
<object>

### Description
Set the position of the background image within the view.

### Example
myView = new View
	x: 100
	y: 100
	image: 'https://www.Magix.io/logo.png'

myView.imagePosition =
	x: 20
	y: 20
### End Example





##############################################################
# Section
Appearance

## Description
Change the appearance of the view and its content.


##############################################################
## Property
opacity

### Type
<string>

### Description
Set the opacity of the view between 0 and 1.

### Alias
alpha

### Example
myView = new View
myView.opacity = 0.5
### End Example


##############################################################
## Property
clip

### Type
<boolean>

### Description
Set whether the view clips its subviews. This is enabled by default.

### Example
myView = new View
	width: 100
	height: 100

myView2 = new View
	width: 200
	height: 200
	parent: myView

myView.clip = no
### End Example


##############################################################
## Property
background

### Type
<string>

### Description
Use to either set the background color of the view or background image. Note that the background image will be set as 'cover' so that the picture fit the whole view.

### Example
myView = new View

myView.background = 'image url'
myView.background = '#00ff00'
### End Example


##############################################################
## Property
backgroundColor

### Type
<string>

### Description
The background color of the view.

### Alias
bc

### Example
myView = new View

myView.backgroundColor = red
myView.backgroundColor = '#00ff00'
myView.backgroundColor = 'rgba(134, 12, 64, 0.3)'
myView.backgroundColor = 'transparent'

# Remove the background color
myView.backgroundColor = 'none'
### End Example


##############################################################
## Property
blur

### Type
<number>

### Description
Add a gaussian blur to the view. It is defined in pixels.

### Default
0

### Example
myView = new View
myView.blur = 10
### End Example


##############################################################
## Property
brightness

### Type
<number>

### Description
Brightens or darkens the view. Setting a value of 0 produces a completely black view. The value to set the view to be completely white is dependent on the color of the view.

### Example
myView = new View
myView.brightness = 10
### End Example


##############################################################
## Property
saturate

### Type
<number>

### Description
Saturates the view. This is defined by a number set between 0 and 100. A value of 0 will remove all saturation.

### Default
100

### Example
myView = new View
myView.saturate = 50
### End Example


##############################################################
## Property
hueRotate

### Type
<number>

### Description
Sets the hue of the view. The rotation is defined by an angle between 0 and 360 degrees.

### Default
0

### Example
myView = new View
myView.hueRotate = 180
### End Example


##############################################################
## Property
contrast

### Type
<number>

### Description
Sets the contrast of the view. This is defined by a number set between 9 and 100. A value of 0 will remove all contrast.

### Default
100

### Example
myView = new View
myView.contrast = 50
### End Example


##############################################################
## Property
invert

### Type
<number>

### Description
Invert the color of the view. Invert is defined as a number between 0 and 100. This property inverts all colors and brightness values of the view.

### Default
0

### Example
myView = new View
myView.invert = 100
### End Example


##############################################################
## Property
grayscale

### Type
<number>

### Description
All colors are converted to gray. This property is defined as a number between 0 and 100.

### Default
0

### Example
myView = new View
myView.grayscale = 100
### End Example


##############################################################
## Property
sepia

### Type
<number>

### Description
Adds a sepia tone to your view. Sepia is defined as a number between 0 to 100.

### Default
0

### Example
myView = new View
myView.sepia = 100
### End Example


##############################################################
## Property
visible

### Type
<boolean>

### Description
Set whether the view is visible or not.

### Example
myView = new View
myView.visible = no
### End Example




##############################################################
# Section
Fullscreen

## Description
Enter and exit a view in fullscreen.


##############################################################
## Method
enterFullScreen()

### Description
Enter full screen mode. The view is centered and the background becomes black.

### Example
myView = new View
myView.enterFullScreen()
### End Example



##############################################################
## Method
exitFullScreen()

### Description
Exit full screen mode. The view will go back return to its original position.

### Example
myView = new View
myView.enterFullScreen()

myView.exitFullScreen()
### End Example



##############################################################
## Method
isFullScreen()

### Description
Check whether the view is currently in full screen.

### Example
myView = new View
myView.enterFullScreen()

log view.isFullScreen()
# Output: True
### End Example




##############################################################
# Section
Shadows

## Description
Set a shadow to the view and customize its appearance.


##############################################################
## Property
shadowX

### Type
<number>

### Description
This defines the direction of the shadow on the x-axis. A shadow will be produced on the right edge of the view if the value is positive and on the left edge if the value is negative. The shadow produced will only be visible if the shadowColor property is defined.

### Example
myView = new View
myView.shadowX = 10
### End Example


##############################################################
## Property
shadowY

### Type
<number>

### Description
This defines the direction of the shadow on the y-axis. A shadow will be produced on the bottom edge of the view if the value is positive and on the top edge if the value is negative. The shadow produced will only be visible if the shadowColor property is defined.

### Example
myView = new View
myView.shadowY = 10
### End Example


##############################################################
## Property
shadowBlur

### Type
<number>

### Description
Adds a Gaussian blur to the shadowX or shadowY property. This property is defined with a number.

### Default
0

### Example
myView = new View
myView.shadowY = 1
myView.shadowBlur = 4
### End Example


##############################################################
## Property
shadowSpread

### Type
<number>

### Description
Makes the shadow larger in every direction. Negative values cause the shadow to contract. The shadow produced will only be visible if the shadowColor property is defined.

### Example
myView = new View
myView.shadowY = 1
myView.shadowBlur = 4
myView.shadowSpread = 2
### End Example


##############################################################
## Property
shadowColor

### Type
<string>

### Description
Sets the color of the shadow of the view. The color is expressed as a string in the CSS color format.

### Example
myView = new View
myView.shadowY = 1
myView.shadowBlur = 4
myView.shadowColor = 'rgba(0,0,0,0.2)'
### End Example


##############################################################
## Property
shadowInset

### Type
<boolean>

### Description
Set whether the shadow is inside or outside of the view bounds. A value of yes will set the shadow inside the view bounds.

### Default
no

### Example
myView = new View
myView.shadowY = 1
view.shadowInset = yes
### End Example




##############################################################
# Section
Border

## Description
Set a border to the view and customize its appearance.


##############################################################
## Property
borderRadius

### Type
<number>

### Description
Rounds the corners of a view in pixels.

### Alias
cornerRadius,br

### Example
myView = new View
myView.borderRadius = 3

# To create a circle:
myView.borderRadius = myView.width/2
### End Example


##############################################################
## Property
borderStyle

### Type
<string>

### Description
Set the style of the border.

### Example
myView = new View

# No border
myView.borderStyle = 'none'

# Dotted border
myView.borderStyle = 'dotted'

# Dashed border
myView.borderStyle = 'dashed'

# Solid border
myView.borderStyle = 'solid'

# Double border
myView.borderStyle = 'double'

# Groove border
myView.borderStyle = 'groove'

# Ridge border
myView.borderStyle = 'ridge'

# Inset border
myView.borderStyle = 'inset'

# Outset border
myView.borderStyle = 'outset'

# Hidden border
myView.borderStyle = 'hidden'
### End Example


##############################################################
## Property
borderColor

### Type
<string>

### Description
Set the border color of the view. The color is expressed as a string in the CSS color format.

### Example
myView = new View
myView.borderColor = 'red'
myView.borderWidth = 2
### End Example


##############################################################
## Property
borderWidth

### Type
<number>

### Description
Set the width of the view border in pixels.

### Example
myView = new View
myView.borderWidth = 2
myView.borderColor = 'red'
### End Example


##############################################################
## Property
borderTopWidth

### Type
<number>

### Description
Set the width of the top view border on the left in pixels.

### Example
myView = new View
myView.borderTopWidth = 2
myView.borderColor = 'red'
### End Example


##############################################################
## Property
borderLeftWidth

### Type
<number>

### Description
Set the width of the left view border on the left in pixels.

### Example
myView = new View
myView.borderLeftWidth = 2
myView.borderColor = 'red'
### End Example


##############################################################
## Property
borderRightWidth

### Type
<number>

### Description
Set the width of the right view border on the left in pixels.

### Example
myView = new View
myView.borderRightWidth = 2
myView.borderColor = 'red'
### End Example


##############################################################
## Property
borderBottomWidth

### Type
<number>

### Description
Set the width of the bottom view border on the left in pixels.

### Example
myView = new View
myView.borderBottomWidth = 2
myView.borderColor = 'red'
### End Example


##############################################################
## Property
borderTopLeftRadius

### Type
<number>

### Description
Rounds the top left corner of the view in pixels.

### Example
myView = new View
myView.borderTopLeftRadius = 5
### End Example


##############################################################
## Property
borderTopRightRadius

### Type
<number>

### Description
Rounds the top right corner of the view in pixels.

### Example
myView = new View
myView.borderTopRightRadius = 5
### End Example


##############################################################
## Property
borderBottomLeftRadius

### Type
<number>

### Description
Rounds the bottom left corner of the view in pixels.

### Example
myView = new View
myView.borderBottomLeftRadius = 5
### End Example


##############################################################
## Property
borderBottomRightRadius

### Type
<number>

### Description
Rounds the bottom right corner of the view in pixels.

### Example
myView = new View
myView.borderBottomRightRadius = 5
### End Example


##############################################################
## Property
borderTopColor

### Type
<string>

### Description
Set the border color of the top side of view. The color is expressed as a string in the CSS color format.

### Example
myView = new View
myView.borderTopColor = 'red'
myView.borderWidth = 2
### End Example


##############################################################
## Property
borderBottomColor

### Type
<string>

### Description
Set the border color of the bottom side of view. The color is expressed as a string in the CSS color format.

### Example
myView = new View
myView.borderBottomColor = 'red'
myView.borderWidth = 2
### End Example


##############################################################
## Property
borderLeftColor

### Type
<string>

### Description
Set the border color of the left side of view. The color is expressed as a string in the CSS color format.

### Example
myView = new View
myView.borderLeftColor = 'red'
myView.borderWidth = 2
### End Example


##############################################################
## Property
borderRightColor

### Type
<string>

### Description
Set the border color of the right side of view. The color is expressed as a string in the CSS color format.

### Example
myView = new View
myView.borderRightColor = 'red'
myView.borderWidth = 2
### End Example






##############################################################
# Section
Scroll

## Description
Control the scroll behavior of a view


##############################################################
## Property
scroll

### Type
<boolean>

### Description
Allow the view to be scrolled.

### Example
myView = new View
	scroll: yes

# Returns the horizontal scroll position whenever the view is scrolled
myView.onScroll (event) ->
	log this.scrollTop
### End Example


##############################################################
## Property
scrollHorizontal

### Type
<boolean>

### Description
Allow the view to be scrolled horizontally.

### Example
myView = new View
	scrollHorizontal: yes
### End Example


##############################################################
## Property
scrollVertical

### Type
<boolean>

### Description
Allow the view to be scrolled vertically.

### Example
myView = new View
	scrollVertical: yes
### End Example


##############################################################
## Property
scrollTop

### Type
<number>

### Alias
scrollY

### Description
Set or capture the horizontal scroll position in the view.

### Example
myView = new View
myView.scroll = yes

myView.scrollTop = 50
### End Example


##############################################################
## Property
scrollLeft

### Type
<number>

### Alias
scrollX

### Description
Set or capture the vertical scroll position in the view.

### Example
myView = new View
myView.scroll = yes

myView.scrollLeft = 50
### End Example


##############################################################
## Property
scrollWidth

### Type
<number>

### Read only

### Description
Returns the width of the scroll content.

### Example
myView = new View
	x: 100
	y: 100
	width: 200
	height: 100
	backgroundColor: red
	scroll: yes

myView2 = new View
	x: 50
	y: 0
	width: 200
	height: 100
	backgroundColor: blue
	parent: myView

log myView.scrollWidth
# Output: 250
### End Example


##############################################################
## Property
scrollHeight

### Type
<number>

### Read only

### Description
Returns the height of the scroll content.

### Example
myView = new View
	x: 100
	y: 100
	width: 200
	height: 100
	backgroundColor: red
	scroll: yes

myView2 = new View
	x: 0
	y: 50
	width: 200
	height: 100
	backgroundColor: blue
	parent: myView

log myView.scrollHeight
### End Example



##############################################################
## Property
scrollFrame

### Type
<object>

### Description
Returns the frame of the scroll content.

### Example
myView = new View
	scroll: yes

# Set the scroll position horizontally and vertically
myView.scrollFrame =
	x: 50
	y: 70	
### End Example


##############################################################
## Method
onScroll()

### Description
Called when a view is scrolled.

### Example
myView.onScroll (event) ->
	# Get the vertical scroll position
	log this.scrollTop
### End Example




##############################################################
# Section
Transformations

## Description
Change the shape of the view in 2D and 3D.

##############################################################
## Property
originX

### Type
<number>

### Description
The x origin of a view for transformations. This is defined to be a number between 0 and 1, where 0 is the left edge of the transformed view and 1 is the right edge. The default value is the center of the view at a value of 0.5.

### Example
myView = new View
myView.rotation = 45
myView.originX = 0
myView.originX = 1
### End Example


##############################################################
## Property
originY

### Type
<number>

### Description
The origin of a view for transformations. This is defined to be a number between 0 and 1, where 0 is the top edge of the transformed view and 1 is the bottom edge. The default value is the center of the view at a value of 0.5.

### Example
myView = new View
myView.rotation = 45
myView.originY = 0
myView.originY = 1
### End Example


##############################################################
## Property
translate

### Type
<number>

### Description
Set the translation of the view. This will change the position of the view relative to its current position.

### Example
myView = new View
	x: 100
	y: 100

myView.translate =
	x: 50
	y: 100

log myView.point
# Output: {x = 150, y = 200}
### End Example


##############################################################
## Property
translateX

### Type
<number>

### Description
Set the horizontal translation of the view. This will change the horizontal position of the view relative to its current position.

### Example
myView = new View
	x: 100

myView.translateX = 50

log myView.point
# Output: {x = 150}
### End Example


##############################################################
## Property
translateY

### Type
<number>

### Description
Set the vertical translation of the view. This will change the vertical position of the view relative to its current position.

### Example
myView = new View
	y: 100

myView.translateY = 100

log myView.point
# Output { y = 200 }
### End Example



##############################################################
## Property
translateZ

### Type
<number>

### Description
Moves the element along the z-axis of the 3D space.

### Example
myView = new View
	perspective: 500 # Add a perspective to create a 3d space
	translateZ: 50
### End Example


##############################################################
## Property
rotation

### Type
<number>

### Description
Set the rotation of the view relative to the transform origin. Rotation is defined to be between 0 and 360 degrees.

### Alias
rotate

### Example
myView = new View
myView.rotation = 45
### End Example


##############################################################
## Property
rotationX

### Type
<number>

### Description
Set the x rotation of the view relative to the transform origin. Rotation is defined to be between 0 and 360 degrees.

### Alias
rotateX

### Example
myView = new View
myView.rotationX = 45
### End Example


##############################################################
## Property
rotationY

### Type
<number>

### Description
Set the y rotation of the view relative to the transform origin. Rotation is defined to be between 0 and 360 degrees.

### Alias
rotateY

### Example
myView = new View
myView.rotationY = 45
### End Example


##############################################################
## Property
rotationZ

### Type
<number>

### Description
Set the z rotation of the view relative to the transform origin. Rotation is defined to be between 0 and 360 degrees. This is the same as view.rotation.

### Alias
rotateZ

### Example
myView = new View
myView.rotationZ = 45
### End Example


##############################################################
## Property
perspective

### Type
<number>

### Description
Sets the perspective for subviews. Perspective gives depth to 3D properties like view.RotationX and view.RotationY. The perspective can be set between 1 and infinity where 1 delivers a huge perspective. An isometric effect is given by setting a perspective of 0.

### Example
myView = new View

# Set the perspective for all sub views
myView.perspective = 100

myView2 = new View
	parent: myView
	rotationX: 30
	rotationY: 30
### End Example



##############################################################
## Property
preserve3D

### Type
<number>

### Description
Specifies that child elements will preserve its 3D position.

### Example
myView = new View
	perspective: 100
	translateZ: 50

# Children will keep the translate from parent
myView.preserve3D = yes

myView2 = new View
	rotationX: 30
	rotationY: 30
	parent: myView
### End Example


##############################################################
## Property
scale

### Type
<number>

### Description
Set the scale of the view relative to the transform origin. Any number above one will increase the size of the view and vice versa.

### Default
1.0

### Example
myView = new View
myView.scale = 2
myView.scale = 0.5
### End Example


##############################################################
## Property
scaleX

### Type
<number>

### Description
Set the horizontal scale of the view relative to the transform origin. Any number above one will increase the size of the view and vice versa.

### Default
1.0

### Example
myView = new View
myView.scaleX = 2
myView.scaleX = 0.5
### End Example


##############################################################
## Property
scaleY

### Type
<number>

### Description
Set the vertical scale of the view relative to the transform origin. Any number above one will increase the size of the view and vice versa.

### Default
1.0

### Example
myView = new View
myView.scaleY = 2
myView.scaleY = 0.5
### End Example


##############################################################
## Property
skewX

### Type
<number>

### Description
Set the horizontal skew of the view. This value is defined by a angle between 0 and 360 degrees.

### Default
0.0

### Example
myView = new View
myView.skewX = 10
### End Example


##############################################################
## Property
skewY

### Type
<number>

### Description
Set the vertical skew of the view. This value is defined by a angle between 0 and 360 degrees.

### Default
0.0

### Example
myView = new View
myView.skewY = 10
### End Example



##############################################################
# Section
View Hierarchy

## Description
Set and determine the parent and child views of the view.


##############################################################
## Property
parent

### Type
<View object>

### Description
Sets the superview of the view.

### Example
myView = new View
myView2 = new View
	parent = myView

log myView2.parent
# Output: <Object:View myView>

# Remove from parent
myView2.parent = null
### End Example


##############################################################
## Method
addChild(view)

### Description
Add a view as a child view to the view.

#Alias
add()

### Arguments
view — A view object.
### End Arguments

### Example
myView = new View
myView2 = new View

myView.add myView2

log myView2.parent
# Output: <Object:View myView>
### End Example


##############################################################
## Method
removeChild()

### Description
Remove a subview from the view.

#Alias
remove()

### Arguments
view — A view object.
### End Arguments

### Example
myView = new View

myView2 = new View
	parent: myView

myView.remove myView2

log myView2.parent
# Output: null
### End Example






##############################################################
## Property
children

### Type
<array>

### Read only

### Description
All of the subviews of the view.

### Example
myView = new View

myView2 = new View
	parent: myView

myView3 = new View
	parent: myView

log myView.children
# Output: [<Object:View myView2>, <Object:View myView3>]
### End Example


##############################################################
## Method
childrenWithName()

### Description
Returns all children of this view with the selected name.

### Arguments
name — A string of the view name.
### End Arguments

### Example
myView = new View

myView2 = new View
	name: 'navigation'
	parent: myView

myView3 = new View
	name: 'button'
	parent: myView

log myView.childrenWithName('button')
# Output: [<Object:View myView3>]
### End Example






##############################################################
## Method
removeAll()

### Description
Remove all subviews from the view.

### Alias
empty

### Example
myView = new View

myView2 = new View
	parent: myView

myView3 = new View
	parent: myView

myView.removeAll()

log myView2.parent
# Output: null

log myView3.parent
# Output: null
### End Example


##############################################################
## Method
siblings()

### Description
Returns all views which are also subviews to the same superview as the view.

### Example
myView = new View

myView2 = new View
	parent: myView

myView3 = new View
	parent: myView

log myView2.siblings()
# Output: [<Object:View myView3>]
### End Example


##############################################################
## Method
siblingsWithName()

### Description
Returns all siblings of this view with the selected name.

### Arguments
name — A string of the view name.
### End Arguments

### Example
myView = new View

myView2 = new View
	name: 'navigation'
	parent: myView

myView3 = new View
	name: 'button'
	parent: myView

log myView2.siblingsWithName('button')
# Output: [<Object:View myView3>]
### End Example



##############################################################
## Method
descendants()

### Description
Returns all views which are children of a specific view.

### Example
myView = new View

myView2 = new View
	parent: myView

myView3 = new View
	parent: myView

log myView.descendants()
# Output: [<Object:View myView2>, <Object:View myView3>]
### End Example


##############################################################
## Method
ancestors()

### Description
Gather all the parents that lead to the view.

### Example
myView = new View

myView2 = new View
	parent: myView

myView3 = new View
	parent: myView

log myView3.ancestors()
# Output: [<Object:View myView>]
### End Example



##############################################################
## Method
bringToFront()

### Description
Places the view in front of all other views with the same parent.

### Example
viewA = new View
viewB = new View
viewC = new View

# Draw viewA on top 
viewA.bringToFront()
### End Example


##############################################################
## Method
sendToBack()

### Description
Places the view behind all other views with the same parent.

### Example
viewA = new View
viewB = new View
viewC = new View

# Draw viewC last
viewC.sendToBack()
### End Example


##############################################################
## Method
placeBefore()

### Description
Places the view before another view. It changes the view.index property for at least one of the views. 

### Example
viewA = new View
viewB = new View

# Place viewB on top
viewB.placeBefore(viewA)
### End Example



##############################################################
## Method
placeBehind()

### Description
Places the view behind another view. It changes the view.index property for at least one of the views. 

### Example
viewA = new View
viewB = new View

# Place viewB on top
viewA.placeBehind(viewB)
### End Example







##############################################################
# Section
States

## Description
Set a view state to the view. A view state is a collection of properties and values which can be taken on by the view at any time.


##############################################################
## Method
states.add(name, states)

### Description
Adds a view state to a view. A view state is a collection of properties and values which can be taken on by the view at any time. Each view state must have name. The default view state contains the properties and value with which the view was created.

### Arguments
name — A string that is the title of the state.
states — A collection of objects with view properties and values.
### End Arguments

### Example
myView = new View

# Add a single state
myView.states.add
	stateA:
		x: 500
		opacity: 0.5

# Add a multiple states
myView.states.add
	stateA:
		x: 500
		opacity: 0.5
	stateB:
		x: 200
		opacity: 1
### End Example


##############################################################
## Method
states.remove(name)

### Description
Remove a view state by name.

### Arguments
name — A string, the title of the state.
### End Arguments

### Example
myView = new View

myView.states.add
	stateA:
		x: 500
		opacity: 0.5

myView.states.remove 'stateA'
### End Example


##############################################################
## Method
states.switch(name)

### Description
Switch the view to a new view state. The transition between states will be animated. By default, view.states.options will be used.

### Arguments
name — A string, the title of the state.
### End Arguments

### Example
myView = new View

myView.states.add
	stateA:
		x: 500
		opacity: 0.5

myView.states.switch 'stateA'
### End Example


##############################################################
## Method
states.switchInstant(name)

### Description
Switch the view to a new view state without animating.

### Arguments
name — A string, the title of the state.
### End Arguments

### Example
myView = new View

myView.states.add
	stateA:
		x: 500
		opacity: 0.5

myView.states.switchInstant 'stateA'
### End Example


##############################################################
## Property
states.current

### Type
<string>

### Read only

### Description
Get the name of the current view state of the view.

### Arguments
name — A string, the title of the state.
### End Arguments

### Example
myView = new View

myView.states.add
	stateA:
		x: 500
		opacity: 0.5

myView.states.switchInstant 'stateA'

log myView.states.current
# Output: stateA
### End Example




##############################################################
## Method
onStateSwitch()

### Description
Called when the current view state change.

### Example
myView.onStateSwitch (event) ->
	log 'state switched'
### End Example

##############################################################
## Method
onStateWillSwitch()

### Description
Called when the current view state is about to change.

### Example
myView.onStateWillSwitch (event) ->
	log 'state switched event start'
### End Example


##############################################################
## Method
onStateDidSwitch()

### Description
Called when the current view state has been changed.

### Example
myView.onStateDidSwitch (event) ->
	log 'state switched event ended'
### End Example




##############################################################
# Section
Margin and Padding

## Description
Set the margin and padding of the view.


##############################################################
## Property
margin

### Type
<object>

### Description
Add an external margin to the view. This will displace the view relative to its current position.

### Alias
mg

### Example
myView = new View
	x: 30
	y: 40

myView.margin =
	top: 50
	left: 40
### End Example


##############################################################
## Property
marginTop

### Type
<number>

### Description
Add an external margin to the top side of the view. This will displace the view relative to its current position.

### Example
myView = new View
	x: 30
	y: 40
	marginTop: 50
### End Example


##############################################################
## Property
marginBottom

### Type
<number>

### Description
Add an external margin to the bottom side of the view. This will displace the view relative to its current position.

### Example
myView = new View
	x: 30
	y: 40
	marginBottom: 50
### End Example


##############################################################
## Property
marginLeft

### Type
<number>

### Description
Add an external margin to the left side of the view. This will displace the view relative to its current position.

### Example
myView = new View
	x: 30
	y: 40
	marginLeft: 50
### End Example


##############################################################
## Property
marginRight

### Type
<number>

### Description
Add an external margin to the right side of the view. This will displace the view relative to its current position.

### Example
myView = new View
	x: 30
	y: 40
	marginRight: 50
### End Example


##############################################################
## Property
marginX

### Type
<number>

### Description
Add an external margin to the left and right sides of the view. This will displace the view relative to its current position.

### Example
myView = new View
	x: 30
	y: 40
	marginX: 50
### End Example


##############################################################
## Property
marginY

### Type
<number>

### Description
Add an external margin to the top and bottom sides of the view. This will displace the view relative to its current position.

### Example
myView = new View
	x: 30
	y: 40
	marginY: 50
### End Example


##############################################################
## Property
padding

### Type
<object>

### Description
Add a padding (internal margin) to the view.

### Alias
pg

### Example
myView = new View
	x: 30
	y: 40

myView.padding =
	top: 50
	left: 40
### End Example


##############################################################
## Property
paddingTop

### Type
<number>

### Description
Add a padding (internal margin) to the top side of the view.

### Example
myView = new View
	x: 30
	y: 40
	paddingTop: 50
### End Example


##############################################################
## Property
paddingBottom

### Type
<number>

### Description
Add a padding (internal margin) to the bottom side of the view.

### Example
myView = new View
	x: 30
	y: 40
	paddingBottom: 50
### End Example


##############################################################
## Property
paddingLeft

### Type
<number>

### Description
Add a padding (internal margin) to the left side of the view.

### Example
myView = new View
	x: 30
	y: 40
	paddingLeft: 50
### End Example


##############################################################
## Property
paddingRight

### Type
<number>

### Description
Add a padding (internal margin) to the right side of the view.

### Example
myView = new View
	x: 30
	y: 40
	paddingRight: 50
### End Example


##############################################################
## Property
paddingX

### Type
<number>

### Description
Add a padding (internal margin) to the left and right sides of the view.

### Example
myView = new View
	x: 30
	y: 40
	paddingX: 50
### End Example


##############################################################
## Property
paddingY

### Type
<number>

### Description
Add a padding (internal margin) to the top and bottom sides of the view.

### Example
myView = new View
	x: 30
	y: 40
	paddingY: 50
### End Example




##############################################################
# Section
Animations

## Description
Set and customize any animations on the view.

##############################################################
## Method
animate(options)

### Description
Start animating the view. The animation options argument allow you to input the properties to be animated. Running this method creates an animation object. You can stop or reverse the animation.

### Example
myView = new View

# Animate scale and rotation
myView.animate
	scale: 0.5
	rotation: 90
	time: 5
### End Example

### About Example
In the example below, there is a 2 second delay between every repeat.

### Example
# Repeat and delay the animation
myView.animate
	x: 100
	repeat: 5
	delay: 2
### End Example


##############################################################
## Method
animateStop()

### Description
Stop all animations running on the view immediately.

### Example
myView = new View

# Stop an animation immediately
myView.animate x: 100

myView.animateStop()
### End Example


##############################################################
## Method
animations()

### Description
Get all current animations running on the view.

### Example
myView = new View

myView.animate x: 100

myView.animate y: 100

log myView.animations()
# Output: [<Object Animation>, <Object Animation>]
### End Example


##############################################################
## Method
animationProperties()

### Description
Get all the properties of the view which are being animated.

### Example
myView = new View

myView.animate
	x: 100
	y: 100

log myView.animationProperties()
# Output: [ x, y ]
### End Example


##############################################################
## Property
isAnimating

### Type
<boolean>

### Read only

### Description
See if the view is animating

### Example
myView = new View

myView.animate
	x: 100

log myView.isAnimating
# Result: True
### End Example


##############################################################
## Property
hover

### Type
<object>

### Description
Set properties to change when the mouse hovers over it.

### Example
myView = new View
	backgroundColor: red

myView.hover:
	backgroundColor: blue
	scale: 1.6
### End Example

##############################################################
## Property
hoverAnimated

### Type
<object>

### Description
Set properties to animate the view to when the mouse hovers over it.

### Example
myView = new View
	backgroundColor: 'red'

myView.hoverAnimated:
	backgroundColor: orange
	scale: 1.6
	options:
		curve: 'ease-out'
### End Example


##############################################################
## Property
transition

### Type
<boolean / object>

### Description
Set whether graphical property changes are animated.

### Example
myView = new View
	x: 0
	y: 0
	width: 100
	height: 100
	transition: yes

# Change properties
myView.x = 100
myView.y = 100

# Custom transition
myView2 = new View
	transition:
		duration: 0.4
		delay: 0.3
		curve: 'ease-in'
### End Example




##############################################################
## Method
fadeIn(time)

### Description
Fade in the view during a set amount of time.

### Example
myView = new View
	x: 0
	y: 0
	width: 100
	height: 100
	opacity: 0

# Fade in the view over 0.5 seconds
myView.fadeIn 0.5
### End Example


##############################################################
## Method
fadeOut(time)

### Description
Fade out the view during a set amount of time.

### Example
myView = new View
	x: 0
	y: 0
	width: 100
	height: 100

# Fade out the view over 0.5 seconds
myView.fadeOut 0.5
### End Example


##############################################################
## Method
onAnimationStart()

### Description
Called when an animation has started.

### Example
myView.onAnimationStart (event) ->
	log 'Animation started'
### End Example


##############################################################
## Method
onAnimationStop()

### Description
Called when an animation has stopped.

### Example
myView.onAnimationStop (event) ->
	log 'Animation stopped'
### End Example


##############################################################
## Method
onAnimationEnd()

### Description
Called when an animation has ended.

### Example
myView.onAnimationEnd (event) ->
	log 'Animation ended'
### End Example






##############################################################
# Section
Element

## Description
Properties of the HTML element.


##############################################################
## Property
id

### Type
<number>

### Description
An identification number which is unique to the view. The view id is read only.

### Example
myView = new View
log myView.id
# Output 1
### End Example


##############################################################
## Property
name

### Type
<string>

### Description
The name of a view. Views aren’t named by default.

### Example
myView = new View
myView.name = 'Button'

log myView.name
# Output: 'Button'
### End Example


##############################################################
## Property
props

### Type
<object>

### Description
Set or capture all of the properties of a view.

### Example
myView = new View
	x: 100
	y: 100

# Get current view properties
log view.props
# Output: { x: 100, y: 100, ...}

# Set properties
myView.props =
	rotation: 90
	opacity: 0.5
### End Example


##############################################################
## Property
cursor

### Type
<string>

### Description
Change the appearance of the cursor when it enters the frame of a view.

### Example
myView = new View
	cursor: 'pointer'
### End Example


##############################################################
## Property
do

### Type
<function>

### Description
Perform an action as soon as the property is being registered by the view.

### Example
myView = new View
	do: ->
		log 2 + 2
### End Example


##############################################################
## Property
html

### Type
<string>

### Description
Insert any type of html content into the view. If the html content added into the view requires user interaction, set view.ignoreEvent to no.

### Example
myView = new View

# Add simple text content
myView.html = 'Hello'

# Add inline styled text content
myView.html = 'I'm <span style='color:red'>Steve</span>'

# Add an input field
myView.html = '<input type='text' value='Hello'>'
### End Example


##############################################################
## Property
classList

### Type
<ClassList object>

### Description
A list of class attributes for the view. It contains methods to add, remove, toggle and check for classes.

### Example
myView = new View

# Add the class .red
myView.classList.add 'red'

# Remove the class .red
myView.classList.remove 'red'

# Toggle the class .red
myView.classList.toggle 'red'

# See if the view has class .red
log myView.classList.contains('red')
# Output: yes
### End Example




##############################################################
## Property
interaction

### Type
<boolean>

### Description
Set whether the view will interacted with the user. Setting as no will disable user interaction for the view.

### Alias
userInteraction

### Default
yes

### Example
myView = new View
	interaction: no
### End Example


##############################################################
## Property
pointerEvent

### Type
<boolean>

### Description
Set whether the view will interacted with the mouse events. Setting as no, the mouse event will go "through" the view and target whatever is "underneath" that view instead.

### Alias
pointerEvents,ignoreEvent

### Default
yes

### Example
myView = new View
	pointerEvent: no
### End Example


##############################################################
## Property
delegate

### Type
<class object>

### Description
Add a delegate to a subclassed view. This allows the view to call method which create in the class in which it is instantiated. The following example shows the App and 2 subclasses which show a simple method being invoked using delegates. The first code example shows App.

### Example
# Import fonts
App.fonts =
	name: 'Open Sans'
	weight: '400,300'

# Start the app
App.launch ->
	App.page = new HomePage
		backgroundColor: white
### End Example

Subclassed HomePage

### Example
blue = new BlueView
	delegate: this
	parent: this
		
HomePage::logHi = (name) ->
	log 'Hi ' + name + '!'
### End Example

Subclassed BlueView

### Example	
this.props
	x: 100
	y: 100
	width: 100
	height: 100
	backgroundColor: blue
	click: ->
		if this.delegate != undefined and this.delegate.logHi != undefined
			this.delegate.logHi 'Etienne'
### End Example


##############################################################
## Property
style

### Type
<object>

### Description
Directly edit the CSS properties of the view. This allows you to use properties which are not released on Magix.

### Example
myView = new View

# Modify a single style property
myView.style['outline'] = '1px solid red'

# Get a specific style property
log myView.style['outline']
# Output: '1px solid red'
### End Example


##############################################################
## Method
computedStyle()

### Description
Get all the current applied CSS style properties for the view. Note that this is an expensive operation for the browser. For a full reference on computed style, see this overview.

### Example
myView = new View
myView.backgroundColor = red

log view.computedStyle()['background-color']
# Output: 'red'
### End Example

# The window is resized to meet the rules set using mediaQuery.

log view.x
# Output { x = 0 }
### End Example


##############################################################
## Method
copy()

### Description
Copy the view and all of its subviews. All properties will be the same. Event listeners will not be copied.

### Example
myView = new View
myView2 = new View
	parent: myView

myView3 = myView.copy()
### End Example


##############################################################
## Method
copySingle()

### Description
Copy the view without its subviews. All properties will be the same. Event listeners will not be copied.

### Example
myView = new View
myView2 = new View
	parent: myView

myView3 = myView.copySingle()
### End Example


##############################################################
## Method
destroy()

### Description
Remove the view from the view hierarchy and all of its listeners. All subviews will also be destroyed.

### Example
myView = new View
myView.destroy()
### End Example



##############################################################
# Section
Event Listeners

## Description
Event listeners can be added to the view.

##############################################################
## Method
on(eventName, handler)

### Description
Add an event listener to the view. When the event is called the first argument will be the event information, such as the mouse position. The second argument will always be the view which the event occurred in.

### Example
myView = new View
myView.name = 'myView'

myView.on Event.Click, (event, view) ->
	log 'Clicked ' + view.name

# Output: 'Clicked', 'myView'
### End Example


##############################################################
## Method
off(eventName, handler)

### Description
Remove an event listener from the view.

### Example
myView = new View
myView.name = 'myView'

clickHandler = (event, view) ->
	log 'This view was clicked', view.name

myView.on Event.Click, clickHandler
myView.off Event.Click, clickHandler
### End Example


##############################################################
## Method
emit()

### Description
Create an event. This will be a software based event which you can call anytime in your code.

### Example
myView = new View
	name: 'myView'

myView.emit 'exampleEvent', value

myView.on 'exampleEvent', (event, view) ->
	log myView.name

log myView.x
# Output: { x = 50 }
### End Example






##############################################################
# Section
Quick Events

## Description
Pointer events which can be used like properties for easy implementation.


##############################################################
## Property
click

### Type
<function>

### Description
Event fires when the view is clicked.

### Example
myView = new View
	width: 100
	height: 100
	backgroundColor: purple
	click: ->
		log 'View clicked'
### End Example


##############################################################
## Property
doubleClick

### Type
<function>

### Description
Event fires when the view is double clicked.

### Example
myView = new View
	width: 100
	height: 100
	backgroundColor: pink
	doubleClick: ->
		log 'View double clicked'
### End Example


##############################################################
## Property
down

### Type
<function>

### Description
Event fires when the mouse clicks down on the view.

### Alias
mouseDown

### Example
myView = new View
	width: 100
	height: 100
	backgroundColor: violet
	down: ->
		log 'View clicked down'
### End Example


##############################################################
## Property
over

### Type
<function>

### Description
Event fires when the mouse pointer is moved onto an view.

### Alias
mouseOver

### Example
myView = new View
	width: 100
	height: 100
	backgroundColor: green
	over: ->
		log 'moved'
### End Example


##############################################################
## Property
up

### Type
<function>

### Description
Event fires when the mouse releases the click on the view.

### Alias
mouseUp

### Example
myView = new View
	width: 100
	height: 100
	backgroundColor: yellow
	up: ->
		log 'Click released'
### End Example


##############################################################
## Property
in

### Type
<function>

### Description
Event fires when the pointer enters the frame of the view.

### Alias
mouseIn

### Example
myView = new View
	width: 100
	height: 100
	backgroundColor: blue
	in: ->
		log 'View frame entered'
### End Example


##############################################################
## Property
out

### Type
<function>

### Description
Event fires when the pointer exits the frame of the view.

### Alias
mouseOut

### Example
myView = new View
	width: 100
	height: 100
	backgroundColor: green
	out: ->
		log 'View frame exited'
### End Example







##############################################################
# Section
Cursor Events

## Description
Monitor each of the actions of the mouse.


##############################################################
## Method
onClick()

### Description
Called when the view is clicked.

### Example
myView.onClick (event) ->
	log 'View clicked'
### End Example


##############################################################
## Method
onDoubleClick()

### Description
Called when the view is double clicked.

### Example
myView.onDoubleClick (event) ->
	log 'View double clicked'
### End Example


##############################################################
## Method
onRightClick()

### Description
Called when the view is right clicked.

### Example
myView.onRightClick (event) ->
	log 'View right clicked'
	return no
### End Example


##############################################################
## Method
onMouseIn()

### Description
Called when the cursor enters the frame of the view.

### Alias
onIn()

### Example
myView.onMouseIn (event) ->
	log 'Cursor entered the frame'
### End Example


##############################################################
## Method
onMouseOut()

### Description
Called when the cursor leaves the frame of the view.

### Alias
onOut()

### Example
myView.onMouseOut (event) ->
	log 'Cursor left the frame'
### End Example


##############################################################
## Method
onMouseDown()

### Description
Called when the user clicks down on the view.

### Alias
onDown()

### Example
myView.onMouseDown (event) ->
	log 'Mouse clicked down on the view'
### End Example


##############################################################
## Method
onMouseUp()

### Description
Called when the user releases the click on the view.

### Alias
onUp()

### Example
myView.onMouseUp (event) ->
	log 'Mouse released click on the view'
### End Example

##############################################################
## Method
onMouseMove()

### Description
Called when the cursor is moved inside the frame of the view.

### Alias
onMove()

### Example
myView.onMouseMove (event) ->
	log 'Mouse moved'
### End Example


##############################################################
## Method
onWheel()

### Description
Called when the mouse wheel is scrolling.

### Alias
onWheel()

### Example
myView.onMouseWheel (event) ->
	log 'Wheel scrolling'
### End Example


##############################################################
## Method
onScroll()

### Description
Called when a view is scrolled.

### Example
myView.onScroll (event) ->
	# Get the vertical scroll position
	log this.scrollTop
### End Example






##############################################################
# Section
Change Events

## Description
Called when there are any graphical changes made to elements in the layout.


##############################################################
## Method
Change.x

### Description
Called when the x position of the view has changed.

### Example
myView.on Change.x, (event) ->
	log myView.x
### End Example


##############################################################
## Method
Change.y

### Description
Called when the y position of the view has changed.

### Example
myView.on Change.y, (event) ->
	log myView.y
### End Example


##############################################################
## Method
Change.point

### Description
Called when the x or y position of the view has changed.

### Example
myView.on Change.point, (event) ->
	log myView.point.x
### End Example


##############################################################
## Method
Change.width

### Description
Called when the width of the view has changed.

### Example
myView.on Change.width, (event) ->
	log myView.width
### End Example


##############################################################
## Method
Change.height

### Description
Called when the height of the view has changed.

### Example
myView.on Change.height, (event) ->
	log myView.height
### End Example


##############################################################
## Method
Change.size

### Description
Called when the width or height of the view has changed.

### Example
myView.on Change.size, (event) ->
	log myView.size.width
### End Example


##############################################################
## Method
Change.frame

### Description
Called when the width, height, x or y positions of the view has changed.

### Example
myView.on Change.frame, (event) ->
	log myView.frame.x
### End Example


##############################################################
## Method
Change.rotation

### Description
Called when the view has rotated.

### Example
myView.on Change.rotation, (event) ->
	log myView.rotation
### End Example


##############################################################
## Method
Change.borderRadius

### Description
Called when the border radius of the view has changed.

### Example
myView.on Change.borderRadius, (event) ->
	log myView.borderRadius
### End Example


##############################################################
## Method
Change.style

### Description
Called when the style of the view is changed.

### Example
myView.on Change.style, (event) ->
	log myView.style
### End Example


##############################################################
## Method
Change.html

### Description
Called when html content is inserted into a view.

### Example
myView.on Change.html, (event) ->
	log 'html inserted'
### End Example


##############################################################
## Method
Change.children

### Description
Called when a child view is added or removed from the view.

### Example
myView.on Change.children, (event) ->
	log 'Child view removed'
### End Example


##############################################################
## Method
Change.parent

### Description
Called when the view is added or removed from a parent view.

### Example
myView.on Change.parent, (event) ->
	log 'Removed from parent view'
### End Example




##############################################################
# Section
Touch Events

## Description
Touch screen events.


##############################################################
## Method
onTouchStart()

### Description
Called when the user touches down on the screen.

### Example
myView.onTouchStart ->
	log 'Touch start'
### End Example


##############################################################
## Method
onTouchEnd()

### Description
Called when the user removes their finger from the screen.

### Example
myView.onTouchStart ->
	log 'Touch end'
### End Example


##############################################################
## Method
onTouchMove()

### Description
Called when the user moves their finger on the screen.

### Example
myView.onTouchStart (event) ->
	log 'Touch moved'
### End Example





##############################################################
# Section
View Lifecycle

## Description
Event which fire when the view appears (added) and disappears (removed) from its superview.


##############################################################
## Method
willAppear()

### Description
Call a function when the view is about to appear. This can only be called in a subclassed View.

### Example
# TO USE IN SUBCLASS
Extends View

willAppear : ->
	log 'View is about to appear'
### End Example


##############################################################
## Method
didAppear()

### Description
Call a function when the view has appeared. This can only be called in a subclassed View.

### Example
# TO USE IN SUBCLASS
Extends View

didAppear : ->
	log 'View has appeared'
### End Example


##############################################################
## Method
willDisappear()

### Description
Call a function when the view is about to disappear. This can only be called in a subclassed View.

### Example
# TO USE IN SUBCLASS
Extends View

willDisappear : ->
	log 'View is about to disappear'
### End Example


##############################################################
## Method
didDisappear()

### Description
Call a function when the view has disappeared. This can only be called in a subclassed View.

### Example
# TO USE IN SUBCLASS
Extends View

didDisappear : ->
	log 'View has disappeared'
### End Example


##############################################################
## Method
onWillAppear()

### Description
Event called when an view is about to appear.

### Example
myView.onWillAppear (event) ->
	log 'About to appear'
### End Example


##############################################################
## Method
onDidAppear()

### Description
Event called when an view has appeared.

### Alias
onAppear()

### Example
myView.onAppear (event) ->
	log 'View appeared'
### End Example


##############################################################
## Method
onWillDisappear()

### Description
Event called when an view is about to disappear.

### Example
myView.onWillAppear (event) ->
	log 'About to appear'
### End Example


##############################################################
## Method
onDidDisappear()

### Description
Event called when an view has disappeared (view removed).

### Alias
onDisappear()

### Example
myView.onAppear (event) ->
	log 'View appeared'
### End Example




##############################################################
# Section
Draggable

## Description
Enable dragging and related behaviours.


##############################################################
## Property
draggable.enabled

### Type
<boolean>

### Description
Enable dragging on the view.

### Example
myView = new View
	x: 100
	y: 100
	width: 100
	height: 100
	backgroundColor: blue

myView.draggable.enabled = yes
### End Example


##############################################################
## Property
draggable.horizontal

### Type
<boolean>

### Description
Enable or disable horizontal dragging.

### Example
myView = new View
	x: 100
	y: 100
	width: 100
	height: 100
	backgroundColor: pink

myView.draggable.enabled = yes
myView.draggable.horizontal = yes
### End Example


##############################################################
## Property
draggable.vertical

### Type
<boolean>

### Description
Enable or disable vertical dragging.

### Example
myView = new View
	x: 100
	y: 100
	width: 100
	height: 100
	backgroundColor: purple

myView.draggable.enabled = yes
myView.draggable.vertical = yes
### End Example


##############################################################
## Property
draggable.speedX

### Type
<number>

### Description
The horizontal dragging speed of the view. This is set between 0 and 1. At 0 the view will not move horizontally. At 1 the view will move at the same horizontal speed as the cursor.

### Example
myView = new View
	x: 100
	y: 100
	width: 100
	height: 100
	backgroundColor: green

myView.draggable.enabled = yes

# Slower than the cursor
myView.draggable.speedX = 0.5

# Faster than the cursor
myView.draggable.speedY = 5
### End Example


##############################################################
## Property
draggable.speedY

### Type
<number>

### Description
The vertical dragging speed of the view. At 0 the view will not move vertically. At 1 the view will move at the same vertical speed as the cursor.

### Example
myView = new View
	x: 100
	y: 100
	width: 100
	height: 100
	backgroundColor: red

myView.draggable.enabled = yes

# Slower than the cursor
myView.draggable.speedY = 0.5

# Faster than the cursor
myView.draggable.speedY = 5
### End Example


##############################################################
## Property
draggable.constraints

### Type
<object>

### Description
Create an area in the view's parent in which the view can be dragged. If the view is dragged outside of the constraint area and released, it will be animated back into the constraints.

### Example
myView = new View
	x: 100
	y: 100
	width: 100
	height: 100
	backgroundColor: orange

myView.draggable.enabled = yes

# Set dragging constraints
myView.draggable.constraints =
	x: 0
	y: 0
	width: 500
	height: 500
### End Example


##############################################################
## Property
draggable.constraintsOffset

### Type
<object>

### Description
The position of the view compared to the constraint area.

### Example
myView = new View
	x: 100
	y: 100
	width: 100
	height: 100
	backgroundColor: blue

myView.draggable.enabled = yes

# Set dragging constraints
myView.draggable.constraints =
	x: 0
	y: 0
	width: 500
	height: 500

log view.draggable.constraintsOffset
# Output: {x: -100, y: -100}
### End Example


##############################################################
## Property
draggable.isBeyondConstraints

### Type
<boolean>

### Read only

### Description
Returns whether the view is outside the bounds of the constraint area.

### Example
myView = new View
	x: 100
	y: 100
	width: 100
	height: 100
	backgroundColor: blue

myView.draggable.enabled = yes

# Set dragging constraints
myView.draggable.constraints =
	x: 0
	y: 0
	width: 500
	height: 500

# When the mouse move, see if the view is beyond constraints or not
myView.onMouseMove (event) ->
	log myView.draggable.isBeyondConstraints
### End Example


##############################################################
## Property
draggable.overdrag

### Type
<boolean>

### Description
Enable or disable whether the view can be dragged outside the constraint area.

### Example
myView = new View
	x: 100
	y: 100
	width: 100
	height: 100
	backgroundColor: yellow

myView.draggable.enabled = yes
myView.draggable.overdrag = yes

# Set dragging constraints
myView.draggable.constraints =
	x: 0
	y: 0
	width: 500
	height: 500
### End Example


##############################################################
## Property
draggable.overdragScale

### Type
<number>

### Description
The amount of resistance encountered when dragging the view outside the constraint area. This value is between 0 and 1.

### Default
0.5

### Example
myView = new View
	x: 100
	y: 100
	width: 100
	height: 100
	backgroundColor: yellow

myView.draggable.enabled = yes
view.draggable.overdragScale = 0.5

# Set dragging constraints
myView.draggable.constraints =
	x: 0
	y: 0
	width: 500
	height: 500
### End Example


##############################################################
## Property
draggable.momentum

### Type
<boolean>

### Description
Enable or disable momentum simulation.

### Default
yes

### Example
myView = new View
	x: 100
	y: 100
	width: 100
	height: 100
	backgroundColor: orange

myView.draggable.enabled = yes
view.draggable.momentum = yes
### End Example


##############################################################
## Property
draggable.momentumOptions

### Type
<object>

### Description
Options for momentum simulation.

### Example
myView = new View
	x: 100
	y: 100
	width: 100
	height: 100
	backgroundColor: purple

myView.draggable.enabled = yes

myView.draggable.momentumOptions =
	friction: 2.5
	tolerance: 0.2
### End Example


##############################################################
## Property
draggable.bounce

### Type
<boolean>

### Description
Enable or disable the spring animation which returns the view within the constraints area.

### Example
myView = new View
	x: 100
	y: 100
	width: 100
	height: 100
	backgroundColor: purple

myView.draggable.enabled = yes
myView.draggable.bounce = yes

# Set dragging constraints
myView.draggable.constraints =
	x: 0
	y: 0
	width: 500
	height: 500
### End Example


##############################################################
## Property
draggable.bounceOptions

### Type
<object>

### Description
Options for the bounce animation.

### Example
myView = new View
	x: 100
	y: 100
	width: 100
	height: 100
	backgroundColor: blue

myView.draggable.enabled = yes

myView.draggable.bounceOptions =
	friction: 40
	tension: 200
	tolerance: 0.0001

# Set dragging constraints
myView.draggable.constraints =
	x: 0
	y: 0
	width: 500
	height: 500
### End Example


##############################################################
## Property
draggable.velocity

### Type
<object>

### Read only

### Description
Returns the current velocity of the view.

### Example
myView = new View
	x: 100
	y: 100
	width: 100
	height: 100
	backgroundColor: blue

myView.draggable.enabled = yes

# On DragMove, log the x and y velocity
myView.draggable.onDragMove (event) ->
	log myView.draggable.velocity
### End Example


##############################################################
## Property
draggable.direction

### Type
<string>

### Read only

### Description
Returns the current dragging direction of the view. It can return "up", "down", "left" and "right".

### Example
myView = new View
	x: 100
	y: 100
	width: 100
	height: 100
	backgroundColor: red

myView.draggable.enabled = yes

# On DragMove, log the x and y velocity
myView.draggable.onDragMove (event) ->
	log myView.draggable.direction
### End Example


##############################################################
## Property
draggable.angle

### Type
<number>

### Read only

### Description
Returns the current direction of movement of the view is degrees.

### Example
myView = new View
	x: 100
	y: 100
	width: 100
	height: 100
	backgroundColor: green

myView.draggable.enabled = yes

# On DragMove, log the x and y velocity
myView.draggable.on Event.DragMove, ->
	log myView.draggable.angle
### End Example


##############################################################
## Property
draggable.updatePosition(point)

### Description
This function overrides the position of the view before setting it. This allows you to create any behaviour for the view.

### Example
myView = new View
	x: 100
	y: 100
	width: 100
	height: 100
	backgroundColor: blue

myView.draggable.enabled = yes

# Drag in increments of 100px
myView.draggable.updatePosition = (point) ->
	point.x = Utils.round(point.x, 100)
	point.y = Utils.round(point.y, 100)
	return point
### End Example


##############################################################
## Property
draggable.directionLock

### Type
<boolean>

### Description
Cap the horizontal and vertical dragging after a certain threshold.

### Example
myView = new View
	x: 100
	y: 100
	width: 100
	height: 100
	backgroundColor: blue

myView.draggable.enabled = yes

# Allow dragging only in one direction at a time
myView.draggable.directionLock = yes
### End Example


##############################################################
## Property
draggable.directionLockThreshold

### Type
<object>

### Description
Set the horizontal and vertical distance away the view must be before it starts locking.

### Example
myView = new View
	x: 100
	y: 100
	width: 100
	height: 100
	backgroundColor: blue

myView.draggable.enabled = yes

# Snap after 100px dragged in the x directly
# No vertical movement
myView.draggable.directionLock = yes

myView.draggable.directionLockThreshold =
	x: 100
	y: 0
### End Example


##############################################################
## Property
draggable.pixelAlign

### Type
<boolean>

### Description
Round the x and y values of the view to round numbers.

### Example
myView = new View
	x: 100
	y: 100
	width: 100
	height: 100
	backgroundColor: red

myView.draggable.enabled = yes
myView.draggable.pixelAlign = yes
### End Example


##############################################################
## Property
draggable.isDragging

### Type
<boolean>

### Read only

### Description
Returns whether the view is currently being dragged.

### Example
myView = new View
	x: 100
	y: 100
	width: 100
	height: 100
	backgroundColor: green

myView.draggable.enabled = yes

# Check if the view is being dragged
myView.onDragMove (event) ->
	log myView.draggable.isDragging
### End Example


##############################################################
## Property
draggable.isAnimating

### Type
<boolean>

### Read only

### Description
Returns whether the view is currently being animated by momentum or bounce animations.

### Example
myView = new View
	x: 100
	y: 100
	width: 100
	height: 100
	backgroundColor: orange

myView.draggable.enabled = yes

# Check if the view is being animated
myView.onDragMove (event) ->
	log myView.draggable.isAnimating
### End Example


##############################################################
## Property
draggable.isMoving

### Type
<boolean>

### Read only

### Description
Returns whether the view is currently moving, either by dragging or momentum/bounce animations.

### Example
myView = new View
	x: 100
	y: 100
	width: 100
	height: 100
	backgroundColor: blue

myView.draggable.enabled = yes

# Check if the view is being moved
myView.onDragMove (event) ->
	log myView.draggable.isMoving
### End Example


##############################################################
## Property
draggable.offset

### Type
<object>

### Read only

### Description
Returns the position of the view relative to the top left corner of the window.

### Example
myView = new View
	x: 100
	y: 100
	width: 100
	height: 100
	backgroundColor: red

myView.draggable.enabled = yes

myView.onDragMove (event) ->
	log myView.draggable.offset
### End Example


##############################################################
## Property
draggable.viewStartPoint

### Type
<object>

### Read only

### Description
Returns the position of a draggable view.

### Example
myView = new View
	x: 100
	y: 100
	width: 100
	height: 100
	backgroundColor: blue

myView.draggable.enabled = yes

myView.onDragStart (event) ->
	log myView.draggable.viewStartPoint
### End Example


##############################################################
## Property
draggable.cursorStartPoint

### Type
<object>

### Read only

### Description
Returns the position of the cursor relative to the to the Canvas.

### Example
myView = new View
	x: 100
	y: 100
	width: 100
	height: 100
	backgroundColor: purple

myView.draggable.enabled = yes

myView.onDragStart (event) ->
	log myView.draggable.cursorStartPoint
### End Example


##############################################################
## Property
draggable.viewCursorOffset

### Type
<object>

### Read only

### Description
Returns the position of the cursor relative to the top left corner of the view.

### Example
myView = new View
	x: 100
	y: 100
	width: 100
	height: 100
	backgroundColor: purple

myView.draggable.enabled = yes

myView.onDragStart (event) ->
	log myView.draggable.viewCursorOffset
### End Example


##############################################################
## Property
draggable.propagateEvent

### Type
<boolean>

### Description
Enable or disable whether draggable child views can pass events to their parent view. Setting to no prevents child views from passing events to the parent view.

### Default
yes

### Example
myView.draggable.propagateEvent = no
### End Example



##############################################################
## Method
onDragStart()

### Description
Called when the view has started being dragged.

### Example
myView.onDragStart (event) ->
	log 'Drag started'
### End Example


##############################################################
## Method
onDragWillMove()

### Description
Called when the view is about to start to move.

### Example
myView.onDragWillMove (event) ->
	log 'Drag will start'
### End Example


##############################################################
## Method
onDragMove()

### Description
Called when the view is moving.

### Alias - Event.DragDidMove, Event.Drag

### Example
myView.onDragDidMove (event) ->
	log 'View being dragged'
### End Example


##############################################################
## Method
onDragEnd()

### Description
Called when the drag has ended.

### Example
myView.onDragEnd (event) ->
	log 'Drag has ended'
### End Example


##############################################################
## Method
onDragAnimationDidStart()

### Description
Called when the view starts being animated after the drag.

### Example
myView.onDragAnimationDidStart (event) ->
	log 'Drag animation started'
### End Example


##############################################################
## Method
onDragAnimationDidEnd()

### Description
Called when the view finishes being animated after the drag.

### Example
myView.onDragAnimationDidEnd (event) ->
	log 'Drag animation ended'
### End Example


##############################################################
## Method
onDirectionLockDidStart()

### Description
Called when the drag is locked to a single direction.

### Example
myView.onDirectionLockDidStart (event) ->
	log 'Drag direction locked'
### End Example





##############################################################
# Section
Files Drag/Drop Events

## Description
Monitor Drag/Drop events when a file enter the browser window


##############################################################
## Method
onDragEnter()

### Description
Called when a file enters the view frame.

### Example
myView.onDragEnter (event) ->
	log 'File enter'
### End Example


##############################################################
## Method
onDragOver()

### Description
Called when the file is being moved over the view frame.

### Example
myView.onDragOver (event) ->
	log 'File is moving over the view'
### End Example


##############################################################
## Method
onDragLeave()

### Description
Called when the file leaves the view frame.

### Example
myView.onDragLeave (event) ->
	log 'File has left the frame'
### End Example


##############################################################
## Method
onDrop()

### Description
Called when the file has been dropped over the view frame.

### Example
myView.onDrop (event) ->
	log 'File has been dropped over the view frame'
### End Example




##############################################################
# Section
Gestures Events

## Description
Monitor guestures events on the view.


##############################################################
## Method
onTap()

### Description
Called when the view has been tapped.

### Example
myView.onTap (event) ->
	log 'tapped'
### End Example


##############################################################
## Method
onTapStart()

### Description
Called when the view is being tapped.

### Example
myView.onTapStart (event) ->
	log 'tap event start'
### End Example


##############################################################
## Method
onTapEnd()

### Description
Called when the view has been tapped.

### Example
myView.onTapEnd (event) ->
	log 'tap event ended'
### End Example


##############################################################
## Method
onDoubleTap()

### Description
Called when the view has been doubled tapped.

### Example
myView.onDoubleTap (event) ->
	log 'view double tapped'
### End Example



##############################################################
## Method
onForceTap()

### Description
Called when the view has been force tapped.

### Example
myView.onTap (event) ->
	log 'force tapped'
### End Example


##############################################################
## Method
onForceTapChange()

### Description
Called when the force event change.

### Example
myView.onForceTapChange (event) ->
	log 'force tap pressure change'
### End Example


##############################################################
## Method
onForceTapStart()

### Description
Called when the view is being force tapped.

### Example
myView.onForceTapStart (event) ->
	log 'force tap event start'
### End Example


##############################################################
## Method
onForceTapEnd()

### Description
Called when the view has been force tapped.

### Example
myView.onForceTapEnd (event) ->
	log 'force tap event ended'
### End Example




##############################################################
## Method
onLongPress()

### Description
Called when the view has been long pressed.

### Example
myView.onLongPress (event) ->
	log 'view long pressed'
### End Example


##############################################################
## Method
onLongPressStart()

### Description
Called when the view is being long pressed.

### Example
myView.onLongPressStart (event) ->
	log 'long pressed start'
### End Example


##############################################################
## Method
onLongPressEnd()

### Description
Called when the view has been long pressed.

### Example
myView.onLongPressEnd (event) ->
	log 'long pressed ended'
### End Example




##############################################################
## Method
onSwipe()

### Description
Called when the view has been swiped.

### Example
myView.onSwipe (event) ->
	log 'view swiped'
### End Example


##############################################################
## Method
onSwipeStart()

### Description
Called when the view is being swiped.

### Example
myView.onSwipeStart (event) ->
	log 'swipe event start'
### End Example


##############################################################
## Method
onSwipeEnd()

### Description
Called when the view has been swiped.

### Example
myView.onSwipeEnd (event) ->
	log 'swipe event ended'
### End Example



##############################################################
## Method
onSwipeUp()

### Description
Called when the view has been swiped up.

### Example
myView.onSwipeUp (event) ->
	log 'view swiped'
### End Example


##############################################################
## Method
onSwipeUpStart()

### Description
Called when the view is being swiped up.

### Example
myView.onSwipeUpStart (event) ->
	log 'swipe event start'
### End Example


##############################################################
## Method
onSwipeUpEnd()

### Description
Called when the view has been swiped up.

### Example
myView.onSwipeUpEnd (event) ->
	log 'swipe event ended'
### End Example



##############################################################
## Method
onSwipeDown()

### Description
Called when the view has been swiped down.

### Example
myView.onSwipeDown (event) ->
	log 'view swiped'
### End Example


##############################################################
## Method
onSwipeDownStart()

### Description
Called when the view is being swiped down.

### Example
myView.onSwipeDownStart (event) ->
	log 'swipe event start'
### End Example


##############################################################
## Method
onSwipeDownEnd()

### Description
Called when the view has been swiped down.

### Example
myView.onSwipeDownEnd (event) ->
	log 'swipe event ended'
### End Example


##############################################################
## Method
onSwipeLeft()

### Description
Called when the view has been swiped left.

### Example
myView.onSwipeLeft (event) ->
	log 'view swiped'
### End Example


##############################################################
## Method
onSwipeLeftStart()

### Description
Called when the view is being swiped left.

### Example
myView.onSwipeLeftStart (event) ->
	log 'swipe event start'
### End Example


##############################################################
## Method
onSwipeLeftEnd()

### Description
Called when the view has been swiped left.

### Example
myView.onSwipeLeftEnd (event) ->
	log 'swipe event ended'
### End Example


##############################################################
## Method
onSwipeRight()

### Description
Called when the view has been swiped right.

### Example
myView.onSwipeDown (event) ->
	log 'view swiped'
### End Example


##############################################################
## Method
onSwipeRightStart()

### Description
Called when the view is being swiped right.

### Example
myView.onSwipeDownStart (event) ->
	log 'swipe event start'
### End Example


##############################################################
## Method
onSwipeRightEnd()

### Description
Called when the view has been swiped right.

### Example
myView.onSwipeRightEnd (event) ->
	log 'swipe event ended'
### End Example



##############################################################
## Method
onPan()

### Description
Called when the view has been panned.

### Example
myView.onPan (event) ->
	log 'view panned'
### End Example


##############################################################
## Method
onPanStart()

### Description
Called when the view is being panned.

### Example
myView.onPanStart (event) ->
	log 'pan event start'
### End Example


##############################################################
## Method
onPanEnd()

### Description
Called when the view has been panned.

### Example
myView.onPanEnd (event) ->
	log 'pan event ended'
### End Example


##############################################################
## Method
onPanLeft()

### Description
Called when the view has been panned left.

### Example
myView.onPanLeft (event) ->
	log 'view panned'
### End Example

##############################################################
## Method
onPanRight()

### Description
Called when the view has been panned right.

### Example
myView.onPanRight (event) ->
	log 'view panned'
### End Example

##############################################################
## Method
onPanUp()

### Description
Called when the view has been panned up.

### Example
myView.onPanUp (event) ->
	log 'view panned'
### End Example

##############################################################
## Method
onPanDown()

### Description
Called when the view has been panned down.

### Example
myView.onPanDown (event) ->
	log 'view panned'
### End Example





	

