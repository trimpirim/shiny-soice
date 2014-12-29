class Triangle extends Shape
  @VERTICES: [
    0.0, 1.0, 0.0,
    -1.0, -1.0, 0.0,
    1.0, -1.0, 0.0
  ]
  @ROWS_COUNT: 3
  @COLUMNS_COUNT: 3

  constructor: (@name, @vertices, @rowsCount, @columnsCount, @mode, @coordinates, @index, @color) ->
    super @name, @vertices, @rowsCount, @columnsCount, @mode, @coordinates, @index, @color
    @mode = GL.gl['TRIANGLES']
    @vertices = Triangle.VERTICES
    @rowsCount = Triangle.ROWS_COUNT
    @columnsCount = Triangle.COLUMNS_COUNT
