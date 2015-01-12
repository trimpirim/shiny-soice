class Fractal 
  constructor: () ->
    @gl = new GL()

  animate: () ->


  run: () ->

    #poly = new POLY.Cube()

    ###vertices =  [
      [-5.32686493078343040,  3.31678957083588700,  0.08962330388534449],
      [ 2.67574770644435000,  1.52824236048779840, -7.38273997233198550],
      [-2.59197308036064640, -7.05749824018135460, -2.73375092876488160],
      [-0.01231524105263415, -3.18663714590574050,  7.33792832038931400],
      [ 5.25540554575236300,  5.39910345476341110,  2.68893927682220780]
    ];
    v = new Vertices()
    v.fromArray vertices

    faces = [
      [1, 4, 3],
      [1, 2, 0],
      [2, 3, 0],
      [3, 4, 0],
      [4, 1, 0]
    ];

    f = new Vertices()
    f.fromArray faces###

    vertices = new Vertices()
    vertices.fromArray Cube.vertices

    faces = new Vertices()
    faces.fromArray Cube.faces
    
    ###vertices = new Vertices()
    vertices.add new Vertex(0, 1, 0)
    vertices.add new Vertex(-1, -1, 1)
    vertices.add new Vertex(1, -1, 1)

    vertices.add new Vertex(0, 1, 0)
    vertices.add new Vertex(1, -1, 1)
    vertices.add new Vertex(1, -1, -1)

    vertices.add new Vertex(0, 1, 0)
    vertices.add new Vertex(1, -1, -1)
    vertices.add new Vertex(-1, -1, -1)

    vertices.add new Vertex(0, 1, 0)
    vertices.add new Vertex(-1, -1, -1)
    vertices.add new Vertex(-1, -1, 1)###

    ###py = new POLY.Pyramid4()
    vertices = new Vertices()
    console.log py.toCSG()
    return false
    vertices.fromArray py.toCoordinates()

    faces = new Vertices()
    faces.fromArray py.toFaces()###

    ###toLoadVertices = [
      -1.0, -1.0,  1.0,
       1.0, -1.0,  1.0,
       1.0,  1.0,  1.0,
      -1.0,  1.0,  1.0,
      -1.0, -1.0, -1.0,
      -1.0,  1.0, -1.0,
       1.0,  1.0, -1.0,
       1.0, -1.0, -1.0,
      -1.0,  1.0, -1.0,
      -1.0,  1.0,  1.0,
       1.0,  1.0,  1.0,
       1.0,  1.0, -1.0,
      -1.0, -1.0, -1.0,
       1.0, -1.0, -1.0,
       1.0, -1.0,  1.0,
      -1.0, -1.0,  1.0,
       1.0, -1.0, -1.0,
       1.0,  1.0, -1.0,
       1.0,  1.0,  1.0,
       1.0, -1.0,  1.0,
      -1.0, -1.0, -1.0,
      -1.0, -1.0,  1.0,
      -1.0,  1.0,  1.0,
      -1.0,  1.0, -1.0
    ];
    vertices = new Vertices()
    vertices.from1DArray toLoadVertices

    toLoadFaces = [
      0, 1, 2, 0, 2, 3,
      4, 5, 6, 4, 6, 7,
      8, 9, 10, 8, 10, 11,
      12, 13, 14, 12, 14, 15,
      16, 17, 18, 16, 18, 19,
      20, 21, 22, 20, 22, 23
    ];

    faces = new Vertices()
    faces.from1DArray toLoadFaces###

    obj = new Object('someshit', vertices, GL.gl['TRIANGLES'], faces);
    obj.coordinates = [-1.5, 0.0, -4.0]
    obj.createColor()
    obj.animate = {
      lastTime: 0
      lastRotation: 0
    }
    obj.animation = () ->
      timeNow = new Date().getSeconds()
      r = 0
      if @animate.lastTime != 0 && @animate.lastTime != timeNow
        elapsed = timeNow - @animate.lastTime
        @animate.lastRotation += (90 * elapsed)
      @animate.lastTime = timeNow

      @rotate Matrices.getMatrix('modelViewMatrix'), @animate.lastRotation, [0, 1, 0]
    @gl.addObject obj

    ###
    vertices = new Vertices()
    vertices.add new Vertex4(1, 0, 0, 1)
    vertices.add new Vertex4(0, 1, 0, 1)
    vertices.add new Vertex4(0, 0, 1, 1)

    vertices.add new Vertex4(1, 0, 0, 1)
    vertices.add new Vertex4(0, 0, 1, 1)
    vertices.add new Vertex4(0, 1, 0, 1)

    vertices.add new Vertex4(1, 0, 0, 1)
    vertices.add new Vertex4(0, 1, 0, 1)
    vertices.add new Vertex4(0, 0, 1, 1)

    vertices.add new Vertex4(1, 0, 0, 1)
    vertices.add new Vertex4(0, 0, 1, 1)
    vertices.add new Vertex4(0, 1, 0, 1)

    color = new Object('color', vertices)
    obj.color = color
    @gl.addObject color###


    ###vertices = [
      0.0, 1.0, 0.0,
      -1.0, -1.0, 0.0,
      1.0, -1.0, 0.0
    ]
    coordinates = [
      -1.5, 0.0, -7.0
    ]obj = new Object()

    shape = new Triangle('triangle')
    shape.coordinates = coordinates
    #shape = new Shape('triangle', vertices, 3, 3, 'TRIANGLES', coordinates)
    shape.animate = {
      lastTime: 0
      lastRotation: 0
    }
    shape.animation = () ->
      timeNow = new Date().getSeconds()
      r = 0
      if @animate.lastTime != 0 && @animate.lastTime != timeNow
        elapsed = timeNow - @animate.lastTime
        @animate.lastRotation += (90 * elapsed)
      @animate.lastTime = timeNow

      @rotate Matrices.getMatrix('modelViewMatrix'), @animate.lastRotation, [0, 1, 0]
    @gl.addObject shape

    colors = [
        1.0, 0.0, 0.0, 1.0,
        0.0, 1.0, 0.0, 1.0,
        0.0, 0.0, 1.0, 1.0
    ]
    shape.color = new Color('triangleColor', colors, 3, 4)
    @gl.addObject shape.color


    vertices = [
      1.0,  1.0,  0.0,
      -1.0,  1.0,  0.0,
       1.0, -1.0,  0.0,
      -1.0, -1.0,  0.0
    ]
    coordinates = [
      3.0, 0.0, 0.0
    ]
    shape = new Square('square')
    shape.coordinates = coordinates
    shape.animate = {
      lastTime: 0
      lastRotation: 0
    }
    shape.animation = () ->
      timeNow = new Date().getSeconds()
      r = 0
      if @animate.lastTime != 0 || @animate.lastTime == timeNow
        elapsed = timeNow - @animate.lastTime
        @animate.lastRotation += (75 * elapsed)
      @animate.lastTime = timeNow

      @rotate Matrices.getMatrix('modelViewMatrix'), @animate.lastRotation, [1, 0, 0]
    console.log shape
    @gl.addObject shape
    console.log shape.mode

    colors = []
    for i in [0..4]
      colors = colors.concat [0.5, 0.5, 1.0, 1.0]

    shape.color = new Color('squareColor', colors, 4, 4)
    @gl.addObject shape.color###

    @gl.startGL()

