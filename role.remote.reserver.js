var filters = require('library.filters')
var cf = require('library.creep.features')
var dc = require('library.destination.control')

var rr = {
  run: function(creep) {
    if (creep.memory.targetRoomName == undefined) {
      var roomName = creep.memory.roomName
      var targetRoomNames = Memory.userdata.roomConfig[roomName].remoteHarvestingRooms
      var possibleRoomNames = new Array()
      for (i in targetRoomNames) {
        if (Game.rooms[targetRoomNames[i]] != undefined) {
          var targets = Game.rooms[targetRoomNames[i]].find(FIND_STRUCTURES,{filter: (structure) => {return structure.structureType == STRUCTURE_CONTROLLER}}) //TODO: rework the filter
          if (targets.length > 0) {
            possibleRoomNames.push(targetRoomNames[i])
          }
        }
      }
      if (possibleRoomNames.length > 0) {
        creep.memory.targetRoomName = dc.randomPick(possibleRoomNames)
      }
    }
    if (creep.memory.targetRoomName != undefined) {
      var trn = creep.memory.targetRoomName
      if (Game.rooms[trn] != undefined) {
        var targets = Game.rooms[trn].find(FIND_STRUCTURES,{filter: (structure) => {return structure.structureType == STRUCTURE_CONTROLLER}}) //actually there's only 1 target
        cf.moveToDo(creep, targets[0], 'reserveController')
      }
    }
  }
}

module.exports = rr
