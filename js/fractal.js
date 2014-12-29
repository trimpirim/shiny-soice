var Fractal;

Fractal = (function() {
  function Fractal() {
    this.gl = new GL();
  }

  Fractal.prototype.animate = function() {};

  Fractal.prototype.run = function() {
    var colors, coordinates, i, shape, vertices, _i;
    vertices = [0.0, 1.0, 0.0, -1.0, -1.0, 0.0, 1.0, -1.0, 0.0];
    coordinates = [-1.5, 0.0, -7.0];
    shape = new Triangle('triangle');
    shape.coordinates = coordinates;
    shape.animate = {
      lastTime: 0,
      lastRotation: 0
    };
    shape.animation = function() {
      var elapsed, r, timeNow;
      timeNow = new Date().getSeconds();
      r = 0;
      if (this.animate.lastTime !== 0 && this.animate.lastTime !== timeNow) {
        elapsed = timeNow - this.animate.lastTime;
        this.animate.lastRotation += 90 * elapsed;
      }
      this.animate.lastTime = timeNow;
      return this.rotate(Matrices.getMatrix('modelViewMatrix'), this.animate.lastRotation, [0, 1, 0]);
    };
    this.gl.addObject(shape);
    colors = [1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0];
    shape.color = new Color('triangleColor', colors, 3, 4);
    this.gl.addObject(shape.color);
    vertices = [1.0, 1.0, 0.0, -1.0, 1.0, 0.0, 1.0, -1.0, 0.0, -1.0, -1.0, 0.0];
    coordinates = [3.0, 0.0, 0.0];
    shape = new Square('square');
    shape.coordinates = coordinates;
    shape.animate = {
      lastTime: 0,
      lastRotation: 0
    };
    shape.animation = function() {
      var elapsed, r, timeNow;
      timeNow = new Date().getSeconds();
      r = 0;
      if (this.animate.lastTime !== 0 || this.animate.lastTime === timeNow) {
        elapsed = timeNow - this.animate.lastTime;
        this.animate.lastRotation += 75 * elapsed;
      }
      this.animate.lastTime = timeNow;
      return this.rotate(Matrices.getMatrix('modelViewMatrix'), this.animate.lastRotation, [1, 0, 0]);
    };
    console.log(shape);
    this.gl.addObject(shape);
    console.log(shape.mode);
    colors = [];
    for (i = _i = 0; _i <= 4; i = ++_i) {
      colors = colors.concat([0.5, 0.5, 1.0, 1.0]);
    }
    shape.color = new Color('squareColor', colors, 4, 4);
    this.gl.addObject(shape.color);
    return this.gl.startGL();
  };

  return Fractal;

})();
