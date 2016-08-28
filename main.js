const profiler = require('screeps-profiler');
require('utils.logger')
var ScreepsStats = require('screepsstats')
var role = {}
role.harvester = require('role.harvester');
role.upgrader = require('role.upgrader');
role.builder = require('role.builder');
role.defender = require('role.defender')
role.courier = require('role.courier')
role.towerMaintainer = require('role.tower.maintainer')
role.carrier = require('role.carrier')
role.superHarvester = require('role.super.harvester')
role.remoteBuilder = require('role.remote.builder')
role.remoteMaintainer = require('role.remote.maintainer')
role.remoteCarrier = require('role.remote.carrier')
role.remoteReserver = require('role.remote.reserver')
role.attacker = require('role.attacker')
role.dismantler = require('role.dismantler')
role.healer = require('role.healer')
role.tank = require('role.tank')
var structureTower = require('structure.tower')
var controlCreepNumber = require('control.creep.number')
var memoryUpdate = require('memory.update')
//var rc = require('tool.route.calculator')
//rc.run()

profiler.enable();
global.Stats = new ScreepsStats();

module.exports.loop = function () {
  profiler.wrap(function() {
    memoryUpdate.run()
    structureTower.run()

    for(var name in Memory.creeps) {
      if(!Game.creeps[name]) {
        delete Memory.creeps[name];
        console.log('Clearing non-existing creep memory:', name);
      }
    }

    for (roomName in Memory.userdata.roomConfig) {
      var config = Memory.userdata.roomConfig[roomName]
      var populationConfig = config.populationConfig
      for (roleName in populationConfig) {
        var n = populationConfig[roleName]
        controlCreepNumber.run(roleName, n, roomName)
      }
    }

    //creeps number control
    //controlCreepNumber.run('remoteMaintainer', 2)
    //controlCreepNumber.run('remoteReserver', 2)
    //controlCreepNumber.run('remoteCarrier', 4)
    //controlCreepNumber.run('remoteBuilder', 1)
    //controlCreepNumber.run('builder', 2)
    //controlCreepNumber.run('defender', 2)
    //controlCreepNumber.run('towerMaintainer', 1)
    //controlCreepNumber.run('upgrader', 4)
    //controlCreepNumber.run('carrier', 4)
    //controlCreepNumber.run('harvester', 2)
    //controlCreepNumber.run('courier', 1)
    //controlCreepNumber.run('superHarvester', 5)
    //controlCreepNumber.run('defender', 2)
    //controlCreepNumber.run('dismantler', 5)
    //controlCreepNumber.run('attacker', 1)
    //controlCreepNumber.run('tank', 4)
    //controlCreepNumber.run('healer', 4)
    //controlCreepNumber.run('carrier', 3)
    //controlCreepNumber.run('superHarvester', 2)

    //role assigning
    for(var name in Game.creeps) {
      var creep = Game.creeps[name];
      role[creep.memory.role].run(creep);
    }

    Stats.runBuiltinStats()

  });
}
