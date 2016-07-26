# *********************************
# *********************************
# Canvas.js
# *********************************
# ** By Etienne Pinchon
# ** ©2016

###
canvas = new Canvas
	width: 500
	height: 400
	parent: @

ctx = canvas.getContext('2d')
ctx.moveTo 0,0
ctx.lineTo 200,100
ctx.stroke()
###

class Canvas extends View
	constructor: (options) ->
		super
	
	_kind : 'Canvas'
	_elementType : 'canvas'

	getContext : (ctx="2d") ->
		@_element.getContext(ctx);


