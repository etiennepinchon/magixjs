# Name
Link

# Description
Links are the url change buttons of Magix. They inherit all of the Views properties and methods and as such can be customized in the same way.

# Extends
view,text,button



##############################################################
## Overview
Overview

### Description
Links are used to change url. They allow users to change pages. Links can be given all of the same properties as the view.

### Example
myLink = new Link
	x: 100
	y: 100
	width: 250
	height: 250
	url: '/about'
### End Example

### About Example
Links can be used to animate the change of url such as adding a fade out animation to the page before changing the url.

### Example
myLink = new Link
	url: '/articles/my-article-name'
	auto: yes

myLink.on Event.Click, (event, view) ->
	view.fadeOut
		duration: 0.2
		then: ->
			view.go event, view
### End Example


##############################################################
## Property
url

### Type
<string>

### Description
Set the url to the link of the button.

### Alias
href,path

### Example
myLink = new Link
	url: '/home'
### End Example


##############################################################
## Property
tab

### Type
<boolean>

### Description
If set to yes, the link will be opened in a new tab.

### Alias
blank

### Example
myLink = new Link
	url: 'https://www.google.com'
	tab: yes
### End Example

##############################################################
## Property
download

### Type
<boolean>

### Description
If set to yes and if the link is set to an image url, the image in the link will be downloaded.

### Example
myLink = new Link
	url: 'https://goo.gl/XM5o89'
	download: yes
### End Example


##############################################################
## Property
auto

### Type
<boolean>

### Description
If set to yes this deactivates the default click event listener and allows you to add your own customized click listener. Requires you to use link.go().

### Example
myLink = new Link
	url: '/articles/my-article-name'
	auto: yes
### End Example

##############################################################
## Method
go()

### Description
This allows you to customize the click event of the button. For example you can animate the parent view when the button is clicked. The url in the browser will be changed after all animations have completed. See Animations for more details.

### Example
myLink = new Link
	url: '/articles/my-article-name'
	auto: yes

myLink.on Event.Click, (event, view) ->
	view.fadeOut
		duration: 0.2
		then: ->
			view.go event, view
### End Example

