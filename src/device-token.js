const converter = require('hex2dec')

module.exports = () => {
  const randoms = []
  const hexadecimals = []
  let id = ''

  for (let i = 0; i < 16; i++) {
    const rand = 4294967296 * Math.random()
    console.log(rand)
    const shift = rand >>> ((3 & i) << 3) & 255
    console.log('shift', shift)
    randoms.push(shift)
  }

  for (let i = 0; i < 256; i++) {
    const hexString = converter.decToHex(String(i + 256))
    // console.log(hexString)
    const len = hexString.length
    const hex = hexString.slice(len - 3, len - 1)
    // console.log('hex', hex)
    hexadecimals.push(hex)
  }

  for (let i = 0; i < 16; i++) {
    id += hexadecimals[randoms[i]]
    if ((i === 3) || (i === 5) || (i === 7) || (i === 9)) {
      id += '-'
    }
  }
  console.log(id)
  return id
}
