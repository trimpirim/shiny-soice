class Utils 
    constructor: () ->

    rotateAroundObjectAxis: (object, axis, radians) ->
        m = new THREE.Matrix4()
        m.makeRotationAxis axis.normalize(), radians
        object.matrix.multiply m
        object.rotation.setFromRotationMatrix object.matrix

    rotateAroundWorldAxis: (object, axis, radians) ->
        m = new THREE.Matrix4()
        m.makeRotationAxis axis.normalize(), radians
        m.multiply object.matrix
        object.matrix = m
        object.rotation.setFromRotationMatrix object.matrix
