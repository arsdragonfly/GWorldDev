var filters = require('library.filters')
var cf = require('library.creep.features')
var dc = require('library.destination.control')
var roleRemoteBuilder = {

  /** @param {Creep} creep **/
  run: function(creep) {

    if (creep.memory.building && creep.carry.energy == 0) {
      creep.memory.building = false
      creep.say('loading')
      return
    }
    if (!creep.memory.building && (creep.carry.energy == creep.carryCapacity)) {
      creep.memory.building = true
      creep.say('building')
      return
    }

    if (creep.memory.building) {
      var roomName = creep.memory.roomName
      var targetRoomNames = Memory.userdata[roomName].remoteConstructionRooms
      for (i in targetRoomNames) {
        if (Game.rooms[targetRoomNames[i]] != undefined) {
          var targets = Game.rooms[targetRoomNames[i]].find(FIND_CONSTRUCTION_SITES)
          if (targets.length > 0) {
            creep.memory.targetRoomName = targetRoomNames[i]
            if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
              creep.moveTo(targets[0])
            }
            return
          }
        }
      }
      for (i in targetRoomNames) {
        //Move the creep out of the initial room anyway
        if (Game.rooms[targetRoomNames[i]] != undefined) {
          var targets = Game.rooms[targetRoomNames[i]].find(FIND_STRUCTURES,{filter: filters.maintenanceRequiringStructure})
          if (targets.length > 0) {
            creep.memory.targetRoomName = targetRoomNames[i]
            if (creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
              creep.moveTo(targets[0])
              return
            }
          }
        }
      }
      cf.repairInRoom(creep)
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

      if (creep.memory.targetRoomName) {
        if (creep.room.name == creep.memory.targetRoomName) {
          var sources = Game.rooms[creep.memory.targetRoomName].find(FIND_SOURCES)
          dc.initializeDestination(creep, sources, 'energySource')
          var target = dc.findDestinationInRoom(creep,'energySource','source')
          if(creep.harvest(target) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target)
          }
        }
      }

    }
  }
}

module.exports = roleRemoteBuilder
