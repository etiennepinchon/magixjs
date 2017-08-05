# Name
App

# Description
App is the main structure of the framework. It allows you to initialise your app when a url is loaded.


##############################################################
# Section
Overview

## Description
Learn the various applications of App and how to use it.

## About Example
App is used to create the structure of your website. Using it you can add new pages to the app.

## Example
Routes
	# When reaching /
	main: ->
		new HomePage

	# When reaching /article
	article : ->
		new ArticlePage

	'/myFunnyPage/stuff' : ->
		...

	# Default will always be used if the path does not exist
	'default' : ->
		log '404, Nothing here'
## End Example




##############################################################
# Section
Pages

## Description
Add and remove the pages of your website.


##############################################################
## Property
Routes

### Type
<object>

### Description
This allows you to setup the structure of your website. Each url path must be given page. Once a url is loaded, its corresponding page will be displayed on the screen.

### Example
Routes
	# When reaching /, we display our HomePage
	main: ->
		new HomePage

	# When reaching /article
	article : ->
		new ArticlePage

	'/myFunnyPage/stuff' : ->
		...

	# Default will always be used if the path does not exist
	default : ->
		log '404, Nothing here'
### End Example


##############################################################
## Property
page

### Type
<Page Object>

### Description
Set the root page of the app. The page currently on the screen will be replaced by this new page.

### Example
myPage = new Page
App.page myPage
### End Example


##############################################################
## Property
title

### Type
<string>

### Description
Set the title of the webpage. This will be shown in the tab showing the webpage.

### Example
App.title = 'This is a page title'
### End Example



##############################################################
# Section
Window

## Description
Get the dimensions of the window.

##############################################################
## Property
width

### Type
<number>

### Read only

### Description
Returns the width of the window in pixels.

### Example
log App.width
### End Example


##############################################################
## Property
height

### Type
<number>

### Read only

### Description
Returns the height of the window in pixels.

### Example
log App.height
### End Example

##############################################################
## Property
size

### Type
<object>

### Read only

### Description
Returns the size of the window in pixels.

### Example
log App.size
### End Example


##############################################################
## Property
frame

### Type
<object>

### Read only

### Description
Returns the frame of the window in pixels.

### Example
log App.frame
### End Example




##############################################################
# Section
Devices

## Description
Emulate devices to test your webapp across diferent multiple screen dimen.


##############################################################
## Method
App.setDevice()

### Description
Set device to emulate. Note: must be done before any views or pages are created.

### Arguments
	Device.iPad
	Device.iPadSilver
	Device.iPadGold
	Device.iPadSpaceGray

	Device.iPadMini
	Device.iPadMiniSilver
	Device.iPadMiniGold
	Device.iPadMiniSpaceGray

	Device.iPadPro
	Device.iPadProSilver
	Device.iPadProGold
	Device.iPadProSpaceGray

	Device.iPhone
	Device.iPhoneGold
	Device.iPhoneRoseGold
	Device.iPhoneSilver
	Device.iPhoneJetBlack
	Device.iPhoneBlack

	Device.iPhone6
	Device.iPhone6Gold
	Device.iPhone6Gold
	Device.iPhone6Gold
	Device.iPhone6Gold

	Device.iPhone6Plus
	Device.iPhone6PlusGold
	Device.iPhone6PlusGold
	Device.iPhone6PlusGold
	Device.iPhone6PlusGold

	Device.iPhone5S
	Device.iPhone5Gold
	Device.iPhone5Silver
	Device.iPhone5SpaceGray

	Device.iPhone5C
	Device.iPhone5CBlue
	Device.iPhone5CGreen
	Device.iPhone5CRed
	Device.iPhone5CWhite
	Device.iPhone5CYellow

	Device.appleWatch38NikePlusSilverAluminumFlatSilverVold
	Device.appleWatch38NikePlusSilverAluminumFlatSilverWhite
	Device.appleWatch38NikePlusSpaceGrayAluminumBlackCoolGray
	Device.appleWatch38NikePlusSpaceGrayAluminumBlackVold

	Device.appleWatch
	Device.appleWatch42NikePlusSilverAluminumFlatSilverVold
	Device.appleWatch42NikePlusSilverAluminumFlatSilverWhite
	Device.appleWatch42NikePlusSpaceGrayAluminumBlackCoolGray
	Device.appleWatch42NikePlusSpaceGrayAluminumBlackVold

	Device.nexus4
	Device.nexus5
	Device.nexus6

	Device.pixel
	Device.pixelBlack
	Device.pixelBlue
	Device.pixelSilver

	Device.htcOneA9 
	Device.htcOneA9Black
	Device.htcOneA9White

	Device.htcOneM8
	Device.htcOneM8Black
	Device.htcOneM8Gold
	Device.htcOneM8Silver

	Device.lumia950
	Device.lumia950Black
	Device.lumia950White

	Device.galaxyNote5
	Device.galaxyNote5Black
	Device.galaxyNote5Gold
	Device.galaxyNote5Pink
	Device.galaxyNote5SilverTitanium
	Device.galaxyNote5White

	Device.macbook
	Device.macbookAir
	Device.macbookPro

	Device.iMac
### End Arguments

### Example
App.setDevice Device.iPhoneGold
### End Example


##############################################################
## Method
App.setDevice()

### Description
Set the background behind the emulated device.

### Example
App.setDeviceBackground '#6600FF'
### End Example








##############################################################
# Section
Responsive

## Description
Easily adapt your app to every window dimentions.




##############################################################
## Method
Below(condition, view)

### Description
Will update the view properties when the window dimentions are below the condition. Read it like this: "When the window is below the size of the condition, change the following properties."

### Arguments
Watch 	— 0
Mobile 	— 320
Phone	— 480
Tablet	— 760
Netbook	— 960
Desktop — 1200
TV		— 1600
QHD		— 1980
UHD		— 2600
### End Arguments

### Example
myText = new Text
	text: 'Hello'
	fontSize: 64
	color: black

Below Phone, myText,
	fontSize: 32
	color: 'red'
### End Example

### About Example
You can also add mutliple element with the same condition.

### Example
myText = new Text
	text: 'Hello'
	fontSize: 64
	color: black

myView = new View

Below Mobile, [
	view: myText
	properties:
		fontSize: 32
		color: red
,
	view: myView
	properties:
		background: 'purple'
]
### End Example



##############################################################
## Method
Above(condition, view)

### Description
Will update the view properties when the window dimentions are above the condition. Read it like this: "When the window is above the size of the condition, change the following properties."

### Arguments
Watch 	— 0
Mobile 	— 320
Phone	— 480
Tablet	— 760
Netbook	— 960
Desktop — 1200
TV		— 1600
QHD		— 1980
UHD		— 2600
### End Arguments

### Example
myText = new Text
	text: 'Hello'
	fontSize: 64
	color: black

Above Desktop, myText,
	fontSize: 120
	color: 'blue'
### End Example

### About Example
You can also add mutliple element with the same condition.

### Example
myText = new Text
	text: 'Hello'
	fontSize: 64
	color: black

myView = new View
	background: red

Above Tablet, [
	view: myText
	properties:
		fontSize: 32
		color: red
,
	view: myView
	properties:
		background: purple
]
### End Example









##############################################################
# Section
Font

## Description
Set the fonts which you will use in your app.


##############################################################
## Property
fonts

### Type
<array>

### Description
Allows you to easily import one or multiple fonts directly from Google Fonts.

### Alias
App.fonts

### Example
# Import fonts
Fonts
	name: 'Open Sans'
	weight: '400,300'
,
	name: 'Helvetica'
	weight: '400,300'

App.fonts = 'Montserrat'
### End Example


##############################################################
## Property
fontName

### Type
<string>

### Description
Set the default fontName to use.

### Example
App.fontName = 'Open Sans'
### End Example


##############################################################
## Property
fontWeight

### Type
<number>

### Description
Set the default fontWeight to use.

### Example
App.fontWeight = 400
### End Example


##############################################################
## Property
fontSize

### Type
<number>

### Description
Set the default fontSize to use.

### Example
App.fontSize = 15
### End Example


##############################################################
## Property
textColor

### Type
<string>

### Description
Set the default textColor to use.

### Example
App.textColor = 'white'
### End Example

##############################################################
## Method
Font

### Description
Allows you to easily import one font directly from Google Fonts.

### Example
Font 'Baloo Bhai', '400,300'
### End Example



##############################################################
# Section
Fullscreen

## Description
Enter and exit fullscreen.


##############################################################
## Method
enterFullScreen()

### Description
Switch the app to full screen mode.

### Example
App.enterFullscreen()
### End Example


##############################################################
## Method
exitFullScreen()

### Description
Switch the app out of full screen mode.

### Example
App.exitFullscreen()
### End Example


##############################################################
## Method
isFullScreen()

### Description
Returns whether the app is in full screen mode.

### Example
App.enterFullscreen()

log App.isFullscreen()
# Output: True
### End Example




##############################################################
# Section
Resources

## Description
Resources available to enrich pages.


##############################################################
## Method
Import

### Description
Import external scripts.

### Example
Import ['URL', 'URL2'], ->
	# Show page when scripts have loaded
	App.page = new MainPage
### End Example


##############################################################
## Method
onImportProgress()

### Description
Called during the script import and returns the progress.

### Example
App.onPreloadProgress (event) ->
	log 'progress'
### End Example


##############################################################
## Method
onImportEnd()

### Description
Called when the import has finished.

### Example
App.onImportEnd (event) ->
	log 'Import ended'
### End Example



##############################################################
## Method
Preload

### Description
Allows you to preload any images used.

### Example
Preload ['https://www.newton.ac.uk/files/covers/968361.jpg', 'http://lorempixel.com/400/200/sports/1'], ->
	log 'Done!'
### End Example


##############################################################
## Method
onPreloadProgress()

### Description
Called during the preload of images and returns the progress.

### Example
App.onPreloadProgress (event) ->
	log 'progress'
### End Example


##############################################################
## Method
onPreloadEnd()

### Description
Called when the preload of images has finished.

### Example
App.onPreloadEnd (event) ->
	log 'Preload ended'
### End Example


##############################################################
## Method
css()

### Description
Allows you to add plain CSS to your app. This feature is only here to assist some more complex algorithms and external scripts.

### Example
App.css '.link{ color:#547df3 }'
### End Example





##############################################################
# Section
URL

## Description
Determine and analyse the url and create a link.


##############################################################
## Method
go()

### Description
Allows you to go to a specific url without reloading the page using the routes mechanism.

### Example
App.go '/article'
### End Example


##############################################################
## Method
pathname()

### Description
Returns an array of the url path.

### Example
# URL: 'http://example.com/articles/my_article'

log App.pathname()
# Output: [articles, my_article]
### End Example


##############################################################
## Method
parameters()

### Description
Returns an object containing the parameters in the url.

### Example
# URL: 'http://example.com/articles/my-article?limit=30&debug=true'

log App.parameters()
# Output: {limit: 30, debug: yes}
### End Example




##############################################################
# Section
Connectivity

## Description
Determine whether the app is connected to the internet.


##############################################################
## Method
isOnline()

### Description
Check if the app is connected to the internet.

### Example
log App.isOnline()
### End Example


##############################################################
## Method
isOffline()

### Description
Check if the app is not connected to the internet.

### Example
log App.isOffline()
### End Example


##############################################################
## Method
onOnline()

### Description
Called when the app connects to the internet.

### Example
App.onOnline (event) ->
	log 'Connected'
### End Example


##############################################################
## Method
onOffline()

### Description
Called when the app disconnects from the internet.

### Example
App.onOnline (event) ->
	log 'Disconnected'
### End Example






##############################################################
# Section
Battery

## Description
Get battery information about the device.


##############################################################
## Property
battery.charging

### Type
<boolean>

### Read only

### Description
Returns whether the battery of the device is currently being charged.

### Example
log App.battery.charging
### End Example


##############################################################
## Property
battery.level

### Type
<number>

### Read only

### Description
Returns the current battery level in percent.

### Example
log App.battery.level
### End Example


##############################################################
## Property
battery.chargingTime

### Type
<number>

### Read only

### Description
Returns the time until the battery is fully charged in seconds.

### Example
log App.battery.chargingTime
### End Example


##############################################################
## Property
battery.dischargingTime

### Type
<number>

### Read only

### Description
Returns the time until the battery is fully discharged in seconds.

### Example
log App.battery.dischargingTime
### End Example


##############################################################
## Method
Change.BatteryCharging

### Description
Called when the battery charging state changes.

### Example
App.on Change.BatteryCharging, (charging) ->
	log App.battery.charging
### End Example


##############################################################
## Method
Change.BatteryLevel

### Description
Called when the battery level changes.

### Example
App.on Change.BatteryLevel, (charging) ->
	log App.battery.level
### End Example


##############################################################
## Method
Change.ChargingTime

### Description
Called when the battery charging time changes.

### Example
App.on Change.ChargingTime, (charging) ->
	log App.battery.chargingTime
### End Example


##############################################################
## Method
Change.DischargingTime

### Description
Called when the battery discharging time changes.

### Example
App.on Change.DischargingTime, (charging) ->
	log App.battery.dischargingTime
### End Example






##############################################################
# Section
Vibrate

## Description
Use the vibration motor of the device.


##############################################################
## Property
vibrate

# Type
<number/array>

### Description
Vibrate the vibration motor of the device for short amounts of time. The time entered is in milliseconds.

### Example
# Single vibration of 200 milliseconds
App.vibrate 200
### End Example

### About Example
Vibration patters can also be created using an array.

### Example
App.vibrate [200, 100, 200]

# Motor on for 200 milliseconds
# Motor off for 100 milliseconds
# Motor on for 200 milliseconds
### End Example



##############################################################
# Section
Events

## Description
Create App level listeners to monitor a wide range of events.


##############################################################
## Method
onResize()

### Description
Called when the window is resized.

### Example
App.onResize (event) ->
	# Returns the current window width
	log App.width
### End Example


##############################################################
## Method
onQuit()

### Description
Called when the user leaves the page.

### Alias - Event.BeforeLeavingDocument

### Example
App.onQuit (event)->
	log 'App is about to quit'
### End Example


##############################################################
## Method
Change.Page 

### Description
Called when the user changes pages in your app.

### Example
App.on Change.Page, (event) ->
	log 'Page changed'
### End Example


##############################################################
## Method
Change.DeviceMotion 

### Description
Used to monitor accelerometer information from the device.

### Example
App.on Change.DeviceMotion, (event) ->
	# Accelerations in each axis direction
	x = event.acceleration.x
	y = event.acceleration.y
	z = event.acceleration.z
### End Example

### About Example
The accelerometer can return acceleration values which include gravity.

### Example
App.on Change.DeviceMotion, (event) ->
	# Accelerations in each axis direction
	x = event.accelerationIncludingGravity.x
	y = event.accelerationIncludingGravity.y
	z = event.accelerationIncludingGravity.z
### End Example

### About Example
The interval, in milliseconds, at which the DeviceMotion event is fired. The next event will be fired in approximately the same amount of time.

### Example
App.on Change.DeviceMotion, (event) ->
	log event.interval
### End Example

### About Example
The rotation rate of the device. These values are returned in degrees per second.

### Example
App.on Change.DeviceMotion, (event) ->

	# Rotation rate in Z direction
	alpha = event.rotationRate.alpha

	# Rotation rate in X direction
	beta = event.rotationRate.beta

	# Rotation rate in Y direction
	gamma = event.rotationRate.gamma
### End Example


##############################################################
## Method
Change.DeviceOrientation

### Description
Used to monitor the device orientation. All number values returned are in degrees.

### Example
App.on Change.DeviceOrientation, (event) ->

	# Returns yes if data returned in earth and device coordinate frame
	# Returns no if data returned in device-determined coordinate frame
	log event.absolute

	# Orientation of the device around the Z axis
	# Range: 0 to 360
	log event.alpha

	# Orientation of the device around the X axis
	# Range: -180 to 180
	log event.beta

	# Orientation of the device around the Y axis
	# Range: -90 to 90
	log event.gamma
### End Example






##############################################################
# Section
Window Events

## Description
Events related to the window of the browser.

##############################################################
## Method
onResize()

### Description
Called when the window is resized.

### Example
App.onResize (event) ->
	log App.width/App.height
### End Example


##############################################################
## Method
onFocus()

### Description
Called when the window get the focus meaning that the user went on another window/tab and then went back on the App window.

### Example
App.onFocus (event) ->
	log 'You are back!'
### End Example


##############################################################
## Method
onResignFocus()

### Description
Called when the window lose the focus meaning that the user went on another window/tab.

### Alias
onBlur

### Example
App.onResignFocus (event) ->
	log 'See you later..'
### End Example


##############################################################
## Method
onQuit()

### Description
Called when the window is about to be closed.

### Example
App.onQuit (event) ->
	log 'Time to log goodbye'
### End Example


##############################################################
## Method
onHashChange()

### Description
Called when the URL hash has been changed.

### Example
App.onHashChange (event) ->
	log 'Hash changed!'
### End Example




##############################################################
# Section
Cursor Events

## Description
Monitor each of the actions of the mouse.


##############################################################
## Method
onClick()

### Description
Called when the view is clicked.

### Example
App.onClick (event) ->
	log 'View clicked'
### End Example


##############################################################
## Method
onDoubleClick()

### Description
Called when the view is double clicked.

### Example
App.onDoubleClick (event) ->
	log 'View double clicked'
### End Example


##############################################################
## Method
onRightClick()

### Description
Called when the view is right clicked.

### Example
App.onRightClick (event) ->
	log 'View right clicked'
	return no
### End Example


##############################################################
## Method
onMouseIn()

### Description
Called when the cursor enters the frame of the App.

### Alias
onIn()

### Example
App.onMouseIn (event) ->
	log 'Cursor entered the frame'
### End Example


##############################################################
## Method
onMouseOut()

### Description
Called when the cursor leaves the frame of the App.

### Alias
onOut()

### Example
App.onMouseOut (event) ->
	log 'Cursor left the frame'
### End Example


##############################################################
## Method
onMouseDown()

### Description
Called when the user clicks down on the App.

### Alias
onDown()

### Example
App.onMouseDown (event) ->
	log 'Mouse clicked down on the view'
### End Example


##############################################################
## Method
onMouseUp()

### Description
Called when the user releases the click on the App.

### Alias
onUp()

### Example
App.onMouseUp (event) ->
	log 'Mouse released click on the view'
### End Example

##############################################################
## Method
onMouseMove()

### Description
Called when the cursor is moved inside the frame of the App.

### Alias
onMove()

### Example
App.onMouseMove (event) ->
	log 'Mouse moved'
### End Example


##############################################################
## Method
onWheel()

### Description
Called when the mouse wheel is scrolling.

### Alias
onWheel()

### Example
App.onMouseWheel (event) ->
	log 'Wheel scrolling'
### End Example




##############################################################
# Section
Scroll Events

## Description
Get scroll information


##############################################################
## Method
onScroll()

### Description
Called when the App is scrolled.

### Example
App.onScroll (event) ->
	# Get the vertical scroll position
	log this.scrollTop
### End Example





##############################################################
# Section
Keyboard Events

## Description
Monitor the keyboard events.


##############################################################
## Method
onKeyPress()

### Description
Called when a keyboard key is pressed.

### Example
App.onKeyPress (event) ->
	log 'Key pressed'
### End Example

##############################################################
## Method
onKeyDown()

### Description
Called when a keyboard key is pressed down.

### Example
App.onKeyDown (event) ->
	log 'Key pressed down'
### End Example

##############################################################
## Method
onKeyUp()

### Description
Called when a keyboard key is released.

### Example
App.onKeyUp (event) ->
	log 'Key released'
### End Example



##############################################################
# Section
Touch Events

## Description
Touch screen events.


##############################################################
## Method
onTouchStart()

### Description
Called when the user touches down on the screen.

### Example
myView.onTouchStart ->
	log 'Touch start'
### End Example


##############################################################
## Method
onTouchEnd()

### Description
Called when the user removes their finger from the screen.

### Example
myView.onTouchStart ->
	log 'Touch end'
### End Example


##############################################################
## Method
onTouchMove()

### Description
Called when the user moves their finger on the screen.

### Example
myView.onTouchStart (event) ->
	log 'Touch moved'
### End Example




##############################################################
# Section
Gestures Events

## Description
Monitor guestures events on the App.


##############################################################
## Method
onTap()

### Description
Called when the App has been tapped.

### Example
App.onTap (event) ->
	log 'tapped'
### End Example


##############################################################
## Method
onTapStart()

### Description
Called when the App is being tapped.

### Example
App.onTapStart (event) ->
	log 'tap event start'
### End Example


##############################################################
## Method
onTapEnd()

### Description
Called when the App has been tapped.

### Example
App.onTapEnd (event) ->
	log 'tap event ended'
### End Example


##############################################################
## Method
onDoubleTap()

### Description
Called when the App has been doubled tapped.

### Example
App.onDoubleTap (event) ->
	log 'App double tapped'
### End Example



##############################################################
## Method
onForceTap()

### Description
Called when the App has been force tapped.

### Example
App.onTap (event) ->
	log 'force tapped'
### End Example


##############################################################
## Method
onForceTapChange()

### Description
Called when the force event change.

### Example
App.onForceTapChange (event) ->
	log 'force tap pressure change'
### End Example


##############################################################
## Method
onForceTapStart()

### Description
Called when the App is being force tapped.

### Example
App.onForceTapStart (event) ->
	log 'force tap event start'
### End Example


##############################################################
## Method
onForceTapEnd()

### Description
Called when the App has been force tapped.

### Example
App.onForceTapEnd (event) ->
	log 'force tap event ended'
### End Example




##############################################################
## Method
onLongPress()

### Description
Called when the App has been long pressed.

### Example
App.onLongPress (event) ->
	log 'App long pressed'
### End Example


##############################################################
## Method
onLongPressStart()

### Description
Called when the App is being long pressed.

### Example
App.onLongPressStart (event) ->
	log 'long pressed start'
### End Example


##############################################################
## Method
onLongPressEnd()

### Description
Called when the App has been long pressed.

### Example
App.onLongPressEnd (event) ->
	log 'long pressed ended'
### End Example




##############################################################
## Method
onSwipe()

### Description
Called when the App has been swiped.

### Example
App.onSwipe (event) ->
	log 'App swiped'
### End Example


##############################################################
## Method
onSwipeStart()

### Description
Called when the App is being swiped.

### Example
App.onSwipeStart (event) ->
	log 'swipe event start'
### End Example


##############################################################
## Method
onSwipeEnd()

### Description
Called when the App has been swiped.

### Example
App.onSwipeEnd (event) ->
	log 'swipe event ended'
### End Example



##############################################################
## Method
onSwipeUp()

### Description
Called when the App has been swiped up.

### Example
App.onSwipeUp (event) ->
	log 'App swiped'
### End Example


##############################################################
## Method
onSwipeUpStart()

### Description
Called when the App is being swiped up.

### Example
App.onSwipeUpStart (event) ->
	log 'swipe event start'
### End Example


##############################################################
## Method
onSwipeUpEnd()

### Description
Called when the App has been swiped up.

### Example
App.onSwipeUpEnd (event) ->
	log 'swipe event ended'
### End Example



##############################################################
## Method
onSwipeDown()

### Description
Called when the App has been swiped down.

### Example
App.onSwipeDown (event) ->
	log 'App swiped'
### End Example


##############################################################
## Method
onSwipeDownStart()

### Description
Called when the App is being swiped down.

### Example
App.onSwipeDownStart (event) ->
	log 'swipe event start'
### End Example


##############################################################
## Method
onSwipeDownEnd()

### Description
Called when the App has been swiped down.

### Example
App.onSwipeDownEnd (event) ->
	log 'swipe event ended'
### End Example


##############################################################
## Method
onSwipeLeft()

### Description
Called when the App has been swiped left.

### Example
App.onSwipeLeft (event) ->
	log 'App swiped'
### End Example


##############################################################
## Method
onSwipeLeftStart()

### Description
Called when the App is being swiped left.

### Example
App.onSwipeLeftStart (event) ->
	log 'swipe event start'
### End Example


##############################################################
## Method
onSwipeLeftEnd()

### Description
Called when the App has been swiped left.

### Example
App.onSwipeLeftEnd (event) ->
	log 'swipe event ended'
### End Example


##############################################################
## Method
onSwipeRight()

### Description
Called when the App has been swiped right.

### Example
App.onSwipeDown (event) ->
	log 'App swiped'
### End Example


##############################################################
## Method
onSwipeRightStart()

### Description
Called when the App is being swiped right.

### Example
App.onSwipeDownStart (event) ->
	log 'swipe event start'
### End Example


##############################################################
## Method
onSwipeRightEnd()

### Description
Called when the App has been swiped right.

### Example
App.onSwipeRightEnd (event) ->
	log 'swipe event ended'
### End Example


##############################################################
## Method
onPan()

### Description
Called when the App has been panned.

### Example
App.onPan (event) ->
	log 'App panned'
### End Example


##############################################################
## Method
onPanStart()

### Description
Called when the App is being panned.

### Example
App.onPanStart (event) ->
	log 'pan event start'
### End Example


##############################################################
## Method
onPanEnd()

### Description
Called when the App has been panned.

### Example
App.onPanEnd (event) ->
	log 'pan event ended'
### End Example


##############################################################
## Method
onPanLeft()

### Description
Called when the App has been panned left.

### Example
App.onPanLeft (event) ->
	log 'App panned'
### End Example

##############################################################
## Method
onPanRight()

### Description
Called when the App has been panned right.

### Example
App.onPanRight (event) ->
	log 'App panned'
### End Example

##############################################################
## Method
onPanUp()

### Description
Called when the App has been panned up.

### Example
App.onPanUp (event) ->
	log 'App panned'
### End Example

##############################################################
## Method
onPanDown()

### Description
Called when the App has been panned down.

### Example
App.onPanDown (event) ->
	log 'App panned'
### End Example










