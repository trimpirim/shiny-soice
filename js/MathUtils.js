var MathUtils;

MathUtils = (function() {
  function MathUtils() {}

  MathUtils.toRadians = function(angle) {
    return angle * Math.PI / 180;
  };

  return MathUtils;

})();
