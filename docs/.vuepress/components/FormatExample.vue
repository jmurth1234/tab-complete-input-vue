<template>
  <div>
    <p>Try tabbing these names: {{ entryPlaceholder }}</p>
    <p><tab-complete-input v-model="text" :data-source="names" /></p>
    <button v-on:click="resetNames">{{buttonText}}</button>
  </div>
</template>

<script>
import { generateNames, data } from '../../../functions/req-example'
import TabCompleteInput from '../../../src/tab-complete-input'
import { getFormat } from './shared'

export default {
  components: { TabCompleteInput },
  data () {
    return {
      names: data.staticList.sort(),
      text: '',
      buttonText: 'Change Names'
    }
  },
  methods: {
    getFormat,
    async resetNames () {
      this.buttonText = "Changing Names..."
      import('./fake-names').then(fakeNames => {
        this.names = fakeNames.generate(20).sort()
        this.buttonText = "Change Names"
      })
    }
  },
  computed: {
    entryPlaceholder () {
      return this.names.join(', ')
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

