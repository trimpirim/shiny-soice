var Shape,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Shape = (function(_super) {
  __extends(Shape, _super);

  function Shape(name, vertices, rowsCount, columnsCount, mode, coordinates, index, color) {
    this.name = name;
    this.vertices = vertices;
    this.rowsCount = rowsCount;
    this.columnsCount = columnsCount;
    this.mode = mode;
    this.coordinates = coordinates;
    this.index = index;
    this.color = color;
    Shape.__super__.constructor.call(this, this.name, this.vertices, this.rowsCount, this.columnsCount, this.mode, this.coordinates, this.index);
  }

  Shape.prototype.draw = function() {};

  return Shape;

})(Object);
