<template>
  <div :data-list="JSON.stringify(names)">
    <p>{{entryPlaceholder}}</p>
    <p><tab-complete-input v-model="text" :data-source="names" /></p>
    <p v-if="showText">Bound value: {{text}}</p>
    <button v-on:click="resetNames">Change Names</button>
  </div>
</template>

<script>
import { data } from '../../../functions/req-example'
import TabCompleteInput from '../../../src/tab-complete-input'

export default {
  components: { TabCompleteInput },
  props: [ 'showText' ],
  data() {
    return {
      names: data.staticList,
      text: ''
    }
  },
  methods: { 
    async resetNames () {
      const fakeNames = await import('./fake-names')
      this.names = fakeNames.generate(20)
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

