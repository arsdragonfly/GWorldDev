var dc = require('library.destination.control')
var filters = require('library.filters')
var roleUpgrader = {

  /** @param {Creep} creep **/
  run: function(creep) {
    if (creep.memory.destination === null || creep.memory.destination === undefined)
    {
      creep.memory.upgrading = false
      var cc = creep.room.find(FIND_STRUCTURES,{ filter: filters.nonEmptyCentralContainer });
      dc.initializeDestination(creep,cc)
      return
    }

    if(creep.memory.upgrading && creep.carry.energy == 0) {
      creep.memory.upgrading = false;
      creep.say('loading');
    }
    if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
      creep.memory.upgrading = true;
      creep.say('upgrading');
    }

    if(creep.memory.upgrading) {
      if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller);
      }
    }
    else {
      var c = creep.room.lookForAt(LOOK_STRUCTURES, creep.memory.destination.x, creep.memory.destination.y)
      if(c.length > 0) {
        if(creep.withdraw(c[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(c[0])
          return
        }
        if(creep.withdraw(c[0], RESOURCE_ENERGY) == ERR_NOT_ENOUGH_RESOURCES) {
          var cc = creep.room.find(FIND_STRUCTURES,{filter: filters.nonEmptyCentralContainer})
          dc.initializeDestination(creep,cc)
          return
        }
      }
    }
  }
};

module.exports = roleUpgrader;
