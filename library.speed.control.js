var sc = {}
sc.speedControl = function (object, interval) {
  // returns true every other [interval] ticks
  if (object.id == undefined) {
    return true
  }//this happens once in a while for some unknown reasons
  var id = object.id.slice(-4)
  var num = (_.parseInt(id, 16)) % (interval + 1)
  if ((Game.time + num) % (interval + 1) == 0) {
    return true
  }
  else {
    return false
  }
}

module.exports = sc
