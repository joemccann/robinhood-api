#! /usr/local/bin/node
const fs = require('fs')
const path = require('path')
const fetch = require('node-fetch')
const { resolve } = require('path')
const args = process.argv.slice(2)
const symbols = []

const chunk = (arr, chunkSize = 1, cache = []) => {
  const tmp = [...arr]
  if (chunkSize <= 0) return cache
  while (tmp.length) cache.push(tmp.splice(0, chunkSize))
  return cache
}

const sleep = (ms = 1000) => {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}

const buildPairsFile = async () => {
  const file = await fs
    .readFileSync(path.resolve(__dirname, './symbols.json'), 'utf-8')

  const data = JSON.parse(file)

  for (let i = 0; i < data.length; i++) {
    const pair = { symbol: data[i].symbol, instrument: '' }
    symbols.push(pair)
  }

  await fs
    .writeFileSync(path
      .resolve(__dirname, './pairs.json'), JSON.stringify(symbols), 'utf-8')
}

const results = []

const batch = async () => {
  const file = await fs
    .readFileSync(path.resolve(__dirname, './pairs.json'), 'utf-8')

  const pairs = JSON.parse(file)

  const BATCH_SIZE = 5

  const allFiles = pairs.slice(0, 30)

  const i = 0

  for (const pair of allFiles) {
    console.log('symbol:', pair.symbol)
    const { symbol } = pair
    const url = [
      'https://rh-api-instrument-from-symbol.azurewebsites.net',
      'api',
      'instrument?symbol={}'.replace('{}', symbol)]
      .join('/')

    if (i && i % 5) await sleep(10000)
    try {
      const resp = await fetch(url)
      // if (resp && resp.status && resp.status === 200) {
      const { body, status } = await resp.json()
      if (status === 200) results.push({ symbol, instrument: body })
      console.log('body', body)
      console.log('status', status)
      // console.log(`Fetched URL: ${url}`)
      // } else console.log(resp)
    } catch (e) {
      console.error(e)
    }
  }

  await fs.writeFileSync(path
    .resolve(__dirname, './result.json'),
  JSON.stringify(results), 'utf-8')
}
//
// WIP
//
const fetchInstrumentForSymbol = async () => {
  const file = await fs
    .readFileSync(path.resolve(__dirname, './pairs.json'), 'utf-8')

  const pairs = JSON.parse(file)

  const proms = []

  const send = async (pair) => {
    if (i > 50) return { data: null }
    const { symbol } = pair
    const URL = 'https://rh-api-instrument-from-symbol.azurewebsites.net/api/' +
    `instrument?symbol=${symbol}`

    let json = null
    let resp = null
    console.log(`>>> Fetching ${symbol}`)

    if (!(i % 3)) {
      console.log('...sleeping...')
      await sleep(2000)
    }

    try {
      resp = await fetch(URL)
      if (!resp) {
        console.log('$$$$ NO RESPONSE $$$$')
        console.log(URL)
        return {
          err: new Error('WTF')
        }
      }

      const { status = 999 } = resp

      if (status > 399) {
        console.log('>>>>>>>>>>')
        console.dir(resp.status)
        return {
          err: new Error(`Response not ok: ${resp.statusText} | ${resp.status}`)
        }
      }

      json = await resp.json()
    } catch (e) {
      if (!resp) {
        console.log('$$$$ NO RESPONSE EXCEPTION $$$$')
        console.log(URL)
        return {
          err: new Error('WTF')
        }
      }
      if (resp.status === 404) return { statusCode: 404 }
      console.error(e.message)
      return { err: e }
    }
    return { data: { instrument: json.body, symbol } }
  }

  let i = 0
  for (const pair of pairs) {
    proms.push(await send(pair), i++)
  }

  const result = []

  try {
    //
    // Flatten the results as one array
    //
    (Promise.all(proms)).map(r => {
      //
      // In the case r is undefined or null
      //
      if (r) {
        const { data = null } = r
        if (data) {
          console.dir(data)
          result.push(data)
        }
      }
    })
  } catch (err) {
    console.error(err)
    return { err }
  }

  /// ///////////////////

  await fs
    .writeFileSync(path
      .resolve(__dirname, './result.json'), JSON.stringify(result), 'utf-8')
}

const run = async () => {
  if (args.find(arg => arg === 'pairs')) {
    await buildPairsFile()
    console.info('✓ Built pairs.json file.')
  }
  try {
    await batch()
  } catch (e) {
    console.error(e)
  }
  process.exit(0)
}

run()
