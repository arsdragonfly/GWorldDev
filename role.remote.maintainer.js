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
      cf.pickupEnergy(creep)
      var container = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: filters.nonEmptyContainer})
      if (container) {
        if (creep.withdraw(container,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(container)
        }
        return
      }
      if (creep.memory.targetRoomName && Game.rooms[creep.memory.targetRoomName] != undefined) {
        var sources = Game.rooms[creep.memory.targetRoomName].find(FIND_SOURCES)
        var result = creep.harvest(sources[0])
        if(result == ERR_NOT_IN_RANGE) {
          creep.moveTo(sources[0])
        }
        return
      }
    }
  }
}

module.exports = roleRemoteMaintainer
