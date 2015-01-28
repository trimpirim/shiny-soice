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
    var j, vertices;
    if (color == null) {
      color = null;
    }
    if ((this.color == null) && (this.vertices != null)) {
      j = this.vertices.getRowsCount();
      vertices = new Vertices();

      /*
        for x in [0..j] by 4
          
          rand = null
          vertex = null
          for i in [0..4] by 1
            if !rand?
              vertex = new Vertex4()
              for z in [0..3] by 1
                rand = Math.floor(Math.random() * 2)
                vertex.loadCoordinate rand
      
            vertices.add vertex
       */
      color = new Object('color', vertices);
      return this.color = color;
    }
  };

  return Object;

})();
