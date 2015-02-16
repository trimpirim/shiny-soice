class Fractal 
  constructor: () ->
    @gl = new GL()

  animate: () ->

  run: () ->

    GL.gl.lineWidth(5.0)

    vertices = new Vertices()
    vertices.from1DArray EdgeAxis.vertices

    edgeAxis = new Object 'edge-axis', vertices, GL.gl['LINES']
    edgeAxis.createColor 0.2
    edgeAxis.coordinates = [0, 0, -2]
    edgeAxis.ondraw = ->
      ###matrix = mat4.create()
      mat4.identity matrix
      mat4.rotate matrix, MathUtils.toRadians(15), [1, 0, 0]
      mat4.rotate matrix, MathUtils.toRadians(-13), [0, 0, 1]
      mat4.multiply matrix, @modelMatrix, @modelMatrix###
      Quat.rotateX @modelMatrix, MathUtils.toRadians(10)
    edgeAxis.ondrag = (positions) ->
      matrix = mat4.create()
      mat4.identity matrix
      mat4.rotate matrix, MathUtils.toRadians(positions.deltas.x / 5), [0, 1, 0]
      mat4.rotate matrix, MathUtils.toRadians(positions.deltas.y / 5), [1, 0, 0]
      mat4.multiply matrix, @modelMatrix, @modelMatrix

    @gl.addObject edgeAxis

    vertices = new Vertices()
    vertices.from1DArray FaceAxis.vertices

    faceAxis = new Object 'face-axis', vertices, GL.gl['LINES']
    faceAxis.createColor 0.5
    faceAxis.coordinates = [0, 0, -2]
    faceAxis.ondraw = ->
      matrix = mat4.create()
      mat4.identity matrix
      mat4.rotate matrix, MathUtils.toRadians(-10), [1, 0, 0]
      mat4.rotate matrix, MathUtils.toRadians(5), [0, 0, 1]
      mat4.multiply matrix, @modelMatrix, @modelMatrix
    faceAxis.ondrag = (positions) ->
      matrix = mat4.create()
      mat4.identity matrix
      mat4.rotate matrix, MathUtils.toRadians(positions.deltas.x / 5), [0, 1, 0]
      mat4.rotate matrix, MathUtils.toRadians(positions.deltas.y / 5), [1, 0, 0]
      mat4.multiply matrix, @modelMatrix, @modelMatrix

    @gl.addObject faceAxis

    vertices = new Vertices()
    vertices.from1DArray VertexAxis.vertices

    vertexAxis = new Object 'vertex-axis', vertices, GL.gl['LINES']
    vertexAxis.createColor 1.0
    vertexAxis.coordinates = [0, 0, -2]
    vertexAxis.ondraw = ->
      matrix = mat4.create()
      mat4.identity matrix
      mat4.rotate matrix, MathUtils.toRadians(1), [0, 1, 0]
      mat4.multiply matrix, @modelMatrix, @modelMatrix
    vertexAxis.ondrag = (positions) ->
      matrix = mat4.create()
      mat4.identity matrix
      mat4.rotate matrix, MathUtils.toRadians(positions.deltas.x / 5), [0, 1, 0]
      mat4.rotate matrix, MathUtils.toRadians(positions.deltas.y / 5), [1, 0, 0]
      mat4.multiply matrix, @modelMatrix, @modelMatrix

    @gl.addObject vertexAxis

    vertices = new Vertices()
    vertices.fromArray SomeFigure.vertices

    faces = new Vertices()
    #faces.fromArray SnubCube.faces
    faces = new Vertices()
    faces.fromArray SomeFigure.faces, (coordinate) ->
      r = []
      for coord in coordinate
        r.push coord - 1

      r

    obj = new Object('someshit', vertices, GL.gl['TRIANGLES'], faces);
    obj.coordinates = [0, 0.0, -2.0]
    #obj.coordinates = [-1.5, 0.0, -4.0]

    colorVertices = new Vertices()
    colorVertices.fromArray SomeFigure.colors
    color = new Object 'someshitColors', colorVertices
    obj.color = color
    #obj.createColor(0.3)

    obj.ondrag = (positions) ->
      matrix = mat4.create()
      mat4.identity matrix
      mat4.rotate matrix, MathUtils.toRadians(positions.deltas.x / 5), [0, 1, 0]
      mat4.rotate matrix, MathUtils.toRadians(positions.deltas.y / 5), [1, 0, 0]
      mat4.multiply matrix, @modelMatrix, @modelMatrix

    obj.onkeydown = (ev) ->
      switch ev.keyCode
        when 90 #face
          TO_ROTATE = 1
          TIMES_TO_ROTATE = 180

          rotated = 0;

          interval = setInterval () =>
            mat4.rotate @modelMatrix, MathUtils.toRadians(TO_ROTATE), [1, 0, 0]

            rotated++

            if rotated == TIMES_TO_ROTATE
              clearInterval interval
          , TIME

        when 88 #edge
          TO_ROTATE = 1
          TIMES_TO_ROTATE = 120
          TIME = 10

          rotated = 0;

          interval = setInterval () =>
            #matrix = mat4.create()
            #mat4.identity @modelMatrix
            mat4.rotate @modelMatrix, MathUtils.toRadians(TO_ROTATE), [0, 0, 1]
            #mat4.multiply edgeAxis.modelMatrix, @modelMatrix, @modelMatrix

            #mat4.rotate @modelMatrix, MathUtils.toRadians(TO_ROTATE), [0, 0, 1]

            rotated++

            if rotated == TIMES_TO_ROTATE
              clearInterval interval
          , TIME

        when 89 #y
          TO_ROTATE = 1
          TIMES_TO_ROTATE = 72
          TIME = 10

          rotated = 0;

          interval = setInterval () =>
            #matrix = mat4.create()
            #mat4.identity @modelMatrix
            mat4.rotate @modelMatrix, MathUtils.toRadians(TO_ROTATE), [0, 1, 0]
            #mat4.multiply edgeAxis.modelMatrix, @modelMatrix, @modelMatrix

            #mat4.rotate @modelMatrix, MathUtils.toRadians(TO_ROTATE), [0, 0, 1]

            rotated++

            if rotated == TIMES_TO_ROTATE
              clearInterval interval
          , TIME

    @gl.addObject obj

    @gl.ondrag()
    @gl.onkeydown()

    @gl.startGL()

