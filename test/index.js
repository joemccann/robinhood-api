require('dotenv').config()
const test = require('tape')

const {
  generateMFAToken,
  login,
  instrument,
  popularity,
  quote,
  historicals,
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

test('PASS: historicals', async t => {
  const sym = 'AAPL'
  const options = {
    bounds: 'trading',
    interval: '5minute',
    span: 'day'
  }
  const params = {
    token,
    symbol: sym,
    options
  }

  try {
    const { data, statusCode } = await historicals(params)
    t.ok(data)
    const { symbol = '', bounds = '' } = data
    t.same(symbol, sym)
    t.same(bounds, options.bounds)
    t.equals(statusCode, 200)
  } catch (e) {
    console.error(e)
  }
  t.end()
})

test('FAIL: historicals', async t => {
  const sym = 'CTST'
  const options = {
    bounds: 'trading',
    interval: '5minute',
    span: 'day'
  }
  const params = {
    token,
    symbol: sym,
    options
  }

  try {
    const { data, statusCode = 999 } = await historicals(params)
    t.ok(data)
    t.equals(data, 'Not Found')
    t.equals(statusCode, 404)
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

test('FAIL: quote', async t => {
  const sym = 'CTST'
  const params = {
    token,
    symbol: sym
  }

  try {
    const { data, statusCode = 999 } = await quote(params)
    t.ok(data)
    t.equals(data, 'Not Found')
    t.equals(statusCode, 404)
  } catch (e) {
    console.error(e)
  }
  t.end()
})

test('PASS: popularity', async t => {
  const params = {
    instrument: instrumentUUID
  }

  try {
    const { data, statusCode } = await popularity(params)
    t.ok(data)
    const { instrument = '', num_open_positions: num = 0 } = data
    t.same(instrument, 'https://api.robinhood.com/instruments/450dfc6d-5510-4d40-abfb-f633b7d9be3e/')
    t.true(num > 0)
    t.equals(statusCode, 200)
  } catch (e) {
    console.error(e)
  }
  t.end()
})

test('FAIL: popularity (missing instrument parameter)', async t => {
  const params = {
    nope: 'not here'
  }

  try {
    await popularity(params)
  } catch (e) {
    t.equals(e.message, 'Missing required parameter "instrument"')
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

test('FAIL: instrument (missing token parameter)', async t => {
  const params = {}

  try {
    await instrument(params)
  } catch (e) {
    t.equals(e.message, 'Missing required parameter "token"')
  }
  t.end()
})

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
