var controlCreepNumber = {
  run: function(roleName,roleNumber) {
    var role = _.filter(Game.creeps, (creep) => creep.memory.role == roleName);
    console.log(roleName + 's: ' + role.length);

    if(role.length < roleNumber) {
      switch (roleName)
      {
        case 'attacker':
        var newName = Game.spawns['Spawn1'].createCreep([TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], undefined, {role: roleName});
        console.log('Spawning new ' + roleName + ': '  + newName);
        break
        case 'dismantler':
        var newName = Game.spawns['Spawn1'].createCreep([TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,WORK,MOVE,WORK,MOVE,WORK,MOVE,WORK,MOVE,WORK,MOVE,WORK,MOVE,WORK,MOVE,WORK,MOVE,WORK,MOVE,WORK,MOVE], undefined, {role: roleName});
        console.log('Spawning new ' + roleName + ': '  + newName);
        break
        case 'healer':
        var newName = Game.spawns['Spawn1'].createCreep([HEAL,MOVE,HEAL,MOVE,HEAL,MOVE,HEAL,MOVE,HEAL,MOVE], undefined, {role: roleName});
        console.log('Spawning new ' + roleName + ': '  + newName);
        break
        case 'tank':
        var newName = Game.spawns['Spawn1'].createCreep([TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], undefined, {role: roleName});
        console.log('Spawning new ' + roleName + ': '  + newName);
        break
        case 'remoteBuilder':
        var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], undefined, {role: roleName, roomName: 'W39N57'});
        console.log('Spawning new ' + roleName + ': '  + newName);
        break
        case 'remoteMaintainer':
        var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], undefined, {role: roleName, roomName: 'W39N57'});
        console.log('Spawning new ' + roleName + ': '  + newName);
        break
        case 'remoteCarrier':
        var newName = Game.spawns['Spawn1'].createCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], undefined, {role: roleName, roomName: 'W39N57'});
        console.log('Spawning new ' + roleName + ': '  + newName);
        break
        case 'remoteReserver':
        var newName = Game.spawns['Spawn1'].createCreep([CLAIM,CLAIM,MOVE,MOVE,MOVE,MOVE], undefined, {role: roleName, roomName: 'W39N57'});
        console.log('Spawning new ' + roleName + ': '  + newName);
        break
        case 'defender':
        var newName = Game.spawns['Spawn1'].createCreep([RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE], undefined, {role: roleName});
        console.log('Spawning new ' + roleName + ': '  + newName);
        break
        case 'courier':
        var newName = Game.spawns['Spawn1'].createCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], undefined, {role: roleName});
        console.log('Spawning new ' + roleName + ': '  + newName);
        break
        case 'towerMaintainer':
        var newName = Game.spawns['Spawn1'].createCreep([CARRY,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE], undefined, {role: roleName});
        console.log('Spawning new ' + roleName + ': '  + newName);
        break
        case 'carrier':
        var newName = Game.spawns['Spawn1'].createCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], undefined, {role: roleName});
        //var newName = Game.spawns['Spawn1'].createCreep([CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], undefined, {role: roleName});
        console.log('Spawning new ' + roleName + ': '  + newName);
        break
        case 'superHarvester':
        var all = _.filter(Game.flags, (flag) => flag.name.substring(0,8) == 'workSite')
        var allSites = new Array()
        for (key in all) {
          allSites.push(all[key].name)
        }
        var hCreeps = _.filter(Game.creeps, (creep) => creep.memory.role == 'superHarvester')
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
          var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], undefined, {role: roleName, workSite: availableSites[0]});
          console.log('Spawning new ' + roleName + ': '  + newName);
        }
        break
        case 'harvester':
        var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE], undefined, {role: roleName});
        console.log('Spawning new ' + roleName + ': '  + newName);
        break
        default:
        var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE], undefined, {role: roleName});
        console.log('Spawning new ' + roleName + ': '  + newName);
      }
    }
  }
}

module.exports = controlCreepNumber;
