# swagger-app

[![Build Status](https://travis-ci.org/tylerlong/swagger-app.svg?branch=master)](https://travis-ci.org/tylerlong/swagger-app)
[![Coverage Status](https://coveralls.io/repos/github/tylerlong/swagger-app/badge.svg?branch=master)](https://coveralls.io/github/tylerlong/swagger-app?branch=master)

An app to create swagger spec.

It's also an app for me to learn and experiment React.


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
yarn test -- --watch
```


## Upgrade dependent libraries

```
yarn run upgrade
```


## Build

```
yarn build
```


## todo list

- migrate data from PostgreSQL
- Show recent files list in home page
- Design according to http://swagger.io/specification/
- Find way to update title declaratively
- Investigate combineReducers
- Remove flow
- State array must in order


## Principles

- Avoid adding new CSS classes, reuse existing ones.
