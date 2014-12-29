class Shaders 
  construct: () ->

  getShaderTypeAndContent: (id) ->
    shaderScript = document.getElementById id

    return null if !shaderScript?

    result = 
      type: @getShaderType shaderScript
      content: @getShaderContent shaderScript

  getShaderContent: (script) ->
    str = ''
    fChild = script.firstChild
    while fChild 
      str += fChild.textContent if fChild.nodeType == 3
      fChild = fChild.nextSibling

    str

  getShaderType: (script) ->
    if script.type == 'x-shader/x-fragment'
      type = 'FRAGMENT_SHADER'
    else if script.type == 'x-shader/x-vertex'
      type = 'VERTEX_SHADER'

    type

  getShader: (gl, id) ->
    shader = null
    shaderTypeAndContent = @getShaderTypeAndContent id
    shader = gl.createShader(gl[shaderTypeAndContent.type])
    gl.shaderSource shader, shaderTypeAndContent.content
    gl.compileShader shader

    status = gl.getShaderParameter shader, gl.COMPILE_STATUS
    console.log gl.getShaderInfoLog shader if !status
    return null if !status

    return shader



