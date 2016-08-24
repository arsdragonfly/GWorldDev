var filters = require('library.filters')
var cf = require('library.creep.features')
var roleSuperHarvester = {

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
      cf.pickupEnergy(creep)
      if(!creep.pos.isEqualTo(Game.flags[creep.memory.workSite])) {
        creep.moveTo(Game.flags[creep.memory.workSite])
      }
      else {
        var source = creep.pos.findClosestByRange(FIND_SOURCES)
        creep.harvest(source)
      }
    }
    else {
      var container = creep.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: filters.container
      });
      if(container) {
        if (Game.time % 3 == 0) {//TODO: rework this later
          cf.moveToDo(creep, container, 'transfer')
        }
        var source = creep.pos.findClosestByRange(FIND_SOURCES)
        creep.harvest(source)
        return
      }
      container = Game.getObjectById('57b4c86c42baa5bf50b18093') //TODO: do it more gracefully
      if(container) {
        cf.moveToDo(creep, container, 'transfer')
        return
      }
    }
  }
};

module.exports = roleSuperHarvester;
