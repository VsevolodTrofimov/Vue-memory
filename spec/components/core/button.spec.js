import Vue from 'vue'
const VSSR = require('vue-server-renderer').createRenderer()

import coreButton from '@/src/components/core/Button/Button.vue'


Vue.config.productionTip = false


describe('Components', () => {
  describe('Core Button', () => {
    it('matches snapshot', () => {
      const vm = new Vue({
        render: h => h(coreButton)
      })

      VSSR.renderToString(vm, (err, str) => {
        expect(str).toMatchSnapshot()
      })
    })
  })
})