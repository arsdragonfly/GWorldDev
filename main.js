const profiler = require('screeps-profiler');
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
var structureTower = require('structure.tower')
var controlCreepNumber = require('control.creep.number')
var ScreepsStats = require('screepsstats')
var memoryUpdate = require('memory.update')

profiler.enable();
global.Stats = new ScreepsStats()

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
    controlCreepNumber.run('remoteBuilder', 2)
    controlCreepNumber.run('remoteMaintainer', 4)
    controlCreepNumber.run('remoteReserver', 2)
    controlCreepNumber.run('remoteCarrier', 6)
    controlCreepNumber.run('builder', 1)
    controlCreepNumber.run('defender', 2)
    controlCreepNumber.run('towerMaintainer', 1)
    controlCreepNumber.run('upgrader', 4)
    controlCreepNumber.run('carrier', 5)
    //controlCreepNumber.run('harvester', 2)
    controlCreepNumber.run('courier', 1)
    controlCreepNumber.run('superHarvester', 5)

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
    }

    Stats.runBuiltinStats()
  });
}
