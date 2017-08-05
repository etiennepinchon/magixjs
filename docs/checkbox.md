# Name
Checkbox

# Description
Checkboxes allow users to check boolean based preferences. They inherit all of the Views properties and methods and as such can be customized in the same way.

# Extends
view,text,button



##############################################################
## Overview
Overview

### Description
Checkboxes are special buttons which can be ticked or unticked and provide boolean based feedback. They can be given the same properties as the view and the button.

### Example
myCheckbox = new Checkbox
	x: 100
	y: 100
	text: 'Checkbox'
### End Example

### About Example
Multiple Checkboxes can be used together to create a form which users can then fill out. The information from the Checkboxes can then be used.

### Example
optionOneButton = new Checkbox
	x: 100
	y: 100
	text: 'Option 1'
	checked: yes

optionTwoButton = new Checkbox
	x: 100
	y: 120
	text: 'Option 2'

optionThreeButton = new Checkbox
	x: 100
	y: 140
	text: 'Option 3'

check = new Button
	x: 100
	y: 170
	text: 'Check'
	click: ->
		# Check the first Checkbox
		log optionOneButton.checked
		 
		# Check the second Checkbox
		log optionTwoButton.checked
		 
		# Check the third Checkbox
		log optionThreeButton.checked
### End Example


##############################################################
## Property
enabled

### Type
<boolean>

### Description
Set whether the checkbox responds to the users actions. If this value is yes, the user will be able to interact with the element.

### Example
myCheckbox = new Checkbox
	enabled: yes
### End Example

##############################################################
## Property
checked

### Type
<boolean>

### Description
Set the state of the checkbox. This value will update when the user clicks the element.

### Example
myCheckbox = new Checkbox
	checked: no

# User clicks on the checkbox

log myCheckbox.checked
# Output: True
### End Example

##############################################################
## Property
text

### Type
<string>

### Description
Set the text aside of the checkbox.

### Example
myCheckbox = new Checkbox
	text: 'Check Box'
### End Example

##############################################################
## Method
focus()

### Description
Focus the checkbox. This means that when the user presses enter, it will be the equivalent of clicking the button to toggle to checkbox.

### Example
myCheckbox = new Checkbox
	text: 'Check Box'

myCheckbox.focus()
### End Example

##############################################################
## Method
resignFocus()

### Description
Resign the focus of the button. This means that the user will no longer be able to press enter to toggle the checkbox.

### Example
myCheckbox = new Checkbox
	text: 'Check Box'

myCheckbox.resignFocus()
### End Example


##############################################################
## Method
onChange()

### Description
Called when a user changes the selected state of a checkbox.

### Example
myCheckbox.on Event.Change, (event) ->
	log 'Item state changed'
### End Example

