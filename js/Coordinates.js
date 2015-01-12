var Vertices;

Vertices = (function() {
  function Vertices() {
    this.coords = [];
  }

  Vertices.prototype.setFromArray = function(coordinates) {
    var coordinate, vertex, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = coordinates.length; _i < _len; _i++) {
      coordinate = coordinates[_i];
      vertex = new Vertex();
      vertex.fromArray(coordinate);
      _results.push(this.coords.push(vertex));
    }
    return _results;
  };

  Vertices.prototype.toCoordinates = function() {
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

  return Vertices;

})();
