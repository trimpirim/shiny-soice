class MathUtils
  @toRadians: (angle) ->
    angle * Math.PI / 180


class Quat
  @rotateX: (quat, angle, dest) ->
    if !dest?
      dest = quat

    quat4.multiply quat, [Math.sin(angle / 2), 0, 0, Math.cos(angle / 2)]