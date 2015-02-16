var MathUtils, Quat;

MathUtils = (function() {
  function MathUtils() {}

  MathUtils.toRadians = function(angle) {
    return angle * Math.PI / 180;
  };

  return MathUtils;

})();

Quat = (function() {
  function Quat() {}

  Quat.rotateX = function(quat, angle, dest) {
    if (dest == null) {
      dest = quat;
    }
    return quat4.multiply(quat, [Math.sin(angle / 2), 0, 0, Math.cos(angle / 2)]);
  };

  return Quat;

})();
