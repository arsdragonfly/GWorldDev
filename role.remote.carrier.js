var filters = require('library.filters')
var cf = require('library.creep.features')
var dc = require('library.destination.control')

var rc = {
  run: function (creep) {
    if (!creep.memory.loading && creep.carry.energy == 0) {
      creep.memory.loading = true
      creep.say('loading')
    }
    if (creep.memory.loading && creep.carry.energy == creep.carryCapacity) {
      creep.memory.loading = false
      creep.say('unloading')
    }
    if (creep.memory.loading) {
      cf.pickupEnergy(creep)
      if (creep.memory.targetRoomName == undefined) {
        //choose a target room randomly
        var roomName = creep.memory.roomName
        var targetRoomNames = Memory.userdata[roomName].remoteHarvestingRooms
        var r = new Array()
        for (i in targetRoomNames) {
          if (Game.rooms[targetRoomNames[i]] != undefined) {
            var targets = Game.rooms[targetRoomNames[i]].find(FIND_STRUCTURES, {filter: filters.nonEmptySecondaryContainer})
            if (targets.length > 0) {
              r.push(targetRoomNames[i])
            }
          }
        }
        if (r.length > 0) {
          creep.memory.targetRoomName = dc.randomPick(r)
        }
      }
      if (creep.memory.targetRoomName != undefined && Game.rooms[creep.memory.targetRoomName] != undefined) {
        if (creep.memory.destination == undefined || creep.memory.destination.loading == undefined) {
          var targets = Game.rooms[creep.memory.targetRoomName].find(FIND_STRUCTURES, {filter: filters.nonEmptySecondaryContainer})
          if (targets.length > 0) {
            dc.initializeDestination(creep, targets, 'loading')
          }
        }

        //TODO: remove this legacy block soon after
        if (creep.memory.loadingDestination != undefined) {
          var c = Game.rooms[creep.memory.targetRoomName].lookForAt(LOOK_STRUCTURES, creep.memory.loadingDestination.x, creep.memory.loadingDestination.y)
          if (creep.withdraw(c[0],RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(c[0]);
          }
          else {
            var targets = Game.rooms[creep.memory.targetRoomName].find(FIND_STRUCTURES, {filter: filters.nonEmptySecondaryContainer})
            if (targets.length > 0) {
              var target = dc.randomPick(targets)
              creep.memory.loadingDestination = {
                x: target.pos.x,
                y: target.pos.y
              }
            }
          }
        }

        if (creep.memory.destination.loading != undefined) {
          var c = dc.findDestinationInRoom(creep, 'loading', 'structure', filters.container)
          if (creep.withdraw(c[0],RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(c[0]);
          }
          else {
            var targets = Game.rooms[creep.memory.targetRoomName].find(FIND_STRUCTURES, {filter: filters.nonEmptySecondaryContainer})
            if (targets.length > 0) {
              var target = dc.randomPick(targets)
              creep.memory.loadingDestination = {
                x: target.pos.x,
                y: target.pos.y
              }
            }
          }
        }
      }
    }
    else {
      //unloading
      creep.memory.targetRoomName = undefined
      creep.memory.loadingDestination = undefined
      var roomName = creep.memory.roomName
      var centralRoom = Game.rooms[roomName]
      var portalContainers = centralRoom.find(FIND_STRUCTURES,{filter: (structure) =>
        {
          return Memory.userdata[structure.id] == 'portalContainer'
        }}
      )
      if (portalContainers.length <= 0) {
        //fallback
        portalContainers = centralRoom.find(FIND_STRUCTURES,{filter: filters.container})
      }
      if (portalContainers.length > 0) {
        var portalContainer = dc.randomPick(portalContainers)
        //container = Game.getObjectById('57b4c86c42baa5bf50b18093')
        if(creep.transfer(portalContainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(portalContainer)
        }
      }
    }
  }
}

module.exports = rc
