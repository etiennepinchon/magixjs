class Simulator extends Element

  @define "state",
    get: -> Utils.clone(@_state)
    set: (state) -> @_state = Utils.clone(state)

  constructor: (options={}) ->
    @_state = {x:0, v:0}
    @options = null
    @setup(options)

  setup: (options) ->
    throw Error "Not implemented"

  next: (delta) ->
    throw Error "Not implemented"

  finished: ->
    throw Error "Not implemented"
