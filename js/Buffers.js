var Buffers;

Buffers = (function() {
  function Buffers(indexExist) {
    this.indexExist = indexExist;
    this.buffers = {};
  }

  Buffers.prototype.add = function(name, buffer) {
    return this.buffers[name] = buffer;
  };

  Buffers.prototype.compile = function() {
    return this.loopAll(function(buffer) {
      return buffer.compile();
    });
  };

  Buffers.prototype.addVertex = function(name, data) {
    return this.add(name, new Buffer(GL.gl['ARRAY_BUFFER'], Float32Array, data));
  };

  Buffers.prototype.addIndex = function(name, data) {
    this.indexExist = true;
    return this.add(name, new Buffer(GL.gl['ELEMENT_ARRAY_BUFFER'], Uint16Array, data));
  };

  Buffers.prototype.loopAll = function(callback) {
    var buffer, key, _ref, _results;
    _ref = this.buffers;
    _results = [];
    for (key in _ref) {
      buffer = _ref[key];
      if (callback != null) {
        _results.push(callback(buffer, key));
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };

  return Buffers;

})();
