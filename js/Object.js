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
    return mat4.rotate(matrix, angle, axis);
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

  Object.prototype.createColor = function(sameColor) {
    var color, doneRandom, j, rand, vertex, vertexArray, vertices, x, z, _i, _j;
    if (sameColor == null) {
      sameColor = true;
    }
    if ((this.color == null) && (this.vertices != null)) {
      j = this.vertices.getRowsCount();
      vertices = new Vertices();
      for (x = _i = 0; _i <= j; x = _i += 1) {
        vertexArray = [];
        doneRandom = false;
        rand = null;
        for (z = _j = 0; _j <= 4; z = _j += 1) {
          if (!doneRandom || !sameColor) {
            rand = Math.floor((Math.random() * 3) - 1);
            doneRandom = true;
          }
          vertexArray.push(rand);
        }
        vertex = new Vertex4();
        vertex.fromArray(vertexArray);
        vertices.add(vertex);
      }
      color = new Object('color', vertices);
      return this.color = color;
    }
  };

  return Object;

})();
