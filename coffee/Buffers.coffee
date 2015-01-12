class Buffers 
  constructor: (@indexExist) ->
    @buffers = {}

  add: (name, buffer) ->
    @buffers[name] = buffer

  compile: () ->
    @loopAll (buffer) ->
      buffer.compile()

  addVertex: (name, data) ->
    @add name, new Buffer(GL.gl['ARRAY_BUFFER'], Float32Array, data)

  addIndex: (name, data) ->
    @indexExist = true
    @add name, new Buffer(GL.gl['ELEMENT_ARRAY_BUFFER'], Uint16Array, data)

  loopAll: (callback) ->
    for key, buffer of @buffers
      callback buffer, key if callback?