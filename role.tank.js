var roleTank = {
  run: function(creep) {
    if (Game.flags.TWaypoint != undefined) {
      creep.moveTo(Game.flags.TWaypoint)
    }
  }
}

module.exports = roleTank
