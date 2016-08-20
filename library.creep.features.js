var filters = require('library.filters')
var cf = {}
cf.pickupEnergy = function (creep) {
  if (creep.carry.energy < creep.carryCapacity)
  {
    var energy = creep.pos.findInRange(
      FIND_DROPPED_ENERGY,
      1
    );

    if (energy.length) {
      console.log('found ' + energy[0].energy + ' energy at ', energy[0].pos);
      creep.pickup(energy[0]);
    }
  }
}.bind(cf)

cf.repairInRoom = function(creep) {
  //damaged structures owned by myself (process ramparts later)
  targets = creep.room.find(FIND_MY_STRUCTURES, {filter: (structure) => {
    var func = filters.damagedStructureOfType(STRUCTURE_RAMPART)
    return filters.damagedStructure(structure) &&
    !(filters.damagedStructureOfType(STRUCTURE_RAMPART)(structure))
  }})
  if (targets.length) {
    if (creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
      creep.moveTo(targets[0])
    }
    return
  }
  //damaged containers
  targets = creep.room.find(FIND_STRUCTURES, {filter: filters.damagedStructureOfType(STRUCTURE_CONTAINER)})
  if (targets.length) {
    if (creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
      creep.moveTo(targets[0])
    }
    return
  }
  //ramparts below designated hits
  targets = creep.room.find(FIND_MY_STRUCTURES, {filter: filters.damagedRampartBelow(10000)})
  if (targets.length) {
    if (creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
      creep.moveTo(targets[0])
    }
    return
  }
  //damaged roads
  targets = creep.room.find(FIND_STRUCTURES, {filter: filters.damagedStructureOfType(STRUCTURE_ROAD)})
  if (targets.length) {
    if (creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
      creep.moveTo(targets[0])
    }
    return
  }
  //walls below designated hits
  targets = creep.room.find(FIND_MY_STRUCTURES, {filter: filters.damagedWallBelow(10000)})
  if (targets.length) {
    if (creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
      creep.moveTo(targets[0])
    }
    return
  }
}

  module.exports = cf
