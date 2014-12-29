class Square extends Shape
  @VERTICES: [
    1.0,  1.0,  0.0,
    -1.0,  1.0,  0.0,
     1.0, -1.0,  0.0,
    -1.0, -1.0,  0.0
  ]
  @ROWS_COUNT: 4
  @COLUMNS_COUNT: 3

  constructor: (@name, @vertices, @rowsCount, @columnsCount, @mode, @coordinates, @index, @color) ->
    super @name, @vertices, @rowsCount, @columnsCount, @mode, @coordinates, @index, @color
    @mode = GL.gl['TRIANGLE_STRIP']
    @vertices = Square.VERTICES
    @rowsCount = Square.ROWS_COUNT
    @columnsCount = Square.COLUMNS_COUNT
