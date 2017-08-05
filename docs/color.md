# Name
Color

# Description
Color is used to create Color objects which can take the form of blended colors or gradients. These Color objects can then be used to change the background color of Views.


##############################################################
## Method
gradient(colors..., orientation)

### Description
Create the gradient of two or more colors.

### Arguments
orientation — A number, from -180 to 180 or a orientation (top, left, right, bottom).  Set to 0 by default.
### End Arguments

### Example
# Create view with a gradient background
viewA = new View
    backgroundColor: Color.gradient(red, blue) # Red to blue

# Create view with a gradient background
viewB = new View
    backgroundColor: Color.gradient(orange, black, 45) # Orange to Black oriented at 45deg
### End Example


##############################################################
## Method
lighten(amount)

### Description
Add white and return a lightened color.

### Arguments
amount — A number, from 0 to 100. Set to 10 by default.
### End Arguments

### Example
# Create a new color, lighten it 
blue = new Color("#28affa").lighten(20)
 
myView = new View
    backgroundColor: blue
### End Example

##############################################################
## Method
darken(amount)

### Description
Add black and return a darkened color.

### Arguments
amount — A number, from 0 to 100. Set to 10 by default.
### End Arguments

### Example
# Create a new color, darken it 
blue = new Color("#28affa").darken(20)
 
myView = new View
    backgroundColor: blue
### End Example

##############################################################
## Method
saturate(amount)

### Description
Increase the saturation of a color.

### Arguments
amount — A number, from 0 to 100. Set to 10 by default.
### End Arguments

### Example
# Create a new Color, saturate it 
blue = new Color("#877DD7").saturate(100)
 
myView = new View
    backgroundColor: blue
### End Example

##############################################################
## Method
desaturate(amount)

### Description
Decrease the saturation of a color.

### Arguments
amount — A number, from 0 to 100. Set to 10 by default.
### End Arguments

### Example
# Create a new Color, desaturate it 
blue = new Color("#28affa").desaturate(25)
 
myView = new View
    backgroundColor: blue
### End Example

##############################################################
## Method
grayscale()

### Description
Return a fully desaturated color.

### Example
# Create a new Color 
yellow = new Color(yellow)
 
# Convert it to gray 
gray = yellow.grayscale()
 
myView = new View
    backgroundColor: gray
### End Example

##############################################################
## Method
mix(colorA, colorB, fraction, limit, model)

### Description
Blend two colors together, optionally based on user input. The fraction defines the distribution between the two colors, and is set to 0.5 by default.

### Arguments
colorA — A color, the first one
colorB— A color, the second one
fraction — A number, from 0 to 1. (Optional)
limit — A boolean, set to false by default. (Optional)
model — A string, the color model used to mix. (Optional)
### End Arguments

### Example
# Mix blue with red 
purple = Color.mix(blue, red, 0.5)
### End Example


##############################################################
## Method
random()

### Description
Return a random color.

### Example
myView = new View
	width: 100
	height: 100
	backgroundColor: Color.random()
### End Example


##############################################################
## Method
isColor(value)

### Description
Checks if the value is a valid color object or color string. Returns true or false.

### Arguments
value — An object or string, representing a color
### End Arguments

### Example
log Color.isColor(new Color red)
# Output: true 

log Color.isColor("red")
# Output: true 
### End Example


##############################################################
## Method
isColorObject(value)

### Description
Checks if the value is a valid color object. Returns true or false.

### Arguments
value — An object, representing a color
### End Arguments

### Example
log Color.isColorObject(new Color "red")
# Output: true

log Color.isColorObject("red")
# Output: false 
### End Example


##############################################################
## Method
isColorString(value)

### Description
Checks if the value is a color string. Returns true or false.

### Arguments
value — A string, representing a color
### End Arguments

### Example
log Color.isColorString(red)
# Output: ture

log Color.isColorString("#28affa")
# Output: true 
### End Example


##############################################################
## Method
toHexString()

### Description
Returns the hexadecimal string representation of a color.

### Arguments
value — An object or string, representing a color
### End Arguments

### Example
blue = new Color(blue)
log blue.toHexString()
# Output: "#0000ff" 
### End Example


##############################################################
## Method
toRgbString()

### Description
Returns the RGB string representation of a color.

### Arguments
value — An object or string, representing a color
### End Arguments

### Example
blue = new Color(blue)
log blue.toRgbString()
# Output: "rgb(0, 0, 255)" 
### End Example


##############################################################
## Method
toHslString()

### Description
Returns the HSL string representation of a color.

### Arguments
value — An object or string, representing a color
### End Arguments

### Example
blue = new Color(blue)
log blue.toHslString()
# Output: "hsl(240, 100%, 50%)" 
### End Example





