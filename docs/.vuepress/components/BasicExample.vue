<template>
  <div>
    <p><label for="tabInput">Try tabbing these names: {{ entryPlaceholder }}</label></p>
    <p :class="showTab ? 'tab' : ''">
      <tab-complete-input ref="externalInput" 
        id="tabInput" 
        v-model="text" 
        :data-source="names" 
        v-on:keydown.13="enterText" 
        v-on:keyup="logCurrent" />
      <button @click="tab" v-if="showTab">Tab</button>
    </p>
    <p v-if="showText || testEvents">Bound value: {{testEvents ? enteredText : text}}</p>
    <button v-on:click="resetNames">{{buttonText}}</button>
  </div>
</template>

<script>
import { data } from '../../../functions/req-example'
import TabCompleteInput from '../../../src/tab-complete-input'

export default {
  components: { TabCompleteInput },
  props: [ 'showText', 'showTab', 'testEvents' ],
  data() {
    return {
      names: data.staticList.sort(),
      text: '',
      enteredText: '',
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
    },
    tab (e) {
      e.preventDefault()
      this.$refs.externalInput.tabComplete()
    },
    enterText () {
      if(!this.testEvents) return
      this.enteredText = this.text
      this.text = ''
    },
    logCurrent () {
      if(!this.testEvents) return
      console.log('Current Value:', this.text)
    },
  },
  computed: {
    entryPlaceholder () {
      return this.names.join(', ')
    }
  }
}
</script>

<style lang="stylus" scoped>
.tab {
  display: flex;
  flex-direction: row;

  input {
    flex: 0 1 auto;
    border-bottom-right-radius: 0;
    border-top-right-radius: 0;
  }

  button {
    flex: 0 1 50px;
    border-bottom-left-radius: 0;
    border-top-left-radius: 0;
    border-left: 0;
  }
}
</style>
