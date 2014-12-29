var Objects;

Objects = (function() {
  function Objects() {
    this.objects = {};
    this.countAll = null;
    this.sorted = false;
  }

  Objects.prototype.add = function(obj) {
    var count;
    count = this.count() + 1;
    obj.name = obj.name || count;
    obj.index = count;
    this.objects[obj.name] = obj;
    return this.sorted = false;
  };


  /*add: (vertices, rowsCount, columnsCount, mode, optionalParameters = {}) ->
    count = @count() + 1
    name = optionalParameters.name || count
    obj = new Object(
      name,
      vertices,
      rowsCount,
      columnsCount,
      mode,
      count,
      optionalParameters.coordinates
    )
  
    @objects[name] = obj
    @sorted = false
   */

  Objects.prototype.remove = function(name) {
    return delete this.objects[name];
  };

  Objects.prototype.get = function(name) {
    return this.objects[name];
  };

  Objects.prototype.loopAll = function(callback) {
    var count, obj, _i, _len, _ref, _results;
    if (!this.sorted) {
      this.sortedObjects = this.sortByIndex();
    }
    count = 0;
    _ref = this.sortedObjects;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      obj = _ref[_i];
      count++;
      if (callback != null) {
        _results.push(callback(obj, count));
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };

  Objects.prototype._loopAll = function(callback) {
    var count, key, obj, _ref, _results;
    count = 0;
    _ref = this.objects;
    _results = [];
    for (key in _ref) {
      obj = _ref[key];
      count++;
      if (callback != null) {
        _results.push(callback(obj, count));
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };

  Objects.prototype.count = function() {
    this.loopAll((function(_this) {
      return function() {
        return _this.countAll++;
      };
    })(this));
    return this.countAll;
  };

  Objects.prototype.sortByIndex = function() {
    var r;
    r = [];
    this._loopAll(function(item, index) {
      return r.push(item);
    });
    this.sorted = true;
    return r.sort(function(a, b) {
      if (a.index > b.index) {
        return 1;
      } else {
        return -1;
      }
      if (a.index === b.index) {
        return 0;
      }
    });
  };

  Objects.prototype.loopOnlyShapes = function(callback) {
    return this.loopAll((function(_this) {
      return function(item, index) {
        if (item instanceof Shape) {
          if (callback != null) {
            return callback(item, index);
          }
        }
      };
    })(this));
  };

  return Objects;

})();
