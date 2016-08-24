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

        if (creep.memory.destination.loading != undefined) {
          var c = dc.findDestinationInTargetRoom(creep, 'loading', 'structure', creep.memory.targetRoomName, filters.container)
          if (c.length > 0) {
            cf.moveToDo(creep, c[0], 'withdraw')
            var result = creep.withdraw(c[0], RESOURCE_ENERGY)
            if (result == ERR_NOT_ENOUGH_RESOURCES || result == OK) {
              var targets = Game.rooms[creep.memory.targetRoomName].find(FIND_STRUCTURES, {filter: filters.nonEmptySecondaryContainer})
              if (targets.length > 0) {
                var target = dc.randomPick(targets)
                creep.memory.destination.loading = {
                  x: target.pos.x,
                  y: target.pos.y
                }
              }
            }
          }
        }
      }
    }
    else {
      //unloading
      dc.clearDestination(creep, 'loading')
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
        cf.moveToDo(creep, portalContainer, 'transfer')
      }
    }
  }
}

module.exports = rc
