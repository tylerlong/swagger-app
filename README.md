# swagger-app

[![Build Status](https://travis-ci.org/tylerlong/swagger-app.svg?branch=master)](https://travis-ci.org/tylerlong/swagger-app)
[![Coverage Status](https://coveralls.io/repos/github/tylerlong/swagger-app/badge.svg?branch=master)](https://coveralls.io/github/tylerlong/swagger-app?branch=master)

An app to create swagger spec.


## Setup

```
yarn install
```


## Development

```
yarn dev
open http://localhost:8080
```

## Test

```
yarn test
```


## Build

```
yarn build
```


## todo list

- migrate data from PostgreSQL
- detect file changed not by the app
- improve test coverage
- use logger, so it won't output anything in production
- enum is only for string type ? hide it for other types
- export to valid swagger spec and test it with swagger-ui
- reorganize containers' code
- package an electron app
- should support auto upgrade
- reorganize components/Common
