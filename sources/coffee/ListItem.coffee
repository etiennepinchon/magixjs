# *********************************
# *********************************
# ListItem
# *********************************
# ** By Etienne Pinchon
# ** ©2016

class ListItem extends View
	constructor: (properties) ->
		super

	_kind : 'ListItem'
	_elementType : 'li'


##############################################################
# METHODS

# *********************************
# itemIndex method
# *********************************
# ** Return the itemIndex of the item in the parent list

ListItem::itemIndex = ->
	if not this or not @parent or not @parent.children
		false
	
	for i of @parent.children
		if @parent.children[i] is this
			return parseInt(i, 10)

# *********************************
# removeFromList method
# *********************************
# ** Remove item from the parent list

ListItem::removeFromList = ->
	@parent.removeChild this
	return