var GL,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

GL = (function() {
  GL.gl = null;

  GL.getGL = function() {
    return this.gl;
  };

  GL.setGL = function(gl) {
    return this.gl = gl;
  };

  function GL() {
    this.drawSceneAndAnimate = __bind(this.drawSceneAndAnimate, this);
    this.gl = null;
    this.canvas = document.getElementById('canvas');
    this.shaders = new Shaders();
    this.objects = new Objects();
    this.shaderProgram = null;
    this.initGL();
  }

  GL.prototype.initGL = function(canvas) {
    var e, gl;
    if (canvas == null) {
      canvas = this.canvas;
    }
    try {
      gl = canvas.getContext('experimental-webgl');
      this.setGL(gl);
      this.gl.viewportWidth = canvas.width;
      this.gl.viewportHeight = canvas.height;
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
        var buffer;
        buffer = _this.gl.createBuffer();
        _this.gl.bindBuffer(_this.gl.ARRAY_BUFFER, buffer);
        _this.gl.bufferData(_this.gl.ARRAY_BUFFER, new Float32Array(item.vertices), _this.gl.STATIC_DRAW);
        return item.setBuffer(buffer);
      };
    })(this));
  };

  GL.prototype.drawScene = function() {
    this.gl.viewport(0, 0, this.gl.viewportWidth, this.gl.viewportHeight);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    mat4.perspective(45, this.gl.viewportWidth / this.gl.viewportHeight, 0.1, 100.0, Matrices.getMatrix('projectionMatrix'));
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
        if (item.animation != null) {
          item.animation();
        }
        _this.loadObject(item);
        if (item.color != null) {
          _this.loadObject(item.color);
        }
        _this.setMatricesUniforms();
        _this.gl.drawArrays(item.mode, 0, item.rowsCount);
        return Matrices.popMatrix('modelViewMatrix');
      };
    })(this));
  };

  GL.prototype.loadObject = function(item) {
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, item.buffer);
    if (item instanceof Shape) {
      this.gl.vertexAttribPointer(this.shaderProgram.vertexPositionAttribute, item.columnsCount, this.gl.FLOAT, false, 0, 0);
    }
    if (item instanceof Color) {
      return this.gl.vertexAttribPointer(this.shaderProgram.vertexColorAttribute, item.columnsCount, this.gl.FLOAT, false, 0, 0);
    }
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

  return GL;

})();
