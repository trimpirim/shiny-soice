var Object;

Object = (function() {
  function Object(name, vertices, mode, faces, coordinates, index) {
    this.name = name;
    this.vertices = vertices;
    this.mode = mode;
    this.faces = faces;
    this.coordinates = coordinates;
    this.index = index;
    this.buffers = new Buffers();
    this.color = null;
    this.modelMatrix = mat4.create();
    mat4.identity(this.modelMatrix);
    this.ondrag = null;
    this.onkeydown = null;
  }

  Object.prototype.getVertices = function() {
    return this.vertices;
  };

  Object.prototype.getName = function() {
    return this.name;
  };

  Object.prototype.addBuffer = function(name, buffer) {
    return this.buffers.add(name, buffer);
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
    mat4.rotate(matrix, angle, axis);
    return mat4.multiply(matrix, this.modelMatrix, this.modelMatrix);
  };

  Object.prototype.compileBuffers = function() {
    return this.buffers.compile();
  };

  Object.prototype.draw = function() {
    if (this.buffers.indexExist) {
      return GL.gl.drawElements(this.mode, this.faces.toArray().length, GL.gl['UNSIGNED_SHORT'], 0);
    } else {
      return GL.gl.drawArrays(this.mode, 0, this.vertices.getRowsCount());
    }
  };

  Object.prototype.createColor = function(color) {
    var i, j, rand, vertex, vertices, x, z, _i, _j, _k;
    if (color == null) {
      color = null;
    }
    if (this.vertices != null) {
      j = this.vertices.getRowsCount();
      vertices = new Vertices();
      for (x = _i = 0; _i <= j; x = _i += 4) {
        rand = null;
        vertex = null;
        for (i = _j = 0; _j <= 4; i = _j += 1) {
          vertex = new Vertex4();
          for (z = _k = 0; _k <= 3; z = _k += 1) {
            vertex.loadCoordinate(color);
          }

          /*if !rand?
            vertex = new Vertex4()
            for z in [0..3] by 1
              rand = Math.floor(Math.random() * 2)
              vertex.loadCoordinate rand
           */
          vertices.add(vertex);
        }
      }
      color = new Object('color', vertices);
      return this.color = color;
    }
  };

  return Object;

})();
