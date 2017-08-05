# Name
Dropdown

# Description
Dropdowns allow users to be show a list of options when clicked. They inherit all of the Views properties and methods and as such can be customized in the same way.

# Extends
view,button


##############################################################
## Overview
Overview

### Description
Dropdowns are buttons which display a drop down menu filled with a list of options to choose from when clicked. For example they can be used to determine the users gender on sign up. They can be given the same properties as the view and the button.

### Example
myDropdown = new Dropdown
	x: 100
	y: 100
	width: 250
	options:
		'first': 'Male'
		'second': 'Female'
		'third': 'Other'
### End Example


##############################################################
## Property
options

### Type
<object>

### Description
The list of options which appear when the dropdown is clicked. The name property will be the string shown to the user. The value property allows you to determine which option has been chosen by the user.

### Example
myDropdown = new Dropdown

myDropdown.options = 
	'action-copy': 'Copy'
	'action-cut': 'Cut'
	'action-past': 'Paste'


# User chooses 'Cut'

log dropdown.options.value
# Output: '2'
### End Example

##############################################################
## Method
enabled

### Type
<boolean>

### Description
Set whether the dropdown responds to the users actions. If this value is yes, the user will be able to interact with the element.

### Example
myDropdown = new Dropdown
	enabled: yes
### End Example

##############################################################
## Method
focus()

### Description
Focus the dropdown. This means that when the user presses they up and down arrows they will cycle through the list of options.

### Example
myDropdown = new Dropdown

myDropdown.options =
	'action-copy': 'Copy'

myDropdown.focus()
### End Example


##############################################################
## Method
resignFocus()

### Description
Resign the focus of the button. This means that the user will no longer be able to use the up and down arrows to cycle through the list of options.

### Example
myDropdown = new Dropdown

myDropdown.options =
	'action-copy': 'Copy'

myDropdown.resignFocus()
### End Example


##############################################################
## Method
onChange()

### Description
Called when a user changes the selected item from Dropdown.

### Example
myDropdown.on Event.Change, (event) ->
	log 'Item Selected'
### End Example

