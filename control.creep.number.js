var hf = require('library.helper.functions')
var controlCreepNumber = {}

controlCreepNumber.generateRecipeArray = function(recipe) {
  var r = hf.dataCopy(recipe)
  var ra = new Array()
  var sumOfBodyParts = function(recipe) {
    var total = 0
    for (key in recipe) {
      total += recipe[key]
    }
    return total
  }
  while (sumOfBodyParts(r) > 0) {
    for (key in r) {
      if (r[key] > 0) {
        ra.push(key)
        r[key] -= 1
      }
    }
  }
  return ra
}.bind(controlCreepNumber)

controlCreepNumber.generateCreepMemory = function(roleName,roomName) {
  switch (roleName) {
    case 'superHarvester':
    var all = _.filter(Game.flags, (flag) => flag.name.substring(0,6) == roomName && flag.name.substring(6,8) == 'WS') //TODO: fix it so that it works under room names like N114W514 too
    var allSites = new Array()
    for (key in all) {
      allSites.push(all[key].name)
    }
    var hCreeps = _.filter(Game.creeps, (creep) => creep.memory.role == 'superHarvester' && creep.memory.roomName == roomName)
    var occupiedSites = new Array()
    for (key in hCreeps) {
      occupiedSites.push(hCreeps[key].memory.workSite)
    }
    var availableSites = new Array()
    for (i in allSites) {
      var found = false
      for (j in occupiedSites) {
        if (allSites[i] == occupiedSites[j]) {
          found = true
          break
        }
      }
      if (!found) {
        availableSites.push(allSites[i])
      }
    }
    if (availableSites.length > 0) {
      var memory = {role: roleName, roomName: roomName, workSite: availableSites[0]};
      return memory
    }
    else {
      var memory = {role: roleName, roomName: roomName}
      return memory
    }
    break
    default:
    return {role: roleName, roomName: roomName}
  }
}.bind(controlCreepNumber)

controlCreepNumber.generateSpawnName = function(roomName) {
  return Memory.userdata.roomConfig[roomName].spawns[0]
}.bind(controlCreepNumber)

controlCreepNumber.run = function(roleName, roleNumber, roomName) {
  var role = _.filter(Game.creeps, function(creep) {return creep.memory.role == roleName && creep.memory.roomName == roomName});
  console.log(roomName + ' ' + roleName + 's: ' + role.length);

  if(role.length < roleNumber) {
    var l = Memory.userdata.roomConfig[roomName].creepRecipeConfig
    var recipe = l[roleName]
    var recipeArray = this.generateRecipeArray(recipe)
    var memory = this.generateCreepMemory(roleName, roomName)
    var spawnName = this.generateSpawnName(roomName)
    //start to spawn a creep
    var newName = Game.spawns[spawnName].createCreep(recipeArray, memory)
    console.log('Spawning new ' + roleName + ' in ' + roomName + ': ' + newName)

    //switch (roleName)
    //{
    //  case 'attacker':
    //  var newName = Game.spawns['Spawn1'].createCreep([TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], undefined, {role: roleName});
    //  console.log('Spawning new ' + roleName + ': '  + newName);
    //  break
    //  case 'dismantler':
    //  var newName = Game.spawns['Spawn1'].createCreep([TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,WORK,MOVE,WORK,MOVE,WORK,MOVE,WORK,MOVE,WORK,MOVE,WORK,MOVE,WORK,MOVE,WORK,MOVE,WORK,MOVE,WORK,MOVE], undefined, {role: roleName});
    //  console.log('Spawning new ' + roleName + ': '  + newName);
    //  break
    //  case 'healer':
    //  var newName = Game.spawns['Spawn1'].createCreep([HEAL,MOVE,HEAL,MOVE,HEAL,MOVE,HEAL,MOVE,HEAL,MOVE], undefined, {role: roleName});
    //  console.log('Spawning new ' + roleName + ': '  + newName);
    //  break
    //  case 'tank':
    //  var newName = Game.spawns['Spawn1'].createCreep([TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], undefined, {role: roleName});
    //  console.log('Spawning new ' + roleName + ': '  + newName);
    //  break
    //  case 'remoteBuilder':
    //  var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], undefined, {role: roleName, roomName: 'W39N57'});
    //  console.log('Spawning new ' + roleName + ': '  + newName);
    //  break
    //  case 'remoteMaintainer':
    //  var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], undefined, {role: roleName, roomName: 'W39N57'});
    //  console.log('Spawning new ' + roleName + ': '  + newName);
    //  break
    //  case 'remoteCarrier':
    //  var newName = Game.spawns['Spawn1'].createCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], undefined, {role: roleName, roomName: 'W39N57'});
    //  console.log('Spawning new ' + roleName + ': '  + newName);
    //  break
    //  case 'remoteReserver':
    //  var newName = Game.spawns['Spawn1'].createCreep([CLAIM,CLAIM,MOVE,MOVE,MOVE,MOVE], undefined, {role: roleName, roomName: 'W39N57'});
    //  console.log('Spawning new ' + roleName + ': '  + newName);
    //  break
    //  case 'defender':
    //  var newName = Game.spawns['Spawn1'].createCreep([RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE], undefined, {role: roleName});
    //  console.log('Spawning new ' + roleName + ': '  + newName);
    //  break
    //  case 'courier':
    //  var newName = Game.spawns['Spawn1'].createCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], undefined, {role: roleName});
    //  console.log('Spawning new ' + roleName + ': '  + newName);
    //  break
    //  case 'towerMaintainer':
    //  var newName = Game.spawns['Spawn1'].createCreep([CARRY,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE], undefined, {role: roleName});
    //  console.log('Spawning new ' + roleName + ': '  + newName);
    //  break
    //  case 'carrier':
    //  var newName = Game.spawns['Spawn1'].createCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], undefined, {role: roleName});
    //  //var newName = Game.spawns['Spawn1'].createCreep([CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], undefined, {role: roleName});
    //  console.log('Spawning new ' + roleName + ': '  + newName);
    //  break
    //  case 'superHarvester':
    //  var all = _.filter(Game.flags, (flag) => flag.name.substring(0,8) == 'workSite')
    //  var allSites = new Array()
    //  for (key in all) {
    //    allSites.push(all[key].name)
    //  }
    //  var hCreeps = _.filter(Game.creeps, (creep) => creep.memory.role == 'superHarvester')
    //  var occupiedSites = new Array()
    //  for (key in hCreeps) {
    //    occupiedSites.push(hCreeps[key].memory.workSite)
    //  }
    //  var availableSites = new Array()
    //  for (i in allSites) {
    //    var found = false
    //    for (j in occupiedSites) {
    //      if (allSites[i] == occupiedSites[j]) {
    //        found = true
    //        break
    //      }
    //    }
    //    if (!found) {
    //      availableSites.push(allSites[i])
    //    }
    //  }
    //  if (availableSites.length > 0) {
    //    var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], undefined, {role: roleName, workSite: availableSites[0]});
    //    console.log('Spawning new ' + roleName + ': '  + newName);
    //  }
    //  break
    //  case 'harvester':
    //  var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE], undefined, {role: roleName});
    //  console.log('Spawning new ' + roleName + ': '  + newName);
    //  break
    //  default:
    //  var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE], undefined, {role: roleName});
    //  console.log('Spawning new ' + roleName + ': '  + newName);
    //}
  }
}.bind(controlCreepNumber)


module.exports = controlCreepNumber;
