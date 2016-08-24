var filters = require('library.filters')
var cf = require('library.creep.features')
var dc = require('library.destination.control')
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
        cf.moveToDo(creep, targets[0], 'build')
        return
      }
      cf.repairInRoom(creep)
    }
    else {
      //not building; go load some resources
      var container = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: filters.nonEmptyContainer})
      if (container) {
        cf.moveToDo(creep, container, 'withdraw')
        return
      }
      container = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: filters.container})
      if (!container)
      {
        //no containers; fall back to collecting resources from energy sources
        var sources = creep.room.find(FIND_SOURCES);
        dc.initializeDestination(creep, sources, 'loading')
        var source = dc.findDestinationInRoom(creep, 'loading', 'source')
        cf.moveToDo(creep, source, 'harvest')
        return
      }
    }
  }
};

module.exports = roleBuilder;
