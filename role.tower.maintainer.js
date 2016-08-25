var cf = require('library.creep.features')
var sc = require('library.speed.control')
var roleTowerMaintainer = {

  /** @param {Creep} creep **/
  run: function(creep) {
    if (!sc.speedControl(creep, 1)) {
      return
    }
    if(creep.carry.energy < creep.carryCapacity) {
      var containers = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
          return (structure.structureType == STRUCTURE_CONTAINER) &&
          structure.store[RESOURCE_ENERGY] > 0
        }
      });
      cf.moveToDo(creep, containers[0], 'withdraw')
    }
    else {
      var targets = creep.room.find(FIND_MY_STRUCTURES, {
        filter: (structure) => {
          return (structure.structureType == STRUCTURE_TOWER) &&
          structure.energy < structure.energyCapacity;
        }
      });
      if(targets.length > 0) {
        cf.moveToDo(creep, targets[0], 'transfer')
      }
    }
  }
}

  module.exports = roleTowerMaintainer
