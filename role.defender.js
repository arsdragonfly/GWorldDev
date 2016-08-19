var roleDefender = {
  run: function(creep) {
    var targets = creep.room.find(FIND_HOSTILE_CREEPS)
    if (targets.length > 0)
    {
      if (creep.rangedAttack(targets[0]) == ERR_NOT_IN_RANGE)
      {
        if (Game.flags.overrideWaypoint == undefined) {
        creep.moveTo(targets[0])
      }
      else {
        creep.moveTo(Game.flags.overrideWaypoint)
      }
      }
    }
    else {
      var flag = Game.flags.militaryWaypoint
      creep.moveTo(flag)
    }
  }
}
module.exports = roleDefender
