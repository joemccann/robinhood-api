const fetch = require('node-fetch')
const qs = require('querystring')

const version = process.env.VERSION || '1.315.0'

const params = {
  headers: {
    accept: '*/*',
    'accept-language': 'en-US,en;q=0.9',
    'content-type': 'application/json',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-site',
    'x-robinhood-api-version': version
  },
  referrer: 'https://robinhood.com/',
  referrerPolicy: 'strict-origin-when-cross-origin',
  mode: 'cors'
}

//
// Authenticated endpoints
//
const quote = async ({ token = '', symbol = '' }) => {
  if (!token) throw new Error('Missing required parameter "token"')
  if (!symbol) throw new Error('Missing required parameter "symbol"')

  const URL = `https://api.robinhood.com/quotes/${symbol}/`

  let resp = null
  let data = null

  if (!params.headers.Authorization) {
    params.headers.Authorization = 'Bearer ' + token
  }

  try {
    resp = await fetch(URL, params)

    if (resp.status > 399) {
      throw new Error(resp.statusText)
    }

    data = await resp.json()
  } catch (e) {
    const statusCode = resp.status || 500
    return { data: e.message, statusCode }
  }
  const statusCode = resp.status || 500
  return { data, statusCode }
}

const instrument = async ({ token = '', instrument = '' }) => {
  if (!token) throw new Error('Missing required parameter "token"')
  if (!instrument) throw new Error('Missing required parameter "instrument"')

  const URL = `https://api.robinhood.com/instruments/${instrument}`

  let resp = null
  let data = null

  if (!params.headers.Authorization) {
    params.headers.Authorization = 'Bearer ' + token
  }

  try {
    resp = await fetch(URL, params)

    if (resp.status > 399) {
      throw new Error(resp.statusText)
    }

    data = await resp.json()
  } catch (e) {
    const statusCode = resp.status || 500
    return { data: e.message, statusCode }
  }
  const statusCode = resp.status || 500
  return { data, statusCode }
}

const historicals = async ({ token = '', symbol = '', options = {} }) => {
  if (!token) throw new Error('Missing required parameter "token"')
  if (!symbol) throw new Error('Missing required parameter "symbol"')

  let URL = [
    'https://api.robinhood.com',
    'marketdata',
    'historicals',
    symbol].join('/')

  if (Object.keys(options).length) {
    // ?bounds=trading&interval=5minute&span=day
    URL += '/?' + qs.stringify(options)
  }

  let resp = null
  let data = null

  if (!params.headers.Authorization) {
    params.headers.Authorization = 'Bearer ' + token
  }

  try {
    resp = await fetch(URL, params)

    if (resp.status > 399) {
      throw new Error(resp.statusText)
    }

    data = await resp.json()
  } catch (e) {
    const statusCode = resp.status || 500
    return { data: e.message, statusCode }
  }
  const statusCode = resp.status || 500
  return { data, statusCode }
}

const fundamentals = async ({ token = '', symbol = '' }) => {
  if (!token) throw new Error('Missing required parameter "token"')
  if (!symbol) throw new Error('Missing required parameter "symbol"')

  const URL = `https://api.robinhood.com/fundamentals/${symbol}/`

  let resp = null
  let data = null

  if (!params.headers.Authorization) {
    params.headers.Authorization = 'Bearer ' + token
  }

  try {
    resp = await fetch(URL, params)

    if (resp.status > 399) {
      throw new Error(resp.statusText)
    }

    data = await resp.json()
  } catch (e) {
    const statusCode = resp.status || 500
    return { data: e.message, statusCode }
  }
  const statusCode = resp.status || 500
  return { data, statusCode }
}

//
// Public endpoints
//
const popularity = async ({ instrument = '' }) => {
  if (!instrument) throw new Error('Missing required parameter "instrument"')

  const URL = `https://api.robinhood.com/instruments/${instrument}/popularity`

  let resp = null
  let data = null

  try {
    resp = await fetch(URL, params)

    if (resp.status > 399) {
      throw new Error(resp.statusText)
    }

    data = await resp.json()
  } catch (e) {
    const statusCode = resp.status || 500
    return { data: e.message, statusCode }
  }
  const statusCode = resp.status || 500
  return { data, statusCode }
}

module.exports = {
  fundamentals,
  historicals,
  instrument,
  popularity,
  quote
}
