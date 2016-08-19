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
    var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS)
    if(closestHostile) {
      tower.attack(closestHostile)
      return
    }
    var damagedCreep = tower.pos.findClosestByRange(FIND_MY_CREEPS,{filter: (creep) => creep.hits < creep.hitsMax})
    if (damagedCreep) {
      tower.heal(damagedCreep)
      return
    }
    var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES,{filter: (structure) => (structure.hits < structure.hitsMax) && ((structure.structureType == STRUCTURE_CONTAINER) || structure.structureType == STRUCTURE_ROAD)})
    if (closestDamagedStructure && tower.energy > tower.energyCapacity * 0.75) {
      tower.repair(closestDamagedStructure)
      return
    }
  }
}

module.exports = structureTower
