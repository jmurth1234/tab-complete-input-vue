# `<tab-complete-input>`

This is a tab completable `<input>` component for Vue.js. It supports fetching data from a fixed array and dynamically via a method and optional formatting of the tabbed words via a method.

The source code is essentially a port of the [tab-complete](https://www.npmjs.com/package/tab-complete) npm package to a vue friendly format, meaning it's a single vue module and removes the jQuery dependency.

New to 2.0 -- the library is now written for Vue 3

### [Demo and docs](https://tab-complete-input-vue.vercel.app/)

## Installing
The package is available from npm as vue-tab-complete-input. To install, simply run

``` bash
npm install vue-tab-complete-input
```

Or if you use yarn

``` bash
yarn add vue-tab-complete-input
```

## Build Setup (for contributors)

``` bash
# install dependencies
yarn install

# serves the docs / development environment
yarn dev 

# serves the docs / development environment with the vercel dev environment
yarn dev:vercel

# run test suite
yarn test 

# run linter 
yarn lint

# Build site
yarn build

# build lib for production with minification
yarn build:lib
```
