class Vertex extends Vertex2
  constructor: (@x, @y, @z) ->
    super(@x, @y)

  fromArray: (array) ->
    super(array)
    @z = array[2] if array[2]?

  loopAll: (callback) ->
    super(callback)
    callback @z if callback?

  isFull: () ->
    return if super() and @z? then true else false

  loadCoordinate: (coordinate) ->
    if !@x?
      @x = coordinate
    else if !@y?
      @y = coordinate
    else if !@z?
      @z = coordinate
