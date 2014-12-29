class Matrices 
  @projectionMatrix: mat4.create()
  @modelViewMatrix: mat4.create()
  @stacks: 
    'modelViewMatrix': []
    'projectionMatrix': []

  @getMatrix: (matrixName) ->
    if !@[matrixName]?
      return null
    else
      return @[matrixName]

  @pushMatrix: (matrixName) ->
    copy = mat4.create()
    mat4.set @getMatrix(matrixName), copy
    @stacks[matrixName].push copy

  @popMatrix: (matrixName) ->
    m = @getMatrix matrixName
    if @stacks[matrixName].length == 0 
      throw 'invalid matrix'
    @[matrixName] = @stacks[matrixName].pop()

  constructor: () ->

