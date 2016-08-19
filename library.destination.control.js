var dc = {}
dc.setDestination = function(creep,object) {
  creep.memory.destination = {
    x: object.pos.x,
    y: object.pos.y
  }
}.bind(dc)
dc.randomPick = function(array) {
  var len = array.length
  var index = Math.floor((Math.random() * len))
  return array[index]
}.bind(dc)
dc.initializeDestination = function(creep,array) {
  this.setDestination(creep,this.randomPick(array))
}.bind(dc)

module.exports = dc
