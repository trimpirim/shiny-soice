class Vertices
  constructor: () ->
    @coords = []

  fromArray: (coordinates, callback) ->
    for coordinate in coordinates
      coordinate = callback(coordinate) if callback?
      vertex = new Vertex()
      vertex.fromArray coordinate
      @coords.push vertex

  fromColorArray: (coordinates) ->
    for coordinate in coordinates
      vertex = new Vertex4()
      vertex.fromArray coordinate
      #for i in [0..2]
      @coords.push vertex

  toArray: () =>
    result = []
    for vertex in @coords
      vertex.loopAll (item) =>
        result.push item

    result

  from1DArray: (coordinates) ->
    vertex = new Vertex
    for coordinate in coordinates
      if (vertex.isFull())
        @coords.push vertex
        vertex = new Vertex()

      vertex.loadCoordinate coordinate

    @coords.push vertex


  getColumnsCount: () ->
    return 3

  getRowsCount: () ->
    return @coords.length

  add: (vertex) ->
    if (vertex instanceof Array)
      _v = new Vertex()
      _v.fromArray vertex
      vertex = _v

    @coords.push vertex

  getElementsCount: () ->
    return @coords.toArray().length


