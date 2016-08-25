var filters = {}

//containers
filters.container = function(structure) {
  return (structure.structureType == STRUCTURE_CONTAINER) || (structure.structureType == STRUCTURE_STORAGE)
}.bind(filters)
filters.nonEmptyContainer = function(structure) {
  return this.container(structure) && (structure.store[RESOURCE_ENERGY] > 0)
}.bind(filters)
filters.nonFullContainer = function(structure) {
  return this.container(structure) && structure.store[RESOURCE_ENERGY] < structure.storeCapacity
}.bind(filters)
filters.centralContainer = function(structure) {
  return Memory.userdata[structure.id] == 'centralContainer'
}.bind(filters)
filters.secondaryContainer = function(structure) {
  return this.container(structure) && (Memory.userdata[structure.id] != 'centralContainer')
}.bind(filters)
filters.nonEmptySecondaryContainer = function(structure) {
  return this.nonEmptyContainer(structure) && this.secondaryContainer(structure)
}.bind(filters)
filters.nonEmptyCentralContainer = function(structure) {
  return this.nonEmptyContainer(structure) && this.centralContainer(structure)
}.bind(filters)
filters.nonFullCentralContainer = function(structure) {
  return this.nonFullContainer(structure) && this.centralContainer(structure)
}.bind(filters)

//extensions
filters.emptyExtension = function(structure) {
  return (structure.structureType == STRUCTURE_EXTENSION) &&
  (structure.energy < structure.energyCapacity)
}.bind(filters)

//structures
filters.damagedStructure = function(structure) {
  return structure.hits < structure.hitsMax
}.bind(filters)
filters.damagedStructureOfType = function(type) {
  //type, [hitsBelow]
  if (arguments[1] == undefined) {
    return function(structure) {return this.damagedStructure(structure) && structure.structureType == type}.bind(filters)
  }
  else {
    var arg = arguments[1]
    return function(structure) {return this.damagedStructure(structure) && structure.structureType == type && structure.hits < arg}.bind(filters) }
}.bind(filters)
filters.damagedRampartBelow = function(targetHits) {
  return function(structure) {
    return this.damagedStructureOfType(STRUCTURE_RAMPART)(structure) && structure.hits < targetHits
  }.bind(filters)
}.bind(filters)
filters.damagedWallBelow = function(targetHits) {
  return function(structure) {
    return this.damagedStructureOfType(STRUCTURE_WALL)(structure) && structure.hits < targetHits
  }.bind(filters)
}.bind(filters)
filters.maintenanceRequiringStructure = function() {
  //(structure,[opts])
  var args = arguments
  var structure = arguments[0]
  if (this.damagedStructure(structure) &&
  !((this.damagedStructureOfType(STRUCTURE_RAMPART))(structure)) &&
  !((this.damagedStructureOfType(STRUCTURE_WALL))(structure))) {
    return true
  }

  //hmmmm, must has either ramparts or walls
  if (args[1] == null) {
    //default hits level
    return this.damagedStructure(structure) && (
      (this.damagedStructureOfType(STRUCTURE_RAMPART, 10000))(structure) ||
      (this.damagedStructureOfType(STRUCTURE_WALL, 10000))(structure))
  }
  else if (args[1].rampartTargetHits > 0 && args[1].wallTargetHits > 0) {
    return this.damagedStructure(structure) && (
      (this.damagedStructureOfType(STRUCTURE_RAMPART, args[1].rampartTargetHits))(structure) ||
      (this.damagedStructureOfType(STRUCTURE_WALL, args[1].wallTargetHits))(structure))
  }
  else {
    //incorrect args given
    return this.damagedStructure(structure) && (
      (this.damagedStructureOfType(STRUCTURE_RAMPART, 10000))(structure) ||
      (this.damagedStructureOfType(STRUCTURE_WALL, 10000))(structure))
  }
}.bind(filters)
module.exports = filters
