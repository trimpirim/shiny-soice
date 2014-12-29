var Object;

Object = (function() {
  function Object(name, vertices, rowsCount, columnsCount, mode, coordinates, index) {
    this.name = name;
    this.vertices = vertices;
    this.rowsCount = rowsCount;
    this.columnsCount = columnsCount;
    this.mode = mode;
    this.coordinates = coordinates;
    this.index = index;
  }

  Object.prototype.getVertices = function() {
    return this.vertices;
  };

  Object.prototype.getName = function() {
    return this.name;
  };

  Object.prototype.setBuffer = function(buffer) {
    return this.buffer = buffer;
  };

  Object.prototype.translate = function(matrix) {
    return mat4.translate(Matrices.getMatrix('modelViewMatrix', matrix));
  };

  Object.prototype.rotate = function(matrix, angle, axis, radians) {
    if (radians == null) {
      radians = false;
    }
    if (!radians) {
      angle = MathUtils.toRadians(angle);
    }
    return mat4.rotate(matrix, angle, axis);
  };

  return Object;

})();
