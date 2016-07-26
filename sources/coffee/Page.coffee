# *********************************
# *********************************
# Page.js
# *********************************
# ** By Etienne Pinchon
# ** ©2016

class Page extends View
	constructor: (options) ->
		super
	
	_kind : 'Page'
	
	# *********************************
	# title property
	# 
	# * Set the current title of the page
	@define 'title',
		configurable: true
		get: ->
			App.title
		set: (value) ->
			App.title = value
			return

	toInspect: ->
		if @name
			return "<Page id:#{@id} name:#{@name}>"
		return "<Page id:#{@id}>"

	isFirst : ->
		if not App._pages_counter
			return true
		else
			return false
