var GL,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

GL = (function() {
  GL.gl = null;

  GL.canvas = null;

  GL.getGL = function() {
    return this.gl;
  };

  GL.setGL = function(gl) {
    return this.gl = gl;
  };

  function GL() {
    this.drawSceneAndAnimate = __bind(this.drawSceneAndAnimate, this);
    this.gl = null;
    GL.canvas = document.getElementById('canvas');
    this.shaders = new Shaders();
    this.objects = new Objects();
    this.shaderProgram = null;
    this.initGL();
  }

  GL.prototype.initGL = function(canvas) {
    var e, gl, xyOfScreen;
    if (canvas == null) {
      canvas = GL.canvas;
    }
    try {
      gl = canvas.getContext('experimental-webgl');
      this.setGL(gl);
      xyOfScreen = Utils.getXYOfScreen();
      GL.canvas.width = xyOfScreen.x;
      GL.canvas.height = xyOfScreen.y;
      this.gl.viewportWidth = xyOfScreen.x;
      this.gl.viewportHeight = xyOfScreen.y;
    } catch (_error) {
      e = _error;
      console.log("Error initializing GL: " + e);
    }
    if (this.gl == null) {
      return console.log("Error initializing GL.");
    }
  };

  GL.prototype.setGL = function(gl) {
    GL.setGL(gl);
    return this.gl = gl;
  };

  GL.prototype.initShaders = function() {
    var fShader, vShader;
    fShader = this.shaders.getShader(this.gl, 'shader-fs');
    vShader = this.shaders.getShader(this.gl, 'shader-vs');
    this.shaderProgram = this.gl.createProgram();
    this.gl.attachShader(this.shaderProgram, vShader);
    this.gl.attachShader(this.shaderProgram, fShader);
    this.gl.linkProgram(this.shaderProgram);
    if (!this.gl.getProgramParameter(this.shaderProgram, this.gl.LINK_STATUS)) {
      console.log('CAN NOT INITIALISE SHADERS');
    }
    this.gl.useProgram(this.shaderProgram);
    this.shaderProgram.vertexPositionAttribute = this.gl.getAttribLocation(this.shaderProgram, 'aVertexPosition');
    this.gl.enableVertexAttribArray(this.shaderProgram.vertexPositionAttribute);
    this.shaderProgram.vertexColorAttribute = this.gl.getAttribLocation(this.shaderProgram, "aVertexColor");
    this.gl.enableVertexAttribArray(this.shaderProgram.vertexColorAttribute);
    this.shaderProgram.pMatrixUniform = this.gl.getUniformLocation(this.shaderProgram, 'uPMatrix');
    return this.shaderProgram.mvMatrixUniform = this.gl.getUniformLocation(this.shaderProgram, 'uMVMatrix');
  };

  GL.prototype.setMatricesUniforms = function() {
    this.setMatrixUniform(this.shaderProgram.pMatrixUniform, Matrices.getMatrix('projectionMatrix'));
    return this.setMatrixUniform(this.shaderProgram.mvMatrixUniform, Matrices.getMatrix('modelViewMatrix'));
  };

  GL.prototype.setMatrixUniform = function(shaderMatrixUniform, matrix) {
    return this.gl.uniformMatrix4fv(shaderMatrixUniform, false, matrix);
  };

  GL.prototype.addObject = function(obj) {
    return this.objects.add(obj);
  };


  /*addObject: (vertices, rowsCount, columnsCount, optionalParameters = {}) ->
    mode = @gl[optionalParameters.mode]
  
    @objects.add vertices, rowsCount, columnsCount, mode, optionalParameters##
   */

  GL.prototype.initObjects = function() {
    return this.objects.loopAll((function(_this) {
      return function(item) {
        item.buffers.addVertex('vertices', item.vertices.toArray());
        if (item.color != null) {
          item.color.buffers.addVertex('vertices', item.color.vertices.toArray());
        }
        if (item.faces != null) {
          item.buffers.addIndex('indices', item.faces.toArray());
        }
        item.compileBuffers();
        if (item.color != null) {
          return item.color.compileBuffers();
        }

        /*buffer = @gl.createBuffer()
        @gl.bindBuffer @gl.ARRAY_BUFFER, buffer
        @gl.bufferData @gl.ARRAY_BUFFER, new Float32Array(item.vertices.toArray()), @gl.STATIC_DRAW
        item.addBuffer 'vertex', buffer
        if item.faces?
          buffer = @gl.createBuffer()
          @gl.bindBuffer @gl.ELEMENT_ARRAY_BUFFER, buffer
          @gl.bufferData @gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(item.faces.toArray()), @gl.STATIC_DRAW
          item.addBuffer 'index', buffer
         */
      };
    })(this));
  };

  GL.prototype.drawScene = function() {
    this.gl.viewport(0, 0, this.gl.viewportWidth, this.gl.viewportHeight);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    mat4.perspective(45, this.gl.viewportWidth / this.gl.viewportHeight, 0.1, 1000.0, Matrices.getMatrix('projectionMatrix'));
    mat4.identity(Matrices.getMatrix('modelViewMatrix'));
    return this.loadObjects();
  };

  GL.prototype.loadObjects = function() {
    return this.objects.loopOnlyShapes((function(_this) {
      return function(item, index) {
        if (item.coordinates != null) {
          mat4.translate(Matrices.getMatrix('modelViewMatrix'), item.coordinates);
        }
        Matrices.pushMatrix('modelViewMatrix');
        mat4.multiply(Matrices.getMatrix('modelViewMatrix'), item.modelMatrix);
        _this.loadBuffers(item);
        if (item.color != null) {
          _this.loadColor(item.color);
        }
        _this.setMatricesUniforms();
        item.draw();
        return Matrices.popMatrix('modelViewMatrix');
      };
    })(this));
  };

  GL.prototype.loadColor = function(item) {
    return item.buffers.loopAll((function(_this) {
      return function(buffer, key) {
        _this.gl.bindBuffer(buffer.target, buffer.buffer);
        return _this.gl.vertexAttribPointer(_this.shaderProgram.vertexColorAttribute, item.vertices.getColumnsCount(), _this.gl.FLOAT, false, 0, 0);
      };
    })(this));
  };

  GL.prototype.loadBuffers = function(item) {
    return item.buffers.loopAll((function(_this) {
      return function(buffer, key) {
        _this.gl.bindBuffer(buffer.target, buffer.buffer);
        if (buffer.target === _this.gl.ARRAY_BUFFER) {
          return _this.gl.vertexAttribPointer(_this.shaderProgram.vertexPositionAttribute, item.vertices.getColumnsCount(), _this.gl.FLOAT, false, 0, 0);
        }
      };
    })(this));
  };

  GL.prototype.loadObject = function(item) {
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, item.buffer);
    return this.gl.vertexAttribPointer(this.shaderProgram.vertexPositionAttribute, item.columnsCount, this.gl.FLOAT, false, 0, 0);
  };

  GL.prototype.startGL = function() {
    if (this.gl == null) {
      this.initGL();
    }
    this.initShaders();
    this.initObjects();
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    return this.drawSceneAndAnimate();
  };

  GL.prototype.drawSceneAndAnimate = function() {
    requestAnimFrame(this.drawSceneAndAnimate);
    return this.drawScene();
  };

  GL.prototype.ondrag = function() {
    this.draggable = new Draggable(GL.canvas);
    return this.draggable.ondrag = (function(_this) {
      return function(positions) {
        return _this.objects.loopOnlyShapes(function(item) {
          if (item.ondrag != null) {
            return item.ondrag(positions);
          }
        });
      };
    })(this);
  };

  GL.prototype.onkeydown = function() {
    return GL.canvas.addEventListener('keydown', (function(_this) {
      return function(ev) {
        return _this.objects.loopOnlyShapes(function(item) {
          if (item.onkeydown != null) {
            return item.onkeydown(ev);
          }
        });
      };
    })(this), false);
  };

  return GL;

})();
