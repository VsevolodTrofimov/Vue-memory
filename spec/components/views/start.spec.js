import Vue from 'vue'
const VSSR = require('vue-server-renderer').createRenderer()

import StartVeiw from '@/src/components/views/Start/Start.vue'


Vue.config.productionTip = false


describe('Start View', () => {
  it('matches snapshot', () => {
    const vm = new Vue({
      render: h => h(StartVeiw)
    })

    VSSR.renderToString(vm, (err, str) => {
      expect(str).toMatchSnapshot()
    })
  })
})