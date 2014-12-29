class Object 
  constructor: (@name, @vertices, @rowsCount, @columnsCount, @mode, @coordinates, @index) ->

  getVertices: () ->
    @vertices

  getName: () ->
    @name

  setBuffer: (buffer) ->
    @buffer = buffer

  translate: (matrix) ->
    mat4.translate Matrices.getMatrix 'modelViewMatrix', matrix

  rotate: (matrix, angle, axis, radians = false) ->
    angle = MathUtils.toRadians angle if !radians
    mat4.rotate matrix, angle, axis