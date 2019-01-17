<template>
  <div>
    <p><label for="tabInput">Try tabbing these names: {{ entryPlaceholder }}</label></p>
    <p><tab-complete-input id="tabInput" v-model="text" :data-source="names" /></p>
    <p v-if="showText">Bound value: {{text}}</p>
    <button v-on:click="resetNames">{{buttonText}}</button>
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
      names: data.staticList.sort(),
      text: '',
      buttonText: 'Change Names'
    }
  },
  methods: { 
    resetNames () {
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
