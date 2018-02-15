import Vue from 'vue'
import Vuex from 'vuex'

import App from '@/src/App.vue'
import storeTemplate from '@/src/store/index'


Vue.use(Vuex)
const store = new Vuex.Store(storeTemplate)


new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
