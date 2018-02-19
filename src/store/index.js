import Vue from 'vue'

import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'


const store = {
  state: {
    stage: 'start', // also possible: game, end
    
    board: [[]],
    score: 0,
    matched: 0,

    deck: {
      loading: null,
      loaded: false
    },

    toHide: [],
    timeouts: {},
  },
  getters,
  mutations,
  actions
}

export default store