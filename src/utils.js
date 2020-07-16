const speakeasy = require('speakeasy')
const uuid = require('./robinhood-uuid')

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
