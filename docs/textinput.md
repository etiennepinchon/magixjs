# Name
TextInput

# Description
TextInputs are text input containers. This are useful to allow users to complete forms and log in to websites. They inherit all of the Views properties and methods and as such can be customized in the same way.

# Extends
view,text



##############################################################
## Overview
Overview

### Description
TextInputs are used to input text like a password or a username. They can be given the same properties as the view and the button.

### Example
title = new Text
	text: 'Log In'
	x: 100
	y: 70

username = new TextInput
	x: 100
	y: 100
	width: 200
	height: 40
	placeholder: 'Username'

password = new TextInput
	x: 100
	y: 150
	width: 200
	height: 40
	placeholder: 'Password'
	secure: yes

logIn = new Button
	x: 100
	y: 200
	backgroundColor: 'black'
	text: 'log In'
	click: ->
		log 'Username: ' + username.text + ' Password: ' + password.text
### End Example


##############################################################
## Property
text

### Type
<string>

### Description
The input text written by the user.

### Alias
value, val

### Example
myTextInput = new TextInput
	text: 'Very little is needed to make a happy life; it is all within yourself, in your way of thinking.'

log myTextInput.text
# Output: 'Very little is needed to make a happy life; it is all within yourself, in your way of thinking.'
### End Example


##############################################################
## Property
placeholder

### Type
<string>

### Description
Set the placeholder text in the TextInput when it contains no input text.

### Example
myTextInput = new TextInput
	placeholder: 'Enter Username'
### End Example


##############################################################
## Property
placeholderColor

### Type
<color>

### Description
Set the placeholder text color in the TextInput.

### Example
myTextInput = new TextInput
	placeholderColor: blue
### End Example


##############################################################
## Property
secure

### Type
<boolean>

### Description
Set whether the text should be hidden in the TextInput. This is useful for password fields.

### Example
myTextInput = new TextInput
	placeholder: 'Password'
	secure: yes
### End Example


##############################################################
## Property
maxLength 

### Type
<number>

### Description
The max length of the text in the TextInput. This is defined in number of characters.

### Alias - textField.limit

### Example
myTextInput = new TextInput
	placeholder: 'Password'
	secure: yes
	maxLength: 30
### End Example

##############################################################
## Property
autocomplete

### Type
<boolean>

### Description
Set whether to enable autocomplete. When enabled it will complete words for the user automatically.

### Example
myTextInput = new TextInput
	placeholder: 'Enter Username'
	autocomplete: no
### End Example


##############################################################
## Property
autocorrect

### Type
<boolean>

### Description
Set whether to enable autocorrect. When enabled it will automatically correct spelling errors made by the user.

### Example
myTextInput = new TextInput
	placeholder: 'Enter Username'
	autocorrect: no
### End Example


##############################################################
## Property
autocapitalize

### Type
<boolean>

### Description
Set whether to enable autocapitalize. When enabled it will automatically capitalize the first letter of the text in the TextInput.

### Example
myTextInput = new TextInput
	placeholder: 'Enter Username'
	autocapitalize: yes
### End Example


##############################################################
## Property
spellcheck

### Type
<boolean>

### Description
Set whether to enable spellcheck. When enabled it will automatically underline spelling mistakes made by the user.

### Example
myTextInput = new TextInput
	placeholder: 'Enter Username'
	spellcheck: no
### End Example


##############################################################
## Property
multiline

### Type
<boolean>

### Description
Set whether the TextInput can have multiple lines or not. It is equivalent to textarea.

### Example
myTextView = new TextInput
	multiline: yes
### End Example


##############################################################
## Property
resizable

### Type
<boolean>

### Description
Only if multiline are enabled. Set whether the TextInput can resize based on the amount of text it holds.

### Example
myTextView = new TextInput
	multiline: yes
	resizable: yes
### End Example


##############################################################
## Property
resizeDirection

### Type
<string>

### Description
Only if multilines are enabled. Set the direction which will resize. The string value must be either "horizontal" or "vertical".

### Example
myTextView = new TextInput
	multiline: yes
	resizable: yes
	text: 'Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.'
	resizeDirection: 'vertical'
### End Example

##############################################################
## Method
focus()

### Description
Focus the textField. This means that if the user presses keys on the keyboard, they will be shown in the textField.

### Example
myTextInput = new TextInput
	placeholder: 'Password'

myTextInput.focus()
### End Example


##############################################################
## Method
resignFocus()

### Description
Resign the focus of the textField. This means that the user will no longer be able to enter text in the textField.

### Example
myTextInput = new TextInput
	placeholder: 'Password'

myTextInput.resignFocus()
### End Example


##############################################################
## Method
select()

### Description
Select all the text in the TextInput.

### Arguments
text - The text in the TextInput to select. (Optional)
### End Arguments

### Example
# Copy the text in the TextInput when it is clicked
myTextInput = new TextInput
	text: 'Life is really simple, but we insist on making it complicated.'
	click: ->
		this.select()
		App.clipboard.copy()
### End Example


##############################################################
## Method
empty()

### Description
Empty the text in the TextInput.

### Example
myTextInput = new TextInput
	text: 'Stay hungry, stay foolish.'

myButton = new Button
	text: 'Empty Field'

myButton.onClick ->
	myTextInput.empty()
### End Example


##############################################################
## Method
onKeyPress()

### Description
Called when a keyboard key is pressed.

### Example
myTextInput.onKeyPress (event) ->
	log 'Key pressed'
### End Example


##############################################################
## Method
onKeyDown()

### Description
Called when a keyboard key is pressed down.

### Example
myTextInput.onKeyDown (event) ->
	log 'Key pressed down'
### End Example


##############################################################
## Method
onKeyUp()

### Description
Called when a keyboard key is released.

### Example
myTextInput.onKeyUp (event) ->
	log 'Key released'
### End Example


##############################################################
## Method
onFocus()

### Description
Called when the textField is focused.

### Example
myTextInput.onFocus (event) ->
	log 'Focused'
### End Example


##############################################################
## Method
onResignFocus()

### Description
Called when the textField resigns focus.

### Alias
onBlur()

### Example
myTextInput.onResignFocus (event) ->
	log 'Resigned focus'
### End Example


##############################################################
## Method
onWillFocus()

### Description
Called when the textField is about to be focused.

### Example
myTextInput.onFocus (event) ->
	log 'Resigned focus'
### End Example


##############################################################
## Method
onWillResignFocus()

### Description
Called when the view is about to resign focus.

### Example
myTextInput.onWillResignFocus (event) ->
	log 'Will resign focus'
### End Example


##############################################################
## Method
onInput()

### Description
Called when a change is made in the input text. Works with TextInput and TextInput.

### Example
myTextInput.onInput (event) ->
	log 'Input text changed'
### End Example


##############################################################
## Method
onSelect()

### Description
Called when text is selected. Works with TextInput and TextInput.

### Example
myTextInput.onSelect (event) ->
	log 'Selected text'
### End Example


##############################################################
## Method
onChange()

### Description
Called when the textField has resigned focus and a change was made to the input text while focused. Works with FileField, TextInput and TextInput.

### Example
myTextInput.onChange (event) ->
	log 'Input text changed'
### End Example


