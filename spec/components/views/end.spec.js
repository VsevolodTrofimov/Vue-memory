import Vue from 'vue'
import Vuex from 'vuex'
import { mount } from 'vue-test-utils'
const VSSR = require('vue-server-renderer').createRenderer()

import EndVeiw from '@/src/components/views/End/End.vue'


Vue.config.productionTip = false
Vue.use(Vuex)


describe('End View', () => {
  let stubStore = new Vuex.Store({
    getters: {
      score: () => 10
    }
  })

  it('matches snapshot', () => {
    const vm = new Vue({
      store: stubStore,
      render: h => h(EndVeiw)
    })

    VSSR.renderToString(vm, (err, str) => {
      expect(str).toMatchSnapshot()
    })
  })

  it('gets score from store', () => {
    const wrapper = mount(EndVeiw, {store: stubStore})
    const scoreNode = wrapper.find('[data-tid="EndGame-finalScore"]')
    expect(parseInt(scoreNode.text())).toEqual(stubStore.getters.score)
  })
})