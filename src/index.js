require('dotenv').config()
const fetch = require('node-fetch')
const speakeasy = require('speakeasy')

const uuid = require('./robinhood-uuid')

const creds = {
  u: process.env.USERNAME,
  p: process.env.PASSWORD,
  t: process.env.TOKEN
}

const getMFAToken = (secret) => {
  return speakeasy.totp({
    secret,
    encoding: 'base32'
  })
}

const login = async () => {
  console.log(uuid())

  const d = '0548a320-c77c-11ea-b58b-5186b1c97069'
  const w = 'aef7f92e-6d43-49b7-a5aa-e0a019acbfa8'

  const b = {
    grant_type: 'password',
    scope: 'internal',
    client_id: 'c82SH0WZOsabOXGP2sxqcj34FxkvfnWRZBKlBjFS',
    expires_in: 86400,
    device_token: uuid(),
    username: 'joseph.isaac@gmail.com',
    password: 'xH.#W:u~KVE5^B|Z',
    mfa_code: '140521'
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
  console.log(await resp.json())
}

// const login = async () => {
//   const device_token = uuid()
//   console.log('device token', device_token)
//   const body = {
//     grant_type: 'password',
//     scope: 'internal',
//     client_id: 'c82SH0WZOsabOXGP2sxqcj34FxkvfnWRZBKlBjFS',
//     expires_in: 86400,
//     device_token,
//     username: creds.u,
//     password: creds.p,
//     mfa_code: getMFAToken(creds.q)
//   }

//   let resp
//   let data

//   try {
//     resp = await fetch('https://api.robinhood.com/oauth2/token/', {
//       headers: {
//         accept: '*/*',
//         'accept-language': 'en-US,en;q=0.9',
//         'content-type': 'application/json',
//         'sec-fetch-dest': 'empty',
//         'sec-fetch-mode': 'cors',
//         'sec-fetch-site': 'same-site',
//         'x-robinhood-api-version': '1.315.0'
//       },
//       referrer: 'https://robinhood.com/login',
//       referrerPolicy: 'no-referrer-when-downgrade',
//       body: JSON.stringify(body),
//       method: 'POST',
//       mode: 'cors'
//     })
//     if (!resp.ok) throw new Error(`${resp.statusText}`)
//     data = await resp.text()
//     return { data }
//   } catch (e) {
//     console.error(e)
//     throw e
//   }
// }

module.exports = {
  getMFAToken,
  login
}
