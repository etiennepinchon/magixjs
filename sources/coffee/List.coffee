# *********************************
# *********************************
# List
# *********************************
# ** By Etienne Pinchon
# ** ©2016

class List extends View
	constructor: (properties) ->

		# Clone the properties
		properties_copy = Utils.clone(properties);

		# Remove the lenght and each props BEFORE calling the super
		if properties
			if properties.length
				delete properties.length
		
			if properties.each
				delete properties.each

		# Init super
		super properties
		
		
		@children = []
		@count = 0
		@functionAtIndex = false

		@functionToCount = ->
			@count

		# Horizontal property
		@horizontal = false
		
		# Properties check
		if properties_copy
			if properties_copy.length
				val = properties_copy.length
				@length val
				delete properties_copy.length
			
			if properties_copy.horizontal
				@horizontal = properties_copy.horizontal
			
			if properties_copy.vertical
				@horizontal = !properties_copy.vertical
			
			if properties_copy.each
				@each properties_copy.each
				delete properties_copy.each
		
		
	_kind : 'List'
	_elementType : 'ul'

	##############################################################
	# Methods

	# *********************************
	# length method
	#
	# * Set the number of item in the list with the help of a function

	length : (functionToCount) ->
		
		if functionToCount and typeof functionToCount is 'number'
			value = functionToCount

			functionToCount = ->
				value

		# If the count function is defined we add it
		if functionToCount
			@functionToCount = functionToCount
			return

		# Execute function to get the count
		number = @functionToCount()

		if typeof number isnt 'number'
			number = 0
		
		@count = number
		return @count

	# *********************************
	# each method
	#
	# * Loop through each data of the array and create the desired items

	each : (functionAtIndex) ->
		# Update counter
		@length()

		# Save function for reload data.
		if functionAtIndex
			#var string = String(functionAtIndex).slice(0, -1) + "return item;\n }";
			#string = string.match(/function[^{]+\{([\s\S]*)\}$/)[1];
			#this.functionAtIndex = new Function("item", "index", string);
			@functionAtIndex = functionAtIndex
	 
		_this = this

		# Loop through the data
		i = 0
		while i < @count
			if functionAtIndex
				viewItem = functionAtIndex(null, i)
				
				if not viewItem
					log 'List: nothing was return from the each function.'
					return
				
				if @horizontal
					viewItem.display = 'inline-block'
				else
					viewItem.display = 'block'
				_this.addChild viewItem
			i++
		return

	# *********************************
	# itemAtIndex method
	#
	# * Get the item at a specific index

	itemAtIndex : (index) ->
		@children[index]


	#addItem: (item, index) ->


	# *********************************
	# addItem method
	#
	# * Allow you to add an item of the list

	addItem : (item) ->
		@addChild item
		return


	# *********************************
	# removeItem method
	#
	# * Allow you to remove an item of the list

	removeItem : (item) ->
		@removeChild item
		return

	# *********************************
	# removeItemAtIndex method
	#
	# * Remove an item at an index

	removeItemAtIndex : (index) ->
		for i of @children
			if i is index
				@removeChild @parent.children[i]
				return
		return

	# *********************************
	# reload method
	#
	# * Reload the list

	reload : ->
		return if not @functionAtIndex

		# Update counter
		@length()

		# Look up for item that need to be deleted.
		if @count < @children.length
			#var removedItem = 0;
			children = @children.length
			i = 0
			while i < children
				if @count <= i
					@removeChild @children[0]
					#removedItem++;
				i++

		# Loop through the data
		i = 0

		while i < @count
			item = @children[i]
			indexedItem = @functionAtIndex(item, i)
			
			if @horizontal
				indexedItem.display = 'inline-block'
			else
				indexedItem.display = 'block'
				
			# If an item needs to be created
			if not item and indexedItem
				@addChild indexedItem
			i++
		return

	# kind of a hard reload
	reset : ->
		# First reset the list view..
		@_children = []
		@html = ''

		# .. Then redo the each
		@each(@functionAtIndex)

		