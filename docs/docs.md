---
sidebar: auto
---

# Documentation and Examples

## Usage

Firstly, you'll need to load the component into vue:

``` JavaScript
import TabCompleteInput from "vue-tab-complete-input"
Vue.component( 'tab-complete-input', TabCompleteInput );
```

Alternatively, when defining a vue component it's used in, include it in the list of components:

``` JavaScript
import TabCompleteInput from "vue-tab-complete-input"

export default {
  components: {
    TabCompleteInput
  },
  data() {
    return {
      list: [],
      text: ''
    }
  },
}
```

Now you can use it as a basic `<input>` in your html, with support for v-model with data in your vue component.

``` html
<tab-complete-input v-model="text" :data-source="list" />
```

<BasicExample />

Note: you _must_ set a `v-model` for any tab completion to work.

Full examples of the components used within these docs are available in this folder [`~/docs/.vuepress/components`](https://github.com/rymate1234/tab-complete-input-vue/tree/master/docs/.vuepress/components)

## Properties

### `data-source`

This allows you to configure the data source for the tab completion. It accepts either an `Array` of strings or a `Function`.

In the case of the array, the contents of the array are loaded into the tab completion when the object is created or when the array changes.

In the case of the method, the method is called each time a user starts tab completing a word, and will only run when a user starts completing another word.
Internally, this method has an await on it, meaning you can pass in a async method and it will be awaited. If you need to pass in a callback function, you will 
need to use something like `util.promisify` as these are not otherwsie supported

When calling the method, two arguments are passed to it - the current word being completed and the position within the string.

``` JavaScript
async asyncData (word, position) {
  const request = await fetch(api + `?word=${encodeURIComponent(word)}&pos=${encodeURIComponent(position)}`)
  return request.json() // returns an array of strings
}, 
```

<AsyncExample />

### `format`

This allows you to pass a method to the component that will format the result of a tab completion. It has 3 parameters - the current word being completed, the previous word in the array and the position of the current word.

```JavaScript
getFormat (word, prev, position) {
  if (position === 0 || position > 0 && prev.search(",") !== -1) {
    word = word + ": "
  } else if (position > 0 && prev.search(":") !== -1) {
    word = word + ": "
    prev = prev.replace(":", ",")
  }
  return { word, prev }
}, 

```

<FormatExample />

The method returns an object with two properties, `word` for the resulting format of the current word and `prev` for the resulting format of the previous word.

### `value`

The value of the `<input>` as a string. This must be bound using v-model.

<BasicExample :showText='true' />

## Programatically tab competing

Sometimes you may want to be able to tab complete an input field without the user pressing the tab key. For instance, if they're on a mobile device, most do not have a tab button. 

In order to do this, you can set a reference on the tab complete element in your vue template

```html
<tab-complete-input ref='externalInput' v-model="text" :data-source="list" />
```

You can then use that reference to perform the equivalent of pressing tab in the input box using any other method, for instance a tab button somewhere on the page. 

```html
 <button @click="tab">Tab</button>
 
 <script>
  export default {
    tab (e) {
      e.preventDefault()
      this.$refs.externalInput.tabComplete()
    },
  }
 </script>
```

<BasicExample :showTab='true' />

## Event Handlers

All event handlers supported by normal input panels are supported by this component.

```html
  <tab-complete-input ref="externalInput" 
    id="tabInput" 
    v-model="text" 
    :data-source="names" 
    v-on:keydown.13="enterText" 
    v-on:keyup="logCurrent" />
```

<BasicExample :testEvents='true' />