var Buffer;

Buffer = (function() {
  function Buffer(target, type, data, buffer) {
    this.target = target;
    this.type = type;
    this.data = data;
    this.buffer = buffer;
  }

  Buffer.prototype.compile = function(type) {
    this.buffer = this.buffer || GL.gl.createBuffer();
    GL.gl.bindBuffer(this.target, this.buffer);
    return GL.gl.bufferData(this.target, new this.type(this.data), type || GL.gl['STATIC_DRAW']);
  };

  return Buffer;

})();
