class Shape extends Object
  constructor: (@name, @vertices, @rowsCount, @columnsCount, @mode, @coordinates, @index, @color) ->
    super @name, @vertices, @rowsCount, @columnsCount, @mode, @coordinates, @index

  draw: () ->
    