class Vertex
  constructor: (@x, @y, @z) ->

  fromArray: (array) ->
    @x = array[0] if array[0]?
    @y = array[1] if array[1]?
    @z = array[2] if array[2]?

  loopAll: (callback) ->
    callback @x if callback?
    callback @y if callback?
    callback @z if callback?

  isFull: () ->
    return if @x? and @y? and @z? then true else false

  loadCoordinate: (coordinate) ->
    ###
    switch null
      when @x
        @x = coordinate
      when @y
        @y = coordinate
      when @z
        @z = coordinate        
    ###
    if !@x?
      @x = coordinate
    else if !@y?
      @y = coordinate
    else if !@z?
      @z = coordinate
    