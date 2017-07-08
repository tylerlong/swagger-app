# swagger-app

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


## Upgrade dependent libraries

```
yarn run upgrade
```


## Build

```
yarn build
```


## Release

```
yarn release
```


## todo list

- migrate data from PostgreSQL
- Show recent files list in home page
- Design according to http://swagger.io/specification/
- Find way to update title declaratively
- Some fields are actually arrays. Refer to how we handle enums
    - consumes, produces, schemes
    - Path parameters has enums
    - postpone
- Move ant assets to local
    - Let webpack bundle it
- Move some utils/ functions to a new ramda-plus project
- Fix React key issue: https://stackoverflow.com/a/43892905/862862
    - changing key is not identity


## Principles

- Avoid adding new CSS classes, reuse existing ones.
