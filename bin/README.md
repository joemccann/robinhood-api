# CLI

This directory contains useful file for building large lists of the
symbols and assets on Robinhood.

## Requirements

First, be sure and download the latest set of symbols in the `bin/`
directory:

```sh
wget  -O symbols.json https://ameo.link/u/7n6.json
```

Then, run the following command to generate the `pairs.json` file:

```sh
npm run build --pairs
```

The `pairs.json` file is an array of objects containing objects of the following
schema:

```js
{
	"symbol":"NFLX",
	"instrument":""
}
```
