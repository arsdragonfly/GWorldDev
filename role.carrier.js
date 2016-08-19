var filters = require('library.filters')
var dc = require('library.destination.control')

var initializeDestination
var roleCarrier = {

  /** @param {Creep} creep **/
  run: function(creep) {
    if (creep.memory.loading === null || creep.memory.destination === null) {
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
      var cc = creep.room.find(FIND_STRUCTURES,{filter: filters.centralContainer})
      dc.initializeDestination(creep,cc)
      creep.say('unloading')
    }
    if(creep.memory.loading) {
      var c = creep.room.lookForAt(LOOK_STRUCTURES, creep.memory.destination.x, creep.memory.destination.y)
      if(creep.withdraw(c[0],RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(c[0]);
      }
    }
    else {
      var targets = creep.room.find(FIND_STRUCTURES, {
        filter: filters.emptyExtension
      })
      if(targets.length > 0) {
        if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(targets[0]);
        }
      }
      else
      {
        var c = creep.room.lookForAt(LOOK_STRUCTURES, creep.memory.destination.x, creep.memory.destination.y)
        if(c.length > 0) {
          if(creep.transfer(c[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(c[0]);
          }
        }
      }
    }
  }
};

module.exports = roleCarrier;
