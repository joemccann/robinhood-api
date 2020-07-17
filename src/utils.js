const speakeasy = require('speakeasy')

const randomNumbers = () => {
  const randoms = new Array(16)
  for (let random, i = 0; i < 16; i++) {
    if ((3 & i) === 0) {
      (random = 4294967296 * Math.random())
    }
    randoms[i] = random >>> ((3 & i) << 3) & 255
  }
  return randoms
}

const uuidFactory = (randoms) => {
  const hexa = []

  for (let i = 0; i < 256; ++i) {
    hexa[i] = (i + 256).toString(16).substr(1)
  }

  let index = 0

  return [
    hexa[randoms[index++]],
    hexa[randoms[index++]],
    hexa[randoms[index++]],
    hexa[randoms[index++]],
    '-',
    hexa[randoms[index++]],
    hexa[randoms[index++]],
    '-',
    hexa[randoms[index++]],
    hexa[randoms[index++]],
    '-',
    hexa[randoms[index++]],
    hexa[randoms[index++]],
    '-',
    hexa[randoms[index++]],
    hexa[randoms[index++]],
    hexa[randoms[index++]],
    hexa[randoms[index++]],
    hexa[randoms[index++]],
    hexa[randoms[index++]]].join('')
}

const uuid = () => {
  const shiftedInts = []
  const randoms = randomNumbers()
  let now = (new Date()).getTime()

  const randomCollection = [
    1 | randoms[0],
    randoms[1],
    randoms[2],
    randoms[3],
    randoms[4],
    randoms[5]
  ]

  const wild = (16383 & (randoms[6] << 8 | randoms[7])) + 1 & 16383
  const zany = (1e4 * (268435455 & (now += 122192928e5))) % 4294967296
  const cool = now / 4294967296 * 1e4 & 268435455

  let index = 0

  shiftedInts[index++] = zany >>> 24 & 255
  shiftedInts[index++] = zany >>> 16 & 255
  shiftedInts[index++] = zany >>> 8 & 255
  shiftedInts[index++] = 255 & zany
  shiftedInts[index++] = cool >>> 8 & 255
  shiftedInts[index++] = 255 & cool
  shiftedInts[index++] = cool >>> 24 & 15 | 16
  shiftedInts[index++] = cool >>> 16 & 255
  shiftedInts[index++] = wild >>> 8 | 128
  shiftedInts[index++] = 255 & wild

  for (let i = 0; i < 6; ++i) {
    shiftedInts[index + i] = randomCollection[i]
  }

  return uuidFactory(shiftedInts)
}

const generateMFAToken = (secret) => {
  if (!secret) throw new Error('Missing required parameter "secret"')
  return speakeasy.totp({
    secret,
    encoding: 'base32'
  })
}

module.exports = {
  uuid,
  generateMFAToken
}
