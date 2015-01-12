class Objects 
  constructor: () ->
    @objects = {}
    @countAll = null
    @sorted = false

  add: (obj) ->
    count = @count() + 1
    obj.name = obj.name || count
    obj.index = count
    @objects[obj.name] = obj
    @sorted = false

  ###add: (vertices, rowsCount, columnsCount, mode, optionalParameters = {}) ->
    count = @count() + 1
    name = optionalParameters.name || count
    obj = new Object(
      name,
      vertices,
      rowsCount,
      columnsCount,
      mode,
      count,
      optionalParameters.coordinates
    )

    @objects[name] = obj
    @sorted = false###

  remove: (name) ->
    delete @objects[name]

  get: (name) ->
    @objects[name]

  loopAll: (callback) ->
    @sortedObjects = @sortByIndex() if !@sorted
    count = 0
    for obj in @sortedObjects
      count++
      callback obj, count if callback?

  _loopAll: (callback) ->
    count = 0
    for key, obj of @objects
      count++
      callback obj, count if callback?

  count: () ->
    @loopAll () =>
      @countAll++

    @countAll

  sortByIndex: () ->
    r = []
    @_loopAll (item, index) ->
      r.push item

    @sorted = true
    r.sort (a, b) ->
      return if (a.index > b.index) then 1 else -1
      return 0 if (a.index == b.index) 

  loopOnlyShapes: (callback) ->
    @loopAll (item, index) =>
      if item instanceof Object
        callback item, index if callback?

