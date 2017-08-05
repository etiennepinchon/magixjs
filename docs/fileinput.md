# Name
FileInput

# Description
Filefields display an input view to allow users to select a file to upload to the website. They inherit all of the Views properties and methods and as such can be customized in the same way.

# Extends
view,label


##############################################################
## Overview
Overview

### Description
FileInput is used to upload files to the website. They can be given the same properties as the view and the button.

### Example
input = new FileInput
	x: 100
	y: 100
	accept: ['.jpg', '.png', '.gif']
### End Example


### About Example
It is possible to conceal the Filefield view and open the file prompt from a stylised button.

### Example
input = new FileInput
	accept: ['.jpg', '.png', '.gif']
	display: no

uploadButton = new Button
	x: 100
	y: 100
	text: 'Upload'
	color: black
	borderWidth: 1
	borderRadius: 4
	backgroundColor: white
	click: ->
		input.open()
### End Example

### About Example
Files can also be uploaded to your server instance by using Network.

### Example
# Continuing from previous example
input.on Event.Change, ->
	file = input.element.files[0]
	
	Network
		post: '/profileImage'
		files:
		'profile_picture': file

	success: (data) ->
		# The progress of the upload
		# Value ranges from 0 to 1
		log data.progress

	error: (err) ->
		# Error callback
### End Example



##############################################################
## Property
accept

### Type
<string>

### Description
Set the file extensions accepted.

### Example
input = new FileInput

# Set multiple extensions
input.accept = ['.jpg', '.png', '.gif']

# Set single extension
input.accept = '.jpg'
### End Example



##############################################################
## Property
file

### Type
<object>

### Read only

### Description
Returns the selected file and all of its information. If multiple files were selected, it return the first file.

### Example
input = new FileInput
	accept: ['.jpg', '.png', '.gif']

input.on Event.Change, ->
	log input.file
### End Example


##############################################################
## Property
files

### Type
<array>

### Read only

### Description
Returns all the selected files in an array.

### Example
input = new FileInput
	accept: ['.jpg', '.png', '.gif']

input.on Event.Change, ->
	# First file
	log input.files[0]

	# Second file
	log input.files[1]
### End Example


##############################################################
## Property
multiple

### Type
<boolean>

### Read only

### Description
Enable multiple files selection.

### Example
# Will allow multiple files to be selected at once
input = new FileInput
	multiple: yes
### End Example


##############################################################
## Property
value

### Type
<string>

### Read only

### Description
The file selected by the user and added to the FileInput.


### Example
input = new FileInput
	accept: '.jpg'

# User adds image 'cat.jpg'

log input.value
# Output: 'cat.jpg'
### End Example


##############################################################
## Method
open()

### Description
Opens the file prompt of the Filefield.

### Example
input = new FileInput
	accept: ['.jpg', '.png', '.gif']
	display: no

uploadButton = new Button
	x: 100
	y: 100
	text: 'Upload'
	color: black
	borderWidth: 1
	borderRadius: 4
	backgroundColor: white
	click: ->
		input.open()
### End Example



##############################################################
## Method
focus()

### Description
Focus the fileField. This means that if the user presses keys on the keyboard, they will be shown in the textField.

### Example
input = new FileInput
	accept: '.jpg'

input.focus()
### End Example



##############################################################
## Method
resignFocus()

### Description
Resign the focus of the fileField. This means that the user will no longer be able to enter text in the fileField.

### Example
input = new FileInput
	accept: '.jpg'

input.resignFocus()
### End Example

