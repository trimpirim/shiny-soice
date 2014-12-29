var Triangle,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Triangle = (function(_super) {
  __extends(Triangle, _super);

  Triangle.VERTICES = [0.0, 1.0, 0.0, -1.0, -1.0, 0.0, 1.0, -1.0, 0.0];

  Triangle.ROWS_COUNT = 3;

  Triangle.COLUMNS_COUNT = 3;

  function Triangle(name, vertices, rowsCount, columnsCount, mode, coordinates, index, color) {
    this.name = name;
    this.vertices = vertices;
    this.rowsCount = rowsCount;
    this.columnsCount = columnsCount;
    this.mode = mode;
    this.coordinates = coordinates;
    this.index = index;
    this.color = color;
    Triangle.__super__.constructor.call(this, this.name, this.vertices, this.rowsCount, this.columnsCount, this.mode, this.coordinates, this.index, this.color);
    this.mode = GL.gl['TRIANGLES'];
    this.vertices = Triangle.VERTICES;
    this.rowsCount = Triangle.ROWS_COUNT;
    this.columnsCount = Triangle.COLUMNS_COUNT;
  }

  return Triangle;

})(Shape);
