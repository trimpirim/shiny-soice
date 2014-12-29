var Color,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Color = (function(_super) {
  __extends(Color, _super);

  function Color(name, vertices, rowsCount, columnsCount, mode, index, coordinates) {
    this.name = name;
    this.vertices = vertices;
    this.rowsCount = rowsCount;
    this.columnsCount = columnsCount;
    this.mode = mode;
    this.index = index;
    this.coordinates = coordinates;
    Color.__super__.constructor.call(this, this.name, this.vertices, this.rowsCount, this.columnsCount, this.mode, this.index, this.coordinates);
  }

  return Color;

})(Object);
