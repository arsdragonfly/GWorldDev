var cf = {
  pickupEnergy: function (creep) {
    if (creep.carry.energy < creep.carryCapacity)
    {
        var energy = creep.pos.findInRange(
            FIND_DROPPED_ENERGY,
            1
        );

        if (energy.length) {
            console.log('found ' + energy[0].energy + ' energy at ', energy[0].pos);
            creep.pickup(energy[0]);
        }
    }
  }
}

module.exports = cf
