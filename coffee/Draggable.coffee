class Draggable

  constructor: (@obj, @ondrag) ->
    @jqueryObj = $(@obj)
    @draggable = true
    @isDragging = false

    @positions = 
      old: new Vertex2()
      current: new Vertex2()
      deltas: new Vertex2() 

    @obj.onmousedown = @down
    @obj.onmouseup = @up

  draggable: (make = true) ->
    @draggable = make

  move: (ev) =>
    ev = @loadEvent ev
    if @isDragging
      @setPositions ev

      @ondrag(@positions) if @ondrag?

      return false

  setPositions: (ev) =>
    @positions.current.fromArray [ev.clientX, ev.clientY]
    @positions.deltas.fromArray [
      @positions.current.x - @positions.old.x,
      @positions.current.y - @positions.old.y
    ]
    @positions.old.fromArray [ev.clientX, ev.clientY]

  down: (ev) =>
    ev = @loadEvent ev
    @isDragging = true
    @obj.onmousemove = @move

    @positions.old.fromArray [ev.clientX, ev.clientY]

  up: (ev) =>
    ev = @loadEvent ev
    @isDragging = false
    @obj.onmousemove = null

  loadEvent: (ev) ->
    ev || window.event
