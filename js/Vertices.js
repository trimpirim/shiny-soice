var Vertices,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Vertices = (function() {
  function Vertices() {
    this.toArray = __bind(this.toArray, this);
    this.coords = [];
  }

  Vertices.prototype.fromArray = function(coordinates, callback) {
    var coordinate, vertex, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = coordinates.length; _i < _len; _i++) {
      coordinate = coordinates[_i];
      if (callback != null) {
        coordinate = callback(coordinate);
      }
      vertex = new Vertex();
      vertex.fromArray(coordinate);
      _results.push(this.coords.push(vertex));
    }
    return _results;
  };

  Vertices.prototype.fromColorArray = function(coordinates) {
    var coordinate, vertex, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = coordinates.length; _i < _len; _i++) {
      coordinate = coordinates[_i];
      vertex = new Vertex4();
      vertex.fromArray(coordinate);
      _results.push(this.coords.push(vertex));
    }
    return _results;
  };

  Vertices.prototype.toArray = function() {
    var result, vertex, _i, _len, _ref;
    result = [];
    _ref = this.coords;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      vertex = _ref[_i];
      vertex.loopAll((function(_this) {
        return function(item) {
          return result.push(item);
        };
      })(this));
    }
    return result;
  };

  Vertices.prototype.from1DArray = function(coordinates) {
    var coordinate, vertex, _i, _len;
    vertex = new Vertex;
    for (_i = 0, _len = coordinates.length; _i < _len; _i++) {
      coordinate = coordinates[_i];
      if (vertex.isFull()) {
        this.coords.push(vertex);
        vertex = new Vertex();
      }
      vertex.loadCoordinate(coordinate);
    }
    return this.coords.push(vertex);
  };

  Vertices.prototype.getColumnsCount = function() {
    return 3;
  };

  Vertices.prototype.getRowsCount = function() {
    return this.coords.length;
  };

  Vertices.prototype.add = function(vertex) {
    var _v;
    if (vertex instanceof Array) {
      _v = new Vertex();
      _v.fromArray(vertex);
      vertex = _v;
    }
    return this.coords.push(vertex);
  };

  Vertices.prototype.getElementsCount = function() {
    return this.coords.toArray().length;
  };

  return Vertices;

})();
