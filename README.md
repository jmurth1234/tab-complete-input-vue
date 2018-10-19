# `<tab-complete-input>`

This is a tab completable `<input>` component for Vue.js. It supports fetching data from a fixed array and dynamically via a method and optional formatting of the tabbed words via a method.

The source code is essentially a port of the [tab-complete](https://www.npmjs.com/package/tab-complete) npm package to a vue friendly format, meaning it's a single vue module and removes the jQuery dependency.

### [DEMO](https://vue-tab-complete-input.now.sh/)

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
The package is available from npm as vue-tab-complete-input. To install, simply run

``` bash
npm install vue-tab-complete-input
```

Note: The package currently won't work with yarn without `--ignore-engines`. 

## Usage

Firstly, you'll need to load the component into vue:

``` JavaScript
import TabCompleteInput from "vue-tab-complete-input"
Vue.component( 'tab-complete-input', TabCompleteInput );
```

Then, when defining a vue component it's used in, include it in the list of components:

``` JavaScript
import TabCompleteInput from "vue-tab-complete-input"

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

Note: you _must_ set a `v-model` for any tab completion to work.

A full example is in the src directory as example.vue

## Properties

### `dataSource`

This allows you to configure the data source for the tab completion. It accepts either an array of strings or a method.

In the case of the array, the contents of the array are loaded into the tab completion when the object is created.

In the case of the method, the method is called each time a user starts tab completing a word, however if there's multiple completions in a row then the method won't be called again.

The method has two arguments - the current word being completed and the position of the word in the current text: 

``` JavaScript
exampleData: function (word, position) {
  this.sleep(400);
  if (word.startsWith("/") && position == 0)
    return this.commandList;

  return this.staticList;
}, 
```

### `format`

This allows you to pass a method to the component that will format the result of a tab completion. It has 3 parameters - the current word being completed, the previous word in the array and the position of the current word.

```JavaScript
getFormat: function(word, prev, position) {
  if (position === 0 || position > 0 && prev.search(",") != -1) {
    word = word + ": ";
  } else if (position > 0 && prev.search(":") != -1) {
    word = word + ": ";
    prev = prev.replace(":", ",");
  }
  return { word: word, prev: prev };
}, 

```

The method returns an object with two properties, `word` for the resulting format of the current word and `prev` for the resulting format of the previous word.

### `value`

The value of the `<input>` as a string. This can be used with v-model.