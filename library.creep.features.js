var filters = require('library.filters')
var dc = require('library.destination.control')
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

cf.moveToDo = function (creep, target, action) {
  this.pickupEnergy(creep)
  if (action == 'withdraw' || action == 'transfer') {
    //TODO:fix this temporary solution; too lazy to think of other rcl6 stuff
    if (creep[action](target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
      creep.moveTo(target,{reusePath: 5, serializeMemory: true})
    }
    return
  }
  if (creep[action](target) == ERR_NOT_IN_RANGE) {
    creep.moveTo(target,{reusePath: 0, serializeMemory: false})
  }
}.bind(cf)

cf.repairInRoom = function(creep) {
  //this funciton is used by towers as well;
  if (creep.structureType == STRUCTURE_TOWER) {
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
    targets = creep.room.find(FIND_MY_STRUCTURES, {filter: filters.damagedRampartBelow(200000)})
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
    targets = creep.room.find(FIND_MY_STRUCTURES, {filter: filters.damagedWallBelow(2000000)})
    if (targets.length) {
      if (creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(targets[0])
      }
      return
    }
    return
  }
  if (creep.memory.destination == undefined) {
    creep.memory.destination = {}
  }
  if (creep.memory.destination.repairing == undefined) {
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
    targets = creep.room.find(FIND_STRUCTURES, {filter: filters.damagedStructureOfType(STRUCTURE_CONTAINER, 200000)})
    if (targets.length) {
      dc.initializeDestination(creep, targets, 'repairing')
      return
    }
    //ramparts below designated hits
    targets = creep.room.find(FIND_MY_STRUCTURES, {filter: filters.damagedStructureOfType(STRUCTURE_RAMPART, 180000)})
    if (targets.length) {
      dc.initializeDestination(creep, targets, 'repairing')
      return
    }
    //damaged roads
    target = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: filters.damagedStructureOfType(STRUCTURE_ROAD)})
    if (target != undefined) {
      this.moveToDo(creep, target, 'repair')
      return
    }
    //walls below designated hits
    target = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {filter: filters.damagedStructureOfType(STRUCTURE_WALL, 180000)})
    if (target != undefined) {
      this.moveToDo(creep, target, 'repair')
      return
    }
  }
  else { // the destination is defined
    var ss = dc.findDestinationInRoom(creep, 'repairing', 'structure')
    if (ss.length == 1) {
      if (filters.damagedStructureOfType(STRUCTURE_RAMPART, 200000)(ss[0]) ||
      filters.damagedStructureOfType(STRUCTURE_WALL, 200000)(ss[0])) {
        this.moveToDo(creep, ss[0], 'repair')
        return
      }
      if (filters.damagedStructureOfType(STRUCTURE_RAMPART)(ss[0]) ||
      filters.damagedStructureOfType(STRUCTURE_WALL)(ss[0])) { //at this time, the health has been restored
        dc.clearDestination(creep, 'repairing')
        return
      }
      if (ss[0].hits < ss[0].hitsMax) {
        this.moveToDo(creep, ss[0], 'repair')
      }
      else {
        dc.clearDestination(creep, 'repairing')
      }
    }
    else { //more than 1 target
      var done = true
      for (s of ss) {
        if (filters.damagedStructureOfType(STRUCTURE_RAMPART, 200000)(s) ||
        filters.damagedStructureOfType(STRUCTURE_WALL, 200000)(s)) {
          done = false
          this.moveToDo(creep, s, 'repair')
          continue
        }
        if (filters.damagedStructureOfType(STRUCTURE_RAMPART)(s) ||
        filters.damagedStructureOfType(STRUCTURE_WALL)(s)) { //at this time, the health has been restored
          dc.clearDestination(creep, 'repairing')
          continue
        }
        if (s.hits < s.hitsMax) {
          done = false
          this.moveToDo(creep, s, 'repair')
        }
      }
      if (done) {
        dc.clearDestination(creep, 'repairing')
      }
    }
  }
}.bind(cf)


module.exports = cf
