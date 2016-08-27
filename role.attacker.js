var cf = require('library.creep.features')
var roleAttacker = {
  run: function(creep) {
    if (Game.flags.AOVRWaypoint == undefined) {
      var target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS)
      if (target != undefined)
      {
        cf.moveToDo(creep, target, 'rangedAttack')
      }
      else {
        var flag = Game.flags.AMWaypoint
        creep.moveTo(flag)
      }
    }
    else {
      var target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS)
      creep.rangedAttack(target)
      creep.moveTo(Game.flags.AOVRWaypoint)
    }
  }
}

module.exports = roleAttacker
