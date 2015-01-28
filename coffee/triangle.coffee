class TriangleRun extends Run
  constructor: () ->
    @gl = new GL()

  run: () ->
    vertices = new Vertices()
    vertices.from1DArray Triangle.vertices

    obj = new Object 'triangle', vertices, GL.gl['TRIANGLES']
    obj.coordinates = [-1.5, 0.0, -4.0]

    colorVertices = new Vertices()
    colorVertices.from1DArray Triangle.colors
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

