class Buffer 
  constructor: (@target, @type, @data, @buffer) ->

  compile: (type) ->
    @buffer = @buffer || GL.gl.createBuffer()
    GL.gl.bindBuffer @target, @buffer
    GL.gl.bufferData @target, new @type(@data), type || GL.gl['STATIC_DRAW']
