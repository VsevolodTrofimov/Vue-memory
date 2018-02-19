import Vuex from 'vuex'
import { mount, createLocalVue } from '@vue/test-utils'
import { createRenderer } from 'vue-server-renderer'

import gameCard from '@/src/components/views/Game/Card.vue'


const VSSR = createRenderer()
const localVue = createLocalVue()
localVue.config.productionTip = false


describe('Views', () => {
  describe('Game View Card', () => {
    it('matches snapshot', () => {
      const wrapper = mount(gameCard)

      VSSR.renderToString(wrapper.vm, (err, str) => {
        expect(str).toMatchSnapshot()
      })
    })

    it('matches hidden snapshot', () => {
      const wrapper = mount(gameCard, {
        propsData: {hidden: true}
      })

      VSSR.renderToString(wrapper.vm, (err, str) => {
        expect(str).toMatchSnapshot()
      })
    })

    it('matches flipped snapshot', () => {
      const wrapper = mount(gameCard, {
        propsData: {
          flipped: true,
          path: '/static/img.png'
        }
      })

      VSSR.renderToString(wrapper.vm, (err, str) => {
        expect(str).toMatchSnapshot()
      })
    })
  })
})
