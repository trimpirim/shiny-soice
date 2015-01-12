var Utils;

Utils = (function() {
  Utils.rotateAroundObjectAxis = function(object, axis, radians) {
    var m;
    m = new THREE.Matrix4();
    m.makeRotationAxis(axis.normalize(), radians);
    object.matrix.multiply(m);
    return object.rotation.setFromRotationMatrix(object.matrix);
  };

  Utils.rotateAroundWorldAxis = function(object, axis, radians) {
    var m;
    m = new THREE.Matrix4();
    m.makeRotationAxis(axis.normalize(), radians);
    m.multiply(object.matrix);
    object.matrix = m;
    return object.rotation.setFromRotationMatrix(object.matrix);
  };

  Utils.getXYOfScreen = function() {
    var d, e, g, w, x, y;
    w = window;
    d = document;
    e = d.documentElement;
    g = d.getElementsByTagName('body')[0];
    x = w.innerWidth || e.clientWidth || g.clientWidth;
    y = w.innerHeight || e.clientHeight || g.clientHeight;
    return {
      x: x,
      y: y
    };
  };

  function Utils() {}

  return Utils;

})();
