# Name
ListItem

# Description
ListItems are the views which populate Lists. They inherit all of the Views properties and methods and as such can be customized in the same way.

# Extends
view


##############################################################
## Overview
Overview

### Description
ListItems are created using the list.each() method. This will cycle through each index of the list and will allow you to create a new listItem for each index. Views can then be added to new ListItems.

### Example
myList.each (item, index) ->

	if not item
		item = new ListItem

		myView = new View
			width: 100
			height: 50
			parent: item
	item
### End Example


##############################################################
## Method
itemAtIndex()

### Description
Returns the index of the item in its parent list.

### Example
listItem.itemAtIndex()
# Output: Index of the listItem
### End Example


##############################################################
## Method
removeFromList()

### About Example
Removes the item from its parent list.

### Example
listItem.removeFromList()
### End Example

