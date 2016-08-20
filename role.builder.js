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
      var targets = creep.room.find(FIND_CONSTRUCTION_SITES)
      if (targets.length) {
        if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
          creep.moveTo(targets[0])
        }
        return
      }
      targets = creep.room.find(FIND_MY_STRUCTURES, {filter: (structure) => structure.hits < structure.hitsMax})
      if (targets.length) {
        if (creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
          creep.moveTo(targets[0])
        }
        return
      }
      targets = creep.room.find(FIND_STRUCTURES, {filter: (structure) => structure.structureType == STRUCTURE_CONTAINER && (structure.hits < structure.hitsMax)})
      if (targets.length) {
        if (creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
          creep.moveTo(targets[0])
        }
        return
      }
      targets = creep.room.find(FIND_STRUCTURES, {filter: (structure) => structure.structureType == STRUCTURE_ROAD && (structure.hits < structure.hitsMax)})
      if (targets.length) {
        if (creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
          creep.moveTo(targets[0])
        }
        return
      }
    }
    else {
      var container = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: (structure) => structure.structureType == STRUCTURE_CONTAINER && (structure.store[RESOURCE_ENERGY] > 0)})
      if (container) {
        if (creep.withdraw(container,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(container)
        }
        return
      }
      //var sources = creep.room.find(FIND_SOURCES);
      //if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
      //  creep.moveTo(sources[0]);
      //  return;
      //}
    }
  }
};

module.exports = roleBuilder;
