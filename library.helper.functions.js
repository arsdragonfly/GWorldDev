var hf = {}
hf.dataCopy = function(object) {
  return JSON.parse(JSON.stringify(object))
}.bind(hf)

module.exports = hf
