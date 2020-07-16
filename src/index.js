require('dotenv').config()
const fetch = require('node-fetch')
const speakeasy = require('speakeasy')
const uuid = require('./robinhood-uuid')

const creds = {
  u: process.env.USERNAME,
  p: process.env.PASSWORD,
  t: process.env.TOKEN,
  q: process.env.QR
}

const getMFAToken = (secret) => {
  return speakeasy.totp({
    secret,
    encoding: 'base32'
  })
}

const login = async () => {
  const mfa = getMFAToken(creds.q)
  const deviceToken = uuid()

  const b = {
    grant_type: 'password',
    scope: 'internal',
    client_id: 'c82SH0WZOsabOXGP2sxqcj34FxkvfnWRZBKlBjFS',
    expires_in: 86400,
    device_token: deviceToken,
    username: creds.u,
    password: creds.p,
    mfa_code: mfa
  }

  const resp = await fetch('https://api.robinhood.com/oauth2/token/', {
    headers: {
      accept: '*/*',
      'accept-language': 'en-US,en;q=0.9',
      'content-type': 'application/json',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-site',
      'x-robinhood-api-version': '1.315.0'
    },
    referrer: 'https://robinhood.com/',
    referrerPolicy: 'strict-origin-when-cross-origin',
    body: JSON.stringify(b),
    method: 'POST',
    mode: 'cors'
  })
  const data = await resp.json()
  return { data }
}

module.exports = {
  getMFAToken,
  login
}
