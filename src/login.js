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
  u: process.env.USERNAME,
  p: process.env.PASSWORD,
  t: process.env.TOKEN,
  q: process.env.QR
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
        'x-robinhood-api-version': '1.315.0'
      },
      referrer: 'https://robinhood.com/',
      referrerPolicy: 'strict-origin-when-cross-origin',
      body: JSON.stringify(body),
      method: 'POST',
      mode: 'cors'
    })

    if (!resp.status > 399) {
      throw new Error(`Response not ok: ${resp.statusText} | ${resp.status}`)
    }

    data = await resp.json()
  } catch (e) {
    if (resp.status === 404) return { statusCode: 404 }
    console.error(e.message)
    throw e
  }
  return { data, statusCode: resp.status }
}

module.exports = login
