class RunSomeFigure extends Run
  constructor: () ->
    super()

  run: () ->
    vertices = new Vertices()
    vertices.fromArray SomeFigure.vertices

    faces = new Vertices()
    faces.fromArray SomeFigure.faces, (coordinate) ->
      r = []
      for coord in coordinate
        r.push coord - 1

      console.log 'COORDS', r
      r

    obj = new Object 'cube', vertices, GL.gl['LINE_LOOP'], faces 
    obj.coordinates = [-1.5, 0.0, -4.0]

    colorVertices = new Vertices()
    colorVertices.fromColorArray SomeFigure.colors
    color = new Object 'color', colorVertices
    obj.color = color
    #obj.createColor()

    obj.ondrag = (positions) ->
      matrix = mat4.create()
      mat4.identity matrix
      mat4.rotate matrix, MathUtils.toRadians(positions.deltas.x / 5), [0, 1, 0]
      mat4.rotate matrix, MathUtils.toRadians(positions.deltas.y / 5), [1, 0, 0]
      mat4.multiply matrix, @modelMatrix, @modelMatrix

    obj.onkeydown = (ev) ->
      switch ev.keyCode
        when 90 #z
          matrix = mat4.create()
          mat4.identity matrix
          mat4.rotate matrix, MathUtils.toRadians(90.0), [0, 0, 1]
          mat4.multiply matrix, @modelMatrix, @modelMatrix

    @gl.addObject obj

    @gl.ondrag()
    @gl.onkeydown()

    @gl.startGL()