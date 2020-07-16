require('dotenv').config()
const fetch = require('node-fetch')
const speakeasy = require('speakeasy')

const creds = {
  u: process.env.USERNAME,
  p: process.env.PASSWORD,
  t: process.env.TOKEN
}

const generateDeviceToken = () => {
  const rands = []
  const hexa = []
  const range = [...Array(16).keys()]
  const hexaRange = [...Array(256).keys()]
  let id = ''

  for (const i in range) {
    const r = Math.random()
    const rand = 4294967296.0 * r
    const val = (parseInt(rand) >> ((3 & parseInt(i)) << 3)) & 255
    rands.push(val)
  }

  for (const i in hexaRange) {
    const num = parseInt(i) + 256
    const hexString = (num).toString(16)
    const len = hexString.length
    const hex = hexString.slice(len - 3, len - 1)
    hexa.push(hex)
  }

  for (let i in range) {
    i = parseInt(i)
    id += hexa[rands[i]]
    if ((i === 3) || (i === 5) || (i === 7) || (i === 9)) {
      id += '-'
    }
  }
  return id
}

const getMFAToken = (secret) => {
  generateDeviceToken()
  return speakeasy.totp({
    secret,
    encoding: 'base32'
  })
}

const login = async () => {
  const body = {
    grant_type: 'password',
    scope: 'internal',
    client_id: 'c82SH0WZOsabOXGP2sxqcj34FxkvfnWRZBKlBjFS',
    expires_in: 86400,
    device_token: generateDeviceToken(),
    username: creds.u,
    password: creds.p,
    mfa_code: getMFAToken(creds.q)
  }

  let resp
  let data

  try {
    resp = await fetch('https://api.robinhood.com/oauth2/token/', {
      headers: {
        accept: '*/*',
        'accept-language': 'en-US,en;q=0.9',
        'content-type': 'application/json',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site',
        'x-robinhood-api-version': '1.315.0'
      },
      referrer: 'https://robinhood.com/login',
      referrerPolicy: 'no-referrer-when-downgrade',
      body: JSON.stringify(body),
      method: 'POST',
      mode: 'cors'
    })
    if (!resp.ok) throw new Error(`${resp.statusText}`)
    data = await resp.text()
    return { data }
  } catch (e) {
    console.error(e)
  }
}

module.exports = {
  getMFAToken,
  login
}

// fetch('https://nummus.robinhood.com/holdings/', {
//   headers: {
//     accept: '*/*',
//     'accept-language': 'en-US,en;q=0.9',
//     authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJleHAiOjE1OTU4ODgyMDcsInRva2VuIjoidEx2cktBa1RFbk9XMUNBanZsWnZtZTFYbHpPTWNrIiwidXNlcl9pZCI6IjBmNmEwNDM0LWNjZjItNGI2Zi05OGI0LWU5NWVjNzI4YzI3NCIsImRldmljZV9oYXNoIjoiMzkzYWU4ZDY5YTFhYmU4YWE3OWRlYzA5MjEzYjU1NzciLCJzY29wZSI6ImludGVybmFsIiwidXNlcl9vcmlnaW4iOiJVUyIsIm9wdGlvbnMiOnRydWUsImxldmVsMl9hY2Nlc3MiOnRydWV9.W3xivkEi6-_JeUKijXG8IGeP9sYFBpp5gg9e2d66O_QPvHV9tKYrkJZaaE2LOntr47NeeyfOLmJmmByUXHdLD4JAOOVVATWQRYtb4aXgma-PgoUgUJnhbz5_NudDJl3dFVdUKRdvDjMEiOnms0L8vNvlHDUerjARtwhJEpDi1uZ1dC6GKxu7GWetlha-yvsQPGFtvwfRnDPlaTcCuv6NEazdmsuWBQZa6MSvIQS9mjEtBbIW0SnnX3bl8O690OpCueucRcqbPQU6FOQhGRgndd74LDffkLAPWwDY8m1eLe3pTcVwi9Nmii5Wru4Uhyp3Y-6p0ysvjqLxTUGnHAxOlQ',
//     'sec-fetch-dest': 'empty',
//     'sec-fetch-mode': 'cors',
//     'sec-fetch-site': 'same-site',
//     'x-timezone-id': 'America/Los_Angeles'
//   },
//   referrer: 'https://robinhood.com/',
//   referrerPolicy: 'strict-origin-when-cross-origin',
//   body: null,
//   method: 'GET',
//   mode: 'cors'
// })
