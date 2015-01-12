class Object 
  constructor: (@name, @vertices, @mode, @faces, @coordinates, @index) ->
    @buffers = new Buffers()
    @color = null

  getVertices: () ->
    @vertices

  getName: () ->
    @name

  addBuffer: (name, buffer) ->
    @buffers.add name, buffer

  translate: (matrix) ->
    mat4.translate Matrices.getMatrix 'modelViewMatrix', matrix

  rotate: (matrix, angle, axis, radians = false) ->
    angle = MathUtils.toRadians angle if !radians
    mat4.rotate matrix, angle, axis

  compileBuffers: () ->
    @buffers.compile()

  draw: () ->
    if @buffers.indexExist
      GL.gl.drawElements @mode, @faces.toArray().length, GL.gl['UNSIGNED_SHORT'], 0
    else 
      GL.gl.drawArrays @mode, 0, @vertices.getRowsCount()

  createColor: (sameColor = true) ->
    if !@color? and @vertices?
      j = @vertices.getRowsCount()
      vertices = new Vertices()

      for x in [0..j] by 1
        vertexArray = []
        doneRandom = false
        rand = null
        for z in [0..4] by 1
          if !doneRandom or !sameColor
            rand = Math.floor((Math.random() * 3) - 1)
            doneRandom = true
          vertexArray.push rand

        vertex = new Vertex4()
        vertex.fromArray(vertexArray)
        vertices.add vertex

      color = new Object 'color', vertices

      @color = color



