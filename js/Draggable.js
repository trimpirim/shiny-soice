var Draggable,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Draggable = (function() {
  function Draggable(obj, ondrag) {
    this.obj = obj;
    this.ondrag = ondrag;
    this.up = __bind(this.up, this);
    this.down = __bind(this.down, this);
    this.setPositions = __bind(this.setPositions, this);
    this.move = __bind(this.move, this);
    this.jqueryObj = $(this.obj);
    this.draggable = true;
    this.isDragging = false;
    this.positions = {
      old: new Vertex2(),
      current: new Vertex2(),
      deltas: new Vertex2()
    };
    this.obj.onmousedown = this.down;
    this.obj.onmouseup = this.up;
  }

  Draggable.prototype.draggable = function(make) {
    if (make == null) {
      make = true;
    }
    return this.draggable = make;
  };

  Draggable.prototype.move = function(ev) {
    ev = this.loadEvent(ev);
    if (this.isDragging) {
      this.setPositions(ev);
      if (this.ondrag != null) {
        this.ondrag(this.positions);
      }
      return false;
    }
  };

  Draggable.prototype.setPositions = function(ev) {
    this.positions.current.fromArray([ev.clientX, ev.clientY]);
    this.positions.deltas.fromArray([this.positions.current.x - this.positions.old.x, this.positions.current.y - this.positions.old.y]);
    return this.positions.old.fromArray([ev.clientX, ev.clientY]);
  };

  Draggable.prototype.down = function(ev) {
    ev = this.loadEvent(ev);
    this.isDragging = true;
    this.obj.onmousemove = this.move;
    this.positions.old.fromArray([ev.clientX, ev.clientY]);
    return console.log('OLD POSITIONS', this.positions.old);
  };

  Draggable.prototype.up = function(ev) {
    ev = this.loadEvent(ev);
    this.isDragging = false;
    this.obj.onmousemove = null;
    return console.log('CURRENT POSITIONS', this.positions.current);
  };

  Draggable.prototype.loadEvent = function(ev) {
    return ev || window.event;
  };

  return Draggable;

})();
