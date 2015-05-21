class RunCube extends Run
  constructor: () ->
    super()

  run: () ->
    vertices = new Vertices()
    vertices.fromArray Cube.vertices

    faces = new Vertices()
    faces.fromArray Cube.faces

    obj = new Object 'cube', vertices, GL.gl['TRIANGLES'], faces 
    obj.coordinates = [-1.5, 0.0, -4.0]

    colorVertices = new Vertices()
    colorVertices.fromColorArray Cube.colors
    color = new Object 'color', colorVertices
    obj.color = color
    #obj.createColor()

    obj.ondrag = (positions) ->
      matrix = mat4.create()
      mat4.identity matrix
      mat4.rotate matrix, matrix, MathUtils.toRadians(positions.deltas.x / 5), [0, 1, 0]
      mat4.rotate matrix, matrix, MathUtils.toRadians(positions.deltas.y / 5), [1, 0, 0]
      mat4.multiply @modelMatrix, matrix, @modelMatrix

    obj.onkeydown = (ev) ->
      switch ev.keyCode
        when 90 #z
          matrix = mat4.create()
          mat4.identity matrix
          mat4.rotate matrix, matrix, MathUtils.toRadians(90.0), [0, 0, 1]
          mat4.multiply @modelMatrix, matrix, @modelMatrix

    @gl.addObject obj

    @gl.ondrag()
    @gl.onkeydown()

    @gl.startGL()