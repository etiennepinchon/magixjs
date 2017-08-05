# Name
Page

# Description
Pages allow you to control sections of your App. They can be triggered with a specific URL. They allow you to separate your App into sections and control each section separately.

# Extends
view

##############################################################
## Property
title

### Type
<string>

### Description
Set the title of the webpage. This will be shown in the tab showing the webpage. The property is similar to App.title.

### Example
myPage = new Page
	title: 'This is a page title'
### End Example


##############################################################
## Property
parent

### Type
<View object>

### Description
Add view to Page

### Example
myPage = new Page

myView2 = new View
	parent = myPage

log myView2.parent
# Output: <Object:Page myPage>

# Remove from parent
myView2.parent = null
### End Example

##############################################################
## Property
url

### Type
<string>

### Description
Set the url of the page.

### Example
# Will display the page when the url is set to /articles
myPage = new Page
	url: '/articles'
### End Example


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
