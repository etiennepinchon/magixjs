# Name
RadioButton

# Description
RadioButtons allow users to select an option from a list. Users will only be able to select a single option as selecting an option will deselect any other selected option. They inherit all of the Views properties and methods and as such can be customized in the same way.

# Extends
view,text,button


##############################################################
## Overview
Overview

### Description
RadioButtons allow users to choose only one option from a pre-specified set. They can be given the same properties as the view.

### Example
myRadioButton = new RadioButton
	x: 100
	y: 100
	width: 250
	height: 250
	text: 'Radio Button'
	enabled: yes
### End Example

### About Example
RadioButtons can be used to determine the gender of a user.

### Example
myRadioButton = new RadioButton
	x: 100
	y: 100
	width: 250
	height: 250
	text: 'Male'
	enabled: yes
	group: 'Gender'

radioButtonB = new RadioButton
	x: 100
	y: 125
	width: 250
	height: 250
	text: 'Female'
	enabled: yes
	group: 'Gender'

radioButtonC = new RadioButton
	x: 100
	y: 150
	width: 250
	height: 250
	text: 'Other'
	enabled: yes
	group: 'Gender'
### End Example


##############################################################
## Property
enabled

### Type
<boolean>

### Description
Set whether the radioButton responds to the users actions. If this value is yes, the user will be able to interact with the element.

### Example
myRadioButton = new RadioButton
	enabled: yes
### End Example


##############################################################
## Property
checked

### Type
<boolean>

### Description
Set the state of the radioButton. This value will update when the user clicks the element.

### Example
myRadioButton = new RadioButton
	checked: no

# User clicks on the radio button

log myRadioButton.checked
# Output: True
### End Example


##############################################################
## Property
text

### Type
<string>

### Description
Set the text of the radioButton.

### Example
myRadioButton = new RadioButton
	text: 'Radio Button'
### End Example


##############################################################
## Property
group

### Type
<string>

### Description
Group together multiple radio buttons. When a radio button is selected, any radio button already selected will be automatically deselected.

### Example
myRadioButton = new RadioButton
	text: 'Radio Button A'
	group: 'buttons'

radioButtonB = new RadioButton
	text: 'Radio Button B'
	group: 'buttons'
### End Example


##############################################################
## Method
radiobutton.focus()

### Description
Focus the radio button. This means that when the user presses enter, it will be the equivalent of clicking the radioButton to check it.

### Example
myRadioButton = new RadioButton
	text: 'Radio Button'

myRadioButton.focus()
### End Example


##############################################################
## Method
resignFocus()

### About Example
Resign the focus of the radio button. This means that the user will no longer be able to press enter to check the radio button.

### Example
myRadioButton = new RadioButton
	text: 'Radio Button'

myRadioButton.resignFocus()
### End Example


##############################################################
## Method
onChange()

### Description
Called when a user select the radioButton.

### Example
myRadioButton.on Event.Change, (event) ->
	log 'RadioButton selected'
### End Example

