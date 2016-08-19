var controlCreepNumber = {
  run: function(roleName,roleNumber) {
    var role = _.filter(Game.creeps, (creep) => creep.memory.role == roleName);
    console.log(roleName + 's: ' + role.length);

    if(role.length < roleNumber) {
      switch (roleName)
      {
        case 'defender':
          var newName = Game.spawns['Spawn1'].createCreep([RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE], undefined, {role: roleName});
          console.log('Spawning new ' + roleName + ': '  + newName);
          break
        case 'courier':
          var newName = Game.spawns['Spawn1'].createCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], undefined, {role: roleName});
          console.log('Spawning new ' + roleName + ': '  + newName);
          break
        case 'towerMaintainer':
          var newName = Game.spawns['Spawn1'].createCreep([CARRY,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,MOVE], undefined, {role: roleName});
          console.log('Spawning new ' + roleName + ': '  + newName);
          break
        case 'carrier':
          var newName = Game.spawns['Spawn1'].createCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], undefined, {role: roleName});
          console.log('Spawning new ' + roleName + ': '  + newName);
          break
        case 'superHarvester':
          var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE], undefined, {role: roleName});
          console.log('Spawning new ' + roleName + ': '  + newName);
          break
        case 'harvester':
          var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE], undefined, {role: roleName});
          console.log('Spawning new ' + roleName + ': '  + newName);
          break
        default:
          var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], undefined, {role: roleName});
          console.log('Spawning new ' + roleName + ': '  + newName);
    }
  }
}
}
module.exports = controlCreepNumber;
