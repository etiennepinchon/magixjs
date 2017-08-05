# Name
Animation

# Description
Animation is used to animate views and their properties. Animations have a start and end point and animate with a defined curve.



##############################################################
# Section
Overview

## Description
Learn the various applications of Animation and how to use it.

## About Example
Animation can be create to animate views by setting the properties of the to be animated. In the following example an animation with a linear curve will be added to a view.

## Example
myView = new View
	x: 100
	y: 100
	width: 100
	height: 100
	backgroundColor: red
 
myAnimation = new Animation
	view: myView
	x: 300

myAnimation.start()
## End Example

## About Example
Animations can be given different curves which will affect the speed of the animation at certain times.

## Example
myView = new View
	x: 100
	y: 100
	width: 100
	height: 100
	backgroundColor: red
 
# Animate with a bezier curve 
myAnimation = new Animation
	view: myView
	x: 300
	curve: "bezier-curve(0.3, 0.15, 0.3, 1)"

myAnimation.start()
## End Example




##############################################################
# Section
Animation

## Description
Animate using the Animation class


##############################################################
## Property
view

### Type
<View object>

### Description
Set the view which will be animated.

### Example
myView = new View
	x: 100
	y: 100
	width: 100
	height: 100
	backgroundColor: red

myAnimation = new Animation
	view: myView # Set the view which will be animated
	x: 300
	opacity: 0.5
### End Example

##############################################################
## Property
properties

### Type
<object>

### Description
The the properties of the view which will be animated.

### Example
myView = new View
	x: 100
	y: 100
	width: 100
	height: 100
	backgroundColor: red

# Set the properties which will be animated
myAnimation = new Animation
	view: myView
	x: 300
	opacity: 0.5
### End Example


##############################################################
## Property
curve

### Type
<simple curve>

### Description
Set the animation curve to be a simple curve.

### Arguments
'linear'
'ease'
'ease-in'
'ease-out'
'ease-in-out'
### End Arguments

### Example
myAnimation = new Animation
	view: myView
	x: 300
	opacity: 0.5

	# Simple curve
	curve: 'ease-out'
### End Example


##############################################################
## Property
curve

### Type
<bezier curve>`

### Description
Set the animation curve to be a custom bezier curve.

### Arguments
x1 - 0 to 1
y1 - 0 to 1
x2 - 0 to 1
y2 - 0 to 1
### End Arguments

### Example
myAnimation = new Animation
	view: myView
	x: 300
	opacity: 0.5

	# Bezier curve
	curve: 'bezier-curve(0.3, 0.15, 0.3, 1)'
### End Example


##############################################################
## Property
curve

### Type
<spring curve>

### Description
Set the animation curve to be a custom spring curve.

### Arguments
Tension - 0 to 1000
Friction - 0 to 100
Velocity - 0 to 100
### End Arguments

### Example
myAnimation = new Animation
	view: myView
	x: 300
	opacity: 0.5

	# Spring curve
	curve: 'spring(400, 30, 0)'
### End Example


##############################################################
## Property
curve

### Type
<spring-dho curve>

### Description
Set the animation curve to be a custom spring curve.

### Arguments
Stiffness - 0 to 1000
Damping - 0 to 100
Mass - 0 to 20
Velocity - 0 to 100
### End Arguments

### Example
myAnimation = new Animation
	view: myView
	x: 300
	opacity: 0.5

	# Spring-dho curve
	curve: 'spring-dho(800, 50, 10, 15)'
### End Example


##############################################################
## Property
time

### Type
<number>

### Description
Set the length of the animation.

### Example
myView = new View
	x: 100
	y: 100
	width: 100
	height: 100
	backgroundColor: red

myAnimation = new Animation
	view: myView
	x: 300
	opacity: 0.5

	# Set the animation to run for 3 seconds
	time: 3
### End Example


##############################################################
## Property
delay

### Type
<number>

### Description
Set the amount of time between the animation call and the animation start.

### Example
myView = new View
	x: 100
	y: 100
	width: 100
	height: 100
	backgroundColor: red

myAnimation = new Animation
	view: myView
	x: 300
	opacity: 0.5

	# Set a delay of 2 seconds
	delay: 2
### End Example


##############################################################
## Property
repeat

### Type
<number>

### Description
Set the amount of times the animation is repeated after the initial animation.

### Example
myView = new View
	x: 100
	y: 100
	width: 100
	height: 100
	backgroundColor: red

myAnimation = new Animation
	view: myView
	x: 300
	opacity: 0.5

	# The animation will be repeated twice
	repeat: 2
### End Example


##############################################################
## Method
start()

### Description
Start the animation.

### Example
myView = new View
	x: 100
	y: 100
	width: 100
	height: 100
	backgroundColor: red

myAnimation = new Animation
	view: myView
	x: 300
	opacity: 0.5

# Start the animation
myAnimation.start()
### End Example


##############################################################
## Method
stop()

### Description
Stop the animation.

### Example
myView = new View
	x: 100
	y: 100
	width: 100
	height: 100
	backgroundColor: red

myAnimation = new Animation
	view: myView
	x: 300
	opacity: 0.5

animation.start()

# Stop the animation
animation.stop()
### End Example


##############################################################
## Method
reverse()

### Description
Create a new animation with reversed values.

### Example
myView = new View
	x: 100
	y: 100
	width: 100
	height: 100
	backgroundColor: red

myAnimation = new Animation
	view: myView
	x: 300
	opacity: 0.5

myAnimation2 = myAnimation.reverse()

myAnimation2.start()
### End Example



##############################################################
# Section
View Animate

## Description
Animate using the build in view methods



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

myView.animate x: 100

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
	backgroundColor: 'red'

myView.hover =
	backgroundColor: 'red'
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

myView.hoverAnimated =
	backgroundColor: 'red'
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
# Section
FadeIn/FadeOut

## Description
Quickly animate the opacity of an element


##############################################################
## Method
fadeIn(time)

### Description
Fade in the view during a set amount of time.

### Example
myButton = new Button
	text: 'Text'

# Fade in the view over 0.5 seconds
myButton.fadeIn 0.5
### End Example


##############################################################
## Method
fadeOut(time)

### Description
Fade out the view during a set amount of time.

### Example
myButton  = new Button
	text: 'Text'

# Fade out the view over 0.5 seconds
myButton.fadeOut 0.5
### End Example


