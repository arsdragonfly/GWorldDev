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
        }
    }
    Memory.userdata = userdata
  }
}

module.exports = memoryUpdate
