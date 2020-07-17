#! /usr/local/bin/node
const fs = require('fs')
const path = require('path')
const { login, quote } = require('../src')
const args = process.argv.slice(2)
const symbols = []

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

//
// WIP
//
const fetchInstrumentForSymbol = async () => {
  const file = await fs
    .readFileSync(path.resolve(__dirname, './pairs.json'), 'utf-8')

  let token = null
  let instrument = null

  try {
    const { data } = await login()
    token = data.access_token
  } catch (e) {
    console.error(e)
  }

  const pairs = JSON.parse(file)
  const combined = {}

  for (const pair of pairs) {
    const { symbol: ticker } = pair
    const params = {
      token,
      ticker
    }

    try {
      const { data } = await quote(params)
      instrument = data.instrument.split('/')[4]
      combined[ticker] = instrument
    } catch (e) {
      console.error(e)
    }
  }

  await fs
    .writeFileSync(path
      .resolve(__dirname, './combined.json'), JSON.stringify(combined), 'utf-8')
}

const run = async () => {
  if (args.find(arg => arg === 'pairs')) {
    await buildPairsFile()
    console.info('✓ Built pairs.json file.')
  }
  // await fetchInstrumentForSymbol()
  process.exit(0)
}

run()
