var Fractal;

Fractal = (function() {
  function Fractal() {
    this.gl = new GL();
  }

  Fractal.prototype.animate = function() {};

  Fractal.prototype.run = function() {
    var color, colorVertices, edgeAxis, faceAxis, faces, obj, vertexAxis, vertices;
    GL.gl.lineWidth(5.0);
    vertices = new Vertices();
    vertices.from1DArray(EdgeAxis.vertices);
    edgeAxis = new Object('edge-axis', vertices, GL.gl['LINES']);
    edgeAxis.createColor(0.2);
    edgeAxis.coordinates = [0, 0, -2];
    edgeAxis.ondraw = function() {

      /*matrix = mat4.create()
      mat4.identity matrix
      mat4.rotate matrix, MathUtils.toRadians(15), [1, 0, 0]
      mat4.rotate matrix, MathUtils.toRadians(-13), [0, 0, 1]
      mat4.multiply matrix, @modelMatrix, @modelMatrix
       */
      return Quat.rotateX(this.modelMatrix, MathUtils.toRadians(10));
    };
    edgeAxis.ondrag = function(positions) {
      var matrix;
      matrix = mat4.create();
      mat4.identity(matrix);
      mat4.rotate(matrix, MathUtils.toRadians(positions.deltas.x / 5), [0, 1, 0]);
      mat4.rotate(matrix, MathUtils.toRadians(positions.deltas.y / 5), [1, 0, 0]);
      return mat4.multiply(matrix, this.modelMatrix, this.modelMatrix);
    };
    this.gl.addObject(edgeAxis);
    vertices = new Vertices();
    vertices.from1DArray(FaceAxis.vertices);
    faceAxis = new Object('face-axis', vertices, GL.gl['LINES']);
    faceAxis.createColor(0.5);
    faceAxis.coordinates = [0, 0, -2];
    faceAxis.ondraw = function() {
      var matrix;
      matrix = mat4.create();
      mat4.identity(matrix);
      mat4.rotate(matrix, MathUtils.toRadians(-10), [1, 0, 0]);
      mat4.rotate(matrix, MathUtils.toRadians(5), [0, 0, 1]);
      return mat4.multiply(matrix, this.modelMatrix, this.modelMatrix);
    };
    faceAxis.ondrag = function(positions) {
      var matrix;
      matrix = mat4.create();
      mat4.identity(matrix);
      mat4.rotate(matrix, MathUtils.toRadians(positions.deltas.x / 5), [0, 1, 0]);
      mat4.rotate(matrix, MathUtils.toRadians(positions.deltas.y / 5), [1, 0, 0]);
      return mat4.multiply(matrix, this.modelMatrix, this.modelMatrix);
    };
    this.gl.addObject(faceAxis);
    vertices = new Vertices();
    vertices.from1DArray(VertexAxis.vertices);
    vertexAxis = new Object('vertex-axis', vertices, GL.gl['LINES']);
    vertexAxis.createColor(1.0);
    vertexAxis.coordinates = [0, 0, -2];
    vertexAxis.ondraw = function() {
      var matrix;
      matrix = mat4.create();
      mat4.identity(matrix);
      mat4.rotate(matrix, MathUtils.toRadians(1), [0, 1, 0]);
      return mat4.multiply(matrix, this.modelMatrix, this.modelMatrix);
    };
    vertexAxis.ondrag = function(positions) {
      var matrix;
      matrix = mat4.create();
      mat4.identity(matrix);
      mat4.rotate(matrix, MathUtils.toRadians(positions.deltas.x / 5), [0, 1, 0]);
      mat4.rotate(matrix, MathUtils.toRadians(positions.deltas.y / 5), [1, 0, 0]);
      return mat4.multiply(matrix, this.modelMatrix, this.modelMatrix);
    };
    this.gl.addObject(vertexAxis);
    vertices = new Vertices();
    vertices.fromArray(SomeFigure.vertices);
    faces = new Vertices();
    faces = new Vertices();
    faces.fromArray(SomeFigure.faces, function(coordinate) {
      var coord, r, _i, _len;
      r = [];
      for (_i = 0, _len = coordinate.length; _i < _len; _i++) {
        coord = coordinate[_i];
        r.push(coord - 1);
      }
      return r;
    });
    obj = new Object('someshit', vertices, GL.gl['TRIANGLES'], faces);
    obj.coordinates = [0, 0.0, -2.0];
    colorVertices = new Vertices();
    colorVertices.fromArray(SomeFigure.colors);
    color = new Object('someshitColors', colorVertices);
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
      var TIME, TIMES_TO_ROTATE, TO_ROTATE, interval, rotated;
      switch (ev.keyCode) {
        case 90:
          TO_ROTATE = 1;
          TIMES_TO_ROTATE = 180;
          rotated = 0;
          return interval = setInterval((function(_this) {
            return function() {
              mat4.rotate(_this.modelMatrix, MathUtils.toRadians(TO_ROTATE), [1, 0, 0]);
              rotated++;
              if (rotated === TIMES_TO_ROTATE) {
                return clearInterval(interval);
              }
            };
          })(this), TIME);
        case 88:
          TO_ROTATE = 1;
          TIMES_TO_ROTATE = 120;
          TIME = 10;
          rotated = 0;
          return interval = setInterval((function(_this) {
            return function() {
              mat4.rotate(_this.modelMatrix, MathUtils.toRadians(TO_ROTATE), [0, 0, 1]);
              rotated++;
              if (rotated === TIMES_TO_ROTATE) {
                return clearInterval(interval);
              }
            };
          })(this), TIME);
        case 89:
          TO_ROTATE = 1;
          TIMES_TO_ROTATE = 72;
          TIME = 10;
          rotated = 0;
          return interval = setInterval((function(_this) {
            return function() {
              mat4.rotate(_this.modelMatrix, MathUtils.toRadians(TO_ROTATE), [0, 1, 0]);
              rotated++;
              if (rotated === TIMES_TO_ROTATE) {
                return clearInterval(interval);
              }
            };
          })(this), TIME);
      }
    };
    this.gl.addObject(obj);
    this.gl.ondrag();
    this.gl.onkeydown();
    return this.gl.startGL();
  };

  return Fractal;

})();
