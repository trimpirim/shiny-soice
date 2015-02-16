var RunSomeFigure,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

RunSomeFigure = (function(_super) {
  __extends(RunSomeFigure, _super);

  function RunSomeFigure() {
    RunSomeFigure.__super__.constructor.call(this);
  }

  RunSomeFigure.prototype.run = function() {
    var color, colorVertices, faces, obj, vertices;
    vertices = new Vertices();
    vertices.fromArray(SomeFigure.vertices);
    faces = new Vertices();
    faces.fromArray(SomeFigure.faces, function(coordinate) {
      var coord, r, _i, _len;
      r = [];
      for (_i = 0, _len = coordinate.length; _i < _len; _i++) {
        coord = coordinate[_i];
        r.push(coord - 1);
      }
      console.log('COORDS', r);
      return r;
    });
    obj = new Object('cube', vertices, GL.gl['LINE_LOOP'], faces);
    obj.coordinates = [-1.5, 0.0, -4.0];
    colorVertices = new Vertices();
    colorVertices.fromColorArray(SomeFigure.colors);
    color = new Object('color', colorVertices);
    obj.color = color;
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

  return RunSomeFigure;

})(Run);
