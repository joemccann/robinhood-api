const fetch = require('node-fetch')

const quote = async ({ token = '', symbol = '' }) => {
  if (!token) throw new Error('Missing required parameter "token"')
  if (!symbol) throw new Error('Missing required parameter "symbol"')

  const URL = `https://api.robinhood.com/quotes/${symbol}/`

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
        'x-robinhood-api-version': '1.315.0',
        Authorization: 'Bearer ' + token
      },
      referrer: 'https://robinhood.com/',
      referrerPolicy: 'strict-origin-when-cross-origin',
      mode: 'cors'
    })

    if (resp.status > 399) {
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

const instrument = async ({ token = '', symbol = '', instrument = '' }) => {
  if (!token) throw new Error('Missing required parameter "token"')
  if (!symbol) throw new Error('Missing required parameter "symbol"')
  if (!instrument) throw new Error('Missing required parameter "instrument"')

  const URL = `https://api.robinhood.com/instruments/${instrument}`

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
        'x-robinhood-api-version': '1.315.0',
        Authorization: 'Bearer ' + token
      },
      referrer: 'https://robinhood.com/',
      referrerPolicy: 'strict-origin-when-cross-origin',
      mode: 'cors'
    })

    if (resp.status > 399) {
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

const popularity = async ({ token = '', symbol = '' }) => {
  if (!token) throw new Error('Missing required parameter "token"')
  if (!symbol) throw new Error('Missing required parameter "symbol"')

  const URL = `https://api.robinhood.com/instruments/${symbol}/popularity`

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
        'x-robinhood-api-version': '1.315.0',
        Authorization: 'Bearer ' + token
      },
      referrer: 'https://robinhood.com/',
      referrerPolicy: 'strict-origin-when-cross-origin',
      mode: 'cors'
    })

    if (resp.status > 399) {
      throw new Error(`Response not ok: ${resp.statusText} | ${resp.status}`)
    }

    data = await resp.text()
  } catch (e) {
    if (resp.status === 404) return { statusCode: 404 }
    console.error(e.message)
    throw e
  }
  return { data, statusCode: resp.status }
}

module.exports = {
  instrument,
  quote,
  popularity
}
