---
home: true
heroText: Vue Tab Complete Input
tagline: A tab completable <input> component for Vue.js
actionText: View Docs and Examples
actionLink: /docs.html
footer: MIT Licensed | Made by rymate1234
---

## Demo

<BasicExample />

## Install

``` bash
yarn add vue-tab-complete-input
```

## Include

``` html
<tab-complete-input v-model="text" :data-source="list" />

<script>
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
</script>
```