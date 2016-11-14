
# ListItem

class ListItem extends View

	_kind 			: 'ListItem'
	_elementType 	: 'li'

	itemIndex : ->
		if not this or not @parent or not @parent.children
			return no
		for i of @parent.children
			if @parent.children[i] is this
				return parseInt(i, 10)

	removeFromList : ->
		@parent.removeChild this
		return