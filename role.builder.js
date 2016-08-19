var roleBuilder = {

  /** @param {Creep} creep **/
  run: function(creep) {

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
      var containers = creep.room.find(FIND_STRUCTURES, {filter: (structure) => structure.structureType == STRUCTURE_CONTAINER && (structure.store[RESOURCE_ENERGY] > 0)})
      if (containers.length) {
        if (creep.withdraw(containers[0],RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(containers[0])
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
