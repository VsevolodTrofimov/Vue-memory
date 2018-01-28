import Vue from 'vue'
import Vuex from 'vuex'

import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'


Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    stage: 'start', // also possible: game, end
    board: [[]],
    score: 0,
    matched: 0,
    toHide: [],
    timeouts: {}
  },
  getters,
  mutations,
  actions
})

export default store