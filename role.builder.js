var filters = require('library.filters')
var cf = require('library.creep.features')
var roleBuilder = {

  /** @param {Creep} creep **/
  run: function(creep) {

    cf.pickupEnergy(creep)

    if (creep.memory.building && creep.carry.energy == 0) {
      creep.memory.building = false
      creep.say('loading')
    }
    if (!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
      creep.memory.building = true
      creep.say('building')
    }

    if (creep.memory.building) {
      //Construction sites
      var targets = creep.room.find(FIND_CONSTRUCTION_SITES)
      if (targets.length) {
        if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
          creep.moveTo(targets[0])
        }
        return
      }
      cf.repairInRoom(creep)
    }
    else {
      //not building; go load some resources
      var container = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: filters.nonEmptyContainer})
      if (container) {
      if (creep.withdraw(container,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(container)
        }
        return
      }
      container = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: filters.container})
      if (!container)
      {
        //no containers; fall back to collecting resources from energy sources
        var sources = creep.room.find(FIND_SOURCES);
        if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
          creep.moveTo(sources[0]);
          return;
        }
      }
    }
  }
};

module.exports = roleBuilder;
