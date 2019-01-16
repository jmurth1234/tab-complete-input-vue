<template>
  <div>
    <p>{{entryPlaceholder}}</p>
    <p><tab-complete-input v-model="text" :data-source="names" /></p>
    <button v-on:click="resetNames">Change Names</button>
  </div>
</template>

<script>
import { generateNames } from '../../../functions/req-example'
import TabCompleteInput from '../../../src/tab-complete-input'
import { getFormat } from './shared'
export default {
  components: { TabCompleteInput },
  data() {
    return {
      names: generateNames(20),
      text: ''
    }
  },
  methods: {
    getFormat,
    resetNames () {
      this.names = generateNames(20)
    }
  },
  computed: {
    entryPlaceholder () {
      return `Try tabbing these names: ${this.names.sort().join(', ')}`
    }
  }
}
</script>

<style lang="stylus">
  shared()
    border: 1px solid #ccc;
    padding: 6px;
    border-radius: 6px;
    &:hover,&:focus
      border 1px solid #3eaf7c
  
  input {
    width: 100%;
    shared()
  }

  button {
    shared()
  }
</style>

