var roleDefender = {
  run: function(creep) {
    if (Game.flags.overrideWaypoint == undefined) {
      var targets = creep.room.find(FIND_HOSTILE_CREEPS)
      if (targets.length > 0)
      {
        if (creep.rangedAttack(targets[0]) == ERR_NOT_IN_RANGE)
        {
          creep.moveTo(targets[0])
        }
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
