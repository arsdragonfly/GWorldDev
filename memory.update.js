var memoryUpdate = {
  run: function () {
    var userdata = {
        '57b868dd1558af296d5d9bb9' : 'centralContainer',
        '57b5f7d4335105441c3eb19c' : 'centralContainer',
        '57b603a63407bb7917f5e6b2' : 'centralContainer',
        '57b7398b56333e2e6769484d' : 'centralContainer',
        '57b4c86c42baa5bf50b18093' : 'portalContainer',
        'W39N57': {
          remoteConstructionRooms: [
            'W39N58',
            'W38N57'
          ],
          remoteHarvestingRooms: [
            'W39N58',
            'W38N57'
          ]
        },
        roomConfig: {
          'W39N57': {
            emergencyState: false,
            remoteConstructionRooms: [
              'W39N58',
              'W38N57'
            ],
            remoteHarvestingRooms: [
              'W39N58',
              'W38N57'
            ],
            spawns: [
              'Spawn1'
            ],
            populationConfig: {
              remoteMaintainer: 2,
              remoteReserver: 2,
              remoteCarrier: 4,
              remoteBuilder: 1,
              builder: 2,
              defender: 1,
              towerMaintainer: 1,
              upgrader: 3,
              //harvester: 2,
              courier: 1,
              superHarvester: 5,
              carrier: 4,
              //dismantler: 5
              attacker: 1,
              //tank: 4,
              //healer: 4,
              //carrier: 3,
            },
            creepRecipeConfig: {
              attacker: {
                tough: 6,
                ranged_attack: 6,
                move: 6
              },
              dismantler: {
                tough: 5,
                work: 10,
                move: 10
              },
              healer: {
                heal: 5,
                move: 5
              },
              tank: {
                tough: 20,
                move: 10
              },
              remoteBuilder: {
                work: 4,
                carry: 4,
                move: 4
              },
              remoteMaintainer: {
                work: 4,
                carry: 4,
                move: 4
              },
              remoteCarrier: {
                carry: 14,
                move: 7
              },
              remoteReserver: {
                claim: 2,
                move: 4
              },
              defender: {
                ranged_attack: 4,
                tough: 5,
                move: 5
              },
              courier: {
                carry: 6,
                move: 3
              },
              towerMaintainer: {
                carry: 3,
                tough: 5,
                move: 3
              },
              carrier: {
                carry: 14,
                move: 7
              },
              superHarvester: {
                work: 6,
                carry: 2,
                move: 4
              },
              harvester: {
                work: 3,
                carry: 2,
                move: 2
              },
              upgrader: {
                work: 6,
                carry: 4,
                move: 5
              },
              builder: {
                work: 6,
                carry: 4,
                move: 5
              }
            }
          }
        }
    }
    Memory.userdata = userdata
  }
}

module.exports = memoryUpdate
