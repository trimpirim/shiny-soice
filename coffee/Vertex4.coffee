class Vertex4 extends Vertex
  constructor: (@x, @y, @z, @u) ->
    super(@x, @y, @z)

  fromArray: (array) ->
    super(array)
    @u = array[3] if array[3]?

  loopAll: (callback) ->
    super(callback)
    callback @u if callback?

  isFull: () ->
    return if super() and @u? then true else false

  loadCoordinate: (coordinate) ->
    if !@x?
      @x = coordinate
    else if !@y?
      @y = coordinate
    else if !@z?
      @z = coordinate
    else if !@u?
      @u = coordinate