var filters = require('library.filters')
var cf = require('library.creep.features')
var dc = require('library.destination.control')


var roleCarrier = {

  /** @param {Creep} creep **/
  run: function(creep) {
    var roomConfig = Memory.userdata.roomConfig[creep.memory.roomName]
    if (creep.memory.loading === null || creep.memory.destination == null) {
      creep.memory.loading = true
      if (roomConfig.emergencyState == true) {
        var sc = creep.room.find(FIND_STRUCTURES,{ filter: filters.nonEmptyContainer });
      }
      else {
        var sc = creep.room.find(FIND_STRUCTURES,{ filter: filters.nonEmptySecondaryContainer });
      }
      dc.initializeDestination(creep,sc,'secondaryContainer')
      creep.say('loading')
    }
    if (!creep.memory.loading && creep.carry.energy == 0) {
      if (roomConfig.emergencyState == true) {
        var sc = creep.room.find(FIND_STRUCTURES,{ filter: filters.nonEmptyContainer });
      }
      else {
        var sc = creep.room.find(FIND_STRUCTURES,{ filter: filters.nonEmptySecondaryContainer });
      }
      if (sc.length > 0) {
        dc.initializeDestination(creep,sc,'secondaryContainer')
        creep.memory.loading = true
        creep.say('loading')
      }
    }
    if (creep.memory.loading && creep.carry.energy == creep.carryCapacity) {
      creep.memory.loading = false
      var cc = creep.room.find(FIND_STRUCTURES,{filter: filters.nonFullCentralContainer})
      dc.initializeDestination(creep,cc,'centralContainer')
      creep.say('unloading')
    }
    if(creep.memory.loading) {
      if (creep.memory.destination == undefined) {return false}
      var c = dc.findDestinationInRoom(creep,'secondaryContainer','structure',filters.container)
      cf.moveToDo(creep, c[0], 'withdraw')
      if (creep.withdraw(c[0], RESOURCE_ENERGY) == ERR_NOT_ENOUGH_RESOURCES) {
        if (roomConfig.emergencyState == true) {
          var sc = creep.room.find(FIND_STRUCTURES,{ filter: filters.nonEmptyContainer });
        }
        else {
          var sc = creep.room.find(FIND_STRUCTURES,{ filter: filters.nonEmptySecondaryContainer });
        }
        if (sc.length > 0) {
          dc.initializeDestination(creep,sc,'secondaryContainer')
          c = dc.findDestinationInRoom(creep,'secondaryContainer','structure',filters.container)
          cf.moveToDo(creep, c[0], 'withdraw')
        }
      }
    }
    else {
      var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: filters.emptyExtension
      })
      if(target) {
        cf.moveToDo(creep, target, 'transfer')
      }
      else
      {
        var c = dc.findDestinationInRoom(creep, 'centralContainer', 'structure',filters.nonFullCentralContainer)
        if(c.length > 0) {
          cf.moveToDo(creep, c[0], 'transfer')
          if(creep.transfer(c[0], RESOURCE_ENERGY) == ERR_FULL) {
            var cc = creep.room.find(FIND_STRUCTURES,{filter: filters.nonFullCentralContainer})
            dc.initializeDestination(creep,cc,'centralContainer')
            c = dc.findDestinationInRoom(creep, 'centralContainer', 'structure',filters.nonFullCentralContainer)
            if(c.length > 0) {
              cf.moveToDo(creep, c[0], 'transfer')
            }
          }
        }
      }
    }
  }
};

module.exports = roleCarrier;
