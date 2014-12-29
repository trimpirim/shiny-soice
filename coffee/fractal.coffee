class Fractal 
  constructor: () ->
    @gl = new GL()

  animate: () ->


  run: () ->
    vertices = [
      0.0, 1.0, 0.0,
      -1.0, -1.0, 0.0,
      1.0, -1.0, 0.0
    ]
    coordinates = [
      -1.5, 0.0, -7.0
    ]
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
    @gl.addObject shape.color

    @gl.startGL()

