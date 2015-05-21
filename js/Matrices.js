var Matrices;

Matrices = (function() {
  Matrices.projectionMatrix = mat4.create();

  Matrices.modelViewMatrix = mat4.create();

  Matrices.stacks = {
    'modelViewMatrix': [],
    'projectionMatrix': []
  };

  Matrices.getMatrix = function(matrixName) {
    if (this[matrixName] == null) {
      return null;
    } else {
      return this[matrixName];
    }
  };

  Matrices.pushMatrix = function(matrixName) {
    var copy;
    copy = mat4.create();
    mat4.copy(copy, this.getMatrix(matrixName));
    return this.stacks[matrixName].push(copy);
  };

  Matrices.popMatrix = function(matrixName) {
    var m;
    m = this.getMatrix(matrixName);
    if (this.stacks[matrixName].length === 0) {
      throw 'invalid matrix';
    }
    return this[matrixName] = this.stacks[matrixName].pop();
  };

  function Matrices() {}

  return Matrices;

})();
