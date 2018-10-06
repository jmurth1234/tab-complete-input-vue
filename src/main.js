import 'regenerator-runtime/runtime'

import Vue from 'vue'
import App from './example.vue'

import TabCompleteInput from "./tab-complete-input"
Vue.component( 'tab-complete-input', TabCompleteInput );

new Vue({
  el: '#app',
  render: h => h(App)
})
