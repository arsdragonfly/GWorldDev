var roleDefender = {
  run: function(creep) {
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
}
module.exports = roleDefender
