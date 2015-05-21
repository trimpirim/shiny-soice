var RunSomeFigure,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

RunSomeFigure = (function(_super) {
  __extends(RunSomeFigure, _super);

  function RunSomeFigure() {
    RunSomeFigure.__super__.constructor.call(this);
  }

  RunSomeFigure.prototype.run = function() {
    var csg, edgeAxis, edgePoint, faceAxis, facePoint, obj, poly, vertexAxis, vertexPoint, vertices;
    GL.gl.lineWidth(5.0);
    vertices = new Vertices();
    vertices.from1DArray([7.36, 0, 0]);
    edgePoint = new Object('edge-point', vertices, GL.gl['POINTS']);
    edgePoint.createColor(1.0);
    edgePoint.ondraw = function(positions) {
      var matrix;
      matrix = mat4.create();
      mat4.identity(matrix);
      mat4.rotate(matrix, matrix, MathUtils.toRadians(70), [1, 0, 0]);
      mat4.rotate(matrix, matrix, MathUtils.toRadians(-8), [0, 1, 0]);
      return mat4.multiply(this.modelMatrix, matrix, this.modelMatrix);
    };
    edgePoint.ondrag = function(positions) {
      var matrix;
      matrix = mat4.create();
      mat4.identity(matrix);
      mat4.rotate(matrix, matrix, MathUtils.toRadians(positions.deltas.x / 5), [0, 1, 0]);
      mat4.rotate(matrix, matrix, MathUtils.toRadians(positions.deltas.y / 5), [1, 0, 0]);
      return mat4.multiply(this.modelMatrix, matrix, this.modelMatrix);
    };
    this.gl.addObject(edgePoint);
    vertices = new Vertices();
    vertices.from1DArray(EdgeAxis.vertices);
    edgeAxis = new Object('edge-axis', vertices, GL.gl['LINES']);
    edgeAxis.createColor(0.2);
    edgeAxis.ondraw = function() {
      var matrix;
      matrix = mat4.create();
      mat4.identity(matrix);
      mat4.rotate(matrix, matrix, MathUtils.toRadians(70), [1, 0, 0]);
      mat4.rotate(matrix, matrix, MathUtils.toRadians(-8), [0, 1, 0]);
      return mat4.multiply(this.modelMatrix, matrix, this.modelMatrix);
    };
    edgeAxis.ondrag = function(positions) {
      var matrix;
      matrix = mat4.create();
      mat4.identity(matrix);
      mat4.rotate(matrix, matrix, MathUtils.toRadians(positions.deltas.x / 5), [0, 1, 0]);
      mat4.rotate(matrix, matrix, MathUtils.toRadians(positions.deltas.y / 5), [1, 0, 0]);
      return mat4.multiply(this.modelMatrix, matrix, this.modelMatrix);
    };
    this.gl.addObject(edgeAxis);
    vertices = new Vertices();
    vertices.from1DArray([0, 7.36, 0]);
    facePoint = new Object('face-point', vertices, GL.gl['POINTS']);
    facePoint.createColor(1.0);
    facePoint.ondraw = function(positions) {
      var matrix;
      matrix = mat4.create();
      mat4.identity(matrix);
      mat4.rotate(matrix, matrix, MathUtils.toRadians(57), [1, 0, 0]);
      mat4.rotate(matrix, matrix, MathUtils.toRadians(-13), [0, 0, 1]);
      return mat4.multiply(this.modelMatrix, matrix, this.modelMatrix);
    };
    facePoint.ondrag = function(positions) {
      var matrix;
      matrix = mat4.create();
      mat4.identity(matrix);
      mat4.rotate(matrix, matrix, MathUtils.toRadians(positions.deltas.x / 5), [0, 1, 0]);
      mat4.rotate(matrix, matrix, MathUtils.toRadians(positions.deltas.y / 5), [1, 0, 0]);
      return mat4.multiply(this.modelMatrix, matrix, this.modelMatrix);
    };
    this.gl.addObject(facePoint);
    vertices = new Vertices();
    vertices.from1DArray(FaceAxis.vertices);
    faceAxis = new Object('face-axis', vertices, GL.gl['LINES']);
    faceAxis.createColor(0.5);
    faceAxis.ondraw = function() {
      var matrix;
      matrix = mat4.create();
      mat4.identity(matrix);
      mat4.rotate(matrix, matrix, MathUtils.toRadians(57), [1, 0, 0]);
      mat4.rotate(matrix, matrix, MathUtils.toRadians(-13), [0, 0, 1]);
      return mat4.multiply(this.modelMatrix, matrix, this.modelMatrix);
    };
    faceAxis.ondrag = function(positions) {
      var matrix;
      matrix = mat4.create();
      mat4.identity(matrix);
      mat4.rotate(matrix, matrix, MathUtils.toRadians(positions.deltas.x / 5), [0, 1, 0]);
      mat4.rotate(matrix, matrix, MathUtils.toRadians(positions.deltas.y / 5), [1, 0, 0]);
      return mat4.multiply(this.modelMatrix, matrix, this.modelMatrix);
    };
    this.gl.addObject(faceAxis);
    vertices = new Vertices();
    vertices.from1DArray([0, 0, 7.36]);
    vertexPoint = new Object('vertex-points', vertices, GL.gl['POINTS']);
    vertexPoint.createColor(1.0);
    vertexPoint.ondraw = function() {
      var matrix;
      matrix = mat4.create();
      mat4.identity(matrix);
      mat4.rotate(matrix, matrix, MathUtils.toRadians(-27), [0, 1, 0]);
      mat4.rotate(matrix, matrix, MathUtils.toRadians(-2), [1, 0, 0]);
      return mat4.multiply(this.modelMatrix, matrix, this.modelMatrix);
    };
    vertexPoint.ondrag = function(positions) {
      var matrix;
      matrix = mat4.create();
      mat4.identity(matrix);
      mat4.rotate(matrix, matrix, MathUtils.toRadians(positions.deltas.x / 5), [0, 1, 0]);
      mat4.rotate(matrix, matrix, MathUtils.toRadians(positions.deltas.y / 5), [1, 0, 0]);
      return mat4.multiply(this.modelMatrix, matrix, this.modelMatrix);
    };
    this.gl.addObject(vertexPoint);
    vertices = new Vertices();
    vertices.from1DArray(VertexAxis.vertices);
    vertexAxis = new Object('vertex-axis', vertices, GL.gl['LINES']);
    vertexAxis.createColor(1.0);
    vertexAxis.ondraw = function() {
      var matrix;
      matrix = mat4.create();
      mat4.identity(matrix);
      mat4.rotate(matrix, matrix, MathUtils.toRadians(-27), [0, 1, 0]);
      mat4.rotate(matrix, matrix, MathUtils.toRadians(-2), [1, 0, 0]);
      return mat4.multiply(this.modelMatrix, matrix, this.modelMatrix);
    };
    vertexAxis.ondrag = function(positions) {
      var matrix;
      matrix = mat4.create();
      mat4.identity(matrix);
      mat4.rotate(matrix, matrix, MathUtils.toRadians(positions.deltas.x / 5), [0, 1, 0]);
      mat4.rotate(matrix, matrix, MathUtils.toRadians(positions.deltas.y / 5), [1, 0, 0]);
      return mat4.multiply(this.modelMatrix, matrix, this.modelMatrix);
    };
    this.gl.addObject(vertexAxis);
    poly = POLY.SnubCube();
    csg = poly.toCSG();
    obj = Object.fromCSG(csg, 'snub-cube', GL.gl['TRIANGLES']);
    obj.ondraw = function() {};
    obj.ondrag = function(positions) {
      var matrix;
      matrix = mat4.create();
      mat4.identity(matrix);
      mat4.rotate(matrix, matrix, MathUtils.toRadians(positions.deltas.x / 5), [0, 1, 0]);
      mat4.rotate(matrix, matrix, MathUtils.toRadians(positions.deltas.y / 5), [1, 0, 0]);
      return mat4.multiply(this.modelMatrix, matrix, this.modelMatrix);
    };
    obj.onkeydown = function(ev) {
      var TIME, TIMES_TO_ROTATE, TO_ROTATE, destVec, interval, rotated, vec;
      switch (ev.keyCode) {
        case 90:
          console.log('#90 pressed z face');
          TO_ROTATE = 1;
          TIMES_TO_ROTATE = 360;
          rotated = 0;
          vec = vec4.fromValues(0, 0.736, 0, 0);
          destVec = vec4.fromValues(0, 0, 0, 0);
          vec4.transformMat4(destVec, vec, facePoint.modelMatrix);
          return interval = setInterval((function(_this) {
            return function() {
              var matrix;
              matrix = mat4.create();
              mat4.identity(matrix);
              mat4.rotate(matrix, matrix, MathUtils.toRadians(TO_ROTATE), destVec);
              mat4.multiply(_this.modelMatrix, matrix, _this.modelMatrix);
              rotated++;
              if (rotated === TIMES_TO_ROTATE) {
                return clearInterval(interval);
              }
            };
          })(this), TIME);
        case 88:
          console.log('#88 pressed x edge');
          TO_ROTATE = 1;
          TIMES_TO_ROTATE = 180;
          TIME = 10;
          rotated = 0;
          vec = vec4.fromValues(0.736, 0, 0, 0);
          destVec = vec4.fromValues(0, 0, 0, 0);
          vec4.transformMat4(destVec, vec, edgePoint.modelMatrix);
          return interval = setInterval((function(_this) {
            return function() {
              var matrix;
              matrix = mat4.create();
              mat4.identity(matrix);
              mat4.rotate(matrix, matrix, MathUtils.toRadians(TO_ROTATE), destVec);
              mat4.multiply(_this.modelMatrix, matrix, _this.modelMatrix);
              rotated++;
              if (rotated === TIMES_TO_ROTATE) {
                return clearInterval(interval);
              }
            };
          })(this), TIME);
        case 89:
          console.log('#89 pressed y vertex');
          TO_ROTATE = 1;
          TIMES_TO_ROTATE = 180;
          TIME = 10;
          rotated = 0;
          vec = vec4.fromValues(0, 0, 0.736, 0);
          destVec = vec4.fromValues(0, 0, 0, 0);
          vec4.transformMat4(destVec, vec, vertexPoint.modelMatrix);
          return interval = setInterval((function(_this) {
            return function() {
              var matrix;
              matrix = mat4.create();
              mat4.identity(matrix);
              mat4.rotate(matrix, matrix, MathUtils.toRadians(TO_ROTATE), destVec);
              mat4.multiply(_this.modelMatrix, matrix, _this.modelMatrix);
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

  return RunSomeFigure;

})(Run);
