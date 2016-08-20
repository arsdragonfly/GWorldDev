var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleDefender = require('role.defender')
var roleCourier = require('role.courier')
var roleTowerMaintainer = require('role.tower.maintainer')
var roleCarrier = require('role.carrier')
var roleSuperHarvester = require('role.super.harvester')
var roleRemoteBuilder = require('role.remote.builder')
var structureTower = require('structure.tower')
var controlCreepNumber = require('control.creep.number')
var memoryUpdate = require('memory.update')

module.exports.loop = function () {

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

//creeps number control
    controlCreepNumber.run('defender', 2)
    controlCreepNumber.run('builder', 1)
    controlCreepNumber.run('towerMaintainer', 1)
    controlCreepNumber.run('upgrader', 4)
    controlCreepNumber.run('carrier', 3)
    //controlCreepNumber.run('harvester', 2)
    controlCreepNumber.run('remoteBuilder', 2)
    controlCreepNumber.run('courier', 1)
    controlCreepNumber.run('superHarvester', 3)

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
        if(creep.memory.role == 'superHarvester') {
            roleSuperHarvester.run(creep);
        }
        if(creep.memory.role == 'towerMaintainer') {
            roleTowerMaintainer.run(creep);
        }
    }
    memoryUpdate.run()
    structureTower.run()
}
