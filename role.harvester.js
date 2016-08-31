//This role configuration is useful when bootstapping a new base
var cf = require('library.creep.features')
var dc = require('library.destination.control')
var filters = require('library.filters')
var roleHarvester = {

  /** @param {Creep} creep **/
  run: function(creep) {
    if (creep.memory.harvesting == undefined) {
      var sources = creep.room.find(FIND_SOURCES);
      dc.initializeDestination(creep, sources, 'energySource')
      creep.memory.harvesting = true
    }
    if (!creep.memory.harvesting && creep.carry.energy == 0) {
      var sources = creep.room.find(FIND_SOURCES);
      dc.initializeDestination(creep, sources, 'energySource')
      creep.memory.harvesting = true
      creep.say('harvesting')
    }
    if (creep.memory.harvesting && creep.carry.energy == creep.carryCapacity) {
      creep.memory.harvesting = false
      creep.say('unloading')
    }
    if(creep.memory.harvesting) {
      var s = dc.findDestinationInRoom(creep, 'energySource', 'source')
      cf.moveToDo(creep, s[0], 'harvest')
    }
    else {
      var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: filters.emptyExtension})
      if(target) {
        cf.moveToDo(creep, target, 'transfer')
        return
      }
      var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: filters.nonFullContainer})
      if(target) {
        cf.moveToDo(creep, target, 'transfer')
        return
      }
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

module.exports = roleHarvester;
