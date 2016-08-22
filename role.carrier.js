var filters = require('library.filters')
var dc = require('library.destination.control')


var roleCarrier = {

  /** @param {Creep} creep **/
  run: function(creep) {
    if (creep.memory.loading === null || creep.memory.destination == null) {
      creep.memory.loading = true
      var sc = creep.room.find(FIND_STRUCTURES,{ filter: filters.nonEmptySecondaryContainer });
      dc.initializeDestination(creep,sc)
    }
    if (!creep.memory.loading && creep.carry.energy == 0) {
      creep.memory.loading = true
      var sc = creep.room.find(FIND_STRUCTURES,{ filter: filters.nonEmptySecondaryContainer });
      dc.initializeDestination(creep,sc)
      creep.say('loading')
    }
    if (creep.memory.loading && creep.carry.energy == creep.carryCapacity) {
      creep.memory.loading = false
      var cc = creep.room.find(FIND_STRUCTURES,{filter: filters.nonFullCentralContainer})
      dc.initializeDestination(creep,cc)
      creep.say('unloading')
    }
    if(creep.memory.loading) {
      var c = creep.room.lookForAt(LOOK_STRUCTURES, creep.memory.destination.x, creep.memory.destination.y)
      if(creep.withdraw(c[0],RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(c[0]);
      }
      else {
        var sc = creep.room.find(FIND_STRUCTURES,{ filter: filters.nonEmptySecondaryContainer });
        dc.initializeDestination(creep,sc)
      }
    }
    else {
      var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: filters.emptyExtension
      })
      if(target) {
        if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(target);
        }
      }
      else
      {
        var c = creep.room.lookForAt(LOOK_STRUCTURES, creep.memory.destination.x, creep.memory.destination.y)
        if(c.length > 0) {
          if(creep.transfer(c[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(c[0])
            return
          }
          if(creep.transfer(c[0], RESOURCE_ENERGY) == ERR_FULL) {
            var cc = creep.room.find(FIND_STRUCTURES,{filter: filters.nonFullCentralContainer})
            dc.initializeDestination(creep,cc)
            return
          }
        }
      }
    }
  }
};

module.exports = roleCarrier;
