var filters = require('library.filters')
var cf = require('library.creep.features')
var dc = require('library.destination.control')
var roleCourier = {

  /** @param {Creep} creep **/
  run: function(creep) {
    if(creep.carry.energy < creep.carryCapacity) {
      var containers = creep.room.find(FIND_STRUCTURES, {
        filter: filters.nonEmptyContainer
      });
      cf.moveToDo(creep, containers[0], 'withdraw')
      if (creep.withdraw(containers[0], RESOURCE_ENERGY) == ERR_NOT_ENOUGH_RESOURCES) {
        var c = creep.room.find(FIND_STRUCTURES,{ filter: filters.nonEmptyContainer });
        if (c.length > 0) {
          dc.initializeDestination(creep, c,'container')
          c = dc.findDestinationInRoom(creep,'container','structure',filters.container)
          cf.moveToDo(creep, c[0], 'withdraw')
        }
      }
    }
    else {
      var targets = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
          return (structure.structureType == STRUCTURE_SPAWN) &&
          structure.energy < structure.energyCapacity;
        }
      });
      if(targets.length > 0) {
        var target = dc.randomPick(targets)
        cf.moveToDo(creep, target, 'transfer')
        if(creep.transfer(target, RESOURCE_ENERGY) == ERR_FULL) {
          var ss = creep.room.find(FIND_STRUCTURES, {filter: (s) => {return s.structureType == STRUCTURE_SPAWN && s.energy < s.energyCapacity}})
          dc.initializeDestination(creep, ss,'spawn')
          c = dc.findDestinationInRoom(creep, 'spawn', 'structure',(s) => {return s.structureType == STRUCTURE_SPAWN && s.energy < s.energyCapacity})
          if(c.length > 0) {
            cf.moveToDo(creep, c[0], 'transfer')
          }
        }
      }
    }
  }
}

  module.exports = roleCourier
