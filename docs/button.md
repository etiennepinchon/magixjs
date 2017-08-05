# Name
Button

# Description
Buttons are the basic click event containers of Magix. They inherit all of the buttons properties and methods and as such can be customized in the same way.

# Extends
view,text


##############################################################
## Overview
Overview

### Description
Buttons are views that have a click component which allows users to interact with them using the pointer. Buttons can be given all of the same properties as the view.

### Example
myButton = new Button
	x: 100
	y: 100
	width: 250
	height: 250
	click: ->
		log 'This is a button'
### End Example

### About Example
The click action has been broken down into multiple properties which give more detailed control over the event.

### Example
myButton = new Button
	x: 100
	y: 100
	width: 250
	height: 250
	click: ->
		log 'Clicked on the button'
	down: ->
		log 'Click down'
	up: ->
		log 'Release click'
### End Example


##############################################################
## Property
icon

### Type
<string>

### Description
Setting an icon to the button will set the buttons size and aspect ratio to match that of the icon. This is useful to create icon sized buttons.

### Example
myButton = new Button
	x: 100
	y: 100
	icon: 'icon.png'
### End Example


##############################################################
## Method
onClick()

### Description
Called when the view is clicked.

### Example
myButton.onClick (event) ->
	log 'View clicked'
### End Example


##############################################################
## Method
onDoubleClick()

### Description
Called when the view is double clicked.

### Example
myButton.onDoubleClick (event) ->
	log 'View double clicked'
### End Example


##############################################################
## Method
onRightClick()

### Description
Called when the view is right clicked.

### Example
myButton.onRightClick (event) ->
	log 'View right clicked'
	return no
### End Example


##############################################################
## Method
onMouseIn()

### Description
Called when the cursor enters the frame of the button.

### Alias
onIn()

### Example
myButton.onMouseIn (event) ->
	log 'Cursor entered the frame'
### End Example


##############################################################
## Method
onMouseOut()

### Description
Called when the cursor leaves the frame of the button.

### Alias
onOut()

### Example
myButton.onMouseOut (event) ->
	log 'Cursor left the frame'
### End Example


##############################################################
## Method
onMouseDown()

### Description
Called when the user clicks down on the button.

### Alias
onDown()

### Example
myButton.onMouseDown (event) ->
	log 'Mouse clicked down on the button'
### End Example


##############################################################
## Method
onMouseUp()

### Description
Called when the user releases the click on the button.

### Alias
onUp()

### Example
myButton.onMouseUp (event) ->
	log 'Mouse released click on the button'
### End Example

##############################################################
## Method
onMouseMove()

### Description
Called when the cursor is moved inside the frame of the button.

### Alias
onMove()

### Example
myButton.onMouseMove (event) ->
	log 'Mouse moved'
### End Example



##############################################################
## Property
click

### Type
<function>

### Description
Event fires when the view is clicked.

### Example
myButton = new Button
	text: 'Text'
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
myButton = new Button
	text: 'Text'
	doubleClick: ->
		log 'View double clicked'
### End Example


##############################################################
## Property
down

### Type
<function>

### Description
Event fires when the mouse clicks down on the button.

### Alias
mouseDown

### Example
myButton = new Button
	text: 'Text'
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
myButton = new Button
	text: 'Text'
	over: ->
		log 'moved'
### End Example


##############################################################
## Property
up

### Type
<function>

### Description
Event fires when the mouse releases the click on the button.

### Alias
mouseUp

### Example
myButton = new Button
	text: 'Text'
	up: ->
		log 'Click released'
### End Example


##############################################################
## Property
in

### Type
<function>

### Description
Event fires when the pointer enters the frame of the button.

### Alias
mouseIn

### Example
myButton = new Button
	text: 'Text'
	in: ->
		log 'View frame entered'
### End Example


##############################################################
## Property
out

### Type
<function>

### Description
Event fires when the pointer exits the frame of the button.

### Alias
mouseOut

### Example
myButton = new Button
	text: 'Text'
	out: ->
		log 'View frame exited'
### End Example




