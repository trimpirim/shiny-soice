class RunSomeFigure extends Run
  constructor: () ->
    super()

  run: () ->
    GL.gl.lineWidth(5.0)

    vertices = new Vertices()
    vertices.from1DArray [7.36, 0, 0]
    
    edgePoint = new Object 'edge-point', vertices, GL.gl['POINTS']
    edgePoint.createColor 1.0
    edgePoint.ondraw = (positions) ->
      matrix = mat4.create()
      mat4.identity matrix
      mat4.rotate matrix, matrix, MathUtils.toRadians(70), [1, 0, 0]
      mat4.rotate matrix, matrix, MathUtils.toRadians(-8), [0, 1, 0]
      mat4.multiply @modelMatrix, matrix, @modelMatrix
    
    edgePoint.ondrag = (positions) ->
      matrix = mat4.create()
      mat4.identity matrix
      mat4.rotate matrix, matrix, MathUtils.toRadians(positions.deltas.x / 5), [0, 1, 0]
      mat4.rotate matrix, matrix, MathUtils.toRadians(positions.deltas.y / 5), [1, 0, 0]
      mat4.multiply @modelMatrix, matrix, @modelMatrix

    @gl.addObject edgePoint

    vertices = new Vertices()
    vertices.from1DArray EdgeAxis.vertices

    edgeAxis = new Object 'edge-axis', vertices, GL.gl['LINES']
    edgeAxis.createColor 0.2
    edgeAxis.ondraw = ->
      matrix = mat4.create()
      mat4.identity matrix
      mat4.rotate matrix, matrix, MathUtils.toRadians(70), [1, 0, 0]
      mat4.rotate matrix, matrix, MathUtils.toRadians(-8), [0, 1, 0]
      mat4.multiply @modelMatrix, matrix, @modelMatrix
    edgeAxis.ondrag = (positions) ->
      matrix = mat4.create()
      mat4.identity matrix
      mat4.rotate matrix, matrix, MathUtils.toRadians(positions.deltas.x / 5), [0, 1, 0]
      mat4.rotate matrix, matrix, MathUtils.toRadians(positions.deltas.y / 5), [1, 0, 0]
      mat4.multiply @modelMatrix, matrix, @modelMatrix

    @gl.addObject edgeAxis

    vertices = new Vertices()
    vertices.from1DArray [0, 7.36, 0]
    
    facePoint = new Object 'face-point', vertices, GL.gl['POINTS']
    facePoint.createColor 1.0
    facePoint.ondraw = (positions) ->
      matrix = mat4.create()
      mat4.identity matrix
      mat4.rotate matrix, matrix, MathUtils.toRadians(57), [1, 0, 0]
      mat4.rotate matrix, matrix, MathUtils.toRadians(-13), [0, 0, 1]
      mat4.multiply @modelMatrix, matrix, @modelMatrix
    
    facePoint.ondrag = (positions) ->
      matrix = mat4.create()
      mat4.identity matrix
      mat4.rotate matrix, matrix, MathUtils.toRadians(positions.deltas.x / 5), [0, 1, 0]
      mat4.rotate matrix, matrix, MathUtils.toRadians(positions.deltas.y / 5), [1, 0, 0]
      mat4.multiply @modelMatrix, matrix, @modelMatrix

    @gl.addObject facePoint


    vertices = new Vertices()
    vertices.from1DArray FaceAxis.vertices

    faceAxis = new Object 'face-axis', vertices, GL.gl['LINES']
    faceAxis.createColor 0.5
    faceAxis.ondraw = ->
      matrix = mat4.create()
      mat4.identity matrix
      mat4.rotate matrix, matrix, MathUtils.toRadians(57), [1, 0, 0]
      mat4.rotate matrix, matrix, MathUtils.toRadians(-13), [0, 0, 1]
      mat4.multiply @modelMatrix, matrix, @modelMatrix
    faceAxis.ondrag = (positions) ->
      matrix = mat4.create()
      mat4.identity matrix
      mat4.rotate matrix, matrix, MathUtils.toRadians(positions.deltas.x / 5), [0, 1, 0]
      mat4.rotate matrix, matrix, MathUtils.toRadians(positions.deltas.y / 5), [1, 0, 0]
      mat4.multiply @modelMatrix, matrix, @modelMatrix

    @gl.addObject faceAxis

    vertices = new Vertices()
    vertices.from1DArray [0, 0, 7.36]

    vertexPoint = new Object 'vertex-points', vertices, GL.gl['POINTS']
    vertexPoint.createColor 1.0
    vertexPoint.ondraw = ->
      matrix = mat4.create()
      mat4.identity matrix
      mat4.rotate matrix, matrix, MathUtils.toRadians(-27), [0, 1, 0]
      mat4.rotate matrix, matrix, MathUtils.toRadians(-2), [1, 0, 0]
      mat4.multiply @modelMatrix, matrix, @modelMatrix
    vertexPoint.ondrag = (positions) ->
      matrix = mat4.create()
      mat4.identity matrix
      mat4.rotate matrix, matrix, MathUtils.toRadians(positions.deltas.x / 5), [0, 1, 0]
      mat4.rotate matrix, matrix, MathUtils.toRadians(positions.deltas.y / 5), [1, 0, 0]
      mat4.multiply @modelMatrix, matrix, @modelMatrix

    @gl.addObject vertexPoint

    vertices = new Vertices()
    vertices.from1DArray VertexAxis.vertices

    vertexAxis = new Object 'vertex-axis', vertices, GL.gl['LINES']
    vertexAxis.createColor 1.0
    vertexAxis.ondraw = ->
      matrix = mat4.create()
      mat4.identity matrix
      mat4.rotate matrix, matrix, MathUtils.toRadians(-27), [0, 1, 0]
      mat4.rotate matrix, matrix, MathUtils.toRadians(-2), [1, 0, 0]
      mat4.multiply @modelMatrix, matrix, @modelMatrix
    vertexAxis.ondrag = (positions) ->
      matrix = mat4.create()
      mat4.identity matrix
      mat4.rotate matrix, matrix, MathUtils.toRadians(positions.deltas.x / 5), [0, 1, 0]
      mat4.rotate matrix, matrix, MathUtils.toRadians(positions.deltas.y / 5), [1, 0, 0]
      mat4.multiply @modelMatrix, matrix, @modelMatrix

    @gl.addObject vertexAxis

    poly = POLY.SnubCube()
    csg = poly.toCSG()

    obj = Object.fromCSG csg, 'snub-cube', GL.gl['TRIANGLES']

    obj.ondraw = ->
      #mat4.translate @modelMatrix, 20, 2000, 20
      #mat4.multiply Matrices.getMatrix('modelViewMatrix'), @modelMatrix
      #mat4.translate Matrices.getMatrix('modelViewMatrix'), [0, 0, 0]

    obj.ondrag = (positions) ->
      matrix = mat4.create()
      mat4.identity matrix
      mat4.rotate matrix, matrix, MathUtils.toRadians(positions.deltas.x / 5), [0, 1, 0]
      mat4.rotate matrix, matrix, MathUtils.toRadians(positions.deltas.y / 5), [1, 0, 0]
      mat4.multiply @modelMatrix, matrix, @modelMatrix

    obj.onkeydown = (ev) ->
      switch ev.keyCode
        when 90 #face z
          console.log '#90 pressed z face'
          TO_ROTATE = 1
          TIMES_TO_ROTATE = 360

          rotated = 0;

          vec = vec4.fromValues 0, 0.736, 0, 0
          destVec = vec4.fromValues 0, 0, 0, 0
          vec4.transformMat4 destVec, vec, facePoint.modelMatrix

          interval = setInterval () =>
            matrix = mat4.create()
            mat4.identity matrix
            mat4.rotate matrix, matrix, MathUtils.toRadians(TO_ROTATE), destVec
            mat4.multiply @modelMatrix, matrix, @modelMatrix
            rotated++

            if rotated == TIMES_TO_ROTATE
              clearInterval interval
          , TIME

        when 88 #edge x
          console.log '#88 pressed x edge'
          TO_ROTATE = 1
          TIMES_TO_ROTATE = 180
          TIME = 10

          rotated = 0;

          vec = vec4.fromValues 0.736, 0, 0, 0
          destVec = vec4.fromValues 0, 0, 0, 0
          vec4.transformMat4 destVec, vec, edgePoint.modelMatrix

          interval = setInterval () =>
            matrix = mat4.create()
            mat4.identity matrix
            mat4.rotate matrix, matrix, MathUtils.toRadians(TO_ROTATE), destVec
            mat4.multiply @modelMatrix, matrix, @modelMatrix
            rotated++

            if rotated == TIMES_TO_ROTATE
              clearInterval interval
          , TIME


        when 89 #vertex y
          console.log '#89 pressed y vertex'
          TO_ROTATE = 1
          TIMES_TO_ROTATE = 180
          TIME = 10

          rotated = 0;

          vec = vec4.fromValues 0, 0, 0.736, 0
          destVec = vec4.fromValues 0, 0, 0, 0
          vec4.transformMat4 destVec, vec, vertexPoint.modelMatrix

          interval = setInterval () =>
            matrix = mat4.create()
            mat4.identity matrix
            mat4.rotate matrix, matrix, MathUtils.toRadians(TO_ROTATE), destVec
            mat4.multiply @modelMatrix, matrix, @modelMatrix
            rotated++

            if rotated == TIMES_TO_ROTATE
              clearInterval interval
          , TIME

    @gl.addObject obj

    @gl.ondrag()
    @gl.onkeydown()

    @gl.startGL()