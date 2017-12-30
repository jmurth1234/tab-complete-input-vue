# `<tab-complete-input>`

This is a tab completable `<input>` component for Vue.js. It supports fetching data from a fixed array and dynamically via a method and optional formatting of the tabbed words via a method.

The source code is essentially a port of the [tab-complete](https://www.npmjs.com/package/tab-complete) npm package to a vue friendly format, meaning it's a single vue module and removes the jQuery dependency.

### [DEMO](https://rymate1234.github.io/tab-complete-input-vue/)

## Build Setup (for contributors)

``` bash
# install dependencies
npm install

# serves the demo with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

## Installing
The package will be available from npm as vue-tab-complete-input. To install, simply run

``` bash
npm install vue-tab-complete-input
```

## Usage

Firstly, you'll need to load the component into vue:

``` JavaScript
import TabCompleteInput from "./tab-complete-input"
Vue.component( 'tab-complete-input', TabCompleteInput );
```

Then, when defining a vue component it's used in, include it in the list of components:

``` JavaScript
import TabCompleteInput from "./tab-complete-input"

export default {
  components: {
    TabCompleteInput
  },
  // ....
}
```

Now you can use it as a basic `<input>` in your html, with support for v-model with data in your vue component.

``` html
<tab-complete-input v-model="text" :dataSource="staticList" :format="getFormat" />
```

A full example is in the src directory as example.vue