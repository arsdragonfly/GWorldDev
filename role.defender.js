var cf = require('library.creep.features')
var roleDefender = {
  run: function(creep) {
    if (Game.flags.overrideWaypoint == undefined) {
      if (Game.flags.militaryWaypoint != undefined && (Game.flags.militaryWaypoint.room == undefined || creep.room.name != Game.flags.militaryWaypoint.room.name)) {
        creep.moveTo(Game.flags.militaryWaypoint)
        return
      }
      var targets = creep.room.find(FIND_HOSTILE_CREEPS)
      if (targets.length > 0)
      {
        cf.moveToDo(creep, targets[0], 'rangedAttack')
      }
      else {
        var flag = Game.flags.militaryWaypoint
        creep.moveTo(flag)
      }
    }
    else {
      var target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS)
      creep.rangedAttack(target)
      creep.moveTo(Game.flags.overrideWaypoint)
    }
  }
}

module.exports = roleDefender
