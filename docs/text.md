# Name
Text

# Description
Texts are the text containers of Magix. They inherit all of the Views properties and methods and as such can be customized in the same way.

# Extends
view



##############################################################
# Section
Overview

## Description
Learn the various applications of Text and how to use it.

## About Example
Texts are views which are used to display text on the screen. They can be given all of the same properties as the view. To create a new view, use the keyword "new".

## Example
myText = new Text
	x: 100
	y: 100
	text: 'This is some text'

# Change the text after initialisation
myText.text = 'This is still some text'
## End Example

## About Example
Texts can be given properties to change the size and positioning of their text.

## Example
myText = new Text
	text: 'This is some text'
	align: 'center'
	backgroundColor: black
	color: white
## End Example

## About Example
The font of the text can be customized using properties like font and fontSize.

## Example
myText = new Text
	text: 'This is some text'
	fontName: 'OpenSans'
	fontWeight: 400
	fontSize: 30
## End Example



##############################################################
# Section
Text

## Description
Set and change the text in Text.


##############################################################
## Property
text

### Type
<string>

### Description
Set the text of Text.

### Example
myText = new Text
	text: 'text'

log myText.text
# Output: 'text'
### End Example


##############################################################
## Method
uppercase()

### Description
Set all of text in Text to uppercase.

### Example
myText = new Text
	text: 'text'

myText.uppercase()

log myText.text
# Output: 'LABEL TEXT'
### End Example

##############################################################
## Method
lowercase()

### Description
Set all of text in Text to uppercase.

### Example
myText = new Text
	text: 'text'

myText.lowercase()

log myText.text
# Output: 'text'
### End Example

##############################################################
## Method
capitalize()

### Description
Capitalize all the text in Text.

### Example
myText = new Text
	text: 'text'

myText.capitalize()

log myText.text
# Output: 'text'
### End Example

##############################################################
## Method
underline()

### Description
Underline all the text in Text.

### Example
myText = new Text
	text: 'text'

myText.underline()
### End Example



##############################################################
# Section
Font

## Description
Change the font of Text.

##############################################################
## Property
fontSize

### Type
<number>

### Description
Set the font-size of the text of the text.

### Alias
fsize

### Example
myText = new Text
	text: 'text'
	fontSize: 20

log myText.fontSize
# Output: 20
### End Example


##############################################################
## Property
fontWeight

### Type
<string>

### Description
Set the font weight of the text of Text.

### Alias
weight

### Example
myText = new Text
	text: 'text'
	fontWeight: 'bold'

log myText.fontWeight
# Output: 'bold'
### End Example


##############################################################
## Property
fontName

### Type
<string>

### Description
Set the font of the text of Text.

### Alias
fontFamily

### Example
myText = new Text
	text: 'text'
	fontName: 'Menlo'

log myText.fontName
# Output: 'Menlo'
### End Example

##############################################################
## Property
font

### Type
<string>

### Description
Set all of the font properties of the text of Text.

### Example
myText = new Text
	text: 'text'
	font: 'bold 12px Georgia, serif'

log myText.font
# Output: 'bold 12px Georgia, serif'
### End Example



##############################################################
# Section
Text Appearance

## Description
Change the appearance of the text in Text.

##############################################################
## Property
color

### Type
<string>

### Description
Set the color of the text of Text.

### Example
myText = new Text
	text: 'text'
	color: red

log myText.color
# Output: 'red'
### End Example


##############################################################
## Property
textIndent

### Type
<number>

### Description
Allows you to indent the text in Text. This value can be either in Pixels or in Ems (1 em is equal to the current font-size).

### Example
myText = new Text

# Set indent in pixels
myText.textIndent = 50

# Set indent in ems
myText.textIndent = '1.5em'
### End Example


##############################################################
## Property
align

### Type
<string>

Set the horizontal alignment of the text in Text.

### Alias
textAlign,textAlignment

### Example
myText = new Text
	text: 'text'

# Center the text in Text
myText.textAlignment = 'center'

# Alignment the text on the left edge of Text
myText.textAlignment = 'left'

# Alignment the text on the right edge of Text
myText.textAlignment = 'right'

log myText.textAlignment
# Output: 'right'
### End Example


##############################################################
## Property
decoration

### Type
<string>

### Description
Set the decoration of the text in Text. A list of all the values is available here.

### Alias
textDecoration

### Example
myText = new Text
	text: 'text'

# Default text presentation
myText.textDecoration = 'none'

# Put a line through the text
myText.textDecoration = 'line-through'

# Underline the text
myText.textDecoration = 'underline'

log myText.textDecoration
# Output: 'underline'
### End Example


##############################################################
## Property
letterSpacing

### Type
<number>

### Description
Set the spacing between the letters of text in Text. This value can be either in Pixels or in Ems (1 em is equal to the current font-size).

### Alias
spacing

### Example
myText = new Text
	text: 'text'

# Set spacing in pixels
myText.letterSpacing = 2

# Set spacings in ems
myText.letterSpacing = '1.4em'
### End Example


##############################################################
## Property
wordSpacing

### Type
<number>

### Description
Set the spacing between words in Text. This value can be either in Pixels or in Ems.

### Example
myText = new Text
	text: 'text'

# Set spacing in pixels
myText.wordSpacing = 2

# Set spacings in ems
myText.wordSpacing = '1.4em'
### End Example


##############################################################
## Property
wrap

### Type
<boolean>

### Description
Allow long words to be able to break and wrap onto the next line.

### Default
yes

### Example
myText.wrap = yes
### End Example

##############################################################
## Property
break

### Type
<boolean>

### Description
Break words between any two letters than go to the next line.

### Default
no

### Example
myText.break = yes
### End Example

##############################################################
## Property
nowrap

### Type
<boolean>

### Description
If set to yes, the text will never wrap to the next line, the text continues on the same line.

### Default
no

### Example
myText.nowrap = yes
### End Example

##############################################################
## Property
lineHeight

### Type
<number>

### Description
The height of each line of text in Text.

### Example
myText = new Text
	text: 'text'

# Set spacing in pixels
myText.lineHeight = 2

# Set spacings in ems
myText.lineHeight = '1.4em'
### End Example



##############################################################
# Section
Shadows

## Description
Set a shadow to the text and customize its appearance.

##############################################################
## Property
textShadowX

### Type
<number>

### Description
Set the horizontal positioning of the shadow of the text in Text. This value can be either in Pixels or in Ems.

### Example
myText = new Text
	text: 'text'

# Set spacing in pixels
myText.textShadowX = 2

# Set spacings in ems
myText.textShadowX = '0.2em'
### End Example


##############################################################
## Property
textShadowY

### Type
<number>

### Description
Set the vertical positioning of the shadow of the text in Text. This value can be either in Pixels or in Ems.

### Example
myText = new Text
	text: 'text'

# Set spacing in pixels
myText.textShadowY = 2

# Set spacings in ems
myText.textShadowY = '0.2em'
### End Example


##############################################################
## Property
textShadowColor

### Type
<string>

### Description
Set the color of the shadow of the text in Text. The color is expressed as a string in the CSS color format.

### Example
myText = new Text
	text: 'text'
	textShadowColor: 'rgba(0, 0, 0, 0.2)'
### End Example



##############################################################
# Section
Attributed text and link

## Description
Add specific properties and hyperlink to words and phrases.


##############################################################
## Method
assignLink(text, url, options)

### Description
Add a link to a specific string of text in Text. The properties of the specified text can also be set.

### Example
myText = new Text
	text: 'text'

myText.assignLink 'Text', 'https://google.com',
	# The word 'Text' will be in red
	color: red
### End Example

##############################################################
## Method
assign(text, options)

### Description
Add attributes to a specific string of text in Text.

### Example
myText = new Text
	text: 'text'

myText.assign 'Text',
	# The word 'Text' will be in red
	color: red
### End Example

