var filters = require('library.filters')
var cf = require('library.creep.features')
var dc = require('library.destination.control')
var roleRemoteMaintainer = {

  /** @param {Creep} creep **/
  run: function(creep) {

    if (creep.memory.maintaining && creep.carry.energy == 0) {
      creep.memory.maintaining = false
      creep.say('loading')
      return
    }
      if (!creep.memory.maintaining && (creep.carry.energy == creep.carryCapacity)) {
      creep.memory.maintaining = true
      creep.say('maintaining')
      return
    }

    if (creep.memory.maintaining) {
      var roomName = creep.memory.roomName
      var targetRoomNames = Memory.userdata[roomName].remoteConstructionRooms
      if (targetRoomNames != undefined) {
        if (creep.memory.targetRoomName == undefined) {
          creep.memory.targetRoomName = dc.randomPick(targetRoomNames)
        }
      }
      else {
        return
      }

      if (Game.rooms[creep.memory.targetRoomName] != undefined) {
        var targets = Game.rooms[creep.memory.targetRoomName].find(FIND_STRUCTURES,{filter: filters.maintenanceRequiringStructure})
        if (targets.length > 0) {
          if (creep.room.name != creep.memory.targetRoomName) {
            creep.moveTo(targets[0])
          }
          else {
            cf.repairInRoom(creep)
          }
        }
      }

    }
    else {
      var container = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: filters.nonEmptyContainer})
      if (container) {
        cf.moveToDo(creep, container, 'withdraw')
        return
      }
      if (creep.memory.targetRoomName && Game.rooms[creep.memory.targetRoomName] != undefined) {
        var sources = Game.rooms[creep.memory.targetRoomName].find(FIND_SOURCES)
        cf.moveToDo(creep, sources[0], 'harvest')
        return
      }
    }
  }
}

module.exports = roleRemoteMaintainer
