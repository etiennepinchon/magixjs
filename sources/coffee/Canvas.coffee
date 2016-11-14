
# Canvas

class Canvas extends View
	_kind 			: 'Canvas'
	_elementType 	: 'canvas'

	getContext : (ctx="2d") ->
		@_element.getContext(ctx);


