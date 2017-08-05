# Name
List

# Description
Lists are a collection of items which are displayed in a single row or column on the screen. They inherit all of the Views properties and methods and as such can be customized in the same way.

# Extends
view



##############################################################
## Overview
Overview

### Description
Lists are used to create vertical or horizontal collections	of items. For example it can be used to create a newsfeed or a list of Links for a menu.

### Example
menuOptions = [
	text: 'Home'
	link: '/'
,
	text: 'Creations'
	link: '/category/creations'
,
	text: 'Photography'
	link: '/category/photography'
,
	text: 'Travel'
	link: '/category/travel'
]

myList = new List
	x: 100
	y: 100
	length: menuOptions.length

myList.each (item, index) ->

	if not item
		item = new ListItem

		myLink = new Link
			text: menuOptions[index].text
			link: menuOptions[index].link
			padding: 4
			parent: item

	return item
### End Example

### About Example
You can easily add new items to a list.

### Example
menuOptions = [
	text: 'Home'
	link: '/'
]

myList = new List
	x: 100
	y: 100

myList.length ->
	return menuOptions.length

myList.each (item, index) ->

	if not item
		item = new ListItem

		item.link = new Link
			padding: 4
			parent: item

	item.link.text = menuOptions[index].text
	item.link.link = menuOptions[index].link
	return item

addButton = new Button
	x: 200
	y: 100
	backgroundColor: 'black'
	text: 'Add'
	click: ->
		menuOptions.push
				text: 'Category'
			link: '/category/Category'
		 
		myList.reload()
### End Example


##############################################################
## Method
length()

### Description
Set the number of items in the list.

### Example
myList = new List
	length: 5

length ->
	menuOptions.length
### End Example

##############################################################
## Method
each()

### Description
Initialises and returns all items which populate the list.

### Example
myList = new List
	length: menuOptions.length

myList.each (item, index) ->

	if not item
		item = new ListItem

		linkA = new Link
			background: '#F5F5F5'
			parent: item

	return item
### End Example


##############################################################
## Method
itemAtIndex(index)

### Description
Returns the listItem at the specified index. The following example is a continuation of the first example on this page.

### Example
log myList.itemAtIndex(0).linkA.text
# Output: 'Home'

log myList.itemAtIndex(2).linkA.text
# Output: 'Photography'
### End Example


##############################################################
## Method
removeItem(listItem)

### Description
Remove a listItem from the list. The following example is a continuation of the first example on this page.

### Example
# Remove the first item in the list
myList.removeItem myList.itemAtIndex(30)
### End Example

## removeItemAtIndex(index)

Removes the listItem at the specified index. The following example is a continuation of the first example on this page.

### Example
# Remove the first item in the list
myList.removeItemAtIndex(0)
### End Example


##############################################################
## Method
reload()

### Description
Reload the list. The following example is a continuation of the first example on this page.

### Example
menuOptions.push
	text: 'Blog'
	link: '/category/blog'

myList.reload()

# List now shows five items instead of four
### End Example


##############################################################
## Method
reset()

### Description
Hard reset the list

### Example
myList.reset()
### End Example
