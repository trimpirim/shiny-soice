var Vertex,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Vertex = (function(_super) {
  __extends(Vertex, _super);

  function Vertex(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    Vertex.__super__.constructor.call(this, this.x, this.y);
  }

  Vertex.prototype.fromArray = function(array) {
    Vertex.__super__.fromArray.call(this, array);
    if (array[2] != null) {
      return this.z = array[2];
    }
  };

  Vertex.prototype.loopAll = function(callback) {
    Vertex.__super__.loopAll.call(this, callback);
    if (callback != null) {
      return callback(this.z);
    }
  };

  Vertex.prototype.isFull = function() {
    if (Vertex.__super__.isFull.call(this) && (this.z != null)) {
      return true;
    } else {
      return false;
    }
  };

  Vertex.prototype.loadCoordinate = function(coordinate) {
    if (this.x == null) {
      return this.x = coordinate;
    } else if (this.y == null) {
      return this.y = coordinate;
    } else if (this.z == null) {
      return this.z = coordinate;
    }
  };

  return Vertex;

})(Vertex2);
