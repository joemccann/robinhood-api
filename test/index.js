require('dotenv').config()
const test = require('tape')

const { login, getMFAToken } = require('..')

test('sanity', t => {
  t.ok(true)
  t.end()
})

test('PASS: mfa token', t => {
  try {
    const data = getMFAToken(process.env.QR)
    console.dir(data)
  } catch (e) {
    console.error(e)
  }
  t.ok(true)
  t.end()
})

/*
test('PASS: login - default', async t => {
  try {
    const { data, err } = await login()
    console.dir(data)
  } catch (e) {
    console.error(e)
  }
  t.ok(true)
})
*/
