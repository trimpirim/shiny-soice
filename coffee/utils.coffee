class Utils 

    @rotateAroundObjectAxis: (object, axis, radians) ->
        m = new THREE.Matrix4()
        m.makeRotationAxis axis.normalize(), radians
        object.matrix.multiply m
        object.rotation.setFromRotationMatrix object.matrix

    @rotateAroundWorldAxis: (object, axis, radians) ->
        m = new THREE.Matrix4()
        m.makeRotationAxis axis.normalize(), radians
        m.multiply object.matrix
        object.matrix = m
        object.rotation.setFromRotationMatrix object.matrix

    @getXYOfScreen: () ->
        w = window
        d = document
        e = d.documentElement
        g = d.getElementsByTagName('body')[0]

        x = w.innerWidth || e.clientWidth || g.clientWidth
        y = w.innerHeight || e.clientHeight || g.clientHeight

        return {
            x: x,
            y: y
        }

    constructor: () ->
