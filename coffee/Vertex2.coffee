class Vertex2
  constructor: (@x, @y ) ->

  fromArray: (array) ->
    @x = array[0] if array[0]?
    @y = array[1] if array[1]?

  loopAll: (callback) ->
    callback @x if callback?
    callback @y if callback?

  isFull: () ->
    return if @x? and @y? then true else false

  loadCoordinate: (coordinate) ->
    if !@x?
      @x = coordinate
    else if !@y?
      @y = coordinate
