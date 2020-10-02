## Usage

Firstly, you'll need to load the component into vue:

``` javascript
import TabCompleteInput from "vue-tab-complete-input"
Vue.component( 'tab-complete-input', TabCompleteInput );
```

Alternatively, when defining a vue component it's used in, include it in the list of components:

``` javascript
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

<ExampleContainer source="BasicExample.vue">
  <BasicExample />
</ExampleContainer>

## Properties

### `data-source`

This allows you to configure the data source for the tab completion. It accepts either an `Array` of strings or a `Function`.

In the case of the array, the contents of the array are loaded into the tab completion when the object is created or when the array changes.

In the case of the method, the method is called each time a user starts tab completing a word, and will only run when a user starts completing another word.
Internally, this method has an await on it, meaning you can pass in a async method and it will be awaited. If you need to pass in a callback function, you will 
need to use something like `util.promisify` as these are not otherwise supported

When calling the method, two arguments are passed to it - the current word being completed and the position within the string.

``` JavaScript
async asyncData (word, position) {
  const request = await fetch(api + `?word=${encodeURIComponent(word)}&pos=${encodeURIComponent(position)}`)
  return request.json() // returns an array of strings
}, 
```

<ExampleContainer source="AsyncExample.vue">
  <AsyncExample />
</ExampleContainer>

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

<ExampleContainer source="FormatExample.vue">
  <FormatExample />
</ExampleContainer>

The method returns an object with two properties, `word` for the resulting format of the current word and `prev` for the resulting format of the previous word.

### `modelValue`

The value of the `<input>` as a string. This must be bound using v-model.

<ExampleContainer source="ValueExample.vue">
  <ValueExample />
</ExampleContainer>

### `startCompletionChar`

When a word starts with the `startCompletionChar`, the component will start tab completing in the background. When combined with events like `tabSuccess`, this can be used to help build alternative UIs for completion using this component.

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
    this.$refs.externalInput.handleTabPressed()
  },
}
</script>
```

<ExampleContainer source="TabExample.vue">
  <TabExample />
</ExampleContainer>

For more fine grained control over completion behavior, you can use the following methods to build your own behaviour:

 - `getCompletions()` -- Fetches data from the data source if it's a function, and then checks whether the current word is in the list of completions. Emits either `tabFailed` or `tabSuccess` 
 - `selectCompletion(index?: number)` -- Selects a completion from the list of valid current completions, and applies it to the current word. If a number is passed, the word at that position will be selected as the completion.

## Event Handlers

All event handlers supported by normal input panels are supported by this component.

```html
<tab-complete-input ref="externalInput" 
  v-model="text" 
  :data-source="names" 
  @keydown.enter="enterText"
  v-on:keyup="logCurrent" />
```

<ExampleContainer source="EventsExample.vue">
  <EventsExample />
</ExampleContainer>

Additionally, four new event handlers are defined by the component:

 - `tabSuccess` -- Emitted when an attempt to get completions returns results
 - `tabFailed` -- Emitted when an attempt to get completions returns no results
 - `tabEnded` -- Emitted when the user has ended completions on the current word
 - `selectionChanged` -- Emitted after a new completion is selected.

All events emitted by the component have at most 4 properties:

 - `original` -- The keyboard event that caused this event to eventually happen, if applicable
 - `completions` -- The list of valid completions, or a `false` boolean 
 - `current` -- The current selected index
 - `word` -- The word being completed


