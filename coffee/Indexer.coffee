class Indexer 
  constructor: (@unique = [], @indices = [], @map = {}) ->

  add: (obj) ->
    key = JSON.stringify obj
    if !(key in @map) 
      @map[key] = @unique.length
      @unique.push obj

    return @map[key]