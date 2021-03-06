# AP-Monorepo

[![Build Status](https://travis-ci.org/atpar/ap-monorepo.svg?branch=master)](https://travis-ci.org/atpar/ap-monorepo)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Coverage Status](https://coveralls.io/repos/github/atpar/ap-monorepo/badge.svg?branch=master)](https://coveralls.io/github/atpar/ap-monorepo?branch=master)

**DISCLAIMER: THIS IS A WORK IN PROGRESS AND NOT AUDITED. USE IT AT YOUR OWN RISK.**

Monorepo containing all packages related to the ACTUS Protocol.

## Documentation
https://docs.actus-protocol.io/

## Packages

| Package                                                                                      | Version                                                                                                                                               | Description                                                                |
|----------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------|
| [`actus-solidity`](https://github.com/atpar/ap-monorepo/tree/master/packages/actus-solidity) | [![npm (scoped)](https://img.shields.io/npm/v/@atpar/actus-solidity)](https://www.npmjs.com/package/@atpar/actus-solidity "View this project on npm") | Contains the Solidity implementation of ACTUS contract types               |
| [`ap-contracts`](https://github.com/atpar/ap-monorepo/tree/master/packages/ap-contracts)     | [![npm (scoped)](https://img.shields.io/npm/v/@atpar/ap-contracts)](https://www.npmjs.com/package/@atpar/ap-contracts "View this project on npm")     | Contains the ACTUS Protocol smart contracts                                |                                                                            |
| [`ap.js`](https://github.com/atpar/ap-monorepo/tree/master/packages/ap.js)                   | [![npm (scoped)](https://img.shields.io/npm/v/@atpar/ap.js)](https://www.npmjs.com/package/@atpar/ap.js "View this project on npm")                   | Typescript library for interacting with the ACTUS Protocol smart contracts |

## Development
### Requirements
The versions provided are confirmed to work without any issues. Newer or older versions of the packages might work too.
- [node](https://nodejs.org/en/) [10.16.0] (recommended installing it via [nvm](https://github.com/nvm-sh/nvm))
- [yarn](https://yarnpkg.com/) [1.16.0] (recommended installing it as global npm package)
- [jq](https://stedolan.github.io/jq/) [1.6] (for macOS jq is available as a homebrew package)

### Setup
```sh
yarn install
yarn bootstrap
```

### Building
```sh
yarn build
```

### Testing
```sh
yarn test
```
