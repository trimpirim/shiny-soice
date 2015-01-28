class Object 
  constructor: (@name, @vertices, @mode, @faces, @coordinates, @index) ->
    @buffers = new Buffers()
    @color = null
    @modelMatrix = mat4.create()
    mat4.identity @modelMatrix
    @ondrag = null
    @onkeydown = null

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
    mat4.multiply matrix, @modelMatrix, @modelMatrix

  compileBuffers: () ->
    @buffers.compile()

  draw: () ->
    if @buffers.indexExist
      GL.gl.drawElements @mode, @faces.toArray().length, GL.gl['UNSIGNED_SHORT'], 0
    else 
      GL.gl.drawArrays @mode, 0, @vertices.getRowsCount()

  createColor: (color = null) ->
    if !@color? and @vertices?
      j = @vertices.getRowsCount()
      vertices = new Vertices()

      ###
        for x in [0..j] by 4
          
          rand = null
          vertex = null
          for i in [0..4] by 1
            if !rand?
              vertex = new Vertex4()
              for z in [0..3] by 1
                rand = Math.floor(Math.random() * 2)
                vertex.loadCoordinate rand

            vertices.add vertex###


      color = new Object 'color', vertices

      @color = color


