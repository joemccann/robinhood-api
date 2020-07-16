function randomNumbers () {
  var randoms = new Array(16)
  for (let random, t = 0; t < 16; t++) {
    if ((3 & t) === 0) {
      (random = 4294967296 * Math.random())
    }
    randoms[t] = random >>> ((3 & t) << 3) & 255
  }
  return randoms
}

const uuid = (e) => {
  const hexa = []
  for (let i = 0; i < 256; ++i) {
    hexa[i] = (i + 256).toString(16).substr(1)
  }
  let index = 0
  return [
    hexa[e[index++]],
    hexa[e[index++]],
    hexa[e[index++]],
    hexa[e[index++]],
    '-',
    hexa[e[index++]],
    hexa[e[index++]],
    '-',
    hexa[e[index++]],
    hexa[e[index++]],
    '-',
    hexa[e[index++]],
    hexa[e[index++]],
    '-',
    hexa[e[index++]],
    hexa[e[index++]],
    hexa[e[index++]],
    hexa[e[index++]],
    hexa[e[index++]],
    hexa[e[index++]]].join('')
}

module.exports = function generate (e = {}) {
  var c = 0
  var shiftedInts = []
  var d
  var randoms = randomNumbers()
  var f = [
    1 | randoms[0],
    randoms[1],
    randoms[2],
    randoms[3],
    randoms[4],
    randoms[5]
  ]

  if (!d) d = 16383 & (randoms[6] << 8 | randoms[7])

  var h = (new Date()).getTime()

  d = d + 1 & 16383

  const y = (1e4 * (268435455 & (h += 122192928e5))) % 4294967296
  const v = h / 4294967296 * 1e4 & 268435455

  shiftedInts[c++] = y >>> 24 & 255
  shiftedInts[c++] = y >>> 16 & 255
  shiftedInts[c++] = y >>> 8 & 255
  shiftedInts[c++] = 255 & y
  shiftedInts[c++] = v >>> 8 & 255
  shiftedInts[c++] = 255 & v
  shiftedInts[c++] = v >>> 24 & 15 | 16
  shiftedInts[c++] = v >>> 16 & 255
  shiftedInts[c++] = d >>> 8 | 128
  shiftedInts[c++] = 255 & d

  for (var b = 0; b < 6; ++b) {
    shiftedInts[c + b] = f[b]
  }

  return uuid(shiftedInts)
}
