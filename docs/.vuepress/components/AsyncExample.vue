<template>
  <div>
    <p><label for="tabInput">{{ entryPlaceholder }}</label></p>
    <p><tab-complete-input id="tabInput" v-model="text" :data-source="names" /></p>
  </div>
</template>

<script>
import { data } from '../../../functions/req-example'
import TabCompleteInput from '../../../src/tab-complete-input'

const api = process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:9000/req-example' : '/.netlify/functions/req-example'

export default {
  components: { TabCompleteInput },
  data() {
    return {
      text: ''
    }
  },
  methods: { 
    async asyncData (word, position) {
      const request = await fetch(api + `?word=${encodeURIComponent(word)}&pos=${encodeURIComponent(position)}`)
      return request.json()
    }, 
  },
  computed: {
    entryPlaceholder () {
      return `Try tabbing these names: ${data.staticList.sort().join(', ')}`
    }
  }
}
</script>
