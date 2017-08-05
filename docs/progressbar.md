# Name
ProgressBar

# Description
The ProgressBar view is a fully customisable progress bar. Using the progressBar you can show the progress of a task and adjust any view property or numeric values based on that progress. The progressBar is composed of two views: the progressBar and the fill.

# Extends
view,slider

##############################################################
## Overview
Overview

### Description
ProgressBar is used to show the progress of a task over time. It can be given the same properties as the view.

### Example
mySlider = new Slider
	x: 100
	y: 100
	width: 200
	knobSize: 25

myProgressBar = new ProgressBar
	x: 100
	y: 140
	width: 200

mySlider.onValueChange ->
	myProgressBar.value = mySlider.value
### End Example

### About Example
You can change the appearance of ProgressBar by customising the fill and the progress bar.

### Example
myProgressBar = new ProgressBar
	x: 100
	y: 140
	width: 200
	height: 20
	borderRadius: 3

myProgressBar.fill.backgroundColor = 'black'
myProgressBar.fill.height = 20
### End Example


##############################################################
## Property
fill

### Type
<view>

### Description
Set the fill of the progressBar.

### Example
myProgressBar = new ProgressBar
	x: 100
	y: 100
	width: 200

# customize the background color of the fill
myProgressBar.fill.backgroundColor = '#ffffff'
### End Example


##############################################################
## Property
value

### Type
<number>

### Read only

### Description
The value of the progressBar. This is the position of the progress along the progressBar relative to progressBar.min and progressBar.max.

### Default
0.5

### Example
myProgressBar = new ProgressBar
myProgressBar.center()

myProgressBar.min = -5
myProgressBar.max = 5

log myProgressBar.value
# Output: 0
### End Example

### About Example
You can listen to the value changes of the progressBar using the onValueChange event. This is useful for retrieving the value and mapping it to a property of another view.

### Example
myView = new View

myProgressBar.onValueChange, ->
	# Change the opacity of myView using the progressBar
	myView.opacity = this.value
	log this.value
### End Example

##############################################################
## Method
pointForValue()

### Description
Takes the values and returns its corresponding point on the progressBar.

### Example
# Create a ProgressBar
myProgressBar = new ProgressBar
	width: 200

myProgressBar.center()

log myProgressBar.pointForValue(0.5)
# Output: 100
### End Example

##############################################################
## Method
valueForPoint()

### Description
Takes the point on the progressBar and returns its corresponding value.

### Example
# Create a ProgressBar
myProgressBar = new ProgressBar
	width: 200

myProgressBar.center()

log myProgressBar.valueForPoint(100)
# Output: 0.5
### End Example


##############################################################
## Property
min

### Type
<number>

### Description
Set the minimum value of the progressBar.

### Default - Value is 0.

### Example
myProgressBar = new ProgressBar
myProgressBar.center()

myProgressBar.min = -5
### End Example


##############################################################
## Property
max

### Type
<number>

### Description
Set the maximum value of the progressBar.

### Default - Value is 1.

### Example
myProgressBar = new ProgressBar
myProgressBar.center()

myProgressBar.min = -5
myProgressBar.max = 5

log myProgressBar.value
# Output: 0
### End Example


##############################################################
## Method
animateToValue(value, animationOptions)

### Description
Animate to a specific value.

### Arguments
value — A number, ranging from the min to the max value.
animationOptions — An object with curve, time, delay and repeat properties. (Optional)
### End Arguments

### Example
# Create a ProgressBar
myProgressBar = new ProgressBar
myProgressBar.center()

# Animate to 1
myProgressBar.animateToValue 1

# Animate with a custom curve
myProgressBar.animateToValue 0,
	curve: 'spring(400,40,0)'
### End Example


