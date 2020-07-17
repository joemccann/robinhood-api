require('dotenv').config()
const test = require('tape')

const {
  generateMFAToken,
  login,
  instrument,
  popularity,
  quote,
  uuid
} = require('..')

test('sanity', t => {
  t.ok(true)
  t.end()
})

let token = null
let instrumentUUID = null

test('PASS: login - default', async t => {
  try {
    const { data, statusCode } = await login()
    t.ok(data)
    t.true(data.expires_in > 0)
    t.equals(data.scope, 'internal')
    t.equals(data.token_type, 'Bearer')
    t.equals(statusCode, 200)
    token = data.access_token
  } catch (e) {
    console.error(e)
  }
  t.end()
})

test('PASS: quote', async t => {
  const sym = 'AAPL'
  const params = {
    token,
    symbol: sym
  }

  try {
    const { data, statusCode } = await quote(params)
    t.ok(data)
    const { symbol = '', instrument = '' } = data
    t.same(instrument,
      'https://api.robinhood.com/instruments/450dfc6d-5510-4d40-abfb-f633b7d9be3e/')
    t.same(symbol, sym)
    t.equals(statusCode, 200)
    instrumentUUID = instrument.split('/')[4]
  } catch (e) {
    console.error(e)
  }
  t.end()
})

test('PASS: instrument', async t => {
  const sym = 'AAPL'
  const params = {
    token,
    symbol: sym,
    instrument: instrumentUUID
  }

  try {
    const { data, statusCode } = await instrument(params)
    t.ok(data)
    const { id = '', symbol = '' } = data
    t.same(id, instrumentUUID)
    t.same(symbol, sym)
    t.true(statusCode, 200)
  } catch (e) {
    console.error(e)
  }
  t.end()
})

// test('PASS: popularity', async t => {
//   const params = {
//     token,
//     symbol: 'AAPL'
//   }

//   try {
//     const { data, statusCode } = await popularity(params)
//     t.ok(data)
//     console.dir(data)
//     t.equals(statusCode, 200)
//   } catch (e) {
//     console.error(e)
//   }
//   t.end()
// })

/*
test('PASS: generate uuid', t => {
  const data = uuid()
  t.equals(data.length, 36)
  t.end()
})

test('PASS: generate mfa token', t => {
  const data = generateMFAToken(process.env.QR)
  t.equals(data.length, 6)
  t.end()
})

test('FAIL: generate mfa token', t => {
  try {
    generateMFAToken()
  } catch (e) {
    t.equal(e.message, 'Missing required parameter "secret"')
  }
  t.end()
})

test('PASS: login - default', async t => {
  try {
    const { data, statusCode } = await login()
    t.ok(data)
    t.true(data.expires_in > 0)
    t.equals(data.scope, 'internal')
    t.equals(data.token_type, 'Bearer')
    t.true(statusCode, 200)
  } catch (e) {
    console.error(e)
  }
  t.end()
})
*/
