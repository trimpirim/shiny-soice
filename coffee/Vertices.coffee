class Vertices
  constructor: () ->
    @coords = []

  fromArray: (coordinates) ->
    for coordinate in coordinates
      vertex = new Vertex()
      vertex.fromArray coordinate
      @coords.push vertex

  fromColorArray: (coordinates) ->
    for coordinate in coordinates
      vertex = new Vertex4()
      vertex.fromArray coordinate
      for i in [0..4]
        @coords = @coords.concat vertex

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
    @coords.push vertex

  getElementsCount: () ->
    return @coords.toArray().length


