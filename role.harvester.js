var roleHarvester = {

  /** @param {Creep} creep **/
  run: function(creep) {
    if (creep.memory.harvesting === null) {
      creep.memory.harvesting = true
    }
    if (!creep.memory.harvesting && creep.carry.energy == 0) {
      creep.memory.harvesting = true
      creep.say('harvesting')
    }
    if (creep.memory.harvesting && creep.carry.energy == creep.carryCapacity) {
      creep.memory.harvesting = false
      creep.say('unloading')
    }
    if(creep.memory.harvesting) {
      var sources = creep.room.find(FIND_SOURCES);
      if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[0])
        return
      }
    }
    else {
      var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: (structure) => {
          return (structure.structureType == STRUCTURE_CONTAINER)
          //structure.energy < structure.energyCapacity;
        }
      });
      if(target) {
        if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(target);
          return
        }
      }
      var targets = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
          //return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
          return (structure.structureType == STRUCTURE_EXTENSION) &&
          structure.energy < structure.energyCapacity;
        }
      });
      if(targets.length > 0) {
        if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(targets[0]);
          return
        }
      }
    }
  }
}

module.exports = roleHarvester;
