var memoryUpdate = {
  run: function () {
    var userdata = {
      //W39N57
      '57b868dd1558af296d5d9bb9' : 'centralContainer',
      '57b5f7d4335105441c3eb19c' : 'centralContainer',
      '57b603a63407bb7917f5e6b2' : 'centralContainer',
      '57b7398b56333e2e6769484d' : 'centralContainer',
      '57b4c86c42baa5bf50b18093' : 'portalContainer',
      //W39N58
      '57c5ddec219ecfc419694d83' : 'centralContainer',
      roomConfig: {
        'W39N57': {
          emergencyState: false,
          remoteConstructionRooms: [
            'W39N58', 'W38N57',
            // 'W38N58'
          ],
          remoteHarvestingRooms: [
            'W39N58', 'W38N57'
          ],
          spawns: [
            'Spawn1'
          ],
          populationConfig: {
            remoteMaintainer: 3,
            remoteReserver: 2,
            remoteCarrier: 4,
            remoteBuilder: 1,
            builder: 1,
            attacker: 1,
            defender: 1,
            towerMaintainer: 2,
            upgrader: 5,
            //harvester: 2,
            courier: 1,
            superHarvester: 5,
            carrier: 4,
            //dismantler: 5
            //remoteClaimer: 1,
            //tank: 4,
            //healer: 4,
            //carrier: 3,
          },
          creepRecipeConfig: {
            attacker: {
              tough: 6, ranged_attack: 6, move: 6
            },
            dismantler: {
              tough: 5, work: 10, move: 10
            },
            healer: {
              heal: 5, move: 5
            },
            tank: {
              tough: 20, move: 10
            },
            remoteBuilder: {
              work: 4, carry: 4, move: 4
            },
            remoteMaintainer: {
              work: 4, carry: 4, move: 4
            },
            remoteCarrier: {
              carry: 20, move: 10
            },
            remoteReserver: {
              claim: 2, move: 4
            },
            remoteClaimer: {
              claim: 1, move: 6
            },
            defender: {
              ranged_attack: 5, tough: 5, move: 5
            },
            courier: {
              carry: 6, move: 3
            },
            towerMaintainer: {
              carry: 3, tough: 5, move: 8
            },
            carrier: {
              carry: 16, move: 8
            },
            superHarvester: {
              work: 7, carry: 2, move: 4
            },
            harvester: {
              work: 3, carry: 2, move: 2
            },
            upgrader: {
              work: 6, carry: 4, move: 5
            },
            builder: {
              work: 6, carry: 4, move: 5
            }
          }
        },
        'W38N58': {
          emergencyState: false,
          remoteConstructionRooms: [],
          remoteHarvestingRooms: [],
          spawns: ['Spawn2'],
          //populationConfig: {
          //  towerMaintainer: 1,
          //  upgrader: 3,
          //  builder: 1,
          //  carrier: 4,
          //  courier: 1,
          //  superHarvester: 2,
          //  //harvester: 2,
          //},
          creepRecipeConfig: {
            courier: {carry: 3, move: 2},
            upgrader: {work: 4, carry: 3, move: 4},
            harvester: {work: 4, carry: 3, move: 4},
            builder: {work: 4, carry: 3, move: 4},
            towerMaintainer: {carry: 1, tough: 10, move: 1},
            carrier: {carry: 14, move: 7},
            superHarvester: {work: 7, carry: 2, move: 4}
          }
        }
      }
    }
    Memory.userdata = userdata
  }
}

module.exports = memoryUpdate
