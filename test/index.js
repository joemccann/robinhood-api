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
let instrument = null

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
  const params = {
    token,
    ticker: 'AAPL'
  }

  try {
    const { data, statusCode } = await quote(params)
    // t.ok(data)
    console.dir(data)
    console.log(statusCode)
		t.equals(statusCode, 200)
		instrument = data.instrument
  } catch (e) {
    console.error(e)
  }
  t.end()
})

test('PASS: instrument', async t => {
  const params = {
    token,
    ticker: 'AAPL'
  }

  try {
    const { data, statusCode } = await instrument(params)
    t.ok(data)
    console.dir(data)
    t.true(statusCode, 200)
  } catch (e) {
    console.error(e)
  }
  t.end()
})

// test('PASS: popularity', async t => {
//   const params = {
//     token,
//     ticker: 'AAPL'
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
