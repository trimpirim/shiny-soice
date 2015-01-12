class Vertex4 extends Vertex
  constructor: (@x, @y, @z, @u) ->
    super(@x, @y, @z)

  fromArray: (array) ->
    super(array)
    @u = array[3] if array[3]?

  loopAll: (callback) ->
    super(callback)
    callback @u if callback?