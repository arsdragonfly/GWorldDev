var rc = {}
rc.run = function(creep) {
  if (Game.flags.CWaypoint != undefined) {
    creep.moveTo(Game.flags.CWaypoint)
  }
  var controller = creep.room.controller
  creep.claimController(controller)
}

module.exports = rc
