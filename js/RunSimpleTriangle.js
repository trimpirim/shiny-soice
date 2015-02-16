var RunSimpleTriangle,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

RunSimpleTriangle = (function(_super) {
  __extends(RunSimpleTriangle, _super);

  function RunSimpleTriangle() {
    RunSimpleTriangle.__super__.constructor.call(this);
  }

  RunSimpleTriangle.prototype.run = function() {
    var obj, vertices;
    vertices = new Vertices();
    vertices.from1DArray(SimpleTriangle.vertices);
    obj = new Object('simple-triangle', vertices, GL.gl['LINES']);
    obj.coordinates = [-1.5, 0.0, -4.0];
    obj.createColor(1.0);
    obj.ondrag = function(positions) {
      var matrix;
      matrix = mat4.create();
      mat4.identity(matrix);
      mat4.rotate(matrix, MathUtils.toRadians(positions.deltas.x / 5), [0, 1, 0]);
      mat4.rotate(matrix, MathUtils.toRadians(positions.deltas.y / 5), [1, 0, 0]);
      return mat4.multiply(matrix, this.modelMatrix, this.modelMatrix);
    };
    obj.onkeydown = function(ev) {
      var matrix;
      switch (ev.keyCode) {
        case 90:
          matrix = mat4.create();
          mat4.identity(matrix);
          mat4.rotate(matrix, MathUtils.toRadians(90.0), [0, 0, 1]);
          return mat4.multiply(matrix, this.modelMatrix, this.modelMatrix);
      }
    };
    this.gl.addObject(obj);
    this.gl.ondrag();
    this.gl.onkeydown();
    return this.gl.startGL();
  };

  return RunSimpleTriangle;

})(Run);
