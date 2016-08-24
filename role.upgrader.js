var dc = require('library.destination.control')
var cf = require('library.creep.features')
var filters = require('library.filters')
var roleUpgrader = {

  /** @param {Creep} creep **/
  run: function(creep) {
    if (creep.memory.destination == undefined)
    {
      creep.memory.upgrading = false
      var cc = creep.room.find(FIND_STRUCTURES,{ filter: filters.nonEmptyCentralContainer });
      dc.initializeDestination(creep,cc,'centralContainer')
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
      cf.moveToDo(creep, creep.room.controller, 'upgradeController')
    }
    else {
      var c = dc.findDestinationInRoom(creep, 'centralContainer', 'structure', filters.nonEmptyCentralContainer)
      if(c.length > 0) {
        cf.moveToDo(creep, c[0], 'withdraw')
        if(creep.withdraw(c[0], RESOURCE_ENERGY) == ERR_NOT_ENOUGH_RESOURCES) {
          var cc = creep.room.find(FIND_STRUCTURES,{filter: filters.nonEmptyCentralContainer})
          dc.initializeDestination(creep,cc) //Let's do it again!
          var c = dc.findDestinationInRoom(creep, 'centralContainer', 'structure', filters.nonEmptyCentralContainer)
          if(c.length > 0) {
            cf.moveToDo(creep, c[0], 'withdraw')
          }
        }
      }
    }
  }
};

module.exports = roleUpgrader;
