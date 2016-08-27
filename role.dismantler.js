var cf = require('library.creep.features')
var roleDismantler = {
  run: function(creep) {
    if (Game.flags.dismantleRamparts != undefined) {
      var target = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES,{filter: (s) => {return s.structureType == STRUCTURE_RAMPART}})
      if (target != undefined) {
        cf.moveToDo(creep, target, 'dismantle')
        return
      }
    }
    if (Game.flags.forceDismantle != undefined && Game.flags.forceDismantle.room.name == creep.room.name) {
      var x = Game.flags.forceDismantle.pos.x
      var y = Game.flags.forceDismantle.pos.y
      var structures = creep.room.lookForAt(LOOK_STRUCTURES, x, y)
      if (structures.length > 0) {
        cf.moveToDo(creep, structures[0], 'dismantle')
        return
      }
    }
    if (Game.flags.DOVRWaypoint != undefined) {
      creep.moveTo(Game.flags.DOVRWaypoint)
      return
    }
    var target = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES,{filter: (s) => {return s.structureType == STRUCTURE_SPAWN}})
    if (target != undefined) {
      cf.moveToDo(creep, target, 'dismantle')
      return
    }
    var target = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES,{filter: (s) => {return s.structureType == STRUCTURE_TOWER}})
    if (target != undefined) {
      cf.moveToDo(creep, target, 'dismantle')
      return
    }
    var target = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES,{filter: (s) => {return s.structureType == STRUCTURE_EXTENSION}})
    if (target != undefined) {
      cf.moveToDo(creep, target, 'dismantle')
      return
    }
    var target = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES,{filter: (s) => {return s.structureType == STRUCTURE_STORAGE}})
    if (target != undefined) {
      cf.moveToDo(creep, target, 'dismantle')
      return
    }
    creep.moveTo(Game.flags.DMWaypoint)
  }
}

module.exports = roleDismantler
