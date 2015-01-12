var Vertex4,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Vertex4 = (function(_super) {
  __extends(Vertex4, _super);

  function Vertex4(x, y, z, u) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.u = u;
    Vertex4.__super__.constructor.call(this, this.x, this.y, this.z);
  }

  Vertex4.prototype.fromArray = function(array) {
    Vertex4.__super__.fromArray.call(this, array);
    if (array[3] != null) {
      return this.u = array[3];
    }
  };

  Vertex4.prototype.loopAll = function(callback) {
    Vertex4.__super__.loopAll.call(this, callback);
    if (callback != null) {
      return callback(this.u);
    }
  };

  return Vertex4;

})(Vertex);
