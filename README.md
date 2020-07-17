# Robinhood API

📈 Unofficial node.js client for accessing the APIs called on Robinhood.com.

## Installation

```sh
npm i -S @joemccann/robinhood-api
```

## Usage

Create a `.env` with the following:

```sh
USERNAME=XXX
PASSWORD=YYY
QR=ZZZ # From 2FA from Robinhood
CLIENT_ID=c82SH0WZOsabOXGP2sxqcj34FxkvfnWRZBKlBjFS # From Robinhood
```

```js
const { login } = require('@joemccann/robinhood-api')

try {
  const { data, statusCode } = await login()
  console.dir(data)
  console.log(statusCode) // 200
} catch (e) {
  console.error(e)
}
```

For more information on the requests and responses view the
[test](test/index.js) file.

## Tests

```sh
npm i -D
npm test
```

## License

MIT

## Authors

- [Joe McCann](https://twitter.com/joemccann)
