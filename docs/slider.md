# Name
Slider

# Description
The Slider is a fully customisable slider view. Using the slider you can adjust any view property or numeric values. The slider is composed of three views: the slider, the fill and the knob.

# Extends
view


##############################################################
## Overview
Overview

### Description
Slider is an input view which allows a user to pick from a range of values set by you. They can be given the same properties as the view.

### Example
number = new Text
	x: 100
	y: 100
	align: center
	width: 200
	height: 20
	text: '0'

mySlider = new Slider
	x: 100
	y: 150
	width: 200
	min: -50
	max: 50

mySlider.onValueChange ->
	number.text = Utils.round(mySlider.value, 0).toString()
### End Example

### About Example
You can change the appearance of Slider by customising the knob and the fill of the slider bar.

### Example
mySlider = new Slider
	x: 100
	y: 150
	width: 300
	knobSize: 25
	value: 0
	min: 0
	max: 100

mySlider.knob.props
	backgroundColor: '#52CAF2'
	borderRadius: 2
	shadowBlur: 4
	width: 70
	height: 30

mySlider.fill.backgroundColor = 'black';

number = new Text
	align: center
	text: '0'
	parent: mySlider.knob

number.center()

mySlider.onValueChange ->
	number.text = Utils.round(mySlider.value, 0).toString()
### End Example


##############################################################
## Property
knob

### Type
<view>

### Description
The knob of the slider. Its appearance can be completely customized.

### Example
sliderA = new Slider
sliderA.center()

# customize the appearance
sliderA.knob.shadowY = 2
sliderA.knob.shadowBlur = 4
sliderA.knob.borderRadius = 6
### End Example


##############################################################
## Property
knobSize

### Type
<number>

### Description
The size the knob. This automatically sets its width and height.

### Example
sliderA = new Slider
sliderA.center()

# Customize the appearance
sliderA.knobSize = 12
sliderA.knob.borderRadius 6
### End Example

##############################################################
## Property
fill

### Type
<view>

### Description
Set the fill of the slider.

### Example
sliderA = new Slider
sliderA.center()

# Customize the backgroundColor of the fill
sliderA.fill.backgroundColor = '#ffffff'
### End Example


##############################################################
## Property
value

### Type
<number>

### Read only

### Description
The value of the slider. This is the position of the knob along the slider relative to slider.min and slider.max.

### Default - Value is 0.5.

### Example
sliderA = new Slider
sliderA.center()

sliderA.min = -5
sliderA.max = 5

log sliderA.value
# Output: 0
### End Example

### About Example
You can listen to the value changes of the slider using the onValueChange event. This is useful for retrieving the value and mapping it to a property of another view.

### Example
sliderA = new Slider

sliderA.onValueChange, ->
	# Change the opacity of myView using the slider
	myView.opacity = this.value
	return log this.value
### End Example


##############################################################
## Method
pointForValue()

### Description
Takes the values and returns its corresponding point on the slider.

### Example
# Create a Slider
slider = new Slider
	width: 200

sliderA.center()

log sliderA.pointForValue(0.5)
# Output: 100
### End Example


##############################################################
## Method
valueForPoint()

### Description
Takes the point on the slider and returns its corresponding value.

### Example
# Create a Slider
slider = new Slider
	width: 200

sliderA.center()

log sliderA.valueForPoint(100)
# Output: 0.5
### End Example

##############################################################
## Property
min

### Type
<number>

### Description
Set the minimum value of the slider.

### Default
0

### Example
sliderA = new Slider
sliderA.center()

sliderA.min = -5
### End Example

##############################################################
## Property
max

### Type
<number>

### Description
Set the maximum value of the slider.

### Default
1

### Example
sliderA = new Slider
sliderA.center()

sliderA.min = -5
sliderA.max = 5

log sliderA.value
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
# Create a Slider
slider = new Slider
sliderA.center()

# Animate to 1
sliderA.animateToValue 1

# Animate with a custom curve
sliderA.animateToValue 0,
	curve: 'spring(400,40,0)'
### End Example


##############################################################
## Method
onValueChange()

### Description
Called when the value of the slider changes.

### Example
sliderA = new Slider

sliderA.onValueChange, ->
	# Change the opacity of myView using the slider
	myView.opacity = this.value
	return log this.value
### End Example



