var rc = {}
rc.run = function () {
  var pos1x = 9
  var pos1y = 3
  var pos2x = 30
  var pos2y = 27
  var pos3x = 44
  var pos3y = 27
  var bestl = 2501 //so ugly a way to do this :-(
  var posx = 0
  var posy = 0
  for (var i = 10; i <= 45; i++) {
    for (var j = 10; j <= 32; j++) {
      var pos = new RoomPosition(i, j, 'W38N58')
      var terrain = pos.lookFor(LOOK_TERRAIN)
      if (terrain == 'wall') {
        continue
      }
      var totall = pos.findPathTo(pos1x, pos1y).length +
      pos.findPathTo(pos2x, pos2y).length +
      pos.findPathTo(pos3x, pos3y).length
      if (totall < bestl) {
        bestl = totall
        posx = pos.x
        posy = pos.y
      }
    }
  }
  console.log('Best position: ' + 'x:' + posx + ' y:' + posy)
}
module.exports = rc
