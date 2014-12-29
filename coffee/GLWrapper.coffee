class GL
  @gl: null
  @getGL: ->
    @gl

  @setGL: (gl) ->
    @gl = gl

  constructor: () ->
    @gl = null
    @canvas = document.getElementById 'canvas'
    @shaders = new Shaders()
    #@matrices = new Matrices()
    @objects = new Objects()
    @shaderProgram = null
    @initGL()

  initGL: (canvas = @canvas) ->
    try 
      gl = canvas.getContext 'experimental-webgl'
      @setGL gl
      @gl.viewportWidth = canvas.width
      @gl.viewportHeight = canvas.height
    catch e
      console.log "Error initializing GL: #{e}"

    console.log "Error initializing GL." if !@gl?

  setGL: (gl) ->
    GL.setGL gl
    @gl = gl

  initShaders: () ->
    fShader = @shaders.getShader @gl, 'shader-fs'
    vShader = @shaders.getShader @gl, 'shader-vs'

    @shaderProgram = @gl.createProgram()

    @gl.attachShader @shaderProgram, vShader
    @gl.attachShader @shaderProgram, fShader

    @gl.linkProgram @shaderProgram

    console.log 'CAN NOT INITIALISE SHADERS' if !@gl.getProgramParameter @shaderProgram, @gl.LINK_STATUS

    @gl.useProgram @shaderProgram

    @shaderProgram.vertexPositionAttribute = @gl.getAttribLocation @shaderProgram, 'aVertexPosition'
    @gl.enableVertexAttribArray @shaderProgram.vertexPositionAttribute

    @shaderProgram.vertexColorAttribute = @gl.getAttribLocation @shaderProgram, "aVertexColor"
    @gl.enableVertexAttribArray @shaderProgram.vertexColorAttribute

    @shaderProgram.pMatrixUniform = @gl.getUniformLocation @shaderProgram, 'uPMatrix'
    @shaderProgram.mvMatrixUniform = @gl.getUniformLocation @shaderProgram, 'uMVMatrix'

  setMatricesUniforms: () ->
    @setMatrixUniform @shaderProgram.pMatrixUniform, Matrices.getMatrix('projectionMatrix')
    @setMatrixUniform @shaderProgram.mvMatrixUniform, Matrices.getMatrix('modelViewMatrix')

  setMatrixUniform: (shaderMatrixUniform, matrix) ->
    @gl.uniformMatrix4fv shaderMatrixUniform, false, matrix

  addObject: (obj) ->
    @objects.add obj

  ###addObject: (vertices, rowsCount, columnsCount, optionalParameters = {}) ->
    mode = @gl[optionalParameters.mode]

    @objects.add vertices, rowsCount, columnsCount, mode, optionalParameters##
  ###

  initObjects: () ->
    @objects.loopAll (item) =>
      buffer = @gl.createBuffer()
      @gl.bindBuffer @gl.ARRAY_BUFFER, buffer
      @gl.bufferData @gl.ARRAY_BUFFER, new Float32Array(item.vertices), @gl.STATIC_DRAW
      item.setBuffer buffer

  drawScene: () ->
    @gl.viewport 0, 0, @gl.viewportWidth, @gl.viewportHeight
    @gl.clear @gl.COLOR_BUFFER_BIT | @gl.DEPTH_BUFFER_BIT

    mat4.perspective 45, @gl.viewportWidth / @gl.viewportHeight, 0.1, 100.0, Matrices.getMatrix('projectionMatrix')
    mat4.identity Matrices.getMatrix('modelViewMatrix')

    @loadObjects()

  loadObjects: () ->
    @objects.loopOnlyShapes (item, index) =>
      mat4.translate Matrices.getMatrix('modelViewMatrix'), item.coordinates if item.coordinates?
      Matrices.pushMatrix 'modelViewMatrix'
      item.animation() if item.animation?
      @loadObject item
      @loadObject item.color if item.color?
      @setMatricesUniforms()
      @gl.drawArrays item.mode, 0, item.rowsCount
      Matrices.popMatrix 'modelViewMatrix'

  loadObject: (item) ->
    @gl.bindBuffer @gl.ARRAY_BUFFER, item.buffer
    if item instanceof Shape
      @gl.vertexAttribPointer @shaderProgram.vertexPositionAttribute, item.columnsCount, @gl.FLOAT, false, 0, 0
    if item instanceof Color
      @gl.vertexAttribPointer @shaderProgram.vertexColorAttribute, item.columnsCount, @gl.FLOAT, false, 0, 0

  startGL: () ->
    @initGL() if !@gl?
    @initShaders()
    @initObjects()
    @gl.clearColor 0.0, 0.0, 0.0, 1.0
    @gl.enable @gl.DEPTH_TEST
    @drawSceneAndAnimate()

  drawSceneAndAnimate: () =>
    requestAnimFrame @drawSceneAndAnimate
    @drawScene()



  

