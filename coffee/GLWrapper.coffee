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
      xyOfScreen = Utils.getXYOfScreen()
      @canvas.width = xyOfScreen.x
      @canvas.height = xyOfScreen.y
      @gl.viewportWidth = xyOfScreen.x
      @gl.viewportHeight = xyOfScreen.y
      
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
      item.buffers.addVertex 'vertices', item.vertices.toArray()
      item.color.buffers.addVertex 'vertices', item.color.vertices.toArray() if item.color?
      item.buffers.addIndex 'indices', item.faces.toArray() if item.faces?
      item.compileBuffers()
      item.color.compileBuffers() if item.color?

      ###buffer = @gl.createBuffer()
      @gl.bindBuffer @gl.ARRAY_BUFFER, buffer
      @gl.bufferData @gl.ARRAY_BUFFER, new Float32Array(item.vertices.toArray()), @gl.STATIC_DRAW
      item.addBuffer 'vertex', buffer
      if item.faces?
        buffer = @gl.createBuffer()
        @gl.bindBuffer @gl.ELEMENT_ARRAY_BUFFER, buffer
        @gl.bufferData @gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(item.faces.toArray()), @gl.STATIC_DRAW
        item.addBuffer 'index', buffer###

  drawScene: () ->
    console.log @gl.viewportWidth
    @gl.viewport 0, 0, @gl.viewportWidth, @gl.viewportHeight
    @gl.clear @gl.COLOR_BUFFER_BIT | @gl.DEPTH_BUFFER_BIT

    mat4.perspective 45, @gl.viewportWidth / @gl.viewportHeight, 0.1, 1000.0, Matrices.getMatrix('projectionMatrix')
    mat4.identity Matrices.getMatrix('modelViewMatrix')

    @loadObjects()

  loadObjects: () ->
    @objects.loopOnlyShapes (item, index) =>
      mat4.translate Matrices.getMatrix('modelViewMatrix'), item.coordinates if item.coordinates?
      Matrices.pushMatrix 'modelViewMatrix'
      item.animation() if item.animation?
      console.log item.animation?
      @loadBuffers item
      @loadColor item.color if item.color?
      console.log item.color
      @setMatricesUniforms()
      item.draw()
      #@gl.drawArrays item.mode, 0, item.rowsCount
      Matrices.popMatrix 'modelViewMatrix'

  loadColor: (item) ->
    item.buffers.loopAll (buffer, key) =>
      @gl.bindBuffer buffer.target, buffer.buffer
      @gl.vertexAttribPointer @shaderProgram.vertexColorAttribute, item.vertices.getColumnsCount(), @gl.FLOAT, false, 0, 0

  loadBuffers: (item) ->
    item.buffers.loopAll (buffer, key) =>
      @gl.bindBuffer buffer.target, buffer.buffer
      if (buffer.target == @gl.ARRAY_BUFFER)
        @gl.vertexAttribPointer @shaderProgram.vertexPositionAttribute, item.vertices.getColumnsCount(), @gl.FLOAT, false, 0, 0

  loadObject: (item) ->
    @gl.bindBuffer @gl.ARRAY_BUFFER, item.buffer
    @gl.vertexAttribPointer @shaderProgram.vertexPositionAttribute, item.columnsCount, @gl.FLOAT, false, 0, 0
  
  startGL: () ->
    @initGL() if !@gl?
    @initShaders()
    @initObjects()
    @gl.clearColor 0.0, 0.0, 0.0, 1.0
    @gl.enable @gl.DEPTH_TEST
    #@drawSceneAndAnimate()
    @drawScene()

  drawSceneAndAnimate: () =>
    requestAnimFrame @drawSceneAndAnimate
    @drawScene()



  

