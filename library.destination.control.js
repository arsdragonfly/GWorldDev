var dc = {}
dc.setDestination = function(creep,object,key) {
  if (object) {
    if (creep.memory.destination == undefined) {
      creep.memory.destination = {}
    }
    creep.memory.destination[key] = {
      x: object.pos.x,
      y: object.pos.y
    }
  }
}.bind(dc)
dc.randomPick = function(array) {
  var len = array.length
  var index = Math.floor((Math.random() * len))
  return array[index]
}.bind(dc)
dc.initializeDestination = function(creep,array,key) {
  this.setDestination(creep,this.randomPick(array),key)
}.bind(dc)
dc.clearDestination = function(creep,key) {
  if (creep.memory.destination == undefined) {
    return
  }
  creep.memory.destination[key] = undefined
}.bind(dc)
dc.findDestinationInRoom = function(creep, key, type) {
  if (creep.memory.destination[key] != undefined) {
    var list = creep.room.lookAt(creep.memory.destination[key].x, creep.memory.destination[key].y)
    list = _.filter(list, function (x) {return x.type == type})
    list = _.map(list, function (x) {return x[type]})
    if (arguments[3] != undefined) {
      list = _.filter(list, arguments[3])
    }
    return list
  }
}.bind(dc)
dc.findDestinationInTargetRoom = function(creep, key, type, targetRoomName) {
  if (creep.memory.destination[key] != undefined) {
    var list = Game.rooms[targetRoomName].lookAt(creep.memory.destination[key].x, creep.memory.destination[key].y)
    list = _.filter(list, function (x) {return x.type == type})
    list = _.map(list, function (x) {return x[type]})
    if (arguments[4] != undefined) {
      list = _.filter(list, arguments[4])
    }
    return list
  }
}.bind(dc)
module.exports = dc
