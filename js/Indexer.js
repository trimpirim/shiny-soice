var Indexer,
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

Indexer = (function() {
  function Indexer(unique, indices, map) {
    this.unique = unique != null ? unique : [];
    this.indices = indices != null ? indices : [];
    this.map = map != null ? map : {};
  }

  Indexer.prototype.add = function(obj) {
    var key;
    key = JSON.stringify(obj);
    if (!(__indexOf.call(this.map, key) >= 0)) {
      this.map[key] = this.unique.length;
      this.unique.push(obj);
    }
    return this.map[key];
  };

  return Indexer;

})();
