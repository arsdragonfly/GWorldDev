var filters = require('library.filters')
var cf = require('library.creep.features')
var structureTower = {
  run: function() {
    for (id in Game.rooms)
    {
      var room = Game.rooms[id]
      var towers = room.find(FIND_MY_STRUCTURES, {filter: (structure) => structure.structureType == STRUCTURE_TOWER})
      for (key in towers)
      {
        this.towerFunctions(towers[key])
      }
    }
  },
  towerFunctions: function(tower) {
    //defending the room against enemies is the first priority
    var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS)
    if(closestHostile) {
      tower.attack(closestHostile)
      return
    }
    //next comes healing our creeps
    var damagedCreep = tower.pos.findClosestByRange(FIND_MY_CREEPS,{filter: (creep) => creep.hits < creep.hitsMax})
    if (damagedCreep) {
      tower.heal(damagedCreep)
      return
    }
    //repairing all kinds of structures
    if (tower.energy > tower.energyCapacity * 0.95) {
      //interestingly, we can use the creepFeatures library here
      cf.repairInRoom(tower)
    }
  }
}

    module.exports = structureTower
