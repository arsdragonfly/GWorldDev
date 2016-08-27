var cf = require('library.creep.features')
var roleHealer = {
  run: function(creep) {
    if (Game.flags.HOVRWaypoint == undefined) {
      var targets = creep.room.find(FIND_MY_CREEPS, {filter:(c) => {return (c.hits < c.hitsMax)}})
      if (targets.length > 0)
      {
        cf.moveToDo(creep, targets[0], 'heal')
        creep.moveTo(targets[0])
      }
      else {
        var flag = Game.flags.HMWaypoint
        creep.moveTo(flag)
      }
    }
    else {
      var target = creep.pos.findClosestByRange(FIND_MY_CREEPS, (c) => {return c.hits < c.hitsMax})
      creep.heal(target)
      creep.moveTo(Game.flags.HOVRWaypoint)
    }
  }
}

module.exports = roleHealer
