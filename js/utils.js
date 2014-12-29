var Utils;

Utils = (function() {
  function Utils() {}

  Utils.prototype.rotateAroundObjectAxis = function(object, axis, radians) {
    var m;
    m = new THREE.Matrix4();
    m.makeRotationAxis(axis.normalize(), radians);
    object.matrix.multiply(m);
    return object.rotation.setFromRotationMatrix(object.matrix);
  };

  Utils.prototype.rotateAroundWorldAxis = function(object, axis, radians) {
    var m;
    m = new THREE.Matrix4();
    m.makeRotationAxis(axis.normalize(), radians);
    m.multiply(object.matrix);
    object.matrix = m;
    return object.rotation.setFromRotationMatrix(object.matrix);
  };

  return Utils;

})();
