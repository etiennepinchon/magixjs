# *********************************
# *********************************
# Animator.js
# *********************************
# ** By Etienne Pinchon
# ** ©2016

class Animator

  constructor: (options={}) ->
    @setup options
    
  @setup: (options) ->
    throw Error('Not implemented')
    return

  @next: (delta) ->
    throw Error('Not implemented')
    return

  @finished: ->
    throw Error('Not implemented')
    return
