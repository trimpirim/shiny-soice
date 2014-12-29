var Square,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Square = (function(_super) {
  __extends(Square, _super);

  Square.VERTICES = [1.0, 1.0, 0.0, -1.0, 1.0, 0.0, 1.0, -1.0, 0.0, -1.0, -1.0, 0.0];

  Square.ROWS_COUNT = 4;

  Square.COLUMNS_COUNT = 3;

  function Square(name, vertices, rowsCount, columnsCount, mode, coordinates, index, color) {
    this.name = name;
    this.vertices = vertices;
    this.rowsCount = rowsCount;
    this.columnsCount = columnsCount;
    this.mode = mode;
    this.coordinates = coordinates;
    this.index = index;
    this.color = color;
    Square.__super__.constructor.call(this, this.name, this.vertices, this.rowsCount, this.columnsCount, this.mode, this.coordinates, this.index, this.color);
    this.mode = GL.gl['TRIANGLE_STRIP'];
    this.vertices = Square.VERTICES;
    this.rowsCount = Square.ROWS_COUNT;
    this.columnsCount = Square.COLUMNS_COUNT;
  }

  return Square;

})(Shape);
