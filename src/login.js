require('dotenv').config()
const fetch = require('node-fetch')
const URL = 'https://api.robinhood.com/oauth2/token/'

const {
  generateMFAToken,
  uuid
} = require('./utils')

//
// Requires .env file
//
const creds = {
  c: process.env.CLIENT_ID,
  u: process.env.U, // "USER" is reserved for Node.js
  p: process.env.PASS,
  t: process.env.TOKEN,
  q: process.env.QR,
  v: process.env.VERSION || '1.315.0'
}

const login = async () => {
  const mfa = generateMFAToken(creds.q)
  const deviceToken = uuid()

  const body = {
    grant_type: 'password',
    scope: 'internal',
    client_id: creds.c,
    expires_in: 86400,
    device_token: deviceToken,
    username: creds.u,
    password: creds.p,
    mfa_code: mfa
  }

  let resp = null
  let data = null

  try {
    resp = await fetch(URL, {
      headers: {
        accept: '*/*',
        'accept-language': 'en-US,en;q=0.9',
        'content-type': 'application/json',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site',
        'x-robinhood-api-version': creds.v
      },
      referrer: 'https://robinhood.com/',
      referrerPolicy: 'strict-origin-when-cross-origin',
      body: JSON.stringify(body),
      method: 'POST',
      mode: 'cors'
    })

    // TODO: FIX FOR "data.detail = Unable to log in with provided credentials."

    if (!resp.status > 399) {
      throw new Error(resp.statusText)
    }

    data = await resp.json()
  } catch (e) {
    if (resp.status === 404) return { statusCode: 404 }
    throw e
  }
  return { data, statusCode: resp.status }
}

module.exports = login
