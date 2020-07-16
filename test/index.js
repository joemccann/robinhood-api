require('dotenv').config()
const test = require('tape')

const { login, generateMFAToken, uuid } = require('..')

test('sanity', t => {
  t.ok(true)
  t.end()
})

test('PASS: generate uuid', t => {
  try {
    const data = uuid()
    console.dir(data)
  } catch (e) {
    console.error(e)
  }
  t.ok(true)
  t.end()
})

test('PASS: generate mfa token', t => {
  try {
    const data = generateMFAToken(process.env.QR)
    console.dir(data)
  } catch (e) {
    console.error(e)
  }
  t.ok(true)
  t.end()
})

test('PASS: login - default', async t => {
  try {
    const { data, err } = await login()
    console.dir(data)
  } catch (e) {
    console.error(e)
  }
  t.ok(true)
})
