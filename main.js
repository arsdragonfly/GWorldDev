const profiler = require('screeps-profiler');
require('utils.logger')
var ScreepsStats = require('screepsstats')
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleDefender = require('role.defender')
var roleCourier = require('role.courier')
var roleTowerMaintainer = require('role.tower.maintainer')
var roleCarrier = require('role.carrier')
var roleSuperHarvester = require('role.super.harvester')
var roleRemoteBuilder = require('role.remote.builder')
var roleRemoteMaintainer = require('role.remote.maintainer')
var roleRemoteCarrier = require('role.remote.carrier')
var roleRemoteReserver = require('role.remote.reserver')
var roleAttacker = require('role.attacker')
var roleDismantler = require('role.dismantler')
var roleHealer = require('role.healer')
var roleTank = require('role.tank')
var structureTower = require('structure.tower')
var controlCreepNumber = require('control.creep.number')
var memoryUpdate = require('memory.update')

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

    //creeps number control
    controlCreepNumber.run('remoteMaintainer', 2)
    controlCreepNumber.run('remoteReserver', 2)
    controlCreepNumber.run('remoteCarrier', 4)
    controlCreepNumber.run('remoteBuilder', 1)
    controlCreepNumber.run('builder', 2)
    controlCreepNumber.run('defender', 2)
    controlCreepNumber.run('towerMaintainer', 1)
    controlCreepNumber.run('upgrader', 4)
    controlCreepNumber.run('carrier', 4)
    //controlCreepNumber.run('harvester', 2)
    controlCreepNumber.run('courier', 1)
    controlCreepNumber.run('superHarvester', 5)
    //controlCreepNumber.run('defender', 2)
    //controlCreepNumber.run('dismantler', 5)
    //controlCreepNumber.run('attacker', 4)
    //controlCreepNumber.run('tank', 4)
    //controlCreepNumber.run('healer', 4)
    //controlCreepNumber.run('carrier', 3)
    //controlCreepNumber.run('superHarvester', 2)

    //role assigning
    for(var name in Game.creeps) {
      var creep = Game.creeps[name];
      if(creep.memory.role == 'harvester') {
        roleHarvester.run(creep);
      }
      if(creep.memory.role == 'upgrader') {
        roleUpgrader.run(creep);
      }
      if(creep.memory.role == 'builder') {
        roleBuilder.run(creep);
      }
      if(creep.memory.role == 'defender') {
        roleDefender.run(creep);
      }
      if(creep.memory.role == 'courier') {
        roleCourier.run(creep);
      }
      if(creep.memory.role == 'carrier') {
        roleCarrier.run(creep);
      }
      if(creep.memory.role == 'remoteBuilder') {
        roleRemoteBuilder.run(creep);
      }
      if(creep.memory.role == 'remoteMaintainer') {
        roleRemoteMaintainer.run(creep);
      }
      if(creep.memory.role == 'remoteCarrier') {
        roleRemoteCarrier.run(creep);
      }
      if(creep.memory.role == 'remoteReserver') {
        roleRemoteReserver.run(creep);
      }
      if(creep.memory.role == 'superHarvester') {
        roleSuperHarvester.run(creep);
      }
      if(creep.memory.role == 'towerMaintainer') {
        roleTowerMaintainer.run(creep);
      }
      if(creep.memory.role == 'attacker') {
        roleAttacker.run(creep);
      }
      if(creep.memory.role == 'dismantler') {
        roleDismantler.run(creep);
      }
      if(creep.memory.role == 'healer') {
        roleHealer.run(creep);
      }
      if(creep.memory.role == 'tank') {
        roleTank.run(creep);
      }
    }

    Stats.runBuiltinStats()

  });
}
