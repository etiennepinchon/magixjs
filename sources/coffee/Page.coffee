
# Page

class Page extends View
	constructor: (options) ->
		options.parent = -1 if options.url
		options.parent = App if not options.parent and not options.url
		super
	
	_kind : 'Page'
		
	######################################################
	# PROPERTIES

	@define 'title',
		configurable: yes
		get: ->
			App.title
		set: (value) ->
			App.title = value
			return

	@define 'url',
		configurable: yes
		get: -> @url
		set: (value) ->
			Routes.add(value, @)
			return

	######################################################
	# METHODS

	isFirst : ->
		return yes if not App._pages_counter
		return no

	toInspect: ->
		if @name
			return "<Page id:#{@id} name:#{@name}>"
		return "<Page id:#{@id}>"
