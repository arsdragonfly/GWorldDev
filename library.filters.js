var filters = {}
filters.container = function(structure) {
    return structure.structureType == STRUCTURE_CONTAINER
  }.bind(filters)
filters.nonEmptyContainer = function(structure) {
    return this.container(structure) && structure.store[RESOURCE_ENERGY] > 0
  }.bind(filters)
filters.centralContainer = function(structure) {
    return this.container(structure) && (Memory.userdata[structure.id] == 'centralContainer')
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
filters.emptyExtension = function(structure) {
    return (structure.structureType == STRUCTURE_EXTENSION) &&
    (structure.energy < structure.energyCapacity)
  }.bind(filters)

module.exports = filters
