var Vertex;

Vertex = (function() {
  function Vertex(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  Vertex.prototype.fromArray = function(array) {
    if (array[0] != null) {
      this.x = array[0];
    }
    if (array[1] != null) {
      this.y = array[1];
    }
    if (array[2] != null) {
      return this.z = array[2];
    }
  };

  Vertex.prototype.loopAll = function(callback) {
    if (callback != null) {
      callback(this.x);
    }
    if (callback != null) {
      callback(this.y);
    }
    if (callback != null) {
      return callback(this.z);
    }
  };

  Vertex.prototype.isFull = function() {
    if ((this.x != null) && (this.y != null) && (this.z != null)) {
      return true;
    } else {
      return false;
    }
  };

  Vertex.prototype.loadCoordinate = function(coordinate) {

    /*
    switch null
      when @x
        @x = coordinate
      when @y
        @y = coordinate
      when @z
        @z = coordinate
     */
    if (this.x == null) {
      return this.x = coordinate;
    } else if (this.y == null) {
      return this.y = coordinate;
    } else if (this.z == null) {
      return this.z = coordinate;
    }
  };

  return Vertex;

})();
